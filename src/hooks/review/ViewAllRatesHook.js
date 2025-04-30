// Import necessary hooks from react, react-redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Action to get all the rates for the product
import { getAllProductRates } from "../../redux/actions/reviewAction";

// Configuration constants for Rates
import {
  PAGE_NUMBER_PRODUCT_DETAILS_RATES,
  PRODUCT_DETAILS_RATES_LIMIT,
} from "../../config";

// Custom Hook to fetch and view all product ratings based on the product id
const ViewAllRatesHook = (id) => {
  const dispatch = useDispatch(); // Initialize dispatch to interact with Redux actions

  // Effect hook to fetch product ratings when the component mounts or when `id` changes
  useEffect(() => {
    // Function to fetch all product ratings for the given product `id`
    const getData = async () =>
      await dispatch(
        getAllProductRates(
          id,
          PAGE_NUMBER_PRODUCT_DETAILS_RATES,
          PRODUCT_DETAILS_RATES_LIMIT
        )
      );

    // Call the function to fetch product ratings data
    getData();
  }, [dispatch, id]); // Dependency array ensures hook runs when `dispatch` or `id` changes

  // Select all product ratings from the Redux store
  const allRates = useSelector((state) => state.reviewReducer.getAllReviews);

  // Function to handle pagination when the user navigates to a different page of ratings
  const onPress = async (page) =>
    await dispatch(getAllProductRates(id, page, PRODUCT_DETAILS_RATES_LIMIT));

  // Return the ratings data and the pagination handler function for use in components
  return [allRates, onPress];
};

// Export the custom hook for use in components
export default ViewAllRatesHook;
