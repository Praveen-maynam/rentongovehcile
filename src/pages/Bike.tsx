import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";

import Enfield from "../assets/images/Enfield.png";
import yamaha from "../assets/images/yamaha.png";
import TVSNtorqBike from "../assets/images/tvs-ntorq.png";
import ActivaBike from "../assets/images/Activa.png";
import CarLogo from "../assets/icons/CarLogo.png";
import AutoLogo from "../assets/icons/AutoLogo.png";
import bikeLogo from "../assets/icons/bike.png"; // ✅ ensure actual file matches

import FilterLogo from "../assets/icons/FilterLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";

import FilterCard from "../components/ui/FilterCard";
import { Vehicle } from "../types/Vehicle";
import { useListedBikesStore } from "../store/listedBikes.store";

// ✅ Default bikes data
const defaultBikes: Vehicle[] = [
  {
    id: "b1",
    name: "Royal Enfield Classic 350",
    price: 120,
    transmission: "Manual",
    fuel: "Petrol",
    seats: 2,
    location: "Kakinada, Main Road",
    rating: 4.6,
    available: true,
    image: Enfield,
    type: "bike",
  },
  {
    id: "b2",
    name: "Yamaha FZ-S",
    price: 100,
    transmission: "Manual",
    fuel: "Petrol",
    seats: 2,
    location: "Rajahmundry, Kotipalli Bus Stand",
    rating: 4.3,
    available: true,
    image: yamaha,
    type: "bike",
  },
  {
    id: "b3",
    name: "TVS Ntorq",
    price: 100,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 2,
    location: "Vijayawada, MG Road",
    rating: 4.4,
    available: true,
    image: TVSNtorqBike,
    type: "bike",
  },
  {
    id: "b4",
    name: "Honda Activa 6G",
    price: 90,
    transmission: "Manual",
    fuel: "Petrol",
    seats: 2,
    location: "Visakhapatnam, Dwaraka Nagar",
    rating: 4.2,
    available: true,
    image: ActivaBike,
    type: "bike",
  },
];

const BikePage: React.FC = () => {
  const navigate = useNavigate();
  const { bikes: userListedBikes, deleteBike } = useListedBikesStore();
  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<"cars" | "autos" | "bikes">("bikes");
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);

  // ✅ Combine default bikes with user-added bikes
  const allBikes = useMemo(() => {
    const userBikesAsVehicles: Vehicle[] = userListedBikes.map((bike) => ({
      id: bike.id,
      name: bike.vehicleName,                        // correct field
          price: parseFloat(bike.farePrice) || 0,    // correct field
      transmission: bike.transmission || "Manual",
      fuel: bike.fuel || "Petrol",                // correct field
      seats: 2,
      
      location: bike.description || "Unknown Location", 
      rating: bike.rating,
      available: true,
      image: bike.photos[0] || bikeLogo,
      type: "bike" as const,
    }));
    return [...defaultBikes, ...userBikesAsVehicles];
  }, [userListedBikes]);

  const filteredBikes = allBikes.filter((v) =>
    v.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const dropdownIcon =
    selectedList === "cars" ? CarLogo : selectedList === "autos" ? AutoLogo : bikeLogo;

  const handleDropdownChange = (value: "cars" | "autos" | "bikes") => {
    setSelectedList(value);
    navigate(
      value === "cars" ? "/listed-cars" : value === "autos" ? "/auto" : "/bikes"
    );
  };

  const handleMenuToggle = (index: number) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  const handleStatusChange = (index: number, value: string) => {
    if (value === "Available") {
      navigate("/Calendar");
    }
  };

  const handleEdit = (vehicle: Vehicle) => alert(`Edit clicked for ${vehicle.name}`);

  const handleDelete = (vehicle: Vehicle) => {
    if (window.confirm(`Delete ${vehicle.name}?`)) {
      const isUserBike = userListedBikes.some((bike) => bike.id === vehicle.id);
      if (isUserBike) {
        deleteBike(vehicle.id);
        alert(`${vehicle.name} deleted successfully.`);
      } else {
        alert("Cannot delete default bikes.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center w-[300px] h-[50px] border rounded-lg px-3 bg-white">
          <img src={dropdownIcon} alt="Dropdown Icon" className="w-[24px] h-[24px]" />
          <select
            className="flex-1 ml-2 border-none outline-none text-sm bg-transparent"
            value={selectedList}
            onChange={(e) =>
              handleDropdownChange(e.target.value as "cars" | "autos" | "bikes")
            }
          >
            <option value="cars">Listed Cars</option>
            <option value="autos">Listed Autos</option>
            <option value="bikes">Listed Bikes</option>
          </select>
        </div>

        <div className="flex gap-2">
          <div className="relative w-[300px] h-[50px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">🔍</span>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-full rounded-full border pl-12 pr-4 focus:outline-none bg-white"
            />
          </div>
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1 rounded-md hover:opacity-90 transition-all"
            onClick={() => setIsFilterOpen(true)}
          >
            <img src={FilterLogo} alt="Filter" className="w-6 h-6" />
            Filter
          </button>
        </div>
      </div>

      <h2 className="text-3xl font-semibold mb-6">Listed Bikes</h2>

      {/* Bikes List */}
      <div className="flex flex-col gap-6">
        {filteredBikes.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-start bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition w-[1200px] h-[307px] overflow-hidden"
          >
            {/* Bike Image */}
            <div className="w-[270px] h-[270px] overflow-hidden rounded-lg flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-[270px] h-[270px] object-cover object-center"
              />
            </div>

            {/* Details */}
            <div className="flex-1 mt-3 sm:mt-0 sm:ml-4">
              <div className="flex items-center gap-4">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <span className="flex items-center justify-center w-[72px] h-[32px] text-gray-700 text-sm border-2 border-yellow-400 rounded-lg">
                  ⭐ {item.rating}
                </span>
              </div>

              <p className="font-bold text-blue-600 text-3xl mt-2">₹{item.price}/km</p>

              <div className="flex flex-col gap-2 mt-4 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <img src={DriverLogo} alt="Seats" className="w-[25px] h-[25px]" />
                  <span>{item.seats} Seater</span>
                </div>
              </div>
            </div>

            {/* Menu and Status */}
            <div className="flex flex-col items-end w-full sm:w-auto mt-3 sm:mt-0">
              <div className="flex items-center gap-2">
                <select
                  className={`text-sm font-medium px-2 py-1 rounded-lg border ${
                    item.available
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-red-100 text-red-700 border-red-300"
                  }`}
                  value={item.available ? "Available" : "Not Available"}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>

                <div className="relative">
                  <button
                    className="p-2 rounded hover:bg-gray-100"
                    onClick={() => handleMenuToggle(index)}
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>

                  {menuOpenIndex === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-100 z-10">
                      <button
                        onClick={() => handleEdit(item)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isFilterOpen && <FilterCard onApply={() => setIsFilterOpen(false)} />}
    </div>
  );
};

export default BikePage;
