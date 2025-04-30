// Import necessary hooks from React
import { useEffect, useMemo, useState } from "react";

// Import custom notification utility
import notify from "../Utility/useNotifyHook";

// Import alert types
import { SUCCESS, WARNING } from "../../config";

// Import cart-related action to add product
import {
  addToCartAction,
  getAllCartItems,
} from "../../redux/actions/cartAction";

// Import hooks from React-Redux to dispatch actions and access state
import { useDispatch, useSelector } from "react-redux";

// Custom hook responsible for handling adding a product to the cart
const AddToCartHook = (id, itemProduct) => {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Local state to manage selected color index and its hex value
  const [indexColorClicked, setIndexColorClicked] = useState("");
  const [colorClickedHex, setColorClickedHex] = useState("");

  // Loading flag used to control the flow after dispatch
  const [loading, setLoading] = useState(true);

  // Memoize available colors of the product to avoid unnecessary recalculations
  const itemAvailableColors = useMemo(() => {
    if (itemProduct && itemProduct.availableColors)
      return itemProduct.availableColors;
    else return [];
  }, [itemProduct]);

  // Function to update color selection state
  const colorClicked = (color, index) => {
    setIndexColorClicked(index);
    setColorClickedHex(color);
  };

  // Function responsible for adding the product to the cart
  const handleAddToCart = async () => {
    // Prevent adding item if quantity is 0
    if (itemProduct.quantity === 0) {
      notify("لا يوجد من هذا المنتج حاليا", WARNING);
      return;
    }

    // Ensure color selection is made when applicable before adding to cart
    if (itemAvailableColors.length) {
      if (colorClickedHex === "") {
        notify("من فضلك اختر لون اولا للمنتج", WARNING);
        return;
      } else setColorClickedHex("");
    }

    // Dispatch add to cart action with selected product and color
    setLoading(true);
    await dispatch(
      addToCartAction({
        productId: id,
        color: colorClickedHex,
      })
    );
    setLoading(false);
  };

  // Access result of the add to cart action from Redux state
  const result = useSelector((state) => state.cartReducer.addToCart);

  // Effect to handle notification based on result after loading completes
  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllCartItems());
    };

    if (!loading) {
      if (result && result.status === 200) {
        notify("تمت اضافة المنتج للعربه بنجاح", SUCCESS);

        getData();
      } else notify("قم بتسجيل الدخول اولا", WARNING);
    }
  }, [loading, result, dispatch]);

  // Return functions and values needed by the component
  return [colorClicked, indexColorClicked, handleAddToCart];
};

// Export the custom hook for use in product-related components
export default AddToCartHook;
