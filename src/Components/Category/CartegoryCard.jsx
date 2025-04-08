/* eslint-disable react/prop-types */

// Import Compontents from React Bootstrap and React Router Dom
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import Custom CSS File
import "./CartegoryCard.css";

// Component Responsible for displaying the Specific Category Card
const CartegoryCard = ({ background, img, title, id }) => {
  return (
    <Col
      xs="6"
      sm="6"
      md="4"
      lg="2"
      className="my-4 d-flex justify-content-around mx-auto"
    >
      <div
        className="category-card"
        style={{ backgroundColor: `${background}` }}
      >
        <Link to={`/products/category/${id}`}>
          <img
            src={img}
            className="categoty-card-img"
            alt={`Image of ${title} `}
            title={`Image of ${title} `}
          />
          <p className="categoty-card-text my-2">{title}</p>
        </Link>
      </div>
    </Col>
  );
};

export default CartegoryCard;
