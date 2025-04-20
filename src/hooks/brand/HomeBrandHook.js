// Import Hooks from React, React Redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Actions from Redux
import { getAllBrand } from "../../redux/actions/brandAction";
import { PAGE_BRANDS_HOME_LIMIT } from "../../config";

// Hook Responsible for fetching and managing brand data
const HomeBrandHook = () => {
  // 1. Dispatch to dispatch the action to the redux store
  const dispatch = useDispatch();

  // 3. States to save the categories data and loading state
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Select the brand and loading state from the Redux store
  const { brand, loading } = useSelector((state) => state.allBrand);

  // 4. useEffect to fetch all brands when the component mounts
  useEffect(() => {
    // Function to fetch all brands data when the component mounts
    const getData = async () =>
      await dispatch(getAllBrand(PAGE_BRANDS_HOME_LIMIT));
    // Call the function to fetch brands data
    getData();
  }, [dispatch]);

  // 5. useEffect to update the brand data and loading state when data is fetched
  useEffect(() => {
    if (!loading?.fetchAll) {
      // Check if brand is a valid object and not an instance of Error
      if (brand) setBrands(brand.data);
      else setBrands([]);

      // Set loading state to false after data is fetched
      setIsLoading(false);
    } else setIsLoading(true);
  }, [loading, brand]);
  // 6. Return brand data and loading state
  return [brands, isLoading];
};

// Export the HomeBrandHook for use in other components
export default HomeBrandHook;
