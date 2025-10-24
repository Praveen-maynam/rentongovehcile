// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Vehicle } from "../../types/Vehicle";

// interface VehicleCardProps {
//   vehicle: Vehicle;
//   showActions?: boolean;
//   onEdit?: (vehicle: Vehicle) => void;
//   onDelete?: (vehicle: Vehicle) => void;
//   onBook?: (vehicle: Vehicle) => void;
// }

// const VehicleCard: React.FC<VehicleCardProps> = ({
//   vehicle,
//   showActions = false,
//   onEdit,
//   onDelete,
//   onBook,
// }) => {
//   const navigate = useNavigate();

//   const handleBook = () => {
//     if (onBook) onBook(vehicle);
//     else navigate(`/booknow/${vehicle.id}`);
//   };

//   return (
//     <div
//       className="bg-white rounded-lg shadow-lg p-4 flex flex-col hover:shadow-xl transition-shadow cursor-pointer"
//     >
//       {/* Vehicle Image (Clickable) */}
//       <img
//         src={vehicle.image}
//         alt={vehicle.name}
//         className="w-full h-48 object-cover rounded-lg mb-3"
//         onClick={handleBook}
//       />

//       {/* Vehicle Info */}
//       <div className="flex-1">
//         <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
//         <p className="text-gray-600 text-sm">{vehicle.location}</p>
//         <p className="text-gray-700 font-medium mt-1">₹{vehicle.price} / day</p>
//         <div className="text-sm text-gray-600 mt-2">
//           {vehicle.transmission} · {vehicle.fuel} · {vehicle.seats} Seaters
//         </div>
//       </div>

//       {/* Admin Actions */}
//       {showActions && (
//         <div className="flex gap-2 mt-3">
//           <button
//             onClick={() => onEdit?.(vehicle)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => onDelete?.(vehicle)}
//             className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
//           >
//             Delete
//           </button>
//         </div>
//       )}
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
  showActions?: boolean;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (vehicle: Vehicle) => void;
  onBook?: (vehicle: Vehicle) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  showActions = false,
  onEdit,
  onDelete,
  onBook,
}) => {
  const navigate = useNavigate();
  const { getAverageRating } = useReviewStore();

  const rating = getAverageRating(vehicle.id);

  const handleBook = () => {
    if (onBook) onBook(vehicle);
    else navigate(`/book-now/${vehicle.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col hover:shadow-xl transition-shadow cursor-pointer">
      {/* Vehicle Image */}
      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="w-full h-48 object-cover rounded-lg mb-3"
        onClick={handleBook}
      />

      {/* Vehicle Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
        <p className="text-gray-600 text-sm">{vehicle.location}</p>
        <p className="text-gray-700 font-medium mt-1">₹{vehicle.price} / day</p>
        <div className="text-sm text-gray-600 mt-2">
          {vehicle.transmission} · {vehicle.fuel} · {vehicle.seats} Seaters
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="flex-1 sm:ml-6 w-full">
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <h3 className="font-semibold text-xl text-gray-900">{vehicle.name}</h3>
          <span className="flex items-center justify-center px-3 py-1 text-gray-900 text-sm bg-yellow-50 border border-yellow-400 rounded">
            ⭐ {rating.toFixed(1)}
          </span>
        </div>

        <p className="font-bold text-gray-900 text-xl mb-4">
          ₹{vehicle.price}<span className="text-base font-normal text-gray-600">/hr</span>
        </p>

        <div className="flex flex-col gap-3 text-gray-600 text-base">
          <div className="flex items-center gap-3">
            <img src={AutomaticLogo} alt="Transmission" className="w-6 h-6" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-3">
            <img src={DriverLogo} alt="Seats" className="w-6 h-6" />
            <span>{vehicle.seats} Seaters</span>
          </div>
          <div className="flex items-center gap-3">
            <img src={Petrol} alt="Fuel" className="w-6 h-6" />
            <span>{vehicle.fuel}</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 text-gray-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-500 leading-relaxed">{vehicle.location}</span>
          </div>
        </div>

        {/* Admin Actions */}
        {showActions && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(vehicle);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(vehicle);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleCard;

