import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BikeLogo from "../assets/icons/BikeLogo.png";
import CarLogo from "../assets/icons/CarLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import Petrol from "../assets/icons/Petrol.png";
import Location from "../assets/icons/Location.png";
import Search from "../assets/icons/Search.png";
import FilterLogo from "../assets/icons/FilterLogo.png";
import FilterCard from "../components/ui/FilterCard";
import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
import { useLocation } from "../store/location.context";
import { Vehicle } from "../types/Vehicle";

const ListedVehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedList, setSelectedList] = useState<"both" | "cars" | "bikes">("both");

  const navigate = useNavigate();
  const { currentCity } = useLocation();

  // Fetch both bikes and cars
  useEffect(() => {
    const userId = "68fe269b6f13375a65dc587a";
    setLoading(true);
    setError(null);

    fetch(`http://52.66.238.227:3000/myVehicles/${userId}`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((result) => {
        let bikesData: any[] = [];
        let carsData: any[] = [];

        if (result.data) {
          if (result.data.bikes && Array.isArray(result.data.bikes)) {
            bikesData = result.data.bikes;
          }
          if (result.data.cars && Array.isArray(result.data.cars)) {
            carsData = result.data.cars;
          }
        }

        // Transform bikes
        const transformedBikes: Vehicle[] = bikesData.map((v: any) => ({
          id: v._id,
          name: v.bikeName,
          model: v.bikeModel,
          price: v.pricePerKm || 0,
          seats: 2,
          fuel: "Petrol",
          transmission: "Manual",
          location: `${v.pickupCity || "Unknown"}, ${v.pickupCityState || ""}`,
          rating: 0,
          available: v.Available !== undefined ? v.Available : true,
          image: v.bikeImages && v.bikeImages.length > 0 ? v.bikeImages[0] : BikeLogo,
          type: "bike",
          description: v.description || "No description provided",
          contactName: v.contactName,
          contactNumber: v.contactNumber,
          bikeNumber: v.bikeNumber,
        }));

        // Transform cars
        const transformedCars: Vehicle[] = carsData.map((v: any) => ({
          id: v._id,
          name: v.CarName,
          model: v.CarModel,
          price: v.RentPerHour || 0,
          seats: v.Carseater || 5,
          fuel: v.fuelType || "Petrol",
          transmission: v.transmissionType || "Manual",
          location: `${v.pickupCity || "Unknown"}, ${v.pickupCityState || ""}`,
          rating: 0,
          available: v.Available !== undefined ? v.Available : true,
          image: v.carImages && v.carImages.length > 0 && v.carImages[0] ? v.carImages[0] : CarLogo,
          type: "car",
          description: v.description || "No description provided",
          contactName: v.contactName,
          contactNumber: v.contactNumber,
        }));

        setVehicles([...transformedBikes, ...transformedCars]);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
        setError("Failed to load vehicles. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredVehicles = vehicles.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (vehicle: Vehicle) => {
    navigate(`/book-now/${vehicle.id}`, { state: { vehicleData: vehicle, openContact: false } });
  };

  if (loading) return <div className="text-center py-12">Loading vehicles...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <>
      <div className={`p-4 sm:p-6 bg-gray-50 min-h-screen transition-all duration-300 ${showCalendarModal ? "blur-sm" : ""}`}>
        {/* Top Row: Dropdown + Search + Filter */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 gap-4">
          {/* Dropdown */}
          <div className="flex items-center w-full md:w-[300px] h-[50px] border rounded-lg px-3">
            <img src={BikeLogo} alt="Dropdown Logo" className="w-[24px] h-[24px]" />
            <select
              className="flex-1 ml-2 border-none outline-none text-sm"
              value={selectedList}
              onChange={(e) => {
                const value = e.target.value as "both" | "cars" | "bikes";
                setSelectedList(value);
                if (value === "cars") navigate("/listed");
                else if (value === "bikes") navigate("/listed-bikes");
                // stay on listed-vehicles if value is both
              }}
            >
              <option value="both">Both</option>
              <option value="cars">Listed Cars</option>
              <option value="bikes">Listed Bikes</option>
            </select>
          </div>

          {/* Search + Filter */}
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-[300px] h-[40px]">
              <img src={Search} alt="Search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search Vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full rounded-full border pl-12 pr-4 focus:outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1 rounded-md hover:opacity-100 transition-all"
            >
              <img src={FilterLogo} alt="Filter" className="w-6 h-6" /> Filter
            </button>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVehicles.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">No vehicles listed in {currentCity}</div>
          ) : (
            filteredVehicles.map((v) => (
              <div
                key={v.id}
                className="flex flex-col bg-white shadow-md rounded-xl cursor-pointer hover:shadow-lg border border-transparent transition-all"
                onClick={() => handleCardClick(v)}
              >
                <div className="relative w-full h-40 overflow-hidden rounded-t-xl bg-gray-100">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                  {!v.available && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                      Not Available
                    </div>
                  )}
                </div>
                <div className="flex flex-col p-3">
                  <h3 className="font-semibold text-sm">{v.name}</h3>
                  <p className="text-gray-600 text-xs">{v.model}</p>
                  <p className="text-blue-600 font-bold text-sm mt-1">₹{v.price}/km</p>
                  <div className="flex gap-2 mt-2 text-gray-600 text-xs">
                    <div className="flex items-center gap-1">
                      <img src={DriverLogo} alt="Seats" className="w-4 h-4" /> {v.seats} Seater
                    </div>
                    <div className="flex items-center gap-1">
                      <img src={Petrol} alt="Fuel" className="w-4 h-4" /> {v.fuel}
                    </div>
                    <div className="flex items-center gap-1">
                      <img src={Location} alt="Location" className="w-4 h-4" /> {v.location}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Filter Modal */}
      {showFilter && <FilterCard onApply={() => setShowFilter(false)} />}

      {/* Calendar Modal */}
      {showCalendarModal && selectedVehicle && (
        <AvailabilityDateTimeModal
          isOpen={showCalendarModal}
          onClose={() => setShowCalendarModal(false)}
          onConfirm={() => setShowCalendarModal(false)}
        />
      )}
    </>
  );
};

export default ListedVehicles;