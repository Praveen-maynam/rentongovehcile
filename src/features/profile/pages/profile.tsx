// // Profile page component will be implemented here
// import React from "react";
// import {
//   User,
//   CalendarDays,
//   ListChecks,
//   Languages,
//   Download,
//   Info,
//   Shield,
//   HelpCircle,
// } from "lucide-react";
// import ProfileOption from "../components/profileOption";
// import ProfileCard from "../components/profilecard"

// const Profile: React.FC = () => {
//   return (
//     <div className="max-w-md mx-auto bg-white shadow-md rounded-xl mt-6 overflow-hidden">
//       <div className="px-4 py-3 border-b border-gray-200">
//         <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
//       </div>

//       <div className="divide-y divide-gray-100">
//         {/* Main Section */}
//         <ProfileOption icon={User} label="My Profile" onClick={() =><ProfileCard/>} />
//         <ProfileOption icon={CalendarDays} label="My Bookings" onClick={() => console.log("My Bookings")} />
//         <ProfileOption icon={ListChecks} label="My Listing Bookings" onClick={() => console.log("My Listing Bookings")} />
//         <ProfileOption icon={Languages} label="Change Language" onClick={() => console.log("Change Language")} />
//         <ProfileOption icon={Download} label="Download Our App" onClick={() => console.log("Download App")} />
         
//         {/* Subheader */}
//         <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">Support & Settings</div>

//         {/* Support Section */}
//         <ProfileOption icon={Shield} label="Privacy Policy" onClick={() => console.log("Privacy Policy")} />
//         <ProfileOption icon={Info} label="About Us" onClick={() => console.log("About Us")} />
//         <ProfileOption icon={HelpCircle} label="Help" onClick={() => console.log("Help")} />
//       </div>
//     </div>
//   );
// };

// export default Profile;


// src/pages/Profile.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  User,
  CalendarDays,
  ListChecks,
  Languages,
  Download,
  Info,
  Shield,
  HelpCircle,
  X,
} from "lucide-react";
import ProfileOption from "../components/profileOption";
import ProfileCard from "../components/profilecard";

const Profile: React.FC = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowProfileModal(false);
    };
    if (showProfileModal) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showProfileModal]);

  // return focus to trigger after close
  useEffect(() => {
    if (!showProfileModal && triggerRef.current) triggerRef.current.focus();
  }, [showProfileModal]);

  const openProfile = (btn?: HTMLButtonElement | null) => {
    if (btn) triggerRef.current = btn;
    setShowProfileModal(true);
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-xl mt-6 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {/* Main Section */}
          {/* Pass a stabilized callback to capture the clicked button as trigger for focus return */}
          <ProfileOption
            icon={User}
            label="My Profile"
            onClick={(e?: React.MouseEvent) => {
              // save the clicked element as trigger (if available)
              const btn = (e?.currentTarget as unknown) as HTMLButtonElement | null;
              openProfile(btn);
            }}
          />

          <ProfileOption
            icon={CalendarDays}
            label="My Bookings"
            onClick={() => console.log("My Bookings")}
          />
          <ProfileOption
            icon={ListChecks}
            label="My Listing Bookings"
            onClick={() => console.log("My Listing Bookings")}
          />
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

      {/* Modal (ProfileCard) */}
      {showProfileModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setShowProfileModal(false)}
            aria-hidden="true"
          />

          {/* modal panel */}
          <div
            ref={modalRef}
            className="relative z-10 max-w-md w-full mx-auto"
            // stop clicks from bubbling to backdrop
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* header with close */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h3 id="profile-modal-title" className="text-lg font-semibold text-gray-900">
                  Edit Profile
                </h3>
                <button
                  aria-label="Close profile modal"
                  className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => setShowProfileModal(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* content: your ProfileCard component */}
              <div className="p-6">
                {/* If your ProfileCard expects props (like onClose) you can pass them here.
                    The earlier provided ProfileCard implementation used internal state and alert on save.
                    If you want ProfileCard to close modal after save, modify ProfileCard to accept an `onClose` prop
                    and call it from inside the card when save completes. */}
                <ProfileCard />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
