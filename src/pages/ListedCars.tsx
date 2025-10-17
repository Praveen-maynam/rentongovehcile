import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import blackcar from "../assets/blackcar.png";
import automaticLogo from "../assets/automatic.png";
import driverLogo from "../assets/driver.png";
import carlogo from "../assets/carlogo.png";
import autoLogo from "../assets/auto.png";
import filterIcon from "../assets/filter.png";

interface Vehicle {
  name: string;
  price: string;
  transmission: string;
  fuel: string;
  seats: string;
  location: string;
  rating: string;
  available: boolean;
  image: string;
}

const initialCars: Vehicle[] = [
  {
    name: "Hyundai Verna",
    price: "250",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: "5 Seaters",
    location: "Kakinada, Gandhi Nagar near Varnika Function Hall",
    rating: "4.2",
    available: false,
    image: blackcar,
  },
  {
    name: "Honda City",
    price: "300",
    transmission: "Manual",
    fuel: "Diesel",
    seats: "5 Seaters",
    location: "Rajahmundry, near RTC Complex",
    rating: "4.5",
    available: true,
    image: blackcar,
  },
  {
    name: "Tata Nexon",
    price: "280",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: "5 Seaters",
    location: "Kakinada, Jagannaickpur",
    rating: "4.3",
    available: true,
    image: blackcar,
  },
  {
    name: "Maruti Swift",
    price: "220",
    transmission: "Manual",
    fuel: "Petrol",
    seats: "5 Seaters",
    location: "Vijayawada, Benz Circle",
    rating: "4.1",
    available: true,
    image: blackcar,
  },
];

const ListedCars: React.FC = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Vehicle[]>(initialCars);
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const [selectedList, setSelectedList] = useState<"cars" | "autos">("cars");
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusChange = (index: number, value: string) => {
    const newCars = [...cars];
    newCars[index].available = value === "Available"; // update availability
    setCars(newCars);

    if (value === "Available") {
      navigate("/calendar");
    }
  };

  const handleMenuToggle = (index: number) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  const handleEdit = (name: string) => {
    alert(`Edit clicked for ${name}`);
    setMenuOpenIndex(null);
  };

  const handleDelete = (name: string) => {
    if (window.confirm(`Delete ${name}?`)) alert(`${name} deleted.`);
    setMenuOpenIndex(null);
  };

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dropdownIcon = selectedList === "cars" ? carlogo : autoLogo;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-6 gap-4">
        {/* Dropdown */}
        <div className="flex items-center w-[300px] h-[50px] border rounded-lg px-3">
          <img src={dropdownIcon} alt="Dropdown Logo" className="w-[24px] h-[24px]" />
          <select
            className="flex-1 ml-2 border-none outline-none text-sm"
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value as "cars" | "autos")}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
      <h2 className="text-5xl font-semibold mb-6">
        {selectedList === "cars" ? "Listed Car's" : "Listed Auto's"}
      </h2>

      {/* Listed Cars */}
      <div className="flex flex-col gap-6">
        {filteredCars.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-start bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition w-[1200px] h-[307px] overflow-hidden"
          >
            {/* Car Image */}
            <div className="w-[270px] h-[270px] overflow-hidden rounded-lg flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-[270px] h-[270px] object-cover object-[85%_50%] m-0 p-0"
              />
            </div>

            {/* Details */}
            <div className="flex-1 mt-3 sm:mt-0 sm:ml-4">
              <div className="flex items-center gap-4">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <span className="flex items-center justify-center w-[72px] h-[32px] text-gray-700 text-sm">
                  ⭐ {item.rating}
                </span>
              </div>

              <p className="font-bold text-blue-600 text-lg mt-1">
                ₹{item.price}/hr
              </p>

              <div className="flex flex-col gap-2 mt-2 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <img src={automaticLogo} alt="Transmission" className="w-[25px] h-[25px]" />
                  <span>{item.transmission}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={driverLogo} alt="Seats" className="w-[25px] h-[25px]" />
                  <span>{item.seats}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⛽</span>
                  <span>{item.fuel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{item.location}</span>
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
                        onClick={() => handleEdit(item.name)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.name)}
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
    </div>
  );
};

export default ListedCars;
