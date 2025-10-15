import React from "react";
import ProfileSidebar from "./profile/ProfilePage.tsx";

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex justify-center items-start p-6">
      <ProfileSidebar />
    </div>
  );
};

export default ProfilePage;
