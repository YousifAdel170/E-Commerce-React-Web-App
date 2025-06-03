/* eslint-disable react/prop-types */
import { Col, Container } from "react-bootstrap";
import RatePost from "./RatePost";
import { RateItem } from "./RateItem";
import PaginationComponent from "../Utility/PaginationComponent";
import "./RateModule.css";
import RateContainerHook from "../../hooks/review/RateContainerHook";
import { StarRating } from "../Utility/StartRating";

const RateContainer = ({ itemRatingAverage, itemRatingQty }) => {
  const [reviews, addReview, updateReviews, removeReview, allRates, onPress] =
    RateContainerHook();

  return (
    <Container className="rate-container">
      {/* Ratings summary */}
      <Col className="rating-summary d-flex align-items-center justify-content-start">
        <div className="rating-title ms-2">التقيمات</div>
        <StarRating rating={itemRatingAverage} direction="rtl" />
        <div className="rate mx-2">{itemRatingAverage}</div>
        <div className="rate-count">({itemRatingQty} تقييم)</div>
      </Col>

      {/* Add new review */}
      <RatePost addReview={addReview} />

      {/* Reviews list */}
      {reviews?.length ? (
        reviews.map((rate) => (
          <RateItem
            key={rate?._id}
            review={rate}
            updateReviews={updateReviews}
            removeReview={removeReview}
          />
        ))
      ) : (
        <div className="empty-state">
          <p>لا يوجد تقييمات الان</p>
        </div>
      )}

      {/* Pagination */}
      {allRates?.paginationResult?.numberOfPages > 1 && (
        <div className="pagination-wrapper">
          <PaginationComponent
            pageCount={allRates.paginationResult.numberOfPages}
            onPress={onPress}
          />
        </div>
      )}
    </Container>
  );
};

export default RateContainer;
