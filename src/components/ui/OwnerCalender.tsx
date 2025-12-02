import React, { useState, useEffect } from "react";
import { X, Calendar, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface OwnerCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
  VechileId: string;
  vechileType: string;
  userId: string;
}

interface BlockedRecord {
  id: string;
  from: string;
  to: string;
  fromTime: string;
  toTime: string;
  date?: string;
  availabilityId?: string;
  _id?: string;
}

const API_BASE = "http://3.110.122.127:3000";

export default function OwnerCalendar({
  isOpen,
  onClose,
  userRole,
  VechileId,
  vechileType,
  userId,
}: OwnerCalendarProps) {
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showBlockedDates, setShowBlockedDates] = useState(false);
  const [loading, setLoading] = useState(false);

  // Data from API
  const [ownerBlockedDates, setOwnerBlockedDates] = useState<string[]>([]);
  const [customerBookedDates, setCustomerBookedDates] = useState<string[]>([]);
  const [blockedRecords, setBlockedRecords] = useState<BlockedRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<BlockedRecord | null>(null);
  const [clickedBlockRecord, setClickedBlockRecord] = useState<BlockedRecord | null>(null);

  // Fetch data on mount
  useEffect(() => {
    if (isOpen) {
      fetchNotAvailability();
      fetchBookings();
    }
  }, [isOpen, currentMonth]);

  const fetchNotAvailability = async () => {
    try {
      setLoading(true);
      const startDate = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1));
      const endDate = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0));

      const response = await fetch(
        `${API_BASE}/getVehicleAvailability?VechileId=${VechileId}&vechileType=${vechileType}&startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();

      console.log("API Response:", data); // Debug log

      if (data && Array.isArray(data.availability)) {
        const dates: string[] = [];
        const records: BlockedRecord[] = [];

        data.availability.forEach((item: any) => {
          console.log("Processing item:", item); // Debug log

          if (item.status !== "Available") {
            dates.push(item.date);
            records.push({
              id: item.id || item._id || item.availabilityId || item.date,
              from: item.date,
              to: item.date,
              fromTime: item.slots?.[0]?.fromTime ?? "00:00",
              toTime: item.slots?.[0]?.toTime ?? "23:59",
            });
          }
        });

        console.log("Blocked Records:", records); // Debug log
        setOwnerBlockedDates(dates);
        setBlockedRecords(records);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
      showMsg("error", "Failed to load availability");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const bookingId = localStorage.getItem("bookingId");
      if (!bookingId) return;

      const response = await fetch(`${API_BASE}/getBookingById/${bookingId}`);
      const data = await response.json();

      if (data && data.booking) {
        const dates: string[] = [];
        data.booking.forEach((item: any) => {
          const from = new Date(item.from);
          const to = new Date(item.to);
          const curr = new Date(from);

          while (curr <= to) {
            dates.push(formatDate(curr));
            curr.setDate(curr.getDate() + 1);
          }
        });

        setCustomerBookedDates(dates);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatDisplay = (date: Date | null): string => {
    if (!date) return "Select";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const showMsg = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const isPast = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isCustomerBooked = (date: Date): boolean => {
    const d = formatDate(date);
    return customerBookedDates.includes(d);
  };

  const isOwnerBlocked = (date: Date): boolean => {
    const d = formatDate(date);
    // If we are editing a record, allow its own dates to be selected (not blocked)
    if (selectedRecord) {
      if (d >= selectedRecord.from && d <= selectedRecord.to) {
        return false;
      }
    }
    return ownerBlockedDates.includes(d);
  };

  const handleDateClick = (date: Date) => {
    if (isPast(date)) return;

    if (isCustomerBooked(date)) {
      showMsg("error", "Cannot modify customer bookings");
      return;
    }

    if (isOwnerBlocked(date)) {
      const d = formatDate(date);
      const record = blockedRecords.find(r => d >= r.from && d <= r.to);
      if (record) {
        setClickedBlockRecord(record);
      }
      return;
    }

    if (!selectedStart) {
      setSelectedStart(date);
      setSelectedEnd(null);
      setSelectedRecord(null);
    } else if (!selectedEnd) {
      if (date < selectedStart) {
        showMsg("error", "End date must be after start");
        return;
      }
      setSelectedEnd(date);
    } else {
      setSelectedStart(date);
      setSelectedEnd(null);
      setSelectedRecord(null);
    }
  };

  const handleCreateBlock = async () => {
    if (!selectedStart || !selectedEnd) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/createNotAvailability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          fromDate: formatDate(selectedStart) + "T00:00:00.000Z",
          toDate: formatDate(selectedEnd) + "T23:59:59.000Z",
          fromTime: "00:00",
          toTime: "23:59",
          vechileType: vechileType,
          VechileId: VechileId
        }),
      });

      const result = await response.json();

      if (response.ok) {
        showMsg("success", "Dates blocked successfully!");
        await fetchNotAvailability();
        setSelectedStart(null);
        setSelectedEnd(null);
      } else {
        showMsg("error", result.message || "Failed to block dates");
      }
    } catch (error) {
      console.error("Error creating block:", error);
      showMsg("error", "Failed to block dates");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBlock = async () => {
    if (!selectedRecord || !selectedStart || !selectedEnd) return;

    console.log("Updating block with ID:", selectedRecord.id); // Debug log

    try {
      setLoading(true);

      const payload = {
        fromDate: formatDate(selectedStart) + "T00:00:00.000Z",
        toDate: formatDate(selectedEnd) + "T23:59:59.000Z",
        fromTime: "00:00",
        toTime: "23:59",
        userId: userId,
        vechileType: vechileType,
        VechileId: VechileId
      };

      console.log("Update payload:", payload); // Debug log

      const response = await fetch(`${API_BASE}/updateNotAvailability/${selectedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log("Update response status:", response.status); // Debug log
      const result = await response.json();
      console.log("Update response data:", result); // Debug log

      if (response.ok || response.status === 200) {
        showMsg("success", "Block updated successfully!");
        await fetchNotAvailability();
        setSelectedStart(null);
        setSelectedEnd(null);
        setSelectedRecord(null);
      } else {
        showMsg("error", result.message || `Failed to update block (Status: ${response.status})`);
      }
    } catch (error) {
      console.error("Error updating block:", error);
      showMsg("error", "Failed to update block: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlock = async (recordId: string) => {
    if (!recordId) {
      showMsg("error", "Invalid record ID");
      return;
    }

    console.log("Deleting block with ID:", recordId); // Debug log

    // Confirm before delete
    if (!window.confirm("Are you sure you want to delete this blocked date?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/deleteNotAvailability/${recordId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Delete response status:", response.status); // Debug log

      // Some APIs return 204 No Content on successful delete
      if (response.status === 204) {
        showMsg("success", "Block removed successfully!");
        await fetchNotAvailability();
        setShowBlockedDates(false);
        return;
      }

      const result = await response.json();
      console.log("Delete response data:", result); // Debug log

      if (response.ok || response.status === 200) {
        showMsg("success", "Block removed successfully!");
        await fetchNotAvailability();
        setShowBlockedDates(false);
      } else {
        showMsg("error", result.message || `Failed to delete block (Status: ${response.status})`);
      }
    } catch (error) {
      console.error("Error deleting block:", error);
      showMsg("error", "Failed to delete block: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBlock = (record: BlockedRecord) => {
    setSelectedRecord(record);
    setSelectedStart(new Date(record.from));
    setSelectedEnd(new Date(record.to));
    setShowBlockedDates(false);
  };

  const renderCalendar = () => {
    const days: JSX.Element[] = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < offset; i++) days.push(<div key={`e${i}`} />);

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const past = isPast(date);
      const ownerBlocked = isOwnerBlocked(date);
      const custBooked = isCustomerBooked(date);
      const selected = (selectedStart && formatDate(selectedStart) === formatDate(date)) ||
        (selectedEnd && formatDate(selectedEnd) === formatDate(date));

      let cls = "h-10 sm:h-12 rounded-lg font-medium flex items-center justify-center relative transition text-sm ";

      if (past) {
        cls += "bg-gray-100 text-gray-400 cursor-not-allowed";
      } else if (custBooked) {
        cls += "bg-orange-100 border-2 border-orange-400 text-orange-700 cursor-not-allowed";
      } else if (ownerBlocked) {
        cls += "bg-red-100 border-2 border-red-400 text-red-700 hover:bg-red-200 cursor-pointer";
      } else if (selected) {
        cls += "bg-blue-600 text-white border-2 border-blue-700";
      } else {
        cls += "bg-gradient-to-br from-blue-500 to-indigo-500 text-white hover:opacity-90 cursor-pointer";
      }

      days.push(
        <button key={d} className={cls} disabled={past || custBooked} onClick={() => handleDateClick(date)}>
          {d}
          {custBooked && <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />}
          {ownerBlocked && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />}
        </button>
      );
    }
    return days;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-200 z-10">
          <X size={20} />
        </button>

        <div className="bg-gradient-to-br from-slate-100 to-blue-100 p-4">
          {loading && (
            <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-3 flex items-center gap-2 z-50">
              <Loader2 className="animate-spin" size={18} />
              <span className="text-sm">Loading...</span>
            </div>
          )}

          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-600" size={24} />
                <div>
                  <h2 className="font-bold text-lg">Manage Availability</h2>
                  <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700">
                    Owner
                  </span>
                </div>
              </div>
              {blockedRecords.length > 0 && (
                <button onClick={() => setShowBlockedDates(true)} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                  Blocked Dates ({blockedRecords.length})
                </button>
              )}
            </div>

            {message.text && (
              <div className={`mx-4 mt-4 p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {message.text}
              </div>
            )}

            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft size={20} />
                </button>
                <h3 className="font-semibold">
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h3>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => (
                  <div key={d} className="text-center font-medium text-gray-500 text-xs py-1">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 mb-4">{renderCalendar()}</div>

              <div className="flex flex-wrap gap-3 text-xs mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-red-100 border-2 border-red-400 rounded" />
                  <span>Your Blocks</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-orange-100 border-2 border-orange-400 rounded" />
                  <span>Customer Bookings</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="mb-3">
                  <p className="text-sm text-gray-500">Selected Range:</p>
                  <p className="font-semibold">{formatDisplay(selectedStart)} → {formatDisplay(selectedEnd)}</p>
                  {selectedRecord && (
                    <p className="text-xs text-blue-600 mt-1">Editing existing block</p>
                  )}
                </div>

                <div className="flex gap-2">
                  {selectedRecord ? (
                    <>
                      <button onClick={handleUpdateBlock} disabled={!selectedStart || !selectedEnd || loading} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition">
                        Update Block
                      </button>
                      <button onClick={() => { setSelectedRecord(null); setSelectedStart(null); setSelectedEnd(null); }} className="px-4 py-3 bg-gray-200 rounded-xl hover:bg-gray-300">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={handleCreateBlock} disabled={!selectedStart || !selectedEnd || loading} className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition">
                      Block Selected Dates
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {showBlockedDates && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[70vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Blocked Dates</h3>
                  <button onClick={() => setShowBlockedDates(false)}><X size={20} /></button>
                </div>
                {blockedRecords.length === 0 ? (
                  <p className="text-gray-500">No blocked dates</p>
                ) : (
                  <div className="space-y-2">
                    {blockedRecords.map(record => (
                      <div key={record.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold">{record.from} → {record.to}</p>
                            <p className="text-xs text-gray-500">{record.fromTime} - {record.toTime}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEditBlock(record)} className="flex-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteBlock(record.id)} disabled={loading} className="flex-1 px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200 disabled:opacity-50">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {clickedBlockRecord && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl p-6 max-w-sm w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Manage Block</h3>
                  <button onClick={() => setClickedBlockRecord(null)}><X size={20} /></button>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Selected Period:</p>
                  <p className="font-semibold">{clickedBlockRecord.from} → {clickedBlockRecord.to}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleEditBlock(clickedBlockRecord);
                      setClickedBlockRecord(null);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
                  >
                    Edit Block
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteBlock(clickedBlockRecord.id);
                      setClickedBlockRecord(null);
                    }}
                    className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg font-medium hover:bg-red-200"
                  >
                    Unblock
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}