// Import Components from React bootstrap
import { Row, Container, Col } from "react-bootstrap";

// Import Custom Components
import CartItem from "../../Components/Cart/CartItem";
import CartCheckout from "../../Components/Cart/CartCheckout";

// Import Custom Hook
import ViewAllCartItemsHook from "../../hooks/cart/ViewAllCartItemsHook";

// Import Custom Style
import "./CartPage.css";

// Page responsible To handle The Cart
const CartPage = () => {
  const [, , cartItems, totalCartPrice, couponName, totalCartPriceAfterDisc] =
    ViewAllCartItemsHook();

  return (
    <Container>
      <Row>
        <div className="cart-title mt-4">عربة التسوق</div>
      </Row>

      <Row className="d-flex justify-content-center">
        <Col xs="12" md="9">
          {cartItems.length ? (
            cartItems.map((item, index) => <CartItem key={index} item={item} />)
          ) : (
            <h6>لا يوجد منتجات فى العربة</h6>
          )}
        </Col>
        <Col xs="6" md="3">
          <CartCheckout
            cartItems={cartItems}
            totalCartPrice={totalCartPrice}
            couponNameRes={couponName}
            totalCartPriceAfterDisc={totalCartPriceAfterDisc}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
