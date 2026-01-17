/* eslint-disable react/prop-types */

// Import Components from react-bootstrap
import { Col, Row, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

// Custom Components
import { StarRating } from "../Utility/StartRating";

// Custom Hooks
import AddToCartHook from "../../hooks/cart/AddToCartHook";
import ProductDescriptionHook from "../../hooks/products/ProductDescriptionHook";

// Custom CSS
import "./ProductModule.css";
import { useTranslation } from "react-i18next";
import SpinnerComponent from "../Utility/SpinnerComponent";
import { useCurrencyFormatter } from "../../hooks/Utility/format";

const ProductDescription = ({ itemProduct, itemCategory, itemBrand }) => {
  const { t } = useTranslation("product");

  // Handle color selection and add-to-cart logic
  const [colorClicked, indexColorClicked, handleAddToCart] =
    AddToCartHook(itemProduct);

  // Get state and handlers from custom product description hook
  const [discountPercent, isAddDisabled, isAdding, onAddToCart] =
    ProductDescriptionHook(itemProduct, indexColorClicked, handleAddToCart);

  const { formatCurrency } = useCurrencyFormatter(
    itemProduct?.currencyCode || "EGP"
  );

  return (
    <div className="product-description-container justify-content-around card-container box-shadow-lift">
      {/* Title and Star Rating */}
      <Row className="mb-1">
        <Col xs={12} md={8} className="d-flex align-items-center">
          <h1 className="title-text mb-0">{itemProduct?.title}</h1>
          <StarRating rating={itemProduct?.ratingsAverage || 0} />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={8} className="d-flex flex-wrap align-items-center">
          {/* Rate */}
          <div className="d-flex flex-column">
            {/* Rate Average */}
            <div className="d-flex">
              <div className="card-item-text">
                {t("productDetails.productDescription.rate")}:
              </div>

              <div className="card-item-text-answer d-flex align-items-center">
                {itemProduct?.ratingsAverage}
              </div>

              {/* Rate Counts */}
              <div className="rate-count d-flex align-items-center mx-2">
                ({itemProduct?.ratingsQuantity}{" "}
                {t("productDetails.productDescription.reviewsCount")})
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Category */}
      <Row className="mb-2">
        <Col md="8" className="d-flex align-items-center">
          <span className="card-item-text">
            {t("productDetails.productDescription.category")}:
          </span>
          <span className="card-item-text-answer">{itemCategory?.name}</span>
        </Col>
      </Row>

      {/* Brand */}
      <Row className="mb-2">
        <Col md="8" className="d-flex align-items-center">
          <span className="card-item-text">
            {t("productDetails.productDescription.brand")}:
          </span>
          <span className="card-item-text-answer mx-1">{itemBrand?.name}</span>
        </Col>
      </Row>

      {/* Colors */}
      <Row className="mb-2">
        <Col
          md="8"
          className="d-flex flex-wrap align-items-center"
          role="list"
          aria-label={t("productDetails.productDescription.currentColors")}
        >
          <span className="card-item-text">
            {t("productDetails.productDescription.currentColors")}:
          </span>
          {itemProduct?.availableColors?.map((color, index) => (
            <OverlayTrigger
              key={color + index}
              overlay={
                <Tooltip>
                  {t("productDetails.productDescription.selectColor")} {color}
                </Tooltip>
              }
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
                      : "1px solid var(--focus-color)",
                  cursor: "pointer",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  position: "relative",
                  margin: 5,
                }}
                aria-label={`${t(
                  "productDetails.productDescription.selectColor"
                )} ${color}`}
                aria-pressed={indexColorClicked === index}
                type="button"
                role="listitem"
              >
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
        </Col>
      </Row>

      {/* Quantity */}
      <Row className="mb-2">
        <Col md="8" className="d-flex align-items-center">
          {/* Quantity and Stock Messages */}
          <div className="mb-0 d-flex align-items-center" aria-live="polite">
            <div className="card-item-text">
              {t("productDetails.productDescription.availableQuantity")}:{" "}
            </div>
            <span className="card-item-text-answer  d-flex align-items-center mb-0">
              {itemProduct?.quantity}
            </span>

            {itemProduct?.quantity === 0 && (
              <span
                style={{ color: "#b71c1c", fontWeight: "bold" }}
                role="alert"
                className="mx-2"
              >
                {t("productDetails.productDescription.outOfStock")}
              </span>
            )}
            {itemProduct?.quantity > 0 && itemProduct?.quantity <= 5 && (
              <span
                style={{ color: "#e65100", fontWeight: "bold" }}
                role="alert"
                className="mx-2"
              >
                {t("productDetails.productDescription.limitedStock")}
              </span>
            )}
          </div>
        </Col>
      </Row>

      {/* Specifications */}
      <Row className="mb-2">
        <Col md="10">
          <h2 className="card-item-text">
            {t("productDetails.productDescription.specifications")}:
          </h2>
        </Col>
        <Col md="10">
          <p className="card-item-text-answer">{itemProduct?.description}</p>
        </Col>
      </Row>

      {/* Price + Discount */}
      <Row>
        <Col xs={12} md="auto" className="mb-2 mb-md-0">
          <div className="product-price">
            {discountPercent > 0 ? (
              <>
                <span>{t("productDetails.productDescription.price")}:</span>
                <del>{formatCurrency(itemProduct.price)}</del>
                <span className="new-price">
                  {formatCurrency(itemProduct.priceAfterDiscount)}
                </span>
                <span className="discount-price">-{discountPercent}%</span>
              </>
            ) : (
              <>
                <span>{t("productDetails.productDescription.price")}:</span>
                <span className="card-item-text-answer">
                  {formatCurrency(itemProduct.price)}
                </span>
              </>
            )}
          </div>
        </Col>

        {/* Add to Cart */}
        <Col xs={12} md className="mt-2 mt-md-0">
          <OverlayTrigger
            placement="top"
            overlay={
              isAddDisabled ? (
                <Tooltip id="tooltip-disabled">
                  {itemProduct?.quantity === 0
                    ? t("productDetails.cart.tooltipOutOfStock")
                    : t("productDetails.cart.tooltipSelectColor")}
                </Tooltip>
              ) : (
                <></>
              )
            }
          >
            <span>
              <Button
                className="px-3 py-2 w-sm-100"
                disabled={isAddDisabled || isAdding}
                onClick={onAddToCart}
                variant="primary"
                aria-disabled={isAddDisabled || isAdding}
              >
                {isAdding ? (
                  <>
                    <SpinnerComponent
                      msg={t("productDetails.cart.addingToCart")}
                      size="sm"
                      className="mx-2"
                      as="span"
                    />
                    {t("productDetails.cart.addingToCart")}
                  </>
                ) : (
                  t("productDetails.cart.addToCart")
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
