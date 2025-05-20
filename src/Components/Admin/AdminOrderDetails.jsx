import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AdminOrderDetailsHook from "../../hooks/admin/AdminOrderDetailsHook";
import UserOrderItem from "../User/UserOrderItem";
import { ToastContainer } from "react-toastify";
import ChangeOrderStatusHook from "../../hooks/admin/ChangeOrderStatusHook";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const [orderDetails] = AdminOrderDetailsHook(id);

  const [
    onChangePay,
    onChangeDeliver,
    changePayOrderStatus,
    changeDeliverOrderStatus,
  ] = ChangeOrderStatusHook(id);

  return (
    <div className="">
      {orderDetails ? <UserOrderItem order={orderDetails} /> : null}

      {/* Title of the order [Order Number] */}
      <div className="title-text mt-3 mb-2 mx-1">
        تفاصيل الطلب رقم #{orderDetails ? orderDetails.id : ""}
      </div>

      {/* Customer Details */}
      <Row className="justify-content-center user-data mx-1 py-3">
        {/* Title */}
        <Col xs="12" className=" d-flex">
          <div className="title-text">تفاصيل العميل</div>
        </Col>

        {/* Name Of The Customer */}
        <Col xs="12" className="d-flex mt-3">
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
        <Col xs="12" className="d-flex mt-1">
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
        <Col xs="12" className="d-flex mt-1">
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

        {/* Order Pay Status & Save Button to save */}
        <div className="d-flex mt-2 justify-content-center">
          {/* Order Status */}
          <select
            name="pay"
            id="paid"
            onChange={onChangePay}
            className="select input-form-area mt-1  text-center w-50"
          >
            <option value="0">الدفع</option>
            <option value="true">تم</option>
            <option value="false">لم يتم</option>
          </select>

          {/* Save Pay Button */}
          <button
            onClick={changePayOrderStatus}
            className="btn-a px-3 d-inline mx-2 "
          >
            حفظ
          </button>
        </div>

        {/* Order Deliver Status & Save Button to save */}
        <div className="d-flex my-2 justify-content-center">
          {/* Order Status */}
          <select
            name="deliver"
            id="deliver"
            className="select input-form-area mt-1  text-center w-50"
            onChange={onChangeDeliver}
          >
            <option value="0">التوصيل</option>
            <option value="true">تم</option>
            <option value="false">لم يتم</option>
          </select>

          {/* Save Pay Button */}
          <button
            onClick={changeDeliverOrderStatus}
            className="btn-a px-3 d-inline mx-2"
          >
            {" "}
            حفظ
          </button>
        </div>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminOrderDetails;
