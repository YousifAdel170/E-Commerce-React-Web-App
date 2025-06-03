// Import necessary hooks from react and react-router-dom
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For extracting parameters from the URL

// Import custom hook to fetch all product ratings
import ViewAllRatesHook from "../../hooks/review/ViewAllRatesHook";

// Hook Responsible to handle the Rate Container Component
const RateContainerHook = () => {
  // Extract product ID from the URL using the useParams hook
  const { id } = useParams();

  // Fetch all rates using the custom hook
  const [allRates, onPress] = ViewAllRatesHook(id);

  // Local state to hold reviews fetched from the hook
  const [reviews, setReviews] = useState(allRates?.data || []);

  /**
   * Remove a review from the state by filtering out the review with the given ID
   * @param {string} id - The ID of the review to remove
   */
  const removeReview = (id) =>
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review?._id !== id)
    );

  // Sync the reviews state whenever new data is fetched from the hook
  useEffect(() => {
    setReviews(allRates?.data || []);
  }, [allRates]); // Re-run this effect whenever `allRates` changes

  /**
   * Update a review in the state by matching the review ID
   * @param {string} reviewID - The ID of the review to update
   * @param {object} updatedReview - The updated review data
   */
  const updateReviews = (reviewID, updatedReview) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review._id === reviewID ? { ...review, ...updatedReview } : review
      )
    );
  };

  /**
   * Add a new review to the state by prepending it to the existing reviews
   * @param {object} newReview - The new review to add
   */
  const addReview = (newReview) =>
    setReviews((prevReviews) => [newReview, ...prevReviews]);

  // Return the reviews, and functions to add, update, and remove reviews along with allRates and pagination handler
  return [reviews, addReview, updateReviews, removeReview, allRates, onPress];
};

export default RateContainerHook;
