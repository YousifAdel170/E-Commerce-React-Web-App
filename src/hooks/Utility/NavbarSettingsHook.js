// Import hooks from react, react-redux
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import i18n for the languages handling
import i18n from "../../i18n/i18n";

// Import actions of the ui settings
import {
  toggleLanguage,
  toggleTheme,
} from "../../redux/actions/uiSettingsAction";

// Import used constatnts
import {
  DIRECTION_LTR,
  DIRECTION_RTL,
  LANGUAGE_ARABIC,
  LANGUAGE_ENGLISH,
  THEME_DARK,
  THEME_LIGHT,
} from "../../constants/settings";

// Hook responsbile for handling the ui settings
const useNavbarSettings = () => {
  const dispatch = useDispatch();

  // Get current theme and language from Redux store
  const { isDark, lang } = useSelector((state) => state.ui);

  // Local state to manage loading indicators for toggling actions
  const [isThemeLoading, setThemeLoading] = useState(false);
  const [isLanguageLoading, setLanguageLoading] = useState(false);

  // Effect to apply the theme class on <body> when isDark changes
  useEffect(() => {
    document.body.className = isDark ? THEME_DARK : THEME_LIGHT;
  }, [isDark]);

  // Effect to update i18n language and document direction when lang changes
  useEffect(() => {
    i18n.changeLanguage(lang);
    document.dir = lang === LANGUAGE_ARABIC ? DIRECTION_RTL : DIRECTION_LTR;
  }, [lang]);

  /**
   * Toggles the theme between light and dark.
   * Uses async/await to handle async dispatch and loading state.
   * useCallback ensures stable function reference.
   */
  const onChangeTheme = useCallback(async () => {
    try {
      setThemeLoading(true); // start loading
      // Dispatch the toggleTheme action, await if it returns a Promise
      await dispatch(toggleTheme());
    } catch (error) {
      console.error("Failed to toggle theme:", error);
    } finally {
      setThemeLoading(false); // end loading
    }
  }, [dispatch]);

  /**
   * Toggles the language between English and Arabic.
   * Uses async/await and loading state similarly.
   */
  const onChangeLanguage = useCallback(async () => {
    try {
      setLanguageLoading(true); // start loading
      const newLang =
        lang === LANGUAGE_ENGLISH ? LANGUAGE_ARABIC : LANGUAGE_ENGLISH;
      // Dispatch the toggleLanguage action with the new language
      await dispatch(toggleLanguage(newLang));
    } catch (error) {
      console.error("Failed to toggle language:", error);
    } finally {
      setLanguageLoading(false); // end loading
    }
  }, [dispatch, lang]);

  // Return the toggle functions, current states and loading flags
  return [
    onChangeTheme,
    onChangeLanguage,
    isDark,
    lang,
    isThemeLoading,
    isLanguageLoading,
  ];
};

export default useNavbarSettings;
