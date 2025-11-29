
import React, { useEffect, useState } from "react";
import SimpleAcceptRejectModal from "./OwnerModal";

export default function OwnerPending() {
  const [pendingBooking, setPendingBooking] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const ownerId = localStorage.getItem("userId"); // owner id stored earlier

  // ===========================
  // POLL OWNER PENDING BOOKINGS
  // ===========================
  const fetchPending = async () => {
    try {
      const res = await fetch(`http://3.110.122.127:3000/getPendingBookingsOfOwner/${ownerId}`);
      const data = await res.json();

      console.log("Pending bookings:", data);

      if (data.pending && data.pending.length > 0) {
        const latest = data.pending[0];

        // if modal not already opened
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
    const timer = setInterval(fetchPending, 5000); // every 5s
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold p-4">Owner Dashboard</h1>

      {/* Auto-popup modal */}
      {pendingBooking && (
        <SimpleAcceptRejectModal
          isOpen={showModal}
          bookingId={pendingBooking._id}
          onAccept={() => {
            console.log("Owner accepted booking");
            setShowModal(false);
            setPendingBooking(null);
          }}
          onReject={() => {
            console.log("Owner rejected booking");
            setShowModal(false);
            setPendingBooking(null);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}