import { Container, Row, Spinner } from "react-bootstrap";
import SubTitle from "../Utility/SubTitle";
import CartegoryCard from "../Category/CartegoryCard";
import HomeCategoryHook from "../../hooks/category/HomeCategoryHook";

const HomeCategory = () => {
  const [result, colors] = HomeCategoryHook();
  return (
    <Container>
      {/* Title Of The Page */}
      <SubTitle
        title={"التصنيفات"}
        btnTitle={"المزيد"}
        path={"all-categories"}
      />

      {/* First 5 Items */}
      <Row className="my-2 d-flex justify-content-between">
        {result.loading === false ? (
          result.category.data ? (
            result.category.data
              .slice(0, 5)
              .map((item, index) => (
                <CartegoryCard
                  key={index}
                  title={item.name}
                  img={item.image}
                  background={colors[Math.floor(Math.random() * colors.length)]}
                />
              ))
          ) : (
            <h4>لا يوجد تصنيفات</h4>
          )
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </Row>
    </Container>
  );
};

export default HomeCategory;
