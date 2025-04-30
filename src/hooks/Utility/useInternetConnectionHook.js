// Import the custom notification function
import notify from "./useNotifyHook";

// Custom hook to detect internet connection status
const internetDetect = () => {
  // Check if the user is offline
  if (!navigator.onLine) {
    // If offline, display a warning notification
    notify("هناك مشكله فى الاتصال بالانترنت", "warn");
    return; // Exit the function since there's no internet connection
  }
};

// Export the internetDetect function to be used in other parts of the app
export default internetDetect;
