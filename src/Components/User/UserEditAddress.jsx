import { Col, Row } from "react-bootstrap";
import UserEditAddressHook from "../../hooks/user/UserEditAddressHook";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const UserEditAddress = () => {
  const { id } = useParams();
  const [
    alias,
    details,
    phone,
    onChangeAlias,
    onChangeDetails,
    onChangePhone,
    handleEdit,
  ] = UserEditAddressHook(id);
  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-2">تعديل العنوان </div>

        <Col sm="8">
          {/* Input To Edit the Address Title */}
          <input
            value={alias}
            onChange={onChangeAlias}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="تسمية العنوان مثلا(المنزل - العمل)"
          />

          {/* Input To Edit the Address Description */}
          <textarea
            value={details}
            onChange={onChangeDetails}
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="العنوان بالتفصيل"
          />

          {/* Input To Edit the Phone Number of the user */}
          <input
            value={phone}
            onChange={onChangePhone}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="رقم الهاتف"
          />
        </Col>
      </Row>

      {/* Button To Edit the Address */}
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handleEdit} className="btn-save d-inline mt-2 ">
            حفظ تعديل العنوان
          </button>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default UserEditAddress;
