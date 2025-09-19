import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubcategory } from "../../redux/actions/subCategoryAction";
import { useTranslation } from "react-i18next";
import { EMPTY } from "../../constants/general";
import notify from "../Utility/useNotifyHook";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { resetState } from "../../redux/actions/categoryAction";

const AdminDeleteSubcategoryHook = (subcategory) => {
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State for modal visibility
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); // Handler to close the modal
  const handleShow = () => setShow(true); // Handler to show the modal

  const { t } = useTranslation("notification_messages");

  const [isPress, setIsPress] = useState(false); // Local loading state

  // Selectors
  const { loading, deletedSubcategory } = useSelector(
    (state) => state.allSubCategory
  );

  // Handler to delete the subcategory
  const handelDelete = async (e) => {
    e.preventDefault();

    if (!subcategory?._id) return;

    setIsPress(true);

    await dispatch(deleteSubcategory(subcategory?._id)); // Dispatch delete action
  };

  useEffect(() => {
    if (!loading?.delete && isPress) {
      setIsPress(false);

      if (deletedSubcategory === EMPTY.TEXT)
        notify(t("general.deleteSuccess"), NOTIFICATION_TYPES.SUCCESS);
      else notify(t("general.deleteFail"), NOTIFICATION_TYPES.ERROR);

      setShow(false); // Close modal

      dispatch(resetState());
    }
  }, [loading, deletedSubcategory, t, isPress, dispatch]);

  // Return state variables and handlers
  return [show, handleClose, handleShow, handelDelete, isPress];
};

export default AdminDeleteSubcategoryHook;
