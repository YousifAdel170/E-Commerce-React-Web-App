// Import Components from react-bootstrap
import {
  Navbar,
  Container,
  Nav,
  FormControl,
  NavDropdown,
} from "react-bootstrap";

// Import Components from react-router-dom
import { Link } from "react-router-dom";

// Import The Used Custom Hooks
import NavbarSearchHook from "../../hooks/search/NavbarSearchHook";
import { NavBarLoginHook } from "../../hooks/Utility/NavBarLoginHook";
import ViewAllCartItemsHook from "../../hooks/cart/ViewAllCartItemsHook";

// Import The Used Assets
import logo from "../../Assets/Imgs/logo.png";
import login from "../../Assets/Imgs/login.png";
import cart from "../../Assets/Imgs/cart.png";

// Import The Used CSS
import "./NavBarLogin.css";

// Component Responsible To Display The NavBar For The Login User
const NavBarLogin = () => {
  // Custom Hooks
  const [searchWord, onChangeSearch] = NavbarSearchHook();
  const [user, logOut] = NavBarLoginHook();
  const [, numberOfItems] = ViewAllCartItemsHook();
  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Navbar.Brand>
          <Link to={"/"}>
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Search input */}
          <FormControl
            value={searchWord}
            onChange={onChangeSearch}
            type="search"
            placeholder="ابحث..."
            className="me-2 text-center"
            aria-label="Search"
          />
          <Nav className="me-auto">
            {/* Handle if the person is user or admin and display the page for the specified role */}
            {user != null ? (
              <NavDropdown title={user?.name} id="basic-nav-dropdown">
                {user?.role === "admin" ? (
                  // Display the control page for the admin
                  <NavDropdown.Item
                    as={Link}
                    to="/admin/all-products"
                    className="nav-text"
                  >
                    لوحة التحكم
                  </NavDropdown.Item>
                ) : (
                  // Display the profile page for the user
                  <NavDropdown.Item
                    as={Link}
                    to="/user/profile"
                    className="nav-text"
                  >
                    الصفحه الشخصية
                  </NavDropdown.Item>
                )}

                {/* Logout if the user Logged in */}
                <NavDropdown.Item
                  as={Link}
                  to="/"
                  className="nav-text"
                  onClick={logOut}
                >
                  تسجيل خروج
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // Login if the user is not logged in
              <Link
                to={"/login"}
                className="d-flex justify-content-center align-items-center me-2"
              >
                <img src={login} className="login-img" alt="Authentication" />
                <p className="d-flex align-items-center m-0 me-1 nav-text">
                  دخول
                </p>
              </Link>
            )}

            {/* check if the user is logged in and display the cart icon */}
            {user?.role === "user" ? (
              <Link
                className="d-flex justify-content-center position-relative align-items-center me-2"
                to={"/cart"}
              >
                <img src={cart} className="login-img" alt="Cart" />
                <p className="d-flex align-items-center m-0 ms-2 me-1 nav-text">
                  العربة
                </p>
                {/* Display the number of items in the cart */}
                <span className="position-absolute top-25 start-0 translate-middle badge rounded-pill bg-danger">
                  {numberOfItems || 0}
                </span>
              </Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarLogin;
