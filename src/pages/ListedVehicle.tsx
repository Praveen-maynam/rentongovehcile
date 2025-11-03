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
  const [apiVehicles, setApiVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedList, setSelectedList] = useState<"both" | "cars" | "bikes">("both");

  const navigate = useNavigate();
  const { currentCity } = useLocation();

  // ✅ Fetch both cars and bikes
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
        const bikesData = result.data?.bikes || [];
        const carsData = result.data?.cars || [];

        const bikes: Vehicle[] = bikesData.map((v: any) => ({
          id: v._id,
          name: v.bikeName,
          model: v.bikeModel,
          price: v.pricePerKm || 0,
          seats: 2,
          fuel: "Petrol",
          transmission: "Manual",
          location: `${v.pickupCity || "Unknown"}, ${v.pickupCityState || ""}`,
          rating: 0,
          available: v.Available ?? true,
          image:
            v.bikeImages?.length > 0
              ? `http://52.66.238.227:3000/${v.bikeImages[0]}`
              : BikeLogo,
          type: "bike",
          description: v.description || "No description provided",
          contactName: v.contactName,
          contactNumber: v.contactNumber,
          bikeNumber: v.bikeNumber,
        }));

        const cars: Vehicle[] = carsData.map((v: any) => ({
          id: v._id,
          name: v.CarName,
          model: v.CarModel,
          price: v.RentPerHour || 0,
          seats: v.Carseater || 5,
          fuel: v.fuelType || "Petrol",
          transmission: v.transmissionType || "Manual",
          location: `${v.pickupCity || "Unknown"}, ${v.pickupCityState || ""}`,
          rating: 0,
          available: v.Available ?? true,
          image:
            v.carImages?.length > 0
              ? `http://52.66.238.227:3000/${v.carImages[0]}`
              : CarLogo,
          type: "car",
          description: v.description || "No description provided",
          contactName: v.contactName,
          contactNumber: v.contactNumber,
        }));

        setApiVehicles([...bikes, ...cars]);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
        setError("Failed to load vehicles. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredVehicles = apiVehicles.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (vehicle: Vehicle) => {
    navigate(`/book-now/${vehicle.id}`, { state: { vehicleData: vehicle, openContact: false } });
  };

  const handleEdit = (vehicle: Vehicle) => {
    navigate("/Car-Details", {
      state: { carData: vehicle, openEditForm: true },
    });
  };

  const handleDelete = (vehicle: Vehicle) => {
    const confirmDelete = window.confirm(`Delete ${vehicle.name}?`);
    if (confirmDelete) {
      setApiVehicles(apiVehicles.filter((a) => a.id !== vehicle.id));
      alert(`${vehicle.name} deleted.`);
    }
  };

  if (loading) return <div className="text-center py-12">Loading vehicles...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <>
      <div
        className={`p-4 sm:p-6 bg-gray-50 min-h-screen transition-all duration-300 ${
          showCalendarModal ? "blur-sm" : ""
        }`}
      >
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 gap-4">
          {/* Dropdown */}
          <div className="flex items-center w-full md:w-[300px] h-[50px] border rounded-lg px-3 bg-white">
            <img src={BikeLogo} alt="Dropdown Logo" className="w-[24px] h-[24px]" />
            <select
              className="flex-1 ml-2 border-none outline-none text-sm bg-transparent"
              value={selectedList}
              onChange={(e) => {
                const value = e.target.value as "both" | "cars" | "bikes";
                setSelectedList(value);
                if (value === "cars") navigate("/listed");
                else if (value === "bikes") navigate("/listed-bikes");
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
              <img
                src={Search}
                alt="Search"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
              />
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

        {/* ✅ Vehicle Cards */}
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[650vh] pr-2">
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No vehicles listed in {currentCity}
            </div>
          ) : (
            filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex flex-row bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 p-4 gap-4 w-full md:w-[900px]"
              >
                {/* Image */}
                <div className="w-[220px] h-[200px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => handleCardClick(vehicle)}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex items-center justify-start gap-4 mt-1">
                    <h3 className="font-semibold text-base text-gray-900 truncate">
                      {vehicle.name}
                    </h3>
                    <div className="flex items-center bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md text-xs font-medium shadow-sm">
                      ⭐ {vehicle.rating || 4.2}
                    </div>
                  </div>

                  <p className="text-blue-600 font-bold text-lg mb-1">
                    ₹{vehicle.price}
                    <span className="text-gray-500 font-normal text-sm">
                      {vehicle.type === "car" ? "/hour" : "/km"}
                    </span>
                  </p>

                  <div className="flex flex-col gap-1 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <img src={DriverLogo} alt="Transmission" className="w-5 h-5" />
                      <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={Petrol} alt="Fuel" className="w-5 h-5" />
                      <span>{vehicle.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={Location} alt="Location" className="w-5 h-5" />
                      <span className="text-xs">{vehicle.location}</span>
                    </div>

                    {/* 🔴 Buttons */}
                    <div className="flex items-center justify-start gap-4 mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVehicle(vehicle);
                          setShowCalendarModal(true);
                        }}
                        className="px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm 
                                   bg-red-100 text-red-700 border border-red-300 
                                   hover:bg-red-200 transition-all"
                      >
                        Add Not Availability Slot +
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/vehicle-history/${vehicle.name}`, {
                            state: { vehicleData: vehicle },
                          });
                        }}
                        className="flex items-center justify-center bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1.5 rounded-lg shadow-md hover:opacity-90 transition-all"
                      >
                        View Booking History
                      </button>
                    </div>
                  </div>
                </div>

                {/* Edit / Delete Menu */}
                <div className="relative self-start">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      const menu = e.currentTarget.nextElementSibling;
                      menu?.classList.toggle("hidden");
                    }}
                  >
                    <span className="text-2xl">⋮</span>
                  </button>
                  <div className="hidden absolute right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 min-w-[150px]">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(vehicle);
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(vehicle);
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Filter Modal */}
      {showFilter && <FilterCard onApply={() => setShowFilter(false)} />}

      {/* Calendar Modal — no API */}
      {showCalendarModal && selectedVehicle && (
        <AvailabilityDateTimeModal
          isOpen={showCalendarModal}
          onClose={() => {
            setShowCalendarModal(false);
            setSelectedVehicle(null);
          }}
          onConfirm={() => {
            alert(`Selected not available slot for ${selectedVehicle.name}`);
            setShowCalendarModal(false);
            setSelectedVehicle(null);
          }}
        />
      )}
    </>
  );
};

export default ListedVehicles;
