import { Row } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import AdminAddCategoryHook from "../../hooks/category/AdminAddCategoryHook";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";
import { useTranslation } from "react-i18next";
import { INPUT_TYPES } from "../../constants/inputs";
import SpinnerComponent from "../Utility/SpinnerComponent";

const AdminAddCategory = () => {
  const [image, name, isPress, handleSubmit, onImageChange, onChangeName] =
    AdminAddCategoryHook();

  const { t } = useTranslation("categories");
  const [sectionRef, isVisible] = useInviewAnimation();

  return (
    <div>
      <div className="title-text">{t("addCategory.title")}</div>
      <Row>
        <div
          className={`card-container card-animate card-description-container box-shadow-lift my-3 ${
            isVisible ? "fade-in" : ""
          }`}
          ref={sectionRef}
          style={{ animationDelay: `${0.1}s` }}
        >
          <form onSubmit={handleSubmit} className="p-3">
            {/* Category Name */}
            <div className="mb-3">
              <label
                htmlFor="category-name"
                className="form-label card-item-text"
              >
                {t("adminEditCategory.nameLabel")}
              </label>
              <input
                id="category-name"
                type={INPUT_TYPES.TEXT}
                onChange={onChangeName}
                value={name}
                className="form-control"
                placeholder={t("adminEditCategory.namePlaceholder")}
                aria-label={t("adminEditCategory.namePlaceholder")}
              />
            </div>

            {/* category Logo */}
            <div className="mb-3">
              <label
                htmlFor="upload-photo"
                className="form-label card-item-text d-flex"
              >
                {t("adminEditCategory.imageLabel")}
              </label>

              <div className="custom-file-wrapper">
                <label
                  htmlFor="upload-photo"
                  className="custom-file-label"
                  aria-label={t("adminEditCategory.imageLabel")}
                >
                  <img
                    src={image}
                    alt={t("adminEditCategory.imageLabel")}
                    height="100px"
                    width="120px"
                    className="file-preview"
                  />
                  <span className="file-text">
                    {t("adminEditCategory.uploadAlt")}
                  </span>
                </label>

                {/* Hidden Native Input */}
                <input
                  type={INPUT_TYPES.FILE}
                  name="photo"
                  onChange={onImageChange}
                  id="upload-photo"
                  aria-label={t("adminEditCategory.uploadAlt")}
                  className="file-input"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type={INPUT_TYPES.SUBMIT}
                className="btn btn-primary"
                aria-label={t("addCategory.saveButton")}
                disabled={isPress}
              >
                {isPress ? (
                  <SpinnerComponent className={"mx-2"} size={"sm"} />
                ) : (
                  ""
                )}
                {t("addCategory.saveButton")}
              </button>
            </div>
          </form>
        </div>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminAddCategory;
