import { Container, Row } from "react-bootstrap";
import SubTitle from "../Utility/SubTitle";
import CartegoryCard from "../Category/CartegoryCard";
import clothImage from "../../Assets/Imgs/clothe.png";
import labtopImage from "../../Assets/Imgs/labtop.png";
import saleImage from "../../Assets/Imgs/sale.png";
import pic from "../../Assets/Imgs/pic.png";
import cat2 from "../../Assets/Imgs/cat2.png";

const HomeCategory = () => {
  return (
    <Container>
      <SubTitle
        title={"التصنيفات"}
        btnTitle={"المزيد"}
        path={"all-categories"}
      />
      <Row className="my-2 d-flex justify-content-between">
        {" "}
        <CartegoryCard
          title={"اجهزة منزلية"}
          img={clothImage}
          background="#F4DBA4"
        />
        <CartegoryCard title={"اجهزة منزلية"} img={cat2} background="#F4DBA4" />
        <CartegoryCard
          title={"اجهزة منزلية"}
          img={labtopImage}
          background="#00f1ff"
        />
        <CartegoryCard
          title={"اجهزة منزلية"}
          img={saleImage}
          background="#F4DBA4"
        />
        <CartegoryCard title={"اجهزة منزلية"} img={pic} background="#FF6262" />
        <CartegoryCard
          title={"اجهزة منزلية"}
          img={clothImage}
          background="#F4DBA4"
        />
      </Row>
    </Container>
  );
};

export default HomeCategory;
