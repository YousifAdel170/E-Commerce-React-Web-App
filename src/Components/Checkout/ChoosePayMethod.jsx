import { Col, Row } from "react-bootstrap";
import UserAllAddressesHook from "../../hooks/user/UserAllAddressesHook";
import OrderPayCashHook from "../../hooks/checkout/OrderPayCashHook";
import { ToastContainer } from "react-toastify";
import OrderPayCardHook from "../../hooks/checkout/OrderPayCardHook";
import { useState } from "react";
import notify from "../../hooks/Utility/useNotifyHook";
import { WARNING } from "../../config";
import ViewAllCartItemsHook from "../../hooks/cart/ViewAllCartItemsHook";

const ChoosePayMethod = () => {
  const [addresses] = UserAllAddressesHook();

  const [, , totalCartPrice, , totalCartPriceAfterDisc, ,] =
    ViewAllCartItemsHook();

  const [handleChooseAddress, handleCreateOrderCash, addressDetails] =
    OrderPayCashHook();

  const [handleCreateOrderCart] = OrderPayCardHook(addressDetails);

  const [type, setType] = useState("");

  const changePayMethod = (e) => setType(e.target.value);

  const handlePay = () => {
    if (type === "card") handleCreateOrderCart();
    else if (type === "cash") handleCreateOrderCash();
    else notify("من فضلك اختر طريقة دفع", WARNING);
  };

  return (
    <div>
      <div className="admin-content-text pt-5">اختر طريقة الدفع</div>
      <div className="user-address-card my-3 px-3">
        <Row className="d-flex justify-content-between">
          {/* Payment with Visa */}
          <Col xs="12" className="mt-4">
            <input
              name="group"
              onChange={changePayMethod}
              style={{ cursor: "pointer" }}
              id="group1"
              type="radio"
              value="card"
              className="mt-2"
            />
            <label
              className="mx-2"
              htmlFor="group1"
              style={{ cursor: "pointer" }}
            >
              الدفع عن طريق البطاقه الائتمانية
            </label>
          </Col>
        </Row>

        {/* Pay When Order Recieve (Cash) */}
        <Row className="">
          <Col xs="12" className="d-flex mt-4">
            <input
              name="group"
              onChange={changePayMethod}
              style={{ cursor: "pointer" }}
              id="group2"
              type="radio"
              value="cash"
              className="mt-2"
            />
            <label
              className="mx-2"
              htmlFor="group2"
              style={{ cursor: "pointer" }}
            >
              الدفع عند الاستلام
            </label>
          </Col>
        </Row>

        <Row className="">
          <Col xs="12" className="d-flex my-4">
            <select
              name="address"
              id="address"
              className="select px-2"
              onChange={handleChooseAddress}
            >
              <option value="0">اختر عنوان للشحن</option>
              {addresses ? (
                addresses.map((address) => (
                  <option key={address._id} value={address._id}>
                    {address.alias}
                  </option>
                ))
              ) : (
                <option key={0} value={0}>
                  لا يوجد عنوانين مسجلة
                </option>
              )}
            </select>
          </Col>
        </Row>
      </div>

      <Row>
        <Col xs="12" className="d-flex justify-content-end">
          <div className="product-price d-flex justify-content-center align-items-center  border">
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
          <div
            onClick={handlePay}
            className="product-cart-add px-3 d-flex justify-content-center align-items-center me-2"
          >
            اتمام الشراء
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default ChoosePayMethod;
