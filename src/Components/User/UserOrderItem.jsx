/* eslint-disable react/prop-types */
import { Col, Row } from "react-bootstrap";
import UserOrderCard from "./UserOrderCard";
import formatDate from "../../hooks/Utility/formatDate";

const UserOrderItem = ({ order }) => {
  console.log(order);
  return (
    <div className="user-order my-2 p-3">
      {/* Order No. */}
      <Row>
        <div className="order-title">طلب رقم # {order.id}</div>
        <div className="">تاريخ الطلب: {formatDate(order.createdAt)}</div>
      </Row>

      {/* Cards in the item */}
      {order && order.cartItems
        ? order.cartItems.map((item) => (
            <UserOrderCard key={item._id} item={item} />
          ))
        : null}

      <Row className="d-flex justify-content-between ">
        <Col xs="6" className="d-flex justify-content-between">
          <div className="d-flex">
            <div> التوصيل: </div>
            <div className="mx-2 status">
              {order.isDelivered === true ? "تم" : "لم يتم "}
            </div>
          </div>
          <div className="d-flex">
            <div> الدفع:</div>
            <div className=" mx-2 status">
              {order.isPaid === true ? "تم الدفع" : "لم يتم "}
            </div>
          </div>

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

        {/* Salary */}
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
