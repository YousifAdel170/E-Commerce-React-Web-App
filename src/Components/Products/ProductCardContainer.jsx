/* eslint-disable react/prop-types */

// Import Components from React bootstrap
import { Container, Row, Spinner } from "react-bootstrap";

// Import Custom Components
import SubTitle from "../Utility/SubTitle";
import ProductCard from "./ProductCard";

// Import Custom Hook to get the favorite products
import ViewAllWishListHook from "../../hooks/products/wishList/ViewAllWishListHook";
import { useTranslation } from "react-i18next";

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

  return (
    //  Main Container of the Product Card
    <Container>
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
            <h4>{t("homeThereIsNoMostSold")}</h4>
          )
        ) : (
          <Spinner
            className="mx-auto"
            animation="border"
            variant="dark"
            role="status"
            aria-label={t("homeLoadingProductsAriaLabel")}
          />
        )}
      </Row>
    </Container>
  );
};

// Export the ProductCardContainer component as default
export default ProductCardContainer;
