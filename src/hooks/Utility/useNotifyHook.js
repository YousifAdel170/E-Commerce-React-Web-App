// Import the toast notification library from react-toastify
import { toast } from "react-toastify";

// Custom notification function
const notify = (msg, type) => {
  // Check the type of notification and display the appropriate toast message
  if (type === "success") {
    // Display a success message with the provided msg
    toast.success(msg);
  } else if (type === "warn") {
    // Display a warning message with the provided msg
    toast.warn(msg);
  } else if (type === "error") {
    // Display an error message with the provided msg
    toast.error(msg);
  }
};

// Export the notify function to be used elsewhere in the project
export default notify;
