import { Navbar, Container, Nav, FormControl } from "react-bootstrap";
import logo from "../../Assets/Imgs/logo.png";
import login from "../../Assets/Imgs/login.png";
import cart from "../../Assets/Imgs/cart.png";
const NavBarLogin = () => {
  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <a href="/">
            <img src={logo} alt="logo" className="logo" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <FormControl
            type="search"
            placeholder="ابحث..."
            className="me-2 w-100 text-center"
            aria-label="Search"
          />
          <Nav className="me-auto">
            <Nav.Link
              className="nav-text d-flex mt-3 justify-content-center"
              href="/login"
            >
              <img src={login} className="login-img" alt="Login_Image" />
              <p style={{ color: "white" }}>دخول</p>
            </Nav.Link>
            <Nav.Link
              className="nav-text d-flex mt-3 justify-content-center"
              href="/cart"
            >
              <img src={cart} className="login-img" alt="Cart_Image" />{" "}
              <p style={{ color: "white" }}>العربة</p>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarLogin;
