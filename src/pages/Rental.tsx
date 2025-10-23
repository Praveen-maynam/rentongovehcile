// // src/pages/Rental.tsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// // Images
// import BlackCar from "../assets/images/BlackCar.png";
// import AutoImage from "../assets/images/Auto.png";
// import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
// import DriverLogo from "../assets/icons/DriverLogo.png";
// import CalendarLogo from "../assets/icons/CalanderLogo.png";
// import Search from "../assets/icons/Search.png";
// import FilterLogo from "../assets/icons/FilterLogo.png";



// import FilterCard from "../components/ui/FilterCard";
// import PromoSlides from "../components/PromoSlides";
// import DateTimePicker from "../components/ui/DateTimePicker";

// interface Vehicle {
//   id: string;
//   name: string;
//   price: string | number;
//   transmission: string;
//   fuel: string;
//   seats: string | number;
//   location: string;
//   rating: string | number;
//   available: boolean;
//   type: "car" | "auto";
//   image: string;
// }

// // Vehicles data
// const vehicles: Vehicle[] = [
//   // Cars
//   {
//     id: "1",
//     name: "Hyundai Verna",
//     price: 250,
//     transmission: "Automatic",
//     fuel: "Petrol",
//     seats: "5 Seaters",
//     location: "Kakinada, Gandhi Nagar near Varnika Function Hall",
//     rating: 4.2,
//     available: false,
//     type: "car",
//     image: BlackCar,
//   },
//   {
//     id: "2",
//     name: "Honda City",
//     price: 300,
//     transmission: "Manual",
//     fuel: "Diesel",
//     seats: "5 Seaters",
//     location: "Rajahmundry, near RTC Complex",
//     rating: 4.5,
//     available: true,
//     type: "car",
//     image: BlackCar,
//   },
//   {
//     id: "7",
//     name: "Toyota Corolla",
//     price: 320,
//     transmission: "Automatic",
//     fuel: "Petrol",
//     seats: "5 Seaters",
//     location: "Vijayawada, Benz Circle",
//     rating: 4.6,
//     available: true,
//     type: "car",
//     image: BlackCar,
//   },
//   {
//     id: "8",
//     name: "Skoda Octavia",
//     price: 350,
//     transmission: "Manual",
//     fuel: "Diesel",
//     seats: "5 Seaters",
//     location: "Visakhapatnam, Dwaraka Nagar",
//     rating: 4.7,
//     available: true,
//     type: "car",
//     image: BlackCar,
//   },
//   // Autos
//   {
//     id: "3",
//     name: "Bajaj RE",
//     price: 150,
//     transmission: "Manual",
//     fuel: "CNG",
//     seats: 3,
//     location: "Kakinada, Main Road",
//     rating: 4.0,
//     available: true,
//     type: "auto",
//     image: AutoImage,
//   },
//   {
//     id: "4",
//     name: "Piaggio Ape",
//     price: 160,
//     transmission: "Manual",
//     fuel: "Diesel",
//     seats: 3,
//     location: "Rajahmundry, Kotipalli Bus Stand",
//     rating: 4.3,
//     available: true,
//     type: "auto",
//     image: AutoImage,
//   },
//   {
//     id: "5",
//     name: "TVS King",
//     price: 155,
//     transmission: "Manual",
//     fuel: "CNG",
//     seats: 3,
//     location: "Vijayawada, MG Road",
//     rating: 4.1,
//     available: true,
//     type: "auto",
//     image: AutoImage,
//   },
//   {
//     id: "6",
//     name: "Mahindra Alfa",
//     price: 165,
//     transmission: "Manual",
//     fuel: "Diesel",
//     seats: 3,
//     location: "Visakhapatnam, Dwaraka Nagar",
//     rating: 4.4,
//     available: true,
//     type: "auto",
//     image: AutoImage,
//   },
// ];

// const Rental: React.FC = () => {
//   const navigate = useNavigate();
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [searchText, setSearchText] = useState("");

//   const cars = vehicles.filter((v) => v.type === "car");
//   const autos = vehicles.filter((v) => v.type === "auto");

//   const filteredCars = cars.filter(
//     (v) =>
//       v.name.toLowerCase().includes(searchText.toLowerCase()) ||
//       v.location.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const filteredAutos = autos.filter(
//     (v) =>
//       v.name.toLowerCase().includes(searchText.toLowerCase()) ||
//       v.location.toLowerCase().includes(searchText.toLowerCase())
//   );
// const render = () => {
//   return(
//   <DateTimePicker/>
//   )
// }
  
//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col px-4 sm:px-6">
//       {/* Promo Slides */}
//       <div className="py-4">
//         <PromoSlides />
//       </div>

//      {/* Search + Filter */}
// {/* Search + Filter */}
// <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-8">
//   {/* Date & Time selectors */}
//   <div className="flex flex-col gap-2">
//     <h3 className="text-lg font-semibold text-gray-800">Select Date & Time</h3>
//     <div className="flex gap-4">
//       {/* Start Date */}
//       <div className="flex items-center w-[285px] h-[92px] bg-white border rounded-lg px-4 py-2 shadow-md cursor-pointer">
//         <img src={CalendarLogo} alt="Calendar" className="w-[30px] h-[30px]" />
//         <div className="flex flex-col ml-3 justify-center" onClick={render}>
//           <span className="text-[14px] text-gray-500 leading-none">Select Date & Time</span>
//           <span className="text-[27px] font-medium text-gray-800 mt-1" >Select</span>
//         </div>
//       </div>

//       {/* End Date */}
//       <div className="flex items-center w-[285px] h-[92px] bg-white border rounded-lg px-4 py-2 shadow-md cursor-pointer">
//         <img src={CalendarLogo} alt="Calendar" className="w-[30px] h-[30px]" />
//         <div className="flex flex-col ml-3 justify-center">
//           <span className="text-[14px] text-gray-500 leading-none">End Date & Time</span>
//           <span className="text-[27px] font-medium text-gray-800 mt-1">Select</span>
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Search + Filter */}
//   <div className="flex items-start md:items-center gap-2 w-full md:w-auto -mt-2">
//     <div className="relative flex-1 md:flex-none">
//       <img
//         src={Search}
//         alt="Search"
//         className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
//       />
//       <input
//         type="text"
//         placeholder="Search by name or location..."
//         className="w-full md:w-60 h-10 rounded-full border pl-12 pr-4 focus:outline-none"
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//       />
//     </div>
//    <button
//   onClick={() => setIsFilterOpen(true)}
//   className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-medium px-4 py-2 rounded-full shadow hover:opacity-90 transition flex items-center gap-2"
// >
//   <img src={FilterLogo} alt="Filter" className="w-6 h-4" /> {/* 24x24px */}
//   Filter
// </button>

//   </div>
// </div>


//       {/* Nearby Cars Section */}
//       <div className="py-6 w-full flex flex-col items-center">
//         <div className="flex justify-between items-center w-full sm:w-[1200px] mb-4 px-2 sm:px-0">
//           <h2 className="text-2xl font-semibold">Nearby Cars</h2>
//           <button
//             onClick={() => navigate("/cars")}
//             className="text-blue-600 font-medium hover:underline"
//           >
//             View More →
//           </button>
//         </div>
        

//         <div className="flex flex-col gap-4 sm:gap-6 w-full items-center">
//           {filteredCars.map((item) => (
//             <div
//               key={item.id}
//               className="flex flex-col sm:flex-row justify-start items-start bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition cursor-pointer w-full sm:w-[1200px] h-auto sm:h-[305px]"
//               onClick={() => navigate(`/book-now/${item.id}`)}
//             >
//               <div className="w-full sm:w-[350px] h-[200px] sm:h-full overflow-hidden rounded-lg flex-shrink-0 mb-4 sm:mb-0">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-full object-cover object-[85%_50%]"
//                 />
//               </div>

//               <div className="flex-1 mt-0 sm:mt-0 sm:ml-6 w-full sm:w-auto">
//                 <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
//                   <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
//                   <span className="flex items-center justify-center px-3 py-1 text-gray-700 text-xs sm:text-sm bg-yellow-50 rounded">
//                     ⭐ {item.rating}
//                   </span>
//                 </div>

//                 <p className="font-bold text-blue-600 text-base sm:text-lg mt-2">
//                   ₹{item.price}/hr
//                 </p>

//                 <div className="flex flex-col gap-2 mt-2 text-gray-600 text-xs sm:text-sm">
//                   <div className="flex items-center gap-2">
//                     <img src={AutomaticLogo} alt="Transmission" className="w-[20px] h-[20px]" />
//                     <span>{item.transmission}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <img src={DriverLogo} alt="Seats" className="w-[20px] h-[20px]" />
//                     <span>{item.seats}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span>⛽ {item.fuel}</span>
//                   </div>
//                   <div className="flex items-center gap-2 line-clamp-2">
//                     <span>📍 {item.location}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Autos Section */}
//       <div className="py-6 w-full flex flex-col items-start">
//         <div className="flex justify-between items-center w-full mb-4 px-2 sm:px-0">
//           <h2 className="text-2xl font-semibold">Looking for an Auto?</h2>
//           <button
//             onClick={() => navigate("/autos")}
//             className="text-blue-600 font-medium hover:underline"
//           >
//             View More →
//           </button>
//         </div>

//         <div className="flex flex-wrap justify-start sm:justify-start gap-4">
//           {filteredAutos.map((item, index) => (
//             <div key={item.id} className="flex flex-col">
//               <div
//                 className="flex flex-col bg-white shadow-md rounded-xl p-4 cursor-pointer hover:shadow-lg transition w-[250px] sm:w-[250px] h-[350px]"
//                 onClick={() => navigate(`/book-now/${item.id}`)}
//               >
//                 <div className="w-full h-[200px] sm:h-[220px] mx-auto overflow-hidden rounded-lg mb-2">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-cover object-center"
//                   />
//                 </div>

//                 <div className="flex-1 flex flex-col justify-between">
//                   <div>
//                     <div className="flex items-center justify-between mb-2">
//                       <h3 className="font-semibold text-base">{item.name}</h3>
//                       <span className="text-yellow-500 font-medium">⭐ {item.rating}</span>
//                     </div>

//                     <p className="text-blue-600 font-bold mb-2">₹{item.price}/km</p>

//                     <div className="flex items-center gap-2 text-gray-600 text-sm">
//                       <img src={DriverLogo} alt="Seats" className="w-[20px] h-[20px]" />
//                       <span>{item.seats} Seater</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {index === 0 && (
//                 <button
//                   onClick={() => navigate(`/book-now/${item.id}`)}
//                   className="mt-2 w-[250px] sm:w-[250px] bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-2 rounded-full shadow hover:opacity-90 transition"
//                 >
//                   Book Now →
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {isFilterOpen && <FilterCard onApply={() => setIsFilterOpen(false)} />}
//     </div>
//   );
// };

// export default Rental;


// src/pages/Rental.tsx

// src/pages/Rental.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Images & Icons
import BlackCar from "../assets/images/BlackCar.png";
import AutoImage from "../assets/images/Auto.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import CalendarLogo from "../assets/icons/CalanderLogo.png";
import Search from "../assets/icons/Search.png";
import FilterLogo from "../assets/icons/FilterLogo.png";
import Location from "../assets/icons/Location.png";
import Petrol from "../assets/icons/Petrol.png";

// Components
import FilterCard from "../components/ui/FilterCard";
import PromoSlides from "../components/PromoSlides";
import DateTimePicker from "../components/ui/DateTimePicker";

interface Vehicle {
  id: string;
  name: string;
  price: string | number;
  transmission: string;
  fuel: string;
  seats: string | number;
  location: string;
  rating: string | number;
  available: boolean;
  type: "car" | "auto";
  image: string;
}

// Vehicles data
const vehicles: Vehicle[] = [
  {
    id: "1",
    name: "Hyundai Verna",
    price: 250,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: "5 Seaters",
    location: "Kakinada, Gandhi Nagar near Varnika Function Hall",
    rating: 4.2,
    available: false,
    type: "car",
    image: BlackCar,
  },
  {
    id: "2",
    name: "Honda City",
    price: 300,
    transmission: "Manual",
    fuel: "Diesel",
    seats: "5 Seaters",
    location: "Rajahmundry, near RTC Complex",
    rating: 4.5,
    available: true,
    type: "car",
    image: BlackCar,
  },
  {
    id: "7",
    name: "Toyota Corolla",
    price: 320,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: "5 Seaters",
    location: "Vijayawada, Benz Circle",
    rating: 4.6,
    available: true,
    type: "car",
    image: BlackCar,
  },
  {
    id: "8",
    name: "Skoda Octavia",
    price: 350,
    transmission: "Manual",
    fuel: "Diesel",
    seats: "5 Seaters",
    location: "Visakhapatnam, Dwaraka Nagar",
    rating: 4.7,
    available: true,
    type: "car",
    image: BlackCar,
  },
  {
    id: "3",
    name: "Bajaj RE",
    price: 150,
    transmission: "Manual",
    fuel: "CNG",
    seats: 3,
    location: "Kakinada, Main Road",
    rating: 4.0,
    available: true,
    type: "auto",
    image: AutoImage,
  },
  {
    id: "4",
    name: "Piaggio Ape",
    price: 160,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 3,
    location: "Rajahmundry, Kotipalli Bus Stand",
    rating: 4.3,
    available: true,
    type: "auto",
    image: AutoImage,
  },
  {
    id: "5",
    name: "TVS King",
    price: 155,
    transmission: "Manual",
    fuel: "CNG",
    seats: 3,
    location: "Vijayawada, MG Road",
    rating: 4.1,
    available: true,
    type: "auto",
    image: AutoImage,
  },
  {
    id: "6",
    name: "Mahindra Alfa",
    price: 165,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 3,
    location: "Visakhapatnam, Dwaraka Nagar",
    rating: 4.4,
    available: true,
    type: "auto",
    image: AutoImage,
  },
];

const Rental: React.FC = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Inline DateTime picker states
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [isSelectingStart, setIsSelectingStart] = useState(true);
  const [startDate, setStartDate] = useState<number>();
  const [startTime, setStartTime] = useState<string>();
  const [endDate, setEndDate] = useState<number>();
  const [endTime, setEndTime] = useState<string>();

  const cars = vehicles.filter((v) => v.type === "car");
  const autos = vehicles.filter((v) => v.type === "auto");

  const filteredCars = cars.filter(
    (v) =>
      v.name.toLowerCase().includes(searchText.toLowerCase()) ||
      v.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredAutos = autos.filter(
    (v) =>
      v.name.toLowerCase().includes(searchText.toLowerCase()) ||
      v.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (date: number, start: string, end: string) => {
    if (isSelectingStart) {
      setStartDate(date);
      setStartTime(start);
    } else {
      setEndDate(date);
      setEndTime(end);
    }
    setShowDateTimePicker(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col px-4 sm:px-6">
      {/* Promo Slides */}
      <div className="py-4">
        <PromoSlides />
      </div>

      {/* Search + Filter + DateTime */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 py-8">
        {/* Date & Time Section */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <h3 className="text-lg font-semibold text-gray-800">Select Date & Time</h3>
          <div className="flex flex-wrap gap-4 relative">
            {/* Start Date */}
            <div
              className="flex items-center w-[285px] h-[92px] bg-white border rounded-lg px-4 py-2 shadow-md cursor-pointer"
              onClick={() => {
                setIsSelectingStart(true);
                setShowDateTimePicker(!showDateTimePicker);
              }}
            >
              <img src={CalendarLogo} alt="Calendar" className="w-[30px] h-[30px]" />
              <div className="flex flex-col ml-3 justify-center">
                <span className="text-[14px] text-gray-500 leading-none">Start Date & Time</span>
                <span className="text-[27px] font-medium text-gray-800 mt-1">
                  {startDate && startTime ? `Day ${startDate}, ${startTime}` : "Select"}
                </span>
              </div>
            </div>

            {/* End Date */}
            <div
              className="flex items-center w-[285px] h-[92px] bg-white border rounded-lg px-4 py-2 shadow-md cursor-pointer"
              onClick={() => {
                setIsSelectingStart(false);
                setShowDateTimePicker(!showDateTimePicker);
              }}
            >
              <img src={CalendarLogo} alt="Calendar" className="w-[30px] h-[30px]" />
              <div className="flex flex-col ml-3 justify-center">
                <span className="text-[14px] text-gray-500 leading-none">End Date & Time</span>
                <span className="text-[27px] font-medium text-gray-800 mt-1">
                  {endDate && endTime ? `Day ${endDate}, ${endTime}` : "Select"}
                </span>
              </div>
            </div>
          </div>

          {/* Inline Calendar Below */}
          {showDateTimePicker && (
            <div className="mt-6 border rounded-lg shadow-md bg-white p-4">
              <DateTimePicker
                isOpen={showDateTimePicker}
                onClose={() => setShowDateTimePicker(false)}
                onSelect={handleSelect}
              />
            </div>
          )}
        </div>

        {/* Search + Filter */}
        <div className="flex items-start md:items-center gap-2 w-full md:w-auto -mt-2">
          <div className="relative flex-1 md:flex-none">
            <img
              src={Search}
              alt="Search"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by name or location..."
              className="w-full md:w-60 h-10 rounded-full border pl-12 pr-4 focus:outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-medium px-4 py-2 rounded-full shadow hover:opacity-90 transition flex items-center gap-2"
          >
            <img src={FilterLogo} alt="Filter" className="w-3 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Cars */}
      <div className="py-6 w-full flex flex-col items-center">
        <div className="flex justify-between items-center w-full sm:w-[1200px] mb-4 px-2 sm:px-0">
          <h2 className="text-2xl font-semibold">Nearby Cars</h2>
          <button
            onClick={() => navigate("/cars")}
            className="text-blue-600 font-medium hover:underline"
          >
            View More →
          </button>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 w-full items-center">
          {filteredCars.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-start items-start bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition cursor-pointer w-full sm:w-[1200px] h-auto sm:h-[305px]"
              onClick={() => navigate(`/book-now/${item.id}`)}
            >
              <div className="w-full sm:w-[350px] h-[200px] sm:h-full overflow-hidden rounded-lg flex-shrink-0 mb-4 sm:mb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-[85%_50%]"
                />
              </div>

              <div className="flex-1 sm:ml-6">
                <div className="flex items-center gap-4 flex-wrap">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <span className="flex items-center justify-center px-3 py-1 text-gray-700 text-sm bg-yellow-50 rounded">
                    ⭐ {item.rating}
                  </span>
                </div>

                <p className="font-bold text-blue-600 text-lg mt-2">₹{item.price}/hr</p>

                <div className="flex flex-col gap-2 mt-2 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <img src={AutomaticLogo} alt="Transmission" className="w-5 h-5" />
                    <span>{item.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={DriverLogo} alt="Seats" className="w-5 h-5" />
                    <span>{item.seats}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={Petrol} alt="Fuel" className="w-5 h-5" />
                    <span>{item.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2 line-clamp-2">
                    <img src={Location} alt="Location" className="w-5 h-5" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Autos Section */}
      <div className="py-6 w-full flex flex-col items-start">
        <div className="flex justify-between items-center w-full mb-4 px-2 sm:px-0">
          <h2 className="text-2xl font-semibold">Looking for an Auto?</h2>
          <button
            onClick={() => navigate("/autos")}
            className="text-blue-600 font-medium hover:underline"
          >
            View More →
          </button>
        </div>

        <div className="flex flex-wrap justify-start gap-4">
          {filteredAutos.map((item, index) => (
            <div key={item.id} className="flex flex-col">
              <div
                className="flex flex-col bg-white shadow-md rounded-xl p-4 cursor-pointer hover:shadow-lg transition w-[250px] h-[350px]"
                onClick={() => navigate(`/book-now/${item.id}`)}
              >
                <div className="w-full h-[200px] overflow-hidden rounded-lg mb-2">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-base">{item.name}</h3>
                      <span className="text-yellow-500 font-medium">⭐ {item.rating}</span>
                    </div>
                    <p className="text-blue-600 font-bold mb-2">₹{item.price}/km</p>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <img src={DriverLogo} alt="Seats" className="w-5 h-5" />
                      <span>{item.seats} Seater</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {index === 0 && (
                <button
                  onClick={() => navigate(`/book-now/${item.id}`)}
                  className="mt-2 w-[250px] bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-2 rounded-full shadow hover:opacity-90 transition"
                >
                  Book Now →
                </button>
              )}
            </div>

            
          ))}
        </div>
      </div>

      {isFilterOpen && <FilterCard onApply={() => setIsFilterOpen(false)} />}
    </div>
  );
};

export default Rental;
