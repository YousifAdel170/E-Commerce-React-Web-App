/**
 * Storage Keys - Centralized keys for localStorage and sessionStorage.
 * Helps prevent typos and ensures consistent naming across the app.
 */

export const STORAGE_KEYS = {
  LOCAL: {
    PREFERENCES: {
      LANGUAGE: "app_language",
      THEME: "app_theme",
    },
    AUTH: {
      TOKEN: "token",
      USER: "user",
      EMAIL: "user-email",
    },
    CART: {
      ITEMS: "cart_items",
      LAST_UPDATED: "cart_last_updated",
    },
    SETTINGS: {
      ONBOARDING_COMPLETED: "onboarding_done",
      LAST_VISITED_PAGE: "last_visited_page",
    },
  },
  SESSION: {
    TEMP_DATA: "session_temp_data",
    SESSION_ID: "session_id",
    // Add more sessionStorage keys here
  },
};
