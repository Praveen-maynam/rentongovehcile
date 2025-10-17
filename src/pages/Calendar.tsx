import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[700px] border border-gray-300">
        {/* Heading with bottom border */}
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-300">
          Booking Confirmation
        </h2>

        {/* Row for Start & End Date */}
        <div className="flex gap-6 mb-6">
          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-700">
              Start Date & Time
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-700">
              End Date & Time
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-lg p-3 w-full"
            />
          </div>
        </div>

        {/* Select Time */}
        <div className="flex justify-end gap-4 mb-6">
          <div className="flex flex-col items-center bg-gray-50 border rounded-lg p-4 w-36">
            <span className="text-sm text-gray-500 mb-2">Start Time</span>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="text-lg font-semibold text-center w-full border rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col items-center bg-gray-50 border rounded-lg p-4 w-36">
            <span className="text-sm text-gray-500 mb-2">End Time</span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="text-lg font-semibold text-center w-full border rounded-lg p-2"
            />
          </div>
        </div>

        {/* Confirm Button below Select Time */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/listed-cars")}
            style={{ width: "400px", height: "50px" }}
            className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-lg font-semibold rounded-xl hover:opacity-90 transition-all"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
