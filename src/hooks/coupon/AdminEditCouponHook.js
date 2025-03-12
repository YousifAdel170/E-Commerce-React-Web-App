/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  editCoupon,
  getSpecificCoupon,
} from "../../redux/actions/couponAction";
import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS, WARNING } from "../../config";

// Hook for editing a coupon in the admin panel
const AdminEditCouponHook = (id) => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State variables for coupon details
  const [couponName, setCouponName] = useState("");
  const [couponDate, setCouponDate] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const [loading, setLoading] = useState(true); // State for loading status
  const [loadingData, setLoadingData] = useState(true); // State for data loading status
  // Fetch specific coupon data when component mounts or id changes
  useEffect(() => {
    const getCouponData = async () => {
      setLoadingData(true);
      await dispatch(getSpecificCoupon(id));
      setLoadingData(false);
    };

    getCouponData();
  }, [id, dispatch]);

  // Format date to a readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Selector to get the specific coupon from the Redux store
  const specificCoupon = useSelector(
    (state) => state.couponReducer.specificCoupon
  );

  // Update state variables when specific coupon data is loaded
  useEffect(() => {
    if (!loadingData) {
      if (specificCoupon && specificCoupon.data) {
        setCouponName(specificCoupon.data.name);
        setCouponDate(formatDate(specificCoupon.data.expire));
        setCouponValue(specificCoupon.data.discount);
      }
    }
  }, [loadingData, specificCoupon]);

  // Handlers for input changes
  const onChangeName = (event) => {
    event.persist();
    setCouponName(event.target.value);
  };
  const onChangeDate = (event) => {
    event.persist();
    setCouponDate(event.target.value);
  };
  const onChangeValue = (event) => {
    event.persist();
    setCouponValue(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (couponName === "" || couponDate === "" || couponValue <= 0) {
      notify("من فضلك اكمل البيانات", WARNING);
      return;
    }

    setLoading(true);
    await dispatch(
      editCoupon(id, {
        name: couponName,
        expire: couponDate,
        discount: couponValue,
      })
    );
    setLoading(false);
  };

  // Selector to get the result of the edit coupon action
  const result = useSelector((state) => state.couponReducer.editCoupon);

  // Notify user of the result of the edit action
  useEffect(() => {
    if (!loading) {
      if (result && result.status === 200) {
        notify("تمت عملية التعديل بنجاح", SUCCESS);
        setTimeout(() => {
          navigate("/admin/add-coupon");
        }, 1000);
      } else {
        notify("فشل في عملية التعديل ", ERROR);
      }
    }
  }, [loading]);

  // Return state variables and handlers
  return [
    couponName,
    couponDate,
    couponValue,
    onChangeName,
    onChangeDate,
    onChangeValue,
    handleSubmit,
  ];
};

export default AdminEditCouponHook;
