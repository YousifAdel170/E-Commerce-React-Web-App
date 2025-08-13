/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./ModalComponent.css";

const ModalComponent = ({
  show,
  handleClose,
  handleOperation,
  modalTitle,
  modalBody,
  modalFooter,
  className,
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
        <button onClick={handleOperation} className={`btn ${className}`}>
          {modalFooter}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
