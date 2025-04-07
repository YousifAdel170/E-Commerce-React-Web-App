import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS, WARNING } from "../../config";
import { addCoupon } from "../../redux/actions/couponAction";

// Hook for adding a coupon in the admin panel
const AdminAddCouponHook = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State variables for coupon details
  const [couponName, setCouponName] = useState("");
  const [couponDate, setCouponDate] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const [loading, setLoading] = useState(true); // State for loading status

  // Handler for coupon name input change
  const onChangeName = (e) => {
    e.persist();
    setCouponName(e.target.value);
  };

  // Handler for coupon date input change
  const onChangeDate = (e) => {
    e.persist();
    setCouponDate(e.target.value);
  };

  // Handler for coupon value input change
  const onChangeValue = (e) => {
    e.persist();
    setCouponValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate input fields
    if (couponName === "" || couponDate === "" || couponValue <= 0) {
      notify("من فضلك اكمل البيانات", WARNING);
      return;
    }

    setLoading(true); // Set loading state to true
    await dispatch(
      addCoupon({
        name: couponName,
        expire: couponDate,
        discount: couponValue,
      })
    );
    setLoading(false); // Set loading state to false
  };

  // Selector to get the result of the add coupon action
  const result = useSelector((state) => state.couponReducer.addCoupon);

  // Notify user of the result of the add action
  useEffect(() => {
    if (!loading) {
      if (result && result.status === 201) {
        notify("تمت اضافة الكوبون بنجاح", SUCCESS);
        window.location.reload(false); // Reload the page to reflect changes
      } else if (result && result.status === 400)
        notify("هذا الكوبون موجود من قبل ", ERROR);
      else if (result && result.status === 403)
        notify("انتا غير مسموح لك بالاضافة", ERROR);
    }
  }, [loading, result]);

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

export default AdminAddCouponHook;
