import React, { useState } from "react";
import { ArrowLeft, User, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyProfile: React.FC = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSaveChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    // You can add form validation or API calls here
    navigate("/profile"); // Navigate to Profile page after saving
  };

  return (
    <div className="h-screen overflow-hidden flex justify-center items-center bg-[#f8fafc] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md border border-gray-100 p-6 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/profile")}
          className="absolute left-4 top-4 text-gray-500 hover:text-blue-600 transition"
        >
          <ArrowLeft size={22} />
        </button>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-4 relative">
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                <User size={40} className="text-gray-400" />
              </div>
            )}
            {/* Edit Icon */}
            <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-300 cursor-pointer hover:bg-gray-100">
              <Edit2 size={16} className="text-gray-600" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Heading below image */}
          <h3 className="mt-2 text-lg font-semibold text-gray-800">My Profile</h3>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSaveChanges}>
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
