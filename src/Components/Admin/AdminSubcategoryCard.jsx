/* eslint-disable react/prop-types */
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import editIcon from "../../assets/Imgs/edit.png";
import deleteIcon from "../../assets/Imgs/delete.png";
import AdminDeleteSubcategoryHook from "../../hooks/subCategory/AdminDeleteSubcategoryHook";

const AdminSubcategoryCard = ({ subcategory, categoryID }) => {
  const [show, handleClose, handleShow, handelDelete] =
    AdminDeleteSubcategoryHook(subcategory);

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
          <div className="font">
            هل انت متاكد من عملية الحذف للتصنيف الفرعي؟
          </div>
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
            اسم التصنيف الفرعي:{" "}
            <span className="fw-normal me-2">{subcategory?.name}</span>
          </div>
        </Col>

        <Col xs="6" className="d-flex d-flex justify-content-end">
          <div className="d-flex p-2">
            <Link
              to={`/admin/all-categories/${categoryID}/all-subcategories/edit-subcategory/${subcategory?._id}`}
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
    </div>
  );
};

export default AdminSubcategoryCard;
