// Import Hooks from react, react-redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook"; // Custom notification hook

// Import Custom Actions
import { deleteRate, resetState } from "../../redux/actions/reviewAction"; // Import the action to delete the review

import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { EMPTY } from "../../constants/general";
import { useTranslation } from "react-i18next";

// Import Used Configurations

// Custom hook to delete a review
const DeleteRateHook = (review) => {
  // Dispatch hook to access Redux actions
  const dispatch = useDispatch();
  const { t } = useTranslation("notification_messages");

  // State variables
  const [isPressDelete, setIsPressDelete] = useState(false); // Tracks loading state during the delete process

  // State to control the visibility of the delete modal
  const [showDelete, setShowDelete] = useState(false);

  // Select the result of the update action from the Redux store
  const { deletedReview } = useSelector((state) => state.reviewReducer);

  // Functions to handle the modal (show and close)
  const handleDeleteClose = () => setShowDelete(false); // Close the delete modal
  const handleShowDelete = () => setShowDelete(true); // Show the delete modal

  // Function to handle the delete action for the review
  const handleDelete = async () => {
    // Start the loading process
    setIsPressDelete(true);

    // Dispatch the deleteRate action to delete the review
    await dispatch(deleteRate(review?._id));
  };

  // UseEffect hook to handle the response of the delete action
  useEffect(() => {
    if (deletedReview && isPressDelete) {
      setIsPressDelete(false);
      // If the result is empty (successful deletion), notify the user
      if (deletedReview?.response === EMPTY.TEXT)
        notify(t("general.deleteSuccess"), NOTIFICATION_TYPES.SUCCESS); // Notify the user about the success
      else notify(t("general.deleteFail"), NOTIFICATION_TYPES.ERROR); // Notify the user about the success

      // Close the modal after the delete action
      handleDeleteClose();
      dispatch(resetState());
    }
  }, [deletedReview, dispatch, t, isPressDelete]);

  // Return the necessary state and functions for the component
  return [
    handleShowDelete, // Function to show the delete modal
    handleDeleteClose, // Function to close the delete modal
    showDelete, // The state controlling whether the modal is shown or not
    handleDelete, // Function to handle the delete action
    isPressDelete,
  ];
};

export default DeleteRateHook;
