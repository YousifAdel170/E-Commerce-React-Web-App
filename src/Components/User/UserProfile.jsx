// Import Components and Libraries
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

// Import Custom Components
import InputField from "../../Components/Utility/InputField";

// Import Custom Hook
import UserProfileHook from "../../hooks/user/UserProfileHook";
import { useTranslation } from "react-i18next";
import { INPUT_NAMES, INPUT_TYPES } from "../../constants/inputs";
import SpinnerComponent from "../Utility/SpinnerComponent";

const UserProfile = () => {
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
    isUserEditPress,
    isChangePasswordPress,
  ] = UserProfileHook();

  const { t } = useTranslation("user");

  return (
    <Container fluid className="auth-container" style={{ flex: 1 }}>
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={10} md={8} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="auth-form-wrapper"
          >
            {/* Title */}
            <h2>{t("userProfile.title")}</h2>

            {/* User Info Card */}
            <div className="auth-form-wrapper">
              {/* Name Row */}
              <Row className="align-items-center mb-2">
                <Col xs="6">
                  <strong>{t("userProfile.username")}:</strong>
                  <span
                    className="card-item-text-answer mx-2"
                    style={{ fontSize: "15px" }}
                  >
                    {user?.name}
                  </span>
                </Col>
                <Col xs="6" className="justify-content-end d-flex">
                  <Button size="sm" onClick={handleShow}>
                    <FontAwesomeIcon
                      title={t("userProfile.editButton")}
                      icon={faEdit}
                    />
                  </Button>
                </Col>
              </Row>

              {/* Phone Row */}
              <Row className="align-items-center mb-2">
                <Col>
                  <strong>{t("userProfile.phoneNumber")}:</strong>
                  <span
                    className="card-item-text-answer mx-2"
                    style={{ fontSize: "15px" }}
                  >
                    {user?.phone}
                  </span>
                </Col>
              </Row>

              {/* Email Row */}
              <Row className="align-items-center mb-2">
                <Col>
                  <strong>{t("userProfile.emailAddress")}:</strong>
                  <span
                    className="card-item-text-answer mx-2"
                    style={{ fontSize: "15px" }}
                  >
                    {user?.email}
                  </span>
                </Col>
              </Row>
            </div>

            <hr />

            {/* Change Password Section */}
            <div className="auth-form-wrapper">
              <h4 className="mb-3 text-center">
                {t("userProfile.changePassword")}
              </h4>

              {/* Current Password */}
              <Form.Group className="mb-3">
                <Form.Label
                  htmlFor="formCurrentPassword"
                  className="d-flex justify-content-between align-items-center"
                >
                  {t("userProfile.currentPasswordLabel")}
                </Form.Label>
                <InputField
                  value={currentPassword}
                  onChangeInput={onChangeCurrentPassword}
                  onChangeInputName={INPUT_NAMES.CURRENT_PASSWORD}
                  type={INPUT_TYPES.PASSWORD}
                  placeholder={t("userProfile.currentPasswordPlaceholder")}
                  name={INPUT_NAMES.CURRENT_PASSWORD}
                  id="formCurrentPassword"
                  required
                />
              </Form.Group>

              {/* New Password */}
              <Form.Group className="mb-3">
                <Form.Label
                  htmlFor="formNewPassword"
                  className="d-flex justify-content-between align-items-center"
                >
                  {t("userProfile.newPasswordLabel")}
                </Form.Label>
                <InputField
                  value={password}
                  onChangeInput={onChangePassword}
                  onChangeInputName={INPUT_NAMES.NEW_PASSWORD}
                  type={INPUT_TYPES.PASSWORD}
                  placeholder={t("userProfile.newPasswordPlaceholder")}
                  name={INPUT_NAMES.NEW_PASSWORD}
                  id="formNewPassword"
                  required
                />
              </Form.Group>

              {/* Confirm New Password */}
              <Form.Group className="mb-3">
                <Form.Label
                  htmlFor="formConfirmNewPassword"
                  className="d-flex justify-content-between align-items-center"
                >
                  {t("userProfile.confirmNewPasswordLabel")}
                </Form.Label>
                <InputField
                  value={passwordConfirm}
                  onChangeInput={onChangePasswordConfirm}
                  onChangeInputName={INPUT_NAMES.CONFIRM_NEW_PASSWORD}
                  type={INPUT_TYPES.PASSWORD}
                  placeholder={t("userProfile.confirmNewPasswordPlaceholder")}
                  name={INPUT_NAMES.CONFIRM_NEW_PASSWORD}
                  id="formConfirmNewPassword"
                  required
                />
              </Form.Group>

              <div className="text-center mt-3">
                <Button
                  onClick={changePasswordSubmit}
                  disabled={isChangePasswordPress}
                >
                  {" "}
                  {isChangePasswordPress ? (
                    <SpinnerComponent className={"mx-2"} size={"sm"} />
                  ) : (
                    ""
                  )}
                  {t("userProfile.saveChangesButton")}
                </Button>
              </div>
            </div>

            {/* Edit Profile Modal */}
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header>
                <Modal.Title>{t("userProfile.modal.title")}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label
                    htmlFor="formUsername"
                    className="d-flex justify-content-between align-items-center"
                  >
                    {t("userProfile.modal.nameLabel")}
                  </Form.Label>
                  <InputField
                    value={name}
                    onChangeInput={onChangeName}
                    onChangeInputName={INPUT_NAMES.NAME}
                    type={INPUT_TYPES.TEXT}
                    placeholder={t("userProfile.modal.userNamePlaceholder")}
                    name={INPUT_NAMES.NAME}
                    id="formUsername"
                    required
                  />
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label
                    htmlFor="formEmail"
                    className="d-flex justify-content-between align-items-center"
                  >
                    {t("userProfile.modal.emailLabel")}
                  </Form.Label>
                  <InputField
                    value={email}
                    onChangeInput={onChangeEmail}
                    onChangeInputName={INPUT_NAMES.EMAIL}
                    type={INPUT_TYPES.EMAIL}
                    placeholder={t("userProfile.modal.emailPlaceholder")}
                    name={INPUT_NAMES.EMAIL}
                    id="formEmail"
                    required
                  />
                </Form.Group>

                {/* Phone Number */}
                <Form.Group className="mb-3">
                  <Form.Label
                    htmlFor="formPhone"
                    className="d-flex justify-content-between align-items-center"
                  >
                    {t("userProfile.modal.phoneLabel")}
                  </Form.Label>
                  <InputField
                    value={phone}
                    onChangeInput={onChangePhone}
                    onChangeInputName={INPUT_NAMES.PHONE}
                    type={INPUT_TYPES.PHONE}
                    placeholder={t("userProfile.modal.phonePlaceholder")}
                    name={INPUT_NAMES.PHONE}
                    id="formPhone"
                    required
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  {t("userProfile.modal.closeButton")}
                </Button>
                <Button onClick={handleSubmit} disabled={isUserEditPress}>
                  {" "}
                  {isUserEditPress ? (
                    <SpinnerComponent className={"mx-2"} size={"sm"} />
                  ) : (
                    ""
                  )}
                  {t("userProfile.modal.saveButton")}
                </Button>
              </Modal.Footer>
            </Modal>
          </motion.div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default UserProfile;
