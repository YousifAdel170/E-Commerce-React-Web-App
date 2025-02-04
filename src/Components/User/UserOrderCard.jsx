import { Col, Row } from "react-bootstrap";

import mobile from "../../assets/Imgs/mobile.png";

const UserOrderCard = () => {
  return (
    <Row className="d-flex mb-2">
      {/* Product Image */}
      <Col xs="3" md="2" className="d-flex justify-content-start">
        <img width="93px" height="120px" src={mobile} alt="" />
      </Col>

      {/* Product Description, Rate, Quatity */}
      <Col xs="8" md="6">
        {/* Description */}
        <div className="d-inline pt-2 cat-title">
          آيفون XR بذاكرة سعة 128 جيجابايت ويدعم تقنية 4G LTE مع تطبيق فيس تايم
          (برودكت) أحمر
        </div>

        {/* Rate */}
        <div className="d-inline pt-2 cat-rate me-2">4.5</div>
        <div className="rate-count d-inline p-1 pt-2">(160 تقييم)</div>

        {/* Quantity */}
        <div className="mt-3">
          <div className="cat-text  d-inline">الكميه</div>
          <input
            className="mx-2 "
            type="number"
            style={{ width: "40px", height: "25px" }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default UserOrderCard;
