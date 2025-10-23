import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MoreVertical, Phone, Calendar, Clock } from "lucide-react";
import BlackCar from "../assets/images/BlackCar.png";
import { useBookingStore } from "../store/booking.store";
import { useVehicleStore } from "../store/vehicle.store";
import { useListedCarsStore } from "../store/listedCars.store";
import { useListedAutosStore } from "../store/listedAutos.store";

interface BookingHistory {
  id: string;
  customerName: string;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  mobileNo: string;
  status: "Booked" | "Picked" | "Completed";
}

const VehicleHistory: React.FC = () => {
  const { vehicleName } = useParams<{ vehicleName: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"history" | "description">("history");
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const { getBookingsByVehicleName, updateBooking } = useBookingStore();
  const { getVehicleByName } = useVehicleStore();
  const { cars } = useListedCarsStore();
  const { autos } = useListedAutosStore();

  // Edit form state
  const [editedVehicle, setEditedVehicle] = useState({
    acAvailable: true,
    contactName: "",
    pricePerHour: "",
    transmission: "Automatic",
    drivingLicense: false,
    aadharCard: false,
    deposit: false,
    state: "",
    city: "",
    pincode: "",
    streetAddress: ""
  });

  // Get vehicle data from stores
  const vehicle = useMemo(() => {
    // First check vehicle store
    const storedVehicle = getVehicleByName(vehicleName || "");
    if (storedVehicle) {
      return {
        name: storedVehicle.name,
        price: storedVehicle.price,
        rating: storedVehicle.rating,
        transmission: storedVehicle.transmission,
        seats: storedVehicle.seats,
        fuel: storedVehicle.fuel,
        ac: storedVehicle.ac ? "AC" : "Non-AC",
        image: storedVehicle.image,
        location: `${storedVehicle.location.city}, ${storedVehicle.location.state}`,
      };
    }
    
    // Check listed cars
    const car = cars.find(c => c.carName === vehicleName);
    if (car) {
      return {
        name: car.carName,
        price: car.rentPrice,
        rating: car.rating?.toString() || "4.0",
        transmission: car.transmission,
        seats: `${car.totalKmVehicle || 5} Seaters`,
        fuel: car.fuel,
        ac: car.acAvailable ? "AC" : "Non-AC",
        image: car.photos[0] || BlackCar,
        location: `${car.city}, ${car.state}`,
      };
    }
    
    // Check listed autos
    const auto = autos.find(a => `Auto ${a.vehicleNumber}` === vehicleName);
    if (auto) {
      return {
        name: `Auto ${auto.vehicleNumber}`,
        price: auto.farePrice,
        rating: auto.rating.toString(),
        transmission: "Manual",
        seats: "3 Seaters",
        fuel: "CNG",
        ac: "Non-AC",
        image: auto.photos[0] || BlackCar,
        location: auto.ownerName,
      };
    }
    
    // Default fallback
    return {
      name: vehicleName || "Hyundai Verna",
      price: "250",
      rating: "4.2",
      transmission: "Automatic",
      seats: "5 Seaters",
      fuel: "Petrol",
      ac: "AC",
      image: BlackCar,
      location: "Kakinada",
    };
  }, [vehicleName, getVehicleByName, cars, autos]);

  // Get booking history from store (with sample data if empty)
  const bookingHistory: BookingHistory[] = useMemo(() => {
    const bookings = getBookingsByVehicleName(vehicleName || "");
    
    // If no bookings, return sample data for demo
    if (bookings.length === 0) {
      return [
        // {
        //   id: "1",
        //   customerName: "Manoj Kumar",
        //   fromDate: "30-10-2025",
        //   toDate: "30-10-2025",
        //   fromTime: "11 AM",
        //   toTime: "11 AM",
        //   mobileNo: "1234567898",
        //   status: "Booked" as const
        // },
        // {
        //   id: "2",
        //   customerName: "Manoj Kumar",
        //   fromDate: "30-10-2025",
        //   toDate: "30-10-2025",
        //   fromTime: "11 AM",
        //   toTime: "11 AM",
        //   mobileNo: "1234567898",
        //   status: "Booked" as const
        // },
        // {
        //   id: "3",
        //   customerName: "Manoj Kumar",
        //   fromDate: "30-10-2025",
        //   toDate: "30-10-2025",
        //   fromTime: "11 AM",
        //   toTime: "11 AM",
        //   mobileNo: "1234567898",
        //   status: "Booked" as const
        // }
      ];
    }
    
    // Transform bookings from store to match BookingHistory interface
    return bookings.map((booking: any, index: number) => ({
      id: booking.id || index.toString(),
      customerName: booking.customerName || booking.name || "Guest",
      fromDate: booking.startDate || booking.fromDate || "N/A",
      toDate: booking.endDate || booking.toDate || "N/A",
      fromTime: booking.startTime || booking.fromTime || "N/A",
      toTime: booking.endTime || booking.toTime || "N/A",
      mobileNo: booking.mobileNo || booking.phoneNumber || "N/A",
      status: booking.status || "Booked"
    })) as BookingHistory[];
  }, [vehicleName, getBookingsByVehicleName]);

  const handleMenuToggle = (index: number) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      // Initialize form with current vehicle data when entering edit mode
      setEditedVehicle({
        acAvailable: vehicle.ac === "AC",
        contactName: vehicle.name,
        pricePerHour: vehicle.price.toString(),
        transmission: vehicle.transmission,
        drivingLicense: false,
        aadharCard: false,
        deposit: false,
        state: "",
        city: "",
        pincode: "",
        streetAddress: ""
      });
    }
  };

  const handleSave = () => {
    // Save logic here
    console.log("Saving vehicle details:", editedVehicle);
    setIsEditMode(false);
    // You can add API call or store update here
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      console.log("Deleting vehicle:", vehicleName);
      // Add delete logic here
      navigate("/my-listings"); // Navigate back after delete
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Booked":
        return "bg-green-100 text-green-700";
      case "Picked":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Section - Vehicle Details and History Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6 p-6">
        {/* Left Section - Vehicle Info */}
        <div className="bg-white rounded-xl shadow-sm">
          {/* Vehicle Image with Carousel Dots */}
          <div className="relative">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-[400px] object-cover rounded-t-xl"
            />
            {/* Carousel Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900">{vehicle.name}</h1>
                <span className="flex items-center gap-1 px-3 py-1 bg-yellow-50 border border-yellow-400 rounded text-sm font-medium">
                  ⭐ {vehicle.rating}
                </span>
              </div>
            </div>

            <p className="text-3xl font-bold text-gray-900 mb-6">
              ₹{vehicle.price}<span className="text-lg font-normal text-gray-600">/hr</span>
            </p>

            {/* Vehicle Features Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 mb-2 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-600">{vehicle.transmission}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 mb-2 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-600">{vehicle.seats}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 mb-2 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-600">{vehicle.fuel}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 mb-2 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-600">{vehicle.ac}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-3 px-1 font-semibold transition-colors relative ${
                    activeTab === "description"
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Description
                  {activeTab === "description" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                  )}
                </button>
                
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "description" ? (
                <div className="text-gray-600 leading-relaxed">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type 
                    specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting 
                    industry. Lorem Ipsum has been the industry's standard dummy text ever since 
                    the 1500s, when an unknown printer took a galley of type and scrambled it to 
                    make a type specimen book.Lorem Ipsum is simply dummy text of the printing and 
                    typesetting industry.
                  </p>
                </div>
              ) : (
                <div className="lg:hidden space-y-4">
                  {bookingHistory.map((booking, index) => (
                    <div
                      key={booking.id}
                      className="bg-white border border-gray-200 rounded-xl p-4"
                    >
                      {/* Mobile History Card Content */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-gray-600" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{booking.customerName}</h3>
                          </div>
                        </div>
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => handleMenuToggle(index)}
                        >
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>From: {booking.fromDate}</span>
                          <Clock className="w-4 h-4 ml-2" />
                          <span>To: {booking.fromTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>To: {booking.toDate}</span>
                          <Clock className="w-4 h-4 ml-2" />
                          <span>{booking.toTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>Mobile No: {booking.mobileNo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - History Cards (Desktop Only) */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">History</h2>
          </div>
          
          <div className="space-y-4">
            {bookingHistory.map((booking, index) => (
              <div
                key={booking.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">{booking.customerName}</h3>
                  </div>
                  <div className="relative">
                    <button
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={() => handleMenuToggle(index)}
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                    
                    {menuOpenIndex === index && (
                      <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                        <button
                          onClick={() => {
                            alert("View details");
                            setMenuOpenIndex(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            alert(`Contact ${booking.customerName}`);
                            setMenuOpenIndex(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                        >
                          Contact
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>From: {booking.fromDate}</span>
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <Clock className="w-4 h-4" />
                    <span>From: {booking.fromTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>To: {booking.toDate}</span>
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <Clock className="w-4 h-4" />
                    <span>To: {booking.toTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Mobile No: {booking.mobileNo}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-gray-700 font-medium">Status:</span>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleHistory;
