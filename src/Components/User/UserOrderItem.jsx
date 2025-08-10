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

import "../Admin/Admin.css"; // Importing CSS for styling

// Import Custom Hooks
import formatDate, { formatDateTime } from "../../hooks/Utility/formatDate";
import { useTranslation } from "react-i18next";
import ItemsNotFound from "../Utility/ItemsNotFound";

import { PAYMENT_METHODS } from "../../constants/general";

import "../Admin/Admin.css"; // Importing CSS for styling
import { useSelector } from "react-redux";
import { CURRENCY_LANGUAGES, LANGUAGES } from "../../constants/settings";

// Component responsible for rendering user order items
const UserOrderItem = ({ order }) => {
  const { t } = useTranslation("admin"); // Translation function for user namespace

  const { lang } = useSelector((state) => state.ui);

  const userLang =
    lang === LANGUAGES.ARABIC
      ? CURRENCY_LANGUAGES.EGYPT_AR
      : CURRENCY_LANGUAGES.US_EN;

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
      <div className="user-order order-item-body mb-3 rounded shadow-sm card-animate">
        {/* Order Header without border-bottom */}
        <Row>
          {/* Title and Date inline */}
          <div
            className="order-item-title fs-5 fw-bold d-flex align-items-center justify-content-between"
            title={` ${t("order-details.title")} ${order?.id}`}
          >
            <span>
              {t("order-details.orderId")}
              {order?.id || ""}
            </span>

            {/* Date next to title */}
            <div
              className="my-0 order-item-text d-flex align-items-center gap-1"
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
              <ItemsNotFound msg={t("order-details.items.noItems")} />
            )}
          </Col>
        </Row>

        {/* Statuses and Payment Info */}
        <Row className="align-items-center status-payment-container">
          <Col className="gap-3 status-container">
            {renderStatusBadge(
              order?.isDelivered,
              t("order-details.status.delivery.delivered"),
              t("order-details.status.delivery.pending"),
              "success",
              "danger",
              <FaCheckCircle />,
              <FaTimesCircle />
            )}

            {renderStatusBadge(
              order?.isPaid,
              t("order-details.status.payment.paid"),
              t("order-details.status.payment.unpaid"),
              "success",
              "danger",
              <FaCheckCircle />,
              <FaTimesCircle />
            )}

            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  {order?.paymentMethodType === PAYMENT_METHODS.CASH
                    ? t("order-details.status.paymentMethod.cashAriaLabel")
                    : t(
                        "order-details.status.paymentMethod.creditCardAriaLabel"
                      )}
                </Tooltip>
              }
            >
              <Badge
                bg="info"
                className="d-flex align-items-center gap-1 px-3 py-2"
                style={{ fontSize: "0.85rem" }}
              >
                {order?.paymentMethodType === PAYMENT_METHODS.CASH ? (
                  <FaMoneyBillWave />
                ) : (
                  <FaCreditCard />
                )}{" "}
                {order?.paymentMethodType === PAYMENT_METHODS.CASH
                  ? t("order-details.status.paymentMethod.cash")
                  : t("order-details.status.paymentMethod.creditCard")}
              </Badge>
            </OverlayTrigger>
          </Col>

          <Col className="mt-2 payment-container order-item-text">
            <FaMoneyBill size={22} />
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  {t("order-details.status.totalAmount.labelAriaLabel")}:{" "}
                  {(order?.totalOrderPrice ?? 0)
                    .toFixed(2)
                    .toLocaleString(userLang)}{" "}
                  {t("order-details.status.totalAmount.currency")}
                </Tooltip>
              }
            >
              <div className="fs-5 mb-0 order-item-text-answer">
                <strong className="mx-3 order-item-text fs-5 fw-bold">
                  {t("order-details.status.totalAmount.label")}:
                </strong>{" "}
                {(order?.totalOrderPrice ?? 0).toLocaleString(userLang)}
                {t("order-details.status.totalAmount.currency")}
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
