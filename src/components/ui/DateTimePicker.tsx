import React from "react";
 
interface DateTimePickerProps {
  value: string; // you are using string dates
  onChange: (newValue: string) => void;
  minDate?: string; // optional minimum date
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, onChange, minDate }) => {
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
 