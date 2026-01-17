// Import layout component from React Bootstrap
import { Row } from "react-bootstrap";

// Import component to display product cards
import ProductCardContainer from "../Products/ProductCardContainer";

// Import custom hook to get user's favorite products
import UserFavoriteProductsHook from "../../hooks/products/wishList/UserFavoriteProductsHook";

// Import i18n
import { useTranslation } from "react-i18next";

// Import utility components
import ItemsNotFound from "../Utility/ItemsNotFound";
import SpinnerComponent from "../Utility/SpinnerComponent";
import PaginationComponent from "../Utility/PaginationComponent";
import { ToastContainer } from "react-toastify";
import { EMPTY } from "../../constants/general";

// Component to display the user's favorite products
const UserFavoriteProducts = () => {
  // Destructure from the hook
  const [items, isLoading, pageCount, getSelectedPageNumber] =
    UserFavoriteProductsHook();

  // Translation
  const { t } = useTranslation("user");

  return (
    <div>
      <Row aria-busy={isLoading}>
        {/* Section Title */}
        <div className="title-text pb-4">{t("userWishLists.title")}</div>

        {/* Display Products or Empty Message or Spinner */}
        {!isLoading ? (
          items?.length > 0 ? (
            <ProductCardContainer
              products={items}
              title={EMPTY.TEXT}
              btnTitle={EMPTY.TEXT}
            />
          ) : (
            <ItemsNotFound msg={t("userWishLists.noFavoriteProducts")} />
          )
        ) : (
          <SpinnerComponent msg={t("userWishLists.loading")} />
        )}
      </Row>

      {/* Pagination */}
      {pageCount > 1 && (
        <PaginationComponent
          pageCount={pageCount}
          onPress={getSelectedPageNumber}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default UserFavoriteProducts;
