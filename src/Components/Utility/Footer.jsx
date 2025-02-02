import { Col, Container, Row } from "react-bootstrap";
import phone from "../../Assets/Imgs/phone.png";
import facebook from "../../Assets/Imgs/facebook.png";
import twitter from "../../Assets/Imgs/twitter.png";
import instagram from "../../Assets/Imgs/instagram.png";

const Footer = () => {
  return (
    <div
      className="footer-background footer mt-3 pt-2"
      style={{ maxHeight: "50px" }}
    >
      <Container>
        <Row className="d-flex justify-content-between align-items-center">
          <Col sm="6" className="d-flex align-items-center">
            <div className="footer-shroot">الشروط و الاحكام</div>
            <div className="footer-shroot mx-2">سياسة الخصوصية</div>
            <div className="footer-shroot mx-2">اتصل بنا</div>
          </Col>
          <Col sm="6" className="d-flex justify-content-end align-items-center">
            <div className="d-flex pt-3 mx-2">
              <img width="20px" height="20px" src={phone} alt="Phone Img" />
              <p className="footer-phone">0123456789</p>
            </div>
            <div style={{ cursor: "pointer" }}>
              <img
                width="20px"
                height="20px"
                src={facebook}
                alt="Facebook Img"
              />
            </div>
            <div style={{ cursor: "pointer" }}>
              <img width="20px" height="20px" src={twitter} alt="Twitter Img" />
            </div>
            <div style={{ cursor: "pointer" }}>
              <img
                width="20px"
                height="20px"
                src={instagram}
                alt="Instagram Img"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
