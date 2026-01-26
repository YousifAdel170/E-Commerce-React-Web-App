// React & Bootstrap
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// Custom Hooks
import UserAllAddressesHook from "../../hooks/user/UserAllAddressesHook";
import ViewAllCartItemsHook from "../../hooks/cart/ViewAllCartItemsHook";

import "./Checkout.css";
import ChoosePayMethodHook from "../../hooks/checkout/ChoosePayMethodHook";
import SpinnerComponent from "../Utility/SpinnerComponent";

const ChoosePayMethod = () => {
  const { t } = useTranslation("user");

  // Addresses
  const [addresses] = UserAllAddressesHook();

  // Cart prices
  const [, , , totalCartPrice, , totalCartPriceAfterDisc] =
    ViewAllCartItemsHook();

  const [changePayMethod, handleChooseAddress, handlePay, isPress] =
    ChoosePayMethodHook();

  return (
    <div>
      {/* Title */}
      <div className="title-text py-3">
        {t("cart.checkout.choosePayMethod.title")}
      </div>

      {/* Payment & Address Card */}
      <div className="user-order order-item-body mb-3 rounded shadow-sm card-animate">
        {/* Card Payment */}
        <Row>
          <Col xs="12">
            <label className="pay-method">
              <input
                name="payment"
                type="radio"
                value="card"
                onChange={changePayMethod}
                className="custom-radio"
              />

              <span className="order-item-text">
                {t("cart.checkout.choosePayMethod.methods.card")}
              </span>
            </label>
          </Col>
        </Row>

        {/* Cash */}
        <Row>
          <Col xs="12" className="mt-4">
            <label className="pay-method">
              <input
                name="payment"
                type="radio"
                value="cash"
                onChange={changePayMethod}
                className="custom-radio"
              />

              <span className="order-item-text">
                {t("cart.checkout.choosePayMethod.methods.cash")}
              </span>
            </label>
          </Col>
        </Row>
        {/* Address Selection */}
        <Row>
          <Col xs="12" className="my-4">
            <select className="select px-4" onChange={handleChooseAddress}>
              <option value="0">
                {t("cart.checkout.choosePayMethod.subtitle")}
              </option>

              {addresses?.length ? (
                addresses.map((address) => (
                  <option key={address?._id} value={address?._id}>
                    {address?.alias}
                  </option>
                ))
              ) : (
                <option value="0">{t("cart.checkout.noAddresses")}</option>
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
                  <del className="mx-2">{totalCartPrice}</del>
                </span>
                <span className="new-price">{totalCartPriceAfterDisc}</span>
              </>
            ) : (
              <span className="order-item-text-answer">
                {totalCartPrice} {t("cart.currency")}
              </span>
            )}
          </div>

          <Button
            onClick={handlePay}
            disabled={isPress}
            className="px-3 py-2 w-sm-100"
            variant="primary"
          >
            {isPress ? <SpinnerComponent className={"mx-2"} size={"sm"} /> : ""}
            {t("cart.checkout.choosePayMethod.actions.payNow")}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ChoosePayMethod;
