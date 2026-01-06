


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore, Notification } from "../../../store/notification.store";
import CarLogo from "../../../assets/icons/CarLogo.png";
import BikeLogo from "../../../assets/icons/sportbike.png"; // Add this import
import AutomaticLogo from "../../../assets/icons/AutomaticLogo.png";
import DriverLogo from "../../../assets/icons/DriverLogo.png";
import fuel from "../../../assets/icons/fuel.jpeg";
import {
  Bell,
  Check,
  X,
  Trash2,
  RefreshCw,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Car,
  Bike,
} from "lucide-react";

// ⏱️ EXPIRY TIME: 2 minutes
const EXPIRY_TIME = 2 * 60 * 1000;

// ✅ VEHICLE TYPE DETECTION
const getVehicleType = (notification: any): 'car' | 'bike' | 'unknown' => {
  // Method 1: Check explicit vehicle type field
  if (notification.vehicleType) {
    const type = notification.vehicleType.toLowerCase();
    if (type.includes('bike') || type.includes('motorcycle') || type === 'two-wheeler') {
      return 'bike';
    }
    if (type.includes('car') || type.includes('four-wheeler')) {
      return 'car';
    }
  }

  // Method 2: Check vehicle name for bike keywords
  const vehicleName = (
    notification.vehicleName ||
    notification.VehicleName ||
    notification.vehicle_name ||
    notification.carName ||
    notification.CarName ||
    notification.bikeName ||
    notification.BikeName ||
    notification.name ||
    ''
  ).toLowerCase();

  const bikeKeywords = ['bike', 'motorcycle', 'scooter', 'scooty', 'activa', 'access', 'jupiter', 'dio', 'pulsar', 'ktm', 'royal enfield', 'bullet', 'apache', 'fz', 'r15', 'ninja'];
  const carKeywords = ['car', 'suv', 'sedan', 'hatchback', 'swift', 'i20', 'city', 'creta', 'fortuner', 'innova'];

  for (const keyword of bikeKeywords) {
    if (vehicleName.includes(keyword)) {
      return 'bike';
    }
  }

  for (const keyword of carKeywords) {
    if (vehicleName.includes(keyword)) {
      return 'car';
    }
  }

  // Method 3: Check seating capacity (bikes typically 1-2, cars 4+)
  const seaters = notification.seaters || notification.Carseater || localStorage.getItem('seaters') || '';
  const seaterNum = parseInt(seaters);
  if (seaterNum && seaterNum <= 2) {
    return 'bike';
  }
  if (seaterNum && seaterNum >= 4) {
    return 'car';
  }

  // Method 4: Check notification type or category
  if (notification.type?.toLowerCase().includes('bike') || notification.category?.toLowerCase().includes('bike')) {
    return 'bike';
  }
  if (notification.type?.toLowerCase().includes('car') || notification.category?.toLowerCase().includes('car')) {
    return 'car';
  }

  // Default to car if unknown
  return 'car';
};

// ✅ GET VEHICLE IMAGE BASED ON TYPE
const getVehicleImage = (notification: any): string => {
  const vehicleType = getVehicleType(notification);
  
  console.log('🚗 Vehicle type detected:', vehicleType, 'for notification:', notification.id);
  
  // If notification has a custom image URL, use it
  if (notification.vehicleImage || notification.imageUrl) {
    return notification.vehicleImage || notification.imageUrl;
  }
  
  // Otherwise use default based on vehicle type
  return vehicleType === 'bike' ? BikeLogo : CarLogo;
};

// ✅ GET VEHICLE ICON BASED ON TYPE
const getVehicleIcon = (notification: any) => {
  const vehicleType = getVehicleType(notification);
  return vehicleType === 'bike' ? Bike : Car;
};

// ✅ UNIVERSAL HELPER: Extract vehicle name
const getVehicleName = (notification: any): string => {
  const vehicleName =
    notification.vehicleName ||
    notification.VehicleName ||
    notification.vehicle_name ||
    notification.carName ||
    notification.CarName ||
    notification.bikeName ||
    notification.BikeName ||
    notification.name ||
    notification.model ||
    notification.Model ||
    (notification.vehicleId ? `Vehicle ${notification.vehicleId}` : 'Vehicle');

  console.log('🚗 Vehicle name for notification:', notification.id, '→', vehicleName);
  return vehicleName;
};

// ✅ Get status badge
const getStatusBadge = (notif: Notification) => {
  if (notif.type === 'booking_confirmed') {
    return {
      color: 'bg-green-100 text-green-800 border-green-200',
      text: 'Confirmed',
      icon: CheckCircle,
    };
  }
  if (notif.type === 'booking_declined') {
    return {
      color: 'bg-red-100 text-red-800 border-red-200',
      text: 'Cancelled',
      icon: XCircle,
    };
  }
  if (notif.type === 'booking_timeout') {
    return {
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      text: 'Expired',
      icon: Clock,
    };
  }
  if (notif.type === 'ride_completed') {
    return {
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      text: 'Completed',
      icon: CheckCircle,
    };
  }
  if (notif.bookingStatus) {
    switch (notif.bookingStatus) {
      case 'Pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          text: 'Pending',
          icon: Clock,
        };
      case 'Confirmed':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          text: 'Confirmed',
          icon: CheckCircle,
        };
      case 'Rejected':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          text: 'Rejected',
          icon: XCircle,
        };
      case 'Expired':
        return {
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          text: 'Expired',
          icon: Clock,
        };
      case 'Completed':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          text: 'Completed',
          icon: CheckCircle,
        };
    }
  }
  return null;
};

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || "";

  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    fetchNotifications,
    confirmBooking,
    rejectBooking,
    resetUnreadCount,
    markFeedbackGiven,
  } = useNotificationStore();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState<Record<string, 'confirm' | 'reject' | null>>({});

  // ✅ Reset unread count when page opens
  useEffect(() => {
    if (userId) {
      console.log('🔔 Notification page opened - resetting unread count');
      resetUnreadCount();
    }
  }, []);

  // ⏱️ AUTO-EXPIRY CHECKER
  useEffect(() => {
    const interval = setInterval(() => {
      notifications.forEach((notification) => {
        if (isNewBookingRequest(notification)) {
          const remaining = notification.expiresAt! - Date.now();
          if (remaining <= 0) {
            handleExpireNotification(notification.id, notification.bookingId!);
          }
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [notifications]);

  useEffect(() => {
    if (userId) {
      console.log('🔔 Fetching notifications for user:', userId);
      fetchNotifications(userId);
    }
  }, [userId, fetchNotifications]);

  const handleRefresh = async () => {
    if (!userId || isRefreshing) return;
    setIsRefreshing(true);
    await fetchNotifications(userId);
    setIsRefreshing(false);
  };

  const getTimePassed = (timestamp: string | Date): string => {
    const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  const getRemainingTime = (expiresAt: number): string => {
    const now = Date.now();
    const remaining = expiresAt - now;
    if (remaining <= 0) return '00:00';

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const TimeDisplay = ({ expiresAt }: { expiresAt: number }) => {
    const [time, setTime] = useState(getRemainingTime(expiresAt));

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(getRemainingTime(expiresAt));
      }, 1000);

      return () => clearInterval(interval);
    }, [expiresAt]);

    const remaining = expiresAt - Date.now();
    const isExpiring = remaining < 30000;

    return (
      <span className={`font-mono font-bold ${isExpiring ? 'text-red-600 animate-pulse' : 'text-white'}`}>
        {time}
      </span>
    );
  };

  // ⏰ HANDLE EXPIRY
  const handleExpireNotification = async (notificationId: string, bookingId: string) => {
    console.log('⏰ Notification expired:', notificationId);
    try {
      await rejectBooking(notificationId, bookingId);
      await fetchNotifications(userId);
    } catch (error) {
      console.error('Error expiring notification:', error);
    }
  };

  const handleConfirmBooking = async (notification: any) => {
    setActionLoading(prev => ({ ...prev, [notification.id]: 'confirm' }));
    try {
      await confirmBooking(notification.id, notification.bookingId);
      markAsRead(notification.id);
      await fetchNotifications(userId);
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('Failed to confirm booking');
    } finally {
      setActionLoading(prev => ({ ...prev, [notification.id]: null }));
    }
  };

  const handleRejectBooking = async (notification: any) => {
    setActionLoading(prev => ({ ...prev, [notification.id]: 'reject' }));
    try {
      await rejectBooking(notification.id, notification.bookingId);
      await fetchNotifications(userId);
    } catch (error) {
      console.error('Error rejecting booking:', error);
      alert('Failed to reject booking');
    } finally {
      setActionLoading(prev => ({ ...prev, [notification.id]: null }));
    }
  };

  // ✅ FEEDBACK CLICK HANDLER
  const handleFeedbackClick = (notification: any) => {
    markAsRead(notification.id);
    const vehicleName = getVehicleName(notification);
    const bookingId = notification.bookingId || notification.id || 'temp-' + Date.now();
    const vehicleId = notification.vehicleId || notification.VechileId || notification.VehicleId;

    console.log('🎯 Navigating to feedback with:', {
      vehicleId,
      vehicleName,
      bookingId,
    });

    navigate(
      `/feedback?vehicleId=${vehicleId}&vehicleName=${encodeURIComponent(vehicleName)}&bookingId=${bookingId}`
    );
  };

  // ✅ CHECK IF NOTIFICATION IS A NEW BOOKING REQUEST
  const isNewBookingRequest = (notification: any): boolean => {
    return (
      notification.type === 'booking_request' &&
      notification.bookingStatus === 'Pending' &&
      notification.expiresAt &&
      notification.expiresAt > Date.now()
    );
  };

  // ✅ CHECK IF NOTIFICATION IS BOOKING COMPLETED
  const isBookingCompleted = (notification: any): boolean => {
    return (
      notification.type === 'ride_completed' ||
      notification.bookingStatus === 'Completed' ||
      (notification.type === 'Booking' && notification.title?.includes('Booking Completed'))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="w-7 h-7 text-blue-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Notifications
              </h1>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw className={`w-5 h-5 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {notifications.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllAsRead(userId)}
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline">Mark all read</span>
                  <span className="sm:hidden">Read all</span>
                </button>
              )}
              <button
                onClick={() => clearAllNotifications(userId)}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear all</span>
                <span className="sm:hidden">Clear</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <p className="text-gray-600 mb-6 text-center">
          Stay updated with your ride completions and booking updates
        </p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {isLoading && notifications.length === 0 ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Loading notifications...</p>
              <p className="text-sm text-gray-400 mt-2">Please wait while we fetch your notifications</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium text-lg mb-2">No notifications yet</p>
              <p className="text-gray-400 mb-6">You'll see ride completions and booking updates here</p>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          ) : (
            <>
              {notifications.map((notification) => {
                const isBookingRequest = isNewBookingRequest(notification);
                const statusBadge = getStatusBadge(notification);
                const StatusIcon = statusBadge?.icon;
                const loading = actionLoading[notification.id];
                const vehicleName = getVehicleName(notification);
                const vehicleImage = getVehicleImage(notification);
                const VehicleIcon = getVehicleIcon(notification);
                const vehicleType = getVehicleType(notification);

                const isCompleted = isBookingCompleted(notification);

                // ============================================
                // SEPARATE FEEDBACK CARD
                // ============================================
                if (isCompleted && !notification.feedbackGiven) {
                  return (
                    <div
                      key={`feedback-${notification.id}`}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 mb-4"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <Star className="w-6 h-6 text-white fill-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800">Share Your Experience</h3>
                          <p className="text-sm text-gray-600">
                            How was your {vehicleType === 'bike' ? 'ride' : 'trip'} with {vehicleName}?
                          </p>
                        </div>
                        <VehicleIcon className="w-8 h-8 text-blue-600" />
                      </div>

                      <button
                        onClick={() => handleFeedbackClick(notification)}
                        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-blue-500 transition-all shadow-lg transform hover:scale-[1.02]"
                      >
                        Give Feedback ⭐
                      </button>
                    </div>
                  );
                }

                if (isCompleted) {
                  return null;
                }

                // ============================================
                // BOOKING REQUEST CARD (YES/NO BUTTONS)
                // ============================================
                if (isBookingRequest) {
                  return (
                    <div
                      key={notification.id}
                      className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Timer Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
                        <Clock className="w-4 h-4" />
                        <TimeDisplay expiresAt={notification.expiresAt!} />
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <VehicleIcon className="w-5 h-5 text-orange-600" />
                          <h3 className="text-lg font-bold text-gray-900 pr-32">
                            {notification.title || "New Booking Request"}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-500">{getTimePassed(notification.timestamp)}</p>
                      </div>

                      {/* Vehicle Details */}
                      <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={vehicleImage}
                            alt={vehicleType}
                            className="w-16 h-16 object-contain"
                            onError={(e) => {
                              // Fallback if image fails to load
                              e.currentTarget.src = vehicleType === 'bike' ? BikeLogo : CarLogo;
                            }}
                          />
                          <div>
                            <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                              <VehicleIcon className="w-3 h-3" />
                              {vehicleType === 'bike' ? 'Bike' : 'Car'}
                            </p>
                            <p className="text-base font-bold text-gray-900">{vehicleName}</p>
                          </div>
                        </div>

                        {/* Booking Details */}
                        {(notification.customerName ||
                          notification.fromDate ||
                          notification.totalPrice) && (
                          <div className="space-y-2 pt-3 border-t border-gray-200">
                            {notification.customerName && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Customer:</span>
                                <span className="font-semibold text-gray-900">
                                  {notification.customerName}
                                </span>
                              </div>
                            )}
                            {notification.contactNumber && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-semibold text-blue-600">
                                  {notification.contactNumber}
                                </span>
                              </div>
                            )}
                            {notification.fromDate && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">From:</span>
                                <span className="font-semibold text-gray-900">
                                  {notification.fromDate}
                                </span>
                              </div>
                            )}
                            {notification.toDate && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">To:</span>
                                <span className="font-semibold text-gray-900">
                                  {notification.toDate}
                                </span>
                              </div>
                            )}
                            {notification.totalPrice && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Total:</span>
                                <span className="font-bold text-green-600 text-base">
                                  ₹{notification.totalPrice}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* YES / NO BUTTONS */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleConfirmBooking(notification)}
                          disabled={loading !== null}
                          className="flex-1 py-3.5 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-800 hover:via-blue-700 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                        >
                          {loading === 'confirm' ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Check className="w-5 h-5" />
                              Yes
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleRejectBooking(notification)}
                          disabled={loading !== null}
                          className="flex-1 py-3.5 rounded-xl font-semibold text-lg text-red-600 bg-white border-2 border-red-600 hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {loading === 'reject' ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <X className="w-5 h-5" />
                              No
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                }

                // ============================================
                // REGULAR NOTIFICATION CARD
                // ============================================
                return (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border ${
                      notification.read ? 'border-gray-200' : 'border-blue-300 bg-blue-50/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <VehicleIcon className="w-4 h-4 text-gray-600" />
                          <h3 className="text-base font-bold text-gray-900">
                            {notification.title}
                          </h3>
                        </div>
                        {statusBadge && (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusBadge.color}`}
                          >
                            {StatusIcon && <StatusIcon className="w-3.5 h-3.5" />}
                            {statusBadge.text}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {getTimePassed(notification.timestamp)}
                      </p>
                    </div>

                    {/* Vehicle Info */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={vehicleImage}
                          alt={vehicleType}
                          className="w-14 h-14 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = vehicleType === 'bike' ? BikeLogo : CarLogo;
                          }}
                        />
                        <div>
                          <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                            <VehicleIcon className="w-3 h-3" />
                            {vehicleType === 'bike' ? 'Bike' : 'Car'}
                          </p>
                          <p className="text-sm font-bold text-gray-900">{vehicleName}</p>
                        </div>
                      </div>

                      {/* Only show details for cars, not bikes */}
                      {vehicleType === 'car' && (
                        <div className="grid grid-cols-3 gap-2 text-center mt-3">
                          <div className="bg-white rounded-lg p-2 shadow-sm">
                            <img src={AutomaticLogo} alt="Transmission" className="w-6 h-6 mx-auto mb-1" />
                            <p className="text-xs text-gray-600">
                              {localStorage.getItem('transmission') || 'Automatic'}
                            </p>
                          </div>
                          <div className="bg-white rounded-lg p-2 shadow-sm">
                            <img src={DriverLogo} alt="Seaters" className="w-6 h-6 mx-auto mb-1" />
                            <p className="text-xs text-gray-600">
                              {localStorage.getItem('seaters') || '5 Seaters'}
                            </p>
                          </div>
                          <div className="bg-white rounded-lg p-2 shadow-sm">
                            <img src={fuel} alt="Fuel" className="w-6 h-6 mx-auto mb-1" />
                            <p className="text-xs text-gray-600">
                              {localStorage.getItem('fuelType') || 'Petrol'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Booking Details */}
                    {(notification.customerName ||
                      notification.fromDate ||
                      notification.totalPrice) && (
                      <div className="bg-gray-50 rounded-xl p-3 mb-3 space-y-1.5">
                        {notification.customerName && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Customer:</span>
                            <span className="font-semibold text-gray-900">
                              {notification.customerName}
                            </span>
                          </div>
                        )}
                        {notification.fromDate && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">From:</span>
                            <span className="font-semibold text-gray-900">
                              {notification.fromDate}
                            </span>
                          </div>
                        )}
                        {notification.toDate && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">To:</span>
                            <span className="font-semibold text-gray-900">{notification.toDate}</span>
                          </div>
                        )}
                        {notification.totalPrice && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Total:</span>
                            <span className="font-bold text-green-600">
                              ₹{notification.totalPrice}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {notification.message && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-700">{notification.message}</p>
                      </div>
                    )}

                    {/* Action Icons */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-700 p-1.5 rounded-md hover:bg-blue-50 transition"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;