import { Container } from "react-bootstrap";

import SubTitle from "../../Components/Utility/SubTitle";
import CategoryContainer from "../../Components/Category/CategoryContainer";
import PaginationComponent from "../../Components/Utility/PaginationComponent";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import getAllCategory from "../../redux/actions/categoryAction";

const AllCategoryPage = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.allCategory);

  console.log(data.category);
  console.log(data.loading);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <Container>
      <SubTitle title={"التصنيفات"} />
      <CategoryContainer />
      <PaginationComponent />
    </Container>
  );
};

export default AllCategoryPage;
