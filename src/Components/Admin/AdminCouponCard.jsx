/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import ModalComponent from "../Utility/ModalComponent";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";
import AdminDeleteCouponHook from "../../hooks/coupon/AdminDeleteCouponHook";
import AdminExtractCouponDateHook from "../../hooks/coupon/AdminExtractCouponDateHook";

const AdminCouponCard = ({ coupon, index }) => {
  const [show, handleClose, handleShow, handelDelete, isPress] =
    AdminDeleteCouponHook(coupon);

  const [date] = AdminExtractCouponDateHook(coupon);

  const [sectionRef, isVisible] = useInviewAnimation();

  const { t } = useTranslation(["coupons", "utilities"]);

  return (
    <div
      className={`card-container card-animate card-description-container  box-shadow-lift flex-column my-3 justify-content-around  ${
        isVisible ? "fade-in" : ""
      }`}
      ref={sectionRef}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Delete Confirmation Modal */}
      <ModalComponent
        show={show}
        handleClose={handleClose}
        handleOperation={handelDelete}
        modalTitle={t("utilities:modal.deleteTitle")}
        modalBody={t("utilities:modal.deleteMessage")}
        modalFooter={t("utilities:modal.delete")}
        className={`btn-danger`}
        ariaLabel={`${t("utilities:modal.deleteAriaLabel")}`}
        isPress={isPress}
      />

      <div className={`d-flex justify-content-between px-2 w-100`}>
        <div className="d-flex">
          <div className="card-item-text">{t("couponName.text")}:</div>
          <div className="card-item-text-answer d-flex align-items-center">
            {coupon?.name}
          </div>
        </div>

        <div className="d-flex align-items-center ">
          <div className="d-flex gap-2 align-items-center">
            <Link to={`/admin/edit-coupon/${coupon?._id}`}>
              <i
                className="fas fa-edit"
                style={{ cursor: "pointer" }}
                title={t("edit.text")}
                role="button"
                tabIndex={0}
                aria-label={t("edit.aria")}
              />
            </Link>

            <i
              className="fas fa-trash text-danger mt-0"
              style={{ cursor: "pointer" }}
              onClick={handleShow}
              title={t("delete.text")}
              role="button"
              tabIndex={0}
              aria-label={t("delete.aria")}
            />
          </div>
        </div>
      </div>

      <div className={`d-flex justify-content-between px-2 w-100`}>
        <div className="d-flex">
          <div className="card-item-text">{t("couponDate.text")}:</div>
          <div className="card-item-text-answer d-flex align-items-center">
            {coupon?.expire ? date : "-"}
          </div>
        </div>
      </div>

      <div className={`d-flex justify-content-between px-2 w-100`}>
        <div className="d-flex">
          <div className="card-item-text">{t("couponValue.text")}:</div>
          <div className="card-item-text-answer d-flex align-items-center">
            {coupon?.discount}
            {" % "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCouponCard;
