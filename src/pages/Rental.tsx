
// import React, { useState } from "react";
// import { Search } from "lucide-react";
// import VehicleSection from "../components/VehicleSection";
// import DateTimePicker from "../components/ui/DateTimePicker";
// import FilterCard from "../components/ui/FilterCard";
// import PromoSlides from "../components/PromoSlides";
// import { vehicles } from "./data/Vehicle";
// import Filter from "../assets/icons/FilterLogo.png";
// import NearbyCars from "./NearByCars";
// import NearbyBikes from "./NearByBikes";
//  import { useNavigate } from "react-router-dom";

// const Rental: React.FC = (FeedbackModal) => {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const navigate = useNavigate();
//   const [searchText, setSearchText] = useState("");
//   const [startDate, setStartDate] = useState<string>(
//     new Date().toISOString().split("T")[0]
//   );
//   const [endDate, setEndDate] = useState<string>(
//     new Date().toISOString().split("T")[0]
//   );

//   // ✅ Filter vehicles by search text
//   const filterVehicles = (list: typeof vehicles) =>
//     list.filter(
//       (v) =>
//         v.name.toLowerCase().includes(searchText.toLowerCase()) ||
//         v.location?.toLowerCase().includes(searchText.toLowerCase())
//     );

//   const cars = filterVehicles(vehicles.filter((v) => v.type === "Car"));
//   // const autos = filterVehicles(vehicles.filter((v) => v.type === "auto"));
//   const bikes = filterVehicles(vehicles.filter((v) => v.type === "Bike"));


//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       {/* 🔹 Promo Slides */}
//       <div className="px-6 py-4">
//         <PromoSlides />
//       </div>

//       {/* 🔹 Search & Date Pickers */}
//       <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h3 className="text-lg font-semibold mb-2 text-gray-800">
//             Select Date & Time
//           </h3>

//           {/* ✅ Horizontal Calendars */}
//           <div className="flex flex-col sm:flex-row gap-3">
//             <DateTimePicker
//               value={startDate}
//               onChange={setStartDate}
//               minDate={new Date().toISOString().split("T")[0]}
//             />
//             <DateTimePicker
//               value={endDate}
//               onChange={setEndDate}
//               minDate={startDate}
//             />
//           </div>
//         </div>

//         {/* 🔹 Search & Filter */}
//         <div className="flex gap-2 w-full md:w-auto">
//           <div className="flex items-center bg-white border rounded-full relative flex-1 md:w-[300px] h-[40px]">
//             <Search className="w-6 h-6 text-gray-500 mr-4 ml-2" />

//             <input
//               type="text"
//               placeholder="Search by name or location..."
//               className="flex-1 outline-none text-gray-700 text-sm"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </div>
//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="flex items-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-lm font-semibold px-4 py-1 rounded-md hover:opacity-100 transition-all"
//           >
//             <img src={Filter} alt="Filter" className="w-6 h-6" />
//             Filter
//           </button>
//         </div>
//       </div>

//       {/* 🚗 Cars Section */}
//       <div className="px-6">

//         <div className="flex justify-end mt-[-10px] mb-6">
//           <button
//             onClick={() => navigate("/nearby-cars")}
//             className="text-[#0B0E92] font-semibold hover:underline"
//           >
//             View More →
//           </button>
//         </div>
//            <NearbyCars/>
//       </div>

//       {/* 🏍 Bikes Section */}
//       <div className="px-6">

//         <div className="flex justify-end mt-[-10px] mb-6">
//           <button
//             onClick={() => navigate("/nearby-bikes")}
//             className="text-[#0B0E92] font-semibold hover:underline"
//           >
//             View More →
//           </button>
//         </div>
//         <NearbyBikes/>
//       </div>

//       {/* 🔹 Filter Modal */}
//       {isFilterOpen && <FilterCard onApply={() => setIsFilterOpen(false)} />}
//     </div>
//   );
// };

// export default Rental;


// import React, { useState } from "react";
// import { Search } from "lucide-react";
// import VehicleSection from "../components/VehicleSection";
// import DateTimePicker from "../components/ui/DateTimePicker";
// import FilterCard from "../components/ui/FilterCard";
// import PromoSlides from "../components/PromoSlides";
// import { vehicles } from "./data/Vehicle";
// import Filter from "../assets/icons/FilterLogo.png";
// import NearbyCars from "./NearByCars";
// import NearbyBikes from "./NearByBikes";
//  import { useNavigate } from "react-router-dom";

// const Rental: React.FC = (FeedbackModal) => {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const navigate = useNavigate();
//   const [searchText, setSearchText] = useState("");
//   const [startDate, setStartDate] = useState<string>(
//     new Date().toISOString().split("T")[0]
//   );
//   const [endDate, setEndDate] = useState<string>(
//     new Date().toISOString().split("T")[0]
//   );

//   // ✅ Filter vehicles by search text
//   const filterVehicles = (list: typeof vehicles) =>
//     list.filter(
//       (v) =>
//         v.name.toLowerCase().includes(searchText.toLowerCase()) ||
//         v.location?.toLowerCase().includes(searchText.toLowerCase())
//     );

//   const cars = filterVehicles(vehicles.filter((v) => v.type === "Car"));
//   // const autos = filterVehicles(vehicles.filter((v) => v.type === "auto"));
//   const bikes = filterVehicles(vehicles.filter((v) => v.type === "Bike"));


//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       {/* 🔹 Promo Slides */}
//       <div className="px-6 py-4">
//         <PromoSlides />
//       </div>

//       {/* 🔹 Search & Date Pickers */}
//       <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h3 className="text-lg font-semibold mb-2 text-gray-800">
//             Select Date & Time
//           </h3>

//           {/* ✅ Horizontal Calendars */}
//           <div className="flex flex-col sm:flex-row gap-3">
//             <DateTimePicker
//               value={startDate}
//               onChange={setStartDate}
//               minDate={new Date().toISOString().split("T")[0]}
//             />
//             <DateTimePicker
//               value={endDate}
//               onChange={setEndDate}
//               minDate={startDate}
//             />
//           </div>
//         </div>

//         {/* 🔹 Search & Filter */}
//         <div className="flex gap-2 w-full md:w-auto">
//           <div className="flex items-center bg-white border rounded-full relative flex-1 md:w-[300px] h-[40px]">
//             <Search className="w-6 h-6 text-gray-500 mr-4 ml-2" />

//             <input
//               type="text"
//               placeholder="Search by name or location..."
//               className="flex-1 outline-none text-gray-700 text-sm"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </div>

//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="flex items-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-lm font-semibold px-4 py-1 rounded-md hover:opacity-100 transition-all"
//           >
//             <img src={Filter} alt="Filter" className="w-6 h-6" />
//             Filter
//           </button>
//         </div>
//       </div>

//       {/* 🚗 Cars Section */}
//       <div className="px-6">

//         <div className="flex justify-end mt-[-10px] mb-6">
//           <button
//             onClick={() => navigate("/nearby-cars")}
//             className="text-[#0B0E92] font-semibold hover:underline"
//           >
//             View More →
//           </button>
//         </div>
//            <NearbyCars/>
//       </div>

//       {/* 🏍 Bikes Section */}
//       <div className="px-6">

//         <div className="flex justify-end mt-[-10px] mb-6">
//           <button
//             onClick={() => navigate("/nearby-bikes")}
//             className="text-[#0B0E92] font-semibold hover:underline"
//           >
//             View More →
//           </button>
//         </div>
//         <NearbyBikes/>
//       </div>

//       {/* 🔹 Filter Modal */}
//       {isFilterOpen && <FilterCard onApply={() => setIsFilterOpen(false)} />}
//     </div>
//   );
// };

// export default Rental;





// import React, { useState } from "react";
// import { Search } from "lucide-react";
// import VehicleSection from "../components/VehicleSection";
// import DateTimePicker from "../components/ui/DateTimePicker";
// import FilterCard, { FilterState } from "../components/ui/FilterCard";
// import PromoSlides from "../components/PromoSlides";
// import { vehicles } from "./data/Vehicle";
// import Filter from "../assets/icons/FilterLogo.png";
// import NearbyCars from "./NearByCars";
// import NearbyBikes from "./NearByBikes";
//  import { useNavigate } from "react-router-dom";
// //  import Call from "../components/ui/Call";
// import Modal from "../components/ui/modals";
//  import Chat from "../components/ui/PopupChat";
//  import Register from "./Register";
//   // import Time from "../components/ui/Time";
// // import VehicleAvailabilityCalendar from "../components/AvailabilityDateTimeModal";
// // import OwnerCalendar from "../components/ui/ownerCalender";
// const Rental: React.FC = (FeedbackModal) => {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [appliedFilters, setAppliedFilters] = useState<FilterState | null>(null);
//   const navigate = useNavigate();
//   const [searchText, setSearchText] = useState("");
//    const [openModal, setOpenModal] = useState(false);
//   const [startDate, setStartDate] = useState<string>(
//     new Date().toISOString().split("T")[0]
//   );
//   const [endDate, setEndDate] = useState<string>(
//     new Date().toISOString().split("T")[0]
//   );

//   const handleRange = (data: any) => {
//     console.log("Selected Range:", data);
//   };

//   // ✅ Filter vehicles by search text
//   const filterVehicles = (list: typeof vehicles) =>
//     list.filter(
//       (v) =>
//         v.name.toLowerCase().includes(searchText.toLowerCase()) ||
//         v.location?.toLowerCase().includes(searchText.toLowerCase())
//     );

//   const cars = filterVehicles(vehicles.filter((v) => v.type === "Car"));
//   // const autos = filterVehicles(vehicles.filter((v) => v.type === "auto"));
//   const bikes = filterVehicles(vehicles.filter((v) => v.type === "Bike"));


//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       {/* 🔹 Promo Slides */}
//       <div className="px-6 py-4">
//         <PromoSlides />
//       </div>
//       {/* 🔹 Search & Date Pickers */}
//       <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h3 className="text-lg font-semibold mb-2 text-gray-800">
//             Select Date & Time
//           </h3>
//           {/* ✅ Horizontal Calendars */}
//           <div className="flex flex-col sm:flex-row gap-3">
//             <DateTimePicker
//               value={startDate}
//               onChange={setStartDate}
//               minDate={new Date().toISOString().split("T")[0]}
//             />
//             <DateTimePicker
//               value={endDate}
//               onChange={setEndDate}
//               minDate={startDate}
//             />

// <Modal/>

//             {/* <Time
//   vehicleId="69158dea06702f6b9f79667a"
//   vehicleType="Car"
//   onSelectDate={(d) => console.log("Selected date:", d)}
// /> */}
//   {/* <button
//         className="bg-blue-600 text-white px-5 py-2 rounded-lg"
//         onClick={() => setOpenModal(true)}
//       >
//         Open Availability Modal
//       </button> */}

//       {/* Modal renders only when open
//       {openModal && (
//         <Time onClose={() => setOpenModal(false)} />
//       )}  */}



//              {/* <Time  onSelectRange={handleRange}/>  */}
// {/* <Time/>  */}
//           </div>
//         </div>
//         {/* 🔹 Search & Filter */}
//         <div className="flex gap-2 w-full md:w-auto">
//           <div className="flex items-center bg-white border rounded-full relative flex-1 md:w-[300px] h-[40px]">
//             <Search className="w-6 h-6 text-gray-500 mr-4 ml-2" />
//             <input
//               type="text"
//               placeholder="Search by name or location..."
//               className="flex-1 outline-none text-gray-700 text-sm"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </div>

//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="flex items-center gap-2 bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] text-white text-lm font-semibold px-4 py-1 rounded-md hover:opacity-100 transition-all"
//           >
//             <img src={Filter} alt="Filter" className="w-6 h-6" />
//             Filter
//           </button>
//         </div>
//       </div>
// {/* <OwnerCalendar carId="68fe26f96f13375a65dc587d"/> */}
//       {/* Filter Summary */}
//       {appliedFilters && (
//         <div className="px-6 py-2">
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="text-sm font-semibold text-blue-800">Active Filters:</h4>
//               <button
//                 onClick={() => setAppliedFilters(null)}
//                 className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//               >
//                 Clear All
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2 text-xs">
//               {/* {appliedFilters.vehicleType !== "Car" && (
//                 <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                   {appliedFilters.vehicleType}
//                 </span>
//               )} */}
//               {appliedFilters.priceRange && (
//                 <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                   ₹{appliedFilters.priceRange[0]} - ₹{appliedFilters.priceRange[1]}
//                 </span>
//               )}
//               {appliedFilters.fuelType && appliedFilters.fuelType !== "All" && (
//                 <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                   {appliedFilters.fuelType}
//                 </span>
//               )}
//               {appliedFilters.transmission && appliedFilters.transmission !== "All" && (
//                 <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                   {appliedFilters.transmission}
//                 </span>
//               )}
//               {appliedFilters.distance && (
//                 <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                   Within {appliedFilters.distance}km
//                 </span>
//               )}

//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🚗 Cars Section */}
//       <div className="px-6">
//         <div className="flex w-full items-center justify-between mb-6 mt-2">
//           {/* Left Title */}
//           <h2 className="text-2xl font-semibold text-gray-800">
//             Nearby Cars
//           </h2>

//           {/* Right Button */}
//           <button
//             onClick={() => navigate("/nearby-cars")}
//             className="text-black font-semibold hover:underline"
//           >
//             View More →
//           </button>
//         </div>

//         <NearbyCars 
//           limit={4} 
//           filters={appliedFilters ? {
//             priceRange: appliedFilters.priceRange,
//             fuelType: appliedFilters.fuelType,
//             transmission: appliedFilters.transmission,

//             distance: appliedFilters.distance
//           } : undefined}
//         />
//       </div>

//       {/* 🏍 Bikes Section */}
//       <div className="px-6">
//         <div className="flex w-full items-center justify-between mb-6 mt-2">
//           <h2 className="text-2xl font-semibold text-gray-800">
//             Nearby Bikes
//           </h2>

//           <button
//             onClick={() => navigate("/nearby-bikes")}
//             className="text-black font-semibold hover:underline"
//           >
//             View More →
//           </button>
//         </div>

//         <NearbyBikes 
//           limit={4} 
//           filters={appliedFilters ? {
//             priceRange: appliedFilters.priceRange,

//             distance: appliedFilters.distance
//           } : undefined}
//         />
//         {/* <Register/> */}
//         {/* <Chat
//           userId="690c9fb0e524c979c76104c9" 
//           receiverId="690c9b5ce524c979c761040c"
//           bookingId="690ca08de524c979c76104d6"
//           apiUrl="http://3.110.122.127:3000"
//         /> */}
//         {/* <Call userId="690c9b5ce524c979c761040c" receiverId="691559e006702f6b9f7955fd" /> */}

//       </div>

//       {/* 🔹 Filter Modal */}
//       {isFilterOpen && (
//         <FilterCard 
//           onApply={(filters) => {
//             console.log("Applied filters:", filters);
//             setAppliedFilters(filters);
//             setIsFilterOpen(false);
//           }}
//           onClose={() => setIsFilterOpen(false)}
//           initialFilters={{

//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Rental;


















// import React, { useState } from "react";
// import { Search } from "lucide-react";
// import VehicleSection from "../components/VehicleSection";
// import DateTimePicker from "../components/ui/DateTimePicker";
// import FilterCard, { FilterState } from "../components/ui/FilterCard";
// import PromoSlides from "../components/PromoSlides";
// import { vehicles } from "./data/Vehicle";
// import Filter from "../assets/icons/FilterLogo.png";
// import NearbyCars from "./NearByCars";
// import NearbyBikes from "./NearByBikes";
// import { useNavigate } from "react-router-dom";
// import Modal from "../components/ui/modals";

// const Rental: React.FC = () => {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [appliedFilters, setAppliedFilters] = useState<FilterState | null>(null);
//   const navigate = useNavigate();
//   const [searchText, setSearchText] = useState("");
//   const [openModal, setOpenModal] = useState(false);
//   const [startDate, setStartDate] = useState<string>(
//     new Date().toISOString().split("T")[0]
//   );
//   const [endDate, setEndDate] = useState<string>(
//     new Date().toISOString().split("T")[0]
//   );

//   const handleRange = (data: any) => {
//     console.log("Selected Range:", data);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       {/* 🔹 Promo Slides */}
//       <div className="px-6 py-4">
//         <PromoSlides />
//       </div>

//       {/* 🔹 Search & Date Pickers */}
//       <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h3 className="text-lg font-semibold mb-2 text-gray-800">
//             Select Date & Time
//           </h3>
//           {/* ✅ Horizontal Calendars */}
//           <div className="flex flex-col sm:flex-row gap-3">
//             <DateTimePicker
//               value={startDate}
//               onChange={setStartDate}
//               minDate={new Date().toISOString().split("T")[0]}
//             />
//             <DateTimePicker
//               value={endDate}
//               onChange={setEndDate}
//               minDate={startDate}
//             />
//             <Modal />
//           </div>
//         </div>

//         {/* 🔹 Search & Filter */}
//         <div className="flex gap-2 w-full md:w-auto">
//           <div className="flex items-center bg-white border rounded-full relative flex-1 md:w-[300px] h-[40px]">
//             <Search className="w-6 h-6 text-gray-500 mr-4 ml-2" />
//             <input
//               type="text"
//               placeholder="Search by name or location..."
//               className="flex-1 outline-none text-gray-700 text-sm"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </div>

//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="flex items-center gap-2 bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] text-white text-lm font-semibold px-4 py-1 rounded-md hover:opacity-100 transition-all"
//           >
//             <img src={Filter} alt="Filter" className="w-6 h-6" />
//             Filter
//           </button>
//         </div>
//       </div>

//       {/* Filter Summary */}
//       {appliedFilters && (
//         <div className="px-6 py-2">
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="text-sm font-semibold text-blue-800">Active Filters:</h4>
//               <button
//                 onClick={() => setAppliedFilters(null)}
//                 className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//               >
//                 Clear All
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2 text-xs">
//               {appliedFilters.priceRange && (
//                 <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                   ₹{appliedFilters.priceRange[0]} - ₹{appliedFilters.priceRange[1]}
//                 </span>
//               )}
//               {appliedFilters.fuelType && appliedFilters.fuelType !== "All" && (
//                 <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                   {appliedFilters.fuelType}
//                 </span>
//               )}
//               {appliedFilters.transmission && appliedFilters.transmission !== "All" && (
//                 <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                   {appliedFilters.transmission}
//                 </span>
//               )}
//               {appliedFilters.distance && (
//                 <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                   Within {appliedFilters.distance}km
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Search Text Display */}
//       {searchText && (
//         <div className="px-6 py-2">
//           <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//             <p className="text-sm text-green-800">
//               Searching for: <span className="font-semibold">"{searchText}"</span>
//               <button
//                 onClick={() => setSearchText("")}
//                 className="ml-4 text-green-600 hover:text-green-800 text-sm font-medium"
//               >
//                 Clear Search
//               </button>
//             </p>
//           </div>
//         </div>
//       )}

//       {/* 🚗 Cars Section */}
//       <div className="px-6">
//         <div className="flex w-full items-center justify-between mb-6 mt-2">
//           <h2 className="text-2xl font-semibold text-gray-800">
//             Nearby Cars
//           </h2>
//           <button
//             onClick={() => navigate("/nearby-cars")}
//             className="text-black font-semibold hover:underline"
//           >
//             View More →
//           </button>
//         </div>

//         <NearbyCars 
//           limit={4}
//           searchText={searchText} 
//           filters={appliedFilters ? {
//             priceRange: appliedFilters.priceRange,
//             fuelType: appliedFilters.fuelType,
//             transmission: appliedFilters.transmission,
//             distance: appliedFilters.distance
//           } : undefined}
//         />
//       </div>

//       {/* 🏍 Bikes Section */}
//       <div className="px-6">
//         <div className="flex w-full items-center justify-between mb-6 mt-2">
//           <h2 className="text-2xl font-semibold text-gray-800">
//             Nearby Bikes
//           </h2>
//           <button
//             onClick={() => navigate("/nearby-bikes")}
//             className="text-black font-semibold hover:underline"
//           >
//             View More →
//           </button>
//         </div>

//         <NearbyBikes 
//           limit={4}
//           searchText={searchText}  
//           filters={appliedFilters ? {
//             priceRange: appliedFilters.priceRange,
//             distance: appliedFilters.distance
//           } : undefined}
//         />
//       </div>

//       {/* 🔹 Filter Modal */}
//       {isFilterOpen && (
//         <FilterCard 
//           onApply={(filters) => {
//             console.log("Applied filters:", filters);
//             setAppliedFilters(filters);
//             setIsFilterOpen(false);
//           }}
//           onClose={() => setIsFilterOpen(false)}
//           initialFilters={{}}
//         />
//       )}
//     </div>
//   );
// };

// export default Rental;
















import React, { useState } from "react";
import { Search } from "lucide-react";
import VehicleSection from "../components/VehicleSection";
import DateTimePicker from "../components/ui/DateTimePicker";
import FilterCard, { FilterState } from "../components/ui/FilterCard";
import PromoSlides from "../components/PromoSlides";
import { vehicles } from "./data/Vehicle";
import Filter from "../assets/icons/FilterLogo.png";
import NearbyCars from "./NearByCars";
import NearbyBikes from "./NearByBikes";
import { useNavigate } from "react-router-dom";
import Modal from "../components/ui/modals";

const Rental: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterState | null>(null);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleRange = (data: any) => {
    console.log("Selected Range:", data);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* 🔹 Promo Slides */}
      <div className="px-4 sm:px-6 py-4">
        <PromoSlides />
      </div>

      {/* 🔹 Search & Date Pickers */}
      <div className="px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">
            Select Date & Time
          </h3>
          {/* ✅ Horizontal Calendars */}
          <div className="flex flex-col sm:flex-row gap-3">
            <DateTimePicker
              value={startDate}
              onChange={setStartDate}
              minDate={new Date().toISOString().split("T")[0]}
            />
            <DateTimePicker
              value={endDate}
              onChange={setEndDate}
              minDate={startDate}
            />

          </div>
        </div>

        {/* 🔹 Search & Filter */}
        <div className="flex gap-2 w-full md:w-auto">
          <div className="flex items-center bg-white border rounded-full relative flex-1 md:w-[300px] h-[40px]">
            <Search className="w-6 h-6 text-gray-500 mr-4 ml-2" />
            <input
              type="text"
              placeholder="Search by name or location..."
              className="flex-1 outline-none text-gray-700 text-sm"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] text-white text-lm font-semibold px-4 py-1 rounded-md hover:opacity-100 transition-all"
          >
            <img src={Filter} alt="Filter" className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Filter Summary */}
      {appliedFilters && (
        <div className="px-4 sm:px-6 py-2">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-blue-800">Active Filters:</h4>
              <button
                onClick={() => setAppliedFilters(null)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {appliedFilters.priceRange && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  ₹{appliedFilters.priceRange[0]} - ₹{appliedFilters.priceRange[1]}
                </span>
              )}
              {appliedFilters.fuelType && appliedFilters.fuelType !== "All" && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {appliedFilters.fuelType}
                </span>
              )}
              {appliedFilters.transmission && appliedFilters.transmission !== "All" && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {appliedFilters.transmission}
                </span>
              )}
              {appliedFilters.distance && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  Within {appliedFilters.distance}km
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Text Display */}
      {/* {searchText && (
        <div className="px-6 py-2">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800">
              Searching for: <span className="font-semibold">"{searchText}"</span>
              <button
                onClick={() => setSearchText("")}
                className="ml-4 text-green-600 hover:text-green-800 text-sm font-medium"
              >
                Clear Search
              </button>
            </p>
          </div>
        </div>
      )} */}

      {/* 🚗 Cars Section */}
      {/* 🚗 Cars Section */}
      {(!appliedFilters || appliedFilters.vehicleType === "cars") && (
        <div className="px-4 sm:px-6">
          <div className="flex w-full items-center justify-between mb-4 sm:mb-6 mt-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Nearby Cars
            </h2>
            <button
              onClick={() => navigate("/nearby-cars")}
              className="text-black font-semibold hover:underline"
            >
              View More →
            </button>
          </div>
          <NearbyCars
            limit={4}
            searchText={searchText}
            filters={appliedFilters && appliedFilters.vehicleType === "cars" ? {
              priceRange: appliedFilters.priceRange,
              fuelType: appliedFilters.fuelType,
              transmission: appliedFilters.transmission,
              distance: appliedFilters.distance,
              carName: appliedFilters.selectedVehicles?.[0]
            } : undefined}
          />
        </div>
      )}

      {/* 🏍 Bikes Section */}
      {(!appliedFilters || appliedFilters.vehicleType === "bikes") && (
        <div className="px-4 sm:px-6 mt-2">
          <div className="flex w-full items-center justify-between mb-4 sm:mb-6 mt-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Nearby Bikes
            </h2>
            <button
              onClick={() => navigate("/nearby-bikes")}
              className="text-black font-semibold hover:underline"
            >
              View More →
            </button>
          </div>
          <NearbyBikes
            limit={4}
            searchText={searchText}
            filters={appliedFilters && appliedFilters.vehicleType === "bikes" ? {
              priceRange: appliedFilters.priceRange,
              distance: appliedFilters.distance,
              bikeName: appliedFilters.selectedVehicles?.[0]
            } : undefined}
          />
        </div>
      )}

      {/* 🔹 Filter Modal */}
      {isFilterOpen && (
        <FilterCard
          onApply={(filters) => {
            setAppliedFilters(filters);
            setIsFilterOpen(false);
          }}
          onClose={() => setIsFilterOpen(false)}
          initialFilters={appliedFilters || {}}
        />
      )}
    </div>
  );
};

export default Rental;