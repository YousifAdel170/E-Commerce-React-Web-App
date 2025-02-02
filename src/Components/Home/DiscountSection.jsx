import { Col, Container, Row } from "react-bootstrap";
import laptop from "../../Assets/Imgs/laptops.png";
const DiscountSection = () => {
  return (
    <Container>
      <Row className="discount-backcolor mt-4 mx-2 d-flex text-center align-items-center">
        <Col sm="6">
          <div className="discount-title">
            خصم يصل حتي 30% علي اجهزة اللاب توب
          </div>
        </Col>
        <Col sm="6">
          <img className="discount-img" src={laptop} alt="" />
        </Col>
      </Row>
    </Container>
  );
};

export default DiscountSection;
