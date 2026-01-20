/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Button, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Hooks
import DeleteCartHook from "../../hooks/cart/DeleteCartHook";
import ApplyCouponHook from "../../hooks/cart/ApplyCouponHook";

// Components
import ModalComponent from "../Utility/ModalComponent";

// CSS
import "./CartItem.css";

const CartCheckout = ({
  totalCartPrice,
  cartItems,
  couponNameRes,
  totalCartPriceAfterDisc,
}) => {
  const { t } = useTranslation(["cart", "utilities"]);

  // Delete all cart items hook
  const [showAll, handleCloseAll, handleShowAll, handleDeleteCart] =
    DeleteCartHook();

  // Coupon & checkout hook
  const [couponName, onChangeCoupon, handleSubmitCoupon, handleCheckout] =
    ApplyCouponHook(cartItems);

  // Update coupon name from props if provided
  useEffect(() => {
    if (couponNameRes) onChangeCoupon(couponNameRes);
  }, [couponNameRes]);

  return (
    <Col
      xs="12"
      className="cart-checkout user-order order-item-body mb-3 rounded shadow-sm card-animate"
    >
      {/* Delete All Modal */}
      <ModalComponent
        show={showAll}
        handleClose={handleCloseAll}
        handleOperation={handleDeleteCart}
        modalTitle={t("utilities:modal.deleteAllTitle")}
        modalBody={t("utilities:modal.deleteAllMessage")}
        modalFooter={t("utilities:modal.delete")}
        className="btn-danger"
      />

      {/* Checkout Summary */}
      <Col xs="12" className="d-flex flex-column gap-3">
        {/* Coupon Section */}
        <div className="card-animate  position-relative w-100">
          <input
            type="text"
            value={couponName}
            onChange={(e) => onChangeCoupon(e.target.value)}
            className="coupon-input w-100 px-3"
            placeholder={t("user:cart.couponPlaceholder")}
          />
          <Button
            onClick={handleSubmitCoupon}
            className="coupon-apply-btn"
            style={{
              top: "0",
              right: "0",
            }}
          >
            {t("user:cart.applyCoupon")}
          </Button>
        </div>

        {/* Price Section */}
        <Col xs={12}>
          <div
            className="product-price cart overflow-hidden d-flex flex-column gap-2"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--focus-color)",
            }}
          >
            {totalCartPriceAfterDisc &&
            totalCartPriceAfterDisc < totalCartPrice ? (
              <>
                <span className="order-item-text">
                  {t("user:cart.checkout.priceBeforeDiscount")}
                </span>
                <del>
                  {totalCartPrice.toLocaleString()} {t("user:cart.currency")}
                </del>
                <span className="new-price fw-bold">
                  {totalCartPriceAfterDisc.toLocaleString()}{" "}
                  {t("user:cart.currency")}
                </span>
                <span className="discount-price text-danger fw-bold">
                  {Math.round(
                    ((totalCartPrice - totalCartPriceAfterDisc) /
                      totalCartPrice) *
                      100,
                  )}
                  %
                </span>
              </>
            ) : (
              <span className="card-item-text-answer fw-bold">
                {totalCartPrice.toLocaleString()} {t("user:cart.currency")}
              </span>
            )}
          </div>
        </Col>

        {/* Checkout & Clear Buttons */}
        <div className="d-flex flex-column gap-2">
          <Button
            className="cart-action-btn"
            onClick={handleCheckout}
            variant="primary"
          >
            {t("user:cart.checkout.checkoutBtn")}
          </Button>
          <Button
            className="cart-action-btn"
            onClick={handleShowAll}
            variant="outline-danger"
          >
            {t("user:cart.checkout.clearCartBtn")}
          </Button>
        </div>
      </Col>

      <ToastContainer />
    </Col>
  );
};

export default CartCheckout;
