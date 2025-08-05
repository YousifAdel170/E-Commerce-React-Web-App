// Import Hooks from react, react-redux, react-router-dom and react-i18next
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import custom hooks
import notify from "../Utility/useNotifyHook";

// Import custom Action
import { verifyPassword } from "../../redux/actions/authAction";

// Import Constants
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { EMPTY } from "../../constants/general";
import { isApiStatus, STATUS_TYPES } from "../../constants/responseStatus";
import { DELAYS } from "../../constants/delays";
import { ROUTES } from "../../constants/routes";

// Number of digits in the verification code
const CODE_LENGTH = 6;
/**
 * Custom hook to handle the verification of a password reset code.
 *
 * Manages:
 * - 6-digit input state with automatic focus control,
 * - paste event for bulk code entry,
 * - submission state and validation,
 * - side effects for success/error notifications and navigation,
 * - internationalized messages.
 *
 * @returns {Array} Array containing state, refs, handlers, and loading state:
 * [
 *   codeDigits: Array of digit strings,
 *   inputRefs: React ref array for inputs,
 *   onInputChange: handler for input change,
 *   onKeyDown: handler for key press events (backspace navigation),
 *   onPaste: handler for paste event,
 *   handleSubmit: form submission handler,
 *   isSubmitting: loading state boolean
 * ]
 */
const VerifyPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Translation function for localized notification messages
  const { t } = useTranslation("notification_messages");

  // Array of 6 digits representing the verification code inputs
  const [codeDigits, setCodeDigits] = useState(Array(CODE_LENGTH).fill(""));

  // Tracks if the form submission is in progress to control UI states
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs to input elements to programmatically focus inputs as user types or deletes
  const inputRefs = useRef([]);

  // Select verification result from Redux store after dispatching verifyPassword
  const result = useSelector((state) => state.authReducer.verifyPassword);
  const loading = useSelector((state) => state.authReducer.loading.verify);
  const errors = useSelector((state) => state.authReducer.errors.verify);

  /**
   * Handles digit input changes:
   * - Accepts only a single numeric character
   * - Updates the corresponding digit in state
   * - Automatically focuses the next input if available
   *
   * @param {Object} e - Input change event
   * @param {number} idx - Index of the input field being edited
   */
  const onInputChange = (e, idx) => {
    // Remove non-digit characters and limit to 1 character
    const val = e.target.value.replace(/\D/g, "").slice(0, 1);

    // Update state with new digit value at the specified index
    const updated = [...codeDigits];
    updated[idx] = val;
    setCodeDigits(updated);

    // If a digit was entered and not the last input, focus next input
    if (val && idx < CODE_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  /**
   * Handles key down events on inputs:
   * - Handles Backspace key to delete digits and move focus backward if empty
   *
   * @param {Object} e - Keyboard event
   * @param {number} idx - Index of the input field
   */
  const onKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (codeDigits[idx]) {
        // If current input has a value, clear it on backspace
        const updated = [...codeDigits];
        updated[idx] = EMPTY.TEXT;
        setCodeDigits(updated);
      } else if (idx > 0) {
        // If empty, move focus to previous input and clear it
        inputRefs.current[idx - 1]?.focus();
        const updated = [...codeDigits];
        updated[idx - 1] = EMPTY.TEXT;
        setCodeDigits(updated);
      }
    }
  };

  /**
   * Handles paste event on the input group:
   * - Extracts numeric characters only from pasted content
   * - Distributes them into the input fields
   * - Sets focus to the next empty input after pasted content
   *
   * @param {Object} e - Clipboard event
   */
  const onPaste = (e) => {
    // Get pasted text, remove non-digit characters, limit to CODE_LENGTH
    const paste = e.clipboardData
      .getData("Text")
      .replace(/\D/g, EMPTY.TEXT)
      .slice(0, CODE_LENGTH);
    if (paste.length === 0) return;

    // Prepare new codeDigits array and fill with pasted digits
    const updated = Array(CODE_LENGTH).fill(EMPTY.TEXT);
    for (let i = 0; i < paste.length; i++) {
      updated[i] = paste[i];
    }
    setCodeDigits(updated);

    // Focus the input after the last pasted digit or the last input if full
    const nextIndex = Math.min(paste.length, CODE_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  /**
   * Handles form submission:
   * - Validates full 6-digit code entered
   * - Dispatches verification action with the code
   * - Manages submission loading state
   *
   * @param {Object} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Join digits to form full code string
    const code = codeDigits.join(EMPTY.TEXT);

    // Validate that code is complete
    if (!code || code.length < CODE_LENGTH) {
      notify(t("verify.required"), NOTIFICATION_TYPES.ERROR);
      return;
    }

    // Dispatch verification action and update loading state
    setIsSubmitting(true);
    await dispatch(verifyPassword({ resetCode: code }));
    setIsSubmitting(false);
  };

  /**
   * Effect to react to changes in the verification result or submission state:
   * - Shows notifications for success or error statuses
   * - Navigates to reset password page upon success after delay
   */
  useEffect(() => {
    if (!loading && isSubmitting) {
      // Success case: code verified correctly
      if (!errors && isApiStatus(result?.status, STATUS_TYPES.SUCCESS)) {
        notify(t("verify.success"), NOTIFICATION_TYPES.SUCCESS);
        setTimeout(
          () => navigate(ROUTES.AUTH.RESET_PASSWORD),
          DELAYS.NAVIGATION_DELAY
        );
      }
      // Failure case: invalid or expired code
      else if (isApiStatus(errors?.status, STATUS_TYPES.FAILURE)) {
        notify(t("verify.failure"), NOTIFICATION_TYPES.ERROR);
      }
      // Unauthorized access case
      else if (isApiStatus(errors?.status, STATUS_TYPES.UNAUTHORIZED)) {
        notify(t("backendErrors.unauthorized"), NOTIFICATION_TYPES.ERROR);
      }
      // Forbidden access case
      else if (isApiStatus(errors?.status, STATUS_TYPES.FORBIDDEN)) {
        notify(t("backendErrors.forbidden"), NOTIFICATION_TYPES.ERROR);
      }
      // Resource not found case
      else if (isApiStatus(errors?.status, STATUS_TYPES.NOT_FOUND)) {
        notify(t("backendErrors.notFound"), NOTIFICATION_TYPES.ERROR);
      }
      // Server error case
      else if (isApiStatus(errors?.status, STATUS_TYPES.SERVER_ERROR)) {
        notify(t("backendErrors.server"), NOTIFICATION_TYPES.ERROR);
      }
      // Network error case
      else if (isApiStatus(errors?.status, STATUS_TYPES.NETWORK_ERROR)) {
        notify(t("backendErrors.network"), NOTIFICATION_TYPES.ERROR);
      }
    }
  }, [isSubmitting, result, navigate, t, errors, loading]);

  // Return all necessary handlers and state for component usage
  return [
    codeDigits,
    inputRefs,
    onInputChange,
    onKeyDown,
    onPaste,
    handleSubmit,
    isSubmitting,
  ];
};

export default VerifyPasswordHook;
