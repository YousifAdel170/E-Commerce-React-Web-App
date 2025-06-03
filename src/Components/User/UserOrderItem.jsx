/* eslint-disable react/prop-types */

// Import Components from React Bootstrap, and react-icons
import { Col, Row, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
  FaCreditCard,
  FaCalendarAlt,
  FaMoneyBill,
} from "react-icons/fa";

// Import Custom Components
import UserOrderCard from "./UserOrderCard";

// Import Custom Hooks
import formatDate, { formatDateTime } from "../../hooks/Utility/formatDate";

// Component responsible for rendering user order items
const UserOrderItem = ({ order }) => {
  // Function to render status badges with tooltips
  const renderStatusBadge = (
    status,
    trueLabel,
    falseLabel,
    trueColor,
    falseColor,
    trueIcon,
    falseIcon
  ) => (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{status ? trueLabel : falseLabel}</Tooltip>}
    >
      <Badge
        bg={status ? trueColor : falseColor}
        className="d-flex align-items-center gap-1 px-3 py-2"
        style={{ fontSize: "0.85rem" }}
      >
        {status ? trueIcon : falseIcon} {status ? trueLabel : falseLabel}
      </Badge>
    </OverlayTrigger>
  );

  // If no order is found, display a not found message
  return (
    <Col sm="12">
      <div className="cart-item-body mb-3 border rounded bg-white shadow-sm card-animate">
        {/* Order Header without border-bottom */}
        <Row>
          {/* Title and Date inline */}
          <div
            className="cat-title fs-5 fw-bold d-flex align-items-center justify-content-between"
            title={`تفاصيل الطلب رقم ${order?.id}`}
          >
            <span>طلب رقم #{order?.id || ""}</span>

            {/* Date next to title */}
            <div
              className="my-0 cat-text d-flex align-items-center gap-1"
              style={{ fontSize: "0.9rem" }}
              title={order?.createdAt ? formatDateTime(order?.createdAt) : ""}
            >
              <FaCalendarAlt />
              <span>{formatDate(order?.createdAt)}</span>
            </div>
          </div>
        </Row>

        {/* Cart Items */}
        <Row className="mb-4">
          <Col sm="12">
            {Array.isArray(order?.cartItems) && order?.cartItems.length ? (
              order.cartItems.map((item) => (
                <UserOrderCard key={item?._id} item={item} />
              ))
            ) : (
              <div className="text-center text-muted py-3">
                لا توجد عناصر في الطلب.
              </div>
            )}
          </Col>
        </Row>

        {/* Statuses and Payment Info */}
        <Row className="align-items-center status-payment-container">
          <Col className="gap-3 status-container">
            {renderStatusBadge(
              order?.isDelivered,
              "تم التوصيل",
              "لم يتم التوصيل",
              "success",
              "danger",
              <FaCheckCircle />,
              <FaTimesCircle />
            )}

            {renderStatusBadge(
              order?.isPaid,
              "تم الدفع",
              "لم يتم الدفع",
              "success",
              "danger",
              <FaCheckCircle />,
              <FaTimesCircle />
            )}

            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  {order?.paymentMethodType === "cash"
                    ? "الدفع نقداً عند الاستلام"
                    : "الدفع بواسطة بطاقة ائتمان"}
                </Tooltip>
              }
            >
              <Badge
                bg="info"
                className="d-flex align-items-center gap-1 px-3 py-2"
                style={{ fontSize: "0.85rem" }}
              >
                {order?.paymentMethodType === "cash" ? (
                  <FaMoneyBillWave />
                ) : (
                  <FaCreditCard />
                )}{" "}
                {order?.paymentMethodType === "cash" ? "كاش" : "بطاقة ائتمانية"}
              </Badge>
            </OverlayTrigger>
          </Col>

          <Col className="mt-2 payment-container">
            <FaMoneyBill size={22} />
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  السعر الإجمالي بدقة:{" "}
                  {(order?.totalOrderPrice ?? 0)
                    .toFixed(2)
                    .toLocaleString("ar-EG")}{" "}
                  جنيه مصري
                </Tooltip>
              }
            >
              <div className="cat-text fs-5 mb-0 fw-semibold text-dark">
                <strong className="me-3">السعر الإجمالي:</strong>{" "}
                {(order?.totalOrderPrice ?? 0).toLocaleString("ar-EG")} جنيه
                مصري
              </div>
            </OverlayTrigger>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

// Export the UserOrderItem component
export default UserOrderItem;
