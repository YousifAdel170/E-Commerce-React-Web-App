/* eslint-disable react/prop-types */

// Import components from react-bootstrap, react-toastify
import { Button, Col, Modal, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify"; // For showing toast notifications

// Import Custom Hooks
import DeleteCartHook from "../../hooks/cart/DeleteCartHook"; // Custom hook to handle item deletion
import UpdateCartHook from "../../hooks/cart/UpdateCartHook"; // Custom hook to handle item quantity updates

// Import Used Assets
import deletion from "../../assets/Imgs/delete.png";

// Import Used Configurations
import { PRODUCTS_BASE_URL } from "../../config"; // Base URL for product images

// Custom styles for the CartItem component
import "./CartItem.css";

// Component Responsible to enter details of the Item in the cart
const CartItem = ({ item }) => {
  // Destructure data from DeleteCartHook and UpdateCartHook for managing deletion and update modals
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
      {/* Modal for updating a specific item in the cart */}
      <Modal show={showSpecificUpdate} onHide={handleCloseSpecificUpdate}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تاكيد التعديل</div> {/* Confirmation title */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل انت متاكد من تعديل هذا المنتج من العربة</div>{" "}
          {/* Confirmation body */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="font"
            variant="success"
            onClick={handleCloseSpecificUpdate}
          >
            تراجع {/* Undo action */}
          </Button>
          <Button
            className="font"
            variant="dark"
            onClick={handleUpdateSpecificItem}
          >
            تعديل {/* Update action */}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for deleting a specific item from the cart */}
      <Modal show={showSpecific} onHide={handleCloseSpecific}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تاكيد الحذف</div> {/* Confirmation title */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل انت متاكد من حذف هذا المنتج من العربة</div>{" "}
          {/* Confirmation body */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="font"
            variant="success"
            onClick={handleCloseSpecific}
          >
            تراجع {/* Undo action */}
          </Button>
          <Button
            className="font"
            variant="dark"
            onClick={handelDeleteSpecificItem}
          >
            حذف {/* Delete action */}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cart Item Image */}
      <img
        width="250px"
        height="250px"
        src={item?.product ? PRODUCTS_BASE_URL + item.product.imageCover : ""} // Display product image
        alt=""
        className="mx-auto"
      />

      {/* Cart Item Details Container */}
      <div className="w-100">
        <Row className="mt-2">
          <Col className="py-1 d-flex col-mobile">
            {/* Product Title */}
            <div className="d-flex">
              <div className="cat-title ms-2">اسم المنتج: </div>
              <div className="cat-text d-flex align-items-center">
                {item?.product?.title || ""} {/* Display product title */}
              </div>
            </div>
            {/* Product Rating */}
            <div className="d-flex align-items-center cat-rate me-2">
              ({item?.product?.ratingsAverage || 0}){" "}
              {/* Display product rating */}
            </div>
          </Col>
        </Row>

        <Row className="justify-content-between">
          <Col sm="12" className="pb-1 d-flex col-mobile">
            {/* Product Category */}

            <div className="cat-title">اسم التصنيف:</div>
            <div className="cat-text d-flex align-items-center me-2  ">
              {item?.product?.category?.name} {/* Display product category */}
            </div>
          </Col>
        </Row>

        {/* Cart Item Brand */}
        <Row>
          <Col sm="12" className="py-1 d-flex align-items-center col-mobile">
            <div className="cat-title">الماركة:</div>
            <div className="cat-text me-2">
              {item?.product?.brand?.name || ""} {/* Display product brand */}
            </div>
          </Col>
        </Row>

        {/* Cart Item Price */}
        <Row>
          <Col sm="12 py-1 d-flex col-mobile">
            <div className="cat-title align-items-center d-flex">السعر: </div>
            <div className="cat-text d-flex align-items-center me-2">
              {item?.price || 0} جنية {/* Display product price */}
            </div>
          </Col>
        </Row>

        {/* Cart Item Color */}
        <Row>
          <Col sm="12" className="py-1 d-flex col-mobile">
            <div className="cat-title d-flex align-items-center">اللون:</div>
            {/* Display product color */}
            <div
              className="color me-2 border"
              style={{ backgroundColor: item?.color || "" }}
            ></div>
          </Col>
        </Row>

        {/* Cart Item Quantity and Update Button */}
        <Row className="py-2 d-flex justify-content-between">
          <Col className="d-flex col-mobile flex-grow-2 flex-grow-1-mobile">
            <div className="cat-title d-flex align-items-center">الكمية: </div>
            <input
              value={itemCount} // Display current item count
              onChange={onChangeCount} // Handle item count change
              className="mx-1 cat-text text-center"
              type="number"
              style={{ width: "40px", height: "40px", lineHeight: "40px" }}
            />
            {/* Apply Button */}
            <Button onClick={handleShowSpecificUpdate} className="btn btn-dark">
              تطبيق {/* Apply changes */}
            </Button>
          </Col>

          <Col className="col-mobile flex-center-mobile align-items-center d-flex">
            {/* Delete Item Button */}
            <div
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={handleShowSpecific} // Show the delete confirmation modal
            >
              <img src={deletion} width="20px" height="24px" />
              <div className="cat-text d-flex align-items-center me-2">مسح</div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </Col>
  );
};

export default CartItem;
