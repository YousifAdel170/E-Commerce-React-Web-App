/* eslint-disable react/prop-types */
import { Col, Container } from "react-bootstrap";
import RatePost from "./RatePost";
import { RateItem } from "./RateItem";
import PaginationComponent from "../Utility/PaginationComponent";
import "./RateModule.css";
import RateContainerHook from "../../hooks/review/RateContainerHook";
import { StarRating } from "../Utility/StartRating";
import { useTranslation } from "react-i18next";

const RateContainer = ({ itemRatingAverage, itemRatingQty }) => {
  const [reviews, addReview, updateReviews, removeReview, allRates, onPress] =
    RateContainerHook();

  const { t } = useTranslation("rate");

  return (
    <Container className=" flex-column my-3">
      <div className="box-shadow-lift card-container flex-column">
        {/* Ratings summary */}
        <Col className="d-flex align-items-center">
          <div className="fw-bold mx-2">{t("title")}</div>
          <StarRating rating={itemRatingAverage} />
          <div className="mx-2 rate-date fst-normal d-flex align-items-center">
            {itemRatingAverage}
          </div>
          <div className="rate-count fst-italic">
            ({itemRatingQty} {t("reviews_count")})
          </div>
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
            <p>{t("no_reviews")}</p>
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
      </div>
    </Container>
  );
};

export default RateContainer;
