import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ✅ Define allowed vehicle types
export type VehicleType = 'vehicle' | 'car' | 'auto' | 'bike';

// ✅ Define Booking interface
export interface Booking {
  id: string;
  vehicleId: string;
  vehicleType: VehicleType; // ✅ keep only one type
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

// ✅ Store interface
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

// ✅ Zustand store with persistence
export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],

      // ➕ Add new booking
      addBooking: (booking) => {
        const newBooking: Booking = {
          ...booking,
          id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
          createdAt: Date.now(),
        };
        set((state) => ({ bookings: [...state.bookings, newBooking] }));
      },

      // 🔄 Update booking
      updateBooking: (id, updates) => {
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === id ? { ...booking, ...updates } : booking
          ),
        }));
      },

      // ❌ Delete booking
      deleteBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.filter((booking) => booking.id !== id),
        }));
      },

      // 🔍 Get booking by ID
      getBookingById: (id) => get().bookings.find((b) => b.id === id),

      // 🔍 Get bookings by vehicleId
      getBookingsByVehicleId: (vehicleId) =>
        get().bookings.filter((b) => b.vehicleId === vehicleId),

      // 🔍 Get bookings by vehicleName
      getBookingsByVehicleName: (vehicleName) =>
        get().bookings.filter((b) => b.vehicleName === vehicleName),

      // 🔍 Get bookings by status
      getBookingsByStatus: (status) =>
        get().bookings.filter((b) => b.status === status),
    }),
    {
      name: 'booking-storage', // persisted key in localStorage
    }
  )
);
