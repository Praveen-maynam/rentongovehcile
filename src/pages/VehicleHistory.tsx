import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import BlackCar from "../assets/images/BlackCar.png";
import BlackCar2 from "../assets/images/BlackCar.png";
import BlackCar3 from "../assets/images/BlackCar.png";
import BlackCar4 from "../assets/images/BlackCar.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";

interface BookingHistory {
  customerName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  mobile: string;
  status: "Booked" | "Picked" | "Completed";
}

const VehicleHistory: React.FC = () => {
  const { vehicleName } = useParams<{ vehicleName: string }>();
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const vehicleImages = [BlackCar, BlackCar2, BlackCar3, BlackCar4];

  const vehicle = {
    name: "Hyundai Verna",
    price: "250",
    rating: "4.2",
    transmission: "Automatic",
    seats: "5 Seaters",
    fuel: "Petrol",
    ac: "AC",
    image: BlackCar,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  };

  const bookingHistory: BookingHistory[] = [
    {
      customerName: "Manoj Kumar",
      startDate: "30-10-2025",
      startTime: "11 AM",
      endDate: "30-10-2025",
      endTime: "11 AM",
      mobile: "1234567898",
      status: "Booked",
    },
    {
      customerName: "Manoj Kumar",
      startDate: "30-10-2025",
      startTime: "11 AM",
      endDate: "30-10-2025",
      endTime: "11 AM",
      mobile: "1234567898",
      status: "Picked",
    },
    {
      customerName: "Manoj Kumar",
      startDate: "30-10-2025",
      startTime: "11 AM",
      endDate: "30-10-2025",
      endTime: "11 AM",
      mobile: "1234567898",
      status: "Completed",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Booked":
        return "text-green-600 bg-green-50 border-green-300";
      case "Picked":
        return "text-yellow-600 bg-yellow-50 border-yellow-300";
      case "Completed":
        return "text-blue-600 bg-blue-50 border-blue-300";
      default:
        return "text-gray-600 bg-gray-50 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6 flex justify-center">
      <div className="max-w-[1228px] w-full flex flex-col md:flex-row gap-10">
        {/* Left Section - Image + Details */}
        <div className="flex flex-col md:flex-row bg-white p-6 rounded-2xl shadow-lg w-full md:w-[860px]">
          {/* Car Image Slider */}
          <div className="relative w-[409px] h-[409px] overflow-hidden rounded-xl shadow-md flex-shrink-0">
            {/* Current Image */}
            <img
              src={vehicleImages[currentImage]}
              alt={`${vehicle.name} ${currentImage + 1}`}
              className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            />

            {/* Dots inside the image */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {vehicleImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImage ? "bg-white" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="flex flex-col ml-6 mt-6 md:mt-0">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold">{vehicle.name}</h1>
              <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-md">
                <span className="text-sm font-semibold text-yellow-800">
                  ★ {vehicle.rating}
                </span>
              </div>
            </div>

            <div className="flex items-baseline mt-2">
              <span className="text-3xl font-bold">₹{vehicle.price}</span>
              <span className="text-gray-500 ml-2 text-sm">/hr</span>
            </div>

            {/* Specifications */}
            <div className="flex items-center mt-4 border border-gray-300 rounded-xl overflow-hidden">
              {/* Transmission */}
              <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                  <img src={AutomaticLogo} alt="Auto" className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-700">{vehicle.transmission}</p>
              </div>

              {/* Seats */}
              <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                  <img src={DriverLogo} alt="Seats" className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-700">{vehicle.seats}</p>
              </div>

              {/* Fuel */}
              <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                  <span className="text-lg">⛽</span>
                </div>
                <p className="text-sm text-gray-700">{vehicle.fuel}</p>
              </div>

              {/* AC */}
              <div className="flex flex-col items-center px-4 py-3">
                <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                  <span className="text-lg">❄️</span>
                </div>
                <p className="text-sm text-gray-700">{vehicle.ac}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {vehicle.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Booking History */}
        <div className="w-full md:w-[330px] flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
          <div className="space-y-4">
            {bookingHistory.map((booking, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 relative hover:shadow-md transition"
              >
                <button
                  onClick={() =>
                    setMenuOpenIndex(menuOpenIndex === index ? null : index)
                  }
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                <h3 className="font-semibold text-gray-800 mb-1">
                  {booking.customerName}
                </h3>

                <p className="text-sm text-gray-600">
                  From: <span className="font-medium">{booking.startDate}</span>{" "}
                  | To: <span className="font-medium">{booking.endDate}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Time: {booking.startTime} - {booking.endTime}
                </p>
                <p className="text-sm text-gray-600">
                  Mobile No: <span className="font-medium">{booking.mobile}</span>
                </p>

                <div className="flex justify-start items-center mt-2">
                  <p
                    className={`text-xs px-2 py-1 border rounded-md font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleHistory;
