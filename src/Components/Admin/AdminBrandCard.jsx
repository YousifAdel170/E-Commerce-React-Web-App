/* eslint-disable react/prop-types */
import { Button, Col, Modal, Row } from "react-bootstrap";

import editIcon from "../../assets/Imgs/edit.png";
import deleteIcon from "../../assets/Imgs/delete.png";

import AdminDeleteBrandHook from "../../hooks/brand/AdminDeleteBrandHook";

import { Link } from "react-router-dom";

const AdminBrandCard = ({ brand }) => {
  const [show, handleClose, handleShow, handelDelete] =
    AdminDeleteBrandHook(brand);
  return (
    <div className="user-address-card my-3 px-2">
      {/* Handle Delete, Update The Category */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تاكيد الحذف</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل انتا متاكد من عملية الحذف للماركة</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleClose}>
            تراجع
          </Button>
          <Button className="font" variant="dark" onClick={handelDelete}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="d-flex justify-content-between pt-2">
        <Col xs="6">
          <div className="p-2 fw-bold">
            اسم الماركة: <span className="fw-normal me-2">{brand.name}</span>
          </div>
        </Col>

        <Col xs="6" className="d-flex d-flex justify-content-end">
          <div className="d-flex p-2">
            <Link
              to={`/admin/edit-brand/${brand._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="d-flex mx-2">
                <img
                  alt=""
                  className="ms-1 mt-2"
                  src={editIcon}
                  height="17px"
                  width="15px"
                />
                <p className="item-delete-edit"> تعديل</p>
              </div>
            </Link>

            <div onClick={handleShow} className="d-flex ">
              <img
                alt=""
                className="ms-1 mt-2"
                src={deleteIcon}
                height="17px"
                width="15px"
              />
              <p className="item-delete-edit"> ازاله</p>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs="12" className="d-flex pb-3">
          <div className="d-flex p-2 align-items-center fw-bold">
            صوره الماركة:
            <img
              className="rounded-circle mx-5"
              style={{ border: "1px solid #eee" }}
              src={brand.image}
              alt=""
              height="100px"
              width="100px"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminBrandCard;
