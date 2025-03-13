import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS, WARNING } from "../../config";
import { addUserAddress } from "../../redux/actions/userAddressAction";

// Hook for adding a user address
const UserAddAddressHook = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions
  const navigate = useNavigate(); // Hook for navigation

  // State variables for address details
  const [alias, setAlias] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true); // State for loading status

  // Handler for alias input change
  const onChangeAlias = (e) => {
    e.persist();
    setAlias(e.target.value);
  };

  // Handler for details input change
  const onChangeDetails = (e) => {
    e.persist();
    setDetails(e.target.value);
  };

  // Handler for phone input change
  const onChangePhone = (e) => {
    e.persist();
    setPhone(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate input fields
    if (alias === "" || details === "" || phone === "") {
      notify("من فضلك اكمل البيانات", WARNING);
      return;
    }

    setLoading(true); // Set loading state to true
    await dispatch(
      addUserAddress({
        alias,
        details,
        phone,
        city: "",
        postalCode: "",
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
        notify("تمت اضافة العنوان بنجاح", SUCCESS);
        setTimeout(() => navigate("/user/addresses"), 1000);
      } else notify("هناك مشكله فى عملية الاضافة ", ERROR);
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
