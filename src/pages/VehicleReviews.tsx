// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { Star, Loader2, RefreshCw, Trash2, Edit, ArrowLeft } from "lucide-react";
// import toast from "react-hot-toast";

// // ============================================================
// // INTERFACES
// // ============================================================
// interface Review {
//   _id: string;
//   userId: string;
//   vehicleId: string;
//   rating: number;
//   review?: string;
//   reviewText?: string;
//   comment?: string;
//   feedback?: string;
//   userName?: string;
//   createdAt?: string;
// }

// interface LocationState {
//   vehicleId?: string;
//   vehicleName?: string;
//   vehicleImage?: string;
// }

// const VehicleReviews: React.FC = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const location = useLocation();
//   const state = location.state as LocationState;

//   // ============================================================
//   // STATE MANAGEMENT
//   // ============================================================
//   const [apiReviews, setApiReviews] = useState<Review[]>([]);
//   const [loadingReviews, setLoadingReviews] = useState(false);
//   const [reviewsError, setReviewsError] = useState<string>("");
//   const [lastFetchTime, setLastFetchTime] = useState<number>(0);
//   const [apiAverageRating, setApiAverageRating] = useState<number>(0);
//   const [loadingAverageRating, setLoadingAverageRating] = useState<boolean>(false);
//   const [openMenuId, setOpenMenuId] = useState<string | null>(null);
//   const [isDeletingReview, setIsDeletingReview] = useState<boolean>(false);

//   const vehicleId = id || state?.vehicleId || "";
//   const vehicleName = state?.vehicleName || "Vehicle";
//   const vehicleImage = state?.vehicleImage;

//   // Get current user ID from localStorage
//   const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";

//   // ============================================================
//   // FETCH REVIEWS ON MOUNT
//   // ============================================================
//   useEffect(() => {
//     if (vehicleId) {
//       console.log("🔄 Initial review fetch triggered for vehicle:", vehicleId);
//       fetchReviewsByVehicleId(vehicleId);
//       fetchAverageRating(vehicleId);
//     }
//   }, [vehicleId]);

//   // ============================================================
//   // AUTO-REFRESH REVIEWS EVERY 30 SECONDS
//   // ============================================================
//   useEffect(() => {
//     if (vehicleId) {
//       const intervalId = setInterval(() => {
//         console.log("🔄 Auto-refreshing reviews...");
//         fetchReviewsByVehicleId(vehicleId, true);
//         fetchAverageRating(vehicleId, true);
//       }, 30000);

//       return () => clearInterval(intervalId);
//     }
//   }, [vehicleId]);

//   // ============================================================
//   // CLOSE MENU ON OUTSIDE CLICK
//   // ============================================================
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;
//       if (!target.closest('.review-menu')) {
//         setOpenMenuId(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // ============================================================
//   // HELPER: CHECK IF REVIEW BELONGS TO CURRENT USER
//   // ============================================================
//   const isUserReview = (review: Review): boolean => {
//     return review.userId === currentUserId;
//   };

//   // ============================================================
//   // FETCH AVERAGE RATING FROM API
//   // ============================================================
//   const fetchAverageRating = async (vehicleId: string, silent: boolean = false) => {
//     if (!silent) {
//       setLoadingAverageRating(true);
//     }

//     try {
//       const vehicleType = "Car";
//       const response = await fetch(
//         `http://3.110.122.127:3000/getAverageRating?vechileType=${vehicleType}&vechileId=${vehicleId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.ok) {
//         const result = await response.json();
//         if (result.success && result.averageRating !== undefined) {
//           const avgRating = parseFloat(result.averageRating);
//           setApiAverageRating(avgRating);
//         }
//       }
//     } catch (error: any) {
//       console.error("❌ Failed to fetch average rating:", error.message);
//     } finally {
//       if (!silent) {
//         setLoadingAverageRating(false);
//       }
//     }
//   };

//   // ============================================================
//   // FETCH REVIEWS FROM API
//   // ============================================================
//   const fetchReviewsByVehicleId = async (vehicleId: string, silent: boolean = false) => {
//     const now = Date.now();
//     if (now - lastFetchTime < 5000 && !silent) {
//       console.log("⏳ Skipping fetch - too soon after last request");
//       return;
//     }
//     setLastFetchTime(now);

//     if (!silent) {
//       setLoadingReviews(true);
//       setReviewsError("");
//     }

//     try {
//       const response = await fetch(
//         `http://3.110.122.127:3000/getReviewsById/${vehicleId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.ok) {
//         const result = await response.json();

//         if (result.success && Array.isArray(result.reviews)) {
//           setApiReviews(result.reviews);
          
//           if (!silent) {
//             toast.success(`✅ Loaded ${result.reviews.length} review(s)`, {
//               duration: 2000,
//               position: 'top-right',
//             });
//           }
//         } else {
//           setApiReviews([]);
          
//           if (!silent) {
//             toast("No reviews yet for this vehicle", {
//               duration: 2000,
//               position: 'top-right',
//             });
//           }
//         }
//       }
//     } catch (error: any) {
//       console.error("❌ Fetch reviews failed:", error.message);
//       setReviewsError("Unable to load reviews.");
//       setApiReviews([]);
      
//       if (!silent) {
//         toast.error("Failed to load reviews", {
//           duration: 3000,
//           position: 'top-right',
//         });
//       }
//     } finally {
//       if (!silent) {
//         setLoadingReviews(false);
//       }
//     }
//   };

//   // ============================================================
//   // CALCULATE RATING DISTRIBUTION
//   // ============================================================
//   const calculateRatingDistribution = (reviews: Review[]) => {
//     const distribution = [5, 4, 3, 2, 1].map(stars => {
//       const count = reviews.filter(r => r.rating === stars).length;
//       const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
//       return { stars, count, percentage };
//     });
//     return distribution;
//   };

//   // ============================================================
//   // REFRESH REVIEWS HANDLER
//   // ============================================================
//   const handleRefreshReviews = () => {
//     if (vehicleId) {
//       fetchReviewsByVehicleId(vehicleId, false);
//       fetchAverageRating(vehicleId, false);
//     }
//   };

//   // ============================================================
//   // NAVIGATE TO FEEDBACK PAGE FOR EDITING
//   // ============================================================
//   const handleNavigateToFeedback = (review: Review) => {
//     navigate("/feedback", {
//       state: {
//         reviewId: review._id,
//         vehicleId: review.vehicleId || vehicleId,
//         reviewText: review.review || review.reviewText || review.comment || review.feedback || "",
//         rating: review.rating || 0,
//         isEditing: true,
//       },
//     });
//     setOpenMenuId(null);
//   };

//   // ============================================================
//   // DELETE REVIEW HANDLER
//   // ============================================================
//   const handleDeleteReview = async (reviewId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
    
//     if (!window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
//       return;
//     }

//     setIsDeletingReview(true);
    
//     try {
//       const response = await fetch(`http://3.110.122.127:3000/deleteReview/${reviewId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         toast.success('✅ Review deleted successfully', {
//           duration: 2000,
//           position: 'top-right',
//         });
        
//         setTimeout(() => {
//           fetchReviewsByVehicleId(vehicleId, false);
//           fetchAverageRating(vehicleId, false);
//         }, 500);
//       } else {
//         const errorData = await response.json();
//         toast.error(`❌ Failed to delete review: ${errorData.message || 'Unknown error'}`, {
//           duration: 3000,
//           position: 'top-right',
//         });
//       }
//     } catch (error: any) {
//       console.error('❌ Error deleting review:', error);
//       toast.error(`Error: ${error.message}`, {
//         duration: 3000,
//         position: 'top-right',
//       });
//     } finally {
//       setIsDeletingReview(false);
//       setOpenMenuId(null);
//     }
//   };

//   const displayRatingDistribution = calculateRatingDistribution(apiReviews);

//   // ============================================================
//   // MAIN RENDER
//   // ============================================================
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
//           >
//             <ArrowLeft size={20} />
//             <span className="font-medium">Back</span>
//           </button>

//           {vehicleImage && (
//             <div className="bg-white rounded-2xl p-4 mb-4 shadow-md flex items-center gap-4">
//               <img
//                 src={vehicleImage}
//                 alt={vehicleName}
//                 className="w-20 h-20 rounded-lg object-cover"
//               />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">{vehicleName}</h1>
//                 <p className="text-gray-600">Customer Reviews</p>
//               </div>
//             </div>
//           )}

//           {!vehicleImage && (
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Reviews</h1>
//           )}
//         </div>

//         {/* Reviews Container */}
//         <div className="bg-white rounded-2xl shadow-xl p-6">
//           {/* Header with Refresh */}
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">Rating & Reviews</h2>
//             <div className="flex items-center gap-2">
//               {(loadingReviews || loadingAverageRating) && (
//                 <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
//               )}
//               <button
//                 onClick={handleRefreshReviews}
//                 disabled={loadingReviews || loadingAverageRating}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//                 title="Refresh reviews"
//               >
//                 <RefreshCw className={`w-5 h-5 text-gray-600 ${(loadingReviews || loadingAverageRating) ? 'animate-spin' : ''}`} />
//               </button>
//             </div>
//           </div>

//           {/* Review Source Indicator */}
//           {apiReviews.length > 0 && (
//             <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
//               <span className="text-sm text-green-700 font-medium">
//                 ✓ Live reviews from API
//               </span>
//               <span className="text-xs text-gray-500">
//                 (Updated {new Date(lastFetchTime).toLocaleTimeString()})
//               </span>
//             </div>
//           )}

//           {/* Review Error */}
//           {reviewsError && (
//             <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//               <p className="text-sm text-yellow-700">{reviewsError}</p>
//             </div>
//           )}

//           {/* Average Rating Display */}
//           <div className="flex items-center justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200 mb-6">
//             <div className="flex flex-col">
//               <span className="text-5xl font-bold text-gray-900">{apiAverageRating.toFixed(1)}</span>
//               <span className="text-sm text-gray-600 mt-2">out of 5</span>
//             </div>
//             <div className="flex flex-col items-end">
//               <div className="flex gap-1 mb-2">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={i < Math.floor(apiAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                     size={28}
//                   />
//                 ))}
//               </div>
//               <span className="text-lg text-gray-600">
//                 {apiReviews.length} Review{apiReviews.length !== 1 ? 's' : ''}
//               </span>
//             </div>
//           </div>

//           {/* Rating Distribution */}
//           <div className="mb-8 space-y-3 bg-gray-50 p-6 rounded-xl border">
//             <h3 className="text-lg font-semibold text-gray-700 mb-4">Rating Breakdown</h3>
//             {displayRatingDistribution.map((r) => (
//               <div key={r.stars} className="flex items-center text-base">
//                 <span className="w-12 text-gray-700 font-medium">{r.stars}★</span>
//                 <div className="flex-1 bg-gray-200 h-4 rounded-full mx-4 overflow-hidden">
//                   <div 
//                     className="bg-gradient-to-r from-yellow-400 to-orange-400 h-4 rounded-full transition-all duration-500" 
//                     style={{ width: `${r.percentage}%` }} 
//                   />
//                 </div>
//                 <span className="text-gray-500 text-sm min-w-[60px] text-right">
//                   {r.count} ({r.percentage}%)
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Individual Reviews */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-semibold text-gray-700 mb-4">
//               Customer Reviews ({apiReviews.length})
//             </h3>
            
//             {apiReviews.length > 0 ? (
//               apiReviews.map((r, idx) => {
//                 const canEdit = isUserReview(r);
//                 const displayName = r.userName || 
//                                    (canEdit ? (localStorage.getItem('userName') || 'You') : `User ${idx + 1}`);
                
//                 return (
//                   <div
//                     key={r._id || idx}
//                     className={`border rounded-xl p-5 transition-all duration-200 relative ${
//                       canEdit
//                         ? "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg"
//                         : "border-gray-200 bg-white hover:shadow-md"
//                     }`}
//                   >
//                     {/* Review Header */}
//                     <div className="flex justify-between items-start mb-3">
//                       <div className="flex items-center gap-3 flex-1">
//                         <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg ${canEdit ? 'ring-4 ring-blue-200' : ''}`}>
//                           {displayName.charAt(0).toUpperCase()}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-2 flex-wrap">
//                             <span className="font-bold text-gray-900 text-lg truncate">
//                               {displayName}
//                             </span>
//                             {canEdit && (
//                               <span className="text-xs bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full font-bold flex-shrink-0 shadow-md">
//                                 YOUR REVIEW
//                               </span>
//                             )}
//                           </div>
//                           {r.createdAt && (
//                             <p className="text-sm text-gray-500 mt-1">
//                               {new Date(r.createdAt).toLocaleDateString('en-US', {
//                                 year: 'numeric',
//                                 month: 'short',
//                                 day: 'numeric',
//                                 hour: '2-digit',
//                                 minute: '2-digit'
//                               })}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       {/* Rating & Menu */}
//                       <div className="flex items-center gap-2 flex-shrink-0">
//                         <div className="flex bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-2 rounded-lg border-2 border-yellow-300 shadow-sm">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               size={18}
//                               className={i < r.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
//                             />
//                           ))}
//                         </div>

//                         {canEdit && (
//                           <div className="relative review-menu">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setOpenMenuId(openMenuId === r._id ? null : r._id);
//                               }}
//                               className={`p-2 rounded-full transition-all duration-200 ${
//                                 openMenuId === r._id 
//                                   ? 'bg-blue-200 text-blue-700' 
//                                   : 'hover:bg-blue-100 text-gray-500'
//                               }`}
//                             >
//                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                 <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//                               </svg>
//                             </button>

//                             {openMenuId === r._id && (
//                               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-30 overflow-hidden">
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleNavigateToFeedback(r);
//                                   }}
//                                   className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 transition-colors text-left"
//                                 >
//                                   <Edit size={16} className="text-blue-600" />
//                                   <span className="font-medium text-gray-700">Edit Review</span>
//                                 </button>
                                
//                                 <div className="border-t border-gray-200"></div>
                                
//                                 <button
//                                   onClick={(e) => handleDeleteReview(r._id, e)}
//                                   disabled={isDeletingReview}
//                                   className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
//                                 >
//                                   {isDeletingReview ? (
//                                     <>
//                                       <Loader2 size={16} className="animate-spin" />
//                                       <span className="font-medium">Deleting...</span>
//                                     </>
//                                   ) : (
//                                     <>
//                                       <Trash2 size={16} />
//                                       <span className="font-medium">Delete Review</span>
//                                     </>
//                                   )}
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Review Text */}
//                     <div className="mt-4">
//                       <p className="text-base text-gray-700 leading-relaxed bg-white bg-opacity-60 p-4 rounded-lg border border-gray-200">
//                         {r.review || r.reviewText || r.comment || r.feedback || "No comment provided"}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
//                 <div className="text-6xl mb-4">📝</div>
//                 <p className="text-gray-500 font-medium text-lg mb-2">No reviews yet</p>
//                 <p className="text-gray-400">
//                   Be the first to review this vehicle!
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleReviews;
export{};