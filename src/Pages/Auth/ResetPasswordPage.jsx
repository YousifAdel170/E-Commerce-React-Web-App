import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ResetPasswordHook from "../../hooks/auth/ResetPasswordHook";

const ResetPasswordPage = () => {
  const [
    password,
    confirmPassword,
    onChangePassword,
    onChangeConfirmPassword,
    handleSubmit,
  ] = ResetPasswordHook();
  return (
    <Container style={{ minHeight: "690px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">ادخل كلمه السر الجديده</label>

          <input
            value={password}
            onChange={onChangePassword}
            placeholder="ادخل كلمه السر الجديدة"
            type="password"
            className="user-input my-3 text-center mx-auto"
          />
          <input
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            placeholder="تاكيد كلمه السر الجديدة"
            type="password"
            className="user-input my-3 text-center mx-auto"
          />

          <button onClick={handleSubmit} className="btn-login mx-auto mt-2">
            حفظ
          </button>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default ResetPasswordPage;
