/* eslint-disable react/prop-types */
import { Row, Spinner } from "react-bootstrap";
import CartegoryCard from "./CartegoryCard";

const CategoryContainer = ({ result }) => {
  const colors = [
    "#ffd3e8",
    "#f4dba5",
    "#55cfdf",
    "#ff6262",
    "#0034ff",
    "#ffd3e8",
  ];

  return (
    <Row className="my-2 d-flex">
      {!result.loading ? (
        result.category.data.length > 0 ? (
          result.category.data.map((item) => (
            <CartegoryCard
              key={item._id}
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
  );
};

export default CategoryContainer;
