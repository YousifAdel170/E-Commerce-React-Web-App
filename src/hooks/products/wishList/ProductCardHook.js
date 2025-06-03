// Import hooks from react, react-redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Hooks
import notify from "../../Utility/useNotifyHook";
import { calculateDiscounts } from "../../Utility/useDiscountHook";

// Import Custom Actions
import {
  addToWishList,
  removeFromWishList,
} from "../../../redux/actions/wishListAction";

// Import Assets
import favoff from "../../../assets/Imgs/fav-off.png";
import favon from "../../../assets/Imgs/fav-on.png";

// Import Used Constants
import { ERROR, SUCCESS } from "../../../constants/notificationTypes";
import { STATUS, USER_ROLES } from "../../../constants/general";
import {
  GENERAL_MESSAGES,
  WISHLIST_MESSAGES,
} from "../../../constants/messagesConstants";

// Hook responsible for handling the product card
const ProductCardHook = (item, favoriteProducts) => {
  // Dispatch
  const dispatch = useDispatch();

  // Check if the product is in the favorite list
  let favorite = favoriteProducts.some((fav) => fav === item?._id);

  // States
  const [favImage, setFavImage] = useState(favoff);
  const [isFav, setIsFav] = useState(favorite);
  const [loadingAdd, setLoadingAdd] = useState(true);
  const [loadingRemove, setLoadingRemove] = useState(true);
  const [animateFav, setAnimateFav] = useState(false);

  // UseEffect to check if the product is in the favorite list
  useEffect(() => {
    setIsFav(favoriteProducts.some((fav) => fav === item?._id));
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

  // Get the current user
  const user = useSelector((state) => state.authReducer.user);

  // Function to handle add to wishList: Change the favorite button image to on, then add the product to the favorite list
  const addToWishListData = async () => {
    // Check if the current user is admin then prevent him from adding to the cart
    if (user?.role === USER_ROLES.ADMIN) {
      notify(WISHLIST_MESSAGES.ADMIN_RESTRICTED, ERROR);
      return;
    }

    setIsFav(true);
    setFavImage(favon);

    // Start Loading
    setLoadingAdd(true);
    await dispatch(addToWishList({ productId: item?._id }));
    setLoadingAdd(false);
    // End Loading
  };

  // Function to handle remove from wishList: Change the favorite button image to off, then remove the product from the favorite list
  const removeFromWishListData = async () => {
    // Check if the current user is admin then prevent him from adding to the cart
    if (user?.role === USER_ROLES.ADMIN) {
      notify(WISHLIST_MESSAGES.ADMIN_RESTRICTED, ERROR);
      return;
    }

    setIsFav(false);
    setFavImage(favoff);

    // Start Loading of Remove favorite product
    setLoadingRemove(true);
    await dispatch(removeFromWishList(item?._id));
    setLoadingRemove(false);
    // End Loading of Remove favorite product
  };

  // UseEffect to handle the response of addToWishList
  useEffect(() => {
    if (!loadingAdd) {
      try {
        if (resultAdd?.status === STATUS.SUCCESS_OK)
          notify(GENERAL_MESSAGES.ADD_SUCCESSFULLY, SUCCESS);
        else if (resultAdd?.status === STATUS.UNAUTHORIZED)
          notify(WISHLIST_MESSAGES.LOGIN_REQUIRED, ERROR);
      } catch (error) {
        console.error(error);
      }
    }
  }, [loadingAdd, resultAdd]);

  // UseEffect to handle the response of removeFromWishList
  useEffect(() => {
    if (!loadingRemove) {
      try {
        if (resultRemove?.status === SUCCESS)
          notify(GENERAL_MESSAGES.DELETE_SUCCESSFULLY, SUCCESS);
        else if (resultRemove?.status === STATUS.UNAUTHORIZED)
          notify(WISHLIST_MESSAGES.LOGIN_REQUIRED, ERROR);
      } catch (error) {
        console.error(error);
      }
    }
  }, [loadingRemove, resultRemove]);

  // Calculate discount amount and percentage for display badge
  const { discountAmount, discountPercent } = calculateDiscounts(item);
  const onFavClick = () => {
    handleFav(); // existing toggle logic
    setAnimateFav(true); // trigger animation
  };

  // remove animation class after animation ends
  const handleAnimationEnd = () => setAnimateFav(false);

  return [
    favImage,
    discountAmount,
    discountPercent,
    animateFav,
    onFavClick,
    handleAnimationEnd,
  ];
};

export default ProductCardHook;
