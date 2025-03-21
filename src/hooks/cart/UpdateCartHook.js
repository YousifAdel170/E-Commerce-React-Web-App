/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { updateCartSpecificItem } from "../../redux/actions/cartAction";
import { useDispatch } from "react-redux";
import notify from "../Utility/useNotifyHook";
import { SUCCESS, WARNING } from "../../config";
import ViewProductDetailsHook from "../products/ViewProductDetailsHook";

const UpdateCartHook = (item) => {
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = useState(0);

  const [itemProduct] = ViewProductDetailsHook(
    item && item.product ? item.product.id : ""
  );

  const onChangeCount = (e) => setItemCount(e.target.value);

  useEffect(() => {
    if (item) setItemCount(item.count);
  }, []);

  const [showSpecificUpdate, setShowSpecificUpdate] = useState(false);
  const handleCloseSpecificUpdate = () => setShowSpecificUpdate(false);
  const handleShowSpecificUpdate = () => setShowSpecificUpdate(true);

  const handleUpdateSpecificItem = async () => {
    if (itemProduct.quantity < itemCount) {
      notify(`متوفر ${itemProduct.quantity} منتجات فقط`, WARNING);
      return;
    }

    await dispatch(
      updateCartSpecificItem(item._id, {
        count: itemCount,
      })
    );

    setShowSpecificUpdate(false);
    notify("تم تعديل المنتج بنجاح", SUCCESS);
    setTimeout(() => window.location.reload(false), 1000);
  };

  return [
    itemCount,
    onChangeCount,
    showSpecificUpdate,
    handleCloseSpecificUpdate,
    handleShowSpecificUpdate,
    handleUpdateSpecificItem,
  ];
};

export default UpdateCartHook;
