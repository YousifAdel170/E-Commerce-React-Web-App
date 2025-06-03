// Import Components
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Custom Hooks
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";

// Import Constants
import { footerData } from "../../data/utilities/footer";

// Import The Used CSS
import "./Footer.css";

const Footer = () => {
  const language = "ar";
  const [textRef, textVisible] = useInviewAnimation();
  const [iconsRef, iconsVisible] = useInviewAnimation();

  return (
    <footer>
      <Container>
        <Row className="d-flex justify-content-between align-items-center">
          {/* Footer Text Terms */}
          <Col
            className={`d-flex align-items-center footer-animate ${
              textVisible ? "fade-in" : ""
            }`}
            ref={textRef}
          >
            {footerData.terms.map((term, index) => (
              <div className={`footer-text ${term.className}`} key={index}>
                {term.name[language]}
              </div>
            ))}
          </Col>

          {/* Footer Icons */}
          <Col className="footer-icons-container">
            {/* Phone */}
            <div
              className={`phone-container footer-animate ${
                iconsVisible ? "fade-in" : ""
              }`}
              ref={iconsRef}
            >
              <FontAwesomeIcon
                icon={footerData.phone.icon}
                className="phone-icon"
                size="lg"
              />
              <p className="footer-text mb-0 me-2">{footerData.phone.number}</p>
            </div>

            {/* Social Icons */}
            {footerData.icons.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.alt}
                className="mx-2 d-flex align-items-center justify-content-center social-icon"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  size="lg"
                  className={`${iconsVisible ? "fade-in" : ""}`}
                />
              </a>
            ))}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
