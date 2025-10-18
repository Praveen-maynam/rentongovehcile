import React, { useState } from "react";
import Button from "./ui/Button";
import { X } from "lucide-react";
import { Vehicle } from "../types/Vehicle";

interface Props {
  vehicle?: Vehicle | null;
  onClose: () => void;
}

const ChatBox: React.FC<Props> = ({ vehicle, onClose }) => {
  const [text, setText] = useState("");
  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
      <div className="flex justify-between items-center bg-gradient-to-r from-primaryDark to-primaryLight text-white px-4 py-2 rounded-t-lg">
        <div>
          <div className="font-semibold text-sm">{vehicle ? vehicle.name : "Chat"}</div>
          <div className="text-xs opacity-80">Owner · Online</div>
        </div>
        <X size={18} className="cursor-pointer" onClick={onClose} />
      </div>

      <div className="p-3 h-44 overflow-y-auto text-gray-700">
        <div className="text-sm text-gray-500 mb-2">Hello! How can I help you?</div>
      </div>

      <div className="p-2 border-t flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="flex-1 border rounded-lg px-2 py-1 text-sm"
          placeholder="Type a message..."
        />
        <Button gradient onClick={() => { setText(""); }}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
