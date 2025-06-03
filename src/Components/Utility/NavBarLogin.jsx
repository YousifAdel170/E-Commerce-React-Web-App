// Import Components from React Bootstrap, React Router, and FontAwesome icons
import {
  Navbar,
  Container,
  Nav,
  FormControl,
  NavDropdown,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faShoppingCart,
  faUser,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

// Import Custom Hooks
import NavbarSearchHook from "../../hooks/search/NavbarSearchHook";
import { NavBarLoginHook } from "../../hooks/Utility/NavBarLoginHook";
import ViewAllCartItemsHook from "../../hooks/cart/ViewAllCartItemsHook";

// Import data for the navbar (configuration)
import { navbarData } from "../../data/utilities/navbar";

// Import CSS styles
import "./NavBarLogin.css";

// Component responsible for rendering the navigation bar with login functionality
const NavBarLogin = () => {
  // Custom hooks to manage search input, user login state, and cart items
  const [searchWord, onChangeSearch] = NavbarSearchHook();
  const [user, logOut, loggingOut] = NavBarLoginHook();
  const [, numberOfItems, , , , , , pop] = ViewAllCartItemsHook();

  return (
    // Main navigation bar with sticky behavior and responsive design
    <nav role="navigation" aria-label="Main Navigation">
      <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
        <Container className="d-flex justify-content-between align-items-center">
          {/* Brand logo and title with link to home page */}
          <Navbar.Brand>
            <Link
              to={navbarData?.home?.path}
              aria-label={navbarData?.home?.ariaLabel}
              className="d-flex align-items-center"
            >
              <FontAwesomeIcon
                icon={faStore}
                size="2x"
                className="text-light"
                title="Logo"
              />
              <span className="me-2 fs-5 fw-bold text-light">متجري</span>
            </Link>
          </Navbar.Brand>

          {/* Toggle button for responsive navigation */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            aria-label="Toggle navigation"
          />

          {/* Collapsible section containing search input and nav links */}
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Search input in the navbar */}
            <FormControl
              value={searchWord}
              onChange={onChangeSearch}
              type={navbarData?.search?.type}
              placeholder={navbarData?.search?.placeholder}
              className="mx-5 text-center"
              aria-label={navbarData?.search?.ariaLabel}
              autoComplete="off"
              spellCheck="false"
            />

            {/* Navigation links (Login, Cart, Dropdown) */}
            <Nav className="me-auto align-items-center">
              {/* If user is logged in, show dropdown with user name */}
              {user ? (
                <NavDropdown
                  title={
                    <>
                      <FontAwesomeIcon
                        icon={faUser}
                        className="nav-icon ms-1"
                      />
                      {user?.name}
                    </>
                  }
                  id="basic-nav-dropdown"
                  role="menu"
                  menuVariant="dark"
                  align="end"
                >
                  {/* Link to user role-specific page (Admin, User, etc.) */}
                  <NavDropdown.Item
                    as={Link}
                    to={navbarData.role[user?.role].path}
                    className="nav-text"
                    role="menuitem"
                    tabIndex={0}
                  >
                    {navbarData.role[user?.role].title}
                  </NavDropdown.Item>

                  {/* Divider between role page and logout */}
                  <NavDropdown.Divider />

                  {/* Logout button (shows spinner while logging out) */}
                  <NavDropdown.Item
                    as="button"
                    className="nav-text"
                    onClick={logOut}
                    disabled={loggingOut}
                    role="menuitem"
                    tabIndex={0}
                  >
                    {loggingOut ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        تسجيل خروج...
                      </>
                    ) : (
                      "تسجيل خروج"
                    )}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                // If user is not logged in, show login link
                <Link
                  to="/login"
                  className="d-flex justify-content-center align-items-center nav-link flex-nowrap"
                  aria-label="Go to login page"
                >
                  <FontAwesomeIcon
                    icon={faSignInAlt}
                    className="nav-icon ms-1"
                  />
                  <span className="nav-text">دخول</span>
                </Link>
              )}

              {/* If the logged-in user has role "user", show the shopping cart link */}
              {user?.role === "user" && (
                <Link
                  className="d-flex justify-content-center position-relative align-items-center me-2 nav-link"
                  to="/cart"
                  aria-label={`العربة تحتوي على ${numberOfItems || 0} عناصر`}
                >
                  <div className="d-flex justify-content-center align-items-center flex-nowrap">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="nav-icon ms-1"
                    />
                    <span className="nav-text">العربة</span>
                  </div>
                  {/* Display number of items in the cart if greater than 0 */}
                  {numberOfItems > 0 && (
                    <div className="position-absolute top-25 start-0 translate-middle">
                      <span
                        className={`badge rounded-pill bg-danger ${
                          pop ? "pop" : ""
                        }`}
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        {numberOfItems}
                      </span>
                    </div>
                  )}
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
};

// Export the component for use in other parts of the app
export default NavBarLogin;
