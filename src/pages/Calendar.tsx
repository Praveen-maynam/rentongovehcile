import React from "react";
import { useNavigate } from "react-router-dom";

const Calendar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[600px]">
        <h2 className="text-lg font-semibold mb-4">Availability Date & Time</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Start Date</label>
            <input type="date" className="border rounded-lg p-2 w-full" />

            <label className="block mt-4 mb-2 font-medium">End Date</label>
            <input type="date" className="border rounded-lg p-2 w-full" />
          </div>

          <div>
            <label className="block mb-2 font-medium">Select Time</label>
            <input type="time" className="border rounded-lg p-2 w-full" />
            <input
              type="time"
              className="border rounded-lg p-2 w-full mt-3"
            />
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={() => navigate("/listed-cars")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
