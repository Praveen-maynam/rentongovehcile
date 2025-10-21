import { create } from 'zustand';

export interface Review {
  id: string;
  vehicleId: string;
  userName: string;
  rating: number;
  location: string;
  comment: string;
  timestamp: Date;
}

interface ReviewState {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'timestamp'>) => void;
  getReviewsByVehicleId: (vehicleId: string) => Review[];
  getAverageRating: (vehicleId: string) => number;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [
    {
      id: '1',
      vehicleId: '1',
      userName: 'Manoj Kumar',
      rating: 5,
      location: 'Kakinada',
      comment: 'Excellent vehicle! Very smooth ride and the owner was very cooperative. Highly recommended for long trips.',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: '2',
      vehicleId: '1',
      userName: 'Rajesh Singh',
      rating: 4,
      location: 'Kakinada',
      comment: 'Great service and well maintained vehicle. Highly recommend!',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
    },
    {
      id: '3',
      vehicleId: '2',
      userName: 'Priya Sharma',
      rating: 4,
      location: 'Kakinada',
      comment: 'Good car for city drives. Owner was punctual and the car was clean.',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
    },
    {
      id: '4',
      vehicleId: '3',
      userName: 'Sneha Reddy',
      rating: 4,
      location: 'Kakinada',
      comment: 'Reliable auto rickshaw. Driver was professional and on time.',
      timestamp: new Date(Date.now() - 345600000), // 4 days ago
    },
    {
      id: '5',
      vehicleId: '5',
      userName: 'Amit Patel',
      rating: 5,
      location: 'Bangalore',
      comment: 'Honda City is perfect! Comfortable seats and smooth driving experience.',
      timestamp: new Date(Date.now() - 432000000), // 5 days ago
    },
    {
      id: '6',
      vehicleId: '5',
      userName: 'Kavita Nair',
      rating: 4,
      location: 'Bangalore',
      comment: 'Very good car. Owner was helpful and explained everything clearly.',
      timestamp: new Date(Date.now() - 518400000), // 6 days ago
    },
    {
      id: '7',
      vehicleId: '6',
      userName: 'Ramesh Babu',
      rating: 5,
      location: 'Bangalore',
      comment: 'Best Innova for family trips! Spacious and comfortable. Will book again.',
      timestamp: new Date(Date.now() - 604800000), // 7 days ago
    },
    {
      id: '8',
      vehicleId: '7',
      userName: 'Sanjay Kumar',
      rating: 4,
      location: 'Hyderabad',
      comment: 'XUV500 is a beast! Great for highway trips. Loved the experience.',
      timestamp: new Date(Date.now() - 691200000), // 8 days ago
    },
    {
      id: '9',
      vehicleId: '8',
      userName: 'Deepika Reddy',
      rating: 4,
      location: 'Hyderabad',
      comment: 'Tata Nexon is good value for money. Compact and fuel efficient.',
      timestamp: new Date(Date.now() - 777600000), // 9 days ago
    },
  ],

  addReview: (review) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString() + Math.random().toString(36),
      timestamp: new Date(),
    };

    set((state) => ({
      reviews: [newReview, ...state.reviews],
    }));
  },

  getReviewsByVehicleId: (vehicleId: string) => {
    return get().reviews.filter((review) => review.vehicleId === vehicleId);
  },

  getAverageRating: (vehicleId: string) => {
    const vehicleReviews = get().reviews.filter((review) => review.vehicleId === vehicleId);
    if (vehicleReviews.length === 0) return 0;
    const sum = vehicleReviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / vehicleReviews.length).toFixed(1));
  },
}));
