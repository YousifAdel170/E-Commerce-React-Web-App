import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand } from "../../redux/actions/brandAction";
import notify from "../Utility/useNotifyHook";
import { useTranslation } from "react-i18next";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { EMPTY } from "../../constants/general";

const AdminDeleteBrandHook = (brand) => {
  const dispatch = useDispatch();

  // Modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Local loading state
  const [isPress, setIsPress] = useState(false);

  const { deletedBrand, loading } = useSelector((state) => state.allBrand);

  const { t } = useTranslation("notification_messages");

  // Delete handler
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!brand?._id) return;

    setIsPress(true);

    await dispatch(deleteBrand(brand?._id)); // Dispatch delete action
  };

  useEffect(() => {
    if (!loading?.delete && isPress) {
      setIsPress(false);

      if (deletedBrand === EMPTY.TEXT) {
        notify(t("general.deleteSuccess"), NOTIFICATION_TYPES.SUCCESS);
        setShow(false); // Close modal
      } else notify(t("general.deleteFail"), NOTIFICATION_TYPES.ERROR);
    }
  }, [loading, deletedBrand, t, isPress]);

  return [show, handleClose, handleShow, handleDelete, isPress];
};

export default AdminDeleteBrandHook;
