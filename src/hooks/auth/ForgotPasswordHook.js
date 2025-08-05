// ================================
// Forgot Password Hook
// ================================

// External Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Custom Utilities and Constants
import notify from "../Utility/useNotifyHook";
import { forgotPassword } from "../../redux/actions/authAction";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { EMPTY } from "../../constants/general";
import { REGEX_PATTERNS } from "../../constants/validationPatterns";
import { isApiStatus, STATUS_TYPES } from "../../constants/responseStatus";
import { ROUTES } from "../../constants/routes";
import { DELAYS } from "../../constants/delays";
import { STORAGE_KEYS } from "../../constants/storage";

/**
 * Custom Hook: useForgotPassword
 * Handles forgot password logic including:
 * - Validation
 * - API interaction
 * - Notifications
 * - Navigation
 */
const useForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("notification_messages");

  const [email, setEmail] = useState(EMPTY.TEXT);
  const [isPress, setIsPress] = useState(false);

  const response = useSelector((state) => state.authReducer.forgotPassword);
  const loading = useSelector((state) => state.authReducer.loading.forgot);
  const errors = useSelector((state) => state.authReducer.errors.forgot);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!email) {
      notify(t("validation.emailRequired"), NOTIFICATION_TYPES.WARNING);
      return;
    }

    if (!REGEX_PATTERNS.EMAIL.test(email)) {
      notify(t("validation.emailInvalid"), NOTIFICATION_TYPES.WARNING);
      return;
    }

    setIsPress(true);

    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.LOCAL.AUTH.EMAIL, email);

    // Dispatch action;
    await dispatch(forgotPassword({ email }));

    setIsPress(false);
  };

  useEffect(() => {
    if (!loading && isPress) {
      if (!errors && isApiStatus(response?.status, STATUS_TYPES.SUCCESS)) {
        notify(t("success.emailCodeSentSuccess"), NOTIFICATION_TYPES.SUCCESS);
        setTimeout(
          () => navigate(ROUTES.AUTH.VERIFY_CODE),
          DELAYS.NAVIGATION_DELAY
        );
      } else if (isApiStatus(errors?.status, STATUS_TYPES.FAILURE))
        notify(t("backendErrors.failure"), NOTIFICATION_TYPES.ERROR);
      else if (isApiStatus(errors?.status, STATUS_TYPES.UNAUTHORIZED))
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
  }, [loading, response, t, navigate, isPress, errors]);

  return [handleEmailChange, email, handleSubmit, isPress];
};

export default useForgotPassword;
