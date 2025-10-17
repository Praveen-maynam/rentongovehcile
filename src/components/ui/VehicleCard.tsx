import React from "react";
import { MoreVertical } from "lucide-react";
import { Vehicle } from "../../types/Vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
  showActions?: boolean;
  onStatusChange?: (status: string, vehicle: Vehicle) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (vehicle: Vehicle) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  showActions = false,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="relative flex flex-col sm:flex-row justify-between items-start bg-white shadow-md rounded-xl p-4 mb-4 hover:shadow-lg transition">
      {/* Image + Details */}
      <div className="flex items-start gap-4 w-full sm:w-auto">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-28 h-24 object-cover rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-vehicle.jpg";
          }}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{vehicle.name}</h3>
            <span className="text-gray-600 text-sm">⭐ {vehicle.rating}</span>
          </div>
          <p className="font-bold text-blue-600 text-lg mt-1">
            ₹{vehicle.price}/hr
          </p>
          <div className="text-gray-600 text-sm mt-1 leading-5">
            <p>{vehicle.transmission}</p>
            <p>{vehicle.seats} Seaters</p>
            <p>{vehicle.fuel}</p>
            {vehicle.location && (
              <p className="text-gray-500">{vehicle.location}</p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex flex-col items-end w-full sm:w-auto mt-3 sm:mt-0">
          <div className="flex items-center gap-2">
            <select
              className={`text-sm font-medium px-2 py-1 rounded-lg border ${
                vehicle.available
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-red-100 text-red-700 border-red-300"
              }`}
              defaultValue={vehicle.available ? "Available" : "Not Available"}
              onChange={(e) => onStatusChange?.(e.target.value, vehicle)}
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>

            <div className="relative">
              <button
                className="p-2 rounded hover:bg-gray-100"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-100 z-10">
                  <button
                    onClick={() => onEdit?.(vehicle)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete?.(vehicle)}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleCard;
