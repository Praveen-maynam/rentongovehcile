import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./components/layout/NavBar";

// Pages
import Rental from "./pages/Rental";
import ListedCars from "./pages/ListedCars";
import Auto from "./pages/Autos";
import BookNow from "./pages/BookNow";
import Confirmation from "pages/Confirmation";
import ProfilePage from "./pages/ProfilePage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Rental />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/listed" element={<ListedCars />} />
          <Route path="/auto" element={<Auto />} />
          <Route path="/booknow/:id" element={<BookNow />} />
          <Route path="/booking-confirmation/:id" element={<Confirmation />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
