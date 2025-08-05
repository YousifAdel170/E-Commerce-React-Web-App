// src/constants/routes.js

/**
 * Route Paths - Centralized definition of application routes for consistency and maintainability.
 */

export const ROUTES = {
  // General Public Paths
  GENERAL: {
    HOME: "/",
    ALL_CATEGORIES: "/all-categories",
    ALL_BRANDS: "/all-brands",
    SHOP_PRODUCTS: "/products",
    VIEW_BY_CATEGORY: "/products/category/:id",
    VIEW_BY_BRAND: "/products/brands/:id",
    PRODUCT_DETAILS: "/products/:id",
    CART: "/cart",
  },

  // Authentication Paths
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/user/forgot-password",
    VERIFY_CODE: "/user/verify-code",
    RESET_PASSWORD: "/user/reset-password",
  },

  // Admin Panel Paths
  ADMIN: {
    PRODUCTS: {
      ALL: "/admin/all-products",
      ADD: "/admin/add-product",
      EDIT: "/admin/edit-product/:id",
    },
    ORDERS: {
      ALL: "/admin/all-orders",
      DETAILS: "/admin/all-orders/:id",
    },
    CATEGORIES: {
      ALL: "/admin/all-categories",
      ADD: "/admin/add-category",
      EDIT: "/admin/edit-category/:id",
      SUBCATEGORIES: {
        ALL: "/admin/all-categories/:id/all-subcategories",
        ADD: "/admin/add-subcategory",
        EDIT: "/admin/all-categories/:id/all-subcategories/edit-subcategory/:id",
      },
    },
    BRANDS: {
      ALL: "/admin/all-brands",
      ADD: "/admin/add-brand",
      EDIT: "/admin/edit-brand/:id",
    },
    COUPONS: {
      ALL: "/admin/all-coupons",
      ADD: "/admin/add-coupon",
      EDIT: "/admin/edit-coupon/:id",
    },
  },

  // User Dashboard Paths
  USER: {
    PROFILE: "/user/profile",
    ORDERS: "/user/all-orders",
    FAVORITES: "/user/favorite-products",
    ADDRESSES: {
      ALL: "/user/addresses",
      ADD: "/user/addresses/add-address",
      EDIT: "/user/addresses/edit-address/:id",
    },
    PAYMENT: "/order/pay-method",
  },
};
