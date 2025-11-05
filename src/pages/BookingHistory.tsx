// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import BlackCar from "../assets/images/BlackCar.png";
// import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
// import DriverLogo from "../assets/icons/DriverLogo.png";
// import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
// import PopupChat from "../components/ui/PopupChat";
 
 
// interface VehicleDetails {
//   name: string;
//   price: string;
//   rating: string;
//   transmission: string;
//   seats: string;
//   fuel: string;
//   ac: string;
//   image: string;
//   description: string;
//   ownerName: string;
//   mobile: string;
//   email: string;
// }
 
// const BookingHistory: React.FC = () => {
//   const { vehicleName } = useParams<{ vehicleName: string }>();
//   const navigate = useNavigate();
 
//   const [currentImage, setCurrentImage] = useState(0);
//   const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
//   const [showContactButtons, setShowContactButtons] = useState(false);
//   const [selectedDateTime, setSelectedDateTime] = useState<any>(null);
//   const [isChatOpen, setIsChatOpen] = useState(false);
 
//   const vehicleImages = [BlackCar, BlackCar, BlackCar, BlackCar];
 
//   const initialVehicle: VehicleDetails = {
//     name: "Hyundai Verna",
//     price: "250",
//     rating: "4.2",
//     transmission: "Automatic",
//     seats: "5 Seaters",
//     fuel: "Petrol",
//     ac: "AC",
//     image: BlackCar,
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//     ownerName: "Manoj Kumar",
//     mobile: "1234567898",
//     email: "owner@example.com",
//   };
 
//   const handleConfirmBooking = () => {
//     alert("Calling vehicle owner...");
//   };
 
//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center">
//       <div className="max-w-[900px] w-full bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row">
//         {/* --- Vehicle Image Carousel --- */}
//         <div className="relative w-[409px] h-[309px] overflow-hidden rounded-xl shadow-md flex-shrink-0">
//           <img
//             src={vehicleImages[currentImage]}
//             alt={`${initialVehicle.name} ${currentImage + 1}`}
//             className="w-auto h-auto object-cover transition-all duration-500 ease-in-out"
//           />
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//             {vehicleImages.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setCurrentImage(idx)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   idx === currentImage ? "bg-white" : "bg-gray-400"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
 
//         {/* --- Vehicle Details Section --- */}
//         <div className="flex flex-col ml-6 mt-6 md:mt-0 flex-1">
//           <div className="flex items-center justify-between">
//             <h1 className="text-3xl font-semibold">{initialVehicle.name}</h1>
//             <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-md">
//               <span className="text-sm font-semibold text-yellow-800">
//                 ★ {initialVehicle.rating}
//               </span>
//             </div>
//           </div>
 
//           <div className="flex items-baseline mt-2">
//             <span className="text-3xl font-bold">₹{initialVehicle.price}</span>
//             <span className="text-gray-500 ml-2 text-sm">/hr</span>
//           </div>
 
//           {/* --- Icons Row --- */}
//           <div className="flex items-center mt-4 border border-gray-300 rounded-xl overflow-hidden">
//             <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//               <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
//                 <img src={AutomaticLogo} alt="Auto" className="w-6 h-6" />
//               </div>
//               <p className="text-sm text-gray-700">{initialVehicle.transmission}</p>
//             </div>
 
//             <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//               <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
//                 <img src={DriverLogo} alt="Seats" className="w-6 h-6" />
//               </div>
//               <p className="text-sm text-gray-700">{initialVehicle.seats}</p>
//             </div>
 
//             <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//               <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
//                 ⛽
//               </div>
//               <p className="text-sm text-gray-700">{initialVehicle.fuel}</p>
//             </div>
 
//             <div className="flex flex-col items-center px-4 py-3">
//               <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
//                 ❄️
//               </div>
//               <p className="text-sm text-gray-700">{initialVehicle.ac}</p>
//             </div>
//           </div>
 
//           {/* --- Description --- */}
//           <div className="mt-6">
//             <h2 className="text-xl font-semibold mb-2">Description</h2>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               {initialVehicle.description}
//             </p>
//           </div>
//  {/* ---- Book Now Flow ---- */}
// <div className="mt-6 space-y-4">
//   {/* ---- Chat & Call Buttons ---- */}
//   <div className="flex gap-3 mt-4">
//     {/* Chat Button */}
//     <button
//       onClick={() => setIsChatOpen(true)}
//       className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//     >
//       <svg
//         className="w-5 h-5"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//         />
//       </svg>
//       Chat
//     </button>

//     {/* Call Button */}
//     <button
//       onClick={handleConfirmBooking}
//       className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//     >
//       <svg
//         className="w-5 h-5"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//         />
//       </svg>
//       Call
//     </button>
//   </div>
// </div>

 
// {/* ---- Availability Date/Time Modal ---- */}
// {isDateTimeModalOpen && (
//   <AvailabilityDateTimeModal
//     isOpen={isDateTimeModalOpen}
//     onClose={() => setIsDateTimeModalOpen(false)}
//     onConfirm={(startDate, endDate, startTime, endTime) => {
//       setSelectedDateTime({ startDate, endDate, startTime, endTime });
//       setIsDateTimeModalOpen(false);
//       setShowContactButtons(true);
//     }}
//   />
// )}
 
// <PopupChat
//   isOpen={isChatOpen}
//   onClose={() => setIsChatOpen(false)}
//   ownerName={initialVehicle.ownerName}
//   ownerAvatar="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
// />
 
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default BookingHistory;
 
 
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
import PopupChat from "../components/ui/PopupChat";

const API_BASE_URL = "http://52.66.238.227:3000";

interface VehicleData {
  _id: string;
  // Car fields
  CarName?: string;
  CarModel?: string;
  CarNumber?: string;
  Carseater?: string;
  RentPerHour?: number;
  RentPerDay?: number;
  carImages?: string[];
  fuelType?: string;
  transmissionType?: string;
  Ac_available?: boolean;
  kmDriven?: number;
  
  // Bike fields
  bikeName?: string;
  bikeModel?: string;
  bikeNumber?: string;
  pricePerKm?: number;
  bikeImages?: string[];
  bikeCC?: string;
  
  // Common fields
  description?: string;
  contactName?: string;
  contactNumber?: string;
  Available?: boolean;
  pickupCity?: string;
  pickupCityState?: string;
  pickupArea?: string;
  latitude?: string;
  longitude?: string;
}

const BookingHistory: React.FC = () => {
  const { vehicleId: urlVehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
  const [showContactButtons, setShowContactButtons] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Get data from navigation state
  const passedVehicleData = location.state?.vehicleData;
  const passedBooking = location.state?.booking; // From MyBookings page
  const openContact = location.state?.openContact || false;
  
  // Determine vehicle type and ID from either vehicleData, booking, or URL
  const vehicleType = passedVehicleData?.type || 
                      (passedBooking?.vehicleType?.toLowerCase().includes('bike') ? 'bike' : 'car') || 
                      'bike';
  const vehicleId = passedVehicleData?.id || passedBooking?.vehicleId || urlVehicleId;

  // Auto-open chat if coming from MyBookings with openContact flag
  useEffect(() => {
    if (openContact && passedBooking) {
      setIsChatOpen(true);
    }
  }, [openContact, passedBooking]);

  // Fetch vehicle details from API
  useEffect(() => {
    if (!vehicleId) {
      setError("No vehicle ID provided");
      setLoading(false);
      return;
    }

    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        const endpoint = vehicleType === "car" 
          ? `${API_BASE_URL}/getCarById/${vehicleId}`
          : `${API_BASE_URL}/getBikeById/${vehicleId}`;

        const response = await fetch(endpoint, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // Handle different response formats
        const data = result.car || result.bike || result.data;
        
        if (data) {
          setVehicleData(data);
        } else {
          throw new Error("Vehicle data not found");
        }
      } catch (err) {
        console.error("Error fetching vehicle details:", err);
        setError("Failed to load vehicle details");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [vehicleId, vehicleType]);

  const handleConfirmBooking = () => {
    if (vehicleData?.contactNumber) {
      window.location.href = `tel:${vehicleData.contactNumber}`;
    } else {
      alert("Contact number not available");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || "Vehicle not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Get display values based on vehicle type
  const isCar = vehicleType === "car";
  const vehicleImages = isCar 
    ? (vehicleData.carImages || []) 
    : (vehicleData.bikeImages || []);
  
  const displayName = isCar 
    ? vehicleData.CarName || passedBooking?.vehicleName || "Unknown Vehicle"
    : vehicleData.bikeName || passedBooking?.vehicleName || "Unknown Bike";
  
  const displayModel = isCar
    ? vehicleData.CarModel || "N/A"
    : vehicleData.bikeModel || "N/A";
  
  const displayPrice = isCar
    ? vehicleData.RentPerHour || passedBooking?.price || 0
    : vehicleData.pricePerKm || passedBooking?.price || 0;
  
  const priceUnit = isCar ? "/hr" : "/km";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center">
      <div className="max-w-[900px] w-full bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row">
        {/* Vehicle Image Carousel */}
        <div className="relative w-full md:w-[409px] h-[309px] overflow-hidden rounded-xl shadow-md flex-shrink-0">
          {vehicleImages.length > 0 ? (
            <>
              <img
                src={vehicleImages[currentImage]}
                alt={`${displayName} ${currentImage + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {vehicleImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentImage ? "bg-white scale-110" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-lg">No Image Available</span>
            </div>
          )}
        </div>

        {/* Vehicle Details Section */}
        <div className="flex flex-col ml-0 md:ml-6 mt-6 md:mt-0 flex-1">
          {/* Show booking info banner if coming from MyBookings */}
          {passedBooking && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-blue-900">Your Booking Details</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  passedBooking.status === 'Booked' ? 'bg-green-100 text-green-700' :
                  passedBooking.status === 'Picked' ? 'bg-yellow-100 text-yellow-700' :
                  passedBooking.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {passedBooking.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                <div>
                  <span className="font-medium">From:</span> {passedBooking.startDate} {passedBooking.startTime}
                </div>
                <div>
                  <span className="font-medium">To:</span> {passedBooking.endDate} {passedBooking.endTime}
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Booking ID:</span> {passedBooking.id?.slice(0, 10)}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">{displayName}</h1>
            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-md">
              <span className="text-sm font-semibold text-yellow-800">★ 4.2</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-1">{displayModel}</p>

          <div className="flex items-baseline mt-2">
            <span className="text-3xl font-bold">₹{vehicleData.RentPerDay || "0"}</span>
            <span className="text-gray-500 ml-2 text-sm">{priceUnit}</span>
          </div>

          {/* Icons Row */}
          <div className="flex items-center mt-4 border border-gray-300 rounded-xl overflow-hidden">
            {isCar ? (
              <>
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                    <img src={AutomaticLogo} alt="Transmission" className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-gray-700">{vehicleData.transmissionType || "Manual"}</p>
                </div>

                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                    <img src={DriverLogo} alt="Seats" className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-gray-700">{vehicleData.Carseater || "5"} Seater</p>
                </div>

                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                    ⛽
                  </div>
                  <p className="text-sm text-gray-700">{vehicleData.fuelType || "Petrol"}</p>
                </div>

                <div className="flex flex-col items-center px-4 py-3">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                    ❄️
                  </div>
                  <p className="text-sm text-gray-700">{vehicleData.Ac_available ? "AC" : "Non-AC"}</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                    🏍️
                  </div>
                  <p className="text-sm text-gray-700">Bike</p>
                </div>

                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                    ⚡
                  </div>
                  <p className="text-sm text-gray-700">{vehicleData.bikeCC || "N/A"} CC</p>
                </div>

                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                    ⛽
                  </div>
                  <p className="text-sm text-gray-700">{vehicleData.fuelType || "Petrol"}</p>
                </div>

                <div className="flex flex-col items-center px-4 py-3">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                    📍
                  </div>
                  <p className="text-sm text-gray-700">{vehicleData.pickupCity || "N/A"}</p>
                </div>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {vehicleData.description || "No description available"}
            </p>
          </div>

          {/* Book Now Flow */}
          <div className="mt-6 space-y-4">
            {/* Chat & Call Buttons */}
            <div className="flex gap-3 mt-4">
              {/* Chat Button */}
              <button
                onClick={() => setIsChatOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Chat
              </button>

              {/* Call Button */}
              <button
                onClick={handleConfirmBooking}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call
              </button>
            </div>
          </div>

          {/* Availability Date/Time Modal */}
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

          {/* Popup Chat */}
          <PopupChat
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
            ownerName={vehicleData.contactName || "Owner"}
            ownerAvatar={`https://ui-avatars.com/api/?name=${encodeURIComponent(vehicleData.contactName || "Owner")}&background=6B7280&color=fff&size=48`}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;