/* eslint-disable react/prop-types */
import { Col, Row } from "react-bootstrap";

import { PRODUCTS_BASE_URL } from "../../config";

const UserOrderCard = ({ item }) => {
  return (
    <Row className="d-flex mb-4 mt-2">
      {/* Product Image */}
      <Col xs="3" md="2" className="d-flex justify-content-start border me-2">
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

      {/* Product Name, Rate, Quatity */}
      <Col xs="8" md="6" className="d-flex flex-column justify-content-evenly">
        {/* Name */}
        <div className="cat-title">
          {item && item.product ? item.product.title : ""}
        </div>

        {/* Rate */}
        <div className=" cat-rate d-flex align-items-center">
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

        {/* Quantity */}
        <div className="d-flex">
          <div className="cat-text d-flex align-items-center">الكمية: </div>
          <div className="mx-2 ">{item && item.product ? item.count : 0}</div>
        </div>
        <div
          className="color border"
          style={{ backgroundColor: item ? item.color : "", cursor: "auto" }}
        ></div>
      </Col>
    </Row>
  );
};

export default UserOrderCard;
