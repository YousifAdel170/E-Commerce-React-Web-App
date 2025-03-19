/* eslint-disable react/prop-types */
import { Row, Spinner } from "react-bootstrap";
import BrandCard from "./BrandCard";

const BrandContainer = ({ brands, loading }) => {
  return (
    <Row className="my-2 d-flex justify-content-between">
      {!loading ? (
        brands.length > 0 ? (
          brands.map((item) => (
            <BrandCard key={item._id} id={item._id} img={item.image} />
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
