import React, { useState } from "react";
import { X } from "lucide-react";

interface ProfileCardProps {
  onClose: () => void; // called when user clicks X
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onClose }) => {
  const [profile, setProfile] = useState({
    name: "Manoj kumar",
    phone: "+62651561565",
    email: "Manojkumar@gmail.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profile updated successfully!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-md w-[580px] h-[450px] p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={22} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={profile.image}
              alt="Profile"
              className="w-[96px] h-[87px] rounded-lg object-cover border"
            />
            <label
              htmlFor="profilePic"
              className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow cursor-pointer"
            >
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="text-gray-600">✎</span>
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full mt-4 py-2 text-white rounded-lg bg-gradient-to-r from-indigo-700 to-blue-400 hover:opacity-90 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
