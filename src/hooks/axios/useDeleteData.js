// Import the base URL for API calls
import baseUrl from "../../Api/baseURL";

// Custom Hook to delete data from a given URL with parameters
const useDeleteData = async (url, params) => {
  // 1. Define the config object for the API request
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Get the token from localStorage for authorization
    },
    data: params, // Add the provided params as the data for the request
  };

  // 2. Perform the DELETE request using the base URL and config
  const res = await baseUrl.delete(url, config);

  // 3. Return the response data from the API
  return res.data;
};

// Export the custom hook for use in other components
export default useDeleteData;
