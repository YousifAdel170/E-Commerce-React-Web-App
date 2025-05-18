// Import necessary layout components from React Bootstrap
import { Col, Container, Row } from "react-bootstrap";

// Import User Sidebar Component
import UserSideBar from "../../Components/User/UserSideBar";

// Import Outlet to render nested routes from react-router
import { Outlet } from "react-router-dom";

// Component responsible for rendering the User Page layout
const UserPage = () => {
  return (
    // Bootstrap Container to center and wrap the layout
    <Container>
      {/* Row to split the page into sidebar and content sections */}
      <Row className="py-3">
        {/* Left Column - Sidebar (User Navigation) */}
        <Col sm="3" xs="2" md="2">
          <UserSideBar />
        </Col>

        {/* Right Column - Page Content (changes dynamically using Outlet) */}
        <Col sm="9" xs="10" md="10">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

// Export the UserPage component
export default UserPage;
