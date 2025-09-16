import { Row } from "react-bootstrap";
import AdminCouponCard from "./AdminCouponCard";
import PaginationComponent from "../Utility/PaginationComponent";
import AdminViewAllCouponsHook from "../../hooks/coupon/AdminViewAllCouponsHook";
import { useTranslation } from "react-i18next";
import ItemsNotFound from "../Utility/ItemsNotFound";
import { ToastContainer } from "react-toastify";

const AdminAllCoupons = () => {
  const [coupons, couponsPageCount, onPress] = AdminViewAllCouponsHook();

  const { t } = useTranslation("coupons");
  return (
    <div>
      {/* Title of the section */}
      <div className="title-text">{t("availableCoupons")}</div>

      <Row>
        {/* Available Coupons */}
        {coupons ? (
          coupons.map((item, index) => {
            return <AdminCouponCard key={index} coupon={item} index={index} />;
          })
        ) : (
          <ItemsNotFound msg={t("noCoupons")} />
        )}
      </Row>

      {/* Handle The Pagination */}
      {couponsPageCount > 1 ? (
        <PaginationComponent pageCount={couponsPageCount} onPress={onPress} />
      ) : null}

      <ToastContainer />
    </div>
  );
};

export default AdminAllCoupons;
