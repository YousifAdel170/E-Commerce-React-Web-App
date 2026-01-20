// Import necessary hooks from react, react-redux
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Action to get all the rates for the product
import { getAllProductRates } from "../../redux/actions/reviewAction";

// Configuration constants for Rates
import {
  PAGE_NUMBER_PRODUCT_DETAILS_RATES,
  PRODUCT_DETAILS_RATES_LIMIT,
} from "../../constants/pageLimits";
import { useParams } from "react-router-dom";

// Custom Hook to fetch and view all product ratings based on the product id
const ViewAllRatesHook = () => {
  const dispatch = useDispatch(); // Initialize dispatch to interact with Redux actions

  // Extract product ID from the URL using the useParams hook
  const { id } = useParams();

  // Select all product ratings from the Redux store
  const { viewAllReviews, loading } = useSelector(
    (state) => state.reviewReducer,
  );

  // Get the logged-in user information from localStorage
  // const user = JSON.parse(localStorage.getItem(USER_ROLES.USER));

  // 3. Local state to manage the loading state of the component
  const [isLoading, setIsLoading] = useState(true);

  // Effect hook to fetch product ratings when the component mounts or when `id` changes
  useEffect(() => {
    // Function to fetch all product ratings for the given product `id`
    const getData = async () => {
      if (!id) return;

      if (!viewAllReviews)
        await dispatch(
          getAllProductRates(
            id,
            PAGE_NUMBER_PRODUCT_DETAILS_RATES,
            PRODUCT_DETAILS_RATES_LIMIT,
          ),
        );
    };

    // Call the function to fetch product ratings data
    getData();
  }, [dispatch, id, viewAllReviews]); // Dependency array ensures hook runs when `dispatch` or `id` changes

  // 4. Memoize the brands data to avoid unnecessary re-renders
  const pageCount = useMemo(() => {
    return viewAllReviews?.paginationResult?.numberOfPages || 0;
  }, [viewAllReviews]);

  // 5. Effect to set the loading state based on the loading state from redux
  useEffect(() => {
    setIsLoading(loading?.fetchAll);
  }, [loading]);

  //   // Check if the logged-in user is the same as the user who wrote the review
  // useEffect(() => {
  //   if (user?._id === review?.user?._id) setIsUser(true);
  //   else setIsUser(false);
  // }, [user, review]);

  const getSelectedPageNumber = async (selectedPage) =>
    await dispatch(
      getAllProductRates(id, selectedPage, PRODUCT_DETAILS_RATES_LIMIT),
    );

  // 7. Memoize the brands data to avoid unnecessary re-renders
  const RatesData = useMemo(() => {
    return viewAllReviews?.data || [];
  }, [viewAllReviews]);

  // Return the ratings data and the pagination handler function for use in components
  return [RatesData, isLoading, pageCount, getSelectedPageNumber];
};

// Export the custom hook for use in components
export default ViewAllRatesHook;
