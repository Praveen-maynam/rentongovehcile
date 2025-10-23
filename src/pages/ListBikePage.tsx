import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListedBikesStore } from "../store/listedBikes.store";

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { bikes } = useListedBikesStore();
  const [selectedBikeId, setSelectedBikeId] = useState<string>("");
  const [bookingDetails, setBookingDetails] = useState({
    customerName: "",
    bookingDate: "",
    bookingTime: "",
    durationHours: 1,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleBikeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBikeId(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBikeId || !bookingDetails.customerName || !bookingDetails.bookingDate || !bookingDetails.bookingTime) {
      alert("Please fill all required fields");
      return;
    }

    const bike = bikes.find((b) => b.id === selectedBikeId);
    if (!bike) {
      alert("Selected bike not found!");
      return;
    }

    // Save booking (here we just log it, you can store it in another store)
    alert(`Booking confirmed for ${bike.vehicleName}!`);
    navigate("/"); // redirect to homepage or booking list
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Book a Bike
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Bike */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Bike
            </label>
            <select
              name="selectedBike"
              value={selectedBikeId}
              onChange={handleBikeSelect}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              <option value="">-- Select Bike --</option>
              {bikes.map((bike) => (
                <option key={bike.id} value={bike.id}>
                  {bike.vehicleName} ({bike.farePrice}/hr)
                </option>
              ))}
            </select>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              name="customerName"
              value={bookingDetails.customerName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Booking Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Booking Date
            </label>
            <input
              type="date"
              name="bookingDate"
              value={bookingDetails.bookingDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Booking Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Booking Time
            </label>
            <input
              type="time"
              name="bookingTime"
              value={bookingDetails.bookingTime}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (hours)
            </label>
            <input
              type="number"
              name="durationHours"
              value={bookingDetails.durationHours}
              onChange={handleInputChange}
              min={1}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
