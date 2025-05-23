// Import necessary React and Redux hooks
import { useState } from "react";
import { useDispatch } from "react-redux";

// Import actions to clear all items or delete a specific item from the cart
import {
  clearAllCart,
  deleteCartSpecificItem,
  getAllCartItems,
} from "../../redux/actions/cartAction";

// Notification function and success constant
import notify from "../Utility/useNotifyHook";
import { SUCCESS, WARNING } from "../../constants/notificationTypes";
import ViewAllCartItemsHook from "./ViewAllCartItemsHook";

// Custom hook to handle deletion logic for cart items (all or specific)
const DeleteCartHook = (item) => {
  const dispatch = useDispatch();

  const [, numberOfItems] = ViewAllCartItemsHook();

  // === Delete All Cart Logic ===

  // Modal visibility state for deleting all items
  const [showAll, setShowAll] = useState(false);

  // Close delete all modal
  const handleCloseAll = () => setShowAll(false);

  // Show delete all modal
  const handleShowAll = () => setShowAll(true);

  // Handle confirming deletion of all cart items
  const handleDeleteCart = async () => {
    // Check if the cart is empty then return
    if (numberOfItems === 0) {
      notify("لا يوجد منتجات حاليا", WARNING);
      return;
    }

    // If the cart not empty then clear
    await dispatch(clearAllCart());
    notify("تم حذف الكل بنجاح", SUCCESS);
    setShowAll(false);
  };

  // === Delete Specific Item Logic ===

  // Modal visibility state for deleting a specific item
  const [showSpecific, setShowSpecific] = useState(false);

  // Close delete specific modal
  const handleCloseSpecific = () => setShowSpecific(false);

  // Show delete specific modal
  const handleShowSpecific = () => setShowSpecific(true);

  // Handle confirming deletion of a specific item
  const handelDeleteSpecificItem = async () => {
    await dispatch(deleteCartSpecificItem(item._id));
    setShowSpecific(false);
    notify("تم حذف المنتج بنجاح", SUCCESS);
    await dispatch(getAllCartItems());
  };

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
  ];
};

export default DeleteCartHook;
