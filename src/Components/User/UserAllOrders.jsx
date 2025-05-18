// Import layout component from React Bootstrap
import { Row } from "react-bootstrap";

// Import component to render each order
import UserOrderItem from "./UserOrderItem";

// Import pagination component for navigating between pages
import PaginationComponent from "../Utility/PaginationComponent";

// Import custom hook to fetch all user orders
import ViewAllOrdersHook from "../../hooks/Utility/ViewAllOrdersHook";

// Component to display all orders made by the user
const UserAllOrders = () => {
  // Get all orders, total number of orders, page count, and pagination function from the hook
  const [allOrders, numberOfOrders, pageCount, onPress] = ViewAllOrdersHook();

  return (
    <div>
      {/* Orders Count Title */}
      <div className="admin-content-text pb-4">
        عدد الطلبات: {numberOfOrders}
      </div>

      {/* Show all orders if available, otherwise display message */}
      <Row className="justify-content-between">
        {allOrders ? (
          allOrders.map((order) => (
            // Render order item component
            <UserOrderItem key={order._id || ""} order={order || []} />
          ))
        ) : (
          <h6>لا يوجد طلبات حاليا</h6>
        )}
      </Row>

      {/* Show pagination only if there is more than one page */}
      {pageCount > 1 ? (
        <PaginationComponent pageCount={pageCount} onPress={onPress} />
      ) : null}
    </div>
  );
};

// Export the component
export default UserAllOrders;
