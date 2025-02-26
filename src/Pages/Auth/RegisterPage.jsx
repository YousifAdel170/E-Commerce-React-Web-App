import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import RegisterHook from "../../hooks/auth/RegisterHook";
import {
  CONFIRMATION_PASSWORD_TYPE,
  EMAIL_TYPE,
  NAME_TYPE,
  PASSWORD_TYPE,
  PHONE_TYPE,
} from "../../config";
import { ToastContainer } from "react-toastify";

const RegisterPage = () => {
  const [
    name,
    email,
    phone,
    password,
    confirmationPassword,
    onChangeInput,
    handleSubmit,
  ] = RegisterHook();
  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center">
        <Col sm="12" className="d-flex flex-column">
          <label className="mx-auto title-login">تسجيل حساب جديد</label>
          {/* Username */}
          <input
            value={name}
            onChange={(e) => onChangeInput(e, NAME_TYPE)}
            placeholder="اسم المستخدم ..."
            type="text"
            className="user-input mt-3 text-center mx-auto"
          />

          {/* Email */}
          <input
            value={email}
            onChange={(e) => onChangeInput(e, EMAIL_TYPE)}
            placeholder="الايميل ..."
            type="text"
            className="user-input mt-3 text-center mx-auto"
          />

          {/* Phone */}
          <input
            value={phone}
            onChange={(e) => onChangeInput(e, PHONE_TYPE)}
            placeholder="رقم الهاتف  ..."
            type="tel"
            className="user-input text-center mt-3 mx-auto"
          />

          {/* Password */}
          <input
            value={password}
            onChange={(e) => onChangeInput(e, PASSWORD_TYPE)}
            placeholder="كلمة السر ..."
            type="password"
            className="user-input text-center my-3 mx-auto"
          />

          {/* Confirmation Password */}
          <input
            value={confirmationPassword}
            onChange={(e) => onChangeInput(e, CONFIRMATION_PASSWORD_TYPE)}
            placeholder=" تأكيد كلمة السر ..."
            type="password"
            className="user-input text-center mx-auto"
          />

          <button onClick={handleSubmit} className="btn-login mx-auto mt-4">
            تسجيل الحساب
          </button>
          <label className="mx-auto mt-4">
            لديك حساب بالفعل ؟{" "}
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <span style={{ cursor: "pointer" }} className="text-danger">
                اضغط هنا
              </span>
            </Link>
          </label>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default RegisterPage;
