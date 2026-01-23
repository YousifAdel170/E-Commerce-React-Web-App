/* eslint-disable react-hooks/exhaustive-deps */

// Import necessary React and Redux hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import utility for notifications
import notify from "../Utility/useNotifyHook";

// Import constants for notification types
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";

// Import action to apply coupon
import {
  applyCouponAction,
  getAllCartItems,
  resetState,
} from "../../redux/actions/cartAction";

// Import navigation hook from React Router
import { useNavigate } from "react-router-dom";
import { EMPTY, STATUS } from "../../constants/general";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../constants/routes";

// Custom hook responsible for managing coupon application and checkout flow
const ApplyCouponHook = (cartItems) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("notification_messages");

  // State to store coupon input and loading status
  const [couponName, setCouponName] = useState(EMPTY.TEXT);
  const [isPressCoupon, setIsPressCoupon] = useState(false);
  const { applyCoupon, loading } = useSelector((state) => state.cartReducer);

  // Handler for coupon input change
  const onChangeCoupon = (e) => setCouponName(e);

  // Function responsible for applying the coupon
  const handleSubmitCoupon = async () => {
    // If no coupon entered, show warning
    if (couponName === EMPTY.TEXT)
      return notify(t("coupon.nameRequired"), NOTIFICATION_TYPES.WARNING);

    // Dispatch action to apply the coupon
    setIsPressCoupon(true);
    await dispatch(applyCouponAction({ couponName }));
  };

  // Handle result after coupon is applied
  useEffect(() => {
    if (!loading?.coupon) {
      setIsPressCoupon(false);

      setCouponName(EMPTY.TEXT);

      if (
        applyCoupon?.status === STATUS.SUCCESS_CREATED ||
        applyCoupon?.status === STATUS.SUCCESS_OK
      )
        notify(t("coupon.applySuccess"), NOTIFICATION_TYPES.SUCCESS);
      else notify(t("coupon.applyFail"), NOTIFICATION_TYPES.ERROR);

      dispatch(resetState());
      dispatch(getAllCartItems());
    }
  }, [loading]);

  // Handle checkout button click based on cart items
  const handleCheckout = () => {
    if (cartItems?.length) navigate(ROUTES.USER.PAYMENT);
    else notify(t("cart.emptyCartWarning"), NOTIFICATION_TYPES.WARNING);
  };

  // Return values and handlers used by the component
  return [
    couponName,
    onChangeCoupon,
    handleSubmitCoupon,
    handleCheckout,
    isPressCoupon,
  ];
};

// Export the custom hook for use in other components
export default ApplyCouponHook;
