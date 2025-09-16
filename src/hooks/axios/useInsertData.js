// Import the base URL for API calls
import baseUrl from "../../Api/baseURL";
import { STORAGE_KEYS } from "../../constants/storage";

// Custom Hook to insert data with an image (multipart form data)
const useInsertDataWithImage = async (url, params) => {
  // 1. Set up the configuration for multipart form data and Authorization token
  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Content type for file uploads
      Authorization: `Bearer ${localStorage.getItem(
        STORAGE_KEYS.LOCAL.AUTH.TOKEN
      )}`, // Authorization token from localStorage
    },
  };

  // 2. Perform a POST request to insert data with the provided parameters and configuration
  const result = await baseUrl.post(url, params, config);

  // 3. Return the result of the POST request
  return result;
};

// Custom Hook to insert data (without image)
const useInsertData = async (url, params) => {
  // 1. Set up the configuration for Authorization token
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        STORAGE_KEYS.LOCAL.AUTH.TOKEN
      )}`, // Authorization token from localStorage
    },
  };

  // 2. Perform a POST request to insert data with the provided parameters and configuration
  const result = await baseUrl.post(url, params, config);

  // 3. Return the result of the POST request
  return result;
};

// Export the custom hooks to be used in other components
export { useInsertData, useInsertDataWithImage };
