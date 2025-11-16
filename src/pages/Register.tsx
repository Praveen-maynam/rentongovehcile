import React, { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { getFcmToken } from "../lib/fcm";
import { platform } from "os";
interface GoogleUser {
  name: string;
  email: string;
  // photo: string;
  fcmToken?:string;
  googleId?:string;

}

const GoogleLoginButton: React.FC = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);

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
      const res =
      await fetch("http://3.110.122.127:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),   
       
      });
           const text = await res.text();
      console.log("📥 Backend Response:", text);
      if (!res.ok) throw new Error(`Backend error: ${text}`);

      setUser({ ...payload });
      
      
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!user ? (
        <button
          onClick={handleGoogleLogin}
          className="flex items-center gap-3 bg-white border border-gray-300 shadow-md px-6 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6"
          />
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <img
            // src={user.photo}
            alt={user.name}
            className="w-16 h-16 rounded-full mx-auto mb-2"
          />
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;