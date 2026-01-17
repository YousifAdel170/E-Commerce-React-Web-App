import { useMemo, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Utils
import notify from "../../Utility/useNotifyHook";
import { calculateDiscounts } from "../../Utility/useDiscountHook";

// Actions
import {
  createToWishList,
  deleteFromWishList,
  resetState,
} from "../../../redux/actions/wishListAction";

// Constants
import {
  EMPTY,
  STATUS,
  STATUS_MESSAGES,
  USER_ROLES,
} from "../../../constants/general";
import { NOTIFICATION_TYPES } from "../../../constants/notificationTypes";

// i18n
import { useTranslation } from "react-i18next";

const ProductCardHook = (item) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("notification_messages");

  const {
    addToWishList,
    removeFromWishList,
    viewAllWishList,
    loading,
  } = useSelector((state) => state.wishListReducer);

  const user = useSelector((state) => state.authReducer.user);

  /* -------------------- Wishlist (SOURCE OF TRUTH) -------------------- */

  const favoriteProductsIDs = useMemo(() => {
    return viewAllWishList?.data?.map((p) => p._id) || EMPTY.ARRAY;
  }, [viewAllWishList]);

  // ✅ BOOLEAN – derived state (NO useState)
  const isFav = useMemo(() => {
    return favoriteProductsIDs.includes(item?._id);
  }, [favoriteProductsIDs, item?._id]);

  /* -------------------- UI State -------------------- */

  const [animateFav, setAnimateFav] = useState(false);
  const [isPress, setIsPress] = useState(false);

  // Track last action to avoid mixed effects
  const currentAction = useRef(null); // "add" | "remove"

  const isAdmin = user?.role === USER_ROLES.ADMIN;

  /* -------------------- Action Handler -------------------- */

  const onFavClick = async () => {
    if (isPress) return;

    if (isAdmin) {
      notify(t("wishlist.adminRestricted"), NOTIFICATION_TYPES.ERROR);
      return;
    }

    setIsPress(true);
    setAnimateFav(true);

    if (isFav) {
      currentAction.current = "remove";
      await dispatch(deleteFromWishList(item?._id));
    } else {
      currentAction.current = "add";
      await dispatch(createToWishList({ productId: item?._id }));
    }
  };

  /* -------------------- ADD Result -------------------- */

  useEffect(() => {
    if (currentAction.current !== "add") return;
    if (loading?.create) return;

    if (addToWishList?.status === STATUS.SUCCESS_OK) 
      notify(t("wishlist.added"), NOTIFICATION_TYPES.SUCCESS);
     else if (addToWishList?.status === STATUS.UNAUTHORIZED) 
      notify(t("wishlist.loginRequired"), NOTIFICATION_TYPES.ERROR);
    else notify(t("wishlist.error"), NOTIFICATION_TYPES.ERROR);

    setIsPress(false);
    currentAction.current = null;
    dispatch(resetState());
  }, [loading?.create, addToWishList, dispatch, t]);

  /* -------------------- REMOVE Result -------------------- */

  useEffect(() => {
    if (currentAction.current !== "remove") return;
    if (loading?.delete) return;

    if (removeFromWishList?.response?.status === STATUS_MESSAGES.SUCCESS) 
      notify(t("wishlist.removed"), NOTIFICATION_TYPES.SUCCESS);
     else if (
      removeFromWishList?.response?.status === STATUS.UNAUTHORIZED
    ) 
      notify(t("wishlist.loginRequired"), NOTIFICATION_TYPES.ERROR);
     else notify(t("wishlist.error"), NOTIFICATION_TYPES.ERROR);


    setIsPress(false);
    currentAction.current = null;
    dispatch(resetState());
  }, [loading?.delete, removeFromWishList, dispatch, t]);

  /* -------------------- Discount -------------------- */

  const { discountAmount, discountPercent } = calculateDiscounts(item);

  /* -------------------- Animation -------------------- */

  const handleAnimationEnd = () => setAnimateFav(false);

  /* -------------------- Return -------------------- */

  return [
    isFav,                 
    discountAmount,
    discountPercent,
    animateFav,
    onFavClick,
    handleAnimationEnd,
    isPress,
  ];
};

export default ProductCardHook;
