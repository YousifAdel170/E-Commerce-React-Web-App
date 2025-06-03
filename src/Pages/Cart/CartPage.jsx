// Import Components from React bootstrap
import { Row, Container, Col } from "react-bootstrap";

// Import Custom Components
import CartItem from "../../Components/Cart/CartItem";
import CartCheckout from "../../Components/Cart/CartCheckout";

// Import Custom Hook
import ViewAllCartItemsHook from "../../hooks/cart/ViewAllCartItemsHook";

// Import Custom Style
import "./CartPage.css";
import { Link } from "react-router-dom";

// Page responsible To handle The Cart
const CartPage = () => {
  const [, , cartItems, totalCartPrice, couponName, totalCartPriceAfterDisc] =
    ViewAllCartItemsHook();

  return (
    <Container style={{ flex: "1" }}>
      <Row>
        <div className="cart-title mt-4 mb-2">عربة التسوق</div>
      </Row>

      <Row className="d-flex justify-content-center">
        <Col xs="12" md="9">
          {cartItems.length ? (
            cartItems.map((item) => <CartItem key={item?._id} item={item} />)
          ) : (
            <>
              <h6>لا يوجد منتجات فى العربة</h6>
              <Link to="/products">اضغط هنا لعرض المنتجات</Link>
            </>
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
