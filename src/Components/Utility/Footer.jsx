import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

// Hooks & Data
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";
import { footerData } from "../../data/utilities/footer";

// Styles
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation("utilities");

  const [textRef, textVisible] = useInviewAnimation();
  const [iconsRef, iconsVisible] = useInviewAnimation();

  const terms = t("footer.terms", { returnObjects: true });

  return (
    <footer role="contentinfo">
      <Container>
        <Row className="d-flex justify-content-between align-items-center">
          {/* Terms */}
          <Col
            className={`d-flex align-items-center footer-animate ${
              textVisible ? "fade-in" : ""
            }`}
            ref={textRef}
            aria-label="Footer Navigation"
          >
            {terms.map((term, index) => (
              <div
                className={`footer-text ${index !== 0 ? "mx-2" : ""}`}
                key={index}
              >
                {term}
              </div>
            ))}
          </Col>

          {/* Contact and Icons */}
          <Col className="footer-icons-container">
            <div
              className={`phone-container footer-animate ${
                iconsVisible ? "fade-in" : ""
              }`}
              ref={iconsRef}
              aria-label={t("footer.phoneLabel")}
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
                aria-label={t(item.altKey)}
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
