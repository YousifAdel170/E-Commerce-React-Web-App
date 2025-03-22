import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ViewAllCartItemsHook from "../cart/ViewAllCartItemsHook";
import notify from "../Utility/useNotifyHook";
import { ERROR, SUCCESS, WARNING } from "../../config";
import { createOrderCard } from "../../redux/actions/checkoutAction";

const OrderPayCardHook = (addressDetalis) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loadingCreate, setLoadingCreate] = useState(true);
  const [, , , , , cartID] = ViewAllCartItemsHook();

  const handleCreateOrderCard = async () => {
    if (cartID === "0") {
      notify("من فضلك اضف منتجات الى العربه اولا", WARNING);
      return;
    }

    if (addressDetalis.length <= 0) {
      notify("من فضلك اختر عنوان اولا", WARNING);
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

  const resultOrderCard = useSelector(
    (state) => state.checkoutReducer.createOrderCard
  );

  useEffect(() => {
    if (!loadingCreate) {
      if (resultOrderCard && resultOrderCard.status === "success") {
        console.log(resultOrderCard);
        notify("تم انشاء طلبك بنجاح", SUCCESS);
        setTimeout(() => {
          if (resultOrderCard.session && resultOrderCard.session.url)
            window.open(resultOrderCard.session.url);
        }, 1000);
      } else notify("فشل فى اكمال الطلب من فضلك حاول مره اخرى", ERROR);
    }
  }, [loadingCreate, resultOrderCard, navigate]);

  return [handleCreateOrderCard];
};

export default OrderPayCardHook;
