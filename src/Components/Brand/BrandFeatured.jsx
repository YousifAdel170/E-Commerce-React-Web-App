/* eslint-disable react/prop-types */
import { Container, Row, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// Components
import SubTitle from "../Utility/SubTitle";
import BrandCard from "./BrandCard";

// Hook
import HomeBrandHook from "../../hooks/brand/HomeBrandHook";
import { useSelector } from "react-redux";

// Featured Brands Section
const BrandFeatured = ({ title, btnTitle }) => {
  const { t } = useTranslation("home");
  const [brands, loading] = HomeBrandHook();

  const showBrands = !loading && Array.isArray(brands) && brands.length > 0;

  // Detect current theme from the HTML tag class
  const isDark = useSelector((state) => state.ui.isDark);
  const spinnerVariant = isDark ? "light" : "dark";

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
          <Spinner
            className="mx-auto mb-4"
            animation="border"
            variant={spinnerVariant}
            role="status"
            aria-label={t("homeLoadingCategoriesAriaLabel")}
          />
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
          <h4
            className="text-center w-100"
            role="note"
            aria-live="polite"
            style={{
              color: "var(--secondary-text-color)",
              fontSize: "1.1rem",
              padding: "1rem",
            }}
          >
            {t("homeThereIsNoMostCommonBrands")}
          </h4>
        )}
      </Row>
    </Container>
  );
};

export default BrandFeatured;
