import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/booking.store";
import { Calendar, Clock, MoreVertical, Star } from "lucide-react";

const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, deleteBooking } = useBookingStore();
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [vehicleFilter, setVehicleFilter] = useState<"Both" | "Cars" | "Autos">("Both");
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showBookingMenu, setShowBookingMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const bookingMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowDeleteMenu(false);
      }
      if (bookingMenuRef.current && !bookingMenuRef.current.contains(event.target as Node)) {
        setShowBookingMenu(null);
      }
    };

    if (showDeleteMenu || showBookingMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDeleteMenu, showBookingMenu]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Not Booked":
        return (
          <span className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded">
            Not Booked
          </span>
        );
      case "Booked":
        return (
          <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 rounded">
            Booked
          </span>
        );
      case "Picked":
        return (
          <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded">
            Picked
          </span>
        );
      case "Completed":
        return (
          <span className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded">
            Completed
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded">
            {status}
          </span>
        );
    }
  };

  const handleBookingClick = (bookingId: string) => {
    if (selectedBooking === bookingId) {
      setSelectedBooking(null);
    } else {
      setSelectedBooking(bookingId);
    }
  };

  const handleDeleteAll = () => {
    const bookingsToDelete = filteredBookings.filter(booking => 
      bookings.some(b => b.id === booking.id)
    );
    
    if (bookingsToDelete.length === 0) {
      alert("No bookings to delete");
      return;
    }

    const confirmMessage = vehicleFilter === "Both" 
      ? `Are you sure you want to delete all ${bookingsToDelete.length} bookings?`
      : `Are you sure you want to delete all ${bookingsToDelete.length} ${vehicleFilter.toLowerCase()} bookings?`;
    
    if (window.confirm(confirmMessage)) {
      bookingsToDelete.forEach(booking => {
        deleteBooking(booking.id);
      });
      setShowDeleteMenu(false);
      alert(`Successfully deleted ${bookingsToDelete.length} booking(s)`);
    }
  };

  const handleDeleteBooking = (bookingId: string, bookingName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm(`Are you sure you want to delete the booking for ${bookingName}?`)) {
      deleteBooking(bookingId);
      setShowBookingMenu(null);
      alert("Booking deleted successfully");
    }
  };

  const handleViewDetails = (booking: any, event: React.MouseEvent) => {
    event.stopPropagation();
    setShowBookingMenu(null);
    alert(`Booking Details:\n\nVehicle: ${booking.vehicleName}\nPrice: ₹${booking.price}\nStart: ${booking.startDate} @ ${booking.startTime}\nEnd: ${booking.endDate || 'N/A'} @ ${booking.endTime || 'N/A'}\nModel No: ${booking.modelNo}\nStatus: ${booking.status}`);
  };

  const toggleBookingMenu = (bookingId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setShowBookingMenu(showBookingMenu === bookingId ? null : bookingId);
  };

  // Sample data if no bookings exist
  const allBookings = bookings.length === 0 ? [
    {
      id: "1",
      vehicleName: "Hyundai Verna",
      vehicleType: "Cars",
      vehicleImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/verna-exterior-right-front-three-quarter-71.jpeg",
      price: "250",
      startDate: "30-10-2023",
      endDate: "30-10-2023",
      startTime: "11 AM",
      endTime: "11 AM",
      modelNo: "123457007",
      status: "Not Booked",
      rating: 4,
    },
    {
      id: "2",
      vehicleName: "Pradeep Auto",
      vehicleType: "Autos",
      vehicleImage: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/51435/piaggio-ape-e-city-right-front-three-quarter2.jpeg",
      price: "25",
      startDate: "10-10-2023",
      endDate: "",
      startTime: "11 AM",
      endTime: "",
      modelNo: "123457007",
      status: "Booked",
      rating: 0,
    },
    {
      id: "3",
      vehicleName: "Hyundai Verna",
      vehicleType: "Cars",
      vehicleImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/verna-exterior-right-front-three-quarter-71.jpeg",
      price: "250",
      startDate: "30-10-2023",
      endDate: "30-10-2023",
      startTime: "11 AM",
      endTime: "11 AM",
      modelNo: "123457007",
      status: "Not Booked",
      rating: 4,
    },
    {
      id: "4",
      vehicleName: "Piaggio Ape",
      vehicleType: "Autos",
      vehicleImage: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/51435/piaggio-ape-e-city-right-front-three-quarter2.jpeg",
      price: "25",
      startDate: "10-10-2023",
      endDate: "",
      startTime: "11 AM",
      endTime: "",
      modelNo: "123457007",
      status: "Booked",
      rating: 0,
    },
  ] : bookings.map(booking => ({
    ...booking,
    vehicleType: booking.vehicleType || (booking.vehicleName.toLowerCase().includes('verna') ? "Cars" : "Autos"),
    vehicleImage: booking.vehicleName.toLowerCase().includes('verna') 
      ? "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/verna-exterior-right-front-three-quarter-71.jpeg"
      : "https://imgd.aeplcdn.com/1056x594/n/cw/ec/51435/piaggio-ape-e-city-right-front-three-quarter2.jpeg",
    rating: 4,
  }));

  // Filter bookings based on selected vehicle type
  const filteredBookings = vehicleFilter === "Both" 
    ? allBookings 
    : allBookings.filter(booking => booking.vehicleType === vehicleFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">My Bookings</h1>
          <div className="flex items-center gap-3">
            <select 
              value={vehicleFilter}
              onChange={(e) => setVehicleFilter(e.target.value as "Both" | "Cars" | "Autos")}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white"
            >
              <option value="Both">Both</option>
              <option value="Cars">Cars</option>
              <option value="Autos">Autos</option>
            </select>
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setShowDeleteMenu(!showDeleteMenu)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              {showDeleteMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  <button
                    onClick={handleDeleteAll}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Delete All {vehicleFilter === "Both" ? "Bookings" : vehicleFilter}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="max-w-4xl mx-auto p-4 space-y-3">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            onClick={() => handleBookingClick(booking.id)}
            className={`bg-white rounded-lg overflow-hidden transition-all cursor-pointer ${
              selectedBooking === booking.id ? "ring-2 ring-blue-500 shadow-lg" : "shadow"
            }`}
          >
            <div className="flex gap-4 p-4">
              {/* Vehicle Image */}
              <div className="flex-shrink-0">
                <img
                  src={booking.vehicleImage}
                  alt={booking.vehicleName}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>

              {/* Booking Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {booking.vehicleName}
                    </h3>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{booking.price}
                    </p>
                  </div>
                  <div className="relative" ref={showBookingMenu === booking.id ? bookingMenuRef : null}>
                    <button 
                      onClick={(e) => toggleBookingMenu(booking.id, e)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                    {showBookingMenu === booking.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                        <button
                          onClick={(e) => handleViewDetails(booking, e)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                        >
                          View Details
                        </button>
                        <button
                          onClick={(e) => handleDeleteBooking(booking.id, booking.vehicleName, e)}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg border-t"
                        >
                          Delete Booking
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rating */}
                {/* {booking.rating > 0 && (
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < booking.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )} */}

                {/* Date and Time */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{booking.startDate}</span>
                  </div>
                  <span>@</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{booking.startTime}</span>
                  </div>
                  {booking.endDate && (
                    <>
                      <span>@</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.endDate}</span>
                      </div>
                      <span>@</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{booking.endTime}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Model Number and Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Model No: {booking.modelNo || (booking as any).vehicleId || "N/A"}
                  </span>
                  {getStatusBadge(booking.status)}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">{bookings.length === 0 ? "Sample bookings shown above" : `No ${vehicleFilter === "Both" ? "bookings" : vehicleFilter.toLowerCase()} found`}</p>
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