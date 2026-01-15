/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import UserDeleteAddressHook from "../../hooks/user/UserDeleteAddressHook";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";
import ModalComponent from "../Utility/ModalComponent";
import { useTranslation } from "react-i18next";

const UserAddressCard = ({ address, index }) => {
  const [show, handleClose, handleShow, handleDelete, isPress] =
    UserDeleteAddressHook(address);

  const [sectionRef, isVisible] = useInviewAnimation();
  const { t } = useTranslation("user");

  return (
    <div
      className={`card-container card-animate card-description-container box-shadow-lift flex-column my-3 justify-content-around ${
        isVisible ? "fade-in" : ""
      }`}
      ref={sectionRef}
      style={{ animationDelay: `${index * 0.1}s` }}
      role="region"
      aria-label={`${t("userAllAdresses.userAddressCard.ariaLabel")}: ${
        address?.alias
      }`}
    >
      {/* Delete Confirmation Modal */}
      <ModalComponent
        show={show}
        handleClose={handleClose}
        handleOperation={handleDelete}
        modalTitle={t("userAllAdresses.userAddressCard.modalTitle")}
        modalBody={t("userAllAdresses.userAddressCard.modalBody")}
        modalFooter={t("userAllAdresses.userAddressCard.modalFooter")}
        className="btn-danger"
        ariaLabel={t("userAllAdresses.userAddressCard.modalAriaLabel")}
        isPress={isPress}
      />

      {/* Top Row: Alias and Actions */}
      <Row className="d-flex justify-content-between px-2 w-100">
        <Col xs="6">
          <span className="card-item-text">
            {t("userAllAdresses.userAddressCard.alias")}:
          </span>
          <span className="card-item-text-answer">{address?.alias}</span>
        </Col>

        <Col xs="6" className="d-flex justify-content-end">
          <div className="d-flex gap-2 align-items-center mt-0 mb-0">
            <Link to={`/user/addresses/edit-address/${address?._id}`}>
              <i
                className="fas fa-edit mt-0 mb-0"
                title={t("userAllAdresses.userAddressCard.edit")}
                role="button"
                tabIndex={0}
                aria-label={t("userAllAdresses.userAddressCard.edit")}
              />
            </Link>

            <i
              className="fas fa-trash text-danger mt-0 mb-0"
              onClick={handleShow}
              title={t("userAllAdresses.userAddressCard.delete")}
              role="button"
              tabIndex={0}
              aria-label={t("userAllAdresses.userAddressCard.delete")}
            />
          </div>
        </Col>
      </Row>

      {/* Address Details */}
      <Row className="mt-2 px-2">
        <Col xs="12">
          <span className="card-item-text">
            {t("userAllAdresses.userAddressCard.details")}:
          </span>
          <span className="card-item-text-answer">{address?.details}</span>
        </Col>
      </Row>

      {/* Phone Section */}
      <Row className="mt-2 px-2">
        <Col xs="12" className="d-flex">
          <span className="card-item-text">
            {t("userAllAdresses.userAddressCard.phone")}:
          </span>
          <span className="card-item-text-answer mx-2">{address?.phone}</span>
        </Col>
      </Row>
    </div>
  );
};

export default UserAddressCard;
