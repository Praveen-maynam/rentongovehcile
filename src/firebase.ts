// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyB_32kh2o6DdBVVvLFFBUdMnTbPWWYp4z8",
  authDomain: "rentongovehicle-7e6c0.firebaseapp.com",
  projectId: "rentongovehicle-7e6c0",
  storageBucket: "rentongovehicle-7e6c0.firebasestorage.app",
  messagingSenderId: "406882720905",
  appId: "1:406882720905:web:e7a2a367658a2cf1b03a58",
  measurementId: "G-BC3ZM7VJ9C"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);