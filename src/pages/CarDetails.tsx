// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import BlackCar from "../assets/images/BlackCar.png";
// import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
// import DriverLogo from "../assets/icons/DriverLogo.png";
// import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
// interface VehicleDetails {
//   name: string;
//   price: string;
//   rating: string;
//   transmission: string;
//   seats: string;
//   fuel: string;
//   ac: string;
//   image: string;
//   description: string;
//   ownerName: string;
//   mobile: string;
//   email: string;
//   city?: string;
//   street?: string;
//   pincode?: string;
//   doorName?: string;
//   id?: string;
// }
 
 
// const defaultVehicle: VehicleDetails = {
//   name: "Hyundai Verna",
//   price: "250",
//   rating: "4.2",
//   transmission: "Automatic",
//   seats: "5 Seaters",
//   fuel: "Petrol",
//   ac: "AC",
//   image: BlackCar,
//   description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//   ownerName: "Manoj Kumar",
//   mobile: "1234567898",
//   email: "owner@example.com",
//   city: "",
//   street: "",
//   pincode: "",
//   doorName: "",
// };
 
// const CarDetails: React.FC = () => {
//   const navigate = useNavigate();
//   const { vehicleName } = useParams<{ vehicleName: string }>();
//   const location = useLocation();
 
//   // If ListedCars navigates here with state: { carData, openEditForm: true }
//   const { carData, openEditForm } = (location && (location as any).state) || {};
 
//   // left image carousel state
//   const vehicleImages = [BlackCar, BlackCar, BlackCar, BlackCar];
//   const [currentImage, setCurrentImage] = useState(0);
 
//   // edit form open by default (right side)
//   const [editOpen, setEditOpen] = useState<boolean>(true);
 
//   // Edit form model (prefilled from navigation state or default)
//   const [editVehicle, setEditVehicle] = useState<VehicleDetails>(defaultVehicle);
 
 
 
 
 
 
 
 
//   // price / hour picker state
//   const [price, setPrice] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedHour, setSelectedHour] = useState<string | null>(null);
//   const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);
 
//   // image upload
//   const [carImage, setCarImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
 
//   // Availability modal (kept if you want to use)
//   const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
 
//   useEffect(() => {
//     // If caller provided carData (from ListedCars) then populate the form
//     if (carData) {
//       // Normalize shape: carData might use different keys; try common ones
//       const mapped: VehicleDetails = {
//         ...defaultVehicle,
//         name: (carData.name || carData.carName || defaultVehicle.name) as string,
//         price: (carData.price || carData.rentPrice || defaultVehicle.price) as string,
//         rating: (carData.rating?.toString && carData.rating.toString()) || defaultVehicle.rating,
//         transmission: (carData.transmission || defaultVehicle.transmission) as string,
//         seats: (carData.seats || defaultVehicle.seats) as string,
//         fuel: (carData.fuel || defaultVehicle.fuel) as string,
//         ac: (carData.ac || defaultVehicle.ac) as string,
//         image: (carData.image || carData.photos?.[0] || defaultVehicle.image) as string,
//         description: (carData.description || defaultVehicle.description) as string,
//         ownerName: (carData.ownerName || defaultVehicle.ownerName) as string,
//         mobile: (carData.mobile || defaultVehicle.mobile) as string,
//         email: (carData.email || defaultVehicle.email) as string,
 
//         id: carData.id || undefined,
//       };
//       setEditVehicle(mapped);
//       // prefill address fields & preview
   
//       setPreview(mapped.image || null);
//     }
   
 
//     // If the navigation asked to open edit form, ensure it's open
//     if (openEditForm) {
//       setEditOpen(true);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [carData, openEditForm]);
 
//   // Generic handler for inputs
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setEditVehicle((prev) => ({ ...prev, [name]: value }));
//   };
 
//   const handleSelectHour = (hour: string) => {
//     setSelectedHour(hour);
//     setIsModalOpen(false);
//   };
 
//   const handleCarImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setCarImage(file);
//       setPreview(URL.createObjectURL(file));
//       // optionally set editVehicle.image to preview URL (not persistent)
//       setEditVehicle((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
//     }
//   };
 
//   const renderToggle = (state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>) => (
//     <button
//       onClick={() => setState(!state)}
//       className={`w-12 h-6 rounded-full relative flex items-center transition-colors duration-300 ${
//         state ? "bg-green-500" : "bg-gray-300"
//       }`}
//       type="button"
//     >
//       <span
//         className={`absolute w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
//           state ? "translate-x-6" : "translate-x-0.5"
//         }`}
//       />
//     </button>
//   );
 
//   const handleSave = () => {
//     // Implement save logic (API call / store update)
//     console.log("Saving vehicle:", editVehicle);
//     alert("Vehicle saved (mock)");
//   };
 
//   const handleDelete = () => {
//     // Implement delete logic
//     const confirmDelete = window.confirm("Delete this vehicle?");
//     if (confirmDelete) {
//       alert("Vehicle deleted (mock)");
//       navigate(-1);
//     }
//   };
 
//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6">
//       <div className="max-w-[1228px] mx-auto flex flex-col md:flex-row gap-10">
//         {/* --- Left: Vehicle images + summary --- */}
//         <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Image carousel */}
//             <div className="relative w-full md:w-[420px] h-[320px] rounded-xl overflow-hidden shadow-md">
//               <img
//                 src={preview || editVehicle.image || BlackCar}
//                 alt={`${editVehicle.name} ${currentImage + 1}`}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                 {vehicleImages.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrentImage(idx)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentImage ? "bg-white" : "bg-gray-400"}`}
//                     type="button"
//                   />
//                 ))}
//               </div>
//             </div>
 
//             {/* Summary */}
//             <div className="flex-1">
//               <div className="flex items-center justify-between">
//                 <h1 className="text-3xl font-semibold">{editVehicle.name}</h1>
//                 <div className="bg-yellow-100 px-3 py-1 rounded-md">
//                   <span className="text-sm font-semibold text-yellow-800">★ {editVehicle.rating}</span>
//                 </div>
//               </div>
 
//               <div className="flex items-baseline mt-2">
//                 <span className="text-3xl font-bold">₹{editVehicle.price}</span>
//                 <span className="text-gray-500 ml-2 text-sm">/hr</span>
//               </div>
 
//               <div className="flex items-center mt-6 border border-gray-300 rounded-xl overflow-hidden">
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
//                     <img src={AutomaticLogo} alt="Auto" className="w-6 h-6" />
//                   </div>
//                   <p className="text-sm text-gray-700">{editVehicle.transmission}</p>
//                 </div>
 
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
//                     <img src={DriverLogo} alt="Seats" className="w-6 h-6" />
//                   </div>
//                   <p className="text-sm text-gray-700">{editVehicle.seats}</p>
//                 </div>
 
//                 <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
//                   <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">⛽</div>
//                   <p className="text-sm text-gray-700">{editVehicle.fuel}</p>
//                 </div>
 
//                 <div className="flex flex-col items-center px-4 py-3">
//                   <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">❄️</div>
//                   <p className="text-sm text-gray-700">{editVehicle.ac}</p>
//                 </div>
//               </div>
 
//               <div className="mt-6">
//                 <h2 className="text-xl font-semibold mb-2">Description</h2>
//                 <p className="text-gray-600 text-sm leading-relaxed">{editVehicle.description}</p>
//               </div>
//             </div>
//           </div>
//         </div>
 
//         {/* --- Right: Edit form (sticky) --- */}
//         <aside className="md:w-[380px]">
//           <div className="sticky top-6 bg-white p-6 rounded-2xl shadow-lg">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-semibold">Edit Car Details</h2>
//               <button
//                 onClick={() => setEditOpen((s) => !s)}
//                 className="text-sm text-gray-500"
//                 type="button"
//               >
//                 {editOpen ? "Hide" : "Open"}
//               </button>
//             </div>
 
//             {editOpen && (
//               <div className="space-y-4">
//                  <div>
//                   <label className="block text-gray-700 font-medium mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={editVehicle.description}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none"
//                     placeholder="Enter car description..."
//                   />
//                 </div>
               
//                 {/* Vehicle name */}
//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Vehicle Name</label>
//                   <input
//                  name="name"
//                     value={editVehicle.name}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg p-2"
//                   />
//                 </div>
 
//                     {/* Rent Price and Hour Box */}
//               <div className="text-gray-700 font-semibold text-xl mt-0">Price</div>
//               <div className="flex items-center mt-2 space-x-2">
//                 <div className="w-[280px] h-[47px] border-2 border-gray-400 rounded-md p-1 flex flex-col justify-center relative mt-0.5">
//                   <span className="absolute -top-2 left-2 bg-white px-1 text-gray-500 text-sm ">Rent Price(Per Hour/Per Day)</span>
//                   <input
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     placeholder="Enter price"
//                     className="font-semibold text-gray-800 text-lg mt-1 outline-none bg-transparent w-full px-2"
//                   />
//                 </div>
 
//                 <div
//                   className="w-[82px] h-[48px] border-2 border-gray-400 rounded-md flex items-center justify-between px-3 cursor-pointer"
//                   onClick={() => setIsModalOpen(true)}
//                 >
//                   <span className="text-gray-800 font-medium text-sm">
//                     {selectedHour || "Hour"}
//                   </span>
//                   <svg
//                     className="w-4 h-4 text-gray-600"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </div>
 
//               {/* Hour Modal */}
//               {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//                   <div className="bg-white rounded-lg p-4 w-[200px] max-h-[37px] overflow-y-auto shadow-lg">
//                     <h2 className="text-gray-800 text-lg font-semibold mb-3 text-center">Select Hour</h2>
//                     <div className="grid grid-cols-3 gap-2">
//                       {hours.map((hour) => (
//                         <button
//                           key={hour}
//                           onClick={() => handleSelectHour(hour)}
//                           className="border border-gray-300 rounded-md py-2 hover:bg-blue-100 transition"
//                         >
//                           {hour}
//                         </button>
//                       ))}
//                     </div>
//                     <button
//                       onClick={() => setIsModalOpen(false)}
//                       className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               )}
//               <div className="relative w-[280px] h-[47px] border-2 border-gray-400 rounded-md p-1 flex flex-col justify-center mt-0.5">
//   {/* Floating Label */}
//   <span className="absolute -top-2 left-2 bg-white px-1 text-gray-500 text-sm">
//     KM/HOUR
//   </span>
 
//   {/* Input Field */}
//   <input
//     type="text"
//     placeholder="KM/HOUR : MINS"
//     className="font-semibold text-gray-800 text-lg mt-1 outline-none bg-transparent w-full px-2 placeholder-gray-400"
//   />
// </div>
 
//                 {/* Contact info */}
//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Owner Name</label>
//                   <input
//                     name="ownerName"
//                     value={editVehicle.ownerName}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg p-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
//                   <input
//                     name="mobile"
//                     value={editVehicle.mobile}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg p-2"
//                   />
//                 </div>
//                 <div className="flex items-center justify-between w-[343px] mt-1">
 
// </div>
 
 
//                 {/* Car Image Upload */}
//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">Car Image</label>
//                   <div className="w-full h-[180px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center relative bg-gray-50">
//                     {preview ? (
//                       <img src={preview} alt="Car Preview" className="w-full h-full object-cover rounded-md" />
//                     ) : (
//                       <div className="flex flex-col items-center justify-center text-gray-500">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
//                         </svg>
//                         <p>Click to upload car photo</p>
//                       </div>
//                     )}
//                     <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleCarImageChange} />
//                   </div>
//                 </div>
 
//                 {/* Action buttons */}
//                 <div className="flex gap-3 pt-3">
//                   <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
//                     Save
//                   </button>
//                   <button onClick={handleDelete} className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg">
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </aside>
 
//         {/* Hour selection modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//             <div className="bg-white rounded-lg p-4 w-[280px]">
//               <h3 className="text-lg font-semibold mb-3 text-center">Select Hour</h3>
//               <div className="grid grid-cols-3 gap-2">
//                 {hours.map((h) => (
//                   <button key={h} onClick={() => handleSelectHour(h)} className="py-2 border rounded text-sm">
//                     {h}
//                   </button>
//                 ))}
//               </div>
//               <div className="mt-4">
//                 <button onClick={() => setIsModalOpen(false)} className="w-full py-2 bg-red-500 text-white rounded">
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
 
//         {/* Availability modal (kept optional) */}
//         {isDateTimeModalOpen && (
//           <AvailabilityDateTimeModal
//             isOpen={isDateTimeModalOpen}
//             onClose={() => setIsDateTimeModalOpen(false)}
//             onConfirm={() => setIsDateTimeModalOpen(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };
 
// export default CarDetails;
 
 import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import apiService from "../services/api.service";
import BlackCar from "../assets/images/BlackCar.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";

const { car: carAPI, availability: availabilityAPI } = apiService;

interface CarDetails {
  _id?: string;
  userId?: string;
  CarNumber?: string;
  CarName?: string;
  CarModel?: string;
  CarBrand?: string;
  description?: string;
  RentPerHour?: number | string;
  RentPerDay?: number | string;
  contactNumber?: string;
  contactName?: string;
  pickupLatitude?: string;
  pickupLongitude?: string;
  pickupArea?: string;
  pickupCity?: string;
  pickupCityPinCode?: string;
  pickupCityState?: string;
  pickupCityCountry?: string;
  Carseater?: string;
  fuelType?: string;
  transmissionType?: string;
  kmDriven?: number | string;
  Ac_available?: boolean;
  gps?: boolean;
  drivingLicenseRequired?: boolean;
  AadharCardRequired?: boolean;
  DepositAmount?: number | string;
  DepositVehicle?: boolean;
  carImages?: string | string[];
  Available?: boolean;
}

const defaultCar: CarDetails = {
  CarName: "",
  CarModel: "",
  CarBrand: "",
  RentPerHour: 0,
  RentPerDay: 0,
  description: "",
  contactName: "",
  contactNumber: "",
  CarNumber: "",
  pickupArea: "",
  pickupCity: "",
  pickupCityPinCode: "",
  pickupCityState: "",
  pickupCityCountry: "India",
  pickupLatitude: "",
  pickupLongitude: "",
  Carseater: "5",
  fuelType: "Petrol",
  transmissionType: "Automatic",
  kmDriven: 0,
  Ac_available: true,
  gps: false,
  drivingLicenseRequired: true,
  AadharCardRequired: true,
  DepositAmount: 0,
  DepositVehicle: false,
  carImages: "",
  Available: true,
};

const CarDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { carData } = (location.state as any) || {};

  const [car, setCar] = useState<CarDetails>(defaultCar);
  const [rentPerHour, setRentPerHour] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [carImage, setCarImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [editOpen, setEditOpen] = useState(true);

  // Image carousel
  const vehicleImages = [BlackCar, BlackCar, BlackCar, BlackCar];
  const [currentImage, setCurrentImage] = useState(0);

  // Hour picker
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

  // Availability modal
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);

  const FIXED_USER_ID = "68f32259cea8a9fa88029262";

  useEffect(() => {
    if (carData) {
      const mapped: CarDetails = {
        _id: carData._id || carData.id,
        userId: carData.userId || FIXED_USER_ID,
        CarNumber: carData.CarNumber || carData.carNumber || "",
        CarName: carData.CarName || carData.carName || carData.name || "",
        CarModel: carData.CarModel || carData.carModel || "",
        CarBrand: carData.CarBrand || carData.carBrand || "",
        description: carData.description || "",
        RentPerHour: carData.RentPerHour || carData.rentPerHour || 0,
        RentPerDay: carData.RentPerDay || carData.rentPerDay || 0,
        contactNumber: carData.contactNumber || "",
        contactName: carData.contactName || "",
        pickupLatitude: carData.pickupLatitude || carData.latitude || "",
        pickupLongitude: carData.pickupLongitude || carData.longitude || "",
        pickupArea: carData.pickupArea || "",
        pickupCity: carData.pickupCity || "",
        pickupCityPinCode: carData.pickupCityPinCode || "",
        pickupCityState: carData.pickupCityState || "",
        pickupCityCountry: carData.pickupCityCountry || "India",
        Carseater: carData.Carseater || carData.seats || "5",
        fuelType: carData.fuelType || carData.fuel || "Petrol",
        transmissionType: carData.transmissionType || carData.transmission || "Automatic",
        kmDriven: carData.kmDriven || 0,
        Ac_available: carData.Ac_available ?? carData.ac ?? true,
        gps: carData.gps ?? false,
        drivingLicenseRequired: carData.drivingLicenseRequired ?? true,
        AadharCardRequired: carData.AadharCardRequired ?? true,
        DepositAmount: carData.DepositAmount || 0,
        DepositVehicle: carData.DepositVehicle ?? false,
        carImages: carData.carImages?.[0] || carData.image || carData.photos?.[0] || "",
        Available: carData.Available ?? true,
      };

      setCar(mapped);
      setRentPerHour(mapped.RentPerHour?.toString() || "0");
      setRentPerDay(mapped.RentPerDay?.toString() || "0");
      setPreview(
        typeof mapped.carImages === "string"
          ? mapped.carImages
          : mapped.carImages?.[0] || null
      );
      setIsAvailable(mapped.Available ?? true);
    }
  }, [carData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCarImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSelectHour = (hour: string) => {
    setSelectedHour(hour);
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    if (!car._id) return alert("❌ No Car ID found. Cannot update.");

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", FIXED_USER_ID);
      formData.append("CarNumber", car.CarNumber || "");
      formData.append("CarName", car.CarName || "");
      formData.append("CarModel", car.CarModel || "");
      formData.append("CarBrand", car.CarBrand || "");
      formData.append("description", car.description || "");
      formData.append("RentPerHour", rentPerHour || "0");
      formData.append("RentPerDay", rentPerDay || "0");
      formData.append("contactNumber", car.contactNumber || "");
      formData.append("contactName", car.contactName || "");
      formData.append("pickupLatitude", car.pickupLatitude || "");
      formData.append("pickupLongitude", car.pickupLongitude || "");
      formData.append("pickupArea", car.pickupArea || "");
      formData.append("pickupCity", car.pickupCity || "");
      formData.append("pickupCityPinCode", car.pickupCityPinCode || "");
      formData.append("pickupCityState", car.pickupCityState || "");
      formData.append("pickupCityCountry", car.pickupCityCountry || "India");
      formData.append("Carseater", car.Carseater || "5");
      formData.append("fuelType", car.fuelType || "Petrol");
      formData.append("transmissionType", car.transmissionType || "Automatic");
      formData.append("kmDriven", car.kmDriven?.toString() || "0");
      formData.append("Ac_available", String(car.Ac_available ?? true));
      formData.append("gps", String(car.gps ?? false));
      formData.append("drivingLicenseRequired", String(car.drivingLicenseRequired ?? true));
      formData.append("AadharCardRequired", String(car.AadharCardRequired ?? true));
      formData.append("DepositAmount", car.DepositAmount?.toString() || "0");
      formData.append("DepositVehicle", String(car.DepositVehicle ?? false));

      if (carImage) formData.append("carImages", carImage);

      const response: any = await carAPI.updateCarById(car._id, formData);
      
      console.log("📦 Update response:", response);
      
      const updatedCar = response?.car || response?.data?.car || response;

      if (updatedCar && updatedCar._id) {
        setCar(updatedCar);
        setRentPerHour(updatedCar.RentPerHour?.toString() || "0");
        setRentPerDay(updatedCar.RentPerDay?.toString() || "0");
        
        if (updatedCar.carImages && updatedCar.carImages.length > 0) {
          setPreview(updatedCar.carImages[0]);
        }
        
        alert("✅ Car updated successfully!");

        navigate("/listed-cars", {
          state: { refresh: true, updatedCar, timestamp: Date.now() },
        });
      } else {
        throw new Error("Invalid response structure from server");
      }
    } catch (error: any) {
      console.error("Error updating car:", error);
      alert(`❌ Error updating car: ${error.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!car._id) return alert("❌ No Car ID found. Cannot delete.");
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    setIsLoading(true);
    try {
      await carAPI.deleteCarById(car._id);
      alert("✅ Car deleted successfully!");
      navigate("/listed-cars", { state: { refresh: true }, replace: true });
    } catch (error: any) {
      console.error("Error deleting car:", error);
      alert(`❌ Error deleting car: ${error.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvailabilityToggle = async () => {
    if (!car._id) return alert("❌ No Car ID found.");

    setAvailabilityLoading(true);
    try {
      if (isAvailable) {
        await availabilityAPI.createUnavailability({
          VechileId: car._id,
          vechileType: "Car",
          fromDate: new Date().toISOString().split("T")[0],
          toDate: new Date().toISOString().split("T")[0],
          fromTime: "00:00",
          toTime: "23:59",
          isNotAvailable: true,
        });
      } else {
        await availabilityAPI.updateUnavailability(car._id, {
          VechileId: car._id,
          vechileType: "Car",
          isNotAvailable: false,
        });
      }

      setIsAvailable(!isAvailable);
      alert(
        isAvailable
          ? "🚫 Car marked as Not Available"
          : "✅ Car marked as Available"
      );
    } catch (error) {
      console.error("Availability toggle error:", error);
      alert("❌ Failed to update availability status.");
    } finally {
      setAvailabilityLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-[1228px] mx-auto flex flex-col md:flex-row gap-10">
        {/* Left section: Image + Basic Info */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-[420px] h-[320px] rounded-xl overflow-hidden shadow-md">
              <img
             src={preview || (typeof car.carImages === 'string' ? car.carImages : car.carImages?.[0]) || BlackCar}
                alt={`${car.CarName} ${currentImage + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {vehicleImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentImage ? "bg-white" : "bg-gray-400"
                    }`}
                    type="button"
                  />
                ))}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold">{car.CarName}</h1>
                <div className="bg-yellow-100 px-3 py-1 rounded-md">
                  <span className="text-sm font-semibold text-yellow-800">★ 4.5</span>
                </div>
              </div>

              <div className="flex items-baseline mt-2">
                <span className="text-3xl font-bold">₹{rentPerHour}</span>
                <span className="text-gray-500 ml-2 text-sm">/hr</span>
                <span className="text-gray-400 ml-4">or</span>
                <span className="text-2xl font-semibold ml-2">₹{rentPerDay}</span>
                <span className="text-gray-500 ml-2 text-sm">/day</span>
              </div>

              <div className="flex items-center mt-6 border border-gray-300 rounded-xl overflow-hidden">
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                    <img src={AutomaticLogo} alt="Auto" className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-gray-700">{car.transmissionType}</p>
                </div>

                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                    <img src={DriverLogo} alt="Seats" className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-gray-700">{car.Carseater} Seaters</p>
                </div>

                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">⛽</div>
                  <p className="text-sm text-gray-700">{car.fuelType}</p>
                </div>

                <div className="flex flex-col items-center px-4 py-3">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">❄️</div>
                  <p className="text-sm text-gray-700">{car.Ac_available ? "AC" : "Non-AC"}</p>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{car.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right section: Edit Form */}
        <aside className="md:w-[380px]">
          <div className="sticky top-6 bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Edit Car Details</h2>
              <button
                onClick={handleAvailabilityToggle}
                disabled={availabilityLoading}
                className={`px-4 py-2 rounded-full text-white font-medium transition ${
                  isAvailable
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {availabilityLoading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : isAvailable ? (
                  "Available"
                ) : (
                  "Not Available"
                )}
              </button>
            </div>

            {editOpen && (
              <div className="space-y-4">
                <textarea
                  name="description"
                  value={car.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full border border-gray-300 p-2 rounded h-24 resize-none"
                />

                <input
                  name="CarName"
                  value={car.CarName}
                  onChange={handleChange}
                  placeholder="Car Name"
                  className="w-full border border-gray-300 p-2 rounded"
                />

                <input
                  name="CarNumber"
                  value={car.CarNumber}
                  onChange={handleChange}
                  placeholder="Car Number"
                  className="w-full border border-gray-300 p-2 rounded"
                />

                <input
                  name="CarModel"
                  value={car.CarModel}
                  onChange={handleChange}
                  placeholder="Car Model"
                  className="w-full border border-gray-300 p-2 rounded"
                />

                <input
                  type="number"
                  value={rentPerHour}
                  onChange={(e) => setRentPerHour(e.target.value)}
                  placeholder="Rent Per Hour"
                  className="w-full border border-gray-300 p-2 rounded"
                />

                <input
                  type="number"
                  value={rentPerDay}
                  onChange={(e) => setRentPerDay(e.target.value)}
                  placeholder="Rent Per Day"
                  className="w-full border border-gray-300 p-2 rounded"
                />

                <input
                  name="contactName"
                  value={car.contactName}
                  onChange={handleChange}
                  placeholder="Owner Name"
                  className="w-full border border-gray-300 p-2 rounded"
                />

                <input
                  name="contactNumber"
                  value={car.contactNumber}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="w-full border border-gray-300 p-2 rounded"
                />

                <div>
                  <label className="text-gray-600 text-sm">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50"
                  >
                    {isLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Hour selection modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg p-4 w-[280px]">
              <h3 className="text-lg font-semibold mb-3 text-center">Select Hour</h3>
              <div className="grid grid-cols-3 gap-2">
                {hours.map((h) => (
                  <button
                    key={h}
                    onClick={() => handleSelectHour(h)}
                    className="py-2 border rounded text-sm hover:bg-blue-100"
                  >
                    {h}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2 bg-red-500 text-white rounded mt-4"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {isDateTimeModalOpen && (
          <AvailabilityDateTimeModal
            isOpen={isDateTimeModalOpen}
            onClose={() => setIsDateTimeModalOpen(false)}
            onConfirm={() => setIsDateTimeModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CarDetails;
 
 