// Import Hooks from libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGoogleLogin } from "@react-oauth/google";

// Import Used Custom Hooks
import notify from "../Utility/useNotifyHook";

// Import Custom Actions from Redux
import { loginUser, setUser } from "../../redux/actions/authAction";
import { getAllCartItems } from "../../redux/actions/cartAction";

// Impot Constants and Enums
import { INPUT_NAMES } from "../../constants/inputs";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { EMPTY } from "../../constants/general";
import { REGEX_PATTERNS } from "../../constants/validationPatterns";
import { STORAGE_KEYS } from "../../constants/storage";
import { DELAYS } from "../../constants/delays";
import { ROUTES } from "../../constants/routes";
import { isApiStatus, STATUS_TYPES } from "../../constants/responseStatus";

// Hook Responsible for handling the login functionality
const LoginHook = () => {
  // Initialize Redux hooks and translation
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("notification_messages");

  // Initialize state variables for email, password, loading states, and Google login status
  const [email, setEmail] = useState(EMPTY.TEXT);
  const [password, setPassword] = useState(EMPTY.TEXT);
  const [isPress, setIsPress] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);

  // Redux selectors to get the login result, loading state, and errors
  const result = useSelector((state) => state.authReducer.loginUser);
  const loading = useSelector((state) => state.authReducer.loading.login);
  const errors = useSelector((state) => state.authReducer.errors.login);

  // Function to handle input changes for email and password fields
  const onChangeInput = (e, type) => {
    if (type === INPUT_NAMES.EMAIL) setEmail(e.target.value);
    else if (type === INPUT_NAMES.PASSWORD) setPassword(e.target.value);
  };

  // Function to validate email and password inputs
  const validateInputs = () => {
    if (email === EMPTY.TEXT) {
      notify(t("validation.emailRequired"), NOTIFICATION_TYPES.WARNING);
      return false;
    } else if (!REGEX_PATTERNS.EMAIL.test(email)) {
      notify(t("validation.emailInvalid"), NOTIFICATION_TYPES.WARNING);
      return false;
    }
    if (password === EMPTY.TEXT) {
      notify(t("validation.passwordRequired"), NOTIFICATION_TYPES.WARNING);
      return false;
    }
    return true;
  };

  // Function to handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setIsPress(true);
    await dispatch(loginUser({ email, password }));
    dispatch(getAllCartItems());
  };

  // Function to handle Google login using the useGoogleLogin hook
  const login = useGoogleLogin({
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
        await dispatch(loginUser({ email: data?.email, password: data?.sub }));
        dispatch(getAllCartItems());

        // Safe call to close the popup only if this window was opened by another
        if (window.opener && !window.opener.closed) {
          window.close();
        }
      } catch (error) {
        notify("Google login failed" + error, NOTIFICATION_TYPES.ERROR);
        setIsGoogleLogin(false);
      }
    },
    onError: () => {
      notify("Google login failed", NOTIFICATION_TYPES.ERROR);
      setIsGoogleLogin(false);
    },
    scope: "openid email profile",
  });

  // Function to handle Google login button click
  const loginWithGoogle = (e) => {
    e.preventDefault();
    login();
  };

  // Effect to handle the result of the login operation
  useEffect(() => {
    // Check if the loading state is false and either a button was pressed or Google login was initiated
    const isSuccess = isApiStatus(result?.status, STATUS_TYPES.SUCCESS);

    // Check if the result is not loading and either a button was pressed or Google login was initiated
    if (!loading && (isPress || isGoogleLogin)) {
      // If the login was successful, store the token and user data in localStorage
      if (isSuccess && result?.data) {
        const { token, data } = result.data;

        localStorage.setItem(STORAGE_KEYS.LOCAL.AUTH.TOKEN, token);
        localStorage.setItem(
          STORAGE_KEYS.LOCAL.AUTH.USER,
          JSON.stringify(data)
        );

        dispatch(setUser(data));
        notify(t("success.login"), NOTIFICATION_TYPES.SUCCESS);

        setTimeout(
          () => navigate(ROUTES.GENERAL.HOME),
          DELAYS.NAVIGATION_DELAY
        );
      }

      // If the login failed, remove the token and user data from localStorage and notify the user (handle errors)
      else {
        localStorage.removeItem(STORAGE_KEYS.LOCAL.AUTH.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.LOCAL.AUTH.USER);

        const status = errors?.status;

        if (isApiStatus(status, STATUS_TYPES.FAILURE))
          notify(t("backendErrors.loginWrong"), NOTIFICATION_TYPES.ERROR);
        else if (isApiStatus(status, STATUS_TYPES.UNAUTHORIZED))
          notify(t("backendErrors.unauthorized"), NOTIFICATION_TYPES.ERROR);
        else if (isApiStatus(status, STATUS_TYPES.FORBIDDEN))
          notify(t("backendErrors.forbidden"), NOTIFICATION_TYPES.ERROR);
        else if (isApiStatus(status, STATUS_TYPES.NOT_FOUND))
          notify(t("backendErrors.notFound"), NOTIFICATION_TYPES.ERROR);
        else if (isApiStatus(status, STATUS_TYPES.SERVER_ERROR))
          notify(t("backendErrors.server"), NOTIFICATION_TYPES.ERROR);
        else if (isApiStatus(status, STATUS_TYPES.NETWORK_ERROR))
          notify(t("backendErrors.network"), NOTIFICATION_TYPES.ERROR);
        else notify(t("backendErrors.unknown"), NOTIFICATION_TYPES.ERROR);
      }

      // reset press flags
      setIsPress(false);
      setIsGoogleLogin(false);
    }
  }, [loading, result, errors, dispatch, navigate, t, isPress, isGoogleLogin]);

  // Return the necessary state and functions for the login component
  return [
    email,
    password,
    isPress,
    onChangeInput,
    handleSubmit,
    loginWithGoogle,
    isGoogleLogin,
  ];
};

// Export the LoginHook for use in other components
export default LoginHook;
