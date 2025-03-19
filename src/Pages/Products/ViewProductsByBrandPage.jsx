import { Col, Container, Row } from "react-bootstrap";
import ProductCardContainer from "../../Components/Products/ProductCardContainer";
import PaginationComponent from "../../Components/Utility/PaginationComponent";
import ViewProductsByBrandHook from "../../hooks/products/ViewProductsByBrandHook";
import { useParams } from "react-router-dom";

const ViewProductsByBrandPage = () => {
  const { id } = useParams();
  const [items, pageCount, onPress] = ViewProductsByBrandHook(id);
  return (
    <div style={{ minHeight: "670px" }}>
      <Container>
        <Row className="d-flex flex-row">
          <Col sm="12">
            <ProductCardContainer products={items} title="" btntitle="" />
          </Col>

          {pageCount > 1 ? (
            <PaginationComponent pageCount={pageCount} onPress={onPress} />
          ) : null}
        </Row>
      </Container>
    </div>
  );
};

export default ViewProductsByBrandPage;
