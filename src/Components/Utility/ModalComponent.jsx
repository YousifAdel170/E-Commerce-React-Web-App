/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";

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
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="font">{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="font">
        {modalBody}
        {children}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleClose} className="font btn btn-secondary">
          اغلاق
        </button>
        <button onClick={handleOperation} className={`font btn ${className}`}>
          {modalFooter}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
