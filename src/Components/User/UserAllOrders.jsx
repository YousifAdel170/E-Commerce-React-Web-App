// Import Translation Hook
import { useTranslation } from "react-i18next";

// Import layout component from React Bootstrap
import { Row } from "react-bootstrap";

// Import component to render each order
import UserOrderItem from "./UserOrderItem";

// Import pagination component
import PaginationComponent from "../Utility/PaginationComponent";

// Import utility components
import ItemsNotFound from "../Utility/ItemsNotFound";
import SpinnerComponent from "../Utility/SpinnerComponent";

// Import custom hook
import ViewAllOrdersHook from "../../hooks/Utility/ViewAllOrdersHook";

const UserAllOrders = () => {
  const [
    allOrders,
    numberOfOrders,
    pageCount,
    getSelectedPageNumber,
    ,
    isLoading,
  ] = ViewAllOrdersHook();

  const { t } = useTranslation("user");

  return (
    <div>
      {/* Title */}
      <div className="title-text pb-3">{t("userAllOrders.title")}</div>

      {/* Orders Count (shown only if > 0) */}
      {numberOfOrders > 0 && (
        <div className="card-item-text-answer mb-3">
          {t("userAllOrders.count", { count: numberOfOrders })}
        </div>
      )}

      <Row aria-busy={isLoading}>
        {/* Orders / Empty / Loading */}
        {!isLoading ? (
          allOrders?.length > 0 ? (
            allOrders.map((order, index) => (
              <UserOrderItem key={order?._id} order={order} index={index} />
            ))
          ) : (
            <ItemsNotFound msg={t("userAllOrders.notFound")} />
          )
        ) : (
          <SpinnerComponent msg={t("userAllOrders.loading")} />
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <PaginationComponent
            pageCount={pageCount}
            onPress={getSelectedPageNumber}
          />
        )}
      </Row>
    </div>
  );
};

export default UserAllOrders;
