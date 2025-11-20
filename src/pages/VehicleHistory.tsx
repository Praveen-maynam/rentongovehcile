// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import apiService from "../services/api.service";
// import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
// import Petrol from "../assets/icons/Petrol.png";
// import Location from "../assets/icons/Location.png";
// import seats from "../assets/icons/seats.jpeg";
// import AClogo from "../assets/icons/ac.png";
// import BikeCC from "../assets/icons/BikeCC.png"; // ✅ Added missing import

// interface BookingHistory {
//   _id?: string;
//   customerName?: string;
//   contactName?: string;
//   startDate?: string;
//   FromDate?: string;
//   startTime?: string;
//   FromTime?: string;
//   endDate?: string;
//   ToDate?: string;
//   endTime?: string;
//   ToTime?: string;
//   mobile?: string;
//   contactNumber?: string;
//   status?: "Booked" | "Picked" | "Completed" | "Pending" | "Cancelled";
//   userId?: string;
//   VechileId?: string;
//   totalPrice?: number;
// }

// interface VehicleData {
//   _id: string;
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
//   bikeName?: string;
//   bikeModel?: string;
//   bikeNumber?: string;
//   pricePerKm?: number;
//   bikeImages?: string[];
//   bikeEngine?: string; // ✅ Added for bike engine capacity
//   bikeCC?: string; // ✅ Alternative field name
//   engineCapacity?: string; // ✅ Added missing field
//   transmission?: string; // ✅ Added for bike transmission
//   Transmission?: string; // ✅ Alternative field name
//   fuel?: string; // ✅ Added for bike fuel
//   Fuel?: string; // ✅ Alternative field name
//   description?: string;
//   contactName?: string;
//   contactNumber?: string;
//   Available?: boolean;
//   pickupCity?: string;
//   pickupCityState?: string;
//   pickupArea?: string;
// }

// const VehicleHistory: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { vehicleId } = useParams<{ vehicleId: string }>();

//   const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
//   const [bookingHistory, setBookingHistory] = useState<BookingHistory[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [bookingError, setBookingError] = useState("");
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const passedVehicleData = location.state?.vehicleData;
//   const passedVehicleType = location.state?.vehicleType;

//   const vehicleType = 
//     passedVehicleType || 
//     (passedVehicleData?.CarName || passedVehicleData?.carImages ? "car" : "bike");

//   const finalVehicleId = vehicleId || passedVehicleData?._id || passedVehicleData?.id;

//   useEffect(() => {
//     if (!finalVehicleId) {
//       setError("No vehicle ID provided");
//       setLoading(false);
//       return;
//     }

//     const fetchVehicleDetails = async () => {
//       try {
//         setLoading(true);
//         console.log(`📡 Fetching ${vehicleType} details for ID:`, finalVehicleId);

//         const response =
//           vehicleType === "car"
//             ? await apiService.car.getCarById(finalVehicleId)
//             : await apiService.bike.getBikeById(finalVehicleId);

//         const payload = response?.data ?? response;
//         const vehicle =
//           payload?.car ||
//           payload?.bike ||
//           payload?.data ||
//           payload?.vehicle ||
//           payload;

//         if (!vehicle || typeof vehicle !== "object") {
//           throw new Error("Invalid vehicle response format");
//         }

//         console.log("✅ Vehicle fetched successfully:", vehicle);
//         setVehicleData(vehicle);
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
//   }, [finalVehicleId, vehicleType]);

//   useEffect(() => {
//     if (!finalVehicleId || !vehicleData) {
//       setBookingLoading(false);
//       return;
//     }

//     const fetchBookingHistory = async () => {
//       try {
//         setBookingLoading(true);
//         console.log(`📡 Fetching all bookings to filter for vehicle ID:`, finalVehicleId);

//         const ownerId = localStorage.getItem('userId') || vehicleData.contactNumber;
        
//         if (!ownerId) {
//           console.warn("⚠️ No owner ID found, cannot fetch bookings");
//           setBookingHistory([]);
//           setBookingLoading(false);
//           return;
//         }

//         const response = await apiService.booking.getAllBookings(ownerId);
        
//         console.log("📦 Raw booking response:", response);

//         const payload = response?.data ?? response;
//         let allBookings = payload?.bookings || payload?.data || payload || [];
        
//         if (!Array.isArray(allBookings)) {
//           allBookings = [];
//         }

//         console.log("📋 All bookings:", allBookings);

//         const vehicleBookings = allBookings.filter((booking: any) => {
//           const bookingVehicleId = booking.VechileId || booking.vehicleId || booking.VehicleId;
//           return bookingVehicleId === finalVehicleId;
//         });

//         console.log("✅ Filtered bookings for this vehicle:", vehicleBookings);

//         const transformedBookings = vehicleBookings.map((booking: any) => ({
//           _id: booking._id,
//           customerName: booking.contactName || booking.customerName || "Unknown Customer",
//           contactName: booking.contactName,
//           startDate: booking.FromDate ? new Date(booking.FromDate).toLocaleDateString('en-GB') : booking.startDate,
//           FromDate: booking.FromDate,
//           startTime: booking.FromTime?.replace('.', ':') || booking.startTime || "N/A",
//           FromTime: booking.FromTime,
//           endDate: booking.ToDate ? new Date(booking.ToDate).toLocaleDateString('en-GB') : booking.endDate,
//           ToDate: booking.ToDate,
//           endTime: booking.ToTime?.replace('.', ':') || booking.endTime || "N/A",
//           ToTime: booking.ToTime,
//           mobile: booking.contactNumber || booking.mobile || "N/A",
//           contactNumber: booking.contactNumber,
//           status: booking.status === "Pending" ? "Booked" : (booking.status || "Booked") as any,
//           userId: booking.userId,
//           VechileId: booking.VechileId,
//           totalPrice: booking.totalPrice,
//         }));

//         setBookingHistory(transformedBookings);
//         setBookingError("");
//       } catch (err: any) {
//         console.error("❌ Error fetching booking history:", err);
//         const errorMessage = err?.response?.data?.message || err?.message || "Failed to load booking history";
//         setBookingError(errorMessage);
//         setBookingHistory([]);
//       } finally {
//         setBookingLoading(false);
//       }
//     };

//     fetchBookingHistory();
//   }, [finalVehicleId, vehicleData]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="bg-white p-6 rounded-lg">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-700 font-medium">Loading vehicle details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !vehicleData) {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center justify-center">
//         <p className="text-red-600 text-lg mb-4">{error || "Vehicle not found"}</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const isCar = !!vehicleData.CarName || !!vehicleData.carImages || vehicleType === "car";

//   let vehicleImages = (isCar ? vehicleData.carImages : vehicleData.bikeImages) || [];
//   vehicleImages = vehicleImages.filter((img) => img && img.trim() !== "" && img !== "undefined");

//   const carDummyImages = [
//     "https://e7.pngegg.com/pngimages/768/421/png-clipart-car-computer-icons-sedan-auto-detailing-auto-driving-rectangle-thumbnail.png",
//    "https://png.pngtree.com/png-vector/20191201/ourmid/pngtree-car-vector-logo-design-png-image_2066853.jpg"
//   ];

//   const bikeDummyImages = [
//     "https://w7.pngwing.com/pngs/579/51/png-transparent-computer-icons-motorcycle-bicycle-motorcycle-logo-black-silhouette.png",
//     "https://w1.pngwing.com/pngs/381/835/png-transparent-yamaha-logo-car-decal-motorcycle-sticker-sport-bike-yamaha-yzfr1-bicycle-thumbnail.png"
//   ];

//   const dummyImages = isCar ? carDummyImages : bikeDummyImages;

//   if (vehicleImages.length === 0) {
//     vehicleImages = dummyImages;
//   }

//   const carouselImages = [...vehicleImages];
//   while (carouselImages.length < 3) {
//     carouselImages.push(dummyImages[carouselImages.length % dummyImages.length]);
//   }

//   const displayName = isCar
//     ? `${vehicleData.CarName || "Unknown"} ${vehicleData.CarModel || ""}`.trim()
//     : `${vehicleData.bikeName || "Unknown"} ${vehicleData.bikeModel || ""}`.trim();

//   const displayPrice = isCar
//     ? vehicleData.RentPerHour || 0
//     : vehicleData.pricePerKm || 0;

//   const handleBookingClick = (booking: BookingHistory) => {
//     navigate(`/booking-details/${booking._id}`, {
//       state: { booking, vehicleData },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-white px-4 sm:px-6 py-6 sm:py-10">
//       <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
//         {/* LEFT SECTION - Main Content */}
//         <div className="flex-1 bg-white">
//           <div className="flex flex-col md:flex-row gap-6 mb-6">
//             {/* Image Card */}
//             <div className="relative w-300px md:w-[420px] h-[300px] flex-shrink-0 cursor-pointer rounded-[10px] overflow-hidden border-2 border-transparent hover:border-[#0066FF] transition-all duration-200">
//               <img
//                 src={carouselImages[currentImageIndex]}
//                 alt={displayName}
//                 className="w-full h-full object-cover transition-all duration-500"
//               />

//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
//                 {carouselImages.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrentImageIndex(idx)}
//                     className={`h-2 rounded-full transition-all ${
//                       idx === currentImageIndex 
//                         ? "bg-[#0066FF] w-6" 
//                         : "bg-white/60 w-2"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Right Side Details */}
//             <div className="flex-1 min-w-0">
//               <div className="flex items-start justify-between gap-4 mb-1">
//                 <div className="flex-1 min-w-0">
//                   <h1 
//                     className="text-[32px] font-bold text-[#000000] leading-tight cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all"
//                     style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
//                   >
//                     {displayName}
//                   </h1>
//                 </div>
//                 <div className="bg-[#FFF9E6] px-2.5 py-1 rounded-md flex items-center gap-1 flex-shrink-0">
//                   <span className="text-[#FFB800] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>★</span>
//                   <span className="text-sm font-semibold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif' }}>4.2</span>
//                 </div>
//               </div>

//               <div className="flex items-baseline gap-1 mb-3 w-fit cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all">
//                 <span className="text-[32px] font-bold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
//                   ₹{displayPrice}
//                 </span>
//                 <span className="text-base text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>
//                   /{isCar ? 'hr' : 'km'}
//                 </span>
//               </div>

//               {/* Specs Card */}
//               <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden bg-white mb-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200">
//                 <div className="flex items-center gap-0">
//                   {isCar ? (
//                     <>
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={AutomaticLogo} className="w-6 h-6 mb-1.5" alt="transmission" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.transmissionType || "Manual"}
//                         </span>
//                       </div>
                      
//                       <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={seats} className="w-6 h-6 mb-1.5" alt="seats" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.Carseater || "5"} Seaters
//                         </span>
//                       </div>
                      
//                       <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={Petrol} className="w-6 h-6 mb-1.5" alt="fuel" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.fuelType || "Petrol"}
//                         </span>
//                       </div>
                      
//                       <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={AClogo} className="w-6 h-6 mb-1.5" alt="ac" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.Ac_available ? "AC" : "Non-AC"}
//                         </span>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       {/* ✅ FIXED: Bike specifications with proper variable names */}
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={BikeCC} className="w-6 h-6 mb-1.5" alt="engine" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.engineCapacity || vehicleData.bikeEngine || vehicleData.bikeCC || "350"} CC
//                         </span>
//                       </div>
                      
//                       <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={AutomaticLogo} className="w-6 h-6 mb-1.5" alt="transmission" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.transmission || vehicleData.Transmission || "Manual"}
//                         </span>
//                       </div>
                      
//                       <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={Petrol} className="w-6 h-6 mb-1.5" alt="fuel" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.fuel || vehicleData.Fuel || "Petrol"}
//                         </span>
//                       </div>
                      
//                       <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={Location} className="w-6 h-6 mb-1.5" alt="location" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.pickupCity || vehicleData.pickupArea || "N/A"}
//                         </span>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Description Card */}
//               <div className="border border-[#E5E5E5] rounded-[10px] p-4 bg-white mb-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200 w-full max-w-full">
//                 <h2 className="text-[18px] font-bold text-[#000000] mb-2 cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
//                   Description
//                 </h2>
//                 <p className="text-[#666666] text-[14px] leading-[1.6] min-h-[40px] break-words whitespace-normal overflow-hidden" style={{ fontFamily: 'Inter, sans-serif', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
//                   {vehicleData.description || "No description available"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SECTION - Booking History Sidebar */}
//         <aside className="md:w-[380px]">
//           <div className="sticky top-6 bg-white p-6 rounded-[12px] shadow-lg border border-[#E5E5E5]">
//             <h2 className="text-[20px] font-semibold text-[#000000] mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
//               Booking History
//             </h2>

//             {bookingLoading ? (
//               <div className="flex flex-col items-center justify-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
//                 <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Loading bookings...</p>
//               </div>
//             ) : bookingError ? (
//               <div className="text-center py-8 px-4 bg-[#FFF5F5] rounded-[8px] border border-[#FEE]">
//                 <p className="text-[14px] text-[#DC2626] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{bookingError}</p>
//                 <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Unable to load booking history</p>
//               </div>
//             ) : bookingHistory.length === 0 ? (
//               <div className="text-center py-8 px-4 bg-[#F8F9FA] rounded-[8px] border border-[#E5E5E5]">
//                 <div className="text-4xl mb-3">📋</div>
//                 <p className="text-[16px] font-medium text-[#333333] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>No bookings yet</p>
//                 <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>This vehicle hasn't been booked</p>
//               </div>
//             ) : (
//               <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E5E5 transparent' }}>
//                 {bookingHistory.map((booking, idx) => (
//                   <div
//                     key={booking._id || idx}
//                     onClick={() => handleBookingClick(booking)}
//                     className="border border-[#E5E5E5] rounded-[10px] p-4 hover:border-[#0066FF] hover:border-2 transition-all duration-200 cursor-pointer bg-white relative"
//                   >
//                     {/* Customer Name */}
//                     <div className="flex items-center gap-2 mb-3">
//                       <span className="text-[16px]">👤</span>
//                       <h3 className="text-[16px] font-semibold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
//                         {booking.customerName || booking.contactName}
//                       </h3>
//                       <button className="ml-auto text-[#666666] hover:text-[#000000]">
//                         <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//                           <circle cx="10" cy="5" r="1.5" fill="currentColor"/>
//                           <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
//                           <circle cx="10" cy="15" r="1.5" fill="currentColor"/>
//                         </svg>
//                       </button>
//                     </div>

//                     {/* Dates */}
//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="text-[14px]">📅</span>
//                       <div className="flex items-center gap-2">
//                         <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           From: <span className="font-medium">{booking.startDate}</span>
//                         </span>
//                         <span className="text-[13px] text-[#666666]">•</span>
//                         <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           To: <span className="font-medium">{booking.endDate}</span>
//                         </span>
//                       </div>
//                     </div>

//                     {/* Time */}
//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="text-[14px]">🕐</span>
//                       <div className="flex items-center gap-2">
//                         <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           From: <span className="font-medium">{booking.startTime}</span>
//                         </span>
//                         <span className="text-[13px] text-[#666666]">•</span>
//                         <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           To: <span className="font-medium">{booking.endTime}</span>
//                         </span>
//                       </div>
//                     </div>

//                     {/* Mobile */}
//                     <div className="flex items-center gap-2 mb-3">
//                       <span className="text-[14px]">📱</span>
//                       <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
//                         Mobile No: <span className="font-medium">{booking.mobile}</span>
//                       </span>
//                     </div>

//                     {/* Status and Price */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <span className="text-[13px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Status:</span>
//                         <span 
//                           className={`inline-block px-3 py-1 rounded-md text-[12px] font-medium ${
//                             booking.status === "Completed"
//                               ? "bg-[#E8F5E9] text-[#2E7D32]"
//                               : booking.status === "Picked"
//                               ? "bg-[#E3F2FD] text-[#1565C0]"
//                               : "bg-[#FFF9E6] text-[#F57C00]"
//                           }`}
//                           style={{ fontFamily: 'Inter, sans-serif' }}
//                         >
//                           {booking.status}
//                         </span>
//                       </div>
//                       {booking.totalPrice && (
//                         <span className="text-[14px] font-semibold text-[#0066FF]" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           ₹{booking.totalPrice}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default VehicleHistory;










// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import apiService from "../services/api.service";
// import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
// import Petrol from "../assets/icons/Petrol.png";
// import Location from "../assets/icons/Location.png";
// import seats from "../assets/icons/seats.jpeg";
// import AClogo from "../assets/icons/ac.png";
// import BikeCC from "../assets/icons/BikeCC.png"; // ✅ Added missing import

// interface BookingHistory {
//   _id?: string;
//   customerName?: string;
//   contactName?: string;
//   startDate?: string;
//   FromDate?: string;
//   startTime?: string;
//   FromTime?: string;
//   endDate?: string;
//   ToDate?: string;
//   endTime?: string;
//   ToTime?: string;
//   mobile?: string;
//   contactNumber?: string;
//   status?: "Booked" | "Picked" | "Completed" | "Pending" | "Cancelled";
//   userId?: string;
//   VechileId?: string;
//   totalPrice?: number;
// }

// interface VehicleData {
//   _id: string;
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
//   bikeName?: string;
//   bikeModel?: string;
//   bikeNumber?: string;
//   pricePerKm?: number;
//   bikeImages?: string[];
//   bikeEngine?: string; // ✅ Added for bike engine capacity
//   bikeCC?: string; // ✅ Alternative field name
//   engineCapacity?: string; // ✅ Added missing field
//   transmission?: string; // ✅ Added for bike transmission
//   Transmission?: string; // ✅ Alternative field name
//   fuel?: string; // ✅ Added for bike fuel
//   Fuel?: string; // ✅ Alternative field name
//   description?: string;
//   contactName?: string;
//   contactNumber?: string;
//   Available?: boolean;
//   pickupCity?: string;
//   pickupCityState?: string;
//   pickupArea?: string;
// }

// const VehicleHistory: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { vehicleId } = useParams<{ vehicleId: string }>();

//   const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
//   const [bookingHistory, setBookingHistory] = useState<BookingHistory[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [bookingError, setBookingError] = useState("");
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const passedVehicleData = location.state?.vehicleData;
//   const passedVehicleType = location.state?.vehicleType;

//   const vehicleType = 
//     passedVehicleType || 
//     (passedVehicleData?.CarName || passedVehicleData?.carImages ? "car" : "bike");

//   const finalVehicleId = vehicleId || passedVehicleData?._id || passedVehicleData?.id;

//   useEffect(() => {
//     if (!finalVehicleId) {
//       setError("No vehicle ID provided");
//       setLoading(false);
//       return;
//     }

//     const fetchVehicleDetails = async () => {
//       try {
//         setLoading(true);
//         console.log(`📡 Fetching ${vehicleType} details for ID:`, finalVehicleId);

//         const response =
//           vehicleType === "car"
//             ? await apiService.car.getCarById(finalVehicleId)
//             : await apiService.bike.getBikeById(finalVehicleId);

//         const payload = response?.data ?? response;
//         const vehicle =
//           payload?.car ||
//           payload?.bike ||
//           payload?.data ||
//           payload?.vehicle ||
//           payload;

//         if (!vehicle || typeof vehicle !== "object") {
//           throw new Error("Invalid vehicle response format");
//         }

//         console.log("✅ Vehicle fetched successfully:", vehicle);
//         setVehicleData(vehicle);
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
//   }, [finalVehicleId, vehicleType]);

//   useEffect(() => {
//     if (!finalVehicleId || !vehicleData) {
//       setBookingLoading(false);
//       return;
//     }

//     const fetchBookingHistory = async () => {
//       try {
//         setBookingLoading(true);
//         console.log(`📡 Fetching all bookings to filter for vehicle ID:`, finalVehicleId);

//         const ownerId = localStorage.getItem('userId') || vehicleData.contactNumber;
        
//         if (!ownerId) {
//           console.warn("⚠️ No owner ID found, cannot fetch bookings");
//           setBookingHistory([]);
//           setBookingLoading(false);
//           return;
//         }

//         const response = await apiService.booking.getAllBookings(ownerId);
        
//         console.log("📦 Raw booking response:", response);

//         const payload = response?.data ?? response;
//         let allBookings = payload?.bookings || payload?.data || payload || [];
        
//         if (!Array.isArray(allBookings)) {
//           allBookings = [];
//         }

//         console.log("📋 All bookings:", allBookings);

//         const vehicleBookings = allBookings.filter((booking: any) => {
//           const bookingVehicleId = booking.VechileId || booking.vehicleId || booking.VehicleId;
//           return bookingVehicleId === finalVehicleId;
//         });

//         console.log("✅ Filtered bookings for this vehicle:", vehicleBookings);

//         const transformedBookings = vehicleBookings.map((booking: any) => ({
//           _id: booking._id,
//           customerName: booking.contactName || booking.customerName || "Unknown Customer",
//           contactName: booking.contactName,
//           startDate: booking.FromDate ? new Date(booking.FromDate).toLocaleDateString('en-GB') : booking.startDate,
//           FromDate: booking.FromDate,
//           startTime: booking.FromTime?.replace('.', ':') || booking.startTime || "N/A",
//           FromTime: booking.FromTime,
//           endDate: booking.ToDate ? new Date(booking.ToDate).toLocaleDateString('en-GB') : booking.endDate,
//           ToDate: booking.ToDate,
//           endTime: booking.ToTime?.replace('.', ':') || booking.endTime || "N/A",
//           ToTime: booking.ToTime,
//           mobile: booking.contactNumber || booking.mobile || "N/A",
//           contactNumber: booking.contactNumber,
//           status: booking.status === "Pending" ? "Booked" : (booking.status || "Booked") as any,
//           userId: booking.userId,
//           VechileId: booking.VechileId,
//           totalPrice: booking.totalPrice,
//         }));

//         setBookingHistory(transformedBookings);
//         setBookingError("");
//       } catch (err: any) {
//         console.error("❌ Error fetching booking history:", err);
//         const errorMessage = err?.response?.data?.message || err?.message || "Failed to load booking history";
//         setBookingError(errorMessage);
//         setBookingHistory([]);
//       } finally {
//         setBookingLoading(false);
//       }
//     };

//     fetchBookingHistory();
//   }, [finalVehicleId, vehicleData]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="bg-white p-6 rounded-lg">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-700 font-medium">Loading vehicle details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !vehicleData) {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center justify-center">
//         <p className="text-red-600 text-lg mb-4">{error || "Vehicle not found"}</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const isCar = !!vehicleData.CarName || !!vehicleData.carImages || vehicleType === "car";

//   let vehicleImages = (isCar ? vehicleData.carImages : vehicleData.bikeImages) || [];
//   vehicleImages = vehicleImages.filter((img) => img && img.trim() !== "" && img !== "undefined");

//   const carDummyImages = [
//     "https://e7.pngegg.com/pngimages/768/421/png-clipart-car-computer-icons-sedan-auto-detailing-auto-driving-rectangle-thumbnail.png",
//    "https://png.pngtree.com/png-vector/20191201/ourmid/pngtree-car-vector-logo-design-png-image_2066853.jpg"
//   ];

//   const bikeDummyImages = [
//     "https://w7.pngwing.com/pngs/579/51/png-transparent-computer-icons-motorcycle-bicycle-motorcycle-logo-black-silhouette.png",
//     "https://w1.pngwing.com/pngs/381/835/png-transparent-yamaha-logo-car-decal-motorcycle-sticker-sport-bike-yamaha-yzfr1-bicycle-thumbnail.png"
//   ];

//   const dummyImages = isCar ? carDummyImages : bikeDummyImages;

//   if (vehicleImages.length === 0) {
//     vehicleImages = dummyImages;
//   }

//   const carouselImages = [...vehicleImages];
//   while (carouselImages.length < 3) {
//     carouselImages.push(dummyImages[carouselImages.length % dummyImages.length]);
//   }

//   const displayName = isCar
//     ? `${vehicleData.CarName || "Unknown"} ${vehicleData.CarModel || ""}`.trim()
//     : `${vehicleData.bikeName || "Unknown"} ${vehicleData.bikeModel || ""}`.trim();

//   const displayPrice = isCar
//     ? vehicleData.RentPerHour || 0
//     : vehicleData.pricePerKm || 0;

//   const handleBookingClick = (booking: BookingHistory) => {
//     navigate(`/booking-details/${booking._id}`, {
//       state: { booking, vehicleData },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-white px-4 sm:px-6 py-6 sm:py-10">
//       <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
//         {/* LEFT SECTION - Main Content */}
//         <div className="flex-1 bg-white">
//           <div className="flex flex-col md:flex-row gap-6 mb-6">
//             {/* Image Card */}
//             <div className="relative w-300px md:w-[420px] h-[300px] flex-shrink-0 cursor-pointer rounded-[10px] overflow-hidden border-2 border-transparent hover:border-[#0066FF] transition-all duration-200">
//               <img
//                 src={carouselImages[currentImageIndex]}
//                 alt={displayName}
//                 className="w-full h-full object-cover transition-all duration-500"
//               />

//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
//                 {carouselImages.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrentImageIndex(idx)}
//                     className={`h-2 rounded-full transition-all ${
//                       idx === currentImageIndex 
//                         ? "bg-[#0066FF] w-6" 
//                         : "bg-white/60 w-2"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Right Side Details */}
//             <div className="flex-1 min-w-0">
//               <div className="flex items-start justify-between gap-4 mb-1">
//                 <div className="flex-1 min-w-0">
//                   <h1 
//                     className="text-[32px] font-bold text-[#000000] leading-tight cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all"
//                     style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
//                   >
//                     {displayName}
//                   </h1>
//                 </div>
//                 <div className="bg-[#FFF9E6] px-2.5 py-1 rounded-md flex items-center gap-1 flex-shrink-0">
//                   <span className="text-[#FFB800] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>★</span>
//                   <span className="text-sm font-semibold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif' }}>4.2</span>
//                 </div>
//               </div>

//               <div className="flex items-baseline gap-1 mb-3 w-fit cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all">
//                 <span className="text-[32px] font-bold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
//                   ₹{displayPrice}
//                 </span>
//                 <span className="text-base text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>
//                   /{isCar ? 'hr' : 'km'}
//                 </span>
//               </div>

//               {/* Specs Card */}
//               <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden bg-white mb-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200">
//                 <div className="flex items-center gap-0">
//                   {isCar ? (
//                     <>
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={AutomaticLogo} className="w-6 h-6 mb-1.5" alt="transmission" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.transmissionType || "Manual"}
//                         </span>
//                       </div>
                      
//                       <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={seats} className="w-6 h-6 mb-1.5" alt="seats" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.Carseater || "5"} Seaters
//                         </span>
//                       </div>
                      
//                       <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={Petrol} className="w-6 h-6 mb-1.5" alt="fuel" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.fuelType || "Petrol"}
//                         </span>
//                       </div>
                      
//                       <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={AClogo} className="w-6 h-6 mb-1.5" alt="ac" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.Ac_available ? "AC" : "Non-AC"}
//                         </span>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       {/* ✅ FIXED: Bike specifications with proper variable names */}
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={BikeCC} className="w-6 h-6 mb-1.5" alt="engine" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.engineCapacity || vehicleData.bikeEngine || vehicleData.bikeCC || "350"} CC
//                         </span>
//                       </div>
                      
//                       <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={AutomaticLogo} className="w-6 h-6 mb-1.5" alt="transmission" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.transmission || vehicleData.Transmission || "Manual"}
//                         </span>
//                       </div>
                      
//                       <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={Petrol} className="w-6 h-6 mb-1.5" alt="fuel" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.fuel || vehicleData.Fuel || "Petrol"}
//                         </span>
//                       </div>
                      
//                       <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
//                       <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
//                         <img src={Location} className="w-6 h-6 mb-1.5" alt="location" />
//                         <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           {vehicleData.pickupCity || vehicleData.pickupArea || "N/A"}
//                         </span>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Description Card */}
//               <div className="border border-[#E5E5E5] rounded-[10px] p-4 bg-white mb-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200 w-full max-w-full">
//                 <h2 className="text-[18px] font-bold text-[#000000] mb-2 cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
//                   Description
//                 </h2>
//                 <p className="text-[#666666] text-[14px] leading-[1.6] min-h-[40px] break-words whitespace-normal overflow-hidden" style={{ fontFamily: 'Inter, sans-serif', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
//                   {vehicleData.description || "No description available"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SECTION - Booking History Sidebar */}
//         <aside className="md:w-[380px]">
//           <div className="sticky top-6 bg-white p-6 rounded-[12px] shadow-lg border border-[#E5E5E5]">
//             <h2 className="text-[20px] font-semibold text-[#000000] mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
//               Booking History
//             </h2>

//             {bookingLoading ? (
//               <div className="flex flex-col items-center justify-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
//                 <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Loading bookings...</p>
//               </div>
//             ) : bookingError ? (
//               <div className="text-center py-8 px-4 bg-[#FFF5F5] rounded-[8px] border border-[#FEE]">
//                 <p className="text-[14px] text-[#DC2626] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{bookingError}</p>
//                 <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Unable to load booking history</p>
//               </div>
//             ) : bookingHistory.length === 0 ? (
//               <div className="text-center py-8 px-4 bg-[#F8F9FA] rounded-[8px] border border-[#E5E5E5]">
//                 <div className="text-4xl mb-3">📋</div>
//                 <p className="text-[16px] font-medium text-[#333333] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>No bookings yet</p>
//                 <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>This vehicle hasn't been booked</p>
//               </div>
//             ) : (
//               <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E5E5 transparent' }}>
//                 {bookingHistory.map((booking, idx) => (
//                   <div
//                     key={booking._id || idx}
//                     onClick={() => handleBookingClick(booking)}
//                     className="border border-[#E5E5E5] rounded-[10px] p-4 hover:border-[#0066FF] hover:border-2 transition-all duration-200 cursor-pointer bg-white relative"
//                   >
//                     {/* Customer Name */}
//                     <div className="flex items-center gap-2 mb-3">
//                       <span className="text-[16px]">👤</span>
//                       <h3 className="text-[16px] font-semibold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
//                         {booking.customerName || booking.contactName}
//                       </h3>
//                       <button className="ml-auto text-[#666666] hover:text-[#000000]">
//                         <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//                           <circle cx="10" cy="5" r="1.5" fill="currentColor"/>
//                           <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
//                           <circle cx="10" cy="15" r="1.5" fill="currentColor"/>
//                         </svg>
//                       </button>
//                     </div>

//                     {/* Dates */}
//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="text-[14px]">📅</span>
//                       <div className="flex items-center gap-2">
//                         <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           From: <span className="font-medium">{booking.startDate}</span>
//                         </span>
//                         <span className="text-[13px] text-[#666666]">•</span>
//                         <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           To: <span className="font-medium">{booking.endDate}</span>
//                         </span>
//                       </div>
//                     </div>

//                     {/* Time */}
//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="text-[14px]">🕐</span>
//                       <div className="flex items-center gap-2">
//                         <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           From: <span className="font-medium">{booking.startTime}</span>
//                         </span>
//                         <span className="text-[13px] text-[#666666]">•</span>
//                         <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           To: <span className="font-medium">{booking.endTime}</span>
//                         </span>
//                       </div>
//                     </div>

//                     {/* Mobile */}
//                     <div className="flex items-center gap-2 mb-3">
//                       <span className="text-[14px]">📱</span>
//                       <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
//                         Mobile No: <span className="font-medium">{booking.mobile}</span>
//                       </span>
//                     </div>

//                     {/* Status and Price */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <span className="text-[13px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Status:</span>
//                         <span 
//                           className={`inline-block px-3 py-1 rounded-md text-[12px] font-medium ${
//                             booking.status === "Completed"
//                               ? "bg-[#E8F5E9] text-[#2E7D32]"
//                               : booking.status === "Picked"
//                               ? "bg-[#E3F2FD] text-[#1565C0]"
//                               : "bg-[#FFF9E6] text-[#F57C00]"
//                           }`}
//                           style={{ fontFamily: 'Inter, sans-serif' }}
//                         >
//                           {booking.status}
//                         </span>
//                       </div>
//                       {booking.totalPrice && (
//                         <span className="text-[14px] font-semibold text-[#0066FF]" style={{ fontFamily: 'Inter, sans-serif' }}>
//                           ₹{booking.totalPrice}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default VehicleHistory;
















import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import apiService from "../services/api.service";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import Petrol from "../assets/icons/Petrol.png";
import Location from "../assets/icons/Location.png";
import seats from "../assets/icons/seats.jpeg";
import AClogo from "../assets/icons/ac.png";
import BikeCC from "../assets/icons/BikeCC.png";

interface BookingHistory {
  _id?: string;
  customerName?: string;
  contactName?: string;
  startDate?: string;
  FromDate?: string;
  startTime?: string;
  FromTime?: string;
  endDate?: string;
  ToDate?: string;
  endTime?: string;
  ToTime?: string;
  mobile?: string;
  contactNumber?: string;
  status?: "Booked" | "Picked" | "Completed" | "Pending" | "Cancelled";
  userId?: string;
  VechileId?: string;
  totalPrice?: number;
}

interface VehicleData {
  _id: string;
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
  bikeName?: string;
  bikeModel?: string;
  bikeNumber?: string;
  pricePerKm?: number;
  bikeImages?: string[];
  bikeEngine?: string;
  bikeCC?: string;
  engineCapacity?: string;
  transmission?: string;
  Transmission?: string;
  fuel?: string;
  Fuel?: string;
  description?: string;
  contactName?: string;
  contactNumber?: string;
  Available?: boolean;
  pickupCity?: string;
  pickupCityState?: string;
  pickupArea?: string;
  bookings?: BookingHistory[];
}

const VehicleHistory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicleId } = useParams<{ vehicleId: string }>();

  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [bookingHistory, setBookingHistory] = useState<BookingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const passedVehicleData = location.state?.vehicleData;
  const passedVehicleType = location.state?.vehicleType;

  const vehicleType = 
    passedVehicleType || 
    (passedVehicleData?.CarName || passedVehicleData?.carImages ? "car" : "bike");

  const finalVehicleId = vehicleId || passedVehicleData?._id || passedVehicleData?.id;

  useEffect(() => {
    if (!finalVehicleId) {
      setError("No vehicle ID provided");
      setLoading(false);
      return;
    }

    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        console.log(`📡 Fetching ${vehicleType} details for ID:`, finalVehicleId);

        const response =
          vehicleType === "car"
            ? await apiService.car.getCarById(finalVehicleId)
            : await apiService.bike.getBikeById(finalVehicleId);

        const payload = response?.data ?? response;
        const vehicle =
          payload?.car ||
          payload?.bike ||
          payload?.data ||
          payload?.vehicle ||
          payload;

        if (!vehicle || typeof vehicle !== "object") {
          throw new Error("Invalid vehicle response format");
        }

        console.log("✅ Vehicle fetched successfully:", vehicle);
        setVehicleData(vehicle);
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
  }, [finalVehicleId, vehicleType]);

  useEffect(() => {
    if (!finalVehicleId || !vehicleData) {
      setBookingLoading(false);
      return;
    }

    const fetchBookingHistory = async () => {
      try {
        setBookingLoading(true);
        console.log(`📡 Fetching bookings for vehicle ID: ${finalVehicleId}`);

        const ownerId = localStorage.getItem('userId') || vehicleData.contactNumber;
        
        if (!ownerId) {
          console.warn("⚠️ No owner ID found, cannot fetch bookings");
          setBookingHistory([]);
          setBookingLoading(false);
          return;
        }

        // Updated API call to use myVehicleBookings endpoint
        const vehicleTypeParam = vehicleType === "car" ? "Car" : "Bike";
        const apiUrl = `http://3.110.122.127:3000/myVehicleBookings/${ownerId}?vechileType=${vehicleTypeParam}&VechileId=${finalVehicleId}`;
        
        console.log(`🔗 API URL: ${apiUrl}`);

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("📦 Raw booking response:", data);

        // ✅ FIXED: Access bookings from the nested vehicle object
        let vehicleBookings: any[] = [];
        
        if (data?.data) {
          // Check if car or bike array exists
          const vehicleArray = data.data.car || data.data.bike || [];
          
          // Find the matching vehicle and get its bookings
          const matchingVehicle = vehicleArray.find((v: any) => v._id === finalVehicleId);
          
          if (matchingVehicle && matchingVehicle.bookings) {
            vehicleBookings = matchingVehicle.bookings;
          }
        }

        console.log("✅ Extracted vehicle bookings:", vehicleBookings);

        const transformedBookings = vehicleBookings.map((booking: any) => ({
          _id: booking._id,
          customerName: booking.contactName || booking.customerName || "Unknown Customer",
          contactName: booking.contactName,
          startDate: booking.FromDate ? new Date(booking.FromDate).toLocaleDateString('en-GB') : booking.startDate,
          FromDate: booking.FromDate,
          startTime: booking.FromTime?.replace('.', ':') || booking.startTime || "N/A",
          FromTime: booking.FromTime,
          endDate: booking.ToDate ? new Date(booking.ToDate).toLocaleDateString('en-GB') : booking.endDate,
          ToDate: booking.ToDate,
          endTime: booking.ToTime?.replace('.', ':') || booking.endTime || "N/A",
          ToTime: booking.ToTime,
          mobile: booking.contactNumber || booking.mobile || "N/A",
          contactNumber: booking.contactNumber,
          status: booking.status === "Pending" ? "Booked" : (booking.status || "Booked") as any,
          userId: booking.userId,
          VechileId: booking.VechileId,
          totalPrice: booking.totalPrice,
        }));

        setBookingHistory(transformedBookings);
        setBookingError("");
      } catch (err: any) {
        console.error("❌ Error fetching booking history:", err);
        const errorMessage = err?.message || "Failed to load booking history";
        setBookingError(errorMessage);
        setBookingHistory([]);
      } finally {
        setBookingLoading(false);
      }
    };

    fetchBookingHistory();
  }, [finalVehicleId, vehicleData, vehicleType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicleData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-red-600 text-lg mb-4">{error || "Vehicle not found"}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const isCar = !!vehicleData.CarName || !!vehicleData.carImages || vehicleType === "car";

  let vehicleImages = (isCar ? vehicleData.carImages : vehicleData.bikeImages) || [];
  vehicleImages = vehicleImages.filter((img) => img && img.trim() !== "" && img !== "undefined");

  const carDummyImages = [
    "https://e7.pngegg.com/pngimages/768/421/png-clipart-car-computer-icons-sedan-auto-detailing-auto-driving-rectangle-thumbnail.png",
   "https://png.pngtree.com/png-vector/20191201/ourmid/pngtree-car-vector-logo-design-png-image_2066853.jpg"
  ];

  const bikeDummyImages = [
    "https://w7.pngwing.com/pngs/579/51/png-transparent-computer-icons-motorcycle-bicycle-motorcycle-logo-black-silhouette.png",
    "https://w1.pngwing.com/pngs/381/835/png-transparent-yamaha-logo-car-decal-motorcycle-sticker-sport-bike-yamaha-yzfr1-bicycle-thumbnail.png"
  ];

  const dummyImages = isCar ? carDummyImages : bikeDummyImages;

  if (vehicleImages.length === 0) {
    vehicleImages = dummyImages;
  }

  const carouselImages = [...vehicleImages];
  while (carouselImages.length < 3) {
    carouselImages.push(dummyImages[carouselImages.length % dummyImages.length]);
  }

  const displayName = isCar
    ? `${vehicleData.CarName || "Unknown"} ${vehicleData.CarModel || ""}`.trim()
    : `${vehicleData.bikeName || "Unknown"} ${vehicleData.bikeModel || ""}`.trim();

  const displayPrice = isCar
    ? vehicleData.RentPerHour || 0
    : vehicleData.pricePerKm || 0;

  const handleBookingClick = (booking: BookingHistory) => {
    navigate(`/booking-details/${booking._id}`, {
      state: { booking, vehicleData },
    });
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* LEFT SECTION - Main Content */}
        <div className="flex-1 bg-white">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Image Card */}
            <div className="relative w-300px md:w-[420px] h-[300px] flex-shrink-0 cursor-pointer rounded-[10px] overflow-hidden border-2 border-transparent hover:border-[#0066FF] transition-all duration-200">
              <img
                src={carouselImages[currentImageIndex]}
                alt={displayName}
                className="w-full h-full object-cover transition-all duration-500"
              />

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentImageIndex 
                        ? "bg-[#0066FF] w-6" 
                        : "bg-white/60 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-1">
                <div className="flex-1 min-w-0">
                  <h1 
                    className="text-[32px] font-bold text-[#000000] leading-tight cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                  >
                    {displayName}
                  </h1>
                </div>
                <div className="bg-[#FFF9E6] px-2.5 py-1 rounded-md flex items-center gap-1 flex-shrink-0">
                  <span className="text-[#FFB800] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>★</span>
                  <span className="text-sm font-semibold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif' }}>4.2</span>
                </div>
              </div>

              <div className="flex items-baseline gap-1 mb-3 w-fit cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all">
                <span className="text-[32px] font-bold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  ₹{displayPrice}
                </span>
                <span className="text-base text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  /{isCar ? 'hr' : 'km'}
                </span>
              </div>

              {/* Specs Card */}
              <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden bg-white mb-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200">
                <div className="flex items-center gap-0">
                  {isCar ? (
                    <>
                      <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                        <img src={AutomaticLogo} className="w-6 h-6 mb-1.5" alt="transmission" />
                        <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {vehicleData.transmissionType || "Manual"}
                        </span>
                      </div>
                      
                      <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                        <img src={seats} className="w-6 h-6 mb-1.5" alt="seats" />
                        <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {vehicleData.Carseater || "5"} Seaters
                        </span>
                      </div>
                      
                      <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                        <img src={Petrol} className="w-6 h-6 mb-1.5" alt="fuel" />
                        <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {vehicleData.fuelType || "Petrol"}
                        </span>
                      </div>
                      
                      <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                        <img src={AClogo} className="w-6 h-6 mb-1.5" alt="ac" />
                        <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {vehicleData.Ac_available ? "AC" : "Non-AC"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                        <img src={BikeCC} className="w-6 h-6 mb-1.5" alt="engine" />
                        <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {vehicleData.engineCapacity || vehicleData.bikeEngine || vehicleData.bikeCC || "350"} CC
                        </span>
                      </div>
                      
                      <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                        <img src={AutomaticLogo} className="w-6 h-6 mb-1.5" alt="transmission" />
                        <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {vehicleData.transmission || vehicleData.Transmission || "Manual"}
                        </span>
                      </div>
                      
                      <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                        <img src={Petrol} className="w-6 h-6 mb-1.5" alt="fuel" />
                        <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {vehicleData.fuel || vehicleData.Fuel || "Petrol"}
                        </span>
                      </div>
                      
                      <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                        <img src={Location} className="w-6 h-6 mb-1.5" alt="location" />
                        <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {vehicleData.pickupCity || vehicleData.pickupArea || "N/A"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Description Card */}
              <div className="border border-[#E5E5E5] rounded-[10px] p-4 bg-white mb-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200 w-full max-w-full">
                <h2 className="text-[18px] font-bold text-[#000000] mb-2 cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  Description
                </h2>
                <p className="text-[#666666] text-[14px] leading-[1.6] min-h-[40px] break-words whitespace-normal overflow-hidden" style={{ fontFamily: 'Inter, sans-serif', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  {vehicleData.description || "No description available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - Booking History Sidebar */}
        <aside className="md:w-[380px]">
          <div className="sticky top-6 bg-white p-6 rounded-[12px] shadow-lg border border-[#E5E5E5]">
            <h2 className="text-[20px] font-semibold text-[#000000] mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Booking History
            </h2>

            {bookingLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Loading bookings...</p>
              </div>
            ) : bookingError ? (
              <div className="text-center py-8 px-4 bg-[#FFF5F5] rounded-[8px] border border-[#FEE]">
                <p className="text-[14px] text-[#DC2626] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{bookingError}</p>
                <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Unable to load booking history</p>
              </div>
            ) : bookingHistory.length === 0 ? (
              <div className="text-center py-8 px-4 bg-[#F8F9FA] rounded-[8px] border border-[#E5E5E5]">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-[16px] font-medium text-[#333333] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>No bookings yet</p>
                <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>This vehicle hasn't been booked</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E5E5 transparent' }}>
                {bookingHistory.map((booking, idx) => (
                  <div
                    key={booking._id || idx}
                    onClick={() => handleBookingClick(booking)}
                    className="border border-[#E0E0E0] rounded-[8px] p-4 hover:shadow-md transition-all duration-200 cursor-pointer bg-white"
                  >
                    {/* Header with Name and Menu */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#666666"/>
                            <path d="M8 9C5.33333 9 2 10.3333 2 13V14H14V13C14 10.3333 10.6667 9 8 9Z" fill="#666666"/>
                          </svg>
                        </div>
                        <h3 className="text-[15px] font-semibold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                          {booking.customerName || booking.contactName}
                        </h3>
                      </div>
                      <button className="text-[#999999] hover:text-[#000000] p-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="3" r="1" fill="currentColor"/>
                          <circle cx="8" cy="8" r="1" fill="currentColor"/>
                          <circle cx="8" cy="13" r="1" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>

                    {/* Date and Time Section */}
                    <div className="space-y-1.5 mb-3">
                      {/* From Date and Time */}
                      <div className="flex items-center gap-2 text-[12px]">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                          <path d="M11 2H10V1H9V2H5V1H4V2H3C2.45 2 2 2.45 2 3V12C2 12.55 2.45 13 3 13H11C11.55 13 12 12.55 12 12V3C12 2.45 11.55 2 11 2ZM11 12H3V5H11V12Z" fill="#666666"/>
                        </svg>
                        <span className="text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>From:</span>
                        <span className="text-[#000000] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{booking.startDate}</span>
                      </div>
                      
                      {/* From Time */}
                      <div className="flex items-center gap-2 text-[12px]">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                          <path d="M7 1C3.69 1 1 3.69 1 7C1 10.31 3.69 13 7 13C10.31 13 13 10.31 13 7C13 3.69 10.31 1 7 1ZM7 11.8C4.35 11.8 2.2 9.65 2.2 7C2.2 4.35 4.35 2.2 7 2.2C9.65 2.2 11.8 4.35 11.8 7C11.8 9.65 9.65 11.8 7 11.8Z" fill="#666666"/>
                          <path d="M7.5 4H6.5V7.5L9.5 9.25L10 8.43L7.5 7V4Z" fill="#666666"/>
                        </svg>
                        <span className="text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>To:</span>
                        <span className="text-[#000000] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{booking.endTime}</span>
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="flex items-center gap-2 mb-3 text-[12px]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                        <path d="M11.5 9.5C11 9.5 10.5 9.4 10.1 9.2C10 9.1 9.9 9.1 9.7 9.1C9.5 9.1 9.3 9.2 9.2 9.3L8.4 10.4C6.9 9.7 4.3 7.2 3.5 5.6L4.6 4.7C4.8 4.5 4.9 4.2 4.8 3.9C4.6 3.5 4.5 3 4.5 2.5C4.5 2.2 4.3 2 4 2H2.5C2.2 2 2 2.2 2 2.5C2 7.7 6.3 12 11.5 12C11.8 12 12 11.8 12 11.5V10C12 9.7 11.8 9.5 11.5 9.5Z" fill="#666666"/>
                      </svg>
                      <span className="text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Mobile No:</span>
                      <span className="text-[#000000] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{booking.mobile}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Status:</span>
                      <span 
                        className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-medium ${
                          booking.status === "Completed"
                            ? "bg-[#E8F5E9] text-[#2E7D32]"
                            : booking.status === "Picked"
                            ? "bg-[#E3F2FD] text-[#1565C0]"
                            : "bg-[#E8F5E9] text-[#2E7D32]"
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default VehicleHistory;