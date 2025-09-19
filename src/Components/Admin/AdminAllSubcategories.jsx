import { Row, Button } from "react-bootstrap";
import PaginationComponent from "../Utility/PaginationComponent";
import AdminSubcategoryCard from "./AdminSubcategoryCard";
import { useParams, Link } from "react-router-dom";
import AdminAllSubcategoriesHook from "../../hooks/subCategory/AdminAllSubcategoriesHook";
import { useTranslation } from "react-i18next";
import ItemsNotFound from "../Utility/ItemsNotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";

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
      {/* Title + Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="title-text">
          {t("subcategory.title", { count: numberOfSubcategories })}
        </div>

        {/* Add Subcategory Button */}
        <Link to={`/admin/add-subcategory/`}>
          <Button
            variant="btn btn-primary"
            title={t("subcategory.addNew")}
            size="sm"
            className="fw-bold d-flex align-items-center gap-1"
          >
            <FontAwesomeIcon icon={faPlus} />
            {t("subcategory.add")}
          </Button>
        </Link>
      </div>

      {/* Subcategories List */}
      <Row>
        {subcategories && subcategories.length > 0 ? (
          subcategories.map((item, index) => (
            <AdminSubcategoryCard
              key={index}
              subcategory={item}
              categoryID={id}
              index={index}
            />
          ))
        ) : (
          <ItemsNotFound msg={t("subcategory.noSubcategories")} />
        )}
      </Row>

      {/* Pagination */}
      {pageCount > 1 && (
        <PaginationComponent
          pageCount={pageCount}
          onPress={getSelectedPageNumber}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminAllSubcategories;
