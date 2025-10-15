import React, { useState } from "react";
import { Pencil } from "lucide-react";

const ProfileForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "Manoj Kumar",
    phone: "+6265165165",
    email: "manojkumar@gmail.com",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile saved successfully!");
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <div className="bg-white w-[400px] rounded-xl shadow-lg border border-gray-100 p-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-4 relative">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover"
          />
          <button className="absolute bottom-1 right-[140px] bg-gray-200 p-1 rounded-full hover:bg-gray-300">
            <Pencil size={14} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-3 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-2 rounded-md hover:opacity-90 transition-all"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
