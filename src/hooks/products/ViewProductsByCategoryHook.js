// Import React hooks and Redux tools
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Redux actions
import { getAllProductsByCategory } from "../../redux/actions/productsAction";
import { getSpecificCategory } from "../../redux/actions/categoryAction";

// Import custom hook to check internet connection
import internetDetect from "../Utility/useInternetConnectionHook";

// Import Used Configurations
import { PAGE_PRODUCTS_LIMIT } from "../../constants/pageLimits";
import { EMPTY } from "../../constants/general";

// Custom hook to get all products by a specific category
const ViewProductsByCategoryHook = (categoryID) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check the internet connection status
    internetDetect();

    // Fetch products for the given category
    const getData = async () =>
      await dispatch(
        getAllProductsByCategory(PAGE_PRODUCTS_LIMIT, EMPTY.TEXT, categoryID)
      );

    getData();
  }, [dispatch, categoryID]);

  // Handle pagination button click
  const onPress = async (page) => {
    await dispatch(
      getAllProductsByCategory(PAGE_PRODUCTS_LIMIT, page, categoryID)
    );
  };

  // Get all products by category from Redux state
  const allProductsByCategory = useSelector(
    (state) => state.allProduct.viewProductsByCategory
  );

  // Get specific category data from Redux state
  const category = useSelector(
    (state) => state.allCategory.viewSpecificCategory
  );

  useEffect(() => {
    // Fetch the specific category data
    const getCategory = async () =>
      await dispatch(getSpecificCategory(categoryID));
    getCategory();
  }, [dispatch, categoryID]);

  // Memoize items to avoid unnecessary re-renders
  const items = useMemo(() => {
    return allProductsByCategory?.data || EMPTY.ARRAY;
  }, [allProductsByCategory]);

  // Memoize page count for pagination
  const pageCount = useMemo(() => {
    return allProductsByCategory?.paginationResult?.numberOfPages || 0;
  }, [allProductsByCategory]);

  // Memoize category name for display
  const categoryName = useMemo(() => {
    return category?.data?.name || EMPTY.TEXT;
  }, [category]);

  // Return values used in the view component
  return [items, pageCount, onPress, categoryName];
};

export default ViewProductsByCategoryHook;
