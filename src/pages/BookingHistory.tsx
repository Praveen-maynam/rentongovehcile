








import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PopupChat from "../components/ui/PopupChat";
import apiService from "../services/api.service";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import Petrol from "../assets/icons/Petrol.png";
import Location from "../assets/icons/Location.png";
import seats from "../assets/icons/seats.jpeg";
import AClogo from "../assets/icons/ac.png";
import { Loader2 } from "lucide-react";

interface VehicleData {
  _id: string;
  userId?: string;
  ownerId?: string;
  vehicleType?: string;
  
  // Car fields
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

  // Bike fields
  bikeName?: string;
  bikeModel?: string;
  bikeNumber?: string;
  pricePerKm?: number;
  bikeImages?: string[];
  bikeCC?: string;

  // Common fields
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

  // Auto-open chat if coming from booking history
  useEffect(() => {
    if (openContact && passedBooking) {
      setIsChatOpen(true);
    }
  }, [openContact, passedBooking]);

  // Load vehicle data
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
    if (vehicleData?.contactNumber) {
      window.location.href = `tel:${vehicleData.contactNumber}`;
    } else {
      alert("Contact number not available");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
      
  // Determine if car or bike
  const isCar = vehicleType === "car" || !!vehicleData.CarName || !!vehicleData.carName || !!vehicleData.carImages;
  
  // Get vehicle images
  let vehicleImages = (isCar ? vehicleData.carImages : vehicleData.bikeImages) || [];
  vehicleImages = vehicleImages.filter((img) => img && img.trim() !== "" && img !== "undefined");

  const carDummyImages = [
    "https://e7.pngegg.com/pngimages/768/421/png-clipart-car-computer-icons-sedan-auto-detailing-auto-driving-rectangle-thumbnail.png",
    "https://e7.pngegg.com/pngimages/768/421/png-clipart-car-computer-icons-sedan-auto-detailing-auto-driving-rectangle-thumbnail.png"
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

console.log("📋 ========= CHAT IDS DEBUG =========");
console.log("👤 Current User ID:", currentUserId);
console.log("🏢 Vehicle Owner ID:", vehicleOwnerId);
console.log("👥 Customer ID:", bookingCustomerId);
console.log("💬 Booking ID:", chatBookingId);
console.log("🚗 Vehicle ID:", vehicleData._id);
console.log("====================================");

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center">
      <div className="max-w-[900px] w-full bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row">
        {/* Vehicle Image Carousel */}
        <div className="relative w-full md:w-[409px] h-[309px] overflow-hidden rounded-xl shadow-md flex-shrink-0">
          {vehicleImages.length > 0 ? (
            <>
              <img
                src={vehicleImages[currentImage]}
                alt={`${displayName} ${currentImage + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {vehicleImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentImage ? "bg-white scale-110" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-lg">No Image Available</span>
            </div>
          )}
        </div>

        {/* Vehicle Details */}
        <div className="flex flex-col ml-0 md:ml-6 mt-6 md:mt-0 flex-1">
          <h1 
            className="text-[32px] font-bold text-[#000000] leading-tight cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            {displayName}
          </h1>

          <div className="flex items-baseline mt-2 cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2">
            <span className="text-[32px] font-bold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              ₹{displayPrice}
            </span>
            <span className="text-gray-500 ml-2 text-sm">{priceUnit}</span>
          </div>

          {/* Vehicle Features */}
          <div className="flex items-center mt-4 border border-gray-300 rounded-xl overflow-hidden cursor-pointer hover:border-[#0066FF] hover:border-2">
            {isCar ? (
              <>
                <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                  <img src={AutomaticLogo} className="w-6 h-6 mb-1.5" alt="transmission" />
                  <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {vehicleData.transmissionType || "Manual"}
                  </span>
                </div>
                <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                
                <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                  <img src={seats} className="w-6 h-6 mb-1.5" alt="seats" />
                  <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {vehicleData.Carseater || "5"} Seaters
                  </span>
                </div>
                <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                
                <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                  <img src={Petrol} className="w-6 h-6 mb-1.5" alt="fuel" />
                  <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {vehicleData.fuelType || "Petrol"}
                  </span>
                </div>
                <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                
                <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                  <img src={AClogo} className="w-6 h-6 mb-1.5" alt="ac" />
                  <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {vehicleData.Ac_available ? "AC" : "Non-AC"}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  🏍️ <p className="text-sm text-gray-700">Bike</p>
                </div>
                <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                  <img src={Petrol} className="w-6 h-6 mb-1.5" alt="fuel" />
                  <span className="text-[13px] text-[#333333] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Petrol</span>
                </div>
                <div className="flex flex-col items-center px-4 py-3">
                  📍 <p className="text-sm text-gray-700">{vehicleData.pickupCity || "N/A"}</p>
                </div>
              </>
            )}
          </div>

          {/* Description Card */}
          <div className="border border-[#E5E5E5] rounded-[10px] p-4 bg-white mb-4 mt-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200 w-full max-w-full">
            <h2 className="text-[18px] font-bold text-[#000000] mb-2 cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Description
            </h2>
            <p className="text-[#666666] text-[14px] leading-[1.6] min-h-[40px] break-words whitespace-normal overflow-hidden" style={{ fontFamily: 'Inter, sans-serif', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              {vehicleData.description || "No description available"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                console.log("💬 Opening chat...");
                setIsChatOpen(true);
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
            >
              💬 Chat
            </button>

            <button
              onClick={handleConfirmBooking}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
            >
              📞 Call
            </button>
          </div>


<PopupChat
  isOpen={isChatOpen}
  onClose={() => {
    console.log("❌ Closing chat...");
    setIsChatOpen(false);
  }}
  
  // ✅ CRITICAL: Customer View (user is viewing vehicle details and chatting with owner)
  pageRole="customerView"
  
  // ✅ Current user (customer viewing the vehicle)
  currentUserId={currentUserId}
  currentUserName={localStorage.getItem('userName') || 'You'}
  
  // ✅ Owner info (vehicle owner)
  ownerId={vehicleOwnerId}
  ownerName={vehicleData.contactName || "Vehicle Owner"}
  ownerAvatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${vehicleData.contactName || "Owner"}`}
  
  // ✅ Customer info (current user)
  customerId={currentUserId}
  customerName={localStorage.getItem('userName') || 'You'}
  customerAvatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${localStorage.getItem('userName') || 'You'}`}
  
 
  bookingId={chatBookingId}

  vehicleId={vehicleData._id}
  
  // ✅ API URL
  apiUrl="http://3.110.122.127:3000"
  
  // ✅ Real-time enabled
  useRealtime={true}
/>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
