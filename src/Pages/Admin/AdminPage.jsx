// Import necessary layout components from React Bootstrap
import { Col, Container, Row } from "react-bootstrap";

// Import Custom Components
import SideBar from "../../Components/Utility/SideBar";

// Import Outlet to render nested routes from react-router
import { Outlet } from "react-router-dom";

// Page responsible for rendering the Admin Page layout
const AdminPage = () => {
  return (
    // Bootstrap Container to center and wrap the layout
    <Container>
      {/* Row to split the page into sidebar and content sections */}
      <Row className="py-3">
        {/* Left Column - Sidebar (Admin Navigation) */}
        <Col md={2} xs={12}>
          <SideBar role={"admin"} />
        </Col>

        {/* Right Column - Page Content (changes dynamically using Outlet) */}
        <Col md={10} xs={12} className="">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
