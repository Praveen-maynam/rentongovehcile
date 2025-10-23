import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import VehicleCard from "../components/ui/VehicleCard";
import AutoCard from "../components/ui/AutoCard";
import BikeCard from "../components/ui/BikeCard";// ✅ Corrected import
import DateTimePicker from "../components/ui/DateTimePicker";
import FilterCard from "../components/ui/FilterCard";
import PromoSlides from "../components/PromoSlides";
import VehicleCarousel from "../components/VehicleCarousel";
import { vehicles } from "./data/Vehicle";

const Rental: React.FC = () => {
  const navigate = useNavigate();

  // ✅ State management
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showAllCars, setShowAllCars] = useState(false);
  const [showAllAutos, setShowAllAutos] = useState(false);
  const [showAllBikes, setShowAllBikes] = useState(false);

  // ✅ Filter vehicles by type
  const cars = vehicles.filter((v) => v.type === "car");
  const autos = vehicles.filter((v) => v.type === "auto");
  const bikes = vehicles.filter((v) => v.type === "bike");

  // ✅ Common reusable filter
  const filterVehicles = (list: any[]) =>
    list.filter(
      (v) =>
        v.name.toLowerCase().includes(searchText.toLowerCase()) ||
        v.location?.toLowerCase().includes(searchText.toLowerCase())
    );

  const filteredCars = filterVehicles(cars);
  const filteredAutos = filterVehicles(autos);
  const filteredBikes = filterVehicles(bikes);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* 🔹 Promotional Slides */}
      <div className="px-6 py-4">
        <PromoSlides />
      </div>

      {/* 🔹 Search + Filter */}
      <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Select Date & Time
          </h3>
          <DateTimePicker />
        </div>

        <div className="flex items-center gap-2">
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

          <button
            onClick={() => setIsFilterOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-4 py-2 rounded-full shadow hover:opacity-90 transition"
          >
            Filter
          </button>
        </div>
      </div>

      {/* 🚗 Nearby Cars */}
      <div className="px-6 py-4 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Nearby Cars</h2>
          {filteredCars.length > 4 && !showAllCars && (
            <button
              onClick={() => setShowAllCars(true)}
              className="text-blue-600 hover:underline font-medium"
            >
              View More →
            </button>
          )}
        </div>

        {filteredCars.length > 0 ? (
          (showAllCars ? filteredCars : filteredCars.slice(0, 4)).map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              showActions={false}
              onBook={() => navigate(`/book-now/${v.id}`)}
            />
          ))
        ) : (
          <p className="text-gray-500">No cars found.</p>
        )}

        {showAllCars && filteredCars.length > 4 && (
          <button
            onClick={() => setShowAllCars(false)}
            className="text-blue-600 hover:underline font-medium text-center py-2"
          >
            Show Less ↑
          </button>
        )}
      </div>

      {/* 🛺 Autos */}
      <div className="px-6 py-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Looking for an Auto?</h2>
          {filteredAutos.length > 4 && !showAllAutos && (
            <button
              onClick={() => setShowAllAutos(true)}
              className="text-blue-600 hover:underline font-medium"
            >
              View More →
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {filteredAutos.length > 0 ? (
            (showAllAutos ? filteredAutos : filteredAutos.slice(0, 4)).map(
              (v, index) => (
                <AutoCard
                  key={v.id}
                  vehicle={v}
                  showBookButton={index === 0}
                  onBook={() => navigate(`/book-now/${v.id}`)}
                />
              )
            )
          ) : (
            <p className="text-gray-500">No autos found.</p>
          )}
        </div>

        {showAllAutos && filteredAutos.length > 4 && (
          <button
            onClick={() => setShowAllAutos(false)}
            className="text-blue-600 hover:underline font-medium text-center py-2 mt-4 w-full"
          >
            Show Less ↑
          </button>
        )}
      </div>

      {/* 🛺 Bikes */}
      <div className="px-6 py-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Looking for an Bike?</h2>
          {filteredBikes.length > 4 && !showAllBikes && (
            <button
              onClick={() => setShowAllBikes(true)}
              className="text-blue-600 hover:underline font-medium"
            >
              View More →
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {filteredAutos.length > 0 ? (
            (showAllBikes ? filteredBikes : filteredBikes.slice(0, 4)).map(
              (v, index) => (
                <BikeCard
                  key={v.id}
                  vehicle={v}
                  showBookButton={index === 0}
                  onBook={() => navigate(`/book-now/${v.id}`)}
                />
              )
            )
          ) : (
            <p className="text-gray-500">No Bikes found.</p>
          )}
        </div>

        {showAllBikes && filteredBikes.length > 4 && (
          <button
            onClick={() => setShowAllBikes(false)}
            className="text-blue-600 hover:underline font-medium text-center py-2 mt-4 w-full"
          >
            Show Less ↑
          </button>
        )}
      </div>
      {/* Filter Card Modal */}
      {isFilterOpen && <FilterCard onApply={() => setIsFilterOpen(false)} />}
    </div>
  );
};

export default Rental;

