/* eslint-disable react/prop-types */
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const BrandCard = ({ img, id }) => {
  return (
    <Col
      xs="6"
      sm="6"
      md="4"
      lg="2"
      className="d-flex my-2 justify-content-center"
    >
      <Card
        style={{
          width: "100%",
          height: "151px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#fff",
        }}
        className="my-1"
      >
        <Link to={`/products/brands/${id}`} style={{ textDecoration: "none" }}>
          <Card.Img style={{ height: "151px", width: "100%" }} src={img} />
        </Link>
      </Card>
    </Col>
  );
};

export default BrandCard;
