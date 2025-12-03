// components/BikeDetails/EditForm.tsx
import React from "react";
import { VehicleDetails } from "hooks/useBikeDetails"; // reuse types from hook file

interface Props {
  editOpen: boolean;
  setEditOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  editVehicle: VehicleDetails;
  preview: string | null;
  additionalImages: File[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBikeImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAdditionalImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeAdditionalImage: (idx: number) => void;
  handleSave: () => Promise<void>;
  handleDelete: () => Promise<void>;
  isLoading: boolean;
}

const EditForm: React.FC<Props> = ({
  editOpen,
  setEditOpen,
  editVehicle,
  preview,
  additionalImages,
  handleChange,
  handleBikeImageChange,
  handleAdditionalImagesChange,
  removeAdditionalImage,
  handleSave,
  handleDelete,
  isLoading,
}) => {
  return (
    <>
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-2xl font-semibold">Edit Bike Details</h2>

        <button
          onClick={() => setEditOpen((s: boolean) => !s)}
          type="button"
          aria-label={editOpen ? "Hide form" : "Show form"}
          className="w-auto px-3 h-8 flex items-center justify-center rounded-full text-white text-sm font-medium transition-colors bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] shadow-md hover:opacity-90"
        >
          {editOpen ? "Hide" : "Show"}
        </button>
      </div>

      {editOpen && (
        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Bike Name </label>
            <input name="name" value={editVehicle.name} onChange={handleChange} placeholder="e.g., Royal Enfield Classic 350" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Bike Model</label>
            <input name="BikeModel" value={editVehicle.BikeModel} onChange={handleChange} placeholder="e.g., BS6" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea name="description" value={editVehicle.description} onChange={handleChange} placeholder="Describe your bike..." className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Price per KM </label>
            <input type="number" name="price" value={editVehicle.price} onChange={handleChange} placeholder="10" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" min="1" required />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Contact Name</label>
            <input name="contactName" value={editVehicle.contactName} onChange={handleChange} placeholder="John Doe" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
            <input name="contactNumber" value={editVehicle.contactNumber} onChange={handleChange} placeholder="9876543210" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">City</label>
            <input name="city" value={editVehicle.city} onChange={handleChange} placeholder="Hyderabad" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Street/Area</label>
            <input name="street" value={editVehicle.street} onChange={handleChange} placeholder="Banjara Hills" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Pincode</label>
            <input name="pincode" value={editVehicle.pincode} onChange={handleChange} placeholder="500034" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">State</label>
            <input name="state" value={editVehicle.state} onChange={handleChange} placeholder="Telangana" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Country</label>
            <input name="country" value={editVehicle.country} onChange={handleChange} placeholder="India" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Required Documents</p>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="requireDrivingLicense" checked={!!editVehicle.requireDrivingLicense} onChange={handleChange} className="rounded" />
              <span className="text-sm text-gray-700">Require Driving License</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="requireAadharCard" checked={!!editVehicle.requireAadharCard} onChange={handleChange} className="rounded" />
              <span className="text-sm text-gray-700">Require Aadhar Card</span>
            </label>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Deposit Amount (₹)</label>
            <input type="number" name="depositMoney" value={editVehicle.depositMoney} onChange={handleChange} placeholder="3000" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" min="0" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Main Bike Image</label>
            <div className="w-full h-[180px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center relative bg-gray-50 hover:bg-gray-100 transition">
              {preview ? <img src={preview} alt="Bike Preview" className="w-full h-full object-cover rounded-md" /> : (
                <div className="text-center">
                  <p className="text-gray-500">📷 Click to upload bike photo</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              )}
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleBikeImageChange} />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Additional Images (Max 4)
              {additionalImages.length > 0 && (
                <span className="text-xs text-gray-500 ml-2">({additionalImages.length}/4)</span>
              )}
            </label>
            <div className="w-full border-2 border-dashed border-gray-300 rounded-md p-4 bg-gray-50">
              <input type="file" accept="image/*" multiple className="w-full" onChange={handleAdditionalImagesChange} disabled={additionalImages.length >= 4} />
              {additionalImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {additionalImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img src={URL.createObjectURL(img)} alt={`Additional ${idx + 1}`} className="w-full h-20 object-cover rounded" />
                      <button onClick={() => removeAdditionalImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition" type="button">×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} disabled={isLoading} className="flex-1 bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] text-white py-3 rounded-[8px] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-[14px]" type="button">
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={handleDelete} disabled={isLoading} className="px-6 bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] text-white py-3 rounded-[8px] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-[14px]" type="button">
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditForm;
