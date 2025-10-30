import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vehicles } from "./data/Vehicle";
import { Vehicle } from "../types/Vehicle";
import { Star } from "lucide-react";
import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
import WaitingPopup from "../components/ui/WaitingPopup";
import BookingAcceptance from "../components/ui/BookingAcceptance";
import BookingRejectModal from "../components/ui/BookingRejectModal";
import PopupChat from "../components/ui/PopupChat";
import { useReviewStore } from "../store/review.store";
import { useNotificationStore } from "../store/notification.store";
import { useBookingStore } from "../store/booking.store";
 
import Automatic from "../assets/icons/AutomaticLogo.png";
import Driver from "../assets/icons/DriverLogo.png";
// import Acicon from "../assets/icons/AcIcon.png";
import Acicon from "../assets/icons/AutomaticLogo.png";
import Petrol from "../assets/icons/Petrol.png";
 
const BookNow: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);
 
  // 🔹 Stores and helpers
  const {
    getReviewsByVehicleId,
    getAverageRating,
    getTotalReviewCount,
    getRatingDistribution,
  } = useReviewStore();
  const { addNotification } = useNotificationStore();
  const { addBooking } = useBookingStore();
 
  // 🔹 UI states
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
  const [showContactButtons, setShowContactButtons] = useState(false);
  const [showWaitingPopup, setShowWaitingPopup] = useState(false);
  const [showAcceptance, setShowAcceptance] = useState(false);
  const [waitingTimerSeconds, setWaitingTimerSeconds] = useState<number>(30);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<{
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  } | null>(null);
 
  // 🔹 Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
 
    if (showWaitingPopup && waitingTimerSeconds > 0) {
      interval = setInterval(() => {
        setWaitingTimerSeconds((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
 
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showWaitingPopup, waitingTimerSeconds]);
 
  if (!vehicle) return <p className="p-8">Vehicle not found!</p>;
 
  // 🔹 Utility: map vehicle type
  const mapVehicleType = (
    type: Vehicle["type"] | undefined
  // ): "Car" | "Auto" | "Bike" => {
  ): "Car" |"Bike" => {
    // const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
      const typeMap: Record<string, "Car" |  "Bike"> = {
      car: "Car",
      // auto: "Auto",
      bike: "Bike",
    };
    return type ? typeMap[type] : "Car";
  };
 
  // 🔹 Review data
  const vehicleReviews = getReviewsByVehicleId(vehicle.id);
  const averageRating = getAverageRating(vehicle.id);
  const totalReviews = getTotalReviewCount(vehicle.id);
  const ratingDistribution = getRatingDistribution(vehicle.id);
 
  // 🔹 Handlers
  const handleTimerComplete = () => {
    console.log("⏰ Timer completed - Opening BookingAcceptance");
    setShowWaitingPopup(false);
    setShowAcceptance(true);
  };
 
  const handleCloseWaiting = () => {
    console.log("❌ WaitingPopup closed manually");
    setShowWaitingPopup(false);
    setWaitingTimerSeconds(30);
  };
 
  const handleAcceptBooking = () => {
    console.log("✅ Booking Accepted!");
    setShowAcceptance(false);
    setShowContactButtons(true);
  };
 
 
 
 
// Update the handleRejectBooking function (around line 100)
const handleRejectBooking = () => {
  console.log("❌ Booking Rejected!");
  setShowAcceptance(false);
  setShowRejectModal(true); // Add this line to show reject modal
};
 
// Add a new handler for closing the reject modal
const handleCloseRejectModal = () => {
  console.log("🔙 Reject modal closed");
  setShowRejectModal(false);
};
 
  const handleConfirmBooking = () => {
    if (!vehicle) return;
 
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
      bookingTime: currentDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      startDate: currentDate.toLocaleDateString("en-US"),
      startTime: currentDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      endDate: endDate.toLocaleDateString("en-US"),
      endTime: currentDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      modelNo: vehicle.id.toUpperCase(),
      status: "Booked",
      price: vehicle.price,
    });
 
    // Simulate notification after ride completion
    setTimeout(() => {
      addNotification({
        type: "ride_completed",
        title: "Ride Completed! 🏁",
        message: `Your ride with ${vehicle.name} has been completed successfully. Please share your experience.`,
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        bookingId,
        requiresFeedback: true,
      });
    }, 2000);
 
    navigate("/notifications");
  };
 
  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ---- Left Column - Vehicle Image ---- */}
      <div className="lg:col-span-1">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="rounded-xl w-full mb-4"
        />
        <div className="flex justify-center space-x-2 mt-2">
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
        </div>
      </div>
 
      {/* ---- Middle Column - Vehicle Info ---- */}
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-bold">{vehicle.name}</h2>
        <p className="text-gray-600 text-lg mt-1">₹{vehicle.price}/hr</p>
 
        {/* ---- Features ---- */}
        <div className="flex gap-4 mt-4">
          {[
            { img: Automatic, label: "Automatic" },
            { img: Driver, label: "5 Seaters" },
            { img: Petrol, label: "Petrol" },
            { img: Acicon, label: "AC" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-2 border rounded-lg"
            >
              <img
                src={item.img}
                alt={item.label}
                className="w-[25px] h-[25px]"
              />
              <span className="text-sm mt-1">{item.label}</span>
            </div>
          ))}
        </div>
 
        {/* ---- Description ---- */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Description</h3>
          <p className="text-gray-600 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
 
        {/* ---- Book Now Flow ---- */}
        {!showContactButtons ? (
          <button
            onClick={() => setIsDateTimeModalOpen(true)}
            className="mt-6 w-full bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Book Now
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            {/* Owner info */}
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
 
            {/* Warning message */}
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
 
            {/* Chat & Call buttons */}
            <div className="flex gap-3">
             <button
  onClick={() => setIsChatOpen(true)}  // Changed this line
  className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
>
  Chat
</button>
              <button
                onClick={handleConfirmBooking}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
              >
                Call
              </button>
            </div>
          </div>
        )}
 
        {/* ---- DateTime Modal ---- */}
        {isDateTimeModalOpen && (
          <AvailabilityDateTimeModal
            isOpen={isDateTimeModalOpen}
            onClose={() => setIsDateTimeModalOpen(false)}
            onConfirm={(
              startDate: string,
              endDate: string,
              startTime: string,
              endTime: string,
              availability: string
            ) => {
              console.log("✅ Confirm clicked - Opening WaitingPopup");
              setSelectedDateTime({ startDate, endDate, startTime, endTime });
              setIsDateTimeModalOpen(false);
             
              // Start waiting popup immediately
              setWaitingTimerSeconds(30);
              setShowWaitingPopup(true);
            }}
          />
        )}
      </div>
 
      {/* ---- Right Column - Reviews ---- */}
      <div className="lg:col-span-1">
        <h3 className="text-lg font-bold">Rating & Reviews</h3>
 
        <div className="flex items-center mt-2 mb-2 justify-between">
          <span className="text-2xl font-bold">{averageRating}</span>
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
 
        <span className="text-gray-500 text-sm">{totalReviews} Reviews</span>
 
        <div className="mt-4 space-y-2">
          {ratingDistribution.map((r) => (
            <div key={r.stars} className="flex items-center text-sm">
              <span className="w-6">{r.stars}★</span>
              <div className="flex-1 bg-gray-200 h-2 rounded mx-2">
                <div
                  className="bg-yellow-400 h-2 rounded"
                  style={{ width: `${r.percentage}%` }}
                />
              </div>
              <span className="text-gray-500 text-xs">{r.percentage}%</span>
            </div>
          ))}
        </div>
 
        <div className="mt-4 space-y-3">
          {vehicleReviews.map((r, idx) => (
            <div key={idx} className="border p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{r.userName}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < r.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
 
      {/* ---- Waiting Popup (30 seconds countdown) ---- */}
      {showWaitingPopup && (
        <WaitingPopup
          timer={waitingTimerSeconds}
          onClose={handleCloseWaiting}
          onTimerComplete={handleTimerComplete}
        />
      )}
 
      {/* ---- Booking Acceptance Modal ---- */}
      {showAcceptance && (
        <BookingAcceptance
          onAccept={handleAcceptBooking}
          onReject={handleRejectBooking}
          onClose={() => setShowAcceptance(false)}
        />
      )}
      <PopupChat
  isOpen={isChatOpen}
  onClose={() => setIsChatOpen(false)}
  ownerName="Manoj Kumar"
  ownerAvatar="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
/>
 
      {/* ---- Booking Reject Modal ---- */}
<BookingRejectModal
  isOpen={showRejectModal}
  onClose={handleCloseRejectModal}
/>
    </div>
  );
};
 
export default BookNow;
 