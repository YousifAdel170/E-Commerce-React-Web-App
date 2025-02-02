import CategoryHeader from "../../Components/Category/CategoryHeader";
import { Container } from "react-bootstrap";
import ProductDetails from "../../Components/Products/ProductDetails";
import RateContainer from "../../Components/Rate/RateContainer";
import ProductCardContainer from "../../Components/Products/ProductCardContainer";

const ProductDetailsPage = () => {
  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryHeader />
      <Container>
        <ProductDetails />
        <RateContainer />
        <ProductCardContainer title="منتجات قد تعجبك" />
      </Container>
    </div>
  );
};

export default ProductDetailsPage;
