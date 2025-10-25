import React from "react";
import { useNavigate } from "react-router-dom";
import VehicleCard from "../components/ui/VehicleCard";
import AutoCard from "../components/ui/AutoCard";
import BikeCard from "../components/ui/BikeCard";

type VehicleType = "car" | "auto" | "bike";

interface VehicleSectionProps {
  title: string;
  vehicles: typeof import("../pages/data/Vehicle").vehicles;
  showBookButton?: boolean;
  type: VehicleType;
  hideViewMore?: boolean;
  viewMoreLink?: string; // ✅ added this
}

const VehicleSection: React.FC<VehicleSectionProps> = ({
  title,
  vehicles,
  showBookButton = false,
  type,
  hideViewMore = false,
  viewMoreLink,
}) => {
  const navigate = useNavigate();

  // ✅ Only show first 4 vehicles
  const visibleVehicles = vehicles.slice(0, 4);

  // ✅ When clicking “View More”
  const handleViewMore = () => {
    if (viewMoreLink) navigate(viewMoreLink);
    else {
      switch (type) {
        case "car":
          navigate("/nearby-cars");
          break;
        case "auto":
          navigate("/nearby-autos");
          break;
        case "bike":
          navigate("/nearby-bikes");
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="px-6 py-4 mb-6">
      {/* Title + View More */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

        {/* ✅ fixed syntax */}
        {!hideViewMore && vehicles.length > 4 && (
          <button
            onClick={handleViewMore}
            className="text-blue-600 hover:underline font-medium"
          >
            View More →
          </button>
        )}
      </div>

      {/* Vehicle Grid */}
      <div className="flex flex-wrap gap-4">
        {visibleVehicles.map((v, index) => {
          switch (type) {
            case "car":
              return (
                <VehicleCard
                  key={v.id}
                  vehicle={v}
                  onBook={() => navigate(`/book-now/${v.id}`)}
                />
              );
            case "auto":
              return (
                <AutoCard
                  key={v.id}
                  vehicle={v}
                  showBookButton={showBookButton && index === 0}
                  onBook={() => navigate(`/book-now/${v.id}`)}
                />
              );
            case "bike":
              return (
                <BikeCard
                  key={v.id}
                  vehicle={v}
                  showBookButton={showBookButton && index === 0}
                  onBook={() => navigate(`/book-now/${v.id}`)}
                />
              );
            default:
              return null; // ✅ Added explicit return
          }
        })}
      </div>
    </div>
  );
};

export default VehicleSection;
