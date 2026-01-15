/* Importing necessary hooks from react and react-redux */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook";

// Import Custom Actions (Action to delete a user address)
import { deleteUserAddress } from "../../redux/actions/userAddressAction"; // Action to delete user address
import { useTranslation } from "react-i18next";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { STATUS_MESSAGES } from "../../constants/general";

// Hook for deleting a user address
const UserDeleteAddressHook = (address) => {
  // Hook to dispatch actions
  const dispatch = useDispatch();

  // State for modal visibility
  const [show, setShow] = useState(false); // State variable for managing modal visibility
  const handleClose = () => setShow(false); // Handler to close the modal
  const handleShow = () => setShow(true); // Handler to show the modal
  const [isPress, setIsPress] = useState(false);

  const { deletedUserAddress, loading } = useSelector(
    (state) => state.userAddressReducer
  );
  const { t } = useTranslation("notification_messages");

  // Handler to delete the address
  const handleDelete = async (e) => {
    e.preventDefault();

    if (!address?._id) return;

    setIsPress(true);

    // Dispatch dadingelete action with the address id
    await dispatch(deleteUserAddress(address?._id));
  };

  useEffect(() => {
    if (!loading?.delete && isPress) {
      setIsPress(false);

      if (deletedUserAddress?.status === STATUS_MESSAGES.SUCCESS)
        notify(t("success.userAddressDelete"), NOTIFICATION_TYPES.SUCCESS);
      else notify(t("error.userAddressDelete"), NOTIFICATION_TYPES.ERROR);

      setShow(false);
    }
  }, [deletedUserAddress, t, loading, isPress]);

  // Return state variables and handlers
  return [show, handleClose, handleShow, handleDelete, isPress]; // Return modal visibility state and handlers for opening, closing, and deleting
};

export default UserDeleteAddressHook; // Export the hook
