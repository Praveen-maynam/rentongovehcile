// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useMap } from "react-leaflet";
// import { useLocation } from "../store/location.context";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
// import L, { LatLngExpression } from "leaflet";
// import "leaflet/dist/leaflet.css";
// import location from "../assets/icons/Location.png";
// type Suggestion = {
//   display_name: string;
//   lat: string;
//   lon: string;
//   address?: {
//     city?: string;
//     state?: string;
//     country?: string;
//   };
// };

// type Props = {
//   initialLat?: number;
//   initialLng?: number;
//   onSaveLocation?: (city: string, lat: number, lng: number) => void;
// };

// const DefaultCenter: LatLngExpression = [17.4894387, 78.4602418];

// const DefaultIcon = L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// function debounce<T extends (...args: any[]) => void>(fn: T, wait = 300) {
//   let t: NodeJS.Timeout;
//   return (...args: Parameters<T>) => {
//     clearTimeout(t);
//     t = setTimeout(() => fn(...args), wait);
//   };
// }

// export default function SearchMapWithSave({
//   initialLat,
//   initialLng,
//   onSaveLocation,
// }: Props) {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   const [mapCenter, setMapCenter] = useState<LatLngExpression>(
//     initialLat && initialLng ? [initialLat, initialLng] : DefaultCenter
//   );
//   const [markerPos, setMarkerPos] = useState<LatLngExpression | null>(
//     initialLat && initialLng ? [initialLat, initialLng] : null
//   );
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Custom hook to animate map zoom when mapCenter changes
//   function AutoZoom({ position }: { position: LatLngExpression | null }) {
//     const map = useMap();
//     useEffect(() => {
//       if (position) {
//         map.setView(position, 15, { animate: true });
//       }
//     }, [position, map]);
//     return null;
//   }

//   // Get setLocationWithCoordinates from context
//   const { setLocationWithCoordinates } = useLocation();


//   const fetchSuggestions = useCallback(
//     debounce(async (q: string) => {
//       if (!q.trim()) return setSuggestions([]);
//       setLoading(true);
//       const url = new URL("https://nominatim.openstreetmap.org/search");
//       url.searchParams.set("q", q);
//       url.searchParams.set("format", "json");
//       url.searchParams.set("addressdetails", "1");
//       url.searchParams.set("limit", "6");
//       const res = await fetch(url.toString(), {
//         headers: { "User-Agent": "CarRentalApp/1.0" },
//       });
//       const data = (await res.json()) as Suggestion[];
//       setSuggestions(data);
//       setLoading(false);
//     }, 300),
//     []
//   );

//   useEffect(() => {
//     fetchSuggestions(query);
//   }, [query, fetchSuggestions]);

//   const handleSelect = (s: Suggestion) => {
//     const lat = Number(s.lat);
//     const lon = Number(s.lon);
//     const pos: LatLngExpression = [lat, lon];
//     setMarkerPos(pos);
//     setMapCenter(pos); // This will trigger AutoZoom
//     setQuery(s.display_name);
//     setAddress(s.display_name);
//     setCity(s.address?.city || s.address?.state || s.address?.country || "");
//     setSuggestions([]);
//   };

//   const reverseGeocode = async (lat: number, lon: number) => {
//     const url = new URL("https://nominatim.openstreetmap.org/reverse");
//     url.searchParams.set("lat", String(lat));
//     url.searchParams.set("lon", String(lon));
//     url.searchParams.set("format", "json");
//     url.searchParams.set("addressdetails", "1");
//     const res = await fetch(url.toString());
//     const data = await res.json();
//     const addr = data.display_name;
//     setAddress(addr);
//     setCity(data.address?.city || data.address?.state || data.address?.country || "");
//   };

//   const handleUseCurrent = () => {
//     if (!navigator.geolocation) return alert("Geolocation not supported");
//     setLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const lat = pos.coords.latitude;
//         const lon = pos.coords.longitude;
//         setMarkerPos([lat, lon]);
//         setMapCenter([lat, lon]);

//         // Reverse geocode to get address and update search bar
//         try {
//           const url = new URL("https://nominatim.openstreetmap.org/reverse");
//           url.searchParams.set("lat", String(lat));
//           url.searchParams.set("lon", String(lon));
//           url.searchParams.set("format", "json");
//           url.searchParams.set("addressdetails", "1");
//           const res = await fetch(url.toString(), {
//             headers: { "User-Agent": "CarRentalApp/1.0" },
//           });
//           const data = await res.json();
//           const addr = data.display_name;

//           // Update all states including the search query
//           setAddress(addr);
//           setQuery(addr); // This will display the location in the search bar
//           setCity(data.address?.city || data.address?.state || data.address?.country || "");
//           setSuggestions([]); // Clear any existing suggestions
//         } catch (error) {
//           console.error("Reverse geocoding failed:", error);
//           // Fallback to just coordinates if reverse geocoding fails
//           setQuery(`${lat.toFixed(6)}, ${lon.toFixed(6)}`);
//         } finally {
//           setLoading(false);
//         }
//       },
//       (err) => {
//         alert(err.message);
//         setLoading(false);
//       },
//       { enableHighAccuracy: true }
//     );
//   };

//   const handleSave = () => {
//     if (!markerPos || !city) {
//       alert("Please select a valid location first.");
//       return;
//     }
//     const [lat, lon] = markerPos as [number, number];
//     // Save location with coordinates to context
//     setLocationWithCoordinates(city, { latitude: lat, longitude: lon }, "India");
//     onSaveLocation?.(city, lat, lon);
//     // Optionally show a toast or notification here
//     navigate("/rental", { replace: true }); // Go to home/navbar page and close this page
//   };

//   const onMarkerDragEnd = (e: L.DragEndEvent) => {
//     const pos = e.target.getLatLng();
//     setMarkerPos([pos.lat, pos.lng]);
//     reverseGeocode(pos.lat, pos.lng);
//   };

//   function MapEvents() {
//     useMapEvents({
//       click(e) {
//         setMarkerPos([e.latlng.lat, e.latlng.lng]);
//         reverseGeocode(e.latlng.lat, e.latlng.lng);
//       },
//     });
//     return null;
//   }

//   return (
//     <div className="flex flex-col md:flex-row items-start gap-10 p-4 ml-10">
//       {/* Left: Map */}
//       <div
//         className="border rounded-lg overflow-hidden shadow"
//         style={{ width: 50, height: 50, minWidth: 700, minHeight: 500 }}
//       >
//         <MapContainer
//           center={mapCenter}
//           zoom={14}
//           scrollWheelZoom
//           style={{ width: 50, height: 50, minWidth: 700, minHeight: 500 }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='© OpenStreetMap'
//           />
//           <MapEvents />
//           <AutoZoom position={mapCenter} />
//           {markerPos && (
//             <Marker
//               position={markerPos}
//               draggable
//               eventHandlers={{ dragend: onMarkerDragEnd }}
//             >
//               <Popup>{address || "Selected location"}</Popup>
//             </Marker>
//           )}
//         </MapContainer>
//       </div>

//       {/* Right: Search & controls */}
//       <div className="w-full md:w-1/3 space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Search Location
//           </label>
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Enter place, city, or address"
//             className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
//           />
//           {loading && <p className="text-gray-500 text-sm mt-1">Searching…</p>}
//           {suggestions.length > 0 && (
//             <ul className="border rounded-md mt-1 max-h-48 overflow-auto bg-white shadow z-50">
//               {suggestions.map((s, i) => (
//                 <li
//                   key={i}
//                   onClick={() => handleSelect(s)}
//                   className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                 >
//                   {s.display_name}
//                 </li>
//               ))}
//             </ul>

//           )}
//         </div>

//         <button
//           onClick={handleUseCurrent}

//         >
//           <img src={location} alt="Use Current Location" className="w-10 h-10" />

//         </button>

//         <button
//           onClick={handleSave}
//           className="w-full bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLocation } from "../store/location.context";
import locationIcon from "../assets/icons/Location.png";

type Props = {
  initialLat?: number;
  initialLng?: number;
  onSaveLocation?: (city: string, lat: number, lng: number) => void;
};

const GOOGLE_MAPS_API_KEY = "AIzaSyA6myHzS10YXdcazAFalmXvDkrYCp5cLc8";

export default function SearchMapWithSave({ initialLat, initialLng, onSaveLocation }: Props) {
  const navigate = useNavigate();
  const { setLocationWithCoordinates } = useLocation();

  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [googleMaps, setGoogleMaps] = useState<any>(null); // <--- KEY FIX

  const defaultLocation = {
    lat: initialLat || 17.4894387,
    lng: initialLng || 78.4602418,
  };

  /* ---------------------------- LOAD GOOGLE MAPS FIRST ---------------------------- */
  useEffect(() => {
    // Check if already loaded
    if (window.google?.maps) {
      setGoogleMaps(window.google);
      return;
    }

    // Check if script already exists
    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        setGoogleMaps(window.google);
      });
      return;
    }

    // Create and load the script
    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setGoogleMaps(window.google);
    };
    document.head.appendChild(script);
  }, []);

  /* ------------------------------ INITIALIZE MAP ONLY AFTER GOOGLE LOADS ------------------------------ */
  useEffect(() => {
    if (!googleMaps) return; // <-- prevents running before google is ready

    const map = new googleMaps.maps.Map(document.getElementById("map") as HTMLElement, {
      center: defaultLocation,
      zoom: 14,
    });

    mapRef.current = map;

    const marker = new googleMaps.maps.Marker({
      map,
      position: initialLat ? defaultLocation : undefined,
      draggable: true,
    });

    markerRef.current = marker;

    /* ------------------------- AUTOCOMPLETE ------------------------ */
    if (inputRef.current) {
      const auto = new googleMaps.maps.places.Autocomplete(inputRef.current, {
        fields: ["geometry", "formatted_address", "address_components"],
      });

      auto.addListener("place_changed", () => {
        const place = auto.getPlace();
        if (!place.geometry) return;

        const loc = place.geometry.location;
        const lat = loc.lat();
        const lng = loc.lng();

        marker.setPosition({ lat, lng });
        map.setCenter({ lat, lng });
        map.setZoom(15);

        setAddress(place.formatted_address || "");
        setQuery(place.formatted_address || "");

        extractCity(place.address_components || []);
      });
    }

    /* ------------------------ marker drag ------------------------ */
    marker.addListener("dragend", () => {
      const pos = marker.getPosition();
      if (!pos) return;
      reverseGeocode(pos.lat(), pos.lng());
    });

    /* ------------------------ click on map ------------------------ */
    map.addListener("click", (e: any) => {
      if (!e.latLng) return;
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      marker.setPosition({ lat, lng });
      reverseGeocode(lat, lng);
    });

  }, [googleMaps]); // <--- runs ONLY when google is loaded

  /* ----------------------------- REVERSE GEOCODE ----------------------------- */
  const reverseGeocode = (lat: number, lng: number) => {
    if (!googleMaps) return;

    const geocoder = new googleMaps.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (res: any) => {
      if (res && res[0]) {
        setAddress(res[0].formatted_address);
        setQuery(res[0].formatted_address);
        extractCity(res[0].address_components || []);
      }
    });
  };

  /* ----------------------------- EXTRACT CITY ----------------------------- */
  const extractCity = (components: any[]) => {
    const result =
      components.find((c) => c.types.includes("locality")) ||
      components.find((c) => c.types.includes("administrative_area_level_1")) ||
      components.find((c) => c.types.includes("country"));

    setCity(result?.long_name || "");
  };

  /* ----------------------------- USE CURRENT LOCATION ----------------------------- */
  const handleUseCurrent = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!googleMaps) return;

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const map = mapRef.current;
        const marker = markerRef.current;

        marker.setPosition({ lat, lng });
        map.setCenter({ lat, lng });
        map.setZoom(15);

        reverseGeocode(lat, lng);
      },
      (err) => alert(err.message),
      { enableHighAccuracy: true }
    );
  };

  /* ----------------------------- SAVE LOCATION ----------------------------- */
  const handleSave = () => {
    const marker = markerRef.current;
    if (!marker || !city) return alert("Please select a location");

    const pos = marker.getPosition();
    if (!pos) return;

    const lat = pos.lat();
    const lng = pos.lng();

    setLocationWithCoordinates(city, { latitude: lat, longitude: lng }, "India");
    onSaveLocation?.(city, lat, lng);

    navigate("/rental", { replace: true });
  };

  /* ----------------------------- RENDER ----------------------------- */
  return (
    <div className="flex flex-col md:flex-row p-4 gap-10 ml-10">

      <div className="border rounded-lg shadow" style={{ width: 700, height: 500 }}>
        <div id="map" style={{ width: "100%", height: "100%" }} />
      </div>

      <div className="w-full md:w-1/3 space-y-4">

        <label className="text-sm font-medium text-gray-700">Search Location</label>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Search city or address"
        />

        <button onClick={handleUseCurrent}>
          <img src={locationIcon} alt="Use Current Location" className="w-10 h-10" />
        </button>

        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] text-white py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}





