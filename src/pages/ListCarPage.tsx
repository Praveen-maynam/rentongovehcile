
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import L from "leaflet";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
// import apiService from "../services/api.service";

// type Pickup = {
//   country: string;
//   state: string;
//   city: string;
//   pincode: string;
//   street?: string;
//   lat?: number | null;
//   lng?: number | null;
//   formattedAddress?: string;
// };

// type FormState = {
//   title: string;
//   vehicleNumber: string;
//   kmDriven: string;
//   seats: string;
//   acAvailable: boolean;
//   description: string;
//   ownerName: string;
//   contactNumber: string;
//   depositMoney: string;
//   drivingLicense: boolean;
//   aadharCard: boolean;
//   depositVehicle: boolean;
//   model: string;
//   fuel: string;
//   transmission: string;
//   pricePerHour: number | "";
//   pickup: Pickup;
// };

// /* ---------- leaflet icon fix ---------- */
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// /* ---------- helper: debounce ---------- */
// function debounce<T extends (...args: any[]) => void>(fn: T, wait = 500) {
//   let t: number | undefined;
//   return (...args: Parameters<T>) => {
//     if (t) window.clearTimeout(t);
//     t = window.setTimeout(() => fn(...args), wait) as unknown as number;
//   };
// }

// /* ---------- client geocode (Nominatim) ---------- */
// async function geocodeAddress(query: string) {
//   const url = new URL("https://nominatim.openstreetmap.org/search");
//   url.searchParams.set("q", query);
//   url.searchParams.set("format", "json");
//   url.searchParams.set("addressdetails", "1");
//   url.searchParams.set("limit", "1");
//   // Nominatim expects a descriptive user agent when used from server.
//   const res = await fetch(url.toString(), {
//     headers: { "Accept-Language": "en" },
//   });
//   if (!res.ok) throw new Error("Geocode failed");
//   const data = await res.json();
//   if (!Array.isArray(data) || data.length === 0) throw new Error("No result");
//   const best = data[0];
//   return {
//     lat: parseFloat(best.lat),
//     lng: parseFloat(best.lon),
//     formattedAddress: best.display_name,
//     raw: best,
//   };
// }

// async function reverseGeocode(lat: number, lon: number) {
//   const url = new URL("https://nominatim.openstreetmap.org/reverse");
//   url.searchParams.set("lat", String(lat));
//   url.searchParams.set("lon", String(lon));
//   url.searchParams.set("format", "json");
//   url.searchParams.set("addressdetails", "1");
//   const res = await fetch(url.toString(), { headers: { "Accept-Language": "en" } });
//   if (!res.ok) throw new Error("Reverse geocode failed");
//   const j = await res.json();
//   return {
//     display_name: j.display_name || "",
//     address: j.address || {},
//     raw: j,
//   };
// }

// /* ---------- Map clicker component ---------- */
// function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
//   useMapEvents({
//     click(e) {
//       onClick(e.latlng.lat, e.latlng.lng);
//     },
//   });
//   return null;
// }

// /* ---------- main component ---------- */
// export default function CarListingSingleFile() {
//   const [form, setForm] = useState<FormState>({
//     title: "",
//     vehicleNumber: "",
//     kmDriven: "",
//     seats: "",
//     acAvailable: false,
//     description: "",
//     ownerName: "",
//     contactNumber: "",
//     depositMoney: "",
//     drivingLicense: false,
//     aadharCard: false,
//     depositVehicle: false,
//     model: "",
//     fuel: "",
//     transmission: "",
//     pricePerHour: "",
//     pickup: {
//       country: "India",
//       state: "",
//       city: "",
//       pincode: "",
//       street: "",
//       lat: null,
//       lng: null,
//       formattedAddress: "",
//     },
//   });
//   // File upload state
//   const [file, setFile] = useState<File | null>(null);

//   const [mapOpen, setMapOpen] = useState(false);
//   const [mapCenter, setMapCenter] = useState<[number, number]>([17.4894387, 78.4602418]); // fallback center
//   const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
//   const [geoLoading, setGeoLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [watching, setWatching] = useState(false);
//   const watchIdRef = useRef<number | null>(null);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     // when pickup coords change, reflect marker and center
//     if (form.pickup.lat && form.pickup.lng) {
//       setMarkerPos([form.pickup.lat, form.pickup.lng]);
//       setMapCenter([form.pickup.lat, form.pickup.lng]);
//     }
//   }, [form.pickup.lat, form.pickup.lng]);

//   // Debounced auto geocode when user edits address fields (pincode/street/city/state)
//   const debouncedAutoGeocode = useRef(
//     debounce(async (value: string) => {
//       try {
//         if (!value || value.trim().length < 3) return;
//         setGeoLoading(true);
//         setError(null);
//         const res = await geocodeAddress(value);
//         setForm((s) => ({
//           ...s,
//           pickup: { ...s.pickup, lat: res.lat, lng: res.lng, formattedAddress: res.formattedAddress },
//         }));
//       } catch (e: any) {
//         // ignore if no result; show optional message
//         // setError(e.message || "geocode failed");
//       } finally {
//         setGeoLoading(false);
//       }
//     }, 700)
//   ).current;

//   // update field helper
//   function updatePickup<K extends keyof Pickup>(key: K, value: Pickup[K]) {
//     setForm((s) => {
//       const next = { ...s, pickup: { ...s.pickup, [key]: value } };
//       // trigger debounced geocode when address-ish fields change
//       const composed = [next.pickup.street, next.pickup.city, next.pickup.state, next.pickup.pincode, next.pickup.country].filter(Boolean).join(", ");
//       debouncedAutoGeocode(composed);
//       return next;
//     });
//   }

//   /* ---------- Map interactions ---------- */
//   function openMap() {
//     // if we have coords, center map to them
//     if (form.pickup.lat && form.pickup.lng) setMapCenter([form.pickup.lat, form.pickup.lng]);
//     setMapOpen(true);
//   }

//   function onMapClick(lat: number, lng: number) {
//     setMarkerPos([lat, lng]);
//     setGeoLoading(true);
//     reverseGeocode(lat, lng)
//       .then((r) => {
//         setForm((s) => ({ ...s, pickup: { ...s.pickup, lat, lng, formattedAddress: r.display_name } }));
//       })
//       .catch((e) => setError(String(e)))
//       .finally(() => setGeoLoading(false));
//   }

//   function onMarkerDragEnd(e: any) {
//     const lat = e.target.getLatLng().lat;
//     const lng = e.target.getLatLng().lng;
//     setMarkerPos([lat, lng]);
//     setGeoLoading(true);
//     reverseGeocode(lat, lng)
//       .then((r) => {
//         setForm((s) => ({ ...s, pickup: { ...s.pickup, lat, lng, formattedAddress: r.display_name } }));
//       })
//       .catch((e) => setError(String(e)))
//       .finally(() => setGeoLoading(false));
//   }

//   /* ---------- GPS watch ---------- */
//   function startWatch() {
//     if (!("geolocation" in navigator)) {
//       setError("Geolocation not supported");
//       return;
//     }
//     setWatching(true);
//     watchIdRef.current = navigator.geolocation.watchPosition(
//       (pos) => {
//         const lat = pos.coords.latitude;
//         const lng = pos.coords.longitude;
//         setMarkerPos([lat, lng]);
//         setMapCenter([lat, lng]);
//         // reverse geocode to fill address (non-blocking)
//         reverseGeocode(lat, lng)
//           .then((r) => {
//             setForm((s) => ({ ...s, pickup: { ...s.pickup, lat, lng, formattedAddress: r.display_name } }));
//           })
//           .catch(() => {});
//       },
//       (err) => setError(err.message || "watch error"),
//       { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
//     );
//   }

//   function stopWatch() {
//     if (watchIdRef.current !== null) {
//       navigator.geolocation.clearWatch(watchIdRef.current);
//       watchIdRef.current = null;
//     }
//     setWatching(false);
//   }

//   /* ---------- Submit to backend ---------- */
//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setSubmitting(true);
//     setError(null);
//     try {
//       // minimal validation
//       if (!form.title || form.pricePerHour === "") throw new Error("Title and price are required");
//       // ensure we have coords; if not, try to geocode composed address
//       let lat = form.pickup.lat, lng = form.pickup.lng;
//       if (!lat || !lng) {
//         const q = [form.pickup.street, form.pickup.city, form.pickup.state, form.pickup.pincode, form.pickup.country].filter(Boolean).join(", ");
//         if (!q) throw new Error("Provide address or pick on map");
//         setGeoLoading(true);
//         const g = await geocodeAddress(q);
//         lat = g.lat; lng = g.lng;
//         setForm((s) => ({ ...s, pickup: { ...s.pickup, lat, lng, formattedAddress: g.formattedAddress } }));
//         setGeoLoading(false);
//       }

//       // Build FormData
//       const formdata = new FormData();
//       formdata.append("userId", "68f32259cea8a9fa88029262");
//       formdata.append("CarName", form.title);
//       formdata.append("CarModel", form.model);
//       formdata.append("fuelType", form.fuel);
//       formdata.append("transmissionType", form.transmission);
//   formdata.append("kmDriven", form.kmDriven);
//       formdata.append("Ac_available", form.acAvailable ? "yes" : "no");
//       formdata.append("description", form.description);
//       formdata.append("RentPerHour", String(form.pricePerHour));
//       formdata.append("RentPerDay", String(form.pricePerHour)); // Adjust if you have a separate per day price
//       formdata.append("contactNumber", form.contactNumber);
//       formdata.append("contactName", form.ownerName);
//       formdata.append("DepositAmount", form.depositMoney);
//       formdata.append("DepositVehicle", form.depositVehicle ? "yes" : "no");
//       formdata.append("pickupLatitude", String(lat));
//       formdata.append("pickupLongitude", String(lng));
//       formdata.append("pickupCity", form.pickup.city);
//       formdata.append("pickupCityPinCode", form.pickup.pincode);
//       formdata.append("pickupCityState", form.pickup.state);
//       formdata.append("pickupCityCountry", form.pickup.country);
//       formdata.append("pickupArea", form.pickup.street || "");
//       formdata.append("CarNumber", form.vehicleNumber);
//       formdata.append("Carseater", form.seats);
//       // File upload
//       if (file) formdata.append("carImages", file);

//       // POST to your API
//       const res = await fetch("http://3.110.122.127:3000/createCar", {
//         method: "POST",
//         body: formdata,
//       });
//       const result = await res.text();
//       alert("Car posted successfully");
//       console.log("created", result);
//       // reset form optionally
//     } catch (err: any) {
//       console.error(err);
//       setError(err?.message ?? "Submit failed");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
//         <h1 className="text-2xl font-bold mb-4">List Your Car</h1>
//   <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={e => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
//               className="border p-2 rounded"
//             />
//             <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Car name" className="border p-2 rounded" />
//             <input value={form.vehicleNumber} onChange={(e) => setForm({ ...form, vehicleNumber: e.target.value })} placeholder="Vehicle number" className="border p-2 rounded" />
//             <input value={form.kmDriven} onChange={(e) => setForm({ ...form, kmDriven: e.target.value })} placeholder="KM Driven" className="border p-2 rounded" />
//             <input value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} placeholder="Seats" className="border p-2 rounded" />
//             <label className="flex items-center space-x-2">
//               <input type="checkbox" checked={form.acAvailable} onChange={(e) => setForm({ ...form, acAvailable: e.target.checked })} />
//               <span>AC Available</span>
//             </label>
//             <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="border p-2 rounded" />
//             <input value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} placeholder="Owner name" className="border p-2 rounded" />
//             <input value={form.contactNumber} onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} placeholder="Contact number" className="border p-2 rounded" />
//             <input value={form.depositMoney} onChange={(e) => setForm({ ...form, depositMoney: e.target.value })} placeholder="Deposit money" className="border p-2 rounded" />
//             <label className="flex items-center space-x-2">
//               <input type="checkbox" checked={form.drivingLicense} onChange={(e) => setForm({ ...form, drivingLicense: e.target.checked })} />
//               <span>Driving license required</span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input type="checkbox" checked={form.aadharCard} onChange={(e) => setForm({ ...form, aadharCard: e.target.checked })} />
//               <span>Aadhar card required</span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input type="checkbox" checked={form.depositVehicle} onChange={(e) => setForm({ ...form, depositVehicle: e.target.checked })} />
//               <span>Deposit vehicle required</span>
//             </label>
//           </div>
//           <input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="Model" className="border p-2 rounded" />
//           <select value={form.fuel} onChange={(e) => setForm({ ...form, fuel: e.target.value })} className="border p-2 rounded">
//             <option value="">Fuel</option><option>Petrol</option><option>Diesel</option><option>Electric</option>
//           </select>
//           <select value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })} className="border p-2 rounded">
//             <option value="">Transmission</option><option>Manual</option><option>Automatic</option>
//           </select>
//           <input value={form.pricePerHour} onChange={(e) => setForm({ ...form, pricePerHour: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="Price per hour" className="border p-2 rounded" />
//           <div className="pt-4 border-t">
//             <h2 className="font-semibold mb-2">Pickup address</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               <input value={form.pickup.country} onChange={(e) => updatePickup("country", e.target.value)} placeholder="Country" className="border p-2 rounded" />
//               <input value={form.pickup.state} onChange={(e) => updatePickup("state", e.target.value)} placeholder="State" className="border p-2 rounded" />
//               <input value={form.pickup.city} onChange={(e) => updatePickup("city", e.target.value)} placeholder="City" className="border p-2 rounded" />
//               <input value={form.pickup.pincode} onChange={(e) => updatePickup("pincode", e.target.value)} placeholder="Pincode" className="border p-2 rounded" />
//               <input value={form.pickup.street} onChange={(e) => updatePickup("street", e.target.value)} placeholder="Street / address line" className="md:col-span-2 border p-2 rounded" />
//             </div>
//             <div className="flex items-center gap-3 mt-3">
//               <button type="button" onClick={openMap} className="px-4 py-2 bg-navy text-white rounded">Open Map Picker</button>
//               <button type="button" onClick={async () => {
//                 const q = [form.pickup.street, form.pickup.city, form.pickup.state, form.pickup.pincode, form.pickup.country].filter(Boolean).join(", ");
//                 if (!q) return alert("Enter address fields first");
//                 try {
//                   setGeoLoading(true);
//                   const g = await geocodeAddress(q);
//                   setForm((s) => ({ ...s, pickup: { ...s.pickup, lat: g.lat, lng: g.lng, formattedAddress: g.formattedAddress } }));
//                 } catch (e: any) {
//                   setError(e.message || "Geocode failed");
//                 } finally {
//                   setGeoLoading(false);
//                 }
//               }} className="px-4 py-2 border rounded">Auto-generate Coordinates</button>
//               <div className="ml-auto text-sm text-gray-600">
//                 Lat: <span className="font-mono">{form.pickup.lat ?? "—"}</span> , Lng: <span className="font-mono">{form.pickup.lng ?? "—"}</span>
//               </div>
//             </div>
//             {form.pickup.formattedAddress && (
//               <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
//                 <strong>Resolved address:</strong> {form.pickup.formattedAddress}
//               </div>
//             )}
//           </div>
//           {error && <div className="text-sm text-red-600">{String(error)}</div>}
//           <div className="flex gap-3 items-center">
//             <button type="submit" disabled={submitting} className="px-6 py-2 bg-blue-600 text-white rounded">
//               {submitting ? "Posting…" : "Post Now"}
//             </button>
//             <button type="button" onClick={() => { if (!watching) startWatch(); else stopWatch(); }} className="px-4 py-2 border rounded">
//               {watching ? "Stop GPS" : "Start GPS Tracking"}
//             </button>
//             {geoLoading && <div className="text-sm text-gray-500">Resolving coordinates…</div>}
//           </div>
//         </form>
//         {/* Map modal */}
//         {mapOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//             <div className="w-full max-w-5xl h-[80vh] bg-white rounded overflow-hidden shadow-lg flex flex-col">
//               <div className="flex items-center gap-3 p-3 border-b">
//                 <button onClick={() => setMapOpen(false)} className="px-3 py-1 border rounded">Close</button>
//                 <div className="text-sm text-gray-700">Click map to place marker, drag marker to refine, or use GPS.</div>
//                 <div className="ml-auto flex gap-2">
//                   <button onClick={() => {
//                     if (!("geolocation" in navigator)) return alert("No geolocation");
//                     navigator.geolocation.getCurrentPosition((pos) => {
//                       setMapCenter([pos.coords.latitude, pos.coords.longitude]);
//                       setMarkerPos([pos.coords.latitude, pos.coords.longitude]);
//                       reverseGeocode(pos.coords.latitude, pos.coords.longitude).then((r) => {
//                         setForm((s) => ({ ...s, pickup: { ...s.pickup, lat: pos.coords.latitude, lng: pos.coords.longitude, formattedAddress: r.display_name } }));
//                       }).catch(()=>{});
//                     });
//                   }} className="px-3 py-1 bg-navy text-white rounded">Use Current Location</button>
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <MapContainer center={mapCenter} zoom={14} style={{ height: "100%", width: "100%" }}>
//                   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                   <MapClickHandler onClick={onMapClick} />
//                   {markerPos && (
//                     <Marker
//                       position={markerPos}
//                     />
//                   )}
//                 </MapContainer>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ---------- helper for watch start/stop (top-level functions) ---------- */
// function startWatchGlobal(setMarkerPos: (p: [number, number]) => void, setMapCenter: (p: [number, number]) => void, setForm: React.Dispatch<React.SetStateAction<FormState>>, setError: (s: string | null) => void, watchIdRef: React.MutableRefObject<number | null>) {
//   if (!("geolocation" in navigator)) {
//     setError("Geolocation not supported");
//     return;
//   }
//   watchIdRef.current = navigator.geolocation.watchPosition((pos) => {
//     const lat = pos.coords.latitude; const lng = pos.coords.longitude;
//     setMarkerPos([lat, lng]);
//     setMapCenter([lat, lng]);
//     reverseGeocode(lat, lng).then((r) => {
//       setForm((s) => ({ ...s, pickup: { ...s.pickup, lat, lng, formattedAddress: r.display_name } }));
//     }).catch(()=>{});
//   }, (err) => setError(err.message || "watch error"), { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 });
// }

// function stopWatchGlobal(watchIdRef: React.MutableRefObject<number | null>) {
//   if (watchIdRef.current !== null) {
//     navigator.geolocation.clearWatch(watchIdRef.current);
//     watchIdRef.current = null;
//   }
// }

// /* Reusable wrappers for map-watch from component scope */
// function startWatch(thisRef: any) {
//   startWatchGlobal(
//     (p) => thisRef.setMarkerPos(p),
//     (p) => thisRef.setMapCenter(p),
//     thisRef.setForm,
//     thisRef.setError,
//     thisRef.watchIdRef
//   );
// }

// function stopWatch(thisRef: any) {
//   stopWatchGlobal(thisRef.watchIdRef);
// }



import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { MapPin, Navigation, Loader, Plus, X } from "lucide-react";
import apiService from "../services/api.service";

// Geocoding Service
const GeocodingService = {
  async getCoordinates(address: any) {
    const query = Object.values(address).filter(Boolean).join(", ");
    if (!query) return null;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          latitude: data[0].lat,
          longitude: data[0].lon,
          displayName: data[0].display_name
        };
      }
      return null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  },

  async reverseGeocode(lat: number, lon: number) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.address) {
        return {
          street: data.address.road || data.address.suburb || "",
          city: data.address.city || data.address.town || data.address.village || "",
          state: data.address.state || "",
          pincode: data.address.postcode || "",
          country: data.address.country || ""
        };
      }
      return null;
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return null;
    }
  }
};

// Map Click Handler Component
function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e: any) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const ListCarPage = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([17.4889, 78.4603]);
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
  const [watching, setWatching] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  // Get userId safely and validate it's a proper MongoDB ObjectId
  const getUserId = () => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId && storedUserId.length === 24 && /^[a-f0-9]{24}$/i.test(storedUserId)) {
      return storedUserId;
    }
    return "68f32259cea8a9fa88029262";
  };

  const [formData, setFormData] = useState({
    userId: getUserId(),
    CarName: "",
    CarModel: "",
    CarNumber: "",
    Carseater: "",
    fuelType: "Petrol",
    transmissionType: "Manual",
    kmDriven: "",
    Ac_available: false,
    description: "",
    RentPerHour: "",
    RentPerDay: "",
    contactName: "",
    contactNumber: "",
    DepositAmount: "0",
    drivingLicenseRequired: false,
    AadharCardRequired: false,
    DepositVehicle: false,
    photos: [] as File[],
    pickupArea: "",
    pickupCity: "",
    pickupCityState: "",
    pickupCityPinCode: "",
    pickupCityCountry: "",
    pickupLatitude: "17.4889",
    pickupLongitude: "78.4603",
    gps: false,
  });

  const formFields = {
    vehicleDetails: [
      { name: "CarName", label: "Car Name", type: "text", required: true, placeholder: "Toyota Fortuner" },
      { name: "CarModel", label: "Car Model", type: "text", required: true, placeholder: "2023" },
      { name: "CarNumber", label: "Car Number", type: "text", required: true, placeholder: "AP12AB1234" },
      { name: "kmDriven", label: "KM Driven", type: "text", required: true, placeholder: "15000" },
      { name: "Carseater", label: "Seating Capacity", type: "text", required: true, placeholder: "5" },
      { 
        name: "fuelType", 
        label: "Fuel Type", 
        type: "select", 
        required: true,
        options: ["Petrol", "Diesel", "Electric", "Hybrid"]
      },
      { 
        name: "transmissionType", 
        label: "Transmission", 
        type: "select", 
        required: true,
        options: ["Manual", "Automatic", "Semi-Automatic"]
      },
      { name: "RentPerHour", label: "Rent Per Hour", type: "number", required: true, placeholder: "500", min: 0 },
      { name: "RentPerDay", label: "Rent Per Day", type: "number", required: true, placeholder: "5000", min: 0 }
    ],
    contactInfo: [
      { name: "contactName", label: "Name", type: "text", required: true, placeholder: "John Doe" },
      { name: "contactNumber", label: "Contact Number", type: "tel", required: true, placeholder: "9876543210", pattern: "[0-9]{10}" }
    ],
    addressFields: [
      { name: "pickupArea", label: "Street/Area", type: "text", required: true, placeholder: "Street name or area" },
      { name: "pickupCity", label: "City", type: "text", required: true, placeholder: "City name" },
      { name: "pickupCityState", label: "State", type: "text", required: true, placeholder: "State name" },
      { name: "pickupCityPinCode", label: "Zip/Pincode", type: "text", required: true, placeholder: "500001", pattern: "[0-9]{6}" },
      { name: "pickupCityCountry", label: "Country", type: "text", required: true, placeholder: "India", fullWidth: true }
    ],
    checkboxes: [
      { name: "Ac_available", label: "AC Available" },
      { name: "drivingLicenseRequired", label: "Driving License Required" },
      { name: "AadharCardRequired", label: "Aadhar Card Required" },
      { name: "DepositVehicle", label: "Deposit Vehicle Required" },
      { name: "gps", label: "GPS Tracking Available" }
    ]
  };

  useEffect(() => {
    if (formData.pickupLatitude && formData.pickupLongitude) {
      setMarkerPos([parseFloat(formData.pickupLatitude), parseFloat(formData.pickupLongitude)]);
      setMapCenter([parseFloat(formData.pickupLatitude), parseFloat(formData.pickupLongitude)]);
    }
  }, [formData.pickupLatitude, formData.pickupLongitude]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const address = {
        pickupArea: formData.pickupArea,
        pickupCity: formData.pickupCity,
        pickupCityState: formData.pickupCityState,
        pickupCityPinCode: formData.pickupCityPinCode,
        pickupCityCountry: formData.pickupCityCountry
      };

      const coords = await GeocodingService.getCoordinates(address);
      if (coords) {
        setFormData((prev) => ({
          ...prev,
          pickupLatitude: coords.latitude,
          pickupLongitude: coords.longitude,
        }));
        setLocationError("");
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [
    formData.pickupArea,
    formData.pickupCity,
    formData.pickupCityState,
    formData.pickupCityPinCode,
    formData.pickupCityCountry,
  ]);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handlePhotoUpload = (e: any) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as File[];
      setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...filesArray] }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const getCurrentLocation = () => {
    setLoadingLocation(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        setFormData((prev) => ({
          ...prev,
          pickupLatitude: latitude.toString(),
          pickupLongitude: longitude.toString(),
        }));

        const address = await GeocodingService.reverseGeocode(latitude, longitude);
        if (address) {
          setFormData((prev) => ({
            ...prev,
            pickupArea: address.street,
            pickupCity: address.city,
            pickupCityState: address.state,
            pickupCityPinCode: address.pincode,
            pickupCityCountry: address.country
          }));
        }
        
        setLoadingLocation(false);
      },
      (error) => {
        setLocationError("Unable to retrieve location. Please enable GPS.");
        setLoadingLocation(false);
        console.error(error);
      }
    );
  };

  const onMapClick = (lat: number, lng: number) => {
    setMarkerPos([lat, lng]);
    setLoadingLocation(true);
    GeocodingService.reverseGeocode(lat, lng)
      .then((address) => {
        if (address) {
          setFormData((prev) => ({
            ...prev,
            pickupLatitude: lat.toString(),
            pickupLongitude: lng.toString(),
            pickupArea: address.street,
            pickupCity: address.city,
            pickupCityState: address.state,
            pickupCityPinCode: address.pincode,
            pickupCityCountry: address.country
          }));
        }
      })
      .catch((e) => setLocationError(String(e)))
      .finally(() => setLoadingLocation(false));
  };

  const startWatch = () => {
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation not supported");
      return;
    }
    setWatching(true);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setMarkerPos([lat, lng]);
        setMapCenter([lat, lng]);
        GeocodingService.reverseGeocode(lat, lng)
          .then((address) => {
            if (address) {
              setFormData((prev) => ({
                ...prev,
                pickupLatitude: lat.toString(),
                pickupLongitude: lng.toString(),
                pickupArea: address.street,
                pickupCity: address.city,
                pickupCityState: address.state,
                pickupCityPinCode: address.pincode,
                pickupCityCountry: address.country
              }));
            }
          })
          .catch(() => {});
      },
      (err) => setLocationError(err.message || "watch error"),
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
    );
  };

  const stopWatch = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setWatching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate userId format
    if (!formData.userId || formData.userId.length !== 24 || !/^[a-f0-9]{24}$/i.test(formData.userId)) {
      alert("Invalid user ID format. Please log in again.");
      return;
    }

    if (!formData.CarName || !formData.CarModel || !formData.CarNumber) {
      alert("Please fill in car name, model, and number");
      return;
    }

    if (!formData.RentPerHour || parseFloat(formData.RentPerHour) <= 0) {
      alert("Please enter a valid rent per hour");
      return;
    }

    if (!formData.contactNumber || formData.contactNumber.length !== 10) {
      alert("Please enter a valid 10-digit contact number");
      return;
    }

    if (!formData.contactName) {
      alert("Please enter contact name");
      return;
    }

    if (!formData.pickupArea || !formData.pickupCity || !formData.pickupCityState || 
        !formData.pickupCityPinCode || !formData.pickupCityCountry) {
      alert("Please fill in all address fields");
      return;
    }

    if (!formData.pickupLatitude || !formData.pickupLongitude) {
      alert("Please get your current location");
      return;
    }

    if (formData.photos.length === 0) {
      alert("Please upload at least one photo");
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    
    formDataToSend.append("userId", formData.userId.trim());
    formDataToSend.append("CarName", formData.CarName.trim());
    formDataToSend.append("CarModel", formData.CarModel.trim());
    formDataToSend.append("CarNumber", formData.CarNumber.trim().toUpperCase());
    formDataToSend.append("Carseater", formData.Carseater);
    formDataToSend.append("fuelType", formData.fuelType);
    formDataToSend.append("transmissionType", formData.transmissionType);
    formDataToSend.append("kmDriven", formData.kmDriven);
    formDataToSend.append("Ac_available", formData.Ac_available ? "yes" : "no");
    formDataToSend.append("description", formData.description.trim());
    formDataToSend.append("RentPerHour", formData.RentPerHour);
    formDataToSend.append("RentPerDay", formData.RentPerDay);
    formDataToSend.append("contactName", formData.contactName.trim());
    formDataToSend.append("contactNumber", formData.contactNumber.trim());
    formDataToSend.append("DepositAmount", formData.DepositAmount);
    formDataToSend.append("drivingLicenseRequired", formData.drivingLicenseRequired.toString());
    formDataToSend.append("AadharCardRequired", formData.AadharCardRequired.toString());
    formDataToSend.append("DepositVehicle", formData.DepositVehicle ? "yes" : "no");
    formDataToSend.append("pickupArea", formData.pickupArea.trim());
    formDataToSend.append("pickupCity", formData.pickupCity.trim());
    formDataToSend.append("pickupCityState", formData.pickupCityState.trim());
    formDataToSend.append("pickupCityPinCode", formData.pickupCityPinCode.trim());
    formDataToSend.append("pickupCityCountry", formData.pickupCityCountry.trim());
    formDataToSend.append("pickupLatitude", formData.pickupLatitude);
    formDataToSend.append("pickupLongitude", formData.pickupLongitude);
    formDataToSend.append("gps", formData.gps.toString());
    
    formData.photos.forEach((photo) => {
      formDataToSend.append("carImages", photo);
    });

    try {
      console.log("📤 Submitting car data...");
      console.log("👤 User ID:", formData.userId);
      
      const response = await apiService.car.createCar(formDataToSend);
      
      console.log("✅ Car created successfully:", response);
      
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error("❌ Error creating car:", error);
      
      let errorMessage = "Failed to post car. Please try again.";
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      if (errorMessage.includes("userId") || errorMessage.includes("ObjectId")) {
        errorMessage = "Invalid user ID. Please log in again and try.";
      } else if (errorMessage.includes("CarNumber")) {
        errorMessage = "Invalid car number format. Please check and try again.";
      } else if (errorMessage.includes("duplicate")) {
        errorMessage = "This car is already listed. Please check the car number.";
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    window.location.href = "/listed";
  };

  const renderField = (field: any) => {
    const baseClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition";
    
    const fieldValue = formData[field.name as keyof typeof formData];
    
    if (field.type === "select") {
      return (
        <select
          name={field.name}
          value={typeof fieldValue === 'string' || typeof fieldValue === 'number' ? fieldValue : ''}
          onChange={handleInputChange}
          className={baseClasses}
          required={field.required}
        >
          {field.options.map((option: string) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type}
        name={field.name}
        value={typeof fieldValue === 'string' || typeof fieldValue === 'number' ? fieldValue : ''}
        onChange={handleInputChange}
        placeholder={field.placeholder}
        pattern={field.pattern}
        min={field.min}
        className={baseClasses}
        required={field.required}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            List your Car
          </h1>

          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-lg font-semibold text-gray-800">Vehicle Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.vehicleDetails.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} {field.required && "*"}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Car description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Photos *
              </label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-4 hover:bg-blue-100 transition flex items-center justify-center gap-2 min-w-32">
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-blue-600">Add Photos</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-600">
                  {formData.photos.length} photo(s) selected
                </span>
              </div>
              
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b pb-2 pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Your Contact Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.contactInfo.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} {field.required && "*"}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>

            <div className="border-b pb-2 pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Additional Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formFields.checkboxes.map(checkbox => (
                <label key={checkbox.name} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name={checkbox.name}
                    checked={formData[checkbox.name as keyof typeof formData] as boolean}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">{checkbox.label}</span>
                </label>
              ))}
            </div>

            {formData.DepositVehicle && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deposit Amount
                </label>
                <input
                  type="number"
                  name="DepositAmount"
                  value={formData.DepositAmount}
                  onChange={handleInputChange}
                  placeholder="10,000"
                  min={0}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}

            <div className="border-b pb-2 pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Vehicle Pickup Address</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.addressFields.map(field => (
                <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} {field.required && "*"}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  GPS Location
                </h3>
                <div className="flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={loadingLocation}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 text-sm"
                  >
                    {loadingLocation ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Navigation className="w-4 h-4" />
                    )}
                    {loadingLocation ? "Getting..." : "Get Location"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setMapOpen(true)}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                  >
                    <MapPin className="w-4 h-4" />
                    Open Map Picker
                  </button>
                </div>
              </div>
              
              {locationError && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
                  {locationError}
                </div>
              )}

              {formData.pickupLatitude && formData.pickupLongitude && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Latitude
                    </label>
                    <input
                      type="text"
                      value={formData.pickupLatitude}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Longitude
                    </label>
                    <input
                      type="text"
                      value={formData.pickupLongitude}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              )}
              
              {showMap && (
                <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(formData.pickupLongitude) - 0.01},${parseFloat(formData.pickupLatitude) - 0.01},${parseFloat(formData.pickupLongitude) + 0.01},${parseFloat(formData.pickupLatitude) + 0.01}&layer=mapnik&marker=${formData.pickupLatitude},${formData.pickupLongitude}`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    title="Location Map"
                  />
                </div>
              )}
            </div>
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loadingLocation || isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Now"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {mapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-5xl h-[80vh] bg-white rounded-lg overflow-hidden shadow-lg flex flex-col">
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Select Location on Map</h3>
                <p className="text-sm text-gray-600 mt-1">Click anywhere on the map to set your location</p>
              </div>
              <button
                onClick={() => setMapOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition text-sm font-medium"
              >
                Close
              </button>
            </div>
            <div className="flex-1">
              <MapContainer center={mapCenter} zoom={14} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler onClick={onMapClick} />
                {markerPos && <Marker position={markerPos} />}
              </MapContainer>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Posted Successfully! 🎉
            </h2>
            <p className="text-gray-600 mb-6">
              Your car is now listed and visible to all users.
            </p>
            <button
              onClick={handleModalClose}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-md"
            >
              View Listed Cars
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCarPage;