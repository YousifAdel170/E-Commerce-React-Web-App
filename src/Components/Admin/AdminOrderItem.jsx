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
import "./Admin.css";

import { useTranslation } from "react-i18next";
// Component responsible for rendering individual order items in the admin panel
const AdminOrderItem = ({ order, index }) => {
  // Array for user info fields to loop over
  const userInfoFields = getUserInfoFields(order);

  // Array for order status fields to loop over with badge color and value logic
  const orderStatusFields = getOrderStatusFields(order);

  const [sectionRef, isVisible] = useInviewAnimation();

  const { t } = useTranslation("admin"); // Translation function for admin namespace

  return (
    <Col
      sm="12"
      className={`order-item ${isVisible ? "fade-in" : ""}`}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      ref={sectionRef}
    >
      <div className="order-item-body my-3 p-3 rounded card-animate">
        {/* Order ID and Details */}
        <Row className="order-item-number-row pb-2">
          <Link
            to={`${adminOrderItemData.link}${order?._id}`}
            className="order-item-title"
            title={t("all-orders.orderLabel") + (order?.id || "")}
          >
            {t("all-orders.orderLabel") + (order?.id || "")}
          </Link>
        </Row>

        {/* User Information */}
        <Row className="mt-3 order-item-customer pb-2">
          <Col sm="12">
            {userInfoFields.map(({ label, value }, idx) => (
              <div key={idx} className={`cat-text${idx === 0 ? " mb-1" : ""}`}>
                <strong className="order-item-text mx-1">{t(label)}:</strong>{" "}
                <span className="order-item-text-answer">{value}</span>
              </div>
            ))}
          </Col>
        </Row>

        {/* Order Status & Payment */}
        <Row className="mt-3">
          <Col sm="6">
            {orderStatusFields.map(({ label, value, color }, idx) => (
              <div key={idx} className={`mb-2 cat-text${idx === 2 ? "" : ""}`}>
                <strong className="order-item-text mx-1">{t(label)}: </strong>
                <Badge bg={color}>{t(value)}</Badge>
              </div>
            ))}
          </Col>

          {/* Order Total Price */}
          <Col sm="6" className="d-flex justify-content-end align-items-end">
            <div>
              <strong className="order-item-text mx-1">
                {t("all-orders.totalAmount.label")}:
              </strong>{" "}
              <span className="order-item-text-answer">
                {order?.totalOrderPrice || 0}{" "}
                {t("all-orders.totalAmount.currency")}
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

// Exporting the AdminOrderItem component for use in other parts of the application
export default AdminOrderItem;
