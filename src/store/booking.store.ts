// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { Booking } from "../types/booking";
 
// // ✅ Centralized type for all possible booking statuses
// export type BookingStatus =
//   | "Booked"
//   | "Cancelled"
//   | "Picked"
//   | "Completed"
//   | "YourNewStatus"; // 👈 Add any new status here
 
// // ✅ Store definition interface
// interface BookingStore {
//   bookings: Booking[];
//   addBooking: (booking: Booking) => void;
//   updateBooking: (id: string, updates: Partial<Booking>) => void;
//   updateBookingStatus: (id: string, status: BookingStatus) => void;
//   deleteBooking: (id: string) => void;
//   getBookingById: (id: string) => Booking | undefined;
//   clearAllBookings: () => void;
//   setBookings: (bookings: Booking[]) => void;
// }
 
// // ✅ Zustand store with localStorage persistence
// export const useBookingStore = create<BookingStore>()(
//   persist(
//     (set, get) => ({
//       bookings: [],
 
//       // ➕ Add a new booking (avoids duplicates)
//       addBooking: (booking) =>
//         set((state) => {
//           const exists = state.bookings.some((b) => b.id === booking.id);
//           if (exists) {
//             console.log("⚠️ Booking already exists, skipping:", booking.id);
//             return state;
//           }
//           console.log("✅ Adding new booking:", booking.id);
//           return {
//             bookings: [...state.bookings, booking],
//           };
//         }),
 
//       // 🔄 Update booking details
//       updateBooking: (id, updates) =>
//         set((state) => ({
//           bookings: state.bookings.map((booking) =>
//             booking.id === id ? { ...booking, ...updates } : booking
//           ),
//         })),
 
//       // 🔁 Update booking status only
//       updateBookingStatus: (id, status) =>
//         set((state) => {
//           console.log(`📝 Updating booking ${id} status to: ${status}`);
//           return {
//             bookings: state.bookings.map((booking) =>
//               booking.id === id ? { ...booking, status } : booking
//             ),
//           };
//         }),
 
//       // 🗑 Delete booking
//       deleteBooking: (id) =>
//         set((state) => ({
//           bookings: state.bookings.filter((booking) => booking.id !== id),
//         })),
 
//       // 🔍 Get booking by ID
//       getBookingById: (id) => get().bookings.find((booking) => booking.id === id),
 
//       // ⚙️ Clear all stored bookings
//       clearAllBookings: () =>
//         set(() => ({
//           bookings: [],
//         })),

//       // 🔄 Replace all bookings with new data (for API sync)
//       setBookings: (bookings) =>
//         set(() => {
//           console.log(`📦 Syncing ${bookings.length} bookings from API`);
//           return { bookings };
//         }),
//     }),
//     {
//       name: "booking-storage", // localStorage key
//       version: 1,
//     }
//   )
// );
 
 import { create } from "zustand";
import { persist } from "zustand/middleware";

// ✅ Export BookingStatus with ALL possible statuses used in your app
export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Cancelled"
  | "Rejected"
  | "AutoCancelled"
  | "Picked"
  | "Completed"
  | "Booked"
  | "YourNewStatus";

// ✅ Export Booking interface
export interface Booking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  vehicleType: "Car" | "Auto" | "Bike";
  customerName: string;
  contactNumber: string;
  bookingDate: string;
  bookingTime: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  modelNo: string;
  status: BookingStatus;
  price: number;
}

// ✅ Store definition interface
interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  deleteBooking: (id: string) => void;
  getBookingById: (id: string) => Booking | undefined;
  clearAllBookings: () => void;
  setBookings: (bookings: Booking[]) => void;
}
// ✅ Zustand store with localStorage persistence
export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],
      // ➕ Add a new booking (avoids duplicates)
      addBooking: (booking) =>
        set((state) => {
          const exists = state.bookings.some((b) => b.id === booking.id);
          if (exists) {
            console.log("⚠️ Booking already exists, skipping:", booking.id);
            return state;
          }
          console.log("✅ Adding new booking:", booking.id);
          return {
            bookings: [...state.bookings, booking],
          };
        }),
      // 🔄 Update booking details
      updateBooking: (id, updates) =>
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === id ? { ...booking, ...updates } : booking
          ),
        })),
      // 🔁 Update booking status only
      updateBookingStatus: (id, status) =>
        set((state) => {
          console.log(`📝 Updating booking ${id} status to: ${status}`);
          return {
            bookings: state.bookings.map((booking) =>
              booking.id === id ? { ...booking, status } : booking
            ),
          };
        }),
      // 🗑 Delete booking
      deleteBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((booking) => booking.id !== id),
        })),

      // 🔍 Get booking by ID
      getBookingById: (id) => get().bookings.find((booking) => booking.id === id),

      // ⚙️ Clear all stored bookings
      clearAllBookings: () =>
        set(() => ({
          bookings: [],
        })),

      // 🔄 Replace all bookings with new data (for API sync)
      setBookings: (bookings) =>
        set(() => {
          console.log(`📦 Syncing ${bookings.length} bookings from API`);
          return { bookings };
        }),
    }),
    {
      name: "booking-storage", // localStorage key
      version: 1,
    }
  )
);
