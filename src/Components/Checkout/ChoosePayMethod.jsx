import { Col, Row } from "react-bootstrap";

const ChoosePayMethod = () => {
  return (
    <div>
      <div className="admin-content-text pt-5">اختر طريقة الدفع</div>
      <div className="user-address-card my-3 px-3">
        <Row className="d-flex justify-content-between">
          {/* Payment with Visa */}
          <Col xs="12" className="my-4">
            <input
              name="group"
              id="group1"
              type="radio"
              value="الدفع عن طريق الفيزا"
              className="mt-2"
            />
            <label className="mx-2" htmlFor="group1">
              الدفع عن طريق البطاقه الائتمانية
            </label>
          </Col>
        </Row>

        {/* Pay When Order Recieve (Cash) */}
        <Row className="mt-3">
          <Col xs="12" className="d-flex">
            <input
              name="group"
              id="group1"
              type="radio"
              value="الدفع عند الاستلام"
              className="mt-2"
            />
            <label className="mx-2" htmlFor="group1">
              الدفع عند الاستلام
            </label>
          </Col>
        </Row>
      </div>

      <Row>
        <Col xs="12" className="d-flex justify-content-end">
          <div className="product-price d-flex justify-content-center align-items-center  border">
            34000 جنية
          </div>
          <div className="product-cart-add px-3 d-flex justify-content-center align-items-center me-2">
            اتمام الشراء
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChoosePayMethod;
