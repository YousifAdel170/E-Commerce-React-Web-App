// Import necessary libraries from react, react-redux
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import the action to view all wish list items
import { viewAllWishList } from "../../../redux/actions/wishListAction";

// Custom Hook for Product Card Container to get all favorite products
const ViewAllWishListHook = () => {
  // 1. Import the useDispatch hook from react-redux
  const dispatch = useDispatch();

  // 2. Select the favorite products from the Redux store
  const result = useSelector((state) => state.wishListReducer.viewAllWishList);

  // 3. UseEffect to dispatch the action to get all favorite products
  useEffect(() => {
    // Function to get all favorite products
    const getFavoriteProducts = async () => await dispatch(viewAllWishList());

    // Get all favorite products
    setTimeout(() => getFavoriteProducts(), 300);
  }, [dispatch]);

  // 4. UseMemo to map the result to get the favorite products IDs
  const favoriteProducts = useMemo(() => {
    if (result && result.data && result.data.length)
      return result.data.map((item) => item._id);
    else return [];
  }, [result]);

  // 5. Return the favorite products
  return [favoriteProducts];
};

// Export the custom hook
export default ViewAllWishListHook;
