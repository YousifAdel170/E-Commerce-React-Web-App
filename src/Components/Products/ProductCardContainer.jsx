/* eslint-disable react/prop-types */
import { Container, Row } from "react-bootstrap";
import SubTitle from "../Utility/SubTitle";
import ProductCard from "./ProductCard";
import ProductCardContainerHook from "../../hooks/products/wishList/ProductCardContainerHook";

const ProductCardContainer = ({ title, btnTitle, path, products }) => {
  // console.log("Products", products);
  const [favoriteProducts] = ProductCardContainerHook();
  return (
    <Container>
      <SubTitle title={title} btnTitle={btnTitle} path={path} />
      <Row className="my-2 d-flex">
        {products
          ? products.map((item, index) => (
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

export default ProductCardContainer;
