import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUserAddress } from "../../redux/actions/userAddressAction";

// Hook for deleting a user address
const UserDeleteAddressHook = (id) => {
  const dispatch = useDispatch(); // Hook to dispatch actions

  // State for modal visibility
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); // Handler to close the modal
  const handleShow = () => setShow(true); // Handler to show the modal

  // Handler to delete the address
  const handleDelete = async () => {
    await dispatch(deleteUserAddress(id)); // Dispatch delete action
    setShow(false); // Close the modal
    window.location.reload(false); // Reload the page to reflect changes
  };

  // Return state variables and handlers
  return [show, handleClose, handleShow, handleDelete];
};

export default UserDeleteAddressHook;
