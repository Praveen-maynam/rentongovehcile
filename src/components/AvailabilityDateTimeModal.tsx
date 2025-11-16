// import React from "react";
// import { X, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

// interface AvailabilityDateTimeModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: (
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string,
//     availability: string
//   ) => void;
// }

// const AvailabilityDateTimeModal: React.FC<AvailabilityDateTimeModalProps> = ({
//   isOpen,
//   onClose,
//   onConfirm,
  
// }) => {
//   const [currentMonth, setCurrentMonth] = React.useState(new Date());
//   const [selectedStartDate, setSelectedStartDate] = React.useState<Date | null>(null);
//   const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(null);
//   const [activeInput, setActiveInput] = React.useState<"start" | "end" | null>(null);
//   const [startTime, setStartTime] = React.useState("06 PM");
//   const [endTime, setEndTime] = React.useState("08 PM");
//   const [availability, setAvailability] = React.useState("Available");

//   if (!isOpen) return null;

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
//     if (!date) return "Select";
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

//   const handleDateClick = (date: Date) => {
//     if (activeInput === "start") {
//       setSelectedStartDate(date);
//       setActiveInput("end");
//     } else if (activeInput === "end") {
//       setSelectedEndDate(date);
//       setActiveInput(null);
//     }
//   };

//   const renderCalendarDays = () => {
//     const days = [];
//     const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

//     for (let i = 0; i < startDay; i++) days.push(<div key={`empty-${i}`} />);

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//       const isSelected =
//         (selectedStartDate && selectedStartDate.getTime() === date.getTime()) ||
//         (selectedEndDate && selectedEndDate.getTime() === date.getTime());
//       const isInRange =
//         selectedStartDate &&
//         selectedEndDate &&
//         date.getTime() >= selectedStartDate.getTime() &&
//         date.getTime() <= selectedEndDate.getTime();

//       days.push(
//         <button
//           key={day}
//           className={`py-1.5 sm:py-2 rounded-lg sm:rounded-full transition w-full text-xs sm:text-sm font-medium active:scale-95 touch-manipulation min-h-[36px] sm:min-h-[40px] flex items-center justify-center ${
//             isSelected
//               ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md font-bold scale-105"
//               : isInRange
//               ? "bg-blue-100 text-blue-700 font-semibold"
//               : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
//           }`}
//           onClick={() => handleDateClick(date)}
//         >
//           {day}
//         </button>
//       );
//     }
//     return days;
//   };

//   const timeOptions = Array.from({ length: 24 }, (_, i) => {
//     const hour = i % 12 === 0 ? 12 : i % 12;
//     const period = i < 12 ? "AM" : "PM";
//     return `${hour.toString().padStart(2, "0")} ${period}`;
//   });

//   const handleConfirm = () => {
//     const formattedStartDate = formatDateForAPI(selectedStartDate);
//     const formattedEndDate = formatDateForAPI(selectedEndDate);

//     onConfirm(formattedStartDate, formattedEndDate, startTime, endTime, availability);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
//       <div className="bg-white rounded-lg sm:rounded-xl shadow-xl w-full max-w-5xl p-4 sm:p-6 md:p-8 relative my-4 max-h-[95vh] overflow-y-auto">
//         {/* Close Button */}
//         <button 
//           onClick={onClose} 
//           className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition"
//         >
//           <X size={18} className="sm:w-5 sm:h-5" />
//         </button>

//         <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pr-10">Availability Date & Time</h2>

//         <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
//           {/* Left Column: Dates + Calendar */}
//           <div className="flex-1 space-y-3 sm:space-y-4">
//             {/* Start & End Date */}
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//               <div className="flex-1 cursor-pointer" onClick={() => setActiveInput("start")}>
//                 <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium mb-2">
//                   <Calendar size={16} className="text-gray-400 sm:w-5 sm:h-5" /> Start Date
//                 </label>
//                 <div
//                   className={`border-2 rounded-lg p-3 sm:p-4 text-center text-gray-700 font-semibold text-base sm:text-lg transition-all ${
//                     activeInput === "start" ? "ring-2 ring-blue-500 bg-blue-50 border-blue-500" : "border-gray-200 hover:bg-gray-50"
//                   }`}
//                 >
//                   {formatDateForDisplay(selectedStartDate)}
//                 </div>
//               </div>

//               <div className="flex-1 cursor-pointer" onClick={() => setActiveInput("end")}>
//                 <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium mb-2">
//                   <Calendar size={16} className="text-gray-400 sm:w-5 sm:h-5" /> End Date
//                 </label>
//                 <div
//                   className={`border-2 rounded-lg p-3 sm:p-4 text-center text-gray-700 font-semibold text-base sm:text-lg transition-all ${
//                     activeInput === "end" ? "ring-2 ring-blue-500 bg-blue-50 border-blue-500" : "border-gray-200 hover:bg-gray-50"
//                   }`}
//                 >
//                   {formatDateForDisplay(selectedEndDate)}
//                 </div>
//               </div>
//             </div>

//             {/* Calendar */}
//             <div className="border-2 border-gray-200 rounded-xl p-3 sm:p-4 bg-gradient-to-br from-white to-blue-50">
//               <div className="flex justify-between items-center mb-3 sm:mb-4">
//                 <button 
//                   onClick={previousMonth} 
//                   className="p-2 hover:bg-blue-100 rounded-lg transition active:scale-95 touch-manipulation"
//                   aria-label="Previous month"
//                 >
//                   <ChevronLeft size={20} className="text-gray-700" />
//                 </button>
//                 <span className="font-bold text-sm sm:text-base text-gray-900">{monthName}</span>
//                 <button 
//                   onClick={nextMonth} 
//                   className="p-2 hover:bg-blue-100 rounded-lg transition active:scale-95 touch-manipulation"
//                   aria-label="Next month"
//                 >
//                   <ChevronRight size={20} className="text-gray-700" />
//                 </button>
//               </div>

//               <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
//                 {weekDays.map((day) => (
//                   <div key={day} className="text-center text-[10px] sm:text-xs text-gray-600 font-bold py-1">
//                     {day}
//                   </div>
//                 ))}
//               </div>

//               <div className="grid grid-cols-7 gap-1 sm:gap-2">{renderCalendarDays()}</div>
//             </div>

//             {/* Info Note */}
//             <div className="text-[10px] sm:text-xs text-gray-600 flex items-center gap-2 bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
//               <span className="text-sm">ℹ️</span>
//               <span>Date format: YYYY/MM/DD (e.g., 2025/11/15)</span>
//             </div>
//           </div>

//           {/* Right Column: Time Selection */}
//           <div className="w-full lg:w-1/3 space-y-3 sm:space-y-4">
//             <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
//               <label className="text-xs sm:text-sm text-gray-700 font-bold mb-2 block flex items-center gap-2">
//                 🕐 Start Time
//               </label>
//               <select
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 className="w-full p-3 sm:p-3.5 border-2 border-purple-300 rounded-lg bg-white text-gray-900 font-semibold outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition text-sm sm:text-base"
//               >
//                 {timeOptions.map((time) => (
//                   <option key={time} value={time}>
//                     {time}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-xl border-2 border-orange-200">
//               <label className="text-xs sm:text-sm text-gray-700 font-bold mb-2 block flex items-center gap-2">
//                 🕐 End Time
//               </label>
//               <select
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 className="w-full p-3 sm:p-3.5 border-2 border-orange-300 rounded-lg bg-white text-gray-900 font-semibold outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition text-sm sm:text-base"
//               >
//                 {timeOptions.map((time) => (
//                   <option key={time} value={time}>
//                     {time}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Mobile Summary */}
//             {selectedStartDate && selectedEndDate && (
//               <div className="lg:hidden bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
//                 <h4 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-2">
//                   📋 Booking Summary
//                 </h4>
//                 <div className="space-y-1 text-[10px] sm:text-xs">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Duration:</span>
//                     <span className="font-semibold text-gray-900">
//                       {Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24))} day(s)
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 sm:mt-6 pt-4 border-t-2 border-gray-200">
//           <button
//             onClick={onClose}
//             className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg transition hover:bg-gray-200 active:scale-95 order-2 sm:order-1"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleConfirm}
//             disabled={!selectedStartDate || !selectedEndDate}
//             className="w-full sm:w-auto sm:min-w-[200px] bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95 order-1 sm:order-2 text-sm sm:text-base"
//           >
//             {selectedStartDate && selectedEndDate ? "✅ Confirm Booking" : "📅 Select Dates"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AvailabilityDateTimeModal;




import React, { useEffect, useMemo, useState } from "react";
import { X, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export interface AvailabilityDateTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  /**
   * New preferred callback (object)
   * onSubmit receives an object:
   * { startDate: "YYYY-MM-DD", endDate: "YYYY-MM-DD", startTime, endTime, availability? }
   */
  onSubmit?: (dateTime: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    availability?: string;
  }) => void | Promise<void>;
  /**
   * Legacy callback (positional) kept for backward compatibility:
   * onConfirm(startDate, endDate, startTime, endTime, availability?)
   */
  onConfirm?: (
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    availability?: string
  ) => void | Promise<void>;
  vehiclePrice?: number;
}

const AvailabilityDateTimeModal: React.FC<AvailabilityDateTimeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onConfirm,
  vehiclePrice,
}) => {
  // --- Hooks MUST be declared unconditionally before any early returns ---
  const [currentMonth, setCurrentMonth] = useState<Date>(() => new Date());
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);
  const [startTime, setStartTime] = useState<string>("06 PM");
  const [endTime, setEndTime] = useState<string>("08 PM");
  const [availability, setAvailability] = useState<string>("Available");

  // keyboard ESC close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // time options memoized (hook)
  const timeOptions = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const hour = i % 12 === 0 ? 12 : i % 12;
        const period = i < 12 ? "AM" : "PM";
        return `${String(hour).padStart(2, "0")} ${period}`;
      }),
    []
  );

  // derived validation / counts
  const isValidSelection = useMemo(() => {
    return !!selectedStartDate && !!selectedEndDate && selectedEndDate.getTime() >= selectedStartDate.getTime();
  }, [selectedStartDate, selectedEndDate]);

  const daysCount = useMemo(() => {
    if (!selectedStartDate || !selectedEndDate) return 0;
    const diff = selectedEndDate.getTime() - selectedStartDate.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [selectedStartDate, selectedEndDate]);

  // Early return after hooks are declared
  if (!isOpen) return null;

  // --- Helpers ---
  const formatDateForAPI = (date: Date | null) => {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatDateForDisplay = (date: Date | null) => {
    if (!date) return "Select";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}/${m}/${d}`;
  };

  const monthName = currentMonth.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const previousMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const handleDateClick = (date: Date) => {
    if (activeInput === "start" || (!activeInput && !selectedStartDate)) {
      setSelectedStartDate(date);
      setActiveInput("end");
      // clear end if earlier than start
      if (selectedEndDate && date.getTime() > selectedEndDate.getTime()) {
        setSelectedEndDate(null);
      }
      return;
    }

    if (activeInput === "end" || (!activeInput && selectedStartDate && !selectedEndDate)) {
      if (selectedStartDate && date.getTime() < selectedStartDate.getTime()) {
        // treat as new start if user chose earlier date for end
        setSelectedStartDate(date);
        setSelectedEndDate(null);
        setActiveInput("end");
      } else {
        setSelectedEndDate(date);
        setActiveInput(null);
      }
      return;
    }

    // fallback
    setSelectedStartDate(date);
    setActiveInput("end");
  };

  const renderCalendarDays = () => {
    const days: React.ReactNode[] = [];
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="py-1.5 sm:py-2" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
      const isSelected = (selectedStartDate && selectedStartDate.getTime() === date.getTime()) ||
        (selectedEndDate && selectedEndDate.getTime() === date.getTime());
      const isInRange = selectedStartDate && selectedEndDate && date.getTime() >= selectedStartDate.getTime() && date.getTime() <= selectedEndDate.getTime();

      const btnClass = isSelected
        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md font-bold scale-105"
        : isInRange
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600";

      days.push(
        <button
          key={d}
          onClick={() => handleDateClick(date)}
          className={`py-1.5 sm:py-2 rounded-lg sm:rounded-full transition w-full text-xs sm:text-sm font-medium active:scale-95 touch-manipulation min-h-[36px] sm:min-h-[40px] flex items-center justify-center ${btnClass}`}
          aria-pressed={isSelected || isInRange}
        >
          {d}
        </button>
      );
    }

    return days;
  };

  // If both callbacks missing, do nothing — but it's fine: we validate before enabling confirm
  const handleConfirm = async () => {
    if (!isValidSelection) return;
    const start = formatDateForAPI(selectedStartDate);
    const end = formatDateForAPI(selectedEndDate);

    // prefer onSubmit (object), otherwise call legacy onConfirm
    try {
      if (onSubmit) {
        await onSubmit({ startDate: start, endDate: end, startTime, endTime, availability });
      } else if (onConfirm) {
        await onConfirm(start, end, startTime, endTime, availability);
      } else {
        // neither provided — still close to avoid stuck modal
        console.warn("AvailabilityDateTimeModal: no onSubmit or onConfirm provided");
      }
    } finally {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="availability-dialog-title"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg sm:rounded-xl shadow-xl w-full max-w-5xl p-4 sm:p-6 md:p-8 relative my-4 max-h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition" aria-label="Close availability modal">
          <X size={18} className="sm:w-5 sm:h-5" />
        </button>

        <h2 id="availability-dialog-title" className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pr-10">
          Availability Date & Time
        </h2>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Left column */}
          <div className="flex-1 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 cursor-pointer" onClick={() => setActiveInput("start")}>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium mb-2">
                  <Calendar size={16} className="text-gray-400 sm:w-5 sm:h-5" /> Start Date
                </label>
                <div className={`border-2 rounded-lg p-3 sm:p-4 text-center text-gray-700 font-semibold text-base sm:text-lg transition-all ${activeInput === "start" ? "ring-2 ring-blue-500 bg-blue-50 border-blue-500" : "border-gray-200 hover:bg-gray-50"}`} role="button" tabIndex={0}>
                  {formatDateForDisplay(selectedStartDate)}
                </div>
              </div>

              <div className="flex-1 cursor-pointer" onClick={() => setActiveInput("end")}>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium mb-2">
                  <Calendar size={16} className="text-gray-400 sm:w-5 sm:h-5" /> End Date
                </label>
                <div className={`border-2 rounded-lg p-3 sm:p-4 text-center text-gray-700 font-semibold text-base sm:text-lg transition-all ${activeInput === "end" ? "ring-2 ring-blue-500 bg-blue-50 border-blue-500" : "border-gray-200 hover:bg-gray-50"}`} role="button" tabIndex={0}>
                  {formatDateForDisplay(selectedEndDate)}
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-3 sm:p-4 bg-gradient-to-br from-white to-blue-50">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <button onClick={previousMonth} className="p-2 hover:bg-blue-100 rounded-lg transition active:scale-95 touch-manipulation" aria-label="Previous month">
                  <ChevronLeft size={20} className="text-gray-700" />
                </button>
                <span className="font-bold text-sm sm:text-base text-gray-900">{monthName}</span>
                <button onClick={nextMonth} className="p-2 hover:bg-blue-100 rounded-lg transition active:scale-95 touch-manipulation" aria-label="Next month">
                  <ChevronRight size={20} className="text-gray-700" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                {weekDays.map((w) => (
                  <div key={w} className="text-center text-[10px] sm:text-xs text-gray-600 font-bold py-1">{w}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2">{renderCalendarDays()}</div>
            </div>

            <div className="text-[10px] sm:text-xs text-gray-600 flex items-center gap-2 bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
              <span className="text-sm">ℹ️</span>
              <span>Date format: YYYY/MM/DD (display) — values sent as YYYY-MM-DD</span>
            </div>
          </div>

          {/* Right column */}
          <div className="w-full lg:w-1/3 space-y-3 sm:space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
              <label className="text-xs sm:text-sm text-gray-700 font-bold mb-2 block flex items-center gap-2">🕐 Start Time</label>
              <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full p-3 sm:p-3.5 border-2 border-purple-300 rounded-lg bg-white text-gray-900 font-semibold outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition text-sm sm:text-base">
                {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-xl border-2 border-orange-200">
              <label className="text-xs sm:text-sm text-gray-700 font-bold mb-2 block flex items-center gap-2">🕐 End Time</label>
              <select value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full p-3 sm:p-3.5 border-2 border-orange-300 rounded-lg bg-white text-gray-900 font-semibold outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition text-sm sm:text-base">
                {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm text-gray-700 font-medium">Availability</label>
              <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="w-full p-3 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-200">
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

            {selectedStartDate && selectedEndDate && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl border-2 border-green-200">
                <h4 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-2">📋 Booking Summary</h4>
                <div className="text-[12px] sm:text-sm space-y-1">
                  <div className="flex justify-between"><span className="text-gray-600">From</span><span className="font-semibold text-gray-900">{formatDateForDisplay(selectedStartDate)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">To</span><span className="font-semibold text-gray-900">{formatDateForDisplay(selectedEndDate)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Duration</span><span className="font-semibold text-gray-900">{daysCount} day(s)</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Time</span><span className="font-semibold text-gray-900">{startTime} — {endTime}</span></div>
                  {typeof vehiclePrice === "number" && <div className="flex justify-between"><span className="text-gray-600">Vehicle Price</span><span className="font-semibold text-gray-900">₹{vehiclePrice.toLocaleString()}</span></div>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 sm:mt-6 pt-4 border-t-2 border-gray-200">
          <button onClick={onClose} className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg transition hover:bg-gray-200 active:scale-95 order-2 sm:order-1">
            Cancel
          </button>

          <button onClick={handleConfirm} disabled={!isValidSelection} className="w-full sm:w-auto sm:min-w-[200px] bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 order-1 sm:order-2 text-sm sm:text-base" aria-disabled={!isValidSelection}>
            {isValidSelection ? "✅ Confirm Booking" : "📅 Select Valid Dates"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityDateTimeModal;
