import React, { useState } from "react";

const DateTimePicker: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="flex gap-4 mb-6">
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border rounded px-3 py-2" />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border rounded px-3 py-2" />
    
    </div>
  );
};

export default DateTimePicker;
