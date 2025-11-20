// import React from 'react';
 
// interface BookingRejectModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }
 
// const BookingRejectModal: React.FC<BookingRejectModalProps> = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;
 
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop with blur effect */}
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//         onClick={onClose}
//       />
     
//       {/* Modal Card */}
//       <div className="relative bg-white rounded-3xl w-[85vw] max-w-md mx-4 shadow-2xl animate-fadeIn">
//         <div className="px-8 py-10 flex flex-col items-center">
//           {/* Sad Face Icon */}
//           <div className="mb-6">
//             <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg">
//               <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-700 to-cyan-500 flex items-center justify-center">
//                 <svg
//                   viewBox="0 0 100 100"
//                   className="w-20 h-20 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="6"
//                   strokeLinecap="round"
//                 >
//                   {/* Eyes */}
//                   <circle cx="35" cy="40" r="4" fill="currentColor" />
//                   <circle cx="65" cy="40" r="4" fill="currentColor" />
//                   {/* Sad mouth */}
//                   <path d="M 30 70 Q 50 55 70 70" />
//                 </svg>
//               </div>
//             </div>
//           </div>
         
//           {/* Title */}
//           <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 leading-tight px-2">
//             Sorry! your request was not accepted
//           </h2>
         
//           {/* Okay Button */}
//           <button
//             onClick={onClose}
//             className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-semibold text-lg py-4 rounded-xl shadow-lg transition-all duration-200 active:scale-95"
//           >
//             Okay
//           </button>
//         </div>
//       </div>
     
//       <style>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };
 
// export default BookingRejectModal;
 
import { useNavigate } from "react-router-dom";
 
interface BookingRejectModalProps {
isOpen: boolean;
onClose?: () => void;
onReject?: (reason: string) => void | Promise<void>;
}
 
const BookingRejectModal: React.FC<BookingRejectModalProps> = ({ isOpen, onClose, onReject }) => {
const navigate = useNavigate();
 
if (!isOpen) return null;
 
const handleNavigate = () => {
navigate("/rental"); // ✅ navigates to Rental.tsx (make sure this route exists in App.tsx)
};
 
return (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
<div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-8 text-center transform transition-all duration-300">
<div className="flex justify-center mb-6">
<div className="w-28 h-28 bg-gradient-to-b from-[#0B0E92] to-[#69A6F0] rounded-full flex items-center justify-center">
<span className="text-white text-6xl">☹️</span>
</div>
</div>
 
    <h2 className="text-2xl font-semibold text-gray-800 mb-8 leading-snug">
      Sorry! your request was not accepted
    </h2>
 
    <button
      onClick={handleNavigate}
      className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-semibold text-lg py-4 rounded-xl shadow-lg transition-all duration-200 active:scale-95"
    >
      Okay
    </button>
  </div>
</div>
 
 
);
};
 
export default BookingRejectModal;
 
