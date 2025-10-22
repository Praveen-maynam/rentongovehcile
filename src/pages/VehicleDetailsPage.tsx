import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useReviewStore } from "../store/review.store";
import { vehicles } from "./data/Vehicle";

const VehicleDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { getReviewsByVehicleId, getAverageRating, getTotalReviewCount, getRatingDistribution } = useReviewStore();

  // Get vehicle data from static data
  const vehicleData = vehicles.find(v => v.id === id);
  
  if (!vehicleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Vehicle not found</p>
      </div>
    );
  }

  // Get dynamic review data from store
  const vehicleReviews = getReviewsByVehicleId(id || "1");
  const averageRating = getAverageRating(id || "1");
  const totalReviews = getTotalReviewCount(id || "1");
  const ratingDistribution = getRatingDistribution(id || "1");

  const vehicle = {
    id: vehicleData.id,
    name: vehicleData.name,
    price: vehicleData.price,
    priceType: "hr",
    transmission: vehicleData.transmission,
    seats: vehicleData.seats,
    fuel: vehicleData.fuel,
    ac: true,
    images: [
      "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
      "https://images.unsplash.com/photo-1542362567-b07e54a88bf4?w=800",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800",
    ],
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    rating: averageRating,
    totalReviews: totalReviews,
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={vehicle.images[currentImageIndex]}
                  alt={vehicle.name}
                  className="w-full h-[400px] object-cover"
                />
                
                {/* Image Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {vehicle.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{vehicle.name}</h1>
              
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-gray-900">₹{vehicle.price}</span>
                <span className="text-gray-600 ml-2">/{vehicle.priceType}</span>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 mb-2 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">{vehicle.transmission}</span>
                </div>

                <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 mb-2 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">{vehicle.seats} Seaters</span>
                </div>

                <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 mb-2 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">{vehicle.fuel}</span>
                </div>

                <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 mb-2 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">AC</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
              </div>

              {/* Book Now Button */}
              <button
                onClick={() => navigate(`/book-now/${vehicle.id}`)}
                className="w-full mt-6 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-4 px-6 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Right Column - Reviews */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>

              {/* Rating Summary */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">Ratings & Reviews</h3>
                </div>

                <div className="flex items-end gap-4 mb-4">
                  <span className="text-5xl font-bold text-gray-900">{vehicle.rating}</span>
                  <div className="pb-2">
                    <div className="flex mb-1">
                      {renderStars(vehicle.rating)}
                    </div>
                    <p className="text-sm text-gray-600">{vehicle.totalReviews} reviews</p>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-3">
                      <span className="text-sm font-medium w-4">{item.stars}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-16 text-right">{item.count} ({item.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Reviews */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Customers Reviews</h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {vehicleReviews.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-sm">No reviews yet</p>
                      <p className="text-gray-400 text-xs mt-1">Be the first to review this vehicle!</p>
                    </div>
                  ) : (
                    vehicleReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex items-start gap-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}&background=0B0E92&color=fff`}
                            alt={review.userName}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">{review.location}</p>
                            <p className="text-sm text-gray-600">{review.comment}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(review.timestamp).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {vehicleReviews.length > 3 && (
                  <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 font-medium text-sm py-2">
                    See all {totalReviews} reviews 
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
