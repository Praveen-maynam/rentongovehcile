import React from "react";
 
interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}
 
const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  className = ""
}) => {
  const formatDateForInput = (date: Date) => {
    return date.toISOString().slice(0, 16); // Format: "YYYY-MM-DDThh:mm"
  };
 
  return (
    <input
      type="datetime-local"
      value={formatDateForInput(value)}
      onChange={(e) => onChange(new Date(e.target.value))}
      min={minDate ? formatDateForInput(minDate) : undefined}
      max={maxDate ? formatDateForInput(maxDate) : undefined}
      className={`w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    />
  );
};
 
export default DateTimePicker;
 