import { useParams } from "react-router-dom";
import AdminEditCouponHook from "../../hooks/coupon/AdminEditCouponHook";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";
import { Row } from "react-bootstrap";
import { INPUT_TYPES } from "../../constants/inputs";
import SpinnerComponent from "../Utility/SpinnerComponent";

const AdminEditCoupon = () => {
  const { id } = useParams();
  const [
    couponName,
    couponDate,
    couponValue,
    onChangeName,
    onChangeDate,
    onChangeValue,
    handleSubmit,
    isPress,
  ] = AdminEditCouponHook(id);

  const [sectionRef, isVisible] = useInviewAnimation();

  const { t } = useTranslation("coupons");
  return (
    <div>
      <div className="title-text">{t("editCoupon.text")}</div>

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
            {/* Coupon Name */}
            <div className="mb-3">
              <label className="form-label card-item-text">
                {t("couponName.text")}
              </label>
              <input
                type={INPUT_TYPES.TEXT}
                value={couponName}
                onChange={onChangeName}
                className="form-control"
                placeholder={t("couponName.text")}
              />
            </div>

            {/* Coupon Date */}
            <div className="mb-3">
              <label className="form-label card-item-text">
                {t("couponDate.text")}
              </label>
              <input
                type={INPUT_TYPES.DATE}
                value={couponDate}
                onChange={onChangeDate}
                className="form-control"
                placeholder={t("couponDate.text")}
              />
            </div>

            {/* Coupon Value */}
            <div className="mb-3 ">
              <label className="form-label card-item-text">
                {t("couponValue.text")}
              </label>
              <div className="input-group d-flex align-items-center">
                <input
                  type={INPUT_TYPES.NUMBER}
                  min="0"
                  max="100"
                  value={couponValue}
                  onChange={onChangeValue}
                  className="form-control input-number"
                  placeholder={t("couponValue.text")}
                />

                <span className="input-group-text">%</span>
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type={INPUT_TYPES.SUBMIT}
                className="btn btn-primary"
                aria-label={t("saveChanges.aria")}
                disabled={isPress}
              >
                {isPress ? (
                  <SpinnerComponent className={"mx-2"} size={"sm"} />
                ) : (
                  ""
                )}
                {t("saveChanges.text")}
              </button>
            </div>
          </form>
        </div>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminEditCoupon;
