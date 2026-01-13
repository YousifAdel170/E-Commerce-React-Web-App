import { Row } from "react-bootstrap";
import AllCategoryPageHook from "../../hooks/category/AllCategoryPageHook";
import AdminCategoryCard from "./AdminCategoryCard";
import PaginationComponent from "../Utility/PaginationComponent";
import { useTranslation } from "react-i18next";
import ItemsNotFound from "../Utility/ItemsNotFound";
import { ToastContainer } from "react-toastify";
import SpinnerComponent from "../Utility/SpinnerComponent";

const AdminAllCategories = () => {
  const [categories, isLoading, pageCount, getSelectedPageNumber] =
    AllCategoryPageHook();

  const { t } = useTranslation(["categories", "home"]);

  return (
    <div>
      <Row aria-busy={isLoading}>
        <div className="title-text">{t("availableCategories")}</div>
        {!isLoading ? (
          categories && categories?.length > 0 ? (
            categories.map((item, index) => {
              return (
                <AdminCategoryCard key={index} category={item} index={index} />
              );
            })
          ) : (
            <ItemsNotFound msg={t("categories::noCategories")} />
          )
        ) : (
          <SpinnerComponent msg={t("home::homeLoadingCategoriesAriaLabel")} />
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
