import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlackCar from "../assets/images/BlackCar.png";

interface VehicleDetails {
  name: string;
  price: string;
  transmission: string;
  seats: string;
  fuel: string;
  ac: boolean;
  rating: string;
  image: string;
  description: string;
  location: {
    state: string;
    district: string;
    city: string;
    pincode: string;
    street: string;
  };
  documents: {
    drivingLicense: boolean;
    aadharCard: boolean;
    depositVehicle: boolean;
    depositMoney: string;
  };
}

const EditCarDetails: React.FC = () => {
  const { vehicleName, bookingId } = useParams<{ vehicleName: string; bookingId: string }>();
  const navigate = useNavigate();

  const [vehicleData, setVehicleData] = useState<VehicleDetails>({
    name: "Hyundai Verna",
    price: "250",
    transmission: "Automatic",
    seats: "5 Seaters",
    fuel: "Petrol",
    ac: true,
    rating: "4.2",
    image: BlackCar,
    description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    location: {
      state: "Andhra Pradesh",
      district: "East Godavari",
      city: "Kakinada",
      pincode: "533001",
      street: "Gandhi Nagar",
    },
    documents: {
      drivingLicense: true,
      aadharCard: true,
      depositVehicle: true,
      depositMoney: "10000",
    },
  });

  const handleInputChange = (field: string, value: any) => {
    setVehicleData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLocationChange = (field: string, value: string) => {
    setVehicleData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  const handleDocumentChange = (field: string, value: any) => {
    setVehicleData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log("Saving vehicle data:", vehicleData);
    alert("Vehicle details saved successfully!");
    navigate(-1);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");
    if (confirmDelete) {
      alert("Vehicle deleted successfully!");
      navigate("/listed");
    }
  };

  const handleAddPhoto = () => {
    alert("Add photo functionality - file picker would open here");
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Vehicle Image and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              {/* Vehicle Image */}
              <div className="w-full h-[180px] sm:h-[200px] overflow-hidden rounded-lg mb-3 sm:mb-4">
                <img
                  src={vehicleData.image}
                  alt={vehicleData.name}
                  className="w-full h-full object-cover"
                />
                <div className="flex justify-center gap-2 mt-2 sm:mt-3">
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                </div>
              </div>

              {/* Vehicle Name and Rating */}
              <div className="mb-3 sm:mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">{vehicleData.name}</h2>
                <span className="flex items-center gap-1 text-gray-700 text-sm mt-1">
                  ⭐ {vehicleData.rating}
                </span>
              </div>

              <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-3 sm:mb-4">
                ₹{vehicleData.price}<span className="text-xs sm:text-sm font-normal">/hr</span>
              </p>

              {/* Vehicle Features */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="flex flex-col items-center p-2 sm:p-3 border rounded-lg">
                  <span className="text-lg sm:text-xl mb-1">⚙️</span>
                  <span className="text-xs sm:text-sm">{vehicleData.transmission}</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-3 border rounded-lg">
                  <span className="text-lg sm:text-xl mb-1">🧍‍♂️</span>
                  <span className="text-xs sm:text-sm">{vehicleData.seats}</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-3 border rounded-lg">
                  <span className="text-lg sm:text-xl mb-1">⛽</span>
                  <span className="text-xs sm:text-sm">{vehicleData.fuel}</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-3 border rounded-lg">
                  <span className="text-lg sm:text-xl mb-1">❄️</span>
                  <span className="text-xs sm:text-sm">AC</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-3 sm:mb-4">
                <h3 className="font-semibold text-base sm:text-lg mb-2">Description</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {vehicleData.description.substring(0, 200)}...
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Edit Car Details</h1>

              {/* Car Promotion Toggle */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 pb-4 sm:pb-6 border-b">
                <label className="text-xs sm:text-sm font-medium text-gray-700">Car Promotion</label>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
              </div>

              {/* AC Karamala Toggle */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 pb-4 sm:pb-6 border-b">
                <label className="text-xs sm:text-sm font-medium text-gray-700">AC Karamala</label>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
              </div>

              {/* Price Input */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="text"
                  value={vehicleData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price per hour"
                />
              </div>

              {/* Your Contact Information */}
              <div className="mb-4 sm:mb-6">
                <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Your Contact Information</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1">Name</label>
                    <input
                      type="text"
                      value="Manoj Kumar"
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg bg-gray-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1">Mobile Number</label>
                    <input
                      type="text"
                      value="9876543210"
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg bg-gray-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1">Model No</label>
                    <input
                      type="text"
                      value="1234567"
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Customer Required Documents */}
              <div className="mb-4 sm:mb-6">
                <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Customer Required Documents</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm text-gray-700">Driving License</label>
                    <div className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={vehicleData.documents.drivingLicense}
                        onChange={(e) => handleDocumentChange("drivingLicense", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm text-gray-700">Aadhar Card</label>
                    <div className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={vehicleData.documents.aadharCard}
                        onChange={(e) => handleDocumentChange("aadharCard", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm text-gray-700">Deposit Vehicle</label>
                    <div className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={vehicleData.documents.depositVehicle}
                        onChange={(e) => handleDocumentChange("depositVehicle", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1">Deposit Money</label>
                    <input
                      type="text"
                      value={vehicleData.documents.depositMoney}
                      onChange={(e) => handleDocumentChange("depositMoney", e.target.value)}
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="10000"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Pickup Address */}
              <div className="mb-4 sm:mb-6">
                <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Vehicle Pickup Address</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1">State</label>
                    <select
                      value={vehicleData.location.state}
                      onChange={(e) => handleLocationChange("state", e.target.value)}
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1">City</label>
                    <select
                      value={vehicleData.location.city}
                      onChange={(e) => handleLocationChange("city", e.target.value)}
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Kakinada">Kakinada</option>
                      <option value="Rajahmundry">Rajahmundry</option>
                      <option value="Vijayawada">Vijayawada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1">Pincode</label>
                    <input
                      type="text"
                      value={vehicleData.location.pincode}
                      onChange={(e) => handleLocationChange("pincode", e.target.value)}
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="533001"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1">Street</label>
                    <input
                      type="text"
                      value={vehicleData.location.street}
                      onChange={(e) => handleLocationChange("street", e.target.value)}
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Gandhi Nagar"
                    />
                  </div>
                </div>
              </div>

              {/* Bar Number */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Bar Number</label>
                <input
                  type="text"
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter bar number"
                />
              </div>

              {/* Add Photos */}
              <div className="mb-4 sm:mb-6">
                <button
                  onClick={handleAddPhoto}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 hover:border-blue-500 transition flex flex-col items-center justify-center text-gray-500 hover:text-blue-500"
                >
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">Add photos</span>
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Please try to upload square photos, minimum 300x400 size
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg hover:opacity-90 transition shadow-md"
                >
                  Save
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-white border-2 border-red-500 text-red-500 font-semibold py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCarDetails;
