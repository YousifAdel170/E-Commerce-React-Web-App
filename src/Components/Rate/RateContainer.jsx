/* eslint-disable react/prop-types */

// Import Components from react-bootstrap
import { Col, Container, Row } from "react-bootstrap";

// Import Used Assets
import rate from "../../Assets/Imgs/rate.png";

// Import Custom Components
import RatePost from "./RatePost";
import { RateItem } from "./RateItem";
import PaginationComponent from "../Utility/PaginationComponent";

// Import Custom Styles
import "./RateModule.css";
import RateContainerHook from "../../hooks/review/RateContainerHook";

/**
 * RateContainer component displays ratings and reviews for a product.
 * It fetches the data using a custom hook and allows for adding, updating,
 * and removing reviews locally in the state.
 */
const RateContainer = ({ itemRatingAverage, itemRatingQty }) => {
  const [reviews, addReview, updateReviews, removeReview, allRates, onPress] =
    RateContainerHook();
  return (
    <Container className="rate-container">
      {/* Ratings summary */}
      <Row>
        <Col className="d-flex">
          <div className="p-1">التقيمات</div>
          <img
            className="mt-2"
            src={rate}
            alt="rating icon"
            height="16"
            width="16"
          />
          <div className="cat-rate  px-1 d-flex align-items-center">
            {itemRatingAverage}
          </div>
          <div className="rate-count px-1 d-flex align-items-center">
            ({itemRatingQty} تقييم)
          </div>
        </Col>
      </Row>

      {/* Form to post a new rating */}
      <RatePost addReview={addReview} />

      {/* List of ratings */}
      {reviews && reviews?.length ? (
        reviews.map((rate) => (
          <RateItem
            key={rate._id} // Using unique _id as the key to avoid issues when removing an item
            review={rate}
            updateReviews={updateReviews}
            removeReview={removeReview}
          />
        ))
      ) : (
        <h6 className="p-2">لا يوجد تقييمات الان</h6>
      )}

      {/* Pagination */}
      {allRates?.paginationResult?.numberOfPages > 1 && (
        <PaginationComponent
          pageCount={allRates.paginationResult.numberOfPages}
          onPress={onPress}
        />
      )}
    </Container>
  );
};

export default RateContainer;
