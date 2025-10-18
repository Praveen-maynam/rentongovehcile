import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin } from "lucide-react";

// ✅ Correct import with exact case
import RentOnGoLogo from "../../assets/icons/RentOnGoLogo.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Rental", path: "/rental" },
    { name: "Listed", path: "/listed" },
    { name: "Auto", path: "/auto" },
    { name: "Profile", path: "/profile" },
    { name: "Notifications", path: "/notifications" },
  ];

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* ✅ RentOnGo Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={RentOnGoLogo}
            alt="RentOnGo Logo"
            className="object-contain w-[214px] h-[64px]"
          />
        </div>

        {/* ✅ Location + Navigation Menu */}
        <div className="flex items-center gap-6 sm:gap-8">
          <div className="flex items-center gap-1 text-gray-700">
            <MapPin size={18} />
            <span className="text-sm font-medium">Kakinada</span>
          </div>

          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`relative text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {item.name}
              {location.pathname === item.path && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-600 rounded-full"></span>
              )}
            </button>
          ))}

          {/* ✅ Listing Button */}
          <button
            onClick={() => navigate("/listing")}
            className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-all"
          >
            Listing +
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
