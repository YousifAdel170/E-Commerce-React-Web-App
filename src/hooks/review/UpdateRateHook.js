// Import necessary hooks from react, react-redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook"; // Custom hook for notifications

// Import Custom Actions
import { updateRate } from "../../redux/actions/reviewAction"; // Action for updating the review

// // Constants for notification types
import { ERROR, SUCCESS, WARNING } from "../../config";

// Custom hook to update the review rate
const UpdateRateHook = (review, updateReviews) => {
  // Use Dispatch to interact with Redux actions
  const dispatch = useDispatch();

  // State variables to handle review and UI state
  const [newRateText, setNewRateText] = useState(""); // Holds the new review text entered by the user
  const [newRateValue, setNewRateValue] = useState(0); // Holds the new rating value (e.g., 1-5 stars)
  const [loading, setLoading] = useState(true); // Tracks the loading state during the update process
  const [showEdit, setShowEdit] = useState(false); // Controls the visibility of the edit modal

  // Function to close the edit modal
  const handleCloseEdit = () => setShowEdit(false);

  // Function to open the edit modal
  const handleShowEdit = () => setShowEdit(true);

  // Function to handle review text changes
  const onChangeNewRateText = (e) => setNewRateText(e.target.value);

  // Function to handle rating value changes
  const onChangeNewRateValue = (e) => setNewRateValue(e);

  // Function to handle the update process when the user submits the new review
  const handleUpdate = async () => {
    // Validate that both rating and review text are provided
    if (newRateValue === 0) {
      notify("من فضلك ادخل تقييم", WARNING); // Notify user to enter a rating
      return;
    }

    if (newRateText === "") {
      notify("من فضلك اكتب تعليق", WARNING); // Notify user to enter a review comment
      return;
    }

    // Set loading to true while the review is being updated
    setLoading(true);

    // Dispatch the updateRate action to update the review in the backend
    await dispatch(
      updateRate(review._id, {
        review: newRateText, // New review text entered by the user
        rating: newRateValue, // New rating value (e.g., number of stars)
      })
    );

    // After the action is completed, set loading to false
    setLoading(false);

    // Close the edit modal once the update is complete
    handleCloseEdit();
  };

  // Select the result of the update action from the Redux store
  const result = useSelector((state) => state.reviewReducer.updateReview);

  // Effect hook to handle the response from the update action
  useEffect(() => {
    if (!loading) {
      // Check if the update was successful (status code 200)
      if (result && result.status === 200) {
        notify("تم تعديل التقييم بنجاح", SUCCESS); // Notify the user about the success

        // Update the review list with the new review data
        updateReviews(review._id, {
          review: newRateText,
          rating: newRateValue,
        });
      } else {
        // Notify failure if the update was not successful
        notify("هناك مشكله فى عملية التعديل", ERROR);
      }

      // Reset loading to true for future actions
      setLoading(true);
    }
  }, [loading, result, updateReviews, newRateText, newRateValue, review]);

  // Return the necessary state and functions to be used in the component
  return [
    newRateText, // The current review text entered by the user
    newRateValue, // The current rating value
    onChangeNewRateText, // Function to handle review text changes
    onChangeNewRateValue, // Function to handle rating value changes
    handleShowEdit, // Function to show the edit modal
    handleCloseEdit, // Function to close the edit modal
    showEdit, // State variable controlling modal visibility
    handleUpdate, // Function to handle the update submission
  ];
};

export default UpdateRateHook;
