import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import apiService from "../services/api.service";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import Petrol from "../assets/icons/Petrol.png";
import Location from "../assets/icons/Location.png";
import seats from "../assets/icons/seats.jpeg";
import AClogo from "../assets/icons/ac.png";
import BikeCC from "../assets/icons/BikeCC.png"; // ✅ Added missing import

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
  status?: "Booked" | "Picked" | "Completed" | "Pending" | "Cancelled";
  userId?: string;
  VechileId?: string;
  totalPrice?: number;
}

interface VehicleData {
  _id: string;
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
  bikeEngine?: string; // ✅ Added for bike engine capacity
  bikeCC?: string; // ✅ Alternative field name
  engineCapacity?: string; // ✅ Added missing field
  transmission?: string; // ✅ Added for bike transmission
  Transmission?: string; // ✅ Alternative field name
  fuel?: string; // ✅ Added for bike fuel
  Fuel?: string; // ✅ Alternative field name
  description?: string;
  contactName?: string;
  contactNumber?: string;
  Available?: boolean;
  pickupCity?: string;
  pickupCityState?: string;
  pickupArea?: string;
}

const VehicleHistory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicleId } = useParams<{ vehicleId: string }>();

  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [bookingHistory, setBookingHistory] = useState<BookingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const passedVehicleData = location.state?.vehicleData;
  const passedVehicleType = location.state?.vehicleType;

  const vehicleType = 
    passedVehicleType || 
    (passedVehicleData?.CarName || passedVehicleData?.carImages ? "car" : "bike");

  const finalVehicleId = vehicleId || passedVehicleData?._id || passedVehicleData?.id;

  useEffect(() => {
    if (!finalVehicleId) {
      setError("No vehicle ID provided");
      setLoading(false);
      return;
    }

    const fetchVehicleDetails = async () => {
      try {
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
        const errorMessage = err?.response?.data?.message || err?.message || "Failed to load vehicle details";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [finalVehicleId, vehicleType]);

  useEffect(() => {
    if (!finalVehicleId || !vehicleData) {
      setBookingLoading(false);
      return;
    }

    const fetchBookingHistory = async () => {
      try {
        setBookingLoading(true);
        console.log(`📡 Fetching all bookings to filter for vehicle ID:`, finalVehicleId);

        const ownerId = localStorage.getItem('userId') || vehicleData.contactNumber;
        
        if (!ownerId) {
          console.warn("⚠️ No owner ID found, cannot fetch bookings");
          setBookingHistory([]);
          setBookingLoading(false);
          return;
        }

        const response = await apiService.booking.getAllBookings(ownerId);
        
        console.log("📦 Raw booking response:", response);

        const payload = response?.data ?? response;
        let allBookings = payload?.bookings || payload?.data || payload || [];
        
        if (!Array.isArray(allBookings)) {
          allBookings = [];
        }

        console.log("📋 All bookings:", allBookings);

        const vehicleBookings = allBookings.filter((booking: any) => {
          const bookingVehicleId = booking.VechileId || booking.vehicleId || booking.VehicleId;
          return bookingVehicleId === finalVehicleId;
        });

        console.log("✅ Filtered bookings for this vehicle:", vehicleBookings);

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
          status: booking.status === "Pending" ? "Booked" : (booking.status || "Booked") as any,
          userId: booking.userId,
          VechileId: booking.VechileId,
          totalPrice: booking.totalPrice,
        }));

        setBookingHistory(transformedBookings);
        setBookingError("");
      } catch (err: any) {
        console.error("❌ Error fetching booking history:", err);
        const errorMessage = err?.response?.data?.message || err?.message || "Failed to load booking history";
        setBookingError(errorMessage);
        setBookingHistory([]);
      } finally {
        setBookingLoading(false);
      }
    };

    fetchBookingHistory();
  }, [finalVehicleId, vehicleData]);

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
    "https://rukminim2.flixcart.com/image/480/480/jvtujrk0/vehicle-pull-along/r/j/f/dummy-miniature-car-toy-golden-feather-original-imafe8rh66whjcgv.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/480/480/jvtujrk0/vehicle-pull-along/7/t/u/dummy-car-miniature-toy-golden-feather-original-imafe9s8wtk5g8hj.jpeg?q=90"
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

  const handleBookingClick = (booking: BookingHistory) => {
    navigate(`/booking-details/${booking._id}`, {
      state: { booking, vehicleData },
    });
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* LEFT SECTION - Main Content */}
        <div className="flex-1 bg-white">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Image Card */}
            <div className="relative w-300px md:w-[420px] h-[300px] flex-shrink-0 cursor-pointer rounded-[10px] overflow-hidden border-2 border-transparent hover:border-[#0066FF] transition-all duration-200">
              <img
                src={carouselImages[currentImageIndex]}
                alt={displayName}
                className="w-full h-full object-cover transition-all duration-500"
              />

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentImageIndex 
                        ? "bg-[#0066FF] w-6" 
                        : "bg-white/60 w-2"
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
                    className="text-[32px] font-bold text-[#000000] leading-tight cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                  >
                    {displayName}
                  </h1>
                </div>
                <div className="bg-[#FFF9E6] px-2.5 py-1 rounded-md flex items-center gap-1 flex-shrink-0">
                  <span className="text-[#FFB800] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>★</span>
                  <span className="text-sm font-semibold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif' }}>4.2</span>
                </div>
              </div>

              <div className="flex items-baseline gap-1 mb-3 w-fit cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all">
                <span className="text-[32px] font-bold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  ₹{displayPrice}
                </span>
                <span className="text-base text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  /{isCar ? 'hr' : 'km'}
                </span>
              </div>

              {/* Specs Card */}
              <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden bg-white mb-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200">
                <div className="flex items-center gap-0">
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
                      {/* ✅ FIXED: Bike specifications with proper variable names */}
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
        <aside className="md:w-[380px]">
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
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E5E5 transparent' }}>
                {bookingHistory.map((booking, idx) => (
                  <div
                    key={booking._id || idx}
                    onClick={() => handleBookingClick(booking)}
                    className="border border-[#E5E5E5] rounded-[10px] p-4 hover:border-[#0066FF] hover:border-2 transition-all duration-200 cursor-pointer bg-white relative"
                  >
                    {/* Customer Name */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[16px]">👤</span>
                      <h3 className="text-[16px] font-semibold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        {booking.customerName || booking.contactName}
                      </h3>
                      <button className="ml-auto text-[#666666] hover:text-[#000000]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="5" r="1.5" fill="currentColor"/>
                          <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                          <circle cx="10" cy="15" r="1.5" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[14px]">📅</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          From: <span className="font-medium">{booking.startDate}</span>
                        </span>
                        <span className="text-[13px] text-[#666666]">•</span>
                        <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          To: <span className="font-medium">{booking.endDate}</span>
                        </span>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[14px]">🕐</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          From: <span className="font-medium">{booking.startTime}</span>
                        </span>
                        <span className="text-[13px] text-[#666666]">•</span>
                        <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          To: <span className="font-medium">{booking.endTime}</span>
                        </span>
                      </div>
                    </div>

                    {/* Mobile */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[14px]">📱</span>
                      <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Mobile No: <span className="font-medium">{booking.mobile}</span>
                      </span>
                    </div>

                    {/* Status and Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>Status:</span>
                        <span 
                          className={`inline-block px-3 py-1 rounded-md text-[12px] font-medium ${
                            booking.status === "Completed"
                              ? "bg-[#E8F5E9] text-[#2E7D32]"
                              : booking.status === "Picked"
                              ? "bg-[#E3F2FD] text-[#1565C0]"
                              : "bg-[#FFF9E6] text-[#F57C00]"
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {booking.status}
                        </span>
                      </div>
                      {booking.totalPrice && (
                        <span className="text-[14px] font-semibold text-[#0066FF]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          ₹{booking.totalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default VehicleHistory;