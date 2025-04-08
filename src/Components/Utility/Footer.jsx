// Import Components from react-bootstrap
import { Col, Container, Row } from "react-bootstrap";

// Import The Used Assets
import phone from "../../Assets/Imgs/phone.png";
import facebook from "../../Assets/Imgs/facebook.png";
import twitter from "../../Assets/Imgs/twitter.png";
import instagram from "../../Assets/Imgs/instagram.png";

// Import The Used CSS
import "./Footer.css";

// Component responsible for displaying the footer of the web Application
const Footer = () => {
  return (
    <div
      className="footer w-100 bg-white mt-3 py-2"
      style={{ maxHeight: "50px" }}
    >
      <Container>
        <Row className="d-flex justify-content-between align-items-center">
          {/* Display The Text of The Footer */}
          <Col sm="6" className="d-flex align-items-center">
            <div className="footer-text">الشروط و الاحكام</div>
            <div className="footer-text mx-2">سياسة الخصوصية</div>
            <div className="footer-text mx-2">اتصل بنا</div>
          </Col>

          {/* Icons of the footer */}
          <Col sm="6" className="d-flex justify-content-end align-items-center">
            <div className="d-flex mx-2 align-items-center">
              <img src={phone} alt="Phone Icon" />
              <p className="footer-text m-0">0123456789</p>
            </div>
            <div>
              <img src={facebook} alt="Facebook Icon" />
            </div>
            <div>
              <img src={twitter} alt="Twitter Icon" />
            </div>
            <div>
              <img src={instagram} alt="Instagram Icon" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
