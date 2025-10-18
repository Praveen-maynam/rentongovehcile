import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  gradient?: boolean;
  variant?: "white" | "default";
  icon?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  gradient = false,
  variant = "default",
  icon,
  className = "",
}) => {
  const base =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all";

  const styles =
    gradient
      ? "bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white hover:opacity-90"
      : variant === "white"
      ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>
      {icon}
      {children}
    </button>
  );
};

export default Button;
