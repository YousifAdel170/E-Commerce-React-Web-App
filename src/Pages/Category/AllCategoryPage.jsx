import { Container } from "react-bootstrap";

import SubTitle from "../../Components/Utility/SubTitle";
import CategoryContainer from "../../Components/Category/CategoryContainer";
import PaginationComponent from "../../Components/Utility/PaginationComponent";

const AllCategoryPage = () => {
  return (
    <Container>
      <SubTitle title={"التصنيفات"} />
      <CategoryContainer />
      <PaginationComponent />
    </Container>
  );
};

export default AllCategoryPage;
