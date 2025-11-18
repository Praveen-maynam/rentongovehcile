// import React, { useState, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import { useListedBikesStore } from "../store/listedBikes.store";
// import { useLocation } from "../store/location.context";
// import apiService from "../services/api.service";
// import VehicleAvailabilityCalendar from "../components/AvailabilityDateTimeModal";
// import FilterCard from "../components/ui/FilterCard";
// import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
// import BikeLogo from "../assets/icons/BikeLogo.png";
// import FilterLogo from "../assets/icons/FilterLogo.png";
// import Search from "../assets/icons/Search.png";
// import Location from "../assets/icons/Location.png";
// import BikeCC from "../assets/icons/BikeCC.png";
// import Petrol from "../assets/icons/Petrol.png";
// import enfield from "../assets/images/Enfield.png";

// interface Vehicle {
//   name: string;
//   number: string;
//   price: string;
//   transmission: string;
//   fuel: string;
//   location: string;
//   rating: string;
//   available: boolean;
//   image: string;
//   id?: string;
//   _id?: string;
//   cc?: string;
//   contactName: string;
//   contactNumber: string;
// }

// const ListedBikes: React.FC = () => {
//   const navigate = useNavigate();
//   const { currentCity } = useLocation();
//   const { bikes: userListedBikes, deleteBike } = useListedBikesStore();

//   const [showCalendarModal, setShowCalendarModal] = useState(false);
//   const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
//   const [bikes, setBikes] = useState<Vehicle[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
//   const [selectedList, setSelectedList] = useState<"cars" | "bikes">("bikes");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilter, setShowFilter] = useState(false);
//   const [deletingBikeId, setDeletingBikeId] = useState<string | null>(null);
//   const [loggedInUserId, setLoggedInUserId] = useState<string>("");

//   // ==================== FETCH BIKES ====================
//   useEffect(() => {
//     const fetchMyBikes = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         let userId = localStorage.getItem('userId');
//         if (!userId || userId.length !== 24 || !/^[a-f0-9]{24}$/i.test(userId)) {
//           userId = "68f32259cea8a9fa88029262";
//         }

//         console.log("🏍️ Fetching bikes for user:", userId);

//         const response = await apiService.bike.getMyVehicles(userId);
//         const responseData = response.data || response;
        
//         let bikesArray = [];
//         if (responseData.data && responseData.data.bikes) {
//           bikesArray = responseData.data.bikes;
//         } else if (responseData.bikes) {
//           bikesArray = responseData.bikes;
//         } else if (Array.isArray(responseData)) {
//           bikesArray = responseData;
//         }

//         console.log(`✅ Found ${bikesArray.length} bikes`);

//         const formattedBikes: Vehicle[] = bikesArray.map((bike: any) => ({
//           _id: bike._id,
//           id: bike._id,
//           name: `${bike.bikeName || bike.BikeName || ''} ${bike.bikeModel || bike.BikeModel || ''}`.trim(),
//           number: bike.bikeNumber || bike.BikeNumber || "unknown",
//           contactNumber: bike.contactNumber?.toString() || "unknown",
//           contactName: bike.contactName || "unknown",
//           price: bike.pricePerKm?.toString() || "0",
//           transmission: bike.gps ? "GPS Enabled" : "No GPS",
//           fuel: bike.fuelType || "Petrol",
//           location: bike.pickupCity || bike.location || currentCity || "Unknown",
//           rating: bike.averageRating?.toString() || "4.0",
//           available: bike.Available !== false,
//           image: bike.bikeImages && bike.bikeImages.length > 0 
//             ? bike.bikeImages[0] 
//             : enfield,
//           cc: bike.cc?.toString() || "150",
//         }));

//         setBikes(formattedBikes);
//       } catch (err: any) {
//         console.error("❌ Error fetching bikes:", err);
//         const errorMsg = err?.response?.data?.message || err?.message || "Failed to fetch bikes";
//         setError(errorMsg);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyBikes();
//   }, [currentCity]);

//   // ==================== CLOSE MENU ON OUTSIDE CLICK ====================
//   useEffect(() => {
//     const handleClickOutside = () => setMenuOpenIndex(null);
//     if (menuOpenIndex !== null) {
//       document.addEventListener('click', handleClickOutside);
//       return () => document.removeEventListener('click', handleClickOutside);
//     }
//   }, [menuOpenIndex]);

//   // ==================== AUTO-HIDE SUCCESS MESSAGE ====================
//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => setSuccessMessage(""), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   // ==================== COMBINE USER & API BIKES ====================
//   const allBikes = useMemo(() => {
//     const userBikes: Vehicle[] = userListedBikes.map((bike) => ({
//       id: bike.id,
//       _id: bike.id,
//       name: bike.vehicleName,
//       number: bike.vehicleNumber || "",
//       price: bike.farePrice,
//       transmission: "Manual",
//       fuel: "Petrol",
//       location: bike.city && bike.street ? `${bike.city}, ${bike.street}` : bike.city || currentCity,
//       rating: bike.rating?.toString() || "4.0",
//       available: true,
//       contactName: "unknown",
//       contactNumber: "unknown",
//       image: bike.photos?.[0] || enfield,
//       cc: "150",
//     }));

//     return [...userBikes, ...bikes];
//   }, [userListedBikes, bikes, currentCity]);

//   // ==================== HANDLE CALENDAR MODAL ====================
//   const handleOpenCalendarModal = (vehicle: Vehicle, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setSelectedVehicle(vehicle);
    
//     let userId = localStorage.getItem('userId');
//     if (!userId || userId.length !== 24 || !/^[a-f0-9]{24}$/i.test(userId)) {
//       userId = "68f32259cea8a9fa88029262";
//     }
    
//     console.log("🔧 Opening calendar for vehicle:", {
//       vehicleId: vehicle._id || vehicle.id,
//       userId: userId,
//     });
    
//     setLoggedInUserId(userId);
//     setShowCalendarModal(true);
//     setError("");
//   };

//   // ==================== EDIT VEHICLE ====================
//   const handleEdit = (vehicle: Vehicle) => {
//     const id = vehicle._id || vehicle.id;

//     if (!id) {
//       console.error("❌ No vehicle ID found for:", vehicle.name);
//       return;
//     }

//     console.log("✏️ Editing vehicle:", vehicle.name, "ID:", id);

//     navigate(`/Bike-Details/${id}`, {
//       state: {
//         bikeData: vehicle,
//         openEditForm: true,
//       },
//     });

//     setMenuOpenIndex(null);
//   };

//   // ==================== DELETE VEHICLE ====================
//   const handleDelete = (vehicle: Vehicle) => {
//     console.log("🗑️ Preparing to delete bike:", vehicle.name);
//     setVehicleToDelete(vehicle);
//     setShowDeleteModal(true);
//     setMenuOpenIndex(null);
//   };

//   const handleDeleteVehicle = async (vehicle: Vehicle) => {
//     const vehicleId = vehicle._id || vehicle.id;
    
//     if (!vehicleId) {
//       setError("Cannot delete vehicle without ID");
//       setShowDeleteModal(false);
//       setVehicleToDelete(null);
//       return;
//     }

//     try {
//       setDeletingBikeId(vehicleId);
//       console.log('🗑️ Deleting bike with ID:', vehicleId);

//       await apiService.bike.deleteBikeById(vehicleId);
      
//       console.log('✅ Bike deleted successfully');
      
//       setBikes(bikes.filter((bike) => {
//         const bikeId = bike._id || bike.id;
//         return bikeId !== vehicleId;
//       }));
//       deleteBike(vehicleId);
      
//       setSuccessMessage(`${vehicle.name} deleted successfully!`);
//       setError("");
//     } catch (error: any) {
//       console.error('❌ Error deleting bike:', error);
      
//       const errorMsg = error?.response?.data?.message || 
//                       error?.message || 
//                       "Failed to delete vehicle. Please try again.";
      
//       setError(`Failed to delete ${vehicle.name}. ${errorMsg}`);
//     } finally {
//       setDeletingBikeId(null);
//       setMenuOpenIndex(null);
//       setShowDeleteModal(false);
//       setVehicleToDelete(null);
//     }
//   };

//   // ==================== MENU TOGGLE ====================
//   const handleMenuToggle = (index: number, event: React.MouseEvent) => {
//     event.stopPropagation();
//     setMenuOpenIndex(menuOpenIndex === index ? null : index);
//   };

//   // ==================== FILTERED BIKES ====================
//   const filteredBikes = allBikes.filter((bike) =>
//     bike.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ==================== LOADING STATE ====================
//   if (loading && bikes.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//         <span className="ml-2 text-gray-600">Loading bikes...</span>
//       </div>
//     );
//   }

//   // ==================== RENDER ====================
//   return (
//     <>
//       {/* Top Controls */}
//       <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 gap-4">
//         {/* Dropdown */}
//         <div className="flex items-center w-full md:w-[300px] h-[50px] border rounded-lg px-3 bg-white cursor-pointer
//                     border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition-all duration-200">
//           <img src={BikeLogo} alt="Dropdown Logo" className="w-[24px] h-[24px]" />
//           <select
//             className="flex-1 ml-2 border-none outline-none text-sm bg-transparent"
//             value={selectedList}
//             onChange={(e) => {
//               const value = e.target.value as "cars" | "bikes";
//               setSelectedList(value);
//               if (value === "cars") navigate("/listed");
//             }}
//           >
//             <option value="bikes">Listed Bikes</option>
//             <option value="cars">Listed Cars</option>
//           </select>
//         </div>

//         {/* Search + Filter */}
//         <div className="flex gap-5 w-full md:w-auto">
//           <div className="relative flex-1 md:w-[300px] h-[55px] transition-all duration-200 rounded-full">
//             <img
//               src={Search}
//               alt="Search"
//               className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
//             />
//             <input
//               type="text"
//               placeholder="Search Bikes..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full h-full rounded-full border pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer
//                     border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition-all duration-200"
//             />
//           </div>
//           <button
//             onClick={() => setShowFilter(true)}
//             className="flex items-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1 rounded-md cursor-pointer
//                     border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition-all duration-200"
//           >
//             <img src={FilterLogo} alt="Filter" className="w-6 h-6" /> Filter
//           </button>
//         </div>
//       </div>

//       {/* Bike Cards */}
//       <div className="flex flex-col pb-16">
//         {filteredBikes.length === 0 ? (
//           <div className="text-center py-12 text-gray-500">
//             <p className="text-lg mb-2">No bikes found</p>
//             <p className="text-sm">
//               {searchTerm ? "Try adjusting your search" : "Start by adding your first bike"}
//             </p>
//           </div>
//         ) : (
//           filteredBikes.map((bike, index) => {
//             const isUnavailable = !bike.available;
//             const bikeId = bike._id || bike.id;

//             return (
//               <React.Fragment key={bikeId || `bike-${index}`}>
//                 <div
//                   className={`relative flex flex-col md:flex-row bg-white rounded-xl shadow-sm 
//                     transition-all duration-300 overflow-hidden
//                     border-2 border-transparent hover:border-blue-500 hover:shadow-xl
//                     p-4 gap-4 w-full max-w-4xl`}
//                 >
//                   {/* Content with blur effect if unavailable */}
//                   <div className={`flex flex-col md:flex-row gap-4 w-full ${isUnavailable ? "blur-[1.5px]" : ""}`}>
//                     {/* Image - Fixed Size */}
//                     <div className="w-full md:w-[300px] h-[210px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 rounded-2xl">
//                       <img
//                         src={bike.image}
//                         alt={bike.name}
//                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-2xl"
//                         onError={(e) => {
//                           e.currentTarget.src = enfield;
//                         }}
//                       />
//                     </div>

//                     {/* Content */}
//                     <div className="flex flex-col flex-1 font-medium gap-2">
//                       <h3 className="font-bold text-xl text-gray-900 truncate">
//                         {bike.name}
//                       </h3>

//                       {/* Bike Price */}
//                       <p className="font-bold text-2xl mt-0.5 mb-0.5">
//                         ₹{bike.price}
//                         <span className="text-gray-500 font-normal text-sm">/km</span>
//                       </p>

//                       {/* Feature list */}
//                       {/* <div className="flex flex-col gap-1.5 text-gray-700 text-base font-medium mt-1"> */}
//                         {/* <div className="flex items-center gap-2">
//                           <img src={BikeCC} className="w-6 h-6" alt="CC" />
//                           <span>{bike.cc || "150"} CC</span>
//                         </div> */}

//                         <div className="flex items-center gap-2">
//                           <img src={Petrol} className="w-5 h-5" alt="Fuel" />
//                           <span>{bike.fuel}</span>
//                         </div>

//                         <div className="flex items-center gap-2">
//                           <img src={Location} className="w-5 h-5" alt="Location" />
//                           <span className="text-xs">{bike.location}</span>
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex flex-col md:flex-row gap-3 mt-3 w-full">
//                           <button
//                             onClick={(e) => handleOpenCalendarModal(bike, e)}
//                             disabled={loading}
//                             className="px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm 
//                               bg-red-100 text-red-700 border border-red-300 
//                               hover:bg-red-200 hover:shadow-md transition-all duration-200
//                               disabled:opacity-50 disabled:cursor-not-allowed"
//                           >
//                             {isUnavailable ? "Manage Unavailability" : "Add Not Available Slot +"}
//                           </button>

//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               const vehicleId = bike._id || bike.id;
//                               console.log("🏍️ Navigating to bike history, ID:", vehicleId);
//                               navigate(`/vehicle-history/${vehicleId}`, {
//                                 state: { 
//                                   vehicleData: bike, 
//                                   vehicleType: "bike" 
//                                 },
//                               });
//                             }}
//                             className="flex items-center justify-center bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1.5 rounded-lg shadow-md hover:opacity-90 hover:shadow-lg transition-all duration-200"
//                           >
//                             View Booking History
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Edit / Delete Menu */}
//                     <div className="absolute top-4 right-4 z-10">
//                       <button
//                         className="p-2 hover:bg-gray-100 rounded-full transition"
//                         onClick={(e) => handleMenuToggle(index, e)}
//                       >
//                         <span className="text-2xl">⋮</span>
//                       </button>
//                       {menuOpenIndex === index && (
//                         <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg min-w-[150px] overflow-hidden">
//                           <button
//                             className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 transition-all duration-200"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleEdit(bike);
//                             }}
//                           >
//                             ✏️ Edit
//                           </button>

//                           <button
//                             className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 text-red-600 transition-all duration-200"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDelete(bike);
//                             }}
//                             disabled={deletingBikeId === bikeId}
//                           >
//                             {deletingBikeId === bikeId ? (
//                               <>
//                                 <Loader2 className="w-4 h-4 animate-spin" />
//                                 Deleting...
//                               </>
//                             ) : (
//                               <>🗑️ Delete</>
//                             )}
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Unavailable Overlay */}
//                   {isUnavailable && (
//                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                       <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
//                         UNAVAILABLE
//                       </div>
//                     </div>
//                   )}
                

//                 {/* Horizontal Separator Between Cards */}
//                 {index < filteredBikes.length - 1 && (
//                   <div className="w-full max-w-4xl h-px bg-gray-200 my-4"></div>
//                 )}
//               </React.Fragment>
//             );
//           })
//         )}
//       </div>

//       {/* Filter Modal */}
//       {showFilter && <FilterCard onApply={() => setShowFilter(false)} />}

   
//              {showCalendarModal && selectedVehicle && loggedInUserId && (
// <AvailabilityDateTime
//   isOpen={showCalendarModal}
//   onClose={() => {
//     setShowCalendarModal(false);
//     setSelectedVehicle(null);
//     setError("");
//   }}
//   VechileId={selectedVehicle._id || selectedVehicle.id || ""}
//   vehicleType="Car"
//   userId={loggedInUserId}
//   role="owner"   // ✅ Add this
// />

// )}

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
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import AvailabilityDateTime from "../components/AvailabilityDateTimeModal";

interface Vehicle {
  name: string;
  number: string;
  price: string;
  transmission: string;  // Currently defaults to "Manual" if not in API
  fuel: string;          // Currently defaults to "Petrol" if not in API
  location: string;
  rating: string;
  available: boolean;
  image: string;
  id?: string;
  _id?: string;
  engineCapacity?: string;  // Currently defaults to "150" if not in API
  cc?: string;
  contactName: string;
  contactNumber: string;
}
const ListedBikes: React.FC = () => {
  const navigate = useNavigate();
  const { currentCity } = useLocation();
  const { bikes: userListedBikes, deleteBike } = useListedBikesStore();

  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
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
  const [deletingBikeId, setDeletingBikeId] = useState<string | null>(null);
  const [loggedInUserId, setLoggedInUserId] = useState<string>("");

useEffect(() => {
  const fetchMyBikes = async () => {
    try {
      setLoading(true);
      setError("");

      let userId = localStorage.getItem('userId');
      if (!userId || userId.length !== 24 || !/^[a-f0-9]{24}$/i.test(userId)) {
        userId = "690308d03a633b650dbc7e61";
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

      const formattedBikes: Vehicle[] = bikesArray.map((bike: any) => {
        // Build location string from API fields (same as backend structure)
        const locationParts = [
          bike.pickupArea,
          bike.pickupCity,
          bike.pickupCityState,
          bike.pickupCityPinCode
        ].filter(Boolean); // Remove empty values
        
        const locationString = locationParts.length > 0 
          ? locationParts.join(', ') 
          : currentCity || "Unknown";

        return {
          _id: bike._id,
          id: bike._id,
          // CORRECTED: Use exact API field names
          name: `${bike.bikeName || ''} ${bike.bikeModel || ''}`.trim(),
          number: bike.bikeNumber || "unknown",
          contactNumber: bike.contactNumber?.toString() || "unknown",
          contactName: bike.contactName || "unknown",
          price: bike.pricePerKm?.toString() || "0",
          // CORRECTED: Map transmission field (if exists in your API)
          transmission: bike.transmission || bike.Transmission || "Manual",
          // CORRECTED: Map fuel field (if exists in your API)  
          fuel: bike.fuel || bike.fuelType || bike.Fuel || "Petrol",
          // CORRECTED: Use constructed location string
          location: locationString,
          rating: bike.averageRating?.toString() || "4.0",
          // CORRECTED: Use exact API field name
          available: bike.Available !== false,
          image: bike.bikeImages && bike.bikeImages.length > 0 
            ? bike.bikeImages[0] 
            : enfield,
          // Engine capacity mapping
          engineCapacity: bike.bikeEngine || bike.engineCapacity || bike.cc?.toString() || "150",
          cc: bike.cc?.toString() || "150",
        };
      });

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
       transmission: bike.transmission || "Manual",
  fuel: bike.fuel || "Petrol",
  engineCapacity: bike.engineCapacity || "150",
      location: bike.city && bike.street ? `${bike.city}, ${bike.street}` : bike.city || currentCity,
      rating: bike.rating?.toString() || "4.0",
      available: true,
      contactName: "unknown",
      contactNumber: "unknown",
      image: bike.photos?.[0] || enfield,
      cc: "150",
    }));

    return [...userBikes, ...bikes];
  }, [userListedBikes, bikes, currentCity]);

  // ==================== HANDLE CALENDAR MODAL ====================
  const handleOpenCalendarModal = (vehicle: Vehicle, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedVehicle(vehicle);
    
    let userId = localStorage.getItem('userId');
    if (!userId || userId.length !== 24 || !/^[a-f0-9]{24}$/i.test(userId)) {
      userId = "68f32259cea8a9fa88029262";
    }
    
    console.log("🔧 Opening calendar for vehicle:", {
      vehicleId: vehicle._id || vehicle.id,
      userId: userId,
    });
    
    setLoggedInUserId(userId);
    setShowCalendarModal(true);
    setError("");
  };

  // ==================== EDIT VEHICLE ====================
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
        <div className="flex items-center w-full md:w-[300px] h-[50px] border rounded-lg px-3 bg-white cursor-pointer
                    border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition-all duration-200">
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
        <div className="flex gap-5 w-full md:w-auto">
          <div className="relative flex-1 md:w-[300px] h-[55px] transition-all duration-200 rounded-full">
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
              className="w-full h-full rounded-full border pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer
                    border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition-all duration-200"
            />
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1 rounded-md cursor-pointer
                    border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition-all duration-200"
          >
            <img src={FilterLogo} alt="Filter" className="w-6 h-6" /> Filter
          </button>
        </div>
      </div>

      {/* Bike Cards */}
      <div className="flex flex-col pb-16">
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
              <React.Fragment key={bikeId || `bike-${index}`}>
                <div
                  className={`relative flex flex-col md:flex-row bg-white rounded-xl shadow-sm 
                    transition-all duration-300 overflow-hidden
                    border-2 border-transparent hover:border-blue-500 hover:shadow-xl
                    p-4 gap-4 w-full max-w-4xl`}
                >
                  {/* Content with blur effect if unavailable */}
                  <div className={`flex flex-col md:flex-row gap-4 w-full ${isUnavailable ? "blur-[1.5px]" : ""}`}>
                    {/* Image - Fixed Size */}
                    <div className="w-300px md:w-[300px] h-[250px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 rounded-2xl">
                      <img
                        src={bike.image}
                        alt={bike.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-2xl"
                        onError={(e) => {
                          e.currentTarget.src = enfield;
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 font-medium gap-2">
                      <h3 className="font-bold text-xl text-gray-900 truncate">
                        {bike.name}
                      </h3>

                      {/* Bike Price */}
                      <p className="font-bold text-2xl mt-0.5 mb-0.5">
                        ₹{bike.price}
                        <span className="text-gray-500 font-normal text-sm">/km</span>
                      </p>

                    {/* Engine Capacity */}
              {bike.engineCapacity && (
                   <div className="flex items-center gap-2">
               <img src={BikeCC} className="w-6 h-6" alt="Engine" />
                       <span>{bike.engineCapacity} CC</span>
                      </div>
                   )}
                        {/* Transmission */}
                        <div className="flex items-center gap-2">
                             <img src={AutomaticLogo} className="w-5 h-5" alt="Transmission" />
                              <span>{bike.transmission}</span>
                        </div>

                     {/* Fuel Type */}
               <div className="flex items-center gap-2">
                 <img src={Petrol} className="w-5 h-5" alt="Fuel" />
                 <span>{bike.fuel}</span>
                     </div>
                        <div className="flex items-center gap-2">
                          <img src={Location} className="w-5 h-5" alt="Location" />
                          <span className="text-xs">{bike.location}</span>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col md:flex-row gap-3 mt-3 w-full">
                          <button
                            onClick={(e) => handleOpenCalendarModal(bike, e)}
                            disabled={loading}
                            className="px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm 
                              bg-red-100 text-red-700 border border-red-300 
                              hover:bg-red-200 hover:shadow-md transition-all duration-200
                              disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUnavailable ? "Manage Unavailability" : "Add Not Available Slot +"}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const vehicleId = bike._id || bike.id;
                              console.log("🏍️ Navigating to bike history, ID:", vehicleId);
                              navigate(`/vehicle-history/${vehicleId}`, {
                                state: { 
                                  vehicleData: bike, 
                                  vehicleType: "bike" 
                                },
                              });
                            }}
                            className="flex items-center justify-center bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1.5 rounded-lg shadow-md hover:opacity-90 hover:shadow-lg transition-all duration-200"
                          >
                            View Booking History
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Edit / Delete Menu */}
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                        onClick={(e) => handleMenuToggle(index, e)}
                      >
                        <span className="text-2xl">⋮</span>
                      </button>
                      {menuOpenIndex === index && (
                        <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg min-w-[150px] overflow-hidden">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 transition-all duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(bike);
                            }}
                          >
                            ✏️ Edit
                          </button>

                          <button
                            className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 text-red-600 transition-all duration-200"
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

                  {/* Unavailable Overlay */}
                  {isUnavailable && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
                        UNAVAILABLE
                      </div>
                    </div>
                  )}
                

                {/* Horizontal Separator Between Cards */}
                {index < filteredBikes.length - 1 && (
                  <div className="w-full max-w-4xl h-px bg-gray-200 my-4"></div>
                )}
              </React.Fragment>
            );
          })
        )}
      </div>

      {/* Filter Modal */}
      {showFilter && <FilterCard onApply={() => setShowFilter(false)} />}

   
    {/* Availability Calendar Modal */}
{showCalendarModal && selectedVehicle && loggedInUserId && (
  <AvailabilityDateTime
    isOpen={showCalendarModal}
    onClose={() => {
      setShowCalendarModal(false);
      setSelectedVehicle(null);
      setError("");
    }}
    vehicleId={selectedVehicle._id || selectedVehicle.id || ""}
    vehicleType="Bike"
    userId={loggedInUserId}
    // userRole="owner"
  />
)}
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










