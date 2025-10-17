import React from "react";
import { Dialog } from "@headlessui/react";

type Props = { onClose: () => void };

const FilterCard: React.FC<Props> = ({ onClose }) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="bg-white rounded-2xl p-6 w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Filter</h2>

        {/* Price Range */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Price Range</label>
          <input type="range" min={100} max={1000} className="w-full" />
        </div>

        {/* Seats */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Seats</label>
          <select className="w-full border rounded-lg px-3 py-1">
            <option value="">Any</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Fuel Type */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Fuel Type</label>
          <select className="w-full border rounded-lg px-3 py-1">
            <option value="">Any</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
          </select>
        </div>

        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
        >
          Apply Filters
        </button>
      </Dialog.Panel>
    </Dialog>
  );
};

export default FilterCard;
