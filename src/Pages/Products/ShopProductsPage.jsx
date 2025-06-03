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

// Page Responsible for displaying the products in the shop
const ShopProductsPage = () => {
  FetchWishList();
  // Get The Products Data From The Custom Hook
  const [items, pageCount, onPress, getProduct, results] =
    ViewSearchProductHook();

  return (
    <div style={{ flex: "1" }}>
      {/* Header for the categories */}
      <CategoryHeader />

      <Container>
        {/* Search Count Result Component */}
        <SearchCountResult
          onClickGetProduct={getProduct}
          title={`هناك ${results} نتيجة بحث`}
        />
        <Row className="d-flex">
          {/* Side Filter Component */}
          <Col sm="2" xs="2" md="1" className="d-flex">
            <SideFilter />
          </Col>

          {/* Product Card Container Component */}
          <Col sm="10" xs="10" md="11">
            <ProductCardContainer products={items} />
          </Col>
        </Row>

        {/* Pagination Component */}
        {pageCount && pageCount > 1 ? (
          <PaginationComponent pageCount={pageCount} onPress={onPress} />
        ) : null}
      </Container>
    </div>
  );
};

// Exporting the ShopProductsPage component to be used in other parts of the application
export default ShopProductsPage;
