/* eslint-disable react/prop-types */
import { Button, Col, Modal, Row } from "react-bootstrap";

import deletion from "../../assets/Imgs/delete.png";
import { PRODUCTS_BASE_URL } from "../../config";
import DeleteCartHook from "../../hooks/cart/DeleteCartHook";
import { ToastContainer } from "react-toastify";
import UpdateCartHook from "../../hooks/cart/UpdateCartHook";

import "./CartItem.css";

const CartItem = ({ item }) => {
  const [
    ,
    ,
    ,
    ,
    showSpecific,
    handleCloseSpecific,
    handleShowSpecific,
    handelDeleteSpecificItem,
  ] = DeleteCartHook(item);

  const [
    itemCount,
    onChangeCount,
    showSpecificUpdate,
    handleCloseSpecificUpdate,
    handleShowSpecificUpdate,
    handleUpdateSpecificItem,
  ] = UpdateCartHook(item);
  return (
    <Col xs="12" className="cart-item-body my-2 d-flex px-2">
      {/* Modal For Update Specific Item In The  Cart */}
      <Modal show={showSpecificUpdate} onHide={handleCloseSpecificUpdate}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تاكيد التعديل</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل انت متاكد من تعديل هذا المنتج من العربة</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="font"
            variant="success"
            onClick={handleCloseSpecificUpdate}
          >
            تراجع
          </Button>
          <Button
            className="font"
            variant="dark"
            onClick={handleUpdateSpecificItem}
          >
            تعديل
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal For Delete Specific Item In The  Cart */}
      <Modal show={showSpecific} onHide={handleCloseSpecific}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تاكيد الحذف</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل انت متاكد من حذف هذا المنتج من العربة</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="font"
            variant="success"
            onClick={handleCloseSpecific}
          >
            تراجع
          </Button>
          <Button
            className="font"
            variant="dark"
            onClick={handelDeleteSpecificItem}
          >
            حذف
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cart Item Image */}
      <img
        width="160px"
        height="197px"
        src={
          item && item.product
            ? PRODUCTS_BASE_URL + item.product.imageCover
            : ""
        }
        alt=""
      />

      {/* Cart Item Container */}
      <div className="w-100">
        {/* Cart Item Name and deletion to remove it  */}
        <Row className="justify-content-between">
          <Col sm="12" className=" d-flex flex-row justify-content-between">
            <div className="d-inline pt-2 cat-text">الالكترونيات</div>
            <div
              className="d-flex pt-2 "
              style={{ cursor: "pointer" }}
              onClick={handleShowSpecific}
            >
              <img src={deletion} alt="" width="20px" height="24px" />
              <div className="cat-text d-inline me-2">ازاله</div>
            </div>
          </Col>
        </Row>

        {/* Cart Item description and rate */}
        <Row className="justify-content-center mt-2">
          <Col sm="12" className=" d-flex flex-row justify-content-start">
            <div className="d-inline pt-2 cat-title">
              {item && item.product ? item.product.title : ""}
            </div>
            <div className="d-inline pt-2 cat-rate me-2">
              {item && item.product ? item.product.ratingsAverage : ""}
            </div>
          </Col>
        </Row>

        {/* Cart Item brand */}
        <Row>
          <Col sm="12" className="mt-1">
            <div className="cat-text d-inline">الماركة :</div>
            <div className="brand-text d-inline mx-1">
              {item && item.product && item.product.brand
                ? item.product.brand.name
                : ""}
            </div>
          </Col>
        </Row>

        {/* Cart Item Color */}
        <Row>
          <Col sm="12" className="mt-1 d-flex">
            <div
              className="color ms-2 border"
              style={{ backgroundColor: item ? item.color : "" }}
            ></div>
          </Col>
        </Row>

        {/* Cart Item Quantity and Price */}
        <Row className="justify-content-between">
          <Col sm="12" className=" d-flex flex-row justify-content-between">
            <div className="d-inline pt-2 d-flex">
              <div className="cat-text d-flex align-items-center">الكميه</div>
              <input
                value={itemCount}
                onChange={onChangeCount}
                className="mx-2 text-center"
                type="number"
                style={{ width: "60px", height: "40px" }}
              />
              <Button
                onClick={handleShowSpecificUpdate}
                className="btn btn-dark"
              >
                تطبيق
              </Button>
            </div>
            <div className="d-inline pt-2 brand-text">
              {item ? item.price : 0} جنية
            </div>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </Col>
  );
};

export default CartItem;
