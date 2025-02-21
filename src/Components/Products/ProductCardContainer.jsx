/* eslint-disable react/prop-types */
import { Container, Row } from "react-bootstrap";
import SubTitle from "../Utility/SubTitle";
import ProductCard from "./ProductCard";

const ProductCardContainer = ({ title, btnTitle, path, products }) => {
  return (
    <Container>
      <SubTitle title={title} btnTitle={btnTitle} path={path} />
      <Row className="my-2 d-flex">
        {products
          ? products.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))
          : null}
      </Row>
    </Container>
  );
};

export default ProductCardContainer;
