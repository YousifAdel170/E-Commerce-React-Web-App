import Slider from "../../Components/Home/Slider";
import HomeCategory from "../../Components/Home/HomeCategory";
import ProductCardContainer from "../../Components/Products/ProductCardContainer";
import DiscountSection from "../../Components/Home/DiscountSection";
import BrandFeatured from "../../Components/Brand/BrandFeatured";

const HomePage = () => {
  return (
    <div className="font" style={{ minHeight: "670px" }}>
      <Slider />
      <HomeCategory />
      <ProductCardContainer
        title={"الاكثر مبيعا"}
        btnTitle={"المزيد"}
        path={"products"}
      />
      <DiscountSection />
      <ProductCardContainer
        title={"احدث الازياء"}
        btnTitle={"المزيد"}
        path={"products"}
      />
      <BrandFeatured title={"اشهر الماركات"} btnTitle={"المزيد"} />
    </div>
  );
};

export default HomePage;
