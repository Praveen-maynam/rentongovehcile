// src/pages/BookingConfirmation.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vehicles } from "./data/Vehicle";
import { Vehicle } from "../types/Vehicle";

const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);

  if (!vehicle) return <p className="p-8">Vehicle not found!</p>;

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-semibold mb-6">Confirm Booking for {vehicle.name}?</h2>
      <div className="flex justify-center gap-6">
        <button onClick={() => navigate("/call-or-chat")} className="bg-green-600 text-white px-6 py-3 rounded-lg">Yes</button>
        <button onClick={() => navigate(-1)} className="bg-red-500 text-white px-6 py-3 rounded-lg">No</button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
