import { Row } from "react-bootstrap";
import ProductCardContainer from "../Products/ProductCardContainer";
import UserFavoriteProductsHook from "../../hooks/products/wishList/UserFavoriteProductsHook";

const UserFavoriteProducts = () => {
  const [items] = UserFavoriteProductsHook();
  return (
    <div>
      <div className="admin-content-text pb-4">قائمة المفضلة</div>
      <Row>
        {items.length > 0 ? (
          <ProductCardContainer products={items} title="" btnTitle="" />
        ) : (
          <h6> لا يوجد منتجات مفضلة الان</h6>
        )}
      </Row>
    </div>
  );
};

export default UserFavoriteProducts;
