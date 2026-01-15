// Import necessary layout components from React Bootstrap
import { Col, Container, Row } from "react-bootstrap";

// Import Custom Components
import SideBar from "../../Components/Utility/SideBar";

// Import Outlet to render nested routes from react-router
import { Outlet } from "react-router-dom";

// Import USER_ROLES constant to determine user role
import { USER_ROLES } from "../../constants/general";

// Page responsible for rendering the User Page layout
const UserPage = () => {
  return (
    // Bootstrap Container to center and wrap the layout
    <Container style={{ flex: "1" }}>
      {/* Row to split the page into sidebar and content sections */}
      <Row className="py-3">
        {/* Left Column - Sidebar (User Navigation) */}
        <Col md={2} xs={12}>
          <SideBar role={USER_ROLES.USER} />
        </Col>

        {/* Right Column - Page Content (changes dynamically using Outlet) */}
        <Col md={10} xs={12}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
