// Import components from React Bootstrap
import { Row } from "react-bootstrap";

// Import custom components
import AdminProductCard from "./AdminProductCard";
import PaginationComponent from "../Utility/PaginationComponent";

// Import custom hooks
import AdminAllProductsPageHook from "../../hooks/admin/AdminAllProductsPageHook";

import { useTranslation } from "react-i18next";
import ItemsNotFound from "../Utility/ItemsNotFound";
import { ToastContainer } from "react-toastify";
import SpinnerComponent from "../Utility/SpinnerComponent";

// Component responsible for rendering all products in the admin panel
const AdminAllProducts = () => {
  // Custom hook to manage state and logic for the component
  const [producstsData, isLoading, pageCount, getSelectedPageNumber] =
    AdminAllProductsPageHook();

  const { t } = useTranslation(["admin", "home"]);

  return (
    <div>
      {/* Title of the section */}

      <Row aria-busy={isLoading}>
        <div className="title-text">{t("all-products.title")}</div>
        {!isLoading ? (
          producstsData && producstsData?.length > 0 ? (
            producstsData.map((item, index) => {
              return <AdminProductCard key={index} item={item} index={index} />;
            })
          ) : (
            <ItemsNotFound msg={t("all-products.notFound")} />
          )
        ) : (
          <SpinnerComponent msg={t("homeLoadingCategoriesAriaLabel")} />
        )}
      </Row>

      {/* Pagination component to navigate through pages */}
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

export default AdminAllProducts;
