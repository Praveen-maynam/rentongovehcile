import React, { useState, useMemo } from "react";
import VehicleCard from "../components/ui/VehicleCard";
import { vehicles } from "./data/Vehicle";
import ChatBox from "../components/ChatBox";
import { Vehicle } from "../types/Vehicle";
import { useLocation } from "../store/location.context";

const Home: React.FC = () => {
  const { currentCity } = useLocation();
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Filter vehicles by selected location
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const vehicleCity = v.location?.split(',')[0].trim() || '';
      return vehicleCity.toLowerCase() === currentCity.toLowerCase();
    });
  }, [currentCity]);

  // ✅ Open chat popup for selected vehicle
  const openChat = (v: Vehicle) => {
    setSelectedVehicle(v);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ✅ Page Title */}
      <header className="max-w-6xl mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Available Vehicles in {currentCity}</h1>
        <p className="text-gray-500">Chat directly with owners and explore available rides in your selected location.</p>
      </header>

      {/* ✅ Vehicle Grid */}
      <main className="max-w-6xl mx-auto p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              onBook={() => openChat(v)} // ✅ integrated with VehicleCard
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg mb-2">No vehicles available in {currentCity}</p>
            <p className="text-gray-400 text-sm">Try changing your location to see more vehicles</p>
          </div>
        )}
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
