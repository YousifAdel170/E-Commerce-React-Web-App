import { Col, Row } from "react-bootstrap";
import AllCategoryPageHook from "../../hooks/category/AllCategoryPageHook";
import AdminCategoryCard from "./AdminCategoryCard";
import PaginationComponent from "../Utility/PaginationComponent";

const AdminAllCategories = () => {
  const [categories, , pageCount, getSelectedPageNumber] =
    AllCategoryPageHook();
  console.log(categories, "categories in admin all categories");
  return (
    <Row>
      <Col>
        {/* Available Coupons */}
        <div className="admin-content-text">التصنيفات المتاحة</div>
        {categories ? (
          categories.map((item, index) => {
            return <AdminCategoryCard key={index} category={item} />;
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

export default AdminAllCategories;
