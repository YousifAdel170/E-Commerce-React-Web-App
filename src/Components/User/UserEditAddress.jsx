import { Col, Form, Row, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import InputField from "../Utility/InputField";
import UserEditAddressHook from "../../hooks/user/UserEditAddressHook";
import { INPUT_NAMES, INPUT_TYPES } from "../../constants/inputs";
import SpinnerComponent from "../Utility/SpinnerComponent";

import { useParams } from "react-router-dom";

const UserEditAddress = () => {
  const { id } = useParams();

  const [
    alias,
    details,
    phone,
    onChangeAlias,
    onChangeDetails,
    onChangePhone,
    handleEdit,
    isPress,
  ] = UserEditAddressHook(id);

  const { t } = useTranslation("user");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-100"
    >
      {/* Title */}
      <Row className="mb-4">
        <Col>
          <h3 className="title-text">
            {t("userAllAdresses.userEditAddress.title")}
          </h3>
        </Col>
      </Row>

      {/* Form (FULL WIDTH) */}
      <Row className="auth-form-wrapper">
        <Col xs={12}>
          {/* Alias */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="formAlias">
              {t("userAllAdresses.userEditAddress.aliasLabel")}
            </Form.Label>
            <InputField
              value={alias}
              onChangeInput={onChangeAlias}
              onChangeInputName={INPUT_NAMES.ADDRESSES.ALIAS}
              type={INPUT_TYPES.TEXT}
              placeholder={t(
                "userAllAdresses.userEditAddress.aliasPlaceholder"
              )}
              name={INPUT_NAMES.ADDRESSES.ALIAS}
              id="formAlias"
              className="w-100"
              required
            />
          </Form.Group>

          {/* Details */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="formDetails">
              {t("userAllAdresses.userEditAddress.detailsLabel")}
            </Form.Label>
            <InputField
              value={details}
              onChangeInput={onChangeDetails}
              onChangeInputName={INPUT_NAMES.ADDRESSES.DETAILS}
              type={INPUT_TYPES.TEXTAREA}
              placeholder={t(
                "userAllAdresses.userEditAddress.detailsPlaceholder"
              )}
              name={INPUT_NAMES.ADDRESSES.DETAILS}
              id="formDetails"
              rows={4}
              required
            />
          </Form.Group>

          {/* Phone */}
          <Form.Group className="mb-4">
            <Form.Label htmlFor="formPhone">
              {t("userAllAdresses.userEditAddress.phoneLabel")}
            </Form.Label>
            <InputField
              value={phone}
              onChangeInput={onChangePhone}
              onChangeInputName={INPUT_NAMES.ADDRESSES.PHONE}
              type={INPUT_TYPES.PHONE}
              placeholder={t(
                "userAllAdresses.userEditAddress.phonePlaceholder"
              )}
              name={INPUT_NAMES.ADDRESSES.PHONE}
              id="formPhone"
              required
            />
          </Form.Group>

          {/* Submit */}
          <div className="d-flex justify-content-end">
            <Button onClick={handleEdit} disabled={isPress}>
              {isPress && <SpinnerComponent size="sm" className="mx-2" />}
              {t("userAllAdresses.userEditAddress.submit")}
            </Button>
          </div>
        </Col>
      </Row>

      <ToastContainer />
    </motion.div>
  );
};

export default UserEditAddress;
