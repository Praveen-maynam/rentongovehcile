













import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore, Notification } from "../../../store/notification.store";
import CarLogo from "../../../assets/icons/CarLogo.png";
import AutomaticLogo from "../../../assets/icons/AutomaticLogo.png";
import DriverLogo from "../../../assets/icons/DriverLogo.png";
import { Bell, Check, X, Trash2, RefreshCw, Loader2, CheckCircle, XCircle, Clock } from "lucide-react";

// Get status badge color and text
const getStatusBadge = (notif: Notification) => {
  // For customer notifications based on type
  if (notif.type === 'booking_confirmed') {
    return { color: 'bg-green-100 text-green-800 border-green-200', text: 'Confirmed', icon: CheckCircle };
  }
  if (notif.type === 'booking_declined') {
    return { color: 'bg-red-100 text-red-800 border-red-200', text: 'Cancelled', icon: XCircle };
  }
  if (notif.type === 'booking_timeout') {
    return { color: 'bg-orange-100 text-orange-800 border-orange-200', text: 'Expired', icon: Clock };
  }
  if (notif.type === 'ride_completed') {
    return { color: 'bg-blue-100 text-blue-800 border-blue-200', text: 'Completed', icon: CheckCircle };
  }

  // For owner notifications based on bookingStatus
  if (notif.bookingStatus) {
    switch (notif.bookingStatus) {
      case 'Pending':
        return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', text: 'Pending', icon: Clock };
      case 'Confirmed':
        return { color: 'bg-green-100 text-green-800 border-green-200', text: 'Confirmed', icon: CheckCircle };
      case 'Rejected':
        return { color: 'bg-red-100 text-red-800 border-red-200', text: 'Rejected', icon: XCircle };
      case 'Expired':
        return { color: 'bg-orange-100 text-orange-800 border-orange-200', text: 'Expired', icon: Clock };
      case 'Completed':
        return { color: 'bg-blue-100 text-blue-800 border-blue-200', text: 'Completed', icon: CheckCircle };
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
    fetchNotifications
  } = useNotificationStore();

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch notifications from backend on mount
  useEffect(() => {
    if (userId) {
      console.log('🔔 Fetching notifications for user:', userId);
      fetchNotifications(userId);
    }
  }, [userId, fetchNotifications]);

  // Refresh notifications
  const handleRefresh = async () => {
    if (!userId || isRefreshing) return;
    setIsRefreshing(true);
    await fetchNotifications(userId);
    setIsRefreshing(false);
  };
  // Helper to calculate "time ago"
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
  // Feedback click handler
  const handleFeedbackClick = (notification: any) => {
    markAsRead(notification.id);
    navigate(`/feedback?vehicleId=${notification.vehicleId}&vehicleName=${notification.vehicleName}&bookingId=${notification.bookingId}`);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing || isLoading}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 hover:text-gray-700 font-medium disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              {notifications.length > 0 && (
                <>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => markAllAsRead(userId)}
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Mark all read</span>
                      <span className="sm:hidden">Read all</span>
                    </button>
                  )}
                  <button
                    onClick={() => clearAllNotifications(userId)}
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Clear all</span>
                    <span className="sm:hidden">Clear</span>
                  </button>
                </>
              )}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Stay updated with your ride completions and booking updates
          </p>

          {/* Error message */}
          {error && (
            <div className="mt-3 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
        {/* Notifications List */}
        <div className="space-y-3 sm:space-y-4">
          {/* Loading State */}
          {isLoading && notifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
              <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mx-auto mb-4 animate-spin" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Loading notifications...
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Please wait while we fetch your notifications
              </p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
              <Bell className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                No notifications yet
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                You'll see ride completions and booking updates here
              </p>
              <button
                onClick={handleRefresh}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
              >
                Refresh
              </button>
            </div>
          ) : (
            notifications.map((notification) => {
              const statusBadge = getStatusBadge(notification);
              const StatusIcon = statusBadge?.icon;

              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl shadow-sm p-5 transition hover:shadow-md ${!notification.read ? "border-l-4 border-blue-500" : "border border-gray-200"
                    }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <img
                      src={CarLogo}
                      alt="Vehicle Logo"
                      className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                    />
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Title, Status Badge, and Time */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-gray-800 font-medium">
                            {notification.title}
                          </p>
                          {/* Status Badge */}
                          {statusBadge && (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusBadge.color}`}>
                              {StatusIcon && <StatusIcon className="w-3 h-3" />}
                              {statusBadge.text}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-400 whitespace-nowrap">
                          {getTimePassed(notification.timestamp)}
                        </span>
                      </div>
                      {/* Message */}
                      <p className="text-sm text-gray-600 mb-3">
                        {notification.message}
                      </p>
                      {/* Vehicle Details */}
                      {notification.vehicleName && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <p className="font-semibold text-gray-800 mb-2">
                            {notification.vehicleName}
                          </p>

                          {/* Booking details for owner notifications */}
                          {(notification.customerName || notification.fromDate || notification.totalPrice) && (
                            <div className="bg-white rounded-lg p-2 mb-2 border border-gray-200">
                              {notification.customerName && (
                                <p className="text-sm"><span className="font-medium">Customer:</span> {notification.customerName}</p>
                              )}
                              {notification.fromDate && (
                                <p className="text-sm"><span className="font-medium">From:</span> {notification.fromDate}</p>
                              )}
                              {notification.toDate && (
                                <p className="text-sm"><span className="font-medium">To:</span> {notification.toDate}</p>
                              )}
                              {notification.totalPrice && (
                                <p className="text-sm"><span className="font-medium">Total:</span> ₹{notification.totalPrice}</p>
                              )}
                            </div>
                          )}

                          <div className="flex flex-col gap-2 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                              <img src={AutomaticLogo} alt="Automatic" className="w-5 h-5" />
                              <span>{localStorage.getItem('transmission') || 'Automatic'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <img src={DriverLogo} alt="Driver" className="w-5 h-5" />
                              <span>{localStorage.getItem('seaters') || '5 Seaters'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>⛽ {localStorage.getItem('fuelType') || 'Petrol'}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Action Buttons */}
                      <div className="flex items-center justify-between gap-3 mt-4">
                        <div className="flex flex-wrap gap-3">
                          {/* FEEDBACK BUTTON - Shows for ride_completed, requiresFeedback, or completed bookings */}
                          {(notification.type === "ride_completed" || notification.requiresFeedback || notification.bookingStatus === 'Completed') && (
                            <button
                              onClick={() => handleFeedbackClick(notification)}
                              className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-5 py-2 rounded-md hover:opacity-90 transition-all shadow-sm"
                            >
                              Give Feedback
                            </button>
                          )}
                          {/* View Calendar button for confirmed bookings */}
                          {(notification.type === "booking_confirmed" || notification.bookingStatus === 'Confirmed') && (
                            <button
                              onClick={() => navigate("/calendar")}
                              className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-5 py-2 rounded-md hover:opacity-90 transition-all shadow-sm"
                            >
                              View Calendar
                            </button>
                          )}
                        </div>
                        {/* Mark as Read / Delete */}
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-700 p-1"
                              title="Mark as read"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-600 transition p-1"
                            title="Delete notification"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;