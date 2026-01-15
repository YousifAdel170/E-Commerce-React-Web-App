import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../redux/actions/categoryAction";
import { useTranslation } from "react-i18next";
import { EMPTY } from "../../constants/general";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import notify from "../Utility/useNotifyHook";

const AdminDeleteCategoryHook = (category) => {
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State for modal visibility
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); // Handler to close the modal
  const handleShow = () => setShow(true); // Handler to show the modal

  // Local loading state
  const [isPress, setIsPress] = useState(false);

  const { deletedCategory, loading } = useSelector(
    (state) => state.allCategory
  );

  const { t } = useTranslation("notification_messages");

  // Handler to delete the coupon
  const handelDelete = async (e) => {
    e.preventDefault();
    if (!category?._id) return;

    setIsPress(true);
    await dispatch(deleteCategory(category?._id)); // Dispatch delete action
  };

  useEffect(() => {
    if (!loading?.delete && isPress) {
      setIsPress(false);

      if (deletedCategory === EMPTY.TEXT)
        notify(t("category.deleteSuccess"), NOTIFICATION_TYPES.SUCCESS);
      else notify(t("category.deleteFail"), NOTIFICATION_TYPES.ERROR);

      setShow(false);
    }
  }, [loading, deletedCategory, t, isPress]);

  // Return state variables and handlers
  return [show, handleClose, handleShow, handelDelete, isPress];
};

export default AdminDeleteCategoryHook;
