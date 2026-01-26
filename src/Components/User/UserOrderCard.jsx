/* eslint-disable react/prop-types */

// Import layout components from React Bootstrap
import { Col, Row } from "react-bootstrap";

// Import base URL for product images
import { PRODUCTS_BASE_URL } from "../../config";

// Importing CSS for styling
import "../Admin/Admin.css";
import { useTranslation } from "react-i18next";

// Component to display a single item in a user's order
const UserOrderCard = ({ item }) => {
  const { t } = useTranslation("admin"); // Translation function for user namespace
  return (
    <Row className="d-flex my-2 justify-content-start">
      {/* Product Image */}
      <Col xs="3" md="2" className="d-flex mx-3 align-items-center">
        <img
          className="order-item-image"
          src={
            item?.product ? PRODUCTS_BASE_URL + item?.product?.imageCover : ""
          }
          alt={item?.product?.title}
        />
      </Col>

      {/* Product Details: Name, Rating, Quantity, Color */}
      <Col xs="8" md="6" className="d-flex flex-column">
        {/* Product Title */}
        <div className="d-flex align-items-center w-100 justify-content-start mb-1">
          <div className="order-item-text d-flex align-items-center mb-0">
            {t("order-details.items.item.title")}:
          </div>
          <div className="order-item-text-answer mx-2 mb-0">
            {item?.product?.title || 0}
          </div>
        </div>

        {/* Product Rating */}
        <div className="order-item-text-answer d-flex align-items-center w-100 justify-content-start mb-1">
          <div className="order-item-text d-flex align-items-center mb-0">
            {t("order-details.items.item.rate")}:{" "}
          </div>
          <div className="order-item-text-answer mx-2 mb-0">
            {item?.product?.ratingsQuantity || 0} (
            {t("order-details.items.item.rates")})
          </div>
        </div>

        {/* Quantity Ordered */}
        <div className="d-flex w-100 justify-content-start align-items-center mb-1">
          <div className="order-item-text d-flex align-items-center mb-0">
            {t("order-details.items.item.quantity")}:{" "}
          </div>
          <div className="order-item-text-answer mx-2 mb-0">
            {item?.count || 0}
          </div>
        </div>

        {/* Product Color */}
        {item?.color ? (
          <div className="d-flex w-100 justify-content-start align-items-center mb-1">
            <div className="order-item-text d-flex align-items-center mb-0">
              {t("order-details.items.item.colors")}:{" "}
            </div>
            <div
              className="color border mx-2"
              style={{
                backgroundColor: item ? item.color : "",
                cursor: "auto",
                width: "25px",
                height: "25px",
                borderRadius: "50%",
              }}
            ></div>
          </div>
        ) : (
          ""
        )}
      </Col>
    </Row>
  );
};

// Export the component
export default UserOrderCard;
