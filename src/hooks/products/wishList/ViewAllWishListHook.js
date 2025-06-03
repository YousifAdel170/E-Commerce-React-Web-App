// Import necessary libraries from react, react-redux
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { EMPTY } from "../../../constants/general";

// Custom Hook for Product Card Container to get all favorite products
const ViewAllWishListHook = () => {
  // 1. Select the favorite products from the Redux store
  const result = useSelector((state) => state.wishListReducer.viewAllWishList);

  // 2. UseMemo to map the result to get the favorite products IDs
  const favoriteProducts = useMemo(() => {
    if (result?.data?.length) return result.data.map((item) => item._id);
    else return EMPTY.ARRAY;
  }, [result]);

  // 3. Return the favorite products
  return [favoriteProducts];
};

// Export the custom hook
export default ViewAllWishListHook;
