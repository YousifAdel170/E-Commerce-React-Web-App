/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";
import AdminDeleteCategoryHook from "../../hooks/category/AdminDeleteCategoryHook";
import ModalComponent from "../Utility/ModalComponent";

const AdminCategoryCard = ({ category, index }) => {
  const [show, handleClose, handleShow, handelDelete, isPress] =
    AdminDeleteCategoryHook(category);
  const [sectionRef, isVisible] = useInviewAnimation();
  const { t } = useTranslation(["categories", "utilities"]);

  return (
    <div
      className={`card-container card-animate card-description-container box-shadow-lift flex-column my-3 justify-content-around ${
        isVisible ? "fade-in" : ""
      }`}
      ref={sectionRef}
      style={{ animationDelay: `${index * 0.1}s` }}
      role="region"
      aria-label={t("categoryCard.aria.categoryCard", {
        categoryName: category?.name,
      })}
    >
      {/* Delete Confirmation Modal */}
      <ModalComponent
        show={show}
        handleClose={handleClose}
        handleOperation={handelDelete}
        modalTitle={t("utilities:modal.deleteTitle")}
        modalBody={t("utilities:modal.deleteMessage")}
        modalFooter={t("utilities:modal.delete")}
        className="btn-danger"
        ariaLabel={t("utilities:modal.deleteAriaLabel")}
        isPress={isPress}
      />

      {/* Category Name & Actions */}
      <div className="d-flex justify-content-between px-2 w-100">
        <div className="d-flex">
          <div className="card-item-text">{t("categoryName")}:</div>
          <div className="card-item-text-answer d-flex align-items-center">
            {category?.name}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <Link to={`/admin/edit-category/${category?._id}`}>
              <i
                className="fas fa-edit"
                title={t("edit")}
                role="button"
                tabIndex={0}
                aria-label={t("aria.editButton", {
                  categoryName: category?.name,
                })}
              />
            </Link>

            <i
              className="fas fa-trash text-danger mt-0"
              onClick={handleShow}
              title={t("remove")}
              role="button"
              tabIndex={0}
              aria-label={t("aria.removeButton", {
                categoryName: category?.name,
              })}
            />
          </div>
        </div>
      </div>

      {/* Category Image */}
      <div className="px-2 w-100">
        <div className="card-item-text">{t("categoryImage")}:</div>
        <img
          className="rounded-circle my-3 mx-5"
          style={{ border: "1px solid var(--focus-color)" }}
          src={category?.image}
          alt={t("aria.categoryImageAlt", {
            categoryName: category?.name,
          })}
          height="120px"
          width="100px"
        />
      </div>

      {/* Subcategories Button */}
      <div className="px-2 w-100 d-flex justify-content-center">
        <Link
          to={`/admin/all-categories/${category._id}/all-subcategories`}
          className="btn btn-primary link-btn"
          aria-label={t("aria.viewSubcategories", {
            categoryName: category?.name,
          })}
        >
          {t("viewSubcategories")}
        </Link>
      </div>
    </div>
  );
};

export default AdminCategoryCard;
