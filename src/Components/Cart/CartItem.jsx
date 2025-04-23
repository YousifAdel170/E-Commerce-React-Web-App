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
    <Col xs="12" className="cart-item-body my-2 d-flex flex-column-mobile px-2">
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
        width="250px"
        height="250px"
        src={item?.product ? PRODUCTS_BASE_URL + item.product.imageCover : ""}
        alt=""
        className="mx-auto"
      />

      {/* Cart Item Container */}
      <div className="w-100">
        <Row className="d-flex justify-content-between mt-2 ">
          <Col className="py-1 d-flex">
            <div className="d-flex align-items-center">
              <div className="cat-title ms-2">اسم المنتج: </div>
              <div className="cat-text d-flex align-items-center">
                {item?.product?.title || ""}
              </div>
            </div>
            <div className="d-flex align-items-center cat-rate me-2">
              ({item?.product?.ratingsAverage || 0})
            </div>
          </Col>

          <Col>
            <div
              className="d-flex py-1 align-items-center justify-content-center"
              style={{ cursor: "pointer" }}
              onClick={handleShowSpecific}
            >
              <img src={deletion} alt="" width="20px" height="24px" />
              <div className="cat-text d-flex align-items-center me-2">مسح</div>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-between">
          <Col sm="12" className="py-1 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <div className="cat-title">التصنيف:</div>

              <div className="d-flex align-items-center me-2 cat-text ">
                {item?.product?.category?.name}
              </div>
            </div>
          </Col>
        </Row>

        {/* Cart Item brand */}
        <Row>
          <Col sm="12" className="py-1 d-flex align-items-center">
            <div className="cat-title">الماركة:</div>
            <div className="cat-text mx-1">
              {item?.product?.brand?.name || ""}
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="12 py-1 d-flex">
            <div className="cat-title ms-1 align-items-center d-flex">
              السعر:{" "}
            </div>
            <div className="cat-text d-flex align-items-center">
              {item?.price || 0} جنية
            </div>
          </Col>
        </Row>

        {/* Cart Item Color */}
        <Row>
          <Col sm="12" className="py-1 d-flex">
            <div className="cat-title ms-2 d-flex align-items-center">
              اللون:
            </div>

            <div
              className="color ms-2 border"
              style={{ backgroundColor: item?.color || "" }}
            ></div>
          </Col>
        </Row>

        {/* Cart Item Quantity and Price */}
        <Row className="pt-2 d-flex justify-content-between alig-items-center">
          <div className="d-flex">
            <div className="cat-title d-flex align-items-center">الكمية: </div>
            <input
              value={itemCount}
              onChange={onChangeCount}
              className="mx-1 cat-text text-center d-flex justify-content-center"
              type="number"
              style={{ width: "40px", height: "40px", lineHeight: "40px" }}
            />
            <Button onClick={handleShowSpecificUpdate} className="btn btn-dark">
              تطبيق
            </Button>
          </div>
        </Row>
      </div>
      <ToastContainer />
    </Col>
  );
};

export default CartItem;
