import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import { useLocation } from "../store/location.context";
import VehicleCard from "../components/ui/VehicleCard";
<<<<<<< HEAD

=======
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
interface Car {
  _id: string;
  CarName: string;
  CarModel?: string;
  Carseater: string | number; 
  fuelType: string;
  transmissionType: string;
  kmDriven: number;
  description?: string;
  RentPerDay: number;
  pickupArea?: string;
  pickupCity?: string;
  pickupCityState?: string;
  pickupCityCountry?: string;
  carImages?: string[];
  distance?: string | number;
  averageRating?: string | number;
  totalReviews?: number;
}

// ✅ Add props interface
interface NearbyCarsProps {
  limit?: number; // optional prop to limit displayed cars
  filters?: {
    priceRange?: [number, number];
    fuelType?: string;
    transmission?: string;
    searchText?: string;
    distance?: number;
  };
}

const NearbyCars: React.FC<NearbyCarsProps> = ({ limit, filters }) => {
  const navigate = useNavigate();
  const { coordinates, currentCity } = useLocation();

  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [range] = useState(5); // Default range in km

  useEffect(() => {
    const fetchNearbyCars = async () => {
      try {
        setLoading(true);
        setError("");

        const { latitude, longitude } = coordinates;

        const response = await apiService.car.getNearbyCars(latitude, longitude);
        const responseData = response.data || response;
        const carsArray = Array.isArray(responseData)
          ? responseData
          : Array.isArray(responseData.data)
          ? responseData.data
          : responseData.cars || [];
<<<<<<< HEAD

        const formattedCars: Car[] = carsArray.map((car: any) => ({
=======
 
         const formattedCars: Car[] = carsArray.map((car: any) => ({
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
          _id: car._id,
          CarName: car.CarName || "Unknown Car",
          CarModel: car.CarModel || "N/A",
          Carseater: car.Carseater || "4",
          fuelType: car.fuelType || "N/A",
          transmissionType: car.transmissionType || "N/A",
          kmDriven: car.kmDriven || 0,
          description: car.description || "No description available",
          RentPerDay: car.RentPerDay || 0,
          pickupArea: car.pickupArea || "Unknown",
          pickupCity: car.pickupCity || currentCity,
          pickupCityState: car.pickupCityState || "",
          pickupCityCountry: car.pickupCityCountry || "",
          carImages:
            Array.isArray(car.carImages) && car.carImages.length > 0
              ? car.carImages
              : ["https://via.placeholder.com/400x250?text=No+Image"],
          distance: car.distance || "0",
          averageRating: car.averageRating || "0.0",
          totalReviews: car.totalReviews || 0,
        }));
<<<<<<< HEAD

=======
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
        setVehicles(formattedCars);
      } catch (err: any) {
        console.error("Error fetching nearby cars:", err);
        setError(err.message || "Failed to fetch nearby cars.");
      } finally {
        setLoading(false);
      }
    };
<<<<<<< HEAD

=======
 
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
    fetchNearbyCars();
  }, [coordinates, currentCity, range]);

  // ✅ Apply filters and limit
  const filteredCars = React.useMemo(() => {
    let filtered = vehicles;

    if (filters) {
      // Price range filter
      if (filters.priceRange) {
        filtered = filtered.filter(
          car => car.RentPerDay >= filters.priceRange![0] && 
                 car.RentPerDay <= filters.priceRange![1]
        );
      }

      // Fuel type filter
      if (filters.fuelType && filters.fuelType !== "All") {
        filtered = filtered.filter(
          car => car.fuelType.toLowerCase().includes(filters.fuelType!.toLowerCase())
        );
      }

      // Transmission filter
      if (filters.transmission && filters.transmission !== "All") {
        filtered = filtered.filter(
          car => car.transmissionType.toLowerCase().includes(filters.transmission!.toLowerCase())
        );
      }

      // Search text filter
      if (filters.searchText && filters.searchText.trim()) {
        const searchLower = filters.searchText.toLowerCase();
        filtered = filtered.filter(
          car => 
            car.CarName.toLowerCase().includes(searchLower) ||
            car.CarModel?.toLowerCase().includes(searchLower) ||
            car.pickupArea?.toLowerCase().includes(searchLower) ||
            car.pickupCity?.toLowerCase().includes(searchLower)
        );
      }
    }

    return limit ? filtered.slice(0, limit) : filtered;
  }, [vehicles, filters, limit]);

  const displayedCars = filteredCars;

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex flex-col">
      {/* Header */}
      {!limit && (
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Nearby Cars
        </h2>
      )}

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-gray-500 col-span-full text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 col-span-full text-center">{error}</p>
        ) : displayedCars.length > 0 ? (
          displayedCars.map((v) => (
            <VehicleCard
              key={v._id}
              vehicle={{
                id: v._id,
                name: v.CarName,
<<<<<<< HEAD
=======
                
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
                price: v.RentPerDay,
                transmission: v.transmissionType,
                fuel: v.fuelType,
                seats: Number(v.Carseater) || 0,
                location: `${v.pickupArea || ""}, ${v.pickupCity || ""}`,
                rating: Number(v.averageRating) || 0,
                distance:String(v.distance),
                image:
                  v.carImages?.[0] ||
                  "https://via.placeholder.com/400x250?text=No+Image",
              }}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No cars available nearby.
          </p>
        )}
      </div>
   
    </div>
  );
};

export default NearbyCars;