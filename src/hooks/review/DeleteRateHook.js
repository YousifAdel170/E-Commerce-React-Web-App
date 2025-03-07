import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRate } from "../../redux/actions/reviewAction";
import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS } from "../../config";

const DeleteRateHook = (review) => {
  // use it for dispatching actions
  const dispatch = useDispatch();

  // States
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);

  // Used For Delete Rate Modal
  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  // Get The LoggedIn User [Wrote The Review]
  const user = JSON.parse(localStorage.getItem("user"));

  //   Handle Delete Rate Of the LoggedIn User
  const handleDelete = async () => {
    // Start Loading
    setLoading(true);

    // Dispatch Delete Rate Action
    await dispatch(deleteRate(review._id));

    // End Loading
    setLoading(false);

    // Close The Modal
    handleDeleteClose();
  };

  //   check if the user is the same user who wrote the review
  useEffect(() => {
    if (user._id === review.user._id) setIsUser(true);
  }, [user, review]);

  //   Return Response of the Delete Rate
  const result = useSelector((state) => state.reviewReducer.deleteReview);

  //   Notify The User With The Result
  useEffect(() => {
    if (!loading) {
      if (result === "") {
        notify("تم حذف التقييم بنجاح", SUCCESS);
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else notify("هناك مشكله فى عملية المسح", ERROR);
    }
  }, [loading, result]);

  return [
    isUser,
    handleShowDelete,
    handleDeleteClose,
    showDelete,
    handleDelete,
  ];
};

export default DeleteRateHook;
