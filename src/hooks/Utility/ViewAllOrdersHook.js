import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/actions/ordersAction";

const ViewAllOrdersHook = () => {
  const dispatch = useDispatch();

  const limit = 1;

  useEffect(() => {
    const getOrders = async () => {
      await dispatch(getAllOrders(1));
      // await dispatch(getAllOrders());
    };

    getOrders();
  }, [dispatch]);

  const result = useSelector((state) => state.ordersReducer.viewAllOrders);

  const allOrders = useMemo(() => {
    if (result && result.data) return result.data;
    else return [];
  }, [result]);

  const numberOfOrders = useMemo(() => {
    if (result && result.results) return result.results;
    else return 0;
  }, [result]);

  const pageCount = useMemo(() => {
    if (result && result.paginationResult)
      return result.paginationResult.numberOfPages;
    else return 0;
  }, [result]);

  const onPress = async (page) => await dispatch(getAllOrders(limit, page));

  const user = JSON.parse(localStorage.getItem("user"));

  const userName = useMemo(() => {
    if (user !== null) return user.name;
    else "";
  }, [user]);

  return [allOrders, numberOfOrders, pageCount, onPress, userName];
};

export default ViewAllOrdersHook;
