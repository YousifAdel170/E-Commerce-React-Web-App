import { Col, Row } from "react-bootstrap";

import rate from "../../Assets/Imgs/rate.png";

export const RateItem = () => {
  return (
    <div>
      <Row className="mt-3">
        <Col className="d-flex me-5">
          <div className="rate-name  d-inline ms-2">احمد محمود</div>
          <img className="" src={rate} alt="" height="16px" width="16px" />
          <div className="cat-rate  d-inline me-2">4.3</div>
        </Col>
      </Row>

      <Row className="border-bottom mx-2">
        <Col className="d-felx me-4 pb-2">
          <div className="rate-description  d-inline ms-2">
            منتج مناسب سعره للوقت الحالي وجه كويس جدا ومعاه دراع زيادة
          </div>
        </Col>
      </Row>
    </div>
  );
};
