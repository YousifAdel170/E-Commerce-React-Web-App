/* eslint-disable react-hooks/exhaustive-deps */

// Import Hooks from React and React-Redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook";
import ViewSpecificProductHook from "../products/ViewSpecificProductHook";

// Import Custom Actions for updating the cart item
import {
  getAllCartItems,
  resetState,
  updateCartSpecificItem,
} from "../../redux/actions/cartAction";

// Import Configuration for toastify notifications
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { useTranslation } from "react-i18next";
import { STATUS } from "../../constants/general";

const UpdateCartHook = (item) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("notification_messages");

  // State to track the item count in the cart
  const [itemCount, setItemCount] = useState(0);
  const [isPressEdit, setIsPressEdit] = useState(false);

  // Use custom hook to get details of the specific product
  const [specificProduct] = ViewSpecificProductHook(item?.product?.id || "");

  // Handle change in the item count input field
  const onChangeCount = (e) => setItemCount(e.target.value);

  const { loading, updatedCartItem } = useSelector(
    (state) => state.cartReducer,
  );

  // Set the initial item count when the hook is first run
  useEffect(() => setItemCount(item?.count), []); // Runs once when the component is mounted

  // State for handling visibility of the update modal
  const [showSpecificUpdate, setShowSpecificUpdate] = useState(false);

  // Functions to control showing and closing the update modal
  const handleCloseSpecificUpdate = () => setShowSpecificUpdate(false);
  const handleShowSpecificUpdate = () => setShowSpecificUpdate(true);

  // Handle updating the specific item in the cart
  const handleUpdateSpecificItem = async () => {
    // Check if the requested quantity is available
    if (specificProduct?.quantity < itemCount)
      return notify(
        t("cart.stockLimit", { count: specificProduct?.quantity }),
        NOTIFICATION_TYPES.WARNING,
      );

    setIsPressEdit(true);

    // Dispatch the update action to update the specific item in the cart
    await dispatch(
      updateCartSpecificItem(item?._id, {
        count: itemCount,
      }),
    );
  };

  useEffect(() => {
    if (!loading?.update && isPressEdit) {
      setIsPressEdit(false);
      console.log("updatedCartItem", updatedCartItem);
      if (
        updatedCartItem?.status === STATUS.SUCCESS_CREATED ||
        updatedCartItem?.status === STATUS.SUCCESS_OK
      )
        notify(t("general.updateSuccess"), NOTIFICATION_TYPES.SUCCESS);
      else notify(t("general.updateFail"), NOTIFICATION_TYPES.ERROR);
      dispatch(getAllCartItems());
      // Close the modal and show success notification
      setShowSpecificUpdate(false);
      dispatch(resetState());
    }
  }, [loading, isPressEdit, updatedCartItem, t, dispatch]);

  return [
    itemCount, // Current item count
    onChangeCount, // Function to update the item count
    showSpecificUpdate, // State for showing the update modal
    handleCloseSpecificUpdate, // Function to close the modal
    handleShowSpecificUpdate, // Function to open the modal
    handleUpdateSpecificItem, // Function to update the item in the cart
    isPressEdit,
  ];
};

export default UpdateCartHook;
