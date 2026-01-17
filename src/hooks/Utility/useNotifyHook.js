// Import the toast notification library from react-toastify
import { toast } from "react-toastify";

// Import Used Configurations
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";

// Custom notification function (Check the type of notification and display the appropriate toast message)
const notify = (msg, type) => {
  // Display a success message with the provided msg
  if (type === NOTIFICATION_TYPES.SUCCESS) toast.success(msg);
  // Display a warning message with the provided msg
  else if (type === NOTIFICATION_TYPES.WARNING) toast.warn(msg);
  // Display an error message with the provided msg
  else if (type === NOTIFICATION_TYPES.ERROR) toast.error(msg);
  else if (type === NOTIFICATION_TYPES.INFO) toast.info(msg);
};

// Export the notify function to be used elsewhere in the project
export default notify;
