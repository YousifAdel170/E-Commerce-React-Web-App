import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewAllWishList } from "../../../redux/actions/wishListAction";

const ProductCardContainerHook = () => {
  //  Dispatch
  const dispatch = useDispatch();

  //  States
  const [loading, setLoading] = useState(true);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  //  Select the response of viewAllWishList from the store
  const result = useSelector((state) => state.wishListReducer.viewAllWishList);

  //  UseEffect to get all favorite products
  useEffect(() => {
    // Function to get all favorite products
    const getFavoriteProducts = async () => {
      // Start Loading of getting favorite products
      setLoading(true);
      await dispatch(viewAllWishList());
      setLoading(false);
      // End Loading of getting favorite products
    };

    // Get all favorite products
    getFavoriteProducts();
  }, [dispatch]);

  //  UseEffect to set favorite products
  useEffect(() => {
    // Check if the data is loaded
    if (!loading) {
      // Check if there are favorite products
      if (result.data.length >= 1)
        setFavoriteProducts(result.data.map((item) => item._id));
      // If there are no favorite products, set the favorite products to an empty array
      else setFavoriteProducts([]);
    }
  }, [loading, result]);

  return [favoriteProducts];
};
export default ProductCardContainerHook;
