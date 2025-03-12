import { useParams } from "react-router-dom";
import AdminEditCouponHook from "../../hooks/coupon/AdminEditCouponHook";
import { Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const AdminEditCoupon = () => {
  const { id } = useParams();
  const [
    couponName,
    couponDate,
    couponValue,
    onChangeName,
    onChangeDate,
    onChangeValue,
    handleSubmit,
  ] = AdminEditCouponHook(id);
  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">تعديل بيانات الكوبون</div>
        <Col sm="8">
          <input
            value={couponName}
            onChange={onChangeName}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم الكوبون"
          />
          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="تاريخ الانتهاء"
            onChange={onChangeDate}
            value={couponDate}
          />
          <input
            value={couponValue}
            onChange={onChangeValue}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="نسبة خصم الكوبون"
          />
        </Col>
      </Row>

      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handleSubmit} className="btn-save d-inline mt-2 ">
            حفظ التعديل
          </button>
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminEditCoupon;
