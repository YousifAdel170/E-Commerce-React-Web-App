import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

import ResetPasswordHook from "../../hooks/auth/ResetPasswordHook";
import { useTranslation } from "react-i18next";

import "./Auth.css";
import { inputsData } from "../../data/inputs";
import InputField from "../../Components/Utility/InputField";

const ResetPasswordPage = () => {
  const [
    password,
    confirmPassword,
    onChangeInput,
    handleSubmit,
    passwordRules,
    isPress,
  ] = ResetPasswordHook();

  const { t } = useTranslation("auth");

  const formData = inputsData("", "", password, confirmPassword, "", t).filter(
    (input) => input.name !== "name" && input.name !== "email"
  );

  return (
    <Container fluid className="auth-container" style={{ flex: "1" }}>
      <Row className="w-100 justify-content-center py-5">
        <Col xs={11} sm={10} md={6} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="auth-form-wrapper"
          >
            <h2 className="text-center mb-4">{t("reset.title")}</h2>

            <Form onSubmit={handleSubmit} noValidate>
              {formData.map((input, index) => (
                <Form.Group
                  controlId={`form-${input.name}`}
                  className="mb-3"
                  key={index}
                >
                  <Form.Label>{input.label}</Form.Label>
                  <InputField
                    value={input.value}
                    onChangeInput={onChangeInput}
                    onChangeInputName={input.onChangeInputName}
                    placeholder={input.placeholder}
                    type={input.type}
                    name={input.name}
                    className={input.className}
                    required={input.required}
                    error={input.error}
                  />
                </Form.Group>
              ))}

              <Button
                type="submit"
                className="submit-button w-100"
                disabled={isPress}
                aria-busy={isPress}
              >
                {isPress ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  t("reset.submitButton")
                )}
              </Button>

              <Form.Group className="mt-3 password-rules-container">
                <Form.Label className="fw-bold">
                  {t("register.passwordRulesTitle")}
                </Form.Label>
                <ul className="password-rules-list" aria-live="polite">
                  <li className={passwordRules.minLength ? "valid" : "invalid"}>
                    <span aria-hidden="true">
                      {passwordRules.minLength ? "✔️" : "❌"}
                    </span>
                    {t("passwordRules.minLength")}
                  </li>
                  <li
                    className={passwordRules.hasLowerCase ? "valid" : "invalid"}
                  >
                    <span aria-hidden="true">
                      {passwordRules.hasLowerCase ? "✔️" : "❌"}
                    </span>
                    {t("passwordRules.hasLowerCase")}
                  </li>
                  <li
                    className={passwordRules.hasUpperCase ? "valid" : "invalid"}
                  >
                    <span aria-hidden="true">
                      {passwordRules.hasUpperCase ? "✔️" : "❌"}
                    </span>
                    {t("passwordRules.hasUpperCase")}
                  </li>
                  <li className={passwordRules.hasNumber ? "valid" : "invalid"}>
                    <span aria-hidden="true">
                      {passwordRules.hasNumber ? "✔️" : "❌"}
                    </span>
                    {t("passwordRules.hasNumber")}
                  </li>
                  <li
                    className={
                      passwordRules.hasSpecialChar ? "valid" : "invalid"
                    }
                  >
                    <span aria-hidden="true">
                      {passwordRules.hasSpecialChar ? "✔️" : "❌"}
                    </span>
                    {t("passwordRules.hasSpecialChar")}
                  </li>
                </ul>
              </Form.Group>
            </Form>
          </motion.div>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default ResetPasswordPage;
