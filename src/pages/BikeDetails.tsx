// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Loader } from "lucide-react";

// interface BikeDetails {
//   bikeName: string;
//   pricePerKm: string;
//   rating: string;
//   transmission: string;
//   seats: string;
//   fuel: string;
//   ac: string;
//   bikeImages: string;
//   description: string;
//   contactName: string;
//   contactNumber: string;
//   email?: string;
//   bikeNumber?: string;
//   bikeModel?: string;
//   latitude?: string;
//   longitude?: string;
//   InsuranceNo?: string;
//   pickupArea?: string;
//   pickupCityState?: string;
//   pickupCityCountry?: string;
//   pickupCity?: string;
//   pickupCityPinCode?: string;
//   userId?: string;
//   _id?: string;
// }

// const defaultBike: BikeDetails = {
//   bikeName: "",
//   pricePerKm: "0",
//   rating: "4.2",
//   transmission: "Manual",
//   seats: "2",
//   fuel: "Petrol",
//   ac: "No AC",
//   bikeImages: "",
//   description: "",
//   contactName: "",
//   contactNumber: "",
//   bikeNumber: "",
//   bikeModel: "",
//   latitude: "",
//   longitude: "",
//   InsuranceNo: "",
//   pickupArea: "",
//   pickupCity: "",
//   pickupCityPinCode: "",
//   pickupCityState: "",
//   pickupCityCountry: "India",
//   userId: "",
// };

// const BikeDetails: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { bikeData } = (location && (location as any).state) || {};
//   const [bike, setBike] = useState<BikeDetails>(defaultBike);
//   const [price, setPrice] = useState("");
//   const [bikeImage, setBikeImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const API_BASE_URL = "http://52.66.238.227:3000";
//   const FIXED_USER_ID = "68f32259cea8a9fa88029262";
// const FIXED_BIKE_ID = "69089e63d9c06ae981f99d03"; 
//   // ✅ Prefill bike data
//   useEffect(() => {
//     if (bikeData) {
//       const mapped: BikeDetails = {
//         ...defaultBike,
//         _id: bikeData._id || bikeData.id,
//         bikeName: bikeData.bikeName || bikeData.name || "",
//         pricePerKm:
//           bikeData.pricePerKm?.toString() || bikeData.price?.toString() || "0",
//         rating: bikeData.rating?.toString() || "4.2",
//         description: bikeData.description || "",
//         contactName: bikeData.contactName || "",
//         contactNumber: bikeData.contactNumber || "",
//         bikeNumber: bikeData.bikeNumber || "",
//         bikeModel: bikeData.bikeModel || "",
//         InsuranceNo: bikeData.InsuranceNo || "",
//         latitude: bikeData.latitude?.toString() || "",
//         longitude: bikeData.longitude?.toString() || "",
//         pickupArea: bikeData.pickupArea || "",
//         pickupCity: bikeData.pickupCity || "",
//         pickupCityPinCode: bikeData.pickupCityPinCode || "",
//         pickupCityState: bikeData.pickupCityState || "",
//         pickupCityCountry: bikeData.pickupCityCountry || "India",
//         bikeImages:
//           bikeData.bikeImages?.[0] ||
//           bikeData.image ||
//           bikeData.photos?.[0] ||
//           "",
//         userId: bikeData.userId || FIXED_USER_ID,
//       };

//       setBike(mapped);
//       setPrice(mapped.pricePerKm);
//       setPreview(mapped.bikeImages || null);
//     }
//   }, [bikeData]);

//   // ✅ Input change handler
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setBike((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Image preview
//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setBikeImage(file);
//       const previewUrl = URL.createObjectURL(file);
//       setPreview(previewUrl);
//     }
//   };
// // ✅ Your Exact Update Bike API
// const handleSave = async () => {
//   if (!bike._id) {
//     alert("No Bike ID found. Cannot update.");
//     return;
//   }

//   setIsLoading(true);
//   try {
//     const formdata = new FormData();
//     formdata.append("userId", FIXED_USER_ID);
//     formdata.append("bikeNumber", bike.bikeNumber || "");
//     formdata.append("description", bike.description || "");
//     formdata.append("pricePerKm", price || "0");
//     formdata.append("contactNumber", bike.contactNumber || "");
//     formdata.append("contactName", bike.contactName || "");
//     formdata.append("latitude", bike.latitude || "0");
//     formdata.append("longitude", bike.longitude || "0");
//     formdata.append("InsuranceNo", bike.InsuranceNo || "");
//     formdata.append("bikeName", bike.bikeName || "");
//     formdata.append("bikeModel", bike.bikeModel || "");
//     formdata.append("pickupCityCountry", bike.pickupCityCountry || "");
//     formdata.append("pickupCityState", bike.pickupCityState || "");
//     formdata.append("pickupCityPinCode", bike.pickupCityPinCode || "");
//     formdata.append("pickupCity", bike.pickupCity || "");
//     formdata.append("pickupArea", bike.pickupArea || "");
//     formdata.append("Bike", "jbj"); // same dummy key as your sample

//     if (bikeImage) {
//       formdata.append("bikeImages", bikeImage);
//     }

//     const requestOptions = {
//       method: "PUT",
//       body: formdata,
//       redirect: "follow" as RequestRedirect,
//     };

//     // ✅ Your exact endpoint
//     const response = await fetch(
//       `${API_BASE_URL}/updateBike/${bike._id}`,
//       requestOptions
//     );

//     const result = await response.text();
//     console.log("Update response:", result);

//     if (response.ok) {
//       const updatedBike = {
//         ...bike,
//         pricePerKm: price,
//         bikeImages: preview || bike.bikeImages,
//       };

//       alert("✅ Bike updated successfully!");

//       navigate("/listed-bikes", {
//         state: {
//           refresh: true,
//           updatedBike,
//           timestamp: Date.now(),
//         },
//       });
//     } else {
//       alert(`❌ Update failed: ${result}`);
//     }
//   } catch (error) {
//     console.error("Error updating bike:", error);
//     alert("Error updating bike. Check console for details.");
//   } finally {
//     setIsLoading(false);
//   }
// };

//   // ✅ Delete Bike API
//   const handleDelete = async () => {
//     if (!bike._id) {
//       alert("No Bike ID found. Cannot delete.");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this bike?")) return;

//     setIsLoading(true);
//     try {
//       const formdata = new FormData();
//       const response = await fetch(
//         `${API_BASE_URL}/deleteBike/${bike._id}`,
//         {
//           method: "DELETE",
//           body: formdata,
//         }
//       );

//       const result = await response.text();
//       if (response.ok) {
//         alert("✅ Bike deleted successfully!");
//         navigate("/listed-bikes", { state: { refresh: true }, replace: true });
//       } else {
//         alert(`❌ Delete failed: ${result}`);
//       }
//     } catch (error) {
//       console.error("Error deleting bike:", error);
//       alert("Error deleting bike. Check console for details.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ✅ UI
//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6">
//       <div className="max-w-[1228px] mx-auto flex flex-col md:flex-row gap-10">
//         {/* Left side */}
//         <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
//           <div className="flex flex-col md:flex-row gap-6">
//             <div className="relative w-full md:w-[420px] h-[320px] rounded-xl overflow-hidden bg-gray-100">
//               {preview ? (
//                 <img
//                   src={preview}
//                   alt={bike.bikeName}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="flex items-center justify-center h-full text-gray-400">
//                   No image
//                 </div>
//               )}
//             </div>

//             <div className="flex-1">
//               <h1 className="text-3xl font-semibold">{bike.bikeName}</h1>
//               <p className="text-lg text-gray-700 mt-2">
//                 ₹{price || bike.pricePerKm}/km
//               </p>
//               <p className="text-sm text-gray-600 mt-4">{bike.description}</p>
//             </div>
//           </div>
//         </div>

//         {/* Right side */}
//         <aside className="md:w-[380px]">
//           <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
//             <h2 className="text-2xl font-semibold mb-4">Edit Bike Details</h2>

//             <input
//               name="bikeName"
//               value={bike.bikeName}
//               onChange={handleChange}
//               placeholder="Bike Name"
//               className="w-full border border-gray-300 p-2 rounded"
//             />
//             <input
//               name="bikeNumber"
//               value={bike.bikeNumber}
//               onChange={handleChange}
//               placeholder="Bike Number"
//               className="w-full border border-gray-300 p-2 rounded"
//             />
//             <input
//               name="bikeModel"
//               value={bike.bikeModel}
//               onChange={handleChange}
//               placeholder="Bike Model"
//               className="w-full border border-gray-300 p-2 rounded"
//             />
//             <textarea
//               name="description"
//               value={bike.description}
//               onChange={handleChange}
//               placeholder="Description"
//               className="w-full border border-gray-300 p-2 rounded"
//             />
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               placeholder="Price per KM"
//               className="w-full border border-gray-300 p-2 rounded"
//             />
//             <input
//               name="contactName"
//               value={bike.contactName}
//               onChange={handleChange}
//               placeholder="Owner Name"
//               className="w-full border border-gray-300 p-2 rounded"
//             />
//             <input
//               name="contactNumber"
//               value={bike.contactNumber}
//               onChange={handleChange}
//               placeholder="Contact Number"
//               className="w-full border border-gray-300 p-2 rounded"
//             />

//             <div>
//               <label className="text-gray-600 text-sm">Upload Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full border border-gray-300 p-2 rounded"
//               />
//             </div>

//             <div className="flex gap-3 pt-3">
//               <button
//                 onClick={handleSave}
//                 disabled={isLoading}
//                 className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
//               >
//                 {isLoading ? "Saving..." : "Save Changes"}
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={isLoading}
//                 className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50"
//               >
//                 {isLoading ? "Deleting..." : "Delete"}
//               </button>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default BikeDetails;


import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

interface BikeDetails {
  bikeName: string;
  pricePerKm: string;
  rating: string;
  transmission: string;
  seats: string;
  fuel: string;
  ac: string;
  bikeImages: string;
  description: string;
  contactName: string;
  contactNumber: string;
  email?: string;
  bikeNumber?: string;
  bikeModel?: string;
  latitude?: string;
  longitude?: string;
  InsuranceNo?: string;
  pickupArea?: string;
  pickupCityState?: string;
  pickupCityCountry?: string;
  pickupCity?: string;
  pickupCityPinCode?: string;
  userId?: string;
  _id?: string;
  isNotAvailable?: boolean;
}

const defaultBike: BikeDetails = {
  bikeName: "",
  pricePerKm: "0",
  rating: "4.2",
  transmission: "Manual",
  seats: "2",
  fuel: "Petrol",
  ac: "No AC",
  bikeImages: "",
  description: "",
  contactName: "",
  contactNumber: "",
  bikeNumber: "",
  bikeModel: "",
  latitude: "",
  longitude: "",
  InsuranceNo: "",
  pickupArea: "",
  pickupCity: "",
  pickupCityPinCode: "",
  pickupCityState: "",
  pickupCityCountry: "India",
  userId: "",
  isNotAvailable: false,
};

const BikeDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { bikeData } = (location && (location as any).state) || {};
  const [bike, setBike] = useState<BikeDetails>(defaultBike);
  const [price, setPrice] = useState("");
  const [bikeImage, setBikeImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);

  const API_BASE_URL = "http://52.66.238.227:3000";
  const FIXED_USER_ID = "68f32259cea8a9fa88029262";

  // ✅ Prefill bike data
  useEffect(() => {
    if (bikeData) {
      const mapped: BikeDetails = {
        ...defaultBike,
        _id: bikeData._id || bikeData.id,
        bikeName: bikeData.bikeName || bikeData.name || "",
        pricePerKm:
          bikeData.pricePerKm?.toString() || bikeData.price?.toString() || "0",
        rating: bikeData.rating?.toString() || "4.2",
        description: bikeData.description || "",
        contactName: bikeData.contactName || "",
        contactNumber: bikeData.contactNumber || "",
        bikeNumber: bikeData.bikeNumber || "",
        bikeModel: bikeData.bikeModel || "",
        InsuranceNo: bikeData.InsuranceNo || "",
        latitude: bikeData.latitude?.toString() || "",
        longitude: bikeData.longitude?.toString() || "",
        pickupArea: bikeData.pickupArea || "",
        pickupCity: bikeData.pickupCity || "",
        pickupCityPinCode: bikeData.pickupCityPinCode || "",
        pickupCityState: bikeData.pickupCityState || "",
        pickupCityCountry: bikeData.pickupCityCountry || "India",
        bikeImages:
          bikeData.bikeImages?.[0] ||
          bikeData.image ||
          bikeData.photos?.[0] ||
          "",
        userId: bikeData.userId || FIXED_USER_ID,
        isNotAvailable: bikeData.isNotAvailable || false,
      };

      setBike(mapped);
      setPrice(mapped.pricePerKm);
      setPreview(mapped.bikeImages || null);
      setIsAvailable(!mapped.isNotAvailable);
    }
  }, [bikeData]);

  // ✅ Input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBike((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Image preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBikeImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  // ✅ Save / Update Bike API
  const handleSave = async () => {
    if (!bike._id) {
      alert("No Bike ID found. Cannot update.");
      return;
    }

    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("userId", FIXED_USER_ID);
      formdata.append("bikeNumber", bike.bikeNumber || "");
      formdata.append("description", bike.description || "");
      formdata.append("pricePerKm", price || "0");
      formdata.append("contactNumber", bike.contactNumber || "");
      formdata.append("contactName", bike.contactName || "");
      formdata.append("latitude", bike.latitude || "0");
      formdata.append("longitude", bike.longitude || "0");
      formdata.append("InsuranceNo", bike.InsuranceNo || "");
      formdata.append("bikeName", bike.bikeName || "");
      formdata.append("bikeModel", bike.bikeModel || "");
      formdata.append("pickupCityCountry", bike.pickupCityCountry || "");
      formdata.append("pickupCityState", bike.pickupCityState || "");
      formdata.append("pickupCityPinCode", bike.pickupCityPinCode || "");
      formdata.append("pickupCity", bike.pickupCity || "");
      formdata.append("pickupArea", bike.pickupArea || "");
      formdata.append("Bike", "jbj");

      if (bikeImage) {
        formdata.append("bikeImages", bikeImage);
      }

      const response = await fetch(`${API_BASE_URL}/updateBike/${bike._id}`, {
        method: "PUT",
        body: formdata,
        redirect: "follow" as RequestRedirect,
      });

      const result = await response.text();
      console.log("Update response:", result);

      if (response.ok) {
        alert("✅ Bike updated successfully!");
        navigate("/listed-bikes", {
          state: {
            refresh: true,
            updatedBike: { ...bike, pricePerKm: price },
            timestamp: Date.now(),
          },
        });
      } else {
        alert(`❌ Update failed: ${result}`);
      }
    } catch (error) {
      console.error("Error updating bike:", error);
      alert("Error updating bike. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Delete Bike API
  const handleDelete = async () => {
    if (!bike._id) {
      alert("No Bike ID found. Cannot delete.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this bike?")) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/deleteBike/${bike._id}`, {
        method: "DELETE",
      });

      const result = await response.text();
      if (response.ok) {
        alert("✅ Bike deleted successfully!");
        navigate("/listed-bikes", { state: { refresh: true }, replace: true });
      } else {
        alert(`❌ Delete failed: ${result}`);
      }
    } catch (error) {
      console.error("Error deleting bike:", error);
      alert("Error deleting bike. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Availability toggle
  const handleAvailabilityToggle = async () => {
    if (!bike._id) {
      alert("No Bike ID found.");
      return;
    }

    setAvailabilityLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("vechileType", "Bike");
      urlencoded.append("VechileId", bike._id);
      urlencoded.append("fromDate", new Date().toISOString().split("T")[0]);
      urlencoded.append("toDate", new Date().toISOString().split("T")[0]);
      urlencoded.append("fromTime", "00:00");
      urlencoded.append("toTime", "23:59");
      urlencoded.append("isNotAvailable", (!isAvailable).toString());

      const endpoint = isAvailable
        ? `${API_BASE_URL}/createNotAvailability`
        : `${API_BASE_URL}/updateNotAvailability/${bike._id}`;

      const response = await fetch(endpoint, {
        method: isAvailable ? "POST" : "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      });

      if (!response.ok) throw new Error("Failed to update availability");

      const result = await response.json();
      console.log("Availability update:", result);

      setIsAvailable(!isAvailable);
      alert(
        !isAvailable
          ? "✅ Bike marked as Available"
          : "🚫 Bike marked as Not Available"
      );
    } catch (error) {
      console.error("Availability toggle error:", error);
      alert("Failed to change availability status.");
    } finally {
      setAvailabilityLoading(false);
    }
  };

  // ✅ UI
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-[1228px] mx-auto flex flex-col md:flex-row gap-10">
        {/* Left side */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-[420px] h-[320px] rounded-xl overflow-hidden bg-gray-100">
              {preview ? (
                <img
                  src={preview}
                  alt={bike.bikeName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No image
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-semibold">{bike.bikeName}</h1>
              <p className="text-lg text-gray-700 mt-2">
                ₹{price || bike.pricePerKm}/km
              </p>
              <p className="text-sm text-gray-600 mt-4">{bike.description}</p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <aside className="md:w-[380px]">
          <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
          <div className="flex items-center justify-between mb-4">
  <h2 className="text-2xl font-semibold">Edit Bike Details</h2>
  <button
    onClick={handleAvailabilityToggle}
    disabled={availabilityLoading}
    className={`px-4 py-2 rounded-full text-white font-medium transition ${
      isAvailable
        ? "bg-green-600 hover:bg-green-700"
        : "bg-red-500 hover:bg-red-600"
    }`}
  >
    {availabilityLoading
      ? "Updating..."
      : isAvailable
      ? "Available"
      : "Not Available"}
  </button>
</div>


            <input
              name="bikeName"
              value={bike.bikeName}
              onChange={handleChange}
              placeholder="Bike Name"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              name="bikeNumber"
              value={bike.bikeNumber}
              onChange={handleChange}
              placeholder="Bike Number"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              name="bikeModel"
              value={bike.bikeModel}
              onChange={handleChange}
              placeholder="Bike Model"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <textarea
              name="description"
              value={bike.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price per KM"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              name="contactName"
              value={bike.contactName}
              onChange={handleChange}
              placeholder="Owner Name"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              name="contactNumber"
              value={bike.contactNumber}
              onChange={handleChange}
              placeholder="Contact Number"
              className="w-full border border-gray-300 p-2 rounded"
            />

            <div>
              <label className="text-gray-600 text-sm">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

         

            <div className="flex gap-3 pt-3">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BikeDetails;
