import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/booking.store";
import { Calendar, Clock, MoreVertical, Star } from "lucide-react";
import BlackCar from '../assets/images/BlackCar.png'; // adjust path according to your file

const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, deleteBooking } = useBookingStore();
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
const [vehicleFilter, setVehicleFilter] = React.useState<"All" | "Cars" | "Autos" | "Bikes">("All");

  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showBookingMenu, setShowBookingMenu] = useState<string | null>(null);
const bookingMenuRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
 

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
   const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "All" | "Cars" | "Autos"|"Bikes";
    setVehicleFilter(value);

       if (value === "Cars") {
      navigate("/cars"); // your Cars page route
    } else if (value === "Autos") {
      navigate("/autos"); // your Autos page route
    } 
    else if (value === "Bikes") {
      navigate("/Bikes"); // your Autos page route
    } else {
      navigate("/bookings"); // optional: if "All" selected
    }
  };


  // ✅ Updated getStatusBadge (toggle-capable)
const getStatusBadge = (status: string, onClick: () => void) => {
  const baseClasses =
    "w-[199px] h-[50px] flex items-center justify-center rounded-lg font-semibold text-sm cursor-pointer transition";
  switch (status) {
    case "Booked":
      return (
        <button
          onClick={onClick}
          className={`${baseClasses} bg-green-100 text-green-700 hover:bg-green-200`}
        >
          Booked
        </button>
      );
    case "Not Booked":
      return (
        <button
          onClick={onClick}
          className={`${baseClasses} bg-red-100 text-red-700 hover:bg-red-200`}
        >
          Not Booked
        </button>
      );
    default:
      return (
        <button
          onClick={onClick}
          className={`${baseClasses} bg-gray-100 text-gray-700`}
        >
          {status}
        </button>
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

    const confirmMessage = vehicleFilter === "All" 
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
  

const allBookings = bookings.length === 0
  ? [
      {
        id: "1",
        vehicleName: "Hyundai Verna",
        vehicleType: "Cars",
        vehicleImage: BlackCar,
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
        vehicleImage: BlackCar,
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
        vehicleImage: BlackCar,
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
        vehicleImage: BlackCar,
        price: "25",
        startDate: "10-10-2023",
        endDate: "",
        startTime: "11 AM",
        endTime: "",
        modelNo: "123457007",
        status: "Booked",
        rating: 0,
      },
    ]
  : bookings.map((booking) => ({
      ...booking,
      vehicleType:
        booking.vehicleType ||
        (booking.vehicleName.toLowerCase().includes("verna") ? "Cars" : "Autos"),
      vehicleImage: BlackCar, // use BlackCar for all
      rating: 4,
    }));


  // Filter bookings based on selected vehicle type
  const filteredBookings = vehicleFilter === "All" 
    ? allBookings 
    : allBookings.filter(booking => booking.vehicleType === vehicleFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
  <div className="w-full px-4 py-4 flex items-center justify-between">
    <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>

    <div className="flex items-center gap-3">
      {/* Dropdown */}
      <select
        value={vehicleFilter}
        onChange={handleVehicleChange}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white"
      >
        <option value="All">All</option>
        <option value="Cars">Cars</option>
        <option value="Autos">Autos</option>
         <option value="Bikes">Bikes</option>
      </select>

      {/* MoreVertical */}
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
              Delete All {vehicleFilter === "All" ? "Bookings" : vehicleFilter}
            </button>
          </div>
      )}
    </div>
</div>

        </div>
      </div>

      {/* Bookings List */}
      <div className="max-w-4xl ml-0 p-4 space-y-3">
        {filteredBookings.map((booking) => (
          <div
  key={booking.id}
  onClick={() => handleBookingClick(booking.id)}
  style={{ width: "1200px", height: "290px" }}
  className={`bg-white rounded-lg overflow-hidden transition-all cursor-pointer flex relative ${
    selectedBooking === booking.id ? "ring-2 ring-blue-500 shadow-lg" : "shadow"
  }`}
>
            <div className="flex gap-4 p-4">
              {/* Vehicle Image */}
              <div className="flex-shrink-0">
                <img
                  src={booking.vehicleImage}
                  alt={booking.vehicleName}
                  style={{ width: "277px", height: "277px" }}
                  className="w-24 h-24 object-right  rounded-lg"
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
                   <div className="absolute top-2 right-2" ref={showBookingMenu === booking.id ? bookingMenuRef : null}>
  <button 
    onClick={(e) => toggleBookingMenu(booking.id, e)}
    className="p-1 hover:bg-gray-100 rounded top-1 right-8"
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

 {/* Dates Row */}
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

{/* Times Row */}
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



                {/* Model Number and Status */}
               {/* Model Number and Status */}
{/* Model Number and Status */}
<div className="flex items-center justify-between pt-6">
  <span className="text-sm font-semibold text-gray-900">
    Model No:{" "}
    <span className="font-bold text-gray-900">
      {(booking.modelNo || (booking as any).vehicleId || "N/A")
        .toString()
        .slice(0, 10)} {/* show only 10 digits */}
    </span>
  </span>
</div>

{/* Status Section */}
<div className="pt-5 flex items-center gap-5">
  <span className="text-base font-semibold text-gray-900">Status:</span>
  <div
    className="flex items-center justify-center rounded-lg font-semibold text-sm"
    style={{
      width: "199px",
      height: "50px",
    }}
  >
    {getStatusBadge(booking.status, () => {
      booking.status =
        booking.status === "Booked" ? "Not Booked" : "Booked";
      // Force re-render
      setSelectedBooking(booking.id + Math.random());
    })}
  </div>
</div>


              </div>
            </div>
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">{bookings.length === 0 ? "Sample bookings shown above" : `No ${vehicleFilter === "All" ? "bookings" : vehicleFilter.toLowerCase()} found`}</p>
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