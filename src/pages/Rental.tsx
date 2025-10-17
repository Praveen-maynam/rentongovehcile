import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import VehicleCard from "../components/ui/VehicleCard";
import DateTimePicker from "../components/ui/DateTimePicker";
import FilterCard from "../components/ui/FilterCard";
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
      {/* Header */}
      <div className="relative w-full h-56">
        <img
          src="/rental-header.jpg"
          alt="Rental Header"
          className="w-full h-full object-cover rounded-b-3xl shadow-md"
        />
        <div className="absolute inset-0 flex flex-col justify-center text-white bg-black/40 rounded-b-3xl px-4">
          <div className="flex justify-between items-start mt-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </button>
            <button
              onClick={() => alert("Forward clicked")}
              className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5 text-black" />
            </button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide mt-6">
            Rent Your Perfect Ride
          </h1>
          <p className="mt-2 text-lg">Find cars & autos near you instantly</p>
        </div>
      </div>

      {/* Controls */}
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
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
          >
            Filter
          </button>
        </div>
      </div>

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
              onBook={(vehicle) => navigate(`/book-now/${vehicle.id}`)}
            />
          ))
        ) : (
          <p className="text-gray-500">No cars found.</p>
        )}
      </div>

      {/* Autos */}
      <div className="px-6 py-4 flex flex-col gap-4">
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
              onBook={(vehicle) => navigate(`/book-now/${vehicle.id}`)}
            />
          ))
        ) : (
          <p className="text-gray-500">No autos found.</p>
        )}
      </div>

      {isFilterOpen && <FilterCard onClose={() => setIsFilterOpen(false)} />}
    </div>
  );
};

export default Rental;
