import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import rentauto from "../assets/rentauto.png";
import carlogo from "../assets/carlogo.png";
import autoLogo from "../assets/auto.png";
import filterIcon from "../assets/filter.png";
import VehicleCard from "../components/ui/VehicleCard";
import FilterCard from "../components/ui/FilterCard";
import { Vehicle } from "../types/Vehicle";
 
// Autos data
const autos: Vehicle[] = [
  { id: "3", name: "Bajaj RE", price: 150, transmission: "Manual", fuel: "CNG", seats: 3, location: "Kakinada, Main Road", rating: 4.0, available: true, image: rentauto, type: "auto" },
  { id: "4", name: "Piaggio Ape", price: 160, transmission: "Manual", fuel: "Diesel", seats: 3, location: "Rajahmundry, Kotipalli Bus Stand", rating: 4.3, available: true, image: rentauto, type: "auto" },
  { id: "5", name: "TVS King", price: 155, transmission: "Manual", fuel: "CNG", seats: 3, location: "Vijayawada, MG Road", rating: 4.1, available: true, image: rentauto, type: "auto" },
  { id: "6", name: "Mahindra Alfa", price: 165, transmission: "Manual", fuel: "Diesel", seats: 3, location: "Visakhapatnam, Dwaraka Nagar", rating: 4.4, available: true, image: rentauto, type: "auto" },
];
 
const AutoPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<"cars" | "autos">("autos");
 
  const filteredAutos = autos.filter(
    (v) =>
      v.name.toLowerCase().includes(searchText.toLowerCase()) ||
      v.location.toLowerCase().includes(searchText.toLowerCase())
  );
 
  const handleEdit = (vehicle: Vehicle) => alert(`Edit clicked for ${vehicle.name}`);
  const handleDelete = (vehicle: Vehicle) => {
    if (window.confirm(`Delete ${vehicle.name}?`)) alert(`${vehicle.name} deleted.`);
  };
 
  const dropdownIcon = selectedList === "cars" ? carlogo : autoLogo;
 
  // Navigate on dropdown change
  const handleDropdownChange = (value: "cars" | "autos") => {
    setSelectedList(value);
    if (value === "cars") navigate("/listed-cars");
    else navigate("/auto");
  };
 
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Row: Dropdown + Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Dropdown */}
        <div className="flex items-center w-[300px] h-[50px] border rounded-lg px-3">
          <img src={dropdownIcon} alt="Dropdown Logo" className="w-[24px] h-[24px]" />
          <select
            className="flex-1 ml-2 border-none outline-none text-sm"
            value={selectedList}
            onChange={(e) => handleDropdownChange(e.target.value as "cars" | "autos")}
          >
            <option value="cars">Listed Cars</option>
            <option value="autos">Listed Autos</option>
          </select>
        </div>
 
        {/* Search + Filter */}
        <div className="flex gap-2">
          <div className="relative w-[300px] h-[50px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-full rounded-full border pl-12 pr-4 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1 rounded-md hover:opacity-100 transition-all">
            <img src={filterIcon} alt="Filter" className="w-6 h-6" />
            Filter
          </button>
        </div>
      </div>
 
      {/* Title */}
      <h2 className="text-3xl font-semibold mb-6">
        Listed Auto's
      </h2>
 
      {/* Autos List */}
      <div className="flex flex-col gap-4">
        {filteredAutos.length > 0 ? (
          filteredAutos.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={{ ...v, image: rentauto }}
              showActions
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-500">No autos found.</p>
        )}
      </div>
 
      {isFilterOpen && <FilterCard onApply={() => setIsFilterOpen(false)} />}
    </div>
  );
};
 
export default AutoPage;
 
 