import { Row } from "react-bootstrap";
import SidebarSearchHook from "../../hooks/search/SidebarSearchHook";
import { useTranslation } from "react-i18next";
import "./SideFilter.css";

const SideFilter = () => {
  const { t } = useTranslation("shopProducts");

  const [
    categoriesData,
    brandsData,
    clickCategory,
    clickBrand,
    priceFromUpdate,
    priceToUpdate,
  ] = SidebarSearchHook();

  const localFrom = localStorage.getItem("priceFrom");
  const localTo = localStorage.getItem("priceTo");

  return (
    <div
      className="side-filter-container"
      role="region"
      aria-labelledby="filter-heading"
    >
      <h2 id="filter-heading" className="visually-hidden">
        {t("filters")}
      </h2>

      <Row>
        {/* Categories */}
        <section aria-labelledby="category-filter">
          <div className="filter-section mt-3">
            <div className="filter-title" id="category-filter">
              {t("category")}
            </div>

            <div className="filter-option">
              <input
                id="all-categories"
                type="checkbox"
                value="0"
                onChange={clickCategory}
              />
              <label htmlFor="all-categories">{t("all")}</label>
            </div>

            {categoriesData?.length > 0 ? (
              categoriesData.map((item) => (
                <div key={item._id} className="filter-option">
                  <input
                    id={`category-${item._id}`}
                    type="checkbox"
                    value={item._id}
                    onChange={clickCategory}
                  />
                  <label htmlFor={`category-${item._id}`}>{item.name}</label>
                </div>
              ))
            ) : (
              <p className="filter-sub">{t("noCategories")}</p>
            )}
          </div>
        </section>

        {/* Brands */}
        <section aria-labelledby="brand-filter">
          <div className="filter-section mt-3">
            <div className="filter-title" id="brand-filter">
              {t("brand")}
            </div>

            <div className="filter-option">
              <input
                id="all-brands"
                type="checkbox"
                value="0"
                onChange={clickBrand}
              />
              <label htmlFor="all-brands">{t("all")}</label>
            </div>

            {brandsData?.length > 0 ? (
              brandsData.map((item) => (
                <div key={item._id} className="filter-option">
                  <input
                    id={`brand-${item._id}`}
                    type="checkbox"
                    value={item._id}
                    onChange={clickBrand}
                  />
                  <label htmlFor={`brand-${item._id}`}>{item.name}</label>
                </div>
              ))
            ) : (
              <p className="filter-sub">{t("noBrands")}</p>
            )}
          </div>
        </section>

        {/* Price Filter */}
        <section aria-labelledby="price-filter">
          <div className="filter-section mt-3">
            <div className="filter-title" id="price-filter">
              {t("price")}
            </div>

            {/* Price From */}
            <div className="filter-price">
              <label htmlFor="price-from">{t("from")}</label>
              <div className="number-wrapper">
                <input
                  id="price-from"
                  value={localFrom || ""}
                  onChange={priceFromUpdate}
                  className="text-center"
                  type="number"
                  inputMode="numeric"
                  aria-label={t("from")}
                />
                <button
                  type="button"
                  className="arrow up"
                  aria-label={t("increase")}
                  onClick={() =>
                    priceFromUpdate({
                      target: {
                        value: parseInt(localFrom || 0) + 1,
                      },
                    })
                  }
                />
                <button
                  type="button"
                  className="arrow down"
                  aria-label={t("decrease")}
                  onClick={() =>
                    priceFromUpdate({
                      target: {
                        value: Math.max(0, parseInt(localFrom || 0) - 1),
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Price To */}
            <div className="filter-price">
              <label htmlFor="price-to">{t("to")}</label>
              <div className="number-wrapper">
                <input
                  id="price-to"
                  value={localTo || ""}
                  onChange={priceToUpdate}
                  className="text-center"
                  type="number"
                  inputMode="numeric"
                  aria-label={t("to")}
                />
                <button
                  type="button"
                  className="arrow up"
                  aria-label={t("increase")}
                  onClick={() =>
                    priceToUpdate({
                      target: {
                        value: parseInt(localTo || 0) + 1,
                      },
                    })
                  }
                />
                <button
                  type="button"
                  className="arrow down"
                  aria-label={t("decrease")}
                  onClick={() =>
                    priceToUpdate({
                      target: {
                        value: Math.max(0, parseInt(localTo || 0) - 1),
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </Row>
    </div>
  );
};

export default SideFilter;
