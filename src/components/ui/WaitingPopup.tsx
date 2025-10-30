import React, { useEffect } from "react";
 
interface WaitingPopupProps {
  timer: number;
  onClose: () => void;
  onTimerComplete: () => void;
}
 
const WaitingPopup: React.FC<WaitingPopupProps> = ({
  timer,
  onClose,
  onTimerComplete,
}) => {
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = timer / 30;
  const offset = circumference * (1 - progress);
 
  // Trigger onTimerComplete when timer reaches 0
  useEffect(() => {
    if (timer === 0) {
      onTimerComplete();
    }
  }, [timer, onTimerComplete]);
 
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop blur */}
      <div
        className="absolute inset-0 bg-black/40"
        style={{ backdropFilter: "blur(12px)" }}
        onClick={onClose}
      />
 
      {/* Popup card */}
      <div
        className="relative w-full bg-white rounded-t-3xl shadow-2xl pb-8 pt-6 px-6"
        style={{ animation: "slideUp 0.3s ease-out", maxWidth: "600px" }}
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
          Waiting for response!
        </h2>
 
        {/* Grey line separator */}
        <div className="w-full h-px bg-gray-300 my-5" />
 
        {/* Progress bars */}
        <div className="flex justify-center gap-3 mb-8 px-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-1 h-1.5 rounded-full transition-opacity duration-300"
              style={{
                background: "linear-gradient(to right, #1A2980, #26D0CE)",
                opacity: i < Math.floor(progress * 4) ? 1 : 0.3,
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
                style={{ transition: "stroke-dashoffset 0.5s ease" }}
              />
            </svg>
 
            {/* Clock icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient
                    id="clockGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
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
                <path
                  d="M12 6V12L16 14"
                  stroke="url(#clockGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
 
          {/* Timer text */}
          <p className="text-lg font-bold text-gray-800">{timer} sec</p>
        </div>
      </div>
 
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
 
export default WaitingPopup;
 