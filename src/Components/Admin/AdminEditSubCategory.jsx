import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AdminEditSubCategoryHook from "../../hooks/subCategory/AdminEditSubCategoryHook";
import { useTranslation } from "react-i18next";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";
import { INPUT_TYPES } from "../../constants/inputs";
import SpinnerComponent from "../Utility/SpinnerComponent";

const AdminEditSubCategory = () => {
  const { id } = useParams();
  const [subcategoryName, onChangeName, handleSubmit, isPress] =
    AdminEditSubCategoryHook(id);

  const [sectionRef, isVisible] = useInviewAnimation();

  const { t } = useTranslation("categories");

  return (
    <div>
      <div className="title-text">{t("subcategory.editTitle")}</div>
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
            {/* sub category Name */}
            <div className="mb-3">
              <label className="form-label card-item-text">
                {t("subcategory.name")}
              </label>
              <input
                type={INPUT_TYPES.TEXT}
                value={subcategoryName}
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
                aria-label={t("subcategory.saveButton")}
                disabled={isPress}
              >
                {" "}
                {isPress ? (
                  <SpinnerComponent className={"mx-2"} size={"sm"} />
                ) : (
                  ""
                )}
                {t("subcategory.saveButton")}
              </button>
            </div>
          </form>
        </div>
      </Row>

      <ToastContainer />
    </div>
  );
};
export default AdminEditSubCategory;
