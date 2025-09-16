import { Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AdminAddSubCategoryHook from "../../hooks/subCategory/AdminAddSubCategoryHook";
import { useTranslation } from "react-i18next";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";
import { INPUT_TYPES } from "../../constants/inputs";

const AdminAddSubCategory = () => {
  const [name, category, handleChange, handleSubmit, onChangeName] =
    AdminAddSubCategoryHook();

  const { t } = useTranslation("categories");

  const [sectionRef, isVisible] = useInviewAnimation();

  return (
    <div>
      <div className="title-text">{t("subcategory.addNew")}</div>

      <Row className="justify-content-start ">
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
            {/* sub category Name */}
            <div className="mb-3">
              <label className="form-label card-item-text">
                {t("categoryName")}
              </label>
              <select
                name="category"
                id="cat"
                className="select px-3 "
                onChange={handleChange}
              >
                <option value="0">{t("subcategory.selectMainCategory")}</option>
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

            {/* sub category Name */}
            <div className="mb-3">
              <label className="form-label card-item-text">
                {t("subcategory.name")}
              </label>
              <input
                type={INPUT_TYPES.TEXT}
                value={name}
                onChange={onChangeName}
                className="form-control"
                placeholder={t("subcategory.namePlaceholder")}
              />
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type={INPUT_TYPES.SUBMIT}
                className="btn btn-primary"
                aria-label={t("subcategory.save")}
              >
                {t("subcategory.save")}
              </button>
            </div>
          </form>
        </div>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminAddSubCategory;
