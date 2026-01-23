/* eslint-disable react/prop-types */

// React & Bootstrap
import { Col, Row, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Custom Hooks
import DeleteCartHook from "../../hooks/cart/DeleteCartHook";
import UpdateCartHook from "../../hooks/cart/UpdateCartHook";

// Config
import { PRODUCTS_BASE_URL } from "../../config";

// Components
import ModalComponent from "../Utility/ModalComponent";
import ItemsNotFound from "../Utility/ItemsNotFound";

// Custom CSS
import "./CartItem.css";
import { useSelector } from "react-redux";

const CartItem = ({ item }) => {
  const { t } = useTranslation(["user", "utilities"]);

  // Hooks for deletion and update
  const [
    ,
    ,
    ,
    ,
    showSpecific,
    handleCloseSpecific,
    handleShowSpecific,
    handelDeleteSpecificItem,
    isPressDeleteItem,
    ,
  ] = DeleteCartHook(item);

  const [
    itemCount,
    onChangeCount,
    showUpdate,
    handleCloseUpdate,
    handleShowUpdate,
    handleUpdate,
    isUpdatePress,
  ] = UpdateCartHook(item);

  const { isDark } = useSelector((state) => state.ui);

  // Actions
  const actions = [
    {
      label: t("utilities:modal.edit"),
      onClick: handleShowUpdate,
      ariaLabel: `${t("utilities:modal.editAriaLabel")}: ${item?.product?.title}`,
      icon: <FaEdit className="fs-5" />,
    },
    {
      label: t("utilities:modal.delete"),
      onClick: handleShowSpecific,
      ariaLabel: `${t("utilities:modal.deleteAriaLabel")}: ${item?.product?.title}`,
      icon: <FaTrash className="text-danger fs-5" />,
    },
  ];

  if (!item?.product) return <ItemsNotFound msg={t("cart.emptyMessage")} />;
  return (
    <Col
      xs="12"
      className="user-order order-item-body mb-3 rounded shadow-sm card-animate"
    >
      {/* Update Modal */}
      <ModalComponent
        show={showUpdate}
        handleClose={handleCloseUpdate}
        handleOperation={handleUpdate}
        modalTitle={t("utilities:modal.editTitle")}
        modalBody={t("utilities:modal.editMessage")}
        modalFooter={t("utilities:modal.update")}
        className={"btn-primary"}
        isPress={isUpdatePress}
        ariaLabel={`${t("utilities:modal.updateAriaLabel")}: ${item?.product?.title}`}
      />

      {/* Delete Modal */}
      <ModalComponent
        show={showSpecific}
        handleClose={handleCloseSpecific}
        handleOperation={handelDeleteSpecificItem}
        modalTitle={t("utilities:modal.deleteTitle")}
        modalBody={t("utilities:modal.deleteMessage")}
        modalFooter={t("utilities:modal.delete")}
        className="btn-danger"
        isPress={isPressDeleteItem}
        ariaLabel={`${t("utilities:modal.deleteAriaLabel")}: ${item?.product?.title}`}
      />

      {/* Product Info */}
      <Row>
        <Col
          sm="12"
          className="d-flex align-items-center justify-content-between flex-wrap"
        >
          <div className="d-flex align-items-center gap-3 flex-grow-1 flex-wrap">
            {/* Product Image */}
            <img
              src={PRODUCTS_BASE_URL + item?.product?.imageCover}
              alt={item?.product?.title}
              className="order-item-image"
            />

            <div className="d-flex flex-column justify-content-center gap-1">
              <div className="d-flex align-items-center">
                <span className="order-item-text">{t("cart.item.title")}:</span>
                <span className="order-item-text-answer mx-2">
                  {item?.product?.title}
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="order-item-text">
                  {t("cart.item.category")}:
                </span>
                <span className="order-item-text-answer mx-2">
                  {item?.product?.category?.name || ""}
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="order-item-text">{t("cart.item.brand")}:</span>
                <span className="order-item-text-answer mx-2">
                  {item?.product?.brand?.name || ""}
                </span>
              </div>
            </div>
          </div>

          {/* Price & Actions */}
          <div className="d-flex flex-column align-items-end gap-2">
            {/* Price */}
            <div className="d-flex order-item-text align-items-center">
              <span className="fw-bold fs-6 my-0">
                {item?.price || 0} {t("cart.currency")}
              </span>
            </div>

            {/* Quantity Controls */}
            <div className="d-flex align-items-center gap-2 mt-1">
              <span className="order-item-text">
                {t("cart.item.quantity")}:
              </span>
              <div className="d-flex align-items-center rounded overflow-hidden">
                <Button
                  size="sm"
                  variant={isDark ? "Dark" : "light"}
                  onClick={() =>
                    onChangeCount({ target: { value: itemCount - 1 } })
                  }
                  disabled={itemCount <= 1}
                  className="icon"
                  title={t("cart.item.decrease")}
                >
                  <FaMinus className="icon" />
                </Button>
                <input
                  type="number"
                  value={itemCount}
                  onChange={onChangeCount}
                  min={1}
                  className="text-center border-0"
                  style={{ width: "100px", outline: "none" }}
                />
                <Button
                  size="sm"
                  variant={isDark ? "Dark" : "light"}
                  onClick={() =>
                    onChangeCount({ target: { value: itemCount + 1 } })
                  }
                  className="icon"
                  title={t("cart.item.increase")}
                >
                  <FaPlus className="icon" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2 mt-2">
              {actions.map((action, idx) => (
                <OverlayTrigger
                  key={idx}
                  placement="top"
                  overlay={<Tooltip>{action.ariaLabel}</Tooltip>}
                >
                  <Button
                    onClick={action.onClick}
                    variant={isDark ? "Dark" : "light"}
                    className="d-flex icon align-items-center gap-1 p-2 shadow-sm"
                  >
                    {action.icon}
                  </Button>
                </OverlayTrigger>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default CartItem;
