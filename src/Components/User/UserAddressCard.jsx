/* eslint-disable react/prop-types */

// Import UI components from React Bootstrap
import { Button, Col, Modal, Row } from "react-bootstrap";

// Import Link for navigation
import { Link } from "react-router-dom";

// Import custom hook for delete address logic
import UserDeleteAddressHook from "../../hooks/user/UserDeleteAddressHook";

// Import delete icon image
import deleteIcon from "../../assets/Imgs/delete.png";

// Component to display a single address card
const UserAddressCard = ({ address, onDelete }) => {
  // Use custom hook to manage delete modal and logic
  const [show, handleClose, handleShow, handleDelete] = UserDeleteAddressHook(
    address._id,
    onDelete
  );

  return (
    <div className="user-address-card my-3 px-2">
      {/* Modal to confirm delete operation */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تاكيد الحذف</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل انتا متاكد من عملية الحذف العنوان</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleClose}>
            تراجع
          </Button>
          <Button className="font" variant="dark" onClick={handleDelete}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Top Row: Alias and Actions */}
      <Row className="d-flex justify-content-between">
        {/* Address Alias */}
        <Col xs="6">
          <div className="p-2">{address.alias}</div>
        </Col>

        {/* Delete and Edit Buttons */}
        <Col xs="6" className="d-flex justify-content-end">
          <div className="d-flex p-2">
            <div className="d-flex mx-2">
              {/* Delete Icon */}
              <img
                alt=""
                className="ms-3 mt-2"
                src={deleteIcon}
                onClick={handleShow}
                style={{ cursor: "pointer" }}
                title="حذف"
                height="17px"
                width="15px"
              />

              {/* Edit Link */}
              <Link
                to={`/user/addresses/edit-address/${address._id}`}
                style={{ textDecoration: "none" }}
              >
                <p className="item-delete-edit"> تعديل</p>
              </Link>
            </div>
          </div>
        </Col>
      </Row>

      {/* Address Details */}
      <Row>
        <Col xs="12">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "14px",
            }}
          >
            {address.details}
          </div>
        </Col>
      </Row>

      {/* Phone Section */}
      <Row className="mt-3">
        <Col xs="12" className="d-flex">
          {/* Phone Label */}
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            رقم الهاتف:
          </div>

          {/* Phone Number */}
          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2"
          >
            {address.phone}
          </div>
        </Col>
      </Row>
    </div>
  );
};

// Export the UserAddressCard component
export default UserAddressCard;
