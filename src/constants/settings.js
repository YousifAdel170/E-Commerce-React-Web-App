// Language Codes
export const LANGUAGE_ENGLISH = "en-US";
export const LANGUAGE_ARABIC = "ar";

// Theme Class Names
export const THEME_LIGHT = "light-theme";
export const THEME_DARK = "dark-theme";

// Text Directions
export const DIRECTION_LTR = "ltr";
export const DIRECTION_RTL = "rtl";

// Supported Languages for UI dropdown or lists (if languages increased we will use it)
export const SUPPORTED_LANGUAGES = [
  { code: LANGUAGE_ENGLISH, label: "English", dir: DIRECTION_LTR },
  { code: LANGUAGE_ARABIC, label: "العربية", dir: DIRECTION_RTL },
];

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
