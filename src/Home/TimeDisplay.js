import React, { useEffect, useState } from "react";
import { useTheme } from '../hooks/useTheme';
function TimeDisplay() {

  const [time, setTime] = useState(getCurrentTime());
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div
      className="text-[10px] ml-[10px] font-medium"
      style={{ color: isDark ? '#ffffff' : '#000000' }}
    >
      {time}
    </div>
  );
}

export default TimeDisplay;
