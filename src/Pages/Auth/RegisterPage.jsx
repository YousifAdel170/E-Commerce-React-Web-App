import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import classNames from "classnames";

import InputField from "../../Components/Utility/InputField";
import RegisterHook from "../../hooks/auth/RegisterHook";
import { inputsData } from "../../data/inputs";

import "react-phone-input-2/lib/style.css";
import "./Auth.css";

import { INPUT_NAMES } from "../../constants/inputs";
import { EMPTY } from "../../constants/general";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { ROUTES } from "../../constants/routes";

const RegisterPage = () => {
  const [
    name,
    email,
    phone,
    password,
    confirmationPassword,
    onChangeInput,
    handleSubmit,
    loading,
    onChangePhone,
    passwordRules,
    googleLogin,
    isGoogleLogin,
  ] = RegisterHook();

  const { t } = useTranslation("auth");

  const formData = inputsData(
    name,
    email,
    password,
    confirmationPassword,
    EMPTY.TEXT,
    t
  ).filter((input) => input.name !== INPUT_NAMES.PHONE);

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
            <h2 className="text-center">{t("register.title")}</h2>

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

              <Form.Group controlId="form-phone" className="mb-3">
                <Form.Label>{t("register.phone")}</Form.Label>
                <PhoneInput
                  country={"eg"}
                  value={phone}
                  onChange={onChangePhone}
                  inputProps={{
                    name: INPUT_NAMES.PHONE,
                    required: true,
                    className: classNames("user-input"),
                    placeholder: "e.g. +20 100 123 4567",
                  }}
                  dropdownStyle={{ maxHeight: "200px", overflowY: "auto" }}
                />
              </Form.Group>

              {/* Password Rules */}
              <Form.Group className="password-rules-container">
                <Form.Label className="fw-bold">
                  {t("register.passwordRulesTitle")}
                </Form.Label>
                <ul className="password-rules-list" aria-live="polite">
                  <li className={passwordRules.minLength ? "valid" : "invalid"}>
                    <span>{passwordRules.minLength ? "✔️" : "❌"}</span>
                    {t("passwordRules.minLength")}
                  </li>
                  <li
                    className={passwordRules.hasLowerCase ? "valid" : "invalid"}
                  >
                    <span>{passwordRules.hasLowerCase ? "✔️" : "❌"}</span>
                    {t("passwordRules.hasLowerCase")}
                  </li>
                  <li
                    className={passwordRules.hasUpperCase ? "valid" : "invalid"}
                  >
                    <span>{passwordRules.hasUpperCase ? "✔️" : "❌"}</span>
                    {t("passwordRules.hasUpperCase")}
                  </li>
                  <li className={passwordRules.hasNumber ? "valid" : "invalid"}>
                    <span>{passwordRules.hasNumber ? "✔️" : "❌"}</span>
                    {t("passwordRules.hasNumber")}
                  </li>
                  <li
                    className={
                      passwordRules.hasSpecialChar ? "valid" : "invalid"
                    }
                  >
                    <span>{passwordRules.hasSpecialChar ? "✔️" : "❌"}</span>
                    {t("passwordRules.hasSpecialChar")}
                  </li>
                </ul>
              </Form.Group>

              {/* Submit Register Button */}
              <Button
                type="submit"
                className="submit-button mt-3"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  t("register.registerButton")
                )}
              </Button>

              {/* Divider */}
              <hr className="m-3" />

              {/* Google Auth Button */}
              <div className="google-auth-container mb-2">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    googleLogin();
                  }}
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
              </div>

              <p className="small google-pargraph text-center my-2">
                {t("google.googleNotice")}
              </p>

              {/* Divider */}
              <hr className="m-3" />

              {/* Link to login */}
              <div className="text-center">
                <small>{t("register.alreadyHaveAccount")}</small>
                <Link to={ROUTES.AUTH.LOGIN} className="fw-bold mx-2">
                  {t("register.pressHere")}
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

export default RegisterPage;
