/* eslint-disable react/prop-types */

// Imports
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProductCardHook from "../../hooks/products/wishList/ProductCardHook";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

import "./ProductCard.css";
import { StarRating } from "../Utility/StartRating";

const ProductCard = ({ item, favoriteProducts, index }) => {
  // Custom Hook for favorites and animations
  const [
    ,
    // favImage is not needed now
    discountAmount,
    discountPercent,
    animateFav,
    onFavClick,
    handleAnimationEnd,
  ] = ProductCardHook(item, favoriteProducts);

  // Animation + in-view hook
  const [sectionRef, isVisible] = useInviewAnimation();

  // Check if this item is favorited
  const isFavorited = favoriteProducts.some((p) => p._id === item._id);

  return (
    <Col xs="12" sm="6" md="4" lg="3">
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

            <Card.Img
              src={item?.imageCover}
              alt={`Image of ${item?.title}`}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-image.png";
              }}
            />

            <div
              className="image-overlay"
              aria-label={`Product info for ${item?.title}`}
            >
              <div className="product-title" id={`product-title-${item?._id}`}>
                {item?.title}

                <span
                  role="button"
                  tabIndex={0}
                  aria-pressed={isFavorited}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent link navigation on click
                    onFavClick();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onFavClick();
                    }
                  }}
                  className={`fav-icon ${animateFav ? "animate" : ""}`}
                  onAnimationEnd={handleAnimationEnd}
                  style={{ cursor: "pointer", marginLeft: 8 }}
                  title={
                    isFavorited ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <FontAwesomeIcon
                    icon={isFavorited ? solidHeart : regularHeart}
                    color={isFavorited ? "#facc15" : "#ffffff"}
                    size="lg"
                  />
                </span>
              </div>

              <div className="rating-price">
                <StarRating rating={item?.ratingsAverage || 0} />

                <div className="price-container">
                  {item?.priceAfterDiscount ? (
                    <>
                      <span className="price-discounted">
                        {item?.priceAfterDiscount}
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
            </div>
          </div>
        </Link>
      </Card>

      <ToastContainer />
    </Col>
  );
};

export default ProductCard;
