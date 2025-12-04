// import React, { useState } from "react";
// import { Truck, X } from "lucide-react";

// interface SimpleAcceptRejectProps {
//   isOpen: boolean;
//   bookingId: string;
//   onAccept: () => void;
//   onReject: () => void;
//   onClose: () => void;
// }

// export default function SimpleAcceptRejectModal({
//   isOpen,
//   bookingId,
//   onAccept,
//   onReject,
//   onClose,
// }: SimpleAcceptRejectProps) {
//   const [loading, setLoading] = useState(false);

//   if (!isOpen) return null;

//   // ========================
//   // ACCEPT - Uses POST /confirmBooking/{bookingId}/conform
//   // ========================
//   const handleAccept = async () => {
//     try {
//       setLoading(true);

//       console.log("🔔 Accepting booking with ID:", bookingId);
//       const apiUrl = `http://3.110.122.127:3000/confirmBooking/${bookingId}/conform`;
//       console.log("🔗 API URL:", apiUrl);

//       const res = await fetch(apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("📦 Response status:", res.status);
//       const responseText = await res.text();
//       console.log("📦 Response body:", responseText);

//       if (!res.ok) {
//         console.error("❌ Accept API failed - Status:", res.status, "Response:", responseText);
//         alert(`Accept API failed: ${res.status} - ${responseText || 'Unknown error'}`);
//         return;
//       }

//       console.log("✅ Booking accepted successfully!");
//       onAccept();
//       onClose();
//     } catch (error: any) {
//       console.error("❌ Accept error:", error);
//       alert(`Something went wrong: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ========================
//   // REJECT - Uses POST /confirmBooking/{bookingId}/Cancelled
//   // ========================
//   const handleReject = async () => {
//     try {
//       setLoading(true);

//       console.log("🔔 Rejecting booking with ID:", bookingId);
//       const apiUrl = `http://3.110.122.127:3000/confirmBooking/${bookingId}/Cancelled`;
//       console.log("🔗 API URL:", apiUrl);

//       const res = await fetch(apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("📦 Response status:", res.status);
//       const responseText = await res.text();
//       console.log("📦 Response body:", responseText);

//       if (!res.ok) {
//         console.error("❌ Reject API failed - Status:", res.status, "Response:", responseText);
//         alert(`Reject API failed: ${res.status} - ${responseText || 'Unknown error'}`);
//         return;
//       }

//       console.log("✅ Booking rejected successfully!");
//       onReject();
//       onClose();
//     } catch (error: any) {
//       console.error("❌ Reject error:", error);
//       alert(`Something went wrong: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-xl text-center relative">

//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
//         >
//           <X size={20} />
//         </button>

//         {/* Icon Section */}
//         <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//           <Truck className="text-blue-600" size={48} />
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl font-semibold mb-8">
//           You've got a new booking!
//         </h2>

//         {/* Accept */}
//         <button
//           onClick={handleAccept}
//           disabled={loading}
//           className="w-full py-3 rounded-xl text-white font-semibold 
//                      bg-gradient-to-r from-blue-700 to-blue-400 hover:opacity-90 mb-4
//                      disabled:opacity-50"
//         >
//           {loading ? "Please wait..." : "Accept"}
//         </button>

//         {/* Reject */}
//         <button
//           onClick={handleReject}
//           disabled={loading}
//           className="w-full py-3 rounded-xl font-semibold 
//                      border border-red-500 text-red-600 hover:bg-red-50
//                      disabled:opacity-50"
//         >
//           {loading ? "Please wait..." : "Reject"}
//         </button>

//       </div>
//     </div>
//   );
// }





import React, { useState } from "react";
import { Truck, X } from "lucide-react";
import apiService from "../../services/api.service";

interface SimpleAcceptRejectProps {
  isOpen: boolean;
  bookingId: string;
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}

export default function SimpleAcceptRejectModal({
  isOpen,
  bookingId,
  onAccept,
  onReject,
  onClose,
}: SimpleAcceptRejectProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAccept = async () => {
    try {
      setLoading(true);
      console.log("🔔 Accepting booking with ID:", bookingId);

      await apiService.booking.confirmBooking(bookingId);

      console.log("✅ Booking accepted successfully!");
      onAccept();
      onClose();
    } catch (error: any) {
      console.error("❌ Accept booking error:", error);
      alert(`Failed to accept booking: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      console.log("🔔 Rejecting booking with ID:", bookingId);

      await apiService.booking.cancelBooking(bookingId);

      console.log("✅ Booking rejected successfully!");
      onReject();
      onClose();
    } catch (error: any) {
      console.error("❌ Reject booking error:", error);
      alert(`Failed to reject booking: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-xl text-center relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Truck className="text-blue-600" size={48} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-8">
          You've got a new booking!
        </h2>

        {/* Accept Button */}
        <button
          onClick={handleAccept}
          disabled={loading}
          className="w-full py-3 rounded-xl text-white font-semibold 
                     bg-gradient-to-r from-blue-700 to-blue-400 hover:opacity-90 mb-4
                     disabled:opacity-50 transition"
        >
          {loading ? "Please wait..." : "Accept"}
        </button>

        {/* Reject Button */}
        <button
          onClick={handleReject}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold 
                     border border-red-500 text-red-600 hover:bg-red-50
                     disabled:opacity-50 transition"
        >
          {loading ? "Please wait..." : "Reject"}
        </button>

      </div>
    </div>
  );
}