/* Importing necessary hooks from react, react-redux */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Actions (Action to fetch all user addresses)
import { getAllUserAddress } from "../../redux/actions/userAddressAction"; // Action to fetch all user addresses

// Hook for fetching all user addresses
const UserAllAddressesHook = () => {
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([]);

  // Fetch all user addresses when component mounts
  useEffect(() => {
    const getData = async () => await dispatch(getAllUserAddress());
    getData();
  }, [dispatch]);

  // Selector to get all user addresses from the Redux store
  const result = useSelector(
    (state) => state.userAddressReducer.viewUserAddresses
  );

  useEffect(() => {
    if (result) setAddresses(result.data);
    else setAddresses([]);
  }, [result]);

  const handleDelete = (deletedID) =>
    setAddresses((prev) => prev.filter((address) => address._id !== deletedID));

  // Return the addresses data
  return [addresses, handleDelete]; // Return the memoized addresses
};

export default UserAllAddressesHook; // Export the hook
