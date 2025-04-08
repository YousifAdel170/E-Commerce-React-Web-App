// Import Hooks from React, React Redux
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Actions from Redux
import { getAllBrand } from "../../redux/actions/brandAction";

// Hook Responsible for fetching and managing brand data
const HomeBrandHook = () => {
  // 1. Import useDispatch from react-redux to dispatch actions
  const dispatch = useDispatch();

  // 2. Import useSelector from react-redux to access the Redux store state
  const result = useSelector((state) => state.allBrand);

  // 3. useEffect to dispatch the action to fetch all brands when the component mounts
  useEffect(() => {
    // Dispatch the action to fetch all brands
    const getData = async () => await dispatch(getAllBrand());

    // Call the function to fetch data
    getData();
  }, [dispatch]);

  // 4. Use useMemo to memoize the brands data and loading state
  const brands = useMemo(() => {
    if (result && result.brand && result.brand.data) return result.brand.data;
    else return [];
  }, [result]);

  // 5. Use useMemo to memoize the loading state
  const loading = useMemo(() => {
    if (result && result.loading) return result.loading;
    else return false;
  }, [result]);

  // 6. Return the brands data and loading state
  return [brands, loading];
};

// 7. Export the HomeBrandHook for use in other components
export default HomeBrandHook;
