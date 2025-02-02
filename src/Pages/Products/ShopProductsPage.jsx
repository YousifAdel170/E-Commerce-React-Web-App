import CategoryHeader from "../../Components/Category/CategoryHeader";
import SearchCountResult from "../../Components/Utility/SearchCountResult";
import { Col, Container, Row } from "react-bootstrap";
// import { Container } from "react-bootstrap";
import SideFilter from "../../Components/Utility/SideFilter";
import ProductCardContainer from "../../Components/Products/ProductCardContainer";
import PaginationComponent from "../../Components/Utility/PaginationComponent";

const ShopProductsPage = () => {
  return (
    <div>
      <CategoryHeader />
      <Container>
        <SearchCountResult title={"400 منتج متاح..."} />
        <Row className="d-flex flex-row">
          <Col sm="2" xs="2" md="1" className="d-flex">
            <SideFilter />
          </Col>
          <Col sm="10" xs="10" md="11">
            <ProductCardContainer />
          </Col>
        </Row>
        <PaginationComponent />
      </Container>
    </div>
  );
};

export default ShopProductsPage;
