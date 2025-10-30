import React, { useState, useEffect } from "react";
import { Search, MapPin, Loader2, Bike } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Type definition for vehicle data matching backend response
interface Vehicle {
  _id: string;
  userId: string;
  bikeNumber: string;
  bikeName: string;
  bikeModel: string;
  description: string;
  pricePerKm: number;
  contactNumber: string;
  contactName: string;
  latitude: number;
  longitude: number;
  bikeImages: string[];
  InsuranceNo: string;
  gps: boolean;
  Available: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  distance?: number;
  averageRating?: number;
  totalReviews?: number;
}

// VehicleCard Component (matching your design)
const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to BookNow page with vehicle data in state
    navigate(`/book-now/${vehicle._id}`, {
      state: { 
        vehicleData: {
          id: vehicle._id,
          name: vehicle.bikeName,
          model: vehicle.bikeModel,
          image: vehicle.bikeImages?.[0] || '',
          price: vehicle.pricePerKm,
          description: vehicle.description,
          type: 'bike',
          rating: vehicle.averageRating,
          totalReviews: vehicle.totalReviews,
          contactName: vehicle.contactName,
          contactNumber: vehicle.contactNumber,
          bikeNumber: vehicle.bikeNumber,
          gps: vehicle.gps,
          available: vehicle.Available,
          distance: vehicle.distance
        },
        openContact: false 
      }
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col bg-white shadow-md rounded-xl cursor-pointer border border-transparent
                 transition-all duration-200 hover:shadow-lg hover:border-blue-500
                 w-full sm:w-[220px] md:w-[240px] lg:w-[260px]"
    >
      {/* Vehicle Image */}
      <div className="relative w-full h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden rounded-t-xl bg-gray-100">
        {vehicle.bikeImages && vehicle.bikeImages.length > 0 ? (
          <img
            src={vehicle.bikeImages[0]}
            alt={vehicle.bikeName}
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
                  <svg class="w-20 h-20 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              `;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
            <Bike className="w-20 h-20 text-blue-400" />
          </div>
        )}
        {vehicle.distance && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
            {typeof vehicle.distance === 'number' ? vehicle.distance.toFixed(1) : parseFloat(vehicle.distance).toFixed(1)} km
          </div>
        )}
        {!vehicle.Available && (
          <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-white">
            Not Available
          </div>
        )}
      </div>

      {/* Vehicle Info */}
      <div className="flex flex-col p-3">
        {/* Name + Rating */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
            {vehicle.bikeName}
          </h3>
          <span className="px-1.5 py-0.5 text-xs sm:text-sm bg-yellow-50 border border-yellow-400 text-gray-900 rounded">
            ⭐ {vehicle.averageRating 
              ? (typeof vehicle.averageRating === 'number' 
                  ? vehicle.averageRating.toFixed(1) 
                  : parseFloat(vehicle.averageRating).toFixed(1))
              : "N/A"}
          </span>
        </div>

        {/* Model */}
        <p className="text-gray-600 text-xs sm:text-sm mb-1">
          {vehicle.bikeModel}
        </p>

        {/* Price */}
        <p className="text-gray-700 font-bold text-sm sm:text-base mb-2">
          ₹{vehicle.pricePerKm}{" "}
          <span className="text-gray-500 font-normal text-xs sm:text-sm">/km</span>
        </p>

        {/* Specs */}
        <div className="flex flex-col gap-1.5 text-gray-600 text-xs sm:text-sm">
          {vehicle.gps && (
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>GPS Enabled</span>
            </div>
          )}
          {vehicle.totalReviews !== undefined && (
            <div className="flex items-center gap-2">
              <span>💬</span>
              <span>{vehicle.totalReviews} Reviews</span>
            </div>
          )}
          {vehicle.contactName && (
            <div className="flex items-center gap-2">
              <span>👤</span>
              <span>{vehicle.contactName}</span>
            </div>
          )}
          {vehicle.bikeNumber && (
            <div className="flex items-center gap-2">
              <span>🏍️</span>
              <span className="text-gray-500">{vehicle.bikeNumber}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// FilterCard Component (matching your design)
const FilterCard: React.FC<{ onApply: () => void }> = ({ onApply }) => {
  const [priceRange, setPriceRange] = useState(250);
  const [distance, setDistance] = useState(3);
  const [vehicleType, setVehicleType] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");

  // Vehicle name lists
  const carNames = ["Hyundai", "Ford", "Tata", "Suzuki", "Mahindra"];
  const bikeNames = ["Yamaha", "Honda", "Hero", "Bajaj", "TVS"];

  // Handle vehicle type selection
  const handleCheckboxChange = (type: string) => {
    setVehicleType((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
    setSelectedName("");
  };

  // Determine dropdown options based on selected vehicle type
  const getNameOptions = () => {
    if (vehicleType.includes("car")) return carNames;
    if (vehicleType.includes("bikes")) return bikeNames;
    return [];
  };

  return (
    <div className="flex justify-end">
      <div className="absolute right-6 top-[192px] w-full sm:w-[200px] bg-white shadow-xl rounded-lg p-6 border z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
          <button onClick={onApply} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Vehicle Type */}
        <div className="mb-6">
          <p className="font-medium mb-2">Vehicle Type</p>
          {["car", "bikes"].map((type) => (
            <label key={type} className="block text-sm">
              <input
                type="checkbox"
                checked={vehicleType.includes(type)}
                onChange={() => handleCheckboxChange(type)}
                className="mr-2"
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <p className="font-medium mb-2">Price Range</p>
          <input
            type="range"
            min={20}
            max={500}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>₹20</span>
            <span>₹{priceRange}</span>
          </div>
        </div>

        {/* Distance */}
        <div className="mb-6">
          <p className="font-medium mb-2">Distance</p>
          <input
            type="range"
            min={1}
            max={10}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>1 km</span>
            <span>{distance} km</span>
          </div>
        </div>

        {/* Dynamic Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">NAMES</label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            disabled={getNameOptions().length === 0}
          >
            <option value="">
              {getNameOptions().length === 0
                ? "Select Vehicle Type First"
                : "Select"}
            </option>
            {getNameOptions().map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Fuel */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Fuel</label>
          <select 
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={selectedFuel}
            onChange={(e) => setSelectedFuel(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>

        {/* Transmission */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-1">Transmission</label>
          <select 
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={selectedTransmission}
            onChange={(e) => setSelectedTransmission(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>

        {/* Apply Button */}
        <button
          onClick={onApply}
          className="w-full bg-gradient-to-r from-blue-900 to-blue-400 text-white py-2 rounded-md font-medium"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

// Main Component
const Nearbybikes: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [bikes, setBikes] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  // Fetch nearby bikes from API
  const fetchNearbyBikes = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://52.66.238.227:3000/getNearbyBikes?latitude=${latitude}&longitude=${longitude}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Handle different response structures
      let bikesData: Vehicle[] = [];
      
      if (Array.isArray(result)) {
        bikesData = result;
      } else if (result.bikes && Array.isArray(result.bikes)) {
        bikesData = result.bikes;
      } else if (result.data && Array.isArray(result.data)) {
        bikesData = result.data;
      }
      
      setBikes(bikesData);
    } catch (error) {
      console.error("Error fetching nearby bikes:", error);
      setError("Failed to load nearby bikes. Please try again.");
      setBikes([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch bikes on component mount with geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchNearbyBikes(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to default location (Hyderabad)
          fetchNearbyBikes(17.4889, 78.4889);
        }
      );
    } else {
      // Fallback to default location
      fetchNearbyBikes(17.4889, 78.4889);
    }
  }, []);

  // Filter bikes based on search text
  const filteredBikes = bikes.filter(
    (v) =>
      (v.bikeName && v.bikeName.toLowerCase().includes(searchText.toLowerCase())) ||
      (v.bikeModel && v.bikeModel.toLowerCase().includes(searchText.toLowerCase())) ||
      (v.contactName && v.contactName.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <>
      <div
        className={`bg-gray-50 min-h-screen p-6 flex flex-col transition-all duration-300 ${
          showFilter ? "blur-sm" : ""
        }`}
      >
        {/* Header with Search & Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Nearby Bikes</h2>

          {/* Search + Filter Row */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="flex items-center bg-white border rounded-full px-3 py-2 w-full sm:w-64 shadow-sm">
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
              onClick={() => setShowFilter(true)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold px-4 py-2 rounded-full shadow-sm hover:opacity-90 transition-all duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
              </svg>
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading nearby bikes...</p>
          </div>
        ) : (
          /* Bikes Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBikes.length > 0 ? (
              filteredBikes.map((v) => <VehicleCard key={v._id} vehicle={v} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <Bike className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No bikes available nearby</p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your location or check back later
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {showFilter && <FilterCard onApply={() => setShowFilter(false)} />}
    </>
  );
};

export default Nearbybikes;