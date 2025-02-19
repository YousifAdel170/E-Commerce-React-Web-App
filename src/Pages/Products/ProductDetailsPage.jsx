import CategoryHeader from "../../Components/Category/CategoryHeader";
import { Container } from "react-bootstrap";
import ProductDetails from "../../Components/Products/ProductDetails";
import RateContainer from "../../Components/Rate/RateContainer";
import ProductCardContainer from "../../Components/Products/ProductCardContainer";
import ViewProductDetailsHook from "../../hooks/products/ViewProductDetailsHook";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const [, , , , prodouctsLikeSample] = ViewProductDetailsHook(id);

  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryHeader />
      <Container>
        <ProductDetails />
        <RateContainer />
        <ProductCardContainer
          products={prodouctsLikeSample}
          title="منتجات قد تعجبك"
        />
      </Container>
    </div>
  );
};

export default ProductDetailsPage;
