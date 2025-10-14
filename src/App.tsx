import React from "react";
import NavBar from "./components/NavBar";
import VehicleDetails from "./components/VehicleDetail";
import { Car } from "./types";

const App: React.FC = () => {
  // Sample car data
  const carData: Car = {
    model: "Tata Nexon EV",
    price: 1500,
    fuelType: "Electric",
    status: "Available",
    imageUrl: process.env.PUBLIC_URL + "/car.webp", // put your car image in /public folder
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <NavBar />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-6 p-4">
        <VehicleDetails car={carData} />
      </div>
    </div>
  );
};

export default App;
