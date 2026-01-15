import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../Utility/useNotifyHook";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { addCoupon, resetState } from "../../redux/actions/couponAction";
import { EMPTY, STATUS } from "../../constants/general";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { DELAYS } from "../../constants/delays";

// Hook for adding a coupon in the admin panel
const AdminAddCouponHook = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions
  const navigate = useNavigate();

  // State variables for coupon details
  const [couponName, setCouponName] = useState(EMPTY.TEXT);
  const [couponDate, setCouponDate] = useState(EMPTY.TEXT);
  const [couponValue, setCouponValue] = useState(EMPTY.TEXT);
  const [isPress, setIsPress] = useState(false);

  const { t } = useTranslation("notification_messages");

  // Selectors
  const loadingCreate = useSelector(
    (state) => state.couponReducer.loading.create
  );
  const createError = useSelector((state) => state.couponReducer.error.create);

  // Handler for coupon name input change
  const onChangeName = (e) => setCouponName(e.target.value);

  // Handler for coupon date input change
  const onChangeDate = (e) => setCouponDate(e.target.value);

  // Handler for coupon value input change
  const onChangeValue = (e) => setCouponValue(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (couponName === EMPTY.TEXT)
      return notify(t("coupon.nameRequired"), NOTIFICATION_TYPES.WARNING);

    if (couponDate === EMPTY.TEXT)
      return notify(t("coupon.expiryRequired"), NOTIFICATION_TYPES.WARNING);

    if (couponValue === EMPTY.TEXT)
      return notify(t("coupon.discountRequired"), NOTIFICATION_TYPES.WARNING);

    setIsPress(true); // Set loading state to true
    await dispatch(
      addCoupon({
        name: couponName,
        expire: couponDate,
        discount: couponValue,
      })
    );
  };

  // Notify user of the result of the add action
  useEffect(() => {
    if (!loadingCreate && isPress) {
      // Reset loading state
      setIsPress(false);
      if (!createError) {
        setCouponName(EMPTY.TEXT);
        setCouponDate(EMPTY.TEXT);
        setCouponValue(EMPTY.TEXT);
        notify(t("coupon.addSuccess"), NOTIFICATION_TYPES.SUCCESS);
        setTimeout(
          () => navigate(ROUTES.ADMIN.COUPONS.ALL),
          DELAYS.NAVIGATION_DELAY
        );
      } else if (createError?.status === STATUS.BAD_REQUEST)
        notify(t("coupon.alreadyUsed"), NOTIFICATION_TYPES.ERROR);
      else if (createError?.status === STATUS.FORBIDDEN)
        notify(t("backendErrors.forbidden"), NOTIFICATION_TYPES.ERROR);
      else notify(t("coupon.addFail"), NOTIFICATION_TYPES.ERROR);

      dispatch(resetState());
    }
  }, [loadingCreate, t, isPress, navigate, createError, dispatch]);

  // Return state variables and handlers
  return [
    couponName,
    couponDate,
    couponValue,
    onChangeName,
    onChangeDate,
    onChangeValue,
    handleSubmit,
    isPress,
  ];
};

export default AdminAddCouponHook;
