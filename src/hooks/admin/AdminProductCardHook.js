// Import React hooks and Redux utilities
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook";

// Import Redux action for deleting a product
import { deleteProduct } from "../../redux/actions/productsAction";

// Import notification types constants and custom notification hook
import { EMPTY } from "../../constants/general";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { useTranslation } from "react-i18next";

// Custom hook for managing admin product card logic (modals, actions, discount calculation)
const AdminProductCardHook = (item, onDelete) => {
  // Redux dispatch function to dispatch actions + React router navigate function for redirection on edit
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation(["notification_messages", "utilities"]);

  // Modal visibility state for Delete and Edit modals
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // Loading state during async delete operation
  const [loading, setLoading] = useState(true);

  // Handlers to open/close Delete modal
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  // Handlers to open/close Edit modal
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  // Handler to delete product by dispatching redux action
  const handleDelete = async () => {
    setLoading(true); // Start loading state
    await dispatch(deleteProduct(item?._id)); // Dispatch delete product action with product ID
    setLoading(false); // Stop loading state

    setShowDelete(false); // Close the delete confirmation modal

    if (onDelete) onDelete(item?._id); // Call onDelete callback if provided (for parent updates)
  };

  // Selector to get result of delete operation from Redux state
  const result = useSelector((state) => state.allProduct.deletedProduct);

  // Effect runs on loading/result change to show notification messages
  useEffect(() => {
    if (!loading) {
      if (result === EMPTY.TEXT)
        notify(
          t("notification_messages:general.deleteSuccess"),
          NOTIFICATION_TYPES.SUCCESS
        );
      else
        notify(
          t("notification_messages:general.deleteFail"),
          NOTIFICATION_TYPES.ERROR
        );
    }
  }, [loading, result, t]);

  // Handler to redirect to Edit product page and close Edit modal
  const handleEdit = async () => {
    navigate(`/admin/edit-product/${item?._id}`);
    handleCloseEdit(false);
  };

  // Array of action button data for rendering Edit and Delete buttons
  const actions = [
    {
      label: t("utilities:modal.delete"),
      onClick: handleShowDelete,
      ariaLabel: `${t("utilities:modal.deleteAriaLabel")}: ${item?.title}`,
    },
    {
      label: t("utilities:modal.edit"),
      onClick: handleShowEdit,
      ariaLabel: `${t("utilities:modal.editAriaLabel")}: ${item?.title}`,
    },
  ];

  // Calculate discount amount and percentage for display badge
  const discountAmount =
    item?.price && item?.priceAfterDiscount
      ? item.price - item.priceAfterDiscount
      : 0;
  const discountPercent =
    discountAmount && item.price
      ? Math.round((discountAmount / item.price) * 100)
      : 0;

  // Return all states, handlers, actions, and discount info to be used by component
  return [
    showDelete,
    showEdit,
    handleCloseDelete,
    handleCloseEdit,
    handleDelete,
    handleEdit,
    actions,
    discountAmount,
    discountPercent,
  ];
};

// Export the custom hook
export default AdminProductCardHook;
