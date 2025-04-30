// Import Components from React Bootstrap
import { Container } from "react-bootstrap";

// Import Custom Components
import ChoosePayMethod from "../../Components/Checkout/ChoosePayMethod";

// Page responsible for displaying the payment method selection
const CartMethodPage = () => {
  return (
    // Container with a minimum height of 670px for layout styling
    <Container style={{ minHeight: "670px" }}>
      {/* ChoosePayMethod component to handle the payment method selection */}
      <ChoosePayMethod />
    </Container>
  );
};

// Export the CartMethodPage component for use in other parts of the application
export default CartMethodPage;
