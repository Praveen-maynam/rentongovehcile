import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Edit2 } from "lucide-react";
import { useReviewStore } from "../store/review.store";

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addReview } = useReviewStore();
  
  const vehicleId = searchParams.get('vehicleId') || '1';
  const vehicleName = searchParams.get('vehicleName') || 'Vehicle';
  
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const stars = [1, 2, 3, 4, 5];

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating before submitting");
      return;
    }

    if (!feedback.trim()) {
      alert("Please write your feedback before submitting");
      return;
    }

    // Add review to store
    addReview({
      vehicleId: vehicleId,
      userName: "User", // In real app, get from auth store
      rating: rating,
      location: "Kakinada", // In real app, get from location store
      comment: feedback,
    });

    // Show success message
    alert("Thank you for your feedback! Your review has been submitted successfully.");
    
    // Navigate back to notifications
    navigate("/notifications");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      {/* Feedback Box */}
      <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 relative">
        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">
          We value your feedback
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-2">
          Rate your experience with {vehicleName}
        </p>
        <p className="text-xs text-gray-500 mb-6">
          Your feedback helps other users make better decisions
        </p>

        {/* Star Rating - Bigger stars above content */}
        <div className="flex items-center mb-6 justify-start">
          {stars.map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-4xl sm:text-5xl ${
                rating >= star ? "text-yellow-400" : "text-gray-300"
              } transition-colors mx-0.5 sm:mx-1 hover:scale-110`}
            >
              ★
            </button>
          ))}
        </div>

        {rating > 0 && (
          <p className="text-sm text-gray-600 mb-4">
            {rating === 5 && "Excellent! 🌟"}
            {rating === 4 && "Very Good! 👍"}
            {rating === 3 && "Good 😊"}
            {rating === 2 && "Could be better 😐"}
            {rating === 1 && "Needs improvement 😞"}
          </p>
        )}

        {/* Feedback Textarea with Edit Circle Button */}
        <div className="relative mb-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm sm:text-base"
            rows={4}
            placeholder="Type your feedback here..."
          />
          {/* Edit button attached to textarea */}
          <button
            className="absolute top-2 right-2 bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-blue-700 transition"
            onClick={() => document.querySelector('textarea')?.focus()}
          >
            <Edit2 size={16} />
          </button>
        </div>

        {/* Text between textarea and submit button */}
        <p className="text-gray-600 text-left mb-4 text-xs sm:text-sm">
          Tell us about your experience
        </p>

        {/* Submit Button */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate("/notifications")}
            className="bg-white border-2 border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-md hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-6 py-2 rounded-md hover:opacity-90 transition-all shadow-md"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
