// Import Hooks from react, react-redux
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Actions
import { getAllOrders } from "../../redux/actions/ordersAction";
import { NUMBER_OF_ORDERS_PER_PAGE } from "../../constants/pageLimits";

// Hook Responsible to display all the orders and manage the pagination
const ViewAllOrdersHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrders = async () => {
      await dispatch(getAllOrders(NUMBER_OF_ORDERS_PER_PAGE));
      // await dispatch(getAllOrders());
    };

    getOrders();
  }, [dispatch]);

  const result = useSelector((state) => state.ordersReducer.viewAllOrders);

  const allOrders = useMemo(() => {
    if (result) return result.data;
    else return [];
  }, [result]);

  const numberOfOrders = useMemo(() => {
    if (result) return result.results;
    else return 0;
  }, [result]);

  const pageCount = useMemo(() => {
    if (result?.paginationResult) return result.paginationResult.numberOfPages;
    else return 0;
  }, [result]);

  const onPress = async (page) =>
    await dispatch(getAllOrders(NUMBER_OF_ORDERS_PER_PAGE, page));

  const user = JSON.parse(localStorage.getItem("user"));

  const userName = useMemo(() => {
    if (user !== null) return user.name;
    else "";
  }, [user]);

  return [allOrders, numberOfOrders, pageCount, onPress, userName];
};

export default ViewAllOrdersHook;
