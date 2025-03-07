/* eslint-disable react/prop-types */
import { Col, Container, Row } from "react-bootstrap";

import rate from "../../Assets/Imgs/rate.png";
import { RateItem } from "./RateItem";
import RatePost from "./RatePost";
import PaginationComponent from "../Utility/PaginationComponent";
import ViewAllRatesHook from "../../hooks/review/ViewAllRatesHook";
import { useParams } from "react-router-dom";

const RateContainer = ({ itemRatingAverage, itemRatingQty }) => {
  const { id } = useParams();
  const [allRates, onPress] = ViewAllRatesHook(id);

  return (
    <Container className="rate-container">
      <Row>
        <Col className="d-flex">
          <div className="sub-tile d-inline p-1 ">التقيمات</div>
          <img className="mt-2" src={rate} alt="" height="16px" width="16px" />
          <div className="cat-rate  d-inline  p-1 pt-2">
            {itemRatingAverage}
          </div>
          <div className="rate-count d-inline p-1 pt-2">
            {`(${itemRatingQty} تقييم)`}
          </div>
        </Col>
      </Row>
      <RatePost />

      {allRates && allRates.data ? (
        allRates.data.map((rate, index) => (
          <RateItem key={index} review={rate} />
        ))
      ) : (
        <h6>لا يوجد تقييمات الان</h6>
      )}

      {allRates &&
      allRates.paginationResult &&
      allRates.paginationResult.numberOfPages > 1 ? (
        <PaginationComponent
          pageCount={
            allRates.paginationResult
              ? allRates.paginationResult.numberOfPages
              : 0
          }
          onPress={onPress}
        />
      ) : null}
    </Container>
  );
};

export default RateContainer;
