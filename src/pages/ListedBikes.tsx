import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";

import Enfield from "../assets/images/Enfield.png";
import yamaha from "../assets/images/yamaha.png";
import TVSNtorqBike from "../assets/images/tvs-ntorq.png";
import ActivaBike from "../assets/images/Activa.png";

import CarLogo from "../assets/icons/CarLogo.png";
import AutoLogo from "../assets/icons/AutoLogo.png";
import BikeLogo from "../assets/icons/BikeLogo.png";
import FilterLogo from "../assets/icons/FilterLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import Petrol from "../assets/icons/Petrol.png";
import Location from "../assets/icons/Location.png";
import Search from "../assets/icons/Search.png";

import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
import FilterCard from "../components/ui/FilterCard";
import { Vehicle } from "../types/Vehicle";
import { useListedBikesStore } from "../store/listedBikes.store";
import { useLocation } from "../store/location.context";

const defaultBikes: Vehicle[] = [
  {
    id: "b1",
    name: "Royal Enfield",
    price: 120,
    transmission: "Manual",
    fuel: "Petrol",
    seats: 2,
    location: "Kakinada, Main Road",
    rating: 4.6,
    available: true,
    image: Enfield,
    type: "bike",
    description: "Powerful and comfortable cruiser.",
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
    description: "Sporty and reliable for city rides.",
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
    description: "Smart scooter with Bluetooth features.",
  },
  {
    id: "b4",
    name: "Honda Activa 6G",
    price: 90,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 2,
    location: "Visakhapatnam, Dwaraka Nagar",
    rating: 4.2,
    available: true,
    image: ActivaBike,
    type: "bike",
    description: "Smooth and efficient city scooter.",
  },
];

const ListedBikes: React.FC = () => {
  const [bikes, setBikes] = useState<Vehicle[]>(defaultBikes);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const [selectedList, setSelectedList] = useState<"cars" | "autos" | "bikes">("bikes");

  const navigate = useNavigate();
  const { currentCity } = useLocation();
  const { bikes: userListedBikes, deleteBike } = useListedBikesStore();

  // ✅ Merge default + user-listed bikes
  const allBikes = useMemo(() => {
    const userBikesAsVehicles: Vehicle[] = userListedBikes.map((bike) => ({
      id: bike.id,
      name: bike.vehicleName,
      price: parseFloat(bike.farePrice) || 0,
      transmission: bike.transmission || "Manual",
      fuel: bike.fuel || "Petrol",
      seats: 2,
      location: bike.city ? `${bike.city}, ${bike.street || ""}` : "Unknown Location",
      rating: bike.rating || 0,
      available: true,
      image: bike.photos?.[0] || BikeLogo,
      type: "bike",
      description: bike.description || "No description provided",
    }));

    const allVehicles = [...userBikesAsVehicles, ...bikes];
    return allVehicles.filter((vehicle) => {
      const vehicleCity = vehicle.location?.split(",")[0].trim() || "";
      return vehicleCity.toLowerCase() === currentCity.toLowerCase();
    });
  }, [userListedBikes, bikes, currentCity]);

  const filteredBikes = allBikes.filter((bike) =>
    bike.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dropdownIcon =
    selectedList === "cars" ? CarLogo : selectedList === "autos" ? AutoLogo : BikeLogo;

  const handleStatusChange = (index: number, value: string) => {
    const updatedBikes = [...bikes];
    const vehicle = updatedBikes[index];
    const isNowAvailable = value === "Available";

    vehicle.available = isNowAvailable;
    setBikes(updatedBikes);

    if (!isNowAvailable) {
      setSelectedVehicle(vehicle);
      setShowCalendarModal(true);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    navigate("/Car-Details", {
      state: {
        carData: vehicle,
        openEditForm: true,
      },
    });
    setMenuOpenIndex(null);
  };

  const handleDeleteVehicle = (vehicle: Vehicle) => {
    const confirmDelete = window.confirm(`Delete ${vehicle.name}?`);
    if (confirmDelete) {
      if (vehicle.id) deleteBike(vehicle.id);
      else setBikes(bikes.filter((a) => a.name !== vehicle.name));
      alert(`${vehicle.name} deleted.`);
    }
    setMenuOpenIndex(null);
  };

  const handleMenuToggle = (index: number) =>
    setMenuOpenIndex(menuOpenIndex === index ? null : index);

  const handleCardClick = (vehicle: Vehicle) => {
    navigate(`/vehicle-details/${vehicle.name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <>
      <div
        className={`p-4 sm:p-6 bg-gray-50 min-h-screen transition-all duration-300 ${
          showCalendarModal ? "blur-sm" : ""
        }`}
      >
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
          <div className="flex items-center w-full md:w-[300px] h-[50px] border rounded-lg px-3">
            <img src={dropdownIcon} alt="Dropdown Icon" className="w-[24px] h-[24px]" />
            <select
              className="flex-1 ml-2 border-none outline-none text-sm"
              value={selectedList}
              onChange={(e) => {
                const value = e.target.value as "cars" | "autos" | "bikes";
                setSelectedList(value);
                if (value === "cars") navigate("/listed");
                else if (value === "autos") navigate("/listed-autos");
                else navigate("/listed-bikes");
              }}
            >
              <option value="cars">Listed Cars</option>
              <option value="autos">Listed Autos</option>
              <option value="bikes">Listed Bikes</option>
            </select>
          </div>

          {/* Search + Filter */}
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-[300px] h-[40px]">
              <img
                src={Search}
                alt="Search"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full rounded-full border pl-12 pr-4 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1 rounded-md hover:opacity-100 transition-all"
            >
              <img src={FilterLogo} alt="Filter" className="w-6 h-6" />
              Filter
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-semibold mb-6">Listed Bikes in {currentCity}</h2>

        {/* Bike List */}
        <div className="flex flex-col gap-6">
          {filteredBikes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-2">No bikes listed in {currentCity}</p>
              <p className="text-gray-400 text-sm">
                Try changing your location to see more vehicles
              </p>
            </div>
          ) : (
            filteredBikes.map((item, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row justify-between items-start bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition w-full max-w-full lg:max-w-[800px] cursor-pointer"
                onClick={() => handleCardClick(item)}
              >
                {/* Image */}
                <div className="w-full sm:w-[270px] h-[150px] sm:h-[200px] overflow-hidden rounded-lg flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 mt-3 sm:mt-0 sm:ml-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-semibold text-lg sm:text-xl">{item.name}</h3>
                    <span className="flex items-center justify-center w-[72px] h-[32px] text-gray-700 text-sm">
                      ⭐ {item.rating}
                    </span>
                  </div>

                  <p className="font-bold text-blue-600 text-2xl sm:text-3xl mt-2">
                    ₹{item.price}/km
                  </p>

                  <div className="flex flex-col gap-2 mt-4 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <img src={DriverLogo} alt="Seats" className="w-[25px] h-[25px]" />
                      <span>{item.seats} Seater</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={Petrol} alt="Fuel" className="w-[25px] h-[25px]" />
                      <span>{item.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={Location} alt="Location" className="w-[25px] h-[25px]" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Menu + Status */}
                <div className="flex flex-col items-end w-full lg:w-auto mt-3 lg:mt-0">
                  <div className="flex items-center gap-2 justify-end">
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
            ))
          )}
        </div>
      </div>

      {/* ✅ Calendar Modal */}
      {showCalendarModal && selectedVehicle && (
        <AvailabilityDateTimeModal
          isOpen={showCalendarModal}
          onClose={() => setShowCalendarModal(false)}
          onConfirm={(startDate, endDate, startTime, endTime) => {
            console.log({
              startDate,
              endDate,
              startTime,
              endTime,
              forVehicle: selectedVehicle.name,
            });
            setShowCalendarModal(false);
          }}
        />
      )}

      {/* Filter Modal */}
      {showFilter && <FilterCard onApply={() => setShowFilter(false)} />}
    </>
  );
};

export default ListedBikes;
