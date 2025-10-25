import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import VehicleSection from "../components/VehicleSection";
import DateTimePicker from "../components/ui/DateTimePicker";
import FilterCard from "../components/ui/FilterCard";
import PromoSlides from "../components/PromoSlides";
import { vehicles } from "./data/Vehicle";

const Rental: React.FC = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

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
      {/* Promotional Slides */}
      <div className="px-4 sm:px-6 md:px-8 py-4">
        <PromoSlides />
      </div>

      {/* Search + DateTimePickers */}
      <div className="px-4 sm:px-6 md:px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Date Pickers */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex flex-col w-full sm:w-auto">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Start Date & Time
            </h3>
            <DateTimePicker
              value={startDate}
              onChange={setStartDate}
              minDate={new Date()}
            />
          </div>
          <div className="flex flex-col w-full sm:w-auto">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              End Date & Time
            </h3>
            <DateTimePicker
              value={endDate}
              onChange={setEndDate}
              minDate={startDate}
            />
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
          <div className="flex items-center bg-white border rounded-full px-3 py-1 w-full sm:w-60">
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
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-4 py-2 rounded-full shadow hover:opacity-90 transition mt-2 sm:mt-0"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Vehicle Sections */}
      <VehicleSection
        title="Nearby Cars"
        vehicles={cars}
        type="car"
        showBookButton={true}
        viewMoreLink="/nearby-cars"
      />
      <VehicleSection
        title="Looking for an Auto?"
        vehicles={autos}
        type="auto"
        showBookButton={true}
        viewMoreLink="/nearby-autos"
      />
      <VehicleSection
        title="Looking for a Bike?"
        vehicles={bikes}
        type="bike"
        showBookButton={true}
        viewMoreLink="/nearby-bikes"
      />

      {/* Filter Card Modal */}
      {isFilterOpen && <FilterCard onApply={() => setIsFilterOpen(false)} />}
    </div>
  );
};

export default Rental;
