import { Row } from "react-bootstrap";
import BrandCard from "./BrandCard";
import FirstBrandImage from "../../Assets/Imgs/brand1.png";
import SecondBrandImage from "../../Assets/Imgs/brand2.png";
import ThirdBrandImage from "../../Assets/Imgs/brand3.png";

const BrandContainer = () => {
  return (
    <Row className="my-2 d-flex justify-content-between">
      <BrandCard img={FirstBrandImage} />
      <BrandCard img={SecondBrandImage} />
      <BrandCard img={ThirdBrandImage} />
      <BrandCard img={FirstBrandImage} />
      <BrandCard img={SecondBrandImage} />
      <BrandCard img={ThirdBrandImage} />
      <BrandCard img={FirstBrandImage} />
      <BrandCard img={SecondBrandImage} />
      <BrandCard img={ThirdBrandImage} />
      <BrandCard img={FirstBrandImage} />
      <BrandCard img={SecondBrandImage} />
      <BrandCard img={ThirdBrandImage} />
      <BrandCard img={FirstBrandImage} />
      <BrandCard img={SecondBrandImage} />
      <BrandCard img={ThirdBrandImage} />
      <BrandCard img={FirstBrandImage} />
      <BrandCard img={SecondBrandImage} />
      <BrandCard img={ThirdBrandImage} />
      <BrandCard img={FirstBrandImage} />
      <BrandCard img={SecondBrandImage} />
      <BrandCard img={ThirdBrandImage} />
      <BrandCard img={FirstBrandImage} />
      <BrandCard img={SecondBrandImage} />
      <BrandCard img={ThirdBrandImage} />
    </Row>
  );
};

export default BrandContainer;
