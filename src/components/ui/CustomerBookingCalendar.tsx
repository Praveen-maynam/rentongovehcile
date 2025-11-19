

// import React, { useState, useEffect } from "react";
// import {
//   X,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
//   AlertCircle,
//   CheckCircle,
// } from "lucide-react";

// // ==========================================
// // TIME SELECTION POPUP
// // ==========================================

// const TimeSelectionPopup = ({ 
//   isOpen, 
//   onClose, 
//   onConfirm, 
//   startTime,
//   endTime,
//   setStartTime,
//   setEndTime
// }) => {
//   if (!isOpen) return null;

//   const generateTimeOptions = () => {
//     const arr = [];
//     for (let h = 0; h < 24; h++) {
//       for (let m = 0; m < 60; m += 30) {
//         const hh = String(h).padStart(2, "0");
//         const mm = String(m).padStart(2, "0");
//         arr.push({
//           value: `${hh}:${mm}`,
//           label: `${h % 12 || 12}:${mm} ${h >= 12 ? "PM" : "AM"}`,
//         });
//       }
//     }
//     return arr;
//   };

//   const timeOptions = generateTimeOptions();
// const [isProcessing, setIsProcessing] = useState(false);
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] p-6 text-white">
//           <div className="flex justify-between items-start">
//             <div>
//               <h2 className="text-2xl font-bold mb-1">Select Time</h2>
//               <p className="text-blue-100 text-sm">Choose pickup and return times</p>
//             </div>
//             <button 
//               onClick={onClose}
//               className="text-white hover:bg-white/20 rounded-full p-1 transition"
//             >
//               <X size={24} />
//             </button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-4">
//           <div>
//             <label className="font-semibold block mb-2">Pickup Time</label>
//             <select
//               className="w-full p-3 border rounded-lg"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//             >
//               {timeOptions.map((t) => (
//                 <option value={t.value} key={t.value}>
//                   {t.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="font-semibold block mb-2">Return Time</label>
//             <select
//               className="w-full p-3 border rounded-lg"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//             >
//               {timeOptions.map((t) => (
//                 <option value={t.value} key={t.value}>
//                   {t.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="px-6 pb-6 flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="flex-1 px-4 py-3 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white rounded-lg font-semibold hover:opacity-90 transition shadow-lg"
//           >
//             Confirm Time
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // BOOKING CONFIRMATION POPUP
// // ==========================================

// const BookingConfirmationPopup = ({ 
//   isOpen, 
//   onClose, 
//   onConfirm, 
//   bookingDetails,
//   vehicleDetails 
// }) => {
//   if (!isOpen) return null;

//   const { startDate, endDate, startTime, endTime, totalDays, totalPrice } = bookingDetails;
//   const { vehicleName, vehicleType, pricePerDay } = vehicleDetails;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[70]">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] p-6 text-white">
//           <div className="flex justify-between items-start">
//             <div>
//               <h2 className="text-2xl font-bold mb-1">Confirm Booking</h2>
//               <p className="text-blue-100 text-sm">Review your rental details</p>
//             </div>
//             <button 
//               onClick={onClose}
//               className="text-white hover:bg-white/20 rounded-full p-1 transition"
//             >
//               <X size={24} />
//             </button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-4">
//           {/* Vehicle Info */}
//           <div className="bg-gray-50 rounded-lg p-4">
//             <h3 className="font-semibold text-gray-700 mb-2">Vehicle Details</h3>
//             <p className="text-lg font-bold text-gray-900">{vehicleName}</p>
//             <p className="text-sm text-gray-600">Type: {vehicleType}</p>
//           </div>

//           {/* Booking Dates */}
//           <div className="space-y-3">
//             <div className="flex items-start gap-3">
//               <Calendar className="text-blue-600 mt-1" size={20} />
//               <div className="flex-1">
//                 <p className="text-sm text-gray-600">Pickup Date</p>
//                 <p className="font-semibold text-gray-900">{startDate}</p>
//                 <p className="text-sm text-gray-500">Time: {startTime}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <Calendar className="text-blue-600 mt-1" size={20} />
//               <div className="flex-1">
//                 <p className="text-sm text-gray-600">Return Date</p>
//                 <p className="font-semibold text-gray-900">{endDate}</p>
//                 <p className="text-sm text-gray-500">Time: {endTime}</p>
//               </div>
//             </div>
//           </div>

//           {/* Price Breakdown */}
//           <div className="border-t pt-4 space-y-2">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Rate per day</span>
//               <span className="font-semibold">₹{pricePerDay}</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Total days</span>
//               <span className="font-semibold">{totalDays} days</span>
//             </div>
//             <div className="flex justify-between text-lg font-bold border-t pt-2">
//               <span>Total Amount</span>
//               <span className="text-blue-600">₹{totalPrice}</span>
//             </div>
//           </div>

//           {/* Important Note */}
//           <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
//             <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
//             <p className="text-xs text-amber-800">
//               Please arrive on time for pickup. Late arrivals may affect your booking.
//             </p>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="px-6 pb-6 flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="flex-1 px-4 py-3 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white rounded-lg font-semibold hover:opacity-90 transition shadow-lg"
//           >
//             Confirm Booking
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // CUSTOMER BOOKING CALENDAR
// // ==========================================

// const CustomerBookingCalendar = ({
//   isOpen = true,
//   onClose = () => {},
//   onBookingConfirmed,
  
//   vehicleId = localStorage.getItem("vehicleId") || "V001",
//   vehicleType = localStorage.getItem("vehicletype") || "Car",
//   vehicleName = "Vehicle",
//   pricePerDay = 1500
// }) => {

//   // STATE
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedStartDate, setSelectedStartDate] = useState(null);
//   const [selectedEndDate, setSelectedEndDate] = useState(null);
//   const [startTime, setStartTime] = useState("09:00");
//   const [endTime, setEndTime] = useState("18:00");
//   const [blockedDates, setBlockedDates] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [showTimePopup, setShowTimePopup] = useState(false);
//   const [showConfirmPopup, setShowConfirmPopup] = useState(false);

//   // ============================
//   // FORMATTERS
//   // ============================

//   const formatDateForAPI = (date) => {
//     if (!date) return "";
//     return date.toISOString().split("T")[0];
//   };

//   const formatDateForDisplay = (date) => {
//     if (!date) return "Select Date";
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   // ============================
//   // FETCH API UNAVAILABLE DATES
//   // ============================

//   const fetchVehicleAvailability = async () => {
//     setLoading(true);
//     try {
//       const url = `http://3.110.122.127:3000/getVehicleAvailability?vechileType=${vehicleType}&VechileId=${vehicleId}`;
//       const res = await fetch(url);
//       const data = await res.json();

//       if (data.success && data.availability) {
//         const unavailable = data.availability
//           .filter((item) => item.status === "Unavailable")
//           .map((item) => item.date);
//         setBlockedDates(unavailable);
//       }
//     } catch (err) {
//       console.error("Failed to fetch availability", err);
//       showMessage("error", "Failed to load availability");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================
//   // USE EFFECT
//   // ============================

//   useEffect(() => {
//     if (isOpen) {
//       fetchVehicleAvailability();
//     }
//   }, [isOpen, currentMonth, vehicleId, vehicleType]);

//   // ============================
//   // DATE UTILITIES
//   // ============================

//   const isPastDate = (date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const d = new Date(date);
//     d.setHours(0, 0, 0, 0);
//     return d < today;
//   };

//   const isDateBlocked = (date) => {
//     const formatted = formatDateForAPI(date);
//     return blockedDates.includes(formatted);
//   };

//   const isDateInRange = (date) => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     return date >= selectedStartDate && date <= selectedEndDate;
//   };

//   const isAnyDateInRangeBlocked = (start, end) => {
//     const cur = new Date(start);
//     while (cur <= end) {
//       if (isDateBlocked(cur)) return true;
//       cur.setDate(cur.getDate() + 1);
//     }
//     return false;
//   };

//   // ============================
//   // HANDLE DATE CLICK
//   // ============================

//   const handleDateClick = (date) => {
//     if (isPastDate(date)) {
//       showMessage("error", "Cannot select past dates");
//       return;
//     }

//     if (isDateBlocked(date)) {
//       showMessage("error", "This date is unavailable");
//       return;
//     }

//     if (!selectedStartDate) {
//       setSelectedStartDate(date);
//       setSelectedEndDate(null);
//       showMessage("success", "Pickup date selected. Now select return date.");
//       return;
//     }

//     if (!selectedEndDate) {
//       if (date < selectedStartDate) {
//         showMessage("error", "Return date cannot be before pickup date");
//         return;
//       }

//       if (isAnyDateInRangeBlocked(selectedStartDate, date)) {
//         showMessage("error", "Some dates in this range are unavailable");
//         return;
//       }

//       setSelectedEndDate(date);
//       showMessage("success", "Dates selected successfully!");
//     } else {
//       setSelectedStartDate(date);
//       setSelectedEndDate(null);
//       showMessage("success", "Pickup date selected. Now select return date.");
//     }
//   };

//   // ============================
//   // BOOKING LOGIC
//   // ============================

//   const totalDays = () => {
//     if (!selectedStartDate || !selectedEndDate) return 0;
//     return (
//       Math.ceil(
//         (selectedEndDate.getTime() - selectedStartDate.getTime()) /
//           (1000 * 60 * 60 * 24)
//       ) + 1
//     );
//   };

//   const totalPrice = () => totalDays() * pricePerDay;

//   const handleProceedToSelectTime = () => {
//     if (!selectedStartDate || !selectedEndDate) {
//       showMessage("error", "Please select both pickup and return dates");
//       return;
//     }
//     setShowTimePopup(true);
//   };

//   const handleTimeConfirmed = () => {
//     setShowTimePopup(false);
//     setShowConfirmPopup(true);
//   };

//   const handleConfirm = async () => {
//     const payload = {
//       vehicleId,
//       vehicleType,
//       vehicleName,
//       startDate: formatDateForAPI(selectedStartDate),
//       endDate: formatDateForAPI(selectedEndDate),
//       startTime,
//       endTime,
//       totalDays: totalDays(),
//       totalPrice: totalPrice(),
//       pricePerDay
//     };

//     if (onBookingConfirmed) {
//       onBookingConfirmed(payload);
//     }

//     setShowConfirmPopup(false);
//     showMessage("success", "Booking confirmed successfully!");
    
//     setTimeout(() => {
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       onClose();
//     }, 2000);
//   };

//   // ============================
//   // UI HELPERS
//   // ============================

//   const showMessage = (type, text) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 4000);
//   };

//   // ============================
//   // CALENDAR UI GENERATION
//   // ============================

//   const monthName = currentMonth.toLocaleDateString("en-US", {
//     month: "long",
//     year: "numeric",
//   });

//   const daysInMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth() + 1,
//     0
//   ).getDate();

//   const firstDay = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth(),
//     1
//   ).getDay();

//   const renderCalendarDays = () => {
//     const days = [];
//     const offset = firstDay === 0 ? 6 : firstDay - 1;

//     for (let i = 0; i < offset; i++) days.push(<div key={"empty-" + i} />);

//     for (let d = 1; d <= daysInMonth; d++) {
//       const date = new Date(
//         currentMonth.getFullYear(),
//         currentMonth.getMonth(),
//         d
//       );

//       const past = isPastDate(date);
//       const blocked = isDateBlocked(date);
//       const selected =
//         selectedStartDate?.getTime() === date.getTime() ||
//         selectedEndDate?.getTime() === date.getTime();
//       const inRange = isDateInRange(date);

//       let className =
//         "h-12 rounded-lg transition relative font-medium flex items-center justify-center ";

//       if (past) {
//         className += "bg-gray-100 text-gray-400 cursor-not-allowed";
//       } else if (blocked) {
//         className +=
//           "bg-red-100 border-2 border-red-500 text-red-700 relative cursor-not-allowed";
//       } else if (selected) {
//         className += "bg-black text-white border-2 border-black";
//       } else if (inRange) {
//         className += "bg-blue-100 text-blue-700 border border-blue-300";
//       } else {
//         className +=
//           "bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white hover:opacity-90 cursor-pointer";
//       }

//       days.push(
//         <button
//           key={d}
//           className={className}
//           disabled={past || blocked}
//           onClick={() => handleDateClick(date)}
//         >
//           {d}
//           {blocked && (
//             <>
//               <svg
//                 className="absolute inset-0 w-full h-full pointer-events-none"
//                 viewBox="0 0 40 40"
//               >
//                 <line
//                   x1="6"
//                   y1="6"
//                   x2="34"
//                   y2="34"
//                   stroke="#dc2626"
//                   strokeWidth="3"
//                   strokeLinecap="round"
//                 />
//                 <line
//                   x1="34"
//                   y1="6"
//                   x2="6"
//                   y2="34"
//                   stroke="#dc2626"
//                   strokeWidth="3"
//                   strokeLinecap="round"
//                 />
//               </svg>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
//             </>
//           )}
//         </button>
//       );
//     }

//     return days;
//   };

//   const generateTimeOptions = () => {
//     const arr = [];
//     for (let h = 0; h < 24; h++) {
//       for (let m = 0; m < 60; m += 30) {
//         const hh = String(h).padStart(2, "0");
//         const mm = String(m).padStart(2, "0");
//         arr.push({
//           value: `${hh}:${mm}`,
//           label: `${h % 12 || 12}:${mm} ${h >= 12 ? "PM" : "AM"}`,
//         });
//       }
//     }
//     return arr;
//   };

//   const timeOptions = generateTimeOptions();

//   // ============================
//   // JSX
//   // ============================

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white w-full max-w-6xl rounded-2xl p-6 overflow-y-auto max-h-[90vh] shadow-xl">
//           {/* HEADER */}
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold flex items-center">
//               <Calendar className="mr-2 text-blue-600" />
//               Book Your {vehicleType}
//             </h2>

//             <button onClick={onClose}>
//               <X size={24} />
//             </button>
//           </div>

//           {/* MESSAGES */}
//           {message.text && (
//             <div
//               className={`p-4 rounded-lg mb-4 flex items-center gap-2 ${
//                 message.type === "error"
//                   ? "bg-red-100 text-red-800"
//                   : message.type === "success"
//                   ? "bg-green-100 text-green-800"
//                   : "bg-blue-100 text-blue-800"
//               }`}
//             >
//               {message.type === "success" && <CheckCircle size={20} />}
//               {message.type === "error" && <AlertCircle size={20} />}
//               {message.text}
//             </div>
//           )}

//           {/* DATE SELECTION AT TOP */}
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
//               <label className="text-sm font-semibold text-gray-600 block mb-2">
//                 Pickup Date
//               </label>
//               <p className="text-lg font-bold text-gray-900">
//                 {formatDateForDisplay(selectedStartDate)}
//               </p>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
//               <label className="text-sm font-semibold text-gray-600 block mb-2">
//                 Return Date
//               </label>
//               <p className="text-lg font-bold text-gray-900">
//                 {formatDateForDisplay(selectedEndDate)}
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-6">
//             {/* CALENDAR */}
//             <div className="col-span-2">
//               {loading && (
//                 <div className="flex justify-center items-center py-4">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                   <span className="ml-2 text-gray-600">Loading availability...</span>
//                 </div>
//               )}

//               <div className="flex justify-between items-center mb-4">
//                 <button
//                   onClick={() =>
//                     setCurrentMonth(
//                       new Date(
//                         currentMonth.getFullYear(),
//                         currentMonth.getMonth() - 1
//                       )
//                     )
//                   }
//                 >
//                   <ChevronLeft />
//                 </button>

//                 <h3 className="text-xl font-bold">{monthName}</h3>

//                 <button
//                   onClick={() =>
//                     setCurrentMonth(
//                       new Date(
//                         currentMonth.getFullYear(),
//                         currentMonth.getMonth() + 1
//                       )
//                     )
//                   }
//                 >
//                   <ChevronRight />
//                 </button>
//               </div>

//               <div className="grid grid-cols-7 gap-2 mb-2">
//                 {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
//                   <div key={d} className="text-center font-bold text-gray-600">
//                     {d}
//                   </div>
//                 ))}
//               </div>

//               <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>

//               {/* Legend */}
//               <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-black rounded"></div>
//                   <span className="text-gray-600">Selected</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
//                   <span className="text-gray-600">In Range</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-red-100 border-2 border-red-500 rounded relative">
//                     <X size={12} className="text-red-600 absolute inset-0 m-auto" />
//                   </div>
//                   <span className="text-gray-600">Unavailable</span>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE - BOOKING SUMMARY */}
//             <div>
//               {selectedStartDate && selectedEndDate && (
//                 <div className="bg-blue-50 rounded-lg p-4 mb-4">
//                   <h4 className="font-bold text-gray-800 mb-3">Booking Summary</h4>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Total Days</span>
//                       <span className="font-semibold">{totalDays()}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Rate/Day</span>
//                       <span className="font-semibold">₹{pricePerDay}</span>
//                     </div>
//                     <div className="flex justify-between text-lg font-bold border-t pt-2">
//                       <span>Total</span>
//                       <span className="text-blue-600">₹{totalPrice()}</span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <button
//                 onClick={handleProceedToSelectTime}
//                 disabled={!selectedStartDate || !selectedEndDate || loading}
//                 className="w-full bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white p-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
//               >
//                 Confirm Dates
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Time Selection Popup */}
//       <TimeSelectionPopup
//         isOpen={showTimePopup}
//         onClose={() => setShowTimePopup(false)}
//         onConfirm={handleTimeConfirmed}
//         startTime={startTime}
//         endTime={endTime}
//         setStartTime={setStartTime}
//         setEndTime={setEndTime}
//       />

//       {/* Booking Confirmation Popup */}
//       <BookingConfirmationPopup
//         isOpen={showConfirmPopup}
//         onClose={() => setShowConfirmPopup(false)}
//         onConfirm={handleConfirm}
//         bookingDetails={{
//           startDate: formatDateForDisplay(selectedStartDate),
//           endDate: formatDateForDisplay(selectedEndDate),
//           startTime,
//           endTime,
//           totalDays: totalDays(),
//           totalPrice: totalPrice()
//         }}
//         vehicleDetails={{
//           vehicleName,
//           vehicleType,
//           pricePerDay
//         }}
//       />
//     </>
//   );
// };

// export default CustomerBookingCalendar;














// import React, { useState, useEffect } from "react";
// import { X, Calendar, ChevronLeft, ChevronRight, Clock, AlertCircle, CheckCircle } from "lucide-react";

// // ==========================================
// // API INTEGRATION
// // ==========================================

// const bookingAPI = {
//   /**
//    * Fetch vehicle availability (includes Owner blocked + Customer booked dates)
//    * Returns all unavailable dates from the backend
//    */
//   getVehicleAvailability: async (vehicleId, vehicleType) => {
//     try {
//       const url = `http://3.110.122.127:3000/getVehicleAvailability?vechileType=${vehicleType}&VechileId=${vehicleId}`;
//       const response = await fetch(url);
//       const data = await response.json();

//       if (!data.success || !data.availability) {
//         return [];
//       }

//       // Extract ALL unavailable dates (Owner blocked + Customer booked)
//       return data.availability
//         .filter((item) => item.status === "Unavailable")
//         .map((item) => item.date);

//     } catch (error) {
//       console.error("API error:", error);
//       return [];
//     }
//   },

//   /**
//    * Create a new booking
//    * This will mark dates as booked and automatically block them for others
//    */
//   createBooking: async (payload) => {
//     try {
//       const myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//       const urlencoded = new URLSearchParams();
//       urlencoded.append("userId", payload.userId || "customer_default");
//       urlencoded.append("vechileType", payload.vehicleType);
//       urlencoded.append("VechileId", payload.vehicleId);
//       urlencoded.append("fromDate", payload.startDate);
//       urlencoded.append("toDate", payload.endDate);
//       urlencoded.append("fromTime", payload.startTime.replace(":", "."));
//       urlencoded.append("toTime", payload.endTime.replace(":", "."));
//       urlencoded.append("isNotAvailable", "true");
//       urlencoded.append("bikeImages", "");

//       const response = await fetch('http://3.110.122.127:3000/createNotAvailability', {
//         method: 'POST',
//         headers: myHeaders,
//         body: urlencoded
//       });
      
//       const data = await response.json();
//       return { success: response.ok, data };
//     } catch (error) {
//       console.error("Booking API error:", error);
//       return { success: false, error: error.message };
//     }
//   }
// };

// // ==========================================
// // BOOKING CONFIRMATION POPUP
// // ==========================================

// const BookingConfirmationPopup = ({ 
//   isOpen, 
//   onClose, 
//   onConfirm, 
//   bookingDetails,
//   vehicleDetails 
// }) => {
//   if (!isOpen) return null;

//   const { startDate, endDate, startTime, endTime, totalDays, totalPrice } = bookingDetails;
//   const { vehicleName, vehicleType, pricePerDay } = vehicleDetails;

//   return (
//     <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50">
//       <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
//           <div className="flex justify-between items-start">
//             <div>
//               <h2 className="text-2xl font-bold mb-1">Confirm Booking</h2>
//               <p className="text-blue-100 text-sm">Review your rental details</p>
//             </div>
//             <button 
//               onClick={onClose}
//               className="text-white hover:bg-white/20 rounded-full p-1 transition"
//             >
//               <X size={24} />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-4">
//           <div className="bg-gray-50 rounded-lg p-4">
//             <h3 className="font-semibold text-gray-700 mb-2">Vehicle Details</h3>
//             <p className="text-lg font-bold text-gray-900">{vehicleName}</p>
//             <p className="text-sm text-gray-600">Type: {vehicleType}</p>
//           </div>

//           <div className="space-y-3">
//             <div className="flex items-start gap-3">
//               <Calendar className="text-blue-600 mt-1" size={20} />
//               <div className="flex-1">
//                 <p className="text-sm text-gray-600">Pickup Date</p>
//                 <p className="font-semibold text-gray-900">{startDate}</p>
//                 <p className="text-sm text-gray-500">Time: {startTime}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <Calendar className="text-blue-600 mt-1" size={20} />
//               <div className="flex-1">
//                 <p className="text-sm text-gray-600">Return Date</p>
//                 <p className="font-semibold text-gray-900">{endDate}</p>
//                 <p className="text-sm text-gray-500">Time: {endTime}</p>
//               </div>
//             </div>
//           </div>

//           <div className="border-t pt-4 space-y-2">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Rate per day</span>
//               <span className="font-semibold">₹{pricePerDay}</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Total days</span>
//               <span className="font-semibold">{totalDays} days</span>
//             </div>
//             <div className="flex justify-between text-lg font-bold border-t pt-2">
//               <span>Total Amount</span>
//               <span className="text-blue-600">₹{totalPrice}</span>
//             </div>
//           </div>

//           <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
//             <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
//             <p className="text-xs text-amber-800">
//               Please arrive on time for pickup. Late arrivals may affect your booking.
//             </p>
//           </div>
//         </div>

//         <div className="px-6 pb-6 flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
//           >
//             Confirm Booking
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // CUSTOMER BOOKING CALENDAR
// // ==========================================

// const CustomerBookingCalendar = ({
//   isOpen = true,
//   onClose = () => {},
//   onConfirm,
  
//   // Props or localStorage
//   vehicleId = localStorage.getItem("vehicleId") || "V001",
//   vehicleType = localStorage.getItem("vehicletype") || "Car",
//   vehicleName = "Vehicle",
//   pricePerDay = 1500,
//   userId = localStorage.getItem("userId") || "customer_default"
// }) => {

//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedStartDate, setSelectedStartDate] = useState(null);
//   const [selectedEndDate, setSelectedEndDate] = useState(null);
//   const [activeInput, setActiveInput] = useState("start");

//   const [startTime, setStartTime] = useState("09:00");
//   const [endTime, setEndTime] = useState("18:00");

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("info");
//   const [showConfirmPopup, setShowConfirmPopup] = useState(false);

//   // All blocked dates (Owner + Customer bookings)
//   const [blockedDates, setBlockedDates] = useState([]);

//   // Auto-refresh interval
//   const [refreshInterval, setRefreshInterval] = useState(null);

//   // ==============================
//   // LOAD BLOCKED DATES FROM API
//   // ==============================

//   useEffect(() => {
//     if (isOpen) {
//       loadBlockedDates();
      
//       // Auto-refresh every 30 seconds to sync with backend
//       const interval = setInterval(() => {
//         loadBlockedDates();
//       }, 30000);
      
//       setRefreshInterval(interval);
      
//       return () => clearInterval(interval);
//     } else {
//       if (refreshInterval) clearInterval(refreshInterval);
//     }
//   }, [isOpen, currentMonth, vehicleId, vehicleType]);

//   const loadBlockedDates = async () => {
//     setLoading(true);
//     try {
//       const unavailableDates = await bookingAPI.getVehicleAvailability(
//         vehicleId,
//         vehicleType
//       );
//       setBlockedDates(unavailableDates || []);
//     } catch (error) {
//       console.error("Failed to load blocked dates:", error);
//       showMessage("Failed to load availability", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==============================
//   // DATE UTILITIES
//   // ==============================

//   const formatDateAPI = (date) => {
//     if (!date) return "";
//     return date.toISOString().split("T")[0];
//   };

//   const formatDisplay = (date) => {
//     if (!date) return "Select Date";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}/${month}/${day}`;
//   };

//   const isPastDate = (date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const checkDate = new Date(date);
//     checkDate.setHours(0, 0, 0, 0);
//     return checkDate < today;
//   };

//   const isDateBlocked = (date) => {
//     const formatted = formatDateAPI(date);
//     return blockedDates.includes(formatted);
//   };

//   const isSelected = (date) =>
//     selectedStartDate?.getTime() === date.getTime() ||
//     selectedEndDate?.getTime() === date.getTime();

//   const isInRange = (date) => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     return date >= selectedStartDate && date <= selectedEndDate;
//   };

//   const isAnyDateInRangeBlocked = (start, end) => {
//     const cur = new Date(start);
//     while (cur <= end) {
//       if (isDateBlocked(cur)) return true;
//       cur.setDate(cur.getDate() + 1);
//     }
//     return false;
//   };

//   // ==============================
//   // DATE SELECTION
//   // ==============================

//   const handleDateClick = (date) => {
//     if (isPastDate(date)) {
//       showMessage("⚠️ Cannot select past dates", "error");
//       return;
//     }

//     if (isDateBlocked(date)) {
//       showMessage("⚠️ This date is unavailable (blocked by owner or already booked)", "error");
//       return;
//     }

//     if (activeInput === "start") {
//       setSelectedStartDate(date);
//       setSelectedEndDate(null);
//       setActiveInput("end");
//       showMessage("✓ Pickup date selected. Now select return date.", "success");
//       return;
//     }

//     if (activeInput === "end") {
//       if (!selectedStartDate) {
//         showMessage("⚠️ Select pickup date first", "error");
//         return;
//       }

//       if (date < selectedStartDate) {
//         showMessage("⚠️ Return date cannot be before pickup", "error");
//         return;
//       }

//       if (isAnyDateInRangeBlocked(selectedStartDate, date)) {
//         showMessage("⚠️ Some dates in this range are unavailable", "error");
//         return;
//       }

//       setSelectedEndDate(date);
//       setActiveInput(null);
//       showMessage("✓ Dates selected successfully!", "success");
//     }
//   };

//   const showMessage = (msg, type = "info") => {
//     setMessage(msg);
//     setMessageType(type);
//     setTimeout(() => setMessage(""), 4000);
//   };

//   // ==============================
//   // BOOKING LOGIC
//   // ==============================

//   const totalDays = () => {
//     if (!selectedStartDate || !selectedEndDate) return 0;
//     return (
//       Math.ceil(
//         (selectedEndDate.getTime() - selectedStartDate.getTime()) /
//           (1000 * 60 * 60 * 24)
//       ) + 1
//     );
//   };

//   const totalPrice = () => totalDays() * pricePerDay;

//   const handleProceedToConfirm = () => {
//     if (!selectedStartDate || !selectedEndDate) {
//       showMessage("⚠️ Please select both dates", "error");
//       return;
//     }
//     setShowConfirmPopup(true);
//   };

//   const handleConfirm = async () => {
//     setLoading(true);
//     showMessage("Processing booking...", "info");

//     const payload = {
//       userId,
//       vehicleId,
//       vehicleType,
//       vehicleName,
//       startDate: formatDateAPI(selectedStartDate),
//       endDate: formatDateAPI(selectedEndDate),
//       startTime,
//       endTime,
//       totalDays: totalDays(),
//       totalPrice: totalPrice(),
//       pricePerDay
//     };

//     // Call custom callback if provided
//     if (onConfirm) {
//       onConfirm(payload);
//       setShowConfirmPopup(false);
//       setLoading(false);
//       return;
//     }

//     // Default: Send to API
//     const result = await bookingAPI.createBooking(payload);

//     if (result.success) {
//       showMessage("✓ Booking confirmed! These dates are now blocked for everyone.", "success");
//       setShowConfirmPopup(false);
      
//       // Reload blocked dates immediately
//       await loadBlockedDates();
      
//       // Reset and close after success
//       setTimeout(() => {
//         setSelectedStartDate(null);
//         setSelectedEndDate(null);
//         setActiveInput("start");
//         onClose();
//       }, 2000);
//     } else {
//       showMessage("❌ Booking failed. Please try again.", "error");
//     }
    
//     setLoading(false);
//   };

//   // ==============================
//   // CALENDAR RENDERING
//   // ==============================

//   const daysInMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth() + 1,
//     0
//   ).getDate();

//   const firstDay = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth(),
//     1
//   ).getDay();

//   const renderDays = () => {
//     const days = [];

//     for (let i = 0; i < firstDay; i++)
//       days.push(<div key={"e" + i}></div>);

//     for (let d = 1; d <= daysInMonth; d++) {
//       const date = new Date(
//         currentMonth.getFullYear(),
//         currentMonth.getMonth(),
//         d
//       );

//       const past = isPastDate(date);
//       const blocked = isDateBlocked(date);
//       const sel = isSelected(date);
//       const rang = isInRange(date);

//       let cls =
//         "relative rounded-lg p-3 text-center transition-all font-semibold duration-200 ";

//       if (past) cls += "text-gray-300 bg-gray-50 cursor-not-allowed";
//       else if (blocked)
//         cls += "bg-red-50 text-red-500 line-through cursor-not-allowed relative";
//       else if (sel)
//         cls += "bg-blue-600 text-white ring-4 ring-blue-300 scale-110 shadow-lg z-10";
//       else if (rang)
//         cls += "bg-blue-100 text-blue-700 shadow-sm";
//       else cls += "hover:bg-blue-50 hover:scale-105 cursor-pointer hover:shadow-md";

//       days.push(
//         <button
//           key={d}
//           disabled={past || blocked}
//           className={cls}
//           onClick={() => handleDateClick(date)}
//         >
//           <span className="relative z-10">{d}</span>
//           {blocked && (
//             <span className="absolute inset-0 flex items-center justify-center">
//               <X size={16} className="text-red-400" />
//             </span>
//           )}
//         </button>
//       );
//     }
//     return days;
//   };

//   // ==============================
//   // MAIN RENDER
//   // ==============================

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-40 overflow-y-auto">
//         <div className="bg-white max-w-5xl w-full rounded-2xl shadow-2xl my-8">
          
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl text-white">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h2 className="text-2xl font-bold mb-1 flex items-center gap-3">
//                   <Calendar size={28} />
//                   Book Your {vehicleType}
//                 </h2>
//                 <p className="text-blue-100">{vehicleName} • ₹{pricePerDay}/day</p>
//               </div>
//               <button 
//                 onClick={onClose}
//                 className="text-white hover:bg-white/20 rounded-full p-2 transition"
//               >
//                 <X size={24} />
//               </button>
//             </div>
//           </div>

//           <div className="p-6">
//             {/* Date Selection */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <div
//                 className={`border-2 rounded-xl p-4 cursor-pointer transition ${
//                   activeInput === "start" 
//                     ? "border-blue-500 bg-blue-50 shadow-md" 
//                     : "border-gray-200 hover:border-blue-300"
//                 }`}
//                 onClick={() => setActiveInput("start")}
//               >
//                 <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                   <Calendar size={16} />
//                   Pickup Date
//                 </div>
//                 <div className="text-lg font-bold text-gray-900">
//                   {formatDisplay(selectedStartDate)}
//                 </div>
//                 <div className="flex items-center gap-2 mt-2">
//                   <Clock size={16} className="text-gray-400" />
//                   <input
//                     type="time"
//                     value={startTime}
//                     onChange={(e) => setStartTime(e.target.value)}
//                     className="text-sm border rounded px-2 py-1"
//                   />
//                 </div>
//               </div>

//               <div
//                 className={`border-2 rounded-xl p-4 cursor-pointer transition ${
//                   activeInput === "end" 
//                     ? "border-blue-500 bg-blue-50 shadow-md" 
//                     : "border-gray-200 hover:border-blue-300"
//                 }`}
//                 onClick={() => setActiveInput("end")}
//               >
//                 <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                   <Calendar size={16} />
//                   Return Date
//                 </div>
//                 <div className="text-lg font-bold text-gray-900">
//                   {formatDisplay(selectedEndDate)}
//                 </div>
//                 <div className="flex items-center gap-2 mt-2">
//                   <Clock size={16} className="text-gray-400" />
//                   <input
//                     type="time"
//                     value={endTime}
//                     onChange={(e) => setEndTime(e.target.value)}
//                     className="text-sm border rounded px-2 py-1"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Calendar */}
//             <div className="border-2 border-gray-200 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-white mb-6 relative">
//               {loading && (
//                 <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl z-20">
//                   <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-2"></div>
//                     <p className="text-sm text-gray-600">Loading availability...</p>
//                   </div>
//                 </div>
//               )}

//               <div className="flex justify-between items-center mb-6">
//                 <button
//                   onClick={() =>
//                     setCurrentMonth(
//                       new Date(
//                         currentMonth.getFullYear(),
//                         currentMonth.getMonth() - 1
//                       )
//                     )
//                   }
//                   className="p-2 hover:bg-gray-100 rounded-lg transition"
//                 >
//                   <ChevronLeft size={24} />
//                 </button>

//                 <h3 className="text-xl font-bold text-gray-800">
//                   {currentMonth.toLocaleDateString("en-US", {
//                     month: "long",
//                     year: "numeric"
//                   })}
//                 </h3>

//                 <button
//                   onClick={() =>
//                     setCurrentMonth(
//                       new Date(
//                         currentMonth.getFullYear(),
//                         currentMonth.getMonth() + 1
//                       )
//                     )
//                   }
//                   className="p-2 hover:bg-gray-100 rounded-lg transition"
//                 >
//                   <ChevronRight size={24} />
//                 </button>
//               </div>

//               <div className="grid grid-cols-7 gap-2 mb-3">
//                 {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//                   <div
//                     key={d}
//                     className="text-center text-sm font-bold text-gray-600 p-2"
//                   >
//                     {d}
//                   </div>
//                 ))}
//               </div>

//               <div className="grid grid-cols-7 gap-2">
//                 {renderDays()}
//               </div>

//               <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-200 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-blue-600 rounded"></div>
//                   <span className="text-gray-600">Selected</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-blue-100 rounded"></div>
//                   <span className="text-gray-600">In Range</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-red-50 rounded relative">
//                     <X size={12} className="text-red-400 absolute inset-0 m-auto" />
//                   </div>
//                   <span className="text-gray-600">Unavailable</span>
//                 </div>
//               </div>
//             </div>

//             {/* Message */}
//             {message && (
//               <div
//                 className={`p-4 rounded-xl mb-4 flex items-center gap-3 ${
//                   messageType === "success"
//                     ? "bg-green-50 border border-green-200 text-green-800"
//                     : messageType === "error"
//                     ? "bg-red-50 border border-red-200 text-red-800"
//                     : "bg-blue-50 border border-blue-200 text-blue-800"
//                 }`}
//               >
//                 {messageType === "success" && <CheckCircle size={20} />}
//                 {messageType === "error" && <AlertCircle size={20} />}
//                 <span className="font-medium">{message}</span>
//               </div>
//             )}

//             {/* Summary */}
//             {selectedStartDate && selectedEndDate && (
//               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-4 border border-blue-200">
//                 <h4 className="font-bold text-gray-800 mb-3">Booking Summary</h4>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                   <div>
//                     <p className="text-gray-600">Total Days</p>
//                     <p className="text-lg font-bold text-gray-900">{totalDays()}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600">Rate/Day</p>
//                     <p className="text-lg font-bold text-gray-900">₹{pricePerDay}</p>
//                   </div>
//                   <div className="col-span-2">
//                     <p className="text-gray-600">Total Amount</p>
//                     <p className="text-2xl font-bold text-blue-600">₹{totalPrice()}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Confirm Button */}
//             <button
//               disabled={!selectedStartDate || !selectedEndDate || loading}
//               onClick={handleProceedToConfirm}
//               className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl"
//             >
//               {loading ? "Processing..." : selectedStartDate && selectedEndDate 
//                 ? "Proceed to Confirm Booking" 
//                 : "Select Dates to Continue"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Popup */}
//       <BookingConfirmationPopup
//         isOpen={showConfirmPopup}
//         onClose={() => setShowConfirmPopup(false)}
//         onConfirm={handleConfirm}
//         bookingDetails={{
//           startDate: formatDisplay(selectedStartDate),
//           endDate: formatDisplay(selectedEndDate),
//           startTime,
//           endTime,
//           totalDays: totalDays(),
//           totalPrice: totalPrice()
//         }}
//         vehicleDetails={{
//           vehicleName,
//           vehicleType,
//           pricePerDay
//         }}
//       />
//     </>
//   );
// };

// export default CustomerBookingCalendar;



















import React, { useState, useEffect } from "react";
import { X, Calendar, ChevronLeft, ChevronRight, Clock, AlertCircle, CheckCircle } from "lucide-react";

// ==========================================
// API INTEGRATION
// ==========================================

const bookingAPI = {
  /**
   * Fetch vehicle availability (includes Owner blocked + Customer booked dates)
   * Returns all unavailable dates from the backend
   */
  getVehicleAvailability: async (vehicleId, vehicleType) => {
    try {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📡 FETCHING VEHICLE AVAILABILITY (Customer Calendar)");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🚗 Vehicle ID:", vehicleId);
      console.log("🏷️ Vehicle Type:", vehicleType);

      const url = `http://3.110.122.127:3000/getVehicleAvailability?vechileType=${vehicleType}&VechileId=${vehicleId}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.success || !data.availability) {
        console.log("⚠️ No availability data found");
        return { 
          allUnavailableDates: [], 
          ownerBlockedDates: [], 
          customerBookedDates: [] 
        };
      }

      console.log("✅ Raw API Response:", data);

      // Extract ALL unavailable dates (Owner blocked + Customer booked)
      const allUnavailableDates = data.availability
        .filter((item) => item.status === "Unavailable")
        .map((item) => item.date);

      // Separate owner blocked dates
      const ownerBlockedDates = data.availability
        .filter((item) => item.status === "Unavailable" && !item.isCustomerBooking)
        .map((item) => item.date);

      // Separate customer booked dates
      const customerBookedDates = data.availability
        .filter((item) => item.status === "Unavailable" && item.isCustomerBooking === true)
        .map((item) => item.date);

      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📊 AVAILABILITY SUMMARY (Customer Calendar)");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🔒 Total Unavailable Dates:", allUnavailableDates.length);
      console.log("   All Unavailable:", allUnavailableDates);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("👤 Owner Blocked Dates:", ownerBlockedDates.length);
      console.log("   Owner Dates:", ownerBlockedDates);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🧑 Customer Booked Dates:", customerBookedDates.length);
      console.log("   Customer Dates:", customerBookedDates);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      return { 
        allUnavailableDates, 
        ownerBlockedDates, 
        customerBookedDates 
      };

    } catch (error) {
      console.error("❌ API error:", error);
      return { 
        allUnavailableDates: [], 
        ownerBlockedDates: [], 
        customerBookedDates: [] 
      };
    }
  },

  /**
   * Create a new booking (this will automatically block dates)
   */
  createBooking: async (payload) => {
    try {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📤 CREATING BOOKING FROM CUSTOMER CALENDAR");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📋 Booking Payload:", payload);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("userId", payload.userId || "customer_default");
      urlencoded.append("vechileType", payload.vehicleType);
      urlencoded.append("VechileId", payload.vehicleId);
      urlencoded.append("fromDate", payload.startDate);
      urlencoded.append("toDate", payload.endDate);
      urlencoded.append("fromTime", payload.startTime.replace(":", "."));
      urlencoded.append("toTime", payload.endTime.replace(":", "."));
      urlencoded.append("isNotAvailable", "true");
      urlencoded.append("bikeImages", "");
      urlencoded.append("isCustomerBooking", "true"); // 🔥 Mark as customer booking

      console.log("📤 Request Body:", Object.fromEntries(urlencoded));

      const response = await fetch('http://3.110.122.127:3000/createNotAvailability', {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
      });
      
      const data = await response.json();
      
      console.log("✅ Booking API Response:", data);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🎉 BOOKING CREATED & DATES BLOCKED!");
      console.log("📅 From:", payload.startDate, "To:", payload.endDate);
      console.log("⏰ Time:", payload.startTime, "-", payload.endTime);
      console.log("🔒 These dates are now BLOCKED for:");
      console.log("   ✅ Owner Calendar");
      console.log("   ✅ All Customer Calendars");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      return { success: response.ok, data };
    } catch (error) {
      console.error("❌ Booking API error:", error);
      return { success: false, error: error.message };
    }
  }
};

// ==========================================
// BOOKING CONFIRMATION POPUP
// ==========================================

const BookingConfirmationPopup = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  bookingDetails,
  vehicleDetails 
}) => {
  if (!isOpen) return null;

  const { startDate, endDate, startTime, endTime, totalDays, totalPrice } = bookingDetails;
  const { vehicleName, vehicleType, pricePerDay } = vehicleDetails;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-1">Confirm Booking</h2>
              <p className="text-blue-100 text-sm">Review your rental details</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-1 transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Vehicle Details</h3>
            <p className="text-lg font-bold text-gray-900">{vehicleName}</p>
            <p className="text-sm text-gray-600">Type: {vehicleType}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="text-blue-600 mt-1" size={20} />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Pickup Date</p>
                <p className="font-semibold text-gray-900">{startDate}</p>
                <p className="text-sm text-gray-500">Time: {startTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="text-blue-600 mt-1" size={20} />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Return Date</p>
                <p className="font-semibold text-gray-900">{endDate}</p>
                <p className="text-sm text-gray-500">Time: {endTime}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Rate per day</span>
              <span className="font-semibold">₹{pricePerDay}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total days</span>
              <span className="font-semibold">{totalDays} days</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total Amount</span>
              <span className="text-blue-600">₹{totalPrice}</span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
            <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
            <p className="text-xs text-amber-800">
              These dates will be blocked for all other customers once confirmed.
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// CUSTOMER BOOKING CALENDAR
// ==========================================

const CustomerBookingCalendar = ({
  isOpen = true,
  onClose = () => {},
  onConfirm,
  
  // Props
  vehicleId = localStorage.getItem("vehicleId") || "V001",
  vehicleType = localStorage.getItem("vehicletype") || "Car",
  vehicleName = "Vehicle",
  pricePerDay = 1500,
  userId = localStorage.getItem("userId") || "customer_default"
}) => {

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [activeInput, setActiveInput] = useState("start");

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  // 🔥 NEW: Separate tracking for different types of blocked dates
  const [allUnavailableDates, setAllUnavailableDates] = useState([]);
  const [ownerBlockedDates, setOwnerBlockedDates] = useState([]);
  const [customerBookedDates, setCustomerBookedDates] = useState([]);

  // Auto-refresh interval
  const [refreshInterval, setRefreshInterval] = useState(null);

  // ==============================
  // LOAD BLOCKED DATES FROM API
  // ==============================

  useEffect(() => {
    if (isOpen) {
      console.log("📅 Customer Calendar Opened - Loading blocked dates...");
      loadBlockedDates();
      
      // Auto-refresh every 30 seconds to sync with backend
      const interval = setInterval(() => {
        console.log("🔄 Auto-refresh: Loading blocked dates...");
        loadBlockedDates();
      }, 30000);
      
      setRefreshInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
        console.log("🛑 Customer Calendar Closed - Stopped auto-refresh");
      };
    } else {
      if (refreshInterval) clearInterval(refreshInterval);
    }
  }, [isOpen, vehicleId, vehicleType]);

  const loadBlockedDates = async () => {
    setLoading(true);
    try {
      const { 
        allUnavailableDates, 
        ownerBlockedDates, 
        customerBookedDates 
      } = await bookingAPI.getVehicleAvailability(vehicleId, vehicleType);
      
      setAllUnavailableDates(allUnavailableDates || []);
      setOwnerBlockedDates(ownerBlockedDates || []);
      setCustomerBookedDates(customerBookedDates || []);

      console.log("🎯 State Updated in Customer Calendar:");
      console.log("   All Unavailable:", allUnavailableDates?.length || 0);
      console.log("   Owner Blocked:", ownerBlockedDates?.length || 0);
      console.log("   Customer Booked:", customerBookedDates?.length || 0);

    } catch (error) {
      console.error("Failed to load blocked dates:", error);
      showMessage("Failed to load availability", "error");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // DATE UTILITIES
  // ==============================

  const formatDateAPI = (date) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const formatDisplay = (date) => {
    if (!date) return "Select Date";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  // 🔥 Check if date is blocked (ANY unavailable date)
  const isDateBlocked = (date) => {
    const formatted = formatDateAPI(date);
    return allUnavailableDates.includes(formatted);
  };

  // 🔥 Check if date is owner blocked specifically
  const isOwnerBlocked = (date) => {
    const formatted = formatDateAPI(date);
    return ownerBlockedDates.includes(formatted);
  };

  // 🔥 Check if date is customer booked specifically
  const isCustomerBooked = (date) => {
    const formatted = formatDateAPI(date);
    return customerBookedDates.includes(formatted);
  };

  const isSelected = (date) =>
    selectedStartDate?.getTime() === date.getTime() ||
    selectedEndDate?.getTime() === date.getTime();

  const isInRange = (date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const isAnyDateInRangeBlocked = (start, end) => {
    const cur = new Date(start);
    while (cur <= end) {
      if (isDateBlocked(cur)) return true;
      cur.setDate(cur.getDate() + 1);
    }
    return false;
  };

  // ==============================
  // DATE SELECTION
  // ==============================

  const handleDateClick = (date) => {
    if (isPastDate(date)) {
      showMessage("⚠️ Cannot select past dates", "error");
      return;
    }

    if (isDateBlocked(date)) {
      if (isOwnerBlocked(date)) {
        showMessage("⚠️ This date is blocked by the owner", "error");
        console.log("🚫 Attempted to select owner-blocked date:", formatDateAPI(date));
      } else if (isCustomerBooked(date)) {
        showMessage("⚠️ This date is already booked by another customer", "error");
        console.log("🚫 Attempted to select customer-booked date:", formatDateAPI(date));
      } else {
        showMessage("⚠️ This date is unavailable", "error");
      }
      return;
    }

    if (activeInput === "start") {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      setActiveInput("end");
      showMessage("✓ Pickup date selected. Now select return date.", "success");
      return;
    }

    if (activeInput === "end") {
      if (!selectedStartDate) {
        showMessage("⚠️ Select pickup date first", "error");
        return;
      }

      if (date < selectedStartDate) {
        showMessage("⚠️ Return date cannot be before pickup", "error");
        return;
      }

      if (isAnyDateInRangeBlocked(selectedStartDate, date)) {
        showMessage("⚠️ Some dates in this range are unavailable", "error");
        return;
      }

      setSelectedEndDate(date);
      setActiveInput(null);
      showMessage("✓ Dates selected successfully!", "success");
    }
  };

  const showMessage = (msg, type = "info") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  // ==============================
  // BOOKING LOGIC
  // ==============================

  const totalDays = () => {
    if (!selectedStartDate || !selectedEndDate) return 0;
    return (
      Math.ceil(
        (selectedEndDate.getTime() - selectedStartDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1
    );
  };

  const totalPrice = () => totalDays() * pricePerDay;

  const handleProceedToConfirm = () => {
    if (!selectedStartDate || !selectedEndDate) {
      showMessage("⚠️ Please select both dates", "error");
      return;
    }
    setShowConfirmPopup(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    showMessage("Processing booking...", "info");

    const payload = {
      userId,
      vehicleId,
      vehicleType,
      vehicleName,
      startDate: formatDateAPI(selectedStartDate),
      endDate: formatDateAPI(selectedEndDate),
      startTime,
      endTime,
      totalDays: totalDays(),
      totalPrice: totalPrice(),
      pricePerDay
    };

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎯 CUSTOMER CONFIRMING BOOKING");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📋 Booking Details:", payload);

    // Call custom callback if provided (e.g., from BookNow page)
    if (onConfirm) {
      onConfirm(payload);
      setShowConfirmPopup(false);
      setLoading(false);
      return;
    }

    // Default: Send to API to create booking and block dates
    const result = await bookingAPI.createBooking(payload);

    if (result.success) {
      showMessage("✓ Booking confirmed! Dates blocked for everyone.", "success");
      setShowConfirmPopup(false);
      
      // Reload blocked dates immediately to show the newly booked dates
      console.log("🔄 Reloading blocked dates to show new booking...");
      await loadBlockedDates();
      
      // Reset and close after success
      setTimeout(() => {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        setActiveInput("start");
        onClose();
      }, 2000);
    } else {
      showMessage("❌ Booking failed. Please try again.", "error");
    }
    
    setLoading(false);
  };

  // ==============================
  // CALENDAR RENDERING
  // ==============================

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDay; i++)
      days.push(<div key={"e" + i}></div>);

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        d
      );

      const past = isPastDate(date);
      const blocked = isDateBlocked(date);
      const ownerBlocked = isOwnerBlocked(date);
      const customerBooked = isCustomerBooked(date);
      const sel = isSelected(date);
      const rang = isInRange(date);

      let cls =
        "relative rounded-lg p-3 text-center transition-all font-semibold duration-200 ";

      if (past) {
        cls += "text-gray-300 bg-gray-50 cursor-not-allowed";
      } else if (blocked) {
        if (customerBooked) {
          // Customer booked dates - orange color
          cls += "bg-orange-100 text-orange-700 line-through cursor-not-allowed relative border-2 border-orange-400";
        } else if (ownerBlocked) {
          // Owner blocked dates - red color
          cls += "bg-red-50 text-red-500 line-through cursor-not-allowed relative border-2 border-red-400";
        } else {
          // Generic blocked
          cls += "bg-red-50 text-red-500 line-through cursor-not-allowed relative";
        }
      } else if (sel) {
        cls += "bg-blue-600 text-white ring-4 ring-blue-300 scale-110 shadow-lg z-10";
      } else if (rang) {
        cls += "bg-blue-100 text-blue-700 shadow-sm";
      } else {
        cls += "hover:bg-blue-50 hover:scale-105 cursor-pointer hover:shadow-md";
      }

      days.push(
        <button
          key={d}
          disabled={past || blocked}
          className={cls}
          onClick={() => handleDateClick(date)}
          title={
            past 
              ? "Past date" 
              : customerBooked 
                ? "Booked by another customer"
                : ownerBlocked 
                  ? "Blocked by owner"
                  : "Available"
          }
        >
          <span className="relative z-10">{d}</span>
          {blocked && (
            <span className="absolute inset-0 flex items-center justify-center">
              <X size={16} className={customerBooked ? "text-orange-500" : "text-red-400"} />
            </span>
          )}
        </button>
      );
    }
    return days;
  };

  // ==============================
  // MAIN RENDER
  // ==============================

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-40 overflow-y-auto">
        <div className="bg-white max-w-5xl w-full rounded-2xl shadow-2xl my-8">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-1 flex items-center gap-3">
                  <Calendar size={28} />
                  Book Your {vehicleType}
                </h2>
                <p className="text-blue-100">{vehicleName} • ₹{pricePerDay}/day</p>
              </div>
              <button 
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-full p-2 transition"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div
                className={`border-2 rounded-xl p-4 cursor-pointer transition ${
                  activeInput === "start" 
                    ? "border-blue-500 bg-blue-50 shadow-md" 
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setActiveInput("start")}
              >
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Calendar size={16} />
                  Pickup Date
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {formatDisplay(selectedStartDate)}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Clock size={16} className="text-gray-400" />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  />
                </div>
              </div>

              <div
                className={`border-2 rounded-xl p-4 cursor-pointer transition ${
                  activeInput === "end" 
                    ? "border-blue-500 bg-blue-50 shadow-md" 
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setActiveInput("end")}
              >
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Calendar size={16} />
                  Return Date
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {formatDisplay(selectedEndDate)}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Clock size={16} className="text-gray-400" />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  />
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="border-2 border-gray-200 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-white mb-6 relative">
              {loading && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl z-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading availability...</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1
                      )
                    )
                  }
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronLeft size={24} />
                </button>

                <h3 className="text-xl font-bold text-gray-800">
                  {currentMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric"
                  })}
                </h3>

                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1
                      )
                    )
                  }
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-3">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div
                    key={d}
                    className="text-center text-sm font-bold text-gray-600 p-2"
                  >
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {renderDays()}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-200 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span className="text-gray-600">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-100 rounded"></div>
                  <span className="text-gray-600">In Range</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-50 border-2 border-red-400 rounded relative">
                    <X size={12} className="text-red-400 absolute inset-0 m-auto" />
                  </div>
                  <span className="text-gray-600">Owner Blocked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-100 border-2 border-orange-400 rounded relative">
                    <X size={12} className="text-orange-500 absolute inset-0 m-auto" />
                  </div>
                  <span className="text-gray-600">Customer Booked</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-center">
                  <p className="text-xs text-red-600 mb-1">Owner Blocked</p>
                  <p className="text-lg font-bold text-red-700">{ownerBlockedDates.length}</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 text-center">
                  <p className="text-xs text-orange-600 mb-1">Customer Booked</p>
                  <p className="text-lg font-bold text-orange-700">{customerBookedDates.length}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                  <p className="text-xs text-green-600 mb-1">Available</p>
                  <p className="text-lg font-bold text-green-700">
                    {daysInMonth - allUnavailableDates.filter(date => {
                      const d = new Date(date);
                      return d.getMonth() === currentMonth.getMonth() && 
                             d.getFullYear() === currentMonth.getFullYear();
                    }).length}
                  </p>
                </div>
              </div>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-4 rounded-xl mb-4 flex items-center gap-3 ${
                  messageType === "success"
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : messageType === "error"
                    ? "bg-red-50 border border-red-200 text-red-800"
                    : "bg-blue-50 border border-blue-200 text-blue-800"
                }`}
              >
                {messageType === "success" && <CheckCircle size={20} />}
                {messageType === "error" && <AlertCircle size={20} />}
                <span className="font-medium">{message}</span>
              </div>
            )}

            {/* Summary */}
            {selectedStartDate && selectedEndDate && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-4 border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-3">Booking Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Total Days</p>
                    <p className="text-lg font-bold text-gray-900">{totalDays()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Rate/Day</p>
                    <p className="text-lg font-bold text-gray-900">₹{pricePerDay}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-blue-600">₹{totalPrice()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Confirm Button */}
            <button
              disabled={!selectedStartDate || !selectedEndDate || loading}
              onClick={handleProceedToConfirm}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl"
            >
              {loading ? "Processing..." : selectedStartDate && selectedEndDate 
                ? "Proceed to Confirm Booking" 
                : "Select Dates to Continue"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      <BookingConfirmationPopup
        isOpen={showConfirmPopup}
        onClose={() => setShowConfirmPopup(false)}
        onConfirm={handleConfirm}
        bookingDetails={{
          startDate: formatDisplay(selectedStartDate),
          endDate: formatDisplay(selectedEndDate),
          startTime,
          endTime,
          totalDays: totalDays(),
          totalPrice: totalPrice()
        }}
        vehicleDetails={{
          vehicleName,
          vehicleType,
          pricePerDay
        }}
      />
    </>
  );
};

export default CustomerBookingCalendar;











// import React, { useState, useEffect } from "react";
// import { X, Calendar, ChevronLeft, ChevronRight, Clock, AlertCircle, CheckCircle } from "lucide-react";

// // ==========================================
// // API INTEGRATION WITH YOUR BACKEND
// // ==========================================

// const bookingAPI = {
//   /**
//    * Fetch vehicle availability from your backend
//    * API: http://3.110.122.127:3000/getVehicleAvailability
//    */
//   getVehicleAvailability: async (vehicleId, vehicleType) => {
//     try {
//       const url = `http://3.110.122.127:3000/getVehicleAvailability?vechileType=${vehicleType}&VechileId=${vehicleId}`;
//       const response = await fetch(url);
//       const data = await response.json();

//       if (!data.success || !data.availability) {
//         return [];
//       }

//       // Extract only unavailable dates
//       return data.availability
//         .filter((item) => item.status === "Unavailable")
//         .map((item) => item.date); // Returns array of "YYYY-MM-DD" strings

//     } catch (error) {
//       console.error("API error:", error);
//       return [];
//     }
//   },

//   /**
//    * Create a new booking (replace with your actual endpoint)
//    */
//   createBooking: async (payload) => {
//     try {
//       // Replace with your actual booking endpoint
//       const response = await fetch('http://3.110.122.127:3000/createBooking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });
      
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Booking API error:", error);
//       return { success: false, error: error.message };
//     }
//   }
// };

// // ==========================================
// // BOOKING CONFIRMATION POPUP
// // ==========================================

// const BookingConfirmationPopup = ({ 
//   isOpen, 
//   onClose, 
//   onConfirm, 
//   bookingDetails,
//   vehicleDetails 
// }) => {
//   if (!isOpen) return null;

//   const { startDate, endDate, startTime, endTime, totalDays, totalPrice } = bookingDetails;
//   const { vehicleName, vehicleType, pricePerDay } = vehicleDetails;

//   return (
//     <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50">
//       <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
//           <div className="flex justify-between items-start">
//             <div>
//               <h2 className="text-2xl font-bold mb-1">Confirm Booking</h2>
//               <p className="text-blue-100 text-sm">Review your rental details</p>
//             </div>
//             <button 
//               onClick={onClose}
//               className="text-white hover:bg-white/20 rounded-full p-1 transition"
//             >
//               <X size={24} />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-4">
//           <div className="bg-gray-50 rounded-lg p-4">
//             <h3 className="font-semibold text-gray-700 mb-2">Vehicle Details</h3>
//             <p className="text-lg font-bold text-gray-900">{vehicleName}</p>
//             <p className="text-sm text-gray-600">Type: {vehicleType}</p>
//           </div>

//           <div className="space-y-3">
//             <div className="flex items-start gap-3">
//               <Calendar className="text-blue-600 mt-1" size={20} />
//               <div className="flex-1">
//                 <p className="text-sm text-gray-600">Pickup Date</p>
//                 <p className="font-semibold text-gray-900">{startDate}</p>
//                 <p className="text-sm text-gray-500">Time: {startTime}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <Calendar className="text-blue-600 mt-1" size={20} />
//               <div className="flex-1">
//                 <p className="text-sm text-gray-600">Return Date</p>
//                 <p className="font-semibold text-gray-900">{endDate}</p>
//                 <p className="text-sm text-gray-500">Time: {endTime}</p>
//               </div>
//             </div>
//           </div>

//           <div className="border-t pt-4 space-y-2">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Rate per day</span>
//               <span className="font-semibold">₹{pricePerDay}</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Total days</span>
//               <span className="font-semibold">{totalDays} days</span>
//             </div>
//             <div className="flex justify-between text-lg font-bold border-t pt-2">
//               <span>Total Amount</span>
//               <span className="text-blue-600">₹{totalPrice}</span>
//             </div>
//           </div>

//           <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
//             <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
//             <p className="text-xs text-amber-800">
//               Please arrive on time for pickup. Late arrivals may affect your booking.
//             </p>
//           </div>
//         </div>

//         <div className="px-6 pb-6 flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
//           >
//             Confirm Booking
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // CUSTOMER BOOKING CALENDAR - API VERSION
// // ==========================================

// const CustomerBookingCalendar = ({
//   isOpen = true,
//   onClose = () => {},
//   onConfirm,
  
//   // Get from localStorage or props
//   vehicleId = localStorage.getItem("vehicleId") || "V001",
//   vehicleType = localStorage.getItem("vehicletype") || "Car",
//   vehicleName = "Vehicle",
//   pricePerDay = 1500
// }) => {

//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedStartDate, setSelectedStartDate] = useState(null);
//   const [selectedEndDate, setSelectedEndDate] = useState(null);
//   const [activeInput, setActiveInput] = useState("start");

//   const [startTime, setStartTime] = useState("09:00");
//   const [endTime, setEndTime] = useState("18:00");

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("info");
//   const [showConfirmPopup, setShowConfirmPopup] = useState(false);

//   // Blocked dates from API
//   const [blockedDates, setBlockedDates] = useState([]);

//   // ==============================
//   // LOAD BLOCKED DATES FROM API
//   // ==============================

//   useEffect(() => {
//     if (isOpen) {
//       loadAPIBlockedDates();
//     }
//   }, [isOpen, currentMonth, vehicleId, vehicleType]);

//   const loadAPIBlockedDates = async () => {
//     setLoading(true);
//     try {
//       const unavailableDates = await bookingAPI.getVehicleAvailability(
//         vehicleId,
//         vehicleType
//       );
//       setBlockedDates(unavailableDates || []);
//     } catch (error) {
//       console.error("Failed to load blocked dates:", error);
//       showMessage("Failed to load availability", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==============================
//   // DATE UTILITIES
//   // ==============================

//   const formatDateAPI = (date) => {
//     if (!date) return "";
//     return date.toISOString().split("T")[0];
//   };

//   const formatDisplay = (date) => {
//     if (!date) return "Select Date";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}/${month}/${day}`;
//   };

//   const isPastDate = (date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const checkDate = new Date(date);
//     checkDate.setHours(0, 0, 0, 0);
//     return checkDate < today;
//   };

//   const isDateBlocked = (date) => {
//     const formatted = formatDateAPI(date);
//     return blockedDates.includes(formatted);
//   };

//   const isSelected = (date) =>
//     selectedStartDate?.getTime() === date.getTime() ||
//     selectedEndDate?.getTime() === date.getTime();

//   const isInRange = (date) => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     return date >= selectedStartDate && date <= selectedEndDate;
//   };

//   const isAnyDateInRangeBlocked = (start, end) => {
//     const cur = new Date(start);
//     while (cur <= end) {
//       if (isDateBlocked(cur)) return true;
//       cur.setDate(cur.getDate() + 1);
//     }
//     return false;
//   };

//   // ==============================
//   // DATE SELECTION
//   // ==============================

//   const handleDateClick = (date) => {
//     if (isPastDate(date)) {
//       showMessage("⚠️ Cannot select past dates", "error");
//       return;
//     }

//     if (isDateBlocked(date)) {
//       showMessage("⚠️ This date is unavailable", "error");
//       return;
//     }

//     if (activeInput === "start") {
//       setSelectedStartDate(date);
//       setSelectedEndDate(null);
//       setActiveInput("end");
//       showMessage("✓ Pickup date selected. Now select return date.", "success");
//       return;
//     }

//     if (activeInput === "end") {
//       if (!selectedStartDate) {
//         showMessage("⚠️ Select pickup date first", "error");
//         return;
//       }

//       if (date < selectedStartDate) {
//         showMessage("⚠️ Return date cannot be before pickup", "error");
//         return;
//       }

//       if (isAnyDateInRangeBlocked(selectedStartDate, date)) {
//         showMessage("⚠️ Some dates in this range are unavailable", "error");
//         return;
//       }

//       setSelectedEndDate(date);
//       setActiveInput(null);
//       showMessage("✓ Dates selected successfully!", "success");
//     }
//   };

//   const showMessage = (msg, type = "info") => {
//     setMessage(msg);
//     setMessageType(type);
//     setTimeout(() => setMessage(""), 4000);
//   };

//   // ==============================
//   // BOOKING LOGIC
//   // ==============================

//   const totalDays = () => {
//     if (!selectedStartDate || !selectedEndDate) return 0;
//     return (
//       Math.ceil(
//         (selectedEndDate.getTime() - selectedStartDate.getTime()) /
//           (1000 * 60 * 60 * 24)
//       ) + 1
//     );
//   };

//   const totalPrice = () => totalDays() * pricePerDay;

//   const handleProceedToConfirm = () => {
//     if (!selectedStartDate || !selectedEndDate) {
//       showMessage("⚠️ Please select both dates", "error");
//       return;
//     }
//     setShowConfirmPopup(true);
//   };

//   const handleConfirm = async () => {
//     const payload = {
//       vehicleId,
//       vehicleType,
//       vehicleName,
//       startDate: formatDateAPI(selectedStartDate),
//       endDate: formatDateAPI(selectedEndDate),
//       startTime,
//       endTime,
//       totalDays: totalDays(),
//       totalPrice: totalPrice(),
//       pricePerDay
//     };

//     // Call custom callback if provided
//     if (onConfirm) {
//       onConfirm(
//         formatDateAPI(selectedStartDate),
//         formatDateAPI(selectedEndDate),
//         startTime,
//         endTime
//       );
//       setShowConfirmPopup(false);
//       return;
//     }

//     // Default: Send to API
//     showMessage("Processing booking...", "info");
//     const result = await bookingAPI.createBooking(payload);

//     if (result.success) {
//       showMessage("✓ Booking confirmed!", "success");
//       setShowConfirmPopup(false);
      
//       // Reset and close after success
//       setTimeout(() => {
//         setSelectedStartDate(null);
//         setSelectedEndDate(null);
//         setActiveInput("start");
//         onClose();
//       }, 2000);
//     } else {
//       showMessage("❌ Booking failed. Please try again.", "error");
//     }
//   };

//   // ==============================
//   // CALENDAR RENDERING
//   // ==============================

//   const daysInMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth() + 1,
//     0
//   ).getDate();

//   const firstDay = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth(),
//     1
//   ).getDay();

//   const renderDays = () => {
//     const days = [];

//     for (let i = 0; i < firstDay; i++)
//       days.push(<div key={"e" + i}></div>);

//     for (let d = 1; d <= daysInMonth; d++) {
//       const date = new Date(
//         currentMonth.getFullYear(),
//         currentMonth.getMonth(),
//         d
//       );

//       const past = isPastDate(date);
//       const blocked = isDateBlocked(date);
//       const sel = isSelected(date);
//       const rang = isInRange(date);

//       let cls =
//         "relative rounded-lg p-3 text-center transition-all font-semibold duration-200 ";

//       if (past) cls += "text-gray-300 bg-gray-50 cursor-not-allowed";
//       else if (blocked)
//         cls += "bg-red-50 text-red-500 line-through cursor-not-allowed relative";
//       else if (sel)
//         cls += "bg-blue-600 text-white ring-4 ring-blue-300 scale-110 shadow-lg z-10";
//       else if (rang)
//         cls += "bg-blue-100 text-blue-700 shadow-sm";
//       else cls += "hover:bg-blue-50 hover:scale-105 cursor-pointer hover:shadow-md";

//       days.push(
//         <button
//           key={d}
//           disabled={past || blocked}
//           className={cls}
//           onClick={() => handleDateClick(date)}
//         >
//           <span className="relative z-10">{d}</span>
//           {blocked && (
//             <span className="absolute inset-0 flex items-center justify-center">
//               <X size={16} className="text-red-400" />
//             </span>
//           )}
//         </button>
//       );
//     }
//     return days;
//   };

//   // ==============================
//   // MAIN RENDER
//   // ==============================

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-40 overflow-y-auto">
//         <div className="bg-white max-w-5xl w-full rounded-2xl shadow-2xl my-8">
          
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl text-white">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h2 className="text-2xl font-bold mb-1 flex items-center gap-3">
//                   <Calendar size={28} />
//                   Book Your {vehicleType}
//                 </h2>
//                 <p className="text-blue-100">{vehicleName} • ₹{pricePerDay}/day</p>
//               </div>
//               <button 
//                 onClick={onClose}
//                 className="text-white hover:bg-white/20 rounded-full p-2 transition"
//               >
//                 <X size={24} />
//               </button>
//             </div>
//           </div>

//           <div className="p-6">
//             {/* Date Selection */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <div
//                 className={`border-2 rounded-xl p-4 cursor-pointer transition ${
//                   activeInput === "start" 
//                     ? "border-blue-500 bg-blue-50 shadow-md" 
//                     : "border-gray-200 hover:border-blue-300"
//                 }`}
//                 onClick={() => setActiveInput("start")}
//               >
//                 <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                   <Calendar size={16} />
//                   Pickup Date
//                 </div>
//                 <div className="text-lg font-bold text-gray-900">
//                   {formatDisplay(selectedStartDate)}
//                 </div>
//                 <div className="flex items-center gap-2 mt-2">
//                   <Clock size={16} className="text-gray-400" />
//                   <input
//                     type="time"
//                     value={startTime}
//                     onChange={(e) => setStartTime(e.target.value)}
//                     className="text-sm border rounded px-2 py-1"
//                   />
//                 </div>
//               </div>

//               <div
//                 className={`border-2 rounded-xl p-4 cursor-pointer transition ${
//                   activeInput === "end" 
//                     ? "border-blue-500 bg-blue-50 shadow-md" 
//                     : "border-gray-200 hover:border-blue-300"
//                 }`}
//                 onClick={() => setActiveInput("end")}
//               >
//                 <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                   <Calendar size={16} />
//                   Return Date
//                 </div>
//                 <div className="text-lg font-bold text-gray-900">
//                   {formatDisplay(selectedEndDate)}
//                 </div>
//                 <div className="flex items-center gap-2 mt-2">
//                   <Clock size={16} className="text-gray-400" />
//                   <input
//                     type="time"
//                     value={endTime}
//                     onChange={(e) => setEndTime(e.target.value)}
//                     className="text-sm border rounded px-2 py-1"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Calendar */}
//             <div className="border-2 border-gray-200 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-white mb-6 relative">
//               {loading && (
//                 <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl z-20">
//                   <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-2"></div>
//                     <p className="text-sm text-gray-600">Loading availability...</p>
//                   </div>
//                 </div>
//               )}

//               <div className="flex justify-between items-center mb-6">
//                 <button
//                   onClick={() =>
//                     setCurrentMonth(
//                       new Date(
//                         currentMonth.getFullYear(),
//                         currentMonth.getMonth() - 1
//                       )
//                     )
//                   }
//                   className="p-2 hover:bg-gray-100 rounded-lg transition"
//                 >
//                   <ChevronLeft size={24} />
//                 </button>

//                 <h3 className="text-xl font-bold text-gray-800">
//                   {currentMonth.toLocaleDateString("en-US", {
//                     month: "long",
//                     year: "numeric"
//                   })}
//                 </h3>

//                 <button
//                   onClick={() =>
//                     setCurrentMonth(
//                       new Date(
//                         currentMonth.getFullYear(),
//                         currentMonth.getMonth() + 1
//                       )
//                     )
//                   }
//                   className="p-2 hover:bg-gray-100 rounded-lg transition"
//                 >
//                   <ChevronRight size={24} />
//                 </button>
//               </div>

//               <div className="grid grid-cols-7 gap-2 mb-3">
//                 {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//                   <div
//                     key={d}
//                     className="text-center text-sm font-bold text-gray-600 p-2"
//                   >
//                     {d}
//                   </div>
//                 ))}
//               </div>

//               <div className="grid grid-cols-7 gap-2">
//                 {renderDays()}
//               </div>

//               <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-200 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-blue-600 rounded"></div>
//                   <span className="text-gray-600">Selected</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-blue-100 rounded"></div>
//                   <span className="text-gray-600">In Range</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-red-50 rounded relative">
//                     <X size={12} className="text-red-400 absolute inset-0 m-auto" />
//                   </div>
//                   <span className="text-gray-600">Unavailable</span>
//                 </div>
//               </div>
//             </div>

//             {/* Message */}
//             {message && (
//               <div
//                 className={`p-4 rounded-xl mb-4 flex items-center gap-3 ${
//                   messageType === "success"
//                     ? "bg-green-50 border border-green-200 text-green-800"
//                     : messageType === "error"
//                     ? "bg-red-50 border border-red-200 text-red-800"
//                     : "bg-blue-50 border border-blue-200 text-blue-800"
//                 }`}
//               >
//                 {messageType === "success" && <CheckCircle size={20} />}
//                 {messageType === "error" && <AlertCircle size={20} />}
//                 <span className="font-medium">{message}</span>
//               </div>
//             )}

//             {/* Summary */}
//             {selectedStartDate && selectedEndDate && (
//               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-4 border border-blue-200">
//                 <h4 className="font-bold text-gray-800 mb-3">Booking Summary</h4>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                   <div>
//                     <p className="text-gray-600">Total Days</p>
//                     <p className="text-lg font-bold text-gray-900">{totalDays()}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600">Rate/Day</p>
//                     <p className="text-lg font-bold text-gray-900">₹{pricePerDay}</p>
//                   </div>
//                   <div className="col-span-2">
//                     <p className="text-gray-600">Total Amount</p>
//                     <p className="text-2xl font-bold text-blue-600">₹{totalPrice()}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Confirm Button */}
//             <button
//               disabled={!selectedStartDate || !selectedEndDate}
//               onClick={handleProceedToConfirm}
//               className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl"
//             >
//               {selectedStartDate && selectedEndDate 
//                 ? "Proceed to Confirm Booking" 
//                 : "Select Dates to Continue"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Popup */}
//       <BookingConfirmationPopup
//         isOpen={showConfirmPopup}
//         onClose={() => setShowConfirmPopup(false)}
//         onConfirm={handleConfirm}
//         bookingDetails={{
//           startDate: formatDisplay(selectedStartDate),
//           endDate: formatDisplay(selectedEndDate),
//           startTime,
//           endTime,
//           totalDays: totalDays(),
//           totalPrice: totalPrice()
//         }}
//         vehicleDetails={{
//           vehicleName,
//           vehicleType,
//           pricePerDay
//         }}
//       />
//     </>
//   );
// };

// export default CustomerBookingCalendar;














// import React, { useState, useEffect } from "react";
// import { X, Calendar, ChevronLeft, ChevronRight, Clock, AlertCircle, CheckCircle } from "lucide-react";

// // ==========================================
// // API INTEGRATION
// // ==========================================

// const bookingAPI = {
//   getVehicleAvailability: async (vehicleId, vehicleType) => {
//     try {
//       const url = `http://3.110.122.127:3000/getVehicleAvailability?vechileType=${vehicleType}&VechileId=${vehicleId}`;
//       const response = await fetch(url);
//       const data = await response.json();

//       if (!data.success || !data.availability) {
//         return [];
//       }

//       return data.availability
//         .filter((item) => item.status === "Unavailable")
//         .map((item) => item.date);

//     } catch (error) {
//       console.error("API error:", error);
//       return [];
//     }
//   },

//   createNotAvailability: async (vehicleId, vehicleType, startDate, endDate) => {
//     try {
//       const response = await fetch('http://3.110.122.127:3000/createNotAvailability', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/x-www-form-urlencoded' 
//         },
//         body: new URLSearchParams({
//           vechileType: vehicleType,
//           VechileId: vehicleId,
//           fromDate: startDate,
//           toDate: endDate,
//           isNotAvailable: 'true'
//         })
//       });
      
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Create not availability error:", error);
//       return { success: false, error: error.message };
//     }
//   }
// };

// // ==========================================
// // TIME SELECTION POPUP
// // ==========================================

// const TimeSelectionPopup = ({ 
//   isOpen, 
//   onClose, 
//   onConfirm, 
//   startTime,
//   endTime,
//   setStartTime,
//   setEndTime
// }) => {
//   if (!isOpen) return null;

//   const generateTimeOptions = () => {
//     const arr = [];
//     for (let h = 0; h < 24; h++) {
//       for (let m = 0; m < 60; m += 30) {
//         const hh = String(h).padStart(2, "0");
//         const mm = String(m).padStart(2, "0");
//         arr.push({
//           value: `${hh}:${mm}`,
//           label: `${h % 12 || 12}:${mm} ${h >= 12 ? "PM" : "AM"}`,
//         });
//       }
//     }
//     return arr;
//   };

//   const timeOptions = generateTimeOptions();

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
//         <div className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] p-6 text-white">
//           <div className="flex justify-between items-start">
//             <div>
//               <h2 className="text-2xl font-bold mb-1">Select Time</h2>
//               <p className="text-blue-100 text-sm">Choose pickup and return times</p>
//             </div>
//             <button 
//               onClick={onClose}
//               className="text-white hover:bg-white/20 rounded-full p-1 transition"
//             >
//               <X size={24} />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-4">
//           <div>
//             <label className="font-semibold block mb-2">Pickup Time</label>
//             <select
//               className="w-full p-3 border rounded-lg"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//             >
//               {timeOptions.map((t) => (
//                 <option value={t.value} key={t.value}>
//                   {t.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="font-semibold block mb-2">Return Time</label>
//             <select
//               className="w-full p-3 border rounded-lg"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//             >
//               {timeOptions.map((t) => (
//                 <option value={t.value} key={t.value}>
//                   {t.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="px-6 pb-6 flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="flex-1 px-4 py-3 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white rounded-lg font-semibold hover:opacity-90 transition shadow-lg"
//           >
//             Confirm Time
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // BOOKING CONFIRMATION POPUP
// // ==========================================

// const BookingConfirmationPopup = ({ 
//   isOpen, 
//   onClose, 
//   onConfirm, 
//   bookingDetails,
//   vehicleDetails,
//   isProcessing 
// }) => {
//   if (!isOpen) return null;

//   const { startDate, endDate, startTime, endTime, totalDays, totalPrice } = bookingDetails;
//   const { vehicleName, vehicleType, pricePerDay } = vehicleDetails;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[70]">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
//         <div className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] p-6 text-white">
//           <div className="flex justify-between items-start">
//             <div>
//               <h2 className="text-2xl font-bold mb-1">Confirm Booking</h2>
//               <p className="text-blue-100 text-sm">Review your rental details</p>
//             </div>
//             <button 
//               onClick={onClose}
//               className="text-white hover:bg-white/20 rounded-full p-1 transition"
//               disabled={isProcessing}
//             >
//               <X size={24} />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-4">
//           <div className="bg-gray-50 rounded-lg p-4">
//             <h3 className="font-semibold text-gray-700 mb-2">Vehicle Details</h3>
//             <p className="text-lg font-bold text-gray-900">{vehicleName}</p>
//             <p className="text-sm text-gray-600">Type: {vehicleType}</p>
//           </div>

//           <div className="space-y-3">
//             <div className="flex items-start gap-3">
//               <Calendar className="text-blue-600 mt-1" size={20} />
//               <div className="flex-1">
//                 <p className="text-sm text-gray-600">Pickup Date</p>
//                 <p className="font-semibold text-gray-900">{startDate}</p>
//                 <p className="text-sm text-gray-500">Time: {startTime}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <Calendar className="text-blue-600 mt-1" size={20} />
//               <div className="flex-1">
//                 <p className="text-sm text-gray-600">Return Date</p>
//                 <p className="font-semibold text-gray-900">{endDate}</p>
//                 <p className="text-sm text-gray-500">Time: {endTime}</p>
//               </div>
//             </div>
//           </div>

//           <div className="border-t pt-4 space-y-2">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Rate per day</span>
//               <span className="font-semibold">₹{pricePerDay}</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Total days</span>
//               <span className="font-semibold">{totalDays} days</span>
//             </div>
//             <div className="flex justify-between text-lg font-bold border-t pt-2">
//               <span>Total Amount</span>
//               <span className="text-blue-600">₹{totalPrice}</span>
//             </div>
//           </div>

//           <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
//             <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
//             <p className="text-xs text-amber-800">
//               Please arrive on time for pickup. Late arrivals may affect your booking.
//             </p>
//           </div>
//         </div>

//         <div className="px-6 pb-6 flex gap-3">
//           <button
//             onClick={onClose}
//             disabled={isProcessing}
//             className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={isProcessing}
//             className="flex-1 px-4 py-3 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white rounded-lg font-semibold hover:opacity-90 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isProcessing ? (
//               <span className="flex items-center justify-center gap-2">
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Processing...
//               </span>
//             ) : (
//               "Confirm Booking"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // CUSTOMER BOOKING CALENDAR
// // ==========================================

// const CustomerBookingCalendar = ({
//   isOpen = true,
//   onClose = () => {},
//   onBookingConfirmed,
  
//   vehicleId = "V001",
//   vehicleType = "Car",
//   vehicleName = "Vehicle",
//   pricePerDay = 1500
// }) => {

//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedStartDate, setSelectedStartDate] = useState(null);
//   const [selectedEndDate, setSelectedEndDate] = useState(null);
//   const [activeInput, setActiveInput] = useState("start");
//   const [startTime, setStartTime] = useState("09:00");
//   const [endTime, setEndTime] = useState("18:00");
//   const [blockedDates, setBlockedDates] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [showTimePopup, setShowTimePopup] = useState(false);
//   const [showConfirmPopup, setShowConfirmPopup] = useState(false);

//   // ============================
//   // FORMATTERS
//   // ============================

//   const formatDateForAPI = (date) => {
//     if (!date) return "";
//     return date.toISOString().split("T")[0];
//   };

//   const formatDateForDisplay = (date) => {
//     if (!date) return "Select Date";
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   // ============================
//   // FETCH API
//   // ============================

//   const fetchVehicleAvailability = async () => {
//     setLoading(true);
//     try {
//       const unavailable = await bookingAPI.getVehicleAvailability(vehicleId, vehicleType);
//       setBlockedDates(unavailable);
//     } catch (err) {
//       console.error("Failed to fetch availability", err);
//       showMessage("error", "Failed to load availability");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       fetchVehicleAvailability();
//     }
//   }, [isOpen, currentMonth, vehicleId, vehicleType]);

//   // ============================
//   // DATE UTILITIES
//   // ============================

//   const isPastDate = (date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const d = new Date(date);
//     d.setHours(0, 0, 0, 0);
//     return d < today;
//   };

//   const isDateBlocked = (date) => {
//     const formatted = formatDateForAPI(date);
//     return blockedDates.includes(formatted);
//   };

//   const isDateInRange = (date) => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     return date >= selectedStartDate && date <= selectedEndDate;
//   };

//   const isAnyDateInRangeBlocked = (start, end) => {
//     const cur = new Date(start);
//     while (cur <= end) {
//       if (isDateBlocked(cur)) return true;
//       cur.setDate(cur.getDate() + 1);
//     }
//     return false;
//   };

//   // ============================
//   // HANDLE DATE CLICK
//   // ============================

//   const handleDateClick = (date) => {
//     if (isPastDate(date)) {
//       showMessage("error", "Cannot select past dates");
//       return;
//     }

//     if (isDateBlocked(date)) {
//       showMessage("error", "This date is unavailable");
//       return;
//     }

//     if (activeInput === "start") {
//       setSelectedStartDate(date);
//       setSelectedEndDate(null);
//       setActiveInput("end");
//       showMessage("success", "Pickup date selected. Now select return date.");
//       return;
//     }

//     if (activeInput === "end") {
//       if (!selectedStartDate) {
//         showMessage("error", "Select pickup date first");
//         return;
//       }

//       if (date < selectedStartDate) {
//         showMessage("error", "Return date cannot be before pickup date");
//         return;
//       }

//       if (isAnyDateInRangeBlocked(selectedStartDate, date)) {
//         showMessage("error", "Some dates in this range are unavailable");
//         return;
//       }

//       setSelectedEndDate(date);
//       setActiveInput(null);
//       showMessage("success", "Dates selected successfully!");
//     }
//   };

//   // ============================
//   // BOOKING LOGIC
//   // ============================

//   const totalDays = () => {
//     if (!selectedStartDate || !selectedEndDate) return 0;
//     return (
//       Math.ceil(
//         (selectedEndDate.getTime() - selectedStartDate.getTime()) /
//           (1000 * 60 * 60 * 24)
//       ) + 1
//     );
//   };

//   const totalPrice = () => totalDays() * pricePerDay;

//   const handleProceedToSelectTime = () => {
//     if (!selectedStartDate || !selectedEndDate) {
//       showMessage("error", "Please select both pickup and return dates");
//       return;
//     }
//     setShowConfirmPopup(true);
//   };

//   const handleTimeConfirmed = () => {
//     setShowConfirmPopup(false);
//     setShowTimePopup(true);
//   };

//   const handleConfirm = async () => {
//     setIsProcessing(true);
    
//     const startDateAPI = formatDateForAPI(selectedStartDate);
//     const endDateAPI = formatDateForAPI(selectedEndDate);

//     try {
//       // Create not availability in backend
//       const result = await bookingAPI.createNotAvailability(
//         vehicleId,
//         vehicleType,
//         startDateAPI,
//         endDateAPI
//       );

//       if (result.success) {
//         // Call custom callback if provided
//         if (onBookingConfirmed) {
//           const payload = {
//             vehicleId,
//             vehicleType,
//             vehicleName,
//             startDate: startDateAPI,
//             endDate: endDateAPI,
//             startTime,
//             endTime,
//             totalDays: totalDays(),
//             totalPrice: totalPrice(),
//             pricePerDay
//           };
//           onBookingConfirmed(payload);
//         }

//         setShowTimePopup(false);
//         showMessage("success", "✓ Booking confirmed successfully!");
        
//         // Refresh availability data
//         await fetchVehicleAvailability();
        
//         setTimeout(() => {
//           setSelectedStartDate(null);
//           setSelectedEndDate(null);
//           setActiveInput("start");
//           onClose();
//         }, 2000);
//       } else {
//         showMessage("error", "❌ Booking failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Booking error:", error);
//       showMessage("error", "❌ Booking failed. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // ============================
//   // UI HELPERS
//   // ============================

//   const showMessage = (type, text) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 4000);
//   };

//   // ============================
//   // CALENDAR UI
//   // ============================

//   const monthName = currentMonth.toLocaleDateString("en-US", {
//     month: "long",
//     year: "numeric",
//   });

//   const daysInMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth() + 1,
//     0
//   ).getDate();

//   const firstDay = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth(),
//     1
//   ).getDay();

//   const renderCalendarDays = () => {
//     const days = [];
//     const offset = firstDay === 0 ? 6 : firstDay - 1;

//     for (let i = 0; i < offset; i++) days.push(<div key={"empty-" + i} />);

//     for (let d = 1; d <= daysInMonth; d++) {
//       const date = new Date(
//         currentMonth.getFullYear(),
//         currentMonth.getMonth(),
//         d
//       );

//       const past = isPastDate(date);
//       const blocked = isDateBlocked(date);
//       const selected =
//         selectedStartDate?.getTime() === date.getTime() ||
//         selectedEndDate?.getTime() === date.getTime();
//       const inRange = isDateInRange(date);

//       let className =
//         "h-12 rounded-lg transition relative font-medium flex items-center justify-center ";

//       if (past) {
//         className += "bg-gray-100 text-gray-400 cursor-not-allowed";
//       } else if (blocked) {
//         className +=
//           "bg-red-100 border-2 border-red-500 text-red-700 relative cursor-not-allowed";
//       } else if (selected) {
//         className += "bg-black text-white border-2 border-black";
//       } else if (inRange) {
//         className += "bg-blue-100 text-blue-700 border border-blue-300";
//       } else {
//         className +=
//           "bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white hover:opacity-90 cursor-pointer";
//       }

//       days.push(
//         <button
//           key={d}
//           className={className}
//           disabled={past || blocked}
//           onClick={() => handleDateClick(date)}
//         >
//           {d}
//           {blocked && (
//             <>
//               <svg
//                 className="absolute inset-0 w-full h-full pointer-events-none"
//                 viewBox="0 0 40 40"
//               >
//                 <line
//                   x1="6"
//                   y1="6"
//                   x2="34"
//                   y2="34"
//                   stroke="#dc2626"
//                   strokeWidth="3"
//                   strokeLinecap="round"
//                 />
//                 <line
//                   x1="34"
//                   y1="6"
//                   x2="6"
//                   y2="34"
//                   stroke="#dc2626"
//                   strokeWidth="3"
//                   strokeLinecap="round"
//                 />
//               </svg>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
//             </>
//           )}
//         </button>
//       );
//     }

//     return days;
//   };

//   // ============================
//   // JSX
//   // ============================

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white w-full max-w-6xl rounded-2xl p-6 overflow-y-auto max-h-[90vh] shadow-xl">
//           {/* HEADER */}
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold flex items-center">
//               <Calendar className="mr-2 text-blue-600" />
//               Book Your {vehicleType}
//             </h2>

//             <button onClick={onClose}>
//               <X size={24} />
//             </button>
//           </div>

//           {/* MESSAGES */}
//           {message.text && (
//             <div
//               className={`p-4 rounded-lg mb-4 flex items-center gap-2 ${
//                 message.type === "error"
//                   ? "bg-red-100 text-red-800"
//                   : message.type === "success"
//                   ? "bg-green-100 text-green-800"
//                   : "bg-blue-100 text-blue-800"
//               }`}
//             >
//               {message.type === "success" && <CheckCircle size={20} />}
//               {message.type === "error" && <AlertCircle size={20} />}
//               {message.text}
//             </div>
//           )}

//           {/* DATE SELECTION AT TOP */}
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <div
//               className={`rounded-lg p-4 border-2 cursor-pointer transition ${
//                 activeInput === "start"
//                   ? "border-blue-500 bg-blue-50 shadow-md"
//                   : "border-gray-200 hover:border-blue-300"
//               }`}
//               onClick={() => setActiveInput("start")}
//             >
//               <label className="text-sm font-semibold text-gray-600 block mb-2 flex items-center gap-2">
//                 <Calendar size={16} />
//                 Pickup Date
//               </label>
//               <p className="text-lg font-bold text-gray-900">
//                 {formatDateForDisplay(selectedStartDate)}
//               </p>
//               <div className="flex items-center gap-2 mt-2">
//                 <Clock size={16} className="text-gray-400" />
//                 <input
//                   type="time"
//                   value={startTime}
//                   onChange={(e) => setStartTime(e.target.value)}
//                   className="text-sm border rounded px-2 py-1"
//                 />
//               </div>
//             </div>
//             <div
//               className={`rounded-lg p-4 border-2 cursor-pointer transition ${
//                 activeInput === "end"
//                   ? "border-blue-500 bg-blue-50 shadow-md"
//                   : "border-gray-200 hover:border-blue-300"
//               }`}
//               onClick={() => setActiveInput("end")}
//             >
//               <label className="text-sm font-semibold text-gray-600 block mb-2 flex items-center gap-2">
//                 <Calendar size={16} />
//                 Return Date
//               </label>
//               <p className="text-lg font-bold text-gray-900">
//                 {formatDateForDisplay(selectedEndDate)}
//               </p>
//               <div className="flex items-center gap-2 mt-2">
//                 <Clock size={16} className="text-gray-400" />
//                 <input
//                   type="time"
//                   value={endTime}
//                   onChange={(e) => setEndTime(e.target.value)}
//                   className="text-sm border rounded px-2 py-1"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-6">
//             {/* CALENDAR */}
//             <div className="col-span-2">
//               {loading && (
//                 <div className="flex justify-center items-center py-4">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                   <span className="ml-2 text-gray-600">Loading availability...</span>
//                 </div>
//               )}

//               <div className="flex justify-between items-center mb-4">
//                 <button
//                   onClick={() =>
//                     setCurrentMonth(
//                       new Date(
//                         currentMonth.getFullYear(),
//                         currentMonth.getMonth() - 1
//                       )
//                     )
//                   }
//                 >
//                   <ChevronLeft />
//                 </button>

//                 <h3 className="text-xl font-bold">{monthName}</h3>

//                 <button
//                   onClick={() =>
//                     setCurrentMonth(
//                       new Date(
//                         currentMonth.getFullYear(),
//                         currentMonth.getMonth() + 1
//                       )
//                     )
//                   }
//                 >
//                   <ChevronRight />
//                 </button>
//               </div>

//               <div className="grid grid-cols-7 gap-2 mb-2">
//                 {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
//                   <div key={d} className="text-center font-bold text-gray-600">
//                     {d}
//                   </div>
//                 ))}
//               </div>

//               <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>

//               {/* Legend */}
//               <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-black rounded"></div>
//                   <span className="text-gray-600">Selected</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
//                   <span className="text-gray-600">In Range</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-red-100 border-2 border-red-500 rounded relative">
//                     <X size={12} className="text-red-600 absolute inset-0 m-auto" />
//                   </div>
//                   <span className="text-gray-600">Unavailable</span>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE - BOOKING SUMMARY */}
//             <div>
//               {selectedStartDate && selectedEndDate && (
//                 <div className="bg-blue-50 rounded-lg p-4 mb-4">
//                   <h4 className="font-bold text-gray-800 mb-3">Booking Summary</h4>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Total Days</span>
//                       <span className="font-semibold">{totalDays()}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Rate/Day</span>
//                       <span className="font-semibold">₹{pricePerDay}</span>
//                     </div>
//                     <div className="flex justify-between text-lg font-bold border-t pt-2">
//                       <span>Total</span>
//                       <span className="text-blue-600">₹{totalPrice()}</span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <button
//                 onClick={handleProceedToSelectTime}
//                 disabled={!selectedStartDate || !selectedEndDate || loading}
//                 className="w-full bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white p-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
//               >
//                 {selectedStartDate && selectedEndDate 
//                   ? "Proceed to Confirm Booking" 
//                   : "Confirm Dates"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Booking Confirmation Popup */}
//       <BookingConfirmationPopup
//         isOpen={showConfirmPopup}
//         onClose={() => setShowConfirmPopup(false)}
//         onConfirm={handleTimeConfirmed}
//         bookingDetails={{
//           startDate: formatDateForDisplay(selectedStartDate),
//           endDate: formatDateForDisplay(selectedEndDate),
//           startTime,
//           endTime,
//           totalDays: totalDays(),
//           totalPrice: totalPrice()
//         }}
//         vehicleDetails={{
//           vehicleName,
//           vehicleType,
//           pricePerDay
//         }}
//         isProcessing={isProcessing}
//       />

//       {/* Time Selection Popup */}
//       <TimeSelectionPopup
//         isOpen={showTimePopup}
//         onClose={() => setShowTimePopup(false)}
//         onConfirm={handleConfirm}
//         startTime={startTime}
//         endTime={endTime}
//         setStartTime={setStartTime}
//         setEndTime={setEndTime}
//       />
//     </>
//   );
// };

// export default CustomerBookingCalendar;