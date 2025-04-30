/* eslint-disable react/prop-types */

// Import Bootstrap components
import { Col, Row } from "react-bootstrap";

// Import custom components
import UserOrderCard from "./UserOrderCard";

// Import utility for formatting date
import formatDate from "../../hooks/Utility/formatDate";

// Component to display a single user's order details
const UserOrderItem = ({ order }) => {
  // console.log(order); // For debugging order object if needed

  return (
    <div className="user-order my-2 p-3">
      {/* === Order Header: ID and Date === */}
      <Row>
        <div className="order-title">طلب رقم # {order.id}</div>
        <div className="">تاريخ الطلب: {formatDate(order.createdAt)}</div>
      </Row>

      {/* === Render Each Item in the Cart === */}
      {order && order.cartItems
        ? order.cartItems.map((item) => (
            <UserOrderCard key={item._id} item={item} />
          ))
        : null}

      {/* === Order Details: Delivery, Payment Status, Payment Method, Total Price === */}
      <Row className="d-flex justify-content-between ">
        <Col xs="6" className="d-flex justify-content-between">
          {/* Delivery Status */}
          <div className="d-flex">
            <div> التوصيل: </div>
            <div className="mx-2 status">
              {order.isDelivered === true ? "تم" : "لم يتم "}
            </div>
          </div>

          {/* Payment Status */}
          <div className="d-flex">
            <div> الدفع:</div>
            <div className=" mx-2 status">
              {order.isPaid === true ? "تم الدفع" : "لم يتم "}
            </div>
          </div>

          {/* Payment Method */}
          <div className="d-flex">
            <div>طريقة الدفع: </div>
            <div className="mx-2 status">
              {order
                ? order.paymentMethodType === "cash"
                  ? "كاش"
                  : "بطاقة ائتمانية"
                : null}
            </div>
          </div>
        </Col>

        {/* Total Price */}
        <Col xs="6" className="d-flex justify-content-end">
          <div>
            <div className="barnd-text">{order.totalOrderPrice || 0} جنية</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserOrderItem;
