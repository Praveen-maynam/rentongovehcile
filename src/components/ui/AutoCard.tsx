import React from "react";
import { useNavigate } from "react-router-dom";
import { Vehicle } from "../../types/Vehicle";
import { useReviewStore } from "../../store/review.store";
import DriverLogo from "../../assets/icons/seats.jpeg";

interface AutoCardProps {
  vehicle: Vehicle;
  showBookButton?: boolean;
  onBook?: (vehicle: Vehicle) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (vehicle: Vehicle) => void;
}

const AutoCard: React.FC<AutoCardProps> = ({
  vehicle,
  showBookButton = false,
  onBook,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { getAverageRating } = useReviewStore();
  const rating = getAverageRating(vehicle.id);

  const handleBook = () => {
    if (onBook) onBook(vehicle);
    else navigate(`/book-now/${vehicle.id}`);
  };

  return (
    <div
      className="flex flex-col bg-white rounded-xl shadow-md border border-transparent
                 hover:shadow-lg hover:border-blue-500 transition-all duration-200
                 cursor-pointer
                 w-full sm:w-[220px] md:w-[240px] lg:w-[260px]"
      onClick={handleBook}
    >
      {/* Image */}
      <div className="w-full h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden rounded-t-xl">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between p-3">
        {/* Name + Rating */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
            {vehicle.name}
          </h3>
          <span className="px-1.5 py-0.5 text-xs bg-yellow-50 border border-yellow-400 text-gray-900 rounded">
            ⭐ {rating.toFixed(1)}
          </span>
        </div>

        {/* Price */}
        <p className="text-gray-900 font-bold text-sm sm:text-base mb-1">
          ₹{vehicle.price}
          <span className="text-xs sm:text-sm font-normal text-gray-600"> /hr</span>
        </p>

        {/* Seats */}
        <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
          <img src={DriverLogo} alt="Seats" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{vehicle.seats} Seaters</span>
        </div>
      </div>
    </div>
  );
};

export default AutoCard;
