// Import Components from react bootstrap
import {
  Navbar,
  Container,
  Nav,
  Form,
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
  faGlobe,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

// i18n
import { useTranslation } from "react-i18next";

// Hooks
import NavbarSearchHook from "../../hooks/search/NavbarSearchHook";
import { NavBarLoginHook } from "../../hooks/Utility/NavBarLoginHook";
import ViewAllCartItemsHook from "../../hooks/cart/ViewAllCartItemsHook";

// Constants
import { USER_ROLES } from "../../constants/general";

// Styles
import "./NavBarLogin.css";

import NavbarSettingsHook from "../../hooks/Utility/NavbarSettingsHook";
import {
  LANGUAGE_ENGLISH,
  LANGUAGE_LABEL_AR,
  LANGUAGE_LABEL_EN,
} from "../../constants/settings";
import { INPUT_NAMES, INPUT_TYPES } from "../../constants/inputs";
import { ROUTES } from "../../constants/routes";

const NavBarLogin = () => {
  const { t } = useTranslation("utilities");

  const [searchWord, onChangeSearch] = NavbarSearchHook();
  const [user, logOut, loggingOut] = NavBarLoginHook();
  const [, numberOfItems, , , , , , pop] = ViewAllCartItemsHook();
  const [
    onChangeTheme,
    onChangeLanguage,
    isDark,
    lang,
    isThemeLoading,
    isLanguageLoading,
  ] = NavbarSettingsHook();

  return (
    <nav role="navigation" aria-label="Main Navigation" data-testid="navbar">
      <Navbar className="sticky-top" expand="sm">
        <Container>
          {/* Logo */}
          <Navbar.Brand
            as={Link}
            to={ROUTES.GENERAL.HOME}
            title={t("navbar.homeAriaLabel")}
            className="d-flex align-items-center fw-bold fs-4"
          >
            <FontAwesomeIcon icon={faStore} className="me-2 fs-2" />
            <span className="d-flex align-items-center fw-bold">
              {t("navbar.title")}
            </span>
          </Navbar.Brand>

          {/* Toggler */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            aria-label="Toggle navigation"
          />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Search */}
            <Form className="d-flex mx-2 w-100 justify-content-center form-search form-navbar">
              <FormControl
                value={searchWord}
                onChange={onChangeSearch}
                type={INPUT_TYPES.SEARCH_TYPE}
                name={INPUT_NAMES.SEARCH}
                placeholder={t("navbar.searchPlaceholder")}
                aria-label={t("navbar.searchAriaLabel")}
                title={t("navbar.searchAriaLabel")}
                autoComplete="off"
                spellCheck="false"
              />
            </Form>

            <Nav className="d-flex align-items-center gap-2">
              {/* User/Login */}
              {user ? (
                <NavDropdown
                  title={
                    <>
                      <FontAwesomeIcon icon={faUser} className="mx-1" />
                      <span className="mx-1">{user?.name}</span>
                    </>
                  }
                  id="user-dropdown"
                  align="end"
                  aria-label={t("navbar.userDropdownLabel")}
                >
                  <NavDropdown.Item
                    as={Link}
                    to={
                      user?.role === USER_ROLES.ADMIN
                        ? ROUTES.ADMIN.PRODUCTS.ALL
                        : ROUTES.USER.PROFILE
                    }
                    title={
                      user?.role === USER_ROLES.ADMIN
                        ? t("navbar.adminControlPanel")
                        : t("navbar.userProfile")
                    }
                  >
                    {user?.role === USER_ROLES.ADMIN
                      ? t("navbar.adminControlPanel")
                      : t("navbar.userProfile")}
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={logOut}
                    disabled={loggingOut}
                    aria-disabled={loggingOut}
                    aria-busy={loggingOut}
                    title={t("navbar.logout")}
                  >
                    {loggingOut ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          role="status"
                          aria-live="polite"
                          className="mx-2"
                        />
                        {t("navbar.loggingOut")}
                      </>
                    ) : (
                      t("navbar.logout")
                    )}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link
                  to={ROUTES.AUTH.LOGIN}
                  className="nav-link d-flex align-items-center"
                  title={t("navbar.login")}
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="mx-1" />
                  {t("navbar.login")}
                </Link>
              )}

              {/* Cart */}
              {user?.role === USER_ROLES.USER && (
                <Link
                  to={ROUTES.GENERAL.CART}
                  className="cart nav-link position-relative d-flex align-items-center"
                  aria-label={`${t("navbar.cartContains")} ${numberOfItems} ${t(
                    "navbar.cartItems"
                  )}`}
                  title={`${t("navbar.cart")} (${numberOfItems} ${t(
                    "navbar.cartItems"
                  )})`}
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="mx-1" />
                  {t("navbar.cart")}
                  {numberOfItems > 0 && (
                    <span
                      className={`badge rounded-pill bg-danger position-absolute translate-middle ${
                        pop ? "pop" : ""
                      }`}
                      aria-live="polite"
                      aria-atomic="true"
                      title={`${numberOfItems} ${t("navbar.cartItems")}`}
                    >
                      {numberOfItems}
                    </span>
                  )}
                </Link>
              )}

              {/* Theme Toggle */}
              <button
                className="nav-theme-btn"
                onClick={onChangeTheme}
                aria-label={t("navbar.toggleTheme")}
                title={t("navbar.themeToggleLabel")}
                disabled={isThemeLoading}
                aria-busy={isThemeLoading}
              >
                <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
              </button>

              {/* Language Toggle */}
              <button
                className="nav-lang-btn"
                onClick={onChangeLanguage}
                aria-label={t("navbar.toggleLanguage")}
                title={t("navbar.languageToggleLabel")}
                disabled={isLanguageLoading}
                aria-busy={isLanguageLoading}
              >
                <FontAwesomeIcon icon={faGlobe} />
                <span>
                  {lang === LANGUAGE_ENGLISH
                    ? LANGUAGE_LABEL_AR
                    : LANGUAGE_LABEL_EN}
                </span>
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
};

export default NavBarLogin;
