import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoupon, resetState } from "../../redux/actions/couponAction";
import { useTranslation } from "react-i18next";
import { EMPTY } from "../../constants/general";
import notify from "../Utility/useNotifyHook";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";

// Hook for handling coupon card actions in the admin panel
const AdminDeleteCouponHook = (coupon) => {
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State for modal visibility
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); // Handler to close the modal
  const handleShow = () => setShow(true); // Handler to show the modal

  const [isPress, setIsPress] = useState(false); // Local loading state

  const { deletedCoupon, loading } = useSelector(
    (state) => state.couponReducer
  );
  const { t } = useTranslation("notification_messages");

  // Handler to delete the coupon
  const handelDelete = async (e) => {
    e.preventDefault();

    if (!coupon?._id) return;

    setIsPress(true);

    await dispatch(deleteCoupon(coupon?._id)); // Dispatch delete action
  };

  useEffect(() => {
    if (!loading?.delete && isPress) {
      setIsPress(false);
      if (deletedCoupon === EMPTY.TEXT)
        notify(t("general.deleteSuccess"), NOTIFICATION_TYPES.SUCCESS);
      else notify(t("general.deleteFail"), NOTIFICATION_TYPES.ERROR);
      setShow(false); // Close modal

      dispatch(resetState());
    }
  }, [loading, deletedCoupon, t, isPress, dispatch]);

  // Return state variables and handlers
  return [show, handleClose, handleShow, handelDelete, isPress];
};

export default AdminDeleteCouponHook;
