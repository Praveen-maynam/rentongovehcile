import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, LocateFixed } from "lucide-react";
import { useLocation } from "../store/location.context";

interface LocationOption {
  city: string;
  country: string;
}

const ChangeLocation: React.FC = () => {
  const navigate = useNavigate();
  const { currentCity, currentCountry, setLocation } = useLocation();
  const [country, setCountry] = useState(currentCountry);
  const [city, setCity] = useState(currentCity);
  const [locations] = useState<LocationOption[]>([
    { country: "India", city: "Kakinada" },
    { country: "India", city: "Hyderabad" },
    { country: "India", city: "Vizag" },
  ]);

  const handleSave = () => {
    if (city && country) {
      setLocation(city, country);
      
      navigate(-1); // Go back to previous page
    } else {
      alert("Please select both country and city");
    }
  };

  const handleLocationSelect = (selectedCity: string, selectedCountry: string) => {
    setCity(selectedCity);
    setCountry(selectedCountry);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Change Location</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Map placeholder */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_placeholder.png"
            alt="Map"
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Right: Location form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Change Location</h2>
          <div className="flex gap-4 mb-6">
            <select
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-200"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>

            <select
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-200"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select City</option>
              <option value="Kakinada">Kakinada</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Vizag">Vizag</option>
            </select>

            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
              <LocateFixed className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="divide-y border-t border-b">
            {locations.map((loc, i) => (
              <div 
                key={i} 
                className={`flex items-center py-3 gap-3 cursor-pointer hover:bg-gray-50 rounded-md px-2 ${
                  city === loc.city ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => handleLocationSelect(loc.city, loc.country)}
              >
                <MapPin className={`${city === loc.city ? 'text-blue-600' : 'text-gray-600'}`} />
                <span className={`${city === loc.city ? 'text-blue-800 font-medium' : 'text-gray-800'}`}>
                  {loc.city}, {loc.country}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="mt-6 w-full bg-gradient-to-r from-blue-900 to-blue-400 text-white py-2 rounded-md font-medium hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeLocation;
