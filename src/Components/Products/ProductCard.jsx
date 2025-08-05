/* eslint-disable react/prop-types */

// Imports
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

import ProductCardHook from "../../hooks/products/wishList/ProductCardHook";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";

import { StarRating } from "../Utility/StartRating";
import { useTranslation } from "react-i18next";

import "./ProductCard.css";

const ProductCard = ({ item, favoriteProducts, index }) => {
  const { t } = useTranslation("home");

  const [
    favIcon,
    discountAmount,
    discountPercent,
    animateFav,
    onFavClick,
    handleAnimationEnd,
    isFavLoading,
  ] = ProductCardHook(item, favoriteProducts);

  const [sectionRef, isVisible] = useInviewAnimation();

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
        <Link
          to={`/products/${item?._id}`}
          aria-label={t("productCardAriaLabel", { title: item?.title })}
        >
          <div className="image-container" aria-hidden="true">
            {(discountPercent > 0 || discountAmount > 0) && (
              <span
                className="discount-badge"
                role="note"
                tabIndex={-1}
                aria-label={t("productDiscountAriaLabel", {
                  percent: discountPercent,
                  amount: discountAmount,
                })}
              >
                {discountPercent > 0
                  ? t("productDiscountLabelPercent", {
                      percent: discountPercent,
                    })
                  : t("productDiscountLabelAmount", {
                      amount: discountAmount,
                    })}
              </span>
            )}

            <Card.Img
              src={item?.imageCover}
              alt={t("productImageAlt", { title: item?.title })}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-image.png";
              }}
            />

            <div className="image-overlay">
              <div
                className="product-title"
                id={`product-title-${item?._id}`}
                aria-level={3}
              >
                {item?.title}

                <span
                  role="button"
                  tabIndex={0}
                  aria-pressed={favIcon}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!isFavLoading) {
                      onFavClick();
                    }
                  }}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && !isFavLoading) {
                      e.preventDefault();
                      onFavClick();
                    }
                  }}
                  className={`fav-icon ${animateFav ? "animate" : ""}`}
                  onAnimationEnd={handleAnimationEnd}
                  style={{
                    cursor: isFavLoading ? "not-allowed" : "pointer",
                    pointerEvents: isFavLoading ? "none" : "auto",
                    opacity: isFavLoading ? 0.5 : 1,
                    marginLeft: 8,
                  }}
                  title={
                    favIcon
                      ? t("removeFromFavorites", { title: item?.title })
                      : t("addToFavorites", { title: item?.title })
                  }
                >
                  <FontAwesomeIcon
                    icon={favIcon ? solidHeart : regularHeart}
                    className={`favorite-icon ${favIcon ? "favorited" : ""}`}
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
                        {t("discountedPrice", {
                          price: item?.priceAfterDiscount,
                          currency: t("currency"),
                        })}
                      </span>
                      <del
                        aria-label={t("originalPrice", {
                          price: item?.price,
                          currency: t("currency"),
                        })}
                      >
                        {item?.price} {t("currency")}
                      </del>
                    </>
                  ) : (
                    <span>
                      {t("normalPrice", {
                        price: item?.price,
                        currency: t("currency"),
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    </Col>
  );
};

export default ProductCard;
