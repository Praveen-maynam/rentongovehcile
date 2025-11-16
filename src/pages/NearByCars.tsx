
 
//  import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import apiService from "../services/api.service";
// import { useLocation } from "../store/location.context";
// import VehicleCard from "../components/ui/VehicleCard";

// interface Car {
//   _id: string;
//   CarName: string;
//   CarModel?: string;
//    Carseater: string | number; 
//   fuelType: string;
//   transmissionType: string;
//   kmDriven: number;
//   description?: string;
//   RentPerDay: number;
//   pickupArea?: string;
//   pickupCity?: string;
//   pickupCityState?: string;
//   pickupCityCountry?: string;
//   carImages?: string[];
//   distance?: string | number;
//   averageRating?: string | number;
//   totalReviews?: number;
// }

// const NearbyCars: React.FC = () => {
//   const navigate = useNavigate();
//   const { coordinates, currentCity } = useLocation();

//   const [vehicles, setVehicles] = useState<Car[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [range] = useState(5); // Default range in kilometers

//   useEffect(() => {
//     const fetchNearbyCars = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const { latitude, longitude } = coordinates;

//         console.log(`Fetching cars for ${currentCity}:`, latitude, longitude);

//         const response = await apiService.car.getNearbyCars(latitude, longitude);
//         const responseData = response.data || response;
//         const carsArray = Array.isArray(responseData)
//           ? responseData
//           : Array.isArray(responseData.data)
//           ? responseData.data
//           : responseData.cars || [];

//          const formattedCars: Car[] = carsArray.map((car: any) => ({
//           _id: car._id,
//           CarName: car.CarName || "Unknown Car",
//           CarModel: car.CarModel || "N/A",
//           Carseater: car.Carseater || "4",
//           fuelType: car.fuelType || "N/A",
//           transmissionType: car.transmissionType || "N/A",
//           kmDriven: car.kmDriven || 0,
//           description: car.description || "No description available",
//           RentPerDay: car.RentPerDay || 0,
//           pickupArea: car.pickupArea || "Unknown",
//           pickupCity: car.pickupCity || currentCity,
//           pickupCityState: car.pickupCityState || "",
//           pickupCityCountry: car.pickupCityCountry || "",
//           carImages:
//             Array.isArray(car.carImages) && car.carImages.length > 0
//               ? car.carImages
//               : ["https://via.placeholder.com/400x250?text=No+Image"],
//           distance: car.distance || "0",
//           averageRating: car.averageRating || "0.0",
//           totalReviews: car.totalReviews || 0,
//         }));

//         setVehicles(formattedCars);
//       } catch (err: any) {
//         console.error("Error fetching nearby cars:", err);
//         setError(err.message || "Failed to fetch nearby cars. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNearbyCars();
//   }, [coordinates, currentCity, range]);
//   return (
//     <div className="bg-gray-50 min-h-screen p-6 flex flex-col">
//       {/* Header */}
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">Nearby Cars</h2>

     
//       {/* Cars Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {loading ? (
//           <p className="text-gray-500 col-span-full text-center">Loading...</p>
//         ) : error ? (
//           <p className="text-red-500 col-span-full text-center">{error}</p>
//         ) : vehicles.length > 0 ? (
//           vehicles.map((v) => (
//             <VehicleCard
//               key={v._id}
//               vehicle={{
//                 id: v._id,
//                 name: v.CarName,
//                 price: v.RentPerDay,
//                 transmission: v.transmissionType,
//                 fuel: v.fuelType,
//                     seats: Number(v.Carseater) || 0, // ✅ convert to number
//                 location: `${v.pickupArea || ""}, ${v.pickupCity || ""}`,
//                  rating: Number(v.averageRating) || 0, // ✅ convert to number
//                 image:
//                   v.carImages?.[0] ||
//                   "https://via.placeholder.com/400x250?text=No+Image",
//               }}
//             />
//           ))
//         ) : (
//           <p className="text-gray-500 col-span-full text-center">
//             No cars available nearby.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NearbyCars;


 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import { useLocation } from "../store/location.context";
import VehicleCard from "../components/ui/VehicleCard";

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
}

const NearbyCars: React.FC<NearbyCarsProps> = ({ limit }) => {
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

        const formattedCars: Car[] = carsArray.map((car: any) => ({
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

        setVehicles(formattedCars);
      } catch (err: any) {
        console.error("Error fetching nearby cars:", err);
        setError(err.message || "Failed to fetch nearby cars.");
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyCars();
  }, [coordinates, currentCity, range]);

  // ✅ Use limit if provided
  const displayedCars = limit ? vehicles.slice(0, limit) : vehicles;

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
