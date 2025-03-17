/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteCartHook from "../../hooks/cart/DeleteCartHook";
import { ToastContainer } from "react-toastify";
import ApplyCouponHook from "../../hooks/cart/ApplyCouponHook";
import { useEffect } from "react";

const CartCheckout = ({
  totalCartPrice,
  couponNameRes,
  totalCartPriceAfterDisc,
}) => {
  const [showAll, handleCloseAll, handleShowAll, handleDeleteCart] =
    DeleteCartHook();

  const [couponName, onChangeCoupon, handleSubmitCoupon] = ApplyCouponHook();

  useEffect(() => {
    if (couponNameRes) onChangeCoupon(couponNameRes);
  }, [couponNameRes]);
  return (
    <Row className="my-1 d-flex justify-content-center cart-checkout py-3">
      {/* Modal For Clear All Items From Cart */}
      <Modal show={showAll} onHide={handleCloseAll}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تاكيد الحذف</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل انت متاكد من حذف الكل من العربة</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleCloseAll}>
            تراجع
          </Button>
          <Button className="font" variant="dark" onClick={handleDeleteCart}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>

      <Col xs="12" className="d-flex  flex-column ">
        {/* Coupon Input and Button */}
        <div className="d-flex">
          <input
            value={couponName}
            onChange={(e) => onChangeCoupon(e.target.value)}
            className="copon-input d-inline text-center "
            placeholder="كود الخصم"
          />
          <button onClick={handleSubmitCoupon} className="copon-btn d-inline ">
            تطبيق
          </button>
        </div>

        <div className="product-price d-flex justify-content-center align-items-center  w-100 my-3  border">
          {totalCartPriceAfterDisc ? (
            <>
              <div>
                قبل الخصم : <del className="ms-3">{totalCartPrice}</del>
              </div>
              <div>
                بعد الخصم: <>{totalCartPriceAfterDisc}</>
              </div>
            </>
          ) : (
            `${totalCartPrice} جنية`
          )}
        </div>

        <div>
          <Link to={"/order/pay-method"} style={{ textDecoration: "none" }}>
            <button className="product-cart-add w-100 px-2">
              اتمام الشراء
            </button>
          </Link>

          <button
            className="product-cart-add w-100 px-2 my-1"
            onClick={handleShowAll}
          >
            مسح العربة
          </button>
        </div>
      </Col>
      <ToastContainer />
    </Row>
  );
};

export default CartCheckout;
