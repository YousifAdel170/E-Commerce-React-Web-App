// Import Hooks From React Redux and React
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

// Import Actions from Redux
import { getAllProducts } from "../../redux/actions/productsAction";

// Import Custom Hooks To Detect Internet Connection
import internetDetect from "../Utility/useInternetConnectionHook";
import { PAGE_PRODUCTS_HOME_LIMIT } from "../../config";

// Hook Responsible for fetching the products data and returning it to the component
const ViewHomeProductsHook = () => {
  // 1. Use Dispatch to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // 2. Use useEffect to fetch the products data when the component mounts
  useEffect(() => {
    // Check if the internet connection is available and then fetch the products data
    internetDetect();

    // Function to fetch the products data
    const getData = async () =>
      await dispatch(getAllProducts(PAGE_PRODUCTS_HOME_LIMIT));

    // Call the function to fetch the products data
    getData();
  }, [dispatch]);

  // 3. Use useSelector to get the products data from the Redux store
  const products = useSelector((state) => state.allProduct.viewProducts);

  // 4. Use useSelector to get the items data from the Redux store
  const items = useMemo(() => {
    if (products && products.data) return products.data.slice(0, 4);
    else return [];
  }, [products]);

  // 5. Return the items data to the component
  return [items];
};

// Export the ViewHomeProductsHook as default
export default ViewHomeProductsHook;
