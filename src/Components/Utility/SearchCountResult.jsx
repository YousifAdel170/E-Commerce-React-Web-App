/* eslint-disable react/prop-types */
import UnopDropdown from "unop-react-dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./SearchCountResult.css";

// Create a safe dropdown trigger button
const DropdownTrigger = ({ children, ...props }) => {
  const { show, hide, ...safeProps } = props;
  return (
    <button
      type="button"
      {...safeProps}
      className="sort-div"
      aria-haspopup="listbox"
      aria-expanded="false"
    >
      {children}
    </button>
  );
};

const SearchCountResult = ({ title, onClickGetProduct }) => {
  const { t } = useTranslation("shopProducts");
  const isDark = useSelector((state) => state.ui.isDark);

  const currentSort = localStorage.getItem("sortType") || "";

  const sortOptions = [
    { key: "", label: t("sortOptions.none") },
    { key: "الاكثر مبيعا", label: t("sortOptions.bestSelling") },
    { key: "الاعلي تقييما", label: t("sortOptions.topRated") },
    { key: "السعر من الاقل للاعلي", label: t("sortOptions.priceLowToHigh") },
    { key: "السعر من الاعلي للاقل", label: t("sortOptions.priceHighToLow") },
  ];

  const handleSort = (key) => {
    if (key !== currentSort) {
      localStorage.setItem("sortType", key);
      onClickGetProduct();
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center pt-3">
      {/* Live region for announcing result count */}
      <div className="sub-title" aria-live="polite">
        {title}
      </div>

      {/* Sort Dropdown */}
      <div className="search-count-text d-flex align-items-center">
        <UnopDropdown
          onAppear={() => {}}
          onDisappearStart={() => {}}
          delay={0}
          align="CENTER"
          hover
          trigger={
            <DropdownTrigger>
              <FontAwesomeIcon icon={faSort} className="mx-2" />
              {t("sortBy")}
            </DropdownTrigger>
          }
        >
          <div
            className={`card-filter ${isDark ? "dark-theme" : "light-theme"}`}
            role="listbox"
            aria-label={t("sortOptionsLabel")}
          >
            {sortOptions.map(({ key, label }, index) => (
              <div
                key={index}
                className={`card-filter-item ${
                  key === currentSort ? "active-sort" : ""
                }`}
                role="option"
                aria-selected={key === currentSort}
                tabIndex={0}
                onClick={() => handleSort(key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSort(key);
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </UnopDropdown>
      </div>
    </div>
  );
};

export default SearchCountResult;
