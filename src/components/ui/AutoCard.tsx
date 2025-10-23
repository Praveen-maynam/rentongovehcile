import React from "react";
import { useNavigate } from "react-router-dom";
import { Vehicle } from "../../types/Vehicle";
import { useReviewStore } from "../../store/review.store";
import DriverLogo from "../../assets/icons/seats.jpeg";

interface AutoCardProps {
  vehicle: Vehicle;
  showBookButton?: boolean;
  onBook?: (vehicle: Vehicle) => void;
}

const AutoCard: React.FC<AutoCardProps> = ({
  vehicle,
  showBookButton = false,
  onBook,
}) => {
  const navigate = useNavigate();
  const { getAverageRating } = useReviewStore();

  const rating = getAverageRating(vehicle.id);

  const handleBook = () => {
    if (onBook) onBook(vehicle);
    else navigate(`/book-now/${vehicle.id}`);
  };

  const handleCardClick = () => {
    navigate(`/book-now/${vehicle.id}`);
  };

  return (
    <div className="flex flex-col">
      {/* Auto Card */}
      <div
        className="flex flex-col bg-white shadow-md rounded-xl p-4 cursor-pointer hover:shadow-lg transition w-full sm:w-[250px] h-auto"
        onClick={handleCardClick}
      >
        {/* Auto Image */}
        <div className="w-full h-[200px] overflow-hidden rounded-lg mb-3">
          <img 
            src={vehicle.image} 
            alt={vehicle.name} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Auto Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Name and Rating */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg text-gray-900">{vehicle.name}</h3>
              <span className="flex items-center justify-center px-3 py-1 text-gray-900 text-sm bg-yellow-50 border border-yellow-400 rounded">
                ⭐ {rating.toFixed(1)}
              </span>
            </div>

            {/* Price */}
            <p className="text-gray-900 font-bold text-xl mb-3">
              ₹{vehicle.price}<span className="text-base font-normal text-gray-600">/hr</span>
            </p>

            {/* Seats */}
            <div className="flex items-center gap-2 text-gray-600 text-base">
              <img src={DriverLogo} alt="Seats" className="w-6 h-6" />
              <span>{vehicle.seats} Seaters</span>
            </div>
          </div>
        </div>
      </div>

      {/* Book Now Button (optional) */}
      {showBookButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleBook();
          }}
          className="mt-3 w-full sm:w-[250px] bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 px-6 rounded-full shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          Book now
          <span className="text-xl">→</span>
        </button>
      )}
    </div>
  );
};

export default AutoCard;
