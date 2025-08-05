// Import Hooks from react, react-redux, react-router-dom and react-i18next
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook";

// Import Custom Actions
import { resetPassword } from "../../redux/actions/authAction";

// Import Used Constants
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { CONSTRAINTS } from "../../constants/length";
import { REGEX_PATTERNS } from "../../constants/validationPatterns";
import { INPUT_NAMES } from "../../constants/inputs";
import { EMPTY } from "../../constants/general";
import { STORAGE_KEYS } from "../../constants/storage";
import { isApiStatus, STATUS_TYPES } from "../../constants/responseStatus";
import { ROUTES } from "../../constants/routes";
import { DELAYS } from "../../constants/delays";

// Hook responsible for handling reset password functionality
const ResetPasswordHook = () => {
  // Redux dispatch for actions and navigation hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // i18n translation function scoped to notification messages
  const { t } = useTranslation("notification_messages");

  /* States to store form data */
  const [password, setPassword] = useState(EMPTY.TEXT);
  const [confirmPassword, setComfirmPassword] = useState(EMPTY.TEXT);
  const [isPress, setIsPress] = useState(false);

  // Password rules state to track strength requirements dynamically
  const [passwordRules, setPasswordRules] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  /**
   * Checks password against strength rules using regex patterns,
   * updates passwordRules state accordingly.
   *
   * @param {string} pwd - Password string to validate
   */
  const checkPasswordRules = (pwd) => {
    setPasswordRules({
      minLength: pwd.length >= CONSTRAINTS.PASSWORD_MIN_LENGTH,
      hasUpperCase: REGEX_PATTERNS.PASSWORD.RULES.UPPERCASE.test(pwd),
      hasLowerCase: REGEX_PATTERNS.PASSWORD.RULES.LOWERCASE.test(pwd),
      hasNumber: REGEX_PATTERNS.PASSWORD.RULES.NUMBER.test(pwd),
      hasSpecialChar: REGEX_PATTERNS.PASSWORD.RULES.SPECIAL_CHAR.test(pwd),
    });
  };

  /**
   * General handler for all input changes based on input name.
   * Updates the corresponding state variable.
   * For password, it also triggers password strength validation.
   *
   * @param {Object} e - Input change event
   * @param {string} name - Input field name to determine state update
   */
  const onChangeInput = (e, name) => {
    switch (name) {
      case INPUT_NAMES.PASSWORD:
        setPassword(e.target.value);
        checkPasswordRules(e.target.value);
        break;
      case INPUT_NAMES.CONFIRM_PASSWORD:
        setComfirmPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  /**
   * Validates all form inputs before submitting reset password.
   * Displays warnings for invalid or missing inputs.
   *
   * @returns {boolean} - true if all inputs are valid, false otherwise
   */
  const validateInputs = () => {
    // Password required and strength validation
    if (password === EMPTY.TEXT) {
      notify(t("validation.passwordRequired"), NOTIFICATION_TYPES.WARNING);
      return false;
    } else if (!REGEX_PATTERNS.PASSWORD.FULL.test(password)) {
      notify(t("validation.passwordWeak"), NOTIFICATION_TYPES.WARNING);
      return false;
    }

    // Password confirmation match validation
    if (confirmPassword !== password) {
      notify(t("validation.passwordMismatch"), NOTIFICATION_TYPES.WARNING);
      return false;
    }

    // All validations passed
    return true;
  };

  /**
   * Handles form submission for reset password.
   * Performs validation and dispatches createNewUser action if valid.
   * Manages loading state to disable UI and show notifications.
   *
   * @param {Object} e - Form submit event
   */
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Validate inputs before submission
    if (!validateInputs()) return;

    // Start The Reset The Password [Loading ON]
    setIsPress(true);
    await dispatch(
      resetPassword({
        email: localStorage.getItem(STORAGE_KEYS.LOCAL.AUTH.EMAIL),
        newPassword: password,
      })
    );
    setIsPress(false);
    // End The Reset The Password [Loading OFF]
  };

  // Redux selectors to get reset password result, loading state, and errors
  const result = useSelector((state) => state.authReducer.resetPassword);
  const loading = useSelector((state) => state.authReducer.loading.reset);
  const errors = useSelector((state) => state.authReducer.errors.reset);

  // useEffect to handle side effects after reset password action
  useEffect(() => {
    if (!loading && isPress) {
      if (!errors && isApiStatus(result?.status, STATUS_TYPES.SUCCESS)) {
        notify(t("success.resetPassword"), NOTIFICATION_TYPES.SUCCESS);
        setTimeout(() => navigate(ROUTES.AUTH.LOGIN), DELAYS.NAVIGATION_DELAY);
      } else notify(t("error.resetPassword"), NOTIFICATION_TYPES.ERROR);
    }
  }, [loading, navigate, result, t, isPress, errors]);

  return [
    password,
    confirmPassword,
    onChangeInput,
    handleSubmit,
    passwordRules,
    isPress,
  ];
};

export default ResetPasswordHook;
