// Import necessary hooks from react, react-redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook"; // Custom hook for notifications

import { EMPTY, STATUS, ZERO } from "../../constants/general";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { resetState, updateRate } from "../../redux/actions/reviewAction";
import { useTranslation } from "react-i18next";

// Custom hook to update the review rate
const UpdateRateHook = (review) => {
  // Use Dispatch to interact with Redux actions
  const dispatch = useDispatch();

  // State variables to handle review and UI state
  const [newRateText, setNewRateText] = useState(""); // Holds the new review text entered by the user
  const [newRateValue, setNewRateValue] = useState(0); // Holds the new rating value (e.g., 1-5 stars)
  const [isPressEdit, setIsPressEdit] = useState(false); // Tracks the loading state during the update process
  const [showEdit, setShowEdit] = useState(false); // Controls the visibility of the edit modal

  // Select the result of the update action from the Redux store
  const { updatedReview, loading } = useSelector(
    (state) => state.reviewReducer,
  );

  const { t } = useTranslation("notification_messages");

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
    if (newRateValue === ZERO)
      return notify(t("review.enterRating"), NOTIFICATION_TYPES.WARNING); // Notify user to enter a rating

    if (newRateText === EMPTY.TEXT)
      return notify(t("review.enterComment"), NOTIFICATION_TYPES.WARNING); // Notify user to enter a review comment

    // Set loading to true while the review is being updated
    setIsPressEdit(true);

    // Dispatch the updateRate action to update the review in the backend
    await dispatch(
      updateRate(review?._id, {
        review: newRateText, // New review text entered by the user
        rating: newRateValue, // New rating value (e.g., number of stars)
      }),
    );
  };

  // Effect hook to handle the response from the update action
  useEffect(() => {
    if (!loading?.update && isPressEdit) {
      setIsPressEdit(false);
      // Check if the update was successful (status code 200)
      if (updatedReview?.status === STATUS.SUCCESS_OK)
        notify(t("general.updateSuccess"), NOTIFICATION_TYPES.SUCCESS); // Notify the user about the success
      // Notify failure if the update was not successful
      else notify(t("general.updateFail"), NOTIFICATION_TYPES.ERROR);

      // Reset loading to true for future actions
      dispatch(resetState());

      // Close the edit modal once the update is complete
      handleCloseEdit();
    }
  }, [
    loading,
    updatedReview,
    newRateText,
    newRateValue,
    review,
    dispatch,
    isPressEdit,
    t,
  ]);

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
    isPressEdit,
  ];
};

export default UpdateRateHook;
