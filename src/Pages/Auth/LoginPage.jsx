import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { EMAIL_TYPE, PASSWORD_TYPE } from "../../config";
import LoginHook from "../../hooks/auth/LoginHook";

const LoginPage = () => {
  const [email, password, loading, isPress, onChangeInput, handleSubmit] =
    LoginHook();
  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center">
        <Col sm="12" className="d-flex flex-column">
          <label className="mx-auto title-login">تسجيل الدخول</label>

          {/* Email */}
          <input
            value={email}
            onChange={(e) => onChangeInput(e, EMAIL_TYPE)}
            placeholder="الايميل ..."
            type="text"
            className="user-input my-3 text-center mx-auto"
          />

          {/* Password */}
          <input
            value={password}
            onChange={(e) => onChangeInput(e, PASSWORD_TYPE)}
            placeholder="كلمة السر ..."
            type="password"
            className="user-input text-center mx-auto"
          />

          {/* Login Button */}
          <button onClick={handleSubmit} className="btn-login mx-auto mt-4">
            تسجيل الدخول
          </button>
          <label className="mx-auto mt-4">
            ليس لديك حساب ؟{" "}
            <Link to={"/register"} style={{ textDecoration: "none" }}>
              <span style={{ cursor: "pointer" }} className="text-danger">
                اضغط هنا
              </span>
            </Link>
          </label>

          {/* Forgot Password */}
          <label className="mx-auto my-4">
            <Link
              to="/user/forgot-password"
              style={{ textDecoration: "none", color: "red" }}
            >
              هل نسيت كلمه السر
            </Link>
          </label>
        </Col>
      </Row>
      <Link to={"/admin/all-products"}>Admin</Link>
      <Link to={"/user/all-orders"} style={{ display: "block" }}>
        User
      </Link>

      {isPress && loading ? (
        <Spinner animation="border" role="status"></Spinner>
      ) : null}
      <ToastContainer />
    </Container>
  );
};

export default LoginPage;
