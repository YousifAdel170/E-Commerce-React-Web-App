/* eslint-disable react/prop-types */
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import deleteIcon from "../../assets/Imgs/delete.png";
import UserDeleteAddressHook from "../../hooks/user/UserDeleteAddressHook";

const UserAddressCard = ({ address }) => {
  const [show, handleClose, handleShow, handleDelete] = UserDeleteAddressHook(
    address._id
  );
  return (
    <div className="user-address-card my-3 px-2">
      {/* Modal To confirm the delete Operation */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {" "}
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

      <Row className="d-flex justify-content-between">
        {/* Home */}
        <Col xs="6">
          <div className="p-2">{address.alias}</div>
        </Col>

        <Col xs="6" className="d-flex d-flex justify-content-end">
          <div className="d-flex p-2">
            <div className="d-flex mx-2">
              {/* Delete Address */}
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

              {/* Edit Address */}
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

      {/* Address Value */}
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

      {/* Phone */}
      <Row className="mt-3">
        <Col xs="12" className="d-flex">
          {/* Phone Title */}
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            رقم الهاتف:
          </div>

          {/* Phone Value */}
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

export default UserAddressCard;
