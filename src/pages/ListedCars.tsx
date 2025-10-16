import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Car, Bike } from "lucide-react";

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

const cars: Vehicle[] = [
  {
    name: "Hyundai Verna",
    price: "250",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: "5 Seaters",
    location: "Kakinada, Gandhi Nagar near Varnika Function Hall",
    rating: "4.2",
    available: false,
    image: "/verna.jpg",
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
    image: "/city.jpg",
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
    image: "/nexon.jpg",
  },
];

const autos: Vehicle[] = [
  {
    name: "Bajaj RE",
    price: "150",
    transmission: "Manual",
    fuel: "CNG",
    seats: "3 Seaters",
    location: "Kakinada, Main Road",
    rating: "4.0",
    available: true,
    image: "/auto1.jpg",
  },
  {
    name: "Piaggio Ape",
    price: "160",
    transmission: "Manual",
    fuel: "Diesel",
    seats: "3 Seaters",
    location: "Rajahmundry, Kotipalli Bus Stand",
    rating: "4.3",
    available: true,
    image: "/auto2.jpg",
  },
   // ✅ New car added
  {
    name: "Maruti Swift",
    price: "220",
    transmission: "Manual",
    fuel: "Petrol",
    seats: "5 Seaters",
    location: "Vijayawada, Benz Circle",
    rating: "4.1",
    available: true,
    image: "/swift.jpg",
  },
];

const ListedCars: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const [selectedList, setSelectedList] = useState<"cars" | "autos">("cars");

  const handleStatusChange = (status: string) => {
    if (status === "Available") {
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
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (confirmDelete) {
      alert(`${name} deleted.`);
    }
    setMenuOpenIndex(null);
  };

  const currentList = selectedList === "cars" ? cars : autos;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Dropdown above title */}
      <div className="mb-4">
        <select
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none"
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value as "cars" | "autos")}
        >
          <option value="cars">🚗 List of Cars</option>
          <option value="autos">🛺 List of Autos</option>
        </select>
      </div>

      {/* Header with title + search/filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <div className="flex items-center gap-2">
          {selectedList === "cars" ? (
            <Car className="text-blue-600 w-6 h-6" />
          ) : (
            <Bike className="text-blue-600 w-6 h-6" />
          )}
          <h2 className="text-2xl font-semibold">
            {selectedList === "cars" ? "Listed Cars" : "Listed Autos"}
          </h2>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-lg px-2 py-1 w-full sm:w-56 focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm">
            Filter
          </button>
        </div>
      </div>

      {/* Vehicle List */}
      {currentList.map((item, index) => (
        <div
          key={index}
          className="relative flex flex-col sm:flex-row justify-between items-start bg-white shadow-md rounded-xl p-4 mb-4 hover:shadow-lg transition"
        >
          <div className="flex items-start gap-4 w-full sm:w-auto">
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <span className="text-gray-600 text-sm">⭐ {item.rating}</span>
              </div>
              <p className="font-bold text-blue-600 text-lg mt-1">
                ₹{item.price}/hr
              </p>
              <div className="text-gray-600 text-sm mt-1 leading-5">
                <p>{item.transmission}</p>
                <p>{item.seats}</p>
                <p>{item.fuel}</p>
                <p className="text-gray-500">{item.location}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end w-full sm:w-auto mt-3 sm:mt-0">
            <div className="flex items-center gap-2">
              <select
                className={`text-sm font-medium px-2 py-1 rounded-lg border ${
                  item.available
                    ? "bg-green-100 text-green-700 border-green-300"
                    : "bg-red-100 text-red-700 border-red-300"
                }`}
                defaultValue={item.available ? "Available" : "Not Available"}
                onChange={(e) => handleStatusChange(e.target.value)}
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
  );
};

export default ListedCars;
