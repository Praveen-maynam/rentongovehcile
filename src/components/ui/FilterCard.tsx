import React, { useState } from "react";

export interface FilterOptions {
  priceRange: number;
  distance: number;
  vehicleType: string[];
  selectedName: string;
  fuel?: string;
  transmission?: string;
}

interface FilterCardProps {
  onApply: (filters: FilterOptions) => void;
}

const FilterCard: React.FC<FilterCardProps> = ({ onApply }) => {
  const [priceRange, setPriceRange] = useState(250);
  const [distance, setDistance] = useState(3);
  const [vehicleType, setVehicleType] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");

  // Vehicle name lists
  const carNames = ["Hyundai", "Ford", "Tata", "Suzuki", "Mahindra"];
  const bikeNames = ["Yamaha", "Honda", "Hero", "Bajaj", "TVS"];

  // Handle vehicle type selection
  const handleCheckboxChange = (type: string) => {
    setVehicleType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setSelectedName("");
  };

  // Determine dropdown options based on selected vehicle type
  const getNameOptions = () => {
    if (vehicleType.includes("car")) return carNames;
    if (vehicleType.includes("bikes")) return bikeNames;
    return [];
  };

  const handleApply = () => {
    onApply({
      priceRange,
      distance,
      vehicleType,
      selectedName,
      fuel,
      transmission,
    });
  };

  return (
    <div className="flex justify-end">
      <div className="absolute right-6 top-[192px] w-full sm:w-[200px] bg-white shadow-xl rounded-lg p-6 border z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
          <button onClick={handleApply} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Vehicle Type */}
        <div className="mb-6">
          <p className="font-medium mb-2">Vehicle Type</p>
          {["car", "bikes"].map((type) => (
            <label key={type} className="block text-sm">
              <input
                type="checkbox"
                checked={vehicleType.includes(type)}
                onChange={() => handleCheckboxChange(type)}
                className="mr-2"
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <p className="font-medium mb-2">Price Range</p>
          <input
            type="range"
            min={20}
            max={500}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>₹20</span>
            <span>₹{priceRange}</span>
          </div>
        </div>

        {/* Distance */}
        <div className="mb-6">
          <p className="font-medium mb-2">Distance</p>
          <input
            type="range"
            min={1}
            max={10}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>1 km</span>
            <span>{distance} km</span>
          </div>
        </div>

        {/* Dynamic Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">NAMES</label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            disabled={getNameOptions().length === 0}
          >
            <option value="">
              {getNameOptions().length === 0
                ? "Select Vehicle Type First"
                : "Select"}
            </option>
            {getNameOptions().map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Fuel */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Fuel</label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>

        {/* Transmission */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-1">Transmission</label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="w-full bg-gradient-to-r from-blue-900 to-blue-400 text-white py-2 rounded-md font-medium"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
