import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import BlackCar from "../assets/images/BlackCar.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";

interface BookingHistory {
  customerName: string;
  bookingDate: string;
  bookingTime: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  modelNo: string;
  status: "Booked" | "Picked" | "Completed";
}

const VehicleHistory: React.FC = () => {
  const { vehicleName } = useParams<{ vehicleName: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"history" | "description">("history");
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);

  // Sample vehicle data
  const vehicle = {
    name: "Hyundai Verna",
    price: "250",
    rating: "4.2",
    transmission: "Automatic",
    seats: "5 Seaters",
    fuel: "Petrol",
    ac: "AC",
    image: BlackCar,
    location: "Kakinada",
  };

  // Sample booking history data
  const bookingHistory: BookingHistory[] = [
    {
      customerName: "Manoj Kumar",
      bookingDate: "06/19/2023",
      bookingTime: "11 AM",
      startDate: "30/19/2025",
      startTime: "11 AM",
      endDate: "31 AM",
      endTime: "11 AM",
      modelNo: "1234KJFB98",
      status: "Booked",
    },
    {
      customerName: "Manoj Kumar",
      bookingDate: "06/19/2023",
      bookingTime: "11 AM",
      startDate: "30/19/2022",
      startTime: "11 AM",
      endDate: "31 AM",
      endTime: "11 AM",
      modelNo: "CHDJAJGB78",
      status: "Picked",
    },
    {
      customerName: "Manoj Kumar",
      bookingDate: "06/19/2023",
      bookingTime: "11 AM",
      startDate: "30/19/2022",
      startTime: "11 AM",
      endDate: "31 AM",
      endTime: "11 AM",
      modelNo: "1234KJFB98",
      status: "Booked",
    },
  ];

  const handleMenuToggle = (index: number) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Booked":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Picked":
        return "bg-green-100 text-green-700 border-green-300";
      case "Completed":
        return "bg-blue-100 text-blue-700 border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Vehicle Header */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Vehicle Image */}
          <div className="w-full lg:w-[270px] h-[200px] overflow-hidden rounded-lg flex-shrink-0">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-full object-cover object-[85%_50%]"
            />
          </div>

          {/* Vehicle Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold">{vehicle.name}</h1>
              <span className="flex items-center justify-center px-3 py-1 text-gray-700 text-sm bg-yellow-100 rounded w-fit">
                ⭐ {vehicle.rating}
              </span>
            </div>
            
            <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
              ₹{vehicle.price}<span className="text-sm font-normal">/hr</span>
            </p>

            {/* Vehicle Features */}
            <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-4 mb-4">
              <div className="flex flex-col items-center p-2 sm:p-3 border rounded-lg">
                <img src={AutomaticLogo} alt="Transmission" className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
                <span className="text-xs sm:text-sm">{vehicle.transmission}</span>
              </div>
              <div className="flex flex-col items-center p-2 sm:p-3 border rounded-lg">
                <img src={DriverLogo} alt="Seats" className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
                <span className="text-xs sm:text-sm">{vehicle.seats}</span>
              </div>
              <div className="flex flex-col items-center p-2 sm:p-3 border rounded-lg">
                <span className="text-lg sm:text-xl mb-1">⛽</span>
                <span className="text-xs sm:text-sm">{vehicle.fuel}</span>
              </div>
              <div className="flex flex-col items-center p-2 sm:p-3 border rounded-lg">
                <span className="text-lg sm:text-xl mb-1">❄️</span>
                <span className="text-xs sm:text-sm">{vehicle.ac}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 sm:gap-6 border-b overflow-x-auto">
              <button
                onClick={() => setActiveTab("history")}
                className={`pb-2 px-1 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
                  activeTab === "history"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-2 px-1 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
                  activeTab === "description"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === "history" ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Booking History</h2>
          
          {bookingHistory.map((booking, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                {/* Left Side - Booking Details */}
                <div className="flex-1 space-y-3 w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 font-semibold">
                        {booking.customerName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base sm:text-lg truncate">{booking.customerName}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        📅 {booking.bookingDate} ⏰ {booking.bookingTime}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Start Date:</p>
                      <p className="font-medium text-xs sm:text-sm">📅 {booking.startDate} ⏰ {booking.startTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">End Date:</p>
                      <p className="font-medium text-xs sm:text-sm">📅 {booking.endDate} ⏰ {booking.endTime}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Model No:</p>
                    <p className="font-medium text-sm sm:text-base">{booking.modelNo}</p>
                  </div>
                </div>

                {/* Right Side - Status and Menu */}
                <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-start gap-2 sm:gap-3 w-full sm:w-auto">
                  <span
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>

                  <div className="relative">
                    <button
                      className="p-2 rounded hover:bg-gray-100"
                      onClick={() => handleMenuToggle(index)}
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>

                    {menuOpenIndex === index && (
                      <div className="absolute right-0 mt-2 w-36 sm:w-32 bg-white shadow-lg rounded-lg border border-gray-100 z-10">
                        <button
                          onClick={() => {
                            navigate(`/vehicle-details/${vehicleName}/edit/${booking.modelNo}`);
                            setMenuOpenIndex(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            alert(`Contact ${booking.customerName}`);
                            setMenuOpenIndex(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Contact
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Description</h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Lorem ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting 
            industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged.
          </p>
          
          <div className="mt-4 sm:mt-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Location</h3>
            <p className="text-sm sm:text-base text-gray-600">📍 {vehicle.location}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleHistory;
