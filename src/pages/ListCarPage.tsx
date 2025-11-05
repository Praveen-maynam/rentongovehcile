
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

/**
 * Single-file Car Listing + Address + Map Picker + GPS tracker
 * - Client-side geocoding: Nominatim (OpenStreetMap) (no API key)
 * - Map: Leaflet (react-leaflet)
 * - Form posts JSON to /api/cars (adjust to your backend)
 *
 * Notes:
 * - In Next.js, wrap MapContainer import with dynamic() to disable SSR.
 * - For production, move geocoding to server-side (keeps keys secret + caching).
 */

/* ---------- types ---------- */
type Pickup = {
  country: string;
  state: string;
  city: string;
  pincode: string;
  street?: string;
  lat?: number | null;
  lng?: number | null;
  formattedAddress?: string;
};

type FormState = {
  title: string;
  vehicleNumber: string;
  kmDriven: string;
  seats: string;
  acAvailable: boolean;
  description: string;
  ownerName: string;
  contactNumber: string;
  depositMoney: string;
  drivingLicense: boolean;
  aadharCard: boolean;
  depositVehicle: boolean;
  model: string;
  fuel: string;
  transmission: string;
  pricePerHour: number | "";
  pickup: Pickup;
};

/* ---------- leaflet icon fix ---------- */
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ---------- helper: debounce ---------- */
function debounce<T extends (...args: any[]) => void>(fn: T, wait = 500) {
  let t: number | undefined;
  return (...args: Parameters<T>) => {
    if (t) window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), wait) as unknown as number;
  };
}

/* ---------- client geocode (Nominatim) ---------- */
async function geocodeAddress(query: string) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", "1");
  // Nominatim expects a descriptive user agent when used from server.
  const res = await fetch(url.toString(), {
    headers: { "Accept-Language": "en" },
  });
  if (!res.ok) throw new Error("Geocode failed");
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) throw new Error("No result");
  const best = data[0];
  return {
    lat: parseFloat(best.lat),
    lng: parseFloat(best.lon),
    formattedAddress: best.display_name,
    raw: best,
  };
}

async function reverseGeocode(lat: number, lon: number) {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("format", "json");
  url.searchParams.set("addressdetails", "1");
  const res = await fetch(url.toString(), { headers: { "Accept-Language": "en" } });
  if (!res.ok) throw new Error("Reverse geocode failed");
  const j = await res.json();
  return {
    display_name: j.display_name || "",
    address: j.address || {},
    raw: j,
  };
}

/* ---------- Map clicker component ---------- */
function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

/* ---------- main component ---------- */
export default function CarListingSingleFile() {
  const [form, setForm] = useState<FormState>({
    title: "",
    vehicleNumber: "",
    kmDriven: "",
    seats: "",
    acAvailable: false,
    description: "",
    ownerName: "",
    contactNumber: "",
    depositMoney: "",
    drivingLicense: false,
    aadharCard: false,
    depositVehicle: false,
    model: "",
    fuel: "",
    transmission: "",
    pricePerHour: "",
    pickup: {
      country: "India",
      state: "",
      city: "",
      pincode: "",
      street: "",
      lat: null,
      lng: null,
      formattedAddress: "",
    },
  });
  // File upload state
  const [file, setFile] = useState<File | null>(null);

  const [mapOpen, setMapOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([17.4894387, 78.4602418]); // fallback center
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watching, setWatching] = useState(false);
  const watchIdRef = useRef<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // when pickup coords change, reflect marker and center
    if (form.pickup.lat && form.pickup.lng) {
      setMarkerPos([form.pickup.lat, form.pickup.lng]);
      setMapCenter([form.pickup.lat, form.pickup.lng]);
    }
  }, [form.pickup.lat, form.pickup.lng]);

  // Debounced auto geocode when user edits address fields (pincode/street/city/state)
  const debouncedAutoGeocode = useRef(
    debounce(async (value: string) => {
      try {
        if (!value || value.trim().length < 3) return;
        setGeoLoading(true);
        setError(null);
        const res = await geocodeAddress(value);
        setForm((s) => ({
          ...s,
          pickup: { ...s.pickup, lat: res.lat, lng: res.lng, formattedAddress: res.formattedAddress },
        }));
      } catch (e: any) {
        // ignore if no result; show optional message
        // setError(e.message || "geocode failed");
      } finally {
        setGeoLoading(false);
      }
    }, 700)
  ).current;

  // update field helper
  function updatePickup<K extends keyof Pickup>(key: K, value: Pickup[K]) {
    setForm((s) => {
      const next = { ...s, pickup: { ...s.pickup, [key]: value } };
      // trigger debounced geocode when address-ish fields change
      const composed = [next.pickup.street, next.pickup.city, next.pickup.state, next.pickup.pincode, next.pickup.country].filter(Boolean).join(", ");
      debouncedAutoGeocode(composed);
      return next;
    });
  }

  /* ---------- Map interactions ---------- */
  function openMap() {
    // if we have coords, center map to them
    if (form.pickup.lat && form.pickup.lng) setMapCenter([form.pickup.lat, form.pickup.lng]);
    setMapOpen(true);
  }

  function onMapClick(lat: number, lng: number) {
    setMarkerPos([lat, lng]);
    setGeoLoading(true);
    reverseGeocode(lat, lng)
      .then((r) => {
        setForm((s) => ({ ...s, pickup: { ...s.pickup, lat, lng, formattedAddress: r.display_name } }));
      })
      .catch((e) => setError(String(e)))
      .finally(() => setGeoLoading(false));
  }

  function onMarkerDragEnd(e: any) {
    const lat = e.target.getLatLng().lat;
    const lng = e.target.getLatLng().lng;
    setMarkerPos([lat, lng]);
    setGeoLoading(true);
    reverseGeocode(lat, lng)
      .then((r) => {
        setForm((s) => ({ ...s, pickup: { ...s.pickup, lat, lng, formattedAddress: r.display_name } }));
      })
      .catch((e) => setError(String(e)))
      .finally(() => setGeoLoading(false));
  }

  /* ---------- GPS watch ---------- */
  function startWatch() {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported");
      return;
    }
    setWatching(true);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setMarkerPos([lat, lng]);
        setMapCenter([lat, lng]);
        // reverse geocode to fill address (non-blocking)
        reverseGeocode(lat, lng)
          .then((r) => {
            setForm((s) => ({ ...s, pickup: { ...s.pickup, lat, lng, formattedAddress: r.display_name } }));
          })
          .catch(() => {});
      },
      (err) => setError(err.message || "watch error"),
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
    );
  }

  function stopWatch() {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setWatching(false);
  }

  /* ---------- Submit to backend ---------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      // minimal validation
      if (!form.title || form.pricePerHour === "") throw new Error("Title and price are required");
      // ensure we have coords; if not, try to geocode composed address
      let lat = form.pickup.lat, lng = form.pickup.lng;
      if (!lat || !lng) {
        const q = [form.pickup.street, form.pickup.city, form.pickup.state, form.pickup.pincode, form.pickup.country].filter(Boolean).join(", ");
        if (!q) throw new Error("Provide address or pick on map");
        setGeoLoading(true);
        const g = await geocodeAddress(q);
        lat = g.lat; lng = g.lng;
        setForm((s) => ({ ...s, pickup: { ...s.pickup, lat, lng, formattedAddress: g.formattedAddress } }));
        setGeoLoading(false);
      }

      // Build FormData
      const formdata = new FormData();
      formdata.append("userId", "68ff377085e67372e72d1f39");
      formdata.append("CarName", form.title);
      formdata.append("CarModel", form.model);
      formdata.append("fuelType", form.fuel);
      formdata.append("transmissionType", form.transmission);
  formdata.append("kmDriven", form.kmDriven);
      formdata.append("Ac_available", form.acAvailable ? "yes" : "no");
      formdata.append("description", form.description);
      formdata.append("RentPerHour", String(form.pricePerHour));
      formdata.append("RentPerDay", String(form.pricePerHour)); // Adjust if you have a separate per day price
      formdata.append("contactNumber", form.contactNumber);
      formdata.append("contactName", form.ownerName);
      formdata.append("DepositAmount", form.depositMoney);
      formdata.append("DepositVehicle", form.depositVehicle ? "yes" : "no");
      formdata.append("pickupLatitude", String(lat));
      formdata.append("pickupLongitude", String(lng));
      formdata.append("pickupCity", form.pickup.city);
      formdata.append("pickupCityPinCode", form.pickup.pincode);
      formdata.append("pickupCityState", form.pickup.state);
      formdata.append("pickupCityCountry", form.pickup.country);
      formdata.append("pickupArea", form.pickup.street || "");
      formdata.append("CarNumber", form.vehicleNumber);
      formdata.append("Carseater", form.seats);
      // File upload
      if (file) formdata.append("carImages", file);

      // POST to your API
      const res = await fetch("http://52.66.238.227:3000/createCar", {
        method: "POST",
        body: formdata,
      });
      const result = await res.text();
      alert("Car posted successfully");
      console.log("created", result);
      // reset form optionally
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Submit failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">List Your Car</h1>
  <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={e => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
              className="border p-2 rounded"
            />
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Car name" className="border p-2 rounded" />
            <input value={form.vehicleNumber} onChange={(e) => setForm({ ...form, vehicleNumber: e.target.value })} placeholder="Vehicle number" className="border p-2 rounded" />
            <input value={form.kmDriven} onChange={(e) => setForm({ ...form, kmDriven: e.target.value })} placeholder="KM Driven" className="border p-2 rounded" />
            <input value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} placeholder="Seats" className="border p-2 rounded" />
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={form.acAvailable} onChange={(e) => setForm({ ...form, acAvailable: e.target.checked })} />
              <span>AC Available</span>
            </label>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="border p-2 rounded" />
            <input value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} placeholder="Owner name" className="border p-2 rounded" />
            <input value={form.contactNumber} onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} placeholder="Contact number" className="border p-2 rounded" />
            <input value={form.depositMoney} onChange={(e) => setForm({ ...form, depositMoney: e.target.value })} placeholder="Deposit money" className="border p-2 rounded" />
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={form.drivingLicense} onChange={(e) => setForm({ ...form, drivingLicense: e.target.checked })} />
              <span>Driving license required</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={form.aadharCard} onChange={(e) => setForm({ ...form, aadharCard: e.target.checked })} />
              <span>Aadhar card required</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={form.depositVehicle} onChange={(e) => setForm({ ...form, depositVehicle: e.target.checked })} />
              <span>Deposit vehicle required</span>
            </label>
          </div>
          <input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="Model" className="border p-2 rounded" />
          <select value={form.fuel} onChange={(e) => setForm({ ...form, fuel: e.target.value })} className="border p-2 rounded">
            <option value="">Fuel</option><option>Petrol</option><option>Diesel</option><option>Electric</option>
          </select>
          <select value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })} className="border p-2 rounded">
            <option value="">Transmission</option><option>Manual</option><option>Automatic</option>
          </select>
          <input value={form.pricePerHour} onChange={(e) => setForm({ ...form, pricePerHour: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="Price per hour" className="border p-2 rounded" />
          <div className="pt-4 border-t">
            <h2 className="font-semibold mb-2">Pickup address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input value={form.pickup.country} onChange={(e) => updatePickup("country", e.target.value)} placeholder="Country" className="border p-2 rounded" />
              <input value={form.pickup.state} onChange={(e) => updatePickup("state", e.target.value)} placeholder="State" className="border p-2 rounded" />
              <input value={form.pickup.city} onChange={(e) => updatePickup("city", e.target.value)} placeholder="City" className="border p-2 rounded" />
              <input value={form.pickup.pincode} onChange={(e) => updatePickup("pincode", e.target.value)} placeholder="Pincode" className="border p-2 rounded" />
              <input value={form.pickup.street} onChange={(e) => updatePickup("street", e.target.value)} placeholder="Street / address line" className="md:col-span-2 border p-2 rounded" />
            </div>
            <div className="flex items-center gap-3 mt-3">
              <button type="button" onClick={openMap} className="px-4 py-2 bg-navy text-white rounded">Open Map Picker</button>
              <button type="button" onClick={async () => {
                const q = [form.pickup.street, form.pickup.city, form.pickup.state, form.pickup.pincode, form.pickup.country].filter(Boolean).join(", ");
                if (!q) return alert("Enter address fields first");
                try {
                  setGeoLoading(true);
                  const g = await geocodeAddress(q);
                  setForm((s) => ({ ...s, pickup: { ...s.pickup, lat: g.lat, lng: g.lng, formattedAddress: g.formattedAddress } }));
                } catch (e: any) {
                  setError(e.message || "Geocode failed");
                } finally {
                  setGeoLoading(false);
                }
              }} className="px-4 py-2 border rounded">Auto-generate Coordinates</button>
              <div className="ml-auto text-sm text-gray-600">
                Lat: <span className="font-mono">{form.pickup.lat ?? "—"}</span> , Lng: <span className="font-mono">{form.pickup.lng ?? "—"}</span>
              </div>
            </div>
            {form.pickup.formattedAddress && (
              <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                <strong>Resolved address:</strong> {form.pickup.formattedAddress}
              </div>
            )}
          </div>
          {error && <div className="text-sm text-red-600">{String(error)}</div>}
          <div className="flex gap-3 items-center">
            <button type="submit" disabled={submitting} className="px-6 py-2 bg-blue-600 text-white rounded">
              {submitting ? "Posting…" : "Post Now"}
            </button>
            <button type="button" onClick={() => { if (!watching) startWatch(); else stopWatch(); }} className="px-4 py-2 border rounded">
              {watching ? "Stop GPS" : "Start GPS Tracking"}
            </button>
            {geoLoading && <div className="text-sm text-gray-500">Resolving coordinates…</div>}
          </div>
        </form>
        {/* Map modal */}
        {mapOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-5xl h-[80vh] bg-white rounded overflow-hidden shadow-lg flex flex-col">
              <div className="flex items-center gap-3 p-3 border-b">
                <button onClick={() => setMapOpen(false)} className="px-3 py-1 border rounded">Close</button>
                <div className="text-sm text-gray-700">Click map to place marker, drag marker to refine, or use GPS.</div>
                <div className="ml-auto flex gap-2">
                  <button onClick={() => {
                    if (!("geolocation" in navigator)) return alert("No geolocation");
                    navigator.geolocation.getCurrentPosition((pos) => {
                      setMapCenter([pos.coords.latitude, pos.coords.longitude]);
                      setMarkerPos([pos.coords.latitude, pos.coords.longitude]);
                      reverseGeocode(pos.coords.latitude, pos.coords.longitude).then((r) => {
                        setForm((s) => ({ ...s, pickup: { ...s.pickup, lat: pos.coords.latitude, lng: pos.coords.longitude, formattedAddress: r.display_name } }));
                      }).catch(()=>{});
                    });
                  }} className="px-3 py-1 bg-navy text-white rounded">Use Current Location</button>
                </div>
              </div>
              <div className="flex-1">
                <MapContainer center={mapCenter} zoom={14} style={{ height: "100%", width: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MapClickHandler onClick={onMapClick} />
                  {markerPos && (
                    <Marker
                      position={markerPos}
                    />
                  )}
                </MapContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- helper for watch start/stop (top-level functions) ---------- */
function startWatchGlobal(setMarkerPos: (p: [number, number]) => void, setMapCenter: (p: [number, number]) => void, setForm: React.Dispatch<React.SetStateAction<FormState>>, setError: (s: string | null) => void, watchIdRef: React.MutableRefObject<number | null>) {
  if (!("geolocation" in navigator)) {
    setError("Geolocation not supported");
    return;
  }
  watchIdRef.current = navigator.geolocation.watchPosition((pos) => {
    const lat = pos.coords.latitude; const lng = pos.coords.longitude;
    setMarkerPos([lat, lng]);
    setMapCenter([lat, lng]);
    reverseGeocode(lat, lng).then((r) => {
      setForm((s) => ({ ...s, pickup: { ...s.pickup, lat, lng, formattedAddress: r.display_name } }));
    }).catch(()=>{});
  }, (err) => setError(err.message || "watch error"), { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 });
}

function stopWatchGlobal(watchIdRef: React.MutableRefObject<number | null>) {
  if (watchIdRef.current !== null) {
    navigator.geolocation.clearWatch(watchIdRef.current);
    watchIdRef.current = null;
  }
}

/* Reusable wrappers for map-watch from component scope */
function startWatch(thisRef: any) {
  startWatchGlobal(
    (p) => thisRef.setMarkerPos(p),
    (p) => thisRef.setMapCenter(p),
    thisRef.setForm,
    thisRef.setError,
    thisRef.watchIdRef
  );
}

function stopWatch(thisRef: any) {
  stopWatchGlobal(thisRef.watchIdRef);
}