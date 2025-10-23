import React from 'react';
import { useNotificationStore } from '../store/notification.store';
import NotificationsList from '../components/notifications/NotificationsList';
import { Bell } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const { markAllAsRead, clearAllNotifications, notifications } = useNotificationStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
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
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default NotificationsPage;