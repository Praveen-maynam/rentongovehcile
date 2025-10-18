// import React from "react";
// import { Dialog } from "@headlessui/react";

// 
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
//     >
//       <Dialog.Panel className="bg-white rounded-2xl p-6 w-80 shadow-lg">
//         <h2 className="text-lg font-semibold mb-4">Filter</h2>

//         {/* Price Range */}
//         <div className="mb-4">
//           <label className="block mb-2 font-medium text-gray-700">Price Range</label>
//           <input type="range" min={100} max={1000} className="w-full" />
//         </div>

//         {/* Seats */}
//         <div className="mb-4">
//           <label className="block mb-2 font-medium text-gray-700">Seats</label>
//           <select className="w-full border rounded-lg px-3 py-1">
//             <option value="">Any</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//             <option value="5">5+</option>
//           </select>
//         </div>

//         {/* Fuel Type */}
//         <div className="mb-4">
//           <label className="block mb-2 font-medium text-gray-700">Fuel Type</label>
//           <select className="w-full border rounded-lg px-3 py-1">
//             <option value="">Any</option>
//             <option value="Petrol">Petrol</option>
//             <option value="Diesel">Diesel</option>
//             <option value="CNG">CNG</option>
//           </select>
//         </div>

//         <button
//           onClick={onClose}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
//         >
//           Apply Filters
//         </button>
//       </Dialog.Panel>
//     </Dialog>
//   );
// };

// export default FilterCard;

import React, { useState } from "react";

interface FilterCardProps {
  onApply: () => void; // called when Apply or Close is pressed
}

const FilterCard: React.FC<FilterCardProps> = ({ onApply }) => {
  const [priceRange, setPriceRange] = useState(250);
  const [distance, setDistance] = useState(3);
  const [vehicleType, setVehicleType] = useState<string[]>([]);

  const handleCheckboxChange = (type: string) => {
    setVehicleType((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="fixed inset-0   flex justify-end ">
      <div className="absolute right-6 top-[150px] w-full sm:w-[200px] bg-white shadow-xl rounded-lg p-6 border z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
          <button
            onClick={onApply}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Vehicle Type */}
        <div className="mb-6">
          <p className="font-medium mb-2">Vehicle Type</p>
          <label className="block text-sm">
            <input
              type="checkbox"
              checked={vehicleType.includes("car")}
              onChange={() => handleCheckboxChange("car")}
              className="mr-2"
            />
            Cars
          </label>
          <label className="block text-sm">
            <input
              type="checkbox"
              checked={vehicleType.includes("auto")}
              onChange={() => handleCheckboxChange("auto")}
              className="mr-2"
            />
            Autos
          </label>
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

        {/* Dropdowns */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Car Name</label>
          <select className="w-full border rounded-md px-3 py-2 text-sm">
            <option value="">Select</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Ford">Ford</option>
            <option value="Tata">Tata</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Fuel</label>
          <select className="w-full border rounded-md px-3 py-2 text-sm">
            <option value="">Select</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium mb-1">Transmission</label>
          <select className="w-full border rounded-md px-3 py-2 text-sm">
            <option value="">Select</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>

        {/* Apply Button */}
        <button
          onClick={onApply}
          className="w-full bg-gradient-to-r from-blue-900 to-blue-400 text-white py-2 rounded-md font-medium"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
