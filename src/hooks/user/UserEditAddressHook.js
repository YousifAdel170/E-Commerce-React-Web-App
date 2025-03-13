import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getSpecificUserAddress,
  updateUserAddress,
} from "../../redux/actions/userAddressAction";
import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS } from "../../config";

// Hook for editing a user address
const UserEditAddressHook = (id) => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State variables for address details
  const [alias, setAlias] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [loadingData, setLoadingData] = useState(true); // State for data loading status
  const [loadingEdit, setLoadingEdit] = useState(true); // State for edit loading status

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

  // Fetch specific user address data when component mounts
  useEffect(() => {
    const getCurrentUserAddressData = async () => {
      setLoadingData(true);
      await dispatch(getSpecificUserAddress(id));
      setLoadingData(false);
    };

    getCurrentUserAddressData();
  }, [dispatch, id]);

  // Selector to get the specific user address from the Redux store
  const currentUserAddress = useSelector(
    (state) => state.userAddressReducer.specificUserAddress
  );

  // Update state variables when specific user address data is loaded
  useEffect(() => {
    if (!loadingData) {
      if (currentUserAddress && currentUserAddress.status === "success") {
        setAlias(currentUserAddress.data.alias);
        setDetails(currentUserAddress.data.details);
        setPhone(currentUserAddress.data.phone);
      }
    }
  }, [loadingData, currentUserAddress]);

  // Handle address edit submission
  const handleEdit = async () => {
    setLoadingEdit(true);
    await dispatch(
      updateUserAddress(id, {
        alias,
        details,
        phone,
      })
    );
    setLoadingEdit(false);
  };

  // Selector to get the result of the update address action
  const updatedReponse = useSelector(
    (state) => state.userAddressReducer.updatedUserAddress
  );

  // Notify user of the result of the edit action
  useEffect(() => {
    if (!loadingEdit) {
      if (updatedReponse && updatedReponse.status === 200) {
        notify("تمت عملية التعديل بنجاح", SUCCESS);
        setTimeout(() => navigate("/user/addresses"), 1000);
      } else notify("فشل فى عملية التعديل", ERROR);
    }
  }, [loadingEdit, navigate, updatedReponse]);

  // Return state variables and handlers
  return [
    alias,
    details,
    phone,
    onChangeAlias,
    onChangeDetails,
    onChangePhone,
    handleEdit,
  ];
};

export default UserEditAddressHook;
