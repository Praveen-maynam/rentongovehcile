import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vehicles } from "./data/Vehicle";
import { Vehicle } from "../types/Vehicle";

const BookNow: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);

  if (!vehicle) return <p className="p-8">Vehicle not found!</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <img src={vehicle.image} alt={vehicle.name} className="rounded-xl w-full mb-6" />
      <h2 className="text-2xl font-bold">{vehicle.name}</h2>
      <p className="text-gray-600">₹{vehicle.price}/hr</p>

      <button
        onClick={() => navigate(`/booking-confirmation/${vehicle.id}`)}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Book Now
      </button>
    </div>
  );
};

export default BookNow;
