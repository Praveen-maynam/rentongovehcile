// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useNotificationStore } from "../../../store/notification.store";
// // import { Bell, Check, X, Trash2 } from "lucide-react";

// // const Notification: React.FC = () => {
// //   const navigate = useNavigate();
// //   const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications } =
// //     useNotificationStore();

// //   const getNotificationIcon = (type: string) => {
// //     switch (type) {
// //       case "ride_completed":
// //         return "🏁";
// //       case "booking_confirmed":
// //         return "✅";
// //       case "booking_declined":
// //         return "❌";
// //       default:
// //         return "🔔";
// //     }
// //   };

// //   const formatTime = (timestamp: Date) => {
// //     const now = new Date();
// //     const notifDate = new Date(timestamp);
// //     const diffInMs = now.getTime() - notifDate.getTime();
// //     const diffInMins = Math.floor(diffInMs / (1000 * 60));
// //     const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
// //     const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

// //     if (diffInMins < 1) return "Just now";
// //     if (diffInMins < 60) return `${diffInMins} min ago`;
// //     if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
// //     if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    
// //     return notifDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
// //   };

// //   const handleFeedbackClick = (notification: any) => {
// //     markAsRead(notification.id);
// //     navigate(`/feedback?vehicleId=${notification.vehicleId}&vehicleName=${notification.vehicleName}&bookingId=${notification.bookingId}`);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
// //       <div className="max-w-4xl mx-auto">
// //         {/* Header */}
// //         <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
// //           <div className="flex items-center justify-between mb-4">
// //             <div className="flex items-center gap-3">
// //               <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
// //               <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Notifications</h1>
// //               {unreadCount > 0 && (
// //                 <span className="bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-full">
// //                   {unreadCount}
// //                 </span>
// //               )}
// //             </div>
            
// //             {notifications.length > 0 && (
// //               <div className="flex gap-2">
// //                 {unreadCount > 0 && (
// //                   <button
// //                     onClick={markAllAsRead}
// //                     className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
// //                   >
// //                     <Check className="w-3 h-3 sm:w-4 sm:h-4" />
// //                     <span className="hidden sm:inline">Mark all read</span>
// //                     <span className="sm:hidden">Read all</span>
// //                   </button>
// //                 )}
// //                 <button
// //                   onClick={clearAllNotifications}
// //                   className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
// //                 >
// //                   <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
// //                   <span className="hidden sm:inline">Clear all</span>
// //                   <span className="sm:hidden">Clear</span>
// //                 </button>
// //               </div>
// //             )}
// //           </div>

// //           <p className="text-xs sm:text-sm text-gray-600">
// //             Stay updated with your ride completions and booking updates
// //           </p>
// //         </div>

// //         {/* Notifications List */}
// //         <div className="space-y-3 sm:space-y-4">
// //           {notifications.length === 0 ? (
// //             <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
// //               <Bell className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
// //               <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No notifications yet</h3>
// //               <p className="text-xs sm:text-sm text-gray-500">
// //                 You'll see ride completions and booking updates here
// //               </p>
// //             </div>
// //           ) : (
// //             notifications.map((notification) => (
// //               <div
// //                 key={notification.id}
// //                 className={`bg-white rounded-xl shadow-md p-4 sm:p-6 transition hover:shadow-lg ${
// //                   !notification.read ? "border-l-4 border-blue-600" : ""
// //                 }`}
// //               >
// //                 <div className="flex items-start gap-3 sm:gap-4">
// //                   {/* Icon */}
// //                   <div className="flex-shrink-0">
// //                     <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl ${
// //                       notification.type === "ride_completed"
// //                         ? "bg-green-100"
// //                         : notification.type === "booking_confirmed"
// //                         ? "bg-blue-100"
// //                         : notification.type === "booking_declined"
// //                         ? "bg-red-100"
// //                         : "bg-gray-100"
// //                     }`}>
// //                       {getNotificationIcon(notification.type)}
// //                     </div>
// //                   </div>

// //                   {/* Content */}
// //                   <div className="flex-1 min-w-0">
// //                     <div className="flex items-start justify-between gap-2 mb-1">
// //                       <h3 className="text-sm sm:text-base font-semibold text-gray-900">
// //                         {notification.title}
// //                       </h3>
// //                       {!notification.read && (
// //                         <button
// //                           onClick={() => markAsRead(notification.id)}
// //                           className="flex-shrink-0 text-blue-600 hover:text-blue-700"
// //                           title="Mark as read"
// //                         >
// //                           <Check className="w-4 h-4 sm:w-5 sm:h-5" />
// //                         </button>
// //                       )}
// //                     </div>
                    
// //                     <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
// //                       {notification.message}
// //                     </p>

// //                     {notification.vehicleName && (
// //                       <div className="bg-gray-50 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
// //                         <p className="text-xs sm:text-sm font-medium text-gray-700">
// //                           🚗 {notification.vehicleName}
// //                         </p>
// //                       </div>
// //                     )}

// //                     {/* Feedback Button for ride_completed notifications */}
// //                     {notification.type === "ride_completed" && notification.requiresFeedback && (
// //                       <button
// //                         onClick={() => handleFeedbackClick(notification)}
// //                         className="w-full sm:w-auto bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition shadow-md mb-2"
// //                       >
// //                         Give Feedback
// //                       </button>
// //                     )}

// //                     <div className="flex items-center justify-between mt-2">
// //                       <span className="text-xs text-gray-500">
// //                         {formatTime(notification.timestamp)}
// //                       </span>
// //                       <button
// //                         onClick={() => deleteNotification(notification.id)}
// //                         className="text-gray-400 hover:text-red-600 transition"
// //                         title="Delete notification"
// //                       >
// //                         <X className="w-4 h-4" />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Notification;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useNotificationStore } from "../../../store/notification.store";
// import { Bell, Check, X, Trash2 } from "lucide-react";
// import CarLogo from "../../../assets/icons/CarLogo.png";
 
// const Notification: React.FC = () => {
//   const navigate = useNavigate();
//   const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications } =
//     useNotificationStore();
 
 
// // ✅ Helper to get the right icon
// const getNotificationIcon = (type: string) => {
//   switch (type) {
//     case "ride_completed":
//       return (
//         <img
//           src={CarLogo}
//           alt="Ride Completed"
//           className="w-8 h-8 inline-block"
//         />
//       );
//     case "booking_confirmed":
//       return (
//         <img
//           src={CarLogo}
//           alt="Booking Confirmed"
//           className="inline-block"
//           style={{ width: "30px", height: "30px" }}
//         />
//       );
//     case "booking_declined":
//       return "❌";
//     default:
//       return "🔔";
//   }
// };
 
 
//   // ✅ Helper to calculate "time ago"
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
 
//   // ✅ Feedback click handler
//   const handleFeedbackClick = (notification: any) => {
//     markAsRead(notification.id);
//     navigate(
//       `/feedback?vehicleId=${notification.vehicleId}&vehicleName=${notification.vehicleName}&bookingId=${notification.bookingId}`
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
 
//             {notifications.length > 0 && (
//               <div className="flex gap-2">
//                 {unreadCount > 0 && (
//                   <button
//                     onClick={markAllAsRead}
//                     className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
//                   >
//                     <Check className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span className="hidden sm:inline">Mark all read</span>
//                     <span className="sm:hidden">Read all</span>
//                   </button>
//                 )}
//                 <button
//                   onClick={clearAllNotifications}
//                   className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
//                 >
//                   <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
//                   <span className="hidden sm:inline">Clear all</span>
//                   <span className="sm:hidden">Clear</span>
//                 </button>
//               </div>
//             )}
//           </div>
 
//           <p className="text-xs sm:text-sm text-gray-600">
//             Stay updated with your ride completions and booking updates
//           </p>
//         </div>
 
//         {/* Notifications List */}
//         <div className="space-y-3 sm:space-y-4">
//           {notifications.length === 0 ? (
//             <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
//               <Bell className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
//                 No notifications yet
//               </h3>
//               <p className="text-xs sm:text-sm text-gray-500">
//                 You'll see ride completions and booking updates here
//               </p>
//             </div>
//           ) : (
//             notifications.map((notification) => (
//               <div
//                 key={notification.id}
//                 className={`bg-white rounded-xl shadow-md p-4 sm:p-6 transition hover:shadow-lg ${
//                   !notification.read ? "border-l-4 border-blue-600" : ""
//                 }`}
//               >
//                 <div className="flex items-start gap-3 sm:gap-4">
//                   {/* Icon */}
//                   <div className="flex-shrink-0">
//                     <div
//                       className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl ${
//                         notification.type === "ride_completed"
//                           ? "bg-green-100"
//                           : notification.type === "booking_confirmed"
//                           ? "bg-blue-100"
//                           : notification.type === "booking_declined"
//                           ? "bg-red-100"
//                           : "bg-gray-100"
//                       }`}
//                     >
//                       {getNotificationIcon(notification.type)}
//                     </div>
//                   </div>
 
//                   {/* Content */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between gap-2 mb-1">
//                       <h3 className="text-sm sm:text-base font-semibold text-gray-900">
//                         {notification.title}
//                       </h3>
//                       {!notification.read && (
//                         <button
//                           onClick={() => markAsRead(notification.id)}
//                           className="flex-shrink-0 text-blue-600 hover:text-blue-700"
//                           title="Mark as read"
//                         >
//                           <Check className="w-4 h-4 sm:w-5 sm:h-5" />
//                         </button>
//                       )}
//                     </div>
 
//                     <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
//                       {notification.message}
//                     </p>
 
//                     {notification.vehicleName && (
//                       <div className="bg-gray-50 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
//                         <p className="text-xs sm:text-sm font-medium text-gray-700">
//                           🚗 {notification.vehicleName}
//                         </p>
//                       </div>
//                     )}
 
//                     {/* Feedback Button */}
//                     {notification.type === "ride_completed" &&
//                       notification.requiresFeedback && (
//                         <button
//                           onClick={() => handleFeedbackClick(notification)}
//                           className="w-full sm:w-auto bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition shadow-md mb-2"
//                         >
//                           Give Feedback
//                         </button>
//                       )}
 
//                     {/* Time + Delete */}
//                     <div className="flex items-center justify-between mt-2">
//                       <span className="text-xs text-gray-500">
//                         {getTimePassed(notification.timestamp)}
//                       </span>
//                       <button
//                         onClick={() => deleteNotification(notification.id)}
//                         className="text-gray-400 hover:text-red-600 transition"
//                         title="Delete notification"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default Notification;
<<<<<<< HEAD
=======









>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../../../store/notification.store";
import CarLogo from "../../../assets/icons/CarLogo.png";
import AutomaticLogo from "../../../assets/icons/AutomaticLogo.png";
import DriverLogo from "../../../assets/icons/DriverLogo.png";
import { Bell, Check, X, Trash2 } from "lucide-react";
<<<<<<< HEAD
 
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
 
=======

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

>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
  // TEST NOTIFICATIONS - Remove after testing
  useEffect(() => {
    if (notifications.length === 0) {
      // Ride completed notification
      addNotification({
        type: 'ride_completed',
        title: 'Ride Completed',
        message: 'Your ride has been completed. Please give feedback.',
        requiresFeedback: true,
        vehicleId: 'car-123',
        vehicleName: 'Hyundai Verna',
        bookingId: 'booking-456'
      });
<<<<<<< HEAD
 
=======
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
      // Booking confirmation notification
      addNotification({
        type: 'booking_confirmed',
        title: 'Booking Confirmed',
        message: 'Your car has been booked successfully.',
        requiresFeedback: true,
        vehicleId: 'car-789',
        vehicleName: 'Toyota Innova',
        bookingId: 'booking-789'
      });
<<<<<<< HEAD
 
=======
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
      // Bike booking notification
      addNotification({
        type: 'booking_confirmed',
        title: 'Bike Booked',
        message: 'Your bike has been booked successfully.',
        requiresFeedback: true,
        vehicleId: 'bike-101',
        vehicleName: 'Royal Enfield Classic',
        bookingId: 'booking-101'
      });
<<<<<<< HEAD
 
=======
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
      // General notification
      addNotification({
        type: 'general',
        title: 'Rental Ended',
        message: 'Your rental period has ended.',
        requiresFeedback: true,
        vehicleId: 'car-555',
        vehicleName: 'Honda City',
        bookingId: 'booking-555'
      });
    }
  }, []);
<<<<<<< HEAD
 
=======
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
  // Helper to calculate "time ago"
  const getTimePassed = (timestamp: string | Date): string => {
    const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
<<<<<<< HEAD
 
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
 
=======

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };
<<<<<<< HEAD
 
=======
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
  // Feedback click handler
  const handleFeedbackClick = (notification: any) => {
    markAsRead(notification.id);
    navigate(`/feedback?vehicleId=${notification.vehicleId}&vehicleName=${notification.vehicleName}&bookingId=${notification.bookingId}`);
  };
<<<<<<< HEAD
 
=======

>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
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
<<<<<<< HEAD
 
=======

>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
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
<<<<<<< HEAD
 
=======

>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
          <p className="text-xs sm:text-sm text-gray-600">
            Stay updated with your ride completions and booking updates
          </p>
        </div>
<<<<<<< HEAD
 
=======

>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
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
                    alt="Vehicle Logo"
                    className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                  />
<<<<<<< HEAD
 
=======
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
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
<<<<<<< HEAD
 
=======
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
                    {/* Message */}
                    <p className="text-sm text-gray-600 mb-3">
                      {notification.message}
                    </p>
<<<<<<< HEAD
 
=======
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
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
<<<<<<< HEAD
 
=======
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-3 mt-4">
                      <div className="flex flex-wrap gap-3">
                        {/* FEEDBACK BUTTON - Shows for ALL notifications with requiresFeedback or vehicleId */}
                        {(notification.requiresFeedback || notification.vehicleId) && (
                          <button
                            onClick={() => handleFeedbackClick(notification)}
                            className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-5 py-2 rounded-md hover:opacity-90 transition-all shadow-sm"
                          >
                            Give Feedback
                          </button>
                        )}
<<<<<<< HEAD
 
=======
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
                        {/* Booking Confirmation Buttons - Optional Yes/No */}
                        {notification.type === "booking_confirmed" && (
                          <>
                           
                          </>
                        )}
                      </div>
<<<<<<< HEAD
 
=======
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
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
<<<<<<< HEAD
 
export default Notifications;
 
 
 
=======

export default Notifications;
>>>>>>> c4a2d7833a5f4df87f7cf7b8c290d33c6263a92c
