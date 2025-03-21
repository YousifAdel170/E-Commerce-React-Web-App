import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AdminOrderDetailsHook from "../../hooks/admin/AdminOrderDetailsHook";
import UserOrderItem from "../User/UserOrderItem";

const AdminOrderDetalis = () => {
  const { id } = useParams();
  // console.log(id);
  const [orderDetails] = AdminOrderDetailsHook(id);

  console.log(orderDetails);

  return (
    <div className="">
      {orderDetails ? <UserOrderItem order={orderDetails} /> : null}

      {/* Title of the order [Order Number] */}
      <div className="admin-content-text">
        تفاصيل الطلب رقم#{orderDetails ? orderDetails.id : ""}
      </div>

      {/* Customer Details */}
      <Row className="justify-content-center mt-4 user-data">
        {/* Title */}
        <Col xs="12" className=" d-flex">
          <div className="admin-content-text py-2">تفاصيل العميل</div>
        </Col>

        {/* Name Of The Customer */}
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            الاسم:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2"
          >
            {orderDetails && orderDetails.user ? orderDetails.user.name : ""}
          </div>
        </Col>

        {/* Phone Number of the customer */}
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            رقم الهاتف:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2"
          >
            {orderDetails && orderDetails.user ? orderDetails.user.phone : ""}
          </div>
        </Col>

        {/* Email of the Customer */}
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            الايميل:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2"
          >
            {orderDetails && orderDetails.user ? orderDetails.user.email : ""}
          </div>
        </Col>

        {/* Order Status & Save Button to save */}
        <div className="d-flex mt-2 justify-content-center">
          {/* Order Status */}
          <select
            name="languages"
            id="lang"
            className="select input-form-area mt-1  text-center px-2 w-50"
          >
            <option value="val">حالة الطلب</option>
            <option value="val2">قيد التنفيذ</option>
            <option value="val2">تم الانتهاء</option>
            <option value="val2">الغاء</option>
          </select>

          {/* Save Button */}
          <button className="btn-a px-3 d-inline mx-2 ">حفظ </button>
        </div>
      </Row>
    </div>
  );
};

export default AdminOrderDetalis;
