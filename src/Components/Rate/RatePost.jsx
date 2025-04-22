/* eslint-disable react/prop-types */
// Import Componenents From React Bootstrap
import { Col, Row } from "react-bootstrap";

// Import Used Components from react-rating-stars-component
import ReactStars from "react-rating-stars-component";

// Import Used Hooks
import { useParams } from "react-router-dom";

// Import Custom Hook
import AddRateHook from "../../hooks/review/AddRateHook";

// Import Custom Syling
import "./RateModule.css";

// Container for displaying product ratings and reviews
const RatePost = ({ addReview }) => {
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

  // Setting for the Rate
  const setting = {
    size: 20,
    count: 5,
    color: "#979797",
    activeColor: "#ffc107",
    value: 7.5,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (value) => {
      onChangeRateValue(value);
    },
  };

  return (
    <div>
      <Row className="mt-2">
        <Col sm="12" className="d-flex">
          <div className="rate-name  mx-3">{userName}</div>
          <ReactStars {...setting} />
        </Col>
      </Row>

      <Row className="border-bottom mx-2">
        <Col className="d-felx me-4 pb-2">
          <textarea
            value={rateText}
            onChange={onChangeRateText}
            className="input-form-area p-2 mt-3"
            rows="2"
            cols="20"
            placeholder="اكتب تعليقك...."
          />
          <div className=" d-flex justify-content-end al">
            <div
              onClick={handleSubmit}
              className="product-cart-add px-3 d-flex align-items-center"
            >
              اضف تعليق
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RatePost;
