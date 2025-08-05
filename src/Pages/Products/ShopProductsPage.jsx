// Import Components from React Bootstrap
import { Col, Container, Row } from "react-bootstrap";

// Import Custom Components
import CategoryHeader from "../../Components/Category/CategoryHeader";
import SearchCountResult from "../../Components/Utility/SearchCountResult";
import SideFilter from "../../Components/Utility/SideFilter";
import ProductCardContainer from "../../Components/Products/ProductCardContainer";
import PaginationComponent from "../../Components/Utility/PaginationComponent";

// Import Custom Hooks
import ViewSearchProductHook from "../../hooks/products/ViewSearchProductHook";
import FetchWishList from "../../hooks/products/wishList/FetchWishList";

// Import Translation + Theme
import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";

const ShopProductsPage = () => {
  const { t } = useTranslation("shopProducts");
  // const isDark = useSelector((state) => state.ui.isDark);

  // Initialize wishlist
  FetchWishList();

  // Get product data
  const [items, pageCount, onPress, getProduct, results] =
    ViewSearchProductHook();

  return (
    <main style={{ flex: "1" }} aria-label={t("shopMainRegionLabel")}>
      {/* Accessible Category Navigation */}
      <CategoryHeader />

      <Container
        fluid="lg"
        role="region"
        aria-labelledby="search-results-heading"
      >
        {/* Accessible Heading */}
        <h2 id="search-results-heading" className="visually-hidden">
          {t("shopSearchResultsHeading")}
        </h2>

        {/* Display number of results with i18n */}
        <SearchCountResult
          onClickGetProduct={getProduct}
          title={t("shopSearchCount", { count: results })}
        />

        {/* Grid Layout */}
        <Row className="d-flex justify-content-between">
          {/* Sidebar Filter */}
          <Col
            sm="2"
            xs="2"
            md="1"
            className="d-flex"
            role="complementary"
            aria-label={t("shopSideFilter")}
          >
            <SideFilter />
          </Col>

          {/* Product Cards */}
          <Col
            sm="10"
            xs="10"
            md="11"
            role="region"
            aria-label={t("shopProductGrid")}
          >
            <ProductCardContainer products={items} />
          </Col>
        </Row>

        {/* Pagination */}
        {pageCount > 1 && (
          <PaginationComponent
            pageCount={pageCount}
            onPress={onPress}
            ariaLabel={t("shopPagination")}
          />
        )}
      </Container>
    </main>
  );
};

export default ShopProductsPage;
