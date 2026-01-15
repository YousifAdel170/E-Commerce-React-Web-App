/* Importing necessary hooks from react, react-redux, react-router-dom */
import { useEffect, useState } from "react"; // React hooks for state and side effects
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for dispatching actions and accessing the state
import { useNavigate } from "react-router-dom"; // React Router hook for navigation

// Import Custom Actions (Actions to get and update a user address)
import {
  getSpecificUserAddress,
  updateUserAddress,
} from "../../redux/actions/userAddressAction";

// Import Custom Hook (For notifications)
import notify from "../Utility/useNotifyHook";

// Import Configuration (Constants for notification types)
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes"; // Constants for notification types (error and success)
import { EMPTY, STATUS, STATUS_MESSAGES } from "../../constants/general";
import { useTranslation } from "react-i18next";
import { DELAYS } from "../../constants/delays";
import { ROUTES } from "../../constants/routes";

/* Hook for editing a user address */
const UserEditAddressHook = (id) => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State variables for address details
  const [alias, setAlias] = useState(EMPTY.TEXT); // Alias for the address
  const [details, setDetails] = useState(EMPTY.TEXT); // Detailed address information
  const [phone, setPhone] = useState(EMPTY.TEXT); // Phone number
  const [isPress, setIsPress] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const { t } = useTranslation("notification_messages");

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

  // Selector to get the specific category from the Redux store
  const { specificUserAddress, loading, updatedUserAddress } = useSelector(
    (state) => state.userAddressReducer
  );

  /* Fetch specific user address data when component mounts */
  useEffect(() => {
    const getCurrentUserAddressData = async () =>
      await dispatch(getSpecificUserAddress(id)); // Fetch user address data using dispatch

    getCurrentUserAddressData(); // Call the function to fetch address data
  }, [dispatch, id]); // Run the effect when component mounts or `id` changes

  // Update state variables when specific category data is loaded
  useEffect(() => {
    if (!loading?.fetchSpecific) {
      if (specificUserAddress?.status === STATUS_MESSAGES.SUCCESS) {
        setAlias(specificUserAddress?.data?.alias); // Set alias state
        setDetails(specificUserAddress?.data?.details); // Set details state
        setPhone(specificUserAddress?.data?.phone); // Set phone state
      }
    }
  }, [loading, specificUserAddress]);

  /* Handle address edit submission */
  const handleEdit = async (e) => {
    e.preventDefault();

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

    // Validate input fields
    if (
      phone === specificUserAddress?.data?.phone &&
      alias === specificUserAddress?.data?.alias &&
      details === specificUserAddress?.data?.details
    ) {
      notify(t("validation.userAddress.noChanges"), NOTIFICATION_TYPES.WARNING); // Notify user to complete all fields
      setIsPress(false);
      return;
    }

    setIsLoading(true);
    await dispatch(
      updateUserAddress(id, {
        // Dispatch the action to update user address
        alias,
        details,
        phone,
      })
    );
    setIsLoading(false);
  };

  /* Notify user of the result of the edit action */
  useEffect(() => {
    if (!loading?.update && !isLoading) {
      if (
        updatedUserAddress?.status === STATUS.SUCCESS_CREATED ||
        updatedUserAddress?.status === STATUS.SUCCESS_OK
      ) {
        notify(t("success.userAddressUpdate"), NOTIFICATION_TYPES.SUCCESS); // Notify success
        setTimeout(
          () => navigate(ROUTES.USER.ADDRESSES.ALL),
          DELAYS.NAVIGATION_DELAY
        ); // Redirect to addresses page after 1 second
      } else notify(t("error.userAddressUpdate"), NOTIFICATION_TYPES.ERROR); // Notify failure
    }
  }, [loading, navigate, updatedUserAddress, t, isLoading]); // Run the effect when `loadingEdit`, `navigate`, or `updatedReponse` changes

  // Return state variables and handlers
  return [
    alias, // Alias state
    details, // Details state
    phone, // Phone state
    onChangeAlias, // Handler for alias change
    onChangeDetails, // Handler for details change
    onChangePhone, // Handler for phone change
    handleEdit, // Handler for submitting the edit
    isPress,
  ];
};

export default UserEditAddressHook; // Export the hook
