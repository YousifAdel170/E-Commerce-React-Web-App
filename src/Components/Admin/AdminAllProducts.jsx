/* eslint-disable react/prop-types */

import { Row } from "react-bootstrap";
import AdminProductCard from "./AdminProductCard";

const AdminAllProducts = ({ items, onDelete }) => {
  return (
    <div>
      <div className="admin-content-text">ادارة جميع المنتجات</div>
      <Row>
        {items?.length ? (
          items.map((item, index) => (
            <AdminProductCard key={index} item={item} onDelete={onDelete} />
          ))
        ) : (
          <h4>لا يوجد منتجات الان</h4>
        )}
      </Row>
    </div>
  );
};

export default AdminAllProducts;
