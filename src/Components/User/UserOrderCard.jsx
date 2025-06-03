/* eslint-disable react/prop-types */

// Import layout components from React Bootstrap
import { Col, Row } from "react-bootstrap";

// Import base URL for product images
import { PRODUCTS_BASE_URL } from "../../config";

// Component to display a single item in a user's order
const UserOrderCard = ({ item }) => {
  return (
    <Row className="d-flex my-2 justify-content-start">
      {/* Product Image */}
      <Col xs="3" md="2" className="d-flex border me-3">
        <img
          width="93px"
          height="120px"
          src={
            item && item.product
              ? PRODUCTS_BASE_URL + item.product.imageCover
              : ""
          }
          alt=""
        />
      </Col>

      {/* Product Details: Name, Rating, Quantity, Color */}
      <Col xs="8" md="6" className="d-flex flex-column">
        {/* Product Title */}
        <div className="cat-title w-100 mb-1">
          {item && item.product ? item.product.title : ""}
        </div>

        {/* Product Rating */}
        <div className="cat-rate d-flex align-items-center w-100 justify-content-start mb-1">
          {item && item.product && item.product.ratingsQuantity
            ? item.product.ratingsQuantity
            : 0}

          <div className="rate-count me-2">
            (
            {item && item.product && item.product.ratingsQuantity
              ? item.product.ratingsQuantity
              : 0}{" "}
            تقييم)
          </div>
        </div>

        {/* Quantity Ordered */}
        <div className="d-flex w-100 justify-content-start align-items-center mb-1">
          <div className="cat-text d-flex align-items-center mb-0">
            الكمية:{" "}
          </div>
          <div className="mx-2 mb-0">
            {item && item.product ? item.count : 0}
          </div>
        </div>

        {/* Product Color */}
        <div className="d-flex justify-content-start w-100">
          <div
            className="color border"
            style={{
              backgroundColor: item ? item.color : "",
              cursor: "auto",
            }}
          ></div>
        </div>
      </Col>
    </Row>
  );
};

// Export the component
export default UserOrderCard;
