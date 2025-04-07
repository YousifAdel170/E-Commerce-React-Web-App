import { Col, Row } from "react-bootstrap";
import AdminCouponCard from "./AdminCouponCard";
import PaginationComponent from "../Utility/PaginationComponent";
import AdminViewAllCouponsHook from "../../hooks/coupon/AdminViewAllCouponsHook";

const AdminAllCoupons = () => {
  const [coupons, couponsPageCount, onPress] = AdminViewAllCouponsHook();
  return (
    <Row>
      <Col>
        {/* Available Coupons */}
        <div className="admin-content-text">الكوبونات المتاحة</div>
        {coupons ? (
          coupons.map((item, index) => {
            return <AdminCouponCard key={index} coupon={item} />;
          })
        ) : (
          <h6>لا يوجد كوبونات حتى الان</h6>
        )}
      </Col>

      {/* Handle The Pagination */}
      {couponsPageCount > 1 ? (
        <PaginationComponent pageCount={couponsPageCount} onPress={onPress} />
      ) : null}
    </Row>
  );
};

export default AdminAllCoupons;
