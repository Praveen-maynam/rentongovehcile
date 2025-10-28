import { create } from "zustand";
import { Booking } from "../types/booking";

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  deleteBooking: (id: string) => void;
  getBookingById: (id: string) => Booking | undefined;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: [],

  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, { ...booking, id: crypto.randomUUID() }],
    })),

  deleteBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== id),
    })),

  getBookingById: (id) => get().bookings.find((b) => b.id === id),
}));
