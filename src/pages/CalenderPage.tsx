import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CalendarPage: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("06:00");
  const [endTime, setEndTime] = useState<string>("08:00");
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/Notifications");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h1 className="text-xl font-semibold mb-4">Booking Confirmation</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Start Date */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Time Selection */}
      <div className="mt-6">
        <h2 className="text-gray-700 font-medium mb-2">Select Time</h2>
        <div className="flex gap-6">
          <div>
            <label className="block text-gray-600 mb-1">Start Time</label>
            <input
              type="time"
              className="border border-gray-300 rounded-md p-2"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">End Time</label>
            <input
              type="time"
              className="border border-gray-300 rounded-md p-2"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleConfirm}
          className="bg-gradient-to-r from-blue-700 to-blue-400 text-white px-6 py-2 rounded-md font-medium hover:opacity-90"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default CalendarPage;
