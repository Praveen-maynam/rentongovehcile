import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PopupChat from "../components/ui/PopupChat";
import apiService, { SOCKET_URL } from "../services/api.service";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import Petrol from "../assets/icons/Petrol.png";
import Location from "../assets/icons/Location.png";
import seats from "../assets/icons/seats.jpeg";
import AClogo from "../assets/icons/ac.png";
import BikeCC from "../assets/icons/BikeCC.png";
import { Loader2, MessageCircle, Phone, AlertCircle } from "lucide-react";

interface VehicleData {
  _id: string;
  userId?: string;
  ownerId?: string;
  vehicleType?: string;
  CarName?: string;
  carName?: string;
  CarModel?: string;
  CarNumber?: string;
  Carseater?: string;
  RentPerHour?: number;
  RentPerDay?: number;
  carImages?: string[];
  fuelType?: string;
  transmissionType?: string;
  Ac_available?: boolean;
  kmDriven?: number;
  bikeName?: string;
  bikeModel?: string;
  bikeNumber?: string;
  pricePerKm?: number;
  bikeImages?: string[];
  bikeCC?: string;
  engineCapacity?: string;
  bikeEngine?: string;
  description?: string;
  contactName?: string;
  contactNumber?: string;
  Available?: boolean;
  pickupCity?: string;
  pickupCityState?: string;
  pickupArea?: string;
  latitude?: string;
  longitude?: string;
}

const BookingDetail: React.FC = () => {
  const { vehicleId: urlVehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const passedVehicleData = location.state?.vehicleData;
  const passedBooking = location.state?.booking;
  const openContact = location.state?.openContact || false;
  const passedVehicleType = location.state?.vehicleType || passedVehicleData?.vehicleType;

  const vehicleType = passedVehicleType ||
    (passedVehicleData?.CarName || passedVehicleData?.carName || passedVehicleData?.carImages || passedVehicleData?.RentPerHour ? "car" : "bike");

  const vehicleId = urlVehicleId || passedVehicleData?._id;

  const isConfirmed = passedBooking?.status?.toLowerCase() === "confirmed";

  // Auto-open chat if coming from booking history
  useEffect(() => {
    if (openContact && passedBooking) {
      setIsChatOpen(true);
    }
  }, [openContact, passedBooking]);

  useEffect(() => {
    const loadVehicleData = async () => {
      if (passedVehicleData && passedVehicleData._id &&
        (passedVehicleData.CarName || passedVehicleData.carName || passedVehicleData.bikeName)) {
        setVehicleData(passedVehicleData);
        setLoading(false);
        setError("");
        return;
      }

      if (!vehicleId) {
        setError("No vehicle ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        let result;
        if (vehicleType === "car") {
          result = await apiService.car.getCarById(vehicleId);
        } else {
          result = await apiService.bike.getBikeById(vehicleId);
        }

        const payload = result?.data ?? result;
        let data = payload?.car || payload?.bike || payload?.data || payload?.vehicle || payload;

        if (data?.bike) data = data.bike;
        if (data?.car) data = data.car;

        if (!data || typeof data !== "object" || !data._id) {
          throw new Error("Invalid vehicle response format");
        }

        setVehicleData(data);
        setError("");
      } catch (err: any) {
        if (passedVehicleData && passedVehicleData._id) {
          setVehicleData(passedVehicleData);
          setError("");
        } else {
          const errorMessage = err?.response?.data?.message || err?.message || "Failed to load vehicle details";
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    loadVehicleData();
  }, [vehicleId, vehicleType, passedVehicleData]);

  const handleConfirmBooking = () => {
    if (!isConfirmed) return;
    if (vehicleData?.contactNumber) {
      window.location.href = `tel:${vehicleData.contactNumber}`;
    } else {
      alert("Contact number not available");
    }
  };

  const handleChatClick = () => {
    if (!isConfirmed) return;
    console.log("💬 Opening chat...");
    setIsChatOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || "Vehicle not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isCar = vehicleType === "car" || !!vehicleData.CarName || !!vehicleData.carName || !!vehicleData.carImages;

  let vehicleImages = (isCar ? vehicleData.carImages : vehicleData.bikeImages) || [];
  vehicleImages = vehicleImages.filter((img) => img && img.trim() !== "" && img !== "undefined");

  const carDummyImages = [
    "https://e7.pngegg.com/pngimages/768/421/png-clipart-car-computer-icons-sedan-auto-detailing-auto-driving-rectangle-thumbnail.png",
    "https://png.pngtree.com/png-vector/20191201/ourmid/pngtree-car-vector-logo-design-png-image_2066853.jpg",
  ];

  const bikeDummyImages = [
    "https://w7.pngwing.com/pngs/579/51/png-transparent-computer-icons-motorcycle-bicycle-motorcycle-logo-black-silhouette.png",
    "https://w1.pngwing.com/pngs/381/835/png-transparent-yamaha-logo-car-decal-motorcycle-sticker-sport-bike-yamaha-yzfr1-bicycle-thumbnail.png"
  ];

  const dummyImages = isCar ? carDummyImages : bikeDummyImages;

  if (vehicleImages.length === 0) {
    vehicleImages = dummyImages;
  }

  const carouselImages = [...vehicleImages];
  while (carouselImages.length < 3) {
    carouselImages.push(dummyImages[carouselImages.length % dummyImages.length]);
  }

  const displayName = isCar
    ? vehicleData.CarName || vehicleData.carName || passedBooking?.vehicleName || "Unknown Vehicle"
    : vehicleData.bikeName || passedBooking?.vehicleName || "Unknown Bike";

  const displayModel = isCar ? vehicleData.CarModel || "N/A" : vehicleData.bikeModel || "N/A";

  const displayPrice = isCar
    ? vehicleData.RentPerHour || passedBooking?.price || 0
    : vehicleData.pricePerKm || passedBooking?.price || 0;

  const priceUnit = isCar ? "/hr" : "/km";

  const currentUserId = localStorage.getItem('userId') || 'temp-user-' + Date.now();
  const vehicleOwnerId = vehicleData.userId || vehicleData.ownerId || vehicleData.contactNumber || 'temp-owner-' + Date.now();
  const bookingCustomerId = passedBooking?.userId || currentUserId;
  const chatBookingId = passedBooking?._id || passedBooking?.bookingId || vehicleId || 'temp-booking-' + Date.now();

  const enabledButtonClass = "flex-1 flex items-center justify-center gap-2 sm:gap-3 text-white font-semibold text-[16px] sm:text-[18px] transition-all duration-200 hover:opacity-90 rounded-full bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] py-3 sm:py-0";
  const disabledButtonClass = "flex-1 flex items-center justify-center gap-2 sm:gap-3 text-gray-400 font-semibold text-[16px] sm:text-[18px] rounded-full bg-gray-200 cursor-not-allowed py-3 sm:py-0";

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-4 py-4 sm:py-6 flex justify-center">
      <div className="max-w-[900px] w-full bg-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col md:flex-row">
        {/* Vehicle Image Carousel */}
        {carouselImages.length > 0 ? (
          <div className="relative w-full md:w-[420px] h-[250px] sm:h-[300px] md:h-[300px] flex-shrink-0 rounded-[10px] border-2 border-transparent hover:border-[#0066FF] transition-all duration-200 overflow-hidden mx-auto md:mx-0">
            <img
              src={carouselImages[currentImage]}
              alt={displayName}
              className="w-full h-full object-cover transition-all duration-500 rounded-[10px]"
            />

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
              }}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-2xl z-20 transition-all cursor-pointer border border-gray-200"
              type="button"
              aria-label="Previous image"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) =>
                  prev === carouselImages.length - 1 ? 0 : prev + 1
                );
              }}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-2xl z-20 transition-all cursor-pointer border border-gray-200"
              type="button"
              aria-label="Next image"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`h-2 rounded-full transition-all ${idx === currentImage ? "bg-[#0066FF] w-6" : "bg-gray-700 w-2"
                    }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-[10px]">
            <span className="text-gray-400 text-lg">No Image Available</span>
          </div>
        )}

        {/* Vehicle Details */}
        <div className="flex flex-col ml-0 md:ml-6 mt-4 sm:mt-6 md:mt-0 flex-1">
          <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#000000] leading-tight cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            {displayName}
          </h1>

          <div className="flex items-baseline mt-2 cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2">
            <span className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>₹{displayPrice}</span>
            <span className="text-gray-500 ml-2 text-sm">{priceUnit}</span>
          </div>

          {/* Vehicle Features */}
          <div className="flex items-center mt-4 border border-gray-300 rounded-xl overflow-hidden cursor-pointer hover:border-[#0066FF] hover:border-2">
            {isCar ? (
              <>
                <div className="flex-1 flex flex-col items-center justify-center py-2 sm:py-3 px-2 sm:px-4">
                  <img src={AutomaticLogo} className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-1.5" alt="transmission" />
                  <span className="text-[11px] sm:text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>{vehicleData.transmissionType || "Manual"}</span>
                </div>
                <div className="w-[1px] h-10 sm:h-12 bg-[#E5E5E5]"></div>
                <div className="flex-1 flex flex-col items-center justify-center py-2 sm:py-3 px-2 sm:px-4">
                  <img src={seats} className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-1.5" alt="seats" />
                  <span className="text-[11px] sm:text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>{vehicleData.Carseater || "5"} Seats</span>
                </div>
                <div className="w-[1px] h-10 sm:h-12 bg-[#E5E5E5]"></div>
                <div className="flex-1 flex flex-col items-center justify-center py-2 sm:py-3 px-2 sm:px-4">
                  <img src={Petrol} className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-1.5" alt="fuel" />
                  <span className="text-[11px] sm:text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>{vehicleData.fuelType || "Petrol"}</span>
                </div>
                <div className="w-[1px] h-10 sm:h-12 bg-[#E5E5E5]"></div>
                <div className="flex-1 flex flex-col items-center justify-center py-2 sm:py-3 px-2 sm:px-4">
                  <img src={AClogo} className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-1.5" alt="ac" />
                  <span className="text-[11px] sm:text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>{vehicleData.Ac_available ? "AC" : "Non-AC"}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                  <img src={BikeCC} className="w-6 h-6 mb-1.5" alt="engine" />
                  <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {vehicleData.engineCapacity || vehicleData.bikeEngine || vehicleData.bikeCC || "350"} CC
                  </span>
                </div>
                <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                  <img src={AutomaticLogo} className="w-6 h-6 mb-1.5" alt="transmission" />
                  <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {vehicleData.transmissionType || "Manual"}
                  </span>
                </div>
                <div className="w-[1px] h-10 sm:h-12 bg-[#E5E5E5]"></div>
                <div className="flex-1 flex flex-col items-center justify-center py-2 sm:py-3 px-2 sm:px-4">
                  <img src={Petrol} className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-1.5" alt="fuel" />
                  <span className="text-[11px] sm:text-[13px] text-[#333333] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Petrol</span>
                </div>
                <div className="w-[1px] h-10 sm:h-12 bg-[#E5E5E5]"></div>
                <div className="flex flex-col items-center px-3 sm:px-4 py-2 sm:py-3">
                  <img src={Location} className="w-6 h-6 mb-1.5" alt="location" />
                  <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {vehicleData.pickupCity || vehicleData.pickupArea || "N/A"}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Description Card */}
          <div className="border border-[#E5E5E5] rounded-[10px] p-3 sm:p-4 bg-white mb-3 sm:mb-4 mt-3 sm:mt-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200 w-full max-w-full">
            <h2 className="text-[16px] sm:text-[18px] font-bold text-[#000000] mb-2 cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Description</h2>
            <p className="text-[#666666] text-[13px] sm:text-[14px] leading-[1.6] min-h-[40px] break-words whitespace-normal overflow-hidden" style={{ fontFamily: 'Inter, sans-serif', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              {vehicleData.description || "No description available"}
            </p>
          </div>

          {/* Status indicator when not confirmed */}
          {!isConfirmed && passedBooking?.status && (
            <div className="mb-3 sm:mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
              <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-700">
                Chat and Call are available only for <span className="font-semibold">Confirmed</span> bookings.
                Current status: <span className="font-semibold">{passedBooking.status === "AutoCancelled" ? "Auto Cancelled" : passedBooking.status}</span>
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 sm:gap-4 h-[50px] sm:h-[56px]">
            <button
              onClick={handleChatClick}
              disabled={!isConfirmed}
              className={isConfirmed ? enabledButtonClass : disabledButtonClass}
              style={{ fontFamily: 'Inter, sans-serif' }}
              title={!isConfirmed ? "Chat is available only for confirmed bookings" : ""}
            >
              <MessageCircle size={20} className="sm:w-6 sm:h-6" strokeWidth={2} />
              <span>Chat</span>
            </button>
{/* 
            <button
              onClick={handleConfirmBooking}
              disabled={!isConfirmed}
              className={isConfirmed ? enabledButtonClass : disabledButtonClass}
              style={{ fontFamily: 'Inter, sans-serif' }}
              title={!isConfirmed ? "Call is available only for confirmed bookings" : ""}
            >
              <Phone size={20} className="sm:w-6 sm:h-6" strokeWidth={2} />
              <span>Call</span>
            </button> */}
          </div>

          <PopupChat
            isOpen={isChatOpen}
            onClose={() => {
              console.log("❌ Closing chat...");
              setIsChatOpen(false);
            }}

            // ✅ Customer View
            pageRole="customerView"

            // ✅ Current user (customer)
            currentUserId={currentUserId}
            currentUserName={localStorage.getItem('userName') || 'You'}

            // ✅ Owner info (from vehicle data)
            ownerId={vehicleOwnerId}
            ownerName={vehicleData.contactName || "Vehicle Owner"}
            ownerAvatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${vehicleData.contactName || "Owner"}`}

            // ✅ Customer info (current user)
            customerId={currentUserId}
            customerName={localStorage.getItem('userName') || 'You'}
            customerAvatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${localStorage.getItem('userName') || 'You'}`}

            // ✅ Booking ID
            bookingId={chatBookingId}

            // ✅ Vehicle ID
            vehicleId={vehicleData._id}

            // ✅ API URL
            apiUrl={apiService.chat.apiUrl}
            socketUrl={SOCKET_URL}

            // ✅ Real-time enabled
            useRealtime={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;