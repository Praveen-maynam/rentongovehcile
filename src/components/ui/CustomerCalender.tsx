import React, { useState, useEffect, useRef } from "react";
import { X, Calendar, ChevronLeft, ChevronRight, ShoppingCart, Loader2 } from "lucide-react";
import CalendarGrid from "./CustomerCalendar/CalendarGrid";
import BookingSummary from "./CustomerCalendar/BookingSummary";
import TimeSelector from "./CustomerCalendar/TimeSelector";
import Legend from "./CustomerCalendar/Legend";
import BookingModal from "./CustomerCalendar/BookingModal";
import MyBookingsModal from "./CustomerCalendar/MyBookingsModal";
import MessageDisplay from "./CustomerCalendar/MessageDisplay";
// WaitingPopup removed - using GlobalBookingModals instead
import { useNotificationStore } from "../../store/notification.store";
import { useBookingModalStore } from "../../store/booking-modal.store";

interface CustomerCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
  VechileId: string;
  vechileType: string;
  userId: string;
  ownerId?: string;
  pricePerDay?: number;
  pricePerKm?: number;
  pricePerHour?: number;
  vehicleName?: string;
  latitude?: string;
  longitude?: string;
  contactNumber?: string;
  contactName?: string;
  onBookingComplete?: (booking: any) => void;
}

const API_BASE = "http://3.110.122.127:3000";

export default function CustomerCalendar({
  isOpen,
  onClose,
  userRole,
  VechileId,
  vechileType,
  userId,
  latitude = "17.438095",
  longitude = "78.4485",
  ownerId: propOwnerId,
  pricePerDay = 0,
  pricePerKm = 0,
  pricePerHour = 0,
  vehicleName = "Vehicle",
  contactNumber: propContactNumber,
  contactName: propContactName,
  onBookingComplete
}: CustomerCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("18:00");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [loading, setLoading] = useState(false);

  const [ownerBlockedDates, setOwnerBlockedDates] = useState<string[]>([]);
  const [allBookedDates, setAllBookedDates] = useState<string[]>([]);
  const [confirmedBookedDates, setConfirmedBookedDates] = useState<string[]>([]);
  const [myBookings, setMyBookings] = useState<any[]>([]);
  // showWaiting removed - using GlobalBookingModals CustomerWaitingPopup instead
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);

  // ✅ ADD: Store polling interval reference
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Use the notification store for backend notifications
  const { addNotification } = useNotificationStore();

  // ✅ ADD: Show notification using backend notification store (NO SOUND - sounds handled by GlobalBookingModals)
  const showCustomerNotification = (title: string, message: string, type: 'booking_confirmed' | 'booking_declined' | 'general' = 'general') => {
    console.log("🔔 Adding notification to store:", title, message);

    // ✅ REMOVED: playNotificationSound() - Sound 1 is for Owner only!
    // Customer sounds are handled by GlobalBookingModals (Sound 3 for rejection/timeout)

    // Add to notification store (backend notifications)
    addNotification({
      type,
      title,
      message,
      vehicleId: VechileId,
      vehicleName: vehicleName,
      bookingId: activeBookingId || undefined
    });
  };

  // ✅ ADD: Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, []);

  // Move this useEffect below fetchOwnerBlocks and fetchBookings declarations
  // ...existing code...
  // Removed duplicate fetchOwnerBlocks

  // Removed duplicate fetchBookings


  const fetchOwnerBlocks = React.useCallback(async () => {
    try {
      setLoading(true);
      const startDate = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1));
      const endDate = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0));

      const response = await fetch(
        `${API_BASE}/getVehicleAvailability?VechileId=${VechileId}&vechileType=${vechileType}&startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();

      console.log("=== OWNER BLOCKS API Response ===", JSON.stringify(data, null, 2));

      if (data && Array.isArray(data.availability)) {
        const dates: string[] = [];

        data.availability.forEach((item: any) => {
          if (item.status !== "Available") {
            dates.push(item.date);
            console.log(`🔴 Owner blocked: ${item.date}`);
          }
        });

        setOwnerBlockedDates(dates);
        console.log("Total owner blocked dates:", dates.length);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
      showMsg("error", "Failed to load availability");
    } finally {
      setLoading(false);
    }
  }, [currentMonth, VechileId, vechileType]);

  const fetchBookings = React.useCallback(async () => {
    try {
      setLoading(true);

      const activeBookingIdLocal = localStorage.getItem("activeBookingId") || "";

      if (!activeBookingIdLocal) {
        console.log("⚠ No active booking ID in localStorage");
        setAllBookedDates([]);
        setConfirmedBookedDates([]);
        setMyBookings([]);
        return;
      }

      const response = await fetch(`${API_BASE}/getBookingById/${activeBookingIdLocal}`);
      const data = await response.json();

      console.log("=== BOOKINGS API Response ===", JSON.stringify(data, null, 2));

      if (!data || !data.booking) {
        console.warn("⚠ No booking data returned from server.");
        setAllBookedDates([]);
        setConfirmedBookedDates([]);
        setMyBookings([]);
        return;
      }

      const bookings = Array.isArray(data.booking) ? data.booking : [data.booking];

      const allDates: string[] = [];
      const confirmedDates: string[] = [];
      const myBookingsList: any[] = [];

      bookings.forEach((item: any) => {
        const from = new Date(item.from || item.FromDate);
        const to = new Date(item.to || item.ToDate);
        const curr = new Date(from);

        const isConfirmed = item.status?.toLowerCase() === "confirmed" ||
          item.bookingStatus?.toLowerCase() === "confirmed";

        myBookingsList.push({
          id: item._id,
          from: (item.FromDate || item.from)?.split("T")[0],
          to: (item.ToDate || item.to)?.split("T")[0],
          fromTime: item.FromTime || item.fromTime || "06:00",
          toTime: item.ToTime || item.toTime || "18:00",
          customerId: item.customerId || item.userId,
          status: item.status || item.bookingStatus,
          isConfirmed
        });

        while (curr <= to) {
          const dateStr = formatDate(curr);
          allDates.push(dateStr);

          if (isConfirmed) confirmedDates.push(dateStr);

          curr.setDate(curr.getDate() + 1);
        }
      });

      setAllBookedDates(allDates);
      setConfirmedBookedDates(confirmedDates);
      setMyBookings(myBookingsList.filter(b => b.customerId === userId));

    } catch (error) {
      console.error("Error fetching bookings:", error);
      showMsg("error", "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [userId]);
  // Now insert the useEffect after both functions are declared
  useEffect(() => {
    if (isOpen && VechileId && vechileType) {
      fetchOwnerBlocks();
      fetchBookings();
    }
  }, [isOpen, VechileId, vechileType, fetchOwnerBlocks, fetchBookings]);

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatDateForAPI = (date: Date): string => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return `${y}-${m}-${d}`;
  };

  const formatTimeForAPI = (time: string): string => {
    const [hours, minutes] = time.split(":");
    return `${parseInt(hours)}.${minutes}`;
  };

  const formatDisplay = (date: Date | null): string => {
    if (!date) return "Select";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isPast = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isOwnerBlocked = (date: Date) => ownerBlockedDates.includes(formatDate(date));
  const isBooked = (date: Date) => allBookedDates.includes(formatDate(date));
  const isConfirmedBooking = (date: Date) => confirmedBookedDates.includes(formatDate(date));
  // Removed unused isMyBooking helper
  const isUnavailable = (date: Date) => isOwnerBlocked(date) || isBooked(date);

  const showMsg = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleDateClick = (date: Date) => {
    if (isPast(date)) return;
    if (isUnavailable(date)) {
      if (isOwnerBlocked(date)) {
        showMsg("error", "Owner has blocked this date");
      } else {
        showMsg("error", "This date is already booked");
      }
      return;
    }

    if (!selectedStart) {
      setSelectedStart(date);
      setSelectedEnd(null);
    } else if (!selectedEnd) {
      if (date < selectedStart) {
        showMsg("error", "End date must be after start");
        return;
      }
      const curr = new Date(selectedStart);
      while (curr <= date) {
        if (isUnavailable(curr)) {
          showMsg("error", "Some dates in range are unavailable");
          return;
        }
        curr.setDate(curr.getDate() + 1);
      }
      setSelectedEnd(date);
    } else {
      setSelectedStart(date);
      setSelectedEnd(null);
    }
  };

  const calculateTotalHours = (): number => {
    if (!selectedStart || !selectedEnd) return 0;

    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);

    const start = new Date(selectedStart);
    start.setHours(startH, startM, 0, 0);

    const end = new Date(selectedEnd);
    end.setHours(endH, endM, 0, 0);

    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));

    return diffHours > 0 ? diffHours : 1;
  };

  const calculateTotalPrice = (): number => {
    if (!selectedStart || !selectedEnd) return 0;

    const totalHours = calculateTotalHours();

    if (pricePerHour > 0) {
      return totalHours * pricePerHour;
    }

    const diffTime = Math.abs(selectedEnd.getTime() - selectedStart.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays * pricePerDay;
  };

  // ✅ FIXED: Remove "PENDING" ID - Use GlobalBookingModals for waiting popup
  const handleCustomerBook = () => {
    console.log("🔵 handleCustomerBook called");
    console.log("🔵 selectedStart:", selectedStart);
    console.log("🔵 selectedEnd:", selectedEnd);

    if (!selectedStart || !selectedEnd) {
      console.log("❌ No dates selected - returning early");
      alert("Please select start and end dates first!");
      return;
    }

    console.log("🔵 Creating booking...");
    setShowBookingModal(false);

    // Small delay to ensure state updates before API call
    setTimeout(() => {
      performBooking();
    }, 100);
  };

  const performBooking = async () => {
    if (!selectedStart || !selectedEnd) return;

    try {
      setLoading(true);

      // ✅ FIX: Try multiple sources for contact number
      let contactNumber = propContactNumber || localStorage.getItem("contactNumber") || "";

      // If still empty, try to get from userProfile
      if (!contactNumber) {
        try {
          const userProfile = localStorage.getItem("userProfile");
          if (userProfile) {
            const profile = JSON.parse(userProfile);
            contactNumber = profile.phone || profile.contactNumber || profile.mobileNumber || "";
          }
        } catch (e) {
          console.log("Could not parse userProfile");
        }
      }

      // If still empty, try to get from user object
      if (!contactNumber) {
        try {
          const user = localStorage.getItem("user");
          if (user) {
            const userData = JSON.parse(user);
            contactNumber = userData.phone || userData.contactNumber || userData.mobileNumber || "";
          }
        } catch (e) {
          console.log("Could not parse user");
        }
      }

      // ✅ If STILL empty, prompt user or use a default message
      if (!contactNumber) {
        console.warn("⚠ No contact number found - will prompt user");
        const userPhone = prompt("Please enter your contact number to complete the booking:");
        if (userPhone && userPhone.trim()) {
          contactNumber = userPhone.trim();
          localStorage.setItem("contactNumber", contactNumber); // Save for future
        }
      }

      const contactName = propContactName || localStorage.getItem("userName") || localStorage.getItem("contactName") || "";

      // ✅ FIX: Get ownerId with proper fallback
      const ownerId = propOwnerId || localStorage.getItem("vehicleOwnerId") || "";

      console.log("📋 Booking Details:", {
        userId,
        ownerId,
        VechileId,
        vechileType,
        contactNumber,
        contactName,
        hasOwnerId: !!ownerId
      });

      const totalHours = calculateTotalHours();
      const totalPrice = calculateTotalPrice();

      const formData = new URLSearchParams();
      formData.append("userId", userId);
      formData.append("vechileType", vechileType);
      formData.append("VechileId", VechileId);

      // ✅ FIX: Add ownerId if available (API might need it)
      if (ownerId) {
        formData.append("ownerId", ownerId);
        console.log("✅ Including ownerId in booking request");
      } else {
        console.warn("⚠ No ownerId available - booking may fail if API requires it");
      }

      formData.append("pricePerKm", String(pricePerKm || pricePerDay || 0));
      formData.append("contactNumber", contactNumber);
      formData.append("contactName", contactName);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("FromDate", formatDateForAPI(selectedStart));
      formData.append("ToDate", formatDateForAPI(selectedEnd));
      formData.append("FromTime", formatTimeForAPI(startTime));
      formData.append("ToTime", formatTimeForAPI(endTime));
      formData.append("totalHours", String(totalHours));
      formData.append("totalPrice", String(totalPrice));

      console.log("📤 Creating booking...");

      const response = await fetch(`${API_BASE}/createBooking`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData
      });

      const data = await response.json();
      console.log("📥 Booking created:", data);

      if (response.ok) {
        const bookingId = data.booking?._id || data._id || data.bookingId;
        console.log("✅ Booking ID:", bookingId);

        if (bookingId) {
          localStorage.setItem("activeBookingId", bookingId);
          setActiveBookingId(bookingId);

          // ✅ Show GLOBAL waiting popup with 120 second countdown
          useBookingModalStore.getState().showCustomerWaitingPopup(bookingId, vehicleName);

          // ✅ Show notification to customer that booking was created
          showCustomerNotification(
            "Booking Request Sent!",
            `Your booking request for ${vehicleName} has been sent to the owner. Waiting for response...`
          );

          // ✅ Start polling to check booking status - with 10 second delay
          console.log("⏱ Will start polling in 10 seconds...");
          setTimeout(() => {
            startPolling(bookingId);
          }, 10000); // Wait 10 seconds before polling starts
          console.log("⏱ Global waiting popup will stay open for 120 seconds");
        } else {
          console.error("❌ No booking ID received");
          showMsg("error", "Booking created but no ID received");
          return;
        }

        showMsg("success", "Booking request sent!");
        await blockDatesAsUnavailable();
        // ❌ DISABLED - Don't fetch bookings as it might cause issues
        // await fetchBookings();
        setSelectedStart(null);
        setSelectedEnd(null);

        if (onBookingComplete) {
          onBookingComplete(data);
        }
      } else {
        // Booking API returned error
        console.error("❌ Booking API failed:", data.message);
        const errorMsg = data.message || "Please try again";

        // ✅ Show notification for booking failure
        showCustomerNotification(
          "Booking Failed",
          errorMsg
        );
        showMsg("error", errorMsg);
      }
    } catch (error: any) {
      // Network error
      console.error("❌ Booking network error:", error);

      // ✅ Show notification for network error
      showCustomerNotification(
        "Booking Failed",
        "Network error - Please check your connection"
      );
      showMsg("error", "Network error - Please try again");
    } finally {
      setLoading(false);
    }
  };

  // ✅ POLLING - Only closes popup on Confirmed/Rejected
  const startPolling = (bookingId: string) => {
    console.log("⏱ Starting polling NOW for booking ID:", bookingId);

    // Clear any existing interval
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    // Start polling immediately (delay is handled in performBooking)
    pollingIntervalRef.current = setInterval(async () => {
      try {
        console.log("⏱ Polling for booking:", bookingId);
        const response = await fetch(`${API_BASE}/getBookingById/${bookingId}`);

        if (!response.ok) {
          console.log("⏱ API returned error - continuing to wait...");
          return;
        }

        const data = await response.json();
        console.log("⏱ Polling response:", JSON.stringify(data));

        // ✅ Check both possible status locations
        const status = data.booking?.status || data.status || "";
        console.log("⏱ Current status:", status);

        // ONLY close on explicit Confirmed or Rejected - everything else keeps waiting
        if (status.toLowerCase() === "confirmed") {
          console.log("✅ OWNER ACCEPTED - Closing popup");

          // Clear interval
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }

          // ✅ Show GLOBAL confirmation modal (this also closes the waiting popup)
          useBookingModalStore.getState().showCustomerAcceptedModal(vehicleName);

          // ✅ Show notification to customer
          showCustomerNotification(
            "Booking Confirmed!",
            `Your booking for ${vehicleName} has been accepted by the owner.`,
            'booking_confirmed'
          );

          // Refresh calendar data
          await fetchBookings();
          await fetchOwnerBlocks();

          setTimeout(() => {
            setActiveBookingId(null);
          }, 1500);

        } else if (status.toLowerCase() === "cancelled" || status.toLowerCase() === "autocancelled" || status.toLowerCase() === "rejected") {
          console.log("❌ OWNER REJECTED - Closing popup");

          // Clear interval
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }

          // ✅ Show GLOBAL rejection modal (this also closes the waiting popup)
          if (status.toLowerCase() === "autocancelled") {
            useBookingModalStore.getState().showCustomerTimeoutModal(vehicleName);
          } else {
            useBookingModalStore.getState().showCustomerRejectedModal(vehicleName);
          }

          // ✅ Show notification to customer
          showCustomerNotification(
            "Booking Rejected",
            `Your booking for ${vehicleName} was declined by the owner.`,
            'booking_declined'
          );

          // Unblock the dates and refresh calendar
          await unblockDatesAfterCancellation(bookingId);
          await fetchBookings();
          await fetchOwnerBlocks();

          setTimeout(() => {
            setActiveBookingId(null);
          }, 1500);

        } else {
          // ANY other status (Pending, empty, unknown) - keep waiting
          console.log("⏱ POLLING: Status is '" + status + "' - popup stays open, continuing to wait...");
        }
      } catch (error) {
        console.error("❌ Polling error:", error);
        // ✅ DON'T CLOSE POPUP ON ERROR - Just log it and continue
        console.log("⏱ Polling error - continuing to wait...");
      }
    }, 5000); // Poll every 5 seconds
  };

  // ✅ NEW: Function to unblock dates after cancellation
  const unblockDatesAfterCancellation = async (bookingId: string) => {
    try {
      console.log("🔓 Attempting to unblock dates for booking:", bookingId);

      // Try to remove the unavailability entry
      const response = await fetch(`${API_BASE}/removeNotAvailability/${bookingId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        console.log("✅ Dates unblocked successfully");
      } else {
        console.warn("⚠ Could not unblock dates - endpoint may not exist");
      }
    } catch (error) {
      console.error("❌ Error unblocking dates:", error);
    }
  };

  const blockDatesAsUnavailable = async () => {
    if (!selectedStart || !selectedEnd) return;

    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append("userId", userId);
      urlencoded.append("vechileType", vechileType);
      urlencoded.append("VechileId", VechileId);
      urlencoded.append("fromDate", formatDateForAPI(selectedStart));
      urlencoded.append("toDate", formatDateForAPI(selectedEnd));
      urlencoded.append("fromTime", formatTimeForAPI(startTime));
      urlencoded.append("toTime", formatTimeForAPI(endTime));
      urlencoded.append("isNotAvailable", "true");
      urlencoded.append("bikeImages", "");
      urlencoded.append("isCustomerBooking", "true");

      await fetch(`${API_BASE}/createNotAvailability`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: urlencoded
      });
      console.log("✅ Dates blocked successfully");
    } catch (error) {
      console.error("❌ Error blocking dates:", error);
    }
  };

  // ✅ UPDATED: Also refresh calendar after manual cancellation
  const handleCancelBooking = async (booking: any) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/deleteBooking/${booking.id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        showMsg("success", "Booking cancelled");

        // ✅ Unblock dates and refresh calendar
        await unblockDatesAfterCancellation(booking.id);
        await fetchBookings();
        await fetchOwnerBlocks();
      } else {
        showMsg("error", "Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      showMsg("error", "Failed to cancel booking");
    } finally {
      setLoading(false);
    }
  };

  const renderCalendar = () => {
    const days = [];
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
      const booked = isBooked(date);
      const confirmedBooked = isConfirmedBooking(date);
      const unavailable = isUnavailable(date);
      const isSelectedStart = selectedStart && formatDate(selectedStart) === formatDate(date);
      const isSelectedEnd = selectedEnd && formatDate(selectedEnd) === formatDate(date);
      const isInRange = selectedStart && selectedEnd && date > selectedStart && date < selectedEnd;

      let cls = "h-10 sm:h-12 rounded-lg font-medium flex items-center justify-center relative transition text-sm ";

      if (past) {
        cls += "bg-gray-100 text-gray-400 cursor-not-allowed";
      } else if (ownerBlocked) {
        cls += "bg-red-100 border-2 border-red-400 text-red-700 cursor-not-allowed";
      } else if (confirmedBooked) {
        cls += "bg-green-100 border-2 border-green-400 text-green-700 cursor-not-allowed";
      } else if (booked) {
        cls += "bg-orange-100 border-2 border-orange-400 text-orange-700 cursor-not-allowed";
      } else if (isSelectedStart || isSelectedEnd) {
        cls += "bg-blue-600 text-white border-2 border-blue-700";
      } else if (isInRange) {
        cls += "bg-blue-200 text-blue-800";
      } else {
        cls += "bg-gradient-to-br from-blue-500 to-indigo-500 text-white hover:opacity-90 cursor-pointer";
      }

      days.push(
        <button key={d} className={cls} disabled={past || unavailable} onClick={() => handleDateClick(date)}>
          {d}
          {ownerBlocked && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />}
          {confirmedBooked && <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />}
          {booked && !confirmedBooked && <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />}
        </button>
      );
    }
    return days;
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-200 z-10">
            <X size={20} />
          </button>

          {loading && (
            <div className="absolute top-3 left-3 bg-white rounded-lg shadow-lg p-2 flex items-center gap-2 z-10">
              <Loader2 className="animate-spin" size={16} />
              <span className="text-sm">Loading...</span>
            </div>
          )}

          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" size={24} />
              <div>
                <h2 className="font-bold text-lg">Book {vehicleName}</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">Customer</span>
              </div>
            </div>
            {myBookings.length > 0 && (
              <button onClick={() => setShowMyBookings(true)} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                My Bookings ({myBookings.length})
              </button>
            )}
          </div>

          <MessageDisplay type={message.type} text={message.text} />

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

            <CalendarGrid days={renderCalendar()} />

            <Legend />

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <BookingSummary
                  selectedStart={selectedStart}
                  selectedEnd={selectedEnd}
                  totalHours={calculateTotalHours()}
                  totalPrice={calculateTotalPrice()}
                  formatDisplay={formatDisplay}
                />
                <TimeSelector
                  startTime={startTime}
                  endTime={endTime}
                  setStartTime={setStartTime}
                  setEndTime={setEndTime}
                />
              </div>

              <button onClick={handleCustomerBook} disabled={!selectedStart || !selectedEnd || loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition flex items-center justify-center gap-2">
                <ShoppingCart size={18} /> Book Now
              </button>
            </div>
          </div>

          <BookingModal
            show={showBookingModal}
            loading={loading}
            vehicleName={vehicleName}
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            startTime={startTime}
            endTime={endTime}
            totalHours={calculateTotalHours()}
            totalPrice={calculateTotalPrice()}
            formatDisplay={formatDisplay}
            onConfirm={handleCustomerBook}
            onCancel={() => setShowBookingModal(false)}
          />

          <MyBookingsModal
            show={showMyBookings}
            bookings={myBookings}
            loading={loading}
            onCancelBooking={handleCancelBooking}
            onClose={() => setShowMyBookings(false)}
          />
        </div>
      </div>

      {/* WaitingPopup removed - using GlobalBookingModals CustomerWaitingPopup instead */}

    </>
  );
}