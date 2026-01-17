// Import the custom notification function
import notify from "./useNotifyHook";

// Import Used Configuartions
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";

// Custom hook to detect internet connection status
const internetDetect = (msg) => {
  // Check if the user is offline
  if (!navigator.onLine) {
    // If offline, display a warning notification
    notify(msg, NOTIFICATION_TYPES.ERROR);
    return; // Exit the function since there's no internet connection
  }
};

// Export the internetDetect function to be used in other parts of the app
export default internetDetect;
