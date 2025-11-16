// // import React from 'react';
 
// // interface BookingRejectModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// // }
 
// // const BookingRejectModal: React.FC<BookingRejectModalProps> = ({ isOpen, onClose }) => {
// //   if (!isOpen) return null;
 
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center">
// //       {/* Backdrop with blur effect */}
// //       <div
// //         className="absolute inset-0 bg-black/40 backdrop-blur-sm"
// //         onClick={onClose}
// //       />
     
// //       {/* Modal Card */}
// //       <div className="relative bg-white rounded-3xl w-[85vw] max-w-md mx-4 shadow-2xl animate-fadeIn">
// //         <div className="px-8 py-10 flex flex-col items-center">
// //           {/* Sad Face Icon */}
// //           <div className="mb-6">
// //             <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg">
// //               <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-700 to-cyan-500 flex items-center justify-center">
// //                 <svg
// //                   viewBox="0 0 100 100"
// //                   className="w-20 h-20 text-white"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeWidth="6"
// //                   strokeLinecap="round"
// //                 >
// //                   {/* Eyes */}
// //                   <circle cx="35" cy="40" r="4" fill="currentColor" />
// //                   <circle cx="65" cy="40" r="4" fill="currentColor" />
// //                   {/* Sad mouth */}
// //                   <path d="M 30 70 Q 50 55 70 70" />
// //                 </svg>
// //               </div>
// //             </div>
// //           </div>
         
// //           {/* Title */}
// //           <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 leading-tight px-2">
// //             Sorry! your request was not accepted
// //           </h2>
         
// //           {/* Okay Button */}
// //           <button
// //             onClick={onClose}
// //             className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-semibold text-lg py-4 rounded-xl shadow-lg transition-all duration-200 active:scale-95"
// //           >
// //             Okay
// //           </button>
// //         </div>
// //       </div>
     
// //       <style>{`
// //         @keyframes fadeIn {
// //           from {
// //             opacity: 0;
// //             transform: scale(0.95);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: scale(1);
// //           }
// //         }
// //         .animate-fadeIn {
// //           animation: fadeIn 0.2s ease-out;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };
 
// // // export default BookingRejectModal;



// // BookingRejectModal.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface BookingRejectModalProps {
//   isOpen: boolean;
//   onClose?: () => void;
//   bookingId?: string;
//   ownerId?: string;
//   customerId?: string;
//   onRejectSuccess?: () => void;
// }

// const BookingRejectModal: React.FC<BookingRejectModalProps> = ({ 
//   isOpen, 
//   onClose,
//   bookingId,
//   ownerId,
//   customerId,
//   onRejectSuccess
// }) => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   if (!isOpen) return null;

//   const handleReject = async () => {
//     // Validate required fields
//     if (!bookingId || !ownerId) {
//       setError("Missing booking or owner information");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       // API call to reject booking (same structure as acceptance)
//       const requestOptions = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           bookingId: bookingId,
//           ownerId: ownerId,
//           status: "rejected" // Changed from "accepted" to "rejected"
//         }),
//         redirect: "follow" as RequestRedirect
//       };

//       const response = await fetch(
//         "http://3.110.122.127:3000/updateBookingStatus", 
//         requestOptions
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("Booking rejected successfully:", result);

//       // Trigger real-time notification to customer
//       if (customerId || result.customerId) {
//         await sendCustomerNotification(customerId || result.customerId, bookingId);
//       }

//       // Call success callback
//       if (onRejectSuccess) {
//         onRejectSuccess();
//       }

//       // Navigate to rental page after short delay
//       setTimeout(() => {
//         navigate("/rental");
//       }, 1500);

//     } catch (err) {
//       console.error("Error rejecting booking:", err);
//       setError(err instanceof Error ? err.message : "Failed to reject booking");
//       setIsLoading(false);
//     }
//   };

//   // Function to send real-time notification to customer
//   const sendCustomerNotification = async (customerId: string, bookingId: string) => {
//     try {
//       // If you're using WebSocket/Socket.io for real-time updates
//       // const socket = io('http://3.110.122.127:3000');
//       // socket.emit('bookingRejected', { customerId, bookingId });

//       // OR if using HTTP polling/push notification
//       await fetch('http://3.110.122.127:3000/notifyCustomer', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           customerId: customerId,
//           bookingId: bookingId,
//           notificationType: 'booking_rejected',
//           message: 'Your booking request was not accepted'
//         })
//       });
//     } catch (error) {
//       console.error('Failed to send customer notification:', error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-8 text-center transform transition-all duration-300">
//         <div className="flex justify-center mb-6">
//           <div className="w-28 h-28 bg-gradient-to-b from-red-600 to-red-400 rounded-full flex items-center justify-center">
//             <span className="text-white text-6xl">✕</span>
//           </div>
//         </div>

//         <h2 className="text-2xl font-semibold text-gray-800 mb-4 leading-snug">
//           Reject This Booking?
//         </h2>

//         <p className="text-gray-600 mb-8">
//           The customer will be notified about the rejection.
//         </p>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         <div className="flex gap-3">
//           <button
//             onClick={onClose}
//             disabled={isLoading}
//             className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-lg py-4 rounded-xl shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Cancel
//           </button>
          
//           <button
//             onClick={handleReject}
//             disabled={isLoading}
//             className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold text-lg py-4 rounded-xl shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//           >
//             {isLoading ? (
//               <div className="flex items-center gap-2">
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 <span>Rejecting...</span>
//               </div>
//             ) : (
//               "Reject"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingRejectModal;








// BookingRejectModal.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface BookingRejectModalProps {
  isOpen: boolean;
  onClose?: () => void;
  bookingId?: string;
  ownerId?: string;
  customerId?: string;
  onRejectSuccess?: () => void;
   onReject: (reason: string) => void;  
}

const BookingRejectModal: React.FC<BookingRejectModalProps> = ({ 
  isOpen, 
  onClose,
  bookingId,
  ownerId,
  customerId,
  onRejectSuccess
  
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleReject = async () => {
    // Validate required fields
    if (!bookingId || !ownerId) {
      setError("Missing booking or owner information");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // API call to reject booking (same structure as acceptance)
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingId,
          ownerId: ownerId,
          status: "rejected" // Changed from "accepted" to "rejected"
        }),
        redirect: "follow" as RequestRedirect
      };

      const response = await fetch(
        "http://3.110.122.127:3000/updateBookingStatus", 
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Booking rejected successfully:", result);

      // Trigger real-time notification to customer
      if (customerId || result.customerId) {
        await sendCustomerNotification(customerId || result.customerId, bookingId);
      }

      // Call success callback
      if (onRejectSuccess) {
        onRejectSuccess();
      }

      // Navigate to rental page after short delay
      setTimeout(() => {
        navigate("/rental");
      }, 1500);

    } catch (err) {
      console.error("Error rejecting booking:", err);
      setError(err instanceof Error ? err.message : "Failed to reject booking");
      setIsLoading(false);
    }
  };

  // Function to send real-time notification to customer
  const sendCustomerNotification = async (customerId: string, bookingId: string) => {
    try {
      // If you're using WebSocket/Socket.io for real-time updates
      // const socket = io('http://3.110.122.127:3000');
      // socket.emit('bookingRejected', { customerId, bookingId });

      // OR if using HTTP polling/push notification
      await fetch('http://3.110.122.127:3000/notifyCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerId,
          bookingId: bookingId,
          notificationType: 'booking_rejected',
          message: 'Your booking request was not accepted'
        })
      });
    } catch (error) {
      console.error('Failed to send customer notification:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-8 text-center transform transition-all duration-300">
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 bg-gradient-to-b from-red-600 to-red-400 rounded-full flex items-center justify-center">
            <span className="text-white text-6xl">✕</span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4 leading-snug">
          Reject This Booking?
        </h2>

        <p className="text-gray-600 mb-8">
          The customer will be notified about the rejection.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-lg py-4 rounded-xl shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          
          <button
            onClick={handleReject}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold text-lg py-4 rounded-xl shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Rejecting...</span>
              </div>
            ) : (
              "Reject"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingRejectModal;