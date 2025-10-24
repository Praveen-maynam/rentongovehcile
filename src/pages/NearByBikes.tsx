import React from "react";
import VehicleSection from "../components/VehicleSection";
import { vehicles } from "./data/Vehicle";

const NearbyBikes: React.FC = () => {
  const bikes = vehicles.filter((v) => v.type === "bike");

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-4">
    
     <VehicleSection title="Nearby Bikes" vehicles={bikes} type="bike" hideViewMore />

    </div>
  );
};

export default NearbyBikes;
