 
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vehicles } from "./data/Vehicle";
import { Vehicle } from "../types/Vehicle";
import { Star, Loader2 } from "lucide-react";
import apiService from "../services/api.service";
import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
import WaitingPopup from "../components/ui/WaitingPopup";
import BookingAcceptance from "../components/ui/BookingAcceptance";
import BookingRejectModal from "../components/ui/BookingRejectModal";
import PopupChat from "../components/ui/PopupChat";
import { useReviewStore } from "../store/review.store";
import { useNotificationStore } from "../store/notification.store";
import { useBookingStore } from "../store/booking.store";
 
import Automatic from "../assets/icons/AutomaticLogo.png";
import Driver from "../assets/icons/DriverLogo.png";
import Acicon from "../assets/icons/AutomaticLogo.png"
import Petrol from "../assets/icons/Petrol.png";
 
// Multiple CORS Proxies for reliability
const CORS_PROXIES = [
  "https://corsproxy.io/?",
  "https://api.codetabs.com/v1/proxy?quest=",
];
const API_BASE_URL = "https://rentongo-backend.onrender.com/api";
 
const BookNow: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);
 
  const {
    getReviewsByVehicleId,
    getAverageRating,
    getTotalReviewCount,
    getRatingDistribution,
  } = useReviewStore();
  const { addNotification } = useNotificationStore();
  const { addBooking } = useBookingStore();

  // API car data state
  const [apiCarData, setApiCarData] = useState<any>(null);
  const [loadingCarData, setLoadingCarData] = useState(true);
  const [carDataError, setCarDataError] = useState("");
 
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
  const [showContactButtons, setShowContactButtons] = useState(false);
  const [showWaitingPopup, setShowWaitingPopup] = useState(false);
  const [showAcceptance, setShowAcceptance] = useState(false);
  const [waitingTimerSeconds, setWaitingTimerSeconds] = useState<number>(30);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<{
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  } | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fetch car details from API
  useEffect(() => {
    const fetchCarDetails = async () => {
      if (id) {
        try {
          setLoadingCarData(true);
          setCarDataError("");
          console.log(`🚗 Fetching car details for ID: ${id}`);
          
          const response = await apiService.car.getCarById(id);
          console.log("✅ Full API response:", response);
          console.log("✅ Response type:", typeof response);
          console.log("✅ Response keys:", response ? Object.keys(response) : 'no keys');
          
          // Handle different response structures
          let carData = null;
          
          if (response) {
            // Check if data is nested in a 'data' property
            if ((response as any).data) {
              console.log("📦 Data found in response.data");
              carData = (response as any).data;
            } else if ((response as any).car) {
              console.log("📦 Data found in response.car");
              carData = (response as any).car;
            } else {
              console.log("📦 Using response directly");
              carData = response;
            }
            
            console.log("🎯 Final car data to set:", carData);
            setApiCarData(carData);
          }
        } catch (err: any) {
          console.error("❌ Error fetching car details:", err);
          console.error("❌ Error response:", err.response?.data);
          setCarDataError(err.message || "Failed to load car details");
        } finally {
          setLoadingCarData(false);
        }
      }
    };

    fetchCarDetails();
  }, [id]);
 
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (showWaitingPopup && waitingTimerSeconds > 0) {
      interval = setInterval(() => {
        setWaitingTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showWaitingPopup, waitingTimerSeconds]);
 
  useEffect(() => {
    if (showWaitingPopup && waitingTimerSeconds === 0) {
      handleTimerComplete();
    }
  }, [waitingTimerSeconds, showWaitingPopup]);

  // Show loading while fetching API data
  if (loadingCarData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center space-y-4 p-8">
          <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
          <p className="text-xl text-gray-700 font-semibold">Loading vehicle details...</p>
          <p className="text-sm text-gray-500">Please wait while we fetch the car information</p>
        </div>
      </div>
    );
  }

  // Show error if API fetch failed and no local vehicle data
  if (carDataError && !vehicle) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl">❌</div>
          <p className="text-xl text-red-600 font-bold">Error Loading Vehicle</p>
          <p className="text-gray-600">{carDataError}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  // Check if we have either local vehicle data or API data
  if (!vehicle && !apiCarData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl">🚗</div>
          <p className="text-xl text-gray-700 font-bold">Vehicle Not Found</p>
          <p className="text-gray-600">The vehicle you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }
 
  // Map vehicle type for API (capitalized as required by backend enum)
  const mapVehicleTypeForAPI = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
    console.log("🔍 DEBUG mapVehicleTypeForAPI INPUT:", type);
    
    if (!type) {
      console.warn("⚠️ Vehicle type is undefined/null, defaulting to 'Car'");
      return "Car";
    }
    
    const normalized = type.toLowerCase();
    console.log("🔍 DEBUG normalized type:", normalized);
    
    // Backend enum expects capitalized first letter: Car, Auto, Bike
    const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
      car: "Car",
      auto: "Auto",
      bike: "Bike",
    };
    
    const result = typeMap[normalized] || "Car";
    console.log("🔍 DEBUG mapVehicleTypeForAPI OUTPUT:", result);
    
    return result;
  };
  
  // Map vehicle type for store (capitalized as expected by booking store)
  const mapVehicleTypeForStore = (type: Vehicle["type"] | undefined): "Car" | "Auto" | "Bike" => {
    const typeMap: Record<string, "Car" | "Auto" | "Bike"> = {
      car: "Car",
      auto: "Auto",
      bike: "Bike",
    };
    return type ? typeMap[type.toLowerCase()] || "Car" : "Car";
  };
 
  const calculateTotalHours = (
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
  ): number => {
    try {
      const parseTime = (timeStr: string) => {
        const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
        if (!match) return { hours: 0, minutes: 0 };
       
        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2] || '0');
        const period = match[3]?.toUpperCase();
       
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
       
        return { hours, minutes };
      };
 
      const startTimeParsed = parseTime(startTime);
      const endTimeParsed = parseTime(endTime);
 
      const start = new Date(startDate);
      start.setHours(startTimeParsed.hours, startTimeParsed.minutes, 0, 0);
 
      const end = new Date(endDate);
      end.setHours(endTimeParsed.hours, endTimeParsed.minutes, 0, 0);
 
      const diffInMs = end.getTime() - start.getTime();
      const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
     
      console.log("📊 Calculated hours:", { start, end, hours });
      return hours > 0 ? hours : 1;
    } catch (error) {
      console.error("❌ Error calculating hours:", error);
      return 1;
    }
  };
 
  const formatDateForAPI = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    } catch (error) {
      console.error("❌ Date formatting error:", error);
    }
    return dateString;
  };
 
  const formatTimeForAPI = (timeString: string): string => {
    try {
      const ampmMatch = timeString.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
      if (ampmMatch) {
        let hours = parseInt(ampmMatch[1]);
        const minutes = ampmMatch[2] || '00';
        const period = ampmMatch[3].toUpperCase();
       
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
       
        return `${hours.toString().padStart(2, '0')}.${minutes}`;
      }
    } catch (error) {
      console.error("❌ Time formatting error:", error);
    }
    return timeString;
  };
 
  /**
   * Production-Level Create Booking API Integration
   * 
   * Features:
   * - Dynamic user/car data retrieval
   * - Comprehensive error handling
   * - Multiple API endpoint fallback strategies
   * - Request/response validation
   * - Notification integration
   * - Booking store persistence
   * - Detailed logging for debugging
   */
  const createBookingAPI = async ( 
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
  ) => {
    // Validation: Check if vehicle data exists
    if (!currentVehicle) {
      const errorMsg = "Vehicle information is missing. Please try again.";
      setApiError(errorMsg);
      addNotification({
        title: "Booking Failed",
        message: errorMsg,
        type: "booking_declined",
      });
      return null;
    }
 
    setIsSubmittingBooking(true);
    setApiError("");
 
    try {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🚀 PRODUCTION BOOKING API - START");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      
      // Calculate booking details
      const totalHours = calculateTotalHours(startDate, endDate, startTime, endTime);
      const pricePerDay = parseInt(String(apiCarData?.RentPerDay || currentVehicle.price || "0"), 10);
      const pricePerHour = pricePerDay > 0 ? Math.round(pricePerDay / 24) : parseInt(String(currentVehicle.price || "0"), 10);
      const totalPrice = totalHours * pricePerHour;
      
      console.log("💰 Pricing Calculation:");
      console.log("   Price/Day:", pricePerDay);
      console.log("   Price/Hour:", pricePerHour);
      console.log("   Total Hours:", totalHours);
      console.log("   Total Price:", totalPrice);
 
      // Format dates and times for API
      const formattedFromDate = formatDateForAPI(startDate);
      const formattedToDate = formatDateForAPI(endDate);
      const formattedFromTime = formatTimeForAPI(startTime);
      const formattedToTime = formatTimeForAPI(endTime);
      
      // Get dynamic user data (from localStorage or defaults)
      const userId = localStorage.getItem('userId') || "68ff377085e67372e72d1f39";
      const contactNumber = localStorage.getItem('contactNumber') || "6301818409";
      const contactName = localStorage.getItem('contactName') || localStorage.getItem('userName') || "User";
      const userLatitude = localStorage.getItem('latitude') || "17.438095";
      const userLongitude = localStorage.getItem('longitude') || "78.4485";
 
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🚗 CURRENT VEHICLE DEBUG:");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("currentVehicle:", currentVehicle);
      console.log("currentVehicle.id:", currentVehicle.id);
      console.log("currentVehicle.type:", currentVehicle.type);
      console.log("currentVehicle.name:", currentVehicle.name);
      console.log("typeof currentVehicle.type:", typeof currentVehicle.type);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      // Build comprehensive request body with all car information
      const requestBody = {
        // User Information
        userId: userId,
        contactNumber: contactNumber,
        contactName: contactName,
        
        // Location
        latitude: userLatitude,
        longitude: userLongitude,
        
        // Vehicle Information (Dynamic from BookNow page)
        VechileId: currentVehicle.id,
        vechileType: mapVehicleTypeForAPI(currentVehicle.type),
        carName: apiCarData?.CarName || currentVehicle.name || '',
        carModel: apiCarData?.Model || '',
        carBrand: apiCarData?.Brand || '',
        carNumber: apiCarData?.CarNumber || '',
        fuelType: apiCarData?.FuelType || '',
        transmissionType: apiCarData?.TransmissionType || '',
        seatingCapacity: apiCarData?.SeatingCapacity?.toString() || '',
        
        // Pricing
        pricePerDay: pricePerDay.toString(),
        pricePerHour: pricePerHour.toString(),
        pricePerKm: pricePerHour.toString(),
        
        // Booking Dates/Times
        FromDate: formattedFromDate,
        ToDate: formattedToDate,
        FromTime: formattedFromTime,
        ToTime: formattedToTime,
        
        // Calculated Values
        totalHours: totalHours.toString(),
        totalPrice: totalPrice.toString(),
        
        // Additional
        pickupAddress: apiCarData?.pickupAddress || '',
        dropoffAddress: apiCarData?.pickupAddress || '',
      };
 
      console.log("� Request Body:");
      console.table(requestBody);
      console.log("VALIDATION: vechileType =", requestBody.vechileType);
      console.log("VALIDATION: VechileId =", requestBody.VechileId);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
 
      // Prepare URL-encoded body for API
      const urlencoded = new URLSearchParams();
      Object.entries(requestBody).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          urlencoded.append(key, String(value));
        }
      });
      
      // Verify critical fields made it to URLSearchParams
      console.log("URLENCODED CHECK: vechileType =", urlencoded.get('vechileType'));
      console.log("URLENCODED CHECK: VechileId =", urlencoded.get('VechileId'));
 
      const API_ENDPOINT = `${API_BASE_URL}/createBooking`;
      
      // Production Strategy 1: Try using apiService (with built-in CORS handling)
      console.log("🎯 Strategy 1: Using apiService.booking.createBooking");
      try {
        // Pass the complete requestBody (already has correct field names and vechileType)
        const apiServiceResponse = await apiService.booking.createBooking(requestBody);
        
        console.log("✅ API Service Response:", apiServiceResponse);
        
        const bookingIdFromResponse = (apiServiceResponse as any)?.data?.bookingId || 
                                     (apiServiceResponse as any)?.data?._id ||
                                     (apiServiceResponse as any)?.bookingId ||
                                     (apiServiceResponse as any)?._id ||
                                     `BOOK-${Date.now()}`;
        
        setBookingId(bookingIdFromResponse);
        
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🎉 BOOKING CREATED SUCCESSFULLY!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📌 Booking ID:", bookingIdFromResponse);
        console.log("🚗 Car ID:", currentVehicle.id);
        console.log("📛 Car Name:", requestBody.carName);
        console.log("💰 Total Price:", totalPrice);
        console.log("✅ Strategy: apiService");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        
        // Add success notification
        addNotification({
          title: "Booking Created Successfully! 🎉",
          message: `Your booking for ${requestBody.carName} has been confirmed!`,
          type: "booking_confirmed",
          vehicleId: currentVehicle.id,
          vehicleName: requestBody.carName,
          bookingId: bookingIdFromResponse,
        });
        
        // Add to booking store
        addBooking({
          id: bookingIdFromResponse,
          vehicleId: currentVehicle.id,
          vehicleName: requestBody.carName,
          vehicleImage: currentVehicle.image,
          vehicleType: mapVehicleTypeForStore(currentVehicle.type),
          price: totalPrice,
          startDate: formattedFromDate,
          endDate: formattedToDate,
          startTime: formattedFromTime,
          endTime: formattedToTime,
          status: 'Booked',
        });
        
        return apiServiceResponse;
        
      } catch (apiServiceError: any) {
        console.warn("⚠️ Strategy 1 failed:", apiServiceError.message);
        console.log("🔄 Falling back to Strategy 2 (CORS Proxies)...");
      }
      
      // Production Strategy 2: CORS Proxies with improved reliability
      const PRODUCTION_PROXIES = [
        "https://api.allorigins.win/raw?url=",
        "https://api.codetabs.com/v1/proxy?quest=",
        "https://thingproxy.freeboard.io/fetch/",
      ];
      
      console.log("🌐 Strategy 2: Trying CORS Proxies");
      for (let i = 0; i < PRODUCTION_PROXIES.length; i++) {
        try {
          const proxiedUrl = `${PRODUCTION_PROXIES[i]}${encodeURIComponent(API_ENDPOINT)}`;
          console.log(`🔄 Proxy ${i + 1}/${PRODUCTION_PROXIES.length}: ${PRODUCTION_PROXIES[i].substring(0, 30)}...`);
 
          const response = await Promise.race([
            fetch(proxiedUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: urlencoded.toString(),
            }),
            new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error('Proxy timeout after 15s')), 15000)
            )
          ]);
 
          console.log(`✓ Proxy ${i + 1} Response:`, response.status, response.statusText);
 
          if (response.ok) {
            const text = await response.text();
            console.log("✅ Raw Response:", text.substring(0, 200));
           
            let result;
            try {
              result = JSON.parse(text);
            } catch {
              result = { success: true, message: text };
            }
 
            const bookingIdFromResponse = result?.bookingId || 
                                         result?.data?.bookingId || 
                                         result?._id || 
                                         result?.data?._id || 
                                         `BOOK-${Date.now()}`;
            
            setBookingId(bookingIdFromResponse);
            
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("🎉 BOOKING CREATED SUCCESSFULLY!");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("📌 Booking ID:", bookingIdFromResponse);
            console.log("🚗 Car:", requestBody.carName);
            console.log("✅ Strategy: Proxy", i + 1);
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            
            // Add success notification
            addNotification({
              title: "Booking Created Successfully! 🎉",
              message: `Your booking for ${requestBody.carName} has been confirmed!`,
              type: "booking_confirmed",
              vehicleId: currentVehicle.id,
              vehicleName: requestBody.carName,
              bookingId: bookingIdFromResponse,
            });
            
            // Add to booking store
            addBooking({
              id: bookingIdFromResponse,
              vehicleId: currentVehicle.id,
              vehicleName: requestBody.carName,
              vehicleImage: currentVehicle.image,
              vehicleType: mapVehicleTypeForStore(currentVehicle.type),
              price: totalPrice,
              startDate: formattedFromDate,
              endDate: formattedToDate,
              startTime: formattedFromTime,
              endTime: formattedToTime,
              status: 'Booked',
            });
            
            return result;
          } else {
            console.warn(`⚠️ Proxy ${i + 1} returned status ${response.status}`);
          }
        } catch (proxyError: any) {
          console.warn(`❌ Proxy ${i + 1} failed:`, proxyError.message);
        }
      }
      
      // All strategies failed
      throw new Error("Unable to connect to booking server. Please check your internet connection and try again.");
 
    } catch (error: any) {
      console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.error("❌ BOOKING CREATION FAILED");
      console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.error("🚗 Car:", currentVehicle.name);
      console.error("❌ Error:", error.message);
      console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
     
      const errorMessage = error.message || "Failed to create booking. Please try again.";
      setApiError(errorMessage);
      
      // Add error notification
      addNotification({
        title: "Booking Failed ❌",
        message: errorMessage,
        type: "booking_declined",
        vehicleId: currentVehicle.id,
        vehicleName: currentVehicle.name,
      });
      
      return null;
     
    } finally {
      setIsSubmittingBooking(false);
    }
  };
 
  // Create current vehicle object - use API data if local vehicle not found
  const currentVehicle = vehicle || (apiCarData ? {
    id: apiCarData._id || apiCarData.id || id || '',
    name: apiCarData.CarName || 'Unknown Vehicle',
    image: (apiCarData.carImages && apiCarData.carImages.length > 0) 
      ? apiCarData.carImages[0] 
      : apiCarData.carImage || apiCarData.image || 'https://via.placeholder.com/400',
    price: apiCarData.RentPerDay || apiCarData.pricePerHour || '0',
    type: 'car' as Vehicle["type"],
  } : null);

  if (!currentVehicle) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 p-8">
          <p className="text-xl text-gray-700">Vehicle data not available!</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const vehicleReviews = getReviewsByVehicleId(currentVehicle.id);
  const averageRating = getAverageRating(currentVehicle.id);
  const totalReviews = getTotalReviewCount(currentVehicle.id);
  const ratingDistribution = getRatingDistribution(currentVehicle.id);
 
  const handleTimerComplete = () => {
    console.log("⏰ Timer completed - Opening BookingAcceptance");
    setShowWaitingPopup(false);
    setShowAcceptance(true);
  };
 
  const handleCloseWaiting = () => {
    console.log("❌ WaitingPopup closed manually");
    setShowWaitingPopup(false);
    setWaitingTimerSeconds(30);
  };
 
  const handleAcceptBooking = () => {
    console.log("✅ Booking Accepted by Owner!");
    setShowAcceptance(false);
    setShowContactButtons(true);
  };
 
  const handleRejectBooking = () => {
    console.log("❌ Booking Rejected by Owner!");
    setShowAcceptance(false);
    setShowRejectModal(true);
  };
 
  const handleCloseRejectModal = () => {
    console.log("🔙 Reject modal closed");
    setShowRejectModal(false);
    setSelectedDateTime(null);
    setBookingId(null);
    setWaitingTimerSeconds(30);
  };
 
  const handleCallOwner = () => {
    console.log("📞 User calling owner...");
    // Simulate call - in real app, this would trigger actual call
    setTimeout(() => {
      handleConfirmBooking();
    }, 1000);
  };
 
  const handleConfirmBooking = () => {
    if (!currentVehicle || !selectedDateTime) {
      console.error("❌ Cannot confirm booking");
      return;
    }
 
    const currentDate = new Date();
    console.log("🎉 Confirming booking with ID:", bookingId);
 
    addBooking({
      id: bookingId || Date.now().toString(),
      vehicleId: currentVehicle.id,
      vehicleName: currentVehicle.name,
      vehicleImage: currentVehicle.image,
      vehicleType: mapVehicleTypeForStore(currentVehicle.type),
      customerName: "Current User",
      bookingDate: currentDate.toLocaleDateString("en-US"),
      bookingTime: currentDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      startDate: selectedDateTime.startDate,
      startTime: selectedDateTime.startTime,
      endDate: selectedDateTime.endDate,
      endTime: selectedDateTime.endTime,
      modelNo: currentVehicle.id.toUpperCase(),
      status: "Booked",
      price: currentVehicle.price,
    });
 
    setShowSuccessModal(true);
  };
   return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <img
          src={currentVehicle.image}
          alt={currentVehicle.name}
          className="rounded-xl w-full mb-4"
        />
        <div className="flex justify-center space-x-2 mt-2">
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
        </div>
      </div>
 
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-bold">{currentVehicle.name}</h2>
        <p className="text-gray-600 text-lg mt-1">₹{currentVehicle.price}/hr</p>
 
        <div className="flex gap-4 mt-4">
          {[
            { img: Automatic, label: apiCarData?.transmissionType },
            { img: Driver, label: apiCarData?.Carseater },
            { img: Petrol, label: apiCarData?.fuelType },
            { img: Acicon, label: "AC" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center p-2 border rounded-lg">
              <img src={item.img} alt={item.label} className="w-[25px] h-[25px]" />
              <span className="text-sm mt-1">{item.label}</span>
            </div>
          ))}
        </div>
 
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Description</h3>
          <p className="text-gray-600 text-sm">
            {apiCarData?.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>
        </div>

        {/* Production-Level API Car Details Card */}
        {/* {apiCarData && (
          <div className="mt-6 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-purple-200 shadow-xl"> */}
            {/* <div className="flex items-center justify-between mb-5"> */}
              {/* <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                🚗 Live Car Details
              </h3>
              <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-md animate-pulse">
                REAL-TIME DATA
              </span> */}
            {/* </div> */}

            {/* Debug: Show all available fields */}
            {/* <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs font-bold text-yellow-800 mb-2">🔍 Debug: Available API Fields</p>
              <pre className="text-xs text-gray-700 overflow-auto max-h-32">
                {JSON.stringify(apiCarData, null, 2)}
              </pre>
            </div> */}
            
            {/* <div className="grid grid-cols-2 gap-3"> */}
              {/* <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition border border-purple-100">
                <p className="text-xs text-gray-500 font-semibold mb-1.5 uppercase tracking-wide">Car ID</p>
                <p className="text-sm font-bold text-gray-900 truncate">{apiCarData._id || apiCarData.id || 'N/A'}</p>
              </div> */}
              
              {/* <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition border border-blue-100">
                <p className="text-xs text-gray-500 font-semibold mb-1.5 uppercase tracking-wide">Car Name</p>
                <p className="text-sm font-bold text-blue-700">{apiCarData.CarName || 'N/A'}</p>
              </div> */}
              
              {/* <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition border border-cyan-100">
                <p className="text-xs text-gray-500 font-semibold mb-1.5 uppercase tracking-wide">Model</p>
                <p className="text-sm font-bold text-cyan-700">{apiCarData.CarModel || 'N/A'}</p>
              </div> */}
              
              {/* <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition border border-purple-100">
                <p className="text-xs text-gray-500 font-semibold mb-1.5 uppercase tracking-wide">Location</p>
                <p className="text-sm font-bold text-purple-700">{apiCarData.location || 'N/A'}</p>
              </div> */}
              
              {/* <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition border border-green-100">
                <p className="text-xs text-gray-500 font-semibold mb-1.5 uppercase tracking-wide">Rent Per Day</p>
                <p className="text-sm font-bold text-green-600">₹{apiCarData.RentPerDay || 'N/A'}</p>
              </div> */}
              
              {/* <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition border border-indigo-100">
                <p className="text-xs text-gray-500 font-semibold mb-1.5 uppercase tracking-wide">Car Number</p>
                <p className="text-sm font-bold text-indigo-700">{apiCarData.carNumber || 'N/A'}</p>
              </div> */}
            {/* </div> */}

            {apiCarData.carImages && apiCarData.carImages.length > 1 && (
              <div className="mt-4 pt-4 border-t border-purple-200">
                <p className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Additional Images</p>
                <div className="flex gap-2 overflow-x-auto">
                  {apiCarData.carImages.slice(1, 4).map((img: string, idx: number) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={`Car ${idx + 2}`}
                      className="w-10 h-8 rounded-lg object-cover border-2 border-white shadow-md"
                    />
                  ))}
                </div>
              </div>
            )}
          {/* </div> */}
        {/* )} */}
 
        {apiError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{apiError}</p>
            <button
              onClick={() => setApiError("")}
              className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
            >
              Dismiss
            </button>
          </div>
        )}
 
        {!showContactButtons ? (
          <button
            onClick={() => setIsDateTimeModalOpen(true)}
            disabled={isSubmittingBooking}
            className="mt-6 w-full bg-gradient-to-r from-[#141248] to-[#63C8FF] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmittingBooking ? "Processing..." : "Book Now"}
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
              <img
                src="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
                alt="Manoj Kumar"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Manoj Kumar</h4>
                <p className="text-sm text-gray-500">Vehicle Owner</p>
              </div>
            </div>
 
            <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
              <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-orange-700 flex-1">
                Please call the owner to discuss booking details and confirm availability.
              </p>
            </div>
 
            <div className="flex gap-3">
              <button
                onClick={() => setIsChatOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
              >
                💬 Chat
              </button>
              <button
                onClick={handleCallOwner}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
              >
                📞 Call Owner
              </button>
            </div>
          </div>
        )}
 
        {isDateTimeModalOpen && (
          <AvailabilityDateTimeModal
            isOpen={isDateTimeModalOpen}
            onClose={() => {
              setIsDateTimeModalOpen(false);
              setApiError("");
            }}
            onConfirm={async (startDate, endDate, startTime, endTime, availability) => {
              console.log("✅ DateTime selected:", { startDate, endDate, startTime, endTime });
             
              setSelectedDateTime({ startDate, endDate, startTime, endTime });
              setIsDateTimeModalOpen(false);
             
              const result = await createBookingAPI(startDate, endDate, startTime, endTime);
             
              if (result) {
                console.log("🎉 Starting wait timer");
                setWaitingTimerSeconds(30);
                setShowWaitingPopup(true);
              }
            }}
          />
        )}
      </div>
 
      <div className="lg:col-span-1">
        <h3 className="text-lg font-bold">Rating & Reviews</h3>
        <div className="flex items-center mt-2 mb-2 justify-between">
          <span className="text-2xl font-bold">{averageRating}</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={i < Math.floor(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                size={20}
              />
            ))}
          </div>
        </div>
        <span className="text-gray-500 text-sm">{totalReviews} Reviews</span>
        <div className="mt-4 space-y-2">
          {ratingDistribution.map((r) => (
            <div key={r.stars} className="flex items-center text-sm">
              <span className="w-6">{r.stars}★</span>
              <div className="flex-1 bg-gray-200 h-2 rounded mx-2">
                <div className="bg-yellow-400 h-2 rounded" style={{ width: `${r.percentage}%` }} />
              </div>
              <span className="text-gray-500 text-xs">{r.percentage}%</span>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          {vehicleReviews.map((r, idx) => (
            <div key={idx} className="border p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{r.userName}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
 
      {showWaitingPopup && (
        <WaitingPopup
          timer={waitingTimerSeconds}
          onClose={handleCloseWaiting}
          onTimerComplete={handleTimerComplete}
        />
      )}
 
      {showAcceptance && (
        <BookingAcceptance
          onAccept={handleAcceptBooking}
          onReject={handleRejectBooking}
          onClose={() => setShowAcceptance(false)}
        />
      )}
 
      <PopupChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        ownerName="Manoj Kumar"
        ownerAvatar="https://ui-avatars.com/api/?name=Manoj+Kumar&background=6B7280&color=fff&size=48"
      />
 
      <BookingRejectModal isOpen={showRejectModal} onClose={handleCloseRejectModal} />
 
      {/* Production Loading Overlay - Shows during API call */}
      {isSubmittingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
            <div className="flex flex-col items-center">
              {/* Animated Loader */}
              <div className="relative mb-6">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
                Creating Your Booking...
              </h2>
              
              {/* Car Information Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 w-full mb-4 border border-blue-100 shadow-sm">
                {currentVehicle && (
                  <>
                    {/* Car Image & Name */}
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={currentVehicle.image} 
                        alt={currentVehicle.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-sm"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg">{currentVehicle.name}</p>
                        <p className="text-sm text-gray-600 capitalize">{currentVehicle.type}</p>
                      </div>
                    </div>
                    
                    {/* Car Details */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Car ID</span>
                        <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
                          {currentVehicle.id.substring(0, 12)}...
                        </span>
                      </div>
                      
                      {apiCarData?.CarNumber && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Car Number</span>
                          <span className="font-semibold text-gray-900">{apiCarData.CarNumber}</span>
                        </div>
                      )}
                      
                      {selectedDateTime && (
                        <div className="border-t border-blue-200 pt-2 mt-3">
                          <p className="text-xs text-gray-600 mb-1">Booking Period</p>
                          <p className="text-sm text-gray-700 font-medium">
                            {selectedDateTime.startDate} {selectedDateTime.startTime}
                            <br />
                            to {selectedDateTime.endDate} {selectedDateTime.endTime}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              
              {/* Status Messages */}
              <div className="text-center space-y-2">
                <p className="text-gray-600 text-sm">
                  Please wait while we process your booking...
                </p>
                <p className="text-blue-600 font-medium text-sm">
                  Connecting to server & validating data
                </p>
              </div>
              
              {/* Progress Dots Animation */}
              <div className="flex gap-2 mt-5">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Production Error Banner - Shows when booking fails */}
      {apiError && !isSubmittingBooking && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[110] max-w-md w-full mx-4 animate-slideDown">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-xl">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-bold text-red-800">Booking Failed</h3>
                <p className="mt-1 text-sm text-red-700">{apiError}</p>
                {currentVehicle && (
                  <p className="mt-1 text-xs text-red-600">
                    Car: {currentVehicle.name} (ID: {currentVehicle.id.substring(0, 8)}...)
                  </p>
                )}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      setApiError("");
                      setIsDateTimeModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                  >
                    Retry Booking
                  </button>
                  <button
                    onClick={() => setApiError("")}
                    className="px-3 py-1.5 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-300 hover:bg-red-50 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
 
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
              Booking Posted Successfully!
            </h2>
            <p className="text-gray-600 text-center mb-6">
              After discussing with the owner, your booking has been confirmed. You will receive updates on your booking status.
            </p>
 
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <img src={currentVehicle.image} alt={currentVehicle.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="font-semibold text-gray-900">{currentVehicle.name}</h3>
                  <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
                </div>
              </div>
             
              {selectedDateTime && (
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Start:</span>
                    <span className="font-medium">
                      {new Date(selectedDateTime.startDate).toLocaleDateString()} - {selectedDateTime.startTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>End:</span>
                    <span className="font-medium">
                      {new Date(selectedDateTime.endDate).toLocaleDateString()} - {selectedDateTime.endTime}
                    </span>
                  </div>
                </div>
              )}
            </div>
 
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/");
                }}
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
              >
                Go Home
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setShowContactButtons(false);
                  setSelectedDateTime(null);
                  setBookingId(null);
                  setWaitingTimerSeconds(30);
                }}
                className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition shadow-md"
              >
                Book Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default BookNow;
 
 