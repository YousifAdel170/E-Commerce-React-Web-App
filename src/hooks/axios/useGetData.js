// Import the base URL for API calls
import baseUrl from "../../Api/baseURL";
import { STORAGE_KEYS } from "../../constants/storage";

// Custom Hook to fetch data from a given URL with parameters (without token)
const useGetData = async (url, params) => {
  // 1. Perform a GET request using the base URL and provided parameters
  const result = await baseUrl.get(url, params);

  // 2. Return the response data from the API
  return result.data;
};

// Custom Hook to fetch data with Authorization token from a given URL
const useGetDataToken = async (url) => {
  // 1. Set up the configuration with Authorization header using the token from localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        STORAGE_KEYS.LOCAL.AUTH.TOKEN
      )}`,
    },
  };

  // 2. Perform a GET request with the Authorization header
  const result = await baseUrl.get(url, config);

  // 3. Return the response data from the API
  return result.data;
};

// Export the custom hooks to be used in other components
export { useGetData, useGetDataToken };
