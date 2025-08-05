/* eslint-disable react/prop-types */

// Import Components from React Bootstrap
import { Row } from "react-bootstrap";

// Import Custom Components
import SpinnerComponent from "../Utility/SpinnerComponent";
import ItemsNotFound from "../Utility/ItemsNotFound";

// Import Custom Components
import BrandCard from "./BrandCard";

// Import Hooks from react-i18next for translations
import { useTranslation } from "react-i18next";

// Component responsible for displaying the brand cards in a row
const BrandContainer = ({ brands = [], loading }) => {
  const { t } = useTranslation("home");

  return (
    <Row
      className="my-2 d-flex justify-content-between"
      role="list"
      aria-label={t("homeMostCommonBrandsTitle")}
    >
      {loading ? (
        <SpinnerComponent msg={t("homeLoadingBrandsAriaLabel")} />
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
        <ItemsNotFound msg={t("homeThereIsNoMostCommonBrands")} />
      )}
    </Row>
  );
};

export default BrandContainer;
