// Import Hooks From react, react-redux
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook";

// Import Actions
import { createReview } from "../../redux/actions/reviewAction";
import { ERROR, SUCCESS, WARNING } from "../../constants/notificationTypes";
import { EMPTY, STATUS, USER_ROLES, ZERO } from "../../constants/general";
import { REVIEW_MESSAGES } from "../../constants/messagesConstants";

// Import Used Configuration

/**
 * Custom hook to handle adding a review for a product.
 * This hook manages the rate value, rate text, and loading state,
 * and it interacts with Redux to dispatch actions and handle the review creation process.
 */
const AddRateHook = (id, addReview) => {
  // Use Dispatch to tell Redux that you will use actions
  const dispatch = useDispatch();

  // State hooks to manage the rate value, rate text, and loading state
  const [rateText, setRateText] = useState(EMPTY.TEXT); // Rate text input
  const [rateValue, setRateValue] = useState(ZERO); // Rate value (numeric score)
  const [loading, setLoading] = useState(false); // Loading state while submitting review

  /**
   * Handle the change of the rate text input.
   * @param {Object} e - The event object from the text input change
   */
  const onChangeRateText = (e) => setRateText(e.target.value);

  /**
   * Handle the change of the rate value (rating).
   * @param {number} e - The new rating value
   */
  const onChangeRateValue = (e) => setRateValue(e);

  // Retrieve user data from localStorage using useMemo (memoized for optimization)
  const user = useMemo(() => {
    if (localStorage.getItem(USER_ROLES.USER) != null)
      return JSON.parse(localStorage.getItem(USER_ROLES.USER));
    else return null;
  }, []);

  // Retrieve the user's name from the user object, if available
  const userName = useMemo(() => {
    if (user) return user.name;
    else return EMPTY.TEXT;
  }, [user]);

  /**
   * Handle the form submission to add a new review.
   * This function performs validation and dispatches the action to create the review.
   */
  const handleSubmit = async () => {
    // Check if the rating value is zero
    if (rateValue === ZERO) {
      notify(REVIEW_MESSAGES.ENTER_RATING, WARNING);
      return;
    }

    // Check if the rate text is empty
    if (rateText === EMPTY.TEXT) {
      notify(REVIEW_MESSAGES.ENTER_COMMENT, WARNING);
      return;
    }

    // Set loading state to true while processing
    setLoading(true);

    // Dispatch the action to create the review
    await dispatch(
      createReview(id, {
        review: rateText,
        rating: rateValue,
      })
    );

    // Set loading state back to false once the action is complete
    setLoading(false);
  };

  // Get the result of the review creation action from the Redux store
  const result = useSelector((state) => state.reviewReducer.createReview);

  // Use effect to handle side effects once the review creation is complete
  useEffect(() => {
    // Check if the creation process is complete and loading is false
    if (!loading && result) {
      // Handle error if the admin is trying to rate
      if (result?.status === STATUS.FORBIDDEN)
        notify(REVIEW_MESSAGES.ADMIN_RESTRICTED, ERROR);
      // Handle error if the user has already rated the product
      else if (result?.status === STATUS.BAD_REQUEST)
        notify(REVIEW_MESSAGES.ALREADY_RATED, ERROR);
      // If the review is successfully added
      else if (
        result?.status === STATUS.SUCCESS_OK ||
        result?.status === STATUS.SUCCESS_CREATED
      ) {
        notify(REVIEW_MESSAGES.ADD_SUCCESS, SUCCESS); // Notify success

        // Extract the review data from the result
        const review = result.data.data;

        // Add the new review to the list using the addReview function passed as a prop
        addReview({
          ...review,
          user: {
            name: user?.name || "مستخدم", // Fallback if user name is missing
            _id: user?._id,
          },
        });

        // Reset the form fields after successful submission
        setRateText(EMPTY.TEXT);
        setRateValue("0");
      }
      // Set loading back to true to prevent multiple submissions
      setLoading(true);
    }
  }, [loading, result, addReview, user]);

  // Return the necessary values and functions to manage the review process
  return [
    rateText,
    onChangeRateText,
    onChangeRateValue,
    userName,
    handleSubmit,
  ];
};

export default AddRateHook;
