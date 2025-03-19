import { Container } from "react-bootstrap";

import SubTitle from "../../Components/Utility/SubTitle";
import PaginationComponent from "../../Components/Utility/PaginationComponent";
import BrandContainer from "../../Components/Brand/BrandContainer";
import AllBrandPageHook from "../../hooks/brand/AllBrandPageHook";

const AllBrandPage = () => {
  const [brands, loading, pageCount, getSelectedPageNumber] =
    AllBrandPageHook();

  return (
    <Container>
      {/* Title Of The Page */}
      <SubTitle title="اشهر الماركات" />

      {/* Container of Items */}
      <BrandContainer brands={brands} loading={loading} />

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
