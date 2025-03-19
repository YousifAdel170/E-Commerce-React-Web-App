/* eslint-disable react/prop-types */
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartegoryCard = ({ background, img, title, id }) => {
  return (
    <Col
      xs="6"
      sm="6"
      md="4"
      lg="2"
      className="my-4 d-flex justify-content-around"
    >
      <div
        className="all-card mb-3"
        style={{ backgroundColor: `${background}` }}
      >
        <Link
          to={`/products/category/${id}`}
          style={{ textDecoration: "none" }}
        >
          <img src={img} className="categoty-card-img" alt="card-image" />
          <p className="categoty-card-text my-2">{title}</p>
        </Link>
      </div>
    </Col>
  );
};

export default CartegoryCard;
