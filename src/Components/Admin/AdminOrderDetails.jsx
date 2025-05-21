// Import Components from React Bootstrap, react-toastify
import { Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

// Import Custom Components
import UserOrderItem from "../User/UserOrderItem";

// Import Hooks from React Router Dom
import { useParams } from "react-router-dom";
// Import Custom Hooks
import AdminOrderDetailsHook from "../../hooks/admin/AdminOrderDetailsHook";
import ChangeOrderHook, {
  getUserOrderInfoFields,
} from "../../hooks/admin/ChangeOrderHook";

// Import Constants for Admin Order Details
import { adminOrderDetailsData } from "../../constants/admin/adminOrderDetails";

// Component responsible for rendering order details in the admin panel
const AdminOrderDetails = () => {
  // Extracting the order ID from the URL parameters
  const { id } = useParams();

  // Custom hook to fetch order details based on the order ID
  const [orderDetails] = AdminOrderDetailsHook(id);

  // Custom hook to manage order status changes
  const [onChangePay, onChangeDeliver, changeOrderStatus] = ChangeOrderHook(
    id,
    orderDetails
  );

  // Extracting user information fields from the order details
  const userInfoFields = getUserOrderInfoFields(orderDetails);

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
              className={`d-flex align-items-center ${
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
          <Col
            xs="12"
            md="6"
            className="d-flex flex-column align-items-center mt-2"
          >
            <label htmlFor="paid" className="cat-title mb-1">
              {adminOrderDetailsData?.orderStatus?.payment?.title}
            </label>
            <select
              name="pay"
              id="paid"
              onChange={onChangePay}
              className="select text-center w-100"
              aria-label={
                adminOrderDetailsData?.orderStatus?.payment?.ariaLabel
              }
              disabled={orderDetails?.isPaid}
              value={orderDetails?.isPaid ? "true" : "false"}
            >
              <option value="0">الدفع</option>
              <option value="true">
                {adminOrderDetailsData?.orderStatus?.payment?.done}
              </option>
              <option value="false">
                {adminOrderDetailsData?.orderStatus?.payment?.notDone}
              </option>
            </select>
          </Col>

          <Col
            xs="12"
            md="6"
            className="d-flex flex-column align-items-center mt-2"
          >
            <label htmlFor="deliver" className="cat-title mb-1">
              {adminOrderDetailsData?.orderStatus?.delivery?.title}
            </label>
            <select
              name="deliver"
              id="deliver"
              onChange={onChangeDeliver}
              className="select text-center w-100"
              aria-label={
                adminOrderDetailsData?.orderStatus?.delivery?.ariaLabel
              }
              disabled={orderDetails?.isDelivered}
              value={orderDetails?.isDelivered ? "true" : "false"}
            >
              <option value="0">التوصيل</option>
              <option value="true">
                {adminOrderDetailsData?.orderStatus?.delivery?.done}
              </option>
              <option value="false">
                {adminOrderDetailsData?.orderStatus?.delivery?.notDone}
              </option>
            </select>
          </Col>

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
