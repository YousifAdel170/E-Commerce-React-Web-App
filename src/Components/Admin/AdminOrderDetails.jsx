// Import Components from React Bootstrap, react-toastify
import { Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

// Import Custom Components
import UserOrderItem from "../User/UserOrderItem";

// Import Hooks from React Router Dom
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Custom Hooks
import AdminOrderDetailsHook from "../../hooks/admin/AdminOrderDetailsHook";
import ChangeOrderHook from "../../hooks/admin/ChangeOrderHook";

// Import Constants for Admin Order Details
import StatusSelector from "../Utility/StatusSelector";

// Importing CSS for styling
import "./Admin.css";

// Component responsible for rendering order details in the admin panel
const AdminOrderDetails = () => {
  // Extracting the order ID from the URL parameters
  const { id } = useParams();

  // Translation function for admin namespace
  const { t } = useTranslation("admin"); // Translation function for admin namespace

  // Custom hook to fetch order details based on the order ID
  const [orderDetails] = AdminOrderDetailsHook(id);

  // Custom hook to manage order status changes
  const [orderStatus, userInfoFields, statusItems, changeOrderStatus] =
    ChangeOrderHook(id, orderDetails);

  // If no order details are found, display a not found message
  if (!orderDetails) {
    return (
      <Col
        sm="12"
        className="d-flex justify-content-center h-100 align-items-center"
      >
        <div className="order-item-details text-center p-5 rounded shadow-sm card-animate w-100">
          <div
            style={{
              fontSize: "48px",
              marginBottom: "12px",
            }}
          >
            🔍
          </div>
          <p className="mb-0 fs-5">{t("order-details.notFound")}</p>
        </div>
      </Col>
    );
  }

  return (
    <div className="container-fluid">
      {/* Order Item Section */}
      {orderDetails && <UserOrderItem order={orderDetails} />}

      {/* Order Details Section */}
      <div className="order-item-details text-center px-5 py-3 rounded shadow-sm card-animate w-100">
        <Row>
          {/* Title of the Order Details Section */}
          <Col xs="12">
            <div className="order-item-text fs-5 fw-bold">
              {t("order-details.title")} {orderDetails?.id}
            </div>
          </Col>

          {/* User Information Fields */}
          {userInfoFields.map((field, index) => (
            <Col
              key={index}
              xs="12"
              className={`d-flex align-items-center justify-content-start ${
                index === userInfoFields.length - 1 ? "mb-2" : ""
              }`}
            >
              <div className="order-item-text mx-2">{t(field?.label)}:</div>
              <div className="order-item-text-answer mb-0">
                {field?.value || ""}
              </div>
            </Col>
          ))}

          {/* Order Status Section */}
          <Col xs="12" className="">
            <div className="order-item-text fs-5 mt-3 d-flex justify-content-center align-items-center">
              {t("order-details.actions.updateStatus")}
            </div>
          </Col>

          {/* Payment and Delivery Status Selectors */}
          {statusItems.map((item) => (
            <StatusSelector
              key={item.key}
              id={orderStatus[item.key].label}
              name={orderStatus[item.key].label}
              data={orderStatus[item.key]}
              onChange={item.onChange}
              disabled={item.disabled}
            />
          ))}

          {/* Save Changes Button */}
          <Col xs="12" className="text-center mt-3">
            <button
              onClick={changeOrderStatus}
              className="btn-a save px-4 py-2"
              aria-label={t("order-details.status.save")}
              disabled={orderDetails?.isPaid && orderDetails?.isDelivered}
            >
              {t("order-details.actions.save")}
            </button>
          </Col>
        </Row>
      </div>

      <ToastContainer />
    </div>
  );
};
// Exporting the AdminOrderDetails component as default
export default AdminOrderDetails;
