import { Container, Spinner } from "react-bootstrap";

const SpinnerLoading = () => {
  return (
    <Container className="py-5 text-center">
      <Spinner
        className="mx-auto"
        animation="border"
        variant="dark"
        role="status"
        aria-label="Loading categories"
      />
      <p>جاري التحميل...</p>
    </Container>
  );
};

export default SpinnerLoading;
