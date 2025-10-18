import React from "react";
import Modal from "../../components/ui/modal"; // wrapper component
// any icons you use
import ProfileOption from "../../features/profile/components/profileOption";
import {Wine,Zap} from "lucide-react";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: "car" | "auto") => void;
}

const selectvehiclemodal: React.FC<Props> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Select Vehicle</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">×</button>
        </div>

        <div className="space-y-4">
          <div
            className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect("car")}
          >
            <div className="bg-gradient-to-r from-indigo-500 to-blue-400 text-white p-3 rounded mr-4">
              <ProfileOption icon={Wine} label="car"/>
            </div>
            <span className="text-lg font-medium">Car</span>
            <span className="ml-auto text-gray-400">›</span>
          </div>

          <div
            className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect("auto")}
          >
            <div className="bg-gradient-to-r from-indigo-500 to-blue-400 text-white p-3 rounded mr-4">
              <ProfileOption icon={Zap} label="auto"/>
            </div>
            <span className="text-lg font-medium">Auto</span>
            <span className="ml-auto text-gray-400">›</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default selectvehiclemodal;
