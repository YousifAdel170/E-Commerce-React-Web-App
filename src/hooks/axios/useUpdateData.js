// Import the base URL for API calls
import baseUrl from "../../Api/baseURL";

// Custom Hook to update data with an image (multipart form data)
const useUpdateDataWithImage = async (url, params) => {
  // 1. Set up the configuration for multipart form data and Authorization token
  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Content type for file uploads
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization token from localStorage
    },
  };

  // 2. Perform a PUT request to update data with the provided parameters and configuration
  const result = await baseUrl.put(url, params, config);

  // 3. Return the result of the PUT request
  return result;
};

// Custom Hook to update data (without image)
const useUpdateData = async (url, params) => {
  // 1. Set up the configuration for Authorization token
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Authorization token from localStorage
  };

  // 2. Perform a PUT request to update data with the provided parameters and configuration
  const result = await baseUrl.put(url, params, config);

  // 3. Return the result of the PUT request
  return result;
};

// Export the custom hooks to be used in other components
export { useUpdateData, useUpdateDataWithImage };
