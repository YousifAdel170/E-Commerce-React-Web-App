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
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { EMPTY, STATUS, STATUS_MESSAGES } from "../../constants/general";
import { useTranslation } from "react-i18next";
import { DELAYS } from "../../constants/delays";
import { ROUTES } from "../../constants/routes";

// Hook responsible for managing the order payment process with cash
const OrderPayCashHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("notification_messages");

  // Extracting the cart ID from the custom hook for cart data
  const [, , , , , , cartID] = ViewAllCartItemsHook();

  // States for managing address details loading and data
  const [loadingAddressDetails, setLoadingAddressDetails] = useState(false);
  const [addressDetails, setAddressDetails] = useState(false);

  // State for managing order creation loading state
  const [loadingCreate, setLoadingCreate] = useState(true);

  const [isPressCash, setIsPressCash] = useState(false);

  // Function to handle address selection
  const handleChooseAddress = (e) => {
    setAddressDetails(EMPTY.ARRAY); // Clear previously selected address
    if (e.target.value !== EMPTY.ZERO)
      getCurrentUserAddressData(e.target.value); // Fetch new address details
  };

  // Function to fetch specific address details from the server
  const getCurrentUserAddressData = async (id) => {
    setLoadingAddressDetails(true);
    await dispatch(getSpecificUserAddress(id)); // Dispatch action to get address
    setLoadingAddressDetails(false);
  };

  // Accessing the specific user address from the Redux store
  const resultAddressDetails = useSelector(
    (state) => state.userAddressReducer.specificUserAddress,
  );

  // Effect to update address details once they're fetched
  useEffect(() => {
    if (!loadingAddressDetails) {
      if (resultAddressDetails?.status === STATUS_MESSAGES.SUCCESS) {
        setAddressDetails(resultAddressDetails.data); // Set fetched address details
      } else setAddressDetails(EMPTY.ARRAY); // If no address data, reset to empty
    }
  }, [loadingAddressDetails, resultAddressDetails]);

  // Function to handle order creation with cash payment
  const handleCreateOrderCash = async () => {
    if (cartID === EMPTY.ZERO)
      return notify(t("checkout.emptyCart"), NOTIFICATION_TYPES.WARNING); // Notify if cart is empty

    if (addressDetails?.length <= 0)
      return notify(t("checkout.chooseAddress"), NOTIFICATION_TYPES.WARNING); // Notify if address is not selected

    setIsPressCash(true);
    setLoadingCreate(true);
    await dispatch(
      createOrdrerCash(cartID, {
        shippingAddress: {
          details: addressDetails?.alias,
          phone: addressDetails?.phone,
          city: EMPTY.TEXT,
          postalCode: EMPTY.TEXT,
        },
      }),
    );
    setLoadingCreate(false);
  };

  // Accessing the result of the order creation from Redux
  const resultOrderCash = useSelector(
    (state) => state.checkoutReducer.createOrderCash,
  );

  // Effect to clear the cart and navigate to the user's orders after successful order creation
  useEffect(() => {
    const clearCartJSX = async () => {
      await dispatch(clearAllCart()); // Dispatch action to clear the cart
    };

    if (!loadingCreate) {
      setIsPressCash(false);
      if (
        resultOrderCash?.status === STATUS.SUCCESS_CREATED ||
        resultOrderCash?.status === STATUS.SUCCESS_OK
      ) {
        notify(t("checkout.orderSuccess"), NOTIFICATION_TYPES.SUCCESS); // Notify on successful order
        clearCartJSX(); // Clear the cart after order creation
        setTimeout(() => navigate(ROUTES.USER.ORDERS), DELAYS.NAVIGATION_DELAY); // Navigate to orders page after delay
      } else notify(t("checkout.orderFailed"), NOTIFICATION_TYPES.ERROR); // Notify on order failure
    }
  }, [loadingCreate, resultOrderCash, navigate, dispatch, t]);

  // Returning the handlers for choosing address and creating the order
  return [
    handleChooseAddress,
    handleCreateOrderCash,
    addressDetails,
    isPressCash,
  ];
};

export default OrderPayCashHook;
