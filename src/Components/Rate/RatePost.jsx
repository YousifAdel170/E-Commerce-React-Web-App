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

// Container for displaying product ratings and reviews
const RatePost = ({ addReview = () => {} }) => {
  // Get The ID from the URL
  const { id } = useParams();

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
    activeColor: "#ffc107",
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
      <Row>
        <Col sm="12" className="d-flex align-items-center">
          <div className="rate-name">{userName}</div>
          <ReactStars {...settingRatingStarsInput} />
        </Col>
      </Row>

      <Row className="mx-2">
        <Col className="d-flex flex-column me-4 pb-2">
          <textarea
            value={rateText}
            onChange={onChangeRateText}
            className="input-form-area p-2 mt-3"
            rows="2"
            cols="20"
            placeholder="اكتب تعليقك...."
          />
          <div className="d-flex justify-content-end mt-2">
            <button
              onClick={handleSubmit}
              className="btn btn-dark d-flex align-items-center"
            >
              اضف تعليق
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RatePost;
