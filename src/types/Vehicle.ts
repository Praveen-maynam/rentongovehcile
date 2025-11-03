export interface Vehicle {
  id: string;
  name: string;
  price: number;
  transmission: string;
  fuel: string;
  seats?: number;        // ✅ made optional
  location?: string;
  rating: number;
  available?: boolean;
  image: string;
  description?: string;
  model?: string;
  cc?: string;           // ✅ added for bikes
  type?: "car" | "bike";
  contactName?: string;
  contactNumber?: string;
  bikeNumber?: string;
}
