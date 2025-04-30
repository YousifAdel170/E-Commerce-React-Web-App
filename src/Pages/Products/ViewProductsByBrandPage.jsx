// Import layout components from react-bootstrap
import { Col, Container, Row } from "react-bootstrap";

// Import custom components for displaying products and pagination
import ProductCardContainer from "../../Components/Products/ProductCardContainer";
import PaginationComponent from "../../Components/Utility/PaginationComponent";

// Import custom hook to get products by brand
import ViewProductsByBrandHook from "../../hooks/products/ViewProductsByBrandHook";

// Import useParams to get brand ID from the URL
import { useParams } from "react-router-dom";

// Component to display products filtered by brand
const ViewProductsByBrandPage = () => {
  // Extract the brand ID from the route parameters
  const { id } = useParams();

  // Use custom hook to get products, page count, pagination handler, and brand name
  const [items, pageCount, onPress, brandName] = ViewProductsByBrandHook(id);

  return (
    <div style={{ minHeight: "670px" }}>
      <Container>
        <Row className="d-flex flex-row">
          <Col sm="12">
            {/* Display product cards with brand name in title */}
            <ProductCardContainer
              products={items}
              title={`منتجات من الماركة ${brandName || ""}`}
              btntitle=""
            />
          </Col>

          {/* Show pagination only if there's more than one page */}
          {pageCount > 1 ? (
            <PaginationComponent pageCount={pageCount} onPress={onPress} />
          ) : null}
        </Row>
      </Container>
    </div>
  );
};

export default ViewProductsByBrandPage;
