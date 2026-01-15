/* Importing necessary hooks from react, react-redux, react-router-dom */
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import Custom Actions (Actions to update user password and profile)
import {
  updateUserPassword,
  updateUserProfile,
} from "../../redux/actions/authAction";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { STORAGE_KEYS } from "../../constants/storage";
import { EMPTY, STATUS, STATUS_MESSAGES } from "../../constants/general";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../constants/routes";
import { DELAYS } from "../../constants/delays";
import { REGEX_PATTERNS } from "../../constants/validationPatterns";

const UserProfileHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation("notification_messages");

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////                                     Update User Profile                                       ///////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Get user data from local storage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.LOCAL.AUTH.USER);
    return storedUser ? JSON.parse(storedUser) : {};
  });

  // State variables for user profile details
  const [name, setName] = useState(user?.name || EMPTY.TEXT);
  const [email, setEmail] = useState(user?.email || EMPTY.TEXT);
  const [phone, setPhone] = useState(user?.phone || EMPTY.TEXT);
  const [loading, setLoading] = useState(true);
  const [isUserEditPress, setIsUserEditPress] = useState(false);

  // State for modal visibility
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); // Handler to close the modal
  const handleShow = () => setShow(true); // Handler to show the modal

  // Handlers for input changes
  const onChangeName = (e) => {
    e.persist();
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    e.persist();
    setEmail(e.target.value);
  };

  const onChangePhone = (e) => {
    e.persist();
    setPhone(e.target.value);
  };

  // Prepare the body for the update request
  const body = useMemo(() => {
    if (user?.email === email) return { name, phone };
    else return { name, email, phone };
  }, [user, email, name, phone]);

  // Handle form submission for updating user profile
  const handleSubmit = async () => {
    // check if username, email, phone are not empty
    if (name === EMPTY.TEXT)
      return notify(
        t("validation.userProfile.nameRequired"),
        NOTIFICATION_TYPES.WARNING
      );

    if (email === EMPTY.TEXT)
      return notify(
        t("validation.userProfile.emailRequired"),
        NOTIFICATION_TYPES.WARNING
      );

    if (!REGEX_PATTERNS.EMAIL.test(email))
      return notify(t("validation.emailInvalid"), NOTIFICATION_TYPES.WARNING);

    if (phone === EMPTY.TEXT)
      return notify(
        t("validation.userProfile.phoneRequired"),
        NOTIFICATION_TYPES.WARNING
      );

    // check if there aren any changes
    if (user?.email === email && user?.phone === phone && user?.name === name)
      return notify(
        t("validation.userProfile.nochangesDetected"),
        NOTIFICATION_TYPES.WARNING
      );

    setLoading(true);
    setIsUserEditPress(true);
    await dispatch(updateUserProfile(body));
    setLoading(false);
    setShow(false);
  };

  // Selector to get the result of the update user profile action
  const resultUserProfile = useSelector(
    (state) => state.authReducer.updatedUserProfile
  );

  const errors = useSelector((state) => state.authReducer.errors);

  // Notify user of the result of the update action
  useEffect(() => {
    if (!loading) {
      setIsUserEditPress(false);
      if (errors != null) {
        if (errors?.errors && errors?.errors.length > 0) {
          // Handle email conflict error
          if (
            errors.errors[0].msg === STATUS_MESSAGES.BACKEND_EMAIL_ALREADY_USED
          )
            return notify(
              t("error.emailAlreadyUsed"),
              NOTIFICATION_TYPES.ERROR
            );
        }
      }

      if (
        resultUserProfile?.status == STATUS.SUCCESS_OK ||
        resultUserProfile?.status == STATUS.SUCCESS_CREATED ||
        resultUserProfile?.data?.status == STATUS_MESSAGES.SUCCESS
      ) {
        notify(t("general.updateSuccess"), NOTIFICATION_TYPES.SUCCESS);

        const updatedUser = resultUserProfile.data.data.user;
        localStorage.setItem(
          STORAGE_KEYS.LOCAL.AUTH.USER,
          JSON.stringify(updatedUser)
        );
        setUser(updatedUser || EMPTY.ARRAY); // Update the state with new user data

        setName(updatedUser?.name || EMPTY.TEXT);
        setEmail(updatedUser?.email || EMPTY.TEXT);
        setPhone(updatedUser?.phone || EMPTY.TEXT);
      }
    }
  }, [loading, resultUserProfile, errors, t]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////                                     Update Password                                           ///////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  // State variables for password change
  const [currentPassword, setCurrentPassword] = useState(EMPTY.TEXT);
  const [password, setPassword] = useState(EMPTY.TEXT);
  const [passwordConfirm, setPasswordConfirm] = useState(EMPTY.TEXT);
  const [loadingPassword, setLoadingPassword] = useState(true);
  const [isChangePasswordPress, setIsChangePasswordPress] = useState(false);

  // Handlers for password input changes
  const onChangeCurrentPassword = (e) => {
    e.persist();
    setCurrentPassword(e.target.value);
  };

  const onChangePassword = (e) => {
    e.persist();
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = (e) => {
    e.persist();
    setPasswordConfirm(e.target.value);
  };

  // Handle form submission for changing password
  const changePasswordSubmit = async () => {
    setIsChangePasswordPress(true);

    if (currentPassword === EMPTY.TEXT) {
      notify(
        t("validation.userProfile.currentPasswordRequired"),
        NOTIFICATION_TYPES.WARNING
      );
      setIsChangePasswordPress(false);
      return;
    }

    if (password === EMPTY.TEXT) {
      notify(
        t("validation.userProfile.newPasswordRequired"),
        NOTIFICATION_TYPES.WARNING
      );
      setIsChangePasswordPress(false);
      return;
    }

    if (passwordConfirm === EMPTY.TEXT) {
      notify(
        t("validation.userProfile.confirmNewPasswordRequired"),
        NOTIFICATION_TYPES.WARNING
      );
      setIsChangePasswordPress(false);
      return;
    }

    if (currentPassword === password) {
      notify(
        t("validation.userProfile.sameAsCurrent"),
        NOTIFICATION_TYPES.WARNING
      );
      setIsChangePasswordPress(false);
      return;
    }

    if (passwordConfirm !== password) {
      notify(
        t("validation.userProfile.newPasswordMismatch"),
        NOTIFICATION_TYPES.WARNING
      );
      setIsChangePasswordPress(false);
      return;
    }

    setLoadingPassword(true);
    setIsChangePasswordPress(true);
    await dispatch(
      updateUserPassword({
        currentPassword,
        password,
        passwordConfirm,
      })
    );
    setLoadingPassword(false);
  };

  // Selector to get the result of the update password action
  const resultUserPassword = useSelector(
    (state) => state.authReducer.updatedUserPassword
  );

  // Notify user of the result of the password change action
  useEffect(() => {
    if (!loadingPassword) {
      setIsChangePasswordPress(false);
      if (
        resultUserPassword?.status === STATUS.SUCCESS_OK ||
        resultUserPassword?.status === STATUS.SUCCESS_CREATED
      ) {
        notify(t("success.userChangePassword"), NOTIFICATION_TYPES.SUCCESS);
        setTimeout(() => {
          localStorage.removeItem(STORAGE_KEYS.LOCAL.AUTH.USER);
          localStorage.removeItem(STORAGE_KEYS.LOCAL.AUTH.TOKEN);
          navigate(ROUTES.AUTH.LOGIN);
        }, DELAYS.NAVIGATION_DELAY);
      } else notify(t("error.userChangePassword"), NOTIFICATION_TYPES.ERROR);
    }
  }, [loadingPassword, navigate, resultUserPassword, t]);

  // Return state variables and handlers
  return [
    user,
    show,
    handleClose,
    handleShow,
    handleSubmit,
    name,
    email,
    phone,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    changePasswordSubmit,
    currentPassword,
    password,
    passwordConfirm,
    onChangeCurrentPassword,
    onChangePassword,
    onChangePasswordConfirm,
    isUserEditPress,
    isChangePasswordPress,
  ];
};

export default UserProfileHook;
