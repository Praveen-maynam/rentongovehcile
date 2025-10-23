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
      </div>
    </div>
  );
};

export default Nearbycars;
