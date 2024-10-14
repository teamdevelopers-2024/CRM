import { useEffect, useState } from "react";
import MainComplete from "./components/maintaintance/MainComplete";
import LayoutRoutes from "./routes/Layout Routes/LayoutRoutes";

export default function App() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  useEffect(() => {
    const checkMaintenanceTime = () => {
      const currentDate = new Date();
      
      // Convert the current time to IST
      const indianStandardTimeOffset = 5.5;
      const utcTimeInMillis = currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
      const istTime = new Date(utcTimeInMillis + indianStandardTimeOffset * 3600000);

      const currentHour = istTime.getHours();
      const currentMinutes = istTime.getMinutes();

      const maintenanceStartHour = 18; // 6:00 PM
      const maintenanceEndHour = 8;  // 8:00 AM next day

      // Check if current time is in the maintenance window
      if (
        (currentHour >= maintenanceStartHour || currentHour < maintenanceEndHour) || 
        (currentHour === maintenanceEndHour && currentMinutes <= 0)
      ) {
        setIsMaintenanceMode(true);
      } else {
        setIsMaintenanceMode(false);
      }
    };

    checkMaintenanceTime();
  }, []);

  return (
    <>
      {isMaintenanceMode ? (
        <MainComplete />
      ) : (
        <LayoutRoutes />
      )}
    </>
  );
}
