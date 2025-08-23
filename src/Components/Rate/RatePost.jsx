/* eslint-disable react/prop-types */
// Import Components From React Bootstrap
import { Col, Row } from "react-bootstrap";

// Import Used Components from react-rating-stars-component
import ReactStars from "react-rating-stars-component";

// Import Used Hooks
import { useParams } from "react-router-dom";

// Import Custom Hook
import AddRateHook from "../../hooks/review/AddRateHook";

// Import Custom Styling
import "./RateModule.css";
import { useTranslation } from "react-i18next";

// Container for displaying product ratings and reviews
const RatePost = ({ addReview = () => {} }) => {
  // Get The ID from the URL
  const { id } = useParams();

  const { t } = useTranslation("rate");

  // Get The Data from the Hook
  const [
    rateText,
    onChangeRateText,
    onChangeRateValue,
    userName,
    handleSubmit,
  ] = AddRateHook(id, addReview);

  // Settings for the Rate
  const settingRatingStarsInput = {
    size: 20,
    count: 5,
    color: "#979797",
    activeColor: "var(--focus-color)",
    value: 0,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: onChangeRateValue,
  };

  return (
    <div>
      <Row className="mt-2">
        <Col
          sm="12"
          className="d-flex align-items-center"
          aria-label={t("aria_star_rating")}
        >
          <div className="rate-user mx-2">{userName}</div>
          <ReactStars {...settingRatingStarsInput} />
        </Col>
      </Row>

      <Row className="">
        <Col className="d-flex flex-column mx-3 pb-2">
          <textarea
            value={rateText}
            onChange={onChangeRateText}
            className="input-form-area py-2 px-3 mt-3"
            rows="2"
            cols="20"
            placeholder={t("write_comment_placeholder")}
            aria-label={t("aria_write_review")}
          />
          <div className="d-flex justify-content-end mt-2">
            <button
              onClick={handleSubmit}
              className="btn btn-primary d-flex align-items-center"
              aria-label={t("aria_add_comment")}
            >
              {t("add_comment")}
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RatePost;
