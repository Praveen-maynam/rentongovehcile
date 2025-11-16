export interface Vehicle {
  id: string;
  name?: string; // make optional
  bikeName?: string; // ✅ add this line
  price: number;
  transmission: string;
  fuel: string;
  seats?: number;
  location?: string;
  rating: number;
  available?: boolean;
  image: string;
  description?: string;
  model?: string;
  cc?: string;
  type?:"Car"|"Bike"|"Auto";
  contactName?: string;
  contactNumber?: string;
  bikeNumber?: string;
<<<<<<< HEAD
   distance: number;
=======
  distance?:string;
>>>>>>> 4b041fca879f812eed351c473026be6b8721efa3
  unavailableDates?: { startDate: string; endDate: string; startTime: string; endTime: string }[];
}
