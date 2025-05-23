// Import Components from React Bootstrap
import { Row } from "react-bootstrap";

// Import Custom Components
import AdminOrderItem from "./AdminOrderItem";
import PaginationComponent from "../Utility/PaginationComponent";

// Import Custom Hooks
import ViewAllOrdersHook from "../../hooks/Utility/ViewAllOrdersHook";

// Import Constant Data
import { adminData } from "../../data/admin/adminData";

// Component responsible for rendering all orders in the admin panel
const AdminAllOrders = () => {
  // Custom hook to manage state and logic for the component
  const [allOrders, , pageCount, onPress, userName] = ViewAllOrdersHook();

  return (
    <div>
      {/* Title of the section */}
      <div className="title-text">{adminData?.allOrders?.title}</div>

      <Row className="all-products">
        {/* Map through the allOrders and render AdminOrderItem for each order */}
        {allOrders ? (
          allOrders.map((order) => (
            <AdminOrderItem
              key={order?._id}
              order={order}
              userName={userName}
            />
          ))
        ) : (
          // If no orders found, display a message
          <h6>{adminData.allOrders.notFound}</h6>
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
