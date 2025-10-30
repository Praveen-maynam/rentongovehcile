// src/components/ui/BookingAcceptance.tsx
import React from "react";
 
interface BookingAcceptanceProps {
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}
 
const BookingAcceptance: React.FC<BookingAcceptanceProps> = ({
  onAccept,
  onReject,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{ backdropFilter: "blur(8px)" }}
        onClick={onClose}
      />
 
      {/* Card */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl p-12 mx-4 w-full"
        style={{
          animation: "fadeIn 0.3s ease-out",
          maxWidth: "650px",
          minHeight: "500px",
        }}
      >
        {/* Animated Icon with Waves */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            {/* Animated waves */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute rounded-full border-2 border-blue-500"
                  style={{
                    width: `${160 + i * 40}px`,
                    height: `${160 + i * 40}px`,
                    opacity: 0.3 - i * 0.07,
                    animation: `pulse 2s infinite ${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
 
            {/* Center circle with truck icon */}
            <div
              className="relative w-40 h-40 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4)",
              }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
          </div>
        </div>
 
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 leading-tight">
          You've got a new booking!
        </h2>
 
        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={onAccept}
            className="w-full text-white font-bold py-5 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
            style={{
              background: "linear-gradient(to right, #0B0E92, #69A6F0)",
            }}
          >
            Accept
          </button>
 
          <button
            onClick={onReject}
            className="w-full bg-white text-red-600 font-bold py-5 px-8 rounded-xl border-2 border-red-600 hover:bg-red-50 transition-all duration-200 text-lg"
          >
            Reject
          </button>
        </div>
      </div>
 
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
 
        @keyframes pulse {
          0%,
          100% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
 
export default BookingAcceptance;
 