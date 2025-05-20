/* Importing necessary components from react-bootstrap */
import { Button, Col, Modal, Row } from "react-bootstrap";

/* Importing ToastContainer for displaying toast notifications */
import { ToastContainer } from "react-toastify";

/* Importing custom hook for managing user profile data */
import UserProfileHook from "../../hooks/user/UserProfileHook";

/* Importing delete icon for UI */
import deleteIcon from "../../assets/Imgs/delete.png";

const UserProfile = () => {
  /* Destructuring values and handlers from custom hook */
  const [
    user,
    show,
    handleClose,
    handleShow,
    handleSubmit,
    name,
    email,
    phone,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    changePasswordSubmit,
    currentPassword,
    password,
    passwordConfirm,
    onChangeCurrentPassword,
    onChangePassword,
    onChangePasswordConfirm,
  ] = UserProfileHook();

  return (
    <div>
      {/* Modal for editing user data */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تعديل البيانات الشخصية</div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Username input field */}
          <input
            value={name}
            onChange={onChangeName}
            type="text"
            className="input-form font d-block mt-3 px-3"
            placeholder="اسم المستخدم"
          />
          {/* Email input field */}
          <input
            value={email}
            onChange={onChangeEmail}
            type="email"
            className="input-form font d-block mt-3 px-3"
            placeholder="الايميل"
          />
          {/* Phone input field */}
          <input
            value={phone}
            onChange={onChangePhone}
            type="phone"
            className="input-form font d-block mt-3 px-3"
            placeholder="الهاتف"
          />
        </Modal.Body>

        <Modal.Footer>
          {/* Cancel button */}
          <Button className="font" variant="success" onClick={handleClose}>
            تراجع
          </Button>
          {/* Save changes button */}
          <Button className="font" variant="dark" onClick={handleSubmit}>
            حفظ التعديل
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Title of the User Profile */}
      <div className="title-text">الصفحه الشخصية</div>

      {/* User Info Card */}
      <div className="user-address-card px-2">
        {/* User Name with Edit Icon */}
        <Row className="d-flex justify-content-between pt-2">
          <Col xs="6" className="d-flex align-items-center">
            <div className="ms-2 px-2">الاسم:</div>
            <div className="item-delete-edit">{user?.name}</div>
          </Col>

          <Col xs="6" className="d-flex justify-content-end">
            {/* Edit user profile */}
            <div
              onClick={handleShow}
              className="d-flex align-items-center mx-2"
            >
              <img
                alt="edit"
                className="ms-1"
                src={deleteIcon}
                height="17px"
                width="15px"
              />
              <p className="item-delete-edit align-items-center d-flex">
                {" "}
                تعديل
              </p>
            </div>
          </Col>
        </Row>

        {/* User Phone */}
        <Row className="px-2">
          <Col xs="12" className="d-flex align-items-center">
            <div className="ms-2">رقم الهاتف:</div>
            <div className="item-delete-edit">{user?.phone}</div>
          </Col>
        </Row>

        {/* User Email */}
        <Row className="px-2">
          <Col xs="12" className="d-flex align-items-center">
            <div className="ms-2">الايميل:</div>
            <div className="item-delete-edit">{user?.email}</div>
          </Col>
        </Row>

        {/* Change Password Section */}
        <Row className="mt-4">
          <Col xs="10" sm="8" md="6">
            <div className="title-text">تغير كملة المرور</div>

            {/* Current Password input field */}
            <input
              type="password"
              value={currentPassword}
              onChange={onChangeCurrentPassword}
              className="input-form d-block mt-2 px-3"
              placeholder="ادخل كلمة المرور القديمة"
            />
            {/* New Password input field */}
            <input
              type="password"
              value={password}
              onChange={onChangePassword}
              className="input-form d-block mt-3 px-3"
              placeholder="ادخل كلمة المرور الجديده"
            />
            {/* Confirm New Password input field */}
            <input
              type="password"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
              className="input-form d-block mt-3 px-3"
              placeholder="تاكيد كلمة المرور الجديدة"
            />
          </Col>
        </Row>

        {/* Save Password Button */}
        <Row>
          <Col
            xs="10"
            sm="8"
            md="6"
            className="d-flex justify-content-end mb-3"
          >
            <button
              onClick={changePasswordSubmit}
              className="btn-save d-inline mt-2"
            >
              حفظ كلمة السر
            </button>
          </Col>
        </Row>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
