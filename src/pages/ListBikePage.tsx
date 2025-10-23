import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListedBikesStore } from "../store/listedBikes.store";

const ListBikePage: React.FC = () => {
  const navigate = useNavigate();
  const { addBike } = useListedBikesStore(); // ✅ Correct function
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    vehicleName: "",
    farePrice: "",
    transmission: "Manual",
    fuel: "Petrol",
    description: "",
    photos: [] as File[],
    drivingLicense: false,
    aadharCard: false,
    depositVehicle: false,
    depositMoney: "0",
  });

  // ✅ Updated to handle input, textarea, select, and checkbox
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let val: any = value;

    if (type === "checkbox") {
      val = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, photos: filesArray }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vehicleName || !formData.farePrice) {
      alert("Please fill in all required fields");
      return;
    }

    const photoUrls = formData.photos.map((file) =>
      URL.createObjectURL(file)
    );

    addBike({
      vehicleName: formData.vehicleName,
      farePrice: formData.farePrice,
      transmission: formData.transmission,
      fuel: formData.fuel,
      description: formData.description,
      photos: photoUrls,
      drivingLicense: formData.drivingLicense,
      aadharCard: formData.aadharCard,
      depositVehicle: formData.depositVehicle,
      depositMoney: formData.depositMoney,
    });

    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/bike");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            List your Bike
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bike Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bike Name
              </label>
              <input
                type="text"
                name="vehicleName"
                value={formData.vehicleName}
                onChange={handleInputChange}
                placeholder="Royal Enfield Classic"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Fare Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fare Price
              </label>
              <input
                type="number"
                name="farePrice"
                value={formData.farePrice}
                onChange={handleInputChange}
                placeholder="250"
                min={0}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Transmission & Fuel */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transmission
                </label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel
                </label>
                <select
                  name="fuel"
                  value={formData.fuel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Bike description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* Photos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Photos
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="mb-2"
              />
              {formData.photos.length > 0 && (
                <p className="text-sm text-green-600">
                  {formData.photos.length} photo(s) selected
                </p>
              )}
            </div>

            {/* Documents & Deposit */}
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="drivingLicense"
                  checked={formData.drivingLicense}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Driving License Provided
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="aadharCard"
                  checked={formData.aadharCard}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Aadhar Card Provided
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="depositVehicle"
                  checked={formData.depositVehicle}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Vehicle Deposit Available
              </label>
              {formData.depositVehicle && (
                <input
                  type="text"
                  name="depositMoney"
                  value={formData.depositMoney}
                  onChange={handleInputChange}
                  placeholder="Deposit Amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg"
            >
              Post Now
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-auto text-center animate-scale-in">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Posted Successfully
            </h2>
            <p className="text-gray-600 mb-6">
              Your listed bikes will be visible to all users
            </p>
            <button
              onClick={handleModalClose}
              className="w-full bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-md"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListBikePage;
