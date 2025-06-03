// Import necessary hooks from React, react-router-dom, react-redux
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Import custom notification utility
import notify from "../Utility/useNotifyHook";

// Import cart-related action to add product
import {
  addToCartAction,
  getAllCartItems,
} from "../../redux/actions/cartAction";

// Import Used Constants
import { ERROR, SUCCESS, WARNING } from "../../constants/notificationTypes";
import {
  CART_MESSAGES,
  GENERAL_MESSAGES,
} from "../../constants/messagesConstants";
import { EMPTY, STATUS, USER_ROLES } from "../../constants/general";

// Custom hook responsible for handling adding a product to the cart
const AddToCartHook = (itemProduct) => {
  // Get the ID of the item to be added into the cart
  const { id } = useParams();

  // Initialize Redux dispatch function
  const dispatch = useDispatch();

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
    if (user?.role === USER_ROLES.ADMIN) {
      notify(CART_MESSAGES.ADMIN_CANNOT_ADD, ERROR);
      return;
    }

    // Prevent adding item if quantity is 0
    if (itemProduct?.quantity === 0) {
      notify(CART_MESSAGES.PRODUCT_OUT_OF_STOCK, WARNING);
      return;
    }

    // Ensure color selection is made when applicable before adding to cart
    if (itemAvailableColors?.length) {
      if (colorClickedHex === EMPTY.TEXT) {
        notify(CART_MESSAGES.COLOR_REQUIRED, WARNING);
        return;
      } else setColorClickedHex(EMPTY.TEXT);
    }

    // Dispatch add to cart action with selected product and color
    setLoading(true);
    try {
      await dispatch(
        addToCartAction({
          productId: id,
          color: colorClickedHex,
        })
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
        notify(GENERAL_MESSAGES.ADD_SUCCESSFULLY, SUCCESS);
        getData();
      } else notify(CART_MESSAGES.LOGIN_REQUIRED, ERROR);
    }
  }, [loading, result, dispatch]);

  // Return functions and values needed by the component
  return [colorClicked, indexColorClicked, handleAddToCart];
};

// Export the custom hook for use in product-related components
export default AddToCartHook;
