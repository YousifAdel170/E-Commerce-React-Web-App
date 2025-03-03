import VerifyPasswordHook from "../../hooks/auth/VerifyPasswordHook";
import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const VerifyPasswordPage = () => {
  const [code, onChangeCode, handleSubmit] = VerifyPasswordHook();
  return (
    <Container style={{ minHeight: "690px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">
            ادخل الكود المرسل فى الايميل
          </label>

          <input
            value={code}
            onChange={onChangeCode}
            placeholder="ادخل الكود..."
            type="email"
            className="user-input my-3 text-center mx-auto"
          />

          <button onClick={handleSubmit} className="btn-login mx-auto mt-2">
            تاكيد
          </button>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default VerifyPasswordPage;
