import React, { useEffect, useState } from "react";
import { Search, Loader2, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import { useLocation } from "../store/location.context";

interface Vehicle {
  _id: string;
  bikeName: string;
  bikeModel: string;
  bikeNumber: string;
  pricePerHour: number;
  description?: string;
  location?: string;
  bikeImages?: string[];
  distance?: number;
}

const NearbyBikes: React.FC = () => {
  const navigate = useNavigate();
  const { coordinates, currentCity } = useLocation();
  const [nearbyBikes, setNearbyBikes] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [range, setRange] = useState(5); // Default range in kilometers

  // Fetch nearby bikes based on coordinates from location context
  useEffect(() => {
    const fetchNearbyBikes = async () => {
      try {
        setLoading(true);
        setError("");

        const latitude = coordinates.latitude;
        const longitude = coordinates.longitude;

        console.log(`Fetching bikes for ${currentCity}:`, latitude, longitude, `range: ${range}km`);

        const response = await apiService.bike.getNearbyBikes(latitude, longitude, range);
        console.log("Nearby bikes response:", response);

        // Handle different response structures
        const responseData = response.data || response;
        const bikesArray = Array.isArray(responseData)
          ? responseData
          : Array.isArray(responseData.data)
          ? responseData.data
          : responseData.bikes || [];

        const formattedBikes: Vehicle[] = bikesArray.map((bike: any) => ({
          _id: bike._id,
          bikeName: bike.bikeName || "Unknown Bike",
          bikeModel: bike.bikeModel || "N/A",
          bikeNumber: bike.bikeNumber || "N/A",
          description: bike.description || "No description available",
          pricePerHour: bike.pricePerKm || 0,
          bikeImages: Array.isArray(bike.bikeImages) && bike.bikeImages.length > 0
            ? bike.bikeImages
            : ["https://via.placeholder.com/400x250?text=No+Image"],
          location: bike.location || currentCity,
          distance: bike.distance || Math.floor(Math.random() * 10 + 1),
        }));

        setNearbyBikes(formattedBikes);
      } catch (err: any) {
        console.error("Error fetching nearby bikes:", err);
        setError(err.message || "Failed to fetch nearby bikes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyBikes();
  }, [coordinates, currentCity, range]);

  // Search filtering
  const filteredBikes = nearbyBikes.filter(
    (bike) =>
      bike.bikeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bike.bikeModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bike.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Nearby Bikes</h2>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <MapPin size={14} />
            {currentCity} ({coordinates.latitude.toFixed(4)}, {coordinates.longitude.toFixed(4)})
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-3 md:mt-0 items-start sm:items-center">
          {/* Range Selector */}
          <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm">
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
          </div>

          {/* <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or model..."
              className="pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-60 text-gray-600">
          <Loader2 className="animate-spin mr-2" /> Loading bikes...
        </div>
      )}

      {/* Error */}
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

      {/* No bikes */}
      {!loading && !error && filteredBikes.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No bikes found nearby. Try changing your location.
        </p>
      )}

      {/* ✅ Bikes Grid */}
      {!loading && filteredBikes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBikes.map((bike) => (
            <div
              key={bike._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/bike-details/${bike._id}`)}
            >
              <img
                src={
                  bike.bikeImages && bike.bikeImages.length > 0
                    ? bike.bikeImages[0]
                    : "https://via.placeholder.com/400x250?text=No+Image"
                }
                alt={bike.bikeName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {bike.bikeName}
                </h3>
                <p className="text-sm text-gray-500">{bike.bikeModel}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Price: ₹{bike.pricePerHour}/hour
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Location: {bike.location}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Distance: {bike.distance} km away
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbyBikes;
