





// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, RefreshCw, X } from "lucide-react";
// import { useBookingStore, Booking, BookingStatus } from "../store/booking.store";
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
//     status?: "Pending" | "Confirmed" | "Cancelled" | "Rejected" | "Completed" | "Picked" | "AutoCancelled";
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
//     RentPerHour?: number;
//     RentPerDay?: number;
//   };
//   reviews: any[];
// }

// const MyBookings: React.FC = () => {
//   const navigate = useNavigate();
//   const { bookings, setBookings } = useBookingStore();
//   const [searchText, setSearchText] = useState("");
//   const [isLoadingBookings, setIsLoadingBookings] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [showRejectionModal, setShowRejectionModal] = useState(false);
//   const [rejectedBooking, setRejectedBooking] = useState<ApiBookingResponse["booking"] | null>(null);
//   const [bookingsDataCache, setBookingsDataCache] = useState<ApiBookingResponse[]>([]);

//   useEffect(() => {
//     fetchUserBookings();
//   }, []);

//   const fetchUserBookings = async (silent = false) => {
//     if (!silent) setIsLoadingBookings(true);
//     setIsRefreshing(true);

//     try {
//       const userId = localStorage.getItem("userId") || "690308d03a633b650dbc7e61";
//       console.log("🔍 Fetching bookings for user:", userId);
      
//       const response = await apiService.booking.getAllBookings(userId);
//       console.log("📦 Raw API Response:", response);

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
          
//           const newStatus = mapApiStatus(apiBooking.status);
          
//           console.log("🔄 Status mapping:", {
//             bookingId: apiBooking._id,
//             originalStatus: apiBooking.status,
//             mappedStatus: newStatus
//           });
          
//           const existingBooking = bookings.find((b) => b.id === apiBooking._id);
//           if (
//             existingBooking &&
//             existingBooking.status !== "Cancelled" &&
//             existingBooking.status !== "AutoCancelled" &&
//             (newStatus === "Cancelled" || newStatus === "AutoCancelled") &&
//             (apiBooking.status === "Rejected" || apiBooking.status === "AutoCancelled")
//           ) {
//             setRejectedBooking(apiBooking);
//             setShowRejectionModal(true);
//           }

//           const vehicleName = 
//             vehicle?.CarName || 
//             vehicle?.carName || 
//             vehicle?.bikeName || 
//             `${apiBooking.vechileType} Vehicle`;
          
//           const vehicleImage = 
//             (vehicle?.carImages && vehicle.carImages[0]) ||
//             (vehicle?.bikeImages && vehicle.bikeImages[0]) ||
//             Auto;

//           // FIXED: Safe price calculation with guaranteed number result
//           const price = (() => {
//             // Try booking prices first
//             const pricePerKm = Number(apiBooking.pricePerKm) || 0;
//             const pricePerHour = Number(apiBooking.pricePerHour) || 0;
//             const pricePerDay = Number(apiBooking.pricePerDay) || 0;
//             const totalPrice = Number(apiBooking.totalPrice) || 0;
//             const totalHours = Number(apiBooking.totalHours) || 1;
            
//             // Fallback to vehicle prices
//             const vehicleRentPerHour = Number(vehicle?.RentPerHour) || 0;
//             const vehicleRentPerDay = Number(vehicle?.RentPerDay) || 0;
            
//             // Return first valid price in priority order
//             if (pricePerKm > 0) return pricePerKm;
//             if (pricePerHour > 0) return pricePerHour;
//             if (pricePerDay > 0) return pricePerDay;
//             if (totalPrice > 0 && totalHours > 0) return totalPrice / totalHours;
            
//             // Use vehicle prices as fallback
//             if (vehicleRentPerHour > 0) return vehicleRentPerHour;
//             if (vehicleRentPerDay > 0) return vehicleRentPerDay;
            
//             return 0; // Default to 0 if no valid price found
//           })();

//           // Determine price unit based on what type of price was used
//           const priceUnit = (() => {
//             if (Number(apiBooking.pricePerKm) > 0) return "/km";
//             if (Number(apiBooking.pricePerHour) > 0) return "/hour";
//             if (Number(apiBooking.pricePerDay) > 0) return "/day";
//             if (Number(vehicle?.RentPerHour) > 0) return "/hour";
//             if (Number(vehicle?.RentPerDay) > 0) return "/day";
//             return "/hour"; // default
//           })();

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
//             priceUnit: priceUnit,
//           };
//         });

//         console.log("✅ Converted bookings:", convertedBookings);
//         setBookings(convertedBookings);
//       } else {
//         console.log("📭 No bookings found");
//         setBookings([]);
//       }
//     } catch (error: any) {
//       console.error("❌ Error fetching bookings:", error);
//       setBookings([]);
//     } finally {
//       setIsLoadingBookings(false);
//       setIsRefreshing(false);
//     }
//   };

//   const mapApiStatus = (apiStatus?: string): BookingStatus => {
//     if (!apiStatus) return "Pending";
    
//     const status = apiStatus.toLowerCase();
    
//     if (status === "confirmed") return "Confirmed";
//     if (status === "pending") return "Pending";
//     if (status === "cancelled") return "Cancelled";
//     if (status === "rejected") return "Cancelled";
//     if (status === "autocancelled") return "AutoCancelled";
//     if (status === "picked") return "Picked";
//     if (status === "completed") return "Completed";
    
//     return "Pending";
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
//     if (!booking.vehicleId) {
//       alert("Vehicle details not found.");
//       return;
//     }

//     const type = booking.vehicleType.toLowerCase();
//     const bookingResponse = bookingsDataCache.find(item => item.booking._id === booking.id);
//     const vehicleData = bookingResponse?.vehicle;

//     navigate(`/booking-detail/${booking.vehicleId}`, {
//       state: { 
//         booking, 
//         vehicleType: type, 
//         openContact: false,
//         vehicleData: vehicleData || {
//           _id: booking.vehicleId,
//           vehicleType: type,
//           bikeName: booking.vehicleName,
//           carName: booking.vehicleName,
//           bikeImages: booking.vehicleImage ? [booking.vehicleImage] : [],
//           carImages: booking.vehicleImage ? [booking.vehicleImage] : [],
//           pricePerKm: booking.price,
//           RentPerHour: booking.price
//         }
//       },
//     });
//   };

//   const handleRefresh = () => fetchUserBookings();

//   const getStatusColor = (status: string | undefined) => {
//     if (!status) return 'bg-gray-100 text-gray-600';
    
//     const statusLower = status.toLowerCase();
//     if (statusLower === 'autocancelled') {
//       return 'bg-orange-50 text-orange-700';
//     } else if (statusLower === 'cancelled') {
//       return 'bg-red-50 text-red-600';
//     } else if (statusLower === 'pending') {
//       return 'bg-amber-50 text-amber-700';
//     } else if (statusLower === 'confirmed') {
//       return 'bg-green-50 text-green-700';
//     } else if (statusLower === 'picked') {
//       return 'bg-blue-50 text-blue-700';
//     } else if (statusLower === 'completed') {
//       return 'bg-purple-50 text-purple-700';
//     }
//     return 'bg-gray-100 text-gray-600';
//   };

//   const getFilteredBookings = () => {
//     if (!searchText) return bookings;
//     return bookings.filter(
//       (b) =>
//         b.vehicleName?.toLowerCase().includes(searchText.toLowerCase()) ||
//         b.contactNumber?.includes(searchText) ||
//         b.status?.toLowerCase().includes(searchText.toLowerCase())
//     );
//   };

//   const filteredBookings = getFilteredBookings();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header Section */}
//       <div className="bg-white px-4 py-4 md:px-8 md:py-6 border-b border-gray-200">
//         <div className="max-w-full md:max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//           {/* Left: My Bookings Heading */}
//           <h1 className="text-2xl md:text-[32px] font-black text-gray-900 tracking-tight">
//             My Bookings
//           </h1>

//           {/* Right: Search Bar */}
//           <div className="flex flex-col sm:flex-row items-stretch gap-2 md:gap-4 w-full md:w-auto">
//             <div className="relative w-full sm:w-80">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search bookings..."
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 className="w-full pl-12 pr-4 py-2 bg-gray-50 rounded-[10px] border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-semibold transition-all ${
//                 isRefreshing 
//                   ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
//                   : 'bg-[#3D5AFE] text-white hover:bg-[#3651D4]'
//               }`}
//             >
//               <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="max-w-full md:max-w-[1000px] mx-auto px-2 md:px-8 py-4 md:py-8">
//         {/* Bookings Count */}
//         <div className="mb-4 md:mb-6">
//           <p className="text-sm md:text-[15px] font-medium text-gray-500">
//             {filteredBookings.length} Bookings
//           </p>
//         </div>

//         {/* Loading State */}
//         {isLoadingBookings ? (
//           <div className="flex flex-col items-center justify-center py-12 md:py-20">
//             <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-gray-200 border-t-[#3D5AFE] rounded-full animate-spin"></div>
//             <p className="mt-4 text-gray-500 text-base">Loading bookings...</p>
//           </div>
//         ) : filteredBookings.length === 0 ? (
//           <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-16 text-center">
//             <p className="text-base text-gray-400">No bookings found</p>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-4">
//             {filteredBookings.map((booking) => (
//               <div
//                 key={booking.id}
//                 onClick={() => handleBookingClick(booking)}
//                 className="bg-white rounded-xl md:rounded-2xl shadow-sm border-2 border-transparent cursor-pointer transition-all duration-300 overflow-hidden min-h-[180px] md:min-h-[200px] hover:border-[#3D5AFE] hover:shadow-[0_4px_12px_rgba(61,90,254,0.15)]"
//               >
//                 <div className="p-4 md:p-7">
//                   <div className="flex flex-col md:flex-row gap-4 md:gap-6">
//                     {/* Vehicle Image - Responsive Size */}
//                     <div className="flex-shrink-0 w-full h-40 md:w-[200px] md:h-[200px] bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl overflow-hidden flex items-center justify-center mb-4 md:mb-0">
//                       {booking.vehicleImage && booking.vehicleImage !== Auto ? (
//                         <img
//                           src={booking.vehicleImage}
//                           alt={booking.vehicleName}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.currentTarget.style.display = "none";
//                             e.currentTarget.parentElement!.innerHTML = `
//                               <div class=\"text-center\">
//                                 <div class=\"w-12 h-12 mx-auto mb-2 bg-white rounded-lg flex items-center justify-center\">
//                                   <svg class=\"w-7 h-7 text-[#3D5AFE]\" viewBox=\"0 0 24 24\" fill=\"currentColor\">
//                                     <path d=\"M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z\"/>
//                                   </svg>
//                                 </div>
//                                 <div class=\"text-xs font-semibold text-[#3D5AFE]\">Rentongo</div>
//                                 <div class=\"text-[10px] text-indigo-400\">vehicle</div>
//                               </div>
//                             `;
//                           }}
//                         />
//                       ) : (
//                         <div className="text-center">
//                           <div className="w-12 h-12 mx-auto mb-2 bg-white rounded-lg flex items-center justify-center">
//                             <svg className="w-7 h-7 text-[#3D5AFE]" viewBox="0 0 24 24" fill="currentColor">
//                               <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
//                             </svg>
//                           </div>
//                           <div className="text-xs font-semibold text-[#3D5AFE]">Rentongo</div>
//                           <div className="text-[10px] text-indigo-400">vehicle</div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Booking Details */}
//                     <div className="flex-1">
//                       {/* Vehicle Name and Star Rating */}
//                       <div className="mb-2.5">
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 mb-1.5">
//                           <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
//                             {booking.vehicleName}
//                           </h3>
//                           {booking.price > 0 && (
//                             <div className="flex items-center gap-1">
//                               <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//                               </svg>
//                               <span className="text-sm font-semibold text-amber-500">4.5</span>
//                             </div>
//                           )}
//                         </div>

//                         {/* Price Below Name - FIXED with safe fallback */}
//                         <div className="text-base md:text-lg font-bold text-gray-900">
//                           ₹{(booking.price || 0).toFixed(0)}
//                           <span className="text-sm font-medium text-gray-500">{(booking as any).priceUnit || "/hour"}</span>
//                         </div>
//                       </div>

//                       {/* Info Grid */}
//                       <div className="flex flex-col gap-1.5 mb-2.5">
//                         {/* Date Row */}
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
//                           <div className="flex items-center gap-2 min-w-[120px] sm:min-w-[180px]">
//                             <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
//                               <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
//                               <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
//                               <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
//                             </svg>
//                             <span className="text-xs text-gray-500 font-medium">From:</span>
//                             <span className="text-xs font-semibold text-gray-900">{booking.startDate}</span>
//                           </div>
//                           {booking.endDate && (
//                             <div className="flex items-center gap-2">
//                               <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
//                                 <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
//                                 <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
//                                 <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
//                               </svg>
//                               <span className="text-xs text-gray-500 font-medium">To:</span>
//                               <span className="text-xs font-semibold text-gray-900">{booking.endDate}</span>
//                             </div>
//                           )}
//                         </div>

//                         {/* Time Row */}
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
//                           <div className="flex items-center gap-2 min-w-[120px] sm:min-w-[180px]">
//                             <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <circle cx="12" cy="12" r="10" strokeWidth="2"/>
//                               <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
//                             </svg>
//                             <span className="text-xs text-gray-500 font-medium">From:</span>
//                             <span className="text-xs font-semibold text-gray-900">{booking.startTime}</span>
//                           </div>
//                           {booking.endTime && (
//                             <div className="flex items-center gap-2">
//                               <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <circle cx="12" cy="12" r="10" strokeWidth="2"/>
//                                 <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
//                               </svg>
//                               <span className="text-xs text-gray-500 font-medium">To:</span>
//                               <span className="text-xs font-semibold text-gray-900">{booking.endTime}</span>
//                             </div>
//                           )}
//                         </div>

//                         {/* Mobile Number */}
//                         <div className="flex items-center gap-2">
//                           <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
//                           </svg>
//                           <span className="text-xs text-gray-500 font-medium">Mobile No:</span>
//                           <span className="text-xs font-semibold text-gray-900">{booking.contactNumber}</span>
//                         </div>
//                       </div>

//                       {/* Status Badge */}
//                       <div className="flex items-center gap-2">
//                         <span className="text-xs text-gray-500 font-medium">Status:</span>
//                         <span className={`px-3 py-1 rounded-md text-[11px] font-semibold ${getStatusColor(booking.status)}`}>
//                           {booking.status === "AutoCancelled" ? "Auto Cancelled" : (booking.status || "Pending")}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Rejection Modal */}
//       {showRejectionModal && rejectedBooking && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 md:p-4">
//           <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 max-w-full md:max-w-md w-full shadow-2xl">
//             <div className="flex justify-center mb-6">
//               <div className="w-20 h-20 md:w-24 md:h-24 bg-red-50 rounded-full flex items-center justify-center">
//                 <X size={40} className="md:size-56 text-red-600" />
//               </div>
//             </div>
//             <h2 className="text-xl md:text-[28px] font-bold text-center mb-4">
//               Booking {rejectedBooking.status === "AutoCancelled" ? "Auto Cancelled" : "Rejected"}
//             </h2>
//             <p className="text-base md:text-lg text-gray-600 text-center mb-6">
//               {rejectedBooking.status === "AutoCancelled" 
//                 ? `Your booking for the ${rejectedBooking.vechileType} was automatically cancelled.`
//                 : `The owner rejected your booking for the ${rejectedBooking.vechileType}.`
//               }
//             </p>
//             <div className="bg-gray-50 rounded-xl p-4 md:p-5 mb-6 text-sm text-gray-700 border border-gray-200">
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
//               <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
//                 <p className="text-sm font-bold text-amber-800 mb-2">Reason:</p>
//                 <p className="text-sm text-amber-700">{rejectedBooking.rejectionReason}</p>
//               </div>
//             )}
//             <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
//               <button
//                 onClick={() => {
//                   setShowRejectionModal(false);
//                   setRejectedBooking(null);
//                 }}
//                 className="flex-1 bg-gray-100 text-gray-700 font-bold py-2 md:py-3.5 px-4 md:px-6 rounded-xl hover:bg-gray-200 transition-colors"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={() => {
//                   setShowRejectionModal(false);
//                   setRejectedBooking(null);
//                   navigate("/rental");
//                 }}
//                 className="flex-1 bg-gradient-to-r from-[#3D5AFE] to-[#536DFE] text-white font-bold py-2 md:py-3.5 px-4 md:px-6 rounded-xl hover:opacity-90 transition-opacity"
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

// import { Search, RefreshCw, X } from "lucide-react";

// import { useBookingStore, Booking, BookingStatus } from "../store/booking.store";

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

//     status?: "Pending" | "Confirmed" | "Cancelled" | "Rejected" | "Completed" | "Picked" | "AutoCancelled";

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

//     RentPerHour?: number;

//     RentPerDay?: number;

//   };

//   reviews: any[];

// }



// const MyBookings: React.FC = () => {

//   const navigate = useNavigate();

//   const { bookings, setBookings } = useBookingStore();

//   const [searchText, setSearchText] = useState("");

//   const [isLoadingBookings, setIsLoadingBookings] = useState(false);

//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const [showRejectionModal, setShowRejectionModal] = useState(false);

//   const [rejectedBooking, setRejectedBooking] = useState<ApiBookingResponse["booking"] | null>(null);

//   const [bookingsDataCache, setBookingsDataCache] = useState<ApiBookingResponse[]>([]);



//   useEffect(() => {

//     fetchUserBookings();

//   }, []);



//   const fetchUserBookings = async (silent = false) => {

//     if (!silent) setIsLoadingBookings(true);

//     setIsRefreshing(true);



//     try {

//       const userId = localStorage.getItem("userId") || "690308d03a633b650dbc7e61";

//       console.log("🔍 Fetching bookings for user:", userId);

     

//       const response = await apiService.booking.getAllBookings(userId);

//       console.log("📦 Raw API Response:", response);



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

         

//           const newStatus = mapApiStatus(apiBooking.status);

         

//           console.log("🔄 Status mapping:", {

//             bookingId: apiBooking._id,

//             originalStatus: apiBooking.status,

//             mappedStatus: newStatus

//           });

         

//           const existingBooking = bookings.find((b) => b.id === apiBooking._id);

//           if (

//             existingBooking &&

//             existingBooking.status !== "Cancelled" &&

//             existingBooking.status !== "AutoCancelled" &&

//             (newStatus === "Cancelled" || newStatus === "AutoCancelled") &&

//             (apiBooking.status === "Rejected" || apiBooking.status === "AutoCancelled")

//           ) {

//             setRejectedBooking(apiBooking);

//             setShowRejectionModal(true);

//           }



//           const vehicleName =

//             vehicle?.CarName ||

//             vehicle?.carName ||

//             vehicle?.bikeName ||

//             `${apiBooking.vechileType} Vehicle`;

         

//           const vehicleImage =

//             (vehicle?.carImages && vehicle.carImages[0]) ||

//             (vehicle?.bikeImages && vehicle.bikeImages[0]) ||

//             Auto;



//           // FIXED: Safe price calculation with guaranteed number result

//           const price = (() => {

//             // Try booking prices first

//             const pricePerKm = Number(apiBooking.pricePerKm) || 0;

//             const pricePerHour = Number(apiBooking.pricePerHour) || 0;

//             const pricePerDay = Number(apiBooking.pricePerDay) || 0;

//             const totalPrice = Number(apiBooking.totalPrice) || 0;

//             const totalHours = Number(apiBooking.totalHours) || 1;

           

//             // Fallback to vehicle prices

//             const vehicleRentPerHour = Number(vehicle?.RentPerHour) || 0;

//             const vehicleRentPerDay = Number(vehicle?.RentPerDay) || 0;

           

//             // Return first valid price in priority order

//             if (pricePerKm > 0) return pricePerKm;

//             if (pricePerHour > 0) return pricePerHour;

//             if (pricePerDay > 0) return pricePerDay;

//             if (totalPrice > 0 && totalHours > 0) return totalPrice / totalHours;

           

//             // Use vehicle prices as fallback

//             if (vehicleRentPerHour > 0) return vehicleRentPerHour;

//             if (vehicleRentPerDay > 0) return vehicleRentPerDay;

           

//             return 0; // Default to 0 if no valid price found

//           })();



//           // Determine price unit based on what type of price was used

//           const priceUnit = (() => {

//             if (Number(apiBooking.pricePerKm) > 0) return "/km";

//             if (Number(apiBooking.pricePerHour) > 0) return "/hour";

//             if (Number(apiBooking.pricePerDay) > 0) return "/day";

//             if (Number(vehicle?.RentPerHour) > 0) return "/hour";

//             if (Number(vehicle?.RentPerDay) > 0) return "/day";

//             return "/hour"; // default

//           })();



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

//             priceUnit: priceUnit,

//           };

//         });



//         console.log("✅ Converted bookings:", convertedBookings);

//         setBookings(convertedBookings);

//       } else {

//         console.log("📭 No bookings found");

//         setBookings([]);

//       }

//     } catch (error: any) {

//       console.error("❌ Error fetching bookings:", error);

//       setBookings([]);

//     } finally {

//       setIsLoadingBookings(false);

//       setIsRefreshing(false);

//     }

//   };



//   const mapApiStatus = (apiStatus?: string): BookingStatus => {

//     if (!apiStatus) return "Pending";

   

//     const status = apiStatus.toLowerCase();

   

//     if (status === "confirmed") return "Confirmed";

//     if (status === "pending") return "Pending";

//     if (status === "cancelled") return "Cancelled";

//     if (status === "rejected") return "Cancelled";

//     if (status === "autocancelled") return "AutoCancelled";

//     if (status === "picked") return "Picked";

//     if (status === "completed") return "Completed";

   

//     return "Pending";

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

//     if (!booking.vehicleId) {

//       alert("Vehicle details not found.");

//       return;

//     }



//     const type = booking.vehicleType.toLowerCase();

//     const bookingResponse = bookingsDataCache.find(item => item.booking._id === booking.id);

//     const vehicleData = bookingResponse?.vehicle;



//     navigate(`/booking-detail/${booking.vehicleId}`, {

//       state: {

//         booking,

//         vehicleType: type,

//         openContact: false,

//         vehicleData: vehicleData || {

//           _id: booking.vehicleId,

//           vehicleType: type,

//           bikeName: booking.vehicleName,

//           carName: booking.vehicleName,

//           bikeImages: booking.vehicleImage ? [booking.vehicleImage] : [],

//           carImages: booking.vehicleImage ? [booking.vehicleImage] : [],

//           pricePerKm: booking.price,

//           RentPerHour: booking.price

//         }

//       },

//     });

//   };



//   const handleRefresh = () => fetchUserBookings();



//   const getStatusColor = (status: string | undefined) => {

//     if (!status) return 'bg-gray-100 text-gray-600';

   

//     const statusLower = status.toLowerCase();

//     if (statusLower === 'autocancelled') {

//       return 'bg-orange-50 text-orange-700';

//     } else if (statusLower === 'cancelled') {

//       return 'bg-red-50 text-red-600';

//     } else if (statusLower === 'pending') {

//       return 'bg-amber-50 text-amber-700';

//     } else if (statusLower === 'confirmed') {

//       return 'bg-green-50 text-green-700';

//     } else if (statusLower === 'picked') {

//       return 'bg-blue-50 text-blue-700';

//     } else if (statusLower === 'completed') {

//       return 'bg-purple-50 text-purple-700';

//     }

//     return 'bg-gray-100 text-gray-600';

//   };



//   const getFilteredBookings = () => {

//     if (!searchText) return bookings;

//     return bookings.filter(

//       (b) =>

//         b.vehicleName?.toLowerCase().includes(searchText.toLowerCase()) ||

//         b.contactNumber?.includes(searchText) ||

//         b.status?.toLowerCase().includes(searchText.toLowerCase())

//     );

//   };



//   const filteredBookings = getFilteredBookings();



//   return (

//     <div className="min-h-screen bg-gray-50">

//       {/* Header Section */}

//       <div className="bg-white px-8 py-6 border-b border-gray-200">

//         <div className="max-w-[1400px] mx-auto flex items-center justify-between">

//           {/* Left: My Bookings Heading */}

//           <h1 className="text-[32px] font-black text-gray-900 tracking-tight">

//             My Bookings

//           </h1>



//           {/* Right: Search Bar */}

//           <div className="flex items-center gap-4">

//             <div className="relative w-80">

//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

//               <input

//                 type="text"

//                 placeholder="Search bookings..."

//                 value={searchText}

//                 onChange={(e) => setSearchText(e.target.value)}

//                 className="w-full pl-12 pr-4 py-2.5 bg-gray-50 rounded-[10px] border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"

//               />

//             </div>



//           <button
//   onClick={handleRefresh}
//   disabled={isRefreshing}
//   className={`flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-all ${
//     isRefreshing
//       ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//       : 'bg-gradient-to-r from-[#0A0747] to-[#4EC8FF]'
//   }`}
// >


//               <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />

//               Refresh

//             </button>

//           </div>

//         </div>

//       </div>



//       {/* Main Content Area */}

//       <div className="max-w-[1000px] mx-auto px-8 py-8">

//         {/* Bookings Count */}

//         <div className="mb-6">

//           <p className="text-[15px] font-medium text-gray-500">

//             {filteredBookings.length} Bookings

//           </p>

//         </div>



//         {/* Loading State */}

//         {isLoadingBookings ? (

//           <div className="flex flex-col items-center justify-center py-20">

//             <div className="w-12 h-12 border-4 border-gray-200 border-t-[#3D5AFE] rounded-full animate-spin"></div>

//             <p className="mt-4 text-gray-500 text-base">Loading bookings...</p>

//           </div>

//         ) : filteredBookings.length === 0 ? (

//           <div className="bg-white rounded-3xl p-16 text-center">

//             <p className="text-base text-gray-400">No bookings found</p>

//           </div>

//         ) : (

//           <div className="flex flex-col gap-4">

//             {filteredBookings.map((booking) => (

//               <div

//                 key={booking.id}

//                 onClick={() => handleBookingClick(booking)}

//                 className="bg-white rounded-2xl shadow-sm border-2 border-transparent cursor-pointer transition-all duration-300 overflow-hidden min-h-[200px] hover:border-[#3D5AFE] hover:shadow-[0_4px_12px_rgba(61,90,254,0.15)]"

//               >

//                 <div className="p-7">

//                   <div className="flex gap-6">

//                     {/* Vehicle Image - Increased Size */}

//                     <div className="flex-shrink-0">

//                       <div className="w-[200px] h-[200px] bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl overflow-hidden flex items-center justify-center">

//                         {booking.vehicleImage && booking.vehicleImage !== Auto ? (

//                           <img

//                             src={booking.vehicleImage}

//                             alt={booking.vehicleName}

//                             className="w-full h-full object-cover"

//                             onError={(e) => {

//                               e.currentTarget.style.display = "none";

//                               e.currentTarget.parentElement!.innerHTML = `

//                                 <div class="text-center">

//                                   <div class="w-12 h-12 mx-auto mb-2 bg-white rounded-lg flex items-center justify-center">

//                                     <svg class="w-7 h-7 text-[#3D5AFE]" viewBox="0 0 24 24" fill="currentColor">

//                                       <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>

//                                     </svg>

//                                   </div>

//                                   <div class="text-xs font-semibold text-[#3D5AFE]">Rentongo</div>

//                                   <div class="text-[10px] text-indigo-400">vehicle</div>

//                                 </div>

//                               `;

//                             }}

//                           />

//                         ) : (

//                           <div className="text-center">

//                             <div className="w-12 h-12 mx-auto mb-2 bg-white rounded-lg flex items-center justify-center">

//                               <svg className="w-7 h-7 text-[#3D5AFE]" viewBox="0 0 24 24" fill="currentColor">

//                                 <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>

//                               </svg>

//                             </div>

//                             <div className="text-xs font-semibold text-[#3D5AFE]">Rentongo</div>

//                             <div className="text-[10px] text-indigo-400">vehicle</div>

//                           </div>

//                         )}

//                       </div>

//                     </div>



//                     {/* Booking Details */}

//                     <div className="flex-1">

//                       {/* Vehicle Name and Star Rating */}

//                       <div className="mb-2.5">

//                         <div className="flex items-center gap-2 mb-1.5">

//                           <h3 className="text-xl font-bold text-gray-900 tracking-tight">

//                             {booking.vehicleName}

//                           </h3>

//                           {booking.price > 0 && (

//                             <div className="flex items-center gap-1">

//                               {/* <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">

//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>

//                               </svg>

//                               <span className="text-sm font-semibold text-amber-500">4.5</span> */}

//                             </div>

//                           )}

//                         </div>



//                         {/* Price Below Name - FIXED with safe fallback */}

//                         <div className="text-lg font-bold text-gray-900">

//                           ₹{(booking.price || 0).toFixed(0)}

//                           <span className="text-sm font-medium text-gray-500">{(booking as any).priceUnit || "/hour"}</span>

//                         </div>

//                       </div>



//                       {/* Info Grid */}

//                       <div className="flex flex-col gap-1.5 mb-2.5">

//                         {/* Date Row */}

//                         <div className="flex items-center gap-5">

//                           <div className="flex items-center gap-2 min-w-[180px]">

//                             <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

//                               <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>

//                               <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>

//                               <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>

//                               <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>

//                             </svg>

//                             <span className="text-xs text-gray-500 font-medium">From:</span>

//                             <span className="text-xs font-semibold text-gray-900">{booking.startDate}</span>

//                           </div>

//                           {booking.endDate && (

//                             <div className="flex items-center gap-2">

//                               <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

//                                 <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>

//                                 <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>

//                                 <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>

//                                 <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>

//                               </svg>

//                               <span className="text-xs text-gray-500 font-medium">To:</span>

//                               <span className="text-xs font-semibold text-gray-900">{booking.endDate}</span>

//                             </div>

//                           )}

//                         </div>



//                         {/* Time Row */}

//                         <div className="flex items-center gap-5">

//                           <div className="flex items-center gap-2 min-w-[180px]">

//                             <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

//                               <circle cx="12" cy="12" r="10" strokeWidth="2"/>

//                               <polyline points="12 6 12 12 16 14" strokeWidth="2"/>

//                             </svg>

//                             <span className="text-xs text-gray-500 font-medium">From:</span>

//                             <span className="text-xs font-semibold text-gray-900">{booking.startTime}</span>

//                           </div>

//                           {booking.endTime && (

//                             <div className="flex items-center gap-2">

//                               <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

//                                 <circle cx="12" cy="12" r="10" strokeWidth="2"/>

//                                 <polyline points="12 6 12 12 16 14" strokeWidth="2"/>

//                               </svg>

//                               <span className="text-xs text-gray-500 font-medium">To:</span>

//                               <span className="text-xs font-semibold text-gray-900">{booking.endTime}</span>

//                             </div>

//                           )}

//                         </div>



//                         {/* Mobile Number */}

//                         <div className="flex items-center gap-2">

//                           <svg className="w-[13px] h-[13px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

//                             <path strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>

//                           </svg>

//                           <span className="text-xs text-gray-500 font-medium">Mobile No:</span>

//                           <span className="text-xs font-semibold text-gray-900">{booking.contactNumber}</span>

//                         </div>

//                       </div>
// {/* Mobile Number */}
// <div className="flex items-center gap-2">
//   <svg
//     className="w-[13px] h-[13px] text-gray-400 flex-shrink-0"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeWidth="2"
//       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//     />
//   </svg>

//   <span className="text-xs text-gray-500 font-medium">Mobile No:</span>

//   {/* Masked mobile number */}
//   <span className="text-xs font-semibold text-gray-900">
//     {booking.contactNumber
//       ? booking.contactNumber.replace(/\d(?=\d{3})/g, "X")
//       : ""}
//   </span>
// </div>



//                       {/* Status Badge */}

//                       <div className="flex items-center gap-2">

//                         <span className="text-xs text-gray-500 font-medium">Status:</span>

//                         <span className={`px-3 py-1 rounded-md text-[11px] font-semibold ${getStatusColor(booking.status)}`}>

//                           {booking.status === "AutoCancelled" ? "Auto Cancelled" : (booking.status || "Pending")}

//                         </span>

//                       </div>

//                     </div>

//                   </div>

//                 </div>

//               </div>

//             ))}

//           </div>

//         )}

//       </div>



//       {/* Rejection Modal */}

//       {showRejectionModal && rejectedBooking && (

//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">

//             <div className="flex justify-center mb-6">

//               <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">

//                 <X size={56} className="text-red-600" />

//               </div>

//             </div>

//             <h2 className="text-[28px] font-bold text-center mb-4">

//               Booking {rejectedBooking.status === "AutoCancelled" ? "Auto Cancelled" : "Rejected"}

//             </h2>

//             <p className="text-lg text-gray-600 text-center mb-6">

//               {rejectedBooking.status === "AutoCancelled"

//                 ? `Your booking for the ${rejectedBooking.vechileType} was automatically cancelled.`

//                 : `The owner rejected your booking for the ${rejectedBooking.vechileType}.`

//               }

//             </p>

//             <div className="bg-gray-50 rounded-xl p-5 mb-6 text-sm text-gray-700 border border-gray-200">

//               <div className="flex justify-between mb-3">

//                 <span className="font-semibold">Booking ID:</span>

//                 <span className="font-medium">{rejectedBooking._id.slice(0, 10)}</span>

               

//               </div>

//               <div className="flex justify-between mb-3">

//                 <span className="font-semibold">Date:</span>

//                 <span className="font-medium">{formatApiDate(rejectedBooking.FromDate)}</span>

//                 <span>{rejectedBooking.status}</span>

//               </div>

//               <div className="flex justify-between">

//                 <span className="font-semibold">Time:</span>

//                 <span className="font-medium">{formatApiTime(rejectedBooking.FromTime)}</span>

//               </div>

//             </div>

//             {rejectedBooking.rejectionReason && (

//               <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">

//                 <p className="text-sm font-bold text-amber-800 mb-2">Reason:</p>

//                 <p className="text-sm text-amber-700">{rejectedBooking.rejectionReason}</p>

//               </div>

//             )}

//             <div className="flex gap-4">

//               <button

//                 onClick={() => {

//                   setShowRejectionModal(false);

//                   setRejectedBooking(null);

//                 }}

//                 className="flex-1 bg-gray-100 text-gray-700 font-bold py-3.5 px-6 rounded-xl hover:bg-gray-200 transition-colors"

//               >

//                 Close

//               </button>

//               <button

//                 onClick={() => {

//                   setShowRejectionModal(false);

//                   setRejectedBooking(null);

//                   navigate("/rental");

//                 }}

//                 className="flex-1 bg-gradient-to-r from-[#3D5AFE] to-[#536DFE] text-white font-bold py-3.5 px-6 rounded-xl hover:opacity-90 transition-opacity"

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







import React, { useState, useEffect, useRef } from "react";
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
    RentPerHour?: number;
    RentPerDay?: number;
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
  
  // Add a ref to track if initial fetch has been done
  const hasFetchedRef = useRef(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showRejectionModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showRejectionModal]);

  // Modified useEffect to prevent duplicate API calls
  useEffect(() => {
    // Only fetch if not already fetched
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchUserBookings();
    }
  }, []); // Empty dependency array

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

          const price = (() => {
            const pricePerKm = Number(apiBooking.pricePerKm) || 0;
            const pricePerHour = Number(apiBooking.pricePerHour) || 0;
            const pricePerDay = Number(apiBooking.pricePerDay) || 0;
            const totalPrice = Number(apiBooking.totalPrice) || 0;
            const totalHours = Number(apiBooking.totalHours) || 1;
           
            const vehicleRentPerHour = Number(vehicle?.RentPerHour) || 0;
            const vehicleRentPerDay = Number(vehicle?.RentPerDay) || 0;
           
            if (pricePerKm > 0) return pricePerKm;
            if (pricePerHour > 0) return pricePerHour;
            if (pricePerDay > 0) return pricePerDay;
            if (totalPrice > 0 && totalHours > 0) return totalPrice / totalHours;
           
            if (vehicleRentPerHour > 0) return vehicleRentPerHour;
            if (vehicleRentPerDay > 0) return vehicleRentPerDay;
           
            return 0;
          })();

          const priceUnit = (() => {
            if (Number(apiBooking.pricePerKm) > 0) return "/km";
            if (Number(apiBooking.pricePerHour) > 0) return "/hour";
            if (Number(apiBooking.pricePerDay) > 0) return "/day";
            if (Number(vehicle?.RentPerHour) > 0) return "/hour";
            if (Number(vehicle?.RentPerDay) > 0) return "/day";
            return "/hour";
          })();

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
            priceUnit: priceUnit,
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

  const getStatusColor = (status: string | undefined) => {
    if (!status) return 'bg-gray-100 text-gray-600';
   
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
        b.vehicleName?.toLowerCase().includes(searchText.toLowerCase()) ||
        b.contactNumber?.includes(searchText) ||
        b.status?.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredBookings = getFilteredBookings();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content with blur when modal is open */}
      <div className={`transition-all duration-300 ${showRejectionModal ? 'blur-sm pointer-events-none' : ''}`}>
        {/* Header Section - Mobile Responsive */}
        <div className="bg-white px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto">
            {/* Mobile: Stack vertically, Desktop: Flex row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Heading */}
              <h1 className="text-2xl sm:text-[32px] font-black text-gray-900 tracking-tight">
                My Bookings
              </h1>

              {/* Search and Refresh */}
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="relative flex-1 sm:flex-initial sm:w-80">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-gray-50 rounded-[10px] border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-[10px] text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isRefreshing
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] text-white'
                  }`}
                >
                  <RefreshCw size={16} className={`sm:w-[18px] sm:h-[18px] ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Mobile Responsive */}
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Bookings Count */}
          <div className="mb-4 sm:mb-6">
            <p className="text-sm sm:text-[15px] font-medium text-gray-500">
              {filteredBookings.length} Bookings
            </p>
          </div>

          {/* Loading State */}
          {isLoadingBookings ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-gray-200 border-t-[#3D5AFE] rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500 text-sm sm:text-base">Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-16 text-center">
              <p className="text-sm sm:text-base text-gray-400">No bookings found</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:gap-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  onClick={() => handleBookingClick(booking)}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-sm border-2 border-transparent cursor-pointer transition-all duration-300 overflow-hidden hover:border-[#3D5AFE] hover:shadow-[0_4px_12px_rgba(61,90,254,0.15)]"
                >
                  <div className="p-4 sm:p-7">
                    {/* Mobile: Stack vertically, Desktop: Flex row */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Vehicle Image */}
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <div className="w-full sm:w-[200px] h-[160px] sm:h-[200px] bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl overflow-hidden flex items-center justify-center">
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
                        {/* Vehicle Name and Price */}
                        <div className="mb-2 sm:mb-2.5">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1.5">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                              {booking.vehicleName}
                            </h3>
                          </div>

                          {/* Price */}
                          <div className="text-base sm:text-lg font-bold text-gray-900">
                            ₹{(booking.price || 0).toFixed(0)}
                            <span className="text-xs sm:text-sm font-medium text-gray-500">{(booking as any).priceUnit || "/hour"}</span>
                          </div>
                        </div>

                        {/* Info Grid - Mobile optimized */}
                        <div className="flex flex-col gap-1.5 mb-2 sm:mb-2.5">
                          {/* Date Row */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-5">
                            <div className="flex items-center gap-2">
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
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-5">
                            <div className="flex items-center gap-2">
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
                            <span className="text-xs text-gray-500 font-medium">Mobile:</span>
                            <span className="text-xs font-semibold text-gray-900">
                              {booking.contactNumber ? booking.contactNumber.replace(/\d(?=\d{3})/g, "X") : ""}
                            </span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 font-medium">Status:</span>
                          <span className={`px-2.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold ${getStatusColor(booking.status)}`}>
                            {booking.status === "AutoCancelled" ? "Auto Cancelled" : (booking.status || "Pending")}
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
      </div>

      {/* Rejection Modal - Mobile Responsive */}
      {showRejectionModal && rejectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-50 rounded-full flex items-center justify-center">
                <X size={48} className="sm:w-[56px] sm:h-[56px] text-red-600" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-[28px] font-bold text-center mb-3 sm:mb-4">
              Booking {rejectedBooking.status === "AutoCancelled" ? "Auto Cancelled" : "Rejected"}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 text-center mb-4 sm:mb-6">
              {rejectedBooking.status === "AutoCancelled"
                ? `Your booking for the ${rejectedBooking.vechileType} was automatically cancelled.`
                : `The owner rejected your booking for the ${rejectedBooking.vechileType}.`
              }
            </p>
            <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-4 sm:mb-6 text-sm text-gray-700 border border-gray-200">
              <div className="flex justify-between mb-3">
                <span className="font-semibold">Booking ID:</span>
                <span className="font-medium text-right break-all">{rejectedBooking._id.slice(0, 10)}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="font-semibold">Date:</span>
                <span className="font-medium">{formatApiDate(rejectedBooking.FromDate)}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="font-semibold">Status:</span>
                <span className="font-medium">{rejectedBooking.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Time:</span>
                <span className="font-medium">{formatApiTime(rejectedBooking.FromTime)}</span>
              </div>
            </div>
            {rejectedBooking.rejectionReason && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm font-bold text-amber-800 mb-2">Reason:</p>
                <p className="text-sm text-amber-700">{rejectedBooking.rejectionReason}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectedBooking(null);
                }}
                className="w-full sm:flex-1 bg-gray-100 text-gray-700 font-bold py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl hover:bg-gray-200 transition-colors text-sm sm:text-base"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectedBooking(null);
                  navigate("/rental");
                }}
                className="w-full sm:flex-1 bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] text-white font-bold py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl hover:opacity-90 transition-opacity text-sm sm:text-base"
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