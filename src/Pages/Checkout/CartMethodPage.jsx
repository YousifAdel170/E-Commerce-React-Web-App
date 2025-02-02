import { Container } from "react-bootstrap";
import ChoosePayMethod from "../../Components/Checkout/ChoosePayMethod";

const CartMethodPage = () => {
  return (
    <Container style={{ minHeight: "670px" }}>
      <ChoosePayMethod />
    </Container>
  );
};

export default CartMethodPage;
