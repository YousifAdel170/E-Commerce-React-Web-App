/* eslint-disable react/prop-types */

// Import Components
import { Col, Row } from "react-bootstrap";

// Import to get the product ID from URL parameters
import { useParams } from "react-router-dom";

// Import custom hook to handle add-to-cart functionality
import AddToCartHook from "../../hooks/cart/AddToCartHook";

// Component responsible for displaying the product description and add-to-cart logic
const ProductDescription = ({ itemProduct, itemCategory, itemBrand }) => {
  // Get product ID from the URL
  const { id } = useParams();

  // Use custom hook to handle color selection and adding to cart
  const [colorClicked, indexColorClicked, handleAddToCart] = AddToCartHook(
    id,
    itemProduct
  );

  return (
    <div style={{ marginRight: "10%" }}>
      {/* Product Category */}
      <Row className="mt-2">
        <div className="cat-text">{itemCategory?.name}</div>
      </Row>

      {/* Product Title and Rating */}
      <Row>
        <Col md="8">
          <div className="cat-title d-inline">
            {itemProduct?.title}
            <div className="cat-rate d-inline mx-3">
              {itemProduct?.ratingsQuantity}
            </div>
          </div>
        </Col>
      </Row>

      {/* Product Brand */}
      <Row>
        <Col md="8" className="mt-4">
          <div className="cat-text d-inline">الماركة :</div>
          <div className="brand-text d-inline mx-1">{itemBrand?.name}</div>
        </Col>
      </Row>

      {/* Available Colors and Quantity */}
      <Row>
        <Col md="8" className="mt-1 d-flex">
          {itemProduct?.availableColors?.map((color, index) => (
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
          ))}

          <div className="cat-text d-flex align-items-center">
            الكمية المتاحة : {itemProduct?.quantity}
          </div>
        </Col>
      </Row>

      {/* Product Specifications */}
      <Row className="mt-4">
        <div className="cat-text">المواصفات :</div>
      </Row>

      {/* Product Description */}
      <Row className="mt-2">
        <Col md="10">
          <div className="product-description d-inline">
            {itemProduct?.description}
          </div>
        </Col>
      </Row>

      {/* Product Price and Add to Cart */}
      <Row className="mt-4">
        <Col md="12">
          <div className="product-price d-inline px-3 py-3 border">
            {itemProduct?.priceAfterDiscount ? (
              <>
                {itemProduct?.priceAfterDiscount}
                <del className="mx-2">{itemProduct?.price}</del>
              </>
            ) : (
              itemProduct?.price
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

// Export the component as default
export default ProductDescription;
