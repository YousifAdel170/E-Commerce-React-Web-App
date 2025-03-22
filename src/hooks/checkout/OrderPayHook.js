import { useState } from "react";
import OrderPayCardHook from "./OrderPayCardHook";
import notify from "../Utility/useNotifyHook";
import OrderPayCashHook from "./OrderPayCashHook";

const OrderPayHook = (addresses) => {
  const [handleChooseAddress, handleCreateOrderCash] = OrderPayCashHook();

  const [handleCreateOrderCart] = OrderPayCardHook(addresses);

  const [type, setType] = useState("");

  const changePayMethod = (e) => setType(e.target.value);

  const handlePay = () => {
    if (type === "card") handleCreateOrderCart();
    else if (type === "cash") handleCreateOrderCash();
    else notify("من فضلك اختر طريقة دفع", "warn");
  };
};

export default OrderPayHook;
