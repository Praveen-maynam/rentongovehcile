<<<<<<< HEAD
import React from 'react';
import { useNotificationStore } from '../store/notification.store';
import NotificationsList from '../components/notifications/NotificationsList';
import { Bell } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const { markAllAsRead, clearAllNotifications, notifications } = useNotificationStore();
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../store/notification.store";
import CarLogo from "../assets/icons/CarLogo.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import { Bell } from "lucide-react";

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markAllAsRead, clearAllNotifications } = useNotificationStore();
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
<<<<<<< HEAD
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Mark all as read
              </button>
              <button
                onClick={clearAllNotifications}
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                Clear all
              </button>
            </div>
=======
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Mark all as read
            </button>
            <button
              onClick={clearAllNotifications}
              className="text-sm text-gray-600 hover:text-gray-700"
            >
              Clear all
            </button>
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Notification List */}
      <NotificationsList />

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-gray-100 rounded-full p-3 mb-4">
            <Bell className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No notifications yet
          </h3>
          <p className="text-sm text-gray-500">
            We'll notify you when there's activity on your account
          </p>
        </div>
      )}
=======
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
          notifications.map((notif) => (
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
                    <p className="text-gray-800 font-medium">{notif.title}</p>
                    <span className="text-xs text-gray-400">
                      {notif.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>

                  {/* Vehicle Details (optional if present) */}
                  {notif.vehicleName && (
                    <div className="mt-3 text-gray-600">
                      <p className="font-semibold text-gray-800 mb-2">{notif.vehicleName}</p>
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
                    {/* Feedback button — only for ride_completed or requiresFeedback */}
                    {(notif.type === "ride_completed" || notif.requiresFeedback) && (
                      <button
                        onClick={() =>
                          navigate(`/feedback/`)
                        }
                        className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-all"
                      >
                        Give Feedback
                      </button>
                    )}

                    {/* Optional accept/reject for booking_confirmed */}
                    {notif.type === "booking_confirmed" && (
                      <>
                        <button
                          onClick={() => navigate("/calendar")}
                          className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-all"
                        >
                          ✓ Yes
                        </button>
                        <button
                          className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-all"
                        >
                          ✗ No
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
    </div>
  );
};

<<<<<<< HEAD
export default NotificationsPage;
=======
export default NotificationsPage;
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
