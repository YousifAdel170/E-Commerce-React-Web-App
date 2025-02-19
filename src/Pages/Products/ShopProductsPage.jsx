import CategoryHeader from "../../Components/Category/CategoryHeader";
import SearchCountResult from "../../Components/Utility/SearchCountResult";
import { Col, Container, Row } from "react-bootstrap";
// import { Container } from "react-bootstrap";
import SideFilter from "../../Components/Utility/SideFilter";
import ProductCardContainer from "../../Components/Products/ProductCardContainer";
import PaginationComponent from "../../Components/Utility/PaginationComponent";
import ViewSearchProductHook from "../../hooks/products/ViewSearchProductHook";

const ShopProductsPage = () => {
  const [items] = ViewSearchProductHook();
  return (
    <div>
      <CategoryHeader />
      <Container>
        <SearchCountResult title={`هناك ${items.length} نتيجة بحث`} />
        <Row className="d-flex flex-row">
          <Col sm="2" xs="2" md="1" className="d-flex">
            <SideFilter />
          </Col>
          <Col sm="10" xs="10" md="11">
            <ProductCardContainer products={items} />
          </Col>
        </Row>
        <PaginationComponent />
      </Container>
    </div>
  );
};

export default ShopProductsPage;
