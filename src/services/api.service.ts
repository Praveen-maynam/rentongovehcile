
import axios from 'axios';

// ✅ Export API_BASE_URL so it can be used in components
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://3.110.122.127:3000';

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
  createCar: async (carData: FormData) => {
    return apiClient.post('/createCar', carData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getCarById: async (carId: string) => {
    return apiClient.get(`/getCarById/${carId}`);
  },

  updateCarById: async (carId: string, carData: FormData) => {
    console.log("🚀 API Service - Update Car Request");
    console.log("  Car ID:", carId);
    console.log("  Endpoint:", `/updateCar/${carId}`);

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

  deleteCarById: async (carId: string) => {
    return apiClient.delete(`/deleteCar/${carId}`);
  },

  getNearbyCars: async (latitude: number, longitude: number) => {
    return apiClient.get('/getNearbyCars', {
      params: { latitude, longitude },
    });
  },

  getMyVehicles: async (userId: string) => {
    return apiClient.get(`/myVehicles/${userId}`);
  },
};

// ==================== BIKE APIs ====================
export const bikeAPI = {
  createBike: async (bikeData: FormData) => {
    return apiClient.post('/createBike', bikeData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getBikeById: async (bikeId: string) => {
    return apiClient.get(`/getBikeById/${bikeId}`);
  },

  updateBikeById: async (bikeId: string, bikeData: FormData) => {
    console.log("🚀 API Service - Update Bike Request");
    console.log("  Bike ID:", bikeId);
    console.log("  Endpoint:", `/updateBike/${bikeId}`);

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

  deleteBikeById: async (bikeId: string) => {
    return apiClient.delete(`/deleteBike/${bikeId}`);
  },

  getNearbyBikes: async (latitude: number, longitude: number, range?: number) => {
    return apiClient.get('/getNearbyBikes', {
      params: { latitude, longitude, range: range || 5 },
    });
  },

  getMyVehicles: async (userId: string) => {
    return apiClient.get(`/myVehicles/${userId}`);
  }
};

// ==================== REVIEW APIs ====================
export const reviewAPI = {
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

  getReviewsByCarId: async (vehicleId: string) => {
    return apiClient.get(`/getReviewById/${vehicleId}`);
  },

  getReviewsByBikeId: async (bikeId: string) => {
    return apiClient.get(`/getReviewById/${bikeId}`);
  },

  updateReviewById: async (reviewId: string, reviewData: {
    rating?: number;
    comment?: string;
  }) => {
    return apiClient.put(`/updateReview/${reviewId}`, reviewData);
  },

  getAverageRating: async (vehicleId: string, vehicleType: 'car' | 'bike') => {
    const capitalizedType = vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1);
    return apiClient.get('/getAverageRating', {
      params: {
        vechileType: capitalizedType,
        vechileId: vehicleId
      }
    });
  },

  getUserRating: async (userId: string, vehicleId: string) => {
    return apiClient.get(`/reviews/user/${userId}/vehicle/${vehicleId}`);
  },

  deleteReview: async (reviewId: string) => {
    return apiClient.delete(`/reviews/${reviewId}`);
  },
};

// ==================== BOOKING APIs ====================
export const bookingAPI = {
  createBooking: async (bookingData: any) => {
    console.log("📦 API Service - Input bookingData:", bookingData);

    const backendPayload = bookingData.VechileId ? bookingData : {
      VechileId: bookingData.vehicleId,
      vechileType: bookingData.vehicleType,
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
      CarNumber: bookingData.CarNumber || '',
      fuelType: bookingData.fuelType || '',
      transmissionType: bookingData.transmissionType || '',
      seatingCapacity: bookingData.seatingCapacity || '',
      pickupAddress: bookingData.pickupLocation || bookingData.pickupAddress || '',
      dropoffAddress: bookingData.dropoffLocation || bookingData.dropoffAddress || '',
    };

    console.log("📦 API Service - Transformed payload:", backendPayload);

    const urlencoded = new URLSearchParams();
    Object.entries(backendPayload).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        urlencoded.append(key, String(value));
      }
    });

    console.log("📦 API Service - URL Encoded body:", urlencoded.toString());

    return apiClient.post('/createBooking', urlencoded, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },

  getAllBookings: async (userId: string) => {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📥 GET ALL BOOKINGS - START");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("User ID:", userId);

    const endpoint = `/getAllBookings?userId=${userId}`;
    const fullUrl = `${API_BASE_URL}${endpoint}`;

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

        const data = proxyData.contents
          ? JSON.parse(proxyData.contents)
          : proxyData;

        console.log("✅ CORS Proxy Success:", data);
        return data;
      } catch (proxyError: any) {
        console.warn(`⚠️ Proxy ${i + 1} failed:`, proxyError.message);
      }
    }

    console.error("❌ All strategies failed");
    throw new Error('Unable to fetch bookings. Please check your connection and try again.');
  },

  getBookingById: async (bookingId: string) => {
    return apiClient.get(`/getBookingById/${bookingId}`);
  },

  updateBooking: async (bookingId: string, bookingData: {
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    status?: string;
  }) => {
    return apiClient.put(`/bookings/${bookingId}`, bookingData);
  },

  getPendingBookingsOfOwner: async (ownerId: string) => {
    return apiClient.get(`/getPendingBookingsOfOwner/${ownerId}`);
  },

  confirmBooking: async (bookingId: string) => {
    return apiClient.post(`/confirmBooking/${bookingId}/conform`);
  },

  cancelBooking: async (bookingId: string) => {
    return apiClient.post(`/confirmBooking/${bookingId}/Cancelled`);
  },

  deleteBooking: async (bookingId: string) => {
    return apiClient.delete(`/deleteBooking/${bookingId}`);
  },

  getMyListingBookings: async (ownerId: string) => {
    return apiClient.get(`/bookings/owner/${ownerId}`);
  },
};

// ==================== AVAILABILITY APIs ====================
export const availabilityAPI = {
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

  getUnavailabilityById: async (availabilityId: string) => {
    console.log("📄 Get Unavailability By ID:", availabilityId);
    return apiClient.get(`/getNotAvailabilityById/${availabilityId}`);
  },

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

  deleteUnavailability: async (availabilityId: string) => {
    console.log("🗑️ Delete Unavailability - ID:", availabilityId);
    return apiClient.delete(`/deleteNotAvailability/${availabilityId}`);
  },
};

// ==================== USER APIs ====================
export const userAPI = {
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

  getUserProfile: async (userId: string) => {
    return apiClient.get(`/users/${userId}`);
  },

  updateUserProfile: async (userId: string, userData: any) => {
    return apiClient.put(`/users/${userId}`, userData);
  },
};

// ==================== NOTIFICATION APIs ====================
export const notificationAPI = {
  getNotifications: async (userId: string) => {
    console.log("🔔 Get Notifications for user:", userId);
    return apiClient.get(`/getNotifications/${userId}`);
  },

  getUnreadCount: async (userId: string) => {
    console.log("🔔 Get Unread Count for user:", userId);
    return apiClient.get(`/getUnreadNotificationsCount/${userId}`);
  },

  markAsRead: async (notificationId: string) => {
    console.log("🔔 Mark notification as read:", notificationId);
    return apiClient.put(`/markNotificationRead/${notificationId}`);
  },

  markAllAsRead: async (userId: string) => {
    console.log("🔔 Mark all notifications as read for user:", userId);
    return apiClient.put(`/markAllNotificationsRead/${userId}`);
  },

  deleteNotification: async (notificationId: string) => {
    console.log("🔔 Delete notification:", notificationId);
    return apiClient.delete(`/deleteNotification/${notificationId}`);
  },

  clearAllNotifications: async (userId: string) => {
    console.log("🔔 Clear all notifications for user:", userId);
    return apiClient.delete(`/clearAllNotifications/${userId}`);
  },
};

// ==================== SUPPORT TICKET INTERFACES ====================
export interface TicketFormData {
  issue: string;
  vehicle: string;
  description: string;
  name: string;
  mobile?: string;
  photos?: File[];
}

// ==================== SUPPORT TICKET APIs ====================
export const ticketAPI = {
  getTicketsByUser: async (userId: string) => {
    console.log("🎫 Get Tickets for user:", userId);
    return apiClient.get(`/getTicketsByUser/${userId}`);
  },

  createTicket: async (data: TicketFormData) => {
    console.log("🎫 Create Ticket:", data);

    const userId = localStorage.getItem('userId') || '690c9fb0e524c979c76104c9';
    const vehicleId = localStorage.getItem('vehicleId') || '690dcd0ce524c979c76122c7';
    const bookingId = localStorage.getItem('bookingId') || '691448d706702f6b9f792c2b';
    const vehicleType = data.vehicle || 'Car';

    const body = new URLSearchParams();
    body.append("userId", userId);
    body.append("vehicleType", vehicleType);
    body.append("vehicleId", vehicleId);
    body.append("bookingId", bookingId);
    body.append("subject", data.issue);
    body.append("description", data.description);

    const response = await fetch(`${API_BASE_URL}/createTicket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body,
    });

    const resultText = await response.text();

    let parsedResult;
    try {
      parsedResult = JSON.parse(resultText);
    } catch {
      parsedResult = { success: false, message: 'Invalid response format' };
    }

    if (parsedResult.success || response.ok) {
      return parsedResult;
    } else {
      throw new Error(parsedResult.message || 'Failed to create ticket');
    }
  },

  updateTicket: async (ticketId: string, ticketData: {
    status?: string;
    priority?: string;
    response?: string;
  }) => {
    console.log("🎫 Update Ticket:", ticketId, ticketData);
    return apiClient.put(`/updateTicket/${ticketId}`, ticketData);
  },

  deleteTicket: async (ticketId: string) => {
    console.log("🎫 Delete Ticket:", ticketId);
    return apiClient.delete(`/deleteTicket/${ticketId}`);
  },
};

// ==================== CHAT INTERFACES & SERVICE ====================
export interface ChatMessage {
  _id?: string;
  senderId: string;
  receiverId: string | null;
  message: string;
  files?: string[];
  seen?: boolean;
  timestamp: string;
}

export interface VehicleBooking {
  _id: string;
  vehicleId: string;
  vehicleType: string;
  userId: string;
}

export class ApiService {
  public apiUrl: string;

  constructor(apiUrl: string = API_BASE_URL) {
    this.apiUrl = apiUrl;
  }

  async getMessages(bookingId: string): Promise<ChatMessage[]> {
    try {
      console.log("📥 ApiService.getMessages - bookingId:", bookingId);

      const res = await fetch(`${this.apiUrl}/getMessages/${bookingId}`, {
        method: "GET",
        redirect: "follow",
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("✅ ApiService.getMessages - Response:", data);

      return Array.isArray(data) ? data : data.messages || [];
    } catch (err) {
      console.error("❌ ApiService.getMessages - Error:", err);
      throw err;
    }
  }

  async sendMessage(
    bookingId: string,
    senderId: string,
    receiverId: string,
    message: string,
    files: File[] = []
  ): Promise<ChatMessage> {
    try {
      console.log("📤 ApiService.sendMessage - Params:", {
        bookingId,
        senderId,
        receiverId,
        message,
        filesCount: files.length
      });

      const formData = new FormData();
      formData.append("bookingId", bookingId);
      formData.append("senderId", senderId);
      formData.append("receiverId", receiverId);
      formData.append("message", message);

      files.forEach((file) => formData.append("files", file));

      const res = await fetch(`${this.apiUrl}/sendMessage`, {
        method: "POST",
        body: formData,
        redirect: "follow",
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("✅ ApiService.sendMessage - Response:", data);

      if (!data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      return data.message;
    } catch (err) {
      console.error("❌ ApiService.sendMessage - Error:", err);
      throw err;
    }
  }

  async getMyVehicleBookings(
    userId: string,
    vehicleType: string,
    vehicleId: string
  ): Promise<VehicleBooking[]> {
    try {
      console.log("📥 ApiService.getMyVehicleBookings - Params:", {
        userId,
        vehicleType,
        vehicleId
      });

      const res = await fetch(
        `${this.apiUrl}/myVehicleBookings/${userId}?vechileType=${vehicleType}&VechileId=${vehicleId}`,
        {
          method: "GET",
          redirect: "follow",
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("✅ ApiService.getMyVehicleBookings - Response:", data);

      return data || [];
    } catch (err) {
      console.error("❌ ApiService.getMyVehicleBookings - Error:", err);
      throw err;
    }
  }
}

export const chatService = new ApiService(API_BASE_URL);

// ==================== REGISTER USER ====================
export interface RegisterPayload {
  googleId: string;
  name: string;
  email: string;
  fcmToken?: string;
}

export interface RegisterResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    googleId: string;
    fcmToken?: string;
  };
  message?: string;
}

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

// ==================== STANDALONE EXPORTS ====================
export const confirmBooking = async (bookingId: string) => {
  const res = await fetch(`${API_BASE_URL}/confirmBooking/${bookingId}/conform`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to confirm booking");
  return res.json();
};

export const cancelBooking = async (bookingId: string) => {
  const res = await fetch(`${API_BASE_URL}/confirmBooking/${bookingId}/Cancelled`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to cancel booking");
  return res.json();
};

export const createTicket = ticketAPI.createTicket;

// ✅ FINAL DEFAULT EXPORT - All APIs defined above
const apiService = {
  car: carAPI,
  bike: bikeAPI,
  review: reviewAPI,
  booking: bookingAPI,
  availability: availabilityAPI,
  user: userAPI,
  notification: notificationAPI,
  ticket: ticketAPI,
  chat: chatService,
  utils: utils,
};

export default apiService;