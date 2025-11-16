// import React from 'react';
// import { useNotificationStore } from '../../store/notification.store';
// import RideCompletionNotification from './RideCompletionNotification';
// import BookingConfirmationNotification from './BookingConfirmationNotification';

// const NotificationsList = () => {
//   const { notifications } = useNotificationStore();

//   if (notifications.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center p-8 text-gray-500">
//         <svg
//           className="w-16 h-16 mb-4 text-gray-300"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={1.5}
//             d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//           />
//         </svg>
//         <p className="text-sm">No notifications yet</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-4 p-4">
//       {notifications.map((notification) => {
//         switch (notification.type) {
//           case 'ride_completed':
//             return (
//               <RideCompletionNotification
//                 key={notification.id}
//                 rideId={notification.vehicleId || ''}
//                 vehicleName={notification.vehicleName}
//                 timePassed={getTimePassed(notification.timestamp)}
//               />
//             );
//           case 'booking_confirmed':
//             return (
//               <BookingConfirmationNotification
//                 key={notification.id}
//                 notification={notification}
//                 timePassed={getTimePassed(notification.timestamp)}
//               />
//             );
//           default:
//             return null;
//         }
//       })}
//     </div>
//   );
// };

// const getTimePassed = (timestamp: Date): string => {
//   const now = new Date();
//   const diff = now.getTime() - new Date(timestamp).getTime();
//   const minutes = Math.floor(diff / 60000);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);

//   if (days > 0) return `${days}d ago`;
//   if (hours > 0) return `${hours}h ago`;
//   if (minutes > 0) return `${minutes}m ago`;
//   return 'Just now';
// };

// export default NotificationsList;


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../../store/notification.store";
import CarLogo from "../assets/icons/CarLogo.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import { Bell, Check, X, Trash2 } from "lucide-react";

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAllNotifications,
    addNotification 
  } = useNotificationStore();

  // ADD TEST NOTIFICATIONS - Remove this after testing
  useEffect(() => {
    if (notifications.length === 0) {
      // Add a ride completed notification
      addNotification({
        type: 'ride_completed',
        title: 'Ride Completed',
        message: 'Your ride has been completed. Please give feedback.',
        requiresFeedback: true,
        vehicleId: '123',
        vehicleName: 'Hyundai Verna',
        bookingId: 'booking-456'
      });

      // Add a booking confirmation notification
      addNotification({
        type: 'booking_confirmed',
        title: 'Booking Confirmed',
        message: 'Your car has been booked successfully.',
        vehicleId: '789',
        vehicleName: 'Toyota Innova',
        bookingId: 'booking-789'
      });
    }
  }, []);

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

            {notifications.length > 0 && (
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Mark all read</span>
                    <span className="sm:hidden">Read all</span>
                  </button>
                )}
                <button
                  onClick={clearAllNotifications}
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Clear all</span>
                  <span className="sm:hidden">Clear</span>
                </button>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-gray-600">
            Stay updated with your ride completions and booking updates
          </p>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 sm:space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
              <Bell className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                No notifications yet
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                You'll see ride completions and booking updates here
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm p-5 transition hover:shadow-md ${
                  !notification.read ? "border-l-4 border-blue-500" : "border border-gray-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <img
                    src={CarLogo}
                    alt="Car Logo"
                    className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title and Time */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-gray-800 font-medium">
                        {notification.title}
                      </p>
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
                    <div className="flex items-center justify-between gap-3 mt-4">
                      <div className="flex flex-wrap gap-3">
                        {/* FEEDBACK BUTTON - Shows for ride_completed */}
                        {notification.type === "ride_completed" && (
                          <button
                            onClick={() => handleFeedbackClick(notification)}
                            className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-5 py-2 rounded-md hover:opacity-90 transition-all shadow-sm"
                          >
                            Give Feedback
                          </button>
                        )}

                        {/* Booking Confirmation Buttons */}
                        {notification.type === "booking_confirmed" && (
                          <>
                            <button
                              onClick={() => {
                                markAsRead(notification.id);
                                navigate("/calendar");
                              }}
                              className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-all"
                            >
                              ✓ Yes
                            </button>
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-all"
                            >
                              ✗ No
                            </button>
                          </>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;