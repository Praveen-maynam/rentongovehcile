import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { useListedBikesStore } from "../store/listedBikes.store";

// Images & Icons
import EnfieldBike from "../assets/images/Enfield.png";
import YamahaBike from "../assets/images/yamaha.png";
import TVSNtorqBike from "../assets/images/tvs-ntorq.png";
import ActivaBike from "../assets/images/Activa.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import BikeLogo from "../assets/icons/BikeLogo.png";
import CarLogo from "../assets/icons/CarLogo.png";
import AutoLogo from "../assets/icons/AutoLogo.png";
import FilterLogo from "../assets/icons/FilterLogo.png";

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
  id?: string; // Optional for user-added bikes
}

const initialBikes: Vehicle[] = [
  {
    name: "Royal Enfield Classic 350",
    price: "120",
    transmission: "Manual",
    fuel: "Petrol",
    seats: "2 Seaters",
    location: "Kakinada, Gandhi Nagar near Varnika Function Hall",
    rating: "4.6",
    available: true,
    image: EnfieldBike,
  },
  {
    name: "Yamaha FZ-S",
    price: "100",
    transmission: "Manual",
    fuel: "Petrol",
    seats: "2 Seaters",
    location: "Rajahmundry, near RTC Complex",
    rating: "4.4",
    available: true,
    image: YamahaBike,
  },
  {
    name: "TVS Ntorq",
    price: "90",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: "2 Seaters",
    location: "Kakinada, Jagannaickpur",
    rating: "4.3",
    available: true,
    image: TVSNtorqBike,
  },
  {
    name: "Honda Activa 6G",
    price: "80",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: "2 Seaters",
    location: "Vijayawada, Benz Circle",
    rating: "4.6",
    available: true,
    image: ActivaBike,
  },
];

const ListedBikes: React.FC = () => {
  const navigate = useNavigate();
  const { bikes: userListedBikes, deleteBike } = useListedBikesStore();

  const [bikes, setBikes] = useState<Vehicle[]>(initialBikes);
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedList, setSelectedList] = useState<"cars" | "autos" | "bikes">("bikes");

  // Combine default bikes with user-added bikes
  const allBikes = useMemo(() => {
    const userBikes: Vehicle[] = userListedBikes.map((bike) => ({
      name: bike.vehicleName,
      price: bike.farePrice,
      transmission: bike.transmission || "Manual",
      fuel: bike.fuel || "Petrol",
      seats: "2 Seaters",
      location: bike.description || "Unknown Location",
      rating: bike.rating.toString(),
      available: true,
      image: bike.photos[0] || EnfieldBike,
      id: bike.id,
    }));
    return [...userBikes, ...bikes];
  }, [userListedBikes, bikes]);

  const handleStatusChange = (index: number, value: string) => {
    const newBikes = [...allBikes];
    newBikes[index].available = value === "Available";
    if (!newBikes[index].id) setBikes(newBikes.filter((b) => !b.id));
  };

  const handleEdit = (vehicle: Vehicle) => {
    alert(`Edit clicked for ${vehicle.name}`);
    setMenuOpenIndex(null);
  };

  const handleDeleteVehicle = (vehicle: Vehicle) => {
    if (!window.confirm(`Delete ${vehicle.name}?`)) return;
    if (vehicle.id) deleteBike(vehicle.id);
    else setBikes(bikes.filter((b) => b.name !== vehicle.name));
    alert(`${vehicle.name} deleted.`);
    setMenuOpenIndex(null);
  };

  const handleMenuToggle = (index: number) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  const handleBikeClick = (vehicle: Vehicle) => {
    navigate(`/vehicle-details/${vehicle.name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const filteredBikes = allBikes.filter((bike) =>
    bike.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-6 gap-4">
        {/* Dropdown */}
        <div className="flex items-center w-[300px] h-[50px] border rounded-lg px-3">
          <img src={BikeLogo} alt="Vehicle Logo" className="w-[24px] h-[24px]" />
          <select
            className="flex-1 ml-2 border-none outline-none text-sm"
            value={selectedList}
            onChange={(e) => {
              const value = e.target.value as "cars" | "autos" | "bikes";
              setSelectedList(value);
              if (value === "cars") navigate("/listed-cars");
              else if (value === "autos") navigate("/listed-autos");
              else navigate("/listed-bikes");
            }}
          >
            <option value="bikes">Listed Bikes</option>
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
            <img src={FilterLogo} alt="Filter" className="w-6 h-6" />
            Filter
          </button>
        </div>
      </div>

      <h2 className="text-5xl font-semibold mb-6">Listed Bikes</h2>

      {/* Bike Cards */}
      <div className="flex flex-col gap-6">
        {filteredBikes.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-start bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition w-[1200px] h-[307px] overflow-hidden cursor-pointer"
            onClick={() => handleBikeClick(item)}
          >
            {/* Image */}
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
                <span className="flex items-center justify-center w-[72px] h-[32px] text-gray-700 text-sm">
                  ⭐ {item.rating}
                </span>
              </div>
              <p className="font-bold text-blue-600 text-lg mt-1">₹{item.price}/hr</p>
              <div className="flex flex-col gap-2 mt-2 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <img src={AutomaticLogo} alt="Transmission" className="w-[25px] h-[25px]" />
                  <span>{item.transmission}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={DriverLogo} alt="Seats" className="w-[25px] h-[25px]" />
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

            {/* Status & Menu */}
            <div className="flex flex-col items-end w-full sm:w-auto mt-3 sm:mt-0">
              <div className="flex items-center gap-2">
                <select
                  className={`text-sm font-medium px-2 py-1 rounded-lg border ${
                    item.available
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-red-100 text-red-700 border-red-300"
                  }`}
                  value={item.available ? "Available" : "Not Available"}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleStatusChange(index, e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>

                <div className="relative">
                  <button
                    className="p-2 rounded hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuToggle(index);
                    }}
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>

                  {menuOpenIndex === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-100 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteVehicle(item);
                        }}
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

export default ListedBikes;
