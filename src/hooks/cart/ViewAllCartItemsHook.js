// Import Hooks from react redux
import { useSelector } from "react-redux";

// Hook Responsible to select cart from redux
const ViewAllCartItemsHook = () => {
  const result = useSelector((state) => state.cartReducer.allCartItems);

  const loading = !result || result.status !== "success";

  const numberOfItems = result?.numOfCartItems || 0;
  const cartItems = result?.data?.products || [];
  const totalCartPrice = result?.data?.totalCartPrice || 0;
  const cartID = result?.data?._id || "0";
  const couponName = result?.data?.coupon || "";
  const totalCartPriceAfterDisc = result?.data?.totalAfterDiscount || "";

  return [
    loading,
    numberOfItems,
    cartItems,
    totalCartPrice,
    couponName,
    totalCartPriceAfterDisc,
    cartID,
  ];
};

export default ViewAllCartItemsHook;
