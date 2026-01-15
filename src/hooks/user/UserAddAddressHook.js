/* Importing necessary hooks from react, react-redux, react-router-dom */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import Custom Hooks (Custom hook for notifications)
import notify from "../Utility/useNotifyHook";

// Import Custom Actions (Action to add a user address)
import { addUserAddress } from "../../redux/actions/userAddressAction";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { EMPTY, STATUS } from "../../constants/general";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../constants/routes";
import { DELAYS } from "../../constants/delays";

// Hook responsible for adding a user address
const UserAddAddressHook = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions
  const navigate = useNavigate(); // Hook for navigation

  // State variables for address details
  const [alias, setAlias] = useState(EMPTY.TEXT); // Alias for the address
  const [details, setDetails] = useState(EMPTY.TEXT); // Detailed address information
  const [phone, setPhone] = useState(EMPTY.TEXT); // Phone number
  const [isPress, setIsPress] = useState(false);
  const { t } = useTranslation("notification_messages");

  // Selectors
  const loadingCreate = useSelector(
    (state) => state.userAddressReducer.loading.create
  );
  const createError = useSelector(
    (state) => state.userAddressReducer.error.create
  );

  // Handler for alias input change
  const onChangeAlias = (e) => {
    e.persist();
    setAlias(e.target.value); // Update alias state
  };

  // Handler for details input change
  const onChangeDetails = (e) => {
    e.persist();
    setDetails(e.target.value); // Update details state
  };

  // Handler for phone input change
  const onChangePhone = (e) => {
    e.persist();
    setPhone(e.target.value); // Update phone state
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsPress(true);

    if (alias === EMPTY.TEXT) {
      notify(
        t("validation.userAddress.aliasRequired"),
        NOTIFICATION_TYPES.WARNING
      ); // Notify user to complete all fields
      setIsPress(false);
      return;
    }

    // Validate input fields
    if (details === EMPTY.TEXT) {
      notify(
        t("validation.userAddress.detailsRequired"),
        NOTIFICATION_TYPES.WARNING
      ); // Notify user to complete all fields
      setIsPress(false);
      return;
    }
    // Validate input fields
    if (phone === EMPTY.TEXT) {
      notify(
        t("validation.userAddress.phoneRequired"),
        NOTIFICATION_TYPES.WARNING
      ); // Notify user to complete all fields
      setIsPress(false);
      return;
    }

    await dispatch(
      addUserAddress({
        alias,
        details,
        phone,
        city: EMPTY.TEXT,
        postalCode: EMPTY.TEXT,
      })
    );
  };

  // Selector to get the result of the add address action
  const result = useSelector(
    (state) => state.userAddressReducer.addUserAddress
  );

  // Notify user of the result of the add action
  useEffect(() => {
    if (!loadingCreate && isPress) {
      setIsPress(false);
      if (
        (!createError && result?.status === STATUS.SUCCESS_OK) ||
        result?.status === STATUS.SUCCESS_CREATED
      ) {
        setAlias(EMPTY.TEXT);
        setDetails(EMPTY.TEXT);
        setPhone(EMPTY.TEXT);
        notify(t("success.userAddressAdd"), NOTIFICATION_TYPES.SUCCESS); // Notify success
        setTimeout(
          () => navigate(ROUTES.USER.ADDRESSES.ALL),
          DELAYS.NAVIGATION_DELAY
        ); // Redirect to addresses page after 1 second
      } else notify(t("error.userAddressAdd"), NOTIFICATION_TYPES.ERROR); // Notify error
    }
  }, [loadingCreate, result, navigate, createError, isPress, t]);

  // Return state variables and handlers
  return [
    alias,
    details,
    phone,
    onChangeAlias,
    onChangeDetails,
    onChangePhone,
    handleSubmit,
    isPress,
  ];
};

export default UserAddAddressHook;
