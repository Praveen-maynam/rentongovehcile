// src/pages/BookNow.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vehicles } from "./data/Vehicle";
import { Vehicle } from "../types/Vehicle";
import { Star } from "lucide-react";

const dummyReviews = [
  {
    name: "Manoj Kumar",
    rating: 5,
    location: "Kakinada",
    comment: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Manoj Kumar",
    rating: 5,
    location: "Kakinada",
    comment: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
   name: "Manoj Kumar",
    rating: 5,
    location: "Kakinada",
    comment: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const BookNow: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);

  if (!vehicle) return <p className="p-8">Vehicle not found!</p>;

  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Vehicle Image */}
      <div className="lg:col-span-1">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="rounded-xl w-full mb-4"
        />
        <div className="flex justify-center space-x-2 mt-2">
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
        </div>
      </div>

      {/* Middle Column - Vehicle Info */}
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-bold">{vehicle.name}</h2>
        <p className="text-gray-600 text-lg mt-1">₹{vehicle.price}/hr</p>

        <div className="flex gap-4 mt-4">
          <div className="flex flex-col items-center p-2 border rounded-lg">
            <span>⚙️</span>
            <span className="text-sm mt-1">Automatic</span>
          </div>
          <div className="flex flex-col items-center p-2 border rounded-lg">
            <span>🧍‍♂️</span>
            <span className="text-sm mt-1">5 Seaters</span>
          </div>
          <div className="flex flex-col items-center p-2 border rounded-lg">
            <span>⛽</span>
            <span className="text-sm mt-1">Petrol</span>
          </div>
          <div className="flex flex-col items-center p-2 border rounded-lg">
            <span>❄️</span>
            <span className="text-sm mt-1">AC</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Description</h3>
          <p className="text-gray-600 text-sm">
            Lorem ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Book Now Button */}
        <button
          onClick={() => navigate(`/booking-confirmation/${vehicle.id}`)}
          className="mt-6 bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white px-6 py-3 rounded-lg"
        >
          Book Now
        </button>
      </div>

      {/* Right Column - Reviews */}
      <div className="lg:col-span-1">
        <h3 className="text-lg font-bold">Rating & Reviews</h3>

        {/* Average Rating */}
        <div className="flex items-center mt-2 mb-2 justify-between">
          <span className="text-2xl font-bold">4.2</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={i < 4 ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
        </div>

        {/* Reviews Count */}
        <span className="text-gray-500 text-sm">200 reviews</span>

        {/* Rating Distribution */}
        <div className="mt-4 space-y-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center text-sm">
              <span className="w-6">{star}★</span>
              <div className="flex-1 bg-gray-200 h-2 rounded mx-2">
                <div
                  className="bg-yellow-400 h-2 rounded"
                  style={{ width: `${star * 10}%` }}
                />
              </div>
              <span className="w-8 text-gray-500">{star * 10}%</span>
            </div>
          ))}
        </div>

        {/* Customer Reviews */}
        <h4 className="font-semibold text-md mt-4 mb-2">Customer Reviews</h4>
        <div className="space-y-4">
          {dummyReviews.map((review, idx) => (
            <div key={idx} className="border p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
                <div>
                  <div className="flex items-center gap-1 font-bold text-gray-900">
                    <span>{review.name}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                          size={14}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{review.location}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* See More Text */}
        <p className="mt-4 text-center text-blue-600 cursor-pointer">See More</p>
      </div>
    </div>
  );
};

export default BookNow;
