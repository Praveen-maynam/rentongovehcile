// import React, { useState } from "react";

// export interface FilterOptions {
//   priceRange: number;
//   distance: number;
//   vehicleType: string[];
//   selectedName: string;
//   fuel?: string;
//   transmission?: string;
// }

// interface FilterCardProps {
//   onApply: (filters: FilterOptions) => void;
// }

// const FilterCard: React.FC<FilterCardProps> = ({ onApply }) => {
//   const [priceRange, setPriceRange] = useState(250);
//   const [distance, setDistance] = useState(3);
//   const [vehicleType, setVehicleType] = useState<string[]>([]);
//   const [selectedName, setSelectedName] = useState("");
//   const [fuel, setFuel] = useState("");
//   const [transmission, setTransmission] = useState("");

//   // Vehicle name lists
//   const carNames = ["Hyundai", "Ford", "Tata", "Suzuki", "Mahindra"];
//   const bikeNames = ["Yamaha", "Honda", "Hero", "Bajaj", "TVS"];

//   // Handle vehicle type selection
//   const handleCheckboxChange = (type: string) => {
//     setVehicleType((prev) =>
//       prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
//     );
//     setSelectedName("");
//   };

//   // Determine dropdown options based on selected vehicle type
//   const getNameOptions = () => {
//     if (vehicleType.includes("car")) return carNames;
//     if (vehicleType.includes("bikes")) return bikeNames;
//     return [];
//   };

//   const handleApply = () => {
//     onApply({
//       priceRange,
//       distance,
//       vehicleType,
//       selectedName,
//       fuel,
//       transmission,
//     });
//   };

//   return (
//     <div className="flex justify-end">
//       <div className="absolute right-6 top-[192px] w-full sm:w-[200px] bg-white shadow-xl rounded-lg p-6 border z-50">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
//           <button onClick={handleApply} className="text-gray-500 hover:text-gray-700">
//             ✕
//           </button>
//         </div>

//         {/* Vehicle Type */}
//         <div className="mb-6">
//           <p className="font-medium mb-2">Vehicle Type</p>
//           {["car", "bikes"].map((type) => (
//             <label key={type} className="block text-sm">
//               <input
//                 type="checkbox"
//                 checked={vehicleType.includes(type)}
//                 onChange={() => handleCheckboxChange(type)}
//                 className="mr-2"
//               />
//               {type.charAt(0).toUpperCase() + type.slice(1)}
//             </label>
//           ))}
//         </div>

//         {/* Price Range */}
//         <div className="mb-6">
//           <p className="font-medium mb-2">Price Range</p>
//           <input
//             type="range"
//             min={20}
//             max={500}
//             value={priceRange}
//             onChange={(e) => setPriceRange(Number(e.target.value))}
//             className="w-full accent-blue-600"
//           />
//           <div className="flex justify-between text-sm text-gray-600 mt-1">
//             <span>₹20</span>
//             <span>₹{priceRange}</span>
//           </div>
//         </div>

//         {/* Distance */}
//         <div className="mb-6">
//           <p className="font-medium mb-2">Distance</p>
//           <input
//             type="range"
//             min={1}
//             max={10}
//             value={distance}
//             onChange={(e) => setDistance(Number(e.target.value))}
//             className="w-full accent-blue-600"
//           />
//           <div className="flex justify-between text-sm text-gray-600 mt-1">
//             <span>1 km</span>
//             <span>{distance} km</span>
//           </div>
//         </div>

//         {/* Dynamic Dropdown */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-1">NAMES</label>
//           <select
//             className="w-full border rounded-md px-3 py-2 text-sm"
//             value={selectedName}
//             onChange={(e) => setSelectedName(e.target.value)}
//             disabled={getNameOptions().length === 0}
//           >
//             <option value="">
//               {getNameOptions().length === 0
//                 ? "Select Vehicle Type First"
//                 : "Select"}
//             </option>
//             {getNameOptions().map((name) => (
//               <option key={name} value={name}>
//                 {name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Fuel */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-1">Fuel</label>
//           <select
//             className="w-full border rounded-md px-3 py-2 text-sm"
//             value={fuel}
//             onChange={(e) => setFuel(e.target.value)}
//           >
//             <option value="">Select</option>
//             <option value="Petrol">Petrol</option>
//             <option value="Diesel">Diesel</option>
//           </select>
//         </div>

//         {/* Transmission */}
//         <div className="mb-8">
//           <label className="block text-sm font-medium mb-1">Transmission</label>
//           <select
//             className="w-full border rounded-md px-3 py-2 text-sm"
//             value={transmission}
//             onChange={(e) => setTransmission(e.target.value)}
//           >
//             <option value="">Select</option>
//             <option value="Manual">Manual</option>
//             <option value="Automatic">Automatic</option>
//           </select>
//         </div>

//         {/* Apply Button */}
//         <button
//           onClick={handleApply}
//           className="w-full bg-gradient-to-r from-blue-900 to-blue-400 text-white py-2 rounded-md font-medium"
//         >
//           Apply
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterCard;










import React, { useState, useEffect } from "react";

export interface FilterState {
  vehicleType: "cars" | "bikes";
  priceRange: [number, number];
  distance: number;
  selectedVehicles: string[];
  fuelType: string;
  transmission: string;
}

interface FilterCardProps {
  onApply: (filters: FilterState) => void;
  onClose?: () => void;
  initialFilters?: Partial<FilterState>;
}

const FilterCard: React.FC<FilterCardProps> = ({
  onApply,
  onClose,
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<FilterState>({
    vehicleType: "cars",
    priceRange: [500, 5000],
    distance: 10,
    selectedVehicles: [],
    fuelType: "All",
    transmission: "All",
    ...initialFilters,
  });

  const [selectedName, setSelectedName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const vehicleNames = {
    cars: [
      "Honda City",
      "Toyota Innova",
      "BMW X5",
      "Maruti Swift",
      "Hyundai Creta",
      "Tata Nexon",
    ],
    bikes: [
      "Royal Enfield",
      "Honda CB",
      "Yamaha R15",
      "KTM Duke",
      "Bajaj Pulsar",
      "TVS Apache",
    ],
  };

  const getNameOptions = () => {
    return vehicleNames[filters.vehicleType] || [];
  };

  const handleFilterChange = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const validateFilters = () => {
    if (filters.priceRange[0] >= filters.priceRange[1]) {
      setError("Invalid price range");
      return false;
    }

    setError(null);
    return true;
  };

  const handleApply = () => {
    if (!validateFilters()) return;

    onApply(filters);
    if (onClose) onClose();
  };

  const handleReset = () => {
    setFilters({
      vehicleType: "cars",
      priceRange: [500, 5000],
      distance: 10,
      selectedVehicles: [],
      fuelType: "All",
      transmission: "All",
    });
    setSelectedName("");
    setError(null);
  };

  return (
    <div className="flex justify-end">
      <div className="absolute right-6 top-[192px] w-full sm:w-[260px] bg-white shadow-xl rounded-lg p-6 border z-50">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Vehicle Type */}
        <div className="mb-6">
          <p className="font-medium mb-2">Vehicle Type</p>

          <div className="flex gap-3">
            {(["cars", "bikes"] as const).map((type) => (
              <label key={type} className="flex items-center text-sm">
                <input
                  type="radio"
                  name="vehicleType"
                  checked={filters.vehicleType === type}
                  onChange={() => handleFilterChange("vehicleType", type)}
                  className="mr-2"
                />
                {type.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <p className="font-medium mb-2">Price Range</p>

          <input
            type="range"
            min={500}
            max={5000}
            value={filters.priceRange[1]}
            onChange={(e) =>
              handleFilterChange("priceRange", [
                500,
                Number(e.target.value),
              ])
            }
            className="w-full accent-blue-600"
          />

          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>₹500</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>

        {/* Distance */}
        <div className="mb-6">
          <p className="font-medium mb-2">Distance</p>

          <input
            type="range"
            min={1}
            max={50}
            value={filters.distance}
            onChange={(e) =>
              handleFilterChange("distance", Number(e.target.value))
            }
            className="w-full accent-blue-600"
          />

          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>1 km</span>
            <span>{filters.distance} km</span>
          </div>
        </div>

        {/* Names Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Vehicle Name</label>

          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={selectedName}
            onChange={(e) => {
              setSelectedName(e.target.value);
              handleFilterChange("selectedVehicles", [e.target.value]);
            }}
          >
            <option value="">Select</option>
            {getNameOptions().map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>

        {/* Fuel */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Fuel</label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={filters.fuelType}
            onChange={(e) => handleFilterChange("fuelType", e.target.value)}
          >
            <option>All</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
            <option>CNG</option>
            <option>Hybrid</option>
          </select>
        </div>

        {/* Transmission */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Transmission</label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={filters.transmission}
            onChange={(e) =>
              handleFilterChange("transmission", e.target.value)
            }
          >
            <option>All</option>
            <option>Manual</option>
            <option>Automatic</option>
          </select>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="w-full bg-gradient-to-r from-blue-900 to-blue-400 text-white py-2 rounded-md font-medium"
        >
          Apply
        </button>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="w-full mt-3 text-blue-600 font-medium hover:underline"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
