import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleConfirm = () => {
    // Optional: You can add validation before navigating
    if (!startDate || !endDate || !startTime || !endTime) {
      alert("Please select all date and time fields before confirming.");
      return;
    }
    navigate("/listed-cars");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-[700px] border border-gray-300">
        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-300 text-gray-800">
          Booking Confirmation
        </h2>

        {/* Date Inputs */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Time Inputs */}
        <div className="flex justify-center sm:justify-end gap-4 mb-6">
          <div className="flex flex-col items-center bg-gray-50 border rounded-lg p-4 w-36">
            <span className="text-sm text-gray-500 mb-2">Start Time</span>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="text-lg font-semibold text-center w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col items-center bg-gray-50 border rounded-lg p-4 w-36">
            <span className="text-sm text-gray-500 mb-2">End Time</span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="text-lg font-semibold text-center w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center">
          <button
            onClick={handleConfirm}
            className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-lg font-semibold rounded-xl hover:opacity-90 transition-all"
            style={{ width: "400px", height: "50px" }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
