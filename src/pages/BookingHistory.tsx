import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlackCar from "../assets/images/BlackCar.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
import PopupChat from "../components/ui/PopupChat";
 
 
interface VehicleDetails {
  name: string;
  price: string;
  rating: string;
  transmission: string;
  seats: string;
  fuel: string;
  ac: string;
  image: string;
  description: string;
  ownerName: string;
  mobile: string;
  email: string;
}
 
const BookingHistory: React.FC = () => {
  const { vehicleName } = useParams<{ vehicleName: string }>();
  const navigate = useNavigate();
 
  const [currentImage, setCurrentImage] = useState(0);
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
  const [showContactButtons, setShowContactButtons] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
 
  const vehicleImages = [BlackCar, BlackCar, BlackCar, BlackCar];
 
  const initialVehicle: VehicleDetails = {
    name: "Hyundai Verna",
    price: "250",
    rating: "4.2",
    transmission: "Automatic",
    seats: "5 Seaters",
    fuel: "Petrol",
    ac: "AC",
    image: BlackCar,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ownerName: "Manoj Kumar",
    mobile: "1234567898",
    email: "owner@example.com",
  };
 
  const handleConfirmBooking = () => {
    alert("Calling vehicle owner...");
  };
 
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center">
      <div className="max-w-[900px] w-full bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row">
        {/* --- Vehicle Image Carousel --- */}
        <div className="relative w-[409px] h-[309px] overflow-hidden rounded-xl shadow-md flex-shrink-0">
          <img
            src={vehicleImages[currentImage]}
            alt={`${initialVehicle.name} ${currentImage + 1}`}
            className="w-auto h-auto object-cover transition-all duration-500 ease-in-out"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {vehicleImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentImage ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
 
        {/* --- Vehicle Details Section --- */}
        <div className="flex flex-col ml-6 mt-6 md:mt-0 flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">{initialVehicle.name}</h1>
            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-md">
              <span className="text-sm font-semibold text-yellow-800">
                ★ {initialVehicle.rating}
              </span>
            </div>
          </div>
 
          <div className="flex items-baseline mt-2">
            <span className="text-3xl font-bold">₹{initialVehicle.price}</span>
            <span className="text-gray-500 ml-2 text-sm">/hr</span>
          </div>
 
          {/* --- Icons Row --- */}
          <div className="flex items-center mt-4 border border-gray-300 rounded-xl overflow-hidden">
            <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
              <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                <img src={AutomaticLogo} alt="Auto" className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-700">{initialVehicle.transmission}</p>
            </div>
 
            <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
              <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                <img src={DriverLogo} alt="Seats" className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-700">{initialVehicle.seats}</p>
            </div>
 
            <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
              <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                ⛽
              </div>
              <p className="text-sm text-gray-700">{initialVehicle.fuel}</p>
            </div>
 
            <div className="flex flex-col items-center px-4 py-3">
              <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                ❄️
              </div>
              <p className="text-sm text-gray-700">{initialVehicle.ac}</p>
            </div>
          </div>
 
          {/* --- Description --- */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {initialVehicle.description}
            </p>
          </div>
 
         {/* ---- Book Now Flow ---- */}
<div className="mt-6 space-y-4">
  {/* ---- Chat & Call Buttons ---- */}
  <div className="flex gap-3">
    <button
      className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
      onClick={() => setIsChatOpen(true)}
    >
      Chat
    </button>
    <button
      onClick={handleConfirmBooking}
      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
    >
      Call
    </button>
  </div>
</div>
 
{/* ---- Availability Date/Time Modal ---- */}
{isDateTimeModalOpen && (
  <AvailabilityDateTimeModal
    isOpen={isDateTimeModalOpen}
    onClose={() => setIsDateTimeModalOpen(false)}
    onConfirm={(startDate, endDate, startTime, endTime) => {
      setSelectedDateTime({ startDate, endDate, startTime, endTime });
      setIsDateTimeModalOpen(false);
      setShowContactButtons(true);
    }}
  />
)}
 
<PopupChat
  isOpen={isChatOpen}
  onClose={() => setIsChatOpen(false)}
  ownerName={initialVehicle.ownerName}
  ownerAvatar="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
/>
 
        </div>
      </div>
    </div>
  );
};
 
export default BookingHistory;
 
 