import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Search } from "lucide-react";
import VehicleCard from "../components/ui/VehicleCard";
import DateTimePicker from "../components/ui/DateTimePicker";
import FilterCard from "../components/ui/FilterCard";
import PromoSlides from "../components/PromoSlides";
import VehicleCarousel from "../components/VehicleCarousel";
import { vehicles } from "./data/Vehicle";

const Rental: React.FC = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const cars = vehicles.filter((v) => v.type === "car");
  const autos = vehicles.filter((v) => v.type === "auto");

  const filteredCars = cars.filter(
    (v) =>
      v.name.toLowerCase().includes(searchText.toLowerCase()) ||
      v.location?.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredAutos = autos.filter(
    (v) =>
      v.name.toLowerCase().includes(searchText.toLowerCase()) ||
      v.location?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">

      {/* Promotional Slides */}
      <div className="px-6 py-4">
        <PromoSlides />
      </div>
      
      

      {/* Search + Filter */}
      <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Select Date & Time
          </h3>
          <DateTimePicker />
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


      

      {/* Nearby Cars - Carousel */}
      <div className="px-6 py-4">
        <VehicleCarousel
          vehicles={filteredCars}
          title="Nearby Cars"
          onBook={(vehicle) => navigate(`/book-now/${vehicle.id}`)}
          onViewMore={() => navigate("/listed")}
        />
      </div>

      {/* Autos - Carousel */}
      <div className="px-6 py-4">
        <VehicleCarousel
          vehicles={filteredAutos}
          title="Looking for an Auto?"
          onBook={(vehicle) => navigate(`/book-now/${vehicle.id}`)}
          onViewMore={() => navigate("/auto")}
        />

      {/* Nearby Cars */}
      <div className="px-6 py-4 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Nearby Cars</h2>
          <button className="text-blue-600 hover:underline font-medium">
            View More →
          </button>
        </div>
        {filteredCars.length > 0 ? (
          filteredCars.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              showActions={false}
              onBook={() => navigate(`/booknow/${v.id}`)} // ← This makes the image clickable
            />
          ))
        ) : (
          <p className="text-gray-500">No cars found.</p>
        )}
      </div>

      {/* Autos */}
      <div className="px-6 py-4 flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Looking for an Auto?</h2>
          <button className="text-blue-600 hover:underline font-medium">
            View More →
          </button>
        </div>
        {filteredAutos.length > 0 ? (
          filteredAutos.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              showActions={false}
              onBook={() => navigate(`/booknow/${v.id}`)} // ← This too
            />
          ))
        ) : (
          <p className="text-gray-500">No autos found.</p>
        )}

      </div>

      {isFilterOpen && <FilterCard onApply={() => setIsFilterOpen(false)} />}
    </div>
    </div>
  );
};
export default Rental;
