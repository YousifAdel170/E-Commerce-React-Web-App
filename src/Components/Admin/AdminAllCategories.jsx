import { Row } from "react-bootstrap";
import AllCategoryPageHook from "../../hooks/category/AllCategoryPageHook";
import AdminCategoryCard from "./AdminCategoryCard";
import PaginationComponent from "../Utility/PaginationComponent";
import { useTranslation } from "react-i18next";
import ItemsNotFound from "../Utility/ItemsNotFound";
import { ToastContainer } from "react-toastify";

const AdminAllCategories = () => {
  const [categories, , pageCount, getSelectedPageNumber] =
    AllCategoryPageHook();

  const { t } = useTranslation("categories");

  return (
    <div>
      <Row>
        {/* Available Coupons */}
        <div className="title-text">{t("availableCategories")}</div>
        {categories ? (
          categories.map((item, index) => {
            return (
              <AdminCategoryCard key={index} category={item} index={index} />
            );
          })
        ) : (
          <ItemsNotFound msg={t("noCategories")} />
        )}
      </Row>
      {/* Handle The Pagination */}
      {pageCount > 1 ? (
        <PaginationComponent
          pageCount={pageCount}
          onPress={getSelectedPageNumber}
        />
      ) : null}

      <ToastContainer />
    </div>
  );
};

export default AdminAllCategories;
