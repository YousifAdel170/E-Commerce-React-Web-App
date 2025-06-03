// Import Hooks from react, react-redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook"; // Custom notification hook

// Import Custom Actions
import { deleteRate } from "../../redux/actions/reviewAction"; // Import the action to delete the review

import { ERROR, SUCCESS } from "../../constants/notificationTypes";
import { EMPTY, USER_ROLES } from "../../constants/general";
import { GENERAL_MESSAGES } from "../../constants/messagesConstants";

// Import Used Configurations

// Custom hook to delete a review
const DeleteRateHook = (review, removeReview) => {
  // Dispatch hook to access Redux actions
  const dispatch = useDispatch();

  // State variables
  const [isUser, setIsUser] = useState(false); // Determines if the logged-in user is the one who wrote the review
  const [loading, setLoading] = useState(true); // Tracks loading state during the delete process

  // State to control the visibility of the delete modal
  const [showDelete, setShowDelete] = useState(false);

  // Functions to handle the modal (show and close)
  const handleDeleteClose = () => setShowDelete(false); // Close the delete modal
  const handleShowDelete = () => setShowDelete(true); // Show the delete modal

  // Get the logged-in user information from localStorage
  const user = JSON.parse(localStorage.getItem(USER_ROLES.USER));

  // Function to handle the delete action for the review
  const handleDelete = async () => {
    // Start the loading process
    setLoading(true);

    // Dispatch the deleteRate action to delete the review
    await dispatch(deleteRate(review?._id));

    // End the loading process
    setLoading(false);

    // Close the modal after the delete action
    handleDeleteClose();
  };

  // Check if the logged-in user is the same as the user who wrote the review
  useEffect(() => {
    if (user?._id === review?.user?._id) setIsUser(true);
  }, [user, review]);

  // Select the result of the delete action from the Redux store
  const result = useSelector((state) => state.reviewReducer.deleteReview);

  // UseEffect hook to handle the response of the delete action
  useEffect(() => {
    if (!loading) {
      // If the result is empty (successful deletion), notify the user
      if (result === EMPTY.TEXT) {
        notify(GENERAL_MESSAGES.DELETE_SUCCESSFULLY, SUCCESS); // Success notification
        // Remove the review from the local state
        removeReview(review?._id);
      } else {
        // If there was an error, notify the user
        notify(GENERAL_MESSAGES.DELETE_FAILED, ERROR); // Error notification
      }
      // Reset the loading state to true (ready for the next action)
      setLoading(true);
    }
  }, [loading, result, removeReview, review]);

  // Return the necessary state and functions for the component
  return [
    isUser, // Whether the logged-in user is the one who wrote the review
    handleShowDelete, // Function to show the delete modal
    handleDeleteClose, // Function to close the delete modal
    showDelete, // The state controlling whether the modal is shown or not
    handleDelete, // Function to handle the delete action
  ];
};

export default DeleteRateHook;
