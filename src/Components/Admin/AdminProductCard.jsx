/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Col, Row, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../redux/actions/productsAction";

const AdminProductCard = ({ item }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleDelete = async () => {
    // Delete The Item From
    // console.log(item);
    await dispatch(deleteProduct(item._id));

    // Close The Modal
    setShow(false);

    // Reload the Page
    // window.location.reload();
  };

  return (
    <Col xs="12" sm="6" md="5" lg="4" className="d-flex">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="font">تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body className="font">هل انت متأكد من عملية الحذف</Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="font btn btn-secondary">
            اغلاق
          </button>
          <button onClick={handleDelete} className="font btn btn-danger">
            تاكيد الحذف
          </button>
        </Modal.Footer>
      </Modal>

      <Card
        className="my-2"
        style={{
          width: "100%",
          height: "350px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Row className="d-flex justify-content-center px-2">
          <Col className=" d-flex justify-content-between">
            <div className="d-inline item-delete-edit" onClick={handleShow}>
              ازاله
            </div>
            <Link
              to={`/admin/edit-product/${item._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="d-inline item-delete-edit">تعديل</div>
            </Link>
          </Col>
        </Row>
        <Link to={`/products/${item._id}`} style={{ textDecoration: "none" }}>
          <Card.Img
            style={{ height: "228px", width: "100%" }}
            src={item.imageCover}
          />
          <Card.Body>
            <Card.Title>
              <div className="card-title" style={{ color: "black" }}>
                {item.title}
              </div>
            </Card.Title>
            <Card.Text>
              <div className="d-flex justify-content-between">
                <div className="card-rate">{item.ratingsQuantity}</div>
                <div className="d-flex">
                  <div className="card-currency mx-1">جنيه</div>
                  <div className="card-price">{item.price}</div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
};

export default AdminProductCard;
