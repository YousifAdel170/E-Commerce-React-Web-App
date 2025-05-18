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
import { ERROR, SUCCESS } from "../../config"; // Constants for notification types (error and success)

/* Hook for editing a user address */
const UserEditAddressHook = (id) => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State variables for address details
  const [alias, setAlias] = useState(""); // Alias for the address
  const [details, setDetails] = useState(""); // Detailed address information
  const [phone, setPhone] = useState(""); // Phone number
  const [loadingData, setLoadingData] = useState(true); // State for data loading status
  const [loadingEdit, setLoadingEdit] = useState(true); // State for loading status during the edit process

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

  /* Fetch specific user address data when component mounts */
  useEffect(() => {
    const getCurrentUserAddressData = async () => {
      setLoadingData(true); // Set loading state to true
      await dispatch(getSpecificUserAddress(id)); // Fetch user address data using dispatch
      setLoadingData(false); // Set loading state to false once data is fetched
    };

    getCurrentUserAddressData(); // Call the function to fetch address data
  }, [dispatch, id]); // Run the effect when component mounts or `id` changes

  // Selector to get the specific user address from the Redux store
  const currentUserAddress = useSelector(
    (state) => state.userAddressReducer.specificUserAddress
  );

  /* Update state variables when specific user address data is loaded */
  useEffect(() => {
    if (!loadingData) {
      if (currentUserAddress && currentUserAddress.status === "success") {
        setAlias(currentUserAddress.data.alias); // Set alias state
        setDetails(currentUserAddress.data.details); // Set details state
        setPhone(currentUserAddress.data.phone); // Set phone state
      }
    }
  }, [loadingData, currentUserAddress]); // Run the effect when `loadingData` or `currentUserAddress` changes

  /* Handle address edit submission */
  const handleEdit = async () => {
    setLoadingEdit(true); // Set loading state to true
    await dispatch(
      updateUserAddress(id, {
        // Dispatch the action to update user address
        alias,
        details,
        phone,
      })
    );
    setLoadingEdit(false); // Set loading state to false once the edit is done
  };

  // Selector to get the result of the update address action
  const updatedReponse = useSelector(
    (state) => state.userAddressReducer.updatedUserAddress
  );

  /* Notify user of the result of the edit action */
  useEffect(() => {
    if (!loadingEdit) {
      if (updatedReponse && updatedReponse.status === 200) {
        notify("تمت عملية التعديل بنجاح", SUCCESS); // Notify success
        setTimeout(() => navigate("/user/addresses"), 1000); // Redirect to addresses page after 1 second
      } else notify("فشل فى عملية التعديل", ERROR); // Notify failure
    }
  }, [loadingEdit, navigate, updatedReponse]); // Run the effect when `loadingEdit`, `navigate`, or `updatedReponse` changes

  // Return state variables and handlers
  return [
    alias, // Alias state
    details, // Details state
    phone, // Phone state
    onChangeAlias, // Handler for alias change
    onChangeDetails, // Handler for details change
    onChangePhone, // Handler for phone change
    handleEdit, // Handler for submitting the edit
  ];
};

export default UserEditAddressHook; // Export the hook
