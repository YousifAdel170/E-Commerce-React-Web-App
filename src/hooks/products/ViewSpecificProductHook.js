// Import necessary hooks from react and redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // For dispatching actions and selecting from Redux store

// Import Custom Hook To check the internet connection
import internetDetect from "../Utility/useInternetConnectionHook"; // Custom hook to detect internet connection

// Import The Action To get the specific product details using its ID
import { getSpecificProduct } from "../../redux/actions/productsAction"; // Action to fetch product data

// Import Constants
import { EMPTY } from "../../constants/general";
import { useTranslation } from "react-i18next";

// Custom Hook to view a specific product by its productID
const ViewSpecificProductHook = (productID) => {
  // Initialize dispatch to interact with Redux actions
  const dispatch = useDispatch();
  const { t } = useTranslation("notification_messages");

  // Local state to store the fetched product data
  const [specificProduct, setSpecificProduct] = useState(EMPTY.ARRAY);

  // Fetch product data only once when the component mounts using its ID
  useEffect(() => {
    // 1. Check for internet connection before fetching product data
    internetDetect(t("error.internetConnectionProblem"));

    // 2. Dispatch the action to fetch the specific product based on productID
    const getData = async () => {
      if (productID) await dispatch(getSpecificProduct(productID));
    };

    // 3. Trigger the fetch operation
    getData();
  }, [dispatch, productID, t]); // Dependency array ensures the hook runs when `productID` or `dispatch` changes

  // Select the product details and loading state from the Redux store
  const { viewSpecificProduct, loading } = useSelector(
    (state) => state.allProduct
  );

  // Effect hook to set the fetched product data once loading is complete
  useEffect(() => {
    if (!loading?.fetchSpecific) {
      // If the product is fetched, store it in state; otherwise, set it to an empty array
      if (viewSpecificProduct?.data)
        setSpecificProduct(viewSpecificProduct?.data);
      else setSpecificProduct(EMPTY.ARRAY); // Clear state if no product found
    }
  }, [loading, viewSpecificProduct]); // Dependencies ensure this runs when loading or viewSpecificProduct changes

  // Return the fetched product data for use in other components
  return [specificProduct];
};

// Export the custom hook for use in components
export default ViewSpecificProductHook;
