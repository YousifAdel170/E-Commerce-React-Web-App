/* eslint-disable react/prop-types */

// Import Components from React bootstrap, React Router DOM
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import Toastify for notifications
import { ToastContainer } from "react-toastify";

// Import Custom Components to display the product card
import ProductCardHook from "../../hooks/products/wishList/ProductCardHook";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";

// Import Custom CSS
import "./ProductCard.css";
import { StarRating } from "../Utility/StartRating";

// Component responsible for displaying a single product card
const ProductCard = ({ item, favoriteProducts, index }) => {
  // Custom Hook to handle the favorite products
  const [
    favImage,
    discountAmount,
    discountPercent,
    animateFav,
    onFavClick,
    handleAnimationEnd,
  ] = ProductCardHook(item, favoriteProducts);

  const [sectionRef, isVisible] = useInviewAnimation();

  return (
    <Col xs="12" sm="6" md="4" lg="3">
      {/* Card Component from React Bootstrap that contains The Image of the Product */}
      <Card
        className={`my-2 product-card ${isVisible ? "fade-in" : ""}`}
        tabIndex={0}
        aria-labelledby={`product-title-${item?._id}`}
        role="group"
        style={{
          animationDelay: `${index * 0.1}s`,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
        ref={sectionRef}
      >
        <Link to={`/products/${item?._id}`}>
          <div className="image-container" aria-hidden="true">
            {/* Discount badge shown if discount exists */}
            {(discountPercent > 0 || discountAmount > 0) && (
              <span
                className="discount-badge"
                aria-label={`خصم ${
                  discountPercent
                    ? discountPercent + "%"
                    : discountAmount + " جنيه"
                }`}
                role="note"
                tabIndex={-1}
              >
                {discountPercent
                  ? ` ${discountPercent}%`
                  : `خصم ${discountAmount} جنيه`}
              </span>
            )}

            {/* Product image with fallback on error */}
            <Card.Img
              src={item?.imageCover}
              alt={`Image of ${item?.title}`}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-image.png";
              }}
            />
          </div>
        </Link>

        <Card.Body className="px-3 pb-3 product-card-description">
          {/* Title of the Product */}
          <Card.Title
            id={`product-title-${item?._id}`}
            className="product-title d-flex justify-content-between align-items-center w-100"
          >
            <div className="card-title">{item?.title}</div>
            {/* Favorite Button */}
            <img
              src={favImage}
              onClick={onFavClick}
              onAnimationEnd={handleAnimationEnd}
              alt="Favorite Button"
              className={`fav-icon ${animateFav ? "animate" : ""}`}
              style={{ cursor: "pointer" }}
            />
          </Card.Title>

          {/* Description of the Product */}
          <div className="d-flex justify-content-between align-items-center w-100">
            {/* Display rating stars */}
            <StarRating rating={item?.ratingsAverage || 0} />

            {/* Show price with discount if available */}
            <div className="price-container">
              {item?.priceAfterDiscount ? (
                <>
                  <span className="price-discounted">
                    {item?.priceAfterDiscount} جنيه
                  </span>
                  <del aria-label={`Original price ${item?.price} جنيه`}>
                    {item?.price} جنيه
                  </del>
                </>
              ) : (
                <span>{item?.price} جنيه</span>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Col>
  );
};

export default ProductCard;
