import {
  Navbar,
  Container,
  Nav,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import logo from "../../Assets/Imgs/logo.png";
import login from "../../Assets/Imgs/login.png";
import cart from "../../Assets/Imgs/cart.png";
import NavbarSearchHook from "../../hooks/search/NavbarSearchHook";
import { NavBarLoginHook } from "../../hooks/Utility/NavBarLoginHook";
import ViewAllCartItemsHook from "../../hooks/cart/ViewAllCartItemsHook";
const NavBarLogin = () => {
  const [searchWord, onChangeSearch] = NavbarSearchHook();
  const [user, logOut] = NavBarLoginHook();
  const [numberOfItems] = ViewAllCartItemsHook();
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
            value={searchWord}
            onChange={onChangeSearch}
            type="search"
            placeholder="ابحث..."
            className="me-2 w-100 text-center"
            aria-label="Search"
          />
          <Nav className="me-auto">
            {user != "" ? (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                {user.role === "admin" ? (
                  <NavDropdown.Item href="/admin/all-products">
                    لوحة التحكم
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item href="/user/profile">
                    الصفحه الشخصية
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut} href="/">
                  تسجيل خروج
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                href="/login"
                className="nav-text d-flex mt-3 justify-content-center"
              >
                <img src={login} className="login-img" alt="sfvs" />
                <p style={{ color: "white" }}>دخول</p>
              </Nav.Link>
            )}
            <Nav.Link
              className="nav-text d-flex mt-3 justify-content-center position-relative"
              href="/cart"
            >
              <img src={cart} className="login-img" alt="Cart_Image" />{" "}
              <p style={{ color: "white" }}>العربة</p>
              <span className="position-absolute top-10 start-0 translate-middle badge rounded-pill bg-danger">
                {numberOfItems || 0}
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarLogin;
