import { Row } from "react-bootstrap";
import PaginationComponent from "../Utility/PaginationComponent";
import AdminSubcategoryCard from "./AdminSubcategoryCard";
import { useParams } from "react-router-dom";
import AdminAllSubcategoriesHook from "../../hooks/subCategory/AdminAllSubcategoriesHook";
import { useTranslation } from "react-i18next";
import ItemsNotFound from "../Utility/ItemsNotFound";

const AdminAllSubcategories = () => {
  const { id } = useParams();
  const [
    subcategories,
    pageCount,
    getSelectedPageNumber,
    numberOfSubcategories,
  ] = AdminAllSubcategoriesHook(id);

  const { t } = useTranslation("categories");

  return (
    <div>
      <Row>
        {/* Available Subcategories */}
        <div className="title-text">
          {t("subcategory.title", { count: numberOfSubcategories })}
        </div>
        {subcategories ? (
          subcategories.map((item, index) => {
            return (
              <AdminSubcategoryCard
                key={index}
                subcategory={item}
                categoryID={id}
                index={index}
              />
            );
          })
        ) : (
          <ItemsNotFound msg={t("subcategory.noSubcategories")} />
        )}
      </Row>

      {/* Handle The Pagination */}
      {pageCount > 1 ? (
        <PaginationComponent
          pageCount={pageCount}
          onPress={getSelectedPageNumber}
        />
      ) : null}
    </div>
  );
};

export default AdminAllSubcategories;
