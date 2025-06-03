/* eslint-disable react/prop-types */

// Import Component from react-bootstrap
import {
  Col,
  Row,
  Button,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";

// Custom Components
import { StarRating } from "../Utility/StartRating";

// Custom Hooks
import AddToCartHook from "../../hooks/cart/AddToCartHook";
import ProductDescriptionHook from "../../hooks/products/ProductDescriptionHook";

// Custom CSS
import "./ProductModule.css";

// Component responsible to display the description details of the product
const ProductDescription = ({ itemProduct, itemCategory, itemBrand }) => {
  // Handle color selection and add-to-cart logic
  const [colorClicked, indexColorClicked, handleAddToCart] =
    AddToCartHook(itemProduct);

  // Get state and handlers from custom product description hook
  const [discountPercent, isAddDisabled, isAdding, onAddToCart] =
    ProductDescriptionHook(itemProduct, indexColorClicked, handleAddToCart);

  return (
    <div className="product-description-container justify-content-around">
      {/* Title and Star Rating */}
      <Row className="mb-2">
        <Col
          xs={12}
          md={8}
          className="d-flex flex-wrap align-items-center justify-content-start"
        >
          <h1 className="product-details-title ms-2">{itemProduct?.title}</h1>
          <StarRating
            rating={itemProduct?.ratingsAverage || 0}
            direction="rtl"
          />
          <span className="d-flex">
            <div className="rate mx-2">{itemProduct?.ratingsAverage}</div>
            <div className="rate-count">
              ({itemProduct?.ratingsQuantity} تقييم)
            </div>
          </span>
        </Col>
      </Row>

      {/* Category Information */}
      <Row className="mb-2">
        <Col md="8" className="d-flex align-items-center justify-content-start">
          <span className="product-details-sub-title">التصنيف:</span>
          <span className="product-details-sub-text mx-1">
            {itemCategory?.name}
          </span>
        </Col>
      </Row>

      {/* Brand Information */}
      <Row className="mb-2">
        <Col md="8" className="d-flex align-items-center justify-content-start">
          <span className="product-details-sub-title">الماركة :</span>
          <span className="product-details-sub-text mx-1">
            {itemBrand?.name}
          </span>
        </Col>
      </Row>

      {/* Available Colors with Selectable Buttons */}
      <Row className="mb-2">
        <Col
          md="8"
          className="d-flex flex-wrap align-items-center justify-content-start"
          role="list"
          aria-label="Available colors"
        >
          {itemProduct?.availableColors?.map((color, index) => (
            <OverlayTrigger
              key={color + index}
              overlay={<Tooltip>{color}</Tooltip>}
              placement="top"
            >
              <button
                onClick={() => colorClicked(color, index)}
                className="color"
                style={{
                  backgroundColor: color,
                  border:
                    indexColorClicked === index
                      ? "3px solid black"
                      : "1px solid #ccc",
                  cursor: "pointer",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  position: "relative",
                  margin: 5,
                }}
                aria-label={`Select color ${color}`}
                aria-pressed={indexColorClicked === index}
                type="button"
                role="listitem"
              >
                {/* Selected checkmark */}
                {indexColorClicked === index && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: -5,
                      right: -5,
                      background: "white",
                      borderRadius: "50%",
                      padding: "1px 4px",
                      fontSize: 12,
                      fontWeight: "bold",
                      color: "green",
                    }}
                  >
                    ✓
                  </span>
                )}
              </button>
            </OverlayTrigger>
          ))}

          {/* Quantity and Stock Alert Messages */}
          <div
            className="mb-0 d-flex align-items-center me-3"
            style={{ color: "#555550", fontWeight: 600, fontSize: "1rem" }}
            aria-live="polite"
          >
            <span>الكمية المتاحة : {itemProduct?.quantity}</span>

            {/* Out of Stock */}
            {itemProduct?.quantity === 0 && (
              <span
                style={{
                  marginTop: 5,
                  color: "#b71c1c",
                  fontWeight: "bold",
                  fontSize: "0.95em",
                  marginLeft: 10,
                }}
                role="alert"
              >
                ❌ غير متوفر حالياً
              </span>
            )}

            {/* Low Stock */}
            {itemProduct?.quantity > 0 && itemProduct?.quantity <= 5 && (
              <span
                style={{
                  marginTop: 5,
                  color: "#e65100",
                  fontWeight: "bold",
                  fontSize: "0.95em",
                  marginLeft: 10,
                }}
                role="alert"
              >
                ⚠️ الكمية محدودة، أسرع قبل النفاد!
              </span>
            )}
          </div>
        </Col>
      </Row>

      {/* Description and Specifications */}
      <Row className="mb-2">
        <Col md="10">
          <h2 className="product-details-sub-title">المواصفات :</h2>
        </Col>
        <Col md="10">
          <p className="product-description">{itemProduct?.description}</p>
        </Col>
      </Row>

      {/* Price Display with Discount Handling */}
      <Row className="align-items-center d-flex flex-wrap">
        <Col xs={12} md="auto" className="mb-2 mb-md-0">
          <div
            className="product-price px-3 py-2 border"
            aria-label={
              itemProduct?.priceAfterDiscount
                ? `Discounted price ${itemProduct.priceAfterDiscount} جنيه, original price ${itemProduct.price} جنيه, save ${discountPercent} percent`
                : `Price ${itemProduct?.price} جنيه`
            }
          >
            {itemProduct?.priceAfterDiscount ? (
              <>
                <span style={{ color: "green", fontWeight: "bold" }}>
                  {itemProduct.priceAfterDiscount} جنيه
                </span>

                <del
                  className="mx-2"
                  style={{
                    color: "#888",
                    fontSize: "0.9rem",
                    fontWeight: "normal",
                  }}
                >
                  {itemProduct.price} جنيه
                </del>

                <span
                  style={{
                    color: "crimson",
                    fontSize: "0.9rem",
                  }}
                >
                  (وفر {discountPercent}%)
                </span>
              </>
            ) : (
              <span>{itemProduct?.price} جنيه</span>
            )}
          </div>
        </Col>

        {/* Add to Cart Button with Spinner and Tooltip */}
        <Col xs={12} md className="mt-2 mt-md-0">
          <OverlayTrigger
            placement="top"
            overlay={
              isAddDisabled ? (
                <Tooltip id="tooltip-disabled">
                  {itemProduct?.quantity === 0
                    ? "المنتج غير متوفر حالياً"
                    : "اختر لوناً لإضافة المنتج للعربة"}
                </Tooltip>
              ) : (
                <></>
              )
            }
          >
            <span>
              <Button
                className="px-3 py-2 w-sm-100"
                variant="dark"
                disabled={isAddDisabled || isAdding}
                onClick={onAddToCart}
                aria-disabled={isAddDisabled || isAdding}
              >
                {isAdding ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    جار الإضافة...
                  </>
                ) : (
                  "اضف للعربة"
                )}
              </Button>
            </span>
          </OverlayTrigger>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDescription;
