// Import layout components from React Bootstrap
import { Col, Row } from "react-bootstrap";

// Import ToastContainer for showing toast messages
import { ToastContainer } from "react-toastify";

// Import custom hook for adding address logic
import UserAddAddressHook from "../../hooks/user/UserAddAddressHook";

// Component responsible for adding a new user address
const UserAddAddress = () => {
  // Destructure values and handlers from the custom hook
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
      {/* Address Form Section */}
      <Row className="justify-content-start">
        {/* Form Title */}
        <div className="admin-content-text pb-2">اضافة عنوان جديد</div>

        {/* Address Form Fields */}
        <Col sm="8">
          {/* Address Alias Input */}
          <input
            value={alias}
            onChange={onChangeAlias}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="تسمية العنوان مثلا(المنزل - العمل)"
          />

          {/* Address Details Textarea */}
          <textarea
            value={details}
            onChange={onChangeDetails}
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="العنوان بالتفصيل"
          />

          {/* Phone Number Input */}
          <input
            value={phone}
            onChange={onChangePhone}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="رقم الهاتف"
          />
        </Col>
      </Row>

      {/* Submit Button Section */}
      <Row>
        <Col sm="8" className="d-flex justify-content-end">
          <button onClick={handleSubmit} className="btn-save d-inline mt-2">
            اضافة عنوان
          </button>
        </Col>
      </Row>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

// Export the UserAddAddress component
export default UserAddAddress;
