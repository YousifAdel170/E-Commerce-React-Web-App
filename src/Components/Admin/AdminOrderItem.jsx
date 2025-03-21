/* eslint-disable react/prop-types */
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// import deletion from "../../assets/Imgs/delete.png";

const AdminOrderItem = ({ order }) => {
  return (
    <Col sm="12">
      <Link
        to={`/admin/all-orders/${order._id}`}
        className="cart-item-body my-2 py-3 d-flex"
        style={{ textDecoration: "none" }}
      >
        {/* Order Item Container */}
        <div className="w-100 px-3">
          {/* Order Item Name and deletion to remove it */}
          <Row className="justify-content-between">
            <Col
              sm="12"
              className=" d-flex flex-row justify-content-between pt-2"
            >
              <div className="cat-text">طلب رقم #{order.id || ""}</div>
              {/* <div className="d-flex " style={{ cursor: "pointer" }}>
                <img src={deletion} alt="" width="20px" height="24px" />
                <div className="cat-text me-1">ازاله</div>
              </div> */}
            </Col>
          </Row>

          <Row className="justify-content-center my-2">
            <Col sm="12" className="">
              <div className="cat-title">
                <span style={{ fontWeight: "bold" }}> الاسم: </span>
                {order && order.user ? order.user.name : ""}
              </div>
              <div className="cat-title">
                <span style={{ fontWeight: "bold" }}> البريد الالكتروني: </span>
                {order && order.user ? order.user.email : ""}
              </div>
            </Col>
          </Row>

          <Row className="d-flex justify-content-between">
            <Col xs="6">
              <div className="d-flex">
                <div className="cat-title" style={{ fontWeight: "bold" }}>
                  التوصيل:{" "}
                </div>
                <div className="mx-2 cat-title" style={{ color: "#979797" }}>
                  {order.isDelivered === true
                    ? "تم التوصيل"
                    : "لم يتم التوصيل "}
                </div>
              </div>

              <div className="d-flex">
                <div className="cat-title" style={{ fontWeight: "bold" }}>
                  الدفع:{" "}
                </div>
                <div className="mx-2 cat-title" style={{ color: "#979797" }}>
                  {order.isPaid === true ? "تم الدفع" : "لم يتم الدفع"}
                </div>
              </div>

              <div className="d-flex">
                <div className="cat-title" style={{ fontWeight: "bold" }}>
                  طريقة الدفع:{" "}
                </div>
                <div className="mx-2 cat-title" style={{ color: "#979797" }}>
                  {order.paymentMethodType === "cash"
                    ? "كاش"
                    : "بطاقة ائتمانية"}
                </div>
              </div>
            </Col>

            <Col xs="6" className="d-flex justify-content-end align-items-end">
              <div>
                <div className="barnd-text">
                  {order.totalOrderPrice || 0} جنية
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Link>
    </Col>
  );
};

export default AdminOrderItem;
