import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Loader2, MessageCircle, Phone } from "lucide-react";
import apiService from "../services/api.service";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import Petrol from "../assets/icons/Petrol.png";
import Location from "../assets/icons/Location.png";
import seats from "../assets/icons/seats.jpeg";
import AClogo from "../assets/icons/ac.png";
import BikeCC from "../assets/icons/BikeCC.png";
import PopupChat from "../components/ui/PopupChat";

type BookingStatus = "Booked" | "Picked" | "Completed" | "Pending" | "Cancelled" | "Confirmed" | "AutoCancelled";

interface BookingHistory {
  _id?: string;
  customerName?: string;
  contactName?: string;
  startDate?: string;
  FromDate?: string;
  startTime?: string;
  FromTime?: string;
  endDate?: string;
  ToDate?: string;
  endTime?: string;
  ToTime?: string;
  mobile?: string;
  contactNumber?: string;
  status?: BookingStatus;
  userId?: string;
  VechileId?: string;
  totalPrice?: number;
}

interface VehicleData {
  _id: string;
  userId?: string;
  CarName?: string;
  CarModel?: string;
  CarNumber?: string;
  Carseater?: string;
  RentPerHour?: number;
  RentPerDay?: number;
  carImages?: string[];
  fuelType?: string;
  transmissionType?: string;
  Ac_available?: boolean;
  bikeName?: string;
  bikeModel?: string;
  bikeNumber?: string;
  pricePerKm?: number;
  bikeImages?: string[];
  bikeEngine?: string;
  bikeCC?: string;
  engineCapacity?: string;
  transmission?: string;
  Transmission?: string;
  fuel?: string;
  Fuel?: string;
  description?: string;
  contactName?: string;
  contactNumber?: string;
  Available?: boolean;
  pickupCity?: string;
  pickupCityState?: string;
  pickupArea?: string;
  bookings?: BookingHistory[];
}

const VehicleHistory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicleId } = useParams<{ vehicleId: string }>();

  // 🔥 ADDED: Prevent duplicate API calls
  const hasFetchedVehicle = useRef(false);
  const hasFetchedBookings = useRef(false);

  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [bookingHistory, setBookingHistory] = useState<BookingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingHistory | null>(null);

  const passedVehicleData = location.state?.vehicleData;
  const passedVehicleType = location.state?.vehicleType;

  const vehicleType = 
    passedVehicleType || 
    (passedVehicleData?.CarName || passedVehicleData?.carImages ? "car" : "bike");

  const finalVehicleId = vehicleId || passedVehicleData?._id || passedVehicleData?.id;
  const currentUserId = localStorage.getItem('userId') || '';

  const getStatusBadgeStyle = (status?: BookingStatus) => {
    switch (status) {
      case "Completed":
        return "bg-[#E8F5E9] text-[#2E7D32]";
      case "Picked":
      case "Confirmed":
        return "bg-[#E3F2FD] text-[#1565C0]";
      case "Booked":
      case "Pending":
        return "bg-[#FFF3E0] text-[#E65100]";
      case "Cancelled":
      case "AutoCancelled":
        return "bg-[#FFEBEE] text-[#C62828]";
      default:
        return "bg-[#F5F5F5] text-[#666666]";
    }
  };

  // Show Chat and Call buttons only for Confirmed status
  const shouldShowActions = (status?: BookingStatus) => {
    return status === "Confirmed";
  };

  // 🔥 MODIFIED: Added useRef to prevent duplicate vehicle API calls
  useEffect(() => {
    if (!finalVehicleId) {
      setError("No vehicle ID provided");
      setLoading(false);
      return;
    }

    // 🔥 CHECK: Only fetch once
    if (hasFetchedVehicle.current) {
      console.log("⚠️ Already fetched vehicle details, skipping...");
      return;
    }

    const fetchVehicleDetails = async () => {
      try {
        // 🔥 MARK as fetched at the start
        hasFetchedVehicle.current = true;
        
        setLoading(true);
        console.log(`📡 Fetching ${vehicleType} details for ID:`, finalVehicleId);

        const response =
          vehicleType === "car"
            ? await apiService.car.getCarById(finalVehicleId)
            : await apiService.bike.getBikeById(finalVehicleId);

        const payload = response?.data ?? response;
        const vehicle =
          payload?.car ||
          payload?.bike ||
          payload?.data ||
          payload?.vehicle ||
          payload;

        if (!vehicle || typeof vehicle !== "object") {
          throw new Error("Invalid vehicle response format");
        }

        console.log("✅ Vehicle fetched successfully:", vehicle);
        setVehicleData(vehicle);
        setError("");
      } catch (err: any) {
        console.error("❌ Error fetching vehicle details:", err);
        // 🔥 RESET flag on error so user can retry
        hasFetchedVehicle.current = false;
        const errorMessage = err?.response?.data?.message || err?.message || "Failed to load vehicle details";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [finalVehicleId, vehicleType]);

  // 🔥 MODIFIED: Added useRef to prevent duplicate booking API calls
  useEffect(() => {
    if (!finalVehicleId || !vehicleData) {
      setBookingLoading(false);
      return;
    }

    // 🔥 CHECK: Only fetch once
    if (hasFetchedBookings.current) {
      console.log("⚠️ Already fetched booking history, skipping...");
      setBookingLoading(false);
      return;
    }

    const fetchBookingHistory = async () => {
      try {
        // 🔥 MARK as fetched at the start
        hasFetchedBookings.current = true;
        
        setBookingLoading(true);
        console.log(`📡 Fetching bookings for vehicle ID: ${finalVehicleId}`);

        const ownerId = vehicleData.userId;
        
        if (!ownerId) {
          console.warn("⚠️ No userId found in vehicle data, cannot fetch bookings");
          setBookingHistory([]);
          setBookingLoading(false);
          return;
        }

        const vehicleTypeParam = vehicleType === "car" ? "Car" : "Bike";
        const apiUrl = `http://3.110.122.127:3000/myVehicleBookings/${ownerId}?vechileType=${vehicleTypeParam}&VechileId=${finalVehicleId}`;
        
        console.log(`🔗 API URL: ${apiUrl}`);

        const requestOptions: RequestInit = {
          method: "GET",
          redirect: "follow"
        };

        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("📦 Raw booking response:", data);

        let vehicleBookings: any[] = [];
        
        if (data?.data) {
          const vehicleArray = data.data.car || data.data.bike || [];
          const matchingVehicle = vehicleArray.find((v: any) => v._id === finalVehicleId);
          
          if (matchingVehicle && matchingVehicle.bookings) {
            vehicleBookings = matchingVehicle.bookings;
          }
        }

        console.log("✅ Extracted vehicle bookings:", vehicleBookings);

        const transformedBookings = vehicleBookings.map((booking: any) => ({
          _id: booking._id,
          customerName: booking.contactName || booking.customerName || "Unknown Customer",
          contactName: booking.contactName,
          startDate: booking.FromDate ? new Date(booking.FromDate).toLocaleDateString('en-GB') : booking.startDate,
          FromDate: booking.FromDate,
          startTime: booking.FromTime?.replace('.', ':') || booking.startTime || "N/A",
          FromTime: booking.FromTime,
          endDate: booking.ToDate ? new Date(booking.ToDate).toLocaleDateString('en-GB') : booking.endDate,
          ToDate: booking.ToDate,
          endTime: booking.ToTime?.replace('.', ':') || booking.endTime || "N/A",
          ToTime: booking.ToTime,
          mobile: booking.contactNumber || booking.mobile || "N/A",
          contactNumber: booking.contactNumber,
          status: booking.status as BookingStatus,
          userId: booking.userId,
          VechileId: booking.VechileId,
          totalPrice: booking.totalPrice,
        }));

        console.log("📋 Transformed bookings with statuses:", 
          transformedBookings.map((b: BookingHistory) => ({ id: b._id, status: b.status }))
        );

        setBookingHistory(transformedBookings);
        setBookingError("");
      } catch (err: any) {
        console.error("❌ Error fetching booking history:", err);
        // 🔥 RESET flag on error so user can retry
        hasFetchedBookings.current = false;
        const errorMessage = err?.message || "Failed to load booking history";
        setBookingError(errorMessage);
        setBookingHistory([]);
      } finally {
        setBookingLoading(false);
      }
    };

    fetchBookingHistory();
  }, [finalVehicleId, vehicleData, vehicleType]);

  const handleBookingClick = (booking: BookingHistory) => {
    navigate(`/booking-details/${booking._id}`, {
      state: { booking, vehicleData },
    });
  };
 // 1️⃣ UPDATE: Handle opening chat for a specific booking


  // 1️⃣ UPDATE: Handle opening chat for a specific booking
const handleChatClick = (booking: BookingHistory, e: React.MouseEvent) => {
  e.stopPropagation(); // Prevent triggering the booking click
  
  console.log("💬 ========= OPENING CHAT =========");
  console.log("📋 Booking ID:", booking._id);
  console.log("👤 Owner ID (ME - from vehicleData):", vehicleData?.userId);
  console.log("👥 Customer ID (THEM - from booking):", booking.userId);
  console.log("📞 Customer Name:", booking.customerName || booking.contactName);
  console.log("📞 Customer Mobile:", booking.mobile || booking.contactNumber);
  console.log("=====================================");
  
  // ⚠️ VALIDATION: Check if we have all required IDs
  if (!vehicleData?.userId) {
    console.error("❌ ERROR: Vehicle owner ID is missing!");
    alert("Error: Unable to start chat. Vehicle owner information is missing.");
    return;
  }
  
  if (!booking.userId) {
    console.error("❌ ERROR: Customer ID is missing from booking!");
    alert("Error: Unable to start chat. Customer information is missing.");
    return;
  }
  
  if (!booking._id) {
    console.error("❌ ERROR: Booking ID is missing!");
    alert("Error: Unable to start chat. Booking information is missing.");
    return;
  }
  
  setSelectedBooking(booking);
  setIsChatOpen(true);
};
  const handleCallClick = (booking: BookingHistory, e: React.MouseEvent) => {
    e.stopPropagation();
    const phoneNumber = booking.mobile || booking.contactNumber;
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  const formatPhoneNumber = (phone: string | undefined): string => {
    if (!phone) return "N/A";
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length >= 3) {
      const visibleDigits = cleaned.slice(-3);
      const maskedCount = cleaned.length - 3;
      return 'X'.repeat(maskedCount) + visibleDigits;
    }
    return phone;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicleData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-red-600 text-lg mb-4">{error || "Vehicle not found"}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const isCar = !!vehicleData.CarName || !!vehicleData.carImages || vehicleType === "car";

  let vehicleImages = (isCar ? vehicleData.carImages : vehicleData.bikeImages) || [];
  vehicleImages = vehicleImages.filter((img) => img && img.trim() !== "" && img !== "undefined");

  const carDummyImages = [
    "https://e7.pngegg.com/pngimages/768/421/png-clipart-car-computer-icons-sedan-auto-detailing-auto-driving-rectangle-thumbnail.png",
   "https://png.pngtree.com/png-vector/20191201/ourmid/pngtree-car-vector-logo-design-png-image_2066853.jpg"
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
    ? `${vehicleData.CarName || "Unknown"} ${vehicleData.CarModel || ""}`.trim()
    : `${vehicleData.bikeName || "Unknown"} ${vehicleData.bikeModel || ""}`.trim();

  const displayPrice = isCar
    ? vehicleData.RentPerHour || 0
    : vehicleData.pricePerKm || 0;

  return (
    <div className="min-h-screen bg-white px-3 sm:px-6 py-4 sm:py-10">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* LEFT SECTION - Main Content */}
        <div className="flex-1 bg-white">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Image Card */}
            <div className="relative w-full md:w-[420px] h-[250px] sm:h-[300px] flex-shrink-0 rounded-[10px] border-2 border-transparent hover:border-[#0066FF] transition-all duration-200">
              <img
                src={carouselImages[currentImageIndex]}
                alt={displayName}
                className="w-full h-full object-cover transition-all duration-500 rounded-[10px]"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-2xl z-20 transition-all cursor-pointer border border-gray-200"
                type="button"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6 text-gray-800 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-2xl z-20 transition-all cursor-pointer border border-gray-200"
                type="button"
                aria-label="Next image"
              >
                <svg className="w-6 h-6 text-gray-800 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentImageIndex 
                        ? "bg-[#0066FF] w-6" 
                        : "bg-gray-700 w-2" 
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-1">
                <div className="flex-1 min-w-0">
                  <h1 
                    className="text-[24px] sm:text-[28px] md:text-[32px]  font-bold text-[#000000] leading-tight cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                  >
                    {displayName}
                  </h1>
                </div>
              </div>

              <div className="flex items-baseline gap-1 mb-3 w-fit cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all">
                <span className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  ₹{displayPrice}
                </span>
                <span className="text-base text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  /{isCar ? 'hr' : 'km'}
                </span>
              </div>

              {/* Specs Card */}
              <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden bg-white mb-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200">
                <div className="flex flex-wrap items-center gap-0">
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
                          {vehicleData.transmission || vehicleData.Transmission || "Manual"}
                        </span>
                      </div>
                      
                      <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                        <img src={Petrol} className="w-6 h-6 mb-1.5" alt="fuel" />
                        <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {vehicleData.fuel || vehicleData.Fuel || "Petrol"}
                        </span>
                      </div>
                      
                      <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                        <img src={Location} className="w-6 h-6 mb-1.5" alt="location" />
                        <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {vehicleData.pickupCity || vehicleData.pickupArea || "N/A"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Description Card */}
              <div className="border border-[#E5E5E5] rounded-[10px] p-4 bg-white mb-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200 w-full max-w-full">
                <h2 className="text-[18px] font-bold text-[#000000] mb-2 cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  Description
                </h2>
                <p className="text-[#666666] text-[14px] leading-[1.6] min-h-[40px] break-words whitespace-normal overflow-hidden" style={{ fontFamily: 'Inter, sans-serif', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  {vehicleData.description || "No description available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - Booking History Sidebar */}
        <aside className="w-full lg:w-[380px]">
          <div className="sticky top-6 bg-white p-6 rounded-[12px] shadow-lg border border-[#E5E5E5]">
            <h2 className="text-[20px] font-semibold text-[#000000] mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Booking History
            </h2>

            {bookingLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Loading bookings...</p>
              </div>
            ) : bookingError ? (
              <div className="text-center py-8 px-4 bg-[#FFF5F5] rounded-[8px] border border-[#FEE]">
                <p className="text-[14px] text-[#DC2626] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{bookingError}</p>
                <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Unable to load booking history</p>
              </div>
            ) : bookingHistory.length === 0 ? (
              <div className="text-center py-8 px-4 bg-[#F8F9FA] rounded-[8px] border border-[#E5E5E5]">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-[16px] font-medium text-[#333333] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>No bookings yet</p>
                <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>This vehicle hasn't been booked</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E5E5 transparent' }}>
                {bookingHistory.map((booking, idx) => (
                  <div
                    key={booking._id || idx}
                    onClick={() => handleBookingClick(booking)}
                    className="border border-[#E0E0E0] rounded-[8px] p-4 cursor-pointer rounded-[10px] overflow-hidden border-2 border-transparent hover:border-[#0066FF] transition-all duration-200 cursor-pointer bg-white"
                  >
                    {/* Header with Name */}
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#666666"/>
                            <path d="M8 9C5.33333 9 2 10.3333 2 13V14H14V13C14 10.3333 10.6667 9 8 9Z" fill="#666666"/>
                          </svg>
                        </div>
                        <h3 className="text-[15px] font-semibold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                          {booking.customerName || booking.contactName}
                        </h3>
                      </div>
                    </div>

                    {/* Date and Time Section */}
                    <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
                      {/* From Date and Time */}
                      <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12px]">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                          <path d="M11 2H10V1H9V2H5V1H4V2H3C2.45 2 2 2.45 2 3V12C2 12.55 2.45 13 3 13H11C11.55 13 12 12.55 12 12V3C12 2.45 11.55 2 11 2ZM11 12H3V5H11V12Z" fill="#666666"/>
                        </svg>
                        <span className="text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>From:</span>
                        <span className="text-[#000000] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{booking.startDate} {booking.startTime}</span>
                      </div>
                      
                      {/* To Date and Time */}
                      <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12px]">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                          <path d="M11 2H10V1H9V2H5V1H4V2H3C2.45 2 2 2.45 2 3V12C2 12.55 2.45 13 3 13H11C11.55 13 12 12.55 12 12V3C12 2.45 11.55 2 11 2ZM11 12H3V5H11V12Z" fill="#666666"/>
                        </svg>
                        <span className="text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>To:</span>
                        <span className="text-[#000000] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{booking.endDate} {booking.endTime}</span>
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 text-[11px] sm:text-[12px]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                        <path d="M11.5 9.5C11 9.5 10.5 9.4 10.1 9.2C10 9.1 9.9 9.1 9.7 9.1C9.5 9.1 9.3 9.2 9.2 9.3L8.4 10.4C6.9 9.7 4.3 7.2 3.5 5.6L4.6 4.7C4.8 4.5 4.9 4.2 4.8 3.9C4.6 3.5 4.5 3 4.5 2.5C4.5 2.2 4.3 2 4 2H2.5C2.2 2 2 2.2 2 2.5C2 7.7 6.3 12 11.5 12C11.8 12 12 11.8 12 11.5V10C12 9.7 11.8 9.5 11.5 9.5Z" fill="#666666"/>
                      </svg>
                      <span className="text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Mobile:</span>
                      <span className="text-[#000000] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {formatPhoneNumber(booking.mobile || booking.contactNumber)}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                      <span className="text-[12px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Status:</span>
                      <span 
                        className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-medium ${
                          booking.status === "Completed"
                            ? "bg-[#E8F5E9] text-[#2E7D32]"
                            : booking.status === "Picked"
                            ? "bg-[#E3F2FD] text-[#1565C0]"
                            : booking.status === "Confirmed"
                            ? "bg-[#E3F2FD] text-[#1565C0]"
                            : booking.status === "Booked"
                            ? "bg-[#E8F5E9] text-[#2E7D32]"
                            : booking.status === "Cancelled"
                            ? "bg-[#FFEBEE] text-[#C62828]"
                            : "bg-[#FFF3E0] text-[#E65100]"
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {booking.status}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    {booking.status === "Confirmed" && (
                      <div className="flex gap-2 h-[36px] sm:h-[38px]">
                        {/* Chat Button */}
                        <button
                          onClick={(e) => handleChatClick(booking, e)}
                          className="flex-1 flex items-center justify-center gap-2 
                            text-white font-semibold text-[15px] 
                            transition-all duration-200 hover:opacity-90 
                            rounded-full
                            bg-gradient-to-r from-[#0A0747] to-[#4EC8FF]"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <MessageCircle size={20} strokeWidth={2} />
                          <span>Chat</span>
                        </button>
                        
                        {/* Call Button */}
                        <button
                          onClick={(e) => handleCallClick(booking, e)}
                          className="flex-1 flex items-center justify-center gap-2 
                            text-white font-semibold text-[15px] 
                            transition-all duration-200 hover:opacity-90 
                            rounded-full
                            bg-gradient-to-r from-[#0A0747] to-[#4EC8FF]"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Phone size={20} strokeWidth={2} />
                          <span>Call</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>

    
      {isChatOpen && selectedBooking && vehicleData && (
  <PopupChat
    isOpen={isChatOpen}
    onClose={() => {
      setIsChatOpen(false);
      setSelectedBooking(null);
    }}
    
    // ✅ Owner View
    pageRole="ownerView"
    
    // ✅ Current user (owner)
    currentUserId={vehicleData.userId || currentUserId}
    currentUserName={vehicleData.contactName}
    
    // ✅ Owner info (same as current user in this case)
    ownerId={vehicleData.userId || currentUserId}
    ownerName={vehicleData.contactName || 'Owner'}
    ownerAvatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${vehicleData.contactName || 'Owner'}`}
    
    // ✅ Customer info (from booking)
    customerId={selectedBooking.userId || ''}
    customerName={selectedBooking.customerName || selectedBooking.contactName || 'Customer'}
    customerAvatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedBooking.customerName || 'Customer'}`}
    
    // ✅ Booking ID
    bookingId={selectedBooking._id || ''}
    
    // // ✅ Vehicle ID (optional)
    // vehicleId={finalVehicleId}
      vehicleId={selectedBooking._id||''}
    // ✅ Your backend API URL
    apiUrl="http://3.110.122.127:3000"
    
    // ✅ Enable real-time chat
    useRealtime={true}
  />
      )}
    </div>
  );
};

export default VehicleHistory;