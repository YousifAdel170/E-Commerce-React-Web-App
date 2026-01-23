// CartPage.jsx
import { Row, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

// Custom Components
import CartItem from "../../Components/Cart/CartItem";
import CartCheckout from "../../Components/Cart/CartCheckout";

// Custom Hook
import ViewAllCartItemsHook from "../../hooks/cart/ViewAllCartItemsHook";

// Import Custom CSS
import "./CartPage.css";
import ItemsNotFound from "../../Components/Utility/ItemsNotFound";
import SpinnerComponent from "../../Components/Utility/SpinnerComponent";
import { ROUTES } from "../../constants/routes";

const CartPage = () => {
  const { t } = useTranslation("user"); // Using "cart" namespace
  const [, , cartItems, totalCartPrice, couponName, totalCartPriceAfterDisc] =
    ViewAllCartItemsHook();

  const isLoading = false;

  return (
    <Container style={{ flex: "1" }}>
      <Row className="cart-grid-wrapper" aria-busy={isLoading}>
        <div className="title-text my-4">{t("cart.title")}</div>

        {!cartItems || !cartItems.length > 0 ? (
          <>
            <ItemsNotFound msg={t("cart.emptyMessage")} />
            <Link
              to={ROUTES.GENERAL.SHOP_PRODUCTS}
              className="d-flex justify-content-center my-0 py-0"
              style={{ fontSize: "12px", fontStyle: "italic" }}
            >
              {t("cart.browseProducts")}
            </Link>
          </>
        ) : null}

        <Col xs="12" md="9" className="cartItems">
          {!isLoading ? (
            cartItems && cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <CartItem key={index} item={item} />
              ))
            ) : null
          ) : (
            <SpinnerComponent msg={t("cart.loading")} />
          )}
        </Col>

        <Col xs="12" md="3" className="checkout-col">
          {cartItems && cartItems.length > 0 ? (
            <CartCheckout
              cartItems={cartItems}
              totalCartPrice={totalCartPrice}
              couponNameRes={couponName}
              totalCartPriceAfterDisc={totalCartPriceAfterDisc}
            />
          ) : null}
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default CartPage;
