import { Row } from "react-bootstrap";
import AdminProductCard from "./AdminProductCard";

const AdminAllProducts = () => {
  return (
    <div>
      <div className="admin-content-text">ادارة جميع المنتجات</div>
      <Row>
        <AdminProductCard />
        <AdminProductCard />
        <AdminProductCard />
        <AdminProductCard />
        <AdminProductCard />
        <AdminProductCard />
      </Row>
    </div>
  );
};

export default AdminAllProducts;
