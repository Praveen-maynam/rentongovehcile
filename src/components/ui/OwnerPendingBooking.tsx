import React, { useEffect, useState, useRef, useCallback } from "react";
import SimpleAcceptRejectModal from "./OwnerModal";
import { useNotificationStore } from "../../store/notification.store";

import {
  getOwnerPendingBookings,
  acceptBooking,
  rejectBooking
} from "../../services/api.service";


interface PendingBooking {
  _id: string;
  customerId?: string;
  userId?: string;
  ownerId?: string;
  VechileId?: string;
  vechileType?: string;
  FromDate?: string;
  ToDate?: string;
  FromTime?: string;
  ToTime?: string;
  status?: string;
  contactName?: string;
  contactNumber?: string;
  totalPrice?: number;
}

export default function OwnerPendingBookings() {
  const [pendingBooking, setPendingBooking] = useState<PendingBooking | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastBookingIdRef = useRef<string | null>(null);

  // Store
  const { addNotification } = useNotificationStore();

  // ----------------------------------------------------
  // 🔔 INITIALIZE AUDIO ONLY ONCE
  // ----------------------------------------------------
  useEffect(() => {
    audioRef.current = new Audio("/sounds/new-booking.mp3");
  }, []);

  // ----------------------------------------------------
  // 🔔 Play sound **2 times**
  // ----------------------------------------------------
  const playNotificationSoundTwice = useCallback(() => {
    if (!audioRef.current) return;

    let count = 0;
    audioRef.current.currentTime = 0;

    const playAgain = () => {
      count++;
      if (count < 2) {
        audioRef.current!.currentTime = 0;
        audioRef.current!.play().catch(() => { });
      }
    };

    audioRef.current.onended = playAgain;
    audioRef.current.play().catch(() => { });
  }, []);

  // ----------------------------------------------------
  // 🔔 Play sound **1 time** (Single)
  // ----------------------------------------------------
  const playNotificationSoundSingle = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.loop = false;
    audioRef.current.currentTime = 0;
    audioRef.current.onended = null; // Ensure no loop/repeat
    audioRef.current.play().catch(() => { });
  }, []);

  // ----------------------------------------------------
  // ⛔ Stop sound immediately
  // ----------------------------------------------------
  const stopNotificationSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.onended = null; // cancel second play
    }
  }, []);

  // ----------------------------------------------------
  // Browser notification
  // ----------------------------------------------------
  const showBrowserNotification = (booking: PendingBooking) => {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification("New Booking Request!", {
        body: `You have a new booking request for your vehicle.`,
        icon: "/logo192.png",
        tag: booking._id,
        requireInteraction: true
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  };


  const showOwnerNotification = (
    title: string,
    message: string,
    type: "booking_confirmed" | "booking_declined" | "general" = "general"
  ) => {
    playNotificationSoundSingle();

    addNotification({
      type,
      title,
      message,
      vehicleId: pendingBooking?.VechileId,
      vehicleName: pendingBooking?.vechileType,
      bookingId: pendingBooking?._id
    });
  };

  // ----------------------------------------------------
  // Get owner ID
  // ----------------------------------------------------
  const getOwnerId = useCallback((): string | null => {
    let id = localStorage.getItem("userId");
    const isMongoId = (s: string) => /^[a-f0-9]{24}$/i.test(s);

    if (id && isMongoId(id)) return id;

    try {
      const profile = JSON.parse(localStorage.getItem("userProfile") || "{}");
      if (profile.userId && isMongoId(profile.userId)) return profile.userId;
      if (profile._id && isMongoId(profile._id)) return profile._id;
    } catch { }

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.userId && isMongoId(user.userId)) return user.userId;
      if (user._id && isMongoId(user._id)) return user._id;
    } catch { }

    return localStorage.getItem("ownerId") || id;
  }, []);

  useEffect(() => {
    const updateId = () => {
      const newId = getOwnerId();
      if (newId !== ownerId) setOwnerId(newId);
    };

    updateId();
    const interval = setInterval(updateId, 2000);
    return () => clearInterval(interval);
  }, [getOwnerId, ownerId]);

  // ----------------------------------------------------
  // Fetch pending bookings
  // ----------------------------------------------------
  const fetchPendingBookings = useCallback(async () => {
    if (!ownerId) return;

    try {
      const data = await getOwnerPendingBookings(ownerId);
      const pending = data.pending || data.data || data.bookings || [];

      if (pending.length > 0) {
        const latest = pending[0];
        if (latest._id !== lastBookingIdRef.current) {
          lastBookingIdRef.current = latest._id;
          setPendingBooking(latest);
          setShowModal(true);

          // Play double sound
          playNotificationSoundTwice();
          showBrowserNotification(latest);

          addNotification({
            type: "general",
            title: "New Booking Request!",
            message: "You have received a new booking request.",
            vehicleId: latest.VechileId,
            vehicleName: latest.vechileType,
            bookingId: latest._id
          });
        }
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  }, [ownerId, playNotificationSoundTwice, addNotification]);


  useEffect(() => {
    if (!ownerId) return;

    fetchPendingBookings();
    pollingRef.current = setInterval(fetchPendingBookings, 3000);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [ownerId, fetchPendingBookings]);

  // ----------------------------------------------------
  // Owner actions
  // ----------------------------------------------------
  const handleAccept = async () => {
    if (!pendingBooking?._id) return;

    await acceptBooking(pendingBooking._id);
    stopNotificationSound();

    showOwnerNotification("Booking Accepted!", "You accepted the booking.");
    setShowModal(false);
    setPendingBooking(null);
  };

  const handleReject = async () => {
    if (!pendingBooking?._id) return;

    await rejectBooking(pendingBooking._id);
    stopNotificationSound();

    showOwnerNotification("Booking Rejected", "You rejected the booking.");
    setShowModal(false);
    setPendingBooking(null);
  };

  const handleClose = () => {
    stopNotificationSound();
    setShowModal(false);
  };

  // ----------------------------------------------------
  return (
    <>
      {showModal && pendingBooking && (
        <SimpleAcceptRejectModal
          isOpen={true}
          bookingId={pendingBooking._id}
          onAccept={handleAccept}
          onReject={handleReject}
          onClose={handleClose}
        />
      )}
    </>
  );
}
