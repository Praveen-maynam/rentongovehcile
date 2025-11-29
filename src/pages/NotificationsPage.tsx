import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore, Notification } from "../store/notification.store";
import CarLogo from "../assets/icons/CarLogo.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import { Bell, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

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

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || "";
  const { notifications, markAllAsRead, clearAllNotifications, fetchNotifications } = useNotificationStore();

  // Fetch notifications on mount
  useEffect(() => {
    if (userId) {
      fetchNotifications(userId);
    }
  }, [userId, fetchNotifications]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => markAllAsRead(userId)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Mark all as read
            </button>
            <button
              onClick={() => clearAllNotifications(userId)}
              className="text-sm text-gray-600 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto mt-6 px-4 space-y-5">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-gray-100 rounded-full p-3 mb-4">
              <Bell className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications yet</h3>
            <p className="text-sm text-gray-500">
              We'll notify you when there's activity on your account.
            </p>
          </div>
        ) : (
          notifications.map((notif) => {
            const statusBadge = getStatusBadge(notif);
            const StatusIcon = statusBadge?.icon;

            return (
              <div
                key={notif.id}
                className={`bg-white border rounded-xl shadow-sm p-5 transition-all duration-200 ${
                  notif.read ? "opacity-90" : "border-blue-400"
                }`}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={CarLogo}
                    alt="Car Logo"
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <p className="text-gray-800 font-medium">{notif.title}</p>
                        {/* Status Badge */}
                        {statusBadge && (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusBadge.color}`}>
                            {StatusIcon && <StatusIcon className="w-3 h-3" />}
                            {statusBadge.text}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(notif.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-1">{notif.message}</p>

                    {/* Vehicle Details (optional if present) */}
                    {notif.vehicleName && (
                      <div className="mt-3 text-gray-600">
                        <p className="font-semibold text-gray-800 mb-2">{notif.vehicleName}</p>

                        {/* Booking details for owner notifications */}
                        {(notif.customerName || notif.fromDate || notif.totalPrice) && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-2">
                            {notif.customerName && (
                              <p className="text-sm"><span className="font-medium">Customer:</span> {notif.customerName}</p>
                            )}
                            {notif.fromDate && (
                              <p className="text-sm"><span className="font-medium">From:</span> {notif.fromDate}</p>
                            )}
                            {notif.toDate && (
                              <p className="text-sm"><span className="font-medium">To:</span> {notif.toDate}</p>
                            )}
                            {notif.totalPrice && (
                              <p className="text-sm"><span className="font-medium">Total:</span> ₹{notif.totalPrice}</p>
                            )}
                          </div>
                        )}

                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <img src={AutomaticLogo} alt="Automatic" className="w-5 h-5" />
                            <span>Automatic</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <img src={DriverLogo} alt="Driver" className="w-5 h-5" />
                            <span>5 Seaters</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>⛽ Petrol</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-3">
                      {/* Feedback button — only for ride_completed, requiresFeedback, or completed bookings */}
                      {(notif.type === "ride_completed" || notif.requiresFeedback || notif.bookingStatus === 'Completed') && (
                        <button
                          onClick={() => navigate(`/feedback`)}
                          className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-all"
                        >
                          Give Feedback
                        </button>
                      )}

                      {/* View Calendar button for confirmed bookings */}
                      {(notif.type === "booking_confirmed" || notif.bookingStatus === 'Confirmed') && (
                        <button
                          onClick={() => navigate("/calendar")}
                          className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-all"
                        >
                          View Calendar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;