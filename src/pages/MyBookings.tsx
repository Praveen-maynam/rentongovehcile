import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { useBookingStore } from "../store/booking.store";
import { Booking } from "../types/booking";
import Auto from "../assets/images/Auto.png";
 
const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const { bookings } = useBookingStore(); // removed deleteBooking (unused)
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Ongoing">("Upcoming");
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
 
  // ✅ Categorize bookings
  const getBookingCategory = (booking: Booking): "Upcoming" | "Ongoing" => {
    const now = new Date();
    const startDateTime = new Date(`${booking.startDate} ${booking.startTime}`);
    const endDateTime = booking.endDate
      ? new Date(`${booking.endDate} ${booking.endTime || "23:59"}`)
      : new Date(startDateTime.getTime() + 24 * 60 * 60 * 1000);
 
    if (now < startDateTime) return "Upcoming";
    if (now >= startDateTime && now <= endDateTime) return "Ongoing";
    return "Upcoming";
  };
 
  const filteredBookings = bookings.filter(
    (b) => b.status !== "Cancelled" && getBookingCategory(b) === activeTab
  );
 
  // ✅ Status Badge
  const getStatusBadge = (
    status: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  ) => {
    const base =
      "w-[199px] h-[50px] flex items-center justify-center rounded-lg font-semibold text-sm cursor-pointer transition";
 
    switch (status) {
      case "Booked":
        return (
          <button
            onClick={onClick}
            className={`${base} bg-green-100 text-green-700 hover:bg-green-200`}
          >
            Booked
          </button>
        );
      case "Cancelled":
        return (
          <button
            onClick={onClick}
            className={`${base} bg-red-100 text-red-700 hover:bg-red-200`}
          >
            Cancelled
          </button>
        );
      case "Picked":
        return (
          <button
            onClick={onClick}
            className={`${base} bg-yellow-100 text-yellow-700 hover:bg-yellow-200`}
          >
            Picked
          </button>
        );
      case "Completed":
        return (
          <button
            onClick={onClick}
            className={`${base} bg-blue-100 text-blue-700 hover:bg-blue-200`}
          >
            Completed
          </button>
        );
      default:
        return (
          <button onClick={onClick} className={`${base} bg-gray-100 text-gray-700`}>
            {status}
          </button>
        );
    }
  };
 
  // ✅ Navigate to BookNow
  const handleBookingClick = (booking: Booking) => {
    navigate(`/booking-history/${booking.vehicleId}`, {
      state: { booking, openContact: true },
    });
  };
 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="w-full px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>
        </div>
 
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
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
 
      {/* ✅ Bookings List */}
      <div className="max-w-4xl ml-0 p-4 space-y-3">
        {filteredBookings.length ? (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              onClick={() => handleBookingClick(booking)}
              style={{ width: "1200px", height: "290px" }}
              className={`bg-white rounded-lg overflow-hidden transition-all cursor-pointer flex relative ${
                selectedBooking === booking.id ? "ring-2 ring-blue-500 shadow-lg" : "shadow"
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
  <p className="text-xl font-bold text-gray-900 mt-1">₹{booking.price}</p>
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
                        <span className="mx-3 font-semibold text-gray-700">|</span>
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
                        <span className="mx-3 font-semibold text-gray-700">|</span>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">TO:</span>
                          <span>{booking.endTime}</span>
                        </div>
                      </>
                    )}
                  </div>
 
                  {/* Model No + Status */}
                  <div className="flex items-center justify-between pt-6">
                    <span className="text-sm font-semibold text-gray-900">
                      Model No:{" "}
                      <span className="font-bold text-gray-900">
                        {(booking.modelNo || booking.vehicleId || "N/A").toString().slice(0, 10)}
                      </span>
                    </span>
                  </div>
 
                  {/* Status */}
                  <div className="pt-5 flex items-center gap-5">
                    <span className="text-base font-semibold text-gray-900">Status:</span>
                    {getStatusBadge(booking.status, () => {
                      // Only allow toggling Booked ↔ Cancelled for simplicity
                      booking.status =
                        booking.status === "Booked" ? "Cancelled" : "Booked";
                      setSelectedBooking(booking.id + Math.random());
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              {bookings.length === 0
                ? "No bookings yet. Sample bookings will appear here."
                : "No bookings found for this category."}
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
    </div>
  );
};
 
export default MyBookings;
 
 
 