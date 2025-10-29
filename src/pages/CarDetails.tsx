 
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BlackCar from "../assets/images/BlackCar.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
 
interface VehicleDetails {
  name: string;
  price: string;
  rating: string;
  transmission: string;
  seats: string;
  fuel: string;
  ac: string;
  image: string;
  description: string;
  ownerName: string;
  mobile: string;
  email: string;
  city?: string;
  street?: string;
  pincode?: string;
  doorName?: string;
  id?: string;
}
 
const defaultVehicle: VehicleDetails = {
  name: "Hyundai Verna",
  price: "250",
  rating: "4.2",
  transmission: "Automatic",
  seats: "5 Seaters",
  fuel: "Petrol",
  ac: "AC",
  image: BlackCar,
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  ownerName: "Manoj Kumar",
  mobile: "1234567898",
  email: "owner@example.com",
  city: "",
  street: "",
  pincode: "",
  doorName: "",
};
 
const CarDetails: React.FC = () => {
  const navigate = useNavigate();
  const { vehicleName } = useParams<{ vehicleName: string }>();
  const location = useLocation();
 
  // If ListedCars navigates here with state: { carData, openEditForm: true }
  const { carData, openEditForm } = (location && (location as any).state) || {};
 
  // left image carousel state
  const vehicleImages = [BlackCar, BlackCar, BlackCar, BlackCar];
  const [currentImage, setCurrentImage] = useState(0);
 
  // edit form open by default (right side)
  const [editOpen, setEditOpen] = useState<boolean>(true);
 
  // Edit form model (prefilled from navigation state or default)
  const [editVehicle, setEditVehicle] = useState<VehicleDetails>(defaultVehicle);
 
  // toggles & form fields
  const [drivingLicence, setDrivingLicence] = useState(false);
  const [aadhaarCard, setAadhaarCard] = useState(false);
  const [depositVehicle, setDepositVehicle] = useState(false);
  const [depositMoney, setDepositMoney] = useState(false);
  const [acAvailable, setAcAvailable] = useState(false);
 
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
 
  const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi"];
  const cities: { [key: string]: string[] } = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    Delhi: ["New Delhi", "Dwarka", "Rohini"],
  };
 
  // address fields
  const [pincode, setPincode] = useState("");
  const [street, setStreet] = useState("");
  const [doorName, setDoorName] = useState("");
 
  // price / hour picker state
  const [price, setPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);
 
  // image upload
  const [carImage, setCarImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
 
  // Availability modal (kept if you want to use)
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
 
  useEffect(() => {
    // If caller provided carData (from ListedCars) then populate the form
    if (carData) {
      // Normalize shape: carData might use different keys; try common ones
      const mapped: VehicleDetails = {
        ...defaultVehicle,
        name: (carData.name || carData.carName || defaultVehicle.name) as string,
        price: (carData.price || carData.rentPrice || defaultVehicle.price) as string,
        rating: (carData.rating?.toString && carData.rating.toString()) || defaultVehicle.rating,
        transmission: (carData.transmission || defaultVehicle.transmission) as string,
        seats: (carData.seats || defaultVehicle.seats) as string,
        fuel: (carData.fuel || defaultVehicle.fuel) as string,
        ac: (carData.ac || defaultVehicle.ac) as string,
        image: (carData.image || carData.photos?.[0] || defaultVehicle.image) as string,
        description: (carData.description || defaultVehicle.description) as string,
        ownerName: (carData.ownerName || defaultVehicle.ownerName) as string,
        mobile: (carData.mobile || defaultVehicle.mobile) as string,
        email: (carData.email || defaultVehicle.email) as string,
        city: (carData.city || carData.location?.split?.(",")?.[0] || defaultVehicle.city) as string,
        street: (carData.street || defaultVehicle.street) as string,
        pincode: (carData.pincode || defaultVehicle.pincode) as string,
        doorName: (carData.doorName || defaultVehicle.doorName) as string,
        id: carData.id || undefined,
      };
      setEditVehicle(mapped);
      // prefill address fields & preview
      setPincode(mapped.pincode || "");
      setStreet(mapped.street || "");
      setDoorName(mapped.doorName || "");
      setPreview(mapped.image || null);
    }
   
 
    // If the navigation asked to open edit form, ensure it's open
    if (openEditForm) {
      setEditOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carData, openEditForm]);
 
  // Generic handler for inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditVehicle((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSelectHour = (hour: string) => {
    setSelectedHour(hour);
    setIsModalOpen(false);
  };
 
  const handleCarImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCarImage(file);
      setPreview(URL.createObjectURL(file));
      // optionally set editVehicle.image to preview URL (not persistent)
      setEditVehicle((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };
 
  const renderToggle = (state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>) => (
    <button
      onClick={() => setState(!state)}
      className={`w-12 h-6 rounded-full relative flex items-center transition-colors duration-300 ${
        state ? "bg-green-500" : "bg-gray-300"
      }`}
      type="button"
    >
      <span
        className={`absolute w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
          state ? "translate-x-6" : "translate-x-0.5"
        }`}
      />
    </button>
  );
 
  const handleSave = () => {
    // Implement save logic (API call / store update)
    console.log("Saving vehicle:", editVehicle);
    alert("Vehicle saved (mock)");
  };
 
  const handleDelete = () => {
    // Implement delete logic
    const confirmDelete = window.confirm("Delete this vehicle?");
    if (confirmDelete) {
      alert("Vehicle deleted (mock)");
      navigate(-1);
    }
  };
 
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-[1228px] mx-auto flex flex-col md:flex-row gap-10">
        {/* --- Left: Vehicle images + summary --- */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image carousel */}
            <div className="relative w-full md:w-[420px] h-[320px] rounded-xl overflow-hidden shadow-md">
              <img
                src={preview || editVehicle.image || BlackCar}
                alt={`${editVehicle.name} ${currentImage + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {vehicleImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentImage ? "bg-white" : "bg-gray-400"}`}
                    type="button"
                  />
                ))}
              </div>
            </div>
 
            {/* Summary */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold">{editVehicle.name}</h1>
                <div className="bg-yellow-100 px-3 py-1 rounded-md">
                  <span className="text-sm font-semibold text-yellow-800">★ {editVehicle.rating}</span>
                </div>
              </div>
 
              <div className="flex items-baseline mt-2">
                <span className="text-3xl font-bold">₹{editVehicle.price}</span>
                <span className="text-gray-500 ml-2 text-sm">/hr</span>
              </div>
 
              <div className="flex items-center mt-6 border border-gray-300 rounded-xl overflow-hidden">
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                    <img src={AutomaticLogo} alt="Auto" className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-gray-700">{editVehicle.transmission}</p>
                </div>
 
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">
                    <img src={DriverLogo} alt="Seats" className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-gray-700">{editVehicle.seats}</p>
                </div>
 
                <div className="flex flex-col items-center px-4 py-3 border-r border-gray-300">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">⛽</div>
                  <p className="text-sm text-gray-700">{editVehicle.fuel}</p>
                </div>
 
                <div className="flex flex-col items-center px-4 py-3">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-1">❄️</div>
                  <p className="text-sm text-gray-700">{editVehicle.ac}</p>
                </div>
              </div>
 
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{editVehicle.description}</p>
              </div>
            </div>
          </div>
        </div>
 
        {/* --- Right: Edit form (sticky) --- */}
        <aside className="md:w-[380px]">
          <div className="sticky top-6 bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Edit Car Details</h2>
              <button
                onClick={() => setEditOpen((s) => !s)}
                className="text-sm text-gray-500"
                type="button"
              >
                {editOpen ? "Hide" : "Open"}
              </button>
            </div>
 
            {editOpen && (
              <div className="space-y-4">
                 <div>
                  <label className="block text-gray-700 font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={editVehicle.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none"
                    placeholder="Enter car description..."
                  />
                </div>
               
                {/* Vehicle name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Vehicle Name</label>
                  <input
                 name="name"
                    value={editVehicle.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
 
                    {/* Rent Price and Hour Box */}
              <div className="text-gray-700 font-semibold text-xl mt-0">Price</div>
              <div className="flex items-center mt-2 space-x-2">
                <div className="w-[280px] h-[47px] border-2 border-gray-400 rounded-md p-1 flex flex-col justify-center relative mt-0.5">
                  <span className="absolute -top-2 left-2 bg-white px-1 text-gray-500 text-sm ">Rent Price(Per Hour/Per Day)</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    className="font-semibold text-gray-800 text-lg mt-1 outline-none bg-transparent w-full px-2"
                  />
                </div>
 
                <div
                  className="w-[82px] h-[48px] border-2 border-gray-400 rounded-md flex items-center justify-between px-3 cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="text-gray-800 font-medium text-sm">
                    {selectedHour || "Hour"}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
 
              {/* Hour Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg p-4 w-[200px] max-h-[37px] overflow-y-auto shadow-lg">
                    <h2 className="text-gray-800 text-lg font-semibold mb-3 text-center">Select Hour</h2>
                    <div className="grid grid-cols-3 gap-2">
                      {hours.map((hour) => (
                        <button
                          key={hour}
                          onClick={() => handleSelectHour(hour)}
                          className="border border-gray-300 rounded-md py-2 hover:bg-blue-100 transition"
                        >
                          {hour}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <div className="relative w-[280px] h-[47px] border-2 border-gray-400 rounded-md p-1 flex flex-col justify-center mt-0.5">
  {/* Floating Label */}
  <span className="absolute -top-2 left-2 bg-white px-1 text-gray-500 text-sm">
    KM/HOUR
  </span>
 
  {/* Input Field */}
  <input
    type="text"
    placeholder="KM/HOUR : MINS"
    className="font-semibold text-gray-800 text-lg mt-1 outline-none bg-transparent w-full px-2 placeholder-gray-400"
  />
</div>
 
                {/* Contact info */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Owner Name</label>
                  <input
                    name="ownerName"
                    value={editVehicle.ownerName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
 
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
                  <input
                    name="mobile"
                    value={editVehicle.mobile}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div className="flex items-center justify-between w-[343px] mt-1">
  {/* Heading */}
  <div className="text-gray-700 font-semibold text-lg">
     AC Available
  </div>
 
  {/* Toggle Button */}
  <button
    onClick={() => setAcAvailable(!acAvailable)}
    className={`w-12 h-6 rounded-full relative flex items-center transition-colors duration-300 ${
      acAvailable ? "bg-green-500" : "bg-gray-300"
    }`}
  >
    <span
      className={`absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
        acAvailable ? "translate-x-6" : "translate-x-1"
      }`}
    ></span>
  </button>
</div>
 
                {/* Document toggles */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Driving Licence</span>
                    {renderToggle(drivingLicence, setDrivingLicence)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Aadhaar Card</span>
                    {renderToggle(aadhaarCard, setAadhaarCard)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Deposit Vehicle</span>
                    {renderToggle(depositVehicle, setDepositVehicle)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Deposit Money (₹5000)</span>
                    {renderToggle(depositMoney, setDepositMoney)}
                  </div>
                </div>
 
                {/* Vehicle Picking Address */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">State</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setStateOpen((s) => !s)}
                      className="w-full text-left border border-gray-300 rounded-lg p-2"
                    >
                      {selectedState || "Select State"}
                    </button>
                    {stateOpen && (
                      <div className="absolute z-20 w-full bg-white border border-gray-200 rounded mt-1 max-h-40 overflow-y-auto">
                        {states.map((s) => (
                          <div
                            key={s}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setSelectedState(s);
                              setSelectedCity(null);
                              setStateOpen(false);
                            }}
                          >
                            {s}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
 
                <div>
                  <label className="block text-gray-700 font-medium mb-2">City</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => selectedState && setCityOpen((s) => !s)}
                      className="w-full text-left border border-gray-300 rounded-lg p-2"
                    >
                      {selectedCity || "Select City"}
                    </button>
                    {cityOpen && selectedState && (
                      <div className="absolute z-20 w-full bg-white border border-gray-200 rounded mt-1 max-h-40 overflow-y-auto">
                        {cities[selectedState].map((c) => (
                          <div
                            key={c}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setSelectedCity(c);
                              setCityOpen(false);
                            }}
                          >
                            {c}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
 
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Pincode</label>
                  <input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Pincode"
                  />
                </div>
 
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Street</label>
                  <input
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Street"
                  />
                </div>
 
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Door Name</label>
                  <input
                    value={doorName}
                    onChange={(e) => setDoorName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Door Name"
                  />
                </div>
 
                {/* Car Image Upload */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Car Image</label>
                  <div className="w-full h-[180px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center relative bg-gray-50">
                    {preview ? (
                      <img src={preview} alt="Car Preview" className="w-full h-full object-cover rounded-md" />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                        <p>Click to upload car photo</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleCarImageChange} />
                  </div>
                </div>
 
                {/* Action buttons */}
                <div className="flex gap-3 pt-3">
                  <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                    Save
                  </button>
                  <button onClick={handleDelete} className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg">
                    Delete
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
                  <button key={h} onClick={() => handleSelectHour(h)} className="py-2 border rounded text-sm">
                    {h}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <button onClick={() => setIsModalOpen(false)} className="w-full py-2 bg-red-500 text-white rounded">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
 
        {/* Availability modal (kept optional) */}
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
 
 