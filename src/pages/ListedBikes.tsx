import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BikeLogo from "../assets/icons/BikeLogo.png";
import FilterLogo from "../assets/icons/FilterLogo.png";
import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
import { useLocation } from "../store/location.context";

interface Bike {
  id: string;
  bikeName: string;
  pricePerHour: number;
  imageUrl?: string;
}

const ListedBikes: React.FC = () => {
  const navigate = useNavigate();
  const { currentCity, currentCountry, coordinates } = useLocation();
  const userId = "68f32259cea8a9fa88029262";

  const [bikes, setBikes] = useState<Bike[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Bike | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Fetch bikes from backend
  const fetchBikes = async () => {
    try {
      const response = await fetch(`http://52.66.238.227:3000/myBikes/${userId}`);
      const data = await response.json();
      setBikes(data?.bikes || []);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  // ✅ Handle confirm (availability update)
  const handleConfirm = async (
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
  ) => {
    if (!selectedVehicle) return;

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("userId", userId);
      urlencoded.append("VechileId", selectedVehicle.id);
      urlencoded.append("vechileType", "Bike");
      urlencoded.append("startDate", startDate);
      urlencoded.append("endDate", endDate);
      urlencoded.append("startTime", startTime);
      urlencoded.append("endTime", endTime);

      const response = await fetch("http://52.66.238.227:3000/setNotAvailability", {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      });

      if (response.ok) {
        console.log("Availability updated successfully");
      } else {
        console.error("Failed to update availability");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsModalOpen(false);
      setSelectedVehicle(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Listed Bikes</h2>
        <button
          onClick={() => navigate("/list-bike")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg"
        >
          <img src={FilterLogo} alt="Add" className="w-5 h-5" />
          Add New Bike
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {bikes.length > 0 ? (
          bikes.map((bike) => (
            <div
              key={bike.id}
              className="bg-white shadow-md rounded-xl overflow-hidden p-4 hover:shadow-lg transition"
            >
              <img
                src={bike.imageUrl || BikeLogo}
                alt={bike.bikeName}
                className="w-full h-40 object-cover mb-3 rounded-lg"
              />
              <h3 className="text-lg font-semibold text-gray-700 mb-1">{bike.bikeName}</h3>
              <p className="text-sm text-gray-500 mb-3">
                ₹{bike.pricePerHour}/hour
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setSelectedVehicle(bike);
                    setIsModalOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Set Unavailability
                </button>
                <button
                  onClick={() => navigate(`/bike-details/${bike.id}`)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No bikes listed yet.
          </p>
        )}
      </div>

   <AvailabilityDateTimeModal
  isOpen={true}
  onClose={() => setIsModalOpen(false)}
  onConfirm={handleConfirm}
/>


    </div>
  );
};

export default ListedBikes;
