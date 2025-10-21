import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/booking.store";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";

const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const { bookings } = useBookingStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Booked":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Picked":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Completed":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Bookings</h1>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-sm text-gray-500 mb-6">
              Your booking history will appear here
            </p>
            <button
              onClick={() => navigate("/rental")}
              className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Browse Vehicles
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.vehicleName}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Booking: {booking.bookingDate} at {booking.bookingTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          Start: {booking.startDate} at {booking.startTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          End: {booking.endDate} at {booking.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Model: {booking.modelNo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">₹{booking.price}</p>
                    {booking.status === "Completed" && (
                      <button
                        onClick={() =>
                          navigate(
                            `/feedback?vehicleId=${booking.vehicleId}&vehicleName=${booking.vehicleName}&bookingId=${booking.id}`
                          )
                        }
                        className="mt-2 text-sm text-blue-600 hover:underline"
                      >
                        Give Feedback
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;