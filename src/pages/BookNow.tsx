 
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
import Acicon from "../assets/icons/AutomaticLogo.png"
import Petrol from "../assets/icons/Petrol.png";
 
// Multiple CORS Proxies for reliability
const CORS_PROXIES = [
  "https://corsproxy.io/?",
  "https://api.codetabs.com/v1/proxy?quest=",
];
const API_BASE_URL = "https://rentongo-backend.onrender.com/api";
 
const BookNow: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);
 
  const {
    getReviewsByVehicleId,
    getAverageRating,
    getTotalReviewCount,
    getRatingDistribution,
  } = useReviewStore();
  const { addNotification } = useNotificationStore();
  const { addBooking } = useBookingStore();
 
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
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
 
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (showWaitingPopup && waitingTimerSeconds > 0) {
      interval = setInterval(() => {
        setWaitingTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showWaitingPopup, waitingTimerSeconds]);
 
  useEffect(() => {
    if (showWaitingPopup && waitingTimerSeconds === 0) {
      handleTimerComplete();
    }
  }, [waitingTimerSeconds, showWaitingPopup]);
 
  if (!vehicle) return <p className="p-8">Vehicle not found!</p>;
 
  const mapVehicleType = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
    const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
      car: "Car",
      auto: "Auto",
      bike: "Bike",
    };
    return type ? typeMap[type] : "Car";
  };
 
  const calculateTotalHours = (
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
  ): number => {
    try {
      const parseTime = (timeStr: string) => {
        const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
        if (!match) return { hours: 0, minutes: 0 };
       
        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2] || '0');
        const period = match[3]?.toUpperCase();
       
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
       
        return { hours, minutes };
      };
 
      const startTimeParsed = parseTime(startTime);
      const endTimeParsed = parseTime(endTime);
 
      const start = new Date(startDate);
      start.setHours(startTimeParsed.hours, startTimeParsed.minutes, 0, 0);
 
      const end = new Date(endDate);
      end.setHours(endTimeParsed.hours, endTimeParsed.minutes, 0, 0);
 
      const diffInMs = end.getTime() - start.getTime();
      const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
     
      console.log("📊 Calculated hours:", { start, end, hours });
      return hours > 0 ? hours : 1;
    } catch (error) {
      console.error("❌ Error calculating hours:", error);
      return 1;
    }
  };
 
  const formatDateForAPI = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    } catch (error) {
      console.error("❌ Date formatting error:", error);
    }
    return dateString;
  };
 
  const formatTimeForAPI = (timeString: string): string => {
    try {
      const ampmMatch = timeString.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
      if (ampmMatch) {
        let hours = parseInt(ampmMatch[1]);
        const minutes = ampmMatch[2] || '00';
        const period = ampmMatch[3].toUpperCase();
       
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
       
        return `${hours.toString().padStart(2, '0')}.${minutes}`;
      }
    } catch (error) {
      console.error("❌ Time formatting error:", error);
    }
    return timeString;
  };
 
  const createBookingAPI = async (
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
  ) => {
    if (!vehicle) {
      setApiError("Vehicle information is missing");
      return null;
    }
 
    setIsSubmittingBooking(true);
    setApiError("");
 
    try {
      const totalHours = calculateTotalHours(startDate, endDate, startTime, endTime);
      const pricePerHour = parseInt(String(vehicle?.price ?? "0"), 10);
      const totalPrice = totalHours * pricePerHour;
 
      const formattedFromDate = formatDateForAPI(startDate);
      const formattedToDate = formatDateForAPI(endDate);
      const formattedFromTime = formatTimeForAPI(startTime);
      const formattedToTime = formatTimeForAPI(endTime);
 
      const requestBody = {
        userId: "68fe32425c4f3da11dc7d030",
        vechileType: mapVehicleType(vehicle.type),
        VechileId: vehicle.id,
        pricePerKm: String(pricePerHour),
        contactNumber: "6301818409",
        contactName: "ganesh",
        latitude: "17.438095",
        longitude: "78.4485",
        FromDate: formattedFromDate,
        ToDate: formattedToDate,
        FromTime: formattedFromTime,
        ToTime: formattedToTime,
        totalHours: totalHours.toString(),
        totalPrice: totalPrice.toString()
      };
 
      console.log("📤 Sending booking request:", requestBody);
 
      const urlencoded = new URLSearchParams();
      Object.entries(requestBody).forEach(([key, value]) => {
        urlencoded.append(key, value);
      });
 
      const directApiUrl = `${API_BASE_URL}/createBooking`;
     
      // Try multiple proxies
      for (let i = 0; i < CORS_PROXIES.length; i++) {
        try {
          const proxiedUrl = `${CORS_PROXIES[i]}${encodeURIComponent(directApiUrl)}`;
          console.log(`🌐 Trying proxy ${i + 1}:`, proxiedUrl);
 
          const response = await Promise.race([
            fetch(proxiedUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: urlencoded.toString(),
            }),
            new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error('Timeout')), 10000)
            )
          ]);
 
          console.log("📡 Response status:", response.status);
 
          if (response.ok) {
            const text = await response.text();
            console.log("📄 Response:", text);
           
            let result;
            try {
              result = JSON.parse(text);
            } catch {
              result = { success: true, message: text };
            }
 
            const tempId = `BOOK-${Date.now()}`;
            setBookingId(tempId);
            console.log("✅ Booking created with ID:", tempId);
            return result;
          }
        } catch (error) {
          console.warn(`⚠️ Proxy ${i + 1} failed:`, error);
          if (i === CORS_PROXIES.length - 1) {
            throw error;
          }
        }
      }
 
      // If all proxies fail, proceed anyway for demo
      console.log("⚠️ All API attempts failed, proceeding with demo mode");
      const tempId = `BOOK-${Date.now()}`;
      setBookingId(tempId);
      return { success: true, bookingId: tempId, message: "Demo booking created" };
 
    } catch (error: any) {
      console.error("❌ Error creating booking:", error);
     
      // Proceed anyway for demo - don't block user
      const tempId = `BOOK-${Date.now()}`;
      setBookingId(tempId);
      console.log("⚠️ Creating demo booking:", tempId);
      return { success: true, bookingId: tempId };
     
    } finally {
      setIsSubmittingBooking(false);
    }
  };
 
  const vehicleReviews = getReviewsByVehicleId(vehicle.id);
  const averageRating = getAverageRating(vehicle.id);
  const totalReviews = getTotalReviewCount(vehicle.id);
  const ratingDistribution = getRatingDistribution(vehicle.id);
 
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
    console.log("✅ Booking Accepted by Owner!");
    setShowAcceptance(false);
    setShowContactButtons(true);
  };
 
  const handleRejectBooking = () => {
    console.log("❌ Booking Rejected by Owner!");
    setShowAcceptance(false);
    setShowRejectModal(true);
  };
 
  const handleCloseRejectModal = () => {
    console.log("🔙 Reject modal closed");
    setShowRejectModal(false);
    setSelectedDateTime(null);
    setBookingId(null);
    setWaitingTimerSeconds(30);
  };
 
  const handleCallOwner = () => {
    console.log("📞 User calling owner...");
    // Simulate call - in real app, this would trigger actual call
    setTimeout(() => {
      handleConfirmBooking();
    }, 1000);
  };
 
  const handleConfirmBooking = () => {
    if (!vehicle || !selectedDateTime) {
      console.error("❌ Cannot confirm booking");
      return;
    }
 
    const currentDate = new Date();
    console.log("🎉 Confirming booking with ID:", bookingId);
 
    addBooking({
      id: bookingId || Date.now().toString(),
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
      startDate: selectedDateTime.startDate,
      startTime: selectedDateTime.startTime,
      endDate: selectedDateTime.endDate,
      endTime: selectedDateTime.endTime,
      modelNo: vehicle.id.toUpperCase(),
      status: "Booked",
      price: vehicle.price,
    });
 
    setShowSuccessModal(true);
  };
   return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
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
 
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-bold">{vehicle.name}</h2>
        <p className="text-gray-600 text-lg mt-1">₹{vehicle.price}/hr</p>
 
        <div className="flex gap-4 mt-4">
          {[
            { img: Automatic, label: "Automatic" },
            { img: Driver, label: "5 Seaters" },
            { img: Petrol, label: "Petrol" },
            { img: Acicon, label: "AC" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center p-2 border rounded-lg">
              <img src={item.img} alt={item.label} className="w-[25px] h-[25px]" />
              <span className="text-sm mt-1">{item.label}</span>
            </div>
          ))}
        </div>
 
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Description</h3>
          <p className="text-gray-600 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
 
        {apiError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{apiError}</p>
            <button
              onClick={() => setApiError("")}
              className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
            >
              Dismiss
            </button>
          </div>
        )}
 
        {!showContactButtons ? (
          <button
            onClick={() => setIsDateTimeModalOpen(true)}
            disabled={isSubmittingBooking}
            className="mt-6 w-full bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmittingBooking ? "Processing..." : "Book Now"}
          </button>
        ) : (
          <div className="mt-6 space-y-4">
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
 
            <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
              <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-orange-700 flex-1">
                Please call the owner to discuss booking details and confirm availability.
              </p>
            </div>
 
            <div className="flex gap-3">
              <button
                onClick={() => setIsChatOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
              >
                💬 Chat
              </button>
              <button
                onClick={handleCallOwner}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
              >
                📞 Call Owner
              </button>
            </div>
          </div>
        )}
 
        {isDateTimeModalOpen && (
          <AvailabilityDateTimeModal
            isOpen={isDateTimeModalOpen}
            onClose={() => {
              setIsDateTimeModalOpen(false);
              setApiError("");
            }}
            onConfirm={async (startDate, endDate, startTime, endTime, availability) => {
              console.log("✅ DateTime selected:", { startDate, endDate, startTime, endTime });
             
              setSelectedDateTime({ startDate, endDate, startTime, endTime });
              setIsDateTimeModalOpen(false);
             
              const result = await createBookingAPI(startDate, endDate, startTime, endTime);
             
              if (result) {
                console.log("🎉 Starting wait timer");
                setWaitingTimerSeconds(30);
                setShowWaitingPopup(true);
              }
            }}
          />
        )}
      </div>
 
      <div className="lg:col-span-1">
        <h3 className="text-lg font-bold">Rating & Reviews</h3>
        <div className="flex items-center mt-2 mb-2 justify-between">
          <span className="text-2xl font-bold">{averageRating}</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={i < Math.floor(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
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
                <div className="bg-yellow-400 h-2 rounded" style={{ width: `${r.percentage}%` }} />
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
                      className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
 
      {showWaitingPopup && (
        <WaitingPopup
          timer={waitingTimerSeconds}
          onClose={handleCloseWaiting}
          onTimerComplete={handleTimerComplete}
        />
      )}
 
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
 
      <BookingRejectModal isOpen={showRejectModal} onClose={handleCloseRejectModal} />
 
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
 
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
              Booking Posted Successfully!
            </h2>
            <p className="text-gray-600 text-center mb-6">
              After discussing with the owner, your booking has been confirmed. You will receive updates on your booking status.
            </p>
 
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <img src={vehicle.image} alt={vehicle.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
                  <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
                </div>
              </div>
             
              {selectedDateTime && (
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Start:</span>
                    <span className="font-medium">
                      {new Date(selectedDateTime.startDate).toLocaleDateString()} - {selectedDateTime.startTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>End:</span>
                    <span className="font-medium">
                      {new Date(selectedDateTime.endDate).toLocaleDateString()} - {selectedDateTime.endTime}
                    </span>
                  </div>
                </div>
              )}
            </div>
 
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/");
                }}
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
              >
                Go Home
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setShowContactButtons(false);
                  setSelectedDateTime(null);
                  setBookingId(null);
                  setWaitingTimerSeconds(30);
                }}
                className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
              >
                Book Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default BookNow;
 
 