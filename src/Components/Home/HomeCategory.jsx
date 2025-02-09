import { Container, Row, Spinner } from "react-bootstrap";
import SubTitle from "../Utility/SubTitle";
import CartegoryCard from "../Category/CartegoryCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategory } from "../../redux/actions/categoryAction";

const HomeCategory = () => {
  // 0. Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  // 1. select all the result of the page (All Categories) using useSelector
  const result = useSelector((state) => state.allCategory);

  // 2. Fetch The Data From the First Page When the Page Loaded
  useEffect(() => {
    dispatch(getAllCategory(2));
  }, [dispatch]);

  const colors = [
    "#ffd3e8",
    "#f4dba5",
    "#55cfdf",
    "#ff6262",
    "#0034ff",
    "#ffd3e8",
  ];

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
