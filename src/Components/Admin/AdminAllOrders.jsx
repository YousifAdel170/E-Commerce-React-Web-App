import { Row } from "react-bootstrap";
import AdminOrderItem from "./AdminOrderItem";
import ViewAllOrdersHook from "../../hooks/Utility/ViewAllOrdersHook";
import PaginationComponent from "../Utility/PaginationComponent";

const AdminAllOrders = () => {
  const [allOrders, , pageCount, onPress, userName] = ViewAllOrdersHook();

  return (
    <div>
      <div className="admin-content-text">ادارة جميع الطلبات</div>
      <Row className="justify-content-start">
        {allOrders ? (
          allOrders.map((order) => (
            <AdminOrderItem key={order._id} order={order} userName={userName} />
          ))
        ) : (
          <h6>لا يوجد طلبات حتى </h6>
        )}

        {pageCount > 1 ? (
          <PaginationComponent pageCount={pageCount} onPress={onPress} />
        ) : null}
      </Row>
    </div>
  );
};

export default AdminAllOrders;
