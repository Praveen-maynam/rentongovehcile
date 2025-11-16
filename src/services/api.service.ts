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

 updateCarById: async (carId: string, carData: FormData) => {
  return apiClient.put(`/updateCar/${carId}`, carData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
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

/// ==================== BIKE APIs ====================

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

  // // ✅ Update bike by ID
  // updateBikeById: async (bikeId: string, bikeData: FormData) => {
  //   return apiClient.put(`/updateBikeById/${bikeId}`, bikeData, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   });
  // },
  // ✅ Update bike by ID - FIXED ENDPOINT
  updateBikeById: async (bikeId: string, bikeData: FormData) => {
  return apiClient.put(`/updateBike/${bikeId}`, bikeData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
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

//   // ✅ Get all bikes owned by a specific owner
//   //    (Fix for getMyVehicles error in ListedBikes.tsx)
//   getMyVehicles: async (userId: string) => {
//     return apiClient.get(`/getBikeByOwner/${userId}`);
//   },
// };


// ✅ CORRECT (matches your backend)
getMyVehicles: async (userId: string) => {
  return apiClient.get(`/myVehicles/${userId}`);
}
};
// ==================== REVIEW APIs ====================

// ==================== REVIEW APIs ====================

export const reviewAPI = {
  // Create a new review - Backend expects application/x-www-form-urlencoded
  createReview: async (reviewData: {
    userId: string;
    vehicleId: string;
    vehicleType: string;
    bookingId?: string;
    rating: number;
    
    comment: string;
  }) => {
    console.log("📝 Creating review with data:", reviewData);
    
    // Backend expects URL-encoded format with specific field names
    const urlencoded = new URLSearchParams();
urlencoded.append('userId', reviewData.userId);
urlencoded.append('vechileType', reviewData.vehicleType); // Backend uses 'vechileType'
urlencoded.append('VechileId', reviewData.vehicleId); // Backend uses 'VechileId'
urlencoded.append('BookingId', reviewData.bookingId || 'TEMP-BOOKING-ID');

urlencoded.append('review', reviewData.comment);
urlencoded.append('rating', String(reviewData.rating));

    
    console.log("📤 URL Encoded payload:", urlencoded.toString());
    
    return apiClient.post('/addReview', urlencoded, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },

  // Get reviews for a vehicle - Backend expects GET with query params
  getReviewsByVehicle: async (vehicleId: string, vehicleType: string) => {
    console.log("🔍 Fetching reviews for vehicle:", { vehicleId, vehicleType });
    
    return apiClient.get('/getReview', {
      params: {
        VechileId: vehicleId,  // Backend uses 'VechileId'
        vechileType: vehicleType, // Backend uses 'vechileType'
      },
    });
  },

  // Get reviews by car ID (legacy endpoint)
  getReviewsByCarId: async (carId: string) => {
    return apiClient.get(`/getReviewById/${carId}`);
  },

  // Update review by ID - Backend expects FormData
  updateReviewById: async (reviewId: string, reviewData: {
    rating?: number;
    comment?: string;
    carId?: string;
    bikeId?: string;
    autoId?: string;
  }) => {
    console.log("🔄 Updating review:", { reviewId, reviewData });
    
    // Backend expects FormData format with specific field names
    const formData = new FormData();
    
    if (reviewData.autoId !== undefined) {
      formData.append('AutoId', reviewData.autoId || '');
    }
    if (reviewData.bikeId !== undefined) {
      formData.append('BikeId', reviewData.bikeId || '');
    }
    if (reviewData.carId !== undefined) {
      formData.append('CarId', reviewData.carId || '');
    }
    if (reviewData.comment !== undefined) {
      formData.append('reviewText', reviewData.comment); // Backend uses 'reviewText'
    }
    if (reviewData.rating !== undefined) {
      formData.append('rating', String(reviewData.rating));
    }
    
    console.log("📤 FormData payload prepared");
    
    return apiClient.put(`/updateReview/${reviewId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Get average rating for a vehicle - Backend expects GET with query params
  getAverageRating: async (vehicleId: string, vehicleType: string) => {
    console.log("📊 Fetching average rating:", { vehicleId, vehicleType });
    
    return apiClient.get('/getAverageRating', {
      params: {
        vechileId: vehicleId,  // Backend uses 'vechileId' (lowercase v)
        vechileType: vehicleType, // Backend uses 'vechileType'
      },
    });
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

  // Delete booking by ID
  deleteBooking: async (bookingId: string) => {
    return apiClient.delete(`/bookings/${bookingId}`);
  },

  // Get bookings for vehicle owner
  getMyListingBookings: async (ownerId: string) => {
    return apiClient.get(`/bookings/owner/${ownerId}`);
  },
};

// ==================== AVAILABILITY APIs ====================

export const availabilityAPI = {
  // Create unavailable slot (marks vehicle as not available)
  createUnavailability: async (availabilityData: {
    VechileId: string;
    vechileType: 'Car' | 'Bike' | 'Auto';
    fromDate: string;
    toDate: string;
    fromTime?: string;
    toTime?: string;
    isNotAvailable?: boolean;
  }) => {
    console.log("🚫 Create Unavailability - Input data:", availabilityData);
    
    // Backend expects application/x-www-form-urlencoded format
    const urlencoded = new URLSearchParams();
    urlencoded.append('VechileId', availabilityData.VechileId);
    urlencoded.append('vechileType', availabilityData.vechileType);
    urlencoded.append('fromDate', availabilityData.fromDate);
    urlencoded.append('toDate', availabilityData.toDate);
    if (availabilityData.fromTime) urlencoded.append('fromTime', availabilityData.fromTime);
    if (availabilityData.toTime) urlencoded.append('toTime', availabilityData.toTime);
    urlencoded.append('isNotAvailable', String(availabilityData.isNotAvailable ?? true));
    
    console.log("🚫 Create Unavailability - URL Encoded:", urlencoded.toString());
    
    return apiClient.post('/createNotAvailability', urlencoded, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },

  // Get unavailability by ID
  getUnavailabilityById: async (availabilityId: string) => {
    return apiClient.get(`/getNotAvailabilityById/${availabilityId}`);
  },

  // Get vehicle availability (check if vehicle is available for date range)
  getVehicleAvailability: async (
    VechileId: string, 
    vechileType: 'Car' | 'Bike' | 'Auto',
    startDate: string,
    endDate: string
  ) => {
    return apiClient.get('/getVehicleAvailability', {
      params: { 
        VechileId, 
        vechileType, 
        startDate, 
        endDate 
      },
    });
  },

  // Update unavailability by ID
  updateUnavailability: async (
    availabilityId: string, 
    availabilityData: {
      VechileId?: string;
      vechileType?: 'Car' | 'Bike' | 'Auto';
      fromDate?: string;
      toDate?: string;
      fromTime?: string;
      toTime?: string;
      isNotAvailable?: boolean;
    }
  ) => {
    console.log("🔄 Update Unavailability - Input data:", availabilityData);
    
    // Backend expects application/x-www-form-urlencoded format
    const urlencoded = new URLSearchParams();
    Object.entries(availabilityData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        urlencoded.append(key, String(value));
      }
    });
    
    console.log("🔄 Update Unavailability - URL Encoded:", urlencoded.toString());
    
    return apiClient.put(`/updateNotAvailability/${availabilityId}`, urlencoded, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },

  // Delete unavailability by ID
  deleteUnavailability: async (availabilityId: string) => {
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

// Export default service object
const apiService = {
  car: carAPI,
  bike: bikeAPI,
  review: reviewAPI,
  booking: bookingAPI,
  availability: availabilityAPI,
  user: userAPI,
};

export default apiService;



