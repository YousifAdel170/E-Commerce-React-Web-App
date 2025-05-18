/* eslint-disable react/prop-types */
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalComponent from "../Utility/ModalComponent";
import { deleteModal, editModal } from "../../constants/modalMessages";
import AdminProductCardHook from "../../hooks/admin/AdminProductCardHook";

const AdminProductCard = ({ item, onDelete }) => {
  const [
    showDelete,
    showEdit,
    handleCloseDelete,
    handleShowDelete,
    handleCloseEdit,
    handleShowEdit,
    handleDelete,
    handleEdit,
  ] = AdminProductCardHook(item, onDelete);

  return (
    <Col xs="12" sm="6" md="5" lg="4" className="d-flex">
      {/* Delete Modal */}
      <ModalComponent
        show={showDelete}
        handleClose={handleCloseDelete}
        handleOperation={handleDelete}
        modalTitle={deleteModal.modalTitle}
        modalBody={deleteModal.modalBody}
        modalFooter={deleteModal.modalFooter}
        className={deleteModal.className}
      />

      {/* Edit Modal */}
      <ModalComponent
        show={showEdit}
        handleClose={handleCloseEdit}
        handleOperation={handleEdit}
        modalTitle={editModal.modalTitle}
        modalBody={editModal.modalBody}
        modalFooter={editModal.modalFooter}
        className={editModal.className}
      />

      {/* The Card Item */}
      <Card
        className="my-2"
        style={{
          width: "100%",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Row className="d-flex justify-content-center px-2 mt-2">
          <Col className=" d-flex justify-content-between">
            <div className="item-delete-edit" onClick={handleShowDelete}>
              حذف
            </div>
            <div className="item-delete-edit" onClick={handleShowEdit}>
              تعديل
            </div>
          </Col>
        </Row>
        <Link to={`/products/${item?._id}`}>
          <Card.Img style={{ height: "228px" }} src={item?.imageCover} />
          <Card.Body className="d-flex justify-content-between">
            {/* Card Title */}
            <Card.Title className="d-flex">
              <span className="card-title ms-1" style={{ color: "black" }}>
                {item?.title}
              </span>
              <span className="card-rate">({item?.ratingsQuantity})</span>
            </Card.Title>

            {/* Card Price + Concurrency */}
            <div>
              <div className="d-flex justify-content-between">
                <div className="card-price">
                  {item?.priceAfterDiscount ? (
                    <>
                      {item?.priceAfterDiscount}
                      <del className="mx-1 fs-6">{item?.price}</del>
                    </>
                  ) : (
                    item?.price
                  )}{" "}
                </div>
                <div className="card-currency mx-1">جنيه</div>
              </div>
            </div>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
};

export default AdminProductCard;
