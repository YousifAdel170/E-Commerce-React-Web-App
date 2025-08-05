// Language Codes
export const LANGUAGE_ENGLISH = "en-US";
export const LANGUAGE_ARABIC = "ar";

// Theme Class Names
export const THEME_LIGHT = "light-theme";
export const THEME_DARK = "dark-theme";

// Text Directions
export const DIRECTION_LTR = "ltr";
export const DIRECTION_RTL = "rtl";

// Default Settings
export const DEFAULT_LANGUAGE = LANGUAGE_ENGLISH;
export const DEFAULT_THEME = THEME_LIGHT;
export const DEFAULT_DIRECTION = DIRECTION_LTR;

// Language Labels for buttons/toggles (short forms)
export const LANGUAGE_LABEL_EN = "English";
export const LANGUAGE_LABEL_AR = "العربية";

// ARIA Labels for Accessibility
export const ARIA_LABEL_TOGGLE_LANGUAGE = "Toggle language";
export const ARIA_LABEL_TOGGLE_THEME = "Toggle theme";

// src/constants/uiSettings.js

/**
 * Language Codes - Standardized locale codes
 */
export const LANGUAGES = {
  ENGLISH: "en-US",
  ARABIC: "ar",
};

/**
 * Theme Class Names - CSS classes for light and dark themes
 */
export const THEMES = {
  LIGHT: "light-theme",
  DARK: "dark-theme",
};

/**
 * Text Directions - for LTR and RTL languages
 */
export const DIRECTIONS = {
  LTR: "ltr",
  RTL: "rtl",
};

/**
 * Supported Languages - List of languages for dropdowns or UI selectors
 * Includes language code, display label, and text direction
 */
export const SUPPORTED_LANGUAGES = [
  { code: LANGUAGES.ENGLISH, label: "English", dir: DIRECTIONS.LTR },
  { code: LANGUAGES.ARABIC, label: "العربية", dir: DIRECTIONS.RTL },
];

/**
 * Default UI Settings
 */
export const DEFAULTS = {
  LANGUAGE: LANGUAGES.ENGLISH,
  THEME: THEMES.LIGHT,
  DIRECTION: DIRECTIONS.LTR,
};

/**
 * Short Labels for UI elements (e.g., buttons, toggles)
 */
export const LANGUAGE_LABELS = {
  ENGLISH: "English",
  ARABIC: "العربية",
};

/**
 * Google OAuth Client ID
 */
export const GOOGLE_CLIENT_ID =
  "870531361462-7dmogdgff788j7khaaemh80uhcl9d3da.apps.googleusercontent.com";
