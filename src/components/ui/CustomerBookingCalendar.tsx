// import React, { useState, useEffect } from "react";
// import { X, Calendar, ChevronLeft, ChevronRight, Clock, Info } from "lucide-react";

// // Mock API service for customer-side booking
// const bookingAPI = {
//   getVehicleAvailability: async (vehicleId: string, vehicleType: string, startDate: string, endDate: string) => {
//     console.log("API: getVehicleAvailability", { vehicleId, vehicleType, startDate, endDate });
//     // This would call your actual API to get blocked dates
//     return [];
//   },
//   createBooking: async (payload: any) => {
//     console.log("API: createBooking", payload);
//     return { success: true, bookingId: `booking_${Date.now()}`, data: payload };
//   }
// };

// interface CustomerBookingCalendarProps {
//   isOpen?: boolean;
//   onClose?: () => void;
//   onConfirm?: (
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
//   ) => void;
//   vehicleId?: string;
//   vehicleType?: "Car" | "Bike" | "Auto";
//   vehicleName?: string;
//   pricePerDay?: number;
// }

// const CustomerBookingCalendar: React.FC<CustomerBookingCalendarProps> = ({
//   isOpen = true,
//   onClose = () => {},
//   onConfirm,
//   vehicleId = "vehicle456",
//   vehicleType = "Car",
//   vehicleName = "Sample Vehicle",
//   pricePerDay = 1500
// }) => {
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
//   const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
//   const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);
//   const [startTime, setStartTime] = useState("09:00");
//   const [endTime, setEndTime] = useState("18:00");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [blockedDates, setBlockedDates] = useState<any[]>([]);

//   // Load blocked dates when component mounts or month changes
//   useEffect(() => {
//     if (isOpen) {
//       loadBlockedDatesForMonth();
//     }
//   }, [isOpen, currentMonth, vehicleId, vehicleType]);

//   const loadBlockedDatesForMonth = async () => {
//     try {
//       setLoading(true);

//       const year = currentMonth.getFullYear();
//       const month = currentMonth.getMonth();
      
//       const startDate = new Date(year, month, 1).toISOString().split("T")[0];
//       const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];

//       console.log("📅 Loading blocked dates for:", { startDate, endDate, vehicleId, vehicleType });

//       const slots = await bookingAPI.getVehicleAvailability(
//         vehicleId,
//         vehicleType,
//         startDate,
//         endDate
//       );

//       console.log("✅ Loaded blocked slots:", slots);
//       setBlockedDates(slots || []);
      
//     } catch (error) {
//       console.error("❌ Error loading blocked dates:", error);
//       setMessage("⚠️ Could not load availability. Please try again.");
//       setBlockedDates([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Format date to YYYY-MM-DD for API
//   const formatDateForAPI = (date: Date | null): string => {
//     if (!date) return "";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   // Format date for display (YYYY/MM/DD)
//   const formatDateForDisplay = (date: Date | null): string => {
//     if (!date) return "Select Date";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}/${month}/${day}`;
//   };

//   const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
//   const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   const daysInMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth() + 1,
//     0
//   ).getDate();
//   const firstDayOfMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth(),
//     1
//   ).getDay();

//   const previousMonth = () =>
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
//   const nextMonth = () =>
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

//   const handleDateClick = (date: Date) => {
//     // Check if date is blocked
//     if (isDateBlocked(date)) {
//       setMessage("⚠️ This date is not available for booking");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }

//     // Check if date is in the past
//     if (isPastDate(date)) {
//       setMessage("⚠️ Cannot select past dates");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }

//     if (activeInput === "start") {
//       setSelectedStartDate(date);
//       setActiveInput("end");
//       setMessage("Now select your end date");
//       setTimeout(() => setMessage(""), 2000);
//     } else if (activeInput === "end") {
//       // Ensure end date is not before start date
//       if (selectedStartDate && date < selectedStartDate) {
//         setMessage("⚠️ End date cannot be before start date");
//         setTimeout(() => setMessage(""), 3000);
//         return;
//       }

//       // Check if any date in range is blocked
//       if (isAnyDateInRangeBlocked(selectedStartDate!, date)) {
//         setMessage("⚠️ Some dates in this range are not available");
//         setTimeout(() => setMessage(""), 3000);
//         return;
//       }

//       setSelectedEndDate(date);
//       setActiveInput(null);
//       setMessage("✅ Dates selected! Review and confirm your booking.");
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   const isDateSelected = (date: Date) => {
//     return (
//       (selectedStartDate && selectedStartDate.getTime() === date.getTime()) ||
//       (selectedEndDate && selectedEndDate.getTime() === date.getTime())
//     );
//   };

//   const isDateInRange = (date: Date) => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     return date.getTime() >= selectedStartDate.getTime() && date.getTime() <= selectedEndDate.getTime();
//   };

//   const isDateBlocked = (date: Date) => {
//     return blockedDates.some((slot: any) => {
//       if (!slot.isNotAvailable) return false;
      
//       const fromDate = new Date(slot.fromDate.split('T')[0]);
//       fromDate.setHours(0, 0, 0, 0);
      
//       const toDate = new Date(slot.toDate.split('T')[0]);
//       toDate.setHours(0, 0, 0, 0);
      
//       const checkDate = new Date(date);
//       checkDate.setHours(0, 0, 0, 0);
      
//       return checkDate >= fromDate && checkDate <= toDate;
//     });
//   };

//   const isAnyDateInRangeBlocked = (start: Date, end: Date): boolean => {
//     const current = new Date(start);
//     while (current <= end) {
//       if (isDateBlocked(current)) {
//         return true;
//       }
//       current.setDate(current.getDate() + 1);
//     }
//     return false;
//   };

//   const isPastDate = (date: Date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const checkDate = new Date(date);
//     checkDate.setHours(0, 0, 0, 0);
//     return checkDate < today;
//   };

//   const renderCalendarDays = () => {
//     const days = [];

//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push(<div key={`empty-${i}`} className="py-2" />);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//       const isSelected = isDateSelected(date);
//       const inRange = isDateInRange(date);
//       const blocked = isDateBlocked(date);
//       const past = isPastDate(date);

//       let dayClass = "text-gray-700 hover:bg-blue-50 hover:scale-105";
//       let isDisabled = past || blocked;

//       if (past) {
//         dayClass = "text-gray-300 cursor-not-allowed bg-gray-50";
//       } else if (blocked) {
//         dayClass = "bg-red-50 text-red-400 cursor-not-allowed line-through";
//       } else if (isSelected) {
//         dayClass = "bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white ring-2 ring-blue-400 scale-110";
//       } else if (inRange) {
//         dayClass = "bg-blue-100 text-blue-700";
//       }

//       days.push(
//         <button
//           key={day}
//           disabled={isDisabled}
//           className={`py-2 rounded-lg transition-all w-full font-medium ${dayClass}`}
//           onClick={() => !isDisabled && handleDateClick(date)}
//         >
//           {day}
//         </button>
//       );
//     }
//     return days;
//   };

//   const generateTimeOptions = () => {
//     const options = [];
//     for (let h = 0; h < 24; h++) {
//       for (let m = 0; m < 60; m += 30) {
//         const hour = h.toString().padStart(2, "0");
//         const minute = m.toString().padStart(2, "0");
//         const time = `${hour}:${minute}`;
//         const period = h >= 12 ? "PM" : "AM";
//         const displayHour = h % 12 || 12;
//         options.push({ value: time, label: `${displayHour}:${minute.padStart(2, "0")} ${period}` });
//       }
//     }
//     return options;
//   };

//   const timeOptions = generateTimeOptions();

//   const calculateTotalDays = () => {
//     if (!selectedStartDate || !selectedEndDate) return 0;
//     const days = Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
//     return days;
//   };

//   const calculateTotalPrice = () => {
//     const days = calculateTotalDays();
//     return days * pricePerDay;
//   };

//   const handleConfirmBooking = async () => {
//     if (!selectedStartDate || !selectedEndDate) {
//       setMessage("⚠️ Please select both start and end dates");
//       return;
//     }

//     const formattedStartDate = formatDateForAPI(selectedStartDate);
//     const formattedEndDate = formatDateForAPI(selectedEndDate);

//     // If onConfirm callback is provided, use it
//     if (onConfirm) {
//       onConfirm(formattedStartDate, formattedEndDate, startTime, endTime);
//       return;
//     }

//     // Otherwise proceed with booking
//     setLoading(true);
//     setMessage("Processing your booking...");

//     const bookingPayload = {
//       vehicleId,
//       vehicleType,
//       startDate: formattedStartDate,
//       endDate: formattedEndDate,
//       startTime: startTime.padStart(5, "0"),
//       endTime: endTime.padStart(5, "0"),
//       totalDays: calculateTotalDays(),
//       totalPrice: calculateTotalPrice()
//     };

//     console.log("📋 Booking payload:", bookingPayload);

//     try {
//       const response = await bookingAPI.createBooking(bookingPayload);
//       console.log("✅ Booking response:", response);
//       setMessage(`✅ Booking confirmed! Booking ID: ${response.bookingId}`);
      
//       setTimeout(() => {
//         onClose();
//       }, 2000);
//     } catch (error: any) {
//       console.error("❌ Booking error:", error);
//       const errorMsg = error?.response?.data?.message || error?.message || "Failed to create booking";
//       setMessage(`❌ ${errorMsg}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl p-6 relative max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               <Calendar size={28} className="text-blue-600" />
//               Book Your {vehicleType}
//             </h2>
//             <p className="text-sm text-gray-600 mt-1">{vehicleName} • ₹{pricePerDay}/day</p>
//           </div>
//           <button 
//             onClick={onClose} 
//             className="p-2 rounded-full hover:bg-gray-100 transition text-gray-400 hover:text-gray-600"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Left Column: Calendar */}
//           <div className="flex-1 space-y-4">
//             {/* Date Selection Boxes */}
//             <div className="grid grid-cols-2 gap-4">
//               <div 
//                 className="cursor-pointer" 
//                 onClick={() => setActiveInput("start")}
//               >
//                 <label className="flex items-center gap-2 text-sm text-gray-600 font-medium mb-2">
//                   <Calendar size={18} className="text-blue-500" /> 
//                   Pickup Date
//                 </label>
//                 <div
//                   className={`border-2 rounded-lg p-4 text-center font-semibold text-lg transition ${
//                     activeInput === "start" 
//                       ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50" 
//                       : "border-gray-200 bg-white"
//                   }`}
//                 >
//                   {formatDateForDisplay(selectedStartDate)}
//                 </div>
//               </div>

//               <div 
//                 className="cursor-pointer" 
//                 onClick={() => setActiveInput("end")}
//               >
//                 <label className="flex items-center gap-2 text-sm text-gray-600 font-medium mb-2">
//                   <Calendar size={18} className="text-blue-500" /> 
//                   Return Date
//                 </label>
//                 <div
//                   className={`border-2 rounded-lg p-4 text-center font-semibold text-lg transition ${
//                     activeInput === "end" 
//                       ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50" 
//                       : "border-gray-200 bg-white"
//                   }`}
//                 >
//                   {formatDateForDisplay(selectedEndDate)}
//                 </div>
//               </div>
//             </div>

//             {/* Calendar */}
//             <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
//               <div className="flex justify-between items-center mb-4">
//                 <button 
//                   onClick={previousMonth} 
//                   disabled={loading}
//                   className="p-2 hover:bg-white rounded-lg transition disabled:opacity-50 shadow-sm"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <h3 className="font-bold text-lg text-gray-800">{monthName}</h3>
//                 <button 
//                   onClick={nextMonth} 
//                   disabled={loading}
//                   className="p-2 hover:bg-white rounded-lg transition disabled:opacity-50 shadow-sm"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </div>

//               <div className="grid grid-cols-7 gap-1 mb-3">
//                 {weekDays.map((day) => (
//                   <div key={day} className="text-center text-xs font-bold text-gray-600 py-2">
//                     {day}
//                   </div>
//                 ))}
//               </div>

//               <div className="grid grid-cols-7 gap-1">
//                 {renderCalendarDays()}
//               </div>
//             </div>

//             {/* Legend */}
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2 text-xs">
//               <div className="flex items-center gap-2">
//                 <div className="w-6 h-6 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] rounded"></div>
//                 <span className="text-gray-700 font-medium">Selected dates</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-6 h-6 bg-red-50 rounded border border-red-300 flex items-center justify-center">
//                   <span className="text-red-400 text-[10px] line-through">X</span>
//                 </div>
//                 <span className="text-gray-700 font-medium">Not available</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-6 h-6 bg-white rounded border border-gray-300"></div>
//                 <span className="text-gray-700 font-medium">Available</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Booking Details */}
//           <div className="w-full lg:w-96 space-y-4">
//             {/* Time Selection */}
//             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
//               <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <Clock size={18} className="text-blue-600" />
//                 Pickup & Return Time
//               </h3>
              
//               <div className="space-y-3">
//                 <div>
//                   <label className="text-xs text-gray-600 font-medium">Pickup Time</label>
//                   <select
//                     value={startTime}
//                     onChange={(e) => setStartTime(e.target.value)}
//                     className="w-full p-3 border-2 border-blue-200 rounded-lg bg-white text-gray-900 font-semibold outline-none mt-1"
//                   >
//                     {timeOptions.map((time) => (
//                       <option key={time.value} value={time.value}>
//                         {time.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="text-xs text-gray-600 font-medium">Return Time</label>
//                   <select
//                     value={endTime}
//                     onChange={(e) => setEndTime(e.target.value)}
//                     className="w-full p-3 border-2 border-blue-200 rounded-lg bg-white text-gray-900 font-semibold outline-none mt-1"
//                   >
//                     {timeOptions.map((time) => (
//                       <option key={time.value} value={time.value}>
//                         {time.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Summary */}
//             {(selectedStartDate || selectedEndDate) && (
//               <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-4">
//                 <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                   <Info size={18} className="text-gray-600" />
//                   Booking Summary
//                 </h3>
                
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Pickup:</span>
//                     <span className="font-semibold text-gray-800">
//                       {selectedStartDate ? formatDateForDisplay(selectedStartDate) : "Not selected"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Return:</span>
//                     <span className="font-semibold text-gray-800">
//                       {selectedEndDate ? formatDateForDisplay(selectedEndDate) : "Not selected"}
//                     </span>
//                   </div>
                  
//                   {selectedStartDate && selectedEndDate && (
//                     <>
//                       <div className="border-t border-gray-300 my-2"></div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Duration:</span>
//                         <span className="font-bold text-gray-800">
//                           {calculateTotalDays()} {calculateTotalDays() === 1 ? "day" : "days"}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Rate:</span>
//                         <span className="font-semibold text-gray-800">₹{pricePerDay}/day</span>
//                       </div>
//                       <div className="border-t-2 border-gray-400 my-2"></div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-800 font-bold text-lg">Total:</span>
//                         <span className="font-bold text-blue-600 text-2xl">
//                           ₹{calculateTotalPrice().toLocaleString()}
//                         </span>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Messages */}
//             {message && (
//               <div className={`p-3 rounded-lg text-sm font-medium ${
//                 message.includes('✅') 
//                   ? 'bg-green-50 text-green-800 border-2 border-green-200' 
//                   : message.includes('⚠️') || message.includes('❌')
//                   ? 'bg-red-50 text-red-800 border-2 border-red-200'
//                   : 'bg-blue-50 text-blue-800 border-2 border-blue-200'
//               }`}>
//                 {message}
//               </div>
//             )}

//             {/* Confirm Button */}
//             <button
//               onClick={handleConfirmBooking}
//               disabled={!selectedStartDate || !selectedEndDate || loading}
//               className="w-full bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   <Calendar size={20} />
//                   Confirm Booking
//                 </>
//               )}
//             </button>

//             {/* Additional Info */}
//             <div className="text-xs text-gray-500 text-center bg-gray-50 p-3 rounded-lg border border-gray-200">
//               <p className="flex items-center justify-center gap-1">
//                 <Info size={14} />
//                 Click start date, then end date to select your booking period
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerBookingCalendar;









// import React, { useState, useEffect } from "react";
// import { X, Calendar, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

// // Real API Client - Replace with your actual API base URL
// const API_BASE_URL = 'http://3.110.122.127:3000'; // ⚠️ UPDATE THIS

// const apiClient = {
//   get: async (endpoint: string, options?: any) => {
//     const url = new URL(endpoint, API_BASE_URL);
//     if (options?.params) {
//       Object.keys(options.params).forEach(key => 
//         url.searchParams.append(key, options.params[key])
//       );
//     }
//     const response = await fetch(url.toString(), {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         // Add authentication headers if needed
//         // 'Authorization': `Bearer ${token}`
//       }
//     });
//     if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
//     return response.json();
//   },
  
//   post: async (endpoint: string, body: any, options?: any) => {
//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       method: 'POST',
//       headers: {
//         ...options?.headers,
//         // Add authentication headers if needed
//         // 'Authorization': `Bearer ${token}`
//       },
//       body: body
//     });
//     if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
//     return response.json();
//   }
// };

// // Real API Integration
// const availabilityAPI = {
//   createUnavailability: async (availabilityData: {
//     userId?: string;
//     VechileId: string;
//     vechileType: 'Car' | 'Bike' | 'Auto';
//     fromDate: string;
//     toDate: string;
//     fromTime?: string;
//     toTime?: string;
//     isNotAvailable?: boolean;
//   }) => {
//     console.log("🚫 Create Unavailability - Input data:", availabilityData);
//     const urlencoded = new URLSearchParams();
//     if (availabilityData.userId) urlencoded.append("userId", availabilityData.userId);
//     urlencoded.append("VechileId", availabilityData.VechileId);
//     urlencoded.append("vechileType", availabilityData.vechileType);
//     urlencoded.append("fromDate", availabilityData.fromDate);
//     urlencoded.append("toDate", availabilityData.toDate);
//     urlencoded.append("fromTime", availabilityData.fromTime || "00:00");
//     urlencoded.append("toTime", availabilityData.toTime || "23:59");
//     urlencoded.append("isNotAvailable", String(availabilityData.isNotAvailable ?? true));
//     console.log("🚫 Create Unavailability - Encoded Body:", urlencoded.toString());
//     return apiClient.post("/createNotAvailability", urlencoded, {
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     });
//   },

//   getVehicleAvailability: async (
//     VechileId: string,
//     vechileType: 'Car' | 'Bike' | 'Auto',
//     startDate: string,
//     endDate: string
//   ) => {
//     console.log("📅 Get Vehicle Availability:", { VechileId, vechileType, startDate, endDate });
//     return apiClient.get("/getVehicleAvailability", {
//       params: {
//         VechileId,
//         vechileType,
//         startDate,
//         endDate,
//       },
//     });
//   },

//   getUnavailabilityById: async (availabilityId: string) => {
//     console.log("📄 Get Unavailability By ID:", availabilityId);
//     return apiClient.get(`/getNotAvailabilityById/${availabilityId}`);
//   },
// };

// // Booking API
// const bookingAPI = {
//   createBooking: async (bookingData: {
//     customerId: string;
//     VechileId: string;
//     vehicleType: 'Car' | 'Bike' | 'Auto';
//     fromDate: string;
//     toDate: string;
//     fromTime: string;
//     toTime: string;
//     bookingDate: string;
//   }) => {
//     console.log("📅 Creating booking:", bookingData);
//     const urlencoded = new URLSearchParams();
//     Object.keys(bookingData).forEach(key => {
//       urlencoded.append(key, (bookingData as any)[key]);
//     });
//     return apiClient.post("/createBooking", urlencoded, {
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     });
//   }
// };

// interface AvailabilitySlot {
//   _id: string;
//   VechileId: string;
//   vechileType: string;
//   fromDate: string;
//   toDate: string;
//   fromTime?: string;
//   toTime?: string;
//   isNotAvailable: boolean;
// }

// interface CustomerBookingCalendarProps {
//   isOpen?: boolean;
//   onClose?: () => void;
//   onBookingConfirm?: (bookingData: any) => void;  // ✅ this one exists
//   VechileId?: string;
//   vehicleType?: "Car" | "Bike" | "Auto";
//   customerId?: string;
// }

// const CustomerBookingCalendar: React.FC<CustomerBookingCalendarProps> = ({
//   isOpen = true,
//   onClose = () => {},
//   onBookingConfirm,
//   VechileId = "vehicle456",
//   vehicleType = "Car",
//   customerId = "customer789"
// }) => {
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
//   const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
//   const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);
//   const [startTime, setStartTime] = useState("09:00");
//   const [endTime, setEndTime] = useState("17:00");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [existingSlots, setExistingSlots] = useState<AvailabilitySlot[]>([]);

//   // Load slots when component mounts or month changes
//   useEffect(() => {
//     if (isOpen) {
//       loadSlotsForCurrentMonth();
//     }
//   }, [isOpen, currentMonth, VechileId, vehicleType]);

//   const loadSlotsForCurrentMonth = async () => {
//     try {
//       setLoading(true);
//       setMessage("🔄 Loading availability...");

//       const year = currentMonth.getFullYear();
//       const month = currentMonth.getMonth();
      
//       const startDate = new Date(year, month, 1).toISOString().split("T")[0];
//       const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];

//       console.log("📅 Loading slots for:", { startDate, endDate, VechileId, vehicleType });

//       const response = await availabilityAPI.getVehicleAvailability(
//         VechileId,
//         vehicleType,
//         startDate,
//         endDate
//       );

//       console.log("✅ API Response:", response);
      
//       // Handle different response structures
//       const slots = response?.data || response?.slots || response || [];
      
//       console.log("✅ Loaded slots:", slots);
//       setExistingSlots(Array.isArray(slots) ? slots : []);
//       setMessage("");
      
//     } catch (error: any) {
//       console.error("❌ Error loading slots:", error);
//       setMessage("⚠️ Could not load availability. Please try again.");
//       setExistingSlots([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = () => {
//     setMessage("🔄 Refreshing availability...");
//     loadSlotsForCurrentMonth();
//   };

//   const formatDateForAPI = (date: Date | null): string => {
//     if (!date) return "";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const formatDateForDisplay = (date: Date | null): string => {
//     if (!date) return "Select Date";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}/${month}/${day}`;
//   };

//   const monthName = currentMonth.toLocaleDateString("en-US", { month: "short", year: "numeric" });
//   const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   const daysInMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth() + 1,
//     0
//   ).getDate();
//   const firstDayOfMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth(),
//     1
//   ).getDay();

//   const previousMonth = () =>
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
//   const nextMonth = () =>
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

//   // Check date availability status
//   const getDateStatus = (date: Date): { isAvailable: boolean; isBlocked: boolean; slot: AvailabilitySlot | null } => {
//     const normalizedDate = new Date(date);
//     normalizedDate.setHours(0, 0, 0, 0);
    
//     for (const slot of existingSlots) {
//       const fromDate = new Date(slot.fromDate.split('T')[0]);
//       fromDate.setHours(0, 0, 0, 0);
      
//       const toDate = new Date(slot.toDate.split('T')[0]);
//       toDate.setHours(0, 0, 0, 0);
      
//       if (normalizedDate >= fromDate && normalizedDate <= toDate) {
//         return {
//           isAvailable: !slot.isNotAvailable,
//           isBlocked: slot.isNotAvailable,
//           slot: slot
//         };
//       }
//     }
    
//     return { isAvailable: false, isBlocked: false, slot: null };
//   };

//   const isPastDate = (date: Date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const checkDate = new Date(date);
//     checkDate.setHours(0, 0, 0, 0);
//     return checkDate < today;
//   };

//   const handleDateClick = (date: Date, status: { isAvailable: boolean; isBlocked: boolean }) => {
//     // Only allow clicking on available dates
//     if (!status.isAvailable || status.isBlocked) {
//       if (status.isBlocked) {
//         setMessage("❌ This date is not available for booking");
//         setTimeout(() => setMessage(""), 2000);
//       }
//       return;
//     }

//     if (activeInput === "start") {
//       setSelectedStartDate(date);
//       setActiveInput("end");
//       setMessage("✅ Start date selected. Now select end date.");
//       setTimeout(() => setMessage(""), 2000);
//     } else if (activeInput === "end") {
//       if (selectedStartDate && date < selectedStartDate) {
//         setMessage("⚠️ End date cannot be before start date");
//         setTimeout(() => setMessage(""), 3000);
//         return;
//       }
      
//       // Check if all dates in range are available
//       if (selectedStartDate) {
//         const isRangeAvailable = checkDateRangeAvailability(selectedStartDate, date);
//         if (!isRangeAvailable) {
//           setMessage("❌ Some dates in the selected range are not available");
//           setTimeout(() => setMessage(""), 3000);
//           return;
//         }
//       }
      
//       setSelectedEndDate(date);
//       setActiveInput(null);
//       setMessage("✅ Date range selected. Review and confirm booking.");
//       setTimeout(() => setMessage(""), 2000);
//     }
//   };

//   const checkDateRangeAvailability = (start: Date, end: Date): boolean => {
//     const current = new Date(start);
//     while (current <= end) {
//       const status = getDateStatus(current);
//       if (status.isBlocked || !status.isAvailable) {
//         return false;
//       }
//       current.setDate(current.getDate() + 1);
//     }
//     return true;
//   };

//   const isDateSelected = (date: Date) => {
//     return (
//       (selectedStartDate && selectedStartDate.getTime() === date.getTime()) ||
//       (selectedEndDate && selectedEndDate.getTime() === date.getTime())
//     );
//   };

//   const isDateInRange = (date: Date) => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     return date.getTime() >= selectedStartDate.getTime() && date.getTime() <= selectedEndDate.getTime();
//   };

//   const renderCalendarDays = () => {
//     const days = [];
//     const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

//     for (let i = 0; i < startDay; i++) days.push(<div key={`empty-${i}`} />);

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//       const isSelected = isDateSelected(date);
//       const inRange = isDateInRange(date);
//       const past = isPastDate(date);
//       const status = getDateStatus(date);
      
//       const isClickable = !past && status.isAvailable && !status.isBlocked;
//       const showBlocked = status.isBlocked;
//       const showAvailable = status.isAvailable && !status.isBlocked;

//       days.push(
//         <button
//           key={day}
//           disabled={past || !isClickable}
//           className={`py-2 rounded-full transition w-full relative ${
//             past
//               ? "text-gray-300 cursor-not-allowed bg-gray-100"
//               : showBlocked
//               ? "bg-red-50 border-2 border-red-300 cursor-not-allowed"
//               : showAvailable && isSelected
//               ? "bg-blue-600 text-white ring-2 ring-blue-400 cursor-pointer"
//               : showAvailable && inRange
//               ? "bg-blue-100 text-blue-700 cursor-pointer"
//               : showAvailable
//               ? "bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white cursor-pointer hover:opacity-90"
//               : "text-gray-700 bg-white border border-gray-200 cursor-default hover:bg-gray-50"
//           }`}
//           onClick={() => isClickable && handleDateClick(date, status)}
//         >
//           <span className={showBlocked ? "text-gray-800 font-bold relative z-10" : ""}>
//             {day}
//           </span>
//           {showBlocked && (
//             <>
//               <svg
//                 className="absolute inset-0 w-full h-full pointer-events-none z-20"
//                 viewBox="0 0 40 40"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <line 
//                   x1="4" y1="4" x2="36" y2="36" 
//                   stroke="#dc2626" 
//                   strokeWidth="3" 
//                   strokeLinecap="round" 
//                 />
//                 <line 
//                   x1="36" y1="4" x2="4" y2="36" 
//                   stroke="#dc2626" 
//                   strokeWidth="3" 
//                   strokeLinecap="round" 
//                 />
//               </svg>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white z-30"></div>
//             </>
//           )}
//         </button>
//       );
//     }
//     return days;
//   };

//   const generateTimeOptions = () => {
//     const options = [];
//     for (let h = 0; h < 24; h++) {
//       for (let m = 0; m < 60; m += 30) {
//         const hour = h.toString().padStart(2, "0");
//         const minute = m.toString().padStart(2, "0");
//         const time = `${hour}:${minute}`;
//         const period = h >= 12 ? "PM" : "AM";
//         const displayHour = h % 12 || 12;
//         options.push({ value: time, label: `${displayHour}:${minute.padStart(2, "0")} ${period}` });
//       }
//     }
//     return options;
//   };

//   const timeOptions = generateTimeOptions();

//   const handleBookingConfirm = async () => {
//     if (!selectedStartDate || !selectedEndDate) {
//       setMessage("⚠️ Please select both start and end dates");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }

//     const bookingData = {
//       customerId,
//       VechileId,
//       vehicleType,
//       fromDate: formatDateForAPI(selectedStartDate),
//       toDate: formatDateForAPI(selectedEndDate),
//       fromTime: startTime,
//       toTime: endTime,
//       bookingDate: new Date().toISOString(),
//     };

//     setLoading(true);
//     setMessage("📅 Processing your booking...");

//     try {
//       const response = await bookingAPI.createBooking(bookingData);
//       console.log("✅ Booking response:", response);
      
//       setMessage("🎉 Booking confirmed successfully!");
      
//       // After successful booking, mark these dates as unavailable
//       await availabilityAPI.createUnavailability({
//         userId: customerId,
//         VechileId,
//         vechileType: vehicleType,
//         fromDate: bookingData.fromDate,
//         toDate: bookingData.toDate,
//         fromTime: bookingData.fromTime,
//         toTime: bookingData.toTime,
//         isNotAvailable: true
//       });

//       // Reload slots to show updated availability
//       await loadSlotsForCurrentMonth();
      
//       if (onBookingConfirm) {
//         onBookingConfirm(bookingData);
//       }

//       setTimeout(() => {
//         setSelectedStartDate(null);
//         setSelectedEndDate(null);
//         setMessage("");
//         onClose();
//       }, 2000);
      
//     } catch (error: any) {
//       console.error("❌ Booking error:", error);
//       setMessage(`❌ Booking failed: ${error?.message || "Please try again"}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-6 relative max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//             <Calendar size={24} className="text-blue-600" />
//             Book Your {vehicleType}
//           </h2>
//           <div className="flex items-center gap-2">
//             <button 
//               onClick={handleRefresh}
//               disabled={loading}
//               className="p-2 rounded-full hover:bg-gray-100 transition text-gray-600 disabled:opacity-50"
//               title="Refresh availability"
//             >
//               <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
//             </button>
//             <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition text-gray-400 hover:text-gray-600">
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Left Column: Dates + Calendar */}
//           <div className="flex-1 space-y-4">
//             {/* Start & End Date */}
//             <div className="flex gap-4">
//               <div className="flex-1 cursor-pointer" onClick={() => setActiveInput("start")}>
//                 <label className="flex items-center gap-2 text-sm text-gray-500 font-medium">
//                   <Calendar size={20} className="text-gray-400" /> Pickup Date
//                 </label>
//                 <div
//                   className={`border rounded-lg p-4 text-center text-gray-700 font-semibold text-lg ${
//                     activeInput === "start" ? "ring-2 ring-blue-500" : ""
//                   }`}
//                 >
//                   {formatDateForDisplay(selectedStartDate)}
//                 </div>
//               </div>

//               <div className="flex-1 cursor-pointer" onClick={() => setActiveInput("end")}>
//                 <label className="flex items-center gap-2 text-sm text-gray-500 font-medium">
//                   <Calendar size={20} className="text-gray-400" /> Return Date
//                 </label>
//                 <div
//                   className={`border rounded-lg p-4 text-center text-gray-700 font-semibold text-lg ${
//                     activeInput === "end" ? "ring-2 ring-blue-500" : ""
//                   }`}
//                 >
//                   {formatDateForDisplay(selectedEndDate)}
//                 </div>
//               </div>
//             </div>

//             {/* Calendar */}
//             <div className="border rounded-lg p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <button onClick={previousMonth} disabled={loading} className="p-1 hover:bg-gray-100 rounded disabled:opacity-50">
//                   <ChevronLeft size={20} />
//                 </button>
//                 <span className="font-semibold">{monthName}</span>
//                 <button onClick={nextMonth} disabled={loading} className="p-1 hover:bg-gray-100 rounded disabled:opacity-50">
//                   <ChevronRight size={20} />
//                 </button>
//               </div>

//               {loading && (
//                 <div className="text-center py-4 text-gray-500">
//                   <RefreshCw size={24} className="animate-spin mx-auto mb-2" />
//                   Loading availability...
//                 </div>
//               )}

//               <div className="grid grid-cols-7 gap-1 mb-2">
//                 {weekDays.map((day) => (
//                   <div key={day} className="text-center text-xs text-gray-500 font-medium">
//                     {day}
//                   </div>
//                 ))}
//               </div>

//               <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
//             </div>

//             {/* Legend */}
//             <div className="space-y-2 text-xs">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] rounded flex items-center justify-center">
//                   <span className="text-[10px] text-white font-bold">15</span>
//                 </div>
//                 <span className="text-gray-600 font-medium">Available for booking (click to select)</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-red-50 border-2 border-red-300 rounded flex items-center justify-center relative">
//                   <span className="text-[10px] text-gray-800 font-bold z-10">20</span>
//                   <svg className="absolute inset-0 w-full h-full" viewBox="0 0 32 32">
//                     <line x1="6" y1="6" x2="26" y2="26" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
//                     <line x1="26" y1="6" x2="6" y2="26" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
//                   </svg>
//                   <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></div>
//                 </div>
//                 <span className="text-gray-600 font-medium">Not available (cannot book)</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
//                   <span className="text-xs font-medium text-gray-700">25</span>
//                 </div>
//                 <span className="text-gray-600 font-medium">No status (not clickable)</span>
//               </div>
//             </div>

//             {/* Info Note */}
//             <div className="text-xs text-gray-500 flex items-center gap-2 bg-blue-50 p-2 rounded">
//               <span>ℹ️</span>
//               <span>Only blue dates are available for booking. Click to select your dates.</span>
//             </div>
//           </div>

//           {/* Right Column: Time Selection & Booking */}
//           <div className="w-full md:w-1/3 space-y-4">
//             <div>
//               <label className="text-sm text-gray-500 font-medium">Pickup Time</label>
//               <select
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 className="w-full p-3 border rounded-lg bg-white text-gray-900 font-semibold outline-none mt-1"
//               >
//                 {timeOptions.map((time) => (
//                   <option key={time.value} value={time.value}>
//                     {time.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="text-sm text-gray-500 font-medium">Return Time</label>
//               <select
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 className="w-full p-3 border rounded-lg bg-white text-gray-900 font-semibold outline-none mt-1"
//               >
//                 {timeOptions.map((time) => (
//                   <option key={time.value} value={time.value}>
//                     {time.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {message && (
//               <div className={`p-3 rounded-lg text-sm font-medium ${
//                 message.includes('✅') || message.includes('🎉')
//                   ? 'bg-green-50 text-green-800 border border-green-200' 
//                   : message.includes('⚠️') || message.includes('❌')
//                   ? 'bg-red-50 text-red-800 border border-red-200'
//                   : 'bg-blue-50 text-blue-800 border border-blue-200'
//               }`}>
//                 {message}
//               </div>
//             )}

//             {/* Booking Summary */}
//             {(selectedStartDate || selectedEndDate) && (
//               <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
//                 <p className="text-sm font-semibold text-gray-700 mb-3">📋 Booking Summary</p>
//                 <div className="space-y-2 text-sm text-gray-600">
//                   <div className="flex justify-between">
//                     <span className="font-medium">Vehicle:</span>
//                     <span className="text-blue-600 font-semibold">{vehicleType}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium">Pickup:</span>
//                     <span>{selectedStartDate ? formatDateForDisplay(selectedStartDate) : "Not selected"}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium">Return:</span>
//                     <span>{selectedEndDate ? formatDateForDisplay(selectedEndDate) : "Not selected"}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium">Time:</span>
//                     <span>{startTime} - {endTime}</span>
//                   </div>
//                   {selectedStartDate && selectedEndDate && (
//                     <div className="pt-2 border-t border-blue-200 mt-2">
//                       <div className="flex justify-between text-blue-600 font-semibold">
//                         <span>Total Days:</span>
//                         <span>{Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1}</span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Confirm Booking Button */}
//             <button
//               onClick={handleBookingConfirm}
//               disabled={!selectedStartDate || !selectedEndDate || loading}
//               className="w-full bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-4 px-6 rounded-lg transition shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <RefreshCw size={18} className="animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   <Calendar size={18} />
//                   Confirm Booking
//                 </>
//               )}
//             </button>

//             <p className="text-xs text-center text-gray-500">
//               By confirming, you agree to the booking terms and conditions
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerBookingCalendar;