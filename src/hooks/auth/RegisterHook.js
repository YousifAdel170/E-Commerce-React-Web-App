/* Importing necessary hooks from react, react-redux, react-router-dom and react-i18next */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Importing constants and actions */
import notify from "../../hooks/Utility/useNotifyHook"; // Notification hook for alerts
import { createNewUser } from "../../redux/actions/authAction"; // Action to register a new user

// Import Functions from libphonenumber
import {
  getExampleNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

// Import Constants
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { INPUT_NAMES } from "../../constants/inputs";
import { EMPTY, ZERO } from "../../constants/general";
import { OPERATORS } from "../../constants/operators";
import { REGEX_PATTERNS } from "../../constants/validationPatterns";
import { CONSTRAINTS } from "../../constants/length";
import {
  API_STATUS,
  isApiStatus,
  STATUS_TYPES,
} from "../../constants/responseStatus";
import { ROUTES } from "../../constants/routes";
import { DELAYS } from "../../constants/delays";
import { useGoogleLogin } from "@react-oauth/google";

/**
 * Custom hook for handling user registration logic.
 *
 * Manages:
 * - Form state for inputs: name, email, phone, password, confirmation password
 * - Validation logic for all inputs including password strength and phone format
 * - Dispatching registration action to Redux store
 * - Handling async loading state
 * - Showing localized notification messages for validation, errors, and success
 * - Navigating to login on successful registration
 *
 * @returns {Array} An array containing all form states, handlers, and status:
 * [
 *   name, email, phone, password, confirmationPassword,
 *   onChangeInput (handler),
 *   handleSubmit (handler),
 *   loading (boolean),
 *   onChangePhone (phone input handler),
 *   passwordRules (object of password strength booleans)
 * ]
 */
const RegisterHook = () => {
  // Redux dispatch for actions and navigation hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // i18n translation function scoped to notification messages
  const { t } = useTranslation("notification_messages");

  /* States to store form data */
  const [name, setName] = useState(EMPTY.TEXT);
  const [email, setEmail] = useState(EMPTY.TEXT);
  const [phone, setPhone] = useState(EMPTY.TEXT);
  const [password, setPassword] = useState(EMPTY.TEXT);
  const [confirmationPassword, setConfirmationPassword] = useState(EMPTY.TEXT);

  // Loading state to handle async registration process
  const [isPress, setIsPress] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);

  // Password rules state to track strength requirements dynamically
  const [passwordRules, setPasswordRules] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // Redux selectors
  const result = useSelector((state) => state.authReducer.createUser);
  const loading = useSelector((state) => state.authReducer.loading.register);
  const errors = useSelector((state) => state.authReducer.errors?.register);

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
      case INPUT_NAMES.NAME:
        setName(e.target.value);
        break;
      case INPUT_NAMES.EMAIL:
        setEmail(e.target.value);
        break;
      case INPUT_NAMES.PHONE:
        setPhone(e.target.value);
        break;
      case INPUT_NAMES.PASSWORD:
        setPassword(e.target.value);
        checkPasswordRules(e.target.value);
        break;
      case INPUT_NAMES.CONFIRM_PASSWORD:
        setConfirmationPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  /**
   * Specialized handler for phone input changes that normalizes
   * the phone number with country dial code and enforces length limits.
   * Utilizes libphonenumber-js for example number length per country.
   *
   * @param {string} value - The current phone input value
   * @param {Object} countryData - Country info including iso2 and dialCode
   */
  const onChangePhone = (value, countryData) => {
    if (!countryData || !value) {
      setPhone(value);
      return;
    }

    const iso2 = countryData.iso2?.toUpperCase(); // e.g., 'EG'
    const dialCode = countryData.dialCode || EMPTY.TEXT;

    // Normalize input by removing '+' symbol
    const normalizedValue = value.replace(
      OPERATORS.ARITHMETIC.PLUS,
      EMPTY.TEXT
    );
    const dialCodeLength = dialCode.length;

    // Extract national number part by removing dial code prefix if present
    let nationalNumber = normalizedValue.startsWith(dialCode)
      ? normalizedValue.slice(dialCodeLength)
      : normalizedValue;

    // Default max national number length
    let maxNationalLength = 15;

    // Attempt to get example number length for the country to set max length
    try {
      const example = getExampleNumber(iso2, "mobile");
      if (example) {
        maxNationalLength = example.nationalNumber.length;
      }
    } catch (e) {
      console.warn("Example number not found for", iso2 + " " + e);
    }

    // Enforce max national number length limit
    if (nationalNumber.length > maxNationalLength) {
      nationalNumber = nationalNumber.slice(ZERO, maxNationalLength);
    }

    // Construct full phone number including '+' and dial code
    const newPhone = OPERATORS.ARITHMETIC.PLUS + dialCode + nationalNumber;

    setPhone(newPhone);
  };

  /**
   * Validates all form inputs before submitting registration.
   * Displays warnings for invalid or missing inputs.
   *
   * @returns {boolean} - true if all inputs are valid, false otherwise
   */
  const validateInputs = () => {
    // Username required validation
    if (name === EMPTY.TEXT) {
      notify(t("validation.usernameRequired"), NOTIFICATION_TYPES.WARNING);
      return false;
    }

    // Email required and format validation
    if (email === EMPTY.TEXT) {
      notify(t("validation.emailRequired"), NOTIFICATION_TYPES.WARNING);
      return false;
    } else if (!REGEX_PATTERNS.EMAIL.test(email)) {
      notify(t("validation.emailInvalid"), NOTIFICATION_TYPES.WARNING);
      return false;
    }

    // Phone required and format validation
    if (!phone) {
      notify(t("validation.phoneRequired"), NOTIFICATION_TYPES.WARNING);
      return false;
    }
    const phoneNumber = parsePhoneNumberFromString(phone);
    if (!phoneNumber || !phoneNumber.isValid()) {
      notify(t("validation.phoneInvalid"), NOTIFICATION_TYPES.WARNING);
      return false;
    }

    // Password required and strength validation
    if (password === EMPTY.TEXT) {
      notify(t("validation.passwordRequired"), NOTIFICATION_TYPES.WARNING);
      return false;
    } else if (!REGEX_PATTERNS.PASSWORD.FULL.test(password)) {
      notify(t("validation.passwordWeak"), NOTIFICATION_TYPES.WARNING);
      return false;
    }

    // Password confirmation match validation
    if (confirmationPassword !== password) {
      notify(t("validation.passwordMismatch"), NOTIFICATION_TYPES.WARNING);
      return false;
    }

    // All validations passed
    return true;
  };

  /**
   * Handles form submission for registration.
   * Performs validation and dispatches createNewUser action if valid.
   * Manages loading state to disable UI and show notifications.
   *
   * @param {Object} e - Form submit event
   */
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Validate inputs before submission
    if (!validateInputs()) return;

    // Dispatch registration and update loading state
    setIsPress(true);
    await dispatch(
      createNewUser({
        name,
        email,
        password,
        passwordConfirm: confirmationPassword,
        phone,
      })
    );
    setIsPress(false);
  };

  // Google login handler
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLogin(true);
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const data = await res.json();
        // Register logic with data.email and data.sub as fallback password
        await dispatch(
          createNewUser({
            name: data.name || "Google User",
            email: data.email,
            password: data.sub,
            passwordConfirm: data.sub,
            phone: "+201000000000", // Optional: Google doesn’t provide phone, so use default
          })
        );

        notify(t("success.register"), NOTIFICATION_TYPES.SUCCESS);
        setTimeout(() => navigate(ROUTES.AUTH.LOGIN), DELAYS.NAVIGATION_DELAY);
      } catch (error) {
        notify("Google registration failed" + error, NOTIFICATION_TYPES.ERROR);
      } finally {
        setIsGoogleLogin(false);
      }
    },
    onError: () => {
      notify("Google login failed", NOTIFICATION_TYPES.ERROR);
      setIsGoogleLogin(false);
    },
  });

  /**
   * Effect hook to monitor loading, result, and errors.
   * Displays notifications for errors or success.
   * On success, stores token and navigates to login page.
   */
  useEffect(() => {
    if (!loading && isPress) {
      if (!errors && isApiStatus(result?.status, STATUS_TYPES.SUCCESS)) {
        notify(t("success.register"), NOTIFICATION_TYPES.SUCCESS);
        setTimeout(() => navigate(ROUTES.AUTH.LOGIN), DELAYS.NAVIGATION_DELAY);
      } else if (isApiStatus(errors?.status, STATUS_TYPES.FAILURE)) {
        const message = errors?.data?.errors[0]?.msg;
        console.log("message");
        if (message === API_STATUS.KNOWN_MESSAGES.EMAIL_ALREADY_USED)
          notify(t("backendErrors.emailAlreadyUsed"), NOTIFICATION_TYPES.ERROR);
        else if (message === API_STATUS.KNOWN_MESSAGES.EGYPT_NUMBERS_ONLY)
          notify(t("backendErrors.egyptNumbersOnly"), NOTIFICATION_TYPES.ERROR);
        else if (message === API_STATUS.KNOWN_MESSAGES.PASSWORD_VALIDATION)
          notify(
            t("backendErrors.passwordValidation"),
            NOTIFICATION_TYPES.ERROR
          );
      } else if (isApiStatus(errors?.status, STATUS_TYPES.UNAUTHORIZED))
        notify(t("backendErrors.unauthorized"), NOTIFICATION_TYPES.ERROR);
      else if (isApiStatus(errors?.status, STATUS_TYPES.FORBIDDEN))
        notify(t("backendErrors.forbidden"), NOTIFICATION_TYPES.ERROR);
      else if (isApiStatus(errors?.status, STATUS_TYPES.NOT_FOUND))
        notify(t("backendErrors.notFound"), NOTIFICATION_TYPES.ERROR);
      else if (isApiStatus(errors?.status, STATUS_TYPES.SERVER_ERROR))
        notify(t("backendErrors.server"), NOTIFICATION_TYPES.ERROR);
      else if (isApiStatus(errors?.status, STATUS_TYPES.NETWORK_ERROR))
        notify(t("backendErrors.network"), NOTIFICATION_TYPES.ERROR);
    }
  }, [loading, isPress, errors, result, navigate, t]);

  // Return all state variables and handlers for component use
  return [
    name,
    email,
    phone,
    password,
    confirmationPassword,
    onChangeInput,
    handleSubmit,
    loading,
    onChangePhone,
    passwordRules,
    googleLogin, // Add googleLogin handler to return array
    isGoogleLogin, // Add isGoogleLogin state to return array
  ];
};

export default RegisterHook; // Export the custom hook
