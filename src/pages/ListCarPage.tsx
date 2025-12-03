import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { MapPin, Navigation, Loader, Plus, X, ChevronDown } from "lucide-react";
import apiService from "../services/api.service";
import carData from "./data/carData.json";


interface TypeableDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
}

const TypeableDropdown: React.FC<TypeableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset to selected value if user didn't select anything
        if (!options.includes(inputValue)) {
          setInputValue(value);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputValue, value, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    // If exact match exists, select it
    const exactMatch = options.find(opt => opt.toLowerCase() === newValue.toLowerCase());
    if (exactMatch) {
      onChange(exactMatch);
    }
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setInputValue(option);
    setIsOpen(false);
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleDropdownClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`w-full flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white cursor-text"
          }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          className={`flex-1 px-4 py-3 outline-none rounded-lg ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            }`}
        />
        <button
          type="button"
          onClick={handleDropdownClick}
          disabled={disabled}
          className="px-3 py-3"
        >
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden top-full">
          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-3 cursor-pointer transition ${option === value
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "hover:bg-gray-50"
                    }`}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-center">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

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
        return { latitude: data[0].lat, longitude: data[0].lon, displayName: data[0].display_name };
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

function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({ click(e: any) { onClick(e.latlng.lat, e.latlng.lng); } });
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
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const carNumberRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{1,4}$/i;
  const [carNumberError, setCarNumberError] = useState("");

  const getUserId = () => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId || "";
  };

  const [formData, setFormData] = useState({
    userId: getUserId(),
    CarName: "", CarBrand: "", CarModel: "", CarNumber: "", Carseater: "",
    CarYear: "", fuelType: "", transmissionType: "", kmDriven: "",
    Ac_available: false, description: "", RentPerHour: "", RentPerDay: "",
    contactName: "", contactNumber: "", DepositAmount: "0",
    drivingLicenseRequired: false, AadharCardRequired: false, DepositVehicle: false,
    photoFront: null as File | null,
    photoBack: null as File | null,
    photoLeft: null as File | null,
    photoRight: null as File | null,
    photoInterior: null as File | null,
    pickupArea: "", pickupCity: "", pickupCityState: "",
    pickupCityPinCode: "", pickupCityCountry: "", pickupLatitude: "17.4889",
    pickupLongitude: "78.4603", gps: false,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (formData.CarBrand && carData.carModels[formData.CarBrand as keyof typeof carData.carModels]) {
      setAvailableModels(carData.carModels[formData.CarBrand as keyof typeof carData.carModels]);
      setFormData(prev => ({ ...prev, CarModel: "" }));
    } else {
      setAvailableModels([]);
    }
  }, [formData.CarBrand]);

  const transmissionOptions = ["Manual", "Automatic", "AMT", "CVT", "DCT", "iMT"];
  const states = carData.states;
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  useEffect(() => {
    if (formData.pickupCityState) {
      const cities = carData.cities[formData.pickupCityState as keyof typeof carData.cities] || [];
      setAvailableCities(cities);
      // Reset city when state changes
      setFormData(prev => ({ ...prev, pickupCity: "" }));
    } else {
      setAvailableCities([]);
    }
  }, [formData.pickupCityState]);


  // Add this useEffect after the bike brand/model useEffect (around line 210)

  useEffect(() => {
    if (formData.pickupCityState) {
      const cities = carData.cities[formData.pickupCityState as keyof typeof carData.cities] || [];
      setAvailableCities(cities);
      // Reset city when state changes
      setFormData(prev => ({ ...prev, pickupCity: "" }));
    } else {
      setAvailableCities([]);
    }
  }, [formData.pickupCityState]);

  // Typeable dropdown fields configuration
  const typeableFields = [
    { name: "CarBrand", label: "Car Brand", options: carData?.carBrands || [], placeholder: "Type brand name..." },
    { name: "CarModel", label: "Car Model", options: availableModels, placeholder: "Type model name...", disabled: !formData.CarBrand },
    { name: "CarYear", label: "Manufacturing Year", options: carData?.years || [], placeholder: "Type year..." },
    { name: "Carseater", label: "Seating Capacity", options: carData?.seatingCapacity || [], placeholder: "Type seats..." },

    { name: "fuelType", label: "Fuel Type", options: carData?.fuelTypes || [], placeholder: "Type fuel type..." },
    { name: "transmissionType", label: "Transmission", options: transmissionOptions, placeholder: "Type transmission..." },
  ];

  const textFields = [
    { name: "CarNumber", label: "Car Number", placeholder: "AP12AB1234" },
    { name: "kmDriven", label: "KM Driven", placeholder: "15000" },
    { name: "RentPerHour", label: "Rent Per Hour (₹)", type: "number", placeholder: "500" },
    { name: "RentPerDay", label: "Rent Per Day (₹)", type: "number", placeholder: "5000" },
  ];

  const contactFields = [
    { name: "contactName", label: "Name", placeholder: "John Doe" },
    { name: "contactNumber", label: "Contact Number", placeholder: "9876543210", pattern: "[0-9]{10}" },
  ];
  // Create NEW array for address dropdowns (State and City)
  const addressDropdownFields = [
    { name: "pickupCityState", label: "State", options: states, placeholder: "Type state..." },
    { name: "pickupCity", label: "City", options: availableCities, placeholder: "Type city...", disabled: !formData.pickupCityState },
  ];

  // Update addressFields - keep only text input fields
  const addressFields = [
    { name: "pickupArea", label: "Street/Area", placeholder: "Street name or area" },
    { name: "pickupCityPinCode", label: "Zip/Pincode", placeholder: "500001" },
    { name: "pickupCityCountry", label: "Country", placeholder: "India", fullWidth: true },
  ];

  const checkboxes = [
    { name: "Ac_available", label: "AC Available" },
    { name: "drivingLicenseRequired", label: "Driving License Required" },
    { name: "AadharCardRequired", label: "Aadhar Card Required" },
    { name: "DepositVehicle", label: "Deposit Vehicle Required" },
    { name: "gps", label: "GPS Tracking Available" },
  ];

  useEffect(() => {
    if (formData.pickupLatitude && formData.pickupLongitude) {
      setMarkerPos([parseFloat(formData.pickupLatitude), parseFloat(formData.pickupLongitude)]);
      setMapCenter([parseFloat(formData.pickupLatitude), parseFloat(formData.pickupLongitude)]);
    }
  }, [formData.pickupLatitude, formData.pickupLongitude]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const address = {
        pickupArea: formData.pickupArea, pickupCity: formData.pickupCity,
        pickupCityState: formData.pickupCityState, pickupCityPinCode: formData.pickupCityPinCode,
        pickupCityCountry: formData.pickupCityCountry
      };
      const coords = await GeocodingService.getCoordinates(address);
      if (coords) {
        setFormData((prev) => ({ ...prev, pickupLatitude: coords.latitude, pickupLongitude: coords.longitude }));
        setLocationError("");
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [formData.pickupArea, formData.pickupCity, formData.pickupCityState, formData.pickupCityPinCode, formData.pickupCityCountry]);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };
  // Dedicated handler for CarNumber with validation
  const handleCarNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setFormData((prev) => ({ ...prev, CarNumber: value }));

    if (!carNumberRegex.test(value)) {
      setCarNumberError("Invalid format, e.g., AP12AB1234");
    } else {
      setCarNumberError("");
    }
  };
  const handleTypeableChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSinglePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, photoKey: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, [photoKey]: e.target.files![0] }));
      setFieldErrors((prev) => ({ ...prev, [photoKey]: "" }));
    }
  };

  const removeSinglePhoto = (photoKey: string) => {
    setFormData((prev) => ({ ...prev, [photoKey]: null }));
  };

  const photoFields = [
    { key: "photoFront", label: "Front View" },
    { key: "photoBack", label: "Back View" },
    { key: "photoLeft", label: "Left Side" },
    { key: "photoRight", label: "Right Side" },
    { key: "photoInterior", label: "Interior" },
  ];

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
        setFormData((prev) => ({ ...prev, pickupLatitude: latitude.toString(), pickupLongitude: longitude.toString() }));
        const address = await GeocodingService.reverseGeocode(latitude, longitude);
        if (address) {
          setFormData((prev) => ({
            ...prev, pickupArea: address.street, pickupCity: address.city,
            pickupCityState: address.state, pickupCityPinCode: address.pincode, pickupCityCountry: address.country
          }));
        }
        setLoadingLocation(false);
      },
      (error) => { setLocationError("Unable to retrieve location. Please enable GPS."); setLoadingLocation(false); }
    );
  };

  const onMapClick = (lat: number, lng: number) => {
    setMarkerPos([lat, lng]);
    setLoadingLocation(true);
    GeocodingService.reverseGeocode(lat, lng)
      .then((address) => {
        if (address) {
          setFormData((prev) => ({
            ...prev, pickupLatitude: lat.toString(), pickupLongitude: lng.toString(),
            pickupArea: address.street, pickupCity: address.city, pickupCityState: address.state,
            pickupCityPinCode: address.pincode, pickupCityCountry: address.country
          }));
        }
      })
      .catch((e) => setLocationError(String(e)))
      .finally(() => setLoadingLocation(false));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields and collect errors
    const errors: Record<string, string> = {};

    // Vehicle details validation
    if (!formData.CarBrand) errors.CarBrand = "Car brand is required";
    // CarModel is optional - no validation needed
    if (!formData.CarYear) errors.CarYear = "Manufacturing year is required";
    if (!formData.Carseater) errors.Carseater = "Seating capacity is required";

    if (!formData.fuelType) errors.fuelType = "Fuel type is required";
    if (!formData.transmissionType) errors.transmissionType = "Transmission type is required";
    if (!formData.CarNumber) {
      errors.CarNumber = "Car number is required";
    } else if (!carNumberRegex.test(formData.CarNumber.toUpperCase())) {
      errors.CarNumber = "Invalid format, e.g., AP12AB1234";
    }
    if (!formData.kmDriven) errors.kmDriven = "KM driven is required";
    if (!formData.RentPerHour || parseFloat(formData.RentPerHour) <= 0) {
      errors.RentPerHour = "Valid rent per hour is required";
    }
    if (!formData.RentPerDay) errors.RentPerDay = "Rent per day is required";

    // Contact validation
    if (!formData.contactName) errors.contactName = "Contact name is required";
    if (!formData.contactNumber) {
      errors.contactNumber = "Contact number is required";
    } else if (formData.contactNumber.length !== 10) {
      errors.contactNumber = "Enter a valid 10-digit number";
    }

    // Address validation
    if (!formData.pickupCityState) errors.pickupCityState = "State is required";
    if (!formData.pickupCity) errors.pickupCity = "City is required";
    if (!formData.pickupArea) errors.pickupArea = "Street/Area is required";
    if (!formData.pickupCityPinCode) errors.pickupCityPinCode = "Pincode is required";
    if (!formData.pickupCityCountry) errors.pickupCityCountry = "Country is required";

    // Photo validation - at least one photo required
    const hasAtLeastOnePhoto = formData.photoFront || formData.photoBack || formData.photoLeft || formData.photoRight || formData.photoInterior;
    if (!hasAtLeastOnePhoto) {
      errors.photoFront = "At least one photo is required";
    }

    // Set errors and return if any
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      // Scroll to first error
      const firstErrorField = document.querySelector('[data-error="true"]');
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!formData.userId || formData.userId.length !== 24 || !/^[a-f0-9]{24}$/i.test(formData.userId)) {
      alert("Invalid user ID format. Please log in again."); return;
    }
    if (!formData.pickupLatitude || !formData.pickupLongitude) {
      alert("Please get your current location"); return;
    }

    setIsSubmitting(true);
    const formDataToSend = new FormData();
    const carFullName = `${formData.CarBrand} ${formData.CarModel}`;
    formDataToSend.append("userId", formData.userId.trim());
    formDataToSend.append("CarName", carFullName.trim());
    formDataToSend.append("CarModel", formData.CarYear);
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
    // Append all 5 photos
    if (formData.photoFront) formDataToSend.append("carImages", formData.photoFront);
    if (formData.photoBack) formDataToSend.append("carImages", formData.photoBack);
    if (formData.photoLeft) formDataToSend.append("carImages", formData.photoLeft);
    if (formData.photoRight) formDataToSend.append("carImages", formData.photoRight);
    if (formData.photoInterior) formDataToSend.append("carImages", formData.photoInterior);

    try {
      const response = await apiService.car.createCar(formDataToSend);
      setShowSuccessModal(true);
    } catch (error: any) {
      let errorMessage = "Failed to post car. Please try again.";
      if (error?.response?.data?.message) errorMessage = error.response.data.message;
      else if (error?.response?.data?.error) errorMessage = error.response.data.error;
      else if (error?.message) errorMessage = error.message;
      if (errorMessage.includes("userId") || errorMessage.includes("ObjectId")) errorMessage = "Invalid user ID. Please log in again and try.";
      else if (errorMessage.includes("CarNumber")) errorMessage = "Invalid car number format. Please check and try again.";
      else if (errorMessage.includes("duplicate")) errorMessage = "This car is already listed. Please check the car number.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => { setShowSuccessModal(false); window.location.href = "/listed"; };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">List your Car</h1>

          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-lg font-semibold text-gray-800">Vehicle Details</h2>
            </div>





            {/* Typeable Dropdown Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {typeableFields.map((field) => (
                <div key={field.name} data-error={!!fieldErrors[field.name]}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} {field.name !== "CarModel" && <span className="text-red-500">*</span>}
                  </label>
                  <div className={fieldErrors[field.name] ? "ring-2 ring-red-500 rounded-lg" : ""}>
                    <TypeableDropdown
                      options={field.options}
                      value={formData[field.name as keyof typeof formData] as string}
                      onChange={(value) => {
                        handleTypeableChange(field.name, value);
                        setFieldErrors((prev) => ({ ...prev, [field.name]: "" }));
                      }}
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                      required={field.name !== "CarModel"}
                    />
                  </div>
                  {fieldErrors[field.name] && (
                    <span className="text-red-500 text-xs mt-1">{fieldErrors[field.name]}</span>
                  )}
                </div>
              ))}



              {/* Text/Number Fields */}
              {textFields.map((field) => (
                <div key={field.name} data-error={!!fieldErrors[field.name]}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] as string}
                    onChange={(e) => {
                      if (field.name === "CarNumber") {
                        handleCarNumberChange(e);
                      } else {
                        handleInputChange(e);
                      }
                      setFieldErrors((prev) => ({ ...prev, [field.name]: "" }));
                    }}
                    placeholder={field.placeholder}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${fieldErrors[field.name] ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {fieldErrors[field.name] && (
                    <span className="text-red-500 text-xs mt-1">{fieldErrors[field.name]}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description <span className="text-red-500"></span></label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your car's condition, features, and any additional details..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* Photos - At least one required */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Photos <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500 mb-4">Upload photos of your car from different angles (at least one photo required)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {photoFields.map((photo) => (
                  <div key={photo.key} className="flex flex-col">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {photo.label}
                    </label>
                    {formData[photo.key as keyof typeof formData] ? (
                      <div className="relative group">
                        <img
                          src={URL.createObjectURL(formData[photo.key as keyof typeof formData] as File)}
                          alt={photo.label}
                          className="w-full h-28 object-cover rounded-lg border-2 border-green-400"
                        />
                        <button
                          type="button"
                          onClick={() => removeSinglePhoto(photo.key)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className={`cursor-pointer border-2 border-dashed rounded-lg h-28 flex flex-col items-center justify-center transition ${fieldErrors[photo.key] ? 'border-red-400 bg-red-50' : 'border-blue-300 bg-blue-50 hover:bg-blue-100'}`}>
                        <Plus className={`w-6 h-6 ${fieldErrors[photo.key] ? 'text-red-500' : 'text-blue-600'}`} />
                        <span className={`text-xs mt-1 ${fieldErrors[photo.key] ? 'text-red-500' : 'text-blue-600'}`}>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleSinglePhotoUpload(e, photo.key)}
                          className="hidden"
                        />
                      </label>
                    )}
                    {fieldErrors[photo.key] && (
                      <span className="text-red-500 text-xs mt-1">{fieldErrors[photo.key]}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-b pb-2 pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Your Contact Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactFields.map((field) => (
                <div key={field.name} data-error={!!fieldErrors[field.name]}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={field.name === "contactNumber" ? "tel" : "text"}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] as string}
                    onChange={(e) => {
                      handleInputChange(e);
                      setFieldErrors((prev) => ({ ...prev, [field.name]: "" }));
                    }}
                    placeholder={field.placeholder}
                    pattern={field.pattern}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${fieldErrors[field.name] ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {fieldErrors[field.name] && (
                    <span className="text-red-500 text-xs mt-1">{fieldErrors[field.name]}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Additional Details */}
            <div className="border-b pb-2 pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Additional Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checkboxes.map((cb) => (
                <label key={cb.name} className="flex items-center cursor-pointer">
                  <input type="checkbox" name={cb.name} checked={formData[cb.name as keyof typeof formData] as boolean} onChange={handleInputChange} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                  <span className="ml-3 text-sm text-gray-700">{cb.label}</span>
                </label>
              ))}
            </div>

            {formData.DepositVehicle && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deposit Amount (₹)</label>
                <input type="number" name="DepositAmount" value={formData.DepositAmount} onChange={handleInputChange} placeholder="10,000" min={0} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            )}

            {/* Address */}
            <div className="border-b pb-2 pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Vehicle Pickup Address</h2>
            </div>

            {/* State and City Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addressDropdownFields.map((field) => (
                <div key={field.name} data-error={!!fieldErrors[field.name]}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <div className={fieldErrors[field.name] ? "ring-2 ring-red-500 rounded-lg" : ""}>
                    <TypeableDropdown
                      options={field.options}
                      value={formData[field.name as keyof typeof formData] as string}
                      onChange={(value) => {
                        handleTypeableChange(field.name, value);
                        setFieldErrors((prev) => ({ ...prev, [field.name]: "" }));
                      }}
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                    />
                  </div>
                  {fieldErrors[field.name] && (
                    <span className="text-red-500 text-xs mt-1">{fieldErrors[field.name]}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Address Text Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addressFields.map((field) => (
                <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""} data-error={!!fieldErrors[field.name]}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] as string}
                    onChange={(e) => {
                      handleInputChange(e);
                      setFieldErrors((prev) => ({ ...prev, [field.name]: "" }));
                    }}
                    placeholder={field.placeholder}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${fieldErrors[field.name] ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {fieldErrors[field.name] && (
                    <span className="text-red-500 text-xs mt-1">{fieldErrors[field.name]}</span>
                  )}
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
                    {loadingLocation ? "Getting..." : "Current Location"}
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
              className="w-full bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
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