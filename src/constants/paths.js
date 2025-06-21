// General Paths
export const GENERAL_HOME_PATH = "/";
export const GENERAL_ALL_CATEGORIES_PATH = "/all-categories";
export const GENERAL_ALL_BRANDS_PATH = "/all-brands";
export const GENERAL_SHOP_PRODUCTS_PATH = "/products";
export const GENERAL_VIEW_PRODUCTS_BY_CATEGORY_PATH = "/products/category/:id";
export const GENERAL_VIEW_PRODUCTS_BY_BRAND_PATH = "/products/brands/:id";
export const GENERAL_PRODUCT_DETAILS_PATH = "/products/:id";
export const GENERAL_CART_PATH = "/cart";

// Authentication paths
export const AUTH_LOGIN_PATH = "/login";
export const AUTH_REGISTER_PATH = "/register";
export const AUTH_FORGOT_PASSWORD_PATH = "/user/forgot-password";
export const AUTH_VERIFY_CODE_PATH = "/user/verify-code";
export const AUTH_RESET_PASSWORD_PATH = "/user/reset-password";

// Admin paths
export const ADMIN_ALL_PRODUCTS_PATH = "/admin/all-products";
export const ADMIN_ALL_ORDERS_PATH = "/admin/all-orders";
export const ADMIN_ALL_CATEGORIES_PATH = "/admin/all-categories";
export const ADMIN_ALL_BRANDS_PATH = "/admin/all-brands";
export const ADMIN_ALL_SUBCATEGORIES_PATH =
  "/admin/all-categories/:id/all-subcategories";
export const ADMIN_ALL_COUPONS_PATH = "/admin/all-coupons";
export const ADMIN_ORDER_DETAILS_PATH = "/admin/all-orders/:id";

export const ADMIN_ADD_BRAND_PATH = "/admin/add-brand";
export const ADMIN_ADD_CATEGORY_PATH = "/admin/add-category";
export const ADMIN_ADD_PRODUCT_PATH = "/admin/add-product";
export const ADMIN_ADD_SUBCATEGORY_PATH = "/admin/add-subcategory";
export const ADMIN_ADD_COUPON_PATH = "/admin/add-coupon";

export const ADMIN_EDIT_PRODUCT_PATH = "/admin/edit-product/:id";
export const ADMIN_EDIT_CATEGORY_PATH = "/admin/edit-category/:id";
export const ADMIN_EDIT_BRAND_PATH = "/admin/edit-brand/:id";
export const ADMIN_EDIT_SUBCATEGORY_PATH =
  "/admin/all-categories/:id/all-subcategories/edit-subcategory/:id";
export const ADMIN_EDIT_COUPON_PATH = "/admin/edit-coupon/:id";

// User paths
export const USER_PROFILE_PATH = "/user/profile";
export const USER_ALL_ORDERS_PATH = "/user/all-orders";
export const USER_FAVORITE_PRODUCTS_PATH = "/user/favorite-products";
export const USER_ALL_ADDRESSES_PATH = "/user/addresses";
export const USER_EDIT_ADDRESS_PATH = "/user/addresses/edit-address/:id";
export const USER_ADD_ADDRESS_PATH = "/user/addresses/add-address";
export const USER_ORDER_PAY_METHOD_PATH = "/order/pay-method";
