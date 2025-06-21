import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginHook from "../../hooks/auth/LoginHook";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { EMAIL_TYPE, PASSWORD_TYPE } from "../../constants/inputTypes";

import InputField from "../../Components/Utility/InputField";

const isDark = false; // Replace with dynamic theme if needed

const LoginPage = () => {
  const [email, password, , isPress, onChangeInput, handleSubmit] = LoginHook();
  const { t } = useTranslation("auth");

  const backgroundColor = isDark ? "#1f1f1f" : "#ffffff";
  const containerColor = isDark ? "#121212" : "#f0f0f0";
  const textColor = isDark ? "#ffffff" : "#000000";

  return (
    <Container
      fluid
      className={`d-flex align-items-center justify-content-center ${
        isDark ? "dark-theme" : "light-theme"
      }`}
      style={{ flex: "1", backgroundColor: containerColor }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={10} md={6} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              backgroundColor,
              borderRadius: "12px",
              padding: "30px",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
              color: textColor,
            }}
          >
            <h2 className="text-center mb-4">{t("title")}</h2>
            <Form onSubmit={handleSubmit}>
              {/* Email Field (you can optionally replace with InputField) */}
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label style={{ color: textColor }}>
                  {t("email")}
                </Form.Label>

                <InputField
                  value={email}
                  onChangeInput={onChangeInput}
                  onChangeInputType={EMAIL_TYPE}
                  type={EMAIL_TYPE}
                  placeholder={t("emailPlaceholder")}
                  name={EMAIL_TYPE}
                  required
                  isDark={isDark}
                />
              </Form.Group>

              {/* Password Field using your custom InputField with show/hide */}
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label style={{ color: textColor }}>
                  {t("password")}
                </Form.Label>

                <InputField
                  value={password}
                  onChangeInput={onChangeInput}
                  onChangeInputType={PASSWORD_TYPE}
                  placeholder={t("passwordPlaceholder")}
                  type={PASSWORD_TYPE}
                  required
                  isDark={isDark}
                />
              </Form.Group>

              <Button
                variant="danger"
                type="submit"
                className="w-100 fw-bold py-2"
                style={{ fontSize: "1.1rem", borderRadius: "6px" }}
                disabled={isPress}
              >
                {isPress ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  t("loginButton")
                )}
              </Button>

              <div className="mt-3 text-center">
                <small>{t("dontHaveAccount")}</small>
                <Link
                  to="/register"
                  className="fw-bold mx-2"
                  style={{ color: isDark ? "#ffc107" : "#0d6efd" }}
                >
                  {t("pressHere")}
                </Link>
              </div>

              <div className="mt-2 text-center">
                <Link
                  to="/user/forgot-password"
                  style={{
                    color: isDark ? "#b0bec5" : "#b0bec5",
                    textDecoration: "underline",
                    fontStyle: "italic",
                  }}
                  className="forgot-password-link"
                >
                  {t("forgotPassword")}
                </Link>
              </div>
            </Form>
          </motion.div>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default LoginPage;
