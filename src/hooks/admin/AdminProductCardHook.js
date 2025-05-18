import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../redux/actions/productsAction";
import { ERROR, SUCCESS } from "../../config";
import notify from "../Utility/useNotifyHook";

const AdminProductCardHook = (item, onDelete) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    // Delete The Item From
    setLoading(true);
    await dispatch(deleteProduct(item?._id));
    setLoading(false);

    // Close The Modal
    setShowDelete(false);

    if (onDelete) onDelete(item?._id);
  };

  const result = useSelector((state) => state.allProduct.deletedProduct);

  useEffect(() => {
    if (!loading) {
      if (result === "") notify("تم حذف المنتج بنجاح", SUCCESS);
      else notify("حدث خطأ ما اثناء عملية الحذف", ERROR);
    }
  }, [loading, result]);

  const handleEdit = async () => {
    navigate(`/admin/edit-product/${item?._id}`);
    // Close The Modal
    handleCloseEdit(false);
  };

  return [
    showDelete,
    showEdit,
    handleCloseDelete,
    handleShowDelete,
    handleCloseEdit,
    handleShowEdit,
    handleDelete,
    handleEdit,
  ];
};

export default AdminProductCardHook;
