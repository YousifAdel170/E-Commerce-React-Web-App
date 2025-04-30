// Import Hooks from react-redux
import { useSelector } from "react-redux";

// Hook Responsible to select cart data from Redux
const ViewAllCartItemsHook = () => {
  // Use the `useSelector` hook to access the cart state from Redux
  const result = useSelector((state) => state.cartReducer.allCartItems);

  // console.log(result);

  // Check if the cart data is still loading or if the request was unsuccessful
  const loading = !result || result.status !== "success";

  // Extract the necessary cart data from the result
  const numberOfItems = result?.numOfCartItems || 0; // Number of items in the cart
  const cartItems = result?.data?.products || []; // List of all cart items
  const totalCartPrice = result?.data?.totalCartPrice || 0; // Total price of all items in the cart
  const cartID = result?.data?._id || "0"; // Cart ID
  const couponName = result?.data?.coupon || ""; // Applied coupon name
  const totalCartPriceAfterDisc = result?.data?.totalAfterDiscount || ""; // Total price after applying discount

  // Return all relevant cart data for use in the component
  return [
    loading, // Boolean indicating if the cart is loading
    numberOfItems, // Total number of items in the cart
    cartItems, // List of items in the cart
    totalCartPrice, // Total price of the cart
    couponName, // Applied coupon name
    totalCartPriceAfterDisc, // Total price after discount
    cartID, // Cart ID
  ];
};

export default ViewAllCartItemsHook;
