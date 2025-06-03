/* eslint-disable react/prop-types */

// Import necessary components from React Bootstrap and other assets
import { Col, Row } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

// Import Custom Hooks
import DeleteRateHook from "../../hooks/review/DeleteRateHook";
import UpdateRateHook from "../../hooks/review/UpdateRateHook";
import formatDate from "../../hooks/Utility/formatDate";

// Import Custom Styling
import "./RateModule.css";
import ModalComponent from "../Utility/ModalComponent";
import { deleteModal, editModal } from "../../data/utilities/modalMessages";
import { StarRating } from "../Utility/StartRating";

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

      {/* Delete Confirmation Modal */}
      <ModalComponent
        show={showDelete}
        handleClose={handleDeleteClose}
        handleOperation={handleDelete}
        modalTitle={deleteModal.modalTitle}
        modalBody={deleteModal.modalBody}
        modalFooter={deleteModal.modalFooter}
        className={deleteModal.className}
        ariaLabel={`Delete review of user: ${review?.user?.name}`}
      />

      {/* Edit Modal */}
      <ModalComponent
        show={showEdit}
        handleClose={handleCloseEdit}
        handleOperation={handleUpdate}
        modalTitle={editModal.modalTitle}
        modalBody={editModal.modalBody}
        modalFooter={editModal.modalFooter}
        className={editModal.className}
        ariaLabel={`Edit review of user: ${review?.user?.name}`}
      >
        {/* Star rating component to update the review rating */}
        <ReactStars {...setting} />
        {/* Input field to update the review text */}
        <input
          onChange={onChangeNewRateText}
          value={newRateText}
          type="text"
          className="font w-100 mt-2"
          style={{
            borderRadius: "4px",
            padding: "8px",
            outline: "none",
            border: "none",
          }}
          placeholder="اكتب التقييم هنا..."
          aria-label="Edit Review Text"
        />
      </ModalComponent>

      {/* Display the reviewer's name and rating */}
      <Row className="mt-2 px-3 border-top pt-3">
        <Col className="d-flex">
          <div className="d-flex">
            <div className="rate-name">{review?.user?.name || null}</div>

            <div className="d-flex">
              <StarRating rating={review?.rating} direction="rtl" />
              <div className="rate mx-2">{review?.rating}</div>
            </div>
          </div>
          <div className="rate-date">{formatDate(review?.createdAt)}</div>
        </Col>
      </Row>

      {/* Display the review description and action buttons (edit/delete) if the user is the author */}
      <Row>
        <Col className="d-flex me-4 justify-content-between">
          <div className="rate-description ms-2">{review?.review || null}</div>

          {/* Only show edit and delete options if the logged-in user is the author */}
          {isUser && (
            <div className="d-inline d-flex gap-2">
              <i
                className="fas fa-trash text-danger"
                style={{ cursor: "pointer" }}
                onClick={handleShowDelete}
                title="حذف التقييم"
                role="button"
                tabIndex={0}
              />
              <i
                className="fas fa-edit text-warning"
                style={{ cursor: "pointer" }}
                onClick={handleShowEdit}
                title="تعديل التقييم"
                role="button"
                tabIndex={0}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};
