// Import Bootstrap layout components
import { Col, Container, Row } from "react-bootstrap";

// Import custom components
import ProductCardContainer from "../../Components/Products/ProductCardContainer";
import PaginationComponent from "../../Components/Utility/PaginationComponent";

// Import custom hook to get products by category
import ViewProductsByCategoryHook from "../../hooks/products/ViewProductsByCategoryHook";

// Import to get category ID from URL params
import { useParams } from "react-router-dom";

// Page to display all products under a specific category
const ViewProductsByCategoryPage = () => {
  // Get the category ID from URL
  const { id } = useParams();

  // Destructure data from custom hook (items, page count, pagination handler, category name)
  const [items, pageCount, onPress, categoryName] =
    ViewProductsByCategoryHook(id);

  return (
    <div style={{ minHeight: "670px" }}>
      <Container>
        <Row className="d-flex flex-row">
          <Col sm="12">
            {/* Display products in a container */}
            <ProductCardContainer
              products={items}
              title={`منتجات من التصنيف ${categoryName || ""}`}
              btnTitle=""
            />
          </Col>

          {/* Show pagination only if there are multiple pages */}
          {pageCount > 1 ? (
            <PaginationComponent pageCount={pageCount} onPress={onPress} />
          ) : null}
        </Row>
      </Container>
    </div>
  );
};

export default ViewProductsByCategoryPage;
