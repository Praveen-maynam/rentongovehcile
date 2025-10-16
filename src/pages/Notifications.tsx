import React from "react";
import { useNavigate } from "react-router-dom";

const Notifications: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Notification</h1>

      {/* Feedback Notification */}
      <div className="bg-white border rounded-xl shadow-sm p-5 mb-5 hover:shadow-md transition-all duration-200">
        <div className="flex justify-between items-start">
          <p className="text-gray-800 font-medium">
            Your Ride has been completed. Please give feedback.
          </p>
          <span className="text-sm text-gray-400">6 min ago</span>
        </div>
        <button
          onClick={() => navigate("/feedback")}
          className="mt-4 bg-gradient-to-r from-blue-700 to-blue-400 text-white px-5 py-2 rounded-md font-medium hover:opacity-90 transition"
        >
          Give Feedback
        </button>
      </div>

      {/* Booking Notification */}
      <div className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-200">
        <div className="flex justify-between items-start">
          <p className="text-gray-800 font-medium">Your car has been booked?</p>
          <span className="text-sm text-gray-400">6 min ago</span>
        </div>

        <div className="mt-3 text-gray-600">
          <p className="font-semibold text-gray-800 mb-2">Hyundai Verna</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>⚙️ Automatic</span>
            <span>🧍‍♂️ 5 Seaters</span>
            <span>⛽ Petrol</span>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={() => navigate("/calendar")}
            className="bg-gradient-to-r from-blue-700 to-blue-400 text-white px-6 py-1.5 rounded-md font-medium hover:opacity-90"
          >
            ✓ Yes
          </button>
          <button className="border border-blue-500 text-blue-600 px-6 py-1.5 rounded-md font-medium hover:bg-blue-50 transition">
            ✗ No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
