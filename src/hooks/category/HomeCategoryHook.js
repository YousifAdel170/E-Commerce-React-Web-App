// Import React and Redux
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import getAllCategory action from redux actions
import { getAllCategory } from "../../redux/actions/categoryAction";

// Hook Responsible for fetching and managing the categories data
const HomeCategoryHook = () => {
  // 0. Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // 1. select all the result of the page (All Categories) using useSelector [Data + Loading]
  const result = useSelector((state) => state.allCategory);

  // 2. Destructure the result to get the data and loading state
  const categories = useMemo(() => {
    if (result && result.category) return result.category.data;
    else return [];
  }, [result]);

  // 3. Check if the data is loading or not
  const loading = useMemo(() => {
    if (result && !result.loading) return false;
    else return true;
  }, [result]);

  // 4. useEffect to fetch the data from the API
  useEffect(() => {
    const getCategoriesData = async () => {
      await dispatch(getAllCategory(5));
    };

    // Call the function to fetch the data
    getCategoriesData();
  }, [dispatch]);

  // 5. Define the colors for the categories
  const colors = {
    light: [
      "#ffd3e8", // soft pink
      "#f4dba5", // sand yellow
      "#55cfdf", // aqua
      "#ffb3b3", // light red
      "#a5c8ff", // light blue (matches #0d6efd)
      "#d0ffe3", // minty green
    ],
    dark: [
      "#0d6efd", // your main theme blue
      "#00bcd4", // cyan
      "#8e44ad", // deep purple
      "#e67e22", // orange
      "#2ecc71", // green
      "#e91e63", // pink-red
      "#ff5722", // vivid orange
      "#ffc107", // strong yellow
    ],
  };

  // 6. Return the categories, loading state, and colors
  return [categories, loading, colors];
};

// 7. Export the HomeCategoryHook to be used in other components
export default HomeCategoryHook;
