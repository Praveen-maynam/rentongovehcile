import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/NavBar.tsx";
import Rental from "./pages/Rental.tsx";
import Listed from "./pages/Listed.tsx";
import Auto from "./pages/auto.tsx";
import Profile from "./pages/profile.tsx";
import Notifications from "./pages/Notifications.tsx";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Rental />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/listed" element={<Listed />} />
        <Route path="/auto" element={<Auto />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </div>
  );
};

export default App;
