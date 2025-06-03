/* eslint-disable react/prop-types */

// Import Components from React Bootstrap, react router-dom
import { Col, Row, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import Custom Components
import { adminOrderItemData } from "../../data/admin/adminOrderItem";

// Import Custom Hooks
import {
  getOrderStatusFields,
  getUserInfoFields,
} from "../../hooks/admin/AdminOrderItemHook";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";

// Importing CSS for styling
import "../Cart/CartItem.css"; // Importing CSS for styling
// Component responsible for rendering individual order items in the admin panel
const AdminOrderItem = ({ order, index }) => {
  // Array for user info fields to loop over
  const userInfoFields = getUserInfoFields(order);

  // Array for order status fields to loop over with badge color and value logic
  const orderStatusFields = getOrderStatusFields(order);

  const [sectionRef, isVisible] = useInviewAnimation();

  return (
    <Col
      sm="12"
      className={`order-item ${isVisible ? "fade-in" : ""}`}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      ref={sectionRef}
    >
      <div className="cart-item-body my-3 p-3 border rounded bg-white card-animate">
        {/* Order ID and Details */}
        <Row className="justify-content-between align-items-center border-bottom pb-2">
          <Link
            to={`${adminOrderItemData.link}${order?._id}`}
            className="cat-title"
            title={adminOrderItemData.linkTitle}
          >
            {adminOrderItemData.title}
            {order?.id || ""}
          </Link>
        </Row>

        {/* User Information */}
        <Row className="mt-3 border-bottom pb-2">
          <Col sm="12">
            {userInfoFields.map(({ label, value }, idx) => (
              <div key={idx} className={`cat-text${idx === 0 ? " mb-1" : ""}`}>
                <strong className="cat-title ms-1">{label}:</strong> {value}
              </div>
            ))}
          </Col>
        </Row>

        {/* Order Status & Payment */}
        <Row className="mt-3">
          <Col sm="6">
            {orderStatusFields.map(({ label, value, color }, idx) => (
              <div key={idx} className={`cat-title mb-2${idx === 2 ? "" : ""}`}>
                <strong className="ms-1">{label}:</strong>{" "}
                <Badge bg={color}>{value}</Badge>
              </div>
            ))}
          </Col>

          {/* Order Total Price */}
          <Col sm="6" className="d-flex justify-content-end align-items-end">
            <div className="cat-text">
              <strong className="cat-title ms-1">
                {adminOrderItemData.totalPrice}:
              </strong>{" "}
              {order?.totalOrderPrice || 0} {adminOrderItemData.currency}
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

// Exporting the AdminOrderItem component for use in other parts of the application
export default AdminOrderItem;
