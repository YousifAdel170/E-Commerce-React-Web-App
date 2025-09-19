/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  editCoupon,
  getSpecificCoupon,
  resetState,
} from "../../redux/actions/couponAction";
import notify from "../Utility/useNotifyHook";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { EMPTY, STATUS } from "../../constants/general";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../constants/routes";
import { DELAYS } from "../../constants/delays";

// Hook for editing a coupon in the admin panel
const AdminEditCouponHook = (id) => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State variables for coupon details
  const [couponName, setCouponName] = useState(EMPTY.TEXT);
  const [couponDate, setCouponDate] = useState(EMPTY.TEXT);
  const [couponValue, setCouponValue] = useState(EMPTY.TEXT);
  // const [loading, setLoading] = useState(true); // State for loading status
  // const [loadingData, setLoadingData] = useState(true); // State for data loading status

  const { t } = useTranslation("notification_messages");
  const [isPress, setIsPress] = useState(false);

  const { specificCoupon, updatedCoupon, loading, error } = useSelector(
    (state) => state.couponReducer
  );

  // Fetch specific coupon data when component mounts or id changes
  useEffect(() => {
    const getCouponData = async () => await dispatch(getSpecificCoupon(id));

    getCouponData();
  }, [id, dispatch]);

  // Update state variables when specific coupon data is loaded
  useEffect(() => {
    if (!loading?.fetchSpecific) {
      if (specificCoupon?.data) {
        setCouponName(specificCoupon?.data?.name);
        setCouponDate(
          new Date(specificCoupon?.data?.expire).toISOString().split("T")[0]
        );

        setCouponValue(specificCoupon?.data?.discount);
        dispatch(resetState());
      }
    }
  }, [loading, specificCoupon]);

  // Handlers for input changes
  const onChangeName = (e) => setCouponName(e.target.value);
  const onChangeDate = (e) => setCouponDate(e.target.value);
  const onChangeValue = (e) => setCouponValue(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      couponName === EMPTY.TEXT ||
      couponDate === EMPTY.TEXT ||
      couponValue === EMPTY.TEXT
    ) {
      notify(t("validation.pleaseCompleteData"), NOTIFICATION_TYPES.WARNING);
      return;
    }

    setIsPress(true); // Set loading state to true
    await dispatch(
      editCoupon(id, {
        name: couponName,
        expire: couponDate,
        discount: couponValue,
      })
    );
  };

  // Notify user of the result of the edit action
  useEffect(() => {
    if (!loading?.update && isPress) {
      setIsPress(false); // Reset loading state

      if (!error?.update && updatedCoupon?.status === STATUS.SUCCESS_OK) {
        setCouponDate(EMPTY.TEXT);
        setCouponName(EMPTY.TEXT);
        setCouponValue(EMPTY.TEXT);

        notify(t("coupon.updateSuccess"), NOTIFICATION_TYPES.SUCCESS);
        setTimeout(
          () => navigate(ROUTES.ADMIN.COUPONS.ALL),
          DELAYS.NAVIGATION_DELAY
        );
      } else notify(t("coupon.updateFail"), NOTIFICATION_TYPES.ERROR);

      dispatch(resetState());
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
    isPress,
  ];
};

export default AdminEditCouponHook;
