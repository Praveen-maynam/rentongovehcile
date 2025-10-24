import React from "react";
import VehicleSection from "../components/VehicleSection";
import { vehicles } from "./data/Vehicle";

const NearbyCars: React.FC = () => {
  const cars = vehicles.filter((v) => v.type === "car");

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-4">
   
      <VehicleSection title="Nearby Cars" vehicles={cars} type="car" hideViewMore />

    </div>
  );
};

export default NearbyCars;
