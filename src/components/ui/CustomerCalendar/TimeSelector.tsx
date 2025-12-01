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
      {["01:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"].map(t => <option key={t} value={t}>{t}</option>)}
    </select>
    <span className="text-gray-400">-</span>
    <select className="text-sm border rounded px-2 py-1" value={endTime} onChange={e => setEndTime(e.target.value)}>
      {["06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "23:00"].map(t => <option key={t} value={t}>{t}</option>)}
    </select>
  </div>
);

export default TimeSelector;
