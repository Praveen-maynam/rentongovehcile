

// import axios from 'axios';
 
// // Base API configuration
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://3.110.122.127:3000';
 
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
 
// // Request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     // Add auth token if available
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
 
// // Response interceptor
// apiClient.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     console.error('API Error:', error.response?.data || error.message);
//     return Promise.reject(error.response?.data || error);
//   }
// );
 
// // ==================== UTILS ====================
// const utils = {
//   validateDateFormat: (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date),
//   validateTimeFormat: (time: string) => /^\d{2}\.\d{2}$/.test(time),
  
//   extractResponseData: (response: any) => {
//     // Handle different response structures
//     if (response?.data?.data) return response.data.data;
//     if (response?.data) return response.data;
//     return response;
//   },
  
//   formatDateForBackend: (date: Date | string): string => {
//     if (typeof date === 'string') return date;
//     return date.toISOString().split('T')[0];
//   },
  
//   formatTimeForBackend: (time: string): string => {
  
//     return time.replace(':', '.');
//   }
// };
 
// // ==================== CAR APIs ====================
 
// export const carAPI = {
//   // Create a new car
//   createCar: async (carData: FormData) => {
//     return apiClient.post('/createCar', carData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//   },
 
//   // Get car by ID
//   getCarById: async (carId: string) => {
//     return apiClient.get(`/getCarById/${carId}`);
//   },
 
  
//   // ✅ Update car by ID - MATCHES BIKE IMPLEMENTATION
//   updateCarById: async (carId: string, carData: FormData) => {
//     console.log("🚀 API Service - Update Car Request");
//     console.log("  Car ID:", carId);
//     console.log("  Endpoint:", `/updateCar/${carId}`);
    
//     // Log FormData contents for debugging
//     console.log("📦 FormData being sent:");
//     for (const [key, value] of carData.entries()) {
//       if (value instanceof File) {
//         console.log(`  ${key}:`, { name: value.name, size: value.size, type: value.type });
//       } else {
//         console.log(`  ${key}:`, value);
//       }
//     }

//     try {
//       const response = await apiClient.put(`/updateCar/${carId}`, carData, {
//         headers: { 
//           'Content-Type': 'multipart/form-data'
//         },
//       });
      
//       console.log("✅ Update Car Success:", response);
//       return response;
//     } catch (error: any) {
//       console.error("❌ Update Car Failed:", error);
//       console.error("❌ Error Details:", error.response?.data);
//       throw error;
//     }
//   },

//   // Delete car by ID
//   deleteCarById: async (carId: string) => {
//     return apiClient.delete(`/deleteCar/${carId}`);
//   },
 
//   // Get nearby cars (location-based)
//   getNearbyCars: async (latitude: number, longitude: number) => {
//     return apiClient.get('/getNearbyCars', {
//       params: { latitude, longitude },
//     });
//   },
 
//   // Get user's cars
//   getMyVehicles: async (userId: string) => {
//     return apiClient.get(`/myVehicles/${userId}`);
//   },
// };
 
// /// ==================== BIKE APIs ====================
 
// export const bikeAPI = {
//   // ✅ Create a new bike
//   createBike: async (bikeData: FormData) => {
//     return apiClient.post('/createBike', bikeData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//   },
 
//   // ✅ Get bike by ID
//   getBikeById: async (bikeId: string) => {
//     return apiClient.get(`/getBikeById/${bikeId}`);
//   },
 
//   // // ✅ Update bike by ID
//   // updateBikeById: async (bikeId: string, bikeData: FormData) => {
//   //   return apiClient.put(`/updateBikeById/${bikeId}`, bikeData, {
//   //     headers: { 'Content-Type': 'multipart/form-data' },
//   //   });
//   // },
//    // ✅ Update bike by ID - FIXED ENDPOINT
//  // ✅ Update bike by ID - MATCHES YOUR BACKEND EXACTLY
//   updateBikeById: async (bikeId: string, bikeData: FormData) => {
//     console.log("🚀 API Service - Update Bike Request");
//     console.log("  Bike ID:", bikeId);
//     console.log("  Endpoint:", `/updateBike/${bikeId}`);
    
//     // Log FormData contents for debugging
//     console.log("📦 FormData being sent:");
//     for (const [key, value] of bikeData.entries()) {
//       if (value instanceof File) {
//         console.log(`  ${key}:`, { name: value.name, size: value.size, type: value.type });
//       } else {
//         console.log(`  ${key}:`, value);
//       }
//     }

//     try {
//       const response = await apiClient.put(`/updateBike/${bikeId}`, bikeData, {
//         headers: { 
//           'Content-Type': 'multipart/form-data'
//         },
//       });
      
//       console.log("✅ Update Bike Success:", response);
//       return response;
//     } catch (error: any) {
//       console.error("❌ Update Bike Failed:", error);
//       console.error("❌ Error Details:", error.response?.data);
//       throw error;
//     }
//   },
//   // ✅ Delete bike by ID
//   deleteBikeById: async (bikeId: string) => {
//     return apiClient.delete(`/deleteBike/${bikeId}`);
//   },
 
//   // ✅ Get nearby bikes (location-based)
//   getNearbyBikes: async (latitude: number, longitude: number, range?: number) => {
//     return apiClient.get('/getNearbyBikes', {
//       params: { latitude, longitude, range: range || 5 },
//     });
//   },
 
// //   // ✅ Get all bikes owned by a specific owner
// //   //    (Fix for getMyVehicles error in ListedBikes.tsx)
// //   getMyVehicles: async (userId: string) => {
// //     return apiClient.get(`/getBikeByOwner/${userId}`);
// //   },
// // };
 
 
// // ✅ CORRECT (matches your backend)
// getMyVehicles: async (userId: string) => {
//   return apiClient.get(`/myVehicles/${userId}`);
// }
// };
// // ==================== REVIEW APIs ====================
 
// export const reviewAPI = {
//   // Create a new review
//   createReview: async (reviewData: {
//     carId?: string;
//     vehicleId?: string;
//     vehicleType?: 'car' | 'bike';
//     bikeId?: string;
//     userId: string;
//     rating: number;
//     comment: string;
//   }) => {
//     return apiClient.post('/addReview', reviewData);
//   },
 
//   // Get reviews by car ID
//   getReviewsByCarId: async (carId: string) => {
//     return apiClient.get(`/getReviewById/${carId}`);
//   },
 
//   // Get reviews by bike ID
//   getReviewsByBikeId: async (bikeId: string) => {
//     return apiClient.get(`/reviews/bike/${bikeId}`);
//   },
 
//   // Update review by ID
//   updateReviewById: async (reviewId: string, reviewData: {
//     rating?: number;
//     comment?: string;
//   }) => {
//     return apiClient.put(`/updateReview/${reviewId}`, reviewData);
//   },
 
//   // Get average rating for a vehicle
//   getAverageRating: async (vehicleId: string, vehicleType: 'car' | 'bike') => {
//     return apiClient.get(`/AverageRating/${vehicleType}/${vehicleId}`);
//   },
 
//   // Get user's rating for a vehicle
//   getUserRating: async (userId: string, vehicleId: string) => {
//     return apiClient.get(`/reviews/user/${userId}/vehicle/${vehicleId}`);
//   },
 
//   // Delete review by ID
//   deleteReview: async (reviewId: string) => {
//     return apiClient.delete(`/reviews/${reviewId}`);
//   },
// };
 
// // ==================== BOOKING APIs ====================
 
// export const bookingAPI = {
//   // Create a new booking - accepts all fields and passes them to backend
//   createBooking: async (bookingData: any) => {
//     console.log("📦 API Service - Input bookingData:", bookingData);
   
//     // If it's already in the correct format (has VechileId), use as-is
//     // Otherwise, transform field names to match backend expectations
//     const backendPayload = bookingData.VechileId ? bookingData : {
//       VechileId: bookingData.vehicleId,
//       vechileType: bookingData.vehicleType, // Backend expects lowercase with typo
//       userId: bookingData.userId,
//       contactNumber: bookingData.contactNumber || '',
//       contactName: bookingData.contactName || '',
//       latitude: bookingData.latitude || '',
//       longitude: bookingData.longitude || '',
//       FromDate: bookingData.startDate,
//       ToDate: bookingData.endDate,
//       FromTime: bookingData.startTime || '',
//       ToTime: bookingData.endTime || '',
//       totalPrice: String(bookingData.totalPrice),
//       totalHours: bookingData.totalHours || '',
//       pricePerDay: bookingData.pricePerDay || '',
//       pricePerHour: bookingData.pricePerHour || '',
//       pricePerKm: bookingData.pricePerKm || '',
//       carName: bookingData.carName || '',
//       carModel: bookingData.carModel || '',
//       carBrand: bookingData.carBrand || '',
//       carNumber: bookingData.carNumber || '',
//       fuelType: bookingData.fuelType || '',
//       transmissionType: bookingData.transmissionType || '',
//       seatingCapacity: bookingData.seatingCapacity || '',
//       pickupAddress: bookingData.pickupLocation || bookingData.pickupAddress || '',
//       dropoffAddress: bookingData.dropoffLocation || bookingData.dropoffAddress || '',
//     };
   
//     console.log("📦 API Service - Transformed payload:", backendPayload);
//     console.log("📦 API Service - vechileType value:", backendPayload.vechileType);
   
//     // Backend expects application/x-www-form-urlencoded, not JSON
//     const urlencoded = new URLSearchParams();
//     Object.entries(backendPayload).forEach(([key, value]) => {
//       if (value !== null && value !== undefined && value !== '') {
//         urlencoded.append(key, String(value));
//       }
//     });
   
//     console.log("📦 API Service - URL Encoded body:", urlencoded.toString());
//     console.log("📦 API Service - vechileType in URLSearchParams:", urlencoded.get('vechileType'));
//     console.log("📦 API Service - VechileId in URLSearchParams:", urlencoded.get('VechileId'));
   
//     return apiClient.post('/createBooking', urlencoded, {
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     });
//   },
 
//   // Get all bookings for a user (Production-level with multiple strategies)
//   getAllBookings: async (userId: string) => {
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("📥 GET ALL BOOKINGS - START");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("User ID:", userId);
 
//     const endpoint = `/getAllBookings?userId=${userId}`;
//     const fullUrl = `${API_BASE_URL}${endpoint}`;
   
//     // Strategy 1: Direct fetch to API (bypass axios interceptors)
//     try {
//       console.log("🎯 Strategy 1: Direct fetch to API");
//       console.log("URL:", fullUrl);
 
//       const response = await Promise.race([
//         fetch(fullUrl, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }),
//         new Promise<never>((_, reject) =>
//           setTimeout(() => reject(new Error('Request timeout')), 15000)
//         ),
//       ]);
 
//       if (response.ok) {
//         const data = await response.json();
//         console.log("✅ Direct fetch Success:", data);
//         return data;
//       } else {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
//     } catch (directError: any) {
//       console.warn("⚠️ Direct fetch failed:", directError.message);
//     }
 
//     // Strategy 2: Using axios with credentials
//     try {
//       console.log("🎯 Strategy 2: Axios GET with credentials");
//       const response = await apiClient.get(endpoint, {
//         withCredentials: false,
//         timeout: 15000,
//       });
//       console.log("✅ Axios Success:", response);
//       return response;
//     } catch (axiosError: any) {
//       console.warn("⚠️ Axios failed:", axiosError.message);
//     }
 
//     // Strategy 3: CORS-anywhere style proxies (simple GET, no preflight)
//     const simpleCorsProxies = [
//       'https://api.allorigins.win/get?url=',
//     ];
 
//     for (let i = 0; i < simpleCorsProxies.length; i++) {
//       try {
//         console.log(`🎯 Strategy 3.${i + 1}: CORS Proxy ${i + 1}`);
//         const proxiedUrl = `${simpleCorsProxies[i]}${encodeURIComponent(fullUrl)}`;
//         console.log("Proxied URL:", proxiedUrl);
 
//         const proxyResponse = await Promise.race([
//           fetch(proxiedUrl, {
//             method: 'GET',
//           }),
//           new Promise<never>((_, reject) =>
//             setTimeout(() => reject(new Error('Proxy timeout')), 15000)
//           ),
//         ]);
 
//         if (!proxyResponse.ok) {
//           throw new Error(`HTTP ${proxyResponse.status}: ${proxyResponse.statusText}`);
//         }
 
//         const proxyData = await proxyResponse.json();
       
//         // allorigins wraps response in { contents: "..." }
//         const data = proxyData.contents
//           ? JSON.parse(proxyData.contents)
//           : proxyData;
       
//         console.log("✅ CORS Proxy Success:", data);
//         return data;
//       } catch (proxyError: any) {
//         console.warn(`⚠️ Proxy ${i + 1} failed:`, proxyError.message);
//       }
//     }
 
//     // Strategy 4: Last resort - mock data or throw error
//     console.error("❌ All strategies failed");
//     throw new Error('Unable to fetch bookings. Please check your connection and try again.');
//   },
 
//   // Get booking by ID
//   getBookingById: async (bookingId: string) => {
//     return apiClient.get(`/getBookingById/${bookingId}`);
//   },
 
//   // Update booking by ID
//   updateBooking: async (bookingId: string, bookingData: {
//     startDate?: string;
//     endDate?: string;
//     startTime?: string;
//     endTime?: string;
//     status?: string;
//   }) => {
//     return apiClient.put(`/bookings/${bookingId}`, bookingData);
//   },
 
//   // Delete booking by ID
//   deleteBooking: async (bookingId: string) => {
//     return apiClient.delete(`/bookings/${bookingId}`);
//   },
 
//   // Get bookings for vehicle owner
//   getMyListingBookings: async (ownerId: string) => {
//     return apiClient.get(`/bookings/owner/${ownerId}`);
//   },
// };
 
// // // ==================== AVAILABILITY APIs ====================
 
// // export const availabilityAPI = {
// //   // Create unavailable slot (marks vehicle as not available)
// //   createUnavailability: async (availabilityData: {
// //     VechileId: string;
// //     vechileType: 'Car' | 'Bike' | 'Auto';
// //     fromDate: string;
// //     toDate: string;
// //     fromTime?: string;
// //     toTime?: string;
// //     isNotAvailable?: boolean;
// //   }) => {
// //     console.log("🚫 Create Unavailability - Input data:", availabilityData);
   
// //     // Backend expects application/x-www-form-urlencoded format
// //     const urlencoded = new URLSearchParams();
// //     urlencoded.append('VechileId', availabilityData.VechileId);
// //     urlencoded.append('vechileType', availabilityData.vechileType);
// //     urlencoded.append('fromDate', availabilityData.fromDate);
// //     urlencoded.append('toDate', availabilityData.toDate);
// //     if (availabilityData.fromTime) urlencoded.append('fromTime', availabilityData.fromTime);
// //     if (availabilityData.toTime) urlencoded.append('toTime', availabilityData.toTime);
// //     urlencoded.append('isNotAvailable', String(availabilityData.isNotAvailable ?? true));
   
// //     console.log("🚫 Create Unavailability - URL Encoded:", urlencoded.toString());
   
// //     return apiClient.post('/createNotAvailability', urlencoded, {
// //       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
// //     });
// //   },
 
// //   // Get unavailability by ID
// //   getUnavailabilityById: async (availabilityId: string) => {
// //     return apiClient.get(`/getNotAvailabilityById/${availabilityId}`);
// //   },
 
// //   // Get vehicle availability (check if vehicle is available for date range)
// //   getVehicleAvailability: async (
// //     VechileId: string,
// //     vechileType: 'Car' | 'Bike' | 'Auto',
// //     startDate: string,
// //     endDate: string
// //   ) => {
// //     return apiClient.get('/getVehicleAvailability', {
// //       params: {
// //         VechileId,
// //         vechileType,
// //         startDate,
// //         endDate
// //       },
// //     });
// //   },
 
// //   // Update unavailability by ID
// //   updateUnavailability: async (
// //     availabilityId: string,
// //     availabilityData: {
// //       VechileId?: string;
// //       vechileType?: 'Car' | 'Bike' | 'Auto';
// //       fromDate?: string;
// //       toDate?: string;
// //       fromTime?: string;
// //       toTime?: string;
// //       isNotAvailable?: boolean;
// //     }
// //   ) => {
// //     console.log("🔄 Update Unavailability - Input data:", availabilityData);
   
// //     // Backend expects application/x-www-form-urlencoded format
// //     const urlencoded = new URLSearchParams();
// //     Object.entries(availabilityData).forEach(([key, value]) => {
// //       if (value !== null && value !== undefined && value !== '') {
// //         urlencoded.append(key, String(value));
// //       }
// //     });
   
// //     console.log("🔄 Update Unavailability - URL Encoded:", urlencoded.toString());
   
// //     return apiClient.put(`/updateNotAvailability/${availabilityId}`, urlencoded, {
// //       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
// //     });
// //   },
 
// //   // Delete unavailability by ID
// //   deleteUnavailability: async (availabilityId: string) => {
// //     return apiClient.delete(`/deleteNotAvailability/${availabilityId}`);
// //   },
// // };
 
// // ==================== USER APIs ====================
 

















// export const availabilityAPI = {
//   // ✅ CREATE - Mark vehicle as unavailable
//   createUnavailability: async (availabilityData: {
//     userId?: string;
//     VechileId: string;
//     vechileType: 'Car' | 'Bike' | 'Auto';
//     fromDate: string;
//     toDate: string;
//     fromTime?: string;
//     toTime?: string;
//     isNotAvailable?: boolean;
//   }) => {
//     console.log("🚫 Create Unavailability - Input data:", availabilityData);

//     const urlencoded = new URLSearchParams();
//     if (availabilityData.userId) urlencoded.append("userId", availabilityData.userId);
//     urlencoded.append("VechileId", availabilityData.VechileId);
//     urlencoded.append("vechileType", availabilityData.vechileType);
//     urlencoded.append("fromDate", availabilityData.fromDate);
//     urlencoded.append("toDate", availabilityData.toDate);
//     urlencoded.append("fromTime", availabilityData.fromTime || "00:00");
//     urlencoded.append("toTime", availabilityData.toTime || "23:59");
//     urlencoded.append("isNotAvailable", String(availabilityData.isNotAvailable ?? true));

//     console.log("🚫 Create Unavailability - Encoded Body:", urlencoded.toString());

//     return apiClient.post("/createNotAvailability", urlencoded, {
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     });
//   },

//   // ✅ GET - Fetch vehicle availability between dates
//   getVehicleAvailability: async (
//     VechileId: string,
//     vechileType: 'Car' | 'Bike' | 'Auto',
//     startDate: string,
//     endDate: string
//   ) => {
//     console.log("📅 Get Vehicle Availability:", { VechileId, vechileType, startDate, endDate });

//     return apiClient.get("/getVehicleAvailability", {
//       params: {
//         VechileId,
//         vechileType,
//         startDate,
//         endDate,
//       },
//     });
//   },

//   // ✅ GET - Fetch unavailability by ID
//   getUnavailabilityById: async (availabilityId: string) => {
//     console.log("📄 Get Unavailability By ID:", availabilityId);
//     return apiClient.get(`/getNotAvailabilityById/${availabilityId}`);
//   },

//   // ✅ UPDATE - Update a not-availability slot
//   updateUnavailability: async (
//     availabilityId: string,
//     availabilityData: {
//       VechileId: string;
//       vechileType: 'Car' | 'Bike' | 'Auto';
//       fromDate: string;
//       toDate: string;
//       fromTime?: string;
//       toTime?: string;
//       isNotAvailable?: boolean;
//     }
//   ) => {
//     console.log("🔄 Update Unavailability - Input data:", availabilityData);

//     const urlencoded = new URLSearchParams();
//     urlencoded.append("VechileId", availabilityData.VechileId);
//     urlencoded.append("vechileType", availabilityData.vechileType);
//     urlencoded.append("fromDate", availabilityData.fromDate);
//     urlencoded.append("toDate", availabilityData.toDate);
//     urlencoded.append("fromTime", availabilityData.fromTime || "00:00");
//     urlencoded.append("toTime", availabilityData.toTime || "23:59");
//     urlencoded.append("isNotAvailable", String(availabilityData.isNotAvailable ?? true));

//     console.log("🔄 Update Unavailability - Encoded Body:", urlencoded.toString());

//     return apiClient.put(`/updateNotAvailability/${availabilityId}`, urlencoded, {
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     });
//   },

//   // ✅ DELETE - Delete not-availability by ID
//   deleteUnavailability: async (availabilityId: string) => {
//     console.log("🗑️ Delete Unavailability - ID:", availabilityId);
//     return apiClient.delete(`/deleteNotAvailability/${availabilityId}`);
//   },
// };

// export const userAPI = {
//   // Register/Update user profile (Backend: /register endpoint)
//   register: async (userData: {
//     googleId: string;
//     name: string;
//     mobilenumber: string;
//     latitude: string;
//     longitude: string;
//     email: string;
//     fcmToken: string;
//     platform: string;
//   }) => {
//     console.log("📝 User Register API - Input data:", userData);
   
//     // Backend expects application/x-www-form-urlencoded format
//     const urlencoded = new URLSearchParams();
//     Object.entries(userData).forEach(([key, value]) => {
//       if (value !== null && value !== undefined && value !== '') {
//         urlencoded.append(key, String(value));
//       }
//     });
   
//     console.log("📝 User Register API - URL Encoded:", urlencoded.toString());
   
//     return apiClient.post('/register', urlencoded, {
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     });
//   },
 
//   // Get user profile
//   getUserProfile: async (userId: string) => {
//     return apiClient.get(`/users/${userId}`);
//   },
 
//   // Update user profile
//   updateUserProfile: async (userId: string, userData: any) => {
//     return apiClient.put(`/users/${userId}`, userData);
//   },
//   // Mark notification as read
//   markNotificationRead: async (notificationId: string) => {
//     return apiClient.put(`/notifications/${notificationId}/read`);
//   },
// };
 
// // Export default service object
// const apiService = {
//   car: carAPI,
//   bike: bikeAPI,
//   review: reviewAPI,
//   booking: bookingAPI,
//   availability: availabilityAPI,
//   user: userAPI,
// };
 
// export default apiService;
 
 
 
 
 

import axios from 'axios';
 
// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://3.110.122.127:3000';
 
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
 
// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 
// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);
 
// ==================== UTILS ====================
const utils = {
  validateDateFormat: (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date),
  validateTimeFormat: (time: string) => /^\d{2}\.\d{2}$/.test(time),
  
  extractResponseData: (response: any) => {
    // Handle different response structures
    if (response?.data?.data) return response.data.data;
    if (response?.data) return response.data;
    return response;
  },
  
  formatDateForBackend: (date: Date | string): string => {
    if (typeof date === 'string') return date;
    return date.toISOString().split('T')[0];
  },
  
  formatTimeForBackend: (time: string): string => {
    return time.replace(':', '.');
  }
};
 
// ==================== CAR APIs ====================
 
export const carAPI = {
  // Create a new car
  createCar: async (carData: FormData) => {
    return apiClient.post('/createCar', carData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
 
  // Get car by ID
  getCarById: async (carId: string) => {
    return apiClient.get(`/getCarById/${carId}`);
  },
 
  // ✅ Update car by ID - MATCHES BIKE IMPLEMENTATION
  updateCarById: async (carId: string, carData: FormData) => {
    console.log("🚀 API Service - Update Car Request");
    console.log("  Car ID:", carId);
    console.log("  Endpoint:", `/updateCar/${carId}`);
    
    // Log FormData contents for debugging
    console.log("📦 FormData being sent:");
    for (const [key, value] of carData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}:`, { name: value.name, size: value.size, type: value.type });
      } else {
        console.log(`  ${key}:`, value);
      }
    }

    try {
      const response = await apiClient.put(`/updateCar/${carId}`, carData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
      });
      
      console.log("✅ Update Car Success:", response);
      return response;
    } catch (error: any) {
      console.error("❌ Update Car Failed:", error);
      console.error("❌ Error Details:", error.response?.data);
      throw error;
    }
  },

  // Delete car by ID
  deleteCarById: async (carId: string) => {
    return apiClient.delete(`/deleteCar/${carId}`);
  },
 
  // Get nearby cars (location-based)
  getNearbyCars: async (latitude: number, longitude: number) => {
    return apiClient.get('/getNearbyCars', {
      params: { latitude, longitude },
    });
  },
 
  // Get user's cars
  getMyVehicles: async (userId: string) => {
    return apiClient.get(`/myVehicles/${userId}`);
  },
};
 
// ==================== BIKE APIs ====================
 
export const bikeAPI = {
  // ✅ Create a new bike
  createBike: async (bikeData: FormData) => {
    return apiClient.post('/createBike', bikeData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
 
  // ✅ Get bike by ID
  getBikeById: async (bikeId: string) => {
    return apiClient.get(`/getBikeById/${bikeId}`);
  },
 
  // ✅ Update bike by ID - MATCHES YOUR BACKEND EXACTLY
  updateBikeById: async (bikeId: string, bikeData: FormData) => {
    console.log("🚀 API Service - Update Bike Request");
    console.log("  Bike ID:", bikeId);
    console.log("  Endpoint:", `/updateBike/${bikeId}`);
    
    // Log FormData contents for debugging
    console.log("📦 FormData being sent:");
    for (const [key, value] of bikeData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}:`, { name: value.name, size: value.size, type: value.type });
      } else {
        console.log(`  ${key}:`, value);
      }
    }

    try {
      const response = await apiClient.put(`/updateBike/${bikeId}`, bikeData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
      });
      
      console.log("✅ Update Bike Success:", response);
      return response;
    } catch (error: any) {
      console.error("❌ Update Bike Failed:", error);
      console.error("❌ Error Details:", error.response?.data);
      throw error;
    }
  },

  // ✅ Delete bike by ID
  deleteBikeById: async (bikeId: string) => {
    return apiClient.delete(`/deleteBike/${bikeId}`);
  },
 
  // ✅ Get nearby bikes (location-based)
  getNearbyBikes: async (latitude: number, longitude: number, range?: number) => {
    return apiClient.get('/getNearbyBikes', {
      params: { latitude, longitude, range: range || 5 },
    });
  },
 
  // ✅ CORRECT (matches your backend)
  getMyVehicles: async (userId: string) => {
    return apiClient.get(`/myVehicles/${userId}`);
  }
};

// ==================== REVIEW APIs ====================
 
export const reviewAPI = {
  // Create a new review
  createReview: async (reviewData: {
    carId?: string;
    vehicleId?: string;
    vehicleType?: 'car' | 'bike';
    bikeId?: string;
    userId: string;
    rating: number;
    comment: string;
  }) => {
    return apiClient.post('/addReview', reviewData);
  },
 
  // Get reviews by car ID (also works for bikes)
  getReviewsByCarId: async (vehicleId: string) => {
    return apiClient.get(`/getReviewById/${vehicleId}`);
  },
 
  // Get reviews by bike ID
  getReviewsByBikeId: async (bikeId: string) => {
    return apiClient.get(`/getReviewById/${bikeId}`);
  },
 
  // Update review by ID
  updateReviewById: async (reviewId: string, reviewData: {
    rating?: number;
    comment?: string;
  }) => {
    return apiClient.put(`/updateReview/${reviewId}`, reviewData);
  },
 
  // Get average rating for a vehicle using query parameters
  getAverageRating: async (vehicleId: string, vehicleType: 'car' | 'bike') => {
    const capitalizedType = vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1);
    return apiClient.get('/getAverageRating', {
      params: {
        vechileType: capitalizedType,
        vechileId: vehicleId
      }
    });
  },
 
  // Get user's rating for a vehicle
  getUserRating: async (userId: string, vehicleId: string) => {
    return apiClient.get(`/reviews/user/${userId}/vehicle/${vehicleId}`);
  },
 
  // Delete review by ID
  deleteReview: async (reviewId: string) => {
    return apiClient.delete(`/reviews/${reviewId}`);
  },
};
 
// ==================== BOOKING APIs ====================
 
export const bookingAPI = {
  // Create a new booking - accepts all fields and passes them to backend
  createBooking: async (bookingData: any) => {
    console.log("📦 API Service - Input bookingData:", bookingData);
   
    // If it's already in the correct format (has VechileId), use as-is
    // Otherwise, transform field names to match backend expectations
    const backendPayload = bookingData.VechileId ? bookingData : {
      VechileId: bookingData.vehicleId,
      vechileType: bookingData.vehicleType, // Backend expects lowercase with typo
      userId: bookingData.userId,
      contactNumber: bookingData.contactNumber || '',
      contactName: bookingData.contactName || '',
      latitude: bookingData.latitude || '',
      longitude: bookingData.longitude || '',
      FromDate: bookingData.startDate,
      ToDate: bookingData.endDate,
      FromTime: bookingData.startTime || '',
      ToTime: bookingData.endTime || '',
      totalPrice: String(bookingData.totalPrice),
      totalHours: bookingData.totalHours || '',
      pricePerDay: bookingData.pricePerDay || '',
      pricePerHour: bookingData.pricePerHour || '',
      pricePerKm: bookingData.pricePerKm || '',
      carName: bookingData.carName || '',
      carModel: bookingData.carModel || '',
      carBrand: bookingData.carBrand || '',
      carNumber: bookingData.carNumber || '',
      fuelType: bookingData.fuelType || '',
      transmissionType: bookingData.transmissionType || '',
      seatingCapacity: bookingData.seatingCapacity || '',
      pickupAddress: bookingData.pickupLocation || bookingData.pickupAddress || '',
      dropoffAddress: bookingData.dropoffLocation || bookingData.dropoffAddress || '',
    };
   
    console.log("📦 API Service - Transformed payload:", backendPayload);
    console.log("📦 API Service - vechileType value:", backendPayload.vechileType);
   
    // Backend expects application/x-www-form-urlencoded, not JSON
    const urlencoded = new URLSearchParams();
    Object.entries(backendPayload).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        urlencoded.append(key, String(value));
      }
    });
   
    console.log("📦 API Service - URL Encoded body:", urlencoded.toString());
    console.log("📦 API Service - vechileType in URLSearchParams:", urlencoded.get('vechileType'));
    console.log("📦 API Service - VechileId in URLSearchParams:", urlencoded.get('VechileId'));
   
    return apiClient.post('/createBooking', urlencoded, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },
 
  // Get all bookings for a user (Production-level with multiple strategies)
  getAllBookings: async (userId: string) => {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📥 GET ALL BOOKINGS - START");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("User ID:", userId);
 
    const endpoint = `/getAllBookings?userId=${userId}`;
    const fullUrl = `${API_BASE_URL}${endpoint}`;
   
    // Strategy 1: Direct fetch to API (bypass axios interceptors)
    try {
      console.log("🎯 Strategy 1: Direct fetch to API");
      console.log("URL:", fullUrl);
 
      const response = await Promise.race([
        fetch(fullUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        ),
      ]);
 
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Direct fetch Success:", data);
        return data;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (directError: any) {
      console.warn("⚠️ Direct fetch failed:", directError.message);
    }
 
    // Strategy 2: Using axios with credentials
    try {
      console.log("🎯 Strategy 2: Axios GET with credentials");
      const response = await apiClient.get(endpoint, {
        withCredentials: false,
        timeout: 15000,
      });
      console.log("✅ Axios Success:", response);
      return response;
    } catch (axiosError: any) {
      console.warn("⚠️ Axios failed:", axiosError.message);
    }
 
    // Strategy 3: CORS-anywhere style proxies (simple GET, no preflight)
    const simpleCorsProxies = [
      'https://api.allorigins.win/get?url=',
    ];
 
    for (let i = 0; i < simpleCorsProxies.length; i++) {
      try {
        console.log(`🎯 Strategy 3.${i + 1}: CORS Proxy ${i + 1}`);
        const proxiedUrl = `${simpleCorsProxies[i]}${encodeURIComponent(fullUrl)}`;
        console.log("Proxied URL:", proxiedUrl);
 
        const proxyResponse = await Promise.race([
          fetch(proxiedUrl, {
            method: 'GET',
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Proxy timeout')), 15000)
          ),
        ]);
 
        if (!proxyResponse.ok) {
          throw new Error(`HTTP ${proxyResponse.status}: ${proxyResponse.statusText}`);
        }
 
        const proxyData = await proxyResponse.json();
       
        // allorigins wraps response in { contents: "..." }
        const data = proxyData.contents
          ? JSON.parse(proxyData.contents)
          : proxyData;
       
        console.log("✅ CORS Proxy Success:", data);
        return data;
      } catch (proxyError: any) {
        console.warn(`⚠️ Proxy ${i + 1} failed:`, proxyError.message);
      }
    }
 
    // Strategy 4: Last resort - mock data or throw error
    console.error("❌ All strategies failed");
    throw new Error('Unable to fetch bookings. Please check your connection and try again.');
  },
 
  // Get booking by ID
  getBookingById: async (bookingId: string) => {
    return apiClient.get(`/getBookingById/${bookingId}`);
  },
 
  // Update booking by ID
  updateBooking: async (bookingId: string, bookingData: {
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    status?: string;
  }) => {
    return apiClient.put(`/bookings/${bookingId}`, bookingData);
  },
 
   // Get pending bookings for an owner
  getPendingBookingsOfOwner: async (ownerId: string) => {
    return apiClient.get(`/getPendingBookingsOfOwner/${ownerId}`);
  },

  // Confirm a booking
  confirmBooking: async (bookingId: string) => {
    return apiClient.post(`/confirmBooking/${bookingId}/conform`);
  },

  // Delete booking is already there, just make sure it exists
  deleteBooking: async (bookingId: string) => {
    return apiClient.delete(`/deleteBooking/${bookingId}`);
  },
 
  // Get bookings for vehicle owner
  getMyListingBookings: async (ownerId: string) => {
    return apiClient.get(`/bookings/owner/${ownerId}`);
  },
};
  
// ==================== AVAILABILITY APIs ====================

export const availabilityAPI = {
  // ✅ CREATE - Mark vehicle as unavailable
  createUnavailability: async (availabilityData: {
    userId?: string;
    VechileId: string;
    vechileType: 'Car' | 'Bike' | 'Auto';
    fromDate: string;
    toDate: string;
    fromTime?: string;
    toTime?: string;
    isNotAvailable?: boolean;
  }) => {
    console.log("🚫 Create Unavailability - Input data:", availabilityData);

    const urlencoded = new URLSearchParams();
    if (availabilityData.userId) urlencoded.append("userId", availabilityData.userId);
    urlencoded.append("VechileId", availabilityData.VechileId);
    urlencoded.append("vechileType", availabilityData.vechileType);
    urlencoded.append("fromDate", availabilityData.fromDate);
    urlencoded.append("toDate", availabilityData.toDate);
    urlencoded.append("fromTime", availabilityData.fromTime || "00:00");
    urlencoded.append("toTime", availabilityData.toTime || "23:59");
    urlencoded.append("isNotAvailable", String(availabilityData.isNotAvailable ?? true));

    console.log("🚫 Create Unavailability - Encoded Body:", urlencoded.toString());

    return apiClient.post("/createNotAvailability", urlencoded, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  },

  // ✅ GET - Fetch vehicle availability between dates
  getVehicleAvailability: async (
    VechileId: string,
    vechileType: 'Car' | 'Bike' | 'Auto',
    startDate: string,
    endDate: string
  ) => {
    console.log("📅 Get Vehicle Availability:", { VechileId, vechileType, startDate, endDate });

    return apiClient.get("/getVehicleAvailability", {
      params: {
        VechileId,
        vechileType,
        startDate,
        endDate,
      },
    });
  },

  // ✅ GET - Fetch unavailability by ID
  getUnavailabilityById: async (availabilityId: string) => {
    console.log("📄 Get Unavailability By ID:", availabilityId);
    return apiClient.get(`/getNotAvailabilityById/${availabilityId}`);
  },

  // ✅ UPDATE - Update a not-availability slot
  updateUnavailability: async (
    availabilityId: string,
    availabilityData: {
      VechileId: string;
      vechileType: 'Car' | 'Bike' | 'Auto';
      fromDate: string;
      toDate: string;
      fromTime?: string;
      toTime?: string;
      isNotAvailable?: boolean;
    }
  ) => {
    console.log("🔄 Update Unavailability - Input data:", availabilityData);

    const urlencoded = new URLSearchParams();
    urlencoded.append("VechileId", availabilityData.VechileId);
    urlencoded.append("vechileType", availabilityData.vechileType);
    urlencoded.append("fromDate", availabilityData.fromDate);
    urlencoded.append("toDate", availabilityData.toDate);
    urlencoded.append("fromTime", availabilityData.fromTime || "00:00");
    urlencoded.append("toTime", availabilityData.toTime || "23:59");
    urlencoded.append("isNotAvailable", String(availabilityData.isNotAvailable ?? true));

    console.log("🔄 Update Unavailability - Encoded Body:", urlencoded.toString());

    return apiClient.put(`/updateNotAvailability/${availabilityId}`, urlencoded, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  },

  // ✅ DELETE - Delete not-availability by ID
  deleteUnavailability: async (availabilityId: string) => {
    console.log("🗑️ Delete Unavailability - ID:", availabilityId);
    return apiClient.delete(`/deleteNotAvailability/${availabilityId}`);
  },
};

// ==================== USER APIs ====================

export const userAPI = {
  // Register/Update user profile (Backend: /register endpoint)
  register: async (userData: {
    googleId: string;
    name: string;
    mobilenumber: string;
    latitude: string;
    longitude: string;
    email: string;
    fcmToken: string;
    platform: string;
  }) => {
    console.log("📝 User Register API - Input data:", userData);
   
    // Backend expects application/x-www-form-urlencoded format
    const urlencoded = new URLSearchParams();
    Object.entries(userData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        urlencoded.append(key, String(value));
      }
    });
   
    console.log("📝 User Register API - URL Encoded:", urlencoded.toString());
   
    return apiClient.post('/register', urlencoded, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },
 
  // Get user profile
  getUserProfile: async (userId: string) => {
    return apiClient.get(`/users/${userId}`);
  },
 
  // Update user profile
  updateUserProfile: async (userId: string, userData: any) => {
    return apiClient.put(`/users/${userId}`, userData);
  },

  // Mark notification as read
  markNotificationRead: async (notificationId: string) => {
    return apiClient.put(`/notifications/${notificationId}/read`);
  },
};
 
// ✅ Export default service object WITH utils
const apiService = {
  car: carAPI,
  bike: bikeAPI,
  review: reviewAPI,
  booking: bookingAPI,
  availability: availabilityAPI,
  user: userAPI,
  utils: utils, // ✅ IMPORTANT: Export utils so it can be accessed as apiService.utils
};
 
export default apiService;