

// import React, { useEffect, useState } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import apiService from "../services/api.service";
// import Enfield from "../assets/images/Enfield.png"; // Update with your bike image path
// import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
// import DriverLogo from "../assets/icons/DriverLogo.png";

// interface VehicleDetails {
//   name: string;
//   price: string | number;
//   rating: string;
//   transmission: string;
//   fuel: string;
//   image: string;
//   email: string;
//   city?: string;
//   street?: string;
//   pincode?: string;
//   doorName?: string;
//   id?: string;
//   bikenumber?: string;
//   BikeNumber?:string;
//   isAvailable?: boolean;
//   requireDrivingLicense?: boolean;
//   requireAadharCard?: boolean;
//   depositMoney?: string;
//   state?: string;
//   country?: string;
//   userId?: string;
//  BikeModel?: string;
//   contactName: string;
//   contactNumber: string;
//   description: string;
// }

// const defaultVehicle: VehicleDetails = {
//   name: "Royal Enfield Classic 350",
//     BikeModel: "BS6",

//   // bikeNumber: "AP23456789",
//   price: "10",
//   rating: "4.5",
//   transmission: "Manual",
//   fuel: "Petrol",
//   image: Enfield,
//   description: "Well-maintained bike for rent",
//   contactName: "Owner Name",
//   contactNumber: "1234567890",
//   email: "owner@example.com",
//   city: "",
//   street: "",
//   pincode: "",
//   doorName: "",
//   isAvailable: true,
// };

// const BikeDetails: React.FC = () => {
//   const { bikeId } = useParams<{ bikeId: string }>();
//   const location = useLocation();
//   const navigate = useNavigate();

//   console.log("🏍️ Bike ID from URL:", bikeId);


//     const { bikeData, openEditForm } = (location && (location as any).state) || {};
//   // Type extension for image support
//   type VehicleWithImage = VehicleDetails & {
//     bikeImages?: File | string;
//   };

//   const [editOpen, setEditOpen] = useState<boolean>(true);
//   const [editVehicle, setEditVehicle] = useState<VehicleWithImage>({
//     ...defaultVehicle,
//     bikeImages: "",
//   });

//   const [originalVehicle, setOriginalVehicle] = useState<VehicleDetails>(defaultVehicle);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isFetching, setIsFetching] = useState<boolean>(false);
//   const [bikeImage, setBikeImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [additionalImages, setAdditionalImages] = useState<File[]>([]);
//   const [manualUserId, setManualUserId] = useState<string>("");

//   // Alias for consistency with existing code


//   useEffect(() => {
//     if (bikeId && !bikeData) {
//       fetchBikeDetails(bikeId);
//     } else if (bikeData) {
//       mapBikeData(bikeData);
//     }

//     if (openEditForm) {
//       setEditOpen(true);
//     }

//     // Auto-load userId from localStorage
//     const storedUserId = localStorage.getItem('userId');
//     if (storedUserId && !manualUserId) {
//       console.log("✅ Auto-loaded userId from localStorage:", storedUserId);
//       setManualUserId(storedUserId);
//     }
//   }, [bikeId, bikeData, openEditForm]);

//   const fetchBikeDetails = async (id: string) => {
//     try {
//       setIsFetching(true);
//       console.log("📡 Fetching bike details for ID:", id);
      
//       const response = await apiService.bike.getBikeById(id);
//       const data = response.data || response;
      
//       console.log("📥 Received bike data:", data);
      
//       if (data && data.bike) {
//         mapBikeData(data.bike);
//       } else if (data) {
//         mapBikeData(data);
//       }
//     } catch (error: any) {
//       console.error("❌ Error fetching bike details:", error);
//       alert(`Failed to load bike details: ${error.message || "Unknown error"}`);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const mapBikeData = (bike: any) => {
//     console.log("🗺️ Mapping bike data:", bike);
    
//     const mapped: VehicleDetails = {
//       ...defaultVehicle,
//       name: `${bike.bikeName || bike.name || ""} ${bike.BikeModel || bike.model || ""}`.trim(),
//       bikenumber: bike.bikeNumber || bike.bikeNumber || "",
//       BikeModel: bike.bikeModel || bike.model || "",
//       price: bike.RentPerKM ?? bike.price ?? defaultVehicle.price,
//       rating: bike.rating?.toString?.() || defaultVehicle.rating,
//       // transmission: bike.transmissionType || bike.transmission || defaultVehicle.transmission,
//       // fuel: bike.fuelType || bike.fuel || defaultVehicle.fuel,
//       image: bike.bikeImages?.[0] || bike.image || defaultVehicle.image,
//       description: bike.description || defaultVehicle.description,
//       contactName: bike.contactName || defaultVehicle.contactName,
//       contactNumber: bike.contactNumber || defaultVehicle.contactNumber,
//       email: bike.email || defaultVehicle.email,
//       id: bike._id || bike.id || undefined,
//       userId: bike.userId || bike.user_id || undefined,
//       isAvailable: bike.isAvailable !== false,
//       city: bike.pickupCity || bike.city || "",
//       street: bike.pickupArea || bike.street || "",
//       pincode: bike.pickupCityPinCode || bike.pincode || "",
//       state: bike.pickupCityState || bike.state || "",
//       country: bike.pickupCityCountry || bike.country || "India",
//       requireDrivingLicense: bike.drivingLicenseRequired === "true" || bike.drivingLicenseRequired === true,
//       requireAadharCard: bike.AadharCardRequired === "true" || bike.AadharCardRequired === true,
//       depositMoney: bike.DepositAmount?.toString() || "",
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

//   const handleBikeImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       console.log("📸 Selected main image:", file.name, file.size, "bytes");
//       setBikeImage(file);
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


  
//     // const handleAdditionalImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     //   const files = event.target.files;
//     //   if (files) {
//     //     const newImages = Array.from(files).slice(0, 4 - additionalImages.length);
//     //     console.log("📸 Selected additional images:", newImages.length);
//     //     setAdditionalImages((prev) => [...prev, ...newImages]);
//     //   }
//     // };
//   const removeAdditionalImage = (index: number) => {
//     console.log("🗑️ Removing additional image at index:", index);
//     setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const debugFormData = (formData: FormData) => {
//     console.log("📦 FormData contents:");
//     for (const key of Array.from(formData.keys())) {
//       const value = formData.get(key);
//       if (value instanceof File) {
//         console.log(`  ${key}:`, { name: value.name, size: value.size, type: value.type });
//       } else {
//         console.log(`  ${key}:`, value);
//       }
//     }
//   };
//   const handleSave = async () => {
//   const vehicleId = editVehicle.id || bikeId;

//   if (!vehicleId) {
//     alert("❌ Bike ID missing — cannot update.");
//     return;
//   }

//   // Validate required fields
//   const trimmedName = editVehicle.name?.trim();
//   const trimmedPrice = (editVehicle.price ?? "").toString().trim();

//   if (!trimmedName) {
//     alert("❌ Bike name is required");
//     return;
//   }
  
//   if (!trimmedPrice || trimmedPrice === "0" || Number(trimmedPrice) <= 0) {
//     alert("❌ Valid price is required (must be greater than 0)");
//     return;
//   }

//   setIsLoading(true);

//   try {
//     const formdata = new FormData();
//     // Get userId
//     let userId = manualUserId || localStorage.getItem('userId') || editVehicle.userId;
    
//     if (!userId) {
//       // Try parsing stored user objects
//       const possibleKeys = ["user", "userData", "currentUser", "authUser", "userInfo"];
      
//       for (const key of possibleKeys) {
//         const stored = localStorage.getItem(key);
//         if (stored) {
//           console.log(`🔍 Checking localStorage.${key}:`, stored);
//           try {
//             const parsed = JSON.parse(stored);
//             userId = parsed._id || parsed.id || parsed.userId || parsed.user_id || parsed.uid;
//             if (userId) {
//               console.log(`✅ Retrieved userId from localStorage.${key}:`, userId);
//               setManualUserId(userId);
//               break;
//             }
//           } catch (e) {
//             if (stored && stored.length >= 10 && /^[a-f0-9]+$/i.test(stored)) {
//               userId = stored;
//               console.log(`✅ Retrieved userId directly from localStorage.${key}:`, userId);
//               setManualUserId(userId);
//               break;
//             }
//           }
//         }
//       }
//     }

//     if (!userId) {
//       console.error("❌ userId not found in any location");
//        console.log("🔍 Available localStorage keys:", Object.keys(localStorage));
//       alert("❌ User ID is missing. Please enter it manually in the form.");
//       return;
//     }

//     console.log("✅ Using userId:", userId);
    
//     // Split full name into bikeName and bikeModel
//     const nameParts = trimmedName.split(" ");
//     const bikeName = nameParts[0] || trimmedName;
//     const bikeModel = nameParts.slice(1).join(" ") || editVehicle.BikeModel || "";
//       console.log("📝 Preparing form data...");
//       console.log("  bikeName:", bikeName);
//       console.log("  bikeModel:", bikeModel);
//     console.log("📝 Preparing data for API call...");

   
// console.log("🚀 Sending data:", Object.fromEntries(formdata.entries()));
// // --- Ensure both vehicleId and userId are sent explicitly ---
// if (vehicleId) {
//   formdata.append("_id", vehicleId); // or "carId" depending on your backend schema
//   console.log("✅ Attached vehicleId:", vehicleId);
// }

// if (manualUserId || originalVehicle.userId) {
//   formdata.append("userId", (manualUserId || originalVehicle.userId)!.toString());
//   console.log("✅ Attached userId:", manualUserId || originalVehicle.userId);
// } else {
//   console.warn("⚠️ No valid userId found — manual entry required.");
// }


//     // Add all fields that will be converted to headers
//     formdata.append("userId", userId);
//     formdata.append("bikeName", bikeName);
//     formdata.append("bikeModel", bikeModel);
//     formdata.append("bikeNumber", editVehicle.BikeNumber || "");
//     formdata.append("pricePerKm", trimmedPrice);
//     formdata.append("description", editVehicle.description || "");
//     formdata.append("contactName", editVehicle.contactName);
//     formdata.append("contactNumber", editVehicle.contactNumber);
//     // formdata.append("fuelType", editVehicle.fuel.toLowerCase());
//     // formdata.append("transmissionType", editVehicle.transmission.toLowerCase());

//     // Address fields (exact field names from your Postman example)
//     if (editVehicle.city) formdata.append("pickupCity", editVehicle.city);
//     if (editVehicle.street) formdata.append("pickupArea", editVehicle.street);
//     if (editVehicle.pincode) formdata.append("pickupCityPinCode", editVehicle.pincode);
//     if (editVehicle.state) formdata.append("pickupCityState", editVehicle.state);
//     if (editVehicle.country) formdata.append("pickupCityCountry", editVehicle.country);

//     // // Coordinates
//     // formdata.append("latitude", "17.443649");
//     // formdata.append("longitude", "78.445824");

//     // Insurance
//     formdata.append("InsuranceNo", "0987654321");

//     // Document requirements
//     if (editVehicle.requireDrivingLicense) {
//       formdata.append("drivingLicenseRequired", "true");
//     }
//     if (editVehicle.requireAadharCard) {
//       formdata.append("AadharCardRequired", "true");
//     }
//     if (editVehicle.depositMoney && editVehicle.depositMoney !== "0") {
//       formdata.append("DepositAmount", editVehicle.depositMoney);
//     }
// // ✅ Main image upload
// if (bikeImage instanceof File) {
//   formdata.append("carImages", bikeImage);
//   console.log("📸 Added main image:", bikeImage.name);
// } else if (typeof editVehicle.image === "string" && editVehicle.image.startsWith("blob:") === false) {
//   console.log("ℹ️ Using existing image URL (not uploading again)");
// } else {
//   console.warn("⚠️ No main image selected or existing image found");
// }



      
//       if (additionalImages.length > 0) {
//         additionalImages.forEach((img, index) => {
//           formdata.append("carImages", img);
//           console.log(`📸 Adding additional image ${index + 1}:`, img.name);
//         });
//       }
// console.log("🚀 Sending data:", Object.fromEntries(formdata.entries()));
//       console.log("👤 Using userId:", userId);
      
//       debugFormData(formdata);
//     // Make the API call
//     const response = await apiService.bike.updateBikeById(vehicleId, formdata);
//     const result = response.data || response;

//     console.log("📥 API Response:", result);

//     if (result?.message?.toLowerCase().includes("updated") || result?.success) {
//       alert("✅ Bike updated successfully!");
//       console.log("🎉 Updated bike data:", result.bike);
      
//       // Refresh the bike data
//       if (result.bike) {
//         mapBikeData(result.bike);
//       } else {
//         await fetchBikeDetails(vehicleId);
//       }
      
//       // Clear uploaded images (they weren't sent anyway)
//       setBikeImage(null);
//       setAdditionalImages([]);
//         // ✅ Navigate to listed page
//   navigate("/listed", { state: { refresh: true } });
//     } else {
//       throw new Error(result?.message || "Update failed - no success confirmation received");
//     }
//   } catch (error: any) {
//     console.error("❌ Update Error:", error);
//     console.error("❌ Error Response:", error.response?.data);
    
//     const errorMsg = error.response?.data?.message || 
//                     error.response?.data?.error || 
//                     error.message || 
//                     "Unknown error occurred";
    
//     const errorDetails = error.response?.data?.details || "";
    
//     // // Get userId from the same sources as before
//     // const currentUserId = manualUserId || localStorage.getItem('userId') || editVehicle.userId || 'Not found';
    
//       alert(
//         `❌ Failed to update car:\n\n${errorMsg}\n${errorDetails ? '\n' + errorDetails : ''}\n\n` +
//         `Please check:\n` +
//         `• User ID is correct and matches the car owner\n` +
//         `• All required fields are filled\n` +
//         `• You have permission to edit this car\n` +
//         `• Image files are not too large (< 5MB each)`
//       );
//   } finally {
//     setIsLoading(false);
//   }
// };

// const handleDelete = async () => {
//   const vehicleId = editVehicle.id || bikeId;
  
//   if (!vehicleId) {
//     alert("❌ Vehicle ID missing — cannot delete.");
//     return;
//   }

//   if (!window.confirm(`⚠️ Are you sure you want to delete "${editVehicle.name}"?\n\nThis action cannot be undone.`)) {
//     return;
//   }

//   setIsLoading(true);

//   try {
//     console.log("🗑️ Deleting bike with ID:", vehicleId);
    
//     const response = await apiService.bike.deleteBikeById(vehicleId);
//     console.log("✅ Delete Response:", response);

//     const data = response.data || response;

//     if (data?.message?.toLowerCase().includes("deleted") || data?.success) {
//       alert("✅ Bike deleted successfully!");
//       navigate("/listed", { state: { refresh: true } });
//     } else {
//       throw new Error(data?.message || "Delete failed");
//     }
//   } catch (error: any) {
//     console.error("❌ Delete Bike Error:", error);
//     const errorMsg = error.response?.data?.message || error.message || "Unknown error";
//     alert(`❌ Failed to delete bike: ${errorMsg}`);
//   } finally {
//     setIsLoading(false);
//   }
// };
//   if (isFetching) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="bg-white p-6 rounded-lg shadow-xl">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-700 font-medium">Loading bike details...</p>
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
//                 src={preview || editVehicle.image || Enfield}
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
              
//               {editVehicle.BikeNumber && (
//                 <div className="mt-2">
//                   <p className="text-lg text-gray-600 font-medium">{editVehicle.BikeNumber}</p>
//                 </div>
//               )}

//               {editVehicle.BikeModel && (
//                 <div className="mt-1">
//                   <p className="text-md text-gray-500">Model: {editVehicle.BikeModel}</p>
//                 </div>
//               )}

//               <div className="flex items-baseline mt-2">
//                 <span className="text-3xl font-bold">₹{editVehicle.price}</span>
//                 <span className="text-gray-500 ml-2 text-sm">/km</span>
//               </div>
// {/* 
//               <div className="flex items-center mt-6 border border-gray-300 rounded-xl overflow-hidden">
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   <img src={AutomaticLogo} alt="Transmission" className="w-6 h-6 mb-1" />
//                   <p className="text-sm text-gray-700">{editVehicle.transmission}</p>
//                 </div>
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   ⛽
//                   <p className="text-sm text-gray-700">{editVehicle.fuel}</p>
//                 </div>
//               </div> */}

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
//                     {editVehicle.state && `, ${editVehicle.state}`}
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
//               <h2 className="text-2xl font-semibold">Edit Bike Details</h2>
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
//                   <label className="block text-gray-700 font-medium mb-2">Bike Name *</label>
//                   <input
//                     name="name"
//                     value={editVehicle.name}
//                     onChange={handleChange}
//                     placeholder="e.g., Royal Enfield Classic 350"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Bike Model</label>
//                   <input
//                     name="Model"
//                     value={editVehicle.BikeModel}
//                     onChange={handleChange}
//                     placeholder="e.g., BS6"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Bike Number</label>
//                   <input
//                     name="bikeNumber"
//                     value={editVehicle.BikeNumber}
//                     onChange={handleChange}
//                     placeholder="e.g., AP16EH9394"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={editVehicle.description}
//                     onChange={handleChange}
//                     placeholder="Describe your bike..."
//                     className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Price per KM *</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={editVehicle.price}
//                     onChange={handleChange}
//                     placeholder="10"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     min="1"
//                     required
//                   />
//                 </div>

//                 {/* <div>
//                   <label className="block text-gray-700 font-medium mb-2">Transmission</label>
//                   <select
//                     name="transmission"
//                     value={editVehicle.transmission}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="Manual">Manual</option>
//                     <option value="Automatic">Automatic</option>
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
//                   </select>
//                 </div> */}

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
//                     placeholder="Enter your User ID (e.g., 68f32259cea8a9fa88029262)"
//                     className="w-full border border-yellow-300 rounded-lg p-2 font-mono text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
//                   />
//                   <p className="text-xs text-gray-600 mt-1">
//                     💡 This is your account ID. Check browser console or localStorage for stored IDs.
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
//                     placeholder="Banjara Hills"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Pincode</label>
//                   <input
//                     name="pincode"
//                     value={editVehicle.pincode}
//                     onChange={handleChange}
//                     placeholder="500034"
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

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Country</label>
//                   <input
//                     name="country"
//                     value={editVehicle.country}
//                     onChange={handleChange}
//                     placeholder="India"
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
//                     placeholder="3000"
//                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     min="0"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Main Bike Image</label>
//                   <div className="w-full h-[180px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center relative bg-gray-50 hover:bg-gray-100 transition">
//                     {preview ? (
//                       <img src={preview} alt="Bike Preview" className="w-full h-full object-cover rounded-md" />
//                     ) : (
//                       <div className="text-center">
//                         <p className="text-gray-500">📷 Click to upload bike photo</p>
//                         <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
//                       </div>
//                     )}
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                       onChange={handleBikeImageChange}
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

// export default BikeDetails;






 
// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { Loader2 } from "lucide-react";
// // import apiService from "../services/api.service";
 
// // const { bike: bikeAPI, availability: availabilityAPI } = apiService;
 
// // interface BikeDetails {
// //   _id?: string;
// //   userId?: string;
// //   bikeNumber?: string;
// //   bikeName?: string;
// //   bikeModel?: string;
// //   description?: string;
// //   pricePerKm?: number | string;
// //   contactNumber?: string;
// //   contactName?: string;
// //   latitude?: string;
// //   longitude?: string;
// //   pickupArea?: string;
// //   pickupCity?: string;
// //   pickupCityPinCode?: string;
// //   pickupCityState?: string;
// //   pickupCityCountry?: string;
// //   InsuranceNo?: string;
// //   bikeImages?: string | string[];
// //   isNotAvailable?: boolean;
// // }
 
// // const defaultBike: BikeDetails = {
// //   bikeName: "",
// //   bikeModel: "",
// //   pricePerKm: 0,
// //   description: "",
// //   contactName: "",
// //   contactNumber: "",
// //   bikeNumber: "",
// //   pickupArea: "",
// //   pickupCity: "",
// //   pickupCityPinCode: "",
// //   pickupCityState: "",
// //   pickupCityCountry: "India",
// //   latitude: "",
// //   longitude: "",
// //   InsuranceNo: "",
// //   bikeImages: "",
// //   isNotAvailable: false,
// // };
 
// // const BikeDetails: React.FC = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { bikeData } = (location.state as any) || {};
 
// //   const [bike, setBike] = useState<BikeDetails>(defaultBike);
// //   const [price, setPrice] = useState("");
// //   const [bikeImage, setBikeImage] = useState<File | null>(null);
// //   const [preview, setPreview] = useState<string | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [availabilityLoading, setAvailabilityLoading] = useState(false);
// //   const [isAvailable, setIsAvailable] = useState(true);
 
// //   const FIXED_USER_ID = "68f32259cea8a9fa88029262";
 
// //   useEffect(() => {
// //     if (bikeData) {
// //       const mapped: BikeDetails = {
// //         _id: bikeData._id || bikeData.id,
// //         userId: bikeData.userId || FIXED_USER_ID,
// //         bikeNumber: bikeData.bikeNumber || "",
// //         bikeName: bikeData.bikeName || "",
// //         bikeModel: bikeData.bikeModel || "",
// //         description: bikeData.description || "",
// //         pricePerKm: bikeData.pricePerKm || bikeData.price || 0,
// //         contactNumber: bikeData.contactNumber || "",
// //         contactName: bikeData.contactName || "",
// //         latitude: bikeData.latitude || "",
// //         longitude: bikeData.longitude || "",
// //         pickupArea: bikeData.pickupArea || "",
// //         pickupCity: bikeData.pickupCity || "",
// //         pickupCityPinCode: bikeData.pickupCityPinCode || "",
// //         pickupCityState: bikeData.pickupCityState || "",
// //         pickupCityCountry: bikeData.pickupCityCountry || "India",
// //         InsuranceNo: bikeData.InsuranceNo || "",
// //         bikeImages:
// //           bikeData.bikeImages?.[0] ||
// //           bikeData.image ||
// //           bikeData.photos?.[0] ||
// //           "",
// //         isNotAvailable: bikeData.isNotAvailable || false,
// //       };
 
// //       setBike(mapped);
// //       setPrice(mapped.pricePerKm?.toString() || "0");
// //       setPreview(
// //         typeof mapped.bikeImages === "string"
// //           ? mapped.bikeImages
// //           : mapped.bikeImages?.[0] || null
// //       );
// //       setIsAvailable(!mapped.isNotAvailable);
// //     }
// //   }, [bikeData]);
 
// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setBike((prev) => ({ ...prev, [name]: value }));
// //   };
 
// //   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = event.target.files?.[0];
// //     if (file) {
// //       setBikeImage(file);
// //       setPreview(URL.createObjectURL(file));
// //     }
// //   };
 
// //   const handleSave = async () => {
// //     if (!bike._id) return alert("❌ No Bike ID found. Cannot update.");
 
// //     setIsLoading(true);
// //     try {
// //       const formData = new FormData();
// //       formData.append("userId", FIXED_USER_ID);
// //       formData.append("bikeNumber", bike.bikeNumber || "");
// //       formData.append("bikeName", bike.bikeName || "");
// //       formData.append("bikeModel", bike.bikeModel || "");
// //       formData.append("description", bike.description || "");
// //       formData.append("pricePerKm", price || "0");
// //       formData.append("contactNumber", bike.contactNumber || "");
// //       formData.append("contactName", bike.contactName || "");
// //       formData.append("latitude", bike.latitude || "");
// //       formData.append("longitude", bike.longitude || "");
// //       formData.append("pickupArea", bike.pickupArea || "");
// //       formData.append("pickupCity", bike.pickupCity || "");
// //       formData.append("pickupCityPinCode", bike.pickupCityPinCode || "");
// //       formData.append("pickupCityState", bike.pickupCityState || "");
// //       formData.append("pickupCityCountry", bike.pickupCityCountry || "India");
// //       formData.append("InsuranceNo", bike.InsuranceNo || "");
 
// //       if (bikeImage) formData.append("bikeImages", bikeImage);
 
// //       const response: any = await bikeAPI.updateBikeById(bike._id, formData);
     
// //       console.log("📦 Update response:", response);
     
// //       const updatedBike = response?.bike || response?.data?.bike || response;
 
// //       if (updatedBike && updatedBike._id) {
// //         setBike(updatedBike);
// //         setPrice(updatedBike.pricePerKm?.toString() || "0");
       
// //         if (updatedBike.bikeImages && updatedBike.bikeImages.length > 0) {
// //           setPreview(updatedBike.bikeImages[0]);
// //         }
       
// //         alert("✅ Bike updated successfully!");
 
// //         navigate("/listed-bikes", {
// //           state: { refresh: true, updatedBike, timestamp: Date.now() },
// //         });
// //       } else {
// //         throw new Error("Invalid response structure from server");
// //       }
// //     } catch (error: any) {
// //       console.error("Error updating bike:", error);
// //       alert(`❌ Error updating bike: ${error.message || "Unknown error"}`);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };
 
// //   const handleDelete = async () => {
// //     if (!bike._id) return alert("❌ No Bike ID found. Cannot delete.");
// //     if (!window.confirm("Are you sure you want to delete this bike?")) return;
 
// //     setIsLoading(true);
// //     try {
// //       await bikeAPI.deleteBikeById(bike._id);
// //       alert("✅ Bike deleted successfully!");
// //       navigate("/listed-bikes", { state: { refresh: true }, replace: true });
// //     } catch (error: any) {
// //       console.error("Error deleting bike:", error);
// //       alert(`❌ Error deleting bike: ${error.message || "Unknown error"}`);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };
 
// //   // const handleAvailabilityToggle = async () => {
// //   //   if (!bike._id) return alert("❌ No Bike ID found.");
 
// //   //   setAvailabilityLoading(true);
// //   //   try {
// //   //     if (isAvailable) {
// //   //       await availabilityAPI.createUnavailability({
// //   //         VechileId: bike._id,
// //   //         vechileType: "Bike",
// //   //         fromDate: new Date().toISOString().split("T")[0],
// //   //         toDate: new Date().toISOString().split("T")[0],
// //   //         fromTime: "00:00",
// //   //         toTime: "23:59",
// //   //         isNotAvailable: true,
// //   //       });
// //   //     } else {
// //   //       await availabilityAPI.updateUnavailability(bike._id, {
// //   //         VechileId: bike._id,
// //   //         vechileType: "Bike",
// //   //         isNotAvailable: false,
// //   //       });
// //   //     }
 
// //   //     setIsAvailable(!isAvailable);
// //   //     alert(
// //   //       isAvailable
// //   //         ? "🚫 Bike marked as Not Available"
// //   //         : "✅ Bike marked as Available"
// //   //     );
// //   //   } catch (error) {
// //   //     console.error("Availability toggle error:", error);
// //   //     alert("❌ Failed to update availability status.");
// //   //   } finally {
// //   //     setAvailabilityLoading(false);
// //   //   }
// //   // };
 
// //   return (
// //     <div className="min-h-screen bg-gray-50 px-4 py-6">
// //       <div className="max-w-[1228px] mx-auto flex flex-col md:flex-row gap-10">
// //         <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
// //           <div className="flex flex-col md:flex-row gap-6">
// //             <div className="relative w-full md:w-[420px] h-[320px] rounded-xl overflow-hidden bg-gray-100">
// //               {preview ? (
// //                 <img
// //                   src={preview}
// //                   alt={bike.bikeName}
// //                   className="w-full h-full object-cover"
// //                 />
// //               ) : (
// //                 <div className="flex items-center justify-center h-full text-gray-400">
// //                   No image available
// //                 </div>
// //               )}
// //             </div>
 
// //             <div className="flex-1">
// //               <h1 className="text-3xl font-semibold">{bike.bikeName}</h1>
// //               <p className="text-lg text-gray-700 mt-2">
// //                 ₹{price || bike.pricePerKm}/km
// //               </p>
// //               <p className="text-sm text-gray-600 mt-4">{bike.description}</p>
// //             </div>
// //           </div>
// //         </div>
 
// //         <aside className="md:w-[380px]">
// //           <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
// //             <div className="flex items-center justify-between mb-4">
// //               <h2 className="text-2xl font-semibold">Edit Bike Details</h2>
// //               {/* <button
// //                 onClick={handleAvailabilityToggle}
// //                 disabled={availabilityLoading}
// //                 className={`px-4 py-2 rounded-full text-white font-medium transition ${
// //                   isAvailable
// //                     ? "bg-green-600 hover:bg-green-700"
// //                     : "bg-red-500 hover:bg-red-600"
// //                 }`}
// //               >
// //                 {availabilityLoading ? (
// //                   <Loader2 className="animate-spin w-5 h-5" />
// //                 ) : isAvailable ? (
// //                   "Available"
// //                 ) : (
// //                   "Not Available"
// //                 )}
// //               </button> */}
// //             </div>
 
// //             <input
// //               name="bikeName"
// //               value={bike.bikeName}
// //               onChange={handleChange}
// //               placeholder="Bike Name"
// //               className="w-full border border-gray-300 p-2 rounded"
// //             />
// //             <input
// //               name="bikeNumber"
// //               value={bike.bikeNumber}
// //               onChange={handleChange}
// //               placeholder="Bike Number"
// //               className="w-full border border-gray-300 p-2 rounded"
// //             />
// //             <input
// //               name="bikeModel"
// //               value={bike.bikeModel}
// //               onChange={handleChange}
// //               placeholder="Bike Model"
// //               className="w-full border border-gray-300 p-2 rounded"
// //             />
// //             <textarea
// //               name="description"
// //               value={bike.description}
// //               onChange={handleChange}
// //               placeholder="Description"
// //               className="w-full border border-gray-300 p-2 rounded"
// //             />
// //             <input
// //               type="number"
// //               value={price}
// //               onChange={(e) => setPrice(e.target.value)}
// //               placeholder="Price per KM"
// //               className="w-full border border-gray-300 p-2 rounded"
// //             />
// //             <input
// //               name="contactName"
// //               value={bike.contactName}
// //               onChange={handleChange}
// //               placeholder="Owner Name"
// //               className="w-full border border-gray-300 p-2 rounded"
// //             />
// //             <input
// //               name="contactNumber"
// //               value={bike.contactNumber}
// //               onChange={handleChange}
// //               placeholder="Contact Number"
// //               className="w-full border border-gray-300 p-2 rounded"
// //             />
 
// //             <div>
// //               <label className="text-gray-600 text-sm">Upload Image</label>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleImageChange}
// //                 className="w-full border border-gray-300 p-2 rounded"
// //               />
// //             </div>
 
// //             <div className="flex gap-3 pt-3">
// //               <button
// //                 onClick={handleSave}
// //                 disabled={isLoading}
// //                 className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
// //               >
// //                 {isLoading ? "Saving..." : "Save Changes"}
// //               </button>
// //               <button
// //                 onClick={handleDelete}
// //                 disabled={isLoading}
// //                 className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50"
// //               >
// //                 {isLoading ? "Deleting..." : "Delete"}
// //               </button>
// //             </div>
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // };
 
// // export default BikeDetails;
 


import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import Enfield from "../assets/images/Enfield.png";

interface VehicleDetails {
  name: string;
  price: string | number;
  rating: string;
  image: string;
  email: string;
  city?: string;
  street?: string;
  pincode?: string;
  doorName?: string;
  id?: string;
  bikenumber?: string;
  BikeNumber?: string;
  isAvailable?: boolean;
  requireDrivingLicense?: boolean;
  requireAadharCard?: boolean;
  depositMoney?: string;
  state?: string;
  country?: string;
  userId?: string;
  BikeModel?: string;
  contactName: string;
  contactNumber: string;
  description: string;
}

const defaultVehicle: VehicleDetails = {
  name: "Royal Enfield Classic 350",
  BikeModel: "BS6",
  price: "10",
  rating: "4.5",
  image: Enfield,
  description: "Well-maintained bike for rent",
  contactName: "Owner Name",
  contactNumber: "1234567890",
  email: "owner@example.com",
  city: "",
  street: "",
  pincode: "",
  doorName: "",
  isAvailable: true,
};

const BikeDetails: React.FC = () => {
  const { bikeId } = useParams<{ bikeId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const { bikeData, openEditForm } = (location && (location as any).state) || {};

  type VehicleWithImage = VehicleDetails & {
    bikeImages?: File | string;
  };

  const [editOpen, setEditOpen] = useState<boolean>(true);
  const [editVehicle, setEditVehicle] = useState<VehicleWithImage>({
    ...defaultVehicle,
    bikeImages: "",
  });

  const [originalVehicle, setOriginalVehicle] = useState<VehicleDetails>(defaultVehicle);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [bikeImage, setBikeImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [manualUserId, setManualUserId] = useState<string>("");

  useEffect(() => {
    if (bikeId && !bikeData) {
      fetchBikeDetails(bikeId);
    } else if (bikeData) {
      mapBikeData(bikeData);
    }

    if (openEditForm) {
      setEditOpen(true);
    }

    const storedUserId = localStorage.getItem('userId');
    if (storedUserId && !manualUserId) {
      console.log("✅ Auto-loaded userId from localStorage:", storedUserId);
      setManualUserId(storedUserId);
    }
  }, [bikeId, bikeData, openEditForm]);

  const fetchBikeDetails = async (id: string) => {
    try {
      setIsFetching(true);
      console.log("📡 Fetching bike details for ID:", id);
      
      const response = await apiService.bike.getBikeById(id);
      const data = response.data || response;
      
      console.log("📥 Received bike data:", data);
      
      if (data && data.bike) {
        mapBikeData(data.bike);
      } else if (data) {
        mapBikeData(data);
      }
    } catch (error: any) {
      console.error("❌ Error fetching bike details:", error);
      alert(`Failed to load bike details: ${error.message || "Unknown error"}`);
    } finally {
      setIsFetching(false);
    }
  };

  const mapBikeData = (bike: any) => {
    console.log("🗺️ Mapping bike data:", bike);
    
    const mapped: VehicleDetails = {
      ...defaultVehicle,
      name: `${bike.bikeName || bike.name || ""} ${bike.bikeModel || bike.BikeModel || bike.model || ""}`.trim(),
      bikenumber: bike.bikeNumber || "",
      BikeNumber: bike.bikeNumber || "",
      BikeModel: bike.bikeModel || bike.model || "",
      price: bike.pricePerKm ?? bike.price ?? defaultVehicle.price,
      rating: bike.rating?.toString?.() || defaultVehicle.rating,
      image: bike.bikeImages?.[0] || bike.image || defaultVehicle.image,
      description: bike.description || defaultVehicle.description,
      contactName: bike.contactName || defaultVehicle.contactName,
      contactNumber: bike.contactNumber || defaultVehicle.contactNumber,
      email: bike.email || defaultVehicle.email,
      id: bike._id || bike.id || undefined,
      userId: bike.userId || bike.user_id || undefined,
      isAvailable: bike.Available !== false && bike.isAvailable !== false,
      city: bike.pickupCity || bike.city || "",
      street: bike.pickupArea || bike.street || "",
      pincode: bike.pickupCityPinCode || bike.pincode || "",
      state: bike.pickupCityState || bike.state || "",
      country: bike.pickupCityCountry || bike.country || "India",
      requireDrivingLicense: bike.drivingLicenseRequired === "true" || bike.drivingLicenseRequired === true,
      requireAadharCard: bike.AadharCardRequired === "true" || bike.AadharCardRequired === true,
      depositMoney: bike.DepositAmount?.toString() || "",
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

  const handleBikeImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("📸 Selected main image:", file.name, file.size, "bytes");
      setBikeImage(file);
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
    const vehicleId = editVehicle.id || bikeId;

    if (!vehicleId) {
      alert("❌ Bike ID missing — cannot update.");
      return;
    }

    // Validate required fields
    const trimmedName = editVehicle.name?.trim();
    const trimmedPrice = (editVehicle.price ?? "").toString().trim();

    if (!trimmedName) {
      alert("❌ Bike name is required");
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
      
      // Split full name into bikeName and bikeModel
      const nameParts = trimmedName.split(" ");
      const bikeName = nameParts[0] || trimmedName;
      const bikeModel = nameParts.slice(1).join(" ") || editVehicle.BikeModel || "";

      console.log("📝 Preparing form data...");
      console.log("  bikeName:", bikeName);
      console.log("  bikeModel:", bikeModel);

      // Create FormData
      const formdata = new FormData();

      // ✅ CRITICAL: Add fields as headers (based on your Postman example)
      formdata.append("userId", userId);
      formdata.append("bikeName", bikeName);
      formdata.append("bikeModel", bikeModel);
      formdata.append("bikeNumber", editVehicle.BikeNumber || "");
      formdata.append("pricePerKm", trimmedPrice);
      formdata.append("description", editVehicle.description || "");
      formdata.append("contactName", editVehicle.contactName);
      formdata.append("contactNumber", editVehicle.contactNumber);

      // Address fields
      if (editVehicle.city) formdata.append("pickupCity", editVehicle.city);
      if (editVehicle.street) formdata.append("pickupArea", editVehicle.street);
      if (editVehicle.pincode) formdata.append("pickupCityPinCode", editVehicle.pincode);
      if (editVehicle.state) formdata.append("pickupCityState", editVehicle.state);
      if (editVehicle.country) formdata.append("pickupCityCountry", editVehicle.country);

      // Coordinates (required by backend)
      formdata.append("latitude", "17.443649");
      formdata.append("longitude", "78.445824");

      // Insurance
      formdata.append("InsuranceNo", "0987654321");

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

      // ✅ Images - use "bikeImages" field name (matches backend)
      if (bikeImage instanceof File) {
        formdata.append("bikeImages", bikeImage);
        console.log("📸 Added main image:", bikeImage.name);
      }
      
      if (additionalImages.length > 0) {
        additionalImages.forEach((img, index) => {
          formdata.append("bikeImages", img);
          console.log(`📸 Adding additional image ${index + 1}:`, img.name);
        });
      }

      console.log("🚀 Sending update request for bike ID:", vehicleId);
      
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
      const response = await apiService.bike.updateBikeById(vehicleId, formdata);
      const result = response.data || response;

      console.log("📥 API Response:", result);

      if (result?.message?.toLowerCase().includes("updated") || result?.success || result?.bike) {
        alert("✅ Bike updated successfully!");
        console.log("🎉 Updated bike data:", result.bike);
        
        // Refresh the bike data
        if (result.bike) {
          mapBikeData(result.bike);
        } else {
          await fetchBikeDetails(vehicleId);
        }
        
        // Clear uploaded images
        setBikeImage(null);
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
        `❌ Failed to update bike:\n\n${errorMsg}\n${errorDetails ? '\n' + errorDetails : ''}\n\n` +
        `Please check:\n` +
        `• User ID is correct and matches the bike owner\n` +
        `• All required fields are filled\n` +
        `• You have permission to edit this bike\n` +
        `• Image files are not too large (< 5MB each)`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const vehicleId = editVehicle.id || bikeId;
    
    if (!vehicleId) {
      alert("❌ Vehicle ID missing — cannot delete.");
      return;
    }

    if (!window.confirm(`⚠️ Are you sure you want to delete "${editVehicle.name}"?\n\nThis action cannot be undone.`)) {
      return;
    }

    setIsLoading(true);

    try {
      console.log("🗑️ Deleting bike with ID:", vehicleId);
      
      const response = await apiService.bike.deleteBikeById(vehicleId);
      console.log("✅ Delete Response:", response);

      const data = response.data || response;

      if (data?.message?.toLowerCase().includes("deleted") || data?.success) {
        alert("✅ Bike deleted successfully!");
        navigate("/listed", { state: { refresh: true } });
      } else {
        throw new Error(data?.message || "Delete failed");
      }
    } catch (error: any) {
      console.error("❌ Delete Bike Error:", error);
      const errorMsg = error.response?.data?.message || error.message || "Unknown error";
      alert(`❌ Failed to delete bike: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading bike details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-700 font-medium">Processing...</p>
          </div>
        </div>
      )}

      <div className="max-w-[1228px] mx-auto flex flex-col md:flex-row gap-10">
        {/* Left: Vehicle info */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-[420px] h-[320px] rounded-xl overflow-hidden shadow-md">
              <img
                src={preview || editVehicle.image || Enfield}
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
              
              {editVehicle.BikeNumber && (
                <div className="mt-2">
                  <p className="text-lg text-gray-600 font-medium">{editVehicle.BikeNumber}</p>
                </div>
              )}

              {editVehicle.BikeModel && (
                <div className="mt-1">
                  <p className="text-md text-gray-500">Model: {editVehicle.BikeModel}</p>
                </div>
              )}

              <div className="flex items-baseline mt-2">
                <span className="text-3xl font-bold">₹{editVehicle.price}</span>
                <span className="text-gray-500 ml-2 text-sm">/km</span>
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
                    {editVehicle.state && `, ${editVehicle.state}`}
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
              <h2 className="text-2xl font-semibold">Edit Bike Details</h2>
              <button
                onClick={() => setEditOpen((s) => !s)}
                className="text-sm text-gray-500 hover:text-gray-700"
                type="button"
              >
                {editOpen ? "Hide" : "Show"}
              </button>
            </div>

            {editOpen && (
              <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
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
                  <label className="block text-gray-700 font-medium mb-2">Bike Name *</label>
                  <input
                    name="name"
                    value={editVehicle.name}
                    onChange={handleChange}
                    placeholder="e.g., Royal Enfield Classic 350"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Bike Model</label>
                  <input
                    name="BikeModel"
                    value={editVehicle.BikeModel}
                    onChange={handleChange}
                    placeholder="e.g., BS6"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Bike Number</label>
                  <input
                    name="BikeNumber"
                    value={editVehicle.BikeNumber}
                    onChange={handleChange}
                    placeholder="e.g., AP16EH9394"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={editVehicle.description}
                    onChange={handleChange}
                    placeholder="Describe your bike..."
                    className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Price per KM *</label>
                  <input
                    type="number"
                    name="price"
                    value={editVehicle.price}
                    onChange={handleChange}
                    placeholder="10"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    required
                  />
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

                {/* Manual User ID Input */}
                {/* <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
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
                    💡 Check browser console or localStorage for stored IDs.
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
                    placeholder="Banjara Hills"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Pincode</label>
                  <input
                    name="pincode"
                    value={editVehicle.pincode}
                    onChange={handleChange}
                    placeholder="500034"
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

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Country</label>
                  <input
                    name="country"
                    value={editVehicle.country}
                    onChange={handleChange}
                    placeholder="India"
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
                    placeholder="3000"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Main Bike Image</label>
                  <div className="w-full h-[180px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center relative bg-gray-50 hover:bg-gray-100 transition">
                    {preview ? (
                      <img src={preview} alt="Bike Preview" className="w-full h-full object-cover rounded-md" />
                    ) : (
                      <div className="text-center">
                        <p className="text-gray-500">📷 Click to upload bike photo</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleBikeImageChange}
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

export default BikeDetails;