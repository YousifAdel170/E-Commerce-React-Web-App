/* eslint-disable react/prop-types */

// Import necessary components from React Bootstrap and other assets
import { Button, Col, Modal, Row } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

// Import Custom Hooks
import DeleteRateHook from "../../hooks/review/DeleteRateHook";
import UpdateRateHook from "../../hooks/review/UpdateRateHook";
import formatDate from "../../hooks/Utility/formatDate";

// Import Used Assets
import rate from "../../Assets/Imgs/rate.png";
import deleteIcon from "../../assets/Imgs/delete.png";
import editIcon from "../../assets/Imgs/edit.png";

// Import Custom Styling
import "./RateModule.css";

// RateItem component for displaying individual review details
export const RateItem = ({ review, updateReviews, removeReview }) => {
  // Custom hook to manage the deletion of a review
  const [
    isUser,
    handleShowDelete,
    handleDeleteClose,
    showDelete,
    handleDelete,
  ] = DeleteRateHook(review, removeReview);

  // Custom hook to manage the update of a review
  const [
    newRateText,
    newRateValue,
    onChangeNewRateText,
    onChangeNewRateValue,
    handleShowEdit,
    handleCloseEdit,
    showEdit,
    handleUpdate,
  ] = UpdateRateHook(review, updateReviews);

  // Settings for the star rating component used for editing
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
      {/* Delete Modal for confirming review deletion */}
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header>
          <Modal.Title>
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

      {/* Edit Modal for updating the review */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تعديل التقييم</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Star rating component to update the review rating */}
          <ReactStars {...setting} />
          {/* Input field to update the review text */}
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

      {/* Display the reviewer's name and rating */}
      <Row className="mt-3">
        <Col className="d-flex me-5">
          <div className="d-flex">
            <div className="rate-name  d-inline ms-2">
              {review?.user?.name || null}
            </div>

            <div className="d-flex">
              <img className="" src={rate} alt="" height="16px" width="16px" />
              <div className="cat-rate me-1">{review?.rating || null}</div>
            </div>
          </div>
          <div className="rate-date">{formatDate(review?.createdAt)}</div>
        </Col>
      </Row>

      {/* Display the review description and action buttons (edit/delete) if the user is the author */}
      <Row className="border-bottom mx-2">
        <Col className="d-flex me-4 pb-2 justify-content-between">
          <div className="rate-description  d-inline ms-2">
            {review?.review || null}
          </div>

          {/* Only show edit and delete options if the logged-in user is the author */}
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
                alt="edit Icon"
              />
            </div>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};
