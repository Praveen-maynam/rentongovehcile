
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

  // Get setLocationWithCoordinates from context
  const { setLocationWithCoordinates } = useLocation();


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
    // Save location with coordinates to context
    setLocationWithCoordinates(city, { latitude: lat, longitude: lon }, "India");
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