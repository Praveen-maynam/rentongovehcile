import { useState } from "react";

export const useVehicleAvailability = (
  VechileId: string,
  vehicleType: string,
  isOpen: boolean
) => {
  const [apiUnavailableDates, setApiUnavailableDates] = useState<string[]>([]);
  const [ownerBlockedDates, setOwnerBlockedDates] = useState<string[]>([]);
  const [customerBookedDates, setCustomerBookedDates] = useState<string[]>([]);

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
          .filter(
            (item: any) =>
              item.status === "Unavailable" && !item.isCustomerBooking
          )
          .map((item: any) => item.date);
        setOwnerBlockedDates(ownerBlocked);

        // Customer booked dates
        const customerBooked = data.availability
          .filter(
            (item: any) =>
              item.status === "Unavailable" && item.isCustomerBooking === true
          )
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

  return {
    apiUnavailableDates,
    ownerBlockedDates,
    customerBookedDates,
    fetchVehicleAvailability,
  };
};