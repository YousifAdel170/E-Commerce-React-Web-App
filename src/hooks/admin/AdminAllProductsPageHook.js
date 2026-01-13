// ================================
//  Import Hooks from react, redux
// ================================
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// ================================
// Import Actions
// ================================
import {
  getAllProducts,
  getAllProductsInSelectedPage,
} from "../../redux/actions/productsAction";

// ================================
// Import Constants
// ================================
import { PAGE_PRODUCTS_LIMIT } from "../../constants/pageLimits";

// ================================
// Admin All Products Page Hook
// ================================
const AdminAllProductsPageHook = () => {
  // Use Dispatch to call redux actions
  const dispatch = useDispatch();

  // Get products data from redux store
  const { viewProducts, loading } = useSelector((state) => state.allProduct);

  const [isLoading, setIsLoading] = useState(true);

  // 4. Fetch products data when the component mounts
  useEffect(() => {
    // Fetch the Data from the Api Only If Not Already Loaded
    const getData = async () =>
      await dispatch(getAllProducts(PAGE_PRODUCTS_LIMIT));

    // Call the function to fetch products data
    getData();
  }, [dispatch]);

  // 4. Memoize the products data to avoid unnecessary re-renders
  const pageCount = useMemo(() => {
    return viewProducts?.paginationResult?.numberOfPages || 0;
  }, [viewProducts]);

  // 5. Effect to set the loading state based on the loading state from redux
  useEffect(() => {
    if (!loading?.fetchAll) setIsLoading(false);
    else setIsLoading(true);
  }, [loading, viewProducts]);

  // 6. Function to fetch products data in the selected page
  const getSelectedPageNumber = async (selectedPage) =>
    await dispatch(
      getAllProductsInSelectedPage(PAGE_PRODUCTS_LIMIT, selectedPage)
    );

  // 7. Memoize the products data to avoid unnecessary re-renders
  const producstsData = useMemo(() => {
    return viewProducts?.data || [];
  }, [viewProducts]);

  // Return values and handlers
  return [producstsData, isLoading, pageCount, getSelectedPageNumber];
};

export default AdminAllProductsPageHook;
