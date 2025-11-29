import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Image } from 'lucide-react';

function RaiseTicketPage() {
  const [formData, setFormData] = useState({
    issue: '',
    vehicle: '',
    description: '',
    name: '',
    mobile: '',
    photos: []
  });

  const [showIssueDropdown, setShowIssueDropdown] = useState(false);
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const issueOptions = [
    'Booking issue',
    'Payment issue',
    'Vehicle issue',
    'Driver issue',
    'App issue',
    'Other'
  ];

  const vehicleOptions = ['Car', 'Bike', 'Auto', 'Other'];

  const handleBack = () => {
    window.history.back();
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const handleCreateTicket = async () => {
    if (!formData.issue || !formData.description || !formData.name) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem('userId') || '690c9fb0e524c979c76104c9';
      const vehicleId = localStorage.getItem('vehicleId') || '690dcd0ce524c979c76122c7';
      const bookingId = localStorage.getItem('bookingId') || '691448d706702f6b9f792c2b';
      const vehicleType = formData.vehicle || 'Car';

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("userId", userId);
      urlencoded.append("vehicleType", vehicleType);
      urlencoded.append("vehicleId", vehicleId);
      urlencoded.append("bookingId", bookingId);
      urlencoded.append("subject", formData.issue);
      urlencoded.append("description", formData.description);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };

      const response = await fetch("http://192.168.1.20:3000/createTicket", requestOptions);
      const result = await response.text();
      
      let parsedResult;
      try {
        parsedResult = JSON.parse(result);
      } catch (parseError) {
        parsedResult = { success: false, message: 'Invalid response format' };
      }
      
      if (parsedResult.success || response.ok) {
        alert('✅ Ticket created successfully!');
        
        setFormData({
          issue: '',
          vehicle: '',
          description: '',
          name: '',
          mobile: '',
          photos: []
        });
      } else {
        throw new Error(parsedResult.message || 'Failed to create ticket');
      }
    } catch (err) {
      setError('Failed to create ticket: ' + err.message);
      alert('❌ Failed to create ticket: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] text-white px-6 py-4 shadow-lg flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-semibold">Raise Ticket</h1>
        </div>
      </div>

      {/* Form Content - No Scroll */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-6 h-full">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-6 h-full">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Select Issue */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm">
                  Select Issue <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowIssueDropdown(!showIssueDropdown)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between hover:border-gray-400 transition-colors text-sm"
                    type="button"
                  >
                    <span className={formData.issue ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.issue || 'Select an issue'}
                    </span>
                    <ChevronRight className="text-gray-400" size={18} />
                  </button>
                  
                  {showIssueDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {issueOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, issue: option }));
                            setShowIssueDropdown(false);
                            setError(null);
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                          type="button"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Select Vehicle */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm">
                  Select Vehicle
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowVehicleDropdown(!showVehicleDropdown)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between hover:border-gray-400 transition-colors text-sm"
                    type="button"
                  >
                    <span className={formData.vehicle ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.vehicle || 'Car'}
                    </span>
                    <ChevronRight className="text-gray-400" size={18} />
                  </button>
                  
                  {showVehicleDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                      {vehicleOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, vehicle: option }));
                            setShowVehicleDropdown(false);
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                          type="button"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm">
                  Describe your issue <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, description: e.target.value }));
                    setError(null);
                  }}
                  placeholder="Describe your issue here"
                  rows={4}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 resize-none text-sm"
                />
              </div>

              {/* Add Photos */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <label className="flex flex-col items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Image size={36} className="text-gray-600 mb-2" strokeWidth={1.5} />
                  <span className="text-gray-700 font-medium text-sm">Add Photos</span>
                </label>
                
                {formData.photos.length > 0 && (
                  <div className="mt-2 text-center text-xs text-gray-600">
                    {formData.photos.length} photo(s) selected
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>

              {/* Name */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, name: e.target.value }));
                    setError(null);
                  }}
                  placeholder="Enter your name"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 text-sm"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                  placeholder="Enter mobile number"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 text-sm"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  onClick={handleCreateTicket}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#0A0747] to-[#4EC8FF] 
                             text-white py-3.5 rounded-lg font-semibold text-base
                             hover:shadow-lg transition-shadow
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit Ticket'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RaiseTicketPage;