// Delay constants (in milliseconds)
export const BUTTON_DELAY = 1000;

export const DELAYS = {
  // ========== UI ELEMENTS ==========
  SLIDER: 2000, // Delay between automatic slider transitions
  TOOLTIP_SHOW: 300, // Delay before showing a tooltip
  MODAL_ANIMATION: 250, // Animation duration for modals
  DROPDOWN_OPEN: 150, // Time before dropdown opens
  PAGE_TRANSITION: 500, // Page fade/slide animation duration
  POPUP_CART_ANIMATION: 600, // Animation delay for popup cart in navbar

  // ========== USER INTERACTIONS ==========
  BUTTON_CLICK: 1000, // Delay after button click to avoid double submission
  FORM_VALIDATION: 500, // Debounce validation messages
  PASSWORD_VISIBILITY_TOGGLE: 200, // Delay for toggling password visibility
  INPUT_FOCUS_HIGHLIGHT: 100, // Input field focus animation

  // ========== FEEDBACK & NOTIFICATIONS ==========
  TOAST_AUTO_CLOSE: 4000, // Duration toast stays visible
  CONFIRMATION_MSG: 2500, // Confirmation message display
  SPINNER_MINIMUM: 800, // Minimum spinner duration for visual consistency
  ERROR_RETRY_DELAY: 3000, // Delay before retrying failed request

  // ========== OTHER ==========
  NAVIGATION_DELAY: 1000, // Delay before redirect/navigation
  SCROLL_TO_SECTION: 600, // Smooth scroll duration

  // ========== FAVORITE ==========
  FAVORITE_ANIMATION: 300, // Animation duration when user adds/removes favorite
};
