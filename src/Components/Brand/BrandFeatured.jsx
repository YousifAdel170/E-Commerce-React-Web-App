import { Container, Row } from "react-bootstrap";
import SubTitle from "../Utility/SubTitle";
import BrandCard from "./BrandCard";
import FirstBrandImage from "../../Assets/Imgs/brand1.png";
import SecondBrandImage from "../../Assets/Imgs/brand2.png";
import ThirdBrandImage from "../../Assets/Imgs/brand3.png";

const BrandFeatured = ({ title, btnTitle }) => {
  return (
    <Container>
      <SubTitle title={title} btnTitle={btnTitle} path={"all-brands"} />
      <Row className="my-2 d-flex justify-content-between">
        <BrandCard img={FirstBrandImage} />
        <BrandCard img={SecondBrandImage} />
        <BrandCard img={ThirdBrandImage} />
        <BrandCard img={FirstBrandImage} />
        <BrandCard img={SecondBrandImage} />
        <BrandCard img={ThirdBrandImage} />
      </Row>
    </Container>
  );
};

export default BrandFeatured;
