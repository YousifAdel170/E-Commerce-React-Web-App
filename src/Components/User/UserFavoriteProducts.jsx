// Import layout component from React Bootstrap
import { Row } from "react-bootstrap";

// Import component to display product cards
import ProductCardContainer from "../Products/ProductCardContainer";

// Import custom hook to get user's favorite products
import UserFavoriteProductsHook from "../../hooks/products/wishList/UserFavoriteProductsHook";

// Component to display the user's favorite products
const UserFavoriteProducts = () => {
  // Get favorite items using the custom hook
  const [items] = UserFavoriteProductsHook();

  return (
    <div>
      {/* Section title */}
      <div className="title-text pb-4">قائمة المفضلة</div>

      <Row>
        {/* If there are favorite items, show them in product cards */}
        {items.length > 0 ? (
          <ProductCardContainer products={items} title="" btnTitle="" />
        ) : (
          // Otherwise, show a message indicating no favorites
          <h6> لا يوجد منتجات مفضلة الان</h6>
        )}
      </Row>
    </div>
  );
};

// Export the component
export default UserFavoriteProducts;
