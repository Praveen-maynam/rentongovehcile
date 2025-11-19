

// // import React, { useState, useEffect } from "react";
// // import { X, Calendar, ChevronLeft, ChevronRight, Edit, Trash2, MoreVertical, RefreshCw } from "lucide-react";
// // import { notAvailabilityAPI } from "../services/api.service";

// // interface AvailabilityDateTimeModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   userId: string;
// //   VechileId: string;
// //   vehicleType: "Car" | "Bike" | "Auto";
// //   startDate?: string;
// //   endDate?: string;
// // }

// // const AvailabilityDateTimeModal: React.FC<AvailabilityDateTimeModalProps> = ({
// //   isOpen,
// //   onClose,
// //   userId,
// //   VechileId,
// //   vehicleType,
// //   startDate: propStartDate,
// //   endDate: propEndDate,
// // }) => {
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");
// //   const [fromTime, setFromTime] = useState("09:00");
// //   const [toTime, setToTime] = useState("18:00");
// //   const [availability, setAvailability] = useState("notAvailable");
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState("");
// //   const [currentMonth, setCurrentMonth] = useState(new Date());
// //   const [existingSlots, setExistingSlots] = useState([]);
// //   const [showDropdown, setShowDropdown] = useState(null);
// //   const [editingSlot, setEditingSlot] = useState(null);

// //   useEffect(() => {
// //     if (isOpen) {
// //       loadSlotsForCurrentMonth();
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [isOpen, currentMonth, VechileId, vehicleType]);

// //   const loadSlotsForCurrentMonth = async () => {
// //     try {
// //       setLoading(true);

// //       const year = currentMonth.getFullYear();
// //       const month = currentMonth.getMonth();
      
// //       const startDate = propStartDate || new Date(year, month, 1).toISOString().split("T")[0];
// //       const endDate = propEndDate || new Date(year, month + 1, 0).toISOString().split("T")[0];

// //       console.log("📡 Loading slots for month:", { startDate, endDate });

// //       const slots = await notAvailabilityAPI.getVehicleAvailability(
// //         VechileId,
// //         vehicleType as "Car" | "Bike" | "Auto",
// //         startDate,
// //         endDate
// //       );

// //       console.log("✅ Loaded slots:", slots);
      
// //     if (slots && slots.length > 0) {
// //   console.log("🔍 First slot structure:", {
// //     _id: slots[0]._id,
// //     id: getSlotId(slots[0]), // safer
// //     allKeys: Object.keys(slots[0])
// //   });
// // }

      
// //       setExistingSlots(slots || []);
      
// //     } catch (error) {
// //       console.error("❌ Error loading slots:", error);
// //       setMessage("⚠️ Could not load existing slots");
// //       setExistingSlots([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRefresh = () => {
// //     setMessage("🔄 Refreshing...");
// //     loadSlotsForCurrentMonth();
// //     setTimeout(() => setMessage(""), 2000);
// //   };

// //   const getDaysInMonth = (date) => {
// //     const year = date.getFullYear();
// //     const month = date.getMonth();
// //     const firstDay = new Date(year, month, 1);
// //     const lastDay = new Date(year, month + 1, 0);
// //     const daysInMonth = lastDay.getDate();
// //     const startingDayOfWeek = firstDay.getDay();

// //     const days = [];
// //     for (let i = 0; i < startingDayOfWeek; i++) {
// //       days.push(null);
// //     }
// //     for (let i = 1; i <= daysInMonth; i++) {
// //       days.push(i);
// //     }
// //     return days;
// //   };

// //   const formatMonthYear = (date) => {
// //     return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
// //   };

// //   const handlePrevMonth = () => {
// //     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
// //   };

// //   const handleNextMonth = () => {
// //     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
// //   };

// //   const handleDateClick = (day) => {
// //     const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
// //     const formattedDate = selectedDate.toISOString().split("T")[0];

// //     if (!fromDate || (fromDate && toDate)) {
// //       setFromDate(formattedDate);
// //       setToDate("");
// //     } else {
// //       if (new Date(formattedDate) >= new Date(fromDate)) {
// //         setToDate(formattedDate);
// //       } else {
// //         setFromDate(formattedDate);
// //         setToDate("");
// //       }
// //     }
// //   };

// //   const isDateInRange = (day) => {
// //     if (!fromDate || !day) return false;
// //     const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
// //     const from = new Date(fromDate);
// //     const to = toDate ? new Date(toDate) : null;
// //     if (to) {
// //       return date >= from && date <= to;
// //     }
// //     return date.toISOString().split("T")[0] === fromDate;
// //   };

// //   const isDateBlocked = (day) => {
// //     if (!day) return false;
// //     const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
// //     date.setHours(0, 0, 0, 0);
    
// //     return existingSlots.some((slot) => {
// //       if (!slot.isNotAvailable) return false;
      
// //       const fromDate = new Date(slot.fromDate.split('T')[0]);
// //       fromDate.setHours(0, 0, 0, 0);
      
// //       const toDate = new Date(slot.toDate.split('T')[0]);
// //       toDate.setHours(0, 0, 0, 0);
      
// //       return date >= fromDate && date <= toDate;
// //     });
// //   };

// //   const isPastDate = (day) => {
// //     if (!day) return false;
// //     const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0);
// //     return date < today;
// //   };
// // const getSlotId = (slot) => {
// //   if (!slot) return null;
// //   return slot._id || slot.id || slot.notAvailabilityId || null;
// // };


// //   const handleSave = async () => {
// //   if (!userId || !VechileId || !fromDate || !toDate) {
// //     setMessage("⚠️ Please select both start and end dates");
// //     return;
// //   }

// //   setLoading(true);
// //   setMessage("");

// //   const payload = {
// //     userId,
// //     VechileId,
// //     vechileType: vehicleType,
// //     fromDate,
// //     toDate,
// //     fromTime: fromTime.padStart(5, "0"), // ensures "09:00" format
// //     toTime: toTime.padStart(5, "0"),
// //     isNotAvailable: availability === "notAvailable",
// //   };

// //   try {
// //     console.log("💾 Saving payload:", payload);
// //     const response = await notAvailabilityAPI.createNotAvailability(payload);
// //     console.log("✅ Save response:", response);

// //     setMessage("✅ Dates blocked successfully!");
// //     await loadSlotsForCurrentMonth();

// //     // Reset form
// //     setFromDate("");
// //     setToDate("");
// //     setFromTime("09:00");
// //     setToTime("18:00");
// //     setAvailability("notAvailable");
// //     setTimeout(() => setMessage(""), 3000);
// //   } catch (error: any) {
// //     console.error("❌ Create Error:", error);
// //     const errorMsg = error?.response?.data?.message || error?.message || "Failed to create slot";
// //     setMessage(`❌ ${errorMsg}`);
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// // const handleUpdate = async () => {
// //   const slotId = getSlotId(editingSlot); // make sure this is the database _id

// //   if (!slotId || !fromDate || !toDate) {
// //     setMessage("⚠️ Please select both start and end dates");
// //     return;
// //   }

// //   setLoading(true);
// //   setMessage("🔄 Updating slot...");

// //   const payload = {
// //     fromDate,
// //     toDate,
// //     fromTime: fromTime.padStart(5, "0"),
// //     toTime: toTime.padStart(5, "0"),
// //     isNotAvailable: availability === "notAvailable",
// //   };

// //   try {
// //   console.log("Slot ID being sent to API:", getSlotId(editingSlot));


// //     console.log("🔄 Update payload:", payload);

// //     const response = await notAvailabilityAPI.updateNotAvailability(slotId, payload);
// //     console.log("✅ Update response:", response);

// //     setMessage("✅ Slot updated successfully!");
// //     await loadSlotsForCurrentMonth();

// //     // Reset form
// //     setEditingSlot(null);
// //     setFromDate("");
// //     setToDate("");
// //     setFromTime("09:00");
// //     setToTime("18:00");
// //     setAvailability("notAvailable");

// //     setTimeout(() => setMessage(""), 3000);
// //   } catch (error: any) {
// //     console.error("❌ Update Error:", error);
// //     const errorMsg = error?.response?.data?.message || error?.message || "Failed to update slot";
// //     setMessage(`❌ Update failed: ${errorMsg}`);
// //     setTimeout(() => setMessage(""), 5000);
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// //   const handleEdit = (slot) => {
// //   console.log("✏️ Editing slot:", slot);
// //   setEditingSlot(`${fromDate}-${toDate}`);
// //   // <- Must be the original object with _id
// //   setFromDate(slot.fromDate.split('T')[0]);
// //   setToDate(slot.toDate.split('T')[0]);
// //   setFromTime(slot.fromTime || "09:00");
// //   setToTime(slot.toTime || "18:00");
// //   setAvailability(slot.isNotAvailable ? "notAvailable" : "available");
// //   setShowDropdown(null);
// // };

// //   const handleDelete = async (slot) => {
// //     const slotId = getSlotId(slot);
    
// //     console.log("🔍 Attempting to delete slot:", {
// //       slot: slot,
// //       extractedId: slotId,
// //       idType: typeof slotId
// //     });
    
// //     if (!slotId) {
// //       setMessage("❌ Cannot delete: Invalid slot ID");
// //       console.error("❌ No valid ID found in slot:", slot);
// //       return;
// //     }
    
// //     if (!window.confirm(`🗑️ Are you sure you want to delete this slot?\n\nDate Range: ${new Date(slot.fromDate).toLocaleDateString()} - ${new Date(slot.toDate).toLocaleDateString()}\n\nThis action cannot be undone.`)) {
// //       return;
// //     }

// //     setLoading(true);
// //     setMessage("🗑️ Deleting slot...");
// //     setShowDropdown(null);

// //     try {
// //       console.log("🗑️ Calling delete API with ID:", slotId);
      
// //       const response = await notAvailabilityAPI.deleteNotAvailability(slotId);
// //       console.log("✅ Delete successful:", response);
      
// //       setMessage("✅ Slot deleted successfully!");
      
// //       if (getSlotId(editingSlot) === slotId) {
// //         setEditingSlot(null);
// //         setFromDate("");
// //         setToDate("");
// //         setFromTime("09:00");
// //         setToTime("18:00");
// //         setAvailability("notAvailable");
// //       }
      
// //       await loadSlotsForCurrentMonth();
      
// //       setTimeout(() => setMessage(""), 3000);
// //     } catch (error) {
// //       console.error("❌ Delete Error:", {
// //         error: error,
// //         message: error?.message,
// //         response: error?.response?.data,
// //         status: error?.response?.status,
// //         slotId: slotId
// //       });
      
// //       const errorMsg = error?.response?.data?.message || error?.message || "Failed to delete slot";
// //       setMessage(`❌ Delete failed: ${errorMsg}`);
      
// //       setTimeout(() => setMessage(""), 5000);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCancelEdit = () => {
// //     setEditingSlot(null);
// //     setFromDate("");
// //     setToDate("");
// //     setFromTime("09:00");
// //     setToTime("18:00");
// //     setAvailability("notAvailable");
// //   };

// //   const generateTimeOptions = () => {
// //     const options = [];
// //     for (let h = 0; h < 24; h++) {
// //       for (let m = 0; m < 60; m += 30) {
// //         const hour = h.toString().padStart(2, "0");
// //         const minute = m.toString().padStart(2, "0");
// //         const time = `${hour}:${minute}`;
// //         const period = h >= 12 ? "PM" : "AM";
// //         const displayHour = h % 12 || 12;
// //         options.push({ value: time, label: `${displayHour}:${minute} ${period}` });
// //       }
// //     }
// //     return options;
// //   };

// //   const days = getDaysInMonth(currentMonth);
// //   const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// //   const timeOptions = generateTimeOptions();

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
// //       <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-hidden flex flex-col">
// //         <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex justify-between items-center flex-shrink-0">
// //           <h2 className="text-xl font-semibold text-white flex items-center gap-2">
// //             <Calendar size={24} />
// //             {editingSlot ? "Edit Unavailability Slot" : "Manage Vehicle Availability"}
// //           </h2>
// //           <div className="flex items-center gap-2">
// //             <button 
// //               onClick={handleRefresh}
// //               disabled={loading}
// //               className="p-2 rounded-full hover:bg-white/20 transition text-white disabled:opacity-50"
// //               title="Refresh slots"
// //             >
// //               <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
// //             </button>
// //             <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition text-white">
// //               <X size={20} />
// //             </button>
// //           </div>
// //         </div>

// //         <div className="p-6 overflow-y-auto flex-1">
// //           {existingSlots.length > 0 && (
// //             <div className="mb-6 bg-gray-50 rounded-lg p-4">
// //               <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
// //                 📅 Existing Unavailability Slots ({existingSlots.length})
// //               </h3>
// //               <div className="space-y-2 max-h-48 overflow-y-auto">
// //                 {existingSlots.map((slot, index) => {
// //                   const slotId = getSlotId(slot);
// //                   return (
// //                     <div
// //                       key={slotId || index}
// //                       className={`flex items-center justify-between p-3 bg-white rounded-lg border-2 ${
// //                         getSlotId(editingSlot) === slotId ? "border-blue-500" : "border-gray-200"
// //                       }`}
// //                     >
// //                       <div className="flex-1">
// //                         <div className="flex items-center gap-2 text-sm">
// //                           <span className="font-medium text-gray-700">
// //                             {new Date(slot.fromDate).toLocaleDateString()} - {new Date(slot.toDate).toLocaleDateString()}
// //                           </span>
// //                           <span className="text-gray-500">({slot.fromTime} - {slot.toTime})</span>
// //                           {slot.isNotAvailable && (
// //                             <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-medium">Blocked</span>
// //                           )}
// //                         </div>
// //                         {slotId && (
// //                           <div className="text-xs text-gray-400 mt-1 font-mono">ID: {slotId}</div>
// //                         )}
// //                       </div>
// //                       <div className="relative">
// //                         <button
// //                           onClick={(e) => {
// //                             e.stopPropagation();
// //                             setShowDropdown(showDropdown === slotId ? null : slotId);
// //                           }}
// //                           disabled={loading}
// //                           className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
// //                           title="More options"
// //                         >
// //                           <MoreVertical size={16} />
// //                         </button>
// //                         {showDropdown === slotId && (
// //                           <>
// //                             <div 
// //                               className="fixed inset-0 z-10" 
// //                               onClick={() => setShowDropdown(null)}
// //                             />
// //                             <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[140px]">
// //                               <button
// //                                 onClick={() => handleEdit(slot)}
// //                                 disabled={loading}
// //                                 className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 flex items-center gap-2 text-blue-600 transition disabled:opacity-50 rounded-t-lg"
// //                               >
// //                                 <Edit size={14} />
// //                                 Edit Slot
// //                               </button>
// //                               <div className="border-t border-gray-100" />
// //                               <button
// //                                 onClick={() => handleDelete(slot)}
// //                                 disabled={loading}
// //                                 className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-2 text-red-600 transition disabled:opacity-50 rounded-b-lg"
// //                               >
// //                                 <Trash2 size={14} />
// //                                 Delete Slot
// //                               </button>
// //                             </div>
// //                           </>
// //                         )}
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </div>
// //           )}

// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //             <div className="lg:col-span-2">
// //               <div className="border rounded-lg p-4">
// //                 <div className="bg-gray-50 rounded-lg p-4">
// //                   <div className="flex items-center justify-between mb-4">
// //                     <button 
// //                       onClick={handlePrevMonth} 
// //                       disabled={loading}
// //                       className="p-2 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
// //                     >
// //                       <ChevronLeft size={20} />
// //                     </button>
// //                     <h3 className="font-semibold text-lg">{formatMonthYear(currentMonth)}</h3>
// //                     <button 
// //                       onClick={handleNextMonth} 
// //                       disabled={loading}
// //                       className="p-2 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
// //                     >
// //                       <ChevronRight size={20} />
// //                     </button>
// //                   </div>

// //                   {loading && (
// //                     <div className="text-center py-4 text-gray-500">
// //                       <RefreshCw size={24} className="animate-spin mx-auto mb-2" />
// //                       Loading slots...
// //                     </div>
// //                   )}

// //                   <div className="grid grid-cols-7 gap-1 mb-2">
// //                     {weekDays.map((day) => (
// //                       <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">{day}</div>
// //                     ))}
// //                   </div>

// //                   <div className="grid grid-cols-7 gap-1">
// //                     {days.map((day, index) => {
// //                       const inRange = isDateInRange(day);
// //                       const past = isPastDate(day);
// //                       const existingBlock = isDateBlocked(day);

// //                       return (
// //                         <button
// //                           key={index}
// //                           onClick={() => day && !past && !existingBlock && handleDateClick(day)}
// //                           disabled={!day || past || existingBlock}
// //                           className={`
// //                             aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 relative
// //                             ${!day ? "invisible" : ""}
// //                             ${past ? "text-gray-300 cursor-not-allowed bg-gray-100" : ""}
// //                             ${existingBlock ? "bg-white border-2 border-gray-300 cursor-not-allowed" : ""}
// //                             ${inRange && !existingBlock && availability === "notAvailable" ? "bg-orange-500 text-white shadow-md" : ""}
// //                             ${inRange && !existingBlock && availability === "available" ? "bg-blue-500 text-white hover:bg-blue-600 shadow-md" : ""}
// //                             ${!inRange && !past && !existingBlock && day ? "hover:bg-gray-200 hover:scale-110 border border-gray-200" : ""}
// //                           `}
// //                         >
// //                           <span className={!existingBlock ? "" : "text-gray-400"}>
// //                             {day}
// //                           </span>
// //                           {existingBlock && (
// //                             <svg
// //                               className="absolute inset-0 w-full h-full pointer-events-none"
// //                               viewBox="0 0 40 40"
// //                               xmlns="http://www.w3.org/2000/svg"
// //                             >
// //                               <line
// //                                 x1="8"
// //                                 y1="8"
// //                                 x2="32"
// //                                 y2="32"
// //                                 stroke="#dc2626"
// //                                 strokeWidth="3"
// //                                 strokeLinecap="round"
// //                               />
// //                               <line
// //                                 x1="32"
// //                                 y1="8"
// //                                 x2="8"
// //                                 y2="32"
// //                                 stroke="#dc2626"
// //                                 strokeWidth="3"
// //                                 strokeLinecap="round"
// //                               />
// //                             </svg>
// //                           )}
// //                         </button>
// //                       );
// //                     })}
// //                   </div>
// //                 </div>

// //                 <div className="mt-4 space-y-2 text-xs">
// //                   <div className="flex items-center gap-2">
// //                     <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded flex items-center justify-center relative">
// //                       <span className="text-[10px] text-gray-400 font-medium">15</span>
// //                       <svg className="absolute inset-0 w-full h-full" viewBox="0 0 32 32">
// //                         <line x1="6" y1="6" x2="26" y2="26" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
// //                         <line x1="26" y1="6" x2="6" y2="26" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
// //                       </svg>
// //                     </div>
// //                     <span className="text-gray-600 font-medium">Already blocked dates (red X mark)</span>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <div className="w-8 h-8 bg-orange-500 rounded shadow-sm flex items-center justify-center">
// //                       <span className="text-white text-xs font-medium">15</span>
// //                     </div>
// //                     <span className="text-gray-600 font-medium">Currently selecting to block</span>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <div className="w-8 h-8 bg-blue-500 rounded shadow-sm flex items-center justify-center">
// //                       <span className="text-white text-xs font-medium">15</span>
// //                     </div>
// //                     <span className="text-gray-600 font-medium">Available period selection</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="space-y-4">
// //               <div>
// //                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
// //                   🕐 Start Time
// //                 </label>
// //                 <select
// //                   value={fromTime}
// //                   onChange={(e) => setFromTime(e.target.value)}
// //                   className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white hover:border-blue-400 transition focus:outline-none focus:border-blue-500"
// //                 >
// //                   {timeOptions.map((option) => (
// //                     <option key={option.value} value={option.value}>{option.label}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
// //                   🕐 End Time
// //                 </label>
// //                 <select
// //                   value={toTime}
// //                   onChange={(e) => setToTime(e.target.value)}
// //                   className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white hover:border-blue-400 transition focus:outline-none focus:border-blue-500"
// //                 >
// //                   {timeOptions.map((option) => (
// //                     <option key={option.value} value={option.value}>{option.label}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="text-sm font-medium text-gray-700 mb-2 block">Availability Status</label>
// //                 <select
// //                   value={availability}
// //                   onChange={(e) => setAvailability(e.target.value)}
// //                   className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white hover:border-blue-400 transition focus:outline-none focus:border-blue-500"
// //                 >
// //                   <option value="available">✅ Available</option>
// //                   <option value="notAvailable">🚫 Not Available (Block)</option>
// //                 </select>
// //               </div>

// //               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
// //                 <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">📊 Summary</h4>
// //                 <div className="space-y-2 text-sm">
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Vehicle:</span>
// //                     <span className="font-medium">{vehicleType}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Total Blocked:</span>
// //                     <span className="font-medium text-red-600">
// //                       {existingSlots.filter((s) => s.isNotAvailable).length}
// //                     </span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Status:</span>
// //                     <span className={`font-medium ${availability === "notAvailable" ? "text-red-600" : "text-green-600"}`}>
// //                       {availability === "notAvailable" ? "🚫 Blocking" : "✅ Available"}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="space-y-3">
// //                 {editingSlot ? (
// //                   <>
// //                     <button
// //                       onClick={handleUpdate}
// //                       disabled={loading || !fromDate || !toDate}
// //                       className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
// //                     >
// //                       {loading ? "⏳ Updating..." : "✅ Update Slot"}
// //                     </button>
// //                     <button
// //                       onClick={handleCancelEdit}
// //                       disabled={loading}
// //                       className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
// //                     >
// //                       Cancel Edit
// //                     </button>
// //                   </>
// //                 ) : (
// //                   <button
// //                     onClick={handleSave}
// //                     disabled={loading || !fromDate || !toDate}
// //                     className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
// //                   >
// //                     {loading ? "⏳ Saving..." : "💾 Save New Slot"}
// //                   </button>
// //                 )}

// //                 <button
// //                   onClick={onClose}
// //                   disabled={loading}
// //                   className="w-full bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition disabled:opacity-50"
// //                 >
// //                   Close
// //                 </button>
// //               </div>

// //               {message && (
// //                 <div className={`text-sm text-center p-3 rounded-lg ${
// //                   message.includes("✅") || message.includes("🔄") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
// //                 }`}>
// //                   {message}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AvailabilityDateTimeModal;



// // // // // import React, { useState, useEffect } from "react";
// // // // // import { X, Calendar, ChevronLeft, ChevronRight, Edit, Trash2, MoreVertical, RefreshCw } from "lucide-react";
// // // // // import { notAvailabilityAPI } from "../services/api.service";
// // // // // interface AvailabilityDateTimeModalProps {
// // // // //   isOpen: boolean;
// // // // //   onClose: () => void;
// // // // //   userId: string;
// // // // //   VechileId: string;
// // // // //   vehicleType: "Car" | "Bike" | "Auto";
// // // // //   startDate?: string;
// // // // //   endDate?: string;
// // // // //   onSubmit?: (dateTime: {
// // // // //     startDate: string;
// // // // //     endDate: string;
// // // // //     startTime: string;
// // // // //     endTime: string;
// // // // //   }) => void; // <--- ADD THIS
// // // // // }


// // // // // const AvailabilityDateTimeModal: React.FC<AvailabilityDateTimeModalProps> = ({
// // // // //   isOpen,
// // // // //   onClose,
// // // // //   userId,
// // // // //   VechileId,
// // // // //   vehicleType,
// // // // //   startDate: propStartDate,
// // // // //   endDate: propEndDate,
// // // // // }) => {
// // // // //   const [fromDate, setFromDate] = useState("");
// // // // //   const [toDate, setToDate] = useState("");
// // // // //   const [fromTime, setFromTime] = useState("09:00");
// // // // //   const [toTime, setToTime] = useState("18:00");
// // // // //   const [availability, setAvailability] = useState("notAvailable");
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [message, setMessage] = useState("");
// // // // //   const [currentMonth, setCurrentMonth] = useState(new Date());
// // // // //   const [existingSlots, setExistingSlots] = useState([]);
// // // // //   const [showDropdown, setShowDropdown] = useState(null);
// // // // //   const [editingSlot, setEditingSlot] = useState(null);

// // // // //   useEffect(() => {
// // // // //     if (isOpen) {
// // // // //       loadSlotsForCurrentMonth();
// // // // //     }
// // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // //   }, [isOpen, currentMonth, VechileId, vehicleType]);

// // // // //   const loadSlotsForCurrentMonth = async () => {
// // // // //     try {
// // // // //       setLoading(true);

// // // // //       const year = currentMonth.getFullYear();
// // // // //       const month = currentMonth.getMonth();
      
// // // // //       const startDate = propStartDate || new Date(year, month, 1).toISOString().split("T")[0];
// // // // //       const endDate = propEndDate || new Date(year, month + 1, 0).toISOString().split("T")[0];

// // // // //       console.log("📡 Loading slots for month:", { startDate, endDate });

// // // // //       const slots = await notAvailabilityAPI.getVehicleAvailability(
// // // // //         VechileId,
// // // // //         vehicleType as "Car" | "Bike" | "Auto",
// // // // //         startDate,
// // // // //         endDate
// // // // //       );

// // // // //       console.log("✅ Loaded slots:", slots);
      
// // // // //     if (slots && slots.length > 0) {
// // // // //   console.log("🔍 First slot structure:", {
// // // // //     _id: slots[0]._id,
// // // // //     id: getSlotId(slots[0]), // safer
// // // // //     allKeys: Object.keys(slots[0])
// // // // //   });
// // // // // }

      
// // // // //       setExistingSlots(slots || []);
      
// // // // //     } catch (error) {
// // // // //       console.error("❌ Error loading slots:", error);
// // // // //       setMessage("⚠️ Could not load existing slots");
// // // // //       setExistingSlots([]);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleRefresh = () => {
// // // // //     setMessage("🔄 Refreshing...");
// // // // //     loadSlotsForCurrentMonth();
// // // // //     setTimeout(() => setMessage(""), 2000);
// // // // //   };

// // // // //   const getDaysInMonth = (date) => {
// // // // //     const year = date.getFullYear();
// // // // //     const month = date.getMonth();
// // // // //     const firstDay = new Date(year, month, 1);
// // // // //     const lastDay = new Date(year, month + 1, 0);
// // // // //     const daysInMonth = lastDay.getDate();
// // // // //     const startingDayOfWeek = firstDay.getDay();

// // // // //     const days = [];
// // // // //     for (let i = 0; i < startingDayOfWeek; i++) {
// // // // //       days.push(null);
// // // // //     }
// // // // //     for (let i = 1; i <= daysInMonth; i++) {
// // // // //       days.push(i);
// // // // //     }
// // // // //     return days;
// // // // //   };

// // // // //   const formatMonthYear = (date) => {
// // // // //     return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
// // // // //   };

// // // // //   const handlePrevMonth = () => {
// // // // //     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
// // // // //   };

// // // // //   const handleNextMonth = () => {
// // // // //     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
// // // // //   };

// // // // //   const handleDateClick = (day) => {
// // // // //     const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
// // // // //     const formattedDate = selectedDate.toISOString().split("T")[0];

// // // // //     if (!fromDate || (fromDate && toDate)) {
// // // // //       setFromDate(formattedDate);
// // // // //       setToDate("");
// // // // //     } else {
// // // // //       if (new Date(formattedDate) >= new Date(fromDate)) {
// // // // //         setToDate(formattedDate);
// // // // //       } else {
// // // // //         setFromDate(formattedDate);
// // // // //         setToDate("");
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const isDateInRange = (day) => {
// // // // //     if (!fromDate || !day) return false;
// // // // //     const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
// // // // //     const from = new Date(fromDate);
// // // // //     const to = toDate ? new Date(toDate) : null;
// // // // //     if (to) {
// // // // //       return date >= from && date <= to;
// // // // //     }
// // // // //     return date.toISOString().split("T")[0] === fromDate;
// // // // //   };

// // // // //   const isDateBlocked = (day) => {
// // // // //     if (!day) return false;
// // // // //     const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
// // // // //     date.setHours(0, 0, 0, 0);
    
// // // // //     return existingSlots.some((slot) => {
// // // // //       if (!slot.isNotAvailable) return false;
      
// // // // //       const fromDate = new Date(slot.fromDate.split('T')[0]);
// // // // //       fromDate.setHours(0, 0, 0, 0);
      
// // // // //       const toDate = new Date(slot.toDate.split('T')[0]);
// // // // //       toDate.setHours(0, 0, 0, 0);
      
// // // // //       return date >= fromDate && date <= toDate;
// // // // //     });
// // // // //   };

// // // // //   const isPastDate = (day) => {
// // // // //     if (!day) return false;
// // // // //     const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
// // // // //     const today = new Date();
// // // // //     today.setHours(0, 0, 0, 0);
// // // // //     return date < today;
// // // // //   };
// // // // // const getSlotId = (slot) => {
// // // // //   if (!slot) return null;
// // // // //   return slot._id || slot.id || slot.notAvailabilityId || null;
// // // // // };


// // // // //   const handleSave = async () => {
// // // // //   if (!userId || !VechileId || !fromDate || !toDate) {
// // // // //     setMessage("⚠️ Please select both start and end dates");
// // // // //     return;
// // // // //   }

// // // // //   setLoading(true);
// // // // //   setMessage("");

// // // // //   const payload = {
// // // // //     userId,
// // // // //     VechileId,
// // // // //     vechileType: vehicleType,
// // // // //     fromDate,
// // // // //     toDate,
// // // // //     fromTime: fromTime.padStart(5, "0"), // ensures "09:00" format
// // // // //     toTime: toTime.padStart(5, "0"),
// // // // //     isNotAvailable: availability === "notAvailable",
// // // // //   };

// // // // //   try {
// // // // //     console.log("💾 Saving payload:", payload);
// // // // //     const response = await notAvailabilityAPI.createNotAvailability(payload);
// // // // //     console.log("✅ Save response:", response);

// // // // //     setMessage("✅ Dates blocked successfully!");
// // // // //     await loadSlotsForCurrentMonth();

// // // // //     // Reset form
// // // // //     setFromDate("");
// // // // //     setToDate("");
// // // // //     setFromTime("09:00");
// // // // //     setToTime("18:00");
// // // // //     setAvailability("notAvailable");
// // // // //     setTimeout(() => setMessage(""), 3000);
// // // // //   } catch (error: any) {
// // // // //     console.error("❌ Create Error:", error);
// // // // //     const errorMsg = error?.response?.data?.message || error?.message || "Failed to create slot";
// // // // //     setMessage(`❌ ${errorMsg}`);
// // // // //   } finally {
// // // // //     setLoading(false);
// // // // //   }
// // // // // };

// // // // // const handleUpdate = async () => {
// // // // //   const slotId = getSlotId(editingSlot); // make sure this is the database _id

// // // // //   if (!slotId || !fromDate || !toDate) {
// // // // //     setMessage("⚠️ Please select both start and end dates");
// // // // //     return;
// // // // //   }

// // // // //   setLoading(true);
// // // // //   setMessage("🔄 Updating slot...");

// // // // //   const payload = {
// // // // //     fromDate,
// // // // //     toDate,
// // // // //     fromTime: fromTime.padStart(5, "0"),
// // // // //     toTime: toTime.padStart(5, "0"),
// // // // //     isNotAvailable: availability === "notAvailable",
// // // // //   };

// // // // //   try {
// // // // //   console.log("Slot ID being sent to API:", getSlotId(editingSlot));


// // // // //     console.log("🔄 Update payload:", payload);

// // // // //     const response = await notAvailabilityAPI.updateNotAvailability(slotId, payload);
// // // // //     console.log("✅ Update response:", response);

// // // // //     setMessage("✅ Slot updated successfully!");
// // // // //     await loadSlotsForCurrentMonth();

// // // // //     // Reset form
// // // // //     setEditingSlot(null);
// // // // //     setFromDate("");
// // // // //     setToDate("");
// // // // //     setFromTime("09:00");
// // // // //     setToTime("18:00");
// // // // //     setAvailability("notAvailable");

// // // // //     setTimeout(() => setMessage(""), 3000);
// // // // //   } catch (error: any) {
// // // // //     console.error("❌ Update Error:", error);
// // // // //     const errorMsg = error?.response?.data?.message || error?.message || "Failed to update slot";
// // // // //     setMessage(`❌ Update failed: ${errorMsg}`);
// // // // //     setTimeout(() => setMessage(""), 5000);
// // // // //   } finally {
// // // // //     setLoading(false);
// // // // //   }
// // // // // };


// // // // //   const handleEdit = (slot) => {
// // // // //   console.log("✏️ Editing slot:", slot);
// // // // //   setEditingSlot(`${fromDate}-${toDate}`);
// // // // //   // <- Must be the original object with _id
// // // // //   setFromDate(slot.fromDate.split('T')[0]);
// // // // //   setToDate(slot.toDate.split('T')[0]);
// // // // //   setFromTime(slot.fromTime || "09:00");
// // // // //   setToTime(slot.toTime || "18:00");
// // // // //   setAvailability(slot.isNotAvailable ? "notAvailable" : "available");
// // // // //   setShowDropdown(null);
// // // // // };

// // // // //   const handleDelete = async (slot) => {
// // // // //     const slotId = getSlotId(slot);
    
// // // // //     console.log("🔍 Attempting to delete slot:", {
// // // // //       slot: slot,
// // // // //       extractedId: slotId,
// // // // //       idType: typeof slotId
// // // // //     });
    
// // // // //     if (!slotId) {
// // // // //       setMessage("❌ Cannot delete: Invalid slot ID");
// // // // //       console.error("❌ No valid ID found in slot:", slot);
// // // // //       return;
// // // // //     }
    
// // // // //     if (!window.confirm(`🗑️ Are you sure you want to delete this slot?\n\nDate Range: ${new Date(slot.fromDate).toLocaleDateString()} - ${new Date(slot.toDate).toLocaleDateString()}\n\nThis action cannot be undone.`)) {
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     setMessage("🗑️ Deleting slot...");
// // // // //     setShowDropdown(null);

// // // // //     try {
// // // // //       console.log("🗑️ Calling delete API with ID:", slotId);
      
// // // // //       const response = await notAvailabilityAPI.deleteNotAvailability(slotId);
// // // // //       console.log("✅ Delete successful:", response);
      
// // // // //       setMessage("✅ Slot deleted successfully!");
      
// // // // //       if (getSlotId(editingSlot) === slotId) {
// // // // //         setEditingSlot(null);
// // // // //         setFromDate("");
// // // // //         setToDate("");
// // // // //         setFromTime("09:00");
// // // // //         setToTime("18:00");
// // // // //         setAvailability("notAvailable");
// // // // //       }
      
// // // // //       await loadSlotsForCurrentMonth();
      
// // // // //       setTimeout(() => setMessage(""), 3000);
// // // // //     } catch (error) {
// // // // //       console.error("❌ Delete Error:", {
// // // // //         error: error,
// // // // //         message: error?.message,
// // // // //         response: error?.response?.data,
// // // // //         status: error?.response?.status,
// // // // //         slotId: slotId
// // // // //       });
      
// // // // //       const errorMsg = error?.response?.data?.message || error?.message || "Failed to delete slot";
// // // // //       setMessage(`❌ Delete failed: ${errorMsg}`);
      
// // // // //       setTimeout(() => setMessage(""), 5000);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleCancelEdit = () => {
// // // // //     setEditingSlot(null);
// // // // //     setFromDate("");
// // // // //     setToDate("");
// // // // //     setFromTime("09:00");
// // // // //     setToTime("18:00");
// // // // //     setAvailability("notAvailable");
// // // // //   };

// // // // //   const generateTimeOptions = () => {
// // // // //     const options = [];
// // // // //     for (let h = 0; h < 24; h++) {
// // // // //       for (let m = 0; m < 60; m += 30) {
// // // // //         const hour = h.toString().padStart(2, "0");
// // // // //         const minute = m.toString().padStart(2, "0");
// // // // //         const time = `${hour}:${minute}`;
// // // // //         const period = h >= 12 ? "PM" : "AM";
// // // // //         const displayHour = h % 12 || 12;
// // // // //         options.push({ value: time, label: `${displayHour}:${minute} ${period}` });
// // // // //       }
// // // // //     }
// // // // //     return options;
// // // // //   };

// // // // //   const days = getDaysInMonth(currentMonth);
// // // // //   const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// // // // //   const timeOptions = generateTimeOptions();

// // // // //   if (!isOpen) return null;

// // // // //   return (
// // // // //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
// // // // //       <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-hidden flex flex-col">
// // // // //         <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex justify-between items-center flex-shrink-0">
// // // // //           <h2 className="text-xl font-semibold text-white flex items-center gap-2">
// // // // //             <Calendar size={24} />
// // // // //             {editingSlot ? "Edit Unavailability Slot" : "Manage Vehicle Availability"}
// // // // //           </h2>
// // // // //           <div className="flex items-center gap-2">
// // // // //             <button 
// // // // //               onClick={handleRefresh}
// // // // //               disabled={loading}
// // // // //               className="p-2 rounded-full hover:bg-white/20 transition text-white disabled:opacity-50"
// // // // //               title="Refresh slots"
// // // // //             >
// // // // //               <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
// // // // //             </button>
// // // // //             <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition text-white">
// // // // //               <X size={20} />
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="p-6 overflow-y-auto flex-1">
// // // // //           {existingSlots.length > 0 && (
// // // // //             <div className="mb-6 bg-gray-50 rounded-lg p-4">
// // // // //               <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
// // // // //                 📅 Existing Unavailability Slots ({existingSlots.length})
// // // // //               </h3>
// // // // //               <div className="space-y-2 max-h-48 overflow-y-auto">
// // // // //                 {existingSlots.map((slot, index) => {
// // // // //                   const slotId = getSlotId(slot);
// // // // //                   return (
// // // // //                     <div
// // // // //                       key={slotId || index}
// // // // //                       className={`flex items-center justify-between p-3 bg-white rounded-lg border-2 ${
// // // // //                         getSlotId(editingSlot) === slotId ? "border-blue-500" : "border-gray-200"
// // // // //                       }`}
// // // // //                     >
// // // // //                       <div className="flex-1">
// // // // //                         <div className="flex items-center gap-2 text-sm">
// // // // //                           <span className="font-medium text-gray-700">
// // // // //                             {new Date(slot.fromDate).toLocaleDateString()} - {new Date(slot.toDate).toLocaleDateString()}
// // // // //                           </span>
// // // // //                           <span className="text-gray-500">({slot.fromTime} - {slot.toTime})</span>
// // // // //                           {slot.isNotAvailable && (
// // // // //                             <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-medium">Blocked</span>
// // // // //                           )}
// // // // //                         </div>
// // // // //                         {slotId && (
// // // // //                           <div className="text-xs text-gray-400 mt-1 font-mono">ID: {slotId}</div>
// // // // //                         )}
// // // // //                       </div>
// // // // //                       <div className="relative">
// // // // //                         <button
// // // // //                           onClick={(e) => {
// // // // //                             e.stopPropagation();
// // // // //                             setShowDropdown(showDropdown === slotId ? null : slotId);
// // // // //                           }}
// // // // //                           disabled={loading}
// // // // //                           className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
// // // // //                           title="More options"
// // // // //                         >
// // // // //                           <MoreVertical size={16} />
// // // // //                         </button>
// // // // //                         {showDropdown === slotId && (
// // // // //                           <>
// // // // //                             <div 
// // // // //                               className="fixed inset-0 z-10" 
// // // // //                               onClick={() => setShowDropdown(null)}
// // // // //                             />
// // // // //                             <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[140px]">
// // // // //                               <button
// // // // //                                 onClick={() => handleEdit(slot)}
// // // // //                                 disabled={loading}
// // // // //                                 className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 flex items-center gap-2 text-blue-600 transition disabled:opacity-50 rounded-t-lg"
// // // // //                               >
// // // // //                                 <Edit size={14} />
// // // // //                                 Edit Slot
// // // // //                               </button>
// // // // //                               <div className="border-t border-gray-100" />
// // // // //                               <button
// // // // //                                 onClick={() => handleDelete(slot)}
// // // // //                                 disabled={loading}
// // // // //                                 className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-2 text-red-600 transition disabled:opacity-50 rounded-b-lg"
// // // // //                               >
// // // // //                                 <Trash2 size={14} />
// // // // //                                 Delete Slot
// // // // //                               </button>
// // // // //                             </div>
// // // // //                           </>
// // // // //                         )}
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   );
// // // // //                 })}
// // // // //               </div>
// // // // //             </div>
// // // // //           )}

// // // // //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // // // //             <div className="lg:col-span-2">
// // // // //               <div className="border rounded-lg p-4">
// // // // //                 <div className="bg-gray-50 rounded-lg p-4">
// // // // //                   <div className="flex items-center justify-between mb-4">
// // // // //                     <button 
// // // // //                       onClick={handlePrevMonth} 
// // // // //                       disabled={loading}
// // // // //                       className="p-2 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
// // // // //                     >
// // // // //                       <ChevronLeft size={20} />
// // // // //                     </button>
// // // // //                     <h3 className="font-semibold text-lg">{formatMonthYear(currentMonth)}</h3>
// // // // //                     <button 
// // // // //                       onClick={handleNextMonth} 
// // // // //                       disabled={loading}
// // // // //                       className="p-2 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
// // // // //                     >
// // // // //                       <ChevronRight size={20} />
// // // // //                     </button>
// // // // //                   </div>

// // // // //                   {loading && (
// // // // //                     <div className="text-center py-4 text-gray-500">
// // // // //                       <RefreshCw size={24} className="animate-spin mx-auto mb-2" />
// // // // //                       Loading slots...
// // // // //                     </div>
// // // // //                   )}

// // // // //                   <div className="grid grid-cols-7 gap-1 mb-2">
// // // // //                     {weekDays.map((day) => (
// // // // //                       <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">{day}</div>
// // // // //                     ))}
// // // // //                   </div>
// // // // // <div className="grid grid-cols-7 gap-1">
// // // // //                     {days.map((day, index) => {
// // // // //                       const inRange = isDateInRange(day);
// // // // //                       const past = isPastDate(day);
// // // // //                       const existingBlock = isDateBlocked(day);

// // // // //                       return (
// // // // //                         <button
// // // // //                           key={index}
// // // // //                           onClick={() => day && !past && handleDateClick(day)}
// // // // //                           disabled={!day || past}
// // // // //                           className={`
// // // // //                             aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 relative
// // // // //                             ${!day ? "invisible" : ""}
// // // // //                             ${past ? "text-gray-300 cursor-not-allowed bg-gray-100" : ""}
// // // // //                             ${existingBlock ? "bg-red-50 border-2 border-red-300" : ""}
// // // // //                             ${inRange && !existingBlock && availability === "notAvailable" ? "bg-orange-400 text-white shadow-md" : ""}
// // // // //                             ${inRange && !existingBlock && availability === "available" ? "bg-blue-500 text-white hover:bg-blue-600 shadow-md" : ""}
// // // // //                             ${!inRange && !past && !existingBlock && day ? "hover:bg-gray-200 hover:scale-110 border border-gray-200 bg-white" : ""}
// // // // //                           `}
// // // // //                         >
// // // // //                           <span className={existingBlock ? "text-gray-800 font-bold relative z-10" : ""}>
// // // // //                             {day}
// // // // //                           </span>
// // // // //                           {/* Red X strikethrough ONLY for saved blocked dates from API */}
// // // // //                           {existingBlock && (
// // // // //                             <>
// // // // //                               <svg
// // // // //                                 className="absolute inset-0 w-full h-full pointer-events-none z-20"
// // // // //                                 viewBox="0 0 40 40"
// // // // //                                 xmlns="http://www.w3.org/2000/svg"
// // // // //                               >
// // // // //                                 <line
// // // // //                                   x1="4"
// // // // //                                   y1="4"
// // // // //                                   x2="36"
// // // // //                                   y2="36"
// // // // //                                   stroke="#dc2626"
// // // // //                                   strokeWidth="3"
// // // // //                                   strokeLinecap="round"
// // // // //                                 />
// // // // //                                 <line
// // // // //                                   x1="36"
// // // // //                                   y1="4"
// // // // //                                   x2="4"
// // // // //                                   y2="36"
// // // // //                                   stroke="#dc2626"
// // // // //                                   strokeWidth="3"
// // // // //                                   strokeLinecap="round"
// // // // //                                 />
// // // // //                               </svg>
// // // // //                               {/* Visual indicator badge */}
// // // // //                               <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white z-30"></div>
// // // // //                             </>
// // // // //                           )}
// // // // //                         </button>
// // // // //                       );
// // // // //                     })}
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="mt-4 space-y-2 text-xs">
// // // // //                   <div className="flex items-center gap-2">
// // // // //                     <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded flex items-center justify-center relative">
// // // // //                       <span className="text-[10px] text-gray-400 font-medium">15</span>
// // // // //                       <svg className="absolute inset-0 w-full h-full" viewBox="0 0 32 32">
// // // // //                         <line x1="6" y1="6" x2="26" y2="26" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
// // // // //                         <line x1="26" y1="6" x2="6" y2="26" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
// // // // //                       </svg>
// // // // //                     </div>
// // // // //                     <span className="text-gray-600 font-medium">Already blocked dates (red X mark)</span>
// // // // //                   </div>
// // // // //                   <div className="flex items-center gap-2">
// // // // //                     <div className="w-8 h-8 bg-orange-500 rounded shadow-sm flex items-center justify-center">
// // // // //                       <span className="text-white text-xs font-medium">15</span>
// // // // //                     </div>
// // // // //                     <span className="text-gray-600 font-medium">Currently selecting to block</span>
// // // // //                   </div>
// // // // //                   <div className="flex items-center gap-2">
// // // // //                     <div className="w-8 h-8 bg-blue-500 rounded shadow-sm flex items-center justify-center">
// // // // //                       <span className="text-white text-xs font-medium">15</span>
// // // // //                     </div>
// // // // //                     <span className="text-gray-600 font-medium">Available period selection</span>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="space-y-4">
// // // // //               <div>
// // // // //                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
// // // // //                   🕐 Start Time
// // // // //                 </label>
// // // // //                 <select
// // // // //                   value={fromTime}
// // // // //                   onChange={(e) => setFromTime(e.target.value)}
// // // // //                   className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white hover:border-blue-400 transition focus:outline-none focus:border-blue-500"
// // // // //                 >
// // // // //                   {timeOptions.map((option) => (
// // // // //                     <option key={option.value} value={option.value}>{option.label}</option>
// // // // //                   ))}
// // // // //                 </select>
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
// // // // //                   🕐 End Time
// // // // //                 </label>
// // // // //                 <select
// // // // //                   value={toTime}
// // // // //                   onChange={(e) => setToTime(e.target.value)}
// // // // //                   className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white hover:border-blue-400 transition focus:outline-none focus:border-blue-500"
// // // // //                 >
// // // // //                   {timeOptions.map((option) => (
// // // // //                     <option key={option.value} value={option.value}>{option.label}</option>
// // // // //                   ))}
// // // // //                 </select>
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="text-sm font-medium text-gray-700 mb-2 block">Availability Status</label>
// // // // //                 <select
// // // // //                   value={availability}
// // // // //                   onChange={(e) => setAvailability(e.target.value)}
// // // // //                   className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white hover:border-blue-400 transition focus:outline-none focus:border-blue-500"
// // // // //                 >
// // // // //                   <option value="available">✅ Available</option>
// // // // //                   <option value="notAvailable">🚫 Not Available (Block)</option>
// // // // //                 </select>
// // // // //               </div>

// // // // //               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
// // // // //                 <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">📊 Summary</h4>
// // // // //                 <div className="space-y-2 text-sm">
// // // // //                   <div className="flex justify-between">
// // // // //                     <span className="text-gray-600">Vehicle:</span>
// // // // //                     <span className="font-medium">{vehicleType}</span>
// // // // //                   </div>
// // // // //                   <div className="flex justify-between">
// // // // //                     <span className="text-gray-600">Total Blocked:</span>
// // // // //                     <span className="font-medium text-red-600">
// // // // //                       {existingSlots.filter((s) => s.isNotAvailable).length}
// // // // //                     </span>
// // // // //                   </div>
// // // // //                   <div className="flex justify-between">
// // // // //                     <span className="text-gray-600">Status:</span>
// // // // //                     <span className={`font-medium ${availability === "notAvailable" ? "text-red-600" : "text-green-600"}`}>
// // // // //                       {availability === "notAvailable" ? "🚫 Blocking" : "✅ Available"}
// // // // //                     </span>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="space-y-3">
// // // // //                 {editingSlot ? (
// // // // //                   <>
// // // // //                     <button
// // // // //                       onClick={handleUpdate}
// // // // //                       disabled={loading || !fromDate || !toDate}
// // // // //                       className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
// // // // //                     >
// // // // //                       {loading ? "⏳ Updating..." : "✅ Update Slot"}
// // // // //                     </button>
// // // // //                     <button
// // // // //                       onClick={handleCancelEdit}
// // // // //                       disabled={loading}
// // // // //                       className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
// // // // //                     >
// // // // //                       Cancel Edit
// // // // //                     </button>
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   <button
// // // // //                     onClick={handleSave}
// // // // //                     disabled={loading || !fromDate || !toDate}
// // // // //                     className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
// // // // //                   >
// // // // //                     {loading ? "⏳ Saving..." : "💾 Save New Slot"}
// // // // //                   </button>
// // // // //                 )}

// // // // //                 <button
// // // // //                   onClick={onClose}
// // // // //                   disabled={loading}
// // // // //                   className="w-full bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition disabled:opacity-50"
// // // // //                 >
// // // // //                   Close
// // // // //                 </button>
// // // // //               </div>

// // // // //               {message && (
// // // // //                 <div className={`text-sm text-center p-3 rounded-lg ${
// // // // //                   message.includes("✅") || message.includes("🔄") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
// // // // //                 }`}>
// // // // //                   {message}
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default AvailabilityDateTimeModal;











// // // import React, { useState, useEffect } from 'react';
// // // import { Calendar, Car, Clock, X, Check, ChevronLeft, ChevronRight, AlertCircle, Loader, Trash2, Edit3, Save } from 'lucide-react';

// // // const AvailabilityDateTimeModal = () => {
// // //   const [view, setView] = useState('owner'); // 'owner', 'customer-booking', 'customer-history'
// // //   const [currentDate, setCurrentDate] = useState(new Date());
// // //   const [selectedDates, setSelectedDates] = useState([]);
// // //   const [availabilityStatus, setAvailabilityStatus] = useState('available');
// // //   const [blockedDates, setBlockedDates] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [message, setMessage] = useState(null);
// // //   const [timeRange, setTimeRange] = useState({ from: '09:00', to: '18:00' });
// // //   const [editingBlock, setEditingBlock] = useState(null);

// // //   // API Configuration
// // //   const API_BASE = 'http://3.110.122.127:3000';
// // //   const VEHICLE_ID = '68fe26f96f13375a65dc587d';
// // //   const VEHICLE_TYPE = 'Car';
// // //   const USER_ID = '68f32259cea8a9fa88029262';

// // //   useEffect(() => {
// // //     fetchAvailability();
// // //   }, [currentDate]);

// // //   const fetchAvailability = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
// // //       const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
// // //       const startDate = firstDay.toISOString().split('T')[0];
// // //       const endDate = lastDay.toISOString().split('T')[0];

// // //       const url = `${API_BASE}/getVehicleAvailability?VechileId=${VEHICLE_ID}&vechileType=${VEHICLE_TYPE}&startDate=${startDate}&endDate=${endDate}`;
      
// // //       console.log('📡 Fetching availability:', url);
      
// // //       const response = await fetch(url, {
// // //         method: 'GET',
// // //         headers: { 'Content-Type': 'application/json' }
// // //       });

// // //       const result = await response.json();
// // //       console.log('✅ API Response:', result);

// // //       if (result.success || result.data) {
// // //         const availability = result.data || result.availability || [];
// // //         const blocked = availability
// // //           .filter(item => item.isNotAvailable === true || item.isNotAvailable === 'true')
// // //           .map(item => ({
// // //             id: item._id,
// // //             fromDate: item.fromDate,
// // //             toDate: item.toDate,
// // //             fromTime: item.fromTime,
// // //             toTime: item.toTime,
// // //             isNotAvailable: item.isNotAvailable
// // //           }));
        
// // //         console.log('🚫 Blocked dates:', blocked);
// // //         setBlockedDates(blocked);
// // //         showMessage('Availability loaded successfully', 'success');
// // //       } else {
// // //         console.warn('⚠️ No availability data found');
// // //         setBlockedDates([]);
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ Fetch error:', error);
// // //       showMessage('Failed to load availability', 'error');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const createOrUpdateAvailability = async () => {
// // //     if (selectedDates.length === 0) {
// // //       showMessage('Please select at least one date', 'error');
// // //       return;
// // //     }

// // //     try {
// // //       setLoading(true);
// // //       const sortedDates = [...selectedDates].sort((a, b) => a - b);
// // //       const fromDate = sortedDates[0].toISOString().split('T')[0];
// // //       const toDate = sortedDates[sortedDates.length - 1].toISOString().split('T')[0];

// // //       const formData = new URLSearchParams();
// // //       formData.append('vechileType', VEHICLE_TYPE);
// // //       formData.append('VechileId', VEHICLE_ID);
// // //       formData.append('fromDate', fromDate);
// // //       formData.append('toDate', toDate);
// // //       formData.append('fromTime', timeRange.from);
// // //       formData.append('toTime', timeRange.to);
// // //       formData.append('isNotAvailable', availabilityStatus === 'blocked' ? 'true' : 'false');

// // //       let url, method;
      
// // //       if (editingBlock) {
// // //         // Update existing
// // //         url = `${API_BASE}/updateNotAvailability/${editingBlock.id}`;
// // //         method = 'PUT';
// // //         console.log('🔄 Updating availability:', editingBlock.id);
// // //       } else {
// // //         // Create new
// // //         url = `${API_BASE}/createNotAvailability`;
// // //         method = 'POST';
// // //         formData.append('userId', USER_ID);
// // //         console.log('➕ Creating new availability');
// // //       }

// // //       console.log('📤 Request:', { url, method, data: Object.fromEntries(formData) });

// // //       const response = await fetch(url, {
// // //         method: method,
// // //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
// // //         body: formData
// // //       });

// // //       const result = await response.json();
// // //       console.log('✅ Response:', result);

// // //       if (result.success) {
// // //         showMessage(editingBlock ? 'Updated successfully!' : 'Saved successfully!', 'success');
// // //         setSelectedDates([]);
// // //         setEditingBlock(null);
// // //         await fetchAvailability();
// // //       } else {
// // //         showMessage(result.message || 'Operation failed', 'error');
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ Save error:', error);
// // //       showMessage('Error saving availability', 'error');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const deleteAvailability = async (blockId) => {
// // //     if (!confirm('Are you sure you want to remove this block?')) return;

// // //     try {
// // //       setLoading(true);
// // //       console.log('🗑️ Deleting:', blockId);

// // //       const response = await fetch(`${API_BASE}/deleteNotAvailability/${blockId}`, {
// // //         method: 'DELETE',
// // //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
// // //       });

// // //       const result = await response.json();
// // //       console.log('✅ Delete response:', result);

// // //       if (result.success) {
// // //         showMessage('Removed successfully!', 'success');
// // //         await fetchAvailability();
// // //       } else {
// // //         showMessage(result.message || 'Delete failed', 'error');
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ Delete error:', error);
// // //       showMessage('Error removing block', 'error');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const editBlock = (block) => {
// // //     setEditingBlock(block);
// // //     setAvailabilityStatus('blocked');
// // //     setTimeRange({ from: block.fromTime, to: block.toTime });
    
// // //     const from = new Date(block.fromDate);
// // //     const to = new Date(block.toDate);
// // //     const dates = [];
    
// // //     for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
// // //       dates.push(new Date(d));
// // //     }
    
// // //     setSelectedDates(dates);
// // //     showMessage('Edit mode: Modify dates and click Save', 'info');
// // //   };

// // //   const showMessage = (text, type) => {
// // //     setMessage({ text, type });
// // //     setTimeout(() => setMessage(null), 4000);
// // //   };

// // //   const getDaysInMonth = (date) => {
// // //     const year = date.getFullYear();
// // //     const month = date.getMonth();
// // //     const firstDay = new Date(year, month, 1);
// // //     const lastDay = new Date(year, month + 1, 0);
// // //     return {
// // //       daysInMonth: lastDay.getDate(),
// // //       startingDayOfWeek: firstDay.getDay(),
// // //       year,
// // //       month
// // //     };
// // //   };

// // //   const isDateBlocked = (date) => {
// // //     const checkDate = new Date(date).setHours(0, 0, 0, 0);
// // //     return blockedDates.some(block => {
// // //       const start = new Date(block.fromDate).setHours(0, 0, 0, 0);
// // //       const end = new Date(block.toDate).setHours(23, 59, 59, 999);
// // //       return checkDate >= start && checkDate <= end;
// // //     });
// // //   };

// // //   const isDateSelected = (date) => {
// // //     return selectedDates.some(d => 
// // //       d.toISOString().split('T')[0] === date.toISOString().split('T')[0]
// // //     );
// // //   };

// // //   const handleDateClick = (date) => {
// // //     const today = new Date().setHours(0, 0, 0, 0);
// // //     const clickedDate = new Date(date).setHours(0, 0, 0, 0);
    
// // //     if (clickedDate < today) {
// // //       showMessage('Cannot select past dates', 'error');
// // //       return;
// // //     }

// // //     if (view !== 'owner') {
// // //       if (isDateBlocked(date)) {
// // //         showMessage('This date is not available', 'error');
// // //       }
// // //       return;
// // //     }

// // //     const dateStr = date.toISOString().split('T')[0];
// // //     const isSelected = selectedDates.some(d => d.toISOString().split('T')[0] === dateStr);
    
// // //     if (isSelected) {
// // //       setSelectedDates(selectedDates.filter(d => d.toISOString().split('T')[0] !== dateStr));
// // //     } else {
// // //       setSelectedDates([...selectedDates, new Date(date)]);
// // //     }
// // //   };

// // //   const renderCalendar = () => {
// // //     const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
// // //     const days = [];
// // //     const today = new Date().setHours(0, 0, 0, 0);

// // //     for (let i = 0; i < startingDayOfWeek; i++) {
// // //       days.push(<div key={`empty-${i}`} className="h-16"></div>);
// // //     }

// // //     for (let day = 1; day <= daysInMonth; day++) {
// // //       const date = new Date(year, month, day);
// // //       const dateTime = date.setHours(0, 0, 0, 0);
// // //       const isPast = dateTime < today;
// // //       const blocked = isDateBlocked(date);
// // //       const selected = isDateSelected(date);

// // //       const isClickable = view === 'owner' && !isPast;
// // //       const isDisabledForCustomer = view !== 'owner' && blocked;

// // //       days.push(
// // //         <button
// // //           key={day}
// // //           onClick={() => handleDateClick(date)}
// // //           disabled={isPast || isDisabledForCustomer}
// // //           className={`
// // //             relative h-16 rounded-xl transition-all duration-200 font-medium
// // //             ${isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
// // //             ${blocked ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg' : ''}
// // //             ${selected && !blocked && availabilityStatus === 'blocked' ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-xl scale-105' : ''}
// // //             ${selected && !blocked && availabilityStatus === 'available' ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl scale-105' : ''}
// // //             ${!blocked && !selected && !isPast ? 'bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 border-2 border-gray-200 hover:border-green-400 hover:shadow-md' : ''}
// // //             ${isDisabledForCustomer ? 'cursor-not-allowed opacity-70' : ''}
// // //             ${isClickable ? 'cursor-pointer' : ''}
// // //           `}
// // //         >
// // //           <span className="text-lg">{day}</span>
// // //           {blocked && (
// // //             <div className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-md">
// // //               <X className="w-4 h-4 text-red-600" strokeWidth={3} />
// // //             </div>
// // //           )}
// // //           {selected && !blocked && availabilityStatus === 'blocked' && (
// // //             <div className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-md">
// // //               <X className="w-4 h-4 text-red-600" strokeWidth={3} />
// // //             </div>
// // //           )}
// // //           {selected && !blocked && availabilityStatus === 'available' && (
// // //             <div className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-md">
// // //               <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
// // //             </div>
// // //           )}
// // //         </button>
// // //       );
// // //     }

// // //     return days;
// // //   };

// // //   const changeMonth = (direction) => {
// // //     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
// // //   };

// // //   const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
// // //       <div className="max-w-6xl mx-auto">
        
// // //         {/* Header */}
// // //         <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6 border border-purple-100">
// // //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// // //             <div className="flex items-center gap-3">
// // //               <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
// // //                 <Car className="w-8 h-8 text-white" />
// // //               </div>
// // //               <div>
// // //                 <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // //                   {view === 'owner' ? '🏠 Owner Dashboard' : 
// // //                    view === 'customer-booking' ? '📅 Book Vehicle' : '📜 Booking History'}
// // //                 </h1>
// // //                 <p className="text-sm text-gray-500">Manage vehicle availability</p>
// // //               </div>
// // //             </div>
            
// // //             <div className="flex gap-2">
// // //               <button
// // //                 onClick={() => setView('owner')}
// // //                 className={`px-4 py-2 rounded-xl font-medium transition-all ${
// // //                   view === 'owner' 
// // //                     ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
// // //                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // //                 }`}
// // //               >
// // //                 Owner
// // //               </button>
// // //               <button
// // //                 onClick={() => setView('customer-booking')}
// // //                 className={`px-4 py-2 rounded-xl font-medium transition-all ${
// // //                   view === 'customer-booking' 
// // //                     ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
// // //                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // //                 }`}
// // //               >
// // //                 Booking
// // //               </button>
// // //               <button
// // //                 onClick={() => setView('customer-history')}
// // //                 className={`px-4 py-2 rounded-xl font-medium transition-all ${
// // //                   view === 'customer-history' 
// // //                     ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
// // //                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // //                 }`}
// // //               >
// // //                 History
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {message && (
// // //             <div className={`mt-4 p-4 rounded-xl flex items-center gap-3 shadow-lg ${
// // //               message.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' :
// // //               message.type === 'error' ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white' :
// // //               'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
// // //             }`}>
// // //               <AlertCircle className="w-5 h-5" />
// // //               <span className="font-medium">{message.text}</span>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Owner Controls */}
// // //         {view === 'owner' && (
// // //           <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6 border border-purple-100">
// // //             <h2 className="text-xl font-bold mb-4 text-gray-800">
// // //               {editingBlock ? '✏️ Edit Availability' : '➕ Set Availability'}
// // //             </h2>
            
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// // //               <button
// // //                 onClick={() => setAvailabilityStatus('available')}
// // //                 className={`p-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all font-medium ${
// // //                   availabilityStatus === 'available'
// // //                     ? 'border-green-500 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105'
// // //                     : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-green-400 hover:shadow-md'
// // //                 }`}
// // //               >
// // //                 <Check className="w-5 h-5" />
// // //                 Available
// // //               </button>
// // //               <button
// // //                 onClick={() => setAvailabilityStatus('blocked')}
// // //                 className={`p-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all font-medium ${
// // //                   availabilityStatus === 'blocked'
// // //                     ? 'border-red-500 bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg scale-105'
// // //                     : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-red-400 hover:shadow-md'
// // //                 }`}
// // //               >
// // //                 <X className="w-5 h-5" />
// // //                 Not Available
// // //               </button>
// // //             </div>

// // //             <div className="grid grid-cols-2 gap-4 mb-4">
// // //               <div>
// // //                 <label className="block text-sm font-semibold text-gray-700 mb-2">🕐 From Time</label>
// // //                 <input
// // //                   type="time"
// // //                   value={timeRange.from}
// // //                   onChange={(e) => setTimeRange({ ...timeRange, from: e.target.value })}
// // //                   className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-sm font-semibold text-gray-700 mb-2">🕐 To Time</label>
// // //                 <input
// // //                   type="time"
// // //                   value={timeRange.to}
// // //                   onChange={(e) => setTimeRange({ ...timeRange, to: e.target.value })}
// // //                   className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div className="flex gap-3">
// // //               <button
// // //                 onClick={createOrUpdateAvailability}
// // //                 disabled={loading || selectedDates.length === 0}
// // //                 className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all font-semibold flex items-center justify-center gap-2"
// // //               >
// // //                 {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
// // //                 {loading ? 'Processing...' : editingBlock ? 'Update' : 'Save'}
// // //               </button>
// // //               {editingBlock && (
// // //                 <button
// // //                   onClick={() => {
// // //                     setEditingBlock(null);
// // //                     setSelectedDates([]);
// // //                     showMessage('Edit cancelled', 'info');
// // //                   }}
// // //                   className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Calendar */}
// // //         <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6 border border-purple-100">
// // //           <div className="flex items-center justify-between mb-6">
// // //             <button
// // //               onClick={() => changeMonth(-1)}
// // //               className="p-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white rounded-xl transition-all group"
// // //             >
// // //               <ChevronLeft className="w-6 h-6" />
// // //             </button>
// // //             <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // //               {monthName}
// // //             </h2>
// // //             <button
// // //               onClick={() => changeMonth(1)}
// // //               className="p-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white rounded-xl transition-all group"
// // //             >
// // //               <ChevronRight className="w-6 h-6" />
// // //             </button>
// // //           </div>

// // //           <div className="grid grid-cols-7 gap-2 mb-3">
// // //             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
// // //               <div key={day} className="text-center text-sm font-bold text-gray-600 p-2">
// // //                 {day}
// // //               </div>
// // //             ))}
// // //           </div>

// // //           <div className="grid grid-cols-7 gap-2">
// // //             {renderCalendar()}
// // //           </div>

// // //           <div className="mt-6 pt-6 border-t-2 border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-3">
// // //             <div className="flex items-center gap-2">
// // //               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
// // //                 <X className="w-5 h-5 text-white" />
// // //               </div>
// // //               <span className="text-sm font-medium">Saved Block</span>
// // //             </div>
// // //             <div className="flex items-center gap-2">
// // //               <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center shadow-md">
// // //                 <X className="w-5 h-5 text-white" />
// // //               </div>
// // //               <span className="text-sm font-medium">Will Block</span>
// // //             </div>
// // //             <div className="flex items-center gap-2">
// // //               <div className="w-10 h-10 bg-white border-2 border-green-400 rounded-lg shadow-md"></div>
// // //               <span className="text-sm font-medium">Available</span>
// // //             </div>
// // //             <div className="flex items-center gap-2">
// // //               <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
// // //               <span className="text-sm font-medium">Past</span>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Blocked Dates List */}
// // //         {view === 'owner' && blockedDates.length > 0 && (
// // //           <div className="bg-white rounded-2xl shadow-2xl p-6 border border-purple-100">
// // //             <h2 className="text-xl font-bold mb-4 text-gray-800">🚫 Blocked Dates</h2>
// // //             <div className="space-y-3">
// // //               {blockedDates.map((block) => (
// // //                 <div key={block.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 hover:shadow-md transition-all">
// // //                   <div className="flex items-center gap-3">
// // //                     <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
// // //                       <X className="w-5 h-5 text-white" />
// // //                     </div>
// // //                     <div>
// // //                       <p className="font-bold text-gray-800">
// // //                         {new Date(block.fromDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(block.toDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
// // //                       </p>
// // //                       <p className="text-sm text-gray-600 flex items-center gap-1">
// // //                         <Clock className="w-4 h-4" />
// // //                         {block.fromTime} - {block.toTime}
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                   <div className="flex gap-2">
// // //                     <button
// // //                       onClick={() => editBlock(block)}
// // //                       className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all"
// // //                       title="Edit"
// // //                     >
// // //                       <Edit3 className="w-4 h-4" />
// // //                     </button>
// // //                     <button
// // //                       onClick={() => deleteAvailability(block.id)}
// // //                       className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all"
// // //                       title="Delete"
// // //                     >
// // //                       <Trash2 className="w-4 h-4" />
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {view !== 'owner' && (
// // //           <div className="bg-white rounded-2xl shadow-2xl p-6 border border-purple-100">
// // //             <div className="text-center py-8">
// // //               <Calendar className="w-16 h-16 mx-auto mb-4 text-purple-600" />
// // //               <h3 className="text-xl font-bold text-gray-800 mb-2">
// // //                 {view === 'customer-booking' ? 'Select Available Dates' : 'Your Booking History'}
// // //               </h3>
// // //               <p className="text-gray-600">
// // //                 {view === 'customer-booking' 
// // //                   ? 'Blocked dates (marked with ❌) are not available for booking'
// // //                   : 'View your past and upcoming bookings here'}
// // //               </p>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AvailabilityDateTimeModal;












// // // // // =======================================================
// // // // // AvailabilityDateTimeModal.tsx
// // // // // =======================================================

// // // // import React, { useState, useEffect, useCallback } from "react";
// // // // import {
// // // //   X,
// // // //   Calendar,
// // // //   ChevronLeft,
// // // //   ChevronRight,
// // // //   Trash2,
// // // //   Edit2,
// // // //   RefreshCw,
// // // //   Plus,
// // // //   Check,
// // // // } from "lucide-react";
// // // // import apiService from "../services/api.service";
// // // // // import dayjs from "dayjs";
// // // // // import isBetween from "dayjs/plugin/isBetween";
// // // // dayjs.extend(isBetween);

// // // // // =======================================================
// // // // // Props Interface
// // // // // =======================================================
// // // // interface AvailabilityDateTimeModalProps {
// // // //   isOpen: boolean;
// // // //   onClose: () => void;
// // // //   userId: string;
// // // //   VechileId: string;
// // // //   vehicleType: string;
// // // //   startDate?: string;
// // // //   endDate?: string;
// // // // }

// // // // // =======================================================
// // // // // Slot Interface
// // // // // =======================================================
// // // // interface AvailabilitySlot {
// // // //   _id: string;
// // // //   VechileId: string;
// // // //   vehicleType: string;
// // // //   fromDate: string;
// // // //   toDate: string;
// // // //   status: "available" | "blocked";
// // // //   userId: string;
// // // // }

// // // // // =======================================================
// // // // // Component Start
// // // // // =======================================================
// // // // const AvailabilityDateTimeModal: React.FC<AvailabilityDateTimeModalProps> = ({
// // // //   isOpen,
// // // //   onClose,
// // // //   userId,
// // // //   VechileId,
// // // //   vehicleType,
// // // //   startDate,
// // // //   endDate,
// // // // }) => {
// // // //   const [currentMonth, setCurrentMonth] = useState(dayjs());
// // // //   const [availabilityStatus, setAvailabilityStatus] = useState<
// // // //     "available" | "blocked"
// // // //   >("available");
// // // //   const [selectedDates, setSelectedDates] = useState<string[]>([]);
// // // //   const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>(
// // // //     []
// // // //   );
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [editingSlot, setEditingSlot] = useState<AvailabilitySlot | null>(null);

// // // //   const API_BASE = "http://3.110.122.127:3000";

// // // //   // =======================================================
// // // //   // Fetch existing availability data
// // // //   // =======================================================
// // // //   const fetchAvailability = useCallback(async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       console.log("📡 Fetching availability for:", VechileId);
// // // //       const response = await apiService.notAvailability.getVehicleAvailability({
// // // //         VechileId,
// // // //         vehicleType,
// // // //       });
// // // //       console.log("✅ Availability fetched:", response?.data);
// // // //       setAvailabilitySlots(response?.data || []);
// // // //     } catch (error) {
// // // //       console.error("❌ Error fetching availability:", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, [VechileId, vehicleType]);

// // // //   useEffect(() => {
// // // //     if (isOpen) fetchAvailability();
// // // //   }, [isOpen, fetchAvailability]);

// // // //   // =======================================================
// // // //   // Handle Date Click
// // // //   // =======================================================
// // // //   const handleDateClick = (date: dayjs.Dayjs) => {
// // // //     const dateStr = date.format("YYYY-MM-DD");

// // // //     // Prevent editing of saved blocks
// // // //     const isSavedBlocked = availabilitySlots.some(
// // // //       (slot) =>
// // // //         dayjs(dateStr).isBetween(slot.fromDate, slot.toDate, null, "[]") &&
// // // //         slot.status === "blocked"
// // // //     );
// // // //     const isSavedAvailable = availabilitySlots.some(
// // // //       (slot) =>
// // // //         dayjs(dateStr).isBetween(slot.fromDate, slot.toDate, null, "[]") &&
// // // //         slot.status === "available"
// // // //     );

// // // //     if (isSavedBlocked || isSavedAvailable) return; // skip saved dates

// // // //     setSelectedDates((prev) =>
// // // //       prev.includes(dateStr)
// // // //         ? prev.filter((d) => d !== dateStr)
// // // //         : [...prev, dateStr]
// // // //     );
// // // //   };

// // // //   // =======================================================
// // // //   // Save Selected Dates (Create or Update)
// // // //   // =======================================================
// // // //   const handleSave = async () => {
// // // //     if (selectedDates.length === 0)
// // // //       return alert("Please select at least one date");

// // // //     const fromDate = selectedDates[0];
// // // //     const toDate = selectedDates[selectedDates.length - 1];

// // // //     const payload = {
// // // //       VechileId,
// // // //       vehicleType,
// // // //       fromDate,
// // // //       toDate,
// // // //       status: availabilityStatus,
// // // //       userId,
// // // //     };

// // // //     try {
// // // //       setLoading(true);
// // // //       console.log("📡 Saving availability:", payload);

// // // //       if (editingSlot) {
// // // //         await apiService.notAvailability.updateNotAvailability(
// // // //           editingSlot._id,
// // // //           payload
// // // //         );
// // // //         console.log("✅ Availability updated successfully");
// // // //       } else {
// // // //         await apiService.notAvailability.createNotAvailability(payload);
// // // //         console.log("✅ Availability created successfully");
// // // //       }

// // // //       setSelectedDates([]);
// // // //       setEditingSlot(null);
// // // //       await fetchAvailability();
// // // //     } catch (error) {
// // // //       console.error("❌ Error saving availability:", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // =======================================================
// // // //   // Edit Slot
// // // //   // =======================================================
// // // //   const handleEdit = (slot: AvailabilitySlot) => {
// // // //     setAvailabilityStatus(slot.status);
// // // //     setEditingSlot(slot);

// // // //     const range: string[] = [];
// // // //     let d = dayjs(slot.fromDate);
// // // //     while (d.isBefore(slot.toDate) || d.isSame(slot.toDate, "day")) {
// // // //       range.push(d.format("YYYY-MM-DD"));
// // // //       d = d.add(1, "day");
// // // //     }
// // // //     setSelectedDates(range);
// // // //   };

// // // //   // =======================================================
// // // //   // Delete Slot
// // // //   // =======================================================
// // // //   const handleDelete = async (slotId: string) => {
// // // //     if (!window.confirm("Are you sure you want to delete this slot?")) return;

// // // //     try {
// // // //       setLoading(true);
// // // //       console.log("🗑️ Deleting slot:", slotId);
// // // //       await apiService.notAvailability.deleteNotAvailability(slotId);
// // // //       await fetchAvailability();
// // // //       console.log("✅ Slot deleted successfully");
// // // //     } catch (error) {
// // // //       console.error("❌ Error deleting slot:", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // =======================================================
// // // //   // Render Calendar
// // // //   // =======================================================
// // // //   const renderCalendar = () => {
// // // //     const startOfMonth = currentMonth.startOf("month");
// // // //     const endOfMonth = currentMonth.endOf("month");
// // // //     const daysInMonth = endOfMonth.date();

// // // //     const blanks = Array(startOfMonth.day()).fill(null);

// // // //     return (
// // // //       <div className="grid grid-cols-7 gap-2">
// // // //         {blanks.map((_, idx) => (
// // // //           <div key={`blank-${idx}`} />
// // // //         ))}

// // // //         {[...Array(daysInMonth)].map((_, i) => {
// // // //           const date = startOfMonth.add(i, "day");
// // // //           const day = date.date();
// // // //           const dateStr = date.format("YYYY-MM-DD");
// // // //           const isPast = date.isBefore(dayjs(), "day");
// // // //           const blocked = availabilitySlots.some(
// // // //             (slot) =>
// // // //               date.isBetween(slot.fromDate, slot.toDate, null, "[]") &&
// // // //               slot.status === "blocked"
// // // //           );
// // // //           const available = availabilitySlots.some(
// // // //             (slot) =>
// // // //               date.isBetween(slot.fromDate, slot.toDate, null, "[]") &&
// // // //               slot.status === "available"
// // // //           );
// // // //           const selected = selectedDates.includes(dateStr);

// // // //           return (
// // // //             <button
// // // //               key={day}
// // // //               onClick={() => handleDateClick(date)}
// // // //               disabled={isPast}
// // // //               className={`
// // // //                 relative h-16 rounded-xl transition-all duration-200 font-medium
// // // //                 ${isPast ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
// // // //                 ${blocked ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg" : ""}
// // // //                 ${available ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg" : ""}
// // // //                 ${selected && availabilityStatus === "blocked" && !blocked ? "bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-xl scale-105" : ""}
// // // //                 ${selected && availabilityStatus === "available" && !available ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl scale-105" : ""}
// // // //                 ${!blocked && !selected && !available && !isPast ? "bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 border-2 border-gray-200 hover:border-green-400 hover:shadow-md" : ""}
// // // //                 ${!isPast ? "cursor-pointer" : ""}
// // // //               `}
// // // //             >
// // // //               <span className="text-lg">{day}</span>

// // // //               {/* Blue ❌ for Saved Block */}
// // // //               {blocked && (
// // // //                 <div className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-md">
// // // //                   <X className="w-4 h-4 text-blue-700" strokeWidth={3} />
// // // //                 </div>
// // // //               )}

// // // //               {/* Green ✓ for Saved Available */}
// // // //               {available && (
// // // //                 <div className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-md">
// // // //                   <Check className="w-4 h-4 text-green-700" strokeWidth={3} />
// // // //                 </div>
// // // //               )}

// // // //               {/* Red ❌ for Pending Block */}
// // // //               {selected && !blocked && availabilityStatus === "blocked" && (
// // // //                 <div className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-md">
// // // //                   <X className="w-4 h-4 text-red-600" strokeWidth={3} />
// // // //                 </div>
// // // //               )}

// // // //               {/* Green ✓ for Pending Available */}
// // // //               {selected && !available && availabilityStatus === "available" && (
// // // //                 <div className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-md">
// // // //                   <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
// // // //                 </div>
// // // //               )}
// // // //             </button>
// // // //           );
// // // //         })}
// // // //       </div>
// // // //     );
// // // //   };

// // // //   // =======================================================
// // // //   // UI Layout
// // // //   // =======================================================
// // // //   if (!isOpen) return null;

// // // //   return (
// // // //     <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
// // // //       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 relative overflow-y-auto max-h-[90vh]">
// // // //         <button
// // // //           onClick={onClose}
// // // //           className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
// // // //         >
// // // //           <X className="w-6 h-6" />
// // // //         </button>

// // // //         <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
// // // //           <Calendar className="w-6 h-6 text-indigo-600" /> Manage Availability
// // // //         </h2>

// // // //         <div className="flex items-center justify-between mb-4">
// // // //           <button onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}>
// // // //             <ChevronLeft />
// // // //           </button>
// // // //           <span className="text-lg font-semibold">
// // // //             {currentMonth.format("MMMM YYYY")}
// // // //           </span>
// // // //           <button onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}>
// // // //             <ChevronRight />
// // // //           </button>
// // // //         </div>

// // // //         <div className="flex justify-center gap-3 mb-6">
// // // //           <button
// // // //             onClick={() => setAvailabilityStatus("available")}
// // // //             className={`px-4 py-2 rounded-lg font-medium ${
// // // //               availabilityStatus === "available"
// // // //                 ? "bg-green-600 text-white"
// // // //                 : "bg-gray-200 hover:bg-green-100"
// // // //             }`}
// // // //           >
// // // //             Set Available
// // // //           </button>
// // // //           <button
// // // //             onClick={() => setAvailabilityStatus("blocked")}
// // // //             className={`px-4 py-2 rounded-lg font-medium ${
// // // //               availabilityStatus === "blocked"
// // // //                 ? "bg-red-600 text-white"
// // // //                 : "bg-gray-200 hover:bg-red-100"
// // // //             }`}
// // // //           >
// // // //             Set Not Available
// // // //           </button>
// // // //         </div>

// // // //         {renderCalendar()}

// // // //         <div className="mt-6 flex justify-end gap-3">
// // // //           <button
// // // //             onClick={handleSave}
// // // //             disabled={loading}
// // // //             className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-70"
// // // //           >
// // // //             {editingSlot ? "Update" : "Save"}
// // // //           </button>
// // // //           <button
// // // //             onClick={onClose}
// // // //             className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
// // // //           >
// // // //             Cancel
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AvailabilityDateTimeModal;





// // import React, { useState, useEffect } from "react";
// // import { X, Calendar, ChevronLeft, ChevronRight, Edit2, Trash2, MoreVertical, RefreshCw } from "lucide-react";

// // // Mock API for demo purposes
// // const notAvailabilityAPI = {
// //   getVehicleAvailability: async () => {
// //     return [
// //       {
// //         _id: "1",
// //         fromDate: "2025-11-05T00:00:00",
// //         toDate: "2025-11-07T00:00:00",
// //         isNotAvailable: true
// //       }
// //     ];
// //   },
// //   createNotAvailability: async (payload) => {
// //     console.log("Creating:", payload);
// //     return { success: true };
// //   },
// //   updateNotAvailability: async (id, payload) => {
// //     console.log("Updating:", id, payload);
// //     return { success: true };
// //   },
// //   deleteNotAvailability: async (id) => {
// //     console.log("Deleting:", id);
// //     return { success: true };
// //   }
// // };

// // const AvailabilityDateTimeModal = ({
// //   isOpen = true,
// //   onClose = () => {},
// //   userId = "user123",
// //   VechileId = "vehicle456",
// //   vehicleType = "Car",
// //   startDate,
// //   endDate
// // }) => {
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");
// //   const [fromTime, setFromTime] = useState("09:00");
// //   const [toTime, setToTime] = useState("18:00");
// //   const [availability, setAvailability] = useState("notAvailable");
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState("");
// //   const [currentMonth, setCurrentMonth] = useState(new Date());
// //   const [existingSlots, setExistingSlots] = useState([]);
// //   const [showOptionsMenu, setShowOptionsMenu] = useState(false);
// //   const [editingSlot, setEditingSlot] = useState(null);
// //   const [selectedSlotForAction, setSelectedSlotForAction] = useState(null);

// //   useEffect(() => {
// //     if (isOpen) {
// //       loadSlotsForCurrentMonth();
// //     }
// //   }, [isOpen, currentMonth, VechileId, vehicleType]);

// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       const target = e.target;
// //       if (showOptionsMenu && !target.closest('.options-menu-container')) {
// //         setShowOptionsMenu(false);
// //       }
// //     };

// //     if (showOptionsMenu) {
// //       document.addEventListener('click', handleClickOutside);
// //       return () => document.removeEventListener('click', handleClickOutside);
// //     }
// //   }, [showOptionsMenu]);

// //   const loadSlotsForCurrentMonth = async () => {
// //     try {
// //       setLoading(true);

// //       const year = currentMonth.getFullYear();
// //       const month = currentMonth.getMonth();
      
// //       const startDate = new Date(year, month, 1).toISOString().split("T")[0];
// //       const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];

// //       const slots = await notAvailabilityAPI.getVehicleAvailability(
// //         VechileId,
// //         vehicleType,
// //         startDate,
// //         endDate
// //       );

// //       setExistingSlots(slots || []);
      
// //     } catch (error) {
// //       console.error("Error loading slots:", error);
// //       setMessage("⚠️ Could not load existing slots");
// //       setExistingSlots([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRefresh = () => {
// //     setMessage("🔄 Refreshing...");
// //     loadSlotsForCurrentMonth();
// //     setTimeout(() => setMessage(""), 2000);
// //   };

// //   const getSlotId = (slot) => {
// //     if (!slot) return null;
// //     return slot._id || slot.id || slot.notAvailabilityId || null;
// //   };

// //   const getDaysInMonth = (date) => {
// //     const year = date.getFullYear();
// //     const month = date.getMonth();
// //     const firstDay = new Date(year, month, 1);
// //     const lastDay = new Date(year, month + 1, 0);
// //     const daysInMonth = lastDay.getDate();
// //     const startingDayOfWeek = firstDay.getDay();

// //     const days = [];
// //     for (let i = 0; i < startingDayOfWeek; i++) {
// //       days.push(null);
// //     }
// //     for (let i = 1; i <= daysInMonth; i++) {
// //       days.push(i);
// //     }
// //     return days;
// //   };

// //   const formatMonthYear = (date) => {
// //     return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
// //   };

// //   const handlePrevMonth = () => {
// //     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
// //   };

// //   const handleNextMonth = () => {
// //     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
// //   };

// //   const handleDateClick = (day) => {
// //     const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
// //     const formattedDate = selectedDate.toISOString().split("T")[0];

// //     if (!fromDate || (fromDate && toDate)) {
// //       setFromDate(formattedDate);
// //       setToDate("");
// //     } else {
// //       if (new Date(formattedDate) >= new Date(fromDate)) {
// //         setToDate(formattedDate);
// //       } else {
// //         setFromDate(formattedDate);
// //         setToDate("");
// //       }
// //     }
// //   };

// //   const isDateInRange = (day) => {
// //     if (!fromDate || !day) return false;
// //     const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
// //     const from = new Date(fromDate);
// //     const to = toDate ? new Date(toDate) : null;
// //     if (to) {
// //       return date >= from && date <= to;
// //     }
// //     return date.toISOString().split("T")[0] === fromDate;
// //   };

// //   const isDateBlocked = (day) => {
// //     if (!day) return false;
// //     const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
// //     date.setHours(0, 0, 0, 0);
    
// //     return existingSlots.some((slot) => {
// //       if (!slot.isNotAvailable) return false;
      
// //       const fromDate = new Date(slot.fromDate.split('T')[0]);
// //       fromDate.setHours(0, 0, 0, 0);
      
// //       const toDate = new Date(slot.toDate.split('T')[0]);
// //       toDate.setHours(0, 0, 0, 0);
      
// //       return date >= fromDate && date <= toDate;
// //     });
// //   };

// //   const isPastDate = (day) => {
// //     if (!day) return false;
// //     const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0);
// //     return date < today;
// //   };

// //   const handleSave = async () => {
// //     if (!userId || !VechileId || !fromDate || !toDate) {
// //       setMessage("⚠️ Please select both start and end dates");
// //       return;
// //     }

// //     setLoading(true);
// //     setMessage("");

// //     const payload = {
// //       userId,
// //       VechileId,
// //       vechileType: vehicleType,
// //       fromDate,
// //       toDate,
// //       fromTime: fromTime.padStart(5, "0"),
// //       toTime: toTime.padStart(5, "0"),
// //       isNotAvailable: availability === "notAvailable",
// //     };

// //     try {
// //       const response = await notAvailabilityAPI.createNotAvailability(payload);

// //       setMessage("✅ Dates blocked successfully!");
// //       await loadSlotsForCurrentMonth();

// //       setFromDate("");
// //       setToDate("");
// //       setFromTime("09:00");
// //       setToTime("18:00");
// //       setAvailability("notAvailable");
// //       setTimeout(() => setMessage(""), 3000);
// //     } catch (error) {
// //       const errorMsg = error?.response?.data?.message || error?.message || "Failed to create slot";
// //       setMessage(`❌ ${errorMsg}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleUpdate = async () => {
// //     const slotId = getSlotId(editingSlot);

// //     if (!slotId || !fromDate || !toDate) {
// //       setMessage("⚠️ Please select both start and end dates");
// //       return;
// //     }

// //     setLoading(true);
// //     setMessage("🔄 Updating slot...");

// //     const payload = {
// //       fromDate,
// //       toDate,
// //       fromTime: fromTime.padStart(5, "0"),
// //       toTime: toTime.padStart(5, "0"),
// //       isNotAvailable: availability === "notAvailable",
// //     };

// //     try {
// //       const response = await notAvailabilityAPI.updateNotAvailability(slotId, payload);

// //       setMessage("✅ Slot updated successfully!");
// //       await loadSlotsForCurrentMonth();

// //       setEditingSlot(null);
// //       setFromDate("");
// //       setToDate("");
// //       setFromTime("09:00");
// //       setToTime("18:00");
// //       setAvailability("notAvailable");

// //       setTimeout(() => setMessage(""), 3000);
// //     } catch (error) {
// //       const errorMsg = error?.response?.data?.message || error?.message || "Failed to update slot";
// //       setMessage(`❌ Update failed: ${errorMsg}`);
// //       setTimeout(() => setMessage(""), 5000);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEditSlot = () => {
// //     if (!selectedSlotForAction) return;
    
// //     setEditingSlot(selectedSlotForAction);
// //     setFromDate(selectedSlotForAction.fromDate.split('T')[0]);
// //     setToDate(selectedSlotForAction.toDate.split('T')[0]);
// //     setFromTime(selectedSlotForAction.fromTime || "09:00");
// //     setToTime(selectedSlotForAction.toTime || "18:00");
// //     setAvailability(selectedSlotForAction.isNotAvailable ? "notAvailable" : "available");
// //     setShowOptionsMenu(false);
// //     setSelectedSlotForAction(null);
// //   };

// //   const handleDeleteSlot = async () => {
// //     if (!selectedSlotForAction) return;

// //     const slotId = getSlotId(selectedSlotForAction);
    
// //     if (!slotId) {
// //       setMessage("❌ Cannot delete: Invalid slot ID");
// //       return;
// //     }
    
// //     if (!window.confirm(`🗑️ Are you sure you want to delete this slot?\n\nDate Range: ${new Date(selectedSlotForAction.fromDate).toLocaleDateString()} - ${new Date(selectedSlotForAction.toDate).toLocaleDateString()}\n\nThis action cannot be undone.`)) {
// //       setShowOptionsMenu(false);
// //       setSelectedSlotForAction(null);
// //       return;
// //     }

// //     setLoading(true);
// //     setMessage("🗑️ Deleting slot...");
// //     setShowOptionsMenu(false);

// //     try {
// //       const response = await notAvailabilityAPI.deleteNotAvailability(slotId);
      
// //       setMessage("✅ Slot deleted successfully!");
      
// //       if (getSlotId(editingSlot) === slotId) {
// //         setEditingSlot(null);
// //         setFromDate("");
// //         setToDate("");
// //         setFromTime("09:00");
// //         setToTime("18:00");
// //         setAvailability("notAvailable");
// //       }
      
// //       await loadSlotsForCurrentMonth();
      
// //       setTimeout(() => setMessage(""), 3000);
// //     } catch (error) {
// //       const errorMsg = error?.response?.data?.message || error?.message || "Failed to delete slot";
// //       setMessage(`❌ Delete failed: ${errorMsg}`);
      
// //       setTimeout(() => setMessage(""), 5000);
// //     } finally {
// //       setLoading(false);
// //       setSelectedSlotForAction(null);
// //     }
// //   };

// //   const handleCancelEdit = () => {
// //     setEditingSlot(null);
// //     setFromDate("");
// //     setToDate("");
// //     setFromTime("09:00");
// //     setToTime("18:00");
// //     setAvailability("notAvailable");
// //   };

// //   const handleOptionsMenuClick = (e) => {
// //     e.stopPropagation();
    
// //     const blockedSlots = existingSlots.filter(slot => slot.isNotAvailable);
// //     if (blockedSlots.length > 0) {
// //       setSelectedSlotForAction(blockedSlots[blockedSlots.length - 1]);
// //     }
    
// //     setShowOptionsMenu(!showOptionsMenu);
// //   };

// //   const generateTimeOptions = () => {
// //     const options = [];
// //     for (let h = 0; h < 24; h++) {
// //       for (let m = 0; m < 60; m += 30) {
// //         const hour = h.toString().padStart(2, "0");
// //         const minute = m.toString().padStart(2, "0");
// //         const time = `${hour}:${minute}`;
// //         const period = h >= 12 ? "PM" : "AM";
// //         const displayHour = h % 12 || 12;
// //         options.push({ value: time, label: `${displayHour}:${minute} ${period}` });
// //       }
// //     }
// //     return options;
// //   };

// //   const days = getDaysInMonth(currentMonth);
// //   const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// //   const timeOptions = generateTimeOptions();

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
// //       <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-hidden flex flex-col">
// //         {/* Header */}
// //         <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex justify-between items-center flex-shrink-0">
// //           <h2 className="text-xl font-semibold text-white flex items-center gap-2">
// //             <Calendar size={24} />
// //             {editingSlot ? "Edit Unavailability Slot" : "Manage Vehicle Availability"}
// //           </h2>
// //           <div className="flex items-center gap-2">
// //             <button 
// //               onClick={handleRefresh}
// //               disabled={loading}
// //               className="p-2 rounded-full hover:bg-white/20 transition text-white disabled:opacity-50"
// //               title="Refresh slots"
// //             >
// //               <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
// //             </button>
            
// //             <div className="relative options-menu-container">
// //               <button 
// //                 onClick={handleOptionsMenuClick}
// //                 disabled={loading || existingSlots.filter(s => s.isNotAvailable).length === 0}
// //                 className="p-2 rounded-full hover:bg-white/20 transition text-white disabled:opacity-50 disabled:cursor-not-allowed"
// //                 title="Edit or Delete Slots"
// //               >
// //                 <MoreVertical size={20} />
// //               </button>
              
// //               {showOptionsMenu && selectedSlotForAction && (
// //                 <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[160px] overflow-hidden">
// //                   <button
// //                     onClick={handleEditSlot}
// //                     disabled={loading}
// //                     className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 flex items-center gap-3 text-gray-700 transition disabled:opacity-50"
// //                   >
// //                     <Edit2 size={16} className="text-blue-600" />
// //                     <span className="font-medium">Edit Slot</span>
// //                   </button>
// //                   <div className="border-t border-gray-100" />
// //                   <button
// //                     onClick={handleDeleteSlot}
// //                     disabled={loading}
// //                     className="w-full px-4 py-3 text-left text-sm hover:bg-red-50 flex items-center gap-3 text-gray-700 transition disabled:opacity-50"
// //                   >
// //                     <Trash2 size={16} className="text-red-600" />
// //                     <span className="font-medium">Delete Slot</span>
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition text-white">
// //               <X size={20} />
// //             </button>
// //           </div>
// //         </div>

// //         <div className="p-6 overflow-y-auto flex-1">
// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //             {/* Calendar Section */}
// //             <div className="lg:col-span-2">
// //               <div className="border rounded-lg p-4">
// //                 <div className="bg-gray-50 rounded-lg p-4">
// //                   <div className="flex items-center justify-between mb-4">
// //                     <button 
// //                       onClick={handlePrevMonth} 
// //                       disabled={loading}
// //                       className="p-2 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
// //                     >
// //                       <ChevronLeft size={20} />
// //                     </button>
// //                     <h3 className="font-semibold text-lg">{formatMonthYear(currentMonth)}</h3>
// //                     <button 
// //                       onClick={handleNextMonth} 
// //                       disabled={loading}
// //                       className="p-2 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
// //                     >
// //                       <ChevronRight size={20} />
// //                     </button>
// //                   </div>

// //                   {loading && (
// //                     <div className="text-center py-4 text-gray-500">
// //                       <RefreshCw size={24} className="animate-spin mx-auto mb-2" />
// //                       Loading slots...
// //                     </div>
// //                   )}

// //                   <div className="grid grid-cols-7 gap-1 mb-2">
// //                     {weekDays.map((day) => (
// //                       <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">{day}</div>
// //                     ))}
// //                   </div>

// //                   <div className="grid grid-cols-7 gap-1">
// //                     {days.map((day, index) => {
// //                       const inRange = isDateInRange(day);
// //                       const past = isPastDate(day);
// //                       const existingBlock = isDateBlocked(day);
// //                       const isSelecting = inRange && availability === "notAvailable";
// //                       const showBlockedSymbol = existingBlock || isSelecting;

// //                       return (
// //                         <button
// //                           key={index}
// //                           onClick={() => day && !past && handleDateClick(day)}
// //                           disabled={!day || past}
// //                           className={`
// //                             aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 relative
// //                             ${!day ? "invisible" : ""}
// //                             ${past ? "text-gray-300 cursor-not-allowed bg-gray-100" : ""}
// //                             ${showBlockedSymbol ? "bg-red-50 border-2 border-red-300" : ""}
// //                             ${inRange && availability === "available" ? "bg-blue-500 text-white hover:bg-blue-600 shadow-md" : ""}
// //                             ${!inRange && !past && !showBlockedSymbol && day ? "hover:bg-gray-200 hover:scale-110 border border-gray-200 bg-white" : ""}
// //                           `}
// //                         >
// //                           <span className={showBlockedSymbol ? "text-gray-800 font-bold relative z-10" : ""}>
// //                             {day}
// //                           </span>
// //                           {showBlockedSymbol && (
// //                             <>
// //                               <svg
// //                                 className="absolute inset-0 w-full h-full pointer-events-none z-20"
// //                                 viewBox="0 0 40 40"
// //                                 xmlns="http://www.w3.org/2000/svg"
// //                               >
// //                                 <line 
// //                                   x1="4" y1="4" x2="36" y2="36" 
// //                                   stroke="#dc2626" 
// //                                   strokeWidth="3" 
// //                                   strokeLinecap="round" 
// //                                 />
// //                                 <line 
// //                                   x1="36" y1="4" x2="4" y2="36" 
// //                                   stroke="#dc2626" 
// //                                   strokeWidth="3" 
// //                                   strokeLinecap="round" 
// //                                 />
// //                               </svg>
// //                               <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white z-30"></div>
// //                             </>
// //                           )}
// //                         </button>
// //                       );
// //                     })}
// //                   </div>
// //                 </div>

// //                 {/* Legend */}
// //                 <div className="mt-4 space-y-2 text-xs">
// //                   <div className="flex items-center gap-2">
// //                     <div className="w-8 h-8 bg-red-50 border-2 border-red-300 rounded flex items-center justify-center relative">
// //                       <span className="text-[10px] text-gray-800 font-bold z-10">15</span>
// //                       <svg className="absolute inset-0 w-full h-full" viewBox="0 0 32 32">
// //                         <line x1="6" y1="6" x2="26" y2="26" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
// //                         <line x1="26" y1="6" x2="6" y2="26" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
// //                       </svg>
// //                       <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></div>
// //                     </div>
// //                     <span className="text-gray-600 font-medium">Blocked dates (Not available for booking)</span>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <div className="w-8 h-8 bg-white border border-gray-200 rounded shadow-sm flex items-center justify-center">
// //                       <span className="text-xs font-medium text-gray-700">20</span>
// //                     </div>
// //                     <span className="text-gray-600 font-medium">Available dates (Customers can book)</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Right Side Panel */}
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
// //                   🕐 Start Time
// //                 </label>
// //                 <select
// //                   value={fromTime}
// //                   onChange={(e) => setFromTime(e.target.value)}
// //                   className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white hover:border-blue-400 transition focus:outline-none focus:border-blue-500"
// //                 >
// //                   {timeOptions.map((option) => (
// //                     <option key={option.value} value={option.value}>{option.label}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
// //                   🕐 End Time
// //                 </label>
// //                 <select
// //                   value={toTime}
// //                   onChange={(e) => setToTime(e.target.value)}
// //                   className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white hover:border-blue-400 transition focus:outline-none focus:border-blue-500"
// //                 >
// //                   {timeOptions.map((option) => (
// //                     <option key={option.value} value={option.value}>{option.label}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="text-sm font-medium text-gray-700 mb-2 block">Availability Status</label>
// //                 <select
// //                   value={availability}
// //                   onChange={(e) => setAvailability(e.target.value)}
// //                   className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white hover:border-blue-400 transition focus:outline-none focus:border-blue-500"
// //                 >
// //                   <option value="available">✅ Available</option>
// //                   <option value="notAvailable">🚫 Not Available (Block)</option>
// //                 </select>
// //               </div>

// //               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
// //                 <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">📊 Summary</h4>
// //                 <div className="space-y-2 text-sm">
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Vehicle:</span>
// //                     <span className="font-medium">{vehicleType}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Total Blocked:</span>
// //                     <span className="font-medium text-red-600">
// //                       {existingSlots.filter((s) => s.isNotAvailable).length}
// //                     </span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Status:</span>
// //                     <span className={`font-medium ${availability === "notAvailable" ? "text-red-600" : "text-green-600"}`}>
// //                       {availability === "notAvailable" ? "🚫 Blocking" : "✅ Available"}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="space-y-3">
// //                 {editingSlot ? (
// //                   <>
// //                     <button
// //                       onClick={handleUpdate}
// //                       disabled={loading || !fromDate || !toDate}
// //                       className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
// //                     >
// //                       {loading ? "⏳ Updating..." : "✅ Update Slot"}
// //                     </button>
// //                     <button
// //                       onClick={handleCancelEdit}
// //                       disabled={loading}
// //                       className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
// //                     >
// //                       Cancel Edit
// //                     </button>
// //                   </>
// //                 ) : (
// //                   <button
// //                     onClick={handleSave}
// //                     disabled={loading || !fromDate || !toDate}
// //                     className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
// //                   >
// //                     {loading ? "⏳ Saving..." : "💾 Save New Slot"}
// //                   </button>
// //                 )}

// //                 <button
// //                   onClick={onClose}
// //                   disabled={loading}
// //                   className="w-full bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition disabled:opacity-50"
// //                 >
// //                   Close
// //                 </button>
// //               </div>

// //               {message && (
// //                 <div className={`text-sm text-center p-3 rounded-lg ${
// //                   message.includes("✅") || message.includes("🔄") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
// //                 }`}>
// //                   {message}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// // export default AvailabilityDateTimeModal;







// import React, { useState, useEffect } from "react";
// import { X, Calendar, ChevronLeft, ChevronRight, Edit2, Trash2, MoreVertical, RefreshCw, List, CalendarDays, Eye } from "lucide-react";

// // ==========================================
// // REAL BACKEND API CONFIGURATION
// // ==========================================
// const API_BASE_URL = "http://3.110.122.127:3000";

// // Real API Service with all endpoints
// const notAvailabilityAPI = {
//   getVehicleAvailability: async (vehicleId: string, vehicleType: string, startDate: string, endDate: string) => {
//     console.log("🌐 API: getVehicleAvailability", { vehicleId, vehicleType, startDate, endDate });
    
//     try {
//       const url = `${API_BASE_URL}/getVehicleAvailability?VechileId=${vehicleId}&vechileType=${vehicleType}&startDate=${startDate}&endDate=${endDate}`;
      
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("❌ API Error Response:", errorText);
//         throw new Error(`API Error: ${response.status} - ${errorText}`);
//       }
      
//       const result = await response.json();
//       console.log("✅ API Response:", result);
      
//       if (result.success && Array.isArray(result.data)) {
//         return result.data;
//       } else if (Array.isArray(result)) {
//         return result;
//       } else if (result.data) {
//         return Array.isArray(result.data) ? result.data : [result.data];
//       }
      
//       return [];
//     } catch (error) {
//       console.error("❌ getVehicleAvailability error:", error);
//       throw error;
//     }
//   },
  
//   createNotAvailability: async (payload: any) => {
//     console.log("🌐 API: createNotAvailability", payload);
    
//     try {
//       const formData = new URLSearchParams();
//       formData.append("userId", payload.userId);
//       formData.append("vechileType", payload.vechileType);
//       formData.append("VechileId", payload.VechileId);
//       formData.append("fromDate", payload.fromDate);
//       formData.append("toDate", payload.toDate);
//       formData.append("fromTime", payload.fromTime);
//       formData.append("toTime", payload.toTime);
//       formData.append("isNotAvailable", String(payload.isNotAvailable));
      
//       const response = await fetch(`${API_BASE_URL}/createNotAvailability`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: formData.toString()
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("❌ API Error Response:", errorText);
//         throw new Error(`API Error: ${response.status} - ${errorText}`);
//       }
      
//       const result = await response.json();
//       console.log("✅ Create Response:", result);
      
//       return { success: true, data: result.data || result };
//     } catch (error) {
//       console.error("❌ createNotAvailability error:", error);
//       throw error;
//     }
//   },
  
//   updateNotAvailability: async (id: string, payload: any) => {
//     console.log("🌐 API: updateNotAvailability", { id, payload });
    
//     try {
//       const formData = new URLSearchParams();
//       if (payload.userId) formData.append("userId", payload.userId);
//       formData.append("vechileType", payload.vechileType);
//       formData.append("VechileId", payload.VechileId);
//       formData.append("fromDate", payload.fromDate);
//       formData.append("toDate", payload.toDate);
//       formData.append("fromTime", payload.fromTime);
//       formData.append("toTime", payload.toTime);
//       formData.append("isNotAvailable", String(payload.isNotAvailable));
      
//       const response = await fetch(`${API_BASE_URL}/updateNotAvailability/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: formData.toString()
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("❌ API Error Response:", errorText);
//         throw new Error(`API Error: ${response.status} - ${errorText}`);
//       }
      
//       const result = await response.json();
//       console.log("✅ Update Response:", result);
      
//       return { success: true, data: result.data || result };
//     } catch (error) {
//       console.error("❌ updateNotAvailability error:", error);
//       throw error;
//     }
//   },
  
//   deleteNotAvailability: async (id: string) => {
//     console.log("🌐 API: deleteNotAvailability", id);
    
//     try {
//       const response = await fetch(`${API_BASE_URL}/deleteNotAvailability/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("❌ API Error Response:", errorText);
//         throw new Error(`API Error: ${response.status} - ${errorText}`);
//       }
      
//       const result = await response.json();
//       console.log("✅ Delete Response:", result);
      
//       return { success: true, data: result };
//     } catch (error) {
//       console.error("❌ deleteNotAvailability error:", error);
//       throw error;
//     }
//   }
// };

// // ==========================================
// // TYPE DEFINITIONS
// // ==========================================
// interface AvailabilityDateTimeModalProps {
//   isOpen?: boolean;
//   onClose?: () => void;
//   onConfirm?: (
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string,
//     availability: string
//   ) => void;
//   userId?: string;
//   VechileId?: string;
//   vehicleType?: "Car" | "Bike" | "Auto";
//   startDate?: string;
//   endDate?: string;
// }

// interface MonthStatistics {
//   blocked: number;
//   available: number;
//   total: number;
// }

// interface DateHistoryEntry {
//   status: 'available' | 'blocked';
//   time: string;
//   slotId: string;
//   slot: any;
// }

// // ==========================================
// // MAIN COMPONENT
// // ==========================================
// const AvailabilityDateTimeModal: React.FC<AvailabilityDateTimeModalProps> = ({
//   isOpen = true,
//   onClose = () => {},
//   onConfirm,
//   userId = "68f32259cea8a9fa88029262",
//   VechileId = "690c7181a8ed58d38fae262d",
//   vehicleType = "Bike",
//   startDate,
//   endDate
// }) => {
//   // ==========================================
//   // STATE MANAGEMENT
//   // ==========================================
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
//   const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
//   const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);
//   const [startTime, setStartTime] = useState("06:00");
//   const [endTime, setEndTime] = useState("18:00");
//   const [availability, setAvailability] = useState("notAvailable");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [existingSlots, setExistingSlots] = useState<any[]>([]);
//   const [showOptionsMenu, setShowOptionsMenu] = useState(false);
//   const [editingSlot, setEditingSlot] = useState<any>(null);
//   const [selectedSlotForAction, setSelectedSlotForAction] = useState<any>(null);
//   const [selectedDatesToRemove, setSelectedDatesToRemove] = useState<Date[]>([]);
  
//   // NEW STATES FOR ENHANCED FEATURES
//   const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
//   const [showHistoryPanel, setShowHistoryPanel] = useState(true);
//   const [dateHistoryMap, setDateHistoryMap] = useState<Map<string, DateHistoryEntry>>(new Map());
//   const [monthStats, setMonthStats] = useState<MonthStatistics>({ blocked: 0, available: 0, total: 0 });
//   const [allMonthsSlots, setAllMonthsSlots] = useState<any[]>([]);
//   const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
//   const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

//   // ==========================================
//   // EFFECTS
//   // ==========================================
  
//   // Load slots with adjacent months context - ONLY when modal opens or vehicle changes
//   useEffect(() => {
//     if (isOpen) {
//       loadSlotsWithContext();
//     }
//   }, [isOpen, VechileId, vehicleType]);

//   // Reload slots when month changes (but without full context reload)
//   useEffect(() => {
//     if (isOpen) {
//       loadSlotsForCurrentMonth();
//     }
//   }, [currentMonth]);

//   // Calculate month statistics whenever slots change
//   useEffect(() => {
//     calculateMonthStatistics();
//     buildDateHistoryMap();
//   }, [existingSlots, currentMonth]);

//   // Handle click outside for options menu
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       if (showOptionsMenu && !target.closest('.options-menu-container')) {
//         setShowOptionsMenu(false);
//       }
//     };

//     if (showOptionsMenu) {
//       document.addEventListener('click', handleClickOutside);
//       return () => document.removeEventListener('click', handleClickOutside);
//     }
//   }, [showOptionsMenu]);

//   // ==========================================
//   // ENHANCED API FUNCTIONS
//   // ==========================================
  
//   // Load slots for current month plus adjacent months for context
//   const loadSlotsWithContext = async () => {
//     try {
//       setLoading(true);

//       const year = currentMonth.getFullYear();
//       const month = currentMonth.getMonth();
      
//       // Current month
//       const currentStart = new Date(year, month, 1).toISOString().split("T")[0];
//       const currentEnd = new Date(year, month + 1, 0).toISOString().split("T")[0];
      
//       // Previous month
//       const prevMonth = new Date(year, month - 1, 1);
//       const prevStart = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 1).toISOString().split("T")[0];
//       const prevEnd = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).toISOString().split("T")[0];
      
//       // Next month
//       const nextMonth = new Date(year, month + 1, 1);
//       const nextStart = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1).toISOString().split("T")[0];
//       const nextEnd = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).toISOString().split("T")[0];

//       console.log("📅 Loading slots for 3 months:", { prevStart, currentStart, nextStart });

//       // Load all three months in parallel
//       const [prevSlots, currentSlots, nextSlots] = await Promise.all([
//         notAvailabilityAPI.getVehicleAvailability(VechileId, vehicleType, prevStart, prevEnd).catch(() => []),
//         notAvailabilityAPI.getVehicleAvailability(VechileId, vehicleType, currentStart, currentEnd).catch(() => []),
//         notAvailabilityAPI.getVehicleAvailability(VechileId, vehicleType, nextStart, nextEnd).catch(() => [])
//       ]);

//       const allSlots = [...prevSlots, ...currentSlots, ...nextSlots];
      
//       console.log("✅ Loaded total slots across 3 months:", allSlots.length);
//       console.log("📊 Current month slots:", currentSlots.length);
      
//       // CRITICAL: Update both states to ensure persistence
//       setAllMonthsSlots(allSlots);
//       setExistingSlots(currentSlots || []);
      
//       // Force rebuild of date history map
//       buildDateHistoryMapFromSlots(allSlots);
      
//     } catch (error) {
//       console.error("❌ Error loading slots:", error);
//       setMessage("⚠️ Could not load existing slots. Check console for details.");
//       setExistingSlots([]);
//       setAllMonthsSlots([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadSlotsForCurrentMonth = async () => {
//     try {
//       setLoading(true);

//       const year = currentMonth.getFullYear();
//       const month = currentMonth.getMonth();
      
//       const startDate = new Date(year, month, 1).toISOString().split("T")[0];
//       const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];

//       console.log("📅 Loading slots for current month:", { startDate, endDate, VechileId, vehicleType });

//       const slots = await notAvailabilityAPI.getVehicleAvailability(
//         VechileId,
//         vehicleType,
//         startDate,
//         endDate
//       );

//       console.log("✅ Loaded current month slots:", slots.length);
      
//       // Update current month slots
//       setExistingSlots(slots || []);
      
//       // Also update allMonthsSlots to include current month data
//       setAllMonthsSlots(prev => {
//         const filtered = prev.filter(slot => {
//           const slotDate = new Date(slot.fromDate.split('T')[0]);
//           const slotMonth = slotDate.getMonth();
//           const slotYear = slotDate.getFullYear();
//           return !(slotMonth === month && slotYear === year);
//         });
//         return [...filtered, ...(slots || [])];
//       });
      
//     } catch (error) {
//       console.error("❌ Error loading slots:", error);
//       setMessage("⚠️ Could not load existing slots. Check console for details.");
//       setExistingSlots([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = () => {
//     setMessage("🔄 Refreshing...");
//     loadSlotsWithContext();
//     setTimeout(() => setMessage(""), 2000);
//   };

//   // ==========================================
//   // NEW HELPER FUNCTIONS FOR ENHANCED FEATURES
//   // ==========================================
  
//   // Build comprehensive date history map from provided slots
//   const buildDateHistoryMapFromSlots = (slots: any[]) => {
//     const map = new Map<string, DateHistoryEntry>();
    
//     slots.forEach(slot => {
//       const fromDate = new Date(slot.fromDate.split('T')[0]);
//       const toDate = new Date(slot.toDate.split('T')[0]);
      
//       let currentDate = new Date(fromDate);
//       while (currentDate <= toDate) {
//         const dateKey = formatDateForAPI(currentDate);
//         map.set(dateKey, {
//           status: slot.isNotAvailable ? 'blocked' : 'available',
//           time: `${slot.fromTime} - ${slot.toTime}`,
//           slotId: getSlotId(slot),
//           slot: slot
//         });
//         currentDate.setDate(currentDate.getDate() + 1);
//       }
//     });
    
//     console.log("🗺️ Built date history map with", map.size, "dates");
//     setDateHistoryMap(map);
//   };
  
//   // Build comprehensive date history map
//   const buildDateHistoryMap = () => {
//     buildDateHistoryMapFromSlots(allMonthsSlots);
//   };

//   // Calculate statistics for current month
//   const calculateMonthStatistics = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();
//     const monthStart = new Date(year, month, 1);
//     const monthEnd = new Date(year, month + 1, 0);
    
//     let blocked = 0;
//     let available = 0;
    
//     existingSlots.forEach(slot => {
//       const fromDate = new Date(slot.fromDate.split('T')[0]);
//       const toDate = new Date(slot.toDate.split('T')[0]);
      
//       // Calculate overlap with current month
//       const overlapStart = fromDate > monthStart ? fromDate : monthStart;
//       const overlapEnd = toDate < monthEnd ? toDate : monthEnd;
      
//       if (overlapStart <= overlapEnd) {
//         const days = Math.ceil((overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        
//         if (slot.isNotAvailable) {
//           blocked += days;
//         } else {
//           available += days;
//         }
//       }
//     });
    
//     setMonthStats({
//       blocked,
//       available,
//       total: existingSlots.length
//     });
//   };

//   // Get all marked dates grouped by month
//   const getAllMarkedDatesByMonth = () => {
//     const grouped = new Map<string, any[]>();
    
//     allMonthsSlots.forEach(slot => {
//       const fromDate = new Date(slot.fromDate.split('T')[0]);
//       const monthKey = `${fromDate.getFullYear()}-${String(fromDate.getMonth() + 1).padStart(2, '0')}`;
      
//       if (!grouped.has(monthKey)) {
//         grouped.set(monthKey, []);
//       }
//       grouped.get(monthKey)!.push(slot);
//     });
    
//     return Array.from(grouped.entries()).sort((a, b) => b[0].localeCompare(a[0]));
//   };

//   // ==========================================
//   // UTILITY FUNCTIONS
//   // ==========================================
  
//   const getSlotId = (slot: any) => {
//     if (!slot) return null;
//     return slot._id || slot.id || slot.notAvailabilityId || slot.notAvailabilityID || null;
//   };

//   const formatDateForAPI = (date: Date | null): string => {
//     if (!date) return "";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const formatDateForDisplay = (date: Date | null): string => {
//     if (!date) return "Select";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}/${month}/${day}`;
//   };

//   const formatTimeForAPI = (time: string): string => {
//     const [hours, minutes] = time.split(":");
//     return `${parseInt(hours)}.${minutes}`;
//   };

//   const monthName = currentMonth.toLocaleDateString("en-US", { month: "short", year: "numeric" });
//   const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   const daysInMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth() + 1,
//     0
//   ).getDate();
  
//   const firstDayOfMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth(),
//     1
//   ).getDay();

//   const previousMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
//     setHoveredDate(null);
//   };
  
//   const nextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
//     setHoveredDate(null);
//   };

//   // ==========================================
//   // DATE INTERACTION HANDLERS
//   // ==========================================
  
//   const handleDateClick = (date: Date) => {
//     if (editingSlot) {
//       const dateTime = date.getTime();
//       const isAlreadyMarkedForRemoval = selectedDatesToRemove.some(d => d.getTime() === dateTime);
      
//       if (isAlreadyMarkedForRemoval) {
//         setSelectedDatesToRemove(selectedDatesToRemove.filter(d => d.getTime() !== dateTime));
//         setMessage("✅ Date unmarked for removal");
//       } else {
//         setSelectedDatesToRemove([...selectedDatesToRemove, date]);
//         setMessage("🗑️ Date marked for removal - it will be excluded when you update");
//       }
//       setTimeout(() => setMessage(""), 2000);
//       return;
//     }
    
//     if (activeInput === "start") {
//       setSelectedStartDate(date);
//       setActiveInput("end");
//     } else if (activeInput === "end") {
//       if (selectedStartDate && date < selectedStartDate) {
//         setMessage("⚠️ End date cannot be before start date");
//         setTimeout(() => setMessage(""), 3000);
//         return;
//       }
//       setSelectedEndDate(date);
//       setActiveInput(null);
//     }
//   };

//   const handleDateHover = (date: Date | null, event?: React.MouseEvent) => {
//     setHoveredDate(date);
//     if (date && event) {
//       const rect = event.currentTarget.getBoundingClientRect();
//       setTooltipPosition({
//         x: rect.left + rect.width / 2,
//         y: rect.top - 10
//       });
//     } else {
//       setTooltipPosition(null);
//     }
//   };

//   const isDateSelected = (date: Date) => {
//     return (
//       (selectedStartDate && selectedStartDate.getTime() === date.getTime()) ||
//       (selectedEndDate && selectedEndDate.getTime() === date.getTime())
//     );
//   };

//   const isDateInRange = (date: Date) => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     return date.getTime() >= selectedStartDate.getTime() && date.getTime() <= selectedEndDate.getTime();
//   };

//   const isDateMarkedForRemoval = (date: Date) => {
//     return selectedDatesToRemove.some(d => d.getTime() === date.getTime());
//   };

//   const getDateSlotStatus = (date: Date): { blocked: boolean; available: boolean; slot: any | null } => {
//     const normalizedDate = new Date(date);
//     normalizedDate.setHours(0, 0, 0, 0);
    
//     for (const slot of existingSlots) {
//       const fromDate = new Date(slot.fromDate.split('T')[0]);
//       fromDate.setHours(0, 0, 0, 0);
      
//       const toDate = new Date(slot.toDate.split('T')[0]);
//       toDate.setHours(0, 0, 0, 0);
      
//       if (normalizedDate >= fromDate && normalizedDate <= toDate) {
//         return {
//           blocked: slot.isNotAvailable,
//           available: !slot.isNotAvailable,
//           slot: slot
//         };
//       }
//     }
    
//     return { blocked: false, available: false, slot: null };
//   };

//   const isPastDate = (date: Date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const checkDate = new Date(date);
//     checkDate.setHours(0, 0, 0, 0);
//     return checkDate < today;
//   };

//   // ==========================================
//   // CALENDAR RENDERING
//   // ==========================================
  
//   const renderCalendarDays = () => {
//     const days = [];
//     const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

//     for (let i = 0; i < startDay; i++) days.push(<div key={`empty-${i}`} />);

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//       const isSelected = isDateSelected(date);
//       const inRange = isDateInRange(date);
//       const past = isPastDate(date);
//       const markedForRemoval = isDateMarkedForRemoval(date);
      
//       const slotStatus = getDateSlotStatus(date);
      
//       const isPermanentlyBlocked = slotStatus.blocked;
//       const isPermanentlyAvailable = slotStatus.available;
      
//       const showBlockedStyle = isPermanentlyBlocked || (inRange && availability === "notAvailable" && !isPermanentlyAvailable);
//       const showAvailableStyle = isPermanentlyAvailable || (inRange && availability === "available" && !isPermanentlyBlocked);
      
//       const isInEditingSlot = editingSlot && slotStatus.slot && getSlotId(slotStatus.slot) === getSlotId(editingSlot);
//       const shouldShowAsNormal = markedForRemoval && editingSlot;

//       days.push(
//         <button
//           key={day}
//           disabled={past}
//           onMouseEnter={(e) => !past && slotStatus.slot && handleDateHover(date, e)}
//           onMouseLeave={() => handleDateHover(null)}
//           className={`py-2 rounded-full transition w-full relative ${
//             past
//               ? "text-gray-300 cursor-not-allowed bg-gray-100"
//               : shouldShowAsNormal
//               ? "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
//               : showBlockedStyle
//               ? "bg-red-50 border-2 border-red-300"
//               : showAvailableStyle
//               ? "bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white"
//               : inRange
//               ? "bg-blue-100 text-blue-700"
//               : isInEditingSlot
//               ? "ring-1 ring-yellow-400"
//               : "text-gray-700 hover:bg-blue-50"
//           }`}
//           onClick={() => !past && handleDateClick(date)}
//         >
//           <span className={showBlockedStyle && !shouldShowAsNormal ? "text-gray-800 font-bold relative z-10" : ""}>
//             {day}
//           </span>
//           {showBlockedStyle && !shouldShowAsNormal && (
//             <>
//               <svg
//                 className="absolute inset-0 w-full h-full pointer-events-none z-20"
//                 viewBox="0 0 40 40"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <line 
//                   x1="4" y1="4" x2="36" y2="36" 
//                   stroke="#dc2626" 
//                   strokeWidth="3" 
//                   strokeLinecap="round" 
//                 />
//                 <line 
//                   x1="36" y1="4" x2="4" y2="36" 
//                   stroke="#dc2626" 
//                   strokeWidth="3" 
//                   strokeLinecap="round" 
//                 />
//               </svg>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white z-30"></div>
//             </>
//           )}
//         </button>
//       );
//     }
//     return days;
//   };

//   const generateTimeOptions = () => {
//     const options = [];
//     for (let h = 0; h < 24; h++) {
//       for (let m = 0; m < 60; m += 30) {
//         const hour = h.toString().padStart(2, "0");
//         const minute = m.toString().padStart(2, "0");
//         const time = `${hour}:${minute}`;
//         const period = h >= 12 ? "PM" : "AM";
//         const displayHour = h % 12 || 12;
//         options.push({ value: time, label: `${displayHour}:${minute.padStart(2, "0")} ${period}` });
//       }
//     }
//     return options;
//   };

//   const timeOptions = generateTimeOptions();

//   // ==========================================
//   // SLOT MANAGEMENT HANDLERS
//   // ==========================================
  
//   const handleEditSlot = () => {
//     if (!selectedSlotForAction) return;
    
//     console.log("✏️ Editing slot:", selectedSlotForAction);
    
//     setEditingSlot(selectedSlotForAction);
//     setSelectedStartDate(new Date(selectedSlotForAction.fromDate.split('T')[0]));
//     setSelectedEndDate(new Date(selectedSlotForAction.toDate.split('T')[0]));
//     setStartTime(selectedSlotForAction.fromTime || "06:00");
//     setEndTime(selectedSlotForAction.toTime || "18:00");
//     setAvailability(selectedSlotForAction.isNotAvailable ? "notAvailable" : "available");
//     setActiveInput(null);
//     setSelectedDatesToRemove([]);
//     setShowOptionsMenu(false);
//     setSelectedSlotForAction(null);
//     setMessage("✏️ Edit Mode Active: Click on any date in the slot to remove it. Click again to undo removal.");
//   };

//   const handleDeleteSlot = async () => {
//     if (!selectedSlotForAction) return;

//     const slotId = getSlotId(selectedSlotForAction);
    
//     if (!slotId) {
//       setMessage("❌ Cannot delete: Invalid slot ID");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }
    
//     if (!window.confirm(`🗑️ Are you sure you want to delete this slot?\n\nDate Range: ${new Date(selectedSlotForAction.fromDate).toLocaleDateString()} - ${new Date(selectedSlotForAction.toDate).toLocaleDateString()}\n\nThis action cannot be undone.`)) {
//       setShowOptionsMenu(false);
//       setSelectedSlotForAction(null);
//       return;
//     }

//     setLoading(true);
//     setMessage("🗑️ Deleting slot...");
//     setShowOptionsMenu(false);

//     console.log("🗑️ Deleting slot ID:", slotId);

//     try {
//       const response = await notAvailabilityAPI.deleteNotAvailability(slotId);
//       console.log("✅ Delete response:", response);
      
//       setMessage("✅ Slot deleted successfully! Calendar updated.");
      
//       if (getSlotId(editingSlot) === slotId) {
//         setEditingSlot(null);
//         setSelectedStartDate(null);
//         setSelectedEndDate(null);
//         setStartTime("06:00");
//         setEndTime("18:00");
//         setAvailability("notAvailable");
//         setSelectedDatesToRemove([]);
//       }
      
//       await loadSlotsWithContext();
      
//       setTimeout(() => setMessage(""), 3000);
//     } catch (error: any) {
//       console.error("❌ Delete error:", error);
//       const errorMsg = error?.message || "Failed to delete slot";
//       setMessage(`❌ Delete failed: ${errorMsg}`);
      
//       setTimeout(() => setMessage(""), 5000);
//     } finally {
//       setLoading(false);
//       setSelectedSlotForAction(null);
//     }
//   };

//   const handleCancelEdit = () => {
//     console.log("❌ Cancelled edit mode");
//     setEditingSlot(null);
//     setSelectedStartDate(null);
//     setSelectedEndDate(null);
//     setStartTime("06:00");
//     setEndTime("18:00");
//     setAvailability("notAvailable");
//     setSelectedDatesToRemove([]);
//     setMessage("");
//   };

//   const handleOptionsMenuClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
    
//     if (!selectedSlotForAction && existingSlots.length > 0) {
//       setSelectedSlotForAction(existingSlots[0]);
//     }
    
//     setShowOptionsMenu(!showOptionsMenu);
//   };

//   const handleSlotSelection = (slot: any) => {
//     setSelectedSlotForAction(slot);
//     setShowOptionsMenu(true);
//   };

//   // ==========================================
//   // MAIN CONFIRM HANDLER (CREATE/UPDATE)
//   // ==========================================
  
//   const handleConfirm = async () => {
//     if (editingSlot) {
//       if (selectedDatesToRemove.length === 0) {
//         setMessage("⚠️ No dates marked for removal. Click on colored dates to remove them, or cancel edit mode.");
//         setTimeout(() => setMessage(""), 3000);
//         return;
//       }

//       setLoading(true);
//       setMessage("🔄 Processing date removals...");

//       try {
//         const slotId = getSlotId(editingSlot);
        
//         if (!slotId) {
//           throw new Error("Invalid slot ID for editing");
//         }
        
//         const originalFromDate = new Date(editingSlot.fromDate.split('T')[0]);
//         originalFromDate.setHours(0, 0, 0, 0);
//         const originalToDate = new Date(editingSlot.toDate.split('T')[0]);
//         originalToDate.setHours(0, 0, 0, 0);
        
//         const removalSet = new Set(selectedDatesToRemove.map(d => {
//           const normalized = new Date(d);
//           normalized.setHours(0, 0, 0, 0);
//           return normalized.getTime();
//         }));
        
//         const allDates: Date[] = [];
//         const currentDate = new Date(originalFromDate);
//         while (currentDate <= originalToDate) {
//           allDates.push(new Date(currentDate));
//           currentDate.setDate(currentDate.getDate() + 1);
//         }
        
//         const remainingDates = allDates.filter(d => {
//           const normalized = new Date(d);
//           normalized.setHours(0, 0, 0, 0);
//           return !removalSet.has(normalized.getTime());
//         });
        
//         console.log("📊 Original dates:", allDates.length);
//         console.log("🗑️ Dates to remove:", selectedDatesToRemove.length);
//         console.log("✅ Remaining dates:", remainingDates.length);
        
//         if (remainingDates.length === 0) {
//           console.log("🗑️ All dates removed - deleting slot");
//           await notAvailabilityAPI.deleteNotAvailability(slotId);
//           setMessage("✅ All dates removed! Slot deleted successfully.");
//         } else {
//           const ranges: { start: Date; end: Date }[] = [];
//           let rangeStart = remainingDates[0];
//           let rangeEnd = remainingDates[0];
          
//           for (let i = 1; i < remainingDates.length; i++) {
//             const prevDate = remainingDates[i - 1];
//             const currDate = remainingDates[i];
//             const dayDiff = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
            
//             if (dayDiff === 1) {
//               rangeEnd = currDate;
//             } else {
//               ranges.push({ start: rangeStart, end: rangeEnd });
//               rangeStart = currDate;
//               rangeEnd = currDate;
//             }
//           }
//           ranges.push({ start: rangeStart, end: rangeEnd });
          
//           console.log("📦 Split into ranges:", ranges.length);
          
//           const firstRange = ranges[0];
//           const updatePayload = {
//             userId,
//             VechileId,
//             vechileType: vehicleType,
//             fromDate: formatDateForAPI(firstRange.start),
//             toDate: formatDateForAPI(firstRange.end),
//             fromTime: formatTimeForAPI(startTime),
//             toTime: formatTimeForAPI(endTime),
//             isNotAvailable: availability === "notAvailable",
//           };
          
//           console.log("🔄 Updating first range:", updatePayload);
//           await notAvailabilityAPI.updateNotAvailability(slotId, updatePayload);
          
//           for (let i = 1; i < ranges.length; i++) {
//             const range = ranges[i];
//             const createPayload = {
//               userId,
//               VechileId,
//               vechileType: vehicleType,
//               fromDate: formatDateForAPI(range.start),
//               toDate: formatDateForAPI(range.end),
//               fromTime: formatTimeForAPI(startTime),
//               toTime: formatTimeForAPI(endTime),
//               isNotAvailable: availability === "notAvailable",
//             };
//             console.log("➕ Creating new range:", createPayload);
//             await notAvailabilityAPI.createNotAvailability(createPayload);
//           }
          
//           setMessage(`✅ ${selectedDatesToRemove.length} date(s) removed successfully! ${ranges.length > 1 ? `Split into ${ranges.length} separate slots.` : ''}`);
//         }
        
//         // CRITICAL: Reload all data to ensure visual persistence
//         await loadSlotsWithContext();
        
//         setEditingSlot(null);
//         setSelectedStartDate(null);
//         setSelectedEndDate(null);
//         setStartTime("06:00");
//         setEndTime("18:00");
//         setAvailability("notAvailable");
//         setSelectedDatesToRemove([]);
        
//         setTimeout(() => setMessage(""), 4000);
//       } catch (error: any) {
//         console.error("❌ Update error:", error);
//         const errorMsg = error?.message || "Failed to update slot";
//         setMessage(`❌ ${errorMsg}. Check console for details.`);
//         setTimeout(() => setMessage(""), 5000);
//       } finally {
//         setLoading(false);
//       }
//       return;
//     }

//     // ===== CREATE NEW SLOT =====
//     if (!selectedStartDate || !selectedEndDate) {
//       setMessage("⚠️ Please select both start and end dates");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }

//     const formattedStartDate = formatDateForAPI(selectedStartDate);
//     const formattedEndDate = formatDateForAPI(selectedEndDate);

//     if (onConfirm) {
//       onConfirm(formattedStartDate, formattedEndDate, startTime, endTime, availability);
//       return;
//     }

//     setLoading(true);
//     setMessage("💾 Saving availability slot...");

//     const payload = {
//       userId,
//       VechileId,
//       vechileType: vehicleType,
//       fromDate: formattedStartDate,
//       toDate: formattedEndDate,
//       fromTime: formatTimeForAPI(startTime),
//       toTime: formatTimeForAPI(endTime),
//       isNotAvailable: availability === "notAvailable",
//     };

//     console.log("💾 Creating new slot with payload:", payload);

//     try {
//       const response = await notAvailabilityAPI.createNotAvailability(payload);
//       console.log("✅ Create response:", response);
      
//       // Show success message
//       setMessage(availability === "notAvailable" 
//         ? "✅ Dates blocked successfully! Red marks are now permanent and visible." 
//         : "✅ Dates marked as available! Blue marks are now permanent and visible.");

//       // CRITICAL: Immediately add to local state for instant visual feedback
//       const newSlot = {
//         ...payload,
//         _id: response.data?._id || response.data?.id || Date.now().toString(),
//         fromDate: formattedStartDate,
//         toDate: formattedEndDate,
//         fromTime: formatTimeForAPI(startTime),
//         toTime: formatTimeForAPI(endTime),
//         isNotAvailable: availability === "notAvailable"
//       };
      
//       console.log("📌 Adding new slot to local state:", newSlot);
      
//       // Update both states immediately
//       setExistingSlots(prev => [...prev, newSlot]);
//       setAllMonthsSlots(prev => [...prev, newSlot]);
      
//       // Rebuild date history map with new slot
//       buildDateHistoryMapFromSlots([...allMonthsSlots, newSlot]);
      
//       // Then reload from backend to sync with server (background refresh)
//       setTimeout(() => {
//         loadSlotsWithContext();
//       }, 500);

//       // Reset form
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       setStartTime("06:00");
//       setEndTime("18:00");
//       setAvailability("notAvailable");
      
//       setTimeout(() => setMessage(""), 4000);
//     } catch (error: any) {
//       console.error("❌ Save error:", error);
//       const errorMsg = error?.message || "Failed to save slot";
//       setMessage(`❌ ${errorMsg}. Check console for details.`);
//       setTimeout(() => setMessage(""), 5000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // RENDER LIST VIEW
//   // ==========================================
  
//   const renderListView = () => {
//     const groupedSlots = getAllMarkedDatesByMonth();
    
//     if (groupedSlots.length === 0) {
//       return (
//         <div className="text-center py-12">
//           <CalendarDays size={48} className="mx-auto text-gray-300 mb-4" />
//           <p className="text-gray-500 font-medium">No marked dates yet</p>
//           <p className="text-sm text-gray-400 mt-2">Switch to calendar view to start marking dates</p>
//         </div>
//       );
//     }
    
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-bold text-gray-900">All Marked Dates ({allMonthsSlots.length} slots)</h3>
//           <div className="text-sm text-gray-600">
//             🔴 {allMonthsSlots.filter(s => s.isNotAvailable).length} blocked · 
//             🔵 {allMonthsSlots.filter(s => !s.isNotAvailable).length} available
//           </div>
//         </div>
        
//         {groupedSlots.map(([monthKey, slots]) => {
//           const [year, month] = monthKey.split('-');
//           const monthDate = new Date(parseInt(year), parseInt(month) - 1, 1);
//           const monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
          
//           return (
//             <div key={monthKey} className="border rounded-lg overflow-hidden">
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 border-b">
//                 <h4 className="font-bold text-gray-800">{monthName}</h4>
//                 <p className="text-xs text-gray-600 mt-1">
//                   {slots.length} slot{slots.length !== 1 ? 's' : ''} marked
//                 </p>
//               </div>
              
//               <div className="divide-y">
//                 {slots.map((slot, idx) => {
//                   const fromDate = new Date(slot.fromDate.split('T')[0]);
//                   const toDate = new Date(slot.toDate.split('T')[0]);
//                   const dayCount = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                  
//                   return (
//                     <div
//                       key={idx}
//                       className={`p-4 hover:bg-gray-50 cursor-pointer transition ${
//                         selectedSlotForAction === slot ? 'bg-blue-50 border-l-4 border-blue-500' : ''
//                       }`}
//                       onClick={() => handleSlotSelection(slot)}
//                     >
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <span className={`text-lg ${slot.isNotAvailable ? '' : ''}`}>
//                               {slot.isNotAvailable ? '🔴' : '🔵'}
//                             </span>
//                             <span className="font-semibold text-gray-900">
//                               {slot.isNotAvailable ? 'Blocked' : 'Available'}
//                             </span>
//                             <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
//                               {dayCount} day{dayCount !== 1 ? 's' : ''}
//                             </span>
//                           </div>
                          
//                           <div className="text-sm text-gray-700 space-y-1">
//                             <div className="flex items-center gap-2">
//                               <Calendar size={14} className="text-gray-400" />
//                               <span>
//                                 {fromDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                                 {' '}-{' '}
//                                 {toDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                               </span>
//                             </div>
                            
//                             <div className="text-xs text-gray-500">
//                               Time: {slot.fromTime} - {slot.toTime}
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="flex gap-2">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setSelectedSlotForAction(slot);
//                               handleEditSlot();
//                             }}
//                             className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600"
//                             title="Edit"
//                           >
//                             <Edit2 size={16} />
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setSelectedSlotForAction(slot);
//                               handleDeleteSlot();
//                             }}
//                             className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
//                             title="Delete"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // ==========================================
//   // RENDER TOOLTIP
//   // ==========================================
  
//   const renderTooltip = () => {
//     if (!hoveredDate || !tooltipPosition) return null;
    
//     const slotStatus = getDateSlotStatus(hoveredDate);
//     if (!slotStatus.slot) return null;
    
//     const slot = slotStatus.slot;
//     const fromDate = new Date(slot.fromDate.split('T')[0]);
//     const toDate = new Date(slot.toDate.split('T')[0]);
    
//     return (
//       <div
//         className="fixed z-50 pointer-events-none"
//         style={{
//           left: tooltipPosition.x,
//           top: tooltipPosition.y,
//           transform: 'translate(-50%, -100%)'
//         }}
//       >
//         <div className="bg-gray-900 text-white text-xs rounded-lg shadow-xl p-3 mb-2 min-w-[200px]">
//           <div className="font-bold mb-2 flex items-center gap-2">
//             {slot.isNotAvailable ? '🔴 Blocked' : '🔵 Available'}
//           </div>
//           <div className="space-y-1 text-gray-300">
//             <div>📅 {hoveredDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
//             <div>🕐 {slot.fromTime} - {slot.toTime}</div>
//             <div className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-700">
//               Range: {fromDate.toLocaleDateString()} - {toDate.toLocaleDateString()}
//             </div>
//           </div>
//           <div className="flex gap-2 mt-2 pt-2 border-t border-gray-700">
//             <button
//               onClick={() => {
//                 setSelectedSlotForAction(slot);
//                 handleEditSlot();
//               }}
//               className="text-[10px] text-blue-300 hover:text-blue-200"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => {
//                 setSelectedSlotForAction(slot);
//                 handleDeleteSlot();
//               }}
//               className="text-[10px] text-red-300 hover:text-red-200"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//         <div 
//           className="w-3 h-3 bg-gray-900 transform rotate-45 mx-auto"
//           style={{ marginTop: '-6px' }}
//         />
//       </div>
//     );
//   };

//   // ==========================================
//   // RENDER
//   // ==========================================
  
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl p-6 relative max-h-[90vh] overflow-y-auto">
//         {/* ========== HEADER ========== */}
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//               <Calendar size={24} className="text-blue-600" />
//               {editingSlot ? "Edit Availability Slot" : "Manage Vehicle Availability"}
//             </h2>
//             {/* Statistics Row */}
//             <div className="flex items-center gap-4 mt-2 text-sm">
//               <div className="flex items-center gap-2">
//                 <span className="text-red-600 font-bold">🔴 {monthStats.blocked}</span>
//                 <span className="text-gray-500">blocked</span>
//               </div>
//               <div className="w-px h-4 bg-gray-300" />
//               <div className="flex items-center gap-2">
//                 <span className="text-blue-600 font-bold">🔵 {monthStats.available}</span>
//                 <span className="text-gray-500">available</span>
//               </div>
//               <div className="w-px h-4 bg-gray-300" />
//               <div className="flex items-center gap-2">
//                 <span className="text-gray-700 font-bold">📊 {monthStats.total}</span>
//                 <span className="text-gray-500">total slots</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-2">
//             {/* View Mode Toggle */}
//             <div className="flex bg-gray-100 rounded-lg p-1">
//               <button
//                 onClick={() => setViewMode('calendar')}
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-2 ${
//                   viewMode === 'calendar'
//                     ? 'bg-white text-blue-600 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <CalendarDays size={16} />
//                 Calendar
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-2 ${
//                   viewMode === 'list'
//                     ? 'bg-white text-blue-600 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <List size={16} />
//                 List ({allMonthsSlots.length})
//               </button>
//             </div>
            
//             {/* Refresh Button */}
//             <button 
//               onClick={handleRefresh}
//               disabled={loading}
//               className="p-2 rounded-full hover:bg-gray-100 transition text-gray-600 disabled:opacity-50"
//               title="Refresh slots"
//             >
//               <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
//             </button>
            
//             {/* Options Menu */}
//             {viewMode === 'calendar' && (
//               <div className="relative options-menu-container">
//                 <button 
//                   onClick={handleOptionsMenuClick}
//                   disabled={loading || existingSlots.length === 0}
//                   className="p-2 rounded-full hover:bg-gray-100 transition text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                   title="Slot Actions Menu"
//                 >
//                   <MoreVertical size={20} />
//                 </button>
                
//                 {showOptionsMenu && selectedSlotForAction && (
//                   <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px] overflow-hidden">
//                     <div className="p-3 bg-gray-50 border-b border-gray-200">
//                       <p className="text-xs font-semibold text-gray-700">Selected Slot</p>
//                       <p className="text-[10px] text-gray-600 mt-1">
//                         {new Date(selectedSlotForAction.fromDate).toLocaleDateString()} - {new Date(selectedSlotForAction.toDate).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <button
//                       onClick={handleEditSlot}
//                       disabled={loading}
//                       className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 flex items-center gap-3 text-gray-700 transition disabled:opacity-50"
//                     >
//                       <Edit2 size={16} className="text-blue-600" />
//                       <div>
//                         <div className="font-medium">Edit Slot</div>
//                         <div className="text-[10px] text-gray-500">Change dates, time, or status</div>
//                       </div>
//                     </button>
//                     <div className="border-t border-gray-100" />
//                     <button
//                       onClick={handleDeleteSlot}
//                       disabled={loading}
//                       className="w-full px-4 py-3 text-left text-sm hover:bg-red-50 flex items-center gap-3 text-gray-700 transition disabled:opacity-50"
//                     >
//                       <Trash2 size={16} className="text-red-600" />
//                       <div>
//                         <div className="font-medium">Delete Slot</div>
//                         <div className="text-[10px] text-gray-500">Permanently remove this slot</div>
//                       </div>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Close Button */}
//             <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition text-gray-400 hover:text-gray-600">
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         {/* ========== EDIT MODE BANNER ========== */}
//         {editingSlot && (
//           <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
//             <div className="flex items-start justify-between">
//               <div className="flex-1">
//                 <p className="text-sm text-yellow-900 font-bold mb-2">
//                   ✏️ Edit Mode: Click to Remove Dates
//                 </p>
//                 <p className="text-sm text-yellow-800 mb-2">
//                   Click on any colored date (available/blocked) to remove it:
//                 </p>
//                 <ul className="text-xs text-yellow-700 space-y-1 ml-4 list-disc">
//                   <li>Colored dates (blue or red cross) will become normal/white when clicked</li>
//                   <li>Click again to restore the original status</li>
//                   <li>White dates will be removed from this slot</li>
//                   <li>You can also change times and availability status</li>
//                   <li>Click "Update Slot" to save all changes</li>
//                 </ul>
//                 {selectedDatesToRemove.length > 0 && (
//                   <div className="mt-2 p-2 bg-white border border-gray-300 rounded">
//                     <p className="text-xs font-semibold text-gray-700">
//                       ✓ {selectedDatesToRemove.length} date(s) will be removed (showing as normal/white)
//                     </p>
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={handleCancelEdit}
//                 className="ml-2 text-yellow-600 hover:text-yellow-800"
//                 title="Cancel Edit"
//               >
//                 <X size={18} />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ========== MAIN CONTENT ========== */}
//         {viewMode === 'list' ? (
//           <div className="mt-4">
//             {renderListView()}
//           </div>
//         ) : (
//           <div className="flex flex-col lg:flex-row gap-6">
//             {/* ========== LEFT/CENTER COLUMN: CALENDAR ========== */}
//             <div className="flex-1 space-y-4">
//               {/* Start & End Date Display */}
//               <div className="flex gap-4">
//                 <div className="flex-1 cursor-pointer" onClick={() => !editingSlot && setActiveInput("start")}>
//                   <label className="flex items-center gap-2 text-sm text-gray-500 font-medium">
//                     <Calendar size={20} className="text-gray-400" /> Start Date
//                   </label>
//                   <div
//                     className={`border rounded-lg p-4 text-center text-gray-700 font-semibold text-lg ${
//                       activeInput === "start" ? "ring-2 ring-blue-500" : ""
//                     }`}
//                   >
//                     {formatDateForDisplay(selectedStartDate)}
//                   </div>
//                 </div>

//                 <div className="flex-1 cursor-pointer" onClick={() => !editingSlot && setActiveInput("end")}>
//                   <label className="flex items-center gap-2 text-sm text-gray-500 font-medium">
//                     <Calendar size={20} className="text-gray-400" /> End Date
//                   </label>
//                   <div
//                     className={`border rounded-lg p-4 text-center text-gray-700 font-semibold text-lg ${
//                       activeInput === "end" ? "ring-2 ring-blue-500" : ""
//                     }`}
//                   >
//                     {formatDateForDisplay(selectedEndDate)}
//                   </div>
//                 </div>
//               </div>

//               {/* Calendar */}
//               <div className="border rounded-lg p-4">
//                 {/* Calendar Header with Month Navigation */}
//                 <div className="flex justify-between items-center mb-4">
//                   <button 
//                     onClick={previousMonth} 
//                     disabled={loading} 
//                     className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 transition"
//                   >
//                     <ChevronLeft size={20} />
//                   </button>
                  
//                   <div className="text-center">
//                     <div className="font-bold text-lg">{monthName}</div>
//                     <div className="text-xs text-gray-500 mt-1">
//                       {monthStats.blocked > 0 && <span className="text-red-600">🔴 {monthStats.blocked}</span>}
//                       {monthStats.blocked > 0 && monthStats.available > 0 && <span className="mx-2">·</span>}
//                       {monthStats.available > 0 && <span className="text-blue-600">🔵 {monthStats.available}</span>}
//                     </div>
//                   </div>
                  
//                   <button 
//                     onClick={nextMonth} 
//                     disabled={loading} 
//                     className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 transition"
//                   >
//                     <ChevronRight size={20} />
//                   </button>
//                 </div>

//                 {loading && (
//                   <div className="text-center py-4 text-gray-500">
//                     <RefreshCw size={24} className="animate-spin mx-auto mb-2" />
//                     Loading slots...
//                   </div>
//                 )}

//                 {/* Weekday Headers */}
//                 <div className="grid grid-cols-7 gap-1 mb-2">
//                   {weekDays.map((day) => (
//                     <div key={day} className="text-center text-xs text-gray-500 font-medium">
//                       {day}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Calendar Grid */}
//                 <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
//               </div>

//               {/* Legend */}
//               <div className="space-y-2 text-xs">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] rounded flex items-center justify-center">
//                     <span className="text-[10px] text-white font-bold">15</span>
//                   </div>
//                   <span className="text-gray-600 font-medium">Available for booking (permanent)</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 bg-red-50 border-2 border-red-300 rounded flex items-center justify-center relative">
//                     <span className="text-[10px] text-gray-800 font-bold z-10">20</span>
//                     <svg className="absolute inset-0 w-full h-full" viewBox="0 0 32 32">
//                       <line x1="6" y1="6" x2="26" y2="26" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
//                       <line x1="26" y1="6" x2="6" y2="26" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
//                     </svg>
//                     <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></div>
//                   </div>
//                   <span className="text-gray-600 font-medium">Blocked / Not available (permanent)</span>
//                 </div>
//                 {editingSlot && (
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
//                       <span className="text-xs font-medium text-gray-700">25</span>
//                     </div>
//                     <span className="text-gray-600 font-medium">Will be removed (click to toggle)</span>
//                   </div>
//                 )}
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 bg-white border border-gray-200 rounded shadow-sm flex items-center justify-center">
//                     <span className="text-xs font-medium text-gray-700">25</span>
//                   </div>
//                   <span className="text-gray-600 font-medium">No status set (default)</span>
//                 </div>
//               </div>

//               {/* Info Note */}
//               <div className="space-y-2">
//                 <div className="text-xs text-gray-500 flex items-center gap-2 bg-blue-50 p-3 rounded-lg border border-blue-100">
//                   <span>ℹ️</span>
//                   <span className="font-medium">All markings persist permanently after saving. Hover over colored dates to see details.</span>
//                 </div>
                
//                 {/* Persistence Confirmation */}
//                 {existingSlots.length > 0 && (
//                   <div className="text-xs bg-green-50 p-3 rounded-lg border border-green-200 flex items-start gap-2">
//                     <span className="text-green-600 mt-0.5">✓</span>
//                     <div className="flex-1">
//                       <div className="font-bold text-green-800 mb-1">Data Persisted Successfully</div>
//                       <div className="text-green-700 space-y-1">
//                         <div>• {existingSlots.length} slot{existingSlots.length !== 1 ? 's' : ''} loaded from backend</div>
//                         <div>• All colored dates are saved and will remain visible</div>
//                         <div>• Data persists across page reloads and navigation</div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* ========== RIGHT COLUMN: TIME, OPTIONS & HISTORY ========== */}
//             <div className="w-full lg:w-96 space-y-4">
//               {/* Start Time */}
//               <div>
//                 <label className="text-sm text-gray-500 font-medium">Start Time</label>
//                 <select
//                   value={startTime}
//                   onChange={(e) => setStartTime(e.target.value)}
//                   className="w-full p-3 border rounded-lg bg-white text-gray-900 font-semibold outline-none mt-1"
//                 >
//                   {timeOptions.map((time) => (
//                     <option key={time.value} value={time.value}>
//                       {time.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* End Time */}
//               <div>
//                 <label className="text-sm text-gray-500 font-medium">End Time</label>
//                 <select
//                   value={endTime}
//                   onChange={(e) => setEndTime(e.target.value)}
//                   className="w-full p-3 border rounded-lg bg-white text-gray-900 font-semibold outline-none mt-1"
//                 >
//                   {timeOptions.map((time) => (
//                     <option key={time.value} value={time.value}>
//                       {time.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Availability Status */}
//               <div>
//                 <label className="text-sm text-gray-500 font-medium">Availability Status</label>
//                 <select
//                   value={availability}
//                   onChange={(e) => setAvailability(e.target.value)}
//                   className="w-full p-3 border rounded-lg bg-white text-gray-900 font-semibold outline-none mt-1"
//                 >
//                   <option value="available">✅ Available (Mark as bookable)</option>
//                   <option value="notAvailable">❌ Not Available (Block dates)</option>
//                 </select>
//               </div>

//               {/* Message Display */}
//               {message && (
//                 <div className={`p-3 rounded-lg text-sm font-medium ${
//                   message.includes('✅') 
//                     ? 'bg-green-50 text-green-800 border border-green-200' 
//                     : message.includes('⚠️') || message.includes('❌')
//                     ? 'bg-red-50 text-red-800 border border-red-200'
//                     : 'bg-blue-50 text-blue-800 border border-blue-200'
//                 }`}>
//                   {message}
//                 </div>
//               )}

//               {/* Selected Date Preview for API */}
//               {(selectedStartDate || selectedEndDate) && !editingSlot && (
//                 <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
//                   <p className="text-xs font-semibold text-gray-700 mb-2">API Format Preview:</p>
//                   <div className="text-xs space-y-1 text-gray-600">
//                     <div>
//                       <span className="font-medium">Start:</span> {formatDateForAPI(selectedStartDate) || "Not selected"}
//                     </div>
//                     <div>
//                       <span className="font-medium">End:</span> {formatDateForAPI(selectedEndDate) || "Not selected"}
//                     </div>
//                     <div>
//                       <span className="font-medium">From Time:</span> {formatTimeForAPI(startTime)}
//                     </div>
//                     <div>
//                       <span className="font-medium">To Time:</span> {formatTimeForAPI(endTime)}
//                     </div>
//                     <div className="mt-2 text-blue-600">
//                       {selectedStartDate && selectedEndDate 
//                         ? `Total: ${Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} day(s)`
//                         : "Select both dates"
//                       }
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* ========== PERSISTENT HISTORY PANEL ========== */}
//               {showHistoryPanel && existingSlots.length > 0 && (
//                 <div className="border rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
//                   <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <Eye size={16} className="text-blue-600" />
//                       <h3 className="font-bold text-gray-900 text-sm">Marked Dates History</h3>
//                     </div>
//                     <button
//                       onClick={() => setShowHistoryPanel(false)}
//                       className="text-gray-400 hover:text-gray-600 transition"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
                  
//                   <div className="p-3">
//                     <div className="text-xs text-gray-600 mb-3 flex items-center justify-between">
//                       <span className="font-medium">Current Month ({monthName})</span>
//                       <span className="text-gray-500">{existingSlots.length} slot{existingSlots.length !== 1 ? 's' : ''}</span>
//                     </div>
                    
//                     <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
//                       {existingSlots.map((slot, idx) => {
//                         const fromDate = new Date(slot.fromDate.split('T')[0]);
//                         const toDate = new Date(slot.toDate.split('T')[0]);
//                         const dayCount = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                        
//                         return (
//                           <div 
//                             key={idx} 
//                             className={`text-xs p-3 rounded-lg border cursor-pointer hover:shadow-md transition ${
//                               slot.isNotAvailable 
//                                 ? 'text-red-700 bg-white border-red-200 hover:border-red-300' 
//                                 : 'text-blue-700 bg-white border-blue-200 hover:border-blue-300'
//                             } ${selectedSlotForAction === slot ? 'ring-2 ring-purple-400 shadow-md' : ''}`}
//                             onClick={() => handleSlotSelection(slot)}
//                           >
//                             <div className="flex items-start justify-between mb-2">
//                               <div className="flex items-center gap-2">
//                                 <span className="text-base">
//                                   {slot.isNotAvailable ? '🔴' : '🔵'}
//                                 </span>
//                                 <span className="font-bold text-gray-900">
//                                   {slot.isNotAvailable ? 'Blocked' : 'Available'}
//                                 </span>
//                               </div>
//                               <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 font-medium">
//                                 {dayCount}d
//                               </span>
//                             </div>
                            
//                             <div className="space-y-1 text-[11px] text-gray-600">
//                               <div className="flex items-start gap-1">
//                                 <Calendar size={11} className="mt-0.5 flex-shrink-0" />
//                                 <div>
//                                   <div>{fromDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
//                                   <div className="text-gray-400">to</div>
//                                   <div>{toDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
//                                 </div>
//                               </div>
                              
//                               <div className="text-[10px] text-gray-500 mt-2 pt-2 border-t border-gray-200">
//                                 🕐 {slot.fromTime} - {slot.toTime}
//                               </div>
//                             </div>
                            
//                             <div className="flex gap-2 mt-2 pt-2 border-t border-gray-200">
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   setSelectedSlotForAction(slot);
//                                   handleEditSlot();
//                                 }}
//                                 className="flex-1 text-[10px] py-1.5 bg-blue-50 hover:bg-blue-100 rounded text-blue-700 font-medium transition"
//                               >
//                                 Edit
//                               </button>
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   setSelectedSlotForAction(slot);
//                                   handleDeleteSlot();
//                                 }}
//                                 className="flex-1 text-[10px] py-1.5 bg-red-50 hover:bg-red-100 rounded text-red-700 font-medium transition"
//                               >
//                                 Delete
//                               </button>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
                    
//                     <button
//                       onClick={() => setViewMode('list')}
//                       className="w-full mt-3 text-xs py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium transition flex items-center justify-center gap-2"
//                     >
//                       <List size={14} />
//                       View All Dates ({allMonthsSlots.length} total)
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Show History Panel Button (if hidden) */}
//               {!showHistoryPanel && existingSlots.length > 0 && (
//                 <button
//                   onClick={() => setShowHistoryPanel(true)}
//                   className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 transition flex items-center justify-center gap-2"
//                 >
//                   <Eye size={16} />
//                   Show History Panel ({existingSlots.length} slots)
//                 </button>
//               )}

//               {/* No Slots Message */}
//               {existingSlots.length === 0 && (
//                 <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
//                   <CalendarDays size={32} className="mx-auto text-gray-300 mb-2" />
//                   <p className="text-xs text-gray-500 font-medium">No slots marked yet</p>
//                   <p className="text-[10px] text-gray-400 mt-1">Select dates and save to create your first slot</p>
//                 </div>
//               )}

//               {/* Cancel Edit Button */}
//               {editingSlot && (
//                 <button
//                   onClick={handleCancelEdit}
//                   disabled={loading}
//                   className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
//                 >
//                   <X size={18} />
//                   Cancel Edit
//                 </button>
//               )}

//               {/* Confirm Button */}
//               <button
//                 onClick={handleConfirm}
//                 disabled={editingSlot ? selectedDatesToRemove.length === 0 : (!selectedStartDate || !selectedEndDate) || loading}
//                 className="w-full bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white font-semibold py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <RefreshCw size={18} className="animate-spin" />
//                     {editingSlot ? "Removing Dates..." : "Saving..."}
//                   </>
//                 ) : editingSlot ? (
//                   <>
//                     <Edit2 size={18} />
//                     Update Slot ({selectedDatesToRemove.length} to remove)
//                   </>
//                 ) : (
//                   <>
//                     <Calendar size={18} />
//                     Confirm & Save Permanently
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
      
//       {/* Render Tooltip */}
//       {renderTooltip()}
//     </div>
//   );
// };

// export default AvailabilityDateTimeModal;








// import React, { useState, useEffect } from "react";
// import { 
//   X, Calendar, ChevronLeft, ChevronRight, Edit2, Trash2, 
//   RefreshCw, List, CalendarDays, Eye, Plus, Check, AlertCircle 
// } from "lucide-react";

// const API_BASE_URL = "http://3.110.122.127:3000";

// // Complete API Service
// const availabilityAPI = {
//   // Fetch vehicle availability
//   getVehicleAvailability: async (vehicleId, vehicleType, startDate, endDate) => {
//     console.log("🌐 API CALL: getVehicleAvailability", { vehicleId, vehicleType, startDate, endDate });
    
//     try {
//       const url = `${API_BASE_URL}/getVehicleAvailability?VechileId=${vehicleId}&vechileType=${vehicleType}&startDate=${startDate}&endDate=${endDate}`;
      
//       const response = await fetch(url, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${await response.text()}`);
//       }
      
//       const result = await response.json();
//       console.log("✅ API RESPONSE: getVehicleAvailability", result);
      
//       // Handle different response formats
//       if (result.success && Array.isArray(result.data)) {
//         return result.data;
//       } else if (Array.isArray(result)) {
//         return result;
//       } else if (result.data) {
//         return Array.isArray(result.data) ? result.data : [result.data];
//       }
      
//       return [];
//     } catch (error) {
//       console.error("❌ API ERROR: getVehicleAvailability", error);
//       throw error;
//     }
//   },
  
//   // Create new availability slot
//   createNotAvailability: async (payload) => {
//     console.log("🌐 API CALL: createNotAvailability", payload);
    
//     try {
//       const formData = new URLSearchParams();
//       formData.append("userId", payload.userId);
//       formData.append("vechileType", payload.vechileType);
//       formData.append("VechileId", payload.VechileId);
//       formData.append("fromDate", payload.fromDate);
//       formData.append("toDate", payload.toDate);
//       formData.append("fromTime", payload.fromTime);
//       formData.append("toTime", payload.toTime);
//       formData.append("isNotAvailable", String(payload.isNotAvailable));
      
//       const response = await fetch(`${API_BASE_URL}/createNotAvailability`, {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: formData.toString()
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${await response.text()}`);
//       }
      
//       const result = await response.json();
//       console.log("✅ API RESPONSE: createNotAvailability", result);
      
//       return { success: true, data: result.data || result };
//     } catch (error) {
//       console.error("❌ API ERROR: createNotAvailability", error);
//       throw error;
//     }
//   },
  
//   // Update existing slot
//   updateNotAvailability: async (id, payload) => {
//     console.log("🌐 API CALL: updateNotAvailability", { id, payload });
    
//     try {
//       const formData = new URLSearchParams();
//       if (payload.userId) formData.append("userId", payload.userId);
//       formData.append("vechileType", payload.vechileType);
//       formData.append("VechileId", payload.VechileId);
//       formData.append("fromDate", payload.fromDate);
//       formData.append("toDate", payload.toDate);
//       formData.append("fromTime", payload.fromTime);
//       formData.append("toTime", payload.toTime);
//       formData.append("isNotAvailable", String(payload.isNotAvailable));
      
//       const response = await fetch(`${API_BASE_URL}/updateNotAvailability/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: formData.toString()
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${await response.text()}`);
//       }
      
//       const result = await response.json();
//       console.log("✅ API RESPONSE: updateNotAvailability", result);
      
//       return { success: true, data: result.data || result };
//     } catch (error) {
//       console.error("❌ API ERROR: updateNotAvailability", error);
//       throw error;
//     }
//   },
  
//   // Delete slot
//   deleteNotAvailability: async (id) => {
//     console.log("🌐 API CALL: deleteNotAvailability", id);
    
//     try {
//       const response = await fetch(`${API_BASE_URL}/deleteNotAvailability/${id}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${await response.text()}`);
//       }
      
//       const result = await response.json();
//       console.log("✅ API RESPONSE: deleteNotAvailability", result);
      
//       return { success: true, data: result };
//     } catch (error) {
//       console.error("❌ API ERROR: deleteNotAvailability", error);
//       throw error;
//     }
//   }
// };

// // ==========================================
// // MAIN COMPONENT
// // ==========================================
// const VehicleAvailabilityCalendar = () => {
//   // Configuration (In real app, these would come from props or context)
//   const [userId] = useState("68f32259cea8a9fa88029262");
//   const [vehicleId] = useState("690c7181a8ed58d38fae262d");
//   const [vehicleType] = useState("Bike");
  
//   // UI State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedStartDate, setSelectedStartDate] = useState(null);
//   const [selectedEndDate, setSelectedEndDate] = useState(null);
//   const [activeInput, setActiveInput] = useState(null);
//   const [startTime, setStartTime] = useState("06:00");
//   const [endTime, setEndTime] = useState("18:00");
//   const [availability, setAvailability] = useState("notAvailable");
  
//   // Data State
//   const [availabilitySlots, setAvailabilitySlots] = useState([]);
//   const [allMonthsSlots, setAllMonthsSlots] = useState([]);
  
//   // Loading & Messages
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
  
//   // Edit Mode
//   const [editingSlot, setEditingSlot] = useState(null);
//   const [selectedDatesToRemove, setSelectedDatesToRemove] = useState([]);
  
//   // View Mode
//   const [viewMode, setViewMode] = useState('calendar');
  
//   // Statistics
//   const [monthStats, setMonthStats] = useState({ blocked: 0, available: 0, total: 0 });

//   // ==========================================
//   // EFFECTS
//   // ==========================================
  
//   // Load slots when modal opens
//   useEffect(() => {
//     if (isModalOpen) {
//       loadAllSlots();
//     }
//   }, [isModalOpen, currentMonth]);

//   // Calculate statistics
//   useEffect(() => {
//     calculateMonthStatistics();
//   }, [availabilitySlots, currentMonth]);

//   // ==========================================
//   // DATA LOADING FUNCTIONS
//   // ==========================================
  
//   const loadAllSlots = async () => {
//     try {
//       setLoading(true);
      
//       const year = currentMonth.getFullYear();
//       const month = currentMonth.getMonth();
      
//       // Current month
//       const currentStart = new Date(year, month, 1).toISOString().split("T")[0];
//       const currentEnd = new Date(year, month + 1, 0).toISOString().split("T")[0];
      
//       // Previous month
//       const prevMonth = new Date(year, month - 1, 1);
//       const prevStart = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 1).toISOString().split("T")[0];
//       const prevEnd = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).toISOString().split("T")[0];
      
//       // Next month
//       const nextMonth = new Date(year, month + 1, 1);
//       const nextStart = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1).toISOString().split("T")[0];
//       const nextEnd = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).toISOString().split("T")[0];

//       console.log("📅 LOADING SLOTS FOR 3 MONTHS:", { prevStart, currentStart, nextStart });

//       // Load all three months in parallel
//       const [prevSlots, currentSlots, nextSlots] = await Promise.all([
//         availabilityAPI.getVehicleAvailability(vehicleId, vehicleType, prevStart, prevEnd).catch(() => []),
//         availabilityAPI.getVehicleAvailability(vehicleId, vehicleType, currentStart, currentEnd).catch(() => []),
//         availabilityAPI.getVehicleAvailability(vehicleId, vehicleType, nextStart, nextEnd).catch(() => [])
//       ]);

//       const allSlots = [...prevSlots, ...currentSlots, ...nextSlots];
      
//       console.log("✅ LOADED TOTAL SLOTS:", allSlots.length);
//       console.log("📊 CURRENT MONTH SLOTS:", currentSlots.length);
//       console.log("📦 ALL SLOTS DATA:", allSlots);
      
//       setAllMonthsSlots(allSlots);
//       setAvailabilitySlots(currentSlots || []);
      
//       showMessage("success", "✅ Slots loaded successfully from backend");
      
//     } catch (error) {
//       console.error("❌ ERROR LOADING SLOTS:", error);
//       showMessage("error", "⚠️ Could not load slots. Check console for details.");
//       setAvailabilitySlots([]);
//       setAllMonthsSlots([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateMonthStatistics = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();
//     const monthStart = new Date(year, month, 1);
//     const monthEnd = new Date(year, month + 1, 0);
    
//     let blocked = 0;
//     let available = 0;
    
//     availabilitySlots.forEach(slot => {
//       const fromDate = new Date(slot.fromDate.split('T')[0]);
//       const toDate = new Date(slot.toDate.split('T')[0]);
      
//       const overlapStart = fromDate > monthStart ? fromDate : monthStart;
//       const overlapEnd = toDate < monthEnd ? toDate : monthEnd;
      
//       if (overlapStart <= overlapEnd) {
//         const days = Math.ceil((overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        
//         if (slot.isNotAvailable) {
//           blocked += days;
//         } else {
//           available += days;
//         }
//       }
//     });
    
//     setMonthStats({ blocked, available, total: availabilitySlots.length });
//   };

//   // ==========================================
//   // UTILITY FUNCTIONS
//   // ==========================================
  
//   const getSlotId = (slot) => {
//     if (!slot) return null;
//     return slot._id || slot.id || slot.notAvailabilityId || slot.notAvailabilityID || null;
//   };

//   const formatDateForAPI = (date) => {
//     if (!date) return "";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const formatDateForDisplay = (date) => {
//     if (!date) return "Select Date";
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//   };

//   const formatTimeForAPI = (time) => {
//     const [hours, minutes] = time.split(":");
//     return `${parseInt(hours)}.${minutes}`;
//   };

//   const showMessage = (type, text) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 4000);
//   };

//   const isPastDate = (date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const checkDate = new Date(date);
//     checkDate.setHours(0, 0, 0, 0);
//     return checkDate < today;
//   };

//   const getDateSlotStatus = (date) => {
//     const normalizedDate = new Date(date);
//     normalizedDate.setHours(0, 0, 0, 0);
    
//     for (const slot of availabilitySlots) {
//       const fromDate = new Date(slot.fromDate.split('T')[0]);
//       fromDate.setHours(0, 0, 0, 0);
      
//       const toDate = new Date(slot.toDate.split('T')[0]);
//       toDate.setHours(0, 0, 0, 0);
      
//       if (normalizedDate >= fromDate && normalizedDate <= toDate) {
//         return {
//           blocked: slot.isNotAvailable,
//           available: !slot.isNotAvailable,
//           slot: slot
//         };
//       }
//     }
    
//     return { blocked: false, available: false, slot: null };
//   };

//   const isDateSelected = (date) => {
//     return (
//       (selectedStartDate && selectedStartDate.getTime() === date.getTime()) ||
//       (selectedEndDate && selectedEndDate.getTime() === date.getTime())
//     );
//   };

//   const isDateInRange = (date) => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     return date.getTime() >= selectedStartDate.getTime() && date.getTime() <= selectedEndDate.getTime();
//   };

//   const isDateMarkedForRemoval = (date) => {
//     return selectedDatesToRemove.some(d => d.getTime() === date.getTime());
//   };

//   // ==========================================
//   // EVENT HANDLERS
//   // ==========================================
  
//   const handleDateClick = (date) => {
//     if (editingSlot) {
//       // In edit mode: toggle date for removal
//       const dateTime = date.getTime();
//       const isAlreadyMarked = selectedDatesToRemove.some(d => d.getTime() === dateTime);
      
//       if (isAlreadyMarked) {
//         setSelectedDatesToRemove(selectedDatesToRemove.filter(d => d.getTime() !== dateTime));
//         showMessage("info", "✅ Date unmarked for removal");
//       } else {
//         setSelectedDatesToRemove([...selectedDatesToRemove, date]);
//         showMessage("warning", "🗑️ Date marked for removal");
//       }
//       return;
//     }
    
//     // Normal mode: select date range
//     if (activeInput === "start") {
//       setSelectedStartDate(date);
//       setActiveInput("end");
//     } else if (activeInput === "end") {
//       if (selectedStartDate && date < selectedStartDate) {
//         showMessage("error", "⚠️ End date cannot be before start date");
//         return;
//       }
//       setSelectedEndDate(date);
//       setActiveInput(null);
//     }
//   };

//   const previousMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
//   };
  
//   const nextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
//   };

//   const handleRefresh = () => {
//     showMessage("info", "🔄 Refreshing...");
//     loadAllSlots();
//   };

//   const handleEditSlot = (slot) => {
//     console.log("✏️ EDITING SLOT:", slot);
    
//     setEditingSlot(slot);
//     setSelectedStartDate(new Date(slot.fromDate.split('T')[0]));
//     setSelectedEndDate(new Date(slot.toDate.split('T')[0]));
//     setStartTime(slot.fromTime || "06:00");
//     setEndTime(slot.toTime || "18:00");
//     setAvailability(slot.isNotAvailable ? "notAvailable" : "available");
//     setActiveInput(null);
//     setSelectedDatesToRemove([]);
//     showMessage("info", "✏️ Edit Mode: Click dates to remove them");
//   };

//   const handleDeleteSlot = async (slot) => {
//     const slotId = getSlotId(slot);
    
//     if (!slotId) {
//       showMessage("error", "❌ Cannot delete: Invalid slot ID");
//       return;
//     }
    
//     if (!window.confirm(`🗑️ Delete this slot?\n\nDate: ${formatDateForDisplay(new Date(slot.fromDate))} - ${formatDateForDisplay(new Date(slot.toDate))}\n\nThis cannot be undone.`)) {
//       return;
//     }

//     setLoading(true);
//     console.log("🗑️ DELETING SLOT ID:", slotId);

//     try {
//       await availabilityAPI.deleteNotAvailability(slotId);
      
//       showMessage("success", "✅ Slot deleted successfully!");
      
//       if (getSlotId(editingSlot) === slotId) {
//         handleCancelEdit();
//       }
      
//       await loadAllSlots();
      
//     } catch (error) {
//       console.error("❌ DELETE ERROR:", error);
//       showMessage("error", `❌ Delete failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelEdit = () => {
//     console.log("❌ CANCELLED EDIT MODE");
//     setEditingSlot(null);
//     setSelectedStartDate(null);
//     setSelectedEndDate(null);
//     setStartTime("06:00");
//     setEndTime("18:00");
//     setAvailability("notAvailable");
//     setSelectedDatesToRemove([]);
//     showMessage("info", "Edit cancelled");
//   };

//   // ==========================================
//   // MAIN SAVE HANDLER
//   // ==========================================
  
//   const handleConfirmAndSave = async () => {
//     if (editingSlot) {
//       // UPDATE MODE
//       if (selectedDatesToRemove.length === 0) {
//         showMessage("warning", "⚠️ No dates marked for removal. Click dates to remove them.");
//         return;
//       }

//       setLoading(true);
//       console.log("🔄 PROCESSING DATE REMOVALS:", selectedDatesToRemove.length);

//       try {
//         const slotId = getSlotId(editingSlot);
        
//         if (!slotId) {
//           throw new Error("Invalid slot ID for editing");
//         }
        
//         const originalFromDate = new Date(editingSlot.fromDate.split('T')[0]);
//         originalFromDate.setHours(0, 0, 0, 0);
//         const originalToDate = new Date(editingSlot.toDate.split('T')[0]);
//         originalToDate.setHours(0, 0, 0, 0);
        
//         const removalSet = new Set(selectedDatesToRemove.map(d => {
//           const normalized = new Date(d);
//           normalized.setHours(0, 0, 0, 0);
//           return normalized.getTime();
//         }));
        
//         const allDates = [];
//         const currentDate = new Date(originalFromDate);
//         while (currentDate <= originalToDate) {
//           allDates.push(new Date(currentDate));
//           currentDate.setDate(currentDate.getDate() + 1);
//         }
        
//         const remainingDates = allDates.filter(d => {
//           const normalized = new Date(d);
//           normalized.setHours(0, 0, 0, 0);
//           return !removalSet.has(normalized.getTime());
//         });
        
//         console.log("📊 UPDATE STATS:", {
//           originalDates: allDates.length,
//           datesToRemove: selectedDatesToRemove.length,
//           remainingDates: remainingDates.length
//         });
        
//         if (remainingDates.length === 0) {
//           console.log("🗑️ ALL DATES REMOVED - DELETING SLOT");
//           await availabilityAPI.deleteNotAvailability(slotId);
//           showMessage("success", "✅ All dates removed! Slot deleted.");
//         } else {
//           // Split into contiguous ranges
//           const ranges = [];
//           let rangeStart = remainingDates[0];
//           let rangeEnd = remainingDates[0];
          
//           for (let i = 1; i < remainingDates.length; i++) {
//             const prevDate = remainingDates[i - 1];
//             const currDate = remainingDates[i];
//             const dayDiff = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
            
//             if (dayDiff === 1) {
//               rangeEnd = currDate;
//             } else {
//               ranges.push({ start: rangeStart, end: rangeEnd });
//               rangeStart = currDate;
//               rangeEnd = currDate;
//             }
//           }
//           ranges.push({ start: rangeStart, end: rangeEnd });
          
//           console.log("📦 SPLIT INTO RANGES:", ranges.length);
          
//           // Update first range
//           const firstRange = ranges[0];
//           const updatePayload = {
//             userId,
//             VechileId: vehicleId,
//             vechileType: vehicleType,
//             fromDate: formatDateForAPI(firstRange.start),
//             toDate: formatDateForAPI(firstRange.end),
//             fromTime: formatTimeForAPI(startTime),
//             toTime: formatTimeForAPI(endTime),
//             isNotAvailable: availability === "notAvailable",
//           };
          
//           await availabilityAPI.updateNotAvailability(slotId, updatePayload);
          
//           // Create additional ranges
//           for (let i = 1; i < ranges.length; i++) {
//             const range = ranges[i];
//             const createPayload = {
//               userId,
//               VechileId: vehicleId,
//               vechileType: vehicleType,
//               fromDate: formatDateForAPI(range.start),
//               toDate: formatDateForAPI(range.end),
//               fromTime: formatTimeForAPI(startTime),
//               toTime: formatTimeForAPI(endTime),
//               isNotAvailable: availability === "notAvailable",
//             };
//             await availabilityAPI.createNotAvailability(createPayload);
//           }
          
//           showMessage("success", `✅ ${selectedDatesToRemove.length} date(s) removed! ${ranges.length > 1 ? `Split into ${ranges.length} slots.` : ''}`);
//         }
        
//         await loadAllSlots();
//         handleCancelEdit();
        
//       } catch (error) {
//         console.error("❌ UPDATE ERROR:", error);
//         showMessage("error", `❌ Update failed: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//       return;
//     }

//     // CREATE MODE
//     if (!selectedStartDate || !selectedEndDate) {
//       showMessage("error", "⚠️ Please select both start and end dates");
//       return;
//     }

//     const formattedStartDate = formatDateForAPI(selectedStartDate);
//     const formattedEndDate = formatDateForAPI(selectedEndDate);

//     setLoading(true);
//     console.log("💾 CREATING NEW SLOT");

//     const payload = {
//       userId,
//       VechileId: vehicleId,
//       vechileType: vehicleType,
//       fromDate: formattedStartDate,
//       toDate: formattedEndDate,
//       fromTime: formatTimeForAPI(startTime),
//       toTime: formatTimeForAPI(endTime),
//       isNotAvailable: availability === "notAvailable",
//     };

//     console.log("📤 PAYLOAD:", payload);

//     try {
//       const response = await availabilityAPI.createNotAvailability(payload);
//       console.log("✅ CREATE SUCCESS:", response);
      
//       showMessage("success", 
//         availability === "notAvailable" 
//           ? "✅ Dates blocked successfully! ✨ Permanently saved." 
//           : "✅ Dates marked available! ✨ Permanently saved."
//       );

//       // Optimistic UI update
//       const newSlot = {
//         ...payload,
//         _id: response.data?._id || response.data?.id || Date.now().toString(),
//         fromDate: formattedStartDate,
//         toDate: formattedEndDate,
//         fromTime: formatTimeForAPI(startTime),
//         toTime: formatTimeForAPI(endTime),
//         isNotAvailable: availability === "notAvailable"
//       };
      
//       console.log("📌 NEW SLOT ADDED TO UI:", newSlot);
      
//       setAvailabilitySlots(prev => [...prev, newSlot]);
//       setAllMonthsSlots(prev => [...prev, newSlot]);
      
//       // Background refresh
//       setTimeout(() => loadAllSlots(), 500);

//       // Reset form
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       setStartTime("06:00");
//       setEndTime("18:00");
//       setAvailability("notAvailable");
      
//     } catch (error) {
//       console.error("❌ SAVE ERROR:", error);
//       showMessage("error", `❌ Save failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // CALENDAR RENDERING
//   // ==========================================
  
//   const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
//   const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   const daysInMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth() + 1,
//     0
//   ).getDate();
  
//   const firstDayOfMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth(),
//     1
//   ).getDay();

//   const renderCalendarDays = () => {
//     const days = [];
//     const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

//     for (let i = 0; i < startDay; i++) {
//       days.push(<div key={`empty-${i}`} className="h-12" />);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//       const isSelected = isDateSelected(date);
//       const inRange = isDateInRange(date);
//       const past = isPastDate(date);
//       const markedForRemoval = isDateMarkedForRemoval(date);
      
//       const slotStatus = getDateSlotStatus(date);
      
//       const isPermanentlyBlocked = slotStatus.blocked;
//       const isPermanentlyAvailable = slotStatus.available;
      
//       const showBlockedStyle = isPermanentlyBlocked || (inRange && availability === "notAvailable" && !isPermanentlyAvailable);
//       const showAvailableStyle = isPermanentlyAvailable || (inRange && availability === "available" && !isPermanentlyBlocked);
      
//       const shouldShowAsNormal = markedForRemoval && editingSlot;

//       days.push(
//         <button
//           key={day}
//           disabled={past}
//           className={`h-12 rounded-lg transition relative font-medium ${
//             past
//               ? "text-gray-300 cursor-not-allowed bg-gray-50"
//               : shouldShowAsNormal
//               ? "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
//               : showBlockedStyle
//               ? "bg-red-50 border-2 border-red-400"
//               : showAvailableStyle
//               ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md"
//               : inRange
//               ? "bg-blue-100 text-blue-700 border border-blue-300"
//               : isSelected
//               ? "bg-blue-200 text-blue-900 border-2 border-blue-500"
//               : "text-gray-700 hover:bg-gray-100 border border-transparent"
//           }`}
//           onClick={() => !past && handleDateClick(date)}
//         >
//           <span className={showBlockedStyle && !shouldShowAsNormal ? "relative z-10 font-bold" : ""}>
//             {day}
//           </span>
//           {showBlockedStyle && !shouldShowAsNormal && (
//             <>
//               <svg
//                 className="absolute inset-0 w-full h-full pointer-events-none z-20"
//                 viewBox="0 0 40 40"
//               >
//                 <line 
//                   x1="6" y1="6" x2="34" y2="34" 
//                   stroke="#dc2626" 
//                   strokeWidth="3" 
//                   strokeLinecap="round" 
//                 />
//                 <line 
//                   x1="34" y1="6" x2="6" y2="34" 
//                   stroke="#dc2626" 
//                   strokeWidth="3" 
//                   strokeLinecap="round" 
//                 />
//               </svg>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white z-30"></div>
//             </>
//           )}
//         </button>
//       );
//     }
//     return days;
//   };

//   const generateTimeOptions = () => {
//     const options = [];
//     for (let h = 0; h < 24; h++) {
//       for (let m = 0; m < 60; m += 30) {
//         const hour = h.toString().padStart(2, "0");
//         const minute = m.toString().padStart(2, "0");
//         const time = `${hour}:${minute}`;
//         const period = h >= 12 ? "PM" : "AM";
//         const displayHour = h % 12 || 12;
//         options.push({ value: time, label: `${displayHour}:${minute} ${period}` });
//       }
//     }
//     return options;
//   };

//   const timeOptions = generateTimeOptions();

//   // ==========================================
//   // LIST VIEW RENDERING
//   // ==========================================
  
//   const renderListView = () => {
//     if (allMonthsSlots.length === 0) {
//       return (
//         <div className="text-center py-16">
//           <CalendarDays size={64} className="mx-auto text-gray-300 mb-4" />
//           <p className="text-gray-500 font-semibold text-lg">No availability slots yet</p>
//           <p className="text-sm text-gray-400 mt-2">Switch to calendar view to create your first slot</p>
//         </div>
//       );
//     }

//     const groupedByMonth = new Map();
//     allMonthsSlots.forEach(slot => {
//       const date = new Date(slot.fromDate.split('T')[0]);
//       const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
//       if (!groupedByMonth.has(key)) {
//         groupedByMonth.set(key, []);
//       }
//       groupedByMonth.get(key).push(slot);
//     });

//     const sortedMonths = Array.from(groupedByMonth.entries()).sort((a, b) => b[0].localeCompare(a[0]));

//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <h3 className="text-xl font-bold text-gray-900">All Availability Slots</h3>
//           <div className="text-sm text-gray-600 flex items-center gap-4">
//             <span>🔴 {allMonthsSlots.filter(s => s.isNotAvailable).length} blocked</span>
//             <span>🔵 {allMonthsSlots.filter(s => !s.isNotAvailable).length} available</span>
//             <span className="font-bold">📊 {allMonthsSlots.length} total</span>
//           </div>
//         </div>

//         {sortedMonths.map(([monthKey, slots]) => {
//           const [year, month] = monthKey.split('-');
//           const monthDate = new Date(parseInt(year), parseInt(month) - 1, 1);
//           const monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

//           return (
//             <div key={monthKey} className="border rounded-xl overflow-hidden shadow-sm">
//               <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4">
//                 <h4 className="font-bold text-lg">{monthName}</h4>
//                 <p className="text-sm text-blue-100 mt-1">{slots.length} slot{slots.length !== 1 ? 's' : ''}</p>
//               </div>

//               <div className="divide-y">
//                 {slots.map((slot, idx) => {
//                   const fromDate = new Date(slot.fromDate.split('T')[0]);
//                   const toDate = new Date(slot.toDate.split('T')[0]);
//                   const dayCount = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

//                   return (
//                     <div
//                       key={idx}
//                       className="p-5 hover:bg-gray-50 transition"
//                     >
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-3">
//                             <span className="text-2xl">{slot.isNotAvailable ? '🔴' : '🔵'}</span>
//                             <div>
//                               <span className="font-bold text-lg text-gray-900">
//                                 {slot.isNotAvailable ? 'Not Available' : 'Available'}
//                               </span>
//                               <span className="ml-3 text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium">
//                                 {dayCount} day{dayCount !== 1 ? 's' : ''}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="space-y-2 text-sm text-gray-700 ml-11">
//                             <div className="flex items-center gap-2">
//                               <Calendar size={16} className="text-gray-400" />
//                               <span className="font-medium">
//                                 {fromDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                                 {' '} → {' '}
//                                 {toDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                               </span>
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               ⏰ Time: {slot.fromTime} - {slot.toTime}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex gap-2 ml-4">
//                           <button
//                             onClick={() => handleEditSlot(slot)}
//                             className="p-2.5 hover:bg-blue-100 rounded-lg transition text-blue-600 border border-transparent hover:border-blue-200"
//                             title="Edit slot"
//                           >
//                             <Edit2 size={18} />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteSlot(slot)}
//                             className="p-2.5 hover:bg-red-100 rounded-lg transition text-red-600 border border-transparent hover:border-red-200"
//                             title="Delete slot"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // ==========================================
//   // MAIN RENDER
//   // ==========================================

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//                 <Calendar className="text-blue-600" size={32} />
//                 Vehicle Availability Calendar
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 Manage your vehicle's availability schedule - {vehicleType} #{vehicleId.slice(-6)}
//               </p>
//             </div>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition"
//             >
//               <Plus size={20} />
//               Open Calendar
//             </button>
//           </div>

//           {/* Stats Summary */}
//           {availabilitySlots.length > 0 && (
//             <div className="grid grid-cols-3 gap-4 mt-6">
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                 <div className="text-red-600 font-bold text-2xl">{monthStats.blocked}</div>
//                 <div className="text-sm text-gray-600 mt-1">Blocked Days (This Month)</div>
//               </div>
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                 <div className="text-blue-600 font-bold text-2xl">{monthStats.available}</div>
//                 <div className="text-sm text-gray-600 mt-1">Available Days (This Month)</div>
//               </div>
//               <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//                 <div className="text-gray-900 font-bold text-2xl">{allMonthsSlots.length}</div>
//                 <div className="text-sm text-gray-600 mt-1">Total Slots (All Time)</div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Console Logs Display */}
//         <div className="bg-gray-900 text-green-400 rounded-xl p-6 mb-6 font-mono text-sm shadow-lg">
//           <div className="flex items-center gap-2 mb-3">
//             <AlertCircle size={18} />
//             <span className="font-bold">Backend Console Logs</span>
//           </div>
//           <div className="space-y-1 max-h-40 overflow-y-auto">
//             <div>✅ API Base: {API_BASE_URL}</div>
//             <div>📊 Total Slots Loaded: {allMonthsSlots.length}</div>
//             <div>🔴 Blocked Slots: {allMonthsSlots.filter(s => s.isNotAvailable).length}</div>
//             <div>🔵 Available Slots: {allMonthsSlots.filter(s => !s.isNotAvailable).length}</div>
//             <div className="text-yellow-400 mt-2">💡 All API calls are logged to browser console (F12)</div>
//           </div>
//         </div>

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
//               {/* Modal Header */}
//               <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//                     {editingSlot ? (
//                       <>
//                         <Edit2 size={24} className="text-orange-600" />
//                         Edit Availability Slot
//                       </>
//                     ) : (
//                       <>
//                         <Calendar size={24} className="text-blue-600" />
//                         Manage Availability
//                       </>
//                     )}
//                   </h2>
//                   <div className="flex items-center gap-4 mt-2 text-sm">
//                     <span className="text-red-600 font-bold">🔴 {monthStats.blocked} blocked</span>
//                     <span className="text-blue-600 font-bold">🔵 {monthStats.available} available</span>
//                     <span className="text-gray-600 font-bold">📊 {monthStats.total} slots</span>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   {/* View Toggle */}
//                   <div className="flex bg-gray-100 rounded-lg p-1">
//                     <button
//                       onClick={() => setViewMode('calendar')}
//                       className={`px-4 py-2 rounded-md text-sm font-medium transition ${
//                         viewMode === 'calendar'
//                           ? 'bg-white text-blue-600 shadow-sm'
//                           : 'text-gray-600 hover:text-gray-900'
//                       }`}
//                     >
//                       <CalendarDays size={16} className="inline mr-2" />
//                       Calendar
//                     </button>
//                     <button
//                       onClick={() => setViewMode('list')}
//                       className={`px-4 py-2 rounded-md text-sm font-medium transition ${
//                         viewMode === 'list'
//                           ? 'bg-white text-blue-600 shadow-sm'
//                           : 'text-gray-600 hover:text-gray-900'
//                       }`}
//                     >
//                       <List size={16} className="inline mr-2" />
//                       List ({allMonthsSlots.length})
//                     </button>
//                   </div>

//                   <button
//                     onClick={handleRefresh}
//                     disabled={loading}
//                     className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
//                     title="Refresh"
//                   >
//                     <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
//                   </button>

//                   <button
//                     onClick={() => setIsModalOpen(false)}
//                     className="p-2 rounded-lg hover:bg-gray-100 transition"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>
//               </div>

//               {/* Edit Mode Banner */}
//               {editingSlot && (
//                 <div className="mx-6 mt-4 p-4 bg-orange-50 border-2 border-orange-300 rounded-lg">
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <p className="font-bold text-orange-900 mb-2 flex items-center gap-2">
//                         <Edit2 size={18} />
//                         Edit Mode Active
//                       </p>
//                       <ul className="text-sm text-orange-800 space-y-1 ml-6 list-disc">
//                         <li>Click on any colored date (blue or red) to mark it for removal</li>
//                         <li>Marked dates will appear as white/normal</li>
//                         <li>Click again to unmark</li>
//                         <li>Click "Update Slot" to save changes</li>
//                       </ul>
//                       {selectedDatesToRemove.length > 0 && (
//                         <div className="mt-3 p-2 bg-white border border-orange-200 rounded">
//                           <p className="text-sm font-semibold text-orange-900">
//                             ✓ {selectedDatesToRemove.length} date(s) marked for removal
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                     <button
//                       onClick={handleCancelEdit}
//                       className="text-orange-600 hover:text-orange-800 p-1"
//                     >
//                       <X size={20} />
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Message Display */}
//               {message.text && (
//                 <div className="mx-6 mt-4">
//                   <div className={`p-4 rounded-lg font-medium flex items-center gap-3 ${
//                     message.type === 'success'
//                       ? 'bg-green-50 text-green-800 border-2 border-green-300'
//                       : message.type === 'error'
//                       ? 'bg-red-50 text-red-800 border-2 border-red-300'
//                       : message.type === 'warning'
//                       ? 'bg-yellow-50 text-yellow-800 border-2 border-yellow-300'
//                       : 'bg-blue-50 text-blue-800 border-2 border-blue-300'
//                   }`}>
//                     {message.type === 'success' && <Check size={20} />}
//                     {message.type === 'error' && <AlertCircle size={20} />}
//                     {message.type === 'warning' && <AlertCircle size={20} />}
//                     {message.type === 'info' && <Eye size={20} />}
//                     <span>{message.text}</span>
//                   </div>
//                 </div>
//               )}

//               {/* Main Content */}
//               <div className="p-6">
//                 {viewMode === 'list' ? (
//                   renderListView()
//                 ) : (
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Calendar Section */}
//                     <div className="lg:col-span-2 space-y-4">
//                       {/* Date Selection */}
//                       <div className="grid grid-cols-2 gap-4">
//                         <div
//                           onClick={() => !editingSlot && setActiveInput("start")}
//                           className="cursor-pointer"
//                         >
//                           <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                             <Calendar size={16} />
//                             Start Date
//                           </label>
//                           <div className={`border-2 rounded-lg p-4 text-center font-semibold text-lg transition ${
//                             activeInput === "start" ? "border-blue-500 bg-blue-50" : "border-gray-300"
//                           }`}>
//                             {formatDateForDisplay(selectedStartDate)}
//                           </div>
//                         </div>

//                         <div
//                           onClick={() => !editingSlot && setActiveInput("end")}
//                           className="cursor-pointer"
//                         >
//                           <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                             <Calendar size={16} />
//                             End Date
//                           </label>
//                           <div className={`border-2 rounded-lg p-4 text-center font-semibold text-lg transition ${
//                             activeInput === "end" ? "border-blue-500 bg-blue-50" : "border-gray-300"
//                           }`}>
//                             {formatDateForDisplay(selectedEndDate)}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Calendar */}
//                       <div className="border-2 border-gray-200 rounded-lg p-5 bg-white shadow-sm">
//                         <div className="flex items-center justify-between mb-4">
//                           <button
//                             onClick={previousMonth}
//                             disabled={loading}
//                             className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//                           >
//                             <ChevronLeft size={24} />
//                           </button>

//                           <div className="text-center">
//                             <h3 className="font-bold text-xl">{monthName}</h3>
//                             <p className="text-xs text-gray-500 mt-1">
//                               {monthStats.blocked > 0 && <span className="text-red-600">🔴 {monthStats.blocked}</span>}
//                               {monthStats.blocked > 0 && monthStats.available > 0 && " · "}
//                               {monthStats.available > 0 && <span className="text-blue-600">🔵 {monthStats.available}</span>}
//                             </p>
//                           </div>

//                           <button
//                             onClick={nextMonth}
//                             disabled={loading}
//                             className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//                           >
//                             <ChevronRight size={24} />
//                           </button>
//                         </div>

//                         {loading && (
//                           <div className="text-center py-8 text-gray-500">
//                             <RefreshCw size={32} className="animate-spin mx-auto mb-2" />
//                             <p>Loading slots...</p>
//                           </div>
//                         )}

//                         {/* Weekday Headers */}
//                         <div className="grid grid-cols-7 gap-2 mb-3">
//                           {weekDays.map((day) => (
//                             <div key={day} className="text-center text-sm font-bold text-gray-600">
//                               {day}
//                             </div>
//                           ))}
//                         </div>

//                         {/* Calendar Grid */}
//                         <div className="grid grid-cols-7 gap-2">
//                           {renderCalendarDays()}
//                         </div>
//                       </div>

//                       {/* Legend */}
//                       <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//                         <h4 className="font-bold text-sm text-gray-700 mb-3">Legend</h4>
//                         <div className="grid grid-cols-2 gap-3 text-xs">
//                           <div className="flex items-center gap-2">
//                             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm"></div>
//                             <span className="font-medium">Available (Saved)</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <div className="w-10 h-10 bg-red-50 border-2 border-red-400 rounded-lg relative">
//                               <svg className="absolute inset-0" viewBox="0 0 40 40">
//                                 <line x1="8" y1="8" x2="32" y2="32" stroke="#dc2626" strokeWidth="3" />
//                                 <line x1="32" y1="8" x2="8" y2="32" stroke="#dc2626" strokeWidth="3" />
//                               </svg>
//                             </div>
//                             <span className="font-medium">Blocked (Saved)</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <div className="w-10 h-10 bg-blue-100 border border-blue-300 rounded-lg"></div>
//                             <span className="font-medium">Selected Range</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <div className="w-10 h-10 bg-white border border-gray-300 rounded-lg"></div>
//                             <span className="font-medium">Unselected</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Persistence Info */}
//                       {availabilitySlots.length > 0 && (
//                         <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
//                           <div className="flex items-start gap-3">
//                             <Check size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
//                             <div className="text-sm">
//                               <p className="font-bold text-green-900 mb-2">✨ Data Persisted Successfully</p>
//                               <ul className="text-green-800 space-y-1 list-disc ml-4">
//                                 <li>{availabilitySlots.length} slot{availabilitySlots.length !== 1 ? 's' : ''} loaded from backend</li>
//                                 <li>All markings are saved permanently</li>
//                                 <li>Data persists across page reloads</li>
//                                 <li>Customer calendar will show same availability</li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Right Sidebar */}
//                     <div className="space-y-4">
//                       {/* Time Selection */}
//                       <div>
//                         <label className="text-sm font-medium text-gray-700 mb-2 block">Start Time</label>
//                         <select
//                           value={startTime}
//                           onChange={(e) => setStartTime(e.target.value)}
//                           className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none"
//                         >
//                           {timeOptions.map((time) => (
//                             <option key={time.value} value={time.value}>
//                               {time.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       <div>
//                         <label className="text-sm font-medium text-gray-700 mb-2 block">End Time</label>
//                         <select
//                           value={endTime}
//                           onChange={(e) => setEndTime(e.target.value)}
//                           className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none"
//                         >
//                           {timeOptions.map((time) => (
//                             <option key={time.value} value={time.value}>
//                               {time.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       {/* Availability Status */}
//                       <div>
//                         <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
//                         <select
//                           value={availability}
//                           onChange={(e) => setAvailability(e.target.value)}
//                           className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none"
//                         >
//                           <option value="available">✅ Available for Booking</option>
//                           <option value="notAvailable">❌ Not Available (Block)</option>
//                         </select>
//                       </div>

//                       {/* API Preview */}
//                       {(selectedStartDate || selectedEndDate) && !editingSlot && (
//                         <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-xs">
//                           <p className="font-bold mb-2 text-white">API Preview:</p>
//                           <div className="space-y-1">
//                             <div>fromDate: {formatDateForAPI(selectedStartDate) || "not set"}</div>
//                             <div>toDate: {formatDateForAPI(selectedEndDate) || "not set"}</div>
//                             <div>fromTime: {formatTimeForAPI(startTime)}</div>
//                             <div>toTime: {formatTimeForAPI(endTime)}</div>
//                             <div className="text-yellow-400 mt-2">
//                               {selectedStartDate && selectedEndDate
//                                 ? `Duration: ${Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} days`
//                                 : "Select both dates"}
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       {/* Existing Slots List */}
//                       {availabilitySlots.length > 0 && (
//                         <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
//                           <div className="bg-gray-100 px-4 py-3 border-b">
//                             <h4 className="font-bold text-gray-900 text-sm">Current Month Slots</h4>
//                           </div>
//                           <div className="max-h-80 overflow-y-auto p-3 space-y-2">
//                             {availabilitySlots.map((slot, idx) => {
//                               const fromDate = new Date(slot.fromDate.split('T')[0]);
//                               const toDate = new Date(slot.toDate.split('T')[0]);
//                               const days = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

//                               return (
//                                 <div
//                                   key={idx}
//                                   className={`p-3 rounded-lg border-2 text-xs ${
//                                     slot.isNotAvailable
//                                       ? 'bg-red-50 border-red-200'
//                                       : 'bg-blue-50 border-blue-200'
//                                   }`}
//                                 >
//                                   <div className="flex items-center justify-between mb-2">
//                                     <span className="font-bold">
//                                       {slot.isNotAvailable ? '🔴 Blocked' : '🔵 Available'}
//                                     </span>
//                                     <span className="bg-white px-2 py-0.5 rounded text-[10px] font-medium">
//                                       {days}d
//                                     </span>
//                                   </div>
//                                   <div className="text-[11px] text-gray-600 space-y-1">
//                                     <div>{fromDate.toLocaleDateString()} → {toDate.toLocaleDateString()}</div>
//                                     <div>⏰ {slot.fromTime} - {slot.toTime}</div>
//                                   </div>
//                                   <div className="flex gap-1 mt-2 pt-2 border-t border-gray-200">
//                                     <button
//                                       onClick={() => handleEditSlot(slot)}
//                                       className="flex-1 py-1.5 bg-white hover:bg-gray-50 rounded text-[10px] font-medium transition"
//                                     >
//                                       Edit
//                                     </button>
//                                     <button
//                                       onClick={() => handleDeleteSlot(slot)}
//                                       className="flex-1 py-1.5 bg-white hover:bg-gray-50 rounded text-[10px] font-medium transition"
//                                     >
//                                       Delete
//                                     </button>
//                                   </div>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       )}

//                       {/* Action Buttons */}
//                       {editingSlot && (
//                         <button
//                           onClick={handleCancelEdit}
//                           disabled={loading}
//                           className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition disabled:opacity-50"
//                         >
//                           Cancel Edit
//                         </button>
//                       )}

//                    <button
//                         onClick={handleConfirmAndSave}
//                         disabled={
//                           editingSlot
//                             ? selectedDatesToRemove.length === 0
//                             : (!selectedStartDate || !selectedEndDate) || loading
//                         }
//                         className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                       >
//                         {loading ? (
//                           <>
//                             <RefreshCw size={18} className="animate-spin" />
//                             {editingSlot ? "Updating..." : "Saving..."}
//                           </>
//                         ) : editingSlot ? (
//                           <>
//                             <Edit2 size={18} />
//                             Update Slot ({selectedDatesToRemove.length} removed)
//                           </>
//                         ) : (
//                           <>
//                             <Check size={18} />
//                             Confirm & Save Permanently
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Backend Confirmation Display */}
//                 {availabilitySlots.length > 0 && !loading && (
//                   <div className="mx-6 mb-6 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
//                     <div className="flex items-start gap-3">
//                       <Check size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
//                       <div className="flex-1">
//                         <p className="font-bold text-green-900 mb-2">✨ Data Persistence Verified</p>
//                         <div className="text-sm text-green-800 space-y-1">
//                           <div>✅ {availabilitySlots.length} slot{availabilitySlots.length !== 1 ? 's' : ''} loaded from backend API</div>
//                           <div>✅ All colored dates are saved permanently in database</div>
//                           <div>✅ Data persists across page reloads and navigation</div>
//                           <div>✅ Customer calendar will show same availability</div>
//                           <div className="mt-2 pt-2 border-t border-green-200">
//                             <span className="font-semibold">Backend API Base:</span> {API_BASE_URL}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VehicleAvailabilityCalendar;














// import React, { useState, useEffect } from "react";
// import { 
//   X, Calendar, ChevronLeft, ChevronRight, Edit2, Trash2, 
//   RefreshCw, List, CalendarDays, Eye, Plus, Check, AlertCircle 
// } from "lucide-react";

// interface VehicleAvailabilityCalendarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   VechileId: string;
//   vehicleType: "Car" | "Bike" | "Auto";
//   userId: string;
//   apiBaseUrl?: string;
// }

// const VehicleAvailabilityCalendar: React.FC<VehicleAvailabilityCalendarProps> = ({
//   isOpen,
//   onClose,
//   VechileId,
//   vehicleType,
//   userId,
//   apiBaseUrl = "http://3.110.122.127:3000"
// }) => {
  
//   // ==========================================
//   // API LAYER
//   // ==========================================
  
//   const availabilityAPI = {
//     getVehicleAvailability: async (vehicleId: string, vehicleType: string, startDate: string, endDate: string) => {
//       console.log("🌐 API CALL: getVehicleAvailability", { vehicleId, vehicleType, startDate, endDate });
      
//       try {
//         const url = `${apiBaseUrl}/getVehicleAvailability?VechileId=${vehicleId}&vechileType=${vehicleType}&startDate=${startDate}&endDate=${endDate}`;
        
//         const response = await fetch(url, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" }
//         });
        
//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${await response.text()}`);
//         }
        
//         const result = await response.json();
//         console.log("✅ API RESPONSE: getVehicleAvailability", result);
        
//         // Handle multiple response formats
//         if (result.success && Array.isArray(result.data)) {
//           return result.data;
//         } else if (Array.isArray(result)) {
//           return result;
//         } else if (result.data) {
//           return Array.isArray(result.data) ? result.data : [result.data];
//         }
        
//         return [];
//       } catch (error) {
//         console.error("❌ API ERROR: getVehicleAvailability", error);
//         return []; // Return empty array instead of throwing
//       }
//     },
    
//     getNotAvailabilityById: async (id: string) => {
//       console.log("🌐 API CALL: getNotAvailabilityById", id);
      
//       try {
//         // FIX: Remove body from GET request
//         const url = `${apiBaseUrl}/getNotAvailabilityById/${id}`;
//         console.log("🔗 Request URL:", url);
        
//         const response = await fetch(url, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" }
//           // NO BODY for GET requests
//         });
        
//         console.log("📡 Response Status:", response.status);
        
//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error("❌ Response Error:", errorText);
//           throw new Error(`HTTP ${response.status}: ${errorText}`);
//         }
        
//         const result = await response.json();
//         console.log("✅ API RESPONSE: getNotAvailabilityById", result);
        
//         // Handle multiple response formats
//         if (result.success && result.data) {
//           return result.data;
//         } else if (result.data) {
//           return result.data;
//         } else if (result._id) {
//           return result;
//         }
        
//         console.warn("⚠️ No valid data structure found in response");
//         return null;
//       } catch (error) {
//         console.error("❌ API ERROR: getNotAvailabilityById", error);
//         throw error;
//       }
//     },
    
//     createNotAvailability: async (payload: any) => {
//       console.log("🌐 API CALL: createNotAvailability", payload);
      
//       try {
//         const formData = new URLSearchParams();
//         formData.append("userId", payload.userId);
//         formData.append("vechileType", payload.vechileType);
//         formData.append("VechileId", payload.VechileId);
//         formData.append("fromDate", payload.fromDate);
//         formData.append("toDate", payload.toDate);
//         formData.append("fromTime", payload.fromTime);
//         formData.append("toTime", payload.toTime);
//         formData.append("isNotAvailable", String(payload.isNotAvailable));
        
//         const response = await fetch(`${apiBaseUrl}/createNotAvailability`, {
//           method: "POST",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: formData.toString()
//         });
        
//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${await response.text()}`);
//         }
        
//         const result = await response.json();
//         console.log("✅ API RESPONSE: createNotAvailability", result);
        
//         return { success: true, data: result.data || result };
//       } catch (error) {
//         console.error("❌ API ERROR: createNotAvailability", error);
//         throw error;
//       }
//     },
    
//     updateNotAvailability: async (id: string, payload: any) => {
//       console.log("🌐 API CALL: updateNotAvailability", { id, payload });
      
//       try {
//         const formData = new URLSearchParams();
//         if (payload.userId) formData.append("userId", payload.userId);
//         formData.append("vechileType", payload.vechileType);
//         formData.append("VechileId", payload.VechileId);
//         formData.append("fromDate", payload.fromDate);
//         formData.append("toDate", payload.toDate);
//         formData.append("fromTime", payload.fromTime);
//         formData.append("toTime", payload.toTime);
//         formData.append("isNotAvailable", String(payload.isNotAvailable));
        
//         const response = await fetch(`${apiBaseUrl}/updateNotAvailability/${id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: formData.toString()
//         });
        
//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${await response.text()}`);
//         }
        
//         const result = await response.json();
//         console.log("✅ API RESPONSE: updateNotAvailability", result);
        
//         return { success: true, data: result.data || result };
//       } catch (error) {
//         console.error("❌ API ERROR: updateNotAvailability", error);
//         throw error;
//       }
//     },
    
//     deleteNotAvailability: async (id: string) => {
//       console.log("🌐 API CALL: deleteNotAvailability", id);
      
//       try {
//         const response = await fetch(`${apiBaseUrl}/deleteNotAvailability/${id}`, {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" }
//         });
        
//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${await response.text()}`);
//         }
        
//         const result = await response.json();
//         console.log("✅ API RESPONSE: deleteNotAvailability", result);
        
//         return { success: true, data: result };
//       } catch (error) {
//         console.error("❌ API ERROR: deleteNotAvailability", error);
//         throw error;
//       }
//     }
//   };

//   // ==========================================
//   // STATE MANAGEMENT
//   // ==========================================
  
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
//   const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
//   const [activeInput, setActiveInput] = useState<string | null>(null);
//   const [startTime, setStartTime] = useState("06:00");
//   const [endTime, setEndTime] = useState("18:00");
//   const [availability, setAvailability] = useState("notAvailable");
//   const [availabilitySlots, setAvailabilitySlots] = useState<any[]>([]);
//   const [allMonthsSlots, setAllMonthsSlots] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [editingSlot, setEditingSlot] = useState<any>(null);
//   const [selectedDatesToRemove, setSelectedDatesToRemove] = useState<Date[]>([]);
//   const [viewMode, setViewMode] = useState('calendar');
//   const [deleteMode, setDeleteMode] = useState(false);
//   const [viewingSlot, setViewingSlot] = useState<any>(null);
//   const [monthStats, setMonthStats] = useState({ blocked: 0, available: 0, total: 0 });

//   // ==========================================
//   // EFFECTS - FIX: Proper dependency array
//   // ==========================================
  
//   useEffect(() => {
//     if (isOpen) {
//       console.log("📂 Modal opened - Loading all slots");
//       loadAllSlots();
//     } else {
//       // Reset state when modal closes
//       console.log("📂 Modal closed - Resetting state");
//       resetForm();
//     }
//   }, [isOpen, VechileId, vehicleType]); // Add dependencies

//   useEffect(() => {
//     // Reload when month changes
//     if (isOpen) {
//       console.log("📅 Month changed - Reloading slots");
//       loadAllSlots();
//     }
//   }, [currentMonth]);

//   useEffect(() => {
//     calculateMonthStatistics();
//   }, [availabilitySlots, currentMonth]);

//   // ==========================================
//   // DATA LOADING FUNCTIONS
//   // ==========================================
  
//   const loadAllSlots = async () => {
//     try {
//       setLoading(true);
      
//       const year = currentMonth.getFullYear();
//       const month = currentMonth.getMonth();
      
//       // Current month
//       const currentStart = new Date(year, month, 1).toISOString().split("T")[0];
//       const currentEnd = new Date(year, month + 1, 0).toISOString().split("T")[0];
      
//       // Previous month
//       const prevMonth = new Date(year, month - 1, 1);
//       const prevStart = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 1).toISOString().split("T")[0];
//       const prevEnd = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).toISOString().split("T")[0];
      
//       // Next month
//       const nextMonth = new Date(year, month + 1, 1);
//       const nextStart = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1).toISOString().split("T")[0];
//       const nextEnd = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).toISOString().split("T")[0];

//       console.log("📅 LOADING SLOTS FOR 3 MONTHS:", { prevStart, currentStart, nextStart });

//       // Load all three months in parallel
//       const [prevSlots, currentSlots, nextSlots] = await Promise.all([
//         availabilityAPI.getVehicleAvailability(VechileId, vehicleType, prevStart, prevEnd),
//         availabilityAPI.getVehicleAvailability(VechileId, vehicleType, currentStart, currentEnd),
//         availabilityAPI.getVehicleAvailability(VechileId, vehicleType, nextStart, nextEnd)
//       ]);

//       const allSlots = [...prevSlots, ...currentSlots, ...nextSlots];
      
//       console.log("✅ LOADED TOTAL SLOTS:", allSlots.length);
//       console.log("📊 Current month slots:", currentSlots.length);
      
//       setAllMonthsSlots(allSlots);
//       setAvailabilitySlots(currentSlots);
      
//       if (allSlots.length > 0) {
//         showMessage("success", `✅ Loaded ${allSlots.length} slot(s) successfully`);
//       }
      
//     } catch (error: any) {
//       console.error("❌ ERROR LOADING SLOTS:", error);
//       showMessage("error", "⚠️ Could not load slots");
//       setAvailabilitySlots([]);
//       setAllMonthsSlots([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateMonthStatistics = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();
//     const monthStart = new Date(year, month, 1);
//     const monthEnd = new Date(year, month + 1, 0);
    
//     let blocked = 0;
//     let available = 0;
    
//     availabilitySlots.forEach(slot => {
//       const fromDate = new Date(slot.fromDate.split('T')[0]);
//       const toDate = new Date(slot.toDate.split('T')[0]);
      
//       const overlapStart = fromDate > monthStart ? fromDate : monthStart;
//       const overlapEnd = toDate < monthEnd ? toDate : monthEnd;
      
//       if (overlapStart <= overlapEnd) {
//         const days = Math.ceil((overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        
//         if (slot.isNotAvailable) {
//           blocked += days;
//         } else {
//           available += days;
//         }
//       }
//     });
    
//     setMonthStats({ blocked, available, total: availabilitySlots.length });
//   };

//   // ==========================================
//   // UTILITY FUNCTIONS
//   // ==========================================
  
//   const getSlotId = (slot: any) => {
//     if (!slot) return null;
//     return slot._id || slot.id || slot.notAvailabilityId || slot.notAvailabilityID || slot.availabilityId;
//   };

//   const formatDateForAPI = (date: Date | null) => {
//     if (!date) return "";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const formatDateForDisplay = (date: Date | null) => {
//     if (!date) return "Select Date";
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//   };

//   const formatTimeForAPI = (time: string) => {
//     const [hours, minutes] = time.split(":");
//     return `${parseInt(hours)}.${minutes}`;
//   };

//   const showMessage = (type: string, text: string) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 4000);
//   };

//   const isPastDate = (date: Date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const checkDate = new Date(date);
//     checkDate.setHours(0, 0, 0, 0);
//     return checkDate < today;
//   };

//   const getDateSlotStatus = (date: Date) => {
//     const normalizedDate = new Date(date);
//     normalizedDate.setHours(0, 0, 0, 0);
    
//     for (const slot of availabilitySlots) {
//       const fromDate = new Date(slot.fromDate.split('T')[0]);
//       fromDate.setHours(0, 0, 0, 0);
      
//       const toDate = new Date(slot.toDate.split('T')[0]);
//       toDate.setHours(0, 0, 0, 0);
      
//       if (normalizedDate >= fromDate && normalizedDate <= toDate) {
//         return {
//           blocked: slot.isNotAvailable,
//           available: !slot.isNotAvailable,
//           slot: slot
//         };
//       }
//     }
    
//     return { blocked: false, available: false, slot: null };
//   };

//   const isDateSelected = (date: Date) => {
//     return (
//       (selectedStartDate && selectedStartDate.getTime() === date.getTime()) ||
//       (selectedEndDate && selectedEndDate.getTime() === date.getTime())
//     );
//   };

//   const isDateInRange = (date: Date) => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     return date.getTime() >= selectedStartDate.getTime() && date.getTime() <= selectedEndDate.getTime();
//   };

//   const isDateMarkedForRemoval = (date: Date) => {
//     return selectedDatesToRemove.some(d => d.getTime() === date.getTime());
//   };

//   const resetForm = () => {
//     setSelectedStartDate(null);
//     setSelectedEndDate(null);
//     setStartTime("06:00");
//     setEndTime("18:00");
//     setAvailability("notAvailable");
//     setEditingSlot(null);
//     setSelectedDatesToRemove([]);
//     setActiveInput(null);
//     setDeleteMode(false);
//     setViewingSlot(null);
//   };

//   // ==========================================
//   // EVENT HANDLERS
//   // ==========================================
  
//   const handleDateClick = (date: Date) => {
//     if (deleteMode) {
//       const slotStatus = getDateSlotStatus(date);
//       if (slotStatus.blocked && slotStatus.slot) {
//         handleDeleteSlot(slotStatus.slot);
//       } else {
//         showMessage("info", "ℹ️ No unavailable slot on this date");
//       }
//       return;
//     }
    
//     if (editingSlot) {
//       const dateTime = date.getTime();
//       const isAlreadyMarked = selectedDatesToRemove.some(d => d.getTime() === dateTime);
      
//       if (isAlreadyMarked) {
//         setSelectedDatesToRemove(selectedDatesToRemove.filter(d => d.getTime() !== dateTime));
//         showMessage("info", "✅ Date unmarked for removal");
//       } else {
//         const slotFromDate = new Date(editingSlot.fromDate.split('T')[0]);
//         slotFromDate.setHours(0, 0, 0, 0);
//         const slotToDate = new Date(editingSlot.toDate.split('T')[0]);
//         slotToDate.setHours(0, 0, 0, 0);
//         const clickedDate = new Date(date);
//         clickedDate.setHours(0, 0, 0, 0);
        
//         if (clickedDate >= slotFromDate && clickedDate <= slotToDate) {
//           setSelectedDatesToRemove([...selectedDatesToRemove, date]);
//           showMessage("warning", "🗑️ Date marked for removal");
//         } else {
//           showMessage("error", "⚠️ Can only remove dates within this slot's range");
//         }
//       }
//       return;
//     }
    
//     if (activeInput === "start") {
//       setSelectedStartDate(date);
//       setActiveInput("end");
//     } else if (activeInput === "end") {
//       if (selectedStartDate && date < selectedStartDate) {
//         showMessage("error", "⚠️ End date cannot be before start date");
//         return;
//       }
//       setSelectedEndDate(date);
//       setActiveInput(null);
//     }
//   };

//   const previousMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
//   };
  
//   const nextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
//   };

//   const handleRefresh = () => {
//     showMessage("info", "🔄 Refreshing...");
//     loadAllSlots();
//   };

//   const handleEditSlot = async (slot: any) => {
//     console.log("✏️ EDITING SLOT:", slot);
    
//     const slotId = getSlotId(slot);
    
//     if (slotId) {
//       try {
//         setLoading(true);
//         const freshSlotData = await availabilityAPI.getNotAvailabilityById(slotId);
        
//         if (freshSlotData) {
//           setEditingSlot(freshSlotData);
//           setSelectedStartDate(new Date(freshSlotData.fromDate.split('T')[0]));
//           setSelectedEndDate(new Date(freshSlotData.toDate.split('T')[0]));
//           setStartTime(freshSlotData.fromTime || "06:00");
//           setEndTime(freshSlotData.toTime || "18:00");
//           setAvailability(freshSlotData.isNotAvailable ? "notAvailable" : "available");
//           setActiveInput(null);
//           setSelectedDatesToRemove([]);
//           setDeleteMode(false);
          
//           showMessage("info", "✏️ Edit Mode Active");
//         }
//       } catch (error: any) {
//         console.error("❌ Error fetching slot:", error);
//         // Fallback to cached data
//         setEditingSlot(slot);
//         setSelectedStartDate(new Date(slot.fromDate.split('T')[0]));
//         setSelectedEndDate(new Date(slot.toDate.split('T')[0]));
//         setStartTime(slot.fromTime || "06:00");
//         setEndTime(slot.toTime || "18:00");
//         setAvailability(slot.isNotAvailable ? "notAvailable" : "available");
//         setActiveInput(null);
//         setSelectedDatesToRemove([]);
//         setDeleteMode(false);
        
//         showMessage("warning", "⚠️ Using cached data");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleDeleteSlot = async (slot: any) => {
//     const slotId = getSlotId(slot);
    
//     if (!slotId) {
//       showMessage("error", "❌ Cannot delete: Invalid slot ID");
//       return;
//     }
    
//     if (!window.confirm(`🗑️ Delete this slot?\n\nDate: ${formatDateForDisplay(new Date(slot.fromDate))} - ${formatDateForDisplay(new Date(slot.toDate))}\n\nThis cannot be undone.`)) {
//       return;
//     }

//     setLoading(true);

//     try {
//       await availabilityAPI.deleteNotAvailability(slotId);
//       showMessage("success", "✅ Slot deleted successfully!");
      
//       if (getSlotId(editingSlot) === slotId) {
//         resetForm();
//       }
      
//       await loadAllSlots();
      
//     } catch (error: any) {
//       console.error("❌ DELETE ERROR:", error);
//       showMessage("error", `❌ Delete failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewSlot = async (slot: any) => {
//     const slotId = getSlotId(slot);
    
//     if (!slotId) {
//       showMessage("error", "❌ Cannot view: Invalid slot ID");
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       const slotData = await availabilityAPI.getNotAvailabilityById(slotId);
      
//       if (slotData) {
//         setViewingSlot(slotData);
//       } else {
//         throw new Error("No slot data received");
//       }
//     } catch (error: any) {
//       console.error("❌ Error fetching slot details:", error);
//       showMessage("error", `❌ Failed to load slot details`);
//       setViewingSlot(slot);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelEdit = () => {
//     resetForm();
//     showMessage("info", "Edit cancelled");
//   };

//   // ==========================================
//   // MAIN SAVE HANDLER
//   // ==========================================
  
//   const handleConfirmAndSave = async () => {
//     if (editingSlot) {
//       setLoading(true);
//       console.log("🔄 USER CLICKED UPDATE - EDIT MODE");

//       try {
//         const slotId = getSlotId(editingSlot);
        
//         if (!slotId) {
//           throw new Error("Invalid slot ID for editing");
//         }
        
//         if (selectedDatesToRemove.length > 0) {
//           console.log("📅 PROCESSING DATE REMOVALS:", selectedDatesToRemove.length);
          
//           const originalFromDate = new Date(editingSlot.fromDate.split('T')[0]);
//           originalFromDate.setHours(0, 0, 0, 0);
//           const originalToDate = new Date(editingSlot.toDate.split('T')[0]);
//           originalToDate.setHours(0, 0, 0, 0);
          
//           const removalSet = new Set(selectedDatesToRemove.map(d => {
//             const normalized = new Date(d);
//             normalized.setHours(0, 0, 0, 0);
//             return normalized.getTime();
//           }));
          
//           const allDates = [];
//           const currentDate = new Date(originalFromDate);
//           while (currentDate <= originalToDate) {
//             allDates.push(new Date(currentDate));
//             currentDate.setDate(currentDate.getDate() + 1);
//           }
          
//           const remainingDates = allDates.filter(d => {
//             const normalized = new Date(d);
//             normalized.setHours(0, 0, 0, 0);
//             return !removalSet.has(normalized.getTime());
//           });
          
//           console.log("📊 DATE REMOVAL STATS:", {
//             original: allDates.length,
//             removing: selectedDatesToRemove.length,
//             remaining: remainingDates.length
//           });
          
//           if (remainingDates.length === 0) {
//             console.log("🗑️ ALL DATES REMOVED - DELETING ENTIRE SLOT");
//             await availabilityAPI.deleteNotAvailability(slotId);
//             showMessage("success", "✅ All dates removed! Slot deleted.");
//           } else {
//             const ranges = [];
//             let rangeStart = remainingDates[0];
//             let rangeEnd = remainingDates[0];
            
//             for (let i = 1; i < remainingDates.length; i++) {
//               const prevDate = remainingDates[i - 1];
//               const currDate = remainingDates[i];
//               const dayDiff = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
              
//               if (dayDiff === 1) {
//                 rangeEnd = currDate;
//               } else {
//                 ranges.push({ start: rangeStart, end: rangeEnd });
//                 rangeStart = currDate;
//                 rangeEnd = currDate;
//               }
//             }
//             ranges.push({ start: rangeStart, end: rangeEnd });
            
//             console.log("📦 SPLIT INTO RANGES:", ranges.length);
            
//             const firstRange = ranges[0];
//             const updatePayload = {
//               userId,
//               VechileId: VechileId,
//               vechileType: vehicleType,
//               fromDate: formatDateForAPI(firstRange.start),
//               toDate: formatDateForAPI(firstRange.end),
//               fromTime: formatTimeForAPI(startTime),
//               toTime: formatTimeForAPI(endTime),
//               isNotAvailable: availability === "notAvailable",
//             };
            
//             console.log("📤 UPDATING FIRST RANGE:", updatePayload);
//             await availabilityAPI.updateNotAvailability(slotId, updatePayload);
            
//             for (let i = 1; i < ranges.length; i++) {
//               const range = ranges[i];
//               const createPayload = {
//                 userId,
//                 VechileId: VechileId,
//                 vechileType: vehicleType,
//                 fromDate: formatDateForAPI(range.start),
//                 toDate: formatDateForAPI(range.end),
//                 fromTime: formatTimeForAPI(startTime),
//                 toTime: formatTimeForAPI(endTime),
//                 isNotAvailable: availability === "notAvailable",
//               };
//               console.log("📤 CREATING ADDITIONAL RANGE:", createPayload);
//               await availabilityAPI.createNotAvailability(createPayload);
//             }
            
//             showMessage("success", `✅ Updated! ${selectedDatesToRemove.length} date(s) removed. ${ranges.length > 1 ? `Split into ${ranges.length} slots.` : ''}`);
//           }
//         } else {
//           console.log("⚙️ SIMPLE UPDATE - Updating slot properties");
          
//           const updatePayload = {
//             userId,
//             VechileId: VechileId,
//             vechileType: vehicleType,
//             fromDate: formatDateForAPI(selectedStartDate),
//             toDate: formatDateForAPI(selectedEndDate),
//             fromTime: formatTimeForAPI(startTime),
//             toTime: formatTimeForAPI(endTime),
//             isNotAvailable: availability === "notAvailable",
//           };
          
//           console.log("📤 SENDING SIMPLE UPDATE:", updatePayload);
//           await availabilityAPI.updateNotAvailability(slotId, updatePayload);
          
//           showMessage("success", "✅ Slot updated successfully!");
//         }
        
//         console.log("✅ UPDATE COMPLETE - RELOADING SLOTS FROM BACKEND");
        
//         await loadAllSlots();
//         resetForm();
        
//       } catch (error: any) {
//         console.error("❌ UPDATE ERROR:", error);
//         showMessage("error", `❌ Update failed: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//       return;
//     }

//     // CREATE MODE
//     if (!selectedStartDate || !selectedEndDate) {
//       showMessage("error", "⚠️ Please select both start and end dates");
//       return;
//     }

//     const formattedStartDate = formatDateForAPI(selectedStartDate);
//     const formattedEndDate = formatDateForAPI(selectedEndDate);

//     setLoading(true);
//     console.log("💾 USER CLICKED SAVE - CREATING NEW SLOT");

//     const payload = {
//       userId,
//       VechileId: VechileId,
//       vechileType: vehicleType,
//       fromDate: formattedStartDate,
//       toDate: formattedEndDate,
//       fromTime: formatTimeForAPI(startTime),
//       toTime: formatTimeForAPI(endTime),
//       isNotAvailable: availability === "notAvailable",
//     };

//     console.log("📤 CREATE PAYLOAD:", payload);

//     try {
//       const response = await availabilityAPI.createNotAvailability(payload);
//       console.log("✅ CREATE SUCCESS:", response);
      
//       showMessage("success", 
//         availability === "notAvailable" 
//           ? "✅ Dates blocked successfully!" 
//           : "✅ Dates marked available!"
//       );

//       // Reload from backend
//       await loadAllSlots();
      
//       // Reset form
//       resetForm();
      
//     } catch (error: any) {
//       console.error("❌ SAVE ERROR:", error);
//       showMessage("error", `❌ Save failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // CALENDAR RENDERING
//   // ==========================================
  
//   const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
//   const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   const daysInMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth() + 1,
//     0
//   ).getDate();
  
//   const firstDayOfMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth(),
//     1
//   ).getDay();

//   const renderCalendarDays = () => {
//     const days = [];
//     const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

//     for (let i = 0; i < startDay; i++) {
//       days.push(<div key={`empty-${i}`} className="h-12" />);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//       const isSelected = isDateSelected(date);
//       const inRange = isDateInRange(date);
//       const past = isPastDate(date);
//       const markedForRemoval = isDateMarkedForRemoval(date);
      
//       const slotStatus = getDateSlotStatus(date);
      
//       const isPermanentlyBlocked = slotStatus.blocked;
//       const isPermanentlyAvailable = slotStatus.available;
      
//       const showAsDeleteTarget = deleteMode && isPermanentlyBlocked && !past;
      
//       const showBlockedStyle = isPermanentlyBlocked || (inRange && availability === "notAvailable" && !isPermanentlyAvailable);
//       const showAvailableStyle = isPermanentlyAvailable || (inRange && availability === "available" && !isPermanentlyBlocked);
      
//       const shouldShowAsNormal = markedForRemoval && editingSlot;

//       days.push(
//         <button
//           key={day}
//           disabled={past || (deleteMode && !isPermanentlyBlocked)}
//           className={`h-12 rounded-lg transition relative font-medium ${
//             past
//               ? "text-gray-300 cursor-not-allowed bg-gray-50"
//               : showAsDeleteTarget
//               ? "text-white bg-red-500 border-2 border-red-600 hover:bg-red-600 cursor-pointer ring-2 ring-red-300"
//               : shouldShowAsNormal
//               ? "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
//               : showBlockedStyle
//               ? "bg-red-50 border-2 border-red-400"
//               : showAvailableStyle
//               ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md"
//               : inRange
//               ? "bg-blue-100 text-blue-700 border border-blue-300"
//               : isSelected
//               ? "bg-blue-200 text-blue-900 border-2 border-blue-500"
//               : "text-gray-700 hover:bg-gray-100 border border-transparent"
//           }`}
//           onClick={() => !past && handleDateClick(date)}
//         >
//           <span className={showBlockedStyle && !shouldShowAsNormal && !showAsDeleteTarget ? "relative z-10 font-bold" : ""}>
//             {day}
//           </span>
//           {showAsDeleteTarget && (
//             <div className="absolute top-1 right-1">
//               <Trash2 size={14} className="text-white drop-shadow" />
//             </div>
//           )}
//           {showBlockedStyle && !shouldShowAsNormal && !showAsDeleteTarget && (
//             <>
//               <svg
//                 className="absolute inset-0 w-full h-full pointer-events-none z-20"
//                 viewBox="0 0 40 40"
//               >
//                 <line 
//                   x1="6" y1="6" x2="34" y2="34" 
//                   stroke="#dc2626" 
//                   strokeWidth="3" 
//                   strokeLinecap="round" 
//                 />
//                 <line 
//                   x1="34" y1="6" x2="6" y2="34" 
//                   stroke="#dc2626" 
//                   strokeWidth="3" 
//                   strokeLinecap="round" 
//                 />
//               </svg>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white z-30"></div>
//             </>
//           )}
//         </button>
//       );
//     }
//     return days;
//   };

//   const generateTimeOptions = () => {
//     const options = [];
//     for (let h = 0; h < 24; h++) {
//       for (let m = 0; m < 60; m += 30) {
//         const hour = h.toString().padStart(2, "0");
//         const minute = m.toString().padStart(2, "0");
//         const time = `${hour}:${minute}`;
//         const period = h >= 12 ? "PM" : "AM";
//         const displayHour = h % 12 || 12;
//         options.push({ value: time, label: `${displayHour}:${minute} ${period}` });
//       }
//     }
//     return options;
//   };

//   const timeOptions = generateTimeOptions();

//   // ==========================================
//   // LIST VIEW RENDERING
//   // ==========================================
  
//   const renderListView = () => {
//     if (allMonthsSlots.length === 0) {
//       return (
//         <div className="text-center py-16">
//           <CalendarDays size={64} className="mx-auto text-gray-300 mb-4" />
//           <p className="text-gray-500 font-semibold text-lg">No availability slots yet</p>
//           <p className="text-sm text-gray-400 mt-2">Switch to calendar view to create your first slot</p>
//         </div>
//       );
//     }

//     const groupedByMonth = new Map();
//     allMonthsSlots.forEach(slot => {
//       const date = new Date(slot.fromDate.split('T')[0]);
//       const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
//       if (!groupedByMonth.has(key)) {
//         groupedByMonth.set(key, []);
//       }
//       groupedByMonth.get(key).push(slot);
//     });

//     const sortedMonths = Array.from(groupedByMonth.entries()).sort((a, b) => b[0].localeCompare(a[0]));

//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <h3 className="text-xl font-bold text-gray-900">All Availability Slots</h3>
//           <div className="text-sm text-gray-600 flex items-center gap-4">
//             <span>🔴 {allMonthsSlots.filter(s => s.isNotAvailable).length} blocked</span>
//             <span>🔵 {allMonthsSlots.filter(s => !s.isNotAvailable).length} available</span>
//             <span className="font-bold">📊 {allMonthsSlots.length} total</span>
//           </div>
//         </div>

//         {sortedMonths.map(([monthKey, slots]) => {
//           const [year, month] = monthKey.split('-');
//           const monthDate = new Date(parseInt(year), parseInt(month) - 1, 1);
//           const monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

//           return (
//             <div key={monthKey} className="border rounded-xl overflow-hidden shadow-sm">
//               <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4">
//                 <h4 className="font-bold text-lg">{monthName}</h4>
//                 <p className="text-sm text-blue-100 mt-1">{slots.length} slot{slots.length !== 1 ? 's' : ''}</p>
//               </div>

//               <div className="divide-y">
//                 {slots.map((slot: any, idx: number) => {
//                   const fromDate = new Date(slot.fromDate.split('T')[0]);
//                   const toDate = new Date(slot.toDate.split('T')[0]);
//                   const dayCount = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

//                   return (
//                     <div
//                       key={idx}
//                       className="p-5 hover:bg-gray-50 transition"
//                     >
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-3">
//                             <span className="text-2xl">{slot.isNotAvailable ? '🔴' : '🔵'}</span>
//                             <div>
//                               <span className="font-bold text-lg text-gray-900">
//                                 {slot.isNotAvailable ? 'Not Available' : 'Available'}
//                               </span>
//                               <span className="ml-3 text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium">
//                                 {dayCount} day{dayCount !== 1 ? 's' : ''}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="space-y-2 text-sm text-gray-700 ml-11">
//                             <div className="flex items-center gap-2">
//                               <Calendar size={16} className="text-gray-400" />
//                               <span className="font-medium">
//                                 {fromDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                                 {' '} → {' '}
//                                 {toDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                               </span>
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               ⏰ Time: {slot.fromTime} - {slot.toTime}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex gap-2 ml-4">
//                           <button
//                             onClick={() => handleViewSlot(slot)}
//                             className="p-2.5 hover:bg-green-100 rounded-lg transition text-green-600 border border-transparent hover:border-green-200"
//                             title="View details"
//                           >
//                             <Eye size={18} />
//                           </button>
//                           <button
//                             onClick={() => handleEditSlot(slot)}
//                             className="p-2.5 hover:bg-blue-100 rounded-lg transition text-blue-600 border border-transparent hover:border-blue-200"
//                             title="Edit slot"
//                           >
//                             <Edit2 size={18} />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteSlot(slot)}
//                             className="p-2.5 hover:bg-red-100 rounded-lg transition text-red-600 border border-transparent hover:border-red-200"
//                             title="Delete slot"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // ==========================================
//   // MAIN RENDER
//   // ==========================================

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               {editingSlot ? (
//                 <>
//                   <Edit2 size={24} className="text-orange-600" />
//                   Edit Availability Slot
//                 </>
//               ) : (
//                 <>
//                   <Calendar size={24} className="text-blue-600" />
//                   Manage Availability
//                 </>
//               )}
//             </h2>
//             <div className="flex items-center gap-4 mt-2 text-sm">
//               <span className="text-red-600 font-bold">🔴 {monthStats.blocked} blocked</span>
//               <span className="text-blue-600 font-bold">🔵 {monthStats.available} available</span>
//               <span className="text-gray-600 font-bold">📊 {monthStats.total} slots</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="flex bg-gray-100 rounded-lg p-1">
//               <button
//                 onClick={() => setViewMode('calendar')}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition ${
//                   viewMode === 'calendar'
//                     ? 'bg-white text-blue-600 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <CalendarDays size={16} className="inline mr-2" />
//                 Calendar
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition ${
//                   viewMode === 'list'
//                     ? 'bg-white text-blue-600 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <List size={16} className="inline mr-2" />
//                 List ({allMonthsSlots.length})
//               </button>
//             </div>

//             <button
//               onClick={() => {
//                 setDeleteMode(!deleteMode);
//                 if (editingSlot) handleCancelEdit();
//               }}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${
//                 deleteMode
//                   ? 'bg-red-500 text-white hover:bg-red-600'
//                   : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50'
//               }`}
//               title={deleteMode ? "Exit Delete Mode" : "Enter Delete Mode"}
//             >
//               <Trash2 size={16} className="inline mr-2" />
//               {deleteMode ? "Exit Delete" : "Delete Mode"}
//             </button>

//             <button
//               onClick={handleRefresh}
//               disabled={loading}
//               className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
//               title="Refresh"
//             >
//               <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
//             </button>

//             <button
//               onClick={onClose}
//               className="p-2 rounded-lg hover:bg-gray-100 transition"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         {editingSlot && (
//           <div className="mx-6 mt-4 p-4 bg-orange-50 border-2 border-orange-300 rounded-lg">
//             <div className="flex items-start justify-between">
//               <div className="flex-1">
//                 <p className="font-bold text-orange-900 mb-3 flex items-center gap-2">
//                   <Edit2 size={18} />
//                   🎯 EDIT MODE ACTIVE
//                 </p>
                
//                 <div className="bg-white border-2 border-orange-200 rounded-lg p-3 mb-3">
//                   <p className="text-sm font-semibold text-orange-900 mb-2">📅 Current Slot:</p>
//                   <p className="text-sm text-gray-700">
//                     {formatDateForDisplay(new Date(editingSlot.fromDate))} → {formatDateForDisplay(new Date(editingSlot.toDate))}
//                   </p>
//                   <p className="text-xs text-gray-600 mt-1">
//                     Status: {editingSlot.isNotAvailable ? '🔴 Not Available' : '🔵 Available'} | 
//                     Time: {editingSlot.fromTime} - {editingSlot.toTime}
//                   </p>
//                 </div>

//                 {selectedDatesToRemove.length > 0 && (
//                   <div className="mt-3 p-3 bg-white border-2 border-orange-400 rounded animate-pulse">
//                     <p className="text-sm font-bold text-orange-900 flex items-center gap-2">
//                       <AlertCircle size={16} />
//                       ✓ {selectedDatesToRemove.length} date(s) marked for removal
//                     </p>
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={handleCancelEdit}
//                 className="text-orange-600 hover:text-orange-800 p-1 ml-4"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//           </div>
//         )}

//         {deleteMode && (
//           <div className="mx-6 mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="font-bold text-red-900 mb-2 flex items-center gap-2">
//                   <Trash2 size={18} />
//                   Delete Mode Active
//                 </p>
//                 <p className="text-sm text-red-800">Click on unavailable dates to delete slots</p>
//               </div>
//               <button
//                 onClick={() => setDeleteMode(false)}
//                 className="text-red-600 hover:text-red-800 p-1"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//           </div>
//         )}

//         {message.text && (
//           <div className="mx-6 mt-4">
//             <div className={`p-4 rounded-lg font-medium flex items-center gap-3 ${
//               message.type === 'success'
//                 ? 'bg-green-50 text-green-800 border-2 border-green-300'
//                 : message.type === 'error'
//                 ? 'bg-red-50 text-red-800 border-2 border-red-300'
//                 : message.type === 'warning'
//                 ? 'bg-yellow-50 text-yellow-800 border-2 border-yellow-300'
//                 : 'bg-blue-50 text-blue-800 border-2 border-blue-300'
//             }`}>
//               {message.type === 'success' && <Check size={20} />}
//               {message.type === 'error' && <AlertCircle size={20} />}
//               {message.type === 'warning' && <AlertCircle size={20} />}
//               {message.type === 'info' && <Eye size={20} />}
//               <span>{message.text}</span>
//             </div>
//           </div>
//         )}

//         <div className="p-6">
//           {viewMode === 'list' ? (
//             renderListView()
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <div className="lg:col-span-2 space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div
//                     onClick={() => !editingSlot && !deleteMode && setActiveInput("start")}
//                     className={`cursor-pointer ${(editingSlot || deleteMode) ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   >
//                     <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                       <Calendar size={16} />
//                       Start Date
//                     </label>
//                     <div className={`border-2 rounded-lg p-4 text-center font-semibold text-lg transition ${
//                       activeInput === "start" ? "border-blue-500 bg-blue-50" : "border-gray-300"
//                     }`}>
//                       {formatDateForDisplay(selectedStartDate)}
//                     </div>
//                   </div>

//                   <div
//                     onClick={() => !editingSlot && !deleteMode && setActiveInput("end")}
//                     className={`cursor-pointer ${(editingSlot || deleteMode) ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   >
//                     <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                       <Calendar size={16} />
//                       End Date
//                     </label>
//                     <div className={`border-2 rounded-lg p-4 text-center font-semibold text-lg transition ${
//                       activeInput === "end" ? "border-blue-500 bg-blue-50" : "border-gray-300"
//                     }`}>
//                       {formatDateForDisplay(selectedEndDate)}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border-2 border-gray-200 rounded-lg p-5 bg-white shadow-sm">
//                   <div className="flex items-center justify-between mb-4">
//                     <button
//                       onClick={previousMonth}
//                       disabled={loading}
//                       className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//                     >
//                       <ChevronLeft size={24} />
//                     </button>

//                     <div className="text-center">
//                       <h3 className="font-bold text-xl">{monthName}</h3>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {monthStats.blocked > 0 && <span className="text-red-600">🔴 {monthStats.blocked}</span>}
//                         {monthStats.blocked > 0 && monthStats.available > 0 && " · "}
//                         {monthStats.available > 0 && <span className="text-blue-600">🔵 {monthStats.available}</span>}
//                       </p>
//                     </div>

//                     <button
//                       onClick={nextMonth}
//                       disabled={loading}
//                       className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//                     >
//                       <ChevronRight size={24} />
//                     </button>
//                   </div>

//                   {loading && (
//                     <div className="text-center py-8 text-gray-500">
//                       <RefreshCw size={32} className="animate-spin mx-auto mb-2" />
//                       <p>Loading...</p>
//                     </div>
//                   )}

//                   <div className="grid grid-cols-7 gap-2 mb-3">
//                     {weekDays.map((day) => (
//                       <div key={day} className="text-center text-sm font-bold text-gray-600">
//                         {day}
//                       </div>
//                     ))}
//                   </div>

//                   <div className="grid grid-cols-7 gap-2">
//                     {renderCalendarDays()}
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700 mb-2 block">Start Time</label>
//                   <select
//                     value={startTime}
//                     onChange={(e) => setStartTime(e.target.value)}
//                     disabled={deleteMode}
//                     className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none disabled:opacity-50"
//                   >
//                     {timeOptions.map((time) => (
//                       <option key={time.value} value={time.value}>
//                         {time.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-700 mb-2 block">End Time</label>
//                   <select
//                     value={endTime}
//                     onChange={(e) => setEndTime(e.target.value)}
//                     disabled={deleteMode}
//                     className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none disabled:opacity-50"
//                   >
//                     {timeOptions.map((time) => (
//                       <option key={time.value} value={time.value}>
//                         {time.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
//                   <select
//                     value={availability}
//                     onChange={(e) => setAvailability(e.target.value)}
//                     disabled={deleteMode}
//                     className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none disabled:opacity-50"
//                   >
//                     <option value="available">✅ Available for Booking</option>
//                     <option value="notAvailable">❌ Not Available (Block)</option>
//                   </select>
//                 </div>

//                 {editingSlot && (
//                   <button
//                     onClick={handleCancelEdit}
//                     disabled={loading}
//                     className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition disabled:opacity-50"
//                   >
//                     Cancel Edit
//                   </button>
//                 )}

//                 {!deleteMode && (
//                   <button
//                     onClick={handleConfirmAndSave}
//                     disabled={
//                       editingSlot
//                         ? loading
//                         : (!selectedStartDate || !selectedEndDate) || loading
//                     }
//                     className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {loading ? (
//                       <>
//                         <RefreshCw size={18} className="animate-spin" />
//                         {editingSlot ? "Updating..." : "Saving..."}
//                       </>
//                     ) : editingSlot ? (
//                       <>
//                         <Edit2 size={18} />
//                         {selectedDatesToRemove.length > 0 
//                           ? `Update - Remove ${selectedDatesToRemove.length} date(s)` 
//                           : "Update Slot"
//                         }
//                       </>
//                     ) : (
//                       <>
//                         <Check size={18} />
//                         Confirm & Save
//                       </>
//                     )}
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {availabilitySlots.length > 0 && !loading && (
//           <div className="mx-6 mb-6 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
//             <div className="flex items-center gap-3">
//               <Check size={20} className="text-green-600 flex-shrink-0" />
//               <div>
//                 <p className="font-bold text-green-900">✨ Data Loaded from Backend</p>
//                 <p className="text-sm text-green-800 mt-1">
//                   {availabilitySlots.length} slot{availabilitySlots.length !== 1 ? 's' : ''} persisted in database
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       {viewingSlot && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 flex items-center justify-between z-10 rounded-t-xl">
//               <h3 className="text-xl font-bold flex items-center gap-2">
//                 <Eye size={24} />
//                 Slot Details
//               </h3>
//               <button
//                 onClick={() => setViewingSlot(null)}
//                 className="p-2 rounded-lg hover:bg-white/20 transition"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//                 <label className="text-xs font-semibold text-gray-600 uppercase mb-1 block">Slot ID</label>
//                 <p className="font-mono text-sm text-gray-900 break-all">{viewingSlot._id}</p>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className={`border-2 rounded-lg p-4 ${
//                   viewingSlot.isNotAvailable 
//                     ? 'bg-red-50 border-red-300' 
//                     : 'bg-green-50 border-green-300'
//                 }`}>
//                   <label className="text-xs font-semibold text-gray-600 uppercase mb-1 block">Status</label>
//                   <p className={`text-lg font-bold ${
//                     viewingSlot.isNotAvailable ? 'text-red-700' : 'text-green-700'
//                   }`}>
//                     {viewingSlot.isNotAvailable ? '🔴 Not Available' : '🔵 Available'}
//                   </p>
//                 </div>

//                 <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
//                   <label className="text-xs font-semibold text-gray-600 uppercase mb-1 block">Vehicle Type</label>
//                   <p className="text-lg font-bold text-blue-700">{viewingSlot.vechileType}</p>
//                 </div>
//               </div>

//               <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
//                 <label className="text-xs font-semibold text-gray-600 uppercase mb-3 block">Date Range</label>
//                 <div className="space-y-2">
//                   <div className="flex items-center gap-3">
//                     <Calendar size={18} className="text-gray-400" />
//                     <div>
//                       <span className="text-xs text-gray-500">From:</span>
//                       <p className="font-semibold text-gray-900">
//                         {new Date(viewingSlot.fromDate).toLocaleDateString('en-US', { 
//                           weekday: 'long', 
//                           year: 'numeric', 
//                           month: 'long', 
//                           day: 'numeric' 
//                         })}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Calendar size={18} className="text-gray-400" />
//                     <div>
//                       <span className="text-xs text-gray-500">To:</span>
//                       <p className="font-semibold text-gray-900">
//                         {new Date(viewingSlot.toDate).toLocaleDateString('en-US', { 
//                           weekday: 'long', 
//                           year: 'numeric', 
//                           month: 'long', 
//                           day: 'numeric' 
//                         })}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="mt-3 pt-3 border-t border-gray-200">
//                     <span className="text-xs text-gray-500">Duration:</span>
//                     <p className="font-bold text-lg text-blue-600">
//                       {Math.ceil((new Date(viewingSlot.toDate).getTime() - new Date(viewingSlot.fromDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
//                 <label className="text-xs font-semibold text-gray-600 uppercase mb-3 block">Time Range</label>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <span className="text-xs text-gray-500">From:</span>
//                     <p className="text-xl font-bold text-gray-900">{viewingSlot.fromTime}</p>
//                   </div>
//                   <div>
//                     <span className="text-xs text-gray-500">To:</span>
//                     <p className="text-xl font-bold text-gray-900">{viewingSlot.toTime}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//                 <label className="text-xs font-semibold text-gray-600 uppercase mb-3 block">Metadata</label>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Created:</span>
//                     <span className="font-medium text-gray-900">
//                       {viewingSlot.createdAt ? new Date(viewingSlot.createdAt).toLocaleString('en-US', {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       }) : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Last Updated:</span>
//                     <span className="font-medium text-gray-900">
//                       {viewingSlot.updatedAt ? new Date(viewingSlot.updatedAt).toLocaleString('en-US', {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       }) : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Vehicle ID:</span>
//                     <span className="font-mono text-xs text-gray-700">{viewingSlot.VechileId}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-3 pt-4 border-t border-gray-200">
//                 <button
//                   onClick={() => {
//                     setViewingSlot(null);
//                     handleEditSlot(viewingSlot);
//                   }}
//                   className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
//                 >
//                   <Edit2 size={18} />
//                   Edit This Slot
//                 </button>
//                 <button
//                   onClick={() => {
//                     setViewingSlot(null);
//                     handleDeleteSlot(viewingSlot);
//                   }}
//                   className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
//                 >
//                   <Trash2 size={18} />
//                   Delete Slot
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VehicleAvailabilityCalendar;





// import React, { useState, useEffect } from "react";
// import {
//   X,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
//   Edit2,
//   Trash2,
//   Check,
//   AlertCircle,
//   MoreVertical,
// } from "lucide-react";

// interface VehicleAvailabilityCalendarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   VechileId: string;
//   vehicleType: "Car" | "Bike" | "Auto";
//   userId: string;
//   apiBaseUrl?: string;
// }

// const VehicleAvailabilityCalendar: React.FC<
//   VehicleAvailabilityCalendarProps
// > = ({
//   isOpen,
//   onClose,
//   VechileId,
//   vehicleType,
//   userId,
//   apiBaseUrl = "http://3.110.122.127:3000",
// }) => {
//   // ==========================================
//   // API LAYER
//   // ==========================================
//   const availabilityAPI = {
//     getVehicleAvailability: async (
//       vehicleId: string,
//       vehicleType: string,
//       startDate: string,
//       endDate: string
//     ) => {
//       console.log("🌐 API CALL: getVehicleAvailability", {
//         vehicleId,
//         vehicleType,
//         startDate,
//         endDate,
//       });

//       try {
//         const url = `${apiBaseUrl}/getVehicleAvailability?VechileId=${vehicleId}&vechileType=${vehicleType}&startDate=${startDate}&endDate=${endDate}`;

//         const response = await fetch(url, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${await response.text()}`);
//         }

//         const result = await response.json();
//         console.log("✅ API RESPONSE: getVehicleAvailability", result);

//         if (result.success && Array.isArray(result.data)) {
//           return result.data;
//         } else if (Array.isArray(result)) {
//           return result;
//         } else if (result.data) {
//           return Array.isArray(result.data) ? result.data : [result.data];
//         }

//         return [];
//       } catch (error) {
//         console.error("❌ API ERROR: getVehicleAvailability", error);
//         return [];
//       }
//     },

//     getNotAvailabilityById: async (id: string) => {
//       console.log("🌐 API CALL: getNotAvailabilityById", id);

//       try {
//         const url = `${apiBaseUrl}/getNotAvailabilityById/${id}`;
//         console.log("🔗 Request URL:", url);

//         const response = await fetch(url, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         console.log("📡 Response Status:", response.status);

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error("❌ Response Error:", errorText);
//           throw new Error(`HTTP ${response.status}: ${errorText}`);
//         }

//         const result = await response.json();
//         console.log("✅ API RESPONSE: getNotAvailabilityById", result);

//         if (result.success && result.data) {
//           return result.data;
//         } else if (result.data) {
//           return result.data;
//         } else if (result._id) {
//           return result;
//         }

//         console.warn("⚠️ No valid data structure found in response");
//         return null;
//       } catch (error) {
//         console.error("❌ API ERROR: getNotAvailabilityById", error);
//         throw error;
//       }
//     },

//     createNotAvailability: async (payload: any) => {
//       console.log("🌐 API CALL: createNotAvailability", payload);

//       try {
//         const formData = new URLSearchParams();
//         formData.append("userId", payload.userId);
//         formData.append("vechileType", payload.vechileType);
//         formData.append("VechileId", payload.VechileId);
//         formData.append("fromDate", payload.fromDate);
//         formData.append("toDate", payload.toDate);
//         formData.append("fromTime", payload.fromTime);
//         formData.append("toTime", payload.toTime);
//         formData.append("isNotAvailable", String(payload.isNotAvailable));

//         const response = await fetch(`${apiBaseUrl}/createNotAvailability`, {
//           method: "POST",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: formData.toString(),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${await response.text()}`);
//         }

//         const result = await response.json();
//         console.log("✅ API RESPONSE: createNotAvailability", result);

//         return { success: true, data: result.data || result };
//       } catch (error) {
//         console.error("❌ API ERROR: createNotAvailability", error);
//         throw error;
//       }
//     },

//     updateNotAvailability: async (id: string, payload: any) => {
//       console.log("🌐 API CALL: updateNotAvailability", { id, payload });

//       try {
//         const formData = new URLSearchParams();
//         if (payload.userId) formData.append("userId", payload.userId);
//         formData.append("vechileType", payload.vechileType);
//         formData.append("VechileId", payload.VechileId);
//         formData.append("fromDate", payload.fromDate);
//         formData.append("toDate", payload.toDate);
//         formData.append("fromTime", payload.fromTime);
//         formData.append("toTime", payload.toTime);
//         formData.append("isNotAvailable", String(payload.isNotAvailable));

//         const response = await fetch(`${apiBaseUrl}/updateNotAvailability/${id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: formData.toString(),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${await response.text()}`);
//         }

//         const result = await response.json();
//         console.log("✅ API RESPONSE: updateNotAvailability", result);

//         return { success: true, data: result.data || result };
//       } catch (error) {
//         console.error("❌ API ERROR: updateNotAvailability", error);
//         throw error;
//       }
//     },

//     deleteNotAvailability: async (id: string) => {
//       console.log("🌐 API CALL: deleteNotAvailability", id);

//       try {
//         const response = await fetch(`${apiBaseUrl}/deleteNotAvailability/${id}`, {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${await response.text()}`);
//         }

//         const result = await response.json();
//         console.log("✅ API RESPONSE: deleteNotAvailability", result);

//         return { success: true, data: result };
//       } catch (error) {
//         console.error("❌ API ERROR: deleteNotAvailability", error);
//         throw error;
//       }
//     },
//   };

//   // ==========================================
//   // STATE MANAGEMENT
//   // ==========================================
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
//   const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
//   const [activeInput, setActiveInput] = useState<string | null>(null);
//   const [startTime, setStartTime] = useState("06:00");
//   const [endTime, setEndTime] = useState("18:00");
//   const [availability, setAvailability] = useState("notAvailable");
//   const [availabilitySlots, setAvailabilitySlots] = useState<any[]>([]);
//   const [allMonthsSlots, setAllMonthsSlots] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [editingSlot, setEditingSlot] = useState<any>(null);
//   const [selectedDatesToRemove, setSelectedDatesToRemove] = useState<Date[]>(
//     []
//   );
//   const [showOptionsMenu, setShowOptionsMenu] = useState(false);

//   // ==========================================
//   // EFFECTS
//   // ==========================================
//   useEffect(() => {
//     if (isOpen) {
//       console.log("📂 Modal opened - Loading all slots");
//       loadAllSlots();
//     } else {
//       console.log("📂 Modal closed - Resetting state");
//       resetForm();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isOpen, VechileId, vehicleType]);

//   useEffect(() => {
//     if (isOpen) {
//       console.log("📅 Month changed - Reloading slots");
//       loadAllSlots();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentMonth]);

//   // ==========================================
//   // DATA LOADING FUNCTIONS
//   // ==========================================
//   const loadAllSlots = async () => {
//     try {
//       setLoading(true);

//       const year = currentMonth.getFullYear();
//       const month = currentMonth.getMonth();

//       // Only load current month
//       const currentStart = new Date(year, month, 1).toISOString().split("T")[0];
//       const currentEnd = new Date(year, month + 1, 0).toISOString().split("T")[0];

//       console.log("📅 LOADING SLOTS FOR CURRENT MONTH:", {
//         currentStart,
//         currentEnd,
//       });

//       const currentSlots = await availabilityAPI.getVehicleAvailability(
//         VechileId,
//         vehicleType,
//         currentStart,
//         currentEnd
//       );

//       console.log("✅ LOADED SLOTS:", currentSlots.length);

//       setAllMonthsSlots(currentSlots);
//       setAvailabilitySlots(currentSlots);

//       if (currentSlots.length > 0) {
//         showMessage("success", `✅ Loaded ${currentSlots.length} slot(s) successfully`);
//       }
//     } catch (error: any) {
//       console.error("❌ ERROR LOADING SLOTS:", error);
//       showMessage("error", "⚠️ Could not load slots");
//       setAvailabilitySlots([]);
//       setAllMonthsSlots([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // UTILITY FUNCTIONS
//   // ==========================================
//   const getSlotId = (slot: any) => {
//     if (!slot) return null;
//     return (
//       slot._id ||
//       slot.id ||
//       slot.notAvailabilityId ||
//       slot.notAvailabilityID ||
//       slot.availabilityId
//     );
//   };

//   const formatDateForAPI = (date: Date | null) => {
//     if (!date) return "";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const formatDateForDisplay = (date: Date | null) => {
//     if (!date) return "Select Date";
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const formatTimeForAPI = (time: string) => {
//     const [hours, minutes] = time.split(":");
//     return `${parseInt(hours)}.${minutes}`;
//   };

//   const showMessage = (type: string, text: string) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 4000);
//   };

//   const isPastDate = (date: Date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const checkDate = new Date(date);
//     checkDate.setHours(0, 0, 0, 0);
//     return checkDate < today;
//   };

//   const getDateSlotStatus = (date: Date) => {
//     const normalizedDate = new Date(date);
//     normalizedDate.setHours(0, 0, 0, 0);

//     for (const slot of availabilitySlots) {
//       const fromDate = new Date(slot.fromDate.split("T")[0]);
//       fromDate.setHours(0, 0, 0, 0);

//       const toDate = new Date(slot.toDate.split("T")[0]);
//       toDate.setHours(0, 0, 0, 0);

//       if (normalizedDate >= fromDate && normalizedDate <= toDate) {
//         return {
//           blocked: slot.isNotAvailable,
//           available: !slot.isNotAvailable,
//           slot: slot,
//         };
//       }
//     }

//     return { blocked: false, available: false, slot: null };
//   };

//   const isDateSelected = (date: Date) => {
//     return (
//       (selectedStartDate && selectedStartDate.getTime() === date.getTime()) ||
//       (selectedEndDate && selectedEndDate.getTime() === date.getTime())
//     );
//   };

//   const isDateInRange = (date: Date) => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     return (
//       date.getTime() >= selectedStartDate.getTime() &&
//       date.getTime() <= selectedEndDate.getTime()
//     );
//   };

//   const isDateMarkedForRemoval = (date: Date) => {
//     return selectedDatesToRemove.some((d) => d.getTime() === date.getTime());
//   };

//   const resetForm = () => {
//     // NOTE: resetForm should only clear temporary UI selections. It must NOT clear saved availabilitySlots.
//     setSelectedStartDate(null);
//     setSelectedEndDate(null);
//     setStartTime("06:00");
//     setEndTime("18:00");
//     setAvailability("notAvailable");
//     setEditingSlot(null);
//     setSelectedDatesToRemove([]);
//     setActiveInput(null);
//     setShowOptionsMenu(false);
//   };

//   // ==========================================
//   // EVENT HANDLERS
//   // ==========================================
//   const handleDateClick = (date: Date) => {
//     // IMPORTANT: This function MUST NOT call any API. It only changes local UI state (temporary selections).

//     if (editingSlot) {
//       const dateTime = date.getTime();
//       const isAlreadyMarked = selectedDatesToRemove.some(
//         (d) => d.getTime() === dateTime
//       );

//       if (isAlreadyMarked) {
//         setSelectedDatesToRemove(
//           selectedDatesToRemove.filter((d) => d.getTime() !== dateTime)
//         );
//         showMessage("info", "✅ Date unmarked for removal");
//       } else {
//         const slotFromDate = new Date(editingSlot.fromDate.split("T")[0]);
//         slotFromDate.setHours(0, 0, 0, 0);
//         const slotToDate = new Date(editingSlot.toDate.split("T")[0]);
//         slotToDate.setHours(0, 0, 0, 0);
//         const clickedDate = new Date(date);
//         clickedDate.setHours(0, 0, 0, 0);

//         if (clickedDate >= slotFromDate && clickedDate <= slotToDate) {
//           setSelectedDatesToRemove([...selectedDatesToRemove, date]);
//           showMessage("warning", "🗑️ Date marked for removal");
//         } else {
//           showMessage("error", "⚠️ Can only remove dates within this slot's range");
//         }
//       }
//       return;
//     }

//     // If not editing - we'll only update local temporary selection state.
//     if (activeInput === "start") {
//       setSelectedStartDate(date);
//       setActiveInput("end");
//     } else if (activeInput === "end") {
//       if (selectedStartDate && date < selectedStartDate) {
//         showMessage("error", "⚠️ End date cannot be before start date");
//         return;
//       }
//       setSelectedEndDate(date);
//       setActiveInput(null);
//     }
//   };

//   const previousMonth = () => {
//     setCurrentMonth(
//       new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
//     );
//   };

//   const nextMonth = () => {
//     setCurrentMonth(
//       new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
//     );
//   };

//   const handleEditSlot = async (slot: any) => {
//     console.log("✏️ EDITING SLOT:", slot);
//     setShowOptionsMenu(false);

//     const slotId = getSlotId(slot);

//     if (slotId) {
//       try {
//         setLoading(true);
//         const freshSlotData = await availabilityAPI.getNotAvailabilityById(slotId);

//         if (freshSlotData) {
//           setEditingSlot(freshSlotData);
//           setSelectedStartDate(new Date(freshSlotData.fromDate.split("T")[0]));
//           setSelectedEndDate(new Date(freshSlotData.toDate.split("T")[0]));
//           setStartTime(freshSlotData.fromTime || "06:00");
//           setEndTime(freshSlotData.toTime || "18:00");
//           setAvailability(
//             freshSlotData.isNotAvailable ? "notAvailable" : "available"
//           );
//           setActiveInput(null);
//           setSelectedDatesToRemove([]);

//           showMessage("info", "✏️ Edit Mode Active");
//         }
//       } catch (error: any) {
//         console.error("❌ Error fetching slot:", error);
//         // fallback to cached data if API failed
//         setEditingSlot(slot);
//         setSelectedStartDate(new Date(slot.fromDate.split("T")[0]));
//         setSelectedEndDate(new Date(slot.toDate.split("T")[0]));
//         setStartTime(slot.fromTime || "06:00");
//         setEndTime(slot.toTime || "18:00");
//         setAvailability(slot.isNotAvailable ? "notAvailable" : "available");
//         setActiveInput(null);
//         setSelectedDatesToRemove([]);

//         showMessage("warning", "⚠️ Using cached data");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleDeleteSlot = async (slot: any) => {
//     const slotId = getSlotId(slot);
//     setShowOptionsMenu(false);

//     if (!slotId) {
//       showMessage("error", "❌ Cannot delete: Invalid slot ID");
//       return;
//     }

//     if (
//       !window.confirm(
//         `🗑️ Delete this slot?\n\nDate: ${formatDateForDisplay(
//           new Date(slot.fromDate)
//         )} - ${formatDateForDisplay(new Date(slot.toDate))}\n\nThis cannot be undone.`
//       )
//     ) {
//       return;
//     }

//     setLoading(true);

//     try {
//       await availabilityAPI.deleteNotAvailability(slotId);
//       showMessage("success", "✅ Slot deleted successfully!");

//       // After deletion, reload saved slots so customers will see the change and owner will see updated calendar.
//       await loadAllSlots();
//       // do not clear availabilitySlots - they are reloaded from backend and persistent
//       // Do not reset saved selections here; only temporary UI selections are cleared
//       setSelectedDatesToRemove([]);
//       setEditingSlot(null);
//     } catch (error: any) {
//       console.error("❌ DELETE ERROR:", error);
//       showMessage("error", `❌ Delete failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelEdit = () => {
//     // Canceling edit should only clear temporary edit UI state, not the saved slots in availabilitySlots
//     setSelectedDatesToRemove([]);
//     setEditingSlot(null);
//     setSelectedStartDate(null);
//     setSelectedEndDate(null);
//     setActiveInput(null);
//     showMessage("info", "Edit cancelled");
//   };

//   const handleEditFromMenu = () => {
//     if (availabilitySlots.length > 0) {
//       const latestSlot = availabilitySlots[0];
//       handleEditSlot(latestSlot);
//     } else {
//       showMessage("error", "⚠️ No slots available to edit");
//     }
//   };

//   const handleDeleteFromMenu = () => {
//     if (availabilitySlots.length > 0) {
//       const latestSlot = availabilitySlots[0];
//       handleDeleteSlot(latestSlot);
//     } else {
//       showMessage("error", "⚠️ No slots available to delete");
//     }
//   };

//   // ==========================================
//   // MAIN SAVE HANDLER
//   // ==========================================
//   const handleConfirmAndSave = async () => {
//     // IMPORTANT BEHAVIOR:
//     // - Selecting dates only changes local UI state.
//     // - API calls happen ONLY when user clicks this SAVE button.
//     // - After successful save/update/delete, the calendar should REFRESH from backend and saved visual markers (red/blue) must remain.
//     // - We will NOT clear the saved availabilitySlots after saving. We WILL clear only temporary selection state used for the create/edit action.

//     if (editingSlot) {
//       setLoading(true);
//       console.log("🔄 USER CLICKED UPDATE - EDIT MODE");

//       try {
//         const slotId = getSlotId(editingSlot);

//         if (!slotId) {
//           throw new Error("Invalid slot ID for editing");
//         }

//         if (selectedDatesToRemove.length > 0) {
//           console.log(
//             "📅 PROCESSING DATE REMOVALS:",
//             selectedDatesToRemove.length
//           );

//           const originalFromDate = new Date(
//             editingSlot.fromDate.split("T")[0]
//           );
//           originalFromDate.setHours(0, 0, 0, 0);
//           const originalToDate = new Date(editingSlot.toDate.split("T")[0]);
//           originalToDate.setHours(0, 0, 0, 0);

//           const removalSet = new Set(
//             selectedDatesToRemove.map((d) => {
//               const normalized = new Date(d);
//               normalized.setHours(0, 0, 0, 0);
//               return normalized.getTime();
//             })
//           );

//           const allDates: Date[] = [];
//           const currentDate = new Date(originalFromDate);
//           while (currentDate <= originalToDate) {
//             allDates.push(new Date(currentDate));
//             currentDate.setDate(currentDate.getDate() + 1);
//           }

//           const remainingDates = allDates.filter((d) => {
//             const normalized = new Date(d);
//             normalized.setHours(0, 0, 0, 0);
//             return !removalSet.has(normalized.getTime());
//           });

//           console.log("📊 DATE REMOVAL STATS:", {
//             original: allDates.length,
//             removing: selectedDatesToRemove.length,
//             remaining: remainingDates.length,
//           });

//           if (remainingDates.length === 0) {
//             console.log("🗑️ ALL DATES REMOVED - DELETING ENTIRE SLOT");
//             await availabilityAPI.deleteNotAvailability(slotId);
//             showMessage("success", "✅ All dates removed! Slot deleted.");
//           } else {
//             const ranges: { start: Date; end: Date }[] = [];
//             let rangeStart = remainingDates[0];
//             let rangeEnd = remainingDates[0];

//             for (let i = 1; i < remainingDates.length; i++) {
//               const prevDate = remainingDates[i - 1];
//               const currDate = remainingDates[i];
//               const dayDiff =
//                 (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);

//               if (dayDiff === 1) {
//                 rangeEnd = currDate;
//               } else {
//                 ranges.push({ start: rangeStart, end: rangeEnd });
//                 rangeStart = currDate;
//                 rangeEnd = currDate;
//               }
//             }
//             ranges.push({ start: rangeStart, end: rangeEnd });

//             console.log("📦 SPLIT INTO RANGES:", ranges.length);

//             const firstRange = ranges[0];
//             const updatePayload = {
//               userId,
//               VechileId: VechileId,
//               vechileType: vehicleType,
//               fromDate: formatDateForAPI(firstRange.start),
//               toDate: formatDateForAPI(firstRange.end),
//               fromTime: formatTimeForAPI(startTime),
//               toTime: formatTimeForAPI(endTime),
//               isNotAvailable: availability === "notAvailable",
//             };

//             console.log("📤 UPDATING FIRST RANGE:", updatePayload);
//             await availabilityAPI.updateNotAvailability(slotId, updatePayload);

//             for (let i = 1; i < ranges.length; i++) {
//               const range = ranges[i];
//               const createPayload = {
//                 userId,
//                 VechileId: VechileId,
//                 vechileType: vehicleType,
//                 fromDate: formatDateForAPI(range.start),
//                 toDate: formatDateForAPI(range.end),
//                 fromTime: formatTimeForAPI(startTime),
//                 toTime: formatTimeForAPI(endTime),
//                 isNotAvailable: availability === "notAvailable",
//               };
//               console.log("📤 CREATING ADDITIONAL RANGE:", createPayload);
//               await availabilityAPI.createNotAvailability(createPayload);
//             }

//             showMessage(
//               "success",
//               `✅ Updated! ${selectedDatesToRemove.length} date(s) removed. ${
//                 ranges.length > 1 ? `Split into ${ranges.length} slots.` : ""
//               }`
//             );
//           }
//         } else {
//           console.log("⚙️ SIMPLE UPDATE - Updating slot properties");

//           const updatePayload = {
//             userId,
//             VechileId: VechileId,
//             vechileType: vehicleType,
//             fromDate: formatDateForAPI(selectedStartDate),
//             toDate: formatDateForAPI(selectedEndDate),
//             fromTime: formatTimeForAPI(startTime),
//             toTime: formatTimeForAPI(endTime),
//             isNotAvailable: availability === "notAvailable",
//           };

//           console.log("📤 SENDING SIMPLE UPDATE:", updatePayload);
//           await availabilityAPI.updateNotAvailability(slotId, updatePayload);

//           showMessage("success", "✅ Slot updated successfully!");
//         }

//         console.log("✅ UPDATE COMPLETE - RELOADING SLOTS FROM BACKEND");

//         // Refresh saved slots in calendar so customers see the updated saved data.
//         await loadAllSlots();

//         // Only clear temporary selection/edit state (so saved markers persist)
//         setSelectedDatesToRemove([]);
//         setSelectedStartDate(null);
//         setSelectedEndDate(null);
//         setEditingSlot(null);
//       } catch (error: any) {
//         console.error("❌ UPDATE ERROR:", error);
//         showMessage("error", `❌ Update failed: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//       return;
//     }

//     // CREATE MODE
//     if (!selectedStartDate || !selectedEndDate) {
//       showMessage("error", "⚠️ Please select both start and end dates");
//       return;
//     }

//     const formattedStartDate = formatDateForAPI(selectedStartDate);
//     const formattedEndDate = formatDateForAPI(selectedEndDate);

//     setLoading(true);
//     console.log("💾 USER CLICKED SAVE - CREATING NEW SLOT");

//     const payload = {
//       userId,
//       VechileId: VechileId,
//       vechileType: vehicleType,
//       fromDate: formattedStartDate,
//       toDate: formattedEndDate,
//       fromTime: formatTimeForAPI(startTime),
//       toTime: formatTimeForAPI(endTime),
//       isNotAvailable: availability === "notAvailable",
//     };

//     console.log("📤 CREATE PAYLOAD:", payload);

//     try {
//       const response = await availabilityAPI.createNotAvailability(payload);
//       console.log("✅ CREATE SUCCESS:", response);

//       showMessage(
//         "success",
//         availability === "notAvailable"
//           ? "✅ Dates blocked successfully!"
//           : "✅ Dates marked available!"
//       );

//       // Reload the saved slots so the saved markers persist and will be visible on reopen
//       await loadAllSlots();

//       // IMPORTANT: clear only temporary selection used for creating,
//       // do NOT wipe the backend-loaded availabilitySlots
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       setSelectedDatesToRemove([]);
//       setEditingSlot(null);
//     } catch (error: any) {
//       console.error("❌ SAVE ERROR:", error);
//       showMessage("error", `❌ Save failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // CALENDAR RENDERING
//   // ==========================================
//   const monthName = currentMonth.toLocaleDateString("en-US", {
//     month: "long",
//     year: "numeric",
//   });
//   const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   const daysInMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth() + 1,
//     0
//   ).getDate();

//   const firstDayOfMonth = new Date(
//     currentMonth.getFullYear(),
//     currentMonth.getMonth(),
//     1
//   ).getDay();

//   const renderCalendarDays = () => {
//     const days: JSX.Element[] = [];
//     const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

//     for (let i = 0; i < startDay; i++) {
//       days.push(<div key={`empty-${i}`} className="h-12" />);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(
//         currentMonth.getFullYear(),
//         currentMonth.getMonth(),
//         day
//       );
//       const isSelected = isDateSelected(date);
//       const inRange = isDateInRange(date);
//       const past = isPastDate(date);
//       const markedForRemoval = isDateMarkedForRemoval(date);

//       const slotStatus = getDateSlotStatus(date);

//       const isPermanentlyBlocked = slotStatus.blocked;
//       const isPermanentlyAvailable = slotStatus.available;

//       const showBlockedStyle =
//         isPermanentlyBlocked ||
//         (inRange && availability === "notAvailable" && !isPermanentlyAvailable);
//       const showAvailableStyle =
//         isPermanentlyAvailable ||
//         (inRange && availability === "available" && !isPermanentlyBlocked);

//       const shouldShowAsNormal = markedForRemoval && editingSlot;

//       days.push(
//         <button
//           key={day}
//           disabled={past}
//           className={`h-12 rounded-lg transition relative font-medium ${
//             past
//               ? "text-gray-300 cursor-not-allowed bg-gray-50"
//               : shouldShowAsNormal
//               ? "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
//               : showBlockedStyle
//               ? "bg-red-50 border-2 border-red-400"
//               : showAvailableStyle
//               ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md"
//               : inRange
//               ? "bg-blue-100 text-blue-700 border border-blue-300"
//               : isSelected
//               ? "bg-blue-200 text-blue-900 border-2 border-blue-500"
//               : "text-gray-700 hover:bg-gray-100 border border-transparent"
//           }`}
//           onClick={() => !past && handleDateClick(date)}
//         >
//           <span
//             className={
//               showBlockedStyle && !shouldShowAsNormal
//                 ? "relative z-10 font-bold"
//                 : ""
//             }
//           >
//             {day}
//           </span>
//           {showBlockedStyle && !shouldShowAsNormal && (
//             <>
//               <svg
//                 className="absolute inset-0 w-full h-full pointer-events-none z-20"
//                 viewBox="0 0 40 40"
//               >
//                 <line
//                   x1="6"
//                   y1="6"
//                   x2="34"
//                   y2="34"
//                   stroke="#dc2626"
//                   strokeWidth="3"
//                   strokeLinecap="round"
//                 />
//                 <line
//                   x1="34"
//                   y1="6"
//                   x2="6"
//                   y2="34"
//                   stroke="#dc2626"
//                   strokeWidth="3"
//                   strokeLinecap="round"
//                 />
//               </svg>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white z-30" />
//             </>
//           )}
//         </button>
//       );
//     }
//     return days;
//   };

//   const generateTimeOptions = () => {
//     const options: { value: string; label: string }[] = [];
//     for (let h = 0; h < 24; h++) {
//       for (let m = 0; m < 60; m += 30) {
//         const hour = h.toString().padStart(2, "0");
//         const minute = m.toString().padStart(2, "0");
//         const time = `${hour}:${minute}`;
//         const period = h >= 12 ? "PM" : "AM";
//         const displayHour = h % 12 || 12;
//         options.push({ value: time, label: `${displayHour}:${minute} ${period}` });
//       }
//     }
//     return options;
//   };

//   const timeOptions = generateTimeOptions();

//   // ==========================================
//   // MAIN RENDER
//   // ==========================================
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               {editingSlot ? (
//                 <>
//                   <Edit2 size={24} className="text-orange-600" />
//                   Edit Availability Slot
//                 </>
//               ) : (
//                 <>
//                   <Calendar size={24} className="text-blue-600" />
//                   Manage Availability
//                 </>
//               )}
//             </h2>
//           </div>

//           <div className="flex items-center gap-2">
//             {availabilitySlots.length > 0 && (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowOptionsMenu(!showOptionsMenu)}
//                   className="p-2 rounded-lg hover:bg-gray-100 transition"
//                   title="Options"
//                 >
//                   <MoreVertical size={20} />
//                 </button>

//                 {showOptionsMenu && (
//                   <>
//                     <div
//                       className="fixed inset-0 z-30"
//                       onClick={() => setShowOptionsMenu(false)}
//                     />
//                     <div className="absolute right-0 top-12 bg-white border-2 border-gray-200 rounded-lg shadow-xl w-48 z-40">
//                       <button
//                         onClick={handleEditFromMenu}
//                         className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-2 border-b"
//                       >
//                         <Edit2 size={16} />
//                         Edit
//                       </button>
//                       <button
//                         onClick={handleDeleteFromMenu}
//                         className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center gap-2 text-red-600"
//                       >
//                         <Trash2 size={16} />
//                         Delete
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition">
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         {editingSlot && (
//           <div className="mx-6 mt-4 p-4 bg-orange-50 border-2 border-orange-300 rounded-lg">
//             <div className="flex items-start justify-between">
//               <div className="flex-1">
//                 <p className="font-bold text-orange-900 mb-3 flex items-center gap-2">
//                   <Edit2 size={18} />
//                   🎯 EDIT MODE ACTIVE
//                 </p>

//                 <div className="bg-white border-2 border-orange-200 rounded-lg p-3 mb-3">
//                   <p className="text-sm font-semibold text-orange-900 mb-2">
//                     📅 Current Slot:
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     {formatDateForDisplay(new Date(editingSlot.fromDate))} →
//                     {formatDateForDisplay(new Date(editingSlot.toDate))}
//                   </p>
//                   <p className="text-xs text-gray-600 mt-1">
//                     Status: {editingSlot.isNotAvailable ? "🔴 Not Available" : "🔵 Available"} | Time:{" "}
//                     {editingSlot.fromTime} - {editingSlot.toTime}
//                   </p>
//                 </div>

//                 {selectedDatesToRemove.length > 0 && (
//                   <div className="mt-3 p-3 bg-white border-2 border-orange-400 rounded animate-pulse">
//                     <p className="text-sm font-bold text-orange-900 flex items-center gap-2">
//                       <AlertCircle size={16} />
//                       ✓ {selectedDatesToRemove.length} date(s) marked for removal
//                     </p>
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={handleCancelEdit}
//                 className="text-orange-600 hover:text-orange-800 p-1 ml-4"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//           </div>
//         )}

//         {message.text && (
//           <div className="mx-6 mt-4">
//             <div
//               className={`p-4 rounded-lg font-medium flex items-center gap-3 ${
//                 message.type === "success"
//                   ? "bg-green-50 text-green-800 border-2 border-green-300"
//                   : message.type === "error"
//                   ? "bg-red-50 text-red-800 border-2 border-red-300"
//                   : message.type === "warning"
//                   ? "bg-yellow-50 text-yellow-800 border-2 border-yellow-300"
//                   : "bg-blue-50 text-blue-800 border-2 border-blue-300"
//               }`}
//             >
//               {message.type === "success" && <Check size={20} />}
//               {message.type === "error" && <AlertCircle size={20} />}
//               {message.type === "warning" && <AlertCircle size={20} />}
//               {message.type === "info" && <Calendar size={20} />}
//               <span>{message.text}</span>
//             </div>
//           </div>
//         )}

//         <div className="p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div
//                   onClick={() => !editingSlot && setActiveInput("start")}
//                   className={`cursor-pointer ${editingSlot ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                 >
//                   <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                     <Calendar size={16} />
//                     Start Date
//                   </label>
//                   <div
//                     className={`border-2 rounded-lg p-4 text-center font-semibold text-lg transition ${
//                       activeInput === "start" ? "border-blue-500 bg-blue-50" : "border-gray-300"
//                     }`}
//                   >
//                     {formatDateForDisplay(selectedStartDate)}
//                   </div>
//                 </div>

//                 <div
//                   onClick={() => !editingSlot && setActiveInput("end")}
//                   className={`cursor-pointer ${editingSlot ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                 >
//                   <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                     <Calendar size={16} />
//                     End Date
//                   </label>
//                   <div
//                     className={`border-2 rounded-lg p-4 text-center font-semibold text-lg transition ${
//                       activeInput === "end" ? "border-blue-500 bg-blue-50" : "border-gray-300"
//                     }`}
//                   >
//                     {formatDateForDisplay(selectedEndDate)}
//                   </div>
//                 </div>
//               </div>

//               <div className="border-2 border-gray-200 rounded-lg p-5 bg-white shadow-sm">
//                 <div className="flex items-center justify-between mb-4">
//                   <button
//                     onClick={previousMonth}
//                     disabled={loading}
//                     className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//                   >
//                     <ChevronLeft size={24} />
//                   </button>

//                   <h3 className="font-bold text-xl">{monthName}</h3>

//                   <button
//                     onClick={nextMonth}
//                     disabled={loading}
//                     className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//                   >
//                     <ChevronRight size={24} />
//                   </button>
//                 </div>

//                 {loading && (
//                   <div className="text-center py-8 text-gray-500">
//                     <div className="animate-spin mx-auto mb-2 w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
//                     <p>Loading...</p>
//                   </div>
//                 )}

//                 <div className="grid grid-cols-7 gap-2 mb-3">
//                   {weekDays.map((day) => (
//                     <div key={day} className="text-center text-sm font-bold text-gray-600">
//                       {day}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">Start Time</label>
//                 <select
//                   value={startTime}
//                   onChange={(e) => setStartTime(e.target.value)}
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none"
//                 >
//                   {timeOptions.map((time) => (
//                     <option key={time.value} value={time.value}>
//                       {time.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">End Time</label>
//                 <select
//                   value={endTime}
//                   onChange={(e) => setEndTime(e.target.value)}
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none"
//                 >
//                   {timeOptions.map((time) => (
//                     <option key={time.value} value={time.value}>
//                       {time.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
//                 <select
//                   value={availability}
//                   onChange={(e) => setAvailability(e.target.value)}
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none"
//                 >
//                   <option value="available">✅ Available for Booking</option>
//                   <option value="notAvailable">❌ Not Available (Block)</option>
//                 </select>
//               </div>

//               {editingSlot && (
//                 <button
//                   onClick={handleCancelEdit}
//                   disabled={loading}
//                   className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition disabled:opacity-50"
//                 >
//                   Cancel Edit
//                 </button>
//               )}

//               <button
//                 onClick={handleConfirmAndSave}
//                 disabled={
//                   editingSlot
//                     ? loading
//                     : (!selectedStartDate || !selectedEndDate) || loading
//                 }
//                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin w-5 h-5 border-3 border-white border-t-transparent rounded-full" />
//                     {editingSlot ? "Updating..." : "Saving..."}
//                   </>
//                 ) : editingSlot ? (
//                   <>
//                     <Edit2 size={18} />
//                     {selectedDatesToRemove.length > 0
//                       ? `Update - Remove ${selectedDatesToRemove.length} date(s)`
//                       : "Update Slot"}
//                   </>
//                 ) : (
//                   <>
//                     <Check size={18} />
//                     Confirm & Save
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {availabilitySlots.length > 0 && !loading && (
//           <div className="mx-6 mb-6 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
//             <div className="flex items-center gap-3">
//               <Check size={20} className="text-green-600 flex-shrink-0" />
//               <div>
//                 <p className="font-bold text-green-900">✨ Data Loaded from Backend</p>
//                 <p className="text-sm text-green-800 mt-1">
//                   {availabilitySlots.length} slot{availabilitySlots.length !== 1 ? "s" : ""} persisted in database
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VehicleAvailabilityCalendar;












// import React, { useState, useEffect } from "react";
// import {
//   X,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
//   Edit2,
//   Trash2,
//   Check,
//   AlertCircle,
//   ChevronDown,
//   ChevronUp,
//   Info,
// } from "lucide-react";

// interface VehicleAvailabilityCalendarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   VechileId: string;
//   vehicleType: "Car" | "Bike" | "Auto";
//   userId: string;
//   userRole?: "owner" | "customer";
//   apiBaseUrl?: string;
//   editSlotId?: string | null;
//   onAvailabilityCreated?: (data: any) => void;
//   onAvailabilityUpdated?: (data: any) => void;
//   onAvailabilityDeleted?: (id: string) => void;
// }

// interface UnavailableSlot {
//   id: string;
//   dates: Date[];
//   fromDate: string;
//   toDate: string;
//   fromTime: string;
//   toTime: string;
//   reason: string;
//   isNotAvailable: boolean;
// }

// const VehicleAvailabilityCalendar: React.FC<VehicleAvailabilityCalendarProps> = ({
//   isOpen,
//   onClose,
//   VechileId,
//   vehicleType,
//   userId,
//   userRole = "owner",
//   apiBaseUrl = "http://3.110.122.127:3000",
//   editSlotId = null,
//   onAvailabilityCreated,
//   onAvailabilityUpdated,
//   onAvailabilityDeleted,
// }) => {
//   // ==========================================
//   // STATE MANAGEMENT
//   // ==========================================
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
//   const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
//   const [startTime, setStartTime] = useState("06:00");
//   const [endTime, setEndTime] = useState("18:00");
  
//   // Availability data
//   const [unavailableDates, setUnavailableDates] = useState<UnavailableSlot[]>([]);
//   const [bookedDates, setBookedDates] = useState<Date[]>([]);
  
//   // UI modes
//   const [editMode, setEditMode] = useState(false);
//   const [deleteMode, setDeleteMode] = useState(false);
//   const [selectedSlotForEdit, setSelectedSlotForEdit] = useState<any>(null);
  
//   // Loading & messages
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [fadeOpacity, setFadeOpacity] = useState(1);
  
//   // Month/Year picker
//   const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);

//   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//   const years = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - 5 + i);

//   // ==========================================
//   // API LAYER
//   // ==========================================
//   const availabilityAPI = {
//     getVehicleAvailability: async (
//       vehicleId: string,
//       vehicleType: string,
//       startDate: string,
//       endDate: string
//     ) => {
//       console.log("🌐 Fetching availability:", { vehicleId, vehicleType, startDate, endDate });

//       try {
//         const url = `${apiBaseUrl}/getVehicleAvailability?VechileId=${vehicleId}&vechileType=${vehicleType}&startDate=${startDate}&endDate=${endDate}`;
//         const response = await fetch(url, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Availability response:", result);

//         // Handle multiple response formats
//         let allSlots: any[] = [];
        
//         if (result?.availability && Array.isArray(result.availability)) {
//           for (const dateEntry of result.availability) {
//             if (dateEntry.slots && Array.isArray(dateEntry.slots)) {
//               const slotsWithDate = dateEntry.slots.map((slot: any) => ({
//                 ...slot,
//                 date: dateEntry.date,
//                 dateStatus: dateEntry.status,
//               }));
//               allSlots.push(...slotsWithDate);
//             }
//           }
//         } else if (result?.data?.availability && Array.isArray(result.data.availability)) {
//           for (const dateEntry of result.data.availability) {
//             if (dateEntry.slots && Array.isArray(dateEntry.slots)) {
//               const slotsWithDate = dateEntry.slots.map((slot: any) => ({
//                 ...slot,
//                 date: dateEntry.date,
//                 dateStatus: dateEntry.status,
//               }));
//               allSlots.push(...slotsWithDate);
//             }
//           }
//         } else if (result?.blockedSlots) {
//           allSlots = result.blockedSlots;
//         } else if (result?.data && Array.isArray(result.data)) {
//           allSlots = result.data;
//         } else if (Array.isArray(result)) {
//           allSlots = result;
//         }

//         console.log(`✅ Total slots loaded: ${allSlots.length}`);
//         return allSlots;
//       } catch (error) {
//         console.error("❌ API ERROR: getVehicleAvailability", error);
//         return [];
//       }
//     },

//     getNotAvailabilityById: async (id: string) => {
//       console.log("🌐 Fetching slot by ID:", id);

//       try {
//         const response = await fetch(`${apiBaseUrl}/getNotAvailabilityById/${id}`, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Slot data:", result);

//         if (result.success && result.data) return result.data;
//         if (result.data) return result.data;
//         if (result._id) return result;
        
//         return null;
//       } catch (error) {
//         console.error("❌ API ERROR: getNotAvailabilityById", error);
//         throw error;
//       }
//     },

//     createNotAvailability: async (payload: any) => {
//       console.log("🌐 Creating not-availability:", payload);

//       try {
//         const formData = new URLSearchParams();
//         formData.append("userId", payload.userId);
//         formData.append("vechileType", payload.vechileType);
//         formData.append("VechileId", payload.VechileId);
//         formData.append("fromDate", payload.fromDate);
//         formData.append("toDate", payload.toDate);
//         formData.append("fromTime", payload.fromTime);
//         formData.append("toTime", payload.toTime);
//         formData.append("isNotAvailable", String(payload.isNotAvailable));

//         const response = await fetch(`${apiBaseUrl}/createNotAvailability`, {
//           method: "POST",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: formData.toString(),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Created:", result);

//         return { success: true, data: result.data || result };
//       } catch (error) {
//         console.error("❌ API ERROR: createNotAvailability", error);
//         throw error;
//       }
//     },

//     updateNotAvailability: async (id: string, payload: any) => {
//       console.log("🌐 Updating not-availability:", { id, payload });

//       try {
//         const formData = new URLSearchParams();
//         if (payload.userId) formData.append("userId", payload.userId);
//         formData.append("vechileType", payload.vechileType);
//         formData.append("VechileId", payload.VechileId);
//         formData.append("fromDate", payload.fromDate);
//         formData.append("toDate", payload.toDate);
//         formData.append("fromTime", payload.fromTime);
//         formData.append("toTime", payload.toTime);
//         formData.append("isNotAvailable", String(payload.isNotAvailable));

//         const response = await fetch(`${apiBaseUrl}/updateNotAvailability/${id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: formData.toString(),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Updated:", result);

//         return { success: true, data: result.data || result };
//       } catch (error) {
//         console.error("❌ API ERROR: updateNotAvailability", error);
//         throw error;
//       }
//     },

//     deleteNotAvailability: async (id: string) => {
//       console.log("🌐 Deleting not-availability:", id);

//       try {
//         const response = await fetch(`${apiBaseUrl}/deleteNotAvailability/${id}`, {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Deleted:", result);

//         return { success: true, data: result };
//       } catch (error) {
//         console.error("❌ API ERROR: deleteNotAvailability", error);
//         throw error;
//       }
//     },
//   };

//   // ==========================================
//   // UTILITY FUNCTIONS
//   // ==========================================
//   const formatDateForAPI = (date: Date | null): string => {
//     if (!date) return "";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const formatDateForDisplay = (date: Date | null): string => {
//     if (!date) return "Select Date";
//     return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
//   };

//   const formatTimeForAPI = (time: string): string => {
//     const [hours, minutes] = time.split(":");
//     return `${hours}.${minutes}`;
//   };

//   const showMessage = (type: string, text: string) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 4000);
//   };

//   const isPastDate = (date: Date): boolean => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const checkDate = new Date(date);
//     checkDate.setHours(0, 0, 0, 0);
//     return checkDate < today;
//   };

//   const getDateRangeArray = (startDateStr: string, endDateStr: string): Date[] => {
//     const dates: Date[] = [];
//     const start = new Date(startDateStr + "T00:00:00");
//     const end = new Date(endDateStr + "T00:00:00");
//     const current = new Date(start);

//     while (current <= end) {
//       dates.push(new Date(current));
//       current.setDate(current.getDate() + 1);
//     }

//     return dates;
//   };

//   const isDateUnavailable = (date: Date): boolean => {
//     const dateStr = formatDateForAPI(date);

//     // Check booked dates
//     const booked = bookedDates.some((bd) => formatDateForAPI(bd) === dateStr);
//     if (booked) return true;

//     // Check unavailable slots
//     return unavailableDates.some((slot) =>
//       slot.dates.some((d) => formatDateForAPI(d) === dateStr)
//     );
//   };

//   const getUnavailableSlotForDate = (date: Date): UnavailableSlot | null => {
//     const normalized = new Date(date).setHours(0, 0, 0, 0);
//     return (
//       unavailableDates.find((slot) => {
//         const from = new Date(slot.fromDate).setHours(0, 0, 0, 0);
//         const to = new Date(slot.toDate).setHours(0, 0, 0, 0);
//         return normalized >= from && normalized <= to;
//       }) || null
//     );
//   };

//   const checkRangeHasUnavailableDates = (startDate: Date, endDate: Date): boolean => {
//     const dates = getDateRangeArray(formatDateForAPI(startDate), formatDateForAPI(endDate));
//     return dates.some((date) => isDateUnavailable(date));
//   };

//   const isDateSelected = (date: Date): boolean => {
//     return (
//       (selectedStartDate &&
//         date.getDate() === selectedStartDate.getDate() &&
//         date.getMonth() === selectedStartDate.getMonth() &&
//         date.getFullYear() === selectedStartDate.getFullYear()) ||
//       false
//     );
//   };

//   const isDateInRange = (date: Date): boolean => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     const start = new Date(selectedStartDate.setHours(0, 0, 0, 0));
//     const end = new Date(selectedEndDate.setHours(0, 0, 0, 0));
//     const d = new Date(date.setHours(0, 0, 0, 0));
//     return d > start && d < end;
//   };

//   const isDateStartOrEnd = (date: Date): boolean => {
//     if (!selectedStartDate && !selectedEndDate) return false;
//     const d = new Date(date.setHours(0, 0, 0, 0));
//     const isStart =
//       selectedStartDate && d.getTime() === new Date(selectedStartDate.setHours(0, 0, 0, 0)).getTime();
//     const isEnd = selectedEndDate && d.getTime() === new Date(selectedEndDate.setHours(0, 0, 0, 0)).getTime();
//     return !!(isStart || isEnd);
//   };

//   // ==========================================
//   // DATA LOADING
//   // ==========================================
//   const fetchAvailabilityData = async () => {
//     if (!VechileId) return;
//     setLoading(true);

//     try {
//       const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
//       const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
//       const startDate = formatDateForAPI(startOfMonth);
//       const endDate = formatDateForAPI(endOfMonth);

//       console.log("📅 Fetching month:", { startDate, endDate });

//       const allSlots = await availabilityAPI.getVehicleAvailability(
//         VechileId,
//         vehicleType,
//         startDate,
//         endDate
//       );

//       const unavailable: UnavailableSlot[] = [];
//       const booked: Date[] = [];

//       for (const slot of allSlots) {
//         // Filter by vehicle ID
//         const slotVehicleId =
//           slot.VechileId || slot.vehicleId || slot.vechileId || slot.VehicleId;
//         if (slotVehicleId && String(slotVehicleId) !== String(VechileId)) {
//           continue;
//         }

//         // Determine slot type
//         const isBookedSlot =
//           slot.isBooked === true ||
//           slot.isBooked === "true" ||
//           !!slot.bookingId ||
//           !!slot.booking_id ||
//           (slot.status && String(slot.status).toLowerCase() === "booked") ||
//           (slot.slotStatus && String(slot.slotStatus).toLowerCase() === "booked") ||
//           (slot.type && String(slot.type).toLowerCase() === "booked") ||
//           (slot.dateStatus && String(slot.dateStatus).toLowerCase() === "booked");

//         const isUnavailableSlot =
//           slot.isNotAvailable === true ||
//           slot.isNotAvailable === "true" ||
//           (slot.status && String(slot.status).toLowerCase() === "notavailable") ||
//           (slot.slotStatus && String(slot.slotStatus).toLowerCase() === "notavailable") ||
//           (slot.type && String(slot.type).toLowerCase() === "notavailable") ||
//           (slot.dateStatus && String(slot.dateStatus).toLowerCase() === "unavailable") ||
//           (slot.reason && String(slot.reason).toLowerCase().includes("not available"));

//         // Build date range
//         let dates: Date[] = [];
//         try {
//           const from = slot.fromDate || slot.date;
//           const to = slot.toDate || slot.date;

//           if (!from) continue;

//           if (from === to || !to) {
//             dates = [new Date(from + "T00:00:00")];
//           } else {
//             dates = getDateRangeArray(from, to);
//           }
//         } catch (err) {
//           console.error("Error building dates:", err);
//           continue;
//         }

//         if (isBookedSlot) {
//           booked.push(...dates);
//         } else if (isUnavailableSlot) {
//           unavailable.push({
//             id: slot._id || slot.id || `${slot.date}-${slot.fromTime || "unknown"}`,
//             dates,
//             fromDate: slot.fromDate || slot.date,
//             toDate: slot.toDate || slot.date,
//             fromTime: slot.fromTime || "00:00",
//             toTime: slot.toTime || "23:59",
//             reason: slot.reason || "Owner unavailable",
//             isNotAvailable: true,
//           });
//         }
//       }

//       console.log("✅ Processed:", { unavailable: unavailable.length, booked: booked.length });

//       setUnavailableDates(unavailable);
//       setBookedDates(booked);

//       if (unavailable.length > 0 || booked.length > 0) {
//         showMessage("success", `✅ Loaded ${unavailable.length + booked.length} slot(s)`);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching availability:", error);
//       setUnavailableDates([]);
//       setBookedDates([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadSlotForEditing = async (slotId: string) => {
//     if (!slotId) return;
//     setLoading(true);

//     try {
//       const response = await availabilityAPI.getNotAvailabilityById(slotId);
//       console.log("📝 Loaded slot for editing:", response);

//       if (response) {
//         const fromDate = new Date(response.fromDate);
//         const toDate = new Date(response.toDate);

//         setSelectedStartDate(fromDate);
//         setSelectedEndDate(toDate);
//         setStartTime(response.fromTime || "06:00");
//         setEndTime(response.toTime || "18:00");
//         setSelectedSlotForEdit({
//           id: response._id || response.id || slotId,
//           fromDate: response.fromDate,
//           toDate: response.toDate,
//           fromTime: response.fromTime,
//           toTime: response.toTime,
//         });
//         setEditMode(true);
//         setCurrentMonth(fromDate);
//         showMessage("info", "✏️ Edit mode active");
//       }
//     } catch (error) {
//       console.error("❌ Error loading slot:", error);
//       showMessage("error", "Failed to load slot for editing");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // EFFECTS
//   // ==========================================
//   useEffect(() => {
//     if (isOpen && editSlotId && userRole === "owner") {
//       loadSlotForEditing(editSlotId);
//     }
//   }, [editSlotId, isOpen]);

//   useEffect(() => {
//     if (isOpen && VechileId) {
//       fetchAvailabilityData();
//     }
//   }, [isOpen, VechileId, vehicleType, currentMonth]);

//   useEffect(() => {
//     if (!isOpen) {
//       // Reset on close
//       setEditMode(false);
//       setDeleteMode(false);
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       setSelectedSlotForEdit(null);
//       setShowMonthYearPicker(false);
//     }
//   }, [isOpen]);

//   // ==========================================
//   // EVENT HANDLERS
//   // ==========================================
//   const handleDateClick = (date: Date) => {
//     if (isPastDate(date)) return;

//     const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

//     // Customer mode: prevent selecting unavailable dates
//     if (userRole === "customer" && isDateUnavailable(normalizedDate)) {
//       const slot = getUnavailableSlotForDate(normalizedDate);
//       const reason = slot ? slot.reason : "Not available";
//       showMessage("error", `❌ Date unavailable: ${reason}`);
//       return;
//     }

//     // Owner edit mode: select start/end dates
//     if (userRole === "owner" && editMode) {
//       setFadeOpacity(0.6);

//       if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
//         setSelectedStartDate(normalizedDate);
//         setSelectedEndDate(null);
//       } else {
//         let from = selectedStartDate;
//         let to = normalizedDate;

//         if (normalizedDate < selectedStartDate) {
//           from = normalizedDate;
//           to = selectedStartDate;
//         }

//         setSelectedStartDate(from);
//         setSelectedEndDate(to);
//       }

//       setTimeout(() => setFadeOpacity(1), 120);
//       return;
//     }

//     // Owner delete mode: delete clicked slot
//     if (userRole === "owner" && deleteMode) {
//       const slot = getUnavailableSlotForDate(normalizedDate);
//       if (slot) {
//         handleDeleteSlot(slot);
//       } else {
//         showMessage("error", "❌ No slot found for this date");
//       }
//       return;
//     }

//     // Owner normal mode: clicking unavailable date opens it for editing
//     if (userRole === "owner" && !editMode && !deleteMode) {
//       const slot = getUnavailableSlotForDate(normalizedDate);
//       if (slot) {
//         setSelectedStartDate(new Date(slot.fromDate));
//         setSelectedEndDate(new Date(slot.toDate));
//         setStartTime(slot.fromTime);
//         setEndTime(slot.toTime);
//         setSelectedSlotForEdit(slot);
//         setEditMode(true);
//         showMessage("info", "✏️ Edit mode - select new dates or click ✓ to save");
//         return;
//       }
//     }

//     // Default selection (customer or owner normal mode)
//     setFadeOpacity(0.6);

//     if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
//       setSelectedStartDate(normalizedDate);
//       setSelectedEndDate(null);
//     } else {
//       let from = selectedStartDate;
//       let to = normalizedDate;

//       if (normalizedDate < selectedStartDate) {
//         from = normalizedDate;
//         to = selectedStartDate;
//       }

//       // Customer: check range for unavailable dates
//       if (userRole === "customer") {
//         const hasUnavailable = checkRangeHasUnavailableDates(from, to);
//         if (hasUnavailable) {
//           showMessage("error", "❌ Range contains unavailable dates");
//           setSelectedStartDate(null);
//           setSelectedEndDate(null);
//           setTimeout(() => setFadeOpacity(1), 120);
//           return;
//         }
//       }

//       setSelectedStartDate(from);
//       setSelectedEndDate(to);
//     }

//     setTimeout(() => setFadeOpacity(1), 120);
//   };

//   const handleEditIconPress = () => {
//     if (editMode && selectedStartDate && selectedEndDate) {
//       handleSaveEdit();
//     } else {
//       setEditMode(true);
//       setDeleteMode(false);
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       setSelectedSlotForEdit(null);
//       showMessage("info", "✏️ Edit mode - select dates to mark as unavailable");
//     }
//   };

//   const handleSaveEdit = async () => {
//     if (!selectedStartDate || !selectedEndDate) {
//       showMessage("error", "⚠️ Please select both start and end dates");
//       return;
//     }

//     setFadeOpacity(0.6);
//     setLoading(true);

//     try {
//       const fromDateStr = formatDateForAPI(selectedStartDate);
//       const toDateStr = formatDateForAPI(selectedEndDate);

//       console.log("💾 Saving:", { fromDateStr, toDateStr });

//       let response;

//       if (selectedSlotForEdit && selectedSlotForEdit.id) {
//         // UPDATE existing slot
//         response = await availabilityAPI.updateNotAvailability(selectedSlotForEdit.id, {
//           userId: userId,
//           VechileId: VechileId,
//           vechileType: vehicleType,
//           fromDate: fromDateStr,
//           toDate: toDateStr,
//           fromTime: formatTimeForAPI(startTime),
//           toTime: formatTimeForAPI(endTime),
//           isNotAvailable: true,
//         });

//         if (response && response.success) {
//           onAvailabilityUpdated && onAvailabilityUpdated(response.data || response);
//           showMessage("success", "✅ Dates updated successfully");
//         }
//       } else {
//         // CREATE new slot
//         response = await availabilityAPI.createNotAvailability({
//           userId: userId,
//           VechileId: VechileId,
//           vechileType: vehicleType,
//           fromDate: fromDateStr,
//           toDate: toDateStr,
//           fromTime: formatTimeForAPI(startTime),
//           toTime: formatTimeForAPI(endTime),
//           isNotAvailable: true,
//         });

//         if (response && response.success) {
//           onAvailabilityCreated && onAvailabilityCreated(response.data || response);
//           showMessage("success", "✅ Dates blocked successfully");
//         }
//       }

//       if (response && response.success) {
//         console.log("✅ Save successful");

//         // Clear selections and exit edit mode FIRST
//         setEditMode(false);
//         setSelectedStartDate(null);
//         setSelectedEndDate(null);
//         setSelectedSlotForEdit(null);

//         // Then refresh calendar
//         await fetchAvailabilityData();
//       } else {
//         showMessage("error", "❌ Failed to save changes");
//       }
//     } catch (err) {
//       console.error("❌ Save error:", err);
//       showMessage("error", "❌ Failed to save changes");
//     } finally {
//       setLoading(false);
//       setFadeOpacity(1);
//     }
//   };

//   const handleDeleteIconPress = () => {
//     if (deleteMode) {
//       setDeleteMode(false);
//       showMessage("info", "Delete mode disabled");
//     } else {
//       setDeleteMode(true);
//       setEditMode(false);
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       setSelectedSlotForEdit(null);
//       showMessage("warning", "🗑️ Delete mode - tap any unavailable date to delete");
//     }
//   };

//   const handleDeleteSlot = async (slot: UnavailableSlot) => {
//     if (!slot || !slot.id) {
//       showMessage("error", "❌ No slot found to delete");
//       return;
//     }

//     if (
//       !window.confirm(
//         `🗑️ Delete unavailable period from ${slot.fromDate} to ${slot.toDate}?\n\nThis cannot be undone.`
//       )
//     ) {
//       return;
//     }

//     setFadeOpacity(0.6);
//     setLoading(true);

//     try {
//       const response = await availabilityAPI.deleteNotAvailability(slot.id);

//       if (response && response.success) {
//         await fetchAvailabilityData();
//         onAvailabilityDeleted && onAvailabilityDeleted(slot.id);
//         setDeleteMode(false);
//         showMessage("success", "✅ Slot deleted successfully");
//       } else {
//         showMessage("error", "❌ Failed to delete slot");
//       }
//     } catch (err) {
//       console.error("❌ Delete error:", err);
//       showMessage("error", "❌ Failed to delete slot");
//     } finally {
//       setLoading(false);
//       setFadeOpacity(1);
//     }
//   };

//   const handleMonthYearSelect = (monthIndex: number, year: number) => {
//     setCurrentMonth(new Date(year, monthIndex, 1));
//     setShowMonthYearPicker(false);
//   };

//   // ==========================================
//   // CALENDAR RENDERING
//   // ==========================================
//   const generateCalendarDays = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const startDate = new Date(firstDay);
//     const dayOfWeek = firstDay.getDay();
//     const adjustment = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
//     startDate.setDate(firstDay.getDate() - adjustment);

//     const days: JSX.Element[] = [];
//     for (let i = 0; i < 42; i++) {
//       const date = new Date(startDate);
//       date.setDate(startDate.getDate() + i);
//       days.push(renderDay(date, i));
//     }

//     return days;
//   };

//   const renderDay = (date: Date, index: number) => {
//     const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
//     const isSelected = isDateSelected(date);
//     const isStartOrEnd = isDateStartOrEnd(date);
//     const isInRange = isDateInRange(date);
//     const isUnavail = isDateUnavailable(date);
//     const isPast = isPastDate(date);
//     const showAsEditing = editMode && (isStartOrEnd || isInRange);
//     const showAsDeleteTarget = deleteMode && isUnavail && !isPast && isCurrentMonth;

//     let bgClass = "bg-white hover:bg-gray-100";
//     let textClass = "text-gray-700";
//     let borderClass = "border border-transparent";
//     let showStrikeLine = false;

//     if (isPast) {
//       bgClass = "bg-gray-50";
//       textClass = "text-gray-300";
//     } else if (showAsEditing && isStartOrEnd) {
//       bgClass = "bg-orange-500";
//       textClass = "text-white font-bold";
//     } else if (showAsEditing && isInRange) {
//       bgClass = "bg-orange-100";
//       textClass = "text-orange-900 font-semibold";
//     } else if (showAsDeleteTarget) {
//       bgClass = "bg-red-50";
//       borderClass = "border-2 border-red-300";
//       textClass = "text-red-800 font-bold";
//     } else if (!showAsEditing && isStartOrEnd) {
//       bgClass = "bg-black";
//       textClass = "text-white font-bold";
//     } else if (!showAsEditing && isInRange) {
//       bgClass = "bg-gray-200";
//       textClass = "text-gray-800 font-medium";
//     } else if (isUnavail) {
//       bgClass = "bg-red-50";
//       borderClass = "border-2 border-red-200";
//       textClass = "text-red-700 font-medium";
//       showStrikeLine = true;
//     }

//     if (!isCurrentMonth) {
//       textClass = "text-gray-300";
//     }

//     return (
//       <button
//         key={index}
//         onClick={() => isCurrentMonth && !isPast && handleDateClick(date)}
//         disabled={isPast || (userRole === "customer" && isUnavail)}
//         className={`relative h-10 w-full rounded-md transition-all ${bgClass} ${textClass} ${borderClass} ${
//           isPast || (userRole === "customer" && isUnavail) ? "cursor-not-allowed opacity-50" : "cursor-pointer"
//         }`}
//       >
//         <span className="relative z-10">{date.getDate()}</span>

//         {/* Strike-through line for unavailable dates */}
//         {showStrikeLine && isCurrentMonth && (
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
//             <div className="w-4/5 h-0.5 bg-red-600 transform rotate-45" />
//             <div className="w-4/5 h-0.5 bg-red-600 transform -rotate-45 absolute" />
//           </div>
//         )}

//         {/* Delete indicator */}
//         {showAsDeleteTarget && (
//           <div className="absolute -top-1 -right-1 z-30">
//             <Trash2 size={12} className="text-red-600" />
//           </div>
//         )}
//       </button>
//     );
//   };

//   const generateTimeOptions = () => {
//     const options: { value: string; label: string }[] = [];
//     for (let h = 0; h < 24; h++) {
//       for (let m = 0; m < 60; m += 30) {
//         const hour = h.toString().padStart(2, "0");
//         const minute = m.toString().padStart(2, "0");
//         const time = `${hour}:${minute}`;
//         const period = h >= 12 ? "PM" : "AM";
//         const displayHour = h % 12 || 12;
//         options.push({
//           value: time,
//           label: `${displayHour}:${minute} ${period}`,
//         });
//       }
//     }
//     return options;
//   };

//   const timeOptions = generateTimeOptions();

//   // ==========================================
//   // MAIN RENDER
//   // ==========================================
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div
//         className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto"
//         style={{ opacity: fadeOpacity, transition: "opacity 0.2s" }}
//       >
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
//           <div className="flex items-center gap-4">
//             <h2 className="text-2xl font-bold text-gray-900">
//               {userRole === "owner" ? "Manage Vehicle Availability" : "Select Booking Dates"}
//             </h2>
//             <div className="flex items-center gap-2">
//               {userRole === "owner" && (
//                 <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full">
//                   Owner Mode
//                 </span>
//               )}
//               {userRole === "customer" && (
//                 <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
//                   Customer View
//                 </span>
//               )}
//               {editMode && (
//                 <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
//                   Editing
//                 </span>
//               )}
//               {deleteMode && (
//                 <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
//                   Delete Mode
//                 </span>
//               )}
//             </div>
//           </div>

//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-gray-100 transition"
//             disabled={loading}
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Edit Mode Banner */}
//         {editMode && userRole === "owner" && (
//           <div className="mx-6 mt-4 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-lg flex items-center gap-3">
//             <Edit2 size={20} className="text-orange-600 flex-shrink-0" />
//             <p className="text-sm text-orange-800 font-medium">
//               Select dates to mark as not available. Tap the ✓ icon to save changes.
//             </p>
//           </div>
//         )}

//         {/* Delete Mode Banner */}
//         {deleteMode && userRole === "owner" && (
//           <div className="mx-6 mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center gap-3">
//             <Trash2 size={20} className="text-red-600 flex-shrink-0" />
//             <p className="text-sm text-red-800 font-medium">
//               Tap any not-available date to delete it.
//             </p>
//           </div>
//         )}

//         {/* Customer Info Banner */}
//         {userRole === "customer" && (unavailableDates.length > 0 || bookedDates.length > 0) && (
//           <div className="mx-6 mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg flex items-center gap-3">
//             <Info size={20} className="text-blue-600 flex-shrink-0" />
//             <p className="text-sm text-blue-800 font-medium">
//               Red crossed dates are not available for booking.
//             </p>
//           </div>
//         )}

//         {/* Message Display */}
//         {message.text && (
//           <div className="mx-6 mt-4">
//             <div
//               className={`p-4 rounded-lg font-medium flex items-center gap-3 ${
//                 message.type === "success"
//                   ? "bg-green-50 text-green-800 border-2 border-green-300"
//                   : message.type === "error"
//                   ? "bg-red-50 text-red-800 border-2 border-red-300"
//                   : message.type === "warning"
//                   ? "bg-yellow-50 text-yellow-800 border-2 border-yellow-300"
//                   : "bg-blue-50 text-blue-800 border-2 border-blue-300"
//               }`}
//             >
//               {message.type === "success" && <Check size={20} />}
//               {message.type === "error" && <AlertCircle size={20} />}
//               {message.type === "warning" && <AlertCircle size={20} />}
//               {message.type === "info" && <Calendar size={20} />}
//               <span>{message.text}</span>
//             </div>
//           </div>
//         )}

//         {/* Loading Overlay */}
//         {loading && (
//           <div className="mx-6 mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-center gap-3">
//             <div className="animate-spin w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full" />
//             <span className="text-gray-700 font-medium">Processing...</span>
//           </div>
//         )}

//         <div className="p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Calendar Section */}
//             <div className="lg:col-span-2 space-y-4">
//               {/* Date Display */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Calendar size={16} className="text-gray-500" />
//                     <label className="text-sm font-medium text-gray-700">From Date</label>
//                   </div>
//                   <div className="text-lg font-bold text-gray-900">
//                     {selectedStartDate ? formatDateForDisplay(selectedStartDate) : "Select"}
//                   </div>
//                 </div>

//                 <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Calendar size={16} className="text-gray-500" />
//                     <label className="text-sm font-medium text-gray-700">To Date</label>
//                   </div>
//                   <div className="text-lg font-bold text-gray-900">
//                     {selectedEndDate ? formatDateForDisplay(selectedEndDate) : "Select"}
//                   </div>
//                 </div>
//               </div>

//               {/* Calendar */}
//               <div className="border-2 border-gray-200 rounded-xl p-5 bg-white shadow-sm">
//                 {/* Month Header */}
//                 <div className="flex items-center justify-between mb-4">
//                   <button
//                     onClick={() =>
//                       setCurrentMonth(
//                         new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
//                       )
//                     }
//                     className="p-2 hover:bg-gray-100 rounded-lg transition"
//                     disabled={loading}
//                   >
//                     <ChevronLeft size={24} />
//                   </button>

//                   <div className="flex flex-col items-center">
//                     <button
//                       onClick={() => setShowMonthYearPicker(!showMonthYearPicker)}
//                       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition"
//                     >
//                       <span className="font-bold text-xl">
//                         {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
//                       </span>
//                       {showMonthYearPicker ? (
//                         <ChevronUp size={16} />
//                       ) : (
//                         <ChevronDown size={16} />
//                       )}
//                     </button>

//                     {/* Month/Year Picker */}
//                     {showMonthYearPicker && (
//                       <div className="mt-2 p-4 bg-gray-50 rounded-lg shadow-lg w-64">
//                         <div className="mb-3">
//                           <div className="grid grid-cols-4 gap-2">
//                             {monthNames.map((m, i) => (
//                               <button
//                                 key={m}
//                                 onClick={() => handleMonthYearSelect(i, currentMonth.getFullYear())}
//                                 className={`px-2 py-1 rounded text-xs font-medium transition ${
//                                   currentMonth.getMonth() === i
//                                     ? "bg-blue-500 text-white"
//                                     : "bg-white hover:bg-gray-200"
//                                 }`}
//                               >
//                                 {m}
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-3 gap-2">
//                           {years.map((y) => (
//                             <button
//                               key={y}
//                               onClick={() => handleMonthYearSelect(currentMonth.getMonth(), y)}
//                               className={`px-2 py-1 rounded text-xs font-medium transition ${
//                                 currentMonth.getFullYear() === y
//                                   ? "bg-blue-500 text-white"
//                                   : "bg-white hover:bg-gray-200"
//                               }`}
//                             >
//                               {y}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Owner Control Icons */}
//                   {userRole === "owner" && (
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={handleEditIconPress}
//                         className={`p-2 rounded-lg transition ${
//                           editMode
//                             ? "bg-green-100 hover:bg-green-200"
//                             : "bg-gray-100 hover:bg-gray-200"
//                         }`}
//                         title={editMode ? "Save changes" : "Edit availability"}
//                         disabled={loading}
//                       >
//                         {editMode ? (
//                           <Check size={24} className="text-green-600" />
//                         ) : (
//                           <Edit2 size={24} className="text-blue-600" />
//                         )}
//                       </button>
//                       <button
//                         onClick={handleDeleteIconPress}
//                         className={`p-2 rounded-lg transition ${
//                           deleteMode
//                             ? "bg-red-100 hover:bg-red-200"
//                             : "bg-gray-100 hover:bg-gray-200"
//                         }`}
//                         title={deleteMode ? "Exit delete mode" : "Delete availability"}
//                         disabled={loading}
//                       >
//                         <Trash2 size={24} className={deleteMode ? "text-red-600" : "text-gray-600"} />
//                       </button>
//                     </div>
//                   )}

//                   <button
//                     onClick={() =>
//                       setCurrentMonth(
//                         new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
//                       )
//                     }
//                     className="p-2 hover:bg-gray-100 rounded-lg transition"
//                     disabled={loading}
//                   >
//                     <ChevronRight size={24} />
//                   </button>
//                 </div>

//                 {/* Week Days */}
//                 <div className="grid grid-cols-7 gap-2 mb-2">
//                   {weekDays.map((day) => (
//                     <div key={day} className="text-center text-sm font-bold text-gray-600">
//                       {day}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Calendar Grid */}
//                 <div className="grid grid-cols-7 gap-2">{generateCalendarDays()}</div>

//                 {/* Legend */}
//                 <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t">
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded" />
//                     <span className="text-xs text-gray-600">Available</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-red-50 border-2 border-red-200 rounded" />
//                     <span className="text-xs text-gray-600">
//                       {userRole === "owner" ? "Unavailable/Booked" : "Not Available"}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-black rounded" />
//                     <span className="text-xs text-gray-600">
//                       {editMode ? "Editing" : "Selected"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Time & Actions Section */}
//             <div className="space-y-4">
//               {/* Start Time */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">Start Time</label>
//                 <select
//                   value={startTime}
//                   onChange={(e) => setStartTime(e.target.value)}
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none"
//                   disabled={loading}
//                 >
//                   {timeOptions.map((time) => (
//                     <option key={time.value} value={time.value}>
//                       {time.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* End Time */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">End Time</label>
//                 <select
//                   value={endTime}
//                   onChange={(e) => setEndTime(e.target.value)}
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none"
//                   disabled={loading}
//                 >
//                   {timeOptions.map((time) => (
//                     <option key={time.value} value={time.value}>
//                       {time.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Summary */}
//               {selectedStartDate && selectedEndDate && (
//                 <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
//                   <p className="text-sm font-bold text-green-900 mb-2">
//                     {editMode ? "Editing Dates" : "Selected Dates"}
//                   </p>
//                   <p className="text-xs text-green-800">
//                     From: {formatDateForAPI(selectedStartDate)}
//                   </p>
//                   <p className="text-xs text-green-800">To: {formatDateForAPI(selectedEndDate)}</p>
//                   {editMode && (
//                     <p className="text-xs text-green-700 mt-2 italic">Tap ✓ icon to save changes</p>
//                   )}
//                 </div>
//               )}

//               {/* Data Info */}
//               {(unavailableDates.length > 0 || bookedDates.length > 0) && !loading && (
//                 <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
//                   <div className="flex items-center gap-2 mb-1">
//                     <Check size={16} className="text-blue-600" />
//                     <p className="text-sm font-bold text-blue-900">Calendar Data Loaded</p>
//                   </div>
//                   <p className="text-xs text-blue-800">
//                     {unavailableDates.length + bookedDates.length} slot(s) from database
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleAvailabilityCalendar;












// import React, { useState, useEffect } from "react";
// import {
//   X,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
//   Edit2,
//   Trash2,
//   Check,
//   AlertCircle,
//   ChevronDown,
//   ChevronUp,
//   Info,
// } from "lucide-react";

// interface VehicleAvailabilityCalendarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   VechileId: string;
//   vehicleType: "Car" | "Bike" | "Auto";
//   userId: string;
//   userRole?: "owner" | "customer";
//   apiBaseUrl?: string;
//   editSlotId?: string | null;
//   onAvailabilityCreated?: (data: any) => void;
//   onAvailabilityUpdated?: (data: any) => void;
//   onAvailabilityDeleted?: (id: string) => void;
//   onConfirm?: (data: { fromDate: Date; toDate: Date; fromTime: string; toTime: string }) => void;
// }

// interface UnavailableSlot {
//   id: string; // REAL MongoDB _id from backend
//   VechileId: string;
//   vehicleType: string;
//   userId: string;
//   dates: Date[];
//   fromDate: string;
//   toDate: string;
//   fromTime: string;
//   toTime: string;
//   reason: string;
//   isNotAvailable: boolean;
//   _id?: string; // Backup field for MongoDB ID
// }

// const VehicleAvailabilityCalendar: React.FC<VehicleAvailabilityCalendarProps> = ({
//   isOpen,
//   onClose,
//   VechileId,
//   vehicleType,
//   userId,
//   userRole = "owner",
//   apiBaseUrl = "http://3.110.122.127:3000",
//   editSlotId = null,
//   onAvailabilityCreated,
//   onAvailabilityUpdated,
//   onAvailabilityDeleted,
//   onConfirm,
// }) => {
//   // ==========================================
//   // STATE MANAGEMENT
//   // ==========================================
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
//   const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
//   const [startTime, setStartTime] = useState("06:00");
//   const [endTime, setEndTime] = useState("18:00");
  
//   // Availability data
//   const [unavailableDates, setUnavailableDates] = useState<UnavailableSlot[]>([]);
//   const [bookedDates, setBookedDates] = useState<Date[]>([]);
  
//   // UI modes
//   const [editMode, setEditMode] = useState(false);
//   const [deleteMode, setDeleteMode] = useState(false);
//   const [selectedSlotForEdit, setSelectedSlotForEdit] = useState<any>(null);
  
//   // Loading & messages
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [fadeOpacity, setFadeOpacity] = useState(1);
  
//   // Month/Year picker
//   const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);

//   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//   const years = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - 5 + i);

//   // ==========================================
//   // API LAYER
//   // ==========================================
//   const availabilityAPI = {
//     getVehicleAvailability: async (
//       vehicleId: string,
//       vehicleType: string,
//       startDate: string,
//       endDate: string
//     ) => {
//       console.log("🌐 Fetching availability:", { vehicleId, vehicleType, startDate, endDate });

//       try {
//         const url = `${apiBaseUrl}/getVehicleAvailability?VechileId=${vehicleId}&vechileType=${vehicleType}&startDate=${startDate}&endDate=${endDate}`;
//         const response = await fetch(url, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Availability response:", result);

//         // Handle multiple response formats
//         let allSlots: any[] = [];
        
//         if (result?.availability && Array.isArray(result.availability)) {
//           for (const dateEntry of result.availability) {
//             if (dateEntry.slots && Array.isArray(dateEntry.slots)) {
//               const slotsWithDate = dateEntry.slots.map((slot: any) => ({
//                 ...slot,
//                 date: dateEntry.date,
//                 dateStatus: dateEntry.status,
//               }));
//               allSlots.push(...slotsWithDate);
//             }
//           }
//         } else if (result?.data?.availability && Array.isArray(result.data.availability)) {
//           for (const dateEntry of result.data.availability) {
//             if (dateEntry.slots && Array.isArray(dateEntry.slots)) {
//               const slotsWithDate = dateEntry.slots.map((slot: any) => ({
//                 ...slot,
//                 date: dateEntry.date,
//                 dateStatus: dateEntry.status,
//               }));
//               allSlots.push(...slotsWithDate);
//             }
//           }
//         } else if (result?.blockedSlots) {
//           allSlots = result.blockedSlots;
//         } else if (result?.data && Array.isArray(result.data)) {
//           allSlots = result.data;
//         } else if (Array.isArray(result)) {
//           allSlots = result;
//         }

//         console.log(`✅ Total slots loaded: ${allSlots.length}`);
//         return allSlots;
//       } catch (error) {
//         console.error("❌ API ERROR: getVehicleAvailability", error);
//         return [];
//       }
//     },

//     getNotAvailabilityById: async (id: string) => {
//       console.log("🌐 Fetching slot by ID:", id);

//       try {
//         const response = await fetch(`${apiBaseUrl}/getNotAvailabilityById/${id}`, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Slot data:", result);

//         if (result.success && result.data) return result.data;
//         if (result.data) return result.data;
//         if (result._id) return result;
        
//         return null;
//       } catch (error) {
//         console.error("❌ API ERROR: getNotAvailabilityById", error);
//         throw error;
//       }
//     },

//     createNotAvailability: async (payload: any) => {
//       console.log("🌐 Creating not-availability:", payload);

//       try {
//         const formData = new URLSearchParams();
//         formData.append("userId", payload.userId);
//         formData.append("vechileType", payload.vechileType);
//         formData.append("VechileId", payload.VechileId);
//         formData.append("fromDate", payload.fromDate);
//         formData.append("toDate", payload.toDate);
//         formData.append("fromTime", payload.fromTime);
//         formData.append("toTime", payload.toTime);
//         formData.append("isNotAvailable", String(payload.isNotAvailable));

//         const response = await fetch(`${apiBaseUrl}/createNotAvailability`, {
//           method: "POST",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: formData.toString(),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Created:", result);

//         return { success: true, data: result.data || result };
//       } catch (error) {
//         console.error("❌ API ERROR: createNotAvailability", error);
//         throw error;
//       }
//     },

//     updateNotAvailability: async (id: string, payload: any) => {
//       console.log("🌐 Updating not-availability:", { id, payload });

//       try {
//         const formData = new URLSearchParams();
//         if (payload.userId) formData.append("userId", payload.userId);
//         formData.append("vechileType", payload.vechileType);
//         formData.append("VechileId", payload.VechileId);
//         formData.append("fromDate", payload.fromDate);
//         formData.append("toDate", payload.toDate);
//         formData.append("fromTime", payload.fromTime);
//         formData.append("toTime", payload.toTime);
//         formData.append("isNotAvailable", String(payload.isNotAvailable));

//         const response = await fetch(`${apiBaseUrl}/updateNotAvailability/${id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: formData.toString(),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Updated:", result);

//         return { success: true, data: result.data || result };
//       } catch (error) {
//         console.error("❌ API ERROR: updateNotAvailability", error);
//         throw error;
//       }
//     },

//     deleteNotAvailability: async (id: string) => {
//       console.log("🌐 Deleting not-availability:", id);

//       try {
//         const response = await fetch(`${apiBaseUrl}/deleteNotAvailability/${id}`, {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Deleted:", result);

//         return { success: true, data: result };
//       } catch (error) {
//         console.error("❌ API ERROR: deleteNotAvailability", error);
//         throw error;
//       }
//     },
//   };

//   // ==========================================
//   // UTILITY FUNCTIONS
//   // ==========================================
//   const formatDateForAPI = (date: Date | null): string => {
//     if (!date) return "";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const formatDateForDisplay = (date: Date | null): string => {
//     if (!date) return "Select Date";
//     return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
//   };

//   const formatTimeForAPI = (time: string): string => {
//     const [hours, minutes] = time.split(":");
//     return `${hours}.${minutes}`;
//   };

//   const showMessage = (type: string, text: string) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 4000);
//   };

//   const isPastDate = (date: Date): boolean => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const checkDate = new Date(date);
//     checkDate.setHours(0, 0, 0, 0);
//     return checkDate < today;
//   };

//   const getDateRangeArray = (startDateStr: string, endDateStr: string): Date[] => {
//     const dates: Date[] = [];
//     const start = new Date(startDateStr + "T00:00:00");
//     const end = new Date(endDateStr + "T00:00:00");
//     const current = new Date(start);

//     while (current <= end) {
//       dates.push(new Date(current));
//       current.setDate(current.getDate() + 1);
//     }

//     return dates;
//   };

//   const isDateUnavailable = (date: Date): boolean => {
//     const dateStr = formatDateForAPI(date);

//     // Check booked dates
//     const booked = bookedDates.some((bd) => formatDateForAPI(bd) === dateStr);
//     if (booked) return true;

//     // Check unavailable slots
//     return unavailableDates.some((slot) =>
//       slot.dates.some((d) => formatDateForAPI(d) === dateStr)
//     );
//   };

//   const getUnavailableSlotForDate = (date: Date): UnavailableSlot | null => {
//     const normalized = new Date(date).setHours(0, 0, 0, 0);
//     return (
//       unavailableDates.find((slot) => {
//         const from = new Date(slot.fromDate).setHours(0, 0, 0, 0);
//         const to = new Date(slot.toDate).setHours(0, 0, 0, 0);
//         return normalized >= from && normalized <= to;
//       }) || null
//     );
//   };

//   const checkRangeHasUnavailableDates = (startDate: Date, endDate: Date): boolean => {
//     const dates = getDateRangeArray(formatDateForAPI(startDate), formatDateForAPI(endDate));
//     return dates.some((date) => isDateUnavailable(date));
//   };

//   const isDateSelected = (date: Date): boolean => {
//     return (
//       (selectedStartDate &&
//         date.getDate() === selectedStartDate.getDate() &&
//         date.getMonth() === selectedStartDate.getMonth() &&
//         date.getFullYear() === selectedStartDate.getFullYear()) ||
//       false
//     );
//   };

//   const isDateInRange = (date: Date): boolean => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     const start = new Date(selectedStartDate.setHours(0, 0, 0, 0));
//     const end = new Date(selectedEndDate.setHours(0, 0, 0, 0));
//     const d = new Date(date.setHours(0, 0, 0, 0));
//     return d > start && d < end;
//   };

//   const isDateStartOrEnd = (date: Date): boolean => {
//     if (!selectedStartDate && !selectedEndDate) return false;
//     const d = new Date(date.setHours(0, 0, 0, 0));
//     const isStart =
//       selectedStartDate && d.getTime() === new Date(selectedStartDate.setHours(0, 0, 0, 0)).getTime();
//     const isEnd = selectedEndDate && d.getTime() === new Date(selectedEndDate.setHours(0, 0, 0, 0)).getTime();
//     return !!(isStart || isEnd);
//   };

//   // ==========================================
//   // DATA LOADING
//   // ==========================================
//   const fetchAvailabilityData = async () => {
//     if (!VechileId) return;
//     setLoading(true);

//     try {
//       const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
//       const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
//       const startDate = formatDateForAPI(startOfMonth);
//       const endDate = formatDateForAPI(endOfMonth);

//       console.log("📅 Fetching month:", { startDate, endDate });

//       const result = await fetch(
//         `${apiBaseUrl}/getVehicleAvailability?VechileId=${VechileId}&vechileType=${vehicleType}&startDate=${startDate}&endDate=${endDate}`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (!result.ok) {
//         throw new Error(`HTTP ${result.status}`);
//       }

//       const response = await result.json();
//       console.log("✅ Raw API Response:", response);

//       // ⭐ STEP 1: Extract REAL MongoDB IDs from backend response
//       let allSlots: any[] = [];
      
//       // Handle response format: {"availability": [{_id, fromDate, toDate, ...}]}
//       if (response?.availability && Array.isArray(response.availability)) {
//         console.log("📊 Processing availability array format...");
//         allSlots = response.availability.map((item: any) => ({
//           _id: item._id || item.id, // ⭐ CAPTURE REAL MONGODB ID
//           id: item._id || item.id,   // ⭐ USE AS PRIMARY ID
//           VechileId: item.VechileId || item.vehicleId || item.vechileId,
//           vehicleType: item.vechileType || item.vehicleType,
//           userId: item.userId,
//           fromDate: item.fromDate,
//           toDate: item.toDate,
//           fromTime: item.fromTime || "00:00",
//           toTime: item.toTime || "23:59",
//           isNotAvailable: item.isNotAvailable,
//           isBooked: item.isBooked,
//           reason: item.reason || "Owner unavailable",
//           status: item.status,
//           slotStatus: item.slotStatus,
//           type: item.type,
//           bookingId: item.bookingId,
//           booking_id: item.booking_id,
//         }));
//       } else if (response?.data?.availability && Array.isArray(response.data.availability)) {
//         console.log("📊 Processing data.availability format...");
//         allSlots = response.data.availability.map((item: any) => ({
//           _id: item._id || item.id,
//           id: item._id || item.id,
//           VechileId: item.VechileId || item.vehicleId || item.vechileId,
//           vehicleType: item.vechileType || item.vehicleType,
//           userId: item.userId,
//           fromDate: item.fromDate,
//           toDate: item.toDate,
//           fromTime: item.fromTime || "00:00",
//           toTime: item.toTime || "23:59",
//           isNotAvailable: item.isNotAvailable,
//           isBooked: item.isBooked,
//           reason: item.reason || "Owner unavailable",
//           status: item.status,
//           slotStatus: item.slotStatus,
//           type: item.type,
//           bookingId: item.bookingId,
//           booking_id: item.booking_id,
//         }));
//       } else if (response?.blockedSlots && Array.isArray(response.blockedSlots)) {
//         console.log("📊 Processing blockedSlots format...");
//         allSlots = response.blockedSlots.map((item: any) => ({
//           _id: item._id || item.id,
//           id: item._id || item.id,
//           VechileId: item.VechileId || item.vehicleId || item.vechileId,
//           vehicleType: item.vechileType || item.vehicleType,
//           userId: item.userId,
//           fromDate: item.fromDate,
//           toDate: item.toDate,
//           fromTime: item.fromTime || "00:00",
//           toTime: item.toTime || "23:59",
//           isNotAvailable: item.isNotAvailable,
//           isBooked: item.isBooked,
//           reason: item.reason || "Owner unavailable",
//         }));
//       } else if (response?.data && Array.isArray(response.data)) {
//         console.log("📊 Processing data array format...");
//         allSlots = response.data.map((item: any) => ({
//           _id: item._id || item.id,
//           id: item._id || item.id,
//           VechileId: item.VechileId || item.vehicleId || item.vechileId,
//           vehicleType: item.vechileType || item.vehicleType,
//           userId: item.userId,
//           fromDate: item.fromDate,
//           toDate: item.toDate,
//           fromTime: item.fromTime || "00:00",
//           toTime: item.toTime || "23:59",
//           isNotAvailable: item.isNotAvailable,
//           isBooked: item.isBooked,
//           reason: item.reason || "Owner unavailable",
//         }));
//       } else if (Array.isArray(response)) {
//         console.log("📊 Processing direct array format...");
//         allSlots = response.map((item: any) => ({
//           _id: item._id || item.id,
//           id: item._id || item.id,
//           VechileId: item.VechileId || item.vehicleId || item.vechileId,
//           vehicleType: item.vechileType || item.vehicleType,
//           userId: item.userId,
//           fromDate: item.fromDate,
//           toDate: item.toDate,
//           fromTime: item.fromTime || "00:00",
//           toTime: item.toTime || "23:59",
//           isNotAvailable: item.isNotAvailable,
//           isBooked: item.isBooked,
//           reason: item.reason || "Owner unavailable",
//         }));
//       }

//       console.log(`✅ Total slots loaded: ${allSlots.length}`);
//       console.log("🔍 Slots with IDs:", allSlots.map(s => ({ id: s.id, _id: s._id, from: s.fromDate, to: s.toDate })));

//       const unavailable: UnavailableSlot[] = [];
//       const booked: Date[] = [];

//       for (const slot of allSlots) {
//         // Filter by vehicle ID
//         const slotVehicleId = slot.VechileId || slot.vehicleId || slot.vechileId || slot.VehicleId;
//         if (slotVehicleId && String(slotVehicleId) !== String(VechileId)) {
//           console.log(`⏭️ Skipping slot for different vehicle: ${slotVehicleId}`);
//           continue;
//         }

//         // ⭐ VERIFY WE HAVE REAL MONGODB ID
//         const realMongoId = slot._id || slot.id;
//         if (!realMongoId || realMongoId.includes('-') || realMongoId.includes(':')) {
//           console.warn("⚠️ WARNING: Fake ID detected, slot may not be updatable:", realMongoId);
//         } else {
//           console.log("✅ Valid MongoDB ID:", realMongoId);
//         }

//         // Determine slot type
//         const isBookedSlot =
//           slot.isBooked === true ||
//           slot.isBooked === "true" ||
//           !!slot.bookingId ||
//           !!slot.booking_id ||
//           (slot.status && String(slot.status).toLowerCase() === "booked") ||
//           (slot.slotStatus && String(slot.slotStatus).toLowerCase() === "booked") ||
//           (slot.type && String(slot.type).toLowerCase() === "booked");

//         const isUnavailableSlot =
//           slot.isNotAvailable === true ||
//           slot.isNotAvailable === "true" ||
//           (slot.status && String(slot.status).toLowerCase() === "notavailable") ||
//           (slot.slotStatus && String(slot.slotStatus).toLowerCase() === "notavailable") ||
//           (slot.type && String(slot.type).toLowerCase() === "notavailable") ||
//           (slot.reason && String(slot.reason).toLowerCase().includes("not available"));

//         // Build date range
//         let dates: Date[] = [];
//         try {
//           const from = slot.fromDate;
//           const to = slot.toDate;

//           if (!from) {
//             console.warn("⚠️ Slot missing fromDate:", slot);
//             continue;
//           }

//           if (from === to || !to) {
//             dates = [new Date(from + "T00:00:00")];
//           } else {
//             dates = getDateRangeArray(from, to);
//           }
//         } catch (err) {
//           console.error("❌ Error building dates:", err);
//           continue;
//         }

//         if (isBookedSlot) {
//           booked.push(...dates);
//           console.log("✅ Added booked slot:", { id: slot.id, from: slot.fromDate, to: slot.toDate });
//         } else if (isUnavailableSlot) {
//           unavailable.push({
//             id: slot._id || slot.id, // ⭐ STORE REAL MONGODB ID
//             _id: slot._id || slot.id, // ⭐ BACKUP FIELD
//             VechileId: slot.VechileId || VechileId,
//             vehicleType: slot.vehicleType || vehicleType,
//             userId: slot.userId || userId,
//             dates,
//             fromDate: slot.fromDate,
//             toDate: slot.toDate,
//             fromTime: slot.fromTime || "00:00",
//             toTime: slot.toTime || "23:59",
//             reason: slot.reason || "Owner unavailable",
//             isNotAvailable: true,
//           });
//           console.log("✅ Added unavailable slot:", { id: slot._id || slot.id, from: slot.fromDate, to: slot.toDate });
//         }
//       }

//       console.log("✅ Final processed:", { unavailable: unavailable.length, booked: booked.length });
//       console.log("🔍 Unavailable slot IDs:", unavailable.map(u => u.id));

//       setUnavailableDates(unavailable);
//       setBookedDates(booked);

//       if (unavailable.length > 0 || booked.length > 0) {
//         showMessage("success", `✅ Loaded ${unavailable.length + booked.length} slot(s)`);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching availability:", error);
//       setUnavailableDates([]);
//       setBookedDates([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadSlotForEditing = async (slotId: string) => {
//     if (!slotId) return;
//     setLoading(true);

//     try {
//       console.log("🔍 Loading slot for editing, ID:", slotId);
//       const response = await availabilityAPI.getNotAvailabilityById(slotId);
//       console.log("📝 Loaded slot data:", response);

//       if (response) {
//         const fromDate = new Date(response.fromDate);
//         const toDate = new Date(response.toDate);

//         // ⭐ STEP 2: Store REAL MongoDB ID when editing
//         const realId = response._id || response.id || slotId;
//         console.log("✅ Using MongoDB ID for editing:", realId);

//         setSelectedStartDate(fromDate);
//         setSelectedEndDate(toDate);
//         setStartTime(response.fromTime || "06:00");
//         setEndTime(response.toTime || "18:00");
//         setSelectedSlotForEdit({
//           id: realId, // ⭐ REAL MONGODB ID
//           _id: realId, // ⭐ BACKUP
//           VechileId: response.VechileId || VechileId,
//           vehicleType: response.vechileType || vehicleType,
//           userId: response.userId || userId,
//           fromDate: response.fromDate,
//           toDate: response.toDate,
//           fromTime: response.fromTime,
//           toTime: response.toTime,
//         });
//         setEditMode(true);
//         setCurrentMonth(fromDate);
//         showMessage("info", "✏️ Edit mode active");
//       }
//     } catch (error) {
//       console.error("❌ Error loading slot:", error);
//       showMessage("error", "Failed to load slot for editing");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // EFFECTS
//   // ==========================================
//   useEffect(() => {
//     if (isOpen && editSlotId && userRole === "owner") {
//       loadSlotForEditing(editSlotId);
//     }
//   }, [editSlotId, isOpen]);

//   useEffect(() => {
//     if (isOpen && VechileId) {
//       fetchAvailabilityData();
//     }
//   }, [isOpen, VechileId, vehicleType, currentMonth]);

//   useEffect(() => {
//     if (!isOpen) {
//       // Reset on close
//       setEditMode(false);
//       setDeleteMode(false);
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       setSelectedSlotForEdit(null);
//       setShowMonthYearPicker(false);
//     }
//   }, [isOpen]);

//   // ==========================================
//   // EVENT HANDLERS
//   // ==========================================
//   const handleDateClick = (date: Date) => {
//     if (isPastDate(date)) return;

//     const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

//     // Customer mode: prevent selecting unavailable dates
//     if (userRole === "customer" && isDateUnavailable(normalizedDate)) {
//       const slot = getUnavailableSlotForDate(normalizedDate);
//       const reason = slot ? slot.reason : "Not available";
//       showMessage("error", `❌ Date unavailable: ${reason}`);
//       return;
//     }

//     // Owner edit mode: select start/end dates
//     if (userRole === "owner" && editMode) {
//       setFadeOpacity(0.6);

//       if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
//         setSelectedStartDate(normalizedDate);
//         setSelectedEndDate(null);
//       } else {
//         let from = selectedStartDate;
//         let to = normalizedDate;

//         if (normalizedDate < selectedStartDate) {
//           from = normalizedDate;
//           to = selectedStartDate;
//         }

//         setSelectedStartDate(from);
//         setSelectedEndDate(to);
//       }

//       setTimeout(() => setFadeOpacity(1), 120);
//       return;
//     }

//     // Owner delete mode: delete clicked slot
//     if (userRole === "owner" && deleteMode) {
//       const slot = getUnavailableSlotForDate(normalizedDate);
//       if (slot) {
//         handleDeleteSlot(slot);
//       } else {
//         showMessage("error", "❌ No slot found for this date");
//       }
//       return;
//     }

//     // Owner normal mode: clicking unavailable date opens it for editing
//     if (userRole === "owner" && !editMode && !deleteMode) {
//       const slot = getUnavailableSlotForDate(normalizedDate);
//       if (slot) {
//         console.log("✏️ Opening slot for editing:", slot);
//         console.log("🔍 Slot ID:", slot.id || slot._id);
        
//         setSelectedStartDate(new Date(slot.fromDate));
//         setSelectedEndDate(new Date(slot.toDate));
//         setStartTime(slot.fromTime);
//         setEndTime(slot.toTime);
//         setSelectedSlotForEdit({
//           id: slot._id || slot.id, // ⭐ USE REAL MONGODB ID
//           _id: slot._id || slot.id,
//           VechileId: slot.VechileId,
//           vehicleType: slot.vehicleType,
//           userId: slot.userId,
//           fromDate: slot.fromDate,
//           toDate: slot.toDate,
//           fromTime: slot.fromTime,
//           toTime: slot.toTime,
//         });
//         setEditMode(true);
//         showMessage("info", "✏️ Edit mode - select new dates or click Confirm to save");
//         return;
//       }
//     }

//     // Default selection (customer or owner normal mode)
//     setFadeOpacity(0.6);

//     if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
//       setSelectedStartDate(normalizedDate);
//       setSelectedEndDate(null);
//     } else {
//       let from = selectedStartDate;
//       let to = normalizedDate;

//       if (normalizedDate < selectedStartDate) {
//         from = normalizedDate;
//         to = selectedStartDate;
//       }

//       // Customer: check range for unavailable dates
//       if (userRole === "customer") {
//         const hasUnavailable = checkRangeHasUnavailableDates(from, to);
//         if (hasUnavailable) {
//           showMessage("error", "❌ Range contains unavailable dates");
//           setSelectedStartDate(null);
//           setSelectedEndDate(null);
//           setTimeout(() => setFadeOpacity(1), 120);
//           return;
//         }
//       }

//       setSelectedStartDate(from);
//       setSelectedEndDate(to);
//     }

//     setTimeout(() => setFadeOpacity(1), 120);
//   };

//   const handleEditIconPress = () => {
//     if (editMode && selectedStartDate && selectedEndDate) {
//       handleSaveEdit();
//     } else {
//       setEditMode(true);
//       setDeleteMode(false);
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       setSelectedSlotForEdit(null);
//       showMessage("info", "✏️ Edit mode - select dates to mark as unavailable");
//     }
//   };

//   const handleConfirmButton = async () => {
//     if (!selectedStartDate || !selectedEndDate) {
//       showMessage("error", "⚠️ Please select both start and end dates");
//       return;
//     }

//     if (userRole === "customer") {
//       // Customer: Just pass the data to parent for next step
//       if (onConfirm) {
//         onConfirm({
//           fromDate: selectedStartDate,
//           toDate: selectedEndDate,
//           fromTime: startTime,
//           toTime: endTime,
//         });
//         showMessage("success", "✅ Dates confirmed! Proceeding to next step...");
//       }
//     } else {
//       // Owner: Save to backend
//       await handleSaveEdit();
//     }
//   };

//   const handleSaveEdit = async () => {
//     if (!selectedStartDate || !selectedEndDate) {
//       showMessage("error", "⚠️ Please select both start and end dates");
//       return;
//     }

//     setFadeOpacity(0.6);
//     setLoading(true);

//     try {
//       const fromDateStr = formatDateForAPI(selectedStartDate);
//       const toDateStr = formatDateForAPI(selectedEndDate);

//       console.log("💾 Saving:", { fromDateStr, toDateStr });

//       let response;

//       if (selectedSlotForEdit && selectedSlotForEdit.id) {
//         // ⭐ STEP 3: UPDATE with REAL MongoDB ID
//         const realId = selectedSlotForEdit._id || selectedSlotForEdit.id;
//         console.log("📤 Updating slot with MongoDB ID:", realId);
        
//         // Validate ID is not fake
//         if (realId.includes('-') || realId.includes(':')) {
//           throw new Error("❌ Invalid MongoDB ID format. Cannot update with fake ID.");
//         }

//         response = await availabilityAPI.updateNotAvailability(realId, {
//           userId: selectedSlotForEdit.userId || userId,
//           VechileId: selectedSlotForEdit.VechileId || VechileId,
//           vechileType: selectedSlotForEdit.vehicleType || vehicleType,
//           fromDate: fromDateStr,
//           toDate: toDateStr,
//           fromTime: formatTimeForAPI(startTime),
//           toTime: formatTimeForAPI(endTime),
//           isNotAvailable: true,
//         });

//         console.log("✅ Update response:", response);

//         if (response && response.success) {
//           onAvailabilityUpdated && onAvailabilityUpdated(response.data || response);
//           showMessage("success", "✅ Dates updated successfully");
//         } else {
//           throw new Error(response?.message || "Update failed");
//         }
//       } else {
//         // CREATE new slot
//         console.log("📤 Creating new slot");
        
//         response = await availabilityAPI.createNotAvailability({
//           userId: userId,
//           VechileId: VechileId,
//           vechileType: vehicleType,
//           fromDate: fromDateStr,
//           toDate: toDateStr,
//           fromTime: formatTimeForAPI(startTime),
//           toTime: formatTimeForAPI(endTime),
//           isNotAvailable: true,
//         });

//         console.log("✅ Create response:", response);

//         if (response && response.success) {
//           onAvailabilityCreated && onAvailabilityCreated(response.data || response);
//           showMessage("success", "✅ Dates blocked successfully");
//         } else {
//           throw new Error(response?.message || "Create failed");
//         }
//       }

//       if (response && response.success) {
//         console.log("✅ Save successful");

//         // Clear selections and exit edit mode FIRST
//         setEditMode(false);
//         setSelectedStartDate(null);
//         setSelectedEndDate(null);
//         setSelectedSlotForEdit(null);

//         // Then refresh calendar to get updated data with real IDs
//         await fetchAvailabilityData();
//       } else {
//         showMessage("error", "❌ Failed to save changes");
//       }
//     } catch (err: any) {
//       console.error("❌ Save error:", err);
//       showMessage("error", `❌ ${err.message || "Failed to save changes"}`);
//     } finally {
//       setLoading(false);
//       setFadeOpacity(1);
//     }
//   };

//   const handleDeleteIconPress = () => {
//     if (deleteMode) {
//       setDeleteMode(false);
//       showMessage("info", "Delete mode disabled");
//     } else {
//       setDeleteMode(true);
//       setEditMode(false);
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       setSelectedSlotForEdit(null);
//       showMessage("warning", "🗑️ Delete mode - tap any unavailable date to delete");
//     }
//   };

//   const handleDeleteSlot = async (slot: UnavailableSlot) => {
//     if (!slot || !slot.id) {
//       showMessage("error", "❌ No slot found to delete");
//       return;
//     }

//     // ⭐ STEP 4: Validate real MongoDB ID before delete
//     const realId = slot._id || slot.id;
//     console.log("🗑️ Attempting to delete slot with ID:", realId);

//     if (realId.includes('-') || realId.includes(':')) {
//       showMessage("error", "❌ Cannot delete: Invalid MongoDB ID format");
//       console.error("❌ Fake ID detected:", realId);
//       return;
//     }

//     if (
//       !window.confirm(
//         `🗑️ Delete unavailable period from ${slot.fromDate} to ${slot.toDate}?\n\nThis cannot be undone.`
//       )
//     ) {
//       return;
//     }

//     setFadeOpacity(0.6);
//     setLoading(true);

//     try {
//       console.log("📤 Deleting with MongoDB ID:", realId);
//       const response = await availabilityAPI.deleteNotAvailability(realId);

//       if (response && response.success) {
//         console.log("✅ Delete successful");
//         await fetchAvailabilityData();
//         onAvailabilityDeleted && onAvailabilityDeleted(realId);
//         setDeleteMode(false);
//         showMessage("success", "✅ Slot deleted successfully");
//       } else {
//      throw new Error(response?.data?.message || "Delete failed");

//       }
//     } catch (err: any) {
//       console.error("❌ Delete error:", err);
//       showMessage("error", `❌ ${err.message || "Failed to delete slot"}`);
//     } finally {
//       setLoading(false);
//       setFadeOpacity(1);
//     }
//   };

//   const handleMonthYearSelect = (monthIndex: number, year: number) => {
//     setCurrentMonth(new Date(year, monthIndex, 1));
//     setShowMonthYearPicker(false);
//   };

//   // ==========================================
//   // CALENDAR RENDERING
//   // ==========================================
//   const generateCalendarDays = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const startDate = new Date(firstDay);
//     const dayOfWeek = firstDay.getDay();
//     const adjustment = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
//     startDate.setDate(firstDay.getDate() - adjustment);

//     const days: JSX.Element[] = [];
//     for (let i = 0; i < 42; i++) {
//       const date = new Date(startDate);
//       date.setDate(startDate.getDate() + i);
//       days.push(renderDay(date, i));
//     }

//     return days;
//   };

//   const renderDay = (date: Date, index: number) => {
//     const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
//     const isSelected = isDateSelected(date);
//     const isStartOrEnd = isDateStartOrEnd(date);
//     const isInRange = isDateInRange(date);
//     const isUnavail = isDateUnavailable(date);
//     const isPast = isPastDate(date);
//     const showAsEditing = editMode && (isStartOrEnd || isInRange);
//     const showAsDeleteTarget = deleteMode && isUnavail && !isPast && isCurrentMonth;

//     let bgClass = "bg-white hover:bg-gray-100";
//     let textClass = "text-gray-700";
//     let borderClass = "border border-transparent";
//     let showStrikeLine = false;

//     if (isPast) {
//       bgClass = "bg-gray-50";
//       textClass = "text-gray-300";
//     } else if (showAsEditing && isStartOrEnd) {
//       bgClass = "bg-orange-500";
//       textClass = "text-white font-bold";
//     } else if (showAsEditing && isInRange) {
//       bgClass = "bg-orange-100";
//       textClass = "text-orange-900 font-semibold";
//     } else if (showAsDeleteTarget) {
//       bgClass = "bg-red-50";
//       borderClass = "border-2 border-red-300";
//       textClass = "text-red-800 font-bold";
//     } else if (!showAsEditing && isStartOrEnd) {
//       bgClass = "bg-black";
//       textClass = "text-white font-bold";
//     } else if (!showAsEditing && isInRange) {
//       bgClass = "bg-gray-200";
//       textClass = "text-gray-800 font-medium";
//     } else if (isUnavail) {
//       bgClass = "bg-red-50";
//       borderClass = "border-2 border-red-200";
//       textClass = "text-red-700 font-medium";
//       showStrikeLine = true;
//     }

//     if (!isCurrentMonth) {
//       textClass = "text-gray-300";
//     }

//     return (
//       <button
//         key={index}
//         onClick={() => isCurrentMonth && !isPast && handleDateClick(date)}
//         disabled={isPast || (userRole === "customer" && isUnavail)}
//         className={`relative h-10 w-full rounded-md transition-all ${bgClass} ${textClass} ${borderClass} ${
//           isPast || (userRole === "customer" && isUnavail) ? "cursor-not-allowed opacity-50" : "cursor-pointer"
//         }`}
//       >
//         <span className="relative z-10">{date.getDate()}</span>

//         {/* Strike-through line for unavailable dates */}
//         {showStrikeLine && isCurrentMonth && (
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
//             <div className="w-4/5 h-0.5 bg-red-600 transform rotate-45" />
//             <div className="w-4/5 h-0.5 bg-red-600 transform -rotate-45 absolute" />
//           </div>
//         )}

//         {/* Delete indicator */}
//         {showAsDeleteTarget && (
//           <div className="absolute -top-1 -right-1 z-30">
//             <Trash2 size={12} className="text-red-600" />
//           </div>
//         )}
//       </button>
//     );
//   };

//   const generateTimeOptions = () => {
//     const options: { value: string; label: string }[] = [];
//     for (let h = 0; h < 24; h++) {
//       for (let m = 0; m < 60; m += 30) {
//         const hour = h.toString().padStart(2, "0");
//         const minute = m.toString().padStart(2, "0");
//         const time = `${hour}:${minute}`;
//         const period = h >= 12 ? "PM" : "AM";
//         const displayHour = h % 12 || 12;
//         options.push({
//           value: time,
//           label: `${displayHour}:${minute} ${period}`,
//         });
//       }
//     }
//     return options;
//   };

//   const timeOptions = generateTimeOptions();

//   // ==========================================
//   // MAIN RENDER
//   // ==========================================
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div
//         className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto"
//         style={{ opacity: fadeOpacity, transition: "opacity 0.2s" }}
//       >
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
//           <div className="flex items-center gap-4">
//             <h2 className="text-2xl font-bold text-gray-900">
//               {userRole === "owner" ? "Manage Vehicle Availability" : "Select Booking Dates"}
//             </h2>
//             <div className="flex items-center gap-2">
//               {userRole === "owner" && (
//                 <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full">
//                   Owner Mode
//                 </span>
//               )}
//               {userRole === "customer" && (
//                 <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
//                   Customer View
//                 </span>
//               )}
//               {editMode && (
//                 <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
//                   Editing
//                 </span>
//               )}
//               {deleteMode && (
//                 <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
//                   Delete Mode
//                 </span>
//               )}
//             </div>
//           </div>

//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-gray-100 transition"
//             disabled={loading}
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Edit Mode Banner */}
//         {editMode && userRole === "owner" && (
//           <div className="mx-6 mt-4 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-lg flex items-center gap-3">
//             <Edit2 size={20} className="text-orange-600 flex-shrink-0" />
//             <p className="text-sm text-orange-800 font-medium">
//               Select dates to mark as not available. Tap the ✓ icon to save changes.
//             </p>
//           </div>
//         )}

//         {/* Delete Mode Banner */}
//         {deleteMode && userRole === "owner" && (
//           <div className="mx-6 mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center gap-3">
//             <Trash2 size={20} className="text-red-600 flex-shrink-0" />
//             <p className="text-sm text-red-800 font-medium">
//               Tap any not-available date to delete it.
//             </p>
//           </div>
//         )}

//         {/* Customer Info Banner */}
//         {userRole === "customer" && (unavailableDates.length > 0 || bookedDates.length > 0) && (
//           <div className="mx-6 mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg flex items-center gap-3">
//             <Info size={20} className="text-blue-600 flex-shrink-0" />
//             <p className="text-sm text-blue-800 font-medium">
//               Red crossed dates are not available for booking.
//             </p>
//           </div>
//         )}

//         {/* Message Display */}
//         {message.text && (
//           <div className="mx-6 mt-4">
//             <div
//               className={`p-4 rounded-lg font-medium flex items-center gap-3 ${
//                 message.type === "success"
//                   ? "bg-green-50 text-green-800 border-2 border-green-300"
//                   : message.type === "error"
//                   ? "bg-red-50 text-red-800 border-2 border-red-300"
//                   : message.type === "warning"
//                   ? "bg-yellow-50 text-yellow-800 border-2 border-yellow-300"
//                   : "bg-blue-50 text-blue-800 border-2 border-blue-300"
//               }`}
//             >
//               {message.type === "success" && <Check size={20} />}
//               {message.type === "error" && <AlertCircle size={20} />}
//               {message.type === "warning" && <AlertCircle size={20} />}
//               {message.type === "info" && <Calendar size={20} />}
//               <span>{message.text}</span>
//             </div>
//           </div>
//         )}

//         {/* Loading Overlay */}
//         {loading && (
//           <div className="mx-6 mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-center gap-3">
//             <div className="animate-spin w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full" />
//             <span className="text-gray-700 font-medium">Processing...</span>
//           </div>
//         )}

//         <div className="p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Calendar Section */}
//             <div className="lg:col-span-2 space-y-4">
//               {/* Date Display */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Calendar size={16} className="text-gray-500" />
//                     <label className="text-sm font-medium text-gray-700">From Date</label>
//                   </div>
//                   <div className="text-lg font-bold text-gray-900">
//                     {selectedStartDate ? formatDateForDisplay(selectedStartDate) : "Select"}
//                   </div>
//                 </div>

//                 <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Calendar size={16} className="text-gray-500" />
//                     <label className="text-sm font-medium text-gray-700">To Date</label>
//                   </div>
//                   <div className="text-lg font-bold text-gray-900">
//                     {selectedEndDate ? formatDateForDisplay(selectedEndDate) : "Select"}
//                   </div>
//                 </div>
//               </div>

//               {/* Calendar */}
//               <div className="border-2 border-gray-200 rounded-xl p-5 bg-white shadow-sm">
//                 {/* Month Header */}
//                 <div className="flex items-center justify-between mb-4">
//                   <button
//                     onClick={() =>
//                       setCurrentMonth(
//                         new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
//                       )
//                     }
//                     className="p-2 hover:bg-gray-100 rounded-lg transition"
//                     disabled={loading}
//                   >
//                     <ChevronLeft size={24} />
//                   </button>

//                   <div className="flex flex-col items-center">
//                     <button
//                       onClick={() => setShowMonthYearPicker(!showMonthYearPicker)}
//                       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition"
//                     >
//                       <span className="font-bold text-xl">
//                         {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
//                       </span>
//                       {showMonthYearPicker ? (
//                         <ChevronUp size={16} />
//                       ) : (
//                         <ChevronDown size={16} />
//                       )}
//                     </button>

//                     {/* Month/Year Picker */}
//                     {showMonthYearPicker && (
//                       <div className="mt-2 p-4 bg-gray-50 rounded-lg shadow-lg w-64">
//                         <div className="mb-3">
//                           <div className="grid grid-cols-4 gap-2">
//                             {monthNames.map((m, i) => (
//                               <button
//                                 key={m}
//                                 onClick={() => handleMonthYearSelect(i, currentMonth.getFullYear())}
//                                 className={`px-2 py-1 rounded text-xs font-medium transition ${
//                                   currentMonth.getMonth() === i
//                                     ? "bg-blue-500 text-white"
//                                     : "bg-white hover:bg-gray-200"
//                                 }`}
//                               >
//                                 {m}
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-3 gap-2">
//                           {years.map((y) => (
//                             <button
//                               key={y}
//                               onClick={() => handleMonthYearSelect(currentMonth.getMonth(), y)}
//                               className={`px-2 py-1 rounded text-xs font-medium transition ${
//                                 currentMonth.getFullYear() === y
//                                   ? "bg-blue-500 text-white"
//                                   : "bg-white hover:bg-gray-200"
//                               }`}
//                             >
//                               {y}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Owner Control Icons */}
//                   {userRole === "owner" && (
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={handleEditIconPress}
//                         className={`p-2 rounded-lg transition ${
//                           editMode
//                             ? "bg-green-100 hover:bg-green-200"
//                             : "bg-gray-100 hover:bg-gray-200"
//                         }`}
//                         title={editMode ? "Save changes" : "Edit availability"}
//                         disabled={loading}
//                       >
//                         {editMode ? (
//                           <Check size={24} className="text-green-600" />
//                         ) : (
//                           <Edit2 size={24} className="text-blue-600" />
//                         )}
//                       </button>
//                       <button
//                         onClick={handleDeleteIconPress}
//                         className={`p-2 rounded-lg transition ${
//                           deleteMode
//                             ? "bg-red-100 hover:bg-red-200"
//                             : "bg-gray-100 hover:bg-gray-200"
//                         }`}
//                         title={deleteMode ? "Exit delete mode" : "Delete availability"}
//                         disabled={loading}
//                       >
//                         <Trash2 size={24} className={deleteMode ? "text-red-600" : "text-gray-600"} />
//                       </button>
//                     </div>
//                   )}

//                   <button
//                     onClick={() =>
//                       setCurrentMonth(
//                         new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
//                       )
//                     }
//                     className="p-2 hover:bg-gray-100 rounded-lg transition"
//                     disabled={loading}
//                   >
//                     <ChevronRight size={24} />
//                   </button>
//                 </div>

//                 {/* Week Days */}
//                 <div className="grid grid-cols-7 gap-2 mb-2">
//                   {weekDays.map((day) => (
//                     <div key={day} className="text-center text-sm font-bold text-gray-600">
//                       {day}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Calendar Grid */}
//                 <div className="grid grid-cols-7 gap-2">{generateCalendarDays()}</div>

//                 {/* Legend */}
//                 <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t">
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded" />
//                     <span className="text-xs text-gray-600">Available</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-red-50 border-2 border-red-200 rounded" />
//                     <span className="text-xs text-gray-600">
//                       {userRole === "owner" ? "Unavailable/Booked" : "Not Available"}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-black rounded" />
//                     <span className="text-xs text-gray-600">
//                       {editMode ? "Editing" : "Selected"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Time & Actions Section */}
//             <div className="space-y-4">
//               {/* Start Time */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">Start Time</label>
//                 <select
//                   value={startTime}
//                   onChange={(e) => setStartTime(e.target.value)}
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none"
//                   disabled={loading}
//                 >
//                   {timeOptions.map((time) => (
//                     <option key={time.value} value={time.value}>
//                       {time.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* End Time */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">End Time</label>
//                 <select
//                   value={endTime}
//                   onChange={(e) => setEndTime(e.target.value)}
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none"
//                   disabled={loading}
//                 >
//                   {timeOptions.map((time) => (
//                     <option key={time.value} value={time.value}>
//                       {time.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Summary */}
//               {selectedStartDate && selectedEndDate && (
//                 <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
//                   <p className="text-sm font-bold text-green-900 mb-2">
//                     {editMode ? "Editing Dates" : "Selected Dates"}
//                   </p>
//                   <p className="text-xs text-green-800">
//                     From: {formatDateForAPI(selectedStartDate)}
//                   </p>
//                   <p className="text-xs text-green-800">To: {formatDateForAPI(selectedEndDate)}</p>
//                   {editMode && (
//                     <p className="text-xs text-green-700 mt-2 italic">Tap ✓ icon to save changes</p>
//                   )}
//                 </div>
//               )}

//               {/* Data Info */}
//               {(unavailableDates.length > 0 || bookedDates.length > 0) && !loading && (
//                 <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
//                   <div className="flex items-center gap-2 mb-1">
//                     <Check size={16} className="text-blue-600" />
//                     <p className="text-sm font-bold text-blue-900">Calendar Data Loaded</p>
//                   </div>
//                   <p className="text-xs text-blue-800">
//                     {unavailableDates.length + bookedDates.length} slot(s) from database
//                   </p>
//                 </div>
//               )}

//               {/* Confirm Button */}
//               <button
//                 onClick={handleConfirmButton}
//                 disabled={!selectedStartDate || !selectedEndDate || loading}
//                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-lg font-bold text-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin w-5 h-5 border-3 border-white border-t-transparent rounded-full" />
//                     {userRole === "owner" ? "Saving..." : "Processing..."}
//                   </>
//                 ) : (
//                   <>
//                     <Check size={20} />
//                     {userRole === "owner" 
//                       ? (editMode ? "Confirm & Save Changes" : "Confirm & Save Dates")
//                       : "Confirm & Continue"}
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleAvailabilityCalendar;





// import React, { useState, useEffect } from "react";
// import {
//   X,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
//   Edit2,
//   Trash2,
//   Check,
//   AlertCircle,
//   ChevronDown,
//   ChevronUp,
//   Info,
// } from "lucide-react";

// interface VehicleAvailabilityCalendarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   VechileId: string;
//   vehicleType: "Car" | "Bike" | "Auto";
//   userId: string;
//   userRole?: "owner" | "customer";
//   apiBaseUrl?: string;
//   editSlotId?: string | null;
//   onAvailabilityCreated?: (data: any) => void;
//   onAvailabilityUpdated?: (data: any) => void;
//   onAvailabilityDeleted?: (id: string) => void;
//   onConfirm?: (data: { fromDate: Date; toDate: Date; fromTime: string; toTime: string }) => void;
// }

// interface UnavailableSlot {
//   id: string; // REAL MongoDB _id from backend
//   VechileId: string;
//   vehicleType: string;
//   userId: string;
//   dates: Date[];
//   fromDate: string;
//   toDate: string;
//   fromTime: string;
//   toTime: string;
//   reason: string;
//   isNotAvailable: boolean;
//   _id?: string; // Backup field for MongoDB ID
// }

// const VehicleAvailabilityCalendar: React.FC<VehicleAvailabilityCalendarProps> = ({
//   isOpen,
//   onClose,
//   VechileId,
//   vehicleType,
//   userId,
//   userRole = "owner",
//   apiBaseUrl = "http://3.110.122.127:3000",
//   editSlotId = null,
//   onAvailabilityCreated,
//   onAvailabilityUpdated,
//   onAvailabilityDeleted,
//   onConfirm,
// }) => {
  
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
//   const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
//   const [startTime, setStartTime] = useState("06:00");
//   const [endTime, setEndTime] = useState("18:00");
  
//   // Availability data
//   const [unavailableDates, setUnavailableDates] = useState<UnavailableSlot[]>([]);
//   const [bookedDates, setBookedDates] = useState<Date[]>([]);
  
//   // UI modes
//   const [editMode, setEditMode] = useState(false);
//   const [deleteMode, setDeleteMode] = useState(false);
//   const [selectedSlotForEdit, setSelectedSlotForEdit] = useState<any>(null);
  
//   // Loading & messages
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [fadeOpacity, setFadeOpacity] = useState(1);
  
//   // Month/Year picker
//   const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);

//   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//   const years = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - 5 + i);

//   // ==========================================
//   // API LAYER
//   // ==========================================
//   const availabilityAPI = {
//     getVehicleAvailability: async (
//       vehicleId: string,
//       vehicleType: string,
//       startDate: string,
//       endDate: string
//     ) => {
//       console.log("🌐 Fetching availability:", { vehicleId, vehicleType, startDate, endDate });

//       try {
//         const url = `${apiBaseUrl}/getVehicleAvailability?VechileId=${vehicleId}&vechileType=${vehicleType}&startDate=${startDate}&endDate=${endDate}`;
//         const response = await fetch(url, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Availability response:", result);

//         // Handle multiple response formats
//         let allSlots: any[] = [];
        
//         if (result?.availability && Array.isArray(result.availability)) {
//           for (const dateEntry of result.availability) {
//             if (dateEntry.slots && Array.isArray(dateEntry.slots)) {
//               const slotsWithDate = dateEntry.slots.map((slot: any) => ({
//                 ...slot,
//                 date: dateEntry.date,
//                 dateStatus: dateEntry.status,
//               }));
//               allSlots.push(...slotsWithDate);
//             }
//           }
//         } else if (result?.data?.availability && Array.isArray(result.data.availability)) {
//           for (const dateEntry of result.data.availability) {
//             if (dateEntry.slots && Array.isArray(dateEntry.slots)) {
//               const slotsWithDate = dateEntry.slots.map((slot: any) => ({
//                 ...slot,
//                 date: dateEntry.date,
//                 dateStatus: dateEntry.status,
//               }));
//               allSlots.push(...slotsWithDate);
//             }
//           }
//         } else if (result?.blockedSlots) {
//           allSlots = result.blockedSlots;
//         } else if (result?.data && Array.isArray(result.data)) {
//           allSlots = result.data;
//         } else if (Array.isArray(result)) {
//           allSlots = result;
//         }

//         console.log(`✅ Total slots loaded: ${allSlots.length}`);
//         return allSlots;
//       } catch (error) {
//         console.error("❌ API ERROR: getVehicleAvailability", error);
//         return [];
//       }
//     },

//     getNotAvailabilityById: async (id: string) => {
//       console.log("🌐 Fetching slot by ID:", id);

//       try {
//         const response = await fetch(`${apiBaseUrl}/getNotAvailabilityById/${id}`, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Slot data:", result);

//         if (result.success && result.data) return result.data;
//         if (result.data) return result.data;
//         if (result._id) return result;
        
//         return null;
//       } catch (error) {
//         console.error("❌ API ERROR: getNotAvailabilityById", error);
//         throw error;
//       }
//     },

//     createNotAvailability: async (payload: any) => {
//       console.log("🌐 Creating not-availability:", payload);

//       try {
//         const formData = new URLSearchParams();
//         formData.append("userId", payload.userId);
//         formData.append("vechileType", payload.vechileType);
//         formData.append("VechileId", payload.VechileId);
//         formData.append("fromDate", payload.fromDate);
//         formData.append("toDate", payload.toDate);
//         formData.append("fromTime", payload.fromTime);
//         formData.append("toTime", payload.toTime);
//         formData.append("isNotAvailable", String(payload.isNotAvailable));

//         const response = await fetch(`${apiBaseUrl}/createNotAvailability`, {
//           method: "POST",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: formData.toString(),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Created:", result);

//         return { success: true, data: result.data || result };
//       } catch (error) {
//         console.error("❌ API ERROR: createNotAvailability", error);
//         throw error;
//       }
//     },

//     updateNotAvailability: async (id: string, payload: any) => {
//       console.log("🌐 Updating not-availability:", { id, payload });

//       try {
//         const formData = new URLSearchParams();
//         if (payload.userId) formData.append("userId", payload.userId);
//         formData.append("vechileType", payload.vechileType);
//         formData.append("VechileId", payload.VechileId);
//         formData.append("fromDate", payload.fromDate);
//         formData.append("toDate", payload.toDate);
//         formData.append("fromTime", payload.fromTime);
//         formData.append("toTime", payload.toTime);
//         formData.append("isNotAvailable", String(payload.isNotAvailable));

//         const response = await fetch(`${apiBaseUrl}/updateNotAvailability/${id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: formData.toString(),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Updated:", result);

//         return { success: true, data: result.data || result };
//       } catch (error) {
//         console.error("❌ API ERROR: updateNotAvailability", error);
//         throw error;
//       }
//     },

//     deleteNotAvailability: async (id: string) => {
//       console.log("🌐 Deleting not-availability:", id);

//       try {
//         const response = await fetch(`${apiBaseUrl}/deleteNotAvailability/${id}`, {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("✅ Deleted:", result);

//         return { success: true, data: result };
//       } catch (error) {
//         console.error("❌ API ERROR: deleteNotAvailability", error);
//         throw error;
//       }
//     },
//   };

//   // ==========================================
//   // UTILITY FUNCTIONS
//   // ==========================================
//   const formatDateForAPI = (date: Date | null): string => {
//     if (!date) return "";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const formatDateForDisplay = (date: Date | null): string => {
//     if (!date) return "Select Date";
//     return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
//   };

//   const formatTimeForAPI = (time: string): string => {
//     const [hours, minutes] = time.split(":");
//     return `${hours}.${minutes}`;
//   };

//   const showMessage = (type: string, text: string) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 4000);
//   };

//   const isPastDate = (date: Date): boolean => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const checkDate = new Date(date);
//     checkDate.setHours(0, 0, 0, 0);
//     return checkDate < today;
//   };

//   const getDateRangeArray = (startDateStr: string, endDateStr: string): Date[] => {
//     const dates: Date[] = [];
//     const start = new Date(startDateStr + "T00:00:00");
//     const end = new Date(endDateStr + "T00:00:00");
//     const current = new Date(start);

//     while (current <= end) {
//       dates.push(new Date(current));
//       current.setDate(current.getDate() + 1);
//     }

//     return dates;
//   };

//   const isDateUnavailable = (date: Date): boolean => {
//     const dateStr = formatDateForAPI(date);

//     // Check booked dates
//     const booked = bookedDates.some((bd) => formatDateForAPI(bd) === dateStr);
//     if (booked) return true;

//     // Check unavailable slots
//     return unavailableDates.some((slot) =>
//       slot.dates.some((d) => formatDateForAPI(d) === dateStr)
//     );
//   };

//   const getUnavailableSlotForDate = (date: Date): UnavailableSlot | null => {
//     const normalized = new Date(date).setHours(0, 0, 0, 0);
//     return (
//       unavailableDates.find((slot) => {
//         const from = new Date(slot.fromDate).setHours(0, 0, 0, 0);
//         const to = new Date(slot.toDate).setHours(0, 0, 0, 0);
//         return normalized >= from && normalized <= to;
//       }) || null
//     );
//   };

//   const checkRangeHasUnavailableDates = (startDate: Date, endDate: Date): boolean => {
//     const dates = getDateRangeArray(formatDateForAPI(startDate), formatDateForAPI(endDate));
//     return dates.some((date) => isDateUnavailable(date));
//   };

//   const isDateSelected = (date: Date): boolean => {
//     return (
//       (selectedStartDate &&
//         date.getDate() === selectedStartDate.getDate() &&
//         date.getMonth() === selectedStartDate.getMonth() &&
//         date.getFullYear() === selectedStartDate.getFullYear()) ||
//       false
//     );
//   };

//   const isDateInRange = (date: Date): boolean => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     const start = new Date(selectedStartDate.setHours(0, 0, 0, 0));
//     const end = new Date(selectedEndDate.setHours(0, 0, 0, 0));
//     const d = new Date(date.setHours(0, 0, 0, 0));
//     return d > start && d < end;
//   };

//   const isDateStartOrEnd = (date: Date): boolean => {
//     if (!selectedStartDate && !selectedEndDate) return false;
//     const d = new Date(date.setHours(0, 0, 0, 0));
//     const isStart =
//       selectedStartDate && d.getTime() === new Date(selectedStartDate.setHours(0, 0, 0, 0)).getTime();
//     const isEnd = selectedEndDate && d.getTime() === new Date(selectedEndDate.setHours(0, 0, 0, 0)).getTime();
//     return !!(isStart || isEnd);
//   };

//   // ==========================================
//   // DATA LOADING
//   // ==========================================
//   const fetchAvailabilityData = async () => {
//     if (!VechileId) return;
//     setLoading(true);

//     try {
//       const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
//       const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
//       const startDate = formatDateForAPI(startOfMonth);
//       const endDate = formatDateForAPI(endOfMonth);

//       console.log("📅 Fetching month:", { startDate, endDate });

//       const result = await fetch(
//         `${apiBaseUrl}/getVehicleAvailability?VechileId=${VechileId}&vechileType=${vehicleType}&startDate=${startDate}&endDate=${endDate}`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (!result.ok) {
//         throw new Error(`HTTP ${result.status}`);
//       }

//       const response = await result.json();
//       console.log("✅ Raw API Response:", response);

//       // ⭐ STEP 1: Extract REAL MongoDB IDs from backend response
//       let allSlots: any[] = [];
      
//       // Handle response format: {"availability": [{_id, fromDate, toDate, ...}]}
//       if (response?.availability && Array.isArray(response.availability)) {
//         console.log("📊 Processing availability array format...");
//         allSlots = response.availability.map((item: any) => ({
//           _id: item._id || item.id, // ⭐ CAPTURE REAL MONGODB ID
//           id: item._id || item.id,   // ⭐ USE AS PRIMARY ID
//           VechileId: item.VechileId || item.vehicleId || item.vechileId,
//           vehicleType: item.vechileType || item.vehicleType,
//           userId: item.userId,
//           fromDate: item.fromDate,
//           toDate: item.toDate,
//           fromTime: item.fromTime || "00:00",
//           toTime: item.toTime || "23:59",
//           isNotAvailable: item.isNotAvailable,
//           isBooked: item.isBooked,
//           reason: item.reason || "Owner unavailable",
//           status: item.status,
//           slotStatus: item.slotStatus,
//           type: item.type,
//           bookingId: item.bookingId,
//           booking_id: item.booking_id,
//         }));
//       } else if (response?.data?.availability && Array.isArray(response.data.availability)) {
//         console.log("📊 Processing data.availability format...");
//         allSlots = response.data.availability.map((item: any) => ({
//           _id: item._id || item.id,
//           id: item._id || item.id,
//           VechileId: item.VechileId || item.vehicleId || item.vechileId,
//           vehicleType: item.vechileType || item.vehicleType,
//           userId: item.userId,
//           fromDate: item.fromDate,
//           toDate: item.toDate,
//           fromTime: item.fromTime || "00:00",
//           toTime: item.toTime || "23:59",
//           isNotAvailable: item.isNotAvailable,
//           isBooked: item.isBooked,
//           reason: item.reason || "Owner unavailable",
//           status: item.status,
//           slotStatus: item.slotStatus,
//           type: item.type,
//           bookingId: item.bookingId,
//           booking_id: item.booking_id,
//         }));
//       } else if (response?.blockedSlots && Array.isArray(response.blockedSlots)) {
//         console.log("📊 Processing blockedSlots format...");
//         allSlots = response.blockedSlots.map((item: any) => ({
//           _id: item._id || item.id,
//           id: item._id || item.id,
//           VechileId: item.VechileId || item.vehicleId || item.vechileId,
//           vehicleType: item.vechileType || item.vehicleType,
//           userId: item.userId,
//           fromDate: item.fromDate,
//           toDate: item.toDate,
//           fromTime: item.fromTime || "00:00",
//           toTime: item.toTime || "23:59",
//           isNotAvailable: item.isNotAvailable,
//           isBooked: item.isBooked,
//           reason: item.reason || "Owner unavailable",
//         }));
//       } else if (response?.data && Array.isArray(response.data)) {
//         console.log("📊 Processing data array format...");
//         allSlots = response.data.map((item: any) => ({
//           _id: item._id || item.id,
//           id: item._id || item.id,
//           VechileId: item.VechileId || item.vehicleId || item.vechileId,
//           vehicleType: item.vechileType || item.vehicleType,
//           userId: item.userId,
//           fromDate: item.fromDate,
//           toDate: item.toDate,
//           fromTime: item.fromTime || "00:00",
//           toTime: item.toTime || "23:59",
//           isNotAvailable: item.isNotAvailable,
//           isBooked: item.isBooked,
//           reason: item.reason || "Owner unavailable",
//         }));
//       } else if (Array.isArray(response)) {
//         console.log("📊 Processing direct array format...");
//         allSlots = response.map((item: any) => ({
//           _id: item._id || item.id,
//           id: item._id || item.id,
//           VechileId: item.VechileId || item.vehicleId || item.vechileId,
//           vehicleType: item.vechileType || item.vehicleType,
//           userId: item.userId,
//           fromDate: item.fromDate,
//           toDate: item.toDate,
//           fromTime: item.fromTime || "00:00",
//           toTime: item.toTime || "23:59",
//           isNotAvailable: item.isNotAvailable,
//           isBooked: item.isBooked,
//           reason: item.reason || "Owner unavailable",
//         }));
//       }

//       console.log(`✅ Total slots loaded: ${allSlots.length}`);
//       console.log("🔍 Slots with IDs:", allSlots.map(s => ({ id: s.id, _id: s._id, from: s.fromDate, to: s.toDate })));

//       const unavailable: UnavailableSlot[] = [];
//       const booked: Date[] = [];

//       for (const slot of allSlots) {
//         // Filter by vehicle ID
//         const slotVehicleId = slot.VechileId || slot.vehicleId || slot.vechileId || slot.VehicleId;
//         if (slotVehicleId && String(slotVehicleId) !== String(VechileId)) {
//           console.log(`⏭️ Skipping slot for different vehicle: ${slotVehicleId}`);
//           continue;
//         }

//         // ⭐ VERIFY WE HAVE REAL MONGODB ID
//         const realMongoId = slot._id || slot.id;
//         if (!realMongoId || realMongoId.includes('-') || realMongoId.includes(':')) {
//           console.warn("⚠️ WARNING: Fake ID detected, slot may not be updatable:", realMongoId);
//         } else {
//           console.log("✅ Valid MongoDB ID:", realMongoId);
//         }

//         // Determine slot type
//         const isBookedSlot =
//           slot.isBooked === true ||
//           slot.isBooked === "true" ||
//           !!slot.bookingId ||
//           !!slot.booking_id ||
//           (slot.status && String(slot.status).toLowerCase() === "booked") ||
//           (slot.slotStatus && String(slot.slotStatus).toLowerCase() === "booked") ||
//           (slot.type && String(slot.type).toLowerCase() === "booked");

//         const isUnavailableSlot =
//           slot.isNotAvailable === true ||
//           slot.isNotAvailable === "true" ||
//           (slot.status && String(slot.status).toLowerCase() === "notavailable") ||
//           (slot.slotStatus && String(slot.slotStatus).toLowerCase() === "notavailable") ||
//           (slot.type && String(slot.type).toLowerCase() === "notavailable") ||
//           (slot.reason && String(slot.reason).toLowerCase().includes("not available"));

//         // Build date range
//         let dates: Date[] = [];
//         try {
//           const from = slot.fromDate;
//           const to = slot.toDate;

//           if (!from) {
//             console.warn("⚠️ Slot missing fromDate:", slot);
//             continue;
//           }

//           if (from === to || !to) {
//             dates = [new Date(from + "T00:00:00")];
//           } else {
//             dates = getDateRangeArray(from, to);
//           }
//         } catch (err) {
//           console.error("❌ Error building dates:", err);
//           continue;
//         }

//         if (isBookedSlot) {
//           booked.push(...dates);
//           console.log("✅ Added booked slot:", { id: slot.id, from: slot.fromDate, to: slot.toDate });
//         } else if (isUnavailableSlot) {
//           unavailable.push({
//             id: slot._id || slot.id, // ⭐ STORE REAL MONGODB ID
//             _id: slot._id || slot.id, // ⭐ BACKUP FIELD
//             VechileId: slot.VechileId || VechileId,
//             vehicleType: slot.vehicleType || vehicleType,
//             userId: slot.userId || userId,
//             dates,
//             fromDate: slot.fromDate,
//             toDate: slot.toDate,
//             fromTime: slot.fromTime || "00:00",
//             toTime: slot.toTime || "23:59",
//             reason: slot.reason || "Owner unavailable",
//             isNotAvailable: true,
//           });
//           console.log("✅ Added unavailable slot:", { id: slot._id || slot.id, from: slot.fromDate, to: slot.toDate });
//         }
//       }

//       console.log("✅ Final processed:", { unavailable: unavailable.length, booked: booked.length });
//       console.log("🔍 Unavailable slot IDs:", unavailable.map(u => u.id));

//       setUnavailableDates(unavailable);
//       setBookedDates(booked);

//       if (unavailable.length > 0 || booked.length > 0) {
//         showMessage("success", `✅ Loaded ${unavailable.length + booked.length} slot(s)`);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching availability:", error);
//       setUnavailableDates([]);
//       setBookedDates([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadSlotForEditing = async (slotId: string) => {
//     if (!slotId) return;
//     setLoading(true);

//     try {
//       console.log("🔍 Loading slot for editing, ID:", slotId);
//       const response = await availabilityAPI.getNotAvailabilityById(slotId);
//       console.log("📝 Loaded slot data:", response);

//       if (response) {
//         const fromDate = new Date(response.fromDate);
//         const toDate = new Date(response.toDate);

//         // ⭐ STEP 2: Store REAL MongoDB ID when editing
//         const realId = response._id || response.id || slotId;
//         console.log("✅ Using MongoDB ID for editing:", realId);

//         setSelectedStartDate(fromDate);
//         setSelectedEndDate(toDate);
//         setStartTime(response.fromTime || "06:00");
//         setEndTime(response.toTime || "18:00");
//         setSelectedSlotForEdit({
//           id: realId, // ⭐ REAL MONGODB ID
//           _id: realId, // ⭐ BACKUP
//           VechileId: response.VechileId || VechileId,
//           vehicleType: response.vechileType || vehicleType,
//           userId: response.userId || userId,
//           fromDate: response.fromDate,
//           toDate: response.toDate,
//           fromTime: response.fromTime,
//           toTime: response.toTime,
//         });
//         setEditMode(true);
//         setCurrentMonth(fromDate);
//         showMessage("info", "✏️ Edit mode active");
//       }
//     } catch (error) {
//       console.error("❌ Error loading slot:", error);
//       showMessage("error", "Failed to load slot for editing");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // EFFECTS
//   // ==========================================
//   useEffect(() => {
//     if (isOpen && editSlotId && userRole === "owner") {
//       loadSlotForEditing(editSlotId);
//     }
//   }, [editSlotId, isOpen]);

//   useEffect(() => {
//     if (isOpen && VechileId) {
//       fetchAvailabilityData();
//     }
//   }, [isOpen, VechileId, vehicleType, currentMonth]);

//   useEffect(() => {
//     if (!isOpen) {
//       // Reset on close
//       setEditMode(false);
//       setDeleteMode(false);
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       setSelectedSlotForEdit(null);
//       setShowMonthYearPicker(false);
//     }
//   }, [isOpen]);

//   // ==========================================
//   // EVENT HANDLERS
//   // ==========================================
//   const handleDateClick = (date: Date) => {
//     if (isPastDate(date)) return;

//     const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

//     // Customer mode: prevent selecting unavailable dates
//     if (userRole === "customer" && isDateUnavailable(normalizedDate)) {
//       const slot = getUnavailableSlotForDate(normalizedDate);
//       const reason = slot ? slot.reason : "Not available";
//       showMessage("error", `❌ Date unavailable: ${reason}`);
//       return;
//     }

//     // Owner edit mode: select start/end dates
//     if (userRole === "owner" && editMode) {
//       setFadeOpacity(0.6);

//       if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
//         setSelectedStartDate(normalizedDate);
//         setSelectedEndDate(null);
//       } else {
//         let from = selectedStartDate;
//         let to = normalizedDate;

//         if (normalizedDate < selectedStartDate) {
//           from = normalizedDate;
//           to = selectedStartDate;
//         }

//         setSelectedStartDate(from);
//         setSelectedEndDate(to);
//       }

//       setTimeout(() => setFadeOpacity(1), 120);
//       return;
//     }

//     // Owner delete mode: delete clicked slot
//     if (userRole === "owner" && deleteMode) {
//       const slot = getUnavailableSlotForDate(normalizedDate);
//       if (slot) {
//         handleDeleteSlot(slot);
//       } else {
//         showMessage("error", "❌ No slot found for this date");
//       }
//       return;
//     }

//     // Owner normal mode: clicking unavailable date opens it for editing
//     if (userRole === "owner" && !editMode && !deleteMode) {
//       const slot = getUnavailableSlotForDate(normalizedDate);
//       if (slot) {
//         console.log("✏️ Opening slot for editing:", slot);
//         console.log("🔍 Slot ID:", slot.id || slot._id);
        
//         setSelectedStartDate(new Date(slot.fromDate));
//         setSelectedEndDate(new Date(slot.toDate));
//         setStartTime(slot.fromTime);
//         setEndTime(slot.toTime);
//         setSelectedSlotForEdit({
//           id: slot._id || slot.id, // ⭐ USE REAL MONGODB ID
//           _id: slot._id || slot.id,
//           VechileId: slot.VechileId,
//           vehicleType: slot.vehicleType,
//           userId: slot.userId,
//           fromDate: slot.fromDate,
//           toDate: slot.toDate,
//           fromTime: slot.fromTime,
//           toTime: slot.toTime,
//         });
//         setEditMode(true);
//         showMessage("info", "✏️ Edit mode - select new dates or click Confirm to save");
//         return;
//       }
//     }

//     // Default selection (customer or owner normal mode)
//     setFadeOpacity(0.6);

//     if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
//       setSelectedStartDate(normalizedDate);
//       setSelectedEndDate(null);
//     } else {
//       let from = selectedStartDate;
//       let to = normalizedDate;

//       if (normalizedDate < selectedStartDate) {
//         from = normalizedDate;
//         to = selectedStartDate;
//       }

//       // Customer: check range for unavailable dates
//       if (userRole === "customer") {
//         const hasUnavailable = checkRangeHasUnavailableDates(from, to);
//         if (hasUnavailable) {
//           showMessage("error", "❌ Range contains unavailable dates");
//           setSelectedStartDate(null);
//           setSelectedEndDate(null);
//           setTimeout(() => setFadeOpacity(1), 120);
//           return;
//         }
//       }

//       setSelectedStartDate(from);
//       setSelectedEndDate(to);
//     }

//     setTimeout(() => setFadeOpacity(1), 120);
//   };

//   const handleEditIconPress = () => {
//     if (editMode && selectedStartDate && selectedEndDate) {
//       handleSaveEdit();
//     } else {
//       setEditMode(true);
//       setDeleteMode(false);
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       setSelectedSlotForEdit(null);
//       showMessage("info", "✏️ Edit mode - select dates to mark as unavailable");
//     }
//   };

//   const handleConfirmButton = async () => {
//     if (!selectedStartDate || !selectedEndDate) {
//       showMessage("error", "⚠️ Please select both start and end dates");
//       return;
//     }

//     if (userRole === "customer") {
//       // Customer: Just pass the data to parent for next step
//       if (onConfirm) {
//         onConfirm({
//           fromDate: selectedStartDate,
//           toDate: selectedEndDate,
//           fromTime: startTime,
//           toTime: endTime,
//         });
//         showMessage("success", "✅ Dates confirmed! Proceeding to next step...");
//       }
//     } else {
//       // Owner: Save to backend
//       await handleSaveEdit();
//     }
//   };

//   const handleSaveEdit = async () => {
//     if (!selectedStartDate || !selectedEndDate) {
//       showMessage("error", "⚠️ Please select both start and end dates");
//       return;
//     }

//     setFadeOpacity(0.6);
//     setLoading(true);

//     try {
//       const fromDateStr = formatDateForAPI(selectedStartDate);
//       const toDateStr = formatDateForAPI(selectedEndDate);

//       console.log("💾 Saving:", { fromDateStr, toDateStr });

//       let response;

//       if (selectedSlotForEdit && selectedSlotForEdit.id) {
//         // ⭐ STEP 3: UPDATE with REAL MongoDB ID
//         const realId = selectedSlotForEdit._id || selectedSlotForEdit.id;
//         console.log("📤 Updating slot with MongoDB ID:", realId);
        
//         // Validate ID is not fake
//         if (realId.includes('-') || realId.includes(':')) {
//           throw new Error("❌ Invalid MongoDB ID format. Cannot update with fake ID.");
//         }

//         response = await availabilityAPI.updateNotAvailability(realId, {
//           userId: selectedSlotForEdit.userId || userId,
//           VechileId: selectedSlotForEdit.VechileId || VechileId,
//           vechileType: selectedSlotForEdit.vehicleType || vehicleType,
//           fromDate: fromDateStr,
//           toDate: toDateStr,
//           fromTime: formatTimeForAPI(startTime),
//           toTime: formatTimeForAPI(endTime),
//           isNotAvailable: true,
//         });

//         console.log("✅ Update response:", response);

//         if (response && response.success) {
//           onAvailabilityUpdated && onAvailabilityUpdated(response.data || response);
//           showMessage("success", "✅ Dates updated successfully");
//         } else {
//           throw new Error(response?.message || "Update failed");
//         }
//       } else {
//         // CREATE new slot
//         console.log("📤 Creating new slot");
        
//         response = await availabilityAPI.createNotAvailability({
//           userId: userId,
//           VechileId: VechileId,
//           vechileType: vehicleType,
//           fromDate: fromDateStr,
//           toDate: toDateStr,
//           fromTime: formatTimeForAPI(startTime),
//           toTime: formatTimeForAPI(endTime),
//           isNotAvailable: true,
//         });

//         console.log("✅ Create response:", response);

//         if (response && response.success) {
//           onAvailabilityCreated && onAvailabilityCreated(response.data || response);
//           showMessage("success", "✅ Dates blocked successfully");
//         } else {
//           throw new Error(response?.message || "Create failed");
//         }
//       }

//       if (response && response.success) {
//         console.log("✅ Save successful");

//         // Clear selections and exit edit mode FIRST
//         setEditMode(false);
//         setSelectedStartDate(null);
//         setSelectedEndDate(null);
//         setSelectedSlotForEdit(null);

//         // Then refresh calendar to get updated data with real IDs
//         await fetchAvailabilityData();
//       } else {
//         showMessage("error", "❌ Failed to save changes");
//       }
//     } catch (err: any) {
//       console.error("❌ Save error:", err);
//       showMessage("error", `❌ ${err.message || "Failed to save changes"}`);
//     } finally {
//       setLoading(false);
//       setFadeOpacity(1);
//     }
//   };

//   const handleDeleteIconPress = () => {
//     if (deleteMode) {
//       setDeleteMode(false);
//       showMessage("info", "Delete mode disabled");
//     } else {
//       setDeleteMode(true);
//       setEditMode(false);
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       setSelectedSlotForEdit(null);
//       showMessage("warning", "🗑️ Delete mode - tap any unavailable date to delete");
//     }
//   };

//   const handleDeleteSlot = async (slot: UnavailableSlot) => {
//     if (!slot || !slot.id) {
//       showMessage("error", "❌ No slot found to delete");
//       return;
//     }

//     // ⭐ STEP 4: Validate real MongoDB ID before delete
//     const realId = slot._id || slot.id;
//     console.log("🗑️ Attempting to delete slot with ID:", realId);

//     if (realId.includes('-') || realId.includes(':')) {
//       showMessage("error", "❌ Cannot delete: Invalid MongoDB ID format");
//       console.error("❌ Fake ID detected:", realId);
//       return;
//     }

//     if (
//       !window.confirm(
//         `🗑️ Delete unavailable period from ${slot.fromDate} to ${slot.toDate}?\n\nThis cannot be undone.`
//       )
//     ) {
//       return;
//     }

//     setFadeOpacity(0.6);
//     setLoading(true);

//     try {
//       console.log("📤 Deleting with MongoDB ID:", realId);
//       const response = await availabilityAPI.deleteNotAvailability(realId);

//       if (response && response.success) {
//         console.log("✅ Delete successful");
//         await fetchAvailabilityData();
//         onAvailabilityDeleted && onAvailabilityDeleted(realId);
//         setDeleteMode(false);
//         showMessage("success", "✅ Slot deleted successfully");
//       } else {
//     throw new Error(response?.data?.message || "Delete failed");

//       }
//     } catch (err: any) {
//       console.error("❌ Delete error:", err);
//       showMessage("error", `❌ ${err.message || "Failed to delete slot"}`);
//     } finally {
//       setLoading(false);
//       setFadeOpacity(1);
//     }
//   };

//   const handleMonthYearSelect = (monthIndex: number, year: number) => {
//     setCurrentMonth(new Date(year, monthIndex, 1));
//     setShowMonthYearPicker(false);
//   };

//   // ==========================================
//   // CALENDAR RENDERING
//   // ==========================================
//   const generateCalendarDays = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const startDate = new Date(firstDay);
//     const dayOfWeek = firstDay.getDay();
//     const adjustment = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
//     startDate.setDate(firstDay.getDate() - adjustment);

//     const days: JSX.Element[] = [];
//     for (let i = 0; i < 42; i++) {
//       const date = new Date(startDate);
//       date.setDate(startDate.getDate() + i);
//       days.push(renderDay(date, i));
//     }

//     return days;
//   };

//   const renderDay = (date: Date, index: number) => {
//     const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
//     const isSelected = isDateSelected(date);
//     const isStartOrEnd = isDateStartOrEnd(date);
//     const isInRange = isDateInRange(date);
//     const isUnavail = isDateUnavailable(date);
//     const isPast = isPastDate(date);
//     const showAsEditing = editMode && (isStartOrEnd || isInRange);
//     const showAsDeleteTarget = deleteMode && isUnavail && !isPast && isCurrentMonth;

//     let bgClass = "bg-white hover:bg-gray-100";
//     let textClass = "text-gray-700";
//     let borderClass = "border border-transparent";
//     let showStrikeLine = false;

//     if (isPast) {
//       bgClass = "bg-gray-50";
//       textClass = "text-gray-300";
//     } else if (showAsEditing && isStartOrEnd) {
//       bgClass = "bg-orange-500";
//       textClass = "text-white font-bold";
//     } else if (showAsEditing && isInRange) {
//       bgClass = "bg-orange-100";
//       textClass = "text-orange-900 font-semibold";
//     } else if (showAsDeleteTarget) {
//       bgClass = "bg-red-50";
//       borderClass = "border-2 border-red-300";
//       textClass = "text-red-800 font-bold";
//     } else if (!showAsEditing && isStartOrEnd) {
//       bgClass = "bg-black";
//       textClass = "text-white font-bold";
//     } else if (!showAsEditing && isInRange) {
//       bgClass = "bg-gray-200";
//       textClass = "text-gray-800 font-medium";
//     } else if (isUnavail) {
//       bgClass = "bg-red-50";
//       borderClass = "border-2 border-red-200";
//       textClass = "text-red-700 font-medium";
//       showStrikeLine = true;
//     }

//     if (!isCurrentMonth) {
//       textClass = "text-gray-300";
//     }

//     return (
//       <button
//         key={index}
//         onClick={() => isCurrentMonth && !isPast && handleDateClick(date)}
//         disabled={isPast || (userRole === "customer" && isUnavail)}
//         className={`relative h-10 w-full rounded-md transition-all ${bgClass} ${textClass} ${borderClass} ${
//           isPast || (userRole === "customer" && isUnavail) ? "cursor-not-allowed opacity-50" : "cursor-pointer"
//         }`}
//       >
//         <span className="relative z-10">{date.getDate()}</span>

//         {/* Strike-through line for unavailable dates */}
//         {showStrikeLine && isCurrentMonth && (
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
//             <div className="w-4/5 h-0.5 bg-red-600 transform rotate-45" />
//             <div className="w-4/5 h-0.5 bg-red-600 transform -rotate-45 absolute" />
//           </div>
//         )}

//         {/* Delete indicator */}
//         {showAsDeleteTarget && (
//           <div className="absolute -top-1 -right-1 z-30">
//             <Trash2 size={12} className="text-red-600" />
//           </div>
//         )}
//       </button>
//     );
//   };

//   const generateTimeOptions = () => {
//     const options: { value: string; label: string }[] = [];
//     for (let h = 0; h < 24; h++) {
//       for (let m = 0; m < 60; m += 30) {
//         const hour = h.toString().padStart(2, "0");
//         const minute = m.toString().padStart(2, "0");
//         const time = `${hour}:${minute}`;
//         const period = h >= 12 ? "PM" : "AM";
//         const displayHour = h % 12 || 12;
//         options.push({
//           value: time,
//           label: `${displayHour}:${minute} ${period}`,
//         });
//       }
//     }
//     return options;
//   };

//   const timeOptions = generateTimeOptions();

//   // ==========================================
//   // MAIN RENDER
//   // ==========================================
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div
//         className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto"
//         style={{ opacity: fadeOpacity, transition: "opacity 0.2s" }}
//       >
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
//           <div className="flex items-center gap-4">
//             <h2 className="text-2xl font-bold text-gray-900">
//               {userRole === "owner" ? "Manage Vehicle Availability" : "Select Booking Dates"}
//             </h2>
//             <div className="flex items-center gap-2">
//               {userRole === "owner" && (
//                 <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full">
//                   Owner Mode
//                 </span>
//               )}
//               {userRole === "customer" && (
//                 <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
//                   Customer View
//                 </span>
//               )}
//               {editMode && (
//                 <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
//                   Editing
//                 </span>
//               )}
//               {deleteMode && (
//                 <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
//                   Delete Mode
//                 </span>
//               )}
//             </div>
//           </div>

//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-gray-100 transition"
//             disabled={loading}
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Edit Mode Banner */}
//         {editMode && userRole === "owner" && (
//           <div className="mx-6 mt-4 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-lg flex items-center gap-3">
//             <Edit2 size={20} className="text-orange-600 flex-shrink-0" />
//             <p className="text-sm text-orange-800 font-medium">
//               Select dates to mark as not available. Tap the ✓ icon to save changes.
//             </p>
//           </div>
//         )}

//         {/* Delete Mode Banner */}
//         {deleteMode && userRole === "owner" && (
//           <div className="mx-6 mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center gap-3">
//             <Trash2 size={20} className="text-red-600 flex-shrink-0" />
//             <p className="text-sm text-red-800 font-medium">
//               Tap any not-available date to delete it.
//             </p>
//           </div>
//         )}

//         {/* Customer Info Banner */}
//         {userRole === "customer" && (unavailableDates.length > 0 || bookedDates.length > 0) && (
//           <div className="mx-6 mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg flex items-center gap-3">
//             <Info size={20} className="text-blue-600 flex-shrink-0" />
//             <p className="text-sm text-blue-800 font-medium">
//               Red crossed dates are not available for booking.
//             </p>
//           </div>
//         )}

//         {/* Message Display */}
//         {message.text && (
//           <div className="mx-6 mt-4">
//             <div
//               className={`p-4 rounded-lg font-medium flex items-center gap-3 ${
//                 message.type === "success"
//                   ? "bg-green-50 text-green-800 border-2 border-green-300"
//                   : message.type === "error"
//                   ? "bg-red-50 text-red-800 border-2 border-red-300"
//                   : message.type === "warning"
//                   ? "bg-yellow-50 text-yellow-800 border-2 border-yellow-300"
//                   : "bg-blue-50 text-blue-800 border-2 border-blue-300"
//               }`}
//             >
//               {message.type === "success" && <Check size={20} />}
//               {message.type === "error" && <AlertCircle size={20} />}
//               {message.type === "warning" && <AlertCircle size={20} />}
//               {message.type === "info" && <Calendar size={20} />}
//               <span>{message.text}</span>
//             </div>
//           </div>
//         )}

//         {/* Loading Overlay */}
//         {loading && (
//           <div className="mx-6 mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-center gap-3">
//             <div className="animate-spin w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full" />
//             <span className="text-gray-700 font-medium">Processing...</span>
//           </div>
//         )}

//         <div className="p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Calendar Section */}
//             <div className="lg:col-span-2 space-y-4">
//               {/* Date Display */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Calendar size={16} className="text-gray-500" />
//                     <label className="text-sm font-medium text-gray-700">From Date</label>
//                   </div>
//                   <div className="text-lg font-bold text-gray-900">
//                     {selectedStartDate ? formatDateForDisplay(selectedStartDate) : "Select"}
//                   </div>
//                 </div>

//                 <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Calendar size={16} className="text-gray-500" />
//                     <label className="text-sm font-medium text-gray-700">To Date</label>
//                   </div>
//                   <div className="text-lg font-bold text-gray-900">
//                     {selectedEndDate ? formatDateForDisplay(selectedEndDate) : "Select"}
//                   </div>
//                 </div>
//               </div>

//               {/* Calendar */}
//               <div className="border-2 border-gray-200 rounded-xl p-5 bg-white shadow-sm">
//                 {/* Month Header */}
//                 <div className="flex items-center justify-between mb-4">
//                   <button
//                     onClick={() =>
//                       setCurrentMonth(
//                         new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
//                       )
//                     }
//                     className="p-2 hover:bg-gray-100 rounded-lg transition"
//                     disabled={loading}
//                   >
//                     <ChevronLeft size={24} />
//                   </button>

//                   <div className="flex flex-col items-center">
//                     <button
//                       onClick={() => setShowMonthYearPicker(!showMonthYearPicker)}
//                       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition"
//                     >
//                       <span className="font-bold text-xl">
//                         {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
//                       </span>
//                       {showMonthYearPicker ? (
//                         <ChevronUp size={16} />
//                       ) : (
//                         <ChevronDown size={16} />
//                       )}
//                     </button>

//                     {/* Month/Year Picker */}
//                     {showMonthYearPicker && (
//                       <div className="mt-2 p-4 bg-gray-50 rounded-lg shadow-lg w-64">
//                         <div className="mb-3">
//                           <div className="grid grid-cols-4 gap-2">
//                             {monthNames.map((m, i) => (
//                               <button
//                                 key={m}
//                                 onClick={() => handleMonthYearSelect(i, currentMonth.getFullYear())}
//                                 className={`px-2 py-1 rounded text-xs font-medium transition ${
//                                   currentMonth.getMonth() === i
//                                     ? "bg-blue-500 text-white"
//                                     : "bg-white hover:bg-gray-200"
//                                 }`}
//                               >
//                                 {m}
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-3 gap-2">
//                           {years.map((y) => (
//                             <button
//                               key={y}
//                               onClick={() => handleMonthYearSelect(currentMonth.getMonth(), y)}
//                               className={`px-2 py-1 rounded text-xs font-medium transition ${
//                                 currentMonth.getFullYear() === y
//                                   ? "bg-blue-500 text-white"
//                                   : "bg-white hover:bg-gray-200"
//                               }`}
//                             >
//                               {y}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Owner Control Icons */}
//                   {userRole === "owner" && (
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={handleEditIconPress}
//                         className={`p-2 rounded-lg transition ${
//                           editMode
//                             ? "bg-green-100 hover:bg-green-200"
//                             : "bg-gray-100 hover:bg-gray-200"
//                         }`}
//                         title={editMode ? "Save changes" : "Edit availability"}
//                         disabled={loading}
//                       >
//                         {editMode ? (
//                           <Check size={24} className="text-green-600" />
//                         ) : (
//                           <Edit2 size={24} className="text-blue-600" />
//                         )}
//                       </button>
//                       <button
//                         onClick={handleDeleteIconPress}
//                         className={`p-2 rounded-lg transition ${
//                           deleteMode
//                             ? "bg-red-100 hover:bg-red-200"
//                             : "bg-gray-100 hover:bg-gray-200"
//                         }`}
//                         title={deleteMode ? "Exit delete mode" : "Delete availability"}
//                         disabled={loading}
//                       >
//                         <Trash2 size={24} className={deleteMode ? "text-red-600" : "text-gray-600"} />
//                       </button>
//                     </div>
//                   )}

//                   <button
//                     onClick={() =>
//                       setCurrentMonth(
//                         new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
//                       )
//                     }
//                     className="p-2 hover:bg-gray-100 rounded-lg transition"
//                     disabled={loading}
//                   >
//                     <ChevronRight size={24} />
//                   </button>
//                 </div>

//                 {/* Week Days */}
//                 <div className="grid grid-cols-7 gap-2 mb-2">
//                   {weekDays.map((day) => (
//                     <div key={day} className="text-center text-sm font-bold text-gray-600">
//                       {day}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Calendar Grid */}
//                 <div className="grid grid-cols-7 gap-2">{generateCalendarDays()}</div>

//                 {/* Legend */}
//                 <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t">
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded" />
//                     <span className="text-xs text-gray-600">Available</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-red-50 border-2 border-red-200 rounded" />
//                     <span className="text-xs text-gray-600">
//                       {userRole === "owner" ? "Unavailable/Booked" : "Not Available"}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-black rounded" />
//                     <span className="text-xs text-gray-600">
//                       {editMode ? "Editing" : "Selected"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Time & Actions Section */}
//             <div className="space-y-4">
//               {/* Start Time */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">Start Time</label>
//                 <select
//                   value={startTime}
//                   onChange={(e) => setStartTime(e.target.value)}
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none"
//                   disabled={loading}
//                 >
//                   {timeOptions.map((time) => (
//                     <option key={time.value} value={time.value}>
//                       {time.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* End Time */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">End Time</label>
//                 <select
//                   value={endTime}
//                   onChange={(e) => setEndTime(e.target.value)}
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold focus:border-blue-500 focus:outline-none"
//                   disabled={loading}
//                 >
//                   {timeOptions.map((time) => (
//                     <option key={time.value} value={time.value}>
//                       {time.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Summary */}
//               {selectedStartDate && selectedEndDate && (
//                 <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
//                   <p className="text-sm font-bold text-green-900 mb-2">
//                     {editMode ? "Editing Dates" : "Selected Dates"}
//                   </p>
//                   <p className="text-xs text-green-800">
//                     From: {formatDateForAPI(selectedStartDate)}
//                   </p>
//                   <p className="text-xs text-green-800">To: {formatDateForAPI(selectedEndDate)}</p>
//                   {editMode && (
//                     <p className="text-xs text-green-700 mt-2 italic">Tap ✓ icon to save changes</p>
//                   )}
//                 </div>
//               )}

//               {/* Data Info */}
//               {(unavailableDates.length > 0 || bookedDates.length > 0) && !loading && (
//                 <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
//                   <div className="flex items-center gap-2 mb-1">
//                     <Check size={16} className="text-blue-600" />
//                     <p className="text-sm font-bold text-blue-900">Calendar Data Loaded</p>
//                   </div>
//                   <p className="text-xs text-blue-800">
//                     {unavailableDates.length + bookedDates.length} slot(s) from database
//                   </p>
//                 </div>
//               )}

//               {/* Confirm Button */}
//               <button
//                 onClick={handleConfirmButton}
//                 disabled={!selectedStartDate || !selectedEndDate || loading}
//                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-lg font-bold text-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin w-5 h-5 border-3 border-white border-t-transparent rounded-full" />
//                     {userRole === "owner" ? "Saving..." : "Processing..."}
//                   </>
//                 ) : (
//                   <>
//                     <Check size={20} />
//                     {userRole === "owner" 
//                       ? (editMode ? "Confirm & Save Changes" : "Confirm & Save Dates")
//                       : "Confirm & Continue"}
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleAvailabilityCalendar;










// import React, { useState } from 'react';
// import {
//   X, Calendar, ChevronLeft, ChevronRight,
//   Edit2, Trash2, Check, AlertCircle, Clock
// } from "lucide-react";

// interface AvailabilityDateTimeProps {
//   isOpen: boolean;
//   onClose: () => void;
//   VechileId: string;
//   vehicleType: "Car" | "Bike" | "Auto";
//   userId: string;
// }

// interface TimeSlot {
//   hour: number;
//   period: 'AM' | 'PM';
// }

// interface AvailabilityItem {
//   id: string;
//   startDate: Date;
//   endDate: Date;
//   startTime: TimeSlot;
//   endTime: TimeSlot;
//   status: string;
// }

// const AvailabilityDateTime: React.FC<AvailabilityDateTimeProps> = ({ 
//   isOpen, 
//   onClose, 
//   VechileId, 
//   vehicleType, 
//   userId 
// }) => {
//   const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
//   const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
//   const [startTime, setStartTime] = useState<TimeSlot>({ hour: 9, period: 'AM' });
//   const [endTime, setEndTime] = useState<TimeSlot>({ hour: 6, period: 'PM' });
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [availabilities, setAvailabilities] = useState<AvailabilityItem[]>([]);
//   const [showStartTime, setShowStartTime] = useState(false);
//   const [showEndTime, setShowEndTime] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   // ============ UTILITY FUNCTIONS ============
  
//   const daysInMonth = (date: Date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysArray = [];
    
//     const startPadding = firstDay.getDay();
//     for (let i = 0; i < startPadding; i++) {
//       daysArray.push(null);
//     }
    
//     for (let i = 1; i <= lastDay.getDate(); i++) {
//       daysArray.push(new Date(year, month, i));
//     }
    
//     return daysArray;
//   };

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//   };

//   const formatTime = (time: TimeSlot) => {
//     return `${time.hour.toString().padStart(2, '0')} ${time.period}`;
//   };

//   const formatDateForBackend = (date: Date): string => {
//     return date.toISOString().split('T')[0];
//   };

//   const formatTimeForBackend = (time: TimeSlot): string => {
//     let hour24 = time.hour;
//     if (time.period === 'PM' && time.hour !== 12) {
//       hour24 = time.hour + 12;
//     } else if (time.period === 'AM' && time.hour === 12) {
//       hour24 = 0;
//     }
//     return `${hour24}.00`;
//   };

//   // Check if a date is unavailable
//   const isDateUnavailable = (date: Date) => {
//     return availabilities.some(item => {
//       const checkDate = new Date(date);
//       checkDate.setHours(0, 0, 0, 0);
//       const start = new Date(item.startDate);
//       start.setHours(0, 0, 0, 0);
//       const end = new Date(item.endDate);
//       end.setHours(0, 0, 0, 0);
//       return checkDate >= start && checkDate <= end;
//     });
//   };

//   // ============ API CALL - CREATE UNAVAILABILITY ============

//   const createUnavailability = async () => {
//     if (!selectedStartDate || !selectedEndDate) {
//       setError('Please select both start and end dates');
//       setTimeout(() => setError(null), 3000);
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // Simulating API call
//       console.log("🚫 Creating Unavailability:", {
//         userId,
//         VechileId,
//         vehicleType,
//         fromDate: formatDateForBackend(selectedStartDate),
//         toDate: formatDateForBackend(selectedEndDate),
//         fromTime: formatTimeForBackend(startTime),
//         toTime: formatTimeForBackend(endTime),
//       });

//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       const newItem: AvailabilityItem = {
//         id: Date.now().toString(),
//         startDate: selectedStartDate,
//         endDate: selectedEndDate,
//         startTime,
//         endTime,
//         status: 'Unavailable'
//       };

//       setAvailabilities([...availabilities, newItem]);
      
//       setSuccess('Unavailability added successfully!');
//       setTimeout(() => setSuccess(null), 3000);
      
//       resetForm();
//     } catch (err: any) {
//       console.error("❌ Create Error:", err);
//       setError(err.message || 'Failed to create unavailability');
//       setTimeout(() => setError(null), 5000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============ FORM HANDLERS ============

//   const resetForm = () => {
//     setSelectedStartDate(null);
//     setSelectedEndDate(null);
//     setStartTime({ hour: 9, period: 'AM' });
//     setEndTime({ hour: 6, period: 'PM' });
//   };

//   const handleConfirm = async () => {
//     await createUnavailability();
//   };

//   const handleDelete = (id: string) => {
//     setAvailabilities(availabilities.filter(item => item.id !== id));
//     setSuccess('Unavailability deleted!');
//     setTimeout(() => setSuccess(null), 3000);
//   };

//   const isDateSelected = (date: Date) => {
//     if (!selectedStartDate) return false;
//     if (!selectedEndDate) {
//       return date.getTime() === selectedStartDate.getTime();
//     }
//     return date >= selectedStartDate && date <= selectedEndDate;
//   };

//   const handleDateClick = (date: Date) => {
//     if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
//       setSelectedStartDate(date);
//       setSelectedEndDate(null);
//     } else {
//       if (date >= selectedStartDate) {
//         setSelectedEndDate(date);
//       } else {
//         setSelectedStartDate(date);
//         setSelectedEndDate(null);
//       }
//     }
//   };

//   const generateTimeOptions = () => {
//     const times = [];
//     for (let i = 1; i <= 12; i++) {
//       times.push({ hour: i, period: 'AM' as 'AM' | 'PM' });
//     }
//     for (let i = 1; i <= 12; i++) {
//       times.push({ hour: i, period: 'PM' as 'AM' | 'PM' });
//     }
//     return times;
//   };

//   const days = daysInMonth(currentMonth);
//   const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
//       <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
//         {/* Success Toast */}
//         {success && (
//           <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
//             <div className="w-5 h-5 rounded-full bg-white text-green-500 flex items-center justify-center font-bold">✓</div>
//             <span>{success}</span>
//           </div>
//         )}

//         {/* Error Toast */}
//         {error && (
//           <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
//             <AlertCircle className="w-5 h-5" />
//             <span>{error}</span>
//           </div>
//         )}

//         {/* Loading Overlay */}
//         {loading && (
//           <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 shadow-xl">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#001F67] mx-auto"></div>
//               <p className="mt-4 text-gray-700 font-medium">Creating unavailability...</p>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 bg-[#001F67] rounded-lg flex items-center justify-center">
//               <Calendar className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-semibold text-gray-900">Add Unavailability Date & Time</h1>
//               <p className="text-sm text-gray-500">Manage your vehicle availability</p>
//             </div>
//           </div>
//           <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Modal Content */}
//         <div className="p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Left Side - Date Selection */}
//             <div>
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div>
//                   <label className="block text-xs font-medium text-[#6C6C6C] mb-2">Start Date</label>
//                   <div className="h-14 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#F4F4F4] text-sm font-medium text-gray-900">
//                     {selectedStartDate ? formatDate(selectedStartDate) : 'Select'}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-[#6C6C6C] mb-2">End Date</label>
//                   <div className="h-14 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#F4F4F4] text-sm font-medium text-gray-900">
//                     {selectedEndDate ? formatDate(selectedEndDate) : 'Select'}
//                   </div>
//                 </div>
//               </div>

//               {/* Calendar */}
//               <div className="bg-white border border-[#E5E5E5] rounded-xl p-4">
//                 <div className="flex items-center justify-between mb-4">
//                   <button
//                     onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
//                     className="p-1 hover:bg-gray-100 rounded"
//                   >
//                     <ChevronLeft className="w-5 h-5" />
//                   </button>
//                   <span className="text-sm font-medium text-gray-900">{monthYear}</span>
//                   <button
//                     onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
//                     className="p-1 hover:bg-gray-100 rounded"
//                   >
//                     <ChevronRight className="w-5 h-5" />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-7 gap-2 mb-2">
//                   {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
//                     <div key={day} className="text-center text-xs font-medium text-[#6C6C6C] py-2">
//                       {day}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="grid grid-cols-7 gap-2">
//                   {days.map((day, index) => {
//                     const unavailable = day && isDateUnavailable(day);
//                     const selected = day && isDateSelected(day);
                    
//                     return (
//                       <button
//                         key={index}
//                         onClick={() => day && handleDateClick(day)}
//                         disabled={!day}
//                         className={`
//                           aspect-square rounded-lg text-sm font-medium transition-all relative
//                           ${!day ? 'invisible' : ''}
//                           ${selected 
//                             ? 'bg-[#001F67] text-white' 
//                             : unavailable
//                             ? 'bg-red-100 text-red-700 border-2 border-red-300'
//                             : 'bg-white text-gray-900 hover:bg-[#E8F0FF] border border-[#E5E5E5]'}
//                           disabled:text-[#C7C7C7] disabled:cursor-not-allowed
//                         `}
//                       >
//                         {day?.getDate()}
//                         {unavailable && !selected && (
//                           <div className="absolute inset-0 flex items-center justify-center">
//                             <div className="w-1 h-full bg-red-400 transform rotate-45"></div>
//                           </div>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <select className="w-full h-12 px-4 border border-[#E5E5E5] rounded-lg bg-[#FFE5E5] text-red-700 font-medium text-sm" disabled>
//                   <option>Unavailable</option>
//                 </select>
//               </div>
//             </div>

//             {/* Right Side - Time Selection */}
//             <div>
//               <h3 className="text-base font-semibold text-gray-900 mb-4">Select Time</h3>
              
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 {/* Start Time */}
//                 <div className="relative">
//                   <label className="block text-xs font-medium text-[#6C6C6C] mb-2">Start Time</label>
//                   <button
//                     onClick={() => {
//                       setShowStartTime(!showStartTime);
//                       setShowEndTime(false);
//                     }}
//                     className="w-full h-14 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-white hover:bg-[#E9ECF9] transition-colors"
//                   >
//                     <span className="text-base font-semibold text-gray-900">{formatTime(startTime)}</span>
//                   </button>
//                   {showStartTime && (
//                     <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E5E5E5] rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
//                       {generateTimeOptions().map((time, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => {
//                             setStartTime(time);
//                             setShowStartTime(false);
//                           }}
//                           className="w-full px-4 py-2 text-sm text-left hover:bg-[#E9ECF9] transition-colors"
//                         >
//                           {formatTime(time)}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* End Time */}
//                 <div className="relative">
//                   <label className="block text-xs font-medium text-[#6C6C6C] mb-2">End Time</label>
//                   <button
//                     onClick={() => {
//                       setShowEndTime(!showEndTime);
//                       setShowStartTime(false);
//                     }}
//                     className="w-full h-14 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-white hover:bg-[#E9ECF9] transition-colors"
//                   >
//                     <span className="text-base font-semibold text-gray-900">{formatTime(endTime)}</span>
//                   </button>
//                   {showEndTime && (
//                     <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E5E5E5] rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
//                       {generateTimeOptions().map((time, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => {
//                             setEndTime(time);
//                             setShowEndTime(false);
//                           }}
//                           className="w-full px-4 py-2 text-sm text-left hover:bg-[#E9ECF9] transition-colors"
//                         >
//                           {formatTime(time)}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Time Slots Preview */}
//               <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E5E5E5] mb-6">
//                 <p className="text-xs font-medium text-[#6C6C6C] mb-3">Unavailable Time Slot</p>
//                 <div className="space-y-2">
//                   <div className="text-sm text-gray-700">
//                     <span className="font-medium">{formatTime(startTime)}</span>
//                     <span className="mx-2 text-gray-400">→</span>
//                     <span className="font-medium">{formatTime(endTime)}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Unavailable Dates List */}
//               {availabilities.length > 0 && (
//                 <div className="mb-6">
//                   <h3 className="text-sm font-semibold text-gray-900 mb-3">Unavailable Dates</h3>
//                   <div className="space-y-2 max-h-48 overflow-y-auto">
//                     {availabilities.map((item) => (
//                       <div key={item.id} className="bg-red-50 rounded-lg p-3 border border-red-200">
//                         <div className="flex items-center justify-between">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
//                               <Calendar className="w-3 h-3 text-red-600" />
//                               <span className="font-medium">{formatDate(item.startDate)}</span>
//                               <span className="text-gray-400">→</span>
//                               <span className="font-medium">{formatDate(item.endDate)}</span>
//                             </div>
//                             <div className="flex items-center gap-2 text-xs text-gray-600">
//                               <Clock className="w-3 h-3 text-red-600" />
//                               <span>{formatTime(item.startTime)} → {formatTime(item.endTime)}</span>
//                             </div>
//                           </div>
//                           <button
//                             onClick={() => handleDelete(item.id)}
//                             className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-all"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Info Box */}
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                 <div className="flex gap-3">
//                   <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                   <div className="text-sm text-blue-800">
//                     <p className="font-medium mb-1">About Unavailability</p>
//                     <p className="text-xs">This will mark your vehicle as unavailable for the selected dates and times. Customers won't be able to book during this period.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Confirm Button */}
//           <button
//             onClick={handleConfirm}
//             disabled={!selectedStartDate || !selectedEndDate || loading}
//             className="w-full h-12 mt-6 bg-gradient-to-r from-[#001F67] to-[#3474FF] text-white rounded-lg font-medium hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
//           >
//             {loading ? 'Creating...' : 'Confirm Unavailability'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AvailabilityDateTime;






// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   X, Calendar, ChevronLeft, ChevronRight, Edit2, Trash2, 
//   AlertCircle, Clock, Loader2, RefreshCw, Check, Ban
// } from "lucide-react";

// // ============ TYPE DEFINITIONS ============

// interface CalendarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   vehicleId: string;
//   vehicleType: "Car" | "Bike" | "Auto";
//   userId: string;
//   userRole: "owner" | "customer";
//   onBookingComplete?: (startDate: Date, endDate: Date) => void;
// }

// interface TimeSlot {
//   hour: number;
//   period: 'AM' | 'PM';
// }

// interface UnavailableSlot {
//   id: string;
//   dates: Date[];
//   fromDate: string;
//   toDate: string;
//   reason: string;
// }

// interface AvailabilityBlock {
//   _id: string;
//   startDate: Date;
//   endDate: Date;
//   startTime: TimeSlot;
//   endTime: TimeSlot;
//   type: "NotAvailable" | "Booked";
//   isHistorical?: boolean;
// }

// // ============ MAIN COMPONENT ============

// const AvailabilityDateTime: React.FC<CalendarProps> = ({ 
//   isOpen, 
//   onClose, 
//   vehicleId, 
//   vehicleType, 
//   userId,
//   userRole,
//   onBookingComplete
// }) => {
  
//   // ============ STATE MANAGEMENT ============
  
//   // Form States
//   const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
//   const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
//   const [startTime, setStartTime] = useState<TimeSlot>({ hour: 9, period: 'AM' });
//   const [endTime, setEndTime] = useState<TimeSlot>({ hour: 6, period: 'PM' });
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   // UI States
//   const [showStartTime, setShowStartTime] = useState(false);
//   const [showEndTime, setShowEndTime] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [syncing, setSyncing] = useState(false);

//   // Data States
//   const [unavailableDates, setUnavailableDates] = useState<UnavailableSlot[]>([]);
//   const [bookedDates, setBookedDates] = useState<Date[]>([]);
//   const [availabilityBlocks, setAvailabilityBlocks] = useState<AvailabilityBlock[]>([]);

//   // Edit/Delete Mode States
//   const [editMode, setEditMode] = useState(false);
//   const [deleteMode, setDeleteMode] = useState(false);
//   const [selectedSlotForEdit, setSelectedSlotForEdit] = useState<UnavailableSlot | null>(null);

//   // Auto-sync
//   const [autoSync, setAutoSync] = useState(true);
//   const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());

//   // ============ UTILITY FUNCTIONS ============

//   const formatDateForBackend = (date: Date): string => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const formatDateDisplay = (date: Date): string => {
//     return date.toLocaleDateString('en-US', { 
//       month: 'short', 
//       day: 'numeric', 
//       year: 'numeric' 
//     });
//   };

//   const formatTime = (time: TimeSlot): string => {
//     return `${time.hour.toString().padStart(2, '0')} ${time.period}`;
//   };

//   const parseTimeFromBackend = (timeStr: string): TimeSlot => {
//     const hour24 = parseFloat(timeStr);
//     let hour = hour24;
//     let period: 'AM' | 'PM' = 'AM';

//     if (hour24 === 0) {
//       hour = 12;
//       period = 'AM';
//     } else if (hour24 < 12) {
//       hour = hour24;
//       period = 'AM';
//     } else if (hour24 === 12) {
//       hour = 12;
//       period = 'PM';
//     } else {
//       hour = hour24 - 12;
//       period = 'PM';
//     }

//     return { hour: Math.floor(hour), period };
//   };

//   const formatTimeForBackend = (time: TimeSlot): string => {
//     let hour24 = time.hour;
//     if (time.period === 'PM' && time.hour !== 12) {
//       hour24 = time.hour + 12;
//     } else if (time.period === 'AM' && time.hour === 12) {
//       hour24 = 0;
//     }
//     return `${hour24}.00`;
//   };

//   const isDateInPast = (date: Date): boolean => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const checkDate = new Date(date);
//     checkDate.setHours(0, 0, 0, 0);
//     return checkDate < today;
//   };

//   const getDateRangeArray = (startDateStr: string, endDateStr: string): Date[] => {
//     const dates: Date[] = [];
//     const start = new Date(startDateStr + 'T00:00:00');
//     const end = new Date(endDateStr + 'T00:00:00');
//     const current = new Date(start);
    
//     while (current <= end) {
//       dates.push(new Date(current));
//       current.setDate(current.getDate() + 1);
//     }
    
//     return dates;
//   };

//   // ============ API INTEGRATION ============
// const fetchVehicleAvailability = useCallback(async (silent = false) => {
//   if (!vehicleId) return;

//   if (!silent) setSyncing(true);

//   try {
//     const url = `http://3.110.122.127:3000/getVehicleAvailability?VechileId=${vehicleId}&vechileType=${vehicleType}`;

//     console.log("📡 Fetching:", url);

//     const response = await fetch(url, {
//       method: "GET",
//       redirect: "follow"
//     });

//     const data = await response.json();
//     console.log("📊 API Response:", data);

//     if (data.success || data.availability) {
//       parseAndCategorizeAvailability(data.availability || []);
//       setLastSyncTime(new Date());
//       console.log("✅ Calendar synced successfully");
//     } else {
//       console.log("⚠ No availability data returned");
//     }

//   } catch (err) {
//     console.error("❌ Sync failed:", err);

//     if (!silent) {
//       setError("Failed to sync calendar");
//       setTimeout(() => setError(null), 3000);
//     }

//   } finally {
//     if (!silent) setSyncing(false);
//   }

// }, [vehicleId, vehicleType]);


//   const parseAndCategorizeAvailability = (data: any[]) => {
//     const unavailable: UnavailableSlot[] = [];
//     const booked: Date[] = [];
//     const blocks: AvailabilityBlock[] = [];

//     console.log('🔄 Processing availability data:', data.length, 'days');

//     data.forEach(day => {
//       const dayDate = day.date.split('T')[0];
//       const isPast = isDateInPast(new Date(dayDate));

//       day.slots?.forEach((slot: any) => {
//         const slotId = slot._id || slot.id || `${dayDate}-${slot.fromTime}`;
//         const isBookedSlot = 
//           slot.type === "Booked" ||
//           slot.status?.toLowerCase() === 'booked' ||
//           slot.isBooked === true;

//         const isUnavailableSlot = 
//           slot.type === "NotAvailable" ||
//           slot.status?.toLowerCase() === 'notavailable' ||
//           slot.isNotAvailable === true;

//         // Build date range for this slot
//         let dates: Date[] = [];
//         try {
//           const from = slot.fromDate || dayDate;
//           const to = slot.toDate || dayDate;
          
//           if (from === to) {
//             dates = [new Date(from + 'T00:00:00')];
//           } else {
//             dates = getDateRangeArray(from, to);
//           }
//         } catch (err) {
//           console.error('Error building dates:', err);
//           return;
//         }

//         if (isBookedSlot && !isPast) {
//           booked.push(...dates);
//           console.log('📅 Booked:', dayDate);
          
//           blocks.push({
//             _id: slotId,
//             startDate: new Date(slot.fromDate || dayDate),
//             endDate: new Date(slot.toDate || dayDate),
//             startTime: parseTimeFromBackend(slot.fromTime),
//             endTime: parseTimeFromBackend(slot.toTime),
//             type: "Booked",
//             isHistorical: isPast
//           });
//         } else if (isUnavailableSlot && !isPast) {
//           unavailable.push({
//             id: slotId,
//             dates,
//             fromDate: slot.fromDate || dayDate,
//             toDate: slot.toDate || dayDate,
//             reason: slot.reason || 'Owner unavailable'
//           });
//           console.log('🚫 Unavailable:', dayDate);
          
//           blocks.push({
//             _id: slotId,
//             startDate: new Date(slot.fromDate || dayDate),
//             endDate: new Date(slot.toDate || dayDate),
//             startTime: parseTimeFromBackend(slot.fromTime),
//             endTime: parseTimeFromBackend(slot.toTime),
//             type: "NotAvailable",
//             isHistorical: isPast
//           });
//         }
//       });
//     });

//     setUnavailableDates(unavailable);
//     setBookedDates(booked);
//     setAvailabilityBlocks(blocks);

//     console.log('📊 Summary:', {
//       unavailable: unavailable.length,
//       booked: booked.length,
//       blocks: blocks.length
//     });
//   };

//   const safeCreateNotAvailability = async (payload: any) => {
//     try {
//       console.log('📤 Creating availability:', payload);
      
//       const urlencoded = new URLSearchParams();
//       Object.keys(payload).forEach(key => {
//         urlencoded.append(key, String(payload[key]));
//       });

//       const response = await fetch(
//         "http://3.110.122.127:3000/createNotAvailability",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: urlencoded,
//           redirect: "follow"
//         }
//       );

//       const result = await response.json();
//       console.log('📥 Create response:', result);
      
//       return result.success ? { success: true, data: result } : { success: false, message: result.message };
//     } catch (err: any) {
//       console.error('❌ Create failed:', err);
//       return { success: false, message: err.message || 'Create failed' };
//     }
//   };

//   const safeUpdateNotAvailability = async (notAvailabilityId: string, payload: any) => {
//   try {
//     console.log("📤 Updating availability:", notAvailabilityId, payload);

//     // Convert payload into x-www-form-urlencoded
//     const urlencoded = new URLSearchParams();
//     for (const key in payload) {
//       if (payload[key] !== undefined && payload[key] !== null) {
//         urlencoded.append(key, String(payload[key]));
//       }
//     }

//     const response = await fetch(
//       `http://3.110.122.127:3000/updateNotAvailability/${notAvailabilityId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: urlencoded,
//         redirect: "follow",
//       }
//     );

//     const result = await response.json();
//     console.log("📥 Update response:", result);

//     if (result.success) {
//       return { success: true, data: result };
//     }

//     return { success: false, message: result.message || "Update failed" };
//   } catch (err: any) {
//     console.error("❌ Update failed:", err);
//     return { success: false, message: err.message || "Update failed" };
//   }
// };


//   const safeDeleteNotAvailability = async (id: string) => {
//     try {
//       console.log('📤 Deleting availability:', id);
      
//       const response = await fetch(
//         `http://3.110.122.127:3000/deleteNotAvailability/${id}`,
//         { method: "DELETE", redirect: "follow" }
//       );

//       const result = await response.json();
//       console.log('📥 Delete response:', result);
      
//       return { success: true };
//     } catch (err: any) {
//       console.error('❌ Delete failed:', err);
//       return { success: false, message: err.message || 'Delete failed' };
//     }
//   };

//   // ============ CALENDAR LOGIC ============

//   const isDateUnavailable = (date: Date): boolean => {
//     const dateStr = formatDateForBackend(date);
    
//     const isBooked = bookedDates.some(bd => formatDateForBackend(bd) === dateStr);
//     if (isBooked) return true;
    
//     if (editMode && selectedSlotForEdit) {
//       const isInEditSlot = unavailableDates
//         .find(s => s.id === selectedSlotForEdit.id)
//         ?.dates.some(d => formatDateForBackend(d) === dateStr);
//       if (isInEditSlot) return false;
//     }
    
//     return unavailableDates.some(slot => 
//       slot.dates.some(d => formatDateForBackend(d) === dateStr)
//     );
//   };

//   const getUnavailableSlotForDate = (date: Date): UnavailableSlot | null => {
//     const normalized = new Date(date).setHours(0, 0, 0, 0);
    
//     return unavailableDates.find(slot => {
//       const from = new Date(slot.fromDate).setHours(0, 0, 0, 0);
//       const to = new Date(slot.toDate).setHours(0, 0, 0, 0);
//       return normalized >= from && normalized <= to;
//     }) || null;
//   };

//   const isDateSelected = (date: Date): boolean => {
//     if (!selectedStartDate) return false;
//     const dateStr = date.toDateString();
//     const startStr = selectedStartDate.toDateString();
//     if (!selectedEndDate) return dateStr === startStr;
    
//     const checkDate = new Date(date).setHours(0, 0, 0, 0);
//     const start = new Date(selectedStartDate).setHours(0, 0, 0, 0);
//     const end = new Date(selectedEndDate).setHours(0, 0, 0, 0);
//     return checkDate >= start && checkDate <= end;
//   };

//   const isDateInRange = (date: Date): boolean => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     const checkDate = new Date(date).setHours(0, 0, 0, 0);
//     const start = new Date(selectedStartDate).setHours(0, 0, 0, 0);
//     const end = new Date(selectedEndDate).setHours(0, 0, 0, 0);
//     return checkDate > start && checkDate < end;
//   };

//   const getDateStatus = (date: Date): 'past' | 'unavailable' | 'booked' | 'selected' | 'available' => {
//     if (isDateInPast(date)) return 'past';
//     if (isDateSelected(date)) return 'selected';
    
//     const dateStr = formatDateForBackend(date);
//     const isBooked = bookedDates.some(bd => formatDateForBackend(bd) === dateStr);
//     if (isBooked) return 'booked';
    
//     if (isDateUnavailable(date)) return 'unavailable';
//     return 'available';
//   };

//   const handleEdit = (block: AvailabilityBlock) => {
//     setSelectedStartDate(block.startDate);
//     setSelectedEndDate(block.endDate);
//     setStartTime(block.startTime);
//     setEndTime(block.endTime);
//     setEditMode(true);
//     setDeleteMode(false);
    
//     const slot = unavailableDates.find(s => s.id === block._id);
//     if (slot) {
//       setSelectedSlotForEdit(slot);
//     }
//   };

//   const deleteNotAvailability = async (blockId: string) => {
//     if (!window.confirm('Are you sure you want to delete this unavailable period?')) return;

//     setLoading(true);
//     try {
//       const response = await safeDeleteNotAvailability(blockId);
      
//       if (response.success) {
//         setSuccess('✅ Deleted successfully!');
//         setTimeout(() => setSuccess(null), 3000);
//         await fetchVehicleAvailability();
//       } else {
//         setError(response.message || 'Failed to delete');
//         setTimeout(() => setError(null), 3000);
//       }
//     } catch (err) {
//       console.error('Error deleting:', err);
//       setError('Failed to delete');
//       setTimeout(() => setError(null), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDateClick = (date: Date) => {
//     const isPast = isDateInPast(date);
//     const isUnavail = isDateUnavailable(date);

//     if (isPast) return;

//     if (userRole === "customer" && isUnavail) {
//       const slot = getUnavailableSlotForDate(date);
//       setError(slot ? `Unavailable: ${slot.reason}` : "This date is unavailable");
//       setTimeout(() => setError(null), 2000);
//       return;
//     }

//     if (userRole === "owner" && deleteMode && isUnavail) {
//       const slot = getUnavailableSlotForDate(date);
//       if (slot) {
//         handleDeleteSlot(slot);
//       }
//       return;
//     }

//     if (userRole === "owner" && editMode) {
//       if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
//         setSelectedStartDate(date);
//         setSelectedEndDate(null);
//       } else {
//         const from = date < selectedStartDate ? date : selectedStartDate;
//         const to = date < selectedStartDate ? selectedStartDate : date;
//         setSelectedStartDate(from);
//         setSelectedEndDate(to);
//       }
//       return;
//     }

//     if (userRole === "owner" && !editMode && !deleteMode && isUnavail) {
//       const slot = getUnavailableSlotForDate(date);
//       if (slot) {
//         setSelectedStartDate(new Date(slot.fromDate));
//         setSelectedEndDate(new Date(slot.toDate));
//         setSelectedSlotForEdit(slot);
//         setEditMode(true);
//         return;
//       }
//     }

//     if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
//       setSelectedStartDate(date);
//       setSelectedEndDate(null);
//     } else {
//       const from = date < selectedStartDate ? date : selectedStartDate;
//       const to = date < selectedStartDate ? selectedStartDate : date;
//       setSelectedStartDate(from);
//       setSelectedEndDate(to);
//     }
//   };

//   const handleEditIconPress = () => {
//     if (editMode && selectedStartDate && selectedEndDate) {
//       handleSaveEdit();
//     } else {
//       setEditMode(true);
//       setDeleteMode(false);
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       setSelectedSlotForEdit(null);
//     }
//   };

//   const handleSaveEdit = async () => {
//     if (!selectedStartDate || !selectedEndDate) {
//       setError('Please select both start and end dates');
//       setTimeout(() => setError(null), 3000);
//       return;
//     }

//     setLoading(true);

//     try {
//       const fromDateStr = formatDateForBackend(selectedStartDate);
//       const toDateStr = formatDateForBackend(selectedEndDate);
      
//       const payload = {
//         userId: userId,
//         VechileId: vehicleId,
//         vechileType: vehicleType,
//         fromDate: fromDateStr,
//         toDate: toDateStr,
//         fromTime: '12:00 AM',
//         toTime: '11:59 PM',
//         isNotAvailable: true,
//       };

//       let response;

//       if (selectedSlotForEdit?.id) {
//         response = await safeUpdateNotAvailability(selectedSlotForEdit.id, payload);
//       } else {
//         response = await safeCreateNotAvailability({
//           ...payload,
//           reason: 'Owner unavailable'
//         });
//       }

//       if (response.success) {
//         setSuccess(selectedSlotForEdit ? '✅ Updated successfully!' : '✅ Created successfully!');
//         setTimeout(() => setSuccess(null), 3000);
        
//         setEditMode(false);
//         setSelectedStartDate(null);
//         setSelectedEndDate(null);
//         setSelectedSlotForEdit(null);
        
//         await fetchVehicleAvailability();
//       } else {
//         setError(response.message || 'Failed to save changes');
//         setTimeout(() => setError(null), 3000);
//       }
//     } catch (err: any) {
//       console.error('Error saving:', err);
//       setError('Failed to save changes');
//       setTimeout(() => setError(null), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteIconPress = () => {
//     if (deleteMode) {
//       setDeleteMode(false);
//     } else {
//       setDeleteMode(true);
//       setEditMode(false);
//       setSelectedStartDate(null);
//       setSelectedEndDate(null);
//       setSelectedSlotForEdit(null);
//     }
//   };

//   const handleDeleteSlot = async (slot: UnavailableSlot) => {
//     if (!slot.id) {
//       setError('No slot ID found');
//       setTimeout(() => setError(null), 2000);
//       return;
//     }

//     if (!window.confirm(`Delete unavailable period from ${slot.fromDate} to ${slot.toDate}?`)) return;

//     setLoading(true);

//     try {
//       const response = await safeDeleteNotAvailability(slot.id);
      
//       if (response.success) {
//         setSuccess('✅ Deleted successfully!');
//         setTimeout(() => setSuccess(null), 3000);
//         setDeleteMode(false);
//         await fetchVehicleAvailability();
//       } else {
//         setError(response.message || 'Failed to delete');
//         setTimeout(() => setError(null), 3000);
//       }
//     } catch (err) {
//       console.error('Error deleting:', err);
//       setError('Failed to delete');
//       setTimeout(() => setError(null), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConfirm = async () => {
//     if (editMode) {
//       await handleSaveEdit();
//     } else {
//       if (userRole === "owner") {
//         await handleSaveEdit();
//       } else if (onBookingComplete && selectedStartDate && selectedEndDate) {
//         onBookingComplete(selectedStartDate, selectedEndDate);
//       }
//     }
//   };

//   const resetForm = () => {
//     setSelectedStartDate(null);
//     setSelectedEndDate(null);
//     setStartTime({ hour: 9, period: 'AM' });
//     setEndTime({ hour: 6, period: 'PM' });
//     setEditMode(false);
//     setDeleteMode(false);
//     setSelectedSlotForEdit(null);
//   };

//   // ============ CALENDAR RENDERING ============

//   const daysInMonth = (date: Date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysArray: (Date | null)[] = [];
    
//     const startPadding = firstDay.getDay();
//     for (let i = 0; i < startPadding; i++) {
//       daysArray.push(null);
//     }
    
//     for (let i = 1; i <= lastDay.getDate(); i++) {
//       daysArray.push(new Date(year, month, i));
//     }
    
//     return daysArray;
//   };

//   const generateTimeOptions = (): TimeSlot[] => {
//     const times: TimeSlot[] = [];
//     for (let i = 1; i <= 12; i++) {
//       times.push({ hour: i, period: 'AM' });
//     }
//     for (let i = 1; i <= 12; i++) {
//       times.push({ hour: i, period: 'PM' });
//     }
//     return times;
//   };

//   // ============ AUTO-SYNC ============

//   useEffect(() => {
//     if (!isOpen || !autoSync) return;

//     const interval = setInterval(() => {
//       fetchVehicleAvailability(true);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isOpen, autoSync, fetchVehicleAvailability]);

//   useEffect(() => {
//     if (isOpen && vehicleId) {
//       fetchVehicleAvailability();
//     }
//   }, [isOpen, vehicleId, fetchVehicleAvailability]);

//   // ============ RENDER ============

//   if (!isOpen) return null;

//   const days = daysInMonth(currentMonth);
//   const monthYear = currentMonth.toLocaleDateString('en-US', { 
//     month: 'long', 
//     year: 'numeric' 
//   });

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
//       <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto">
        
//         {/* Success Toast */}
//         {success && (
//           <div className="fixed top-4 right-4 z-[10000] bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
//             <Check className="w-6 h-6" />
//             <span className="font-medium">{success}</span>
//           </div>
//         )}

//         {/* Error Toast */}
//         {error && (
//           <div className="fixed top-4 right-4 z-[10000] bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
//             <AlertCircle className="w-6 h-6" />
//             <span className="font-medium">{error}</span>
//           </div>
//         )}

//         {/* Loading Overlay */}
//         {loading && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[10001]">
//             <div className="bg-white rounded-2xl p-8 shadow-2xl">
//               <Loader2 className="w-16 h-16 animate-spin text-[#001F67] mx-auto" />
//               <p className="mt-6 text-gray-700 font-semibold text-lg">Processing...</p>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#001F67] to-[#3474FF] text-white p-6 rounded-t-2xl">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
//                 <Calendar className="w-7 h-7" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold">
//                   {userRole === "owner" ? "Owner Calendar" : "Customer Booking"}
//                 </h1>
//                 <p className="text-white/80 text-sm mt-1">
//                   {userRole === "owner" 
//                     ? "Manage vehicle availability" 
//                     : "Select dates to book this vehicle"}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               {userRole === "owner" && (
//                 <div className="flex items-center gap-2 mr-3">
//                   {editMode && (
//                     <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
//                       Editing
//                     </span>
//                   )}
//                   {deleteMode && (
//                     <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
//                       Delete Mode
//                     </span>
//                   )}
//                 </div>
//               )}
//               <button
//                 onClick={() => fetchVehicleAvailability()}
//                 disabled={syncing}
//                 className="p-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-all backdrop-blur"
//                 title="Refresh calendar"
//               >
//                 <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
//               </button>
//               <button 
//                 onClick={onClose} 
//                 className="p-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-all backdrop-blur"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mode Banners */}
//         {editMode && userRole === "owner" && (
//           <div className="mx-6 mt-4 bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg">
//             <div className="flex items-center gap-2">
//               <Edit2 className="w-5 h-5 text-orange-600" />
//               <p className="text-sm text-orange-800 font-medium">
//                 Select dates to mark as not available. Click ✓ to save.
//               </p>
//             </div>
//           </div>
//         )}

//         {deleteMode && userRole === "owner" && (
//           <div className="mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
//             <div className="flex items-center gap-2">
//               <Trash2 className="w-5 h-5 text-red-600" />
//               <p className="text-sm text-red-800 font-medium">
//                 Click any unavailable date to delete it.
//               </p>
//             </div>
//           </div>
//         )}

//         {userRole === "customer" && (unavailableDates.length > 0 || bookedDates.length > 0) && (
//           <div className="mx-6 mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
//             <div className="flex items-center gap-2">
//               <AlertCircle className="w-5 h-5 text-blue-600" />
//               <p className="text-sm text-blue-800 font-medium">
//                 Red crossed dates are not available for booking
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
//             {/* Calendar Section */}
//             <div className="lg:col-span-2">
              
//               {/* Selected Dates Display */}
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
//                   <label className="block text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
//                     Start Date
//                   </label>
//                   <p className="text-lg font-bold text-gray-900">
//                     {selectedStartDate ? formatDateDisplay(selectedStartDate) : 'Select a date'}
//                   </p>
//                 </div>
//                 <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
//                   <label className="block text-xs font-semibold text-purple-600 mb-2 uppercase tracking-wide">
//                     End Date
//                   </label>
//                   <p className="text-lg font-bold text-gray-900">
//                     {selectedEndDate ? formatDateDisplay(selectedEndDate) : 'Select a date'}
//                   </p>
//                 </div>
//               </div>

//               {/* Month Navigation */}
//               <div className="flex items-center justify-between mb-6">
//                 <button
//                   onClick={() => {
//                     const prev = new Date(currentMonth);
//                     prev.setMonth(prev.getMonth() - 1);
//                     setCurrentMonth(prev);
//                   }}
//                   className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all shadow-sm"
//                 >
//                   <ChevronLeft className="w-5 h-5 text-gray-700" />
//                 </button>
//                 <h2 className="text-xl font-bold text-gray-900">{monthYear}</h2>
//                 <button
//                   onClick={() => {
//                     const next = new Date(currentMonth);
//                     next.setMonth(next.getMonth() + 1);
//                     setCurrentMonth(next);
//                   }}
//                   className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all shadow-sm"
//                 >
//                   <ChevronRight className="w-5 h-5 text-gray-700" />
//                 </button>
//               </div>

//               {/* Calendar Grid */}
//               <div className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-sm">
//                 {/* Day Headers */}
//                 <div className="grid grid-cols-7 gap-2 mb-3">
//                   {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//                     <div key={day} className="text-center font-bold text-sm text-gray-600 py-2">
//                       {day}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Calendar Days */}
//                 <div className="grid grid-cols-7 gap-2">
//                   {days.map((day, index) => {
//                     if (!day) return <div key={index} className="invisible" />;

//                     const status = getDateStatus(day);
//                     const selected = isDateSelected(day);
                         
//                     let bgClass = 'bg-white hover:bg-blue-50 border border-gray-200';
//                     let textClass = 'text-gray-900 font-semibold';
//                     let cursorClass = 'cursor-pointer';
//                     let overlayIcon = null;

//                     if (status === 'past') {
//                       bgClass = 'bg-gray-100 border border-gray-200';
//                       textClass = 'text-gray-400';
//                       cursorClass = 'cursor-not-allowed';
//                     } else if (status === 'booked') {
//                       bgClass = 'bg-orange-100 border-2 border-orange-400';
//                       textClass = 'text-orange-900 font-bold';
//                       overlayIcon = <Ban className="w-6 h-6 text-orange-600 absolute inset-0 m-auto" />;
//                       if (userRole === 'customer') cursorClass = 'cursor-not-allowed';
//                     } else if (status === 'unavailable') {
//                       bgClass = 'bg-red-100 border-2 border-red-400';
//                       textClass = 'text-red-900 font-bold';
//                       overlayIcon = <X className="w-6 h-6 text-red-600 absolute inset-0 m-auto" />;
//                       if (userRole === 'customer') cursorClass = 'cursor-not-allowed';
//                       if (deleteMode) {
//                         bgClass = 'bg-red-200 border-2 border-red-600';
//                         cursorClass = 'cursor-pointer hover:scale-105';
//                       }
//                     } else if (selected) {
//                       bgClass = 'bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-blue-700';
//                       textClass = 'text-white font-bold';
//                     } else if (isDateInRange(day)) {
//                       bgClass = 'bg-blue-100 border-2 border-blue-300';
//                       textClass = 'text-blue-900 font-bold';
//                     }

//                     return (
//                       <button
//                         key={index}
//                         onClick={() => handleDateClick(day)}
//                         disabled={status === 'past'}
//                         className={`
//                           relative h-14 rounded-xl transition-all shadow-sm
//                           ${bgClass} ${cursorClass}
//                           ${selected ? 'scale-105 shadow-lg' : ''}
//                           disabled:cursor-not-allowed
//                         `}
//                       >
//                         <span className={`relative z-10 ${textClass}`}>
//                           {day.getDate()}
//                         </span>
//                         {overlayIcon}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Owner Action Buttons */}
//               {userRole === "owner" && (
//                 <div className="flex gap-3 mt-6">
//                   <button
//                     onClick={handleEditIconPress}
//                     className={`
//                       flex-1 h-12 rounded-xl font-bold transition-all shadow-md
//                       ${editMode 
//                         ? 'bg-green-500 text-white hover:bg-green-600' 
//                         : 'bg-blue-500 text-white hover:bg-blue-600'}
//                     `}
//                   >
//                     {editMode ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <Check className="w-5 h-5" />
//                         Save Changes
//                       </span>
//                     ) : (
//                       <span className="flex items-center justify-center gap-2">
//                         <Edit2 className="w-5 h-5" />
//                         Edit Mode
//                       </span>
//                     )}
//                   </button>
//                   <button
//                     onClick={handleDeleteIconPress}
//                     className={`
//                       flex-1 h-12 rounded-xl font-bold transition-all shadow-md
//                       ${deleteMode 
//                         ? 'bg-gray-500 text-white hover:bg-gray-600' 
//                         : 'bg-red-500 text-white hover:bg-red-600'}
//                     `}
//                   >
//                     <span className="flex items-center justify-center gap-2">
//                       <Trash2 className="w-5 h-5" />
//                       {deleteMode ? 'Exit Delete' : 'Delete Mode'}
//                     </span>
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Time & Blocks Section */}
//             <div className="space-y-6">
              
//               {/* Time Selection */}
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Select Time</h3>
                
//                 <div className="grid grid-cols-2 gap-3">
//                   {/* Start Time */}
//                   <div className="relative">
//                     <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
//                       Start Time
//                     </label>
//                     <button
//                       onClick={() => {
//                         if (userRole === "owner") {
//                           setShowStartTime(!showStartTime);
//                           setShowEndTime(false);
//                         }
//                       }}
//                       disabled={userRole === "customer"}
//                       className="w-full h-12 border-2 border-gray-300 rounded-xl flex items-center justify-center bg-white hover:bg-blue-50 hover:border-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300"
//                     >
//                       <Clock className="w-4 h-4 mr-2 text-gray-600" />
//                       <span className="text-sm font-bold text-gray-900">{formatTime(startTime)}</span>
//                     </button>
//                     {showStartTime && userRole === "owner" && (
//                       <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-2xl max-h-56 overflow-y-auto z-20">
//                         {generateTimeOptions().map((time, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => {
//                               setStartTime(time);
//                               setShowStartTime(false);
//                             }}
//                             className="w-full px-4 py-3 text-sm text-left hover:bg-blue-50 font-medium text-gray-900 border-b last:border-b-0"
//                           >
//                             {formatTime(time)}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   {/* End Time */}
//                   <div className="relative">
//                     <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
//                       End Time
//                     </label>
//                     <button
//                       onClick={() => {
//                         if (userRole === "owner") {
//                           setShowEndTime(!showEndTime);
//                           setShowStartTime(false);
//                         }
//                       }}
//                       disabled={userRole === "customer"}
//                       className="w-full h-12 border-2 border-gray-300 rounded-xl flex items-center justify-center bg-white hover:bg-blue-50 hover:border-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300"
//                     >
//                       <Clock className="w-4 h-4 mr-2 text-gray-600" />
//                       <span className="text-sm font-bold text-gray-900">{formatTime(endTime)}</span>
//                     </button>
//                     {showEndTime && userRole === "owner" && (
//                       <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-2xl max-h-56 overflow-y-auto z-20">
//                         {generateTimeOptions().map((time, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => {
//                               setEndTime(time);
//                               setShowEndTime(false);
//                             }}
//                             className="w-full px-4 py-3 text-sm text-left hover:bg-blue-50 font-medium text-gray-900 border-b last:border-b-0"
//                           >
//                             {formatTime(time)}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Unavailability Blocks List */}
//               {userRole === "owner" && availabilityBlocks.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-4">
//                     Unavailable Periods ({availabilityBlocks.filter(b => !b.isHistorical).length})
//                   </h3>
//                   <div className="space-y-3 max-h-96 overflow-y-auto">
//                     {availabilityBlocks
//                       .filter(block => !block.isHistorical)
//                       .map((block) => (
//                         <div 
//                           key={block._id} 
//                           className={`
//                             ${block.type === 'Booked' 
//                               ? 'bg-orange-50 border-2 border-orange-300' 
//                               : 'bg-red-50 border-2 border-red-300'
//                             } rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow
//                           `}
//                         >
//                           <div className="flex items-start justify-between gap-3">
//                             <div className="flex-1 min-w-0">
                              
//                               {/* Dates */}
//                               <div className="flex items-center gap-2 text-sm text-gray-800 mb-2">
//                                 <Calendar
//                                   className={`w-4 h-4 flex-shrink-0 ${
//                                     block.type === "Booked" ? "text-orange-600" : "text-red-600"
//                                   }`}
//                                 />
//                                 <span className="font-bold truncate">
//                                   {formatDateDisplay(block.startDate)}
//                                 </span>
//                                 <span className="text-gray-400 font-bold">→</span>
//                                 <span className="font-bold truncate">
//                                   {formatDateDisplay(block.endDate)}
//                                 </span>
//                               </div>

//                               {/* Time */}
//                               <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
//                                 <Clock
//                                   className={`w-4 h-4 flex-shrink-0 ${
//                                     block.type === "Booked" ? "text-orange-600" : "text-red-600"
//                                   }`}
//                                 />
//                                 <span className="font-semibold">
//                                   {formatTime(block.startTime)} → {formatTime(block.endTime)}
//                                 </span>
//                               </div>

//                               {/* Type Badge */}
//                               <span
//                                 className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full ${
//                                   block.type === "Booked"
//                                     ? "bg-orange-200 text-orange-900"
//                                     : "bg-red-200 text-red-900"
//                                 }`}
//                               >
//                                 {block.type === "Booked" ? (
//                                   <>
//                                     <Clock className="w-3 h-3" />
//                                     Booked
//                                   </>
//                                 ) : (
//                                   <>
//                                     <Ban className="w-3 h-3" />
//                                     Not Available
//                                   </>
//                                 )}
//                               </span>
//                             </div>

//                             {/* Actions (Only for Not Available) */}
//                             {block.type !== "Booked" && (
//                               <div className="flex gap-2">
//                                 <button
//                                   onClick={() => handleEdit(block)}
//                                   className="p-2.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 hover:scale-105 transition-all shadow-sm"
//                                   title="Edit this period"
//                                 >
//                                   <Edit2 className="w-4 h-4" />
//                                 </button>
//                                 <button
//                                   onClick={() => deleteNotAvailability(block._id)}
//                                   className="p-2.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 hover:scale-105 transition-all shadow-sm"
//                                   title="Delete this period"
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               )}

//               {/* Info Box */}
//               <div className={`
//                 ${userRole === "owner" ? 'bg-blue-50 border-blue-300' : 'bg-purple-50 border-purple-300'}
//                 border-2 rounded-xl p-4 shadow-sm
//               `}>
//                 <div className="flex gap-3">
//                   <AlertCircle className={`
//                     w-6 h-6 flex-shrink-0 mt-0.5
//                     ${userRole === "owner" ? 'text-blue-600' : 'text-purple-600'}
//                   `} />
//                   <div className="text-sm">
//                     <p className={`font-bold mb-2 text-base ${
//                       userRole === "owner" ? 'text-blue-900' : 'text-purple-900'
//                     }`}>
//                       {userRole === "owner" ? "Owner Mode" : "Customer Mode"}
//                     </p>
//                     <p className={`text-xs leading-relaxed ${
//                       userRole === "owner" ? 'text-blue-800' : 'text-purple-800'
//                     }`}>
//                       {userRole === "owner" 
//                         ? "Block dates to prevent customer bookings. Booked periods (orange) cannot be edited or deleted. All changes sync live to customer calendars automatically."
//                         : "Red dates are owner-blocked. Orange dates are booked by others. Only available (white) dates can be selected. Your selection syncs in real-time."}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Auto-Sync Status */}
//               <div className="flex items-center justify-between text-xs bg-gray-50 rounded-lg p-3 border border-gray-200">
//                 <div className="flex items-center gap-2">
//                   <div className={`w-2.5 h-2.5 rounded-full ${
//                     syncing ? 'bg-blue-500 animate-pulse' : 'bg-green-500'
//                   }`}></div>
//                   <span className="font-semibold text-gray-700">
//                     {syncing ? 'Syncing...' : 'Live Sync Active'}
//                   </span>
//                   <span className="text-gray-500">
//                     • Last: {lastSyncTime.toLocaleTimeString()}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => setAutoSync(!autoSync)}
//                   className={`
//                     px-3 py-1.5 rounded-lg font-semibold transition-all
//                     ${autoSync 
//                       ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                       : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
//                   `}
//                 >
//                   {autoSync ? 'On' : 'Off'}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="mt-6">
//             {userRole === "owner" && (
//               <div className="flex gap-3">
//                 {editMode && (
//                   <button
//                     onClick={resetForm}
//                     className="flex-1 h-14 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 hover:scale-[1.02] transition-all shadow-md"
//                   >
//                     Cancel Edit
//                   </button>
//                 )}
//                 <button
//                   onClick={handleConfirm}
//                   disabled={!selectedStartDate || !selectedEndDate || loading}
//                   className="flex-1 h-14 bg-gradient-to-r from-[#001F67] to-[#3474FF] text-white rounded-xl font-bold hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                       Processing...
//                     </span>
//                   ) : editMode ? (
//                     'Update Unavailability'
//                   ) : (
//                     'Confirm Unavailability'
//                   )}
//                 </button>
//               </div>
//             )}

//             {userRole === "customer" && (
//               <button
//                 onClick={handleConfirm}
//                 disabled={!selectedStartDate || !selectedEndDate || loading}
//                 className="w-full h-14 bg-gradient-to-r from-[#001F67] to-[#3474FF] text-white rounded-xl font-bold hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                     Processing...
//                   </span>
//                 ) : (
//                   'Proceed to Booking'
//                 )}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AvailabilityDateTime;










import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  Check,
  AlertCircle,
  MoreVertical,
  RefreshCw,
} from "lucide-react";

interface VehicleAvailabilityCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  VechileId: string;
  vehicleType: "Car" | "Bike" | "Auto";
  userId: string;
}

interface NotAvailabilitySlot {
  _id?: string;
  id?: string;
  notAvailabilityId?: string;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  isNotAvailable: boolean;
  VechileId: string;
  vechileType: string;
  userId?: string;
  isCustomerBooking?: boolean;
}

const VehicleAvailabilityCalendar: React.FC<VehicleAvailabilityCalendarProps> = ({
  isOpen,
  onClose,
  VechileId,
  vehicleType,
  userId,
}) => {
  // STATE
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("18:00");
  const [blockedSlots, setBlockedSlots] = useState<NotAvailabilitySlot[]>([]);
  const [apiUnavailableDates, setApiUnavailableDates] = useState<string[]>([]);
  const [ownerBlockedDates, setOwnerBlockedDates] = useState<string[]>([]);
  const [customerBookedDates, setCustomerBookedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showDeleteListModal, setShowDeleteListModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState<any>(null);
  
  // NEW: Edit modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<NotAvailabilitySlot | null>(null);
  const [datesToRemove, setDatesToRemove] = useState<string[]>([]);
  const [editModalMonth, setEditModalMonth] = useState(new Date());

  // ============================
  // FORMATTERS
  // ============================

  const formatDateForAPI = (date: Date | null): string => {
    if (!date) return "";
    // ✅ FIX: Use local date components to avoid timezone shifts
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return "Select Date";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTimeForAPI = (time: string): string => {
    const [hours, minutes] = time.split(":");
    return `${parseInt(hours)}.${minutes}`;
  };

  // ============================
  // GET SLOT ID
  // ============================

  const getSlotId = (slot: NotAvailabilitySlot): string | null => {
    return slot._id || slot.id || slot.notAvailabilityId || null;
  };

  // ============================
  // 🔥 FETCH API UNAVAILABLE DATES (INCLUDES CUSTOMER BOOKINGS)
  // ============================

  const fetchVehicleAvailability = async () => {
    try {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📡 FETCHING VEHICLE AVAILABILITY (Owner Calendar)");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🚗 Vehicle ID:", VechileId);
      console.log("🏷️ Vehicle Type:", vehicleType);

      const url = `http://3.110.122.127:3000/getVehicleAvailability?vechileType=${vehicleType}&VechileId=${VechileId}`;

      const res = await fetch(url);
      const data = await res.json();

      console.log("✅ Raw API Response:", data);

      if (data.success && data.availability) {
        // All unavailable dates
        const unavailable = data.availability
          .filter((item: any) => item.status === "Unavailable")
          .map((item: any) => item.date);

        setApiUnavailableDates(unavailable);
        
        // Owner blocked dates (not customer bookings)
        const ownerBlocked = data.availability
          .filter((item: any) => item.status === "Unavailable" && !item.isCustomerBooking)
          .map((item: any) => item.date);
        
        setOwnerBlockedDates(ownerBlocked);
        
        // Customer booked dates
        const customerBooked = data.availability
          .filter((item: any) => item.status === "Unavailable" && item.isCustomerBooking === true)
          .map((item: any) => item.date);
        
        setCustomerBookedDates(customerBooked);

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📊 AVAILABILITY SUMMARY (Owner Calendar)");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🔒 Total Unavailable Dates:", unavailable.length);
        console.log("   All Unavailable:", unavailable);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("👤 Owner Blocked Dates:", ownerBlocked.length);
        console.log("   Owner Dates:", ownerBlocked);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🧑 Customer Booked Dates:", customerBooked.length);
        console.log("   Customer Dates:", customerBooked);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      }
    } catch (err) {
      console.error("❌ Failed to fetch availability", err);
    }
  };

  // ============================
  // STORAGE HELPERS
  // ============================

  const loadBlockedDatesFromStorage = () => {
    const stored = localStorage.getItem("blocked_slots_" + VechileId);
    if (stored) {
      setBlockedSlots(JSON.parse(stored));
    }
  };

  const saveBlockedDatesToStorage = (slots: any) => {
    localStorage.setItem("blocked_slots_" + VechileId, JSON.stringify(slots));
  };

  // ============================
  // DATE UTILITIES
  // ============================

  const isPastDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  const isCustomerBooked = (date: Date): boolean => {
    const formatted = formatDateForAPI(date);
    return customerBookedDates.includes(formatted);
  };

  const isOwnerBlocked = (date: Date): boolean => {
    const formatted = formatDateForAPI(date);
    return ownerBlockedDates.includes(formatted);
  };

  // MAIN BLOCKED CHECK
  const isDateBlocked = (date: Date): boolean => {
    const formatted = formatDateForAPI(date);

    // API unavailable dates (includes both owner blocked + customer booked)
    if (apiUnavailableDates.includes(formatted)) return true;

    // Your manually blocked ranges
    for (const slot of blockedSlots) {
      // ✅ FIX: Parse dates without timezone conversion
      const fromDateStr = slot.fromDate.split("T")[0];
      const toDateStr = slot.toDate.split("T")[0];
      
      const [fromYear, fromMonth, fromDay] = fromDateStr.split("-").map(Number);
      const [toYear, toMonth, toDay] = toDateStr.split("-").map(Number);
      
      const fromDate = new Date(fromYear, fromMonth - 1, fromDay);
      const toDate = new Date(toYear, toMonth - 1, toDay);

      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(0, 0, 0, 0);

      if (date >= fromDate && date <= toDate) return true;
    }

    return false;
  };

  const resetForm = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setShowOptionsMenu(false);
    setShowDeleteListModal(false);
    setIsEditMode(false);
    setEditingSlotId(null);
  };

  // ============================
  // NEW: GET ALL DATES IN RANGE
  // ============================

  const getAllDatesInRange = (fromDate: string, toDate: string): string[] => {
    const dates: string[] = [];
    // ✅ FIX: Parse dates without timezone conversion
    const [startYear, startMonth, startDay] = fromDate.split("T")[0].split("-").map(Number);
    const [endYear, endMonth, endDay] = toDate.split("T")[0].split("-").map(Number);
    
    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);
    
    const current = new Date(start);
    while (current <= end) {
      dates.push(formatDateForAPI(current));
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  };

  // ============================
  // USE EFFECT - AUTO REFRESH
  // ============================

  useEffect(() => {
    if (isOpen) {
      fetchVehicleAvailability();
      loadBlockedDatesFromStorage();

      // Auto-refresh every 30 seconds to see new customer bookings
      const interval = setInterval(() => {
        console.log("🔄 Auto-refresh: Loading owner calendar...");
        fetchVehicleAvailability();
      }, 30000);

      setRefreshInterval(interval);

      return () => {
        if (interval) clearInterval(interval);
      };
    } else {
      if (refreshInterval) clearInterval(refreshInterval);
      resetForm();
    }
  }, [isOpen]);

  // ============================
  // API CREATE BLOCKED SLOT
  // ============================

  const createBlockedDatesAPI = async (slotData: any) => {
    try {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📤 OWNER BLOCKING DATES");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📋 Slot Data:", slotData);

      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      const body = new URLSearchParams();
      body.append("userId", userId);
      body.append("vechileType", slotData.vehicleType);
      body.append("VechileId", slotData.VechileId);
      body.append("fromDate", slotData.fromDate);
      body.append("toDate", slotData.toDate);
      body.append("fromTime", slotData.fromTime);
      body.append("toTime", slotData.toTime);
      body.append("isNotAvailable", "true");
      body.append("bikeImages", "");
      body.append("isCustomerBooking", "false"); // 🔥 Mark as owner blocking

      console.log("📤 Request Body:", Object.fromEntries(body));

      const res = await fetch(
        "http://3.110.122.127:3000/createNotAvailability",
        { method: "POST", headers, body }
      );

      const result = await res.json();

      console.log("✅ API Response:", result);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🎉 OWNER DATES BLOCKED!");
      console.log("📅 From:", slotData.fromDate, "To:", slotData.toDate);
      console.log("🔒 These dates are now BLOCKED in:");
      console.log("   ✅ Owner Calendar");
      console.log("   ✅ All Customer Calendars");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      if (res.ok && result.data) return result.data;

      throw new Error(result.message || "Failed to create slot");
    } catch (e: any) {
      console.error("❌ API Error:", e);
      throw e;
    }
  };

  // ============================
  // API UPDATE BLOCKED SLOT
  // ============================

  const updateBlockedDatesAPI = async (slotId: string, slotData: any) => {
    try {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📤 OWNER UPDATING BLOCKED DATES");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🆔 Slot ID:", slotId);
      console.log("📋 New Data:", slotData);

      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      const body = new URLSearchParams();
      body.append("vechileType", slotData.vehicleType);
      body.append("VechileId", slotData.VechileId);
      body.append("fromDate", slotData.fromDate);
      body.append("toDate", slotData.toDate);
      body.append("fromTime", slotData.fromTime);
      body.append("toTime", slotData.toTime);
      body.append("isNotAvailable", "true");

      const res = await fetch(
        `http://3.110.122.127:3000/updateNotAvailability/${slotId}`,
        { method: "PUT", headers, body }
      );

      const result = await res.json();

      console.log("✅ Update Response:", result);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      if (res.ok) return result.data || result;

      throw new Error(result.message || "Failed to update slot");
    } catch (e: any) {
      console.error("❌ UPDATE API Error:", e);
      throw e;
    }
  };

  // ============================
  // API DELETE BLOCKED SLOT
  // ============================

  const deleteBlockedDateAPI = async (slotId: string) => {
    try {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🗑️ OWNER DELETING BLOCKED DATES");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🆔 Slot ID:", slotId);

      const urlencoded = new URLSearchParams();

      const res = await fetch(
        `http://3.110.122.127:3000/deleteNotAvailability/${slotId}`,
        {
          method: "DELETE",
          body: urlencoded,
        }
      );

      const result = await res.text();

      console.log("✅ Delete Response:", result);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      if (res.ok) return result;

      throw new Error("Failed to delete slot");
    } catch (e: any) {
      console.error("❌ DELETE API Error:", e);
      throw e;
    }
  };

  // ============================
  // NEW: HANDLE EDIT WITH MODAL
  // ============================

  const handleEdit = (slot: NotAvailabilitySlot) => {
    const slotId = getSlotId(slot);
    if (!slotId) {
      showMessage("error", "Cannot edit: slot ID not found");
      return;
    }

    // 🔥 Check if this is a customer booking - owner cannot edit
    if (slot.isCustomerBooking) {
      console.log("🚫 Attempted to edit customer booking:", slot);
      showMessage("error", "❌ Cannot edit customer bookings! Customers must cancel their own bookings.");
      return;
    }

    console.log("✏️ Opening edit modal for slot:", slotId);
    
    setEditingSlot(slot);
    setEditingSlotId(slotId);
    setDatesToRemove([]);
    
    // ✅ FIX: Set edit modal to show the month of the slot's start date without timezone conversion
    const slotStartDateStr = slot.fromDate.split("T")[0];
    const [year, month, day] = slotStartDateStr.split("-").map(Number);
    const slotStartDate = new Date(year, month - 1, day);
    setEditModalMonth(slotStartDate);
    
    setShowEditModal(true);
    setShowOptionsMenu(false);
    setShowDeleteListModal(false);
  };

  // ============================
  // NEW: TOGGLE DATE REMOVAL IN EDIT MODAL
  // ============================

  const toggleDateRemoval = (dateStr: string) => {
    if (datesToRemove.includes(dateStr)) {
      setDatesToRemove(datesToRemove.filter(d => d !== dateStr));
    } else {
      setDatesToRemove([...datesToRemove, dateStr]);
    }
  };

  // ============================
  // NEW: PROCESS EDIT WITH RANGE SPLITTING
  // ============================

  const handleConfirmEdit = async () => {
    if (!editingSlot || !editingSlotId) {
      showMessage("error", "No slot selected for editing");
      return;
    }

    if (datesToRemove.length === 0) {
      showMessage("error", "Please select at least one date to remove");
      return;
    }

    setLoading(true);

    try {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("✂️ SPLITTING DATE RANGE");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      
      // Get all dates in the original range
      const allDates = getAllDatesInRange(editingSlot.fromDate, editingSlot.toDate);
      console.log("📅 Original range dates:", allDates);
      console.log("🗑️ Dates to remove:", datesToRemove);
      
      // Remove selected dates
      const remainingDates = allDates.filter(d => !datesToRemove.includes(d));
      console.log("✅ Remaining dates:", remainingDates);
      
      if (remainingDates.length === 0) {
        // All dates removed - just delete the slot
        console.log("🗑️ All dates removed - deleting entire slot");
        await deleteBlockedDateAPI(editingSlotId);
        
        const filtered = blockedSlots.filter((s) => getSlotId(s) !== editingSlotId);
        setBlockedSlots(filtered);
        saveBlockedDatesToStorage(filtered);
        
        await fetchVehicleAvailability();
        
        showMessage("success", "✅ All dates removed - slot deleted!");
        setShowEditModal(false);
        setEditingSlot(null);
        setEditingSlotId(null);
        setDatesToRemove([]);
        return;
      }
      
      // Find continuous date ranges in remaining dates
      const ranges: { from: string; to: string }[] = [];
      let rangeStart = remainingDates[0];
      let rangeEnd = remainingDates[0];
      
      for (let i = 1; i < remainingDates.length; i++) {
        // ✅ FIX: Parse dates without timezone conversion
        const [currYear, currMonth, currDay] = remainingDates[i].split("-").map(Number);
        const [prevYear, prevMonth, prevDay] = remainingDates[i - 1].split("-").map(Number);
        
        const currentDate = new Date(currYear, currMonth - 1, currDay);
        const previousDate = new Date(prevYear, prevMonth - 1, prevDay);
        
        // Check if dates are consecutive
        const diffDays = Math.round((currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          // Continue current range
          rangeEnd = remainingDates[i];
        } else {
          // Start new range
          ranges.push({ from: rangeStart, to: rangeEnd });
          rangeStart = remainingDates[i];
          rangeEnd = remainingDates[i];
        }
      }
      
      // Add the last range
      ranges.push({ from: rangeStart, to: rangeEnd });
      
      console.log("📊 Split into", ranges.length, "range(s):", ranges);
      
      // Delete the original slot
      console.log("🗑️ Deleting original slot:", editingSlotId);
      await deleteBlockedDateAPI(editingSlotId);
      
      // Create new slots for each range
      const newSlots: NotAvailabilitySlot[] = [];
      
      for (const range of ranges) {
        console.log("➕ Creating new range:", range);
        
        const payload = {
          vehicleType,
          VechileId,
          fromDate: range.from,
          toDate: range.to,
          fromTime: editingSlot.fromTime,
          toTime: editingSlot.toTime,
        };
        
        const apiResponse = await createBlockedDatesAPI(payload);
        
        newSlots.push({
          _id: apiResponse._id,
          fromDate: apiResponse.fromDate,
          toDate: apiResponse.toDate,
          fromTime: apiResponse.fromTime,
          toTime: apiResponse.toTime,
          isNotAvailable: apiResponse.isNotAvailable,
          VechileId: apiResponse.VechileId,
          vechileType: apiResponse.vechileType,
          isCustomerBooking: false,
        });
      }
      
      // Update local state
      const filtered = blockedSlots.filter((s) => getSlotId(s) !== editingSlotId);
      const updated = [...filtered, ...newSlots];
      setBlockedSlots(updated);
      saveBlockedDatesToStorage(updated);
      
      await fetchVehicleAvailability();
      
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🎉 RANGE SPLIT COMPLETE!");
      console.log("✅ Created", newSlots.length, "new range(s)");
      console.log("📅 Removed dates are now available for customers");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      
      showMessage("success", `✅ Dates updated! Split into ${ranges.length} range(s). Removed dates are now available for customers.`);
      
      setShowEditModal(false);
      setEditingSlot(null);
      setEditingSlotId(null);
      setDatesToRemove([]);
      
    } catch (e: any) {
      console.error("❌ Edit failed:", e);
      showMessage("error", e.message || "Failed to update dates");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // HANDLE DELETE
  // ============================

  const handleDelete = async (slot: NotAvailabilitySlot) => {
    const slotId = getSlotId(slot);
    if (!slotId) {
      showMessage("error", "Cannot delete: slot ID not found");
      return;
    }

    // 🔥 Check if this is a customer booking - owner cannot delete
    if (slot.isCustomerBooking) {
      console.log("🚫 Attempted to delete customer booking:", slot);
      showMessage("error", "❌ Cannot delete customer bookings! Customers must cancel their own bookings.");
      return;
    }

    if (!confirm("Are you sure you want to delete this blocked date range?")) {
      return;
    }

    setLoading(true);

    try {
      console.log("🗑️ Deleting owner blocked slot:", slotId);
      await deleteBlockedDateAPI(slotId);

      const filtered = blockedSlots.filter((s) => getSlotId(s) !== slotId);
      setBlockedSlots(filtered);
      saveBlockedDatesToStorage(filtered);

      await fetchVehicleAvailability();

      showMessage("success", "✅ Blocked dates deleted successfully!");
      setShowOptionsMenu(false);
      setShowDeleteListModal(false);
    } catch (e: any) {
      showMessage("error", e.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // HANDLE DATE CLICK
  // ============================

  const handleDateClick = (date: Date) => {
    if (isPastDate(date)) return;

    const blocked = isDateBlocked(date);
    const customerBooked = isCustomerBooked(date);

    // 🔥 Owner cannot select customer booked dates
    if (customerBooked) {
      console.log("🚫 Owner attempted to select customer booked date:", formatDateForAPI(date));
      showMessage("error", "❌ This date is booked by a customer. Cannot modify.");
      return;
    }

    if (isEditMode && blocked) {
      const filtered = blockedSlots.filter((slot) => {
        const from = new Date(slot.fromDate.split("T")[0]);
        const to = new Date(slot.toDate.split("T")[0]);
        return !(date >= from && date <= to);
      });

      setBlockedSlots(filtered);
      saveBlockedDatesToStorage(filtered);
      showMessage("success", "Blocked date removed.");
      return;
    }

    if (blocked && !editingSlotId) {
      if (customerBooked) {
        showMessage("error", "This date is booked by a customer.");
      } else {
        showMessage("error", "This date is already blocked by you.");
      }
      return;
    }

    if (!selectedStartDate) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      return;
    }

    if (!selectedEndDate) {
      if (date < selectedStartDate) {
        showMessage("error", "End date cannot be before start date");
        return;
      }
      setSelectedEndDate(date);
      return;
    }

    setSelectedStartDate(date);
    setSelectedEndDate(null);
  };

  // ============================
  // SAVE NEW BLOCKED DATES OR UPDATE
  // ============================

  const handleConfirmAndSave = async () => {
    if (!selectedStartDate || !selectedEndDate) {
      showMessage("error", "Please select both start and end dates.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        vehicleType,
        VechileId,
        fromDate: formatDateForAPI(selectedStartDate),
        toDate: formatDateForAPI(selectedEndDate),
        fromTime: formatTimeForAPI(startTime),
        toTime: formatTimeForAPI(endTime),
      };

      if (editingSlotId) {
        // UPDATE EXISTING SLOT
        const apiResponse = await updateBlockedDatesAPI(editingSlotId, payload);

        const updatedSlots = blockedSlots.map((slot) => {
          if (getSlotId(slot) === editingSlotId) {
            return {
              ...slot,
              fromDate: apiResponse.fromDate || payload.fromDate,
              toDate: apiResponse.toDate || payload.toDate,
              fromTime: apiResponse.fromTime || payload.fromTime,
              toTime: apiResponse.toTime || payload.toTime,
            };
          }
          return slot;
        });

        setBlockedSlots(updatedSlots);
        saveBlockedDatesToStorage(updatedSlots);
        await fetchVehicleAvailability();

        showMessage("success", "✅ Dates updated successfully!");
        resetForm();
      } else {
        // CREATE NEW SLOT
        const apiResponse = await createBlockedDatesAPI(payload);

        const newSlot: NotAvailabilitySlot = {
          _id: apiResponse._id,
          fromDate: apiResponse.fromDate,
          toDate: apiResponse.toDate,
          fromTime: apiResponse.fromTime,
          toTime: apiResponse.toTime,
          isNotAvailable: apiResponse.isNotAvailable,
          VechileId: apiResponse.VechileId,
          vechileType: apiResponse.vechileType,
          isCustomerBooking: false,
        };

        const updated = [...blockedSlots, newSlot];
        setBlockedSlots(updated);
        saveBlockedDatesToStorage(updated);
        await fetchVehicleAvailability();

        showMessage("success", "✅ Dates blocked successfully! Now visible in all customer calendars.");
        resetForm();
      }
    } catch (e: any) {
      showMessage("error", e.message || "Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // MANUAL REFRESH BUTTON
  // ============================

  const handleManualRefresh = async () => {
    console.log("🔄 Manual refresh triggered by owner");
    setLoading(true);
    await fetchVehicleAvailability();
    setLoading(false);
    showMessage("success", "✅ Availability refreshed!");
  };

  // ============================
  // UI HELPERS
  // ============================

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  // ============================
  // CALENDAR UI GENERATION
  // ============================

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const renderCalendarDays = () => {
    const days: JSX.Element[] = [];
    const offset = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < offset; i++) days.push(<div key={"empty-"+i} />);

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        d
      );

      const past = isPastDate(date);
      const blocked = isDateBlocked(date);
      const customerBooked = isCustomerBooked(date);
      const ownerBlocked = isOwnerBlocked(date);
      const selected =
        selectedStartDate?.getTime() === date.getTime() ||
        selectedEndDate?.getTime() === date.getTime();

      let className =
        "h-12 rounded-lg transition relative font-medium flex items-center justify-center ";

      if (past) {
        className += "bg-gray-100 text-gray-400 cursor-not-allowed";
      } else if (customerBooked) {
        // 🔥 Customer booked dates - orange/yellow color with badge
        className += "bg-orange-100 border-2 border-orange-500 text-orange-700 relative cursor-not-allowed";
      } else if (ownerBlocked) {
        // 🔥 Owner blocked dates - red color
        className += "bg-red-100 border-2 border-red-500 text-red-700 relative hover:bg-red-200";
      } else if (blocked) {
        // Generic blocked
        className += "bg-red-100 border-2 border-red-500 text-red-700 relative hover:bg-red-200";
      } else if (selected) {
        className += "bg-black text-white border-2 border-black";
      } else {
        className += "bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white hover:opacity-90";
      }

      days.push(
        <button
          key={d}
          className={className}
          disabled={past || customerBooked}
          onClick={() => handleDateClick(date)}
          title={
            customerBooked 
              ? "Customer Booking (Cannot Edit)" 
              : ownerBlocked 
                ? "Your Blocked Date" 
                : blocked
                  ? "Blocked"
                  : "Available"
          }
        >
          {d}
          {customerBooked && (
            <>
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 40 40"
              >
                <circle cx="20" cy="20" r="15" fill="none" stroke="#f97316" strokeWidth="2" />
                <text x="20" y="24" textAnchor="middle" fill="#f97316" fontSize="16" fontWeight="bold">
                  C
                </text>
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white" />
            </>
          )}
          {ownerBlocked && (
            <>
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 40 40"
              >
                <line
                  x1="6"
                  y1="6"
                  x2="34"
                  y2="34"
                  stroke="#dc2626"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="34"
                  y1="6"
                  x2="6"
                  y2="34"
                  stroke="#dc2626"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </>
          )}
        </button>
      );
    }

    return days;
  };

  // ============================
  // NEW: EDIT MODAL CALENDAR
  // ============================

  const renderEditModalCalendar = () => {
    if (!editingSlot) return null;

    const allDates = getAllDatesInRange(editingSlot.fromDate, editingSlot.toDate);
    
    const editMonthName = editModalMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const daysInEditMonth = new Date(
      editModalMonth.getFullYear(),
      editModalMonth.getMonth() + 1,
      0
    ).getDate();

    const firstDayEdit = new Date(
      editModalMonth.getFullYear(),
      editModalMonth.getMonth(),
      1
    ).getDay();

    const days: JSX.Element[] = [];
    const offset = firstDayEdit === 0 ? 6 : firstDayEdit - 1;

    for (let i = 0; i < offset; i++) days.push(<div key={"empty-edit-"+i} />);

    for (let d = 1; d <= daysInEditMonth; d++) {
      const date = new Date(
        editModalMonth.getFullYear(),
        editModalMonth.getMonth(),
        d
      );
      
      const dateStr = formatDateForAPI(date);
      const isInRange = allDates.includes(dateStr);
      const isMarkedForRemoval = datesToRemove.includes(dateStr);
      
      let className = "h-12 rounded-lg transition relative font-medium flex items-center justify-center ";
      
      if (!isInRange) {
        className += "bg-gray-100 text-gray-400 cursor-not-allowed";
      } else if (isMarkedForRemoval) {
        className += "bg-green-500 text-white border-2 border-green-600 cursor-pointer hover:bg-green-600";
      } else {
        className += "bg-red-100 border-2 border-red-500 text-red-700 cursor-pointer hover:bg-red-200";
      }

      days.push(
        <button
          key={d}
          className={className}
          disabled={!isInRange}
          onClick={() => isInRange && toggleDateRemoval(dateStr)}
          title={
            !isInRange 
              ? "Not in range" 
              : isMarkedForRemoval 
                ? "Click to keep (will remain blocked)" 
                : "Click to remove (will become available)"
          }
        >
          {d}
          {isMarkedForRemoval && (
            <Check className="absolute top-1 right-1" size={16} />
          )}
        </button>
      );
    }

    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <button onClick={() =>
            setEditModalMonth(
              new Date(
                editModalMonth.getFullYear(),
                editModalMonth.getMonth() - 1
              )
            )
          }>
            <ChevronLeft />
          </button>

          <h3 className="text-xl font-bold">{editMonthName}</h3>

          <button onClick={() =>
            setEditModalMonth(
              new Date(
                editModalMonth.getFullYear(),
                editModalMonth.getMonth() + 1
              )
            )
          }>
            <ChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="text-center font-bold text-gray-600 text-sm">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">{days}</div>
      </div>
    );
  };

  const generateTimeOptions = () => {
    const arr = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hh = String(h).padStart(2, "0");
        const mm = String(m).padStart(2, "0");
        arr.push({
          value: `${hh}:${mm}`,
          label: `${h % 12 || 12}:${mm} ${h >= 12 ? "PM" : "AM"}`,
        });
      }
    }
    return arr;
  };

  const timeOptions = generateTimeOptions();

  // ============================
  // JSX
  // ============================

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-6xl rounded-2xl p-6 overflow-y-auto max-h-[90vh] shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Calendar className="mr-2 text-blue-600" />
            Manage Vehicle Availability
          </h2>

          <div className="flex items-center gap-3">
            {/* REFRESH BUTTON */}
            <button
              onClick={handleManualRefresh}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-semibold flex items-center gap-2"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              {loading ? "Refreshing..." : "Refresh"}
            </button>

            {/* THREE DOTS MENU */}
            <div className="relative">
              <button
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <MoreVertical size={24} />
              </button>

              {showOptionsMenu && (
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg border border-gray-200 w-40 z-50">
                  <button
                    onClick={() => {
                      setShowDeleteListModal(true);
                      setShowOptionsMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteListModal(true);
                      setShowOptionsMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-2 text-red-600"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              )}
            </div>

            <button onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* MESSAGES */}
        {message.text && (
          <div
            className={`p-4 rounded-lg mb-4 ${
              message.type === "error"
                ? "bg-red-100 text-red-800"
                : message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          {/* CALENDAR */}
          <div className="col-span-2">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1
                  )
                )
              }>
                <ChevronLeft />
              </button>

              <h3 className="text-xl font-bold">{monthName}</h3>

              <button onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1
                  )
                )
              }>
                <ChevronRight />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="text-center font-bold text-gray-600">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>

            {/* LEGEND */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold mb-2 text-sm">Legend:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 border-2 border-red-500 rounded"></div>
                  <span>Your Blocked Dates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-100 border-2 border-orange-500 rounded"></div>
                  <span>Customer Bookings</span>
                </div>
              </div>
            </div>
          </div>

          {/* TIME + CONFIRM */}
          <div>
            <label className="font-semibold">Start Time</label>
            <select
              className="w-full p-2 border rounded mb-3"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            >
              {timeOptions.map((t) => (
                <option value={t.value} key={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            <label className="font-semibold">End Time</label>
            <select
              className="w-full p-2 border rounded mb-4"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            >
              {timeOptions.map((t) => (
                <option value={t.value} key={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            <button
              onClick={handleConfirmAndSave}
              disabled={!selectedStartDate || !selectedEndDate || loading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : editingSlotId ? "Update Dates" : "Confirm & Block Dates"}
            </button>

            {editingSlotId && (
              <button
                onClick={resetForm}
                className="w-full mt-2 bg-gray-200 text-gray-700 p-3 rounded-lg font-semibold"
              >
                Cancel Edit
              </button>
            )}

            {/* INFO BOX */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>📌 Note:</strong> Customer booked dates (orange) cannot be edited or deleted by owner. Customers must cancel their own bookings. Auto-refreshes every 30 seconds.
              </p>
            </div>
          </div>
        </div>

        {/* BLOCKED SUMMARY */}
        {(blockedSlots.length > 0 || customerBookedDates.length > 0 || ownerBlockedDates.length > 0) && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="font-bold text-red-800">
                {ownerBlockedDates.length} Your Blocked Dates
              </p>
              <p className="text-xs text-red-600 mt-1">Can edit/delete</p>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="font-bold text-orange-800">
                {customerBookedDates.length} Customer Bookings
              </p>
              <p className="text-xs text-orange-600 mt-1">Cannot edit/delete</p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-bold text-green-800">
                {apiUnavailableDates.length} Total Blocked
              </p>
              <p className="text-xs text-green-600 mt-1">Owner + Customer</p>
            </div>
          </div>
        )}

        {/* EDIT/DELETE LIST MODAL */}
        {showDeleteListModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[70vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Manage Blocked Dates</h3>
                <button onClick={() => setShowDeleteListModal(false)}>
                  <X size={24} />
                </button>
              </div>

              {blockedSlots.length === 0 ? (
                <p className="text-gray-500">No blocked dates available.</p>
              ) : (
                <div className="space-y-3">
                  {blockedSlots.map((slot, idx) => {
                    const isCustomerBooking = slot.isCustomerBooking;
                    
                    // ✅ FIX: Parse dates without timezone conversion
                    const fromDateStr = slot.fromDate.split("T")[0];
                    const toDateStr = slot.toDate.split("T")[0];
                    const [fromYear, fromMonth, fromDay] = fromDateStr.split("-").map(Number);
                    const [toYear, toMonth, toDay] = toDateStr.split("-").map(Number);
                    const fromDate = new Date(fromYear, fromMonth - 1, fromDay);
                    const toDate = new Date(toYear, toMonth - 1, toDay);
                    
                    return (
                      <div
                        key={idx}
                        className={`border rounded-lg p-4 flex justify-between items-center ${
                          isCustomerBooking 
                            ? 'border-orange-300 bg-orange-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div>
                          <p className="font-semibold">
                            {formatDateForDisplay(fromDate)} - {formatDateForDisplay(toDate)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Time: {slot.fromTime} - {slot.toTime}
                          </p>
                          {isCustomerBooking && (
                            <p className="text-xs text-orange-600 font-semibold mt-1">
                              🧑 Customer Booking (Cannot Edit/Delete)
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {!isCustomerBooking ? (
                            <>
                              <button
                                onClick={() => handleEdit(slot)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                              >
                                <Edit2 size={16} />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(slot)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                              >
                                <Trash2 size={16} />
                                Delete
                              </button>
                            </>
                          ) : (
                            <div className="px-4 py-2 bg-orange-200 text-orange-800 rounded-lg text-sm font-semibold">
                              Customer Booking
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* NEW: EDIT MODAL WITH DATE SELECTION */}
        {showEditModal && editingSlot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold">Edit Blocked Dates</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Select dates to remove from blocking. Click dates to toggle.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingSlot(null);
                    setEditingSlotId(null);
                    setDatesToRemove([]);
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Current Range Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="font-semibold text-blue-900 mb-2">Current Blocked Range:</p>
                <p className="text-blue-800">
                  <strong>{formatDateForDisplay((() => {
                    const dateStr = editingSlot.fromDate.split("T")[0];
                    const [year, month, day] = dateStr.split("-").map(Number);
                    return new Date(year, month - 1, day);
                  })())}</strong>
                  {" → "}
                  <strong>{formatDateForDisplay((() => {
                    const dateStr = editingSlot.toDate.split("T")[0];
                    const [year, month, day] = dateStr.split("-").map(Number);
                    return new Date(year, month - 1, day);
                  })())}</strong>
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Time: {editingSlot.fromTime} - {editingSlot.toTime}
                </p>
              </div>

              {/* Calendar for date selection */}
              <div className="mb-6">
                {renderEditModalCalendar()}
              </div>

              {/* Legend */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="font-semibold mb-3 text-sm">How to use:</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-100 border-2 border-red-500 rounded flex-shrink-0"></div>
                    <span><strong>Red dates:</strong> Currently blocked. Click to mark for removal.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded flex-shrink-0 flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                    <span><strong>Green dates with ✓:</strong> Marked for removal (will become available for customers).</span>
                  </div>
                </div>
              </div>

              {/* Selected dates info */}
              {datesToRemove.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-green-900 mb-2">
                    {datesToRemove.length} date(s) selected for removal:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {datesToRemove.sort().map(dateStr => {
                      // ✅ FIX: Parse date without timezone conversion
                      const [year, month, day] = dateStr.split("-").map(Number);
                      const date = new Date(year, month - 1, day);
                      
                      return (
                        <span 
                          key={dateStr}
                          className="px-2 py-1 bg-green-200 text-green-800 rounded text-xs font-medium"
                        >
                          {formatDateForDisplay(date)}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleConfirmEdit}
                  disabled={datesToRemove.length === 0 || loading}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? "Processing..." : `Remove ${datesToRemove.length} Date(s) & Update`}
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingSlot(null);
                    setEditingSlotId(null);
                    setDatesToRemove([]);
                  }}
                  disabled={loading}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50 transition"
                >
                  Cancel
                </button>
              </div>

              {/* Info Alert */}
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  <strong>⚠️ Important:</strong> If you remove dates from the middle of a range, it will be split into multiple ranges. Removed dates will immediately become available for customer bookings.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleAvailabilityCalendar;
 