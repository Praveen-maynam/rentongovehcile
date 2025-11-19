// import
//   React, { useState } from "react";
// import axios from "axios";
// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";
// import { getFcmToken } from "../lib/fcm";
// // import { platform } from "os";
// const Register: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     // mobilenumber: "",
//   fcmToken:"",
// platform:"web"

//   });
//   const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({ latitude: null, longitude: null });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const detectLocation = (): Promise<{ latitude: number; longitude: number }> => {
//     return new Promise((resolve, reject) => {
//       if (!navigator.geolocation) { 
//         reject(new Error("Geolocation is not supported by your browser"));
//         return;
//       }
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ latitude, longitude });
//           resolve({ latitude, longitude });
//         },
//         (error) => {
//           reject(new Error("Unable to retrieve your location"));
//         }
//       );
//     });
//   };

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     try {
//       // 1️⃣ Google Sign-In
//       const result = await signInWithPopup(auth, googleProvider);
//   const user = result.user;
//   const googleId = user.uid;
//   const email=user.email;
//   // Get the real FCM token for push notifications
//   const fcmToken = await getFcmToken();
//   console.log("FCM Token:", fcmToken);

//       // 2️⃣ Detect location
//       // let latitude = location.latitude;
//       // let longitude = location.longitude;
//       // if (!latitude || !longitude) {
//       //   const coords = await detectLocation();
//       //   latitude = coords.latitude;
//       //   longitude = coords.longitude;
//       // }

//       // 3️⃣ Prepare payload
//       const payload = {
//         googleId: googleId,
//         name: result.user|| "",
//         email: email,
//         // mobilenumber: formData.mobilenumber,
//         // latitude,
//         // longitude,
//         platform: "web",
//         fcmToken: fcmToken
        
//       };

//       console.log("📦 Sending payload:", payload);

//       // 4️⃣ Send POST request
//       const response = await axios.post("http://52.66.238.227:3000/register", payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("✅ API Response:", response.data);
//       setMessage("🎉 User registered successfully!");
//       localStorage.setItem("user", JSON.stringify(response.data.data));
//     } catch (error: any) {
//       // Enhanced error logging for debugging
//       if (error.response) {
//         console.error("❌ Registration error (response):", error.response);
//         console.error("❌ Backend error data:", error.response.data);
//         setMessage(
//           `❌ Registration failed: ${error.response.data?.message || JSON.stringify(error.response.data)}`
//         );
//       } else if (error.request) {
//         console.error("❌ Registration error (request):", error.request);
//         setMessage("❌ Registration failed. No response from server.");
//       } else {
//         console.error("❌ Registration error (other):", error.message);
//         setMessage(`❌ Registration failed: ${error.message}`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
//       <form
//         onSubmit={handleRegister}
//         className="bg-white p-8 shadow-2xl rounded-2xl w-full max-w-md border border-gray-100"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           🚗 Register Your Account
//         </h2>

//         {/* Name */}
//          <div className="mb-4">
//           <label className="block text-gray-700 text-sm mb-1">Full Name</label>
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             placeholder="Enter your name"
//             required
//           />
//         </div> 

//         {/* Email */}
//          <div className="mb-4">
//           <label className="block text-gray-700 text-sm mb-1">Email</label>
//           <input
//             type="email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             placeholder="Enter your email"
//             required
//           />
//         </div> 

//         {/* Mobile */}
//         {/* <div className="mb-4">
//           <label className="block text-gray-700 text-sm mb-1">Mobile Number</label>
//           <input
//             type="tel"
//             value={formData.mobilenumber}
//             onChange={(e) => setFormData({ ...formData, mobilenumber: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             placeholder="Enter your mobile number"
//             required
//           />
//         </div>  */}

//         {/* Detect Location */}
//          {/* <button
//           type="button"
//           onClick={() => detectLocation()}
//           className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition mb-3"
//         >
//           📍 Detect My Location
//         </button> 

//         {location.latitude && (
//           <p className="text-sm text-green-600 text-center mb-4">
//             Lat: {location.latitude.toFixed(5)} | Lng: {location.longitude?.toFixed(5)}
//           </p>
//         )}  */}

//         {/* Register Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-blue-700 transition disabled:opacity-60"
//         >
//           {loading ? "Registering..." : "Register with Google"}
//         </button>

//         {/* Message */}
//         {message && (
//           <p
//             className={`text-center text-sm mt-4 ${
//               message.startsWith("🎉") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { getFcmToken } from "../lib/fcm";
import { useNavigate } from "react-router-dom";
import google from "../assets/icons/google.png"
import  login from "../assets/icons/login.png"
interface GoogleUser {
  name: string;
  email: string;
  // photo: string;
  fcmToken?:string;
  googleId?:string;

}

const GoogleLoginButton: React.FC = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const navigate = useNavigate();

  // ✅ Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
 const fcmToken = await getFcmToken();
      const loggedInUser = {
        name: user.displayName || "",
        email: user.email || "",
        // photo: user.photoURL || "",
      fcmToken:fcmToken,
      googleId:user.uid
    
      };

      setUser(loggedInUser);

      console.log("✅ Firebase Google Auth Success:", loggedInUser);

      // (Optional) send to your backend for registration
      const payload = {
        googleId: user.uid,
       
        name: loggedInUser.name,
         email: loggedInUser.email,
        fcmToken: loggedInUser.fcmToken,
       
       
      };
      console.log("Payload sent to backend:", payload);
      
      const res = await fetch("http://3.110.122.127:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
//       const responseData = await res.json();
//       console.log("📥 Backend Response:", responseData);
      
//       if (!res.ok) {
//         throw new Error(`Backend error: ${responseData.message || JSON.stringify(responseData)}`);
//       }

//       // ✅ Enhanced userId extraction with fallback to googleId
//       const userId = responseData._id;
      
//       console.log("🔍 Extracted userId:", userId);
      
//       if (!userId) {
//         console.warn("⚠️ No userId found, using googleId as fallback");
//       }
//        else {
//   console.log("🔍 Extracted userId from backend:", userId);
// }

//       // ✅ Comprehensive localStorage storage (matching other components)
//       const finalUserId = userId || user.uid;
//       const userDataToStore = {
//         name: loggedInUser.name,
//         email: loggedInUser.email,
//         googleId: user.uid,
//         fcmToken: loggedInUser.fcmToken,
//         userId: finalUserId,
//       };
      
//       // Store in multiple formats for compatibility across the app
//       localStorage.setItem("userId", finalUserId);
//       localStorage.setItem("googleId", user.uid);
//       localStorage.setItem("userName", loggedInUser.name);
//       localStorage.setItem("userEmail", loggedInUser.email);
//       localStorage.setItem("contactName", loggedInUser.name);
//       localStorage.setItem("fcmToken", loggedInUser.fcmToken || "");
//       localStorage.setItem("userProfile", JSON.stringify(userDataToStore));
//       localStorage.setItem("user", JSON.stringify(userDataToStore));
      



// ⬇️ Fixed version
const responseData = await res.json();
console.log("📥 Backend Response:", responseData);

// Backend should return: { _id: "...", name "...", email "...", fcmToken "...", googleId: "..." }
if (!res.ok) {
  throw new Error(`Backend error: ${responseData.message || JSON.stringify(responseData)}`);
}

// Ensure backend userId exists
const backendUserId = responseData.user._id;

if (!backendUserId) {
  console.error("❌ ERROR: Backend did not return userId (_id). Check backend response.");
} else {
  console.log("🔍 Extracted userId from backend:", backendUserId);
}

const finalUserId = backendUserId || user.uid;

const userDataToStore = {
  userId: finalUserId,
  googleId: user.uid,
  name: loggedInUser.name,
  email: loggedInUser.email,
  fcmToken: loggedInUser.fcmToken,
};

// Store in localStorage
localStorage.setItem("userId", finalUserId);
localStorage.setItem("user", JSON.stringify(userDataToStore));
localStorage.setItem("userProfile", JSON.stringify(userDataToStore));
localStorage.setItem("googleId", user.uid);
localStorage.setItem("fcmToken", loggedInUser.fcmToken || "");
localStorage.setItem("userName", loggedInUser.name);
localStorage.setItem("userEmail", loggedInUser.email);

// IMPORTANT FIX: Do NOT overwrite userId by using payload
setUser(userDataToStore);








      console.log("💾 User data stored successfully:", {
        userId: finalUserId,
        googleId: user.uid,
        name: loggedInUser.name,
        email: loggedInUser.email
      });

      // setUser({ ...payload });
      
      console.log("🎉 Registration successful! Navigating to main page...");
      navigate("/change-location");
      
      
    } catch (error: any) {
      console.error("❌ Google Login Error:", error.message);
      alert("Google login failed! Check console for details.");
    }
  };

  // ✅ Handle Logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    //   {!user ? (
    //     <button
    //       onClick={handleGoogleLogin}
    //       className="flex items-center gap-3 bg-white border border-gray-300 shadow-md px-6 py-2 rounded-lg hover:bg-gray-50 transition"
    //     >
    //       <img
    //         src="https://www.svgrepo.com/show/475656/google-color.svg"
    //         alt="Google"
    //         className="w-6 h-6"
    //       />
    //       <span className="font-medium text-gray-700">
    //         Continue with Google
    //       </span>
    //     </button>
    //   ) : (
    //     <div className="bg-white shadow-lg rounded-lg p-6 text-center">
    //       <img
    //         // src={user.photo}
    //         alt={user.name}
    //         className="w-16 h-16 rounded-full mx-auto mb-2"
    //       />
    //       <h3 className="text-lg font-semibold">{user.name}</h3>
    //       <p className="text-gray-600">{user.email}</p>
    //       <button
    //         onClick={handleLogout}
    //         className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    //       >
    //         Logout
    //       </button>
    //     </div>
    //   )}
    // </div>





     <div className="flex items-center justify-center bg-gray-100 min-h-[calc(100vh-80px)] py-8">
      <div className="w-full max-w-4xl flex bg-white rounded-2xl shadow-xl overflow-hidden">
        
       {/* Left Side (Illustration + Welcome) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-blue-600 to-blue-400 text-white flex-col justify-center items-center p-10">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg text-center">
            Manage your vehicle listings, rentals, and bookings anytime.
          </p>
          <img
            src={login} // add your illustration image in /public
            alt="Login Illustration"
            className="mt-10 w-72"
          />
        </div>

        {/* Right Side (Login Box) */}
         <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign in to Continue</h2>
          {!user ? (
          <button
            className="flex items-center justify-center gap-3 w-full max-w-sm bg-blue-600 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 shadow hover:shadow-md transition"
            onClick={handleGoogleLogin}
          >
            <img src={google} alt="Google" className="w-9 h-9" />
            <span className="font-medium text-white">Login with Google</span>
          </button>
          ) : (
            <div className="bg-gray-50 shadow-lg rounded-lg p-6 text-center w-full max-w-sm">
              {/* <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button> */}
            </div>
          )}
          <p className="text-gray-500 text-sm mt-6 text-center">
            No separate signup needed — your Google account is your key.
          </p>
        </div>  

      </div>
    </div>
  );
};

export default GoogleLoginButton;






































// import React, { useState } from "react";
// import { signInWithPopup, signOut } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";
// import { getFcmToken } from "../lib/fcm";

// interface GoogleUser {
//   name: string;
//   email: string;
//   fcmToken?: string;
//   googleId?: string;
// }

// const GoogleLoginButton: React.FC = () => {
//   const [user, setUser] = useState<GoogleUser | null>(null);

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       const fcmToken = await getFcmToken();

//       const payload = {
//         googleId: user.uid,
//         name: user.displayName || "",
//         email: user.email || "",
//         fcmToken: fcmToken,
//         // platform: "web",
//       };

//       console.log("📦 Sending payload:", payload);

//       const res = await fetch("http://52.66.238.227:3000/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const text = await res.text();
//       console.log("📥 Backend Response:", text);
//       if (!res.ok) throw new Error(`Backend error: ${text}`);

//       setUser({ ...payload });
//     } catch (err: any) {
//       console.error("❌ Google Login Error:", err);
//       alert(err.message);
//     }
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     setUser(null);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       {!user ? (
//         <button
//           onClick={handleGoogleLogin}
//           className="flex items-center gap-3 bg-white border border-gray-300 shadow-md px-6 py-2 rounded-lg hover:bg-gray-50 transition"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="Google"
//             className="w-6 h-6"
//           />
//           <span className="font-medium text-gray-700">
//             Continue with Google
//           </span>
//         </button>
//       ) : (
//         <div className="bg-white shadow-lg rounded-lg p-6 text-center">
//           <h3 className="text-lg font-semibold">{user.name}</h3>
//           <p className="text-gray-600">{user.email}</p>
//           <button
//             onClick={handleLogout}
//             className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GoogleLoginButton;