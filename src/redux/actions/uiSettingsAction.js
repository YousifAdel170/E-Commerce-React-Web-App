import { TOGGLE_LANGUAGE, TOGGLE_THEME } from "../type";

// Toggle theme action: just dispatch toggle, reducer handles state & localStorage
export const toggleTheme = () => (dispatch) => {
  dispatch({ type: TOGGLE_THEME });
};

// Toggle language action: just dispatch toggle, reducer handles state & localStorage
export const toggleLanguage = () => (dispatch) => {
  dispatch({ type: TOGGLE_LANGUAGE });
};
