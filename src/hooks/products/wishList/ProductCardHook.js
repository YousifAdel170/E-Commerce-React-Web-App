import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
} from "../../../redux/actions/wishListAction";
import notify from "../../Utility/useNotifyHook";

import favoff from "../../../assets/Imgs/fav-off.png";
import favon from "../../../assets/Imgs/fav-on.png";
import { ERROR, SUCCESS } from "../../../config";

const ProductCardHook = (item, favoriteProducts) => {
  // Dispatch
  const dispatch = useDispatch();

  // Check if the product is in the favorite list
  let favorite = favoriteProducts.some((fav) => fav === item._id);

  // States
  const [favImage, setFavImage] = useState(favoff);
  const [isFav, setIsFav] = useState(favorite);
  const [loadingAdd, setLoadingAdd] = useState(true);
  const [loadingRemove, setLoadingRemove] = useState(true);

  // UseEffect to check if the product is in the favorite list
  useEffect(() => {
    setIsFav(favoriteProducts.some((fav) => fav === item._id));
  }, [favoriteProducts, item]);

  // Function to handle favorite button: After clicking the button, check if the product is in the favorite list then remove it, otherwise add it
  const handleFav = () => {
    if (isFav) removeFromWishListData();
    else addToWishListData();
  };

  // UseEffect to change favorite button image
  useEffect(() => {
    if (isFav) setFavImage(favon);
    else setFavImage(favoff);
  }, [isFav]);

  // select the response of addToWishList from the store
  const resultAdd = useSelector((state) => state.wishListReducer.addToWishList);

  // select the response of removeFromWishList from the store
  const resultRemove = useSelector(
    (state) => state.wishListReducer.removeFromWishList
  );

  // Function to handle add to wishList: Change the favorite button image to on, then add the product to the favorite list
  const addToWishListData = async () => {
    setIsFav(true);
    setFavImage(favon);

    // Start Loading
    setLoadingAdd(true);
    await dispatch(addToWishList({ productId: item._id }));
    setLoadingAdd(false);
    // End Loading
  };

  // Function to handle remove from wishList: Change the favorite button image to off, then remove the product from the favorite list
  const removeFromWishListData = async () => {
    setIsFav(false);
    setFavImage(favoff);

    // Start Loading of Remove favorite product
    setLoadingRemove(true);
    await dispatch(removeFromWishList(item._id));
    setLoadingRemove(false);
    // End Loading of Remove favorite product
  };

  // UseEffect to handle the response of addToWishList
  useEffect(() => {
    if (!loadingAdd) {
      try {
        if (resultAdd && resultAdd.status === 200) {
          notify("تمت اضافة المنتج للمفضلة بنجاح", SUCCESS);
        } else if (resultAdd && resultAdd.status === 401) {
          notify("الرجاء تسجيل الدخول", ERROR);
        }
      } catch (error) {
        console.error("Error in notify:", error);
      }
    }
  }, [loadingAdd, resultAdd]);

  // UseEffect to handle the response of removeFromWishList
  useEffect(() => {
    if (!loadingRemove) {
      try {
        if (resultRemove && resultRemove.status === "success")
          notify("تمت حذف المنتج من المفضلة بنجاح", SUCCESS);
        else if (resultRemove && resultRemove.status === 401)
          notify("الرجاء تسجيل الدخول", ERROR);
      } catch (error) {
        console.error("Error in notify:", error);
      }
    }
  }, [loadingRemove, resultRemove]);

  return [handleFav, favImage];
};

export default ProductCardHook;
