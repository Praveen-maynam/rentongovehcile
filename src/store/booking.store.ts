import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Booking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  customerName: string;
  bookingDate: string;
  bookingTime: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  modelNo: string;
  status: 'Booked' | 'Picked' | 'Completed';
  price: string;
  contactNumber?: string;
  createdAt: number;
}

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  getBookingById: (id: string) => Booking | undefined;
  getBookingsByVehicleId: (vehicleId: string) => Booking[];
  getBookingsByVehicleName: (vehicleName: string) => Booking[];
  getBookingsByStatus: (status: Booking['status']) => Booking[];
}

export const useBookingStore = create<BookingStore>()(persist(
  (set, get) => ({
    bookings: [],
    
    addBooking: (booking) => {
      const newBooking: Booking = {
        ...booking,
        id: Date.now().toString() + Math.random().toString(36),
        createdAt: Date.now(),
      };
      set((state) => ({ bookings: [...state.bookings, newBooking] }));
    },
    
    updateBooking: (id, updates) => {
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === id ? { ...booking, ...updates } : booking
        ),
      }));
    },
    
    deleteBooking: (id) => {
      set((state) => ({
        bookings: state.bookings.filter((booking) => booking.id !== id),
      }));
    },
    
    getBookingById: (id) => {
      return get().bookings.find((booking) => booking.id === id);
    },
    
    getBookingsByVehicleId: (vehicleId) => {
      return get().bookings.filter((booking) => booking.vehicleId === vehicleId);
    },
    
    getBookingsByVehicleName: (vehicleName) => {
      return get().bookings.filter((booking) => booking.vehicleName === vehicleName);
    },
    
    getBookingsByStatus: (status) => {
      return get().bookings.filter((booking) => booking.status === status);
    },
  }),
  {
    name: 'booking-storage',
  }
));