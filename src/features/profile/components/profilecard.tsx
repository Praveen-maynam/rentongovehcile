

import React, { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import apiService from "../../../services/api.service";

interface ProfileCardProps {
  onClose: () => void;
}

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  image: string;
  googleId?: string;
  latitude?: string;
  longitude?: string;
  fcmToken?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onClose }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    phone: "",
    email: "",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    googleId: "",
    latitude: "",
    longitude: "",
    fcmToken: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadProfileFromStorage();
    getCurrentLocation();
  }, []);

  const loadProfileFromStorage = () => {
    try {
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile((prev) => ({ ...prev, ...parsedProfile }));
      } else {
        const name = localStorage.getItem("userName") || localStorage.getItem("contactName") || "";
        const phone = localStorage.getItem("contactNumber") || "";
        const email = localStorage.getItem("userEmail") || "";
        const userId = localStorage.getItem("userId") || localStorage.getItem("googleId") || "";
        setProfile((prev) => ({ ...prev, name, phone, email, googleId: userId }));
      }
    } catch (error) {
      console.error("❌ Error loading profile:", error);
    }
  };

  const getCurrentLocation = () => {
    const savedLat = localStorage.getItem("latitude");
    const savedLng = localStorage.getItem("longitude");

    if (savedLat && savedLng) {
      setProfile((prev) => ({ ...prev, latitude: savedLat, longitude: savedLng }));
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toString();
          const lng = position.coords.longitude.toString();
          setProfile((prev) => ({ ...prev, latitude: lat, longitude: lng }));
          localStorage.setItem("latitude", lat);
          localStorage.setItem("longitude", lng);
        },
        () => {
          const defaultLat = "17.512343";
          const defaultLng = "78.500667";
          setProfile((prev) => ({ ...prev, latitude: defaultLat, longitude: defaultLng }));
        }
      );
    }
  };

  const getOrCreateGoogleId = (): string => {
    let googleId = profile.googleId || localStorage.getItem("googleId");
    if (!googleId) {
      googleId = `google_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem("googleId", googleId);
    }
    return googleId;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setSaveStatus("idle");
    setErrorMessage("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Image size should be less than 5MB");
        setSaveStatus("error");
        return;
      }

      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please upload a valid image file");
        setSaveStatus("error");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, image: imageUrl }));
      localStorage.setItem("userProfileImage", imageUrl);
    }
  };

  const validateProfile = (): boolean => {
    if (!profile.name.trim()) {
      setErrorMessage("❌ Name is required");
      setSaveStatus("error");
      return false;
    }
    if (!profile.phone.trim()) {
      setErrorMessage("❌ Phone number is required");
      setSaveStatus("error");
      return false;
    }
    const phoneRegex = /^[+]?[\d\s-()]{10,}$/;
    if (!phoneRegex.test(profile.phone)) {
      setErrorMessage("❌ Invalid phone number (min 10 digits)");
      setSaveStatus("error");
      return false;
    }
    if (!profile.email.trim()) {
      setErrorMessage("❌ Email is required");
      setSaveStatus("error");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      setErrorMessage("❌ Invalid email format");
      setSaveStatus("error");
      return false;
    }
    return true;
  };
  const handleSave = async () => {
    if (!validateProfile()) return;

    setIsLoading(true);
    setSaveStatus("idle");
    setErrorMessage("");

    try {
      const googleId = getOrCreateGoogleId();

      const payload = {
        googleId,
        name: profile.name.trim(),
        mobilenumber: profile.phone.trim(),
        email: profile.email.trim(),
        profilePic: profile.image,
        latitude: profile.latitude || "17.512343",
        longitude: profile.longitude || "78.500667",
        platform: "web",
      };

      console.log("📡 Sending UPDATE request:", payload);

      // ------------------------------------------------
      // 🔵 ALWAYS CALL UPDATE API (REGISTER REMOVED)
      // ------------------------------------------------
      const response = await apiService.user.updateUserProfile("69267920bc39c469be13b3a6", payload);

      console.log("✅ Update API Response:", response);

      // ------------------------------------------------
      // 💾 SAVE TO LOCAL STORAGE
      // ------------------------------------------------
      const profileToSave = {
        name: payload.name,
        phone: payload.mobilenumber,
        email: payload.email,
        profilePic: payload.profilePic,
        googleId,
        latitude: payload.latitude,
        longitude: payload.longitude,
      };

      localStorage.setItem("userProfile", JSON.stringify(profileToSave));
      localStorage.setItem("userName", payload.name);
      localStorage.setItem("userEmail", payload.email);
      localStorage.setItem("contactNumber", payload.mobilenumber);
      localStorage.setItem("contactName", payload.name);
      localStorage.setItem("userId", googleId);
      localStorage.setItem("googleId", googleId);
      localStorage.setItem("latitude", payload.latitude);
      localStorage.setItem("longitude", payload.longitude);

      // SUCCESS UI
      setSaveStatus("success");
      setIsLoading(false);

      setTimeout(() => onClose(), 1500);

    } catch (err: any) {
      console.error("❌ UPDATE API FAILED:", err);
      setErrorMessage(err.message || "Update failed");
      setSaveStatus("error");
      setIsLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100 z-10" aria-label="Close">
          <X size={22} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <img
              src={profile.image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 shadow-lg transition-transform group-hover:scale-105"
            />
            <label htmlFor="profilePic" className="absolute bottom-0 right-0 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full p-2.5 shadow-lg cursor-pointer hover:shadow-xl transition-all transform hover:scale-110">
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isLoading}
              />
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Full Name</label>
            <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Enter your full name" disabled={isLoading} className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed" />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Phone Number</label>
            <input type="tel" name="phone" value={profile.phone} onChange={handleChange} placeholder="+91 1234567890" disabled={isLoading} className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed" />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email Address</label>
            <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="your.email@example.com" disabled={isLoading} className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed" />
          </div>

          {errorMessage && saveStatus === "error" && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-red-900 mb-1">Error</p>
                <p className="text-xs text-red-700 whitespace-pre-wrap">{errorMessage}</p>
              </div>
            </div>
          )}

          {saveStatus === "success" && (
            <div className="flex items-start gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-green-900 mb-1">Success!</p>
                <p className="text-xs text-green-700">Profile saved successfully! Closing...</p>
              </div>
            </div>
          )}

          <button onClick={handleSave} disabled={isLoading} className="w-full mt-6 py-3.5 text-white font-bold rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>

        {/* <div className="mt-5 pt-4 border-t border-gray-200 text-center space-y-1">
          <p className="text-xs text-gray-600 font-mono">
            Backend: <span className="text-indigo-600 font-semibold">{API_BASE_URL}/register</span>
          </p>
          <p className="text-xs text-gray-500">
            ✅ Postman format: application/x-www-form-urlencoded
          </p>
          <p className="text-xs text-gray-400">
            📝 Check console (F12) for request/response logs
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileCard;
