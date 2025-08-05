/**
 * Pagination Limits - Controls how many items appear per page in various views.
 * Organized by context for clarity and scalability.
 */

export const PAGINATION_LIMITS = {
  // General Listings
  PRODUCTS: 12,
  CATEGORIES: 10,
  BRANDS: 10,
  FAVORITE_PRODUCTS: 10,

  // Home Page Sections
  HOME: {
    CATEGORIES: 5,
    BRANDS: 5,
    PRODUCTS: 4,
    FAVORITE_PRODUCTS: 5,
  },

  // Product Details Page
  PRODUCT_DETAILS: {
    RATES_LIMIT: 3,
    PAGE_NUMBER: 1,
  },

  // Orders Page
  ORDERS_PER_PAGE: 2,
};
