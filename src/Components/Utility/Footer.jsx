// Import Components from react-bootstrap
import { Col, Container, Row } from "react-bootstrap";

// Import Constants
import { footerData } from "../../constants/footer";

// Import The Used CSS
import "./Footer.css";

// Component responsible for displaying the footer of the web Application
const Footer = () => {
  const language = "ar";
  return (
    <div
      className="footer w-100 bg-white mt-3 py-2"
      style={{ maxHeight: "50px" }}
    >
      <Container>
        <Row className="d-flex justify-content-between align-items-center">
          {/* Display The Text of The Footer */}
          <Col sm="6" className="d-flex align-items-center">
            {footerData.terms.map((term, index) => (
              <div className={`footer-text ${term.className}`} key={index}>
                {term.name[language]}
              </div>
            ))}
          </Col>

          {/* Icons of the footer */}
          <Col sm="6" className="d-flex justify-content-end align-items-center">
            {/* Phone */}
            <div className="d-flex mx-2 align-items-center">
              <img src={footerData.phone.image} alt={footerData.phone.alt} />
              <p className="footer-text m-0">{footerData.phone.number}</p>
            </div>
            {/* Icons */}
            {footerData.icons.map((icon, index) => (
              <div key={index}>
                <img src={icon.image} alt={icon.alt} />
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
