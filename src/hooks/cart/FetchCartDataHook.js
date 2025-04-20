// Import Hooks From react, react-redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Actions
import { getAllCartItems } from "../../redux/actions/cartAction";

// Hook Responsible to fetch Data once in the navbar of the cart
const FetchCartDataHook = () => {
  const dispatch = useDispatch();

  // Get the current cart state from Redux
  const result = useSelector((state) => state.cartReducer.allCartItems);

  useEffect(() => {
    const getData = async () => {
      // Only dispatch if the cart has not been fetched yet
      if (!result || result.status !== "success")
        await dispatch(getAllCartItems());
    };

    getData();
  }, [dispatch, result]);
};

export default FetchCartDataHook;
