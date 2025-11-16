

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import PopupChat from "../components/ui/PopupChat";
// import apiService from "../services/api.service";

// interface VehicleData {
//   _id: string;
//   // Car fields
//   CarName?: string;
//   CarModel?: string;
//   CarNumber?: string;
//   Carseater?: string;
//   RentPerHour?: number;
//   RentPerDay?: number;
//   carImages?: string[];
//   fuelType?: string;
//   transmissionType?: string;
//   Ac_available?: boolean;
//   kmDriven?: number;

//   // Bike fields
//   bikeName?: string;
//   bikeModel?: string;
//   bikeNumber?: string;
//   pricePerKm?: number;
//   bikeImages?: string[];
//   bikeCC?: string;

//   // Common fields
//   description?: string;
//   contactName?: string;
//   contactNumber?: string;
//   Available?: boolean;
//   pickupCity?: string;
//   pickupCityState?: string;
//   pickupArea?: string;
//   latitude?: string;
//   longitude?: string;
// }

// const BookingHistory: React.FC = () => {
//   const { vehicleId: urlVehicleId } = useParams<{ vehicleId: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentImage, setCurrentImage] = useState(0);
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   // Get data from navigation state
//   const passedVehicleData = location.state?.vehicleData;
//   const passedBooking = location.state?.booking;
//   const openContact = location.state?.openContact || false;

//   // ✅ FIXED: Better vehicle type detection
//   // Priority: 1. Passed vehicleData.vehicleType, 2. location.state.vehicleType, 3. Detect from data structure
//   const passedVehicleType = 
//     passedVehicleData?.vehicleType || 
//     location.state?.vehicleType;
  
//   const vehicleType = passedVehicleType || 
//     (passedVehicleData?.CarName || passedVehicleData?.carImages || passedVehicleData?.RentPerHour ? "car" : "bike");
  
//   const vehicleId = urlVehicleId || passedVehicleData?._id || passedVehicleData?.id || passedBooking?.vehicleId;

//   console.log("🔍 BookingHistory - Vehicle Type:", vehicleType, "ID:", vehicleId);

//   // Auto-open chat if coming from MyBookings with openContact flag
//   useEffect(() => {
//     if (openContact && passedBooking) {
//       setIsChatOpen(true);
//     }
//   }, [openContact, passedBooking]);

//   // ✅ Fetch vehicle details using apiService
//   useEffect(() => {
//     if (!vehicleId) {
//       setError("No vehicle ID provided");
//       setLoading(false);
//       return;
//     }

//     const fetchVehicleDetails = async () => {
//       try {
//         setLoading(true);
//         console.log(`📡 Fetching ${vehicleType} details for ID:`, vehicleId);

//         let result;
//         if (vehicleType === "car") {
//           result = await apiService.car.getCarById(vehicleId);
//         } else {
//           result = await apiService.bike.getBikeById(vehicleId);
//         }

//         // Extract data safely
//         const payload = result?.data ?? result;
//         const data = payload?.car || payload?.bike || payload?.data || payload?.vehicle || payload;

//         if (!data || typeof data !== "object") {
//           throw new Error("Invalid vehicle response format");
//         }

//         console.log("✅ Vehicle fetched successfully:", data);
//         setVehicleData(data);
//         setError("");
//       } catch (err: any) {
//         console.error("❌ Error fetching vehicle details:", err);
//         const errorMessage = err?.response?.data?.message || err?.message || "Failed to load vehicle details";
//         setError(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehicleDetails();
//   }, [vehicleId, vehicleType]);

//   // ✅ Call button action
//   const handleConfirmBooking = () => {
//     if (vehicleData?.contactNumber) {
//       window.location.href = `tel:${vehicleData.contactNumber}`;
//     } else {
//       alert("Contact number not available");
//     }
//   };

//   // Loading UI
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="animate-spin mx-auto mb-4" size={48} />
//           <p className="text-gray-600">Loading vehicle details...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error UI
//   if (error || !vehicleData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 text-lg mb-4">{error || "Vehicle not found"}</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const isCar = vehicleType === "car" || !!vehicleData.CarName || !!vehicleData.carImages;
//   const vehicleImages = isCar
//     ? vehicleData.carImages || []
//     : vehicleData.bikeImages || [];

//   const displayName = isCar
//     ? vehicleData.CarName || passedBooking?.vehicleName || "Unknown Vehicle"
//     : vehicleData.bikeName || passedBooking?.vehicleName || "Unknown Bike";

//   const displayModel = isCar
//     ? vehicleData.CarModel || "N/A"
//     : vehicleData.bikeModel || "N/A";

//   const displayPrice = isCar
//     ? vehicleData.RentPerHour || passedBooking?.price || 0
//     : vehicleData.pricePerKm || passedBooking?.price || 0;

//   const priceUnit = isCar ? "/hr" : "/km";

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center">
//       <div className="max-w-[900px] w-full bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row">
//         {/* Vehicle Image Carousel */}
//         <div className="relative w-full md:w-[409px] h-[309px] overflow-hidden rounded-xl shadow-md flex-shrink-0">
//           {vehicleImages.length > 0 ? (
//             <>
//               <img
//                 src={vehicleImages[currentImage]}
//                 alt={`${displayName} ${currentImage + 1}`}
//                 className="w-full h-full object-cover transition-all duration-500"
//                 onError={(e) => {
//                   e.currentTarget.src =
//                     "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
//                 }}
//               />
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                 {vehicleImages.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrentImage(idx)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                       idx === currentImage ? "bg-white scale-110" : "bg-gray-400"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </>
//           ) : (
//             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//               <span className="text-gray-400 text-lg">No Image Available</span>
//             </div>
//           )}
//         </div>

//         {/* Vehicle Info Section */}
//         <div className="flex flex-col ml-0 md:ml-6 mt-6 md:mt-0 flex-1">
//           <h1 className="text-3xl font-semibold">{displayName}</h1>
//           <p className="text-sm text-gray-500 mt-1">{displayModel}</p>

//           <div className="flex items-baseline mt-2">
//             <span className="text-3xl font-bold text-blue-600">₹{displayPrice}</span>
//             <span className="text-gray-500 ml-2 text-sm">{priceUnit}</span>
//           </div>

//           {/* Vehicle Stats */}
//           <div className="flex items-center mt-4 border border-gray-300 rounded-xl overflow-hidden">
//             {isCar ? (
//               <>
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   🚗 <p className="text-sm text-gray-700">{vehicleData.transmissionType || "Manual"}</p>
//                 </div>
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   👥 <p className="text-sm text-gray-700">{vehicleData.Carseater || "5"} Seater</p>
//                 </div>
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   ⛽ <p className="text-sm text-gray-700">{vehicleData.fuelType || "Petrol"}</p>
//                 </div>
//                 <div className="flex flex-col items-center px-4 py-3">
//                   ❄️ <p className="text-sm text-gray-700">{vehicleData.Ac_available ? "AC" : "Non-AC"}</p>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   🏍️ <p className="text-sm text-gray-700">Bike</p>
//                 </div>
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   ⛽ <p className="text-sm text-gray-700">Petrol</p>
//                 </div>
//                 <div className="flex flex-col items-center px-4 py-3">
//                   📍 <p className="text-sm text-gray-700">{vehicleData.pickupCity || "N/A"}</p>
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="mt-6">
//             <h2 className="text-xl font-semibold mb-2">Description</h2>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               {vehicleData.description || "No description available"}
//             </p>
//           </div>

//           {/* Chat & Call Buttons */}
//           <div className="mt-6 flex gap-3">
//             <button
//               onClick={() => setIsChatOpen(true)}
//               className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//             >
//               💬 Chat
//             </button>

//             <button
//               onClick={handleConfirmBooking}
//               className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//             >
//               📞 Call
//             </button>
//           </div>

//           {/* Popup Chat */}
//           <PopupChat
//             isOpen={isChatOpen}
//             onClose={() => setIsChatOpen(false)}
//             ownerName={vehicleData.contactName || "Owner"}
//             ownerAvatar={`https://ui-avatars.com/api/?name=${encodeURIComponent(
//               vehicleData.contactName || "Owner"
//             )}&background=6B7280&color=fff&size=48`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingHistory;





 
// interface VehicleData {
//   _id: string;
//   // Car fields
//   CarName?: string;
//   CarModel?: string;
//   CarNumber?: string;
//   Carseater?: string;
//   RentPerHour?: number;
//   RentPerDay?: number;
//   carImages?: string[];
//   fuelType?: string;
//   transmissionType?: string;
//   Ac_available?: boolean;
//   kmDriven?: number;
 
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import PopupChat from "../components/ui/PopupChat";
// import apiService from "../services/api.service";
 
// interface VehicleData {
//   _id: string;
//   // Car fields
//   CarName?: string;
//   CarModel?: string;
//   CarNumber?: string;
//   Carseater?: string;
//   RentPerHour?: number;
//   RentPerDay?: number;
//   carImages?: string[];
//   fuelType?: string;
//   transmissionType?: string;
//   Ac_available?: boolean;
//   kmDriven?: number;
 
//   // Bike fields
//   bikeName?: string;
//   bikeModel?: string;
//   bikeNumber?: string;
//   pricePerKm?: number;
//   bikeImages?: string[];
//   bikeCC?: string;
 
//   // Common fields
//   description?: string;
//   contactName?: string;
//   contactNumber?: string;
//   Available?: boolean;
//   pickupCity?: string;
//   pickupCityState?: string;
//   pickupArea?: string;
//   latitude?: string;
//   longitude?: string;
// }
 
// const BookingHistory: React.FC = () => {
//   const { vehicleId: urlVehicleId } = useParams<{ vehicleId: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
 
//   const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentImage, setCurrentImage] = useState(0);
//   const [isChatOpen, setIsChatOpen] = useState(false);
 
//   // Get data from navigation state
//   const passedVehicleData = location.state?.vehicleData;
//   const passedBooking = location.state?.booking;
//   const openContact = location.state?.openContact || false;
 
//   // ✅ FIXED: Better vehicle type detection
//   // Priority: 1. Passed vehicleData.vehicleType, 2. location.state.vehicleType, 3. Detect from data structure
//   const passedVehicleType =
//     passedVehicleData?.vehicleType ||
//     location.state?.vehicleType;
//  const vehicleType = passedVehicleType ||
//   (passedVehicleData?.CarName || passedVehicleData?.carImages || passedVehicleData?.RentPerHour ? "car" : "bike");
 
//   const vehicleId = urlVehicleId || passedVehicleData?._id || passedVehicleData?.id || passedBooking?.vehicleId;
 
//   console.log("🔍 BookingHistory - Vehicle Type:", vehicleType, "ID:", vehicleId);
 
//   // Auto-open chat if coming from MyBookings with openContact flag
//   useEffect(() => {
//     if (openContact && passedBooking) {
//       setIsChatOpen(true);
//     }
//   }, [openContact, passedBooking]);
 
//   // ✅ Fetch vehicle details using apiService
//   useEffect(() => {
//     if (!vehicleId) {
//       setError("No vehicle ID provided");
//       setLoading(false);
//       return;
//     }
 
//     const fetchVehicleDetails = async () => {
//       try {
//         setLoading(true);
//         console.log(`📡 Fetching ${vehicleType} details for ID:`, vehicleId);
 
//         let result;
//         if (vehicleType === "car") {
//           result = await apiService.car.getCarById(vehicleId);
//         } else {
//           result = await apiService.bike.getBikeById(vehicleId);
//         }
 
//         // Extract data safely
//         const payload = result?.data ?? result;
//         const data = payload?.car || payload?.bike || payload?.data || payload?.vehicle || payload;
 
//         if (!data || typeof data !== "object") {
//           throw new Error("Invalid vehicle response format");
//         }
 
//         console.log("✅ Vehicle fetched successfully:", data);
//         setVehicleData(data);
//         setError("");
//       } catch (err: any) {
//         console.error("❌ Error fetching vehicle details:", err);
//         const errorMessage = err?.response?.data?.message || err?.message || "Failed to load vehicle details";
//         setError(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     fetchVehicleDetails();
//   }, [vehicleId, vehicleType]);
 
//   // ✅ Call button action
//   const handleConfirmBooking = () => {
//     if (vehicleData?.contactNumber) {
//       window.location.href = `tel:${vehicleData.contactNumber}`;
//     } else {
//       alert("Contact number not available");
//     }
//   };
 
//   // Loading UI
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="animate-spin mx-auto mb-4" size={48} />
//           <p className="text-gray-600">Loading vehicle details...</p>
//         </div>
//       </div>
//     );
//   }
 
//   // Error UI
//   if (error || !vehicleData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 text-lg mb-4">{error || "Vehicle not found"}</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }
 
//   const isCar = vehicleType === "car" || !!vehicleData.CarName || !!vehicleData.carImages;
//   const vehicleImages = isCar
//     ? vehicleData.carImages || []
//     : vehicleData.bikeImages || [];
 
//   const displayName = isCar
//     ? vehicleData.CarName || passedBooking?.vehicleName || "Unknown Vehicle"
//     : vehicleData.bikeName || passedBooking?.vehicleName || "Unknown Bike";
 
//   const displayModel = isCar
//     ? vehicleData.CarModel || "N/A"
//     : vehicleData.bikeModel || "N/A";
 
//   const displayPrice = isCar
//     ? vehicleData.RentPerHour || passedBooking?.price || 0
//     : vehicleData.pricePerKm || passedBooking?.price || 0;
 
//   const priceUnit = isCar ? "/hr" : "/km";
 
//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center">
//       <div className="max-w-[900px] w-full bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row">
//         {/* Vehicle Image Carousel */}
//         <div className="relative w-full md:w-[409px] h-[309px] overflow-hidden rounded-xl shadow-md flex-shrink-0">
//           {vehicleImages.length > 0 ? (
//             <>
//               <img
//                 src={vehicleImages[currentImage]}
//                 alt={`${displayName} ${currentImage + 1}`}
//                 className="w-full h-full object-cover transition-all duration-500"
//                 onError={(e) => {
//                   e.currentTarget.src =
//                     "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
//                 }}
//               />
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                 {vehicleImages.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrentImage(idx)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                       idx === currentImage ? "bg-white scale-110" : "bg-gray-400"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </>
//           ) : (
//             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//               <span className="text-gray-400 text-lg">No Image Available</span>
//             </div>
//           )}
//         </div>
 
//         {/* Vehicle Info Section */}
//         <div className="flex flex-col ml-0 md:ml-6 mt-6 md:mt-0 flex-1">
//           <h1 className="text-3xl font-semibold">{displayName}</h1>
//           <p className="text-sm text-gray-500 mt-1">{displayModel}</p>
 
//           <div className="flex items-baseline mt-2">
//             <span className="text-3xl font-bold text-blue-600">₹{displayPrice}</span>
//             <span className="text-gray-500 ml-2 text-sm">{priceUnit}</span>
//           </div>
 
//           {/* Vehicle Stats */}
//           <div className="flex items-center mt-4 border border-gray-300 rounded-xl overflow-hidden">
//             {isCar ? (
//               <>
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   🚗 <p className="text-sm text-gray-700">{vehicleData.transmissionType || "Manual"}</p>
//                 </div>
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   👥 <p className="text-sm text-gray-700">{vehicleData.Carseater || "5"} Seater</p>
//                 </div>
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   ⛽ <p className="text-sm text-gray-700">{vehicleData.fuelType || "Petrol"}</p>
//                 </div>
//                 <div className="flex flex-col items-center px-4 py-3">
//                   ❄️ <p className="text-sm text-gray-700">{vehicleData.Ac_available ? "AC" : "Non-AC"}</p>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   🏍️ <p className="text-sm text-gray-700">Bike</p>
//                 </div>
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   ⛽ <p className="text-sm text-gray-700">Petrol</p>
//                 </div>
//                 <div className="flex flex-col items-center px-4 py-3">
//                   📍 <p className="text-sm text-gray-700">{vehicleData.pickupCity || "N/A"}</p>
//                 </div>
//               </>
//             )}
//           </div>
 
//           <div className="mt-6">
//             <h2 className="text-xl font-semibold mb-2">Description</h2>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               {vehicleData.description || "No description available"}
//             </p>
//           </div>
 
//           {/* Chat & Call Buttons */}
//           <div className="mt-6 flex gap-3">
//             <button
//               onClick={() => setIsChatOpen(true)}
//               className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//             >
//               💬 Chat
//             </button>
 
//             <button
//               onClick={handleConfirmBooking}
//               className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//             >
//               📞 Call
//             </button>
//           </div>
 
//           {/* Popup Chat */}
//           <PopupChat
//             isOpen={isChatOpen}
//             onClose={() => setIsChatOpen(false)}
//             ownerName={vehicleData.contactName || "Owner"}
//             ownerAvatar={`https://ui-avatars.com/api/?name=${encodeURIComponent(
//               vehicleData.contactName || "Owner"
//             )}&background=6B7280&color=fff&size=48`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default BookingHistory;
 







 




 
 
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import PopupChat from "../components/ui/PopupChat";
import apiService from "../services/api.service";
 
interface VehicleData {
  _id: string;
  // Car fields
  CarName?: string;
  CarModel?: string;
  CarNumber?: string;
  Carseater?: string;
  RentPerHour?: number;
  RentPerDay?: number;
  carImages?: string[];
  fuelType?: string;
  transmissionType?: string;
  Ac_available?: boolean;
  kmDriven?: number;
 
  // Bike fields
  bikeName?: string;
  bikeModel?: string;
  bikeNumber?: string;
  pricePerKm?: number;
  bikeImages?: string[];
  bikeCC?: string;
 
  // Common fields
  description?: string;
  contactName?: string;
  contactNumber?: string;
  Available?: boolean;
  pickupCity?: string;
  pickupCityState?: string;
  pickupArea?: string;
  latitude?: string;
  longitude?: string;
}
 
const BookingHistory: React.FC = () => {
  const { vehicleId: urlVehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
 
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
 
  // Get data from navigation state
  const passedVehicleData = location.state?.vehicleData;
  const passedBooking = location.state?.booking;
  const openContact = location.state?.openContact || false;
 
  // ✅ FIXED: Better vehicle type detection
  // Priority: 1. Passed vehicleData.vehicleType, 2. location.state.vehicleType, 3. Detect from data structure
  const passedVehicleType =
    passedVehicleData?.vehicleType ||
    location.state?.vehicleType;
 const vehicleType = passedVehicleType ||
  (passedVehicleData?.CarName || passedVehicleData?.carImages || passedVehicleData?.RentPerHour ? "car" : "bike");
 
  const vehicleId = urlVehicleId || passedVehicleData?._id || passedVehicleData?.id || passedBooking?.vehicleId;
 
  console.log("🔍 BookingHistory - Vehicle Type:", vehicleType, "ID:", vehicleId);
 
  // Auto-open chat if coming from MyBookings with openContact flag
  useEffect(() => {
    if (openContact && passedBooking) {
      setIsChatOpen(true);
    }
  }, [openContact, passedBooking]);
 
  // ✅ Fetch vehicle details using apiService
  useEffect(() => {
    if (!vehicleId) {
      setError("No vehicle ID provided");
      setLoading(false);
      return;
    }
 
    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        console.log(`📡 Fetching ${vehicleType} details for ID:`, vehicleId);
 
        let result;
        if (vehicleType === "car") {
          result = await apiService.car.getCarById(vehicleId);
        } else {
          result = await apiService.bike.getBikeById(vehicleId);
        }
 
        // Extract data safely
        const payload = result?.data ?? result;
        const data = payload?.car || payload?.bike || payload?.data || payload?.vehicle || payload;
 
        if (!data || typeof data !== "object") {
          throw new Error("Invalid vehicle response format");
        }
 
        console.log("✅ Vehicle fetched successfully:", data);
        setVehicleData(data);
        setError("");
      } catch (err: any) {
        console.error("❌ Error fetching vehicle details:", err);
        const errorMessage = err?.response?.data?.message || err?.message || "Failed to load vehicle details";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
 
    fetchVehicleDetails();
  }, [vehicleId, vehicleType]);
 
  // ✅ Call button action
  const handleConfirmBooking = () => {
    if (vehicleData?.contactNumber) {
      window.location.href = `tel:${vehicleData.contactNumber}`;
    } else {
      alert("Contact number not available");
    }
  };
 
  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading vehicle details...</p>
        </div>
      </div>
    );
  }
 
  // Error UI
  if (error || !vehicleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || "Vehicle not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
 
  const isCar = vehicleType === "car" || !!vehicleData.CarName || !!vehicleData.carImages;
  const vehicleImages = isCar
    ? vehicleData.carImages || []
    : vehicleData.bikeImages || [];
 
  const displayName = isCar
    ? vehicleData.CarName || passedBooking?.vehicleName || "Unknown Vehicle"
    : vehicleData.bikeName || passedBooking?.vehicleName || "Unknown Bike";
 
  const displayModel = isCar
    ? vehicleData.CarModel || "N/A"
    : vehicleData.bikeModel || "N/A";
 
  const displayPrice = isCar
    ? vehicleData.RentPerHour || passedBooking?.price || 0
    : vehicleData.pricePerKm || passedBooking?.price || 0;
 
  const priceUnit = isCar ? "/hr" : "/km";
 
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center">
      <div className="max-w-[900px] w-full bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row">
        {/* Vehicle Image Carousel */}
        <div className="relative w-full md:w-[409px] h-[309px] overflow-hidden rounded-xl shadow-md flex-shrink-0">
          {vehicleImages.length > 0 ? (
            <>
              <img
                src={vehicleImages[currentImage]}
                alt={`${displayName} ${currentImage + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {vehicleImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentImage ? "bg-white scale-110" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-lg">No Image Available</span>
            </div>
          )}
        </div>
 
        {/* Vehicle Info Section */}
        <div className="flex flex-col ml-0 md:ml-6 mt-6 md:mt-0 flex-1">
          <h1 className="text-3xl font-semibold">{displayName}</h1>
          <p className="text-sm text-gray-500 mt-1">{displayModel}</p>
 
          <div className="flex items-baseline mt-2">
            <span className="text-3xl font-bold text-blue-600">₹{displayPrice}</span>
            <span className="text-gray-500 ml-2 text-sm">{priceUnit}</span>
          </div>
 
          {/* Vehicle Stats */}
          <div className="flex items-center mt-4 border border-gray-300 rounded-xl overflow-hidden">
            {isCar ? (
              <>
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  🚗 <p className="text-sm text-gray-700">{vehicleData.transmissionType || "Manual"}</p>
                </div>
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  👥 <p className="text-sm text-gray-700">{vehicleData.Carseater || "5"} Seater</p>
                </div>
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  ⛽ <p className="text-sm text-gray-700">{vehicleData.fuelType || "Petrol"}</p>
                </div>
                <div className="flex flex-col items-center px-4 py-3">
                  ❄️ <p className="text-sm text-gray-700">{vehicleData.Ac_available ? "AC" : "Non-AC"}</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  🏍️ <p className="text-sm text-gray-700">Bike</p>
                </div>
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  ⛽ <p className="text-sm text-gray-700">Petrol</p>
                </div>
                <div className="flex flex-col items-center px-4 py-3">
                  📍 <p className="text-sm text-gray-700">{vehicleData.pickupCity || "N/A"}</p>
                </div>
              </>
            )}
          </div>
 
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {vehicleData.description || "No description available"}
            </p>
          </div>
 
          {/* Chat & Call Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setIsChatOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
            >
              💬 Chat
            </button>
 
            <button
              onClick={handleConfirmBooking}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
            >
              📞 Call
            </button>
          </div>
 
          {/* Popup Chat */}
 <PopupChat
  isOpen={isChatOpen}
  onClose={() => setIsChatOpen(false)}

  ownerName={vehicleData?.contactName || "Owner"}
  ownerAvatar={`https://ui-avatars.com/api/?name=${vehicleData?.contactName || "Owner"}`}

  recipientName="Customer"
  recipientImage="https://ui-avatars.com/api/?name=Customer"
/>


        </div>
      </div>
    </div>
  );
};
 
export default BookingHistory;
 