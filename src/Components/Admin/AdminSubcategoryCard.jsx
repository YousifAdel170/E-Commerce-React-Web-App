/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import AdminDeleteSubcategoryHook from "../../hooks/subCategory/AdminDeleteSubcategoryHook";
import { useTranslation } from "react-i18next";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";
import ModalComponent from "../Utility/ModalComponent";

const AdminSubcategoryCard = ({ subcategory, categoryID, index }) => {
  const [show, handleClose, handleShow, handelDelete, isPress] =
    AdminDeleteSubcategoryHook(subcategory);

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
      aria-label={t("subcategory.title", {
        categoryName: subcategory?.name,
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

      {/* Sub Category Name & Actions */}
      <div className="d-flex justify-content-between px-2 w-100">
        <div className="d-flex">
          <div className="card-item-text">{t("subcategory.name")}:</div>
          <div className="card-item-text-answer d-flex align-items-center">
            {subcategory?.name}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <Link
              to={`/admin/all-categories/${categoryID}/all-subcategories/edit-subcategory/${subcategory?._id}`}
            >
              <i
                className="fas fa-edit"
                title={t("subcategory.edit")}
                role="button"
                tabIndex={0}
                aria-label={t("subcategory.edit")}
              />
            </Link>

            <i
              className="fas fa-trash text-danger mt-0"
              onClick={handleShow}
              title={t("subcategory.delete")}
              role="button"
              tabIndex={0}
              aria-label={t("subcategory.delete")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubcategoryCard;
