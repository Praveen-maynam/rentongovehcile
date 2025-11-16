// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { MapPin } from "lucide-react";
// import { Vehicle } from "../../types/Vehicle";
// import { useReviewStore } from "../../store/review.store";
// import AutomaticLogo from "../../assets/icons/automatic.jpeg";
// import DriverLogo from "../../assets/icons/seats.jpeg";
// import Petrol from "../../assets/icons/fuel.jpeg";

// interface VehicleCardProps {
//   vehicle: Vehicle;
//   onBook?: (vehicle: Vehicle) => void;
// }

// const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onBook }) => {
//   const navigate = useNavigate();
//   const { getAverageRating } = useReviewStore();
//   const rating = getAverageRating(vehicle.id);

//   const handleCardClick = () => {
//     if (onBook) onBook(vehicle);
//     else navigate(`/book-now/${vehicle.id}`);
//   };

//   return (
//     <div
//       onClick={handleCardClick}
//       className="flex flex-col bg-white shadow-md rounded-xl cursor-pointer border border-transparent
//                  transition-all duration-200 hover:shadow-lg hover:border-blue-500
//                  w-full sm:w-[220px] md:w-[240px] lg:w-[260px]"
//     >
//       {/* Vehicle Image */}
//       <div className="relative w-full h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden rounded-t-xl bg-gray-100">
//         <img
//           src={vehicle.image}
//           alt={vehicle.name}
//           className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
//           loading="lazy"
//         />
//       </div>

//       {/* Vehicle Info */}
//       <div className="flex flex-col p-3">
//         {/* Name + Rating */}
//         <div className="flex items-center justify-between mb-1">
//           <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
//             {vehicle.name}
//           </h3>
//           <span className="px-1.5 py-0.5 text-xs sm:text-sm bg-yellow-50 border border-yellow-400 text-gray-900 rounded">
//             ⭐ {rating.toFixed(1)}
//           </span>
//         </div>

//         {/* Price */}
//         <p className="text-gray-700 font-bold text-sm sm:text-base mb-2">
//           ₹{vehicle.price}{" "}
//           <span className="text-gray-500 font-normal text-xs sm:text-sm">/day</span>
//         </p>

//         {/* Specs */}
//         <div className="flex flex-col gap-1.5 text-gray-600 text-xs sm:text-sm">
//           <div className="flex items-center gap-2">
//             <img src={AutomaticLogo} alt="Transmission" className="w-4 h-4 sm:w-5 sm:h-5" />
//             <span>{vehicle.transmission}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <img src={DriverLogo} alt="Seats" className="w-4 h-4 sm:w-5 sm:h-5" />
//             <span>{vehicle.seats} Seaters</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <img src={Petrol} alt="Fuel" className="w-4 h-4 sm:w-5 sm:h-5" />
//             <span>{vehicle.fuel}</span>
//           </div>
//           <div className="flex items-start gap-2">
//             <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-0.5 flex-shrink-0" />
//             <span className="text-gray-500 line-clamp-2">{vehicle.location}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleCard;



 
import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Vehicle } from "../../types/Vehicle";
import { useReviewStore } from "../../store/review.store";
import AutomaticLogo from "../../assets/icons/automatic.jpeg";
import DriverLogo from "../../assets/icons/seats.jpeg";
import Petrol from "../../assets/icons/fuel.jpeg";
 
interface VehicleCardProps {
  vehicle: Vehicle;
  onBook?: (vehicle: Vehicle) => void;
}
 
const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onBook }) => {
  const navigate = useNavigate();
  const { getAverageRating } = useReviewStore();
  const rating = getAverageRating(vehicle.id);
 
 const handleCardClick = () => {
  if (onBook) {
    onBook(vehicle);
  } else {
    navigate(`/book-now/${vehicle.id}`, {
      state: { vehicleType: vehicle.type || 'car' }
    });
  }
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
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
 
      {/* Vehicle Info */}
      <div className="flex flex-col p-3">
        {/* Name + Rating */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
            {vehicle.name}
          </h3>
          <span className="px-1.5 py-0.5 text-xs sm:text-sm bg-yellow-50 border border-yellow-400 text-gray-900 rounded">
            ⭐ {rating.toFixed(1)}
          </span>
        </div>
 
        {/* Price */}
        <p className="text-gray-700 font-bold text-sm sm:text-base mb-2">
          ₹{vehicle.price}{" "}
          <span className="text-gray-500 font-normal text-xs sm:text-sm">/day</span>
        </p>
 
        {/* Specs */}
        <div className="flex flex-col gap-1.5 text-gray-600 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <img src={AutomaticLogo} alt="Transmission" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={DriverLogo} alt="Seats" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{vehicle.seats} Seaters</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={Petrol} alt="Fuel" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{vehicle.fuel}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-500 line-clamp-2">{vehicle.location}</span>
            <p className="text-sm text-gray-600">{vehicle.distance} km away</p>

          </div>
           <div className="flex items-start gap-2">
            
            <span className="text-gray-500 line-clamp-2">{vehicle.distance}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default VehicleCard;
 
 
 
