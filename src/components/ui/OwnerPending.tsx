
// import React, { useEffect, useState } from "react";
// import SimpleAcceptRejectModal from "./OwnerModal";

// export default function OwnerPending() {
//   const [pendingBooking, setPendingBooking] = useState<any | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   const ownerId = localStorage.getItem("userId"); // owner id stored earlier

//   // ===========================
//   // POLL OWNER PENDING BOOKINGS
//   // ===========================
//   const fetchPending = async () => {
//     try {
//       const res = await fetch(`http://3.110.122.127:3000/getPendingBookingsOfOwner/${ownerId}`);
//       const data = await res.json();

//       console.log("Pending bookings:", data);

//       if (data.pending && data.pending.length > 0) {
//         const latest = data.pending[0];

//         // if modal not already opened
//         if (!showModal || !pendingBooking || pendingBooking._id !== latest._id) {
//           setPendingBooking(latest);
//           setShowModal(true);
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching pending bookings:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPending();
//     const timer = setInterval(fetchPending, 5000); // every 5s
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <>
//       <h1 className="text-xl font-bold p-4">Owner Dashboard</h1>

//       {/* Auto-popup modal */}
//       {pendingBooking && (
//         <SimpleAcceptRejectModal
//           isOpen={showModal}
//           bookingId={pendingBooking._id}
//           onAccept={() => {
//             console.log("Owner accepted booking");
//             setShowModal(false);
//             setPendingBooking(null);
//           }}
//           onReject={() => {
//             console.log("Owner rejected booking");
//             setShowModal(false);
//             setPendingBooking(null);
//           }}
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import SimpleAcceptRejectModal from "./OwnerModal";

import apiService, { acceptBooking, rejectBooking } from "../../services/api.service";


interface Booking {
  _id: string;
  VechileId: string;
  vechileType: string;
  userId: string;
  FromDate: string;
  ToDate: string;
  status: string;

}

interface PendingBookingsResponse {
  pending?: Booking[];
  data?: {
    pending?: Booking[];
  };
}

export default function OwnerPending() {
  const [pendingBooking, setPendingBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);

  const ownerId = localStorage.getItem("userId") || "";


  const fetchPending = async () => {
    if (!ownerId) return;

    try {
      const response = await apiService.booking.getPendingBookingsOfOwner(ownerId);
      console.log("Pending bookings response:", response);


      const data = response?.data || response;

      console.log("Processed data:", data);

      // Handle different response structures
      const pendingList = data?.pending || data?.data?.pending || [];

      if (Array.isArray(pendingList) && pendingList.length > 0) {
        const latest = pendingList[0];

        // Open modal if not already showing this booking
        if (!showModal || !pendingBooking || pendingBooking._id !== latest._id) {
          setPendingBooking(latest);
          setShowModal(true);
        }
      }
    } catch (err) {
      console.error("Error fetching pending bookings:", err);
    }
  };

  useEffect(() => {
    fetchPending();
    const timer = setInterval(fetchPending, 3000); // poll every 3s
    return () => clearInterval(timer);

  }, []);

  const handleAccept = async () => {
    if (!pendingBooking) return;
    try {
      await acceptBooking(pendingBooking._id);
      setShowModal(false);
      setPendingBooking(null);
      // Optionally refresh the list
      fetchPending();
    } catch (err) {
      console.error("Error accepting booking:", err);
    }
  };

  const handleReject = async () => {
    if (!pendingBooking) return;
    try {
      await rejectBooking(pendingBooking._id);
      setShowModal(false);
      setPendingBooking(null);
      // Optionally refresh the list
      fetchPending();
    } catch (err) {
      console.error("Error rejecting booking:", err);
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold p-4">Owner Dashboard</h1>

      {pendingBooking && (
        <SimpleAcceptRejectModal
          isOpen={showModal}
          bookingId={pendingBooking._id}
          onAccept={handleAccept}
          onReject={handleReject}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}