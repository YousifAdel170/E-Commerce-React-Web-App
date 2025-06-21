// Import necessary libraries from react, react-redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import the action to view all wish list items
import { viewAllWishList } from "../../../redux/actions/wishListAction";

// Import Constants
import { USER_ROLES } from "../../../constants/general";

const FetchWishList = () => {
  // 1. Import the useDispatch hook from react-redux
  const dispatch = useDispatch();

  // Get the current user
  const user = useSelector((state) => state.authReducer.user);

  // 3. UseEffect to dispatch the action to get all favorite products
  useEffect(() => {
    if (user?.role === USER_ROLES.ADMIN) {
      return;
    }

    // Function to get all favorite products
    const getFavoriteProducts = async () => await dispatch(viewAllWishList());

    // Get all favorite products
    setTimeout(() => getFavoriteProducts(), 300);
  }, [dispatch, user]);
};

export default FetchWishList;
