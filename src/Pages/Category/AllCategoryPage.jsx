// Import Components from  React-Bootstrap
import { Container } from "react-bootstrap";

// Import Custom Components
import SubTitle from "../../Components/Utility/SubTitle";
import CategoryContainer from "../../Components/Category/CategoryContainer";
import PaginationComponent from "../../Components/Utility/PaginationComponent";

// Import Custom Hooks to display all categories
import AllCategoryPageHook from "../../hooks/category/AllCategoryPageHook";
import { CATEGORIES_TITLE } from "../../config";

// Page Responsible for displaying all categories
const AllCategoryPage = () => {
  // Custom Hook to get all categories
  const [categories, loading, pageCount, getSelectedPageNumber] =
    AllCategoryPageHook();

  return (
    // Main Container of The Page
    <Container>
      {/* Title Of The Page */}
      <SubTitle title={CATEGORIES_TITLE} />

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

// Exporting the AllCategoryPage Component
export default AllCategoryPage;
