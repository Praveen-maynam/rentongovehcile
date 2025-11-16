// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import apiService from "../services/api.service";
// import { useLocation } from "../store/location.context";
// import BikeCard from "../components/ui/BikeCard";

// interface Bike {
//   _id: string;
//   bikeName: string;
//   bikeModel: string;
//   bikeNumber: string;
//   pricePerKm: number;
//   description?: string;
//   contactName?: string;
//   contactNumber?: string;
//   pickupArea?: string;
//   pickupCity?: string;
//   pickupCityState?: string;
//   pickupCityCountry?: string;
//   bikeImages?: string[];
//   distance?: string | number;
//   averageRating?: string | number;
//   totalReviews?: number;
// }

// const NearbyBikes: React.FC = () => {
//   const navigate = useNavigate();
//   const { coordinates, currentCity } = useLocation();

//   const [vehicles, setVehicles] = useState<Bike[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [range] = useState(5); // Default range in kilometers

//   useEffect(() => {
//     const fetchNearbyBikes = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const { latitude, longitude } = coordinates;

//         console.log(`Fetching bikes for ${currentCity}:`, latitude, longitude);

//         const response = await apiService.bike.getNearbyBikes(latitude, longitude, range);
//         const responseData = response.data || response;
//         const bikesArray = Array.isArray(responseData)
//           ? responseData
//           : Array.isArray(responseData.data)
//           ? responseData.data
//           : responseData.bikes || [];

//         // ✅ Properly formatted to match your backend format
//         const formattedBikes: Bike[] = bikesArray.map((bike: any) => ({
//           _id: bike._id,
//           bikeName: bike.bikeName || "Unknown Bike",
//           bikeModel: bike.bikeModel || "N/A",
//           bikeNumber: bike.bikeNumber || "N/A",
//           description: bike.description || "No description available",
//           pricePerKm: bike.pricePerKm || 0,
//           contactName: bike.contactName || "N/A",
//           contactNumber: bike.contactNumber || "N/A",
//           pickupArea: bike.pickupArea || "Unknown",
//           pickupCity: bike.pickupCity || currentCity,
//           pickupCityState: bike.pickupCityState || "",
//           pickupCityCountry: bike.pickupCityCountry || "",
//           bikeImages:
//             Array.isArray(bike.bikeImages) && bike.bikeImages.length > 0
//               ? bike.bikeImages
//               : ["https://via.placeholder.com/400x250?text=No+Image"],
//           distance: bike.distance || "0",
//           averageRating: bike.averageRating || "0.0",
//           totalReviews: bike.totalReviews || 0,
//         }));

//         setVehicles(formattedBikes);
//       } catch (err: any) {
//         console.error("Error fetching nearby bikes:", err);
//         setError(err.message || "Failed to fetch nearby bikes. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNearbyBikes();
//   }, [coordinates, currentCity, range]);

//   return (
//     <div className="bg-gray-50 min-h-screen p-6 flex flex-col">
//       {/* Header */}
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">Nearby Bikes</h2>

//       {/* Bikes Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {loading ? (
//           <p className="text-gray-500 col-span-full text-center">Loading...</p>
//         ) : error ? (
//           <p className="text-red-500 col-span-full text-center">{error}</p>
//         ) : vehicles.length > 0 ? (
//           vehicles.map((v) => (
//             <BikeCard
//               key={v._id}
//               vehicle={{
//                 id: v._id,
//                 name: v.bikeName,
//                 model: v.bikeModel,
//                 price: v.pricePerKm,
//                 transmission: "Manual", // ✅ assuming bikes are manual
//                 fuel: "Petrol", // ✅ assuming bikes are petrol
//                 seats: 2,
//                 location: `${v.pickupArea || ""}, ${v.pickupCity || ""}`,
//                 rating: Number(v.averageRating) || 0,
//                 image:
//                   v.bikeImages?.[0] ||
//                   "https://via.placeholder.com/400x250?text=No+Image",
//               }}
//             />
//           ))
//         ) : (
//           <p className="text-gray-500 col-span-full text-center">
//             No bikes available nearby.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NearbyBikes;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import { useLocation } from "../store/location.context";
import BikeCard from "../components/ui/BikeCard";
interface Bike {
  _id: string;
  bikeName: string;
  bikeModel: string;
  bikeNumber: string;
  pricePerKm: number;
  description?: string;
  contactName?: string;
  contactNumber?: string;
  pickupArea?: string;
  pickupCity?: string;
  pickupCityState?: string;
  pickupCityCountry?: string;
  bikeImages?: string[];
  distance?: string | number;
  averageRating?: string | number;
  totalReviews?: number;
}

interface NearbyBikesProps {
  limit?: number; // ✅ optional prop to limit displayed bikes
}

const NearbyBikes: React.FC<NearbyBikesProps> = ({ limit }) => {
  const navigate = useNavigate();
  const { coordinates, currentCity } = useLocation();

  const [vehicles, setVehicles] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [range] = useState(5); // Default range in kilometers
  useEffect(() => {
    const fetchNearbyBikes = async () => {
      try {
        setLoading(true);
        setError("");

        const { latitude, longitude } = coordinates;

        console.log(`Fetching bikes for ${currentCity}:`, latitude, longitude);

        const response = await apiService.bike.getNearbyBikes(latitude, longitude, range);
        const responseData = response.data || response;
        const bikesArray = Array.isArray(responseData)
          ? responseData
          : Array.isArray(responseData.data)
          ? responseData.data
          : responseData.bikes || [];

        // Format bikes properly
        const formattedBikes: Bike[] = bikesArray.map((bike: any) => ({
          _id: bike._id,
          bikeName: bike.bikeName || "Unknown Bike",
          bikeModel: bike.bikeModel || "N/A",
          bikeNumber: bike.bikeNumber || "N/A",
          description: bike.description || "No description available",
          pricePerKm: bike.pricePerKm || 0,
          contactName: bike.contactName || "N/A",
          contactNumber: bike.contactNumber || "N/A",
          pickupArea: bike.pickupArea || "Unknown",
          pickupCity: bike.pickupCity || currentCity,
          pickupCityState: bike.pickupCityState || "",
          pickupCityCountry: bike.pickupCityCountry || "",
          bikeImages:
            Array.isArray(bike.bikeImages) && bike.bikeImages.length > 0
              ? bike.bikeImages
              : ["https://via.placeholder.com/400x250?text=No+Image"],
          distance: bike.distance || "0",
          averageRating: bike.averageRating || "0.0",
          totalReviews: bike.totalReviews || 0,
        }));
        setVehicles(formattedBikes);
      } catch (err: any) {
        console.error("Error fetching nearby bikes:", err);
        setError(err.message || "Failed to fetch nearby bikes. Please try again.");
      } finally {
        setLoading(false);
      }
    };
 
    fetchNearbyBikes();
  }, [coordinates, currentCity, range]);

  // ✅ Slice the vehicles if limit is provided
  const displayedBikes = limit ? vehicles.slice(0, limit) : vehicles;

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex flex-col">
      {/* Header */}
      {!limit && (
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Nearby Bikes
        </h2>
      )}

      {/* Bikes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-gray-500 col-span-full text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 col-span-full text-center">{error}</p>
        ) : displayedBikes.length > 0 ? (
          displayedBikes.map((v) => (
            <BikeCard
              key={v._id}
              vehicle={{
                id: v._id,
                name: v.bikeName,
                model: v.bikeModel,
                price: v.pricePerKm,
                transmission: "Manual", // assuming bikes are manual
                fuel: "Petrol", // assuming bikes are petrol
                seats: 2,
                location: `${v.pickupArea || ""}, ${v.pickupCity || ""}`,
                rating: Number(v.averageRating) || 0,
                image:
                  v.bikeImages?.[0] ||
                  "https://via.placeholder.com/400x250?text=No+Image",
              }}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No bikes available nearby.
          </p>
        )}
      </div>
    </div>
  );
};
 
export default NearbyBikes;
 
 