import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import apiService from "../services/api.service";

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

  // Get vehicle data from navigation state
  const passedVehicleData = location.state?.vehicleData;
  const passedVehicleType = location.state?.vehicleType;

  // Determine vehicle type from passed data or from the vehicle structure
  const vehicleType = 
    passedVehicleType || 
    (passedVehicleData?.CarName || passedVehicleData?.carImages ? "car" : "bike");

  // Use vehicleId from URL params or from passed state
  const finalVehicleId = vehicleId || passedVehicleData?._id || passedVehicleData?.id;

  console.log("🔍 Vehicle History - Type:", vehicleType, "ID:", finalVehicleId);

  // Fetch vehicle details
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

        // Extract data safely
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

  // Fetch booking history - Get owner's bookings and filter by vehicle
  useEffect(() => {
    if (!finalVehicleId || !vehicleData) {
      setBookingLoading(false);
      return;
    }

    const fetchBookingHistory = async () => {
      try {
        setBookingLoading(true);
        console.log(`📡 Fetching all bookings to filter for vehicle ID:`, finalVehicleId);

        // Get the owner's user ID from localStorage or vehicle data
        const ownerId = localStorage.getItem('userId') || vehicleData.contactNumber;
        
        if (!ownerId) {
          console.warn("⚠️ No owner ID found, cannot fetch bookings");
          setBookingHistory([]);
          setBookingLoading(false);
          return;
        }

        // Fetch all bookings for the owner
        const response = await apiService.booking.getAllBookings(ownerId);
        
        console.log("📦 Raw booking response:", response);

        // Extract bookings from response
        const payload = response?.data ?? response;
        let allBookings = payload?.bookings || payload?.data || payload || [];
        
        if (!Array.isArray(allBookings)) {
          allBookings = [];
        }

        console.log("📋 All bookings:", allBookings);

        // Filter bookings for this specific vehicle
        const vehicleBookings = allBookings.filter((booking: any) => {
          const bookingVehicleId = booking.VechileId || booking.vehicleId || booking.VehicleId;
          return bookingVehicleId === finalVehicleId;
        });

        console.log("✅ Filtered bookings for this vehicle:", vehicleBookings);

        // Transform booking data to match our interface
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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="text-gray-600">Loading vehicle details...</p>
      </div>
    );
  }

  if (error || !vehicleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
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

  // Determine vehicle type & images
  const isCar =
    !!vehicleData.CarName || !!vehicleData.carImages || vehicleType === "car";

  let vehicleImages =
    (isCar ? vehicleData.carImages : vehicleData.bikeImages) || [];

  vehicleImages = vehicleImages.filter(
    (img) => img && img.trim() !== "" && img !== "undefined"
  );

  const dummyImages = [
    "https://via.placeholder.com/400x300?text=Vehicle+Image+1",
    "https://via.placeholder.com/400x300?text=Vehicle+Image+2",
    "https://via.placeholder.com/400x300?text=Vehicle+Image+3",
  ];

  if (vehicleImages.length === 0) {
    vehicleImages = dummyImages;
  } else if (vehicleImages.length === 1) {
    vehicleImages = [vehicleImages[0], ...dummyImages.slice(0, 2)];
  }

  // Derived display values
  const displayName = isCar
    ? vehicleData.CarName || "Unknown Vehicle"
    : vehicleData.bikeName || "Unknown Bike";

  const displayModel = isCar
    ? vehicleData.CarModel || "N/A"
    : vehicleData.bikeModel || "N/A";

  const displayNumber = isCar
    ? vehicleData.CarNumber || "N/A"
    : vehicleData.bikeNumber || "N/A";

  const displayPrice = isCar
    ? `₹${vehicleData.RentPerHour || 0}/hr`
    : `₹${vehicleData.pricePerKm || 0}/km`;

  const displayLocation = `${vehicleData.pickupCity || "Unknown"}, ${
    vehicleData.pickupCityState || ""
  }`;

  const handleBookingClick = (booking: BookingHistory) => {
    navigate(`/booking-details/${booking._id}`, {
      state: { booking, vehicleData },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center">
      <div className="max-w-[1228px] w-full flex flex-col md:flex-row gap-10">
        {/* Left Section */}
        <div className="flex flex-col md:flex-row bg-white p-6 rounded-2xl shadow-lg w-full md:w-[860px]">
          {/* Image Gallery */}
          <div className="relative w-full md:w-[409px] h-[309px] overflow-hidden rounded-xl shadow-md flex-shrink-0">
            <img
              src={vehicleImages[currentImageIndex]}
              alt={`${displayName} ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {vehicleImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-3 h-3 rounded-full ${
                    idx === currentImageIndex
                      ? "bg-white scale-110"
                      : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="flex flex-col ml-0 md:ml-6 mt-6 md:mt-0">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold">{displayName}</h1>
              <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-md">
                <span className="text-sm font-semibold text-yellow-800">★ 4.2</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {displayModel} • {displayNumber}
            </p>
            <div className="flex items-baseline mt-3">
              <span className="text-3xl font-bold text-blue-600">{displayPrice}</span>
            </div>
            <div className="flex items-center mt-4 border border-gray-300 rounded-xl overflow-hidden">
              {isCar ? (
                <>
                  <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                    🚗{" "}
                    <p className="text-sm text-gray-700">
                      {vehicleData.transmissionType || "Manual"}
                    </p>
                  </div>
                  <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                    👥{" "}
                    <p className="text-sm text-gray-700">
                      {vehicleData.Carseater || "5"} Seater
                    </p>
                  </div>
                  <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                    ⛽{" "}
                    <p className="text-sm text-gray-700">
                      {vehicleData.fuelType || "Petrol"}
                    </p>
                  </div>
                  <div className="flex flex-col items-center px-4 py-3">
                    ❄️{" "}
                    <p className="text-sm text-gray-700">
                      {vehicleData.Ac_available ? "AC" : "Non-AC"}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                    🏍️ <p className="text-sm text-gray-700">Bike</p>
                  </div>
                  <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                    ⛽ <p className="text-sm text-gray-700">Petrol</p>
                  </div>
                  <div className="flex flex-col items-center px-4 py-3">
                    📍 <p className="text-sm text-gray-700">{displayLocation}</p>
                  </div>
                </>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {vehicleData.description || "No description available"}
              </p>
            </div>
          </div>
        </div>

        {/* Booking History */}
        <div className="w-full md:w-[350px] flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Booking History</h2>
          
          {bookingLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="animate-spin mb-2" size={32} />
              <p className="text-gray-600 text-sm">Loading bookings...</p>
            </div>
          ) : bookingError ? (
            <div className="text-center py-8">
              <p className="text-red-600 text-sm mb-2">{bookingError}</p>
              <p className="text-gray-500 text-sm">Unable to load booking history</p>
            </div>
          ) : bookingHistory.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-500 text-lg mb-2">📋 No bookings yet</p>
              <p className="text-gray-400 text-sm">This vehicle hasn't been booked</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookingHistory.map((booking, idx) => (
                <div
                  key={booking._id || idx}
                  onClick={() => handleBookingClick(booking)}
                  className="border border-gray-200 rounded-xl p-4 relative hover:shadow-md transition bg-white cursor-pointer"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {booking.customerName || booking.contactName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    📅 {booking.startDate} - {booking.endDate}
                  </p>
                  <p className="text-sm text-gray-600">
                    🕐 {booking.startTime} - {booking.endTime}
                  </p>
                  <p className="text-sm text-gray-600">📱 {booking.mobile}</p>
                  {booking.totalPrice && (
                    <p className="text-sm text-gray-600 font-medium mt-1">
                      💰 ₹{booking.totalPrice}
                    </p>
                  )}
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Picked"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleHistory;