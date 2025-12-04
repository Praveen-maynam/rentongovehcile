import React, { useEffect, useRef, useState } from 'react';
import { Check, X, Loader2, Clock, Truck, AlertTriangle } from 'lucide-react';
import io, { Socket } from 'socket.io-client';
import { useBookingModalStore, PendingBooking } from '../../store/booking-modal.store';
import { useNotificationStore } from '../../store/notification.store';
import { API_BASE_URL, SOCKET_URL } from '../../services/api.service';

const EXPIRY_TIME = 2 * 60 * 1000; // 120 seconds
const WARNING_TIME = 0 * 1000; // 0 seconds before expiry

// Sound file paths
const SOUND_3_NEW_BOOKING = "/sounds/new-booking.mp3"; /// Owner: New booking
const SOUND_2_WARNING = "/sounds/WhatsApp Audio 2025-11-26 at 12.29.55.mp3"; // Owner: 20 sec warning

export default function OwnerBookingModal() {
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

    // Play Sound 1: New booking notification for owner (DOUBLE SOUND)
    const playNewBookingSound = () => {
        try {
            if (!audioRef.current) {
                audioRef.current = new Audio(SOUND_3_NEW_BOOKING);
            }

            let count = 0;
            audioRef.current.loop = false;
            audioRef.current.currentTime = 0;

            const playAgain = () => {
                count++;
                if (count < 2) {
                    audioRef.current!.currentTime = 0;
                    audioRef.current!.play().catch(err => console.log("Audio play failed:", err));
                } else {
                    audioRef.current?.removeEventListener('ended', playAgain);
                }
            };

            audioRef.current.onended = null;
            audioRef.current.addEventListener('ended', playAgain);

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
            }, 3000);

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
            const res = await fetch(`${API_BASE_URL}/getPendingBookingsOfOwner/${ownerId}`);
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
            await fetch(`${API_BASE_URL}/confirmBooking/${bookingId}/Cancelled`, {
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
            const res = await fetch(`${API_BASE_URL}/confirmBooking/${bookingId}/Confirmed`, {
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
            const res = await fetch(`${API_BASE_URL}/confirmBooking/${bookingId}/Cancelled`, {
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
