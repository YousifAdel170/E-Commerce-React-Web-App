// Import Translation Hook
import { useTranslation } from "react-i18next";

// Import Components from React Bootstrap
import { Row } from "react-bootstrap";

// Import Custom Components
import AdminOrderItem from "./AdminOrderItem";
import PaginationComponent from "../Utility/PaginationComponent";

// Import Custom Hooks
import ViewAllOrdersHook from "../../hooks/Utility/ViewAllOrdersHook";

// Import CSS for Admin Component
import "./Admin.css";
import ItemsNotFound from "../Utility/ItemsNotFound";
import SpinnerComponent from "../Utility/SpinnerComponent";

// Component responsible for rendering all orders in the admin panel
const AdminAllOrders = () => {
  // Custom hook to manage state and logic for the component
  const [allOrders, , pageCount, getSelectedPageNumber, userName, isLoading] =
    ViewAllOrdersHook();

  const { t } = useTranslation(["admin", "home"]); // Translation function for admin namespace

  return (
    <div>
      {/* Title of the section */}

      <Row aria-busy={isLoading}>
        <div className="title-text">{t("all-orders.title")}</div>

        {/* Map through the allOrders and render AdminOrderItem for each order */}
        {!isLoading ? (
          allOrders && allOrders?.length > 0 ? (
            allOrders.map((order, index) => {
              return (
                <AdminOrderItem
                  key={order?._id}
                  order={order}
                  userName={userName}
                  index={index}
                />
              );
            })
          ) : (
            <ItemsNotFound msg={t("all-orders.notFound")} />
          )
        ) : (
          <SpinnerComponent msg={t("all-orders.notFound")} />
        )}

        {pageCount > 1 ? (
          // Pagination component to navigate through pages
          <PaginationComponent
            pageCount={pageCount}
            onPress={getSelectedPageNumber}
          />
        ) : null}
      </Row>
    </div>
  );
};

// Export the component as default
export default AdminAllOrders;
