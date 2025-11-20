 
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Calendar, Clock, RefreshCw, X } from "lucide-react";
 
// import { useBookingStore } from "../store/booking.store";
// import { Booking } from "../types/booking";
// import Auto from "../assets/images/Auto.png";
// import apiService from "../services/api.service";
 
// type VehicleType = "Car" | "Auto" | "Bike";
 
// const mapVehicleType = (type: string | undefined): VehicleType => {
//   if (!type) return "Car";
//   const lower = type.toLowerCase();
//   if (lower.includes("auto")) return "Auto";
//   if (lower.includes("bike")) return "Bike";
//   return "Car";
// };
 
// // API Configuration
// const CORS_PROXIES = [
//   "https://corsproxy.io/?",
//   "https://api.codetabs.com/v1/proxy?quest=",
// ];
// const API_BASE_URL = "http://52.66.238.227:3000";
 
// // Booking API Response Types
// interface ApiBooking {
//   _id: string;
//   userId: string;
//   vechileType: string;
//   VechileId: string;
//   pricePerKm: string;
//   contactNumber: string;
//   contactName: string;
//   latitude: string;
//   longitude: string;
//   FromDate: string;
//   ToDate: string;
//   FromTime: string;
//   ToTime: string;
//   totalHours: string;
//   totalPrice: string;
//   status?: "Pending" | "Confirmed" | "Cancelled" | "Rejected" | "Completed" | "Picked";
//   rejectionReason?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }
 
// interface GetBookingsResponse {
//   success: boolean;
//   message: string;
//   bookings: ApiBooking[];
// }
 
// const MyBookings: React.FC = () => {
//   const navigate = useNavigate();
//   const { bookings, addBooking, updateBookingStatus, setBookings } = useBookingStore();
//   const [activeTab, setActiveTab] = useState<"Upcoming" | "Ongoing">("Upcoming");
//   const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
 
//   // New state for API integration
//   const [isLoadingBookings, setIsLoadingBookings] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [apiError, setApiError] = useState<string>("");
//   const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
//   const [showRejectionModal, setShowRejectionModal] = useState(false);
//   const [rejectedBooking, setRejectedBooking] = useState<ApiBooking | null>(null);
 
//   // Fetch vehicle details to get image and name
//   const fetchVehicleDetails = async (vehicleId: string, vehicleType: string) => {
//     try {
//       console.log(`🚗 Fetching vehicle details for ${vehicleType} ID: ${vehicleId}`);
      
//       const endpoint = vehicleType.toLowerCase() === 'car' 
//         ? `/getCarById/${vehicleId}`
//         : vehicleType.toLowerCase() === 'bike'
//         ? `/getBikeById/${vehicleId}`
//         : `/getAutoById/${vehicleId}`;
      
//       const response = await apiService.car.getCarById(vehicleId);
      
//       if (response?.data) {
//         const vehicleData = response.data;
//         console.log(`✅ Vehicle details fetched:`, vehicleData);
        
//         return {
//           name: vehicleData.CarName || vehicleData.BikeName || vehicleData.AutoName || '',
//           image: vehicleData.CarImage?.[0] || vehicleData.BikeImage?.[0] || vehicleData.AutoImage?.[0] || Auto,
//         };
//       }
      
//       return null;
//     } catch (error) {
//       console.warn(`⚠️ Failed to fetch vehicle details:`, error);
//       return null;
//     }
//   };

//   // Fetch bookings on mount
//   useEffect(() => {
//     fetchUserBookings();
   
//     // Auto-refresh every 60 seconds to check status updates (less aggressive to avoid rate limiting)
//     const interval = setInterval(() => {
//       fetchUserBookings(true); // Silent refresh
//     }, 60000);
 
//     return () => clearInterval(interval);
//   }, []);
 
//   // Fetch user bookings from API - Production Level with Retry
//   const fetchUserBookings = async (silent = false, retryCount = 0) => {
//     if (!silent) setIsLoadingBookings(true);
//     setIsRefreshing(true);
//     setApiError("");
 
//     const MAX_RETRIES = 2;
//     const RETRY_DELAY = 1000; // 1 second

//     try {
//       // Get userId from localStorage or use default
//       const userId = localStorage.getItem('userId') || "68fe269b6f13375a65dc587a";
      
//       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//       console.log(`📥 FETCHING USER BOOKINGS - START ${retryCount > 0 ? `(Retry ${retryCount}/${MAX_RETRIES})` : ''}`);
//       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//       console.log("👤 User ID:", userId);
//       console.log("🔄 Silent Mode:", silent);

//       // Use apiService with built-in multi-strategy fallback
//       const response = await apiService.booking.getAllBookings(userId);
      
//       console.log("✅ API Response:", response);
      
//       // Handle response format (could be direct data or wrapped in success)
//       const data: GetBookingsResponse = response.data 
//         ? response 
//         : { success: true, message: "Success", bookings: response };

//       if (data.success && data.bookings && Array.isArray(data.bookings)) {
//         console.log(`📦 Found ${data.bookings.length} bookings from API`);
//         console.log(`📊 Current bookings in store: ${bookings.length}`);
        
//         // Convert API bookings to local format
//         const convertedBookings: Booking[] = await Promise.all(
//           data.bookings.map(async (apiBooking, index) => {
//             console.log(`\n🔄 Processing Booking ${index + 1}:`, {
//               bookingId: apiBooking._id,
//               vehicleId: apiBooking.VechileId,
//               vehicleType: apiBooking.vechileType,
//               status: apiBooking.status,
//               fromDate: apiBooking.FromDate,
//               toDate: apiBooking.ToDate,
//               fromTime: apiBooking.FromTime,
//               toTime: apiBooking.ToTime,
//             });

//             const newStatus = mapApiStatus(apiBooking.status);
            
//             // Check if this is a rejection notification
//             const existingBooking = bookings.find(b => b.id === apiBooking._id);
//             if (
//               existingBooking &&
//               existingBooking.status !== "Cancelled" && 
//               newStatus === "Cancelled" && 
//               apiBooking.status === "Rejected"
//             ) {
//               console.log("   ⚠️ Booking was rejected - will show modal");
//               setRejectedBooking(apiBooking);
//               setShowRejectionModal(true);
//             }

//             // Try to fetch vehicle details
//             let vehicleData = null;
//             try {
//               vehicleData = await fetchVehicleDetails(apiBooking.VechileId, apiBooking.vechileType);
//             } catch (error) {
//               console.warn("   ⚠️ Failed to fetch vehicle details, using defaults");
//             }

//             // Return converted booking
//             return {
//               id: apiBooking._id,
//               vehicleId: apiBooking.VechileId,
//               vehicleName: vehicleData?.name || `${apiBooking.vechileType} Vehicle`,
//               vehicleImage: vehicleData?.image || Auto,
//               vehicleType: mapVehicleType(apiBooking.vechileType),
//               customerName: apiBooking.contactName,
//               bookingDate: new Date(
//                 apiBooking.createdAt || apiBooking.FromDate
//               ).toLocaleDateString("en-US"),
//               bookingTime: new Date(
//                 apiBooking.createdAt || apiBooking.FromDate
//               ).toLocaleTimeString("en-US", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               }),
//               startDate: formatApiDate(apiBooking.FromDate),
//               startTime: formatApiTime(apiBooking.FromTime),
//               endDate: formatApiDate(apiBooking.ToDate),
//               endTime: formatApiTime(apiBooking.ToTime),
//               modelNo: apiBooking._id.slice(0, 10).toUpperCase(),
//               status: newStatus,
//               price: Number(apiBooking.totalPrice) / Number(apiBooking.totalHours) || Number(apiBooking.pricePerKm) || 0,
//             };
//           })
//         );
        
//         // Replace all bookings with API data (sync with backend)
//         setBookings(convertedBookings);
//         setLastSyncTime(new Date());
        
//         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//         console.log("✅ FETCH COMPLETE - SUCCESS");
//         console.log(`📊 API returned: ${data.bookings.length} bookings`);
//         console.log(`📋 Now displaying: ${convertedBookings.length} bookings`);
//         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//       } else {
//         console.warn("⚠️ No bookings found in response");
//         setApiError("No bookings found.");
//       }
//     } catch (error: any) {
//       console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//       console.error("❌ FETCH ERROR:");
//       console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//       console.error("Error Type:", error.constructor.name);
//       console.error("Error Message:", error.message);
//       console.error("Error Details:", error);
      
//       // Retry logic with exponential backoff
//       if (retryCount < MAX_RETRIES) {
//         const delay = RETRY_DELAY * Math.pow(2, retryCount);
//         console.log(`🔄 Retrying in ${delay}ms...`);
        
//         await new Promise(resolve => setTimeout(resolve, delay));
//         return fetchUserBookings(silent, retryCount + 1);
//       }
      
//       if (!silent) {
//         const errorMessage = error.response?.data?.message 
//           || error.message 
//           || "Unable to fetch latest bookings. Showing cached data.";
//         setApiError(errorMessage);
//       }
//     } finally {
//       setIsLoadingBookings(false);
//       setIsRefreshing(false);
//     }
//   };
 
//   // Map API status to local status
//   const mapApiStatus = (
//     apiStatus?: string
//   ): "Booked" | "Cancelled" | "Picked" | "Completed" => {
//     switch (apiStatus) {
//       case "Confirmed":
//         return "Booked";
//       case "Pending":
//         return "Booked";
//       case "Cancelled":
//         return "Cancelled";
//       case "Rejected":
//         return "Cancelled"; // Map Rejected to Cancelled but we'll display differently
//       case "Picked":
//         return "Picked";
//       case "Completed":
//         return "Completed";
//       default:
//         return "Booked";
//     }
//   };
 
//   // Format date from API (2025-12-02) to display format
//   const formatApiDate = (dateStr: string): string => {
//     try {
//       const date = new Date(dateStr.trim());
//       if (!isNaN(date.getTime())) {
//         return date.toLocaleDateString("en-US", {
//           month: "2-digit",
//           day: "2-digit",
//           year: "numeric",
//         });
//       }
//     } catch (error) {
//       console.error("Date format error:", error);
//     }
//     return dateStr;
//   };
 
//   // Format time from API (1.00, 6.00) to display format
//   const formatApiTime = (timeStr: string): string => {
//     try {
//       const [hours, minutes] = timeStr.split(".");
//       const hour = parseInt(hours);
//       const min = minutes || "00";
 
//       const period = hour >= 12 ? "PM" : "AM";
//       const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
 
//       return `${displayHour}:${min} ${period}`;
//     } catch (error) {
//       console.error("Time format error:", error);
//       return timeStr;
//     }
//   };
 
//   // ✅ Categorize bookings - exclude rejected bookings from tabs
//   const getBookingCategory = (booking: Booking): "Upcoming" | "Ongoing" | null => {
//     // Hide cancelled/rejected bookings from tabs
//     if (booking.status === "Cancelled") {
//       return null;
//     }
 
//     const now = new Date();
//     const startDateTime = new Date(`${booking.startDate} ${booking.startTime}`);
//     const endDateTime = booking.endDate
//       ? new Date(`${booking.endDate} ${booking.endTime || "23:59"}`)
//       : new Date(startDateTime.getTime() + 24 * 60 * 60 * 1000);
 
//     if (now < startDateTime) return "Upcoming";
//     if (now >= startDateTime && now <= endDateTime) return "Ongoing";
//     return "Upcoming";
//   };
 
//   const filteredBookings = bookings.filter((b) => {
//     const category = getBookingCategory(b);
//     return category === activeTab;
//   });
 
//   // ✅ Status Badge - show Confirmed for accepted, Rejected for rejected (Compact version)
//   const getStatusBadge = (status: string, isRejected: boolean = false) => {
//     const base =
//       "inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition shadow-sm";
 
//     if (isRejected || status === "Cancelled") {
//       return (
//         <div className={`${base} bg-red-100 text-red-700 border border-red-300`}>
//           <span className="text-lg">❌</span>
//           <span>Rejected</span>
//         </div>
//       );
//     }
 
//     switch (status) {
//       case "Booked":
//         return (
//           <div className={`${base} bg-green-100 text-green-700 border border-green-300`}>
//             <span className="text-lg">✅</span>
//             <span>Confirmed</span>
//           </div>
//         );
//       case "Picked":
//         return (
//           <div className={`${base} bg-yellow-100 text-yellow-700 border border-yellow-300`}>
//             <span className="text-lg">🚗</span>
//             <span>Vehicle Picked</span>
//           </div>
//         );
//       case "Completed":
//         return (
//           <div className={`${base} bg-blue-100 text-blue-700 border border-blue-300`}>
//             <span className="text-lg">✔️</span>
//             <span>Completed</span>
//           </div>
//         );
//       default:
//         return (
//           <div className={`${base} bg-gray-100 text-gray-700 border border-gray-300`}>
//             <span>{status}</span>
//           </div>
//         );
//     }
//   };
 
//   // ✅ Navigate to BookNow
//   const handleBookingClick = (booking: Booking) => {
//     navigate(`/booking-history/${booking.vehicleId}`, {
//       state: { booking, openContact: true },
//     });
//   };
 
//   // Manual refresh
//   const handleRefresh = () => {
//     fetchUserBookings();
//   };
 
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b sticky top-0 z-10">
//         <div className="w-full px-4 py-4 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>
//             {lastSyncTime && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Last updated: {lastSyncTime.toLocaleTimeString()}
//               </p>
//             )}
//           </div>
 
//           <button
//             onClick={handleRefresh}
//             disabled={isRefreshing}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition disabled:opacity-50"
//           >
//             <RefreshCw
//               className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
//             />
//             <span className="text-sm font-medium">
//               {isRefreshing ? "Syncing..." : "Refresh"}
//             </span>
//           </button>
//         </div>
 
//         {/* API Error Message */}
//         {apiError && (
//           <div className="px-4 pb-3">
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
//               <svg
//                 className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <div className="flex-1">
//                 <p className="text-sm text-yellow-800">{apiError}</p>
//                 <button
//                   onClick={handleRefresh}
//                   className="text-xs text-yellow-700 hover:text-yellow-900 underline mt-1"
//                 >
//                   Try again
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
 
//         {/* Tabs - Only Upcoming and Ongoing */}
//         <div className="flex gap-4 px-4 border-b">
//           <button
//             onClick={() => setActiveTab("Upcoming")}
//             className={`pb-3 px-4 font-semibold relative ${
//               activeTab === "Upcoming"
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             Upcoming
//           </button>
 
//           <button
//             onClick={() => setActiveTab("Ongoing")}
//             className={`pb-3 px-4 font-semibold relative ${
//               activeTab === "Ongoing"
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             Ongoing
//           </button>
//         </div>
//       </div>
 
//       {/* Loading State */}
//       {isLoadingBookings && (
//         <div className="flex items-center justify-center py-12">
//           <div className="text-center">
//             <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading your bookings...</p>
//           </div>
//         </div>
//       )}
 
//       {/* ✅ Bookings List */}
//       {!isLoadingBookings && (
//         <div className="max-w-4xl ml-0 p-4 space-y-3">
//           {filteredBookings.length ? (
//             filteredBookings.map((booking) => (
//               <div
//                 key={booking.id}
//                 onClick={() => handleBookingClick(booking)}
//                 style={{ width: "1200px", height: "290px" }}
//                 className={`bg-white rounded-lg overflow-hidden transition-all cursor-pointer flex relative ${
//                   selectedBooking === booking.id
//                     ? "ring-2 ring-blue-500 shadow-lg"
//                     : "shadow hover:shadow-md"
//                 }`}
//               >
//                 <div className="flex gap-4 p-4">
//                   <div className="flex-shrink-0">
//                     <img
//                       src={booking.vehicleImage || Auto}
//                       alt={booking.vehicleName}
//                       style={{ width: "277px", height: "290px" }}
//                       className="object-cover rounded-lg"
//                     />
//                   </div>
 
//                   <div className="flex-1 min-w-0">
//                     {/* Header with Vehicle Name and Booking ID */}
//                     <div className="mb-3 flex items-start justify-between">
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-900">
//                           {booking.vehicleName}
//                         </h3>
//                         <p className="text-lg font-semibold text-blue-600 mt-1">
//                           ₹{booking.price}/hr
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-xs text-gray-500 uppercase tracking-wide">Booking ID</p>
//                         <p className="text-sm font-bold text-gray-900 mt-0.5">
//                           {(booking.id || "N/A").toString().slice(0, 12)}
//                         </p>
//                       </div>
//                     </div>
 
//                     {/* Status Badge - Prominent at top */}
//                     <div className="mb-4">
//                       {getStatusBadge(booking.status, booking.status === "Cancelled")}
//                     </div>
 
//                     {/* Date Range Section */}
//                     <div className="bg-gray-50 rounded-lg p-3 mb-3">
//                       <div className="grid grid-cols-2 gap-3">
//                         {/* From Date */}
//                         <div>
//                           <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
//                             <Calendar className="w-3 h-3" />
//                             <span className="uppercase font-medium">From Date</span>
//                           </div>
//                           <p className="text-sm font-semibold text-gray-900">
//                             {booking.startDate}
//                           </p>
//                         </div>
                        
//                         {/* To Date */}
//                         {booking.endDate && (
//                           <div>
//                             <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
//                               <Calendar className="w-3 h-3" />
//                               <span className="uppercase font-medium">To Date</span>
//                             </div>
//                             <p className="text-sm font-semibold text-gray-900">
//                               {booking.endDate}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
 
//                     {/* Time Range Section */}
//                     <div className="bg-blue-50 rounded-lg p-3">
//                       <div className="grid grid-cols-2 gap-3">
//                         {/* From Time */}
//                         <div>
//                           <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
//                             <Clock className="w-3 h-3" />
//                             <span className="uppercase font-medium">From Time</span>
//                           </div>
//                           <p className="text-sm font-semibold text-gray-900">
//                             {booking.startTime}
//                           </p>
//                         </div>
                        
//                         {/* To Time */}
//                         {booking.endTime && (
//                           <div>
//                             <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
//                               <Clock className="w-3 h-3" />
//                               <span className="uppercase font-medium">To Time</span>
//                             </div>
//                             <p className="text-sm font-semibold text-gray-900">
//                               {booking.endTime}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
 
//                     {/* Status update indicator */}
//                     {isRefreshing && (
//                       <div className="absolute top-4 right-4">
//                         <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-12">
//               <div className="mb-4">
//                 <svg
//                   className="w-16 h-16 mx-auto text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                   />
//                 </svg>
//               </div>
//               <p className="text-gray-500 mb-4">
//                 {bookings.length === 0
//                   ? "No bookings yet. Start by booking a vehicle!"
//                   : `No ${activeTab.toLowerCase()} bookings found.`}
//               </p>
//               <button
//                 onClick={() => navigate("/rental")}
//                 className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
//               >
//                 Browse Vehicles to Book
//               </button>
//             </div>
//           )}
//         </div>
//       )}
 
//       {/* Rejection Modal */}
//       {showRejectionModal && rejectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in slide-in-from-bottom-4">
//             <div className="flex justify-center mb-6">
//               <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
//                 <X className="w-12 h-12 text-red-500" />
//               </div>
//             </div>
 
//             <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
//               Booking Rejected
//             </h2>
//             <p className="text-gray-600 text-center mb-6">
//               Unfortunately, the owner has rejected your booking request for the <strong>{rejectedBooking.vechileType}</strong>.
//             </p>
 
//             <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
//               <div className="flex justify-between mb-2">
//                 <span className="font-medium">Booking ID:</span>
//                 <span>{rejectedBooking._id.slice(0, 10)}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span className="font-medium">Date:</span>
//                 <span>{formatApiDate(rejectedBooking.FromDate)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Time:</span>
//                 <span>{formatApiTime(rejectedBooking.FromTime)}</span>
//               </div>
//             </div>
 
//             {rejectedBooking.rejectionReason && (
//               <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                 <p className="text-sm font-medium text-yellow-900 mb-1">Reason:</p>
//                 <p className="text-sm text-yellow-800">{rejectedBooking.rejectionReason}</p>
//               </div>
//             )}
 
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowRejectionModal(false);
//                   setRejectedBooking(null);
//                 }}
//                 className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={() => {
//                   setShowRejectionModal(false);
//                   setRejectedBooking(null);
//                   navigate("/rental");
//                 }}
//                 className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//               >
//                 Find Another Vehicle
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
 
// export default MyBookings;











  
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Calendar, Clock, RefreshCw, X } from "lucide-react";
// import { useBookingStore } from "../store/booking.store";
// import { Booking } from "../types/booking";
// import Auto from "../assets/images/Auto.png";
// import apiService from "../services/api.service";
 
// type VehicleType = "Car" | "Auto" | "Bike";
 
// const mapVehicleType = (type: string | undefined): VehicleType => {
//   if (!type) return "Car";
//   const lower = type.toLowerCase();
//   if (lower.includes("auto")) return "Auto";
//   if (lower.includes("bike")) return "Bike";
//   return "Car";
// };
 
// interface ApiBooking {
//   _id: string;
//   userId: string;
//   vechileType: string;
//   VechileId: string;
//   pricePerKm: string;
//   contactNumber: string;
//   contactName: string;
//   latitude: string;
//   longitude: string;
//   FromDate: string;
//   ToDate: string;
//   FromTime: string;
//   ToTime: string;
//   totalHours: string;
//   totalPrice: string;
//   status?: "Pending" | "Confirmed" | "Cancelled" | "Rejected" | "Completed" | "Picked";
//   rejectionReason?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }
 
// interface GetBookingsResponse {
//   success: boolean;
//   message: string;
//   bookings: ApiBooking[];
// }
 
// const MyBookings: React.FC = () => {
//   const navigate = useNavigate();
//   const { bookings, setBookings } = useBookingStore();
//   const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
//   const [isLoadingBookings, setIsLoadingBookings] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [apiError, setApiError] = useState<string>("");
//   const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
//   const [showRejectionModal, setShowRejectionModal] = useState(false);
//   const [rejectedBooking, setRejectedBooking] = useState<ApiBooking | null>(null);
 
//   // Fetch vehicle details
//   const fetchVehicleDetails = async (vehicleId: string, vehicleType: string) => {
//     try {
//       const response = await apiService.car.getCarById(vehicleId);
//       if (response?.data) {
//         const vehicleData = response.data;
//         return {
//           name: vehicleData.CarName || vehicleData.BikeName || vehicleData.AutoName || "",
//           image: vehicleData.CarImage?.[0] || vehicleData.BikeImage?.[0] || vehicleData.AutoImage?.[0] || Auto,
//         };
//       }
//       return null;
//     } catch {
//       return null;
//     }
//   };
 
//   useEffect(() => {
//     fetchUserBookings();
//     const interval = setInterval(() => fetchUserBookings(true), 60000);
//     return () => clearInterval(interval);
//   }, []);
 
//   const fetchUserBookings = async (silent = false, retryCount = 0) => {
//     if (!silent) setIsLoadingBookings(true);
//     setIsRefreshing(true);
//     setApiError("");
 
//     const MAX_RETRIES = 2;
//     const RETRY_DELAY = 1000;
//     try {
//       const userId = localStorage.getItem("userId") || "68fe269b6f13375a65dc587a";
//       const response = await apiService.booking.getAllBookings(userId);
//       const data: GetBookingsResponse = response.data
//         ? response
//         : { success: true, message: "Success", bookings: response };
 
//       if (data.success && data.bookings?.length) {
//         const convertedBookings: Booking[] = await Promise.all(
//           data.bookings.map(async (apiBooking) => {
//             const newStatus = mapApiStatus(apiBooking.status);
//             const existingBooking = bookings.find((b) => b.id === apiBooking._id);
//             if (
//               existingBooking &&
//               existingBooking.status !== "Cancelled" &&
//               newStatus === "Cancelled" &&
//               apiBooking.status === "Rejected"
//             ) {
//               setRejectedBooking(apiBooking);
//               setShowRejectionModal(true);
//             }
 
//             const vehicleData = await fetchVehicleDetails(apiBooking.VechileId, apiBooking.vechileType);
//             return {
//               id: apiBooking._id,
//               vehicleId: apiBooking.VechileId,
//               vehicleName: vehicleData?.name || `${apiBooking.vechileType} Vehicle`,
//               vehicleImage: vehicleData?.image || Auto,
//               vehicleType: mapVehicleType(apiBooking.vechileType),
//               customerName: apiBooking.contactName,
//               bookingDate: new Date(apiBooking.createdAt || apiBooking.FromDate).toLocaleDateString(),
//               bookingTime: new Date(apiBooking.createdAt || apiBooking.FromDate).toLocaleTimeString(),
//               startDate: formatApiDate(apiBooking.FromDate),
//               startTime: formatApiTime(apiBooking.FromTime),
//               endDate: formatApiDate(apiBooking.ToDate),
//               endTime: formatApiTime(apiBooking.ToTime),
//               modelNo: apiBooking._id.slice(0, 10).toUpperCase(),
//               status: newStatus,
//               price:
//                 Number(apiBooking.totalPrice) / Number(apiBooking.totalHours) ||
//                 Number(apiBooking.pricePerKm) ||
//                 0,
//             };
//           })
//         );
//         setBookings(convertedBookings);
//         setLastSyncTime(new Date());
//       } else {
//         setApiError("No bookings found.");
//       }
//     } catch (error: any) {
//       if (retryCount < MAX_RETRIES) {
//         await new Promise((res) => setTimeout(res, RETRY_DELAY * Math.pow(2, retryCount)));
//         return fetchUserBookings(silent, retryCount + 1);
//       }
//       setApiError(error.message || "Unable to fetch bookings.");
//     } finally {
//       setIsLoadingBookings(false);
//       setIsRefreshing(false);
//     }
//   };
 
//   const mapApiStatus = (apiStatus?: string): "Booked" | "Cancelled" | "Picked" | "Completed" => {
//     switch (apiStatus) {
//       case "Confirmed":
//       case "Pending":
//         return "Booked";
//       case "Cancelled":
//       case "Rejected":
//         return "Cancelled";
//       case "Picked":
//         return "Picked";
//       case "Completed":
//         return "Completed";
//       default:
//         return "Booked";
//     }
//   };
 
//   const formatApiDate = (dateStr: string): string => {
//     try {
//       const date = new Date(dateStr.trim());
//       return !isNaN(date.getTime())
//         ? date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })
//         : dateStr;
//     } catch {
//       return dateStr;
//     }
//   };
 
//   const formatApiTime = (timeStr: string): string => {
//     try {
//       const [hours, minutes] = timeStr.split(".");
//       const hour = parseInt(hours);
//       const min = minutes || "00";
//       const period = hour >= 12 ? "PM" : "AM";
//       const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
//       return `${displayHour}:${min} ${period}`;
//     } catch {
//       return timeStr;
//     }
//   };
 
// const handleBookingClick = (booking: Booking) => {
//   if (!booking.vehicleId) return alert("Vehicle details not found.");
 
//   const type = booking.vehicleType.toLowerCase(); // "car", "bike", "auto"
 
//   navigate(`/booking-history/${booking.vehicleId}`, {
//     state: { booking, vehicleType: type, openContact: false},
//   });
// };
 
 
//   const handleRefresh = () => fetchUserBookings();
 
//   const getStatusBadge = (status: string, isRejected = false) => {
//     const base = "inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm";
//     if (isRejected || status === "Cancelled")
//       return <div className={`${base} bg-red-100 text-red-700`}>❌ Rejected</div>;
//     if (status === "Booked")
//       return <div className={`${base} bg-green-100 text-green-700`}>✅ Confirmed</div>;
//     if (status === "Picked")
//       return <div className={`${base} bg-yellow-100 text-yellow-700`}>🚗 Picked</div>;
//     if (status === "Completed")
//       return <div className={`${base} bg-blue-100 text-blue-700`}>✔️ Completed</div>;
//     return <div className={`${base} bg-gray-100 text-gray-700`}>{status}</div>;
//   };
 
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b sticky top-0 z-10">
//         <div className="w-full px-4 py-4 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>
//             {lastSyncTime && <p className="text-xs text-gray-500">Last updated: {lastSyncTime.toLocaleTimeString()}</p>}
//           </div>
//           <button
//             onClick={handleRefresh}
//             disabled={isRefreshing}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
//           >
//             <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
//             <span>{isRefreshing ? "Syncing..." : "Refresh"}</span>
//           </button>
//         </div>
//       </div>
 
//       {/* Loading */}
//       {isLoadingBookings && (
//         <div className="flex items-center justify-center py-12 text-gray-600">Loading your bookings...</div>
//       )}
 
//       {/* Bookings List */}
//       {!isLoadingBookings && (
//         <div className="max-w-4xl ml-0 p-4 space-y-3">
//           {bookings.length ? (
//             bookings.map((booking) => (
//               <div
//                 key={booking.id}
//                 onClick={() => handleBookingClick(booking)}
//                 style={{ width: "1200px", height: "290px" }}
//                 className={`bg-white rounded-lg overflow-hidden flex cursor-pointer transition ${
//                   selectedBooking === booking.id ? "ring-2 ring-blue-500 shadow-lg" : "shadow hover:shadow-md"
//                 }`}
//               >
//                 <div className="flex gap-4 p-4">
//                   <img
//                     src={booking.vehicleImage || Auto}
//                     alt={booking.vehicleName}
//                     style={{ width: "277px", height: "290px" }}
//                     className="object-cover rounded-lg"
//                   />
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start mb-3">
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-900">{booking.vehicleName}</h3>
//                         <p className="text-lg font-semibold text-blue-600 mt-1">₹{booking.price}/hr</p>
//                       </div>
//                       <div className="text-right text-sm text-gray-500">
//                         <p className="uppercase">Booking ID</p>
//                         <p className="font-bold text-gray-900">{(booking.id || "N/A").slice(0, 12)}</p>
//                       </div>
//                     </div>
//                     <div className="mb-4">{getStatusBadge(booking.status, booking.status === "Cancelled")}</div>
//                     <div className="bg-gray-50 rounded-lg p-3 mb-3 grid grid-cols-2 gap-3">
//                       <div>
//                         <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
//                           <Calendar className="w-3 h-3" /> From Date
//                         </div>
//                         <p className="text-sm font-semibold">{booking.startDate}</p>
//                       </div>
//                       <div>
//                         <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
//                           <Calendar className="w-3 h-3" /> To Date
//                         </div>
//                         <p className="text-sm font-semibold">{booking.endDate}</p>
//                       </div>
//                     </div>
//                     <div className="bg-blue-50 rounded-lg p-3 grid grid-cols-2 gap-3">
//                       <div>
//                         <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
//                           <Clock className="w-3 h-3" /> From Time
//                         </div>
//                         <p className="text-sm font-semibold">{booking.startTime}</p>
//                       </div>
//                       <div>
//                         <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
//                           <Clock className="w-3 h-3" /> To Time
//                         </div>
//                         <p className="text-sm font-semibold">{booking.endTime}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-12">
//               <p className="text-gray-500 mb-4">No bookings found. Start by booking a vehicle!</p>
//               <button
//                 onClick={() => navigate("/rental")}
//                 className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white px-6 py-3 rounded-lg font-semibold"
//               >
//                 Browse Vehicles
//               </button>
//             </div>
//           )}
//         </div>
//       )}
 
//       {/* Rejection Modal */}
//       {showRejectionModal && rejectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
//             <div className="flex justify-center mb-6">
//               <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
//                 <X className="w-12 h-12 text-red-500" />
//               </div>
//             </div>
//             <h2 className="text-2xl font-bold text-center mb-3">Booking Rejected</h2>
//             <p className="text-gray-600 text-center mb-6">
//               The owner rejected your booking for the <strong>{rejectedBooking.vechileType}</strong>.
//             </p>
//             <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
//               <div className="flex justify-between mb-2">
//                 <span className="font-medium">Booking ID:</span>
//                 <span>{rejectedBooking._id.slice(0, 10)}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span className="font-medium">Date:</span>
//                 <span>{formatApiDate(rejectedBooking.FromDate)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Time:</span>
//                 <span>{formatApiTime(rejectedBooking.FromTime)}</span>
//               </div>
//             </div>
//             {rejectedBooking.rejectionReason && (
//               <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                 <p className="text-sm font-medium text-yellow-900 mb-1">Reason:</p>
//                 <p className="text-sm text-yellow-800">{rejectedBooking.rejectionReason}</p>
//               </div>
//             )}
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowRejectionModal(false);
//                   setRejectedBooking(null);
//                 }}
//                 className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={() => {
//                   setShowRejectionModal(false);
//                   setRejectedBooking(null);
//                   navigate("/rental");
//                 }}
//                 className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg"
//               >
//                 Find Another Vehicle
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
 
// export default MyBookings;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Calendar, Clock, RefreshCw, X, AlertCircle } from "lucide-react";
// import { useBookingStore } from "../store/booking.store";
// import { Booking } from "../types/booking";
// import Auto from "../assets/images/Auto.png";
// import apiService from "../services/api.service";

// type VehicleType = "Car" | "Auto" | "Bike";

// const mapVehicleType = (type: string | undefined): VehicleType => {
//   if (!type) return "Car";
//   const lower = type.toLowerCase();
//   if (lower.includes("auto")) return "Auto";
//   if (lower.includes("bike")) return "Bike";
//   return "Car";
// };

// interface ApiBookingResponse {
//   booking: {
//     _id: string;
//     userId: string;
//     vechileType: string;
//     VechileId: string;
//     pricePerKm: number;
//     pricePerHour: number;
//     pricePerDay: number;
//     contactNumber: string;
//     contactName: string;
//     latitude: string;
//     longitude: string;
//     FromDate: string;
//     ToDate: string;
//     FromTime: string;
//     ToTime: string;
//     totalHours: number;
//     totalPrice: number;
//     status?: "Pending" | "Confirmed" | "Cancelled" | "Rejected" | "Completed" | "Picked";
//     rejectionReason?: string;
//     createdAt?: string;
//     updatedAt?: string;
//   };
//   user: any;
//   vehicle: {
//     _id: string;
//     CarName?: string;
//     carName?: string;
//     bikeName?: string;
//     CarModel?: string;
//     bikeModel?: string;
//     carImages?: string[];
//     bikeImages?: string[];
//     pickupCity?: string;
//   };
//   reviews: any[];
// }

// const MyBookings: React.FC = () => {
//   const navigate = useNavigate();
//   const { bookings, setBookings } = useBookingStore();
//   const [isLoadingBookings, setIsLoadingBookings] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [apiError, setApiError] = useState<string>("");
//   const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
//   const [showRejectionModal, setShowRejectionModal] = useState(false);
//   const [rejectedBooking, setRejectedBooking] = useState<ApiBookingResponse["booking"] | null>(null);
//   const [bookingsDataCache, setBookingsDataCache] = useState<ApiBookingResponse[]>([]);

//   useEffect(() => {
//     fetchUserBookings();
//     const interval = setInterval(() => fetchUserBookings(true), 60000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchUserBookings = async (silent = false) => {
//     if (!silent) setIsLoadingBookings(true);
//     setIsRefreshing(true);
//     setApiError("");

//     try {
//       const userId = localStorage.getItem("userId") || "690308d03a633b650dbc7e61";
//       console.log("🔍 Fetching bookings for user:", userId);
      
//       // Call API
//       const response = await apiService.booking.getAllBookings(userId);
//       console.log("📦 Raw API Response:", response);

//       // Handle different response structures
//       let bookingsData: ApiBookingResponse[] = [];
      
//       if (response?.data) {
//         bookingsData = Array.isArray(response.data) ? response.data : [];
//       } else if (Array.isArray(response)) {
//         bookingsData = response;
//       } else if (response?.bookings) {
//         bookingsData = Array.isArray(response.bookings) ? response.bookings : [];
//       }
      
//       console.log("📦 Extracted bookings data:", bookingsData);

//       if (bookingsData && bookingsData.length > 0) {
//         setBookingsDataCache(bookingsData);
        
//         const convertedBookings: Booking[] = bookingsData.map((item) => {
//           const apiBooking = item.booking;
//           const vehicle = item.vehicle;
          
//           console.log("🚗 Processing booking:", {
//             bookingId: apiBooking._id,
//             vehicleId: apiBooking.VechileId,
//             vehicle: vehicle,
//             status: apiBooking.status
//           });

//           const newStatus = mapApiStatus(apiBooking.status);
          
//           // Check for rejection modal
//           const existingBooking = bookings.find((b) => b.id === apiBooking._id);
//           if (
//             existingBooking &&
//             existingBooking.status !== "Cancelled" &&
//             newStatus === "Cancelled" &&
//             apiBooking.status === "Rejected"
//           ) {
//             setRejectedBooking(apiBooking);
//             setShowRejectionModal(true);
//           }

//           // Extract vehicle name with fallbacks
//           const vehicleName = 
//             vehicle?.CarName || 
//             vehicle?.carName || 
//             vehicle?.bikeName || 
//             `${apiBooking.vechileType} Vehicle`;
          
//           // Extract vehicle image with fallbacks
//           const vehicleImage = 
//             (vehicle?.carImages && vehicle.carImages[0]) ||
//             (vehicle?.bikeImages && vehicle.bikeImages[0]) ||
//             Auto;

//           // Calculate price with fallbacks
//           const price = 
//             Number(apiBooking.pricePerKm) ||
//             Number(apiBooking.pricePerHour) ||
//             Number(apiBooking.pricePerDay) ||
//             (apiBooking.totalPrice && apiBooking.totalHours 
//               ? Number(apiBooking.totalPrice) / Number(apiBooking.totalHours) 
//               : 0);

//           return {
//             id: apiBooking._id,
//             vehicleId: apiBooking.VechileId,
//             vehicleName: vehicleName,
//             vehicleImage: vehicleImage,
//             vehicleType: mapVehicleType(apiBooking.vechileType),
//             customerName: apiBooking.contactName,
//             contactNumber: apiBooking.contactNumber,
//             bookingDate: formatApiDate(apiBooking.createdAt || apiBooking.FromDate),
//             bookingTime: formatApiTime(apiBooking.FromTime),
//             startDate: formatApiDate(apiBooking.FromDate),
//             startTime: formatApiTime(apiBooking.FromTime),
//             endDate: formatApiDate(apiBooking.ToDate),
//             endTime: formatApiTime(apiBooking.ToTime),
//             modelNo: apiBooking._id.slice(0, 10).toUpperCase(),
//             status: newStatus,
//             price: price,
//           };
//         });

//         console.log("✅ Converted bookings:", convertedBookings);
//         setBookings(convertedBookings);
//         setLastSyncTime(new Date());
//         setApiError("");
//       } else {
//         console.log("📭 No bookings found");
//         setBookings([]);
//         setApiError("");
//       }
//     } catch (error: any) {
//       console.error("❌ Error fetching bookings:", error);
//       const errorMessage = error.response?.data?.message || error.message || "Failed to load bookings";
//       setApiError(errorMessage);
//       setBookings([]);
//     } finally {
//       setIsLoadingBookings(false);
//       setIsRefreshing(false);
//     }
//   };

//   const mapApiStatus = (apiStatus?: string): "Booked" | "Cancelled" | "Picked" | "Completed" => {
//     switch (apiStatus) {
//       case "Confirmed":
//       case "Pending":
//         return "Booked";
//       case "Cancelled":
//       case "Rejected":
//         return "Cancelled";
//       case "Picked":
//         return "Picked";
//       case "Completed":
//         return "Completed";
//       default:
//         return "Booked";
//     }
//   };

//   const formatApiDate = (dateStr: string): string => {
//     try {
//       const date = new Date(dateStr.trim());
//       return !isNaN(date.getTime())
//         ? date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
//         : dateStr;
//     } catch {
//       return dateStr;
//     }
//   };

//   const formatApiTime = (timeStr: string): string => {
//     try {
//       // Handle "HH.MM" format
//       const [hours, minutes] = timeStr.split(".");
//       const hour = parseInt(hours);
//       const min = minutes || "00";
//       const period = hour >= 12 ? "PM" : "AM";
//       const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
//       return `${displayHour.toString().padStart(2, '0')}:${min} ${period}`;
//     } catch {
//       return timeStr;
//     }
//   };

//   const handleBookingClick = (booking: Booking) => {
//     console.log("🖱️ Booking clicked:", booking);
    
//     if (!booking.vehicleId) {
//       alert("Vehicle details not found.");
//       return;
//     }

//     const type = booking.vehicleType.toLowerCase();

//     const bookingResponse = bookingsDataCache.find(
//       item => item.booking._id === booking.id
//     );

//     const vehicleData = bookingResponse?.vehicle;

//     console.log("🚗 Navigate to booking detail:", {
//       bookingId: booking.id,
//       vehicleId: booking.vehicleId,
//       vehicleType: type,
//       vehicleData: vehicleData,
//       path: `/booking-detail/${booking.vehicleId}`
//     });

//     try {
//       navigate(`/booking-detail/${booking.vehicleId}`, {
//         state: { 
//           booking, 
//           vehicleType: type, 
//           openContact: false,
//           vehicleData: vehicleData || {
//             _id: booking.vehicleId,
//             vehicleType: type,
//             bikeName: booking.vehicleName,
//             carName: booking.vehicleName,
//             bikeImages: booking.vehicleImage ? [booking.vehicleImage] : [],
//             carImages: booking.vehicleImage ? [booking.vehicleImage] : [],
//             pricePerKm: booking.price,
//             RentPerHour: booking.price
//           }
//         },
//       });
      
//       console.log("✅ Navigation initiated successfully");
//     } catch (error) {
//       console.error("❌ Navigation error:", error);
//     }
//   };

//   const handleRefresh = () => fetchUserBookings();

//   const getStatusBadge = (status: string) => {
//     if (status === "Cancelled")
//       return <span className="px-3 py-1.5 rounded-md font-medium text-xs bg-red-50 text-red-600">Not Booked</span>;
//     if (status === "Booked")
//       return <span className="px-3 py-1.5 rounded-md font-medium text-xs bg-green-50 text-green-600">Confirmed</span>;
//     if (status === "Picked")
//       return <span className="px-3 py-1.5 rounded-md font-medium text-xs bg-yellow-50 text-yellow-600">Picked</span>;
//     if (status === "Completed")
//       return <span className="px-3 py-1.5 rounded-md font-medium text-xs bg-blue-50 text-blue-600">Completed</span>;
//     return <span className="px-3 py-1.5 rounded-md font-medium text-xs bg-gray-50 text-gray-600">{status}</span>;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
//         <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
//             {lastSyncTime && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Last updated: {lastSyncTime.toLocaleTimeString()}
//               </p>
//             )}
//           </div>
//           <button
//             onClick={handleRefresh}
//             disabled={isRefreshing}
//             className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 font-medium shadow-sm"
//           >
//             <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
//             <span>{isRefreshing ? "Syncing..." : "Refresh"}</span>
//           </button>
//         </div>
//       </div>

//       {/* Error Message */}
//       {apiError && !isLoadingBookings && (
//         <div className="max-w-7xl mx-auto px-8 py-4">
//           <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
//             <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//             <div className="flex-1">
//               <h3 className="text-sm font-semibold text-red-900 mb-1">Failed to load bookings</h3>
//               <p className="text-sm text-red-700">{apiError}</p>
//               <button 
//                 onClick={handleRefresh}
//                 className="mt-3 text-sm font-medium text-red-600 hover:text-red-700 underline"
//               >
//                 Try again
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Loading */}
//       {isLoadingBookings && (
//         <div className="flex items-center justify-center py-20">
//           <div className="text-center">
//             <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
//             <p className="text-gray-600 font-medium">Loading your bookings...</p>
//           </div>
//         </div>
//       )}

//       {/* Bookings List */}
//       {!isLoadingBookings && (
//         <div className="max-w-7xl mx-auto px-8 py-8">
//           {bookings.length ? (
//             <div className="space-y-5">
//               {bookings.map((booking) => (
//                 <div
//                   key={booking.id}
//                   onClick={() => handleBookingClick(booking)}
//                   className="bg-white cursor-pointer transition-all hover:border-blue-500 border border-gray-200 overflow-hidden rounded-xl shadow-sm"
//                 >
//                   <div className="flex">
//                     {/* Vehicle Image */}
//                                 <div className="relative w-250px md:w-[420px] h-[250px] flex-shrink-0 cursor-pointer rounded-[10px] overflow-hidden border-2 border-transparent hover:border-[#0066FF] transition-all duration-200">
//                       <img
//                         src={booking.vehicleImage || Auto}
//                         alt={booking.vehicleName}
//                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-2xl"
//                         // style={{ height: '270px' }}
//                         onError={(e) => {
//                           e.currentTarget.src = Auto;
//                         }}
//                       />
//                     </div>
// {/* Content Card */}
//                     <div className="flex-1 p-6 bg-white relative">
//                       {/* Vehicle Name and Price */}
//                       <div className="mb-3">
//                         <h3 className="text-xl font-bold text-gray-900 mb-1">
//                           {booking.vehicleName}
//                         </h3>
//                         <p className="text-lg font-semibold text-blue-600">
//                           ₹{booking.price.toFixed(0)}<span className="text-sm text-gray-500">/km</span>
//                         </p>
//                       </div>

//                       {/* Mobile Number */}
//                       <div className="mb-4">
//                         <span className="text-xs text-gray-500 font-medium">Mobile No: </span>
//                         <span className="text-sm font-bold text-gray-900">{booking.contactNumber}</span>
//                       </div>

//                       {/* Date Row */}
//                       <div className="flex items-center gap-6 mb-3">
//                         <div className="flex items-center gap-2">
//                           <Calendar className="w-4 h-4 text-gray-400" />
//                           <span className="text-xs text-gray-500">From:</span>
//                           <span className="text-sm font-semibold text-gray-900">{booking.startDate}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Calendar className="w-4 h-4 text-gray-400" />
//                           <span className="text-xs text-gray-500">To:</span>
//                           <span className="text-sm font-semibold text-gray-900">{booking.endDate}</span>
//                         </div>
//                       </div>

//                       {/* Time Row */}
//                       <div className="flex items-center gap-6 mb-4">
//                         <div className="flex items-center gap-2">
//                           <Clock className="w-4 h-4 text-gray-400" />
//                           <span className="text-xs text-gray-500">From:</span>
//                           <span className="text-sm font-semibold text-gray-900">{booking.startTime}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Clock className="w-4 h-4 text-gray-400" />
//                           <span className="text-xs text-gray-500">To:</span>
//                           <span className="text-sm font-semibold text-gray-900">{booking.endTime}</span>
//                         </div>
//                       </div>

//                       {/* Status Badge - Below dates/times */}
//                       <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
//                         <span className="text-xs text-gray-500 font-medium">Status:</span>
//                         {getStatusBadge(booking.status)}
//                       </div>
//                     </div>
//                       {/* Date Row
//                       <div className="flex items-center gap-6 mb-3">
//                         <div className="flex items-center gap-2">
//                           <Calendar className="w-4 h-4 text-gray-400" />
//                           <span className="text-xs text-gray-500">From:</span>
//                           <span className="text-sm font-semibold text-gray-900">{booking.startDate}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Calendar className="w-4 h-4 text-gray-400" />
//                           <span className="text-xs text-gray-500">To:</span>
//                           <span className="text-sm font-semibold text-gray-900">{booking.endDate}</span>
//                         </div>
//                       </div> */}

//                       {/* Time Row */}
//                       {/* <div className="flex items-center gap-6">
//                         <div className="flex items-center gap-2">
//                           <Clock className="w-4 h-4 text-gray-400" />
//                           <span className="text-xs text-gray-500">From:</span>
//                           <span className="text-sm font-semibold text-gray-900">{booking.startTime}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Clock className="w-4 h-4 text-gray-400" />
//                           <span className="text-xs text-gray-500">To:</span>
//                           <span className="text-sm font-semibold text-gray-900">{booking.endTime}</span>
//                         </div>
//                       </div>
//                   //   </div>
//                   // </div> */}
//              </div>
//              </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-20">
//               <div className="max-w-md mx-auto">
//                 <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
//                   <Calendar className="w-12 h-12 text-gray-400" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                   No bookings yet
//                 </h3>
//                 <p className="text-gray-600 mb-8 text-lg">
//                   Start by booking a vehicle to see your reservations here
//                 </p>
//                 <button
//                   onClick={() => navigate("/rental")}
//                   className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white px-10 py-4 rounded-xl font-bold hover:shadow-xl transition-all text-lg"
//                 >
//                   Browse Vehicles
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Rejection Modal */}
//       {showRejectionModal && rejectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl">
//             <div className="flex justify-center mb-6">
//               <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
//                 <X className="w-14 h-14 text-red-500" />
//               </div>
//             </div>
//             <h2 className="text-3xl font-bold text-center mb-4">Booking Rejected</h2>
//             <p className="text-gray-600 text-center mb-6 text-lg">
//               The owner rejected your booking for the <strong>{rejectedBooking.vechileType}</strong>.
//             </p>
//             <div className="bg-gray-50 rounded-xl p-5 mb-6 text-sm text-gray-700 border border-gray-200">
//               <div className="flex justify-between mb-3">
//                 <span className="font-semibold">Booking ID:</span>
//                 <span className="font-medium">{rejectedBooking._id.slice(0, 10)}</span>
//               </div>
//               <div className="flex justify-between mb-3">
//                 <span className="font-semibold">Date:</span>
//                 <span className="font-medium">{formatApiDate(rejectedBooking.FromDate)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-semibold">Time:</span>
//                 <span className="font-medium">{formatApiTime(rejectedBooking.FromTime)}</span>
//               </div>
//             </div>
//             {rejectedBooking.rejectionReason && (
//               <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
//                 <p className="text-sm font-bold text-yellow-900 mb-2">Reason:</p>
//                 <p className="text-sm text-yellow-800">{rejectedBooking.rejectionReason}</p>
//               </div>
//             )}
//             <div className="flex gap-4">
//               <button
//                 onClick={() => {
//                   setShowRejectionModal(false);
//                   setRejectedBooking(null);
//                 }}
//                 className="flex-1 bg-gray-100 text-gray-800 font-bold py-3.5 px-6 rounded-xl hover:bg-gray-200 transition-all"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={() => {
//                   setShowRejectionModal(false);
//                   setRejectedBooking(null);
//                   navigate("/rental");
//                 }}
//                 className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-bold py-3.5 px-6 rounded-xl hover:shadow-xl transition-all"
//               >
//                 Find Another Vehicle
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBookings;









import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, RefreshCw, X } from "lucide-react";
import { useBookingStore, Booking, BookingStatus } from "../store/booking.store";
import Auto from "../assets/images/Auto.png";
import apiService from "../services/api.service";

type VehicleType = "Car" | "Auto" | "Bike";

const mapVehicleType = (type: string | undefined): VehicleType => {
  if (!type) return "Car";
  const lower = type.toLowerCase();
  if (lower.includes("auto")) return "Auto";
  if (lower.includes("bike")) return "Bike";
  return "Car";
};

interface ApiBookingResponse {
  booking: {
    _id: string;
    userId: string;
    vechileType: string;
    VechileId: string;
    pricePerKm: number;
    pricePerHour: number;
    pricePerDay: number;
    contactNumber: string;
    contactName: string;
    latitude: string;
    longitude: string;
    FromDate: string;
    ToDate: string;
    FromTime: string;
    ToTime: string;
    totalHours: number;
    totalPrice: number;
    status?: "Pending" | "Confirmed" | "Cancelled" | "Rejected" | "Completed" | "Picked" | "AutoCancelled";
    rejectionReason?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  user: any;
  vehicle: {
    _id: string;
    CarName?: string;
    carName?: string;
    bikeName?: string;
    CarModel?: string;
    bikeModel?: string;
    carImages?: string[];
    bikeImages?: string[];
    pickupCity?: string;
  };
  reviews: any[];
}

const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, setBookings } = useBookingStore();
  const [searchText, setSearchText] = useState("");
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectedBooking, setRejectedBooking] = useState<ApiBookingResponse["booking"] | null>(null);
  const [bookingsDataCache, setBookingsDataCache] = useState<ApiBookingResponse[]>([]);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async (silent = false) => {
    if (!silent) setIsLoadingBookings(true);
    setIsRefreshing(true);

    try {
      const userId = localStorage.getItem("userId") || "690308d03a633b650dbc7e61";
      console.log("🔍 Fetching bookings for user:", userId);
      
      const response = await apiService.booking.getAllBookings(userId);
      console.log("📦 Raw API Response:", response);

      let bookingsData: ApiBookingResponse[] = [];
      
      if (response?.data) {
        bookingsData = Array.isArray(response.data) ? response.data : [];
      } else if (Array.isArray(response)) {
        bookingsData = response;
      } else if (response?.bookings) {
        bookingsData = Array.isArray(response.bookings) ? response.bookings : [];
      }
      
      console.log("📦 Extracted bookings data:", bookingsData);

      if (bookingsData && bookingsData.length > 0) {
        setBookingsDataCache(bookingsData);
        
        const convertedBookings: Booking[] = bookingsData.map((item) => {
          const apiBooking = item.booking;
          const vehicle = item.vehicle;
          
          const newStatus = mapApiStatus(apiBooking.status);
          
          console.log("🔄 Status mapping:", {
            bookingId: apiBooking._id,
            originalStatus: apiBooking.status,
            mappedStatus: newStatus
          });
          
          const existingBooking = bookings.find((b) => b.id === apiBooking._id);
          if (
            existingBooking &&
            existingBooking.status !== "Cancelled" &&
            existingBooking.status !== "AutoCancelled" &&
            (newStatus === "Cancelled" || newStatus === "AutoCancelled") &&
            (apiBooking.status === "Rejected" || apiBooking.status === "AutoCancelled")
          ) {
            setRejectedBooking(apiBooking);
            setShowRejectionModal(true);
          }

          const vehicleName = 
            vehicle?.CarName || 
            vehicle?.carName || 
            vehicle?.bikeName || 
            `${apiBooking.vechileType} Vehicle`;
          
          const vehicleImage = 
            (vehicle?.carImages && vehicle.carImages[0]) ||
            (vehicle?.bikeImages && vehicle.bikeImages[0]) ||
            Auto;

          const price = 
            Number(apiBooking.pricePerKm) ||
            Number(apiBooking.pricePerHour) ||
            Number(apiBooking.pricePerDay) ||
            (apiBooking.totalPrice && apiBooking.totalHours 
              ? Number(apiBooking.totalPrice) / Number(apiBooking.totalHours) 
              : 0);

          return {
            id: apiBooking._id,
            vehicleId: apiBooking.VechileId,
            vehicleName: vehicleName,
            vehicleImage: vehicleImage,
            vehicleType: mapVehicleType(apiBooking.vechileType),
            customerName: apiBooking.contactName,
            contactNumber: apiBooking.contactNumber,
            bookingDate: formatApiDate(apiBooking.createdAt || apiBooking.FromDate),
            bookingTime: formatApiTime(apiBooking.FromTime),
            startDate: formatApiDate(apiBooking.FromDate),
            startTime: formatApiTime(apiBooking.FromTime),
            endDate: formatApiDate(apiBooking.ToDate),
            endTime: formatApiTime(apiBooking.ToTime),
            modelNo: apiBooking._id.slice(0, 10).toUpperCase(),
            status: newStatus,
            price: price,
          };
        });

        console.log("✅ Converted bookings:", convertedBookings);
        setBookings(convertedBookings);
      } else {
        console.log("📭 No bookings found");
        setBookings([]);
      }
    } catch (error: any) {
      console.error("❌ Error fetching bookings:", error);
      setBookings([]);
    } finally {
      setIsLoadingBookings(false);
      setIsRefreshing(false);
    }
  };

  const mapApiStatus = (apiStatus?: string): BookingStatus => {
    if (!apiStatus) return "Pending";
    
    const status = apiStatus.toLowerCase();
    
    if (status === "confirmed") return "Confirmed";
    if (status === "pending") return "Pending";
    if (status === "cancelled") return "Cancelled";
    if (status === "rejected") return "Cancelled";
    if (status === "autocancelled") return "AutoCancelled";
    if (status === "picked") return "Picked";
    if (status === "completed") return "Completed";
    
    return "Pending";
  };

  const formatApiDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr.trim());
      return !isNaN(date.getTime())
        ? date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
        : dateStr;
    } catch {
      return dateStr;
    }
  };

  const formatApiTime = (timeStr: string): string => {
    try {
      const [hours, minutes] = timeStr.split(".");
      const hour = parseInt(hours);
      const min = minutes || "00";
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      return `${displayHour.toString().padStart(2, '0')}:${min} ${period}`;
    } catch {
      return timeStr;
    }
  };

  const handleBookingClick = (booking: Booking) => {
    if (!booking.vehicleId) {
      alert("Vehicle details not found.");
      return;
    }

    const type = booking.vehicleType.toLowerCase();
    const bookingResponse = bookingsDataCache.find(item => item.booking._id === booking.id);
    const vehicleData = bookingResponse?.vehicle;

    navigate(`/booking-detail/${booking.vehicleId}`, {
      state: { 
        booking, 
        vehicleType: type, 
        openContact: false,
        vehicleData: vehicleData || {
          _id: booking.vehicleId,
          vehicleType: type,
          bikeName: booking.vehicleName,
          carName: booking.vehicleName,
          bikeImages: booking.vehicleImage ? [booking.vehicleImage] : [],
          carImages: booking.vehicleImage ? [booking.vehicleImage] : [],
          pricePerKm: booking.price,
          RentPerHour: booking.price
        }
      },
    });
  };

  const handleRefresh = () => fetchUserBookings();

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'autocancelled') {
      return 'bg-orange-50 text-orange-700';
    } else if (statusLower === 'cancelled') {
      return 'bg-red-50 text-red-600';
    } else if (statusLower === 'pending') {
      return 'bg-amber-50 text-amber-700';
    } else if (statusLower === 'confirmed') {
      return 'bg-green-50 text-green-700';
    } else if (statusLower === 'picked') {
      return 'bg-blue-50 text-blue-700';
    } else if (statusLower === 'completed') {
      return 'bg-purple-50 text-purple-700';
    }
    return 'bg-gray-100 text-gray-600';
  };

  const getFilteredBookings = () => {
    if (!searchText) return bookings;
    return bookings.filter(
      (b) =>
        b.vehicleName.toLowerCase().includes(searchText.toLowerCase()) ||
        b.contactNumber.includes(searchText) ||
        b.status.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredBookings = getFilteredBookings();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white px-8 py-6 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Left: My Bookings Heading */}
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight">
            My Bookings
          </h1>

          {/* Right: Search Bar */}
          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 rounded-[10px] border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-all ${
                isRefreshing 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#3D5AFE] text-white hover:bg-[#3651D4]'
              }`}
            >
              <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1000px] mx-auto px-8 py-8">
        {/* Bookings Count */}
        <div className="mb-6">
          <p className="text-[15px] font-medium text-gray-500">
            {filteredBookings.length} Bookings
          </p>
        </div>

        {/* Loading State */}
        {isLoadingBookings ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#3D5AFE] rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 text-base">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center">
            <p className="text-base text-gray-400">No bookings found</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                onClick={() => handleBookingClick(booking)}
                className="bg-white rounded-2xl shadow-sm border-2 border-transparent cursor-pointer transition-all duration-300 overflow-hidden min-h-[200px] hover:border-[#3D5AFE] hover:shadow-[0_4px_12px_rgba(61,90,254,0.15)]"
              >
                <div className="p-7">{/* Increased padding from p-6 to p-7 */}
                  <div className="flex gap-6">
                    {/* Vehicle Image - Increased Size */}
                    <div className="flex-shrink-0">
                      <div className="w-[200px] h-[200px] bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl overflow-hidden flex items-center justify-center">{/* Increased from 180x135 to 200x150 */}
                        {booking.vehicleImage && booking.vehicleImage !== Auto ? (
                          <img
                            src={booking.vehicleImage}
                            alt={booking.vehicleName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.parentElement!.innerHTML = `
                                <div class="text-center">
                                  <div class="w-12 h-12 mx-auto mb-2 bg-white rounded-lg flex items-center justify-center">
                                    <svg class="w-7 h-7 text-[#3D5AFE]" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                                    </svg>
                                  </div>
                                  <div class="text-xs font-semibold text-[#3D5AFE]">Rentongo</div>
                                  <div class="text-[10px] text-indigo-400">vehicle</div>
                                </div>
                              `;
                            }}
                          />
                        ) : (
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 bg-white rounded-lg flex items-center justify-center">
                              <svg className="w-7 h-7 text-[#3D5AFE]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                              </svg>
                            </div>
                            <div className="text-xs font-semibold text-[#3D5AFE]">Rentongo</div>
                            <div className="text-[10px] text-indigo-400">vehicle</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                      {/* Vehicle Name and Star Rating */}
                      <div className="mb-2.5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                            {booking.vehicleName}
                          </h3>
                          {booking.price > 0 && (
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                              <span className="text-sm font-semibold text-amber-500">4.5</span>
                            </div>
                          )}
                        </div>

                        {/* Price Below Name */}
                        <div className="text-lg font-bold text-gray-900">
                          ₹{booking.price.toFixed(0)}
                          <span className="text-sm font-medium text-gray-500">/km</span>
                        </div>
                      </div>

                      {/* Info Grid */}
                      <div className="flex flex-col gap-1.5 mb-2.5">
                        {/* Date Row */}
                        <div className="flex items-center gap-5">
                          <div className="flex items-center gap-2 min-w-[180px]">
                            <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                            </svg>
                            <span className="text-xs text-gray-500 font-medium">From:</span>
                            <span className="text-xs font-semibold text-gray-900">{booking.startDate}</span>
                          </div>
                          {booking.endDate && (
                            <div className="flex items-center gap-2">
                              <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                              </svg>
                              <span className="text-xs text-gray-500 font-medium">To:</span>
                              <span className="text-xs font-semibold text-gray-900">{booking.endDate}</span>
                            </div>
                          )}
                        </div>

                        {/* Time Row */}
                        <div className="flex items-center gap-5">
                          <div className="flex items-center gap-2 min-w-[180px]">
                            <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                              <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
                            </svg>
                            <span className="text-xs text-gray-500 font-medium">From:</span>
                            <span className="text-xs font-semibold text-gray-900">{booking.startTime}</span>
                          </div>
                          {booking.endTime && (
                            <div className="flex items-center gap-2">
                              <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                                <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
                              </svg>
                              <span className="text-xs text-gray-500 font-medium">To:</span>
                              <span className="text-xs font-semibold text-gray-900">{booking.endTime}</span>
                            </div>
                          )}
                        </div>

                        {/* Mobile Number */}
                        <div className="flex items-center gap-2">
                          <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                          </svg>
                          <span className="text-xs text-gray-500 font-medium">Mobile No:</span>
                          <span className="text-xs font-semibold text-gray-900">{booking.contactNumber}</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-medium">Status:</span>
                        <span className={`px-3 py-1 rounded-md text-[11px] font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status === "AutoCancelled" ? "Auto Cancelled" : booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && rejectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
                <X size={56} className="text-red-600" />
              </div>
            </div>
            <h2 className="text-[28px] font-bold text-center mb-4">
              Booking {rejectedBooking.status === "AutoCancelled" ? "Auto Cancelled" : "Rejected"}
            </h2>
            <p className="text-lg text-gray-600 text-center mb-6">
              {rejectedBooking.status === "AutoCancelled" 
                ? `Your booking for the ${rejectedBooking.vechileType} was automatically cancelled.`
                : `The owner rejected your booking for the ${rejectedBooking.vechileType}.`
              }
            </p>
            <div className="bg-gray-50 rounded-xl p-5 mb-6 text-sm text-gray-700 border border-gray-200">
              <div className="flex justify-between mb-3">
                <span className="font-semibold">Booking ID:</span>
                <span className="font-medium">{rejectedBooking._id.slice(0, 10)}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="font-semibold">Date:</span>
                <span className="font-medium">{formatApiDate(rejectedBooking.FromDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Time:</span>
                <span className="font-medium">{formatApiTime(rejectedBooking.FromTime)}</span>
              </div>
            </div>
            {rejectedBooking.rejectionReason && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm font-bold text-amber-800 mb-2">Reason:</p>
                <p className="text-sm text-amber-700">{rejectedBooking.rejectionReason}</p>
              </div>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectedBooking(null);
                }}
                className="flex-1 bg-gray-100 text-gray-700 font-bold py-3.5 px-6 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectedBooking(null);
                  navigate("/rental");
                }}
                className="flex-1 bg-gradient-to-r from-[#3D5AFE] to-[#536DFE] text-white font-bold py-3.5 px-6 rounded-xl hover:opacity-90 transition-opacity"
              >
                Find Another Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;