// Import Hooks From react, react-redux
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook";

// Import Actions
import { createReview, resetState } from "../../redux/actions/reviewAction";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import {
  EMPTY,
  STATUS,
  STATUS_MESSAGES,
  USER_ROLES,
  ZERO,
} from "../../constants/general";
import { useTranslation } from "react-i18next";

// Import Used Configuration

/**
 * Custom hook to handle adding a review for a product.
 * This hook manages the rate value, rate text, and loading state,
 * and it interacts with Redux to dispatch actions and handle the review creation process.
 */
const AddRateHook = (id) => {
  // Use Dispatch to tell Redux that you will use actions
  const dispatch = useDispatch();

  const { t } = useTranslation("notification_messages");

  // Selectors
  const loadingCreate = useSelector(
    (state) => state.reviewReducer.loading.create,
  );
  const errorCreate = useSelector((state) => state.reviewReducer.error.create);
  const result = useSelector((state) => state.reviewReducer.createdReview);

  // State hooks to manage the rate value, rate text, and loading state
  const [rateText, setRateText] = useState(EMPTY.TEXT); // Rate text input
  const [rateValue, setRateValue] = useState(ZERO); // Rate value (numeric score)
  const [isPress, setIsPress] = useState(false);

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
    return localStorage.getItem(USER_ROLES.USER) != null
      ? JSON.parse(localStorage.getItem(USER_ROLES.USER))
      : null;
  }, []);

  // Retrieve the user's name from the user object, if available
  const userName = useMemo(() => {
    return user ? user?.name : EMPTY.TEXT;
  }, [user]);

  /**
   * Handle the form submission to add a new review.
   * This function performs validation and dispatches the action to create the review.
   */
  const handleSubmit = async () => {
    // Check if the rating value is zero
    if (rateValue === ZERO)
      return notify(t("review.enterRating"), NOTIFICATION_TYPES.WARNING);

    // Check if the rate text is empty
    if (rateText === EMPTY.TEXT)
      return notify(t("review.enterComment"), NOTIFICATION_TYPES.WARNING);

    // Set loading state to true while processing
    setIsPress(true);

    // Dispatch the action to create the review
    await dispatch(
      createReview(id, {
        review: rateText,
        rating: rateValue,
      }),
    );
  };

  // Use effect to handle side effects once the review creation is complete
  useEffect(() => {
    // Check if the creation process is complete and loading is false
    if (!loadingCreate && isPress) {
      setIsPress(false);

      setRateText(EMPTY.TEXT);
      setRateValue(ZERO);

      // Handle error if the admin is trying to rate
      if (
        errorCreate &&
        errorCreate[0]?.msg === STATUS_MESSAGES.REVIEW_ALREADY_USED_BY_YOU
      ) {
        notify(t("review.alreadyRated"), NOTIFICATION_TYPES.ERROR);
        dispatch(resetState());
        return;
      }
      // Handle error if the user has already rated the product
      else if (
        (errorCreate &&
          errorCreate[0]?.msg === STATUS_MESSAGES.REVIEW_ADMIN_FORBIDDEN) ||
        (errorCreate && errorCreate === STATUS_MESSAGES.REQUEST_403)
      ) {
        notify(t("review.adminRestricted"), NOTIFICATION_TYPES.ERROR);
        dispatch(resetState());
        return;
      }

      if (
        result?.status === STATUS.SUCCESS_OK ||
        result?.status === STATUS.SUCCESS_CREATED
      )
        notify(t("review.success"), NOTIFICATION_TYPES.SUCCESS);
      else notify(t("review.error"), NOTIFICATION_TYPES.ERROR);

      dispatch(resetState());
    }
  }, [loadingCreate, result, isPress, t, errorCreate, dispatch]);

  // Return the necessary values and functions to manage the review process
  return [
    rateText,
    onChangeRateText,
    onChangeRateValue,
    userName,
    handleSubmit,
    isPress,
  ];
};

export default AddRateHook;
