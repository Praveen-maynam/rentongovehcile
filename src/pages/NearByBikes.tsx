import React, { useEffect, useState } from "react";
import { Search, Loader2, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const [nearbyBikes, setNearbyBikes] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Replace with your backend base URL
  const BASE_URL = "http://52.66.238.227:3000";

  // ✅ Get user’s coordinates (or fallback)
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        setLoading(true);
        setError("");

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Fetching bikes for:", latitude, longitude);

            await fetchNearbyBikes(latitude, longitude);
          },
          async (err) => {
            console.warn("⚠️ Location not available, using default Kakinada");
            // Default fallback: Kakinada
            const latitude = 16.9891;
            const longitude = 82.2475;
            await fetchNearbyBikes(latitude, longitude);
          }
        );
      } catch (err) {
        console.error("Error getting location:", err);
        setError("Unable to get your location");
        setLoading(false);
      }
    };

    getUserLocation();
  }, []);

  // ✅ Fetch nearby bikes from backend
  const fetchNearbyBikes = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/getNearbyBikes?latitude=${latitude}&longitude=${longitude}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw bikes data:", data);

    // ✅ Handle object or array response
    const bikesArray = Array.isArray(data)
      ? data
      : Array.isArray(data.data)
      ? data.data
      : [];

    const formattedBikes: Vehicle[] = bikesArray.map((bike: any) => ({
      _id: bike._id,
      bikeName: bike.bikeName || "Unknown Bike",
      bikeModel: bike.bikeModel || "N/A",
      bikeNumber: bike.bikeNumber || "N/A",
      description: bike.description || "No description available",
      pricePerHour: bike.pricePerHour || 0,
      bikeImages: Array.isArray(bike.bikeImages)
        ? bike.bikeImages
        : ["https://via.placeholder.com/400x250?text=No+Image"],
      location: bike.location || "Unknown",
      distance: bike.distance || Math.floor(Math.random() * 10 + 1),
    }));

    setNearbyBikes(formattedBikes);
  } catch (err: any) {
    console.error("Error fetching bikes:", err);
    setError("Failed to fetch bikes. Please try again later.");
  } finally {
    setLoading(false);
  }
};

  // ✅ Search filtering
  const filteredBikes = nearbyBikes.filter(
    (bike) =>
      bike.bikeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bike.bikeModel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ UI Rendering
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Nearby Bikes
        </h2>

        <div className="relative mt-3 md:mt-0">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or model..."
            className="pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 🔄 Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-60 text-gray-600">
          <Loader2 className="animate-spin mr-2" /> Loading bikes...
        </div>
      )}

      {/* ⚠️ Error */}
      {error && !loading && (
        <p className="text-center text-red-500 mt-10">{error}</p>
      )}

      {/* 🏍️ No bikes */}
      {!loading && !error && filteredBikes.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No bikes found nearby.
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
