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

  const handleCardClick = () => {
    if (onBook) onBook(vehicle);
    else navigate(`/book-now/${vehicle.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col bg-white shadow-md rounded-xl cursor-pointer border border-transparent
                 transition-all duration-200 hover:shadow-lg hover:border-blue-500 hover:scale-95
                 w-[220px] sm:w-[240px] md:w-[250px]"
    >
      {/* Image */}
      <div className="w-full h-[160px] overflow-hidden rounded-t-lg">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col p-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {vehicle.name}
          </h3>
          <span className="px-1.5 py-0.5 text-xs bg-yellow-50 border border-yellow-400 text-gray-900 rounded">
            ⭐ {rating.toFixed(1)}
          </span>
        </div>

        <p className="text-gray-700 font-bold text-sm mb-2">
          ₹{vehicle.price} <span className="text-gray-500 font-normal">/day</span>
        </p>

        <div className="flex flex-col gap-1.5 text-gray-600 text-xs">
          <div className="flex items-center gap-2">
            <img src={AutomaticLogo} alt="Transmission" className="w-4 h-4" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={DriverLogo} alt="Seats" className="w-4 h-4" />
            <span>{vehicle.seats} Seaters</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={Petrol} alt="Fuel" className="w-4 h-4" />
            <span>{vehicle.fuel}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-500 line-clamp-2">{vehicle.location}</span>
          </div>
        </div>

        {/* Admin Actions */}
        {showActions && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(vehicle);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(vehicle);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs"
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
