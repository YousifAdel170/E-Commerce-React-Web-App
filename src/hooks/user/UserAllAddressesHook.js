/* Importing necessary hooks from react, react-redux */
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Actions (Action to fetch all user addresses)
import {
  getAllAddressesInSelectedPage,
  getAllUserAddress,
} from "../../redux/actions/userAddressAction"; // Action to fetch all user addresses
import { PAGE_ADDRESSES_LIMIT } from "../../constants/pageLimits";

// Hook for fetching all user addresses
const UserAllAddressesHook = () => {
  const dispatch = useDispatch();
  // 3. Local state to manage the loading state of the component
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all user addresses when component mounts
  useEffect(() => {
    const getData = async () =>
      await dispatch(getAllUserAddress(PAGE_ADDRESSES_LIMIT));
    getData();
  }, [dispatch]);

  // Selector to get all user addresses from the Redux store
  const { viewUserAddresses, loading } = useSelector(
    (state) => state.userAddressReducer
  );

  const addresses = useMemo(() => {
    return viewUserAddresses?.data || [];
  }, [viewUserAddresses]);

  const pageCount = useMemo(() => {
    return viewUserAddresses?.paginationResult?.numberOfPages || 0;
  }, [viewUserAddresses]);

  useEffect(() => {
    if (!loading?.fetchAll) setIsLoading(false);
    else setIsLoading(true);
  }, [loading, viewUserAddresses]);

  const getSelectedPageNumber = async (selectedPage) =>
    await dispatch(
      getAllAddressesInSelectedPage(PAGE_ADDRESSES_LIMIT, selectedPage)
    );

  // Return the addresses data
  return [addresses, isLoading, pageCount, getSelectedPageNumber];
};

export default UserAllAddressesHook; // Export the hook
