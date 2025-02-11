/* eslint-disable react/prop-types */
import { Card, Col } from "react-bootstrap";

const BrandCard = ({ img }) => {
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
        <Card.Img style={{ height: "151px", width: "100%" }} src={img} />
      </Card>
    </Col>
  );
};

export default BrandCard;
