// Import Hooks from react-redux
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Import constants for animation timing
import { TIME_ANIMATION_POPUP_CART } from "../../constants/animationTimes";

// Hook Responsible to select cart data from Redux
const ViewAllCartItemsHook = () => {
  // Use the `useSelector` hook to access the cart state from Redux
  const result = useSelector((state) => state.cartReducer.allCartItems);

  // Check if the cart data is still loading or if the request was unsuccessful
  const loading = !result || result.status !== "success";

  // Extract the necessary cart data from the result
  const numberOfItems = result?.numOfCartItems || 0; // Number of items in the cart
  const cartItems = result?.data?.products || []; // List of all cart items
  const totalCartPrice = result?.data?.totalCartPrice || 0; // Total price of all items in the cart
  const cartID = result?.data?._id || "0"; // Cart ID
  const couponName = result?.data?.coupon || ""; // Applied coupon name
  const totalCartPriceAfterDisc = result?.data?.totalAfterDiscount || ""; // Total price after applying discount

  // State to manage the pop animation for the cart icon
  const [pop, setPop] = useState(false);

  // Effect to trigger the pop animation when the number of items in the cart changes
  useEffect(() => {
    // If there are items in the cart, trigger the pop animation
    if (numberOfItems > 0) {
      setPop(false);
      requestAnimationFrame(() => {
        setPop(true);
      });

      // Set a timeout to remove the pop effect after delay
      const timer = setTimeout(() => setPop(false), TIME_ANIMATION_POPUP_CART);

      // Cleanup function to clear the timeout if the component unmounts or numberOfItems changes
      return () => clearTimeout(timer);
    }
  }, [numberOfItems]);

  // Return all relevant cart data for use in the component
  return [
    loading, // Boolean indicating if the cart is loading
    numberOfItems, // Total number of items in the cart
    cartItems, // List of items in the cart
    totalCartPrice, // Total price of the cart
    couponName, // Applied coupon name
    totalCartPriceAfterDisc, // Total price after discount
    cartID, // Cart ID
    pop,
  ];
};

export default ViewAllCartItemsHook;
