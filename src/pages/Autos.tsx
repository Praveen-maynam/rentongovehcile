import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bike, Search } from "lucide-react";
import VehicleCard from "../components/ui/VehicleCard";
import FilterCard from "../components/ui/FilterCard";
import { Vehicle } from "../types/Vehicle";

// Autos data
const autos: Vehicle[] = [
  { id: "3", name: "Bajaj RE", price: 150, transmission: "Manual", fuel: "CNG", seats: 3, location: "Kakinada, Main Road", rating: 4.0, available: true, image: "/auto1.jpg", type: "auto" },
  { id: "4", name: "Piaggio Ape", price: 160, transmission: "Manual", fuel: "Diesel", seats: 3, location: "Rajahmundry, Kotipalli Bus Stand", rating: 4.3, available: true, image: "/auto2.jpg", type: "auto" },
  { id: "5", name: "TVS King", price: 155, transmission: "Manual", fuel: "CNG", seats: 3, location: "Vijayawada, MG Road", rating: 4.1, available: true, image: "/auto3.jpg", type: "auto" },
  { id: "6", name: "Mahindra Alfa", price: 165, transmission: "Manual", fuel: "Diesel", seats: 3, location: "Visakhapatnam, Dwaraka Nagar", rating: 4.4, available: true, image: "/auto4.jpg", type: "auto" },
];

const AutoPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredAutos = autos.filter(
    (v) =>
      v.name.toLowerCase().includes(searchText.toLowerCase()) ||
      v.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (vehicle: Vehicle) => {
    alert(`Edit clicked for ${vehicle.name}`);
  };

  const handleDelete = (vehicle: Vehicle) => {
    const confirmDelete = window.confirm(`Delete ${vehicle.name}?`);
    if (confirmDelete) alert(`${vehicle.name} deleted.`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Controls: Search + Filter */}
      <div className="flex justify-end items-center gap-2 mb-4">
        {/* Search Box */}
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

        {/* Filter Button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
        >
          Filter
        </button>
      </div>

      {/* Title + View More */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Bike className="text-blue-600 w-6 h-6" />
          <h2 className="text-2xl font-semibold">Looking for an Auto?</h2>
        </div>
        <button className="text-blue-600 hover:underline font-medium">
          View More →
        </button>
      </div>

      {/* Vertical Autos List */}
      <div className="flex flex-col gap-4">
        {filteredAutos.length > 0 ? (
          filteredAutos.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              showActions
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-500">No autos found.</p>
        )}
      </div>

      {/* Filter Modal */}
      {isFilterOpen && <FilterCard onClose={() => setIsFilterOpen(false)} />}
    </div>
  );
};

export default AutoPage;
