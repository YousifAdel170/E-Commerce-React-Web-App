// Import layout components from React Bootstrap
import { Col, Row } from "react-bootstrap";

// Import toast container to display notifications
import { ToastContainer } from "react-toastify";

// Import router hook to get URL parameters
import { useParams } from "react-router-dom";

// Import custom hook to handle address editing
import UserEditAddressHook from "../../hooks/user/UserEditAddressHook";

// Component for editing an existing user address
const UserEditAddress = () => {
  // Get the address ID from the URL
  const { id } = useParams();

  // Get state and handlers from custom hook
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
      {/* Title */}
      <Row className="justify-content-start ">
        <div className="title-text pb-2">تعديل العنوان </div>

        <Col sm="8">
          {/* Input for editing the address alias */}
          <input
            value={alias}
            onChange={onChangeAlias}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="تسمية العنوان مثلا(المنزل - العمل)"
          />

          {/* Textarea for editing the detailed address */}
          <textarea
            value={details}
            onChange={onChangeDetails}
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="العنوان بالتفصيل"
          />

          {/* Input for editing the phone number */}
          <input
            value={phone}
            onChange={onChangePhone}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="رقم الهاتف"
          />
        </Col>
      </Row>

      {/* Button to submit the edited address */}
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handleEdit} className="btn-save d-inline mt-2 ">
            حفظ تعديل العنوان
          </button>
        </Col>
      </Row>

      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
};

// Export the component
export default UserEditAddress;
