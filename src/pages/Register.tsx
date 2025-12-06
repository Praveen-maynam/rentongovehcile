// import React, { useState } from "react";
// import { signInWithPopup, signOut } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";
// import { getFcmToken } from "../lib/fcm";
// import { useNavigate } from "react-router-dom";
// import apiService from "../services/api.service";
// import google from "../assets/icons/google.png";
// import login from "../assets/icons/login.png";

// interface GoogleUser {
//   userId: string;   // MongoDB _id from backend
//   googleId: string; // Firebase UID
//   name: string;
//   email: string;
//   fcmToken?: string;
// }

// const GoogleLoginButton: React.FC = () => {
//   const [user, setUser] = useState<GoogleUser | null>(null);
//   const navigate = useNavigate();

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const firebaseUser = result.user;
//       const fcmToken = await getFcmToken();

//       // Payload for backend registration
//       const payload = {
//         googleId: firebaseUser.uid,
//         name: firebaseUser.displayName || "",
//         email: firebaseUser.email || "",
//         mobilenumber: "",
//         latitude: "",
//         longitude: "",
//         fcmToken: fcmToken || "",
//         platform: "web",
//       };

//       // ✅ Use apiService.user.register
//       const response: any = await apiService.user.register(payload);
//       const backendUserId = response.user?._id;
//       console.log("Backend user ID:", backendUserId);
//       if (!backendUserId) throw new Error("Backend did not return user._id");

//       // Store user info
//       const userDataToStore: GoogleUser = {
//         userId: backendUserId,
//         googleId: firebaseUser.uid,
//         name: payload.name,
//         email: payload.email,
//         fcmToken: fcmToken || "",
//       };

//       localStorage.setItem("user", JSON.stringify(userDataToStore));
//       localStorage.setItem("userId", backendUserId);
//       localStorage.setItem("googleId", firebaseUser.uid);
//       localStorage.setItem("userName", payload.name);
//       localStorage.setItem("userEmail", payload.email);
//       localStorage.setItem("fcmToken", fcmToken || "");
//       localStorage.setItem("userProfile", JSON.stringify(userDataToStore));

//       setUser(userDataToStore);

//       if (backendUserId === firebaseUser.uid) {
//         console.warn("MongoDB _id and Firebase UID are the SAME!");
//       }

//       navigate("/change-location");
//     } catch (error: any) {
//       console.error("Google login error:", error);
//       alert(error?.response?.data?.message || error.message || "Google login failed");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       localStorage.removeItem("user");
//       localStorage.removeItem("userId");
//       localStorage.removeItem("googleId");
//       localStorage.removeItem("userName");
//       localStorage.removeItem("userEmail");
//       localStorage.removeItem("fcmToken");
//       localStorage.removeItem("userProfile");
//       setUser(null);
//       console.log("✅ User logged out successfully");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center bg-gray-100 min-h-[calc(100vh-80px)] py-8">
//       <div className="w-full max-w-4xl flex bg-white rounded-2xl shadow-xl overflow-hidden">

//         {/* Left Panel */}
//         <div className="hidden md:flex w-1/2 bg-gradient-to-b from-blue-600 to-blue-400 text-white flex-col justify-center items-center p-10">
//           <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
//           <p className="text-lg text-center">
//             Manage your vehicle listings, rentals, and bookings anytime.
//           </p>
//           <img src={login} alt="Login Illustration" className="mt-10 w-72" />
//         </div>

//         {/* Right Panel */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">
//             {user ? "Welcome!" : "Sign in to Continue"}
//           </h2>

//           {!user ? (
//             <>
//               <button
//                 className="flex items-center justify-center gap-3 w-full max-w-sm bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 shadow hover:shadow-lg hover:border-blue-500 transition-all"
//                 onClick={handleGoogleLogin}
//               >
//                 <img src={google} alt="Google" className="w-9 h-9" />
//                 <span className="font-medium text-gray-800">Sign in with Google</span>
//               </button>

//               <p className="text-gray-500 text-sm mt-6 text-center">
//                 No separate signup needed — your Google account is your key.
//               </p>
//             </>
//           ) : (
//             <div className="text-center">
//               <p className="text-lg mb-4">
//                 Logged in as <span className="font-semibold">{user.name}</span>
//               </p>
//               <p className="text-sm text-gray-600 mb-2">{user.email}</p>

//               <div className="text-xs text-gray-500 mb-4 p-3 bg-gray-50 rounded font-mono">
//                 <div className="mb-1">
//                   <span className="font-semibold">MongoDB ID:</span><br />
//                   {user.userId}
//                 </div>
//                 <div>
//                   <span className="font-semibold">Firebase ID:</span><br />
//                   {user.googleId}
//                 </div>
//                 <div className="mt-2 text-green-600 font-bold">
//                   {user.userId !== user.googleId ? "✅ Different IDs!" : "❌ Same IDs"}
//                 </div>
//               </div>

//               <button
//                 className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//                 onClick={handleLogout}
//               >
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default GoogleLoginButton;






import React, { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { getFcmToken } from "../lib/fcm";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import google from "../assets/icons/google.png";
import login from "../assets/icons/login.png";

interface GoogleUser {
  userId: string;   // MongoDB _id from backend
  googleId: string; // Firebase UID
  name: string;
  email: string;
  fcmToken?: string;
  mobilenumber?: string;
  profilePic?: string;
}

const GoogleLoginButton: React.FC = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const fcmToken = await getFcmToken();

      // Payload for backend registration
      const payload = {
        googleId: firebaseUser.uid,
        name: firebaseUser.displayName || "",
        email: firebaseUser.email || "",
        mobilenumber: "",
        latitude: "",
        longitude: "",
        fcmToken: fcmToken || "",
        platform: "web",
      };

      // ✅ Use apiService.user.register
      const response: any = await apiService.user.register(payload);
      const backendUser = response.user;
      const backendUserId = backendUser?._id;

      console.log("✅ Backend response:", response);
      console.log("✅ Backend user data:", backendUser);

      if (!backendUserId) throw new Error("Backend did not return user._id");

      // Store user info with all fields from backend
      const userDataToStore: GoogleUser = {
        userId: backendUserId,
        googleId: firebaseUser.uid,
        name: backendUser.name || payload.name,
        email: backendUser.email || payload.email,
        fcmToken: fcmToken || "",
        mobilenumber: backendUser.mobilenumber || "",
        profilePic: backendUser.profilePic || "",
      };

      // 💾 Save ALL user data to localStorage with multiple key variations
      localStorage.setItem("user", JSON.stringify(userDataToStore));
      localStorage.setItem("userId", backendUserId);
      localStorage.setItem("_id", backendUserId);
      localStorage.setItem("googleId", firebaseUser.uid);
      localStorage.setItem("userName", userDataToStore.name);
      localStorage.setItem("contactName", userDataToStore.name);
      localStorage.setItem("userEmail", userDataToStore.email);
      localStorage.setItem("fcmToken", fcmToken || "");

      // 📱 Save mobile number with ALL possible key names
      if (backendUser.mobilenumber) {
        localStorage.setItem("contactNumber", backendUser.mobilenumber);
        localStorage.setItem("mobilenumber", backendUser.mobilenumber);
        localStorage.setItem("phoneNumber", backendUser.mobilenumber);
        localStorage.setItem("phone", backendUser.mobilenumber);
        console.log("📱 Mobile number saved:", backendUser.mobilenumber);
      }

      // 🖼️ Save profile picture if exists
      if (backendUser.profilePic) {
        localStorage.setItem("userProfileImage", backendUser.profilePic);
        localStorage.setItem("profilePic", backendUser.profilePic);
      }

      // 📦 Save complete profile object
      const profileData = {
        name: userDataToStore.name,
        phone: backendUser.mobilenumber || "",
        email: userDataToStore.email,
        userId: backendUserId,
        googleId: firebaseUser.uid,
        profilePic: backendUser.profilePic || "",
      };
      localStorage.setItem("userProfile", JSON.stringify(profileData));

      console.log("💾 All data saved to localStorage:", {
        name: userDataToStore.name,
        email: userDataToStore.email,
        phone: backendUser.mobilenumber,
        userId: backendUserId,
        googleId: firebaseUser.uid
      });

      setUser(userDataToStore);

      if (backendUserId === firebaseUser.uid) {
        console.warn("MongoDB _id and Firebase UID are the SAME!");
      }

      navigate("/change-location");
    } catch (error: any) {
      console.error("❌ Google login error:", error);
      alert(error?.response?.data?.message || error.message || "Google login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      // Clear all user-related localStorage items
      const keysToRemove = [
        "user", "userId", "_id", "googleId", "userName", "contactName",
        "userEmail", "fcmToken", "userProfile", "contactNumber",
        "mobilenumber", "phoneNumber", "phone", "userProfileImage", "profilePic"
      ];

      keysToRemove.forEach(key => localStorage.removeItem(key));

      setUser(null);
      console.log("✅ User logged out successfully");

      navigate("/login");
    } catch (error) {
      console.error("❌ Logout error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-[calc(100vh-80px)] py-8">
      <div className="w-full max-w-4xl flex bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Left Panel */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-blue-600 to-blue-400 text-white flex-col justify-center items-center p-10">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg text-center">
            Manage your vehicle listings, rentals, and bookings anytime.
          </p>
          <img src={login} alt="Login Illustration" className="mt-10 w-72" />
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {user ? "Welcome!" : "Sign in to Continue"}
          </h2>

          {!user ? (
            <>
              <button
                className="flex items-center justify-center gap-3 w-full max-w-sm bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 shadow hover:shadow-lg hover:border-blue-500 transition-all"
                onClick={handleGoogleLogin}
              >
                <img src={google} alt="Google" className="w-9 h-9" />
                <span className="font-medium text-gray-800">Sign in with Google</span>
              </button>

              <p className="text-gray-500 text-sm mt-6 text-center">
                No separate signup needed — your Google account is your key.
              </p>
            </>
          ) : (
            <div className="text-center">
              <p className="text-lg mb-4">
                Logged in as <span className="font-semibold">{user.name}</span>
              </p>
              <p className="text-sm text-gray-600 mb-2">{user.email}</p>
              {user.mobilenumber && (
                <p className="text-sm text-gray-600 mb-2">📱 {user.mobilenumber}</p>
              )}

              <div className="text-xs text-gray-500 mb-4 p-3 bg-gray-50 rounded font-mono">
                <div className="mb-1">
                  <span className="font-semibold">MongoDB ID:</span><br />
                  {user.userId}
                </div>
                <div>
                  <span className="font-semibold">Firebase ID:</span><br />
                  {user.googleId}
                </div>
                <div className="mt-2 text-green-600 font-bold">
                  {user.userId !== user.googleId ? "✅ Different IDs!" : "❌ Same IDs"}
                </div>
              </div>

              <button
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default GoogleLoginButton;