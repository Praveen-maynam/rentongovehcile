<<<<<<< HEAD
import React from "react";
import { useNavigate } from "react-router-dom";
import { vehicles } from "./data/Vehicle";
import AutomaticLogo from "../assets/icons/automatic.jpeg";
import DriverLogo from "../assets/icons/seats.jpeg";
import Petrol from "../assets/icons/fuel.jpeg";
import { MapPin } from "lucide-react";

const NearbyCars: React.FC = () => {
  const navigate = useNavigate();

  const cars = vehicles.filter((v) => v.type === "car");

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Nearby Cars</h2>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cars.map((car) => (
          <div
            key={car.id}
            className="cursor-pointer"
            onClick={() => navigate(`/book-now/${car.id}`)}
          >
            <div className="flex flex-col bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-500 transition-all duration-200">
              
              {/* Car Image */}
              <div className="w-full h-[160px] overflow-hidden rounded-t-xl">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Car Details */}
              <div className="flex flex-col p-3 gap-1.5">
                {/* Name + Rating */}
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {car.name}
                  </h3>
                  <span className="px-1.5 py-0.5 text-xs bg-yellow-50 border border-yellow-400 text-gray-900 rounded">
                    ⭐ {car.rating?.toFixed(1)}
                  </span>
                </div>

                {/* Price */}
                <p className="text-gray-700 font-bold text-sm mb-2">
                  ₹{car.price} <span className="text-gray-500 font-normal">/day</span>
                </p>

                {/* Transmission, Seats, Fuel, Location */}
                <div className="flex flex-col gap-1.5 text-gray-600 text-xs">
                  <div className="flex items-center gap-2">
                    <img src={AutomaticLogo} alt="Transmission" className="w-4 h-4" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={DriverLogo} alt="Seats" className="w-4 h-4" />
                    <span>{car.seats} Seaters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={Petrol} alt="Fuel" className="w-4 h-4" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-500 line-clamp-2">{car.location}</span>
                  </div>
                </div>

                {/* Availability Dropdown */}
                <div className="mt-2 flex justify-center w-full">
                  <select
                    value={car.available ? "Available" : "Not Available"}
                    disabled
                    className={`text-xs font-medium px-2 py-1 rounded-md border focus:outline-none w-auto min-w-[80px] text-center ${
                      car.available
                        ? "bg-green-100 text-green-700 border-green-300"
                        : "bg-red-100 text-red-700 border-red-300"
                    }`}
                  >
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
=======
import React, { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import VehicleCard from "../components/ui/VehicleCard";
import { vehicles as vehicleData } from "./data/Vehicle";

const Nearbycars: React.FC = () => {
  // ✅ State
  const [searchText, setSearchText] = useState("");
  const [cars, setCars] = useState(vehicleData.filter((v) => v.type === "car"));

  // ✅ Search filter
  const filteredCars = cars.filter(
    (v) =>
      v.name.toLowerCase().includes(searchText.toLowerCase()) ||
      v.location?.toLowerCase().includes(searchText.toLowerCase())
  );

  // ✅ Delete handler
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setCars(cars.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex flex-col">
      {/* 🔹 Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Listed Cars</h2>

        <div className="flex items-center bg-white border rounded-full px-3 py-2 w-full sm:w-64 shadow-sm">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by name or location..."
            className="flex-1 outline-none text-gray-700 text-sm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* 🚗 Cars List */}
      <div className="flex flex-col gap-4">
        {filteredCars.length > 0 ? (
          filteredCars.map((v) => (
            <div
              key={v.id}
              className="relative group bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              {/* Delete Icon */}
              <button
                onClick={() => handleDelete(v.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full"
                title="Delete Car"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              {/* Vehicle Card (no book button) */}
              <VehicleCard vehicle={v} showActions={false} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No cars available.</p>
        )}
>>>>>>> 4aeffab8e1a0bddc7d50843caf921abcb758f1ec
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default NearbyCars;
=======
export default Nearbycars;
>>>>>>> 4aeffab8e1a0bddc7d50843caf921abcb758f1ec
