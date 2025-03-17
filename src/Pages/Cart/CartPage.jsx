import { Row, Container, Col } from "react-bootstrap";
import CartItem from "../../Components/Cart/CartItem";
import CartCheckout from "../../Components/Cart/CartCheckout";
import ViewAllCartItemsHook from "../../hooks/cart/ViewAllCartItemsHook";
const CartPage = () => {
  const [, cartItems, totalCartPrice, couponName, totalCartPriceAfterDisc] =
    ViewAllCartItemsHook();
  return (
    <Container style={{ minHeight: "670px" }}>
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
