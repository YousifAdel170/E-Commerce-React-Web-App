/* eslint-disable react/prop-types */
import { Row, Spinner } from "react-bootstrap";
import BrandCard from "./BrandCard";

const BrandContainer = ({ result }) => {
  return (
    <Row className="my-2 d-flex justify-content-between">
      {!result.loading ? (
        result.brand.data.length > 0 ? (
          result.brand.data.map((item) => (
            <BrandCard key={item._id} img={item.image} />
          ))
        ) : (
          <h4>لا يوجد ماركات</h4>
        )
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </Row>
  );
};

export default BrandContainer;
