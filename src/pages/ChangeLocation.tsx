// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MapPin, LocateFixed, Loader2 } from "lucide-react";
// import { useLocation } from "../store/location.context";
// import LocationMap from "../components/LocationMap";

// interface LocationOption {
//   city: string;
//   country: string;
//   coordinates?: { lat: number; lng: number };
// }

// const ChangeLocation: React.FC = () => {
//   const navigate = useNavigate();
//   const { currentCity, currentCountry, setLocation } = useLocation();
//   const [country, setCountry] = useState(currentCountry);
//   const [city, setCity] = useState(currentCity);
//   const [isDetecting, setIsDetecting] = useState(false);
//   const [locations] = useState<LocationOption[]>([
//     { country: "India", city: "Kakinada", coordinates: { lat: 16.9891, lng: 82.2475 } },
//     { country: "India", city: "Hyderabad", coordinates: { lat: 17.3850, lng: 78.4867 } },
//     { country: "India", city: "Vizag", coordinates: { lat: 17.6868, lng: 83.2185 } },
//     { country: "India", city: "Mumbai", coordinates: { lat: 19.0760, lng: 72.8777 } },
//     { country: "India", city: "Delhi", coordinates: { lat: 28.7041, lng: 77.1025 } },
//     { country: "India", city: "Bangalore", coordinates: { lat: 12.9716, lng: 77.5946 } },
//     { country: "India", city: "Chennai", coordinates: { lat: 13.0827, lng: 80.2707 } },
//   ]);

//   const handleSave = () => {
//     if (city && country) {
//       setLocation(city, country);
      
//       navigate(-1); // Go back to previous page
//     } else {
//       alert("Please select both country and city");
//     }
//   };

//   const handleLocationSelect = (selectedCity: string, selectedCountry: string) => {
//     setCity(selectedCity);
//     setCountry(selectedCountry);
//   };

//   const handleDetectLocation = () => {
//     setIsDetecting(true);

//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
          
//           // Find closest location from database
//           let closestLocation = locations[0];
//           let minDistance = Infinity;

//           locations.forEach(loc => {
//             if (loc.coordinates) {
//               const distance = Math.sqrt(
//                 Math.pow(loc.coordinates.lat - latitude, 2) +
//                 Math.pow(loc.coordinates.lng - longitude, 2)
//               );
//               if (distance < minDistance) {
//                 minDistance = distance;
//                 closestLocation = loc;
//               }
//             }
//           });

//           setCountry(closestLocation.country);
//           setCity(closestLocation.city);
//           setIsDetecting(false);
//         },
//         (error) => {
//           console.error("Geolocation error:", error);
//           alert("Unable to detect your location. Please enable location services or select manually.");
//           setIsDetecting(false);
//         },
//         { timeout: 10000, enableHighAccuracy: true }
//       );
//     } else {
//       alert("Geolocation is not supported by your browser");
//       setIsDetecting(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto mt-10 px-6">
//       <h1 className="text-3xl font-bold mb-6">Change Location</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* Left: Dynamic Interactive Map */}
//         <div className="rounded-lg overflow-hidden shadow-md h-[400px]">
//           <LocationMap city={city} country={country} />
//         </div>

//         {/* Right: Location form */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-4">Change Location</h2>
//           <div className="flex gap-4 mb-6">
//             <select
//               className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-200"
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//             >
//               <option value="">Select Country</option>
//               <option value="India">India</option>
//               <option value="USA">USA</option>
//             </select>

//             <select
//               className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-200"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//             >
//               <option value="">Select City</option>
//               <option value="Kakinada">Kakinada</option>
//               <option value="Hyderabad">Hyderabad</option>
//               <option value="Vizag">Vizag</option>
//               <option value="Mumbai">Mumbai</option>
//               <option value="Delhi">Delhi</option>
//               <option value="Bangalore">Bangalore</option>
//               <option value="Chennai">Chennai</option>
//             </select>

//             <button 
//               onClick={handleDetectLocation}
//               disabled={isDetecting}
//               className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//               title="Detect current location"
//             >
//               {isDetecting ? (
//                 <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
//               ) : (
//                 <LocateFixed className="w-5 h-5 text-gray-600" />
//               )}
//             </button>
//           </div>

//           <div className="divide-y border-t border-b">
//             {locations.map((loc, i) => (
//               <div 
//                 key={i} 
//                 className={`flex items-center py-3 gap-3 cursor-pointer hover:bg-gray-50 rounded-md px-2 ${
//                   city === loc.city ? 'bg-blue-50 border-blue-200' : ''
//                 }`}
//                 onClick={() => handleLocationSelect(loc.city, loc.country)}
//               >
//                 <MapPin className={`${city === loc.city ? 'text-blue-600' : 'text-gray-600'}`} />
//                 <span className={`${city === loc.city ? 'text-blue-800 font-medium' : 'text-gray-800'}`}>
//                   {loc.city}, {loc.country}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={handleSave}
//             className="mt-6 w-full bg-gradient-to-r from-blue-900 to-blue-400 text-white py-2 rounded-md font-medium hover:opacity-90"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChangeLocation;
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMap } from "react-leaflet";
import { useLocation } from "../store/location.context";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

type Suggestion = {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    state?: string;
    country?: string;
  };
};

type Props = {
  initialLat?: number;
  initialLng?: number;
  onSaveLocation?: (city: string, lat: number, lng: number) => void;
};

const DefaultCenter: LatLngExpression = [17.4894387, 78.4602418];

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function debounce<T extends (...args: any[]) => void>(fn: T, wait = 300) {
  let t: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export default function SearchMapWithSave({
  initialLat,
  initialLng,
  onSaveLocation,
}: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(
    initialLat && initialLng ? [initialLat, initialLng] : DefaultCenter
  );
  const [markerPos, setMarkerPos] = useState<LatLngExpression | null>(
    initialLat && initialLng ? [initialLat, initialLng] : null
  );
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  // Custom hook to animate map zoom when mapCenter changes
  function AutoZoom({ position }: { position: LatLngExpression | null }) {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, 15, { animate: true });
      }
    }, [position, map]);
    return null;
  }

  // Get setLocation from context
  const { setLocation } = useLocation();

  const fetchSuggestions = useCallback(
    debounce(async (q: string) => {
      if (!q.trim()) return setSuggestions([]);
      setLoading(true);
      const url = new URL("https://nominatim.openstreetmap.org/search");
      url.searchParams.set("q", q);
      url.searchParams.set("format", "json");
      url.searchParams.set("addressdetails", "1");
      url.searchParams.set("limit", "6");
      const res = await fetch(url.toString(), {
        headers: { "User-Agent": "CarRentalApp/1.0" },
      });
      const data = (await res.json()) as Suggestion[];
      setSuggestions(data);
      setLoading(false);
    }, 300),
    []
  );

  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

  const handleSelect = (s: Suggestion) => {
    const lat = Number(s.lat);
    const lon = Number(s.lon);
    const pos: LatLngExpression = [lat, lon];
    setMarkerPos(pos);
    setMapCenter(pos); // This will trigger AutoZoom
    setQuery(s.display_name);
    setAddress(s.display_name);
    setCity(s.address?.city || s.address?.state || s.address?.country || "");
    setSuggestions([]);
  };

  const reverseGeocode = async (lat: number, lon: number) => {
    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("lat", String(lat));
    url.searchParams.set("lon", String(lon));
    url.searchParams.set("format", "json");
    url.searchParams.set("addressdetails", "1");
    const res = await fetch(url.toString());
    const data = await res.json();
    const addr = data.display_name;
    setAddress(addr);
    setCity(data.address?.city || data.address?.state || data.address?.country || "");
  };

  const handleUseCurrent = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setMarkerPos([lat, lon]);
        setMapCenter([lat, lon]);
        reverseGeocode(lat, lon);
      },
      (err) => alert(err.message),
      { enableHighAccuracy: true }
    );
  };

  const handleSave = () => {
    if (!markerPos || !city) {
      alert("Please select a valid location first.");
      return;
    }
    const [lat, lon] = markerPos as [number, number];
    setLocation(city, "India"); // You can use a dynamic country if available
    onSaveLocation?.(city, lat, lon);
    // Optionally show a toast or notification here
    navigate("/", { replace: true }); // Go to home/navbar page and close this page
  };

  const onMarkerDragEnd = (e: L.DragEndEvent) => {
    const pos = e.target.getLatLng();
    setMarkerPos([pos.lat, pos.lng]);
    reverseGeocode(pos.lat, pos.lng);
  };

  function MapEvents() {
    useMapEvents({
      click(e) {
        setMarkerPos([e.latlng.lat, e.latlng.lng]);
        reverseGeocode(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 p-4">
      {/* Left: Map */}
      <div
        className="border rounded-lg overflow-hidden shadow"
        style={{ width: 50, height: 50, minWidth: 400, minHeight: 400 }}
      >
        <MapContainer
          center={mapCenter}
          zoom={14}
          scrollWheelZoom
          style={{ width: 50, height:50, minWidth: 400, minHeight: 400 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© OpenStreetMap'
          />
          <MapEvents />
          <AutoZoom position={mapCenter} />
          {markerPos && (
            <Marker
              position={markerPos}
              draggable
              eventHandlers={{ dragend: onMarkerDragEnd }}
            >
              <Popup>{address || "Selected location"}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Right: Search & controls */}
      <div className="w-full md:w-1/3 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Location
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter place, city, or address"
            className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
          />
          {loading && <p className="text-gray-500 text-sm mt-1">Searching…</p>}
          {suggestions.length > 0 && (
            <ul className="border rounded-md mt-1 max-h-48 overflow-auto bg-white shadow z-50">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => handleSelect(s)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {s.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleUseCurrent}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          📍
        </button>

        {/* <div className="border p-3 rounded bg-gray-50 text-sm">
          <p className="font-medium text-gray-700">Selected Address:</p>
          <p className="text-gray-600 mt-1">{address || "—"}</p>
        </div> */}

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save 
        </button>
      </div>
    </div>
  );
}