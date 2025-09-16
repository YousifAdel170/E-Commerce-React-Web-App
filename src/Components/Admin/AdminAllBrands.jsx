import { Row } from "react-bootstrap";
import PaginationComponent from "../Utility/PaginationComponent";
import AllBrandPageHook from "../../hooks/brand/AllBrandPageHook";
import AdminBrandCard from "./AdminBrandCard";
import { useTranslation } from "react-i18next";
import ItemsNotFound from "../Utility/ItemsNotFound";
import { ToastContainer } from "react-toastify";

const AdminAllBrands = () => {
  const [brands, , pageCount, getSelectedPageNumber] = AllBrandPageHook();

  const { t } = useTranslation("brands");

  return (
    <div>
      <Row>
        {/* Available Coupons */}
        <div className="title-text">{t("brandCard.availableBrands")}</div>
        {brands ? (
          brands.map((item, index) => {
            return <AdminBrandCard key={index} brand={item} index={index} />;
          })
        ) : (
          <ItemsNotFound msg={t("brandCard.noBrands")} />
        )}
      </Row>

      {/* Handle The Pagination */}
      {pageCount > 1 ? (
        <PaginationComponent
          pageCount={pageCount}
          onPress={getSelectedPageNumber}
        />
      ) : null}

      <ToastContainer />
    </div>
  );
};

export default AdminAllBrands;
