/* eslint-disable react/prop-types */

// Import Components from React bootstrap
import { Container, Row } from "react-bootstrap";

// Import Custom Components
import SubTitle from "../Utility/SubTitle";
import ProductCard from "./ProductCard";
import ItemsNotFound from "../Utility/ItemsNotFound";
import SpinnerComponent from "../Utility/SpinnerComponent";

// Import Hooks
import { useTranslation } from "react-i18next";

// Component responsible for displaying the product cards in a container
const ProductCardContainer = ({
  title,
  btnTitle,
  path,
  products,
  isLoading,
}) => {
  const { t } = useTranslation("home");

  // Generate unique ID for the region/section label
  const sectionId = `product-section-title-${title
    ?.replace(/\s+/g, "-")
    .toLowerCase()}`;

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
                key={index}
                item={item}
                index={index}
              />
            ))
          ) : (
            // If no products found, display ItemsNotFound component
            <ItemsNotFound
              msg={
                title === t("homeMostSoldTitle")
                  ? t("homeThereIsNoMostSold")
                  : t("homeThereIsNoNewest")
              }
            />
          )
        ) : (
          // If loading, display SpinnerComponent
          <SpinnerComponent msg={t("homeLoadingProductsAriaLabel")} />
        )}
      </Row>
    </Container>
  );
};

// Export the ProductCardContainer component as default
export default ProductCardContainer;
