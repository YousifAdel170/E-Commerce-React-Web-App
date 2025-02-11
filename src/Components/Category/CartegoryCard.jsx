/* eslint-disable react/prop-types */
import { Col } from "react-bootstrap";

const CartegoryCard = ({ background, img, title }) => {
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
        <img src={img} className="categoty-card-img" alt="card-image" />
        <p className="categoty-card-text my-2">{title}</p>
      </div>
    </Col>
  );
};

export default CartegoryCard;
