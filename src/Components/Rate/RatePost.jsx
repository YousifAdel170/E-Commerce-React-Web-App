import { Col, Row } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import AddRateHook from "../../hooks/review/AddRateHook";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const RatePost = () => {
  // Get The ID from the URL
  const { id } = useParams();

  // Get The Data from the Hook
  const [
    rateText,
    onChangeRateText,
    onChangeRateValue,
    userName,
    handleSubmit,
  ] = AddRateHook(id);

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
      <Row className="mt-3">
        <Col sm="12" className="me-5  d-flex">
          <div className="rate-name  d-inline ms-3 mt-1 ">{userName}</div>
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
              className="product-cart-add px-3  py-2 text-center d-inline"
            >
              اضف تعليق
            </div>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default RatePost;
