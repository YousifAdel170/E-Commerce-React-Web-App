/* eslint-disable react/prop-types */

// Import Components from React bootstrap
import { Container, Row } from "react-bootstrap";

// Import Custom Components
import SubTitle from "../Utility/SubTitle";
import ProductCard from "./ProductCard";

// Import Custom Hook to get the favorite products
import ProductCardContainerHook from "../../hooks/products/wishList/ProductCardContainerHook";

// Component responsible for displaying the product cards in a container
const ProductCardContainer = ({ title, btnTitle, path, products }) => {
  // Custom Hook to get the favorite products
  const [favoriteProducts] = ProductCardContainerHook();
  return (
    //  Main Container of the Product Card
    <Container>
      {/* SubTitle Component */}
      <SubTitle title={title} btnTitle={btnTitle} path={path} />
      <Row className="my-2 d-flex">
        {/* Map through the products and display each product card */}
        {products
          ? products.map((item, index) => (
              // Check if the product is in the favorite products list
              <ProductCard
                key={index}
                item={item}
                favoriteProducts={favoriteProducts}
              />
            ))
          : null}
      </Row>
    </Container>
  );
};

// Export the ProductCardContainer component as default
export default ProductCardContainer;
