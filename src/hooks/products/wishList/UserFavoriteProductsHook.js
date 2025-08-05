import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewAllWishList } from "../../../redux/actions/wishListAction";
import { FAVORITE_PRODUCTS_BASE_URL } from "../../../config";

const UserFavoriteProductsHook = () => {
  // Dispatch to call the action
  const dispatch = useDispatch();

  // States of loading and items
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  // get all favorite products
  useEffect(() => {
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

  // Select the response of viewAllWishList from the store
  const result = useSelector((state) => state.wishListReducer.viewAllWishList);

  // UseEffect to set favorite products
  useEffect(() => {
    if (!loading) {
      // Check if there are favorite products
      if (result?.data) {
        // Update The URL of the images
        const updatedItems = result.data.map((product) => ({
          ...product,
          imageCover: FAVORITE_PRODUCTS_BASE_URL + product.imageCover,
          images: product.images.map(
            (image) => FAVORITE_PRODUCTS_BASE_URL + image
          ),
        }));

        setItems(updatedItems);
      }
    }
  }, [loading, result]);

  return [items];
};

export default UserFavoriteProductsHook;
