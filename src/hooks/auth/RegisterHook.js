/* Importing necessary hooks from react, react-redux */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Importing constants and actions */
import notify from "../../hooks/Utility/useNotifyHook"; // Notification hook for alerts
import { createNewUser } from "../../redux/actions/authAction"; // Action to register a new user
import { useNavigate } from "react-router-dom"; // Hook for navigation
import {
  CONFIRMATION_PASSWORD_TYPE,
  EMAIL_TYPE,
  NAME_TYPE,
  PASSWORD_TYPE,
  PHONE_TYPE,
} from "../../constants/inputTypes";
import { ERROR, SUCCESS, WARNING } from "../../constants/notificationTypes";
import {
  BACKEND_ERROR_MESSAGES,
  EMAIL_INVALID_MESSAGE,
  EMAIL_REQUIRED_MESSAGE,
  MULTIPLE_ERRORS_MESSAGE,
  PASSWORD_CONFIRMATION_MISMATCH_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
  PASSWORD_WEAK_MESSAGE,
  PHONE_INVALID_MESSAGE,
  REGISTRATION_FAILURE_MESSAGE,
  USERNAME_REQUIRED_MESSAGE,
} from "../../constants/messagesConstants";

// Custom Hook for handling user registration
const RegisterHook = () => {
  // Use Dispatch to handle actions from redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* States to store form data */
  const [name, setName] = useState(""); // Name input state
  const [email, setEmail] = useState(""); // Email input state
  const [phone, setPhone] = useState(""); // Phone input state
  const [password, setPassword] = useState(""); // Password input state
  const [confirmationPassword, setConfirmationPassword] = useState(""); // Confirmation password input state
  const [loading, setLoading] = useState(true); // Loading state to handle async operations

  // Function to handle the change of input fields
  const onChangeInput = (e, type) => {
    switch (type) {
      case NAME_TYPE:
        setName(e.target.value); // Update name state
        break;
      case EMAIL_TYPE:
        setEmail(e.target.value); // Update email state
        break;
      case PHONE_TYPE:
        setPhone(e.target.value); // Update phone state
        break;
      case PASSWORD_TYPE:
        setPassword(e.target.value); // Update password state
        break;
      case CONFIRMATION_PASSWORD_TYPE:
        setConfirmationPassword(e.target.value); // Update confirmation password state
        break;
      default:
    }
  };

  // Function to validate inputs before submitting the form
  const validateInputs = () => {
    // Validate Username
    if (name === "") {
      notify(USERNAME_REQUIRED_MESSAGE, WARNING); // Notify if name is empty
      return false; // Stop the form submission
    }

    // Validate Email Address
    if (email === "") {
      notify(EMAIL_REQUIRED_MESSAGE, WARNING); // Notify if email is empty
      return false; // Stop the form submission
    } else {
      // Check if the email is in a valid format
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
        notify(EMAIL_INVALID_MESSAGE, WARNING); // Notify if email format is invalid
        return false; // Stop the form submission
      }
    }

    // Validate Phone Number
    if (phone.length <= 10) {
      notify(PHONE_INVALID_MESSAGE, WARNING); // Notify if phone number is invalid
      return false; // Stop the form submission
    }

    // Validate Password
    if (password === "") {
      notify(PASSWORD_REQUIRED_MESSAGE, WARNING); // Notify if password is empty
      return false; // Stop the form submission
    } else {
      // Check if password is strong enough
      if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        notify(PASSWORD_WEAK_MESSAGE, WARNING); // Notify if password is weak
        return false; // Stop the form submission
      }
    }

    // Validate Password Confirmation
    if (confirmationPassword !== password) {
      notify(PASSWORD_CONFIRMATION_MISMATCH_MESSAGE, WARNING); // Notify if passwords don't match
      return false; // Stop the form submission
    }

    return true; // All validations passed, proceed with submission
  };

  // Selector to get registration result, errors if there from redux store
  const result = useSelector((state) => state.authReducer.createUser);
  const errors = useSelector((state) => state.authReducer.errors);

  // Function to submit the form and register a new user
  const handleSubmit = async () => {
    // Validate Inputs Before Submit
    if (!validateInputs()) return; // Stop if validation fails

    // Start the registration process (Loading ON) and dispatch the action to create a new user
    setLoading(true);
    await dispatch(
      createNewUser({
        name,
        email,
        password,
        passwordConfirm: confirmationPassword,
        phone,
      })
    );
    setLoading(false);
    // End the registration process (Loading OFF)
  };

  // Run when the loading state changes
  useEffect(() => {
    if (!loading) {
      if (errors) {
        if (errors.errors && Array.isArray(errors.errors)) {
          if (errors.errors.length === 1) {
            switch (errors.errors[0].msg) {
              case BACKEND_ERROR_MESSAGES.EMAIL_ALREADY_USED:
                notify(BACKEND_ERROR_MESSAGES.EMAIL_ALREADY_USED, ERROR);
                break;
              case BACKEND_ERROR_MESSAGES.EGYPT_NUMBERS_ONLY:
                notify(BACKEND_ERROR_MESSAGES.EGYPT_NUMBERS_ONLY, ERROR);
                break;
              case BACKEND_ERROR_MESSAGES.PASSWORD_VALIDATION:
                notify(BACKEND_ERROR_MESSAGES.PASSWORD_VALIDATION, ERROR);
                break;
              default:
                notify(errors.errors[0].msg, ERROR);
            }
          } else {
            notify(MULTIPLE_ERRORS_MESSAGE, ERROR);
          }
        } else notify(REGISTRATION_FAILURE_MESSAGE, ERROR);

        return;
      }

      if (result && result.data && result.data.token) {
        localStorage.setItem("token", result.data.token);
        notify("تم تسجيل الحساب بنجاح", SUCCESS);
        setTimeout(() => navigate("/login"), 2000);
      }
    }
  }, [loading, navigate, result, errors]);

  // Return all necessary values and functions for the component
  return [
    name,
    email,
    phone,
    password,
    confirmationPassword,
    onChangeInput,
    handleSubmit,
  ];
};

export default RegisterHook; // Export the hook for use in the component
