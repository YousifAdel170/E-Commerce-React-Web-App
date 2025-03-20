/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../Utility/useNotifyHook";
import { SUCCESS, WARNING } from "../../config";
import { applyCoupon } from "../../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";

const ApplyCouponHook = (cartItems) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponName, setCouponName] = useState("");
  const [loading, setLoading] = useState(true);

  const onChangeCoupon = (e) => setCouponName(e);

  const handleSubmitCoupon = async () => {
    if (couponName === "") {
      notify("من فضلك ادخل الكوبون", WARNING);
      return;
    }

    setLoading(true);
    await dispatch(applyCoupon({ couponName }));
    setLoading(false);
  };

  const result = useSelector((state) => state.cartReducer.applyCoupon);

  useEffect(() => {
    if (!loading) {
      if (result && result.status === 200) {
        notify("تم تطبيق الكوبون بنجاح", SUCCESS);
        setTimeout(() => window.location.reload(false), 1000);
      } else {
        notify("هذا الكوبون غير صحيح او منتهى الصلاحيه", WARNING);
        setTimeout(() => window.location.reload(false), 1000);
      }
    }
  }, [loading]);

  const handleCheckout = () => {
    if (cartItems && cartItems.length) navigate("/order/pay-method");
    else notify("من فضلك اضف منتجات للعربة اولا", WARNING);
  };

  return [couponName, onChangeCoupon, handleSubmitCoupon, handleCheckout];
};

export default ApplyCouponHook;
