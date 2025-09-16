/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./ModalComponent.css";
import SpinnerComponent from "./SpinnerComponent";

const ModalComponent = ({
  show,
  handleClose,
  handleOperation,
  modalTitle,
  modalBody,
  modalFooter,
  className,
  isPress,
  children,
}) => {
  const { t } = useTranslation("utilities");
  return (
    <Modal className="modal-container" show={show} onHide={handleClose}>
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title">{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        {modalBody}
        {children}
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <button onClick={handleClose} className="btn btn-secondary">
          {t("modal.cancel")}
        </button>
        <button
          onClick={handleOperation}
          disabled={isPress}
          className={`btn ${className}`}
        >
          {isPress ? <SpinnerComponent className={"mx-2"} size={"sm"} /> : ""}
          {modalFooter}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
