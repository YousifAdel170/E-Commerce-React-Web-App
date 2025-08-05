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

// Import Used Constants
import { NUMBERS, STATUS, USER_ROLES } from "../../../constants/general";
import { NOTIFICATION_TYPES } from "../../../constants/notificationTypes";
import { useTranslation } from "react-i18next";

// Hook responsible for handling the product card
const ProductCardHook = (item, favoriteProducts) => {
  // Dispatch
  const dispatch = useDispatch();

  const { t } = useTranslation("notification_messages");

  // Check if the product is in the favorite list
  let favorite = favoriteProducts.some((fav) => fav === item?._id);

  // States
  const [favIcon, setFavIcon] = useState(NUMBERS.ZERO);
  const [isFav, setIsFav] = useState(favorite);
  const [loadingAdd, setLoadingAdd] = useState(true);
  const [loadingRemove, setLoadingRemove] = useState(true);
  const [animateFav, setAnimateFav] = useState(false);

  const [loading, setLoading] = useState(false);

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
    if (isFav) setFavIcon(NUMBERS.ONE);
    else setFavIcon(NUMBERS.ZERO);
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
      notify(t("wishlist.adminRestricted"), NOTIFICATION_TYPES.ERROR);
      return;
    }

    setIsFav(true);
    setFavIcon(1);

    // Start Loading
    setLoadingAdd(true);
    setLoading(true);
    await dispatch(addToWishList({ productId: item?._id }));
    setLoadingAdd(false);
    setLoading(false);
    // End Loading
  };

  // Function to handle remove from wishList: Change the favorite button image to off, then remove the product from the favorite list
  const removeFromWishListData = async () => {
    // Check if the current user is admin then prevent him from adding to the cart
    if (user?.role === USER_ROLES.ADMIN) {
      notify(t("wishlist.adminRestricted"), NOTIFICATION_TYPES.ERROR);
      return;
    }

    setIsFav(false);
    setFavIcon(0);

    // Start Loading of Remove favorite product
    setLoadingRemove(true);
    setLoading(true);
    await dispatch(removeFromWishList(item?._id));
    setLoadingRemove(false);
    setLoading(false);
    // End Loading of Remove favorite product
  };

  // UseEffect to handle the response of addToWishList
  useEffect(() => {
    if (!loadingAdd) {
      try {
        if (resultAdd?.status === STATUS.SUCCESS_OK)
          notify(t("wishlist.added"), NOTIFICATION_TYPES.SUCCESS);
        else if (resultAdd?.status === STATUS.UNAUTHORIZED)
          notify(t("wishlist.loginRequired"), NOTIFICATION_TYPES.ERROR);
      } catch (error) {
        console.error(error);
      }
    }
  }, [loadingAdd, resultAdd, t]);

  // UseEffect to handle the response of removeFromWishList
  useEffect(() => {
    if (!loadingRemove) {
      try {
        if (resultRemove?.status === NOTIFICATION_TYPES.SUCCESS)
          notify(t("wishlist.removed"), NOTIFICATION_TYPES.SUCCESS);
        else if (resultRemove?.status === STATUS.UNAUTHORIZED)
          notify(t("wishlist.loginRequired"), NOTIFICATION_TYPES.ERROR);
      } catch (error) {
        console.error(error);
      }
    }
  }, [loadingRemove, resultRemove, t]);

  // Calculate discount amount and percentage for display badge
  const { discountAmount, discountPercent } = calculateDiscounts(item);
  const onFavClick = () => {
    handleFav(); // existing toggle logic
    setAnimateFav(true); // trigger animation
  };

  // remove animation class after animation ends
  const handleAnimationEnd = () => setAnimateFav(false);

  return [
    favIcon,
    discountAmount,
    discountPercent,
    animateFav,
    onFavClick,
    handleAnimationEnd,
    loading,
  ];
};

export default ProductCardHook;
