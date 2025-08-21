// utils/getDeviceInfo.js
import {
  browserName,
  browserVersion,
  osName,
  osVersion,
  deviceType,
  isMobile,
  isTablet,
  isDesktop,
} from "react-device-detect";

export const getDeviceInfo = () => {
  return {
    browser: `${browserName} ${browserVersion}`,
    os: `${osName} ${osVersion}`,
    // screenResolution: `${window.screen.width}x${window.screen.height}`,
    // userAgent: navigator.userAgent,
    // language: navigator.language || navigator.userLanguage,
    // timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    // onlineStatus: navigator.onLine ? "online" : "offline",
    deviceType:
      deviceType || (isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"),
  };
};
