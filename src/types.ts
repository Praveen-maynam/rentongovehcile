export interface Car {
  model: string;
  price: number;
  fuelType: string;
  status: "Available" | "Booked" | "Unavailable";
  imageUrl: string;
}
