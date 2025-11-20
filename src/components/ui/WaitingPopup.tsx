// import React, { useEffect, useState } from "react";

// interface WaitingPopupProps {
//   /**
//    * Controls popup visibility.
//    * If not provided, truthiness of `timer` or `timerSeconds` will be used to show popup.
//    */
//   isOpen?: boolean;

//   /** Backward-compatible prop from older code: total countdown seconds */
//   timer?: number;

//   /** Preferred prop: total countdown duration in seconds */
//   timerSeconds?: number;

//   /** Called when user manually closes the popup */
//   onClose: () => void;

//   /** Called automatically when timer completes */
//   onTimerComplete?: () => void;
// }

// /**
//  * WaitingPopup
//  *
//  * - Compatible with both `{ timer }` style and `{ isOpen, timerSeconds }` style.
//  * - Shows circular progress + mini progress bars + remaining seconds.
//  * - Calls `onTimerComplete` when countdown reaches 0.
//  */
// const WaitingPopup: React.FC<WaitingPopupProps> = ({
//   isOpen,
//   timer,
//   timerSeconds,
//   onClose,
//   onTimerComplete,
// }) => {
//   // Resolve "open" and initial timer in a backward-compatible way.
//   // If `isOpen` provided, respect it; otherwise, treat a positive timer as open.
//   const resolvedInitial = timerSeconds ?? timer ?? 30;
//   const resolvedIsOpen = typeof isOpen === "boolean" ? isOpen : Boolean(timer ?? timerSeconds);

//   const [remainingTime, setRemainingTime] = useState<number>(resolvedInitial);

//   // Sync remainingTime whenever the modal is opened or timer props change.
//   useEffect(() => {
//     setRemainingTime(resolvedInitial);
//   }, [resolvedInitial, resolvedIsOpen]);

//   // Countdown logic
//   useEffect(() => {
//     if (!resolvedIsOpen) return;

//     // Ensure we start from the right value if prop changed
//     setRemainingTime((prev) => (prev === 0 ? resolvedInitial : prev));

//     const interval = setInterval(() => {
//       setRemainingTime((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           // notify parent
//           onTimerComplete?.();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [resolvedIsOpen, resolvedInitial, onTimerComplete]);

//   if (!resolvedIsOpen) return null;

//   // Circular progress variables (based on original code)
//   const radius = 45;
//   const strokeWidth = 10;
//   const circumference = 2 * Math.PI * radius;
//   // Protect against division by zero
//   const total = resolvedInitial > 0 ? resolvedInitial : 30;
//   const progress = Math.max(0, Math.min(1, remainingTime / total));
//   const offset = circumference * (1 - progress);
//   return (
//     <div className="fixed inset-0 z-50 flex items-end justify-center">
//       {/* Backdrop blur */}
//       <div
//         className="absolute inset-0 bg-black/40"
//         style={{ backdropFilter: "blur(12px)" }}
//         onClick={onClose}
//       />
//       {/* Popup card (slide-up style but constrained width for desktop) */}
//       <div
//         className="relative w-full bg-white rounded-t-3xl shadow-2xl pb-8 pt-6 px-6"
//         style={{ animation: "slideUp 0.28s ease-out", maxWidth: "600px" }}
//         role="dialog"
//         aria-modal="true"
//       >
//         {/* Title */}
//         <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
//           Waiting for response!
//         </h2>

//         {/* Grey line separator */}
//         <div className="w-full h-px bg-gray-300 my-5" />
//         {/* Progress bars (top mini indicators) */}
//         <div className="flex justify-center gap-3 mb-8 px-8">
//           {[0, 1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="flex-1 h-1.5 rounded-full transition-opacity duration-300"
//               style={{
//                 background: "linear-gradient(to right, #1A2980, #26D0CE)",
//                 opacity: i < Math.floor(progress * 4) ? 1 : 0.28,
//               }}
//             />
//           ))}
//         </div>

//         {/* Circular timer */}
//         <div className="flex flex-col items-center">
//           <div className="relative w-32 h-32 mb-3">
//             <svg
//               width="128"
//               height="128"
//               viewBox="0 0 128 128"
//               style={{ transform: "rotate(-90deg)" }}
//             >
//               <defs>
//                 <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
//                   <stop offset="0%" stopColor="#1A2980" />
//                   <stop offset="100%" stopColor="#26D0CE" />
//                 </linearGradient>
//               </defs>

//               {/* Background circle */}
//               <circle
//                 cx="64"
//                 cy="64"
//                 r={radius}
//                 stroke="#E5E7EB"
//                 strokeWidth={strokeWidth}
//                 fill="none"
//               />

//               {/* Progress circle */}
//               <circle
//                 cx="64"
//                 cy="64"
//                 r={radius}
//                 stroke="url(#grad)"
//                 strokeWidth={strokeWidth}
//                 strokeDasharray={circumference}
//                 strokeDashoffset={offset}
//                 strokeLinecap="round"
//                 fill="none"
//                 style={{ transition: "stroke-dashoffset 0.45s ease" }}
//               />
//             </svg>

//             {/* Clock icon in center */}
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
//                 <defs>
//                   <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#1A2980" />
//                     <stop offset="100%" stopColor="#26D0CE" />
//                   </linearGradient>
//                 </defs>
//                 <circle
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="url(#clockGrad)"
//                   strokeWidth="2"
//                   fill="none"
//                 />
//                 <path d="M12 6V12L16 14" stroke="url(#clockGrad)" strokeWidth="2" strokeLinecap="round" />
//               </svg>
//             </div>
//           </div>

//           {/* Timer text */}
//           <p className="text-lg font-bold text-gray-800">{remainingTime} sec</p>
//         </div>

//         {/* Action row */}
//         <div className="mt-6 px-4">
//          <button
//   onClick={onClose}
//   className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition shadow-md"
// >
//   Cancel
// </button>
//         </div>
//       </div>

//       {/* Slide-up animation style preserved */}
//       <style>{`
//         @keyframes slideUp {
//           from {
//             transform: translateY(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default WaitingPopup;














// import React, { useEffect, useState } from "react";

// interface WaitingPopupProps {
//   /**
//    * Controls popup visibility.
//    * If not provided, truthiness of `timer` or `timerSeconds` will be used to show popup.
//    */
//   isOpen?: boolean;

//   /** Backward-compatible prop from older code: total countdown seconds */
//   timer?: number;

//   /** Preferred prop: total countdown duration in seconds */
//   timerSeconds?: number;

//   /** The booking ID to check status */
//   bookingId?: string;

//   /** Called when user manually closes the popup */
//   onClose: () => void;

//   /** Called automatically when timer completes */
//   onTimerComplete?: () => void;

//   /** Called when booking is confirmed */
//   onBookingConfirmed?: (bookingData: any) => void;

//   /** Called when booking is auto-cancelled */
//   onBookingCancelled?: (bookingData: any) => void;
// }

// /**
//  * WaitingPopup
//  *
//  * - Compatible with both `{ timer }` style and `{ isOpen, timerSeconds }` style.
//  * - Shows circular progress + mini progress bars + remaining seconds.
//  * - Calls `onTimerComplete` when countdown reaches 0.
//  * - Polls booking status API every 5 seconds to check for confirmation/cancellation
//  */
// const WaitingPopup: React.FC<WaitingPopupProps> = ({
//   isOpen,
//   timer,
//   timerSeconds,
//   bookingId,
//   onClose,
//   onTimerComplete,
//   onBookingConfirmed,
//   onBookingCancelled,
// }) => {
//   // Resolve "open" and initial timer in a backward-compatible way.
//   // If `isOpen` provided, respect it; otherwise, treat a positive timer as open.
//   const resolvedInitial = timerSeconds ?? timer ?? 120; // Default 120 seconds (2 minutes)
//   const resolvedIsOpen = typeof isOpen === "boolean" ? isOpen : Boolean(timer ?? timerSeconds);

//   const [remainingTime, setRemainingTime] = useState<number>(resolvedInitial);
//   const [bookingStatus, setBookingStatus] = useState<string>("");

//   // Sync remainingTime whenever the modal is opened or timer props change.
//   useEffect(() => {
//     setRemainingTime(resolvedInitial);
//   }, [resolvedInitial, resolvedIsOpen]);

//   // Fetch booking status periodically
//   useEffect(() => {
//     if (!resolvedIsOpen || !bookingId) return;

//     const fetchBookingStatus = async () => {
//       try {
//         const requestOptions = {
//           method: "GET",
//           redirect: "follow" as RequestRedirect,
//         };

//         const response = await fetch(
//           `http://3.110.122.127:3000/getBookingById/${bookingId}`,
//           requestOptions
//         );

//         const result = await response.text();
//         console.log("Booking Status Response:", result);

//         const parsedResult = JSON.parse(result);

//         if (parsedResult.booking) {
//           const status = parsedResult.booking.status;
//           setBookingStatus(status);

//           // Handle booking confirmation
//           if (status === "Confirmed" || status === "Accepted") {
//             onBookingConfirmed?.(parsedResult);
//             onClose();
//           }

//           // Handle booking cancellation
//           if (status === "AutoCancelled" || status === "Cancelled") {
//             onBookingCancelled?.(parsedResult);
//             onClose();
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching booking status:", error);
//       }
//     };

//     // Fetch immediately
//     fetchBookingStatus();

//     // Poll every 5 seconds
//     const statusInterval = setInterval(fetchBookingStatus, 5000);

//     return () => clearInterval(statusInterval);
//   }, [resolvedIsOpen, bookingId, onBookingConfirmed, onBookingCancelled, onClose]);

//   // Countdown logic
//   useEffect(() => {
//     if (!resolvedIsOpen) return;

//     // Ensure we start from the right value if prop changed
//     setRemainingTime((prev) => (prev === 0 ? resolvedInitial : prev));

//     const interval = setInterval(() => {
//       setRemainingTime((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           // notify parent
//           onTimerComplete?.();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [resolvedIsOpen, resolvedInitial, onTimerComplete]);

//   if (!resolvedIsOpen) return null;

//   // Circular progress variables (based on original code)
//   const radius = 45;
//   const strokeWidth = 10;
//   const circumference = 2 * Math.PI * radius;
//   // Protect against division by zero
//   const total = resolvedInitial > 0 ? resolvedInitial : 120;
//   const progress = Math.max(0, Math.min(1, remainingTime / total));
//   const offset = circumference * (1 - progress);

//   return (
//     <div className="fixed inset-0 z-50 flex items-end justify-center">
//       {/* Backdrop blur */}
//       <div
//         className="absolute inset-0 bg-black/40"
//         style={{ backdropFilter: "blur(12px)" }}
//         onClick={onClose}
//       />
//       {/* Popup card (slide-up style but constrained width for desktop) */}
//       <div
//         className="relative w-full bg-white rounded-t-3xl shadow-2xl pb-8 pt-6 px-6"
//         style={{ animation: "slideUp 0.28s ease-out", maxWidth: "600px" }}
//         role="dialog"
//         aria-modal="true"
//       >
//         {/* Title */}
//         <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
//           Waiting for response!
//         </h2>

//         {/* Booking Status (if available) */}
//         {bookingStatus && (
//           <p className="text-sm text-gray-600 text-center mb-2">
//             Status: <span className="font-semibold">{bookingStatus}</span>
//           </p>
//         )}

//         {/* Grey line separator */}
//         <div className="w-full h-px bg-gray-300 my-5" />
//         {/* Progress bars (top mini indicators) */}
//         <div className="flex justify-center gap-3 mb-8 px-8">
//           {[0, 1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="flex-1 h-1.5 rounded-full transition-opacity duration-300"
//               style={{
//                 background: "linear-gradient(to right, #1A2980, #26D0CE)",
//                 opacity: i < Math.floor(progress * 4) ? 1 : 0.28,
//               }}
//             />
//           ))}
//         </div>

//         {/* Circular timer */}
//         <div className="flex flex-col items-center">
//           <div className="relative w-32 h-32 mb-3">
//             <svg
//               width="128"
//               height="128"
//               viewBox="0 0 128 128"
//               style={{ transform: "rotate(-90deg)" }}
//             >
//               <defs>
//                 <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
//                   <stop offset="0%" stopColor="#1A2980" />
//                   <stop offset="100%" stopColor="#26D0CE" />
//                 </linearGradient>
//               </defs>

//               {/* Background circle */}
//               <circle
//                 cx="64"
//                 cy="64"
//                 r={radius}
//                 stroke="#E5E7EB"
//                 strokeWidth={strokeWidth}
//                 fill="none"
//               />

//               {/* Progress circle */}
//               <circle
//                 cx="64"
//                 cy="64"
//                 r={radius}
//                 stroke="url(#grad)"
//                 strokeWidth={strokeWidth}
//                 strokeDasharray={circumference}
//                 strokeDashoffset={offset}
//                 strokeLinecap="round"
//                 fill="none"
//                 style={{ transition: "stroke-dashoffset 0.45s ease" }}
//               />
//             </svg>

//             {/* Clock icon in center */}
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
//                 <defs>
//                   <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#1A2980" />
//                     <stop offset="100%" stopColor="#26D0CE" />
//                   </linearGradient>
//                 </defs>
//                 <circle
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="url(#clockGrad)"
//                   strokeWidth="2"
//                   fill="none"
//                 />
//                 <path d="M12 6V12L16 14" stroke="url(#clockGrad)" strokeWidth="2" strokeLinecap="round" />
//               </svg>
//             </div>
//           </div>

//           {/* Timer text */}
//           <p className="text-lg font-bold text-gray-800">{remainingTime} sec</p>
//           <p className="text-xs text-gray-500 mt-1">Auto-cancels in {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')} min</p>
//         </div>

//         {/* Action row */}
//         <div className="mt-6 px-4">
//           <button
//             onClick={onClose}
//             className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition shadow-md font-semibold"
//           >
//             Cancel Waiting
//           </button>
//         </div>
//       </div>

//       {/* Slide-up animation style preserved */}
//       <style>{`
//         @keyframes slideUp {
//           from {
//             transform: translateY(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default WaitingPopup;




// import React, { useEffect, useState } from "react";

// interface WaitingPopupProps {
//   /**
//    * Controls popup visibility.
//    * If not provided, truthiness of `timer` or `timerSeconds` will be used to show popup.
//    */
//   isOpen?: boolean;

//   /** Backward-compatible prop from older code: total countdown seconds */
//   timer?: number;

//   /** Preferred prop: total countdown duration in seconds */
//   timerSeconds?: number;

//   /** The booking ID to check status */
//   bookingId?: string;

//   /** Called when user manually closes the popup */
//   onClose: () => void;

//   /** Called automatically when timer completes */
//   onTimerComplete?: () => void;

//   /** Called when booking is confirmed */
//   onBookingConfirmed?: (bookingData: any) => void;

//   /** Called when booking is auto-cancelled */
//   onBookingCancelled?: (bookingData: any) => void;
// }

// /**
//  * WaitingPopup
//  *
//  * - Compatible with both `{ timer }` style and `{ isOpen, timerSeconds }` style.
//  * - Shows circular progress + mini progress bars + remaining seconds.
//  * - Calls `onTimerComplete` when countdown reaches 0.
//  * - Polls booking status API every 5 seconds to check for confirmation/cancellation
//  */
// const WaitingPopup: React.FC<WaitingPopupProps> = ({
//   isOpen,
//   timer,
//   timerSeconds,
//   bookingId,
//   onClose,
//   onTimerComplete,
//   onBookingConfirmed,
//   onBookingCancelled,
// }) => {
//   // Resolve "open" and initial timer in a backward-compatible way.
//   // If `isOpen` provided, respect it; otherwise, treat a positive timer as open.
//   const resolvedInitial = timerSeconds ?? timer ?? 120; // Default 120 seconds (2 minutes)
//   const resolvedIsOpen = typeof isOpen === "boolean" ? isOpen : Boolean(timer ?? timerSeconds);

//   const [remainingTime, setRemainingTime] = useState<number>(resolvedInitial);
//   const [bookingStatus, setBookingStatus] = useState<string>("");

//   // Sync remainingTime whenever the modal is opened or timer props change.
//   useEffect(() => {
//     setRemainingTime(resolvedInitial);
//   }, [resolvedInitial, resolvedIsOpen]);

//   // Fetch booking status periodically
//   useEffect(() => {
//     if (!resolvedIsOpen || !bookingId) return;

//     const fetchBookingStatus = async () => {
//       try {
//         const requestOptions = {
//           method: "GET",
//           redirect: "follow" as RequestRedirect,
//         };

//         const response = await fetch(
//           `http://3.110.122.127:3000/getBookingById/${bookingId}`,
//           requestOptions
//         );

//         const result = await response.text();
//         console.log("Booking Status Response:", result);

//         const parsedResult = JSON.parse(result);

//         if (parsedResult.booking) {
//           const status = parsedResult.booking.status;
//           setBookingStatus(status);

//           // Handle booking confirmation
//           if (status === "Confirmed" || status === "Accepted") {
//             onBookingConfirmed?.(parsedResult);
//             onClose();
//           }

//           // Handle booking cancellation
//           if (status === "AutoCancelled" || status === "Cancelled") {
//             onBookingCancelled?.(parsedResult);
//             onClose();
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching booking status:", error);
//       }
//     };

//     // Fetch immediately
//     fetchBookingStatus();

//     // Poll every 5 seconds
//     const statusInterval = setInterval(fetchBookingStatus, 5000);

//     return () => clearInterval(statusInterval);
//   }, [resolvedIsOpen, bookingId, onBookingConfirmed, onBookingCancelled, onClose]);

//   // Countdown logic
//   useEffect(() => {
//     if (!resolvedIsOpen) return;

//     // Ensure we start from the right value if prop changed
//     setRemainingTime((prev) => (prev === 0 ? resolvedInitial : prev));

//     const interval = setInterval(() => {
//       setRemainingTime((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           // notify parent
//           onTimerComplete?.();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [resolvedIsOpen, resolvedInitial, onTimerComplete]);

//   if (!resolvedIsOpen) return null;

//   // Circular progress variables (based on original code)
//   const radius = 45;
//   const strokeWidth = 10;
//   const circumference = 2 * Math.PI * radius;
//   // Protect against division by zero
//   const total = resolvedInitial > 0 ? resolvedInitial : 120;
//   const progress = Math.max(0, Math.min(1, remainingTime / total));
//   const offset = circumference * (1 - progress);

//   return (
//     <div className="fixed inset-0 z-50 flex items-end justify-center">
//       {/* Backdrop blur */}
//       <div
//         className="absolute inset-0 bg-black/40"
//         style={{ backdropFilter: "blur(12px)" }}
//         onClick={onClose}
//       />
//       {/* Popup card (slide-up style but constrained width for desktop) */}
//       <div
//         className="relative w-full bg-white rounded-t-3xl shadow-2xl pb-8 pt-6 px-6"
//         style={{ animation: "slideUp 0.28s ease-out", maxWidth: "600px" }}
//         role="dialog"
//         aria-modal="true"
//       >
//         {/* Title */}
//         <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
//           Waiting for response!
//         </h2>

//         {/* Booking Status (if available) */}
//         {bookingStatus && (
//           <p className="text-sm text-gray-600 text-center mb-2">
//             Status: <span className="font-semibold">{bookingStatus}</span>
//           </p>
//         )}

//         {/* Grey line separator */}
//         <div className="w-full h-px bg-gray-300 my-5" />
//         {/* Progress bars (top mini indicators) */}
//         <div className="flex justify-center gap-3 mb-8 px-8">
//           {[0, 1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="flex-1 h-1.5 rounded-full transition-opacity duration-300"
//               style={{
//                 background: "linear-gradient(to right, #1A2980, #26D0CE)",
//                 opacity: i < Math.floor(progress * 4) ? 1 : 0.28,
//               }}
//             />
//           ))}
//         </div>

//         {/* Circular timer */}
//         <div className="flex flex-col items-center">
//           <div className="relative w-32 h-32 mb-3">
//             <svg
//               width="128"
//               height="128"
//               viewBox="0 0 128 128"
//               style={{ transform: "rotate(-90deg)" }}
//             >
//               <defs>
//                 <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
//                   <stop offset="0%" stopColor="#1A2980" />
//                   <stop offset="100%" stopColor="#26D0CE" />
//                 </linearGradient>
//               </defs>

//               {/* Background circle */}
//               <circle
//                 cx="64"
//                 cy="64"
//                 r={radius}
//                 stroke="#E5E7EB"
//                 strokeWidth={strokeWidth}
//                 fill="none"
//               />

//               {/* Progress circle */}
//               <circle
//                 cx="64"
//                 cy="64"
//                 r={radius}
//                 stroke="url(#grad)"
//                 strokeWidth={strokeWidth}
//                 strokeDasharray={circumference}
//                 strokeDashoffset={offset}
//                 strokeLinecap="round"
//                 fill="none"
//                 style={{ transition: "stroke-dashoffset 0.45s ease" }}
//               />
//             </svg>

//             {/* Clock icon in center */}
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
//                 <defs>
//                   <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#1A2980" />
//                     <stop offset="100%" stopColor="#26D0CE" />
//                   </linearGradient>
//                 </defs>
//                 <circle
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="url(#clockGrad)"
//                   strokeWidth="2"
//                   fill="none"
//                 />
//                 <path d="M12 6V12L16 14" stroke="url(#clockGrad)" strokeWidth="2" strokeLinecap="round" />
//               </svg>
//             </div>
//           </div>

//           {/* Timer text */}
//           <p className="text-lg font-bold text-gray-800">{remainingTime} sec</p>
//           <p className="text-xs text-gray-500 mt-1">Auto-cancels in {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')} min</p>
//         </div>

//         {/* Action row */}
//         <div className="mt-6 px-4">
//           <button
//             onClick={onClose}
//             className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition shadow-md font-semibold"
//           >
//             Cancel Waiting
//           </button>
//         </div>
//       </div>

//       {/* Slide-up animation style preserved */}
//       <style>{`
//         @keyframes slideUp {
//           from {
//             transform: translateY(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default WaitingPopup;













import React, { useEffect, useState } from "react";

// ============================================
// WAITING POPUP COMPONENT (Customer Side)
// ============================================

interface WaitingPopupProps {
  /**
   * Controls popup visibility.
   * If not provided, truthiness of `timer` or `timerSeconds` will be used to show popup.
   */
  isOpen?: boolean;

  /** Backward-compatible prop from older code: total countdown seconds */
  timer?: number;

  /** Preferred prop: total countdown duration in seconds */
  timerSeconds?: number;

  /** The booking ID to check status */
  bookingId?: string;

  /** Called when user manually closes the popup */
  onClose: () => void;

  /** Called automatically when timer completes */
  onTimerComplete?: () => void;

  /** Called when booking is confirmed */
  onBookingConfirmed?: (bookingData: any) => void;

  /** Called when booking is auto-cancelled */
  onBookingCancelled?: (bookingData: any) => void;
}

/**
 * WaitingPopup
 *
 * - Compatible with both `{ timer }` style and `{ isOpen, timerSeconds }` style.
 * - Shows circular progress + mini progress bars + remaining seconds.
 * - Calls `onTimerComplete` when countdown reaches 0.
 * - Polls booking status API every 3 seconds to check for confirmation/cancellation
 */
const WaitingPopup: React.FC<WaitingPopupProps> = ({
  isOpen,
  timer,
  timerSeconds,
  bookingId,
  onClose,
  onTimerComplete,
  onBookingConfirmed,
  onBookingCancelled,
}) => {
  // Resolve "open" and initial timer in a backward-compatible way.
  // If `isOpen` provided, respect it; otherwise, treat a positive timer as open.
  const resolvedInitial = timerSeconds ?? timer ?? 120; // Default 120 seconds (2 minutes)
  const resolvedIsOpen = typeof isOpen === "boolean" ? isOpen : Boolean(timer ?? timerSeconds);

  const [remainingTime, setRemainingTime] = useState<number>(resolvedInitial);
  const [bookingStatus, setBookingStatus] = useState<string>("");

  // Sync remainingTime whenever the modal is opened or timer props change.
  useEffect(() => {
    setRemainingTime(resolvedInitial);
  }, [resolvedInitial, resolvedIsOpen]);

  // Fetch booking status periodically
  useEffect(() => {
    if (!resolvedIsOpen || !bookingId) return;

    const fetchBookingStatus = async () => {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow" as RequestRedirect,
        };

        const response = await fetch(
          `http://3.110.122.127:3000/getBookingById/${bookingId}`,
          requestOptions
        );

        const result = await response.text();
        console.log("📊 Booking Status Response:", result);

        const parsedResult = JSON.parse(result);

        if (parsedResult.booking) {
          const status = parsedResult.booking.status;
          setBookingStatus(status);

          // Handle booking confirmation
          if (status === "Confirmed" || status === "Accepted") {
            console.log("✅ Booking confirmed by owner!");
            onBookingConfirmed?.(parsedResult);
            onClose();
          }

          // Handle booking cancellation
          if (status === "AutoCancelled" || status === "Cancelled") {
            console.log("❌ Booking cancelled!");
            onBookingCancelled?.(parsedResult);
            onClose();
          }
        }
      } catch (error) {
        console.error("Error fetching booking status:", error);
      }
    };

    // Fetch immediately
    fetchBookingStatus();

    // Poll every 3 seconds (faster detection)
    const statusInterval = setInterval(fetchBookingStatus, 3000);

    return () => clearInterval(statusInterval);
  }, [resolvedIsOpen, bookingId, onBookingConfirmed, onBookingCancelled, onClose]);

  // Countdown logic
  useEffect(() => {
    if (!resolvedIsOpen) return;

    // Ensure we start from the right value if prop changed
    setRemainingTime((prev) => (prev === 0 ? resolvedInitial : prev));

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // notify parent
          onTimerComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resolvedIsOpen, resolvedInitial, onTimerComplete]);

  if (!resolvedIsOpen) return null;

  // Circular progress variables (based on original code)
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  // Protect against division by zero
  const total = resolvedInitial > 0 ? resolvedInitial : 120;
  const progress = Math.max(0, Math.min(1, remainingTime / total));
  const offset = circumference * (1 - progress);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop blur */}
      <div
        className="absolute inset-0 bg-black/40"
        style={{ backdropFilter: "blur(12px)" }}
        onClick={onClose}
      />
      {/* Popup card (slide-up style but constrained width for desktop) */}
      <div
        className="relative w-full bg-white rounded-t-3xl shadow-2xl pb-8 pt-6 px-6"
        style={{ animation: "slideUp 0.28s ease-out", maxWidth: "600px" }}
        role="dialog"
        aria-modal="true"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
          Waiting for owner response!
        </h2>

        {/* Booking Status (if available) */}
        {bookingStatus && (
          <p className="text-sm text-gray-600 text-center mb-2">
            Status: <span className="font-semibold text-blue-600">{bookingStatus}</span>
          </p>
        )}

        {/* Grey line separator */}
        <div className="w-full h-px bg-gray-300 my-5" />
        {/* Progress bars (top mini indicators) */}
        <div className="flex justify-center gap-3 mb-8 px-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-1 h-1.5 rounded-full transition-opacity duration-300"
              style={{
                background: "linear-gradient(to right, #1A2980, #26D0CE)",
                opacity: i < Math.floor(progress * 4) ? 1 : 0.28,
              }}
            />
          ))}
        </div>

        {/* Circular timer */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-3">
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              style={{ transform: "rotate(-90deg)" }}
            >
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1A2980" />
                  <stop offset="100%" stopColor="#26D0CE" />
                </linearGradient>
              </defs>

              {/* Background circle */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="#E5E7EB"
                strokeWidth={strokeWidth}
                fill="none"
              />

              {/* Progress circle */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="url(#grad)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                fill="none"
                style={{ transition: "stroke-dashoffset 0.45s ease" }}
              />
            </svg>

            {/* Clock icon in center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1A2980" />
                    <stop offset="100%" stopColor="#26D0CE" />
                  </linearGradient>
                </defs>
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="url(#clockGrad)"
                  strokeWidth="2"
                  fill="none"
                />
                <path d="M12 6V12L16 14" stroke="url(#clockGrad)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Timer text */}
          <p className="text-lg font-bold text-gray-800">{remainingTime} sec</p>
          <p className="text-xs text-gray-500 mt-1">Auto-cancels in {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')} min</p>
        </div>

        {/* Action row */}
        <div className="mt-6 px-4">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition shadow-md font-semibold"
          >
            Cancel Waiting
          </button>
        </div>
      </div>

      {/* Slide-up animation style preserved */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// ============================================
// BOOKING PAGE EXAMPLE WITH FULL INTEGRATION
// ============================================

function BookingPage() {
  const [showWaiting, setShowWaiting] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateBooking = async () => {
    try {
      setLoading(true);

      // Example: Your booking creation API call
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const bookingData = {
        userId: localStorage.getItem('userId') || '690c9fb0e524c979c76104c9',
        vehicleId: '690dcd0ce524c979c76122c7', // Replace with actual vehicle ID
        vehicleType: 'Car',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000).toISOString(), // +1 day
        totalAmount: 1000,
        // Add other booking fields as needed
      };

      const response = await fetch('http://3.110.122.127:3000/createBooking', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();
      console.log('Booking created:', result);

      if (result.success || response.ok) {
        // Get the booking ID from response
        const newBookingId = result.booking?._id || result._id;
        
        setBookingId(newBookingId);
        setShowWaiting(true);
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🚗 Create Your Booking
        </h1>

        {/* Booking Form - Add your form fields here */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <p className="text-gray-600 mb-4">
            Fill in your booking details and submit. You'll see a waiting popup 
            while we wait for the owner to respond.
          </p>

          {/* Add your form fields here */}
          <div className="space-y-4">
            {/* Example fields - replace with your actual form */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type
              </label>
              <input 
                type="text" 
                placeholder="Car" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rental Duration
              </label>
              <input 
                type="text" 
                placeholder="1 day" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleCreateBooking}
            disabled={loading}
            className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition shadow-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Booking...' : 'Create Booking & Wait for Owner'}
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-blue-800 font-semibold mb-2">
            ℹ️ How it works:
          </p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Click "Create Booking" to submit your request</li>
            <li>• A waiting popup will appear with a 2-minute timer</li>
            <li>• The owner will receive a notification to accept/reject</li>
            <li>• You'll be notified immediately when the owner responds</li>
            <li>• If no response in 2 minutes, booking auto-cancels</li>
          </ul>
        </div>
      </div>

      {/* Waiting Popup Component */}
      <WaitingPopup
        isOpen={showWaiting}
        bookingId={bookingId}
        timerSeconds={120}
        onClose={() => setShowWaiting(false)}
        onTimerComplete={() => {
          console.log('⏰ Timer completed - booking auto-cancelled');
          setShowWaiting(false);
          alert('⏰ Booking request timed out. The owner did not respond within 2 minutes.');
        }}
        onBookingConfirmed={(data) => {
          console.log('✅ Booking confirmed:', data);
          setShowWaiting(false);
          alert('🎉 Great news! Your booking has been confirmed by the owner!');
          // Navigate to booking details page or confirmation page
          // window.location.href = `/booking-details/${bookingId}`;
        }}
        onBookingCancelled={(data) => {
          console.log('❌ Booking cancelled:', data);
          setShowWaiting(false);
          alert('❌ Sorry, your booking was cancelled by the owner.');
          // Navigate back to search or show alternative vehicles
        }}
      />
    </div>
  );
}

export default WaitingPopup;