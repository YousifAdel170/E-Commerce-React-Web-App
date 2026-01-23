// Import Components from React Bootstrap
import { Container } from "react-bootstrap";

// Import Custom Components
import ChoosePayMethod from "../../Components/Checkout/ChoosePayMethod";
import { ToastContainer } from "react-toastify";

// Page responsible for displaying the payment method selection
const CartMethodPage = () => {
  return (
    // Container with a minimum height of 670px for layout styling
    <Container style={{ flex: "1" }}>
      {/* ChoosePayMethod component to handle the payment method selection */}
      <ChoosePayMethod />
      <ToastContainer />
    </Container>
  );
};

// Export the CartMethodPage component for use in other parts of the application
export default CartMethodPage;
