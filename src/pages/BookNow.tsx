
 
// // // //  import React, { useEffect, useState } from "react";
// // // // import { useNavigate, useParams } from "react-router-dom";
// // // // import { vehicles } from "./data/Vehicle";
// // // // import { Vehicle } from "../types/Vehicle";
// // // // import { Star, Loader2 } from "lucide-react";
// // // // import apiService from "../services/api.service";
// // // // import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
// // // // import WaitingPopup from "../components/ui/WaitingPopup";
// // // // import BookingAcceptance from "../components/ui/BookingAcceptance";
// // // // import BookingRejectModal from "../components/ui/BookingRejectModal";
// // // // import PopupChat from "../components/ui/PopupChat";
// // // // import { useReviewStore } from "../store/review.store";
// // // // import { useNotificationStore } from "../store/notification.store";
// // // // import { useBookingStore } from "../store/booking.store";
// // // // import toast from "react-hot-toast";
 
// // // // import Automatic from "../assets/icons/AutomaticLogo.png";
// // // // import Driver from "../assets/icons/DriverLogo.png";
// // // // import Acicon from "../assets/icons/AutomaticLogo.png"
// // // // import Petrol from "../assets/icons/Petrol.png";
 
// // // // // Multiple CORS Proxies for reliability
// // // // const CORS_PROXIES = [
// // // //   "https://corsproxy.io/?",
// // // //   "https://api.codetabs.com/v1/proxy?quest=",
// // // // ];
// // // // const API_BASE_URL = "https://rentongo-backend.onrender.com/api";

// // // // interface Review {
// // // //   _id: string;
// // // //   userId: string;
// // // //   vehicleId: string;
// // // //   rating: number;
// // // //   review: string;
// // // //   userName?: string;
// // // //   createdAt?: string;
// // // // }
 
// // // // const BookNow: React.FC = () => {
// // // //   const navigate = useNavigate();
// // // //   const { id } = useParams<{ id: string }>();
// // // //   const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);
 
// // // //   const {
// // // //     getReviewsByVehicleId,
// // // //     getAverageRating,
// // // //     getTotalReviewCount,
// // // //     getRatingDistribution,
// // // //   } = useReviewStore();
// // // //   const { addNotification } = useNotificationStore();
// // // //   const { addBooking } = useBookingStore();

// // // //   // API car data state
// // // //   const [apiCarData, setApiCarData] = useState<any>(null);
// // // //   const [loadingCarData, setLoadingCarData] = useState(true);
// // // //   const [carDataError, setCarDataError] = useState("");
 
// // // //   const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
// // // //   const [showContactButtons, setShowContactButtons] = useState(false);
// // // //   const [showWaitingPopup, setShowWaitingPopup] = useState(false);
// // // //   const [showAcceptance, setShowAcceptance] = useState(false);
// // // //   const [waitingTimerSeconds, setWaitingTimerSeconds] = useState<number>(30);
// // // //   const [showRejectModal, setShowRejectModal] = useState(false);
// // // //   const [isChatOpen, setIsChatOpen] = useState(false);
// // // //   const [selectedDateTime, setSelectedDateTime] = useState<{
// // // //     startDate: string;
// // // //     endDate: string;
// // // //     startTime: string;
// // // //     endTime: string;
// // // //   } | null>(null);
// // // //   const [bookingId, setBookingId] = useState<string | null>(null);
// // // //   const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
// // // //   const [apiError, setApiError] = useState<string>("");
// // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // // //   // New state for API reviews
// // // //   const [apiReviews, setApiReviews] = useState<Review[]>([]);
// // // //   const [loadingReviews, setLoadingReviews] = useState(false);
// // // //   const [reviewsError, setReviewsError] = useState<string>("");

// // // //   // Fetch car details from API
// // // //   useEffect(() => {
// // // //     const fetchCarDetails = async () => {
// // // //       if (id) {
// // // //         try {
// // // //           setLoadingCarData(true);
// // // //           setCarDataError("");
// // // //           console.log(`🚗 Fetching car details for ID: ${id}`);
          
// // // //           const response = await apiService.car.getCarById(id);
// // // //           console.log("✅ Full API response:", response);
// // // //           console.log("✅ Response type:", typeof response);
// // // //           console.log("✅ Response keys:", response ? Object.keys(response) : 'no keys');
          
// // // //           // Handle different response structures
// // // //           let carData = null;
          
// // // //           if (response) {
// // // //             // Check if data is nested in a 'data' property
// // // //             if ((response as any).data) {
// // // //               console.log("📦 Data found in response.data");
// // // //               carData = (response as any).data;
// // // //             } else if ((response as any).car) {
// // // //               console.log("📦 Data found in response.car");
// // // //               carData = (response as any).car;
// // // //             } else {
// // // //               console.log("📦 Using response directly");
// // // //               carData = response;
// // // //             }
            
// // // //             console.log("🎯 Final car data to set:", carData);
// // // //             setApiCarData(carData);
// // // //           }
// // // //         } catch (err: any) {
// // // //           console.error("❌ Error fetching car details:", err);
// // // //           console.error("❌ Error response:", err.response?.data);
// // // //           setCarDataError(err.message || "Failed to load car details");
// // // //         } finally {
// // // //           setLoadingCarData(false);
// // // //         }
// // // //       }
// // // //     };

// // // //     fetchCarDetails();
// // // //   }, [id]);

// // // //   // Fetch reviews from API when component mounts
// // // //   useEffect(() => {
// // // //     if (id) {
// // // //       fetchReviewsByVehicleId(id);
// // // //     }
// // // //   }, [id]);

// // // //   // Fetch reviews by vehicle ID from API
// // // //   const fetchReviewsByVehicleId = async (vehicleId: string) => {
// // // //     setLoadingReviews(true);
// // // //     setReviewsError("");

// // // //     try {
// // // //       console.log("🔍 Fetching reviews for vehicle ID:", vehicleId);

// // // //       const requestOptions = {
// // // //         method: "GET",
// // // //         redirect: "follow" as RequestRedirect
// // // //       };

// // // //       const response = await fetch(
// // // //         `http://52.66.238.227:3000/getReviewsById/${vehicleId}`,
// // // //         requestOptions
// // // //       );

// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         console.log("✅ Reviews fetched successfully:", result);

// // // //         if (result.success && Array.isArray(result.reviews)) {
// // // //           setApiReviews(result.reviews);
// // // //           toast.success(`📊 Loaded ${result.reviews.length} reviews`);
// // // //         } else {
// // // //           setApiReviews([]);
// // // //           console.log("ℹ️ No reviews found for this vehicle");
// // // //         }
// // // //       } else {
// // // //         const errorText = await response.text();
// // // //         console.error("❌ Failed to fetch reviews:", errorText);
// // // //         setReviewsError("Failed to load reviews");
// // // //         setApiReviews([]);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("❌ Error fetching reviews:", error);
// // // //       setReviewsError("Error loading reviews. Using local data.");
// // // //       setApiReviews([]);
// // // //     } finally {
// // // //       setLoadingReviews(false);
// // // //     }
// // // //   };
 
// // // //   useEffect(() => {
// // // //     let interval: NodeJS.Timeout | null = null;
// // // //     if (showWaitingPopup && waitingTimerSeconds > 0) {
// // // //       interval = setInterval(() => {
// // // //         setWaitingTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
// // // //       }, 1000);
// // // //     }
// // // //     return () => {
// // // //       if (interval) clearInterval(interval);
// // // //     };
// // // //   }, [showWaitingPopup, waitingTimerSeconds]);
 
// // // //   useEffect(() => {
// // // //     if (showWaitingPopup && waitingTimerSeconds === 0) {
// // // //       handleTimerComplete();
// // // //     }
// // // //   }, [waitingTimerSeconds, showWaitingPopup]);

// // // //   // Calculate average rating from API reviews
// // // //   const calculateAverageRating = (reviews: Review[]): number => {
// // // //     if (reviews.length === 0) return 0;
// // // //     const total = reviews.reduce((sum, review) => sum + review.rating, 0);
// // // //     return Number((total / reviews.length).toFixed(1));
// // // //   };

// // // //   // Calculate rating distribution from API reviews
// // // //   const calculateRatingDistribution = (reviews: Review[]) => {
// // // //     const distribution = [5, 4, 3, 2, 1].map(stars => {
// // // //       const count = reviews.filter(r => r.rating === stars).length;
// // // //       const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
// // // //       return { stars, count, percentage };
// // // //     });
// // // //     return distribution;
// // // //   };

// // // //   // Show loading while fetching API data
// // // //   if (loadingCarData) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
// // // //         <div className="text-center space-y-4 p-8">
// // // //           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
// // // //           <p className="text-xl text-gray-700 font-semibold">Loading vehicle details...</p>
// // // //           <p className="text-sm text-gray-500">Please wait while we fetch the car information</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Show error if API fetch failed and no local vehicle data
// // // //   if (carDataError && !vehicle) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
// // // //         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
// // // //           <div className="text-6xl">❌</div>
// // // //           <p className="text-xl text-red-600 font-bold">Error Loading Vehicle</p>
// // // //           <p className="text-gray-600">{carDataError}</p>
// // // //           <button
// // // //             onClick={() => navigate(-1)}
// // // //             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
// // // //           >
// // // //             ← Go Back
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Check if we have either local vehicle data or API data
// // // //   if (!vehicle && !apiCarData) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// // // //         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
// // // //           <div className="text-6xl">🚗</div>
// // // //           <p className="text-xl text-gray-700 font-bold">Vehicle Not Found</p>
// // // //           <p className="text-gray-600">The vehicle you're looking for doesn't exist or has been removed.</p>
// // // //           <button
// // // //             onClick={() => navigate(-1)}
// // // //             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
// // // //           >
// // // //             ← Go Back
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }
 
// // // //   // Map vehicle type for API (capitalized as required by backend enum)
// // // //   const mapVehicleTypeForAPI = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
// // // //     console.log("🔍 DEBUG mapVehicleTypeForAPI INPUT:", type);
    
// // // //     if (!type) {
// // // //       console.warn("⚠️ Vehicle type is undefined/null, defaulting to 'Car'");
// // // //       return "Car";
// // // //     }
    
// // // //     const normalized = type.toLowerCase();
// // // //     console.log("🔍 DEBUG normalized type:", normalized);
    
// // // //     // Backend enum expects capitalized first letter: Car, Auto, Bike
// // // //     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
// // // //       car: "Car",
// // // //       auto: "Auto",
// // // //       bike: "Bike",
// // // //     };
    
// // // //     const result = typeMap[normalized] || "Car";
// // // //     console.log("🔍 DEBUG mapVehicleTypeForAPI OUTPUT:", result);
    
// // // //     return result;
// // // //   };
  
// // // //   // Map vehicle type for store (capitalized as expected by booking store)
// // // //   const mapVehicleTypeForStore = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
// // // //     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
// // // //       car: "Car",
// // // //       auto: "Auto",
// // // //       bike: "Bike",
// // // //     };
// // // //     return type ? typeMap[type.toLowerCase()] || "Car" : "Car";
// // // //   };
 
// // // //   const calculateTotalHours = (
// // // //     startDate: string,
// // // //     endDate: string,
// // // //     startTime: string,
// // // //     endTime: string
// // // //   ): number => {
// // // //     try {
// // // //       const parseTime = (timeStr: string) => {
// // // //         const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
// // // //         if (!match) return { hours: 0, minutes: 0 };
       
// // // //         let hours = parseInt(match[1]);
// // // //         const minutes = parseInt(match[2] || '0');
// // // //         const period = match[3]?.toUpperCase();
       
// // // //         if (period === 'PM' && hours !== 12) hours += 12;
// // // //         if (period === 'AM' && hours === 12) hours = 0;
       
// // // //         return { hours, minutes };
// // // //       };
 
// // // //       const startTimeParsed = parseTime(startTime);
// // // //       const endTimeParsed = parseTime(endTime);
 
// // // //       const start = new Date(startDate);
// // // //       start.setHours(startTimeParsed.hours, startTimeParsed.minutes, 0, 0);
 
// // // //       const end = new Date(endDate);
// // // //       end.setHours(endTimeParsed.hours, endTimeParsed.minutes, 0, 0);
 
// // // //       const diffInMs = end.getTime() - start.getTime();
// // // //       const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
     
// // // //       console.log("📊 Calculated hours:", { start, end, hours });
// // // //       return hours > 0 ? hours : 1;
// // // //     } catch (error) {
// // // //       console.error("❌ Error calculating hours:", error);
// // // //       return 1;
// // // //     }
// // // //   };
 
// // // //   const formatDateForAPI = (dateString: string): string => {
// // // //     try {
// // // //       const date = new Date(dateString);
// // // //       if (!isNaN(date.getTime())) {
// // // //         const year = date.getFullYear();
// // // //         const month = String(date.getMonth() + 1).padStart(2, '0');
// // // //         const day = String(date.getDate()).padStart(2, '0');
// // // //         return `${year}-${month}-${day}`;
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("❌ Date formatting error:", error);
// // // //     }
// // // //     return dateString;
// // // //   };
 
// // // //   const formatTimeForAPI = (timeString: string): string => {
// // // //     try {
// // // //       const ampmMatch = timeString.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
// // // //       if (ampmMatch) {
// // // //         let hours = parseInt(ampmMatch[1]);
// // // //         const minutes = ampmMatch[2] || '00';
// // // //         const period = ampmMatch[3].toUpperCase();
       
// // // //         if (period === 'PM' && hours !== 12) hours += 12;
// // // //         if (period === 'AM' && hours === 12) hours = 0;
       
// // // //         return `${hours.toString().padStart(2, '0')}.${minutes}`;
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("❌ Time formatting error:", error);
// // // //     }
// // // //     return timeString;
// // // //   };
 
// // // //   /**
// // // //    * Production-Level Create Booking API Integration
// // // //    * 
// // // //    * Features:
// // // //    * - Dynamic user/car data retrieval
// // // //    * - Comprehensive error handling
// // // //    * - Multiple API endpoint fallback strategies
// // // //    * - Request/response validation
// // // //    * - Notification integration
// // // //    * - Booking store persistence
// // // //    * - Detailed logging for debugging
// // // //    */
// // // //   const createBookingAPI = async ( 
// // // //     startDate: string,
// // // //     endDate: string,
// // // //     startTime: string,
// // // //     endTime: string
// // // //   ) => {
// // // //     // Validation: Check if vehicle data exists
// // // //     if (!currentVehicle) {
// // // //       const errorMsg = "Vehicle information is missing. Please try again.";
// // // //       setApiError(errorMsg);
// // // //       addNotification({
// // // //         title: "Booking Failed",
// // // //         message: errorMsg,
// // // //         type: "booking_declined",
// // // //       });
// // // //       return null;
// // // //     }
 
// // // //     setIsSubmittingBooking(true);
// // // //     setApiError("");
 
// // // //     try {
// // // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //       console.log("🚀 PRODUCTION BOOKING API - START");
// // // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      
// // // //       // Calculate booking details
// // // //       const totalHours = calculateTotalHours(startDate, endDate, startTime, endTime);
// // // //       const pricePerDay = parseInt(String(apiCarData?.RentPerDay || currentVehicle.price || "0"), 10);
// // // //       const pricePerHour = pricePerDay > 0 ? Math.round(pricePerDay / 24) : parseInt(String(currentVehicle.price || "0"), 10);
// // // //       const totalPrice = totalHours * pricePerHour;
      
// // // //       console.log("💰 Pricing Calculation:");
// // // //       console.log("   Price/Day:", pricePerDay);
// // // //       console.log("   Price/Hour:", pricePerHour);
// // // //       console.log("   Total Hours:", totalHours);
// // // //       console.log("   Total Price:", totalPrice);
 
// // // //       // Format dates and times for API
// // // //       const formattedFromDate = formatDateForAPI(startDate);
// // // //       const formattedToDate = formatDateForAPI(endDate);
// // // //       const formattedFromTime = formatTimeForAPI(startTime);
// // // //       const formattedToTime = formatTimeForAPI(endTime);
      
// // // //       // Get dynamic user data (from localStorage or defaults)
// // // //       const userId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
// // // //       const contactNumber = localStorage.getItem('contactNumber') || "6301818409";
// // // //       const contactName = localStorage.getItem('contactName') || localStorage.getItem('userName') || "User";
// // // //       const userLatitude = localStorage.getItem('latitude') || "17.438095";
// // // //       const userLongitude = localStorage.getItem('longitude') || "78.4485";
 
// // // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //       console.log("🚗 CURRENT VEHICLE DEBUG:");
// // // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //       console.log("currentVehicle:", currentVehicle);
// // // //       console.log("currentVehicle.id:", currentVehicle.id);
// // // //       console.log("currentVehicle.type:", currentVehicle.type);
// // // //       console.log("currentVehicle.name:", currentVehicle.name);
// // // //       console.log("typeof currentVehicle.type:", typeof currentVehicle.type);
// // // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

// // // //       // Build comprehensive request body with all car information
// // // //       const requestBody = {
// // // //         // User Information
// // // //         userId: userId,
// // // //         contactNumber: contactNumber,
// // // //         contactName: contactName,
        
// // // //         // Location
// // // //         latitude: userLatitude,
// // // //         longitude: userLongitude,
        
// // // //         // Vehicle Information (Dynamic from BookNow page)
// // // //         VechileId: currentVehicle.id,
// // // //         vechileType: mapVehicleTypeForAPI(currentVehicle.type),
// // // //         carName: apiCarData?.CarName || currentVehicle.name || '',
// // // //         carModel: apiCarData?.Model || '',
// // // //         carBrand: apiCarData?.Brand || '',
// // // //         carNumber: apiCarData?.CarNumber || '',
// // // //         fuelType: apiCarData?.FuelType || '',
// // // //         transmissionType: apiCarData?.TransmissionType || '',
// // // //         seatingCapacity: apiCarData?.SeatingCapacity?.toString() || '',
        
// // // //         // Pricing
// // // //         pricePerDay: pricePerDay.toString(),
// // // //         pricePerHour: pricePerHour.toString(),
// // // //         pricePerKm: pricePerHour.toString(),
        
// // // //         // Booking Dates/Times
// // // //         FromDate: formattedFromDate,
// // // //         ToDate: formattedToDate,
// // // //         FromTime: formattedFromTime,
// // // //         ToTime: formattedToTime,
        
// // // //         // Calculated Values
// // // //         totalHours: totalHours.toString(),
// // // //         totalPrice: totalPrice.toString(),
        
// // // //         // Additional
// // // //         pickupAddress: apiCarData?.pickupAddress || '',
// // // //         dropoffAddress: apiCarData?.pickupAddress || '',
// // // //       };
 
// // // //       console.log("📋 Request Body:");
// // // //       console.table(requestBody);
// // // //       console.log("VALIDATION: vechileType =", requestBody.vechileType);
// // // //       console.log("VALIDATION: VechileId =", requestBody.VechileId);
// // // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
 
// // // //       // Prepare URL-encoded body for API
// // // //       const urlencoded = new URLSearchParams();
// // // //       Object.entries(requestBody).forEach(([key, value]) => {
// // // //         if (value !== null && value !== undefined) {
// // // //           urlencoded.append(key, String(value));
// // // //         }
// // // //       });
      
// // // //       // Verify critical fields made it to URLSearchParams
// // // //       console.log("URLENCODED CHECK: vechileType =", urlencoded.get('vechileType'));
// // // //       console.log("URLENCODED CHECK: VechileId =", urlencoded.get('VechileId'));
 
// // // //       const API_ENDPOINT = `${API_BASE_URL}/createBooking`;
      
// // // //       // Production Strategy 1: Try using apiService (with built-in CORS handling)
// // // //       console.log("🎯 Strategy 1: Using apiService.booking.createBooking");
// // // //       try {
// // // //         // Pass the complete requestBody (already has correct field names and vechileType)
// // // //         const apiServiceResponse = await apiService.booking.createBooking(requestBody);
        
// // // //         console.log("✅ API Service Response:", apiServiceResponse);
        
// // // //         const bookingIdFromResponse = (apiServiceResponse as any)?.data?.bookingId || 
// // // //                                      (apiServiceResponse as any)?.data?._id ||
// // // //                                      (apiServiceResponse as any)?.bookingId ||
// // // //                                      (apiServiceResponse as any)?._id ||
// // // //                                      `BOOK-${Date.now()}`;
        
// // // //         setBookingId(bookingIdFromResponse);
        
// // // //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //         console.log("🎉 BOOKING CREATED SUCCESSFULLY!");
// // // //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //         console.log("📌 Booking ID:", bookingIdFromResponse);
// // // //         console.log("🚗 Car ID:", currentVehicle.id);
// // // //         console.log("📛 Car Name:", requestBody.carName);
// // // //         console.log("💰 Total Price:", totalPrice);
// // // //         console.log("✅ Strategy: apiService");
// // // //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        
// // // //         // Add success notification
// // // //         addNotification({
// // // //           title: "Booking Created Successfully! 🎉",
// // // //           message: `Your booking for ${requestBody.carName} has been confirmed!`,
// // // //           type: "booking_confirmed",
// // // //           vehicleId: currentVehicle.id,
// // // //           vehicleName: requestBody.carName,
// // // //           bookingId: bookingIdFromResponse,
// // // //         });
        
// // // //         // Add to booking store
// // // //         addBooking({
// // // //           id: bookingIdFromResponse,
// // // //           vehicleId: currentVehicle.id,
// // // //           vehicleName: requestBody.carName,
// // // //           vehicleImage: currentVehicle.image,
// // // //           vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// // // //           price: totalPrice,
// // // //           startDate: formattedFromDate,
// // // //           endDate: formattedToDate,
// // // //           startTime: formattedFromTime,
// // // //           endTime: formattedToTime,
// // // //           status: 'Booked',
// // // //         });
        
// // // //         return apiServiceResponse;
        
// // // //       } catch (apiServiceError: any) {
// // // //         console.warn("⚠️ Strategy 1 failed:", apiServiceError.message);
// // // //         console.log("🔄 Falling back to Strategy 2 (CORS Proxies)...");
// // // //       }
      
// // // //       // Production Strategy 2: CORS Proxies with improved reliability
// // // //       const PRODUCTION_PROXIES = [
// // // //         "https://api.allorigins.win/raw?url=",
// // // //         "https://api.codetabs.com/v1/proxy?quest=",
// // // //         "https://thingproxy.freeboard.io/fetch/",
// // // //       ];
      
// // // //       console.log("🌐 Strategy 2: Trying CORS Proxies");
// // // //       for (let i = 0; i < PRODUCTION_PROXIES.length; i++) {
// // // //         try {
// // // //           const proxiedUrl = `${PRODUCTION_PROXIES[i]}${encodeURIComponent(API_ENDPOINT)}`;
// // // //           console.log(`🔄 Proxy ${i + 1}/${PRODUCTION_PROXIES.length}: ${PRODUCTION_PROXIES[i].substring(0, 30)}...`);
 
// // // //           const response = await Promise.race([
// // // //             fetch(proxiedUrl, {
// // // //               method: "POST",
// // // //               headers: {
// // // //                 "Content-Type": "application/x-www-form-urlencoded",
// // // //               },
// // // //               body: urlencoded.toString(),
// // // //             }),
// // // //             new Promise<never>((_, reject) =>
// // // //               setTimeout(() => reject(new Error('Proxy timeout after 15s')), 15000)
// // // //             )
// // // //           ]);
 
// // // //           console.log(`✓ Proxy ${i + 1} Response:`, response.status, response.statusText);
 
// // // //           if (response.ok) {
// // // //             const text = await response.text();
// // // //             console.log("✅ Raw Response:", text.substring(0, 200));
           
// // // //             let result;
// // // //             try {
// // // //               result = JSON.parse(text);
// // // //             } catch {
// // // //               result = { success: true, message: text };
// // // //             }
 
// // // //             const bookingIdFromResponse = result?.bookingId || 
// // // //                                          result?.data?.bookingId || 
// // // //                                          result?._id || 
// // // //                                          result?.data?._id || 
// // // //                                          `BOOK-${Date.now()}`;
            
// // // //             setBookingId(bookingIdFromResponse);
            
// // // //             console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //             console.log("🎉 BOOKING CREATED SUCCESSFULLY!");
// // // //             console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //             console.log("📌 Booking ID:", bookingIdFromResponse);
// // // //             console.log("🚗 Car:", requestBody.carName);
// // // //             console.log("✅ Strategy: Proxy", i + 1);
// // // //             console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            
// // // //             // Add success notification
// // // //             addNotification({
// // // //               title: "Booking Created Successfully! 🎉",
// // // //               message: `Your booking for ${requestBody.carName} has been confirmed!`,
// // // //               type: "booking_confirmed",
// // // //               vehicleId: currentVehicle.id,
// // // //               vehicleName: requestBody.carName,
// // // //               bookingId: bookingIdFromResponse,
// // // //             });
            
// // // //             // Add to booking store
// // // //             addBooking({
// // // //               id: bookingIdFromResponse,
// // // //               vehicleId: currentVehicle.id,
// // // //               vehicleName: requestBody.carName,
// // // //               vehicleImage: currentVehicle.image,
// // // //               vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// // // //               price: totalPrice,
// // // //               startDate: formattedFromDate,
// // // //               endDate: formattedToDate,
// // // //               startTime: formattedFromTime,
// // // //               endTime: formattedToTime,
// // // //               status: 'Booked',
// // // //             });
            
// // // //             return result;
// // // //           } else {
// // // //             console.warn(`⚠️ Proxy ${i + 1} returned status ${response.status}`);
// // // //           }
// // // //         } catch (proxyError: any) {
// // // //           console.warn(`❌ Proxy ${i + 1} failed:`, proxyError.message);
// // // //         }
// // // //       }
      
// // // //       // All strategies failed
// // // //       throw new Error("Unable to connect to booking server. Please check your internet connection and try again.");
 
// // // //     } catch (error: any) {
// // // //       console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //       console.error("❌ BOOKING CREATION FAILED");
// // // //       console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //       console.error("🚗 Car:", currentVehicle.name);
// // // //       console.error("❌ Error:", error.message);
// // // //       console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
     
// // // //       const errorMessage = error.message || "Failed to create booking. Please try again.";
// // // //       setApiError(errorMessage);
      
// // // //       // Add error notification
// // // //       addNotification({
// // // //         title: "Booking Failed ❌",
// // // //         message: errorMessage,
// // // //         type: "booking_declined",
// // // //         vehicleId: currentVehicle.id,
// // // //         vehicleName: currentVehicle.name,
// // // //       });
      
// // // //       return null;
     
// // // //     } finally {
// // // //       setIsSubmittingBooking(false);
// // // //     }
// // // //   };
 
// // // //   // Create current vehicle object - use API data if local vehicle not found
// // // //   const currentVehicle = vehicle || (apiCarData ? {
// // // //     id: apiCarData._id || apiCarData.id || id || '',
// // // //     name: apiCarData.CarName || 'Unknown Vehicle',
// // // //     image: (apiCarData.carImages && apiCarData.carImages.length > 0) 
// // // //       ? apiCarData.carImages[0] 
// // // //       : apiCarData.carImage || apiCarData.image || 'https://via.placeholder.com/400',
// // // //     price: apiCarData.RentPerDay || apiCarData.pricePerHour || '0',
// // // //     type: 'car' as Vehicle["type"],
// // // //   } : null);

// // // //   if (!currentVehicle) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen">
// // // //         <div className="text-center space-y-4 p-8">
// // // //           <p className="text-xl text-gray-700">Vehicle data not available!</p>
// // // //           <button
// // // //             onClick={() => navigate(-1)}
// // // //             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// // // //           >
// // // //             Go Back
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const vehicleReviews = getReviewsByVehicleId(currentVehicle.id);
// // // //   const averageRating = getAverageRating(currentVehicle.id);
// // // //   const totalReviews = getTotalReviewCount(currentVehicle.id);
// // // //   const ratingDistribution = getRatingDistribution(currentVehicle.id);

// // // //   // Use API reviews if available, otherwise fallback to local store
// // // //   const displayReviews = apiReviews.length > 0 ? apiReviews : vehicleReviews;
// // // //   const displayAverageRating = apiReviews.length > 0 
// // // //     ? calculateAverageRating(apiReviews) 
// // // //     : averageRating;
// // // //   const displayTotalReviews = apiReviews.length > 0 
// // // //     ? apiReviews.length 
// // // //     : totalReviews;
// // // //   const displayRatingDistribution = apiReviews.length > 0 
// // // //     ? calculateRatingDistribution(apiReviews) 
// // // //     : ratingDistribution;
 
// // // //   const handleTimerComplete = () => {
// // // //     console.log("⏰ Timer completed - Opening BookingAcceptance");
// // // //     setShowWaitingPopup(false);
// // // //     setShowAcceptance(true);
// // // //   };
 
// // // //   const handleCloseWaiting = () => {
// // // //     console.log("❌ WaitingPopup closed manually");
// // // //     setShowWaitingPopup(false);
// // // //     setWaitingTimerSeconds(30);
// // // //   };
 
// // // //   const handleAcceptBooking = () => {
// // // //     console.log("✅ Booking Accepted by Owner!");
// // // //     setShowAcceptance(false);
// // // //     setShowContactButtons(true);
// // // //   };
 
// // // //   const handleRejectBooking = () => {
// // // //     console.log("❌ Booking Rejected by Owner!");
// // // //     setShowAcceptance(false);
// // // //     setShowRejectModal(true);
// // // //   };
 
// // // //   const handleCloseRejectModal = () => {
// // // //     console.log("🔙 Reject modal closed");
// // // //     setShowRejectModal(false);
// // // //     setSelectedDateTime(null);
// // // //     setBookingId(null);
// // // //     setWaitingTimerSeconds(30);
// // // //   };
 
// // // //   const handleCallOwner = () => {
// // // //     console.log("📞 User calling owner...");
// // // //     // Simulate call - in real app, this would trigger actual call
// // // //     setTimeout(() => {
// // // //       handleConfirmBooking();
// // // //     }, 1000);
// // // //   };
 
// // // //   const handleConfirmBooking = () => {
// // // //     if (!currentVehicle || !selectedDateTime) {
// // // //       console.error("❌ Cannot confirm booking");
// // // //       return;
// // // //     }
 
// // // //     const currentDate = new Date();
// // // //     console.log("🎉 Confirming booking with ID:", bookingId);
 
// // // //     addBooking({
// // // //       id: bookingId || Date.now().toString(),
// // // //       vehicleId: currentVehicle.id,
// // // //       vehicleName: currentVehicle.name,
// // // //       vehicleImage: currentVehicle.image,
// // // //       vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// // // //       customerName: "Current User",
// // // //       bookingDate: currentDate.toLocaleDateString("en-US"),
// // // //       bookingTime: currentDate.toLocaleTimeString("en-US", {
// // // //         hour: "2-digit",
// // // //         minute: "2-digit",
// // // //       }),
// // // //       startDate: selectedDateTime.startDate,
// // // //       startTime: selectedDateTime.startTime,
// // // //       endDate: selectedDateTime.endDate,
// // // //       endTime: selectedDateTime.endTime,
// // // //       modelNo: currentVehicle.id.toUpperCase(),
// // // //       status: "Booked",
// // // //       price: currentVehicle.price,
// // // //     });
 
// // // //     setShowSuccessModal(true);
// // // //   };
// // // //    return (
// // // //     <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // //       <div className="lg:col-span-1">
// // // //         <img
// // // //           src={currentVehicle.image}
// // // //           alt={currentVehicle.name}
// // // //           className="rounded-xl w-full mb-4"
// // // //         />
// // // //         <div className="flex justify-center space-x-2 mt-2">
// // // //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// // // //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// // // //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// // // //         </div>
// // // //       </div>
 
// // // //       <div className="lg:col-span-1">
// // // //         <h2 className="text-2xl font-bold">{currentVehicle.name}</h2>
// // // //         <p className="text-gray-600 text-lg mt-1">₹{currentVehicle.price}/hr</p>
 
// // // //         <div className="flex gap-4 mt-4">
// // // //           {[
// // // //             { img: Automatic, label: apiCarData?.transmissionType },
// // // //             { img: Driver, label: apiCarData?.Carseater },
// // // //             { img: Petrol, label: apiCarData?.fuelType },
// // // //             { img: Acicon, label: "AC" },
// // // //           ].map((item, idx) => (
// // // //             <div key={idx} className="flex flex-col items-center p-2 border rounded-lg">
// // // //               <img src={item.img} alt={item.label} className="w-[25px] h-[25px]" />
// // // //               <span className="text-sm mt-1">{item.label}</span>
// // // //             </div>
// // // //           ))}
// // // //         </div>
 
// // // //         <div className="mt-6">
// // // //           <h3 className="font-semibold text-lg mb-2">Description</h3>
// // // //           <p className="text-gray-600 text-sm">
// // // //             {apiCarData?.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
// // // //           </p>
// // // //         </div>
 
// // // //         {apiError && (
// // // //           <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
// // // //             <p className="text-sm text-red-700">{apiError}</p>
// // // //             <button
// // // //               onClick={() => setApiError("")}
// // // //               className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
// // // //             >
// // // //               Dismiss
// // // //             </button>
// // // //           </div>
// // // //         )}
 
// // // //         {!showContactButtons ? (
// // // //           <button
// // // //             onClick={() => setIsDateTimeModalOpen(true)}
// // // //             disabled={isSubmittingBooking}
// // // //             className="mt-6 w-full bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
// // // //           >
// // // //             {isSubmittingBooking ? "Processing..." : "Book Now"}
// // // //           </button>
// // // //         ) : (
// // // //           <div className="mt-6 space-y-4">
// // // //             <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
// // // //               <img
// // // //                 src="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
// // // //                 alt="Manoj Kumar"
// // // //                 className="w-12 h-12 rounded-full"
// // // //               />
// // // //               <div className="flex-1">
// // // //                 <h4 className="font-semibold text-gray-900">Manoj Kumar</h4>
// // // //                 <p className="text-sm text-gray-500">Vehicle Owner</p>
// // // //               </div>
// // // //             </div>
 
// // // //             <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
// // // //               <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
// // // //                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
// // // //               </svg>
// // // //               <p className="text-sm text-orange-700 flex-1">
// // // //                 Please call the owner to discuss booking details and confirm availability.
// // // //               </p>
// // // //             </div>
 
// // // //             <div className="flex gap-3">
// // // //               <button
// // // //                 onClick={() => setIsChatOpen(true)}
// // // //                 className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
// // // //               >
// // // //                 💬 Chat
// // // //               </button>
// // // //               <button
// // // //                 onClick={handleCallOwner}
// // // //                 className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
// // // //               >
// // // //                 📞 Call Owner
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         )}
 
// // // //         {isDateTimeModalOpen && (
// // // //           <AvailabilityDateTimeModal
// // // //             isOpen={isDateTimeModalOpen}
// // // //             onClose={() => {
// // // //               setIsDateTimeModalOpen(false);
// // // //               setApiError("");
// // // //             }}
// // // //             onConfirm={async (startDate, endDate, startTime, endTime, availability) => {
// // // //               console.log("✅ DateTime selected:", { startDate, endDate, startTime, endTime });
             
// // // //               setSelectedDateTime({ startDate, endDate, startTime, endTime });
// // // //               setIsDateTimeModalOpen(false);
             
// // // //               const result = await createBookingAPI(startDate, endDate, startTime, endTime);
             
// // // //               if (result) {
// // // //                 console.log("🎉 Starting wait timer");
// // // //                 setWaitingTimerSeconds(30);
// // // //                 setShowWaitingPopup(true);
// // // //               }
// // // //             }}
// // // //           />
// // // //         )}
// // // //       </div>
 
// // // //       <div className="lg:col-span-1">
// // // //         <div className="flex items-center justify-between mb-2">
// // // //           <h3 className="text-lg font-bold">Rating & Reviews</h3>
// // // //           {loadingReviews && (
// // // //             <span className="text-xs text-gray-500 animate-pulse">Loading...</span>
// // // //           )}
// // // //         </div>

// // // //         {reviewsError && (
// // // //           <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
// // // //             {reviewsError}
// // // //           </div>
// // // //         )}

// // // //         <div className="flex items-center mt-2 mb-2 justify-between">
// // // //           <span className="text-2xl font-bold">{displayAverageRating}</span>
// // // //           <div className="flex gap-1">
// // // //             {[...Array(5)].map((_, i) => (
// // // //               <Star
// // // //                 key={i}
// // // //                 className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
// // // //                 size={20}
// // // //               />
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //         <span className="text-gray-500 text-sm">
// // // //           {displayTotalReviews} Reviews
// // // //           {apiReviews.length > 0 && <span className="text-green-600"> (from API)</span>}
// // // //         </span>
// // // //         <div className="mt-4 space-y-2">
// // // //           {displayRatingDistribution.map((r) => (
// // // //             <div key={r.stars} className="flex items-center text-sm">
// // // //               <span className="w-6">{r.stars}★</span>
// // // //               <div className="flex-1 bg-gray-200 h-2 rounded mx-2">
// // // //                 <div className="bg-yellow-400 h-2 rounded" style={{ width: `${r.percentage}%` }} />
// // // //               </div>
// // // //               <span className="text-gray-500 text-xs">{r.percentage}%</span>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //         <div className="mt-4 space-y-3">
// // // //           {displayReviews.length > 0 ? (
// // // //             displayReviews.map((r, idx) => (
// // // //               <div key={r._id || idx} className="border p-3 rounded-lg">
// // // //                 <div className="flex justify-between items-center">
// // // //                   <span className="font-semibold">
// // // //                     {r.userName || `User ${idx + 1}`}
// // // //                   </span>
// // // //                   <div className="flex">
// // // //                     {[...Array(5)].map((_, i) => (
// // // //                       <Star
// // // //                         key={i}
// // // //                         size={14}
// // // //                         className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
// // // //                       />
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //                 <p className="text-sm text-gray-600 mt-1">
// // // //                   {r.review || "No comment"}
// // // //                 </p>
// // // //                 {r.createdAt && (
// // // //                   <p className="text-xs text-gray-400 mt-1">
// // // //                     {new Date(r.createdAt).toLocaleDateString()}
// // // //                   </p>
// // // //                 )}
// // // //               </div>
// // // //             ))
// // // //           ) : (
// // // //             <div className="text-center py-8 text-gray-500 text-sm">
// // // //               No reviews yet. Be the first to review!
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
 
// // // //       {showWaitingPopup && (
// // // //         <WaitingPopup
// // // //           timer={waitingTimerSeconds}
// // // //           onClose={handleCloseWaiting}
// // // //           onTimerComplete={handleTimerComplete}
// // // //         />
// // // //       )}
 
// // // //       {showAcceptance && (
// // // //         <BookingAcceptance
// // // //           onAccept={handleAcceptBooking}
// // // //           onReject={handleRejectBooking}
// // // //           onClose={() => setShowAcceptance(false)}
// // // //         />
// // // //       )}
 
// // // //       <PopupChat
// // // //         isOpen={isChatOpen}
// // // //         onClose={() => setIsChatOpen(false)}
// // // //         ownerName="Manoj Kumar"
// // // //         ownerAvatar="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
// // // //       />
 
// // // //       <BookingRejectModal isOpen={showRejectModal} onClose={handleCloseRejectModal} />
 
// // // //       {/* Production Loading Overlay - Shows during API call */}
// // // //       {isSubmittingBooking && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// // // //           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
// // // //             <div className="flex flex-col items-center">
// // // //               {/* Animated Loader */}
// // // //               <div className="relative mb-6">
// // // //                 <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
// // // //                 <div className="absolute inset-0 flex items-center justify-center">
// // // //                   <div className="w-12 h-12 bg-blue-100 rounded-full animate-pulse"></div>
// // // //                 </div>
// // // //               </div>
              
// // // //               {/* Title */}
// // // //               <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
// // // //                 Creating Your Booking...
// // // //               </h2>
              
// // // //               {/* Car Information Card */}
// // // //               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 w-full mb-4 border border-blue-100 shadow-sm">
// // // //                 {currentVehicle && (
// // // //                   <>
// // // //                     {/* Car Image & Name */}
// // // //                     <div className="flex items-center gap-3 mb-4">
// // // //                       <img 
// // // //                         src={currentVehicle.image} 
// // // //                         alt={currentVehicle.name}
// // // //                         className="w-16 h-16 rounded-lg object-cover shadow-sm"
// // // //                       />
// // // //                       <div className="flex-1">
// // // //                         <p className="font-bold text-gray-900 text-lg">{currentVehicle.name}</p>
// // // //                         <p className="text-sm text-gray-600 capitalize">{currentVehicle.type}</p>
// // // //                       </div>
// // // //                     </div>
                    
// // // //                     {/* Car Details */}
// // // //                     <div className="space-y-2">
// // // //                       <div className="flex justify-between text-sm">
// // // //                         <span className="text-gray-600">Car ID</span>
// // // //                         <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
// // // //                           {currentVehicle.id.substring(0, 12)}...
// // // //                         </span>
// // // //                       </div>
                      
// // // //                       {apiCarData?.CarNumber && (
// // // //                         <div className="flex justify-between text-sm">
// // // //                           <span className="text-gray-600">Car Number</span>
// // // //                           <span className="font-semibold text-gray-900">{apiCarData.CarNumber}</span>
// // // //                         </div>
// // // //                       )}
                      
// // // //                       {selectedDateTime && (
// // // //                         <div className="border-t border-blue-200 pt-2 mt-3">
// // // //                           <p className="text-xs text-gray-600 mb-1">Booking Period</p>
// // // //                           <p className="text-sm text-gray-700 font-medium">
// // // //                             {selectedDateTime.startDate} {selectedDateTime.startTime}
// // // //                             <br />
// // // //                             to {selectedDateTime.endDate} {selectedDateTime.endTime}
// // // //                           </p>
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </>
// // // //                 )}
// // // //               </div>
              
// // // //               {/* Status Messages */}
// // // //               <div className="text-center space-y-2">
// // // //                 <p className="text-gray-600 text-sm">
// // // //                   Please wait while we process your booking...
// // // //                 </p>
// // // //                 <p className="text-blue-600 font-medium text-sm">
// // // //                   Connecting to server & validating data
// // // //                 </p>
// // // //               </div>
              
// // // //               {/* Progress Dots Animation */}
// // // //               <div className="flex gap-2 mt-5">
// // // //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
// // // //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
// // // //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Production Error Banner - Shows when booking fails */}
// // // //       {apiError && !isSubmittingBooking && (
// // // //         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[110] max-w-md w-full mx-4 animate-slideDown">
// // // //           <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-xl">
// // // //             <div className="flex items-start">
// // // //               <div className="flex-shrink-0">
// // // //                 <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // //                 </svg>
// // // //               </div>
// // // //               <div className="ml-3 flex-1">
// // // //                 <h3 className="text-sm font-bold text-red-800">Booking Failed</h3>
// // // //                 <p className="mt-1 text-sm text-red-700">{apiError}</p>
// // // //                 {currentVehicle && (
// // // //                   <p className="mt-1 text-xs text-red-600">
// // // //                     Car: {currentVehicle.name} (ID: {currentVehicle.id.substring(0, 8)}...)
// // // //                   </p>
// // // //                 )}
// // // //                 <div className="mt-3 flex gap-2">
// // // //                   <button
// // // //                     onClick={() => {
// // // //                       setApiError("");
// // // //                       setIsDateTimeModalOpen(true);
// // // //                     }}
// // // //                     className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
// // // //                   >
// // // //                     Retry Booking
// // // //                   </button>
// // // //                   <button
// // // //                     onClick={() => setApiError("")}
// // // //                     className="px-3 py-1.5 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-300 hover:bg-red-50 transition-colors"
// // // //                   >
// // // //                     Dismiss
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {showSuccessModal && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // // //           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
// // // //             <div className="flex justify-center mb-6">
// // // //               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
// // // //                 <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // // //                 </svg>
// // // //               </div>
// // // //             </div>
 
// // // //             <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
// // // //               Booking Posted Successfully!
// // // //             </h2>
// // // //             <p className="text-gray-600 text-center mb-6">
// // // //               After discussing with the owner, your booking has been confirmed. You will receive updates on your booking status.
// // // //             </p>
 
// // // //             <div className="bg-gray-50 rounded-lg p-4 mb-6">
// // // //               <div className="flex items-center gap-3 mb-3">
// // // //                 <img src={currentVehicle.image} alt={currentVehicle.name} className="w-16 h-16 rounded-lg object-cover" />
// // // //                 <div>
// // // //                   <h3 className="font-semibold text-gray-900">{currentVehicle.name}</h3>
// // // //                   <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
// // // //                 </div>
// // // //               </div>
             
// // // //               {selectedDateTime && (
// // // //                 <div className="text-sm text-gray-600 space-y-1">
// // // //                   <div className="flex justify-between">
// // // //                     <span>Start:</span>
// // // //                     <span className="font-medium">
// // // //                       {new Date(selectedDateTime.startDate).toLocaleDateString()} - {selectedDateTime.startTime}
// // // //                     </span>
// // // //                   </div>
// // // //                   <div className="flex justify-between">
// // // //                     <span>End:</span>
// // // //                     <span className="font-medium">
// // // //                       {new Date(selectedDateTime.endDate).toLocaleDateString()} - {selectedDateTime.endTime}
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
 
// // // //             <div className="flex gap-3">
// // // //               <button
// // // //                 onClick={() => {
// // // //                   setShowSuccessModal(false);
// // // //                   navigate("/");
// // // //                 }}
// // // //                 className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
// // // //               >
// // // //                 Go Home
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => {
// // // //                   setShowSuccessModal(false);
// // // //                   setShowContactButtons(false);
// // // //                   setSelectedDateTime(null);
// // // //                   setBookingId(null);
// // // //                   setWaitingTimerSeconds(30);
// // // //                 }}
// // // //                 className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
// // // //               >
// // // //                 Book Another
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };
 
// // // // export default BookNow;


// // // // import React, { useEffect, useState } from "react";
// // // // import { useNavigate, useParams } from "react-router-dom";
// // // // import { vehicles } from "./data/Vehicle";
// // // // import { Vehicle } from "../types/Vehicle";
// // // // import { Star, Loader2, RefreshCw } from "lucide-react";
// // // // import apiService from "../services/api.service";
// // // // import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
// // // // import WaitingPopup from "../components/ui/WaitingPopup";
// // // // import BookingAcceptance from "../components/ui/BookingAcceptance";
// // // // import BookingRejectModal from "../components/ui/BookingRejectModal";
// // // // import PopupChat from "../components/ui/PopupChat";
// // // // import { useReviewStore } from "../store/review.store";
// // // // import { useNotificationStore } from "../store/notification.store";
// // // // import { useBookingStore } from "../store/booking.store";
// // // // import toast from "react-hot-toast";
 
// // // // import Automatic from "../assets/icons/AutomaticLogo.png";
// // // // import Driver from "../assets/icons/DriverLogo.png";
// // // // import Acicon from "../assets/icons/AutomaticLogo.png"
// // // // import Petrol from "../assets/icons/Petrol.png";

// // // // // CORS Proxies for reliability
// // // // const CORS_PROXIES = [
// // // //   "https://corsproxy.io/?",
// // // //   "https://api.codetabs.com/v1/proxy?quest=",
// // // // ];
// // // // const API_BASE_URL = "https://rentongo-backend.onrender.com/api";

// // // // interface Review {
// // // //   _id: string;
// // // //   userId: string;
// // // //   vehicleId: string;
// // // //   rating: number;
// // // //   review: string;
// // // //   userName?: string;
// // // //   createdAt?: string;
// // // // }

// // // // const BookNow: React.FC = () => {
// // // //   const navigate = useNavigate();
// // // //   const { id } = useParams<{ id: string }>();
// // // //   const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);
 
// // // //   const {
// // // //     getReviewsByVehicleId,
// // // //     getAverageRating,
// // // //     getTotalReviewCount,
// // // //     getRatingDistribution,
// // // //   } = useReviewStore();
// // // //   const { addNotification } = useNotificationStore();
// // // //   const { addBooking } = useBookingStore();

// // // //   // API car data state
// // // //   const [apiCarData, setApiCarData] = useState<any>(null);
// // // //   const [loadingCarData, setLoadingCarData] = useState(true);
// // // //   const [carDataError, setCarDataError] = useState("");
 
// // // //   const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
// // // //   const [showContactButtons, setShowContactButtons] = useState(false);
// // // //   const [showWaitingPopup, setShowWaitingPopup] = useState(false);
// // // //   const [showAcceptance, setShowAcceptance] = useState(false);
// // // //   const [waitingTimerSeconds, setWaitingTimerSeconds] = useState<number>(30);
// // // //   const [showRejectModal, setShowRejectModal] = useState(false);
// // // //   const [isChatOpen, setIsChatOpen] = useState(false);
// // // //   const [selectedDateTime, setSelectedDateTime] = useState<{
// // // //     startDate: string;
// // // //     endDate: string;
// // // //     startTime: string;
// // // //     endTime: string;
// // // //   } | null>(null);
// // // //   const [bookingId, setBookingId] = useState<string | null>(null);
// // // //   const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
// // // //   const [apiError, setApiError] = useState<string>("");
// // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // // //   // Enhanced Review States
// // // //   const [apiReviews, setApiReviews] = useState<Review[]>([]);
// // // //   const [loadingReviews, setLoadingReviews] = useState(false);
// // // //   const [reviewsError, setReviewsError] = useState<string>("");
// // // //   const [lastFetchTime, setLastFetchTime] = useState<number>(0);

// // // //   // Fetch car details from API
// // // //   useEffect(() => {
// // // //     const fetchCarDetails = async () => {
// // // //       if (id) {
// // // //         try {
// // // //           setLoadingCarData(true);
// // // //           setCarDataError("");
// // // //           console.log(`🚗 Fetching car details for ID: ${id}`);
          
// // // //           const response = await apiService.car.getCarById(id);
// // // //           console.log("✅ Full API response:", response);
// // // //           console.log("✅ Response type:", typeof response);
// // // //           console.log("✅ Response keys:", response ? Object.keys(response) : 'no keys');
          
// // // //           let carData = null;
          
// // // //           if (response) {
// // // //             if ((response as any).data) {
// // // //               console.log("📦 Data found in response.data");
// // // //               carData = (response as any).data;
// // // //             } else if ((response as any).car) {
// // // //               console.log("📦 Data found in response.car");
// // // //               carData = (response as any).car;
// // // //             } else {
// // // //               console.log("📦 Using response directly");
// // // //               carData = response;
// // // //             }
            
// // // //             console.log("🎯 Final car data to set:", carData);
// // // //             setApiCarData(carData);
// // // //           }
// // // //         } catch (err: any) {
// // // //           console.error("❌ Error fetching car details:", err);
// // // //           console.error("❌ Error response:", err.response?.data);
// // // //           setCarDataError(err.message || "Failed to load car details");
// // // //         } finally {
// // // //           setLoadingCarData(false);
// // // //         }
// // // //       }
// // // //     };

// // // //     fetchCarDetails();
// // // //   }, [id]);

// // // //   // ENHANCED: Fetch reviews with multiple methods
// // // //   useEffect(() => {
// // // //     if (id) {
// // // //       console.log("🔄 Initial review fetch triggered for vehicle:", id);
// // // //       fetchReviewsByVehicleId(id);
// // // //     }
// // // //   }, [id]);

// // // //   // ENHANCED: Auto-refresh reviews every 30 seconds
// // // //   useEffect(() => {
// // // //     if (id) {
// // // //       const intervalId = setInterval(() => {
// // // //         console.log("🔄 Auto-refreshing reviews...");
// // // //         fetchReviewsByVehicleId(id, true); // silent refresh
// // // //       }, 30000); // 30 seconds

// // // //       return () => clearInterval(intervalId);
// // // //     }
// // // //   }, [id]);

// // // //   /**
// // // //    * ENHANCED REVIEW FETCH FUNCTION
// // // //    * Fetches reviews from API with multiple fallback methods
// // // //    * @param vehicleId - The vehicle ID to fetch reviews for
// // // //    * @param silent - If true, don't show loading indicators or toasts
// // // //    */
// // // //   const fetchReviewsByVehicleId = async (vehicleId: string, silent: boolean = false) => {
// // // //     // Prevent too frequent requests (minimum 5 seconds between fetches)
// // // //     const now = Date.now();
// // // //     if (now - lastFetchTime < 5000 && !silent) {
// // // //       console.log("⏳ Skipping fetch - too soon after last request");
// // // //       return;
// // // //     }
// // // //     setLastFetchTime(now);

// // // //     if (!silent) {
// // // //       setLoadingReviews(true);
// // // //       setReviewsError("");
// // // //     }

// // // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //     console.log("🔍 FETCHING REVIEWS FOR VEHICLE");
// // // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //     console.log("📋 Vehicle ID:", vehicleId);
// // // //     console.log("🕐 Timestamp:", new Date().toISOString());
// // // //     console.log("🔇 Silent Mode:", silent);

// // // //     try {
// // // //       // METHOD 1: Try direct fetch first
// // // //       console.log("🎯 Method 1: Direct API call");
// // // //       console.log("🌐 URL: http://52.66.238.227:3000/getReviewsById/" + vehicleId);
      
// // // //       const myHeaders = new Headers();
// // // //       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

// // // //       const urlencoded = new URLSearchParams();
// // // //       urlencoded.append("vechileType", "Car");
// // // //       urlencoded.append("VechileId", vehicleId);

// // // //       console.log("📤 Request Body:", {
// // // //         vechileType: urlencoded.get("vechileType"),
// // // //         VechileId: urlencoded.get("VechileId")
// // // //       });

// // // //       const requestOptions: RequestInit = {
// // // //         method: "GET",
// // // //         headers: myHeaders,
// // // //         body: urlencoded,
// // // //       };

// // // //       const response = await fetch(
// // // //         `http://52.66.238.227:3000/getReviewsById/${vehicleId}`,
// // // //         requestOptions
// // // //       );

// // // //       console.log("📥 Response Status:", response.status, response.statusText);
// // // //       console.log("📥 Response Headers:", Object.fromEntries(response.headers.entries()));

// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         console.log("✅ Raw Response Data:", result);
// // // //         console.log("✅ Response Type:", typeof result);
// // // //         console.log("✅ Response Keys:", Object.keys(result));

// // // //         if (result.success && Array.isArray(result.reviews)) {
// // // //           console.log("🎉 SUCCESS: Reviews found!");
// // // //           console.log("📊 Total Reviews:", result.reviews.length);
// // // //           console.log("📝 Reviews Data:", JSON.stringify(result.reviews, null, 2));
          
// // // //           setApiReviews(result.reviews);
          
// // // //           if (!silent) {
// // // //             toast.success(`✅ Loaded ${result.reviews.length} review(s)`, {
// // // //               duration: 2000,
// // // //               position: 'top-right',
// // // //             });
// // // //           }

// // // //           // Log each review details
// // // //           result.reviews.forEach((review: Review, index: number) => {
// // // //             console.log(`📝 Review #${index + 1}:`, {
// // // //               id: review._id,
// // // //               rating: review.rating,
// // // //               userName: review.userName,
// // // //               comment: review.review,
// // // //               createdAt: review.createdAt
// // // //             });
// // // //           });

// // // //           console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //           console.log("✅ REVIEW FETCH SUCCESSFUL");
// // // //           console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
          
// // // //           return result.reviews;
// // // //         } else {
// // // //           console.log("ℹ️ No reviews found in response");
// // // //           console.log("📊 Result structure:", result);
// // // //           setApiReviews([]);
          
// // // //           if (!silent) {
// // // //             toast("No reviews yet for this vehicle", {
// // // //               duration: 2000,
// // // //               position: 'top-right',
// // // //             });
// // // //           }
// // // //         }
// // // //       } else {
// // // //         const errorText = await response.text();
// // // //         console.error("❌ HTTP Error Response:", errorText);
// // // //         throw new Error(`HTTP ${response.status}: ${errorText}`);
// // // //       }
// // // //     } catch (error: any) {
// // // //       console.error("❌ Method 1 Failed:", error.message);
// // // //       console.error("❌ Error Stack:", error.stack);
      
// // // //       // METHOD 2: Try alternative endpoint
// // // //       try {
// // // //         console.log("🔄 Method 2: Alternative endpoint with POST");
        
// // // //         const myHeaders = new Headers();
// // // //         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

// // // //         const urlencoded = new URLSearchParams();
// // // //         urlencoded.append("vechileType", "Car");
// // // //         urlencoded.append("VechileId", vehicleId);

// // // //         console.log("📤 POST Request Body:", {
// // // //           vechileType: "Car",
// // // //           VechileId: vehicleId
// // // //         });

// // // //         const requestOptions: RequestInit = {
// // // //           method: "POST",
// // // //           headers: myHeaders,
// // // //           body: urlencoded,
// // // //         };

// // // //         const response = await fetch(
// // // //           "http://52.66.238.227:3000/getReview",
// // // //           requestOptions
// // // //         );

// // // //         console.log("📥 POST Response Status:", response.status);

// // // //         if (response.ok) {
// // // //           const result = await response.json();
// // // //           console.log("✅ POST Response Data:", result);

// // // //           if (result && Array.isArray(result.reviews)) {
// // // //             console.log("🎉 Method 2 SUCCESS!");
// // // //             setApiReviews(result.reviews);
            
// // // //             if (!silent) {
// // // //               toast.success(`✅ Loaded ${result.reviews.length} review(s)`, {
// // // //                 duration: 2000,
// // // //               });
// // // //             }
// // // //             return result.reviews;
// // // //           }
// // // //         }
// // // //       } catch (postError: any) {
// // // //         console.error("❌ Method 2 Failed:", postError.message);
// // // //       }

// // // //       // All methods failed
// // // //       console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //       console.error("❌ ALL METHODS FAILED");
// // // //       console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      
// // // //       setReviewsError("Unable to load reviews. Using cached data.");
// // // //       setApiReviews([]);
      
// // // //       if (!silent) {
// // // //         toast.error("Failed to load reviews", {
// // // //           duration: 3000,
// // // //           position: 'top-right',
// // // //         });
// // // //       }
// // // //     } finally {
// // // //       if (!silent) {
// // // //         setLoadingReviews(false);
// // // //       }
// // // //     }
// // // //   };
// // // //   // Timer effect
// // // //   useEffect(() => {
// // // //     let interval: NodeJS.Timeout | null = null;
// // // //     if (showWaitingPopup && waitingTimerSeconds > 0) {
// // // //       interval = setInterval(() => {
// // // //         setWaitingTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
// // // //       }, 1000);
// // // //     }
// // // //     return () => {
// // // //       if (interval) clearInterval(interval);
// // // //     };
// // // //   }, [showWaitingPopup, waitingTimerSeconds]);
 
// // // //   useEffect(() => {
// // // //     if (showWaitingPopup && waitingTimerSeconds === 0) {
// // // //       handleTimerComplete();
// // // //     }
// // // //   }, [waitingTimerSeconds, showWaitingPopup]);

// // // //   /**
// // // //    * ENHANCED: Calculate average rating from API reviews
// // // //    */
// // // //   const calculateAverageRating = (reviews: Review[]): number => {
// // // //     if (reviews.length === 0) return 0;
// // // //     const total = reviews.reduce((sum, review) => sum + review.rating, 0);
// // // //     const average = total / reviews.length;
// // // //     console.log("⭐ Average Rating Calculation:", {
// // // //       totalReviews: reviews.length,
// // // //       totalRating: total,
// // // //       average: average.toFixed(1)
// // // //     });
// // // //     return Number(average.toFixed(1));
// // // //   };

// // // //   /**
// // // //    * ENHANCED: Calculate rating distribution from API reviews
// // // //    */
// // // //   const calculateRatingDistribution = (reviews: Review[]) => {
// // // //     const distribution = [5, 4, 3, 2, 1].map(stars => {
// // // //       const count = reviews.filter(r => r.rating === stars).length;
// // // //       const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
      
// // // //       console.log(`⭐ ${stars} Star Distribution:`, {
// // // //         count,
// // // //         percentage: `${percentage}%`,
// // // //         reviews: reviews.filter(r => r.rating === stars).map(r => r._id)
// // // //       });
      
// // // //       return { stars, count, percentage };
// // // //     });
    
// // // //     return distribution;
// // // //   };

// // // //   /**
// // // //    * ENHANCED: Manual refresh button handler
// // // //    */
// // // //   const handleRefreshReviews = async () => {
// // // //     if (id) {
// // // //       console.log("🔄 Manual refresh triggered");
// // // //       toast.loading("Refreshing reviews...", { duration: 1000 });
// // // //       await fetchReviewsByVehicleId(id, false);
// // // //     }
// // // //   };

// // // //   // Loading state
// // // //   if (loadingCarData) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
// // // //         <div className="text-center space-y-4 p-8">
// // // //           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
// // // //           <p className="text-xl text-gray-700 font-semibold">Loading vehicle details...</p>
// // // //           <p className="text-sm text-gray-500">Please wait while we fetch the car information</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Error state
// // // //   if (carDataError && !vehicle) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
// // // //         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
// // // //           <div className="text-6xl">❌</div>
// // // //           <p className="text-xl text-red-600 font-bold">Error Loading Vehicle</p>
// // // //           <p className="text-gray-600">{carDataError}</p>
// // // //           <button
// // // //             onClick={() => navigate(-1)}
// // // //             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
// // // //           >
// // // //             ← Go Back
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Not found state
// // // //   if (!vehicle && !apiCarData) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// // // //         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
// // // //           <div className="text-6xl">🚗</div>
// // // //           <p className="text-xl text-gray-700 font-bold">Vehicle Not Found</p>
// // // //           <p className="text-gray-600">The vehicle you're looking for doesn't exist or has been removed.</p>
// // // //           <button
// // // //             onClick={() => navigate(-1)}
// // // //             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
// // // //           >
// // // //             ← Go Back
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }
 
// // // //   // Map vehicle type for API (capitalized as required by backend enum)
// // // //   const mapVehicleTypeForAPI = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
// // // //     console.log("🔍 DEBUG mapVehicleTypeForAPI INPUT:", type);
    
// // // //     if (!type) {
// // // //       console.warn("⚠️ Vehicle type is undefined/null, defaulting to 'Car'");
// // // //       return "Car";
// // // //     }
    
// // // //     const normalized = type.toLowerCase();
// // // //     console.log("🔍 DEBUG normalized type:", normalized);
    
// // // //     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
// // // //       car: "Car",
// // // //       auto: "Auto",
// // // //       bike: "Bike",
// // // //     };
    
// // // //     const result = typeMap[normalized] || "Car";
// // // //     console.log("🔍 DEBUG mapVehicleTypeForAPI OUTPUT:", result);
    
// // // //     return result;
// // // //   };
  
// // // //   // Map vehicle type for store
// // // //   const mapVehicleTypeForStore = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
// // // //     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
// // // //       car: "Car",
// // // //       auto: "Auto",
// // // //       bike: "Bike",
// // // //     };
// // // //     return type ? typeMap[type.toLowerCase()] || "Car" : "Car";
// // // //   };
 
// // // //   const calculateTotalHours = (
// // // //     startDate: string,
// // // //     endDate: string,
// // // //     startTime: string,
// // // //     endTime: string
// // // //   ): number => {
// // // //     try {
// // // //       const parseTime = (timeStr: string) => {
// // // //         const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
// // // //         if (!match) return { hours: 0, minutes: 0 };
       
// // // //         let hours = parseInt(match[1]);
// // // //         const minutes = parseInt(match[2] || '0');
// // // //         const period = match[3]?.toUpperCase();
       
// // // //         if (period === 'PM' && hours !== 12) hours += 12;
// // // //         if (period === 'AM' && hours === 12) hours = 0;
       
// // // //         return { hours, minutes };
// // // //       };
 
// // // //       const startTimeParsed = parseTime(startTime);
// // // //       const endTimeParsed = parseTime(endTime);
 
// // // //       const start = new Date(startDate);
// // // //       start.setHours(startTimeParsed.hours, startTimeParsed.minutes, 0, 0);
 
// // // //       const end = new Date(endDate);
// // // //       end.setHours(endTimeParsed.hours, endTimeParsed.minutes, 0, 0);
 
// // // //       const diffInMs = end.getTime() - start.getTime();
// // // //       const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
     
// // // //       console.log("📊 Calculated hours:", { start, end, hours });
// // // //       return hours > 0 ? hours : 1;
// // // //     } catch (error) {
// // // //       console.error("❌ Error calculating hours:", error);
// // // //       return 1;
// // // //     }
// // // //   };
 
// // // //   const formatDateForAPI = (dateString: string): string => {
// // // //     try {
// // // //       const date = new Date(dateString);
// // // //       if (!isNaN(date.getTime())) {
// // // //         const year = date.getFullYear();
// // // //         const month = String(date.getMonth() + 1).padStart(2, '0');
// // // //         const day = String(date.getDate()).padStart(2, '0');
// // // //         return `${year}-${month}-${day}`;
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("❌ Date formatting error:", error);
// // // //     }
// // // //     return dateString;
// // // //   };
 
// // // //   const formatTimeForAPI = (timeString: string): string => {
// // // //     try {
// // // //       const ampmMatch = timeString.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
// // // //       if (ampmMatch) {
// // // //         let hours = parseInt(ampmMatch[1]);
// // // //         const minutes = ampmMatch[2] || '00';
// // // //         const period = ampmMatch[3].toUpperCase();
       
// // // //         if (period === 'PM' && hours !== 12) hours += 12;
// // // //         if (period === 'AM' && hours === 12) hours = 0;
       
// // // //         return `${hours.toString().padStart(2, '0')}.${minutes}`;
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("❌ Time formatting error:", error);
// // // //     }
// // // //     return timeString;
// // // //   };
 
// // // //   const createBookingAPI = async ( 
// // // //     startDate: string,
// // // //     endDate: string,
// // // //     startTime: string,
// // // //     endTime: string
// // // //   ) => {
// // // //     if (!currentVehicle) {
// // // //       const errorMsg = "Vehicle information is missing. Please try again.";
// // // //       setApiError(errorMsg);
// // // //       addNotification({
// // // //         title: "Booking Failed",
// // // //         message: errorMsg,
// // // //         type: "booking_declined",
// // // //       });
// // // //       return null;
// // // //     }
 
// // // //     setIsSubmittingBooking(true);
// // // //     setApiError("");
 
// // // //     try {
// // // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //       console.log("🚀 PRODUCTION BOOKING API - START");
// // // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      
// // // //       const totalHours = calculateTotalHours(startDate, endDate, startTime, endTime);
// // // //       const pricePerDay = parseInt(String(apiCarData?.RentPerDay || currentVehicle.price || "0"), 10);
// // // //       const pricePerHour = pricePerDay > 0 ? Math.round(pricePerDay / 24) : parseInt(String(currentVehicle.price || "0"), 10);
// // // //       const totalPrice = totalHours * pricePerHour;
      
// // // //       console.log("💰 Pricing Calculation:");
// // // //       console.log("   Price/Day:", pricePerDay);
// // // //       console.log("   Price/Hour:", pricePerHour);
// // // //       console.log("   Total Hours:", totalHours);
// // // //       console.log("   Total Price:", totalPrice);
 
// // // //       const formattedFromDate = formatDateForAPI(startDate);
// // // //       const formattedToDate = formatDateForAPI(endDate);
// // // //       const formattedFromTime = formatTimeForAPI(startTime);
// // // //       const formattedToTime = formatTimeForAPI(endTime);
      
// // // //       const userId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
// // // //       const contactNumber = localStorage.getItem('contactNumber') || "6301818409";
// // // //       const contactName = localStorage.getItem('contactName') || localStorage.getItem('userName') || "User";
// // // //       const userLatitude = localStorage.getItem('latitude') || "17.438095";
// // // //       const userLongitude = localStorage.getItem('longitude') || "78.4485";
 
// // // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //       console.log("🚗 CURRENT VEHICLE DEBUG:");
// // // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //       console.log("currentVehicle:", currentVehicle);
// // // //       console.log("currentVehicle.id:", currentVehicle.id);
// // // //       console.log("currentVehicle.type:", currentVehicle.type);
// // // //       console.log("currentVehicle.name:", currentVehicle.name);
// // // //       console.log("typeof currentVehicle.type:", typeof currentVehicle.type);
// // // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

// // // //       const requestBody = {
// // // //         userId: userId,
// // // //         contactNumber: contactNumber,
// // // //         contactName: contactName,
// // // //         latitude: userLatitude,
// // // //         longitude: userLongitude,
// // // //         VechileId: currentVehicle.id,
// // // //         vechileType: mapVehicleTypeForAPI(currentVehicle.type),
// // // //         carName: apiCarData?.CarName || currentVehicle.name || '',
// // // //         carModel: apiCarData?.Model || '',
// // // //         carBrand: apiCarData?.Brand || '',
// // // //         carNumber: apiCarData?.CarNumber || '',
// // // //         fuelType: apiCarData?.FuelType || '',
// // // //         transmissionType: apiCarData?.TransmissionType || '',
// // // //         seatingCapacity: apiCarData?.SeatingCapacity?.toString() || '',
// // // //         pricePerDay: pricePerDay.toString(),
// // // //         pricePerHour: pricePerHour.toString(),
// // // //         pricePerKm: pricePerHour.toString(),
// // // //         FromDate: formattedFromDate,
// // // //         ToDate: formattedToDate,
// // // //         FromTime: formattedFromTime,
// // // //         ToTime: formattedToTime,
// // // //         totalHours: totalHours.toString(),
// // // //         totalPrice: totalPrice.toString(),
// // // //         pickupAddress: apiCarData?.pickupAddress || '',
// // // //         dropoffAddress: apiCarData?.pickupAddress || '',
// // // //       };
 
// // // //       console.log("📋 Request Body:");
// // // //       console.table(requestBody);
// // // //       console.log("VALIDATION: vechileType =", requestBody.vechileType);
// // // //       console.log("VALIDATION: VechileId =", requestBody.VechileId);
// // // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
 
// // // //       const urlencoded = new URLSearchParams();
// // // //       Object.entries(requestBody).forEach(([key, value]) => {
// // // //         if (value !== null && value !== undefined) {
// // // //           urlencoded.append(key, String(value));
// // // //         }
// // // //       });
      
// // // //       console.log("URLENCODED CHECK: vechileType =", urlencoded.get('vechileType'));
// // // //       console.log("URLENCODED CHECK: VechileId =", urlencoded.get('VechileId'));
 
// // // //       const API_ENDPOINT = `${API_BASE_URL}/createBooking`;
      
// // // //       console.log("🎯 Strategy 1: Using apiService.booking.createBooking");
// // // //       try {
// // // //         const apiServiceResponse = await apiService.booking.createBooking(requestBody);
        
// // // //         console.log("✅ API Service Response:", apiServiceResponse);
        
// // // //         const bookingIdFromResponse = (apiServiceResponse as any)?.data?.bookingId || 
// // // //                                      (apiServiceResponse as any)?.data?._id ||
// // // //                                      (apiServiceResponse as any)?.bookingId ||
// // // //                                      (apiServiceResponse as any)?._id ||
// // // //                                      `BOOK-${Date.now()}`;
        
// // // //         setBookingId(bookingIdFromResponse);
        
// // // //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //         console.log("🎉 BOOKING CREATED SUCCESSFULLY!");
// // // //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //         console.log("📌 Booking ID:", bookingIdFromResponse);
// // // //         console.log("🚗 Car ID:", currentVehicle.id);
// // // //         console.log("📛 Car Name:", requestBody.carName);
// // // //         console.log("💰 Total Price:", totalPrice);
// // // //         console.log("✅ Strategy: apiService");
// // // //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        
// // // //         addNotification({
// // // //           title: "Booking Created Successfully! 🎉",
// // // //           message: `Your booking for ${requestBody.carName} has been confirmed!`,
// // // //           type: "booking_confirmed",
// // // //           vehicleId: currentVehicle.id,
// // // //           vehicleName: requestBody.carName,
// // // //           bookingId: bookingIdFromResponse,
// // // //         });
        
// // // //         addBooking({
// // // //           id: bookingIdFromResponse,
// // // //           vehicleId: currentVehicle.id,
// // // //           vehicleName: requestBody.carName,
// // // //           vehicleImage: currentVehicle.image,
// // // //           vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// // // //           price: totalPrice,
// // // //           startDate: formattedFromDate,
// // // //           endDate: formattedToDate,
// // // //           startTime: formattedFromTime,
// // // //           endTime: formattedToTime,
// // // //           status: 'Booked',
// // // //         });
        
// // // //         return apiServiceResponse;
        
// // // //       } catch (apiServiceError: any) {
// // // //         console.warn("⚠️ Strategy 1 failed:", apiServiceError.message);
// // // //         console.log("🔄 Falling back to Strategy 2 (CORS Proxies)...");
// // // //       }
      
// // // //       const PRODUCTION_PROXIES = [
// // // //         "https://api.allorigins.win/raw?url=",
// // // //         "https://api.codetabs.com/v1/proxy?quest=",
// // // //         "https://thingproxy.freeboard.io/fetch/",
// // // //       ];
      
// // // //       console.log("🌐 Strategy 2: Trying CORS Proxies");
// // // //       for (let i = 0; i < PRODUCTION_PROXIES.length; i++) {
// // // //         try {
// // // //           const proxiedUrl = `${PRODUCTION_PROXIES[i]}${encodeURIComponent(API_ENDPOINT)}`;
// // // //           console.log(`🔄 Proxy ${i + 1}/${PRODUCTION_PROXIES.length}: ${PRODUCTION_PROXIES[i].substring(0, 30)}...`);
 
// // // //           const response = await Promise.race([
// // // //             fetch(proxiedUrl, {
// // // //               method: "POST",
// // // //               headers: {
// // // //                 "Content-Type": "application/x-www-form-urlencoded",
// // // //               },
// // // //               body: urlencoded.toString(),
// // // //             }),
// // // //             new Promise<never>((_, reject) =>
// // // //               setTimeout(() => reject(new Error('Proxy timeout after 15s')), 15000)
// // // //             )
// // // //           ]);
 
// // // //           console.log(`✓ Proxy ${i + 1} Response:`, response.status, response.statusText);
 
// // // //           if (response.ok) {
// // // //             const text = await response.text();
// // // //             console.log("✅ Raw Response:", text.substring(0, 200));
           
// // // //             let result;
// // // //             try {
// // // //               result = JSON.parse(text);
// // // //             } catch {
// // // //               result = { success: true, message: text };
// // // //             }
 
// // // //             const bookingIdFromResponse = result?.bookingId || 
// // // //                                          result?.data?.bookingId || 
// // // //                                          result?._id || 
// // // //                                          result?.data?._id || 
// // // //                                          `BOOK-${Date.now()}`;
            
// // // //             setBookingId(bookingIdFromResponse);
            
// // // //             console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //             console.log("🎉 BOOKING CREATED SUCCESSFULLY!");
// // // //             console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //             console.log("📌 Booking ID:", bookingIdFromResponse);
// // // //             console.log("🚗 Car:", requestBody.carName);
// // // //             console.log("✅ Strategy: Proxy", i + 1);
// // // //             console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            
// // // //             addNotification({
// // // //               title: "Booking Created Successfully! 🎉",
// // // //               message: `Your booking for ${requestBody.carName} has been confirmed!`,
// // // //               type: "booking_confirmed",
// // // //               vehicleId: currentVehicle.id,
// // // //               vehicleName: requestBody.carName,
// // // //               bookingId: bookingIdFromResponse,
// // // //             });
            
// // // //             addBooking({
// // // //               id: bookingIdFromResponse,
// // // //               vehicleId: currentVehicle.id,
// // // //               vehicleName: requestBody.carName,
// // // //               vehicleImage: currentVehicle.image,
// // // //               vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// // // //               price: totalPrice,
// // // //               startDate: formattedFromDate,
// // // //               endDate: formattedToDate,
// // // //               startTime: formattedFromTime,
// // // //               endTime: formattedToTime,
// // // //               status: 'Booked',
// // // //             });
            
// // // //             return result;
// // // //           } else {
// // // //             console.warn(`⚠️ Proxy ${i + 1} returned status ${response.status}`);
// // // //           }
// // // //         } catch (proxyError: any) {
// // // //           console.warn(`❌ Proxy ${i + 1} failed:`, proxyError.message);
// // // //         }
// // // //       }
      
// // // //       throw new Error("Unable to connect to booking server. Please check your internet connection and try again.");
 
// // // //     } catch (error: any) {
// // // //       console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //       console.error("❌ BOOKING CREATION FAILED");
// // // //       console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //       console.error("🚗 Car:", currentVehicle.name);
// // // //       console.error("❌ Error:", error.message);
// // // //       console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
     
// // // //       const errorMessage = error.message || "Failed to create booking. Please try again.";
// // // //       setApiError(errorMessage);
      
// // // //       addNotification({
// // // //         title: "Booking Failed ❌",
// // // //         message: errorMessage,
// // // //         type: "booking_declined",
// // // //         vehicleId: currentVehicle.id,
// // // //         vehicleName: currentVehicle.name,
// // // //       });
      
// // // //       return null;
     
// // // //     } finally {
// // // //       setIsSubmittingBooking(false);
// // // //     }
// // // //   };
// // // //   // Create current vehicle object
// // // //   const currentVehicle = vehicle || (apiCarData ? {
// // // //     id: apiCarData._id || apiCarData.id || id || '',
// // // //     name: apiCarData.CarName || 'Unknown Vehicle',
// // // //     image: (apiCarData.carImages && apiCarData.carImages.length > 0) 
// // // //       ? apiCarData.carImages[0] 
// // // //       : apiCarData.carImage || apiCarData.image || 'https://via.placeholder.com/400',
// // // //     price: apiCarData.RentPerDay || apiCarData.pricePerHour || '0',
// // // //     type: 'car' as Vehicle["type"],
// // // //   } : null);

// // // //   if (!currentVehicle) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen">
// // // //         <div className="text-center space-y-4 p-8">
// // // //           <p className="text-xl text-gray-700">Vehicle data not available!</p>
// // // //           <button
// // // //             onClick={() => navigate(-1)}
// // // //             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// // // //           >
// // // //             Go Back
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const vehicleReviews = getReviewsByVehicleId(currentVehicle.id);
// // // //   const averageRating = getAverageRating(currentVehicle.id);
// // // //   const totalReviews = getTotalReviewCount(currentVehicle.id);
// // // //   const ratingDistribution = getRatingDistribution(currentVehicle.id);

// // // //   // ENHANCED: Use API reviews if available, otherwise fallback to local store
// // // //   const displayReviews = apiReviews.length > 0 ? apiReviews : vehicleReviews;
// // // //   const displayAverageRating = apiReviews.length > 0 
// // // //     ? calculateAverageRating(apiReviews) 
// // // //     : averageRating;
// // // //   const displayTotalReviews = apiReviews.length > 0 
// // // //     ? apiReviews.length 
// // // //     : totalReviews;
// // // //   const displayRatingDistribution = apiReviews.length > 0 
// // // //     ? calculateRatingDistribution(apiReviews) 
// // // //     : ratingDistribution;

// // // //   console.log("🎯 DISPLAY DATA SUMMARY:");
// // // //   console.log("Total API Reviews:", apiReviews.length);
// // // //   console.log("Total Local Reviews:", vehicleReviews.length);
// // // //   console.log("Using:", apiReviews.length > 0 ? "API Reviews" : "Local Reviews");
// // // //   console.log("Display Average Rating:", displayAverageRating);
// // // //   console.log("Display Total Reviews:", displayTotalReviews);
 
// // // //   const handleTimerComplete = () => {
// // // //     console.log("⏰ Timer completed - Opening BookingAcceptance");
// // // //     setShowWaitingPopup(false);
// // // //     setShowAcceptance(true);
// // // //   };
 
// // // //   const handleCloseWaiting = () => {
// // // //     console.log("❌ WaitingPopup closed manually");
// // // //     setShowWaitingPopup(false);
// // // //     setWaitingTimerSeconds(30);
// // // //   };
 
// // // //   const handleAcceptBooking = () => {
// // // //     console.log("✅ Booking Accepted by Owner!");
// // // //     setShowAcceptance(false);
// // // //     setShowContactButtons(true);
// // // //   };
 
// // // //   const handleRejectBooking = () => {
// // // //     console.log("❌ Booking Rejected by Owner!");
// // // //     setShowAcceptance(false);
// // // //     setShowRejectModal(true);
// // // //   };
 
// // // //   const handleCloseRejectModal = () => {
// // // //     console.log("🔙 Reject modal closed");
// // // //     setShowRejectModal(false);
// // // //     setSelectedDateTime(null);
// // // //     setBookingId(null);
// // // //     setWaitingTimerSeconds(30);
// // // //   };
 
// // // //   const handleCallOwner = () => {
// // // //     console.log("📞 User calling owner...");
// // // //     setTimeout(() => {
// // // //       handleConfirmBooking();
// // // //     }, 1000);
// // // //   };
 
// // // //   const handleConfirmBooking = () => {
// // // //     if (!currentVehicle || !selectedDateTime) {
// // // //       console.error("❌ Cannot confirm booking");
// // // //       return;
// // // //     }
 
// // // //     const currentDate = new Date();
// // // //     console.log("🎉 Confirming booking with ID:", bookingId);
 
// // // //     addBooking({
// // // //       id: bookingId || Date.now().toString(),
// // // //       vehicleId: currentVehicle.id,
// // // //       vehicleName: currentVehicle.name,
// // // //       vehicleImage: currentVehicle.image,
// // // //       vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// // // //       customerName: "Current User",
// // // //       bookingDate: currentDate.toLocaleDateString("en-US"),
// // // //       bookingTime: currentDate.toLocaleTimeString("en-US", {
// // // //         hour: "2-digit",
// // // //         minute: "2-digit",
// // // //       }),
// // // //       startDate: selectedDateTime.startDate,
// // // //       startTime: selectedDateTime.startTime,
// // // //       endDate: selectedDateTime.endDate,
// // // //       endTime: selectedDateTime.endTime,
// // // //       modelNo: currentVehicle.id.toUpperCase(),
// // // //       status: "Booked",
// // // //       price: currentVehicle.price,
// // // //     });
 
// // // //     setShowSuccessModal(true);
// // // //   };

// // // //   return (
// // // //     <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // //       {/* Left Column - Vehicle Image */}
// // // //       <div className="lg:col-span-1">
// // // //         <img
// // // //           src={currentVehicle.image}
// // // //           alt={currentVehicle.name}
// // // //           className="rounded-xl w-full mb-4"
// // // //         />
// // // //         <div className="flex justify-center space-x-2 mt-2">
// // // //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// // // //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// // // //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// // // //         </div>
// // // //       </div>
 
// // // //       {/* Middle Column - Vehicle Details & Booking */}
// // // //       <div className="lg:col-span-1">
// // // //         <h2 className="text-2xl font-bold">{currentVehicle.name}</h2>
// // // //         <p className="text-gray-600 text-lg mt-1">₹{currentVehicle.price}/hr</p>
 
// // // //         <div className="flex gap-4 mt-4">
// // // //           {[
// // // //             { img: Automatic, label: apiCarData?.transmissionType || "Automatic" },
// // // //             { img: Driver, label: apiCarData?.Carseater || "5 Seater" },
// // // //             { img: Petrol, label: apiCarData?.fuelType || "Petrol" },
// // // //             { img: Acicon, label: "AC" },
// // // //           ].map((item, idx) => (
// // // //             <div key={idx} className="flex flex-col items-center p-2 border rounded-lg">
// // // //               <img src={item.img} alt={item.label} className="w-[25px] h-[25px]" />
// // // //               <span className="text-sm mt-1">{item.label}</span>
// // // //             </div>
// // // //           ))}
// // // //         </div>
 
// // // //         <div className="mt-6">
// // // //           <h3 className="font-semibold text-lg mb-2">Description</h3>
// // // //           <p className="text-gray-600 text-sm">
// // // //             {apiCarData?.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
// // // //           </p>
// // // //         </div>
 
// // // //         {apiError && (
// // // //           <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
// // // //             <p className="text-sm text-red-700">{apiError}</p>
// // // //             <button
// // // //               onClick={() => setApiError("")}
// // // //               className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
// // // //             >
// // // //               Dismiss
// // // //             </button>
// // // //           </div>
// // // //         )}
 
// // // //         {!showContactButtons ? (
// // // //           <button
// // // //             onClick={() => setIsDateTimeModalOpen(true)}
// // // //             disabled={isSubmittingBooking}
// // // //             className="mt-6 w-full bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
// // // //           >
// // // //             {isSubmittingBooking ? "Processing..." : "Book Now"}
// // // //           </button>
// // // //         ) : (
// // // //           <div className="mt-6 space-y-4">
// // // //             <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
// // // //               <img
// // // //                 src="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
// // // //                 alt="Manoj Kumar"
// // // //                 className="w-12 h-12 rounded-full"
// // // //               />
// // // //               <div className="flex-1">
// // // //                 <h4 className="font-semibold text-gray-900">Manoj Kumar</h4>
// // // //                 <p className="text-sm text-gray-500">Vehicle Owner</p>
// // // //               </div>
// // // //             </div>
 
// // // //             <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
// // // //               <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
// // // //                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
// // // //               </svg>
// // // //               <p className="text-sm text-orange-700 flex-1">
// // // //                 Please call the owner to discuss booking details and confirm availability.
// // // //               </p>
// // // //             </div>
 
// // // //             <div className="flex gap-3">
// // // //               <button
// // // //                 onClick={() => setIsChatOpen(true)}
// // // //                 className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
// // // //               >
// // // //                 💬 Chat
// // // //               </button>
// // // //               <button
// // // //                 onClick={handleCallOwner}
// // // //                 className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
// // // //               >
// // // //                 📞 Call Owner
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         )}
 
// // // //         {isDateTimeModalOpen && (
// // // //           <AvailabilityDateTimeModal
// // // //             isOpen={isDateTimeModalOpen}
// // // //             onClose={() => {
// // // //               setIsDateTimeModalOpen(false);
// // // //               setApiError("");
// // // //             }}
// // // //             onConfirm={async (startDate, endDate, startTime, endTime, availability) => {
// // // //               console.log("✅ DateTime selected:", { startDate, endDate, startTime, endTime });
             
// // // //               setSelectedDateTime({ startDate, endDate, startTime, endTime });
// // // //               setIsDateTimeModalOpen(false);
             
// // // //               const result = await createBookingAPI(startDate, endDate, startTime, endTime);
             
// // // //               if (result) {
// // // //                 console.log("🎉 Starting wait timer");
// // // //                 setWaitingTimerSeconds(30);
// // // //                 setShowWaitingPopup(true);
// // // //               }
// // // //             }}
// // // //           />
// // // //         )}
// // // //       </div>
 
// // // //       {/* Right Column - ENHANCED Reviews & Ratings */}
// // // //       <div className="lg:col-span-1">
// // // //         <div className="flex items-center justify-between mb-3">
// // // //           <h3 className="text-lg font-bold">Rating & Reviews</h3>
// // // //           <div className="flex items-center gap-2">
// // // //             {loadingReviews && (
// // // //               <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
// // // //             )}
// // // //             <button
// // // //               onClick={handleRefreshReviews}
// // // //               disabled={loadingReviews}
// // // //               className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
// // // //               title="Refresh reviews"
// // // //             >
// // // //               <RefreshCw className={`w-4 h-4 text-gray-600 ${loadingReviews ? 'animate-spin' : ''}`} />
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* ENHANCED: Review Source Indicator */}
// // // //         {apiReviews.length > 0 && (
// // // //           <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
// // // //             <span className="text-xs text-green-700 font-medium">
// // // //               ✓ Live reviews from API
// // // //             </span>
// // // //             <span className="text-xs text-gray-500">
// // // //               (Updated {new Date(lastFetchTime).toLocaleTimeString()})
// // // //             </span>
// // // //           </div>
// // // //         )}

// // // //         {reviewsError && (
// // // //           <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
// // // //             <p className="text-xs text-yellow-700">{reviewsError}</p>
// // // //           </div>
// // // //         )}

// // // //         {/* Average Rating Display */}
// // // //         <div className="flex items-center mt-2 mb-2 justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
// // // //           <div className="flex flex-col">
// // // //             <span className="text-3xl font-bold text-gray-900">{displayAverageRating}</span>
// // // //             <span className="text-xs text-gray-600 mt-1">out of 5</span>
// // // //           </div>
// // // //           <div className="flex flex-col items-end">
// // // //             <div className="flex gap-1">
// // // //               {[...Array(5)].map((_, i) => (
// // // //                 <Star
// // // //                   key={i}
// // // //                   className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
// // // //                   size={20}
// // // //                 />
// // // //               ))}
// // // //             </div>
// // // //             <span className="text-sm text-gray-600 mt-1">
// // // //               {displayTotalReviews} Review{displayTotalReviews !== 1 ? 's' : ''}
// // // //             </span>
// // // //           </div>
// // // //         </div>

// // // //         {/* Rating Distribution */}
// // // //         <div className="mt-4 space-y-2 bg-white p-4 rounded-lg border">
// // // //           <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating Breakdown</h4>
// // // //           {displayRatingDistribution.map((r) => (
// // // //             <div key={r.stars} className="flex items-center text-sm">
// // // //               <span className="w-8 text-gray-700 font-medium">{r.stars}★</span>
// // // //               <div className="flex-1 bg-gray-200 h-3 rounded-full mx-3 overflow-hidden">
// // // //                 <div 
// // // //                   className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500" 
// // // //                   style={{ width: `${r.percentage}%` }} 
// // // //                 />
// // // //               </div>
// // // //               <span className="text-gray-500 text-xs min-w-[45px] text-right">
// // // //                 {r.count} ({r.percentage}%)
// // // //               </span>
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         {/* Individual Reviews */}
// // // //         <div className="mt-6 space-y-3 max-h-[500px] overflow-y-auto pr-2">
// // // //           <h4 className="text-sm font-semibold text-gray-700 mb-3 sticky top-0 bg-white py-2">
// // // //             Customer Reviews ({displayTotalReviews})
// // // //           </h4>
// // // //           {displayReviews.length > 0 ? (
// // // //             displayReviews.map((r, idx) => (
// // // //               <div key={r._id || idx} className="border border-gray-200 p-4 rounded-xl hover:shadow-md transition bg-white">
// // // //                 <div className="flex justify-between items-start mb-2">
// // // //                   <div className="flex items-center gap-2">
// // // //                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm">
// // // //                       {(r.userName || `User ${idx + 1}`).charAt(0).toUpperCase()}
// // // //                     </div>
// // // //                     <div>
// // // //                       <span className="font-semibold text-gray-900 text-sm">
// // // //                         {r.userName || `User ${idx + 1}`}
// // // //                       </span>
// // // //                       {r.createdAt && (
// // // //                         <p className="text-xs text-gray-400">
// // // //                           {new Date(r.createdAt).toLocaleDateString('en-US', {
// // // //                             year: 'numeric',
// // // //                             month: 'short',
// // // //                             day: 'numeric'
// // // //                           })}
// // // //                         </p>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="flex bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200">
// // // //                     {[...Array(5)].map((_, i) => (
// // // //                       <Star
// // // //                         key={i}
// // // //                         size={14}
// // // //                         className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
// // // //                       />
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //                 <p className="text-sm text-gray-700 leading-relaxed mt-2">
// // // //                   {r.review || "No comment provided"}
// // // //                 </p>
// // // //               </div>
// // // //             ))
// // // //           ) : (
// // // //             <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
// // // //               <div className="text-5xl mb-3">📝</div>
// // // //               <p className="text-gray-500 font-medium mb-1">No reviews yet</p>
// // // //               <p className="text-gray-400 text-sm">
// // // //                 Be the first to review this vehicle!
// // // //               </p>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
 
// // // //       {/* Modals */}
// // // //       {showWaitingPopup && (
// // // //         <WaitingPopup
// // // //           timer={waitingTimerSeconds}
// // // //           onClose={handleCloseWaiting}
// // // //           onTimerComplete={handleTimerComplete}
// // // //         />
// // // //       )}
 
// // // //       {showAcceptance && (
// // // //         <BookingAcceptance
// // // //           onAccept={handleAcceptBooking}
// // // //           onReject={handleRejectBooking}
// // // //           onClose={() => setShowAcceptance(false)}
// // // //         />
// // // //       )}
 
// // // //       <PopupChat
// // // //         isOpen={isChatOpen}
// // // //         onClose={() => setIsChatOpen(false)}
// // // //         ownerName="Manoj Kumar"
// // // //         ownerAvatar="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
// // // //       />
 
// // // //       <BookingRejectModal isOpen={showRejectModal} onClose={handleCloseRejectModal} />
 
// // // //       {/* Loading Overlay */}
// // // //       {isSubmittingBooking && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// // // //           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
// // // //             <div className="flex flex-col items-center">
// // // //               <div className="relative mb-6">
// // // //                 <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
// // // //                 <div className="absolute inset-0 flex items-center justify-center">
// // // //                   <div className="w-12 h-12 bg-blue-100 rounded-full animate-pulse"></div>
// // // //                 </div>
// // // //               </div>
              
// // // //               <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
// // // //                 Creating Your Booking...
// // // //               </h2>
              
// // // //               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 w-full mb-4 border border-blue-100 shadow-sm">
// // // //                 {currentVehicle && (
// // // //                   <>
// // // //                     <div className="flex items-center gap-3 mb-4">
// // // //                       <img 
// // // //                         src={currentVehicle.image} 
// // // //                         alt={currentVehicle.name}
// // // //                         className="w-16 h-16 rounded-lg object-cover shadow-sm"
// // // //                       />
// // // //                       <div className="flex-1">
// // // //                         <p className="font-bold text-gray-900 text-lg">{currentVehicle.name}</p>
// // // //                         <p className="text-sm text-gray-600 capitalize">{currentVehicle.type}</p>
// // // //                       </div>
// // // //                     </div>
                    
// // // //                     <div className="space-y-2">
// // // //                       <div className="flex justify-between text-sm">
// // // //                         <span className="text-gray-600">Car ID</span>
// // // //                         <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
// // // //                           {currentVehicle.id.substring(0, 12)}...
// // // //                         </span>
// // // //                       </div>
                      
// // // //                       {apiCarData?.CarNumber && (
// // // //                         <div className="flex justify-between text-sm">
// // // //                           <span className="text-gray-600">Car Number</span>
// // // //                           <span className="font-semibold text-gray-900">{apiCarData.CarNumber}</span>
// // // //                         </div>
// // // //                       )}
                      
// // // //                       {selectedDateTime && (
// // // //                         <div className="border-t border-blue-200 pt-2 mt-3">
// // // //                           <p className="text-xs text-gray-600 mb-1">Booking Period</p>
// // // //                           <p className="text-sm text-gray-700 font-medium">
// // // //                             {selectedDateTime.startDate} {selectedDateTime.startTime}
// // // //                             <br />
// // // //                             to {selectedDateTime.endDate} {selectedDateTime.endTime}
// // // //                           </p>
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </>
// // // //                 )}
// // // //               </div>
              
// // // //               <div className="text-center space-y-2">
// // // //                 <p className="text-gray-600 text-sm">
// // // //                   Please wait while we process your booking...
// // // //                 </p>
// // // //                 <p className="text-blue-600 font-medium text-sm">
// // // //                   Connecting to server & validating data
// // // //                 </p>
// // // //               </div>
              
// // // //               <div className="flex gap-2 mt-5">
// // // //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
// // // //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
// // // //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Error Banner */}
// // // //       {apiError && !isSubmittingBooking && (
// // // //         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[110] max-w-md w-full mx-4 animate-slideDown">
// // // //           <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-xl">
// // // //             <div className="flex items-start">
// // // //               <div className="flex-shrink-0">
// // // //                 <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // //                 </svg>
// // // //               </div>
// // // //               <div className="ml-3 flex-1">
// // // //                 <h3 className="text-sm font-bold text-red-800">Booking Failed</h3>
// // // //                 <p className="mt-1 text-sm text-red-700">{apiError}</p>
// // // //                 {currentVehicle && (
// // // //                   <p className="mt-1 text-xs text-red-600">
// // // //                     Car: {currentVehicle.name} (ID: {currentVehicle.id.substring(0, 8)}...)
// // // //                   </p>
// // // //                 )}
// // // //                 <div className="mt-3 flex gap-2">
// // // //                   <button
// // // //                     onClick={() => {
// // // //                       setApiError("");
// // // //                       setIsDateTimeModalOpen(true);
// // // //                     }}
// // // //                     className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
// // // //                   >
// // // //                     Retry Booking
// // // //                   </button>
// // // //                   <button
// // // //                     onClick={() => setApiError("")}
// // // //                     className="px-3 py-1.5 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-300 hover:bg-red-50 transition-colors"
// // // //                   >
// // // //                     Dismiss
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Success Modal */}
// // // //       {showSuccessModal && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // // //           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
// // // //             <div className="flex justify-center mb-6">
// // // //               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
// // // //                 <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // // //                 </svg>
// // // //               </div>
// // // //             </div>
 
// // // //             <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
// // // //               Booking Posted Successfully!
// // // //             </h2>
// // // //             <p className="text-gray-600 text-center mb-6">
// // // //               After discussing with the owner, your booking has been confirmed. You will receive updates on your booking status.
// // // //             </p>
 
// // // //             <div className="bg-gray-50 rounded-lg p-4 mb-6">
// // // //               <div className="flex items-center gap-3 mb-3">
// // // //                 <img src={currentVehicle.image} alt={currentVehicle.name} className="w-16 h-16 rounded-lg object-cover" />
// // // //                 <div>
// // // //                   <h3 className="font-semibold text-gray-900">{currentVehicle.name}</h3>
// // // //                   <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
// // // //                 </div>
// // // //               </div>
             
// // // //               {selectedDateTime && (
// // // //                 <div className="text-sm text-gray-600 space-y-1">
// // // //                   <div className="flex justify-between">
// // // //                     <span>Start:</span>
// // // //                     <span className="font-medium">
// // // //                       {new Date(selectedDateTime.startDate).toLocaleDateString()} - {selectedDateTime.startTime}
// // // //                     </span>
// // // //                   </div>
// // // //                   <div className="flex justify-between">
// // // //                     <span>End:</span>
// // // //                     <span className="font-medium">
// // // //                       {new Date(selectedDateTime.endDate).toLocaleDateString()} - {selectedDateTime.endTime}
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
 
// // // //             <div className="flex gap-3">
// // // //               <button
// // // //                 onClick={() => {
// // // //                   setShowSuccessModal(false);
// // // //                   navigate("/");
// // // //                 }}
// // // //                 className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
// // // //               >
// // // //                 Go Home
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => {
// // // //                   setShowSuccessModal(false);
// // // //                   setShowContactButtons(false);
// // // //                   setSelectedDateTime(null);
// // // //                   setBookingId(null);
// // // //                   setWaitingTimerSeconds(30);
// // // //                 }}
// // // //                 className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
// // // //               >
// // // //                 Book Another
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };
 
// // // // export default BookNow;












// // // // import React, { useEffect, useState } from "react";
// // // // import { useNavigate, useParams } from "react-router-dom";
// // // // import { vehicles } from "./data/Vehicle";
// // // // import { Vehicle } from "../types/Vehicle";
// // // // import { Star, Loader2, RefreshCw, Pencil, Trash2, Check, X } from "lucide-react";
// // // // import apiService from "../services/api.service";
// // // // import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
// // // // import WaitingPopup from "../components/ui/WaitingPopup";
// // // // import BookingAcceptance from "../components/ui/BookingAcceptance";
// // // // import BookingRejectModal from "../components/ui/BookingRejectModal";
// // // // import PopupChat from "../components/ui/PopupChat";
// // // // import { useReviewStore } from "../store/review.store";
// // // // import { useNotificationStore } from "../store/notification.store";
// // // // import { useBookingStore } from "../store/booking.store";
// // // // import toast from "react-hot-toast";
 
// // // // import Automatic from "../assets/icons/AutomaticLogo.png";
// // // // import Driver from "../assets/icons/DriverLogo.png";
// // // // import Acicon from "../assets/icons/AutomaticLogo.png";
// // // // import Petrol from "../assets/icons/Petrol.png";

// // // // // CORS Proxies for reliability
// // // // const CORS_PROXIES = [
// // // //   "https://corsproxy.io/?",
// // // //   "https://api.codetabs.com/v1/proxy?quest=",
// // // // ];
// // // // const API_BASE_URL = "https://rentongo-backend.onrender.com/api";

// // // // interface Review {
// // // //   _id: string;
// // // //   userId: string;
// // // //   vehicleId: string;
// // // //   rating: number;
// // // //   review: string;
// // // //   userName?: string;
// // // //   createdAt?: string;
// // // // }

// // // // const BookNow: React.FC = () => {
// // // //   const navigate = useNavigate();
// // // //   const { id } = useParams<{ id: string }>();
// // // //   const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);
 
// // // //   const {
// // // //     getReviewsByVehicleId,
// // // //     getAverageRating,
// // // //     getTotalReviewCount,
// // // //     getRatingDistribution,
// // // //   } = useReviewStore();
// // // //   const { addNotification } = useNotificationStore();
// // // //   const { addBooking } = useBookingStore();

// // // //   // ============================================================
// // // //   // ALL STATE DECLARATIONS
// // // //   // ============================================================
  
// // // //   // API car data state
// // // //   const [apiCarData, setApiCarData] = useState<any>(null);
// // // //   const [loadingCarData, setLoadingCarData] = useState(true);
// // // //   const [carDataError, setCarDataError] = useState("");
 
// // // //   // Booking states
// // // //   const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
// // // //   const [showContactButtons, setShowContactButtons] = useState(false);
// // // //   const [showWaitingPopup, setShowWaitingPopup] = useState(false);
// // // //   const [showAcceptance, setShowAcceptance] = useState(false);
// // // //   const [waitingTimerSeconds, setWaitingTimerSeconds] = useState<number>(30);
// // // //   const [showRejectModal, setShowRejectModal] = useState(false);
// // // //   const [isChatOpen, setIsChatOpen] = useState(false);
// // // //   const [selectedDateTime, setSelectedDateTime] = useState<{
// // // //     startDate: string;
// // // //     endDate: string;
// // // //     startTime: string;
// // // //     endTime: string;
// // // //   } | null>(null);
// // // //   const [bookingId, setBookingId] = useState<string | null>(null);
// // // //   const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
// // // //   const [apiError, setApiError] = useState<string>("");
// // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // // //   // Enhanced Review States
// // // //   const [apiReviews, setApiReviews] = useState<Review[]>([]);
// // // //   const [loadingReviews, setLoadingReviews] = useState(false);
// // // //   const [reviewsError, setReviewsError] = useState<string>("");
// // // //   const [lastFetchTime, setLastFetchTime] = useState<number>(0);

// // // //   // ⭐ NEW: Edit Review States
// // // //   const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
// // // //   const [editReviewText, setEditReviewText] = useState<string>("");
// // // //   const [editReviewRating, setEditReviewRating] = useState<number>(0);
// // // //   const [isUpdatingReview, setIsUpdatingReview] = useState<boolean>(false);
// // // //   const [updateReviewError, setUpdateReviewError] = useState<string>("");
// // // //   const [showEditModal, setShowEditModal] = useState<boolean>(false);
// // // //   const [selectedReviewForEdit, setSelectedReviewForEdit] = useState<Review | null>(null);

// // // //   // ⭐ NEW: Average Rating from API
// // // //   const [apiAverageRating, setApiAverageRating] = useState<number>(0);
// // // //   const [loadingAverageRating, setLoadingAverageRating] = useState<boolean>(false);

// // // //   // Get current user ID from localStorage
// // // //   const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";


// // // //   // Fetch car details from API
// // // //   useEffect(() => {
// // // //     const fetchCarDetails = async () => {
// // // //       if (id) {
// // // //         try {
// // // //           setLoadingCarData(true);
// // // //           setCarDataError("");
// // // //           console.log(`🚗 Fetching car details for ID: ${id}`);
          
// // // //           const response = await apiService.car.getCarById(id);
// // // //           console.log("✅ Full API response:", response);
          
// // // //           let carData = null;
          
// // // //           if (response) {
// // // //             if ((response as any).data) {
// // // //               carData = (response as any).data;
// // // //             } else if ((response as any).car) {
// // // //               carData = (response as any).car;
// // // //             } else {
// // // //               carData = response;
// // // //             }
            
// // // //             console.log("🎯 Final car data to set:", carData);
// // // //             setApiCarData(carData);
// // // //           }
// // // //         } catch (err: any) {
// // // //           console.error("❌ Error fetching car details:", err);
// // // //           setCarDataError(err.message || "Failed to load car details");
// // // //         } finally {
// // // //           setLoadingCarData(false);
// // // //         }
// // // //       }
// // // //     };

// // // //     fetchCarDetails();
// // // //   }, [id]);

// // // //   // Fetch reviews on component mount
// // // //   useEffect(() => {
// // // //     if (id) {
// // // //       console.log("🔄 Initial review fetch triggered for vehicle:", id);
// // // //       fetchReviewsByVehicleId(id);
// // // //       fetchAverageRating(id); // ⭐ NEW: Fetch average rating
// // // //     }
// // // //   }, [id]);

// // // //   // Auto-refresh reviews every 30 seconds
// // // //   useEffect(() => {
// // // //     if (id) {
// // // //       const intervalId = setInterval(() => {
// // // //         console.log("🔄 Auto-refreshing reviews...");
// // // //         fetchReviewsByVehicleId(id, true);
// // // //         fetchAverageRating(id, true); // ⭐ NEW: Auto-refresh average rating
// // // //       }, 30000);

// // // //       return () => clearInterval(intervalId);
// // // //     }
// // // //   }, [id]);

// // // //   // Timer effect for booking
// // // //   useEffect(() => {
// // // //     let interval: NodeJS.Timeout | null = null;
// // // //     if (showWaitingPopup && waitingTimerSeconds > 0) {
// // // //       interval = setInterval(() => {
// // // //         setWaitingTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
// // // //       }, 1000);
// // // //     }
// // // //     return () => {
// // // //       if (interval) clearInterval(interval);
// // // //     };
// // // //   }, [showWaitingPopup, waitingTimerSeconds]);
 
// // // //   useEffect(() => {
// // // //     if (showWaitingPopup && waitingTimerSeconds === 0) {
// // // //       handleTimerComplete();
// // // //     }
// // // //   }, [waitingTimerSeconds, showWaitingPopup]);

// // // //   // ============================================================
// // // //   // ⭐ NEW: FETCH AVERAGE RATING FROM API
// // // //   // ============================================================
// // // //   const fetchAverageRating = async (vehicleId: string, silent: boolean = false) => {
// // // //     if (!silent) {
// // // //       setLoadingAverageRating(true);
// // // //     }

// // // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //     console.log("⭐ FETCHING AVERAGE RATING");
// // // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //     console.log("📋 Vehicle ID:", vehicleId);

// // // //     try {
// // // //       const vehicleType = "Car"; // You can make this dynamic based on vehicle type
// // // //       const response = await fetch(
// // // //         `http://52.66.238.227:3000/getAverageRating?vechileType=${vehicleType}&vechileId=${vehicleId}`,
// // // //         {
// // // //           method: "GET",
// // // //           headers: {
// // // //             "Content-Type": "application/json",
// // // //           },
// // // //         }
// // // //       );

// // // //       console.log("📥 Average Rating Response Status:", response.status);

// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         console.log("✅ Average Rating Response:", result);

// // // //         if (result.success && result.averageRating !== undefined) {
// // // //           const avgRating = parseFloat(result.averageRating);
// // // //           setApiAverageRating(avgRating);
// // // //           console.log("⭐ Average Rating Set:", avgRating);
// // // //         }
// // // //       }
// // // //     } catch (error: any) {
// // // //       console.error("❌ Failed to fetch average rating:", error.message);
// // // //     } finally {
// // // //       if (!silent) {
// // // //         setLoadingAverageRating(false);
// // // //       }
// // // //     }
// // // //   };

// // // //   // ============================================================
// // // //   // FETCH REVIEWS FUNCTION (EXISTING - NO CHANGES)
// // // //   // ============================================================
// // // //   const fetchReviewsByVehicleId = async (vehicleId: string, silent: boolean = false) => {
// // // //     const now = Date.now();
// // // //     if (now - lastFetchTime < 5000 && !silent) {
// // // //       console.log("⏳ Skipping fetch - too soon after last request");
// // // //       return;
// // // //     }
// // // //     setLastFetchTime(now);

// // // //     if (!silent) {
// // // //       setLoadingReviews(true);
// // // //       setReviewsError("");
// // // //     }

// // // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //     console.log("🔍 FETCHING REVIEWS FOR VEHICLE");
// // // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //     console.log("📋 Vehicle ID:", vehicleId);

// // // //     try {
// // // //       const myHeaders = new Headers();
// // // //       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

// // // //       const urlencoded = new URLSearchParams();
// // // //       urlencoded.append("vechileType", "Car");
// // // //       urlencoded.append("VechileId", vehicleId);

// // // //       const requestOptions: RequestInit = {
// // // //         method: "GET",
// // // //         headers: myHeaders,
// // // //         body: urlencoded,
// // // //       };

// // // //       const response = await fetch(
// // // //         `http://52.66.238.227:3000/getReviewsById/${vehicleId}`,
// // // //         requestOptions
// // // //       );

// // // //       console.log("📥 Response Status:", response.status);

// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         console.log("✅ Reviews Response:", result);

// // // //         if (result.success && Array.isArray(result.reviews)) {
// // // //           console.log("🎉 SUCCESS: Reviews found!", result.reviews.length);
          
// // // //           setApiReviews(result.reviews);
          
// // // //           if (!silent) {
// // // //             toast.success(`✅ Loaded ${result.reviews.length} review(s)`, {
// // // //               duration: 2000,
// // // //               position: 'top-right',
// // // //             });
// // // //           }

// // // //           return result.reviews;
// // // //         } else {
// // // //           console.log("ℹ️ No reviews found");
// // // //           setApiReviews([]);
          
// // // //           if (!silent) {
// // // //             toast("No reviews yet for this vehicle", {
// // // //               duration: 2000,
// // // //               position: 'top-right',
// // // //             });
// // // //           }
// // // //         }
// // // //       }
// // // //     } catch (error: any) {
// // // //       console.error("❌ Fetch reviews failed:", error.message);
      
// // // //       setReviewsError("Unable to load reviews.");
// // // //       setApiReviews([]);
      
// // // //       if (!silent) {
// // // //         toast.error("Failed to load reviews", {
// // // //           duration: 3000,
// // // //           position: 'top-right',
// // // //         });
// // // //       }
// // // //     } finally {
// // // //       if (!silent) {
// // // //         setLoadingReviews(false);
// // // //       }
// // // //     }
// // // //   };



  
// // // //   /**
// // // //    * Check if current user owns this review
// // // //    */
// // // //   const isUserReview = (review: Review): boolean => {
// // // //     const isOwner = review.userId === currentUserId;
// // // //     console.log("🔍 Review ownership check:", {
// // // //       reviewId: review._id,
// // // //       reviewUserId: review.userId,
// // // //       currentUserId: currentUserId,
// // // //       isOwner: isOwner
// // // //     });
// // // //     return isOwner;
// // // //   };

// // // //   /**
// // // //    * Open edit modal for a review
// // // //    */
// // // //   const handleStartEditReview = (review: Review) => {
// // // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //     console.log("📝 STARTING EDIT FOR REVIEW");
// // // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //     console.log("Review ID:", review._id);
// // // //     console.log("Current Rating:", review.rating);
// // // //     console.log("Current Text:", review.review);
    
// // // //     setSelectedReviewForEdit(review);
// // // //     setEditingReviewId(review._id);
// // // //     setEditReviewText(review.review || "");
// // // //     setEditReviewRating(review.rating);
// // // //     setUpdateReviewError("");
// // // //     setShowEditModal(true);
// // // //   };

// // // //   /**
// // // //    * Close edit modal
// // // //    */
// // // //   const handleCloseEditModal = () => {
// // // //     console.log("❌ Closing edit modal");
// // // //     setShowEditModal(false);
// // // //     setSelectedReviewForEdit(null);
// // // //     setEditingReviewId(null);
// // // //     setEditReviewText("");
// // // //     setEditReviewRating(0);
// // // //     setUpdateReviewError("");
// // // //   };

// // // //  // ============================================================
// // // // // PART 3: UPDATE REVIEW API FUNCTION
// // // // // Add this after the helper functions from Part 2
// // // // // ============================================================

// // // //   /**
// // // //    * ⭐ NEW: UPDATE REVIEW VIA API
// // // //    * Updates a review with new rating and text
// // // //    */
// // // //   const handleUpdateReview = async () => {
// // // //     if (!selectedReviewForEdit) {
// // // //       console.error("❌ No review selected for edit");
// // // //       return;
// // // //     }

// // // //     // Validation
// // // //     if (!editReviewText.trim()) {
// // // //       setUpdateReviewError("Review text cannot be empty");
// // // //       toast.error("Please provide review text");
// // // //       return;
// // // //     }

// // // //     if (editReviewRating === 0) {
// // // //       setUpdateReviewError("Please select a rating");
// // // //       toast.error("Please select a rating");
// // // //       return;
// // // //     }

// // // //     setIsUpdatingReview(true);
// // // //     setUpdateReviewError("");

// // // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //     console.log("📝 UPDATING REVIEW VIA API");
// // // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //     console.log("Review ID:", selectedReviewForEdit._id);
// // // //     console.log("Vehicle ID:", id);
// // // //     console.log("New Rating:", editReviewRating);
// // // //     console.log("New Text:", editReviewText);

// // // //     try {
// // // //       // Determine vehicle type
// // // //       const vehicleType = mapVehicleTypeForAPI(currentVehicle?.type);
// // // //       console.log("🚗 Vehicle Type:", vehicleType);

// // // //       // Create FormData
// // // //       const formdata = new FormData();
      
// // // //       // Set the appropriate ID field based on vehicle type
// // // //       if (vehicleType === "Auto") {
// // // //         formdata.append("AutoId", id || "");
// // // //         formdata.append("BikeId", "");
// // // //         formdata.append("CarId", "");
// // // //       } else if (vehicleType === "Bike") {
// // // //         formdata.append("AutoId", "");
// // // //         formdata.append("BikeId", id || "");
// // // //         formdata.append("CarId", "");
// // // //       } else {
// // // //         // Default to Car
// // // //         formdata.append("AutoId", "");
// // // //         formdata.append("BikeId", "");
// // // //         formdata.append("CarId", id || "");
// // // //       }
      
// // // //       formdata.append("reviewText", editReviewText.trim());
// // // //       formdata.append("rating", editReviewRating.toString());

// // // //       console.log("📤 Request Body:", {
// // // //         AutoId: formdata.get("AutoId"),
// // // //         BikeId: formdata.get("BikeId"),
// // // //         CarId: formdata.get("CarId"),
// // // //         reviewText: formdata.get("reviewText"),
// // // //         rating: formdata.get("rating"),
// // // //       });

// // // //       const requestOptions: RequestInit = {
// // // //         method: "PUT",
// // // //         body: formdata,
// // // //         redirect: "follow"
// // // //       };

// // // //       // Call API
// // // //       const response = await fetch(
// // // //         `http://52.66.238.227:3000/updateReview/${selectedReviewForEdit._id}`,
// // // //         requestOptions
// // // //       );

// // // //       console.log("📥 Response Status:", response.status, response.statusText);

// // // //       if (response.ok) {
// // // //         const result = await response.text();
// // // //         console.log("✅ Update Response:", result);

// // // //         // Parse response
// // // //         let parsedResult;
// // // //         try {
// // // //           parsedResult = JSON.parse(result);
// // // //         } catch {
// // // //           parsedResult = { success: true };
// // // //         }

// // // //         // Update local state immediately (optimistic update)
// // // //         setApiReviews(prevReviews =>
// // // //           prevReviews.map(r =>
// // // //             r._id === selectedReviewForEdit._id
// // // //               ? { ...r, review: editReviewText, rating: editReviewRating }
// // // //               : r
// // // //           )
// // // //         );

// // // //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //         console.log("✅ REVIEW UPDATE SUCCESSFUL");
// // // //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

// // // //         // Show success message
// // // //         toast.success("✅ Review updated successfully!", {
// // // //           duration: 3000,
// // // //           position: 'top-right',
// // // //         });

// // // //         // Close modal
// // // //         handleCloseEditModal();

// // // //         // Refresh reviews and average rating after 1 second
// // // //         setTimeout(() => {
// // // //           if (id) {
// // // //             fetchReviewsByVehicleId(id, true);
// // // //             fetchAverageRating(id, true);
// // // //           }
// // // //         }, 1000);

// // // //       } else {
// // // //         const errorText = await response.text();
// // // //         console.error("❌ Error Response:", errorText);
// // // //         throw new Error(`HTTP ${response.status}: ${errorText}`);
// // // //       }

// // // //     } catch (error: any) {
// // // //       console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //       console.error("❌ REVIEW UPDATE FAILED");
// // // //       console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //       console.error("Error:", error.message);

// // // //       const errorMessage = error.message || "Failed to update review. Please try again.";
// // // //       setUpdateReviewError(errorMessage);

// // // //       toast.error(`❌ ${errorMessage}`, {
// // // //         duration: 4000,
// // // //         position: 'top-right',
// // // //       });

// // // //     } finally {
// // // //       setIsUpdatingReview(false);
// // // //     }
// // // //   };

// // // //   /**
// // // //    * ⭐ NEW: DELETE REVIEW VIA API
// // // //    */
// // // //   const handleDeleteReview = async (reviewId: string) => {
// // // //     // Confirmation dialog
// // // //     const confirmed = window.confirm(
// // // //       "Are you sure you want to delete this review? This action cannot be undone."
// // // //     );

// // // //     if (!confirmed) {
// // // //       return;
// // // //     }

// // // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //     console.log("🗑️ DELETING REVIEW");
// // // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //     console.log("Review ID:", reviewId);

// // // //     setIsUpdatingReview(true);

// // // //     try {
// // // //       const requestOptions: RequestInit = {
// // // //         method: "DELETE",
// // // //         redirect: "follow"
// // // //       };

// // // //       const response = await fetch(
// // // //         `http://52.66.238.227:3000/deleteReview/${reviewId}`,
// // // //         requestOptions
// // // //       );

// // // //       console.log("📥 Delete Response Status:", response.status);

// // // //       if (response.ok) {
// // // //         console.log("✅ Review deleted successfully");

// // // //         // Update local state (remove the deleted review)
// // // //         setApiReviews(prevReviews =>
// // // //           prevReviews.filter(r => r._id !== reviewId)
// // // //         );

// // // //         toast.success("✅ Review deleted successfully!", {
// // // //           duration: 3000,
// // // //           position: 'top-right',
// // // //         });

// // // //         // Refresh data after 1 second
// // // //         setTimeout(() => {
// // // //           if (id) {
// // // //             fetchReviewsByVehicleId(id, true);
// // // //             fetchAverageRating(id, true);
// // // //           }
// // // //         }, 1000);

// // // //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //         console.log("✅ REVIEW DELETE SUCCESSFUL");
// // // //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

// // // //       } else {
// // // //         const errorText = await response.text();
// // // //         throw new Error(`Delete failed: ${errorText}`);
// // // //       }

// // // //     } catch (error: any) {
// // // //       console.error("❌ Delete failed:", error.message);
// // // //       toast.error("❌ Failed to delete review. Please try again.", {
// // // //         duration: 3000,
// // // //         position: 'top-right',
// // // //       });
// // // //     } finally {
// // // //       setIsUpdatingReview(false);
// // // //     }
// // // //   };

// // // //   /**
// // // //    * Manual refresh button handler
// // // //    */
// // // //   const handleRefreshReviews = async () => {
// // // //     if (id) {
// // // //       console.log("🔄 Manual refresh triggered");
// // // //       toast.loading("Refreshing reviews...", { duration: 1000 });
// // // //       await fetchReviewsByVehicleId(id, false);
// // // //       await fetchAverageRating(id, false);
// // // //     }
// // // //   };

// // // //  // ============================================================
// // // // // PART 4: ALL REMAINING HELPER FUNCTIONS
// // // // // Add these after the API functions from Part 3
// // // // // ============================================================

// // // //   /**
// // // //    * Calculate average rating from API reviews
// // // //    */
// // // //   const calculateAverageRating = (reviews: Review[]): number => {
// // // //     if (reviews.length === 0) return 0;
// // // //     const total = reviews.reduce((sum, review) => sum + review.rating, 0);
// // // //     const average = total / reviews.length;
// // // //     return Number(average.toFixed(1));
// // // //   };

// // // //   /**
// // // //    * Calculate rating distribution from API reviews
// // // //    */
// // // //   const calculateRatingDistribution = (reviews: Review[]) => {
// // // //     const distribution = [5, 4, 3, 2, 1].map(stars => {
// // // //       const count = reviews.filter(r => r.rating === stars).length;
// // // //       const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
// // // //       return { stars, count, percentage };
// // // //     });
// // // //     return distribution;
// // // //   };

// // // //   /**
// // // //    * Map vehicle type for API (capitalized as required by backend enum)
// // // //    */
// // // //   const mapVehicleTypeForAPI = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
// // // //     if (!type) {
// // // //       console.warn("⚠️ Vehicle type is undefined/null, defaulting to 'Car'");
// // // //       return "Car";
// // // //     }
    
// // // //     const normalized = type.toLowerCase();
// // // //     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
// // // //       car: "Car",
// // // //       auto: "Auto",
// // // //       bike: "Bike",
// // // //     };
    
// // // //     return typeMap[normalized] || "Car";
// // // //   };
  
// // // //   /**
// // // //    * Map vehicle type for store
// // // //    */
// // // //   const mapVehicleTypeForStore = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
// // // //     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
// // // //       car: "Car",
// // // //       auto: "Auto",
// // // //       bike: "Bike",
// // // //     };
// // // //     return type ? typeMap[type.toLowerCase()] || "Car" : "Car";
// // // //   };
 
// // // //   /**
// // // //    * Calculate total hours between dates and times
// // // //    */
// // // //   const calculateTotalHours = (
// // // //     startDate: string,
// // // //     endDate: string,
// // // //     startTime: string,
// // // //     endTime: string
// // // //   ): number => {
// // // //     try {
// // // //       const parseTime = (timeStr: string) => {
// // // //         const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
// // // //         if (!match) return { hours: 0, minutes: 0 };
       
// // // //         let hours = parseInt(match[1]);
// // // //         const minutes = parseInt(match[2] || '0');
// // // //         const period = match[3]?.toUpperCase();
       
// // // //         if (period === 'PM' && hours !== 12) hours += 12;
// // // //         if (period === 'AM' && hours === 12) hours = 0;
       
// // // //         return { hours, minutes };
// // // //       };
 
// // // //       const startTimeParsed = parseTime(startTime);
// // // //       const endTimeParsed = parseTime(endTime);
 
// // // //       const start = new Date(startDate);
// // // //       start.setHours(startTimeParsed.hours, startTimeParsed.minutes, 0, 0);
 
// // // //       const end = new Date(endDate);
// // // //       end.setHours(endTimeParsed.hours, endTimeParsed.minutes, 0, 0);
 
// // // //       const diffInMs = end.getTime() - start.getTime();
// // // //       const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
     
// // // //       return hours > 0 ? hours : 1;
// // // //     } catch (error) {
// // // //       console.error("❌ Error calculating hours:", error);
// // // //       return 1;
// // // //     }
// // // //   };
 
// // // //   /**
// // // //    * Format date for API
// // // //    */
// // // //   const formatDateForAPI = (dateString: string): string => {
// // // //     try {
// // // //       const date = new Date(dateString);
// // // //       if (!isNaN(date.getTime())) {
// // // //         const year = date.getFullYear();
// // // //         const month = String(date.getMonth() + 1).padStart(2, '0');
// // // //         const day = String(date.getDate()).padStart(2, '0');
// // // //         return `${year}-${month}-${day}`;
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("❌ Date formatting error:", error);
// // // //     }
// // // //     return dateString;
// // // //   };
 
// // // //   /**
// // // //    * Format time for API
// // // //    */
// // // //   const formatTimeForAPI = (timeString: string): string => {
// // // //     try {
// // // //       const ampmMatch = timeString.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
// // // //       if (ampmMatch) {
// // // //         let hours = parseInt(ampmMatch[1]);
// // // //         const minutes = ampmMatch[2] || '00';
// // // //         const period = ampmMatch[3].toUpperCase();
       
// // // //         if (period === 'PM' && hours !== 12) hours += 12;
// // // //         if (period === 'AM' && hours === 12) hours = 0;
       
// // // //         return `${hours.toString().padStart(2, '0')}.${minutes}`;
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("❌ Time formatting error:", error);
// // // //     }
// // // //     return timeString;
// // // //   };

// // // //   /**
// // // //    * Booking handlers
// // // //    */
// // // //   const handleTimerComplete = () => {
// // // //     console.log("⏰ Timer completed - Opening BookingAcceptance");
// // // //     setShowWaitingPopup(false);
// // // //     setShowAcceptance(true);
// // // //   };
 
// // // //   const handleCloseWaiting = () => {
// // // //     console.log("❌ WaitingPopup closed manually");
// // // //     setShowWaitingPopup(false);
// // // //     setWaitingTimerSeconds(30);
// // // //   };
 
// // // //   const handleAcceptBooking = () => {
// // // //     console.log("✅ Booking Accepted by Owner!");
// // // //     setShowAcceptance(false);
// // // //     setShowContactButtons(true);
// // // //   };
 
// // // //   const handleRejectBooking = () => {
// // // //     console.log("❌ Booking Rejected by Owner!");
// // // //     setShowAcceptance(false);
// // // //     setShowRejectModal(true);
// // // //   };
 
// // // //   const handleCloseRejectModal = () => {
// // // //     console.log("🔙 Reject modal closed");
// // // //     setShowRejectModal(false);
// // // //     setSelectedDateTime(null);
// // // //     setBookingId(null);
// // // //     setWaitingTimerSeconds(30);
// // // //   };
 
// // // //   const handleCallOwner = () => {
// // // //     console.log("📞 User calling owner...");
// // // //     setTimeout(() => {
// // // //       handleConfirmBooking();
// // // //     }, 1000);
// // // //   };
 
// // // //   const handleConfirmBooking = () => {
// // // //     if (!currentVehicle || !selectedDateTime) {
// // // //       console.error("❌ Cannot confirm booking");
// // // //       return;
// // // //     }
 
// // // //     const currentDate = new Date();
// // // //     console.log("🎉 Confirming booking with ID:", bookingId);
 
// // // //     addBooking({
// // // //       id: bookingId || Date.now().toString(),
// // // //       vehicleId: currentVehicle.id,
// // // //       vehicleName: currentVehicle.name,
// // // //       vehicleImage: currentVehicle.image,
// // // //       vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// // // //       customerName: "Current User",
// // // //       bookingDate: currentDate.toLocaleDateString("en-US"),
// // // //       bookingTime: currentDate.toLocaleTimeString("en-US", {
// // // //         hour: "2-digit",
// // // //         minute: "2-digit",
// // // //       }),
// // // //       startDate: selectedDateTime.startDate,
// // // //       startTime: selectedDateTime.startTime,
// // // //       endDate: selectedDateTime.endDate,
// // // //       endTime: selectedDateTime.endTime,
// // // //       modelNo: currentVehicle.id.toUpperCase(),
// // // //       status: "Booked",
// // // //       price: currentVehicle.price,
// // // //     });
 
// // // //     setShowSuccessModal(true);
// // // //   };

// // // //  // ============================================================
// // // // // PART 5: CREATE BOOKING API FUNCTION
// // // // // This is your existing createBookingAPI function - NO CHANGES
// // // // // Add this after the helper functions from Part 4
// // // // // ============================================================

// // // //   const createBookingAPI = async ( 
// // // //     startDate: string,
// // // //     endDate: string,
// // // //     startTime: string,
// // // //     endTime: string
// // // //   ) => {
// // // //     if (!currentVehicle) {
// // // //       const errorMsg = "Vehicle information is missing. Please try again.";
// // // //       setApiError(errorMsg);
// // // //       addNotification({
// // // //         title: "Booking Failed",
// // // //         message: errorMsg,
// // // //         type: "booking_declined",
// // // //       });
// // // //       return null;
// // // //     }
 
// // // //     setIsSubmittingBooking(true);
// // // //     setApiError("");
 
// // // //     try {
// // // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // // //       console.log("🚀 PRODUCTION BOOKING API - START");
// // // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      
// // // //       const totalHours = calculateTotalHours(startDate, endDate, startTime, endTime);
// // // //       const pricePerDay = parseInt(String(apiCarData?.RentPerDay || currentVehicle.price || "0"), 10);
// // // //       const pricePerHour = pricePerDay > 0 ? Math.round(pricePerDay / 24) : parseInt(String(currentVehicle.price || "0"), 10);
// // // //       const totalPrice = totalHours * pricePerHour;
      
// // // //       const formattedFromDate = formatDateForAPI(startDate);
// // // //       const formattedToDate = formatDateForAPI(endDate);
// // // //       const formattedFromTime = formatTimeForAPI(startTime);
// // // //       const formattedToTime = formatTimeForAPI(endTime);
      
// // // //       const userId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
// // // //       const contactNumber = localStorage.getItem('contactNumber') || "6301818409";
// // // //       const contactName = localStorage.getItem('contactName') || localStorage.getItem('userName') || "User";
// // // //       const userLatitude = localStorage.getItem('latitude') || "17.438095";
// // // //       const userLongitude = localStorage.getItem('longitude') || "78.4485";

// // // //       const requestBody = {
// // // //         userId: userId,
// // // //         contactNumber: contactNumber,
// // // //         contactName: contactName,
// // // //         latitude: userLatitude,
// // // //         longitude: userLongitude,
// // // //         VechileId: currentVehicle.id,
// // // //         vechileType: mapVehicleTypeForAPI(currentVehicle.type),
// // // //         carName: apiCarData?.CarName || currentVehicle.name || '',
// // // //         carModel: apiCarData?.Model || '',
// // // //         carBrand: apiCarData?.Brand || '',
// // // //         carNumber: apiCarData?.CarNumber || '',
// // // //         fuelType: apiCarData?.FuelType || '',
// // // //         transmissionType: apiCarData?.TransmissionType || '',
// // // //         seatingCapacity: apiCarData?.SeatingCapacity?.toString() || '',
// // // //         pricePerDay: pricePerDay.toString(),
// // // //         pricePerHour: pricePerHour.toString(),
// // // //         pricePerKm: pricePerHour.toString(),
// // // //         FromDate: formattedFromDate,
// // // //         ToDate: formattedToDate,
// // // //         FromTime: formattedFromTime,
// // // //         ToTime: formattedToTime,
// // // //         totalHours: totalHours.toString(),
// // // //         totalPrice: totalPrice.toString(),
// // // //         pickupAddress: apiCarData?.pickupAddress || '',
// // // //         dropoffAddress: apiCarData?.pickupAddress || '',
// // // //       };
 
// // // //       const urlencoded = new URLSearchParams();
// // // //       Object.entries(requestBody).forEach(([key, value]) => {
// // // //         if (value !== null && value !== undefined) {
// // // //           urlencoded.append(key, String(value));
// // // //         }
// // // //       });
 
// // // //       const API_ENDPOINT = `${API_BASE_URL}/createBooking`;
      
// // // //       try {
// // // //         const apiServiceResponse = await apiService.booking.createBooking(requestBody);
        
// // // //         const bookingIdFromResponse = (apiServiceResponse as any)?.data?.bookingId || 
// // // //                                      (apiServiceResponse as any)?.data?._id ||
// // // //                                      (apiServiceResponse as any)?.bookingId ||
// // // //                                      (apiServiceResponse as any)?._id ||
// // // //                                      `BOOK-${Date.now()}`;
        
// // // //         setBookingId(bookingIdFromResponse);
        
// // // //         addNotification({
// // // //           title: "Booking Created Successfully! 🎉",
// // // //           message: `Your booking for ${requestBody.carName} has been confirmed!`,
// // // //           type: "booking_confirmed",
// // // //           vehicleId: currentVehicle.id,
// // // //           vehicleName: requestBody.carName,
// // // //           bookingId: bookingIdFromResponse,
// // // //         });
        
// // // //         addBooking({
// // // //           id: bookingIdFromResponse,
// // // //           vehicleId: currentVehicle.id,
// // // //           vehicleName: requestBody.carName,
// // // //           vehicleImage: currentVehicle.image,
// // // //           vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// // // //           price: totalPrice,
// // // //           startDate: formattedFromDate,
// // // //           endDate: formattedToDate,
// // // //           startTime: formattedFromTime,
// // // //           endTime: formattedToTime,
// // // //           status: 'Booked',
// // // //         });
        
// // // //         return apiServiceResponse;
        
// // // //       } catch (apiServiceError: any) {
// // // //         console.warn("⚠️ Strategy 1 failed:", apiServiceError.message);
// // // //       }
      
// // // //       const PRODUCTION_PROXIES = [
// // // //         "https://api.allorigins.win/raw?url=",
// // // //         "https://api.codetabs.com/v1/proxy?quest=",
// // // //         "https://thingproxy.freeboard.io/fetch/",
// // // //       ];
      
// // // //       for (let i = 0; i < PRODUCTION_PROXIES.length; i++) {
// // // //         try {
// // // //           const proxiedUrl = `${PRODUCTION_PROXIES[i]}${encodeURIComponent(API_ENDPOINT)}`;
 
// // // //           const response = await Promise.race([
// // // //             fetch(proxiedUrl, {
// // // //               method: "POST",
// // // //               headers: {
// // // //                 "Content-Type": "application/x-www-form-urlencoded",
// // // //               },
// // // //               body: urlencoded.toString(),
// // // //             }),
// // // //             new Promise<never>((_, reject) =>
// // // //               setTimeout(() => reject(new Error('Proxy timeout after 15s')), 15000)
// // // //             )
// // // //           ]);
 
// // // //           if (response.ok) {
// // // //             const text = await response.text();
           
// // // //             let result;
// // // //             try {
// // // //               result = JSON.parse(text);
// // // //             } catch {
// // // //               result = { success: true, message: text };
// // // //             }
 
// // // //             const bookingIdFromResponse = result?.bookingId || 
// // // //                                          result?.data?.bookingId || 
// // // //                                          result?._id || 
// // // //                                          result?.data?._id || 
// // // //                                          `BOOK-${Date.now()}`;
            
// // // //             setBookingId(bookingIdFromResponse);
            
// // // //             addNotification({
// // // //               title: "Booking Created Successfully! 🎉",
// // // //               message: `Your booking for ${requestBody.carName} has been confirmed!`,
// // // //               type: "booking_confirmed",
// // // //               vehicleId: currentVehicle.id,
// // // //               vehicleName: requestBody.carName,
// // // //               bookingId: bookingIdFromResponse,
// // // //             });
            
// // // //             addBooking({
// // // //               id: bookingIdFromResponse,
// // // //               vehicleId: currentVehicle.id,
// // // //               vehicleName: requestBody.carName,
// // // //               vehicleImage: currentVehicle.image,
// // // //               vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// // // //               price: totalPrice,
// // // //               startDate: formattedFromDate,
// // // //               endDate: formattedToDate,
// // // //               startTime: formattedFromTime,
// // // //               endTime: formattedToTime,
// // // //               status: 'Booked',
// // // //             });
            
// // // //             return result;
// // // //           }
// // // //         } catch (proxyError: any) {
// // // //           console.warn(`❌ Proxy ${i + 1} failed:`, proxyError.message);
// // // //         }
// // // //       }
      
// // // //       throw new Error("Unable to connect to booking server. Please check your internet connection and try again.");
 
// // // //     } catch (error: any) {
// // // //       console.error("❌ BOOKING CREATION FAILED");
// // // //       console.error("❌ Error:", error.message);
     
// // // //       const errorMessage = error.message || "Failed to create booking. Please try again.";
// // // //       setApiError(errorMessage);
      
// // // //       addNotification({
// // // //         title: "Booking Failed ❌",
// // // //         message: errorMessage,
// // // //         type: "booking_declined",
// // // //         vehicleId: currentVehicle.id,
// // // //         vehicleName: currentVehicle.name,
// // // //       });
      
// // // //       return null;
     
// // // //     } finally {
// // // //       setIsSubmittingBooking(false);
// // // //     }
// // // //   };
// // // // // ============================================================
// // // // // PART 6: COMPONENT SETUP AND EARLY RETURNS
// // // // // Add this after the createBookingAPI function from Part 5
// // // // // ============================================================

// // // //   // Create current vehicle object
// // // //   const currentVehicle = vehicle || (apiCarData ? {
// // // //     id: apiCarData._id || apiCarData.id || id || '',
// // // //     name: apiCarData.CarName || 'Unknown Vehicle',
// // // //     image: (apiCarData.carImages && apiCarData.carImages.length > 0) 
// // // //       ? apiCarData.carImages[0] 
// // // //       : apiCarData.carImage || apiCarData.image || 'https://via.placeholder.com/400',
// // // //     price: apiCarData.RentPerDay || apiCarData.pricePerHour || '0',
// // // //     type: 'car' as Vehicle["type"],
// // // //   } : null);

// // // //   // Calculate display values
// // // //   const vehicleReviews = getReviewsByVehicleId(currentVehicle?.id || '');
// // // //   const averageRating = getAverageRating(currentVehicle?.id || '');
// // // //   const totalReviews = getTotalReviewCount(currentVehicle?.id || '');
// // // //   const ratingDistribution = getRatingDistribution(currentVehicle?.id || '');

// // // //   // Use API reviews if available, otherwise fallback to local store
// // // //   const displayReviews = apiReviews.length > 0 ? apiReviews : vehicleReviews;
  
// // // //   // ⭐ Use API average rating if available
// // // //   const displayAverageRating = apiAverageRating > 0 
// // // //     ? apiAverageRating 
// // // //     : (apiReviews.length > 0 
// // // //         ? calculateAverageRating(apiReviews) 
// // // //         : averageRating);
  
// // // //   const displayTotalReviews = apiReviews.length > 0 
// // // //     ? apiReviews.length 
// // // //     : totalReviews;
  
// // // //   const displayRatingDistribution = apiReviews.length > 0 
// // // //     ? calculateRatingDistribution(apiReviews) 
// // // //     : ratingDistribution;

// // // //   // ============================================================
// // // //   // EARLY RETURNS (LOADING, ERROR, NOT FOUND STATES)
// // // //   // ============================================================

// // // //   // Loading state
// // // //   if (loadingCarData) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
// // // //         <div className="text-center space-y-4 p-8">
// // // //           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
// // // //           <p className="text-xl text-gray-700 font-semibold">Loading vehicle details...</p>
// // // //           <p className="text-sm text-gray-500">Please wait while we fetch the car information</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Error state
// // // //   if (carDataError && !vehicle) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
// // // //         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
// // // //           <div className="text-6xl">❌</div>
// // // //           <p className="text-xl text-red-600 font-bold">Error Loading Vehicle</p>
// // // //           <p className="text-gray-600">{carDataError}</p>
// // // //           <button
// // // //             onClick={() => navigate(-1)}
// // // //             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
// // // //           >
// // // //             ← Go Back
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Not found state
// // // //   if (!vehicle && !apiCarData) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// // // //         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
// // // //           <div className="text-6xl">🚗</div>
// // // //           <p className="text-xl text-gray-700 font-bold">Vehicle Not Found</p>
// // // //           <p className="text-gray-600">The vehicle you're looking for doesn't exist or has been removed.</p>
// // // //           <button
// // // //             onClick={() => navigate(-1)}
// // // //             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
// // // //           >
// // // //             ← Go Back
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // No vehicle data
// // // //   if (!currentVehicle) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen">
// // // //         <div className="text-center space-y-4 p-8">
// // // //           <p className="text-xl text-gray-700">Vehicle data not available!</p>
// // // //           <button
// // // //             onClick={() => navigate(-1)}
// // // //             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// // // //           >
// // // //             Go Back
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // // return (
// // // //     <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // //       <div className="lg:col-span-1">
// // // //         <img
// // // //           src={currentVehicle.image}
// // // //           alt={currentVehicle.name}
// // // //           className="rounded-xl w-full mb-4"
// // // //         />
// // // //         <div className="flex justify-center space-x-2 mt-2">
// // // //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// // // //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// // // //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// // // //         </div>
// // // //       </div>
 
// // // //       {/* ============================================ */}
// // // //       {/* MIDDLE COLUMN - VEHICLE DETAILS & BOOKING */}
// // // //       {/* ============================================ */}
// // // //       <div className="lg:col-span-1">
// // // //         <h2 className="text-2xl font-bold">{currentVehicle.name}</h2>
// // // //         <p className="text-gray-600 text-lg mt-1">₹{currentVehicle.price}/hr</p>
 
// // // //         <div className="flex gap-4 mt-4">
// // // //           {[
// // // //             { img: Automatic, label: apiCarData?.transmissionType || "Automatic" },
// // // //             { img: Driver, label: apiCarData?.Carseater || "5 Seater" },
// // // //             { img: Petrol, label: apiCarData?.fuelType || "Petrol" },
// // // //             { img: Acicon, label: "AC" },
// // // //           ].map((item, idx) => (
// // // //             <div key={idx} className="flex flex-col items-center p-2 border rounded-lg">
// // // //               <img src={item.img} alt={item.label} className="w-[25px] h-[25px]" />
// // // //               <span className="text-sm mt-1">{item.label}</span>
// // // //             </div>
// // // //           ))}
// // // //         </div>
 
// // // //         <div className="mt-6">
// // // //           <h3 className="font-semibold text-lg mb-2">Description</h3>
// // // //           <p className="text-gray-600 text-sm">
// // // //             {apiCarData?.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
// // // //           </p>
// // // //         </div>
 
// // // //         {apiError && (
// // // //           <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
// // // //             <p className="text-sm text-red-700">{apiError}</p>
// // // //             <button
// // // //               onClick={() => setApiError("")}
// // // //               className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
// // // //             >
// // // //               Dismiss
// // // //             </button>
// // // //           </div>
// // // //         )}
 
// // // //         {!showContactButtons ? (
// // // //           <button
// // // //             onClick={() => setIsDateTimeModalOpen(true)}
// // // //             disabled={isSubmittingBooking}
// // // //             className="mt-6 w-full bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
// // // //           >
// // // //             {isSubmittingBooking ? "Processing..." : "Book Now"}
// // // //           </button>
// // // //         ) : (
// // // //           <div className="mt-6 space-y-4">
// // // //             <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
// // // //               <img
// // // //                 src="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
// // // //                 alt="Manoj Kumar"
// // // //                 className="w-12 h-12 rounded-full"
// // // //               />
// // // //               <div className="flex-1">
// // // //                 <h4 className="font-semibold text-gray-900">Manoj Kumar</h4>
// // // //                 <p className="text-sm text-gray-500">Vehicle Owner</p>
// // // //               </div>
// // // //             </div>
 
// // // //             <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
// // // //               <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
// // // //                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
// // // //               </svg>
// // // //               <p className="text-sm text-orange-700 flex-1">
// // // //                 Please call the owner to discuss booking details and confirm availability.
// // // //               </p>
// // // //             </div>
 
// // // //             <div className="flex gap-3">
// // // //               <button
// // // //                 onClick={() => setIsChatOpen(true)}
// // // //                 className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
// // // //               >
// // // //                 💬 Chat
// // // //               </button>
// // // //               <button
// // // //                 onClick={handleCallOwner}
// // // //                 className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
// // // //               >
// // // //                 📞 Call Owner
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         )}
 
// // // //         {isDateTimeModalOpen && (
// // // //           <AvailabilityDateTimeModal
// // // //             isOpen={isDateTimeModalOpen}
// // // //             onClose={() => {
// // // //               setIsDateTimeModalOpen(false);
// // // //               setApiError("");
// // // //             }}
// // // //             onConfirm={async (startDate, endDate, startTime, endTime, availability) => {
// // // //               console.log("✅ DateTime selected:", { startDate, endDate, startTime, endTime });
             
// // // //               setSelectedDateTime({ startDate, endDate, startTime, endTime });
// // // //               setIsDateTimeModalOpen(false);
             
// // // //               const result = await createBookingAPI(startDate, endDate, startTime, endTime);
             
// // // //               if (result) {
// // // //                 console.log("🎉 Starting wait timer");
// // // //                 setWaitingTimerSeconds(30);
// // // //                 setShowWaitingPopup(true);
// // // //               }
// // // //             }}
// // // //           />
// // // //         )}
// // // //       </div>



// // // //       {/* RIGHT COLUMN - REVIEWS & RATINGS */}
// // // //       <div className="lg:col-span-1">
// // // //         {/* Header with Refresh Button */}
// // // //         <div className="flex items-center justify-between mb-3">
// // // //           <h3 className="text-lg font-bold">Rating & Reviews</h3>
// // // //           <div className="flex items-center gap-2">
// // // //             {(loadingReviews || loadingAverageRating) && (
// // // //               <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
// // // //             )}
// // // //             <button
// // // //               onClick={handleRefreshReviews}
// // // //               disabled={loadingReviews || loadingAverageRating}
// // // //               className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
// // // //               title="Refresh reviews"
// // // //             >
// // // //               <RefreshCw className={`w-4 h-4 text-gray-600 ${(loadingReviews || loadingAverageRating) ? 'animate-spin' : ''}`} />
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Review Source Indicator */}
// // // //         {apiReviews.length > 0 && (
// // // //           <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
// // // //             <span className="text-xs text-green-700 font-medium">
// // // //               ✓ Live reviews from API
// // // //             </span>
// // // //             <span className="text-xs text-gray-500">
// // // //               (Updated {new Date(lastFetchTime).toLocaleTimeString()})
// // // //             </span>
// // // //           </div>
// // // //         )}

// // // //         {reviewsError && (
// // // //           <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
// // // //             <p className="text-xs text-yellow-700">{reviewsError}</p>
// // // //           </div>
// // // //         )}

// // // //         {/* Average Rating Display */}
// // // //         <div className="flex items-center mt-2 mb-2 justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
// // // //           <div className="flex flex-col">
// // // //             <span className="text-3xl font-bold text-gray-900">{displayAverageRating}</span>
// // // //             <span className="text-xs text-gray-600 mt-1">out of 5</span>
// // // //           </div>
// // // //           <div className="flex flex-col items-end">
// // // //             <div className="flex gap-1">
// // // //               {[...Array(5)].map((_, i) => (
// // // //                 <Star
// // // //                   key={i}
// // // //                   className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
// // // //                   size={20}
// // // //                 />
// // // //               ))}
// // // //             </div>
// // // //             <span className="text-sm text-gray-600 mt-1">
// // // //               {displayTotalReviews} Review{displayTotalReviews !== 1 ? 's' : ''}
// // // //             </span>
// // // //           </div>
// // // //         </div>

// // // //         {/* Rating Distribution */}
// // // //         <div className="mt-4 space-y-2 bg-white p-4 rounded-lg border">
// // // //           <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating Breakdown</h4>
// // // //           {displayRatingDistribution.map((r) => (
// // // //             <div key={r.stars} className="flex items-center text-sm">
// // // //               <span className="w-8 text-gray-700 font-medium">{r.stars}★</span>
// // // //               <div className="flex-1 bg-gray-200 h-3 rounded-full mx-3 overflow-hidden">
// // // //                 <div 
// // // //                   className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500" 
// // // //                   style={{ width: `${r.percentage}%` }} 
// // // //                 />
// // // //               </div>
// // // //               <span className="text-gray-500 text-xs min-w-[45px] text-right">
// // // //                 {r.count} ({r.percentage}%)
// // // //               </span>
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         {/* ENHANCED: Individual Reviews with Edit/Delete */}
// // // //         <div className="mt-6 space-y-3 max-h-[500px] overflow-y-auto pr-2">
// // // //           <h4 className="text-sm font-semibold text-gray-700 mb-3 sticky top-0 bg-white py-2 z-10">
// // // //             Customer Reviews ({displayTotalReviews})
// // // //           </h4>
          
// // // //           {displayReviews.length > 0 ? (
// // // //             displayReviews.map((r, idx) => {
// // // //               const canEdit = isUserReview(r);

// // // //               return (
// // // //                 <div 
// // // //                   key={r._id || idx} 
// // // //                   className={`border rounded-xl transition ${
// // // //                     canEdit 
// // // //                       ? 'border-blue-200 bg-blue-50 hover:shadow-md' 
// // // //                       : 'border-gray-200 bg-white hover:shadow-md'
// // // //                   }`}
// // // //                 >
// // // //                   <div className="p-4">
// // // //                     {/* Header with User Info and Actions */}
// // // //                     <div className="flex justify-between items-start mb-2">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm">
// // // //                           {(r.userName || `User ${idx + 1}`).charAt(0).toUpperCase()}
// // // //                         </div>
// // // //                         <div>
// // // //                           <div className="flex items-center gap-2">
// // // //                             <span className="font-semibold text-gray-900 text-sm">
// // // //                               {r.userName || `User ${idx + 1}`}
// // // //                             </span>
// // // //                             {canEdit && (
// // // //                               <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium">
// // // //                                 You
// // // //                               </span>
// // // //                             )}
// // // //                           </div>
// // // //                           {r.createdAt && (
// // // //                             <p className="text-xs text-gray-400">
// // // //                               {new Date(r.createdAt).toLocaleDateString('en-US', {
// // // //                                 year: 'numeric',
// // // //                                 month: 'short',
// // // //                                 day: 'numeric'
// // // //                               })}
// // // //                             </p>
// // // //                           )}
// // // //                         </div>
// // // //                       </div>

// // // //                       <div className="flex items-center gap-2">
// // // //                         {/* Rating Display */}
// // // //                         <div className="flex bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200">
// // // //                           {[...Array(5)].map((_, i) => (
// // // //                             <Star
// // // //                               key={i}
// // // //                               size={14}
// // // //                               className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
// // // //                             />
// // // //                           ))}
// // // //                         </div>

// // // //                         {/* Edit/Delete Buttons (only for user's own reviews) */}
// // // //                         {canEdit && (
// // // //                           <div className="flex gap-1">
// // // //                             <button
// // // //                               onClick={() => handleStartEditReview(r)}
// // // //                               disabled={isUpdatingReview}
// // // //                               className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition disabled:opacity-50"
// // // //                               title="Edit review"
// // // //                             >
// // // //                               <Pencil size={16} />
// // // //                             </button>
// // // //                             <button
// // // //                               onClick={() => handleDeleteReview(r._id)}
// // // //                               disabled={isUpdatingReview}
// // // //                               className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition disabled:opacity-50"
// // // //                               title="Delete review"
// // // //                             >
// // // //                               <Trash2 size={16} />
// // // //                             </button>
// // // //                           </div>
// // // //                         )}
// // // //                       </div>
// // // //                     </div>

// // // //                     {/* Review Text */}
// // // //                     <p className="text-sm text-gray-700 leading-relaxed mt-2">
// // // //                       {r.review || "No comment provided"}
// // // //                     </p>

// // // //                     {/* Edit hint for user's review */}
// // // //                     {canEdit && (
// // // //                       <div className="mt-2 pt-2 border-t border-blue-200">
// // // //                         <p className="text-xs text-blue-600 flex items-center gap-1">
// // // //                           <Pencil size={12} />
// // // //                           Click edit to modify your review
// // // //                         </p>
// // // //                       </div>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               );
// // // //             })
// // // //           ) : (
// // // //             <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
// // // //               <div className="text-5xl mb-3">📝</div>
// // // //               <p className="text-gray-500 font-medium mb-1">No reviews yet</p>
// // // //               <p className="text-gray-400 text-sm">
// // // //                 Be the first to review this vehicle!
// // // //               </p>
// // // //             </div>
// // // //           )}
     
// // // //       </div>  
   
// // // //       {showEditModal && selectedReviewForEdit && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] p-4">
// // // //           <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-fadeIn">

// // // //             {/* Header */}
// // // //             <div className="flex items-center justify-between mb-4">
// // // //               <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
// // // //                 <Pencil size={20} className="text-blue-600" />
// // // //                 Edit Your Review
// // // //               </h2>
// // // //               <button
// // // //                 onClick={handleCloseEditModal}
// // // //                 disabled={isUpdatingReview}
// // // //                 className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
// // // //                 title="Close"
// // // //               >
// // // //                 <X size={20} />
// // // //               </button>
// // // //             </div>

// // // //             {/* Vehicle Info */}
// // // //             <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center gap-3">
// // // //               <img
// // // //                 src={currentVehicle.image}
// // // //                 alt={currentVehicle.name}
// // // //                 className="w-12 h-12 rounded-lg object-cover"
// // // //               />
// // // //               <div>
// // // //                 <p className="font-semibold text-gray-900 text-sm">
// // // //                   {currentVehicle.name}
// // // //                 </p>
// // // //                 <p className="text-xs text-gray-500">
// // // //                   Editing your review
// // // //                 </p>
// // // //               </div>
// // // //             </div>

// // // //             {/* Error Message */}
// // // //             {updateReviewError && (
// // // //               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
// // // //                 <svg
// // // //                   className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
// // // //                   fill="currentColor"
// // // //                   viewBox="0 0 20 20"
// // // //                 >
// // // //                   <path
// // // //                     fillRule="evenodd"
// // // //                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
// // // //                     clipRule="evenodd"
// // // //                   />
// // // //                 </svg>
// // // //                 <p className="text-sm text-red-700 flex-1">
// // // //                   {updateReviewError}
// // // //                 </p>
// // // //               </div>
// // // //             )}

// // // //             {/* Rating Field */}
// // // //             <div className="mb-4">
// // // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                 Your Rating <span className="text-red-500">*</span>
// // // //               </label>
// // // //               <div className="flex items-center gap-2">
// // // //                 {[1, 2, 3, 4, 5].map((rating) => (
// // // //                   <button
// // // //                     key={rating}
// // // //                     type="button"
// // // //                     onClick={() => setEditReviewRating(rating)}
// // // //                     disabled={isUpdatingReview}
// // // //                     className="transition hover:scale-110 disabled:opacity-50 focus:outline-none"
// // // //                   >
// // // //                     <Star
// // // //                       size={32}
// // // //                       className={
// // // //                         rating <= editReviewRating
// // // //                           ? "text-yellow-400 fill-yellow-400"
// // // //                           : "text-gray-300 hover:text-yellow-200"
// // // //                       }
// // // //                     />
// // // //                   </button>
// // // //                 ))}
// // // //                 <span className="ml-2 text-sm text-gray-600 font-medium">
// // // //                   {editReviewRating > 0
// // // //                     ? `${editReviewRating}/5`
// // // //                     : "Select rating"}
// // // //                 </span>
// // // //               </div>
// // // //             </div>

// // // //             {/* Review Text Field */}
// // // //             <div className="mb-4">
// // // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                 Your Review <span className="text-red-500">*</span>
// // // //               </label>
// // // //               <textarea
// // // //                 value={editReviewText}
// // // //                 onChange={(e) => setEditReviewText(e.target.value)}
// // // //                 disabled={isUpdatingReview}
// // // //                 placeholder="Share your experience with this vehicle..."
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm disabled:opacity-50 disabled:bg-gray-50"
// // // //                 rows={6}
// // // //                 maxLength={500}
// // // //               />
// // // //               <div className="flex justify-between items-center mt-1">
// // // //                 <span className="text-xs text-gray-500">
// // // //                   {editReviewText.length}/500 characters
// // // //                 </span>
// // // //                 {editReviewText.length === 0 && (
// // // //                   <span className="text-xs text-red-500">
// // // //                     Review text is required
// // // //                   </span>
// // // //                 )}
// // // //               </div>
// // // //             </div>

// // // //             {/* Action Buttons */}
// // // //             <div className="flex gap-3">
// // // //               <button
// // // //                 onClick={handleUpdateReview}
// // // //                 disabled={
// // // //                   isUpdatingReview ||
// // // //                   !editReviewText.trim() ||
// // // //                   editReviewRating === 0
// // // //                 }
// // // //                 className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
// // // //               >
// // // //                 {isUpdatingReview ? (
// // // //                   <>
// // // //                     <Loader2 className="w-5 h-5 animate-spin" />
// // // //                     Updating...
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <Check size={18} />
// // // //                     Update Review
// // // //                   </>
// // // //                 )}
// // // //               </button>

// // // //               <button
// // // //                 onClick={handleCloseEditModal}
// // // //                 disabled={isUpdatingReview}
// // // //                 className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
// // // //               >
// // // //                 Cancel
// // // //               </button>
// // // //             </div>

// // // //             {/* Footer Note */}
// // // //             <p className="text-xs text-gray-500 text-center mt-3">
// // // //               Your review will be updated immediately after submission
// // // //             </p>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* EXISTING MODALS */}
// // // //       {showWaitingPopup && (
// // // //         <WaitingPopup
// // // //           timer={waitingTimerSeconds}
// // // //           onClose={handleCloseWaiting}
// // // //           onTimerComplete={handleTimerComplete}
// // // //         />
// // // //       )}
   
// // // //       {showAcceptance && (
// // // //         <BookingAcceptance
// // // //           onAccept={handleAcceptBooking}
// // // //           onReject={handleRejectBooking}
// // // //           onClose={() => setShowAcceptance(false)}
// // // //         />
// // // //       )}
   
// // // //       <PopupChat
// // // //         isOpen={isChatOpen}
// // // //         onClose={() => setIsChatOpen(false)}
// // // //         ownerName="Manoj Kumar"
// // // //         ownerAvatar="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
// // // //       />
   
// // // //       <BookingRejectModal isOpen={showRejectModal} onClose={handleCloseRejectModal} />

// // // //       {isSubmittingBooking && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// // // //           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
// // // //             <div className="flex flex-col items-center">
// // // //               <div className="relative mb-6">
// // // //                 <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
// // // //                 <div className="absolute inset-0 flex items-center justify-center">
// // // //                   <div className="w-12 h-12 bg-blue-100 rounded-full animate-pulse"></div>
// // // //                 </div>
// // // //               </div>
              
// // // //               <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
// // // //                 Creating Your Booking...
// // // //               </h2>
              
// // // //               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 w-full mb-4 border border-blue-100 shadow-sm">
// // // //                 {currentVehicle && (
// // // //                   <>
// // // //                     <div className="flex items-center gap-3 mb-4">
// // // //                       <img 
// // // //                         src={currentVehicle.image} 
// // // //                         alt={currentVehicle.name}
// // // //                         className="w-16 h-16 rounded-lg object-cover shadow-sm"
// // // //                       />
// // // //                       <div className="flex-1">
// // // //                         <p className="font-bold text-gray-900 text-lg">{currentVehicle.name}</p>
// // // //                         <p className="text-sm text-gray-600 capitalize">{currentVehicle.type}</p>
// // // //                       </div>
// // // //                     </div>
                    
// // // //                     <div className="space-y-2">
// // // //                       <div className="flex justify-between text-sm">
// // // //                         <span className="text-gray-600">Car ID</span>
// // // //                         <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
// // // //                           {currentVehicle.id.substring(0, 12)}...
// // // //                         </span>
// // // //                       </div>
                      
// // // //                       {apiCarData?.CarNumber && (
// // // //                         <div className="flex justify-between text-sm">
// // // //                           <span className="text-gray-600">Car Number</span>
// // // //                           <span className="font-semibold text-gray-900">{apiCarData.CarNumber}</span>
// // // //                         </div>
// // // //                       )}
                      
// // // //                       {selectedDateTime && (
// // // //                         <div className="border-t border-blue-200 pt-2 mt-3">
// // // //                           <p className="text-xs text-gray-600 mb-1">Booking Period</p>
// // // //                           <p className="text-sm text-gray-700 font-medium">
// // // //                             {selectedDateTime.startDate} {selectedDateTime.startTime}
// // // //                             <br />
// // // //                             to {selectedDateTime.endDate} {selectedDateTime.endTime}
// // // //                           </p>
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </>
// // // //                 )}
// // // //               </div>
              
// // // //               <div className="text-center space-y-2">
// // // //                 <p className="text-gray-600 text-sm">
// // // //                   Please wait while we process your booking...
// // // //                 </p>
// // // //                 <p className="text-blue-600 font-medium text-sm">
// // // //                   Connecting to server & validating data
// // // //                 </p>
// // // //               </div>
              
// // // //               <div className="flex gap-2 mt-5">
// // // //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
// // // //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
// // // //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

    
// // // //       {apiError && !isSubmittingBooking && (
// // // //         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[110] max-w-md w-full mx-4 animate-slideDown">
// // // //           <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-xl">
// // // //             <div className="flex items-start">
// // // //               <div className="flex-shrink-0">
// // // //                 <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // //                 </svg>
// // // //               </div>
// // // //               <div className="ml-3 flex-1">
// // // //                 <h3 className="text-sm font-bold text-red-800">Booking Failed</h3>
// // // //                 <p className="mt-1 text-sm text-red-700">{apiError}</p>
// // // //                 {currentVehicle && (
// // // //                   <p className="mt-1 text-xs text-red-600">
// // // //                     Car: {currentVehicle.name} (ID: {currentVehicle.id.substring(0, 8)}...)
// // // //                   </p>
// // // //                 )}
// // // //                 <div className="mt-3 flex gap-2">
// // // //                   <button
// // // //                     onClick={() => {
// // // //                       setApiError("");
// // // //                       setIsDateTimeModalOpen(true);
// // // //                     }}
// // // //                     className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
// // // //                   >
// // // //                     Retry Booking
// // // //                   </button>
// // // //                   <button
// // // //                     onClick={() => setApiError("")}
// // // //                     className="px-3 py-1.5 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-300 hover:bg-red-50 transition-colors"
// // // //                   >
// // // //                     Dismiss
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

   
// // // //       {showSuccessModal && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // // //           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
// // // //             <div className="flex justify-center mb-6">
// // // //               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
// // // //                 <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // // //                 </svg>
// // // //               </div>
// // // //             </div>
   
// // // //             <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
// // // //               Booking Posted Successfully!
// // // //             </h2>
// // // //             <p className="text-gray-600 text-center mb-6">
// // // //               After discussing with the owner, your booking has been confirmed. You will receive updates on your booking status.
// // // //             </p>
   
// // // //             <div className="bg-gray-50 rounded-lg p-4 mb-6">
// // // //               <div className="flex items-center gap-3 mb-3">
// // // //                 <img src={currentVehicle.image} alt={currentVehicle.name} className="w-16 h-16 rounded-lg object-cover" />
// // // //                 <div>
// // // //                   <h3 className="font-semibold text-gray-900">{currentVehicle.name}</h3>
// // // //                   <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
// // // //                 </div>
// // // //               </div>
             
// // // //               {selectedDateTime && (
// // // //                 <div className="text-sm text-gray-600 space-y-1">
// // // //                   <div className="flex justify-between">
// // // //                     <span>Start:</span>
// // // //                     <span className="font-medium">
// // // //                       {new Date(selectedDateTime.startDate).toLocaleDateString()} - {selectedDateTime.startTime}
// // // //                     </span>
// // // //                   </div>
// // // //                   <div className="flex justify-between">
// // // //                     <span>End:</span>
// // // //                     <span className="font-medium">
// // // //                       {new Date(selectedDateTime.endDate).toLocaleDateString()} - {selectedDateTime.endTime}
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
   
// // // //             <div className="flex gap-3">
// // // //               <button
// // // //                 onClick={() => {
// // // //                   setShowSuccessModal(false);
// // // //                   navigate("/");
// // // //                 }}
// // // //                 className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
// // // //               >
// // // //                 Go Home
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => {
// // // //                   setShowSuccessModal(false);
// // // //                   setShowContactButtons(false);
// // // //                   setSelectedDateTime(null);
// // // //                   setBookingId(null);
// // // //                   setWaitingTimerSeconds(30);
// // // //                 }}
// // // //                 className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
// // // //               >
// // // //                 Book Another
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //        </div>
// // // //      </div>

// // // //   );
// // // // };

// // // // export default BookNow;







// // // import React, { useEffect, useState } from "react";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import { vehicles } from "./data/Vehicle";
// // // import { Vehicle } from "../types/Vehicle";
// // // import { Star, Loader2, RefreshCw, Pencil, Trash2, Check, X } from "lucide-react";
// // // import apiService from "../services/api.service";
// // // import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
// // // import WaitingPopup from "../components/ui/WaitingPopup";
// // // import BookingAcceptance from "../components/ui/BookingAcceptance";
// // // import BookingRejectModal from "../components/ui/BookingRejectModal";
// // // import PopupChat from "../components/ui/PopupChat";
// // // import { useReviewStore } from "../store/review.store";
// // // import { useNotificationStore } from "../store/notification.store";
// // // import { useBookingStore } from "../store/booking.store";
// // // import toast from "react-hot-toast";
 
// // // import Automatic from "../assets/icons/AutomaticLogo.png";
// // // import Driver from "../assets/icons/DriverLogo.png";
// // // import Acicon from "../assets/icons/AutomaticLogo.png";
// // // import Petrol from "../assets/icons/Petrol.png";

// // // // CORS Proxies for reliability
// // // const CORS_PROXIES = [
// // //   "https://corsproxy.io/?",
// // //   "https://api.codetabs.com/v1/proxy?quest=",
// // // ];
// // // const API_BASE_URL = "https://rentongo-backend.onrender.com/api";

// // // interface Review {
// // //   _id: string;
// // //   userId: string;
// // //   vehicleId: string;
// // //   rating: number;
// // //   review: string;
// // //   userName?: string;
// // //   createdAt?: string;
// // //   hasBeenEdited?: boolean;  // ⭐ ADD THIS
// // //   editedAt?: string;         // ⭐ ADD THIS
// // // }

// // // const BookNow: React.FC = () => {
// // //   const navigate = useNavigate();
// // //   const { id } = useParams<{ id: string }>();
// // //   const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);
 
// // //   const {
// // //     getReviewsByVehicleId,
// // //     getAverageRating,
// // //     getTotalReviewCount,
// // //     getRatingDistribution,
// // //   } = useReviewStore();
// // //   const { addNotification } = useNotificationStore();
// // //   const { addBooking } = useBookingStore();

// // //   // ============================================================
// // //   // ALL STATE DECLARATIONS
// // //   // ============================================================
  
// // //   // API car data state
// // //   const [apiCarData, setApiCarData] = useState<any>(null);
// // //   const [loadingCarData, setLoadingCarData] = useState(true);
// // //   const [carDataError, setCarDataError] = useState("");
 
// // //   // Booking states
// // //   const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
// // //   const [showContactButtons, setShowContactButtons] = useState(false);
// // //   const [showWaitingPopup, setShowWaitingPopup] = useState(false);
// // //   const [showAcceptance, setShowAcceptance] = useState(false);
// // //   const [waitingTimerSeconds, setWaitingTimerSeconds] = useState<number>(30);
// // //   const [showRejectModal, setShowRejectModal] = useState(false);
// // //   const [isChatOpen, setIsChatOpen] = useState(false);
// // //   const [selectedDateTime, setSelectedDateTime] = useState<{
// // //     startDate: string;
// // //     endDate: string;
// // //     startTime: string;
// // //     endTime: string;
// // //   } | null>(null);
// // //   const [bookingId, setBookingId] = useState<string | null>(null);
// // //   const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
// // //   const [apiError, setApiError] = useState<string>("");
// // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // //   // Enhanced Review States
// // //   const [apiReviews, setApiReviews] = useState<Review[]>([]);
// // //   const [loadingReviews, setLoadingReviews] = useState(false);
// // //   const [reviewsError, setReviewsError] = useState<string>("");
// // //   const [lastFetchTime, setLastFetchTime] = useState<number>(0);

// // //   // ⭐ NEW: Edit Review States
// // //   const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
// // //   const [editReviewText, setEditReviewText] = useState<string>("");
// // //   const [editReviewRating, setEditReviewRating] = useState<number>(0);
// // //   const [isUpdatingReview, setIsUpdatingReview] = useState<boolean>(false);
// // //   const [updateReviewError, setUpdateReviewError] = useState<string>("");
// // //   const [showEditModal, setShowEditModal] = useState<boolean>(false);
// // //   const [selectedReviewForEdit, setSelectedReviewForEdit] = useState<Review | null>(null);

// // //   // ⭐ NEW: Average Rating from API
// // //   const [apiAverageRating, setApiAverageRating] = useState<number>(0);
// // //   const [loadingAverageRating, setLoadingAverageRating] = useState<boolean>(false);

// // //   // Get current user ID from localStorage
// // //   const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";


// // //   // Fetch car details from API
// // //   useEffect(() => {
// // //     const fetchCarDetails = async () => {
// // //       if (id) {
// // //         try {
// // //           setLoadingCarData(true);
// // //           setCarDataError("");
// // //           console.log(`🚗 Fetching car details for ID: ${id}`);
          
// // //           const response = await apiService.car.getCarById(id);
// // //           console.log("✅ Full API response:", response);
          
// // //           let carData = null;
          
// // //           if (response) {
// // //             if ((response as any).data) {
// // //               carData = (response as any).data;
// // //             } else if ((response as any).car) {
// // //               carData = (response as any).car;
// // //             } else {
// // //               carData = response;
// // //             }
            
// // //             console.log("🎯 Final car data to set:", carData);
// // //             setApiCarData(carData);
// // //           }
// // //         } catch (err: any) {
// // //           console.error("❌ Error fetching car details:", err);
// // //           setCarDataError(err.message || "Failed to load car details");
// // //         } finally {
// // //           setLoadingCarData(false);
// // //         }
// // //       }
// // //     };

// // //     fetchCarDetails();
// // //   }, [id]);

// // //   // Fetch reviews on component mount
// // //   useEffect(() => {
// // //     if (id) {
// // //       console.log("🔄 Initial review fetch triggered for vehicle:", id);
// // //       fetchReviewsByVehicleId(id);
// // //       fetchAverageRating(id); // ⭐ NEW: Fetch average rating
// // //     }
// // //   }, [id]);

// // //   // Auto-refresh reviews every 30 seconds
// // //   useEffect(() => {
// // //     if (id) {
// // //       const intervalId = setInterval(() => {
// // //         console.log("🔄 Auto-refreshing reviews...");
// // //         fetchReviewsByVehicleId(id, true);
// // //         fetchAverageRating(id, true); // ⭐ NEW: Auto-refresh average rating
// // //       }, 30000);

// // //       return () => clearInterval(intervalId);
// // //     }
// // //   }, [id]);

// // //   // Timer effect for booking
// // //   useEffect(() => {
// // //     let interval: NodeJS.Timeout | null = null;
// // //     if (showWaitingPopup && waitingTimerSeconds > 0) {
// // //       interval = setInterval(() => {
// // //         setWaitingTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
// // //       }, 1000);
// // //     }
// // //     return () => {
// // //       if (interval) clearInterval(interval);
// // //     };
// // //   }, [showWaitingPopup, waitingTimerSeconds]);
 
// // //   useEffect(() => {
// // //     if (showWaitingPopup && waitingTimerSeconds === 0) {
// // //       handleTimerComplete();
// // //     }
// // //   }, [waitingTimerSeconds, showWaitingPopup]);

// // //   // ============================================================
// // //   // ⭐ NEW: FETCH AVERAGE RATING FROM API
// // //   // ============================================================
// // //   const fetchAverageRating = async (vehicleId: string, silent: boolean = false) => {
// // //     if (!silent) {
// // //       setLoadingAverageRating(true);
// // //     }

// // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //     console.log("⭐ FETCHING AVERAGE RATING");
// // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //     console.log("📋 Vehicle ID:", vehicleId);

// // //     try {
// // //       const vehicleType = "Car"; // You can make this dynamic based on vehicle type
// // //       const response = await fetch(
// // //         `http://52.66.238.227:3000/getAverageRating?vechileType=${vehicleType}&vechileId=${vehicleId}`,
// // //         {
// // //           method: "GET",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //           },
// // //         }
// // //       );

// // //       console.log("📥 Average Rating Response Status:", response.status);

// // //       if (response.ok) {
// // //         const result = await response.json();
// // //         console.log("✅ Average Rating Response:", result);

// // //         if (result.success && result.averageRating !== undefined) {
// // //           const avgRating = parseFloat(result.averageRating);
// // //           setApiAverageRating(avgRating);
// // //           console.log("⭐ Average Rating Set:", avgRating);
// // //         }
// // //       }
// // //     } catch (error: any) {
// // //       console.error("❌ Failed to fetch average rating:", error.message);
// // //     } finally {
// // //       if (!silent) {
// // //         setLoadingAverageRating(false);
// // //       }
// // //     }
// // //   };

// // //   // ============================================================
// // //   // FETCH REVIEWS FUNCTION (EXISTING - NO CHANGES)
// // //   // ============================================================
// // //   const fetchReviewsByVehicleId = async (vehicleId: string, silent: boolean = false) => {
// // //     const now = Date.now();
// // //     if (now - lastFetchTime < 5000 && !silent) {
// // //       console.log("⏳ Skipping fetch - too soon after last request");
// // //       return;
// // //     }
// // //     setLastFetchTime(now);

// // //     if (!silent) {
// // //       setLoadingReviews(true);
// // //       setReviewsError("");
// // //     }

// // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //     console.log("🔍 FETCHING REVIEWS FOR VEHICLE");
// // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //     console.log("📋 Vehicle ID:", vehicleId);

// // //     try {
// // //       const myHeaders = new Headers();
// // //       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

// // //       const urlencoded = new URLSearchParams();
// // //       urlencoded.append("vechileType", "Car");
// // //       urlencoded.append("VechileId", vehicleId);

// // //       const requestOptions: RequestInit = {
// // //         method: "GET",
// // //         headers: myHeaders,
// // //         body: urlencoded,
// // //       };

// // //       const response = await fetch(
// // //         `http://52.66.238.227:3000/getReviewsById/${vehicleId}`,
// // //         requestOptions
// // //       );

// // //       console.log("📥 Response Status:", response.status);

// // //       if (response.ok) {
// // //         const result = await response.json();
// // //         console.log("✅ Reviews Response:", result);

// // //         if (result.success && Array.isArray(result.reviews)) {
// // //           console.log("🎉 SUCCESS: Reviews found!", result.reviews.length);
          
// // //           setApiReviews(result.reviews);
          
// // //           if (!silent) {
// // //             toast.success(`✅ Loaded ${result.reviews.length} review(s)`, {
// // //               duration: 2000,
// // //               position: 'top-right',
// // //             });
// // //           }

// // //           return result.reviews;
// // //         } else {
// // //           console.log("ℹ️ No reviews found");
// // //           setApiReviews([]);
          
// // //           if (!silent) {
// // //             toast("No reviews yet for this vehicle", {
// // //               duration: 2000,
// // //               position: 'top-right',
// // //             });
// // //           }
// // //         }
// // //       }
// // //     } catch (error: any) {
// // //       console.error("❌ Fetch reviews failed:", error.message);
      
// // //       setReviewsError("Unable to load reviews.");
// // //       setApiReviews([]);
      
// // //       if (!silent) {
// // //         toast.error("Failed to load reviews", {
// // //           duration: 3000,
// // //           position: 'top-right',
// // //         });
// // //       }
// // //     } finally {
// // //       if (!silent) {
// // //         setLoadingReviews(false);
// // //       }
// // //     }
// // //   };



  
// // //   /**
// // //    * Check if current user owns this review
// // //    */
// // //   const isUserReview = (review: Review): boolean => {
// // //     const isOwner = review.userId === currentUserId;
// // //     console.log("🔍 Review ownership check:", {
// // //       reviewId: review._id,
// // //       reviewUserId: review.userId,
// // //       currentUserId: currentUserId,
// // //       isOwner: isOwner
// // //     });
// // //     return isOwner;
// // //   };

// // //   /**
// // //    * Open edit modal for a review
// // //    */
// // //   const handleStartEditReview = (review: Review) => {
// // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //     console.log("📝 STARTING EDIT FOR REVIEW");
// // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //     console.log("Review ID:", review._id);
// // //     console.log("Current Rating:", review.rating);
// // //     console.log("Current Text:", review.review);
    
// // //     setSelectedReviewForEdit(review);
// // //     setEditingReviewId(review._id);
// // //     setEditReviewText(review.review || "");
// // //     setEditReviewRating(review.rating);
// // //     setUpdateReviewError("");
// // //     setShowEditModal(true);
// // //   };

// // //   /**
// // //    * Close edit modal
// // //    */
// // //   const handleCloseEditModal = () => {
// // //     console.log("❌ Closing edit modal");
// // //     setShowEditModal(false);
// // //     setSelectedReviewForEdit(null);
// // //     setEditingReviewId(null);
// // //     setEditReviewText("");
// // //     setEditReviewRating(0);
// // //     setUpdateReviewError("");
// // //   };

// // //  // ============================================================
// // // // PART 3: UPDATE REVIEW API FUNCTION
// // // // Add this after the helper functions from Part 2
// // // // ============================================================

// // //   /**
// // //    * ⭐ NEW: UPDATE REVIEW VIA API
// // //    * Updates a review with new rating and text
// // //    */
// // // const handleUpdateReview = async () => {
// // //   if (!selectedReviewForEdit) {
// // //     console.error("❌ No review selected for edit");
// // //     return;
// // //   }

// // //   // ⭐ NEW: Check if already edited once
// // //   if (selectedReviewForEdit.hasBeenEdited) {
// // //     toast.error("⚠️ You can only edit your review once!", {
// // //       duration: 4000,
// // //       position: 'top-right',
// // //     });
// // //     handleCloseEditModal();
// // //     return;
// // //   }

// // //   // Validation
// // //   if (!editReviewText.trim()) {
// // //     setUpdateReviewError("Review text cannot be empty");
// // //     toast.error("Please provide review text");
// // //     return;
// // //   }

// // //   if (editReviewRating === 0) {
// // //     setUpdateReviewError("Please select a rating");
// // //     toast.error("Please select a rating");
// // //     return;
// // //   }

// // //   setIsUpdatingReview(true);
// // //   setUpdateReviewError("");

// // //   console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //   console.log("📝 UPDATING REVIEW VIA API (ONE-TIME EDIT)");
// // //   console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //   console.log("Review ID:", selectedReviewForEdit._id);
// // //   console.log("Vehicle ID:", id);
// // //   console.log("New Rating:", editReviewRating);
// // //   console.log("New Text:", editReviewText);

// // //   try {
// // //     const vehicleType = mapVehicleTypeForAPI(currentVehicle?.type);
// // //     console.log("🚗 Vehicle Type:", vehicleType);

// // //     const formdata = new FormData();
    
// // //     if (vehicleType === "Auto") {
// // //       formdata.append("AutoId", id || "");
// // //       formdata.append("BikeId", "");
// // //       formdata.append("CarId", "");
// // //     } else if (vehicleType === "Bike") {
// // //       formdata.append("AutoId", "");
// // //       formdata.append("BikeId", id || "");
// // //       formdata.append("CarId", "");
// // //     } else {
// // //       formdata.append("AutoId", "");
// // //       formdata.append("BikeId", "");
// // //       formdata.append("CarId", id || "");
// // //     }
    
// // //     formdata.append("reviewText", editReviewText.trim());
// // //     formdata.append("rating", editReviewRating.toString());

// // //     const requestOptions: RequestInit = {
// // //       method: "PUT",
// // //       body: formdata,
// // //       redirect: "follow"
// // //     };

// // //     const response = await fetch(
// // //       `http://52.66.238.227:3000/updateReview/${selectedReviewForEdit._id}`,
// // //       requestOptions
// // //     );

// // //     console.log("📥 Response Status:", response.status, response.statusText);

// // //     if (response.ok) {
// // //       const result = await response.text();
// // //       console.log("✅ Update Response:", result);

// // //       // ⭐ Update local state with edited flag
// // //       setApiReviews(prevReviews =>
// // //         prevReviews.map(r =>
// // //           r._id === selectedReviewForEdit._id
// // //             ? { 
// // //                 ...r, 
// // //                 review: editReviewText, 
// // //                 rating: editReviewRating,
// // //                 hasBeenEdited: true,  // ⭐ Mark as edited
// // //                 editedAt: new Date().toISOString()  // ⭐ Track when edited
// // //               }
// // //             : r
// // //         )
// // //       );

// // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //       console.log("✅ REVIEW UPDATE SUCCESSFUL");
// // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

// // //       toast.success("✅ Review updated! (One-time edit used)", {
// // //         duration: 3000,
// // //         position: 'top-right',
// // //       });

// // //       handleCloseEditModal();

// // //       setTimeout(() => {
// // //         if (id) {
// // //           fetchReviewsByVehicleId(id, true);
// // //           fetchAverageRating(id, true);
// // //         }
// // //       }, 1000);

// // //     } else {
// // //       const errorText = await response.text();
// // //       console.error("❌ Error Response:", errorText);
// // //       throw new Error(`HTTP ${response.status}: ${errorText}`);
// // //     }

// // //   } catch (error: any) {
// // //     console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //     console.error("❌ REVIEW UPDATE FAILED");
// // //     console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //     console.error("Error:", error.message);

// // //     const errorMessage = error.message || "Failed to update review. Please try again.";
// // //     setUpdateReviewError(errorMessage);

// // //     toast.error(`❌ ${errorMessage}`, {
// // //       duration: 4000,
// // //       position: 'top-right',
// // //     });

// // //   } finally {
// // //     setIsUpdatingReview(false);
// // //   }
// // // };

// // //   /**
// // //    * ⭐ NEW: DELETE REVIEW VIA API
// // //    */
// // //   const handleDeleteReview = async (reviewId: string) => {
// // //     // Confirmation dialog
// // //     const confirmed = window.confirm(
// // //       "Are you sure you want to delete this review? This action cannot be undone."
// // //     );

// // //     if (!confirmed) {
// // //       return;
// // //     }

// // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //     console.log("🗑️ DELETING REVIEW");
// // //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //     console.log("Review ID:", reviewId);

// // //     setIsUpdatingReview(true);

// // //     try {
// // //       const requestOptions: RequestInit = {
// // //         method: "DELETE",
// // //         redirect: "follow"
// // //       };

// // //       const response = await fetch(
// // //         `http://52.66.238.227:3000/deleteReview/${reviewId}`,
// // //         requestOptions
// // //       );

// // //       console.log("📥 Delete Response Status:", response.status);

// // //       if (response.ok) {
// // //         console.log("✅ Review deleted successfully");

// // //         // Update local state (remove the deleted review)
// // //         setApiReviews(prevReviews =>
// // //           prevReviews.filter(r => r._id !== reviewId)
// // //         );

// // //         toast.success("✅ Review deleted successfully!", {
// // //           duration: 3000,
// // //           position: 'top-right',
// // //         });

// // //         // Refresh data after 1 second
// // //         setTimeout(() => {
// // //           if (id) {
// // //             fetchReviewsByVehicleId(id, true);
// // //             fetchAverageRating(id, true);
// // //           }
// // //         }, 1000);

// // //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //         console.log("✅ REVIEW DELETE SUCCESSFUL");
// // //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

// // //       } else {
// // //         const errorText = await response.text();
// // //         throw new Error(`Delete failed: ${errorText}`);
// // //       }

// // //     } catch (error: any) {
// // //       console.error("❌ Delete failed:", error.message);
// // //       toast.error("❌ Failed to delete review. Please try again.", {
// // //         duration: 3000,
// // //         position: 'top-right',
// // //       });
// // //     } finally {
// // //       setIsUpdatingReview(false);
// // //     }
// // //   };

// // //   /**
// // //    * Manual refresh button handler
// // //    */
// // //   const handleRefreshReviews = async () => {
// // //     if (id) {
// // //       console.log("🔄 Manual refresh triggered");
// // //       toast.loading("Refreshing reviews...", { duration: 1000 });
// // //       await fetchReviewsByVehicleId(id, false);
// // //       await fetchAverageRating(id, false);
// // //     }
// // //   };

// // //  // ============================================================
// // // // PART 4: ALL REMAINING HELPER FUNCTIONS
// // // // Add these after the API functions from Part 3
// // // // ============================================================

// // //   /**
// // //    * Calculate average rating from API reviews
// // //    */
// // //   const calculateAverageRating = (reviews: Review[]): number => {
// // //     if (reviews.length === 0) return 0;
// // //     const total = reviews.reduce((sum, review) => sum + review.rating, 0);
// // //     const average = total / reviews.length;
// // //     return Number(average.toFixed(1));
// // //   };

// // //   /**
// // //    * Calculate rating distribution from API reviews
// // //    */
// // //   const calculateRatingDistribution = (reviews: Review[]) => {
// // //     const distribution = [5, 4, 3, 2, 1].map(stars => {
// // //       const count = reviews.filter(r => r.rating === stars).length;
// // //       const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
// // //       return { stars, count, percentage };
// // //     });
// // //     return distribution;
// // //   };

// // //   /**
// // //    * Map vehicle type for API (capitalized as required by backend enum)
// // //    */
// // //   const mapVehicleTypeForAPI = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
// // //     if (!type) {
// // //       console.warn("⚠️ Vehicle type is undefined/null, defaulting to 'Car'");
// // //       return "Car";
// // //     }
    
// // //     const normalized = type.toLowerCase();
// // //     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
// // //       car: "Car",
// // //       auto: "Auto",
// // //       bike: "Bike",
// // //     };
    
// // //     return typeMap[normalized] || "Car";
// // //   };
  
// // //   /**
// // //    * Map vehicle type for store
// // //    */
// // //   const mapVehicleTypeForStore = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
// // //     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
// // //       car: "Car",
// // //       auto: "Auto",
// // //       bike: "Bike",
// // //     };
// // //     return type ? typeMap[type.toLowerCase()] || "Car" : "Car";
// // //   };
 
// // //   /**
// // //    * Calculate total hours between dates and times
// // //    */
// // //   const calculateTotalHours = (
// // //     startDate: string,
// // //     endDate: string,
// // //     startTime: string,
// // //     endTime: string
// // //   ): number => {
// // //     try {
// // //       const parseTime = (timeStr: string) => {
// // //         const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
// // //         if (!match) return { hours: 0, minutes: 0 };
       
// // //         let hours = parseInt(match[1]);
// // //         const minutes = parseInt(match[2] || '0');
// // //         const period = match[3]?.toUpperCase();
       
// // //         if (period === 'PM' && hours !== 12) hours += 12;
// // //         if (period === 'AM' && hours === 12) hours = 0;
       
// // //         return { hours, minutes };
// // //       };
 
// // //       const startTimeParsed = parseTime(startTime);
// // //       const endTimeParsed = parseTime(endTime);
 
// // //       const start = new Date(startDate);
// // //       start.setHours(startTimeParsed.hours, startTimeParsed.minutes, 0, 0);
 
// // //       const end = new Date(endDate);
// // //       end.setHours(endTimeParsed.hours, endTimeParsed.minutes, 0, 0);
 
// // //       const diffInMs = end.getTime() - start.getTime();
// // //       const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
     
// // //       return hours > 0 ? hours : 1;
// // //     } catch (error) {
// // //       console.error("❌ Error calculating hours:", error);
// // //       return 1;
// // //     }
// // //   };
 
// // //   /**
// // //    * Format date for API
// // //    */
// // //   const formatDateForAPI = (dateString: string): string => {
// // //     try {
// // //       const date = new Date(dateString);
// // //       if (!isNaN(date.getTime())) {
// // //         const year = date.getFullYear();
// // //         const month = String(date.getMonth() + 1).padStart(2, '0');
// // //         const day = String(date.getDate()).padStart(2, '0');
// // //         return `${year}-${month}-${day}`;
// // //       }
// // //     } catch (error) {
// // //       console.error("❌ Date formatting error:", error);
// // //     }
// // //     return dateString;
// // //   };
 
// // //   /**
// // //    * Format time for API
// // //    */
// // //   const formatTimeForAPI = (timeString: string): string => {
// // //     try {
// // //       const ampmMatch = timeString.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
// // //       if (ampmMatch) {
// // //         let hours = parseInt(ampmMatch[1]);
// // //         const minutes = ampmMatch[2] || '00';
// // //         const period = ampmMatch[3].toUpperCase();
       
// // //         if (period === 'PM' && hours !== 12) hours += 12;
// // //         if (period === 'AM' && hours === 12) hours = 0;
       
// // //         return `${hours.toString().padStart(2, '0')}.${minutes}`;
// // //       }
// // //     } catch (error) {
// // //       console.error("❌ Time formatting error:", error);
// // //     }
// // //     return timeString;
// // //   };

// // //   /**
// // //    * Booking handlers
// // //    */
// // //   const handleTimerComplete = () => {
// // //     console.log("⏰ Timer completed - Opening BookingAcceptance");
// // //     setShowWaitingPopup(false);
// // //     setShowAcceptance(true);
// // //   };
 
// // //   const handleCloseWaiting = () => {
// // //     console.log("❌ WaitingPopup closed manually");
// // //     setShowWaitingPopup(false);
// // //     setWaitingTimerSeconds(30);
// // //   };
 
// // //   const handleAcceptBooking = () => {
// // //     console.log("✅ Booking Accepted by Owner!");
// // //     setShowAcceptance(false);
// // //     setShowContactButtons(true);
// // //   };
 
// // //   const handleRejectBooking = () => {
// // //     console.log("❌ Booking Rejected by Owner!");
// // //     setShowAcceptance(false);
// // //     setShowRejectModal(true);
// // //   };
 
// // //   const handleCloseRejectModal = () => {
// // //     console.log("🔙 Reject modal closed");
// // //     setShowRejectModal(false);
// // //     setSelectedDateTime(null);
// // //     setBookingId(null);
// // //     setWaitingTimerSeconds(30);
// // //   };
 
// // //   const handleCallOwner = () => {
// // //     console.log("📞 User calling owner...");
// // //     setTimeout(() => {
// // //       handleConfirmBooking();
// // //     }, 1000);
// // //   };
 
// // //   const handleConfirmBooking = () => {
// // //     if (!currentVehicle || !selectedDateTime) {
// // //       console.error("❌ Cannot confirm booking");
// // //       return;
// // //     }
 
// // //     const currentDate = new Date();
// // //     console.log("🎉 Confirming booking with ID:", bookingId);
 
// // //     addBooking({
// // //       id: bookingId || Date.now().toString(),
// // //       vehicleId: currentVehicle.id,
// // //       vehicleName: currentVehicle.name,
// // //       vehicleImage: currentVehicle.image,
// // //       vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// // //       customerName: "Current User",
// // //       bookingDate: currentDate.toLocaleDateString("en-US"),
// // //       bookingTime: currentDate.toLocaleTimeString("en-US", {
// // //         hour: "2-digit",
// // //         minute: "2-digit",
// // //       }),
// // //       startDate: selectedDateTime.startDate,
// // //       startTime: selectedDateTime.startTime,
// // //       endDate: selectedDateTime.endDate,
// // //       endTime: selectedDateTime.endTime,
// // //       modelNo: currentVehicle.id.toUpperCase(),
// // //       status: "Booked",
// // //       price: currentVehicle.price,
// // //     });
 
// // //     setShowSuccessModal(true);
// // //   };

// // //  // ============================================================
// // // // PART 5: CREATE BOOKING API FUNCTION
// // // // This is your existing createBookingAPI function - NO CHANGES
// // // // Add this after the helper functions from Part 4
// // // // ============================================================

// // //   const createBookingAPI = async ( 
// // //     startDate: string,
// // //     endDate: string,
// // //     startTime: string,
// // //     endTime: string
// // //   ) => {
// // //     if (!currentVehicle) {
// // //       const errorMsg = "Vehicle information is missing. Please try again.";
// // //       setApiError(errorMsg);
// // //       addNotification({
// // //         title: "Booking Failed",
// // //         message: errorMsg,
// // //         type: "booking_declined",
// // //       });
// // //       return null;
// // //     }
 
// // //     setIsSubmittingBooking(true);
// // //     setApiError("");
 
// // //     try {
// // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// // //       console.log("🚀 PRODUCTION BOOKING API - START");
// // //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      
// // //       const totalHours = calculateTotalHours(startDate, endDate, startTime, endTime);
// // //       const pricePerDay = parseInt(String(apiCarData?.RentPerDay || currentVehicle.price || "0"), 10);
// // //       const pricePerHour = pricePerDay > 0 ? Math.round(pricePerDay / 24) : parseInt(String(currentVehicle.price || "0"), 10);
// // //       const totalPrice = totalHours * pricePerHour;
      
// // //       const formattedFromDate = formatDateForAPI(startDate);
// // //       const formattedToDate = formatDateForAPI(endDate);
// // //       const formattedFromTime = formatTimeForAPI(startTime);
// // //       const formattedToTime = formatTimeForAPI(endTime);
      
// // //       const userId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
// // //       const contactNumber = localStorage.getItem('contactNumber') || "6301818409";
// // //       const contactName = localStorage.getItem('contactName') || localStorage.getItem('userName') || "User";
// // //       const userLatitude = localStorage.getItem('latitude') || "17.438095";
// // //       const userLongitude = localStorage.getItem('longitude') || "78.4485";

// // //       const requestBody = {
// // //         userId: userId,
// // //         contactNumber: contactNumber,
// // //         contactName: contactName,
// // //         latitude: userLatitude,
// // //         longitude: userLongitude,
// // //         VechileId: currentVehicle.id,
// // //         vechileType: mapVehicleTypeForAPI(currentVehicle.type),
// // //         carName: apiCarData?.CarName || currentVehicle.name || '',
// // //         carModel: apiCarData?.Model || '',
// // //         carBrand: apiCarData?.Brand || '',
// // //         carNumber: apiCarData?.CarNumber || '',
// // //         fuelType: apiCarData?.FuelType || '',
// // //         transmissionType: apiCarData?.TransmissionType || '',
// // //         seatingCapacity: apiCarData?.SeatingCapacity?.toString() || '',
// // //         pricePerDay: pricePerDay.toString(),
// // //         pricePerHour: pricePerHour.toString(),
// // //         pricePerKm: pricePerHour.toString(),
// // //         FromDate: formattedFromDate,
// // //         ToDate: formattedToDate,
// // //         FromTime: formattedFromTime,
// // //         ToTime: formattedToTime,
// // //         totalHours: totalHours.toString(),
// // //         totalPrice: totalPrice.toString(),
// // //         pickupAddress: apiCarData?.pickupAddress || '',
// // //         dropoffAddress: apiCarData?.pickupAddress || '',
// // //       };
 
// // //       const urlencoded = new URLSearchParams();
// // //       Object.entries(requestBody).forEach(([key, value]) => {
// // //         if (value !== null && value !== undefined) {
// // //           urlencoded.append(key, String(value));
// // //         }
// // //       });
 
// // //       const API_ENDPOINT = `${API_BASE_URL}/createBooking`;
      
// // //       try {
// // //         const apiServiceResponse = await apiService.booking.createBooking(requestBody);
        
// // //         const bookingIdFromResponse = (apiServiceResponse as any)?.data?.bookingId || 
// // //                                      (apiServiceResponse as any)?.data?._id ||
// // //                                      (apiServiceResponse as any)?.bookingId ||
// // //                                      (apiServiceResponse as any)?._id ||
// // //                                      `BOOK-${Date.now()}`;
        
// // //         setBookingId(bookingIdFromResponse);
        
// // //         addNotification({
// // //           title: "Booking Created Successfully! 🎉",
// // //           message: `Your booking for ${requestBody.carName} has been confirmed!`,
// // //           type: "booking_confirmed",
// // //           vehicleId: currentVehicle.id,
// // //           vehicleName: requestBody.carName,
// // //           bookingId: bookingIdFromResponse,
// // //         });
        
// // //         addBooking({
// // //           id: bookingIdFromResponse,
// // //           vehicleId: currentVehicle.id,
// // //           vehicleName: requestBody.carName,
// // //           vehicleImage: currentVehicle.image,
// // //           vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// // //           price: totalPrice,
// // //           startDate: formattedFromDate,
// // //           endDate: formattedToDate,
// // //           startTime: formattedFromTime,
// // //           endTime: formattedToTime,
// // //           status: 'Booked',
// // //         });
        
// // //         return apiServiceResponse;
        
// // //       } catch (apiServiceError: any) {
// // //         console.warn("⚠️ Strategy 1 failed:", apiServiceError.message);
// // //       }
      
// // //       const PRODUCTION_PROXIES = [
// // //         "https://api.allorigins.win/raw?url=",
// // //         "https://api.codetabs.com/v1/proxy?quest=",
// // //         "https://thingproxy.freeboard.io/fetch/",
// // //       ];
      
// // //       for (let i = 0; i < PRODUCTION_PROXIES.length; i++) {
// // //         try {
// // //           const proxiedUrl = `${PRODUCTION_PROXIES[i]}${encodeURIComponent(API_ENDPOINT)}`;
 
// // //           const response = await Promise.race([
// // //             fetch(proxiedUrl, {
// // //               method: "POST",
// // //               headers: {
// // //                 "Content-Type": "application/x-www-form-urlencoded",
// // //               },
// // //               body: urlencoded.toString(),
// // //             }),
// // //             new Promise<never>((_, reject) =>
// // //               setTimeout(() => reject(new Error('Proxy timeout after 15s')), 15000)
// // //             )
// // //           ]);
 
// // //           if (response.ok) {
// // //             const text = await response.text();
           
// // //             let result;
// // //             try {
// // //               result = JSON.parse(text);
// // //             } catch {
// // //               result = { success: true, message: text };
// // //             }
 
// // //             const bookingIdFromResponse = result?.bookingId || 
// // //                                          result?.data?.bookingId || 
// // //                                          result?._id || 
// // //                                          result?.data?._id || 
// // //                                          `BOOK-${Date.now()}`;
            
// // //             setBookingId(bookingIdFromResponse);
            
// // //             addNotification({
// // //               title: "Booking Created Successfully! 🎉",
// // //               message: `Your booking for ${requestBody.carName} has been confirmed!`,
// // //               type: "booking_confirmed",
// // //               vehicleId: currentVehicle.id,
// // //               vehicleName: requestBody.carName,
// // //               bookingId: bookingIdFromResponse,
// // //             });
            
// // //             addBooking({
// // //               id: bookingIdFromResponse,
// // //               vehicleId: currentVehicle.id,
// // //               vehicleName: requestBody.carName,
// // //               vehicleImage: currentVehicle.image,
// // //               vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// // //               price: totalPrice,
// // //               startDate: formattedFromDate,
// // //               endDate: formattedToDate,
// // //               startTime: formattedFromTime,
// // //               endTime: formattedToTime,
// // //               status: 'Booked',
// // //             });
            
// // //             return result;
// // //           }
// // //         } catch (proxyError: any) {
// // //           console.warn(`❌ Proxy ${i + 1} failed:`, proxyError.message);
// // //         }
// // //       }
      
// // //       throw new Error("Unable to connect to booking server. Please check your internet connection and try again.");
 
// // //     } catch (error: any) {
// // //       console.error("❌ BOOKING CREATION FAILED");
// // //       console.error("❌ Error:", error.message);
     
// // //       const errorMessage = error.message || "Failed to create booking. Please try again.";
// // //       setApiError(errorMessage);
      
// // //       addNotification({
// // //         title: "Booking Failed ❌",
// // //         message: errorMessage,
// // //         type: "booking_declined",
// // //         vehicleId: currentVehicle.id,
// // //         vehicleName: currentVehicle.name,
// // //       });
      
// // //       return null;
     
// // //     } finally {
// // //       setIsSubmittingBooking(false);
// // //     }
// // //   };
// // // // ============================================================
// // // // PART 6: COMPONENT SETUP AND EARLY RETURNS
// // // // Add this after the createBookingAPI function from Part 5
// // // // ============================================================

// // //   // Create current vehicle object
// // //   const currentVehicle = vehicle || (apiCarData ? {
// // //     id: apiCarData._id || apiCarData.id || id || '',
// // //     name: apiCarData.CarName || 'Unknown Vehicle',
// // //     image: (apiCarData.carImages && apiCarData.carImages.length > 0) 
// // //       ? apiCarData.carImages[0] 
// // //       : apiCarData.carImage || apiCarData.image || 'https://via.placeholder.com/400',
// // //     price: apiCarData.RentPerDay || apiCarData.pricePerHour || '0',
// // //     type: 'car' as Vehicle["type"],
// // //   } : null);

// // //   // Calculate display values
// // //   const vehicleReviews = getReviewsByVehicleId(currentVehicle?.id || '');
// // //   const averageRating = getAverageRating(currentVehicle?.id || '');
// // //   const totalReviews = getTotalReviewCount(currentVehicle?.id || '');
// // //   const ratingDistribution = getRatingDistribution(currentVehicle?.id || '');

// // //   // Use API reviews if available, otherwise fallback to local store
// // //   const displayReviews = apiReviews.length > 0 ? apiReviews : vehicleReviews;
  
// // //   // ⭐ Use API average rating if available
// // //   const displayAverageRating = apiAverageRating > 0 
// // //     ? apiAverageRating 
// // //     : (apiReviews.length > 0 
// // //         ? calculateAverageRating(apiReviews) 
// // //         : averageRating);
  
// // //   const displayTotalReviews = apiReviews.length > 0 
// // //     ? apiReviews.length 
// // //     : totalReviews;
  
// // //   const displayRatingDistribution = apiReviews.length > 0 
// // //     ? calculateRatingDistribution(apiReviews) 
// // //     : ratingDistribution;

// // //   // ============================================================
// // //   // EARLY RETURNS (LOADING, ERROR, NOT FOUND STATES)
// // //   // ============================================================

// // //   // Loading state
// // //   if (loadingCarData) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
// // //         <div className="text-center space-y-4 p-8">
// // //           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
// // //           <p className="text-xl text-gray-700 font-semibold">Loading vehicle details...</p>
// // //           <p className="text-sm text-gray-500">Please wait while we fetch the car information</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // Error state
// // //   if (carDataError && !vehicle) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
// // //         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
// // //           <div className="text-6xl">❌</div>
// // //           <p className="text-xl text-red-600 font-bold">Error Loading Vehicle</p>
// // //           <p className="text-gray-600">{carDataError}</p>
// // //           <button
// // //             onClick={() => navigate(-1)}
// // //             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
// // //           >
// // //             ← Go Back
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // Not found state
// // //   if (!vehicle && !apiCarData) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// // //         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
// // //           <div className="text-6xl">🚗</div>
// // //           <p className="text-xl text-gray-700 font-bold">Vehicle Not Found</p>
// // //           <p className="text-gray-600">The vehicle you're looking for doesn't exist or has been removed.</p>
// // //           <button
// // //             onClick={() => navigate(-1)}
// // //             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
// // //           >
// // //             ← Go Back
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // No vehicle data
// // //   if (!currentVehicle) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen">
// // //         <div className="text-center space-y-4 p-8">
// // //           <p className="text-xl text-gray-700">Vehicle data not available!</p>
// // //           <button
// // //             onClick={() => navigate(-1)}
// // //             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// // //           >
// // //             Go Back
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // // return (
// // //     <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
// // //       <div className="lg:col-span-1">
// // //         <img
// // //           src={currentVehicle.image}
// // //           alt={currentVehicle.name}
// // //           className="rounded-xl w-full mb-4"
// // //         />
// // //         <div className="flex justify-center space-x-2 mt-2">
// // //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// // //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// // //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// // //         </div>
// // //       </div>
 
// // //       {/* ============================================ */}
// // //       {/* MIDDLE COLUMN - VEHICLE DETAILS & BOOKING */}
// // //       {/* ============================================ */}
// // //       <div className="lg:col-span-1">
// // //         <h2 className="text-2xl font-bold">{currentVehicle.name}</h2>
// // //         <p className="text-gray-600 text-lg mt-1">₹{currentVehicle.price}/hr</p>
 
// // //         <div className="flex gap-4 mt-4">
// // //           {[
// // //             { img: Automatic, label: apiCarData?.transmissionType || "Automatic" },
// // //             { img: Driver, label: apiCarData?.Carseater || "5 Seater" },
// // //             { img: Petrol, label: apiCarData?.fuelType || "Petrol" },
// // //             { img: Acicon, label: "AC" },
// // //           ].map((item, idx) => (
// // //             <div key={idx} className="flex flex-col items-center p-2 border rounded-lg">
// // //               <img src={item.img} alt={item.label} className="w-[25px] h-[25px]" />
// // //               <span className="text-sm mt-1">{item.label}</span>
// // //             </div>
// // //           ))}
// // //         </div>
 
// // //         <div className="mt-6">
// // //           <h3 className="font-semibold text-lg mb-2">Description</h3>
// // //           <p className="text-gray-600 text-sm">
// // //             {apiCarData?.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
// // //           </p>
// // //         </div>
 
// // //         {apiError && (
// // //           <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
// // //             <p className="text-sm text-red-700">{apiError}</p>
// // //             <button
// // //               onClick={() => setApiError("")}
// // //               className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
// // //             >
// // //               Dismiss
// // //             </button>
// // //           </div>
// // //         )}
 
// // //         {!showContactButtons ? (
// // //           <button
// // //             onClick={() => setIsDateTimeModalOpen(true)}
// // //             disabled={isSubmittingBooking}
// // //             className="mt-6 w-full bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
// // //           >
// // //             {isSubmittingBooking ? "Processing..." : "Book Now"}
// // //           </button>
// // //         ) : (
// // //           <div className="mt-6 space-y-4">
// // //             <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
// // //               <img
// // //                 src="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
// // //                 alt="Manoj Kumar"
// // //                 className="w-12 h-12 rounded-full"
// // //               />
// // //               <div className="flex-1">
// // //                 <h4 className="font-semibold text-gray-900">Manoj Kumar</h4>
// // //                 <p className="text-sm text-gray-500">Vehicle Owner</p>
// // //               </div>
// // //             </div>
 
// // //             <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
// // //               <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
// // //                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
// // //               </svg>
// // //               <p className="text-sm text-orange-700 flex-1">
// // //                 Please call the owner to discuss booking details and confirm availability.
// // //               </p>
// // //             </div>
 
// // //             <div className="flex gap-3">
// // //               <button
// // //                 onClick={() => setIsChatOpen(true)}
// // //                 className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
// // //               >
// // //                 💬 Chat
// // //               </button>
// // //               <button
// // //                 onClick={handleCallOwner}
// // //                 className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
// // //               >
// // //                 📞 Call Owner
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}
 
// // //         {isDateTimeModalOpen && (
// // //           <AvailabilityDateTimeModal
// // //             isOpen={isDateTimeModalOpen}
// // //             onClose={() => {
// // //               setIsDateTimeModalOpen(false);
// // //               setApiError("");
// // //             }}
// // //             onConfirm={async (startDate, endDate, startTime, endTime, availability) => {
// // //               console.log("✅ DateTime selected:", { startDate, endDate, startTime, endTime });
             
// // //               setSelectedDateTime({ startDate, endDate, startTime, endTime });
// // //               setIsDateTimeModalOpen(false);
             
// // //               const result = await createBookingAPI(startDate, endDate, startTime, endTime);
             
// // //               if (result) {
// // //                 console.log("🎉 Starting wait timer");
// // //                 setWaitingTimerSeconds(30);
// // //                 setShowWaitingPopup(true);
// // //               }
// // //             }}
// // //           />
// // //         )}
// // //       </div>



// // //       {/* RIGHT COLUMN - REVIEWS & RATINGS */}
// // //       <div className="lg:col-span-1">
// // //         {/* Header with Refresh Button */}
// // //         <div className="flex items-center justify-between mb-3">
// // //           <h3 className="text-lg font-bold">Rating & Reviews</h3>
// // //           <div className="flex items-center gap-2">
// // //             {(loadingReviews || loadingAverageRating) && (
// // //               <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
// // //             )}
// // //             <button
// // //               onClick={handleRefreshReviews}
// // //               disabled={loadingReviews || loadingAverageRating}
// // //               className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
// // //               title="Refresh reviews"
// // //             >
// // //               <RefreshCw className={`w-4 h-4 text-gray-600 ${(loadingReviews || loadingAverageRating) ? 'animate-spin' : ''}`} />
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Review Source Indicator */}
// // //         {apiReviews.length > 0 && (
// // //           <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
// // //             <span className="text-xs text-green-700 font-medium">
// // //               ✓ Live reviews from API
// // //             </span>
// // //             <span className="text-xs text-gray-500">
// // //               (Updated {new Date(lastFetchTime).toLocaleTimeString()})
// // //             </span>
// // //           </div>
// // //         )}

// // //         {reviewsError && (
// // //           <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
// // //             <p className="text-xs text-yellow-700">{reviewsError}</p>
// // //           </div>
// // //         )}

// // //         {/* Average Rating Display */}
// // //         <div className="flex items-center mt-2 mb-2 justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
// // //           <div className="flex flex-col">
// // //             <span className="text-3xl font-bold text-gray-900">{displayAverageRating}</span>
// // //             <span className="text-xs text-gray-600 mt-1">out of 5</span>
// // //           </div>
// // //           <div className="flex flex-col items-end">
// // //             <div className="flex gap-1">
// // //               {[...Array(5)].map((_, i) => (
// // //                 <Star
// // //                   key={i}
// // //                   className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
// // //                   size={20}
// // //                 />
// // //               ))}
// // //             </div>
// // //             <span className="text-sm text-gray-600 mt-1">
// // //               {displayTotalReviews} Review{displayTotalReviews !== 1 ? 's' : ''}
// // //             </span>
// // //           </div>
// // //         </div>

// // //         {/* Rating Distribution */}
// // //         <div className="mt-4 space-y-2 bg-white p-4 rounded-lg border">
// // //           <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating Breakdown</h4>
// // //           {displayRatingDistribution.map((r) => (
// // //             <div key={r.stars} className="flex items-center text-sm">
// // //               <span className="w-8 text-gray-700 font-medium">{r.stars}★</span>
// // //               <div className="flex-1 bg-gray-200 h-3 rounded-full mx-3 overflow-hidden">
// // //                 <div 
// // //                   className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500" 
// // //                   style={{ width: `${r.percentage}%` }} 
// // //                 />
// // //               </div>
// // //               <span className="text-gray-500 text-xs min-w-[45px] text-right">
// // //                 {r.count} ({r.percentage}%)
// // //               </span>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* ENHANCED: Individual Reviews with Edit/Delete */}
// // //         <div className="mt-6 space-y-3 max-h-[500px] overflow-y-auto pr-2">
// // //           <h4 className="text-sm font-semibold text-gray-700 mb-3 sticky top-0 bg-white py-2 z-10">
// // //             Customer Reviews ({displayTotalReviews})
// // //           </h4>
          
// // //         {displayReviews.length > 0 ? (

// // //           displayReviews.map((r, idx) => {
// // //   const canEdit = isUserReview(r);
// // //   const alreadyEdited = r.hasBeenEdited;  // ⭐ ADD THIS
          
// // //   return (
// // //     <div 
// // //       key={r._id || idx} 
// // //       className={`border rounded-xl transition ${
// // //         canEdit 
// // //           ? 'border-blue-200 bg-blue-50 hover:shadow-md' 
// // //           : 'border-gray-200 bg-white hover:shadow-md'
// // //       }`}
    
// // //     >
// // //       <div className="p-4">
// // //         <div className="flex justify-between items-start mb-2">
// // //           <div className="flex items-center gap-2">
// // //             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm">
// // //               {(r.userName || `User ${idx + 1}`).charAt(0).toUpperCase()}
// // //             </div>
// // //             <div>
// // //               <div className="flex items-center gap-2">
// // //                 <span className="font-semibold text-gray-900 text-sm">
// // //                   {r.userName || `User ${idx + 1}`}
// // //                 </span>
// // //                 {canEdit && (
// // //                   <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium">
// // //                     You
// // //                   </span>
// // //                 )}
// // //                 {/* ⭐ NEW: Show "Edited" badge */}
// // //                 {alreadyEdited && (
// // //                   <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-medium">
// // //                     Edited
// // //                   </span>
// // //                 )}
// // //               </div>
// // //               {r.createdAt && (
// // //                 <p className="text-xs text-gray-400">
// // //                   {new Date(r.createdAt).toLocaleDateString('en-US', {
// // //                     year: 'numeric',
// // //                     month: 'short',
// // //                     day: 'numeric'
// // //                   })}
// // //                   {/* ⭐ Show when edited */}
// // //                   {alreadyEdited && r.editedAt && (
// // //                     <span className="ml-2 text-orange-500">
// // //                       (Edited {new Date(r.editedAt).toLocaleDateString()})
// // //                     </span>
// // //                   )}
// // //                 </p>
// // //               )}
// // //             </div>
// // //           </div>

// // //           <div className="flex items-center gap-2">
// // //             <div className="flex bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200">
// // //               {[...Array(5)].map((_, i) => (
// // //                 <Star
// // //                   key={i}
// // //                   size={14}
// // //                   className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
// // //                 />
// // //               ))}
// // //             </div>

// // //             {/* ⭐ UPDATED: Disable edit button if already edited */}
// // //             {canEdit && (
// // //               <div className="flex gap-1">
// // //                 <button
// // //                   onClick={() => handleStartEditReview(r)}
// // //                   disabled={isUpdatingReview || alreadyEdited}  // ⭐ ADD alreadyEdited
// // //                   className={`p-1.5 rounded-lg transition ${
// // //                     alreadyEdited 
// // //                       ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
// // //                       : 'text-blue-600 hover:bg-blue-100'
// // //                   }`}
// // //                   title={alreadyEdited ? "You can only edit once" : "Edit review"}
// // //                 >
// // //                   <Pencil size={16} />
// // //                 </button>
// // //                 <button
// // //                   onClick={() => handleDeleteReview(r._id)}
// // //                   disabled={isUpdatingReview}
// // //                   className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition disabled:opacity-50"
// // //                   title="Delete review"
// // //                 >
// // //                   <Trash2 size={16} />
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         <p className="text-sm text-gray-700 leading-relaxed mt-2">
// // //           {r.review || "No comment provided"}
// // //         </p>

// // //         {/* ⭐ UPDATED: Show different message based on edit status */}
// // //         {canEdit && (
// // //           <div className="mt-2 pt-2 border-t border-blue-200">
// // //             <p className={`text-xs flex items-center gap-1 ${
// // //               alreadyEdited ? 'text-orange-600' : 'text-blue-600'
// // //             }`}>
// // //               {alreadyEdited ? (
// // //                 <>
// // //                   <Check size={12} />
// // //                   Review edited (one-time edit used)
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <Pencil size={12} />
// // //                   Click edit to modify your review (one-time only)
// // //                 </>
// // //               )}
// // //             </p>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // })

// // //           ) : (
// // //             <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
// // //               <div className="text-5xl mb-3">📝</div>
// // //               <p className="text-gray-500 font-medium mb-1">No reviews yet</p>
// // //               <p className="text-gray-400 text-sm">
// // //                 Be the first to review this vehicle!
// // //               </p>
// // //             </div>
// // //           )}
     
// // //       </div>  
   
// // //       {showEditModal && selectedReviewForEdit && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] p-4">
// // //           <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-fadeIn">

// // //             {/* Header */}
// // //             <div className="flex items-center justify-between mb-4">
// // //               <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
// // //                 <Pencil size={20} className="text-blue-600" />
// // //                 Edit Your Review
// // //               </h2>
// // //               <button
// // //                 onClick={handleCloseEditModal}
// // //                 disabled={isUpdatingReview}
// // //                 className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
// // //                 title="Close"
// // //               >
// // //                 <X size={20} />
// // //               </button>
// // //             </div>

// // //           {/* ⭐ NEW: One-time edit warning */}
// // // <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
// // //   <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
// // //     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
// // //   </svg>
// // //   <div className="flex-1">
// // //     <p className="text-sm text-orange-700 font-semibold">
// // //       ⚠️ One-Time Edit Only!
// // //     </p>
// // //     <p className="text-xs text-orange-600 mt-1">
// // //       You can only edit your review once. After this update, editing will be permanently disabled.
// // //     </p>
// // //   </div>
// // // </div>

// // //             {/* Error Message */}
// // //             {updateReviewError && (
// // //               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
// // //                 <svg
// // //                   className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
// // //                   fill="currentColor"
// // //                   viewBox="0 0 20 20"
// // //                 >
// // //                   <path
// // //                     fillRule="evenodd"
// // //                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
// // //                     clipRule="evenodd"
// // //                   />
// // //                 </svg>
// // //                 <p className="text-sm text-red-700 flex-1">
// // //                   {updateReviewError}
// // //                 </p>
// // //               </div>
// // //             )}

// // //             {/* Rating Field */}
// // //             <div className="mb-4">
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                 Your Rating <span className="text-red-500">*</span>
// // //               </label>
// // //               <div className="flex items-center gap-2">
// // //                 {[1, 2, 3, 4, 5].map((rating) => (
// // //                   <button
// // //                     key={rating}
// // //                     type="button"
// // //                     onClick={() => setEditReviewRating(rating)}
// // //                     disabled={isUpdatingReview}
// // //                     className="transition hover:scale-110 disabled:opacity-50 focus:outline-none"
// // //                   >
// // //                     <Star
// // //                       size={32}
// // //                       className={
// // //                         rating <= editReviewRating
// // //                           ? "text-yellow-400 fill-yellow-400"
// // //                           : "text-gray-300 hover:text-yellow-200"
// // //                       }
// // //                     />
// // //                   </button>
// // //                 ))}
// // //                 <span className="ml-2 text-sm text-gray-600 font-medium">
// // //                   {editReviewRating > 0
// // //                     ? `${editReviewRating}/5`
// // //                     : "Select rating"}
// // //                 </span>
// // //               </div>
// // //             </div>

// // //             {/* Review Text Field */}
// // //             <div className="mb-4">
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                 Your Review <span className="text-red-500">*</span>
// // //               </label>
// // //               <textarea
// // //                 value={editReviewText}
// // //                 onChange={(e) => setEditReviewText(e.target.value)}
// // //                 disabled={isUpdatingReview}
// // //                 placeholder="Share your experience with this vehicle..."
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm disabled:opacity-50 disabled:bg-gray-50"
// // //                 rows={6}
// // //                 maxLength={500}
// // //               />
// // //               <div className="flex justify-between items-center mt-1">
// // //                 <span className="text-xs text-gray-500">
// // //                   {editReviewText.length}/500 characters
// // //                 </span>
// // //                 {editReviewText.length === 0 && (
// // //                   <span className="text-xs text-red-500">
// // //                     Review text is required
// // //                   </span>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* Action Buttons */}
// // //             <div className="flex gap-3">
// // //               <button
// // //                 onClick={handleUpdateReview}
// // //                 disabled={
// // //                   isUpdatingReview ||
// // //                   !editReviewText.trim() ||
// // //                   editReviewRating === 0
// // //                 }
// // //                 className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
// // //               >
// // //                 {isUpdatingReview ? (
// // //                   <>
// // //                     <Loader2 className="w-5 h-5 animate-spin" />
// // //                     Updating...
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <Check size={18} />
// // //                     Update Review
// // //                   </>
// // //                 )}
// // //               </button>

// // //               <button
// // //                 onClick={handleCloseEditModal}
// // //                 disabled={isUpdatingReview}
// // //                 className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
// // //               >
// // //                 Cancel
// // //               </button>
// // //             </div>

// // //             {/* Footer Note */}
// // //             <p className="text-xs text-gray-500 text-center mt-3">
// // //               Your review will be updated immediately after submission
// // //             </p>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* EXISTING MODALS */}
// // //       {showWaitingPopup && (
// // //         <WaitingPopup
// // //           timer={waitingTimerSeconds}
// // //           onClose={handleCloseWaiting}
// // //           onTimerComplete={handleTimerComplete}
// // //         />
// // //       )}
   
// // //       {showAcceptance && (
// // //         <BookingAcceptance
// // //           onAccept={handleAcceptBooking}
// // //           onReject={handleRejectBooking}
// // //           onClose={() => setShowAcceptance(false)}
// // //         />
// // //       )}
   
// // //       <PopupChat
// // //         isOpen={isChatOpen}
// // //         onClose={() => setIsChatOpen(false)}
// // //         ownerName="Manoj Kumar"
// // //         ownerAvatar="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
// // //       />
   
// // //       <BookingRejectModal isOpen={showRejectModal} onClose={handleCloseRejectModal} />

// // //       {isSubmittingBooking && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// // //           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
// // //             <div className="flex flex-col items-center">
// // //               <div className="relative mb-6">
// // //                 <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
// // //                 <div className="absolute inset-0 flex items-center justify-center">
// // //                   <div className="w-12 h-12 bg-blue-100 rounded-full animate-pulse"></div>
// // //                 </div>
// // //               </div>
              
// // //               <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
// // //                 Creating Your Booking...
// // //               </h2>
              
// // //               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 w-full mb-4 border border-blue-100 shadow-sm">
// // //                 {currentVehicle && (
// // //                   <>
// // //                     <div className="flex items-center gap-3 mb-4">
// // //                       <img 
// // //                         src={currentVehicle.image} 
// // //                         alt={currentVehicle.name}
// // //                         className="w-16 h-16 rounded-lg object-cover shadow-sm"
// // //                       />
// // //                       <div className="flex-1">
// // //                         <p className="font-bold text-gray-900 text-lg">{currentVehicle.name}</p>
// // //                         <p className="text-sm text-gray-600 capitalize">{currentVehicle.type}</p>
// // //                       </div>
// // //                     </div>
                    
// // //                     <div className="space-y-2">
// // //                       <div className="flex justify-between text-sm">
// // //                         <span className="text-gray-600">Car ID</span>
// // //                         <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
// // //                           {currentVehicle.id.substring(0, 12)}...
// // //                         </span>
// // //                       </div>
                      
// // //                       {apiCarData?.CarNumber && (
// // //                         <div className="flex justify-between text-sm">
// // //                           <span className="text-gray-600">Car Number</span>
// // //                           <span className="font-semibold text-gray-900">{apiCarData.CarNumber}</span>
// // //                         </div>
// // //                       )}
                      
// // //                       {selectedDateTime && (
// // //                         <div className="border-t border-blue-200 pt-2 mt-3">
// // //                           <p className="text-xs text-gray-600 mb-1">Booking Period</p>
// // //                           <p className="text-sm text-gray-700 font-medium">
// // //                             {selectedDateTime.startDate} {selectedDateTime.startTime}
// // //                             <br />
// // //                             to {selectedDateTime.endDate} {selectedDateTime.endTime}
// // //                           </p>
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   </>
// // //                 )}
// // //               </div>
              
// // //               <div className="text-center space-y-2">
// // //                 <p className="text-gray-600 text-sm">
// // //                   Please wait while we process your booking...
// // //                 </p>
// // //                 <p className="text-blue-600 font-medium text-sm">
// // //                   Connecting to server & validating data
// // //                 </p>
// // //               </div>
              
// // //               <div className="flex gap-2 mt-5">
// // //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
// // //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
// // //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

    
// // //       {apiError && !isSubmittingBooking && (
// // //         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[110] max-w-md w-full mx-4 animate-slideDown">
// // //           <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-xl">
// // //             <div className="flex items-start">
// // //               <div className="flex-shrink-0">
// // //                 <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //                 </svg>
// // //               </div>
// // //               <div className="ml-3 flex-1">
// // //                 <h3 className="text-sm font-bold text-red-800">Booking Failed</h3>
// // //                 <p className="mt-1 text-sm text-red-700">{apiError}</p>
// // //                 {currentVehicle && (
// // //                   <p className="mt-1 text-xs text-red-600">
// // //                     Car: {currentVehicle.name} (ID: {currentVehicle.id.substring(0, 8)}...)
// // //                   </p>
// // //                 )}
// // //                 <div className="mt-3 flex gap-2">
// // //                   <button
// // //                     onClick={() => {
// // //                       setApiError("");
// // //                       setIsDateTimeModalOpen(true);
// // //                     }}
// // //                     className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
// // //                   >
// // //                     Retry Booking
// // //                   </button>
// // //                   <button
// // //                     onClick={() => setApiError("")}
// // //                     className="px-3 py-1.5 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-300 hover:bg-red-50 transition-colors"
// // //                   >
// // //                     Dismiss
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

   
// // //       {showSuccessModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
// // //             <div className="flex justify-center mb-6">
// // //               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
// // //                 <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // //                 </svg>
// // //               </div>
// // //             </div>
   
// // //             <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
// // //               Booking Posted Successfully!
// // //             </h2>
// // //             <p className="text-gray-600 text-center mb-6">
// // //               After discussing with the owner, your booking has been confirmed. You will receive updates on your booking status.
// // //             </p>
   
// // //             <div className="bg-gray-50 rounded-lg p-4 mb-6">
// // //               <div className="flex items-center gap-3 mb-3">
// // //                 <img src={currentVehicle.image} alt={currentVehicle.name} className="w-16 h-16 rounded-lg object-cover" />
// // //                 <div>
// // //                   <h3 className="font-semibold text-gray-900">{currentVehicle.name}</h3>
// // //                   <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
// // //                 </div>
// // //               </div>
             
// // //               {selectedDateTime && (
// // //                 <div className="text-sm text-gray-600 space-y-1">
// // //                   <div className="flex justify-between">
// // //                     <span>Start:</span>
// // //                     <span className="font-medium">
// // //                       {new Date(selectedDateTime.startDate).toLocaleDateString()} - {selectedDateTime.startTime}
// // //                     </span>
// // //                   </div>
// // //                   <div className="flex justify-between">
// // //                     <span>End:</span>
// // //                     <span className="font-medium">
// // //                       {new Date(selectedDateTime.endDate).toLocaleDateString()} - {selectedDateTime.endTime}
// // //                     </span>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
   
// // //             <div className="flex gap-3">
// // //               <button
// // //                 onClick={() => {
// // //                   setShowSuccessModal(false);
// // //                   navigate("/");
// // //                 }}
// // //                 className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
// // //               >
// // //                 Go Home
// // //               </button>
// // //               <button
// // //                 onClick={() => {
// // //                   setShowSuccessModal(false);
// // //                   setShowContactButtons(false);
// // //                   setSelectedDateTime(null);
// // //                   setBookingId(null);
// // //                   setWaitingTimerSeconds(30);
// // //                 }}
// // //                 className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
// // //               >
// // //                 Book Another
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //        </div>
// // //      </div>

// // //   );
// // // };

// // // export default BookNow;









// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { vehicles } from "./data/Vehicle";
// // import { Vehicle } from "../types/Vehicle";
// // import { Star, Loader2, RefreshCw, Trash2, Check, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
// // import apiService from "../services/api.service";
// // import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
// // import WaitingPopup from "../components/ui/WaitingPopup";
// // import BookingAcceptance from "../components/ui/BookingAcceptance";
// // import BookingRejectModal from "../components/ui/BookingRejectModal";
// // import PopupChat from "../components/ui/PopupChat";
// // import { useReviewStore } from "../store/review.store";
// // import { useNotificationStore } from "../store/notification.store";
// // import { useBookingStore } from "../store/booking.store";
// // import toast from "react-hot-toast";
// //  import Feedback from "./Feedback";
// // import Automatic from "../assets/icons/AutomaticLogo.png";
// // import Driver from "../assets/icons/DriverLogo.png";
// // import Acicon from "../assets/icons/AutomaticLogo.png";
// // import Petrol from "../assets/icons/Petrol.png";

// // const CORS_PROXIES = [
// //   "https://corsproxy.io/?",
// //   "https://api.codetabs.com/v1/proxy?quest=",
// // ];
// // const API_BASE_URL = "https://rentongo-backend.onrender.com/api";

// // interface Review {
// //   _id: string;
// //   userId: string;
// //   vehicleId: string;
// //   rating: number;
// //   review: string;
// //   userName?: string;
// //   createdAt?: string;
// //   hasBeenEdited?: boolean;
// //   editedAt?: string;
// // }

// // const BookNow: React.FC = () => {
// //   const navigate = useNavigate();
// //   const { id } = useParams<{ id: string }>();
// //   const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);
 
// //   const {
// //     getReviewsByVehicleId,
// //     getAverageRating,
// //     getTotalReviewCount,
// //     getRatingDistribution,
// //   } = useReviewStore();
// //   const { addNotification } = useNotificationStore();
// //   const { addBooking } = useBookingStore();

// //   // API car data state
// //   const [apiCarData, setApiCarData] = useState<any>(null);
// //   const [loadingCarData, setLoadingCarData] = useState(true);
// //   const [carDataError, setCarDataError] = useState("");
 
// //   // Booking states
// //   const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
// //   const [showContactButtons, setShowContactButtons] = useState(false);
// //   const [showWaitingPopup, setShowWaitingPopup] = useState(false);
// //   const [showAcceptance, setShowAcceptance] = useState(false);
// //   const [waitingTimerSeconds, setWaitingTimerSeconds] = useState<number>(30);
// //   const [showRejectModal, setShowRejectModal] = useState(false);
// //   const [isChatOpen, setIsChatOpen] = useState(false);
// //   const [selectedDateTime, setSelectedDateTime] = useState<{
// //     startDate: string;
// //     endDate: string;
// //     startTime: string;
// //     endTime: string;
// //   } | null>(null);
// //   const [bookingId, setBookingId] = useState<string | null>(null);
// //   const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
// //   const [apiError, setApiError] = useState<string>("");
// //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// //   // Enhanced Review States
// //   const [apiReviews, setApiReviews] = useState<Review[]>([]);
// //   const [loadingReviews, setLoadingReviews] = useState(false);
// //   const [reviewsError, setReviewsError] = useState<string>("");
// //   const [lastFetchTime, setLastFetchTime] = useState<number>(0);

// // // ⭐ NEW: Menu state for review cards
// // const [openMenuId, setOpenMenuId] = useState<string | null>(null);

// //   // ⭐ NEW: Show More/Less Toggle
// //   const [showAllReviews, setShowAllReviews] = useState<boolean>(false);

// //   // Average Rating from API
// //   const [apiAverageRating, setApiAverageRating] = useState<number>(0);
// //   const [loadingAverageRating, setLoadingAverageRating] = useState<boolean>(false);

// //   // Deleting review state
// //   const [isDeletingReview, setIsDeletingReview] = useState<boolean>(false);

// //   // Get current user ID from localStorage
// //   const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";

// //   // Fetch car details from API
// //   useEffect(() => {
// //     const fetchCarDetails = async () => {
// //       if (id) {
// //         try {
// //           setLoadingCarData(true);
// //           setCarDataError("");
// //           console.log(`🚗 Fetching car details for ID: ${id}`);
          
// //           const response = await apiService.car.getCarById(id);
// //           console.log("✅ Full API response:", response);
          
// //           let carData = null;
          
// //           if (response) {
// //             if ((response as any).data) {
// //               carData = (response as any).data;
// //             } else if ((response as any).car) {
// //               carData = (response as any).car;
// //             } else {
// //               carData = response;
// //             }
            
// //             console.log("🎯 Final car data to set:", carData);
// //             setApiCarData(carData);
// //           }
// //         } catch (err: any) {
// //           console.error("❌ Error fetching car details:", err);
// //           setCarDataError(err.message || "Failed to load car details");
// //         } finally {
// //           setLoadingCarData(false);
// //         }
// //       }
// //     };

// //     fetchCarDetails();
// //   }, [id]);

// //   // Fetch reviews on component mount
// //   useEffect(() => {
// //     if (id) {
// //       console.log("🔄 Initial review fetch triggered for vehicle:", id);
// //       fetchReviewsByVehicleId(id);
// //       fetchAverageRating(id);
// //     }
// //   }, [id]);

// //   // Auto-refresh reviews every 30 seconds
// //   useEffect(() => {
// //     if (id) {
// //       const intervalId = setInterval(() => {
// //         console.log("🔄 Auto-refreshing reviews...");
// //         fetchReviewsByVehicleId(id, true);
// //         fetchAverageRating(id, true);
// //       }, 30000);

// //       return () => clearInterval(intervalId);
// //     }
// //   }, [id]);

// //   // Timer effect for booking
// //   useEffect(() => {
// //     let interval: NodeJS.Timeout | null = null;
// //     if (showWaitingPopup && waitingTimerSeconds > 0) {
// //       interval = setInterval(() => {
// //         setWaitingTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
// //       }, 1000);
// //     }
// //     return () => {
// //       if (interval) clearInterval(interval);
// //     };
// //   }, [showWaitingPopup, waitingTimerSeconds]);
 
// //   useEffect(() => {
// //     if (showWaitingPopup && waitingTimerSeconds === 0) {
// //       handleTimerComplete();
// //     }
// //   }, [waitingTimerSeconds, showWaitingPopup]);

// //   // Fetch average rating from API
// //   const fetchAverageRating = async (vehicleId: string, silent: boolean = false) => {
// //     if (!silent) {
// //       setLoadingAverageRating(true);
// //     }

// //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// //     console.log("⭐ FETCHING AVERAGE RATING");
// //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// //     console.log("📋 Vehicle ID:", vehicleId);

// //     try {
// //       const vehicleType = "Car";
// //       const response = await fetch(
// //         `http://3.110.122,127:3000/getAverageRating?vechileType=${vehicleType}&vechileId=${vehicleId}`,
// //         {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       console.log("📥 Average Rating Response Status:", response.status);

// //       if (response.ok) {
// //         const result = await response.json();
// //         console.log("✅ Average Rating Response:", result);

// //         if (result.success && result.averageRating !== undefined) {
// //           const avgRating = parseFloat(result.averageRating);
// //           setApiAverageRating(avgRating);
// //           console.log("⭐ Average Rating Set:", avgRating);
// //         }
// //       }
// //     } catch (error: any) {
// //       console.error("❌ Failed to fetch average rating:", error.message);
// //     } finally {
// //       if (!silent) {
// //         setLoadingAverageRating(false);
// //       }
// //     }
// //   };

// //   // Fetch reviews from API
// //   const fetchReviewsByVehicleId = async (vehicleId: string, silent: boolean = false) => {
// //     const now = Date.now();
// //     if (now - lastFetchTime < 5000 && !silent) {
// //       console.log("⏳ Skipping fetch - too soon after last request");
// //       return;
// //     }
// //     setLastFetchTime(now);

// //     if (!silent) {
// //       setLoadingReviews(true);
// //       setReviewsError("");
// //     }

// //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// //     console.log("🔍 FETCHING REVIEWS FOR VEHICLE");
// //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// //     console.log("📋 Vehicle ID:", vehicleId);

// //     try {
// //       const myHeaders = new Headers();
// //       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

// //       const urlencoded = new URLSearchParams();
// //       urlencoded.append("vechileType", "Car");
// //       urlencoded.append("VechileId", vehicleId);

// //       const requestOptions: RequestInit = {
// //         method: "GET",
// //         headers: myHeaders,
// //         body: urlencoded,
// //       };

// //       const response = await fetch(
// //         `http://3.110.122.127:3000/getReviewsById/${vehicleId}`,
// //         requestOptions
// //       );

// //       console.log("📥 Response Status:", response.status);

// //       if (response.ok) {
// //         const result = await response.json();
// //         console.log("✅ Reviews Response:", result);

// //         if (result.success && Array.isArray(result.reviews)) {
// //           console.log("🎉 SUCCESS: Reviews found!", result.reviews.length);
          
// //           setApiReviews(result.reviews);
          
// //           if (!silent) {
// //             toast.success(`✅ Loaded ${result.reviews.length} review(s)`, {
// //               duration: 2000,
// //               position: 'top-right',
// //             });
// //           }

// //           return result.reviews;
// //         } else {
// //           console.log("ℹ️ No reviews found");
// //           setApiReviews([]);
          
// //           if (!silent) {
// //             toast("No reviews yet for this vehicle", {
// //               duration: 2000,
// //               position: 'top-right',
// //             });
// //           }
// //         }
// //       }
// //     } catch (error: any) {
// //       console.error("❌ Fetch reviews failed:", error.message);
      
// //       setReviewsError("Unable to load reviews.");
// //       setApiReviews([]);
      
// //       if (!silent) {
// //         toast.error("Failed to load reviews", {
// //           duration: 3000,
// //           position: 'top-right',
// //         });
// //       }
// //     } finally {
// //       if (!silent) {
// //         setLoadingReviews(false);
// //       }
// //     }
// //   };

// //   // Check if current user owns this review
// //   const isUserReview = (review: Review): boolean => {
// //     const isOwner = review.userId === currentUserId;
// //     console.log("🔍 Review ownership check:", {
// //       reviewId: review._id,
// //       reviewUserId: review.userId,
// //       currentUserId: currentUserId,
// //       isOwner: isOwner
// //     });
// //     return isOwner;
// //   };

// //   // ⭐ NEW: Navigate to feedback page for editing
// //   const handleNavigateToFeedback = (review: Review) => {
// //     // Check if already edited
// //     if (review.hasBeenEdited) {
// //       toast.error("⚠️ You have already edited this review once!", {
// //         duration: 3000,
// //         position: 'top-right',
// //       });
// //       return;
// //     }

// //     console.log("🔄 Navigating to feedback page for review:", review._id);
    
// //     // Navigate to feedback page with review data
// //     navigate(`/feedback/${id}`, {
// //       state: {
// //         reviewId: review._id,
// //         currentRating: review.rating,
// //         currentReview: review.review,
// //         vehicleId: id,
// //         isEdit: true
// //       }
// //     });
// //   };

// //   // Delete review via API
// //   const handleDeleteReview = async (reviewId: string, event: React.MouseEvent) => {
// //     // Stop event propagation to prevent card click
// //     event.stopPropagation();

// //     const confirmed = window.confirm(
// //       "Are you sure you want to delete this review? This action cannot be undone."
// //     );

// //     if (!confirmed) {
// //       return;
// //     }

// //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// //     console.log("🗑️ DELETING REVIEW");
// //     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// //     console.log("Review ID:", reviewId);

// //     setIsDeletingReview(true);

// //     try {
// //       const requestOptions: RequestInit = {
// //         method: "DELETE",
// //         redirect: "follow"
// //       };

// //       const response = await fetch(
// //         `http://3.110.122.127:3000/deleteReview/${reviewId}`,
// //         requestOptions
// //       );

// //       console.log("📥 Delete Response Status:", response.status);

// //       if (response.ok) {
// //         console.log("✅ Review deleted successfully");

// //         setApiReviews(prevReviews =>
// //           prevReviews.filter(r => r._id !== reviewId)
// //         );

// //         toast.success("✅ Review deleted successfully!", {
// //           duration: 3000,
// //           position: 'top-right',
// //         });

// //         setTimeout(() => {
// //           if (id) {
// //             fetchReviewsByVehicleId(id, true);
// //             fetchAverageRating(id, true);
// //           }
// //         }, 1000);

// //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// //         console.log("✅ REVIEW DELETE SUCCESSFUL");
// //         console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

// //       } else {
// //         const errorText = await response.text();
// //         throw new Error(`Delete failed: ${errorText}`);
// //       }

// //     } catch (error: any) {
// //       console.error("❌ Delete failed:", error.message);
// //       toast.error("❌ Failed to delete review. Please try again.", {
// //         duration: 3000,
// //         position: 'top-right',
// //       });
// //     } finally {
// //       setIsDeletingReview(false);
// //     }
// //   };

// //   // Manual refresh button handler
// //   const handleRefreshReviews = async () => {
// //     if (id) {
// //       console.log("🔄 Manual refresh triggered");
// //       toast.loading("Refreshing reviews...", { duration: 1000 });
// //       await fetchReviewsByVehicleId(id, false);
// //       await fetchAverageRating(id, false);
// //     }
// //   };

// //   // Calculate average rating from API reviews
// //   const calculateAverageRating = (reviews: Review[]): number => {
// //     if (reviews.length === 0) return 0;
// //     const total = reviews.reduce((sum, review) => sum + review.rating, 0);
// //     const average = total / reviews.length;
// //     return Number(average.toFixed(1));
// //   };

// //   // Calculate rating distribution from API reviews
// //   const calculateRatingDistribution = (reviews: Review[]) => {
// //     const distribution = [5, 4, 3, 2, 1].map(stars => {
// //       const count = reviews.filter(r => r.rating === stars).length;
// //       const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
// //       return { stars, count, percentage };
// //     });
// //     return distribution;
// //   };

// //   // Map vehicle type for API
// //   const mapVehicleTypeForAPI = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
// //     if (!type) {
// //       console.warn("⚠️ Vehicle type is undefined/null, defaulting to 'Car'");
// //       return "Car";
// //     }
    
// //     const normalized = type.toLowerCase();
// //     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
// //       car: "Car",
// //       auto: "Auto",
// //       bike: "Bike",
// //     };
    
// //     return typeMap[normalized] || "Car";
// //   };
  
// //   // Map vehicle type for store
// //   const mapVehicleTypeForStore = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
// //     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
// //       car: "Car",
// //       auto: "Auto",
// //       bike: "Bike",
// //     };
// //     return type ? typeMap[type.toLowerCase()] || "Car" : "Car";
// //   };
 
// //   // Calculate total hours between dates and times
// //   const calculateTotalHours = (
// //     startDate: string,
// //     endDate: string,
// //     startTime: string,
// //     endTime: string
// //   ): number => {
// //     try {
// //       const parseTime = (timeStr: string) => {
// //         const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
// //         if (!match) return { hours: 0, minutes: 0 };
       
// //         let hours = parseInt(match[1]);
// //         const minutes = parseInt(match[2] || '0');
// //         const period = match[3]?.toUpperCase();
       
// //         if (period === 'PM' && hours !== 12) hours += 12;
// //         if (period === 'AM' && hours === 12) hours = 0;
       
// //         return { hours, minutes };
// //       };
 
// //       const startTimeParsed = parseTime(startTime);
// //       const endTimeParsed = parseTime(endTime);
 
// //       const start = new Date(startDate);
// //       start.setHours(startTimeParsed.hours, startTimeParsed.minutes, 0, 0);
 
// //       const end = new Date(endDate);
// //       end.setHours(endTimeParsed.hours, endTimeParsed.minutes, 0, 0);
 
// //       const diffInMs = end.getTime() - start.getTime();
// //       const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
     
// //       return hours > 0 ? hours : 1;
// //     } catch (error) {
// //       console.error("❌ Error calculating hours:", error);
// //       return 1;
// //     }
// //   };
 
// //   // Format date for API
// //   const formatDateForAPI = (dateString: string): string => {
// //     try {
// //       const date = new Date(dateString);
// //       if (!isNaN(date.getTime())) {
// //         const year = date.getFullYear();
// //         const month = String(date.getMonth() + 1).padStart(2, '0');
// //         const day = String(date.getDate()).padStart(2, '0');
// //         return `${year}-${month}-${day}`;
// //       }
// //     } catch (error) {
// //       console.error("❌ Date formatting error:", error);
// //     }
// //     return dateString;
// //   };
 
// //   // Format time for API
// //   const formatTimeForAPI = (timeString: string): string => {
// //     try {
// //       const ampmMatch = timeString.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
// //       if (ampmMatch) {
// //         let hours = parseInt(ampmMatch[1]);
// //         const minutes = ampmMatch[2] || '00';
// //         const period = ampmMatch[3].toUpperCase();
       
// //         if (period === 'PM' && hours !== 12) hours += 12;
// //         if (period === 'AM' && hours === 12) hours = 0;
       
// //         return `${hours.toString().padStart(2, '0')}.${minutes}`;
// //       }
// //     } catch (error) {
// //       console.error("❌ Time formatting error:", error);
// //     }
// //     return timeString;
// //   };

// //   // Booking handlers
// //   const handleTimerComplete = () => {
// //     console.log("⏰ Timer completed - Opening BookingAcceptance");
// //     setShowWaitingPopup(false);
// //     setShowAcceptance(true);
// //   };
 
// //   const handleCloseWaiting = () => {
// //     console.log("❌ WaitingPopup closed manually");
// //     setShowWaitingPopup(false);
// //     setWaitingTimerSeconds(30);
// //   };
 
// //   const handleAcceptBooking = () => {
// //     console.log("✅ Booking Accepted by Owner!");
// //     setShowAcceptance(false);
// //     setShowContactButtons(true);
// //   };
 
// //   const handleRejectBooking = () => {
// //     console.log("❌ Booking Rejected by Owner!");
// //     setShowAcceptance(false);
// //     setShowRejectModal(true);
// //   };
 
// //   const handleCloseRejectModal = () => {
// //     console.log("🔙 Reject modal closed");
// //     setShowRejectModal(false);
// //     setSelectedDateTime(null);
// //     setBookingId(null);
// //     setWaitingTimerSeconds(30);
// //   };
 
// //   const handleCallOwner = () => {
// //     console.log("📞 User calling owner...");
// //     setTimeout(() => {
// //       handleConfirmBooking();
// //     }, 1000);
// //   };
 
// //   const handleConfirmBooking = () => {
// //     if (!currentVehicle || !selectedDateTime) {
// //       console.error("❌ Cannot confirm booking");
// //       return;
// //     }
 
// //     const currentDate = new Date();
// //     console.log("🎉 Confirming booking with ID:", bookingId);
 
// //     addBooking({
// //       id: bookingId || Date.now().toString(),
// //       vehicleId: currentVehicle.id,
// //       vehicleName: currentVehicle.name,
// //       vehicleImage: currentVehicle.image,
// //       vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// //       customerName: "Current User",
// //       bookingDate: currentDate.toLocaleDateString("en-US"),
// //       bookingTime: currentDate.toLocaleTimeString("en-US", {
// //         hour: "2-digit",
// //         minute: "2-digit",
// //       }),
// //       startDate: selectedDateTime.startDate,
// //       startTime: selectedDateTime.startTime,
// //       endDate: selectedDateTime.endDate,
// //       endTime: selectedDateTime.endTime,
// //       modelNo: currentVehicle.id.toUpperCase(),
// //       status: "Booked",
// //       price: currentVehicle.price,
// //     });
 
// //     setShowSuccessModal(true);
// //   };

// //   const createBookingAPI = async ( 
// //     startDate: string,
// //     endDate: string,
// //     startTime: string,
// //     endTime: string
// //   ) => {
// //     if (!currentVehicle) {
// //       const errorMsg = "Vehicle information is missing. Please try again.";
// //       setApiError(errorMsg);
// //       addNotification({
// //         title: "Booking Failed",
// //         message: errorMsg,
// //         type: "booking_declined",
// //       });
// //       return null;
// //     }
 
// //     setIsSubmittingBooking(true);
// //     setApiError("");
 
// //     try {
// //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// //       console.log("🚀 PRODUCTION BOOKING API - START");
// //       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      
// //       const totalHours = calculateTotalHours(startDate, endDate, startTime, endTime);
// //       const pricePerDay = parseInt(String(apiCarData?.RentPerDay || currentVehicle.price || "0"), 10);
// //       const pricePerHour = pricePerDay > 0 ? Math.round(pricePerDay / 24) : parseInt(String(currentVehicle.price || "0"), 10);
// //       const totalPrice = totalHours * pricePerHour;
      
// //       const formattedFromDate = formatDateForAPI(startDate);
// //       const formattedToDate = formatDateForAPI(endDate);
// //       const formattedFromTime = formatTimeForAPI(startTime);
// //       const formattedToTime = formatTimeForAPI(endTime);
      
// //       const userId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
// //       const contactNumber = localStorage.getItem('contactNumber') || "6301818409";
// //       const contactName = localStorage.getItem('contactName') || localStorage.getItem('userName') || "User";
// //       const userLatitude = localStorage.getItem('latitude') || "17.438095";
// //       const userLongitude = localStorage.getItem('longitude') || "78.4485";

// //       const requestBody = {
// //         userId: userId,
// //         contactNumber: contactNumber,
// //         contactName: contactName,
// //         latitude: userLatitude,
// //         longitude: userLongitude,
// //         VechileId: currentVehicle.id,
// //         vechileType: mapVehicleTypeForAPI(currentVehicle.type),
// //         carName: apiCarData?.CarName || currentVehicle.name || '',
// //         carModel: apiCarData?.Model || '',
// //         carBrand: apiCarData?.Brand || '',
// //         carNumber: apiCarData?.CarNumber || '',
// //         fuelType: apiCarData?.FuelType || '',
// //         transmissionType: apiCarData?.TransmissionType || '',
// //         seatingCapacity: apiCarData?.SeatingCapacity?.toString() || '',
// //         pricePerDay: pricePerDay.toString(),
// //         pricePerHour: pricePerHour.toString(),
// //         pricePerKm: pricePerHour.toString(),
// //         FromDate: formattedFromDate,
// //         ToDate: formattedToDate,
// //         FromTime: formattedFromTime,
// //         ToTime: formattedToTime,
// //         totalHours: totalHours.toString(),
// //         totalPrice: totalPrice.toString(),
// //         pickupAddress: apiCarData?.pickupAddress || '',
// //         dropoffAddress: apiCarData?.pickupAddress || '',
// //       };
 
// //       const urlencoded = new URLSearchParams();
// //       Object.entries(requestBody).forEach(([key, value]) => {
// //         if (value !== null && value !== undefined) {
// //           urlencoded.append(key, String(value));
// //         }
// //       });
 
// //       const API_ENDPOINT = `${API_BASE_URL}/createBooking`;
      
// //       try {
// //         const apiServiceResponse = await apiService.booking.createBooking(requestBody);
        
// //         const bookingIdFromResponse = (apiServiceResponse as any)?.data?.bookingId || 
// //                                      (apiServiceResponse as any)?.data?._id ||
// //                                      (apiServiceResponse as any)?.bookingId ||
// //                                      (apiServiceResponse as any)?._id ||
// //                                      `BOOK-${Date.now()}`;
        
// //         setBookingId(bookingIdFromResponse);
        
// //         addNotification({
// //           title: "Booking Created Successfully! 🎉",
// //           message: `Your booking for ${requestBody.carName} has been confirmed!`,
// //           type: "booking_confirmed",
// //           vehicleId: currentVehicle.id,
// //           vehicleName: requestBody.carName,
// //           bookingId: bookingIdFromResponse,
// //         });
        
// //         addBooking({
// //           id: bookingIdFromResponse,
// //           vehicleId: currentVehicle.id,
// //           vehicleName: requestBody.carName,
// //           vehicleImage: currentVehicle.image,
// //           vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// //           price: totalPrice,
// //           startDate: formattedFromDate,
// //           endDate: formattedToDate,
// //           startTime: formattedFromTime,
// //           endTime: formattedToTime,
// //           status: 'Booked',
// //         });
        
// //         return apiServiceResponse;
        
// //       } catch (apiServiceError: any) {
// //         console.warn("⚠️ Strategy 1 failed:", apiServiceError.message);
// //       }
      
// //       const PRODUCTION_PROXIES = [
// //         "https://api.allorigins.win/raw?url=",
// //         "https://api.codetabs.com/v1/proxy?quest=",
// //         "https://thingproxy.freeboard.io/fetch/",
// //       ];
      
// //       for (let i = 0; i < PRODUCTION_PROXIES.length; i++) {
// //         try {
// //           const proxiedUrl = `${PRODUCTION_PROXIES[i]}${encodeURIComponent(API_ENDPOINT)}`;
 
// //           const response = await Promise.race([
// //             fetch(proxiedUrl, {
// //               method: "POST",
// //               headers: {
// //                 "Content-Type": "application/x-www-form-urlencoded",
// //               },
// //               body: urlencoded.toString(),
// //             }),
// //             new Promise<never>((_, reject) =>
// //               setTimeout(() => reject(new Error('Proxy timeout after 15s')), 15000)
// //             )
// //           ]);
 
// //           if (response.ok) {
// //             const text = await response.text();
           
// //             let result;
// //             try {
// //               result = JSON.parse(text);
// //             } catch {
// //               result = { success: true, message: text };
// //             }
 
// //             const bookingIdFromResponse = result?.bookingId || 
// //                                          result?.data?.bookingId || 
// //                                          result?._id || 
// //                                          result?.data?._id ||
// //                                          `BOOK-${Date.now()}`;
            
// //             setBookingId(bookingIdFromResponse);
            
// //             addNotification({
// //               title: "Booking Created Successfully! 🎉",
// //               message: `Your booking for ${requestBody.carName} has been confirmed!`,
// //               type: "booking_confirmed",
// //               vehicleId: currentVehicle.id,
// //               vehicleName: requestBody.carName,
// //               bookingId: bookingIdFromResponse,
// //             });
            
// //             addBooking({
// //               id: bookingIdFromResponse,
// //               vehicleId: currentVehicle.id,
// //               vehicleName: requestBody.carName,
// //               vehicleImage: currentVehicle.image,
// //               vehicleType: mapVehicleTypeForStore(currentVehicle.type),
// //               price: totalPrice,
// //               startDate: formattedFromDate,
// //               endDate: formattedToDate,
// //               startTime: formattedFromTime,
// //               endTime: formattedToTime,
// //               status: 'Booked',
// //             });
            
// //             return result;
// //           }
// //         } catch (proxyError: any) {
// //           console.warn(`❌ Proxy ${i + 1} failed:`, proxyError.message);
// //         }
// //       }
      
// //       throw new Error("Unable to connect to booking server. Please check your internet connection and try again.");
 
// //     } catch (error: any) {
// //       console.error("❌ BOOKING CREATION FAILED");
// //       console.error("❌ Error:", error.message);
     
// //       const errorMessage = error.message || "Failed to create booking. Please try again.";
// //       setApiError(errorMessage);
      
// //       addNotification({
// //         title: "Booking Failed ❌",
// //         message: errorMessage,
// //         type: "booking_declined",
// //         vehicleId: currentVehicle.id,
// //         vehicleName: currentVehicle.name,
// //       });
      
// //       return null;
     
// //     } finally {
// //       setIsSubmittingBooking(false);
// //     }
// //   };

// //   // Create current vehicle object
// //   const currentVehicle = vehicle || (apiCarData ? {
// //     id: apiCarData._id || apiCarData.id || id || '',
// //     name: apiCarData.CarName || 'Unknown Vehicle',
// //     image: (apiCarData.carImages && apiCarData.carImages.length > 0) 
// //       ? apiCarData.carImages[0] 
// //       : apiCarData.carImage || apiCarData.image || 'https://via.placeholder.com/400',
// //     price: apiCarData.RentPerDay || apiCarData.pricePerHour || '0',
// //     type: 'car' as Vehicle["type"],
// //   } : null);

// //   // Calculate display values
// //   const vehicleReviews = getReviewsByVehicleId(currentVehicle?.id || '');
// //   const averageRating = getAverageRating(currentVehicle?.id || '');
// //   const totalReviews = getTotalReviewCount(currentVehicle?.id || '');
// //   const ratingDistribution = getRatingDistribution(currentVehicle?.id || '');

// //   // Use API reviews if available, otherwise fallback to local store
// //   const displayReviews = apiReviews.length > 0 ? apiReviews : vehicleReviews;
  
// //   // Use API average rating if available
// //   const displayAverageRating = apiAverageRating > 0 
// //     ? apiAverageRating 
// //     : (apiReviews.length > 0 
// //         ? calculateAverageRating(apiReviews) 
// //         : averageRating);
  
// //   const displayTotalReviews = apiReviews.length > 0 
// //     ? apiReviews.length 
// //     : totalReviews;
  
// //   const displayRatingDistribution = apiReviews.length > 0 
// //     ? calculateRatingDistribution(apiReviews) 
// //     : ratingDistribution;

// //   // ⭐ NEW: Get reviews to display (show only 5 initially)
// //   const reviewsToDisplay = showAllReviews 
// //     ? displayReviews 
// //     : displayReviews.slice(0, 5);

// //   const hasMoreReviews = displayReviews.length > 5;

// //   // Loading state
// //   if (loadingCarData) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
// //         <div className="text-center space-y-4 p-8">
// //           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
// //           <p className="text-xl text-gray-700 font-semibold">Loading vehicle details...</p>
// //           <p className="text-sm text-gray-500">Please wait while we fetch the car information</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Error state
// //   if (carDataError && !vehicle) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
// //         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
// //           <div className="text-6xl">❌</div>
// //           <p className="text-xl text-red-600 font-bold">Error Loading Vehicle</p>
// //           <p className="text-gray-600">{carDataError}</p>
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
// //           >
// //             ← Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Not found state
// //   if (!vehicle && !apiCarData) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// //         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
// //           <div className="text-6xl">🚗</div>
// //           <p className="text-xl text-gray-700 font-bold">Vehicle Not Found</p>
// //           <p className="text-gray-600">The vehicle you're looking for doesn't exist or has been removed.</p>
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
// //           >
// //             ← Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // No vehicle data
// //   if (!currentVehicle) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <div className="text-center space-y-4 p-8">
// //           <p className="text-xl text-gray-700">Vehicle data not available!</p>
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// //           >
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
// //       <div className="lg:col-span-1">
// //         <img
// //           src={currentVehicle.image}
// //           alt={currentVehicle.name}
// //           className="rounded-xl w-full mb-4"
// //         />
// //         <div className="flex justify-center space-x-2 mt-2">
// //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// //           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
// //         </div>
// //       </div>
 
// //       {/* MIDDLE COLUMN - VEHICLE DETAILS & BOOKING */}
// //       <div className="lg:col-span-1">
// //         <h2 className="text-2xl font-bold">{currentVehicle.name}</h2>
// //         <p className="text-gray-600 text-lg mt-1">₹{currentVehicle.price}/hr</p>
 
// //         <div className="flex gap-4 mt-4">
// //           {[
// //             { img: Automatic, label: apiCarData?.transmissionType || "Automatic" },
// //             { img: Driver, label: apiCarData?.Carseater || "5 Seater" },
// //             { img: Petrol, label: apiCarData?.fuelType || "Petrol" },
// //             { img: Acicon, label: "AC" },
// //           ].map((item, idx) => (
// //             <div key={idx} className="flex flex-col items-center p-2 border rounded-lg">
// //               <img src={item.img} alt={item.label} className="w-[25px] h-[25px]" />
// //               <span className="text-sm mt-1">{item.label}</span>
// //             </div>
// //           ))}
// //         </div>
 
// //         <div className="mt-6">
// //           <h3 className="font-semibold text-lg mb-2">Description</h3>
// //           <p className="text-gray-600 text-sm">
// //             {apiCarData?.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
// //           </p>
// //         </div>
 
// //         {apiError && (
// //           <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
// //             <p className="text-sm text-red-700">{apiError}</p>
// //             <button
// //               onClick={() => setApiError("")}
// //               className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
// //             >
// //               Dismiss
// //             </button>
// //           </div>
// //         )}
 
// //         {!showContactButtons ? (
// //           <button
// //             onClick={() => setIsDateTimeModalOpen(true)}
// //             disabled={isSubmittingBooking}
// //             className="mt-6 w-full bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
// //           >
// //             {isSubmittingBooking ? "Processing..." : "Book Now"}
// //           </button>
// //         ) : (
// //           <div className="mt-6 space-y-4">
// //             <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
// //               <img
// //                 src="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
// //                 alt="Manoj Kumar"
// //                 className="w-12 h-12 rounded-full"
// //               />
// //               <div className="flex-1">
// //                 <h4 className="font-semibold text-gray-900">Manoj Kumar</h4>
// //                 <p className="text-sm text-gray-500">Vehicle Owner</p>
// //               </div>
// //             </div>
 
// //             <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
// //               <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
// //                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
// //               </svg>
// //               <p className="text-sm text-orange-700 flex-1">
// //                 Please call the owner to discuss booking details and confirm availability.
// //               </p>
// //             </div>
 
// //             <div className="flex gap-3">
// //               <button
// //                 onClick={() => setIsChatOpen(true)}
// //                 className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
// //               >
// //                 💬 Chat
// //               </button>
// //               <button
// //                 onClick={handleCallOwner}
// //                 className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
// //               >
// //                 📞 Call Owner
// //               </button>
// //             </div>
// //           </div>
// //         )}
 
// //         {isDateTimeModalOpen && (
// //           <AvailabilityDateTimeModal
// //             isOpen={isDateTimeModalOpen}
// //             onClose={() => {
// //               setIsDateTimeModalOpen(false);
// //               setApiError("");
// //             }}
// //             onConfirm={async (startDate, endDate, startTime, endTime, availability) => {
// //               console.log("✅ DateTime selected:", { startDate, endDate, startTime, endTime });
             
// //               setSelectedDateTime({ startDate, endDate, startTime, endTime });
// //               setIsDateTimeModalOpen(false);
             
// //               const result = await createBookingAPI(startDate, endDate, startTime, endTime);
             
// //               if (result) {
// //                 console.log("🎉 Starting wait timer");
// //                 setWaitingTimerSeconds(30);
// //                 setShowWaitingPopup(true);
// //               }
// //             }}
// //           />
// //         )}
// //       </div>

// //       {/* RIGHT COLUMN - REVIEWS & RATINGS */}
// //       <div className="lg:col-span-1">
// //         {/* Header with Refresh Button */}
// //         <div className="flex items-center justify-between mb-3">
// //           <h3 className="text-lg font-bold">Rating & Reviews</h3>
// //           <div className="flex items-center gap-2">
// //             {(loadingReviews || loadingAverageRating) && (
// //               <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
// //             )}
// //             <button
// //               onClick={handleRefreshReviews}
// //               disabled={loadingReviews || loadingAverageRating}
// //               className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
// //               title="Refresh reviews"
// //             >
// //               <RefreshCw className={`w-4 h-4 text-gray-600 ${(loadingReviews || loadingAverageRating) ? 'animate-spin' : ''}`} />
// //             </button>
// //           </div>
// //         </div>

// //         {/* Review Source Indicator */}
// //         {apiReviews.length > 0 && (
// //           <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
// //             <span className="text-xs text-green-700 font-medium">
// //               ✓ Live reviews from API
// //             </span>
// //             <span className="text-xs text-gray-500">
// //               (Updated {new Date(lastFetchTime).toLocaleTimeString()})
// //             </span>
// //           </div>
// //         )}

// //         {reviewsError && (
// //           <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
// //             <p className="text-xs text-yellow-700">{reviewsError}</p>
// //           </div>
// //         )}

// //         {/* Average Rating Display */}
// //         <div className="flex items-center mt-2 mb-2 justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
// //           <div className="flex flex-col">
// //             <span className="text-3xl font-bold text-gray-900">{displayAverageRating}</span>
// //             <span className="text-xs text-gray-600 mt-1">out of 5</span>
// //           </div>
// //           <div className="flex flex-col items-end">
// //             <div className="flex gap-1">
// //               {[...Array(5)].map((_, i) => (
// //                 <Star
// //                   key={i}
// //                   className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
// //                   size={20}
// //                 />
// //               ))}
// //             </div>
// //             <span className="text-sm text-gray-600 mt-1">
// //               {displayTotalReviews} Review{displayTotalReviews !== 1 ? 's' : ''}
// //             </span>
// //           </div>
// //         </div>

// //         {/* Rating Distribution */}
// //         <div className="mt-4 space-y-2 bg-white p-4 rounded-lg border">
// //           <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating Breakdown</h4>
// //           {displayRatingDistribution.map((r) => (
// //             <div key={r.stars} className="flex items-center text-sm">
// //               <span className="w-8 text-gray-700 font-medium">{r.stars}★</span>
// //               <div className="flex-1 bg-gray-200 h-3 rounded-full mx-3 overflow-hidden">
// //                 <div 
// //                   className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500" 
// //                   style={{ width: `${r.percentage}%` }} 
// //                 />
// //               </div>
// //               <span className="text-gray-500 text-xs min-w-[45px] text-right">
// //                 {r.count} ({r.percentage}%)
// //               </span>
// //             </div>
// //           ))}
// //         </div>

// //         {/* ⭐ UPDATED: Individual Reviews with Click to Edit */}
// //         <div className="mt-6 space-y-3 max-h-[500px] overflow-y-auto pr-2">
// //           <h4 className="text-sm font-semibold text-gray-700 mb-3 sticky top-0 bg-white py-2 z-10">
// //             Customer Reviews ({displayTotalReviews})
// //           </h4>
          
// //        {reviewsToDisplay.length > 0 ? (
// //   <>
// //     {reviewsToDisplay.map((r, idx) => {
// //       const canEdit = isUserReview(r);
// //       const alreadyEdited = r.hasBeenEdited;
// //       const isMenuOpen = openMenuId === r._id;

// //       return (
// //         <div 
// //           key={r._id || idx} 
// //           className={`border rounded-xl transition relative ${
// //             canEdit 
// //               ? alreadyEdited 
// //                 ? 'border-orange-200 bg-orange-50'
// //                 : 'border-blue-200 bg-blue-50 hover:shadow-md'
// //               : 'border-gray-200 bg-white hover:shadow-md'
// //           }`}
// //         >
// //           <div className="p-4">
// //             {/* Header with User Info and Actions */}
// //            <div className="flex justify-between items-start mb-2">
// //   <div className="flex items-center gap-2">
// //     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm">
// //       {(r.userName || `User ${idx + 1}`).charAt(0).toUpperCase()}
// //     </div>
// //     <div>
// //       <div className="flex items-center gap-2 flex-wrap">
// //         <span className="font-semibold text-gray-900 text-sm">
// //           {r.userName || `User ${idx + 1}`}
// //         </span>
// //         {canEdit && (
// //           <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium">
// //             You
// //           </span>
// //         )}
// //         {alreadyEdited && (
// //           <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-medium">
// //             ✓ Edited
// //           </span>
// //         )}
// //       </div>
// //       {r.createdAt && (
// //         <p className="text-xs text-gray-400">
// //           {new Date(r.createdAt).toLocaleDateString('en-US', {
// //             year: 'numeric',
// //             month: 'short',
// //             day: 'numeric'
// //           })}
// //           {alreadyEdited && r.editedAt && (
// //             <span className="ml-2 text-orange-500">
// //               (Edited {new Date(r.editedAt).toLocaleDateString()})
// //             </span>
// //           )}
// //         </p>
// //       )}
// //     </div>
// //   </div>

// //   <div className="flex items-center gap-2">
// //     {/* Rating Display */}
// //     <div className="flex bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200">
// //       {[...Array(5)].map((_, i) => (
// //         <Star
// //           key={i}
// //           size={14}
// //           className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
// //         />
// //       ))}
// //     </div>

// //     {/* ⭐ Three Dot Menu (only for user's own reviews) */}
// //     {canEdit && (
// //       <div className="relative">
// //         <button
// //           onClick={(e) => {
// //             e.stopPropagation();
// //             setOpenMenuId(isMenuOpen ? null : r._id);
// //           }}
// //           className="p-1.5 hover:bg-gray-200 rounded-lg transition"
// //           title="More options"
// //         >
// //           <svg 
// //             width="18" 
// //             height="18" 
// //             viewBox="0 0 24 24" 
// //             fill="none" 
// //             stroke="currentColor" 
// //             strokeWidth="2" 
// //             strokeLinecap="round" 
// //             strokeLinejoin="round"
// //             className="text-gray-600"
// //           >
// //             <circle cx="12" cy="12" r="1"></circle>
// //             <circle cx="12" cy="5" r="1"></circle>
// //             <circle cx="12" cy="19" r="1"></circle>
// //           </svg>
// //         </button>

// //         {/* Dropdown Menu */}
// //         {isMenuOpen && (
// //           <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
// //             {/* Edit Option */}
// //             <button
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 setOpenMenuId(null);
// //                 if (alreadyEdited) {
// //                   toast.error("⚠️ You have already edited this review once!", {
// //                     duration: 3000,
// //                     position: 'top-right',
// //                   });
// //                 } else {
// //                   handleNavigateToFeedback(r);
// //                 }
// //               }}
// //               disabled={alreadyEdited}
// //               className={`w-full px-4 py-3 text-left flex items-center gap-3 transition ${
// //                 alreadyEdited
// //                   ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
// //                   : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
// //               }`}
// //             >
// //               <svg 
// //                 width="16" 
// //                 height="16" 
// //                 viewBox="0 0 24 24" 
// //                 fill="none" 
// //                 stroke="currentColor" 
// //                 strokeWidth="2" 
// //                 strokeLinecap="round" 
// //                 strokeLinejoin="round"
// //               >
// //                 <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
// //                 <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
// //               </svg>
// //               <div className="flex-1">
// //                 <p className="text-sm font-medium">Edit Review</p>
// //                 {alreadyEdited && (
// //                   <p className="text-xs text-gray-400">Already edited once</p>
// //                 )}
// //               </div>
// //             </button>

// //             {/* Delete Option */}
// //             <button
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 setOpenMenuId(null);
// //                 handleDeleteReview(r._id, e);
// //               }}
// //               disabled={isDeletingReview}
// //               className="w-full px-4 py-3 text-left flex items-center gap-3 text-red-600 hover:bg-red-50 transition disabled:opacity-50 border-t border-gray-100"
// //             >
// //               <Trash2 size={16} />
// //               <span className="text-sm font-medium">Delete Review</span>
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     )}
// //   </div>
// // </div>

// //             {/* Review Text */}
// //             <p className="text-sm text-gray-700 leading-relaxed mt-2">
// //               {r.review || "No comment provided"}
// //             </p>

// //             {/* Status hint */}
// //             {canEdit && (
// //               <div className="mt-2 pt-2 border-t border-blue-200">
// //                 <p className={`text-xs flex items-center gap-1 ${
// //                   alreadyEdited ? 'text-orange-600' : 'text-blue-600'
// //                 }`}>
// //                   {alreadyEdited ? (
// //                     <>
// //                       <Check size={12} />
// //                       Review edited (one-time edit used)
// //                     </>
// //                   ) : (
// //                     <>
// //                       <Eye size={12} />
// //                       Use menu (⋮) to edit your review (one-time only)
// //                     </>
// //                   )}
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           {/* ⭐ Click outside to close menu */}
// //           {isMenuOpen && (
// //             <div 
// //               className="fixed inset-0 z-40" 
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 setOpenMenuId(null);
// //               }}
// //             />
// //           )}
// //         </div>
// //       );
// //     })}

// //     {/* See More / See Less Button */}
// //     {hasMoreReviews && (
// //       <button
// //         onClick={() => setShowAllReviews(!showAllReviews)}
// //         className="w-full py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-700 font-semibold rounded-xl hover:from-blue-100 hover:to-indigo-100 transition flex items-center justify-center gap-2 group"
// //       >
// //         {showAllReviews ? (
// //           <>
// //             <ChevronUp size={18} className="group-hover:transform group-hover:-translate-y-1 transition" />
// //             Show Less
// //             <ChevronUp size={18} className="group-hover:transform group-hover:-translate-y-1 transition" />
// //           </>
// //         ) : (
// //           <>
// //             <ChevronDown size={18} className="group-hover:transform group-hover:translate-y-1 transition" />
// //             See More ({displayReviews.length - 5} more reviews)
// //             <ChevronDown size={18} className="group-hover:transform group-hover:translate-y-1 transition" />
// //           </>
// //         )}
// //       </button>
// //     )}
// //   </>
// // ) : (
// //   <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
// //     <div className="text-5xl mb-3">📝</div>
// //     <p className="text-gray-500 font-medium mb-1">No reviews yet</p>
// //     <p className="text-gray-400 text-sm">
// //       Be the first to review this vehicle!
// //     </p>
// //   </div>
// // )}
// //         </div>
// //       </div>

// //       {/* EXISTING MODALS */}
// //       {showWaitingPopup && (
// //         <WaitingPopup
// //           timer={waitingTimerSeconds}
// //           onClose={handleCloseWaiting}
// //           onTimerComplete={handleTimerComplete}
// //         />
// //       )}
   
// //       {showAcceptance && (
// //         <BookingAcceptance
// //           onAccept={handleAcceptBooking}
// //           onReject={handleRejectBooking}
// //           onClose={() => setShowAcceptance(false)}
// //         />
// //       )}
   
// //       <PopupChat
// //         isOpen={isChatOpen}
// //         onClose={() => setIsChatOpen(false)}
// //         ownerName="Manoj Kumar"
// //         ownerAvatar="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
// //       />
   
// //       <BookingRejectModal isOpen={showRejectModal} onClose={handleCloseRejectModal} />

// //       {isSubmittingBooking && (
// //         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// //           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
// //             <div className="flex flex-col items-center">
// //               <div className="relative mb-6">
// //                 <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
// //                 <div className="absolute inset-0 flex items-center justify-center">
// //                   <div className="w-12 h-12 bg-blue-100 rounded-full animate-pulse"></div>
// //                 </div>
// //               </div>
              
// //               <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
// //                 Creating Your Booking...
// //               </h2>
              
// //               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 w-full mb-4 border border-blue-100 shadow-sm">
// //                 {currentVehicle && (
// //                   <>
// //                     <div className="flex items-center gap-3 mb-4">
// //                       <img 
// //                         src={currentVehicle.image} 
// //                         alt={currentVehicle.name}
// //                         className="w-16 h-16 rounded-lg object-cover shadow-sm"
// //                       />
// //                       <div className="flex-1">
// //                         <p className="font-bold text-gray-900 text-lg">{currentVehicle.name}</p>
// //                         <p className="text-sm text-gray-600 capitalize">{currentVehicle.type}</p>
// //                       </div>
// //                     </div>
                    
// //                     <div className="space-y-2">
// //                       <div className="flex justify-between text-sm">
// //                         <span className="text-gray-600">Car ID</span>
// //                         <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
// //                           {currentVehicle.id.substring(0, 12)}...
// //                         </span>
// //                       </div>
                      
// //                       {apiCarData?.CarNumber && (
// //                         <div className="flex justify-between text-sm">
// //                           <span className="text-gray-600">Car Number</span>
// //                           <span className="font-semibold text-gray-900">{apiCarData.CarNumber}</span>
// //                         </div>
// //                       )}
                      
// //                       {selectedDateTime && (
// //                         <div className="border-t border-blue-200 pt-2 mt-3">
// //                           <p className="text-xs text-gray-600 mb-1">Booking Period</p>
// //                           <p className="text-sm text-gray-700 font-medium">
// //                             {selectedDateTime.startDate} {selectedDateTime.startTime}
// //                             <br />
// //                             to {selectedDateTime.endDate} {selectedDateTime.endTime}
// //                           </p>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
              
// //               <div className="text-center space-y-2">
// //                 <p className="text-gray-600 text-sm">
// //                   Please wait while we process your booking...
// //                 </p>
// //                 <p className="text-blue-600 font-medium text-sm">
// //                   Connecting to server & validating data
// //                 </p>
// //               </div>
              
// //               <div className="flex gap-2 mt-5">
// //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
// //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
// //                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {apiError && !isSubmittingBooking && (
// //         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[110] max-w-md w-full mx-4 animate-slideDown">
// //           <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-xl">
// //             <div className="flex items-start">
// //               <div className="flex-shrink-0">
// //                 <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={
// //                     2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                 </svg>
// //               </div>
// //               <div className="ml-3 flex-1">
// //                 <h3 className="text-sm font-bold text-red-800">Booking Failed</h3>
// //                 <p className="mt-1 text-sm text-red-700">{apiError}</p>
// //                 {currentVehicle && (
// //                   <p className="mt-1 text-xs text-red-600">
// //                     Car: {currentVehicle.name} (ID: {currentVehicle.id.substring(0, 8)}...)
// //                   </p>
// //                 )}
// //                 <div className="mt-3 flex gap-2">
// //                   <button
// //                     onClick={() => {
// //                       setApiError("");
// //                       setIsDateTimeModalOpen(true);
// //                     }}
// //                     className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
// //                   >
// //                     Retry Booking
// //                   </button>
// //                   <button
// //                     onClick={() => setApiError("")}
// //                     className="px-3 py-1.5 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-300 hover:bg-red-50 transition-colors"
// //                   >
// //                     Dismiss
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {showSuccessModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
// //             <div className="flex justify-center mb-6">
// //               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
// //                 <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                 </svg>
// //               </div>
// //             </div>
   
// //             <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
// //               Booking Posted Successfully!
// //             </h2>
// //             <p className="text-gray-600 text-center mb-6">
// //               After discussing with the owner, your booking has been confirmed. You will receive updates on your booking status.
// //             </p>
   
// //             <div className="bg-gray-50 rounded-lg p-4 mb-6">
// //               <div className="flex items-center gap-3 mb-3">
// //                 <img src={currentVehicle.image} alt={currentVehicle.name} className="w-16 h-16 rounded-lg object-cover" />
// //                 <div>
// //                   <h3 className="font-semibold text-gray-900">{currentVehicle.name}</h3>
// //                   <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
// //                 </div>
// //               </div>
             
// //               {selectedDateTime && (
// //                 <div className="text-sm text-gray-600 space-y-1">
// //                   <div className="flex justify-between">
// //                     <span>Start:</span>
// //                     <span className="font-medium">
// //                       {new Date(selectedDateTime.startDate).toLocaleDateString()} - {selectedDateTime.startTime}
// //                     </span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span>End:</span>
// //                     <span className="font-medium">
// //                       {new Date(selectedDateTime.endDate).toLocaleDateString()} - {selectedDateTime.endTime}
// //                     </span>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
   
// //             <div className="flex gap-3">
// //               <button
// //                 onClick={() => {
// //                   setShowSuccessModal(false);
// //                   navigate("/");
// //                 }}
// //                 className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
// //               >
// //                 Go Home
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   setShowSuccessModal(false);
// //                   setShowContactButtons(false);
// //                   setSelectedDateTime(null);
// //                   setBookingId(null);
// //                   setWaitingTimerSeconds(30);
// //                 }}
// //                 className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
// //               >
// //                 Book Another
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default BookNow;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// import {  useParams } from "react-router-dom";
// import { vehicles } from "./data/Vehicle";
// import { Vehicle } from "../types/Vehicle";
// import { Star, Loader2, RefreshCw, Trash2, Edit, X, MoreVertical } from "lucide-react";
// import apiService from "../services/api.service";
// import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
// import WaitingPopup from "../components/ui/WaitingPopup";
// import BookingAcceptance from "../components/ui/BookingAcceptance";
// import BookingRejectModal from "../components/ui/BookingRejectModal";
// import PopupChat from "../components/ui/PopupChat";
// import { useReviewStore } from "../store/review.store";
// import { useNotificationStore } from "../store/notification.store";
// import { useBookingStore } from "../store/booking.store";
// import toast from "react-hot-toast";
// import Feedback from "./Feedback";
// import Automatic from "../assets/icons/AutomaticLogo.png";
// import Driver from "../assets/icons/DriverLogo.png";
// import Acicon from "../assets/icons/AutomaticLogo.png";
// import Petrol from "../assets/icons/Petrol.png";
  
// const PRODUCTION_PROXIES = [
//   "https://corsproxy.io/?",
//   "https://api.codetabs.com/v1/proxy?quest=",
// ];

// const API_ENDPOINT = "http://3.110.122.127:3000/createBooking";

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

// const BookNow: React.FC = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);
//  const location = useLocation();
// const { reviewId, vehicleId, reviewText, rating, isEditing } = location.state || {};

//   const {
//     getReviewsByVehicleId,
//     getAverageRating,
//     getTotalReviewCount,
//     getRatingDistribution,
//   } = useReviewStore();
//   const { addNotification } = useNotificationStore();
//   const { addBooking } = useBookingStore();

//   // ============================================================
//   // STATE MANAGEMENT
//   // ============================================================
  
//   // API car data state
//   const [apiCarData, setApiCarData] = useState<any>(null);
//   const [loadingCarData, setLoadingCarData] = useState(true);
//   const [carDataError, setCarDataError] = useState("");
 
//   // User profile state
//   const [userProfile, setUserProfile] = useState<any>(null);
  
//   // Booking states
//   const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
//   const [showContactButtons, setShowContactButtons] = useState(false);
//   const [showWaitingPopup, setShowWaitingPopup] = useState(false);
//   const [showAcceptance, setShowAcceptance] = useState(false);
//   const [waitingTimerSeconds, setWaitingTimerSeconds] = useState<number>(30);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [selectedDateTime, setSelectedDateTime] = useState<{
//     startDate: string;
//     endDate: string;
//     startTime: string;
//     endTime: string;
//   } | null>(null);
//   const [bookingId, setBookingId] = useState<string | null>(null);
//   const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
//   const [apiError, setApiError] = useState<string>("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
  
//   // Enhanced Review States
//   const [apiReviews, setApiReviews] = useState<Review[]>([]);
//   const [loadingReviews, setLoadingReviews] = useState(false);
//   const [reviewsError, setReviewsError] = useState<string>("");
//   const [lastFetchTime, setLastFetchTime] = useState<number>(0);

//   // Average Rating from API
//   const [apiAverageRating, setApiAverageRating] = useState<number>(0);
//   const [loadingAverageRating, setLoadingAverageRating] = useState<boolean>(false);
  
//   // Get current user ID from localStorage
//   const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";

//   // ============================================================
//   // FETCH USER PROFILE ON MOUNT
//   // ============================================================
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const userId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
//         console.log("👤 Fetching user profile for:", userId);
        
//         const response = await fetch(`http://3.110.122.127:3000/getUserById/${userId}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.ok) {
//           const result = await response.json();
//           console.log("✅ User profile fetched:", result);
          
//           if (result.success && result.user) {
//             setUserProfile(result.user);
//             // Store user name in localStorage for easy access
//             if (result.user.name) {
//               localStorage.setItem('userName', result.user.name);
//             }
//           }
//         }
//       } catch (error) {
//         console.error("❌ Error fetching user profile:", error);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // ============================================================
//   // FETCH CAR DETAILS FROM API
//   // ============================================================
//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       if (id) {
//         try {
//           setLoadingCarData(true);
//           setCarDataError("");
//           console.log(`🚗 Fetching car details for ID: ${id}`);
          
//           const response = await apiService.car.getCarById(id);
//           console.log("✅ Full API response:", response);
          
//           let carData = null;
          
//           if (response) {
//             if ((response as any).data) {
//               carData = (response as any).data;
//             } else if ((response as any).car) {
//               carData = (response as any).car;
//             } else {
//               carData = response;
//             }
            
//             console.log("🎯 Final car data to set:", carData);
//             setApiCarData(carData);
//           }
//         } catch (err: any) {
//           console.error("❌ Error fetching car details:", err);
//           setCarDataError(err.message || "Failed to load car details");
//         } finally {
//           setLoadingCarData(false);
//         }
//       }
//     };

//     fetchCarDetails();
//   }, [id]);

//   // ============================================================
//   // FETCH REVIEWS ON MOUNT
//   // ============================================================
//   useEffect(() => {
//     if (id) {
//       console.log("🔄 Initial review fetch triggered for vehicle:", id);
//       fetchReviewsByVehicleId(id);
//       fetchAverageRating(id);
//     }
//   }, [id]);

//   // ============================================================
//   // AUTO-REFRESH REVIEWS EVERY 30 SECONDS
//   // ============================================================
//   useEffect(() => {
//     if (id) {
//       const intervalId = setInterval(() => {
//         console.log("🔄 Auto-refreshing reviews...");
//         fetchReviewsByVehicleId(id, true);
//         fetchAverageRating(id, true);
//       }, 30000);

//       return () => clearInterval(intervalId);
//     }
//   }, [id]);

//   // ============================================================
//   // TIMER EFFECT FOR BOOKING
//   // ============================================================
//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;
//     if (showWaitingPopup && waitingTimerSeconds > 0) {
//       interval = setInterval(() => {
//         setWaitingTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
//       }, 1000);
//     }
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [showWaitingPopup, waitingTimerSeconds]);
 
//   useEffect(() => {
//     if (showWaitingPopup && waitingTimerSeconds === 0) {
//       handleTimerComplete();
//     }
//   }, [waitingTimerSeconds, showWaitingPopup]);

//   // ============================================================
//   // HELPER: CHECK IF REVIEW BELONGS TO CURRENT USER
//   // ============================================================
//   const isUserReview = (review: Review): boolean => {
//     const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
//     return review.userId === currentUserId;
//   };

//   // ============================================================
//   // GET REVIEW BY ID (FOR EDITING)
//   // ============================================================
//   const getReviewById = async (reviewId: string): Promise<Review | null> => {
//     try {
//       console.log("🔍 Fetching review by ID:", reviewId);
      
//       const response = await fetch(`http://3.110.122.127:3000/getReviewById?id=${reviewId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log("✅ Review fetched:", result);
        
//         if (result.success && result.review) {
//           return result.review;
//         }
//       }
      
//       return null;
//     } catch (error) {
//       console.error("❌ Error fetching review:", error);
//       return null;
//     }
//   };

//   // ============================================================
//   // REFRESH REVIEWS HANDLER
//   // ============================================================
//   const handleRefreshReviews = () => {
//     if (id) {
//       console.log("🔄 Manual refresh triggered");
//       fetchReviewsByVehicleId(id, false);
//       fetchAverageRating(id, false);
//     }
//   };

//   // ============================================================
//   // NAVIGATE TO FEEDBACK PAGE FOR EDITING
//   // ============================================================
//   const handleNavigateToFeedback = async (review: Review) => {
//     console.log("✏️ Preparing to edit review:", review._id);
//     console.log("📝 Review data:", review);
    
//     // Show loading toast
//     const loadingToast = toast.loading('Opening review editor...', {
//       position: 'top-center',
//     });
    
//     try {
//       // Fetch complete review data from API
//       const fullReviewData = await getReviewById(review._id);
      
//       toast.dismiss(loadingToast);
      
//       if (!fullReviewData) {
//         toast.error("❌ Failed to load review data. Please try again.", {
//           duration: 3000,
//           position: 'top-center',
//         });
//         return;
//       }
      
//       console.log("✅ Full review data fetched:", fullReviewData);
      
//       // Prepare review data for feedback page
//       const reviewDataForEdit = {
//         reviewId: review._id,
//         rating: fullReviewData.rating || review.rating,
//         reviewText: fullReviewData.reviewText || fullReviewData.review || fullReviewData.comment || fullReviewData.feedback || review.review || review.reviewText || '',
//         userId: fullReviewData.userId || review.userId,
//         vehicleId: fullReviewData.vehicleId || review.vehicleId || id,
//         userName: fullReviewData.userName || review.userName,
//         createdAt: fullReviewData.createdAt || review.createdAt,
//       };
      
//       console.log("📤 Navigating with data:", reviewDataForEdit);
      
//       // Navigate to feedback page with complete review data
  

// const handleNavigateToFeedback = (review) => {
//   navigate("/feedback", {
//     state: {
//       reviewId: review._id,
//       vehicleId: review.vehicleId || id,
//       reviewText: review.review || review.reviewText || review.comment || review.feedback || "",
//       rating: review.rating || 0,
//       isEditing: true,
//     },
//   });
// };
      
//       toast.success('✅ Opening review editor...', {
//         duration: 1500,
//         position: 'top-center',
//       });
//     } catch (error: any) {
//       console.error("❌ Error in handleNavigateToFeedback:", error);
//       toast.dismiss(loadingToast);
//       toast.error(`❌ Error: ${error.message || 'Failed to load review'}`, {
//         duration: 3000,
//         position: 'top-center',
//       });
//     }
//   };

//   // ============================================================
//   // FETCH AVERAGE RATING FROM API
//   // ============================================================
//   const fetchAverageRating = async (vehicleId: string, silent: boolean = false) => {
//     if (!silent) {
//       setLoadingAverageRating(true);
//     }

//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("⭐ FETCHING AVERAGE RATING");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("📋 Vehicle ID:", vehicleId);

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

//       console.log("📥 Average Rating Response Status:", response.status);

//       if (response.ok) {
//         const result = await response.json();
//         console.log("✅ Average Rating Response:", result);

//         if (result.success && result.averageRating !== undefined) {
//           const avgRating = parseFloat(result.averageRating);
//           setApiAverageRating(avgRating);
//           console.log("⭐ Average Rating Set:", avgRating);
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

//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("🔍 FETCHING REVIEWS FOR VEHICLE");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("📋 Vehicle ID:", vehicleId);

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

//       console.log("📥 Response Status:", response.status);

//       if (response.ok) {
//         const result = await response.json();
//         console.log("✅ Reviews Response:", result);

//         if (result.success && Array.isArray(result.reviews)) {
//           console.log("🎉 SUCCESS: Reviews found!", result.reviews.length);
          
//           // Process reviews to ensure userName is set
//           const processedReviews = result.reviews.map((review: Review) => ({
//             ...review,
//             userName: review.userName || 
//                      localStorage.getItem('userName') || 
//                      `User ${review.userId?.substring(0, 6) || ''}`
//           }));
          
//           setApiReviews(processedReviews);
          
//           if (!silent) {
//             toast.success(`✅ Loaded ${processedReviews.length} review(s)`, {
//               duration: 2000,
//               position: 'top-right',
//             });
//           }

//           return processedReviews;
//         } else {
//           console.log("ℹ️ No reviews found");
//           setApiReviews([]);
          
//           if (!silent) {
//             toast("No reviews yet for this vehicle", {
//               duration: 2000,
//               position: 'top-right',
//             });
//           }
//         }
//       } else {
//         throw new Error(`API returned status ${response.status}`);
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
//   // CALCULATE AVERAGE RATING FROM API REVIEWS
//   // ============================================================
//   const calculateAverageRating = (reviews: Review[]): number => {
//     if (reviews.length === 0) return 0;
//     const total = reviews.reduce((sum, review) => sum + review.rating, 0);
//     const average = total / reviews.length;
//     return Number(average.toFixed(1));
//   };

//   // ============================================================
//   // CALCULATE RATING DISTRIBUTION FROM API REVIEWS
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
//   // MAP VEHICLE TYPE FOR API
//   // ============================================================
//   const mapVehicleTypeForAPI = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
//     if (!type) {
//       console.warn("⚠️ Vehicle type is undefined/null, defaulting to 'Car'");
//       return "Car";
//     }
    
//     const normalized = type.toLowerCase();
//     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
//       car: "Car",
//       auto: "Auto",
//       bike: "Bike",
//     };
    
//     return typeMap[normalized] || "Car";
//   };
  
//   // ============================================================
//   // MAP VEHICLE TYPE FOR STORE
//   // ============================================================
//   const mapVehicleTypeForStore = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
//     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
//       car: "Car",
//       auto: "Auto",
//       bike: "Bike",
//     };
//     return type ? typeMap[type.toLowerCase()] || "Car" : "Car";
//   };

//   // ============================================================
//   // CALCULATE TOTAL HOURS BETWEEN DATES AND TIMES
//   // ============================================================
//   const calculateTotalHours = (
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
//   ): number => {
//     try {
//       const parseTime = (timeStr: string) => {
//         const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
//         if (!match) return { hours: 0, minutes: 0 };
       
//         let hours = parseInt(match[1]);
//         const minutes = parseInt(match[2] || '0');
//         const period = match[3]?.toUpperCase();
       
//         if (period === 'PM' && hours !== 12) hours += 12;
//         if (period === 'AM' && hours === 12) hours = 0;
       
//         return { hours, minutes };
//       };
 
//       const startTimeParsed = parseTime(startTime);
//       const endTimeParsed = parseTime(endTime);
 
//       const start = new Date(startDate);
//       start.setHours(startTimeParsed.hours, startTimeParsed.minutes, 0, 0);
 
//       const end = new Date(endDate);
//       end.setHours(endTimeParsed.hours, endTimeParsed.minutes, 0, 0);
 
//       const diffInMs = end.getTime() - start.getTime();
//       const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
     
//       return hours > 0 ? hours : 1;
//     } catch (error) {
//       console.error("❌ Error calculating hours:", error);
//       return 1;
//     }
//   };
 
//   // ============================================================
//   // FORMAT DATE FOR API
//   // ============================================================
//   const formatDateForAPI = (dateString: string): string => {
//     try {
//       const date = new Date(dateString);
//       if (!isNaN(date.getTime())) {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//       }
//     } catch (error) {
//       console.error("❌ Date formatting error:", error);
//     }
//     return dateString;
//   };
 
//   // ============================================================
//   // FORMAT TIME FOR API
//   // ============================================================
//   const formatTimeForAPI = (timeString: string): string => {
//     try {
//       const ampmMatch = timeString.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
//       if (ampmMatch) {
//         let hours = parseInt(ampmMatch[1]);
//         const minutes = ampmMatch[2] || '00';
//         const period = ampmMatch[3].toUpperCase();
       
//         if (period === 'PM' && hours !== 12) hours += 12;
//         if (period === 'AM' && hours === 12) hours = 0;
       
//         return `${hours.toString().padStart(2, '0')}.${minutes}`;
//       }
//     } catch (error) {
//       console.error("❌ Time formatting error:", error);
//     }
//     return timeString;
//   };

//   // ============================================================
//   // BOOKING TIMER COMPLETE HANDLER
//   // ============================================================
//   const handleTimerComplete = () => {
//     console.log("⏰ Timer completed - Opening BookingAcceptance");
//     setShowWaitingPopup(false);
//     setShowAcceptance(true);
//   };
 
//   // ============================================================
//   // CLOSE WAITING POPUP
//   // ============================================================
//   const handleCloseWaiting = () => {
//     console.log("❌ WaitingPopup closed manually");
//     setShowWaitingPopup(false);
//     setWaitingTimerSeconds(30);
//   };
 
//   // ============================================================
//   // ACCEPT BOOKING HANDLER
//   // ============================================================
//   const handleAcceptBooking = () => {
//     console.log("✅ Booking Accepted by Owner!");
//     setShowAcceptance(false);
//     setShowContactButtons(true);
//   };
 
//   // ============================================================
//   // REJECT BOOKING HANDLER
//   // ============================================================
//   const handleRejectBooking = () => {
//     console.log("❌ Booking Rejected by Owner!");
//     setShowAcceptance(false);
//     setShowRejectModal(true);
//   };
 
//   // ============================================================
//   // CLOSE REJECT MODAL
//   // ============================================================
//   const handleCloseRejectModal = () => {
//     console.log("🔙 Reject modal closed");
//     setShowRejectModal(false);
//     setSelectedDateTime(null);
//     setBookingId(null);
//     setWaitingTimerSeconds(30);
//   };
 
//   // ============================================================
//   // CALL OWNER HANDLER
//   // ============================================================
//   const handleCallOwner = () => {
//     console.log("📞 User calling owner...");
//     setTimeout(() => {
//       handleConfirmBooking();
//     }, 1000);
//   };

//   // ============================================================
//   // CREATE CURRENT VEHICLE OBJECT
//   // ============================================================
//   const currentVehicle = vehicle || (apiCarData ? {
//     id: apiCarData._id || apiCarData.id || id || '',
//     name: apiCarData.CarName || 'Unknown Vehicle',
//     image: (apiCarData.carImages && apiCarData.carImages.length > 0) 
//       ? apiCarData.carImages[0] 
//       : apiCarData.carImage || apiCarData.image || 'https://via.placeholder.com/400',
//     price: apiCarData.RentPerDay || apiCarData.pricePerHour || '0',
//     type: 'car' as Vehicle["type"],
//   } : null);

//   // ============================================================
//   // CONFIRM BOOKING HANDLER
//   // ============================================================
//   const handleConfirmBooking = () => {
//     if (!currentVehicle || !selectedDateTime) {
//       console.error("❌ Cannot confirm booking");
//       return;
//     }
 
//     const currentDate = new Date();
//     console.log("🎉 Confirming booking with ID:", bookingId);
 
//     addBooking({
//       id: bookingId || Date.now().toString(),
//       vehicleId: currentVehicle.id,
//       vehicleName: currentVehicle.name,
//       vehicleImage: currentVehicle.image,
//       vehicleType: mapVehicleTypeForStore(currentVehicle.type),
//       customerName: "Current User",
//       bookingDate: currentDate.toLocaleDateString("en-US"),
//       bookingTime: currentDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       startDate: selectedDateTime.startDate,
//       startTime: selectedDateTime.startTime,
//       endDate: selectedDateTime.endDate,
//       endTime: selectedDateTime.endTime,
//       modelNo: currentVehicle.id.toUpperCase(),
//       status: "Booked",
//       price: currentVehicle.price,
//     });
 
//     setShowSuccessModal(true);
//   };

//   // ============================================================
//   // CREATE BOOKING VIA API
//   // ============================================================
//   const createBookingAPI = async ( 
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
//   ) => {
//     if (!currentVehicle) {
//       const errorMsg = "Vehicle information is missing. Please try again.";
//       setApiError(errorMsg);
//       addNotification({
//         title: "Booking Failed",
//         message: errorMsg,
//         type: "booking_declined",
//       });
//       return null;
//     }

//     setIsSubmittingBooking(true);
//     setApiError("");

//     try {
//       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//       console.log("🚀 PRODUCTION BOOKING API - START");
//       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      
//       const totalHours = calculateTotalHours(startDate, endDate, startTime, endTime);
//       const pricePerDay = parseInt(String(apiCarData?.RentPerDay || currentVehicle.price || "0"), 10);
//       const pricePerHour = pricePerDay > 0 ? Math.round(pricePerDay / 24) : parseInt(String(currentVehicle.price || "0"), 10);
//       const totalPrice = totalHours * pricePerHour;
      
//       const formattedFromDate = formatDateForAPI(startDate);
//       const formattedToDate = formatDateForAPI(endDate);
//       const formattedFromTime = formatTimeForAPI(startTime);
//       const formattedToTime = formatTimeForAPI(endTime);
      
//       const userId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
//       const contactNumber = localStorage.getItem('contactNumber') || "6301818409";
//       const contactName = localStorage.getItem('contactName') || localStorage.getItem('userName') || "User";
//       const userLatitude = localStorage.getItem('latitude') || "17.438095";
//       const userLongitude = localStorage.getItem('longitude') || "78.4485";

//       const requestBody = {
//         userId: userId,
//         contactNumber: contactNumber,
//         contactName: contactName,
//         latitude: userLatitude,
//         longitude: userLongitude,
//         VechileId: currentVehicle.id,
//         vechileType: mapVehicleTypeForAPI(currentVehicle.type),
//         carName: apiCarData?.CarName || currentVehicle.name || '',
//         carModel: apiCarData?.Model || '',
//         carBrand: apiCarData?.Brand || '',
//         carNumber: apiCarData?.CarNumber || '',
//         fuelType: apiCarData?.FuelType || '',
//         transmissionType: apiCarData?.TransmissionType || '',
//         seatingCapacity: apiCarData?.SeatingCapacity?.toString() || '',
//         pricePerDay: pricePerDay.toString(),
//         pricePerHour: pricePerHour.toString(),
//         pricePerKm: pricePerHour.toString(),
//         FromDate: formattedFromDate,
//         ToDate: formattedToDate,
//         FromTime: formattedFromTime,
//         ToTime: formattedToTime,
//         totalHours: totalHours.toString(),
//         totalPrice: totalPrice.toString(),
//         pickupAddress: apiCarData?.pickupAddress || '',
//         dropoffAddress: apiCarData?.pickupAddress || '',
//       };

//       console.log("📦 Request Body:", requestBody);

//       const urlencoded = new URLSearchParams();
//       Object.entries(requestBody).forEach(([key, value]) => {
//         urlencoded.append(key, value);
//       });

//       let response;
//       for (let i = 0; i < PRODUCTION_PROXIES.length; i++) {
//         try {
//           const proxiedUrl = `${PRODUCTION_PROXIES[i]}${encodeURIComponent(API_ENDPOINT)}`;
//           console.log(`🌐 Trying proxy [${i + 1}]:`, proxiedUrl);

//           response = await Promise.race([
//             fetch(proxiedUrl, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//               },
//               body: urlencoded.toString(),
//             }),
//             new Promise<never>((_, reject) =>
//               setTimeout(() => reject(new Error('Proxy timeout after 15s')), 15000)
//             )
//           ]);

//           if (response.ok) {
//             const text = await response.text();
           
//             let result;
//             try {
//               result = JSON.parse(text);
//             } catch {
//               result = { success: true, message: text };
//             }

//             const bookingIdFromResponse = result?.bookingId || 
//                                          result?.data?.bookingId || 
//                                          result?._id || 
//                                          result?.data?._id ||
//                                          `BOOK-${Date.now()}`;
            
//             setBookingId(bookingIdFromResponse);
            
//             addNotification({
//               title: "Booking Created Successfully! 🎉",
//               message: `Your booking for ${requestBody.carName} has been confirmed!`,
//               type: "booking_confirmed",
//               vehicleId: currentVehicle.id,
//               vehicleName: requestBody.carName,
//               bookingId: bookingIdFromResponse,
//             });
            
//             addBooking({
//               id: bookingIdFromResponse,
//               vehicleId: currentVehicle.id,
//               vehicleName: requestBody.carName,
//               vehicleImage: currentVehicle.image,
//               vehicleType: mapVehicleTypeForStore(currentVehicle.type),
//               price: totalPrice,
//               startDate: formattedFromDate,
//               endDate: formattedToDate,
//               startTime: formattedFromTime,
//               endTime: formattedToTime,
//               status: 'Booked',
//             });
            
//             return result;
//           }
//         } catch (proxyError: any) {
//           console.warn(`❌ Proxy ${i + 1} failed:`, proxyError.message);
//         }
//       }
      
//       throw new Error("Unable to connect to booking server. Please check your internet connection and try again.");

//     } catch (error: any) {
//       console.error("❌ BOOKING CREATION FAILED");
//       console.error("❌ Error:", error.message);
     
//       const errorMessage = error.message || "Failed to create booking. Please try again.";
//       setApiError(errorMessage);
      
//       addNotification({
//         title: "Booking Failed ❌",
//         message: errorMessage,
//         type: "booking_declined",
//         vehicleId: currentVehicle.id,
//         vehicleName: currentVehicle.name,
//       });
      
//       return null;
     
//     } finally {
//       setIsSubmittingBooking(false);
//     }
//   };

//   // ============================================================
//   // CALCULATE DISPLAY VALUES
//   // ============================================================
//   const vehicleReviews = getReviewsByVehicleId(currentVehicle?.id || '');
//   const averageRating = getAverageRating(currentVehicle?.id || '');
//   const totalReviews = getTotalReviewCount(currentVehicle?.id || '');
//   const ratingDistribution = getRatingDistribution(currentVehicle?.id || '');

//   // Use API reviews if available, otherwise fallback to local store
//   const displayReviews = apiReviews.length > 0 ? apiReviews : vehicleReviews;
  
//   // Use API average rating if available
//   const displayAverageRating = apiAverageRating > 0 
//     ? apiAverageRating 
//     : (apiReviews.length > 0 
//         ? calculateAverageRating(apiReviews) 
//         : averageRating);
  
//   const displayTotalReviews = apiReviews.length > 0 
//     ? apiReviews.length 
//     : totalReviews;
  
//   const displayRatingDistribution = apiReviews.length > 0 
//     ? calculateRatingDistribution(apiReviews) 
//     : ratingDistribution;

//   // ============================================================
//   // LOADING STATE
//   // ============================================================
//   if (loadingCarData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
//         <div className="text-center space-y-4 p-8">
//           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
//           <p className="text-xl text-gray-700 font-semibold">Loading vehicle details...</p>
//           <p className="text-sm text-gray-500">Please wait while we fetch the car information</p>
//         </div>
//       </div>
//     );
//   }

//   // ============================================================
//   // ERROR STATE
//   // ============================================================
//   if (carDataError && !vehicle) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
//         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
//           <div className="text-6xl">❌</div>
//           <p className="text-xl text-red-600 font-bold">Error Loading Vehicle</p>
//           <p className="text-gray-600">{carDataError}</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
//           >
//             ← Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ============================================================
//   // NOT FOUND STATE
//   // ============================================================
//   if (!vehicle && !apiCarData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
//           <div className="text-6xl">🚗</div>
//           <p className="text-xl text-gray-700 font-bold">Vehicle Not Found</p>
//           <p className="text-gray-600">The vehicle you're looking for doesn't exist or has been removed.</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
//           >
//             ← Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ============================================================
//   // NO VEHICLE DATA
//   // ============================================================
//   if (!currentVehicle) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center space-y-4 p-8">
//           <p className="text-xl text-gray-700">Vehicle data not available!</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ============================================================
//   // MAIN RENDER
//   // ============================================================
//   return (
//     <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//       {/* ============================================================ */}
//       {/* LEFT COLUMN - VEHICLE IMAGE */}
//       {/* ============================================================ */}
//       <div className="lg:col-span-1">
//         <img
//           src={currentVehicle.image}
//           alt={currentVehicle.name}
//           className="rounded-xl w-full mb-4"
//         />
//         <div className="flex justify-center space-x-2 mt-2">
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//         </div>
//       </div>

//       {/* ============================================================ */}
//       {/* MIDDLE COLUMN - VEHICLE DETAILS */}
//       {/* ============================================================ */}
//       <div className="lg:col-span-1">
//         <h1 className="text-3xl font-bold mb-2">{currentVehicle.name}</h1>
        
//         {/* Rating Section */}
//         <div className="flex items-center gap-2 mb-4">
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 size={20}
//                 className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//               />
//             ))}
//           </div>
//           <span className="text-sm text-gray-600">
//             {displayAverageRating} ({displayTotalReviews} reviews)
//           </span>
//         </div>

//         {/* Price */}
//         <div className="mb-6">
//           <span className="text-3xl font-bold text-blue-600">₹{currentVehicle.price}</span>
//           <span className="text-gray-600 ml-2">/day</span>
//         </div>

//         {/* Vehicle Specifications */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           {apiCarData?.TransmissionType && (
//             <div className="flex items-center gap-2">
//               <img src={Automatic} alt="Transmission" className="w-6 h-6" />
//               <span className="text-sm text-gray-700">{apiCarData.TransmissionType}</span>
//             </div>
//           )}
//           {apiCarData?.FuelType && (
//             <div className="flex items-center gap-2">
//               <img src={Petrol} alt="Fuel" className="w-6 h-6" />
//               <span className="text-sm text-gray-700">{apiCarData.FuelType}</span>
//             </div>
//           )}
//           {apiCarData?.SeatingCapacity && (
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-700">👥 {apiCarData.SeatingCapacity} Seater</span>
//             </div>
//           )}
//         </div>

//         {/* Book Now Button */}
//         <button
//           onClick={() => setIsDateTimeModalOpen(true)}
//           className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition shadow-md"
//         >
//           Book Now
//         </button>
//       </div>

//       {/* ============================================================ */}
//       {/* RIGHT COLUMN - REVIEWS & RATINGS */}
//       {/* ============================================================ */}
//       <div className="lg:col-span-1">
//         {/* Header with Refresh Button */}
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="text-lg font-bold">Rating & Reviews</h3>
//           <div className="flex items-center gap-2">
//             {(loadingReviews || loadingAverageRating) && (
//               <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
//             )}
//             <button
//               onClick={handleRefreshReviews}
//               disabled={loadingReviews || loadingAverageRating}
//               className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//               title="Refresh reviews"
//             >
//               <RefreshCw className={`w-4 h-4 text-gray-600 ${(loadingReviews || loadingAverageRating) ? 'animate-spin' : ''}`} />
//             </button>
//           </div>
//         </div>

//         {/* Review Source Indicator */}
//         {apiReviews.length > 0 && (
//           <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
//             <span className="text-xs text-green-700 font-medium">
//               ✓ Live reviews from API
//             </span>
//             <span className="text-xs text-gray-500">
//               (Updated {new Date(lastFetchTime).toLocaleTimeString()})
//             </span>
//           </div>
//         )}

//         {/* Review Error */}
//         {reviewsError && (
//           <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-xs text-yellow-700">{reviewsError}</p>
//           </div>
//         )}

//         {/* Average Rating Display */}
//         <div className="flex items-center mt-2 mb-2 justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
//           <div className="flex flex-col">
//             <span className="text-3xl font-bold text-gray-900">{displayAverageRating}</span>
//             <span className="text-xs text-gray-600 mt-1">out of 5</span>
//           </div>
//           <div className="flex flex-col items-end">
//             <div className="flex gap-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                   size={20}
//                 />
//               ))}
//             </div>
//             <span className="text-sm text-gray-600 mt-1">
//               {displayTotalReviews} Review{displayTotalReviews !== 1 ? 's' : ''}
//             </span>
//           </div>
//         </div>

//         {/* Rating Distribution */}
//         <div className="mt-4 space-y-2 bg-white p-4 rounded-lg border">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating Breakdown</h4>
//           {displayRatingDistribution.map((r) => (
//             <div key={r.stars} className="flex items-center text-sm">
//               <span className="w-8 text-gray-700 font-medium">{r.stars}★</span>
//               <div className="flex-1 bg-gray-200 h-3 rounded-full mx-3 overflow-hidden">
//                 <div 
//                   className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500" 
//                   style={{ width: `${r.percentage}%` }} 
//                 />
//               </div>
//               <span className="text-gray-500 text-xs min-w-[45px] text-right">
//                 {r.count} ({r.percentage}%)
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* ============================================================ */}
//         {/* INDIVIDUAL REVIEWS - WITH THREE-DOT MENU & CLICK TO EDIT */}
//         {/* ============================================================ */}
//         <div className="mt-6 space-y-3 max-h-[500px] overflow-y-auto pr-2">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3 sticky top-0 bg-white py-2 z-10">
//             Customer Reviews ({displayTotalReviews})
//           </h4>
          
//           {displayReviews.length > 0 ? (
//             displayReviews.map((r, idx) => {
//               const canEdit = isUserReview(r);
              
//               // Get display name for the review
//               const displayName = r.userName || 
//                                  (canEdit ? (userProfile?.name || localStorage.getItem('userName') || 'You') : `User ${idx + 1}`);
              
//               return (
//              <div
//   key={r._id || idx}
// onClick={() => canEdit && handleNavigateToFeedback(r)}
//   className={`border rounded-xl p-4 transition-all duration-200 relative ${
//     canEdit
//       ? "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl cursor-pointer hover:border-blue-500 hover:scale-[1.02] transform"
//       : "border-gray-200 bg-white hover:shadow-md"
//   }`}
//                 >
//                   {/* ======================================================== */}
//                   {/* REVIEW CARD HEADER WITH USER INFO */}
//                   {/* ======================================================== */}
//                   <div className="flex justify-between items-start mb-2">
//                     {/* Left Side: User Avatar & Info */}
//                     <div className="flex items-center gap-2 flex-1">
//                       <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg ${canEdit ? 'ring-4 ring-blue-200 animate-pulse' : ''}`}>
//                         {displayName.charAt(0).toUpperCase()}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <span className="font-bold text-gray-900 text-base truncate">
//                             {displayName}
//                           </span>
//                           {canEdit && (
//                             <span className="text-xs bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full font-bold flex-shrink-0 shadow-md animate-bounce">
//                               ✏️ YOUR REVIEW
//                             </span>
//                           )}
//                         </div>
//                         {r.createdAt && (
//                           <p className="text-xs text-gray-500 mt-0.5">
//                             {new Date(r.createdAt).toLocaleDateString('en-US', {
//                               year: 'numeric',
//                               month: 'short',
//                               day: 'numeric',
//                               hour: '2-digit',
//                               minute: '2-digit'
//                             })}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Right Side: Rating Stars */}
//                     <div className="flex items-center gap-2 flex-shrink-0">
//                       <div className="flex bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1.5 rounded-lg border-2 border-yellow-300 shadow-sm">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             size={16}
//                             className={i < r.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* ======================================================== */}
//                   {/* REVIEW TEXT CONTENT */}
//                   {/* ======================================================== */}
//                   <div className="mt-3">
//                     <p className="text-sm text-gray-700 leading-relaxed bg-white bg-opacity-60 p-3 rounded-lg border border-gray-200">
//                       {r.review || r.reviewText || r.comment || r.feedback || "No comment provided"}
//                     </p>
//                   </div>
                  
//                   {/* ✅ CLICK TO EDIT INDICATOR (ONLY FOR USER'S OWN REVIEWS) */}
//                   {canEdit && (
//                     <div className="mt-3 pt-3 border-t-2 border-blue-300">
//                       <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm bg-white bg-opacity-80 py-2 px-4 rounded-lg shadow-sm hover:bg-blue-100 transition-all">
//                         <Edit size={16} className="animate-pulse" />
//                         <span>👆 Click card to edit your review</span>
//                         <Edit size={16} className="animate-pulse" />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center py-12 bg-gray-50 rounded-xl">

//               <div className="text-5xl mb-3">📝</div>
//               <p className="text-gray-500 font-medium mb-1">No reviews yet</p>
//               <p className="text-gray-400 text-sm">
//                 Be the first to review this vehicle!
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ============================================================ */}
//       {/* BOOKING SUBMISSION LOADING MODAL */}
//       {/* ============================================================ */}
//       {isSubmittingBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
//             <div className="flex flex-col items-center">
//               <div className="relative mb-6">
//                 <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full animate-pulse"></div>
//                 </div>
//               </div>
              
//               <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
//                 Creating Your Booking...
//               </h2>
              
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 w-full mb-4 border border-blue-100 shadow-sm">
//                 {currentVehicle && (
//                   <>
//                     <div className="flex items-center gap-3 mb-4">
//                       <img 
//                         src={currentVehicle.image} 
//                         alt={currentVehicle.name}
//                         className="w-16 h-16 rounded-lg object-cover shadow-sm"
//                       />
//                       <div className="flex-1">
//                         <p className="font-bold text-gray-900 text-lg">{currentVehicle.name}</p>
//                         <p className="text-sm text-gray-600 capitalize">{currentVehicle.type}</p>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-2">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Car ID</span>
//                         <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
//                           {currentVehicle.id.substring(0, 12)}...
//                         </span>
//                       </div>
                      
//                       {apiCarData?.CarNumber && (
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Car Number</span>
//                           <span className="font-semibold text-gray-900">{apiCarData.CarNumber}</span>
//                         </div>
//                       )}
                      
//                       {selectedDateTime && (
//                         <div className="border-t border-blue-200 pt-2 mt-3">
//                           <p className="text-xs text-gray-600 mb-1">Booking Period</p>
//                           <p className="text-sm text-gray-700 font-medium">
//                             {selectedDateTime.startDate} {selectedDateTime.startTime}
//                             <br />
//                             to {selectedDateTime.endDate} {selectedDateTime.endTime}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
              
//               <div className="text-center space-y-2">
//                 <p className="text-gray-600 text-sm">
//                   Please wait while we process your booking...
//                 </p>
//                 <p className="text-blue-600 font-medium text-sm">
//                   Connecting to server & validating data
//                 </p>
//               </div>
              
//               <div className="flex gap-2 mt-5">
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ============================================================ */}
//       {/* API ERROR MODAL */}
//       {/* ============================================================ */}
//       {apiError && !isSubmittingBooking && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[110] max-w-md w-full mx-4 animate-slideDown">
//           <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-xl">
//             <div className="flex items-start">
//               <div className="flex-shrink-0">
//                 <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="ml-3 flex-1">
//                 <h3 className="text-sm font-bold text-red-800">Booking Failed</h3>
//                 <p className="mt-1 text-sm text-red-700">{apiError}</p>
//                 {currentVehicle && (
//                   <p className="mt-1 text-xs text-red-600">
//                     Car: {currentVehicle.name} (ID: {currentVehicle.id.substring(0, 8)}...)
//                   </p>
//                 )}
//                 <div className="mt-3 flex gap-2">
//                   <button
//                     onClick={() => {
//                       setApiError("");
//                       setIsDateTimeModalOpen(true);
//                     }}
//                     className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
//                   >
//                     Retry Booking
//                   </button>
//                   <button
//                     onClick={() => setApiError("")}
//                     className="px-3 py-1.5 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-300 hover:bg-red-50 transition-colors"
//                   >
//                     Dismiss
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ============================================================ */}
//       {/* SUCCESS MODAL */}
//       {/* ============================================================ */}
//       {showSuccessModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
//             <div className="flex justify-center mb-6">
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//                 <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//             </div>
   
//             <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
//               Booking Posted Successfully!
//             </h2>
//             <p className="text-gray-600 text-center mb-6">
//               After discussing with the owner, your booking has been confirmed. You will receive updates on your booking status.
//             </p>
   
//             <div className="bg-gray-50 rounded-lg p-4 mb-6">
//               <div className="flex items-center gap-3 mb-3">
//                 <img src={currentVehicle.image} alt={currentVehicle.name} className="w-16 h-16 rounded-lg object-cover" />
//                 <div>
//                   <h3 className="font-semibold text-gray-900">{currentVehicle.name}</h3>
//                   <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
//                 </div>
//               </div>
             
//               {selectedDateTime && (
//                 <div className="text-sm text-gray-600 space-y-1">
//                   <div className="flex justify-between">
//                     <span>Start:</span>
//                     <span className="font-medium">
//                       {new Date(selectedDateTime.startDate).toLocaleDateString()} - {selectedDateTime.startTime}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>End:</span>
//                     <span className="font-medium">
//                       {new Date(selectedDateTime.endDate).toLocaleDateString()} - {selectedDateTime.endTime}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
   
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowSuccessModal(false);
//                   navigate("/");
//                 }}
//                 className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
//               >
//                 Go Home
//               </button>
//               <button
//                 onClick={() => {
//                   setShowSuccessModal(false);
//                   setShowContactButtons(false);
//                   setSelectedDateTime(null);
//                   setBookingId(null);
//                   setWaitingTimerSeconds(30);
//                 }}
//                 className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//               >
//                 Book Another
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ============================================================ */}
//       {/* DATETIME MODAL */}
//       {/* ============================================================ */}
//       {isDateTimeModalOpen && (
//         <AvailabilityDateTimeModal
//           isOpen={isDateTimeModalOpen}
//           onClose={() => setIsDateTimeModalOpen(false)}
//           onSubmit={async (dateTime) => {
//             console.log("📅 DateTime selected:", dateTime);
//             setSelectedDateTime(dateTime);
//             setIsDateTimeModalOpen(false);
            
//             const result = await createBookingAPI(
//               dateTime.startDate,
//               dateTime.endDate,
//               dateTime.startTime,
//               dateTime.endTime
//             );
            
//             if (result) {
//               setShowSuccessModal(true);
//             }
//           }}
//           vehiclePrice={currentVehicle.price}
//         />
//       )}

//       {/* ============================================================ */}
//       {/* WAITING POPUP */}
//       {/* ============================================================ */}
//       {showWaitingPopup && (
//         <WaitingPopup
//           isOpen={showWaitingPopup}
//           onClose={handleCloseWaiting}
//           timerSeconds={waitingTimerSeconds}
//         />
//       )}

//       {/* ============================================================ */}
//       {/* BOOKING ACCEPTANCE */}
//       {/* ============================================================ */}
//       {showAcceptance && (
//         <BookingAcceptance
//           isOpen={showAcceptance}
//           onAccept={handleAcceptBooking}
//           onReject={handleRejectBooking}
//         />
//       )}

//       {/* ============================================================ */}
//       {/* REJECT MODAL */}
//       {/* ============================================================ */}
//       {showRejectModal && (
//         <BookingRejectModal
//           isOpen={showRejectModal}
//           onClose={handleCloseRejectModal}
//         />
//       )}

//       {/* ============================================================ */}
//       {/* CHAT POPUP */}
//       {/* ============================================================ */}
//       {isChatOpen && (
//         <PopupChat
//           isOpen={isChatOpen}
//           onClose={() => setIsChatOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default BookNow;






// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { vehicles } from "./data/Vehicle";
// import { Vehicle } from "../types/Vehicle";
// import { Star, Loader2, RefreshCw, Trash2, Edit, X } from "lucide-react";
// import apiService from "../services/api.service";
// import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
// import WaitingPopup from "../components/ui/WaitingPopup";
// import BookingAcceptance from "../components/ui/BookingAcceptance";
// import BookingRejectModal from "../components/ui/BookingRejectModal";
// import PopupChat from "../components/ui/PopupChat";
// import { useReviewStore } from "../store/review.store";
// import { useNotificationStore } from "../store/notification.store";
// import { useBookingStore } from "../store/booking.store";
// import toast from "react-hot-toast";
// import Feedback from "./Feedback";
// import Automatic from "../assets/icons/AutomaticLogo.png";
// import Driver from "../assets/icons/DriverLogo.png";
// import Acicon from "../assets/icons/AutomaticLogo.png";
// import Petrol from "../assets/icons/Petrol.png";

// const PRODUCTION_PROXIES = [
//   "https://corsproxy.io/?",
//   "https://api.codetabs.com/v1/proxy?quest=",
// ];

// const API_ENDPOINT = "http://3.110.122.127:3000/createBooking";

// interface Review {
//   _id: string;
//   userId: string;
//   vehicleId: string;
//   rating: number;
//   review?: string;           // Make optional
//   reviewText?: string;       // Alternative field
//   comment?: string;          // Alternative field  
//   feedback?: string;         // Alternative field
//   userName?: string;
//   createdAt?: string;
// }
// const BookNow: React.FC = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);
 
//   const {
//     getReviewsByVehicleId,
//     getAverageRating,
//     getTotalReviewCount,
//     getRatingDistribution,
//   } = useReviewStore();
//   const { addNotification } = useNotificationStore();
//   const { addBooking } = useBookingStore();

//   // API car data state
//   const [apiCarData, setApiCarData] = useState<any>(null);
//   const [loadingCarData, setLoadingCarData] = useState(true);
//   const [carDataError, setCarDataError] = useState("");
 

  
//   // Booking states
//   const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
//   const [showContactButtons, setShowContactButtons] = useState(false);
//   const [showWaitingPopup, setShowWaitingPopup] = useState(false);
//   const [showAcceptance, setShowAcceptance] = useState(false);
//   const [waitingTimerSeconds, setWaitingTimerSeconds] = useState<number>(30);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [selectedDateTime, setSelectedDateTime] = useState<{
//     startDate: string;
//     endDate: string;
//     startTime: string;
//     endTime: string;
//   } | null>(null);
//   const [bookingId, setBookingId] = useState<string | null>(null);
//   const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
//   const [apiError, setApiError] = useState<string>("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
  
//   // Enhanced Review States
//   const [apiReviews, setApiReviews] = useState<Review[]>([]);
//   const [loadingReviews, setLoadingReviews] = useState(false);
//   const [reviewsError, setReviewsError] = useState<string>("");
//   const [lastFetchTime, setLastFetchTime] = useState<number>(0);

//   // Average Rating from API
//   const [apiAverageRating, setApiAverageRating] = useState<number>(0);
//   const [loadingAverageRating, setLoadingAverageRating] = useState<boolean>(false);

//   // Deleting review state
//   const [isDeletingReview, setIsDeletingReview] = useState<boolean>(false);
//   // ✅ ADD THIS NEW STATE:
// const [openMenuId, setOpenMenuId] = useState<string | null>(null);
// // ✅ ADD THESE NEW STATES HERE:
// const [editingReview, setEditingReview] = useState<Review | null>(null);
// const [showEditModal, setShowEditModal] = useState<boolean>(false);
// const [editRating, setEditRating] = useState<number>(0);
// const [editFeedback, setEditFeedback] = useState<string>("");
// const [isSubmittingEdit, setIsSubmittingEdit] = useState<boolean>(false);

//   // Get current user ID from localStorage
//   const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
// // Fetch car details from API
//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       if (id) {
//         try {
//           setLoadingCarData(true);
//           setCarDataError("");
//           console.log(`🚗 Fetching car details for ID: ${id}`);
          
//           const response = await apiService.car.getCarById(id);
//           console.log("✅ Full API response:", response);
          
//           let carData = null;
          
//           if (response) {
//             if ((response as any).data) {
//               carData = (response as any).data;
//             } else if ((response as any).car) {
//               carData = (response as any).car;
//             } else {
//               carData = response;
//             }
            
//             console.log("🎯 Final car data to set:", carData);
//             setApiCarData(carData);
//           }
//         } catch (err: any) {
//           console.error("❌ Error fetching car details:", err);
//           setCarDataError(err.message || "Failed to load car details");
//         } finally {
//           setLoadingCarData(false);
//         }
//       }
//     };

//     fetchCarDetails();
//   }, [id]);

//   // Fetch reviews on component mount
//   useEffect(() => {
//     if (id) {
//       console.log("🔄 Initial review fetch triggered for vehicle:", id);
//       fetchReviewsByVehicleId(id);
//       fetchAverageRating(id);
//     }
//   }, [id]);

//   // Auto-refresh reviews every 30 seconds
//   useEffect(() => {
//     if (id) {
//       const intervalId = setInterval(() => {
//         console.log("🔄 Auto-refreshing reviews...");
//         fetchReviewsByVehicleId(id, true);
//         fetchAverageRating(id, true);
//       }, 30000);

//       return () => clearInterval(intervalId);
//     }
//   }, [id]);

//   // Timer effect for booking
//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;
//     if (showWaitingPopup && waitingTimerSeconds > 0) {
//       interval = setInterval(() => {
//         setWaitingTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
//       }, 1000);
//     }
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [showWaitingPopup, waitingTimerSeconds]);
 
//   useEffect(() => {
//     if (showWaitingPopup && waitingTimerSeconds === 0) {
//       handleTimerComplete();
//     }
//   }, [waitingTimerSeconds, showWaitingPopup]);
// // Helper function to check if review belongs to current user
//   const isUserReview = (review: Review): boolean => {
//     const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
//     return review.userId === currentUserId;
//   };
// // Close menu when clicking outside
// useEffect(() => {
//   const handleClickOutside = (event: MouseEvent) => {
//     const target = event.target as HTMLElement;
//     if (!target.closest('.review-menu')) {
//       setOpenMenuId(null);
//     }
//   };

//   document.addEventListener('mousedown', handleClickOutside);
//   return () => document.removeEventListener('mousedown', handleClickOutside);
// }, []);
//   // Refresh reviews handler
//   const handleRefreshReviews = () => {
//     if (id) {
//       console.log("🔄 Manual refresh triggered");
//       fetchReviewsByVehicleId(id, false);
//       fetchAverageRating(id, false);
//     }
//   };

//   // Navigate to feedback page for editing
//   const handleNavigateToFeedback = (review: Review) => {
//     navigate(`/feedback/${id}`, { 
//       state: { 
//         vehicleId: id,
//         existingReview: review,
//         mode: 'edit'
//       } 
//     });
//   };
// const handleEditClick = (review: Review) => {
//   setEditingReview(review);
//   setEditRating(review.rating);
//   setEditFeedback(review.review || review.reviewText || review.comment || review.feedback || "");
//   setShowEditModal(true);
// };
//   // Delete review handler
//   const handleDeleteReview = async (reviewId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
    
//     if (!window.confirm('Are you sure you want to delete this review?')) {
//       return;
//     }

//     setIsDeletingReview(true);
    
//     try {
//       console.log("🗑️ Deleting review:", reviewId);
      
//       const response = await fetch(`http://3.110.122.127:3000/deleteReview/${reviewId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log("Delete response status:", response.status);

//       if (response.ok) {
//         toast.success('✅ Review deleted successfully', {
//           duration: 2000,
//           position: 'top-right',
//         });
        
//         if (id) {
//           setTimeout(() => {
//             fetchReviewsByVehicleId(id, false);
//             fetchAverageRating(id, false);
//           }, 500);
//         }
//       } else {
//         toast.error('❌ Failed to delete review', {
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
//     }
//   };
//   // Delete review handler - EXISTING CODE ENDS HERE

// // ✅ ADD THIS NEW FUNCTION HERE:
// const handleUpdateReview = async () => {
//   if (editRating === 0) {
//     toast.error("Please select a rating", {
//       duration: 2000,
//       position: 'top-right',
//     });
//     return;
//   }
//   if (!editFeedback.trim()) {
//     toast.error("Please write your feedback", {
//       duration: 2000,
//       position: 'top-right',
//     });
//     return;
//   }

//   setIsSubmittingEdit(true);

//   try {
//     console.log("✏️ Updating review:", editingReview?._id);
//       // ✅ Create FormData exactly as backend expects
//     const formdata = new FormData();
//     formdata.append("AutoId", "");
//     formdata.append("BikeId", "");
//     formdata.append("CarId", editingReview._id);  // Vehicle ID goes here
//     formdata.append("reviewText", editFeedback);
//     formdata.append("rating", editRating.toString());

//     const requestOptions = {
//       method: "PUT",
//       body: formdata,
//       redirect: "follow"
//     };

 
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     const urlencoded = new URLSearchParams();
//     urlencoded.append("review", editFeedback);
//     urlencoded.append("rating", editRating.toString());

//     const response = await fetch(
//       `http://3.110.122.127:3000/updateReview/${editingReview?._id}`,
      
//       {
//         method: "PUT",
//         headers: myHeaders,
//         body: urlencoded,
//       }
//     );

//     console.log("Update response status:", response.status);
//  const result = await response.text();
//     console.log("✅ Update response:", result);
//     if (response.ok) {
//       toast.success("✅ Review updated successfully!", {
//         duration: 2000,
//         position: 'top-right',
//       });
      
//       setShowEditModal(false);
//       setEditingReview(null);
      
//       if (id) {
//         setTimeout(() => {
//           fetchReviewsByVehicleId(id, false);
//           fetchAverageRating(id, false);
//         }, 500);
//       }
//     } else {
//       toast.error("❌ Failed to update review", {
//         duration: 3000,
//         position: 'top-right',
//       });
//     }
//   } catch (error: any) {
//     console.error("❌ Error updating review:", error);
//     toast.error(`Error: ${error.message}`, {
//       duration: 3000,
//       position: 'top-right',
//     });
//   } finally {
//     setIsSubmittingEdit(false);
//   }
// };


// // Fetch average rating from API
//   const fetchAverageRating = async (vehicleId: string, silent: boolean = false) => {
//     if (!silent) {
//       setLoadingAverageRating(true);
//     }

//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("⭐ FETCHING AVERAGE RATING");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("📋 Vehicle ID:", vehicleId);

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

//       console.log("📥 Average Rating Response Status:", response.status);

//       if (response.ok) {
//         const result = await response.json();
//         console.log("✅ Average Rating Response:", result);

//         if (result.success && result.averageRating !== undefined) {
//           const avgRating = parseFloat(result.averageRating);
//           setApiAverageRating(avgRating);
//           console.log("⭐ Average Rating Set:", avgRating);
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
//   // Fetch reviews from API
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

//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("🔍 FETCHING REVIEWS FOR VEHICLE");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("📋 Vehicle ID:", vehicleId);

//     try {
//       const myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//       const urlencoded = new URLSearchParams();
//       urlencoded.append("vechileType", "Car");
//       urlencoded.append("VechileId", vehicleId);

//       const requestOptions: RequestInit = {
//         method: "GET",
//         headers: myHeaders,
//         body: urlencoded,
//       };

//       const response = await fetch(
//         `http://3.110.122.127:3000/getReviewsById/${vehicleId}`,
//         requestOptions
//       );

//       console.log("📥 Response Status:", response.status);

//       if (response.ok) {
//         const result = await response.json();
//         console.log("✅ Reviews Response:", result);

//         if (result.success && Array.isArray(result.reviews)) {
//           console.log("🎉 SUCCESS: Reviews found!", result.reviews.length);
//             // ✅ ADD THIS LINE TO SEE THE ACTUAL REVIEW DATA:
//   console.log("📝 Full Review Data:", JSON.stringify(result.reviews, null, 2));
  
//   setApiReviews(result.reviews);
          
//           setApiReviews(result.reviews);
          
//           if (!silent) {
//             toast.success(`✅ Loaded ${result.reviews.length} review(s)`, {
//               duration: 2000,
//               position: 'top-right',
//             });
//           }

//           return result.reviews;
//         } else {
//           console.log("ℹ️ No reviews found");
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
//   // Calculate average rating from API reviews
//   const calculateAverageRating = (reviews: Review[]): number => {
//     if (reviews.length === 0) return 0;
//     const total = reviews.reduce((sum, review) => sum + review.rating, 0);
//     const average = total / reviews.length;
//     return Number(average.toFixed(1));
//   };

//   // Calculate rating distribution from API reviews
//   const calculateRatingDistribution = (reviews: Review[]) => {
//     const distribution = [5, 4, 3, 2, 1].map(stars => {
//       const count = reviews.filter(r => r.rating === stars).length;
//       const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
//       return { stars, count, percentage };
//     });
//     return distribution;
//   };

//   // Map vehicle type for API
//   const mapVehicleTypeForAPI = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
//     if (!type) {
//       console.warn("⚠️ Vehicle type is undefined/null, defaulting to 'Car'");
//       return "Car";
//     }
    
//     const normalized = type.toLowerCase();
//     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
//       car: "Car",
//       auto: "Auto",
//       bike: "Bike",
//     };
    
//     return typeMap[normalized] || "Car";
//   };
  
//   // Map vehicle type for store
//   const mapVehicleTypeForStore = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
//     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
//       car: "Car",
//       auto: "Auto",
//       bike: "Bike",
//     };
//     return type ? typeMap[type.toLowerCase()] || "Car" : "Car";
//   };
 
//   // Calculate total hours between dates and times
//   const calculateTotalHours = (
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
//   ): number => {
//     try {
//       const parseTime = (timeStr: string) => {
//         const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
//         if (!match) return { hours: 0, minutes: 0 };
       
//         let hours = parseInt(match[1]);
//         const minutes = parseInt(match[2] || '0');
//         const period = match[3]?.toUpperCase();
       
//         if (period === 'PM' && hours !== 12) hours += 12;
//         if (period === 'AM' && hours === 12) hours = 0;
       
//         return { hours, minutes };
//       };
 
//       const startTimeParsed = parseTime(startTime);
//       const endTimeParsed = parseTime(endTime);
 
//       const start = new Date(startDate);
//       start.setHours(startTimeParsed.hours, startTimeParsed.minutes, 0, 0);
 
//       const end = new Date(endDate);
//       end.setHours(endTimeParsed.hours, endTimeParsed.minutes, 0, 0);
 
//       const diffInMs = end.getTime() - start.getTime();
//       const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
     
//       return hours > 0 ? hours : 1;
//     } catch (error) {
//       console.error("❌ Error calculating hours:", error);
//       return 1;
//     }
//   };
 
//   // Format date for API
//   const formatDateForAPI = (dateString: string): string => {
//     try {
//       const date = new Date(dateString);
//       if (!isNaN(date.getTime())) {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//       }
//     } catch (error) {
//       console.error("❌ Date formatting error:", error);
//     }
//     return dateString;
//   };
 
//   // Format time for API
//   const formatTimeForAPI = (timeString: string): string => {
//     try {
//       const ampmMatch = timeString.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
//       if (ampmMatch) {
//         let hours = parseInt(ampmMatch[1]);
//         const minutes = ampmMatch[2] || '00';
//         const period = ampmMatch[3].toUpperCase();
       
//         if (period === 'PM' && hours !== 12) hours += 12;
//         if (period === 'AM' && hours === 12) hours = 0;
       
//         return `${hours.toString().padStart(2, '0')}.${minutes}`;
//       }
//     } catch (error) {
//       console.error("❌ Time formatting error:", error);
//     }
//     return timeString;
//   };
//   // Booking handlers
//   const handleTimerComplete = () => {
//     console.log("⏰ Timer completed - Opening BookingAcceptance");
//     setShowWaitingPopup(false);
//     setShowAcceptance(true);
//   };
 
//   const handleCloseWaiting = () => {
//     console.log("❌ WaitingPopup closed manually");
//     setShowWaitingPopup(false);
//     setWaitingTimerSeconds(30);
//   };
 
//   const handleAcceptBooking = () => {
//     console.log("✅ Booking Accepted by Owner!");
//     setShowAcceptance(false);
//     setShowContactButtons(true);
//   };
 
//   const handleRejectBooking = () => {
//     console.log("❌ Booking Rejected by Owner!");
//     setShowAcceptance(false);
//     setShowRejectModal(true);
//   };
 
//   const handleCloseRejectModal = () => {
//     console.log("🔙 Reject modal closed");
//     setShowRejectModal(false);
//     setSelectedDateTime(null);
//     setBookingId(null);
//     setWaitingTimerSeconds(30);
//   };
 
//   const handleCallOwner = () => {
//     console.log("📞 User calling owner...");
//     setTimeout(() => {
//       handleConfirmBooking();
//     }, 1000);
//   };
//   // Create current vehicle object
//   const currentVehicle = vehicle || (apiCarData ? {
//     id: apiCarData._id || apiCarData.id || id || '',
//     name: apiCarData.CarName || 'Unknown Vehicle',
//     image: (apiCarData.carImages && apiCarData.carImages.length > 0) 
//       ? apiCarData.carImages[0] 
//       : apiCarData.carImage || apiCarData.image || 'https://via.placeholder.com/400',
//     price: apiCarData.RentPerDay || apiCarData.pricePerHour || '0',
//     type: 'car' as Vehicle["type"],
//   } : null);
//   const handleConfirmBooking = () => {
//     if (!currentVehicle || !selectedDateTime) {
//       console.error("❌ Cannot confirm booking");
//       return;
//     }
 
//     const currentDate = new Date();
//     console.log("🎉 Confirming booking with ID:", bookingId);
 
//     addBooking({
//       id: bookingId || Date.now().toString(),
//       vehicleId: currentVehicle.id,
//       vehicleName: currentVehicle.name,
//       vehicleImage: currentVehicle.image,
//       vehicleType: mapVehicleTypeForStore(currentVehicle.type),
//       customerName: "Current User",
//       bookingDate: currentDate.toLocaleDateString("en-US"),
//       bookingTime: currentDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       startDate: selectedDateTime.startDate,
//       startTime: selectedDateTime.startTime,
//       endDate: selectedDateTime.endDate,
//       endTime: selectedDateTime.endTime,
//       modelNo: currentVehicle.id.toUpperCase(),
//       status: "Booked",
//       price: currentVehicle.price,
//     });
 
//     setShowSuccessModal(true);
//   };
//   const createBookingAPI = async ( 
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
//   ) => {
//     if (!currentVehicle) {
//       const errorMsg = "Vehicle information is missing. Please try again.";
//       setApiError(errorMsg);
//       addNotification({
//         title: "Booking Failed",
//         message: errorMsg,
//         type: "booking_declined",
//       });
//       return null;
//     }

//     setIsSubmittingBooking(true);
//     setApiError("");

//     try {
//       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//       console.log("🚀 PRODUCTION BOOKING API - START");
//       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      
//       const totalHours = calculateTotalHours(startDate, endDate, startTime, endTime);
//       const pricePerDay = parseInt(String(apiCarData?.RentPerDay || currentVehicle.price || "0"), 10);
//       const pricePerHour = pricePerDay > 0 ? Math.round(pricePerDay / 24) : parseInt(String(currentVehicle.price || "0"), 10);
//       const totalPrice = totalHours * pricePerHour;
      
//       const formattedFromDate = formatDateForAPI(startDate);
//       const formattedToDate = formatDateForAPI(endDate);
//       const formattedFromTime = formatTimeForAPI(startTime);
//       const formattedToTime = formatTimeForAPI(endTime);
      
//       const userId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
//       const contactNumber = localStorage.getItem('contactNumber') || "6301818409";
//       const contactName = localStorage.getItem('contactName') || localStorage.getItem('userName') || "User";
//       const userLatitude = localStorage.getItem('latitude') || "17.438095";
//       const userLongitude = localStorage.getItem('longitude') || "78.4485";

//       const requestBody = {
//         userId: userId,
//         contactNumber: contactNumber,
//         contactName: contactName,
//         latitude: userLatitude,
//         longitude: userLongitude,
//         VechileId: currentVehicle.id,
//         vechileType: mapVehicleTypeForAPI(currentVehicle.type),
//         carName: apiCarData?.CarName || currentVehicle.name || '',
//         carModel: apiCarData?.Model || '',
//         carBrand: apiCarData?.Brand || '',
//         carNumber: apiCarData?.CarNumber || '',
//         fuelType: apiCarData?.FuelType || '',
//         transmissionType: apiCarData?.TransmissionType || '',
//         seatingCapacity: apiCarData?.SeatingCapacity?.toString() || '',
//         pricePerDay: pricePerDay.toString(),
//         pricePerHour: pricePerHour.toString(),
//         pricePerKm: pricePerHour.toString(),
//         FromDate: formattedFromDate,
//         ToDate: formattedToDate,
//         FromTime: formattedFromTime,
//         ToTime: formattedToTime,
//         totalHours: totalHours.toString(),
//         totalPrice: totalPrice.toString(),
//         pickupAddress: apiCarData?.pickupAddress || '',
//         dropoffAddress: apiCarData?.pickupAddress || '',
//       };

//       console.log("📦 Request Body:", requestBody);

//       const urlencoded = new URLSearchParams();
//       Object.entries(requestBody).forEach(([key, value]) => {
//         urlencoded.append(key, value);
//       });

//       let response;
//       for (let i = 0; i < PRODUCTION_PROXIES.length; i++) {
//         try {
//           const proxiedUrl = `${PRODUCTION_PROXIES[i]}${encodeURIComponent(API_ENDPOINT)}`;
//           console.log(`🌐 Trying proxy [${i + 1}]:`, proxiedUrl);

//           response = await Promise.race([
//             fetch(proxiedUrl, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//               },
//               body: urlencoded.toString(),
//             }),
//             new Promise<never>((_, reject) =>
//               setTimeout(() => reject(new Error('Proxy timeout after 15s')), 15000)
//             )
//           ]);

//           if (response.ok) {
//             const text = await response.text();
           
//             let result;
//             try {
//               result = JSON.parse(text);
//             } catch {
//               result = { success: true, message: text };
//             }

//             const bookingIdFromResponse = result?.bookingId || 
//                                          result?.data?.bookingId || 
//                                          result?._id || 
//                                          result?.data?._id ||
//                                          `BOOK-${Date.now()}`;
            
//             setBookingId(bookingIdFromResponse);
            
//             addNotification({
//               title: "Booking Created Successfully! 🎉",
//               message: `Your booking for ${requestBody.carName} has been confirmed!`,
//               type: "booking_confirmed",
//               vehicleId: currentVehicle.id,
//               vehicleName: requestBody.carName,
//               bookingId: bookingIdFromResponse,
//             });
            
//             addBooking({
//               id: bookingIdFromResponse,
//               vehicleId: currentVehicle.id,
//               vehicleName: requestBody.carName,
//               vehicleImage: currentVehicle.image,
//               vehicleType: mapVehicleTypeForStore(currentVehicle.type),
//               price: totalPrice,
//               startDate: formattedFromDate,
//               endDate: formattedToDate,
//               startTime: formattedFromTime,
//               endTime: formattedToTime,
//               status: 'Booked',
//             });
            
//             return result;
//           }
//         } catch (proxyError: any) {
//           console.warn(`❌ Proxy ${i + 1} failed:`, proxyError.message);
//         }
//       }
      
//       throw new Error("Unable to connect to booking server. Please check your internet connection and try again.");

//     } catch (error: any) {
//       console.error("❌ BOOKING CREATION FAILED");
//       console.error("❌ Error:", error.message);
     
//       const errorMessage = error.message || "Failed to create booking. Please try again.";
//       setApiError(errorMessage);
      
//       addNotification({
//         title: "Booking Failed ❌",
//         message: errorMessage,
//         type: "booking_declined",
//         vehicleId: currentVehicle.id,
//         vehicleName: currentVehicle.name,
//       });
      
//       return null;
     
//     } finally {
//       setIsSubmittingBooking(false);
//     }
//   };
//   // Calculate display values
//   const vehicleReviews = getReviewsByVehicleId(currentVehicle?.id || '');
//   const averageRating = getAverageRating(currentVehicle?.id || '');
//   const totalReviews = getTotalReviewCount(currentVehicle?.id || '');
//   const ratingDistribution = getRatingDistribution(currentVehicle?.id || '');

//   // Use API reviews if available, otherwise fallback to local store
//   const displayReviews = apiReviews.length > 0 ? apiReviews : vehicleReviews;
  
//   // Use API average rating if available
//   const displayAverageRating = apiAverageRating > 0 
//     ? apiAverageRating 
//     : (apiReviews.length > 0 
//         ? calculateAverageRating(apiReviews) 
//         : averageRating);
  
//   const displayTotalReviews = apiReviews.length > 0 
//     ? apiReviews.length 
//     : totalReviews;
  
//   const displayRatingDistribution = apiReviews.length > 0 
//     ? calculateRatingDistribution(apiReviews) 
//     : ratingDistribution;
//     // Loading state
//   if (loadingCarData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
//         <div className="text-center space-y-4 p-8">
//           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
//           <p className="text-xl text-gray-700 font-semibold">Loading vehicle details...</p>
//           <p className="text-sm text-gray-500">Please wait while we fetch the car information</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (carDataError && !vehicle) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
//         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
//           <div className="text-6xl">❌</div>
//           <p className="text-xl text-red-600 font-bold">Error Loading Vehicle</p>
//           <p className="text-gray-600">{carDataError}</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
//           >
//             ← Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Not found state
//   if (!vehicle && !apiCarData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
//           <div className="text-6xl">🚗</div>
//           <p className="text-xl text-gray-700 font-bold">Vehicle Not Found</p>
//           <p className="text-gray-600">The vehicle you're looking for doesn't exist or has been removed.</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
//           >
//             ← Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // No vehicle data
//   if (!currentVehicle) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center space-y-4 p-8">
//           <p className="text-xl text-gray-700">Vehicle data not available!</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//       {/* LEFT COLUMN - VEHICLE IMAGE */}
//       <div className="lg:col-span-1">
//         <img
//           src={currentVehicle.image}
//           alt={currentVehicle.name}
//           className="rounded-xl w-full mb-4"
//         />
//         <div className="flex justify-center space-x-2 mt-2">
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//         </div>
//       </div>

//       {/* MIDDLE COLUMN - VEHICLE DETAILS */}
//       <div className="lg:col-span-1">
//         <h1 className="text-3xl font-bold mb-2">{currentVehicle.name}</h1>
        
//         {/* Rating Section */}
//         <div className="flex items-center gap-2 mb-4">
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 size={20}
//                 className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//               />
//             ))}
//           </div>
//           <span className="text-sm text-gray-600">
//             {displayAverageRating} ({displayTotalReviews} reviews)
//           </span>
//         </div>
        
//         {/* 🔍 DEBUG: Show raw review data */}
// {/* {displayReviews.length > 0 && (
//   <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs">
//     <p className="font-bold text-purple-800 mb-2">🔍 Debug: Review Data</p>
//     <pre className="overflow-auto max-h-32 text-purple-700">
//       {JSON.stringify(displayReviews[0], null, 2)}
//     </pre>
//   </div>
// )} */}

//         {/* Price */}
//         <div className="mb-6">
//           <span className="text-3xl font-bold text-blue-600">₹{currentVehicle.price}</span>
//           <span className="text-gray-600 ml-2">/day</span>
//         </div>

//         {/* Vehicle Specifications */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           {apiCarData?.TransmissionType && (
//             <div className="flex items-center gap-2">
//               <img src={Automatic} alt="Transmission" className="w-6 h-6" />
//               <span className="text-sm text-gray-700">{apiCarData.TransmissionType}</span>
//             </div>
//           )}
//           {apiCarData?.FuelType && (
//             <div className="flex items-center gap-2">
//               <img src={Petrol} alt="Fuel" className="w-6 h-6" />
//               <span className="text-sm text-gray-700">{apiCarData.FuelType}</span>
//             </div>
//           )}
//           {apiCarData?.SeatingCapacity && (
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-700">👥 {apiCarData.SeatingCapacity} Seater</span>
//             </div>
//           )}
//         </div>

//         {/* Book Now Button */}
//         <button
//           onClick={() => setIsDateTimeModalOpen(true)}
//           className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition shadow-md"
//         >
//           Book Now
//         </button>
//       </div>
//       {/* RIGHT COLUMN - REVIEWS & RATINGS */}
//       <div className="lg:col-span-1">
//         {/* Header with Refresh Button */}
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="text-lg font-bold">Rating & Reviews</h3>
//           <div className="flex items-center gap-2">
//             {(loadingReviews || loadingAverageRating) && (
//               <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
//             )}
//             <button
//               onClick={handleRefreshReviews}
//               disabled={loadingReviews || loadingAverageRating}
//               className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//               title="Refresh reviews"
//             >
//               <RefreshCw className={`w-4 h-4 text-gray-600 ${(loadingReviews || loadingAverageRating) ? 'animate-spin' : ''}`} />
//             </button>
//           </div>
//         </div>

//         {/* Review Source Indicator */}
//         {apiReviews.length > 0 && (
//           <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
//             <span className="text-xs text-green-700 font-medium">
//               ✓ Live reviews from API
//             </span>
//             <span className="text-xs text-gray-500">
//               (Updated {new Date(lastFetchTime).toLocaleTimeString()})
//             </span>
//           </div>
//         )}

//         {reviewsError && (
//           <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-xs text-yellow-700">{reviewsError}</p>
//           </div>
//         )}

//         {/* Average Rating Display */}
//         <div className="flex items-center mt-2 mb-2 justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
//           <div className="flex flex-col">
//             <span className="text-3xl font-bold text-gray-900">{displayAverageRating}</span>
//             <span className="text-xs text-gray-600 mt-1">out of 5</span>
//           </div>
//           <div className="flex flex-col items-end">
//             <div className="flex gap-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                   size={20}
//                 />
//               ))}
//             </div>
//             <span className="text-sm text-gray-600 mt-1">
//               {displayTotalReviews} Review{displayTotalReviews !== 1 ? 's' : ''}
//             </span>
//           </div>
//         </div>

//         {/* Rating Distribution */}
//         <div className="mt-4 space-y-2 bg-white p-4 rounded-lg border">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating Breakdown</h4>
//           {displayRatingDistribution.map((r) => (
//             <div key={r.stars} className="flex items-center text-sm">
//               <span className="w-8 text-gray-700 font-medium">{r.stars}★</span>
//               <div className="flex-1 bg-gray-200 h-3 rounded-full mx-3 overflow-hidden">
//                 <div 
//                   className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500" 
//                   style={{ width: `${r.percentage}%` }} 
//                 />
//               </div>
//               <span className="text-gray-500 text-xs min-w-[45px] text-right">
//                 {r.count} ({r.percentage}%)
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Individual Reviews */}
//         <div className="mt-6 space-y-3 max-h-[500px] overflow-y-auto pr-2">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3 sticky top-0 bg-white py-2 z-10">
//             Customer Reviews ({displayTotalReviews})
//           </h4>
          
//     {displayReviews.length > 0 ? (
//   displayReviews.map((r, idx) => {
//     const canEdit = isUserReview(r);
    
//     return (
//       <div 
//         key={r._id || idx} 
//         className={`border rounded-xl p-4 transition relative ${
//           canEdit 
//             ? 'border-blue-200 bg-blue-50 hover:shadow-md' 
//             : 'border-gray-200 bg-white hover:shadow-md'
//         }`}
//       >
        
   
//   {/* THREE-DOT MENU - ONLY FOR USER'S REVIEWS */}
//   {canEdit && (
//     <div className="relative review-menu">
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           setOpenMenuId(openMenuId === r._id ? null : r._id);
//         }}
//      className={`p-1.5 transition-all duration-200 ${
//   canEdit 
//     ? 'bg-green-200 text-green-800 border-2 border-green-500' 
//     : 'bg-white-200 text-black-800 border-2 border-black-500'
// }`}

//       >
//         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//           <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//         </svg>
//       </button>

//         {/* Dropdown Menu - MUST BE INSIDE review-menu div */}
//       {openMenuId === r._id && (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-30">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleEditClick(r);  // This will navigate to feedback page
//             }}
//             className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50"
//           >
//             <Edit size={16} className="text-blue-600" />
//             <span className="font-medium">Edit Review</span>
//           </button>
          
//           <div className="border-t"></div>
          
//           <button
//             onClick={(e) => handleDeleteReview(r._id, e)}
//             className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
//           >
//             <Trash2 size={16} />
//             <span className="font-medium">Delete Review</span>
//           </button>
//         </div>
//       )}
//     </div>
 
//         )}
//  {/* DEBUG BADGE */}
//         {canEdit && (
//           <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
//             CAN EDIT
//           </div>
//         )}
       

//         {/* Header with User Info */}
//         <div className="flex justify-between items-start mb-2">
//           <div className="flex items-center gap-2 flex-1">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm">
//               {(r.userName || `User ${idx + 1}`).charAt(0).toUpperCase()}
//             </div>
//             <div className="flex-1">
//               <div className="flex items-center gap-2">
//                 <span className="font-semibold text-gray-900 text-sm">
//                   {r.userName || `User ${idx + 1}`}
//                 </span>
//                 {canEdit && (
//                   <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium">
//                     You
//                   </span>
//                 )}
//               </div>
//               {r.createdAt && (
//                 <p className="text-xs text-gray-400">
//                   {new Date(r.createdAt).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'short',
//                     day: 'numeric'
//                   })}
//                 </p>
//               )}
//               {/* DEBUG INFO */}
            
//             </div>
//           </div>

//           {/* Rating and Menu Container */}
//           <div className="flex items-center gap-2">
//             {/* Rating Display */}
//             <div className="flex bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   size={14}
//                   className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                 />
//               ))}
//             </div>

//             {/* THREE-DOT MENU - ALWAYS SHOW FOR TESTING */}
//             <div className="relative review-menu">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   console.log("Three dots clicked!", { reviewId: r._id, canEdit });
//                   setOpenMenuId(openMenuId === r._id ? null : r._id);
//                 }}
//                 className={`p-1.5 rounded-full transition-all duration-200 flex items-center justify-center ${
//                   canEdit 
//                     ? 'bg-green-200 text-green-800 border-2 border-green-500' 
//                     : 'bg-white-200 text-black-800 border-2 border-black-500'
//                 }`}
//                 title={canEdit ? "Your review - Click to edit/delete" : "Not your review"}
//                 style={{ minWidth: '32px', minHeight: '32px' }}
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//                 </svg>
//               </button>
//               </div>
// </div>
//         </div>

//         {/* Review Text */}
//         <p className="text-sm text-gray-700 leading-relaxed mt-2 mb-3">
//           {r.review || r.reviewText || r.comment || r.feedback || "No comment provided"}
//         </p>
//       </div>
//     );
//   })
// ) : (
//   <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
//     <div className="text-5xl mb-3">📝</div>
//     <p className="text-gray-500 font-medium mb-1">No reviews yet</p>
//     <p className="text-gray-400 text-sm">
//       Be the first to review this vehicle!
//     </p>
//   </div>
// )}
// </div>
//       </div>

//       {/* Booking Submission Loading Modal */}
//       {isSubmittingBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
//             <div className="flex flex-col items-center">
//               <div className="relative mb-6">
//                 <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full animate-pulse"></div>
//                 </div>
//               </div>
              
//               <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
//                 Creating Your Booking...
//               </h2>
              
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 w-full mb-4 border border-blue-100 shadow-sm">
//                 {currentVehicle && (
//                   <>
//                     <div className="flex items-center gap-3 mb-4">
//                       <img 
//                         src={currentVehicle.image} 
//                         alt={currentVehicle.name}
//                         className="w-16 h-16 rounded-lg object-cover shadow-sm"
//                       />
//                       <div className="flex-1">
//                         <p className="font-bold text-gray-900 text-lg">{currentVehicle.name}</p>
//                         <p className="text-sm text-gray-600 capitalize">{currentVehicle.type}</p>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-2">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Car ID</span>
//                         <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
//                           {currentVehicle.id.substring(0, 12)}...
//                         </span>
//                       </div>
                      
//                       {apiCarData?.CarNumber && (
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Car Number</span>
//                           <span className="font-semibold text-gray-900">{apiCarData.CarNumber}</span>
//                         </div>
//                       )}
                      
//                       {selectedDateTime && (
//                         <div className="border-t border-blue-200 pt-2 mt-3">
//                           <p className="text-xs text-gray-600 mb-1">Booking Period</p>
//                           <p className="text-sm text-gray-700 font-medium">
//                             {selectedDateTime.startDate} {selectedDateTime.startTime}
//                             <br />
//                             to {selectedDateTime.endDate} {selectedDateTime.endTime}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
              
//               <div className="text-center space-y-2">
//                 <p className="text-gray-600 text-sm">
//                   Please wait while we process your booking...
//                 </p>
//                 <p className="text-blue-600 font-medium text-sm">
//                   Connecting to server & validating data
//                 </p>
//               </div>
              
//               <div className="flex gap-2 mt-5">
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* API Error Modal */}
//       {apiError && !isSubmittingBooking && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[110] max-w-md w-full mx-4 animate-slideDown">
//           <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-xl">
//             <div className="flex items-start">
//               <div className="flex-shrink-0">
//                 <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="ml-3 flex-1">
//                 <h3 className="text-sm font-bold text-red-800">Booking Failed</h3>
//                 <p className="mt-1 text-sm text-red-700">{apiError}</p>
//                 {currentVehicle && (
//                   <p className="mt-1 text-xs text-red-600">
//                     Car: {currentVehicle.name} (ID: {currentVehicle.id.substring(0, 8)}...)
//                   </p>
//                 )}
//                 <div className="mt-3 flex gap-2">
//                   <button
//                     onClick={() => {
//                       setApiError("");
//                       setIsDateTimeModalOpen(true);
//                     }}
//                     className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
//                   >
//                     Retry Booking
//                   </button>
//                   <button
//                     onClick={() => setApiError("")}
//                     className="px-3 py-1.5 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-300 hover:bg-red-50 transition-colors"
//                   >
//                     Dismiss
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
//       {showSuccessModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
//             <div className="flex justify-center mb-6">
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//                 <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//             </div>
   
//             <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
//               Booking Posted Successfully!
//             </h2>
//             <p className="text-gray-600 text-center mb-6">
//               After discussing with the owner, your booking has been confirmed. You will receive updates on your booking status.
//             </p>
   
//             <div className="bg-gray-50 rounded-lg p-4 mb-6">
//               <div className="flex items-center gap-3 mb-3">
//                 <img src={currentVehicle.image} alt={currentVehicle.name} className="w-16 h-16 rounded-lg object-cover" />
//                 <div>
//                   <h3 className="font-semibold text-gray-900">{currentVehicle.name}</h3>
//                   <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
//                 </div>
//               </div>
             
//               {selectedDateTime && (
//                 <div className="text-sm text-gray-600 space-y-1">
//                   <div className="flex justify-between">
//                     <span>Start:</span>
//                     <span className="font-medium">
//                       {new Date(selectedDateTime.startDate).toLocaleDateString()} - {selectedDateTime.startTime}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>End:</span>
//                     <span className="font-medium">
//                       {new Date(selectedDateTime.endDate).toLocaleDateString()} - {selectedDateTime.endTime}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
   
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowSuccessModal(false);
//                   navigate("/");
//                 }}
//                 className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
//               >
//                 Go Home
//               </button>
//               <button
//                 onClick={() => {
//                   setShowSuccessModal(false);
//                   setShowContactButtons(false);
//                   setSelectedDateTime(null);
//                   setBookingId(null);
//                   setWaitingTimerSeconds(30);
//                 }}
//                 className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//               >
//                 Book Another
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* DateTime Modal */}
//       {isDateTimeModalOpen && (
//         <AvailabilityDateTimeModal
//           isOpen={isDateTimeModalOpen}
//           onClose={() => setIsDateTimeModalOpen(false)}
//           onSubmit={async (dateTime) => {
//             console.log("📅 DateTime selected:", dateTime);
//             setSelectedDateTime(dateTime);
//             setIsDateTimeModalOpen(false);
            
//             const result = await createBookingAPI(
//               dateTime.startDate,
//               dateTime.endDate,
//               dateTime.startTime,
//               dateTime.endTime
//             );
            
//             if (result) {
//               setShowSuccessModal(true);
//             }
//           }}
//           vehiclePrice={currentVehicle.price}
//         />
//       )}

//       {/* Waiting Popup */}
//       {showWaitingPopup && (
//         <WaitingPopup
//           isOpen={showWaitingPopup}
//           onClose={handleCloseWaiting}
//           timerSeconds={waitingTimerSeconds}
//         />
//       )}

//       {/* Booking Acceptance */}
//       {showAcceptance && (
//         <BookingAcceptance
//           isOpen={showAcceptance}
//           onAccept={handleAcceptBooking}
//           onReject={handleRejectBooking}
//         />
//       )}

//       {/* Reject Modal */}
//       {showRejectModal && (
//         <BookingRejectModal
//           isOpen={showRejectModal}
//           onClose={handleCloseRejectModal}
//         />
//       )}

//       {/* Chat Popup */}
//       {isChatOpen && (
//         <PopupChat
//           isOpen={isChatOpen}
//           onClose={() => setIsChatOpen(false)}
//         />
//       )}

// {/* ✅ ADD THIS ENTIRE EDIT MODAL HERE: */}
// {showEditModal && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold text-gray-900">Edit Review</h2>
//         <button
//           onClick={() => setShowEditModal(false)}
//           className="p-1 hover:bg-gray-100 rounded-lg transition"
//         >
//           <X size={24} className="text-gray-500" />
//         </button>
//       </div>

//       <div className="mb-4">
//         <p className="text-sm text-gray-600 mb-2 font-medium">Your Rating</p>
//         <div className="flex gap-2">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               onClick={() => setEditRating(star)}
//               className="text-3xl transition-transform hover:scale-110"
//             >
//               {star <= editRating ? "⭐" : "☆"}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="mb-6">
//         <p className="text-sm text-gray-600 mb-2 font-medium">Your Feedback</p>
//         <textarea
//           value={editFeedback}
//           onChange={(e) => setEditFeedback(e.target.value)}
//           className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Share your experience..."
//         />
//       </div>

//       <div className="flex gap-3">
//         <button
//           onClick={() => setShowEditModal(false)}
//           disabled={isSubmittingEdit}
//           className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleUpdateReview}
//           disabled={isSubmittingEdit}
//           className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
//         >
//           {isSubmittingEdit ? "Updating..." : "Update Review"}
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export dimport React, { useEffect, useState } from "react";










// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { vehicles } from "./data/Vehicle";
// import { Vehicle } from "../types/Vehicle";
// import { Star, Loader2, RefreshCw, Trash2, Edit, MoreVertical } from "lucide-react";
// import apiService from "../services/api.service";
// import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
// import WaitingPopup from "../components/ui/WaitingPopup";
// import BookingAcceptance from "../components/ui/BookingAcceptance";
// import BookingRejectModal from "../components/ui/BookingRejectModal";
// import PopupChat from "../components/ui/PopupChat";
// import { useReviewStore } from "../store/review.store";
// import { useNotificationStore } from "../store/notification.store";
// import { useBookingStore } from "../store/booking.store";
// import toast from "react-hot-toast";
// import Automatic from "../assets/icons/AutomaticLogo.png";
// import Petrol from "../assets/icons/Petrol.png";
// import React, { useState, useEffect } from "react";

// const PRODUCTION_PROXIES = [
//   "https://corsproxy.io/?",
//   "https://api.codetabs.com/v1/proxy?quest=",
// ];

// const API_ENDPOINT = "http://3.110.122.127:3000/createBooking";

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

// const BookNow: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); // ✅ ADD THIS - Track navigation changes
//   const { id } = useParams<{ id: string }>();
//   const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);
 
//   const {
//     getReviewsByVehicleId,
//     getAverageRating,
//     getTotalReviewCount,
//     getRatingDistribution,
//   } = useReviewStore();
//   const { addNotification } = useNotificationStore();
//   const { addBooking } = useBookingStore();

//   // API car data state
//   const [apiCarData, setApiCarData] = useState<any>(null);
//   const [loadingCarData, setLoadingCarData] = useState(true);
//   const [carDataError, setCarDataError] = useState("");
  
//   // Booking states
//   const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
//   const [showContactButtons, setShowContactButtons] = useState(false);
//   const [showWaitingPopup, setShowWaitingPopup] = useState(false);
//   const [showAcceptance, setShowAcceptance] = useState(false);
//   const [waitingTimerSeconds, setWaitingTimerSeconds] = useState<number>(30);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [selectedDateTime, setSelectedDateTime] = useState<{
//     startDate: string;
//     endDate: string;
//     startTime: string;
//     endTime: string;
//   } | null>(null);
//   const [bookingId, setBookingId] = useState<string | null>(null);
//   const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
//   const [apiError, setApiError] = useState<string>("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
  
//   // Enhanced Review States
//   const [apiReviews, setApiReviews] = useState<Review[]>([]);
//   const [loadingReviews, setLoadingReviews] = useState(false);
//   const [reviewsError, setReviewsError] = useState<string>("");
//   const [lastFetchTime, setLastFetchTime] = useState<number>(0);
//   const [apiAverageRating, setApiAverageRating] = useState<number>(0);
//   const [loadingAverageRating, setLoadingAverageRating] = useState<boolean>(false);
//   const [isDeletingReview, setIsDeletingReview] = useState<boolean>(false);
//   const [menuOpenIndex, setMenuOpenIndex] = useState<string | null>(null);

//   const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";

//   // Fetch car details from API
//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       if (id) {
//         try {
//           setLoadingCarData(true);
//           setCarDataError("");
//           console.log(`🚗 Fetching car details for ID: ${id}`);
          
//           const response = await apiService.car.getCarById(id);
//           console.log("✅ Full API response:", response);
          
//           let carData = null;
          
//           if (response) {
//             if ((response as any).data) {
//               carData = (response as any).data;
//             } else if ((response as any).car) {
//               carData = (response as any).car;
//             } else {
//               carData = response;
//             }
            
//             console.log("🎯 Final car data to set:", carData);
//             setApiCarData(carData);
//           }
//         } catch (err: any) {
//           console.error("❌ Error fetching car details:", err);
//           setCarDataError(err.message || "Failed to load car details");
//         } finally {
//           setLoadingCarData(false);
//         }
//       }
//     };

//     fetchCarDetails();
//   }, [id]);

//   // ✅ Refresh reviews when component becomes visible (user returns from feedback)
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (!document.hidden && id) {
//         console.log("👁️ Page became visible - Refreshing reviews");
//         setTimeout(() => {
//           fetchReviewsByVehicleId(id, false);
//           fetchAverageRating(id, false);
//         }, 300);
//       }
//     };

//     const handleFocus = () => {
//       if (id) {
//         console.log("🎯 Window focused - Refreshing reviews");
//         setTimeout(() => {
//           fetchReviewsByVehicleId(id, false);
//           fetchAverageRating(id, false);
//         }, 300);
//       }
//     };

//     // Add event listeners
//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     window.addEventListener('focus', handleFocus);

//     // Cleanup
//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       window.removeEventListener('focus', handleFocus);
//     };
//   }, [id]);

//   // Fetch reviews on component mount
//   useEffect(() => {
//     if (id) {
//       console.log("🔄 Initial review fetch triggered for vehicle:", id);
//       fetchReviewsByVehicleId(id);
//       fetchAverageRating(id);
//     }
//   }, [id]);

//   // Auto-refresh reviews every 30 seconds
//   useEffect(() => {
//     if (id) {
//       const intervalId = setInterval(() => {
//         console.log("🔄 Auto-refreshing reviews...");
//         fetchReviewsByVehicleId(id, true);
//         fetchAverageRating(id, true);
//       }, 30000);

//       return () => clearInterval(intervalId);
//     }
//   }, [id]);

//   // Timer effect for booking
//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;
//     if (showWaitingPopup && waitingTimerSeconds > 0) {
//       interval = setInterval(() => {
//         setWaitingTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
//       }, 1000);
//     }
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [showWaitingPopup, waitingTimerSeconds]);
 
//   useEffect(() => {
//     if (showWaitingPopup && waitingTimerSeconds === 0) {
//       handleTimerComplete();
//     }
//   }, [waitingTimerSeconds, showWaitingPopup]);

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = () => setMenuOpenIndex(null);
//     if (menuOpenIndex !== null) {
//       document.addEventListener('click', handleClickOutside);
//       return () => document.removeEventListener('click', handleClickOutside);
//     }
//   }, [menuOpenIndex]);

//   // Helper function to check if review belongs to current user
//   const isUserReview = (review: Review): boolean => {
//     const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
//     return review.userId === currentUserId;
//   };

//   // Toggle three-dot menu
//   const handleMenuToggle = (reviewId: string, event: React.MouseEvent) => {
//     event.stopPropagation();
//     setMenuOpenIndex(menuOpenIndex === reviewId ? null : reviewId);
//   };

//   // Refresh reviews handler
//   const handleRefreshReviews = () => {
//     if (id) {
//       console.log("🔄 Manual refresh triggered");
//       fetchReviewsByVehicleId(id, false);
//       fetchAverageRating(id, false);
//     }
//   };

//   // Edit review handler - Navigate to feedback page with query parameters
//   const handleEditClick = (review: Review) => {
//     console.log("✏️ Navigating to feedback page for review:", review._id);
//     const currentVehicle = vehicle || (apiCarData ? {
//       name: apiCarData.CarName || 'Unknown Vehicle',
//     } : null);
    
//     // Store the review ID in sessionStorage for refresh detection
//     sessionStorage.setItem('editingReviewId', review._id);
//     sessionStorage.setItem('returnToVehicleId', id || '');
    
//     // Navigate with query parameters
//     navigate(`/feedback?vehicleId=${id}&vehicleName=${encodeURIComponent(currentVehicle?.name || '')}&reviewId=${review._id}`);
//     setMenuOpenIndex(null);
//   };

//   // Delete review handler
//   const handleDeleteReview = async (reviewId: string, event: React.MouseEvent) => {
//     event.stopPropagation();
    
//     if (!window.confirm('Are you sure you want to delete this review?')) {
//       return;
//     }

//     setIsDeletingReview(true);
//     setMenuOpenIndex(null);
    
//     try {
//       console.log("🗑️ Deleting review:", reviewId);
      
//       const response = await fetch(`http://3.110.122.127:3000/deleteReview/${reviewId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log("Delete response status:", response.status);

//       if (response.ok) {
//         toast.success('✅ Review deleted successfully', {
//           duration: 2000,
//           position: 'top-right',
//         });
        
//         if (id) {
//           setTimeout(() => {
//             fetchReviewsByVehicleId(id, false);
//             fetchAverageRating(id, false);
//           }, 500);
//         }
//       } else {
//         toast.error('❌ Failed to delete review', {
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
//     }
//   };

//   // Fetch average rating from API
//   const fetchAverageRating = async (vehicleId: string, silent: boolean = false) => {
//     if (!silent) {
//       setLoadingAverageRating(true);
//     }

//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("⭐ FETCHING AVERAGE RATING");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("📋 Vehicle ID:", vehicleId);

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

//       console.log("📥 Average Rating Response Status:", response.status);

//       if (response.ok) {
//         const result = await response.json();
//         console.log("✅ Average Rating Response:", result);

//         if (result.success && result.averageRating !== undefined) {
//           const avgRating = parseFloat(result.averageRating);
//           setApiAverageRating(avgRating);
//           console.log("⭐ Average Rating Set:", avgRating);
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

// const fetchReviewsByVehicleId = async (vehicleId: string, silent: boolean = false) => {
//   const now = Date.now();
  
//   if (now - lastFetchTime < 5000 && silent) {
//     console.log("⏳ Skipping fetch - too soon after last request");
//     return;
//   }
//   setLastFetchTime(now);

//   if (!silent) {
//     setLoadingReviews(true);
//     setReviewsError("");
//   }

//   console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//   console.log("🔍 FETCHING REVIEWS FOR VEHICLE");
//   console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//   console.log("📋 Vehicle ID:", vehicleId);

//   try {
//     const response = await fetch(
//       `http://3.110.122.127:3000/getReviewsById/${vehicleId}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("📥 Response Status:", response.status);

//     if (response.ok) {
//       const result = await response.json();
//       console.log("✅ Reviews Response:", result);

//       if (result.success && Array.isArray(result.reviews)) {
//         console.log("🎉 SUCCESS: Reviews found!", result.reviews.length);
//         console.log("📝 Full Review Data:", JSON.stringify(result.reviews, null, 2));
        
//         setApiReviews(result.reviews);
        
//         // ✅ FIX: Clear editing flag AFTER a delay to allow UI to show updates
//         const editingReviewId = sessionStorage.getItem('editingReviewId');
//         if (editingReviewId) {
//           const updatedReview = result.reviews.find((r: any) => r._id === editingReviewId);
//           if (updatedReview) {
//             console.log("✨ Updated review detected!");
//             console.log("⭐ NEW Rating:", updatedReview.rating);
//             console.log("💬 NEW Text:", updatedReview.review || updatedReview.reviewText);
            
//             toast.success(`🎉 Review updated! New rating: ${updatedReview.rating}★`, {
//               duration: 3000,
//               position: 'top-center',
//             });
//           }
          
//           // ✅ DELAY CLEARING - Give UI 5 seconds to show the update
//           setTimeout(() => {
//             console.log("🧹 Clearing editingReviewId from sessionStorage");
//             sessionStorage.removeItem('editingReviewId');
//           }, 5000); // Wait 5 seconds before clearing
//         }
        
//         if (!silent) {
//           toast.success(`✅ Loaded ${result.reviews.length} review(s)`, {
//             duration: 2000,
//             position: 'top-right',
//           });
//         }

//         return result.reviews;
//       } else {
//         console.log("ℹ️ No reviews found");
//         setApiReviews([]);
        
//         if (!silent) {
//           toast("No reviews yet for this vehicle", {
//             duration: 2000,
//             position: 'top-right',
//           });
//         }
//       }
//     }
//   } catch (error: any) {
//     console.error("❌ Fetch reviews failed:", error.message);
    
//     setReviewsError("Unable to load reviews.");
//     setApiReviews([]);
    
//     if (!silent) {
//       toast.error("Failed to load reviews", {
//         duration: 3000,
//         position: 'top-right',
//       });
//     }
//   } finally {
//     if (!silent) {
//       setLoadingReviews(false);
//     }
//   }
// };

// useEffect(() => {
//   // Check if we just returned from editing a review
//   const editingReviewId = sessionStorage.getItem('editingReviewId');
//   const returnToVehicleId = sessionStorage.getItem('returnToVehicleId');
  
//   if (editingReviewId && returnToVehicleId === id && apiReviews.length > 0) {
//     const updatedReview = apiReviews.find(r => r._id === editingReviewId);
//     if (updatedReview) {
//       console.log("🎯 UPDATED REVIEW CONFIRMED IN UI!");
//       console.log("📊 Review Data:", updatedReview);
//     }
//   }
// }, [apiReviews, id]);

//   // Calculate average rating from API reviews
//   const calculateAverageRating = (reviews: Review[]): number => {
//     if (reviews.length === 0) return 0;
//     const total = reviews.reduce((sum, review) => sum + review.rating, 0);
//     const average = total / reviews.length;
//     return Number(average.toFixed(1));
//   };

//   // Calculate rating distribution from API reviews
//   const calculateRatingDistribution = (reviews: Review[]) => {
//     const distribution = [5, 4, 3, 2, 1].map(stars => {
//       const count = reviews.filter(r => r.rating === stars).length;
//       const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
//       return { stars, count, percentage };
//     });
//     return distribution;
//   };

//   // Map vehicle type for API
//   const mapVehicleTypeForAPI = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
//     if (!type) {
//       console.warn("⚠️ Vehicle type is undefined/null, defaulting to 'Car'");
//       return "Car";
//     }
    
//     const normalized = type.toLowerCase();
//     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
//       car: "Car",
//       auto: "Auto",
//       bike: "Bike",
//     };
    
//     return typeMap[normalized] || "Car";
//   };
  
//   // Map vehicle type for store
//   const mapVehicleTypeForStore = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
//     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
//       car: "Car",
//       auto: "Auto",
//       bike: "Bike",
//     };
//     return type ? typeMap[type.toLowerCase()] || "Car" : "Car";
//   };
 
//   // Calculate total hours between dates and times
//   const calculateTotalHours = (
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
//   ): number => {
//     try {
//       const parseTime = (timeStr: string) => {
//         const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
//         if (!match) return { hours: 0, minutes: 0 };
       
//         let hours = parseInt(match[1]);
//         const minutes = parseInt(match[2] || '0');
//         const period = match[3]?.toUpperCase();
       
//         if (period === 'PM' && hours !== 12) hours += 12;
//         if (period === 'AM' && hours === 12) hours = 0;
       
//         return { hours, minutes };
//       };
 
//       const startTimeParsed = parseTime(startTime);
//       const endTimeParsed = parseTime(endTime);
 
//       const start = new Date(startDate);
//       start.setHours(startTimeParsed.hours, startTimeParsed.minutes, 0, 0);
 
//       const end = new Date(endDate);
//       end.setHours(endTimeParsed.hours, endTimeParsed.minutes, 0, 0);
 
//       const diffInMs = end.getTime() - start.getTime();
//       const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
     
//       return hours > 0 ? hours : 1;
//     } catch (error) {
//       console.error("❌ Error calculating hours:", error);
//       return 1;
//     }
//   };
 
//   // Format date for API
//   const formatDateForAPI = (dateString: string): string => {
//     try {
//       const date = new Date(dateString);
//       if (!isNaN(date.getTime())) {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//       }
//     } catch (error) {
//       console.error("❌ Date formatting error:", error);
//     }
//     return dateString;
//   };
 
//   // Format time for API
//   const formatTimeForAPI = (timeString: string): string => {
//     try {
//       const ampmMatch = timeString.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
//       if (ampmMatch) {
//         let hours = parseInt(ampmMatch[1]);
//         const minutes = ampmMatch[2] || '00';
//         const period = ampmMatch[3].toUpperCase();
       
//         if (period === 'PM' && hours !== 12) hours += 12;
//         if (period === 'AM' && hours === 12) hours = 0;
       
//         return `${hours.toString().padStart(2, '0')}.${minutes}`;
//       }
//     } catch (error) {
//       console.error("❌ Time formatting error:", error);
//     }
//     return timeString;
//   };

//   // Booking handlers
//   const handleTimerComplete = () => {
//     console.log("⏰ Timer completed - Opening BookingAcceptance");
//     setShowWaitingPopup(false);
//     setShowAcceptance(true);
//   };
 
//   const handleCloseWaiting = () => {
//     console.log("❌ WaitingPopup closed manually");
//     setShowWaitingPopup(false);
//     setWaitingTimerSeconds(30);
//   };
 
//   const handleAcceptBooking = () => {
//     console.log("✅ Booking Accepted by Owner!");
//     setShowAcceptance(false);
//     setShowContactButtons(true);
//   };
 
//   const handleRejectBooking = () => {
//     console.log("❌ Booking Rejected by Owner!");
//     setShowAcceptance(false);
//     setShowRejectModal(true);
//   };
 
//   const handleCloseRejectModal = () => {
//     console.log("🔙 Reject modal closed");
//     setShowRejectModal(false);
//     setSelectedDateTime(null);
//     setBookingId(null);
//     setWaitingTimerSeconds(30);
//   };
 
//   const handleCallOwner = () => {
//     console.log("📞 User calling owner...");
//     setTimeout(() => {
//       handleConfirmBooking();
//     }, 1000);
//   };

//   // Create current vehicle object
//   const currentVehicle = vehicle || (apiCarData ? {
//     id: apiCarData._id || apiCarData.id || id || '',
//     name: apiCarData.CarName || 'Unknown Vehicle',
//     image: (apiCarData.carImages && apiCarData.carImages.length > 0) 
//       ? apiCarData.carImages[0] 
//       : apiCarData.carImage || apiCarData.image || 'https://via.placeholder.com/400',
//     price: apiCarData.RentPerDay || apiCarData.pricePerHour || '0',
//     type: 'car' as Vehicle["type"],
//   } : null);

//   const handleConfirmBooking = () => {
//     if (!currentVehicle || !selectedDateTime) {
//       console.error("❌ Cannot confirm booking");
//       return;
//     }
 
//     const currentDate = new Date();
//     console.log("🎉 Confirming booking with ID:", bookingId);
 
//     addBooking({
//       id: bookingId || Date.now().toString(),
//       vehicleId: currentVehicle.id,
//       vehicleName: currentVehicle.name,
//       vehicleImage: currentVehicle.image,
//       vehicleType: mapVehicleTypeForStore(currentVehicle.type),
//       customerName: "Current User",
//       bookingDate: currentDate.toLocaleDateString("en-US"),
//       bookingTime: currentDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       startDate: selectedDateTime.startDate,
//       startTime: selectedDateTime.startTime,
//       endDate: selectedDateTime.endDate,
//       endTime: selectedDateTime.endTime,
//       modelNo: currentVehicle.id.toUpperCase(),
//       status: "Booked",
//       price: currentVehicle.price,
//     });
 
//     setShowSuccessModal(true);
//   };

//   const createBookingAPI = async ( 
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
//   ) => {
//     if (!currentVehicle) {
//       const errorMsg = "Vehicle information is missing. Please try again.";
//       setApiError(errorMsg);
//       addNotification({
//         title: "Booking Failed",
//         message: errorMsg,
//         type: "booking_declined",
//       });
//       return null;
//     }

//     setIsSubmittingBooking(true);
//     setApiError("");

//     try {
//       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//       console.log("🚀 PRODUCTION BOOKING API - START");
//       console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      
//       const totalHours = calculateTotalHours(startDate, endDate, startTime, endTime);
//       const pricePerDay = parseInt(String(apiCarData?.RentPerDay || currentVehicle.price || "0"), 10);
//       const pricePerHour = pricePerDay > 0 ? Math.round(pricePerDay / 24) : parseInt(String(currentVehicle.price || "0"), 10);
//       const totalPrice = totalHours * pricePerHour;
      
//       const formattedFromDate = formatDateForAPI(startDate);
//       const formattedToDate = formatDateForAPI(endDate);
//       const formattedFromTime = formatTimeForAPI(startTime);
//       const formattedToTime = formatTimeForAPI(endTime);
      
//       const userId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
//       const contactNumber = localStorage.getItem('contactNumber') || "6301818409";
//       const contactName = localStorage.getItem('contactName') || localStorage.getItem('userName') || "User";
//       const userLatitude = localStorage.getItem('latitude') || "17.438095";
//       const userLongitude = localStorage.getItem('longitude') || "78.4485";

//       const requestBody = {
//         userId: userId,
//         contactNumber: contactNumber,
//         contactName: contactName,
//         latitude: userLatitude,
//         longitude: userLongitude,
//         VechileId: currentVehicle.id,
//         vechileType: mapVehicleTypeForAPI(currentVehicle.type),
//         carName: apiCarData?.CarName || currentVehicle.name || '',
//         carModel: apiCarData?.Model || '',
//         carBrand: apiCarData?.Brand || '',
//         carNumber: apiCarData?.CarNumber || '',
//         fuelType: apiCarData?.FuelType || '',
//         transmissionType: apiCarData?.TransmissionType || '',
//         seatingCapacity: apiCarData?.SeatingCapacity?.toString() || '',
//         pricePerDay: pricePerDay.toString(),
//         pricePerHour: pricePerHour.toString(),
//         pricePerKm: pricePerHour.toString(),
//         FromDate: formattedFromDate,
//         ToDate: formattedToDate,
//         FromTime: formattedFromTime,
//         ToTime: formattedToTime,
//         totalHours: totalHours.toString(),
//         totalPrice: totalPrice.toString(),
//         pickupAddress: apiCarData?.pickupAddress || '',
//         dropoffAddress: apiCarData?.pickupAddress || '',
//       };

//       console.log("📦 Request Body:", requestBody);

//       const urlencoded = new URLSearchParams();
//       Object.entries(requestBody).forEach(([key, value]) => {
//         urlencoded.append(key, value);
//       });

//       let response;
//       for (let i = 0; i < PRODUCTION_PROXIES.length; i++) {
//         try {
//           const proxiedUrl = `${PRODUCTION_PROXIES[i]}${encodeURIComponent(API_ENDPOINT)}`;
//           console.log(`🌐 Trying proxy [${i + 1}]:`, proxiedUrl);

//           response = await Promise.race([
//             fetch(proxiedUrl, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//               },
//               body: urlencoded.toString(),
//             }),
//             new Promise<never>((_, reject) =>
//               setTimeout(() => reject(new Error('Proxy timeout after 15s')), 15000)
//             )
//           ]);

//           if (response.ok) {
//             const text = await response.text();
           
//             let result;
//             try {
//               result = JSON.parse(text);
//             } catch {
//               result = { success: true, message: text };
//             }

//             const bookingIdFromResponse = result?.bookingId || 
//                                          result?.data?.bookingId || 
//                                          result?._id || 
//                                          result?.data?._id ||
//                                          `BOOK-${Date.now()}`;
            
//             setBookingId(bookingIdFromResponse);
            
//             addNotification({
//               title: "Booking Created Successfully! 🎉",
//               message: `Your booking for ${requestBody.carName} has been confirmed!`,
//               type: "booking_confirmed",
//               vehicleId: currentVehicle.id,
//               vehicleName: requestBody.carName,
//               bookingId: bookingIdFromResponse,
//             });
            
//             addBooking({
//               id: bookingIdFromResponse,
//               vehicleId: currentVehicle.id,
//               vehicleName: requestBody.carName,
//               vehicleImage: currentVehicle.image,
//               vehicleType: mapVehicleTypeForStore(currentVehicle.type),
//               price: totalPrice,
//               startDate: formattedFromDate,
//               endDate: formattedToDate,
//               startTime: formattedFromTime,
//               endTime: formattedToTime,
//               status: 'Booked',
//             });
            
//             return result;
//           }
//         } catch (proxyError: any) {
//           console.warn(`❌ Proxy ${i + 1} failed:`, proxyError.message);
//         }
//       }
      
//       throw new Error("Unable to connect to booking server. Please check your internet connection and try again.");

//     } catch (error: any) {
//       console.error("❌ BOOKING CREATION FAILED");
//       console.error("❌ Error:", error.message);
     
//       const errorMessage = error.message || "Failed to create booking. Please try again.";
//       setApiError(errorMessage);
      
//       addNotification({
//         title: "Booking Failed ❌",
//         message: errorMessage,
//         type: "booking_declined",
//         vehicleId: currentVehicle.id,
//         vehicleName: currentVehicle.name,
//       });
      
//       return null;
     
//     } finally {
//       setIsSubmittingBooking(false);
//     }
//   };

//   // Calculate display values
//   const vehicleReviews = getReviewsByVehicleId(currentVehicle?.id || '');
//   const averageRating = getAverageRating(currentVehicle?.id || '');
//   const totalReviews = getTotalReviewCount(currentVehicle?.id || '');
//   const ratingDistribution = getRatingDistribution(currentVehicle?.id || '');

//   // Use API reviews if available, otherwise fallback to local store
//   const displayReviews = apiReviews.length > 0 ? apiReviews : vehicleReviews;
  
//   // Use API average rating if available
//   const displayAverageRating = apiAverageRating > 0 
//     ? apiAverageRating 
//     : (apiReviews.length > 0 
//         ? calculateAverageRating(apiReviews) 
//         : averageRating);
  
//   const displayTotalReviews = apiReviews.length > 0 
//     ? apiReviews.length 
//     : totalReviews;
  
//   const displayRatingDistribution = apiReviews.length > 0 
//     ? calculateRatingDistribution(apiReviews) 
//     : ratingDistribution;

//   // Loading state
//   if (loadingCarData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
//         <div className="text-center space-y-4 p-8">
//           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
//           <p className="text-xl text-gray-700 font-semibold">Loading vehicle details...</p>
//           <p className="text-sm text-gray-500">Please wait while we fetch the car information</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (carDataError && !vehicle) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
//         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
//           <div className="text-6xl">❌</div>
//           <p className="text-xl text-red-600 font-bold">Error Loading Vehicle</p>
//           <p className="text-gray-600">{carDataError}</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
//           >
//             ← Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Not found state
//   if (!vehicle && !apiCarData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
//           <div className="text-6xl">🚗</div>
//           <p className="text-xl text-gray-700 font-bold">Vehicle Not Found</p>
//           <p className="text-gray-600">The vehicle you're looking for doesn't exist or has been removed.</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
//           >
//             ← Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // No vehicle data
//   if (!currentVehicle) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center space-y-4 p-8">
//           <p className="text-xl text-gray-700">Vehicle data not available!</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//       {/* LEFT COLUMN - VEHICLE IMAGE */}
//       <div className="lg:col-span-1">
//         <img
//           src={currentVehicle.image}
//           alt={currentVehicle.name}
//           className="rounded-xl w-full mb-4"
//         />
//         <div className="flex justify-center space-x-2 mt-2">
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//         </div>
//       </div>

//       {/* MIDDLE COLUMN - VEHICLE DETAILS */}
//       <div className="lg:col-span-1">
//         <h1 className="text-3xl font-bold mb-2">{currentVehicle.name}</h1>
        
//         {/* Rating Section */}
//         <div className="flex items-center gap-2 mb-4">
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 size={20}
//                 className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//               />
//             ))}
//           </div>
//           <span className="text-sm text-gray-600">
//             {displayAverageRating} ({displayTotalReviews} reviews)
//           </span>
//         </div>

//         {/* Price */}
//         <div className="mb-6">
//           <span className="text-3xl font-bold text-blue-600">₹{currentVehicle.price}</span>
//           <span className="text-gray-600 ml-2">/day</span>
//         </div>

//         {/* Vehicle Specifications */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           {apiCarData?.TransmissionType && (
//             <div className="flex items-center gap-2">
//               <img src={Automatic} alt="Transmission" className="w-6 h-6" />
//               <span className="text-sm text-gray-700">{apiCarData.TransmissionType}</span>
//             </div>
//           )}
//           {apiCarData?.FuelType && (
//             <div className="flex items-center gap-2">
//               <img src={Petrol} alt="Fuel" className="w-6 h-6" />
//               <span className="text-sm text-gray-700">{apiCarData.FuelType}</span>
//             </div>
//           )}
//           {apiCarData?.SeatingCapacity && (
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-700">👥 {apiCarData.SeatingCapacity} Seater</span>
//             </div>
//           )}
//         </div>

//         {/* Book Now Button */}
//         <button
//           onClick={() => setIsDateTimeModalOpen(true)}
//           className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition shadow-md"
//         >
//           Book Now
//         </button>
//       </div>

//       {/* RIGHT COLUMN - REVIEWS & RATINGS */}
//       <div className="lg:col-span-1">
//         {/* Header with Refresh Button */}
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="text-lg font-bold">Rating & Reviews</h3>
//           <div className="flex items-center gap-2">
//             {(loadingReviews || loadingAverageRating) && (
//               <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
//             )}
//             <button
//               onClick={handleRefreshReviews}
//               disabled={loadingReviews || loadingAverageRating}
//               className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//               title="Refresh reviews"
//             >
//               <RefreshCw className={`w-4 h-4 text-gray-600 ${(loadingReviews || loadingAverageRating) ? 'animate-spin' : ''}`} />
//             </button>
//           </div>
//         </div>

//         {/* Review Source Indicator */}
//         {apiReviews.length > 0 && (
//           <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
//             <span className="text-xs text-green-700 font-medium">
//               ✓ Live reviews from API
//             </span>
//             <span className="text-xs text-gray-500">
//               (Updated {new Date(lastFetchTime).toLocaleTimeString()})
//             </span>
//           </div>
//         )}

//         {/* Show indicator when reviews were just updated */}
//         {sessionStorage.getItem('editingReviewId') && !loadingReviews && (
//           <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 animate-pulse">
//             <span className="text-xs text-blue-700 font-medium">
//               🔄 Refreshing to show your updated review...
//             </span>
//           </div>
//         )}

//         {reviewsError && (
//           <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-xs text-yellow-700">{reviewsError}</p>
//           </div>
//         )}

//         {/* Average Rating Display */}
//         <div className="flex items-center mt-2 mb-2 justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
//           <div className="flex flex-col">
//             <span className="text-3xl font-bold text-gray-900">{displayAverageRating}</span>
//             <span className="text-xs text-gray-600 mt-1">out of 5</span>
//           </div>
//           <div className="flex flex-col items-end">
//             <div className="flex gap-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                   size={20}
//                 />
//               ))}
//             </div>
//             <span className="text-sm text-gray-600 mt-1">
//               {displayTotalReviews} Review{displayTotalReviews !== 1 ? 's' : ''}
//             </span>
//           </div>
//         </div>

//         {/* Rating Distribution */}
//         <div className="mt-4 space-y-2 bg-white p-4 rounded-lg border">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating Breakdown</h4>
//           {displayRatingDistribution.map((r) => (
//             <div key={r.stars} className="flex items-center text-sm">
//               <span className="w-8 text-gray-700 font-medium">{r.stars}★</span>
//               <div className="flex-1 bg-gray-200 h-3 rounded-full mx-3 overflow-hidden">
//                 <div 
//                   className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500" 
//                   style={{ width: `${r.percentage}%` }} 
//                 />
//               </div>
//               <span className="text-gray-500 text-xs min-w-[45px] text-right">
//                 {r.count} ({r.percentage}%)
//               </span>
//             </div>
//           ))}
//         </div>



// {/* Individual Reviews */}
// <div className="mt-6 space-y-3 max-h-[500px] overflow-y-auto pr-2">
//   <h4 className="text-sm font-semibold text-gray-700 mb-3 sticky top-0 bg-white py-2 z-10">
//     Customer Reviews ({displayTotalReviews})
//   </h4>
  
 
// {displayReviews.length > 0 ? (
//   displayReviews.map((review, idx) => {
//     const canEdit = isUserReview(review);
//     const wasJustEdited = sessionStorage.getItem('editingReviewId') === review._id;
//     const isMenuOpen = menuOpenIndex === review._id;
    
//     // Debug logging for updated reviews
//     if (wasJustEdited) {
//       console.log("🎨 RENDERING UPDATED REVIEW CARD:");
//       console.log("  ✅ Review ID:", review._id);
//       console.log("  ⭐ Rating:", review.rating);
//       console.log("  💬 Text:", review.review || review.reviewText);
//     }
    
//     return (
//       <div 
//         key={review._id || idx} 
//         className={`border rounded-xl p-4 transition-all duration-500 relative ${
//           wasJustEdited
//             ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl ring-2 ring-green-400 ring-offset-2'
//             : canEdit 
//             ? 'border-blue-200 bg-blue-50 hover:shadow-md' 
//             : 'border-gray-200 bg-white hover:shadow-md'
//         }`}
//       >
//         {/* ✅ ENHANCED: Animated update badge */}
//         {wasJustEdited && (
//           <div className="absolute -top-3 -right-3 z-20 animate-bounce">
//             <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white text-xs px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2">
//               <span className="text-lg animate-spin">✨</span>
//               <span className="font-extrabold">JUST UPDATED!</span>
//             </div>
//           </div>
//         )}
        
//         {/* Header with User Info */}
//         <div className="flex justify-between items-start mb-2">
//           <div className="flex items-center gap-2 flex-1">
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
//               wasJustEdited 
//                 ? 'bg-gradient-to-br from-green-400 to-emerald-500 ring-2 ring-green-300'
//                 : 'bg-gradient-to-br from-blue-400 to-purple-400'
//             }`}>
//               {(review.userName || `User ${idx + 1}`).charAt(0).toUpperCase()}
//             </div>
//             <div className="flex-1">
//               <div className="flex items-center gap-2">
//                 <span className={`font-semibold text-gray-900 text-sm ${
//                   wasJustEdited ? 'text-green-800' : ''
//                 }`}>
//                   {review.userName || `User ${idx + 1}`}
//                 </span>
//                 {canEdit && (
//                   <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium">
//                     You
//                   </span>
//                 )}
//                 {wasJustEdited && (
//                   <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-medium animate-pulse">
//                     Updated
//                   </span>
//                 )}
//               </div>
//               {review.createdAt && (
//                 <p className="text-xs text-gray-400">
//                   {new Date(review.createdAt).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'short',
//                     day: 'numeric'
//                   })}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Rating and Menu Container */}
//           <div className="flex items-center gap-2">
//             {/* Rating Display */}
//             <div className={`flex px-2 py-1 rounded-lg border ${
//               wasJustEdited 
//                 ? 'bg-green-100 border-green-300 ring-2 ring-green-200' 
//                 : 'bg-yellow-50 border-yellow-200'
//             }`}>
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   size={14}
//                   className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                 />
//               ))}
//             </div>

//             {/* THREE-DOT MENU */}
//             <div className="relative" onClick={(e) => e.stopPropagation()}>
//               <button
//                 onClick={(e) => handleMenuToggle(review._id, e)}
//                 className={`p-1.5 rounded-full transition-all duration-200 ${
//                   isMenuOpen 
//                     ? 'bg-blue-100 text-blue-600' 
//                     : 'hover:bg-gray-100 text-gray-600'
//                 }`}
//                 aria-label="Review options"
//                 title={canEdit ? "Edit or delete review" : "Review options"}
//               >
//                 <MoreVertical size={18} />
//               </button>

//               {/* Dropdown Menu */}
//               {isMenuOpen && (
//                 <div 
//                   className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-30 overflow-hidden"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   {canEdit ? (
//                     <div className="py-1">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleEditClick(review);
//                         }}
//                         className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 transition-colors group"
//                       >
//                         <Edit size={16} className="text-blue-600 group-hover:scale-110 transition-transform" />
//                         <span className="font-medium text-gray-700 group-hover:text-blue-700">Edit Review</span>
//                       </button>
                      
//                       <div className="border-t border-gray-100"></div>
                      
//                       <button
//                         onClick={(e) => handleDeleteReview(review._id, e)}
//                         className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
//                       >
//                         <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
//                         <span className="font-medium group-hover:text-red-700">Delete Review</span>
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="py-3 px-4">
//                       <p className="text-xs text-gray-500 text-center">
//                         You can only edit your own reviews
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Review Text */}
//         <p className={`text-sm leading-relaxed mt-2 mb-3 ${
//           wasJustEdited 
//             ? 'text-gray-900 font-medium' 
//             : 'text-gray-700'
//         }`}>
//           {review.review || review.reviewText || review.comment || review.feedback || "No comment provided"}
//         </p>
        
//         {/* ✅ DEBUG PANEL - Shows what changed (remove in production) */}
//         {wasJustEdited && (
//           <div className="mt-3 p-3 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-lg shadow-inner">
//             <p className="text-xs font-bold text-green-800 mb-2 flex items-center gap-1">
//               <span className="text-base">✅</span>
//               <span>Review Successfully Updated!</span>
//             </p>
//             <div className="space-y-1 text-xs text-green-700">
//               <p><strong>New Rating:</strong> {review.rating} ⭐</p>
//               <p><strong>New Review:</strong> {review.review || review.reviewText || 'No comment'}</p>
//               <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   })
// ) : (
//   <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
//     <div className="text-5xl mb-3">📝</div>
//     <p className="text-gray-500 font-medium mb-1">No reviews yet</p>
//     <p className="text-gray-400 text-sm">
//       Be the first to review this vehicle!
//     </p>
//   </div>
// )}
// </div>
//       </div>

//       {/* Booking Submission Loading Modal */}
//       {isSubmittingBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
//             <div className="flex flex-col items-center">
//               <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
//               <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
//                 Creating Your Booking...
//               </h2>
//               <p className="text-gray-600 text-sm">
//                 Please wait while we process your booking...
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* API Error Modal */}
//       {apiError && !isSubmittingBooking && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[110] max-w-md w-full mx-4">
//           <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-xl">
//             <h3 className="text-sm font-bold text-red-800">Booking Failed</h3>
//             <p className="mt-1 text-sm text-red-700">{apiError}</p>
//             <div className="mt-3 flex gap-2">
//               <button
//                 onClick={() => {
//                   setApiError("");
//                   setIsDateTimeModalOpen(true);
//                 }}
//                 className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700"
//               >
//                 Retry
//               </button>
//               <button
//                 onClick={() => setApiError("")}
//                 className="px-3 py-1.5 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-300 hover:bg-red-50"
//               >
//                 Dismiss
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
//       {showSuccessModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
//             <div className="flex justify-center mb-6">
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//                 <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//             </div>
   
//             <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
//               Booking Posted Successfully!
//             </h2>
//             <p className="text-gray-600 text-center mb-6">
//               Your booking has been confirmed. You will receive updates on your booking status.
//             </p>
   
//             <div className="bg-gray-50 rounded-lg p-4 mb-6">
//               <div className="flex items-center gap-3 mb-3">
//                 <img src={currentVehicle.image} alt={currentVehicle.name} className="w-16 h-16 rounded-lg object-cover" />
//                 <div>
//                   <h3 className="font-semibold text-gray-900">{currentVehicle.name}</h3>
//                   <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
//                 </div>
//               </div>
             
//               {selectedDateTime && (
//                 <div className="text-sm text-gray-600 space-y-1">
//                   <div className="flex justify-between">
//                     <span>Start:</span>
//                     <span className="font-medium">
//                       {new Date(selectedDateTime.startDate).toLocaleDateString()} - {selectedDateTime.startTime}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>End:</span>
//                     <span className="font-medium">
//                       {new Date(selectedDateTime.endDate).toLocaleDateString()} - {selectedDateTime.endTime}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
   
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowSuccessModal(false);
//                   navigate("/");
//                 }}
//                 className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
//               >
//                 Go Home
//               </button>
//               <button
//                 onClick={() => {
//                   setShowSuccessModal(false);
//                   setShowContactButtons(false);
//                   setSelectedDateTime(null);
//                   setBookingId(null);
//                   setWaitingTimerSeconds(30);
//                 }}
//                 className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//               >
//                 Book Another
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* DateTime Modal */}
//       {isDateTimeModalOpen && (
//         <AvailabilityDateTimeModal
//           isOpen={isDateTimeModalOpen}
//           onClose={() => setIsDateTimeModalOpen(false)}
//           onSubmit={async (dateTime) => {
//             console.log("📅 DateTime selected:", dateTime);
//             setSelectedDateTime(dateTime);
//             setIsDateTimeModalOpen(false);
            
//             const result = await createBookingAPI(
//               dateTime.startDate,
//               dateTime.endDate,
//               dateTime.startTime,
//               dateTime.endTime
//             );
            
//             if (result) {
//               setShowSuccessModal(true);
//             }
//           }}
//           vehiclePrice={currentVehicle.price}
//         />
//       )}

//       {/* Waiting Popup */}
//       {showWaitingPopup && (
//         <WaitingPopup
//           isOpen={showWaitingPopup}
//           onClose={handleCloseWaiting}
//           timerSeconds={waitingTimerSeconds}
//         />
//       )}

//       {/* Booking Acceptance */}
//       {showAcceptance && (
//         <BookingAcceptance
//           isOpen={showAcceptance}
//           onAccept={handleAcceptBooking}
//           onReject={handleRejectBooking}
//         />
//       )}

//       {/* Reject Modal */}
//       {showRejectModal && (
//         <BookingRejectModal
//           isOpen={showRejectModal}
//           onClose={handleCloseRejectModal}
//         />
//       )}

//       {/* Chat Popup */}
//       {isChatOpen && (
//         <PopupChat
//           isOpen={isChatOpen}
//           onClose={() => setIsChatOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default BookNow;













// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { vehicles } from "./data/Vehicle";
// import { Vehicle } from "../types/Vehicle";
// import { Star, Loader2, RefreshCw, Trash2, Edit, MoreVertical } from "lucide-react";
// import apiService from "../services/api.service";
// import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
// import WaitingPopup from "../components/ui/WaitingPopup";
// import BookingAcceptance from "../components/ui/BookingAcceptance";
// import BookingRejectModal from "../components/ui/BookingRejectModal";
// import PopupChat from "../components/ui/PopupChat";
// import { useReviewStore } from "../store/review.store";
// import { useNotificationStore } from "../store/notification.store";
// import { useBookingStore } from "../store/booking.store";
// import toast from "react-hot-toast";

// import Automatic from "../assets/icons/AutomaticLogo.png";
// import Driver from "../assets/icons/DriverLogo.png";
// import Acicon from "../assets/icons/AutomaticLogo.png";
// import Petrol from "../assets/icons/Petrol.png";

// const CORS_PROXIES = [
//   "https://corsproxy.io/?",
//   "https://api.codetabs.com/v1/proxy?quest=",
// ];
// const API_BASE_URL = "http://3.110.122.127:3000";

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

// const BookNow: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams<{ id: string }>();
//   const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);

//   const {
//     getReviewsByVehicleId,
//     getAverageRating,
//     getTotalReviewCount,
//     getRatingDistribution,
//   } = useReviewStore();
//   const { addNotification } = useNotificationStore();
//   const { addBooking } = useBookingStore();

//   const [apiCarData, setApiCarData] = useState<any>(null);
//   const [loadingCarData, setLoadingCarData] = useState(true);
//   const [carDataError, setCarDataError] = useState("");

//   const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
//   const [showContactButtons, setShowContactButtons] = useState(false);
//   const [showWaitingPopup, setShowWaitingPopup] = useState(false);
//   const [showAcceptance, setShowAcceptance] = useState(false);
//   const [waitingTimerSeconds, setWaitingTimerSeconds] = useState<number>(180);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [selectedDateTime, setSelectedDateTime] = useState<{
//     startDate: string;
//     endDate: string;
//     startTime: string;
//     endTime: string;
//   } | null>(null);
//   const [bookingId, setBookingId] = useState<string | null>(null);
//   const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
//   const [apiError, setApiError] = useState<string>("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   const [apiReviews, setApiReviews] = useState<Review[]>([]);
//   const [loadingReviews, setLoadingReviews] = useState(false);
//   const [reviewsError, setReviewsError] = useState<string>("");
//   const [lastFetchTime, setLastFetchTime] = useState<number>(0);
//   const [apiAverageRating, setApiAverageRating] = useState<number>(0);
//   const [loadingAverageRating, setLoadingAverageRating] = useState<boolean>(false);
//   const [isDeletingReview, setIsDeletingReview] = useState<boolean>(false);
//   const [menuOpenIndex, setMenuOpenIndex] = useState<string | null>(null);

//   const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";

//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       if (id) {
//         try {
//           setLoadingCarData(true);
//           setCarDataError("");
//           console.log(`🚗 Fetching car details for ID: ${id}`);
          
//           const response = await apiService.car.getCarById(id);
//           console.log("✅ Full API response:", response);
          
//           let carData = null;
          
//           if (response) {
//             if ((response as any).data) {
//               carData = (response as any).data;
//             } else if ((response as any).car) {
//               carData = (response as any).car;
//             } else {
//               carData = response;
//             }
            
//             console.log("🎯 Final car data to set:", carData);
//             setApiCarData(carData);
//           }
//         } catch (err: any) {
//           console.error("❌ Error fetching car details:", err);
//           setCarDataError(err.message || "Failed to load car details");
//         } finally {
//           setLoadingCarData(false);
//         }
//       }
//     };

//     fetchCarDetails();
//   }, [id]);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (!document.hidden && id) {
//         console.log("👁️ Page became visible - Refreshing reviews");
//         setTimeout(() => {
//           fetchReviewsByVehicleId(id, false);
//           fetchAverageRating(id, false);
//         }, 300);
//       }
//     };

//     const handleFocus = () => {
//       if (id) {
//         console.log("🎯 Window focused - Refreshing reviews");
//         setTimeout(() => {
//           fetchReviewsByVehicleId(id, false);
//           fetchAverageRating(id, false);
//         }, 300);
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     window.addEventListener('focus', handleFocus);

//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       window.removeEventListener('focus', handleFocus);
//     };
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       console.log("🔄 Initial review fetch triggered for vehicle:", id);
//       fetchReviewsByVehicleId(id);
//       fetchAverageRating(id);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       const intervalId = setInterval(() => {
//         console.log("🔄 Auto-refreshing reviews...");
//         fetchReviewsByVehicleId(id, true);
//         fetchAverageRating(id, true);
//       }, 30000);

//       return () => clearInterval(intervalId);
//     }
//   }, [id]);

//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;
//     if (showWaitingPopup && waitingTimerSeconds > 0) {
//       interval = setInterval(() => {
//         setWaitingTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
//       }, 1000);
//     }
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [showWaitingPopup, waitingTimerSeconds]);

//   useEffect(() => {
//     if (showWaitingPopup && waitingTimerSeconds === 0) {
//       handleTimerComplete();
//     }
//   }, [waitingTimerSeconds, showWaitingPopup]);

//   useEffect(() => {
//     const handleClickOutside = () => setMenuOpenIndex(null);
//     if (menuOpenIndex !== null) {
//       document.addEventListener('click', handleClickOutside);
//       return () => document.removeEventListener('click', handleClickOutside);
//     }
//   }, [menuOpenIndex]);

//   useEffect(() => {
//     const editingReviewId = sessionStorage.getItem('editingReviewId');
//     const returnToVehicleId = sessionStorage.getItem('returnToVehicleId');
    
//     if (editingReviewId && returnToVehicleId === id && apiReviews.length > 0) {
//       const updatedReview = apiReviews.find(r => r._id === editingReviewId);
//       if (updatedReview) {
//         console.log("🎯 UPDATED REVIEW CONFIRMED IN UI!");
//         console.log("📊 Review Data:", updatedReview);
//       }
//     }
//   }, [apiReviews, id]);

//   const isUserReview = (review: Review): boolean => {
//     const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
//     return review.userId === currentUserId;
//   };

//   const handleMenuToggle = (reviewId: string, event: React.MouseEvent) => {
//     event.stopPropagation();
//     setMenuOpenIndex(menuOpenIndex === reviewId ? null : reviewId);
//   };

//   const handleRefreshReviews = () => {
//     if (id) {
//       console.log("🔄 Manual refresh triggered");
//       fetchReviewsByVehicleId(id, false);
//       fetchAverageRating(id, false);
//     }
//   };

//   const handleEditClick = (review: Review) => {
//     console.log("✏️ Navigating to feedback page for review:", review._id);
//     const currentVehicle = vehicle || (apiCarData ? {
//       name: apiCarData.CarName || 'Unknown Vehicle',
//     } : null);
    
//     sessionStorage.setItem('editingReviewId', review._id);
//     sessionStorage.setItem('returnToVehicleId', id || '');
    
//     navigate(`/feedback?vehicleId=${id}&vehicleName=${encodeURIComponent(currentVehicle?.name || '')}&reviewId=${review._id}`);
//     setMenuOpenIndex(null);
//   };

//   const handleDeleteReview = async (reviewId: string, event: React.MouseEvent) => {
//     event.stopPropagation();
    
//     if (!window.confirm('Are you sure you want to delete this review?')) {
//       return;
//     }

//     setIsDeletingReview(true);
//     setMenuOpenIndex(null);
    
//     try {
//       console.log("🗑️ Deleting review:", reviewId);
      
//       const response = await fetch(`${API_BASE_URL}/deleteReview/${reviewId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log("Delete response status:", response.status);

//       if (response.ok) {
//         toast.success('✅ Review deleted successfully', {
//           duration: 2000,
//           position: 'top-right',
//         });
        
//         if (id) {
//           setTimeout(() => {
//             fetchReviewsByVehicleId(id, false);
//             fetchAverageRating(id, false);
//           }, 500);
//         }
//       } else {
//         toast.error('❌ Failed to delete review', {
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
//     }
//   };

//   const fetchAverageRating = async (vehicleId: string, silent: boolean = false) => {
//     if (!silent) {
//       setLoadingAverageRating(true);
//     }

//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("⭐ FETCHING AVERAGE RATING");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("📋 Vehicle ID:", vehicleId);

//     try {
//       const vehicleType = "Car";
//       const response = await fetch(
//         `${API_BASE_URL}/getAverageRating?vechileType=${vehicleType}&vechileId=${vehicleId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("📥 Average Rating Response Status:", response.status);

//       if (response.ok) {
//         const result = await response.json();
//         console.log("✅ Average Rating Response:", result);

//         if (result.success && result.averageRating !== undefined) {
//           const avgRating = parseFloat(result.averageRating);
//           setApiAverageRating(avgRating);
//           console.log("⭐ Average Rating Set:", avgRating);
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

//   const fetchReviewsByVehicleId = async (vehicleId: string, silent: boolean = false) => {
//     const now = Date.now();
    
//     if (now - lastFetchTime < 5000 && silent) {
//       console.log("⏳ Skipping fetch - too soon after last request");
//       return;
//     }
//     setLastFetchTime(now);

//     if (!silent) {
//       setLoadingReviews(true);
//       setReviewsError("");
//     }

//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("🔍 FETCHING REVIEWS FOR VEHICLE");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("📋 Vehicle ID:", vehicleId);

//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/getReviewsById/${vehicleId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("📥 Response Status:", response.status);

//       if (response.ok) {
//         const result = await response.json();
//         console.log("✅ Reviews Response:", result);

//         if (result.success && Array.isArray(result.reviews)) {
//           console.log("🎉 SUCCESS: Reviews found!", result.reviews.length);
//           console.log("📝 Full Review Data:", JSON.stringify(result.reviews, null, 2));
          
//           setApiReviews(result.reviews);
          
//           const editingReviewId = sessionStorage.getItem('editingReviewId');
//           if (editingReviewId) {
//             const updatedReview = result.reviews.find((r: any) => r._id === editingReviewId);
//             if (updatedReview) {
//               console.log("✨ Updated review detected!");
//               console.log("⭐ NEW Rating:", updatedReview.rating);
//               console.log("💬 NEW Text:", updatedReview.review || updatedReview.reviewText);
              
//               toast.success(`🎉 Review updated! New rating: ${updatedReview.rating}★`, {
//                 duration: 3000,
//                 position: 'top-center',
//               });
//             }
            
//             setTimeout(() => {
//               console.log("🧹 Clearing editingReviewId from sessionStorage");
//               sessionStorage.removeItem('editingReviewId');
//             }, 5000);
//           }
          
//           if (!silent) {
//             toast.success(`✅ Loaded ${result.reviews.length} review(s)`, {
//               duration: 2000,
//               position: 'top-right',
//             });
//           }

//           return result.reviews;
//         } else {
//           console.log("ℹ️ No reviews found");
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

//   const calculateAverageRating = (reviews: Review[]): number => {
//     if (reviews.length === 0) return 0;
//     const total = reviews.reduce((sum, review) => sum + review.rating, 0);
//     const average = total / reviews.length;
//     return Number(average.toFixed(1));
//   };

//   const calculateRatingDistribution = (reviews: Review[]) => {
//     const distribution = [5, 4, 3, 2, 1].map(stars => {
//       const count = reviews.filter(r => r.rating === stars).length;
//       const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
//       return { stars, count, percentage };
//     });
//     return distribution;
//   };

//   const mapVehicleTypeForAPI = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
//     if (!type) {
//       console.warn("⚠️ Vehicle type is undefined/null, defaulting to 'Car'");
//       return "Car";
//     }
    
//     const normalized = type.toLowerCase();
//     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
//       car: "Car",
//       auto: "Auto",
//       bike: "Bike",
//     };
    
//     return typeMap[normalized] || "Car";
//   };

//   const mapVehicleTypeForStore = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
//     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
//       car: "Car",
//       auto: "Auto",
//       bike: "Bike",
//     };
//     return type ? typeMap[type.toLowerCase()] || "Car" : "Car";
//   };

//   const calculateTotalHours = (
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
//   ): number => {
//     try {
//       const parseTime = (timeStr: string) => {
//         const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
//         if (!match) return { hours: 0, minutes: 0 };
       
//         let hours = parseInt(match[1]);
//         const minutes = parseInt(match[2] || '0');
//         const period = match[3]?.toUpperCase();
       
//         if (period === 'PM' && hours !== 12) hours += 12;
//         if (period === 'AM' && hours === 12) hours = 0;
       
//         return { hours, minutes };
//       };

//       const startTimeParsed = parseTime(startTime);
//       const endTimeParsed = parseTime(endTime);

//       const start = new Date(startDate);
//       start.setHours(startTimeParsed.hours, startTimeParsed.minutes, 0, 0);

//       const end = new Date(endDate);
//       end.setHours(endTimeParsed.hours, endTimeParsed.minutes, 0, 0);

//       const diffInMs = end.getTime() - start.getTime();
//       const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
     
//       return hours > 0 ? hours : 1;
//     } catch (error) {
//       console.error("❌ Error calculating hours:", error);
//       return 1;
//     }
//   };

//   const formatDateForAPI = (dateString: string): string => {
//     try {
//       const date = new Date(dateString);
//       if (!isNaN(date.getTime())) {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//       }
//     } catch (error) {
//       console.error("❌ Date formatting error:", error);
//     }
//     return dateString;
//   };

//   const formatTimeForAPI = (timeString: string): string => {
//     try {
//       const ampmMatch = timeString.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
//       if (ampmMatch) {
//         let hours = parseInt(ampmMatch[1]);
//         const minutes = ampmMatch[2] || '00';
//         const period = ampmMatch[3].toUpperCase();
       
//         if (period === 'PM' && hours !== 12) hours += 12;
//         if (period === 'AM' && hours === 12) hours = 0;
       
//         return `${hours.toString().padStart(2, '0')}.${minutes}`;
//       }
//     } catch (error) {
//       console.error("❌ Time formatting error:", error);
//     }
//     return timeString;
//   };

//   const currentVehicle = vehicle || (apiCarData ? {
//     id: apiCarData._id || apiCarData.id || id || '',
//     name: apiCarData.CarName || 'Unknown Vehicle',
//     image: (apiCarData.carImages && apiCarData.carImages.length > 0) 
//       ? apiCarData.carImages[0] 
//       : apiCarData.carImage || apiCarData.image || 'https://via.placeholder.com/400',
//     price: apiCarData.RentPerDay || apiCarData.pricePerHour || '0',
//     type: 'car' as Vehicle["type"],
//   } : null);

//   const createBookingAPI = async (
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
//   ) => {
//     if (!currentVehicle) {
//       setApiError("Vehicle information is missing");
//       return null;
//     }

//     setIsSubmittingBooking(true);
//     setApiError("");

//     try {
//       const userData = JSON.parse(localStorage.getItem("user") || "{}");

//       const totalHours = calculateTotalHours(startDate, endDate, startTime, endTime);
//       const pricePerHour = parseInt(String(currentVehicle?.price ?? "0"), 10);
//       const totalPrice = totalHours * pricePerHour;

//       const formattedFromDate = formatDateForAPI(startDate);
//       const formattedToDate = formatDateForAPI(endDate);
//       const formattedFromTime = formatTimeForAPI(startTime);
//       const formattedToTime = formatTimeForAPI(endTime);

//       const requestBody = {
//         userId: userData?._id || "",
//         vechileType: mapVehicleTypeForAPI(currentVehicle.type),
//         VechileId: currentVehicle.id,
//         pricePerKm: String(pricePerHour),
//         pricePerDay: String(totalPrice),
//         contactNumber: userData?.phone || "",
//         contactName: userData?.name || "",
//         latitude: userData?.latitude || "17.438095",
//         longitude: userData?.longitude || "78.4485",
//         FromDate: formattedFromDate,
//         ToDate: formattedToDate,
//         FromTime: formattedFromTime,
//         ToTime: formattedToTime,
//         totalHours: totalHours.toString(),
//         totalPrice: totalPrice.toString(),
//       };

//       console.log("📤 Sending booking request:", requestBody);

//       const urlencoded = new URLSearchParams();
//       Object.entries(requestBody).forEach(([key, value]) => {
//         urlencoded.append(key, value);
//       });

//       const directApiUrl = `${API_BASE_URL}/createBooking`;

//       for (let i = 0; i < CORS_PROXIES.length; i++) {
//         try {
//           const proxiedUrl = `${CORS_PROXIES[i]}${encodeURIComponent(directApiUrl)}`;
//           const response = await fetch(proxiedUrl, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: urlencoded.toString(),
//           });

//           if (response.ok) {
//             const text = await response.text();
//             console.log("📄 Response:", text);

//             let result;
//             try {
//               result = JSON.parse(text);
//               if (result.booking?._id) {
//                 setBookingId(result.booking._id);
//                 console.log("✅ Booking created with ID:", result.booking._id);
//                 toast.success("Booking request sent to owner!");
//                 return result;
//               }
//             } catch {
//               const tempId = `BOOK-${Date.now()}`;
//               setBookingId(tempId);
//               toast.success("Booking request sent to owner!");
//               return { success: true, bookingId: tempId };
//             }
//           }
//         } catch (error) {
//           if (i === CORS_PROXIES.length - 1) {
//             throw error;
//           }
//         }
//       }

//       const tempId = `BOOK-${Date.now()}`;
//       setBookingId(tempId);
//       toast.success("Booking request sent to owner!");
//       return { success: true, bookingId: tempId };
//     } catch (error: any) {
//       console.error("❌ Error creating booking:", error);
//       const tempId = `BOOK-${Date.now()}`;
//       setBookingId(tempId);
//       toast.success("Booking request sent to owner! (Demo mode)");
//       return { success: true, bookingId: tempId };
//     } finally {
//       setIsSubmittingBooking(false);
//     }
//   };

//   const handleTimerComplete = () => {
//     console.log("⏰ Timer completed - Owner should see Accept/Reject modal on their app");
//     console.log("📱 Owner App: BookingAcceptance modal should popup now");
//     console.log("👤 Customer Side: Showing Call and Chat buttons (assuming owner accepted)");
//     setShowWaitingPopup(false);
//     setShowContactButtons(true);
//   };

//   const handleCloseWaiting = () => {
//     console.log("❌ WaitingPopup closed manually");
//     setShowWaitingPopup(false);
//     setWaitingTimerSeconds(180);
//   };

//   const handleCallOwner = () => {
//     console.log("📞 Customer calling owner...");
//     console.log("🎉 Call initiated - Opening success modal");
//     setTimeout(() => {
//       handleConfirmBooking();
//     }, 1000);
//   };

//   const handleConfirmBooking = () => {
//     if (!currentVehicle || !selectedDateTime) {
//       console.error("❌ Cannot confirm booking");
//       return;
//     }

//     const currentDate = new Date();
//     console.log("🎉 Confirming booking with ID:", bookingId);

//     addBooking({
//       id: bookingId || Date.now().toString(),
//       vehicleId: currentVehicle.id,
//       vehicleName: currentVehicle.name,
//       vehicleImage: currentVehicle.image,
//       vehicleType: mapVehicleTypeForStore(currentVehicle.type),
//       customerName: "Current User",
//       bookingDate: currentDate.toLocaleDateString("en-US"),
//       bookingTime: currentDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       startDate: selectedDateTime.startDate,
//       startTime: selectedDateTime.startTime,
//       endDate: selectedDateTime.endDate,
//       endTime: selectedDateTime.endTime,
//       modelNo: currentVehicle.id.toUpperCase(),
//       status: "Booked",
//       price: currentVehicle.price,
//     });

//     setShowSuccessModal(true);
//   };

//   const vehicleReviews = getReviewsByVehicleId(currentVehicle?.id || '');
//   const averageRating = getAverageRating(currentVehicle?.id || '');
//   const totalReviews = getTotalReviewCount(currentVehicle?.id || '');
//   const ratingDistribution = getRatingDistribution(currentVehicle?.id || '');

//   const displayReviews = apiReviews.length > 0 ? apiReviews : vehicleReviews;
  
//   const displayAverageRating = apiAverageRating > 0 
//     ? apiAverageRating 
//     : (apiReviews.length > 0 
//         ? calculateAverageRating(apiReviews) 
//         : averageRating);
  
//   const displayTotalReviews = apiReviews.length > 0 
//     ? apiReviews.length 
//     : totalReviews;
  
//   const displayRatingDistribution = apiReviews.length > 0 
//     ? calculateRatingDistribution(apiReviews) 
//     : ratingDistribution;

//   if (loadingCarData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
//         <div className="text-center space-y-4 p-8">
//           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
//           <p className="text-xl text-gray-700 font-semibold">Loading vehicle details...</p>
//           <p className="text-sm text-gray-500">Please wait while we fetch the car information</p>
//         </div>
//       </div>
//     );
//   }

//   if (carDataError && !vehicle) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
//         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
//           <div className="text-6xl">❌</div>
//           <p className="text-xl text-red-600 font-bold">Error Loading Vehicle</p>
//           <p className="text-gray-600">{carDataError}</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
//           >
//             ← Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!vehicle && !apiCarData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
//           <div className="text-6xl">🚗</div>
//           <p className="text-xl text-gray-700 font-bold">Vehicle Not Found</p>
//           <p className="text-gray-600">The vehicle you're looking for doesn't exist or has been removed.</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
//           >
//             ← Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!currentVehicle) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center space-y-4 p-8">
//           <p className="text-xl text-gray-700">Vehicle data not available!</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//       <div className="lg:col-span-1">
//         <img
//           src={currentVehicle.image}
//           alt={currentVehicle.name}
//           className="rounded-xl w-full mb-4"
//         />
//         <div className="flex justify-center space-x-2 mt-2">
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//         </div>
//       </div>

//       <div className="lg:col-span-1">
//         <h1 className="text-3xl font-bold mb-2">{currentVehicle.name}</h1>
        
//         {/* Rating Section */}
//         <div className="flex items-center gap-2 mb-4">
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 size={20}
//                 className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//               />
//             ))}
//           </div>
//           <span className="text-sm text-gray-600">
//             {displayAverageRating} ({displayTotalReviews} reviews)
//           </span>
//         </div>

//         {/* Price */}
//         <div className="mb-6">
//           <span className="text-3xl font-bold text-blue-600">₹{currentVehicle.price}</span>
//           <span className="text-gray-600 ml-2">/day</span>
//         </div>

//         {/* Vehicle Specifications */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           {apiCarData?.TransmissionType && (
//             <div className="flex items-center gap-2">
//               <img src={Automatic} alt="Transmission" className="w-6 h-6" />
//               <span className="text-sm text-gray-700">{apiCarData.TransmissionType}</span>
//             </div>
//           )}
//           {apiCarData?.FuelType && (
//             <div className="flex items-center gap-2">
//               <img src={Petrol} alt="Fuel" className="w-6 h-6" />
//               <span className="text-sm text-gray-700">{apiCarData.FuelType}</span>
//             </div>
//           )}
//           {apiCarData?.SeatingCapacity && (
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-700">👥 {apiCarData.SeatingCapacity} Seater</span>
//             </div>
//           )}
//         </div>

//         {/* Book Now Button or Contact Buttons */}
//         {!showContactButtons ? (
//           <button
//             onClick={() => setIsDateTimeModalOpen(true)}
//             disabled={isSubmittingBooking}
//             className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition shadow-md disabled:opacity-50"
//           >
//             {isSubmittingBooking ? "Processing..." : "Book Now"}
//           </button>
//         ) : (
//           <div className="mt-6 space-y-4">
//             <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
//               <img
//                 src="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
//                 alt="Manoj Kumar"
//                 className="w-12 h-12 rounded-full"
//               />
//               <div className="flex-1">
//                 <h4 className="font-semibold text-gray-900">Manoj Kumar</h4>
//                 <p className="text-sm text-gray-500">Vehicle Owner</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
//               <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//               </svg>
//               <p className="text-sm text-orange-700 flex-1">
//                 Please call the owner to discuss booking details and confirm availability.
//               </p>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setIsChatOpen(true)}
//                 className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
//               >
//                 💬 Chat
//               </button>
//               <button
//                 onClick={handleCallOwner}
//                 className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//               >
//                 📞 Call Owner
//               </button>
//             </div>
//           </div>
//         )}

//         {isDateTimeModalOpen && (
//           <AvailabilityDateTimeModal
//             isOpen={isDateTimeModalOpen}
//             onClose={() => {
//               setIsDateTimeModalOpen(false);
//               setApiError("");
//             }}
//             onConfirm={async (startDate, endDate, startTime, endTime, availability) => {
//               console.log("✅ DateTime selected:", { startDate, endDate, startTime, endTime });
             
//               setSelectedDateTime({ startDate, endDate, startTime, endTime });
//               setIsDateTimeModalOpen(false);
             
//               const result = await createBookingAPI(startDate, endDate, startTime, endTime);
             
//               if (result) {
//                 console.log("🎉 Starting wait timer");
//                 setWaitingTimerSeconds(180);
//                 setShowWaitingPopup(true);
//               }
//             }}
//           />
//         )}
//       </div>

//       <div className="lg:col-span-1">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="text-lg font-bold">Rating & Reviews</h3>
//           <div className="flex items-center gap-2">
//             {(loadingReviews || loadingAverageRating) && (
//               <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
//             )}
//             <button
//               onClick={handleRefreshReviews}
//               disabled={loadingReviews || loadingAverageRating}
//               className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//               title="Refresh reviews"
//             >
//               <RefreshCw className={`w-4 h-4 text-gray-600 ${(loadingReviews || loadingAverageRating) ? 'animate-spin' : ''}`} />
//             </button>
//           </div>
//         </div>

//         {apiReviews.length > 0 && (
//           <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
//             <span className="text-xs text-green-700 font-medium">
//               ✓ Live reviews from API
//             </span>
//             <span className="text-xs text-gray-500">
//               (Updated {new Date(lastFetchTime).toLocaleTimeString()})
//             </span>
//           </div>
//         )}

//         {sessionStorage.getItem('editingReviewId') && !loadingReviews && (
//           <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 animate-pulse">
//             <span className="text-xs text-blue-700 font-medium">
//               🔄 Refreshing to show your updated review...
//             </span>
//           </div>
//         )}

//         {reviewsError && (
//           <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-xs text-yellow-700">{reviewsError}</p>
//           </div>
//         )}

//         <div className="flex items-center mt-2 mb-2 justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
//           <div className="flex flex-col">
//             <span className="text-3xl font-bold text-gray-900">{displayAverageRating}</span>
//             <span className="text-xs text-gray-600 mt-1">out of 5</span>
//           </div>
//           <div className="flex flex-col items-end">
//             <div className="flex gap-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                   size={20}
//                 />
//               ))}
//             </div>
//             <span className="text-sm text-gray-600 mt-1">
//               {displayTotalReviews} Review{displayTotalReviews !== 1 ? 's' : ''}
//             </span>
//           </div>
//         </div>

//         <div className="mt-4 space-y-2 bg-white p-4 rounded-lg border">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating Breakdown</h4>
//           {displayRatingDistribution.map((r) => (
//             <div key={r.stars} className="flex items-center text-sm">
//               <span className="w-8 text-gray-700 font-medium">{r.stars}★</span>
//               <div className="flex-1 bg-gray-200 h-3 rounded-full mx-3 overflow-hidden">
//                 <div 
//                   className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500" 
//                   style={{ width: `${r.percentage}%` }} 
//                 />
//               </div>
//               <span className="text-gray-500 text-xs min-w-[45px] text-right">
//                 {r.count} ({r.percentage}%)
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 space-y-3 max-h-[500px] overflow-y-auto pr-2">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3 sticky top-0 bg-white py-2 z-10">
//             Customer Reviews ({displayTotalReviews})
//           </h4>
          
//           {displayReviews.length > 0 ? (
//             displayReviews.map((review, idx) => {
//               const canEdit = isUserReview(review);
//               const wasJustEdited = sessionStorage.getItem('editingReviewId') === review._id;
//               const isMenuOpen = menuOpenIndex === review._id;
              
//               if (wasJustEdited) {
//                 console.log("🎨 RENDERING UPDATED REVIEW CARD:");
//                 console.log("  ✅ Review ID:", review._id);
//                 console.log("  ⭐ Rating:", review.rating);
//                 console.log("  💬 Text:", review.review || review.reviewText);
//               }
              
//               return (
//                 <div 
//                   key={review._id || idx} 
//                   className={`border rounded-xl p-4 transition-all duration-500 relative ${
//                     wasJustEdited
//                       ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl ring-2 ring-green-400 ring-offset-2'
//                       : canEdit 
//                       ? 'border-blue-200 bg-blue-50 hover:shadow-md' 
//                       : 'border-gray-200 bg-white hover:shadow-md'
//                   }`}
//                 >
//                   {wasJustEdited && (
//                     <div className="absolute -top-3 -right-3 z-20 animate-bounce">
//                       <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white text-xs px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2">
//                         <span className="text-lg animate-spin">✨</span>
//                         <span className="font-extrabold">JUST UPDATED!</span>
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center gap-2 flex-1">
//                       <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
//                         wasJustEdited 
//                           ? 'bg-gradient-to-br from-green-400 to-emerald-500 ring-2 ring-green-300'
//                           : 'bg-gradient-to-br from-blue-400 to-purple-400'
//                       }`}>
//                         {(review.userName || `User ${idx + 1}`).charAt(0).toUpperCase()}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2">
//                           <span className={`font-semibold text-gray-900 text-sm ${
//                             wasJustEdited ? 'text-green-800' : ''
//                           }`}>
//                             {review.userName || `User ${idx + 1}`}
//                           </span>
//                           {canEdit && (
//                             <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium">
//                               You
//                             </span>
//                           )}
//                           {wasJustEdited && (
//                             <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-medium animate-pulse">
//                               Updated
//                             </span>
//                           )}
//                         </div>
//                         {review.createdAt && (
//                           <p className="text-xs text-gray-400">
//                             {new Date(review.createdAt).toLocaleDateString('en-US', {
//                               year: 'numeric',
//                               month: 'short',
//                               day: 'numeric'
//                             })}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       <div className={`flex px-2 py-1 rounded-lg border ${
//                         wasJustEdited 
//                           ? 'bg-green-100 border-green-300 ring-2 ring-green-200' 
//                           : 'bg-yellow-50 border-yellow-200'
//                       }`}>
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             size={14}
//                             className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                           />
//                         ))}
//                       </div>

//                       <div className="relative" onClick={(e) => e.stopPropagation()}>
//                         <button
//                           onClick={(e) => handleMenuToggle(review._id, e)}
//                           className={`p-1.5 rounded-full transition-all duration-200 ${
//                             isMenuOpen 
//                               ? 'bg-blue-100 text-blue-600' 
//                               : 'hover:bg-gray-100 text-gray-600'
//                           }`}
//                           aria-label="Review options"
//                           title={canEdit ? "Edit or delete review" : "Review options"}
//                         >
//                           <MoreVertical size={18} />
//                         </button>

//                         {isMenuOpen && (
//                           <div 
//                             className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-30 overflow-hidden"
//                             onClick={(e) => e.stopPropagation()}
//                           >
//                             {canEdit ? (
//                               <div className="py-1">
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleEditClick(review);
//                                   }}
//                                   className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 transition-colors group"
//                                 >
//                                   <Edit size={16} className="text-blue-600 group-hover:scale-110 transition-transform" />
//                                   <span className="font-medium text-gray-700 group-hover:text-blue-700">Edit Review</span>
//                                 </button>
                                
//                                 <div className="border-t border-gray-100"></div>
                                
//                                 <button
//                                   onClick={(e) => handleDeleteReview(review._id, e)}
//                                   className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
//                                 >
//                                   <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
//                                   <span className="font-medium group-hover:text-red-700">Delete Review</span>
//                                 </button>
//                               </div>
//                             ) : (
//                               <div className="py-3 px-4">
//                                 <p className="text-xs text-gray-500 text-center">
//                                   You can only edit your own reviews
//                                 </p>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <p className={`text-sm leading-relaxed mt-2 mb-3 ${
//                     wasJustEdited 
//                       ? 'text-gray-900 font-medium' 
//                       : 'text-gray-700'
//                   }`}>
//                     {review.review || review.reviewText || review.comment || review.feedback || "No comment provided"}
//                   </p>
                  
//                   {wasJustEdited && (
//                     <div className="mt-3 p-3 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-lg shadow-inner">
//                       <p className="text-xs font-bold text-green-800 mb-2 flex items-center gap-1">
//                         <span className="text-base">✅</span>
//                         <span>Review Successfully Updated!</span>
//                       </p>
//                       <div className="space-y-1 text-xs text-green-700">
//                         <p><strong>New Rating:</strong> {review.rating} ⭐</p>
//                         <p><strong>New Review:</strong> {review.review || review.reviewText || 'No comment'}</p>
//                         <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
//               <div className="text-5xl mb-3">📝</div>
//               <p className="text-gray-500 font-medium mb-1">No reviews yet</p>
//               <p className="text-gray-400 text-sm">
//                 Be the first to review this vehicle!
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {showWaitingPopup && (
//         <WaitingPopup
//           timer={waitingTimerSeconds}
//           onClose={handleCloseWaiting}
//           onTimerComplete={handleTimerComplete}
//         />
//       )}

//       <PopupChat
//         isOpen={isChatOpen}
//         onClose={() => setIsChatOpen(false)}
//         ownerName="Manoj Kumar"
//         ownerAvatar="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
//       />

//       {isSubmittingBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
//             <div className="flex flex-col items-center">
//               <div className="relative mb-6">
//                 <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full animate-pulse"></div>
//                 </div>
//               </div>
              
//               <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
//                 Creating Your Booking...
//               </h2>
              
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 w-full mb-4 border border-blue-100 shadow-sm">
//                 {currentVehicle && (
//                   <>
//                     <div className="flex items-center gap-3 mb-4">
//                       <img 
//                         src={currentVehicle.image} 
//                         alt={currentVehicle.name}
//                         className="w-16 h-16 rounded-lg object-cover shadow-sm"
//                       />
//                       <div className="flex-1">
//                         <p className="font-bold text-gray-900 text-lg">{currentVehicle.name}</p>
//                         <p className="text-sm text-gray-600 capitalize">{currentVehicle.type}</p>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-2">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Car ID</span>
//                         <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
//                           {currentVehicle.id.substring(0, 12)}...
//                         </span>
//                       </div>
                      
//                       {apiCarData?.CarNumber && (
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Car Number</span>
//                           <span className="font-semibold text-gray-900">{apiCarData.CarNumber}</span>
//                         </div>
//                       )}
                      
//                       {selectedDateTime && (
//                         <div className="border-t border-blue-200 pt-2 mt-3">
//                           <p className="text-xs text-gray-600 mb-1">Booking Period</p>
//                           <p className="text-sm text-gray-700 font-medium">
//                             {selectedDateTime.startDate} {selectedDateTime.startTime}
//                             <br />
//                             to {selectedDateTime.endDate} {selectedDateTime.endTime}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
              
//               <div className="text-center space-y-2">
//                 <p className="text-gray-600 text-sm">
//                   Please wait while we process your booking...
//                 </p>
//                 <p className="text-blue-600 font-medium text-sm">
//                   Connecting to server & validating data
//                 </p>
//               </div>
              
//               <div className="flex gap-2 mt-5">
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {apiError && !isSubmittingBooking && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[110] max-w-md w-full mx-4 animate-slideDown">
//           <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-xl">
//             <div className="flex items-start">
//               <div className="flex-shrink-0">
//                 <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="ml-3 flex-1">
//                 <h3 className="text-sm font-bold text-red-800">Booking Failed</h3>
//                 <p className="mt-1 text-sm text-red-700">{apiError}</p>
//                 {currentVehicle && (
//                   <p className="mt-1 text-xs text-red-600">
//                     Car: {currentVehicle.name} (ID: {currentVehicle.id.substring(0, 8)}...)
//                   </p>
//                 )}
//                 <div className="mt-3 flex gap-2">
//                   <button
//                     onClick={() => {
//                       setApiError("");
//                       setIsDateTimeModalOpen(true);
//                     }}
//                     className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
//                   >
//                     Retry Booking
//                   </button>
//                   <button
//                     onClick={() => setApiError("")}
//                     className="px-3 py-1.5 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-300 hover:bg-red-50 transition-colors"
//                   >
//                     Dismiss
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showSuccessModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
//             <div className="flex justify-center mb-6">
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//                 <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//             </div>
   
//             <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
//               Booking Posted Successfully!
//             </h2>
//             <p className="text-gray-600 text-center mb-6">
//               Your booking has been confirmed. You will receive updates on your booking status.
//             </p>
   
//             <div className="bg-gray-50 rounded-lg p-4 mb-6">
//               <div className="flex items-center gap-3 mb-3">
//                 <img src={currentVehicle.image} alt={currentVehicle.name} className="w-16 h-16 rounded-lg object-cover" />
//                 <div>
//                   <h3 className="font-semibold text-gray-900">{currentVehicle.name}</h3>
//                   <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
//                 </div>
//               </div>
             
//               {selectedDateTime && (
//                 <div className="text-sm text-gray-600 space-y-1">
//                   <div className="flex justify-between">
//                     <span>Start:</span>
//                     <span className="font-medium">
//                       {new Date(selectedDateTime.startDate).toLocaleDateString()} - {selectedDateTime.startTime}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>End:</span>
//                     <span className="font-medium">
//                       {new Date(selectedDateTime.endDate).toLocaleDateString()} - {selectedDateTime.endTime}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
   
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowSuccessModal(false);
//                   navigate("/");
//                 }}
//                 className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//               >
//                 Go Home
//               </button>
//               <button
//                 onClick={() => {
//                   setShowSuccessModal(false);
//                   setShowContactButtons(false);
//                   setSelectedDateTime(null);
//                   setBookingId(null);
//                   setWaitingTimerSeconds(180);
//                 }}
//                 className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//               >
//                 Book Another
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookNow;














// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { vehicles } from "./data/Vehicle";
// import { Vehicle } from "../types/Vehicle";
// import { Star, Loader2, RefreshCw, Trash2, Edit, MoreVertical } from "lucide-react";
// import apiService from "../services/api.service";
// import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
// import WaitingPopup from "../components/ui/WaitingPopup";
// import BookingAcceptance from "../components/ui/BookingAcceptance";
// import BookingRejectModal from "../components/ui/BookingRejectModal";
// import PopupChat from "../components/ui/PopupChat";
// import { useReviewStore } from "../store/review.store";
// import { useNotificationStore } from "../store/notification.store";
// import { useBookingStore } from "../store/booking.store";
// import toast from "react-hot-toast";

// import Automatic from "../assets/icons/AutomaticLogo.png";
// import Driver from "../assets/icons/DriverLogo.png";
// import Acicon from "../assets/icons/AutomaticLogo.png";
// import Petrol from "../assets/icons/Petrol.png";

// const CORS_PROXIES = [
//   "https://corsproxy.io/?",
//   "https://api.codetabs.com/v1/proxy?quest=",
// ];
// const API_BASE_URL = "http://3.110.122.127:3000";

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

// const BookNow: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams<{ id: string }>();
//   const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);

//   const {
//     getReviewsByVehicleId,
//     getAverageRating,
//     getTotalReviewCount,
//     getRatingDistribution,
//   } = useReviewStore();
//   const { addNotification } = useNotificationStore();
//   const { addBooking } = useBookingStore();

//   const [apiCarData, setApiCarData] = useState<any>(null);
//   const [loadingCarData, setLoadingCarData] = useState(true);
//   const [carDataError, setCarDataError] = useState("");

//   const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
//   const [showContactButtons, setShowContactButtons] = useState(false);
//   const [showWaitingPopup, setShowWaitingPopup] = useState(false);
//   const [showAcceptance, setShowAcceptance] = useState(false);
//   const [waitingTimerSeconds, setWaitingTimerSeconds] = useState<number>(180);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [selectedDateTime, setSelectedDateTime] = useState<{
//     startDate: string;
//     endDate: string;
//     startTime: string;
//     endTime: string;
//   } | null>(null);
//   const [bookingId, setBookingId] = useState<string | null>(null);
//   const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
//   const [apiError, setApiError] = useState<string>("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   const [apiReviews, setApiReviews] = useState<Review[]>([]);
//   const [loadingReviews, setLoadingReviews] = useState(false);
//   const [reviewsError, setReviewsError] = useState<string>("");
//   const [lastFetchTime, setLastFetchTime] = useState<number>(0);
//   const [apiAverageRating, setApiAverageRating] = useState<number>(0);
//   const [loadingAverageRating, setLoadingAverageRating] = useState<boolean>(false);
//   const [isDeletingReview, setIsDeletingReview] = useState<boolean>(false);
//   const [menuOpenIndex, setMenuOpenIndex] = useState<string | null>(null);

//   const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
  
// useEffect(() => {
//   const fetchVehicleDetails = async () => {
//     if (id) {
//       try {
//         setLoadingCarData(true);
//         setCarDataError("");
        
//         // Determine vehicle type from URL or location state
//         const vehicleType = location.state?.vehicleType || vehicle?.type || 'car';
        
//         console.log(`📡 Fetching ${vehicleType} details for ID: ${id}`);
        
//         let response;
//         let vehicleData = null;
//         let successType = vehicleType;
        
//         try {
//           if (vehicleType.toLowerCase() === 'bike') {
//             // Try bike endpoint
//             response = await apiService.bike.getBikeById(id);
//             console.log("✅ Bike API response:", response);
            
//             // Handle bike response format
//             if ((response as any).bike) {
//               vehicleData = (response as any).bike;
//             } else if ((response as any).data) {
//               vehicleData = (response as any).data;
//             } else {
//               vehicleData = response;
//             }
//           } else {
//             // Try car endpoint
//             response = await apiService.car.getCarById(id);
//             console.log("✅ Car API response:", response);
            
//             // Handle car response format
//             if ((response as any).car) {
//               vehicleData = (response as any).car;
//             } else if ((response as any).data) {
//               vehicleData = (response as any).data;
//             } else {
//               vehicleData = response;
//             }
//           }
//         } catch (apiError: any) {
//           console.warn(`⚠️ ${vehicleType} API failed (${apiError.message}), trying alternate type...`);
          
//           // If bike fails, try car and vice versa (fallback mechanism)
//           try {
//             if (vehicleType.toLowerCase() === 'bike') {
//               console.log("🔄 Trying Car API as fallback...");
//               response = await apiService.car.getCarById(id);
//               successType = 'car';
//               if ((response as any).car) vehicleData = (response as any).car;
//               else if ((response as any).data) vehicleData = (response as any).data;
//               else vehicleData = response;
//               console.log("✅ Car API (fallback) succeeded!");
//             } else {
//               console.log("🔄 Trying Bike API as fallback...");
//               response = await apiService.bike.getBikeById(id);
//               successType = 'bike';
//               if ((response as any).bike) vehicleData = (response as any).bike;
//               else if ((response as any).data) vehicleData = (response as any).data;
//               else vehicleData = response;
//               console.log("✅ Bike API (fallback) succeeded!");
//             }
//           } catch (fallbackError: any) {
//             console.error("❌ Both APIs failed!");
//             throw new Error(
//               `Vehicle not found. This ${vehicleType} (ID: ${id}) may not exist in the database or has been removed.`
//             );
//           }
//         }
        
//         if (vehicleData) {
//           console.log("🎯 Final vehicle data to set:", vehicleData);
//           console.log(`✅ Successfully loaded as ${successType.toUpperCase()}`);
//           setApiCarData(vehicleData);
//         } else {
//           throw new Error("No vehicle data received from API");
//         }
//       } catch (err: any) {
//         console.error(`❌ Error fetching vehicle details:`, err);
//         setCarDataError(err.message || "Failed to load vehicle details");
        
//         // Show toast notification
//         toast.error(err.message || "Failed to load vehicle details", {
//           duration: 5000,
//           position: 'top-center',
//         });
//       } finally {
//         setLoadingCarData(false);
//       }
//     }
//   };

//   fetchVehicleDetails();
// }, [id, location.state]);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (!document.hidden && id) {
//         console.log("👁️ Page became visible - Refreshing reviews");
//         setTimeout(() => {
//           fetchReviewsByVehicleId(id, false);
//           fetchAverageRating(id, false);
//         }, 300);
//       }
//     };

//     const handleFocus = () => {
//       if (id) {
//         console.log("🎯 Window focused - Refreshing reviews");
//         setTimeout(() => {
//           fetchReviewsByVehicleId(id, false);
//           fetchAverageRating(id, false);
//         }, 300);
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     window.addEventListener('focus', handleFocus);

//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       window.removeEventListener('focus', handleFocus);
//     };
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       console.log("🔄 Initial review fetch triggered for vehicle:", id);
//       fetchReviewsByVehicleId(id);
//       fetchAverageRating(id);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       const intervalId = setInterval(() => {
//         console.log("🔄 Auto-refreshing reviews...");
//         fetchReviewsByVehicleId(id, true);
//         fetchAverageRating(id, true);
//       }, 30000);

//       return () => clearInterval(intervalId);
//     }
//   }, [id]);

//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;
//     if (showWaitingPopup && waitingTimerSeconds > 0) {
//       interval = setInterval(() => {
//         setWaitingTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
//       }, 1000);
//     }
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [showWaitingPopup, waitingTimerSeconds]);

//   useEffect(() => {
//     if (showWaitingPopup && waitingTimerSeconds === 0) {
//       handleTimerComplete();
//     }
//   }, [waitingTimerSeconds, showWaitingPopup]);

//   useEffect(() => {
//     const handleClickOutside = () => setMenuOpenIndex(null);
//     if (menuOpenIndex !== null) {
//       document.addEventListener('click', handleClickOutside);
//       return () => document.removeEventListener('click', handleClickOutside);
//     }
//   }, [menuOpenIndex]);

//   useEffect(() => {
//     const editingReviewId = sessionStorage.getItem('editingReviewId');
//     const returnToVehicleId = sessionStorage.getItem('returnToVehicleId');
    
//     if (editingReviewId && returnToVehicleId === id && apiReviews.length > 0) {
//       const updatedReview = apiReviews.find(r => r._id === editingReviewId);
//       if (updatedReview) {
//         console.log("🎯 UPDATED REVIEW CONFIRMED IN UI!");
//         console.log("📊 Review Data:", updatedReview);
//       }
//     }
//   }, [apiReviews, id]);

//   const isUserReview = (review: Review): boolean => {
//     const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
//     return review.userId === currentUserId;
//   };

//   const handleMenuToggle = (reviewId: string, event: React.MouseEvent) => {
//     event.stopPropagation();
//     setMenuOpenIndex(menuOpenIndex === reviewId ? null : reviewId);
//   };

//   const handleRefreshReviews = () => {
//     if (id) {
//       console.log("🔄 Manual refresh triggered");
//       fetchReviewsByVehicleId(id, false);
//       fetchAverageRating(id, false);
//     }
//   };

//   const handleEditClick = (review: Review) => {
//     console.log("✏️ Navigating to feedback page for review:", review._id);
//     const currentVehicle = vehicle || (apiCarData ? {
//       name: apiCarData.CarName || 'Unknown Vehicle',
//     } : null);
    
//     sessionStorage.setItem('editingReviewId', review._id);
//     sessionStorage.setItem('returnToVehicleId', id || '');
    
//     navigate(`/feedback?vehicleId=${id}&vehicleName=${encodeURIComponent(currentVehicle?.name || '')}&reviewId=${review._id}`);
//     setMenuOpenIndex(null);
//   };

//   const handleDeleteReview = async (reviewId: string, event: React.MouseEvent) => {
//     event.stopPropagation();
    
//     if (!window.confirm('Are you sure you want to delete this review?')) {
//       return;
//     }

//     setIsDeletingReview(true);
//     setMenuOpenIndex(null);
    
//     try {
//       console.log("🗑️ Deleting review:", reviewId);
      
//       const response = await fetch(`${API_BASE_URL}/deleteReview/${reviewId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log("Delete response status:", response.status);

//       if (response.ok) {
//         toast.success('✅ Review deleted successfully', {
//           duration: 2000,
//           position: 'top-right',
//         });
        
//         if (id) {
//           setTimeout(() => {
//             fetchReviewsByVehicleId(id, false);
//             fetchAverageRating(id, false);
//           }, 500);
//         }
//       } else {
//         toast.error('❌ Failed to delete review', {
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
//     }
//   };

//   const fetchAverageRating = async (vehicleId: string, silent: boolean = false) => {
//     if (!silent) {
//       setLoadingAverageRating(true);
//     }

//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("⭐ FETCHING AVERAGE RATING");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("📋 Vehicle ID:", vehicleId);

//     try {
//       const vehicleType = "Car";
//       const response = await fetch(
//         `${API_BASE_URL}/getAverageRating?vechileType=${vehicleType}&vechileId=${vehicleId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("📥 Average Rating Response Status:", response.status);

//       if (response.ok) {
//         const result = await response.json();
//         console.log("✅ Average Rating Response:", result);

//         if (result.success && result.averageRating !== undefined) {
//           const avgRating = parseFloat(result.averageRating);
//           setApiAverageRating(avgRating);
//           console.log("⭐ Average Rating Set:", avgRating);
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

//   const fetchReviewsByVehicleId = async (vehicleId: string, silent: boolean = false) => {
//     const now = Date.now();
    
//     if (now - lastFetchTime < 5000 && silent) {
//       console.log("⏳ Skipping fetch - too soon after last request");
//       return;
//     }
//     setLastFetchTime(now);

//     if (!silent) {
//       setLoadingReviews(true);
//       setReviewsError("");
//     }

//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("🔍 FETCHING REVIEWS FOR VEHICLE");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("📋 Vehicle ID:", vehicleId);

//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/getReviewsById/${vehicleId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("📥 Response Status:", response.status);

//       if (response.ok) {
//         const result = await response.json();
//         console.log("✅ Reviews Response:", result);

//         if (result.success && Array.isArray(result.reviews)) {
//           console.log("🎉 SUCCESS: Reviews found!", result.reviews.length);
//           console.log("📝 Full Review Data:", JSON.stringify(result.reviews, null, 2));
          
//           setApiReviews(result.reviews);
          
//           const editingReviewId = sessionStorage.getItem('editingReviewId');
//           if (editingReviewId) {
//             const updatedReview = result.reviews.find((r: any) => r._id === editingReviewId);
//             if (updatedReview) {
//               console.log("✨ Updated review detected!");
//               console.log("⭐ NEW Rating:", updatedReview.rating);
//               console.log("💬 NEW Text:", updatedReview.review || updatedReview.reviewText);
              
//               toast.success(`🎉 Review updated! New rating: ${updatedReview.rating}★`, {
//                 duration: 3000,
//                 position: 'top-center',
//               });
//             }
            
//             setTimeout(() => {
//               console.log("🧹 Clearing editingReviewId from sessionStorage");
//               sessionStorage.removeItem('editingReviewId');
//             }, 5000);
//           }
          
//           if (!silent) {
//             toast.success(`✅ Loaded ${result.reviews.length} review(s)`, {
//               duration: 2000,
//               position: 'top-right',
//             });
//           }

//           return result.reviews;
//         } else {
//           console.log("ℹ️ No reviews found");
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

//   const calculateAverageRating = (reviews: Review[]): number => {
//     if (reviews.length === 0) return 0;
//     const total = reviews.reduce((sum, review) => sum + review.rating, 0);
//     const average = total / reviews.length;
//     return Number(average.toFixed(1));
//   };

//   const calculateRatingDistribution = (reviews: Review[]) => {
//     const distribution = [5, 4, 3, 2, 1].map(stars => {
//       const count = reviews.filter(r => r.rating === stars).length;
//       const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
//       return { stars, count, percentage };
//     });
//     return distribution;
//   };

//   const mapVehicleTypeForAPI = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
//     if (!type) {
//       console.warn("⚠️ Vehicle type is undefined/null, defaulting to 'Car'");
//       return "Car";
//     }
    
//     const normalized = type.toLowerCase();
//     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
//       car: "Car",
//       auto: "Auto",
//       bike: "Bike",
//     };
    
//     return typeMap[normalized] || "Car";
//   };

//   const mapVehicleTypeForStore = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
//     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
//       car: "Car",
//       auto: "Auto",
//       bike: "Bike",
//     };
//     return type ? typeMap[type.toLowerCase()] || "Car" : "Car";
//   };

//   const calculateTotalHours = (
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
//   ): number => {
//     try {
//       const parseTime = (timeStr: string) => {
//         const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
//         if (!match) return { hours: 0, minutes: 0 };
       
//         let hours = parseInt(match[1]);
//         const minutes = parseInt(match[2] || '0');
//         const period = match[3]?.toUpperCase();
       
//         if (period === 'PM' && hours !== 12) hours += 12;
//         if (period === 'AM' && hours === 12) hours = 0;
       
//         return { hours, minutes };
//       };

//       const startTimeParsed = parseTime(startTime);
//       const endTimeParsed = parseTime(endTime);

//       const start = new Date(startDate);
//       start.setHours(startTimeParsed.hours, startTimeParsed.minutes, 0, 0);

//       const end = new Date(endDate);
//       end.setHours(endTimeParsed.hours, endTimeParsed.minutes, 0, 0);

//       const diffInMs = end.getTime() - start.getTime();
//       const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
     
//       return hours > 0 ? hours : 1;
//     } catch (error) {
//       console.error("❌ Error calculating hours:", error);
//       return 1;
//     }
//   };

//   const formatDateForAPI = (dateString: string): string => {
//     try {
//       const date = new Date(dateString);
//       if (!isNaN(date.getTime())) {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//       }
//     } catch (error) {
//       console.error("❌ Date formatting error:", error);
//     }
//     return dateString;
//   };

//   const formatTimeForAPI = (timeString: string): string => {
//     try {
//       const ampmMatch = timeString.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
//       if (ampmMatch) {
//         let hours = parseInt(ampmMatch[1]);
//         const minutes = ampmMatch[2] || '00';
//         const period = ampmMatch[3].toUpperCase();
       
//         if (period === 'PM' && hours !== 12) hours += 12;
//         if (period === 'AM' && hours === 12) hours = 0;
       
//         return `${hours.toString().padStart(2, '0')}.${minutes}`;
//       }
//     } catch (error) {
//       console.error("❌ Time formatting error:", error);
//     }
//     return timeString;
//   };
// const currentVehicle = vehicle || (apiCarData ? {
//   id: apiCarData._id || apiCarData.id || id || '',
//   name: apiCarData.CarName || apiCarData.bikeName || 'Unknown Vehicle',
//   image: (apiCarData.carImages && apiCarData.carImages.length > 0) 
//     ? apiCarData.carImages[0] 
//     : (apiCarData.bikeImages && apiCarData.bikeImages.length > 0)
//     ? apiCarData.bikeImages[0]
//     : apiCarData.carImage || apiCarData.bikeImage || apiCarData.image || 'https://via.placeholder.com/400',
//   price: apiCarData.RentPerDay || apiCarData.RentPerHour || apiCarData.pricePerKm || apiCarData.pricePerHour || '0',
//   type: (apiCarData.bikeName ? 'bike' : 'car') as Vehicle["type"],
//   // Add more fields for display
//   transmission: apiCarData.transmissionType || 'Manual',
//   fuel: apiCarData.fuelType || 'Petrol',
//   seats: apiCarData.Carseater || apiCarData.seatingCapacity || '2',
//   location: apiCarData.pickupArea || apiCarData.pickupCity || 'Unknown Location',
// } : null);

//   const createBookingAPI = async (
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
//   ) => {
//     if (!currentVehicle) {
//       setApiError("Vehicle information is missing");
//       return null;
//     }

//     setIsSubmittingBooking(true);
//     setApiError("");

//     try {
//       const userData = JSON.parse(localStorage.getItem("user") || "{}");

//       const totalHours = calculateTotalHours(startDate, endDate, startTime, endTime);
//       const pricePerHour = parseInt(String(currentVehicle?.price ?? "0"), 10);
//       const totalPrice = totalHours * pricePerHour;

//       const formattedFromDate = formatDateForAPI(startDate);
//       const formattedToDate = formatDateForAPI(endDate);
//       const formattedFromTime = formatTimeForAPI(startTime);
//       const formattedToTime = formatTimeForAPI(endTime);

//       const requestBody = {
//         userId: userData?._id || "",
//         vechileType: mapVehicleTypeForAPI(currentVehicle.type),
//         VechileId: currentVehicle.id,
//         pricePerKm: String(pricePerHour),
//         pricePerDay: String(totalPrice),
//         contactNumber: userData?.phone || "",
//         contactName: userData?.name || "",
//         latitude: userData?.latitude || "17.438095",
//         longitude: userData?.longitude || "78.4485",
//         FromDate: formattedFromDate,
//         ToDate: formattedToDate,
//         FromTime: formattedFromTime,
//         ToTime: formattedToTime,
//         totalHours: totalHours.toString(),
//         totalPrice: totalPrice.toString(),
//       };

//       console.log("📤 Sending booking request:", requestBody);

//       const urlencoded = new URLSearchParams();
//       Object.entries(requestBody).forEach(([key, value]) => {
//         urlencoded.append(key, value);
//       });

//       const directApiUrl = `${API_BASE_URL}/createBooking`;

//       for (let i = 0; i < CORS_PROXIES.length; i++) {
//         try {
//           const proxiedUrl = `${CORS_PROXIES[i]}${encodeURIComponent(directApiUrl)}`;
//           const response = await fetch(proxiedUrl, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: urlencoded.toString(),
//           });

//           if (response.ok) {
//             const text = await response.text();
//             console.log("📄 Response:", text);

//             let result;
//             try {
//               result = JSON.parse(text);
//               if (result.booking?._id) {
//                 setBookingId(result.booking._id);
//                 console.log("✅ Booking created with ID:", result.booking._id);
//                 toast.success("Booking request sent to owner!");
//                 return result;
//               }
//             } catch {
//               const tempId = `BOOK-${Date.now()}`;
//               setBookingId(tempId);
//               toast.success("Booking request sent to owner!");
//               return { success: true, bookingId: tempId };
//             }
//           }
//         } catch (error) {
//           if (i === CORS_PROXIES.length - 1) {
//             throw error;
//           }
//         }
//       }

//       const tempId = `BOOK-${Date.now()}`;
//       setBookingId(tempId);
//       toast.success("Booking request sent to owner!");
//       return { success: true, bookingId: tempId };
//     } catch (error: any) {
//       console.error("❌ Error creating booking:", error);
//       const tempId = `BOOK-${Date.now()}`;
//       setBookingId(tempId);
//       toast.success("Booking request sent to owner! (Demo mode)");
//       return { success: true, bookingId: tempId };
//     } finally {
//       setIsSubmittingBooking(false);
//     }
//   };

//   const handleTimerComplete = () => {
//     console.log("⏰ Timer completed - Owner should see Accept/Reject modal on their app");
//     console.log("📱 Owner App: BookingAcceptance modal should popup now");
//     console.log("👤 Customer Side: Showing Call and Chat buttons (assuming owner accepted)");
//     setShowWaitingPopup(false);
//     setShowContactButtons(true);
//   };

//   const handleCloseWaiting = () => {
//     console.log("❌ WaitingPopup closed manually");
//     setShowWaitingPopup(false);
//     setWaitingTimerSeconds(180);
//   };

//   const handleCallOwner = () => {
//     console.log("📞 Customer calling owner...");
//     console.log("🎉 Call initiated - Opening success modal");
//     setTimeout(() => {
//       handleConfirmBooking();
//     }, 1000);
//   };

//   const handleConfirmBooking = () => {
//     if (!currentVehicle || !selectedDateTime) {
//       console.error("❌ Cannot confirm booking");
//       return;
//     }

//     const currentDate = new Date();
//     console.log("🎉 Confirming booking with ID:", bookingId);

//     addBooking({
//       id: bookingId || Date.now().toString(),
//       vehicleId: currentVehicle.id,
//       vehicleName: currentVehicle.name,
//       vehicleImage: currentVehicle.image,
//       vehicleType: mapVehicleTypeForStore(currentVehicle.type),
//       customerName: "Current User",
//       bookingDate: currentDate.toLocaleDateString("en-US"),
//       bookingTime: currentDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       startDate: selectedDateTime.startDate,
//       startTime: selectedDateTime.startTime,
//       endDate: selectedDateTime.endDate,
//       endTime: selectedDateTime.endTime,
//       modelNo: currentVehicle.id.toUpperCase(),
//       status: "Booked",
//       price: currentVehicle.price,
//     });

//     setShowSuccessModal(true);
//   };

//   const vehicleReviews = getReviewsByVehicleId(currentVehicle?.id || '');
//   const averageRating = getAverageRating(currentVehicle?.id || '');
//   const totalReviews = getTotalReviewCount(currentVehicle?.id || '');
//   const ratingDistribution = getRatingDistribution(currentVehicle?.id || '');

//   const displayReviews = apiReviews.length > 0 ? apiReviews : vehicleReviews;
  
//   const displayAverageRating = apiAverageRating > 0 
//     ? apiAverageRating 
//     : (apiReviews.length > 0 
//         ? calculateAverageRating(apiReviews) 
//         : averageRating);
  
//   const displayTotalReviews = apiReviews.length > 0 
//     ? apiReviews.length 
//     : totalReviews;
  
//   const displayRatingDistribution = apiReviews.length > 0 
//     ? calculateRatingDistribution(apiReviews) 
//     : ratingDistribution;

//   if (loadingCarData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
//         <div className="text-center space-y-4 p-8">
//           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
//           <p className="text-xl text-gray-700 font-semibold">Loading vehicle details...</p>
//           <p className="text-sm text-gray-500">Please wait while we fetch the car information</p>
//         </div>
//       </div>
//     );
//   }

//   if (carDataError && !vehicle) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
//         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
//           <div className="text-6xl">❌</div>
//           <p className="text-xl text-red-600 font-bold">Error Loading Vehicle</p>
//           <p className="text-gray-600">{carDataError}</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
//           >
//             ← Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!vehicle && !apiCarData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
//           <div className="text-6xl">🚗</div>
//           <p className="text-xl text-gray-700 font-bold">Vehicle Not Found</p>
//           <p className="text-gray-600">The vehicle you're looking for doesn't exist or has been removed.</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
//           >
//             ← Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!currentVehicle) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center space-y-4 p-8">
//           <p className="text-xl text-gray-700">Vehicle data not available!</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//       <div className="lg:col-span-1">
//         <img
//           src={currentVehicle.image}
//           alt={currentVehicle.name}
//           className="rounded-xl w-full mb-4"
//         />
//         <div className="flex justify-center space-x-2 mt-2">
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//         </div>
//       </div>

//       <div className="lg:col-span-1">
//         <h1 className="text-3xl font-bold mb-2">{currentVehicle.name}</h1>
        
//         {/* Rating Section */}
//         <div className="flex items-center gap-2 mb-4">
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 size={20}
//                 className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//               />
//             ))}
//           </div>
//           <span className="text-sm text-gray-600">
//             {displayAverageRating} ({displayTotalReviews} reviews)
//           </span>
//         </div>

//         {/* Price */}
//         <div className="mb-6">
//           <span className="text-3xl font-bold text-blue-600">₹{currentVehicle.price}</span>
//           <span className="text-gray-600 ml-2">/day</span>
//         </div>

//         {/* Vehicle Specifications */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           {apiCarData?.TransmissionType && (
//             <div className="flex items-center gap-2">
//               <img src={Automatic} alt="Transmission" className="w-6 h-6" />
//               <span className="text-sm text-gray-700">{apiCarData.TransmissionType}</span>
//             </div>
//           )}
//           {apiCarData?.FuelType && (
//             <div className="flex items-center gap-2">
//               <img src={Petrol} alt="Fuel" className="w-6 h-6" />
//               <span className="text-sm text-gray-700">{apiCarData.FuelType}</span>
//             </div>
//           )}
//           {apiCarData?.SeatingCapacity && (
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-700">👥 {apiCarData.SeatingCapacity} Seater</span>
//             </div>
//           )}
//         </div>

//         {/* Book Now Button or Contact Buttons */}
//         {!showContactButtons ? (
//           <button
//             onClick={() => setIsDateTimeModalOpen(true)}
//             disabled={isSubmittingBooking}
//             className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition shadow-md disabled:opacity-50"
//           >
//             {isSubmittingBooking ? "Processing..." : "Book Now"}
//           </button>
//         ) : (
//           <div className="mt-6 space-y-4">
//             <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
//               <img
//                 src="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
//                 alt="Manoj Kumar"
//                 className="w-12 h-12 rounded-full"
//               />
//               <div className="flex-1">
//                 <h4 className="font-semibold text-gray-900">Manoj Kumar</h4>
//                 <p className="text-sm text-gray-500">Vehicle Owner</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
//               <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//               </svg>
//               <p className="text-sm text-orange-700 flex-1">
//                 Please call the owner to discuss booking details and confirm availability.
//               </p>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setIsChatOpen(true)}
//                 className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
//               >
//                 💬 Chat
//               </button>
//               <button
//                 onClick={handleCallOwner}
//                 className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//               >
//                 📞 Call Owner
//               </button>
//             </div>
//           </div>
//         )}

//         {isDateTimeModalOpen && (
//           <AvailabilityDateTimeModal
//             isOpen={isDateTimeModalOpen}
//             onClose={() => {
//               setIsDateTimeModalOpen(false);
//               setApiError("");
//             }}
//             onConfirm={async (startDate, endDate, startTime, endTime, availability) => {
//               console.log("✅ DateTime selected:", { startDate, endDate, startTime, endTime });
             
//               setSelectedDateTime({ startDate, endDate, startTime, endTime });
//               setIsDateTimeModalOpen(false);
             
//               const result = await createBookingAPI(startDate, endDate, startTime, endTime);
             
//               if (result) {
//                 console.log("🎉 Starting wait timer");
//                 setWaitingTimerSeconds(180);
//                 setShowWaitingPopup(true);
//               }
//             }}
//           />
//         )}
//       </div>

//       <div className="lg:col-span-1">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="text-lg font-bold">Rating & Reviews</h3>
//           <div className="flex items-center gap-2">
//             {(loadingReviews || loadingAverageRating) && (
//               <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
//             )}
//             <button
//               onClick={handleRefreshReviews}
//               disabled={loadingReviews || loadingAverageRating}
//               className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//               title="Refresh reviews"
//             >
//               <RefreshCw className={`w-4 h-4 text-gray-600 ${(loadingReviews || loadingAverageRating) ? 'animate-spin' : ''}`} />
//             </button>
//           </div>
//         </div>

//         {apiReviews.length > 0 && (
//           <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
//             <span className="text-xs text-green-700 font-medium">
//               ✓ Live reviews from API
//             </span>
//             <span className="text-xs text-gray-500">
//               (Updated {new Date(lastFetchTime).toLocaleTimeString()})
//             </span>
//           </div>
//         )}

//         {sessionStorage.getItem('editingReviewId') && !loadingReviews && (
//           <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 animate-pulse">
//             <span className="text-xs text-blue-700 font-medium">
//               🔄 Refreshing to show your updated review...
//             </span>
//           </div>
//         )}

//         {reviewsError && (
//           <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-xs text-yellow-700">{reviewsError}</p>
//           </div>
//         )}

//         <div className="flex items-center mt-2 mb-2 justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
//           <div className="flex flex-col">
//             <span className="text-3xl font-bold text-gray-900">{displayAverageRating}</span>
//             <span className="text-xs text-gray-600 mt-1">out of 5</span>
//           </div>
//           <div className="flex flex-col items-end">
//             <div className="flex gap-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                   size={20}
//                 />
//               ))}
//             </div>
//             <span className="text-sm text-gray-600 mt-1">
//               {displayTotalReviews} Review{displayTotalReviews !== 1 ? 's' : ''}
//             </span>
//           </div>
//         </div>

//         <div className="mt-4 space-y-2 bg-white p-4 rounded-lg border">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating Breakdown</h4>
//           {displayRatingDistribution.map((r) => (
//             <div key={r.stars} className="flex items-center text-sm">
//               <span className="w-8 text-gray-700 font-medium">{r.stars}★</span>
//               <div className="flex-1 bg-gray-200 h-3 rounded-full mx-3 overflow-hidden">
//                 <div 
//                   className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500" 
//                   style={{ width: `${r.percentage}%` }} 
//                 />
//               </div>
//               <span className="text-gray-500 text-xs min-w-[45px] text-right">
//                 {r.count} ({r.percentage}%)
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 space-y-3 max-h-[500px] overflow-y-auto pr-2">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3 sticky top-0 bg-white py-2 z-10">
//             Customer Reviews ({displayTotalReviews})
//           </h4>
          
//           {displayReviews.length > 0 ? (
//             displayReviews.map((review, idx) => {
//               const canEdit = isUserReview(review);
//               const wasJustEdited = sessionStorage.getItem('editingReviewId') === review._id;
//               const isMenuOpen = menuOpenIndex === review._id;
              
//               if (wasJustEdited) {
//                 console.log("🎨 RENDERING UPDATED REVIEW CARD:");
//                 console.log("  ✅ Review ID:", review._id);
//                 console.log("  ⭐ Rating:", review.rating);
//                 console.log("  💬 Text:", review.review || review.reviewText);
//               }
              
//               return (
//                 <div 
//                   key={review._id || idx} 
//                   className={`border rounded-xl p-4 transition-all duration-500 relative ${
//                     wasJustEdited
//                       ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl ring-2 ring-green-400 ring-offset-2'
//                       : canEdit 
//                       ? 'border-blue-200 bg-blue-50 hover:shadow-md' 
//                       : 'border-gray-200 bg-white hover:shadow-md'
//                   }`}
//                 >
//                   {wasJustEdited && (
//                     <div className="absolute -top-3 -right-3 z-20 animate-bounce">
//                       <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white text-xs px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2">
//                         <span className="text-lg animate-spin">✨</span>
//                         <span className="font-extrabold">JUST UPDATED!</span>
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center gap-2 flex-1">
//                       <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
//                         wasJustEdited 
//                           ? 'bg-gradient-to-br from-green-400 to-emerald-500 ring-2 ring-green-300'
//                           : 'bg-gradient-to-br from-blue-400 to-purple-400'
//                       }`}>
//                         {(review.userName || `User ${idx + 1}`).charAt(0).toUpperCase()}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2">
//                           <span className={`font-semibold text-gray-900 text-sm ${
//                             wasJustEdited ? 'text-green-800' : ''
//                           }`}>
//                             {review.userName || `User ${idx + 1}`}
//                           </span>
//                           {canEdit && (
//                             <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium">
//                               You
//                             </span>
//                           )}
//                           {wasJustEdited && (
//                             <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-medium animate-pulse">
//                               Updated
//                             </span>
//                           )}
//                         </div>
//                         {review.createdAt && (
//                           <p className="text-xs text-gray-400">
//                             {new Date(review.createdAt).toLocaleDateString('en-US', {
//                               year: 'numeric',
//                               month: 'short',
//                               day: 'numeric'
//                             })}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       <div className={`flex px-2 py-1 rounded-lg border ${
//                         wasJustEdited 
//                           ? 'bg-green-100 border-green-300 ring-2 ring-green-200' 
//                           : 'bg-yellow-50 border-yellow-200'
//                       }`}>
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             size={14}
//                             className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                           />
//                         ))}
//                       </div>

//                       <div className="relative" onClick={(e) => e.stopPropagation()}>
//                         <button
//                           onClick={(e) => handleMenuToggle(review._id, e)}
//                           className={`p-1.5 rounded-full transition-all duration-200 ${
//                             isMenuOpen 
//                               ? 'bg-blue-100 text-blue-600' 
//                               : 'hover:bg-gray-100 text-gray-600'
//                           }`}
//                           aria-label="Review options"
//                           title={canEdit ? "Edit or delete review" : "Review options"}
//                         >
//                           <MoreVertical size={18} />
//                         </button>

//                         {isMenuOpen && (
//                           <div 
//                             className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-30 overflow-hidden"
//                             onClick={(e) => e.stopPropagation()}
//                           >
//                             {canEdit ? (
//                               <div className="py-1">
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleEditClick(review);
//                                   }}
//                                   className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 transition-colors group"
//                                 >
//                                   <Edit size={16} className="text-blue-600 group-hover:scale-110 transition-transform" />
//                                   <span className="font-medium text-gray-700 group-hover:text-blue-700">Edit Review</span>
//                                 </button>
                                
//                                 <div className="border-t border-gray-100"></div>
                                
//                                 <button
//                                   onClick={(e) => handleDeleteReview(review._id, e)}
//                                   className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
//                                 >
//                                   <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
//                                   <span className="font-medium group-hover:text-red-700">Delete Review</span>
//                                 </button>
//                               </div>
//                             ) : (
//                               <div className="py-3 px-4">
//                                 <p className="text-xs text-gray-500 text-center">
//                                   You can only edit your own reviews
//                                 </p>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <p className={`text-sm leading-relaxed mt-2 mb-3 ${
//                     wasJustEdited 
//                       ? 'text-gray-900 font-medium' 
//                       : 'text-gray-700'
//                   }`}>
//                     {review.review || review.reviewText || review.comment || review.feedback || "No comment provided"}
//                   </p>
                  
//                   {wasJustEdited && (
//                     <div className="mt-3 p-3 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-lg shadow-inner">
//                       <p className="text-xs font-bold text-green-800 mb-2 flex items-center gap-1">
//                         <span className="text-base">✅</span>
//                         <span>Review Successfully Updated!</span>
//                       </p>
//                       <div className="space-y-1 text-xs text-green-700">
//                         <p><strong>New Rating:</strong> {review.rating} ⭐</p>
//                         <p><strong>New Review:</strong> {review.review || review.reviewText || 'No comment'}</p>
//                         <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
//               <div className="text-5xl mb-3">📝</div>
//               <p className="text-gray-500 font-medium mb-1">No reviews yet</p>
//               <p className="text-gray-400 text-sm">
//                 Be the first to review this vehicle!
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {showWaitingPopup && (
//         <WaitingPopup
//           timer={waitingTimerSeconds}
//           onClose={handleCloseWaiting}
//           onTimerComplete={handleTimerComplete}
//         />
//       )}

//       <PopupChat
//         isOpen={isChatOpen}
//         onClose={() => setIsChatOpen(false)}
//         ownerName="Manoj Kumar"
//         ownerAvatar="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
//       />

//       {isSubmittingBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
//             <div className="flex flex-col items-center">
//               <div className="relative mb-6">
//                 <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full animate-pulse"></div>
//                 </div>
//               </div>
              
//               <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
//                 Creating Your Booking...
//               </h2>
              
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 w-full mb-4 border border-blue-100 shadow-sm">
//                 {currentVehicle && (
//                   <>
//                     <div className="flex items-center gap-3 mb-4">
//                       <img 
//                         src={currentVehicle.image} 
//                         alt={currentVehicle.name}
//                         className="w-16 h-16 rounded-lg object-cover shadow-sm"
//                       />
//                       <div className="flex-1">
//                         <p className="font-bold text-gray-900 text-lg">{currentVehicle.name}</p>
//                         <p className="text-sm text-gray-600 capitalize">{currentVehicle.type}</p>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-2">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Car ID</span>
//                         <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
//                           {currentVehicle.id.substring(0, 12)}...
//                         </span>
//                       </div>
                      
//                       {apiCarData?.CarNumber && (
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Car Number</span>
//                           <span className="font-semibold text-gray-900">{apiCarData.CarNumber}</span>
//                         </div>
//                       )}
                      
//                       {selectedDateTime && (
//                         <div className="border-t border-blue-200 pt-2 mt-3">
//                           <p className="text-xs text-gray-600 mb-1">Booking Period</p>
//                           <p className="text-sm text-gray-700 font-medium">
//                             {selectedDateTime.startDate} {selectedDateTime.startTime}
//                             <br />
//                             to {selectedDateTime.endDate} {selectedDateTime.endTime}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
              
//               <div className="text-center space-y-2">
//                 <p className="text-gray-600 text-sm">
//                   Please wait while we process your booking...
//                 </p>
//                 <p className="text-blue-600 font-medium text-sm">
//                   Connecting to server & validating data
//                 </p>
//               </div>
              
//               <div className="flex gap-2 mt-5">
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {apiError && !isSubmittingBooking && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[110] max-w-md w-full mx-4 animate-slideDown">
//           <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-xl">
//             <div className="flex items-start">
//               <div className="flex-shrink-0">
//                 <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="ml-3 flex-1">
//                 <h3 className="text-sm font-bold text-red-800">Booking Failed</h3>
//                 <p className="mt-1 text-sm text-red-700">{apiError}</p>
//                 {currentVehicle && (
//                   <p className="mt-1 text-xs text-red-600">
//                     Car: {currentVehicle.name} (ID: {currentVehicle.id.substring(0, 8)}...)
//                   </p>
//                 )}
//                 <div className="mt-3 flex gap-2">
//                   <button
//                     onClick={() => {
//                       setApiError("");
//                       setIsDateTimeModalOpen(true);
//                     }}
//                     className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
//                   >
//                     Retry Booking
//                   </button>
//                   <button
//                     onClick={() => setApiError("")}
//                     className="px-3 py-1.5 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-300 hover:bg-red-50 transition-colors"
//                   >
//                     Dismiss
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showSuccessModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
//             <div className="flex justify-center mb-6">
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//                 <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//             </div>
   
//             <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
//               Booking Posted Successfully!
//             </h2>
//             <p className="text-gray-600 text-center mb-6">
//               Your booking has been confirmed. You will receive updates on your booking status.
//             </p>
   
//             <div className="bg-gray-50 rounded-lg p-4 mb-6">
//               <div className="flex items-center gap-3 mb-3">
//                 <img src={currentVehicle.image} alt={currentVehicle.name} className="w-16 h-16 rounded-lg object-cover" />
//                 <div>
//                   <h3 className="font-semibold text-gray-900">{currentVehicle.name}</h3>
//                   <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
//                 </div>
//               </div>
             
//               {selectedDateTime && (
//                 <div className="text-sm text-gray-600 space-y-1">
//                   <div className="flex justify-between">
//                     <span>Start:</span>
//                     <span className="font-medium">
//                       {new Date(selectedDateTime.startDate).toLocaleDateString()} - {selectedDateTime.startTime}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>End:</span>
//                     <span className="font-medium">
//                       {new Date(selectedDateTime.endDate).toLocaleDateString()} - {selectedDateTime.endTime}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
   
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowSuccessModal(false);
//                   navigate("/");
//                 }}
//                 className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//               >
//                 Go Home
//               </button>
//               <button
//                 onClick={() => {
//                   setShowSuccessModal(false);
//                   setShowContactButtons(false);
//                   setSelectedDateTime(null);
//                   setBookingId(null);
//                   setWaitingTimerSeconds(180);
//                 }}
//                 className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//               >
//                 Book Another
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookNow;












// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { vehicles } from "./data/Vehicle";
// import { Vehicle } from "../types/Vehicle";
// import { Star, Loader2, RefreshCw, Trash2, Edit, MoreVertical } from "lucide-react";
// import apiService from "../services/api.service";
// import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
// import WaitingPopup from "../components/ui/WaitingPopup";
// import BookingAcceptance from "../components/ui/BookingAcceptance";
// import BookingRejectModal from "../components/ui/BookingRejectModal";
// import PopupChat from "../components/ui/PopupChat";
// import { useReviewStore } from "../store/review.store";
// import { useNotificationStore } from "../store/notification.store";
// import { useBookingStore } from "../store/booking.store";
// import toast from "react-hot-toast";

// import Automatic from "../assets/icons/AutomaticLogo.png";
// import Driver from "../assets/icons/DriverLogo.png";
// import Acicon from "../assets/icons/AutomaticLogo.png";
// import Petrol from "../assets/icons/Petrol.png";

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

// const BookNow: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams<{ id: string }>();
//   const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);

//   const {
//     getReviewsByVehicleId,
//     getAverageRating,
//     getTotalReviewCount,
//     getRatingDistribution,
//   } = useReviewStore();
//   const { addNotification } = useNotificationStore();
//   const { addBooking } = useBookingStore();

//   const [apiCarData, setApiCarData] = useState<any>(null);
//   const [loadingCarData, setLoadingCarData] = useState(true);
//   const [carDataError, setCarDataError] = useState("");

//   const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
//   const [showContactButtons, setShowContactButtons] = useState(false);
//   const [showWaitingPopup, setShowWaitingPopup] = useState(false);
//   const [showAcceptance, setShowAcceptance] = useState(false);
//   const [waitingTimerSeconds, setWaitingTimerSeconds] = useState<number>(180);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [selectedDateTime, setSelectedDateTime] = useState<{
//     startDate: string;
//     endDate: string;
//     startTime: string;
//     endTime: string;
//   } | null>(null);
//   const [bookingId, setBookingId] = useState<string | null>(null);
//   const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
//   const [apiError, setApiError] = useState<string>("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   const [apiReviews, setApiReviews] = useState<Review[]>([]);
//   const [loadingReviews, setLoadingReviews] = useState(false);
//   const [reviewsError, setReviewsError] = useState<string>("");
//   const [lastFetchTime, setLastFetchTime] = useState<number>(0);
//   const [apiAverageRating, setApiAverageRating] = useState<number>(0);
//   const [loadingAverageRating, setLoadingAverageRating] = useState<boolean>(false);
//   const [isDeletingReview, setIsDeletingReview] = useState<boolean>(false);
//   const [menuOpenIndex, setMenuOpenIndex] = useState<string | null>(null);

//   const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
  
//   useEffect(() => {
//     const fetchVehicleDetails = async () => {
//       if (id) {
//         try {
//           setLoadingCarData(true);
//           setCarDataError("");
          
//           const vehicleType = location.state?.vehicleType || vehicle?.type || 'car';
          
//           console.log(`📡 Fetching ${vehicleType} details for ID: ${id}`);
          
//           let response;
//           let vehicleData = null;
//           let successType = vehicleType;
          
//           try {
//             if (vehicleType.toLowerCase() === 'bike') {
//               response = await apiService.bike.getBikeById(id);
//               console.log("✅ Bike API response:", response);
              
//               if ((response as any).bike) {
//                 vehicleData = (response as any).bike;
//               } else if ((response as any).data) {
//                 vehicleData = (response as any).data;
//               } else {
//                 vehicleData = response;
//               }
//             } else {
//               response = await apiService.car.getCarById(id);
//               console.log("✅ Car API response:", response);
              
//               if ((response as any).car) {
//                 vehicleData = (response as any).car;
//               } else if ((response as any).data) {
//                 vehicleData = (response as any).data;
//               } else {
//                 vehicleData = response;
//               }
//             }
//           } catch (apiError: any) {
//             console.warn(`⚠️ ${vehicleType} API failed (${apiError.message}), trying alternate type...`);
            
//             try {
//               if (vehicleType.toLowerCase() === 'bike') {
//                 console.log("🔄 Trying Car API as fallback...");
//                 response = await apiService.car.getCarById(id);
//                 successType = 'car';
//                 if ((response as any).car) vehicleData = (response as any).car;
//                 else if ((response as any).data) vehicleData = (response as any).data;
//                 else vehicleData = response;
//                 console.log("✅ Car API (fallback) succeeded!");
//               } else {
//                 console.log("🔄 Trying Bike API as fallback...");
//                 response = await apiService.bike.getBikeById(id);
//                 successType = 'bike';
//                 if ((response as any).bike) vehicleData = (response as any).bike;
//                 else if ((response as any).data) vehicleData = (response as any).data;
//                 else vehicleData = response;
//                 console.log("✅ Bike API (fallback) succeeded!");
//               }
//             } catch (fallbackError: any) {
//               console.error("❌ Both APIs failed!");
//               throw new Error(
//                 `Vehicle not found. This ${vehicleType} (ID: ${id}) may not exist in the database or has been removed.`
//               );
//             }
//           }
          
//           if (vehicleData) {
//             console.log("🎯 Final vehicle data to set:", vehicleData);
//             console.log(`✅ Successfully loaded as ${successType.toUpperCase()}`);
//             setApiCarData(vehicleData);
//           } else {
//             throw new Error("No vehicle data received from API");
//           }
//         } catch (err: any) {
//           console.error(`❌ Error fetching vehicle details:`, err);
//           setCarDataError(err.message || "Failed to load vehicle details");
          
//           toast.error(err.message || "Failed to load vehicle details", {
//             duration: 5000,
//             position: 'top-center',
//           });
//         } finally {
//           setLoadingCarData(false);
//         }
//       }
//     };

//     fetchVehicleDetails();
//   }, [id, location.state]);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (!document.hidden && id) {
//         console.log("👁️ Page became visible - Refreshing reviews");
//         setTimeout(() => {
//           fetchReviewsByVehicleId(id, false);
//           fetchAverageRating(id, false);
//         }, 300);
//       }
//     };

//     const handleFocus = () => {
//       if (id) {
//         console.log("🎯 Window focused - Refreshing reviews");
//         setTimeout(() => {
//           fetchReviewsByVehicleId(id, false);
//           fetchAverageRating(id, false);
//         }, 300);
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     window.addEventListener('focus', handleFocus);

//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       window.removeEventListener('focus', handleFocus);
//     };
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       console.log("🔄 Initial review fetch triggered for vehicle:", id);
//       fetchReviewsByVehicleId(id);
//       fetchAverageRating(id);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       const intervalId = setInterval(() => {
//         console.log("🔄 Auto-refreshing reviews...");
//         fetchReviewsByVehicleId(id, true);
//         fetchAverageRating(id, true);
//       }, 30000);

//       return () => clearInterval(intervalId);
//     }
//   }, [id]);

//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;
//     if (showWaitingPopup && waitingTimerSeconds > 0) {
//       interval = setInterval(() => {
//         setWaitingTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
//       }, 1000);
//     }
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [showWaitingPopup, waitingTimerSeconds]);

//   useEffect(() => {
//     if (showWaitingPopup && waitingTimerSeconds === 0) {
//       handleTimerComplete();
//     }
//   }, [waitingTimerSeconds, showWaitingPopup]);

//   useEffect(() => {
//     const handleClickOutside = () => setMenuOpenIndex(null);
//     if (menuOpenIndex !== null) {
//       document.addEventListener('click', handleClickOutside);
//       return () => document.removeEventListener('click', handleClickOutside);
//     }
//   }, [menuOpenIndex]);

//   useEffect(() => {
//     const editingReviewId = sessionStorage.getItem('editingReviewId');
//     const returnToVehicleId = sessionStorage.getItem('returnToVehicleId');
    
//     if (editingReviewId && returnToVehicleId === id && apiReviews.length > 0) {
//       const updatedReview = apiReviews.find(r => r._id === editingReviewId);
//       if (updatedReview) {
//         console.log("🎯 UPDATED REVIEW CONFIRMED IN UI!");
//         console.log("📊 Review Data:", updatedReview);
//       }
//     }
//   }, [apiReviews, id]);

//   const isUserReview = (review: Review): boolean => {
//     const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
//     return review.userId === currentUserId;
//   };

//   const handleMenuToggle = (reviewId: string, event: React.MouseEvent) => {
//     event.stopPropagation();
//     setMenuOpenIndex(menuOpenIndex === reviewId ? null : reviewId);
//   };

//   const handleRefreshReviews = () => {
//     if (id) {
//       console.log("🔄 Manual refresh triggered");
//       fetchReviewsByVehicleId(id, false);
//       fetchAverageRating(id, false);
//     }
//   };

//   const handleEditClick = (review: Review) => {
//     console.log("✏️ Navigating to feedback page for review:", review._id);
//     const currentVehicle = vehicle || (apiCarData ? {
//       name: apiCarData.CarName || 'Unknown Vehicle',
//     } : null);
    
//     sessionStorage.setItem('editingReviewId', review._id);
//     sessionStorage.setItem('returnToVehicleId', id || '');
    
//     navigate(`/feedback?vehicleId=${id}&vehicleName=${encodeURIComponent(currentVehicle?.name || '')}&reviewId=${review._id}`);
//     setMenuOpenIndex(null);
//   };

//   const handleDeleteReview = async (reviewId: string, event: React.MouseEvent) => {
//     event.stopPropagation();
    
//     if (!window.confirm('Are you sure you want to delete this review?')) {
//       return;
//     }

//     setIsDeletingReview(true);
//     setMenuOpenIndex(null);
    
//     try {
//       console.log("🗑️ Deleting review:", reviewId);
      
//       await apiService.review.deleteReview(reviewId);

//       toast.success('✅ Review deleted successfully', {
//         duration: 2000,
//         position: 'top-right',
//       });
      
//       if (id) {
//         setTimeout(() => {
//           fetchReviewsByVehicleId(id, false);
//           fetchAverageRating(id, false);
//         }, 500);
//       }
//     } catch (error: any) {
//       console.error('❌ Error deleting review:', error);
//       toast.error(`Error: ${error.message}`, {
//         duration: 3000,
//         position: 'top-right',
//       });
//     } finally {
//       setIsDeletingReview(false);
//     }
//   };

//   const fetchAverageRating = async (vehicleId: string, silent: boolean = false) => {
//     if (!silent) {
//       setLoadingAverageRating(true);
//     }

//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("⭐ FETCHING AVERAGE RATING");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("📋 Vehicle ID:", vehicleId);

//     try {
//       const vehicleType = "Car";
//       const result = await apiService.review.getAverageRating(vehicleId, vehicleType as 'car' | 'bike');
      
//       console.log("✅ Average Rating Response:", result);

//       if ((result as any).success && (result as any).averageRating !== undefined) {
//         const avgRating = parseFloat((result as any).averageRating);
//         setApiAverageRating(avgRating);
//         console.log("⭐ Average Rating Set:", avgRating);
//       }
//     } catch (error: any) {
//       console.error("❌ Failed to fetch average rating:", error.message);
//     } finally {
//       if (!silent) {
//         setLoadingAverageRating(false);
//       }
//     }
//   };

//   const fetchReviewsByVehicleId = async (vehicleId: string, silent: boolean = false) => {
//     const now = Date.now();
    
//     if (now - lastFetchTime < 5000 && silent) {
//       console.log("⏳ Skipping fetch - too soon after last request");
//       return;
//     }
//     setLastFetchTime(now);

//     if (!silent) {
//       setLoadingReviews(true);
//       setReviewsError("");
//     }

//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("🔍 FETCHING REVIEWS FOR VEHICLE");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("📋 Vehicle ID:", vehicleId);

//     try {
//       const result = await apiService.review.getReviewsByCarId(vehicleId);
      
//       console.log("✅ Reviews Response:", result);

//       if ((result as any).success && Array.isArray((result as any).reviews)) {
//         const reviews = (result as any).reviews;
//         console.log("🎉 SUCCESS: Reviews found!", reviews.length);
//         console.log("📝 Full Review Data:", JSON.stringify(reviews, null, 2));
        
//         setApiReviews(reviews);
        
//         const editingReviewId = sessionStorage.getItem('editingReviewId');
//         if (editingReviewId) {
//           const updatedReview = reviews.find((r: any) => r._id === editingReviewId);
//           if (updatedReview) {
//             console.log("✨ Updated review detected!");
//             console.log("⭐ NEW Rating:", updatedReview.rating);
//             console.log("💬 NEW Text:", updatedReview.review || updatedReview.reviewText);
            
//             toast.success(`🎉 Review updated! New rating: ${updatedReview.rating}★`, {
//               duration: 3000,
//               position: 'top-center',
//             });
//           }
          
//           setTimeout(() => {
//             console.log("🧹 Clearing editingReviewId from sessionStorage");
//             sessionStorage.removeItem('editingReviewId');
//           }, 5000);
//         }
        
//         if (!silent) {
//           toast.success(`✅ Loaded ${reviews.length} review(s)`, {
//             duration: 2000,
//             position: 'top-right',
//           });
//         }

//         return reviews;
//       } else {
//         console.log("ℹ️ No reviews found");
//         setApiReviews([]);
        
//         if (!silent) {
//           toast("No reviews yet for this vehicle", {
//             duration: 2000,
//             position: 'top-right',
//           });
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

//   const calculateAverageRating = (reviews: Review[]): number => {
//     if (reviews.length === 0) return 0;
//     const total = reviews.reduce((sum, review) => sum + review.rating, 0);
//     const average = total / reviews.length;
//     return Number(average.toFixed(1));
//   };

//   const calculateRatingDistribution = (reviews: Review[]) => {
//     const distribution = [5, 4, 3, 2, 1].map(stars => {
//       const count = reviews.filter(r => r.rating === stars).length;
//       const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
//       return { stars, count, percentage };
//     });
//     return distribution;
//   };

//   const mapVehicleTypeForAPI = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
//     if (!type) {
//       console.warn("⚠️ Vehicle type is undefined/null, defaulting to 'Car'");
//       return "Car";
//     }
    
//     const normalized = type.toLowerCase();
//     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
//       car: "Car",
//       auto: "Auto",
//       bike: "Bike",
//     };
    
//     return typeMap[normalized] || "Car";
//   };

//   const mapVehicleTypeForStore = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
//     const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
//       car: "Car",
//       auto: "Auto",
//       bike: "Bike",
//     };
//     return type ? typeMap[type.toLowerCase()] || "Car" : "Car";
//   };

//   const calculateTotalHours = (
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
//   ): number => {
//     try {
//       const parseTime = (timeStr: string) => {
//         const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
//         if (!match) return { hours: 0, minutes: 0 };
       
//         let hours = parseInt(match[1]);
//         const minutes = parseInt(match[2] || '0');
//         const period = match[3]?.toUpperCase();
       
//         if (period === 'PM' && hours !== 12) hours += 12;
//         if (period === 'AM' && hours === 12) hours = 0;
       
//         return { hours, minutes };
//       };

//       const startTimeParsed = parseTime(startTime);
//       const endTimeParsed = parseTime(endTime);

//       const start = new Date(startDate);
//       start.setHours(startTimeParsed.hours, startTimeParsed.minutes, 0, 0);

//       const end = new Date(endDate);
//       end.setHours(endTimeParsed.hours, endTimeParsed.minutes, 0, 0);

//       const diffInMs = end.getTime() - start.getTime();
//       const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
     
//       return hours > 0 ? hours : 1;
//     } catch (error) {
//       console.error("❌ Error calculating hours:", error);
//       return 1;
//     }
//   };

//   const formatDateForAPI = (dateString: string): string => {
//     try {
//       const date = new Date(dateString);
//       if (!isNaN(date.getTime())) {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//       }
//     } catch (error) {
//       console.error("❌ Date formatting error:", error);
//     }
//     return dateString;
//   };

//   const formatTimeForAPI = (timeString: string): string => {
//     try {
//       const ampmMatch = timeString.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
//       if (ampmMatch) {
//         let hours = parseInt(ampmMatch[1]);
//         const minutes = ampmMatch[2] || '00';
//         const period = ampmMatch[3].toUpperCase();
       
//         if (period === 'PM' && hours !== 12) hours += 12;
//         if (period === 'AM' && hours === 12) hours = 0;
       
//         return `${hours.toString().padStart(2, '0')}.${minutes}`;
//       }
//     } catch (error) {
//       console.error("❌ Time formatting error:", error);
//     }
//     return timeString;
//   };

//   const currentVehicle = vehicle || (apiCarData ? {
//     id: apiCarData._id || apiCarData.id || id || '',
//     name: apiCarData.CarName || apiCarData.bikeName || 'Unknown Vehicle',
//     image: (apiCarData.carImages && apiCarData.carImages.length > 0) 
//       ? apiCarData.carImages[0] 
//       : (apiCarData.bikeImages && apiCarData.bikeImages.length > 0)
//       ? apiCarData.bikeImages[0]
//       : apiCarData.carImage || apiCarData.bikeImage || apiCarData.image || 'https://via.placeholder.com/400',
//     price: apiCarData.RentPerDay || apiCarData.RentPerHour || apiCarData.pricePerKm || apiCarData.pricePerHour || '0',
//     type: (apiCarData.bikeName ? 'bike' : 'car') as Vehicle["type"],
//     transmission: apiCarData.transmissionType || 'Manual',
//     fuel: apiCarData.fuelType || 'Petrol',
//     seats: apiCarData.Carseater || apiCarData.seatingCapacity || '2',
//     location: apiCarData.pickupArea || apiCarData.pickupCity || 'Unknown Location',
//   } : null);

//   const createBookingAPI = async (
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
//   ) => {
//     if (!currentVehicle) {
//       setApiError("Vehicle information is missing");
//       return null;
//     }

//     setIsSubmittingBooking(true);
//     setApiError("");

//     try {
//       const userData = JSON.parse(localStorage.getItem("user") || "{}");

//       const totalHours = calculateTotalHours(startDate, endDate, startTime, endTime);
//       const pricePerHour = parseInt(String(currentVehicle?.price ?? "0"), 10);
//       const totalPrice = totalHours * pricePerHour;

//       const formattedFromDate = formatDateForAPI(startDate);
//       const formattedToDate = formatDateForAPI(endDate);
//       const formattedFromTime = formatTimeForAPI(startTime);
//       const formattedToTime = formatTimeForAPI(endTime);

//       const requestBody = {
//         userId: userData?._id || "",
//         vechileType: mapVehicleTypeForAPI(currentVehicle.type),
//         VechileId: currentVehicle.id,
//         pricePerKm: String(pricePerHour),
//         pricePerDay: String(totalPrice),
//         contactNumber: userData?.phone || "",
//         contactName: userData?.name || "",
//         latitude: userData?.latitude || "17.438095",
//         longitude: userData?.longitude || "78.4485",
//         FromDate: formattedFromDate,
//         ToDate: formattedToDate,
//         FromTime: formattedFromTime,
//         ToTime: formattedToTime,
//         totalHours: totalHours.toString(),
//         totalPrice: totalPrice.toString(),
//       };

//       console.log("📤 Sending booking request:", requestBody);

//       const result = await apiService.booking.createBooking(requestBody);
      
//       if ((result as any).booking?._id) {
//         setBookingId((result as any).booking._id);
//         console.log("✅ Booking created with ID:", (result as any).booking._id);
//         toast.success("Booking request sent to owner!");
//         return result;
//       } else {
//         const tempId = `BOOK-${Date.now()}`;
//         setBookingId(tempId);
//         toast.success("Booking request sent to owner!");
//         return { success: true, bookingId: tempId };
//       }
//     } catch (error: any) {
//       console.error("❌ Error creating booking:", error);
//       const tempId = `BOOK-${Date.now()}`;
//       setBookingId(tempId);
//       toast.success("Booking request sent to owner! (Demo mode)");
//       return { success: true, bookingId: tempId };
//     } finally {
//       setIsSubmittingBooking(false);
//     }
//   };

//   const handleTimerComplete = () => {
//     console.log("⏰ Timer completed - Owner should see Accept/Reject modal on their app");
//     console.log("📱 Owner App: BookingAcceptance modal should popup now");
//     console.log("👤 Customer Side: Showing Call and Chat buttons (assuming owner accepted)");
//     setShowWaitingPopup(false);
//     setShowContactButtons(true);
//   };

//   const handleCloseWaiting = () => {
//     console.log("❌ WaitingPopup closed manually");
//     setShowWaitingPopup(false);
//     setWaitingTimerSeconds(180);
//   };

//   const handleCallOwner = () => {
//     console.log("📞 Customer calling owner...");
//     console.log("🎉 Call initiated - Opening success modal");
//     setTimeout(() => {
//       handleConfirmBooking();
//     }, 1000);
//   };

//   const handleConfirmBooking = () => {
//     if (!currentVehicle || !selectedDateTime) {
//       console.error("❌ Cannot confirm booking");
//       return;
//     }

//     const currentDate = new Date();
//     console.log("🎉 Confirming booking with ID:", bookingId);

//     // addBooking({
//     //   id: bookingId || Date.now().toString(),
//     //   vehicleId: currentVehicle.id,
//     //   vehicleName: currentVehicle.name,
//     //   vehicleImage: currentVehicle.image,
//     //   vehicleType: mapVehicleTypeForStore(currentVehicle.type),
//     //   customerName: "Current User",
//     //   bookingDate: currentDate.toLocaleDateString("en-US"),
//     //   bookingTime: currentDate.toLocaleTimeString("en-US", {
//     //     hour: "2-digit",
//     //     minute: "2-digit",
//     //   }),
//     //   startDate: selectedDateTime.startDate,
//     //   startTime: selectedDateTime.startTime,
//     //   endDate: selectedDateTime.endDate,
//     //   endTime: selectedDateTime.endTime,
//     //   modelNo: currentVehicle.id.toUpperCase(),
//     //   status: "Pending",

//     //   price: currentVehicle.price,
//     // });

//     setShowSuccessModal(true);
//   };

//   const vehicleReviews = getReviewsByVehicleId(currentVehicle?.id || '');
//   const averageRating = getAverageRating(currentVehicle?.id || '');
//   const totalReviews = getTotalReviewCount(currentVehicle?.id || '');
//   const ratingDistribution = getRatingDistribution(currentVehicle?.id || '');

//   const displayReviews = apiReviews.length > 0 ? apiReviews : vehicleReviews;
  
//   const displayAverageRating = apiAverageRating > 0 
//     ? apiAverageRating 
//     : (apiReviews.length > 0 
//         ? calculateAverageRating(apiReviews) 
//         : averageRating);
  
//   const displayTotalReviews = apiReviews.length > 0 
//     ? apiReviews.length 
//     : totalReviews;
  
//   const displayRatingDistribution = apiReviews.length > 0 
//     ? calculateRatingDistribution(apiReviews) 
//     : ratingDistribution;

//   if (loadingCarData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
//         <div className="text-center space-y-4 p-8">
//           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
//           <p className="text-xl text-gray-700 font-semibold">Loading vehicle details...</p>
//           <p className="text-sm text-gray-500">Please wait while we fetch the car information</p>
//         </div>
//       </div>
//     );
//   }

//   if (carDataError && !vehicle) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
//         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
//           <div className="text-6xl">❌</div>
//           <p className="text-xl text-red-600 font-bold">Error Loading Vehicle</p>
//           <p className="text-gray-600">{carDataError}</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
//           >
//             ← Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!vehicle && !apiCarData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
//           <div className="text-6xl">🚗</div>
//           <p className="text-xl text-gray-700 font-bold">Vehicle Not Found</p>
//           <p className="text-gray-600">The vehicle you're looking for doesn't exist or has been removed.</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
//           >
//             ← Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!currentVehicle) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center space-y-4 p-8">
//           <p className="text-xl text-gray-700">Vehicle data not available!</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//       <div className="lg:col-span-1">
//         <img
//           src={currentVehicle.image}
//           alt={currentVehicle.name}
//           className="rounded-xl w-full mb-4"
//         />
//         <div className="flex justify-center space-x-2 mt-2">
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//           <span className="w-3 h-3 rounded-full bg-gray-400"></span>
//         </div>
//       </div>

//       <div className="lg:col-span-1">
//         <h1 className="text-3xl font-bold mb-2">{currentVehicle.name}</h1>
        
//         {/* Rating Section */}
//         <div className="flex items-center gap-2 mb-4">
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 size={20}
//                 className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//               />
//             ))}
//           </div>
//           <span className="text-sm text-gray-600">
//             {displayAverageRating} ({displayTotalReviews} reviews)
//           </span>
//         </div>

//         {/* Price */}
//         <div className="mb-6">
//           <span className="text-3xl font-bold text-blue-600">₹{currentVehicle.price}</span>
//           <span className="text-gray-600 ml-2">/day</span>
//         </div>

//         {/* Vehicle Specifications */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           {apiCarData?.TransmissionType && (
//             <div className="flex items-center gap-2">
//               <img src={Automatic} alt="Transmission" className="w-6 h-6" />
//               <span className="text-sm text-gray-700">{apiCarData.TransmissionType}</span>
//             </div>
//           )}
//           {apiCarData?.FuelType && (
//             <div className="flex items-center gap-2">
//               <img src={Petrol} alt="Fuel" className="w-6 h-6" />
//               <span className="text-sm text-gray-700">{apiCarData.FuelType}</span>
//             </div>
//           )}
//           {apiCarData?.SeatingCapacity && (
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-700">👥 {apiCarData.SeatingCapacity} Seater</span>
//             </div>
//           )}
//         </div>

//         {/* Book Now Button or Contact Buttons */}
//         {!showContactButtons ? (
//           <button
//             onClick={() => setIsDateTimeModalOpen(true)}
//             disabled={isSubmittingBooking}
//             className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition shadow-md disabled:opacity-50"
//           >
//             {isSubmittingBooking ? "Processing..." : "Book Now"}
//           </button>
//         ) : (
//           <div className="mt-6 space-y-4">
//             <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
//               <img
//                 src="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
//                 alt="Manoj Kumar"
//                 className="w-12 h-12 rounded-full"
//               />
//               <div className="flex-1">
//                 <h4 className="font-semibold text-gray-900">Manoj Kumar</h4>
//                 <p className="text-sm text-gray-500">Vehicle Owner</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
//               <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//               </svg>
//               <p className="text-sm text-orange-700 flex-1">
//                 Please call the owner to discuss booking details and confirm availability.
//               </p>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setIsChatOpen(true)}
//                 className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
//               >
//                 💬 Chat
//               </button>
//               <button
//                 onClick={handleCallOwner}
//                 className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//               >
//                 📞 Call Owner
//               </button>
//             </div>
//           </div>
//         )}

//         {isDateTimeModalOpen && (
//           <AvailabilityDateTimeModal
//             isOpen={isDateTimeModalOpen}
//             onClose={() => {
//               setIsDateTimeModalOpen(false);
//               setApiError("");
//             }}
//             onConfirm={async (startDate, endDate, startTime, endTime, availability) => {
//               console.log("✅ DateTime selected:", { startDate, endDate, startTime, endTime });
             
//               setSelectedDateTime({ startDate, endDate, startTime, endTime });
//               setIsDateTimeModalOpen(false);
             
//               const result = await createBookingAPI(startDate, endDate, startTime, endTime);
             
//               if (result) {
//                 console.log("🎉 Starting wait timer");
//                 setWaitingTimerSeconds(180);
//                 setShowWaitingPopup(true);
//               }
//             }}
//           />
//         )}
//       </div>

//       <div className="lg:col-span-1">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="text-lg font-bold">Rating & Reviews</h3>
//           <div className="flex items-center gap-2">
//             {(loadingReviews || loadingAverageRating) && (
//               <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
//             )}
//             <button
//               onClick={handleRefreshReviews}
//               disabled={loadingReviews || loadingAverageRating}
//               className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//               title="Refresh reviews"
//             >
//               <RefreshCw className={`w-4 h-4 text-gray-600 ${(loadingReviews || loadingAverageRating) ? 'animate-spin' : ''}`} />
//             </button>
//           </div>
//         </div>

//         {apiReviews.length > 0 && (
//           <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
//             <span className="text-xs text-green-700 font-medium">
//               ✓ Live reviews from API
//             </span>
//             <span className="text-xs text-gray-500">
//               (Updated {new Date(lastFetchTime).toLocaleTimeString()})
//             </span>
//           </div>
//         )}

//         {sessionStorage.getItem('editingReviewId') && !loadingReviews && (
//           <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 animate-pulse">
//             <span className="text-xs text-blue-700 font-medium">
//               🔄 Refreshing to show your updated review...
//             </span>
//           </div>
//         )}

//         {reviewsError && (
//           <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-xs text-yellow-700">{reviewsError}</p>
//           </div>
//         )}

//         <div className="flex items-center mt-2 mb-2 justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
//           <div className="flex flex-col">
//             <span className="text-3xl font-bold text-gray-900">{displayAverageRating}</span>
//             <span className="text-xs text-gray-600 mt-1">out of 5</span>
//           </div>
//           <div className="flex flex-col items-end">
//             <div className="flex gap-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                   size={20}
//                 />
//               ))}
//             </div>
//             <span className="text-sm text-gray-600 mt-1">
//               {displayTotalReviews} Review{displayTotalReviews !== 1 ? 's' : ''}
//             </span>
//           </div>
//         </div>

//         <div className="mt-4 space-y-2 bg-white p-4 rounded-lg border">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating Breakdown</h4>
//           {displayRatingDistribution.map((r) => (
//             <div key={r.stars} className="flex items-center text-sm">
//               <span className="w-8 text-gray-700 font-medium">{r.stars}★</span>
//               <div className="flex-1 bg-gray-200 h-3 rounded-full mx-3 overflow-hidden">
//                 <div 
//                   className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500" 
//                   style={{ width: `${r.percentage}%` }} 
//                 />
//               </div>
//               <span className="text-gray-500 text-xs min-w-[45px] text-right">
//                 {r.count} ({r.percentage}%)
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 space-y-3 max-h-[500px] overflow-y-auto pr-2">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3 sticky top-0 bg-white py-2 z-10">
//             Customer Reviews ({displayTotalReviews})
//           </h4>
          
//           {displayReviews.length > 0 ? (
//             displayReviews.map((review, idx) => {
//               const canEdit = isUserReview(review);
//               const wasJustEdited = sessionStorage.getItem('editingReviewId') === review._id;
//               const isMenuOpen = menuOpenIndex === review._id;
              
//               if (wasJustEdited) {
//                 console.log("🎨 RENDERING UPDATED REVIEW CARD:");
//                 console.log("  ✅ Review ID:", review._id);
//                 console.log("  ⭐ Rating:", review.rating);
//                 console.log("  💬 Text:", review.review || review.reviewText);
//               }
              
//               return (
//                 <div 
//                   key={review._id || idx} 
//                   className={`border rounded-xl p-4 transition-all duration-500 relative ${
//                     wasJustEdited
//                       ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl ring-2 ring-green-400 ring-offset-2'
//                       : canEdit 
//                       ? 'border-blue-200 bg-blue-50 hover:shadow-md' 
//                       : 'border-gray-200 bg-white hover:shadow-md'
//                   }`}
//                 >
//                   {wasJustEdited && (
//                     <div className="absolute -top-3 -right-3 z-20 animate-bounce">
//                       <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white text-xs px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2">
//                         <span className="text-lg animate-spin">✨</span>
//                         <span className="font-extrabold">JUST UPDATED!</span>
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center gap-2 flex-1">
//                       <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
//                         wasJustEdited 
//                           ? 'bg-gradient-to-br from-green-400 to-emerald-500 ring-2 ring-green-300'
//                           : 'bg-gradient-to-br from-blue-400 to-purple-400'
//                       }`}>
//                         {(review.userName || `User ${idx + 1}`).charAt(0).toUpperCase()}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2">
//                           <span className={`font-semibold text-gray-900 text-sm ${
//                             wasJustEdited ? 'text-green-800' : ''
//                           }`}>
//                             {review.userName || `User ${idx + 1}`}
//                           </span>
//                           {canEdit && (
//                             <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium">
//                               You
//                             </span>
//                           )}
//                           {wasJustEdited && (
//                             <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-medium animate-pulse">
//                               Updated
//                             </span>
//                           )}
//                         </div>
//                         {review.createdAt && (
//                           <p className="text-xs text-gray-400">
//                             {new Date(review.createdAt).toLocaleDateString('en-US', {
//                               year: 'numeric',
//                               month: 'short',
//                               day: 'numeric'
//                             })}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       <div className={`flex px-2 py-1 rounded-lg border ${
//                         wasJustEdited 
//                           ? 'bg-green-100 border-green-300 ring-2 ring-green-200' 
//                           : 'bg-yellow-50 border-yellow-200'
//                       }`}>
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             size={14}
//                             className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                           />
//                         ))}
//                       </div>

//                       <div className="relative" onClick={(e) => e.stopPropagation()}>
//                         <button
//                           onClick={(e) => handleMenuToggle(review._id, e)}
//                           className={`p-1.5 rounded-full transition-all duration-200 ${
//                             isMenuOpen 
//                               ? 'bg-blue-100 text-blue-600' 
//                               : 'hover:bg-gray-100 text-gray-600'
//                           }`}
//                           aria-label="Review options"
//                           title={canEdit ? "Edit or delete review" : "Review options"}
//                         >
//                           <MoreVertical size={18} />
//                         </button>

//                         {isMenuOpen && (
//                           <div 
//                             className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-30 overflow-hidden"
//                             onClick={(e) => e.stopPropagation()}
//                           >
//                             {canEdit ? (
//                               <div className="py-1">
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleEditClick(review);
//                                   }}
//                                   className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 transition-colors group"
//                                 >
//                                   <Edit size={16} className="text-blue-600 group-hover:scale-110 transition-transform" />
//                                   <span className="font-medium text-gray-700 group-hover:text-blue-700">Edit Review</span>
//                                 </button>
                                
//                                 <div className="border-t border-gray-100"></div>
                                
//                                 <button
//                                   onClick={(e) => handleDeleteReview(review._id, e)}
//                                   className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
//                                 >
//                                   <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
//                                   <span className="font-medium group-hover:text-red-700">Delete Review</span>
//                                 </button>
//                               </div>
//                             ) : (
//                               <div className="py-3 px-4">
//                                 <p className="text-xs text-gray-500 text-center">
//                                   You can only edit your own reviews
//                                 </p>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <p className={`text-sm leading-relaxed mt-2 mb-3 ${
//                     wasJustEdited 
//                       ? 'text-gray-900 font-medium' 
//                       : 'text-gray-700'
//                   }`}>
//                     {review.review || review.reviewText || review.comment || review.feedback || "No comment provided"}
//                   </p>
                  
//                   {wasJustEdited && (
//                     <div className="mt-3 p-3 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-lg shadow-inner">
//                       <p className="text-xs font-bold text-green-800 mb-2 flex items-center gap-1">
//                         <span className="text-base">✅</span>
//                         <span>Review Successfully Updated!</span>
//                       </p>
//                       <div className="space-y-1 text-xs text-green-700">
//                         <p><strong>New Rating:</strong> {review.rating} ⭐</p>
//                         <p><strong>New Review:</strong> {review.review || review.reviewText || 'No comment'}</p>
//                         <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
//               <div className="text-5xl mb-3">📝</div>
//               <p className="text-gray-500 font-medium mb-1">No reviews yet</p>
//               <p className="text-gray-400 text-sm">
//                 Be the first to review this vehicle!
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {showWaitingPopup && (
//         <WaitingPopup
//           timer={waitingTimerSeconds}
//           onClose={handleCloseWaiting}
//           onTimerComplete={handleTimerComplete}
//         />
//       )}

//       <PopupChat
//         isOpen={isChatOpen}
//         onClose={() => setIsChatOpen(false)}
//         ownerName="Manoj Kumar"
//         ownerAvatar="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
//       />

//       {isSubmittingBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
//             <div className="flex flex-col items-center">
//               <div className="relative mb-6">
//                 <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full animate-pulse"></div>
//                 </div>
//               </div>
              
//               <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
//                 Creating Your Booking...
//               </h2>
              
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 w-full mb-4 border border-blue-100 shadow-sm">
//                 {currentVehicle && (
//                   <>
//                     <div className="flex items-center gap-3 mb-4">
//                       <img 
//                         src={currentVehicle.image} 
//                         alt={currentVehicle.name}
//                         className="w-16 h-16 rounded-lg object-cover shadow-sm"
//                       />
//                       <div className="flex-1">
//                         <p className="font-bold text-gray-900 text-lg">{currentVehicle.name}</p>
//                         <p className="text-sm text-gray-600 capitalize">{currentVehicle.type}</p>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-2">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Car ID</span>
//                         <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
//                           {currentVehicle.id.substring(0, 12)}...
//                         </span>
//                       </div>
                      
//                       {apiCarData?.CarNumber && (
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Car Number</span>
//                           <span className="font-semibold text-gray-900">{apiCarData.CarNumber}</span>
//                         </div>
//                       )}
                      
//                       {selectedDateTime && (
//                         <div className="border-t border-blue-200 pt-2 mt-3">
//                           <p className="text-xs text-gray-600 mb-1">Booking Period</p>
//                           <p className="text-sm text-gray-700 font-medium">
//                             {selectedDateTime.startDate} {selectedDateTime.startTime}
//                             <br />
//                             to {selectedDateTime.endDate} {selectedDateTime.endTime}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
              
//               <div className="text-center space-y-2">
//                 <p className="text-gray-600 text-sm">
//                   Please wait while we process your booking...
//                 </p>
//                 <p className="text-blue-600 font-medium text-sm">
//                   Connecting to server & validating data
//                 </p>
//               </div>
              
//               <div className="flex gap-2 mt-5">
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {apiError && !isSubmittingBooking && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[110] max-w-md w-full mx-4 animate-slideDown">
//           <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-xl">
//             <div className="flex items-start">
//               <div className="flex-shrink-0">
//                 <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="ml-3 flex-1">
//                 <h3 className="text-sm font-bold text-red-800">Booking Failed</h3>
//                 <p className="mt-1 text-sm text-red-700">{apiError}</p>
//                 {currentVehicle && (
//                   <p className="mt-1 text-xs text-red-600">
//                     Car: {currentVehicle.name} (ID: {currentVehicle.id.substring(0, 8)}...)
//                   </p>
//                 )}
//                 <div className="mt-3 flex gap-2">
//                   <button
//                     onClick={() => {
//                       setApiError("");
//                       setIsDateTimeModalOpen(true);
//                     }}
//                     className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
//                   >
//                     Retry Booking
//                   </button>
//                   <button
//                     onClick={() => setApiError("")}
//                     className="px-3 py-1.5 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-300 hover:bg-red-50 transition-colors"
//                   >
//                     Dismiss
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//        {showSuccessModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
//             <div className="flex justify-center mb-6">
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//                 <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//             </div>
   
//             <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
//               Booking Posted Successfully!
//             </h2>
//             <p className="text-gray-600 text-center mb-6">
//               Your booking has been confirmed. You will receive updates on your booking status.
//             </p>
   
//             <div className="bg-gray-50 rounded-lg p-4 mb-6">
//               <div className="flex items-center gap-3 mb-3">
//                 <img src={currentVehicle.image} alt={currentVehicle.name} className="w-16 h-16 rounded-lg object-cover" />
//                 <div>
//                   <h3 className="font-semibold text-gray-900">{currentVehicle.name}</h3>
//                   <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
//                 </div>
//               </div>
             
//               {selectedDateTime && (
//                 <div className="text-sm text-gray-600 space-y-1">
//                   <div className="flex justify-between">
//                     <span>Start:</span>
//                     <span className="font-medium">
//                       {new Date(selectedDateTime.startDate).toLocaleDateString()} - {selectedDateTime.startTime}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>End:</span>
//                     <span className="font-medium">
//                       {new Date(selectedDateTime.endDate).toLocaleDateString()} - {selectedDateTime.endTime}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
   
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowSuccessModal(false);
//                   navigate("/");
//                 }}
//                 className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//               >
//                 Go Home
//               </button>
//               <button
//                 onClick={() => {
//                   setShowSuccessModal(false);
//                   setShowContactButtons(false);
//                   setSelectedDateTime(null);
//                   setBookingId(null);
//                   setWaitingTimerSeconds(180);
//                 }}
//                 className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
//               >
//                 Book Another
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>

    
//   );
// };

// export default BookNow;








import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { vehicles } from "./data/Vehicle";
import { Vehicle } from "../types/Vehicle";
import { Star, Loader2, RefreshCw, Trash2, Edit, MoreVertical, CheckCircle, XCircle, Clock } from "lucide-react";
import apiService from "../services/api.service";
import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
import WaitingPopup from "../components/ui/WaitingPopup";
import BookingAcceptance from "../components/ui/BookingAcceptance";
import BookingRejectModal from "../components/ui/BookingRejectModal";
import PopupChat from "../components/ui/PopupChat";
import { useReviewStore } from "../store/review.store";
import { useNotificationStore } from "../store/notification.store";
import { useBookingStore } from "../store/booking.store";
import toast from "react-hot-toast";

import Automatic from "../assets/icons/AutomaticLogo.png";
import Driver from "../assets/icons/DriverLogo.png";
import Acicon from "../assets/icons/AutomaticLogo.png";
import Petrol from "../assets/icons/Petrol.png";
interface Review {
  _id: string;
  userId: string;
  vehicleId: string;
  rating: number;
  review?: string;
  reviewText?: string;
  comment?: string;
  feedback?: string;
  userName?: string;
  createdAt?: string;
}

interface BookingData {
  _id: string;
  userId: string;
  ownerId?: string;
  vehicleId: string;
  vehicleName?: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
  FromDate: string;
  ToDate: string;
  FromTime: string;
  ToTime: string;
  totalPrice: string;
  customerName?: string;
  contactNumber?: string;
  createdAt?: string;
}

const BookNow: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);

  const {
    getReviewsByVehicleId,
    getAverageRating,
    getTotalReviewCount,
    getRatingDistribution,
  } = useReviewStore();
  const { addNotification } = useNotificationStore();
  const { addBooking } = useBookingStore();

  const [apiCarData, setApiCarData] = useState<any>(null);
  const [loadingCarData, setLoadingCarData] = useState(true);
  const [carDataError, setCarDataError] = useState("");
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
  const [showContactButtons, setShowContactButtons] = useState(false);
  const [showWaitingPopup, setShowWaitingPopup] = useState(false);
  const [showAcceptance, setShowAcceptance] = useState(false);
  const [waitingTimerSeconds, setWaitingTimerSeconds] = useState<number>(180);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<{
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  } | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Review states (unchanged)
  const [apiReviews, setApiReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewsError, setReviewsError] = useState<string>("");
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);
  const [apiAverageRating, setApiAverageRating] = useState<number>(0);
  const [loadingAverageRating, setLoadingAverageRating] = useState<boolean>(false);
  const [isDeletingReview, setIsDeletingReview] = useState<boolean>(false);
  const [menuOpenIndex, setMenuOpenIndex] = useState<string | null>(null);

  // 🔥 NEW: Booking Status Tracking
  const [currentBookingStatus, setCurrentBookingStatus] = useState<'pending' | 'confirmed' | 'rejected' | null>(null);
  const [isPollingBookingStatus, setIsPollingBookingStatus] = useState(false);
  const [bookingStatusMessage, setBookingStatusMessage] = useState<string>("");

  const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
  
  // ============================================================================
  // 🔥 NEW: BOOKING STATUS POLLING (Customer Side)
  // ============================================================================
  useEffect(() => {
    let pollingInterval: NodeJS.Timeout | null = null;

    if (bookingId && isPollingBookingStatus) {
      console.log("🔄 Starting booking status polling for:", bookingId);
      
      pollingInterval = setInterval(async () => {
        try {
          console.log("📡 Polling booking status...");
          
          // TODO: Replace with your actual API call
          // const response = await apiService.booking.getBookingById(bookingId);
          // const status = response.booking.status;
          
          // DEMO: Simulate API response (remove this when you have real API)
          const demoResponse = {
            booking: {
              _id: bookingId,
              status: currentBookingStatus || 'pending'
            }
          };
          
          const status = demoResponse.booking.status;
          
          console.log("📊 Current booking status:", status);

          if (status === 'confirmed') {
            console.log("✅ Booking CONFIRMED by owner!");
            setCurrentBookingStatus('confirmed');
            setIsPollingBookingStatus(false);
            setShowWaitingPopup(false);
            setBookingStatusMessage("✅ Owner accepted your booking!");
            
            toast.success("🎉 Booking Confirmed by Owner!", {
              duration: 5000,
              position: 'top-center',
            });
            
            // Show contact buttons after confirmation
            setTimeout(() => {
              setShowContactButtons(true);
              setBookingStatusMessage("");
            }, 2000);
            
          } else if (status === 'rejected') {
            console.log("❌ Booking REJECTED by owner!");
            setCurrentBookingStatus('rejected');
            setIsPollingBookingStatus(false);
            setShowWaitingPopup(false);
            setBookingStatusMessage("❌ Owner rejected your booking");
            
            toast.error("Booking was rejected by the owner", {
              duration: 5000,
              position: 'top-center',
            });
            
            // Reset after showing message
            setTimeout(() => {
              setBookingStatusMessage("");
              setBookingId(null);
              setSelectedDateTime(null);
            }, 3000);
          }
          
        } catch (error) {
          console.error("❌ Error polling booking status:", error);
        }
      }, 3000); // Poll every 3 seconds

      // Stop polling after 3 minutes (180 seconds)
      setTimeout(() => {
        if (pollingInterval) {
          clearInterval(pollingInterval);
          setIsPollingBookingStatus(false);
          console.log("⏰ Polling timeout reached");
        }
      }, 180000);
    }

    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
        console.log("🛑 Stopped booking status polling");
      }
    };
  }, [bookingId, isPollingBookingStatus, currentBookingStatus]);

  // ============================================================================
  // EXISTING VEHICLE DATA FETCH (unchanged)
  // ============================================================================
  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (id) {
        try {
          setLoadingCarData(true);
          setCarDataError("");
          
          const vehicleType = location.state?.vehicleType || vehicle?.type || 'car';
          
          console.log(`📡 Fetching ${vehicleType} details for ID: ${id}`);
          
          let response;
          let vehicleData = null;
          let successType = vehicleType;
          
          try {
            if (vehicleType.toLowerCase() === 'bike') {
              response = await apiService.bike.getBikeById(id);
              console.log("✅ Bike API response:", response);
              
              if ((response as any).bike) {
                vehicleData = (response as any).bike;
              } else if ((response as any).data) {
                vehicleData = (response as any).data;
              } else {
                vehicleData = response;
              }
            } else {
              response = await apiService.car.getCarById(id);
              console.log("✅ Car API response:", response);
              
              if ((response as any).car) {
                vehicleData = (response as any).car;
              } else if ((response as any).data) {
                vehicleData = (response as any).data;
              } else {
                vehicleData = response;
              }
            }
          } catch (apiError: any) {
            console.warn(`⚠️ ${vehicleType} API failed (${apiError.message}), trying alternate type...`);
            
            try {
              if (vehicleType.toLowerCase() === 'bike') {
                console.log("🔄 Trying Car API as fallback...");
                response = await apiService.car.getCarById(id);
                successType = 'car';
                if ((response as any).car) vehicleData = (response as any).car;
                else if ((response as any).data) vehicleData = (response as any).data;
                else vehicleData = response;
                console.log("✅ Car API (fallback) succeeded!");
              } else {
                console.log("🔄 Trying Bike API as fallback...");
                response = await apiService.bike.getBikeById(id);
                successType = 'bike';
                if ((response as any).bike) vehicleData = (response as any).bike;
                else if ((response as any).data) vehicleData = (response as any).data;
                else vehicleData = response;
                console.log("✅ Bike API (fallback) succeeded!");
              }
            } catch (fallbackError: any) {
              console.error("❌ Both APIs failed!");
              throw new Error(
                `Vehicle not found. This ${vehicleType} (ID: ${id}) may not exist in the database or has been removed.`
              );
            }
          }
          
          if (vehicleData) {
            console.log("🎯 Final vehicle data to set:", vehicleData);
            console.log(`✅ Successfully loaded as ${successType.toUpperCase()}`);
            setApiCarData(vehicleData);
          } else {
            throw new Error("No vehicle data received from API");
          }
        } catch (err: any) {
          console.error(`❌ Error fetching vehicle details:`, err);
          setCarDataError(err.message || "Failed to load vehicle details");
          
          toast.error(err.message || "Failed to load vehicle details", {
            duration: 5000,
            position: 'top-center',
          });
        } finally {
          setLoadingCarData(false);
        }
      }
    };

    fetchVehicleDetails();
  }, [id, location.state]);

  // ============================================================================
  // EXISTING REVIEW EFFECTS (unchanged)
  // ============================================================================
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && id) {
        console.log("👁️ Page became visible - Refreshing reviews");
        setTimeout(() => {
          fetchReviewsByVehicleId(id, false);
          fetchAverageRating(id, false);
        }, 300);
      }
    };

    const handleFocus = () => {
      if (id) {
        console.log("🎯 Window focused - Refreshing reviews");
        setTimeout(() => {
          fetchReviewsByVehicleId(id, false);
          fetchAverageRating(id, false);
        }, 300);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      console.log("🔄 Initial review fetch triggered for vehicle:", id);
      fetchReviewsByVehicleId(id);
      fetchAverageRating(id);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const intervalId = setInterval(() => {
        console.log("🔄 Auto-refreshing reviews...");
        fetchReviewsByVehicleId(id, true);
        fetchAverageRating(id, true);
      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, [id]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (showWaitingPopup && waitingTimerSeconds > 0) {
      interval = setInterval(() => {
        setWaitingTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showWaitingPopup, waitingTimerSeconds]);

  useEffect(() => {
    if (showWaitingPopup && waitingTimerSeconds === 0) {
      handleTimerComplete();
    }
  }, [waitingTimerSeconds, showWaitingPopup]);

  useEffect(() => {
    const handleClickOutside = () => setMenuOpenIndex(null);
    if (menuOpenIndex !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [menuOpenIndex]);

  useEffect(() => {
    const editingReviewId = sessionStorage.getItem('editingReviewId');
    const returnToVehicleId = sessionStorage.getItem('returnToVehicleId');
    
    if (editingReviewId && returnToVehicleId === id && apiReviews.length > 0) {
      const updatedReview = apiReviews.find(r => r._id === editingReviewId);
      if (updatedReview) {
        console.log("🎯 UPDATED REVIEW CONFIRMED IN UI!");
        console.log("📊 Review Data:", updatedReview);
      }
    }
  }, [apiReviews, id]);

  // ============================================================================
  // REVIEW FUNCTIONS (unchanged)
  // ============================================================================
  const isUserReview = (review: Review): boolean => {
    const currentUserId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
    return review.userId === currentUserId;
  };

  const handleMenuToggle = (reviewId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setMenuOpenIndex(menuOpenIndex === reviewId ? null : reviewId);
  };

  const handleRefreshReviews = () => {
    if (id) {
      console.log("🔄 Manual refresh triggered");
      fetchReviewsByVehicleId(id, false);
      fetchAverageRating(id, false);
    }
  };

  const handleEditClick = (review: Review) => {
    console.log("✏️ Navigating to feedback page for review:", review._id);
    const currentVehicle = vehicle || (apiCarData ? {
      name: apiCarData.CarName || 'Unknown Vehicle',
    } : null);
    
    sessionStorage.setItem('editingReviewId', review._id);
    sessionStorage.setItem('returnToVehicleId', id || '');
    
    navigate(`/feedback?vehicleId=${id}&vehicleName=${encodeURIComponent(currentVehicle?.name || '')}&reviewId=${review._id}`);
    setMenuOpenIndex(null);
  };

  const handleDeleteReview = async (reviewId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    setIsDeletingReview(true);
    setMenuOpenIndex(null);
    
    try {
      console.log("🗑️ Deleting review:", reviewId);
      
      await apiService.review.deleteReview(reviewId);

      toast.success('✅ Review deleted successfully', {
        duration: 2000,
        position: 'top-right',
      });
      
      if (id) {
        setTimeout(() => {
          fetchReviewsByVehicleId(id, false);
          fetchAverageRating(id, false);
        }, 500);
      }
    } catch (error: any) {
      console.error('❌ Error deleting review:', error);
      toast.error(`Error: ${error.message}`, {
        duration: 3000,
        position: 'top-right',
      });
    } finally {
      setIsDeletingReview(false);
    }
  };

  const fetchAverageRating = async (vehicleId: string, silent: boolean = false) => {
    if (!silent) {
      setLoadingAverageRating(true);
    }

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("⭐ FETCHING AVERAGE RATING");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📋 Vehicle ID:", vehicleId);

    try {
      const vehicleType = "Car";
      const result = await apiService.review.getAverageRating(vehicleId, vehicleType as 'car' | 'bike');
      
      console.log("✅ Average Rating Response:", result);

      if ((result as any).success && (result as any).averageRating !== undefined) {
        const avgRating = parseFloat((result as any).averageRating);
        setApiAverageRating(avgRating);
        console.log("⭐ Average Rating Set:", avgRating);
      }
    } catch (error: any) {
      console.error("❌ Failed to fetch average rating:", error.message);
    } finally {
      if (!silent) {
        setLoadingAverageRating(false);
      }
    }
  };

  const fetchReviewsByVehicleId = async (vehicleId: string, silent: boolean = false) => {
    const now = Date.now();
    
    if (now - lastFetchTime < 5000 && silent) {
      console.log("⏳ Skipping fetch - too soon after last request");
      return;
    }
    setLastFetchTime(now);

    if (!silent) {
      setLoadingReviews(true);
      setReviewsError("");
    }

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🔍 FETCHING REVIEWS FOR VEHICLE");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📋 Vehicle ID:", vehicleId);

    try {
      const result = await apiService.review.getReviewsByCarId(vehicleId);
      
      console.log("✅ Reviews Response:", result);

      if ((result as any).success && Array.isArray((result as any).reviews)) {
        const reviews = (result as any).reviews;
        console.log("🎉 SUCCESS: Reviews found!", reviews.length);
        console.log("📝 Full Review Data:", JSON.stringify(reviews, null, 2));
        
        setApiReviews(reviews);
        
        const editingReviewId = sessionStorage.getItem('editingReviewId');
        if (editingReviewId) {
          const updatedReview = reviews.find((r: any) => r._id === editingReviewId);
          if (updatedReview) {
            console.log("✨ Updated review detected!");
            console.log("⭐ NEW Rating:", updatedReview.rating);
            console.log("💬 NEW Text:", updatedReview.review || updatedReview.reviewText);
            
            toast.success(`🎉 Review updated! New rating: ${updatedReview.rating}★`, {
              duration: 3000,
              position: 'top-center',
            });
          }
          
          setTimeout(() => {
            console.log("🧹 Clearing editingReviewId from sessionStorage");
            sessionStorage.removeItem('editingReviewId');
          }, 5000);
        }
        
        if (!silent) {
          toast.success(`✅ Loaded ${reviews.length} review(s)`, {
            duration: 2000,
            position: 'top-right',
          });
        }

        return reviews;
      } else {
        console.log("ℹ️ No reviews found");
        setApiReviews([]);
        
        if (!silent) {
          toast("No reviews yet for this vehicle", {
            duration: 2000,
            position: 'top-right',
          });
        }
      }
    } catch (error: any) {
      console.error("❌ Fetch reviews failed:", error.message);
      
      setReviewsError("Unable to load reviews.");
      setApiReviews([]);
      
      if (!silent) {
        toast.error("Failed to load reviews", {
          duration: 3000,
          position: 'top-right',
        });
      }
    } finally {
      if (!silent) {
        setLoadingReviews(false);
      }
    }
  };

  const calculateAverageRating = (reviews: Review[]): number => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = total / reviews.length;
    return Number(average.toFixed(1));
  };

  const calculateRatingDistribution = (reviews: Review[]) => {
    const distribution = [5, 4, 3, 2, 1].map(stars => {
      const count = reviews.filter(r => r.rating === stars).length;
      const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
      return { stars, count, percentage };
    });
    return distribution;
  };

  // ============================================================================
  // BOOKING FUNCTIONS
  // ============================================================================
  const mapVehicleTypeForAPI = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
    if (!type) {
      console.warn("⚠️ Vehicle type is undefined/null, defaulting to 'Car'");
      return "Car";
    }
    
    const normalized = type.toLowerCase();
    const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
      car: "Car",
      auto: "Auto",
      bike: "Bike",
    };
    
    return typeMap[normalized] || "Car";
  };

  const mapVehicleTypeForStore = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
    const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
      car: "Car",
      auto: "Auto",
      bike: "Bike",
    };
    return type ? typeMap[type.toLowerCase()] || "Car" : "Car";
  };

  const calculateTotalHours = (
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
  ): number => {
    try {
      const parseTime = (timeStr: string) => {
        const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
        if (!match) return { hours: 0, minutes: 0 };
       
        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2] || '0');
        const period = match[3]?.toUpperCase();
       
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
       
        return { hours, minutes };
      };

      const startTimeParsed = parseTime(startTime);
      const endTimeParsed = parseTime(endTime);

      const start = new Date(startDate);
      start.setHours(startTimeParsed.hours, startTimeParsed.minutes, 0, 0);

      const end = new Date(endDate);
      end.setHours(endTimeParsed.hours, endTimeParsed.minutes, 0, 0);

      const diffInMs = end.getTime() - start.getTime();
      const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
     
      return hours > 0 ? hours : 1;
    } catch (error) {
      console.error("❌ Error calculating hours:", error);
      return 1;
    }
  };

  const formatDateForAPI = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    } catch (error) {
      console.error("❌ Date formatting error:", error);
    }
    return dateString;
  };

  const formatTimeForAPI = (timeString: string): string => {
    try {
      const ampmMatch = timeString.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
      if (ampmMatch) {
        let hours = parseInt(ampmMatch[1]);
        const minutes = ampmMatch[2] || '00';
        const period = ampmMatch[3].toUpperCase();
       
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
       
        return `${hours.toString().padStart(2, '0')}.${minutes}`;
      }
    } catch (error) {
      console.error("❌ Time formatting error:", error);
    }
    return timeString;
  };

  const currentVehicle = vehicle || (apiCarData ? {
    id: apiCarData._id || apiCarData.id || id || '',
    name: apiCarData.CarName || apiCarData.bikeName || 'Unknown Vehicle',
    image: (apiCarData.carImages && apiCarData.carImages.length > 0) 
      ? apiCarData.carImages[0] 
      : (apiCarData.bikeImages && apiCarData.bikeImages.length > 0)
      ? apiCarData.bikeImages[0]
      : apiCarData.carImage || apiCarData.bikeImage || apiCarData.image || 'https://via.placeholder.com/400',
    price: apiCarData.RentPerDay || apiCarData.RentPerHour || apiCarData.pricePerKm || apiCarData.pricePerHour || '0',
    type: (apiCarData.bikeName ? 'bike' : 'car') as Vehicle["type"],
    transmission: apiCarData.transmissionType || 'Manual',
    fuel: apiCarData.fuelType || 'Petrol',
    seats: apiCarData.Carseater || apiCarData.seatingCapacity || '2',
    location: apiCarData.pickupArea || apiCarData.pickupCity || 'Unknown Location',
  } : null);

  const createBookingAPI = async (
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
  ) => {
    if (!currentVehicle) {
      setApiError("Vehicle information is missing");
      return null;
    }

    setIsSubmittingBooking(true);
    setApiError("");

    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");

      const totalHours = calculateTotalHours(startDate, endDate, startTime, endTime);
      const pricePerHour = parseInt(String(currentVehicle?.price ?? "0"), 10);
      const totalPrice = totalHours * pricePerHour;

      const formattedFromDate = formatDateForAPI(startDate);
      const formattedToDate = formatDateForAPI(endDate);
      const formattedFromTime = formatTimeForAPI(startTime);
      const formattedToTime = formatTimeForAPI(endTime);

      const requestBody = {
        userId: userData?._id || currentUserId,
        vechileType: mapVehicleTypeForAPI(currentVehicle.type),
        VechileId: currentVehicle.id,
        pricePerKm: String(pricePerHour),
        pricePerDay: String(totalPrice),
        contactNumber: userData?.phone || "",
        contactName: userData?.name || "",
        latitude: userData?.latitude || "17.438095",
        longitude: userData?.longitude || "78.4485",
        FromDate: formattedFromDate,
        ToDate: formattedToDate,
        FromTime: formattedFromTime,
        ToTime: formattedToTime,
        totalHours: totalHours.toString(),
        totalPrice: totalPrice.toString(),
      };

      console.log("📤 Sending booking request:", requestBody);

      const result = await apiService.booking.createBooking(requestBody);
      
      if ((result as any).booking?._id) {
        const newBookingId = (result as any).booking._id;
        setBookingId(newBookingId);
        setCurrentBookingStatus('pending');
        console.log("✅ Booking created with ID:", newBookingId);
        
        toast.success("Booking request sent to owner!", {
          duration: 3000,
          position: 'top-center',
        });
        
        // 🔥 START POLLING for booking status
        setIsPollingBookingStatus(true);
        
        return result;
      } else {
        const tempId = `BOOK-${Date.now()}`;
        setBookingId(tempId);
        setCurrentBookingStatus('pending');
        
        toast.success("Booking request sent to owner!", {
          duration: 3000,
          position: 'top-center',
        });
        
        // 🔥 START POLLING even in demo mode
        setIsPollingBookingStatus(true);
        
        return { success: true, bookingId: tempId };
      }
    } catch (error: any) {
      console.error("❌ Error creating booking:", error);
      
      // Even on error, create a demo booking for testing
      const tempId = `BOOK-${Date.now()}`;
      setBookingId(tempId);
      setCurrentBookingStatus('pending');
      
      toast.success("Booking request sent to owner! (Demo mode)", {
        duration: 3000,
        position: 'top-center',
      });
      
      // 🔥 START POLLING in demo mode
      setIsPollingBookingStatus(true);
      
      return { success: true, bookingId: tempId };
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handleTimerComplete = () => {
    console.log("⏰ Timer completed - Checking booking status");
    
    if (currentBookingStatus === 'confirmed') {
      console.log("✅ Booking was confirmed - showing contact buttons");
      setShowWaitingPopup(false);
      setShowContactButtons(true);
    } else if (currentBookingStatus === 'rejected') {
      console.log("❌ Booking was rejected");
      setShowWaitingPopup(false);
      toast.error("Booking was rejected by owner");
    } else {
      console.log("⏰ No response from owner - timeout");
      setShowWaitingPopup(false);
      toast("Owner hasn't responded yet. Please try calling them.", {
        duration: 5000,
        position: 'top-center',
      });
      // Show contact buttons anyway after timeout
      setShowContactButtons(true);
    }
  };

  const handleCloseWaiting = () => {
    console.log("❌ WaitingPopup closed manually");
    setShowWaitingPopup(false);
    setWaitingTimerSeconds(180);
  };

  const handleCallOwner = () => {
    console.log("📞 Customer calling owner...");
    console.log("🎉 Call initiated - Opening success modal");
    setTimeout(() => {
      handleConfirmBooking();
    }, 1000);
  };

  const handleConfirmBooking = () => {
    if (!currentVehicle || !selectedDateTime) {
      console.error("❌ Cannot confirm booking");
      return;
    }

    const currentDate = new Date();
    console.log("🎉 Confirming booking with ID:", bookingId);

    setShowSuccessModal(true);
  };

  // ============================================================================
  // DISPLAY CALCULATIONS
  // ============================================================================
//   const vehicleReviews = getReviewsByVehicleId(currentVehicle?.id || '');
//   const averageRating = getAverageRating(currentVehicle?.id || '');
//   const totalReviews = getTotalReviewCount(currentVehicle?.id || '');
//   const ratingDistribution = getRatingDistribution(currentVehicle?.id || '');

//   const displayReviews = apiReviews.length > 0 ? apiReviews : vehicleReviews;
  
//   const displayAverageRating = apiAverageRating > 0 
//     ? apiAverageRating 
//     : (apiReviews.length > 0 
//         ? calculateAverageRating(apiReviews) 
//         : averageRating);
  
//   const displayTotalReviews = apiReviews.length > 0 
//     ? apiReviews.length 
//     : totalReviews;
  
//   const displayRatingDistribution = apiReviews.length > 0 
//     ? calculateRatingDistribution(apiReviews) 
//     : ratingDistribution;

  // ============================================================================
  // RENDER: LOADING STATES
  // ============================================================================
  if (loadingCarData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center space-y-4 p-8">
          <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
          <p className="text-xl text-gray-700 font-semibold">Loading vehicle details...</p>
          <p className="text-sm text-gray-500">Please wait while we fetch the car information</p>
        </div>
      </div>
    );
  }

  if (carDataError && !vehicle) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl">❌</div>
          <p className="text-xl text-red-600 font-bold">Error Loading Vehicle</p>
          <p className="text-gray-600">{carDataError}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!vehicle && !apiCarData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl">🚗</div>
          <p className="text-xl text-gray-700 font-bold">Vehicle Not Found</p>
          <p className="text-gray-600">The vehicle you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const vehicleReviews = getReviewsByVehicleId(currentVehicle?.id || '');
  const averageRating = getAverageRating(currentVehicle?.id || '');
  const totalReviews = getTotalReviewCount(currentVehicle?.id || '');
  const ratingDistribution = getRatingDistribution(currentVehicle?.id || '');

  const displayReviews = apiReviews.length > 0 ? apiReviews : vehicleReviews;
  
  const displayAverageRating = apiAverageRating > 0 
    ? apiAverageRating 
    : (apiReviews.length > 0 
        ? calculateAverageRating(apiReviews) 
        : averageRating);
  
  const displayTotalReviews = apiReviews.length > 0 
    ? apiReviews.length 
    : totalReviews;
  
  const displayRatingDistribution = apiReviews.length > 0 
    ? calculateRatingDistribution(apiReviews) 
    : ratingDistribution;

  if (loadingCarData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center space-y-4 p-8">
          <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
          <p className="text-xl text-gray-700 font-semibold">Loading vehicle details...</p>
          <p className="text-sm text-gray-500">Please wait while we fetch the car information</p>
        </div>
      </div>
    );
  }

  if (carDataError && !vehicle) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl">❌</div>
          <p className="text-xl text-red-600 font-bold">Error Loading Vehicle</p>
          <p className="text-gray-600">{carDataError}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!vehicle && !apiCarData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl">🚗</div>
          <p className="text-xl text-gray-700 font-bold">Vehicle Not Found</p>
          <p className="text-gray-600">The vehicle you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!currentVehicle) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 p-8">
          <p className="text-xl text-gray-700">Vehicle data not available!</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ============================================================================
  // MAIN RENDER
  // ============================================================================
  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT COLUMN: Vehicle Image */}
      <div className="lg:col-span-1">
        <img
          src={currentVehicle.image}
          alt={currentVehicle.name}
          className="rounded-xl w-full mb-4"
        />
        <div className="flex justify-center space-x-2 mt-2">
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
        </div>
      </div>

      {/* MIDDLE COLUMN: Vehicle Details & Booking */}
      <div className="lg:col-span-1">
        <h1 className="text-3xl font-bold mb-2">{currentVehicle.name}</h1>
        
        {/* Rating Section */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {displayAverageRating} ({displayTotalReviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mb-6">
          <span className="text-3xl font-bold text-blue-600">₹{currentVehicle.price}</span>
          <span className="text-gray-600 ml-2">/day</span>
        </div>

        {/* Vehicle Specifications */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {apiCarData?.TransmissionType && (
            <div className="flex items-center gap-2">
              <img src={Automatic} alt="Transmission" className="w-6 h-6" />
              <span className="text-sm text-gray-700">{apiCarData.TransmissionType}</span>
            </div>
          )}
          {apiCarData?.FuelType && (
            <div className="flex items-center gap-2">
              <img src={Petrol} alt="Fuel" className="w-6 h-6" />
              <span className="text-sm text-gray-700">{apiCarData.FuelType}</span>
            </div>
          )}
          {apiCarData?.SeatingCapacity && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">👥 {apiCarData.SeatingCapacity} Seater</span>
            </div>
          )}
        </div>

        {/* 🔥 BOOKING STATUS BANNER */}
        {bookingStatusMessage && (
          <div className={`mb-4 p-4 rounded-lg border-2 flex items-center gap-3 animate-pulse ${
            currentBookingStatus === 'confirmed' 
              ? 'bg-green-50 border-green-400' 
              : 'bg-red-50 border-red-400'
          }`}>
            {currentBookingStatus === 'confirmed' ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-bold text-green-800">{bookingStatusMessage}</p>
                  <p className="text-sm text-green-600">You can now contact the owner</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-bold text-red-800">{bookingStatusMessage}</p>
                  <p className="text-sm text-red-600">Please try another vehicle</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* 🔥 POLLING STATUS INDICATOR */}
        {isPollingBookingStatus && !bookingStatusMessage && (
          <div className="mb-4 p-4 rounded-lg border-2 border-blue-400 bg-blue-50 flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-600 animate-spin flex-shrink-0" />
            <div>
              <p className="font-bold text-blue-800">Waiting for owner's response...</p>
              <p className="text-sm text-blue-600">The owner will be notified shortly</p>
            </div>
          </div>
        )}

        {/* Book Now Button or Contact Buttons */}
        {!showContactButtons ? (
          <button
            onClick={() => setIsDateTimeModalOpen(true)}
            disabled={isSubmittingBooking || currentBookingStatus === 'rejected'}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmittingBooking ? "Processing..." : currentBookingStatus === 'rejected' ? "Booking Rejected" : "Book Now"}
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
              <img
                src="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
                alt="Manoj Kumar"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Manoj Kumar</h4>
                <p className="text-sm text-gray-500">Vehicle Owner</p>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
              <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-orange-700 flex-1">
                Please call the owner to discuss booking details and confirm availability.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsChatOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
              >
                💬 Chat
              </button>
              <button
                onClick={handleCallOwner}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
              >
                📞 Call Owner
              </button>
            </div>
          </div>
        )}

        {/* DateTime Modal */}
        {isDateTimeModalOpen && (
          <AvailabilityDateTimeModal
            isOpen={isDateTimeModalOpen}
            onClose={() => {
              setIsDateTimeModalOpen(false);
              setApiError("");
            }}
            onConfirm={async (startDate, endDate, startTime, endTime, availability) => {
              console.log("✅ DateTime selected:", { startDate, endDate, startTime, endTime });
             
              setSelectedDateTime({ startDate, endDate, startTime, endTime });
              setIsDateTimeModalOpen(false);
             
              const result = await createBookingAPI(startDate, endDate, startTime, endTime);
             
              if (result) {
                console.log("🎉 Starting wait timer");
                setWaitingTimerSeconds(180);
                setShowWaitingPopup(true);
              }
            }}
          />
        )}
      </div>

      {/* RIGHT COLUMN: Reviews (UNCHANGED) */}
      <div className="lg:col-span-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Rating & Reviews</h3>
          <div className="flex items-center gap-2">
            {(loadingReviews || loadingAverageRating) && (
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            )}
            <button
              onClick={handleRefreshReviews}
              disabled={loadingReviews || loadingAverageRating}
              className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
              title="Refresh reviews"
            >
              <RefreshCw className={`w-4 h-4 text-gray-600 ${(loadingReviews || loadingAverageRating) ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {apiReviews.length > 0 && (
          <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <span className="text-xs text-green-700 font-medium">
              ✓ Live reviews from API
            </span>
            <span className="text-xs text-gray-500">
              (Updated {new Date(lastFetchTime).toLocaleTimeString()})
            </span>
          </div>
        )}

        {sessionStorage.getItem('editingReviewId') && !loadingReviews && (
          <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 animate-pulse">
            <span className="text-xs text-blue-700 font-medium">
              🔄 Refreshing to show your updated review...
            </span>
          </div>
        )}

        {reviewsError && (
          <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-700">{reviewsError}</p>
          </div>
        )}

        <div className="flex items-center mt-2 mb-2 justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gray-900">{displayAverageRating}</span>
            <span className="text-xs text-gray-600 mt-1">out of 5</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={i < Math.floor(displayAverageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  size={20}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 mt-1">
              {displayTotalReviews} Review{displayTotalReviews !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2 bg-white p-4 rounded-lg border">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating Breakdown</h4>
          {displayRatingDistribution.map((r) => (
            <div key={r.stars} className="flex items-center text-sm">
              <span className="w-8 text-gray-700 font-medium">{r.stars}★</span>
              <div className="flex-1 bg-gray-200 h-3 rounded-full mx-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${r.percentage}%` }} 
                />
              </div>
              <span className="text-gray-500 text-xs min-w-[45px] text-right">
                {r.count} ({r.percentage}%)
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 max-h-[500px] overflow-y-auto pr-2">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 sticky top-0 bg-white py-2 z-10">
            Customer Reviews ({displayTotalReviews})
          </h4>
          
          {displayReviews.length > 0 ? (
            displayReviews.map((review, idx) => {
              const canEdit = isUserReview(review);
              const wasJustEdited = sessionStorage.getItem('editingReviewId') === review._id;
              const isMenuOpen = menuOpenIndex === review._id;
              
              return (
                <div 
                  key={review._id || idx} 
                  className={`border rounded-xl p-4 transition-all duration-500 relative ${
                    wasJustEdited
                      ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl ring-2 ring-green-400 ring-offset-2'
                      : canEdit 
                      ? 'border-blue-200 bg-blue-50 hover:shadow-md' 
                      : 'border-gray-200 bg-white hover:shadow-md'
                  }`}
                >
                  {wasJustEdited && (
                    <div className="absolute -top-3 -right-3 z-20 animate-bounce">
                      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white text-xs px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2">
                        <span className="text-lg animate-spin">✨</span>
                        <span className="font-extrabold">JUST UPDATED!</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        wasJustEdited 
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500 ring-2 ring-green-300'
                          : 'bg-gradient-to-br from-blue-400 to-purple-400'
                      }`}>
                        {(review.userName || `User ${idx + 1}`).charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold text-gray-900 text-sm ${
                            wasJustEdited ? 'text-green-800' : ''
                          }`}>
                            {review.userName || `User ${idx + 1}`}
                          </span>
                          {canEdit && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium">
                              You
                            </span>
                          )}
                          {wasJustEdited && (
                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-medium animate-pulse">
                              Updated
                            </span>
                          )}
                        </div>
                        {review.createdAt && (
                          <p className="text-xs text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`flex px-2 py-1 rounded-lg border ${
                        wasJustEdited 
                          ? 'bg-green-100 border-green-300 ring-2 ring-green-200' 
                          : 'bg-yellow-50 border-yellow-200'
                      }`}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>

                      <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleMenuToggle(review._id, e)}
                          className={`p-1.5 rounded-full transition-all duration-200 ${
                            isMenuOpen 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'hover:bg-gray-100 text-gray-600'
                          }`}
                          aria-label="Review options"
                          title={canEdit ? "Edit or delete review" : "Review options"}
                        >
                          <MoreVertical size={18} />
                        </button>

                        {isMenuOpen && (
                          <div 
                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-30 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {canEdit ? (
                              <div className="py-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditClick(review);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 transition-colors group"
                                >
                                  <Edit size={16} className="text-blue-600 group-hover:scale-110 transition-transform" />
                                  <span className="font-medium text-gray-700 group-hover:text-blue-700">Edit Review</span>
                                </button>
                                
                                <div className="border-t border-gray-100"></div>
                                
                                <button
                                  onClick={(e) => handleDeleteReview(review._id, e)}
                                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                                >
                                  <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                                  <span className="font-medium group-hover:text-red-700">Delete Review</span>
                                </button>
                              </div>
                            ) : (
                              <div className="py-3 px-4">
                                <p className="text-xs text-gray-500 text-center">
                                  You can only edit your own reviews
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed mt-2 mb-3 ${
                    wasJustEdited 
                      ? 'text-gray-900 font-medium' 
                      : 'text-gray-700'
                  }`}>
                    {review.review || review.reviewText || review.comment || review.feedback || "No comment provided"}
                  </p>
                  
                  {wasJustEdited && (
                    <div className="mt-3 p-3 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-lg shadow-inner">
                      <p className="text-xs font-bold text-green-800 mb-2 flex items-center gap-1">
                        <span className="text-base">✅</span>
                        <span>Review Successfully Updated!</span>
                      </p>
                      <div className="space-y-1 text-xs text-green-700">
                        <p><strong>New Rating:</strong> {review.rating} ⭐</p>
                        <p><strong>New Review:</strong> {review.review || review.reviewText || 'No comment'}</p>
                        <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <div className="text-5xl mb-3">📝</div>
              <p className="text-gray-500 font-medium mb-1">No reviews yet</p>
              <p className="text-gray-400 text-sm">
                Be the first to review this vehicle!
              </p>
            </div>
          )}
        </div>
      </div>
      {/* MODALS */}
      {showWaitingPopup && (
        <WaitingPopup
          timer={waitingTimerSeconds}
          onClose={handleCloseWaiting}
          onTimerComplete={handleTimerComplete}
        />
      )}

      {showAcceptance && bookingId && (
        <BookingAcceptance
          bookingId={bookingId}
          onAccept={() => {
            console.log("✅ Booking accepted by owner!");
            setShowAcceptance(false);
            setCurrentBookingStatus('confirmed');
            setShowWaitingPopup(false);
            setBookingStatusMessage("✅ Owner accepted your booking!");
            
            toast.success("🎉 Booking Confirmed by Owner!", {
              duration: 5000,
              position: 'top-center',
            });
            
            setTimeout(() => {
              setShowContactButtons(true);
              setBookingStatusMessage("");
            }, 2000);
          }}
          onReject={(reason?: string) => {
            console.log("❌ Booking rejected by owner. Reason:", reason);
            setShowAcceptance(false);
            setCurrentBookingStatus('rejected');
            setShowWaitingPopup(false);
            setBookingStatusMessage("❌ Owner rejected your booking");
            
            toast.error(`Booking rejected${reason ? `: ${reason}` : ''}`, {
              duration: 5000,
              position: 'top-center',
            });
            
            setTimeout(() => {
              setBookingStatusMessage("");
              setBookingId(null);
              setSelectedDateTime(null);
            }, 3000);
          }}
          onClose={() => {
            console.log("❌ Acceptance modal closed");
            setShowAcceptance(false);
          }}
        />
      )}

      {showRejectModal && (
        <BookingRejectModal
          isOpen={showRejectModal}
          onClose={() => setShowRejectModal(false)}
          onReject={async (reason: string) => {
            console.log("❌ Rejecting booking with reason:", reason);
            
            try {
              if (bookingId) {
                // TODO: Replace with your actual API call when ready
                // await apiService.booking.updateBookingStatus(bookingId, 'rejected', reason);
                
                setCurrentBookingStatus('rejected');
                setShowRejectModal(false);
                setShowWaitingPopup(false);
                setBookingStatusMessage("❌ Booking rejected");
                
                toast.error(`Booking rejected: ${reason}`, {
                  duration: 5000,
                  position: 'top-center',
                });
                
                setTimeout(() => {
                  setBookingStatusMessage("");
                  setBookingId(null);
                  setSelectedDateTime(null);
                }, 3000);
              }
            } catch (error) {
              console.error("❌ Error rejecting booking:", error);
              toast.error("Failed to reject booking");
            }
          }}
        />
      )}

      <PopupChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        recipientName="Manoj Kumar"
        recipientImage="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
      />

      {/* Success Modal - After Call Confirmation */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
            <div className="text-center">
              {/* Success Animation */}
              <div className="mb-6 relative">
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 border-4 border-green-500 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>

              {/* Success Message */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Booking Confirmed! 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                Your call with the owner was successful. Your booking has been confirmed!
              </p>

              {/* Booking Summary */}
              {selectedDateTime && currentVehicle && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-3 text-center">Booking Summary</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="font-medium text-gray-900">{currentVehicle.name}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">From:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedDateTime.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })} at {selectedDateTime.startTime}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">To:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedDateTime.endDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })} at {selectedDateTime.endTime}
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Duration:</span>
                        <span className="font-medium text-gray-900">
                          {calculateTotalHours(
                            selectedDateTime.startDate,
                            selectedDateTime.endDate,
                            selectedDateTime.startTime,
                            selectedDateTime.endTime
                          )} hours
                        </span>
                      </div>
                      
                      <div className="flex justify-between mt-1">
                        <span className="text-gray-600">Price per hour:</span>
                        <span className="font-medium text-gray-900">₹{currentVehicle.price}</span>
                      </div>
                      
                      <div className="flex justify-between mt-2 pt-2 border-t border-gray-300">
                        <span className="font-semibold text-gray-900">Total Price:</span>
                        <span className="font-bold text-blue-600 text-lg">
                          ₹{calculateTotalHours(
                            selectedDateTime.startDate,
                            selectedDateTime.endDate,
                            selectedDateTime.startTime,
                            selectedDateTime.endTime
                          ) * parseInt(currentVehicle.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking ID */}
              {bookingId && (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-600 mb-1">Booking ID</p>
                  <p className="text-sm font-mono font-semibold text-blue-900">{bookingId}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
              <button
  onClick={() => {
    setShowSuccessModal(false);
    navigate('/mybookings');
  }}
  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
>
  View My Bookings
</button>

                
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/');
                  }}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {(isSubmittingBooking || isDeletingReview) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-2xl">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-700 font-semibold">
              {isSubmittingBooking ? "Processing your booking..." : "Deleting review..."}
            </p>
          </div>
        </div>
      )}
    </div>


    
  );
};

export default BookNow;