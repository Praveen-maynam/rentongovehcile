import React from "react";
import { Vehicle } from "../../types/Vehicle";
 
interface VehicleCardProps {
  vehicle: Vehicle;
  showActions?: boolean;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (vehicle: Vehicle) => void;
  onBook?: (vehicle: Vehicle) => void; // ✅ new
}
 
const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  showActions = false,
  onEdit,
  onDelete,
  onBook,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-4">
      {/* Vehicle Image */}
      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="w-[260px] h-[260px] object-cover rounded-lg" // 260x260 size
      />
 
      {/* Vehicle Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{vehicle.name}</h3>
        <p className="text-gray-600 text-sm">{vehicle.location}</p>
        <p className="text-gray-700 font-medium">₹{vehicle.price} / day</p>
      </div>
 
      {/* Actions */}
      {showActions && (
        <div className="flex flex-col gap-2">
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
            onClick={() => onEdit && onEdit(vehicle)}
          >
            Edit
          </button>
          <button
            className="bg-red-600 text-white px-2 py-1 rounded text-sm"
            onClick={() => onDelete && onDelete(vehicle)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
 
export default VehicleCard;
 
 