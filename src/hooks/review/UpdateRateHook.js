import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRate } from "../../redux/actions/reviewAction"; // Import action for updating review
import notify from "../Utility/useNotifyHook"; // Custom notification hook
import { ERROR, SUCCESS, WARNING } from "../../config"; // Constants for notification types

// Custom hook to update the review rate
const UpdateRateHook = (review, updateReviews) => {
  // Use Dispatch to access Redux actions
  const dispatch = useDispatch();

  // State variables
  const [newRateText, setNewRateText] = useState(""); // Holds the new review text
  const [newRateValue, setNewRateValue] = useState(0); // Holds the new rating value (e.g., 1-5 stars)
  const [loading, setLoading] = useState(true); // Loading state during the update process
  const [showEdit, setShowEdit] = useState(false); // Controls visibility of the edit modal

  // Function to close the edit modal
  const handleCloseEdit = () => setShowEdit(false);

  // Function to open the edit modal
  const handleShowEdit = () => setShowEdit(true);

  // Handler to update the review text
  const onChangeNewRateText = (e) => setNewRateText(e.target.value);

  // Handler to update the rating value
  const onChangeNewRateValue = (e) => setNewRateValue(e);

  // Function to handle updating the review when the user submits
  const handleUpdate = async () => {
    // Validate inputs: ensure a rating and comment are provided
    if (newRateValue === 0) {
      notify("من فضلك ادخل تقييم", WARNING); // Notify if no rating is provided
      return;
    }

    if (newRateText === "") {
      notify("من فضلك اكتب تعليق", WARNING); // Notify if no review text is provided
      return;
    }

    // Set loading state to true to indicate a pending update
    setLoading(true);

    // Dispatch action to update the review in the backend
    await dispatch(
      updateRate(review._id, {
        review: newRateText, // The new review text
        rating: newRateValue, // The new rating value
      })
    );

    // Set loading state to false once the action completes
    setLoading(false);

    // Close the edit modal after the update attempt
    handleCloseEdit();
  };

  // Select the response from the Redux store (the result of the update action)
  const result = useSelector((state) => state.reviewReducer.updateReview);

  // Effect hook to handle the response of the update action
  useEffect(() => {
    if (!loading) {
      // Check if the update was successful (status 200)
      if (result && result.status === 200) {
        notify("تم تعديل التقييم بنجاح", SUCCESS); // Notify success

        // Update the review list with the new data
        updateReviews(review._id, {
          review: newRateText,
          rating: newRateValue,
        });
      } else {
        // Notify failure if the update didn't succeed
        notify("هناك مشكله فى عملية التعديل", ERROR);
      }

      // Reset loading state to true (ready for the next action)
      setLoading(true);
    }
  }, [loading, result, updateReviews, newRateText, newRateValue, review]);

  // Return necessary values and functions to be used in the component
  return [
    newRateText, // The current review text
    newRateValue, // The current rating value
    onChangeNewRateText, // Function to handle review text change
    onChangeNewRateValue, // Function to handle rating value change
    handleShowEdit, // Function to show the edit modal
    handleCloseEdit, // Function to close the edit modal
    showEdit, // The state controlling whether the modal is shown or not
    handleUpdate, // Function to handle the update action
  ];
};

export default UpdateRateHook;
