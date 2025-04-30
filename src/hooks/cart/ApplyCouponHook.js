/* eslint-disable react-hooks/exhaustive-deps */

// Import necessary React and Redux hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import utility for notifications
import notify from "../Utility/useNotifyHook";

// Import constants for notification types
import { ERROR, SUCCESS, WARNING } from "../../config";

// Import action to apply coupon
import { applyCoupon } from "../../redux/actions/cartAction";

// Import navigation hook from React Router
import { useNavigate } from "react-router-dom";

// Custom hook responsible for managing coupon application and checkout flow
const ApplyCouponHook = (cartItems) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to store coupon input and loading status
  const [couponName, setCouponName] = useState("");
  const [loading, setLoading] = useState(true);

  // Handler for coupon input change
  const onChangeCoupon = (e) => setCouponName(e);

  // Function responsible for applying the coupon
  const handleSubmitCoupon = async () => {
    // If no coupon entered, show warning
    if (couponName === "") {
      notify("من فضلك ادخل الكوبون", WARNING);
      return;
    }

    // Dispatch action to apply the coupon
    setLoading(true);
    await dispatch(applyCoupon({ couponName }));
    setLoading(false);
  };

  // Get coupon application result from Redux store
  const result = useSelector((state) => state.cartReducer.applyCoupon);

  // Handle result after coupon is applied
  useEffect(() => {
    if (!loading) {
      if (result && result.status === 200) {
        notify("تم تطبيق الكوبون بنجاح", SUCCESS);
        setTimeout(() => window.location.reload(false), 1000);
      } else {
        notify("هذا الكوبون غير صحيح او منتهى الصلاحيه", ERROR);
        setTimeout(() => window.location.reload(false), 1000);
      }
    }
  }, [loading]);

  // Handle checkout button click based on cart items
  const handleCheckout = () => {
    if (cartItems && cartItems.length) navigate("/order/pay-method");
    else notify("من فضلك اضف منتجات للعربة اولا", WARNING);
  };

  // Return values and handlers used by the component
  return [couponName, onChangeCoupon, handleSubmitCoupon, handleCheckout];
};

// Export the custom hook for use in other components
export default ApplyCouponHook;
