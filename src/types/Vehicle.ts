export interface Vehicle {
  id: string;
  name: string;
  price: number;
  transmission: string;
  fuel: string;
  seats: number;
  location?: string;
  rating: number;
  available?: boolean;
  image: string;
  type?: "car" | "auto";
}
