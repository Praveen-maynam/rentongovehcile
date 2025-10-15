import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyProfile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden flex justify-center items-center bg-[#f8fafc] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md border border-gray-100 p-6 relative">
        <button
          onClick={() => navigate("/profile")}
          className="absolute left-4 top-4 text-gray-500 hover:text-blue-600 transition"
        >
          <ArrowLeft size={22} />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
          My Profile
        </h2>

        <form className="space-y-4">
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
