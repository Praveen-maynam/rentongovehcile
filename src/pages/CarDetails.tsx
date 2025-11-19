import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import BlackCar from "../assets/images/BlackCar.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import Petrol from "../assets/icons/Petrol.png";
import Location from "../assets/icons/Location.png";
import seats from "../assets/icons/seats.jpeg";
import AClogo from "../assets/icons/ac.png";

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
  CarNumber: "",
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
  }, [carId, carData, openEditForm]);

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
      CarNumber: car.CarNumber || car.carNumber || "",
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
      city: car.pickupCity || "",
      street: car.pickupArea || "",
      pincode: car.pickupCityPinCode || "",
      state: car.pickupCityState || "",
      doorName: car.doorName || "",
      requireDrivingLicense: car.drivingLicenseRequired === true,
      requireAadharCard: car.AadharCardRequired === true,
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

    // Validate contact number
    if (!editVehicle.contactNumber || editVehicle.contactNumber.trim().length < 10) {
      alert("❌ Valid contact number is required (minimum 10 digits)");
      return;
    }

    // Validate contact name
    if (!editVehicle.contactName || editVehicle.contactName.trim().length < 2) {
      alert("❌ Contact name is required");
      return;
    }

    setIsLoading(true);

    try {
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

      const nameParts = trimmedName.split(" ");
      const CarName = nameParts[0] || trimmedName;
      const CarModel = nameParts.slice(1).join(" ") || editVehicle.CarModel || "";
       
      console.log("📝 Preparing form data...");
      console.log("  CarName:", CarName);
      console.log("  CarModel:", CarModel);
      
      const formdata = new FormData();

      // ============================================
      // REQUIRED FIELDS - EXACT BACKEND FIELD NAMES
      // ============================================
      
      // User & Car Identity
     // User & Car Identity
      formdata.append("userId", userId);
      formdata.append("CarName", CarName);
      formdata.append("CarModel", CarModel || "Standard");
      
      // Car Number is optional - only append if provided
      if (editVehicle.CarNumber && editVehicle.CarNumber.trim()) {
        formdata.append("CarNumber", editVehicle.CarNumber.trim());
      }
      
      // Car Specifications
      const seatsValue = (editVehicle.seats ?? "5").toString().replace(/[^\d]/g, "") || "5";
      formdata.append("Carseater", seatsValue);
      
      const fuelType = editVehicle.fuel.toLowerCase();
      const transmissionType = editVehicle.transmission.toLowerCase();
      
      formdata.append("fuelType", fuelType);
      formdata.append("transmissionType", transmissionType);
      formdata.append("Ac_available", editVehicle.ac?.toLowerCase() === "ac" ? "true" : "false");
      
      // Pricing
      const rentPerHour = trimmedPrice;
      const rentPerDay = (Number(rentPerHour) * 24).toString();
      
      formdata.append("RentPerHour", rentPerHour);
      formdata.append("RentPerDay", rentPerDay);
      
      console.log("  RentPerHour:", rentPerHour);
      console.log("  RentPerDay:", rentPerDay);
      
      // Contact & Description
      formdata.append("description", editVehicle.description || "No description provided");
      formdata.append("contactName", editVehicle.contactName.trim());
      formdata.append("contactNumber", editVehicle.contactNumber.trim());
      
      // Additional Car Details
      formdata.append("gps", "false");
      formdata.append("kmDriven", "50000");
      formdata.append("Available", editVehicle.isAvailable ? "true" : "false");

      // ============================================
      // LOCATION FIELDS - EXACT BACKEND FIELD NAMES
      // ============================================
      const hasLocation = editVehicle.city || editVehicle.street || editVehicle.pincode || editVehicle.state;
      
      if (hasLocation) {
        formdata.append("pickupCity", editVehicle.city || "");
        formdata.append("pickupArea", editVehicle.street || "");
        formdata.append("pickupCityPinCode", editVehicle.pincode || "");
        formdata.append("pickupCityState", editVehicle.state || "");
        formdata.append("pickupCityCountry", "india");
        formdata.append("pickupLatitude", "17.4889");
        formdata.append("pickupLongitude", "78.4603");
        
        console.log("📍 Location data:");
        console.log("  City:", editVehicle.city);
        console.log("  Area:", editVehicle.street);
        console.log("  Pincode:", editVehicle.pincode);
        console.log("  State:", editVehicle.state);
      }

      // ============================================
      // DOCUMENT REQUIREMENTS - EXACT BACKEND FIELD NAMES
      // ============================================
      formdata.append("drivingLicenseRequired", editVehicle.requireDrivingLicense ? "true" : "false");
      formdata.append("AadharCardRequired", editVehicle.requireAadharCard ? "true" : "false");
      
      // ============================================
      // DEPOSIT - EXACT BACKEND FIELD NAMES
      // ============================================
      if (editVehicle.depositMoney && editVehicle.depositMoney !== "0" && Number(editVehicle.depositMoney) > 0) {
        formdata.append("DepositAmount", editVehicle.depositMoney);
        formdata.append("DepositVehicle", "true");
      } else {
        formdata.append("DepositVehicle", "false");
      }

      // ============================================
      // IMAGES - EXACT BACKEND FIELD NAME
      // ============================================
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
      console.log("📦 Complete FormData:");
      for (const [key, value] of formdata.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}:`, { name: value.name, size: value.size });
        } else {
          console.log(`  ${key}:`, value);
        }
      }
      
      const response = await apiService.car.updateCarById(vehicleId, formdata);
      const result = response.data || response;

      console.log("📥 API Response:", result);

      if (result?.message?.toLowerCase().includes("updated") || result?.success || result?.car) {
        alert("✅ Car updated successfully!");
        console.log("🎉 Updated car data:", result.car);
        
        if (result.car) {
          mapCarData(result.car);
        } else {
          await fetchCarDetails(vehicleId);
        }
        
        setCarImage(null);
        setAdditionalImages([]);
        
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
        `• Contact number is valid (10+ digits)\n` +
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading car details...</p>
        </div>
      </div>
    );
  }

  const dummyImages = [
    "https://e7.pngegg.com/pngimages/768/421/png-clipart-car-computer-icons-sedan-auto-detailing-auto-driving-rectangle-thumbnail.png",
    "https://e7.pngegg.com/pngimages/768/421/png-clipart-car-computer-icons-sedan-auto-detailing-auto-driving-rectangle-thumbnail.png",
    "https://e7.pngegg.com/pngimages/768/421/png-clipart-car-computer-icons-sedan-auto-detailing-auto-driving-rectangle-thumbnail.png"
  ];

  const realImages = additionalImages.length > 0 
    ? [preview || editVehicle.image || BlackCar, ...additionalImages.map(img => URL.createObjectURL(img))]
    : [preview || editVehicle.image || BlackCar];
  
  const carouselImages = [...realImages];
  while (carouselImages.length < 4) {
    carouselImages.push(dummyImages[carouselImages.length - 1] || dummyImages[0]);
  }
  carouselImages.splice(4);

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-6 sm:py-10">
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-700 font-medium">Processing...</p>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="relative w-300px md:w-[420px] h-[300px] flex-shrink-0 cursor-pointer rounded-[10px] overflow-hidden border-2 border-transparent hover:border-[#0066FF] transition-all duration-200">
              <img
                src={carouselImages[currentImageIndex]}
                alt={editVehicle.name}
                className="w-full h-full object-cover transition-all duration-500"
              />

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentImageIndex 
                        ? "bg-[#0066FF] w-6" 
                        : "bg-white/60 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-1">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h1 
                      className="text-[32px] font-bold text-[#000000] leading-tight cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                    >
                      {editVehicle.name}
                    </h1>
                    {editVehicle.isAvailable && (
                      <span className="px-3 py-1 bg-[#10B981] text-white text-[12px] font-semibold rounded-full" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Available
                      </span>
                    )}
                  </div>
                  {editVehicle.CarNumber && (
                    <p className="text-[16px] text-[#666666] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {editVehicle.CarNumber}
                    </p>
                  )}
                </div>
                <div className="bg-[#FFF9E6] px-2.5 py-1 rounded-md flex items-center gap-1 flex-shrink-0">
                  <span className="text-[#FFB800] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>★</span>
                  <span className="text-sm font-semibold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif' }}>{editVehicle.rating}</span>
                </div>
              </div>

              <div className="flex items-baseline gap-1 mb-3 w-fit cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all">
                <span className="text-[32px] font-bold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>₹{editVehicle.price}</span>
                <span className="text-base text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>/hr</span>
              </div>

              <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden bg-white mb-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200">
                <div className="flex items-center gap-0">
                  <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                    <img src={AutomaticLogo} className="w-6 h-6 mb-1.5" alt="transmission" />
                    <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {editVehicle.transmission}
                    </span>
                  </div>
                  
                  <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                    <img src={seats} className="w-6 h-6 mb-1.5" alt="seats" />
                    <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {editVehicle.seats} Seaters
                    </span>
                  </div>
                  
                  <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                    <img src={Petrol} className="w-6 h-6 mb-1.5" alt="fuel" />
                    <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {editVehicle.fuel}
                    </span>
                  </div>
                  
                  <div className="w-[1px] h-12 bg-[#E5E5E5]"></div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
                    <img src={AClogo} className="w-6 h-6 mb-1.5" alt="ac" />
                    <span className="text-[13px] text-[#333333] font-medium whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {editVehicle.ac}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-[#E5E5E5] rounded-[10px] p-4 bg-white mb-4 cursor-pointer hover:border-[#0066FF] hover:border-2 transition-all duration-200 w-full">
                <h2 className="text-[18px] font-bold text-[#000000] mb-2 cursor-pointer hover:underline hover:decoration-[#0066FF] hover:decoration-2 transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  Description
                </h2>
                <p className="text-[#666666] text-[14px] leading-[1.6] min-h-[40px] break-words overflow-wrap-anywhere" style={{ fontFamily: 'Inter, sans-serif', wordBreak: 'break-word' }}>
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
        
        {/* EDIT FORM - FIGMA DESIGN */}
        <aside className="md:w-[380px]">
          <div className="sticky top-6 bg-white p-6 rounded-[12px] shadow-lg border border-[#E5E5E5]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px] font-semibold text-[#000000]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Edit Car Details
              </h2>
            </div>

            {editOpen && (
              <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E5E5 transparent' }}>
                
                {/* Available Toggle */}
                <div className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-[8px] border border-[#E5E5E5]">
                  <label className="text-[14px] font-medium text-[#333333]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    Available
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={editVehicle.isAvailable}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E5E5E5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066FF]"></div>
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[14px] font-medium text-[#000000] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editVehicle.description}
                    onChange={handleChange}
                    placeholder="Car Description"
                    className="w-full border border-[#E5E5E5] rounded-[8px] p-3 h-20 resize-none text-[14px] text-[#333333] placeholder-[#999999] focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                {/* AC Available Toggle */}
                <div className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-[8px] border border-[#E5E5E5]">
                  <label className="text-[14px] font-medium text-[#333333]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    AC Available
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="ac"
                      checked={editVehicle.ac?.toLowerCase() === "ac"}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setEditVehicle((prev) => ({ ...prev, ac: checked ? "AC" : "Non-AC" }));
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E5E5E5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066FF]"></div>
                  </label>
                </div>

                {/* Price Section */}
                <div>
                  <label className="block text-[14px] font-medium text-[#000000] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    Price
                  </label>
                  <div className="space-y-2">
                    <label className="block text-[13px] text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Rent Price (per hour / per DAY)
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>₹</span>
                        <input
                          type="number"
                          name="price"
                          value={editVehicle.price}
                          onChange={handleChange}
                          placeholder="250"
                          className="w-full border border-[#E5E5E5] rounded-[8px] pl-7 pr-3 py-2.5 text-[14px] text-[#333333] placeholder-[#999999] focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          min="1"
                          required
                        />
                      </div>
                      <select className="border border-[#E5E5E5] rounded-[8px] px-3 py-2.5 text-[14px] text-[#333333] focus:ring-2 focus:ring-[#0066FF] focus:border-transparent" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <option>Hour</option>
                        <option>Day</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-[13px] text-[#666666] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Transmission
                  </label>
                  <select
                    name="transmission"
                    value={editVehicle.transmission}
                    onChange={handleChange}
                    className="w-full border border-[#E5E5E5] rounded-[8px] p-2.5 text-[14px] text-[#333333] focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-[13px] text-[#666666] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Fuel Type
                  </label>
                  <select
                    name="fuel"
                    value={editVehicle.fuel}
                    onChange={handleChange}
                    className="w-full border border-[#E5E5E5] rounded-[8px] p-2.5 text-[14px] text-[#333333] focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                {/* Seats */}
                <div>
                  <label className="block text-[13px] text-[#666666] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Seating Capacity
                  </label>
                  <input
                    type="number"
                    name="seats"
                    value={editVehicle.seats.toString().replace(/[^\d]/g, '')}
                    onChange={handleChange}
                    placeholder="5"
                    className="w-full border border-[#E5E5E5] rounded-[8px] p-2.5 text-[14px] text-[#333333] placeholder-[#999999] focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    min="1"
                    max="20"
                  />
                </div>

                {/* Your Contact Information */}
                <div>
                  <h3 className="text-[14px] font-semibold text-[#000000] mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    Your Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[13px] text-[#666666] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Name
                      </label>
                      <input
                        name="contactName"
                        value={editVehicle.contactName}
                        onChange={handleChange}
                        placeholder="Manoj Kumar"
                        className="w-full border border-[#E5E5E5] rounded-[8px] p-2.5 text-[14px] text-[#333333] placeholder-[#999999] focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#666666] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Contact Number
                      </label>
                      <input
                        name="contactNumber"
                        value={editVehicle.contactNumber}
                        onChange={handleChange}
                        placeholder="1234567898"
                        className="w-full border border-[#E5E5E5] rounded-[8px] p-2.5 text-[14px] text-[#333333] placeholder-[#999999] focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Customer Required Documents */}
                <div>
                  <h3 className="text-[14px] font-semibold text-[#000000] mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    Customer Required Documents
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-[8px] border border-[#E5E5E5]">
                      <label className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Driving License
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="requireDrivingLicense"
                          checked={editVehicle.requireDrivingLicense}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#E5E5E5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066FF]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-[8px] border border-[#E5E5E5]">
                      <label className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Aadhar Card
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="requireAadharCard"
                          checked={editVehicle.requireAadharCard}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#E5E5E5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066FF]"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Deposit Vehicle */}
                <div>
                  <h3 className="text-[14px] font-semibold text-[#000000] mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    Deposit Vehicle
                  </h3>
                  <div className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-[8px] border border-[#E5E5E5]">
                    <label className="text-[13px] text-[#333333]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Or
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={false}
                        readOnly
                      />
                      <div className="w-11 h-6 bg-[#E5E5E5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066FF]"></div>
                    </label>
                  </div>
                  <div className="mt-3">
                    <label className="block text-[13px] text-[#666666] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Deposit Money
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" style={{ fontFamily: 'Inter, sans-serif' }}>₹</span>
                      <input
                        type="number"
                        name="depositMoney"
                        value={editVehicle.depositMoney}
                        onChange={handleChange}
                        placeholder="16300"
                        className="w-full border border-[#E5E5E5] rounded-[8px] pl-7 pr-3 py-2.5 text-[14px] text-[#333333] placeholder-[#999999] focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Pickup Address */}
                <div>
                  <h3 className="text-[14px] font-semibold text-[#000000] mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    Vehicle Pickup Address
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[13px] text-[#666666] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Place
                      </label>
                      <input
                        name="doorName"
                        value={editVehicle.doorName}
                        onChange={handleChange}
                        placeholder="Door Name"
                        className="w-full border border-[#E5E5E5] rounded-[8px] p-2.5 text-[14px] text-[#333333] placeholder-[#999999] focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#666666] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        City
                      </label>
                      <input
                        name="city"
                        value={editVehicle.city}
                        onChange={handleChange}
                        placeholder="Hyderabad"
                        className="w-full border border-[#E5E5E5] rounded-[8px] p-2.5 text-[14px] text-[#333333] placeholder-[#999999] focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#666666] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        State
                      </label>
                      <input
                        name="state"
                        value={editVehicle.state}
                        onChange={handleChange}
                        placeholder="Telangana"
                        className="w-full border border-[#E5E5E5] rounded-[8px] p-2.5 text-[14px] text-[#333333] placeholder-[#999999] focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#666666] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Pincode
                      </label>
                      <input
                        name="pincode"
                        value={editVehicle.pincode}
                        onChange={handleChange}
                        placeholder="500064"
                        className="w-full border border-[#E5E5E5] rounded-[8px] p-2.5 text-[14px] text-[#333333] placeholder-[#999999] focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#666666] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Street
                      </label>
                      <input
                        name="street"
                        value={editVehicle.street}
                        onChange={handleChange}
                        placeholder="Gachibowli"
                        className="w-full border border-[#E5E5E5] rounded-[8px] p-2.5 text-[14px] text-[#333333] placeholder-[#999999] focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Add Photos */}
                <div>
                  <button
                    onClick={() => document.getElementById('main-image-upload')?.click()}
                    className="w-full border-2 border-dashed border-[#E5E5E5] rounded-[8px] p-6 flex flex-col items-center justify-center hover:border-[#0066FF] transition-all bg-[#F8F9FA]"
                    type="button"
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm">
                      <span className="text-2xl">📷</span>
                    </div>
                    <p className="text-[14px] font-medium text-[#333333] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Add photos
                    </p>
                    <p className="text-[12px] text-[#999999] text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Please, first Choose your car image will add supporting pictures to verify your details
                    </p>
                  </button>
                  <input
                    id="main-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCarImageChange}
                  />
                  
                  {preview && (
                    <div className="mt-3 relative">
                      <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-[8px]" />
                    </div>
                  )}

                  {additionalImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {additionalImages.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={URL.createObjectURL(img)}
                            alt={`Additional ${idx + 1}`}
                            className="w-full h-20 object-cover rounded-[8px]"
                          />
                          <button
                            onClick={() => removeAdditionalImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition"
                            type="button"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {additionalImages.length < 4 && (
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="w-full text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        onChange={handleAdditionalImagesChange}
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex-1 bg-[#0066FF] text-white py-3 rounded-[8px] hover:bg-[#0052CC] transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-[14px]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    type="button"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="px-6 bg-[#DC2626] text-white py-3 rounded-[8px] hover:bg-[#B91C1C] transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-[14px]"
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

export default CarDetails;