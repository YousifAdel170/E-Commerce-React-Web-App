import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import ForgotPasswordHook from "../../hooks/auth/ForgotPasswordHook";
import InputField from "../../Components/Utility/InputField";
import "./Auth.css";

import { INPUT_TYPES, INPUT_NAMES } from "../../constants/inputs";

const ForgotPasswordPage = () => {
  const [onChangeEmail, email, handleSubmit, isPress] = ForgotPasswordHook();
  const { t } = useTranslation("auth");

  return (
    <Container fluid className="auth-container" style={{ flex: "1" }}>
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={10} md={6} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="auth-form-wrapper"
          >
            <h2 tabIndex={0}>{t("forgot.title")}</h2>

            <Form
              onSubmit={handleSubmit}
              noValidate
              aria-labelledby="form-title"
            >
              {/* Email Input */}
              <Form.Group className="mb-3" controlId="formForgotEmail">
                <Form.Label>{t("forgot.email")}</Form.Label>

                <InputField
                  value={email}
                  onChangeInput={(e) => onChangeEmail(e)}
                  onChangeInputType={INPUT_TYPES.EMAIL}
                  type={INPUT_TYPES.EMAIL}
                  placeholder={t("forgot.emailPlaceholder")}
                  name={INPUT_NAMES.EMAIL}
                  id="formForgotEmail"
                  required
                  aria-required="true"
                  aria-describedby="forgot-email-description"
                />
              </Form.Group>

              <Button
                type="submit"
                className="submit-button"
                disabled={isPress}
                aria-busy={isPress}
                aria-label={t("forgot.sendCodeButton")}
              >
                {isPress ? (
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  t("forgot.sendCodeButton")
                )}
              </Button>
            </Form>
          </motion.div>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default ForgotPasswordPage;
