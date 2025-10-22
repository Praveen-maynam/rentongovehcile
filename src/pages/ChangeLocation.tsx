import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, LocateFixed, Loader2 } from "lucide-react";
import { useLocation } from "../store/location.context";
import LocationMap from "../components/LocationMap";

interface LocationOption {
  city: string;
  country: string;
  coordinates?: { lat: number; lng: number };
}

const ChangeLocation: React.FC = () => {
  const navigate = useNavigate();
  const { currentCity, currentCountry, setLocation } = useLocation();
  const [country, setCountry] = useState(currentCountry);
  const [city, setCity] = useState(currentCity);
  const [isDetecting, setIsDetecting] = useState(false);
  const [locations] = useState<LocationOption[]>([
    { country: "India", city: "Kakinada", coordinates: { lat: 16.9891, lng: 82.2475 } },
    { country: "India", city: "Hyderabad", coordinates: { lat: 17.3850, lng: 78.4867 } },
    { country: "India", city: "Vizag", coordinates: { lat: 17.6868, lng: 83.2185 } },
    { country: "India", city: "Mumbai", coordinates: { lat: 19.0760, lng: 72.8777 } },
    { country: "India", city: "Delhi", coordinates: { lat: 28.7041, lng: 77.1025 } },
    { country: "India", city: "Bangalore", coordinates: { lat: 12.9716, lng: 77.5946 } },
    { country: "India", city: "Chennai", coordinates: { lat: 13.0827, lng: 80.2707 } },
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

  const handleDetectLocation = () => {
    setIsDetecting(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Find closest location from database
          let closestLocation = locations[0];
          let minDistance = Infinity;

          locations.forEach(loc => {
            if (loc.coordinates) {
              const distance = Math.sqrt(
                Math.pow(loc.coordinates.lat - latitude, 2) +
                Math.pow(loc.coordinates.lng - longitude, 2)
              );
              if (distance < minDistance) {
                minDistance = distance;
                closestLocation = loc;
              }
            }
          });

          setCountry(closestLocation.country);
          setCity(closestLocation.city);
          setIsDetecting(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to detect your location. Please enable location services or select manually.");
          setIsDetecting(false);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setIsDetecting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Change Location</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Dynamic Interactive Map */}
        <div className="rounded-lg overflow-hidden shadow-md h-[400px]">
          <LocationMap city={city} country={country} />
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
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
            </select>

            <button 
              onClick={handleDetectLocation}
              disabled={isDetecting}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              title="Detect current location"
            >
              {isDetecting ? (
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              ) : (
                <LocateFixed className="w-5 h-5 text-gray-600" />
              )}
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
