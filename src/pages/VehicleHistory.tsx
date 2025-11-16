


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import apiService from "../services/api.service";

// interface BookingHistory {
//   customerName: string;
//   startDate: string;
//   startTime: string;
//   endDate: string;
//   endTime: string;
//   mobile: string;
//   status: "Booked" | "Picked" | "Completed";
// }

// interface VehicleData {
//   _id: string;
//   CarName?: string;
//   CarModel?: string;
//   CarNumber?: string;
//   Carseater?: string;
//   RentPerHour?: number;
//   RentPerDay?: number;
//   carImages?: string[];
//   fuelType?: string;
//   transmissionType?: string;
//   Ac_available?: boolean;

//   bikeName?: string;
//   bikeModel?: string;
//   bikeNumber?: string;
//   pricePerKm?: number;
//   bikeImages?: string[];

//   description?: string;
//   contactName?: string;
//   contactNumber?: string;
//   Available?: boolean;
//   pickupCity?: string;
//   pickupCityState?: string;
//   pickupArea?: string;
// }

// const VehicleHistory: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { vehicleId } = useParams<{ vehicleId: string }>();

//   const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   // Get vehicle data from navigation state
//   const passedVehicleData = location.state?.vehicleData;
//   const passedVehicleType = location.state?.vehicleType;

//   // Determine vehicle type from passed data or from the vehicle structure
//   const vehicleType = 
//     passedVehicleType || 
//     (passedVehicleData?.CarName || passedVehicleData?.carImages ? "car" : "bike");

//   // Use vehicleId from URL params or from passed state
//   const finalVehicleId = vehicleId || passedVehicleData?._id || passedVehicleData?.id;

//   console.log("🔍 Vehicle History - Type:", vehicleType, "ID:", finalVehicleId);

//   useEffect(() => {
//     if (!finalVehicleId) {
//       setError("No vehicle ID provided");
//       setLoading(false);
//       return;
//     }

//     const fetchVehicleDetails = async () => {
//       try {
//         setLoading(true);
//         console.log(`📡 Fetching ${vehicleType} details for ID:`, finalVehicleId);

//         const response =
//           vehicleType === "car"
//             ? await apiService.car.getCarById(finalVehicleId)
//             : await apiService.bike.getBikeById(finalVehicleId);

//         // Extract data safely
//         const payload = response?.data ?? response;
//         const vehicle =
//           payload?.car ||
//           payload?.bike ||
//           payload?.data ||
//           payload?.vehicle ||
//           payload;

//         if (!vehicle || typeof vehicle !== "object") {
//           throw new Error("Invalid vehicle response format");
//         }

//         console.log("✅ Vehicle fetched successfully:", vehicle);
//         setVehicleData(vehicle);
//         setError("");
//       } catch (err: any) {
//         console.error("❌ Error fetching vehicle details:", err);
//         const errorMessage = err?.response?.data?.message || err?.message || "Failed to load vehicle details";
//         setError(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehicleDetails();
//   }, [finalVehicleId, vehicleType]);

//   // Dummy booking history
//   const bookingHistory: BookingHistory[] = [
//     {
//       customerName: "Manoj Kumar",
//       startDate: "30-10-2025",
//       startTime: "11 AM",
//       endDate: "30-10-2025",
//       endTime: "11 AM",
//       mobile: "1234567898",
//       status: "Booked",
//     },
//     {
//       customerName: "Rajesh Singh",
//       startDate: "28-10-2025",
//       startTime: "09 AM",
//       endDate: "29-10-2025",
//       endTime: "06 PM",
//       mobile: "9876543210",
//       status: "Completed",
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
//         <Loader2 className="animate-spin mb-4" size={48} />
//         <p className="text-gray-600">Loading vehicle details...</p>
//       </div>
//     );
//   }

//   if (error || !vehicleData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
//         <p className="text-red-600 text-lg mb-4">{error || "Vehicle not found"}</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   // Determine vehicle type & images
//   const isCar =
//     !!vehicleData.CarName || !!vehicleData.carImages || vehicleType === "car";

//   let vehicleImages =
//     (isCar ? vehicleData.carImages : vehicleData.bikeImages) || [];

//   vehicleImages = vehicleImages.filter(
//     (img) => img && img.trim() !== "" && img !== "undefined"
//   );

//   const dummyImages = [
//     "https://via.placeholder.com/400x300?text=Vehicle+Image+1",
//     "https://via.placeholder.com/400x300?text=Vehicle+Image+2",
//     "https://via.placeholder.com/400x300?text=Vehicle+Image+3",
//   ];

//   if (vehicleImages.length === 0) {
//     vehicleImages = dummyImages;
//   } else if (vehicleImages.length === 1) {
//     vehicleImages = [vehicleImages[0], ...dummyImages.slice(0, 2)];
//   }

//   // Derived display values
//   const displayName = isCar
//     ? vehicleData.CarName || "Unknown Vehicle"
//     : vehicleData.bikeName || "Unknown Bike";

//   const displayModel = isCar
//     ? vehicleData.CarModel || "N/A"
//     : vehicleData.bikeModel || "N/A";

//   const displayNumber = isCar
//     ? vehicleData.CarNumber || "N/A"
//     : vehicleData.bikeNumber || "N/A";

//   const displayPrice = isCar
//     ? `₹${vehicleData.RentPerHour || 0}/hr`
//     : `₹${vehicleData.pricePerKm || 0}/km`;

//   const displayLocation = `${vehicleData.pickupCity || "Unknown"}, ${
//     vehicleData.pickupCityState || ""
//   }`;

//   const handleBookingClick = (booking: BookingHistory) => {
//     navigate(`/booking-history/${finalVehicleId}`, {
//       state: { booking, vehicleData },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center">
//       <div className="max-w-[1228px] w-full flex flex-col md:flex-row gap-10">
//         {/* Left Section */}
//         <div className="flex flex-col md:flex-row bg-white p-6 rounded-2xl shadow-lg w-full md:w-[860px]">
//           {/* Image Gallery */}
//           <div className="relative w-full md:w-[409px] h-[309px] overflow-hidden rounded-xl shadow-md flex-shrink-0">
//             <img
//               src={vehicleImages[currentImageIndex]}
//               alt={`${displayName} ${currentImageIndex + 1}`}
//               className="w-full h-full object-cover transition-all duration-500"
//             />
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//               {vehicleImages.map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setCurrentImageIndex(idx)}
//                   className={`w-3 h-3 rounded-full ${
//                     idx === currentImageIndex
//                       ? "bg-white scale-110"
//                       : "bg-gray-400"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Vehicle Info */}
//           <div className="flex flex-col ml-0 md:ml-6 mt-6 md:mt-0">
//             <div className="flex items-center justify-between">
//               <h1 className="text-3xl font-semibold">{displayName}</h1>
//               <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-md">
//                 <span className="text-sm font-semibold text-yellow-800">★ 4.2</span>
//               </div>
//             </div>
//             <p className="text-sm text-gray-500 mt-1">
//               {displayModel} • {displayNumber}
//             </p>
//             <div className="flex items-baseline mt-3">
//               <span className="text-3xl font-bold text-blue-600">{displayPrice}</span>
//             </div>
//             <div className="flex items-center mt-4 border border-gray-300 rounded-xl overflow-hidden">
//               {isCar ? (
//                 <>
//                   <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                     🚗{" "}
//                     <p className="text-sm text-gray-700">
//                       {vehicleData.transmissionType || "Manual"}
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                     👥{" "}
//                     <p className="text-sm text-gray-700">
//                       {vehicleData.Carseater || "5"} Seater
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                     ⛽{" "}
//                     <p className="text-sm text-gray-700">
//                       {vehicleData.fuelType || "Petrol"}
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-center px-4 py-3">
//                     ❄️{" "}
//                     <p className="text-sm text-gray-700">
//                       {vehicleData.Ac_available ? "AC" : "Non-AC"}
//                     </p>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                     🏍️ <p className="text-sm text-gray-700">Bike</p>
//                   </div>
//                   <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                     ⛽ <p className="text-sm text-gray-700">Petrol</p>
//                   </div>
//                   <div className="flex flex-col items-center px-4 py-3">
//                     📍 <p className="text-sm text-gray-700">{displayLocation}</p>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Description */}
//             <div className="mt-6">
//               <h2 className="text-xl font-semibold mb-2">Description</h2>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {vehicleData.description || "No description available"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Booking History */}
//         <div className="w-full md:w-[350px] flex flex-col gap-4">
//           <h2 className="text-2xl font-semibold">Booking History</h2>
//           <div className="space-y-4">
//             {bookingHistory.map((booking, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => handleBookingClick(booking)}
//                 className="border border-gray-200 rounded-xl p-4 relative hover:shadow-md transition bg-white cursor-pointer"
//               >
//                 <h3 className="font-semibold text-gray-800 mb-2">
//                   {booking.customerName}
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   📅 {booking.startDate} - {booking.endDate}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   🕐 {booking.startTime} - {booking.endTime}
//                 </p>
//                 <p className="text-sm text-gray-600">📱 {booking.mobile}</p>
//                 <span
//                   className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
//                     booking.status === "Completed"
//                       ? "bg-green-100 text-green-700"
//                       : booking.status === "Picked"
//                       ? "bg-blue-100 text-blue-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {booking.status}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleHistory;


 
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import apiService from "../services/api.service";
 
const { car: carAPI, bike: bikeAPI, booking: bookingAPI } = apiService;
 
interface BookingHistory {
  _id: string;
  customerName?: string;
  contactName?: string;
  FromDate: string;
  ToDate: string;
  FromTime?: string;
  ToTime?: string;
  contactNumber?: string;
  status?: "Booked" | "Picked" | "Completed" | "pending" | "confirmed" | "cancelled";
  totalPrice?: number;
  userId?: string;
}
 
interface VehicleData {
  _id: string;
  CarName?: string;
  CarModel?: string;
  CarNumber?: string;
  Carseater?: string;
  RentPerHour?: number;
  RentPerDay?: number;
  carImages?: string[];
  fuelType?: string;
  transmissionType?: string;
  Ac_available?: boolean;
 
  bikeName?: string;
  bikeModel?: string;
  bikeNumber?: string;
  pricePerKm?: number;
  bikeImages?: string[];
 
  description?: string;
  contactName?: string;
  contactNumber?: string;
  Available?: boolean;
  pickupCity?: string;
  pickupCityState?: string;
  pickupArea?: string;
}
 
const VehicleHistory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicleName } = useParams<{ vehicleName: string }>();
 
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [bookingHistory, setBookingHistory] = useState<BookingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
 
  const passedVehicleData = location.state?.vehicleData;
  const vehicleType = passedVehicleData?.vehicleType ||
                      (passedVehicleData?.CarName ? "car" : "bike");
  const vehicleId = passedVehicleData?._id || passedVehicleData?.id;
 
  // ✅ Fetch vehicle details
  useEffect(() => {
    if (!vehicleId) {
      setError("No vehicle ID provided");
      setLoading(false);
      return;
    }
 
    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        setError("");
       
        let response: any;
       
        if (vehicleType === "car") {
          response = await carAPI.getCarById(vehicleId);
        } else {
          response = await bikeAPI.getBikeById(vehicleId);
        }
 
        console.log("📦 Vehicle API Response:", response);
 
        const data = response.car || response.bike || response.data || response;
       
        if (data) {
          setVehicleData(data);
        } else {
          throw new Error("Vehicle data not found");
        }
      } catch (err: any) {
        console.error("Error fetching vehicle details:", err);
        setError("Failed to load vehicle details");
      } finally {
        setLoading(false);
      }
    };
 
    fetchVehicleDetails();
  }, [vehicleId, vehicleType]);
 
// Fixed section of the useEffect for fetching booking history
 
useEffect(() => {
  if (!vehicleId) return;
 
  const fetchBookingHistory = async () => {
    try {
      setBookingsLoading(true);
     
      // Get current user's ID (vehicle owner)
      let userId = localStorage.getItem("userId") || "68f32259cea8a9fa88029262";
 
      console.log("🔍 Fetching bookings for vehicle:", vehicleId);
     
      // Fetch all bookings for the user
      const response: any = await bookingAPI.getAllBookings(userId);
     
      console.log("📦 All Bookings Response:", response);
 
      // ✅ FIXED: Access the data array correctly
      const bookingsData = response.data || response;
     
      if (Array.isArray(bookingsData)) {
        // ✅ FIXED: Extract the booking object from each item
        const allBookings = bookingsData.map((item: any) => item.booking || item);
       
        // Filter bookings for this specific vehicle
        const vehicleBookings = allBookings.filter(
          (booking: any) =>
            booking.VechileId === vehicleId ||
            booking.vehicleId === vehicleId ||
            booking.carId === vehicleId ||
            booking.bikeId === vehicleId
        );
 
        console.log("✅ Filtered bookings for this vehicle:", vehicleBookings);
 
        // Map to expected format
        const formattedBookings: BookingHistory[] = vehicleBookings.map((booking: any) => ({
          _id: booking._id,
          customerName: booking.contactName || booking.customerName || "Guest User",
          contactName: booking.contactName || "N/A",
          FromDate: formatDate(booking.FromDate) || "N/A",
          ToDate: formatDate(booking.ToDate) || "N/A",
          FromTime: booking.FromTime || booking.startTime || "N/A",
          ToTime: booking.ToTime || booking.endTime || "N/A",
          contactNumber: booking.contactNumber || booking.mobile || "N/A",
          status: booking.status || booking.bookingStatus || "Pending",
          totalPrice: booking.totalPrice || 0,
          userId: booking.userId,
        }));
 
        setBookingHistory(formattedBookings);
      } else {
        console.warn("No bookings array found in response");
        setBookingHistory([]);
      }
    } catch (err: any) {
      console.error("Error fetching booking history:", err);
      setBookingHistory([]);
    } finally {
      setBookingsLoading(false);
    }
  };
 
  fetchBookingHistory();
}, [vehicleId]);
 
// ✅ Helper function to format date
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};
 
 
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="text-gray-600">Loading vehicle details...</p>
      </div>
    );
  }
 
  if (error || !vehicleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-red-600 text-lg mb-4">{error || "Vehicle not found"}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }
 
  // ✅ Detect if it's a car
  const isCar = !!vehicleData.CarName || !!vehicleData.carImages || vehicleType === "car";
 
  // ✅ Get vehicle images
  let vehicleImages = (isCar ? vehicleData.carImages : vehicleData.bikeImages) || [];
 
  // ✅ Clean invalid entries
  vehicleImages = vehicleImages.filter(
    (img) => img && img.trim() !== "" && img !== "undefined"
  );
 
  // ✅ Dummy images (online placeholders)
  const dummyImages = [
    "https://via.placeholder.com/400x300?text=Vehicle+Image+1",
    "https://via.placeholder.com/400x300?text=Vehicle+Image+2",
    "https://via.placeholder.com/400x300?text=Vehicle+Image+3",
  ];
 
  // ✅ If empty, use dummies
  if (vehicleImages.length === 0) {
    vehicleImages = dummyImages;
  } else if (vehicleImages.length === 1) {
    vehicleImages = [vehicleImages[0], ...dummyImages.slice(0, 2)];
  }
 
  // ✅ Derived display values
  const displayName = isCar
    ? vehicleData.CarName || "Unknown Vehicle"
    : vehicleData.bikeName || "Unknown Bike";
 
  const displayModel = isCar
    ? vehicleData.CarModel || "N/A"
    : vehicleData.bikeModel || "N/A";
 
  const displayNumber = isCar
    ? vehicleData.CarNumber || "N/A"
    : vehicleData.bikeNumber || "N/A";
 
  const displayPrice = isCar
    ? `₹${vehicleData.RentPerHour || 0}/hr or ₹${vehicleData.RentPerDay || 0}/day`
    : `₹${vehicleData.pricePerKm || 0}/km`;
 
  const displayLocation = `${vehicleData.pickupCity || "Unknown"}, ${
    vehicleData.pickupCityState || ""
  }`;
 
  // ✅ Format status display
  const getStatusDisplay = (status?: string) => {
    const statusMap: Record<string, string> = {
      pending: "Booked",
      confirmed: "Confirmed",
      picked: "Picked",
      completed: "Completed",
      cancelled: "Cancelled",
      Booked: "Booked",
      Picked: "Picked",
      Completed: "Completed",
    };
    return statusMap[status || "pending"] || "Booked";
  };
 
  // ✅ Get status color
  const getStatusColor = (status?: string) => {
    const statusLower = (status || "").toLowerCase();
    if (statusLower === "completed") return "bg-green-100 text-green-700";
    if (statusLower === "picked" || statusLower === "confirmed") return "bg-blue-100 text-blue-700";
    if (statusLower === "cancelled") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };
 
  const handleBookingClick = (booking: BookingHistory) => {
    navigate(`/booking-details/${booking._id}`, {
      state: { booking, vehicleData },
    });
  };
 
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center">
      <div className="max-w-[1228px] w-full flex flex-col md:flex-row gap-10">
        {/* Left Section */}
        <div className="flex flex-col md:flex-row bg-white p-6 rounded-2xl shadow-lg w-full md:w-[860px]">
          <div className="relative w-full md:w-[409px] h-[309px] overflow-hidden rounded-xl shadow-md flex-shrink-0">
            {vehicleImages.length > 0 ? (
              <>
                <img
                  src={vehicleImages[currentImageIndex]}
                  alt={`${displayName} ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {vehicleImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-3 h-3 rounded-full ${
                        idx === currentImageIndex
                          ? "bg-white scale-110"
                          : "bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">No Image Available</span>
              </div>
            )}
          </div>
 
          {/* Vehicle Info */}
          <div className="flex flex-col ml-0 md:ml-6 mt-6 md:mt-0">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold">{displayName}</h1>
              <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-md">
                <span className="text-sm font-semibold text-yellow-800">★ 4.2</span>
              </div>
            </div>
 
            <p className="text-sm text-gray-500 mt-1">
              {displayModel} • {displayNumber}
            </p>
 
            <div className="flex items-baseline mt-3">
              <span className="text-xl font-bold text-blue-600">
                {displayPrice}
              </span>
            </div>
 
            {/* Specifications */}
            <div className="flex items-center mt-4 border border-gray-300 rounded-xl overflow-hidden">
              {isCar ? (
                <>
                  <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                    🚗
                    <p className="text-sm text-gray-700">
                      {vehicleData.transmissionType || "Manual"}
                    </p>
                  </div>
                  <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                    👥
                    <p className="text-sm text-gray-700">
                      {vehicleData.Carseater || "5"} Seater
                    </p>
                  </div>
                  <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                    ⛽
                    <p className="text-sm text-gray-700">
                      {vehicleData.fuelType || "Petrol"}
                    </p>
                  </div>
                  <div className="flex flex-col items-center px-4 py-3">
                    ❄️
                    <p className="text-sm text-gray-700">
                      {vehicleData.Ac_available ? "AC" : "Non-AC"}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                    🏍️ <p className="text-sm text-gray-700">Bike</p>
                  </div>
                  <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                    ⛽ <p className="text-sm text-gray-700">Petrol</p>
                  </div>
                  <div className="flex flex-col items-center px-4 py-3">
                    📍
                    <p className="text-sm text-gray-700">{displayLocation}</p>
                  </div>
                </>
              )}
            </div>
 
            {/* Description */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {vehicleData.description || "No description available"}
              </p>
            </div>
          </div>
        </div>
 
        {/* Booking History Section */}
        <div className="w-full md:w-[350px] flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Booking History</h2>
         
          {bookingsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
              <span className="ml-2 text-gray-600">Loading bookings...</span>
            </div>
          ) : bookingHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No bookings found for this vehicle</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookingHistory.map((booking) => (
                <div
                  key={booking._id}
                  onClick={() => handleBookingClick(booking)}
                  className="border border-gray-200 rounded-xl p-4 relative hover:shadow-md transition bg-white cursor-pointer"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {booking.customerName || booking.contactName || "Guest User"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    📅 {booking.FromDate} - {booking.ToDate}
                  </p>
                  {booking.FromTime && booking.ToTime && (
                    <p className="text-sm text-gray-600">
                      🕐 {booking.FromTime} - {booking.ToTime}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    📱 {booking.contactNumber || "N/A"}
                  </p>
                  {booking.totalPrice && (
                    <p className="text-sm text-gray-600 font-semibold">
                      💰 ₹{booking.totalPrice}
                    </p>
                  )}
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {getStatusDisplay(booking.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default VehicleHistory;
 