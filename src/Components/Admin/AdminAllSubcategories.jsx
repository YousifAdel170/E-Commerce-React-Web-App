import { Col, Row } from "react-bootstrap";
import PaginationComponent from "../Utility/PaginationComponent";
import AdminSubcategoryCard from "./AdminSubcategoryCard";
import { useParams } from "react-router-dom";
import AdminAllSubcategoriesHook from "../../hooks/subCategory/AdminAllSubcategoriesHook";

const AdminAllSubcategories = () => {
  const { id } = useParams();
  const [
    subcategories,
    pageCount,
    getSelectedPageNumber,
    numberOfSubcategories,
  ] = AdminAllSubcategoriesHook(id);

  return (
    <Row>
      <Col>
        {/* Available Coupons */}
        <div className="admin-content-text">
          عدد التصنيفات الفرعية في هذا التصنيف #{numberOfSubcategories}
        </div>
        {subcategories ? (
          subcategories.map((item, index) => {
            return (
              <AdminSubcategoryCard
                key={index}
                subcategory={item}
                categoryID={id}
              />
            );
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

export default AdminAllSubcategories;
