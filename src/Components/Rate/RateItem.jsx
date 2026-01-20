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
import { StarRating } from "../Utility/StartRating";
import { useTranslation } from "react-i18next";
import useIsReviewOwner from "../../hooks/review/useIsReviewOwnerHook";

// RateItem component for displaying individual review details
export const RateItem = ({ review }) => {
  // Custom hook to manage the deletion of a review
  const [
    handleShowDelete,
    handleDeleteClose,
    showDelete,
    handleDelete,
    isPressDelete,
  ] = DeleteRateHook(review);

  const [isOwner] = useIsReviewOwner(review);

  // Custom hook to manage the update of a review
  const [
    newRateText, // The current review text entered by the user
    newRateValue, // The current rating value
    onChangeNewRateText, // Function to handle review text changes
    onChangeNewRateValue, // Function to handle rating value changes
    handleShowEdit, // Function to show the edit modal
    handleCloseEdit, // Function to close the edit modal
    showEdit, // State variable controlling modal visibility
    handleUpdate, // Function to handle the update submission
    isPressEdit,
  ] = UpdateRateHook(review);

  // Settings for the star rating component used for editing
  const setting = {
    size: 20,
    count: 5,
    color: "#979797",
    activeColor: "var(--focus-color)",
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

  const { t } = useTranslation(["rate", "utilties"]);

  return (
    <div>
      {/* Delete Confirmation Modal */}
      <ModalComponent
        show={showDelete}
        handleClose={handleDeleteClose}
        handleOperation={handleDelete}
        modalTitle={t("utilities:modal.deleteTitle")}
        modalBody={t("utilities:modal.deleteMessage")}
        modalFooter={t("utilities:modal.delete")}
        className={`btn-danger`}
        ariaLabel={`${t("utilities:modal.deleteAriaLabel")}`}
        isPress={isPressDelete}
      />

      {/* Edit Modal */}
      <ModalComponent
        show={showEdit}
        handleClose={handleCloseEdit}
        handleOperation={handleUpdate}
        modalTitle={t("utilities:modal.editTitle")}
        modalBody={t("utilities:modal.editMessage")}
        modalFooter={t("utilities:modal.edit")}
        className={`btn-primary`}
        ariaLabel={`${t("utilities:modal.editAriaLabel")}`}
        isPress={isPressEdit}
      >
        {/* Star rating component to update the review rating */}
        <ReactStars {...setting} />
        {/* Input field to update the review text */}
        <input
          onChange={onChangeNewRateText}
          value={newRateText}
          type="text"
          className="w-100 mt-2"
          style={{
            borderRadius: "var(--border-radius-xs)",
            padding: "8px",
            outline: "none",
            border: "none",
          }}
          placeholder={t("write_review_placeholder")}
          aria-label={t("aria_write_comment")}
        />
      </ModalComponent>

      {/* Display the reviewer's name and rating */}
      <Row className="mt-2 px-3 pt-3 rate-border">
        <Col className="d-flex">
          <div className="d-flex">
            <div className="rate-name">{review?.user?.name || null}</div>

            <div className="d-flex mx-2">
              <StarRating rating={review?.rating} />
              <div className="rate mx-2">{review?.rating}</div>
            </div>
          </div>
          <div className="rate-date d-flex align-items-center">
            ({formatDate(review?.createdAt)})
          </div>
        </Col>
      </Row>

      {/* Display the review description and action buttons (edit/delete) if the user is the author */}
      <Row>
        <Col className="d-flex mx-3 justify-content-between">
          <div className="rate-description mx-2">{review?.review || null}</div>

          {/* Only show edit and delete options if the logged-in user is the author */}
          {isOwner && (
            <div className="d-flex align-items-center gap-2">
              <i
                className="fas fa-trash text-danger d-flex align-items-center my-0"
                style={{ cursor: "pointer" }}
                onClick={handleShowDelete}
                title={t("delete_review")}
                role="button"
                tabIndex={0}
                aria-label={t("aria_delete_review")}
              />
              <i
                className="fas fa-edit my-0"
                style={{ cursor: "pointer" }}
                onClick={handleShowEdit}
                title={t("edit_review")}
                role="button"
                tabIndex={0}
                aria-label={t("aria_edit_review")}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};
