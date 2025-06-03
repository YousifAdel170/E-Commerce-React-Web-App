/* eslint-disable react/prop-types */

// Import Components from React Bootstrap and React Router Dom
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import Custom Hooks for in-view animation
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";

// Import Custom CSS
import "./CartegoryCard.css";

const CartegoryCard = ({ background, img, title, id, index }) => {
  const [sectionRef, isVisible] = useInviewAnimation();

  return (
    <Col
      xs="6"
      sm="6"
      md="4"
      lg="2"
      className="my-4 d-flex justify-content-around mx-auto"
    >
      <div
        className={`category-card ${isVisible ? "fade-in" : ""}`}
        style={{
          backgroundColor: background,
          animationDelay: `${index * 0.1}s`,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
        ref={sectionRef}
      >
        <Link to={`/products/category/${id}`} className="category-link">
          <img
            src={img}
            className="category-card-img"
            alt={`Category: ${title}`}
          />
          <p className="category-card-text">{title}</p>
        </Link>
      </div>
    </Col>
  );
};

export default CartegoryCard;
