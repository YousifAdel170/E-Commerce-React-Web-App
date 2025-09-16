/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AdminDeleteBrandHook from "../../hooks/brand/AdminDeleteBrandHook";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";
import ModalComponent from "../Utility/ModalComponent";

const AdminBrandCard = ({ brand, index }) => {
  const [show, handleClose, handleShow, handelDelete, isPress] =
    AdminDeleteBrandHook(brand);
  const [sectionRef, isVisible] = useInviewAnimation();
  const { t } = useTranslation(["brands", "utilities"]);

  return (
    <div
      className={`card-container card-animate card-description-container box-shadow-lift flex-column my-3 justify-content-around ${
        isVisible ? "fade-in" : ""
      }`}
      ref={sectionRef}
      style={{ animationDelay: `${index * 0.1}s` }}
      role="region"
      aria-label={t("brandCard.aria.brandCard", { brandName: brand?.name })}
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

      <div className="d-flex justify-content-between px-2 w-100">
        <div className="d-flex">
          <div className="card-item-text">{t("brandCard.brandName")}:</div>
          <div className="card-item-text-answer d-flex align-items-center">
            {brand?.name}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <Link to={`/admin/edit-brand/${brand?._id}`}>
              <i
                className="fas fa-edit"
                title={t("brandCard.edit")}
                role="button"
                tabIndex={0}
                aria-label={t("brandCard.brandCard.aria.editButton", {
                  brandName: brand?.name,
                })}
              />
            </Link>

            <i
              className="fas fa-trash text-danger mt-0"
              onClick={handleShow}
              title={t("brandCard.delete")}
              role="button"
              tabIndex={0}
              aria-label={t("brandCard.aria.removeButton", {
                brandName: brand?.name,
              })}
            />
          </div>
        </div>
      </div>

      <div className="px-2 w-100">
        <div className="card-item-text"> {t("brandCard.brandLogo")}:</div>
        <img
          className="rounded-circle my-3 mx-5"
          style={{ border: "1px solid var(--focus-color)" }}
          src={brand?.image}
          alt={t("brandCard.aria.brandLogoAlt", { brandName: brand?.name })}
          height="100px"
          width="100px"
        />
      </div>
    </div>
  );
};

export default AdminBrandCard;
