/* eslint-disable react/prop-types */
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddToCartHook from "../../hooks/cart/AddToCartHook";

const ProductDescription = ({ itemProduct, itemCategory, itemBrand }) => {
  const { id } = useParams();

  const [colorClicked, indexColorClicked, handleAddToCart] = AddToCartHook(
    id,
    itemProduct
  );
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
                  onClick={() => colorClicked(color, index)}
                  className="color ms-2"
                  style={{
                    backgroundColor: color,
                    border:
                      indexColorClicked === index ? "3px solid black" : "none",
                  }}
                ></div>
              ))
            : null}

          <div className="cat-text d-flex align-items-center">
            الكمية المتاحة : {itemProduct.quantity}{" "}
          </div>
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
            {itemProduct.priceAfterDiscount ? (
              <>
                {itemProduct.priceAfterDiscount}
                <del className="mx-2">{itemProduct.price}</del>
              </>
            ) : (
              itemProduct.price
            )}{" "}
            جنية
          </div>
          <div
            onClick={handleAddToCart}
            className="product-cart-add px-3 py-3 d-inline mx-3"
          >
            اضف للعربة
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDescription;
