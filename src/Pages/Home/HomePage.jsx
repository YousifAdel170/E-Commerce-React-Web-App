// Import Custom Components
import Slider from "../../Components/Home/Slider";
import HomeCategory from "../../Components/Home/HomeCategory";
import ProductCardContainer from "../../Components/Products/ProductCardContainer";
import DiscountSection from "../../Components/Home/DiscountSection";
import BrandFeatured from "../../Components/Brand/BrandFeatured";

// Import Custom Hooks
import ViewHomeProductsHook from "../../hooks/products/ViewHomeProductsHook";
import {
  MOST_SOLD_PRODUCTS_TITLE,
  MORE_BUTTON_TITLE,
  LATEST_FASHION_PRODUCTS_TITLE,
  MOST_COMMMON_BRANDS_TITLE,
} from "../../config";
import FetchWishList from "../../hooks/products/wishList/FetchWishList";

// Page Responsible for displaying the Home Page of the Application
const HomePage = () => {
  // Custom Hook to fetch the products data and the favorite products
  const [items, isLoading] = ViewHomeProductsHook();
  FetchWishList();
  return (
    // Main Container of the Home Page
    <div className="font">
      {/* Slider Component */}
      <Slider />

      {/* The Main Category  */}
      <HomeCategory />

      {/* Most Sold Products */}
      <ProductCardContainer
        products={items}
        isLoading={isLoading}
        title={MOST_SOLD_PRODUCTS_TITLE}
        btnTitle={MORE_BUTTON_TITLE}
        path={"products"}
      />

      {/* Discount */}
      <DiscountSection />

      {/* The Newest Products */}
      <ProductCardContainer
        products={items}
        isLoading={isLoading}
        title={LATEST_FASHION_PRODUCTS_TITLE}
        btnTitle={MORE_BUTTON_TITLE}
        path={"products"}
      />

      {/* Most Common Brands */}
      <BrandFeatured
        title={MOST_COMMMON_BRANDS_TITLE}
        btnTitle={MORE_BUTTON_TITLE}
      />
    </div>
  );
};

export default HomePage;
