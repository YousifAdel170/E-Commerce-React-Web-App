// Import Hooks from react, react-redux
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Actions
import { getAllOrders } from "../../redux/actions/ordersAction";
import { NUMBER_OF_ORDERS_PER_PAGE } from "../../constants/pageLimits";

// Hook Responsible to display all the orders and manage the pagination
const ViewAllOrdersHook = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () =>
      await dispatch(getAllOrders(NUMBER_OF_ORDERS_PER_PAGE));

    getOrders();
  }, [dispatch]);

  const { viewAllOrders, loading } = useSelector(
    (state) => state.ordersReducer
  );

  const allOrders = useMemo(() => {
    return viewAllOrders?.data || [];
  }, [viewAllOrders]);

  const numberOfOrders = useMemo(() => {
    return viewAllOrders?.results || 0;
  }, [viewAllOrders]);

  const pageCount = useMemo(() => {
    return viewAllOrders?.paginationResult?.numberOfPages || 0;
  }, [viewAllOrders]);

  useEffect(() => {
    if (!loading?.fetchAll) setIsLoading(false);
    else setIsLoading(true);
  }, [loading, viewAllOrders]);

  const getSelectedPageNumber = async (page) =>
    await dispatch(getAllOrders(NUMBER_OF_ORDERS_PER_PAGE, page));

  const user = JSON.parse(localStorage.getItem("user"));

  const userName = useMemo(() => {
    return user?.name || "";
  }, [user]);

  return [
    allOrders,
    numberOfOrders,
    pageCount,
    getSelectedPageNumber,
    userName,
    isLoading,
  ];
};

export default ViewAllOrdersHook;
