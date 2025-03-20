import { Col, Row } from "react-bootstrap";
import UserAllAddressesHook from "../../hooks/user/UserAllAddressesHook";
import OrderPayCashHook from "../../hooks/checkout/OrderPayCashHook";
import { ToastContainer } from "react-toastify";

const ChoosePayMethod = () => {
  const [addresses] = UserAllAddressesHook();

  const [handleChooseAddress, handleCreateOrderCash] = OrderPayCashHook();

  return (
    <div>
      <div className="admin-content-text pt-5">اختر طريقة الدفع</div>
      <div className="user-address-card my-3 px-3">
        <Row className="d-flex justify-content-between">
          {/* Payment with Visa */}
          <Col xs="12" className="mt-4">
            <input
              style={{ cursor: "pointer" }}
              name="group"
              id="group1"
              type="radio"
              value="الدفع عن طريق الفيزا"
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
              style={{ cursor: "pointer" }}
              id="group2"
              checked
              type="radio"
              value="الدفع عند الاستلام"
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
            34000 جنية
          </div>
          <div
            onClick={handleCreateOrderCash}
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
