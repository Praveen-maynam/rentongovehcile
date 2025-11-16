 
// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Calendar, Clock, RefreshCw, X } from "lucide-react";
 
// // import { useBookingStore } from "../store/booking.store";
// // import { Booking } from "../types/booking";
// // import Auto from "../assets/images/Auto.png";
// // import apiService from "../services/api.service";
 
// // type VehicleType = "Car" | "Auto" | "Bike";
 
// // const mapVehicleType = (type: string | undefined): VehicleType => {
// //   if (!type) return "Car";
// //   const lower = type.toLowerCase();
// //   if (lower.includes("auto")) return "Auto";
// //   if (lower.includes("bike")) return "Bike";
// //   return "Car";
// // };
 
// // // API Configuration
// // const CORS_PROXIES = [
// //   "https://corsproxy.io/?",
// //   "https://api.codetabs.com/v1/proxy?quest=",
// // ];
// // const API_BASE_URL = "http://3.110.122.127:3000";
 
// // // Booking API Response Types
// // interface ApiBooking {
// //   _id: string;
// //   userId: string;
// //   vechileType: string;
// //   VechileId: string;
// //   pricePerKm: string;
// //   contactNumber: string;
// //   contactName: string;
// //   latitude: string;
// //   longitude: string;
// //   FromDate: string;
// //   ToDate: string;
// //   FromTime: string;
// //   ToTime: string;
// //   totalHours: string;
// //   totalPrice: string;
// //   status?: "Pending" | "Confirmed" | "Cancelled" | "Rejected" | "Completed" | "Picked";
// //   rejectionReason?: string;
// //   createdAt?: string;
// //   updatedAt?: string;
// // }
 
// // interface GetBookingsResponse {
// //   success: boolean;
// //   message: string;
// //   bookings: ApiBooking[];
// // }
 
// // const MyBookings: React.FC = () => {
// //   const navigate = useNavigate();
// //   const { bookings, addBooking, updateBookingStatus, setBookings } = useBookingStore();
// //   const [activeTab, setActiveTab] = useState<"Upcoming" | "Ongoing">("Upcoming");
// //   const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
 
// //   // New state for API integration
// //   const [isLoadingBookings, setIsLoadingBookings] = useState(false);
// //   const [isRefreshing, setIsRefreshing] = useState(false);
// //   const [apiError, setApiError] = useState<string>("");
// //   const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
// //   const [showRejectionModal, setShowRejectionModal] = useState(false);
// //   const [rejectedBooking, setRejectedBooking] = useState<ApiBooking | null>(null);
 
// //   // Fetch vehicle details to get image and name
// //   const fetchVehicleDetails = async (vehicleId: string, vehicleType: string) => {
// //     try {
// //       console.log(`🚗 Fetching vehicle details for ${vehicleType} ID: ${vehicleId}`);
      
// //       const endpoint = vehicleType.toLowerCase() === 'car' 
// //         ? `/getCarById/${vehicleId}`
// //         : vehicleType.toLowerCase() === 'bike'
// //         ? `/getBikeById/${vehicleId}`
// //         : `/getAutoById/${vehicleId}`;
      
// //       const response = await apiService.car.getCarById(vehicleId);
      
// //       if (response?.data) {
// //         const vehicleData = response.data;
// //         console.log(`✅ Vehicle details fetched:`, vehicleData);
        
// //         return {
// //           name: vehicleData.CarName || vehicleData.BikeName || vehicleData.AutoName || '',
// //           image: vehicleData.CarImage?.[0] || vehicleData.BikeImage?.[0] || vehicleData.AutoImage?.[0] || Auto,
// //         };
// //       }
      
// //       return null;
// //     } catch (error) {
// //       console.warn(`⚠️ Failed to fetch vehicle details:`, error);
// //       return null;
// //     }
// //   };

// //   // Fetch bookings on mount
// //   useEffect(() => {
// //     fetchUserBookings();
   
// //     // Auto-refresh every 60 seconds to check status updates (less aggressive to avoid rate limiting)
// //     const interval = setInterval(() => {
// //       fetchUserBookings(true); // Silent refresh
// //     }, 60000);
 
// //     return () => clearInterval(interval);
// //   }, []);
 
// //   // Fetch user bookings from API - Production Level with Retry
// //   const fetchUserBookings = async (silent = false, retryCount = 0) => {
// //     if (!silent) setIsLoadingBookings(true);
// //     setIsRefreshing(true);
// //     setApiError("");
 
// //     const MAX_RETRIES = 2;
// //     const RETRY_DELAY = 1000; // 1 second

// //     try {
// //       // Get userId from localStorage or use default
// //       const userId = localStorage.getItem('userId') || "68fe269b6f13375a65dc587a";
      
// //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// //       console.log(`📥 FETCHING USER BOOKINGS - START ${retryCount > 0 ? `(Retry ${retryCount}/${MAX_RETRIES})` : ''}`);
// //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// //       console.log("👤 User ID:", userId);
// //       console.log("🔄 Silent Mode:", silent);

// //       // Use apiService with built-in multi-strategy fallback
// //       const response = await apiService.booking.getAllBookings(userId);
      
// //       console.log("✅ API Response:", response);
      
// //       // Handle response format (could be direct data or wrapped in success)
// //       const data: GetBookingsResponse = response.data 
// //         ? response 
// //         : { success: true, message: "Success", bookings: response };

// //       if (data.success && data.bookings && Array.isArray(data.bookings)) {
// //         console.log(`📦 Found ${data.bookings.length} bookings from API`);
// //         console.log(`📊 Current bookings in store: ${bookings.length}`);
        
// //         // Convert API bookings to local format
// //         const convertedBookings: Booking[] = await Promise.all(
// //           data.bookings.map(async (apiBooking, index) => {
// //             console.log(`\n🔄 Processing Booking ${index + 1}:`, {
// //               bookingId: apiBooking._id,
// //               vehicleId: apiBooking.VechileId,
// //               vehicleType: apiBooking.vechileType,
// //               status: apiBooking.status,
// //               fromDate: apiBooking.FromDate,
// //               toDate: apiBooking.ToDate,
// //               fromTime: apiBooking.FromTime,
// //               toTime: apiBooking.ToTime,
// //             });

// //             const newStatus = mapApiStatus(apiBooking.status);
            
// //             // Check if this is a rejection notification
// //             const existingBooking = bookings.find(b => b.id === apiBooking._id);
// //             if (
// //               existingBooking &&
// //               existingBooking.status !== "Cancelled" && 
// //               newStatus === "Cancelled" && 
// //               apiBooking.status === "Rejected"
// //             ) {
// //               console.log("   ⚠️ Booking was rejected - will show modal");
// //               setRejectedBooking(apiBooking);
// //               setShowRejectionModal(true);
// //             }

// //             // Try to fetch vehicle details
// //             let vehicleData = null;
// //             try {
// //               vehicleData = await fetchVehicleDetails(apiBooking.VechileId, apiBooking.vechileType);
// //             } catch (error) {
// //               console.warn("   ⚠️ Failed to fetch vehicle details, using defaults");
// //             }

// //             // Return converted booking
// //             return {
// //               id: apiBooking._id,
// //               vehicleId: apiBooking.VechileId,
// //               vehicleName: vehicleData?.name || `${apiBooking.vechileType} Vehicle`,
// //               vehicleImage: vehicleData?.image || Auto,
// //               vehicleType: mapVehicleType(apiBooking.vechileType),
// //               customerName: apiBooking.contactName,
// //               bookingDate: new Date(
// //                 apiBooking.createdAt || apiBooking.FromDate
// //               ).toLocaleDateString("en-US"),
// //               bookingTime: new Date(
// //                 apiBooking.createdAt || apiBooking.FromDate
// //               ).toLocaleTimeString("en-US", {
// //                 hour: "2-digit",
// //                 minute: "2-digit",
// //               }),
// //               startDate: formatApiDate(apiBooking.FromDate),
// //               startTime: formatApiTime(apiBooking.FromTime),
// //               endDate: formatApiDate(apiBooking.ToDate),
// //               endTime: formatApiTime(apiBooking.ToTime),
// //               modelNo: apiBooking._id.slice(0, 10).toUpperCase(),
// //               status: newStatus,
// //               price: Number(apiBooking.totalPrice) / Number(apiBooking.totalHours) || Number(apiBooking.pricePerKm) || 0,
// //             };
// //           })
// //         );
        
// //         // Replace all bookings with API data (sync with backend)
// //         setBookings(convertedBookings);
// //         setLastSyncTime(new Date());
        
// //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// //         console.log("✅ FETCH COMPLETE - SUCCESS");
// //         console.log(`📊 API returned: ${data.bookings.length} bookings`);
// //         console.log(`📋 Now displaying: ${convertedBookings.length} bookings`);
// //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// //       } else {
// //         console.warn("⚠️ No bookings found in response");
// //         setApiError("No bookings found.");
// //       }
// //     } catch (error: any) {
// //       console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// //       console.error("❌ FETCH ERROR:");
// //       console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// //       console.error("Error Type:", error.constructor.name);
// //       console.error("Error Message:", error.message);
// //       console.error("Error Details:", error);
      
// //       // Retry logic with exponential backoff
// //       if (retryCount < MAX_RETRIES) {
// //         const delay = RETRY_DELAY * Math.pow(2, retryCount);
// //         console.log(`🔄 Retrying in ${delay}ms...`);
        
// //         await new Promise(resolve => setTimeout(resolve, delay));
// //         return fetchUserBookings(silent, retryCount + 1);
// //       }
      
// //       if (!silent) {
// //         const errorMessage = error.response?.data?.message 
// //           || error.message 
// //           || "Unable to fetch latest bookings. Showing cached data.";
// //         setApiError(errorMessage);
// //       }
// //     } finally {
// //       setIsLoadingBookings(false);
// //       setIsRefreshing(false);
// //     }
// //   };
 
// //   // Map API status to local status
// //   const mapApiStatus = (
// //     apiStatus?: string
// //   ): "Booked" | "Cancelled" | "Picked" | "Completed" => {
// //     switch (apiStatus) {
// //       case "Confirmed":
// //         return "Booked";
// //       case "Pending":
// //         return "Booked";
// //       case "Cancelled":
// //         return "Cancelled";
// //       case "Rejected":
// //         return "Cancelled"; // Map Rejected to Cancelled but we'll display differently
// //       case "Picked":
// //         return "Picked";
// //       case "Completed":
// //         return "Completed";
// //       default:
// //         return "Booked";
// //     }
// //   };
 
// //   // Format date from API (2025-12-02) to display format
// //   const formatApiDate = (dateStr: string): string => {
// //     try {
// //       const date = new Date(dateStr.trim());
// //       if (!isNaN(date.getTime())) {
// //         return date.toLocaleDateString("en-US", {
// //           month: "2-digit",
// //           day: "2-digit",
// //           year: "numeric",
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Date format error:", error);
// //     }
// //     return dateStr;
// //   };
 
// //   // Format time from API (1.00, 6.00) to display format
// //   const formatApiTime = (timeStr: string): string => {
// //     try {
// //       const [hours, minutes] = timeStr.split(".");
// //       const hour = parseInt(hours);
// //       const min = minutes || "00";
 
// //       const period = hour >= 12 ? "PM" : "AM";
// //       const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
 
// //       return `${displayHour}:${min} ${period}`;
// //     } catch (error) {
// //       console.error("Time format error:", error);
// //       return timeStr;
// //     }
// //   };
 
// //   // ✅ Categorize bookings - exclude rejected bookings from tabs
// //   const getBookingCategory = (booking: Booking): "Upcoming" | "Ongoing" | null => {
// //     // Hide cancelled/rejected bookings from tabs
// //     if (booking.status === "Cancelled") {
// //       return null;
// //     }
 
// //     const now = new Date();
// //     const startDateTime = new Date(`${booking.startDate} ${booking.startTime}`);
// //     const endDateTime = booking.endDate
// //       ? new Date(`${booking.endDate} ${booking.endTime || "23:59"}`)
// //       : new Date(startDateTime.getTime() + 24 * 60 * 60 * 1000);
 
// //     if (now < startDateTime) return "Upcoming";
// //     if (now >= startDateTime && now <= endDateTime) return "Ongoing";
// //     return "Upcoming";
// //   };
 
// //   const filteredBookings = bookings.filter((b) => {
// //     const category = getBookingCategory(b);
// //     return category === activeTab;
// //   });
 
// //   // ✅ Status Badge - show Confirmed for accepted, Rejected for rejected (Compact version)
// //   const getStatusBadge = (status: string, isRejected: boolean = false) => {
// //     const base =
// //       "inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition shadow-sm";
 
// //     if (isRejected || status === "Cancelled") {
// //       return (
// //         <div className={`${base} bg-red-100 text-red-700 border border-red-300`}>
// //           <span className="text-lg">❌</span>
// //           <span>Rejected</span>
// //         </div>
// //       );
// //     }
 
// //     switch (status) {
// //       case "Booked":
// //         return (
// //           <div className={`${base} bg-green-100 text-green-700 border border-green-300`}>
// //             <span className="text-lg">✅</span>
// //             <span>Confirmed</span>
// //           </div>
// //         );
// //       case "Picked":
// //         return (
// //           <div className={`${base} bg-yellow-100 text-yellow-700 border border-yellow-300`}>
// //             <span className="text-lg">🚗</span>
// //             <span>Vehicle Picked</span>
// //           </div>
// //         );
// //       case "Completed":
// //         return (
// //           <div className={`${base} bg-blue-100 text-blue-700 border border-blue-300`}>
// //             <span className="text-lg">✔️</span>
// //             <span>Completed</span>
// //           </div>
// //         );
// //       default:
// //         return (
// //           <div className={`${base} bg-gray-100 text-gray-700 border border-gray-300`}>
// //             <span>{status}</span>
// //           </div>
// //         );
// //     }
// //   };
 
// // const handleBookingClick = (booking: Booking) => {
// //   if (!booking.vehicleId) {
// //     alert("Vehicle details not found for this booking.");
// //     return;
// //   }

// //  navigate(`/booking-history/${booking.vehicleId}`, {
// //   state: { booking, vehicleType: booking.vehicleType, openContact: true },
// // });

           
// // };

// //   const handleRefresh = () => {
// //     fetchUserBookings();
// //   };
 
// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <div className="bg-white border-b sticky top-0 z-10">
// //         <div className="w-full px-4 py-4 flex items-center justify-between">
// //           <div>
// //             <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>
// //             {lastSyncTime && (
// //               <p className="text-xs text-gray-500 mt-1">
// //                 Last updated: {lastSyncTime.toLocaleTimeString()}
// //               </p>
// //             )}
// //           </div>
 
// //           <button
// //             onClick={handleRefresh}
// //             disabled={isRefreshing}
// //             className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition disabled:opacity-50"
// //           >
// //             <RefreshCw
// //               className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
// //             />
// //             <span className="text-sm font-medium">
// //               {isRefreshing ? "Syncing..." : "Refresh"}
// //             </span>
// //           </button>
// //         </div>
 
// //         {/* API Error Message */}
// //         {apiError && (
// //           <div className="px-4 pb-3">
// //             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
// //               <svg
// //                 className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
// //                 fill="currentColor"
// //                 viewBox="0 0 20 20"
// //               >
// //                 <path
// //                   fillRule="evenodd"
// //                   d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
// //                   clipRule="evenodd"
// //                 />
// //               </svg>
// //               <div className="flex-1">
// //                 <p className="text-sm text-yellow-800">{apiError}</p>
// //                 <button
// //                   onClick={handleRefresh}
// //                   className="text-xs text-yellow-700 hover:text-yellow-900 underline mt-1"
// //                 >
// //                   Try again
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
 
// //         {/* Tabs - Only Upcoming and Ongoing */}
// //         <div className="flex gap-4 px-4 border-b">
// //           <button
// //             onClick={() => setActiveTab("Upcoming")}
// //             className={`pb-3 px-4 font-semibold relative ${
// //               activeTab === "Upcoming"
// //                 ? "text-blue-600 border-b-2 border-blue-600"
// //                 : "text-gray-500 hover:text-gray-700"
// //             }`}
// //           >
// //             Upcoming
// //           </button>
 
// //           <button
// //             onClick={() => setActiveTab("Ongoing")}
// //             className={`pb-3 px-4 font-semibold relative ${
// //               activeTab === "Ongoing"
// //                 ? "text-blue-600 border-b-2 border-blue-600"
// //                 : "text-gray-500 hover:text-gray-700"
// //             }`}
// //           >
// //             Ongoing
// //           </button>
// //         </div>
// //       </div>
 
// //       {/* Loading State */}
// //       {isLoadingBookings && (
// //         <div className="flex items-center justify-center py-12">
// //           <div className="text-center">
// //             <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //             <p className="text-gray-600">Loading your bookings...</p>
// //           </div>
// //         </div>
// //       )}
 
// //       {/* ✅ Bookings List */}
// //       {!isLoadingBookings && (
// //         <div className="max-w-4xl ml-0 p-4 space-y-3">
// //           {filteredBookings.length ? (
// //             filteredBookings.map((booking) => (
// //               <div
// //                 key={booking.id}
// //                 onClick={() => handleBookingClick(booking)}
// //                 style={{ width: "1200px", height: "290px" }}
// //                 className={`bg-white rounded-lg overflow-hidden transition-all cursor-pointer flex relative ${
// //                   selectedBooking === booking.id
// //                     ? "ring-2 ring-blue-500 shadow-lg"
// //                     : "shadow hover:shadow-md"
// //                 }`}
// //               >
// //                 <div className="flex gap-4 p-4">
// //                   <div className="flex-shrink-0">
// //                     <img
// //                       src={booking.vehicleImage || Auto}
// //                       alt={booking.vehicleName}
// //                       style={{ width: "277px", height: "290px" }}
// //                       className="object-cover rounded-lg"
// //                     />
// //                   </div>
 
// //                   <div className="flex-1 min-w-0">
// //                     {/* Header with Vehicle Name and Booking ID */}
// //                     <div className="mb-3 flex items-start justify-between">
// //                       <div>
// //                         <h3 className="text-xl font-bold text-gray-900">
// //                           {booking.vehicleName}
// //                         </h3>
// //                         <p className="text-lg font-semibold text-blue-600 mt-1">
// //                           ₹{booking.price}/hr
// //                         </p>
// //                       </div>
// //                       <div className="text-right">
// //                         <p className="text-xs text-gray-500 uppercase tracking-wide">Booking ID</p>
// //                         <p className="text-sm font-bold text-gray-900 mt-0.5">
// //                           {(booking.id || "N/A").toString().slice(0, 12)}
// //                         </p>
// //                       </div>
// //                     </div>
 
// //                     {/* Status Badge - Prominent at top */}
// //                     <div className="mb-4">
// //                       {getStatusBadge(booking.status, booking.status === "Cancelled")}
// //                     </div>
 
// //                     {/* Date Range Section */}
// //                     <div className="bg-gray-50 rounded-lg p-3 mb-3">
// //                       <div className="grid grid-cols-2 gap-3">
// //                         {/* From Date */}
// //                         <div>
// //                           <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
// //                             <Calendar className="w-3 h-3" />
// //                             <span className="uppercase font-medium">From Date</span>
// //                           </div>
// //                           <p className="text-sm font-semibold text-gray-900">
// //                             {booking.startDate}
// //                           </p>
// //                         </div>
                        
// //                         {/* To Date */}
// //                         {booking.endDate && (
// //                           <div>
// //                             <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
// //                               <Calendar className="w-3 h-3" />
// //                               <span className="uppercase font-medium">To Date</span>
// //                             </div>
// //                             <p className="text-sm font-semibold text-gray-900">
// //                               {booking.endDate}
// //                             </p>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
 
// //                     {/* Time Range Section */}
// //                     <div className="bg-blue-50 rounded-lg p-3">
// //                       <div className="grid grid-cols-2 gap-3">
// //                         {/* From Time */}
// //                         <div>
// //                           <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
// //                             <Clock className="w-3 h-3" />
// //                             <span className="uppercase font-medium">From Time</span>
// //                           </div>
// //                           <p className="text-sm font-semibold text-gray-900">
// //                             {booking.startTime}
// //                           </p>
// //                         </div>
                        
// //                         {/* To Time */}
// //                         {booking.endTime && (
// //                           <div>
// //                             <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
// //                               <Clock className="w-3 h-3" />
// //                               <span className="uppercase font-medium">To Time</span>
// //                             </div>
// //                             <p className="text-sm font-semibold text-gray-900">
// //                               {booking.endTime}
// //                             </p>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
 
// //                     {/* Status update indicator */}
// //                     {isRefreshing && (
// //                       <div className="absolute top-4 right-4">
// //                         <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <div className="text-center py-12">
// //               <div className="mb-4">
// //                 <svg
// //                   className="w-16 h-16 mx-auto text-gray-400"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth={1.5}
// //                     d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
// //                   />
// //                 </svg>
// //               </div>
// //               <p className="text-gray-500 mb-4">
// //                 {bookings.length === 0
// //                   ? "No bookings yet. Start by booking a vehicle!"
// //                   : `No ${activeTab.toLowerCase()} bookings found.`}
// //               </p>
// //               <button
// //                 onClick={() => navigate("/rental")}
// //                 className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
// //               >
// //                 Browse Vehicles to Book
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       )}
 
// //       {/* Rejection Modal */}
// //       {showRejectionModal && rejectedBooking && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in slide-in-from-bottom-4">
// //             <div className="flex justify-center mb-6">
// //               <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
// //                 <X className="w-12 h-12 text-red-500" />
// //               </div>
// //             </div>
 
// //             <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
// //               Booking Rejected
// //             </h2>
// //             <p className="text-gray-600 text-center mb-6">
// //               Unfortunately, the owner has rejected your booking request for the <strong>{rejectedBooking.vechileType}</strong>.
// //             </p>
 
// //             <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
// //               <div className="flex justify-between mb-2">
// //                 <span className="font-medium">Booking ID:</span>
// //                 <span>{rejectedBooking._id.slice(0, 10)}</span>
// //               </div>
// //               <div className="flex justify-between mb-2">
// //                 <span className="font-medium">Date:</span>
// //                 <span>{formatApiDate(rejectedBooking.FromDate)}</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="font-medium">Time:</span>
// //                 <span>{formatApiTime(rejectedBooking.FromTime)}</span>
// //               </div>
// //             </div>
 
// //             {rejectedBooking.rejectionReason && (
// //               <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
// //                 <p className="text-sm font-medium text-yellow-900 mb-1">Reason:</p>
// //                 <p className="text-sm text-yellow-800">{rejectedBooking.rejectionReason}</p>
// //               </div>
// //             )}
 
// //             <div className="flex gap-3">
// //               <button
// //                 onClick={() => {
// //                   setShowRejectionModal(false);
// //                   setRejectedBooking(null);
// //                 }}
// //                 className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
// //               >
// //                 Close
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   setShowRejectionModal(false);
// //                   setRejectedBooking(null);
// //                   navigate("/rental");
// //                 }}
// //                 className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
// //               >
// //                 Find Another Vehicle
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };
 
// // export default MyBookings;
 





// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Calendar, Clock, RefreshCw, X } from "lucide-react";
// // import { useBookingStore } from "../store/booking.store";
// // import { Booking } from "../types/booking";
// // import Auto from "../assets/images/Auto.png";
// // import apiService from "../services/api.service";

// // type VehicleType = "Car" | "Auto" | "Bike";

// // const mapVehicleType = (type: string | undefined): VehicleType => {
// //   if (!type) return "Car";
// //   const lower = type.toLowerCase();
// //   if (lower.includes("auto")) return "Auto";
// //   if (lower.includes("bike")) return "Bike";
// //   return "Car";
// // };

// // interface ApiBooking {
// //   _id: string;
// //   userId: string;
// //   vechileType: string;
// //   VechileId: string;
// //   pricePerKm: string;
// //   contactNumber: string;
// //   contactName: string;
// //   latitude: string;
// //   longitude: string;
// //   FromDate: string;
// //   ToDate: string;
// //   FromTime: string;
// //   ToTime: string;
// //   totalHours: string;
// //   totalPrice: string;
// //   status?: "Pending" | "Confirmed" | "Cancelled" | "Rejected" | "Completed" | "Picked";
// //   rejectionReason?: string;
// //   createdAt?: string;
// //   updatedAt?: string;
// // }

// // interface GetBookingsResponse {
// //   success: boolean;
// //   message: string;
// //   bookings: ApiBooking[];
// // }

// // const MyBookings: React.FC = () => {
// //   const navigate = useNavigate();
// //   const { bookings, setBookings } = useBookingStore();
// //   const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
// //   const [isLoadingBookings, setIsLoadingBookings] = useState(false);
// //   const [isRefreshing, setIsRefreshing] = useState(false);
// //   const [apiError, setApiError] = useState<string>("");
// //   const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
// //   const [showRejectionModal, setShowRejectionModal] = useState(false);
// //   const [rejectedBooking, setRejectedBooking] = useState<ApiBooking | null>(null);
// // const fetchVehicleDetails = async (vehicleId: string, vehicleType: string) => {
// //   try {
// //     console.log("🚗 Fetching vehicle details", { vehicleId, vehicleType });

// //     let response;
// //     const type = vehicleType?.toLowerCase();

// //     if (type === "car") {
// //       response = await apiService.car.getCarById(vehicleId);
// //     } else if (type === "bike") {
// //       response = await apiService.bike.getBikeById(vehicleId);
  
// //     } else {
// //       console.warn("❌ Unknown vehicle type:", vehicleType);
// //       return null;
// //     }

// //     console.log("✅ API Response:", response);

// //     const vehicleData = response?.data || response; // handle both axios and custom responses
// //     if (!vehicleData) {
// //       console.warn("⚠️ No vehicle data found in response.");
// //       return null;
// //     }

// // const name =
// //   vehicleData.CarName ||
// //   vehicleData.carName ||
// //   vehicleData.BikeName ||
// //   vehicleData.bikeName ||
// //   vehicleData.AutoName ||
// //   vehicleData.autoName ||
// //   vehicleData.name ||
// //   "Unknown Vehicle";


// //     const image =
// //       (vehicleData.carImages && vehicleData.carImages[0]) ||
// //       (vehicleData.bikeImages && vehicleData.bikeImages[0]) ||
// //       (vehicleData.autoImages && vehicleData.autoImages[0]) ||
// //       vehicleData.image ||
// //       Auto;

// //     console.log("✅ Normalized Vehicle:", { name, image });

// //     return { name, image };
// //   } catch (error) {
// //     console.error("❌ Vehicle fetch error:", error);
// //     return null;
// //   }
// // };


// //   useEffect(() => {
// //     fetchUserBookings();
// //     const interval = setInterval(() => fetchUserBookings(true), 60000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const fetchUserBookings = async (silent = false, retryCount = 0) => {
// //     if (!silent) setIsLoadingBookings(true);
// //     setIsRefreshing(true);
// //     setApiError("");

// //     const MAX_RETRIES = 2;
// //     const RETRY_DELAY = 1000;
// //     try {
// //       const userId = localStorage.getItem("userId") || "68fe269b6f13375a65dc587a";
// //       const response = await apiService.booking.getAllBookings(userId);
// //       const data: GetBookingsResponse = response.data
// //         ? response
// //         : { success: true, message: "Success", bookings: response };

// //       if (data.success && data.bookings?.length) {
// //         const convertedBookings: Booking[] = await Promise.all(
// //           data.bookings.map(async (apiBooking) => {
// //             const newStatus = mapApiStatus(apiBooking.status);
// //             const existingBooking = bookings.find((b) => b.id === apiBooking._id);
// //             if (
// //               existingBooking &&
// //               existingBooking.status !== "Cancelled" &&
// //               newStatus === "Cancelled" &&
// //               apiBooking.status === "Rejected"
// //             ) {
// //               setRejectedBooking(apiBooking);
// //               setShowRejectionModal(true);
// //             }

// //             const vehicleData = await fetchVehicleDetails(apiBooking.VechileId, apiBooking.vechileType);
// //             return {
// //               id: apiBooking._id,
// //               vehicleId: apiBooking.VechileId,
// //               vehicleName: vehicleData?.name || `${apiBooking.vechileType} Vehicle`,
// //               vehicleImage: vehicleData?.image || Auto,
// //               vehicleType: mapVehicleType(apiBooking.vechileType),
// //               customerName: apiBooking.contactName,
// //               bookingDate: new Date(apiBooking.createdAt || apiBooking.FromDate).toLocaleDateString(),
// //               bookingTime: new Date(apiBooking.createdAt || apiBooking.FromDate).toLocaleTimeString(),
// //               startDate: formatApiDate(apiBooking.FromDate),
// //               startTime: formatApiTime(apiBooking.FromTime),
// //               endDate: formatApiDate(apiBooking.ToDate),
// //               endTime: formatApiTime(apiBooking.ToTime),
// //               modelNo: apiBooking._id.slice(0, 10).toUpperCase(),
// //               status: newStatus,
// //               price:
// //                 Number(apiBooking.totalPrice) / Number(apiBooking.totalHours) ||
// //                 Number(apiBooking.pricePerKm) ||
// //                 0,
// //             };
// //           })
// //         );
// //         setBookings(convertedBookings);
// //         setLastSyncTime(new Date());
// //       } else {
// //         setApiError("No bookings found.");
// //       }
// //     } catch (error: any) {
// //       if (retryCount < MAX_RETRIES) {
// //         await new Promise((res) => setTimeout(res, RETRY_DELAY * Math.pow(2, retryCount)));
// //         return fetchUserBookings(silent, retryCount + 1);
// //       }
// //       setApiError(error.message || "Unable to fetch bookings.");
// //     } finally {
// //       setIsLoadingBookings(false);
// //       setIsRefreshing(false);
// //     }
// //   };

// //  const mapApiStatus = (
// //   apiStatus?: string
// // ): "Pending" | "Confirmed" | "Rejected" | "AutoCancelled" | "Completed" | "Picked" | "Cancelled" => {
// //   switch (apiStatus) {
// //     case "Pending":
// //       return "Pending";
// //     case "Confirmed":
// //       return "Confirmed";
// //     case "Rejected":
// //       return "Rejected";
// //     case "AutoCancelled":
// //       return "AutoCancelled";
// //     case "Completed":
// //       return "Completed";
// //     case "Picked":
// //       return "Picked";
// //     case "Cancelled":
// //       return "Cancelled";
// //     default:
// //       return "Pending";
// //   }
// // };

// //   const formatApiDate = (dateStr: string): string => {
// //     try {
// //       const date = new Date(dateStr.trim());
// //       return !isNaN(date.getTime())
// //         ? date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })
// //         : dateStr;
// //     } catch {
// //       return dateStr;
// //     }
// //   };

// //   const formatApiTime = (timeStr: string): string => {
// //     try {
// //       const [hours, minutes] = timeStr.split(".");
// //       const hour = parseInt(hours);
// //       const min = minutes || "00";
// //       const period = hour >= 12 ? "PM" : "AM";
// //       const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
// //       return `${displayHour}:${min} ${period}`;
// //     } catch {
// //       return timeStr;
// //     }
// //   };

// // const handleBookingClick = (booking: Booking) => {
// //   if (!booking.vehicleId) return alert("Vehicle details not found.");

// //   const type = booking.vehicleType.toLowerCase(); // "car", "bike", "auto"

// //   navigate(`/booking-history/${booking.vehicleId}`, {
// //     state: { booking, vehicleType: type, openContact: false },
// //   });
// // };



// //   const handleRefresh = () => fetchUserBookings();
// // const getStatusBadge = (status: string) => {
// //   const base =
// //     "inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm";

// //   switch (status) {
// //     case "Pending":
// //       return <div className={`${base} bg-yellow-100 text-yellow-700`}>🕓 Pending</div>;
// //     case "Confirmed":
// //       return <div className={`${base} bg-green-100 text-green-700`}>✅ Confirmed</div>;
// //     case "Rejected":
// //       return <div className={`${base} bg-red-100 text-red-700`}>❌ Rejected</div>;
// //     case "AutoCancelled":
// //       return <div className={`${base} bg-gray-100 text-gray-600`}>⚠️ Auto-Cancelled</div>;
// //     case "Completed":
// //       return <div className={`${base} bg-blue-100 text-blue-700`}>✔️ Completed</div>;
// //     case "Picked":
// //       return <div className={`${base} bg-purple-100 text-purple-700`}>🚗 Ride Started</div>;
// //     default:
// //       return <div className={`${base} bg-gray-100 text-gray-700`}>{status}</div>;
// //   }
// // };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <div className="bg-white border-b sticky top-0 z-10">
// //         <div className="w-full px-4 py-4 flex items-center justify-between">
// //           <div>
// //             <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>
// //             {lastSyncTime && <p className="text-xs text-gray-500">Last updated: {lastSyncTime.toLocaleTimeString()}</p>}
// //           </div>
// //           <button
// //             onClick={handleRefresh}
// //             disabled={isRefreshing}
// //             className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
// //           >
// //             <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
// //             <span>{isRefreshing ? "Syncing..." : "Refresh"}</span>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Loading */}
// //       {isLoadingBookings && (
// //         <div className="flex items-center justify-center py-12 text-gray-600">Loading your bookings...</div>
// //       )}

// //       {/* Bookings List */}
// //       {!isLoadingBookings && (
// //         <div className="max-w-4xl ml-0 p-4 space-y-3">
// //           {bookings.length ? (
// //             bookings.map((booking) => (
// //               <div
// //                 key={booking.id}
// //                 onClick={() => handleBookingClick(booking)}
// //                 style={{ width: "1200px", height: "290px" }}
// //                 className={`bg-white rounded-lg overflow-hidden flex cursor-pointer transition ${
// //                   selectedBooking === booking.id ? "ring-2 ring-blue-500 shadow-lg" : "shadow hover:shadow-md"
// //                 }`}
// //               >
// //                 <div className="flex gap-4 p-4">
// //                   <img
// //                     src={booking.vehicleImage || Auto}
// //                     alt={booking.vehicleName}
// //                     style={{ width: "277px", height: "290px" }}
// //                     className="object-cover rounded-lg"
// //                   />
// //                   <div className="flex-1">
// //                     <div className="flex justify-between items-start mb-3">
// //                       <div>
// //                         <h3 className="text-xl font-bold text-gray-900">{booking.vehicleName}</h3>
// //                         <p className="text-lg font-semibold text-blue-600 mt-1">₹{booking.price}/hr</p>
// //                       </div>
// //                       <div className="text-right text-sm text-gray-500">
// //                         <p className="uppercase">Booking ID</p>
// //                         <p className="font-bold text-gray-900">{(booking.id || "N/A").slice(0, 12)}</p>
// //                       </div>
// //                     </div>
// //                  <div className="mb-4">{getStatusBadge(booking.status)}</div>

// //                     <div className="bg-gray-50 rounded-lg p-3 mb-3 grid grid-cols-2 gap-3">
// //                       <div>
// //                         <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
// //                           <Calendar className="w-3 h-3" /> From Date
// //                         </div>
// //                         <p className="text-sm font-semibold">{booking.startDate}</p>
// //                       </div>
// //                       <div>
// //                         <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
// //                           <Calendar className="w-3 h-3" /> To Date
// //                         </div>
// //                         <p className="text-sm font-semibold">{booking.endDate}</p>
// //                       </div>
// //                     </div>
// //                     <div className="bg-blue-50 rounded-lg p-3 grid grid-cols-2 gap-3">
// //                       <div>
// //                         <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
// //                           <Clock className="w-3 h-3" /> From Time
// //                         </div>
// //                         <p className="text-sm font-semibold">{booking.startTime}</p>
// //                       </div>
// //                       <div>
// //                         <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
// //                           <Clock className="w-3 h-3" /> To Time
// //                         </div>
// //                         <p className="text-sm font-semibold">{booking.endTime}</p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <div className="text-center py-12">
// //               <p className="text-gray-500 mb-4">No bookings found. Start by booking a vehicle!</p>
// //               <button
// //                 onClick={() => navigate("/rental")}
// //                 className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white px-6 py-3 rounded-lg font-semibold"
// //               >
// //                 Browse Vehicles
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* Rejection Modal */}
// //       {showRejectionModal && rejectedBooking && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
// //             <div className="flex justify-center mb-6">
// //               <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
// //                 <X className="w-12 h-12 text-red-500" />
// //               </div>
// //             </div>
// //             <h2 className="text-2xl font-bold text-center mb-3">Booking Rejected</h2>
// //             <p className="text-gray-600 text-center mb-6">
// //               The owner rejected your booking for the <strong>{rejectedBooking.vechileType}</strong>.
// //             </p>
// //             <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
// //               <div className="flex justify-between mb-2">
// //                 <span className="font-medium">Booking ID:</span>
// //                 <span>{rejectedBooking._id.slice(0, 10)}</span>
// //               </div>
// //               <div className="flex justify-between mb-2">
// //                 <span className="font-medium">Date:</span>
// //                 <span>{formatApiDate(rejectedBooking.FromDate)}</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="font-medium">Time:</span>
// //                 <span>{formatApiTime(rejectedBooking.FromTime)}</span>
// //               </div>
// //             </div>
// //             {rejectedBooking.rejectionReason && (
// //               <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
// //                 <p className="text-sm font-medium text-yellow-900 mb-1">Reason:</p>
// //                 <p className="text-sm text-yellow-800">{rejectedBooking.rejectionReason}</p>
// //               </div>
// //             )}
// //             <div className="flex gap-3">
// //               <button
// //                 onClick={() => {
// //                   setShowRejectionModal(false);
// //                   setRejectedBooking(null);
// //                 }}
// //                 className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200"
// //               >
// //                 Close
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   setShowRejectionModal(false);
// //                   setRejectedBooking(null);
// //                   navigate("/rental");
// //                 }}
// //                 className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg"
// //               >
// //                 Find Another Vehicle
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default MyBookings;





// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { Calendar, Clock, RefreshCw, X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// // ============================================
// // TYPES & INTERFACES
// // ============================================
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
//   status?: 'Pending' | 'Confirmed' | 'Cancelled' | 'Rejected';
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface BookingContextType {
//   pendingBookings: ApiBooking[];
//   showPopup: boolean;
//   currentBooking: ApiBooking | null;
//   acceptBooking: (bookingId: string) => Promise<void>;
//   rejectBooking: (bookingId: string) => Promise<void>;
//   closePopup: () => void;
// }

// // ============================================
// // NOTIFICATION SOUND
// // ============================================
// const playNotificationSound = () => {
//   try {
//     const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();
    
//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);
    
//     oscillator.frequency.value = 800;
//     oscillator.type = 'sine';
    
//     gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
//     gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
//     oscillator.start(audioContext.currentTime);
//     oscillator.stop(audioContext.currentTime + 0.5);
//   } catch (e) {
//     console.log('Audio not supported');
//   }
// };

// // ============================================
// // BOOKING CONTEXT WITH API INTEGRATION
// // ============================================
// const BookingContext = createContext<BookingContextType | null>(null);

// export const useBookings = () => {
//   const context = useContext(BookingContext);
//   if (!context) throw new Error('useBookings must be used within BookingProvider');
//   return context;
// };

// const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [pendingBookings, setPendingBookings] = useState<ApiBooking[]>([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentBooking, setCurrentBooking] = useState<ApiBooking | null>(null);
//   const [previousBookingIds, setPreviousBookingIds] = useState<Set<string>>(new Set());

//   const OWNER_ID = '68ff377085e67372e72d1f39';
//   const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3ODFiNWUxLWZhM2YtNGQ5MS05MmIzLTBkOWFlZTk2ZTQ1ZSIsIm9yZ2FuaXphdGlvbl9pZCI6ImY5ZGU1MTcxLTVlMzAtNGU0Mi05YzIwLWQzOGQ4NjVlNjMxOSIsImlhdCI6MTc2MTY0MTY0NSwiZXhwIjoxNzYxNzI4MDQ1fQ.cQ5WztceBwvFswTqOaeV6UOJmABgNprBzeNRynwwQi4';

//   const fetchPendingBookings = async () => {
//     try {
//       const response = await fetch(
//         `http://3.110.122.127:3000/getPendingBookingsOfOwner/${OWNER_ID}`
//       );
      
//       const data = await response.json();
//       const bookings = Array.isArray(data) ? data : data.bookings || [];

//       const newBookings = bookings.filter((b: ApiBooking) => !previousBookingIds.has(b._id));

// const currentIds: Set<string> = new Set<string>(
//   bookings.map((b: any) => String(b._id))
// );

      
//       if (newBookings.length > 0 && previousBookingIds.size > 0) {
//         playNotificationSound();
//         setCurrentBooking(newBookings[0]);
//         setShowPopup(true);
//       }

//       setPendingBookings(bookings);
//       setPreviousBookingIds(currentIds);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPendingBookings();
//     const interval = setInterval(fetchPendingBookings, 15000);
//     return () => clearInterval(interval);
//   }, [previousBookingIds]);

//   const acceptBooking = async (bookingId: string) => {
//     try {
//       const myHeaders = new Headers();
//       myHeaders.append('Authorization', `Bearer ${AUTH_TOKEN}`);

//       const response = await fetch(
//         `http://3.110.122.127:3000/confirmBooking/${bookingId}/conform`,
//         {
//           method: 'POST',
//           headers: myHeaders,
//         }
//       );

//       if (!response.ok) throw new Error('Failed to accept booking');

//       setPendingBookings(prev => prev.filter(b => b._id !== bookingId));
//       setShowPopup(false);
//       setCurrentBooking(null);
      
//       setTimeout(fetchPendingBookings, 1000);
//     } catch (error) {
//       console.error('Error accepting booking:', error);
//       alert('Failed to accept booking');
//     }
//   };

//   const rejectBooking = async (bookingId: string) => {
//     try {
//       const response = await fetch(
//         `http://3.110.122.127:3000/updateBooking/${bookingId}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ status: 'Rejected' })
//         }
//       );

//       if (!response.ok) throw new Error('Failed to reject booking');

//       setPendingBookings(prev => prev.filter(b => b._id !== bookingId));
//       setShowPopup(false);
//       setCurrentBooking(null);
      
//       setTimeout(fetchPendingBookings, 1000);
//     } catch (error) {
//       console.error('Error rejecting booking:', error);
//       alert('Failed to reject booking');
//     }
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <BookingContext.Provider
//       value={{
//         pendingBookings,
//         showPopup,
//         currentBooking,
//         acceptBooking,
//         rejectBooking,
//         closePopup,
//       }}
//     >
//       {children}
//     </BookingContext.Provider>
//   );
// };

// // ============================================
// // OWNER BOOKING ACCEPTANCE POPUP
// // ============================================
// const OwnerBookingPopup: React.FC = () => {
//   const { showPopup, currentBooking, acceptBooking, rejectBooking, closePopup } = useBookings();
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleAccept = async () => {
//     if (!currentBooking || isProcessing) return;
//     setIsProcessing(true);
//     await acceptBooking(currentBooking._id);
//     setIsProcessing(false);
//   };

//   const handleReject = async () => {
//     if (!currentBooking || isProcessing) return;
//     setIsProcessing(true);
//     await rejectBooking(currentBooking._id);
//     setIsProcessing(false);
//   };

//   if (!showPopup || !currentBooking) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closePopup} />
//       <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg animate-in">
//         <div className="flex justify-center mb-6">
//           <div className="relative">
//             {[0, 1, 2].map((i) => (
//               <div
//                 key={i}
//                 className="absolute inset-0 rounded-full border-2 border-blue-500"
//                 style={{
//                   width: `${100 + i * 30}px`,
//                   height: `${100 + i * 30}px`,
//                   left: `${-15 * i}px`,
//                   top: `${-15 * i}px`,
//                   opacity: 0.3 - i * 0.1,
//                   animation: `pulse 2s infinite ${i * 0.2}s`,
//                 }}
//               />
//             ))}
//             <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-900 to-blue-500 flex items-center justify-center">
//               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
//                 <rect x="1" y="3" width="15" height="13" />
//                 <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
//                 <circle cx="5.5" cy="18.5" r="2.5" />
//                 <circle cx="18.5" cy="18.5" r="2.5" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <h2 className="text-3xl font-bold text-center mb-6">New Booking Request!</h2>

//         <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
//           <div className="flex justify-between">
//             <span className="text-gray-600">Customer:</span>
//             <span className="font-semibold">{currentBooking.contactName}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Vehicle Type:</span>
//             <span className="font-semibold">{currentBooking.vechileType}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">From:</span>
//             <span className="font-semibold">{new Date(currentBooking.FromDate).toLocaleDateString()}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">To:</span>
//             <span className="font-semibold">{new Date(currentBooking.ToDate).toLocaleDateString()}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Total Price:</span>
//             <span className="font-semibold text-green-600">₹{currentBooking.totalPrice}</span>
//           </div>
//         </div>

//         <div className="space-y-3">
//           <button
//             onClick={handleAccept}
//             disabled={isProcessing}
//             className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
//           >
//             {isProcessing ? 'Processing...' : '✓ Accept Booking'}
//           </button>
//           <button
//             onClick={handleReject}
//             disabled={isProcessing}
//             className="w-full bg-white border-2 border-red-500 text-red-600 font-bold py-4 rounded-xl hover:bg-red-50 transition-all disabled:opacity-50"
//           >
//             {isProcessing ? 'Processing...' : '✗ Reject Booking'}
//           </button>
//         </div>

//         <button onClick={closePopup} className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700">
//           Close
//         </button>
//       </div>

//       <style>{`
//         @keyframes pulse {
//           0%, 100% { transform: scale(0.9); opacity: 0.3; }
//           50% { transform: scale(1.05); opacity: 0; }
//         }
//         .animate-in {
//           animation: fadeIn 0.3s ease-out;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }
//       `}</style>
//     </div>
//   );
// };

// // ============================================
// // CUSTOMER MY BOOKINGS PAGE
// // ============================================
// const CustomerBookings: React.FC = () => {
//   const [bookings, setBookings] = useState<ApiBooking[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const USER_ID = '68ff377085e67372e72d1f39';

//   const fetchBookings = async (silent = false) => {
//     if (!silent) setIsLoading(true);
//     setIsRefreshing(true);

//     try {
//       const response = await fetch(
//         `http://3.110.122.127:3000/getAllBookings?userId=${USER_ID}`
//       );
      
//       const data = await response.json();
//       const bookingList = Array.isArray(data) ? data : data.bookings || [];
//       setBookings(bookingList);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     } finally {
//       setIsLoading(false);
//       setIsRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//     const interval = setInterval(() => fetchBookings(true), 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const getStatusBadge = (status: string = 'Pending') => {
//     const badges = {
//       Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: '⏳', label: 'Pending' },
//       Confirmed: { bg: 'bg-green-100', text: 'text-green-700', icon: '✓', label: 'Confirmed' },
//       Rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: '✗', label: 'Rejected' },
//       Cancelled: { bg: 'bg-gray-100', text: 'text-gray-600', icon: '⊘', label: 'Cancelled' },
//     };

//     const badge = badges[status as keyof typeof badges] || badges.Pending;

//     return (
//       <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${badge.bg} ${badge.text}`}>
//         <span>{badge.icon}</span>
//         <span>{badge.label}</span>
//       </div>
//     );
//   };

//   const isClickable = (status: string = 'Pending') => {
//     return status === 'Confirmed';
//   };

//   const handleBookingClick = (booking: ApiBooking) => {
//     if (isClickable(booking.status)) {
//       alert(`Opening details for booking: ${booking._id}\nVehicle: ${booking.vechileType}\nStatus: ${booking.status}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="bg-white border-b sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
//           <button
//             onClick={() => fetchBookings()}
//             disabled={isRefreshing}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
//           >
//             <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//             <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
//           </button>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-4">
//         {isLoading ? (
//           <div className="text-center py-12 text-gray-600">Loading bookings...</div>
//         ) : bookings.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500 mb-4">No bookings yet</p>
//             <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
//               Book a Vehicle
//             </button>
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {bookings.map((booking) => (
//               <div
//                 key={booking._id}
//                 onClick={() => handleBookingClick(booking)}
//                 className={`bg-white rounded-xl shadow p-6 transition-all ${
//                   isClickable(booking.status)
//                     ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]'
//                     : 'cursor-not-allowed opacity-75'
//                 }`}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">{booking.vechileType}</h3>
//                     <p className="text-sm text-gray-500">ID: {booking._id.slice(0, 12)}...</p>
//                   </div>
//                   {getStatusBadge(booking.status)}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div className="bg-gray-50 rounded-lg p-3">
//                     <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
//                       <Calendar className="w-3 h-3" /> From
//                     </div>
//                     <p className="font-semibold">{new Date(booking.FromDate).toLocaleDateString()}</p>
//                     <p className="text-sm text-gray-600">{booking.FromTime}</p>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-3">
//                     <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
//                       <Calendar className="w-3 h-3" /> To
//                     </div>
//                     <p className="font-semibold">{new Date(booking.ToDate).toLocaleDateString()}</p>
//                     <p className="text-sm text-gray-600">{booking.ToTime}</p>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center pt-4 border-t">
//                   <div>
//                     <p className="text-sm text-gray-600">Total Amount</p>
//                     <p className="text-2xl font-bold text-green-600">₹{booking.totalPrice}</p>
//                   </div>
//                   {isClickable(booking.status) && (
//                     <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
//                       View Details →
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ============================================
// // MY BOOKINGS PAGE (EXPORT THIS)
// // ============================================
// const MyBookings: React.FC = () => {
//   return (
//     <BookingProvider>
//       <CustomerBookings />
//       <OwnerBookingPopup />
//     </BookingProvider>
//   );
// };

// export default MyBookings;








// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { Calendar, Clock, RefreshCw, X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

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
//   status?: 'Pending' | 'Confirmed' | 'Cancelled' | 'Rejected';
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface BookingContextType {
//   pendingBookings: ApiBooking[];
//   showPopup: boolean;
//   currentBooking: ApiBooking | null;
//   acceptBooking: (bookingId: string) => Promise<void>;
//   rejectBooking: (bookingId: string) => Promise<void>;
//   closePopup: () => void;
// }


// const playNotificationSound = () => {
//   try {
//     const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();
    
//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);
    
//     oscillator.frequency.value = 800;
//     oscillator.type = 'sine';
    
//     gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
//     gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
//     oscillator.start(audioContext.currentTime);
//     oscillator.stop(audioContext.currentTime + 0.5);
//   } catch (e) {
//     console.log('Audio not supported');
//   }
// };


// const BookingContext = createContext<BookingContextType | null>(null);

// export const useBookings = () => {
//   const context = useContext(BookingContext);
//   if (!context) throw new Error('useBookings must be used within BookingProvider');
//   return context;
// };

// const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [pendingBookings, setPendingBookings] = useState<ApiBooking[]>([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentBooking, setCurrentBooking] = useState<ApiBooking | null>(null);
//   const [previousBookingIds, setPreviousBookingIds] = useState<Set<string>>(new Set());

//   const OWNER_ID = '68ff377085e67372e72d1f39';
//   const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3ODFiNWUxLWZhM2YtNGQ5MS05MmIzLTBkOWFlZTk2ZTQ1ZSIsIm9yZ2FuaXphdGlvbl9pZCI6ImY5ZGU1MTcxLTVlMzAtNGU0Mi05YzIwLWQzOGQ4NjVlNjMxOSIsImlhdCI6MTc2MTY0MTY0NSwiZXhwIjoxNzYxNzI4MDQ1fQ.cQ5WztceBwvFswTqOaeV6UOJmABgNprBzeNRynwwQi4';

//   const fetchPendingBookings = async () => {
//     try {
//       const response = await fetch(
//         `http://3.110.122.127:3000/getPendingBookingsOfOwner/${OWNER_ID}`
//       );
      
//       const data = await response.json();
//       const bookings = Array.isArray(data) ? data : data.bookings || [];
// const currentIds: Set<string> = new Set<string>(
//   bookings.map((b: any) => String(b._id))
// );
//       const newBookings = bookings.filter((b: ApiBooking) => !previousBookingIds.has(b._id));

//       if (newBookings.length > 0 && previousBookingIds.size > 0) {
//         playNotificationSound();
//         setCurrentBooking(newBookings[0]);
//         setShowPopup(true);
//       }

//       setPendingBookings(bookings);
//       setPreviousBookingIds(currentIds);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPendingBookings();
//     const interval = setInterval(fetchPendingBookings, 15000);
//     return () => clearInterval(interval);
//   }, [previousBookingIds]);

//   const acceptBooking = async (bookingId: string) => {
//     try {
//       const myHeaders = new Headers();
//       myHeaders.append('Authorization', `Bearer ${AUTH_TOKEN}`);

//       const response = await fetch(
//         `http://3.110.122.127:3000/confirmBooking/${bookingId}/conform`,
//         {
//           method: 'POST',
//           headers: myHeaders,
//         }
//       );

//       if (!response.ok) throw new Error('Failed to accept booking');

//       setPendingBookings(prev => prev.filter(b => b._id !== bookingId));
//       setShowPopup(false);
//       setCurrentBooking(null);
      
//       setTimeout(fetchPendingBookings, 1000);
//     } catch (error) {
//       console.error('Error accepting booking:', error);
//       alert('Failed to accept booking');
//     }
//   };

//   const rejectBooking = async (bookingId: string) => {
//     try {
//       const response = await fetch(
//         `http://3.110.122.127:3000/updateBooking/${bookingId}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ status: 'Rejected' })
//         }
//       );

//       if (!response.ok) throw new Error('Failed to reject booking');

//       setPendingBookings(prev => prev.filter(b => b._id !== bookingId));
//       setShowPopup(false);
//       setCurrentBooking(null);
      
//       setTimeout(fetchPendingBookings, 1000);
//     } catch (error) {
//       console.error('Error rejecting booking:', error);
//       alert('Failed to reject booking');
//     }
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <BookingContext.Provider
//       value={{
//         pendingBookings,
//         showPopup,
//         currentBooking,
//         acceptBooking,
//         rejectBooking,
//         closePopup,
//       }}
//     >
//       {children}
//     </BookingContext.Provider>
//   );
// };


// const OwnerBookingPopup: React.FC = () => {
//   const { showPopup, currentBooking, acceptBooking, rejectBooking, closePopup } = useBookings();
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleAccept = async () => {
//     if (!currentBooking || isProcessing) return;
//     setIsProcessing(true);
//     await acceptBooking(currentBooking._id);
//     setIsProcessing(false);
//   };

//   const handleReject = async () => {
//     if (!currentBooking || isProcessing) return;
//     setIsProcessing(true);
//     await rejectBooking(currentBooking._id);
//     setIsProcessing(false);
//   };

//   if (!showPopup || !currentBooking) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closePopup} />
//       <div className="relative bg-white rounded-3xl shadow-2xl p-12 w-full max-w-md animate-in">
//         <div className="flex justify-center mb-8">
//           <div className="relative">
//             {[0, 1, 2].map((i) => (
//               <div
//                 key={i}
//                 className="absolute inset-0 rounded-full border-2 border-blue-500"
//                 style={{
//                   width: `${120 + i * 36}px`,
//                   height: `${120 + i * 36}px`,
//                   left: `${-18 * i}px`,
//                   top: `${-18 * i}px`,
//                   opacity: 0.3 - i * 0.1,
//                   animation: `pulse 2s infinite ${i * 0.2}s`,
//                 }}
//               />
//             ))}
//             <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-blue-900 to-blue-500 flex items-center justify-center shadow-2xl">
//               <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
//                 <rect x="1" y="3" width="15" height="13" />
//                 <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
//                 <circle cx="5.5" cy="18.5" r="2.5" />
//                 <circle cx="18.5" cy="18.5" r="2.5" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
//           You've got a new booking!
//         </h2>

//         <div className="space-y-4">
//           <button
//             onClick={handleAccept}
//             disabled={isProcessing}
//             className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-bold py-5 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 text-lg"
//           >
//             {isProcessing ? 'Processing...' : 'Accept'}
//           </button>
//           <button
//             onClick={handleReject}
//             disabled={isProcessing}
//             className="w-full bg-white border-2 border-red-500 text-red-600 font-bold py-5 rounded-xl hover:bg-red-50 transition-all disabled:opacity-50 text-lg"
//           >
//             {isProcessing ? 'Processing...' : 'Reject'}
//           </button>
//         </div>

//         <button onClick={closePopup} className="mt-6 w-full text-sm text-gray-500 hover:text-gray-700">
//           Close
//         </button>
//       </div>

//       <style>{`
//         @keyframes pulse {
//           0%, 100% { transform: scale(0.9); opacity: 0.3; }
//           50% { transform: scale(1.05); opacity: 0; }
//         }
//         .animate-in {
//           animation: fadeIn 0.3s ease-out;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }
//       `}</style>
//     </div>
//   );
// };

// // ============================================
// // CUSTOMER MY BOOKINGS PAGE
// // ============================================
// const CustomerBookings: React.FC = () => {
//   const [bookings, setBookings] = useState<ApiBooking[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const USER_ID = '68ff377085e67372e72d1f39';

//   const fetchBookings = async (silent = false) => {
//     if (!silent) setIsLoading(true);
//     setIsRefreshing(true);

//     try {
//       const response = await fetch(
//         `http://3.110.122.127:3000/getAllBookings?userId=${USER_ID}`
//       );
      
//       const data = await response.json();
//       const bookingList = Array.isArray(data) ? data : data.bookings || [];
//       setBookings(bookingList);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     } finally {
//       setIsLoading(false);
//       setIsRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//     const interval = setInterval(() => fetchBookings(true), 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const getStatusBadge = (status: string = 'Pending') => {
//     const badges = {
//       Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: '⏳', label: 'Pending - Waiting for Owner' },
//       Confirmed: { bg: 'bg-green-100', text: 'text-green-700', icon: '✓', label: 'Confirmed by Owner' },
//       Rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: '✗', label: 'Rejected by Owner' },
//       Cancelled: { bg: 'bg-gray-100', text: 'text-gray-600', icon: '⊘', label: 'Cancelled' },
//     };

//     const badge = badges[status as keyof typeof badges] || badges.Pending;

//     return (
//       <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${badge.bg} ${badge.text}`}>
//         <span>{badge.icon}</span>
//         <span>{badge.label}</span>
//       </div>
//     );
//   };

//   const isClickable = (status: string = 'Pending') => {
//     // Only confirmed bookings are clickable
//     // Pending bookings wait for owner response
//     return status === 'Confirmed';
//   };

//   const handleBookingClick = (booking: ApiBooking) => {
//     if (isClickable(booking.status)) {
//       alert(`Opening details for booking: ${booking._id}\nVehicle: ${booking.vechileType}\nStatus: ${booking.status}`);
//       // You can navigate to booking details or chat here
//       // navigate(`/booking-details/${booking._id}`);
//     } else if (booking.status === 'Pending') {
//       alert('⏳ This booking is waiting for owner approval. You will be notified once the owner responds.');
//     } else {
//       alert('❌ This booking cannot be accessed as it has been rejected or cancelled.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="bg-white border-b sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
//           <button
//             onClick={() => fetchBookings()}
//             disabled={isRefreshing}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
//           >
//             <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//             <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
//           </button>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-4">
//         {isLoading ? (
//           <div className="text-center py-12 text-gray-600">Loading bookings...</div>
//         ) : bookings.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500 mb-4">No bookings yet</p>
//             <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
//               Book a Vehicle
//             </button>
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {bookings.map((booking) => (
//               <div
//                 key={booking._id}
//                 onClick={() => handleBookingClick(booking)}
//                 className={`bg-white rounded-xl shadow p-6 transition-all ${
//                   isClickable(booking.status)
//                     ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]'
//                     : 'cursor-not-allowed opacity-75'
//                 }`}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">{booking.vechileType}</h3>
//                     <p className="text-sm text-gray-500">ID: {booking._id.slice(0, 12)}...</p>
//                   </div>
//                   {getStatusBadge(booking.status)}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div className="bg-gray-50 rounded-lg p-3">
//                     <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
//                       <Calendar className="w-3 h-3" /> From
//                     </div>
//                     <p className="font-semibold">{new Date(booking.FromDate).toLocaleDateString()}</p>
//                     <p className="text-sm text-gray-600">{booking.FromTime}</p>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-3">
//                     <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
//                       <Calendar className="w-3 h-3" /> To
//                     </div>
//                     <p className="font-semibold">{new Date(booking.ToDate).toLocaleDateString()}</p>
//                     <p className="text-sm text-gray-600">{booking.ToTime}</p>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center pt-4 border-t">
//                   <div>
//                     <p className="text-sm text-gray-600">Total Amount</p>
//                     <p className="text-2xl font-bold text-green-600">₹{booking.totalPrice}</p>
//                   </div>
//                   {booking.status === 'Pending' && (
//                     <div className="bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-lg">
//                       <p className="text-sm font-semibold text-yellow-700">Waiting for owner approval...</p>
//                     </div>
//                   )}
//                   {isClickable(booking.status) && (
//                     <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
//                       View Details →
//                     </button>
//                   )}
//                   {booking.status === 'Rejected' && (
//                     <div className="bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
//                       <p className="text-sm font-semibold text-red-700">Rejected by owner</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// const MyBookings: React.FC = () => {
//   return (
//     <BookingProvider>
//       <CustomerBookings />
//       <OwnerBookingPopup />
//     </BookingProvider>
//   );
// };

// export default MyBookings;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, RefreshCw, X } from "lucide-react";
import { useBookingStore } from "../store/booking.store";
import { Booking } from "../types/booking";
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
 
interface ApiBooking {
  _id: string;
  userId: string;
  vechileType: string;
  VechileId: string;
  pricePerKm: string;
  contactNumber: string;
  contactName: string;
  latitude: string;
  longitude: string;
  FromDate: string;
  ToDate: string;
  FromTime: string;
  ToTime: string;
  totalHours: string;
  totalPrice: string;
  status?: "Pending" | "Confirmed" | "Cancelled" | "Rejected" | "Completed" | "Picked";
  rejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
}
 
interface GetBookingsResponse {
  success: boolean;
  message: string;
  bookings: ApiBooking[];
}
 
const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, setBookings } = useBookingStore();
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectedBooking, setRejectedBooking] = useState<ApiBooking | null>(null);

  const fetchVehicleDetails = async (vehicleId: string, vehicleType: string) => {
    try {
      console.log("🚗 Fetching vehicle details", { vehicleId, vehicleType });
 
      let response;
      const type = vehicleType?.toLowerCase();
 
      if (type === "car") {
        response = await apiService.car.getCarById(vehicleId);
      } else if (type === "bike") {
        response = await apiService.bike.getBikeById(vehicleId);
      } else {
        console.warn("❌ Unknown vehicle type:", vehicleType);
        return null;
      }
 
      console.log("✅ API Response:", response);
 
      const vehicleData = response?.data || response;
      if (!vehicleData) {
        console.warn("⚠️ No vehicle data found in response.");
        return null;
      }
 
      const name =
        vehicleData.CarName ||
        vehicleData.carName ||
        vehicleData.BikeName ||
        vehicleData.bikeName ||
        vehicleData.AutoName ||
        vehicleData.autoName ||
        vehicleData.name ||
        "Unknown Vehicle";
 
      const image =
        (vehicleData.carImages && vehicleData.carImages[0]) ||
        (vehicleData.bikeImages && vehicleData.bikeImages[0]) ||
        (vehicleData.autoImages && vehicleData.autoImages[0]) ||
        vehicleData.image ||
        Auto;
 
      console.log("✅ Normalized Vehicle:", { name, image });
 
      return { name, image };
    } catch (error) {
      console.error("❌ Vehicle fetch error:", error);
      return null;
    }
  };
 
  useEffect(() => {
    fetchUserBookings();
    const interval = setInterval(() => fetchUserBookings(true), 60000);
    return () => clearInterval(interval);
  }, []);
 
  const fetchUserBookings = async (silent = false, retryCount = 0) => {
    if (!silent) setIsLoadingBookings(true);
    setIsRefreshing(true);
    setApiError("");
 
    const MAX_RETRIES = 2;
    const RETRY_DELAY = 1000;
    try {
      const userId = localStorage.getItem("userId") || "68fe269b6f13375a65dc587a";
      const response = await apiService.booking.getAllBookings(userId);
      const data: GetBookingsResponse = response.data
        ? response
        : { success: true, message: "Success", bookings: response };
 
      if (data.success && data.bookings?.length) {
        const convertedBookings: Booking[] = await Promise.all(
          data.bookings.map(async (apiBooking) => {
            const newStatus = mapApiStatus(apiBooking.status);
            const existingBooking = bookings.find((b) => b.id === apiBooking._id);
            if (
              existingBooking &&
              existingBooking.status !== "Cancelled" &&
              newStatus === "Cancelled" &&
              apiBooking.status === "Rejected"
            ) {
              setRejectedBooking(apiBooking);
              setShowRejectionModal(true);
            }
 
            const vehicleData = await fetchVehicleDetails(apiBooking.VechileId, apiBooking.vechileType);
            return {
              id: apiBooking._id,
              vehicleId: apiBooking.VechileId,
              vehicleName: vehicleData?.name || `${apiBooking.vechileType} Vehicle`,
              vehicleImage: vehicleData?.image || Auto,
              vehicleType: mapVehicleType(apiBooking.vechileType),
              customerName: apiBooking.contactName,
              bookingDate: new Date(apiBooking.createdAt || apiBooking.FromDate).toLocaleDateString(),
              bookingTime: new Date(apiBooking.createdAt || apiBooking.FromDate).toLocaleTimeString(),
              startDate: formatApiDate(apiBooking.FromDate),
              startTime: formatApiTime(apiBooking.FromTime),
              endDate: formatApiDate(apiBooking.ToDate),
              endTime: formatApiTime(apiBooking.ToTime),
              modelNo: apiBooking._id.slice(0, 10).toUpperCase(),
              status: newStatus,
              price:
                Number(apiBooking.totalPrice) / Number(apiBooking.totalHours) ||
                Number(apiBooking.pricePerKm) ||
                0,
            };
          })
        );
        setBookings(convertedBookings);
        setLastSyncTime(new Date());
      } else {
        setApiError("No bookings found.");
      }
    } catch (error: any) {
      if (retryCount < MAX_RETRIES) {
        await new Promise((res) => setTimeout(res, RETRY_DELAY * Math.pow(2, retryCount)));
        return fetchUserBookings(silent, retryCount + 1);
      }
      setApiError(error.message || "Unable to fetch bookings.");
    } finally {
      setIsLoadingBookings(false);
      setIsRefreshing(false);
    }
  };
 
  const mapApiStatus = (apiStatus?: string): "Booked" | "Cancelled" | "Picked" | "Completed" => {
    switch (apiStatus) {
      case "Confirmed":
      case "Pending":
        return "Booked";
      case "Cancelled":
      case "Rejected":
        return "Cancelled";
      case "Picked":
        return "Picked";
      case "Completed":
        return "Completed";
      default:
        return "Booked";
    }
  };
 
  const formatApiDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr.trim());
      return !isNaN(date.getTime())
        ? date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })
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
      return `${displayHour}:${min} ${period}`;
    } catch {
      return timeStr;
    }
  };
 
  const handleBookingClick = (booking: Booking) => {
    if (!booking.vehicleId) return alert("Vehicle details not found.");
 
    const type = booking.vehicleType.toLowerCase();
 
    navigate(`/booking-history/${booking.vehicleId}`, {
      state: { booking, vehicleType: type, openContact: false },
    });
  };
 
  const handleRefresh = () => fetchUserBookings();
 
  const getStatusBadge = (status: string, isRejected = false) => {
    const base = "inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm";
    if (isRejected || status === "Cancelled")
      return <div className={`${base} bg-red-100 text-red-700`}>❌ Cancelled</div>;
    if (status === "Booked")
      return <div className={`${base} bg-green-100 text-green-700`}>✅ Confirmed</div>;
    if (status === "Picked")
      return <div className={`${base} bg-yellow-100 text-yellow-700`}>🚗 Picked</div>;
    if (status === "Completed")
      return <div className={`${base} bg-blue-100 text-blue-700`}>✔️ Completed</div>;
    return <div className={`${base} bg-gray-100 text-gray-700`}>{status}</div>;
  };
 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="w-full px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>
            {lastSyncTime && <p className="text-xs text-gray-500">Last updated: {lastSyncTime.toLocaleTimeString()}</p>}
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? "Syncing..." : "Refresh"}</span>
          </button>
        </div>
      </div>
 
      {/* Loading */}
      {isLoadingBookings && (
        <div className="flex items-center justify-center py-12 text-gray-600">Loading your bookings...</div>
      )}
 
      {/* Bookings List */}
      {!isLoadingBookings && (
        <div className="max-w-4xl ml-0 p-4 space-y-3">
          {bookings.length ? (
            bookings.map((booking) => (
              <div
                key={booking.id}
                onClick={() => handleBookingClick(booking)}
                style={{ width: "1200px", height: "290px" }}
                className={`bg-white rounded-lg overflow-hidden flex cursor-pointer transition ${
                  selectedBooking === booking.id ? "ring-2 ring-blue-500 shadow-lg" : "shadow hover:shadow-md"
                }`}
              >
                <div className="flex gap-4 p-4">
                  <img
                    src={booking.vehicleImage || Auto}
                    alt={booking.vehicleName}
                    style={{ width: "277px", height: "290px" }}
                    className="object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{booking.vehicleName}</h3>
                        <p className="text-lg font-semibold text-blue-600 mt-1">₹{booking.price}/hr</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p className="uppercase">Booking ID</p>
                        <p className="font-bold text-gray-900">{(booking.id || "N/A").slice(0, 12)}</p>
                      </div>
                    </div>
                    <div className="mb-4">{getStatusBadge(booking.status, booking.status === "Cancelled")}</div>
                    <div className="bg-gray-50 rounded-lg p-3 mb-3 grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <Calendar className="w-3 h-3" /> From Date
                        </div>
                        <p className="text-sm font-semibold">{booking.startDate}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <Calendar className="w-3 h-3" /> To Date
                        </div>
                        <p className="text-sm font-semibold">{booking.endDate}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
                          <Clock className="w-3 h-3" /> From Time
                        </div>
                        <p className="text-sm font-semibold">{booking.startTime}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
                          <Clock className="w-3 h-3" /> To Time
                        </div>
                        <p className="text-sm font-semibold">{booking.endTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No bookings found. Start by booking a vehicle!</p>
              <button
                onClick={() => navigate("/rental")}
                className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white px-6 py-3 rounded-lg font-semibold"
              >
                Browse Vehicles
              </button>
            </div>
          )}
        </div>
      )}
 
      {/* Rejection Modal */}
      {showRejectionModal && rejectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <X className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-3">Booking Rejected</h2>
            <p className="text-gray-600 text-center mb-6">
              The owner rejected your booking for the <strong>{rejectedBooking.vechileType}</strong>.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Booking ID:</span>
                <span>{rejectedBooking._id.slice(0, 10)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Date:</span>
                <span>{formatApiDate(rejectedBooking.FromDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>{formatApiTime(rejectedBooking.FromTime)}</span>
              </div>
            </div>
            {rejectedBooking.rejectionReason && (
              <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-900 mb-1">Reason:</p>
                <p className="text-sm text-yellow-800">{rejectedBooking.rejectionReason}</p>
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectedBooking(null);
                }}
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectedBooking(null);
                  navigate("/rental");
                }}
                className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg"
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
