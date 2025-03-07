/* eslint-disable react/prop-types */
import { Button, Col, Modal, Row } from "react-bootstrap";

import ReactStars from "react-rating-stars-component";

import rate from "../../Assets/Imgs/rate.png";
import DeleteRateHook from "../../hooks/review/DeleteRateHook";

import deleteIcon from "../../assets/Imgs/delete.png";
import editIcon from "../../assets/Imgs/edit.png";
import { ToastContainer } from "react-toastify";
import UpdateRateHook from "../../hooks/review/UpdateRateHook";

export const RateItem = ({ review }) => {
  // DeleteRateHook is a custom hook that handles the deletion of a review
  const [
    isUser,
    handleShowDelete,
    handleDeleteClose,
    showDelete,
    handleDelete,
  ] = DeleteRateHook(review);

  const [
    newRateText,
    newRateValue,
    onChangeNewRateText,
    onChangeNewRateValue,
    handleShowEdit,
    handleCloseEdit,
    showEdit,
    handleUpdate,
  ] = UpdateRateHook(review);

  // Settings For Updated Rate
  const setting = {
    size: 20,
    count: 5,
    color: "#979797",
    activeColor: "#ffc107",
    value: newRateValue,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      onChangeNewRateValue(newValue);
    },
  };

  return (
    <div>
      {/* Delete Modal */}
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div className="font">تاكيد الحذف</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل انتا متاكد من حذف التقييم</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="font"
            variant="success"
            onClick={handleDeleteClose}
          >
            تراجع
          </Button>
          <Button className="font" variant="dark" onClick={handleDelete}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div className="font">تعديل التقييم</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactStars {...setting} />
          <input
            onChange={onChangeNewRateText}
            value={newRateText}
            type="text"
            className="font w-100"
            style={{ border: "none" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleCloseEdit}>
            تراجع
          </Button>
          <Button className="font" variant="dark" onClick={handleUpdate}>
            تعديل
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="mt-3">
        <Col className="d-flex me-5">
          <div className="rate-name  d-inline ms-2">
            {review ? review.user.name : null}
          </div>
          <img className="" src={rate} alt="" height="16px" width="16px" />
          <div className="cat-rate  d-inline me-2">
            {review ? review.rating : null}
          </div>
        </Col>
      </Row>

      <Row className="border-bottom mx-2">
        <Col className="d-flex me-4 pb-2 justify-content-between">
          <div className="rate-description  d-inline ms-2">
            {review ? review.review : null}
          </div>

          {isUser ? (
            <div className="d-inline d-flex ">
              <img
                src={deleteIcon}
                onClick={handleShowDelete}
                width="20"
                height="20"
                style={{ cursor: "pointer" }}
                alt="delete Icon"
              />
              <img
                src={editIcon}
                onClick={handleShowEdit}
                width="20"
                height="20"
                style={{ cursor: "pointer" }}
                alt="delete Icon"
              />
            </div>
          ) : null}
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};
