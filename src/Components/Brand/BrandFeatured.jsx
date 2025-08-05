/* eslint-disable react/prop-types */

// Import Components from React Bootstrap
import { Container, Row } from "react-bootstrap";

// Import Hooks from react-i18next for translations
import { useTranslation } from "react-i18next";

// Import Custom Components
import SubTitle from "../Utility/SubTitle";
import BrandCard from "./BrandCard";
import SpinnerComponent from "../Utility/SpinnerComponent";
import ItemsNotFound from "../Utility/ItemsNotFound";

// Import Custom Hook for fetching brands
import HomeBrandHook from "../../hooks/brand/HomeBrandHook";

// Component responsible for displaying featured brands on the home page
const BrandFeatured = ({ title, btnTitle }) => {
  // Using the custom hook to fetch brands data + t for translations
  const { t } = useTranslation("home");
  const [brands, loading] = HomeBrandHook();

  // Check if brands are available and loading is complete
  const showBrands = !loading && Array.isArray(brands) && brands.length > 0;

  return (
    <Container
      className="brand-featured-container my-4"
      aria-labelledby="featured-brands-heading"
    >
      <SubTitle title={title} btnTitle={btnTitle} path="all-brands" />
      <Row
        className="my-2 d-flex justify-content-between"
        role="region"
        aria-label={t("homeMostCommonBrandsTitle")}
      >
        {loading ? (
          <SpinnerComponent msg={t("homeLoadingBrandsAriaLabel")} />
        ) : showBrands ? (
          brands.map((item, index) => (
            <BrandCard
              key={item._id}
              id={item._id}
              img={item.image}
              index={index}
            />
          ))
        ) : (
          <ItemsNotFound msg={t("homeThereIsNoMostCommonBrands")} />
        )}
      </Row>
    </Container>
  );
};

export default BrandFeatured;
