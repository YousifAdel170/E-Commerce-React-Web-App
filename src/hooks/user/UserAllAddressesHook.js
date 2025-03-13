import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAddress } from "../../redux/actions/userAddressAction";

// Hook for fetching all user addresses
const UserAllAddressesHook = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions

  // Fetch all user addresses when component mounts
  useEffect(() => {
    const getData = async () => await dispatch(getAllUserAddress());
    getData();
  }, [dispatch]);

  // Selector to get all user addresses from the Redux store
  const result = useSelector(
    (state) => state.userAddressReducer.viewUserAddresses
  );

  // Memoize the addresses data
  const addresses = useMemo(() => {
    if (result && result.data) return result.data;
    else return [];
  }, [result]);

  // Return the addresses data
  return [addresses];
};

export default UserAllAddressesHook;
