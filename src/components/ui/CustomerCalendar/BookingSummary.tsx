import React from "react";

interface BookingSummaryProps {
  selectedStart: Date | null;
  selectedEnd: Date | null;
  totalHours: number;
  totalPrice: number;
  formatDisplay: (date: Date | null) => string;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ selectedStart, selectedEnd, totalHours, totalPrice, formatDisplay }) => (
  <div>
    <p className="text-sm text-gray-500">Selected:</p>
    <p className="font-semibold">{formatDisplay(selectedStart)} → {formatDisplay(selectedEnd)}</p>
    {selectedStart && selectedEnd && (
      <>
        <p className="text-xs text-gray-500">Hours: {totalHours}</p>
        <p className="text-blue-600 font-bold">Total: ₹{totalPrice}</p>
      </>
    )}
  </div>
);

export default BookingSummary;
