// Import Hooks, Dispatch and Selector from React and Redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Actions from Redux to Fetch Data, Get All Categories and Get All Categories in Selected Page
import {
  getAllCategory,
  getAllCategoryInSelectedPage,
} from "../../redux/actions/categoryAction";
import { PAGE_CATEGORIES_LIMIT } from "../../constants/pageLimits";

// Hook Responsible for fetching all categories and managing pagination
const AllCategoryPageHook = () => {
  // 1. Dispatch to dispatch the action to the redux store
  const dispatch = useDispatch();

  // 2. Selector to get the data from the redux store, loading state and page count
  const { category, loading } = useSelector((state) => state.allCategory);

  // 3. Local state to manage the loading state of the component
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  // 4. Fetch categories data when the component mounts
  useEffect(() => {
    // Fetch the Data from the Api Only If Not Already Loaded
    const getData = async () =>
      await dispatch(getAllCategory(PAGE_CATEGORIES_LIMIT));

    // Call the function to fetch categories data
    getData();
  }, [dispatch]);

  // 5. Effect to set the loading state based on the loading state from redux
  useEffect(() => {
    if (!loading?.fetchAll && category) {
      setCategories(category?.data || []);
      setPageCount(category?.paginationResult?.numberOfPages || 0);
      setIsLoading(false);
    }
  }, [loading, category]);

  // 6. Function to fetch categories data in the selected page
  const getSelectedPageNumber = async (selectedPage) => {
    await dispatch(
      getAllCategoryInSelectedPage(PAGE_CATEGORIES_LIMIT, selectedPage)
    );
  };

  return [categories, isLoading, pageCount, getSelectedPageNumber];
};

// Exporting the AllCategoryPageHook
export default AllCategoryPageHook;
