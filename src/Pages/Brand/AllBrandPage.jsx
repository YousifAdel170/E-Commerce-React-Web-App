// Import Components from react-bootstrap
import { Container } from "react-bootstrap";

// Import Custom Components
import SubTitle from "../../Components/Utility/SubTitle";
import PaginationComponent from "../../Components/Utility/PaginationComponent";
import BrandContainer from "../../Components/Brand/BrandContainer";

// Import Custom Hooks
import AllBrandPageHook from "../../hooks/brand/AllBrandPageHook";

// i18n
import { useTranslation } from "react-i18next";

// Page responsible to display all brands
const AllBrandPage = () => {
  const [brands, loading, pageCount, getSelectedPageNumber] =
    AllBrandPageHook();

  const { t } = useTranslation("home");

  return (
    <Container
      style={{ flex: "1" }}
      role="region"
      aria-labelledby="brands-section-title"
    >
      {/* Title of the page */}
      <SubTitle
        title={t("homeMostCommonBrandsTitle")}
        id="brands-section-title"
      />

      {/* Container of Brand Items */}
      <BrandContainer brands={brands} loading={loading} />

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

export default AllBrandPage;
