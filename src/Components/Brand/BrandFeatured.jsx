/* eslint-disable react/prop-types */
import { Container, Row, Spinner } from "react-bootstrap";
import SubTitle from "../Utility/SubTitle";
import BrandCard from "./BrandCard";

import HomeBrandHook from "../../hooks/brand/HomeBrandHook";

const BrandFeatured = ({ title, btnTitle }) => {
  const [result] = HomeBrandHook();

  return (
    <Container>
      <SubTitle title={title} btnTitle={btnTitle} path={"all-brands"} />
      <Row className="my-2 d-flex justify-content-between">
        {!result.loading ? (
          result.brand.data.length > 0 ? (
            result.brand.data
              .slice(0, 5)
              .map((item) => <BrandCard key={item._id} img={item.image} />)
          ) : (
            <h4>لا يوجد ماركات</h4>
          )
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </Row>
    </Container>
  );
};

export default BrandFeatured;
