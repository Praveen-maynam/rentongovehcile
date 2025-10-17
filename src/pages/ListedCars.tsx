import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Bike, Search } from "lucide-react";
import VehicleCard from "../components/ui/VehicleCard";
import FilterCard from "../components/ui/FilterCard";
import { Vehicle } from "../types/Vehicle";

const cars: Vehicle[] = [
  { id: "1", name: "Hyundai Verna", price: 250, transmission: "Automatic", fuel: "Petrol", seats: 5, location: "Kakinada, Gandhi Nagar", rating: 4.2, available: false, image: "/verna.jpg", type: "car" },
  { id: "2", name: "Honda City", price: 300, transmission: "Manual", fuel: "Diesel", seats: 5, location: "Rajahmundry, RTC Complex", rating: 4.5, available: true, image: "/city.jpg", type: "car" },
];

const autos: Vehicle[] = [
  { id: "3", name: "Bajaj RE", price: 150, transmission: "Manual", fuel: "CNG", seats: 3, location: "Kakinada, Main Road", rating: 4.0, available: true, image: "/auto1.jpg", type: "auto" },
  { id: "4", name: "Piaggio Ape", price: 160, transmission: "Manual", fuel: "Diesel", seats: 3, location: "Rajahmundry, Kotipalli Bus Stand", rating: 4.3, available: true, image: "/auto2.jpg", type: "auto" },
];

const ListedCars: React.FC = () => {
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState<"cars" | "autos">("cars");
  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleStatusChange = (status: string, vehicle: Vehicle) => {
    if (status === "Available") {
      navigate("/calendar");
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    alert(`Edit clicked for ${vehicle.name}`);
  };

  const handleDelete = (vehicle: Vehicle) => {
    const confirmDelete = window.confirm(`Delete ${vehicle.name}?`);
    if (confirmDelete) alert(`${vehicle.name} deleted.`);
  };

  const currentList = (selectedList === "cars" ? cars : autos).filter(
    (v) =>
      v.name.toLowerCase().includes(searchText.toLowerCase()) ||
      v.location.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Controls: Dropdown + Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <select
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none"
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value as "cars" | "autos")}
        >
          <option value="cars">🚗 List of Cars</option>
          <option value="autos">🛺 List of Autos</option>
        </select>

        <div className="flex items-center gap-2">
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
      </div>

      {/* Title with Icon */}
      <div className="flex items-center gap-2 mb-4">
        {selectedList === "cars" ? (
          <Car className="text-blue-600 w-6 h-6" />
        ) : (
          <Bike className="text-blue-600 w-6 h-6" />
        )}
        <h2 className="text-2xl font-semibold">
          {selectedList === "cars" ? "Listed Cars" : "Listed Autos"}
        </h2>
      </div>

      {/* Vehicle Cards */}
      {currentList.length > 0 ? (
        currentList.map((v) => (
          <VehicleCard
            key={v.id}
            vehicle={v}
            showActions
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p className="text-gray-500">No vehicles found.</p>
      )}

      {/* Filter Modal */}
      {isFilterOpen && <FilterCard onClose={() => setIsFilterOpen(false)} />}
    </div>
  );
};

export default ListedCars;
