


import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useListedBikesStore } from "../store/listedBikes.store";
import { useLocation } from "../store/location.context";
import apiService from "../services/api.service";
import VehicleAvailabilityCalendar from "../components/AvailabilityDateTimeModal";
import FilterCard from "../components/ui/FilterCard";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import BikeLogo from "../assets/icons/BikeLogo.png";
import FilterLogo from "../assets/icons/FilterLogo.png";
import Search from "../assets/icons/Search.png";
import Location from "../assets/icons/Location.png";
import BikeCC from "../assets/icons/BikeCC.png";
import Petrol from "../assets/icons/Petrol.png";
import enfield from "../assets/images/Enfield.png";

interface Vehicle {
  name: string;
  number: string;
  price: string;
  transmission: string;
  fuel: string;
  location: string;
  rating: string;
  available: boolean;
  image: string;
  id?: string;
  _id?: string;
  cc?: string;
  contactName: string;
  contactNumber: string;
}

interface ApiBike {
  _id: string;
  BikeName: string;
  BikeModel: string;
  BikeNumber: string;
  pricePerHour: number;
  transmission?: string;
  fuelType?: string;
  seatingCapacity?: number;
  location?: string;
  BikeImages?: string[];
  rating?: number;
  isAvailable?: boolean;
  contactNumber: number;
  contactName: string;
}


const ListedBikes: React.FC = () => {
  const navigate = useNavigate();
  const { currentCity } = useLocation();
  const { bikes: userListedBikes, deleteBike } = useListedBikesStore();

const [showCalendarModal, setShowCalendarModal] = useState(false);
const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  // State management
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [bikes, setBikes] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const [selectedList, setSelectedList] = useState<"cars" | "bikes">("bikes");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  // const [showCalendarModal, setShowCalendarModal] = useState(false);
  // const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [deletingBikeId, setDeletingBikeId] = useState<string | null>(null);

const handleOpenCalendar = (vehicle: any) => {
  setSelectedVehicle(vehicle);
  setShowCalendarModal(true);
};
  // ==================== FETCH BIKES ====================
  useEffect(() => {
    const fetchMyBikes = async () => {
      try {
        setLoading(true);
        setError("");

        let userId = localStorage.getItem('userId');
        if (!userId || userId.length !== 24 || !/^[a-f0-9]{24}$/i.test(userId)) {
          userId = "68f32259cea8a9fa88029262";
        }

        console.log("🏍️ Fetching bikes for user:", userId);

        const response = await apiService.bike.getMyVehicles(userId);
        const responseData = response.data || response;
        
        let bikesArray = [];
        if (responseData.data && responseData.data.bikes) {
          bikesArray = responseData.data.bikes;
        } else if (responseData.bikes) {
          bikesArray = responseData.bikes;
        } else if (Array.isArray(responseData)) {
          bikesArray = responseData;
        }

        console.log(`✅ Found ${bikesArray.length} bikes`);

        const formattedBikes: Vehicle[] = bikesArray.map((bike: any) => ({
          _id: bike._id,
          id: bike._id,
          name: `${bike.bikeName || bike.BikeName || ''} ${bike.bikeModel || bike.BikeModel || ''}`.trim(),
          number: bike.bikeNumber || bike.BikeNumber || "unknown",
          contactNumber: bike.contactNumber?.toString() || "unknown",
          contactName: bike.contactName || "unknown",
          price: bike.pricePerKm?.toString() || "0",
          transmission: bike.gps ? "GPS Enabled" : "No GPS",
          fuel: bike.fuelType || "Petrol",
          location: bike.pickupCity || bike.location || currentCity || "Unknown",
          rating: bike.averageRating?.toString() || "4.0",
          available: bike.Available !== false,
          image: bike.bikeImages && bike.bikeImages.length > 0 
            ? bike.bikeImages[0] 
            : enfield,
          cc: bike.cc?.toString() || "150",
        }));

        setBikes(formattedBikes);
      } catch (err: any) {
        console.error("❌ Error fetching bikes:", err);
        const errorMsg = err?.response?.data?.message || err?.message || "Failed to fetch bikes";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBikes();
  }, [currentCity]);

  // ==================== CLOSE MENU ON OUTSIDE CLICK ====================
  useEffect(() => {
    const handleClickOutside = () => setMenuOpenIndex(null);
    if (menuOpenIndex !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [menuOpenIndex]);

  // ==================== AUTO-HIDE SUCCESS MESSAGE ====================
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // ==================== COMBINE USER & API BIKES ====================
  const allBikes = useMemo(() => {
    const userBikes: Vehicle[] = userListedBikes.map((bike) => ({
      id: bike.id,
      _id: bike.id,
      name: bike.vehicleName,
      number: bike.vehicleNumber || "",
      price: bike.farePrice,
      transmission: "Manual",
      fuel: "Petrol",
      location: bike.city && bike.street ? `${bike.city}, ${bike.street}` : bike.city || currentCity,
      rating: bike.rating?.toString() || "4.0",
      available: true,
      contactName: "unknown", // User-listed bikes may not have this field
      contactNumber: "unknown", // User-listed bikes may not have this field
      image: bike.photos?.[0] || enfield,
      cc: "150",
    }));

    return [...userBikes, ...bikes];
  }, [userListedBikes, bikes, currentCity]);

  // ==================== HANDLE CARD CLICK ====================
  const handleCardClick = (vehicle: Vehicle) => {
    const vehicleId = vehicle._id || vehicle.id;
    
    if (!vehicleId) {
      console.error("❌ Vehicle ID missing for:", vehicle.name);
      return;
    }

    console.log("🏍️ Navigating to vehicle:", vehicle.name, "ID:", vehicleId);

    navigate(`/book-now/${vehicleId}`, {
      state: { vehicleData: vehicle },
    });
  };
  const handleOpenCalendarModal = (vehicle: Vehicle) => {
  setSelectedVehicle(vehicle);
  setShowCalendarModal(true);
};


  const handleEdit = (vehicle: Vehicle) => {
    const id = vehicle._id || vehicle.id;

    if (!id) {
      console.error("❌ No vehicle ID found for:", vehicle.name);
      return;
    }

    console.log("✏️ Editing vehicle:", vehicle.name, "ID:", id);

    navigate(`/Bike-Details/${id}`, {
      state: {
        bikeData: vehicle,
        openEditForm: true,
      },
    });

    setMenuOpenIndex(null);
  };

  // ==================== DELETE VEHICLE ====================
  const handleDelete = (vehicle: Vehicle) => {
    console.log("🗑️ Preparing to delete bike:", vehicle.name);
    setVehicleToDelete(vehicle);
    setShowDeleteModal(true);
    setMenuOpenIndex(null);
  };

  const handleDeleteVehicle = async (vehicle: Vehicle) => {
    const vehicleId = vehicle._id || vehicle.id;
    
    if (!vehicleId) {
      setError("Cannot delete vehicle without ID");
      setShowDeleteModal(false);
      setVehicleToDelete(null);
      return;
    }

    try {
      setDeletingBikeId(vehicleId);
      console.log('🗑️ Deleting bike with ID:', vehicleId);

      await apiService.bike.deleteBikeById(vehicleId);
      
      console.log('✅ Bike deleted successfully');
      
      // Remove from state
      setBikes(bikes.filter((bike) => {
        const bikeId = bike._id || bike.id;
        return bikeId !== vehicleId;
      }));
      deleteBike(vehicleId);
      
      setSuccessMessage(`${vehicle.name} deleted successfully!`);
      setError("");
    } catch (error: any) {
      console.error('❌ Error deleting bike:', error);
      
      const errorMsg = error?.response?.data?.message || 
                      error?.message || 
                      "Failed to delete vehicle. Please try again.";
      
      setError(`Failed to delete ${vehicle.name}. ${errorMsg}`);
    } finally {
      setDeletingBikeId(null);
      setMenuOpenIndex(null);
      setShowDeleteModal(false);
      setVehicleToDelete(null);
    }
  };

  // ==================== MENU TOGGLE ====================
  const handleMenuToggle = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  // ==================== FILTERED BIKES ====================
  const filteredBikes = allBikes.filter((bike) =>
    bike.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ==================== LOADING STATE ====================
  if (loading && bikes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading bikes...</span>
      </div>
    );
  }

  // ==================== RENDER ====================
  return (
    <>
     
       

        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 gap-4">
          {/* Dropdown */}
          <div className="flex items-center w-full md:w-[300px] h-[50px] border rounded-lg px-3 bg-white">
            <img src={BikeLogo} alt="Dropdown Logo" className="w-[24px] h-[24px]" />
            <select
              className="flex-1 ml-2 border-none outline-none text-sm bg-transparent"
              value={selectedList}
              onChange={(e) => {
                const value = e.target.value as "cars" | "bikes";
                setSelectedList(value);
                if (value === "cars") navigate("/listed");
              }}
            >
              <option value="bikes">Listed Bikes</option>
              <option value="cars">Listed Cars</option>
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
                className="w-full h-full rounded-full border pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1 rounded-md hover:opacity-90 transition-all"
            >
              <img src={FilterLogo} alt="Filter" className="w-6 h-6" /> Filter
            </button>
          </div>
        </div>

        {/* Bike Cards */}
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[550vh] pr-2">
          {filteredBikes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No bikes found</p>
              <p className="text-sm">
                {searchTerm ? "Try adjusting your search" : "Start by adding your first bike"}
              </p>
            </div>
          ) : (
            filteredBikes.map((bike, index) => {
              const isUnavailable = !bike.available;
              const bikeId = bike._id || bike.id;

              return (
               <div
  key={bikeId || `bike-${index}`}
  className={`flex flex-col md:flex-row bg-white rounded-xl shadow-sm 
              hover:shadow-md transition overflow-hidden 
              border border-gray-100 p-4 gap-4 w-full relative ${
                isUnavailable ? "opacity-60" : ""
              }`}
>

                  {/* Content with blur effect if unavailable */}
                  <div className={`contents ${isUnavailable ? "blur-[1.5px]" : ""}`}>
                    {/* Image */}
              <div className="w-full h-[180px] md:w-[220px] md:h-[200px] 
                rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">

                      <img
                        src={bike.image}
                        alt={bike.name}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handleCardClick(bike)}
                        onError={(e) => {
                          e.currentTarget.src = enfield;
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between flex-1">
                      <div className="flex items-center justify-start gap-4 mt-1">
                        <h3 className="font-semibold text-base text-gray-900 truncate">
                          {bike.name}
                        </h3>
                        <div className="flex items-center bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md text-xs font-medium shadow-sm">
                          ⭐ {bike.rating || "4.2"}
                        </div>
                      </div>

                      <p className="text-blue-600 font-bold text-lg mb-1">
                        ₹{bike.price}
                        <span className="text-gray-500 font-normal text-sm">/km</span>
                      </p>

                      <div className="flex flex-col gap-1 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          <img src={BikeCC} alt="CC" className="w-5 h-5" />
                          <span>{bike.cc || "150"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <img src={Petrol} alt="Fuel" className="w-5 h-5" />
                          <span>{bike.fuel}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <img src={Location} alt="Location" className="w-5 h-5" />
                          <span className="text-xs">{bike.location}</span>
                        </div>

                        {/* Buttons */}
                       <div className="flex flex-col md:flex-row gap-3 mt-3 w-full">

                       <button
  onClick={(e) => {
    e.stopPropagation();
    handleOpenCalendarModal(bike);
  }}
  disabled={loading}
  className="w-full md:w-auto px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm 
         bg-red-100 text-red-700 border border-red-300 
         hover:bg-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isUnavailable ? "Manage Unavailability" : "Add Not Available Slot +"}
</button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/vehicle-history/${bikeId}`, {
                                state: { vehicleData: bike, vehicleType: "bike" },
                              });
                            }}
                            className="w-full md:w-auto flex items-center justify-center bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1.5 rounded-lg shadow-md hover:opacity-90 transition-all"
                          >
                            View Booking History
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Edit / Delete Menu */}
                    <div className="relative self-start">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                        onClick={(e) => handleMenuToggle(index, e)}
                      >
                        <span className="text-2xl">⋮</span>
                      </button>
                      {menuOpenIndex === index && (
                        <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 min-w-[150px]">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(bike);
                            }}
                          >
                            ✏️ Edit
                          </button>

                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(bike);
                            }}
                            disabled={deletingBikeId === bikeId}
                          >
                            {deletingBikeId === bikeId ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              <>🗑️ Delete</>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Unavailable Badge Overlay */}
                  {isUnavailable && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
                        UNAVAILABLE
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
     
      {/* Filter Modal */}
      {showFilter && <FilterCard onApply={() => setShowFilter(false)} />}
  {showCalendarModal && selectedVehicle && (
  <VehicleAvailabilityCalendar
  isOpen={true}
  onClose={() => {
    setShowCalendarModal(false);
    setSelectedVehicle(null);
  }}
  VechileId={selectedVehicle._id}
  vehicleType="Bike" // or "Car" for ListedCars.tsx
  userId={localStorage.getItem('userId') || ''}
  // startDate={new Date().toISOString().split('T')[0]}
  // endDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
/>
)}
 {/* Delete Confirmation Modal */}
      {showDeleteModal && vehicleToDelete && (
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onConfirm={() => handleDeleteVehicle(vehicleToDelete)}
          onCancel={() => {
            setShowDeleteModal(false);
            setVehicleToDelete(null);
          }}
        />
      )}
    </>
  );
};

export default ListedBikes;








 
// import React, { useState, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import { useListedBikesStore } from "../store/listedBikes.store";
// import apiService from "../services/api.service";
// import BikeLogo from "../assets/icons/BikeLogo.png";
// import Location from "../assets/icons/Location.png";
// import Search from "../assets/icons/Search.png";
// import FilterLogo from "../assets/icons/FilterLogo.png";
// import FilterCard from "../components/ui/FilterCard";
// // import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
// import VehicleAvailabilityCalendar from "../components/AvailabilityDateTimeModal";
// import { useLocation } from "../store/location.context";
// import enfield from "../assets/images/Enfield.png";
// import BikeCC from "../assets/icons/BikeCC.png";
// import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
 
// const { bike: bikeAPI } = apiService;
 
// interface Vehicle {
//   name: string;
//   price: string;
//   transmission: string;
//   fuel: string;
//   location: string;
//   rating: string;
//   available: boolean;
//   image: string;
//   id?: string;
//   cc?: string;
//   number?: string;
//   _id?: string;
//   bikeName?: string;
//   bikeModel?: string;
//   bikeNumber?: string;
//   pricePerKm?: number;
//   contactNumber?: string;
//   contactName?: string;
//   description?: string;
//   pickupArea?: string;
//   pickupCity?: string;
//   bikeImages?: string[];
// }
 
// const DefaultBikeImage = enfield;
 
// const ListedBikes: React.FC = () => {
//   const navigate = useNavigate();
//   const { currentCity } = useLocation();
//   const { bikes: userListedBikes, deleteBike } = useListedBikesStore();
 
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
//   const [bikes, setBikes] = useState<Vehicle[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
//   const [selectedList, setSelectedList] = useState<"cars" | "bikes">("bikes");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilter, setShowFilter] = useState(false);
//   const [showCalendarModal, setShowCalendarModal] = useState(false);
//   const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
//   const [deletingBikeId, setDeletingBikeId] = useState<string | null>(null);
 
//   // ✅ Fetch bikes using API service (no hardcoded URLs)
//   useEffect(() => {
//     const fetchMyBikes = async () => {
//       try {
//         setLoading(true);
//         setError("");
 
//         let userId = localStorage.getItem("userId");
 
//         if (!userId || userId.length !== 24 || !/^[a-f0-9]{24}$/i.test(userId)) {
//           console.warn("Invalid userId format:", userId);
//           userId = "68f32259cea8a9fa88029262";
//         }
 
//         console.log("Fetching bikes for userId:", userId);
 
//         // ✅ Use API service instead of direct fetch
//         const response: any = await bikeAPI.getMyVehicles(userId);
       
//         console.log("📦 Bikes API Response:", response);
 
//         const responseData = response.data || response;
//         let bikesArray: any[] = [];
 
//         if (Array.isArray(responseData)) bikesArray = responseData;
//         else if (Array.isArray(responseData.data)) bikesArray = responseData.data;
//         else if (Array.isArray(responseData.bikes)) bikesArray = responseData.bikes;
//         else if (Array.isArray(responseData.vehicles)) bikesArray = responseData.vehicles;
 
//         if (!bikesArray || bikesArray.length === 0) {
//           setBikes([]);
//           setLoading(false);
//           return;
//         }
 
//         const formattedBikes: Vehicle[] = bikesArray
//           .filter((bike) => bike && bike._id)
//           .map((bike) => ({
//             // Keep original bike data for navigation
//             ...bike,
//             id: bike._id,
//             _id: bike._id,
//             bikeName: bike.bikeName || "Unknown",
//             bikeModel: bike.bikeModel || "",
//             bikeNumber: bike.bikeNumber || bike.number || "N/A",
//             pricePerKm: bike.pricePerKm || bike.price || 0,
           
//             // Display fields
//             name: `${bike.bikeName || "Unknown"} ${bike.bikeModel || ""}`.trim(),
//             price: bike.pricePerKm?.toString() || bike.price?.toString() || "0",
//             transmission: bike.transmission || "Manual",
//             fuel: bike.fuelType || bike.fuel || "Petrol",
//             location: bike.pickupCity || bike.pickupArea || bike.location || currentCity,
//             rating: bike.averageRating?.toString() || bike.rating?.toString() || "4.0",
//             available: bike.Available !== false && bike.available !== false,
//             image: bike.bikeImages?.[0] || bike.image || DefaultBikeImage,
//             number: bike.bikeNumber || bike.number || "N/A",
//             cc: bike.cc?.toString() || bike.engineCapacity?.toString() || "150",
//           }));
 
//         console.log("✅ Formatted bikes:", formattedBikes);
//         setBikes(formattedBikes);
//       } catch (err: any) {
//         console.error("Error fetching bikes:", err);
//         let msg = "Failed to fetch your bikes.";
//         if (err.message?.includes("500"))
//           msg = "Server error occurred. The API endpoint might be down or userId invalid.";
//         else if (err.message?.includes("404"))
//           msg = "API endpoint not found. Check server configuration.";
//         else if (err.message?.includes("Failed to fetch"))
//           msg = "Network error. Check your connection.";
//         setError(msg);
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     fetchMyBikes();
//   }, [currentCity]);
 
//   useEffect(() => {
//     const handleClickOutside = () => setMenuOpenIndex(null);
//     if (menuOpenIndex !== null) {
//       document.addEventListener("click", handleClickOutside);
//       return () => document.removeEventListener("click", handleClickOutside);
//     }
//   }, [menuOpenIndex]);
 
//   const allBikes = useMemo(() => {
//     const userBikes: Vehicle[] = userListedBikes.map((bike: any) => ({
//       ...bike,
//       id: bike.id,
//       _id: bike._id || bike.id,
//       name: `${bike.bikeName} ${bike.bikeModel}`,
//       price: bike.pricePerKm?.toString() || "0",
//       transmission: bike.gps ? "GPS Enabled" : "No GPS",
//       fuel: "Petrol",
//       location: `${bike.city || currentCity}, ${bike.street || ""}`,
//       rating: bike.averageRating?.toString() || "0.0",
//       available: bike.Available !== false,
//       image: bike.bikeImages?.[0] || DefaultBikeImage,
//       number: bike.bikeNumber,
//       cc: "150",
//     }));
 
//     return [...userBikes, ...bikes];
//   }, [userListedBikes, bikes, currentCity]);
 
//   const isBikeUnavailable = (bike: Vehicle) => !bike.available;
 
//   const handleCardClick = (vehicle: Vehicle) => {
//     navigate(`/vehicle-details/${vehicle.name.toLowerCase().replace(/\s+/g, "-")}`);
//   };
 
//   const handleOpenCalendarModal = (vehicle: Vehicle) => {
//     setSelectedVehicle(vehicle);
//     setShowCalendarModal(true);
//   };
 
//   const handleConfirm = (
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
//   ) => {
//     console.log(
//       `Vehicle: ${selectedVehicle?.name}, Unavailable from ${startDate} to ${endDate}, ${startTime}-${endTime}`
//     );
//     setShowCalendarModal(false);
//     setSelectedVehicle(null);
//   };
 
//   const handleEdit = (vehicle: Vehicle) => {
//     console.log("🔧 Editing bike with data:", vehicle);
   
//     // Pass complete bike data to BikeDetails
//     navigate("/Bike-Details", {
//       state: {
//         bikeData: {
//           _id: vehicle._id || vehicle.id,
//           id: vehicle.id || vehicle._id,
//           bikeName: vehicle.bikeName || vehicle.name?.split(' ')[0] || "",
//           bikeModel: vehicle.bikeModel || vehicle.name?.split(' ')[1] || "",
//           bikeNumber: vehicle.bikeNumber || vehicle.number || "",
//           pricePerKm: vehicle.pricePerKm || vehicle.price || 0,
//           contactNumber: vehicle.contactNumber || "",
//           contactName: vehicle.contactName || "",
//           description: vehicle.description || "",
//           pickupArea: vehicle.pickupArea || "",
//           pickupCity: vehicle.pickupCity || vehicle.location || "",
//           bikeImages: vehicle.bikeImages || [vehicle.image],
//           image: vehicle.image,
//           Available: vehicle.available,
//         },
//         openEditForm: true
//       },
//     });
//     setMenuOpenIndex(null);
//   };
 
//   const handleDelete = (vehicle: Vehicle) => {
//     setVehicleToDelete(vehicle);
//     setShowDeleteModal(true);
//     setMenuOpenIndex(null);
//   };
 
//   const handleDeleteVehicle = async (vehicle: Vehicle) => {
//     if (!vehicle.id && !vehicle._id) {
//       setError("Cannot delete vehicle without ID");
//       return;
//     }
 
//     const bikeId = vehicle._id || vehicle.id;
 
//     try {
//       setDeletingBikeId(bikeId!);
     
//       // ✅ Use API service for delete
//       await bikeAPI.deleteBikeById(bikeId!);
     
//       setBikes(bikes.filter((b) => b.id !== bikeId && b._id !== bikeId));
//       deleteBike(bikeId!);
     
//       alert("✅ Bike deleted successfully!");
//     } catch (err: any) {
//       console.error("Delete error:", err);
//       setError(`Failed to delete ${vehicle.name}. ${err.message || ""}`);
//     } finally {
//       setDeletingBikeId(null);
//       setShowDeleteModal(false);
//       setVehicleToDelete(null);
//     }
//   };
 
//   const filteredBikes = allBikes.filter((bike) =>
//     bike.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
 
//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//         <span className="ml-2 text-gray-600">Loading bikes...</span>
//       </div>
//     );
 
//   if (error)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-red-600 text-center max-w-2xl p-6">{error}</div>
//       </div>
//     );
 
//   return (
//     <>
//       <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
//         <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 gap-4">
//           <div className="flex items-center w-full md:w-[300px] h-[50px] border rounded-lg px-3 bg-white">
//             <img src={BikeLogo} alt="Dropdown Logo" className="w-[24px] h-[24px]" />
//             <select
//               className="flex-1 ml-2 border-none outline-none text-sm bg-transparent"
//               value={selectedList}
//               onChange={(e) => {
//                 const value = e.target.value as "cars" | "bikes";
//                 setSelectedList(value);
//                 if (value === "cars") navigate("/listed");
//               }}
//             >
//               <option value="cars">Listed Cars</option>
//               <option value="bikes">Listed Bikes</option>
//             </select>
//           </div>
 
//           <div className="flex gap-2 w-full md:w-auto">
//             <div className="relative flex-1 md:w-[300px] h-[40px]">
//               <img
//                 src={Search}
//                 alt="Search"
//                 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
//               />
//               <input
//                 type="text"
//                 placeholder="Search Bikes..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full h-full rounded-full border pl-12 pr-4 focus:outline-none"
//               />
//             </div>
//             <button
//               onClick={() => setShowFilter(true)}
//               className="flex items-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1 rounded-md hover:opacity-90 transition-all"
//             >
//               <img src={FilterLogo} alt="Filter" className="w-6 h-6" /> Filter
//             </button>
//           </div>
//         </div>
 
//         <div className="flex flex-col gap-4 overflow-y-auto max-h-[550vh] pr-2">
//           {filteredBikes.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               <p className="text-lg mb-2">No bikes found</p>
//             </div>
//           ) : (
//             filteredBikes.map((bike, index) => {
//               const isUnavailable = isBikeUnavailable(bike);
//               return (
//                 <div
//                   key={bike._id || bike.id}
//                   className={`flex flex-row bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 p-4 gap-4 w-full md:w-[900px] relative ${
//                     isUnavailable ? "opacity-60" : ""
//                   }`}
//                 >
//                   {isUnavailable && (
//                     <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
//                       UNAVAILABLE
//                     </div>
//                   )}
 
//                   <div className={`flex gap-4 ${isUnavailable ? "blur-[1.5px]" : ""}`}>
//                     <div className="w-[220px] h-[200px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
//                       <img
//                         src={bike.image}
//                         alt={bike.name}
//                         className="w-full h-full object-cover cursor-pointer"
//                         onClick={() => handleCardClick(bike)}
//                         onError={(e) => {
//                           (e.currentTarget as HTMLImageElement).src = DefaultBikeImage;
//                         }}
//                       />
//                     </div>
 
//                     <div className="flex flex-col justify-between flex-1">
//                       <div className="flex items-center justify-start gap-4 mt-1">
//                         <h3 className="font-semibold text-base text-gray-900 truncate">
//                           {bike.name}
//                         </h3>
//                         <div className="flex items-center bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md text-xs font-medium shadow-sm">
//                           ⭐ {bike.rating || "4.2"}
//                         </div>
//                       </div>
 
//                       <p className="text-blue-600 font-bold text-lg mb-1">
//                         ₹{bike.price}
//                         <span className="text-gray-500 font-normal text-sm">/km</span>
//                       </p>
 
//                       <div className="flex flex-col gap-1 text-gray-600 text-sm">
//                         <div className="flex items-center gap-2">
//                           <img src={BikeCC} alt="Bike CC" className="w-5 h-5" />
//                           <span>{bike.cc || "150"} CC</span>
//                         </div>
 
//                         <div className="flex items-center gap-2">
//                           <img src={Location} alt="Location" className="w-5 h-5" />
//                           <span className="text-xs">{bike.location}</span>
//                         </div>
 
//                         <div className="flex items-center justify-start gap-4 mt-3">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleOpenCalendarModal(bike);
//                             }}
//                             className="px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 transition-all"
//                           >
//                             {isUnavailable
//                               ? "Manage Unavailability"
//                               : "Add Not Available Slot +"}
//                           </button>
 
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               navigate(`/vehicle-history/${bike.name}`, {
//                                 state: { vehicleData: bike },
//                               });
//                             }}
//                             className="flex items-center justify-center bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1.5 rounded-lg shadow-md hover:opacity-90 transition-all"
//                           >
//                             View Booking History
//                           </button>
//                         </div>
//                       </div>
//                     </div>
 
//                     <div className="relative self-start">
//                       <button
//                         className="p-2 hover:bg-gray-100 rounded-full"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setMenuOpenIndex(menuOpenIndex === index ? null : index);
//                         }}
//                       >
//                         <span className="text-2xl">⋮</span>
//                       </button>
//                       {menuOpenIndex === index && (
//                         <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 min-w-[150px]">
//                           <button
//                             className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleEdit(bike);
//                             }}
//                           >
//                             ✏️ Edit
//                           </button>
//                           <button
//                             className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDelete(bike);
//                             }}
//                             disabled={deletingBikeId === (bike._id || bike.id)}
//                           >
//                             {deletingBikeId === (bike._id || bike.id) ? (
//                               <>
//                                 <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
//                               </>
//                             ) : (
//                               <>🗑️ Delete</>
//                             )}
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
 
//       {showFilter && <FilterCard onApply={() => setShowFilter(false)} />}
//       {showCalendarModal && selectedVehicle && (
//        <VehicleAvailabilityCalendar
//   isOpen={showCalendarModal}
//   onClose={() => setShowCalendarModal(false)}
//   VechileId={selectedVehicle._id}
//   vehicleType="Car"
//   userId={localStorage.getItem("userId") || ""}
//   apiBaseUrl="http://3.110.122.127:3000" // Optional - can customize
// />
//       )}
//       {showDeleteModal && vehicleToDelete && (
//         <DeleteConfirmationModal
//           isOpen={showDeleteModal}
//           onConfirm={() => handleDeleteVehicle(vehicleToDelete)}
//           onCancel={() => {
//             setShowDeleteModal(false);
//             setVehicleToDelete(null);
//           }}
//         />
//       )}
//     </>
//   );
// };
 
// export default ListedBikes;
 