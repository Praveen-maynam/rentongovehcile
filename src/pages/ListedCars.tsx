
// import React, { useState, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import { useListedCarsStore } from "../store/listedCars.store";
// import { useLocation } from "../store/location.context";
// import apiService from "../services/api.service";
// import AvailabilityDateTimeModal from '../components/AvailabilityDateTimeModal';

// import BlackCar from "../assets/images/BlackCar.png";
// import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
// import DriverLogo from "../assets/icons/DriverLogo.png";
// import CarLogo from "../assets/icons/CarLogo.png";
// import FilterLogo from "../assets/icons/FilterLogo.png";
// import Petrol from "../assets/icons/Petrol.png";
// import Location from "../assets/icons/Location.png";
// import Search from "../assets/icons/Search.png";
// import FilterCard from "../components/ui/FilterCard";
// import DeleteConfirmationModal from "../components/DeleteConfirmationModal";


// interface Vehicle {
//   name: string;
//   number: string;
//   price: string;
//   transmission: string;
//   fuel: string;
//   seats: string;
//   location: string;
//   rating: string;
//   available: boolean;
//   image: string;
//   id?: string;
//   _id?: string;
//   contactNumber: number | string;  // ✅ changed
//   contactName: string;
// }

// interface ApiCar {
//   _id: string;
//   carName: string;
//   carModel: string;
//   carNumber: string;
//   pricePerHour: number;
//   transmission?: string;
//   fuelType?: string;
//   seatingCapacity?: number;
//   location?: string;
//   carImages?: string[];
//   rating?: number;
//   isAvailable?: boolean;
//    contactNumber:number;
//   contactName:string;
// }



// const ListedCars: React.FC = () => {
//   const navigate = useNavigate();
//   const { currentCity } = useLocation();
//   const { cars: userListedCars, deleteCar } = useListedCarsStore();
  
//   // State management
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
//   const [cars, setCars] = useState<Vehicle[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
//   const [selectedList, setSelectedList] = useState<"cars" | "bikes">("cars");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilter, setShowFilter] = useState(false);
//   const [showCalendarModal, setShowCalendarModal] = useState(false);
//   const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
//   const [deletingCarId, setDeletingCarId] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMyCars = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         let userId = localStorage.getItem('userId');
//         if (!userId || userId.length !== 24 || !/^[a-f0-9]{24}$/i.test(userId)) {
//           userId = "68f32259cea8a9fa88029262";
//         }

//         console.log("🚗 Fetching cars for user:", userId);

//         const response = await apiService.car.getMyVehicles(userId);
//         const responseData = response.data || response;
        
//         let carsArray = [];
//         if (responseData.data && responseData.data.cars) {
//           carsArray = responseData.data.cars;
//         } else if (responseData.cars) {
//           carsArray = responseData.cars;
//         } else if (Array.isArray(responseData)) {
//           carsArray = responseData;
//         }

//         console.log(`✅ Found ${carsArray.length} cars`);

//         const formattedCars: Vehicle[] = carsArray.map((car: any) => ({
//           _id: car._id,
//           id: car._id,
//           name: `${car.CarName} ${car.CarModel}`,
//           number: car.CarNumber || "unknown",
//           contactNumber:car.contactNumber||"unknow",
//           contactName:car.contactName||"unknow",
//           price: car.RentPerHour || "0",
//           description: car.description || "No description",
//           kmDriven: car.KmDriven || "unknown",
//           transmission: car.transmissionType || "Manual",
//           fuel: car.fuelType || "Petrol",
//           seats: `${car.Carseater || 5} Seaters`,
//           location: car.location || currentCity,
//           rating: car.rating?.toString() || "4.0",
//           available: car.isAvailable !== false,
//           image: car.carImages && car.carImages.length > 0 
//             ? car.carImages[0] 
//             : BlackCar,
//         }));

//         setCars(formattedCars);
//       } catch (err: any) {
//         console.error("❌ Error fetching cars:", err);
//         const errorMsg = err?.response?.data?.message || err?.message || "Failed to fetch cars";
//         setError(errorMsg);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchMyCars();
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

//   // ==================== COMBINE USER & API CARS ====================
//  const allCars = useMemo(() => {
//   const userCars: Vehicle[] = userListedCars.map((car) => ({
//     name: `${car.carName} ${car.model}`,
//     number: car.contactNumber,
//     price: car.rentPrice,
//     transmission: car.transmission,
//     fuel: car.fuel,
//     seats: "5 Seaters",
//     location: `${car.city}, ${car.street}`,
//     rating: car.rating.toString(),
//     available: true,
//     image: car.photos[0] || BlackCar,
//     id: car.id,
//     contactName: car.ownerName,
//     contactNumber: car.contactNumber || "N/A", // ✅ Fixed here
//   }));
//   return [...userCars, ...cars];
// }, [userListedCars, cars, currentCity]);

//   // ==================== HANDLE CARD CLICK ====================
//   const handleCardClick = (vehicle: Vehicle) => {
//     const vehicleId = vehicle._id || vehicle.id;
    
//     if (!vehicleId) {
//       console.error("❌ Vehicle ID missing for:", vehicle.name);
//       return;
//     }

//     console.log("🚗 Navigating to vehicle:", vehicle.name, "ID:", vehicleId);

//     navigate(`/book-now/${vehicleId}`, {
//       state: { vehicleData: vehicle },
//     });
//   };
// const handleOpenCalendarModal = (vehicle: Vehicle) => {
//   setSelectedVehicle(vehicle);
//   setShowCalendarModal(true);
//   setError("");
// };


//   const handleEdit = (vehicle: Vehicle) => {
//     const id = vehicle._id || vehicle.id;

//     if (!id) {
//       console.error("❌ No vehicle ID found for:", vehicle.name);
//       return;
//     }

//     console.log("✏️ Editing vehicle:", vehicle.name, "ID:", id);

//     navigate(`/Car-Details/${id}`, {
//       state: {
//         carData: vehicle,
//         openEditForm: true,
//       },
//     });

//     setMenuOpenIndex(null);
//   };

//   // ==================== DELETE VEHICLE ====================
//   const handleDelete = (vehicle: Vehicle) => {
//     console.log("🗑️ Preparing to delete vehicle:", vehicle.name);
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
//       setDeletingCarId(vehicleId);
//       console.log('🗑️ Deleting car with ID:', vehicleId);

//       await apiService.car.deleteCarById(vehicleId);
      
//       console.log('✅ Car deleted successfully');
      
//       // Remove from state
//       setCars(cars.filter((car) => {
//         const carId = car._id || car.id;
//         return carId !== vehicleId;
//       }));
//       deleteCar(vehicleId);
      
//       setSuccessMessage(`${vehicle.name} deleted successfully!`);
//       setError("");
//     } catch (error: any) {
//       console.error('❌ Error deleting car:', error);
      
//       const errorMsg = error?.response?.data?.message || 
//                       error?.message || 
//                       "Failed to delete vehicle. Please try again.";
      
//       setError(`Failed to delete ${vehicle.name}. ${errorMsg}`);
//     } finally {
//       setDeletingCarId(null);
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

//   // ==================== FILTERED CARS ====================
//   const filteredCars = allCars.filter((car) =>
//     car.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ==================== LOADING STATE ====================
//   if (loading && cars.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//         <span className="ml-2 text-gray-600">Loading cars...</span>
//       </div>
//     );
//   }

//   // ==================== RENDER ====================
//   return (
//     <>
    
       

//         {/* Top Controls */}
//         <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 gap-4">
//           {/* Dropdown */}
//           <div className="flex items-center w-full md:w-[300px] h-[50px] border rounded-lg px-3 bg-white">
//             <img src={CarLogo} alt="Dropdown Logo" className="w-[24px] h-[24px]" />
//             <select
//               className="flex-1 ml-2 border-none outline-none text-sm bg-transparent"
//               value={selectedList}
//               onChange={(e) => {
//                 const value = e.target.value as "cars" | "bikes";
//                 setSelectedList(value);
//                 if (value === "bikes") navigate("/listed-bikes");
//               }}
//             >
//               <option value="cars">Listed Cars</option>
//               <option value="bikes">Listed Bikes</option>
//             </select>
//           </div>

//           {/* Search + Filter */}
//           <div className="flex gap-2 w-full md:w-auto">
//             <div className="relative flex-1 md:w-[300px] h-[40px]">
//               <img
//                 src={Search}
//                 alt="Search"
//                 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
//               />
//               <input
//                 type="text"
//                 placeholder="Search Cars..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full h-full rounded-full border pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

//         {/* Car Cards */}
//         <div className="flex flex-col gap-4 overflow-y-auto max-h-[550vh] pr-2">
//           {filteredCars.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               <p className="text-lg mb-2">No cars found</p>
//               <p className="text-sm">
//                 {searchTerm ? "Try adjusting your search" : "Start by adding your first car"}
//               </p>
//             </div>
//           ) : (
//             filteredCars.map((car, index) => {
//               const isUnavailable = !car.available;
//               const carId = car._id || car.id;

//               return (
//                 <div
//                   key={carId || `car-${index}`}
//                   className={`flex flex-row bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 p-4 gap-4 w-full md:w-[900px] relative ${
//                     isUnavailable ? "opacity-60" : ""
//                   }`}
//                 >
//                   {/* Content with blur effect if unavailable */}
//                   <div className={`contents ${isUnavailable ? "blur-[1.5px]" : ""}`}>
//                     {/* Image */}
//                     <div className="w-[220px] h-[200px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
//                       <img
//                         src={car.image}
//                         alt={car.name}
//                         className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
//                         onClick={() => handleCardClick(car)}
//                         onError={(e) => {
//                           e.currentTarget.src = BlackCar;
//                         }}
//                       />
//                     </div>

//                     {/* Content */}
//                     <div className="flex flex-col justify-between flex-1">
//                       <div className="flex items-center justify-start gap-4 mt-1">
//                         <h3 className="font-semibold text-base text-gray-900 truncate">
//                           {car.name}
//                         </h3>
//                         <div className="flex items-center bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md text-xs font-medium shadow-sm">
//                           ⭐ {car.rating || "4.2"}
//                         </div>
//                       </div>

//                       <p className="text-blue-600 font-bold text-lg mb-1">
//                         ₹{car.price}
//                         <span className="text-gray-500 font-normal text-sm">/hr</span>
//                       </p>

//                       <div className="flex flex-col gap-1 text-gray-600 text-sm">
//                         <div className="flex items-center gap-2">
//                           <img src={AutomaticLogo} alt="Transmission" className="w-5 h-5" />
//                           <span>{car.transmission}</span>
//                         </div>

//                         <div className="flex items-center gap-2">
//                           <img src={DriverLogo} alt="Seats" className="w-5 h-5" />
//                           <span>{car.seats}</span>
//                         </div>

//                         <div className="flex items-center gap-2">
//                           <img src={Petrol} alt="Fuel" className="w-5 h-5" />
//                           <span>{car.fuel}</span>
//                         </div>

//                         <div className="flex items-center gap-2">
//                           <img src={Location} alt="Location" className="w-5 h-5" />
//                           <span className="text-xs">{car.location}</span>
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex items-center justify-start gap-4 mt-3">
//                           <button
//   onClick={(e) => {
//     e.stopPropagation();
//     handleOpenCalendarModal(car);
//   }}
//   disabled={loading}
//   className="px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm 
//              bg-red-100 text-red-700 border border-red-300 
//              hover:bg-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
// >
//   {isUnavailable ? "Manage Unavailability" : "Add Not Available Slot +"}
// </button>

//                         <button
//   onClick={(e) => {
//     e.stopPropagation();
//     const vehicleId = car._id || car.id;
//     console.log("🚗 Navigating to car history, ID:", vehicleId);
//     navigate(`/vehicle-history/${vehicleId}`, {
//       state: { 
//         vehicleData: car, 
//         vehicleType: "car" 
//       },
//     });
//   }}
//   className="flex items-center justify-center bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1.5 rounded-lg shadow-md hover:opacity-90 transition-all"
// >
//   View Booking History
// </button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Edit / Delete Menu */}
//                     <div className="relative self-start">
//                       <button
//                         className="p-2 hover:bg-gray-100 rounded-full transition"
//                         onClick={(e) => handleMenuToggle(index, e)}
//                       >
//                         <span className="text-2xl">⋮</span>
//                       </button>
//                       {menuOpenIndex === index && (
//                         <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 min-w-[150px]">
//                           <button
//                             className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleEdit(car);
//                             }}
//                           >
//                             ✏️ Edit
//                           </button>

//                           <button
//                             className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600 transition"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDelete(car);
//                             }}
//                             disabled={deletingCarId === carId}
//                           >
//                             {deletingCarId === carId ? (
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

                 
//                   {isUnavailable && (
//                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                       <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
//                         UNAVAILABLE
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           )}
//         </div>
   

//       {/* Filter Modal */}
//       {showFilter && <FilterCard onApply={() => setShowFilter(false)} />}
//    {showCalendarModal && selectedVehicle && (
// // Example fix for ListedBikes.tsx and ListedCars.tsx
// <AvailabilityDateTimeModal
//   isOpen={true}
//   onClose={() => {
//     setShowCalendarModal(false);
//     setSelectedVehicle(null);
//   }}
//   VechileId={selectedVehicle._id}
//   vehicleType="Car" // or "Car" for ListedCars.tsx
//   userId={localStorage.getItem('userId') || ''}
//   startDate={new Date().toISOString().split('T')[0]}
//   endDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
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

// export default ListedCars;





import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useListedCarsStore } from "../store/listedCars.store";
import { useLocation } from "../store/location.context";
import apiService from "../services/api.service";
import VehicleAvailabilityCalendar from "../components/AvailabilityDateTimeModal";

import BlackCar from "../assets/images/BlackCar.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import CarLogo from "../assets/icons/CarLogo.png";
import FilterLogo from "../assets/icons/FilterLogo.png";
import Petrol from "../assets/icons/Petrol.png";
import Location from "../assets/icons/Location.png";
import Search from "../assets/icons/Search.png";
import FilterCard from "../components/ui/FilterCard";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";


interface Vehicle {
  name: string;
  number: string;
  price: string;
  transmission: string;
  fuel: string;
  seats: string;
  location: string;
  rating: string;
  available: boolean;
  image: string;
  id?: string;
  _id?: string;
  contactNumber: number | string;  // ✅ changed
  contactName: string;
}

interface ApiCar {
  _id: string;
  carName: string;
  carModel: string;
  carNumber: string;
  pricePerHour: number;
  transmission?: string;
  fuelType?: string;
  seatingCapacity?: number;
  location?: string;
  carImages?: string[];
  rating?: number;
  isAvailable?: boolean;
   contactNumber:number;
  contactName:string;
}



const ListedCars: React.FC = () => {
  const navigate = useNavigate();
  const { currentCity } = useLocation();
  const { cars: userListedCars, deleteCar } = useListedCarsStore();
  
  // State management
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [cars, setCars] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const [selectedList, setSelectedList] = useState<"cars" | "bikes">("cars");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [deletingCarId, setDeletingCarId] = useState<string | null>(null);

const [loggedInUserId, setLoggedInUserId] = useState<string>("");
  useEffect(() => {
    const fetchMyCars = async () => {
      try {
        setLoading(true);
        setError("");

        let userId = localStorage.getItem('userId');
        if (!userId || userId.length !== 24 || !/^[a-f0-9]{24}$/i.test(userId)) {
          userId = "68f32259cea8a9fa88029262";
        }

        console.log("🚗 Fetching cars for user:", userId);

        const response = await apiService.car.getMyVehicles(userId);
        const responseData = response.data || response;
        
        let carsArray = [];
        if (responseData.data && responseData.data.cars) {
          carsArray = responseData.data.cars;
        } else if (responseData.cars) {
          carsArray = responseData.cars;
        } else if (Array.isArray(responseData)) {
          carsArray = responseData;
        }

        console.log(`✅ Found ${carsArray.length} cars`);

        const formattedCars: Vehicle[] = carsArray.map((car: any) => ({
          _id: car._id,
          id: car._id,
          name: `${car.CarName} ${car.CarModel}`,
          number: car.CarNumber || "unknown",
          contactNumber:car.contactNumber||"unknow",
          contactName:car.contactName||"unknow",
          price: car.RentPerHour || "0",
          description: car.description || "No description",
          kmDriven: car.KmDriven || "unknown",
          transmission: car.transmissionType || "Manual",
          fuel: car.fuelType || "Petrol",
          seats: `${car.Carseater || 5} Seaters`,
          location: car.location || currentCity,
          rating: car.rating?.toString() || "4.0",
          available: car.isAvailable !== false,
          image: car.carImages && car.carImages.length > 0 
            ? car.carImages[0] 
            : BlackCar,
        }));

        setCars(formattedCars);
      } catch (err: any) {
        console.error("❌ Error fetching cars:", err);
        const errorMsg = err?.response?.data?.message || err?.message || "Failed to fetch cars";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMyCars();
  }, [currentCity]);

 
  useEffect(() => {
    const handleClickOutside = () => setMenuOpenIndex(null);
    if (menuOpenIndex !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [menuOpenIndex]);


  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

 const allCars = useMemo(() => {
  const userCars: Vehicle[] = userListedCars.map((car) => ({
    name: `${car.carName} ${car.model}`,
    number: car.contactNumber,
    price: car.rentPrice,
    transmission: car.transmission,
    fuel: car.fuel,
    seats: "5 Seaters",
    location: `${car.city}, ${car.street}`,
    rating: car.rating.toString(),
    available: true,
    image: car.photos[0] || BlackCar,
    id: car.id,
    contactName: car.ownerName,
    contactNumber: car.contactNumber || "N/A", // ✅ Fixed here
  }));
  return [...userCars, ...cars];
}, [userListedCars, cars, currentCity]);


  const handleCardClick = (vehicle: Vehicle) => {
    const vehicleId = vehicle._id || vehicle.id;
    
    if (!vehicleId) {
      console.error("❌ Vehicle ID missing for:", vehicle.name);
      return;
    }

    console.log("🚗 Navigating to vehicle:", vehicle.name, "ID:", vehicleId);

    navigate(`/book-now/${vehicleId}`, {
      state: { vehicleData: vehicle },
    });
  };

// Update handleOpenCalendarModal function
const handleOpenCalendarModal = (vehicle: Vehicle) => {
  setSelectedVehicle(vehicle);
  
  // Get userId from localStorage with fallback
  let userId = localStorage.getItem('userId');
  if (!userId || userId.length !== 24 || !/^[a-f0-9]{24}$/i.test(userId)) {
    userId = "68f32259cea8a9fa88029262"; // Your fallback userId
  }
  
  console.log("🔧 Opening calendar for vehicle:", {
    vehicleId: vehicle._id || vehicle.id,
    userId: userId,
  });
  
  setLoggedInUserId(userId);
  setShowCalendarModal(true);
  setError("");
};

  const handleEdit = (vehicle: Vehicle) => {
    const id = vehicle._id || vehicle.id;

    if (!id) {
      console.error("❌ No vehicle ID found for:", vehicle.name);
      return;
    }

    console.log("✏️ Editing vehicle:", vehicle.name, "ID:", id);

    navigate(`/Car-Details/${id}`, {
      state: {
        carData: vehicle,
        openEditForm: true,
      },
    });

    setMenuOpenIndex(null);
  };


  const handleDelete = (vehicle: Vehicle) => {
    console.log("🗑️ Preparing to delete vehicle:", vehicle.name);
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
      setDeletingCarId(vehicleId);
      console.log('🗑️ Deleting car with ID:', vehicleId);

      await apiService.car.deleteCarById(vehicleId);
      
      console.log('✅ Car deleted successfully');
      
      // Remove from state
      setCars(cars.filter((car) => {
        const carId = car._id || car.id;
        return carId !== vehicleId;
      }));
      deleteCar(vehicleId);
      
      setSuccessMessage(`${vehicle.name} deleted successfully!`);
      setError("");
    } catch (error: any) {
      console.error('❌ Error deleting car:', error);
      
      const errorMsg = error?.response?.data?.message || 
                      error?.message || 
                      "Failed to delete vehicle. Please try again.";
      
      setError(`Failed to delete ${vehicle.name}. ${errorMsg}`);
    } finally {
      setDeletingCarId(null);
      setMenuOpenIndex(null);
      setShowDeleteModal(false);
      setVehicleToDelete(null);
    }
  };

  const handleMenuToggle = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

 
  const filteredCars = allCars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && cars.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading cars...</span>
      </div>
    );
  }


  return (
    <>
    
       

        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 gap-4">
          {/* Dropdown */}
          <div className="flex items-center w-full md:w-[300px] h-[50px] border rounded-lg px-3 bg-white">
            <img src={CarLogo} alt="Dropdown Logo" className="w-[24px] h-[24px]" />
            <select
              className="flex-1 ml-2 border-none outline-none text-sm bg-transparent"
              value={selectedList}
              onChange={(e) => {
                const value = e.target.value as "cars" | "bikes";
                setSelectedList(value);
                if (value === "bikes") navigate("/listed-bikes");
              }}
            >
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
                placeholder="Search Cars..."
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

        {/* Car Cards */}
       <div className="flex flex-col gap-4 pb-16">

          {filteredCars.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No cars found</p>
              <p className="text-sm">
                {searchTerm ? "Try adjusting your search" : "Start by adding your first car"}
              </p>
            </div>
          ) : (
            filteredCars.map((car, index) => {
              const isUnavailable = !car.available;
              const carId = car._id || car.id;

              return (
           <div
               key={carId || `car-${index}`}
             className={`flex flex-col md:flex-row bg-white rounded-xl shadow-sm 
              hover:shadow-md transition overflow-hidden 
              border border-gray-100 p-4 gap-4 w-full`}
                   >

                  {/* Content with blur effect if unavailable */}
                  <div className={`contents ${isUnavailable ? "blur-[1.5px]" : ""}`}>
                    {/* Image */}
                  <div className="w-full h-[180px] md:w-[220px] md:h-[200px] rounded-lg overflow-hidden bg-gray-100">

                      <img
                        src={car.image}
                        alt={car.name}
    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handleCardClick(car)}
                        onError={(e) => {
                          e.currentTarget.src = BlackCar;
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between flex-1">
                      <div className="flex items-center justify-start gap-4 mt-1">
                        <h3 className="font-semibold text-base text-gray-900 truncate">
                          {car.name}
                        </h3>
                        <div className="flex items-center bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md text-xs font-medium shadow-sm">
                          ⭐ {car.rating || "4.2"}
                        </div>
                      </div>

                      <p className="text-blue-600 font-bold text-lg mb-1">
                        ₹{car.price}
                        <span className="text-gray-500 font-normal text-sm">/hr</span>
                      </p>

                      <div className="flex flex-col gap-1 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          <img src={AutomaticLogo} alt="Transmission" className="w-5 h-5" />
                          <span>{car.transmission}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <img src={DriverLogo} alt="Seats" className="w-5 h-5" />
                          <span>{car.seats}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <img src={Petrol} alt="Fuel" className="w-5 h-5" />
                          <span>{car.fuel}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <img src={Location} alt="Location" className="w-5 h-5" />
                          <span className="text-xs">{car.location}</span>
                        </div>

                        {/* Buttons */}
                   <div className="flex flex-col md:flex-row gap-3 mt-3 w-full">

                          <button
  onClick={(e) => {
    e.stopPropagation();
    handleOpenCalendarModal(car);
  }}
  disabled={loading}
  className="px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm 
             bg-red-100 text-red-700 border border-red-300 
             hover:bg-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isUnavailable ? "Manage Unavailability" : "Add Not Available Slot +"}
</button>

                        <button
  onClick={(e) => {
    e.stopPropagation();
    const vehicleId = car._id || car.id;
    console.log("🚗 Navigating to car history, ID:", vehicleId);
    navigate(`/vehicle-history/${vehicleId}`, {
      state: { 
        vehicleData: car, 
        vehicleType: "car" 
      },
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
                              handleEdit(car);
                            }}
                          >
                            ✏️ Edit
                          </button>

                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(car);
                            }}
                            disabled={deletingCarId === carId}
                          >
                            {deletingCarId === carId ? (
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
  

    

{showCalendarModal && selectedVehicle && loggedInUserId && (
  <VehicleAvailabilityCalendar
    isOpen={showCalendarModal}
    onClose={() => {
      setShowCalendarModal(false);
      setSelectedVehicle(null);
      setError("");
      // Refresh the car list to show updated availability
      const fetchMyCars = async () => {
        // Your existing fetchMyCars logic
      };
      fetchMyCars();
    }}
    VechileId={selectedVehicle._id || selectedVehicle.id || ""}
    vehicleType="Car"
    userId={loggedInUserId}
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

export default ListedCars;






