import { useNotificationStore } from '../../store/notification.store';
import { BookingStatus } from './bookings.types';
import axios from "axios";
// Simulated API endpoint for now
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://3.110.122.127:3000/api';

export interface CreateBookingParams {
  vehicleId: string;
  vehicleName: string;
  startDate: Date;
  endDate: Date;
  userId: string;
}

export interface Booking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const bookingsApi = {
  createBooking: async (params: CreateBookingParams): Promise<Booking> => {
    try {
      // In production, this would be a real API call
      const response = {
        id: Date.now().toString(),
        ...params,
        status: BookingStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add booking confirmation notification
      useNotificationStore.getState().addNotification({
        type: 'booking_confirmed',
        title: 'Car Booking Request',
        message: `your car has been booked?`,
        vehicleId: params.vehicleId,
        vehicleName: params.vehicleName,
        bookingId: response.id
      });

      return response;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  confirmBooking: async (bookingId: string): Promise<void> => {
    try {
      // In production, this would be a real API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      useNotificationStore.getState().addNotification({
        type: 'booking_confirmed',
        title: 'Booking Confirmed',
        message: 'Your booking has been confirmed by the owner.',
        bookingId
      });
    } catch (error) {
      console.error('Error confirming booking:', error);
      throw error;
    }
  },

  completeRide: async (bookingId: string, vehicleId: string, vehicleName: string): Promise<void> => {
    try {
      // In production, this would be a real API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      useNotificationStore.getState().addNotification({
        type: 'ride_completed',
        title: 'Ride Completed',
        message: 'Your Ride as been completed please give feedback.',
        vehicleId,
        vehicleName,
        bookingId,
        requiresFeedback: true
      });
    } catch (error) {
      console.error('Error completing ride:', error);
      throw error;
    }
  },

  cancelBooking: async (bookingId: string): Promise<void> => {
    try {
      // In production, this would be a real API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      useNotificationStore.getState().addNotification({
        type: 'booking_declined',
        title: 'Booking Cancelled',
        message: 'Your booking has been cancelled.',
        bookingId
      });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  }
};



// import axios from "axios";
// import { useNotificationStore } from "../../store/notification.store";
// import { BookingStatus } from "./bookings.types";

// // 🧩 Your backend URL (update if needed)
// const API_URL = import.meta.env.VITE_API_URL || "http://3.110.122.127:3000";

// // ----------------------
// // INTERFACES
// // ----------------------
// export interface CreateBookingParams {
//   userId: string;
//   vehicleId: string;
//   vehicleName: string;
//   startDate: string;
//   endDate: string;
//   contactName: string;
//   contactNumber: string;
//   latitude?: string;
//   longitude?: string;
// }

// export interface Booking {
//   _id: string;
//   vehicleId: string;
//   vehicleName: string;
//   startDate: string;
//   endDate: string;
//   userId: string;
//   ownerId?: string;
//   status: BookingStatus;
//   createdAt: string;
//   updatedAt: string;
// }

// // ----------------------
// // API IMPLEMENTATION
// // ----------------------
// export const bookingsApi = {
//   // ✅ CREATE BOOKING
//   createBooking: async (params: CreateBookingParams): Promise<Booking> => {
//     try {
//       console.log("🚀 Creating booking:", params);

//       const response = await axios.post(`${API_URL}/createBooking`, params, {
//         headers: { "Content-Type": "application/json" },
//       });

//       const booking: Booking = response.data;

//       // 🔔 Add notification
//       useNotificationStore.getState().addNotification({
//         type: "booking_confirmed",
//         title: "Booking Request Sent",
//         message: `Your booking for ${params.vehicleName} has been requested successfully.`,
//         vehicleId: params.vehicleId,
//         vehicleName: params.vehicleName,
//         bookingId: booking._id,
//       });

//       return booking;
//     } catch (error: any) {
//       console.error("❌ Error creating booking:", error);
//       throw new Error(error?.response?.data?.message || "Failed to create booking");
//     }
//   },

//   // ✅ GET BOOKINGS FOR A SPECIFIC USER
//   getUserBookings: async (userId: string): Promise<Booking[]> => {
//     try {
//       console.log("📦 Fetching bookings for user:", userId);
//       const response = await axios.get(`${API_URL}/getUserBookings/${userId}`);
//       return response.data;
//     } catch (error: any) {
//       console.error("❌ Error fetching user bookings:", error);
//       throw new Error(error?.response?.data?.message || "Failed to fetch bookings");
//     }
//   },

//   // ✅ GET BOOKINGS FOR OWNER (the one who listed the vehicles)
//   getOwnerBookings: async (ownerId: string): Promise<Booking[]> => {
//     try {
//       console.log("📦 Fetching bookings for owner:", ownerId);
//       const response = await axios.get(`${API_URL}/getOwnerBookings/${ownerId}`);
//       return response.data;
//     } catch (error: any) {
//       console.error("❌ Error fetching owner bookings:", error);
//       throw new Error(error?.response?.data?.message || "Failed to fetch owner bookings");
//     }
//   },

//   // ✅ MARK BOOKING AS COMPLETED
//   completeRide: async (bookingId: string, vehicleId: string, vehicleName: string): Promise<void> => {
//     try {
//       await axios.put(`${API_URL}/completeBooking/${bookingId}`);

//       useNotificationStore.getState().addNotification({
//         type: "ride_completed",
//         title: "Ride Completed",
//         message: `Your ride for ${vehicleName} has been completed. Please leave feedback.`,
//         vehicleId,
//         vehicleName,
//         bookingId,
//         requiresFeedback: true,
//       });
//     } catch (error: any) {
//       console.error("❌ Error completing ride:", error);
//       throw new Error(error?.response?.data?.message || "Failed to complete ride");
//     }
//   },

//   // ✅ CONFIRM BOOKING (owner)
//   confirmBooking: async (bookingId: string): Promise<void> => {
//     try {
//       await axios.put(`${API_URL}/confirmBooking/${bookingId}`);

//       useNotificationStore.getState().addNotification({
//         type: "booking_confirmed",
//         title: "Booking Confirmed",
//         message: "Your booking has been confirmed by the owner.",
//         bookingId,
//       });
//     } catch (error: any) {
//       console.error("❌ Error confirming booking:", error);
//       throw new Error(error?.response?.data?.message || "Failed to confirm booking");
//     }
//   },
// };
