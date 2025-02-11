import { Container } from "react-bootstrap";

import SubTitle from "../../Components/Utility/SubTitle";
import PaginationComponent from "../../Components/Utility/PaginationComponent";
import BrandContainer from "../../Components/Brand/BrandContainer";
import AllBrandPageHook from "../../hooks/brand/AllBrandPageHook";

const AllBrandPage = () => {
  const [result, pageCount, getSelectedPageNumber] = AllBrandPageHook();

  return (
    <Container>
      {/* Title Of The Page */}
      <SubTitle title="اشهر الماركات" />

      {/* Container of Items */}
      <BrandContainer result={result} />

      {/* Pagination Component */}
      {pageCount > 1 ? (
        <PaginationComponent
          pageCount={pageCount}
          onPress={getSelectedPageNumber}
        />
      ) : null}
    </Container>
  );
};

export default AllBrandPage;
