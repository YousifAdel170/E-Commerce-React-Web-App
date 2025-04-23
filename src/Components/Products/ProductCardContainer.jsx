/* eslint-disable react/prop-types */

// Import Components from React bootstrap
import { Container, Row, Spinner } from "react-bootstrap";

// Import Custom Components
import SubTitle from "../Utility/SubTitle";
import ProductCard from "./ProductCard";

// Import Custom Hook to get the favorite products
import ViewAllWishListHook from "../../hooks/products/wishList/ViewAllWishListHook";

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
                key={index}
                item={item}
                favoriteProducts={favoriteProducts}
              />
            ))
          ) : (
            <h4>لا يوجد منتجات</h4>
          )
        ) : (
          <Spinner className="mx-auto" animation="border" variant="dark" />
        )}
      </Row>
    </Container>
  );
};

// Export the ProductCardContainer component as default
export default ProductCardContainer;
