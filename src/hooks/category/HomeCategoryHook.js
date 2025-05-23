// Import React and Redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import getAllCategory action from redux actions
import { getAllCategory } from "../../redux/actions/categoryAction";

// Import Constants from config file
import { PAGE_CATEGORIES_HOME_LIMIT } from "../../constants/pageLimits";

// Hook Responsible for fetching and managing the categories data
const HomeCategoryHook = () => {
  // 1. Dispatch to dispatch the action to the redux store
  const dispatch = useDispatch();

  // 2. Select the categories and loading state from the Redux store
  const { category, loading } = useSelector((state) => state.allCategory);

  // 3. States to save the categories data and loading state
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 4. useEffect to fetch all categories when the component mounts
  useEffect(() => {
    // Function to fetch all categories data when the component mounts
    const fetchCategories = async () =>
      await dispatch(getAllCategory(PAGE_CATEGORIES_HOME_LIMIT));

    // Call the function to fetch categories data
    fetchCategories();
  }, [dispatch]);

  // 5. useEffect to update the categories data and loading state when data is fetched
  useEffect(() => {
    if (!loading?.fetchAll) {
      // Check if category is a valid object and not an instance of Error
      if (category) setCategories(category.data);
      else setCategories([]);

      // Set loading state to false after data is fetched
      setIsLoading(false);
    } else setIsLoading(true);
  }, [loading, category]);

  // 6. Return categories and loading state
  return [categories, isLoading];
};

// Export the HomeCategoryHook for use in other components
export default HomeCategoryHook;
