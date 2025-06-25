// Import Custom Components
import Slider from "../../Components/Home/Slider";
import HomeCategory from "../../Components/Home/HomeCategory";
import ProductCardContainer from "../../Components/Products/ProductCardContainer";
import DiscountSection from "../../Components/Home/DiscountSection";
import BrandFeatured from "../../Components/Brand/BrandFeatured";

// Import Custom Hooks
import ViewHomeProductsHook from "../../hooks/products/ViewHomeProductsHook";
import FetchWishList from "../../hooks/products/wishList/FetchWishList";

// Import hook for the translation
import { useTranslation } from "react-i18next";

// Page Responsible for displaying the Home Page of the Application
const HomePage = () => {
  // Custom Hook to fetch the products data and the favorite products
  const [items, isLoading] = ViewHomeProductsHook();
  FetchWishList();

  const { t } = useTranslation("home");

  return (
    // Main Container of the Home Page
    <div style={{ flex: "1" }}>
      {/* Slider Component */}
      <Slider />

      {/* The Main Category  */}
      <HomeCategory />

      {/* Most Sold Products */}
      <ProductCardContainer
        products={items}
        isLoading={isLoading}
        title={t("homeMostSoldTitle")}
        btnTitle={t("homeMoreButton")}
        path={"products"}
      />

      {/* Discount */}
      <DiscountSection />

      {/* The Newest Products */}
      <ProductCardContainer
        products={items}
        isLoading={isLoading}
        title={t("homeNewestTitle")}
        btnTitle={t("homeMoreButton")}
        path={"products"}
      />

      {/* Most Common Brands */}
      <BrandFeatured
        title={t("homeMostCommonBrandsTitle")}
        btnTitle={t("homeMoreButton")}
      />
    </div>
  );
};

export default HomePage;
