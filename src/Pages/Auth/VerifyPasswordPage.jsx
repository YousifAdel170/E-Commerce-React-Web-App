// pages/auth/VerifyPasswordPage.jsx

// Import Hook from react-i18next for translation
import { useTranslation } from "react-i18next";

// Import Components from react-bootstrap, framer-motion and react-toastify
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";

// Import Custom Hooks
import VerifyPasswordHook from "../../hooks/auth/VerifyPasswordHook";

// Import Custom CSS file
import "./Auth.css";

/**
 * VerifyPasswordPage Component
 *
 * Renders a user interface for entering and submitting
 * a 6-digit verification code sent via email.
 * Utilizes a custom hook for input management and submission.
 */
const VerifyPasswordPage = () => {
  // Destructure hook outputs:
  // codeDigits: array of digit strings, inputRefs: refs for input fields,
  // handlers for input change, key down, paste events, submit handler,
  // and loading state
  const [
    codeDigits,
    inputRefs,
    onInputChange,
    onKeyDown,
    onPaste,
    handleSubmit,
    isSubmitting,
  ] = VerifyPasswordHook();

  // Translation hook for multi-language support
  const { t } = useTranslation("auth");

  return (
    <Container fluid className="auth-container" style={{ flex: "1" }}>
      {/* Centered row */}
      <Row className="w-100 justify-content-center">
        {/* Responsive column sizes for different screen widths */}
        <Col xs={11} sm={10} md={6} lg={4}>
          {/* Animated wrapper using Framer Motion for smooth fade-in and slide-up */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="auth-form-wrapper"
          >
            {/* Page heading */}
            <h2 className="text-center">{t("verify.title")}</h2>

            {/* Form for verification code input */}
            <Form onSubmit={handleSubmit} noValidate>
              {/* Group of 6 individual digit inputs */}
              <Form.Group
                className="d-flex justify-content-center gap-2 mb-4"
                onPaste={onPaste} // Handle paste event for multiple digits
              >
                {codeDigits.map((value, idx) => (
                  <Form.Control
                    key={idx}
                    type="text"
                    inputMode="numeric" // Numeric keyboard on mobile
                    pattern="[0-9]*" // Restrict to digits
                    maxLength="1" // One digit per input
                    ref={(el) => (inputRefs.current[idx] = el)} // Manage focus programmatically
                    value={value}
                    onChange={(e) => onInputChange(e, idx)} // Handle digit input change
                    onKeyDown={(e) => onKeyDown(e, idx)} // Handle backspace/delete navigation
                    className="verify-code-input text-center"
                    aria-label={`Digit ${idx + 1}`} // Accessibility: label each input
                  />
                ))}
              </Form.Group>

              {/* Submit button with loading spinner during submission */}
              <Button
                type="submit"
                className="submit-button w-100"
                disabled={isSubmitting} // Disable while submitting
                aria-busy={isSubmitting} // Accessibility: indicate busy state
              >
                {isSubmitting ? (
                  <Spinner animation="border" size="sm" /> // Show spinner while waiting
                ) : (
                  t("verify.button") // Localized button text
                )}
              </Button>
            </Form>
          </motion.div>
        </Col>
      </Row>

      {/* Toast notifications container for success/error messages */}
      <ToastContainer />
    </Container>
  );
};

export default VerifyPasswordPage;
