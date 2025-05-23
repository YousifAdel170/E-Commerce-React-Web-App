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
import { ERROR, SUCCESS, WARNING } from "../../constants/notificationTypes";

// Hook responsible for handling the order payment via card
const OrderPayCardHook = (addressDetalis) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage the order creation loading state
  const [loadingCreate, setLoadingCreate] = useState(true);

  // Extract cart ID from the ViewAllCartItemsHook custom hook
  const [, , , , , , cartID] = ViewAllCartItemsHook();

  // Function to create an order using card payment
  const handleCreateOrderCard = async () => {
    if (cartID === "0") {
      notify("من فضلك اضف منتجات الى العربه اولا", WARNING); // Notify if the cart is empty
      return;
    }

    if (addressDetalis.length <= 0) {
      notify("من فضلك اختر عنوان اولا", WARNING); // Notify if no address is selected
      return;
    }

    setLoadingCreate(true);
    await dispatch(
      createOrderCard(cartID, {
        shippingAddress: {
          details: addressDetalis.alias,
          phone: addressDetalis.phone,
          city: "",
          postalCode: "",
        },
      })
    );
    setLoadingCreate(false);
  };

  // Access the result of the order creation from Redux store
  const resultOrderCard = useSelector(
    (state) => state.checkoutReducer.createOrderCard
  );

  // Effect to handle post-order creation actions, such as opening the payment URL or notifying failure
  useEffect(() => {
    if (!loadingCreate) {
      if (resultOrderCard && resultOrderCard.status === "success") {
        notify("تم انشاء طلبك بنجاح", SUCCESS); // Notify on successful order creation
        setTimeout(() => {
          if (resultOrderCard.session && resultOrderCard.session.url)
            window.open(resultOrderCard.session.url); // Open payment URL if session exists
        }, 1000);
      } else {
        notify("فشل فى اكمال الطلب من فضلك حاول مره اخرى", ERROR); // Notify on failure
      }
    }
  }, [loadingCreate, resultOrderCard, navigate]);

  // Returning the handler function for creating the order
  return [handleCreateOrderCard];
};

export default OrderPayCardHook;
