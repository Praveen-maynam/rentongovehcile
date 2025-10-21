import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/booking.store";
import { useListedCarsStore } from "../store/listedCars.store";
import { useListedAutosStore } from "../store/listedAutos.store";
import { Calendar, User, Phone, ArrowLeft } from "lucide-react";

const MyListingBookings: React.FC = () => {
  const navigate = useNavigate();
  const { bookings } = useBookingStore();
  const { cars } = useListedCarsStore();
  const { autos } = useListedAutosStore();

  // Get all vehicle IDs that belong to the user
  const myVehicleIds = [
    ...cars.map((car) => car.id),
    ...autos.map((auto) => auto.id),
  ];

  // Filter bookings for user's vehicles
  const myListingBookings = bookings.filter((booking) =>
    myVehicleIds.includes(booking.vehicleId)
  );

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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Listing Bookings
          </h1>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            📋 These are bookings made by others for your listed vehicles
          </p>
        </div>

        {/* Bookings List */}
        {myListingBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No bookings for your listings yet
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              When someone books your vehicles, they'll appear here
            </p>
            <button
              onClick={() => navigate("/listed")}
              className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              View My Listings
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {myListingBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
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

                    {/* Customer Info */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                        <User className="w-4 h-4" />
                        <span className="font-semibold">Customer:</span>
                        <span>{booking.customerName}</span>
                      </div>
                      {booking.contactNumber && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Phone className="w-4 h-4" />
                          <span>{booking.contactNumber}</span>
                        </div>
                      )}
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Booking: {booking.bookingDate} at {booking.bookingTime}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">Duration:</span> {booking.startDate}{" "}
                        {booking.startTime} → {booking.endDate} {booking.endTime}
                      </div>
                      <div>
                        <span className="font-semibold">Model:</span> {booking.modelNo}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">₹{booking.price}</p>
                    <p className="text-xs text-gray-500 mt-1">Earning</p>
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

export default MyListingBookings;