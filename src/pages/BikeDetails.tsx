import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import Enfield from "../assets/images/Enfield.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import Petrol from "../assets/icons/Petrol.png";
import Location from "../assets/icons/Location.png";
import BikeCC from "../assets/icons/BikeCC.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";

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
  engineCapacity?: string;
  transmission?: string;
  fuel?: string;
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
  engineCapacity: "350",
  transmission: "Manual",
  fuel: "Petrol",
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
      engineCapacity: bike.engineCapacity || "350",
      transmission: bike.transmission || "Manual",
      fuel: bike.fuel || "Petrol",
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
        navigate("/listed-bike", { state: { refresh: true } });
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
        navigate("/listed-bikes", { state: { refresh: true } });
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

  const dummyImages = [
    "https://w7.pngwing.com/pngs/579/51/png-transparent-computer-icons-motorcycle-bicycle-motorcycle-logo-black-silhouette.png",
    "https://w1.pngwing.com/pngs/381/835/png-transparent-yamaha-logo-car-decal-motorcycle-sticker-sport-bike-yamaha-yzfr1-bicycle-thumbnail.png",
    "https://imgd.aeplcdn.com/664x374/n/cw/ec/141113/interceptor-650-right-front-three-quarter-3.jpeg?isig=0&q=80"
  ];

  const realImages = additionalImages.length > 0 
    ? [preview || editVehicle.image || Enfield, ...additionalImages.map(img => URL.createObjectURL(img))]
    : [preview || editVehicle.image || Enfield];
  
  const carouselImages = [...realImages];
  while (carouselImages.length < 3) {
    carouselImages.push(dummyImages[carouselImages.length - 1] || dummyImages[0]);
  }
  carouselImages.splice(3);

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

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left: Vehicle info */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="relative w-300px md:w-[420px] h-[300px] flex-shrink-0 rounded-[10px] border-2 border-transparent hover:border-[#0066FF] transition-all duration-200">
              <img
                src={carouselImages[currentImageIndex]}
                alt={editVehicle.name}
                className="w-full h-full object-cover transition-all duration-500 rounded-[10px]"
              />

              {/* Left Arrow - Always Visible */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-2xl z-20 transition-all cursor-pointer border border-gray-200"
                type="button"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6 text-gray-800 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right Arrow - Always Visible */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-2xl z-20 transition-all cursor-pointer border border-gray-200"
                type="button"
                aria-label="Next image"
              >
                <svg className="w-6 h-6 text-gray-800 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentImageIndex 
                        ? "bg-[#0066FF] w-6" 
                        : "bg-gray-700 w-2" 
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-1">
                <h1 
                  className="text-[32px] font-bold text-[#000000] leading-tight cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                >
                  {editVehicle.name}
                </h1>
               
                {/* <div className="bg-yellow-100 px-3 py-1 rounded-md">
                  <span className="text-sm font-semibold text-yellow-800">★ {editVehicle.rating}</span>
                </div> */}
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

              <div className="flex items-baseline mt-2 cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2">
                <span className="text-3xl font-bold">₹{editVehicle.price}</span>
                <span className="text-gray-500 ml-2 text-sm">/km</span>
              </div>
              
              {/* Features Section */}
              <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden bg-white mb-4 mt-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200">
                <div className="flex items-center gap-0">
                  {/* Engine Capacity */}
                  <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                    <img src={BikeCC} className="w-6 h-6 mb-1.5" alt="engine" />
                    <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {editVehicle.engineCapacity} CC
                    </span>
                  </div>
                  <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                  
                  {/* Transmission */}
                  <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                    <img src={AutomaticLogo} className="w-6 h-6 mb-1.5" alt="transmission" />
                    <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {editVehicle.transmission}
                    </span>
                  </div>
                  
                  <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                  
                  {/* Fuel */}
                  <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                    <img src={Petrol} className="w-6 h-6 mb-1.5" alt="fuel" />
                    <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {editVehicle.fuel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-[#E5E5E5] rounded-[10px] p-4 bg-white mb-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200">
                <h2 className="text-[18px] font-bold text-[#000000] mb-2 cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  Description
                </h2>
                <p className="text-[#666666] text-[14px] leading-[1.6] min-h-[40px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {editVehicle.description}
                </p>
              </div>
            </div>
          </div>
            
          {editVehicle.street && editVehicle.city && (
            <div className="flex items-start gap-2">
              <img src={Location} className="w-5 h-5 mt-0.5" alt="location" />
              <span className="text-[14px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {editVehicle.street}, {editVehicle.city}
                {editVehicle.pincode && `, ${editVehicle.pincode}`}
              </span>
            </div>
          )}
        </div>

        {/* Right: Edit Form */}
        <aside className="md:w-[380px]">
          <div className="sticky top-6 bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between w-full mb-4">
  <h2 className="text-2xl font-semibold">Edit Bike Details</h2>

  <button
  onClick={() => setEditOpen((s) => !s)}
  type="button"
  aria-label={editOpen ? "Hide form" : "Show form"}
  className="w-auto px-3 h-8 flex items-center justify-center rounded-full text-white text-sm font-medium transition-colors 
             bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] shadow-md hover:opacity-90"
>
  {editOpen ? "Hide" : "Show"}
</button>

</div>

            {editOpen && (
              <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                 {/* Available Toggle */}
{/* <div className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-[8px] border border-[#E5E5E5]"> */}
  {/* <label className="text-[14px] font-medium text-[#333333]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
    Available
  </label> */}

  {/* <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      name="isAvailable"
      checked={editVehicle.isAvailable}
      onChange={handleChange}
      className="sr-only peer"
    />

    <div
      className="
        w-11 h-6 bg-[#E5E5E5] peer-focus:outline-none rounded-full
        peer
        peer-checked:after:translate-x-full
        peer-checked:after:border-white
        after:content-['']
        after:absolute after:top-[2px] after:left-[2px]
        after:bg-white after:border-gray-300 after:border
        after:rounded-full after:h-5 after:w-5 after:transition-all
        
       
      "
    ></div>
  </label> */}
{/* </div> */}

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Bike Name </label>
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

                {/* <div>
                  <label className="block text-gray-700 font-medium mb-2">Bike Number</label>
                  <input
                    name="BikeNumber"
                    value={editVehicle.BikeNumber}
                    onChange={handleChange}
                    placeholder="e.g., AP16EH9394"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div> */}

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
                  <label className="block text-gray-700 font-medium mb-2">Price per KM </label>
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
                      accept="image/"
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
                      accept="image/"
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

                         {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                 <button
  onClick={handleSave}
  disabled={isLoading}
  className="flex-1 bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] text-white py-3 rounded-[8px] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-[14px]"
  style={{ fontFamily: 'Inter, sans-serif' }}
  type="button"
>
  {isLoading ? "Saving..." : "Save Changes"}
</button>
<button
  onClick={handleDelete}
  disabled={isLoading}
  className="px-6 bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] text-white py-3 rounded-[8px] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-[14px]"
  type="button"
>
  Delete
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