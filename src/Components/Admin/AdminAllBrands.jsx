import { Col, Row } from "react-bootstrap";
import PaginationComponent from "../Utility/PaginationComponent";
import AllBrandPageHook from "../../hooks/brand/AllBrandPageHook";
import AdminBrandCard from "./AdminBrandCard";

const AdminAllBrands = () => {
  const [brands, , pageCount, getSelectedPageNumber] = AllBrandPageHook();
  console.log(brands, "Brands in admin all brands");
  return (
    <Row>
      <Col>
        {/* Available Coupons */}
        <div className="title-text">الماركات المتاحة</div>
        {brands ? (
          brands.map((item, index) => {
            return <AdminBrandCard key={index} brand={item} />;
          })
        ) : (
          <h6>لا يوجد تصنيفات حتى الان</h6>
        )}
      </Col>

      {/* Handle The Pagination */}
      {pageCount > 1 ? (
        <PaginationComponent
          pageCount={pageCount}
          onPress={getSelectedPageNumber}
        />
      ) : null}
    </Row>
  );
};

export default AdminAllBrands;
