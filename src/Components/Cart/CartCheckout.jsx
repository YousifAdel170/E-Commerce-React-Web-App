/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

// Import Components from react-bootstrap, react-toastify
import { Button, Col, Modal, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

// Import Hooks from react
import { useEffect } from "react";

// Import custom hooks
import DeleteCartHook from "../../hooks/cart/DeleteCartHook";
import ApplyCouponHook from "../../hooks/cart/ApplyCouponHook";

// CartCheckout component to handle the cart summary, coupon application, and checkout actions
const CartCheckout = ({
  totalCartPrice,
  cartItems,
  couponNameRes,
  totalCartPriceAfterDisc,
}) => {
  // Destructure hook for cart item deletion modal state and handlers
  const [showAll, handleCloseAll, handleShowAll, handleDeleteCart] =
    DeleteCartHook();

  // Destructure hook for coupon application and checkout actions
  const [couponName, onChangeCoupon, handleSubmitCoupon, handleCheckout] =
    ApplyCouponHook(cartItems);

  // Effect to update the coupon name when the passed couponNameRes prop changes
  useEffect(() => {
    if (couponNameRes) onChangeCoupon(couponNameRes);
  }, [couponNameRes]);

  return (
    <Row className="my-1 d-flex justify-content-center cart-checkout py-3">
      {/* Modal for confirming clearing all items from the cart */}
      <Modal show={showAll} onHide={handleCloseAll}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تاكيد الحذف</div>{" "}
            {/* Confirmation message in Arabic */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل انت متاكد من حذف الكل من العربة</div>{" "}
          {/* Confirm delete message in Arabic */}
        </Modal.Body>
        <Modal.Footer>
          {/* Button to cancel deletion */}
          <Button className="font" variant="success" onClick={handleCloseAll}>
            تراجع {/* Cancel in Arabic */}
          </Button>
          {/* Button to confirm deletion */}
          <Button className="font" variant="dark" onClick={handleDeleteCart}>
            حذف {/* Delete in Arabic */}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cart Summary and Checkout Section */}
      <Col xs="12" className="d-flex  flex-column ">
        {/* Coupon Input and Apply Button */}
        <div className="d-flex">
          <input
            value={couponName}
            onChange={(e) => onChangeCoupon(e.target.value)} // Update coupon name on change
            className="copon-input d-inline text-center "
            placeholder="كود الخصم" // Placeholder text in Arabic
          />
          <button onClick={handleSubmitCoupon} className="copon-btn d-inline ">
            تطبيق {/* Apply in Arabic */}
          </button>
        </div>

        {/* Cart Price Section */}
        <div className="product-price d-flex justify-content-center align-items-center  w-100 my-3  border">
          {totalCartPriceAfterDisc ? (
            <>
              {/* Display price before and after discount if applicable */}
              <div>
                قبل الخصم : <del className="ms-3">{totalCartPrice}</del>{" "}
                {/* Price before discount in Arabic */}
              </div>
              <div>
                بعد الخصم: <>{totalCartPriceAfterDisc}</>{" "}
                {/* Price after discount in Arabic */}
              </div>
            </>
          ) : (
            `${totalCartPrice} جنية` // If no discount, display the total price in Arabic
          )}
        </div>

        <div>
          {/* Checkout Button */}
          <button
            className="product-cart-add w-100 px-2"
            onClick={handleCheckout}
          >
            اتمام الشراء {/* Checkout in Arabic */}
          </button>

          {/* Clear Cart Button */}
          <button
            className="product-cart-add w-100 px-2 my-1"
            onClick={handleShowAll}
          >
            مسح العربة {/* Clear Cart in Arabic */}
          </button>
        </div>
      </Col>

      {/* Toast Notifications for user feedback */}
      <ToastContainer />
    </Row>
  );
};

export default CartCheckout;
