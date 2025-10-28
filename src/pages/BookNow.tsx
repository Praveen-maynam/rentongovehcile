import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vehicles } from "./data/Vehicle";
import { Vehicle } from "../types/Vehicle";
import { Star } from "lucide-react";
import BookingConfirmationModal from "../components/BookingConfirmationModal";
import { useReviewStore } from "../store/review.store";
import { useNotificationStore } from "../store/notification.store";
import { useBookingStore } from "../store/booking.store";

import Automatic from "../assets/icons/AutomaticLogo.png";
import Driver from "../assets/icons/DriverLogo.png";
import Acicon from "../assets/icons/AutomaticLogo.png";
import Petrol from "../assets/icons/Petrol.png";

const BookNow: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);

  const { getReviewsByVehicleId, getAverageRating, getTotalReviewCount, getRatingDistribution } =
    useReviewStore();
  const { addNotification } = useNotificationStore();
  const { addBooking } = useBookingStore();

  const [showContactButtons, setShowContactButtons] = React.useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(false);
  const [showAllReviews, setShowAllReviews] = React.useState(false);

  if (!vehicle) return <p className="p-8">Vehicle not found!</p>;

  const mapVehicleType = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
    const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
      car: "Car",
      auto: "Auto",
      bike: "Bike",
    };
    return type ? typeMap[type] : "Car";
  };

  const vehicleReviews = vehicle ? getReviewsByVehicleId(vehicle.id) : [];
  const averageRating = vehicle ? getAverageRating(vehicle.id) : 0;
  const totalReviews = vehicle ? getTotalReviewCount(vehicle.id) : 0;
  const ratingDistribution = vehicle ? getRatingDistribution(vehicle.id) : [];

  const handleConfirmBooking = () => {
    setShowConfirmationModal(false);

    if (vehicle) {
      const bookingId = Date.now().toString();
      const currentDate = new Date();
      const endDate = new Date(currentDate.getTime() + 86400000); // +1 day

      // Save booking
      addBooking({
        id: bookingId,
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        vehicleImage: vehicle.image,
        vehicleType: mapVehicleType(vehicle.type),
        customerName: "Current User",
        bookingDate: currentDate.toLocaleDateString("en-US"),
        bookingTime: currentDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        startDate: currentDate.toLocaleDateString("en-US"),
        startTime: currentDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        endDate: endDate.toLocaleDateString("en-US"),
        endTime: currentDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        modelNo: vehicle.id.toUpperCase(),
        status: "Booked",
        price: vehicle.price,
      });

      // Simulate ride completion
      setTimeout(() => {
        addNotification({
          type: "ride_completed",
          title: "Ride Completed! 🏁",
          message: `Your ride with ${vehicle.name} has been completed successfully. Please share your experience.`,
          vehicleId: vehicle.id,
          vehicleName: vehicle.name,
          bookingId: bookingId,
          requiresFeedback: true,
        });
      }, 2000);
    }

    navigate("/notifications");
  };

  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Vehicle Image */}
      <div className="lg:col-span-1">
        <img src={vehicle.image} alt={vehicle.name} className="rounded-xl w-full mb-4" />
        <div className="flex justify-center space-x-2 mt-2">
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
        </div>
      </div>

      {/* Middle Column - Vehicle Info */}
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-bold">{vehicle.name}</h2>
        <p className="text-gray-600 text-lg mt-1">₹{vehicle.price}/hr</p>

        <div className="flex gap-4 mt-4">
          <div className="flex flex-col items-center p-2 border rounded-lg">
            <img src={Automatic} alt="Automatic" className="w-[25px] h-[25px]" />
            <span className="text-sm mt-1">Automatic</span>
          </div>

          <div className="flex flex-col items-center p-2 border rounded-lg">
            <img src={Driver} alt="5 Seaters" className="w-[25px] h-[25px]" />
            <span className="text-sm mt-1">5 Seaters</span>
          </div>

          <div className="flex flex-col items-center p-2 border rounded-lg">
            <img src={Petrol} alt="Petrol" className="w-[25px] h-[25px]" />
            <span className="text-sm mt-1">Petrol</span>
          </div>

          <div className="flex flex-col items-center p-2 border rounded-lg">
            <img src={Acicon} alt="AC" className="w-[25px] h-[25px]" />
            <span className="text-sm mt-1">AC</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Description</h3>
          <p className="text-gray-600 text-sm">
            Lorem ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Book Now Button */}
        {!showContactButtons ? (
          <button
            onClick={() => setShowContactButtons(true)}
            className="mt-6 w-full bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Book Now
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            {/* Owner Information */}
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
              <img
                src="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
                alt="Manoj Kumar"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Manoj Kumar</h4>
                <p className="text-sm text-gray-500">Vehicle Owner</p>
              </div>
            </div>

            {/* Warning Message */}
            <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
              <svg
                className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-orange-700 flex-1">
                To confirm booking, please call or chat with vehicle owner.
              </p>
            </div>

            {/* Chat and Call Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition">
                Chat
              </button>
              <button
                onClick={() => setShowConfirmationModal(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
              >
                Call
              </button>
            </div>
          </div>
        )}

        {/* Booking Confirmation Modal */}
        <BookingConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={handleConfirmBooking}
        />
      </div>

      {/* Right Column - Reviews */}
      <div className="lg:col-span-1">
        <h3 className="text-lg font-bold">Rating & Reviews</h3>

        {/* Average Rating */}
        <div className="flex items-center mt-2 mb-2 justify-between">
          <span className="text-2xl font-bold">{averageRating > 0 ? averageRating : "N/A"}</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={
                  i < Math.floor(averageRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }
                size={20}
              />
            ))}
          </div>
        </div>

        {/* Reviews Count */}
        <span className="text-gray-500 text-sm">
          {totalReviews} review{totalReviews !== 1 ? "s" : ""}
        </span>

        {/* Rating Distribution */}
        <div className="mt-4 space-y-1">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center text-sm">
              <span className="w-6">{item.stars}★</span>
              <div className="flex-1 bg-gray-200 h-2 rounded mx-2">
                <div
                  className="bg-yellow-400 h-2 rounded transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="w-16 text-gray-500 text-right">
                {item.count} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>

        {/* Customer Reviews */}
        <h4 className="font-semibold text-md mt-4 mb-2">Customer Reviews</h4>

        {vehicleReviews.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          <>
            <div
              className={`space-y-4 transition-all duration-500 ease-in-out ${
                showAllReviews ? "max-h-[1000px]" : "max-h-[400px] overflow-hidden"
              }`}
            >
              {(showAllReviews ? vehicleReviews : vehicleReviews.slice(0, 4)).map(
                (review, idx) => (
                  <div key={idx} className="border p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] rounded-full flex items-center justify-center text-white font-bold">
                        {review.userName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900">{review.userName}</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }
                                size={14}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-xs">{review.location}</span>
                          <span className="text-gray-400 text-xs">•</span>
                          <span className="text-gray-400 text-xs">
                            {new Date(review.timestamp).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
                  </div>
                )
              )}
            </div>

            {/* Show More / Show Less Button */}
            {vehicleReviews.length > 4 && (
              <p
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="mt-4 text-center text-blue-600 cursor-pointer hover:text-blue-700 font-medium"
              >
                {showAllReviews
                  ? "Show Less"
                  : `See all ${totalReviews} review${totalReviews !== 1 ? "s" : ""}`}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookNow;
