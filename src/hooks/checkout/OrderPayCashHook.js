// Import Hooks from react, react-redux, react-router-dom
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import Custom Hooks
import ViewAllCartItemsHook from "../cart/ViewAllCartItemsHook";
import notify from "../Utility/useNotifyHook";

// Import Custom Actions
import { createOrdrerCash } from "../../redux/actions/checkoutAction";
import { getSpecificUserAddress } from "../../redux/actions/userAddressAction";
import { clearAllCart } from "../../redux/actions/cartAction";

// Import Used Configurations
import { ERROR, SUCCESS, WARNING } from "../../config";

// Hook responsible for managing the order payment process with cash
const OrderPayCashHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extracting the cart ID from the custom hook for cart data
  const [, , , , , , cartID] = ViewAllCartItemsHook();

  // States for managing address details loading and data
  const [loadingAddressDetails, setLoadingAddressDetails] = useState(false);
  const [addressDetails, setAddressDetails] = useState(false);

  // State for managing order creation loading state
  const [loadingCreate, setLoadingCreate] = useState(true);

  // Function to handle address selection
  const handleChooseAddress = (e) => {
    setAddressDetails([]); // Clear previously selected address
    if (e.target.value !== "0") getCurrentUserAddressData(e.target.value); // Fetch new address details
  };

  // Function to fetch specific address details from the server
  const getCurrentUserAddressData = async (id) => {
    setLoadingAddressDetails(true);
    await dispatch(getSpecificUserAddress(id)); // Dispatch action to get address
    setLoadingAddressDetails(false);
  };

  // Accessing the specific user address from the Redux store
  const resultAddressDetails = useSelector(
    (state) => state.userAddressReducer.specificUserAddress
  );

  // Effect to update address details once they're fetched
  useEffect(() => {
    if (!loadingAddressDetails) {
      if (resultAddressDetails && resultAddressDetails.status === "success") {
        setAddressDetails(resultAddressDetails.data); // Set fetched address details
      } else setAddressDetails([]); // If no address data, reset to empty
    }
  }, [loadingAddressDetails, resultAddressDetails]);

  // Function to handle order creation with cash payment
  const handleCreateOrderCash = async () => {
    if (cartID === "0") {
      notify("من فضلك اضف منتجات الى العربه اولا", WARNING); // Notify if cart is empty
      return;
    }

    if (addressDetails.length <= 0) {
      notify("من فضلك اختر عنوان اولا", WARNING); // Notify if address is not selected
      return;
    }

    setLoadingCreate(true);
    await dispatch(
      createOrdrerCash(cartID, {
        shippingAddress: {
          details: addressDetails.alias,
          phone: addressDetails.phone,
          city: "",
          postalCode: "",
        },
      })
    );
    setLoadingCreate(false);
  };

  // Accessing the result of the order creation from Redux
  const resultOrderCash = useSelector(
    (state) => state.checkoutReducer.createOrderCash
  );

  // Effect to clear the cart and navigate to the user's orders after successful order creation
  useEffect(() => {
    const clearCartJSX = async () => {
      await dispatch(clearAllCart()); // Dispatch action to clear the cart
    };

    if (!loadingCreate) {
      if (resultOrderCash && resultOrderCash.status === 201) {
        notify("تم انشاء طلبك بنجاح", SUCCESS); // Notify on successful order
        clearCartJSX(); // Clear the cart after order creation
        setTimeout(() => navigate("/user/all-orders"), 1000); // Navigate to orders page after delay
      } else notify("فشل فى اكمال الطلب من فضلك حاول مره اخرى", ERROR); // Notify on order failure
    }
  }, [loadingCreate, resultOrderCash, navigate, dispatch]);

  // Returning the handlers for choosing address and creating the order
  return [handleChooseAddress, handleCreateOrderCash, addressDetails];
};

export default OrderPayCashHook;
