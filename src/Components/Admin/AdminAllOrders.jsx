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

// Component responsible for rendering all orders in the admin panel
const AdminAllOrders = () => {
  // Custom hook to manage state and logic for the component
  const [allOrders, , pageCount, onPress, userName] = ViewAllOrdersHook();

  const { t } = useTranslation("admin"); // Translation function for admin namespace

  return (
    <div>
      {/* Title of the section */}
      <div className="title-text">{t("all-orders.title")}</div>

      <Row>
        {/* Map through the allOrders and render AdminOrderItem for each order */}
        {allOrders ? (
          allOrders.map((order, index) => (
            <AdminOrderItem
              key={order?._id}
              order={order}
              userName={userName}
              index={index}
            />
          ))
        ) : (
          // If no orders are found, display a message
          <ItemsNotFound msg={t("all-orders.notFound")} />
        )}

        {pageCount > 1 ? (
          // Pagination component to navigate through pages
          <PaginationComponent pageCount={pageCount} onPress={onPress} />
        ) : null}
      </Row>
    </div>
  );
};

// Export the component as default
export default AdminAllOrders;
