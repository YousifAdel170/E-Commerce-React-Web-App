// Import components from react-bootstrap, react-toastify
import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

// Import Custom Components
import InputField from "../../Components/Utility/InputField";

// Import Hooks From react-router-dom
import { Link } from "react-router-dom";

// Import Custom Hook
import RegisterHook from "../../hooks/auth/RegisterHook";

// Import Constant Data
import { registerData } from "../../data/auth/register";

const RegisterPage = () => {
  // Destructure state and handlers from custom hook
  const [
    name,
    email,
    phone,
    password,
    confirmationPassword,
    onChangeInput,
    handleSubmit,
    error,
  ] = RegisterHook();

  // Current language to use for placeholders
  const language = "ar";

  // Handle The Register Form
  const formData = registerData(
    name,
    email,
    phone,
    password,
    confirmationPassword,
    error
  );

  return (
    // Container ensures horizontal padding and center alignment, responsive across breakpoints
    <Container style={{ flex: "1" }}>
      {/* Bootstrap row for vertical spacing and centering content */}
      <Row className="py-5 d-flex justify-content-center">
        {/* Column spanning 100% width on small screens (sm="12") 
            and using flex layout for vertical stacking of children */}
        <Col sm="12" className="d-flex flex-column">
          {/* Page title centered horizontally */}
          <label className="mx-auto title-login">تسجيل حساب جديد</label>

          {/* Dynamically render input fields using registerScripts config */}
          {formData.map((input, index) => (
            <InputField
              key={index}
              value={input?.value}
              onChangeInput={onChangeInput}
              onChangeInputType={input.onChangeInputType}
              placeholder={input?.placeholder[language]}
              type={input?.type}
              className={input?.className}
              error={input.error}
            />
          ))}

          {/* Submit Button - centered and with top margin */}
          <button onClick={handleSubmit} className="btn-login mx-auto mt-3">
            تسجيل الحساب
          </button>

          {/* Redirect link for users who already have an account */}
          <label className="mx-auto mt-3">
            لديك حساب بالفعل ؟{" "}
            <Link to={"/login"}>
              <span className="text-danger">اضغط هنا</span>
            </Link>
          </label>
        </Col>
      </Row>

      {/* Toast notifications container to show success/error messages */}
      <ToastContainer />
    </Container>
  );
};

export default RegisterPage;
