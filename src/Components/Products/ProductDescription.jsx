/* eslint-disable react/prop-types */
import { Col, Row } from "react-bootstrap";

const ProductDescription = ({ itemProduct, itemCategory, itemBrand }) => {
  return (
    <div style={{ marginRight: "10%" }}>
      <Row className="mt-2">
        <div className="cat-text">{itemCategory.name}: </div>
      </Row>

      <Row>
        <Col md="8">
          <div className="cat-title d-inline">
            {itemProduct.title}
            <div className="cat-rate d-inline mx-3">
              {itemProduct.ratingsQuantity}
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md="8" className="mt-4">
          <div className="cat-text d-inline">الماركة :</div>
          <div className="barnd-text d-inline mx-1">{itemBrand.name} </div>
        </Col>
      </Row>

      <Row>
        <Col md="8" className="mt-1 d-flex">
          {itemProduct.availableColors
            ? itemProduct.availableColors.map((color, index) => (
                <div
                  key={index}
                  className="color ms-2 border"
                  style={{ backgroundColor: color }}
                ></div>
              ))
            : null}
        </Col>
      </Row>

      <Row className="mt-4">
        <div className="cat-text">المواصفات :</div>
      </Row>

      <Row className="mt-2">
        <Col md="10">
          <div className="product-description d-inline">
            {itemProduct.description}
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md="12">
          <div className="product-price d-inline px-3 py-3 border">
            {itemProduct.price} جنية
          </div>
          <div className="product-cart-add px-3 py-3 d-inline mx-3">
            اضف للعربة
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDescription;
