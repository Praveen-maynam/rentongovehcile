// import React, { useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Edit2 } from "lucide-react";
// import { useReviewStore } from "../store/review.store";
// import { useNotificationStore } from "../store/notification.store";

// const Feedback: React.FC = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const { addReview } = useReviewStore();
//   const { deleteNotification } = useNotificationStore();
  
//   const vehicleId = searchParams.get('vehicleId') || '1';
//   const vehicleName = searchParams.get('vehicleName') || 'Vehicle';
//   const bookingId = searchParams.get('bookingId');
  
//   const [rating, setRating] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const stars = [1, 2, 3, 4, 5];

//   const handleSubmit = () => {
//     if (rating === 0) {
//       alert("Please select a rating before submitting");
//       return;
//     }

//     if (!feedback.trim()) {
//       alert("Please write your feedback before submitting");
//       return;
//     }

//     // Add review to store
//     addReview({
//       vehicleId: vehicleId,
//       userName: "User", // In real app, get from auth store
//       rating: rating,
//       location: "Kakinada", // In real app, get from location store
//       comment: feedback,
//     });

//     // Show success message
//     alert("Thank you for your feedback! Your review has been submitted successfully.");
    
//     // Navigate back to notifications
//     navigate("/notifications");
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 px-4">
//       {/* Feedback Box */}
//       <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 relative">
//         {/* Heading */}
//         <h1 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">
//           We value your feedback
//         </h1>
//         <p className="text-sm sm:text-base text-gray-600 mb-2">
//           Rate your experience with {vehicleName}
//         </p>
//         <p className="text-xs text-gray-500 mb-6">
//           Your feedback helps other users make better decisions
//         </p>

//         {/* Star Rating - Bigger stars above content */}
//         <div className="flex items-center mb-6 justify-start">
//           {stars.map((star) => (
//             <button
//               key={star}
//               type="button"
//               onClick={() => setRating(star)}
//               className={`text-4xl sm:text-5xl ${
//                 rating >= star ? "text-yellow-400" : "text-gray-300"
//               } transition-colors mx-0.5 sm:mx-1 hover:scale-110`}
//             >
//               ★
//             </button>
//           ))}
//         </div>

//         {rating > 0 && (
//           <p className="text-sm text-gray-600 mb-4">
//             {rating === 5 && "Excellent! 🌟"}
//             {rating === 4 && "Very Good! 👍"}
//             {rating === 3 && "Good 😊"}
//             {rating === 2 && "Could be better 😐"}
//             {rating === 1 && "Needs improvement 😞"}
//           </p>
//         )}

//         {/* Feedback Textarea with Edit Circle Button */}
//         <div className="relative mb-4">
//           <textarea
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             className="w-full border border-gray-300 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm sm:text-base"
//             rows={4}
//             placeholder="Type your feedback here..."
//           />
//           {/* Edit button attached to textarea */}
//           <button
//             className="absolute top-2 right-2 bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-blue-700 transition"
//             onClick={() => document.querySelector('textarea')?.focus()}
//           >
//             <Edit2 size={16} />
//           </button>
//         </div>

//         {/* Text between textarea and submit button */}
//         <p className="text-gray-600 text-left mb-4 text-xs sm:text-sm">
//           Tell us about your experience
//         </p>

//         {/* Submit Button */}
//         <div className="flex justify-center gap-3">
//           <button
//             onClick={() => navigate("/notifications")}
//             className="bg-white border-2 border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-md hover:bg-gray-50 transition-all"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-6 py-2 rounded-md hover:opacity-90 transition-all shadow-md"
//           >
//             Submit Feedback
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Feedback;






import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Edit2, Star, X, Loader2 } from "lucide-react";
import apiService from "../services/api.service";
import toast from "react-hot-toast";

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// Helper function to get safe userId
const getSafeUserId = (): string => {
  let userId = localStorage.getItem("userId") || "6901dcf9fc4e029e07c5f54e";
  
  if (!isValidObjectId(userId)) {
    console.warn("⚠️ Invalid userId in localStorage:", userId);
    userId = "6901dcf9fc4e029e07c5f54e"; // Use fallback
  }
  
  return userId;
};

interface Review {
  _id: string;
  userId: string;
  vehicleId: string;
  rating: number;
  review?: string;
  reviewText?: string;
  comment?: string;
  feedback?: string;
  userName?: string;
  createdAt?: string;
}

const FeedbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingReview, setExistingReview] = useState<any>(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [avgLoading, setAvgLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("User");

  // Get params from URL
  const vehicleId = searchParams.get("vehicleId") || "";
  const vehicleName = searchParams.get("vehicleName") || "Vehicle";
  const vehicleType = (searchParams.get("vehicleType") || "car").toLowerCase();
  const reviewId = searchParams.get("reviewId");
  const isEditing = !!reviewId;
  
  // Check if this is a real MongoDB ID or a demo/mock ID
  const isRealVehicleId = isValidObjectId(vehicleId);
  const isDemoMode = !isRealVehicleId;

  console.log("📋 FeedbackPage loaded:", { 
    vehicleId, 
    vehicleName, 
    vehicleType, 
    reviewId, 
    isEditing,
    isRealVehicleId,
    isDemoMode 
  });

  // Fetch user profile name using apiClient
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = getSafeUserId();
        
        // Using apiClient directly from the api.service file
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://3.110.122.127:3000';
        const response = await fetch(`${API_BASE_URL}/getUserProfile/${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log("✅ User profile fetched:", data);
          setUserName(data.name || data.userName || "User");
        } else {
          console.warn("⚠️ Failed to fetch user profile, using default name");
        }
      } catch (error) {
        console.error("❌ Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  // Fetch average rating using api.service (only for real vehicle IDs)
  useEffect(() => {
    const fetchAverageRating = async () => {
      if (!vehicleId) return;
      
      // Skip API call for demo vehicles
      if (isDemoMode) {
        console.log("⚠️ Demo mode: Skipping average rating API call");
        setAvgLoading(false);
        return;
      }
      
      try {
        setAvgLoading(true);
        console.log("📊 Fetching average rating for:", vehicleId, vehicleType);
        
        const result: any = await apiService.review.getAverageRating(
          vehicleId, 
          vehicleType as 'car' | 'bike'
        );
        
        console.log("✅ Average rating response:", result);
        
        const avgRating = parseFloat(
          result?.averageRating || 
          result?.rating || 
          result?.data?.averageRating || 
          "0"
        );
        const total = 
          result?.totalReviews || 
          result?.reviewCount || 
          result?.count || 
          result?.data?.totalReviews || 
          0;
        
        setAverageRating(avgRating);
        setTotalReviews(total);
      } catch (error: any) {
        console.error("❌ Error fetching average rating:", error);
      } finally {
        setAvgLoading(false);
      }
    };

    fetchAverageRating();
  }, [vehicleId, vehicleType, isDemoMode]);

  // Fetch existing review for editing
  useEffect(() => {
    const fetchReviewById = async () => {
      if (!reviewId) return;

      try {
        console.log("🔍 Fetching review by ID:", reviewId);
        
        const result: any = await apiService.review.getReviewsByCarId(reviewId);
        
        console.log("✅ Existing review:", result);
        
        const reviewData = result?.review || result?.data || result;
        
        setExistingReview(reviewData);
        setRating(reviewData?.rating || 0);
        setFeedback(reviewData?.review || reviewData?.reviewText || "");
      } catch (error) {
        console.error("❌ Error fetching review:", error);
        toast.error("Failed to load existing review");
      }
    };

    fetchReviewById();
  }, [reviewId]);

  // Handle form submission
  const handleSubmit = async () => {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🚀 SUBMIT REVIEW");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Mode:", isEditing ? "UPDATE" : "CREATE");
    console.log("Vehicle ID:", vehicleId);
    console.log("Is Real ID:", isRealVehicleId);
    console.log("Is Demo Mode:", isDemoMode);
    console.log("Vehicle Type:", vehicleType);
    console.log("Rating:", rating);
    console.log("Feedback:", feedback);

    // Validation
    if (rating === 0) {
      toast.error("⚠️ Please select a rating before submitting");
      return;
    }
    if (!feedback.trim()) {
      toast.error("⚠️ Please write your feedback before submitting");
      return;
    }

    // Handle demo mode
    if (isDemoMode) {
      console.log("🎭 DEMO MODE: Simulating review submission");
      toast.success(`✅ Demo: Review ${isEditing ? 'updated' : 'submitted'} successfully!`, {
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate(`/book-now/${vehicleId}`, { state: { vehicleType } });
      }, 1000);
      return;
    }

    setLoading(true);

    try {
      if (isEditing && reviewId) {
        // UPDATE EXISTING REVIEW
        console.log("🔄 Updating review ID:", reviewId);
        
        const updateData: any = {
          rating,
          comment: feedback,
        };
        
        // Add vehicle IDs based on type
        const vType = vehicleType.toLowerCase();
        if (vType === "car") {
          updateData.CarId = vehicleId;
        } else if (vType === "bike") {
          updateData.BikeId = vehicleId;
        } else if (vType === "auto") {
          updateData.AutoId = vehicleId;
        }

        console.log("📤 Update payload:", updateData);

        const result = await apiService.review.updateReviewById(reviewId, updateData);

        console.log("✅ Review updated successfully:", result);
        
        toast.success("✅ Review updated successfully!");
        
        // Store the review ID for highlighting in BookNow page
        sessionStorage.setItem('editingReviewId', reviewId);
        sessionStorage.setItem('returnToVehicleId', vehicleId);
        
        // Navigate back to BookNow page
        setTimeout(() => {
          navigate(`/book-now/${vehicleId}`, { state: { vehicleType } });
        }, 1000);
        
      } else {
        // CREATE NEW REVIEW
        console.log("➕ Creating new review");
        
        const userId = getSafeUserId();
        console.log("✅ Using userId:", userId);
        
        const reviewData = {
          userId,
          vehicleId,
          vehicleType: vehicleType as 'car' | 'bike',
          rating,
          comment: feedback,
        };

        console.log("📤 Create payload:", reviewData);

        const result = await apiService.review.createReview(reviewData);

        console.log("✅ Review created successfully:", result);
        
        toast.success("✅ Feedback submitted successfully!");
        
        // Navigate back to BookNow page
        setTimeout(() => {
          navigate(`/book-now/${vehicleId}`, { state: { vehicleType } });
        }, 1000);
      }
    } catch (error: any) {
      console.error("❌ Error submitting review:", error);
      
      // More specific error messages
      if (error?.response?.status === 404) {
        toast.error("❌ Vehicle or review not found");
      } else if (error?.response?.status === 400) {
        toast.error("❌ Invalid data. Please check your input.");
      } else if (error?.response?.status === 500) {
        toast.error("❌ Server error. Please try again later.");
      } else if (error?.message?.includes('Network')) {
        toast.error("❌ Network error. Please check your connection.");
      } else if (error?.message?.includes('ObjectId')) {
        toast.error("❌ Invalid vehicle ID. This appears to be a demo vehicle.");
      } else {
        toast.error("❌ Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Render stars for average rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative inline-block">
            <Star size={20} className="text-gray-300" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <Star size={20} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={20} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 pb-10">
      <div className="bg-white shadow-md rounded-xl p-6 relative">
        {/* Average Rating Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          {isDemoMode && (
            <div className="mb-3 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800 font-medium flex items-center gap-2">
                <span>🎭</span>
                <span>Demo Mode: Using sample data</span>
              </p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Current Average Rating
              </h3>
              {avgLoading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-800">
                      {averageRating.toFixed(1)}
                    </span>
                    <div className="flex gap-0.5">{renderStars()}</div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                  </p>
                </>
              )}
            </div>
            <div className="text-right">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                <Star size={32} className="fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          📝 {isEditing ? "Edit Your Review" : "We value your feedback"}
        </h1>
        <p className="text-base text-gray-600 mb-2">
          Rate your experience with {vehicleName}
        </p>
        <p className="text-xs text-gray-500 mb-6">
          Your feedback helps other users make better decisions
        </p>

        {/* Rating Stars */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Your Rating</p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-5xl ${
                  rating >= star ? "text-yellow-400" : "text-gray-300"
                } transition-all hover:scale-110 active:scale-95`}
              >
                ★
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-lg font-semibold text-gray-700">
                {rating}.0
              </span>
            )}
          </div>
        </div>

        {/* Feedback Textarea */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Your Review
          </label>
          <div className="relative">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              maxLength={500}
              className="w-full border-2 border-gray-300 rounded-lg p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
              rows={5}
              placeholder="Share your experience with this vehicle..."
            />
            <button
              type="button"
              className="absolute top-3 right-3 bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-blue-700 transition"
              onClick={() => setIsModalOpen(true)}
            >
              <Edit2 size={18} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {feedback.length}/500 characters
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate(`/book-now/${vehicleId}`, { state: { vehicleType } })}
            className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              `${isEditing ? 'Update' : 'Submit'} Feedback`
            )}
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <FeedbackModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialRating={rating}
          initialComment={feedback}
          onSubmit={(newRating, newComment) => {
            setRating(newRating);
            setFeedback(newComment);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// ============================================
// FEEDBACK MODAL COMPONENT
// ============================================
interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRating: number;
  initialComment: string;
  onSubmit: (rating: number, comment: string) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ 
  isOpen, 
  onClose, 
  initialRating, 
  initialComment, 
  onSubmit 
}) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [comment, setComment] = useState(initialComment || "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Feedback</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Star Rating */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Rate your experience</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="text-4xl transition-all hover:scale-110"
              >
                {star <= rating ? "⭐" : "☆"}
              </button>
            ))}
          </div>
        </div>

        {/* Comment box */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Comments</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
            className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your experience..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(rating, comment)}
            className="flex-1 py-2.5 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white rounded-lg font-medium hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;