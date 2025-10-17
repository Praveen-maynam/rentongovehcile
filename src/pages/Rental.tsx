import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import VehicleCard from "../components/ui/VehicleCard";
import DateTimePicker from "../components/ui/DateTimePicker";
import AutoCarousel from "../components/AutoCarousel";
import FilterCard from "../components/ui/FilterCard";
import { Vehicle } from "../types/Vehicle";

const vehicles: Vehicle[] = [
  {
    id: "1",
    name: "Hyundai Verna",
    price: 250,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    rating: 4.2,
    image: "/verna.jpg",
    type: "car",
    location: "Bangalore",
    available: true,
  },
  {
    id: "2",
    name: "Maruti Swift",
    price: 180,
    seats: 5,
    transmission: "Manual",
    fuel: "Petrol",
    rating: 4.0,
    image: "/swift.jpg",
    type: "car",
    location: "Bangalore",
    available: true,
  },
  {
    id: "3",
    name: "Bajaj RE",
    price: 150,
    seats: 3,
    transmission: "Manual",
    fuel: "CNG",
    rating: 4.0,
    image: "/auto1.jpg",
    type: "auto",
    location: "Bangalore",
    available: true,
  },
  {
    id: "4",
    name: "Piaggio Ape",
    price: 160,
    seats: 3,
    transmission: "Manual",
    fuel: "Diesel",
    rating: 4.3,
    image: "/auto2.jpg",
    type: "auto",
    location: "Bangalore",
    available: false,
  },
];

const Rental: React.FC = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const cars = vehicles.filter((v) => v.type === "car");
  const autos = vehicles.filter((v) => v.type === "auto");

  const filteredCars = cars.filter(
    (v) =>
      v.name.toLowerCase().includes(searchText.toLowerCase()) ||
      v.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredAutos = autos.filter(
    (v) =>
      v.name.toLowerCase().includes(searchText.toLowerCase()) ||
      v.location.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="relative w-full h-56">
        <img
          src="/rental-header.jpg"
          alt="Rental Header"
          className="w-full h-full object-cover rounded-b-3xl shadow-md"
        />
        <div className="absolute inset-0 flex flex-col justify-center text-white bg-black/40 rounded-b-3xl px-4">
          {/* Top Arrows */}
          <div className="flex justify-between items-start mt-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </button>

            <button
              onClick={() => alert("Forward clicked")}
              className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide mt-6">
            Rent Your Perfect Ride
          </h1>
          <p className="mt-2 text-lg">Find cars & autos near you instantly</p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Select Date & Time
          </h3>
          <DateTimePicker />
        </div>

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

      {/* Nearby Cars Section */}
      <div className="px-6 py-4 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Nearby Cars</h2>
          <button className="text-blue-600 hover:underline font-medium">
            View More →
          </button>
        </div>
        {filteredCars.length > 0 ? (
          filteredCars.map((v) => <VehicleCard key={v.id} vehicle={v} />)
        ) : (
          <p className="text-gray-500">No cars found.</p>
        )}
      </div>

      {/* Autos Section */}
      <div className="px-6 py-4 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Looking for an Auto?</h2>
          <button className="text-blue-600 hover:underline font-medium">
            View More →
          </button>
        </div>
        {filteredAutos.length > 0 ? (
          <AutoCarousel vehicles={filteredAutos} />
        ) : (
          <p className="text-gray-500">No autos found.</p>
        )}
      </div>

      {/* Book Now Button */}
      <div className="px-6 pb-8">
        <button className="w-full md:w-60 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition">
          Book Now
        </button>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && <FilterCard onClose={() => setIsFilterOpen(false)} />}
    </div>
  );
};

export default Rental;
