import { Row } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import AdminAddBrandHook from "../../hooks/brand/AdminAddBrandHook";
import { useTranslation } from "react-i18next";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";
import { INPUT_TYPES } from "../../constants/inputs";
import SpinnerComponent from "../Utility/SpinnerComponent";

const AdminAddBrand = () => {
  const [image, name, isPress, handleSubmit, onImageChange, onChangeName] =
    AdminAddBrandHook();

  const { t } = useTranslation("brands");
  const [sectionRef, isVisible] = useInviewAnimation();

  return (
    <div>
      <div className="title-text">{t("addBrand.title")}</div>
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
            {/* Brand Name */}
            <div className="mb-3">
              <label htmlFor="brand-name" className="form-label card-item-text">
                {t("editBrand.brandNameLabel")}
              </label>
              <input
                id="brand-name"
                type={INPUT_TYPES.TEXT}
                onChange={onChangeName}
                value={name}
                className="form-control"
                placeholder={t("editBrand.brandNamePlaceholder")}
                aria-label={t("editBrand.brandNameAria")}
              />
            </div>

            {/* Brand Logo */}
            <div className="mb-3">
              <label
                htmlFor="upload-photo"
                className="form-label card-item-text d-flex"
              >
                {t("editBrand.brandLogoLabel")}
              </label>

              <div className="custom-file-wrapper">
                <label
                  htmlFor="upload-photo"
                  className="custom-file-label"
                  aria-label={t("editBrand.brandLogoAria")}
                >
                  <img
                    src={image}
                    alt={t("editBrand.brandLogoAlt")}
                    height="100px"
                    width="120px"
                    className="file-preview"
                  />
                  <span className="file-text">
                    {t("editBrand.chooseFileText")}
                  </span>
                </label>

                {/* Hidden Native Input */}
                <input
                  type={INPUT_TYPES.FILE}
                  name="photo"
                  onChange={onImageChange}
                  id="upload-photo"
                  aria-label={t("editBrand.brandLogoAria")}
                  className="file-input"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type={INPUT_TYPES.SUBMIT}
                className="btn btn-primary"
                aria-label={t("editBrand.saveChanges.aria")}
                disabled={isPress}
              >
                {isPress ? (
                  <SpinnerComponent className={"mx-2"} size={"sm"} />
                ) : (
                  ""
                )}
                {t("addBrand.saveButton")}
              </button>
            </div>
          </form>
        </div>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminAddBrand;
