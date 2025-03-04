import { Col, Row } from "react-bootstrap";
import UserOrderCard from "./UserOrderCard";

const UserOrderItem = () => {
  return (
    <div className="user-order mt-2">
      {/* Order No. */}
      <Row>
        <div className="py-2 order-title">طلب رقم #234556</div>
      </Row>

      {/* Cards in the item */}
      <UserOrderCard />
      <UserOrderCard />

      <Row className="d-flex justify-content-between">
        {/* Status */}
        <Col xs="6">
          <div>
            <div className="d-inline">الحالة</div>
            <div className="d-inline mx-2 stat">قيد التنفيذ</div>
          </div>
        </Col>

        {/* Salary */}
        <Col xs="6" className="d-flex justify-content-end">
          <div>
            <div className="barnd-text">4000 جنيه</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserOrderItem;
