


import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { MapPin, Navigation, Loader, Plus, X } from "lucide-react";
import apiService from "../services/api.service";

// Geocoding Service
const GeocodingService = {
  async getCoordinates(address: any) {
    const query = Object.values(address).filter(Boolean).join(", ");
    if (!query) return null;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          latitude: data[0].lat,
          longitude: data[0].lon,
          displayName: data[0].display_name
        };
      }
      return null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  },

  async reverseGeocode(lat: number, lon: number) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.address) {
        return {
          street: data.address.road || data.address.suburb || "",
          city: data.address.city || data.address.town || data.address.village || "",
          state: data.address.state || "",
          pincode: data.address.postcode || "",
          country: data.address.country || ""
        };
      }
      return null;
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return null;
    }
  }
};

// Map Click Handler Component
function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e: any) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const ListCarPage = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([17.4889, 78.4603]);
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
  const [watching, setWatching] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  // Get userId safely and validate it's a proper MongoDB ObjectId
  const getUserId = () => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId && storedUserId.length === 24 && /^[a-f0-9]{24}$/i.test(storedUserId)) {
      return storedUserId;
    }
    return "68f32259cea8a9fa88029262";
  };

  const [formData, setFormData] = useState({
    userId: getUserId(),
    CarName: "",
    CarModel: "",
    CarNumber: "",
    Carseater: "",
    fuelType: "Petrol",
    transmissionType: "Manual",
    kmDriven: "",
    Ac_available: false,
    description: "",
    RentPerHour: "",
    RentPerDay: "",
    contactName: "",
    contactNumber: "",
    DepositAmount: "0",
    drivingLicenseRequired: false,
    AadharCardRequired: false,
    DepositVehicle: false,
    photos: [] as File[],
    pickupArea: "",
    pickupCity: "",
    pickupCityState: "",
    pickupCityPinCode: "",
    pickupCityCountry: "",
    pickupLatitude: "17.4889",
    pickupLongitude: "78.4603",
    gps: false,
  });

  const formFields = {
    vehicleDetails: [
      { name: "CarName", label: "Car Name", type: "text", required: true, placeholder: "Toyota Fortuner" },
      { name: "CarModel", label: "Car Model", type: "text", required: true, placeholder: "2023" },
      { name: "CarNumber", label: "Car Number", type: "text", required: true, placeholder: "AP12AB1234" },
      { name: "kmDriven", label: "KM Driven", type: "text", required: true, placeholder: "15000" },
      { name: "Carseater", label: "Seating Capacity", type: "text", required: true, placeholder: "5" },
      { 
        name: "fuelType", 
        label: "Fuel Type", 
        type: "select", 
        required: true,
        options: ["Petrol", "Diesel", "Electric", "Hybrid"]
      },
      { 
        name: "transmissionType", 
        label: "Transmission", 
        type: "select", 
        required: true,
        options: ["Manual", "Automatic", "Semi-Automatic"]
      },
      { name: "RentPerHour", label: "Rent Per Hour", type: "number", required: true, placeholder: "500", min: 0 },
      { name: "RentPerDay", label: "Rent Per Day", type: "number", required: true, placeholder: "5000", min: 0 }
    ],
    contactInfo: [
      { name: "contactName", label: "Name", type: "text", required: true, placeholder: "John Doe" },
      { name: "contactNumber", label: "Contact Number", type: "tel", required: true, placeholder: "9876543210", pattern: "[0-9]{10}" }
    ],
    addressFields: [
      { name: "pickupArea", label: "Street/Area", type: "text", required: true, placeholder: "Street name or area" },
      { name: "pickupCity", label: "City", type: "text", required: true, placeholder: "City name" },
      { name: "pickupCityState", label: "State", type: "text", required: true, placeholder: "State name" },
      { name: "pickupCityPinCode", label: "Zip/Pincode", type: "text", required: true, placeholder: "500001", pattern: "[0-9]{6}" },
      { name: "pickupCityCountry", label: "Country", type: "text", required: true, placeholder: "India", fullWidth: true }
    ],
    checkboxes: [
      { name: "Ac_available", label: "AC Available" },
      { name: "drivingLicenseRequired", label: "Driving License Required" },
      { name: "AadharCardRequired", label: "Aadhar Card Required" },
      { name: "DepositVehicle", label: "Deposit Vehicle Required" },
      { name: "gps", label: "GPS Tracking Available" }
    ]
  };

  useEffect(() => {
    if (formData.pickupLatitude && formData.pickupLongitude) {
      setMarkerPos([parseFloat(formData.pickupLatitude), parseFloat(formData.pickupLongitude)]);
      setMapCenter([parseFloat(formData.pickupLatitude), parseFloat(formData.pickupLongitude)]);
    }
  }, [formData.pickupLatitude, formData.pickupLongitude]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const address = {
        pickupArea: formData.pickupArea,
        pickupCity: formData.pickupCity,
        pickupCityState: formData.pickupCityState,
        pickupCityPinCode: formData.pickupCityPinCode,
        pickupCityCountry: formData.pickupCityCountry
      };

      const coords = await GeocodingService.getCoordinates(address);
      if (coords) {
        setFormData((prev) => ({
          ...prev,
          pickupLatitude: coords.latitude,
          pickupLongitude: coords.longitude,
        }));
        setLocationError("");
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [
    formData.pickupArea,
    formData.pickupCity,
    formData.pickupCityState,
    formData.pickupCityPinCode,
    formData.pickupCityCountry,
  ]);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handlePhotoUpload = (e: any) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as File[];
      setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...filesArray] }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const getCurrentLocation = () => {
    setLoadingLocation(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        setFormData((prev) => ({
          ...prev,
          pickupLatitude: latitude.toString(),
          pickupLongitude: longitude.toString(),
        }));

        const address = await GeocodingService.reverseGeocode(latitude, longitude);
        if (address) {
          setFormData((prev) => ({
            ...prev,
            pickupArea: address.street,
            pickupCity: address.city,
            pickupCityState: address.state,
            pickupCityPinCode: address.pincode,
            pickupCityCountry: address.country
          }));
        }
        
        setLoadingLocation(false);
      },
      (error) => {
        setLocationError("Unable to retrieve location. Please enable GPS.");
        setLoadingLocation(false);
        console.error(error);
      }
    );
  };

  const onMapClick = (lat: number, lng: number) => {
    setMarkerPos([lat, lng]);
    setLoadingLocation(true);
    GeocodingService.reverseGeocode(lat, lng)
      .then((address) => {
        if (address) {
          setFormData((prev) => ({
            ...prev,
            pickupLatitude: lat.toString(),
            pickupLongitude: lng.toString(),
            pickupArea: address.street,
            pickupCity: address.city,
            pickupCityState: address.state,
            pickupCityPinCode: address.pincode,
            pickupCityCountry: address.country
          }));
        }
      })
      .catch((e) => setLocationError(String(e)))
      .finally(() => setLoadingLocation(false));
  };

  const startWatch = () => {
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation not supported");
      return;
    }
    setWatching(true);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setMarkerPos([lat, lng]);
        setMapCenter([lat, lng]);
        GeocodingService.reverseGeocode(lat, lng)
          .then((address) => {
            if (address) {
              setFormData((prev) => ({
                ...prev,
                pickupLatitude: lat.toString(),
                pickupLongitude: lng.toString(),
                pickupArea: address.street,
                pickupCity: address.city,
                pickupCityState: address.state,
                pickupCityPinCode: address.pincode,
                pickupCityCountry: address.country
              }));
            }
          })
          .catch(() => {});
      },
      (err) => setLocationError(err.message || "watch error"),
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
    );
  };

  const stopWatch = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setWatching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate userId format
    if (!formData.userId || formData.userId.length !== 24 || !/^[a-f0-9]{24}$/i.test(formData.userId)) {
      alert("Invalid user ID format. Please log in again.");
      return;
    }

    if (!formData.CarName || !formData.CarModel || !formData.CarNumber) {
      alert("Please fill in car name, model, and number");
      return;
    }

    if (!formData.RentPerHour || parseFloat(formData.RentPerHour) <= 0) {
      alert("Please enter a valid rent per hour");
      return;
    }

    if (!formData.contactNumber || formData.contactNumber.length !== 10) {
      alert("Please enter a valid 10-digit contact number");
      return;
    }

    if (!formData.contactName) {
      alert("Please enter contact name");
      return;
    }

    if (!formData.pickupArea || !formData.pickupCity || !formData.pickupCityState || 
        !formData.pickupCityPinCode || !formData.pickupCityCountry) {
      alert("Please fill in all address fields");
      return;
    }

    if (!formData.pickupLatitude || !formData.pickupLongitude) {
      alert("Please get your current location");
      return;
    }

    if (formData.photos.length === 0) {
      alert("Please upload at least one photo");
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    
    formDataToSend.append("userId", formData.userId.trim());
    formDataToSend.append("CarName", formData.CarName.trim());
    formDataToSend.append("CarModel", formData.CarModel.trim());
    formDataToSend.append("CarNumber", formData.CarNumber.trim().toUpperCase());
    formDataToSend.append("Carseater", formData.Carseater);
    formDataToSend.append("fuelType", formData.fuelType);
    formDataToSend.append("transmissionType", formData.transmissionType);
    formDataToSend.append("kmDriven", formData.kmDriven);
    formDataToSend.append("Ac_available", formData.Ac_available ? "yes" : "no");
    formDataToSend.append("description", formData.description.trim());
    formDataToSend.append("RentPerHour", formData.RentPerHour);
    formDataToSend.append("RentPerDay", formData.RentPerDay);
    formDataToSend.append("contactName", formData.contactName.trim());
    formDataToSend.append("contactNumber", formData.contactNumber.trim());
    formDataToSend.append("DepositAmount", formData.DepositAmount);
    formDataToSend.append("drivingLicenseRequired", formData.drivingLicenseRequired.toString());
    formDataToSend.append("AadharCardRequired", formData.AadharCardRequired.toString());
    formDataToSend.append("DepositVehicle", formData.DepositVehicle ? "yes" : "no");
    formDataToSend.append("pickupArea", formData.pickupArea.trim());
    formDataToSend.append("pickupCity", formData.pickupCity.trim());
    formDataToSend.append("pickupCityState", formData.pickupCityState.trim());
    formDataToSend.append("pickupCityPinCode", formData.pickupCityPinCode.trim());
    formDataToSend.append("pickupCityCountry", formData.pickupCityCountry.trim());
    formDataToSend.append("pickupLatitude", formData.pickupLatitude);
    formDataToSend.append("pickupLongitude", formData.pickupLongitude);
    formDataToSend.append("gps", formData.gps.toString());
    
    formData.photos.forEach((photo) => {
      formDataToSend.append("carImages", photo);
    });

    try {
      console.log("📤 Submitting car data...");
      console.log("👤 User ID:", formData.userId);
      
      const response = await apiService.car.createCar(formDataToSend);
      
      console.log("✅ Car created successfully:", response);
      
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error("❌ Error creating car:", error);
      
      let errorMessage = "Failed to post car. Please try again.";
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      if (errorMessage.includes("userId") || errorMessage.includes("ObjectId")) {
        errorMessage = "Invalid user ID. Please log in again and try.";
      } else if (errorMessage.includes("CarNumber")) {
        errorMessage = "Invalid car number format. Please check and try again.";
      } else if (errorMessage.includes("duplicate")) {
        errorMessage = "This car is already listed. Please check the car number.";
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    window.location.href = "/listed";
  };

  const renderField = (field: any) => {
    const baseClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition";
    
    const fieldValue = formData[field.name as keyof typeof formData];
    
    if (field.type === "select") {
      return (
        <select
          name={field.name}
          value={typeof fieldValue === 'string' || typeof fieldValue === 'number' ? fieldValue : ''}
          onChange={handleInputChange}
          className={baseClasses}
          required={field.required}
        >
          {field.options.map((option: string) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type}
        name={field.name}
        value={typeof fieldValue === 'string' || typeof fieldValue === 'number' ? fieldValue : ''}
        onChange={handleInputChange}
        placeholder={field.placeholder}
        pattern={field.pattern}
        min={field.min}
        className={baseClasses}
        required={field.required}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            List your Car
          </h1>

          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-lg font-semibold text-gray-800">Vehicle Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.vehicleDetails.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} {field.required && "*"}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Car description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Photos *
              </label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-4 hover:bg-blue-100 transition flex items-center justify-center gap-2 min-w-32">
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-blue-600">Add Photos</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-600">
                  {formData.photos.length} photo(s) selected
                </span>
              </div>
              
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b pb-2 pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Your Contact Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.contactInfo.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} {field.required && "*"}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>

            <div className="border-b pb-2 pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Additional Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formFields.checkboxes.map(checkbox => (
                <label key={checkbox.name} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name={checkbox.name}
                    checked={formData[checkbox.name as keyof typeof formData] as boolean}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">{checkbox.label}</span>
                </label>
              ))}
            </div>

            {formData.DepositVehicle && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deposit Amount
                </label>
                <input
                  type="number"
                  name="DepositAmount"
                  value={formData.DepositAmount}
                  onChange={handleInputChange}
                  placeholder="10,000"
                  min={0}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}

            <div className="border-b pb-2 pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Vehicle Pickup Address</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.addressFields.map(field => (
                <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} {field.required && "*"}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  GPS Location
                </h3>
                <div className="flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={loadingLocation}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 text-sm"
                  >
                    {loadingLocation ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Navigation className="w-4 h-4" />
                    )}
                    {loadingLocation ? "Getting..." : "Get Location"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setMapOpen(true)}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                  >
                    <MapPin className="w-4 h-4" />
                    Open Map Picker
                  </button>
                </div>
              </div>
              
              {locationError && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
                  {locationError}
                </div>
              )}

              {formData.pickupLatitude && formData.pickupLongitude && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Latitude
                    </label>
                    <input
                      type="text"
                      value={formData.pickupLatitude}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Longitude
                    </label>
                    <input
                      type="text"
                      value={formData.pickupLongitude}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              )}
              
              {showMap && (
                <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(formData.pickupLongitude) - 0.01},${parseFloat(formData.pickupLatitude) - 0.01},${parseFloat(formData.pickupLongitude) + 0.01},${parseFloat(formData.pickupLatitude) + 0.01}&layer=mapnik&marker=${formData.pickupLatitude},${formData.pickupLongitude}`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    title="Location Map"
                  />
                </div>
              )}
            </div>
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loadingLocation || isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Now"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {mapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-5xl h-[80vh] bg-white rounded-lg overflow-hidden shadow-lg flex flex-col">
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Select Location on Map</h3>
                <p className="text-sm text-gray-600 mt-1">Click anywhere on the map to set your location</p>
              </div>
              <button
                onClick={() => setMapOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition text-sm font-medium"
              >
                Close
              </button>
            </div>
            <div className="flex-1">
              <MapContainer center={mapCenter} zoom={14} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler onClick={onMapClick} />
                {markerPos && <Marker position={markerPos} />}
              </MapContainer>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Posted Successfully! 🎉
            </h2>
            <p className="text-gray-600 mb-6">
              Your car is now listed and visible to all users.
            </p>
            <button
              onClick={handleModalClose}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-md"
            >
              View Listed Cars
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCarPage;