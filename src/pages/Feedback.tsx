import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2 } from "lucide-react";

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0); // State for star rating
  const stars = [1, 2, 3, 4, 5]; // 5 stars

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {/* Feedback Box */}
      <div className="bg-white shadow-md rounded-xl p-6 relative">
        {/* Heading */}
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          We value your feedback
        </h1>
        <p className="text-gray-600 mb-6">
          Rate your experience with your booking
        </p>

        {/* Star Rating - Bigger stars above content */}
        <div className="flex items-center mb-6 justify-start">
          {stars.map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-5xl ${
                rating >= star ? "text-yellow-400" : "text-gray-300"
              } transition-colors mx-1`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Feedback Textarea with Edit Circle Button */}
        <div className="relative mb-4">
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            rows={4}
            placeholder="Type your feedback here..."
          />
          {/* Edit button attached to textarea */}
          <button
            className="absolute top-2 right-2 bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-blue-700 transition"
            onClick={() => alert("Add or edit feedback")}
          >
            <Edit2 size={16} />
          </button>
        </div>

        {/* Text between textarea and submit button */}
        <p className="text-gray-600 text-left mb-4 text-size-40">
          Tell us about your experience
        </p>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/Notifications")}
            className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-all"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
