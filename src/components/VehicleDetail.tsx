import React from 'react';
import { Car } from "./types.ts";

interface Props {
  car: Car;
}

const VehicleDetails: React.FC<Props> = ({ car }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <img src={car.imageUrl} alt={car.model} className="w-full h-48 object-cover rounded-md mb-4" />
      <h2 className="text-2xl font-bold mb-2">{car.model}</h2>
      <p className="text-gray-700 mb-1">💰 Price: ₹{car.price}</p>
      <p className="text-gray-700 mb-1">⛽ Fuel Type: {car.fuelType}</p>
      <p className="text-gray-700 mb-1">📌 Status: 
        <span className={`ml-2 px-2 py-1 rounded text-sm ${
          car.status === 'Available' ? 'bg-green-100 text-green-700' :
          car.status === 'Booked' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {car.status}
        </span>
      </p>
    </div>
  );
};

export default VehicleDetails;