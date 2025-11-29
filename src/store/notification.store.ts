import { create } from 'zustand';
import io, { Socket } from 'socket.io-client';

const API_BASE = "http://3.110.122.127:3000";
const SOCKET_URL = "http://3.110.122.127:3001";

// Socket instance for notifications
let notificationSocket: Socket | null = null;

export interface Notification {
  id: string;
  _id?: string; // Backend ID
  type: 'ride_completed' | 'booking_confirmed' | 'booking_declined' | 'general' | 'new_booking' | 'booking_timeout';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  vehicleId?: string;
  vehicleName?: string;
  bookingId?: string;
  requiresFeedback?: boolean;
  userId?: string;
  createdAt?: string;
  // Booking details for owner notifications
  bookingStatus?: 'Pending' | 'Confirmed' | 'Rejected' | 'Expired' | 'Completed';
  customerName?: string;
  fromDate?: string;
  toDate?: string;
  totalPrice?: number;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  socketConnected: boolean;

  // Local actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  updateNotificationStatus: (bookingId: string, status: Notification['bookingStatus']) => void;

  // Backend sync actions
  fetchNotifications: (userId: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: (userId: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAllNotifications: (userId: string) => Promise<void>;

  // Socket actions
  initializeSocket: (userId: string) => void;
  disconnectSocket: () => void;

  // Helper
  setNotifications: (notifications: Notification[]) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  socketConnected: false,

  // Add notification locally (for real-time socket events) and optionally save to backend
  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: notification._id || Date.now().toString() + Math.random().toString(36),
      timestamp: new Date(),
      read: false,
    };

    // Check if notification already exists
    const exists = get().notifications.some(n =>
      n.id === newNotification.id || n._id === notification._id
    );

    if (!exists) {
      set((state) => ({
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }));

      // Also save to backend if userId is available
      const userId = notification.userId || localStorage.getItem("userId");
      if (userId) {
        // Fire and forget - don't block UI
        fetch(`${API_BASE}/createNotification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            type: notification.type || 'general',
            title: notification.title,
            message: notification.message,
            vehicleId: notification.vehicleId,
            vehicleName: notification.vehicleName,
            bookingId: notification.bookingId,
            requiresFeedback: notification.requiresFeedback,
          }),
        }).then(res => {
          if (res.ok) {
            console.log('🔔 Notification saved to backend');
          }
        }).catch(err => {
          console.log('🔔 Could not save notification to backend (API may not exist):', err.message);
        });
      }
    }
  },

  // Update notification booking status by bookingId
  updateNotificationStatus: (bookingId: string, status: Notification['bookingStatus']) => {
    console.log('🔔 Updating notification status for booking:', bookingId, 'to:', status);
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.bookingId === bookingId ? { ...notif, bookingStatus: status } : notif
      ),
    }));
  },

  // Set notifications from backend
  setNotifications: (notifications) => {
    const unreadCount = notifications.filter(n => !n.read).length;
    set({ notifications, unreadCount });
  },

  // Fetch notifications from backend
  fetchNotifications: async (userId: string) => {
    if (!userId) return;

    set({ isLoading: true, error: null });

    try {
      console.log('🔔 Fetching notifications for user:', userId);
      const response = await fetch(`${API_BASE}/getNotifications/${userId}`);

      // If API returns 404, it means the endpoint doesn't exist yet
      // Just use local notifications without showing an error
      if (response.status === 404) {
        console.log('🔔 Notifications API not available, using local notifications only');
        set({ isLoading: false, error: null });
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      console.log('🔔 Notifications response:', data);

      // Handle different response structures
      let notificationsArray: any[] = [];
      if (Array.isArray(data)) {
        notificationsArray = data;
      } else if (data.notifications) {
        notificationsArray = data.notifications;
      } else if (data.data) {
        notificationsArray = data.data;
      }

      // Transform backend notifications to match our interface
      const transformedNotifications: Notification[] = notificationsArray.map((notif: any) => ({
        id: notif._id || notif.id || Date.now().toString(),
        _id: notif._id,
        type: notif.type || 'general',
        title: notif.title || 'Notification',
        message: notif.message || notif.body || '',
        timestamp: new Date(notif.createdAt || notif.timestamp || Date.now()),
        read: notif.read || notif.isRead || false,
        vehicleId: notif.vehicleId || notif.VechileId,
        vehicleName: notif.vehicleName || notif.VehicleName,
        bookingId: notif.bookingId,
        requiresFeedback: notif.requiresFeedback,
        userId: notif.userId,
        createdAt: notif.createdAt,
      }));

      // Merge with existing local notifications (keep local ones that aren't on backend)
      const existingNotifications = get().notifications;
      const backendIds = new Set(transformedNotifications.map(n => n._id || n.id));
      const localOnlyNotifications = existingNotifications.filter(n =>
        !backendIds.has(n._id || n.id) && !backendIds.has(n.id)
      );

      // Combine backend + local-only notifications
      const allNotifications = [...transformedNotifications, ...localOnlyNotifications];

      // Sort by timestamp (newest first)
      allNotifications.sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      const unreadCount = allNotifications.filter(n => !n.read).length;

      set({
        notifications: allNotifications,
        unreadCount,
        isLoading: false,
      });

      console.log('🔔 Loaded', allNotifications.length, 'notifications,', unreadCount, 'unread');

    } catch (error: any) {
      console.log('🔔 Notifications API not available, using local notifications only:', error.message);
      // Don't show error to user - just use local notifications
      set({ isLoading: false, error: null });
    }
  },

  // Mark notification as read (sync with backend)
  markAsRead: async (id: string) => {
    // Optimistic update
    set((state) => {
      const notification = state.notifications.find(n => n.id === id || n._id === id);
      if (notification && !notification.read) {
        return {
          notifications: state.notifications.map((notif) =>
            (notif.id === id || notif._id === id) ? { ...notif, read: true } : notif
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        };
      }
      return state;
    });

    // Sync with backend
    try {
      await fetch(`${API_BASE}/markNotificationRead/${id}`, {
        method: 'PUT',
      });
      console.log('🔔 Marked notification as read:', id);
    } catch (error) {
      console.error('🔔 Error marking notification as read:', error);
    }
  },

  // Mark all notifications as read
  markAllAsRead: async (userId: string) => {
    // Optimistic update
    set((state) => ({
      notifications: state.notifications.map((notif) => ({ ...notif, read: true })),
      unreadCount: 0,
    }));

    // Sync with backend
    try {
      await fetch(`${API_BASE}/markAllNotificationsRead/${userId}`, {
        method: 'PUT',
      });
      console.log('🔔 Marked all notifications as read');
    } catch (error) {
      console.error('🔔 Error marking all notifications as read:', error);
    }
  },

  // Delete notification
  deleteNotification: async (id: string) => {
    // Optimistic update
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id || n._id === id);
      return {
        notifications: state.notifications.filter((notif) => notif.id !== id && notif._id !== id),
        unreadCount: notification && !notification.read ? state.unreadCount - 1 : state.unreadCount,
      };
    });

    // Sync with backend
    try {
      await fetch(`${API_BASE}/deleteNotification/${id}`, {
        method: 'DELETE',
      });
      console.log('🔔 Deleted notification:', id);
    } catch (error) {
      console.error('🔔 Error deleting notification:', error);
    }
  },

  // Clear all notifications
  clearAllNotifications: async (userId: string) => {
    // Optimistic update
    set({ notifications: [], unreadCount: 0 });

    // Sync with backend
    try {
      await fetch(`${API_BASE}/clearAllNotifications/${userId}`, {
        method: 'DELETE',
      });
      console.log('🔔 Cleared all notifications');
    } catch (error) {
      console.error('🔔 Error clearing all notifications:', error);
    }
  },

  // Initialize socket for real-time notifications
  initializeSocket: (userId: string) => {
    if (!userId) {
      console.log('🔔 No userId provided for socket initialization');
      return;
    }

    // Disconnect existing socket if any
    if (notificationSocket) {
      notificationSocket.disconnect();
    }

    console.log('🔔 Initializing notification socket for user:', userId);

    notificationSocket = io(SOCKET_URL, {
      query: { userId },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    notificationSocket.on('connect', () => {
      console.log('🔔 Notification socket connected');
      set({ socketConnected: true });

      // Fetch latest notifications on connect
      get().fetchNotifications(userId);
    });

    notificationSocket.on('disconnect', () => {
      console.log('🔔 Notification socket disconnected');
      set({ socketConnected: false });
    });

    // Listen for new notifications
    notificationSocket.on('new-notification', (data: any) => {
      console.log('🔔 New notification received via socket:', data);

      const notification = {
        _id: data._id || data.id,
        type: data.type || 'general',
        title: data.title || 'New Notification',
        message: data.message || data.body || '',
        vehicleId: data.vehicleId,
        vehicleName: data.vehicleName,
        bookingId: data.bookingId,
        requiresFeedback: data.requiresFeedback,
      };

      get().addNotification(notification);
    });

    // Listen for booking status updates (for customers)
    notificationSocket.on('booking-status-update', (data: any) => {
      console.log('🔔 Booking status update received:', data);

      let notificationType: Notification['type'] = 'general';
      let title = 'Booking Update';
      let message = '';

      if (data.status === 'accepted' || data.status === 'confirmed') {
        notificationType = 'booking_confirmed';
        title = 'Booking Confirmed!';
        message = `Your booking for ${data.vehicleName || 'the vehicle'} has been accepted.`;
      } else if (data.status === 'rejected' || data.status === 'cancelled') {
        notificationType = 'booking_declined';
        title = 'Booking Declined';
        message = `Your booking for ${data.vehicleName || 'the vehicle'} was declined.`;
      } else if (data.status === 'timeout') {
        notificationType = 'booking_timeout';
        title = 'Booking Timed Out';
        message = `Your booking for ${data.vehicleName || 'the vehicle'} was auto-cancelled due to no response.`;
      }

      get().addNotification({
        type: notificationType,
        title,
        message,
        vehicleName: data.vehicleName,
        bookingId: data.bookingId,
      });
    });

    // Listen for new booking requests (for owners)
    notificationSocket.on('new-booking-request', (data: any) => {
      console.log('🔔 New booking request received:', data);

      get().addNotification({
        type: 'new_booking',
        title: 'New Booking Request!',
        message: `You have a new booking request for ${data.vehicleName || data.VehicleName || 'your vehicle'}.`,
        vehicleName: data.vehicleName || data.VehicleName,
        vehicleId: data.vehicleId || data.VechileId,
        bookingId: data._id || data.id,
      });
    });
  },

  // Disconnect socket
  disconnectSocket: () => {
    if (notificationSocket) {
      console.log('🔔 Disconnecting notification socket');
      notificationSocket.disconnect();
      notificationSocket = null;
      set({ socketConnected: false });
    }
  },
}));