// import React, { useState } from 'react';
// import { ArrowLeft, ChevronRight, Image } from 'lucide-react';

// function RaiseTicketPage() {
//   const [formData, setFormData] = useState({
//     issue: '',
//     vehicle: '',
//     description: '',
//     name: 'Charitha Sri',
//     mobile: '',
//     photos: []
//   });

//   const [showIssueDropdown, setShowIssueDropdown] = useState(false);
//   const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);

//   const issueOptions = [
//     'Booking issue',
//     'Payment issue',
//     'Vehicle issue',
//     'Driver issue',
//     'App issue',
//     'Other'
//   ];

//   const vehicleOptions = ['Car', 'Bike', 'Auto', 'Other'];

//   const handleBack = () => {
//     window.history.back();
//   };

//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData(prev => ({
//       ...prev,
//       photos: [...prev.photos, ...files]
//     }));
//   };

//   const handleSubmit = () => {
//     if (!formData.issue || !formData.description || !formData.name) {
//       alert('Please fill in all required fields');
//       return;
//     }
//     console.log('Ticket submitted:', formData);
//     alert('Ticket submitted successfully!');
//     window.history.back();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-400 to-blue-900 text-white px-6 py-6 shadow-lg">
//         <div className="max-w-4xl mx-auto flex items-center gap-4">
//           <button 
//             onClick={handleBack}
//             className="p-2 hover:bg-white/10 rounded-lg transition-colors"
//           >
//             <ArrowLeft size={24} />
//           </button>
//           <h1 className="text-2xl font-semibold">Raise Ticket</h1>
//         </div>
//       </div>

//       {/* Form Content */}
//       <div className="max-w-4xl mx-auto px-6 py-8">
//         <div className="space-y-6">
//           {/* Select Issue */}
//           <div>
//             <label className="block text-gray-900 font-semibold mb-2">
//               Select Issue <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <button
//                 onClick={() => setShowIssueDropdown(!showIssueDropdown)}
//                 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 flex items-center justify-between hover:border-gray-300 transition-colors"
//               >
//                 <span className={formData.issue ? 'text-gray-900' : 'text-gray-500'}>
//                   {formData.issue || 'Booking issue'}
//                 </span>
//                 <ChevronRight className="text-gray-400" size={20} />
//               </button>
              
//               {showIssueDropdown && (
//                 <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
//                   {issueOptions.map((option) => (
//                     <button
//                       key={option}
//                       onClick={() => {
//                         setFormData(prev => ({ ...prev, issue: option }));
//                         setShowIssueDropdown(false);
//                       }}
//                       className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Select Vehicle */}
//           <div>
//             <label className="block text-gray-900 font-semibold mb-2">
//               Select Vehicle (Optional)
//             </label>
//             <div className="relative">
//               <button
//                 onClick={() => setShowVehicleDropdown(!showVehicleDropdown)}
//                 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 flex items-center justify-between hover:border-gray-300 transition-colors"
//               >
//                 <span className={formData.vehicle ? 'text-gray-900' : 'text-gray-500'}>
//                   {formData.vehicle || 'Car'}
//                 </span>
//                 <ChevronRight className="text-gray-400" size={20} />
//               </button>
              
//               {showVehicleDropdown && (
//                 <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
//                   {vehicleOptions.map((option) => (
//                     <button
//                       key={option}
//                       onClick={() => {
//                         setFormData(prev => ({ ...prev, vehicle: option }));
//                         setShowVehicleDropdown(false);
//                       }}
//                       className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-gray-900 font-semibold mb-2">
//               Describe your issue in detail <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//               placeholder="Describe your issue here"
//               rows={6}
//               className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-400 resize-none"
//             />
//           </div>

//           {/* Contact Information */}
//           <div className="pt-4">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>

//             {/* Name */}
//             <div className="mb-6">
//               <label className="block text-gray-900 font-semibold mb-2">
//                 Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-400"
//               />
//             </div>

//             {/* Mobile Number */}
//             <div className="mb-6">
//               <label className="block text-gray-900 font-semibold mb-2">
//                 Mobile Number (Optional)
//               </label>
//               <input
//                 type="tel"
//                 value={formData.mobile}
//                 onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
//                 placeholder="Enter mobile number"
//                 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-400"
//               />
//             </div>

//             {/* Add Photos */}
//             <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
//               <label className="flex flex-col items-center justify-center cursor-pointer">
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handlePhotoUpload}
//                   className="hidden"
//                 />
//                 <Image size={48} className="text-gray-800 mb-3" strokeWidth={1.5} />
//                 <span className="text-gray-900 font-medium">Add Photos</span>
//               </label>
              
//               {formData.photos.length > 0 && (
//                 <div className="mt-4 text-center text-sm text-gray-600">
//                   {formData.photos.length} photo(s) selected
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-gradient-to-r from-blue-400 to-blue-900 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-shadow mt-8"
//           >
//             Submit Ticket
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RaiseTicketPage;








// import React, { useState } from 'react';
// import { ArrowLeft, ChevronRight, Image } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// function RaiseTicketPage() {
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     issue: '',
//     vehicle: '',
//     description: '',
//     name: 'Charitha Sri',
//     mobile: '',
//     photos: []
//   });


//   const [subject, setSubject] = useState("");
// const [description, setDescription] = useState("");

// const userId = localStorage.getItem("userId"); // or your actual method

//   const [showIssueDropdown, setShowIssueDropdown] = useState(false);
//   const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const issueOptions = [
//     'Booking issue',
//     'Payment issue',
//     'Vehicle issue',
//     'Driver issue',
//     'App issue',
//     'Other'
//   ];

//   const vehicleOptions = ['Car', 'Bike', 'Auto', 'Other'];

//   const handleBack = () => {
//     window.history.back();
//   };

//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData(prev => ({
//       ...prev,
//       photos: [...prev.photos, ...files]
//     }));
//   };

//   const handleCreateTicket = async () => {
//     // Validation
//     if (!formData.issue || !formData.description || !formData.name) {
//       setError('Please fill in all required fields');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // Get user data from localStorage or use default values
//       const userId = localStorage.getItem('userId') || '690c9fb0e524c979c76104c9';
//       const vehicleId = localStorage.getItem('vehicleId') || '690dcd0ce524c979c76122c7';
//       const bookingId = localStorage.getItem('bookingId') || '691448d706702f6b9f792c2b';
// const vehicleType=localStorage.getItem('vehicletype')||"Car";
//       // Create headers with Content-Type
//       const myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//       // Create URL-encoded form data
//       const urlencoded = new URLSearchParams();
//       urlencoded.append("userId", userId);
//       urlencoded.append("vehicleType", formData.vehicle || 'Car');
//       urlencoded.append("vehicleId", vehicleId);
//       urlencoded.append("bookingId", bookingId);
//       urlencoded.append("subject", formData.issue);
//       urlencoded.append("description", formData.description);

//      const requestOptions: RequestInit = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     userId:userId,
// vehicleType:vehicleType,
//     subject:"gfdx",
//     description:"ijgfcgh",
//     vehicleId:vehicleId,
//     bookingId:bookingId,
    
//   }),
// };

//       // Make the API call
//       const response = await fetch("http://3.110.122.127:3000/createTicket", requestOptions);
//       const result = await response.text();
      
//       // Log the full response
//       console.log('Ticket Creation Response:', result);
      
//       // Parse the response
//       const parsedResult = JSON.parse(result);
      
//       // Check if the ticket was created successfully
//       if (parsedResult.success || response.ok) {
//         alert('Ticket created successfully');
        
//         // Reset form
//         setFormData({
//           issue: '',
//           vehicle: '',
//           description: '',
//           name: 'Charitha Sri',
//           mobile: '',
//           photos: []
//         });
        
//         // Navigate back to support tickets page
//         navigate('/Support-Ticket');
//       } else {
//         throw new Error(parsedResult.message || 'Failed to create ticket');
//       }
//     } catch (err) {
//       console.error('Error creating ticket:', err);
//       setError('Failed to create ticket');
//       alert('Failed to create ticket');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-400 to-blue-900 text-white px-6 py-6 shadow-lg">
//         <div className="max-w-4xl mx-auto flex items-center gap-4">
//           <button 
//             onClick={handleBack}
//             className="p-2 hover:bg-white/10 rounded-lg transition-colors"
//           >
//             <ArrowLeft size={24} />
//           </button>
//           <h1 className="text-2xl font-semibold">Raise Ticket</h1>
//         </div>
//       </div>

//       {/* Form Content */}
//       <div className="max-w-4xl mx-auto px-6 py-8">
//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
//             <p className="text-red-600">{error}</p>
//           </div>
//         )}

//         <div className="space-y-6">
//           {/* Select Issue */}
//           <div>
//             <label className="block text-gray-900 font-semibold mb-2">
//               Select Issue <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <button
//                 onClick={() => setShowIssueDropdown(!showIssueDropdown)}
//                 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 flex items-center justify-between hover:border-gray-300 transition-colors"
//                 type="button"
//               >
//                 <span className={formData.issue ? 'text-gray-900' : 'text-gray-500'}>
//                   {formData.issue || 'Select an issue'}
//                 </span>
//                 <ChevronRight className="text-gray-400" size={20} />
//               </button>
              
//               {showIssueDropdown && (
//                 <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
//                   {issueOptions.map((option) => (
//                     <button
//                       key={option}
//                       onClick={() => {
//                         setFormData(prev => ({ ...prev, issue: option }));
//                         setShowIssueDropdown(false);
//                         setError(null);
//                       }}
//                       className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
//                       type="button"
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Select Vehicle */}
//           <div>
//             <label className="block text-gray-900 font-semibold mb-2">
//               Select Vehicle (Optional)
//             </label>
//             <div className="relative">
//               <button
//                 onClick={() => setShowVehicleDropdown(!showVehicleDropdown)}
//                 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 flex items-center justify-between hover:border-gray-300 transition-colors"
//                 type="button"
//               >
//                 <span className={formData.vehicle ? 'text-gray-900' : 'text-gray-500'}>
//                   {formData.vehicle || 'Car'}
//                 </span>
//                 <ChevronRight className="text-gray-400" size={20} />
//               </button>
              
//               {showVehicleDropdown && (
//                 <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
//                   {vehicleOptions.map((option) => (
//                     <button
//                       key={option}
//                       onClick={() => {
//                         setFormData(prev => ({ ...prev, vehicle: option }));
//                         setShowVehicleDropdown(false);
//                       }}
//                       className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
//                       type="button"
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-gray-900 font-semibold mb-2">
//               Describe your issue in detail <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => {
//                 setFormData(prev => ({ ...prev, description: e.target.value }));
//                 setError(null);
//               }}
//               placeholder="Describe your issue here"
//               rows={6}
//               className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-400 resize-none"
//             />
//           </div>

//           {/* Contact Information */}
//           <div className="pt-4">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>

//             {/* Name */}
//             <div className="mb-6">
//               <label className="block text-gray-900 font-semibold mb-2">
//                 Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => {
//                   setFormData(prev => ({ ...prev, name: e.target.value }));
//                   setError(null);
//                 }}
//                 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-400"
//               />
//             </div>

//             {/* Mobile Number */}
//             <div className="mb-6">
//               <label className="block text-gray-900 font-semibold mb-2">
//                 Mobile Number (Optional)
//               </label>
//               <input
//                 type="tel"
//                 value={formData.mobile}
//                 onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
//                 placeholder="Enter mobile number"
//                 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-400"
//               />
//             </div>

//             {/* Add Photos */}
//             <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
//               <label className="flex flex-col items-center justify-center cursor-pointer">
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handlePhotoUpload}
//                   className="hidden"
//                 />
//                 <Image size={48} className="text-gray-800 mb-3" strokeWidth={1.5} />
//                 <span className="text-gray-900 font-medium">Add Photos</span>
//               </label>
              
//               {formData.photos.length > 0 && (
//                 <div className="mt-4 text-center text-sm text-gray-600">
//                   {formData.photos.length} photo(s) selected
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleCreateTicket}
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-blue-400 to-blue-900 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-shadow mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Submitting...' : 'Submit Ticket'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RaiseTicketPage;




import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function RaiseTicketPage() {
  const navigate = useNavigate();
  
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
    // Validation
    if (!formData.issue || !formData.description || !formData.name) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get user data from localStorage with fallback defaults
      const userId = localStorage.getItem('userId') || '690c9fb0e524c979c76104c9';
      const vehicleId = localStorage.getItem('vehicleId') || '690dcd0ce524c979c76122c7';
      const bookingId = localStorage.getItem('bookingId') || '691448d706702f6b9f792c2b';
      const vehicleType = formData.vehicle || 'Car';

      console.log('📤 Creating Ticket with Data:', {
        userId,
        vehicleType,
        vehicleId,
        bookingId,
        subject: formData.issue,
        description: formData.description
      });

      // Create headers with Content-Type
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      // Create URL-encoded form data
      const urlencoded = new URLSearchParams();
      urlencoded.append("userId", userId);
      urlencoded.append("vehicleType", vehicleType);
      urlencoded.append("vehicleId", vehicleId);
      urlencoded.append("bookingId", bookingId);
      urlencoded.append("subject", formData.issue);
      urlencoded.append("description", formData.description);

      // Create request options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        
      };

      console.log('📡 Sending Request to API...');

      // Make the API call
      const response = await fetch("http://192.168.1.20:3000/createTicket", requestOptions);
      const result = await response.text();
      
      // Log the full response to console
      console.log('✅ API Response (Raw):', result);
      
      // Parse the response
      let parsedResult;
      try {
        parsedResult = JSON.parse(result);
        console.log('✅ API Response (Parsed JSON):', parsedResult);
      } catch (parseError) {
        console.error('❌ Failed to parse response as JSON:', parseError);
        parsedResult = { success: false, message: 'Invalid response format' };
      }
      
      // Check if the ticket was created successfully
      if (parsedResult.success || response.ok) {
        console.log('🎉 Ticket Created Successfully!');
        console.log('📋 Ticket Details:', {
          ticketId: parsedResult.ticket?._id || parsedResult._id,
          subject: formData.issue,
          description: formData.description,
          status: parsedResult.ticket?.status || 'Created'
        });

        alert('✅ Ticket created successfully!');
        
        // Reset form
        setFormData({
          issue: '',
          vehicle: '',
          description: '',
          name: 'Charitha Sri',
          mobile: '',
          photos: []
        });
        
        // Navigate back to support tickets page
        navigate('/Support-Ticket');
      } else {
        throw new Error(parsedResult.message || 'Failed to create ticket');
      }
    } catch (err) {
      console.error('❌ Error creating ticket:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack
      });
      setError('Failed to create ticket: ' + err.message);
      alert('❌ Failed to create ticket: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-900 text-white px-6 py-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-semibold">Raise Ticket</h1>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Select Issue */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Select Issue <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                onClick={() => setShowIssueDropdown(!showIssueDropdown)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 flex items-center justify-between hover:border-gray-300 transition-colors"
                type="button"
              >
                <span className={formData.issue ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.issue || 'Select an issue'}
                </span>
                <ChevronRight className="text-gray-400" size={20} />
              </button>
              
              {showIssueDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
                  {issueOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, issue: option }));
                        setShowIssueDropdown(false);
                        setError(null);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
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
            <label className="block text-gray-900 font-semibold mb-2">
              Select Vehicle (Optional)
            </label>
            <div className="relative">
              <button
                onClick={() => setShowVehicleDropdown(!showVehicleDropdown)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 flex items-center justify-between hover:border-gray-300 transition-colors"
                type="button"
              >
                <span className={formData.vehicle ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.vehicle || 'Car'}
                </span>
                <ChevronRight className="text-gray-400" size={20} />
              </button>
              
              {showVehicleDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
                  {vehicleOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, vehicle: option }));
                        setShowVehicleDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
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
            <label className="block text-gray-900 font-semibold mb-2">
              Describe your issue in detail <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, description: e.target.value }));
                setError(null);
              }}
              placeholder="Describe your issue here"
              rows={6}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-400 resize-none"
            />
          </div>

          {/* Contact Information */}
          <div className="pt-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>

            {/* Name */}
            <div className="mb-6">
              <label className="block text-gray-900 font-semibold mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, name: e.target.value }));
                  setError(null);
                }}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-400"
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-6">
              <label className="block text-gray-900 font-semibold mb-2">
                Mobile Number (Optional)
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                placeholder="Enter mobile number"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-400"
              />
            </div>

            {/* Add Photos */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
              <label className="flex flex-col items-center justify-center cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Image size={48} className="text-gray-800 mb-3" strokeWidth={1.5} />
                <span className="text-gray-900 font-medium">Add Photos</span>
              </label>
              
              {formData.photos.length > 0 && (
                <div className="mt-4 text-center text-sm text-gray-600">
                  {formData.photos.length} photo(s) selected
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleCreateTicket}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-400 to-blue-900 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-shadow mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RaiseTicketPage;