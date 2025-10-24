import React from "react";
import VehicleSection from "../components/VehicleSection";
import { vehicles } from "./data/Vehicle";

const NearbyAutos: React.FC = () => {
  const autos = vehicles.filter((v) => v.type === "auto");

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-4">
    <VehicleSection title="Nearby Autos" vehicles={autos} type="auto" hideViewMore />

    </div>
  );
};

export default NearbyAutos;
