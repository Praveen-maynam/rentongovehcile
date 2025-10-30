// export type VehicleType = "Car" | "Auto" | "Bike";
export type VehicleType = "Car" | "Bike";
export interface Booking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  vehicleType: VehicleType;
  price: number;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  status: "Booked" | "Cancelled" | "Picked" | "Completed";

  // Extra fields for listing bookings
  customerName?: string;
  contactNumber?: string;
  bookingDate?: string;
  bookingTime?: string;
  modelNo?: string;
}
