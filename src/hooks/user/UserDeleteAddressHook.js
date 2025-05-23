/* Importing necessary hooks from react and react-redux */
import { useState } from "react";
import { useDispatch } from "react-redux";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook";

// Import Custom Actions (Action to delete a user address)
import { deleteUserAddress } from "../../redux/actions/userAddressAction"; // Action to delete user address

// Import Used Configurations
import { SUCCESS } from "../../constants/notificationTypes";

// Hook for deleting a user address
const UserDeleteAddressHook = (id, onDeleteSuccess) => {
  // Hook to dispatch actions
  const dispatch = useDispatch();

  // State for modal visibility
  const [show, setShow] = useState(false); // State variable for managing modal visibility
  const handleClose = () => setShow(false); // Handler to close the modal
  const handleShow = () => setShow(true); // Handler to show the modal

  // Handler to delete the address
  const handleDelete = async () => {
    // Dispatch delete action with the address id
    await dispatch(deleteUserAddress(id));

    // Close the modal after deletion
    setShow(false);

    // Notify that the addrress has been successfully deleted
    notify("تم حذف العنوان بنجاح", SUCCESS);

    // Notify parent to remove the item
    if (onDeleteSuccess) onDeleteSuccess(id);
  };

  // Return state variables and handlers
  return [show, handleClose, handleShow, handleDelete]; // Return modal visibility state and handlers for opening, closing, and deleting
};

export default UserDeleteAddressHook; // Export the hook
