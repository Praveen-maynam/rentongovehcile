import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import BlackCar from "../assets/images/BlackCar.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import { useBookingStore } from "../store/booking.store";
import { useVehicleStore } from "../store/vehicle.store";
import { useListedCarsStore } from "../store/listedCars.store";
import { useListedAutosStore } from "../store/listedAutos.store";

interface BookingHistory {
  customerName: string;
  bookingDate: string;
  bookingTime: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  modelNo: string;
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

  // Get booking history from store
  const bookingHistory: BookingHistory[] = useMemo(() => {
    return getBookingsByVehicleName(vehicleName || "");
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
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Picked":
        return "bg-green-100 text-green-700 border-green-300";
      case "Completed":
        return "bg-blue-100 text-blue-700 border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Vehicle Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex gap-6">
          {/* Vehicle Image */}
          <div className="w-[270px] h-[200px] overflow-hidden rounded-lg flex-shrink-0">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-full object-cover object-[85%_50%]"
            />
          </div>

          {/* Vehicle Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold">{vehicle.name}</h1>
              <span className="flex items-center justify-center px-3 py-1 text-gray-700 text-sm bg-yellow-100 rounded">
                ⭐ {vehicle.rating}
              </span>
            </div>
            
            <p className="text-2xl font-bold text-blue-600 mb-4">
              ₹{vehicle.price}<span className="text-sm font-normal">/hr</span>
            </p>

            {/* Vehicle Features */}
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col items-center p-3 border rounded-lg">
                <img src={AutomaticLogo} alt="Transmission" className="w-6 h-6 mb-1" />
                <span className="text-sm">{vehicle.transmission}</span>
              </div>
              <div className="flex flex-col items-center p-3 border rounded-lg">
                <img src={DriverLogo} alt="Seats" className="w-6 h-6 mb-1" />
                <span className="text-sm">{vehicle.seats}</span>
              </div>
              <div className="flex flex-col items-center p-3 border rounded-lg">
                <span className="text-xl mb-1">⛽</span>
                <span className="text-sm">{vehicle.fuel}</span>
              </div>
              <div className="flex flex-col items-center p-3 border rounded-lg">
                <span className="text-xl mb-1">❄️</span>
                <span className="text-sm">{vehicle.ac}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b">
              <button
                onClick={() => setActiveTab("history")}
                className={`pb-2 px-1 font-semibold transition-colors ${
                  activeTab === "history"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-2 px-1 font-semibold transition-colors ${
                  activeTab === "description"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === "history" ? (
        <div className="space-y-4">
          {!isEditMode ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Booking History</h2>
                <button
                  onClick={handleEditToggle}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Edit Car Details
                </button>
              </div>
              
              {bookingHistory.map((booking, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start">
                    {/* Left Side - Booking Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-semibold">
                            {booking.customerName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{booking.customerName}</h3>
                          <p className="text-sm text-gray-500">
                            📅 {booking.bookingDate} ⏰ {booking.bookingTime}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Start Date:</p>
                          <p className="font-medium">📅 {booking.startDate} ⏰ {booking.startTime}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">End Date:</p>
                          <p className="font-medium">📅 {booking.endDate} ⏰ {booking.endTime}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm">Model No:</p>
                        <p className="font-medium">{booking.modelNo}</p>
                      </div>
                    </div>

                    {/* Right Side - Status and Menu */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>

                      <div className="relative">
                        <button
                          className="p-2 rounded hover:bg-gray-100"
                          onClick={() => handleMenuToggle(index)}
                        >
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>

                        {menuOpenIndex === index && (
                          <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-100 z-10">
                            <button
                              onClick={() => {
                                navigate(`/vehicle-details/${vehicleName}/edit/${booking.modelNo}`);
                                setMenuOpenIndex(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                alert(`Contact ${booking.customerName}`);
                                setMenuOpenIndex(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Contact
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Edit Car Details</h2>
                <button
                  onClick={handleEditToggle}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-6">
                {/* AC Available Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">AC Available</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editedVehicle.acAvailable}
                      onChange={(e) =>
                        setEditedVehicle({ ...editedVehicle, acAvailable: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Contact Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      value={editedVehicle.contactName}
                      onChange={(e) =>
                        setEditedVehicle({ ...editedVehicle, contactName: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter contact name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Per Hour
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={editedVehicle.pricePerHour}
                          onChange={(e) =>
                            setEditedVehicle({ ...editedVehicle, pricePerHour: e.target.value })
                          }
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transmission
                      </label>
                      <select
                        value={editedVehicle.transmission}
                        onChange={(e) =>
                          setEditedVehicle({ ...editedVehicle, transmission: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Customer Required Documents */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Customer Required Documents</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={editedVehicle.drivingLicense}
                        onChange={(e) =>
                          setEditedVehicle({ ...editedVehicle, drivingLicense: e.target.checked })
                        }
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="font-medium">Driving License</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={editedVehicle.aadharCard}
                        onChange={(e) =>
                          setEditedVehicle({ ...editedVehicle, aadharCard: e.target.checked })
                        }
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="font-medium">Aadhar Card</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={editedVehicle.deposit}
                        onChange={(e) =>
                          setEditedVehicle({ ...editedVehicle, deposit: e.target.checked })
                        }
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="font-medium">Deposit</span>
                    </label>
                  </div>
                </div>

                {/* Vehicle Pickup Address */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Vehicle Pickup Address</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={editedVehicle.state}
                        onChange={(e) =>
                          setEditedVehicle({ ...editedVehicle, state: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter state"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={editedVehicle.city}
                        onChange={(e) =>
                          setEditedVehicle({ ...editedVehicle, city: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter city"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={editedVehicle.pincode}
                      onChange={(e) =>
                        setEditedVehicle({ ...editedVehicle, pincode: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter pincode"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <textarea
                      value={editedVehicle.streetAddress}
                      onChange={(e) =>
                        setEditedVehicle({ ...editedVehicle, streetAddress: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter street address"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                  >
                    Delete Vehicle
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting 
            industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged.
          </p>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Location</h3>
            <p className="text-gray-600">📍 {vehicle.location}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleHistory;
