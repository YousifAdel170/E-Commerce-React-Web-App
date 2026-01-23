// Import necessary React and Redux hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import actions to clear all items or delete a specific item from the cart
import {
  clearAllCart,
  deleteCartSpecificItem,
  resetState,
} from "../../redux/actions/cartAction";

// Notification function and success constant
import notify from "../Utility/useNotifyHook";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import ViewAllCartItemsHook from "./ViewAllCartItemsHook";
import { useTranslation } from "react-i18next";
import { STATUS_MESSAGES } from "../../constants/general";

// Custom hook to handle deletion logic for cart items (all or specific)
const DeleteCartHook = (item) => {
  const dispatch = useDispatch();

  const [, numberOfItems] = ViewAllCartItemsHook();

  const { loading, deletedCartItem, clearCart, error } = useSelector(
    (state) => state.cartReducer,
  );

  const { t } = useTranslation("notification_messages");

  // === Delete All Cart Logic ===

  // Modal visibility state for deleting all items
  const [showAll, setShowAll] = useState(false);
  const [isPressDeleteItem, setIsPressDeleteItem] = useState(false);
  const [isPressDeleteCart, setIsPressDeleteCart] = useState(false);

  // Close delete all modal
  const handleCloseAll = () => setShowAll(false);

  // Show delete all modal
  const handleShowAll = () => setShowAll(true);

  // Handle confirming deletion of all cart items
  const handleDeleteCart = async (e) => {
    e.preventDefault();

    // Check if the cart is empty then return
    if (numberOfItems === 0)
      return notify(t("cart.emptyCartWarning"), NOTIFICATION_TYPES.WARNING);

    // If the cart not empty then clear
    setIsPressDeleteCart(true);
    await dispatch(clearAllCart());
  };

  useEffect(() => {
    if (!loading?.clearAll && isPressDeleteCart) {
      setIsPressDeleteCart(false);
      if (clearCart != null || !error?.clearAll)
        notify(t("cart.allDeletedSuccess"), NOTIFICATION_TYPES.SUCCESS);
      else notify(t("cart.allDeletedFail"), NOTIFICATION_TYPES.ERROR);

      setShowAll(false);
      dispatch(resetState);
    }
  }, [clearCart, loading, t, dispatch, error, isPressDeleteCart]);

  // === Delete Specific Item Logic ===

  // Modal visibility state for deleting a specific item
  const [showSpecific, setShowSpecific] = useState(false);

  // Close delete specific modal
  const handleCloseSpecific = () => setShowSpecific(false);

  // Show delete specific modal
  const handleShowSpecific = () => setShowSpecific(true);

  // Handle confirming deletion of a specific item
  const handelDeleteSpecificItem = async (e) => {
    e.preventDefault();
    if (!item?._id) return;

    setIsPressDeleteItem(true);
    await dispatch(deleteCartSpecificItem(item?._id));
  };

  useEffect(() => {
    if (!loading?.delete && isPressDeleteItem) {
      console.log("deletedCartItem", deletedCartItem);
      setIsPressDeleteItem(false);
      if (!error?.delete || deletedCartItem?.status === STATUS_MESSAGES.SUCCESS)
        notify(t("cart.itemDeletedSuccess"), NOTIFICATION_TYPES.SUCCESS);
      else notify(t("cart.itemDeletedFail"), NOTIFICATION_TYPES.ERROR);

      setShowSpecific(false);
      dispatch(resetState);
    }
  }, [deletedCartItem, loading, t, dispatch, isPressDeleteItem, error]);

  // Return the handlers and modal states
  return [
    showAll,
    handleCloseAll,
    handleShowAll,
    handleDeleteCart,

    showSpecific,
    handleCloseSpecific,
    handleShowSpecific,
    handelDeleteSpecificItem,
    isPressDeleteItem,
    isPressDeleteCart,
  ];
};

export default DeleteCartHook;
