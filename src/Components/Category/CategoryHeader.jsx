// Import Components from React Bootstrap
import { Col, Container, Row } from "react-bootstrap";

// Import Link from React Router DOM
import { Link } from "react-router-dom";

// Import custom hook to fetch categories
import AllCategoryPageHook from "../../hooks/category/AllCategoryPageHook";

// Import CSS styles
import "./CategoryHeader.css";

// Component Responsible for displaying the header of categories
const CategoryHeader = () => {
  // Fetch categories using custom hook
  const [categories] = AllCategoryPageHook();

  return (
    <div className="cat-header">
      <Container>
        <Row>
          <Col className="d-flex justify-content-start py-2 flex-wrap">
            {categories?.slice(0, 5).map((category) => (
              <Link
                key={category._id}
                to={`/products/category/${category._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="cat-text-header">{category.name}</div>
              </Link>
            ))}
            <Link to="/all-categories" style={{ textDecoration: "none" }}>
              <div className="cat-text-header">المزيد</div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryHeader;
