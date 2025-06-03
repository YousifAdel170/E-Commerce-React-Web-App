// Import Components from React Bootstrap, react-toastify
import { Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

// Import Custom Components
import UserOrderItem from "../User/UserOrderItem";

// Import Hooks from React Router Dom
import { useParams } from "react-router-dom";
// Import Custom Hooks
import AdminOrderDetailsHook from "../../hooks/admin/AdminOrderDetailsHook";
import ChangeOrderHook from "../../hooks/admin/ChangeOrderHook";

// Import Constants for Admin Order Details
import { adminOrderDetailsData } from "../../data/admin/adminOrderDetails";
import StatusSelector from "../Utility/StatusSelector";

// Component responsible for rendering order details in the admin panel
const AdminOrderDetails = () => {
  // Extracting the order ID from the URL parameters
  const { id } = useParams();

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
        <div className="cart-item-body text-center p-4 text-muted border rounded bg-white shadow-sm card-animate w-100">
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>
            {adminOrderDetailsData?.iconNotFound}
          </div>
          <p className="mb-0 fs-5">{adminOrderDetailsData?.notFound}</p>
        </div>
      </Col>
    );
  }

  return (
    <div className="container-fluid">
      {/* Order Item Section */}
      {orderDetails && <UserOrderItem order={orderDetails} />}

      {/* Order Details Section */}
      <div className="cart-item-body mb-3 border rounded bg-white shadow-sm card-animate">
        <Row>
          {/* Title of the Order Details Section */}
          <Col xs="12">
            <div className="cat-title fs-5 fw-bold">
              {adminOrderDetailsData?.title}
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
              <div className="cat-title ms-2">{field?.label}:</div>
              <div className="cat-text mb-0">{field?.value || ""}</div>
            </Col>
          ))}

          {/* Order Status Section */}
          <Col xs="12" className="border-top">
            <div className="cat-title fs-6 mt-3 d-flex justify-content-center">
              {adminOrderDetailsData?.orderStatus?.title}
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
              className="btn-a px-4"
              aria-label={adminOrderDetailsData?.orderStatus?.save}
              disabled={orderDetails?.isPaid && orderDetails?.isDelivered}
            >
              {adminOrderDetailsData?.orderStatus?.save}
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
