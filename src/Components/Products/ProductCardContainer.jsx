import { Container, Row } from "react-bootstrap";
import SubTitle from "../Utility/SubTitle";
import ProductCard from "./ProductCard";

const ProductCardContainer = ({ title, btnTitle, path }) => {
  return (
    <Container>
      <SubTitle title={title} btnTitle={btnTitle} path={path} />
      <Row className="my-2 d-flex justify-content-between">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Row>
    </Container>
  );
};

export default ProductCardContainer;
