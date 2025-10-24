// import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import {  Search } from "lucide-react";
// import VehicleCard from "../components/ui/VehicleCard";
// import AutoCard from "../components/ui/AutoCard";
// import DateTimePicker from "../components/ui/DateTimePicker";
// import FilterCard from "../components/ui/FilterCard";
// import PromoSlides from "../components/PromoSlides";
// import VehicleCarousel from "../components/VehicleCarousel";
// import { vehicles } from "./data/Vehicle";
// import { useLocation } from "../store/location.context";

// const Rental: React.FC = () => {
//   const navigate = useNavigate();
//   const { currentCity } = useLocation();
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [startDate, setStartDate] = useState(new Date());
//   const [showAllCars, setShowAllCars] = useState(false);
//   const [showAllAutos, setShowAllAutos] = useState(false);

//   // Filter vehicles by selected location (city)
//   const locationFilteredVehicles = useMemo(() => {
//     return vehicles.filter((v) => {
//       // Extract city name from location string (e.g., "Kakinada, Main Road" -> "Kakinada")
//       const vehicleCity = v.location?.split(',')[0].trim() || '';
//       return vehicleCity.toLowerCase() === currentCity.toLowerCase();
//     });
//   }, [currentCity]);

//   const cars = locationFilteredVehicles.filter((v) => v.type === "car");
//   const autos = locationFilteredVehicles.filter((v) => v.type === "auto");

//   const filteredCars = cars.filter(
//     (v) =>
//       v.name.toLowerCase().includes(searchText.toLowerCase()) ||
//       v.location?.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const filteredAutos = autos.filter(
//     (v) =>
//       v.name.toLowerCase().includes(searchText.toLowerCase()) ||
//       v.location?.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">

//       {/* Promotional Slides */}
//       <div className="px-6 py-4">
//         <PromoSlides />
//       </div>
      
      

//       {/* Search + Filter */}
//       <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h3 className="text-lg font-semibold mb-2 text-gray-800">
//             Select Date & Time
//           </h3>
//           <DateTimePicker 
//             value={startDate} 
//             onChange={setStartDate} 
//             minDate={new Date()} 
//           />

          
//         </div>

//         <div className="flex items-center gap-2">
//           <div className="flex items-center bg-white border rounded-full px-3 py-1 w-full md:w-60">
//             <Search className="w-4 h-4 text-gray-500 mr-2" />
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
//             className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-4 py-2 rounded-full shadow hover:opacity-90 transition"
//           >
//             Filter
//           </button>
//         </div>
//       </div>


      

//       {/* Nearby Cars - Carousel */}
//       {/* <div className="px-6 py-4">
//         <VehicleCarousel
//           vehicles={filteredCars}
//           title="Nearby Cars"
//           onBook={(vehicle) => navigate(`/book-now/${vehicle.id}`)}
//           onViewMore={() => navigate("/listed")}
//         />
//       </div> */}

//       {/* Autos - Carousel */}
//       {/* <div className="px-6 py-4">
//         <VehicleCarousel
//           vehicles={filteredAutos}
//           title="Looking for an Auto?"
//           onBook={(vehicle) => navigate(`/book-now/${vehicle.id}`)}
//           onViewMore={() => navigate("/auto")}
//         />
//       </div> */}

//       {/* Nearby Cars */}
//       <div className="px-6 py-4 flex flex-col gap-4">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-xl font-semibold">Near by Cars  </h2>
//           {filteredCars.length > 4 && !showAllCars && (
//             <button 
//               onClick={() => setShowAllCars(true)}
//               className="text-blue-600 hover:underline font-medium"
//             >
//               View More →
//             </button>
//           )}
//         </div>
//         {filteredCars.length > 0 ? (
//           (showAllCars ? filteredCars : filteredCars.slice(0, 4)).map((v) => (
//             <VehicleCard
//               key={v.id}
//               vehicle={v}
//               showActions={false}
//               onBook={() => navigate(`/book-now/${v.id}`)}
//             />
//           ))
//         ) : (
//           <p className="text-gray-500">No cars found in {currentCity}. Change location to see more vehicles.</p>
//         )}
//         {showAllCars && filteredCars.length > 4 && (
//           <button 
//             onClick={() => setShowAllCars(false)}
//             className="text-blue-600 hover:underline font-medium text-center py-2"
//           >
//             Show Less ↑
//           </button>
//         )}
//       </div>

//       {/* Autos */}
//       <div className="px-6 py-4 mb-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Autos in {currentCity}</h2>
//           {filteredAutos.length > 4 && !showAllAutos && (
//             <button 
//               onClick={() => setShowAllAutos(true)}
//               className="text-blue-600 hover:underline font-medium"
//             >
//               View More →
//             </button>
//           )}
//         </div>

//         <div className="flex flex-wrap gap-4">
//           {filteredAutos.length > 0 ? (
//             (showAllAutos ? filteredAutos : filteredAutos.slice(0, 4)).map((v, index) => (
//               <AutoCard
//                 key={v.id}
//                 vehicle={v}
//                 showBookButton={index === 0}
//                 onBook={() => navigate(`/book-now/${v.id}`)}
//               />
//             ))
//           ) : (
//             <p className="text-gray-500">No autos found in {currentCity}. Change location to see more vehicles.</p>
//           )}
//         </div>

//         {showAllAutos && filteredAutos.length > 4 && (
//           <button 
//             onClick={() => setShowAllAutos(false)}
//             className="text-blue-600 hover:underline font-medium text-center py-2 mt-4 w-full"
//           >
//             Show Less ↑
//           </button>
//         )}
//       </div>

//       {/* Filter Card Modal */}
//       {isFilterOpen && <FilterCard onApply={() => setIsFilterOpen(false)} />}
//     </div>
//   );
// };

// export default Rental;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import VehicleCard from "../components/ui/VehicleCard";
import AutoCard from "../components/ui/AutoCard";
import BikeCard from "../components/ui/BikeCard";
import DateTimePicker from "../components/ui/DateTimePicker";
import FilterCard from "../components/ui/FilterCard";
import PromoSlides from "../components/PromoSlides";
import { vehicles } from "./data/Vehicle";

type VehicleType = "car" | "auto" | "bike";

interface VehicleSectionProps {
  title: string;
  vehicles: typeof vehicles;
  showBookButton?: boolean;
  type: VehicleType;
}

const VehicleSection: React.FC<VehicleSectionProps> = ({
  title,
  vehicles,
  showBookButton = false,
  type,
}) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="px-6 py-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {vehicles.length > 4 && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="text-blue-600 hover:underline font-medium"
          >
            View More →
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        {(showAll ? vehicles : vehicles.slice(0, 4)).map((v, index) => {
          switch (type) {
            case "car":
              return (
                <VehicleCard
                  key={v.id}
                  vehicle={v}
                  showActions={false}
                  onBook={() => navigate(`/book-now/${v.id}`)}
                />
              );
            case "auto":
              return (
                <AutoCard
                  key={v.id}
                  vehicle={v}
                  showBookButton={showBookButton && index === 0}
                  onBook={() => navigate(`/book-now/${v.id}`)}
                />
              );
            case "bike":
              return (
                <BikeCard
                  key={v.id}
                  vehicle={v}
                  showBookButton={showBookButton && index === 0}
                  onBook={() => navigate(`/book-now/${v.id}`)}
                />
              );
          }
        })}
      </div>

      {showAll && vehicles.length > 4 && (
        <button
          onClick={() => setShowAll(false)}
          className="text-blue-600 hover:underline font-medium text-center py-2 mt-4 w-full"
        >
          Show Less ↑
        </button>
      )}
    </div>
  );
};

const Rental: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Filter vehicles by search text
  const filterVehicles = (list: typeof vehicles) =>
    list.filter(
      (v) =>
        v.name.toLowerCase().includes(searchText.toLowerCase()) ||
        v.location?.toLowerCase().includes(searchText.toLowerCase())
    );

  const cars = filterVehicles(vehicles.filter((v) => v.type === "car"));
  const autos = filterVehicles(vehicles.filter((v) => v.type === "auto"));
  const bikes = filterVehicles(vehicles.filter((v) => v.type === "bike"));

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* 🔹 Promotional Slides */}
      <div className="px-6 py-4">
        <PromoSlides />
      </div>

      {/* 🔹 Search + DateTimePicker */}
      <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Select Date & Time
          </h3>
          <DateTimePicker value={selectedDate} onChange={setSelectedDate} />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border rounded-full px-3 py-1 w-full md:w-60">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
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
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-4 py-2 rounded-full shadow hover:opacity-90 transition"
          >
            Filter
          </button>
        </div>
      </div>

      {/* 🚗 Cars Section */}
      <VehicleSection title="Nearby Cars" vehicles={cars} type="car" />

      {/* 🛺 Autos Section */}
      <VehicleSection title="Looking for an Auto?" vehicles={autos} type="auto" />

      {/* 🏍 Bikes Section */}
      <VehicleSection title="Looking for a Bike?" vehicles={bikes} type="bike" />

      {/* Filter Card Modal */}
      {isFilterOpen && <FilterCard onApply={() => setIsFilterOpen(false)} />}
    </div>
  );
};

export default Rental;