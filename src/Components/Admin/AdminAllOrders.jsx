import { Row } from "react-bootstrap";
import AdminOrderItem from "./AdminOrderItem";

const AdminAllOrders = () => {
  return (
    <div>
      <div className="admin-content-text">ادارة جميع الطلبات</div>
      <Row className="justify-content-start">
        <AdminOrderItem />
        <AdminOrderItem />
        <AdminOrderItem />
      </Row>
    </div>
  );
};

export default AdminAllOrders;
