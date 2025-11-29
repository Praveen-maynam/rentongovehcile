// import { useState, useEffect } from 'react';
// import { Check, X, Loader2, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';

// export default function BookingConfirmationModal() {
//   const [pendingBookings, setPendingBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalState, setModalState] = useState('confirm'); // 'confirm', 'confirmed', 'rejected'
//   const [actionLoading, setActionLoading] = useState(false);

//   const ownerId = localStorage.getItem("userId") || "";
//   const baseUrl = 'http://3.110.122.127:3000';

//   // Fetch pending bookings on component mount
//   useEffect(() => {
//     fetchPendingBookings();
//   }, []);

//   const fetchPendingBookings = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${baseUrl}/getPendingBookingsOfOwner/${ownerId}`, {
//         method: 'GET',
//         mode: 'cors',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
      
//       const data = await res.json();
//       console.log('API Response:', data);
      
//       // Handle different response formats
//       let bookings = [];
//       if (Array.isArray(data)) {
//         bookings = data;
//       } else if (data.bookings && Array.isArray(data.bookings)) {
//         bookings = data.bookings;
//       } else if (data.data && Array.isArray(data.data)) {
//         bookings = data.data;
//       }
      
//       // Filter only pending bookings
//       const pending = bookings.filter(booking => 
//         booking.status && booking.status.toLowerCase() === 'pending'
//       );
      
//       setPendingBookings(pending);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//       alert(`Error loading bookings: ${error.message}\n\nPlease check if CORS is enabled on the server.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openModal = (booking) => {
//     setSelectedBooking(booking);
//     setShowModal(true);
//     setModalState('confirm');
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedBooking(null);
//     setModalState('confirm');
//   };

//   const handleConfirm = async () => {
//     if (!selectedBooking) return;
    
//     const bookingId = selectedBooking._id || selectedBooking.id;
//     setActionLoading(true);
    
//     try {
//       const res = await fetch(`${baseUrl}/confirmBooking/${bookingId}/Confirmed`, {
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
      
//       const data = await res.json();
//       console.log('Confirm Response:', data);
      
//       // Show confirmed modal
//       setModalState('confirmed');
      
//       // Auto refresh and close after 2 seconds
//       setTimeout(() => {
//         fetchPendingBookings();
//         closeModal();
//       }, 2000);
      
//     } catch (error) {
//       console.error('Error confirming booking:', error);
//       alert(`Error: ${error.message}\n\nPlease check if CORS is enabled on the server.`);
//       setActionLoading(false);
//     }
//   };

//   const handleReject = async () => {
//     if (!selectedBooking) return;
    
//     const bookingId = selectedBooking._id || selectedBooking.id;
//     setActionLoading(true);
    
//     try {
//       const res = await fetch(`${baseUrl}/confirmBooking/${bookingId}/Cancelled`, {
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
      
//       const data = await res.json();
//       console.log('Reject Response:', data);
      
//       // Show rejected modal
//       setModalState('rejected');
      
//       // Auto refresh and close after 2 seconds
//       setTimeout(() => {
//         fetchPendingBookings();
//         closeModal();
//       }, 2000);
      
//     } catch (error) {
//       console.error('Error rejecting booking:', error);
//       alert(`Error: ${error.message}\n\nPlease check if CORS is enabled on the server.`);
//       setActionLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-lg shadow-lg p-8">
//           <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
//           <p className="text-gray-600 font-medium">Loading pending bookings...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-5xl mx-auto py-8">
//         {/* Header */}
//         {/* <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <div className="flex items-center justify-between">
            
//             <button
//               onClick={fetchPendingBookings}
//               disabled={loading}
//               className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium disabled:opacity-50"
//             >
//               <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
//               Refresh
//             </button>
//           </div>
//         </div> */}

//         {/* Bookings List */}
//         {pendingBookings.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-lg p-12 text-center">
//             <Clock className="text-gray-300 mx-auto mb-4" size={64} />
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Bookings</h3>
//             <p className="text-gray-600">All bookings have been processed or there are no new requests.</p>
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {pendingBookings.map((booking) => {
//               const bookingId = booking._id || booking.id;
//               return (
//                 <div
//                   key={bookingId}
//                   className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-400 hover:shadow-lg transition-all"
//                 >
//                   <div className="flex items-start justify-between" >
//                     <div className="flex-1">
//                       {/* <div className="flex items-center gap-3 mb-3"onClick={() => openModal(booking)} >
//                         <span className="px-4 py-1.5 bg-yellow-100 text-yellow-800 text-sm font-bold rounded-full uppercase">
//                           ⏳ Pending
//                         </span>
//                         <span className="text-sm text-gray-500 font-mono">
//                           ID: {bookingId.substring(0, 8)}...
//                         </span>
//                       </div> */}

                    


//     {/* Car Icon */}
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-8 w-8 text-gray-700"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth={2}
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M3 13l1.5-3h15l1.5 3M5 16v2a1 1 0 001 1h1a1 1 0 001-1v-2M16 16v2a1 1 0 001 1h1a1 1 0 001-1v-2"
//       />
//     </svg>

//     {/* Booking Text */}
//     <div>
//       <p className="text-base font-semibold text-gray-900">
//         your car has been booked?
//       </p>
//       <p className="font-bold text-lg mt-1">Hyundai Verna</p>
//       <div className="flex space-x-4 mt-2 text-gray-500 text-sm">
//         <div className="flex items-center gap-1">
//           <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//             <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
//             <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//           Automatic
//         </div>
//         <div className="flex items-center gap-1">
//           <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//           </svg>
//           5 Seaters
//         </div>
//         <div className="flex items-center gap-1">
//           <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18" />
//           </svg>
//           Petrol
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Action Buttons */}
//   <div className="flex gap-4">
//     <button
//       className="flex items-center gap-1 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold hover:from-blue-700 hover:to-blue-500 transition"
//       onClick={() => openModal(booking)}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={3}
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//       </svg>
//       Yes
//     </button>

//     <button
//       className="flex items-center gap-1 px-6 py-2 rounded-full border border-blue-400 text-blue-600 font-semibold hover:bg-blue-50 transition"
//       onClick={() =>
//         setPendingBookings((prev) => prev.filter((b) => (b._id || b.id) !== bookingId))
//       }
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={3}
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//       </svg>
//       No
//     </button>
                      
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//                         {booking.customerName && (
//                           <div>
//                             <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Customer</p>
//                             <p className="text-sm font-medium text-gray-900">{booking.customerName}</p>
//                           </div>
//                         )}
//                         {booking.date && (
//                           <div>
//                             <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Date</p>
//                             <p className="text-sm font-medium text-gray-900">{booking.date}</p>
//                           </div>
//                         )}
//                         {booking.time && (
//                           <div>
//                             <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Time</p>
//                             <p className="text-sm font-medium text-gray-900">{booking.time}</p>
//                           </div>
//                         )}
//                         {booking.service && (
//                           <div>
//                             <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Service</p>
//                             <p className="text-sm font-medium text-gray-900">{booking.service}</p>
//                           </div>
//                         )}
//                         {booking.phone && (
//                           <div>
//                             <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Phone</p>
//                             <p className="text-sm font-medium text-gray-900">{booking.phone}</p>
//                           </div>
//                         )}
//                         {booking.email && (
//                           <div>
//                             <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Email</p>
//                             <p className="text-sm font-medium text-gray-900">{booking.email}</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
// {/*                     
//                     <button
//                       onClick={() => openModal(booking)}
//                       className="ml-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
//                     >
//                       Review →
//                     </button> */}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Modal Overlay */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          
//           {/* Confirmation Modal */}
//           {modalState === 'confirm' && selectedBooking && (
//             <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn">
//               <button
//                 onClick={closeModal}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//                 disabled={actionLoading}
//               >
//                 <X size={24} />
//               </button>

//               <div className="text-center">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Clock className="text-blue-600" size={32} />
//                 </div>
                
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                   Review Booking Request
//                 </h2>
//                 <p className="text-gray-600 mb-6">
//                   Please confirm or reject this customer booking
//                 </p>

//                 <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left">
//                   <p className="text-xs text-gray-500 uppercase font-bold mb-3">Booking Details</p>
//                   <div className="space-y-3">
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Booking ID:</span>
//                       <span className="font-mono text-sm text-gray-900 font-medium">
//                         {(selectedBooking._id || selectedBooking.id).substring(0, 12)}...
//                       </span>
//                     </div>
//                     {selectedBooking.customerName && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-600">Customer:</span>
//                         <span className="text-sm text-gray-900 font-semibold">{selectedBooking.customerName}</span>
//                       </div>
//                     )}
//                     {selectedBooking.phone && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-600">Phone:</span>
//                         <span className="text-sm text-gray-900 font-medium">{selectedBooking.phone}</span>
//                       </div>
//                     )}
//                     {selectedBooking.email && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-600">Email:</span>
//                         <span className="text-sm text-gray-900 font-medium">{selectedBooking.email}</span>
//                       </div>
//                     )}
//                     {selectedBooking.date && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-600">Date:</span>
//                         <span className="text-sm text-gray-900 font-semibold">{selectedBooking.date}</span>
//                       </div>
//                     )}
//                     {selectedBooking.time && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-600">Time:</span>
//                         <span className="text-sm text-gray-900 font-semibold">{selectedBooking.time}</span>
//                       </div>
//                     )}
//                     {selectedBooking.service && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-600">Service:</span>
//                         <span className="text-sm text-gray-900 font-semibold">{selectedBooking.service}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={handleReject}
//                     disabled={actionLoading}
//                     className="flex-1 px-6 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold text-lg shadow-lg hover:shadow-xl"
//                   >
//                     {actionLoading ? (
//                       <Loader2 className="animate-spin" size={24} />
//                     ) : (
//                       <>
//                         <X size={24} />
//                         <span>Reject</span>
//                       </>
//                     )}
//                   </button>

//                   <button
//                     onClick={handleConfirm}
//                     disabled={actionLoading}
//                     className="flex-1 px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold text-lg shadow-lg hover:shadow-xl"
//                   >
//                     {actionLoading ? (
//                       <Loader2 className="animate-spin" size={24} />
//                     ) : (
//                       <>
//                         <Check size={24} />
//                         <span>Accept</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Confirmed Success Modal */}
//           {modalState === 'confirmed' && (
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 relative animate-fadeIn">
//               <div className="text-center">
//                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
//                   <CheckCircle className="text-green-600" size={48} />
//                 </div>
                
//                 <h2 className="text-3xl font-bold text-gray-900 mb-3">
//                   Booking Confirmed!
//                 </h2>
                
//                 <p className="text-gray-600 text-lg mb-6">
//                   The booking has been successfully confirmed by the customer.
//                 </p>

//                 <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
//                   <p className="text-green-800 font-bold text-lg mb-1">
//                     ✓ Status: Confirmed
//                   </p>
//                   <p className="text-green-700 text-sm">
//                     Customer will be notified shortly
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Rejected Modal */}
//           {modalState === 'rejected' && (
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 relative animate-fadeIn">
//               <div className="text-center">
//                 <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
//                   <XCircle className="text-red-600" size={48} />
//                 </div>
                
//                 <h2 className="text-3xl font-bold text-gray-900 mb-3">
//                   Booking Rejected
//                 </h2>
                
//                 <p className="text-gray-600 text-lg mb-6">
//                   The booking request has been rejected by the customer.
//                 </p>

//                 <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
//                   <p className="text-red-800 font-bold text-lg mb-1">
//                     ✗ Status: Rejected
//                   </p>
//                   <p className="text-red-700 text-sm">
//                     Customer will be notified shortly
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       <style>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.9);
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
// }









// // // import { useState } from 'react';
// // // import { Check, X, Loader2 } from 'lucide-react';

// // // export default function BookingConfirmationModal() {
// // //   const [isOpen, setIsOpen] = useState(true);
// // //   const [loading, setLoading] = useState(false);
// // //   const [response, setResponse] = useState(null);

// // //   const bookingId = '69200c7d6bb0e35375f4701c';
// // //   const baseUrl = 'http://3.110.122.127:3000/confirmBooking';

// // //   const handleConfirm = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const res = await fetch(`${baseUrl}/${bookingId}/Confirmed`, {
// // //         method: 'Post',
// // //         mode: 'cors',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //       });
      
// // //       if (!res.ok) {
// // //         throw new Error(`HTTP error! status: ${res.status}`);
// // //       }
      
// // //       const data = await res.json();
// // //       setResponse({ success: true, data, message: 'Booking confirmed successfully!' });
// // //       setTimeout(() => setIsOpen(false), 2000);
// // //     } catch (error) {
// // //       setResponse({ 
// // //         success: false, 
// // //         error: error.message,
// // //         message: 'CORS Error: The API server needs to allow requests from this domain. Contact your backend team to enable CORS.'
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleCancel = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const res = await fetch(`${baseUrl}/${bookingId}/Cancelled`, {
// // //         method: 'Post',
// // //         mode: 'cors',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //       });
      
// // //       if (!res.ok) {
// // //         throw new Error(`HTTP error! status: ${res.status}`);
// // //       }
      
// // //       const data = await res.json();
// // //       setResponse({ success: true, data, message: 'Booking cancelled successfully!' });
// // //       setTimeout(() => setIsOpen(false), 2000);
// // //     } catch (error) {
// // //       setResponse({ 
// // //         success: false, 
// // //         error: error.message,
// // //         message: 'CORS Error: The API server needs to allow requests from this domain. Contact your backend team to enable CORS.'
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (!isOpen) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
// // //         <button
// // //           onClick={() => {
// // //             setIsOpen(true);
// // //             setResponse(null);
// // //           }}
// // //           className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// // //         >
// // //           Open Booking Modal
// // //         </button>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
// // //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //         <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
// // //           {/* Close button */}
// // //           <button
// // //             onClick={() => setIsOpen(false)}
// // //             className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
// // //             disabled={loading}
// // //           >
// // //             <X size={20} />
// // //           </button>

// // //           {/* Modal content */}
// // //           <div className="text-center">
// // //             <h2 className="text-2xl font-bold text-gray-800 mb-2">
// // //               Confirm Booking
// // //             </h2>
// // //             <p className="text-gray-600 mb-6">
// // //               Would you like to confirm or cancel this booking?
// // //             </p>

// // //             {/* Booking ID */}
// // //             <div className="bg-gray-50 rounded-lg p-3 mb-6">
// // //               <p className="text-sm text-gray-500">Booking ID</p>
// // //               <p className="text-sm font-mono text-gray-800 break-all">
// // //                 {bookingId}
// // //               </p>
// // //             </div>

// // //             {/* Response message */}
// // //             {response && (
// // //               <div
// // //                 className={`mb-6 p-4 rounded-lg ${
// // //                   response.success
// // //                     ? 'bg-green-50 border border-green-200'
// // //                     : 'bg-red-50 border border-red-200'
// // //                 }`}
// // //               >
// // //                 <p className={`text-sm font-medium mb-1 ${
// // //                   response.success ? 'text-green-800' : 'text-red-800'
// // //                 }`}>
// // //                   {response.message || (response.success ? 'Success!' : 'Error occurred')}
// // //                 </p>
// // //                 {!response.success && (
// // //                   <p className="text-xs text-red-600 mt-2">
// // //                     Technical: {response.error}
// // //                   </p>
// // //                 )}
// // //               </div>
// // //             )}

// // //             {/* Action buttons */}
// // //             <div className="flex gap-4">
// // //               <button
// // //                 onClick={handleCancel}
// // //                 disabled={loading || response}
// // //                 className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// // //               >
// // //                 {loading ? (
// // //                   <Loader2 className="animate-spin" size={20} />
// // //                 ) : (
// // //                   <>
// // //                     <X size={20} />
// // //                     <span>Reject</span>
// // //                   </>
// // //                 )}
// // //               </button>

// // //               <button
// // //                 onClick={handleConfirm}
// // //                 disabled={loading || response}
// // //                 className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// // //               >
// // //                 {loading ? (
// // //                   <Loader2 className="animate-spin" size={20} />
// // //                 ) : (
// // //                   <>
// // //                     <Check size={20} />
// // //                     <span>Accept</span>
// // //                   </>
// // //                 )}
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }












// // import { useState, useEffect } from 'react';
// // import { Check, X, Loader2, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';

// // export default function BookingConfirmationModal() {
// //   const [pendingBookings, setPendingBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedBooking, setSelectedBooking] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const [modalState, setModalState] = useState('confirm'); // 'confirm', 'confirmed', 'rejected'
// //   const [actionLoading, setActionLoading] = useState(false);

// //   const ownerId = localStorage.getItem("userId") || "";
// //   const baseUrl = 'http://3.110.122.127:3000';

// //   // Fetch pending bookings on component mount
// //   useEffect(() => {
// //     fetchPendingBookings();
// //   }, []);

// //   const fetchPendingBookings = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await fetch(`${baseUrl}/getPendingBookingsOfOwner/${ownerId}`, {
// //         method: 'GET',
// //         mode: 'cors',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       });
      
// //       if (!res.ok) {
// //         throw new Error(`HTTP error! status: ${res.status}`);
// //       }
      
// //       const data = await res.json();
// //       console.log('API Response:', data);
      
// //       // Handle different response formats
// //       let bookings = [];
// //       if (Array.isArray(data)) {
// //         bookings = data;
// //       } else if (data.bookings && Array.isArray(data.bookings)) {
// //         bookings = data.bookings;
// //       } else if (data.data && Array.isArray(data.data)) {
// //         bookings = data.data;
// //       }
      
// //       // Filter only pending bookings
// //       const pending = bookings.filter(booking => 
// //         booking.status && booking.status.toLowerCase() === 'pending'
// //       );
      
// //       setPendingBookings(pending);
// //     } catch (error) {
// //       console.error('Error fetching bookings:', error);
// //       alert(`Error loading bookings: ${error.message}\n\nPlease check if CORS is enabled on the server.`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const openModal = (booking) => {
// //     setSelectedBooking(booking);
// //     setShowModal(true);
// //     setModalState('confirm');
// //   };

// //   const closeModal = () => {
// //     setShowModal(false);
// //     setSelectedBooking(null);
// //     setModalState('confirm');
// //   };

// //   const handleConfirm = async () => {
// //     if (!selectedBooking) return;
    
// //     const bookingId = selectedBooking._id || selectedBooking.id;
// //     setActionLoading(true);
    
// //     try {
// //       const res = await fetch(`${baseUrl}/confirmBooking/${bookingId}/Confirmed`, {
// //         method: 'POST',
// //         mode: 'cors',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       });
      
// //       if (!res.ok) {
// //         throw new Error(`HTTP error! status: ${res.status}`);
// //       }
      
// //       const data = await res.json();
// //       console.log('Confirm Response:', data);
      
// //       // Show confirmed modal
// //       setModalState('confirmed');
      
// //       // Auto refresh and close after 2 seconds
// //       setTimeout(() => {
// //         fetchPendingBookings();
// //         closeModal();
// //       }, 2000);
      
// //     } catch (error) {
// //       console.error('Error confirming booking:', error);
// //       alert(`Error: ${error.message}\n\nPlease check if CORS is enabled on the server.`);
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleReject = async () => {
// //     if (!selectedBooking) return;
    
// //     const bookingId = selectedBooking._id || selectedBooking.id;
// //     setActionLoading(true);
    
// //     try {
// //       const res = await fetch(`${baseUrl}/confirmBooking/${bookingId}/Cancelled`, {
// //         method: 'POST',
// //         mode: 'cors',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       });
      
// //       if (!res.ok) {
// //         throw new Error(`HTTP error! status: ${res.status}`);
// //       }
      
// //       const data = await res.json();
// //       console.log('Reject Response:', data);
      
// //       // Show rejected modal
// //       setModalState('rejected');
      
// //       // Auto refresh and close after 2 seconds
// //       setTimeout(() => {
// //         fetchPendingBookings();
// //         closeModal();
// //       }, 2000);
      
// //     } catch (error) {
// //       console.error('Error rejecting booking:', error);
// //       alert(`Error: ${error.message}\n\nPlease check if CORS is enabled on the server.`);
// //       setActionLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
// //         <div className="text-center bg-white rounded-lg shadow-lg p-8">
// //           <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
// //           <p className="text-gray-600 font-medium">Loading pending bookings...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
// //       <div className="max-w-5xl mx-auto py-8">
// //         {/* Header */}
// //         {/* <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
// //           <div className="flex items-center justify-between">
            
// //             <button
// //               onClick={fetchPendingBookings}
// //               disabled={loading}
// //               className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium disabled:opacity-50"
// //             >
// //               <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
// //               Refresh
// //             </button>
// //           </div>
// //         </div> */}

// //         {/* Bookings List */}
// //         {pendingBookings.length === 0 ? (
// //           <div className="bg-white rounded-lg shadow-lg p-12 text-center">
// //             <Clock className="text-gray-300 mx-auto mb-4" size={64} />
// //             <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Bookings</h3>
// //             <p className="text-gray-600">All bookings have been processed or there are no new requests.</p>
// //           </div>
// //         ) : (
// //           <div className="grid gap-4">
// //             {pendingBookings.map((booking) => {
// //               const bookingId = booking._id || booking.id;
// //               return (
// //                 <div
// //                   key={bookingId}
// //                   className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-400 hover:shadow-lg transition-all"
// //                 >
// //                   <div className="flex items-start justify-between" >
// //                     <div className="flex-1">
// //                       {/* <div className="flex items-center gap-3 mb-3"onClick={() => openModal(booking)} >
// //                         <span className="px-4 py-1.5 bg-yellow-100 text-yellow-800 text-sm font-bold rounded-full uppercase">
// //                           ⏳ Pending
// //                         </span>
// //                         <span className="text-sm text-gray-500 font-mono">
// //                           ID: {bookingId.substring(0, 8)}...
// //                         </span>
// //                       </div> */}

                    


// //     {/* Car Icon */}
// //     <svg
// //       xmlns="http://www.w3.org/2000/svg"
// //       className="h-8 w-8 text-gray-700"
// //       fill="none"
// //       viewBox="0 0 24 24"
// //       stroke="currentColor"
// //       strokeWidth={2}
// //     >
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         d="M3 13l1.5-3h15l1.5 3M5 16v2a1 1 0 001 1h1a1 1 0 001-1v-2M16 16v2a1 1 0 001 1h1a1 1 0 001-1v-2"
// //       />
// //     </svg>

// //     {/* Booking Text */}
// //     <div>
// //       <p className="text-base font-semibold text-gray-900">
// //         your car has been booked?
// //       </p>
// //       <p className="font-bold text-lg mt-1">Hyundai Verna</p>
// //       <div className="flex space-x-4 mt-2 text-gray-500 text-sm">
// //         <div className="flex items-center gap-1">
// //           <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
// //             <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
// //             <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
// //           </svg>
// //           Automatic
// //         </div>
// //         <div className="flex items-center gap-1">
// //           <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
// //           </svg>
// //           5 Seaters
// //         </div>
// //         <div className="flex items-center gap-1">
// //           <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18" />
// //           </svg>
// //           Petrol
// //         </div>
// //       </div>
// //     </div>
// //   </div>

// //   {/* Action Buttons */}
// //   <div className="flex gap-4">
// //     <button
// //       className="flex items-center gap-1 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold hover:from-blue-700 hover:to-blue-500 transition"
// //       onClick={() => openModal(booking)}
// //     >
// //       <svg
// //         xmlns="http://www.w3.org/2000/svg"
// //         className="h-5 w-5"
// //         fill="none"
// //         viewBox="0 0 24 24"
// //         stroke="currentColor"
// //         strokeWidth={3}
// //       >
// //         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
// //       </svg>
// //       Yes
// //     </button>

// //     <button
// //       className="flex items-center gap-1 px-6 py-2 rounded-full border border-blue-400 text-blue-600 font-semibold hover:bg-blue-50 transition"
// //       onClick={() =>
// //         setPendingBookings((prev) => prev.filter((b) => (b._id || b.id) !== bookingId))
// //       }
// //     >
// //       <svg
// //         xmlns="http://www.w3.org/2000/svg"
// //         className="h-5 w-5"
// //         fill="none"
// //         viewBox="0 0 24 24"
// //         stroke="currentColor"
// //         strokeWidth={3}
// //       >
// //         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
// //       </svg>
// //       No
// //     </button>
                      
// //                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
// //                         {booking.customerName && (
// //                           <div>
// //                             <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Customer</p>
// //                             <p className="text-sm font-medium text-gray-900">{booking.customerName}</p>
// //                           </div>
// //                         )}
// //                         {booking.date && (
// //                           <div>
// //                             <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Date</p>
// //                             <p className="text-sm font-medium text-gray-900">{booking.date}</p>
// //                           </div>
// //                         )}
// //                         {booking.time && (
// //                           <div>
// //                             <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Time</p>
// //                             <p className="text-sm font-medium text-gray-900">{booking.time}</p>
// //                           </div>
// //                         )}
// //                         {booking.service && (
// //                           <div>
// //                             <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Service</p>
// //                             <p className="text-sm font-medium text-gray-900">{booking.service}</p>
// //                           </div>
// //                         )}
// //                         {booking.phone && (
// //                           <div>
// //                             <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Phone</p>
// //                             <p className="text-sm font-medium text-gray-900">{booking.phone}</p>
// //                           </div>
// //                         )}
// //                         {booking.email && (
// //                           <div>
// //                             <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Email</p>
// //                             <p className="text-sm font-medium text-gray-900">{booking.email}</p>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// // {/*                     
// //                     <button
// //                       onClick={() => openModal(booking)}
// //                       className="ml-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
// //                     >
// //                       Review →
// //                     </button> */}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>

// //       {/* Modal Overlay */}
// //       {showModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          
// //           {/* Confirmation Modal */}
// //           {modalState === 'confirm' && selectedBooking && (
// //             <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn">
// //               <button
// //                 onClick={closeModal}
// //                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
// //                 disabled={actionLoading}
// //               >
// //                 <X size={24} />
// //               </button>

// //               <div className="text-center">
// //                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <Clock className="text-blue-600" size={32} />
// //                 </div>
                
// //                 <h2 className="text-2xl font-bold text-gray-900 mb-2">
// //                   Review Booking Request
// //                 </h2>
// //                 <p className="text-gray-600 mb-6">
// //                   Please confirm or reject this customer booking
// //                 </p>

// //                 <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left">
// //                   <p className="text-xs text-gray-500 uppercase font-bold mb-3">Booking Details</p>
// //                   <div className="space-y-3">
// //                     <div className="flex justify-between">
// //                       <span className="text-sm text-gray-600">Booking ID:</span>
// //                       <span className="font-mono text-sm text-gray-900 font-medium">
// //                         {(selectedBooking._id || selectedBooking.id).substring(0, 12)}...
// //                       </span>
// //                     </div>
// //                     {selectedBooking.customerName && (
// //                       <div className="flex justify-between">
// //                         <span className="text-sm text-gray-600">Customer:</span>
// //                         <span className="text-sm text-gray-900 font-semibold">{selectedBooking.customerName}</span>
// //                       </div>
// //                     )}
// //                     {selectedBooking.phone && (
// //                       <div className="flex justify-between">
// //                         <span className="text-sm text-gray-600">Phone:</span>
// //                         <span className="text-sm text-gray-900 font-medium">{selectedBooking.phone}</span>
// //                       </div>
// //                     )}
// //                     {selectedBooking.email && (
// //                       <div className="flex justify-between">
// //                         <span className="text-sm text-gray-600">Email:</span>
// //                         <span className="text-sm text-gray-900 font-medium">{selectedBooking.email}</span>
// //                       </div>
// //                     )}
// //                     {selectedBooking.date && (
// //                       <div className="flex justify-between">
// //                         <span className="text-sm text-gray-600">Date:</span>
// //                         <span className="text-sm text-gray-900 font-semibold">{selectedBooking.date}</span>
// //                       </div>
// //                     )}
// //                     {selectedBooking.time && (
// //                       <div className="flex justify-between">
// //                         <span className="text-sm text-gray-600">Time:</span>
// //                         <span className="text-sm text-gray-900 font-semibold">{selectedBooking.time}</span>
// //                       </div>
// //                     )}
// //                     {selectedBooking.service && (
// //                       <div className="flex justify-between">
// //                         <span className="text-sm text-gray-600">Service:</span>
// //                         <span className="text-sm text-gray-900 font-semibold">{selectedBooking.service}</span>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-3">
// //                   <button
// //                     onClick={handleReject}
// //                     disabled={actionLoading}
// //                     className="flex-1 px-6 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold text-lg shadow-lg hover:shadow-xl"
// //                   >
// //                     {actionLoading ? (
// //                       <Loader2 className="animate-spin" size={24} />
// //                     ) : (
// //                       <>
// //                         <X size={24} />
// //                         <span>Reject</span>
// //                       </>
// //                     )}
// //                   </button>

// //                   <button
// //                     onClick={handleConfirm}
// //                     disabled={actionLoading}
// //                     className="flex-1 px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold text-lg shadow-lg hover:shadow-xl"
// //                   >
// //                     {actionLoading ? (
// //                       <Loader2 className="animate-spin" size={24} />
// //                     ) : (
// //                       <>
// //                         <Check size={24} />
// //                         <span>Accept</span>
// //                       </>
// //                     )}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Confirmed Success Modal */}
// //           {modalState === 'confirmed' && (
// //             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 relative animate-fadeIn">
// //               <div className="text-center">
// //                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
// //                   <CheckCircle className="text-green-600" size={48} />
// //                 </div>
                
// //                 <h2 className="text-3xl font-bold text-gray-900 mb-3">
// //                   Booking Confirmed!
// //                 </h2>
                
// //                 <p className="text-gray-600 text-lg mb-6">
// //                   The booking has been successfully confirmed by the customer.
// //                 </p>

// //                 <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
// //                   <p className="text-green-800 font-bold text-lg mb-1">
// //                     ✓ Status: Confirmed
// //                   </p>
// //                   <p className="text-green-700 text-sm">
// //                     Customer will be notified shortly
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Rejected Modal */}
// //           {modalState === 'rejected' && (
// //             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 relative animate-fadeIn">
// //               <div className="text-center">
// //                 <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
// //                   <XCircle className="text-red-600" size={48} />
// //                 </div>
                
// //                 <h2 className="text-3xl font-bold text-gray-900 mb-3">
// //                   Booking Rejected
// //                 </h2>
                
// //                 <p className="text-gray-600 text-lg mb-6">
// //                   The booking request has been rejected by the customer.
// //                 </p>

// //                 <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
// //                   <p className="text-red-800 font-bold text-lg mb-1">
// //                     ✗ Status: Rejected
// //                   </p>
// //                   <p className="text-red-700 text-sm">
// //                     Customer will be notified shortly
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       <style>{`
// //         @keyframes fadeIn {
// //           from {
// //             opacity: 0;
// //             transform: scale(0.9);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: scale(1);
// //           }
// //         }
// //         .animate-fadeIn {
// //           animation: fadeIn 0.3s ease-out;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }












// import { useState, useEffect, useRef } from 'react';
// import { Check, X, Loader2, CheckCircle, XCircle, Clock, Bell, AlertCircle } from 'lucide-react';
// import io from 'socket.io-client';

// const SOCKET_URL = "http://3.110.122.127:3001";
// const API_BASE = "http://3.110.122.127:3000";
// const EXPIRY_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds

// export default function PriorityBookingSystem() {
//   const [bookingQueue, setBookingQueue] = useState([]);
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalState, setModalState] = useState('confirm');
//   const [actionLoading, setActionLoading] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [showNotifications, setShowNotifications] = useState(false);
  
//   const socketRef = useRef(null);
//   const timersRef = useRef({});
//   const ownerId = localStorage.getItem("userId") || "";

//   // Initialize Socket.io
//   useEffect(() => {
//     if (!ownerId) return;

//     socketRef.current = io(SOCKET_URL, {
//       query: { userId: ownerId },
//       transports: ['websocket'],
//       reconnection: true
//     });

//     socketRef.current.on('connect', () => {
//       console.log('✅ Socket connected');
//     });

//     socketRef.current.on('new-booking-request', (data) => {
//       console.log('🔔 New booking received:', data);
//       addBookingToQueue(data);
//     });

//     return () => {
//       if (socketRef.current) socketRef.current.disconnect();
//       Object.values(timersRef.current).forEach(clearTimeout);
//     };
//   }, [ownerId]);

//   // Fetch initial pending bookings
//   useEffect(() => {
//     fetchPendingBookings();
//   }, []);

//   // Auto-show modal when there's no current booking
//   useEffect(() => {
//     if (!currentBooking && bookingQueue.length > 0) {
//       showNextBooking();
//     }
//   }, [currentBooking, bookingQueue]);

//   const fetchPendingBookings = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/getPendingBookingsOfOwner/${ownerId}`);
//       if (!res.ok) throw new Error('Failed to fetch bookings');
      
//       const data = await res.json();
//       let bookings = Array.isArray(data) ? data : (data.bookings || data.data || []);
      
//       const pending = bookings.filter(b => 
//         b.status && b.status.toLowerCase() === 'pending'
//       );

//       // Add timestamp and sort by creation time
//       const bookingsWithTime = pending.map(booking => ({
//         ...booking,
//         receivedAt: new Date(booking.createdAt || booking.CreatedAt || Date.now()).getTime(),
//         expiresAt: new Date(booking.createdAt || booking.CreatedAt || Date.now()).getTime() + EXPIRY_TIME
//       }));

//       setBookingQueue(bookingsWithTime);
      
//       // Start expiry timers
//       bookingsWithTime.forEach(booking => {
//         startExpiryTimer(booking);
//       });

//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addBookingToQueue = (booking) => {
//     const bookingWithTime = {
//       ...booking,
//       receivedAt: Date.now(),
//       expiresAt: Date.now() + EXPIRY_TIME
//     };

//     setBookingQueue(prev => {
//       const updated = [...prev, bookingWithTime];
//       // Sort by receivedAt (first-come-first-served)
//       return updated.sort((a, b) => a.receivedAt - b.receivedAt);
//     });

//     startExpiryTimer(bookingWithTime);
//   };

//   const startExpiryTimer = (booking) => {
//     const bookingId = booking._id || booking.id;
//     const timeUntilExpiry = booking.expiresAt - Date.now();

//     if (timeUntilExpiry > 0) {
//       timersRef.current[bookingId] = setTimeout(() => {
//         expireBooking(bookingId);
//       }, timeUntilExpiry);
//     }
//   };

//   const expireBooking = async (bookingId) => {
//     console.log('⏱️ Booking expired:', bookingId);

//     try {
//       // Auto-reject expired booking
//       await fetch(`${API_BASE}/confirmBooking/${bookingId}/Cancelled`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       // Remove from queue
//       setBookingQueue(prev => prev.filter(b => (b._id || b.id) !== bookingId));
      
//       // If it was the current booking, close modal and show next
//       if (currentBooking && (currentBooking._id || currentBooking.id) === bookingId) {
//         setCurrentBooking(null);
//         setShowModal(false);
//       }

//       // Clean up timer
//       if (timersRef.current[bookingId]) {
//         clearTimeout(timersRef.current[bookingId]);
//         delete timersRef.current[bookingId];
//       }

//     } catch (error) {
//       console.error('Error expiring booking:', error);
//     }
//   };

//   const showNextBooking = () => {
//     if (bookingQueue.length === 0) return;
    
//     const nextBooking = bookingQueue[0];
//     setCurrentBooking(nextBooking);
//     setShowModal(true);
//     setModalState('confirm');
//   };

//   const handleConfirm = async () => {
//     if (!currentBooking) return;
    
//     const bookingId = currentBooking._id || currentBooking.id;
//     const customerId = currentBooking.userId || currentBooking.customerId;
    
//     setActionLoading(true);
    
//     try {
//       const res = await fetch(`${API_BASE}/confirmBooking/${bookingId}/Confirmed`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       if (!res.ok) throw new Error('Failed to confirm booking');
      
//       console.log('✅ Booking confirmed:', bookingId);
      
//       // Emit socket event
//       if (socketRef.current?.connected && customerId) {
//         socketRef.current.emit('booking-status-update', {
//           bookingId,
//           customerId,
//           status: 'accepted',
//           ownerId
//         });
//       }
      
//       setModalState('confirmed');
      
//       // Clean up timer
//       if (timersRef.current[bookingId]) {
//         clearTimeout(timersRef.current[bookingId]);
//         delete timersRef.current[bookingId];
//       }
      
//       // Remove from queue and show next after 2 seconds
//       setTimeout(() => {
//         setBookingQueue(prev => prev.filter(b => (b._id || b.id) !== bookingId));
//         setCurrentBooking(null);
//         setShowModal(false);
//         setModalState('confirm');
//         setActionLoading(false);
//       }, 2000);
      
//     } catch (error) {
//       console.error('Error confirming booking:', error);
//       alert(`Error: ${error.message}`);
//       setActionLoading(false);
//     }
//   };

//   const handleReject = async () => {
//     if (!currentBooking) return;
    
//     const bookingId = currentBooking._id || currentBooking.id;
//     const customerId = currentBooking.userId || currentBooking.customerId;
    
//     setActionLoading(true);
    
//     try {
//       const res = await fetch(`${API_BASE}/confirmBooking/${bookingId}/Cancelled`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       if (!res.ok) throw new Error('Failed to reject booking');
      
//       console.log('❌ Booking rejected:', bookingId);
      
//       // Emit socket event
//       if (socketRef.current?.connected && customerId) {
//         socketRef.current.emit('booking-status-update', {
//           bookingId,
//           customerId,
//           status: 'rejected',
//           ownerId
//         });
//       }
      
//       setModalState('rejected');
      
//       // Clean up timer
//       if (timersRef.current[bookingId]) {
//         clearTimeout(timersRef.current[bookingId]);
//         delete timersRef.current[bookingId];
//       }
      
//       // Remove from queue and show next after 2 seconds
//       setTimeout(() => {
//         setBookingQueue(prev => prev.filter(b => (b._id || b.id) !== bookingId));
//         setCurrentBooking(null);
//         setShowModal(false);
//         setModalState('confirm');
//         setActionLoading(false);
//       }, 2000);
      
//     } catch (error) {
//       console.error('Error rejecting booking:', error);
//       alert(`Error: ${error.message}`);
//       setActionLoading(false);
//     }
//   };

//   const getRemainingTime = (booking) => {
//     const now = Date.now();
//     const remaining = booking.expiresAt - now;
    
//     if (remaining <= 0) return '00:00';
    
//     const minutes = Math.floor(remaining / 60000);
//     const seconds = Math.floor((remaining % 60000) / 1000);
    
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const TimeDisplay = ({ booking }) => {
//     const [time, setTime] = useState(getRemainingTime(booking));
    
//     useEffect(() => {
//       const interval = setInterval(() => {
//         setTime(getRemainingTime(booking));
//       }, 1000);
      
//       return () => clearInterval(interval);
//     }, [booking]);
    
//     const remaining = booking.expiresAt - Date.now();
//     const isExpiring = remaining < 30000; // Less than 30 seconds
    
//     return (
//       <span className={`font-mono font-bold ${isExpiring ? 'text-red-600 animate-pulse' : 'text-orange-600'}`}>
//         {time}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-lg shadow-lg p-8">
//           <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
//           <p className="text-gray-600 font-medium">Loading bookings...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-5xl mx-auto py-8">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">Owner Dashboard</h1>
//               <p className="text-gray-500">
//                 {bookingQueue.length} pending booking{bookingQueue.length !== 1 ? 's' : ''}
//               </p>
//             </div>
//             <button
//               onClick={() => setShowNotifications(!showNotifications)}
//               className="relative px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
//             >
//               <Bell size={20} />
//               Notifications
//               {bookingQueue.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
//                   {bookingQueue.length}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Notifications Panel */}
//         {showNotifications && (
//           <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Notifications</h2>
            
//             {bookingQueue.length === 0 ? (
//               <p className="text-gray-500 text-center py-8">No pending bookings</p>
//             ) : (
//               <div className="space-y-3">
//                 {bookingQueue.map((booking, index) => {
//                   const bookingId = booking._id || booking.id;
//                   const isCurrentBooking = currentBooking && (currentBooking._id || currentBooking.id) === bookingId;
                  
//                   return (
//                     <div
//                       key={bookingId}
//                       className={`p-4 rounded-lg border-2 transition ${
//                         isCurrentBooking 
//                           ? 'bg-blue-50 border-blue-500' 
//                           : 'bg-gray-50 border-gray-200'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-2">
//                             {index === 0 && !isCurrentBooking && (
//                               <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
//                                 ⭐ NEXT
//                               </span>
//                             )}
//                             {isCurrentBooking && (
//                               <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
//                                 👁️ VIEWING
//                               </span>
//                             )}
//                             <span className="font-semibold text-gray-800">
//                               {booking.contactName || booking.customerName || 'Customer'}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-600">
//                             {booking.vehicleName || booking.VehicleName || 'Vehicle'} • 
//                             ₹{booking.totalPrice || 'N/A'}
//                           </p>
//                         </div>
//                         <div className="text-right">
//                           <div className="flex items-center gap-2 mb-1">
//                             <Clock size={16} className="text-orange-600" />
//                             <TimeDisplay booking={booking} />
//                           </div>
//                           <p className="text-xs text-gray-500">expires in</p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Info Banner */}
//         <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-lg mb-6">
//           <div className="flex items-start gap-3">
//             <AlertCircle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
//             <div>
//               <h3 className="font-bold text-orange-900 mb-2">⏱️ Priority System Active</h3>
//               <ul className="space-y-1 text-orange-800 text-sm">
//                 <li>• First booking shows in modal automatically</li>
//                 <li>• Other bookings wait in queue</li>
//                 <li>• Each booking expires after <strong>2 minutes</strong></li>
//                 <li>• Accept or reject quickly to avoid expiry</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Empty State */}
//         {bookingQueue.length === 0 && (
//           <div className="bg-white rounded-lg shadow-lg p-12 text-center">
//             <Clock className="text-gray-300 mx-auto mb-4" size={64} />
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Bookings</h3>
//             <p className="text-gray-600">All bookings have been processed</p>
//           </div>
//         )}
//       </div>

//       {/* Priority Booking Modal */}
//       {showModal && currentBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          
//           {/* Confirmation Modal */}
//           {modalState === 'confirm' && (
//             <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn">
//               <button
//                 onClick={() => {
//                   // Don't allow closing - must accept or reject
//                   if (confirm('Are you sure? This booking will expire if you don\'t respond.')) {
//                     setShowModal(false);
//                   }
//                 }}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//                 disabled={actionLoading}
//               >
//                 <X size={24} />
//               </button>

//               <div className="text-center">
//                 {/* Timer Warning */}
//                 <div className="mb-4 p-3 bg-orange-50 border-2 border-orange-200 rounded-xl">
//                   <div className="flex items-center justify-center gap-2">
//                     <Clock className="text-orange-600" size={20} />
//                     <span className="text-sm text-gray-600">Expires in:</span>
//                     <TimeDisplay booking={currentBooking} />
//                   </div>
//                 </div>

//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Bell className="text-blue-600" size={32} />
//                 </div>
                
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                   Priority Booking Request
//                 </h2>
//                 <p className="text-gray-600 mb-6">
//                   This is the first booking in queue
//                 </p>

//                 <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left">
//                   <p className="text-xs text-gray-500 uppercase font-bold mb-3">Booking Details</p>
//                   <div className="space-y-3">
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Booking ID:</span>
//                       <span className="font-mono text-sm text-gray-900 font-medium">
//                         {(currentBooking._id || currentBooking.id).substring(0, 12)}...
//                       </span>
//                     </div>
//                     {(currentBooking.contactName || currentBooking.customerName) && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-600">Customer:</span>
//                         <span className="text-sm text-gray-900 font-semibold">
//                           {currentBooking.contactName || currentBooking.customerName}
//                         </span>
//                       </div>
//                     )}
//                     {(currentBooking.contactNumber || currentBooking.phone) && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-600">Phone:</span>
//                         <span className="text-sm text-gray-900 font-medium">
//                           {currentBooking.contactNumber || currentBooking.phone}
//                         </span>
//                       </div>
//                     )}
//                     {(currentBooking.vehicleName || currentBooking.VehicleName) && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-600">Vehicle:</span>
//                         <span className="text-sm text-gray-900 font-semibold">
//                           {currentBooking.vehicleName || currentBooking.VehicleName}
//                         </span>
//                       </div>
//                     )}
//                     {currentBooking.FromDate && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-600">From:</span>
//                         <span className="text-sm text-gray-900 font-semibold">
//                           {new Date(currentBooking.FromDate).toLocaleDateString()}
//                         </span>
//                       </div>
//                     )}
//                     {currentBooking.ToDate && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-600">To:</span>
//                         <span className="text-sm text-gray-900 font-semibold">
//                           {new Date(currentBooking.ToDate).toLocaleDateString()}
//                         </span>
//                       </div>
//                     )}
//                     {currentBooking.totalHours && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-600">Duration:</span>
//                         <span className="text-sm text-gray-900 font-semibold">
//                           {currentBooking.totalHours} hours
//                         </span>
//                       </div>
//                     )}
//                     {currentBooking.totalPrice && (
//                       <div className="flex justify-between border-t pt-3 mt-3">
//                         <span className="text-sm text-gray-700 font-bold">Total Price:</span>
//                         <span className="text-xl text-blue-600 font-bold">
//                           ₹{currentBooking.totalPrice}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={handleReject}
//                     disabled={actionLoading}
//                     className="flex-1 px-6 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold text-lg shadow-lg hover:shadow-xl"
//                   >
//                     {actionLoading ? (
//                       <Loader2 className="animate-spin" size={24} />
//                     ) : (
//                       <>
//                         <X size={24} />
//                         <span>Reject</span>
//                       </>
//                     )}
//                   </button>

//                   <button
//                     onClick={handleConfirm}
//                     disabled={actionLoading}
//                     className="flex-1 px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold text-lg shadow-lg hover:shadow-xl"
//                   >
//                     {actionLoading ? (
//                       <Loader2 className="animate-spin" size={24} />
//                     ) : (
//                       <>
//                         <Check size={24} />
//                         <span>Accept</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Success Modal */}
//           {modalState === 'confirmed' && (
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 relative animate-fadeIn">
//               <div className="text-center">
//                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
//                   <CheckCircle className="text-green-600" size={48} />
//                 </div>
                
//                 <h2 className="text-3xl font-bold text-gray-900 mb-3">
//                   Booking Confirmed!
//                 </h2>
                
//                 <p className="text-gray-600 text-lg mb-4">
//                   Customer will be notified instantly
//                 </p>

//                 {bookingQueue.length > 1 && (
//                   <p className="text-sm text-blue-600 font-semibold">
//                     Next booking will appear automatically...
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Rejected Modal */}
//           {modalState === 'rejected' && (
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 relative animate-fadeIn">
//               <div className="text-center">
//                 <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
//                   <XCircle className="text-red-600" size={48} />
//                 </div>
                
//                 <h2 className="text-3xl font-bold text-gray-900 mb-3">
//                   Booking Rejected
//                 </h2>
                
//                 <p className="text-gray-600 text-lg mb-4">
//                   Customer will be notified instantly
//                 </p>

//                 {bookingQueue.length > 1 && (
//                   <p className="text-sm text-blue-600 font-semibold">
//                     Next booking will appear automatically...
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       <style>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.9);
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
// }






import { useState, useEffect, useRef } from 'react';
import { Check, X, Loader2, CheckCircle, XCircle, Clock, Bell, AlertCircle, Truck } from 'lucide-react';
import io from 'socket.io-client';

const SOCKET_URL = "http://3.110.122.127:3001";
const API_BASE = "http://3.110.122.127:3000";
const EXPIRY_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds

export default function PriorityBookingSystem() {
  const [bookingQueue, setBookingQueue] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState('confirm');
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const socketRef = useRef(null);
  const timersRef = useRef({});
  const ownerId = localStorage.getItem("userId") || "";


  // Auto-close modal when current booking time expires
useEffect(() => {
  if (!currentBooking) return;

  const interval = setInterval(() => {
    const remaining = currentBooking.expiresAt - Date.now();

    if (remaining <= 0) {
      clearInterval(interval);
      expireBooking(currentBooking._id || currentBooking.id);
    }
  }, 500);

  return () => clearInterval(interval);
}, [currentBooking]);


  // Initialize Socket.io
  useEffect(() => {
    if (!ownerId) return;

    socketRef.current = io(SOCKET_URL, {
      query: { userId: ownerId },
      transports: ['websocket'],
      reconnection: true
    });

    socketRef.current.on('connect', () => {
      console.log('✅ Socket connected');
    });

    socketRef.current.on('new-booking-request', (data) => {
      console.log('🔔 New booking received:', data);
      addBookingToQueue(data);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, [ownerId]);

  // Fetch initial pending bookings
  useEffect(() => {
    fetchPendingBookings();
  }, []);

  // Auto-show modal when there's no current booking
  useEffect(() => {
    if (!currentBooking && bookingQueue.length > 0) {
      showNextBooking();
    }
  }, [currentBooking, bookingQueue]);

  const fetchPendingBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/getPendingBookingsOfOwner/${ownerId}`);
      if (!res.ok) throw new Error('Failed to fetch bookings');
      
      const data = await res.json();
      let bookings = Array.isArray(data) ? data : (data.bookings || data.data || []);
      
      const pending = bookings.filter(b => 
        b.status && b.status.toLowerCase() === 'pending'
      );

      const bookingsWithTime = pending.map(booking => ({
        ...booking,
        receivedAt: new Date(booking.createdAt || booking.CreatedAt || Date.now()).getTime(),
        expiresAt: new Date(booking.createdAt || booking.CreatedAt || Date.now()).getTime() + EXPIRY_TIME
      }));

      setBookingQueue(bookingsWithTime);
      
      bookingsWithTime.forEach(booking => {
        startExpiryTimer(booking);
      });

    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const addBookingToQueue = (booking) => {
    const bookingWithTime = {
      ...booking,
      receivedAt: Date.now(),
      expiresAt: Date.now() + EXPIRY_TIME
    };

    setBookingQueue(prev => {
      const updated = [...prev, bookingWithTime];
      return updated.sort((a, b) => a.receivedAt - b.receivedAt);
    });

    startExpiryTimer(bookingWithTime);
  };

  const startExpiryTimer = (booking) => {
    const bookingId = booking._id || booking.id;
    const timeUntilExpiry = booking.expiresAt - Date.now();

    if (timeUntilExpiry > 0) {
      timersRef.current[bookingId] = setTimeout(() => {
        expireBooking(bookingId);
      }, timeUntilExpiry);
    }
  };

  const expireBooking = async (bookingId) => {
    console.log('⏱️ Booking expired:', bookingId);

    try {
      await fetch(`${API_BASE}/confirmBooking/${bookingId}/Cancelled`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      setBookingQueue(prev => prev.filter(b => (b._id || b.id) !== bookingId));
      
      if (currentBooking && (currentBooking._id || currentBooking.id) === bookingId) {
        setCurrentBooking(null);
        setShowModal(false);
       

      }

      if (timersRef.current[bookingId]) {
        clearTimeout(timersRef.current[bookingId]);
        delete timersRef.current[bookingId];
      }

    } catch (error) {
      console.error('Error expiring booking:', error);
    }
  };

  const showNextBooking = () => {
    if (bookingQueue.length === 0) return;
    
    const nextBooking = bookingQueue[0];
    setCurrentBooking(nextBooking);
    setShowModal(true);
    setModalState('confirm');
  };

  const handleConfirm = async () => {
    if (!currentBooking) return;
    
    const bookingId = currentBooking._id || currentBooking.id;
    const customerId = currentBooking.userId || currentBooking.customerId;
    
    setActionLoading(true);
    
    try {
      const res = await fetch(`${API_BASE}/confirmBooking/${bookingId}/conform`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) throw new Error('Failed to confirm booking');
      
      console.log('✅ Booking confirmed:', bookingId);
      
      if (socketRef.current?.connected && customerId) {
        socketRef.current.emit('booking-status-update', {
          bookingId,
          customerId,
          status: 'accepted',
          ownerId
        });
      }
      
      setModalState('confirmed');
      
      if (timersRef.current[bookingId]) {
        clearTimeout(timersRef.current[bookingId]);
        delete timersRef.current[bookingId];
      }
      
      setTimeout(() => {
        setBookingQueue(prev => prev.filter(b => (b._id || b.id) !== bookingId));
        setCurrentBooking(null);
        setShowModal(false);
        setModalState('confirm');
        setActionLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert(`Error: ${error.message}`);
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!currentBooking) return;
    
    const bookingId = currentBooking._id || currentBooking.id;
    const customerId = currentBooking.userId || currentBooking.customerId;
    
    setActionLoading(true);
    
    try {
      const res = await fetch(`${API_BASE}/confirmBooking/${bookingId}/Cancelled`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!res.ok) throw new Error('Failed to reject booking');
      
      console.log('❌ Booking rejected:', bookingId);
      
      if (socketRef.current?.connected && customerId) {
        socketRef.current.emit('booking-status-update', {
          bookingId,
          customerId,
          status: 'rejected',
          ownerId
        });
      }
      
      setModalState('rejected');
      
      if (timersRef.current[bookingId]) {
        clearTimeout(timersRef.current[bookingId]);
        delete timersRef.current[bookingId];
      }
      
      setTimeout(() => {
        setBookingQueue(prev => prev.filter(b => (b._id || b.id) !== bookingId));
        setCurrentBooking(null);
        setShowModal(false);
        setModalState('confirm');
        setActionLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error rejecting booking:', error);
      alert(`Error: ${error.message}`);
      setActionLoading(false);
    }
  };

  const getRemainingTime = (booking) => {
    const now = Date.now();
    const remaining = booking.expiresAt - now;
    
    if (remaining <= 0) return '00:00';
    
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const TimeDisplay = ({ booking }) => {
    const [time, setTime] = useState(getRemainingTime(booking));
    
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(getRemainingTime(booking));
      }, 1000);
      
      return () => clearInterval(interval);
    }, [booking]);
    
    const remaining = booking.expiresAt - Date.now();
    const isExpiring = remaining < 30000;
    
    return (
      <span className={`font-mono font-bold ${isExpiring ? 'text-red-600 animate-pulse' : 'text-orange-600'}`}>
        {time}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600 font-medium">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-5xl mx-auto py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Owner Dashboard</h1>
              <p className="text-gray-500">
                {bookingQueue.length} pending booking{bookingQueue.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Bell size={20} />
              Notifications
              {bookingQueue.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {bookingQueue.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Notifications Panel */}
        {showNotifications && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Notifications</h2>
            
            {bookingQueue.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No pending bookings</p>
            ) : (
              <div className="space-y-3">
                {bookingQueue.map((booking, index) => {
                  const bookingId = booking._id || booking.id;
                  const isCurrentBooking = currentBooking && (currentBooking._id || currentBooking.id) === bookingId;
                  
                  return (
                    <div
                      key={bookingId}
                      className={`p-4 rounded-lg border-2 transition ${
                        isCurrentBooking 
                          ? 'bg-blue-50 border-blue-500' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {index === 0 && !isCurrentBooking && (
                              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                                ⭐ NEXT
                              </span>
                            )}
                            {isCurrentBooking && (
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                                👁️ VIEWING
                              </span>
                            )}
                            <span className="font-semibold text-gray-800">
                              {booking.contactName || booking.customerName || 'Customer'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {booking.vehicleName || booking.VehicleName || 'Vehicle'} • 
                            ₹{booking.totalPrice || 'N/A'}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock size={16} className="text-orange-600" />
                            <TimeDisplay booking={booking} />
                          </div>
                          <p className="text-xs text-gray-500">expires in</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Info Banner */}
        <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-orange-900 mb-2">⏱️ Priority System Active</h3>
              <ul className="space-y-1 text-orange-800 text-sm">
                <li>• First booking shows in modal automatically</li>
                <li>• Other bookings wait in queue</li>
                <li>• Each booking expires after <strong>2 minutes</strong></li>
                <li>• Accept or reject quickly to avoid expiry</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {bookingQueue.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Clock className="text-gray-300 mx-auto mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Bookings</h3>
            <p className="text-gray-600">All bookings have been processed</p>
          </div>
        )}
      </div>

      {/* EXACT DESIGN FROM IMAGE - Priority Booking Modal */}
      {showModal && currentBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          
          {/* Confirmation Modal - Exact Design */}
          {modalState === 'confirm' && (
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
              {/* Timer Badge - Top Right */}
              <div className="absolute -top-3 -right-3 bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Clock size={16} />
                  <TimeDisplay booking={currentBooking} />
                </div>
              </div>

              <div className="text-center">
                {/* Blue Circle with Truck Icon - Exactly like image */}
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg">
                  <Truck size={56} className="text-white" strokeWidth={2} />
                </div>
                
                {/* "You've got a new booking!" Text */}
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  You've got a new booking!
                </h2>

                {/* Accept Button - Exact gradient like image */}
                <button
                  onClick={handleConfirm }
                  
                  disabled={actionLoading}
                  className="w-full mb-4 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-800 hover:via-blue-700 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {actionLoading ? (
                    <Loader2 className="animate-spin mx-auto" size={24} />
                  ) : (
                    'Accept'
                  )}
                </button>

                {/* Reject Button - Exact style like image */}
                <button
                  onClick={handleReject}
                  disabled={actionLoading}
                  className="w-full py-4 rounded-xl font-semibold text-lg text-red-600 bg-white border-2 border-red-600 hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? (
                    <Loader2 className="animate-spin mx-auto text-red-600" size={24} />
                  ) : (
                    'Reject'
                  )}
                </button>

                {/* Booking Details - Collapsible */}
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-blue-600 font-semibold text-sm">
                    View booking details
                  </summary>
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-2 text-sm">
                    {(currentBooking.contactName || currentBooking.customerName) && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customer:</span>
                        <span className="font-semibold text-gray-900">
                          {currentBooking.contactName || currentBooking.customerName}
                        </span>
                      </div>
                    )}
                    {(currentBooking.contactNumber || currentBooking.phone) && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-semibold text-gray-900">
                          {currentBooking.contactNumber || currentBooking.phone}
                        </span>
                      </div>
                    )}
                    {(currentBooking.vehicleName || currentBooking.VehicleName) && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vehicle:</span>
                        <span className="font-semibold text-gray-900">
                          {currentBooking.vehicleName || currentBooking.VehicleName}
                        </span>
                      </div>
                    )}
                    {currentBooking.FromDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">From:</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(currentBooking.FromDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {currentBooking.ToDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">To:</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(currentBooking.ToDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {currentBooking.totalPrice && (
                      <div className="flex justify-between border-t pt-2 mt-2">
                        <span className="text-gray-700 font-bold">Total:</span>
                        <span className="text-xl text-blue-600 font-bold">
                          ₹{currentBooking.totalPrice}
                        </span>
                      </div>
                    )}
                  </div>
                </details>
              </div>
            </div>
          )}

          {/* Success Modal */}
          {modalState === 'confirmed' && (
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 relative animate-fadeIn">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
                  <CheckCircle className="text-green-600" size={56} />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Booking Confirmed!
                </h2>
                
                <p className="text-gray-600 text-lg mb-4">
                  Customer will be notified instantly
                </p>

                {bookingQueue.length > 1 && (
                  <p className="text-sm text-blue-600 font-semibold">
                    Next booking will appear automatically...
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Rejected Modal */}
          {modalState === 'rejected' && (
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 relative animate-fadeIn">
              <div className="text-center">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
                  <XCircle className="text-red-600" size={56} />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Booking Rejected
                </h2>
                
                <p className="text-gray-600 text-lg mb-4">
                  Customer will be notified instantly
                </p>

                {bookingQueue.length > 1 && (
                  <p className="text-sm text-blue-600 font-semibold">
                    Next booking will appear automatically...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}