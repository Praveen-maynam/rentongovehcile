import React from "react";

interface TimeSelectorProps {
  startTime: string;
  endTime: string;
  setStartTime: (val: string) => void;
  setEndTime: (val: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ startTime, endTime, setStartTime, setEndTime }) => (
  <div className="flex gap-2">
    <select className="text-sm border rounded px-2 py-1" value={startTime} onChange={e => setStartTime(e.target.value)}>
      {["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"].map(t => <option key={t} value={t}>{t}</option>)}
    </select>
    <span className="text-gray-400">-</span>
    <select className="text-sm border rounded px-2 py-1" value={endTime} onChange={e => setEndTime(e.target.value)}>
      {["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"].map(t => <option key={t} value={t}>{t}</option>)}
    </select>
  </div>
);

export default TimeSelector;
