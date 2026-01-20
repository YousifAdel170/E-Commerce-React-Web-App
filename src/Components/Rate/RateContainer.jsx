/* eslint-disable react/prop-types */
import { Col, Container, Row } from "react-bootstrap";
import RatePost from "./RatePost";
import { RateItem } from "./RateItem";
import PaginationComponent from "../Utility/PaginationComponent";
import "./RateModule.css";
import { StarRating } from "../Utility/StartRating";
import { useTranslation } from "react-i18next";
import ViewAllRatesHook from "../../hooks/review/ViewAllRatesHook";
import ItemsNotFound from "../Utility/ItemsNotFound";
import SpinnerComponent from "../Utility/SpinnerComponent";

const RateContainer = ({ itemRatingAverage, itemRatingQty }) => {
  const [RatesData, isLoading, pageCount, getSelectedPageNumber] =
    ViewAllRatesHook();

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
        <RatePost />

        <Row aria-busy={isLoading}>
          {!isLoading ? (
            RatesData && RatesData?.length > 0 ? (
              RatesData.map((rate, index) => {
                return <RateItem key={index} review={rate} />;
              })
            ) : (
              <ItemsNotFound msg={t("no_reviews")} />
            )
          ) : (
            <SpinnerComponent msg={t("no_reviews")} />
          )}
        </Row>

        {/* Handle The Pagination */}
        {pageCount > 1 ? (
          <PaginationComponent
            pageCount={pageCount}
            onPress={getSelectedPageNumber}
          />
        ) : null}
      </div>
    </Container>
  );
};

export default RateContainer;
