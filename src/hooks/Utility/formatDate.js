/* eslint-disable react-hooks/rules-of-hooks */
// Define the language/locale to use for formatting

import { useSelector } from "react-redux";
import { DATE_LANGUAGES, LANGUAGES } from "../../constants/settings";

// Format date to a readable format using the constant language
const formatDate = (dateString) => {
  const { lang } = useSelector((state) => state.ui);
  const userLang =
    lang === LANGUAGES.ARABIC ? DATE_LANGUAGES.EGYPT_AR : DATE_LANGUAGES.US_EN; // Adjust based on your language setting
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(dateString).toLocaleDateString(userLang, options);
};

export const formatDateTime = (dateString) => {
  const { lang } = useSelector((state) => state.ui);
  const userLang =
    lang === LANGUAGES.ARABIC ? DATE_LANGUAGES.EGYPT_AR : DATE_LANGUAGES.US_EN; // Adjust based on your language setting
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleString(userLang, options);
};

export default formatDate;
