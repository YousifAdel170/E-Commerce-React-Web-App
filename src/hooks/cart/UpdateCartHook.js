/* eslint-disable react-hooks/exhaustive-deps */

// Import Hooks From react, react-redux
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook";
import ViewSpecificProductHook from "../products/ViewSpecificProductHook";

// Import Custom Actions
import { updateCartSpecificItem } from "../../redux/actions/cartAction";

// Import Used Configuration for toastify notification
import { SUCCESS, WARNING } from "../../config";

const UpdateCartHook = (item) => {
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = useState(0);

  const [specificProduct] = ViewSpecificProductHook(item?.product?.id || "");

  const onChangeCount = (e) => setItemCount(e.target.value);

  useEffect(() => setItemCount(item?.count), []);

  const [showSpecificUpdate, setShowSpecificUpdate] = useState(false);
  const handleCloseSpecificUpdate = () => setShowSpecificUpdate(false);
  const handleShowSpecificUpdate = () => setShowSpecificUpdate(true);

  const handleUpdateSpecificItem = async () => {
    if (specificProduct?.quantity < itemCount) {
      notify(`متوفر ${specificProduct?.quantity} منتجات فقط`, WARNING);
      return;
    }

    await dispatch(
      updateCartSpecificItem(item?._id, {
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
