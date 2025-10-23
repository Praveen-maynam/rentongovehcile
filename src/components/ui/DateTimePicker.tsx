// import React, { useState } from "react";

// const DateTimePicker: React.FC = () => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   return (
//     <div className="flex gap-4 mb-6">
//       <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border rounded px-3 py-2" />
//       <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border rounded px-3 py-2" />
    
//     </div>
//   );
// };

// export default DateTimePicker;
// src/components/DateTimePickerModal.tsx
import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface DateTimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: number, startTime: string, endTime: string) => void;
}

const DateTimePickerModal: React.FC<DateTimePickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<number | null>(null);
  const [startTime, setStartTime] = React.useState("06 PM");
  const [endTime, setEndTime] = React.useState("08 PM");

  if (!isOpen) return null;

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const renderCalendarDays = () => {
    const days = [];
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center py-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`text-center py-2 rounded-full hover:bg-blue-50 transition ${
            selectedDate === day
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'text-gray-700'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const timeOptions = [
    "12 AM","01 AM","02 AM","03 AM","04 AM","05 AM",
    "06 AM","07 AM","08 AM","09 AM","10 AM","11 AM",
    "12 PM","01 PM","02 PM","03 PM","04 PM","05 PM",
    "06 PM","07 PM","08 PM","09 PM","10 PM","11 PM"
  ];

  const handleConfirm = () => {
    if (selectedDate) {
      onSelect(selectedDate, startTime, endTime);
      onClose();
    } else {
      alert("Please select a date");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[700px] max-w-full relative flex gap-6">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Left: Calendar */}
        <div className="flex-1">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={previousMonth}><ChevronLeft size={20} /></button>
            <span className="font-semibold">{monthName}</span>
            <button onClick={nextMonth}><ChevronRight size={20} /></button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
            {weekDays.map((d) => <div key={d}>{d}</div>)}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
        </div>

        {/* Right: Time Selection */}
        <div className="flex flex-col w-[200px]">
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Start Time</label>
            <select
              className="w-full border rounded p-2 mt-1"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            >
              {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-gray-600 text-sm">End Time</label>
            <select
              className="w-full border rounded p-2 mt-1"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            >
              {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <button
            onClick={handleConfirm}
            className="bg-blue-600 text-white py-2 rounded mt-auto w-full hover:bg-blue-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateTimePickerModal;
