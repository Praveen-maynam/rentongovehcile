import React, { useEffect, useRef, useState } from 'react';
import { Check, X, Loader2, CheckCircle, XCircle, Clock, Truck, AlertTriangle } from 'lucide-react';
import io, { Socket } from 'socket.io-client';
import { useBookingModalStore, PendingBooking } from '../../store/booking-modal.store';
import { useNotificationStore } from '../../store/notification.store';

const SOCKET_URL = "http://3.110.122.127:3001";
const API_BASE = "http://3.110.122.127:3000";
const EXPIRY_TIME = 2 * 60 * 1000; // 120 seconds
const WARNING_TIME = 20 * 1000; // 20 seconds before expiry

// Sound file paths
const SOUND_1_NEW_BOOKING = "/sounds/WhatsApp Audio 2025-11-26 at 12.29.34.mp3"; // Owner: New booking
const SOUND_2_WARNING = "/sounds/WhatsApp Audio 2025-11-26 at 12.29.55.mp3"; // Owner: 20 sec warning
const SOUND_3_REJECTION = "/sounds/WhatsApp Audio 2025-11-26 at 12.30.04.mp3"; // Customer: Rejection

// Owner Accept/Reject Modal Component
function OwnerBookingModal() {
  const {
    showOwnerModal,
    setShowOwnerModal,
    currentBooking,
    setCurrentBooking,
    bookingQueue,
    setBookingQueue,
    addBookingToQueue,
    removeBookingFromQueue,
    actionLoading,
    setActionLoading
  } = useBookingModalStore();

  const socketRef = useRef<Socket | null>(null);
  const timersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const warningTimersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const warningAudioRef = useRef<HTMLAudioElement | null>(null);
  const [warningPlayed, setWarningPlayed] = useState<{ [key: string]: boolean }>({});
  const [socketConnected, setSocketConnected] = useState(false);
  const ownerId = localStorage.getItem("userId") || "";

  // Get notification store to add notifications and update status
  const { addNotification, updateNotificationStatus } = useNotificationStore();

  // Play Sound 1: New booking notification for owner
  const playNewBookingSound = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(SOUND_1_NEW_BOOKING);
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    } catch (error) {
      console.log("Could not play new booking sound:", error);
    }
  };

  // Play Sound 2: Warning sound at 10 seconds remaining for owner
  const playWarningSound = () => {
    try {
      if (!warningAudioRef.current) {
        warningAudioRef.current = new Audio(SOUND_2_WARNING);
      }
      warningAudioRef.current.currentTime = 0;
      warningAudioRef.current.play().catch(err => console.log("Warning audio play failed:", err));
    } catch (error) {
      console.log("Could not play warning sound:", error);
    }
  };

  // Check for 20-second warning and auto-expire
  useEffect(() => {
    if (!currentBooking) return;

    const bookingId = currentBooking._id || currentBooking.id || '';

    const interval = setInterval(() => {
      const remaining = (currentBooking.expiresAt || 0) - Date.now();

      // Play warning sound at 20 seconds remaining
      if (remaining <= WARNING_TIME && remaining > 0 && !warningPlayed[bookingId]) {
        console.log('⚠️ 20 seconds warning for booking:', bookingId);
        playWarningSound();
        setWarningPlayed(prev => ({ ...prev, [bookingId]: true }));
      }

      // Auto-expire when time is up
      if (remaining <= 0) {
        clearInterval(interval);
        expireBooking(bookingId);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [currentBooking, warningPlayed]);

  // Initialize Socket.io - runs immediately on component mount
  useEffect(() => {
    if (!ownerId) {
      console.log('⚠️ No ownerId found, socket not initialized');
      return;
    }

    console.log('🔌 Initializing owner socket for:', ownerId);

    socketRef.current = io(SOCKET_URL, {
      query: { userId: ownerId },
      transports: ['websocket', 'polling'], // Allow fallback to polling
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 20000
    });

    socketRef.current.on('connect', () => {
      console.log('✅ Global Socket connected for owner:', ownerId);
      setSocketConnected(true);

      // Re-fetch pending bookings on reconnect
      fetchPendingBookings();
    });

    socketRef.current.on('disconnect', () => {
      console.log('❌ Socket disconnected for owner:', ownerId);
      setSocketConnected(false);
    });

    socketRef.current.on('reconnect', (attemptNumber: number) => {
      console.log('🔄 Socket reconnected for owner after', attemptNumber, 'attempts');
      setSocketConnected(true);
      fetchPendingBookings();
    });

    socketRef.current.on('new-booking-request', (data: PendingBooking) => {
      console.log('🔔 New booking received (global) via socket:', data);
      handleNewBooking(data);
    });

    // Also listen for generic booking events
    socketRef.current.on('booking-created', (data: PendingBooking) => {
      console.log('🔔 Booking created event received:', data);
      handleNewBooking(data);
    });

    return () => {
      console.log('🔌 Cleaning up owner socket');
      if (socketRef.current) socketRef.current.disconnect();
      Object.values(timersRef.current).forEach(clearTimeout);
      Object.values(warningTimersRef.current).forEach(clearTimeout);
    };
  }, [ownerId]);

  // Fetch initial pending bookings and set up polling as backup
  useEffect(() => {
    if (ownerId) {
      fetchPendingBookings();

      // Poll every 10 seconds as a backup in case socket events are missed
      const pollInterval = setInterval(() => {
        fetchPendingBookings();
      }, 10000);

      return () => clearInterval(pollInterval);
    }
  }, [ownerId]);

  // Auto-show modal when there's no current booking but queue has items
  useEffect(() => {
    if (!currentBooking && bookingQueue.length > 0) {
      showNextBooking();
    }
  }, [currentBooking, bookingQueue]);

  const fetchPendingBookings = async () => {
    try {
      const res = await fetch(`${API_BASE}/getPendingBookingsOfOwner/${ownerId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await res.json();
      console.log('📋 Raw API response:', data);

      // Handle various response formats
      let bookings: PendingBooking[] = [];
      if (Array.isArray(data)) {
        bookings = data;
      } else if (data.data && Array.isArray(data.data)) {
        bookings = data.data;
      } else if (data.bookings && Array.isArray(data.bookings)) {
        bookings = data.bookings;
      }

      console.log('📋 Parsed bookings:', bookings.length, bookings);

      // Filter for pending bookings - be more permissive with owner check since API already filters by owner
      const pending = bookings.filter((b) => {
        const statusLower = (b.status || '').toLowerCase();
        const isPending = statusLower === 'pending' || statusLower === '';
        console.log('📋 Booking:', b._id, 'status:', b.status, 'isPending:', isPending);
        return isPending;
      });

      console.log('📋 Pending bookings:', pending.length);

      // Get current queue to compare
      const currentQueue = useBookingModalStore.getState().bookingQueue;
      const currentIds = new Set(currentQueue.map(b => b._id || b.id));

      const bookingsWithTime = pending.map((booking) => ({
        ...booking,
        receivedAt: new Date(booking.createdAt || booking.CreatedAt || Date.now()).getTime(),
        expiresAt: new Date(booking.createdAt || booking.CreatedAt || Date.now()).getTime() + EXPIRY_TIME
      }));

      // Check for NEW bookings that weren't in the queue before
      const newBookings = bookingsWithTime.filter(b => !currentIds.has(b._id || b.id));

      if (newBookings.length > 0) {
        console.log('🆕 Found', newBookings.length, 'new pending booking(s) via polling');

        // Play sound for new bookings found via polling
        playNewBookingSound();
      }

      setBookingQueue(bookingsWithTime);

      bookingsWithTime.forEach((booking) => {
        startExpiryTimer(booking);
      });

      // Auto-show modal if we have bookings and no current booking is displayed
      const hasCurrentBooking = useBookingModalStore.getState().currentBooking;

      if (bookingsWithTime.length > 0 && !hasCurrentBooking) {
        const nextBooking = bookingsWithTime[0];
        setCurrentBooking(nextBooking);
        setShowOwnerModal(true);
      }

    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleNewBooking = (booking: PendingBooking) => {
    const bookingOwnerId = booking.ownerId || booking.OwnerId;
    if (bookingOwnerId !== ownerId) {
      console.log('Skipping booking - current user is not the owner');
      return;
    }

    // Check if this booking is already in the queue
    const existingBooking = bookingQueue.find(b =>
      (b._id || b.id) === (booking._id || booking.id)
    );

    if (existingBooking) {
      console.log('⚠️ Booking already in queue, skipping');
      return;
    }

    console.log('🆕 New booking received for owner - showing modal immediately');

    // Play Sound 1: Buzzer for owner when new booking arrives
    playNewBookingSound();

    const bookingWithTime: PendingBooking = {
      ...booking,
      receivedAt: Date.now(),
      expiresAt: Date.now() + EXPIRY_TIME
    };

    // Add notification for owner about new booking with full details
    const vehicleName = booking.vehicleName || booking.VehicleName || 'your vehicle';
    const customerName = booking.contactName || booking.customerName || 'A customer';
    const bookingId = booking._id || booking.id;
    addNotification({
      type: 'new_booking',
      title: 'Your car has been booked?',
      message: `${customerName} requested to book ${vehicleName}.`,
      vehicleName: vehicleName,
      vehicleId: booking.VechileId || booking.vehicleId,
      bookingId: bookingId,
      userId: ownerId,
      // Include booking details for owner notification
      bookingStatus: 'Pending',
      customerName: customerName,
      fromDate: booking.FromDate || booking.fromDate,
      toDate: booking.ToDate || booking.toDate,
      totalPrice: booking.totalPrice,
    });

    addBookingToQueue(bookingWithTime);
    startExpiryTimer(bookingWithTime);

    // If no current booking is showing, immediately show this one
    if (!currentBooking) {
      setCurrentBooking(bookingWithTime);
      setShowOwnerModal(true);
      console.log('📢 Immediately showing modal for new booking:', bookingWithTime._id || bookingWithTime.id);
    }
  };

  const startExpiryTimer = (booking: PendingBooking) => {
    const bookingId = booking._id || booking.id || '';
    const timeUntilExpiry = (booking.expiresAt || 0) - Date.now();

    if (timeUntilExpiry > 0) {
      timersRef.current[bookingId] = setTimeout(() => {
        expireBooking(bookingId);
      }, timeUntilExpiry);
    }
  };

  const expireBooking = async (bookingId: string) => {
    console.log('⏱️ Booking expired (timeout):', bookingId);

    const expiredBooking = bookingQueue.find(b => (b._id || b.id) === bookingId) || currentBooking;
    const customerId = expiredBooking?.userId || expiredBooking?.customerId;
    const vehicleName = expiredBooking?.vehicleName || expiredBooking?.VehicleName;

    try {
      await fetch(`${API_BASE}/confirmBooking/${bookingId}/Cancelled`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      // Update notification status to Expired
      updateNotificationStatus(bookingId, 'Expired');

      // Notify customer about timeout
      if (socketRef.current?.connected && customerId) {
        socketRef.current.emit('booking-status-update', {
          bookingId,
          customerId,
          status: 'timeout',
          ownerId,
          vehicleName
        });
      }

      removeBookingFromQueue(bookingId);

      if (currentBooking && (currentBooking._id || currentBooking.id) === bookingId) {
        setCurrentBooking(null);
        setShowOwnerModal(false);
      }

      // Clean up timers
      if (timersRef.current[bookingId]) {
        clearTimeout(timersRef.current[bookingId]);
        delete timersRef.current[bookingId];
      }
      if (warningTimersRef.current[bookingId]) {
        clearTimeout(warningTimersRef.current[bookingId]);
        delete warningTimersRef.current[bookingId];
      }

      // Clean up warning played state
      setWarningPlayed(prev => {
        const newState = { ...prev };
        delete newState[bookingId];
        return newState;
      });

    } catch (error) {
      console.error('Error expiring booking:', error);
    }
  };

  const showNextBooking = () => {
    if (bookingQueue.length === 0) return;

    const nextBooking = bookingQueue[0];
    setCurrentBooking(nextBooking);
    setShowOwnerModal(true);
  };

  const handleConfirm = async () => {
    if (!currentBooking) return;

    const bookingId = currentBooking._id || currentBooking.id || '';
    const customerId = currentBooking.userId || currentBooking.customerId;
    const vehicleName = currentBooking.vehicleName || currentBooking.VehicleName;

    setActionLoading(true);

    try {
      const res = await fetch(`${API_BASE}/confirmBooking/${bookingId}/Confirmed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) throw new Error('Failed to confirm booking');

      console.log('✅ Booking confirmed:', bookingId);

      // Update notification status to Confirmed
      updateNotificationStatus(bookingId, 'Confirmed');

      if (socketRef.current?.connected && customerId) {
        socketRef.current.emit('booking-status-update', {
          bookingId,
          customerId,
          status: 'accepted',
          ownerId,
          vehicleName
        });
      }

      // Clean up timers
      if (timersRef.current[bookingId]) {
        clearTimeout(timersRef.current[bookingId]);
        delete timersRef.current[bookingId];
      }
      if (warningTimersRef.current[bookingId]) {
        clearTimeout(warningTimersRef.current[bookingId]);
        delete warningTimersRef.current[bookingId];
      }

      // Clean up warning played state
      setWarningPlayed(prev => {
        const newState = { ...prev };
        delete newState[bookingId];
        return newState;
      });

      removeBookingFromQueue(bookingId);
      setCurrentBooking(null);
      setShowOwnerModal(false);
      setActionLoading(false);

    } catch (error: any) {
      console.error('Error confirming booking:', error);
      alert(`Error: ${error.message}`);
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!currentBooking) return;

    const bookingId = currentBooking._id || currentBooking.id || '';
    const customerId = currentBooking.userId || currentBooking.customerId;
    const vehicleName = currentBooking.vehicleName || currentBooking.VehicleName;

    setActionLoading(true);

    try {
      const res = await fetch(`${API_BASE}/confirmBooking/${bookingId}/Cancelled`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) throw new Error('Failed to reject booking');

      console.log('❌ Booking rejected:', bookingId);

      // Update notification status to Rejected
      updateNotificationStatus(bookingId, 'Rejected');

      if (socketRef.current?.connected && customerId) {
        socketRef.current.emit('booking-status-update', {
          bookingId,
          customerId,
          status: 'rejected',
          ownerId,
          vehicleName
        });
      }

      // Clean up timers
      if (timersRef.current[bookingId]) {
        clearTimeout(timersRef.current[bookingId]);
        delete timersRef.current[bookingId];
      }
      if (warningTimersRef.current[bookingId]) {
        clearTimeout(warningTimersRef.current[bookingId]);
        delete warningTimersRef.current[bookingId];
      }

      // Clean up warning played state
      setWarningPlayed(prev => {
        const newState = { ...prev };
        delete newState[bookingId];
        return newState;
      });

      removeBookingFromQueue(bookingId);
      setCurrentBooking(null);
      setShowOwnerModal(false);
      setActionLoading(false);

    } catch (error: any) {
      console.error('Error rejecting booking:', error);
      alert(`Error: ${error.message}`);
      setActionLoading(false);
    }
  };

  const getRemainingTime = (booking: PendingBooking) => {
    const now = Date.now();
    const remaining = (booking.expiresAt || 0) - now;

    if (remaining <= 0) return '00:00';

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const TimeDisplay = ({ booking }: { booking: PendingBooking }) => {
    const [time, setTime] = useState(getRemainingTime(booking));

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(getRemainingTime(booking));
      }, 1000);

      return () => clearInterval(interval);
    }, [booking]);

    const remaining = (booking.expiresAt || 0) - Date.now();
    const isExpiring = remaining < 30000;
    const isCritical = remaining < 10000;

    return (
      <span className={`font-mono font-bold text-xl ${isCritical ? 'text-red-600 animate-pulse' : isExpiring ? 'text-orange-600 animate-pulse' : 'text-blue-600'}`}>
        {time}
      </span>
    );
  };

  if (!ownerId || !showOwnerModal || !currentBooking) return null;

  const remaining = (currentBooking.expiresAt || 0) - Date.now();
  const isCritical = remaining < 10000;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] p-4">
      <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn ${isCritical ? 'ring-4 ring-red-500 ring-opacity-50' : ''}`}>
        <button
          onClick={() => {
            setShowOwnerModal(false);
            setCurrentBooking(null);
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={actionLoading}
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isCritical ? 'bg-red-100 animate-pulse' : 'bg-blue-100'}`}>
            <Truck className={isCritical ? 'text-red-600' : 'text-blue-600'} size={48} />
          </div>

          <h2 className="text-2xl font-semibold mb-2">
            You've got a new booking!
          </h2>

          {/* Timer */}
          <div className={`flex items-center justify-center gap-2 mb-6 p-3 rounded-xl ${isCritical ? 'bg-red-50' : 'bg-gray-50'}`}>
            <Clock size={24} className={isCritical ? 'text-red-600' : 'text-orange-600'} />
            <TimeDisplay booking={currentBooking} />
            <span className="text-sm text-gray-500">remaining</span>
          </div>

          {isCritical && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 flex items-center justify-center gap-2">
              <AlertTriangle size={20} />
              <span className="font-semibold">Hurry! Time is running out!</span>
            </div>
          )}

          {/* Booking Details */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <p className="font-bold text-lg text-gray-800 mb-2">
              {currentBooking.vehicleName || currentBooking.VehicleName || 'Vehicle'}
            </p>
            <p className="text-sm text-gray-600">
              Customer: {currentBooking.contactName || currentBooking.customerName || 'N/A'}
            </p>
            {currentBooking.totalPrice && (
              <p className="text-sm text-gray-600">
                Total: ₹{currentBooking.totalPrice}
              </p>
            )}
          </div>

          {/* Accept Button */}
          <button
            onClick={handleConfirm}
            disabled={actionLoading}
            className="w-full py-3 rounded-xl text-white font-semibold
                       bg-gradient-to-r from-green-600 to-green-400 hover:opacity-90 mb-4
                       disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {actionLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Check size={20} />
                Accept Booking
              </>
            )}
          </button>

          {/* Reject Button */}
          <button
            onClick={handleReject}
            disabled={actionLoading}
            className="w-full py-3 rounded-xl font-semibold
                       border border-red-500 text-red-600 hover:bg-red-50
                       disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {actionLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <X size={20} />
                Reject Booking
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Customer Waiting Popup Component (120 second countdown) - Original UI Style
function CustomerWaitingPopup() {
  const {
    showWaitingPopup,
    waitingBookingInfo,
    showCustomerTimeoutModal,
    closeWaitingPopup
  } = useBookingModalStore();

  const [remainingTime, setRemainingTime] = useState(120);

  // Reset timer when popup opens with new booking
  useEffect(() => {
    if (showWaitingPopup && waitingBookingInfo) {
      console.log('🕐 Waiting popup opened for booking:', waitingBookingInfo.bookingId);
      console.log('🕐 Expires at:', new Date(waitingBookingInfo.expiresAt).toLocaleTimeString());
      const remaining = Math.max(0, Math.floor((waitingBookingInfo.expiresAt - Date.now()) / 1000));
      setRemainingTime(remaining > 0 ? remaining : 120);
    }
  }, [showWaitingPopup, waitingBookingInfo?.bookingId]);

  // Countdown timer
  useEffect(() => {
    if (!showWaitingPopup || !waitingBookingInfo) return;

    console.log('🕐 Starting countdown timer, remaining:', remainingTime);

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((waitingBookingInfo.expiresAt - Date.now()) / 1000));
      setRemainingTime(remaining);

      if (remaining <= 0) {
        console.log('🕐 Timer expired - showing timeout modal');
        clearInterval(interval);
        const vehicleName = waitingBookingInfo.vehicleName;
        showCustomerTimeoutModal(vehicleName);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [showWaitingPopup, waitingBookingInfo?.bookingId, waitingBookingInfo?.expiresAt, showCustomerTimeoutModal]);

  if (!showWaitingPopup || !waitingBookingInfo) return null;

  // Circular progress variables
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const total = 120;
  const progress = Math.max(0, Math.min(1, remainingTime / total));
  const offset = circumference * (1 - progress);

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        style={{ backdropFilter: "blur(12px)" }}
      />

      {/* Popup card - slides up from bottom */}
      <div
        className="relative w-full bg-white rounded-t-3xl shadow-2xl pb-8 pt-6 px-6 animate-slideUp"
        style={{ maxWidth: "600px" }}
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
          Waiting for response!
        </h2>

        {/* Vehicle Name */}
        {waitingBookingInfo.vehicleName && (
          <p className="text-center text-sm text-gray-600 mb-2">
            {waitingBookingInfo.vehicleName}
          </p>
        )}

        {/* Grey line separator */}
        <div className="w-full h-px bg-gray-300 my-5" />

        {/* Progress bars (top mini indicators) */}
        <div className="flex justify-center gap-3 mb-8 px-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-1 h-1.5 rounded-full transition-opacity duration-300"
              style={{
                background: "linear-gradient(to right, #1A2980, #26D0CE)",
                opacity: i < Math.floor(progress * 4) ? 1 : 0.28,
              }}
            />
          ))}
        </div>

        {/* Circular timer */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-3">
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              style={{ transform: "rotate(-90deg)" }}
            >
              <defs>
                <linearGradient id="waitingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1A2980" />
                  <stop offset="100%" stopColor="#26D0CE" />
                </linearGradient>
              </defs>

              {/* Background circle */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="#E5E7EB"
                strokeWidth={strokeWidth}
                fill="none"
              />

              {/* Progress circle */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="url(#waitingGrad)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                fill="none"
                style={{ transition: "stroke-dashoffset 0.45s ease" }}
              />
            </svg>

            {/* Clock icon in center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="waitingClockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1A2980" />
                    <stop offset="100%" stopColor="#26D0CE" />
                  </linearGradient>
                </defs>
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="url(#waitingClockGrad)"
                  strokeWidth="2"
                  fill="none"
                />
                <path d="M12 6V12L16 14" stroke="url(#waitingClockGrad)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Timer text */}
          <p className="text-lg font-bold text-gray-800">{remainingTime} sec</p>
        </div>

        {/* Cancel button */}
        <div className="mt-6 px-4">
          <button
            onClick={closeWaitingPopup}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg transition font-medium"
          >
            Cancel Waiting
          </button>
        </div>
      </div>
    </div>
  );
}

// Customer Booking Status Modal Component
function CustomerBookingModal() {
  const {
    showCustomerModal,
    customerModalType,
    customerBookingInfo,
    closeCustomerModal
  } = useBookingModalStore();

  const { addNotification } = useNotificationStore();

  const socketRef = useRef<Socket | null>(null);
  const rejectionAudioRef = useRef<HTMLAudioElement | null>(null);
  const customerId = localStorage.getItem("userId") || "";

  // Play Sound 3: Rejection/Timeout sound for customer
  const playRejectionSound = () => {
    try {
      if (!rejectionAudioRef.current) {
        rejectionAudioRef.current = new Audio(SOUND_3_REJECTION);
      }
      rejectionAudioRef.current.currentTime = 0;
      rejectionAudioRef.current.play().catch(err => console.log("Rejection audio play failed:", err));
    } catch (error) {
      console.log("Could not play rejection sound:", error);
    }
  };

  // Initialize Socket.io for customer
  useEffect(() => {
    if (!customerId) return;

    socketRef.current = io(SOCKET_URL, {
      query: { userId: customerId },
      transports: ['websocket'],
      reconnection: true
    });

    socketRef.current.on('connect', () => {
      console.log('✅ Global Socket connected for customer:', customerId);
    });

    socketRef.current.on('booking-status-update', (data: {
      bookingId: string;
      customerId?: string;
      status: 'accepted' | 'rejected' | 'timeout';
      vehicleName?: string;
      ownerName?: string;
    }) => {
      console.log('🔔 Booking status update received (customer):', data);

      // Only process if this event is meant for this customer
      if (data.customerId && data.customerId !== customerId) {
        console.log('Ignoring status update - not for this customer');
        return;
      }

      // Get the current waiting booking info
      const currentWaitingBooking = useBookingModalStore.getState().waitingBookingInfo;
      const isWaitingPopupOpen = useBookingModalStore.getState().showWaitingPopup;

      // Only process if we have a waiting popup open
      if (!isWaitingPopupOpen && !currentWaitingBooking) {
        console.log('Ignoring status update - no waiting popup open');
        return;
      }

      // If we have a specific booking we're waiting for, check if this event is for that booking
      if (currentWaitingBooking && currentWaitingBooking.bookingId &&
          data.bookingId && currentWaitingBooking.bookingId !== data.bookingId) {
        console.log('Ignoring status update - not for current waiting booking');
        return;
      }

      // Close waiting popup and show appropriate result modal
      if (data.status === 'accepted') {
        // Add notification for customer - booking accepted
        addNotification({
          type: 'booking_confirmed',
          title: 'Booking Confirmed!',
          message: `Your booking for ${data.vehicleName || 'the vehicle'} has been accepted by the owner.`,
          vehicleName: data.vehicleName,
          bookingId: data.bookingId,
          userId: customerId, // Include userId for backend sync
        });

        useBookingModalStore.getState().showCustomerAcceptedModal(
          data.vehicleName,
          data.ownerName
        );
      } else if (data.status === 'rejected') {
        // Add notification for customer - booking rejected
        addNotification({
          type: 'booking_declined',
          title: 'Booking Declined',
          message: `Your booking for ${data.vehicleName || 'the vehicle'} was declined by the owner.`,
          vehicleName: data.vehicleName,
          bookingId: data.bookingId,
          userId: customerId, // Include userId for backend sync
        });

        // Play Sound 3: Rejection buzzer for customer
        playRejectionSound();
        useBookingModalStore.getState().showCustomerRejectedModal(
          data.vehicleName,
          data.ownerName
        );
      } else if (data.status === 'timeout') {
        // Add notification for customer - booking timed out
        addNotification({
          type: 'booking_timeout',
          title: 'Booking Auto-Cancelled',
          message: `Your booking for ${data.vehicleName || 'the vehicle'} was auto-cancelled because the owner did not respond in time.`,
          vehicleName: data.vehicleName,
          bookingId: data.bookingId,
          userId: customerId, // Include userId for backend sync
        });

        // Play Sound 3: Timeout buzzer for customer (same as rejection)
        playRejectionSound();
        useBookingModalStore.getState().showCustomerTimeoutModal(
          data.vehicleName
        );
      }
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [customerId]);

  // Play rejection sound when modal shows with rejected or timeout type
  useEffect(() => {
    if (showCustomerModal && (customerModalType === 'rejected' || customerModalType === 'timeout')) {
      console.log('🔊 Playing rejection sound for customer modal type:', customerModalType);
      playRejectionSound();
    }
  }, [showCustomerModal, customerModalType]);

  if (!showCustomerModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999] p-4">
      {/* Accepted Modal - Matching Figma Design */}
      {customerModalType === 'accepted' && (
        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 relative animate-fadeIn">
          <div className="text-center">
            {/* Blue circle with white checkmark */}
            <div className="w-24 h-24 bg-[#4AC9E3] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-white" size={48} strokeWidth={3} />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your booking is confirmed
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              with the owner
            </h3>

            <p className="text-gray-500 text-sm mb-8">
              Please meet at the pickup point and complete the process offline.
            </p>

            {/* Required Documents Section */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <p className="font-semibold text-gray-800 mb-3">Required Documents</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
                  Driving License
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
                  Aadhar Card
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
                  Deposit money :- 10,000
                </li>
              </ul>
              <p className="text-red-500 text-xs mt-3 flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                Don't forget to carry these documents.
              </p>
            </div>

            <button
              onClick={closeCustomerModal}
              className="w-full py-3 rounded-xl text-white font-semibold
                         bg-[#4AC9E3] hover:bg-[#3BB8D2] transition-colors"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Rejected Modal */}
      {customerModalType === 'rejected' && (
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 relative animate-fadeIn">
          <button
            onClick={closeCustomerModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>

          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
              <XCircle className="text-red-600" size={48} />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Booking Declined
            </h2>

            <p className="text-gray-600 text-lg mb-6">
              Unfortunately, your booking request was not accepted by the owner. Please try another vehicle.
            </p>

            {customerBookingInfo?.vehicleName && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5 mb-6">
                <p className="text-red-800 font-bold text-lg">
                  {customerBookingInfo.vehicleName}
                </p>
              </div>
            )}

            <button
              onClick={closeCustomerModal}
              className="w-full py-3 rounded-xl text-white font-semibold
                         bg-gradient-to-r from-blue-600 to-blue-400 hover:opacity-90"
            >
              Browse Other Vehicles
            </button>
          </div>
        </div>
      )}

      {/* Timeout/Autocancelled Modal */}
      {customerModalType === 'timeout' && (
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 relative animate-fadeIn">
          <button
            onClick={closeCustomerModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>

          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
              <Clock className="text-orange-600" size={48} />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Booking Autocancelled
            </h2>

            <p className="text-gray-600 text-lg mb-6">
              The owner did not respond within the time limit. Your booking has been automatically cancelled. Please try booking again or choose another vehicle.
            </p>

            {customerBookingInfo?.vehicleName && (
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-5 mb-6">
                <p className="text-orange-800 font-bold text-lg">
                  {customerBookingInfo.vehicleName}
                </p>
              </div>
            )}

            <button
              onClick={closeCustomerModal}
              className="w-full py-3 rounded-xl text-white font-semibold
                         bg-gradient-to-r from-blue-600 to-blue-400 hover:opacity-90"
            >
              Browse Other Vehicles
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Global Booking Modals Component
export default function GlobalBookingModals() {
  return (
    <>
      <OwnerBookingModal />
      <CustomerWaitingPopup />
      <CustomerBookingModal />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.28s ease-out;
        }
      `}</style>
    </>
  );
}
