/* Importing necessary components from react-bootstrap and react-router */
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

/* Importing Toast container for notifications */
import { ToastContainer } from "react-toastify";

/* Importing custom hook for login logic */
import LoginHook from "../../hooks/auth/LoginHook";

/* Importing form input configurations and reusable input field component */
import { loginData } from "../../constants/login";
import InputField from "../../Components/Utility/InputField";

// Component to handle login page UI and logic
const LoginPage = () => {
  // Destructuring states and functions from custom login hook
  const [email, password, , isPress, onChangeInput, handleSubmit] = LoginHook();

  // Set language for placeholder text (currently Arabic)
  const language = "ar";

  // Preparing form input fields using current values
  const formData = loginData(email, password);

  // JSX returned for rendering the login page
  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center">
        <Col sm="12" className="d-flex flex-column">
          {/* Login page title */}
          <label className="mx-auto title-login">تسجيل الدخول</label>

          {/* Dynamically render input fields using loginData config */}
          {formData.map((input, index) => (
            <InputField
              key={index}
              value={input?.value}
              onChangeInput={onChangeInput}
              onChangeInputType={input.onChangeInputType}
              placeholder={input?.placeholder[language]}
              type={input?.type}
              className={input?.className}
            />
          ))}

          {/* Login button to trigger submission */}
          <button onClick={handleSubmit} className="btn-login mx-auto mt-3">
            تسجيل الدخول
          </button>

          {/* Redirect to register page if user does not have an account */}
          <label className="mx-auto mt-3">
            ليس لديك حساب ؟{" "}
            <Link to={"/register"}>
              <span className="text-danger">اضغط هنا</span>
            </Link>
          </label>

          {/* Link to forgot password page */}
          <label className="mx-auto mt-3">
            <Link to="/user/forgot-password" style={{ color: "red" }}>
              هل نسيت كلمه السر
            </Link>
          </label>
        </Col>

        <Col className="d-flex justify-content-center mt-4">
          {/* Show spinner while waiting for login request */}
          {isPress ? <Spinner animation="border" variant="dark" /> : null}
        </Col>
      </Row>

      {/* Toast notifications container */}
      <ToastContainer />
    </Container>
  );
};

export default LoginPage; // Exporting component for use in router or parent component
