// Import Hooks, Dispatch and Selector from React and Redux
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Actions from Redux to Fetch Data, Get All Categories and Get All Categories in Selected Page
import {
  getAllCategory,
  getAllCategoryInSelectedPage,
} from "../../redux/actions/categoryAction";
import { PAGE_CATEGORIES_LIMIT } from "../../config";

// Hook Responsible for fetching all categories and managing pagination
const AllCategoryPageHook = () => {
  // 1. Dispatch to dispatch the action to the redux store
  const dispatch = useDispatch();

  // 2. Selector to get the data from the redux store, loading state and page count
  const { category, loading } = useSelector((state) => state.allCategory);

  // 3. Local state to manage the loading state of the component
  const [isLoading, setLoading] = useState(true);

  // 4. Fetch categories data when the component mounts
  useEffect(() => {
    // Fetch the Data from the Api Only If Not Already Loaded
    const getData = async () =>
      await dispatch(getAllCategory(PAGE_CATEGORIES_LIMIT));

    // Call the function to fetch categories data
    getData();
  }, [dispatch]);

  // 5. Memoize the categories data to avoid unnecessary re-renders
  const categoriesData = useMemo(() => {
    if (category) return category.data;
    else [];
  }, [category]);

  // 6. Memoize the page count to avoid unnecessary re-renders
  const pageCount = useMemo(() => {
    if (category && category.paginationResult)
      return category.paginationResult.numberOfPages;
    else 0;
  }, [category]);

  // 7. Effect to set the loading state based on the loading state from redux
  useEffect(() => {
    if (!loading?.fetchAll) setLoading(false);
    else setLoading(true);
  }, [loading]);

  // 8. Function to fetch categories data in the selected page
  const getSelectedPageNumber = async (selectedPage) => {
    await dispatch(
      getAllCategoryInSelectedPage(PAGE_CATEGORIES_LIMIT, selectedPage)
    );
  };

  // 9. Fetch categories data only once when the component mounts
  return [categoriesData, isLoading, pageCount, getSelectedPageNumber];
};

// Exporting the AllCategoryPageHook
export default AllCategoryPageHook;
