import { Container } from "react-bootstrap";

import SubTitle from "../../Components/Utility/SubTitle";
import CategoryContainer from "../../Components/Category/CategoryContainer";
import PaginationComponent from "../../Components/Utility/PaginationComponent";
import AllCategoryPageHook from "../../hooks/category/AllCategoryPageHook";

const AllCategoryPage = () => {
  const [categories, loading, pageCount, getSelectedPageNumber] =
    AllCategoryPageHook();

  return (
    <Container>
      {/* Title Of The Page */}
      <SubTitle title={"التصنيفات"} />

      {/* Container of Items */}
      <CategoryContainer categories={categories} loading={loading} />

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

export default AllCategoryPage;
