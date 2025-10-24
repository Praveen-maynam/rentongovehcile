import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";

import AutoImage from "../assets/images/Auto.png";
import CarLogo from "../assets/icons/CarLogo.png";
import AutoLogo from "../assets/icons/AutoLogo.png";
import FilterLogo from "../assets/icons/FilterLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";

import FilterCard from "../components/ui/FilterCard";
import { Vehicle } from "../types/Vehicle";
import { useListedAutosStore } from "../store/listedAutos.store";
import { useLocation } from "../store/location.context";

const defaultAutos: Vehicle[] = [
  { id: "3", name: "Bajaj RE", price: 150, transmission: "Manual", fuel: "CNG", seats: 3, location: "Kakinada, Main Road", rating: 4.0, available: true, image: AutoImage, type: "auto" },
  { id: "4", name: "Piaggio Ape", price: 160, transmission: "Manual", fuel: "Diesel", seats: 3, location: "Rajahmundry, Kotipalli Bus Stand", rating: 4.3, available: true, image: AutoImage, type: "auto" },
  { id: "5", name: "TVS King", price: 155, transmission: "Manual", fuel: "CNG", seats: 3, location: "Vijayawada, MG Road", rating: 4.1, available: true, image: AutoImage, type: "auto" },
  { id: "6", name: "Mahindra Alfa", price: 165, transmission: "Manual", fuel: "Diesel", seats: 3, location: "Visakhapatnam, Dwaraka Nagar", rating: 4.4, available: true, image: AutoImage, type: "auto" },
];

const AutoPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentCity } = useLocation();
  const { autos: userListedAutos, deleteAuto } = useListedAutosStore();

  const [autos, setAutos] = useState<Vehicle[]>(defaultAutos);
  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<"cars" | "autos" | "bikes">("autos");
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);

  // Combine default autos with user-listed autos and filter by location
  const allAutos = useMemo(() => {
    const userAutosAsVehicles: Vehicle[] = userListedAutos.map((auto) => ({
      id: auto.id,
      name: `Auto ${auto.vehicleNumber}`,
      price: parseFloat(auto.farePrice) || 0,
      transmission: "Manual",
      fuel: "CNG",
      seats: 3,
      location: auto.ownerName,
      rating: auto.rating,
      available: true,
      image: auto.photos[0] || AutoImage,
      type: "auto",
    }));
    return [...autos, ...userAutosAsVehicles];
  }, [autos, userListedAutos]);

  const filteredAutos = allAutos.filter((v) =>
    v.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const dropdownIcon = selectedList === "cars" ? CarLogo : selectedList === "bikes" ? AutoImage : AutoLogo;

  const handleDropdownChange = (value: "cars" | "autos" | "bikes") => {
    setSelectedList(value);
    navigate(
      value === "cars" ? "/listed-cars" :
      value === "autos" ? "/listed-autos" :
      "/listed-bikes"
    );
  };

  const handleStatusChange = (vehicle: Vehicle, value: string) => {
    if (!vehicle.id) return; // skip default autos
    const updatedAutos = allAutos.map((v) =>
      v.id === vehicle.id ? { ...v, available: value === "Available" } : v
    );
    setAutos(updatedAutos.filter((v) => !v.id));
  };

  const handleEdit = (vehicle: Vehicle) => {
    alert(`Edit clicked for ${vehicle.name}`);
    setMenuOpenIndex(null);
  };

  const handleDelete = (vehicle: Vehicle) => {
    if (!window.confirm(`Delete ${vehicle.name}?`)) return;

    if (vehicle.id && userListedAutos.some((auto) => auto.id === vehicle.id)) {
      deleteAuto(vehicle.id);
      alert(`${vehicle.name} deleted successfully.`);
    } else {
      setAutos(autos.filter((auto) => auto.id !== vehicle.id));
      alert(`${vehicle.name} deleted from default list.`);
    }
    setMenuOpenIndex(null);
  };

  const handleMenuToggle = (index: number) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center w-full sm:w-[300px] h-[50px] border rounded-lg px-3 bg-white">
          <img src={dropdownIcon} alt="Dropdown Icon" className="w-[24px] h-[24px]" />
          <select
            className="flex-1 ml-2 border-none outline-none text-sm bg-transparent"
            value={selectedList}
            onChange={(e) => handleDropdownChange(e.target.value as "cars" | "autos" | "bikes")}
          >
            <option value="cars">Listed Cars</option>
            <option value="autos">Listed Autos</option>
            <option value="bikes">Listed Bikes</option>
          </select>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none h-[50px]">
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

      <h2 className="text-3xl font-semibold mb-6">Listed Autos in {currentCity}</h2>

      {/* Autos List */}
      <div className="flex flex-col gap-4 sm:gap-6">
        {filteredAutos.map((item, index) => (
          <div
            key={item.id || index}
            className="flex flex-col sm:flex-row justify-between items-start bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition w-full sm:w-[1200px] overflow-hidden"
          >
            {/* Auto Image */}
            <div className="w-full sm:w-[270px] h-[200px] sm:h-[270px] overflow-hidden rounded-lg flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover object-[85%_50%]" />
            </div>

            {/* Details */}
            <div className="flex-1 mt-3 sm:mt-0 sm:ml-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-semibold text-lg sm:text-xl">{item.name}</h3>
                <span className="flex items-center justify-center w-[72px] h-[32px] text-gray-700 text-sm border-2 border-yellow-400 rounded-lg">
                  ⭐ {item.rating}
                </span>
              </div>

              <p className="font-bold text-blue-600 text-2xl sm:text-3xl mt-2">₹{item.price}/km</p>

              <div className="flex flex-col gap-2 mt-4 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <img src={DriverLogo} alt="Seats" className="w-[25px] h-[25px]" />
                  <span>{item.seats} Seater</span>
                </div>
              </div>
            </div>

            {/* Menu and Status */}
            <div className="flex flex-col items-end w-full sm:w-auto mt-3 sm:mt-0 gap-2">
              <select
                className={`text-sm font-medium px-2 py-1 rounded-lg border ${
                  item.available
                    ? "bg-green-100 text-green-700 border-green-300"
                    : "bg-red-100 text-red-700 border-red-300"
                }`}
                value={item.available ? "Available" : "Not Available"}
                onChange={(e) => handleStatusChange(item, e.target.value)}
              />

              <div className="relative">
                <button className="p-2 rounded hover:bg-gray-100" onClick={() => handleMenuToggle(index)}>
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
        ))}
      </div>

      {isFilterOpen && <FilterCard onApply={() => setIsFilterOpen(false)} />}
    </div>
  );
};

export default AutoPage;
