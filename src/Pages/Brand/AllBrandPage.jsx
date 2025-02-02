import { Container } from "react-bootstrap";

import SubTitle from "../../Components/Utility/SubTitle";
import PaginationComponent from "../../Components/Utility/PaginationComponent";
import BrandContainer from "../../Components/Brand/BrandContainer";

const AllBrandPage = () => {
  return (
    <Container>
      <SubTitle title="اشهر الماركات" />
      <BrandContainer />
      <PaginationComponent />
    </Container>
  );
};

export default AllBrandPage;
