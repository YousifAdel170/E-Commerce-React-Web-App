// Import components from React Bootstrap
import { Row } from "react-bootstrap";

// Import custom components
import AdminProductCard from "./AdminProductCard";
import PaginationComponent from "../Utility/PaginationComponent";

// Import custom hooks
import AdminAllProductsPageHook from "../../hooks/admin/AdminAllProductsPageHook";

import { useTranslation } from "react-i18next";
import ItemsNotFound from "../Utility/ItemsNotFound";

// Component responsible for rendering all products in the admin panel
const AdminAllProducts = () => {
  // Custom hook to manage state and logic for the component
  const [items, pageCount, onPress, onDelete] = AdminAllProductsPageHook();

  const { t } = useTranslation("admin");

  return (
    <div>
      {/* Title of the section */}
      <div className="title-text">{t("all-products.title")}</div>

      <Row>
        {/* Map through the items and render AdminProductCard for each item */}
        {items?.length ? (
          items.map((item, index) => (
            <AdminProductCard
              key={item?._id}
              item={item}
              onDelete={onDelete}
              index={index}
            />
          ))
        ) : (
          <ItemsNotFound msg={t("all-products.notFound")} />
        )}
      </Row>

      {/* Pagination component to navigate through pages */}
      {pageCount > 1 ? (
        <PaginationComponent pageCount={pageCount} onPress={onPress} />
      ) : null}
    </div>
  );
};

export default AdminAllProducts;
