/* eslint-disable react/prop-types */

// Import Components from React Bootstrap
import { Row, Spinner } from "react-bootstrap";

// Import Custom Components
import BrandCard from "./BrandCard";

// i18n
import { useTranslation } from "react-i18next";

// Redux
import { useSelector } from "react-redux";

// Component responsible for displaying the brand cards in a row
const BrandContainer = ({ brands = [], loading }) => {
  const { t } = useTranslation("home");

  const isDark = useSelector((state) => state.ui.isDark);
  const spinnerVariant = isDark ? "light" : "dark";

  return (
    <Row
      className="my-2 d-flex justify-content-between"
      role="list"
      aria-label={t("homeMostCommonBrandsTitle")}
    >
      {loading ? (
        <Spinner
          className="mx-auto"
          animation="border"
          variant={spinnerVariant}
          role="status"
          aria-label={t("homeLoadingCategoriesAriaLabel")}
        />
      ) : brands.length > 0 ? (
        brands.map((item, index) => (
          <BrandCard
            key={item._id}
            id={item._id}
            img={item.image}
            index={index}
          />
        ))
      ) : (
        <div
          className="text-center w-100 py-4"
          role="alert"
          aria-live="polite"
          style={{ color: "var(--focus-color)" }}
        >
          <h4
            className="text-center w-100"
            role="note"
            aria-live="polite"
            style={{
              fontSize: "1.1rem",
              padding: "1rem",
            }}
          >
            {t("homeThereIsNoMostCommonBrands")}
          </h4>
        </div>
      )}
    </Row>
  );
};

export default BrandContainer;
