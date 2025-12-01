// hooks/useBikeDetails.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import mapBikeData from "utils/mapBikeData";
import buildFormData from "utils/formDataBuilder";
import Enfield from "../assets/images/Enfield.png";

export type VehicleDetails = {
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
};

type HookArgs = {
  bikeId?: string;
  bikeData?: any;
  openEditForm?: boolean;
};

export default function useBikeDetails({ bikeId, bikeData, openEditForm }: HookArgs) {
  const navigate = useNavigate();

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

  const [editOpen, setEditOpen] = useState<boolean>(!!openEditForm);
  const [editVehicle, setEditVehicle] = useState<VehicleDetails>({ ...defaultVehicle });
  const [originalVehicle, setOriginalVehicle] = useState<VehicleDetails>({ ...defaultVehicle });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [bikeImage, setBikeImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [manualUserId, setManualUserId] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (bikeId && !bikeData) {
      fetchBikeDetails(bikeId);
    } else if (bikeData) {
      const mapped = mapBikeData(bikeData);
      setEditVehicle(mapped);
      setOriginalVehicle(mapped);
      setPreview(mapped.image || null);
    }

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId && !manualUserId) {
      setManualUserId(storedUserId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bikeId, bikeData]);

  const fetchBikeDetails = async (id: string) => {
    try {
      setIsFetching(true);
      const response = await apiService.bike.getBikeById(id);
      const data = response.data || response;
      const bike = data.bike || data;
      const mapped = mapBikeData(bike);
      setEditVehicle(mapped);
      setOriginalVehicle(mapped);
      setPreview(mapped.image || null);
    } catch (err) {
      console.error("fetchBikeDetails error", err);
      alert("Failed to load bike details");
    } finally {
      setIsFetching(false);
    }
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
    const file = event.target.files?.[0] ?? null;
    if (file) {
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
      setAdditionalImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const carouselImages = additionalImages.length > 0 ? [preview || editVehicle.image || Enfield, ...additionalImages.map((img) => URL.createObjectURL(img))] : [preview || editVehicle.image || Enfield];
  while (carouselImages.length < 3) carouselImages.push(carouselImages[carouselImages.length - 1]);

  const prepareUserId = (): string | null => {
    let userId = manualUserId || localStorage.getItem("userId") || editVehicle.userId || null;
    if (!userId) {
      const possibleKeys = ["user", "userData", "currentUser", "authUser", "userInfo"];
      for (const key of possibleKeys) {
        const stored = localStorage.getItem(key);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            userId = parsed._id || parsed.id || parsed.userId || parsed.user_id || parsed.uid || userId;
          } catch (e) {
            if (stored && stored.length >= 10 && /^[a-f0-9]+$/i.test(stored)) {
              userId = stored;
            }
          }
          if (userId) break;
        }
      }
    }
    return userId;
  };

  const handleSave = async () => {
    const vehicleId = editVehicle.id || bikeId;
    if (!vehicleId) {
      alert("Bike ID missing — cannot update.");
      return;
    }

    const trimmedName = (editVehicle.name || "").trim();
    const trimmedPrice = ((editVehicle.price ?? "") as any).toString().trim();

    if (!trimmedName) {
      alert("Bike name is required");
      return;
    }
    if (!trimmedPrice || trimmedPrice === "0" || Number(trimmedPrice) <= 0) {
      alert("Valid price is required (must be greater than 0)");
      return;
    }

    setIsLoading(true);
    try {
      const userId = prepareUserId();
      if (!userId) {
        alert("User ID is missing. Please enter it manually in the form.");
        setIsLoading(false);
        return;
      }

      const nameParts = trimmedName.split(" ");
      const bikeName = nameParts[0] || trimmedName;
      const bikeModel = nameParts.slice(1).join(" ") || editVehicle.BikeModel || "";

      const formdata = buildFormData({
        userId,
        bikeName,
        bikeModel,
        bikeNumber: editVehicle.BikeNumber || "",
        pricePerKm: trimmedPrice,
        description: editVehicle.description || "",
        contactName: editVehicle.contactName,
        contactNumber: editVehicle.contactNumber,
        address: {
          pickupCity: editVehicle.city,
          pickupArea: editVehicle.street,
          pickupCityPinCode: editVehicle.pincode,
          pickupCityState: editVehicle.state,
          pickupCityCountry: editVehicle.country,
        },
        requireDrivingLicense: !!editVehicle.requireDrivingLicense,
        requireAadharCard: !!editVehicle.requireAadharCard,
        depositMoney: editVehicle.depositMoney,
        latitude: "17.443649",
        longitude: "78.445824",
        insuranceNo: "0987654321",
        mainImage: bikeImage,
        additionalImages,
      });

      const response = await apiService.bike.updateBikeById(vehicleId, formdata);
      const result = response.data || response;

      if (result?.message?.toLowerCase().includes("updated") || result?.success || result?.bike) {
        alert("Bike updated successfully!");
        if (result.bike) {
          const mapped = mapBikeData(result.bike);
          setEditVehicle(mapped);
          setOriginalVehicle(mapped);
          setPreview(mapped.image || null);
        } else {
          await fetchBikeDetails(vehicleId);
        }
        setBikeImage(null);
        setAdditionalImages([]);
        navigate("/listed-bike", { state: { refresh: true } });
      } else {
        throw new Error(result?.message || "Update failed");
      }
    } catch (err: any) {
      console.error("Update Error:", err);
      const errorMsg = err?.response?.data?.message || err.message || "Unknown error occurred";
      alert(`Failed to update bike: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const vehicleId = editVehicle.id || bikeId;
    if (!vehicleId) {
      alert("Vehicle ID missing — cannot delete.");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete "${editVehicle.name}"? This cannot be undone.`)) return;

    setIsLoading(true);
    try {
      const response = await apiService.bike.deleteBikeById(vehicleId);
      const data = response.data || response;
      if (data?.message?.toLowerCase().includes("deleted") || data?.success) {
        alert("Bike deleted successfully!");
        navigate("/listed-bikes", { state: { refresh: true } });
      } else {
        throw new Error(data?.message || "Delete failed");
      }
    } catch (err: any) {
      console.error("Delete Bike Error:", err);
      const errorMsg = err?.response?.data?.message || err.message || "Unknown error";
      alert(`Failed to delete bike: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    editOpen,
    setEditOpen,
    editVehicle,
    originalVehicle,
    isLoading,
    isFetching,
    preview,
    additionalImages,
    bikeImage,
    currentImageIndex,
    setCurrentImageIndex,
    carouselImages,
    handleChange,
    handleBikeImageChange,
    handleAdditionalImagesChange,
    removeAdditionalImage,
    handleSave,
    handleDelete,
  };
}
