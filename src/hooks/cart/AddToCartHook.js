// Import necessary hooks from React, react-router-dom, react-redux
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import custom notification utility
import notify from "../Utility/useNotifyHook";

// Import cart-related action to add product
import {
  addToCartAction,
  getAllCartItems,
} from "../../redux/actions/cartAction";

// Import Used Constants
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";

import { EMPTY, STATUS, USER_ROLES } from "../../constants/general";

// Custom hook responsible for handling adding a product to the cart
const AddToCartHook = (itemProduct) => {
  // Get the ID of the item to be added into the cart
  const { id } = useParams();

  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  const { t } = useTranslation("notification_messages");

  // Local state to manage selected color index and its hex value
  const [indexColorClicked, setIndexColorClicked] = useState(EMPTY.TEXT);
  const [colorClickedHex, setColorClickedHex] = useState(EMPTY.TEXT);

  // Loading flag used to control the flow after dispatch
  const [loading, setLoading] = useState(true);

  // Memoize available colors of the product to avoid unnecessary recalculations
  const itemAvailableColors = useMemo(() => {
    if (itemProduct?.availableColors) return itemProduct?.availableColors;
    else return EMPTY.ARRAY;
  }, [itemProduct]);

  // Function to update color selection state
  const colorClicked = (color, index) => {
    setIndexColorClicked(index);
    setColorClickedHex(color);
  };

  // Get the current user
  const user = useSelector((state) => state.authReducer.user);

  // Function responsible for adding the product to the cart
  const handleAddToCart = async () => {
    // Check if the current user is admin then prevent him from adding to the cart
    if (user?.role === USER_ROLES.ADMIN)
      return notify(t("cart.adminRestricted"), NOTIFICATION_TYPES.ERROR);

    // Prevent adding item if quantity is 0
    if (itemProduct?.quantity === 0)
      return notify(t("cart.outOfStock"), NOTIFICATION_TYPES.ERROR);

    // Ensure color selection is made when applicable before adding to cart
    if (itemAvailableColors?.length) {
      if (colorClickedHex === EMPTY.TEXT)
        return notify(t("cart.colorRequired"), NOTIFICATION_TYPES.WARNING);
      else setColorClickedHex(EMPTY.TEXT);
    }

    // Dispatch add to cart action with selected product and color
    setLoading(true);
    try {
      await dispatch(
        addToCartAction({
          productId: id,
          color: colorClickedHex,
        }),
      );
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Access result of the add to cart action from Redux state
  const result = useSelector((state) => state.cartReducer.addToCart);

  // Effect to handle notification based on result after loading completes
  useEffect(() => {
    const getData = async () => await dispatch(getAllCartItems());

    if (!loading) {
      console.log(result);
      if (result?.status === STATUS.SUCCESS_OK) {
        notify(t("general.addSuccess"), NOTIFICATION_TYPES.SUCCESS);
        getData();
      } else notify(t("cart.loginRequired"), NOTIFICATION_TYPES.ERROR);
    }
  }, [loading, result, dispatch, t]);

  // Return functions and values needed by the component
  return [colorClicked, indexColorClicked, handleAddToCart];
};

// Export the custom hook for use in product-related components
export default AddToCartHook;
