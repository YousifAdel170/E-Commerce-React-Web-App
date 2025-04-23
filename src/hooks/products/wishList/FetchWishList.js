// Import necessary libraries from react, react-redux
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Import the action to view all wish list items
import { viewAllWishList } from "../../../redux/actions/wishListAction";

const FetchWishList = () => {
  // 1. Import the useDispatch hook from react-redux
  const dispatch = useDispatch();

  // 3. UseEffect to dispatch the action to get all favorite products
  useEffect(() => {
    // Function to get all favorite products
    const getFavoriteProducts = async () => await dispatch(viewAllWishList());

    // Get all favorite products
    setTimeout(() => getFavoriteProducts(), 300);
  }, [dispatch]);
};

export default FetchWishList;
