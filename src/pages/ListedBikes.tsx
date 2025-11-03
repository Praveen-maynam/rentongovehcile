import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BikeLogo from "../assets/icons/BikeLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import Location from "../assets/icons/Location.png";
import Search from "../assets/icons/Search.png";
import FilterLogo from "../assets/icons/FilterLogo.png";
import FilterCard from "../components/ui/FilterCard";
import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
import { useLocation } from "../store/location.context";
import { Vehicle } from "../types/Vehicle";
import BikeCC from "../assets/icons/BikeCC.png";

const ListedBikes: React.FC = () => {
  const [apiBikes, setApiBikes] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedList, setSelectedList] = useState<"both" | "cars" | "bikes">("bikes");

  const navigate = useNavigate();
  const { currentCity } = useLocation();

  // ✅ Fetch bikes from backend
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

        if (result.data?.bikes && Array.isArray(result.data.bikes)) {
          bikesData = result.data.bikes;
        } else if (Array.isArray(result)) {
          bikesData = result;
        }

        const bikesOnly = bikesData.filter((v) => v.bikeName);

        const transformedBikes: Vehicle[] = bikesOnly.map((v: any) => ({
          id: v._id,
          name: v.bikeName,
          model: v.bikeModel,
          price: v.pricePerKm || 0,
          cc: v.bikeCC || "N/A",
          fuel: "Petrol",
          transmission: "Manual",
          location: `${v.pickupCity || "Unknown"}, ${v.pickupCityState || ""}`,
          rating: 0,
          available: v.Available !== undefined ? v.Available : true,
          image:
            v.bikeImages && v.bikeImages.length > 0
              ? `http://52.66.238.227:3000/${v.bikeImages[0]}`
              : BikeLogo,
          type: "bike",
          description: v.description || "No description provided",
          contactName: v.contactName,
          contactNumber: v.contactNumber,
          bikeNumber: v.bikeNumber,
        }));

        setApiBikes(transformedBikes);
      })
      .catch((error) => {
        console.error("❌ Error fetching bikes:", error);
        setError("Failed to load bikes. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Filter bikes based on search
  const filteredBikes = apiBikes.filter((bike) =>
    bike.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (vehicle: Vehicle) => {
    navigate(`/book-now/${vehicle.id}`, { state: { vehicleData: vehicle, openContact: false } });
  };

  const handleEdit = (vehicle: Vehicle) => {
    navigate("/Car-Details", {
      state: {
        carData: vehicle,
        openEditForm: true,
      },
    });
  };

  const handleDelete = (vehicle: Vehicle) => {
    const confirmDelete = window.confirm(`Delete ${vehicle.name}?`);
    if (confirmDelete) {
      setApiBikes(apiBikes.filter((a) => a.id !== vehicle.id));
      alert(`${vehicle.name} deleted.`);
    }
  };

  if (loading) return <div className="text-center py-12">Loading bikes...</div>;
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
                if (value === "both") navigate("/listed-vehicles");
                else if (value === "cars") navigate("/listed");
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
                placeholder="Search Bikes..."
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

        {/* ✅ Bike Cards */}
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[550vh] pr-2">
          {filteredBikes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No bikes listed in {currentCity}
            </div>
          ) : (
            filteredBikes.map((bike) => (
              <div
                key={bike.id}
                className="flex flex-row bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 p-4 gap-4 w-full md:w-[900px]"
              >
                {/* Image */}
                <div className="w-[220px] h-[200px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => handleCardClick(bike)}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex items-center justify-start gap-4 mt-1">
                    <h3 className="font-semibold text-base text-gray-900 truncate">{bike.name}</h3>
                    <div className="flex items-center bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md text-xs font-medium shadow-sm">
                      ⭐ {bike.rating || 4.2}
                    </div>
                  </div>

                  <p className="text-blue-600 font-bold text-lg mb-1">
                    ₹{bike.price}
                    <span className="text-gray-500 font-normal text-sm">/km</span>
                  </p>

                  <div className="flex flex-col gap-1 text-gray-600 text-sm">
                   <div className="flex items-center gap-2">
  <img src={BikeCC} alt="Bike CC" className="w-5 h-5" />
  <span>{bike.cc} CC</span>
</div>


                    <div className="flex items-center gap-2">
                      <img src={Location} alt="Location" className="w-5 h-5" />
                      <span className="text-xs">{bike.location}</span>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-start gap-4 mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVehicle(bike);
                          setShowCalendarModal(true);
                        }}
                        className="px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm 
                                   bg-red-100 text-red-700 border border-red-300 
                                   hover:bg-red-200 transition-all"
                      >
                        Add Not Available Slot +
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/vehicle-history/${bike.name}`, { state: { vehicleData: bike } });
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
                        handleEdit(bike);
                      }}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(bike);
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

      {/* Calendar Modal (no API call now) */}
      {showCalendarModal && selectedVehicle && (
        <AvailabilityDateTimeModal
          isOpen={showCalendarModal}
          onClose={() => {
            setShowCalendarModal(false);
            setSelectedVehicle(null);
          }}
          onConfirm={(startDate, endDate, startTime, endTime) => {
            if (!selectedVehicle) return;

            console.log("🗓️ Selected Slot:", {
              startDate,
              endDate,
              startTime,
              endTime,
            });

            alert(
              `Marked ${selectedVehicle.name} as unavailable from ${startDate} ${startTime} to ${endDate} ${endTime}`
            );

            // Just update local state (optional)
            setApiBikes(
              apiBikes.map((b) =>
                b.id === selectedVehicle.id ? { ...b, available: false } : b
              )
            );

            setShowCalendarModal(false);
            setSelectedVehicle(null);
          }}
        />
      )}
    </>
  );
};

export default ListedBikes;
