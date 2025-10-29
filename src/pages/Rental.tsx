
import React, { useState } from "react";
import { Search } from "lucide-react";
import VehicleSection from "../components/VehicleSection";
import DateTimePicker from "../components/ui/DateTimePicker";
import FilterCard from "../components/ui/FilterCard";
import PromoSlides from "../components/PromoSlides";
import { vehicles } from "./data/Vehicle";
import Filter from "../assets/icons/FilterLogo.png";

const Rental: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  // ✅ Filter vehicles by search text
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
      {/* 🔹 Promo Slides */}
      <div className="px-6 py-4">
        <PromoSlides />
      </div>

      {/* 🔹 Search & Date Pickers */}
      <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
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
            className="flex items-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-lm font-semibold px-4 py-1 rounded-md hover:opacity-100 transition-all"
          >
            <img src={Filter} alt="Filter" className="w-6 h-6" />
            Filter
          </button>
        </div>
      </div>

      {/* 🚗 Cars Section */}
      <VehicleSection title="Looking for an Car?" vehicles={cars} type="car" />

      {/* 🛺 Autos Section */}
      <VehicleSection title="Looking for an Auto?" vehicles={autos} type="auto" />

      {/* 🏍 Bikes Section */}
      <VehicleSection title="Looking for a Bike?" vehicles={bikes} type="bike" />

      {/* 🔹 Filter Modal */}
      {isFilterOpen && <FilterCard onApply={() => setIsFilterOpen(false)} />}
    </div>
  );
};

export default Rental;
