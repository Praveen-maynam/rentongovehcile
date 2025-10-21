// src/components/BookingConfirmationModal.tsx
import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [showDateTimeSelection, setShowDateTimeSelection] = React.useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2022, 0)); // Jan 2022
  const [selectedDate, setSelectedDate] = React.useState<number | null>(15);
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
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust for Monday start
    
    // Empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center py-2"></div>);
    }
    
    // Days of the month
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
    "12 AM", "01 AM", "02 AM", "03 AM", "04 AM", "05 AM",
    "06 AM", "07 AM", "08 AM", "09 AM", "10 AM", "11 AM",
    "12 PM", "01 PM", "02 PM", "03 PM", "04 PM", "05 PM",
    "06 PM", "07 PM", "08 PM", "09 PM", "10 PM", "11 PM"
  ];

  const handleYesClick = () => {
    setShowDateTimeSelection(true);
  };

  const handleConfirmClick = () => {
    setShowSuccessScreen(true);
  };

  const handleOkayClick = () => {
    // Reset states
    setShowSuccessScreen(false);
    setShowDateTimeSelection(false);
    // Close modal and trigger parent's onConfirm
    onConfirm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg shadow-xl ${showDateTimeSelection ? 'max-w-2xl' : 'max-w-md'} w-full p-6 relative`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        {!showSuccessScreen && (
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Booking Confirmation
          </h2>
        )}

        {showSuccessScreen ? (
          <div className="flex flex-col items-center justify-center py-8">
            {/* Success Checkmark */}
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Success Message */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Your booking is confirmed<br />with the owner
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Please go to the owner location and<br />complete the process offline
            </p>

            {/* Required Documents */}
            <div className="w-full bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Required Documents</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
                  Driving License
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
                  Aadhar Card
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
                  Deposit money : 10,000
                </li>
              </ul>
              <p className="text-yellow-600 text-sm mt-3 flex items-start gap-1">
                <span className="text-lg">⚠️</span>
                <span>Deposit will be refunded once you handover to vehicle</span>
              </p>
            </div>

            {/* Okay Button */}
            <button
              onClick={handleOkayClick}
              className="w-full bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
            >
              Okay
            </button>
          </div>
        ) : !showDateTimeSelection ? (
          <>
            <p className="text-gray-600 mb-6">
              Did the owner confirm your booking for this vehicle?
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleYesClick}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Yes
              </button>
              <button
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side - Date Selection */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm text-gray-500 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Start Date & Time
                  </label>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
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
                      <div key={day} className="text-center text-xs text-gray-500 font-medium">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendarDays()}
                  </div>
                </div>
                
                <button className="mt-4 w-full text-blue-600 text-sm font-medium hover:underline">
                  Select
                </button>
              </div>

              {/* Right Side - Time Selection */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm text-gray-500 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    End Date & Time
                  </label>
                </div>
                
                <div className="border rounded-lg p-4 mb-4">
                  <h3 className="text-center font-semibold text-lg mb-4">Select Time</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time
                      </label>
                      <select
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full p-3 border rounded-lg bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {timeOptions.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                      </label>
                      <select
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full p-3 border rounded-lg bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {timeOptions.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 w-full text-blue-600 text-sm font-medium hover:underline">
                  Select
                </button>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmClick}
              className="mt-6 w-full bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
            >
              Confirm
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
