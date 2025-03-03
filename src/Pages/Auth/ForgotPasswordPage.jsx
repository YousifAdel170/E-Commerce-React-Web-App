import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ForgotPasswordHook from "../../hooks/auth/ForgotPasswordHook";

const ForgotPasswordPage = () => {
  const [OnChangeEmail, email, handleSubmit] = ForgotPasswordHook();
  return (
    <Container style={{ minHeight: "690px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          {/* Label */}
          <label className="mx-auto title-login">نسيت كلمة السر</label>

          {/* Input For Email */}
          <input
            value={email}
            onChange={OnChangeEmail}
            placeholder="ادخل الايميل..."
            type="email"
            className="user-input my-3 text-center mx-auto"
          />

          {/* Button To Send The Code */}
          <button onClick={handleSubmit} className="btn-login mx-auto mt-2">
            ارسال الكود
          </button>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default ForgotPasswordPage;
