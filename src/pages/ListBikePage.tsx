// import React, { useState, useEffect } from "react";
// import { MapPin, Navigation, Loader } from "lucide-react";

// const ListBikePage = () => {
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [locationError, setLocationError] = useState("");
//   const [showMap, setShowMap] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     userId: "68f32259cea8a9fa88029262",
//     bikeName: "",
//     bikeModel: "",
//     bikeNumber: "",
//     fuel: "Petrol",
//     transmission: "Manual",
//     pricePerKm: "",
//     description: "",
//     photos: [],
//     contactName: "",
//     contactNumber: "",
//     insuranceNo: "",
//     pickupArea: "",
//     pickupCity: "",
//     pickupCityState: "",
//     pickupCityPinCode: "",
//     pickupCityCountry: "",
//     latitude: "17.4889",
//     longitude: "78.4603",
//     drivingLicense: false,
//     aadharCard: false,
//     depositVehicle: false,
//     depositMoney: "0",
//     gps: false,
//   });

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       getCoordinatesFromAddress();
//     }, 1000);
//     return () => clearTimeout(timeout);
//   }, [
//     formData.pickupArea,
//     formData.pickupCity,
//     formData.pickupCityState,
//     formData.pickupCityPinCode,
//     formData.pickupCityCountry,
//   ]);

//   const getCoordinatesFromAddress = async () => {
//     const { pickupArea, pickupCity, pickupCityState, pickupCityPinCode, pickupCityCountry } = formData;
//     if (!pickupArea && !pickupCity && !pickupCityState && !pickupCityPinCode && !pickupCityCountry) return;

//     setLoadingLocation(true);
//     setLocationError("");

//     try {
//       const query = `${pickupArea}, ${pickupCity}, ${pickupCityState}, ${pickupCityPinCode}, ${pickupCityCountry}`;
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
//       );
//       const data = await response.json();

//       if (data && data.length > 0) {
//         setFormData((prev) => ({
//           ...prev,
//           latitude: data[0].lat,
//           longitude: data[0].lon,
//         }));
//       } else {
//         setLocationError("Unable to find coordinates for the given address.");
//       }
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       setLocationError("Error getting coordinates.");
//     } finally {
//       setLoadingLocation(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type } = e.target;
//     let val = value;

//     if (type === "checkbox") {
//       val = e.target.checked;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: val,
//     }));
//   };

//   const handlePhotoUpload = (e) => {
//     if (e.target.files) {
//       const filesArray = Array.from(e.target.files);
//       setFormData((prev) => ({ ...prev, photos: filesArray }));
//     }
//   };

//   const getCurrentLocation = () => {
//     setLoadingLocation(true);
//     setLocationError("");

//     if (!navigator.geolocation) {
//       setLocationError("Geolocation is not supported by your browser");
//       setLoadingLocation(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
        
//         setFormData((prev) => ({
//           ...prev,
//           latitude: latitude.toString(),
//           longitude: longitude.toString(),
//         }));

//         await reverseGeocode(latitude, longitude);
//         setLoadingLocation(false);
//       },
//       (error) => {
//         setLocationError("Unable to retrieve location. Please enable GPS.");
//         setLoadingLocation(false);
//         console.error(error);
//       }
//     );
//   };

//   const reverseGeocode = async (lat, lon) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
//       );
//       const data = await response.json();
      
//       if (data.address) {
//         setFormData((prev) => ({
//           ...prev,
//           pickupArea: data.address.road || data.address.suburb || "",
//           pickupCity: data.address.city || data.address.town || data.address.village || "",
//           pickupCityState: data.address.state || "",
//           pickupCityPinCode: data.address.postcode || "",
//           pickupCityCountry: data.address.country || "",
//         }));
//       }
//     } catch (error) {
//       console.error("Geocoding error:", error);
//     }
//   };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // Validation
//   if (!formData.bikeName || !formData.pricePerKm || !formData.contactNumber) {
//     alert("Please fill in all required fields");
//     return;
//   }

//   if (!formData.pickupArea || !formData.pickupCity || !formData.pickupCityState || 
//       !formData.pickupCityPinCode || !formData.pickupCityCountry) {
//     alert("Please fill in all address fields");
//     return;
//   }

//   if (!formData.latitude || !formData.longitude) {
//     alert("Please get your current location");
//     return;
//   }

//   if (formData.photos.length === 0) {
//     alert("Please upload at least one photo");
//     return;
//   }

//   setIsSubmitting(true);

//   const formDataToSend = new FormData();
  
//   // Basic Info
//   formDataToSend.append("userId", formData.userId);
//   formDataToSend.append("bikeName", formData.bikeName);
//   formDataToSend.append("bikeModel", formData.bikeModel);
//   formDataToSend.append("bikeNumber", formData.bikeNumber);
//   formDataToSend.append("fuel", formData.fuel);
//   formDataToSend.append("transmission", formData.transmission);
//   formDataToSend.append("pricePerKm", formData.pricePerKm);
//   formDataToSend.append("description", formData.description);
  
//   // Contact Info
//   formDataToSend.append("contactName", formData.contactName);
//   formDataToSend.append("contactNumber", formData.contactNumber);
//   formDataToSend.append("InsuranceNo", formData.insuranceNo);
  
//   // Location Info
//   formDataToSend.append("pickupArea", formData.pickupArea);
//   formDataToSend.append("pickupCity", formData.pickupCity);
//   formDataToSend.append("pickupCityState", formData.pickupCityState);
//   formDataToSend.append("pickupCityPinCode", formData.pickupCityPinCode);
//   formDataToSend.append("pickupCityCountry", formData.pickupCityCountry);
//   formDataToSend.append("latitude", formData.latitude);
//   formDataToSend.append("longitude", formData.longitude);
  
//   // Additional Info
//   formDataToSend.append("gps", formData.gps.toString());
//   formDataToSend.append("drivingLicense", formData.drivingLicense.toString());
//   formDataToSend.append("aadharCard", formData.aadharCard.toString());
//   formDataToSend.append("depositVehicle", formData.depositVehicle.toString());
//   formDataToSend.append("depositMoney", formData.depositMoney);
  
//   // Photos
//   formData.photos.forEach((photo) => {
//     formDataToSend.append("bikeImages", photo);
//   });

//   try {
//     const response = await fetch("http://52.66.238.227:3000/createBike", {
//       method: "POST",
//       body: formDataToSend,
//     });

//     // Check if response is OK
//     if (!response.ok) {
//       const errorText = await response.text();
//       let errorMessage;
//       try {
//         const errorData = JSON.parse(errorText);
//         errorMessage = errorData.message || errorData.error || "Unknown error";
//       } catch {
//         errorMessage = errorText || `HTTP error! status: ${response.status}`;
//       }
//       throw new Error(errorMessage);
//     }

//     const result = await response.json();
//     console.log("✅ Bike created successfully:", result);
    
//     setShowSuccessModal(true);
//   } catch (error) {
//     console.error("❌ Error:", error);
//     alert(`Failed to post bike: ${error.message}`);
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   const handleModalClose = () => {
//     setShowSuccessModal(false);
//     // Navigate to listed bikes page - this will trigger a refresh
//     window.location.href = "/listed-bikes";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
//             List your Bike
//           </h1>

//           <div className="space-y-6">
//             {/* Vehicle Details Section Header */}
//             <div className="border-b pb-2">
//               <h2 className="text-lg font-semibold text-gray-800">Vehicle Details</h2>
//             </div>

//             {/* Two Column Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Bike Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bike Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="bikeName"
//                   value={formData.bikeName}
//                   onChange={handleInputChange}
//                   placeholder="Royal Enfield Classic"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                   required
//                 />
//               </div>

//               {/* Bike Model */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bike Model *
//                 </label>
//                 <input
//                   type="text"
//                   name="bikeModel"
//                   value={formData.bikeModel}
//                   onChange={handleInputChange}
//                   placeholder="BS4"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                   required
//                 />
//               </div>

//               {/* Bike Number */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bike Number *
//                 </label>
//                 <input
//                   type="text"
//                   name="bikeNumber"
//                   value={formData.bikeNumber}
//                   onChange={handleInputChange}
//                   placeholder="AP12AB1234"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                   required
//                 />
//               </div>

//               {/* Fuel */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Fuel *
//                 </label>
//                 <select
//                   name="fuel"
//                   value={formData.fuel}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   required
//                 >
//                   <option value="Petrol">Petrol</option>
//                   <option value="Diesel">Diesel</option>
//                   <option value="Electric">Electric</option>
//                 </select>
//               </div>

//               {/* Transmission */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Transmission *
//                 </label>
//                 <select
//                   name="transmission"
//                   value={formData.transmission}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   required
//                 >
//                   <option value="Manual">Manual</option>
//                   <option value="Automatic">Automatic</option>
//                 </select>
//               </div>

//               {/* Price Per Km */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Price (per km) *
//                 </label>
//                 <input
//                   type="number"
//                   name="pricePerKm"
//                   value={formData.pricePerKm}
//                   onChange={handleInputChange}
//                   placeholder="250"
//                   min={0}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Description - Full Width */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 placeholder="Bike description"
//                 rows={4}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
//               />
//             </div>

//             {/* Photos - Full Width */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Add Photos *
//               </label>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handlePhotoUpload}
//                 className="mb-2 w-full"
//                 required
//               />
//               {formData.photos.length > 0 && (
//                 <p className="text-sm text-green-600">
//                   {formData.photos.length} photo(s) selected
//                 </p>
//               )}
//             </div>

//             {/* Your Contact Information Section */}
//             <div className="border-b pb-2 pt-4">
//               <h2 className="text-lg font-semibold text-gray-800">Your Contact Information</h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Contact Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="contactName"
//                   value={formData.contactName}
//                   onChange={handleInputChange}
//                   placeholder="John Doe"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   required
//                 />
//               </div>

//               {/* Contact Number */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Contact Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="contactNumber"
//                   value={formData.contactNumber}
//                   onChange={handleInputChange}
//                   placeholder="9876543210"
//                   pattern="[0-9]{10}"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Additional Details and Documents Section */}
//             <div className="border-b pb-2 pt-4">
//               <h2 className="text-lg font-semibold text-gray-800">Additional Details and Documents</h2>
//             </div>

//             {/* Insurance Number - Full Width */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Insurance Number
//               </label>
//               <input
//                 type="text"
//                 name="insuranceNo"
//                 value={formData.insuranceNo}
//                 onChange={handleInputChange}
//                 placeholder="1234567890"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>

//             {/* Documents Checkboxes */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <label className="flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="drivingLicense"
//                   checked={formData.drivingLicense}
//                   onChange={handleInputChange}
//                   className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//                 <span className="ml-3 text-sm text-gray-700">Driving License</span>
//               </label>
              
//               <label className="flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="aadharCard"
//                   checked={formData.aadharCard}
//                   onChange={handleInputChange}
//                   className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//                 <span className="ml-3 text-sm text-gray-700">Aadhar Card</span>
//               </label>
              
//               <label className="flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="depositVehicle"
//                   checked={formData.depositVehicle}
//                   onChange={handleInputChange}
//                   className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//                 <span className="ml-3 text-sm text-gray-700">Deposit Vehicle</span>
//               </label>

//               <label className="flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="gps"
//                   checked={formData.gps}
//                   onChange={handleInputChange}
//                   className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//                 <span className="ml-3 text-sm text-gray-700">GPS Tracking Available</span>
//               </label>
//             </div>

//             {/* Deposit Money */}
//             {formData.depositVehicle && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Deposit Amount
//                 </label>
//                 <input
//                   type="number"
//                   name="depositMoney"
//                   value={formData.depositMoney}
//                   onChange={handleInputChange}
//                   placeholder="10,000"
//                   min={0}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//             )}

//             {/* Vehicle Pickup Address Section */}
//             <div className="border-b pb-2 pt-4">
//               <h2 className="text-lg font-semibold text-gray-800">Vehicle Pickup Address</h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Street/Area */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Street/Area *
//                 </label>
//                 <input
//                   type="text"
//                   name="pickupArea"
//                   value={formData.pickupArea}
//                   onChange={handleInputChange}
//                   placeholder="Street name or area"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                   required
//                 />
//               </div>

//               {/* City */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   City *
//                 </label>
//                 <input
//                   type="text"
//                   name="pickupCity"
//                   value={formData.pickupCity}
//                   onChange={handleInputChange}
//                   placeholder="City name"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   required
//                 />
//               </div>

//               {/* State */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   State *
//                 </label>
//                 <input
//                   type="text"
//                   name="pickupCityState"
//                   value={formData.pickupCityState}
//                   onChange={handleInputChange}
//                   placeholder="State name"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   required
//                 />
//               </div>

//               {/* Zip/Pincode */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Zip/Pincode *
//                 </label>
//                 <input
//                   type="text"
//                   name="pickupCityPinCode"
//                   value={formData.pickupCityPinCode}
//                   onChange={handleInputChange}
//                   placeholder="500001"
//                   pattern="[0-9]{6}"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   required
//                 />
//               </div>

//               {/* Country */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Country *
//                 </label>
//                 <input
//                   type="text"
//                   name="pickupCityCountry"
//                   value={formData.pickupCityCountry}
//                   onChange={handleInputChange}
//                   placeholder="India"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   required
//                 />
//               </div>
//             </div>

//             {/* GPS Location Section */}
//             <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
//               <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
//                 <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <MapPin className="w-5 h-5 text-blue-600" />
//                   GPS Location
//                 </h3>
//                 <div className="flex gap-2">
//                   <button
//                     type="button"
//                     onClick={getCurrentLocation}
//                     disabled={loadingLocation}
//                     className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 text-sm"
//                   >
//                     {loadingLocation ? (
//                       <Loader className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <Navigation className="w-4 h-4" />
//                     )}
//                     {loadingLocation ? "Getting..." : "Get Location"}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setShowMap(!showMap)}
//                     className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
//                   >
//                     <MapPin className="w-4 h-4" />
//                     {showMap ? "Hide Map" : "Show Map"}
//                   </button>
//                 </div>
//               </div>

//               {locationError && (
//                 <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
//                   {locationError}
//                 </div>
//               )}

//               {formData.latitude && formData.longitude && (
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">
//                       Latitude
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.latitude}
//                       readOnly
//                       className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">
//                       Longitude
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.longitude}
//                       readOnly
//                       className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Interactive Map */}
//               {showMap && (
//                 <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
//                   <iframe
//                     src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(formData.longitude) - 0.01},${parseFloat(formData.latitude) - 0.01},${parseFloat(formData.longitude) + 0.01},${parseFloat(formData.latitude) + 0.01}&layer=mapnik&marker=${formData.latitude},${formData.longitude}`}
//                     width="100%"
//                     height="300"
//                     style={{ border: 0 }}
//                     title="Location Map"
//                   />
//                   <div className="bg-gray-100 p-3 text-sm text-gray-600 text-center">
//                     <a 
//                       href={`https://www.openstreetmap.org/?mlat=${formData.latitude}&mlon=${formData.longitude}#map=15/${formData.latitude}/${formData.longitude}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:underline"
//                     >
//                       Open in OpenStreetMap to select precise location
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={loadingLocation || isSubmitting}
//               className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader className="w-5 h-5 animate-spin" />
//                   Posting...
//                 </>
//               ) : (
//                 "Post Now"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
 
//       {/* Success Modal */}
//       {showSuccessModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
//           <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-auto text-center">
//             <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
//               <svg
//                 className="w-10 h-10 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={3}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Posted Successfully! 🎉
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Your bike is now listed and visible to all users.
//             </p>
//             <button
//               onClick={handleModalClose}
//               className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-md"
//             >
//               View Listed Bikes
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListBikePage;


import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Loader, X, Plus } from "lucide-react";

const ListBikePage = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    userId: "68f32259cea8a9fa88029262",
    bikeName: "",
    bikeModel: "",
    bikeNumber: "",
    fuel: "Petrol",
    transmission: "Manual",
    pricePerKm: "",
    description: "",
    photos: [],
    contactName: "",
    contactNumber: "",
    insuranceNo: "",
    pickupArea: "",
    pickupCity: "",
    pickupCityState: "",
    pickupCityPinCode: "",
    pickupCityCountry: "",
    latitude: "17.4889",
    longitude: "78.4603",
    drivingLicense: false,
    aadharCard: false,
    depositVehicle: false,
    depositMoney: "0",
    gps: false,
  });

  // Dynamic form fields configuration
  const formFields = {
    vehicleDetails: [
      { name: "bikeName", label: "Bike Name", type: "text", required: true, placeholder: "Royal Enfield Classic" },
      { name: "bikeModel", label: "Bike Model", type: "text", required: true, placeholder: "BS4" },
      { name: "bikeNumber", label: "Bike Number", type: "text", required: true, placeholder: "AP12AB1234" },
      { 
        name: "fuel", 
        label: "Fuel", 
        type: "select", 
        required: true,
        options: ["Petrol", "Diesel", "Electric", "Hybrid"]
      },
      { 
        name: "transmission", 
        label: "Transmission", 
        type: "select", 
        required: true,
        options: ["Manual", "Automatic", "Semi-Automatic"]
      },
      { name: "pricePerKm", label: "Price (per km)", type: "number", required: true, placeholder: "250", min: 0 }
    ],
    contactInfo: [
      { name: "contactName", label: "Name", type: "text", required: true, placeholder: "John Doe" },
      { name: "contactNumber", label: "Contact Number", type: "tel", required: true, placeholder: "9876543210", pattern: "[0-9]{10}" }
    ],
    additionalDetails: [
      { name: "insuranceNo", label: "Insurance Number", type: "text", placeholder: "1234567890", fullWidth: true }
    ],
    addressFields: [
      { name: "pickupArea", label: "Street/Area", type: "text", required: true, placeholder: "Street name or area" },
      { name: "pickupCity", label: "City", type: "text", required: true, placeholder: "City name" },
      { name: "pickupCityState", label: "State", type: "text", required: true, placeholder: "State name" },
      { name: "pickupCityPinCode", label: "Zip/Pincode", type: "text", required: true, placeholder: "500001", pattern: "[0-9]{6}" },
      { name: "pickupCityCountry", label: "Country", type: "text", required: true, placeholder: "India", fullWidth: true }
    ],
    checkboxes: [
      { name: "drivingLicense", label: "Driving License" },
      { name: "aadharCard", label: "Aadhar Card" },
      { name: "depositVehicle", label: "Deposit Vehicle" },
      { name: "gps", label: "GPS Tracking Available" }
    ]
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getCoordinatesFromAddress();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [
    formData.pickupArea,
    formData.pickupCity,
    formData.pickupCityState,
    formData.pickupCityPinCode,
    formData.pickupCityCountry,
  ]);

  const getCoordinatesFromAddress = async () => {
    const { pickupArea, pickupCity, pickupCityState, pickupCityPinCode, pickupCityCountry } = formData;
    if (!pickupArea && !pickupCity && !pickupCityState && !pickupCityPinCode && !pickupCityCountry) return;

    setLoadingLocation(true);
    setLocationError("");

    try {
      const query = `${pickupArea}, ${pickupCity}, ${pickupCityState}, ${pickupCityPinCode}, ${pickupCityCountry}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setFormData((prev) => ({
          ...prev,
          latitude: data[0].lat,
          longitude: data[0].lon,
        }));
      } else {
        setLocationError("Unable to find coordinates for the given address.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setLocationError("Error getting coordinates.");
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...filesArray] }));
    }
  };

  const removePhoto = (index) => {
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
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        }));

        await reverseGeocode(latitude, longitude);
        setLoadingLocation(false);
      },
      (error) => {
        setLocationError("Unable to retrieve location. Please enable GPS.");
        setLoadingLocation(false);
        console.error(error);
      }
    );
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.address) {
        setFormData((prev) => ({
          ...prev,
          pickupArea: data.address.road || data.address.suburb || "",
          pickupCity: data.address.city || data.address.town || data.address.village || "",
          pickupCityState: data.address.state || "",
          pickupCityPinCode: data.address.postcode || "",
          pickupCityCountry: data.address.country || "",
        }));
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.bikeName || !formData.pricePerKm || !formData.contactNumber) {
      alert("Please fill in all required fields");
      return;
    }

    if (!formData.pickupArea || !formData.pickupCity || !formData.pickupCityState || 
        !formData.pickupCityPinCode || !formData.pickupCityCountry) {
      alert("Please fill in all address fields");
      return;
    }

    if (!formData.latitude || !formData.longitude) {
      alert("Please get your current location");
      return;
    }

    if (formData.photos.length === 0) {
      alert("Please upload at least one photo");
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    
    formDataToSend.append("userId", formData.userId);
    formDataToSend.append("bikeName", formData.bikeName);
    formDataToSend.append("bikeModel", formData.bikeModel);
    formDataToSend.append("bikeNumber", formData.bikeNumber);
    formDataToSend.append("fuel", formData.fuel);
    formDataToSend.append("transmission", formData.transmission);
    formDataToSend.append("pricePerKm", formData.pricePerKm);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("contactName", formData.contactName);
    formDataToSend.append("contactNumber", formData.contactNumber);
    formDataToSend.append("InsuranceNo", formData.insuranceNo);
    formDataToSend.append("pickupArea", formData.pickupArea);
    formDataToSend.append("pickupCity", formData.pickupCity);
    formDataToSend.append("pickupCityState", formData.pickupCityState);
    formDataToSend.append("pickupCityPinCode", formData.pickupCityPinCode);
    formDataToSend.append("pickupCityCountry", formData.pickupCityCountry);
    formDataToSend.append("latitude", formData.latitude);
    formDataToSend.append("longitude", formData.longitude);
    formDataToSend.append("gps", formData.gps.toString());
    formDataToSend.append("drivingLicense", formData.drivingLicense.toString());
    formDataToSend.append("aadharCard", formData.aadharCard.toString());
    formDataToSend.append("depositVehicle", formData.depositVehicle.toString());
    formDataToSend.append("depositMoney", formData.depositMoney);
    
    formData.photos.forEach((photo) => {
      formDataToSend.append("bikeImages", photo);
    });

    try {
      const response = await fetch("http://3.110.122.127:3000/createBike", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.error || "Unknown error";
        } catch {
          errorMessage = errorText || `HTTP error! status: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("✅ Bike created successfully:", result);
      
      setShowSuccessModal(true);
    } catch (error) {
      console.error("❌ Error:", error);
      alert(`Failed to post bike: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    window.location.href = "/listed-bikes";
  };

  const renderField = (field) => {
    const baseClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition";
    
    if (field.type === "select") {
      return (
        <select
          name={field.name}
          value={formData[field.name]}
          onChange={handleInputChange}
          className={baseClasses}
          required={field.required}
        >
          {field.options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type}
        name={field.name}
        value={formData[field.name]}
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
            List your Bike
          </h1>

          <div className="space-y-6">
            {/* Vehicle Details Section */}
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

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Bike description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* Photos with Preview */}
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

            {/* Contact Information */}
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

            {/* Additional Details */}
            <div className="border-b pb-2 pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Additional Details and Documents</h2>
            </div>

            {formFields.additionalDetails.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                {renderField(field)}
              </div>
            ))}

            {/* Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formFields.checkboxes.map(checkbox => (
                <label key={checkbox.name} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name={checkbox.name}
                    checked={formData[checkbox.name]}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">{checkbox.label}</span>
                </label>
              ))}
            </div>

            {/* Conditional Deposit Amount */}
            {formData.depositVehicle && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deposit Amount
                </label>
                <input
                  type="number"
                  name="depositMoney"
                  value={formData.depositMoney}
                  onChange={handleInputChange}
                  placeholder="10,000"
                  min={0}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}

            {/* Address Section */}
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

            {/* GPS Location */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  GPS Location
                </h3>
                <div className="flex gap-2">
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
                    onClick={() => setShowMap(!showMap)}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                  >
                    <MapPin className="w-4 h-4" />
                    {showMap ? "Hide Map" : "Show Map"}
                  </button>
                </div>
              </div>

              {locationError && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
                  {locationError}
                </div>
              )}

              {formData.latitude && formData.longitude && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Latitude
                    </label>
                    <input
                      type="text"
                      value={formData.latitude}
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
                      value={formData.longitude}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              )}

              {showMap && (
                <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(formData.longitude) - 0.01},${parseFloat(formData.latitude) - 0.01},${parseFloat(formData.longitude) + 0.01},${parseFloat(formData.latitude) + 0.01}&layer=mapnik&marker=${formData.latitude},${formData.longitude}`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    title="Location Map"
                  />
                  <div className="bg-gray-100 p-3 text-sm text-gray-600 text-center">
                    <a 
                      href={`https://www.openstreetmap.org/?mlat=${formData.latitude}&mlon=${formData.longitude}#map=15/${formData.latitude}/${formData.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Open in OpenStreetMap to select precise location
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
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
              Your bike is now listed and visible to all users.
            </p>
            <button
              onClick={handleModalClose}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-md"
            >
              View Listed Bikes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListBikePage;