import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AdminEditBrandHook from "../../hooks/brand/AdminEditBrandHook";
import { useTranslation } from "react-i18next";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";
import { INPUT_TYPES } from "../../constants/inputs";
import SpinnerComponent from "../Utility/SpinnerComponent";

const AdminEditBrand = () => {
  const { id } = useParams();
  const [
    brandName,
    brandImage,
    onChangeName,
    onChangeImage,
    handleSubmit,
    isPress,
  ] = AdminEditBrandHook(id);

  const { t } = useTranslation("brands");
  const [sectionRef, isVisible] = useInviewAnimation();

  return (
    <div>
      {/* Page Title */}
      <div className="title-text">{t("editBrand.editBrandTitle")}</div>

      <Row>
        <div
          className={`card-container card-animate card-description-container box-shadow-lift my-3 ${
            isVisible ? "fade-in" : ""
          }`}
          ref={sectionRef}
          style={{ animationDelay: `${0.1}s` }}
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
                value={brandName}
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
                    src={brandImage}
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
                  onChange={onChangeImage}
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
                {t("editBrand.saveChanges.text")}
              </button>
            </div>
          </form>
        </div>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminEditBrand;
