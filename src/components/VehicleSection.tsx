import React, { useState } from "react";
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
  viewMoreLink?: string; // optional navigation link
  hideViewMore?: boolean; // NEW prop to hide the button
}

const VehicleSection: React.FC<VehicleSectionProps> = ({
  title,
  vehicles,
  showBookButton = false,
  type,
  viewMoreLink,
  hideViewMore = false, // default false
}) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="px-6 py-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {!hideViewMore && vehicles.length > 4 && !showAll && (
          <button
            onClick={() =>
              viewMoreLink ? navigate(viewMoreLink) : setShowAll(true)
            }
            className="text-blue-600 hover:underline font-medium"
          >
            View More →
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        {(showAll ? vehicles : vehicles.slice(0, 4)).map((v, index) => {
          switch (type) {
            case "car":
              return (
                <VehicleCard
                  key={v.id}
                  vehicle={v}
                  showActions={false}
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
          }
        })}
      </div>

      {showAll && !hideViewMore && vehicles.length > 4 && (
        <button
          onClick={() => setShowAll(false)}
          className="text-blue-600 hover:underline font-medium text-center py-2 mt-4 w-full"
        >
          Show Less ↑
        </button>
      )}
    </div>
  );
};

export default VehicleSection;
