/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Col,
  Row,
  Button,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddToCartHook from "../../hooks/cart/AddToCartHook";

const ProductDescription = ({ itemProduct, itemCategory, itemBrand }) => {
  const { id } = useParams();
  const [colorClicked, indexColorClicked, handleAddToCart] = AddToCartHook(
    id,
    itemProduct
  );

  const [isAdding, setIsAdding] = useState(false);
  const isAddDisabled = indexColorClicked === -1 || itemProduct?.quantity === 0;

  const discountPercent = itemProduct?.priceAfterDiscount
    ? Math.round(
        ((itemProduct.price - itemProduct.priceAfterDiscount) /
          itemProduct.price) *
          100
      )
    : 0;

  const onAddToCart = () => {
    if (isAddDisabled) return;
    setIsAdding(true);
    handleAddToCart();
    setTimeout(() => setIsAdding(false), 1000); // simulate loading
  };

  return (
    <div className="product-description-container">
      {/* Product Title and Rating */}
      <Row className="mb-2">
        <Col md="8" className="d-flex align-items-center">
          <div className="cat-title">{itemProduct?.title}</div>
          <div className="cat-rate mx-2 mb-0">
            ⭐ {itemProduct?.ratingsAverage} ({itemProduct?.ratingsQuantity})
          </div>
        </Col>
      </Row>

      {/* Product Category */}
      <Row>
        <Col md="8" className="d-flex align-items-center">
          <div className="cat-text">التصنيف:</div>
          <div className="cat-text mx-1">{itemCategory?.name}</div>
        </Col>
      </Row>

      {/* Product Brand */}
      <Row>
        <Col md="8" className="d-flex align-items-center">
          <div className="cat-text">الماركة :</div>
          <div className="cat-text mx-1">{itemBrand?.name}</div>
        </Col>
      </Row>

      {/* Available Colors and Quantity */}
      <Row className="mt-1">
        <Col md="8" className="d-flex flex-wrap align-items-center">
          {itemProduct?.availableColors?.map((color, index) => (
            <OverlayTrigger
              key={index}
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
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  position: "relative",
                  margin: "5px",
                }}
                aria-label={`Select color ${color}`}
                aria-pressed={indexColorClicked === index}
                type="button"
              >
                {indexColorClicked === index && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      background: "white",
                      borderRadius: "50%",
                      padding: "1px 4px",
                      fontSize: "12px",
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

          <div
            className="cat-text d-flex mb-0 flex-column align-items-start me-3"
            style={{ color: "#555550", fontWeight: "600" }}
          >
            <span>الكمية المتاحة : {itemProduct?.quantity}</span>

            {itemProduct?.quantity === 0 && (
              <span
                style={{
                  marginTop: "5px",
                  color: "#b71c1c",
                  fontWeight: "bold",
                  fontSize: "0.95em",
                }}
              >
                ❌ غير متوفر حالياً
              </span>
            )}

            {itemProduct?.quantity > 0 && itemProduct?.quantity <= 5 && (
              <span
                style={{
                  marginTop: "5px",
                  color: "#e65100",
                  fontWeight: "bold",
                  fontSize: "0.95em",
                }}
              >
                ⚠️ الكمية محدودة، أسرع قبل النفاد!
              </span>
            )}
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
      <Row className="mt-4 align-items-center">
        <Col md="auto">
          <div
            className="product-price d-inline px-3 py-3 border"
            style={{ fontSize: "18px", fontWeight: "700" }}
          >
            {itemProduct?.priceAfterDiscount ? (
              <>
                <span style={{ color: "green", fontWeight: "bold" }}>
                  {itemProduct?.priceAfterDiscount}{" "}
                  <span style={{ fontSize: "14px" }}>جنية</span>
                </span>
                <del
                  className="mx-2"
                  style={{
                    color: "#888",
                    fontSize: "14px",
                    fontWeight: "normal",
                  }}
                >
                  {itemProduct?.price} جنيه
                </del>
                <span
                  style={{
                    color: "crimson",
                    fontWeight: "600",
                    fontSize: "14px",
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

        <Col md="auto">
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
            <span className="d-inline-block">
              <Button
                variant="dark"
                disabled={isAddDisabled || isAdding}
                onClick={onAddToCart}
                style={{ borderRadius: "9px", minWidth: "120px" }}
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

      {/* Sticky Add to Cart on Mobile */}
      <div className="d-md-none sticky-bottom bg-white p-3 shadow">
        <Button
          variant="dark"
          block
          disabled={isAddDisabled || isAdding}
          onClick={onAddToCart}
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
      </div>
    </div>
  );
};

export default ProductDescription;
