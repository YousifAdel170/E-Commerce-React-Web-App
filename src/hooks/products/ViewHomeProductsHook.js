// Import Hooks From React Redux and React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Hook Responsible for fetching the products data and returning it to the component
const ViewHomeProductsHook = () => {
  // 1. Use Dispatch to dispatch actions to the Redux store

  // State to store products to display it in the home, loading
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Use useSelector to get the products data from the Redux store
  const { viewProducts, loading } = useSelector((state) => state.allProduct);

  useEffect(() => {
    if (!loading?.fetchAll) {
      if (viewProducts) setItems(viewProducts?.data.slice(0, 4));
      else setItems([]);
      setIsLoading(false);
    } else setIsLoading(true);
  }, [loading, viewProducts]);

  // 5. Return the items data to the component
  return [items, isLoading];
};

// Export the ViewHomeProductsHook as default
export default ViewHomeProductsHook;
