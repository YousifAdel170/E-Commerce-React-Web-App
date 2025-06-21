import {
  LOCAL_STORAGE_KEY_LANGUAGE,
  LOCAL_STORAGE_KEY_THEME,
} from "../../constants/localstorage";

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_ARABIC,
  LANGUAGE_ENGLISH,
  THEME_DARK,
  THEME_LIGHT,
} from "../../constants/settings";

import { TOGGLE_LANGUAGE, TOGGLE_THEME } from "../type";

// Initial state reads saved preferences from localStorage or uses defaults
const initialState = {
  lang: localStorage.getItem(LOCAL_STORAGE_KEY_LANGUAGE) || DEFAULT_LANGUAGE,
  isDark: localStorage.getItem(LOCAL_STORAGE_KEY_THEME) === THEME_DARK,
};

const uiSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME: {
      // Toggle theme boolean
      const newTheme = !state.isDark;

      // Save theme string to localStorage
      localStorage.setItem(
        LOCAL_STORAGE_KEY_THEME,
        newTheme ? THEME_DARK : THEME_LIGHT
      );

      // Update state
      return { ...state, isDark: newTheme };
    }

    case TOGGLE_LANGUAGE: {
      // Toggle language code
      const newLang =
        state.lang === LANGUAGE_ENGLISH ? LANGUAGE_ARABIC : LANGUAGE_ENGLISH;

      // Save language code to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY_LANGUAGE, newLang);

      // Update state
      return { ...state, lang: newLang };
    }

    default:
      return state;
  }
};

export default uiSettingsReducer;
