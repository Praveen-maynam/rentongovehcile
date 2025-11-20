// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ChevronLeft, ChevronRight, Star } from "lucide-react";
// import { useReviewStore } from "../store/review.store";
// import { vehicles } from "./data/Vehicle";
// import StarRating from "../components/ui/StarRating";

// const VehicleDetailsPage: React.FC = () => {
  
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const { getReviewsByVehicleId, getAverageRating, getTotalReviewCount, getRatingDistribution } = useReviewStore();

//   // Get vehicle data from static data
//   const vehicleData = vehicles.find(v => v.id === id);
  
//   if (!vehicleData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-xl text-gray-600">Vehicle not found</p>
//       </div>
//     );
//   }

//   // Get dynamic review data from store
//   const vehicleReviews = getReviewsByVehicleId(id || "1");
//   const averageRating = getAverageRating(id || "1");
//   const totalReviews = getTotalReviewCount(id || "1");
//   const ratingDistribution = getRatingDistribution(id || "1");

//   const vehicle = {
//     id: vehicleData.id,
//     name: vehicleData.name,
//     price: vehicleData.price,
//     priceType: "hr",
//     transmission: vehicleData.transmission,
//     seats: vehicleData.seats,
//     fuel: vehicleData.fuel,
//     ac: true,
//     images: [
//       "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800",
//       "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
//       "https://images.unsplash.com/photo-1542362567-b07e54a88bf4?w=800",
//       "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800",
//     ],
//     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//     rating: averageRating,
//     totalReviews: totalReviews,
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Image and Details */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Image Gallery */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <div className="relative">
//                 <img
//                   src={vehicle.images[currentImageIndex]}
//                   alt={vehicle.name}
//                   className="w-full h-[400px] object-cover"
//                 />
                
//                 {/* Image Navigation */}
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
//                 >
//                   <ChevronLeft className="w-6 h-6" />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
//                 >
//                   <ChevronRight className="w-6 h-6" />
//                 </button>

//                 {/* Image Indicators */}
//                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//                   {vehicle.images.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                       className={`w-2 h-2 rounded-full transition ${
//                         index === currentImageIndex ? "bg-white" : "bg-white/50"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Vehicle Details */}
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h1 className="text-3xl font-bold text-gray-900 mb-4">{vehicle.name}</h1>
              
//               <div className="flex items-baseline mb-6">
//                 <span className="text-4xl font-bold text-gray-900">₹{vehicle.price}</span>
//                 <span className="text-gray-600 ml-2">/{vehicle.priceType}</span>
//               </div>

//               {/* Specifications */}
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//                 <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
//                   <div className="w-10 h-10 mb-2 flex items-center justify-center">
//                     <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <circle cx="12" cy="12" r="10" strokeWidth="2" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
//                     </svg>
//                   </div>
//                   <span className="text-sm text-gray-600">{vehicle.transmission}</span>
//                 </div>

//                 <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
//                   <div className="w-10 h-10 mb-2 flex items-center justify-center">
//                     <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                     </svg>
//                   </div>
//                   <span className="text-sm text-gray-600">{vehicle.seats} Seaters</span>
//                 </div>

//                 <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
//                   <div className="w-10 h-10 mb-2 flex items-center justify-center">
//                     <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                   </div>
//                   <span className="text-sm text-gray-600">{vehicle.fuel}</span>
//                 </div>

//                 <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
//                   <div className="w-10 h-10 mb-2 flex items-center justify-center">
//                     <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
//                     </svg>
//                   </div>
//                   <span className="text-sm text-gray-600">AC</span>
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
//                 <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
//               </div>

//               {/* Book Now Button */}
//               <button
//                 onClick={() => navigate(`/book-now/${vehicle.id}`)}
//                 className="w-full mt-6 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-4 px-6 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg"
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>

//           {/* Right Column - Reviews */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>

//               {/* Rating Summary */}
//               <div className="mb-6">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Star className="w-5 h-5 text-gray-400" />
//                   <h3 className="font-semibold text-gray-900">Ratings & Reviews</h3>
//                 </div>
// {/* {same} */}
//                 <div className="flex items-end gap-4 mb-4">
//                   <span className="text-5xl font-bold text-gray-900">{vehicle.rating}</span>
//                   <div className="pb-2">
//                     <div className="flex mb-1">
//                       <StarRating rating={vehicle.rating} />
//                     </div>
//                     <p className="text-sm text-gray-600">{vehicle.totalReviews} reviews</p>
//                   </div>
//                 </div>

//                 {/* Rating Distribution */}
//                 <div className="flex flex-row gap-2">
//                   {ratingDistribution.map((item) => (
//                     <div key={item.stars} className="flex items-center gap-2">
//                       <span className="text-sm font-medium w-3">{item.stars}</span>
//                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                       <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-blue-500 rounded-full transition-all duration-300"
//                           style={{ width: `${item.percentage}%` }}
//                         />
//                       </div>
//                       <span className="text-xs text-gray-500 w-10 text-right">{item.percentage}%</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Customer Reviews */}
//               <div>
//                 <h3 className="font-semibold text-gray-900 mb-4">Customers Reviews</h3>
//                 <div className="space-y-4 max-h-[400px] overflow-y-auto">
//                   {vehicleReviews.length === 0 ? (
//                     <div className="text-center py-8">
//                       <p className="text-gray-500 text-sm">No reviews yet</p>
//                       <p className="text-gray-400 text-xs mt-1">Be the first to review this vehicle!</p>
//                     </div>
//                   ) : (
//                     vehicleReviews.map((review) => (
//                       <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
//                         <div className="flex items-start gap-3">
//                           <img
//                             src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}&background=0B0E92&color=fff`}
//                             alt={review.userName}
//                             className="w-10 h-10 rounded-full"
//                           />
//                           <div className="flex-1">
//                             <div className="flex items-center justify-between mb-1">
//                               <h4 className="font-semibold text-gray-900">{review.userName}</h4>
//                               <div className="flex">
//                                 <StarRating rating={review.rating} size="sm" />
//                               </div>
//                             </div>
//                             <p className="text-xs text-gray-500 mb-2">{review.location}</p>
//                             <p className="text-sm text-gray-600">{review.comment}</p>
//                             <p className="text-xs text-gray-400 mt-1">
//                               {new Date(review.timestamp).toLocaleDateString('en-US', { 
//                                 month: 'short', 
//                                 day: 'numeric', 
//                                 year: 'numeric' 
//                               })}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>

//                 {vehicleReviews.length > 3 && (
//                   <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 font-medium text-sm py-2">
//                     See all {totalReviews} reviews 
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleDetailsPage;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import StarRating from "../components/ui/StarRating";
import apiService from "../services/api.service";

interface Vehicle {
  _id?: string;
  bikeName?: string;
  bikeModel?: string;
  carName?: string;
  carModel?: string;
  bikeNumber?: string;
  carNumber?: string;
  price?: number;
  priceType?: string;
  transmission?: string;
  seats?: number;
  fuel?: string;
  images?: string[];
  description?: string;
  rating?: number;
  totalReviews?: number;
}

interface Review {
  _id: string;
  userId: string;
  userName?: string;
  rating: number;
  comment: string;
  createdAt: string;
  location?: string;
}

interface RatingStats {
  averageRating: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

const VehicleDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [vehicleData, setVehicleData] = useState<Vehicle | null>(null);
  const [vehicleType, setVehicleType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // ✅ Dynamic Reviews State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ratingStats, setRatingStats] = useState<RatingStats>({
    averageRating: 0,
    totalReviews: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // ✅ Detect vehicle type
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    setVehicleType(type);
  }, [location.search]);

  // ✅ Fetch vehicle details
  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (!id || !vehicleType) return;
      try {
        setLoading(true);
        let response;
        if (vehicleType === "bike") {
          response = await apiService.bike.getBikeById(id);
        } else {
          response = await apiService.car.getCarById(id);
        }

        const data = apiService.utils.extractResponseData(response);
        setVehicleData(data);
      } catch (error) {
        console.error("❌ Error fetching vehicle details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [id, vehicleType]);

  // ✅ Fetch Reviews and Average Rating Dynamically
  useEffect(() => {
    const fetchReviewsAndRating = async () => {
      if (!id || !vehicleType) return;
      
      try {
        setReviewsLoading(true);
        
        // Fetch reviews
        const reviewsResponse = await apiService.review.getReviewsByCarId(id);
        const reviewsData = apiService.utils.extractResponseData(reviewsResponse);
        
        console.log("📊 Reviews fetched:", reviewsData);
        
        // Transform reviews data
        const transformedReviews: Review[] = Array.isArray(reviewsData) 
          ? reviewsData.map((review: any) => ({
              _id: review._id,
              userId: review.userId,
              userName: review.userName || "Anonymous",
              rating: review.rating || 0,
              comment: review.comment || "",
              createdAt: review.createdAt || new Date().toISOString(),
              location: review.location || "Unknown"
            }))
          : [];

        setReviews(transformedReviews);

        // Fetch average rating
        try {
          const ratingResponse = await apiService.review.getAverageRating(
            id, 
            vehicleType as 'car' | 'bike'
          );
          const ratingData = apiService.utils.extractResponseData(ratingResponse);
          
          console.log("⭐ Rating data:", ratingData);
          
          // Calculate rating distribution
          const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
          transformedReviews.forEach(review => {
            const stars = Math.round(review.rating) as 1 | 2 | 3 | 4 | 5;
            if (stars >= 1 && stars <= 5) {
              distribution[stars]++;
            }
          });

          setRatingStats({
            averageRating: ratingData?.averageRating || 0,
            totalReviews: transformedReviews.length,
            distribution
          });
        } catch (ratingError) {
          console.warn("⚠️ Could not fetch average rating:", ratingError);
          
          // Fallback: Calculate from reviews
          const avgRating = transformedReviews.length > 0
            ? transformedReviews.reduce((sum, r) => sum + r.rating, 0) / transformedReviews.length
            : 0;
          
          const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
          transformedReviews.forEach(review => {
            const stars = Math.round(review.rating) as 1 | 2 | 3 | 4 | 5;
            if (stars >= 1 && stars <= 5) {
              distribution[stars]++;
            }
          });

          setRatingStats({
            averageRating: avgRating,
            totalReviews: transformedReviews.length,
            distribution
          });
        }
      } catch (error) {
        console.error("❌ Error fetching reviews:", error);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviewsAndRating();
  }, [id, vehicleType]);

  const nextImage = () => {
    if (vehicleData?.images?.length) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % vehicleData.images!.length
      );
    }
  };

  const prevImage = () => {
    if (vehicleData?.images?.length) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + vehicleData.images!.length) %
          vehicleData.images!.length
      );
    }
  };

  // Calculate rating distribution percentages
  const getRatingDistribution = () => {
    const total = ratingStats.totalReviews;
    if (total === 0) {
      return [
        { stars: 5, count: 0, percentage: 0 },
        { stars: 4, count: 0, percentage: 0 },
        { stars: 3, count: 0, percentage: 0 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 },
      ];
    }

    return [5, 4, 3, 2, 1].map(stars => ({
      stars,
      count: ratingStats.distribution[stars as keyof typeof ratingStats.distribution],
      percentage: Math.round(
        (ratingStats.distribution[stars as keyof typeof ratingStats.distribution] / total) * 100
      )
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 text-lg">
        Loading vehicle details...
      </div>
    );
  }

  if (!vehicleData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 text-lg">
        Vehicle not found.
      </div>
    );
  }

  const vehicleName = vehicleData.carName || vehicleData.bikeName || "Vehicle";
  const vehicleModel = vehicleData.carModel || vehicleData.bikeModel || "";
  const price = vehicleData.price || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                {vehicleData.images && vehicleData.images.length > 0 ? (
                  <img
                    src={vehicleData.images[currentImageIndex]}
                    alt={vehicleName}
                    className="w-full h-[400px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 text-gray-500">
                    No Image Available
                  </div>
                )}

                {vehicleData.images && vehicleData.images.length > 1 && (
                  <>
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
                  </>
                )}

                {/* Image Indicators */}
                {vehicleData.images && vehicleData.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {vehicleData.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {vehicleName}
              </h1>
              <p className="text-gray-500 mb-4">{vehicleModel}</p>

              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{price}
                </span>
                <span className="text-gray-600 ml-2">
                  /{vehicleData.priceType || "hr"}
                </span>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <SpecCard label={vehicleData.transmission || "Manual"} />
                <SpecCard label={`${vehicleData.seats || 4} Seaters`} />
                <SpecCard label={vehicleData.fuel || "Petrol"} />
                <SpecCard label="AC" />
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {vehicleData.description || "No description available."}
                </p>
              </div>

              {/* Book Now */}
              <button
                onClick={() =>
                  navigate(`/book-now/${vehicleData._id}?type=${vehicleType}`)
                }
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

              {reviewsLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading reviews...</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-gray-400" />
                      <h3 className="font-semibold text-gray-900">
                        Ratings & Reviews
                      </h3>
                    </div>

                    <div className="flex items-end gap-4 mb-4">
                      <span className="text-5xl font-bold text-gray-900">
                        {ratingStats.averageRating.toFixed(1)}
                      </span>
                      <div className="pb-2">
                        <StarRating rating={ratingStats.averageRating} />
                        <p className="text-sm text-gray-600">
                          {ratingStats.totalReviews} reviews
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {getRatingDistribution().map((item) => (
                        <div key={item.stars} className="flex items-center gap-2">
                          <span className="text-sm font-medium w-3">
                            {item.stars}
                          </span>
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all duration-300"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-10 text-right">
                            {item.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Reviews */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Customer Reviews
                    </h3>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                      {reviews.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500 text-sm">No reviews yet</p>
                          <p className="text-gray-400 text-xs mt-1">
                            Be the first to review this vehicle!
                          </p>
                        </div>
                      ) : (
                        reviews.map((review) => (
                          <div
                            key={review._id}
                            className="border-b border-gray-100 pb-4 last:border-0"
                          >
                            <div className="flex items-start gap-3">
                              <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  review.userName || "User"
                                )}&background=0B0E92&color=fff`}
                                alt={review.userName}
                                className="w-10 h-10 rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-semibold text-gray-900">
                                    {review.userName}
                                  </h4>
                                  <StarRating rating={review.rating} size="sm" />
                                </div>
                                <p className="text-xs text-gray-500 mb-2">
                                  {review.location || "Unknown location"}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {review.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable spec card component
const SpecCard = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

export default VehicleDetailsPage;