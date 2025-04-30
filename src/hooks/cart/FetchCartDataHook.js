// Import Hooks from React and React-Redux
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Import custom actions to fetch cart data
import { getAllCartItems } from "../../redux/actions/cartAction";

// Custom hook responsible for fetching cart data in the navbar
const FetchCartDataHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllCartItems());
    };

    // Fetch cart data on component mount
    getData();
  }, [dispatch]); // Re-run the effect if `dispatch`
};

export default FetchCartDataHook;
