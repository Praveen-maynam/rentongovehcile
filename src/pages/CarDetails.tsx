// import React, { useEffect, useState } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import apiService from "../services/api.service";
// import BlackCar from "../assets/images/BlackCar.png";
// import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
// import DriverLogo from "../assets/icons/DriverLogo.png";

// interface VehicleDetails {
//   name: string;
//   price: string | number;
//   rating: string;
//   transmission: string;
//   seats: string;
//   fuel: string;
//   ac: string;
//   image: string;
//   email: string;
//   city?: string;
//   street?: string;
//   pincode?: string;
//   doorName?: string;
//   id?: string;
//   carNumber?: string;
//   isAvailable?: boolean;
//   requireDrivingLicense?: boolean;
//   requireAadharCard?: boolean;
//   depositMoney?: string;
//   state?: string;
//   userId?: string;
//   CarModel?: string;
//   CarNumber?: string;
//   contactName: string;
//   contactNumber: string;
//   description: string;
// }

// const defaultVehicle: VehicleDetails = {
//   name: "Hyundai Verna",
//   CarModel: "Thar",
//   price: "250",
//   rating: "4.2",
//   transmission: "Automatic",
//   seats: "5",
//   fuel: "Petrol",
//   ac: "AC",
//   image: BlackCar,
//   description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//   contactName: "Manoj Kumar",
//   contactNumber: "1234567898",
//   email: "owner@example.com",
//   city: "",
//   street: "",
//   pincode: "",
//   doorName: "",
//   isAvailable: true,
// };

// const CarDetails: React.FC = () => {
//   const { carId } = useParams<{ carId: string }>();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { carData, openEditForm } = (location && (location as any).state) || {};

//   type VehicleWithImage = VehicleDetails & {
//     carImages?: File | string;
//   };

//   const [editOpen, setEditOpen] = useState<boolean>(true);
//   const [editVehicle, setEditVehicle] = useState<VehicleWithImage>({
//     ...defaultVehicle,
//     carImages: "",
//   });

//   const [originalVehicle, setOriginalVehicle] = useState<VehicleDetails>(defaultVehicle);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isFetching, setIsFetching] = useState<boolean>(false);
//   const [carImage, setCarImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [additionalImages, setAdditionalImages] = useState<File[]>([]);
//   const [manualUserId, setManualUserId] = useState<string>("");

//   useEffect(() => {
//     if (carId && !carData) {
//       fetchCarDetails(carId);
//     } else if (carData) {
//       mapCarData(carData);
//     }

//     if (openEditForm) {
//       setEditOpen(true);
//     }

//     const storedUserId = localStorage.getItem('userId');
//     if (storedUserId && !manualUserId) {
//       console.log("✅ Auto-loaded userId from localStorage:", storedUserId);
//       setManualUserId(storedUserId);
//     }
//   }, [carId, carData, openEditForm]);

//   const fetchCarDetails = async (id: string) => {
//     try {
//       setIsFetching(true);
//       console.log("📡 Fetching car details for ID:", id);
      
//       const response = await apiService.car.getCarById(id);
//       const data = response.data || response;
      
//       console.log("📥 Received car data:", data);
      
//       if (data && data.car) {
//         mapCarData(data.car);
//       } else if (data) {
//         mapCarData(data);
//       }
//     } catch (error: any) {
//       console.error("❌ Error fetching car details:", error);
//       alert(`Failed to load car details: ${error.message || "Unknown error"}`);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const mapCarData = (car: any) => {
//     console.log("🗺️ Mapping car data:", car);
    
//     const mapped: VehicleDetails = {
//       ...defaultVehicle,
//       name: `${car.CarName || car.name || ""} ${car.CarModel || car.model || ""}`.trim(),
//       carNumber: car.CarNumber || car.carNumber || "",
//       price: car.RentPerHour ?? car.price ?? defaultVehicle.price,
//       CarModel: car.CarModel || defaultVehicle.CarModel,
//       rating: car.rating?.toString?.() || defaultVehicle.rating,
//       transmission: car.transmissionType || car.transmission || defaultVehicle.transmission,
//       seats: car.Carseater?.toString() || car.seats || defaultVehicle.seats,
//       fuel: car.fuelType || car.fuel || defaultVehicle.fuel,
//       ac: car.Ac_available ? "AC" : (car.ac || defaultVehicle.ac),
//       image: car.carImages?.[0] || car.image || defaultVehicle.image,
//       description: car.description || defaultVehicle.description,
//       contactName: car.contactName || defaultVehicle.contactName,
//       contactNumber: car.contactNumber || defaultVehicle.contactNumber,
//       email: car.email || defaultVehicle.email,
//       id: car._id || car.id || undefined,
//       userId: car.userId || car.user_id || undefined,
//       isAvailable: car.isAvailable !== false,
//       city: car.pickupCity || car.city || "",
//       street: car.pickupArea || car.street || "",
//       pincode: car.pickupCityPinCode || car.pincode || "",
//       state: car.pickupCityState || car.state || "",
//       requireDrivingLicense: car.drivingLicenseRequired === "true" || car.drivingLicenseRequired === true,
//       requireAadharCard: car.AadharCardRequired === "true" || car.AadharCardRequired === true,
//       depositMoney: car.DepositAmount?.toString() || "",
//     };
    
//     console.log("✅ Mapped vehicle data:", mapped);
    
//     setEditVehicle(mapped);
//     setOriginalVehicle(mapped);
//     setPreview(mapped.image || null);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
    
//     if (type === "checkbox") {
//       const checked = (e.target as HTMLInputElement).checked;
//       setEditVehicle((prev) => ({ ...prev, [name]: checked }));
//     } else {
//       setEditVehicle((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleCarImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       console.log("📸 Selected main image:", file.name, file.size, "bytes");
//       setCarImage(file);
//       const objectUrl = URL.createObjectURL(file);
//       setPreview(objectUrl);
//       setEditVehicle((prev) => ({ ...prev, image: objectUrl }));
//     }
//   };

//   const handleAdditionalImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       const newImages = Array.from(files).slice(0, 4 - additionalImages.length);
//       console.log("📸 Selected additional images:", newImages.length);
//       setAdditionalImages((prev) => [...prev, ...newImages]);
//     }
//   };

//   const removeAdditionalImage = (index: number) => {
//     console.log("🗑️ Removing additional image at index:", index);
//     setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSave = async () => {
//     const vehicleId = editVehicle.id || carId;

//     if (!vehicleId) {
//       alert("❌ Vehicle ID missing — cannot update.");
//       return;
//     }

//     // Validate required fields
//     const trimmedName = editVehicle.name?.trim();
//     const trimmedPrice = (editVehicle.price ?? "").toString().trim();

//     if (!trimmedName) {
//       alert("❌ Vehicle name is required");
//       return;
//     }
    
//     if (!trimmedPrice || trimmedPrice === "0" || Number(trimmedPrice) <= 0) {
//       alert("❌ Valid price is required (must be greater than 0)");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Get userId
//       let userId = manualUserId || localStorage.getItem('userId') || editVehicle.userId;
      
//       if (!userId) {
//         const possibleKeys = ["user", "userData", "currentUser", "authUser", "userInfo"];
        
//         for (const key of possibleKeys) {
//           const stored = localStorage.getItem(key);
//           if (stored) {
//             try {
//               const parsed = JSON.parse(stored);
//               userId = parsed._id || parsed.id || parsed.userId || parsed.user_id || parsed.uid;
//               if (userId) {
//                 console.log(`✅ Retrieved userId from localStorage.${key}:`, userId);
//                 setManualUserId(userId);
//                 break;
//               }
//             } catch (e) {
//               if (stored && stored.length >= 10 && /^[a-f0-9]+$/i.test(stored)) {
//                 userId = stored;
//                 console.log(`✅ Retrieved userId directly from localStorage.${key}:`, userId);
//                 setManualUserId(userId);
//                 break;
//               }
//             }
//           }
//         }
//       }

//       if (!userId) {
//         console.error("❌ userId not found");
//         alert("❌ User ID is missing. Please enter it manually in the form.");
//         return;
//       }

//       console.log("✅ Using userId:", userId);
      
//       // Split full name into CarName and CarModel
//       const nameParts = trimmedName.split(" ");
//       const CarName = nameParts[0] || trimmedName;
//       const CarModel = nameParts.slice(1).join(" ") || editVehicle.CarModel || "";

//       console.log("📝 Preparing form data...");
//       console.log("  CarName:", CarName);
//       console.log("  CarModel:", CarModel);

//       // Create FormData
//       const formdata = new FormData();

//       // ✅ Add fields matching backend expectations
//       formdata.append("userId", userId);
//       formdata.append("CarName", CarName);
//       formdata.append("CarModel", CarModel);
//       formdata.append("CarNumber", editVehicle.carNumber || "");
      
//       // Parse seats number
//       const seatsValue = (editVehicle.seats ?? "5").toString().replace(/[^\d]/g, "") || "5";
//       formdata.append("Carseater", seatsValue);
      
//       // Lowercase for fuel and transmission
//       const fuelType = editVehicle.fuel.toLowerCase();
//       const transmissionType = editVehicle.transmission.toLowerCase();
      
//       formdata.append("fuelType", fuelType);
//       formdata.append("transmissionType", transmissionType);
//       formdata.append("Ac_available", editVehicle.ac?.toLowerCase() === "ac" ? "true" : "false");
      
//       // Price fields
//       const rentPerHour = trimmedPrice;
//       const rentPerDay = (Number(rentPerHour) * 24).toString();
      
//       formdata.append("RentPerHour", rentPerHour);
//       formdata.append("RentPerDay", rentPerDay);
      
//       console.log("  RentPerHour:", rentPerHour);
//       console.log("  RentPerDay:", rentPerDay);
      
//       // Other required fields
//       formdata.append("description", editVehicle.description || "No description provided");
//       formdata.append("contactName", editVehicle.contactName);
//       formdata.append("contactNumber", editVehicle.contactNumber);
//       formdata.append("gps", "false");
//       formdata.append("kmDriven", "50000");
//       formdata.append("isAvailable", editVehicle.isAvailable ? "true" : "false");

//       // Address fields (if provided)
//       if (editVehicle.city) formdata.append("pickupCity", editVehicle.city);
//       if (editVehicle.street) formdata.append("pickupArea", editVehicle.street);
//       if (editVehicle.pincode) formdata.append("pickupCityPinCode", editVehicle.pincode);
//       if (editVehicle.state) formdata.append("pickupCityState", editVehicle.state);

//       // Document requirements
//       if (editVehicle.requireDrivingLicense) {
//         formdata.append("drivingLicenseRequired", "true");
//       }
//       if (editVehicle.requireAadharCard) {
//         formdata.append("AadharCardRequired", "true");
//       }
//       if (editVehicle.depositMoney && editVehicle.depositMoney !== "0") {
//         formdata.append("DepositAmount", editVehicle.depositMoney);
//       }

//       // ✅ Images - use "carImages" field name
//       if (carImage instanceof File) {
//         formdata.append("carImages", carImage);
//         console.log("📸 Added main image:", carImage.name);
//       }
      
//       if (additionalImages.length > 0) {
//         additionalImages.forEach((img, index) => {
//           formdata.append("carImages", img);
//           console.log(`📸 Adding additional image ${index + 1}:`, img.name);
//         });
//       }

//       console.log("🚀 Sending update request for car ID:", vehicleId);
      
//       // Log FormData contents
//       console.log("📦 FormData contents:");
//       for (const key of Array.from(formdata.keys())) {
//         const value = formdata.get(key);
//         if (value instanceof File) {
//           console.log(`  ${key}:`, { name: value.name, size: value.size, type: value.type });
//         } else {
//           console.log(`  ${key}:`, value);
//         }
//       }

//       // Make the API call
//       const response = await apiService.car.updateCarById(vehicleId, formdata);
//       const result = response.data || response;

//       console.log("📥 API Response:", result);

//       if (result?.message?.toLowerCase().includes("updated") || result?.success || result?.car) {
//         alert("✅ Car updated successfully!");
//         console.log("🎉 Updated car data:", result.car);
        
//         // Refresh the car data
//         if (result.car) {
//           mapCarData(result.car);
//         } else {
//           await fetchCarDetails(vehicleId);
//         }
        
//         // Clear uploaded images
//         setCarImage(null);
//         setAdditionalImages([]);
        
//         // Navigate to listed page
//         navigate("/listed", { state: { refresh: true } });
//       } else {
//         throw new Error(result?.message || "Update failed - no success confirmation received");
//       }
//     } catch (error: any) {
//       console.error("❌ Update Error:", error);
//       console.error("❌ Error Response:", error.response?.data);
      
//       const errorMsg = error.response?.data?.message || 
//                       error.response?.data?.error || 
//                       error.message || 
//                       "Unknown error occurred";
      
//       const errorDetails = error.response?.data?.details || "";
      
//       alert(
//         `❌ Failed to update car:\n\n${errorMsg}\n${errorDetails ? '\n' + errorDetails : ''}\n\n` +
//         `Please check:\n` +
//         `• User ID is correct and matches the car owner\n` +
//         `• All required fields are filled\n` +
//         `• You have permission to edit this car\n` +
//         `• Image files are not too large (< 5MB each)`
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     const vehicleId = editVehicle.id || carId;
    
//     if (!vehicleId) {
//       alert("❌ Vehicle ID missing — cannot delete.");
//       return;
//     }

//     if (!window.confirm(`⚠️ Are you sure you want to delete "${editVehicle.name}"?\n\nThis action cannot be undone.`)) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       console.log("🗑️ Deleting car with ID:", vehicleId);
      
//       const response = await apiService.car.deleteCarById(vehicleId);
//       console.log("✅ Delete Response:", response);

//       const data = response.data || response;

//       if (data?.message?.toLowerCase().includes("deleted") || data?.success) {
//         alert("✅ Car deleted successfully!");
//         navigate("/listed", { state: { refresh: true } });
//       } else {
//         throw new Error(data?.message || "Delete failed");
//       }
//     } catch (error: any) {
//       console.error("❌ Delete Car Error:", error);
//       const errorMsg = error.response?.data?.message || error.message || "Unknown error";
//       alert(`❌ Failed to delete car: ${errorMsg}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isFetching) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="bg-white p-6 rounded-lg shadow-xl">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-700 font-medium">Loading car details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6">
//       {isLoading && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-xl">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="mt-4 text-gray-700 font-medium">Processing...</p>
//           </div>
//         </div>
//       )}

//       <div className="max-w-[1228px] mx-auto flex flex-col md:flex-row gap-10">
//         {/* Left: Vehicle info */}
//         <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
//           <div className="flex flex-col md:flex-row gap-6">
//             <div className="relative w-full md:w-[420px] h-[320px] rounded-xl overflow-hidden shadow-md">
//               <img
//                 src={preview || editVehicle.image || BlackCar}
//                 alt={editVehicle.name}
//                 className="w-full h-full object-cover"
//               />
//               <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
//                 editVehicle.isAvailable 
//                   ? "bg-green-100 text-green-800" 
//                   : "bg-gray-100 text-gray-800"
//               }`}>
//                 ● {editVehicle.isAvailable ? "Available" : "Not Available"}
//               </div>
//             </div>

//             <div className="flex-1">
//               <div className="flex items-center justify-between">
//                 <h1 className="text-3xl font-semibold">{editVehicle.name}</h1>
//                 <div className="bg-yellow-100 px-3 py-1 rounded-md">
//                   <span className="text-sm font-semibold text-yellow-800">★ {editVehicle.rating}</span>
//                 </div>
//               </div>
              
//               {editVehicle.carNumber && (
//                 <div className="mt-2">
//                   <p className="text-lg text-gray-600 font-medium">{editVehicle.carNumber}</p>
//                 </div>
//               )}

//               {editVehicle.CarModel && (
//                 <div className="mt-1">
//                   <p className="text-md text-gray-500">Model: {editVehicle.CarModel}</p>
//                 </div>
//               )}

//               <div className="flex items-baseline mt-2">
//                 <span className="text-3xl font-bold">₹{editVehicle.price}</span>
//                 <span className="text-gray-500 ml-2 text-sm">/hr</span>
//               </div>

//               <div className="flex items-center mt-6 border border-gray-300 rounded-xl overflow-hidden">
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   <img src={AutomaticLogo} alt="Auto" className="w-6 h-6 mb-1" />
//                   <p className="text-sm text-gray-700">{editVehicle.transmission}</p>
//                 </div>
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   <img src={DriverLogo} alt="Seats" className="w-6 h-6 mb-1" />
//                   <p className="text-sm text-gray-700">{editVehicle.seats} Seats</p>
//                 </div>
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   ⛽
//                   <p className="text-sm text-gray-700">{editVehicle.fuel}</p>
//                 </div>
//                 <div className="flex flex-col items-center px-4 py-3">
//                   ❄️
//                   <p className="text-sm text-gray-700">{editVehicle.ac}</p>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <h2 className="text-xl font-semibold mb-2">Description</h2>
//                 <p className="text-gray-600 text-sm leading-relaxed">{editVehicle.description}</p>
//               </div>

//               {editVehicle.street && editVehicle.city && (
//                 <div className="mt-4">
//                   <h3 className="text-sm font-semibold text-gray-700 mb-1">Pickup Location</h3>
//                   <p className="text-sm text-gray-600">
//                     📍 {editVehicle.street}, {editVehicle.city}
//                     {editVehicle.pincode && ` - ${editVehicle.pincode}`}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right: Edit Form */}
//         <aside className="md:w-[380px]">
//           <div className="sticky top-6 bg-white p-6 rounded-2xl shadow-lg">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-semibold">Edit Car Details</h2>
//               <button
//                 onClick={() => setEditOpen((s) => !s)}
//                 className="text-sm text-gray-500 hover:text-gray-700"
//                 type="button"
//               >
//                 {editOpen ? "Hide" : "Show"}
//               </button>
//             </div>

//             {editOpen && (
//               <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
//                 {/* Availability Toggle */}
//                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <label className="text-gray-700 font-medium">Available for Rent</label>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isAvailable"
//                       checked={editVehicle.isAvailable}
//                       onChange={handleChange}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                   </label>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Vehicle Name *</label>
//                   <input
//                     name="name"
//                     value={editVehicle.name}
//                     onChange={handleChange}
//                     placeholder="e.g., Hyundai Verna"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Vehicle Model</label>
//                   <input
//                     name="CarModel"
//                     value={editVehicle.CarModel}
//                     onChange={handleChange}
//                     placeholder="e.g., Verna"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Vehicle Number</label>
//                   <input
//                     name="carNumber"
//                     value={editVehicle.carNumber}
//                     onChange={handleChange}
//                     placeholder="e.g., AP16DH4271"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={editVehicle.description}
//                     onChange={handleChange}
//                     placeholder="Describe your vehicle..."
//                     className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Price per Hour *</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={editVehicle.price}
//                     onChange={handleChange}
//                     placeholder="250"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     min="1"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Transmission</label>
//                   <select
//                     name="transmission"
//                     value={editVehicle.transmission}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="Automatic">Automatic</option>
//                     <option value="Manual">Manual</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Fuel Type</label>
//                   <select
//                     name="fuel"
//                     value={editVehicle.fuel}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="Petrol">Petrol</option>
//                     <option value="Diesel">Diesel</option>
//                     <option value="Electric">Electric</option>
//                     <option value="Hybrid">Hybrid</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Seating Capacity</label>
//                   <input
//                     type="number"
//                     name="seats"
//                     value={editVehicle.seats.toString().replace(/[^\d]/g, '')}
//                     onChange={handleChange}
//                     placeholder="5"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     min="1"
//                     max="20"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Air Conditioning</label>
//                   <select
//                     name="ac"
//                     value={editVehicle.ac}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="AC">AC</option>
//                     <option value="Non-AC">Non-AC</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Contact Name</label>
//                   <input
//                     name="contactName"
//                     value={editVehicle.contactName}
//                     onChange={handleChange}
//                     placeholder="John Doe"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
//                   <input
//                     name="contactNumber"
//                     value={editVehicle.contactNumber}
//                     onChange={handleChange}
//                     placeholder="9876543210"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Manual User ID Input */}
//                 <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                   <label className="block text-gray-700 font-medium mb-2">
//                     User ID (Owner) *
//                     <span className="text-xs text-gray-500 ml-2">Required for updates</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={manualUserId}
//                     onChange={(e) => setManualUserId(e.target.value)}
//                     placeholder="Enter your User ID"
//                     className="w-full border border-yellow-300 rounded-lg p-2 font-mono text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
//                   />
//                   <p className="text-xs text-gray-600 mt-1">
//                     💡 This is your account ID from localStorage
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">City</label>
//                   <input
//                     name="city"
//                     value={editVehicle.city}
//                     onChange={handleChange}
//                     placeholder="Hyderabad"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Street/Area</label>
//                   <input
//                     name="street"
//                     value={editVehicle.street}
//                     onChange={handleChange}
//                     placeholder="Jubilee Hills"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Pincode</label>
//                   <input
//                     name="pincode"
//                     value={editVehicle.pincode}
//                     onChange={handleChange}
//                     placeholder="500033"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">State</label>
//                   <input
//                     name="state"
//                     value={editVehicle.state}
//                     onChange={handleChange}
//                     placeholder="Telangana"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Required Documents */}
//                 <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
//                   <p className="text-sm font-semibold text-gray-700 mb-2">Required Documents</p>
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       name="requireDrivingLicense"
//                       checked={editVehicle.requireDrivingLicense}
//                       onChange={handleChange}
//                       className="rounded"
//                     />
//                     <span className="text-sm text-gray-700">Require Driving License</span>
//                   </label>
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       name="requireAadharCard"
//                       checked={editVehicle.requireAadharCard}
//                       onChange={handleChange}
//                       className="rounded"
//                     />
//                     <span className="text-sm text-gray-700">Require Aadhar Card</span>
//                   </label>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Deposit Amount (₹)</label>
//                   <input
//                     type="number"
//                     name="depositMoney"
//                     value={editVehicle.depositMoney}
//                     onChange={handleChange}
//                     placeholder="5000"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     min="0"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Main Car Image</label>
//                   <div className="w-full h-[180px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center relative bg-gray-50 hover:bg-gray-100 transition">
//                     {preview ? (
//                       <img src={preview} alt="Car Preview" className="w-full h-full object-cover rounded-md" />
//                     ) : (
//                       <div className="text-center">
//                         <p className="text-gray-500">📷 Click to upload car photo</p>
//                         <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
//                       </div>
//                     )}
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                       onChange={handleCarImageChange}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">
//                     Additional Images (Max 4)
//                     {additionalImages.length > 0 && (
//                       <span className="text-xs text-gray-500 ml-2">
//                         ({additionalImages.length}/4)
//                       </span>
//                     )}
//                   </label>
//                   <div className="w-full border-2 border-dashed border-gray-300 rounded-md p-4 bg-gray-50">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       className="w-full"
//                       onChange={handleAdditionalImagesChange}
//                       disabled={additionalImages.length >= 4}
//                     />
//                     {additionalImages.length > 0 && (
//                       <div className="grid grid-cols-2 gap-2 mt-3">
//                         {additionalImages.map((img, idx) => (
//                           <div key={idx} className="relative group">
//                             <img
//                               src={URL.createObjectURL(img)}
//                               alt={`Additional ${idx + 1}`}
//                               className="w-full h-20 object-cover rounded"
//                             />
//                             <button
//                               onClick={() => removeAdditionalImage(idx)}
//                               className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition"
//                               type="button"
//                             >
//                               ×
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex gap-2 pt-4 border-t">
//                   <button
//                     onClick={handleSave}
//                     disabled={isLoading}
//                     className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
//                     type="button"
//                   >
//                     {isLoading ? "Saving..." : "💾 Save Changes"}
//                   </button>
//                   <button
//                     onClick={handleDelete}
//                     disabled={isLoading}
//                     className="px-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
//                     type="button"
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default CarDetails;

import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import BlackCar from "../assets/images/BlackCar.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";

interface VehicleDetails {
  name: string;
  price: string | number;
  rating: string;
  transmission: string;
  seats: string;
  fuel: string;
  ac: string;
  image: string;
  email: string;
  city?: string;
  street?: string;
  pincode?: string;
  doorName?: string;
  id?: string;
  carNumber?: string;
  isAvailable?: boolean;
  requireDrivingLicense?: boolean;
  requireAadharCard?: boolean;
  depositMoney?: string;
  state?: string;
  userId?: string;
  CarModel?: string;
  CarNumber?: string;
  contactName: string;
  contactNumber: string;
  description: string;
}

const defaultVehicle: VehicleDetails = {
  name: "Hyundai Verna",
  CarModel: "Thar",
  price: "250",
  rating: "4.2",
  transmission: "Automatic",
  seats: "5",
  fuel: "Petrol",
  ac: "AC",
  image: BlackCar,
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  contactName: "Manoj Kumar",
  contactNumber: "1234567898",
  email: "owner@example.com",
  city: "",
  street: "",
  pincode: "",
  doorName: "",
  isAvailable: true,
};

const CarDetails: React.FC = () => {
  const { carId } = useParams<{ carId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const { carData, openEditForm } = (location && (location as any).state) || {};

  type VehicleWithImage = VehicleDetails & {
    carImages?: File | string;
  };

  const [editOpen, setEditOpen] = useState<boolean>(true);
  const [editVehicle, setEditVehicle] = useState<VehicleWithImage>({
    ...defaultVehicle,
    carImages: "",
  });

  const [originalVehicle, setOriginalVehicle] = useState<VehicleDetails>(defaultVehicle);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [carImage, setCarImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
     const [manualUserId, setManualUserId] = useState<string>("");
   
  useEffect(() => {
    if (carId && !carData) {
      fetchCarDetails(carId);
    } else if (carData) {
      mapCarData(carData);
    }

    if (openEditForm) {
      setEditOpen(true);
    }
  
       const storedUserId = localStorage.getItem('userId');
    if (storedUserId && !manualUserId) {
      console.log("✅ Auto-loaded userId from localStorage:", storedUserId);
      setManualUserId(storedUserId);
    }
  },  [carId, carData, openEditForm]);


  const fetchCarDetails = async (id: string) => {
    try {
      setIsFetching(true);
      console.log("📡 Fetching car details for ID:", id);
      
      const response = await apiService.car.getCarById(id);
      const data = response.data || response;
      
      console.log("📥 Received car data:", data);
      
      if (data && data.car) {
        mapCarData(data.car);
      } else if (data) {
        mapCarData(data);
      }
    } catch (error: any) {
      console.error("❌ Error fetching car details:", error);
      alert(`Failed to load car details: ${error.message || "Unknown error"}`);
    } finally {
      setIsFetching(false);
    }
  };

  const mapCarData = (car: any) => {
    console.log("🗺️ Mapping car data:", car);
    
    const mapped: VehicleDetails = {
      ...defaultVehicle,
      name: `${car.CarName || car.name || ""} ${car.CarModel || car.model || ""}`.trim(),
      carNumber: car.CarNumber || car.carNumber || "",
      price: car.RentPerHour ?? car.price ?? defaultVehicle.price,
      CarModel: car.CarModel || defaultVehicle.CarModel,
      rating: car.rating?.toString?.() || defaultVehicle.rating,
      transmission: car.transmissionType || car.transmission || defaultVehicle.transmission,
      seats: car.Carseater?.toString() || car.seats || defaultVehicle.seats,
      fuel: car.fuelType || car.fuel || defaultVehicle.fuel,
      ac: car.Ac_available ? "AC" : (car.ac || defaultVehicle.ac),
      image: car.carImages?.[0] || car.image || defaultVehicle.image,
      description: car.description || defaultVehicle.description,
      contactName: car.contactName || defaultVehicle.contactName,
      contactNumber: car.contactNumber || defaultVehicle.contactNumber,
      email: car.email || defaultVehicle.email,
      id: car._id || car.id || undefined,
      userId: car.userId || car.user_id || undefined,
      isAvailable: car.Available !== false && car.isAvailable !== false,
      city: car.pickupCity || car.city || "",
      street: car.pickupArea || car.street || "",
      pincode: car.pickupCityPinCode || car.pincode || "",
      state: car.pickupCityState || car.state || "",
      requireDrivingLicense: car.drivingLicenseRequired === "true" || car.drivingLicenseRequired === true,
      requireAadharCard: car.AadharCardRequired === "true" || car.AadharCardRequired === true,
      depositMoney: car.DepositAmount?.toString() || "",
    };
    
    console.log("✅ Mapped vehicle data:", mapped);
    
    setEditVehicle(mapped);
    setOriginalVehicle(mapped);
    setPreview(mapped.image || null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setEditVehicle((prev) => ({ ...prev, [name]: checked }));
    } else {
      setEditVehicle((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCarImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("📸 Selected main image:", file.name, file.size, "bytes");
      setCarImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setEditVehicle((prev) => ({ ...prev, image: objectUrl }));
    }
  };

  const handleAdditionalImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 4 - additionalImages.length);
      console.log("📸 Selected additional images:", newImages.length);
      setAdditionalImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeAdditionalImage = (index: number) => {
    console.log("🗑️ Removing additional image at index:", index);
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const vehicleId = editVehicle.id || carId;

    if (!vehicleId) {
      alert("❌ Vehicle ID missing — cannot update.");
      return;
    }

    // Validate required fields
    const trimmedName = editVehicle.name?.trim();
    const trimmedPrice = (editVehicle.price ?? "").toString().trim();

    if (!trimmedName) {
      alert("❌ Vehicle name is required");
      return;
    }
    
    if (!trimmedPrice || trimmedPrice === "0" || Number(trimmedPrice) <= 0) {
      alert("❌ Valid price is required (must be greater than 0)");
      return;
    }

    setIsLoading(true);

  
       try {
      // Get userId
      let userId = manualUserId || localStorage.getItem('userId') || editVehicle.userId;
      
      if (!userId) {
        const possibleKeys = ["user", "userData", "currentUser", "authUser", "userInfo"];
        
        for (const key of possibleKeys) {
          const stored = localStorage.getItem(key);
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              userId = parsed._id || parsed.id || parsed.userId || parsed.user_id || parsed.uid;
              if (userId) {
                console.log(`✅ Retrieved userId from localStorage.${key}:`, userId);
                setManualUserId(userId);
                break;
              }
            } catch (e) {
              if (stored && stored.length >= 10 && /^[a-f0-9]+$/i.test(stored)) {
                userId = stored;
                console.log(`✅ Retrieved userId directly from localStorage.${key}:`, userId);
                setManualUserId(userId);
                break;
              }
            }
          }
        }
      }

      if (!userId) {
        console.error("❌ userId not found");
        alert("❌ User ID is missing. Please enter it manually in the form.");
        return;
      }

      console.log("✅ Using userId:", userId);
      // Split full name into CarName and CarModel
      const nameParts = trimmedName.split(" ");
      const CarName = nameParts[0] || trimmedName;
      const CarModel = nameParts.slice(1).join(" ") || editVehicle.CarModel || "";

      console.log("📝 Preparing form data...");
      console.log("  CarName:", CarName);
      console.log("  CarModel:", CarModel);

      // Create FormData
      const formdata = new FormData();

      // ✅ Add fields - NO userId needed (like bike update)
      formdata.append("CarName", CarName);
      formdata.append("CarModel", CarModel);
      formdata.append("CarNumber", editVehicle.carNumber || "");
      
      // Parse seats number
      const seatsValue = (editVehicle.seats ?? "5").toString().replace(/[^\d]/g, "") || "5";
      formdata.append("Carseater", seatsValue);
      
      // Lowercase for fuel and transmission
      const fuelType = editVehicle.fuel.toLowerCase();
      const transmissionType = editVehicle.transmission.toLowerCase();
      
      formdata.append("fuelType", fuelType);
      formdata.append("transmissionType", transmissionType);
      formdata.append("Ac_available", editVehicle.ac?.toLowerCase() === "ac" ? "true" : "false");
      
      // Price fields
      const rentPerHour = trimmedPrice;
      const rentPerDay = (Number(rentPerHour) * 24).toString();
      
      formdata.append("RentPerHour", rentPerHour);
      formdata.append("RentPerDay", rentPerDay);
      
      console.log("  RentPerHour:", rentPerHour);
      console.log("  RentPerDay:", rentPerDay);
      
      // Other required fields
      formdata.append("description", editVehicle.description || "No description provided");
      formdata.append("contactName", editVehicle.contactName);
      formdata.append("contactNumber", editVehicle.contactNumber);
      formdata.append("gps", "false");
      formdata.append("kmDriven", "50000");
      formdata.append("isAvailable", editVehicle.isAvailable ? "true" : "false");

      // Address fields (if provided)
      if (editVehicle.city) formdata.append("pickupCity", editVehicle.city);
      if (editVehicle.street) formdata.append("pickupArea", editVehicle.street);
      if (editVehicle.pincode) formdata.append("pickupCityPinCode", editVehicle.pincode);
      if (editVehicle.state) formdata.append("pickupCityState", editVehicle.state);

      // Coordinates (required by backend)
      formdata.append("pickupLatitude", "17.4889");
      formdata.append("pickupLongitude", "78.4603");

      // Document requirements
      if (editVehicle.requireDrivingLicense) {
        formdata.append("drivingLicenseRequired", "true");
      }
      if (editVehicle.requireAadharCard) {
        formdata.append("AadharCardRequired", "true");
      }
      if (editVehicle.depositMoney && editVehicle.depositMoney !== "0") {
        formdata.append("DepositAmount", editVehicle.depositMoney);
      }

      // ✅ Images - use "carImages" field name
      if (carImage instanceof File) {
        formdata.append("carImages", carImage);
        console.log("📸 Added main image:", carImage.name);
      }
      
      if (additionalImages.length > 0) {
        additionalImages.forEach((img, index) => {
          formdata.append("carImages", img);
          console.log(`📸 Adding additional image ${index + 1}:`, img.name);
        });
      }

      console.log("🚀 Sending update request for car ID:", vehicleId);
      
      // Log FormData contents
      console.log("📦 FormData contents:");
      for (const key of Array.from(formdata.keys())) {
        const value = formdata.get(key);
        if (value instanceof File) {
          console.log(`  ${key}:`, { name: value.name, size: value.size, type: value.type });
        } else {
          console.log(`  ${key}:`, value);
        }
      }

      // Make the API call
      const response = await apiService.car.updateCarById(vehicleId, formdata);
      const result = response.data || response;

      console.log("📥 API Response:", result);

      if (result?.message?.toLowerCase().includes("updated") || result?.success || result?.car) {
        alert("✅ Car updated successfully!");
        console.log("🎉 Updated car data:", result.car);
        
        // Refresh the car data
        if (result.car) {
          mapCarData(result.car);
        } else {
          await fetchCarDetails(vehicleId);
        }
        
        // Clear uploaded images
        setCarImage(null);
        setAdditionalImages([]);
        
        // Navigate to listed page
        navigate("/listed", { state: { refresh: true } });
      } else {
        throw new Error(result?.message || "Update failed - no success confirmation received");
      }
    } catch (error: any) {
      console.error("❌ Update Error:", error);
      console.error("❌ Error Response:", error.response?.data);
      
      const errorMsg = error.response?.data?.message || 
                      error.response?.data?.error || 
                      error.message || 
                      "Unknown error occurred";
      
      const errorDetails = error.response?.data?.details || "";
      
      alert(
        `❌ Failed to update car:\n\n${errorMsg}\n${errorDetails ? '\n' + errorDetails : ''}\n\n` +
        `Please check:\n` +
        `• All required fields are filled\n` +
        `• You have permission to edit this car\n` +
        `• Image files are not too large (< 5MB each)`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const vehicleId = editVehicle.id || carId;
    
    if (!vehicleId) {
      alert("❌ Vehicle ID missing — cannot delete.");
      return;
    }

    if (!window.confirm(`⚠️ Are you sure you want to delete "${editVehicle.name}"?\n\nThis action cannot be undone.`)) {
      return;
    }

    setIsLoading(true);

    try {
      console.log("🗑️ Deleting car with ID:", vehicleId);
      
      const response = await apiService.car.deleteCarById(vehicleId);
      console.log("✅ Delete Response:", response);

      const data = response.data || response;

      if (data?.message?.toLowerCase().includes("deleted") || data?.success) {
        alert("✅ Car deleted successfully!");
        navigate("/listed", { state: { refresh: true } });
      } else {
        throw new Error(data?.message || "Delete failed");
      }
    } catch (error: any) {
      console.error("❌ Delete Car Error:", error);
      const errorMsg = error.response?.data?.message || error.message || "Unknown error";
      alert(`❌ Failed to delete car: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
   
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading car details...</p>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-50 px-3 sm:px-4 py-4 sm:py-6">

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-700 font-medium">Processing...</p>
          </div>
        </div>
      )}

     <div className="max-w-[1228px] mx-auto flex flex-col lg:flex-row gap-6 sm:gap-10">

        {/* Left: Vehicle info */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[320px] rounded-xl">

              <img
                src={preview || editVehicle.image || BlackCar}
                alt={editVehicle.name}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                editVehicle.isAvailable 
                  ? "bg-green-100 text-green-800" 
                  : "bg-gray-100 text-gray-800"
              }`}>
                ● {editVehicle.isAvailable ? "Available" : "Not Available"}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold">{editVehicle.name}</h1>
                <div className="bg-yellow-100 px-3 py-1 rounded-md">
                  <span className="text-sm font-semibold text-yellow-800">★ {editVehicle.rating}</span>
                </div>
              </div>
              
              {editVehicle.carNumber && (
                <div className="mt-2">
                  <p className="text-lg text-gray-600 font-medium">{editVehicle.carNumber}</p>
                </div>
              )}

              {editVehicle.CarModel && (
                <div className="mt-1">
                  <p className="text-md text-gray-500">Model: {editVehicle.CarModel}</p>
                </div>
              )}

              <div className="flex items-baseline mt-2">
                <span className="text-3xl font-bold">₹{editVehicle.price}</span>
                <span className="text-gray-500 ml-2 text-sm">/hr</span>
              </div>

              <div className="flex items-center mt-6 border border-gray-300 rounded-xl overflow-hidden">
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  <img src={AutomaticLogo} alt="Auto" className="w-6 h-6 mb-1" />
                  <p className="text-sm text-gray-700">{editVehicle.transmission}</p>
                </div>
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  <img src={DriverLogo} alt="Seats" className="w-6 h-6 mb-1" />
                  <p className="text-sm text-gray-700">{editVehicle.seats} Seats</p>
                </div>
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  ⛽
                  <p className="text-sm text-gray-700">{editVehicle.fuel}</p>
                </div>
                <div className="flex flex-col items-center px-4 py-3">
                  ❄️
                  <p className="text-sm text-gray-700">{editVehicle.ac}</p>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{editVehicle.description}</p>
              </div>

              {editVehicle.street && editVehicle.city && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Pickup Location</h3>
                  <p className="text-sm text-gray-600">
                    📍 {editVehicle.street}, {editVehicle.city}
                    {editVehicle.pincode && ` - ${editVehicle.pincode}`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Edit Form */}
        <aside className="md:w-[380px]">
          <div className="sticky top-6 bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Edit Car Details</h2>
              <button
                onClick={() => setEditOpen((s) => !s)}
                className="text-sm text-gray-500 hover:text-gray-700"
                type="button"
              >
                {editOpen ? "Hide" : "Show"}
              </button>
            </div>

            {editOpen && (
             <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">

                {/* Availability Toggle */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <label className="text-gray-700 font-medium">Available for Rent</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={editVehicle.isAvailable}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Vehicle Name *</label>
                  <input
                    name="name"
                    value={editVehicle.name}
                    onChange={handleChange}
                    placeholder="e.g., Hyundai Verna"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Vehicle Model</label>
                  <input
                    name="CarModel"
                    value={editVehicle.CarModel}
                    onChange={handleChange}
                    placeholder="e.g., Verna"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Vehicle Number</label>
                  <input
                    name="carNumber"
                    value={editVehicle.carNumber}
                    onChange={handleChange}
                    placeholder="e.g., AP16DH4271"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={editVehicle.description}
                    onChange={handleChange}
                    placeholder="Describe your vehicle..."
                    className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Price per Hour *</label>
                  <input
                    type="number"
                    name="price"
                    value={editVehicle.price}
                    onChange={handleChange}
                    placeholder="250"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Transmission</label>
                  <select
                    name="transmission"
                    value={editVehicle.transmission}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Fuel Type</label>
                  <select
                    name="fuel"
                    value={editVehicle.fuel}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Seating Capacity</label>
                  <input
                    type="number"
                    name="seats"
                    value={editVehicle.seats.toString().replace(/[^\d]/g, '')}
                    onChange={handleChange}
                    placeholder="5"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="20"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Air Conditioning</label>
                  <select
                    name="ac"
                    value={editVehicle.ac}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Contact Name</label>
                  <input
                    name="contactName"
                    value={editVehicle.contactName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
                  <input
                    name="contactNumber"
                    value={editVehicle.contactNumber}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Manual User ID Input
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <label className="block text-gray-700 font-medium mb-2">
                    User ID (Owner) *
                    <span className="text-xs text-gray-500 ml-2">Required for updates</span>
                  </label>
                  <input
                    type="text"
                    value={manualUserId}
                    onChange={(e) => setManualUserId(e.target.value)}
                    placeholder="Enter your User ID"
                    className="w-full border border-yellow-300 rounded-lg p-2 font-mono text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    💡 This is your account ID from localStorage
                  </p>
                </div> */}

                <div>
                  <label className="block text-gray-700 font-medium mb-2">City</label>
                  <input
                    name="city"
                    value={editVehicle.city}
                    onChange={handleChange}
                    placeholder="Hyderabad"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Street/Area</label>
                  <input
                    name="street"
                    value={editVehicle.street}
                    onChange={handleChange}
                    placeholder="Jubilee Hills"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Pincode</label>
                  <input
                    name="pincode"
                    value={editVehicle.pincode}
                    onChange={handleChange}
                    placeholder="500033"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">State</label>
                  <input
                    name="state"
                    value={editVehicle.state}
                    onChange={handleChange}
                    placeholder="Telangana"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Required Documents */}
                <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Required Documents</p>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="requireDrivingLicense"
                      checked={editVehicle.requireDrivingLicense}
                      onChange={handleChange}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Require Driving License</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="requireAadharCard"
                      checked={editVehicle.requireAadharCard}
                      onChange={handleChange}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Require Aadhar Card</span>
                  </label>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Deposit Amount (₹)</label>
                  <input
                    type="number"
                    name="depositMoney"
                    value={editVehicle.depositMoney}
                    onChange={handleChange}
                    placeholder="5000"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Main Car Image</label>
                  <div className="w-full h-[180px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center relative bg-gray-50 hover:bg-gray-100 transition">
                    {preview ? (
                      <img src={preview} alt="Car Preview" className="w-full h-full object-cover rounded-md" />
                    ) : (
                      <div className="text-center">
                        <p className="text-gray-500">📷 Click to upload car photo</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleCarImageChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Additional Images (Max 4)
                    {additionalImages.length > 0 && (
                      <span className="text-xs text-gray-500 ml-2">
                        ({additionalImages.length}/4)
                      </span>
                    )}
                  </label>
                  <div className="w-full border-2 border-dashed border-gray-300 rounded-md p-4 bg-gray-50">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="w-full"
                      onChange={handleAdditionalImagesChange}
                      disabled={additionalImages.length >= 4}
                    />
                    {additionalImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {additionalImages.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={URL.createObjectURL(img)}
                              alt={`Additional ${idx + 1}`}
                              className="w-full h-20 object-cover rounded"
                            />
                            <button
                              onClick={() => removeAdditionalImage(idx)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition"
                              type="button"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    type="button"
                  >
                    {isLoading ? "Saving..." : "💾 Save Changes"}
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="px-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    type="button"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  
  );
};

export default CarDetails;




