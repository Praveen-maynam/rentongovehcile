import React from "react";
import { useNavigate } from "react-router-dom";

const Feedback: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Ride Feedback</h1>
      <p className="text-gray-600 mb-4">
        Please share your experience with the ride.
      </p>
      <textarea
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
        placeholder="Type your feedback here..."
      />
      <div className="mt-5 flex justify-end">
        <button
          onClick={() => navigate("/Notifications")}
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-md font-medium hover:opacity-90"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedback;
