// React & Bootstrap
import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Custom Hooks
import UserAllAddressesHook from "../../hooks/user/UserAllAddressesHook";
import OrderPayCashHook from "../../hooks/checkout/OrderPayCashHook";
import OrderPayCardHook from "../../hooks/checkout/OrderPayCardHook";
import ViewAllCartItemsHook from "../../hooks/cart/ViewAllCartItemsHook";
import notify from "../../hooks/Utility/useNotifyHook";

// Constants
import { WARNING } from "../../constants/notificationTypes";

const ChoosePayMethod = () => {
  const { t } = useTranslation(["user", "notification_messages"]);

  // Addresses
  const [addresses] = UserAllAddressesHook();

  // Cart prices
  const [, , , totalCartPrice, , totalCartPriceAfterDisc] =
    ViewAllCartItemsHook();

  // Payment hooks
  const [handleChooseAddress, handleCreateOrderCash, addressDetails] =
    OrderPayCashHook();
  const [handleCreateOrderCart] = OrderPayCardHook(addressDetails);

  // Payment type state
  const [paymentType, setPaymentType] = useState("");

  const changePayMethod = (e) => setPaymentType(e.target.value);

  const handlePay = () => {
    if (paymentType === "card") handleCreateOrderCart();
    else if (paymentType === "cash") handleCreateOrderCash();
    else notify(t("checkout.selectPaymentMethod"), WARNING);
  };

  return (
    <div>
      {/* Title */}
      <div className="title-text py-3">
        {t("user:cart.checkout.choosePayMethod.title")}
      </div>

      {/* Payment & Address Card */}
      <div className="user-order order-item-body mb-3 rounded shadow-sm card-animate">
        {/* Card Payment */}
        <Row>
          <Col xs="12">
            <input
              name="payment"
              type="radio"
              value="card"
              id="pay-card"
              onChange={changePayMethod}
              style={{ cursor: "pointer" }}
            />
            <label
              htmlFor="pay-card"
              className="mx-2 order-item-text"
              style={{ cursor: "pointer" }}
            >
              {t("user:cart.checkout.choosePayMethod.methods.card")}
            </label>
          </Col>
        </Row>

        {/* Cash Payment */}
        <Row>
          <Col xs="12" className="mt-4">
            <input
              name="payment"
              type="radio"
              value="cash"
              id="pay-cash"
              onChange={changePayMethod}
              style={{ cursor: "pointer" }}
            />
            <label
              htmlFor="pay-cash"
              className="mx-2 order-item-text"
              style={{ cursor: "pointer" }}
            >
              {t("user:cart.checkout.choosePayMethod.methods.cash")}
            </label>
          </Col>
        </Row>

        {/* Address Selection */}
        <Row>
          <Col xs="12" className="my-4">
            <select className="select px-4" onChange={handleChooseAddress}>
              <option value="0">
                {t("user:cart.checkout.choosePayMethod.subtitle")}
              </option>

              {addresses?.length ? (
                addresses.map((address) => (
                  <option key={address._id} value={address._id}>
                    {address.alias}
                  </option>
                ))
              ) : (
                <option value="0">{t("checkout.noAddresses")}</option>
              )}
            </select>
          </Col>
        </Row>
      </div>

      {/* Price & Checkout */}
      <Row>
        <Col
          xs="12"
          className="d-flex justify-content-end align-items-center gap-2"
        >
          <div className="product-price  px-3 py-2">
            {totalCartPriceAfterDisc ? (
              <>
                <span className="user-order-title">
                  {t("user:cart.checkout.priceBeforeDiscount")}

                  <del className="mx-2">{totalCartPrice}</del>
                </span>
                <span className="new-price">
                  {t("user:cart.checkout.priceAfterDiscount")}:{" "}
                  {totalCartPriceAfterDisc}
                </span>
              </>
            ) : (
              <span className="fw-bold">
                {totalCartPrice} {t("cart.currency")}
              </span>
            )}
          </div>

          <Button
            onClick={handlePay}
            className="px-3 py-2 w-sm-100"
            variant="primary"
          >
            {t("user:cart.checkout.choosePayMethod.actions.payNow")}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ChoosePayMethod;
