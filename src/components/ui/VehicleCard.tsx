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
import { Vehicle } from "../../types/Vehicle";

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

      {/* Admin Actions */}
      {showActions && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onEdit?.(vehicle)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete?.(vehicle)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default VehicleCard;

