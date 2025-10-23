// src/pages/EditCarDetails.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlackCar from "../assets/images/BlackCar.png";

// ✅ Zustand Stores
import { useVehicleStore } from "../store/vehicle.store";
import { useListedCarsStore } from "../store/listedCars.store";
import { useListedAutosStore } from "../store/listedAutos.store";
import { useListedBikesStore } from "../store/listedBikes.store";
import { useBookingStore } from "../store/booking.store";

interface VehicleDetails {
  id?: string;
  name: string;
  price: string;
  transmission: string;
  seats: string;
  fuel: string;
  ac: boolean;
  rating: string;
  image: string;
  description: string;
  location: {
    state: string;
    district: string;
    city: string;
    pincode: string;
    street: string;
  };
  documents: {
    drivingLicense: boolean;
    aadharCard: boolean;
    depositVehicle: boolean;
    depositMoney: string;
  };
  createdAt?: number;
}

const EditCarDetails: React.FC = () => {
  const { vehicleName } = useParams<{ vehicleName: string }>();
  const navigate = useNavigate();

  const { getVehicleByName, updateVehicle, deleteVehicle, addVehicle } = useVehicleStore();
  const { cars, updateCar, deleteCar } = useListedCarsStore();
  const { autos, updateAuto, deleteAuto } = useListedAutosStore();
  const { bikes, updateBike, deleteBike } = useListedBikesStore();
  const { getBookingById } = useBookingStore();

  const [vehicleId, setVehicleId] = useState<string | null>(null);
  const [vehicleSource, setVehicleSource] = useState<'vehicle' | 'car' | 'auto' | 'bike' | 'none'>('none');

  // ✅ Determine initial vehicle data
  const initialVehicleData: VehicleDetails = useMemo(() => {
    // Vehicle Store
    const storedVehicle = getVehicleByName(vehicleName || "");
    if (storedVehicle) {
      setVehicleId(storedVehicle.id);
      setVehicleSource("vehicle");
      return storedVehicle;
    }

    // Listed Cars
    const car = cars.find(c => c.carName === vehicleName);
    if (car) {
      setVehicleId(car.id);
      setVehicleSource("car");
      return {
        id: car.id,
        name: car.carName,
        price: car.rentPrice,
        transmission: car.transmission,
        seats: "5 Seaters",
        fuel: car.fuel,
        ac: car.acAvailable,
        rating: car.rating?.toString() || "4.0",
        image: car.photos[0] || BlackCar,
        description: car.description,
        location: {
          state: car.state,
          district: car.state,
          city: car.city,
          pincode: car.pincode,
          street: car.street,
        },
        documents: {
          drivingLicense: car.drivingLicense,
          aadharCard: car.aadharCard,
          depositVehicle: car.depositVehicle,
          depositMoney: car.depositMoney,
        },
        createdAt: Date.now(),
      };
    }

    // Listed Autos
    const auto = autos.find(a => `Auto ${a.vehicleNumber}` === vehicleName);
    if (auto) {
      setVehicleId(auto.id);
      setVehicleSource("auto");
      return {
        id: auto.id,
        name: `Auto ${auto.vehicleNumber}`,
        price: auto.farePrice,
        transmission: "Manual",
        seats: "3 Seaters",
        fuel: "CNG",
        ac: false,
        rating: auto.rating?.toString() || "4.0",
        image: auto.photos[0] || BlackCar,
        description: auto.description || "Auto rickshaw available for rent.",
        location: {
          state: "Andhra Pradesh",
          district: "East Godavari",
          city: auto.ownerName,
          pincode: "533001",
          street: "",
        },
        documents: {
          drivingLicense: false,
          aadharCard: false,
          depositVehicle: false,
          depositMoney: "0",
        },
        createdAt: Date.now(),
      };
    }

    // Listed Bikes
    const bike = bikes.find(b => b.vehicleName === vehicleName);
    if (bike) {
      setVehicleId(bike.id);
      setVehicleSource("bike");
      return {
        id: bike.id,
        name: bike.vehicleName,
        price: bike.farePrice,
        transmission: bike.transmission || "Manual",
        seats: "2 Seaters",
        fuel: bike.fuel || "Petrol",
        ac: false,
        rating: bike.rating?.toString() || "4.0",
        image: bike.photos[0] || BlackCar,
        description: bike.description || "",
        location: {
          state: bike.state || "",
          district: bike.state || "",
          city: bike.city || "",
          pincode: bike.pincode || "",
          street: bike.street || "",
        },
        documents: {
          drivingLicense: bike.drivingLicense ?? false,
          aadharCard: bike.aadharCard ?? false,
          depositVehicle: bike.depositVehicle ?? false,
          depositMoney: bike.depositMoney || "0",
        },
        createdAt: bike.createdAt ? new Date(bike.createdAt).getTime() : Date.now(),
      };
    }

    // Default fallback
    return {
      id: Date.now().toString(),
      name: vehicleName || "Hyundai Verna",
      price: "250",
      transmission: "Automatic",
      seats: "5 Seaters",
      fuel: "Petrol",
      ac: true,
      rating: "4.2",
      image: BlackCar,
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      location: {
        state: "Andhra Pradesh",
        district: "East Godavari",
        city: "Kakinada",
        pincode: "533001",
        street: "Gandhi Nagar",
      },
      documents: {
        drivingLicense: true,
        aadharCard: true,
        depositVehicle: true,
        depositMoney: "10000",
      },
      createdAt: Date.now(),
    };
  }, [vehicleName, getVehicleByName, cars, autos, bikes]);

  const [vehicleData, setVehicleData] = useState<VehicleDetails>(initialVehicleData);

  useEffect(() => {
    setVehicleData(initialVehicleData);
  }, [initialVehicleData]);

  // ✅ Handlers
  const handleInputChange = (field: keyof VehicleDetails, value: any) =>
    setVehicleData(prev => ({ ...prev, [field]: value }));

  const handleLocationChange = (field: keyof VehicleDetails["location"], value: string) =>
    setVehicleData(prev => ({ ...prev, location: { ...prev.location, [field]: value } }));

  const handleDocumentChange = (field: keyof VehicleDetails["documents"], value: any) =>
    setVehicleData(prev => ({ ...prev, documents: { ...prev.documents, [field]: value } }));

  const handleSave = () => {
    if (vehicleSource === "vehicle" && vehicleId) {
      updateVehicle(vehicleId, vehicleData);
    } else if (vehicleSource === "car" && vehicleId) {
      updateCar(vehicleId, {
        carName: vehicleData.name,
        rentPrice: vehicleData.price,
        transmission: vehicleData.transmission,
        fuel: vehicleData.fuel,
        acAvailable: vehicleData.ac,
        description: vehicleData.description,
        state: vehicleData.location.state,
        city: vehicleData.location.city,
        pincode: vehicleData.location.pincode,
        street: vehicleData.location.street,
        drivingLicense: vehicleData.documents.drivingLicense,
        aadharCard: vehicleData.documents.aadharCard,
        depositVehicle: vehicleData.documents.depositVehicle,
        depositMoney: vehicleData.documents.depositMoney,
      });
    } else if (vehicleSource === "auto" && vehicleId) {
      updateAuto(vehicleId, {
        farePrice: vehicleData.price,
        description: vehicleData.description,
      });
    } else if (vehicleSource === "bike" && vehicleId) {
      updateBike(vehicleId, {
        vehicleName: vehicleData.name,
        farePrice: vehicleData.price,
        transmission: vehicleData.transmission,
        fuel: vehicleData.fuel,
        description: vehicleData.description,
        state: vehicleData.location.state,
        city: vehicleData.location.city,
        pincode: vehicleData.location.pincode,
        street: vehicleData.location.street,
        drivingLicense: vehicleData.documents.drivingLicense,
        aadharCard: vehicleData.documents.aadharCard,
        depositVehicle: vehicleData.documents.depositVehicle,
        depositMoney: vehicleData.documents.depositMoney,
      });
    } else {
      addVehicle({
        ...vehicleData,
        type: (vehicleSource === 'none' ? 'car' : vehicleSource) as 'car' | 'auto' | 'bike',
      });
    }

    alert("Vehicle details saved successfully!");
    navigate(-1);
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

    if (vehicleSource === "vehicle" && vehicleId) deleteVehicle(vehicleId);
    else if (vehicleSource === "car" && vehicleId) deleteCar(vehicleId);
    else if (vehicleSource === "auto" && vehicleId) deleteAuto(vehicleId);
    else if (vehicleSource === "bike" && vehicleId) deleteBike(vehicleId);

    alert("Vehicle deleted successfully!");
    navigate("/listed");
  };

  const handleAddPhoto = () => {
    alert("Add photo functionality — file picker would open here.");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Edit Vehicle Details</h1>

      {/* Example Input */}
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          className="border p-2 w-full"
          value={vehicleData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          className="border p-2 w-full"
          value={vehicleData.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
        />
      </div>

      {/* Add more inputs as needed for transmission, fuel, etc. */}

      <div className="flex gap-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditCarDetails;
