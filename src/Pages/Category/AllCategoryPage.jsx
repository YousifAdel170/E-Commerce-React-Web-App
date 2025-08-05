// Import Components from React-Bootstrap
import { Container } from "react-bootstrap";

// Import Custom Components
import SubTitle from "../../Components/Utility/SubTitle";
import CategoryContainer from "../../Components/Category/CategoryContainer";
import PaginationComponent from "../../Components/Utility/PaginationComponent";

// Import Custom Hooks
import AllCategoryPageHook from "../../hooks/category/AllCategoryPageHook";

// Translation
import { useTranslation } from "react-i18next";

// Page Responsible for displaying all categories
const AllCategoryPage = () => {
  const [categories, loading, pageCount, getSelectedPageNumber] =
    AllCategoryPageHook();

  const { t } = useTranslation("home");

  return (
    <Container
      style={{ flex: "1" }}
      role="region"
      aria-label={t("homeCategoriesTitle")}
    >
      {/* Accessible Page Heading */}
      <header>
        <SubTitle title={t("homeCategoriesTitle")} as="h1" />
      </header>

      {/* Main Content */}
      <section aria-live="polite" aria-busy={loading}>
        <CategoryContainer categories={categories} loading={loading} />
      </section>

      {/* Pagination */}
      {pageCount > 1 && (
        <nav
          className="mt-4"
          role="navigation"
          aria-label={t("navigateToButton", {
            button: t("homeCategoriesTitle"),
          })}
        >
          <PaginationComponent
            pageCount={pageCount}
            onPress={getSelectedPageNumber}
          />
        </nav>
      )}
    </Container>
  );
};

export default AllCategoryPage;
