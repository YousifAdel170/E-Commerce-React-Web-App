import { Row } from "react-bootstrap";

import Multiselect from "multiselect-react-dropdown";

import { CompactPicker } from "react-color";

import { ToastContainer } from "react-toastify";
import AdminAddProductHook from "../../hooks/products/AdminAddProductHook";
import MultipleImageInput from "react-multiple-image-input";
import { useTranslation } from "react-i18next";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";
import { INPUT_TYPES } from "../../constants/inputs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const AdminAddProduct = () => {
  const [
    categoryID,
    brandID,
    onChangeDesName,
    onChangeQty,
    onChangeColor,
    onChangePriceAfter,
    onChangePriceBefor,
    onChangeProdName,
    showColor,
    category,
    brand,
    priceAfter,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    handleChangeComplete,
    removeColor,
    onSelectCategory,
    handleSubmit,
    onSelectBrand,
    colors,
    priceBefore,
    qty,
    productDescription,
    productName,
  ] = AdminAddProductHook();

  const { t } = useTranslation("product");
  const [sectionRef, isVisible] = useInviewAnimation();

  const { isDark } = useSelector((state) => state.ui);

  return (
    <div>
      <div className="title-text">{t("addProducts.addNewTitle")}</div>

      <Row>
        <div
          className={`card-container card-animate card-description-container  box-shadow-lift my-3   ${
            isVisible ? "fade-in" : ""
          }`}
          ref={sectionRef}
          style={{
            animationDelay: `${0.1}s`,
          }}
        >
          <form onSubmit={handleSubmit} className="p-3">
            {/* Product Name */}
            <div className="mb-3">
              <label
                htmlFor="product-name"
                className="form-label card-item-text"
              >
                {t("addProducts.nameTitle")}
              </label>
              <input
                id="product-name"
                type={INPUT_TYPES.TEXT}
                onChange={onChangeProdName}
                value={productName}
                className="form-control"
                placeholder={t("addProducts.namePlaceholder")}
                aria-label={t("addProducts.namePlaceholder")}
              />
            </div>

            {/* Product Images */}
            <div className="mb-3">
              <label
                htmlFor="product-images"
                className="form-label card-item-text"
              >
                {t("addProducts.imagesLabel")}
              </label>
              <MultipleImageInput
                images={images}
                setImages={setImages}
                theme={`${isDark ? "dark" : "light"}`}
                id={"product-images"}
                allowCrop={false}
                max={4}
              />
            </div>

            {/* Product Description */}
            <div className="mb-3">
              <label
                htmlFor="product-description"
                className="form-label card-item-text"
              >
                {t("addProducts.descriptionTitle")}
              </label>
              <textarea
                className="input-form-area p-2"
                rows="4"
                cols="50"
                placeholder={t("addProducts.descriptionPlaceholder")}
                onChange={onChangeDesName}
                value={productDescription}
              />
            </div>

            {/* Product Price before discount */}
            <div className="mb-3">
              <label
                htmlFor="brand-product-before"
                className="form-label card-item-text"
              >
                {t("addProducts.priceBeforeTitle")}
              </label>
              <input
                id="brand-product-before"
                type={INPUT_TYPES.NUMBER}
                onChange={onChangePriceBefor}
                value={priceBefore}
                className="form-control"
                placeholder={t("addProducts.priceBeforePlaceholder")}
                aria-label={t("addProducts.priceBeforePlaceholder")}
              />
            </div>

            {/* Product Price after discount */}
            <div className="mb-3">
              <label
                htmlFor="brand-product-after"
                className="form-label card-item-text"
              >
                {t("addProducts.priceAfterTitle")}
              </label>

              {/* Price of product */}
              <input
                type={INPUT_TYPES.NUMBER}
                className="form-control"
                placeholder={t("addProducts.priceAfterPlaceholder")}
                aria-label={t("addProducts.priceAfterPlaceholder")}
                id="brand-product-after"
                onChange={onChangePriceAfter}
                value={priceAfter}
              />
            </div>

            {/* Quantity of product */}
            <div className="mb-3">
              <label
                htmlFor="product-quantity"
                className="form-label card-item-text"
              >
                {t("addProducts.quantityTitle")}
              </label>
              <input
                type={INPUT_TYPES.NUMBER}
                className="form-control"
                min={0}
                placeholder={t("addProducts.quantityPlaceholder")}
                aria-label={t("addProducts.quantityPlaceholder")}
                id="product-quantity"
                onChange={onChangeQty}
                value={qty}
              />
            </div>

            {/* Main Category of the product */}
            <div className="mb-3">
              <label
                htmlFor="product-category"
                className="form-label card-item-text"
              >
                {t("addProducts.categoryTitle")}
              </label>
              <select
                name="categories"
                id="category"
                className="select input-form-area"
                onChange={onSelectCategory}
                value={categoryID}
              >
                <option value="0">{t("addProducts.selectCategory")}</option>
                {category.data
                  ? category.data.map((item) => {
                      return (
                        <option key={item?._id} value={item?._id}>
                          {item?.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>

            {/* Subcategory of the product */}
            <div className="mb-3">
              <label
                htmlFor="product-subcategory"
                className="form-label card-item-text"
              >
                {t("addProducts.subcategoryTitle")}
              </label>

              {/* Multiselect (Subcategory) */}
              <Multiselect
                placeholder={t("addProducts.subcategoryPlaceholder")}
                options={options}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="name"
              />
            </div>

            {/* Product brand */}
            <div className="mb-3">
              <label htmlFor="brand-name" className="form-label card-item-text">
                {t("addProducts.brandTitle")}
              </label>

              {/* Select Brand */}
              <select
                name="brand"
                id="brand-name"
                className="select input-form-area"
                onChange={onSelectBrand}
                value={brandID}
              >
                <option value="0">{t("addProducts.selectBrand")}</option>
                {brand.data
                  ? brand.data.map((item) => {
                      return (
                        <option key={item?._id} value={item?._id}>
                          {item?.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>

            {/* Product Colors */}
            <div className="mb-3">
              <label className="form-label card-item-text">
                {t("addProducts.colorsLabel")}
              </label>

              <div className="d-flex">
                {colors.length > 0
                  ? colors.map((color, index) => (
                      <div
                        onClick={() => removeColor(color)}
                        key={index}
                        className="color mx-2 border"
                        style={{ backgroundColor: `${color}` }}
                      ></div>
                    ))
                  : null}

                {/* FontAwesome Add Color Icon */}
                <FontAwesomeIcon
                  icon={faPlus}
                  size="2x"
                  className="mx-2 cursor-pointer"
                  onClick={onChangeColor}
                  title={t("addProducts.colorAlt")}
                />

                {showColor ? (
                  <CompactPicker onChangeComplete={handleChangeComplete} />
                ) : null}
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button className="btn btn-primary" onClick={handleSubmit}>
                {t("addProducts.addButton")}
              </button>
            </div>
          </form>
        </div>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminAddProduct;
