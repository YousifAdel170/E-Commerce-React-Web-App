// Import necessary React and Redux hooks
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Used Actions
import {
  getAllBrand,
  getAllBrandInSelectedPage,
} from "../../redux/actions/brandAction";

// Import Used Configuration
import { PAGE_BRANDS_LIMIT } from "../../constants/pageLimits";

// Hook responsible to display all the brands
const AllBrandPageHook = () => {
  // 0. Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // 1. select all the result of the page (All Brands) using useSelector
  const { brand, loading } = useSelector((state) => state.allBrand);

  // 2. Local state to manage the loading state of the component
  const [isLoading, setLoading] = useState(true);

  // 3. Fetch The Data From the First Page When the Page Loaded
  useEffect(() => {
    // Function to fetch the data from the API only if not already loaded
    const getData = async () => await dispatch(getAllBrand(PAGE_BRANDS_LIMIT));

    // Call the function to fetch brands data
    getData();
  }, [dispatch]);

  // 4. Memoize the brands data to avoid unnecessary re-renders
  const pageCount = useMemo(() => {
    return brand?.paginationResult?.numberOfPages || 0;
  }, [brand]);

  // 5. update the loading state based on the loading state from redux
  useEffect(() => {
    if (!loading?.fetchAll) setLoading(false);
    else setLoading(true);
  }, [loading]);

  // 6. Function to fetch brands data in the selected page
  const getSelectedPageNumber = async (selectedPage) =>
    await dispatch(getAllBrandInSelectedPage(PAGE_BRANDS_LIMIT, selectedPage));

  // 7. Memoize the brands data to avoid unnecessary re-renders
  const brandsData = useMemo(() => {
    return brand?.data || [];
  }, [brand]);

  // 8. Fetch brands data only once when the component mounts
  return [brandsData, isLoading, pageCount, getSelectedPageNumber];
};

// 9. Export the hook to use it in the component
export default AllBrandPageHook;
