// Import React hooks and Redux hooks
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import the action to get a specific order
import { getSpecificOrder } from "../../redux/actions/ordersAction";

// Custom hook to fetch and return details of a specific order by ID
const AdminOrderDetailsHook = (id) => {
  // Initialize Redux dispatch
  const dispatch = useDispatch();

  // useEffect to dispatch the action to fetch order details on mount or when id changes
  useEffect(() => {
    // Async function to dispatch getSpecificOrder action
    const getOrderDetails = async () => await dispatch(getSpecificOrder(id));

    getOrderDetails();
  }, [dispatch, id]);

  // Get the result from the Redux store (specific order data)
  const result = useSelector((state) => state.ordersReducer.specificOrder);

  // useMemo to memoize the orderDetails data from the result to avoid unnecessary recalculations
  const orderDetails = useMemo(() => {
    if (result) return result.data;
    else return []; // Return empty array if no result
  }, [result]);

  // Return the orderDetails data as an array (for consistent hook return style)
  return [orderDetails];
};

// Export the custom hook as default
export default AdminOrderDetailsHook;
