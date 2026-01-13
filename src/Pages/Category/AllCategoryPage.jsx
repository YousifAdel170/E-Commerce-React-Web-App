// Import Components from react-bootstrap
import { Container } from "react-bootstrap";

// Import Custom Components
import SubTitle from "../../Components/Utility/SubTitle";
import PaginationComponent from "../../Components/Utility/PaginationComponent";
import CategoryContainer from "../../Components/Category/CategoryContainer";

// Import Custom Hooks
import AllCategoryPageHook from "../../hooks/category/AllCategoryPageHook";

// i18n
import { useTranslation } from "react-i18next";

// Page responsible to display all brands
const AllCategoryPage = () => {
  const [categories, loading, pageCount, getSelectedPageNumber] =
    AllCategoryPageHook();

  const { t } = useTranslation("home");

  return (
    <Container
      style={{ flex: "1" }}
      role="region"
      aria-labelledby="categories-section-title"
    >
      {/* Title of the page */}
      <SubTitle
        title={t("homeCategoriesTitle")}
        id="categories-section-title"
      />

      {/* Container of Category Items */}
      <CategoryContainer categories={categories} loading={loading} />

      {/* Pagination only if more than 1 page */}
      {pageCount > 1 && (
        <PaginationComponent
          pageCount={pageCount}
          onPress={getSelectedPageNumber}
        />
      )}
    </Container>
  );
};

export default AllCategoryPage;
