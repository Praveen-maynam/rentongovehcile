 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, RefreshCw, X } from "lucide-react";
 
import { useBookingStore } from "../store/booking.store";
import { Booking } from "../types/booking";
import Auto from "../assets/images/Auto.png";
 
type VehicleType = "Car" | "Auto" | "Bike";
 
const mapVehicleType = (type: string | undefined): VehicleType => {
  if (!type) return "Car";
  const lower = type.toLowerCase();
  if (lower.includes("auto")) return "Auto";
  if (lower.includes("bike")) return "Bike";
  return "Car";
};
 
// API Configuration
const CORS_PROXIES = [
  "https://corsproxy.io/?",
  "https://api.codetabs.com/v1/proxy?quest=",
];
const API_BASE_URL = "http://52.66.238.227:3000";
 
// Booking API Response Types
interface ApiBooking {
  _id: string;
  userId: string;
  vechileType: string;
  VechileId: string;
  pricePerKm: string;
  contactNumber: string;
  contactName: string;
  latitude: string;
  longitude: string;
  FromDate: string;
  ToDate: string;
  FromTime: string;
  ToTime: string;
  totalHours: string;
  totalPrice: string;
  status?: "Pending" | "Confirmed" | "Cancelled" | "Rejected" | "Completed" | "Picked";
  rejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
}
 
interface GetBookingsResponse {
  success: boolean;
  message: string;
  bookings: ApiBooking[];
}
 
const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, addBooking, updateBookingStatus } = useBookingStore();
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Ongoing">("Upcoming");
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
 
  // New state for API integration
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectedBooking, setRejectedBooking] = useState<ApiBooking | null>(null);
 
  // Fetch bookings on mount
  useEffect(() => {
    fetchUserBookings();
   
    // Auto-refresh every 30 seconds to check status updates
    const interval = setInterval(() => {
      fetchUserBookings(true); // Silent refresh
    }, 30000);
 
    return () => clearInterval(interval);
  }, []);
 
  // Fetch user bookings from API
  const fetchUserBookings = async (silent = false) => {
    if (!silent) setIsLoadingBookings(true);
    setIsRefreshing(true);
    setApiError("");
 
    try {
      const userId = "68fe269b6f13375a65dc587a"; // Replace with actual user ID from auth
      const apiUrl = `${API_BASE_URL}/getUserBookings?userId=${userId}`;
 
      console.log("📥 Fetching bookings from:", apiUrl);
 
      // Try with CORS proxies
      for (let i = 0; i < CORS_PROXIES.length; i++) {
        try {
          const proxiedUrl = `${CORS_PROXIES[i]}${encodeURIComponent(apiUrl)}`;
 
          const response = await Promise.race([
            fetch(proxiedUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }),
            new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error("Timeout")), 10000)
            ),
          ]);
 
          if (response.ok) {
            const data: GetBookingsResponse = await response.json();
            console.log("✅ Bookings fetched:", data);
 
            if (data.success && data.bookings) {
              // Convert API bookings to local format
              data.bookings.forEach((apiBooking) => {
                const existingBooking = bookings.find(
                  (b) => b.id === apiBooking._id
                );
 
                const newStatus = mapApiStatus(apiBooking.status);
 
                if (existingBooking) {
                  // Check if status changed to Rejected
                  if (existingBooking.status !== "Cancelled" && newStatus === "Cancelled" && apiBooking.status === "Rejected") {
                    // Show rejection notification
                    setRejectedBooking(apiBooking);
                    setShowRejectionModal(true);
                  }
 
                  // Update existing booking status if changed
                  if (existingBooking.status !== newStatus) {
                    updateBookingStatus(apiBooking._id, newStatus);
                  }
                } else {
                  // Add new booking from API
                  addBooking({
                    id: apiBooking._id,
                    vehicleId: apiBooking.VechileId,
                    vehicleName: `${apiBooking.vechileType} Vehicle`,
                    vehicleImage: Auto, // Default image
                    vehicleType: mapVehicleType(apiBooking.vechileType),
                    customerName: apiBooking.contactName,
                    bookingDate: new Date(
                      apiBooking.createdAt || apiBooking.FromDate
                    ).toLocaleDateString("en-US"),
                    bookingTime: new Date(
                      apiBooking.createdAt || apiBooking.FromDate
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    startDate: formatApiDate(apiBooking.FromDate),
                    startTime: formatApiTime(apiBooking.FromTime),
                    endDate: formatApiDate(apiBooking.ToDate),
                    endTime: formatApiTime(apiBooking.ToTime),
                    modelNo: apiBooking.VechileId.slice(0, 10).toUpperCase(),
                    status: newStatus,
                    price: Number(apiBooking.pricePerKm) || 0,
                  });
                }
              });
               
              setLastSyncTime(new Date());
            }
            return;
          }
        } catch (error) {
          console.warn(`⚠️ Proxy ${i + 1} failed:`, error);
          if (i === CORS_PROXIES.length - 1) {
            throw error;
          }
        }
      }
 
      throw new Error("All API attempts failed");
    } catch (error: any) {
      console.error("❌ Error fetching bookings:", error);
      if (!silent) {
        setApiError("Unable to fetch latest bookings. Showing cached data.");
      }
    } finally {
      setIsLoadingBookings(false);
      setIsRefreshing(false);
    }
  };
 
  // Map API status to local status
  const mapApiStatus = (
    apiStatus?: string
  ): "Booked" | "Cancelled" | "Picked" | "Completed" => {
    switch (apiStatus) {
      case "Confirmed":
        return "Booked";
      case "Pending":
        return "Booked";
      case "Cancelled":
        return "Cancelled";
      case "Rejected":
        return "Cancelled"; // Map Rejected to Cancelled but we'll display differently
      case "Picked":
        return "Picked";
      case "Completed":
        return "Completed";
      default:
        return "Booked";
    }
  };
 
  // Format date from API (2025-12-02) to display format
  const formatApiDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr.trim());
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
      }
    } catch (error) {
      console.error("Date format error:", error);
    }
    return dateStr;
  };
 
  // Format time from API (1.00, 6.00) to display format
  const formatApiTime = (timeStr: string): string => {
    try {
      const [hours, minutes] = timeStr.split(".");
      const hour = parseInt(hours);
      const min = minutes || "00";
 
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
 
      return `${displayHour}:${min} ${period}`;
    } catch (error) {
      console.error("Time format error:", error);
      return timeStr;
    }
  };
 
  // ✅ Categorize bookings - exclude rejected bookings from tabs
  const getBookingCategory = (booking: Booking): "Upcoming" | "Ongoing" | null => {
    // Hide cancelled/rejected bookings from tabs
    if (booking.status === "Cancelled") {
      return null;
    }
 
    const now = new Date();
    const startDateTime = new Date(`${booking.startDate} ${booking.startTime}`);
    const endDateTime = booking.endDate
      ? new Date(`${booking.endDate} ${booking.endTime || "23:59"}`)
      : new Date(startDateTime.getTime() + 24 * 60 * 60 * 1000);
 
    if (now < startDateTime) return "Upcoming";
    if (now >= startDateTime && now <= endDateTime) return "Ongoing";
    return "Upcoming";
  };
 
  const filteredBookings = bookings.filter((b) => {
    const category = getBookingCategory(b);
    return category === activeTab;
  });
 
  // ✅ Status Badge - show Confirmed for accepted, Rejected for rejected
  const getStatusBadge = (status: string, isRejected: boolean = false) => {
    const base =
      "w-[199px] h-[50px] flex items-center justify-center rounded-lg font-semibold text-sm transition";
 
    if (isRejected || status === "Cancelled") {
      return (
        <div className={`${base} bg-red-100 text-red-700`}>
          ❌ Rejected
        </div>
      );
    }
 
    switch (status) {
      case "Booked":
        return (
          <div className={`${base} bg-green-100 text-green-700`}>
            ✅ Confirmed
          </div>
        );
      case "Picked":
        return (
          <div className={`${base} bg-yellow-100 text-yellow-700`}>
            🚗 Vehicle Picked
          </div>
        );
      case "Completed":
        return (
          <div className={`${base} bg-blue-100 text-blue-700`}>
            ✔️ Completed
          </div>
        );
      default:
        return (
          <div className={`${base} bg-gray-100 text-gray-700`}>
            {status}
          </div>
        );
    }
  };
 
  // ✅ Navigate to BookNow
  const handleBookingClick = (booking: Booking) => {
    navigate(`/booking-history/${booking.vehicleId}`, {
      state: { booking, openContact: true },
    });
  };
 
  // Manual refresh
  const handleRefresh = () => {
    fetchUserBookings();
  };
 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="w-full px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>
            {lastSyncTime && (
              <p className="text-xs text-gray-500 mt-1">
                Last updated: {lastSyncTime.toLocaleTimeString()}
              </p>
            )}
          </div>
 
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span className="text-sm font-medium">
              {isRefreshing ? "Syncing..." : "Refresh"}
            </span>
          </button>
        </div>
 
        {/* API Error Message */}
        {apiError && (
          <div className="px-4 pb-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
              <svg
                className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-yellow-800">{apiError}</p>
                <button
                  onClick={handleRefresh}
                  className="text-xs text-yellow-700 hover:text-yellow-900 underline mt-1"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}
 
        {/* Tabs - Only Upcoming and Ongoing */}
        <div className="flex gap-4 px-4 border-b">
          <button
            onClick={() => setActiveTab("Upcoming")}
            className={`pb-3 px-4 font-semibold relative ${
              activeTab === "Upcoming"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Upcoming
          </button>
 
          <button
            onClick={() => setActiveTab("Ongoing")}
            className={`pb-3 px-4 font-semibold relative ${
              activeTab === "Ongoing"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Ongoing
          </button>
        </div>
      </div>
 
      {/* Loading State */}
      {isLoadingBookings && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your bookings...</p>
          </div>
        </div>
      )}
 
      {/* ✅ Bookings List */}
      {!isLoadingBookings && (
        <div className="max-w-4xl ml-0 p-4 space-y-3">
          {filteredBookings.length ? (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                onClick={() => handleBookingClick(booking)}
                style={{ width: "1200px", height: "290px" }}
                className={`bg-white rounded-lg overflow-hidden transition-all cursor-pointer flex relative ${
                  selectedBooking === booking.id
                    ? "ring-2 ring-blue-500 shadow-lg"
                    : "shadow hover:shadow-md"
                }`}
              >
                <div className="flex gap-4 p-4">
                  <div className="flex-shrink-0">
                    <img
                      src={booking.vehicleImage || Auto}
                      alt={booking.vehicleName}
                      style={{ width: "277px", height: "290px" }}
                      className="object-cover rounded-lg"
                    />
                  </div>
 
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.vehicleName}
                      </h3>
                      <p className="text-xl font-bold text-gray-900 mt-1">
                        ₹{booking.price}/hr
                      </p>
                    </div>
 
                    {/* Dates */}
                    <div className="flex items-center gap-4 text-sm pt-6 text-gray-900 mb-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">FROM:</span>
                        <span>{booking.startDate}</span>
                      </div>
                      {booking.endDate && (
                        <>
                          <span className="mx-3 font-semibold text-gray-700">
                            |
                          </span>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">TO:</span>
                            <span>{booking.endDate}</span>
                          </div>
                        </>
                      )}
                    </div>
 
                    {/* Times */}
                    <div className="flex items-center gap-4 text-sm text-gray-900 pt-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">FROM:</span>
                        <span>{booking.startTime}</span>
                      </div>
                      {booking.endTime && (
                        <>
                          <span className="mx-3 font-semibold text-gray-700">
                            |
                          </span>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">TO:</span>
                            <span>{booking.endTime}</span>
                          </div>
                        </>
                      )}
                    </div>
 
                    {/* Model No */}
                    <div className="flex items-center justify-between pt-6">
                      <span className="text-sm font-semibold text-gray-900">
                        Booking ID:{" "}
                        <span className="font-bold text-gray-900">
                          {(
                            booking.modelNo ||
                            booking.id ||
                            "N/A"
                          )
                            .toString()
                            .slice(0, 10)}
                        </span>
                      </span>
                    </div>
 
                    {/* Status - Shows Confirmed or Rejected */}
                    <div className="pt-5 flex items-center gap-5">
                      <span className="text-base font-semibold text-gray-900">
                        Status:
                      </span>
                      {getStatusBadge(booking.status, booking.status === "Cancelled")}
                    </div>
 
                    {/* Status update indicator */}
                    {isRefreshing && (
                      <div className="absolute top-4 right-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p className="text-gray-500 mb-4">
                {bookings.length === 0
                  ? "No bookings yet. Start by booking a vehicle!"
                  : `No ${activeTab.toLowerCase()} bookings found.`}
              </p>
              <button
                onClick={() => navigate("/rental")}
                className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Browse Vehicles to Book
              </button>
            </div>
          )}
        </div>
      )}
 
      {/* Rejection Modal */}
      {showRejectionModal && rejectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <X className="w-12 h-12 text-red-500" />
              </div>
            </div>
 
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
              Booking Rejected
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Unfortunately, the owner has rejected your booking request for the <strong>{rejectedBooking.vechileType}</strong>.
            </p>
 
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Booking ID:</span>
                <span>{rejectedBooking._id.slice(0, 10)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Date:</span>
                <span>{formatApiDate(rejectedBooking.FromDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>{formatApiTime(rejectedBooking.FromTime)}</span>
              </div>
            </div>
 
            {rejectedBooking.rejectionReason && (
              <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-900 mb-1">Reason:</p>
                <p className="text-sm text-yellow-800">{rejectedBooking.rejectionReason}</p>
              </div>
            )}
 
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectedBooking(null);
                }}
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectedBooking(null);
                  navigate("/rental");
                }}
                className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
              >
                Find Another Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default MyBookings;
 