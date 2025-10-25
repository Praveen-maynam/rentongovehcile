// src/components/AvailabilityDateTimeModal.tsx
import React from "react";
import { X, Calendar } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
 
interface AvailabilityDateTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (startDate: string, endDate: string, startTime: string, endTime: string) => void;
}
 
const AvailabilityDateTimeModal: React.FC<AvailabilityDateTimeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = React.useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(null);
  const [activeInput, setActiveInput] = React.useState<"start" | "end" | null>(null);
  const [startTime, setStartTime] = React.useState("06 PM");
  const [endTime, setEndTime] = React.useState("08 PM");
 
  if (!isOpen) return null;
 
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
 
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const previousMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
 
  const handleDateClick = (date: Date) => {
    if (activeInput === "start") {
      setSelectedStartDate(date);
      setActiveInput("end"); // automatically move to end date
    } else if (activeInput === "end") {
      setSelectedEndDate(date);
      setActiveInput(null); // done selecting
    }
  };
 
  const renderCalendarDays = () => {
    const days = [];
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
 
    for (let i = 0; i < startDay; i++) days.push(<div key={`empty-${i}`} />);
 
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected =
        (selectedStartDate && selectedStartDate.getTime() === date.getTime()) ||
        (selectedEndDate && selectedEndDate.getTime() === date.getTime());
 
      days.push(
        <button
          key={day}
          className={`py-2 rounded-full transition w-full ${
            isSelected ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-50"
          }`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </button>
      );
    }
    return days;
  };
 
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const period = i < 12 ? "AM" : "PM";
    return `${hour.toString().padStart(2, "0")} ${period}`;
  });
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
 
        <h2 className="text-xl font-bold text-gray-900 mb-6">Availability Date & Time</h2>
 
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column: Dates + Calendar */}
          <div className="flex-1 space-y-4">
            {/* Horizontal Start & End Date */}
            <div className="flex gap-4">
              <div className="flex-1 cursor-pointer" onClick={() => setActiveInput("start")}>
                <label className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <Calendar size={20} className="text-gray-400" /> Start Date
                </label>
                <div className={`border rounded-lg p-4 text-center text-gray-700 font-semibold text-lg ${activeInput === "start" ? "ring-2 ring-blue-500" : ""}`}>
                  {selectedStartDate?.toLocaleDateString() || "Select"}
                </div>
              </div>
              <div className="flex-1 cursor-pointer" onClick={() => setActiveInput("end")}>
                <label className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <Calendar size={20} className="text-gray-400" /> End Date
                </label>
                <div className={`border rounded-lg p-4 text-center text-gray-700 font-semibold text-lg ${activeInput === "end" ? "ring-2 ring-blue-500" : ""}`}>
                  {selectedEndDate?.toLocaleDateString() || "Select"}
                </div>
              </div>
            </div>
 
            {/* Calendar */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <button onClick={previousMonth} className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft size={20} />
                </button>
                <span className="font-semibold">{monthName}</span>
                <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
                  <ChevronRight size={20} />
                </button>
              </div>
 
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map(day => (
                  <div
                    key={day}
                    className="text-center text-xs text-gray-500 font-medium"
                  >
                    {day}
                  </div>
                ))}
              </div>
 
              <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
            </div>
          </div>
 
          {/* Right Column: Time Selection */}
          <div className="w-1/3 space-y-4">
            <div>
              <label className="text-sm text-gray-500 font-medium">Start Time</label>
              <select
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full p-3 border rounded-lg bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
 
            <div>
              <label className="text-sm text-gray-500 font-medium">End Time</label>
              <select
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full p-3 border rounded-lg bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
 
        <div className="flex justify-end mt-6">
          <button
            onClick={() =>
              onConfirm(
                selectedStartDate?.toISOString() || "",
                selectedEndDate?.toISOString() || "",
                startTime,
                endTime
              )
            }
            className="w-[200px] bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default AvailabilityDateTimeModal;
 
 