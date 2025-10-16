import React from "react";
import { useNavigate } from "react-router-dom";

const CalendarScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Navigate to listed cars page
    navigate("/ListedCars");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[420px]">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Availability Date & Time
        </h2>

        {/* Date Picker */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Start Date</label>
          <input type="date" className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">End Date</label>
          <input type="date" className="w-full border rounded-lg px-3 py-2" />
        </div>

        {/* Time Picker */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-600 mb-1">Start Time</label>
            <input type="time" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">End Time</label>
            <input type="time" className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-2 rounded-lg hover:opacity-90"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default CalendarScreen;
