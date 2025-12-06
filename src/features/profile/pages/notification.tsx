// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useNotificationStore, Notification } from "../../../store/notification.store";
// import CarLogo from "../../../assets/icons/CarLogo.png";
// import AutomaticLogo from "../../../assets/icons/AutomaticLogo.png";
// import DriverLogo from "../../../assets/icons/DriverLogo.png";
// import fuel from "../../../assets/icons/fuel.jpeg";
// import { Bell, Check, X, Trash2, RefreshCw, Loader2, CheckCircle, XCircle, Clock, Truck } from "lucide-react";

// // ⏱️ EXPIRY TIME: 2 minutes
// const EXPIRY_TIME = 2 * 60 * 1000;

// // Get status badge color and text
// const getStatusBadge = (notif: Notification) => {
//   if (notif.type === 'booking_confirmed') {
//     return { color: 'bg-green-100 text-green-800 border-green-200', text: 'Confirmed', icon: CheckCircle };
//   }
//   if (notif.type === 'booking_declined') {
//     return { color: 'bg-red-100 text-red-800 border-red-200', text: 'Cancelled', icon: XCircle };
//   }
//   if (notif.type === 'booking_timeout') {
//     return { color: 'bg-orange-100 text-orange-800 border-orange-200', text: 'Expired', icon: Clock };
//   }
//   if (notif.type === 'ride_completed') {
//     return { color: 'bg-blue-100 text-blue-800 border-blue-200', text: 'Completed', icon: CheckCircle };
//   }

//   if (notif.bookingStatus) {
//     switch (notif.bookingStatus) {
//       case 'Pending':
//         return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', text: 'Pending', icon: Clock };
//       case 'Confirmed':
//         return { color: 'bg-green-100 text-green-800 border-green-200', text: 'Confirmed', icon: CheckCircle };
//       case 'Rejected':
//         return { color: 'bg-red-100 text-red-800 border-red-200', text: 'Rejected', icon: XCircle };
//       case 'Expired':
//         return { color: 'bg-orange-100 text-orange-800 border-orange-200', text: 'Expired', icon: Clock };
//       case 'Completed':
//         return { color: 'bg-blue-100 text-blue-800 border-blue-200', text: 'Completed', icon: CheckCircle };
//     }
//   }

//   return null;
// };

// const Notifications: React.FC = () => {
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId") || "";

//   const {
//     notifications,
//     unreadCount,
//     isLoading,
//     error,
//     markAsRead,
//     markAllAsRead,
//     deleteNotification,
//     clearAllNotifications,
//     fetchNotifications,
//     confirmBooking,
//     rejectBooking,
//   } = useNotificationStore();

//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [actionLoading, setActionLoading] = useState<Record<string, 'confirm' | 'reject' | null>>({});

//   // ⏱️ AUTO-EXPIRY CHECKER - Runs every 500ms
//   useEffect(() => {
//     const interval = setInterval(() => {
//       notifications.forEach((notification) => {
//         if (isNewBookingRequest(notification)) {
//           const remaining = notification.expiresAt - Date.now();
//           if (remaining <= 0) {
//             handleExpireNotification(notification.id, notification.bookingId);
//           }
//         }
//       });
//     }, 500);

//     return () => clearInterval(interval);
//   }, [notifications]);

//   useEffect(() => {
//     if (userId) {
//       console.log('🔔 Fetching notifications for user:', userId);
//       fetchNotifications(userId);
//     }
//   }, [userId, fetchNotifications]);

//   const handleRefresh = async () => {
//     if (!userId || isRefreshing) return;
//     setIsRefreshing(true);
//     await fetchNotifications(userId);
//     setIsRefreshing(false);
//   };

//   const getTimePassed = (timestamp: string | Date): string => {
//     const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
//     const now = new Date();
//     const diffMs = now.getTime() - date.getTime();

//     const diffMinutes = Math.floor(diffMs / (1000 * 60));
//     const diffHours = Math.floor(diffMinutes / 60);
//     const diffDays = Math.floor(diffHours / 24);

//     if (diffMinutes < 1) return "Just now";
//     if (diffMinutes < 60) return `${diffMinutes} min ago`;
//     if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
//     return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
//   };

//   const getRemainingTime = (expiresAt: number): string => {
//     const now = Date.now();
//     const remaining = expiresAt - now;

//     if (remaining <= 0) return '00:00';

//     const minutes = Math.floor(remaining / 60000);
//     const seconds = Math.floor((remaining % 60000) / 1000);

//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const TimeDisplay = ({ expiresAt }: { expiresAt: number }) => {
//     const [time, setTime] = useState(getRemainingTime(expiresAt));

//     useEffect(() => {
//       const interval = setInterval(() => {
//         setTime(getRemainingTime(expiresAt));
//       }, 1000);

//       return () => clearInterval(interval);
//     }, [expiresAt]);

//     const remaining = expiresAt - Date.now();
//     const isExpiring = remaining < 30000;

//     return (
//       <span className={`font-mono font-bold ${isExpiring ? 'text-red-600 animate-pulse' : 'text-orange-600'}`}>
//         {time}
//       </span>
//     );
//   };

//   // ⏰ HANDLE EXPIRY - Called when timer reaches 00:00
//   const handleExpireNotification = async (notificationId: string, bookingId: string) => {
//     console.log('⏰ Notification expired:', notificationId);

//     try {
//       // Call backend to cancel/expire the booking
//       await rejectBooking(notificationId, bookingId);

//       // Fetch updated notifications (backend should change type to 'booking_timeout')
//       await fetchNotifications(userId);
//     } catch (error) {
//       console.error('Error expiring notification:', error);
//     }
//   };

//   const handleConfirmBooking = async (notification: any) => {
//     setActionLoading(prev => ({ ...prev, [notification.id]: 'confirm' }));

//     try {
//       await confirmBooking(notification.id, notification.bookingId);
//       markAsRead(notification.id);

//       // Refresh notifications to get updated status
//       await fetchNotifications(userId);
//     } catch (error) {
//       console.error('Error confirming booking:', error);
//       alert('Failed to confirm booking');
//     } finally {
//       setActionLoading(prev => ({ ...prev, [notification.id]: null }));
//     }
//   };

//   const handleRejectBooking = async (notification: any) => {
//     setActionLoading(prev => ({ ...prev, [notification.id]: 'reject' }));

//     try {
//       await rejectBooking(notification.id, notification.bookingId);

//       // Refresh notifications to get updated status
//       await fetchNotifications(userId);
//     } catch (error) {
//       console.error('Error rejecting booking:', error);
//       alert('Failed to reject booking');
//     } finally {
//       setActionLoading(prev => ({ ...prev, [notification.id]: null }));
//     }
//   };

//   const handleFeedbackClick = (notification: any) => {
//     markAsRead(notification.id);
//     navigate(`/feedback?vehicleId=${notification.vehicleId}&vehicleName=${notification.vehicleName}&bookingId=${notification.bookingId}`);
//   };

//   // ✅ CHECK IF NOTIFICATION IS A NEW BOOKING REQUEST (STRICT CONDITIONS)
//   const isNewBookingRequest = (notification: any): boolean => {
//     return (
//       notification.type === 'booking_request' &&
//       notification.bookingStatus === 'Pending' &&
//       notification.expiresAt &&
//       notification.expiresAt > Date.now()
//     );
//   };

//   // ✅ CHECK IF NOTIFICATION REQUIRES FEEDBACK BUTTON
//   const requiresFeedbackButton = (notification: any): boolean => {
//     return (
//       notification.type === 'booking_confirmed' ||
//       notification.bookingStatus === 'Confirmed' ||
//       notification.type === 'ride_completed' ||
//       notification.requiresFeedback === true ||
//       notification.bookingStatus === 'Completed'
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
//               <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Notifications</h1>
//               {unreadCount > 0 && (
//                 <span className="bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-full">
//                   {unreadCount}
//                 </span>
//               )}
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={handleRefresh}
//                 disabled={isRefreshing || isLoading}
//                 className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 hover:text-gray-700 font-medium disabled:opacity-50"
//               >
//                 <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//                 <span className="hidden sm:inline">Refresh</span>
//               </button>
//               {notifications.length > 0 && (
//                 <>
//                   {unreadCount > 0 && (
//                     <button
//                       onClick={() => markAllAsRead(userId)}
//                       className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
//                     >
//                       <Check className="w-3 h-3 sm:w-4 sm:h-4" />
//                       <span className="hidden sm:inline">Mark all read</span>
//                       <span className="sm:hidden">Read all</span>
//                     </button>
//                   )}
//                   <button
//                     onClick={() => clearAllNotifications(userId)}
//                     className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
//                   >
//                     <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span className="hidden sm:inline">Clear all</span>
//                     <span className="sm:hidden">Clear</span>
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//           <p className="text-xs sm:text-sm text-gray-600">
//             Stay updated with your ride completions and booking updates
//           </p>

//           {error && (
//             <div className="mt-3 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
//               {error}
//             </div>
//           )}
//         </div>

//         {/* Notifications List */}
//         <div className="space-y-3 sm:space-y-4">
//           {isLoading && notifications.length === 0 ? (
//             <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
//               <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mx-auto mb-4 animate-spin" />
//               <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
//                 Loading notifications...
//               </h3>
//               <p className="text-xs sm:text-sm text-gray-500">
//                 Please wait while we fetch your notifications
//               </p>
//             </div>
//           ) : notifications.length === 0 ? (
//             <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
//               <Bell className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
//                 No notifications yet
//               </h3>
//               <p className="text-xs sm:text-sm text-gray-500">
//                 You'll see ride completions and booking updates here
//               </p>
//               <button
//                 onClick={handleRefresh}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
//               >
//                 Refresh
//               </button>
//             </div>
//           ) : (
//             notifications.map((notification) => {
//               const isBookingRequest = isNewBookingRequest(notification);
//               const showFeedbackButton = requiresFeedbackButton(notification);
//               const statusBadge = getStatusBadge(notification);
//               const StatusIcon = statusBadge?.icon;
//               const loading = actionLoading[notification.id];

//               // ============================================
//               // SPECIAL CARD FOR NEW BOOKING REQUESTS ONLY
//               // ============================================
//               if (isBookingRequest) {
//                 return (
//                   <div
//                     key={notification.id}
//                     className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 overflow-hidden animate-fadeIn"
//                   >
//                     {/* Timer Badge - Top Right */}
//                     <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-blue-100">
//                       <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1.5 rounded-full shadow-md">
//                         <div className="flex items-center gap-1.5 text-xs font-bold">
//                           <Clock size={14} />
//                           <TimeDisplay expiresAt={notification.expiresAt} />
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-3 mb-2">
//                         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg">
//                           <Truck size={24} className="text-white" strokeWidth={2} />
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-bold text-gray-900">
//                             {notification.title || "New Booking Request"}
//                           </h3>
//                           <p className="text-sm text-gray-500">
//                             {getTimePassed(notification.timestamp)}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Vehicle Details */}
//                     <div className="p-5">
//                       <h4 className="text-xl font-bold text-gray-900 mb-4">
//                         {notification.vehicleName || "Car"}
//                       </h4>

//                       {/* Booking Details */}
//                       {(notification.customerName || notification.fromDate || notification.totalPrice) && (
//                         <div className="bg-gray-50 rounded-lg p-3 mb-5 space-y-1.5 text-sm">
//                           {notification.customerName && (
//                             <p className="text-gray-700">
//                               <span className="font-medium">Customer:</span> {notification.customerName}
//                             </p>
//                           )}
//                           {notification.contactNumber && (
//                             <p className="text-gray-700">
//                               <span className="font-medium">Phone:</span> {notification.contactNumber}
//                             </p>
//                           )}
//                           {notification.fromDate && (
//                             <p className="text-gray-700">
//                               <span className="font-medium">From:</span> {notification.fromDate}
//                             </p>
//                           )}
//                           {notification.toDate && (
//                             <p className="text-gray-700">
//                               <span className="font-medium">To:</span> {notification.toDate}
//                             </p>
//                           )}
//                           {notification.totalPrice && (
//                             <p className="text-gray-700 font-semibold border-t pt-2 mt-2">
//                               <span className="font-medium">Total:</span> ₹{notification.totalPrice}
//                             </p>
//                           )}
//                         </div>
//                       )}

//                       {/* YES / NO BUTTONS - Only for NEW booking requests */}
//                       <div className="flex gap-3">
//                         <button
//                           onClick={() => handleConfirmBooking(notification)}
//                           disabled={loading !== null}
//                           className="flex-1 py-3.5 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-800 hover:via-blue-700 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
//                         >
//                           {loading === 'confirm' ? (
//                             <Loader2 className="animate-spin" size={20} />
//                           ) : (
//                             <>
//                               <Check size={20} />
//                               Yes
//                             </>
//                           )}
//                         </button>
//                         <button
//                           onClick={() => handleRejectBooking(notification)}
//                           disabled={loading !== null}
//                           className="flex-1 py-3.5 rounded-xl font-semibold text-lg text-red-600 bg-white border-2 border-red-600 hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                         >
//                           {loading === 'reject' ? (
//                             <Loader2 className="animate-spin" size={20} />
//                           ) : (
//                             <>
//                               <X size={20} />
//                               No
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               }

//               // ============================================
//               // REGULAR NOTIFICATION CARD
//               // ============================================
//               return (
//                 <div
//                   key={notification.id}
//                   className={`bg-white rounded-lg shadow-sm transition hover:shadow-md ${!notification.read ? "border-l-4 border-blue-500" : "border border-gray-200"
//                     }`}
//                 >
//                   <div className="flex items-center justify-between p-4 border-b border-gray-100">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={CarLogo}
//                         alt="Vehicle"
//                         className="w-10 h-10"
//                       />
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <span className="text-gray-900 font-medium text-base">
//                           {notification.title}
//                         </span>
//                         {statusBadge && (
//                           <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusBadge.color}`}>
//                             {StatusIcon && <StatusIcon className="w-3 h-3" />}
//                             {statusBadge.text}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                     <span className="text-sm text-gray-400 whitespace-nowrap">
//                       {getTimePassed(notification.timestamp)}
//                     </span>
//                   </div>

//                   <div className="p-4">
//                     {notification.vehicleName && (
//                       <div className="mb-3">
//                         <h3 className="text-gray-900 font-semibold text-base">
//                           {notification.vehicleName}
//                         </h3>
//                       </div>
//                     )}

//                     <div className="flex flex-col gap-2 text-sm text-gray-700">
//                       <div className="flex items-center gap-2">
//                         <img src={AutomaticLogo} alt="Automatic" className="w-5 h-5" />
//                         <span>{localStorage.getItem('transmission') || 'Automatic'}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <img src={DriverLogo} alt="Driver" className="w-5 h-5" />
//                         <span>{localStorage.getItem('seaters') || '5 Seaters'}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <img src={fuel} alt="oil" className="w-5 h-5" />
//                         <span>{localStorage.getItem('fuelType') || 'Petrol'}</span>
//                       </div>
//                     </div>

//                     {(notification.customerName || notification.fromDate || notification.totalPrice) && (
//                       <div className="bg-gray-50 rounded-lg p-3 mb-3 space-y-1 mt-3">
//                         {notification.customerName && (
//                           <p className="text-sm text-gray-700">
//                             <span className="font-medium">Customer:</span> {notification.customerName}
//                           </p>
//                         )}
//                         {notification.fromDate && (
//                           <p className="text-sm text-gray-700">
//                             <span className="font-medium">From:</span> {notification.fromDate}
//                           </p>
//                         )}
//                         {notification.toDate && (
//                           <p className="text-sm text-gray-700">
//                             <span className="font-medium">To:</span> {notification.toDate}
//                           </p>
//                         )}
//                         {notification.totalPrice && (
//                           <p className="text-sm text-gray-700">
//                             <span className="font-medium">Total:</span> ₹{notification.totalPrice}
//                           </p>
//                         )}
//                       </div>
//                     )}

//                     {notification.message && (
//                       <p className="text-sm text-gray-600 mb-3">
//                         {notification.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* BOTTOM SECTION - Feedback Button (LEFT) and Action Icons (RIGHT) */}
//                   <div className="flex items-center justify-between px-4 pb-4">
//                     {/* LEFT SIDE - Feedback Button */}
//                     <div className="flex gap-2">
//                       {showFeedbackButton && (
//                         <button
//                           onClick={() => handleFeedbackClick(notification)}
//                           className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-all shadow-sm"
//                         >
//                           Give Feedback
//                         </button>
//                       )}
//                     </div>

//                     {/* RIGHT SIDE - Mark Read & Delete Icons */}
//                     <div className="flex items-center gap-2">
//                       {!notification.read && (
//                         <button
//                           onClick={() => markAsRead(notification.id)}
//                           className="text-blue-600 hover:text-blue-700 p-1.5 rounded-md hover:bg-blue-50 transition"
//                           title="Mark as read"
//                         >
//                           <Check className="w-5 h-5" />
//                         </button>
//                       )}
//                       <button
//                         onClick={() => deleteNotification(notification.id)}
//                         className="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition"
//                         title="Delete notification"
//                       >
//                         <X className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>

//       <style>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.98);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Notifications;
















import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore, Notification } from "../../../store/notification.store";
import CarLogo from "../../../assets/icons/CarLogo.png";
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
} from "lucide-react";

// ⏱️ EXPIRY TIME: 2 minutes
const EXPIRY_TIME = 2 * 60 * 1000;

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

  // ✅ FEEDBACK CLICK HANDLER - Works with or without bookingId
  const handleFeedbackClick = (notification: any) => {
    markAsRead(notification.id);
    const vehicleName = getVehicleName(notification);

    // ✅ Use bookingId if available, otherwise use a fallback
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

  // ✅ CHECK IF NOTIFICATION IS A NEW BOOKING REQUEST (has YES/NO buttons)
  const isNewBookingRequest = (notification: any): boolean => {
    return (
      notification.type === 'booking_request' &&
      notification.bookingStatus === 'Pending' &&
      notification.expiresAt &&
      notification.expiresAt > Date.now()
    );
  };

  // ✅ CHECK IF NOTIFICATION IS BOOKING COMPLETED (show feedback button)
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
            notifications.map((notification) => {
              const isBookingRequest = isNewBookingRequest(notification);
              const statusBadge = getStatusBadge(notification);
              const StatusIcon = statusBadge?.icon;
              const loading = actionLoading[notification.id];
              const vehicleName = getVehicleName(notification);

              // 🔍 DEBUG: Log notification details
              const isCompleted = isBookingCompleted(notification);
              console.log('📋 Notification Debug:', {
                id: notification.id,
                title: notification.title,
                type: notification.type,
                bookingStatus: notification.bookingStatus,
                isCompleted,
                feedbackGiven: notification.feedbackGiven,
                shouldShowButton: isCompleted && !notification.feedbackGiven
              });

              // ============================================
              // SPECIAL CARD FOR NEW BOOKING REQUESTS (YES/NO BUTTONS)
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
                      <h3 className="text-lg font-bold text-gray-900 mb-1 pr-32">
                        {notification.title || "New Booking Request"}
                      </h3>
                      <p className="text-xs text-gray-500">{getTimePassed(notification.timestamp)}</p>
                    </div>

                    {/* Vehicle Details */}
                    <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <img src={CarLogo} alt="Car" className="w-16 h-16 object-contain" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Vehicle Name</p>
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
              // REGULAR NOTIFICATION CARD (WITH FEEDBACK BUTTON)
              // ============================================
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border ${notification.read ? 'border-gray-200' : 'border-blue-300 bg-blue-50/30'
                    }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-900 mb-1">
                        {notification.title}
                      </h3>
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
                    <div className="flex items-center gap-3 mb-3">
                      <img src={CarLogo} alt="Car" className="w-14 h-14 object-contain" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Vehicle</p>
                        <p className="text-sm font-bold text-gray-900">{vehicleName}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
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
                  </div>

                  {/* ✅ FEEDBACK BUTTON - ONLY FOR BOOKING COMPLETED CARDS */}
                  {isBookingCompleted(notification) && !notification.feedbackGiven && (
                    <button
                      onClick={() => handleFeedbackClick(notification)}
                      className="w-full mb-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold text-base rounded-lg hover:from-blue-700 hover:to-blue-500 transition-all shadow-md"
                    >
                      Give Feedback
                    </button>
                  )}

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
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;