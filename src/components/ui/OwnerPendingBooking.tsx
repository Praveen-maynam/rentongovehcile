
import React, { useEffect, useState, useRef, useCallback } from "react";
import SimpleAcceptRejectModal from "./OwnerModal";
import { useNotificationStore } from "../../store/notification.store";

const API_BASE = "http://3.110.122.127:3000";

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

  // Use the notification store for backend notifications
  const { addNotification } = useNotificationStore();

  // Get owner ID from localStorage - try multiple sources
  const getOwnerId = useCallback((): string | null => {
    // First try direct userId
    let id = localStorage.getItem("userId");

    // Check if it looks like a MongoDB ID (24 hex characters)
    const isMongoId = (str: string) => /^[a-f0-9]{24}$/i.test(str);

    if (id && isMongoId(id)) {
      return id;
    }

    // Try to get from userProfile
    try {
      const userProfile = localStorage.getItem("userProfile");
      if (userProfile) {
        const profile = JSON.parse(userProfile);
        if (profile.userId && isMongoId(profile.userId)) {
          return profile.userId;
        }
        if (profile._id && isMongoId(profile._id)) {
          return profile._id;
        }
      }
    } catch (e) {
      console.log("Could not parse userProfile");
    }

    // Try to get from user object
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        if (userData.userId && isMongoId(userData.userId)) {
          return userData.userId;
        }
        if (userData._id && isMongoId(userData._id)) {
          return userData._id;
        }
      }
    } catch (e) {
      console.log("Could not parse user");
    }

    // Try ownerId key
    const ownerIdKey = localStorage.getItem("ownerId");
    if (ownerIdKey && isMongoId(ownerIdKey)) {
      return ownerIdKey;
    }

    // Return whatever we have (might be Google UID)
    return id;
  }, []);

  // Update ownerId on mount and periodically check for changes
  useEffect(() => {
    const updateOwnerId = () => {
      const newOwnerId = getOwnerId();
      if (newOwnerId !== ownerId) {
        console.log("🔑 Owner ID updated:", newOwnerId);
        setOwnerId(newOwnerId);
      }
    };

    updateOwnerId();

    // Check for ownerId changes every 2 seconds (in case user logs in)
    const ownerIdCheckInterval = setInterval(updateOwnerId, 2000);

    return () => clearInterval(ownerIdCheckInterval);
  }, [getOwnerId, ownerId]);

  // Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Play notification sound
  const playNotificationSound = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/WhatsApp Audio 2025-11-26 at 12.29.34.mp3");
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    } catch (error) {
      console.log("Could not play notification sound:", error);
    }
  };

  // Show browser notification
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

  // Add notification to the store (backend notification system)
  const showOwnerNotification = (title: string, message: string, type: 'booking_confirmed' | 'booking_declined' | 'general' = 'general') => {
    playNotificationSound();

    // Add to notification store
    addNotification({
      type,
      title,
      message,
      vehicleId: pendingBooking?.VechileId,
      vehicleName: pendingBooking?.vechileType,
      bookingId: pendingBooking?._id
    });
  };

  // Check if ID is valid MongoDB format
  const isValidMongoId = (id: string | null): boolean => {
    if (!id) return false;
    return /^[a-f0-9]{24}$/i.test(id);
  };

  // Fetch pending bookings for owner - wrapped in useCallback
  const fetchPendingBookings = useCallback(async () => {
    if (!ownerId) {
      return;
    }

    // Warn but still try if ownerId is not a valid MongoDB ID
    if (!isValidMongoId(ownerId)) {
      console.log("⚠ Owner ID may not be a valid MongoDB ID:", ownerId);
    }

    try {
      console.log("🔍 Polling for pending bookings for owner:", ownerId);
      const response = await fetch(`${API_BASE}/getPendingBookingsOfOwner/${ownerId}`);

      if (!response.ok) {
        console.log("❌ API returned error status:", response.status);
        return;
      }

      const data = await response.json();
      console.log("📦 Owner pending bookings response:", data);

      // Check for pending bookings in different response formats
      const pendingBookings = data.pending || data.data || data.bookings || [];
      console.log("📋 Pending bookings count:", pendingBookings.length);

      if (pendingBookings.length > 0) {
        const latestBooking = pendingBookings[0];
        console.log("📋 Latest booking ID:", latestBooking._id, "Last shown:", lastBookingIdRef.current);

        // Only show modal if it's a NEW booking (different from last one)
        if (latestBooking._id !== lastBookingIdRef.current) {
          console.log("🔔 ====== NEW PENDING BOOKING FOUND ======");
          console.log("🔔 Booking ID:", latestBooking._id);
          console.log("🔔 Opening modal...");

          lastBookingIdRef.current = latestBooking._id;
          setPendingBooking(latestBooking);
          setShowModal(true);

          // Play sound and show notifications
          playNotificationSound();
          showBrowserNotification(latestBooking);

          // Add to notification store
          addNotification({
            type: 'general',
            title: "New Booking Request!",
            message: "You have received a new booking request for your vehicle.",
            vehicleId: latestBooking.VechileId,
            vehicleName: latestBooking.vechileType,
            bookingId: latestBooking._id
          });
        }
      } else {
        console.log("📭 No pending bookings found for owner:", ownerId);
      }
    } catch (error) {
      console.error("❌ Error fetching owner pending bookings:", error);
    }
  }, [ownerId, addNotification, playNotificationSound, showBrowserNotification]);

  // Start polling when ownerId is available
  useEffect(() => {
    // Only poll if user is logged in and might be an owner
    if (!ownerId) {
      console.log("⚠ No owner ID, not starting polling");
      return;
    }

    console.log("🚀 Starting owner pending bookings polling for owner:", ownerId);

    // Initial fetch immediately
    fetchPendingBookings();

    // Poll every 5 seconds
    pollingRef.current = setInterval(() => {
      fetchPendingBookings();
    }, 5000);

    return () => {
      if (pollingRef.current) {
        console.log("🛑 Stopping owner pending bookings polling");
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [ownerId, fetchPendingBookings]);

  // Handle accept
  const handleAccept = () => {
    console.log("Owner accepted booking:", pendingBooking?._id);
    showOwnerNotification("Booking Accepted!", "You have successfully accepted the booking request.");
    setShowModal(false);
    setPendingBooking(null);
  };

  // Handle reject
  const handleReject = () => {
    console.log("Owner rejected booking:", pendingBooking?._id);
    showOwnerNotification("Booking Rejected", "You have rejected the booking request.");
    setShowModal(false);
    setPendingBooking(null);
  };

  // Handle close
  const handleClose = () => {
    console.log("Owner closed modal without action");
    setShowModal(false);
  };

  // Debug: Log modal state changes
  useEffect(() => {
    console.log("🎭 Modal State Changed - showModal:", showModal, "pendingBooking:", pendingBooking?._id);
  }, [showModal, pendingBooking]);

  return (
    <>
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ display: 'none' }}>
          Owner Pending Bookings Active - Owner ID: {ownerId} - Modal: {showModal ? 'OPEN' : 'CLOSED'}
        </div>
      )}

      {/* Modal for pending booking - show when both conditions are met */}
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