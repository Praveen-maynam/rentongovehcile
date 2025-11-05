import React, { useState, useEffect } from "react";
import { Search, Loader2, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import { useLocation } from "../store/location.context";
import FilterLogo from "../assets/icons/FilterLogo.png";
import FilterCard from "../components/ui/FilterCard";

interface Car {
  _id: string;
  carName: string;
  carModel: string;
  carNumber: string;
  pricePerHour: number;
  description?: string;
  location?: string;
  carImages?: string[];
  distance?: number;
}

const NearbyCars: React.FC = () => {
  const navigate = useNavigate();
  const { coordinates, currentCity } = useLocation();
  const [nearbyCars, setNearbyCars] = useState<Car[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [range, setRange] = useState(5); // Default range in kilometers

  // Fetch nearby cars based on coordinates from location context
  useEffect(() => {
    const fetchNearbyCars = async () => {
      try {
        setLoading(true);
        setError("");

        const latitude = coordinates.latitude;
        const longitude = coordinates.longitude;

        console.log(`Fetching cars for ${currentCity}:`, latitude, longitude, );

        const response = await apiService.car.getNearbyCars(latitude, longitude);
        console.log("Nearby cars response:", response);

        // Handle different response structures
        const responseData = response.data || response;
        const carsArray = Array.isArray(responseData)
          ? responseData
          : Array.isArray(responseData.data)
          ? responseData.data
          : responseData.cars || [];

        const formattedCars: Car[] = carsArray.map((car: any) => ({
          _id: car._id,
          carName: car.CarName || "Unknown Car",
          carModel: car.CarModel || "N/A",
          carNumber: car.carNumber || "N/A",
          description: car.description || "No description available",
          pricePerHour: car.RentPerDay || 0,
          carImages: Array.isArray(car.carImages) && car.carImages.length > 0
            ? car.carImages
            : ["https://via.placeholder.com/400x250?text=No+Image"],
          location: car.location || currentCity,
          distance: car.distance || Math.floor(Math.random() * 10 + 1),
        }));

        setNearbyCars(formattedCars);
      } catch (err: any) {
        console.error("Error fetching nearby cars:", err);
        setError(err.message || "Failed to fetch nearby cars. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyCars();
  }, [coordinates, currentCity, range]);

  // Filter cars based on search
  const filteredCars = nearbyCars.filter(
    (car) =>
      car.carName.toLowerCase().includes(searchText.toLowerCase()) ||
      car.carModel.toLowerCase().includes(searchText.toLowerCase()) ||
      car.location?.toLowerCase().includes(searchText.toLowerCase())
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
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Nearby Cars</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <MapPin size={14} />
              {currentCity} ({coordinates.latitude.toFixed(4)}, {coordinates.longitude.toFixed(4)})
            </p>
          </div>
 
          {/* Search + Filter Row */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Range Selector */}
            {/* <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm">
              <label className="text-sm text-gray-600 font-medium">Range:</label>
              <select
                value={range}
                onChange={(e) => setRange(Number(e.target.value))}
                className="outline-none text-sm text-gray-700 font-semibold bg-transparent cursor-pointer"
              >
                <option value={2}>2 km</option>
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={15}>15 km</option>
                <option value={20}>20 km</option>
                <option value={50}>50 km</option>
              </select>
            </div> */}

            {/* Search Bar */}
            {/* <div className="flex items-center bg-white border rounded-full px-3 py-2 w-full sm:w-64 shadow-sm">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search by name or model..."
                className="flex-1 outline-none text-gray-700 text-sm"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div> */}
 
            {/* Filter Button */}
            {/* <button
              onClick={() => setShowFilter(true)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold px-4 py-2 rounded-full shadow-sm hover:opacity-90 transition-all duration-200"
            >
              <img src={FilterLogo} alt="Filter" className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button> */}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-60 text-gray-600">
            <Loader2 className="animate-spin mr-2" size={24} />
            <span>Loading nearby cars...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center text-red-500 mt-10">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        )}

        {/* No Cars Found */}
        {!loading && !error && filteredCars.length === 0 && (
          <p className="text-gray-500 col-span-full text-center mt-10">
            No cars found nearby. Try changing your location.
          </p>
        )}
 
        {/* Cars Grid */}
        {!loading && filteredCars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/book-now/${car._id}`)}
              >
                <img
                  src={car.carImages?.[0] || "https://via.placeholder.com/400x250?text=No+Image"}
                  alt={car.carName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{car.carName}</h3>
                  <p className="text-sm text-gray-500">{car.carModel}</p>
                  <p className="text-sm text-gray-600 mt-1">₹{car.pricePerHour}/hour</p>
                  <p className="text-sm text-gray-400 mt-1">
                    <MapPin size={12} className="inline" /> {car.location}
                  </p>
                  <p className="text-sm text-gray-400">~{car.distance} km away</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
 
      {/* Filter Modal */}
      {showFilter && <FilterCard onApply={() => setShowFilter(false)} />}
    </>
  );
};
 
export default NearbyCars;
 
 