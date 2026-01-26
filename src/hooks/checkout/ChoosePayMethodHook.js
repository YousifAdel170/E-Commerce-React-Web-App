import { useState } from "react";
import { EMPTY, PAYMENT_METHODS } from "../../constants/general";
import OrderPayCardHook from "./OrderPayCardHook";
import OrderPayCashHook from "./OrderPayCashHook";
import { NOTIFICATION_TYPES } from "../../constants/notificationTypes";
import { useTranslation } from "react-i18next";
import notify from "../Utility/useNotifyHook";

const ChoosePayMethodHook = () => {
  const { t } = useTranslation("notification_messages");

  // Payment type state
  const [paymentType, setPaymentType] = useState(EMPTY.TEXT);
  const changePayMethod = (e) => setPaymentType(e.target.value);
  const [isPress, setIsPress] = useState(false);

  // Payment hooks
  const [
    handleChooseAddress,
    handleCreateOrderCash,
    addressDetails,
    isPressCash,
  ] = OrderPayCashHook();
  const [handleCreateOrderCard, isPressCard] = OrderPayCardHook(addressDetails);

  const handlePay = () => {
    if (paymentType === PAYMENT_METHODS.CARD) {
      handleCreateOrderCard();
      setIsPress(isPressCard);
    } else if (paymentType === PAYMENT_METHODS.CASH) {
      handleCreateOrderCash();
      setIsPress(isPressCash);
    } else notify(t("checkout.selectMethod"), NOTIFICATION_TYPES.WARNING);
    setIsPress(false);
  };

  return [changePayMethod, handleChooseAddress, handlePay, isPress];
};

export default ChoosePayMethodHook;
