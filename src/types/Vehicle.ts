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
<<<<<<< HEAD
  type?: "car" | "auto" |"bike";
=======
  type?: "car" | "auto" | "bike";
>>>>>>> 4aeffab8e1a0bddc7d50843caf921abcb758f1ec
}
