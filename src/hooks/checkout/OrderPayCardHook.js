// Import Hooks from react, react-redux, react-router-dom
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import Custom Hooks
import ViewAllCartItemsHook from "../cart/ViewAllCartItemsHook";
import notify from "../Utility/useNotifyHook";

// Import Custom Actions
import { createOrderCard } from "../../redux/actions/checkoutAction";

// Import Used Configurations
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { EMPTY, STATUS_MESSAGES } from "../../constants/general";
import { useTranslation } from "react-i18next";
import { DELAYS } from "../../constants/delays";

// Hook responsible for handling the order payment via card
const OrderPayCardHook = (addressDetalis) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("notification_messages");

  // State to manage the order creation loading state
  const [loadingCreate, setLoadingCreate] = useState(true);
  const [isPressCard, setIsPressCard] = useState(false);

  // Extract cart ID from the ViewAllCartItemsHook custom hook
  const [, , , , , , cartID] = ViewAllCartItemsHook();

  // Function to create an order using card payment
  const handleCreateOrderCard = async () => {
    if (cartID === EMPTY.ZERO)
      return notify(t("checkout.emptyCart"), NOTIFICATION_TYPES.WARNING); // Notify if cart is empty

    if (addressDetalis.length <= 0)
      return notify(t("checkout.chooseAddress"), NOTIFICATION_TYPES.WARNING); // Notify if address is not selected

    setIsPressCard(true);
    setLoadingCreate(true);
    await dispatch(
      createOrderCard(cartID, {
        shippingAddress: {
          details: addressDetalis?.alias,
          phone: addressDetalis?.phone,
          city: EMPTY.TEXT,
          postalCode: EMPTY.TEXT,
        },
      }),
    );
    setLoadingCreate(false);
  };

  // Access the result of the order creation from Redux store
  const resultOrderCard = useSelector(
    (state) => state.checkoutReducer.createOrderCard,
  );

  // Effect to handle post-order creation actions, such as opening the payment URL or notifying failure
  useEffect(() => {
    if (!loadingCreate) {
      setIsPressCard(false);
      if (resultOrderCard?.status === STATUS_MESSAGES.SUCCESS) {
        notify(t("checkout.goToCardPage"), NOTIFICATION_TYPES.SUCCESS); // Notify on successful order
        setTimeout(() => {
          // Open payment URL if session exists
          if (resultOrderCard?.session?.url)
            window.open(resultOrderCard.session.url);
        }, DELAYS.NAVIGATION_DELAY);
      } else notify(t("checkout.orderFailed"), NOTIFICATION_TYPES.ERROR); // Notify on order failure
    }
  }, [loadingCreate, resultOrderCard, navigate, t]);

  // Returning the handler function for creating the order
  return [handleCreateOrderCard, isPressCard];
};

export default OrderPayCardHook;
