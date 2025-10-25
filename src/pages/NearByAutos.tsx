import React from "react";
import { useNavigate } from "react-router-dom";
import { vehicles } from "./data/Vehicle";

const NearbyAutos: React.FC = () => {
  const navigate = useNavigate();

  // Filter only autos
  const autos = vehicles.filter((v) => v.type === "auto");

  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 py-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Nearby Autos
      </h2>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {autos.map((auto) => (
          <div
            key={auto.id}
            onClick={() => navigate(`/book-now/${auto.id}`)}
            className="cursor-pointer"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-3 hover:shadow-md transition hover:border-blue-400">
              
              {/* Vehicle Image */}
              <div className="w-full h-[200px] sm:h-[220px] md:h-[220px] lg:h-[250px] overflow-hidden rounded-lg">
                <img
                  src={auto.image}
                  alt={auto.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Vehicle Details */}
              <div className="flex flex-col text-gray-700 gap-1 items-center">
                {/* Title + Rating */}
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {auto.name}
                  </h3>
                  <span className="inline-flex items-center bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-0.5 rounded-md">
                    ⭐ {auto.rating}
                  </span>
                </div>

                {/* Price */}
                <p className="text-sm font-semibold text-black w-full text-left">
                  ₹{auto.price} <span className="text-xs text-gray-500">/km</span>
                </p>

                {/* Seats */}
                <p className="text-xs text-gray-500 w-full text-left">{auto.seats} persons</p>

                {/* Availability */}
                <div className="mt-2">
                  <select
                    value={auto.available ? "Available" : "Not Available"}
                    disabled
                    className={`text-xs font-medium px-2 py-1 rounded-md border focus:outline-none w-28 text-center block mx-auto ${
                      auto.available
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

export default NearbyAutos;
