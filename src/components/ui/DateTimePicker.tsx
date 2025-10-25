import React from "react";
 
interface DateTimePickerProps {
  value: string; // you are using string dates
  onChange: (newValue: string) => void;
  minDate?: string; // optional minimum date
}
<<<<<<< HEAD
 
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
 
=======

const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, onChange, minDate }) => {
>>>>>>> 4aeffab8e1a0bddc7d50843caf921abcb758f1ec
  return (
    <div className="flex gap-4 mb-6">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={minDate}
        className="border rounded px-3 py-2"
      />
    </div>
  );
};
 
export default DateTimePicker;
 