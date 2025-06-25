/* eslint-disable react/prop-types */

// Import Components from React bootstrap
import { Container, Row, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

// Import Custom Components
import SubTitle from "../Utility/SubTitle";
import ProductCard from "./ProductCard";

// Import Custom Hook to get the favorite products
import ViewAllWishListHook from "../../hooks/products/wishList/ViewAllWishListHook";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// Component responsible for displaying the product cards in a container
const ProductCardContainer = ({
  title,
  btnTitle,
  path,
  products,
  isLoading,
}) => {
  // Custom Hook to get the favorite products
  const [favoriteProducts] = ViewAllWishListHook();

  const { t } = useTranslation("home");

  // Generate unique ID for the region/section label
  const sectionId = `product-section-title-${title
    ?.replace(/\s+/g, "-")
    .toLowerCase()}`;

  const isDark = useSelector((state) => state.ui.isDark);
  const spinnerVariant = isDark ? "light" : "dark";

  return (
    //  Main Container of the Product Card
    <Container role="region" aria-labelledby={sectionId}>
      {/* SubTitle Component */}
      <SubTitle title={title} btnTitle={btnTitle} path={path} />
      {/* Check if the products exist */}
      <Row className="my-2 d-flex">
        {/* Map through the products and display each product card */}
        {!isLoading ? (
          products ? (
            products.map((item, index) => (
              // Check if the product is in the favorite products list
              <ProductCard
                key={item?._id}
                item={item}
                favoriteProducts={favoriteProducts}
                index={index}
              />
            ))
          ) : (
            <h4
              className="text-center w-100"
              role="note"
              aria-live="polite"
              style={{
                fontSize: "1.1rem",
                padding: "1rem",
              }}
            >
              {t("homeThereIsNoMostSold")}
            </h4>
          )
        ) : (
          <Spinner
            className="mx-auto"
            animation="border"
            variant={spinnerVariant}
            role="status"
            aria-label={t("homeLoadingProductsAriaLabel")}
          />
        )}
      </Row>
      <ToastContainer />
    </Container>
  );
};

// Export the ProductCardContainer component as default
export default ProductCardContainer;
