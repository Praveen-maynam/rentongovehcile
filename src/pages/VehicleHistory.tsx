// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { MoreVertical } from "lucide-react";
// import BlackCar from "../assets/images/BlackCar.png";
// import BlackCar2 from "../assets/images/BlackCar.png";
// import BlackCar3 from "../assets/images/BlackCar.png";
// import BlackCar4 from "../assets/images/BlackCar.png";
// import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
// import DriverLogo from "../assets/icons/DriverLogo.png";

// interface BookingHistory {
//   customerName: string;
//   startDate: string;
//   startTime: string;
//   endDate: string;
//   endTime: string;
//   mobile: string;
//   status: "Booked" | "Picked" | "Completed";
// }

// const VehicleHistory: React.FC = () => {
//   const { vehicleName } = useParams<{ vehicleName: string }>();
//   const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
//   const [currentImage, setCurrentImage] = useState(0);

//   const vehicleImages = [BlackCar, BlackCar2, BlackCar3, BlackCar4];

//   const vehicle = {
//     name: "Hyundai Verna",
//     price: "250",
//     rating: "4.2",
//     transmission: "Automatic",
//     seats: "5 Seaters",
//     fuel: "Petrol",
//     ac: "AC",
//     image: BlackCar,
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//   };

//   const bookingHistory: BookingHistory[] = [
//     {
//       customerName: "Manoj Kumar",
//       startDate: "30-10-2025",
//       startTime: "11 AM",
//       endDate: "30-10-2025",
//       endTime: "11 AM",
//       mobile: "1234567898",
//       status: "Booked",
//     },
//     {
//       customerName: "Manoj Kumar",
//       startDate: "30-10-2025",
//       startTime: "11 AM",
//       endDate: "30-10-2025",
//       endTime: "11 AM",
//       mobile: "1234567898",
//       status: "Picked",
//     },
//     {
//       customerName: "Manoj Kumar",
//       startDate: "30-10-2025",
//       startTime: "11 AM",
//       endDate: "30-10-2025",
//       endTime: "11 AM",
//       mobile: "1234567898",
//       status: "Completed",
//     },
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Booked":
//         return "text-green-600 bg-green-50 border-green-300";
//       case "Picked":
//         return "text-yellow-600 bg-yellow-50 border-yellow-300";
//       case "Completed":
//         return "text-blue-600 bg-blue-50 border-blue-300";
//       default:
//         return "text-gray-600 bg-gray-50 border-gray-300";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-6 flex justify-center">
//       <div className="max-w-[1228px] w-full flex flex-col md:flex-row gap-10">
//         {/* Left Section - Image + Details */}
//         <div className="flex flex-col md:flex-row bg-white p-6 rounded-2xl shadow-lg w-full md:w-[860px]">
//           {/* Car Image Slider */}
//           <div className="relative w-[409px] h-[409px] overflow-hidden rounded-xl shadow-md flex-shrink-0">
//             {/* Current Image */}
//             <img
//               src={vehicleImages[currentImage]}
//               alt={`${vehicle.name} ${currentImage + 1}`}
//               className="w-full h-full object-cover transition-all duration-500 ease-in-out"
//             />

//             {/* Dots inside the image */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//               {vehicleImages.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentImage(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === currentImage ? "bg-white" : "bg-gray-400"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Vehicle Details */}
//           <div className="flex flex-col ml-6 mt-6 md:mt-0">
//             <div className="flex items-center justify-between">
//               <h1 className="text-3xl font-semibold">{vehicle.name}</h1>
//               <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-md">
//                 <span className="text-sm font-semibold text-yellow-800">
//                   ★ {vehicle.rating}
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-baseline mt-2">
//               <span className="text-3xl font-bold">₹{vehicle.price}</span>
//               <span className="text-gray-500 ml-2 text-sm">/hr</span>
//             </div>

//             {/* Specifications */}
//             <div className="flex items-center mt-4 border border-gray-300 rounded-xl overflow-hidden">
//               {/* Transmission */}
//               <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                 <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
//                   <img src={AutomaticLogo} alt="Auto" className="w-6 h-6" />
//                 </div>
//                 <p className="text-sm text-gray-700">{vehicle.transmission}</p>
//               </div>

//               {/* Seats */}
//               <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                 <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
//                   <img src={DriverLogo} alt="Seats" className="w-6 h-6" />
//                 </div>
//                 <p className="text-sm text-gray-700">{vehicle.seats}</p>
//               </div>

//               {/* Fuel */}
//               <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                 <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
//                   <span className="text-lg">⛽</span>
//                 </div>
//                 <p className="text-sm text-gray-700">{vehicle.fuel}</p>
//               </div>

//               {/* AC */}
//               <div className="flex flex-col items-center px-4 py-3">
//                 <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
//                   <span className="text-lg">❄️</span>
//                 </div>
//                 <p className="text-sm text-gray-700">{vehicle.ac}</p>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="mt-6">
//               <h2 className="text-xl font-semibold mb-2">Description</h2>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {vehicle.description}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Booking History */}
//         <div className="w-full md:w-[330px] flex flex-col">
//           <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
//           <div className="space-y-4">
//             {bookingHistory.map((booking, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-200 rounded-xl p-4 relative hover:shadow-md transition"
//               >
//                 <button
//                   onClick={() =>
//                     setMenuOpenIndex(menuOpenIndex === index ? null : index)
//                   }
//                   className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//                 >
//                   <MoreVertical className="w-5 h-5" />
//                 </button>

//                 <h3 className="font-semibold text-gray-800 mb-1">
//                   {booking.customerName}
//                 </h3>

//                 <p className="text-sm text-gray-600">
//                   From: <span className="font-medium">{booking.startDate}</span>{" "}
//                   | To: <span className="font-medium">{booking.endDate}</span>
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Time: {booking.startTime} - {booking.endTime}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Mobile No: <span className="font-medium">{booking.mobile}</span>
//                 </p>

//                 <div className="flex justify-start items-center mt-2">
//                   <p
//                     className={`text-xs px-2 py-1 border rounded-md font-medium ${getStatusColor(
//                       booking.status
//                     )}`}
//                   >
//                     {booking.status}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleHistory;
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import BlackCar from "../assets/images/BlackCar.png";
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

const VehicleHistory: React.FC = () => {
  const { vehicleName } = useParams<{ vehicleName: string }>();
  const [editOpen, setEditOpen] = useState(false);

  const vehicleImages = [BlackCar, BlackCar, BlackCar, BlackCar];
  const [currentImage, setCurrentImage] = useState(0);

  const bookingHistory: BookingHistory[] = [
    { customerName: "Manoj Kumar", startDate: "30-10-2025", startTime: "11 AM", endDate: "30-10-2025", endTime: "11 AM", mobile: "1234567898", status: "Booked" },
    { customerName: "Manoj Kumar", startDate: "30-10-2025", startTime: "11 AM", endDate: "30-10-2025", endTime: "11 AM", mobile: "1234567898", status: "Picked" },
    { customerName: "Manoj Kumar", startDate: "30-10-2025", startTime: "11 AM", endDate: "30-10-2025", endTime: "11 AM", mobile: "1234567898", status: "Completed" },
  ];
   const [editingBookingIndex, setEditingBookingIndex] = useState<number | null>(null);
  const [tempBooking, setTempBooking] = useState<BookingHistory>({
    customerName: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    mobile: "",
    status: "Booked",
  });

  const initialVehicle: VehicleDetails = {
    name: "Hyundai Verna",
    price: "250",
    rating: "4.2",
    transmission: "Automatic",
    seats: "5 Seaters",
    fuel: "Petrol",
    ac: "AC",
    image: BlackCar,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ownerName: "Manoj Kumar",
    mobile: "1234567898",
    email: "owner@example.com",
  };

  const [editVehicle, setEditVehicle] = useState<VehicleDetails>(initialVehicle);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditVehicle(prev => ({ ...prev, [name]: value }));
  };
    const [drivingLicence, setDrivingLicence] = useState(false);
  const [aadhaarCard, setAadhaarCard] = useState(false);
  const [depositVehicle, setDepositVehicle] = useState(false);
  const [depositMoney, setDepositMoney] = useState(false);
  const [acAvailable, setAcAvailable] = useState(false);

  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi"];
  const cities: { [key: string]: string[] } = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    
    Delhi: ["New Delhi", "Dwarka", "Rohini"],
  };
  
  const [pincode, setPincode] = useState("");
  const [street, setStreet] = useState("");
  const [doorName, setDoorName] = useState("");

  
  const renderToggle = (state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>) => (
    <button
      onClick={() => setState(!state)}
      className={`w-12 h-6 rounded-full relative flex items-center transition-colors duration-300 ${
        state ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
          state ? "translate-x-6" : "translate-x-0.5"
        }`}
      ></span>
    </button>
  );
    const [price, setPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

  const handleSelectHour = (hour: string) => {
    setSelectedHour(hour);
    setIsModalOpen(false);
  };
  

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6 flex justify-center">
      <div className="max-w-[1228px] w-full flex flex-col md:flex-row gap-10">
        {/* Left Section */}
        <div className="flex flex-col md:flex-row bg-white p-6 rounded-2xl shadow-lg w-full md:w-[860px]">
          <div className="relative w-[409px] h-[409px] overflow-hidden rounded-xl shadow-md flex-shrink-0">
            <img
              src={vehicleImages[currentImage]}
              alt={`${initialVehicle.name} ${currentImage + 1}`}
              className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {vehicleImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentImage ? "bg-white" : "bg-gray-400"}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col ml-6 mt-6 md:mt-0">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold">{initialVehicle.name}</h1>
              <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-md">
                <span className="text-sm font-semibold text-yellow-800">★ {initialVehicle.rating}</span>
              </div>
            </div>
            <div className="flex items-baseline mt-2">
              <span className="text-3xl font-bold">₹{initialVehicle.price}</span>
              <span className="text-gray-500 ml-2 text-sm">/hr</span>
            </div>

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
                <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">⛽</div>
                <p className="text-sm text-gray-700">{initialVehicle.fuel}</p>
              </div>
              <div className="flex flex-col items-center px-4 py-3">
                <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">❄️</div>
                <p className="text-sm text-gray-700">{initialVehicle.ac}</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{initialVehicle.description}</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[350px] flex flex-col gap-4">
          {!editOpen ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
              <div className="space-y-4">
                {bookingHistory.map((booking, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4 relative hover:shadow-md transition">
                    <button
                      onClick={() => setEditOpen(true)}
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    <h3 className="font-semibold text-gray-800 mb-1">{booking.customerName}</h3>
                    <p className="text-sm text-gray-600">{booking.startDate} - {booking.endDate}</p>
                    <p className="text-sm text-gray-600">{booking.startTime} - {booking.endTime}</p>
                    <p className="text-sm text-gray-600">Mobile: {booking.mobile}</p>
                    <p className="text-xs font-medium mt-1">{booking.status}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
           <div className="flex flex-col gap-4">
  {/* Edit Card Header */}
  <div className="flex items-center justify-center  border-gray-400 w-[276px]">
    <span className="font-bold text-gray-700 text-4xl">Edit Car Details</span>
  </div>



              {/* Description Heading */}
<div className="text-gray-700 font-semibold text-xl">
  Description
</div>

{/* Main Description Box */}
<div className="bg-white shadow-md rounded-md w-[343px] h-[167px] border-2 border-gray-300 p-4">
  {/* Heading inside box */}
  <h3 className="text-base font-semibold text-gray-800 mb-2">
    Car Description
  </h3>

  {/* Editable Description Content */}
  <textarea
    className="w-full h-[100px] text-sm text-gray-600 resize-none outline-none"
    value={editVehicle.description}
    onChange={(e) =>
      setEditVehicle({ ...editVehicle, description: e.target.value })
    }
    placeholder="Enter car description..."
  />
</div>

<div className="flex items-center justify-between w-[343px] mt-4">
  {/* Heading */}
  <div className="text-gray-700 font-semibold text-lg">
     AC Available
  </div>

  {/* Toggle Button */}
  <button
    onClick={() => setAcAvailable(!acAvailable)}
    className={`w-12 h-6 rounded-full relative flex items-center transition-colors duration-300 ${
      acAvailable ? "bg-green-500" : "bg-gray-300"
    }`}
  >
    <span
      className={`absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
        acAvailable ? "translate-x-6" : "translate-x-1"
      }`}
    ></span>
  </button>
</div>

    {/* Rent Price and Hour Box */}
              <div className="text-gray-700 font-semibold text-2xl mt-4">Price</div>
              <div className="flex items-center mt-2 space-x-2">
                <div className="w-[257px] h-[57px] border-2 border-gray-400 rounded-md p-1 flex flex-col justify-center relative">
                  <span className="absolute -top-2 left-2 bg-white px-1 text-gray-500 text-sm">Rent Price</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    className="font-semibold text-gray-800 text-lg mt-1 outline-none bg-transparent w-full px-2"
                  />
                </div>

                <div
                  className="w-[82px] h-[48px] border-2 border-gray-400 rounded-md flex items-center justify-between px-3 cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="text-gray-800 font-medium text-sm">
                    {selectedHour || "Hour"}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Hour Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg p-4 w-[300px] max-h-[400px] overflow-y-auto shadow-lg">
                    <h2 className="text-gray-800 text-lg font-semibold mb-3 text-center">Select Hour</h2>
                    <div className="grid grid-cols-3 gap-2">
                      {hours.map((hour) => (
                        <button
                          key={hour}
                          onClick={() => handleSelectHour(hour)}
                          className="border border-gray-300 rounded-md py-2 hover:bg-blue-100 transition"
                        >
                          {hour}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            {/* Contact Information Heading */}
<h1 className="text-2xl font-bold text-gray-800 mt-6">
  Your Contact Information
</h1>


{/* Name Input Box */}
<div className="w-[343px] h-[48px] border-2 border-gray-400 rounded-md p-2 flex items-center relative mt-4">
  {/* Label */}
  <span className="absolute -top-2 left-2 bg-white px-1 text-gray-500 text-sm">
    Name
  </span>

  {/* Editable Input Field */}
  <input
    type="text"
    placeholder="Enter your name"
    className="w-full text-gray-800 font-medium text-base ml-1 outline-none bg-transparent"
  />
</div>

{/* Contact Number Input Box */}
<div className="w-[343px] h-[48px] border-2 border-gray-400 rounded-md p-2 flex items-center relative mt-4">
  {/* Label */}
  <span className="absolute -top-2 left-2 bg-white px-1 text-gray-500 text-sm">
    Contact Number
  </span>

  {/* Editable Input Field */}
  <input
    type="tel"
    placeholder="Enter your mobile number"
    className="w-full text-gray-800 font-medium text-base ml-1 outline-none bg-transparent"
  />
</div>

      {/* Document Toggles */}
              <h2 className="text-2xl font-semibold text-gray-800 mt-6">Customer Required Documents</h2>

              <div className="w-[343px] h-[48px] p-2 flex items-center justify-between relative mt-6">
                <span className="text-2xl font-medium text-gray-800">Driving Licence</span>
                {renderToggle(drivingLicence, setDrivingLicence)}
              </div>
              <div className="w-[343px] h-[48px] p-2 flex items-center justify-between relative mt-4">
                <span className="text-2xl font-medium text-gray-800">Aadhaar Card</span>
                {renderToggle(aadhaarCard, setAadhaarCard)}
              </div>
              <div className="w-[343px] h-[48px] border-2 border-gray-400 rounded-md p-2 flex items-center justify-between relative mt-4">
                <span className="text-2xl font-medium text-gray-800">Deposit Vehicle</span>
                {renderToggle(depositVehicle, setDepositVehicle)}
              </div>
              <div className="w-[343px] h-[48px] border-2 border-gray-400 rounded-md p-2 flex items-center justify-between relative mt-4">
                <span className="absolute -top-2 left-2 bg-white px-1 text-gray-500 text-sm">Deposit Money</span>
                <span className="text-2xl font-medium text-gray-800">₹5000</span>
                {renderToggle(depositMoney, setDepositMoney)}
              </div>

 <h2 className="text-2xl font-semibold text-gray-800 mt-6">
                Vehicle Picking Address
              </h2>

              <div className="relative">
                {/* State */}
                <div
                  className="w-[343px] h-[48px] border-2 border-gray-400 rounded-md p-2 flex items-center justify-between mt-4 cursor-pointer"
                  onClick={() => setStateOpen(!stateOpen)}
                >
                  <span className="absolute -top-2 left-2 bg-white px-1 text-gray-500 text-sm">State</span>
                  <span className="text-2xl font-medium text-gray-800">{selectedState || "Select State"}</span>
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>

                {stateOpen && (
                  <div className="absolute top-[50px] left-0 w-[343px] bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                    {states.map((state) => (
                      <div
                        key={state}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedState(state);
                          setSelectedCity(null);
                          setStateOpen(false);
                        }}
                      >
                        {state}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* City */}
              <div className="relative">
                <div
                  className="w-[343px] h-[48px] border-2 border-gray-400 rounded-md p-2 flex items-center justify-between mt-4 cursor-pointer"
                  onClick={() => selectedState && setCityOpen(!cityOpen)}
                >
                  <span className="absolute -top-2 left-2 bg-white px-1 text-gray-500 text-sm">City</span>
                  <span className="text-2xl font-medium text-gray-800">{selectedCity || "Select City"}</span>
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>

                {cityOpen && selectedState && (
                  <div className="absolute top-[50px] left-0 w-[343px] bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                    {cities[selectedState].map((city) => (
                      <div
                        key={city}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedCity(city);
                          setCityOpen(false);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Address Form Fields */}
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Pincode"
                className="w-[343px] h-[48px] border-2 border-gray-400 rounded-md p-2 mt-2"
              />
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Street"
                className="w-[343px] h-[48px] border-2 border-gray-400 rounded-md p-2 mt-2"
              />
              <input
                type="text"
                value={doorName}
                onChange={(e) => setDoorName(e.target.value)}
                placeholder="Door Name"
                className="w-[343px] h-[48px] border-2 border-gray-400 rounded-md p-2 mt-2"
              />
              

              <button className="w-[343px] h-[48px] bg-blue-600 text-white rounded-md mt-4">
                Save
              </button>
              <button className="w-[343px] h-[48px] border-2 border-red-500 text-red-500 bg-white rounded-md mt-2 hover:bg-red-50 transition">
  Delete
</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default VehicleHistory;