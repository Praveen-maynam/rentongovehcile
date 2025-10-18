import React, { useState } from "react";
import VehicleCard from "../components/ui/VehicleCard";
import { vehicles } from "./data/Vehicle";
import ChatBox from "../components/ChatBox";
import { Vehicle } from "../types/Vehicle";

const Home: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // ✅ Open chat popup for selected vehicle
  const openChat = (v: Vehicle) => {
    setSelectedVehicle(v);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ✅ Page Title */}
      <header className="max-w-6xl mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Available Vehicles</h1>
        <p className="text-gray-500">Chat directly with owners and explore available rides.</p>
      </header>

      {/* ✅ Vehicle Grid */}
      <main className="max-w-6xl mx-auto p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <VehicleCard
            key={v.id}
            vehicle={v}
            onBook={() => openChat(v)} // ✅ integrated with VehicleCard
          />
        ))}
      </main>

      {/* ✅ Chat Popup */}
      {chatOpen && selectedVehicle && (
        <ChatBox
          vehicle={selectedVehicle}
          onClose={() => {
            setChatOpen(false);
            setSelectedVehicle(null);
          }}
        />
      )}
    </div>
  );
};

export default Home;
