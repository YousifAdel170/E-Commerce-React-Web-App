import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCoupon } from "../../redux/actions/couponAction";

// Hook for handling coupon card actions in the admin panel
const AdminCouponCardHook = (coupon) => {
  const dispatch = useDispatch(); // Hook to dispatch actions

  // Extract and format the expiration date of the coupon
  const dateString = coupon.expire;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // State for modal visibility
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); // Handler to close the modal
  const handleShow = () => setShow(true); // Handler to show the modal

  // Handler to delete the coupon
  const handelDelete = async () => {
    await dispatch(deleteCoupon(coupon._id)); // Dispatch delete action
    setShow(false); // Close the modal
    window.location.reload(false); // Reload the page to reflect changes
  };

  // Return state variables and handlers
  return [formatDate, dateString, show, handleClose, handleShow, handelDelete];
};

export default AdminCouponCardHook;
