import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificOrder } from "../../redux/actions/ordersAction";

const AdminOrderDetailsHook = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrderDetails = async () => await dispatch(getSpecificOrder(id));

    getOrderDetails();
  }, [dispatch, id]);

  const result = useSelector((state) => state.ordersReducer.specificOrder);

  const orderDetails = useMemo(() => {
    if (result) return result.data;
    else [];
  }, [result]);

  return [orderDetails];
};

export default AdminOrderDetailsHook;
