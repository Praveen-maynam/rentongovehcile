import React, { useState } from "react";

const ProfileCard: React.FC = () => {
  const [profile, setProfile] = useState({
    name: "Manoj kumar",
    phone: "+62651561565",
    email: "Manojkumar@gmail.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSave = () => {
    console.log("Profile saved:", profile);
    alert("Profile updated successfully!");
  };

  return (
    // <div className="flex justify-center items-center h-100 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md w-[380px] p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={profile.image}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <label
              htmlFor="profilePic"
              className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L7.21 19.44a4.5 4.5 0 01-1.897 1.13l-2.684.8.8-2.684a4.5 4.5 0 011.13-1.897L16.862 4.487z"
                />
              </svg>
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
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
    // </div>
  );
};

export default ProfileCard;
