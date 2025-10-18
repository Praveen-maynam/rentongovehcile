// Profile page component will be implemented here
import React from "react";
import {
  User,
  CalendarDays,
  ListChecks,
  Languages,
  Download,
  Info,
  Shield,
  HelpCircle,
} from "lucide-react";
import ProfileOption from "../components/profileOption";

const Profile: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl mt-6 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
      </div>

      <div className="divide-y divide-gray-100">
        {/* Main Section */}
        <ProfileOption icon={User} label="My Profile" onClick={() => console.log("My Profile")} />
        <ProfileOption icon={CalendarDays} label="My Bookings" onClick={() => console.log("My Bookings")} />
        <ProfileOption icon={ListChecks} label="My Listing Bookings" onClick={() => console.log("My Listing Bookings")} />
        <ProfileOption icon={Languages} label="Change Language" onClick={() => console.log("Change Language")} />
        <ProfileOption icon={Download} label="Download Our App" onClick={() => console.log("Download App")} />

        {/* Subheader */}
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">Support & Settings</div>

        {/* Support Section */}
        <ProfileOption icon={Shield} label="Privacy Policy" onClick={() => console.log("Privacy Policy")} />
        <ProfileOption icon={Info} label="About Us" onClick={() => console.log("About Us")} />
        <ProfileOption icon={HelpCircle} label="Help" onClick={() => console.log("Help")} />
      </div>
    </div>
  );
};

export default Profile;
