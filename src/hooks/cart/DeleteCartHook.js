import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearAllCart,
  deleteCartSpecificItem,
} from "../../redux/actions/cartAction";
import notify from "../Utility/useNotifyHook";
import { SUCCESS } from "../../config";

const DeleteCartHook = (item) => {
  const dispatch = useDispatch();

  const [showAll, setShowAll] = useState(false);
  const handleCloseAll = () => setShowAll(false);
  const handleShowAll = () => setShowAll(true);

  const handleDeleteCart = async () => {
    await dispatch(clearAllCart());
    notify("تم حذف الكل بنجاح", SUCCESS);
    setShowAll(false);
    setTimeout(() => window.location.reload(false), 1000);
  };

  const [showSpecific, setShowSpecific] = useState(false);
  const handleCloseSpecific = () => setShowSpecific(false);
  const handleShowSpecific = () => setShowSpecific(true);

  const handelDeleteSpecificItem = async () => {
    await dispatch(deleteCartSpecificItem(item._id));
    setShowSpecific(false);
    notify("تم حذف المنتج بنجاح", SUCCESS);
    setTimeout(() => window.location.reload(false), 1000);
  };

  return [
    showAll,
    handleCloseAll,
    handleShowAll,
    handleDeleteCart,

    showSpecific,
    handleCloseSpecific,
    handleShowSpecific,
    handelDeleteSpecificItem,
  ];
};

export default DeleteCartHook;
