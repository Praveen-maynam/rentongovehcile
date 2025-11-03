



// import React, { useState, useEffect } from "react";
// import { MapPin, Navigation, Loader } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const ListBikePage = () => {
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [locationError, setLocationError] = useState("");

//   const [formData, setFormData] = useState({
//     userId: "68fe269b6f13375a65dc587a",
//     bikeName: "",
//     bikeModel: "",
//     bikeNumber: "",
//     fuel: "Petrol",
//     transmission: "Manual",
//     farePrice: "",
//     pricePerKm: "",
//     description: "",
//     photos: [],
//     contactName: "",
//     contactNumber: "",
//     insuranceNo: "",
//     street: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//     latitude: "17.4889",
//     longitude: "78.4603",
//     drivingLicense: false,
//     aadharCard: false,
//     depositVehicle: false,
//     depositMoney: "0",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       getCoordinatesFromAddress();
//     }, 1000);
//     return () => clearTimeout(timeout);
//   }, [
//     formData.street,
//     formData.city,
//     formData.state,
//     formData.pincode,
//     formData.country,
//   ]);

//   const getCoordinatesFromAddress = async () => {
//     const { street, city, state, pincode, country } = formData;
//     if (!street && !city && !state && !pincode && !country) return;

//     setLoadingLocation(true);
//     setLocationError("");

//     try {
//       const query = `${street}, ${city}, ${state}, ${pincode}, ${country}`;
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
//           street: data.address.road || data.address.suburb || "",
//           city: data.address.city || data.address.town || data.address.village || "",
//           state: data.address.state || "",
//           pincode: data.address.postcode || "",
//           country: data.address.country || "",
//         }));
//       }
//     } catch (error) {
//       console.error("Geocoding error:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.bikeName || !formData.pricePerKm || !formData.contactNumber) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     if (!formData.street || !formData.city || !formData.state || !formData.pincode || !formData.country) {
//       alert("Please fill in all address fields");
//       return;
//     }

//     if (!formData.latitude || !formData.longitude) {
//       alert("Please get your current location");
//       return;
//     }

//     const formDataToSend = new FormData();
//     formDataToSend.append("userId", formData.userId);
//     formDataToSend.append("bikeName", formData.bikeName);
//     formDataToSend.append("bikeModel", formData.bikeModel);
//     formDataToSend.append("bikeNumber", formData.bikeNumber);
//     // formDataToSend.append("fuel", formData.fuel);
//     // formDataToSend.append("transmission", formData.transmission);
//     formDataToSend.append("pricePerKm", formData.pricePerKm);
//     formDataToSend.append("description", formData.description);
//     formDataToSend.append("contactName", formData.contactName);
//     formDataToSend.append("contactNumber", formData.contactNumber);
//     formDataToSend.append("InsuranceNo", formData.insuranceNo);
//     formDataToSend.append("pickupCitysarea", formData.street);
//     formDataToSend.append("city", formData.city);
//     formDataToSend.append("state", formData.state);
//     formDataToSend.append("pincode", formData.pincode);
//     formDataToSend.append("country", formData.country);
//     formDataToSend.append("latitude", formData.latitude);
//     formDataToSend.append("longitude", formData.longitude);
    
//     formData.photos.forEach((photo) => {
//       formDataToSend.append("bikeImages", photo);
//     });

//     try {
//       const response = await fetch("http://52.66.238.227:3000/createBike", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       const result = await response.json();
//       console.log(result);
//       setShowSuccessModal(true);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to post bike. Please try again.");
//     }
//   };

//   const handleModalClose = () => {
//     setShowSuccessModal(false);
//     navigate("/listed-bikes");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
//             List your Bike
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-6">
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

//               {/* Fare Price */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Fare Price (per day/per km) *
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
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="drivingLicense"
//                   checked={formData.drivingLicense}
//                   onChange={handleInputChange}
//                   className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//                 <span className="ml-3 text-sm text-gray-700">Driving License</span>
//               </label>
              
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="aadharCard"
//                   checked={formData.aadharCard}
//                   onChange={handleInputChange}
//                   className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//                 <span className="ml-3 text-sm text-gray-700">Aadhar Card</span>
//               </label>
              
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="depositVehicle"
//                   checked={formData.depositVehicle}
//                   onChange={handleInputChange}
//                   className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//                 <span className="ml-3 text-sm text-gray-700">Deposit Vehicle</span>
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
//               {/* Street */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Street/Area *
//                 </label>
//                 <input
//                   type="text"
//                   name="street"
//                   value={formData.street}
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
//                   name="city"
//                   value={formData.city}
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
//                   name="state"
//                   value={formData.state}
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
//                   name="pincode"
//                   value={formData.pincode}
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
//                   name="country"
//                   value={formData.country}
//                   onChange={handleInputChange}
//                   placeholder="India"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   required
//                 />
//               </div>
//             </div>

//             {/* GPS Location Section */}
//             <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <MapPin className="w-5 h-5 text-blue-600" />
//                   GPS Location
//                 </h3>
//                 <button
//                   type="button"
//                   onClick={getCurrentLocation}
//                   disabled={loadingLocation}
//                   className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//                 >
//                   {loadingLocation ? (
//                     <Loader className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Navigation className="w-4 h-4" />
//                   )}
//                   {loadingLocation ? "Getting Location..." : "Get Location"}
//                 </button>
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
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loadingLocation}
//               className="w-full bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
//             >
//               Post Now
//             </button>
//           </form>
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
//               className="w-full bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-md"
//             >
//               Done
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListBikePage;




import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Loader } from "lucide-react";

const ListBikePage = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [showMap, setShowMap] = useState(false);

  const [formData, setFormData] = useState({
    userId: "68fe269b6f13375a65dc587a",
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
    const { name, value, type } = e.target;
    let val = value;

    if (type === "checkbox") {
      val = e.target.checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, photos: filesArray }));
    }
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

    if (!formData.pickupArea || !formData.pickupCity || !formData.pickupCityState || !formData.pickupCityPinCode || !formData.pickupCityCountry) {
      alert("Please fill in all address fields");
      return;
    }

    if (!formData.latitude || !formData.longitude) {
      alert("Please get your current location");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("userId", formData.userId);
    formDataToSend.append("bikeName", formData.bikeName);
    formDataToSend.append("bikeModel", formData.bikeModel);
    formDataToSend.append("bikeNumber", formData.bikeNumber);
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
    
    formData.photos.forEach((photo) => {
      formDataToSend.append("bikeImages", photo);
    });

    try {
      const response = await fetch("http://52.66.238.227:3000/createBike", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      console.log(result);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to post bike. Please try again.");
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    window.location.href = "/listed-bikes";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            List your Bike
          </h1>

          <div className="space-y-6">
            {/* Vehicle Details Section Header */}
            <div className="border-b pb-2">
              <h2 className="text-lg font-semibold text-gray-800">Vehicle Details</h2>
            </div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bike Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bike Name *
                </label>
                <input
                  type="text"
                  name="bikeName"
                  value={formData.bikeName}
                  onChange={handleInputChange}
                  placeholder="Royal Enfield Classic"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              {/* Bike Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bike Model *
                </label>
                <input
                  type="text"
                  name="bikeModel"
                  value={formData.bikeModel}
                  onChange={handleInputChange}
                  placeholder="BS4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              {/* Bike Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bike Number *
                </label>
                <input
                  type="text"
                  name="bikeNumber"
                  value={formData.bikeNumber}
                  onChange={handleInputChange}
                  placeholder="AP12AB1234"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              {/* Fuel */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel *
                </label>
                <select
                  name="fuel"
                  value={formData.fuel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transmission *
                </label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              {/* Price Per Km */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (per km) *
                </label>
                <input
                  type="number"
                  name="pricePerKm"
                  value={formData.pricePerKm}
                  onChange={handleInputChange}
                  placeholder="250"
                  min={0}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Description - Full Width */}
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

            {/* Photos - Full Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Photos *
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="mb-2 w-full"
                required
              />
              {formData.photos.length > 0 && (
                <p className="text-sm text-green-600">
                  {formData.photos.length} photo(s) selected
                </p>
              )}
            </div>

            {/* Your Contact Information Section */}
            <div className="border-b pb-2 pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Your Contact Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Additional Details and Documents Section */}
            <div className="border-b pb-2 pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Additional Details and Documents</h2>
            </div>

            {/* Insurance Number - Full Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance Number
              </label>
              <input
                type="text"
                name="insuranceNo"
                value={formData.insuranceNo}
                onChange={handleInputChange}
                placeholder="1234567890"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Documents Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="drivingLicense"
                  checked={formData.drivingLicense}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">Driving License</span>
              </label>
              
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="aadharCard"
                  checked={formData.aadharCard}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">Aadhar Card</span>
              </label>
              
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="depositVehicle"
                  checked={formData.depositVehicle}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">Deposit Vehicle</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="gps"
                  checked={formData.gps}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">GPS Tracking Available</span>
              </label>
            </div>

            {/* Deposit Money */}
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

            {/* Vehicle Pickup Address Section */}
            <div className="border-b pb-2 pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Vehicle Pickup Address</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Street/Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street/Area *
                </label>
                <input
                  type="text"
                  name="pickupArea"
                  value={formData.pickupArea}
                  onChange={handleInputChange}
                  placeholder="Street name or area"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="pickupCity"
                  value={formData.pickupCity}
                  onChange={handleInputChange}
                  placeholder="City name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="pickupCityState"
                  value={formData.pickupCityState}
                  onChange={handleInputChange}
                  placeholder="State name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Zip/Pincode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip/Pincode *
                </label>
                <input
                  type="text"
                  name="pickupCityPinCode"
                  value={formData.pickupCityPinCode}
                  onChange={handleInputChange}
                  placeholder="500001"
                  pattern="[0-9]{6}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Country */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="pickupCityCountry"
                  value={formData.pickupCityCountry}
                  onChange={handleInputChange}
                  placeholder="India"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* GPS Location Section */}
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

              {/* Interactive Map */}
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
              disabled={loadingLocation}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              Post Now
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
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListBikePage;