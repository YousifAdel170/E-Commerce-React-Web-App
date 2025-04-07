import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AdminAddCouponHook from "../../hooks/coupon/AdminAddCouponHook";

const AdminAddCoupon = () => {
  const dateRef = useRef();
  const [
    couponName,
    couponDate,
    couponValue,
    onChangeName,
    onChangeDate,
    onChangeValue,
    handleSubmit,
  ] = AdminAddCouponHook();

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">اضف كوبون جديد</div>
        <Col>
          {/* Coupon Name */}
          <input
            value={couponName}
            onChange={onChangeName}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم الكوبون"
          />

          {/* Date */}
          <input
            ref={dateRef}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="تاريخ الانتهاء"
            onChange={onChangeDate}
            value={couponDate}
            onFocus={() => (dateRef.current.type = "date")}
            onBlur={() => (dateRef.current.type = "text")}
          />

          {/* Percentage of Coupon */}
          <input
            value={couponValue}
            onChange={onChangeValue}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="نسبة خصم الكوبون"
          />
        </Col>
      </Row>

      <Row className="justify-content-end">
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handleSubmit} className="btn-save d-inline mt-2 ">
            حفظ الكوبون
          </button>
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminAddCoupon;
