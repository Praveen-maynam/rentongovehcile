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
    else navigate(`/booknow/${vehicle.id}`);
  };

  return (
    <div
      className="flex flex-col sm:flex-row justify-start items-start bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition cursor-pointer w-full h-auto"
      onClick={handleBook}
    >
      {/* Vehicle Image */}
      <div className="w-full sm:w-[350px] h-[200px] sm:h-[250px] overflow-hidden rounded-lg flex-shrink-0 mb-4 sm:mb-0">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover"
        />
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
