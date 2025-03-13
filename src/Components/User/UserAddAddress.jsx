import { Col, Row } from "react-bootstrap";
import UserAddAddressHook from "../../hooks/user/UserAddAddressHook";
import { ToastContainer } from "react-toastify";

const UserAddAddress = () => {
  const [
    alias,
    details,
    phone,
    onChangeAlias,
    onChangeDetails,
    onChangePhone,
    handleSubmit,
  ] = UserAddAddressHook();
  return (
    <div>
      {/* Address Data */}
      <Row className="justify-content-start">
        <div className="admin-content-text pb-2">اضافة عنوان جديد</div>

        <Col sm="8">
          {/* Address Title */}
          <input
            value={alias}
            onChange={onChangeAlias}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="تسمية العنوان مثلا(المنزل - العمل)"
          />

          {/* Address Description */}
          <textarea
            value={details}
            onChange={onChangeDetails}
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="العنوان بالتفصيل"
          />

          {/* Phone Number */}
          <input
            value={phone}
            onChange={onChangePhone}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="رقم الهاتف"
          />
        </Col>
      </Row>

      {/* Button To add address */}
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handleSubmit} className="btn-save d-inline mt-2 ">
            اضافة عنوان
          </button>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default UserAddAddress;
