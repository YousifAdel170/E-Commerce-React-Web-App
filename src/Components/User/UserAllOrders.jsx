import { Row } from "react-bootstrap";
import UserOrderItem from "./UserOrderItem";
import PaginationComponent from "../Utility/PaginationComponent";
import ViewAllOrdersHook from "../../hooks/Utility/ViewAllOrdersHook";

const UserAllOrders = () => {
  const [allOrders, numberOfOrders, pageCount, onPress] = ViewAllOrdersHook();
  return (
    <div>
      <div className="admin-content-text pb-4">
        عدد الطلبات: {numberOfOrders}
      </div>
      <Row className="justify-content-between">
        {allOrders ? (
          allOrders.map((order) => (
            <UserOrderItem key={order._id || ""} order={order || []} />
          ))
        ) : (
          <h6>لا يوجد طلبات حاليا</h6>
        )}
      </Row>

      {pageCount > 1 ? (
        <PaginationComponent pageCount={pageCount} onPress={onPress} />
      ) : null}
    </div>
  );
};

export default UserAllOrders;
