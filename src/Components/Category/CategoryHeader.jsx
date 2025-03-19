import { Col, Container, Row } from "react-bootstrap";
import AllCategoryPageHook from "../../hooks/category/AllCategoryPageHook";
import { Link } from "react-router-dom";

const CategoryHeader = () => {
  const [categories] = AllCategoryPageHook();

  return (
    <div className="cat-header">
      <Container>
        <Row>
          <Col className="d-flex justify-content-start py-2 flex-wrap">
            {categories
              ? categories.slice(0, 5).map((category) => (
                  <Link
                    key={category._id}
                    to={`/products/category/${category._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div key={category._id} className="cat-text-header">
                      {category.name}
                    </div>
                  </Link>
                ))
              : null}
            <Link to={"/all-categories"} style={{ textDecoration: "none" }}>
              <div className="cat-text-header">المزيد</div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryHeader;
