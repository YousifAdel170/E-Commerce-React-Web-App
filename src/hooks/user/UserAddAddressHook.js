/* Importing necessary hooks from react, react-redux, react-router-dom */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import Custom Hooks (Custom hook for notifications)
import notify from "../Utility/useNotifyHook";

// Import Custom Actions (Action to add a user address)
import { addUserAddress } from "../../redux/actions/userAddressAction";

// Import Used Configuaration
import { ERROR, SUCCESS, WARNING } from "../../constants/notificationTypes"; // Constants for notification types

// Hook responsible for adding a user address
const UserAddAddressHook = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions
  const navigate = useNavigate(); // Hook for navigation

  // State variables for address details
  const [alias, setAlias] = useState(""); // Alias for the address
  const [details, setDetails] = useState(""); // Detailed address information
  const [phone, setPhone] = useState(""); // Phone number
  const [loading, setLoading] = useState(true); // State for loading status

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
    // Validate input fields
    if (alias === "" || details === "" || phone === "") {
      notify("من فضلك اكمل البيانات", WARNING); // Notify user to complete all fields
      return;
    }

    setLoading(true); // Set loading state to true
    await dispatch(
      addUserAddress({
        alias,
        details,
        phone,
        city: "", // Empty city field
        postalCode: "", // Empty postal code field
      })
    );
    setLoading(false); // Set loading state to false
  };

  // Selector to get the result of the add address action
  const result = useSelector(
    (state) => state.userAddressReducer.addUserAddress
  );

  // Notify user of the result of the add action
  useEffect(() => {
    if (!loading) {
      if (result && result.status === 200) {
        notify("تمت اضافة العنوان بنجاح", SUCCESS); // Notify success
        setTimeout(() => navigate("/user/addresses"), 1000); // Redirect to addresses page after 1 second
      } else notify("هناك مشكله فى عملية الاضافة ", ERROR); // Notify error
    }
  }, [loading, result, navigate]);

  // Return state variables and handlers
  return [
    alias,
    details,
    phone,
    onChangeAlias,
    onChangeDetails,
    onChangePhone,
    handleSubmit,
  ];
};

export default UserAddAddressHook;
