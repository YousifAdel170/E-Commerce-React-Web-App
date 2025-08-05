// Import Components and Libraries
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

// Import Custom Components
import InputField from "../../Components/Utility/InputField";

// Import Used Hooks from react-router-dom and react-i18next
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Custom Hooks
import LoginHook from "../../hooks/auth/LoginHook";

// Import Constants and Enums
import { INPUT_NAMES, INPUT_TYPES } from "../../constants/inputs";

// Import CSS Styles
import "./Auth.css";
import { ROUTES } from "../../constants/routes";

// Component responsible for rendering the Login Page
const LoginPage = () => {
  // Use the custom LoginHook to manage state and functionality
  const [
    email,
    password,
    isPress,
    onChangeInput,
    handleSubmit,
    handleGoogleLogin,
    isGoogleLogin,
  ] = LoginHook();

  // Use the translation hook for internationalization
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
            <h2>{t("login.title")}</h2>

            <Form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label htmlFor="formEmail">{t("login.email")}</Form.Label>
                <InputField
                  value={email}
                  onChangeInput={onChangeInput}
                  onChangeInputName={INPUT_NAMES.EMAIL}
                  type={INPUT_TYPES.EMAIL}
                  placeholder={t("login.emailPlaceholder")}
                  name={INPUT_NAMES.EMAIL}
                  id="formEmail"
                  required
                />
              </Form.Group>

              {/* Password + Forgot link */}
              <Form.Group className="mb-3">
                <Form.Label
                  htmlFor="formPassword"
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>{t("login.password")}</div>
                  <Link to={ROUTES.AUTH.FORGOT_PASSWORD}>
                    {t("login.forgotPassword")}
                  </Link>
                </Form.Label>
                <InputField
                  value={password}
                  onChangeInput={onChangeInput}
                  onChangeInputName={INPUT_NAMES.PASSWORD}
                  type={INPUT_TYPES.PASSWORD}
                  placeholder={t("login.passwordPlaceholder")}
                  name={INPUT_NAMES.PASSWORD}
                  id="formPassword"
                  required
                />
              </Form.Group>

              {/* Login Button */}
              <Button
                type="submit"
                className="submit-button w-100"
                disabled={isPress}
                aria-busy={isPress}
              >
                {isPress ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  t("login.loginButton")
                )}
              </Button>

              {/* Divider */}
              <hr className="my-3" />

              {/* Google Login */}
              <div className="google-auth-container d-block">
                <Button
                  onClick={handleGoogleLogin}
                  className="submit-button google-login-button w-100"
                  disabled={isGoogleLogin}
                  aria-busy={isGoogleLogin}
                >
                  {isGoogleLogin ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faGoogle} className="icon mx-2" />
                      {t("google.continueWithGoogle")}
                    </>
                  )}
                </Button>
                <p className="small text-center mt-2">
                  {t("google.googleNotice")}
                </p>
              </div>

              {/* Divider */}
              <hr className="my-3" />

              {/* Register link */}
              <div className="mt-3 text-center">
                <small>{t("login.dontHaveAccount")}</small>
                <Link to={ROUTES.AUTH.REGISTER} className="fw-bold mx-2">
                  {t("login.pressHere")}
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
