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
      </div>
    </div>
  );
};

export default NearbyCars;
