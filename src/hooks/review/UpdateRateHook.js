import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRate } from "../../redux/actions/reviewAction";
import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS } from "../../config";

const UpdateRateHook = (review) => {
  //   Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  //   States
  const [newRateText, setNewRateText] = useState("");
  const [newRateValue, setNewRateValue] = useState(0);
  const [loading, setLoading] = useState(true);

  //   States Used For Edit Rate Modal
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //   Handle The Rate Text Change
  const onChangeNewRateText = (e) => {
    setNewRateText(e.target.value);
  };

  //   Handle The Rate Value Change
  const onChangeNewRateValue = (e) => {
    setNewRateValue(e);
  };

  //   Handle The Update Rate Of the LoggedIn User
  const handleUpdate = async () => {
    //   Start Loading
    setLoading(true);

    //   Dispatch the action to Update the rate
    await dispatch(
      updateRate(review._id, {
        review: newRateText,
        rating: newRateValue,
      })
    );

    // End Loading
    setLoading(false);

    // Close The Modal
    handleCloseEdit();
  };

  //   Return Response of the Update Rate Action [Update Review]
  const result = useSelector((state) => state.reviewReducer.updateReview);

  useEffect(() => {
    if (loading === false) {
      if (result.status && result.status === 200) {
        notify("تم تعديل التقييم بنجاح", SUCCESS);
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else notify("هناك مشكله فى عملية التعديل", ERROR);
    }
  }, [loading]);

  return [
    newRateText,
    newRateValue,
    onChangeNewRateText,
    onChangeNewRateValue,
    handleShowEdit,
    handleCloseEdit,
    showEdit,
    handleUpdate,
  ];
};

export default UpdateRateHook;
